import { Spell } from "@/types/spells";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { ShortSpellCard } from "./ShortSpellCard";
import { LongSpellCard } from "./LongSpellCard";

export interface SpellCardProps {
    spell: Spell;
}

export function SpellCard({ spell }: SpellCardProps) {
    const { styles } = useStyles((t) => ({
        card: {
            marginBottom: t.spacing.xs,
            width: "95%",
            alignSelf: "center",
        },
        titleRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: t.spacing.sm,
            marginBottom: t.spacing.sm,
        },
        title: {
            flex: 1,
            fontSize: 18,
        },
        level: {
            fontSize: 12,
        },
    }));

    const header = (
        <ThemedView style={styles.titleRow}>
            <ThemedText color="text.heading" style={styles.title} variant="label">
                {spell.name}
            </ThemedText>
            <ThemedText color="text.muted" style={styles.level} variant="body">
                Level {spell.level}
            </ThemedText>
        </ThemedView>
    );

    return (
        <CollapsibleCard
            header={header}
            shortContent={<ShortSpellCard spell={spell} />}
            fullContent={<LongSpellCard spell={spell} />}
            style={styles.card}
            glowColor="card.softGlow"
        />
    );
}
