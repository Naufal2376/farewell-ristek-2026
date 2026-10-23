-- Jalankan sekali di Supabase: Dashboard → SQL Editor → New query → Run.
-- (Jika tabel sudah ada dan ingin memperbesar batas tanpa hapus data lama, jalankan ALTER TABLE di bawah)

create table if not exists public.secret_messages (
  id uuid primary key default gen_random_uuid(),
  recipient text not null check (char_length(recipient) between 1 and 100),
  message text not null check (char_length(message) between 1 and 5000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- RLS aktif tanpa policy: anon key tidak bisa membaca atau menulis apa pun.
-- Semua akses lewat API route Next.js yang memakai service role key.
alter table public.secret_messages enable row level security;

-- ========================================================
-- QUERY MIGRASI UNTUK MEMPERBESAR BATAS PESAN KE 5.000 KARAKTER
-- (Jalankan query ini di SQL Editor jika tabel sudah terisi data agar data aman):
--
-- ALTER TABLE public.secret_messages 
-- DROP CONSTRAINT IF EXISTS secret_messages_message_check;
--
-- ALTER TABLE public.secret_messages 
-- ADD CONSTRAINT secret_messages_message_check 
-- CHECK (char_length(message) BETWEEN 1 AND 5000);
-- ========================================================
