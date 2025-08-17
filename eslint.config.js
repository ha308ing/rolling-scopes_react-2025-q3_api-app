import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/typescript', 'prettier', 'plugin:@next/next/recommended'],
  }),
];

export default eslintConfig;
