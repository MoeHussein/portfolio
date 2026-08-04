import { expect, test } from '@playwright/test';

test('renders the Ghost Cursor and keeps controls interactive beneath it', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  await page.goto('/lab/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2_000);
  expect(consoleErrors, consoleErrors.join('\n')).toEqual([]);

  const stage = page.locator('.ghost-lab');
  const canvas = page.locator('.ghost-cursor canvas');
  const interactionButton = page.getByRole('button', { name: 'Test interaction' });

  await expect(stage).toBeVisible();
  await expect(canvas).toBeVisible();
  await expect(canvas).toHaveCSS('pointer-events', 'none');

  const stageBox = await stage.boundingBox();
  expect(stageBox).not.toBeNull();
  if (stageBox) {
    await page.mouse.move(stageBox.x + stageBox.width * 0.25, stageBox.y + stageBox.height * 0.5);
    await page.mouse.move(stageBox.x + stageBox.width * 0.75, stageBox.y + stageBox.height * 0.35, {
      steps: 8,
    });
  }

  await interactionButton.click();
  await expect(interactionButton).toHaveText('Test interaction · 1');
  expect(consoleErrors).toEqual([]);
});
