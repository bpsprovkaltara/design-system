import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettierConfig from 'eslint-config-prettier'
import vitest from '@vitest/eslint-plugin'
import comments from '@eslint-community/eslint-plugin-eslint-comments'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'jsx-a11y/no-autofocus': 'off',
      'no-undef': 'off',
      'jsx-a11y/heading-has-content': 'off',
      'jsx-a11y/anchor-has-content': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react/no-unknown-property': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
    },
    settings: {
      react: { version: '18.3.1' },
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: { console: 'readonly' },
    },
  },
  {
    // Aturan test workspace (TESTING.md §5b): error, bukan warning.
    files: ['src/**/*.{test,spec}.{ts,tsx}'],
    plugins: { vitest, '@eslint-community/eslint-comments': comments },
    rules: {
      'vitest/expect-expect': 'error',
      'vitest/no-focused-tests': 'error',
      'vitest/no-disabled-tests': 'error',
      'vitest/no-conditional-expect': 'error',
      // Vitest menerima pesan kegagalan sebagai argumen kedua expect().
      'vitest/valid-expect': ['error', { maxArgs: 2 }],
      'vitest/no-identical-title': 'error',
      // Setiap eslint-disable di test wajib menyebut alasannya (dan issue bila skip).
      '@eslint-community/eslint-comments/require-description': 'error',
    },
  },
  prettierConfig,
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '*.config.*'],
  },
]
