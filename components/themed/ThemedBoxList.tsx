import React from "react";
import { View, StyleSheet, type ViewProps, type ViewStyle } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemedText } from "./ThemedText";
import { BoxWithGlow } from "../BoxWithGlow";
import { ThemeColorKey } from "@/constants/themes";

export interface BoxListItem {
    title: string;
    description: string;
    accentColor?: boolean; // Maps to the 'glow' prop of BoxWithGlow
    style?: ViewStyle;
}

export interface ThemedBoxListProps extends ViewProps {
    title: string;
    data: BoxListItem[];
    itemStyle?: ViewStyle;
    glowColor?: ThemeColorKey
}

export function ThemedBoxList({ title, data, style, itemStyle, glowColor = "card.glow", ...rest }: ThemedBoxListProps) {
    const { theme } = useAppTheme();

    return (
        <View style={[styles.container, style]} {...rest}>
            <ThemedText
            variant="label"
            style={styles.listTitle}
            color="text.heading"
        >
            {title}
        </ThemedText>

            <View style={styles.stack}>
                {data.map((item, index) => (
                    <BoxWithGlow
                        key={`${item.title}-${index}`}
                        glow={glowColor ? true : false}
                        style={[styles.itemBox, itemStyle, item.style]}
                        glowColor={glowColor}
                    >
                        <View style={styles.textContainer}>
                            {item.title.trim().length > 0 && (<ThemedText
                                variant="label"
                                color="text.heading"
                                style={styles.itemTitle}
                            >
                                {item.title}
                            </ThemedText>)}

                            <ThemedText
                                variant="body"
                                color="text.heading"
                                style={styles.itemDescription}
                            >
                                {item.description}
                            </ThemedText>
                        </View>
                    </BoxWithGlow>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 12,
    },
    listTitle: {
        fontSize: 26,
        marginBottom: 16,
    },
    stack: {
        gap: 12,
    },
    itemBox: {
        width: "100%",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    itemTitle: {
        fontSize: 18,
        marginBottom: 4,
    },
    itemDescription: {
        lineHeight: 20,
    },
});