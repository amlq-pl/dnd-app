import { StyleSheet, type ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";

type ThemeColorKey = "primary" | "secondary" | "tertiary" | "neutral";

export interface ThemedTextBoxProps extends ViewProps {
  backgroundColor?: ThemeColorKey;
  roundednessMultiplier?: number;
}

export function ThemedTextBox({
  style,
  backgroundColor = "primary",
  roundednessMultiplier = 8,
  ...rest
}: ThemedTextBoxProps) {
  return (
    <ThemedView
      backgroundColor={backgroundColor}
      roundednessMultiplier={roundednessMultiplier}
      style={[styles.base, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
});
