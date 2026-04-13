// class descriptions, features, etc

import { ClassFeature } from "@/types/character";

const CLASS_REGISTRY: Record<string, ClassFeature[]> = {
    Paladin: [
        {
            id: "pala-01",
            requiredLevel: 1,
            title: "Lay on Hands",
            description: "Healing pool: 60/60 points remaining. Use action to touch and heal.",
            accentColor: false,
        },
        {
            id: "pala-06",
            requiredLevel: 6,
            title: "Aura of Protection",
            description: "You and friendly creatures within 10 feet gain a +5 bonus to all saving throws.",
            accentColor: false,
        },
    ],
};

export const ClassService = {
    async getFeaturesByClass(className: string, level: number): Promise<ClassFeature[]> {
        const allFeatures = CLASS_REGISTRY[className] || [];
        return allFeatures.filter(f => f.requiredLevel <= level);
    }
};