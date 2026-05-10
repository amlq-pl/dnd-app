import { View } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "../themed";
import { RightArrowIcon } from "../icons/RightArrowIcon";
import Svg, { Path } from "react-native-svg";
import { useAppTheme } from "@/hooks/useAppTheme";

export type CombatAction = {
    id: string;
    name: string;
    type: string;
    range: string;
    effect: string;
    iconColor?: string;
};

type Props = {
    action: CombatAction;
};

function ActionIcon({ color: fillColor }: { color: string }) {
    return (
        <Svg fill="none" height={32} viewBox="0 0 24 24" width={32}>
            <Path
                d="M14.5 2.5c0 1.5-1.5 3-3 3s-3-1.5-3-3M5 8l2-2.5h10l2 2.5M7 8l-2 6h2l1 8h8l1-8h2l-2-6"
                stroke={fillColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </Svg>
    );
}

export default function CombatActionCard({ action }: Props) {
    const { color } = useAppTheme();

    const { styles } = useStyles((t, c) => ({
        card: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: c("card.background"),
            borderRadius: t.borderRadius.md,
            padding: t.spacing.lg,
            gap: t.spacing.md,
        },
        iconContainer: {
            width: 40,
            height: 40,
            borderRadius: t.borderRadius.sm,
            backgroundColor: c("surface.surfaceElevated"),
            alignItems: "center",
            justifyContent: "center",
        },
        content: {
            flex: 1,
            gap: t.spacing.xxs,
        },
        arrow: {
            opacity: 0.5,
        },
    }));

    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <ActionIcon
                    color={action.iconColor || color("palette.primary")}
                />
            </View>
            <View style={styles.content}>
                <ThemedText color="text.heading" variant="label">
                    {action.name}
                </ThemedText>
                <ThemedText color="text.muted" variant="body">
                    {action.type} • {action.range} • {action.effect}
                </ThemedText>
            </View>
            <View style={styles.arrow}>
                <RightArrowIcon color="text.muted" size={16} />
            </View>
        </View>
    );
}
