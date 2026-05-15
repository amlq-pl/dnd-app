import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { useCharacterQuery, useCharacterMutation } from "./factory";

type SpellRow = Database["public"]["Tables"]["character_spells"]["Row"];
type SpellUpdate = Database["public"]["Tables"]["character_spells"]["Update"];

// Joined type: character_spells + spell catalog metadata
type CharacterSpellWithDetails = SpellRow & {
    spells: Database["public"]["Tables"]["spells"]["Row"];
};

export function useCharacterSpells(characterId: string | undefined) {
    return useCharacterQuery<CharacterSpellWithDetails[]>(
        characterId,
        ["spells"],
        async (id) => {
            const { data, error } = await supabase
                .from("character_spells")
                .select("*, spells(*)")
                .eq("character_id", id);
            if (error) throw error;
            return data as CharacterSpellWithDetails[];
        },
    );
}

export function useLearnSpell(characterId: string) {
    return useCharacterMutation<
        CharacterSpellWithDetails[],
        { spell_id: string; prepared?: boolean; always_prepared?: boolean }
    >(
        characterId,
        ["spells"],
        async (id, input) => {
            const { data, error } = await supabase
                .from("character_spells")
                .insert({ character_id: id, ...input })
                .select("*, spells(*)")
                .single();
            if (error) throw error;
            return data as unknown as CharacterSpellWithDetails[];
        },
        (prev, _input) => prev, // let invalidation refresh
    );
}

export function useUpdateCharacterSpell(characterId: string) {
    return useCharacterMutation<
        CharacterSpellWithDetails[],
        { spellId: string; patch: SpellUpdate }
    >(
        characterId,
        ["spells"],
        async (id, { spellId, patch }) => {
            const { data, error } = await supabase
                .from("character_spells")
                .update(patch)
                .eq("character_id", id)
                .eq("spell_id", spellId)
                .select("*, spells(*)")
                .single();
            if (error) throw error;
            return data as unknown as CharacterSpellWithDetails[];
        },
        (prev, { spellId, patch }) =>
            prev.map((s) => (s.spell_id === spellId ? { ...s, ...patch } : s)),
    );
}

export function useForgetSpell(characterId: string) {
    return useCharacterMutation<CharacterSpellWithDetails[], string, void>(
        characterId,
        ["spells"],
        async (id, spellId) => {
            const { error } = await supabase
                .from("character_spells")
                .delete()
                .eq("character_id", id)
                .eq("spell_id", spellId);
            if (error) throw error;
        },
        (prev, spellId) => prev.filter((s) => s.spell_id !== spellId),
    );
}
