import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { ThemedGrid, ThemedText, ThemedView } from "@/components/themed";
import { BoxWithGlow } from ".././BoxWithGlow";
import { useBiometrics } from "@/hooks/character";
import { useAppTheme } from "@/hooks/useAppTheme";

export const BiometricsGrid = ({ characterId }: { characterId: string }) => {
    const { data: entries, isLoading } = useBiometrics(characterId);
    const { theme, color } = useAppTheme();

    if (isLoading || !entries) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator color={color("palette.primary")} />
            </ThemedView>
        );
    }

    return (
        <ThemedGrid
            columnGap={12}
            columns={2}
            data={entries}
            renderItem={(item) => (
                <BoxWithGlow glow={false}>
                    <View style={styles.textContainer}>
                        <ThemedText color="card.header" style={styles.label} variant="body">
                            {item.label.toUpperCase()}
                        </ThemedText>
                        <ThemedText
                            color="card.label"
                            style={[styles.value, { fontFamily: theme.typography.headlineFont }]}
                            variant="headline"
                        >
                            {item.value}
                        </ThemedText>
                    </View>

                    {/* The secondary slot (used for Mods in abilities) is kept as a 
                        decorative spacer or could be mapped to an icon for the trait */}
                    <View style={styles.decorationSpacer} />
                </BoxWithGlow>
            )}
            rowGap={12}
        />
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        height: 120,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    label: {
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    value: {
        fontSize: 18, // Reduced from 30 to accommodate string length
        lineHeight: 24,
    },
    decorationSpacer: {
        width: 10, // Maintains the horizontal rhythm of the BoxWithGlow layout
    },
});
