import { ThemedHeadline, ThemedStatContainer, ThemedText } from "@/components/themed";
import { Image, StyleSheet, View, ActivityIndicator } from "react-native";

import { InspirationIcon, ACIcon, HPIcon } from "@/components/icons";
import { useCharacter } from "@/hooks/character";

export const Header = ({ characterId }: { characterId: string }) => {
    const { character, isLoading } = useCharacter(characterId);

    if (isLoading || !character) return <ActivityIndicator />;

    return (
        <View style={styles.headerContainer}>
            <View style={styles.avatarWrapper}>
                <Image source={{ uri: character?.photoUri }} style={styles.avatar} />
            </View>

            <View style={styles.headerPills}>
                <ThemedStatContainer
                    backgroundColor="palette.primary"
                    label="LEVEL"
                    labelColor="text.onPrimary"
                    mode="pill"
                    value={character?.level}
                />
                <ThemedStatContainer
                    backgroundColor="palette.tertiary"
                    label="CLASS"
                    labelColor="text.onTertiary"
                    mode="pill"
                    value={character?.class.toUpperCase()}
                />
            </View>
            <ThemedHeadline style={styles.heroName}>{character?.name}</ThemedHeadline>

            <View style={styles.vitalsRow}>
                <ThemedText color="palette.secondary" variant="label">
                    <InspirationIcon /> INSPIRATION: {character?.inspiration}
                </ThemedText>
                <ThemedText color="text.muted" variant="label">
                    <ACIcon /> AC: {character?.ac}
                </ThemedText>
                <ThemedText color="text.muted" variant="label">
                    <HPIcon /> HP: {character?.hp.current}/{character?.hp.max}
                </ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: { alignItems: "center", gap: 8 },
    avatarWrapper: {
        alignSelf: "flex-end",
        width: 100,
        height: 100,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#000",
    },
    avatar: { width: 100, height: 100 },
    headerPills: { flexDirection: "row", gap: 8, alignSelf: "flex-start" },
    heroName: { fontSize: 36, textAlign: "left", alignSelf: "flex-start" },
    vitalsRow: { flexDirection: "row", gap: 16, alignSelf: "flex-start" },
});
