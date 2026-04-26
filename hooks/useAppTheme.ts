import {
    defaultThemeId,
    getThemeById,
    resolveColor,
    type AppTheme,
    type ThemeId,
} from "@/constants/themes";
import { useMemo } from "react";

export interface UseAppThemeOptions {
    themeId?: ThemeId;
}

export interface UseAppThemeResult {
    themeId: ThemeId;
    theme: AppTheme;
    mode: AppTheme["mode"];
    /** Resolve a theme key (e.g. `"palette.primary"`) or pass through a raw colour string. */
    color: (key: string) => string;
    setThemeId: (nextThemeId: ThemeId) => void;
}

export function useAppTheme(options?: UseAppThemeOptions): UseAppThemeResult {
    const activeThemeId = options?.themeId ?? defaultThemeId;

    const theme = useMemo(() => getThemeById(activeThemeId), [activeThemeId]);

    const color = (key: string) => resolveColor(theme.colors, key);

    const setThemeId = (_nextThemeId: ThemeId) => {
        // Placeholder for future state/context-backed theme switching.
    };

    return {
        themeId: activeThemeId,
        theme,
        mode: theme.mode,
        color,
        setThemeId,
    };
}
