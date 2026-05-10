// screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import { ThemedText, ThemedView } from "@/components/themed";
import { MainHeader } from "@/components/SheetsAndGigglesHeader";
import { Input } from "@/components/signup&login/input";
import { SocialPanel } from "@/components/signup&login/SocialPanel";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const { styles } = useStyles((t, c) => ({
        screen: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
        },
        scrollView: { flex: 1, alignSelf: "stretch" },
        scrollContentContainer: { flexGrow: 1 },
        content: {
            alignSelf: "stretch",
            paddingHorizontal: t.spacing.lg,
            paddingTop: t.spacing.xl,
            // gap: t.spacing.lg,
        },
        actionRow: {
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: t.spacing.xl,
            gap: t.spacing.lg,
        },
        primaryButton: {
            backgroundColor: c("text.lively"),
            borderRadius: 50,
            paddingVertical: t.spacing.lg,
            alignItems: "center",
            shadowColor: c("text.lively"),
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
        },
        buttonText: {
            fontSize: 18,
            fontWeight: "700",
            color: c("text.onSecondary"),
        },
        footer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: t.spacing.xxl,
            paddingBottom: t.spacing.xl,
        },
        footerLink: {
            fontWeight: "700",
        },
    }));

    const handleBeginAdventure = (email: string, password: string) => {
        /* TODO: implement it */
        console.log("Login attempt:");
        console.log("Email:", email);
        console.log("Password:", password);
    };

    const handleForgotPassword = () => {
        /*TODO: implement it */
        console.log("Password recovery sequence initiated.");
    };

    /* TODO: implement checking whether the input is empty and valid */

    return (
        <ThemedView backgroundColor="surface.background" style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.scrollContentContainer}
                style={styles.scrollView}
            >
                <ThemedView style={styles.content}>
                    <MainHeader />

                    <Input
                        label="Email Address"
                        placeholder="adventurer@realm.com"
                        value={email}
                        onChangeText={setEmail}
                    />

                    {/** TODO: insert time is annoyingly short. consider doing something with it */}
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <View style={styles.actionRow}>
                        <TouchableOpacity
                            accessibilityLabel="Forgot password"
                            accessibilityRole="button"
                            activeOpacity={0.7}
                            onPress={handleForgotPassword}
                        >
                            <ThemedText color="text.lively">
                                Forgot password?
                            </ThemedText>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.primaryButton}
                        onPress={() => handleBeginAdventure(email, password)}
                    >
                        <ThemedText style={styles.buttonText}>
                            Begin Adventure
                        </ThemedText>
                    </TouchableOpacity>

                    <SocialPanel
                        onPressApple={() => {
                            console.log("Log via Google");
                        }}
                        onPressGoogle={() => {
                            console.log("Log via Apple");
                        }}
                    />

                    <View style={styles.footer}>
                        <ThemedText color="text.muted">
                            New to the realm?{" "}
                        </ThemedText>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => router.replace("/(tabs)/signup")}
                        >
                            <ThemedText
                                color="text.lively"
                                style={styles.footerLink}
                            >
                                Create an account
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}
