import { ListItem} from "./lists";
import { BoxListItem } from "@/components/themed";

// TODO: modify if necessary
export type CharacterClass = "Paladin" | "Fighter" | "Cleric" | "Wizard" | "Rogue";
export type CharacterRace = "Elf" | "Dwarf" | "Human" | "Dragonborn";
export type AbilityKey = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export interface AbilityValue {
    score: number;
    mod: string;
}

export type AbilityScores = Record<AbilityKey, AbilityValue>;

export interface AbilityLabel {
    key: AbilityKey;
    label: string;
}

export interface SavingThrow extends ListItem {
    key: AbilityKey;
    label: string;
    value: string; // formatted string, e.g., +5
    highlight?: boolean; // indicate proficiency
}

export interface ClassFeature extends BoxListItem{
    id: string;
    requiredLevel: number;
}

export interface CharacterInfo {
    id: string;
    name: string;
    photoUri: string;
    level: number;
    class: CharacterClass;
    race: CharacterRace;
    inspiration: number;
    ac: number;
    hp: {
        current: number;
        max: number;
    };
    abilityScores: AbilityScores
    proficientSaves: AbilityKey[];
}
export interface BiometricEntry {
    key: keyof CharacterBiometrics;
    label: string;
    value: string;
}
export interface CharacterBiometrics {
    alignment: string,
    gender: string,
    eyes: string,
    size: string,
    height: string,
    age: string,
    faith: string,
    skin: string,
};

export interface CharacterValues {
    background: string,
    personalityTraits: Array<string>,
    ideals: Array<string>,
    bonds: Array<string>,
    flaws: Array<string>

}