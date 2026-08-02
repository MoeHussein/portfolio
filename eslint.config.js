import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', '.astro/**', 'node_modules/**', 'docs/**', 'tmp/**'] },
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
);
