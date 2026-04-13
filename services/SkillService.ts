import { AbilityKey, CharacterInfo } from "@/types/character";
import { SkillKey, SkillDefinition, SkillEntry } from "@/types/skills";
import {BulletState} from '@/types/lists'

const SKILL_MAP: Record<SkillKey, SkillDefinition> = {
    Acrobatics: { label: "Acrobatics (Dex)", ability: "DEX" },
    "Animal Handling": { label: "Animal Handling (Wis)", ability: "WIS" },
    Arcana: { label: "Arcana (Int)", ability: "INT" },
    Athletics: { label: "Athletics (Str)", ability: "STR" },
    Deception: { label: "Deception (Cha)", ability: "CHA" },
    History: { label: "History (Int)", ability: "INT" },
    Insight: { label: "Insight (Wis)", ability: "WIS" },
    Intimidation: { label: "Intimidation (Cha)", ability: "CHA" },
    Investigation: { label: "Investigation (Int)", ability: "INT" },
    Medicine: { label: "Medicine (Wis)", ability: "WIS" },
    Nature: { label: "Nature (Int)", ability: "INT" },
    Perception: { label: "Perception (Wis)", ability: "WIS" },
    Performance: { label: "Performance (Cha)", ability: "CHA" },
    Persuasion: { label: "Persuasion (Cha)", ability: "CHA" },
    Religion: { label: "Religion (Int)", ability: "INT" },
    "Sleight of Hand": { label: "Sleight of Hand (Dex)", ability: "DEX" },
    Stealth: { label: "Stealth (Dex)", ability: "DEX" },
    Survival: { label: "Survival (Wis)", ability: "WIS" },
};

export const SkillService = {
    async getSkillsForUser(character: CharacterInfo): Promise<SkillEntry[]> {
        const pb = Math.floor((character.level - 1) / 4) + 2;

        const proficiencies: SkillKey[] = ["Athletics", "Persuasion", "Religion"];

        return new Promise((resolve) => {
            const skills = (Object.keys(SKILL_MAP) as SkillKey[]).map((key) => {
                const def = SKILL_MAP[key];
                const score = character.abilityScores[def.ability].score;
                const mod = Math.floor((score - 10) / 2);
                const isProficient = proficiencies.includes(key);

                const total = mod + (isProficient ? pb : 0);

                const state: BulletState = isProficient ? "active" : "inactive";

                return {
                    key,
                    label: def.label,
                    value: total >= 0 ? `+${total}` : `${total}`,
                    state: state
                };
            });

            setTimeout(() => resolve(skills), 400);
        });
    }
};