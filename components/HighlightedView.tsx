import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import { ThemeColorKey } from "@/constants/themes";
import { useStyles } from "@/hooks/useStyles";

interface HighlightedViewProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    glow?: boolean;
    glowColor?: ThemeColorKey;
    shadowColor?: ThemeColorKey;
}

export const HighlightedView = ({
    children,
    style,
    glow = true,
    glowColor = "card.softGlow",
    shadowColor = glowColor,
}: HighlightedViewProps) => {
    const { styles } = useStyles((_, c) => ({
        base: {
            borderLeftWidth: 3,
            borderLeftColor: glow ? c(glowColor) : "transparent",

            shadowColor: c(shadowColor),
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.1,
            shadowRadius: 15,

            elevation: 4,
        },
    }));

    return <View style={[styles.base, style]}>{children}</View>;
};
