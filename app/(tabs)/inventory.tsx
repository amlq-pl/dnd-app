import { ThemedText, ThemedView } from "@/components/themed";
import { StyleSheet } from "react-native";

export default function InventoryScreen() {
    return (
        <ThemedView backgroundColor="surface.background" style={styles.screen}>
            <ThemedText color="text.heading" variant="headline">
                Inventory
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
