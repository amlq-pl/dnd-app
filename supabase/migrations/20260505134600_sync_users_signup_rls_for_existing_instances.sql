-- Migration: sync users signup RLS for already-migrated instances
--
-- Why:
-- 20260504221906_harden_users_rls_and_function.sql was updated to include
-- users_insert_own and WITH CHECK on users_update_own so fresh DBs are correct.
-- Existing DBs that already applied the earlier version of that migration need
-- a follow-up migration to converge to the same policy state.
--
-- Resulting policy model on public.users:
-- - users_select_own: SELECT own row
-- - users_update_own: UPDATE own row, and resulting row must still be own
-- - users_insert_own: INSERT row only when id = auth.uid()

DROP POLICY IF EXISTS users_update_own ON public.users;
CREATE POLICY users_update_own ON public.users
  FOR UPDATE TO authenticated
  USING (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS users_insert_own ON public.users;
CREATE POLICY users_insert_own ON public.users
  FOR INSERT TO authenticated
  WITH CHECK (id = (SELECT auth.uid()));
