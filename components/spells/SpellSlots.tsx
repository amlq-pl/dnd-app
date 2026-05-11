import { useState } from "react";
import { Pressable } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { SpellSlotButton } from "./SpellSlotButton";
import { ThemedHeadline } from "../themed";

interface SpellSlotState {
    [level: number]: number; // level -> current used count
}

const SPELL_SLOT_MAXIMUMS: Record<number, number> = {
    1: 4,
    2: 3,
    3: 3,
    4: 3,
    5: 1,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
};

export function SpellSlots() {
    const [usedSlots, setUsedSlots] = useState<SpellSlotState>(() => {
        // Initialize all slots as available (0 used)
        const initial: SpellSlotState = {};
        for (let i = 1; i <= 9; i++) {
            initial[i] = 0;
        }
        return initial;
    });

    const { styles } = useStyles((t, c) => ({
        container: {
            marginBottom: t.spacing.lg,
            padding: t.spacing.md,
            backgroundColor: c("surface.surfaceElevated"),
            borderRadius: t.borderRadius.lg,
            width: "95%",
            alignSelf: "center",
        },
        header: {
            alignItems: "center",
            marginBottom: t.spacing.md,
            marginTop: t.spacing.md,
        },
        resetContainer: {
            alignItems: "flex-end",
            marginBottom: t.spacing.xs,
        },
        resetButton: {
            paddingHorizontal: t.spacing.sm,
            paddingVertical: t.spacing.xs,
            backgroundColor: c("surface.surfaceElevated"),
            borderRadius: t.borderRadius.sm,
        },
        resetButtonText: {
            fontSize: 12,
        },
        slotsWrapper: {
            alignItems: "center",
        },
        levelRow: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: t.spacing.md,
            gap: t.spacing.sm,
        },
        levelLabel: {
            fontSize: 13,
            fontWeight: "500",
            minWidth: 50,
        },
        slotsContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: t.spacing.sm,
            flex: 1,
        },
    }));

    const handleToggleSlot = (level: number) => {
        setUsedSlots((prev) => {
            const current = prev[level] || 0;
            const max = SPELL_SLOT_MAXIMUMS[level] || 0;
            const next = current < max ? current + 1 : current;
            return { ...prev, [level]: next };
        });
    };

    const handleResetAll = () => {
        setUsedSlots({
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
        });
    };

    return (
        <>
        <ThemedView style={styles.header}>
            <ThemedHeadline color="text.heading">
                Spell Slots
            </ThemedHeadline>
        </ThemedView>
            
        <ThemedView style={styles.container}>
            <ThemedView style={styles.slotsWrapper}>
                {Array.from({ length: 9 }, (_, i) => i + 1).map((level) => {
                    const max = SPELL_SLOT_MAXIMUMS[level];

                    // Skip levels with max 0
                    if (max === 0) {
                        return null;
                    }

                    const used = usedSlots[level] || 0;

                    return (
                        <ThemedView key={level} style={styles.levelRow}>
                            <ThemedText color="text.muted" style={styles.levelLabel} variant="body">
                                Level {level}:
                            </ThemedText>
                            <ThemedView style={styles.slotsContainer}>
                                {Array.from({ length: max }, (_, i) => {
                                    const isUsed = i < used;
                                    return (
                                        <SpellSlotButton
                                            key={i}
                                            isUsed={isUsed}
                                            onPress={() => handleToggleSlot(level)}
                                        />
                                    );
                                })}
                            </ThemedView>
                        </ThemedView>
                    );
                })}
            </ThemedView>
        </ThemedView>
        <ThemedView style={styles.resetContainer}>
                <Pressable style={styles.resetButton} onPress={handleResetAll}>
                    <ThemedText color="text.muted" style={styles.resetButtonText} variant="body">
                        Reset All
                    </ThemedText>
                </Pressable>
        </ThemedView>
        </>
    );
}
