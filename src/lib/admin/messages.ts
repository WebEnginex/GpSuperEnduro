import { getSupabaseAdmin } from "@/lib/db/client";

export type ContactMessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  status: string;
  createdAt: string;
};

export type ContactMessageReplyRow = {
  id: string;
  messageId: string;
  body: string;
  sentBy: string | null;
  createdAt: string;
};

const ALLOWED_STATUSES = new Set(["new", "read", "replied", "archived"]);

function isMissingRelationError(error: { code?: string } | null | undefined) {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export async function getContactMessages(): Promise<{
  messages: ContactMessageRow[];
  schemaMissing: boolean;
}> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, subject, category, message, status, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    if (isMissingRelationError(error)) {
      return { messages: [], schemaMissing: true };
    }
    throw new Error(error.message);
  }

  return {
    schemaMissing: false,
    messages: (data ?? []).map((row) => ({
      id: row.id as string,
      name: row.name as string,
      email: row.email as string,
      subject: row.subject as string,
      category: row.category as string,
      message: row.message as string,
      status: row.status as string,
      createdAt: row.created_at as string,
    })),
  };
}

export async function getContactMessageById(id: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, subject, category, message, status, created_at")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  return {
    id: data.id as string,
    name: data.name as string,
    email: data.email as string,
    subject: data.subject as string,
    category: data.category as string,
    message: data.message as string,
    status: data.status as string,
    createdAt: data.created_at as string,
  } satisfies ContactMessageRow;
}

export async function insertContactMessageReply(params: {
  messageId: string;
  body: string;
  sentBy?: string | null;
  providerMessageId?: string | null;
}) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("contact_message_replies").insert({
    message_id: params.messageId,
    body: params.body,
    sent_by: params.sentBy ?? null,
    provider_message_id: params.providerMessageId ?? null,
  });

  if (error) {
    // Table pas encore créée : on n'échoue pas l'envoi mail / statut.
    if (isMissingRelationError(error)) {
      console.warn(
        "[admin/messages] contact_message_replies absente — réponse non historisée."
      );
      return;
    }
    throw new Error(error.message);
  }
}

export async function updateContactMessagesStatus(
  ids: string[],
  status: string
) {
  if (!ALLOWED_STATUSES.has(status)) {
    throw new Error("Statut invalide.");
  }
  if (ids.length === 0) return;

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("contact_messages")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .in("id", ids);

  if (error) throw new Error(error.message);
}

export async function deleteContactMessages(ids: string[]) {
  if (ids.length === 0) return;

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .in("id", ids);

  if (error) throw new Error(error.message);
}
