import { ThemedText } from "@/components/themed";
import type { ThemeColorKey } from "@/constants/themes";
import { useAppTheme } from "@/hooks/useAppTheme";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

type Provider = "google" | "apple";

interface ProviderButton {
    provider: Provider;
    label: string;
    icon: "logo-google" | "logo-apple";
    backgroundColor: ThemeColorKey;
    textColor: ThemeColorKey;
    borderColor?: ThemeColorKey;
}

const PROVIDERS: ProviderButton[] = [
    {
        provider: "google",
        label: "Continue with Google",
        icon: "logo-google",
        backgroundColor: "surface.surfaceElevated",
        textColor: "text.heading",
        borderColor: "border.default",
    },
    {
        provider: "apple",
        label: "Continue with Apple",
        icon: "logo-apple",
        backgroundColor: "text.heading",
        textColor: "surface.background",
    },
];

export function SocialAuth() {
    const router = useRouter();
    const { color } = useAppTheme();
    const [busy, setBusy] = useState<Provider | null>(null);
    const [error, setError] = useState<string | null>(null);

    const signIn = async (provider: Provider) => {
        if (busy) return;
        setBusy(provider);
        setError(null);

        try {
            const redirectTo = Linking.createURL("/auth-callback");

            const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
                provider,
                options: { redirectTo, skipBrowserRedirect: true },
            });
            if (oauthError) throw oauthError;
            if (!data?.url) throw new Error("Supabase did not return an OAuth URL");

            const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
            if (result.type !== "success") {
                if (result.type === "cancel" || result.type === "dismiss") return;
                throw new Error(`OAuth flow ended unexpectedly (${result.type})`);
            }

            const callbackUrl = new URL(result.url);
            const rawParams = callbackUrl.hash.startsWith("#")
                ? callbackUrl.hash.slice(1)
                : callbackUrl.search.replace(/^\?/, "");
            const params = new URLSearchParams(rawParams);
            const accessToken = params.get("access_token");
            const refreshToken = params.get("refresh_token");
            if (!accessToken || !refreshToken) {
                throw new Error("Missing tokens in OAuth callback");
            }

            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
            });
            if (sessionError) throw sessionError;
            const authUser = sessionData.user;
            if (!authUser) throw new Error("No user after setSession");

            const meta = (authUser.user_metadata ?? {}) as Record<string, unknown>;
            const displayName =
                (typeof meta.full_name === "string" && meta.full_name) ||
                (typeof meta.name === "string" && meta.name) ||
                authUser.email ||
                "Adventurer";

            const { error: upsertError } = await supabase.from("users").upsert(
                {
                    id: authUser.id,
                    auth_provider: provider,
                    auth_provider_id: typeof meta.sub === "string" ? meta.sub : authUser.id,
                    email: authUser.email ?? null,
                    display_name: displayName,
                    avatar_url: typeof meta.avatar_url === "string" ? meta.avatar_url : null,
                },
                { onConflict: "id" },
            );
            if (upsertError) throw upsertError;

            router.replace("/(tabs)/home");
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Sign-in failed");
        } finally {
            setBusy(null);
        }
    };

    return (
        <View style={styles.container}>
            {PROVIDERS.map(({ provider, label, icon, backgroundColor, textColor, borderColor }) => {
                const isBusy = busy === provider;
                const disabled = busy !== null;
                return (
                    <Pressable
                        key={provider}
                        accessibilityRole="button"
                        accessibilityState={{ busy: isBusy, disabled }}
                        disabled={disabled}
                        onPress={() => signIn(provider)}
                        style={({ pressed }) => [
                            styles.button,
                            {
                                backgroundColor: color(backgroundColor),
                                borderColor: borderColor ? color(borderColor) : "transparent",
                                borderWidth: borderColor ? StyleSheet.hairlineWidth * 2 : 0,
                                opacity: disabled && !isBusy ? 0.5 : pressed ? 0.85 : 1,
                            },
                        ]}
                    >
                        {isBusy ? (
                            <ActivityIndicator color={color(textColor)} />
                        ) : (
                            <Ionicons color={color(textColor)} name={icon} size={20} />
                        )}
                        <ThemedText color={textColor} style={styles.label} variant="label">
                            {label}
                        </ThemedText>
                    </Pressable>
                );
            })}

            {error ? (
                <ThemedText color="semantic.error" style={styles.error} variant="body">
                    {error}
                </ThemedText>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
        alignItems: "stretch",
        alignSelf: "stretch",
        paddingHorizontal: 24,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
        minHeight: 50,
    },
    label: {
        textAlign: "center",
    },
    error: {
        textAlign: "center",
        paddingTop: 4,
    },
});
