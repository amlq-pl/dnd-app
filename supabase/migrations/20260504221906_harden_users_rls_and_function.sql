-- Migration: harden users RLS policies and update_updated_at search_path
--
-- Follow-up to 20260504214634_create_users_table.sql, addressing the three
-- advisors flagged immediately after the initial apply:
--
--   1. SECURITY (function_search_path_mutable):
--      `public.update_updated_at` had a mutable search_path. Pinning it to ''
--      prevents schema-based hijacking; `now()` resolves out of pg_catalog
--      which is always implicitly in scope.
--      Docs: https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable
--
--   2/3. PERFORMANCE (auth_rls_initplan):
--      Both RLS policies on `public.users` referenced `auth.uid()` directly,
--      which Postgres re-evaluates per row. Wrapping in (SELECT auth.uid())
--      lets the planner cache the value once per query.
--      Docs: https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select
--
--   4. AUTHORIZATION (signup under RLS):
--      `components/auth/SocialAuth.tsx` writes to `public.users` with upsert.
--      First-time sign-in takes the INSERT path, so we need an INSERT policy.
--
-- NOTE:
-- This file now represents the canonical "hardened users policies" state and is
-- intended to be reusable when migrating this schema to a fresh DB instance.
-- Existing environments that already applied this migration should receive an
-- additional follow-up migration if policy definitions diverge.

ALTER FUNCTION public.update_updated_at() SET search_path = '';

ALTER POLICY users_select_own ON public.users
  USING (id = (SELECT auth.uid()));

ALTER POLICY users_update_own ON public.users
  USING (id = (SELECT auth.uid()));

ALTER POLICY users_update_own ON public.users
  WITH CHECK (id = (SELECT auth.uid()));

CREATE POLICY users_insert_own ON public.users
  FOR INSERT TO authenticated
  WITH CHECK (id = (SELECT auth.uid()));
