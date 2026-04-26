import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { ThemedGrid, ThemedText } from "@/components/themed";
import HighlightedView from "@/components/HighlightedView";
import { useAbilities } from "@/hooks/character/useAbilities";
import { ABILITY_LABELS } from "@/services/CharacterService";

export const AbilityGrid = ({ characterId }: { characterId: string }) => {
    const { data: scores, loading } = useAbilities(characterId);

    // TODO: consider changing it
    if (loading || !scores) return <ActivityIndicator />;

    return (
        <ThemedGrid
            columnGap={12}
            columns={2}
            data={ABILITY_LABELS}
            renderItem={({ key, label }) => (
                <HighlightedView backgroundGlow style={styles.abilityCard}>
                    <View>
                        <ThemedText color="text.muted" style={styles.abilityLabel} variant="body">
                            {label}
                        </ThemedText>
                        <ThemedText style={styles.abilityScore} variant="headline">
                            {scores[key].score}
                        </ThemedText>
                    </View>
                    <ThemedText
                        color="palette.secondary"
                        style={styles.abilityMod}
                        variant="headline"
                    >
                        {scores[key].mod}
                    </ThemedText>
                </HighlightedView>
            )}
            rowGap={12}
        />
    );
};

const styles = StyleSheet.create({
    abilityCard: {
        height: 80,
    },
    abilityLabel: {
        fontSize: 10,
        fontWeight: "700",
    },
    abilityScore: { fontSize: 30 },
    abilityMod: { fontSize: 20, fontWeight: "600" },
});
