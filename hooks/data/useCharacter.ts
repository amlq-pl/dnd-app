import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { useCharacterQuery } from "./factory";

type CharacterRow = Database["public"]["Tables"]["characters"]["Row"];

export function useCharacter(characterId: string | undefined) {
    return useCharacterQuery<CharacterRow>(characterId, [], async (id) => {
        const { data, error } = await supabase
            .from("characters")
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    });
}
