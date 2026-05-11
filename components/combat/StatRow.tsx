import { View } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "../themed";
import { ACIcon, InitiativeIcon, SpeedIcon } from "../icons";

type Props = {
    armorClass: number;
    initiative: number;
    speed: string;
};

export default function StatRow({ armorClass, initiative, speed }: Props) {
    const { styles } = useStyles((t, c) => ({
        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            gap: t.spacing.md,
        },
        statBox: {
            flex: 1,
            alignItems: "center",
            backgroundColor: c("card.background"),
            borderRadius: t.borderRadius.md,
            paddingVertical: t.spacing.lg,
            gap: t.spacing.xs,
        },
        statBoxHighlighted: {
            backgroundColor: c("surface.surfaceElevated"),
        },
        statValue: {
            fontSize: 24,
            lineHeight: 30,
        },
        statLabel: {
            fontSize: 10,
            letterSpacing: 1,
        },
    }));

    return (
        <View style={styles.row}>
            <View style={styles.statBox}>
                <ACIcon color="palette.tertiary" size={16} />
                <ThemedText
                    color="text.heading"
                    style={styles.statValue}
                    variant="headline"
                >
                    {armorClass}
                </ThemedText>
                <ThemedText color="text.muted" style={styles.statLabel}>
                    ARMOR CLASS
                </ThemedText>
            </View>
            <View style={[styles.statBox, styles.statBoxHighlighted]}>
                <InitiativeIcon />
                <ThemedText
                    color="text.heading"
                    style={styles.statValue}
                    variant="headline"
                >
                    {initiative >= 0 ? `+${initiative}` : initiative}
                </ThemedText>
                <ThemedText color="text.muted" style={styles.statLabel}>
                    INITIATIVE
                </ThemedText>
            </View>
            <View style={styles.statBox}>
                <SpeedIcon />
                <ThemedText
                    color="text.heading"
                    style={styles.statValue}
                    variant="headline"
                >
                    {speed}
                </ThemedText>
                <ThemedText color="text.muted" style={styles.statLabel}>
                    SPEED
                </ThemedText>
            </View>
        </View>
    );
}
