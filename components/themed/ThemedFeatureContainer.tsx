import { useState } from "react";
import { Pressable } from "react-native";
import { useStyles } from "@/hooks/useStyles";
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
    const { styles, color } = useStyles((_, c) => ({
        pressable: { marginVertical: 8 },
        pressed: { opacity: 0.75 },
        container: {
            padding: 16,
            borderWidth: 1,
            borderColor: c("border.strong"),
            justifyContent: "flex-start",
            alignItems: "stretch",
        },
        containerExpanded: { paddingBottom: 20 },
        header: { marginBottom: 10 },
        titleRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
        },
        name: { marginBottom: 0, flex: 1, fontSize: 20 },
        tag: { marginBottom: 0, marginTop: -8, fontSize: 8, textAlign: "right" },
        shortDescription: { marginBottom: 10 },
        description: { marginBottom: 10 },
    }));

    const [expanded, setExpanded] = useState(false);

    return (
        <Pressable
            android_ripple={{ color: color("border.strong") }}
            style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
            onPress={() => setExpanded((value) => !value)}
        >
            <ThemedTextBox
                backgroundColor="surface.surface"
                borderRadius="lg"
                style={[styles.container, expanded && styles.containerExpanded]}
            >
                <ThemedView style={styles.header}>
                    <ThemedView style={styles.titleRow}>
                        <ThemedText color="palette.primary" style={styles.name} variant="label">
                            {feature.name}
                        </ThemedText>
                        <ThemedText color="text.muted" style={styles.tag} variant="body">
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
