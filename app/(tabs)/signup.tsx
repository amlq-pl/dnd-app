// screens/SignupScreen.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText, ThemedView } from "@/components/themed";

import { MainHeader } from "@/components/SheetsAndGigglesHeader";
import { Input } from "@/components/signup&login/input"
import { SocialPanel } from "@/components/signup&login/SocialPanel";
import { Checkbox } from "@/components/Checkbox";

export default function SignupScreen() {
    const router = useRouter();

    const [characterName, setCharacterName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);


    const handleSignup = () => {
        const fieldsEmpty = !characterName || !email || !password || !confirmPassword;
        const passwordsMatch = password === confirmPassword;

        if (fieldsEmpty) {
            console.log("Error: All fields are required.");
            return;
        }

        if (!passwordsMatch) {
            console.log("Error: Passwords do not match.");
            return;
        }

        if (!termsAccepted) {
            console.log("Error: You must accept the Terms of Service.");
            return;
        }

        console.log("Creating character for:", { characterName, email, password });
    };

    const handleClickOnTermsOfService = () => {
        console.log("Clicked Terms of Service link (empty function).");
    };

    const handleClickOnPrivacyPolicy = () => {
        console.log("Clicked Privacy Policy link (empty function).");
    };

    const { styles } = useStyles((t, c) => ({
        screen: { flex: 1, justifyContent: "center", alignItems: "center", gap: 24 },
        scrollView: { flex: 1, alignSelf: "stretch" },
        scrollContentContainer: { flexGrow: 1 },
        content: {
            alignSelf: "stretch",
            paddingHorizontal: t.spacing.lg,
            paddingTop: t.spacing.xl,
            // gap: t.spacing.lg,
        },
        fields: { gap: t.spacing.lg, marginBottom: t.spacing.xl },
        termsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: t.spacing.xl,
            gap: t.spacing.sm,
        },
        createButton: {
            backgroundColor: c("text.lively"),
            borderRadius: t.borderRadius.full,
            paddingVertical: t.spacing.md,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: c("text.lively"),
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
        },
        createButtonText: {
            fontSize: 18,
            fontWeight: '700',
            color: c("text.onSecondary"),
        }
    }));

    return (
        <ThemedView backgroundColor="surface.background" style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.scrollContentContainer}
                style={styles.scrollView}
            >
                <ThemedView style={styles.content}>

                    <MainHeader />

                    <View style={styles.fields}>
                        {/** NAME */}
                        <Input
                            label="Character Name"
                            placeholder="Gandalf the Grey"
                            value={characterName}
                            onChangeText={setCharacterName}
                        />
                        {/** EMAIL */}
                        <Input
                            label="Email Address"
                            placeholder="wizard@realm.com"
                            value={email}
                            onChangeText={setEmail}
                        />
                        {/** PASSWORD */}
                        <Input
                            label="Password"
                            placeholder="•••••••••"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Input
                            label="Confirm Password"
                            placeholder="•••••••••"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>

                    {/* Terms of Service Section */}
                    <View style={styles.termsRow}>
                        <Checkbox
                            value={termsAccepted}
                            onValueChange={setTermsAccepted}
                            buttonColor="palette.tertiary"
                        />
                        <ThemedText color="text.muted" style={{ fontSize: 14 }}>
                            I agree to the
                            <TouchableOpacity onPress={handleClickOnTermsOfService}>
                                <ThemedText color="text.lively" style={{ fontSize: 14 }}> Terms of Service </ThemedText>
                            </TouchableOpacity>
                            and
                            <TouchableOpacity onPress={handleClickOnPrivacyPolicy}>
                                <ThemedText color="text.lively" style={{ fontSize: 14 }}> Privacy Policy</ThemedText>
                            </TouchableOpacity>
                        </ThemedText>
                    </View>

                    <TouchableOpacity
                        style={styles.createButton}
                        onPress={handleSignup}
                        activeOpacity={0.8}
                    >
                        <ThemedText style={styles.createButtonText}>Create Character</ThemedText>
                    </TouchableOpacity>

                    {/* <SocialSignupPanel /> */}
                    <SocialPanel
                        onPressApple={() => { console.log("Log via Google") }}
                        onPressGoogle={() => { console.log("Log via Apple") }}
                    />


                    {/* Footer Section */}
                    <SignupFooter handleRerouteToLogin={() => router.replace("/(tabs)/login")} />

                </ThemedView>
            </ScrollView >
        </ThemedView >
    );
}

function SignupFooter({ handleRerouteToLogin }: { handleRerouteToLogin: () => void }) {
    const { styles } = useStyles((t, c) => ({
        footer: {
            alignItems: "center",
            marginTop: t.spacing.xxl,
            marginBottom: t.spacing.lg,
        },
    }));

    return (
        <View style={styles.footer}>
            <ThemedText color="text.muted">
                Already have an account?
                <TouchableOpacity onPress={handleRerouteToLogin}>
                    <ThemedText color="text.lively" style={{ fontWeight: '700' }}> Sign in</ThemedText>
                </TouchableOpacity>
            </ThemedText>
        </View>
    );
}