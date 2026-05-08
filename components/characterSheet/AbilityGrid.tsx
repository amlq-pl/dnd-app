import React from "react";
import { View, ActivityIndicator } from "react-native";
import { ThemedGrid, ThemedText } from "@/components/themed";
import { BoxWithGlow } from ".././BoxWithGlow";
import { useAbilities } from "@/hooks/character/useAbilities";
import { ABILITY_LABELS } from "@/services/CharacterService";
import { useStyles } from "@/hooks/useStyles";

export const AbilityGrid = ({ characterId }: { characterId: string }) => {
    const { styles } = useStyles((theme) => ({
        abilityLabel: { fontSize: 10, fontWeight: "700" },
        abilityScore: { fontSize: 30, fontFamily: theme.typography.headlineFont },
        abilityMod: { fontSize: 20, fontWeight: "600", fontFamily: theme.typography.headlineFont },
    }));

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

// TODO: Change the glow and font color when the ability must be underlined
// TODO: Change the font for the score to "Noto Serif"
