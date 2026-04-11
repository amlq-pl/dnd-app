import { ThemedText, ThemedView } from "@/components/themed";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CharacterCreationScreen() {
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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 24,
    },
    button: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
});
