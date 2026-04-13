import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

export interface RouteDefinition {
    name: string;
    title: string;
    icon: IconName;
    iconOutline: IconName;
    href: `/${string}` | "/";
}

export const TAB_ROUTES: readonly RouteDefinition[] = [
    {
        name: "home",
        title: "Home",
        icon: "home",
        iconOutline: "home-outline",
        href: "/home",
    },
    {
        name: "characteristics",
        title: "Character",
        icon: "person",
        iconOutline: "person-outline",
        href: "/characteristics",
    },
    {
        name: "combat",
        title: "Combat",
        icon: "flame",
        iconOutline: "flame-outline",
        href: "/combat",
    },
    {
        name: "inventory",
        title: "Inventory",
        icon: "bag-handle",
        iconOutline: "bag-handle-outline",
        href: "/inventory",
    },
    {
        name: "spells",
        title: "Spells",
        icon: "sparkles",
        iconOutline: "sparkles-outline",
        href: "/spells",
    },
    {
        name: "features",
        title: "Features",
        icon: "star",
        iconOutline: "star-outline",
        href: "/features",
    },
    {
        name: "character-sheet",
        title: "Character Sheet",
        icon: "document-text",
        iconOutline: "document-text-outline",
        href: "/character-sheet",
    }
] as const;

export function getRouteByName(name: string): RouteDefinition | undefined {
    return TAB_ROUTES.find((r) => r.name === name);
}
