import React, { createContext, useContext, useMemo, useState } from "react";
import {
    defaultThemeId,
    getThemeById,
    resolveColor,
    type AppTheme,
    type ThemeColorKey,
    type ThemeId,
} from "@/constants/themes";

interface ThemeContextValue {
    themeId: ThemeId;
    theme: AppTheme;
    mode: AppTheme["mode"];
    color: (key: ThemeColorKey) => string;
    setThemeId: (nextThemeId: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeId, setThemeId] = useState<ThemeId>(defaultThemeId);

    const theme = useMemo(() => getThemeById(themeId), [themeId]);
    const color = useMemo(() => (key: ThemeColorKey) => resolveColor(theme.colors, key), [theme]);

    const value = useMemo(
        () => ({ themeId, theme, mode: theme.mode, color, setThemeId }),
        [themeId, theme, color],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useThemeContext must be used inside <ThemeProvider>");
    }
    return ctx;
}
