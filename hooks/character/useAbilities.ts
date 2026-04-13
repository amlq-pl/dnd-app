import { useState, useEffect } from "react";
import { AbilityScores } from "@/types/character";
import { CharacterService } from "@/services/CharacterService";

export const useAbilities = (characterId: string) => {
    const [data, setData] = useState<AbilityScores | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        CharacterService.getAbilities(characterId).then((scores) => {
            setData(scores);
            setLoading(false);
        });
    }, [characterId]);

    return { data, loading };
};