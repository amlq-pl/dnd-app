import { ThemedHeadline, ThemedStatContainer, ThemedText, ThemedView } from "@/components/themed";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import { useCharacter } from "@/hooks/character";
import { useAppTheme } from "@/hooks/useAppTheme";

export const Header = ({ characterId }: { characterId: string }) => {
    const { character, isLoading } = useCharacter(characterId);
    const { theme } = useAppTheme();

    if (isLoading || !character) return <ActivityIndicator />;

    return (
        <ThemedView>
            {/** IDENTITY PROFILE TAG */}
            <ThemedView style={styles.labelContainer}>
                <ThemedText color="text.muted" style={styles.labelText}>
                    IDENTITY PROFILE
                </ThemedText>
            </ThemedView>

            {/** CHARACTER NAME */}
            <ThemedView style={styles.heading}>
                <ThemedHeadline
                    color="text.heading"
                    style={[
                        styles.headingTitle,
                        {
                            fontFamily: theme.typography.headlineFont,
                            fontWeight: "bold",
                        },
                    ]}
                >
                    {character?.name}
                </ThemedHeadline>
            </ThemedView>

            {/** TODO:  fix these colors */}
            <View style={styles.headerPills}>
                <ThemedStatContainer
                    backgroundColor="buttonPrimary.background"
                    label="Level"
                    labelColor="buttonPrimary.text"
                    mode="pill"
                    value={`${character?.level} ${character?.class}`}
                />
                <ThemedStatContainer
                    backgroundColor="buttonSecondary.background"
                    label="Inspiration:"
                    labelColor="buttonSecondary.text"
                    mode="pill"
                    value={character?.inspiration}
                />
            </View>
            {/** TODO: consider adding a level here */}
        </ThemedView>
    );
};

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
    heading: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
    },
    headerPills: { flexDirection: "row", gap: 8, alignSelf: "flex-start" },
    headingTitle: {
        fontSize: 48,
        lineHeight: 60,
    },
    topStats: {
        alignSelf: "stretch",
        flexDirection: "row",
        gap: 8,
        marginTop: -4,
    },
    topStatPill: {
        flexShrink: 1,
        flexGrow: 1,
    },
    card: {
        height: 85,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(192, 132, 252, 0.18)",
    },
    cardMetaLabel: {
        fontSize: 11,
        lineHeight: 16,
        fontWeight: "600",
        opacity: 0.85,
    },
    cardValue: {
        marginTop: 4,
        fontSize: 18,
        lineHeight: 26,
        textAlign: "left",
    },
    labelContainer: {
        alignSelf: "flex-start",
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginBottom: 8,
    },
    labelText: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
});
