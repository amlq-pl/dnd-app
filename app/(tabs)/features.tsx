import { ThemedHeadline, ThemedView } from "@/components/themed";
import { ThemedFeatureContainer, type Feature } from "@/components/themed/ThemedFeatureContainer";
import { ScrollView, StyleSheet, View } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
const FEATURES: Feature[] = [
    {
        name: "Divine Smite",
        tag: "Paladin Feature",
        shortDescription: "Deal extra radiant damage with melee attacks.",
        description:
            "When you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon's damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8. The damage increases by 1d8 if the target is an undead or a fiend.",
    },
    {
        name: "Lay on Hands",
        tag: "Paladin Feature",
        shortDescription: "Heal wounds with a pool of healing power.",
        description:
            "You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level × 5. As an action, you can touch a creature to restore any number of hit points remaining in the pool, or to cure the target of one disease or neutralize one poison affecting it. You can also expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it.",
    },
    {
        name: "Fighting Style: Defense",
        tag: "Fighting Style",
        shortDescription: "While you are wearing armor, you gain a +1 bonus to AC.",
        description:
             "While you are wearing armor, you gain a +1 bonus to AC.",
    },
    {
        name: "Divine Health",
        tag: "Paladin Feature",
        shortDescription: "Immunity to disease.",
        description:
            "You are immune to disease.",
    },
    {
        name: "Channel Divinity: Sacred Weapon",
        tag: "Paladin Feature",
        shortDescription: "Use your Channel Divinity to imbue a weapon with positive energy.",
        description:
            "As an action, you can use your Channel Divinity to imbue one weapon that you are holding with positive energy. For 1 minute, you add your Charisma modifier to attack rolls made with that weapon (minimum bonus of +1). The weapon also emits bright light in a 20-foot radius and dim light for an additional 20 feet. If the weapon is not already magical, it becomes magical for the duration of this effect.",
    },
    {
        name: "Channel Divinity: Turn the Unholy",
        tag: "Paladin Feature",
        shortDescription: "Use your Channel Divinity to frighten fiends and undead.",
        description:
            "As an action, you can use your Channel Divinity to utter ancient words that are painful for fiends and undead to hear. Each fiend or undead that can hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes damage.",
    }
];


export default function FeaturesAndTraitsScreen() {
    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedHeadline color="text.heading" style={styles.headline}>Your Features</ThemedHeadline>
                <View style={styles.list}>
                    {FEATURES.map((feature) => (
                        <ThemedFeatureContainer key={feature.name} feature={feature} />
                    ))}
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    headline: {
        marginBottom: 16,
        marginTop: 32,
        textAlign: "center",
    },
    list: {
        width: "100%",
    },
});