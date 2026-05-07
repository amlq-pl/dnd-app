import { ThemedHeadline, ThemedStatContainer, ThemedText } from "@/components/themed";
import { Image, StyleSheet, View, ActivityIndicator } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";

import { useCharacter } from "@/hooks/character";
import {BookIcon} from '@/components/icons'

export const Header = () => {
    const { theme, color } = useAppTheme();

    return (
        <View style={styles.container}>
            {/* Background Layer: Decorative Icon */}
            <View style={styles.iconBackground}>
                <BookIcon size={160} opacity={0.35} color={"palette.primary"}/>
            </View>

            {/* TODO: consider changing the icon color}

            {/* Foreground Layer: Brand Text */}
            <View style={styles.textContainer}>
                <ThemedHeadline color="text.onPrimary" style={styles.titleLine}>
                    Sheets <ThemedHeadline color="text.lively" style={styles.ampersand}>&</ThemedHeadline>
                </ThemedHeadline>
                <ThemedHeadline color="text.onPrimary" style={styles.titleLine}>
                    Giggles
                </ThemedHeadline>
            </View>

            {/* Tagline */}
            <ThemedText color="text.muted" style={styles.subtext}>
                The high-fidelity digital artifact for your next legendary tabletop campaign. (change this subheader i beg you)
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
        backgroundColor: "transparent",
    },
    iconBackground: {
        position: "absolute",
        top: 10,
        zIndex: -1,
    },
    textContainer: {
        alignItems: "center",
        marginBottom: 16,
        marginTop: 50,
    },
    titleLine: {
        fontSize: 60,
        fontWeight: "800",
        textAlign: "center",
        lineHeight: 64,
        // Implementation of the "Glow" effect
        textShadowColor: "rgba(255, 255, 255, 0.8)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
    },
    ampersand: {
        fontSize: 60,
        fontWeight: "600",
    },
    subtext: {
        fontSize: 16,
        textAlign: "center",
        maxWidth: "80%",
        lineHeight: 22,
        letterSpacing: 0.5,
    },
});