import { ScrollView, StyleSheet } from "react-native";
import { useState } from "react";

import {
    ThemedView,
    ThemedList,
    ThemedBoxList, BoxListItem
} from "@/components/themed";
import { ThemedTwoColumnList } from "@/components/themed/ThemedTwoColumnList";
import { AbilityGrid } from "@/components/characterSheet/AbilityGrid";
import { Header } from "@/components/characterSheet/Header"
import { SavingThrowsIcon } from "@/components/icons";

import { useAppTheme } from "@/hooks/useAppTheme";
import { useCharacter, useSavingThrows } from "@/hooks/character";
import { useSkills } from "@/hooks/useAbilities";
import { useClassFeatures } from "@/hooks/useClassFeatures";


export default function MainSheetScreen() {
    const { theme } = useAppTheme();

    const characterId = "val-001"

    const [isExpanded, setIsExpanded] = useState(false);

    const { character, isLoading: charLoading } = useCharacter(characterId);
    const { savingThrows, isLoading: savesLoading } = useSavingThrows(characterId);
    const { skills, isLoading: skillsLoading } = useSkills(character);
    const { features, isLoading: featsLoading } = useClassFeatures(character?.class || "", character?.level);

    const isLoading = charLoading || savesLoading || skillsLoading || featsLoading;


    if (isLoading || !character || !savingThrows || !skills) {
        //  TODO: consider displaying a loading spinner here
    }

    const displayedSkills = isExpanded ? skills : skills.slice(0, 5);

    return (
        <ThemedView style={styles.screen}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>

                {/* AVATAR & HEADER SECTION */}
                <Header characterId={characterId} />

                {/* ABILITY GRID */}
                <AbilityGrid characterId={characterId} />

                {/* SAVING THROWS*/}
                <ThemedTwoColumnList
                    title="Saving Throws"
                    icon={SavingThrowsIcon}
                    data={savingThrows}
                />

                <ThemedList
                    title="Skills"
                    icon="list"
                    data={displayedSkills}
                    footerLabel={isExpanded ? "Show Less" : "View All Skills"}
                    onFooterPress={() => setIsExpanded(!isExpanded)}
                />
                {/** //TODO: we probably want to animate the expansion movement */}

                {/** //TODO: Add combat section here. Consider if it should not belong to another page*/}

                <ThemedBoxList
                    title="Key Features"
                    data={features}
                    itemStyle={styles.features}
                />

            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 ,marginBottom: 20, marginTop: 35},
    scrollView: { flex: 1 },
    scrollContentContainer: { padding: 16, gap: 20},
    features: {
        backgroundColor: '#1C1B1B',
        borderRadius: 12,

        borderLeftWidth: 2,
        borderLeftColor: '#D0BCFF',

        shadowColor: '#D0BCFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 15,

        elevation: 4,
    }
});

