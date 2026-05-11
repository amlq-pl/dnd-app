export type SpellComponent = "V" | "S" | "M";

export type Material = {
    description: string;
    consumed?: boolean;
};

export type SavingThrow = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export type SchoolOfMagic = "Abjuration" | "Conjuration" | "Divination" | "Enchantment" | "Evocation" | "Illusion" | "Necromancy" | "Transmutation";

export type DamageType = "Acid" | "Bludgeoning" | "Cold" | "Fire" | "Force" | "Lightning" | "Necrotic" | "Piercing" | "Poison" | "Psychic" | "Radiant" | "Slashing" | "Thunder";

export const viewMap = {
    
}
export type Spell = {
    id: string;
    name: string;
    level: number; // 0-9
    casting_time: string;
    range: string;
    duration: string;
    rolls: string;
    concentration: boolean;
    description: string;
    school_of_magic: SchoolOfMagic;
    ritual: boolean;
    components: SpellComponent[];
    material?: Material;
    tags: string[];
    saving_throw?: SavingThrow;
    damage_type?: DamageType;
    created_at: string;
    updated_at: string;
};
