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
-- Convention: never edit a previously-applied migration; this is a follow-up.

ALTER FUNCTION public.update_updated_at() SET search_path = '';

ALTER POLICY users_select_own ON public.users
  USING (id = (SELECT auth.uid()));

ALTER POLICY users_update_own ON public.users
  USING (id = (SELECT auth.uid()));
