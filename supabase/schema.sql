-- Ocani — esquema inicial (Fase 2)
-- Correr este archivo completo en el SQL Editor de Supabase.

create extension if not exists "pgcrypto";

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  sort_order int default 0
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_id uuid references categories(id),
  unit text not null,
  price numeric(10,2) not null,
  in_stock boolean default true,
  description text,
  image_url text,
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists site_settings (
  id int primary key default 1,
  whatsapp_number text,
  business_hours text,
  address text,
  instagram_url text,
  about_text text
);

-- Row Level Security: lectura pública, escritura solo con service_role
-- (service_role siempre bypassea RLS, por eso no hace falta una policy de escritura).

alter table categories enable row level security;
alter table products enable row level security;
alter table site_settings enable row level security;

create policy "Categorías: lectura pública"
  on categories for select
  using (true);

create policy "Productos: lectura pública"
  on products for select
  using (true);

create policy "Configuración del sitio: lectura pública"
  on site_settings for select
  using (true);
