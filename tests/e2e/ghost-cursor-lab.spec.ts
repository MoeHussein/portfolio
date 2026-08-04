import { expect, test } from '@playwright/test';

test('renders the fixed ambient Ghost Cursor without pointer interaction', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  await page.goto('/lab/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2_000);
  expect(consoleErrors, consoleErrors.join('\n')).toEqual([]);

  const stage = page.locator('.ghost-lab');
  const canvas = page.locator('.ghost-cursor canvas');

  await expect(stage).toBeVisible();
  await expect(canvas).toBeVisible();
  await expect(canvas).toHaveCSS('pointer-events', 'none');

  const ghostCursor = page.locator('.ghost-cursor');
  await expect(ghostCursor).toHaveAttribute('data-primary-color', '#06B6D4');
  await expect(ghostCursor).toHaveAttribute('data-secondary-color', '#ff9d45');
  await expect(ghostCursor).toHaveAttribute('data-color-cycle-seconds', '8');
  await expect(ghostCursor).toHaveAttribute('data-color-hold-seconds', '3');
  await expect(ghostCursor).toHaveAttribute('data-interactive', 'false');
  await expect(ghostCursor).toHaveAttribute('data-position-x', '0.68');
  await expect(ghostCursor).toHaveAttribute('data-position-y', '0.5');
  await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  expect(consoleErrors).toEqual([]);
});
