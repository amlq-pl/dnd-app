import { CharacterInfo, AbilityScores, AbilityKey, SavingThrow, CharacterBiometrics, BiometricEntry, CharacterValues } from "@/types/character";

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
    { key: "STR", label: "Strength" },
    { key: "DEX", label: "Dexterity" },
    { key: "CON", label: "Constitution" },
    { key: "INT", label: "Intelligence" },
    { key: "WIS", label: "Wisdom" },
    { key: "CHA", label: "Charisma" },
];

const MOCK_CHARACTER_BIOMETRICS: CharacterBiometrics = {
    alignment: "Lawful Good",
    gender: "Non-Binary",
    eyes: "Amethyst Glow",
    size: "Medium",
    height: "6'2\"",
    age: "28 Summers",
    faith: "Torm",
    skin: "Bronze-Gold",
};

export const BIOMETRIC_LABELS: Array<{ key: keyof CharacterBiometrics; label: string }> = [
    { key: "alignment", label: "Alignment" },
    { key: "gender", label: "Gender" },
    { key: "eyes", label: "Eye Color" },
    { key: "size", label: "Size" },
    { key: "height", label: "Height" },
    { key: "age", label: "Age" },
    { key: "faith", label: "Faith" },
    { key: "skin", label: "Skin Tone" },
];

const MOCK_VALUES: CharacterValues = {
    background: "Born to the disgraced House of Vaelin, Valerius spent their youth studying the ancient codes of chivalry within the crumbling libraries of the Western Reach. Despite the loss of their family's titles, they carry the weight of a century of honor. Their shield is not just steel; it is a promise to restore the light to the shadowed valleys of their home.",
    personalityTraits: [
        "I have a strong sense of fair play and always try to find the most equitable solution to arguments.",
        "I take everything said to me literally. Sarcasm is a spell I haven't mastered."
    ],
    ideals: [
        "Responsibility: It is my duty to respect the authority of those above me and maintain order for the weak."

    ],
    bonds: [
        "I will one day reclaim my family's castle from the necromancer who stole it."
    ],
    flaws: [
        "I hide a truly scandalous secret that could ruin my family forever if it ever came to light."
    ]
}

// TODO: change photoUri to  "https://tcs.uj.edu.pl/image/journal/article?img_id=155559922&t=1709833578358"
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

    async getBiometrics(id: string): Promise<BiometricEntry[]> {
        return new Promise((resolve) => {
            const biometrics = MOCK_CHARACTER_BIOMETRICS;

            const mappedData: BiometricEntry[] = BIOMETRIC_LABELS.map(({ key, label }) => ({
                key,
                label,
                value: biometrics[key] ?? "—",
            }));

            setTimeout(() => resolve(mappedData), 500);
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
    },


    async getCharacterBackground(id: string): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_VALUES.background), 500);
        });
    },

    async getPersonalityTraits(id: string): Promise<string[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_VALUES.personalityTraits), 400);
        });
    },

    async getIdeals(id: string): Promise<string[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_VALUES.ideals), 450);
        });
    },

    async getBonds(id: string): Promise<string[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_VALUES.bonds), 500);
        });
    },

    async getFlaws(id: string): Promise<string[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_VALUES.flaws), 550);
        });
    },



};