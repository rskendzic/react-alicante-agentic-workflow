-- Issue #2: show each session's level. Following the same enum pattern as
-- `20260918100000_session_track_enum.sql` so generated types get a proper
-- union instead of a plain string.

do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'session_level'
      and typnamespace = 'public'::regnamespace
  ) then
    create type public.session_level as enum (
      'beginner',
      'intermediate',
      'advanced'
    );
  end if;
end $$;

-- Add nullable first: the table already has rows, so a NOT NULL column
-- needs every row backfilled before the constraint can be applied.
alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions
set level = data.level::public.session_level
from (
  values
    ('opening-keynote', 'beginner'),
    ('build-your-agentic-workflow', 'intermediate'),
    ('server-components-deep-dive', 'advanced'),
    ('rsc-payload-budget', 'intermediate'),
    ('agent-context-windows', 'intermediate'),
    ('micro-frontends-2026', 'advanced'),
    ('testing-ai-generated-code', 'intermediate'),
    ('closing-panel', 'beginner')
) as data (id, level)
where public.sessions.id = data.id
  and public.sessions.level is distinct from data.level::public.session_level;

alter table public.sessions
  alter column level set not null;
