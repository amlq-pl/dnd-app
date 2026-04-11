import type { AppTheme } from "./index";

export const modernMythicTheme: AppTheme = {
    id: "modern-mythic",
    name: "Modern Mythic",
    mode: "dark",

    // ── Colors ────────────────────────────────────────────────────────────
    colors: {
        palette: {
            primary: "#8B5CF6",
            secondary: "#FFD700",
            tertiary: "#C084FC",
        },

        surface: {
            background: "#121212",
            surface: "#1E1E2E",
            surfaceElevated: "#2A2A3C",
            overlay: "rgba(0, 0, 0, 0.55)",
        },

        text: {
            heading: "#FFFFFF",
            body: "#E0E0E0",
            muted: "#9CA3AF",
            onPrimary: "#FFFFFF",
            onSecondary: "#121212",
            onTertiary: "#121212",
        },

        border: {
            default: "rgba(192, 132, 252, 0.18)",
            subtle: "rgba(192, 132, 252, 0.08)",
            strong: "rgba(192, 132, 252, 0.35)",
        },

        semantic: {
            success: "#22C55E",
            warning: "#FACC15",
            error: "#EF4444",
            info: "#3B82F6",
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
