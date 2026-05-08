import { View, type ViewProps, Pressable } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";

import { ListEntry } from "@/types/lists";

export interface ThemedListProps extends ViewProps {
    title?: string;
    icon?: string;
    data: ListEntry[];
    footerLabel?: string;
    onFooterPress?: () => void;
}

export function ThemedList({
    title,
    icon,
    data,
    footerLabel,
    onFooterPress,
    style,
    ...rest
}: ThemedListProps) {
    const { styles, color } = useStyles((_, c) => ({
        container: { width: "100%", marginVertical: 8 },
        header: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 },
        titleText: { fontSize: 24 },
        listBody: { gap: 20 },
        row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
        labelContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
        bullet: { width: 8, height: 8, borderRadius: 4 },
        bulletActive: { backgroundColor: c("semantic.warning") },
        bulletInactive: { backgroundColor: c("border.subtle") },
        bulletGlow: {
            shadowColor: c("semantic.warning"),
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 5,
        },
        skillLabel: { fontSize: 18, opacity: 0.9 },
        skillValue: { fontSize: 18, fontWeight: "600" },
        footer: { marginTop: 24, alignItems: "center" },
        footerText: { letterSpacing: 1.5, fontWeight: "700", fontSize: 12 },
    }));

    return (
        <View style={[styles.container, style]} {...rest}>
            {/* Header */}
            {title && (
                <View style={styles.header}>
                    {icon && (
                        <Ionicons color={color("palette.tertiary")} name={icon as any} size={20} />
                    )}
                    <ThemedText color="text.heading" style={styles.titleText} variant="label">
                        {title}
                    </ThemedText>
                </View>
            )}

            {/* List Content */}
            <View style={styles.listBody}>
                {data.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <View style={styles.labelContainer}>
                            <View
                                style={[
                                    styles.bullet,
                                    item.state === "active"
                                        ? styles.bulletActive
                                        : styles.bulletInactive,
                                    item.state === "active" && styles.bulletGlow,
                                ]}
                            />
                            <ThemedText
                                color="text.heading"
                                style={styles.skillLabel}
                                variant="body"
                            >
                                {item.label}
                            </ThemedText>
                        </View>
                        <ThemedText color="text.lively" style={styles.skillValue} variant="label">
                            {item.value}
                        </ThemedText>
                    </View>
                ))}
            </View>

            {/* Footer Action */}
            {footerLabel && (
                <Pressable style={styles.footer} onPress={onFooterPress}>
                    <ThemedText color="text.lively" style={styles.footerText} variant="body">
                        {footerLabel.toUpperCase()}
                    </ThemedText>
                </Pressable>
            )}
        </View>
    );
}
