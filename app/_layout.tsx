import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";

export default function RootLayout() {
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
