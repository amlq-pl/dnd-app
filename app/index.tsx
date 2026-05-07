import { ThemedText, ThemedView } from "@/components/themed";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import { ScrollView, Pressable, StyleSheet } from "react-native";

import { Header } from '@/components/landing_page/Header'

export default function LandingScreen() {
    const router = useRouter();
    const { color } = useAppTheme();

    const characterId = "val-001";

    return (
        <ThemedView backgroundColor="surface.background" style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.scrollContentContainer}
                style={styles.scrollView}
            >
                <ThemedView style={styles.content}>
                    <Header />

                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}




// export default function LandingScreen() {
//     const router = useRouter();
//     const { color } = useAppTheme();

//     return (
//         <ThemedView backgroundColor="surface.background" style={styles.screen}>
//             <ThemedText color="text.heading" variant="headline">
//                 Welcome, Adventurer
//             </ThemedText>

//             <Pressable
//                 style={[styles.button, { backgroundColor: color("palette.primary") }]}
//                 onPress={() => router.replace("/(tabs)/home")}
//             >
//                 <ThemedText color="text.onPrimary" variant="label">
//                     Enter
//                 </ThemedText>
//             </Pressable>
//             <Pressable
//                 style={[styles.button, { backgroundColor: color("palette.secondary") }]}
//                 onPress={() => router.replace("/character-creation")}
//             >
//                 <ThemedText color="text.onSecondary" variant="label">
//                     Create Character
//                 </ThemedText>
//             </Pressable>
//         </ThemedView>
//     );
// }

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
    button: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
});
