export type ThemeMode = "light" | "dark";

export type ThemeId = "modern-mythic";

export interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  neutral: string;
}

export interface ThemeTypography {
  headlineFont: string;
  bodyFont: string;
  labelFont: string;
}

export interface ThemeShape {
  roundedness: number;
}

export interface ThemeSpacing {
  scale: number;
}

export interface AppTheme {
  id: ThemeId;
  name: string;
  mode: ThemeMode;
  colors: ThemeColors;
  typography: ThemeTypography;
  shape: ThemeShape;
  spacing: ThemeSpacing;
}

import { modernMythicTheme } from "./modern-mythic";

export const themes: Record<ThemeId, AppTheme> = {
  [modernMythicTheme.id]: modernMythicTheme,
};

export const defaultThemeId: ThemeId = "modern-mythic";

export function getThemeById(themeId: ThemeId): AppTheme {
  return themes[themeId];
}
