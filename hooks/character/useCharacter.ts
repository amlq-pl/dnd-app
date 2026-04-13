import { useState, useEffect } from "react";
import { CharacterInfo } from "@/types/character";
import { CharacterService } from "@/services/CharacterService";

export function useCharacter(id: string) {
    const [character, setCharacter] = useState<CharacterInfo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const data = await CharacterService.getCharacterById(id);
                setCharacter(data);
            } catch (e) {
                setError(e as Error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [id]);

    return { character, isLoading, error };
}