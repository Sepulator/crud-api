import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node,

      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
]);
