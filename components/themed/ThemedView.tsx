import { View, type ViewProps, type ViewStyle } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";

type ThemeColorKey = "primary" | "secondary" | "tertiary" | "neutral";

export interface ThemedViewProps extends ViewProps {
  backgroundColor?: ThemeColorKey;
  borderColor?: ThemeColorKey;
  roundednessMultiplier?: number;
}

export function ThemedView({
  style,
  backgroundColor,
  borderColor,
  roundednessMultiplier,
  ...rest
}: ThemedViewProps) {
  const { theme } = useAppTheme();

  const themedStyle: ViewStyle = {
    ...(backgroundColor ? { backgroundColor: theme.colors[backgroundColor] } : null),
    ...(borderColor ? { borderColor: theme.colors[borderColor] } : null),
    ...(roundednessMultiplier
      ? { borderRadius: theme.shape.roundedness * roundednessMultiplier }
      : null),
  };

  return <View style={[themedStyle, style]} {...rest} />;
}
