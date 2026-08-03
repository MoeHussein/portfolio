import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

const routeFiles = [
  ['en', 'src/pages/index.astro'],
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
    expect(source).toContain('class="brand"');
    expect(source).toContain('{content.name}</a>');
    expect(source).toContain("id: 'academic'");
    expect(source).toContain("id: 'personal'");
    expect(source).toContain('project-group--${group.id}');
    expect(source).not.toContain('<h2>{labels.story}</h2>');
    expect(source).toContain('content.about.paragraphs[0]');
    expect(source).not.toContain('content.about.paragraphs[1]');
    expect(source).not.toContain('<h2>{content.about.title}</h2>');
    expect(source).not.toContain('<picture');
    expect(source).not.toContain('data-hero-art');
    expect(source).not.toContain('data-work-art');
    expect(source).toContain('theme-icon--sun');
    expect(source).toContain('theme-icon--moon');
    expect(source).not.toContain('data-theme-label');
    expect(source).toContain('class="hero-verse"');
    expect(source).toContain('<HeroAtmosphere />');
    expect(source).toContain('وَتَوَكَّلْ');
    expect(source).toContain('Surah Al-Ahzab · 33:3');
    expect(source).toContain('class="contact-calligraphy"');
    expect(existsSync(join(root, 'public/alhamdulillah.svg'))).toBe(true);
    expect(source).not.toContain('ui.contactTitle');
    expect(source).not.toContain('ui.copyright');
    expect(source).not.toMatch(/lorem|placeholder|coming soon/i);
  });

  it('keeps the hero atmosphere decorative and free of pointer interaction', () => {
    const path = join(root, 'src/components/HeroAtmosphere.astro');
    const source = existsSync(path) ? readFileSync(path, 'utf8') : '';

    expect(source).toContain('data-side-rays');
    expect(source).toContain('data-soft-aurora');
    expect(source).toContain('aria-hidden="true"');
    expect(source).toContain("matchMedia('(prefers-reduced-motion: reduce)')");
    expect(source).toContain('IntersectionObserver');
    expect(source).not.toMatch(/mouse|pointermove/i);
  });

  it('self-hosts a dedicated Quranic typeface for the Arabic verse', () => {
    const layout = readFileSync(join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
    const page = readFileSync(join(root, 'src/components/PortfolioPage.astro'), 'utf8');
    const styles = readFileSync(join(root, 'src/styles/global.css'), 'utf8');

    expect(layout).toContain('@fontsource/amiri-quran/arabic-400.css');
    expect(styles).toMatch(/\.hero-verse-arabic\s*\{[\s\S]*?font-family:\s*'Amiri Quran'/);
    expect(page).not.toContain('ۚ');
    expect(styles).not.toContain('.hero-verse-pause');
  });

  it('keeps the complete page on one theme-token system', () => {
    const path = join(root, 'src/styles/global.css');
    const source = existsSync(path) ? readFileSync(path, 'utf8') : '';

    expect(source).not.toContain('#030405');
    expect(source).toMatch(/\.hero\s*\{[\s\S]*?background:\s*var\(--page-bg\)/);
    expect(source).toMatch(/\.work-section\s*\{[\s\S]*?background:\s*var\(--section-bg\)/);
    expect(source).toMatch(/\.project-card\s*\{[\s\S]*?background:\s*var\(--surface\)/);
    expect(source).toMatch(/\.case-study-dialog\s*\{[\s\S]*?background:\s*var\(--surface-raised\)/);
    expect(source).toContain('animation: calligraphy-shimmer');
    expect(source).toContain('@keyframes calligraphy-shimmer');
    expect(source).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('retains visible mobile navigation and compact horizontal project rows', () => {
    const path = join(root, 'src/styles/global.css');
    const source = existsSync(path) ? readFileSync(path, 'utf8') : '';

    expect(source).toMatch(
      /@media \(max-width: 640px\)[\s\S]*?\.desktop-nav\s*\{[\s\S]*?display:\s*grid/,
    );
    expect(source).toMatch(
      /@media \(max-width: 900px\)[\s\S]*?\.project-cards\s*\{[\s\S]*?overflow-x:\s*auto/,
    );
  });

  it('renders the CV from one consolidated research role with a visible DOI', () => {
    const path = join(root, 'src/pages/cv/[locale].astro');
    const source = existsSync(path) ? readFileSync(path, 'utf8') : '';

    expect(source).toContain('content.cv.researchExperience');
    expect(source).not.toContain('content.timeline.map');
    expect(source).toContain('href={content.research.doi}');
    expect(source).toContain('doi.org/10.1364/BOE.585564');
  });
});
