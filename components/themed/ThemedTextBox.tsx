import type { ThemeBorderRadiusKey, ThemeColorKey } from "@/constants/themes";
import { StyleSheet, type ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";

export interface ThemedTextBoxProps extends ViewProps {
    backgroundColor?: ThemeColorKey;
    borderRadius?: ThemeBorderRadiusKey;
}

export function ThemedTextBox({
    style,
    backgroundColor = "palette.primary",
    borderRadius = "sm",
    ...rest
}: ThemedTextBoxProps) {
    return (
        <ThemedView
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
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
