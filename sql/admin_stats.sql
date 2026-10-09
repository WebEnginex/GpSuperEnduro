-- Agrégations admin (évite de charger toutes les lignes côté Next).
-- Exécuter dans Supabase → SQL Editor.

create or replace function public.count_unique_page_visitors(
  p_on date default null,
  p_from date default null
)
returns bigint
language sql
stable
as $$
  select count(distinct visitor_key)::bigint
  from public.page_views
  where
    (p_on is null or viewed_on = p_on)
    and (p_from is null or viewed_on >= p_from);
$$;

create or replace function public.ticket_click_stats()
returns table (
  ticket_id text,
  ticket_name text,
  clicks bigint
)
language sql
stable
as $$
  select
    ticket_id::text,
    max(ticket_name)::text as ticket_name,
    count(*)::bigint as clicks
  from public.ticket_clicks
  group by ticket_id
  order by clicks desc, ticket_name asc;
$$;

grant execute on function public.count_unique_page_visitors(date, date) to service_role;
grant execute on function public.ticket_click_stats() to service_role;
