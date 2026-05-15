import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { useCharacterQuery, useCharacterMutation } from "./factory";

type ItemRow = Database["public"]["Tables"]["character_items"]["Row"];
type ItemInsert = Database["public"]["Tables"]["character_items"]["Insert"];
type ItemUpdate = Database["public"]["Tables"]["character_items"]["Update"];

export function useCharacterItems(characterId: string | undefined) {
    return useCharacterQuery<ItemRow[]>(characterId, ["items"], async (id) => {
        const { data, error } = await supabase
            .from("character_items")
            .select("*")
            .eq("character_id", id);
        if (error) throw error;
        return data;
    });
}

export function useCreateCharacterItem(characterId: string) {
    return useCharacterMutation<
        ItemRow[],
        Omit<ItemInsert, "character_id">,
        ItemRow
    >(
        characterId,
        ["items"],
        async (id, input) => {
            const { data, error } = await supabase
                .from("character_items")
                .insert({ character_id: id, ...input })
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        (prev, input) => [
            ...prev,
            {
                id: "optimistic-temp",
                character_id: characterId,
                created_at: "",
                updated_at: "",
                ...input,
            } as ItemRow,
        ],
    );
}

export function useUpdateCharacterItem(characterId: string) {
    return useCharacterMutation<
        ItemRow[],
        { itemId: string; patch: ItemUpdate },
        ItemRow
    >(
        characterId,
        ["items"],
        async (_id, { itemId, patch }) => {
            const { data, error } = await supabase
                .from("character_items")
                .update(patch)
                .eq("id", itemId)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        (prev, { itemId, patch }) =>
            prev.map((item) =>
                item.id === itemId ? { ...item, ...patch } : item,
            ),
    );
}

export function useDeleteCharacterItem(characterId: string) {
    return useCharacterMutation<ItemRow[], string, void>(
        characterId,
        ["items"],
        async (_id, itemId) => {
            const { error } = await supabase
                .from("character_items")
                .delete()
                .eq("id", itemId);
            if (error) throw error;
        },
        (prev, itemId) => prev.filter((item) => item.id !== itemId),
    );
}
