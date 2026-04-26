import { useState, useEffect } from "react";
import { BiometricEntry } from "@/types/character";
import { CharacterService } from "@/services/CharacterService";

interface BiometricsState {
    data: BiometricEntry[];
    isLoading: boolean;
    error: Error | null;
}

export const useBiometrics = (characterId: string): BiometricsState => {
    const [state, setState] = useState<BiometricsState>({
        data: [],
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const results = await CharacterService.getBiometrics(characterId);
                if (isMounted) {
                    setState({ data: results, isLoading: false, error: null });
                }
            } catch (err) {
                if (isMounted) {
                    setState({
                        data: [],
                        isLoading: false,
                        error: err instanceof Error ? err : new Error("Fetch failed")
                    });
                }
            }
        };

        fetchData();
        return () => { isMounted = false; };
    }, [characterId]);

    return state;
};