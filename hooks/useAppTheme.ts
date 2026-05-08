import type { AppTheme, ThemeColorKey, ThemeId } from "@/constants/themes";
import { useThemeContext } from "@/context/ThemeContext";

export interface UseAppThemeOptions {
    themeId?: ThemeId;
}

export interface UseAppThemeResult {
    themeId: ThemeId;
    theme: AppTheme;
    mode: AppTheme["mode"];
    /** Resolve a dot-path colour key, e.g. `color("palette.primary")`. */
    color: (key: ThemeColorKey) => string;
    setThemeId: (nextThemeId: ThemeId) => void;
}

export function useAppTheme(_options?: UseAppThemeOptions): UseAppThemeResult {
    return useThemeContext();
}
