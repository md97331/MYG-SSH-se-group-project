import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        jest: "readonly", // Add Jest globals
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Enable JSX
        },
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+ JSX runtime doesn't require React in scope
      "no-unused-vars": ["warn"], // Warn on unused vars
      "no-undef": "error", // Error on undefined variables
      "no-empty": "warn", // Warn for empty blocks
      "no-useless-escape": "warn", // Warn for unnecessary escape characters
      "no-prototype-builtins": "warn", // Warn about accessing Object.prototype methods
    },
  },
];
