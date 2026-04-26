import { View, type ViewProps, StyleSheet, Pressable, Platform } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";

import {ListEntry} from '@/types/lists'
import COLORS from "@/constants/colors";

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
    const { theme, color } = useAppTheme();

    return (
        <View style={[styles.container, style]} {...rest}>
            {/* Header */}
            {title && (
                <View style={styles.header}>
                    {icon && <Ionicons name={icon as any} size={20} color={color("palette.tertiary")} />}
                    <ThemedText variant="label" style={styles.titleText} color="text.heading">
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
                                    { backgroundColor: item.state === "active" ? "#FDE047" : "#374151" },
                                    item.state === "active" && styles.bulletGlow
                                ]}
                            />
                            <ThemedText variant="body" color="text.heading" style={styles.skillLabel}>
                                {item.label}
                            </ThemedText>
                        </View>
                        <ThemedText variant="label" color="text.lively" style={styles.skillValue}>
                            {item.value}
                        </ThemedText>
                    </View>
                ))}
            </View>

            {/* Footer Action */}
            {footerLabel && (
                <Pressable onPress={onFooterPress} style={styles.footer}>
                    <ThemedText variant="body" color="text.lively" style={styles.footerText}>
                        {footerLabel.toUpperCase()}
                    </ThemedText>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: "100%", marginVertical: 8 },
    header: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 },
    titleText: { fontSize: 24, fontFamily: "serif" },
    listBody: { gap: 20 },
    row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    labelContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
    bullet: { width: 8, height: 8, borderRadius: 4 },
    bulletGlow: {
        shadowColor: "#FDE047",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
    },
    skillLabel: { fontSize: 18, opacity: 0.9 },
    skillValue: { fontSize: 18, fontWeight: "600" },
    footer: { marginTop: 24, alignItems: "center" },
    footerText: { letterSpacing: 1.5, fontWeight: "700", fontSize: 12 },
});