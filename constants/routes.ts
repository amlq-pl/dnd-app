import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

// ---------------------------------------------------------------------------
// Icon helper type – uses Ionicons which ships with Expo by default.
// Swap to any other icon family (MaterialCommunityIcons, FontAwesome, …)
// by changing the import above and the type below.
// ---------------------------------------------------------------------------
type IconName = ComponentProps<typeof Ionicons>["name"];

// ---------------------------------------------------------------------------
// Route definition
// ---------------------------------------------------------------------------

export interface RouteDefinition {
    /** File-system name **without** extension, as used by expo-router.
     *  For the "index" route use `"index"`. */
    name: string;

    /** Human-readable title shown in the tab bar / header. */
    title: string;

    /** Ionicons icon for the *focused* (active) state. */
    icon: IconName;

    /** Ionicons icon for the *unfocused* (inactive) state.
     *  Convention: use the `-outline` variant. */
    iconOutline: IconName;

    /** Deep-link href used by expo-router's `<Link>` / `router.push()`. */
    href: `/${string}` | "/";
}

// ---------------------------------------------------------------------------
// Tab routes – the order here defines the order in the bottom bar.
// Add / remove / reorder entries and the tab bar updates automatically.
// ---------------------------------------------------------------------------

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
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Look up a route by its file-system name. */
export function getRouteByName(name: string): RouteDefinition | undefined {
    return TAB_ROUTES.find((r) => r.name === name);
}
