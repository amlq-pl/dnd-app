import { StyleSheet, type ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedTextBox } from "./ThemedTextBox";

type ThemeColorKey = "primary" | "secondary" | "tertiary" | "neutral";

export interface ThemedStatContainerProps {
  label: string;
  value?: string;
  style?: ViewStyle | ViewStyle[];
  size?: "regular" | "compact";
  mode?: "stacked" | "pill";
  backgroundColor?: ThemeColorKey;
  labelColor?: ThemeColorKey;
  valueColor?: ThemeColorKey;
}

export function ThemedStatContainer({
  label,
  value = "",
  style,
  size = "regular",
  mode = "stacked",
  backgroundColor = "neutral",
  labelColor = "tertiary",
  valueColor = "secondary",
}: ThemedStatContainerProps) {
  const isCompact = size === "compact";
  const isPill = mode === "pill";

  return (
    <ThemedTextBox
      style={[styles.container, isPill ? styles.pillContainer : null, style]}
      backgroundColor={backgroundColor}
      roundednessMultiplier={isPill ? 999 : 8}
    >
      <ThemedText
        variant="body"
        color={labelColor}
        style={[
          styles.label,
          isCompact ? styles.labelCompact : null,
          isPill ? styles.pillText : null,
        ]}
      >
        {isPill ? `${label}${value ? `: ${value}` : ""}` : label.toUpperCase()}
      </ThemedText>
      {!isPill ? (
        <ThemedText
          variant="label"
          color={valueColor}
          style={[styles.value, isCompact ? styles.valueCompact : null]}
        >
          {value}
        </ThemedText>
      ) : null}
    </ThemedTextBox>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  pillContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    paddingHorizontal: 22,
    paddingVertical: 8,
  },
  pillText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    opacity: 1,
    textTransform: "none",
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    opacity: 0.85,
  },
  value: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    textAlign: "left",
  },
  labelCompact: {
    fontSize: 8,
    lineHeight: 14,
  },
  valueCompact: {
    marginTop: 3,
    fontSize: 8,
    lineHeight: 14,
  },
});
