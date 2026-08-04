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
    expect(source).not.toContain('class="brand"');
    expect(source).not.toContain('brand-monogram');
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
    expect(source).toContain('class="verse-section"');
    expect(source).toContain('class="verse-quote"');
    expect(source).not.toContain('class="hero-verse-stage"');
    expect(source).toContain('<GhostCursor');
    expect(source).toMatch(/<section class="hero" id="top">\s*<GhostCursor/);
    const heroStart = source.indexOf('<section class="hero"');
    const heroEnd = source.indexOf('</section>', heroStart);
    expect(source.indexOf('class="verse-section"')).toBeGreaterThan(heroEnd);
    expect(source).not.toContain('HeroAtmosphere');
    expect(source).not.toContain('ProfileAurora');
    expect(source).toContain('وَتَوَكَّلْ');
    expect(source).toContain('Surah Al-Ahzab · 33:3');
    expect(source).toContain('class="contact-calligraphy"');
    expect(existsSync(join(root, 'public/alhamdulillah.svg'))).toBe(true);
    expect(source).not.toContain('ui.contactTitle');
    expect(source).not.toContain('ui.copyright');
    expect(source).not.toMatch(/lorem|placeholder|coming soon/i);
  });

  it('keeps one fixed ambient hero effect without pointer interaction', () => {
    const componentPath = join(root, 'src/components/react-bits/GhostCursor.tsx');
    const component = existsSync(componentPath) ? readFileSync(componentPath, 'utf8') : '';
    const page = readFileSync(join(root, 'src/components/PortfolioPage.astro'), 'utf8');
    const styles = readFileSync(join(root, 'src/styles/global.css'), 'utf8');

    expect(component).toContain('aria-hidden="true"');
    expect(component).toContain("matchMedia('(prefers-reduced-motion: reduce)')");
    expect(page).toContain('client:load');
    expect(page).toContain('interactive={false}');
    expect(page).toContain('positionX={0.71}');
    expect(page).toContain('positionY={0.5}');
    expect(page).toContain('color="#06B6D4"');
    expect(page).toContain('secondaryColor="#ff9d45"');
    expect(page).toContain('colorHoldSeconds={3}');
    expect(page).toContain('hiddenInLightMode={true}');
    expect(page).toContain('maxDevicePixelRatio={0.75}');
    expect(page).toContain('targetPixels={600000}');
    expect(page).toContain('targetFrameRate={24}');
    expect(component).toContain('renderer.forceContextLoss()');
    expect(component).toContain("powerPreference: 'low-power'");
    expect(component).toContain('const maxTrail = interactive ? requestedTrailLength : 1');
    expect(styles).toMatch(/\.ghost-cursor\s*\{[\s\S]*?position:\s*absolute/);
    expect(styles).toMatch(/\.ghost-cursor\s*\{[\s\S]*?pointer-events:\s*none/);
    expect(styles).toMatch(
      /:root\[data-theme='light'\] \.hero-ghost-cursor\s*\{[\s\S]*?display:\s*none/,
    );
    expect(existsSync(join(root, 'src/components/PlasmaBackdrop.astro'))).toBe(false);
    expect(existsSync(join(root, 'src/components/HeroAtmosphere.astro'))).toBe(false);
    expect(existsSync(join(root, 'src/components/ProfileAurora.astro'))).toBe(false);
  });

  it('self-hosts a dedicated Quranic typeface for the Arabic verse', () => {
    const layout = readFileSync(join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
    const page = readFileSync(join(root, 'src/components/PortfolioPage.astro'), 'utf8');
    const styles = readFileSync(join(root, 'src/styles/global.css'), 'utf8');

    expect(layout).toContain('@fontsource/amiri-quran/arabic-400.css');
    expect(styles).toMatch(/\.verse-arabic\s*\{[\s\S]*?font-family:\s*'Amiri Quran'/);
    expect(page).not.toContain('ۚ');
    expect(styles).not.toContain('.hero-verse-pause');
  });

  it('keeps the complete page on one theme-token system', () => {
    const path = join(root, 'src/styles/global.css');
    const source = existsSync(path) ? readFileSync(path, 'utf8') : '';

    expect(source).not.toContain('#030405');
    expect(source).toMatch(/\.hero\s*\{[\s\S]*?background:\s*var\(--page-layer\)/);
    expect(source).toMatch(/\.work-section\s*\{[\s\S]*?background:\s*var\(--section-layer\)/);
    expect(source).toMatch(/\.project-card\s*\{[\s\S]*?background:\s*var\(--surface\)/);
    expect(source).toMatch(/\.case-study-dialog\s*\{[\s\S]*?background:\s*var\(--surface-raised\)/);
    expect(source).toMatch(
      /:root\[data-theme='light'\] \.hero-actions a:first-child,[\s\S]*?color:\s*#fff/,
    );
    expect(source).toContain('animation: calligraphy-shimmer');
    expect(source).toContain('@keyframes calligraphy-shimmer');
    expect(source).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('retains visible mobile navigation and stacks project cards without scrollbars', () => {
    const path = join(root, 'src/styles/global.css');
    const source = existsSync(path) ? readFileSync(path, 'utf8') : '';

    expect(source).toMatch(
      /@media \(max-width: 640px\)[\s\S]*?\.desktop-nav\s*\{[\s\S]*?display:\s*grid/,
    );
    expect(source).toMatch(
      /@media \(max-width: 900px\)[\s\S]*?\.project-cards\s*\{[\s\S]*?overflow-x:\s*auto/,
    );
    expect(source).toMatch(
      /@media \(max-width: 640px\)[\s\S]*?\.project-cards\s*\{[\s\S]*?display:\s*grid[\s\S]*?overflow:\s*visible/,
    );
    expect(source).toContain('scrollbar-width: none');
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
