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
    note: string;
}


/** Text & icon colors. */
export interface ThemeTextColors {
    heading: string;
    body: string;
    muted: string;
    lively: string;
    onPrimary: string;
    onSecondary: string;
    onTertiary: string;
    note: string
}

/** Borders, dividers, outlines. */
export interface ThemeBorderColors {
    default: string;
    subtle: string;
    strong: string;
}

export interface ThemeButtonColors {
    background: string;
    text: string;
    border: string;
}

export interface ThemeCardColors {
    background: string,
    header: string,
    label: string,
    note: string,
    glow: string,
    softGlow: string,
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
    card: ThemeCardColors;
    buttonPrimary: ThemeButtonColors;
    buttonSecondary: ThemeButtonColors;
}



/** Union of every colour key path that components might reference. */
export type ThemeColorKey =
    | `palette.${keyof ThemePaletteColors}`
    | `surface.${keyof ThemeSurfaceColors}`
    | `text.${keyof ThemeTextColors}`
    | `border.${keyof ThemeBorderColors}`
    | `semantic.${keyof ThemeSemanticColors}`
    | `card.${keyof ThemeCardColors}`
    | `buttonPrimary.${keyof ThemeButtonColors}`
    | `buttonSecondary.${keyof ThemeButtonColors}`;

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
 * Resolve a dot-path colour key like `"palette.primary"` to its actual value.
 */
export function resolveColor(colors: ThemeColors, key: ThemeColorKey): string {
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
