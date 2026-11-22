import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/.output/**",
      "**/dist/**",
      "**/coverage/**",
      "**/test-results/**",
      "**/node_modules/**"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.node
      }
    },
    rules: {
      "no-undef": "off"
    }
  }
];
