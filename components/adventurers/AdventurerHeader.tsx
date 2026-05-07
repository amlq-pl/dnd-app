import { Adventurer } from "@/hooks/useAdventurers";
import { useStyles } from "@/hooks/useStyles";
import { TouchableOpacity, View } from "react-native";
import ImageWithLevel from "./ImageWithLevel";
import { ThemedText } from "../themed";
import { RightArrowIcon } from "../icons";

type Props = {
    adventurer: Adventurer;
};

export default function AdventurerHeader({ adventurer }: Props) {
    const { styles } = useStyles((t, c) => ({
        upperView: {
            backgroundColor: c("card.background"),
            flexGrow: 1,
            width: "100%",
            padding: t.spacing.xl,
            display: "flex",
            flexDirection: "row",
            borderTopLeftRadius: t.borderRadius.md,
            borderTopRightRadius: t.borderRadius.md,
            gap: t.spacing.xxl,
        },
        column: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: t.spacing.sm,
        },
    }));

    return (
        <View style={styles.upperView}>
            <ImageWithLevel image={adventurer.image} level={adventurer.level} />
            <View style={styles.column}>
                <ThemedText color="text.heading" style={{ fontSize: 24 }}>
                    {adventurer.name}
                </ThemedText>
                <ThemedText color="text.body" variant="body">
                    Class: {adventurer.class.toUpperCase()}
                </ThemedText>
                <ThemedText color="text.body" variant="body">
                    Race: {adventurer.race.toUpperCase()}
                </ThemedText>
            </View>
            <View style={{ alignSelf: "center" }}>
                <TouchableOpacity>
                    <RightArrowIcon color="text.body" size={16} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
