import { useAppTheme } from "@/hooks/useAppTheme";
import { StyleSheet, View, type ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";

export interface ListItem {
    label: string;
    value: string;
    highlight?: boolean;
}

export interface ThemedTwoColumnListProps extends ViewProps {
    title?: string;
    icon?: React.ElementType;
    data: ListItem[];
}

export function ThemedTwoColumnList({
    title,
    icon: Icon,
    data,
    style,
    ...rest
}: ThemedTwoColumnListProps) {
    const { theme, color } = useAppTheme();

    // Split data into two columns
    const leftColumn = data.filter((_, i) => i % 2 === 0);
    const rightColumn = data.filter((_, i) => i % 2 !== 0);

    const renderItem = (item: ListItem, index: number) => (
        <View key={index} style={styles.itemRow}>
            <ThemedText variant="body" color="palette.primary" style={styles.label}>
                {item.label}
            </ThemedText>
            <ThemedText
                variant="label"
                color={item.highlight ? "palette.secondary" : "palette.tertiary"}
                style={styles.value}
            >
                {item.value}
            </ThemedText>
        </View>
    );

    return (
        <View style={[styles.container, style]} {...rest}>
            {(Icon || title) && (
                <View style={styles.header}>
                    {Icon && <Icon size={22} color={color("palette.primary")} />}

                    {title && (
                        <ThemedText variant="label" style={styles.titleText}>
                            {title}
                        </ThemedText>
                    )}
                </View>
            )}
            <View style={styles.grid}>
                <View style={styles.column}>{leftColumn.map(renderItem)}</View>
                <View style={styles.column}>{rightColumn.map(renderItem)}</View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        width: "100%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 13,
        gap: 8,
    },
    titleText: {
        fontSize: 22,
        fontFamily: "serif",
        lineHeight: 28,
    },
    grid: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 24,
    },
    column: {
        flex: 1,
        gap: 12,
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(255, 255, 255, 0.05)",
        paddingBottom: 4,
    },
    label: {
        fontSize: 16,
        opacity: 0.85,
    },
    value: {
        fontSize: 16,
    },
});
