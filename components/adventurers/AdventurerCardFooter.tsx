import { useStyles } from "@/hooks/useStyles";
import { View } from "react-native";
import { ThemedText } from "../themed";
import { ACIcon, HPIcon } from "../icons";

type Props = {
    currentHp: number;
    maxHp: number;
    armorClass: number;
};

export default function AdventurerCardFooter({
    currentHp,
    maxHp,
    armorClass,
}: Props) {
    const { styles } = useStyles((t, c) => ({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: t.spacing.xl,
            backgroundColor: c("surface.note"),
            borderBottomLeftRadius: t.borderRadius.md,
            borderBottomRightRadius: t.borderRadius.md,
            paddingHorizontal: t.spacing.lg,
            paddingVertical: t.spacing.sm,
        },
        inline: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: t.spacing.sm,
        },
    }));

    return (
        <View style={styles.container}>
            <View style={styles.inline}>
                <HPIcon color="text.body" />
                <ThemedText color="text.body" variant="body">
                    {currentHp} / {maxHp}
                </ThemedText>
            </View>
            <View style={styles.inline}>
                <ACIcon color="text.body" />
                <ThemedText color="text.body" variant="body">
                    AC: {armorClass}
                </ThemedText>
            </View>
        </View>
    );
}
