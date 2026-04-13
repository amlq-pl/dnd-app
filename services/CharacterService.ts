import { CharacterInfo, AbilityScores, AbilityKey, SavingThrow } from "@/types/character";

const calculateModifier = (score: number): string => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
};

const calculateModifierValue = (score: number): number => Math.floor((score - 10) / 2);

const formatMod = (val: number): string => (val >= 0 ? `+${val}` : `${val}`);

const MOCK_ABILITIES: AbilityScores = {
    STR: { score: 18, mod: calculateModifier(18) },
    DEX: { score: 10, mod: calculateModifier(10) },
    CON: { score: 16, mod: calculateModifier(16) },
    INT: { score: 8, mod: calculateModifier(8) },
    WIS: { score: 12, mod: calculateModifier(12) },
    CHA: { score: 20, mod: calculateModifier(20) },
};

export const ABILITY_LABELS: Array<{ key: AbilityKey; label: string }> = [
    { key: "STR", label: "STRENGTH" },
    { key: "DEX", label: "DEXTERITY" },
    { key: "CON", label: "CONSTITUTION" },
    { key: "INT", label: "INTELLIGENCE" },
    { key: "WIS", label: "WISDOM" },
    { key: "CHA", label: "CHARISMA" },
];


const MOCK_CHARACTER: CharacterInfo = {
    id: "val-001",
    name: "Valerius the Bold",
    photoUri: "https://i.redd.it/zmk36tvpv5n51.jpg",
    level: 12,
    class: "Paladin",
    race: "Elf",
    inspiration: 1,
    ac: 21,
    hp: { current: 104, max: 104 },
    abilityScores: MOCK_ABILITIES,
    proficientSaves: ["WIS", "CHA"],
};

// TODO: connect it to a real db
export const CharacterService = {
    async getCharacterById(id: string): Promise<CharacterInfo> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_CHARACTER), 500);
        });
    },

    async getAbilities(id: string): Promise<AbilityScores> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_ABILITIES), 500);
        });
    },

    async getSavingThrows(id: string): Promise<SavingThrow[]> {
        return new Promise((resolve) => {
            const char = MOCK_CHARACTER;
            const pb = Math.floor((char.level - 1) / 4) + 2;

            const saves: SavingThrow[] = ABILITY_LABELS.map((ability) => {
                const scoreObj = char.abilityScores[ability.key];
                const score = scoreObj.score;
                const mod = calculateModifierValue(score);
                const isProficient = char.proficientSaves.includes(ability.key);

                const total = mod + (isProficient ? pb : 0);

                return {
                    key: ability.key,
                    label: ability.label,
                    value: formatMod(total),
                    highlight: isProficient,
                };
            });

            setTimeout(() => resolve(saves), 500);
        });
    }



};