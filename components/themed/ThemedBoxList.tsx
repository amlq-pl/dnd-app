import { View, StyleSheet, type ViewProps, type ViewStyle } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemedText } from "./ThemedText";
import HighlightedView from "@/components/HighlightedView";

export interface BoxListItem {
    title: string;
    description: string;
    style?: ViewStyle;
}

export interface ThemedBoxListProps extends ViewProps {
    title: string;
    data: BoxListItem[];
    itemStyle?: ViewStyle;
    glowColor?: string;
}

export function ThemedBoxList({
    title,
    data,
    style,
    itemStyle,
    glowColor,
    ...rest
}: ThemedBoxListProps) {
    const { color } = useAppTheme();

    return (
        <View style={[styles.container, style]} {...rest}>
            <ThemedText style={styles.listTitle} variant="label">
                {title}
            </ThemedText>

            <View style={styles.stack}>
                {data.map((item, index) => (
                    <HighlightedView
                        key={index}
                        backgroundColor={color("surface.surface")}
                        glowColor={glowColor ?? color("palette.tertiary")}
                        style={[styles.itemBox, itemStyle, item.style]}
                    >
                        <View style={styles.textContainer}>
                            <ThemedText
                                color="palette.secondary"
                                style={styles.itemTitle}
                                variant="label"
                            >
                                {item.title}
                            </ThemedText>
                            <ThemedText
                                color="palette.tertiary"
                                style={styles.itemDescription}
                                variant="body"
                            >
                                {item.description}
                            </ThemedText>
                        </View>
                    </HighlightedView>
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
        fontFamily: "serif",
        marginBottom: 16,
    },
    stack: {
        gap: 12,
    },
    itemBox: {
        minHeight: 90,
        overflow: "hidden",
    },
    textContainer: {
        flex: 1,
        padding: 16,
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
