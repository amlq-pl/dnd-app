import { View } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "../themed";
import { ACIcon } from "../icons/ACIcon";
import type { ThemeColorKey } from "@/constants/themes";
import Svg, { Path } from "react-native-svg";
import { useAppTheme } from "@/hooks/useAppTheme";

type StatItem = {
    label: string;
    value: string;
    icon: "shield" | "lightning" | "speed";
    highlighted?: boolean;
};

type Props = {
    armorClass: number;
    initiative: number;
    speed: string;
};

function InitiativeIcon({
    size = 16,
    colorKey = "palette.secondary" as ThemeColorKey,
}) {
    const { color } = useAppTheme();
    return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
            <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={color(colorKey)} />
        </Svg>
    );
}

function SpeedIcon({ size = 16, colorKey = "text.body" as ThemeColorKey }) {
    const { color } = useAppTheme();
    return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
            <Path
                d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"
                fill={color(colorKey)}
            />
        </Svg>
    );
}

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
