-- ===========================================================================
-- Acopio Colombia — esquema inicial
-- Emergencia: terremoto del 10 de agosto de 2026 (epicentro San José del Palmar, Chocó)
--
-- Diseño deliberadamente simple: una tabla principal, arrays de Postgres para
-- las categorías y sin PostGIS. Las distancias se calculan en el cliente con
-- Haversine sobre unas decenas o cientos de puntos.
-- ===========================================================================

create extension if not exists "pgcrypto";

-- Estados de verificación ---------------------------------------------------
do $$ begin
  create type verification_status as enum ('verified', 'reported', 'pending', 'disputed', 'inactive');
exception when duplicate_object then null; end $$;

do $$ begin
  create type center_type as enum ('general', 'food', 'medical', 'rescue_supplies', 'animal_aid', 'mixed');
exception when duplicate_object then null; end $$;

-- Qué tan confiable es el pin. Las direcciones colombianas no siempre
-- resuelven con exactitud, y ocultarlo enviaría gente al lugar equivocado.
do $$ begin
  create type location_precision as enum ('exact', 'approximate', 'municipality');
exception when duplicate_object then null; end $$;

do $$ begin
  create type report_reason as enum ('closed', 'schedule_changed', 'items_changed', 'wrong_address', 'false_information', 'other');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- Administradores
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- Centros de acopio
-- ---------------------------------------------------------------------------
create table if not exists public.collection_centers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,

  name text not null,
  organization text,

  type center_type not null default 'general',

  department text not null,
  municipality text not null,
  address text not null,

  latitude double precision not null check (latitude between -4.3 and 13.5),
  longitude double precision not null check (longitude between -82 and -66.8),
  location_precision location_precision not null default 'approximate',

  accepted_items text[] not null default '{}',
  urgent_needs text[] not null default '{}',
  rejected_items text[] not null default '{}',

  schedule_text text,

  starts_at date,
  ends_at date,

  phone text,
  whatsapp text,
  email text,

  source_name text not null,
  source_url text,
  source_published_at date,

  verification_status verification_status not null default 'pending',
  verification_notes text,

  -- Datos de quien envió el centro. Nunca se exponen públicamente.
  submitted_by_name text,
  submitted_by_email text,
  submitted_by_phone text,
  submitted_nit text,
  verification_url text,
  evidence_url text,

  last_verified_at timestamptz,
  verified_by uuid references auth.users (id),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists collection_centers_status_idx on public.collection_centers (verification_status);
create index if not exists collection_centers_department_idx on public.collection_centers (department);
create index if not exists collection_centers_accepted_items_idx on public.collection_centers using gin (accepted_items);

-- ---------------------------------------------------------------------------
-- Reportes de la comunidad sobre centros existentes
-- ---------------------------------------------------------------------------
create table if not exists public.center_reports (
  id uuid primary key default gen_random_uuid(),
  center_id uuid references public.collection_centers (id) on delete cascade,
  center_slug text,

  reason report_reason not null,
  comment text not null,
  evidence_url text,
  reporter_contact text,

  resolved boolean not null default false,
  resolved_at timestamptz,
  resolved_by uuid references auth.users (id),
  admin_notes text,

  created_at timestamptz not null default now()
);

create index if not exists center_reports_center_idx on public.center_reports (center_id);
create index if not exists center_reports_resolved_idx on public.center_reports (resolved);

-- ---------------------------------------------------------------------------
-- updated_at automático
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists collection_centers_touch on public.collection_centers;
create trigger collection_centers_touch
  before update on public.collection_centers
  for each row execute function public.touch_updated_at();

-- ===========================================================================
-- Row Level Security
-- ===========================================================================
alter table public.collection_centers enable row level security;
alter table public.center_reports enable row level security;
alter table public.admin_users enable row level security;

-- Público: solo lectura de centros verificados o reportados.
-- Los `pending` y `disputed` NUNCA son visibles sin autenticación.
drop policy if exists "centros publicos legibles" on public.collection_centers;
create policy "centros publicos legibles"
  on public.collection_centers for select
  to anon, authenticated
  using (verification_status in ('verified', 'reported'));

-- Administradores: acceso total.
drop policy if exists "admins leen todo" on public.collection_centers;
create policy "admins leen todo"
  on public.collection_centers for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins escriben" on public.collection_centers;
create policy "admins escriben"
  on public.collection_centers for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "admins actualizan" on public.collection_centers;
create policy "admins actualizan"
  on public.collection_centers for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins borran" on public.collection_centers;
create policy "admins borran"
  on public.collection_centers for delete
  to authenticated
  using (public.is_admin());

-- Reportes: los envía el servidor con service role; solo los admins los leen.
drop policy if exists "admins leen reportes" on public.center_reports;
create policy "admins leen reportes"
  on public.center_reports for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins actualizan reportes" on public.center_reports;
create policy "admins actualizan reportes"
  on public.center_reports for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins leen admin_users" on public.admin_users;
create policy "admins leen admin_users"
  on public.admin_users for select
  to authenticated
  using (public.is_admin());

-- NOTA: no existe policy de INSERT para `anon` ni en `collection_centers` ni en
-- `center_reports`. Los envíos del público entran por route handlers del servidor
-- usando la service role key, tras validación con Zod, honeypot y rate limiting.
-- Así un visitante no puede escribir directamente en la base de datos.

-- ---------------------------------------------------------------------------
-- Storage: evidencia opcional de los centros enviados por la comunidad
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('center-evidence', 'center-evidence', false)
on conflict (id) do nothing;

drop policy if exists "admins leen evidencia" on storage.objects;
create policy "admins leen evidencia"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'center-evidence' and public.is_admin());
