import { View, Pressable } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { HighlightedView } from "../HighlightedView";
import { ThemedText } from "../themed";
import Svg, { Circle, Path } from "react-native-svg";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useState } from "react";

function CheckCircle({
    filled,
    success,
}: {
    filled: boolean;
    success: boolean;
}) {
    const { color } = useAppTheme();
    const size = 20;

    if (!filled) {
        return (
            <Svg fill="none" height={size} viewBox="0 0 20 20" width={size}>
                <Circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke={color("text.muted")}
                    strokeWidth="1.5"
                />
            </Svg>
        );
    }

    const fillColor = success
        ? color("semantic.success")
        : color("semantic.error");

    return (
        <Svg fill="none" height={size} viewBox="0 0 20 20" width={size}>
            <Circle cx="10" cy="10" fill={fillColor} r="10" />
            {success ? (
                <Path
                    d="M6 10l3 3 5-5"
                    stroke="white"
                    strokeLinecap="round"
                    strokeWidth="2"
                />
            ) : (
                <Path
                    d="M7 7l6 6M13 7l-6 6"
                    stroke="white"
                    strokeLinecap="round"
                    strokeWidth="2"
                />
            )}
        </Svg>
    );
}

export default function DeathSaves() {
    const [successes, setSuccesses] = useState(0);
    const [failures, setFailures] = useState(0);

    const toggleSuccess = (index: number) => {
        setSuccesses(index < successes ? index : index + 1);
    };

    const toggleFailure = (index: number) => {
        setFailures(index < failures ? index : index + 1);
    };

    const { styles } = useStyles((t, c) => ({
        container: {
            backgroundColor: c("card.background"),
            borderRadius: t.borderRadius.md,
            padding: t.spacing.lg,
            gap: t.spacing.md,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        columns: {
            flexDirection: "row",
            gap: t.spacing.xxl,
        },
        column: {
            gap: t.spacing.xs,
        },
        circles: {
            flexDirection: "row",
            gap: t.spacing.xs,
        },
        label: {
            fontSize: 10,
            letterSpacing: 1,
        },
    }));

    return (
        <HighlightedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText color="text.heading" variant="label">
                    Death Saves
                </ThemedText>
            </View>
            <View style={styles.columns}>
                <View style={styles.column}>
                    <ThemedText color="text.muted" style={styles.label}>
                        SUCCESSES
                    </ThemedText>
                    <View style={styles.circles}>
                        {[0, 1, 2].map((i) => (
                            <Pressable key={i} onPress={() => toggleSuccess(i)}>
                                <CheckCircle success filled={i < successes} />
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View style={styles.column}>
                    <ThemedText color="text.muted" style={styles.label}>
                        FAILURES
                    </ThemedText>
                    <View style={styles.circles}>
                        {[0, 1, 2].map((i) => (
                            <Pressable key={i} onPress={() => toggleFailure(i)}>
                                <CheckCircle
                                    filled={i < failures}
                                    success={false}
                                />
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </HighlightedView>
    );
}
