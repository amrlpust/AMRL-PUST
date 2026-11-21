-- AMRL alumni submissions: Supabase Postgres schema + Row Level Security.
-- IMPORTANT: Replace lokman.ali@pust.ac.bd in all four admin policies if the PI account changes.
-- Run this once in Supabase Dashboard -> SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.alumni_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  email text not null check (char_length(trim(email)) between 5 and 254),
  degree text not null default '',
  graduation_year text not null default '' check (graduation_year = '' or graduation_year ~ '^[0-9]{4}$'),
  current_role text not null default '',
  organisation text not null default '',
  location text not null default '',
  research text not null default '',
  profile_url text not null default '',
  linkedin text not null default '',
  photo_url text not null default '',
  consent_contact boolean not null default false,
  consent_public boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists alumni_submissions_status_year_idx
  on public.alumni_submissions (status, graduation_year desc);
create index if not exists alumni_submissions_created_idx
  on public.alumni_submissions (created_at desc);

alter table public.alumni_submissions enable row level security;

-- Start from no table-level access. Add only the privileges needed below.
grant usage on schema public to anon, authenticated;
revoke all on table public.alumni_submissions from anon, authenticated;

-- Public visitors may submit only the columns in the form. They cannot set status,
-- created_at, updated_at or an admin note, so status always uses 'pending'.
grant insert (
  name, email, degree, graduation_year, current_role, organisation, location,
  research, profile_url, linkedin, photo_url, consent_contact, consent_public
) on public.alumni_submissions to anon;

-- Public visitors can read approved, consented profile fields only. Email is
-- deliberately excluded from column privileges and can never appear publicly.
grant select (
  id, name, degree, graduation_year, current_role, organisation, location,
  research, profile_url, linkedin, photo_url, created_at
) on public.alumni_submissions to anon;

-- The authenticated PI can review and manage every submission.
grant select, update, delete on public.alumni_submissions to authenticated;

-- Public submission policy: every new row starts pending and includes contact consent.
drop policy if exists "Public can submit pending alumni profiles" on public.alumni_submissions;
create policy "Public can submit pending alumni profiles"
on public.alumni_submissions for insert to anon
with check (
  status = 'pending'
  and consent_contact is true
  and char_length(trim(name)) between 2 and 120
  and char_length(trim(email)) between 5 and 254
);

-- Public directory may return only approved profiles with explicit publication consent.
drop policy if exists "Public can view approved consented alumni" on public.alumni_submissions;
create policy "Public can view approved consented alumni"
on public.alumni_submissions for select to anon
using (status = 'approved' and consent_public is true);

-- PI-only access. This email must match backend.piAdminEmail in content.js.
drop policy if exists "PI can view all alumni submissions" on public.alumni_submissions;
create policy "PI can view all alumni submissions"
on public.alumni_submissions for select to authenticated
using (lower(coalesce((select auth.jwt() ->> 'email'), '')) = lower('lokman.ali@pust.ac.bd'));

drop policy if exists "PI can update alumni submissions" on public.alumni_submissions;
create policy "PI can update alumni submissions"
on public.alumni_submissions for update to authenticated
using (lower(coalesce((select auth.jwt() ->> 'email'), '')) = lower('lokman.ali@pust.ac.bd'))
with check (lower(coalesce((select auth.jwt() ->> 'email'), '')) = lower('lokman.ali@pust.ac.bd'));

drop policy if exists "PI can delete alumni submissions" on public.alumni_submissions;
create policy "PI can delete alumni submissions"
on public.alumni_submissions for delete to authenticated
using (lower(coalesce((select auth.jwt() ->> 'email'), '')) = lower('lokman.ali@pust.ac.bd'));

-- Optional: keep updated_at current when the PI edits a submission.
create or replace function public.set_alumni_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists alumni_submissions_updated_at on public.alumni_submissions;
create trigger alumni_submissions_updated_at
before update on public.alumni_submissions
for each row execute function public.set_alumni_updated_at();
