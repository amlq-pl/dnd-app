import { ThemedView } from "@/components/themed";
import { useStyles } from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

import { CharacterIcon, PlusCircleIcon } from "@/components/icons";

import { MainHeader } from "@/components/SheetsAndGigglesHeader";
import LandingActionCard from "@/components/landing_page/LandingActionCard";

export default function LandingView() {
    const { styles } = useStyles((theme, c) => ({
        screen: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
        },
        scrollView: { flex: 1, alignSelf: "stretch" },
        scrollContentContainer: { flexGrow: 1 },
        content: {
            alignSelf: "stretch",
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.xl,
            gap: theme.spacing.lg,
        },
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
            <ScrollView
                contentContainerStyle={styles.scrollContentContainer}
                style={styles.scrollView}
            >
                <ThemedView style={styles.content}>
                    {/** HEADER */}
                    <MainHeader />

                    {/** CHARACTER LIST */}
                    <LandingActionCard
                        buttonText="Open Vault"
                        colorMotif="palette.tertiary"
                        description="Access your roster of 12 active heroes."
                        icon={
                            <CharacterIcon
                                color={"palette.tertiary"}
                                size={32}
                            />
                        }
                        title="Character List"
                        onPress={() => router.replace("/(tabs)/my-adventurers")}
                    />
                    {/** TODO: Change 12 to the real number of created heroes  */}

                    {/** CREATE NEW CHARACTER */}
                    <LandingActionCard
                        buttonText="Begin Forging"
                        colorMotif="palette.secondary"
                        description="Guided step-by-step master builder."
                        icon={
                            <PlusCircleIcon
                                color={"palette.secondary"}
                                size={32}
                            />
                        }
                        title="Create New Character"
                        onPress={() => router.replace("/character-creation")}
                    />
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}
