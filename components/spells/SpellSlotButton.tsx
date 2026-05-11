import { Pressable } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { ThemedView } from "@/components/themed/ThemedView";

interface SpellSlotButtonProps {
    isUsed: boolean;
    onPress: () => void;
}
//TODO: Connect to DB
//TODO: Change color
//
export function SpellSlotButton({ isUsed, onPress }: SpellSlotButtonProps) {
    const { styles, color } = useStyles((t, c) => ({
        container: {
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
        },
        unused: {
            backgroundColor: "transparent",
            borderColor: c("border.strong"),     

        },
        used: {
            backgroundColor: c("palette.primary"),
            borderColor: c("border.strong"),
        },
    }));

    const containerStyle = isUsed ? styles.used : styles.unused;

    return (
        <Pressable onPress={onPress}>
            <ThemedView style={[styles.container, containerStyle]} />
        </Pressable>
    );
}
