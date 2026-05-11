import { supabase } from "@/lib/supabase";
import type { CharacterRow } from "@/types/db";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Canonical mutation template: optimistic update + rollback + persister flush.
// The `characters` table is not yet provisioned (out of scope for the auth PR);
// once it exists, every character-write hook should follow this exact shape.
//
// Cache key: ["character", characterId]. Cross-cutting writes (level-up etc.)
// also invalidate sibling keys ["character", characterId, "features"|"items"|...].

export function characterQueryKey(characterId: string) {
    return ["character", characterId] as const;
}

export type CharacterPatch = Partial<Omit<CharacterRow, "id" | "user_id" | "created_at" | "updated_at">>;

interface MutationContext {
    previous: CharacterRow | undefined;
}

export function useUpdateCharacter(characterId: string) {
    const queryClient = useQueryClient();

    return useMutation<CharacterRow, Error, CharacterPatch, MutationContext>({
        mutationFn: async (patch) => {
            const { data, error } = await supabase
                .from("characters")
                .update(patch)
                .eq("id", characterId)
                .select()
                .single();

            if (error) throw error;
            return data as CharacterRow;
        },

        onMutate: async (patch) => {
            await queryClient.cancelQueries({ queryKey: characterQueryKey(characterId) });

            const previous = queryClient.getQueryData<CharacterRow>(characterQueryKey(characterId));

            queryClient.setQueryData<CharacterRow | undefined>(
                characterQueryKey(characterId),
                (old) => (old ? { ...old, ...patch } : old),
            );

            return { previous };
        },

        onError: (_error, _patch, context) => {
            if (context?.previous) {
                queryClient.setQueryData(characterQueryKey(characterId), context.previous);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: characterQueryKey(characterId) });
        },
    });
}
