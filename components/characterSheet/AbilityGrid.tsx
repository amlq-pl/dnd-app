import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
    ThemedGrid,
    ThemedText,
    ThemedTextBox
} from "@/components/themed";
import { useAbilities } from "@/hooks/character/useAbilities";
import { ABILITY_LABELS } from "@/services/CharacterService";

export const AbilityGrid = ({ characterId }: { characterId: string }) => {
    const { data: scores, loading } = useAbilities(characterId);

    // TODO: consider changing it
    if (loading || !scores) return <ActivityIndicator />;

    return (
        <ThemedGrid
            data={ABILITY_LABELS}
            columns={2}
            rowGap={12}
            columnGap={12}
            renderItem={({ key, label }) => (
                <ThemedTextBox style={styles.abilityCard}>
                    <View>
                        <ThemedText variant="body" color="tertiary" style={styles.abilityLabel}>
                            {label}
                        </ThemedText>
                        <ThemedText variant="headline" style={styles.abilityScore}>
                            {scores[key].score}
                        </ThemedText>
                    </View>
                    <ThemedText variant="headline" color="secondary" style={styles.abilityMod}>
                        {scores[key].mod}
                    </ThemedText>
                </ThemedTextBox>
            )}
        />
    );
};


const styles = StyleSheet.create({
    abilityCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        paddingHorizontal: 12,

        backgroundColor: '#1C1B1B',
        borderRadius: 12,

        borderLeftWidth: 2,
        borderLeftColor: '#D0BCFF',

        shadowColor: '#D0BCFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 15,

        elevation: 4,
    },

    abilityLabel: { fontSize: 10, fontWeight: '700', color: '#958EA0', fontFamily: 'Manrope', },
    abilityScore: { fontSize: 30 },
    abilityMod: { fontSize: 20, fontWeight: '600'},
});

// TODO: extract colors, fonts to a config file

