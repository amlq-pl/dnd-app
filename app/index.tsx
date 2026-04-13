import { ThemedText, ThemedView } from "@/components/themed";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import CharacterSheets from "./CharacterSheet";

export default function LandingScreen() {
    const router = useRouter();
    const { color } = useAppTheme();

    return (
        <ThemedView backgroundColor="surface.background" style={styles.screen}>
            <ThemedText color="text.heading" variant="headline">
                Welcome, Adventurer
            </ThemedText>

            <Pressable
                style={[styles.button, { backgroundColor: color("palette.primary") }]}
                onPress={() => router.replace("/(tabs)/home")}
            >
                <ThemedText color="text.onPrimary" variant="label">
                    Enter
                </ThemedText>
            </Pressable>
            <Pressable
                style={[styles.button, { backgroundColor: color("palette.secondary") }]}
                onPress={() => router.replace("/character-creation")}
            >
                <ThemedText color="text.onSecondary" variant="label">
                    Create Character
                </ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
    },
    button: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
});
