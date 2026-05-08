import { useMemo } from "react";
import { StyleSheet } from "react-native";
import type { AppTheme, ThemeColorKey } from "@/constants/themes";
import { useAppTheme } from "./useAppTheme";

type StyleFactory<T extends StyleSheet.NamedStyles<T>> = (
    theme: AppTheme,
    color: (key: ThemeColorKey) => string
) => T;

/**
 * Creates a memoized StyleSheet from a factory that receives the active theme
 * and the color resolver. Recomputes only when the theme changes.
 * Also returns `theme` and `color` so you never need a separate `useAppTheme` call.
 *
 * @example
 * const { styles, color } = useStyles((theme, color) => ({
 *   container: {
 *     backgroundColor: color("surface.background"),
 *     padding: theme.spacing.md,
 *     borderRadius: theme.borderRadius.md,
 *   },
 *   title: {
 *     color: color("text.heading"),
 *     fontFamily: theme.typography.headlineFont,
 *   },
 * }));
 */
export function useStyles<T extends StyleSheet.NamedStyles<T>>(
    factory: StyleFactory<T>
): { styles: T; theme: AppTheme; color: (key: ThemeColorKey) => string } {
    const { theme, color } = useAppTheme();
    const styles = useMemo(
        () => StyleSheet.create(factory(theme, color)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [theme]
    );
    return { styles, theme, color };
}
