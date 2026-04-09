import { useMemo } from "react";
import {
  defaultThemeId,
  getThemeById,
  type AppTheme,
  type ThemeId,
} from "@/constants/themes";

export interface UseAppThemeOptions {
  themeId?: ThemeId;
}

export interface UseAppThemeResult {
  themeId: ThemeId;
  theme: AppTheme;
  mode: AppTheme["mode"];
  setThemeId: (nextThemeId: ThemeId) => void;
}

export function useAppTheme(options?: UseAppThemeOptions): UseAppThemeResult {
  const activeThemeId = options?.themeId ?? defaultThemeId;

  const theme = useMemo(() => getThemeById(activeThemeId), [activeThemeId]);

  const setThemeId = (_nextThemeId: ThemeId) => {
    // Placeholder for future state/context-backed theme switching.
  };

  return {
    themeId: activeThemeId,
    theme,
    mode: theme.mode,
    setThemeId,
  };
}
