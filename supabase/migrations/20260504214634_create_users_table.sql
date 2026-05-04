-- Migration: create users table
--
-- Source: docs/db-schema.md (`users` slice + supporting `auth_provider` enum and
-- `update_updated_at` trigger function from "Shared infrastructure").
--
-- Convention (see docs/db-schema.md "Migrations"):
--   - One file per schema change, named <UTC-yyyymmddHHMMSS>_<snake_case>.sql.
--   - Apply via Supabase MCP `execute_sql` (or `supabase db query` once the CLI
--     is wired up) against the project_ref recorded in .mcp.json.
--   - Never edit a previously-applied migration; write a follow-up file instead.
--
-- Target: supabase-test (project_ref nsbvjwtvfblanjwwuytw).

CREATE TYPE auth_provider AS ENUM ('default', 'google', 'apple');

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE users (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_provider    auth_provider NOT NULL,
  auth_provider_id TEXT,
  email            TEXT,
  display_name     TEXT NOT NULL,
  avatar_url       TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Partial unique index: keeps the seeded default user (auth_provider_id IS NULL)
-- from blocking future OAuth inserts that share NULL auth_provider_id.
CREATE UNIQUE INDEX users_provider_unique
  ON users (auth_provider, auth_provider_id)
  WHERE auth_provider_id IS NOT NULL;

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY users_select_own ON users
  FOR SELECT USING (id = auth.uid());

CREATE POLICY users_update_own ON users
  FOR UPDATE USING (id = auth.uid());

-- Seed the development "default" user. The mobile app keeps this id in a
-- config constant and uses it for every read/write until OAuth is wired up.
INSERT INTO users (id, auth_provider, auth_provider_id, email, display_name, avatar_url)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'default',
  NULL,
  NULL,
  'Default Adventurer',
  NULL
);
