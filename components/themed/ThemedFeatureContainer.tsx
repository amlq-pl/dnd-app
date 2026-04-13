import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ThemedHeadline } from "./ThemedHeadline";
import { ThemedText } from "./ThemedText";
import { ThemedTextBox } from "./ThemedTextBox";
import { ThemedView } from "./ThemedView";

export type Feature = {
    name: string;
    tag: string;
    shortDescription: string;
    description: string;
};

export interface ThemedFeatureContainerProps {
    feature: Feature;
}

export function ThemedFeatureContainer({ feature }: ThemedFeatureContainerProps) {
    const { color } = useAppTheme();
    const [expanded, setExpanded] = useState(false);

    return (
        <Pressable
            onPress={() => setExpanded((value) => !value)}
            style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
            android_ripple={{ color: color("border.strong") }}
        >
            <ThemedTextBox
                style={[
                    styles.container,
                    expanded && styles.containerExpanded,
                    { borderColor: color("border.strong") },
                ]}
                backgroundColor="surface.surface"
                borderRadius="lg"
            >
                <ThemedView style={styles.header}>
                    <ThemedView style={styles.titleRow}>
                        <ThemedText color="palette.primary" variant="label" style={styles.name}>
                            {feature.name}
                        </ThemedText>
                        <ThemedText color="text.muted" variant="body" style={styles.tag}>
                            {feature.tag}
                        </ThemedText>
                    </ThemedView>
                </ThemedView>

                {!expanded ? (
                    <ThemedText color="text.body" style={styles.shortDescription}>
                        {feature.shortDescription}
                    </ThemedText>
                ) : null}

                {expanded ? (
                    <ThemedText color="text.body" style={styles.description}>
                        {feature.description}
                    </ThemedText>
                ) : null}
            </ThemedTextBox>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        marginVertical: 8,
    },
    pressed: {
        opacity: 0.75,
    },
    container: {
        padding: 16,
        borderWidth: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    containerExpanded: {
        paddingBottom: 20,
    },
    header: {
        marginBottom: 10,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    name: {
        marginBottom: 0,
        flex: 1,
        fontSize: 20,
    },
    tag: {
        marginBottom: 0,
        marginTop: -8,
        fontSize: 8,
        textAlign: "right"
    },
    shortDescription: {
        marginBottom: 10,
    },
    description: {
        marginBottom: 10,
    },
});