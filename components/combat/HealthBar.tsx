import { View } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { HighlightedView } from "../HighlightedView";
import { ThemedText } from "../themed";

type Props = {
    currentHp: number;
    maxHp: number;
    tempHp: number;
};

export default function HealthBar({ currentHp, maxHp, tempHp }: Props) {
    const ratio = Math.min(currentHp / maxHp, 1);

    const { styles } = useStyles((t, c) => ({
        container: {
            backgroundColor: c("card.background"),
            borderRadius: t.borderRadius.md,
            padding: t.spacing.lg,
            gap: t.spacing.sm,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        hpRow: {
            flexDirection: "row",
            alignItems: "baseline",
            gap: t.spacing.xs,
        },
        hpValue: {
            fontSize: 48,
            lineHeight: 56,
        },
        hpMax: {
            fontSize: 16,
        },
        tempBadge: {
            backgroundColor: c("surface.surfaceElevated"),
            borderRadius: t.borderRadius.sm,
            paddingHorizontal: t.spacing.sm,
            paddingVertical: t.spacing.xs,
        },
        track: {
            height: 8,
            width: "100%",
            backgroundColor: c("surface.surfaceElevated"),
            borderRadius: t.borderRadius.full,
            overflow: "hidden",
            marginTop: t.spacing.xs,
        },
        fill: {
            height: "100%",
            width: `${ratio * 100}%`,
            backgroundColor: c("palette.primary"),
            borderRadius: t.borderRadius.full,
        },
    }));

    return (
        <HighlightedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText color="text.body" variant="label">
                    Health Points
                </ThemedText>
                <View style={styles.tempBadge}>
                    <ThemedText color="palette.secondary" variant="label">
                        TEMP HP{" "}
                        <ThemedText color="palette.secondary" variant="label">
                            +{tempHp}
                        </ThemedText>
                    </ThemedText>
                </View>
            </View>
            <View style={styles.hpRow}>
                <ThemedText
                    color="text.heading"
                    style={styles.hpValue}
                    variant="headline"
                >
                    {currentHp}
                </ThemedText>
                <ThemedText color="text.muted" style={styles.hpMax}>
                    / {maxHp}
                </ThemedText>
            </View>
            <View style={styles.track}>
                <View style={styles.fill} />
            </View>
        </HighlightedView>
    );
}
