import { ThemedText, ThemedView } from "@/components/themed";
import { useStyles } from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function LandingScreen() {
    const { styles } = useStyles((theme, c) => ({
        screen: { flex: 1, justifyContent: "center", alignItems: "center", gap: 24 },
        buttonPrimary: {
            paddingHorizontal: theme.spacing.xxl,
            paddingVertical: theme.spacing.lg,
            borderRadius: theme.borderRadius.md,
            backgroundColor: c("palette.primary"),
        },
        buttonSecondary: {
            paddingHorizontal: theme.spacing.xxl,
            paddingVertical: theme.spacing.lg,
            borderRadius: theme.borderRadius.md,
            backgroundColor: c("palette.secondary"),
        },
    }));
    const router = useRouter();

    return (
        <ThemedView backgroundColor="surface.background" style={styles.screen}>
            <ThemedText color="text.heading" variant="headline">
                Welcome, Adventurer
            </ThemedText>

            <Pressable style={styles.buttonPrimary} onPress={() => router.replace("/(tabs)/home")}>
                <ThemedText color="text.onPrimary" variant="label">
                    Enter
                </ThemedText>
            </Pressable>
            <Pressable
                style={styles.buttonSecondary}
                onPress={() => router.replace("/character-creation")}
            >
                <ThemedText color="text.onSecondary" variant="label">
                    Create Character
                </ThemedText>
            </Pressable>
        </ThemedView>
    );
}
