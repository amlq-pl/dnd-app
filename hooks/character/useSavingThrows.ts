import { useState, useEffect } from 'react';
import { SavingThrow } from '@/types/character';
import { CharacterService } from '@/services/CharacterService';

export const useSavingThrows = (characterId: string) => {
    const [savingThrows, setSavingThrows] = useState<SavingThrow[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        CharacterService.getSavingThrows(characterId).then(data => {
            if (isMounted) {
                setSavingThrows(data);
                setIsLoading(false);
            }
        });

        return () => { isMounted = false; };
    }, [characterId]);
    

    return { savingThrows, isLoading };
};