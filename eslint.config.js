// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier");

module.exports = defineConfig([
    expoConfig,
    prettierConfig,
    { ignores: ["dist/*"] },
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
