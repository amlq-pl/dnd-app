import { AbilityKey } from "./character";
import { ListEntry } from "./lists";

export type SkillKey =
    | "Acrobatics" | "Animal Handling" | "Arcana" | "Athletics" | "Deception"
    | "History" | "Insight" | "Intimidation" | "Investigation" | "Medicine"
    | "Nature" | "Perception" | "Performance" | "Persuasion" | "Religion"
    | "Sleight of Hand" | "Stealth" | "Survival";

export interface SkillDefinition {
    label: string;
    ability: AbilityKey;
}

export interface SkillEntry extends ListEntry {
    key: SkillKey;
}