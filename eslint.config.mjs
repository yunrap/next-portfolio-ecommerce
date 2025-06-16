// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends(
  'next/core-web-vitals',
  'next/typescript',
  'plugin:prettier/recommended',
), {
  files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
  languageOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: {
    tailwindcss: 'eslint-plugin-tailwindcss',
  },
  rules: {
    'prettier/prettier': 'error',
    'tailwindcss/classnames-order': 'warn',
  },
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
