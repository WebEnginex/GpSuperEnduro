-- Création de la table pour le tracking des visites
create table if not exists visits (
  id uuid default gen_random_uuid() primary key,
  timestamp timestamp with time zone default now()
);

-- Création de la table pour les messages de contact
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  sender text not null,
  email text not null,
  subject text not null,
  content text not null,
  status text default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamp with time zone default now()
);

-- Création des index pour améliorer les performances
create index if not exists idx_visits_timestamp on visits(timestamp);
create index if not exists idx_messages_status on messages(status);
create index if not exists idx_messages_created_at on messages(created_at);

-- Politique de sécurité pour les visites (lecture seule pour les admins)
alter table visits enable row level security;

create policy "Allow admin read access" on visits
  for select using (auth.role() = 'authenticated');

create policy "Allow visit tracking" on visits
  for insert with check (true);

-- Politique de sécurité pour les messages
alter table messages enable row level security;

create policy "Allow admin full access to messages" on messages
  for all using (auth.role() = 'authenticated');

create policy "Allow public to create messages" on messages
  for insert with check (true);
