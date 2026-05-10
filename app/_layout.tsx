import { ThemeProvider } from "@/context/ThemeContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import {
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import {
    NotoSerif_400Regular,
    NotoSerif_600SemiBold,
    NotoSerif_700Bold,
} from "@expo-google-fonts/noto-serif";

SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
    const { color } = useAppTheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: color("surface.background"),
                },
            }}
        />
    );
}

export default function RootLayout() {
    const [loaded, error] = useFonts({
        "manrope-light": Manrope_300Light,
        manrope: Manrope_400Regular,
        "manrope-medium": Manrope_500Medium,
        "manrope-semibold": Manrope_600SemiBold,
        "manrope-bold": Manrope_700Bold,
        notoSerif: NotoSerif_400Regular,
        "notoSerif-semibold": NotoSerif_600SemiBold,
        "notoSerif-bold": NotoSerif_700Bold,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <ThemeProvider>
            <RootLayoutInner />
        </ThemeProvider>
    );
}
