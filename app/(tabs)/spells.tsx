import { ThemedHeadline, ThemedText, ThemedView, SpellCard } from "@/components/themed";
import { useStyles } from "@/hooks/useStyles";
import { useSpells } from "@/hooks/useSpells";
import { ScrollView } from "react-native";

export default function SpellsScreen() {
    const { styles } = useStyles((t, c) => ({
        container: { flex: 1, padding: t.spacing.lg },
        scrollContent: { paddingBottom: t.spacing.xxl },
        headline: {
            marginBottom: t.spacing.lg,
            textAlign: "center",
        },
        list: { width: "100%" },
        empty: {
            marginTop: t.spacing.xxxl,
            textAlign: "center",
        },
    }));

    const { spells, isLoading } = useSpells();

    return (
        <ThemedView backgroundColor="surface.background" style={styles.container}>
            <ThemedHeadline color="text.heading" style={styles.headline}>
                Spells
            </ThemedHeadline>
            {isLoading ? (
                <ThemedView style={styles.empty}>
                    <ThemedText color="text.muted" variant="body">
                        Loading spells...
                    </ThemedText>
                </ThemedView>
            ) : spells.length === 0 ? (
                <ThemedView style={styles.empty}>
                    <ThemedText color="text.muted" variant="body">
                        No spells available.
                    </ThemedText>
                </ThemedView>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <ThemedView style={styles.list}>
                        {spells.map((spell) => (
                            <SpellCard key={spell.id} spell={spell} />
                        ))}
                    </ThemedView>
                </ScrollView>
            )}
        </ThemedView>
    );
}
