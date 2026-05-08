import { ThemeProvider } from "@/context/ThemeContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";

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
    return (
        <ThemeProvider>
            <RootLayoutInner />
        </ThemeProvider>
    );
}
