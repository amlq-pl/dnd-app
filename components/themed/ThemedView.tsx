import type { ThemeBorderRadiusKey } from "@/constants/themes";
import { useAppTheme } from "@/hooks/useAppTheme";
import { View, type ViewProps, type ViewStyle } from "react-native";

export interface ThemedViewProps extends ViewProps {
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: ThemeBorderRadiusKey;
}

export function ThemedView({
    style,
    backgroundColor,
    borderColor,
    borderRadius,
    ...rest
}: ThemedViewProps) {
    const { theme, color } = useAppTheme();

    const themedStyle: ViewStyle = {
        ...(backgroundColor ? { backgroundColor: color(backgroundColor) } : null),
        ...(borderColor ? { borderColor: color(borderColor) } : null),
        ...(borderRadius != null ? { borderRadius: theme.borderRadius[borderRadius] } : null),
    };

    return <View style={[themedStyle, style]} {...rest} />;
}
