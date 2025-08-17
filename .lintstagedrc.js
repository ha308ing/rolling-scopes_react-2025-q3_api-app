import { relative } from 'node:path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => relative(process.cwd(), f))
    .join(' --file ')}`;

const prettierCheck = (filenames) =>
  `prettier --check -u ${filenames.map((f) => relative(process.cwd(), f)).join(' ')}`;

export default {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*': [prettierCheck],
};
