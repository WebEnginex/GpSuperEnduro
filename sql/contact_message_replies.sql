-- Historique des réponses envoyées depuis l'admin (Brevo).
-- Exécuter dans Supabase → SQL Editor.

create table if not exists public.contact_message_replies (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.contact_messages (id) on delete cascade,
  body text not null,
  sent_by text,
  provider_message_id text,
  created_at timestamptz not null default now()
);

create index if not exists contact_message_replies_message_id_idx
  on public.contact_message_replies (message_id);

alter table public.contact_message_replies enable row level security;
