import _import from "eslint-plugin-import";
import filenames from "eslint-plugin-filenames";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import importNewlines from "eslint-plugin-import-newlines";
import importQuotes from "eslint-plugin-import-quotes";
import noInlineStyles from "eslint-plugin-no-inline-styles";
import react from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";

export default [
    {
        "ignores": [
            "**/*.css",
            "**/node_modules",
            "**/index.html",
            "**/vite-env.d.ts",
            "**/main.css",
            "**/tsconfig.json",
            "**/tsconfig.node.json",
            "**/vite.config.ts",
            "eslint.config.mjs",
        ],
    }, 
    {
        "plugins": {
            "@typescript-eslint": typescriptEslint,
            filenames,
            "import": fixupPluginRules(_import),
            "import-newlines": importNewlines,
            "import-quotes": importQuotes,
            "no-inline-styles": noInlineStyles,
            react,
        },

        "languageOptions": {
            "globals": {
                ...globals.browser,
            },

            "parser": tsParser,
        },

        "settings": {
            "react": {
                "version": "detect",
            },
        },

        "rules": {
            "camelcase": "error",
            "eol-last": ["error", "always"],
            "function-call-argument-newline": ["error", "consistent"],
            "indent": ["error", 4],
            "jsx-quotes": ["error", "prefer-double"],

            "key-spacing": ["error", {
                "beforeColon": false,
            }],

            "keyword-spacing": ["error", {
                "after": true,
                "before": true,
            }],

            "no-duplicate-imports": "error",
            "no-empty-pattern": "error",
            "no-template-curly-in-string": "error",
            "no-unexpected-multiline": "error",
            "no-unreachable": "error",

            "prefer-destructuring": ["error", {
                "array": false,
                "object": true,
            }],

            "quote-props": ["error", "always"],
            "semi": ["error", "always"],
            "sort-imports": "error",
            "sort-keys": "error",

            "@typescript-eslint/naming-convention": ["error", {
                "selector": ["interface"],
                "format": ["PascalCase"],
            }],

            // "@typescript-eslint/member-delimiter-style": ["error", {
            //     multiline: {
            //         delimiter: "semi",
            //         requireLast: true,
            //     },

            //     singleline: {
            //         delimiter: "semi",
            //         requireLast: true,
            //     },

            //     multilineDetection: "brackets",
            // }],

            "import/no-default-export": "error",

            "import-newlines/enforce": ["error", {
                "forceSingleLine": true,
                "items": 2,
                "max-len": 101,
                "semi": true,
            }],

            "import-quotes/import-quotes": ["error", "double"],
            "no-inline-styles/no-inline-styles": "error",
            "react/jsx-boolean-value": "error",

            "react/jsx-curly-brace-presence": ["error", {
                "children": "never",
                "props": "never",
            }],

            "react/jsx-fragments": "error",
            "react/no-array-index-key": "error",
        },
    }
];
