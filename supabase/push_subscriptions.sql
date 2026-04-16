-- ═══ push_subscriptions ═══
-- Stores Web Push API subscriptions per user. A single user can have
-- multiple subscriptions (phone + laptop + etc.); the endpoint is the
-- unique key (it's already a unique URL per browser profile).

create table if not exists public.push_subscriptions (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth_key text not null,
  user_agent text,
  preferences jsonb default '{"morning": true, "hour": 7, "minute": 30}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.push_subscriptions enable row level security;

-- Users can read/write only their own subscriptions.
create policy "own subscriptions select"
  on public.push_subscriptions for select
  using (auth.uid() = user_id);

create policy "own subscriptions insert"
  on public.push_subscriptions for insert
  with check (auth.uid() = user_id);

create policy "own subscriptions update"
  on public.push_subscriptions for update
  using (auth.uid() = user_id);

create policy "own subscriptions delete"
  on public.push_subscriptions for delete
  using (auth.uid() = user_id);

-- Service role (used by the scheduled push-send function) bypasses RLS
-- automatically, so no separate policy is needed for the cron job.

create index if not exists push_subscriptions_user_idx on public.push_subscriptions(user_id);
