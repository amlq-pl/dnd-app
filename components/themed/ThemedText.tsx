import { Text, type TextProps, type TextStyle } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";

type ThemeColorKey = "primary" | "secondary" | "tertiary" | "neutral";
type TextVariant = "headline" | "body" | "label";

const VARIANT_STYLE: Record<TextVariant, TextStyle> = {
  headline: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "600",
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
};

const VARIANT_FONT_KEY = {
  headline: "headlineFont",
  body: "bodyFont",
  label: "labelFont",
} as const;

export interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  color?: ThemeColorKey;
}

export function ThemedText({
  style,
  variant = "body",
  color,
  ...rest
}: ThemedTextProps) {
  const { theme } = useAppTheme();

  return (
    <Text
      style={[
        VARIANT_STYLE[variant],
        {
          fontFamily: theme.typography[VARIANT_FONT_KEY[variant]],
        },
        color ? { color: theme.colors[color] } : null,
        style,
      ]}
      {...rest}
    />
  );
}
