import { ScrollView, View } from "react-native";
import { ThemedView, ThemedText } from "@/components/themed";
import { useStyles } from "@/hooks/useStyles";
import HealthBar from "@/components/combat/HealthBar";
import StatRow from "@/components/combat/StatRow";
import DeathSaves from "@/components/combat/DeathSaves";
import CombatActionCard, {
    CombatAction,
} from "@/components/combat/CombatActionCard";

const MOCK_ACTIONS: CombatAction[] = [
    {
        id: "1",
        name: "Divine Smite",
        type: "Action",
        range: "5ft",
        effect: "2d8 Radiant",
    },
    {
        id: "2",
        name: "Lay on Hands",
        type: "Action",
        range: "Touch",
        effect: "Heal up to 60",
    },
    {
        id: "3",
        name: "Shield of Faith",
        type: "Bonus Action",
        range: "V, S, M",
        effect: "+2 AC",
    },
];

export default function CombatScreen() {
    const { styles } = useStyles((t) => ({
        screen: {
            flex: 1,
        },
        scroll: {
            padding: t.spacing.lg,
            gap: t.spacing.xl,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
        },
        headerLeft: {
            gap: t.spacing.xxs,
        },
        headerRight: {
            alignItems: "flex-end",
        },
        encounterLabel: {
            fontSize: 11,
            letterSpacing: 2,
        },
        characterName: {
            fontSize: 32,
            lineHeight: 38,
        },
        levelText: {
            fontSize: 12,
        },
        classText: {
            fontSize: 16,
        },
        sectionHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        slotsBadge: {
            borderWidth: 1,
            borderRadius: t.borderRadius.sm,
            paddingHorizontal: t.spacing.sm,
            paddingVertical: t.spacing.xxs,
        },
        slotsText: {
            fontSize: 12,
        },
        actionsGroup: {
            gap: t.spacing.md,
        },
    }));

    return (
        <ThemedView backgroundColor="surface.background" style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <ThemedText
                            color="palette.secondary"
                            style={styles.encounterLabel}
                        >
                            CURRENT ENCOUNTER
                        </ThemedText>
                        <ThemedText
                            color="text.heading"
                            style={styles.characterName}
                            variant="headline"
                        >
                            Valerius
                        </ThemedText>
                    </View>
                    <View style={styles.headerRight}>
                        <ThemedText color="text.muted" style={styles.levelText}>
                            LEVEL 12
                        </ThemedText>
                        <ThemedText
                            color="text.heading"
                            style={styles.classText}
                            variant="label"
                        >
                            Paladin
                        </ThemedText>
                    </View>
                </View>

                {/* Health */}
                <HealthBar currentHp={84} maxHp={112} tempHp={15} />

                {/* Stats */}
                <StatRow armorClass={20} initiative={2} speed="30ft" />

                {/* Death Saves */}
                <DeathSaves />

                {/* Combat Actions */}
                <View style={styles.actionsGroup}>
                    <View style={styles.sectionHeader}>
                        <ThemedText color="text.heading" variant="headline">
                            Combat Actions
                        </ThemedText>
                        <View style={styles.slotsBadge}>
                            <ThemedText
                                color="semantic.success"
                                style={styles.slotsText}
                            >
                                2 Slots Left
                            </ThemedText>
                        </View>
                    </View>
                    {MOCK_ACTIONS.map((action) => (
                        <CombatActionCard key={action.id} action={action} />
                    ))}
                </View>
            </ScrollView>
        </ThemedView>
    );
}
