import { ThemedView, ThemedBoxList } from "@/components/themed";
import { ScrollView } from "react-native";
import {
    useBonds,
    useCharacter,
    useCharacterBackground,
    useFlaws,
    useIdeals,
    usePersonalityTraits,
} from "@/hooks/character";
import { Header } from "@/components/characteristics/Header";
import { BiometricsGrid } from "@/components/characteristics/BiometricsGrid";
import { Note } from "@/components/Note";
import { useStyles } from "@/hooks/useStyles";

export default function CharacteristicsScreen() {
    const { styles } = useStyles((theme, c) => ({
        screen: { flex: 1, marginBottom: theme.spacing.xl, marginTop: 35 },
        scrollView: { flex: 1, alignSelf: "stretch" },
        scrollContentContainer: { flexGrow: 1 },
        content: {
            alignSelf: "stretch",
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.xl,
            gap: theme.spacing.lg,
        },
        features: {
            borderRadius: theme.borderRadius.md,
            borderLeftWidth: 2,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
            elevation: 4,
        },
    }));

    const characterId = "val-001";
    const { character, isLoading: charLoading } = useCharacter(characterId);
    const { data: background, isLoading: valLoading } = useCharacterBackground(characterId);
    const { data: traits, isLoading: traitsLoading } = usePersonalityTraits(characterId);
    const { data: flaws, isLoading: flawsLoading } = useFlaws(characterId);
    const { data: ideals, isLoading: idealsLoading } = useIdeals(characterId);
    const { data: bonds, isLoading: bondsLoading } = useBonds(characterId);

    const isLoading =
        charLoading || valLoading || flawsLoading || idealsLoading || bondsLoading || traitsLoading;

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
                    {/** HEADER  */}
                    <Header characterId={characterId} />

                    {/** GRID */}
                    <BiometricsGrid characterId={characterId} />

                    {/** BACKGROUND */}
                    <Note
                        backgroundColor="surface.note"
                        textColor="text.note"
                        title="The Noble Background"
                        titleColor="text.lively"
                    >
                        {background}
                    </Note>

                    <ThemedBoxList
                        data={traits}
                        glowColor="palette.secondary"
                        itemStyle={styles.features}
                        title="Personality Traits"
                    />

                    <ThemedBoxList
                        data={bonds}
                        glowColor="palette.tertiary"
                        itemStyle={styles.features}
                        title="Bonds"
                    />

                    <ThemedBoxList
                        data={ideals}
                        glowColor="palette.tertiary"
                        itemStyle={styles.features}
                        title="Ideals"
                    />

                    <ThemedBoxList
                        data={flaws}
                        glowColor="semantic.error"
                        itemStyle={styles.features}
                        title="Flaws"
                    />
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}
