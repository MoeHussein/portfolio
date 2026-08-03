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
