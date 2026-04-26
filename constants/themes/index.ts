import { modernMythicTheme } from "./modern-mythic";

export type ThemeMode = "light" | "dark";

export type ThemeId = "modern-mythic";

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

/** Core brand / accent palette. */
export interface ThemePaletteColors {
    primary: string;
    secondary: string;
    tertiary: string;
}

/** Background & surface layers (card, sheet, overlay …). */
export interface ThemeSurfaceColors {
    background: string;
    surface: string;
    surfaceElevated: string;
    overlay: string;
}

/** Text & icon colors. */
export interface ThemeTextColors {
    heading: string;
    body: string;
    muted: string;
    onPrimary: string;
    onSecondary: string;
    onTertiary: string;
}

/** Borders, dividers, outlines. */
export interface ThemeBorderColors {
    default: string;
    subtle: string;
    strong: string;
}

/** Semantic / feedback colours. */
export interface ThemeSemanticColors {
    success: string;
    warning: string;
    error: string;
    info: string;
}

export interface ThemeColors {
    palette: ThemePaletteColors;
    surface: ThemeSurfaceColors;
    text: ThemeTextColors;
    border: ThemeBorderColors;
    semantic: ThemeSemanticColors;
}

/** Union of every colour key path that components might reference. */
export type ThemeColorKey =
    | `palette.${keyof ThemePaletteColors}`
    | `surface.${keyof ThemeSurfaceColors}`
    | `text.${keyof ThemeTextColors}`
    | `border.${keyof ThemeBorderColors}`
    | `semantic.${keyof ThemeSemanticColors}`;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export interface ThemeTypography {
    headlineFont: string;
    bodyFont: string;
    labelFont: string;
}

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

/**
 * Predefined spacing scale (in dp/px).
 * Use these everywhere instead of magic numbers so the whole app stays
 * consistent and is easy to re-skin later.
 */
export interface ThemeSpacing {
    /** 2 */ xxs: number;
    /** 4 */ xs: number;
    /** 8 */ sm: number;
    /** 12 */ md: number;
    /** 16 */ lg: number;
    /** 24 */ xl: number;
    /** 32 */ xxl: number;
    /** 48 */ xxxl: number;
}

export type ThemeSpacingKey = keyof ThemeSpacing;

// ---------------------------------------------------------------------------
// Border-radius
// ---------------------------------------------------------------------------

export interface ThemeBorderRadius {
    /** 0 */ none: number;
    /** 4 */ xs: number;
    /** 8 */ sm: number;
    /** 12 */ md: number;
    /** 16 */ lg: number;
    /** 24 */ xl: number;
    /** 9999 */ full: number;
}

export type ThemeBorderRadiusKey = keyof ThemeBorderRadius;

// ---------------------------------------------------------------------------
// App Theme (root)
// ---------------------------------------------------------------------------

export interface AppTheme {
    id: ThemeId;
    name: string;
    mode: ThemeMode;
    colors: ThemeColors;
    typography: ThemeTypography;
    spacing: ThemeSpacing;
    borderRadius: ThemeBorderRadius;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resolve a colour value. If the string looks like a theme key (contains a dot,
 * e.g. `"palette.primary"`), it is resolved from the theme. Otherwise the raw
 * colour string is returned as-is (e.g. `"#FF0000"`, `"red"`, `"rgba(…)"`).
 */
export function resolveColor(colors: ThemeColors, key: string): string {
    if (!key.includes(".")) return key;
    const [group, token] = key.split(".") as [keyof ThemeColors, string];
    return (colors[group] as unknown as Record<string, string>)[token];
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const themes: Record<ThemeId, AppTheme> = {
    [modernMythicTheme.id]: modernMythicTheme,
};

export const defaultThemeId: ThemeId = "modern-mythic";

export function getThemeById(themeId: ThemeId): AppTheme {
    return themes[themeId];
}
