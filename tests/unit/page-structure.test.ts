import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

const routeFiles = [
  ['en', 'src/pages/index.astro'],
  ['ar', 'src/pages/ar/index.astro'],
  ['tr', 'src/pages/tr/index.astro'],
] as const;

describe('portfolio page structure', () => {
  it.each(routeFiles)('defines the %s static locale route', (locale, relativePath) => {
    const path = join(root, relativePath);

    expect(existsSync(path)).toBe(true);
    if (!existsSync(path)) return;
    const source = readFileSync(path, 'utf8');
    expect(source).toContain('PortfolioPage');
    expect(source).toContain(`locale="${locale}"`);
  });

  it('contains every approved single-page section in the shared page', () => {
    const path = join(root, 'src/components/PortfolioPage.astro');
    const source = existsSync(path) ? readFileSync(path, 'utf8') : '';

    for (const id of ['about', 'research', 'projects', 'experience', 'skills', 'contact']) {
      expect(source).toContain(`id="${id}"`);
    }
    expect(source).toContain('<main');
    expect(source).toContain('<footer');
    expect(source).not.toMatch(/lorem|placeholder|coming soon/i);
  });
});
