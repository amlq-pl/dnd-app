import { HighlightedView } from "../HighlightedView";
import { Adventurer } from "@/hooks/useAdventurers";
import { useStyles } from "@/hooks/useStyles";
import AdventurerCardFooter from "./AdventurerCardFooter";
import AdventurerHeader from "./AdventurerHeader";

type Props = {
    adv: Adventurer;
};

export default function AdventurerCard({ adv }: Props) {
    const { styles } = useStyles((t, c) => ({
        container: {
            display: "flex",
            flexDirection: "column",
            borderRadius: t.borderRadius.md,
        },
    }));

    const hpRatio = adv.hp / adv.maxHp;
    const glowColor =
        hpRatio > 0.5
            ? "card.glow"
            : hpRatio > 0.25
              ? "glow.goldGlow"
              : "glow.redGlow";

    return (
        <HighlightedView
            key={adv.id}
            glow={true}
            glowColor={glowColor}
            shadowColor="surface.surfaceElevated"
            style={styles.container}
        >
            <AdventurerHeader adventurer={adv} />
            <AdventurerCardFooter
                armorClass={adv.armorClass}
                currentHp={adv.hp}
                maxHp={adv.maxHp}
            />
        </HighlightedView>
    );
}
