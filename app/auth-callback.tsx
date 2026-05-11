import * as WebBrowser from "expo-web-browser";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

/**
 * OAuth redirect target for web production (static export).
 * Without this route, `/auth-callback` is not emitted at build time and
 * Vercel returns 404 after Google/Supabase redirects here with tokens in the hash.
 */
WebBrowser.maybeCompleteAuthSession();

export default function AuthCallbackScreen() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        </>
    );
}
