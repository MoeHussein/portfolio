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

  it('contains the compact approved single-page sections in the shared page', () => {
    const path = join(root, 'src/components/PortfolioPage.astro');
    const source = existsSync(path) ? readFileSync(path, 'utf8') : '';

    for (const id of ['top', 'work', 'profile', 'contact']) {
      expect(source).toContain(`id="${id}"`);
    }
    expect(source).toContain('<main');
    expect(source).toContain('<footer');
    expect(source).not.toContain('OpticField');
    expect(source).not.toContain('brand-mark');
    expect(source).not.toContain('class="brand"');
    expect(source).toContain("id: 'academic'");
    expect(source).toContain("id: 'personal'");
    expect(source).toContain('project-group--${group.id}');
    expect(source).toContain('<h2>{labels.story}</h2>');
    expect(source).not.toContain('<h2>{content.about.title}</h2>');
    expect(source).not.toMatch(/lorem|placeholder|coming soon/i);
  });
});
