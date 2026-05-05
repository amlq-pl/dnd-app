import { ThemedText, ThemedView } from "@/components/themed";
import { useStyles } from "@/hooks/useStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CharacterCreationScreen() {
    const { styles } = useStyles((theme) => ({
        screen: { flex: 1 },
        safeArea: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: theme.spacing.xl,
        },
    }));

    return (
        <ThemedView backgroundColor="surface.background" style={styles.screen}>
            <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
                <ThemedText color="text.heading" variant="headline">
                    Character Creation
                </ThemedText>
            </SafeAreaView>
        </ThemedView>
    );
}
