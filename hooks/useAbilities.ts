import { useState, useEffect } from "react";
import { SkillEntry } from "@/types/skills";
import { CharacterInfo } from "@/types/character";
import { SkillService } from "@/services/SkillService";

export const useSkills = (character: CharacterInfo | null) => {
    const [skills, setSkills] = useState<SkillEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!character) return;

        SkillService.getSkillsForUser(character).then((data) => {
            setSkills(data);
            setIsLoading(false);
        });
    }, [character?.id]);

    return { skills, isLoading };
};