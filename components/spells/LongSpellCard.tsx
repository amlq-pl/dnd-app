import { Spell } from "@/types/spells";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";
import { ThemedGrid } from "../themed/ThemedGrid";

export interface LongSpellCardProps {
    spell: Spell;
}

export function LongSpellCard({ spell }: LongSpellCardProps) {
    const { styles, theme } = useStyles((t, c) => ({
        section: {
            marginBottom: t.spacing.sm,
            paddingTop: t.spacing.sm,
            borderTopWidth: 1,
            borderTopColor: c("border.subtle"),
        },
        sectionTitle: {
            marginBottom: 4,
            fontSize: 14,
        },
        description: {
            marginBottom: t.spacing.sm,
            lineHeight: 20,
        },
        statItem: {
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "flex-start",
        },
        statLabel: {
            fontSize: 12,
            marginRight: t.spacing.xs,
            flexShrink: 0,
        },
        statValue: {
            fontSize: 12,
            flex: 1,
            minWidth: 0,
        },
        chipsRow: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: t.spacing.xs,
        },
        chip: {
            paddingHorizontal: t.spacing.sm,
            paddingVertical: t.spacing.xs,
            borderRadius: t.borderRadius.xs,
            backgroundColor: c("surface.surfaceElevated"),
        },
    }));

    const componentLabel = spell.components.join(", ");
    const materialLabel = spell.material ? `${spell.material.description}${spell.material.consumed ? " (consumed)" : ""}` : undefined;

    const stats = [
        { label: "Casting time", value: spell.casting_time },
        { label: "Range", value: spell.range },
        { label: "Duration", value: spell.duration },
        { label: "Rolls", value: spell.rolls },
        spell.saving_throw ? { label: "Saving throw", value: spell.saving_throw } : null,
        spell.damage_type ? { label: "Damage type", value: spell.damage_type } : null,
        { label: "Components", value: componentLabel },
        materialLabel ? { label: "Material", value: materialLabel } : null,
    ].filter(Boolean) as Array<{ label: string; value: string }>;

    return (
        <>
            <ThemedView style={styles.section}>
                <ThemedText color="text.body" style={styles.description} variant="body">
                    {spell.description}
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedGrid
                    columns={1}
                    rowGap={theme.spacing.xs}
                    columnGap={theme.spacing.xxs}
                    data={stats}
                    renderItem={(item) => (
                        <ThemedView style={styles.statItem}>
                            <ThemedText color="text.muted" style={styles.statLabel} variant="body">
                                {item.label}:
                            </ThemedText>
                            <ThemedText color="text.body" style={styles.statValue} variant="body">
                                {item.value}
                            </ThemedText>
                        </ThemedView>
                    )}
                />
            </ThemedView>

            {spell.tags.length ? (
                <ThemedView style={styles.section}>
                    <ThemedView style={styles.chipsRow}>
                        {spell.tags.map((tag) => (
                            <ThemedView key={tag} style={styles.chip}>
                                <ThemedText color="text.muted" variant="body">
                                    {tag.toUpperCase()}
                                </ThemedText>
                            </ThemedView>
                        ))}
                    </ThemedView>
                </ThemedView>
            ) : null}
        </>
    );
}
