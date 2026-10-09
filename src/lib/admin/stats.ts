import { getSupabaseAdmin } from "@/lib/db/client";

function startOfMonthISO(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}-01`;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function isMissingRelationError(error: { code?: string } | null | undefined) {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

function isMissingRpcError(error: { code?: string; message?: string } | null) {
  return (
    error?.code === "PGRST202" ||
    error?.code === "42883" ||
    Boolean(error?.message?.toLowerCase().includes("could not find the function"))
  );
}

export type VisitStats = {
  daily: number;
  monthly: number;
  total: number;
  schemaMissing: boolean;
};

async function countUniqueVisitors(params: {
  on?: string;
  from?: string;
}): Promise<{ count: number; schemaMissing: boolean; rpcMissing: boolean }> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("count_unique_page_visitors", {
    p_on: params.on ?? null,
    p_from: params.from ?? null,
  });

  if (!error) {
    return {
      count: Number(data ?? 0),
      schemaMissing: false,
      rpcMissing: false,
    };
  }

  if (isMissingRelationError(error)) {
    return { count: 0, schemaMissing: true, rpcMissing: false };
  }

  if (isMissingRpcError(error)) {
    return { count: 0, schemaMissing: false, rpcMissing: true };
  }

  throw new Error(error.message);
}

/** Fallback borné si les RPC SQL ne sont pas encore déployées. */
async function countUniqueVisitorsFallback(params: {
  on?: string;
  from?: string;
}): Promise<{ count: number; schemaMissing: boolean }> {
  const supabase = getSupabaseAdmin();
  const PAGE = 1000;
  const MAX_PAGES = 50; // plafond ~50k lignes scannées
  const keys = new Set<string>();
  let from = 0;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    let query = supabase
      .from("page_views")
      .select("visitor_key")
      .range(from, from + PAGE - 1);

    if (params.on) query = query.eq("viewed_on", params.on);
    if (params.from) query = query.gte("viewed_on", params.from);

    const { data, error } = await query;
    if (error) {
      if (isMissingRelationError(error)) {
        return { count: 0, schemaMissing: true };
      }
      throw new Error(error.message);
    }

    const rows = data ?? [];
    for (const row of rows) {
      keys.add(row.visitor_key as string);
    }
    if (rows.length < PAGE) break;
    from += PAGE;
  }

  return { count: keys.size, schemaMissing: false };
}

export async function getVisitStats(): Promise<VisitStats> {
  const today = todayISO();
  const monthStart = startOfMonthISO();

  const [dailyRes, monthlyRes, totalRes] = await Promise.all([
    countUniqueVisitors({ on: today }),
    countUniqueVisitors({ from: monthStart }),
    countUniqueVisitors({}),
  ]);

  if (
    dailyRes.schemaMissing ||
    monthlyRes.schemaMissing ||
    totalRes.schemaMissing
  ) {
    return { daily: 0, monthly: 0, total: 0, schemaMissing: true };
  }

  if (dailyRes.rpcMissing || monthlyRes.rpcMissing || totalRes.rpcMissing) {
    const [daily, monthly, total] = await Promise.all([
      countUniqueVisitorsFallback({ on: today }),
      countUniqueVisitorsFallback({ from: monthStart }),
      countUniqueVisitorsFallback({}),
    ]);
    if (daily.schemaMissing || monthly.schemaMissing || total.schemaMissing) {
      return { daily: 0, monthly: 0, total: 0, schemaMissing: true };
    }
    return {
      daily: daily.count,
      monthly: monthly.count,
      total: total.count,
      schemaMissing: false,
    };
  }

  return {
    daily: dailyRes.count,
    monthly: monthlyRes.count,
    total: totalRes.count,
    schemaMissing: false,
  };
}

export type TicketClickStat = {
  ticketId: string;
  ticketName: string;
  clicks: number;
};

export async function getTicketClickStats(): Promise<{
  rows: TicketClickStat[];
  schemaMissing: boolean;
}> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("ticket_click_stats");

  if (!error) {
    return {
      schemaMissing: false,
      rows: (data ?? []).map(
        (row: {
          ticket_id: string;
          ticket_name: string;
          clicks: number | string;
        }) => ({
          ticketId: row.ticket_id,
          ticketName: row.ticket_name,
          clicks: Number(row.clicks),
        })
      ),
    };
  }

  if (isMissingRelationError(error)) {
    return { rows: [], schemaMissing: true };
  }

  if (!isMissingRpcError(error)) {
    throw new Error(error.message);
  }

  // Fallback borné
  const PAGE = 1000;
  const MAX_PAGES = 50;
  const map = new Map<string, TicketClickStat>();
  let from = 0;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const { data: rows, error: pageError } = await supabase
      .from("ticket_clicks")
      .select("ticket_id, ticket_name")
      .range(from, from + PAGE - 1);

    if (pageError) {
      if (isMissingRelationError(pageError)) {
        return { rows: [], schemaMissing: true };
      }
      throw new Error(pageError.message);
    }

    const chunk = rows ?? [];
    for (const row of chunk) {
      const key = row.ticket_id as string;
      const current = map.get(key);
      if (current) current.clicks += 1;
      else {
        map.set(key, {
          ticketId: key,
          ticketName: row.ticket_name as string,
          clicks: 1,
        });
      }
    }
    if (chunk.length < PAGE) break;
    from += PAGE;
  }

  return {
    rows: Array.from(map.values()).sort(
      (a, b) => b.clicks - a.clicks || a.ticketName.localeCompare(b.ticketName)
    ),
    schemaMissing: false,
  };
}
