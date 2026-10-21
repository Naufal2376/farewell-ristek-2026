-- Jalankan sekali di Supabase: Dashboard → SQL Editor → New query → Run.

create table if not exists public.secret_messages (
  id uuid primary key default gen_random_uuid(),
  recipient text not null check (char_length(recipient) between 1 and 100),
  message text not null check (char_length(message) between 1 and 1000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- RLS aktif tanpa policy: anon key tidak bisa membaca atau menulis apa pun.
-- Semua akses lewat API route Next.js yang memakai service role key.
alter table public.secret_messages enable row level security;
