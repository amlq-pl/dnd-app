import { useAppTheme } from "@/hooks/useAppTheme";
import type { ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

export interface HighlightedViewProps {
    children: ReactNode;
    backgroundColor?: string;
    glowColor?: string;
    style?: ViewStyle | (ViewStyle | undefined)[];
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,

        borderLeftWidth: 2,

        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 4,
    },
});

export default function HighlightedView({
    children,
    backgroundColor,
    glowColor,
    style,
}: HighlightedViewProps) {
    const { theme, color } = useAppTheme();

    const resolvedBg = backgroundColor ?? color("surface.surface");
    const resolvedGlow = glowColor ?? color("border.default");

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: resolvedBg,
                    borderLeftColor: resolvedGlow,
                    borderRadius: theme.borderRadius.md,
                    shadowColor: resolvedGlow,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}
