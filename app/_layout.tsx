import { Stack } from "expo-router";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function RootLayout() {
  const { theme } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.neutral,
        },
      }}
    />
  );
}
