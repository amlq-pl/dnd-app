import { ThemedHeadline, ThemedStatContainer, ThemedText } from "@/components/themed";
import { Image, View, ActivityIndicator } from "react-native";
import { InspirationIcon, ACIcon, HPIcon } from "@/components/icons";
import { useCharacter } from "@/hooks/character";
import { useStyles } from "@/hooks/useStyles";

export const Header = ({ characterId }: { characterId: string }) => {
    const { styles } = useStyles((theme) => ({
        headerContainer: { alignItems: "center", gap: theme.spacing.sm },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: theme.borderRadius.md,
            alignSelf: "flex-end",
        },
        headerPills: { flexDirection: "row", gap: theme.spacing.sm, alignSelf: "flex-start" },
        heroName: { fontSize: 36, textAlign: "left", alignSelf: "flex-start" },
        vitalsRow: { flexDirection: "row", gap: theme.spacing.xl, alignSelf: "flex-start" },
    }));

    const { character, isLoading } = useCharacter(characterId);

    if (isLoading || !character) return <ActivityIndicator />;

    return (
        <View style={styles.headerContainer}>
            <Image source={{ uri: character?.photoUri }} style={styles.avatar} />
            {/* TODO: add external glow to the image */}

            {/** TODO:  fix these colors */}
            <View style={styles.headerPills}>
                <ThemedStatContainer
                    backgroundColor="buttonPrimary.background"
                    label="LEVEL:"
                    labelColor="buttonPrimary.text"
                    mode="pill"
                    value={character?.level}
                />
                <ThemedStatContainer
                    backgroundColor="buttonSecondary.background"
                    label="CLASS:"
                    labelColor="buttonSecondary.text"
                    mode="pill"
                    value={character?.class.toUpperCase()}
                />
            </View>
            <ThemedHeadline color="text.heading" style={styles.heroName}>
                {character?.name}
            </ThemedHeadline>

            <View style={styles.vitalsRow}>
                <ThemedText color="palette.secondary" variant="label">
                    {" "}
                    <InspirationIcon /> INSPIRATION: {character?.inspiration}
                </ThemedText>
                <ThemedText color="text.muted" variant="label">
                    {" "}
                    <ACIcon color="text.muted" /> AC: {character?.ac}
                </ThemedText>
                <ThemedText color="text.muted" variant="label">
                    {" "}
                    <HPIcon color="text.muted" /> HP: {character?.hp.current}/{character?.hp.max}
                </ThemedText>
            </View>
        </View>
    );
};
