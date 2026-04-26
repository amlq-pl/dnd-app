import type { AppTheme } from "./index";
import COLORS from "@/constants/colors";

export const modernMythicTheme: AppTheme = {
    id: "modern-mythic",
    name: "Modern Mythic",
    mode: "dark",

    // ── Colors ────────────────────────────────────────────────────────────
    colors: {
        palette: {
            primary: COLORS.violet,
            secondary: COLORS.gold,
            tertiary: COLORS.lavender,
        },

        surface: {
            background: COLORS.black,
            surface: COLORS.darkCharcoal,
            surfaceElevated: COLORS.darkSlate,
            overlay: COLORS.overlayBlack,
        },

        text: {
            heading: COLORS.white,
            body: COLORS.lightGray,
            muted: COLORS.mutedGray,
            onPrimary: COLORS.white,
            onSecondary: COLORS.black,
            onTertiary: COLORS.black,
        },

        border: {
            default: COLORS.lavenderSubtle,
            subtle: COLORS.lavenderFaint,
            strong: COLORS.lavenderStrong,
        },

        semantic: {
            success: COLORS.green,
            warning: COLORS.yellow,
            error: COLORS.red,
            info: COLORS.blue,
        },
    },

    // ── Typography ────────────────────────────────────────────────────────
    typography: {
        headlineFont: "notoSerif",
        bodyFont: "manrope",
        labelFont: "manrope",
    },

    // ── Spacing scale (dp) ────────────────────────────────────────────────
    spacing: {
        xxs: 2,
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 32,
        xxxl: 48,
    },

    // ── Border-radius ─────────────────────────────────────────────────────
    borderRadius: {
        none: 0,
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        full: 9999,
    },
};
