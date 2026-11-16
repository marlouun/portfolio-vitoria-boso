-- Área do cliente · Vitória Boso
-- Rodar uma vez no SQL Editor do Supabase. Pode ser rodado de novo sem perder dados.

-- Tabelas ---------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null,
  email text not null,
  telefone text,
  is_admin boolean not null default false,
  must_change_password boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.galerias (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references public.profiles (id) on delete cascade,
  titulo text not null,
  drive_url text not null,
  fotos_incluidas integer not null check (fotos_incluidas >= 0),
  valor_extra numeric(10, 2) not null default 0 check (valor_extra >= 0),
  status text not null default 'aberta' check (status in ('aberta', 'finalizada', 'arquivada')),
  prazo date,
  created_at timestamptz not null default now(),
  finalizada_em timestamptz
);

create table if not exists public.fotos (
  id uuid primary key default gen_random_uuid(),
  galeria_id uuid not null references public.galerias (id) on delete cascade,
  drive_id text not null,
  nome text not null,
  ordem integer not null default 0,
  selecionada boolean not null default false,
  unique (galeria_id, drive_id)
);

create index if not exists galerias_cliente_idx on public.galerias (cliente_id);
create index if not exists fotos_galeria_idx on public.fotos (galeria_id, ordem);

alter table public.profiles enable row level security;
alter table public.galerias enable row level security;
alter table public.fotos enable row level security;

-- Funções auxiliares ----------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false);
$$;

-- O cliente fecha a própria seleção; depois disso não consegue mais mudar.
create or replace function public.finalizar_galeria(p_galeria uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.galerias
     set status = 'finalizada', finalizada_em = now()
   where id = p_galeria
     and cliente_id = auth.uid()
     and status = 'aberta';
  if not found then
    raise exception 'Galeria não encontrada ou já finalizada';
  end if;
end;
$$;

-- Chamado depois que o cliente troca a senha provisória.
create or replace function public.senha_alterada()
returns void
language sql
security definer
set search_path = ''
as $$
  update public.profiles set must_change_password = false where id = auth.uid();
$$;

revoke execute on function public.is_admin() from public, anon;
revoke execute on function public.finalizar_galeria(uuid) from public, anon;
revoke execute on function public.senha_alterada() from public, anon;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.finalizar_galeria(uuid) to authenticated;
grant execute on function public.senha_alterada() to authenticated;

-- Permissões ------------------------------------------------------------------
-- Visitantes sem login não acessam nada. Logados passam pelas regras (RLS) abaixo.

revoke all on public.profiles, public.galerias, public.fotos from anon, authenticated;
grant select on public.profiles, public.galerias, public.fotos to authenticated;
grant update (nome, telefone) on public.profiles to authenticated;
grant insert, update, delete on public.galerias to authenticated;
grant insert, delete on public.fotos to authenticated;
grant update (selecionada) on public.fotos to authenticated;

-- Regras por linha (RLS) ------------------------------------------------------

drop policy if exists "perfil: ver o próprio ou admin" on public.profiles;
create policy "perfil: ver o próprio ou admin" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "perfil: admin edita" on public.profiles;
create policy "perfil: admin edita" on public.profiles
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "galeria: cliente vê as suas, admin vê todas" on public.galerias;
create policy "galeria: cliente vê as suas, admin vê todas" on public.galerias
  for select to authenticated
  using (public.is_admin() or (cliente_id = auth.uid() and status <> 'arquivada'));

drop policy if exists "galeria: admin cria" on public.galerias;
create policy "galeria: admin cria" on public.galerias
  for insert to authenticated with check (public.is_admin());

drop policy if exists "galeria: admin edita" on public.galerias;
create policy "galeria: admin edita" on public.galerias
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "galeria: admin apaga" on public.galerias;
create policy "galeria: admin apaga" on public.galerias
  for delete to authenticated using (public.is_admin());

drop policy if exists "foto: dono da galeria ou admin vê" on public.fotos;
create policy "foto: dono da galeria ou admin vê" on public.fotos
  for select to authenticated
  using (
    public.is_admin() or exists (
      select 1 from public.galerias g
       where g.id = galeria_id and g.cliente_id = auth.uid() and g.status <> 'arquivada'
    )
  );

drop policy if exists "foto: admin adiciona" on public.fotos;
create policy "foto: admin adiciona" on public.fotos
  for insert to authenticated with check (public.is_admin());

drop policy if exists "foto: admin apaga" on public.fotos;
create policy "foto: admin apaga" on public.fotos
  for delete to authenticated using (public.is_admin());

-- O cliente só marca/desmarca enquanto a galeria está aberta.
drop policy if exists "foto: selecionar enquanto aberta" on public.fotos;
create policy "foto: selecionar enquanto aberta" on public.fotos
  for update to authenticated
  using (
    public.is_admin() or exists (
      select 1 from public.galerias g
       where g.id = galeria_id and g.cliente_id = auth.uid() and g.status = 'aberta'
    )
  )
  with check (
    public.is_admin() or exists (
      select 1 from public.galerias g
       where g.id = galeria_id and g.cliente_id = auth.uid() and g.status = 'aberta'
    )
  );
