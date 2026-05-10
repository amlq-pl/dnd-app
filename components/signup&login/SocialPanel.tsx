import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "@/components/themed";
import { useAppTheme } from "@/hooks/useAppTheme";
import { GoogleIcon } from "../icons/GoogleIcon";
import { AppleIcon } from "../icons/AppleIcon";

interface SocialPanelProps {
    onPressGoogle: () => void;
    onPressApple: () => void;
}

export const SocialPanel = ({
    onPressGoogle,
    onPressApple,
}: SocialPanelProps) => {
    const { color: c } = useAppTheme();

    const { styles } = useStyles((t) => ({
        dividerContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginVertical: t.spacing.xxl,
        },
        line: {
            flex: 1,
            height: 1,
            backgroundColor: c("border.subtle"),
            opacity: 0.5,
        },
        socialRow: { flexDirection: "row", gap: t.spacing.md },
        socialButton: {
            flex: 1,
            flexDirection: "row",
            borderWidth: 1,
            borderColor: c("border.subtle"),
            borderRadius: 12,
            paddingVertical: t.spacing.md,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: c("card.background"),
            height: 48,
            gap: 10,
        },
        text: {
            fontWeight: 600,
            color: c("text.muted"),
        },
    }));

    // Logic for dynamic content based on provider
    const content = {
        apple: {
            label: "Continue with Apple",
            icon: "logo-apple" as const,
        },
        google: {
            label: "Continue with Google",
            icon: "logo-google" as const,
        },
    };

    return (
        <>
            <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <ThemedText color="text.muted" style={{ marginHorizontal: 10 }}>
                    Or continue with
                </ThemedText>
                <View style={styles.line} />
            </View>
            <View style={styles.socialRow}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.socialButton}
                    onPress={onPressGoogle}
                >
                    <GoogleIcon size={20} />
                    <ThemedText style={styles.text}>Google</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.socialButton}
                    onPress={onPressApple}
                >
                    <AppleIcon colorKey="text.muted" size={26} />
                    <ThemedText style={styles.text}>Apple</ThemedText>
                </TouchableOpacity>
            </View>
        </>
    );
};
