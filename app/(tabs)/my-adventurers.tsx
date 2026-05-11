import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "@/components/themed";
import useAdventurers from "@/hooks/useAdventurers";
import AdventurerCard from "@/components/adventurers/AdventurerCard";

export default function MyAdventurers() {
    const { styles } = useStyles((t, c) => ({
        outerContainer: {
            margin: t.spacing.xl,
        },
        title: {
            marginBottom: t.spacing.lg,
        },
        subtitle: {
            fontSize: 20,
            marginBottom: t.spacing.lg,
        },
        cardsContainer: {
            display: "flex",
            flexDirection: "column",
            gap: t.spacing.xl,
        },
        touchable: {
            width: "100%",
            height: 150,
            borderRadius: t.borderRadius.md,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: t.spacing.sm,
            padding: t.spacing.lg,
            borderColor: c("card.glow"),
            borderStyle: "dashed",
            borderWidth: 2,
        },
    }));

    const { fetchAdventurers } = useAdventurers();
    const adventurers = fetchAdventurers();

    return (
        <>
            <ScrollView style={styles.outerContainer}>
                <ThemedText
                    color="text.heading"
                    style={styles.title}
                    variant="headline"
                >
                    My Adventurers
                </ThemedText>
                <ThemedText color="text.body" style={styles.subtitle}>
                    View and manage your adventurers here.
                </ThemedText>
                <View style={styles.cardsContainer}>
                    {adventurers.map((adv) => (
                        <AdventurerCard key={adv.id} adv={adv} />
                    ))}
                    <TouchableOpacity style={styles.touchable}>
                        <Image
                            source={require("@/assets/images/AddIcon.png")}
                        />
                        <ThemedText color="card.glow" variant="body">
                            Create New Adventurer
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}
