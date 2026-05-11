// Shapes mirroring the `public` schema in docs/db-schema.md.
//
// These are hand-written for now so the data hooks are well-typed without a
// build-time dependency on `supabase gen types` / the MCP `generate_typescript_types`
// tool. Swap to generated types once a full migration set lands.

export type AuthProvider = "default" | "google" | "apple";

export interface UserRow {
    id: string;
    auth_provider: AuthProvider;
    auth_provider_id: string | null;
    email: string | null;
    display_name: string;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

// Placeholder row for the not-yet-created `public.characters` table; expand to
// match docs/db-schema.md once the migration lands. `useUpdateCharacter` is a
// template, so this shape exists only to keep the example compiling.
export interface CharacterRow {
    id: string;
    user_id: string;
    name: string;
    level: number;
    hp_current: number;
    hp_max: number;
    [extraColumn: string]: unknown;
}
