import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
    ThemedGrid,
    ThemedText,
    ThemedView
} from "@/components/themed";
import { BoxWithGlow } from ".././BoxWithGlow";
import { useBiometrics } from "@/hooks/character";
import { useAppTheme } from "@/hooks/useAppTheme";

export const BiometricsGrid = ({ characterId }: { characterId: string }) => {
    const { data: entries, isLoading } = useBiometrics(characterId);
    const {theme, color} = useAppTheme();

    if (isLoading || !entries) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator color={color("palette.primary")} />
            </ThemedView>
        );
    }

    return (
        <ThemedGrid
            data={entries}
            columns={2}
            rowGap={12}
            columnGap={12}
            renderItem={(item) => (
                <BoxWithGlow
                    glow={false}
                >
                    <View style={styles.textContainer}>
                        <ThemedText
                            variant="body"
                            color="card.header"
                            style={styles.label}
                        >
                            {item.label.toUpperCase()}
                        </ThemedText>
                        <ThemedText
                            variant="headline"
                            color="card.label"
                            style={[
                                styles.value,
                                { fontFamily: theme.typography.headlineFont }
                            ]}
                        >
                            {item.value}
                        </ThemedText>
                    </View>

                    {/* The secondary slot (used for Mods in abilities) is kept as a 
                        decorative spacer or could be mapped to an icon for the trait */}
                    <View style={styles.decorationSpacer} />
                </BoxWithGlow>
            )}
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