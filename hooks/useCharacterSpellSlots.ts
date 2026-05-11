import { useState, useEffect } from "react";
import { SpellSlot } from "@/types/spellSlots";

const MOCKED_SPELL_SLOTS: SpellSlot[] = [
    { level: 1, current: 4, max: 4 },
    { level: 2, current: 3, max: 3 },
    { level: 3, current: 2, max: 2 },
    { level: 4, current: 1, max: 2 },
    { level: 5, current: 0, max: 1 },
];

export const useCharacterSpellSlots = (characterId?: string) => {
    const [spellSlots, setSpellSlots] = useState<SpellSlot[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Simulate fetching data from an API
        // In a real app, this would use characterId to fetch the correct character's spell slots
        setSpellSlots(MOCKED_SPELL_SLOTS);
        setIsLoading(false);
    }, [characterId]);
    
    return { spellSlots, isLoading };
};
