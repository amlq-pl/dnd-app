import {
    ThemedHeadline,
    ThemedStatContainer,
    ThemedText,
} from "@/components/themed";
import { Image, StyleSheet, View, ActivityIndicator } from "react-native";

import { InspirationIcon, ACIcon, HPIcon } from "@/components/icons"
import { useCharacter } from "@/hooks/character";


export const Header = ({ characterId }: { characterId: string }) => {
    const {character, isLoading} = useCharacter(characterId)

    if (isLoading || !character) return <ActivityIndicator/>


    return <View style={styles.headerContainer}>
        <Image
            source={{ uri: character?.photoUri }}
            style={styles.avatar}
        />
        {/* TODO: add external glow to the image */}

        <View style={styles.headerPills}>
            <ThemedStatContainer label="LEVEL" value={character?.level} mode="pill" backgroundColor="palette.primary" />
            <ThemedStatContainer label="CLASS" value={character?.class.toUpperCase()} mode="pill" backgroundColor="palette.tertiary" />
        </View>
        <ThemedHeadline style={styles.heroName}>{character?.name}</ThemedHeadline>

        <View style={styles.vitalsRow}>
            <ThemedText variant="label" color="palette.secondary"> <InspirationIcon /> INSPIRATION: {character?.inspiration}</ThemedText>
            <ThemedText variant="label" color="palette.secondary"> <ACIcon /> AC: {character?.ac}</ThemedText>
            <ThemedText variant="label" color="palette.secondary"> <HPIcon /> HP: {character?.hp.current}/{character?.hp.max}</ThemedText>
        </View>
    </View>
}



const styles = StyleSheet.create({
    headerContainer: { alignItems: 'center', gap: 8 },
    avatar: { width: 100, height: 100, borderRadius: 12, alignSelf: 'flex-end' },
    headerPills: { flexDirection: 'row', gap: 8, alignSelf: 'flex-start' },
    heroName: { fontSize: 36, textAlign: 'left', alignSelf: 'flex-start' },
    vitalsRow: { flexDirection: 'row', gap: 16, alignSelf: 'flex-start' },
});

