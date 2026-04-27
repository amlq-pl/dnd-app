import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemeColorKey } from "@/constants/themes";

interface BoxWithGlowProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    glow?: boolean
    backgroundColor?: ThemeColorKey
    glowColor?: ThemeColorKey

}

export const BoxWithGlow = ({
    children,
    style,
    glow = true,
    backgroundColor = "card.background",
    glowColor = "card.softGlow"
}: BoxWithGlowProps) => {
    const { theme, color } = useAppTheme();
    const { spacing, borderRadius } = theme;

    const themedStyles = {
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 80,
            paddingHorizontal: spacing.md,

            backgroundColor: color(backgroundColor),
            borderRadius: borderRadius.md,

            // Glow styling
            borderLeftWidth: 2,
            borderLeftColor: glow ? color(glowColor) : "transparent",

            shadowColor: color(glowColor),
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 15,

            elevation: 4,
        } as ViewStyle,
    };

    return (
        <View style={[themedStyles.container, style]}>
            {children}
        </View>
    );
};