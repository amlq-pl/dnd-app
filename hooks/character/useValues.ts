import { useState, useEffect } from 'react';
import { CharacterService } from '@/services/CharacterService';
import { CharacterValues } from '@/types/character';
import { BoxListItem } from '@/components/themed';

export const useCharacterBackground = (characterId: string) => {
    const [data, setData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBackground = async () => {
            try {
                const result = await CharacterService.getCharacterBackground(characterId);
                setData(result);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBackground();
    }, [characterId]);

    return { data, isLoading };
};

export const usePersonalityTraits = (id: string) => {
    const [data, setData] = useState<BoxListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        CharacterService.getPersonalityTraits(id).then((res) => {
            const mapped = res.map(trait => ({
                title: "",
                description: trait,
                accentColor: true,
            }));
            setData(mapped);
            setIsLoading(false);
        });
    }, [id]);

    return { data, isLoading };
};

/**
 * Maps Ideals (objects) to BoxListItems. 
 * Ideals typically do not use the accent bar in the design.
 */
export const useIdeals = (id: string) => {
    const [data, setData] = useState<BoxListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        CharacterService.getIdeals(id).then((res) => {
            const mapped = res.map(bond => ({
                title: "",
                description: bond,
                accentColor: true,
            }));
            setData(mapped);
            setIsLoading(false);
        });
    }, [id]);

    return { data, isLoading };
};


/**
 * Maps Bonds to BoxListItems with accent bars enabled.
 */
export const useBonds = (id: string) => {
    const [data, setData] = useState<BoxListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        CharacterService.getBonds(id).then((res) => {
            const mapped = res.map(bond => ({
                title: "",
                description: bond,
                accentColor: true,
            }));
            setData(mapped);
            setIsLoading(false);
        });
    }, [id]);

    return { data, isLoading };
};

/**
 * Maps Flaws to BoxListItems.
 * Often includes specific container styling (e.g., error/red tints).
 */
export const useFlaws = (id: string) => {
    const [data, setData] = useState<BoxListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        CharacterService.getFlaws(id).then((res) => {
            const mapped = res.map(flaw => ({
                title: "",
                description: flaw,
                accentColor: false,
            }));
            setData(mapped);
            setIsLoading(false);
        });
    }, [id]);

    return { data, isLoading };
};