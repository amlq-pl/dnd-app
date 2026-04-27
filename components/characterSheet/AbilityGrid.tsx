import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
    ThemedGrid,
    ThemedText
} from "@/components/themed";
import { BoxWithGlow } from ".././BoxWithGlow";
import { useAbilities } from "@/hooks/character/useAbilities";
import { ABILITY_LABELS } from "@/services/CharacterService";


export const AbilityGrid = ({ characterId }: { characterId: string }) => {
    const { data: scores, loading } = useAbilities(characterId);

    if (loading || !scores) return <ActivityIndicator />;

    return (
        <ThemedGrid
            data={ABILITY_LABELS}
            columns={2}
            rowGap={12}
            columnGap={12}
            renderItem={({ key, label }) => (
                <BoxWithGlow glow={true} glowColor="card.glow">
                    <View>
                        <ThemedText variant="body" color="card.header" style={styles.abilityLabel}>
                            {label.toUpperCase()}
                        </ThemedText>
                        <ThemedText variant="headline" color="card.label" style={styles.abilityScore}>
                            {scores[key].score}
                        </ThemedText>
                    </View>
                    <ThemedText variant="headline" color="card.note" style={styles.abilityMod}>
                        {scores[key].mod}
                    </ThemedText>
                </BoxWithGlow>
            )}
        />
    );
};

const styles = StyleSheet.create({
    abilityLabel: {
        fontSize: 10,
        fontWeight: '700',
    },
    abilityScore: {
        fontSize: 30
    },
    abilityMod: {
        fontSize: 20,
        fontWeight: '600'
    },
});


// TODO: Change the glow and font color when the ability must be underlined
// TODO: Change the font for the score to "Noto Serif"