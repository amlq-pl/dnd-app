import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { ThemeColorKey } from "@/constants/themes";
import { useStyles } from "@/hooks/useStyles";
import { HighlightedView } from "./HighlightedView";

interface BoxWithGlowProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    glow?: boolean;
    backgroundColor?: ThemeColorKey;
    glowColor?: ThemeColorKey;
}

export const BoxWithGlow = ({
    children,
    style,
    glow = true,
    backgroundColor = "card.background",
    glowColor = "card.softGlow",
}: BoxWithGlowProps) => {
    const { styles } = useStyles((t, c) => ({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: t.spacing.md,
            backgroundColor: c(backgroundColor),
            borderRadius: t.borderRadius.md,
            height: 80,
        },
    }));

    return (
        <HighlightedView
            glow={glow}
            glowColor={glowColor}
            style={[styles.container, style]}
        >
            {children}
        </HighlightedView>
    );
};
