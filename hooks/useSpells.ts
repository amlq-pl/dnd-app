import { useState, useEffect } from "react";
import { Spell } from "@/types/spells";

const MOCKED_SPELLS: Spell[] = [
    {
        id: "spell-1",
        name: "Magic Missile",
        level: 1,
        casting_time: "1 action",
        range: "120 feet",
        duration: "Instantaneous",
        rolls: "1d4 + 1",
        concentration: false,
        description:
            "You hurl a mote of magical force at a creature you can see within range. Make a ranged spell attack against the target. On a hit, the target takes 1d4 + 1 force damage.",
        school_of_magic: "Evocation",
        ritual: false,
        components: ["V", "S"],
        tags: ["damage", "single-target"],
        damage_type: "Force",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "spell-2",
        name: "Cure Wounds",
        level: 1,
        casting_time: "1 action",
        range: "Touch",
        duration: "Instantaneous",
        rolls: "1d8 + spellcasting ability modifier",
        concentration: false,
        description:
            "A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.",
        school_of_magic: "Evocation",
        ritual: false,
        components: ["V", "S"],
        tags: ["healing", "single-target"],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "spell-3",
        name: "Burning Hands",
        level: 1,
        casting_time: "1 action",
        range: "Self (15-foot cone)",
        duration: "Instantaneous",
        rolls: "3d6",
        concentration: false,
        description:
            "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames springs from your fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw.",
        school_of_magic: "Evocation",
        ritual: false,
        components: ["V", "S"],
        tags: ["damage", "aoe"],
        damage_type: "Fire",
        saving_throw: "DEX",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "spell-4",
        name: "Detect Magic",
        level: 0,
        casting_time: "1 action",
        range: "Self",
        duration: "Concentration, up to 10 minutes",
        rolls: "NA",
        concentration: true,
        description:
            "For the spell's duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic.",
        school_of_magic: "Divination",
        ritual: true,
        components: ["V", "S"],
        tags: ["detection", "utility"],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "spell-5",
        name: "Find Familiar",
        level: 1,
        casting_time: "1 hour",
        range: "10 feet",
        duration: "Instantaneous",
        rolls: "NA",
        concentration: false,
        description:
            "You gain the service of a faithful familiar that acts independently of you, but always obeys your commands. Appearing in an unoccupied space within 10 feet of you, the familiar takes the form of a cat, rat, raven, or other small creature.",
        school_of_magic: "Conjuration",
        ritual: true,
        components: ["V", "S", "M"],
        material: {
            description: "10 gp worth of charcoal, incense, and herbs that must be consumed by fire in a brass brazier",
            consumed: true,
        },
        tags: ["summoning", "utility"],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "spell-6",
        name: "Fireball",
        level: 3,
        casting_time: "1 action",
        range: "150 feet",
        duration: "Instantaneous",
        rolls: "8d6",
        concentration: false,
        description:
            "A bright streak flashes from your pointing finger to a point of your choice within range. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw.",
        school_of_magic: "Evocation",
        ritual: false,
        components: ["V", "S", "M"],
        material: {
            description: "A tiny ball of bat guano and sulfur",
            consumed: false,
        },
        tags: ["damage", "aoe"],
        damage_type: "Fire",
        saving_throw: "DEX",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export const useSpells = () => {
    const [spells, setSpells] = useState<Spell[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Simulate fetching data from an API
        setSpells(MOCKED_SPELLS);
        setIsLoading(false);
    }, []);
    
    return { spells, isLoading };
};
