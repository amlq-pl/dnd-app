import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";

interface BoxWithGlowProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    glow?: boolean
}

export const BoxWithGlow = ({ children, style, glow = false }: BoxWithGlowProps) => {
    const { theme } = useAppTheme();
    const { colors, spacing, borderRadius } = theme;

    const themedStyles = {
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 80,
            paddingHorizontal: spacing.md,

            backgroundColor: colors.card.background,
            borderRadius: borderRadius.md,

            // Glow styling
            borderLeftWidth: 2,
            borderLeftColor: glow ? colors.card.glow : colors.card.softGlow,

            shadowColor: colors.card.glow,
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