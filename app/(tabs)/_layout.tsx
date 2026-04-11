import { TAB_ROUTES } from "@/constants/routes";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
    const { theme, color } = useAppTheme();
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: color("palette.secondary"),
                tabBarInactiveTintColor: color("text.muted"),
                tabBarStyle: {
                    backgroundColor: color("surface.surface"),
                    borderTopColor: color("border.subtle"),
                    borderTopWidth: 1,
                    paddingBottom: insets.bottom + theme.spacing.xs,
                    paddingTop: theme.spacing.xs,
                    height: 60 + insets.bottom,
                },
                tabBarLabelStyle: {
                    fontFamily: theme.typography.labelFont,
                    fontSize: 11,
                },
                sceneStyle: {
                    backgroundColor: color("surface.background"),
                },
            }}
        >
            {TAB_ROUTES.map((route) => (
                <Tabs.Screen
                    key={route.name}
                    name={route.name}
                    options={{
                        title: route.title,
                        tabBarIcon: ({ focused, color: tint, size }) => (
                            <Ionicons
                                color={tint}
                                name={focused ? route.icon : route.iconOutline}
                                size={size}
                            />
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
}
