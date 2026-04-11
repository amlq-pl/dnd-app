// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ["dist/*"],
    },
    {
        rules: {
            // ── JSX props must be sorted alphabetically ───────────────
            "react/jsx-sort-props": [
                "warn",
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    reservedFirst: true,
                    ignoreCase: true,
                },
            ],
        },
    },
]);
