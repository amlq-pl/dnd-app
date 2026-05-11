import { useStyles } from "@/hooks/useStyles";
import { View, Image } from "react-native";
import { ThemedText } from "../themed";

type Props = {
    image: number | undefined;
    level: number;
};

export default function ImageWithLevel({ image, level }: Props) {
    const { styles } = useStyles((t, c) => ({
        image: {
            width: 80,
            height: 80,
            borderRadius: t.borderRadius.sm,
        },
        levelStub: {
            minWidth: 52,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: c("palette.secondary"),
            paddingHorizontal: t.spacing.xs,
            paddingVertical: t.spacing.xxs,
            borderRadius: t.borderRadius.sm,
            position: "absolute",
            bottom: -t.spacing.sm,
            right: -t.spacing.lg,
        },
    }));

    return (
        <View style={styles.image}>
            {image && (
                <Image resizeMode="cover" source={image} style={styles.image} />
            )}
            <View style={styles.levelStub}>
                <ThemedText color="text.onSecondary" variant="body">
                    LVL {level}
                </ThemedText>
            </View>
        </View>
    );
}
