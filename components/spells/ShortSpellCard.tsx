import { Spell } from "@/types/spells";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";

export interface ShortSpellCardProps {
    spell: Spell;
}

export function ShortSpellCard({ spell }: ShortSpellCardProps) {
    const { styles } = useStyles((t, c) => ({
        container: {
            marginBottom: t.spacing.sm,
        },
        magicSchool: {
            fontSize: 12,
            marginBottom: t.spacing.sm,
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
        chipText: {
            fontSize: 12,
        },
    }));

    return (
        <ThemedView style={styles.container}>
            <ThemedText color="text.muted" style={styles.magicSchool} variant="body">
                {spell.school_of_magic.toUpperCase()}
            </ThemedText>
            <ThemedView style={styles.chipsRow}>
                {spell.tags.map((tag) => (
                    <ThemedView key={tag} style={styles.chip}>
                        <ThemedText color="text.muted" style={styles.chipText} variant="body">
                            {tag.toUpperCase()}
                        </ThemedText>
                    </ThemedView>
                ))}
            </ThemedView>
        </ThemedView>
    );
}
