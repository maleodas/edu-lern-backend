import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsparser, // Include TypeScript parser
      globals: {
        ...globals.builtin,
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        tsconfigRoot: './',
        project: './tsconfig.json',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      '@typescript-eslint': tseslint,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      'max-lines': [
        'error',
        { max: 600, skipBlankLines: true, skipComments: true },
      ],
      'max-lines-per-function': [
        'error',
        { max: 100, skipBlankLines: true, skipComments: true },
      ],
      'no-debugger': 'error',
      curly: 'error',
      'no-alert': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
      'object-shorthand': ['error', 'always', { avoidQuotes: true }],
      'prefer-template': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
        },
      ],
      'no-unused-expressions': [
        2,
        {
          allowTaggedTemplates: true,
        },
      ],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
    },
  },

  pluginJs.configs.recommended,
  prettierConfig,
];
