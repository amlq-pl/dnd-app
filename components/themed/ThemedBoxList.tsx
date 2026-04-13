import { View, StyleSheet, type ViewProps, ViewStyle } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemedText } from "./ThemedText";
import { ThemedTextBox } from "@/components/themed"; // Reusing your existing box component

export interface BoxListItem {
    title: string;
    description: string;
    accentColor?: boolean; // Toggle for that purple side-accent
    style?: ViewStyle
}

export interface ThemedBoxListProps extends ViewProps {
    title: string;
    data: BoxListItem[];
    itemStyle?: ViewStyle;
}

export function ThemedBoxList({ title, data, style, itemStyle, ...rest }: ThemedBoxListProps) {
    const { theme } = useAppTheme();

    return (
        <View style={[styles.container, style]} {...rest}>
            {/* Formal Header */}
            <ThemedText variant="label" style={styles.listTitle}>
                {title}
            </ThemedText>

            <View style={styles.stack}>
                {data.map((item, index) => (
                    <ThemedTextBox key={index} style={[styles.itemBox, itemStyle, item.style]}>
                        {/* Optional Accent Line (as seen in the image) */}
                        {item.accentColor && (
                            <View style={[styles.accentLine, { backgroundColor: "palette.primary" }]} />
                        )}

                        <View style={styles.textContainer}>
                            <ThemedText variant="label" color="palette.secondary" style={styles.itemTitle}>
                                {item.title}
                            </ThemedText>
                            <ThemedText variant="body" color="palette.tertiary" style={styles.itemDescription}>
                                {item.description}
                            </ThemedText>
                        </View>
                    </ThemedTextBox>
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
        gap: 12, // Vertical spacing between text boxes
    },
    itemBox: {
        flexDirection: "row",
        padding: 0, // Let the content container handle padding for alignment
        overflow: "hidden",
        minHeight: 90,
    },
    accentLine: {
        width: 4,
        height: "100%",
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