import { useState, useEffect } from "react";
import { ClassFeature } from "@/types/character";
import { ClassService

 } from "@/services/ClassService";
export const useClassFeatures = (classId: string, level: number | undefined) => {
    const [features, setFeatures] = useState<ClassFeature[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        ClassService.getFeaturesByClass(classId, level || 1)
            .then((data) => {
                setFeatures(data);
                setIsLoading(false);
            });
    }, [classId]);

    return { features, isLoading };
};