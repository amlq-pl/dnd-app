import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { useCatalogQuery } from "./factory";

type RaceRow = Database["public"]["Tables"]["races"]["Row"];
type ClassRow = Database["public"]["Tables"]["classes"]["Row"];
type SpellRow = Database["public"]["Tables"]["spells"]["Row"];
type FeatureRow = Database["public"]["Tables"]["features"]["Row"];

export function useRaces() {
    return useCatalogQuery<RaceRow[]>("races", async () => {
        const { data, error } = await supabase
            .from("races")
            .select("*")
            .order("name");
        if (error) throw error;
        return data;
    });
}

export function useClasses() {
    return useCatalogQuery<ClassRow[]>("classes", async () => {
        const { data, error } = await supabase
            .from("classes")
            .select("*, subclasses(*)")
            .order("name");
        if (error) throw error;
        return data;
    });
}

export function useSpellsCatalog() {
    return useCatalogQuery<SpellRow[]>("spells", async () => {
        const { data, error } = await supabase
            .from("spells")
            .select("*")
            .order("name");
        if (error) throw error;
        return data;
    });
}

export function useFeaturesCatalog() {
    return useCatalogQuery<FeatureRow[]>("features", async () => {
        const { data, error } = await supabase
            .from("features")
            .select("*")
            .order("name");
        if (error) throw error;
        return data;
    });
}
