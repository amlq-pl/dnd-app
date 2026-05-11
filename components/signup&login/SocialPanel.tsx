import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useStyles } from "@/hooks/useStyles";
import { ThemedText } from "@/components/themed";
import { useAppTheme } from "@/hooks/useAppTheme";
import { supabase } from "@/lib/supabase";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { GoogleIcon } from "../icons/GoogleIcon";
import { AppleIcon } from "../icons/AppleIcon";

WebBrowser.maybeCompleteAuthSession();

type Provider = "google" | "apple";

export const SocialPanel = () => {
    const { color: c } = useAppTheme();
    const router = useRouter();
    const [busy, setBusy] = useState<Provider | null>(null);
    const [error, setError] = useState<string | null>(null);

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
        error: {
            textAlign: "center",
            marginTop: t.spacing.sm,
        },
    }));

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

    const disabled = busy !== null;

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
                    disabled={disabled}
                    style={[
                        styles.socialButton,
                        { opacity: disabled && busy !== "google" ? 0.5 : 1 },
                    ]}
                    onPress={() => signIn("google")}
                >
                    {busy === "google" ? (
                        <ActivityIndicator color={c("text.muted")} size="small" />
                    ) : (
                        <GoogleIcon size={20} />
                    )}
                    <ThemedText style={styles.text}>Google</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={disabled}
                    style={[
                        styles.socialButton,
                        { opacity: disabled && busy !== "apple" ? 0.5 : 1 },
                    ]}
                    onPress={() => signIn("apple")}
                >
                    {busy === "apple" ? (
                        <ActivityIndicator color={c("text.muted")} size="small" />
                    ) : (
                        <AppleIcon colorKey="text.muted" size={26} />
                    )}
                    <ThemedText style={styles.text}>Apple</ThemedText>
                </TouchableOpacity>
            </View>
            {error ? (
                <ThemedText color="semantic.error" style={styles.error}>
                    {error}
                </ThemedText>
            ) : null}
        </>
    );
};
