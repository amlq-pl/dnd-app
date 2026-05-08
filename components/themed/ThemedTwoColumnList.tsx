import { useStyles } from "@/hooks/useStyles";
import { View, type ViewProps } from "react-native";
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
    const { styles, color } = useStyles((_, c) => ({
        container: { paddingVertical: 8, width: "100%" },
        header: { flexDirection: "row", alignItems: "center", marginBottom: 13, gap: 8 },
        titleText: { fontSize: 22, lineHeight: 28 },
        grid: { flexDirection: "row", justifyContent: "space-between", gap: 24 },
        column: { flex: 1, gap: 12 },
        itemRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderBottomColor: c("border.subtle"),
            paddingBottom: 4,
        },
        label: { fontSize: 16, opacity: 0.85 },
        value: { fontSize: 16 },
    }));

    // Split data into two columns
    const leftColumn = data.filter((_, i) => i % 2 === 0);
    const rightColumn = data.filter((_, i) => i % 2 !== 0);

    const renderItem = (item: ListItem, index: number) => (
        <View key={index} style={styles.itemRow}>
            <ThemedText color="text.heading" style={styles.label} variant="body">
                {item.label}
            </ThemedText>
            <ThemedText
                color={item.highlight ? "palette.secondary" : "text.lively"}
                style={styles.value}
                variant="label"
            >
                {item.value}
            </ThemedText>
        </View>
    );

    return (
        <View style={[styles.container, style]} {...rest}>
            {(Icon || title) && (
                <View style={styles.header}>
                    {Icon && <Icon color={color("palette.tertiary")} size={22} />}

                    {title && (
                        <ThemedText color="text.heading" style={styles.titleText} variant="label">
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
