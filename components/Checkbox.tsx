import React from "react";
import { Pressable, View } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "@/components/themed";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemeColorKey } from "@/constants/themes";

interface CheckboxProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    label?: string;
    buttonColor?: ThemeColorKey;
}

export const Checkbox = ({ value, onValueChange, label, buttonColor = "palette.secondary" }: CheckboxProps) => {
    const { color } = useAppTheme();

    const dynamicBoxStyle = {
        borderColor: value ? "transparent" : color(buttonColor),
        backgroundColor: value ? color(buttonColor) : "transparent",
    };

    const { styles } = useStyles((t, c) => ({
        container: {
            flexDirection: "row",
            alignItems: "center",
            gap: t.spacing.sm,
        },
        box: {
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center",
        },
        inner: {
            width: 10,
            height: 10,
            borderRadius: 2,
        },
    }));


    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                onValueChange(!value);
            }}
            hitSlop={8}
        >
            <View style={[styles.box, dynamicBoxStyle]}>
                {value && <View style={styles.inner} />}
            </View>
            {label && <ThemedText style={{ fontSize: 14 }}>{label}</ThemedText>}
        </Pressable>
    );
};