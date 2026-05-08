import { ThemedText, ThemedView } from "@/components/themed";
import { useStyles } from "@/hooks/useStyles";

export default function CombatScreen() {
    const { styles } = useStyles(() => ({
        screen: { flex: 1, justifyContent: "center", alignItems: "center" },
    }));

    return (
        <ThemedView backgroundColor="surface.background" style={styles.screen}>
            <ThemedText color="text.heading" variant="headline">
                Combat
            </ThemedText>
        </ThemedView>
    );
}
