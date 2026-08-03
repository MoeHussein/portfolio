import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from '@playwright/test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const downloads = join(root, 'public', 'downloads');
const port = 4178;
const origin = `http://127.0.0.1:${port}`;

await mkdir(downloads, { recursive: true });

const server = spawn(
  process.execPath,
  [
    join(root, 'node_modules', 'astro', 'bin', 'astro.mjs'),
    'preview',
    '--host',
    '127.0.0.1',
    '--port',
    `${port}`,
  ],
  { cwd: root, stdio: 'ignore' },
);

for (let attempt = 0; attempt < 50; attempt += 1) {
  try {
    const response = await fetch(`${origin}/cv/en/`);
    if (response.ok) break;
  } catch {
    // The preview server is still starting.
  }
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (attempt === 49) throw new Error('Timed out waiting for the Astro preview server.');
}

let browser;

try {
  browser = await chromium.launch({ channel: 'msedge', headless: true });

  for (const locale of ['en', 'tr']) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 960 } });

    await page.goto(`${origin}/cv/${locale}/`, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: join(downloads, `mohammad-hussein-cv-${locale}.pdf`),
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      tagged: true,
      outline: true,
    });
    await page.close();
  }
} finally {
  await browser?.close();
  server.kill();
}
