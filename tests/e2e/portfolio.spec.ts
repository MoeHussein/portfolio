import { expect, test } from '@playwright/test';

test('keeps the professional hero focused and moves the verse into its own section', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.locator('.site-header .brand')).toHaveCount(0);
  await expect(page.locator('.hero h1')).toHaveText('Mohammad M. T.R. Hussein');
  await expect(page.locator('.hero-role')).toHaveText(
    'Biomedical Engineer in Computational Imaging',
  );
  const heroEffect = page.locator('.hero .ghost-cursor');
  await expect(heroEffect).toBeVisible();
  await expect(heroEffect).toHaveAttribute('aria-hidden', 'true');
  await expect(heroEffect).toHaveAttribute('data-primary-color', '#06B6D4');
  await expect(heroEffect).toHaveAttribute('data-secondary-color', '#ff9d45');
  await expect(heroEffect).toHaveAttribute('data-color-cycle-seconds', '8');
  await expect(heroEffect).toHaveAttribute('data-color-hold-seconds', '3');
  await expect(heroEffect).toHaveAttribute('data-interactive', 'false');
  await expect(heroEffect).toHaveAttribute('data-position-x', '0.71');
  await expect(heroEffect).toHaveAttribute('data-position-y', '0.5');
  await expect(heroEffect).toHaveAttribute('data-target-frame-rate', '24');
  await expect(heroEffect.locator('canvas')).toHaveCSS('pointer-events', 'none');
  const renderSurface = await heroEffect.locator('canvas').evaluate((element) => {
    const canvas = element as HTMLCanvasElement;
    return { width: canvas.width, height: canvas.height };
  });
  expect(renderSurface.width * renderSurface.height).toBeLessThanOrEqual(300_000);

  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('.hero .ghost-cursor')).toHaveCount(0);

  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.hero .ghost-cursor canvas')).toBeVisible();

  await page.evaluate(() => localStorage.setItem('portfolio-theme', 'light'));
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('.hero .ghost-cursor')).toHaveCount(0);
  await expect(page.locator('.hero .verse-quote')).toHaveCount(0);
  await expect(page.locator('.verse-section')).toBeVisible();
  await expect(page.locator('.verse-arabic')).toContainText('وَتَوَكَّلْ');

  const sectionOrder = await page.evaluate(() => {
    const hero = document.querySelector('.hero');
    const verse = document.querySelector('.verse-section');
    return hero && verse ? hero.compareDocumentPosition(verse) : 0;
  });
  expect(sectionOrder & 4).toBeTruthy();
});

test('stacks project cards without horizontal overflow on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.project-cards').first()).toBeVisible();

  const layout = await page.evaluate(() => {
    const cards = document.querySelector('.project-cards');
    const styles = cards ? getComputedStyle(cards) : null;
    return {
      display: styles?.display,
      overflowX: styles?.overflowX,
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    };
  });

  expect(layout.display).toBe('grid');
  expect(layout.overflowX).toBe('visible');
  expect(layout.pageWidth).toBeLessThanOrEqual(layout.viewportWidth);
  await expect(page.locator('.project-card').first()).toBeVisible();
});
