import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";

import { ThemedView, ThemedList, ThemedBoxList } from "@/components/themed";
import { ThemedTwoColumnList } from "@/components/themed/ThemedTwoColumnList";
import { AbilityGrid } from "@/components/characterSheet/AbilityGrid";
import { Header } from "@/components/characterSheet/Header";
import { SavingThrowsIcon } from "@/components/icons";

import { useAppTheme } from "@/hooks/useAppTheme";
import { useCharacter, useSavingThrows } from "@/hooks/character";
import { useSkills } from "@/hooks/useAbilities";
import { useClassFeatures } from "@/hooks/useClassFeatures";

export default function MainSheetScreen() {
    const { color } = useAppTheme();

    const characterId = "val-001";

    const [isExpanded, setIsExpanded] = useState(false);

    const { character, isLoading: charLoading } = useCharacter(characterId);
    const { savingThrows, isLoading: savesLoading } = useSavingThrows(characterId);
    const { skills, isLoading: skillsLoading } = useSkills(character);
    const { features, isLoading: featsLoading } = useClassFeatures(
        character?.class || "",
        character?.level,
    );

    const isLoading = charLoading || savesLoading || skillsLoading || featsLoading;

    if (isLoading || !character || !savingThrows || !skills) {
        //  TODO: consider displaying a loading spinner here
    }

    const displayedSkills = isExpanded ? skills : skills.slice(0, 5);

    return (
        <ThemedView style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.scrollContentContainer}
                style={styles.scrollView}
            >
                {/* AVATAR & HEADER SECTION */}
                <Header characterId={characterId} />

                {/* ABILITY GRID */}
                <AbilityGrid characterId={characterId} />

                {/* SAVING THROWS*/}
                <View
                    style={{
                        backgroundColor: color("surface.surface"),
                        borderRadius: 12,
                        padding: 12,
                    }}
                >
                    <ThemedTwoColumnList
                        data={savingThrows}
                        icon={SavingThrowsIcon}
                        title="Saving Throws"
                    />
                </View>

                <View
                    style={{
                        backgroundColor: color("surface.surface"),
                        borderRadius: 12,
                        padding: 12,
                        gap: 12,
                    }}
                >
                    <ThemedList
                        data={displayedSkills}
                        footerLabel={isExpanded ? "Show Less" : "View All Skills"}
                        icon="list"
                        title="Skills"
                        onFooterPress={() => setIsExpanded(!isExpanded)}
                    />
                </View>
                {/** //TODO: we probably want to animate the expansion movement */}

                {/** //TODO: Add combat section here. Consider if it should not belong to another page*/}

                <View>
                    <ThemedBoxList data={features} title="Key Features" />
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, marginBottom: 20, marginTop: 35 },
    scrollView: { flex: 1 },
    scrollContentContainer: { padding: 16, gap: 20 },
});
