import {
    ThemedView, ThemedBoxList
} from "@/components/themed";
import { ScrollView, StyleSheet } from "react-native";
import { useBonds, useCharacter, useCharacterBackground, useFlaws, useIdeals, usePersonalityTraits } from "@/hooks/character";
import { Header } from "@/components/characteristics/Header";
import { BiometricsGrid } from "@/components/characteristics/BiometricsGrid";
import { Note } from "@/components/Note"

export default function CharacteristicsScreen() {

    const characterId = "val-001"
    const { character, isLoading: charLoading } = useCharacter(characterId);
    const { data: background, isLoading: valLoading } = useCharacterBackground(characterId);

    const { data: traits, isLoading: traitsLoading } = usePersonalityTraits(characterId);
    const { data: flaws, isLoading: flawsLoading } = useFlaws(characterId);
    const { data: ideals, isLoading: idealsLoading } = useIdeals(characterId);
    const { data: bonds, isLoading: bondsLoading } = useBonds(characterId);

    const isLoading = charLoading || valLoading || flawsLoading || idealsLoading || bondsLoading || traitsLoading;

    if (isLoading || !character || !background || !flaws || !ideals || !bonds || !traits) {
        // TODO: handle it

    }

    return (
        <ThemedView backgroundColor="surface.background" style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.scrollContentContainer}
                style={styles.scrollView}
            >

                <ThemedView style={styles.content}>
                    { /** HEADER  */}
                    <Header characterId={characterId} />

                    { /** GRID */}
                    <BiometricsGrid characterId={characterId} />

                    { /** BACKGROUND */}
                    <Note
                        title="The Noble Background"
                        titleColor="text.lively"
                        backgroundColor="surface.note"
                        textColor="text.note"
                    >
                        {background}
                    </Note>

                    <ThemedBoxList
                        title="Personality Traits"
                        data={traits}
                        itemStyle={styles.features}
                        glowColor="palette.secondary"
                    />

                    <ThemedBoxList
                        title="Bonds"
                        data={bonds}
                        itemStyle={styles.features}
                        glowColor="palette.tertiary"
                    />

                    <ThemedBoxList
                        title="Ideals"
                        data={ideals}
                        itemStyle={styles.features}
                        glowColor="palette.tertiary"
                    />

                    <ThemedBoxList
                        title="Flaws"
                        data={flaws}
                        itemStyle={styles.features}
                        glowColor="semantic.error"
                    />

                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, marginBottom: 20, marginTop: 35 },
    scrollView: {
        flex: 1,
        alignSelf: "stretch",
    },
    scrollContentContainer: {
        flexGrow: 1,
    },
    content: {
        alignSelf: "stretch",
        paddingHorizontal: 16,
        paddingTop: 24,
        gap: 16,
    },
    features: {
        borderRadius: 12,

        borderLeftWidth: 2,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 15,

        elevation: 4,
    }
});
