import React from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import { ThemedText } from "./themed";
import { useStyles } from "@/hooks/useStyles";
import { ThemeColorKey } from "@/constants/themes";

interface NoteProps {
    title?: string;
    titleColor?: ThemeColorKey;
    children: React.ReactNode;
    // Theme keys instead of hex strings
    accentColor?: ThemeColorKey;
    accent?: boolean;
    backgroundColor?: ThemeColorKey;
    textColor?: ThemeColorKey;
    headerVariant?: "headline" | "body" | "label";
    blurIntensity?: number;
    containerStyle?: ViewStyle;
    contentStyle?: TextStyle;
}

export const Note: React.FC<NoteProps> = ({
    title,
    titleColor = "palette.primary",
    children,
    accentColor = "palette.primary",
    accent = false,
    backgroundColor = "card.background", // This key handles the 0.60 opacity in your theme config
    textColor = "text.muted",
    headerVariant = "headline",
    containerStyle,
    contentStyle,
}) => {
    const { styles, color } = useStyles((_, c) => ({
        container: {
            padding: 32,
            borderRadius: 24,
            overflow: "hidden",
            alignSelf: "stretch",
            flexDirection: "row",
        },
        accentBar: {
            width: 4,
            height: 24,
            borderRadius: 2,
            position: "absolute",
            left: 12,
            top: 36,
        },
        innerWrapper: { flex: 1, gap: 16 },
        header: { textTransform: "none", fontWeight: "400" },
        contentContainer: { alignSelf: "stretch" },
        defaultText: { fontFamily: "Manrope", fontSize: 16, fontWeight: "300", lineHeight: 26 },
    }));

    return (
        <View
            style={[styles.container, { backgroundColor: color(backgroundColor) }, containerStyle]}
        >
            {/* The Accent Bar - using resolved theme color */}
            <View style={accent && [styles.accentBar, { backgroundColor: color(accentColor) }]} />

            <View style={styles.innerWrapper}>
                {title && (
                    <ThemedText color={titleColor} style={styles.header} variant={headerVariant}>
                        {title}
                    </ThemedText>
                )}

                <View style={styles.contentContainer}>
                    {typeof children === "string" ? (
                        <ThemedText
                            color={textColor}
                            style={[styles.defaultText, contentStyle]}
                            variant="body"
                        >
                            {children}
                        </ThemedText>
                    ) : (
                        children
                    )}
                </View>
            </View>
        </View>
    );
};
