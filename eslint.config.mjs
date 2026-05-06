import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default [
  {
    ignores: [
      "**/.nuxt/**",
      "**/.output/**",
      "**/dist/**",
      "**/coverage/**",
      "**/playwright-report/**",
      "**/test-results/**",
      "**/node_modules/**"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
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
      "no-undef": "off",
      "no-console": ["error", { allow: ["warn", "error"] }]
    }
  },
  {
    files: ["apps/showroom/app/**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"]
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "vue/max-attributes-per-line": "off",
      "vue/no-v-html": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multi-word-component-names": "off"
    }
  }
];
