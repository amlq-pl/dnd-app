import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { ThemedGrid, ThemedText } from "@/components/themed";
import { BoxWithGlow } from ".././BoxWithGlow";
import { useAbilities } from "@/hooks/character/useAbilities";
import { ABILITY_LABELS } from "@/services/CharacterService";

export const AbilityGrid = ({ characterId }: { characterId: string }) => {
    const { data: scores, loading } = useAbilities(characterId);

    if (loading || !scores) return <ActivityIndicator />;

    return (
        <ThemedGrid
            columnGap={12}
            columns={2}
            data={ABILITY_LABELS}
            renderItem={({ key, label }) => (
                <BoxWithGlow glow={true} glowColor="card.glow">
                    <View>
                        <ThemedText color="card.header" style={styles.abilityLabel} variant="body">
                            {label.toUpperCase()}
                        </ThemedText>
                        <ThemedText
                            color="card.label"
                            style={styles.abilityScore}
                            variant="headline"
                        >
                            {scores[key].score}
                        </ThemedText>
                    </View>
                    <ThemedText color="card.note" style={styles.abilityMod} variant="headline">
                        {scores[key].mod}
                    </ThemedText>
                </BoxWithGlow>
            )}
            rowGap={12}
        />
    );
};

const styles = StyleSheet.create({
    abilityLabel: {
        fontSize: 10,
        fontWeight: "700",
    },
    abilityScore: {
        fontSize: 30,
    },
    abilityMod: {
        fontSize: 20,
        fontWeight: "600",
    },
});

// TODO: Change the glow and font color when the ability must be underlined
// TODO: Change the font for the score to "Noto Serif"
