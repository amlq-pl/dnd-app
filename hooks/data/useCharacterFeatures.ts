import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { useCharacterQuery, useCharacterMutation } from "./factory";

type FeatureRow = Database["public"]["Views"]["v_character_features"]["Row"];
type FeatureInsert =
    Database["public"]["Tables"]["character_features"]["Insert"];

export function useCharacterFeatures(characterId: string | undefined) {
    return useCharacterQuery<FeatureRow[]>(
        characterId,
        ["features"],
        async (id) => {
            const { data, error } = await supabase
                .from("v_character_features")
                .select("*")
                .eq("character_id", id);
            if (error) throw error;
            return data;
        },
    );
}

export function useAssignFeature(characterId: string) {
    return useCharacterMutation<
        FeatureRow[],
        Omit<FeatureInsert, "character_id">
    >(
        characterId,
        ["features"],
        async (id, input) => {
            const { error } = await supabase
                .from("character_features")
                .insert({ character_id: id, ...input })
                .select("*");
            if (error) throw error;
            // Refetch the view for the full resolved row
            const { data: features, error: fetchError } = await supabase
                .from("v_character_features")
                .select("*")
                .eq("character_id", id);
            if (fetchError) throw fetchError;
            return features;
        },
        (prev, _input) => prev, // let invalidation refresh from view
    );
}

export function useUnassignFeature(characterId: string) {
    return useCharacterMutation<FeatureRow[], string>(
        characterId,
        ["features"],
        async (id, featureId) => {
            const { error } = await supabase
                .from("character_features")
                .delete()
                .eq("character_id", id)
                .eq("feature_id", featureId);
            if (error) throw error;
            const { data, error: fetchError } = await supabase
                .from("v_character_features")
                .select("*")
                .eq("character_id", id);
            if (fetchError) throw fetchError;
            return data;
        },
        (prev, featureId) => prev.filter((f) => f.feature_id !== featureId),
    );
}
