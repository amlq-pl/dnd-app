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
            tertiary: COLORS.lila,
        },

        surface: {
            background: COLORS.black,
            surface: COLORS.darkNavy,
            surfaceElevated: COLORS.darkSlate,
            overlay: COLORS.overlayBlack,
            note: COLORS.uglyGrey,
        },

        text: {
            heading: COLORS.white,
            body: COLORS.lightGray,
            muted: COLORS.mutedGray,
            lively: COLORS.lightLila,
            onPrimary: COLORS.white,
            onSecondary: COLORS.black,
            onTertiary: COLORS.black,
            note: COLORS.lightPurple,
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

        card: {
            background: COLORS.almostBlack,
            header: COLORS.subduedLila,
            label: COLORS.white,
            note: COLORS.subduedLila,
            glow: COLORS.lila,
            softGlow: COLORS.subduedLila
        },
        buttonPrimary: {
            background: COLORS.lessDirtyPurple,
            text: COLORS.lightLila,
            border: COLORS.dirtyPurple
        },
        buttonSecondary: {
            background: COLORS.milky,
            text: COLORS.almostBlack,
            border: COLORS.dirtyYellow

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
