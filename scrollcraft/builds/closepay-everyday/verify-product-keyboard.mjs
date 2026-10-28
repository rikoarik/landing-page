import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const page = await context.newPage();
await page.addInitScript(() => {
  Element.prototype.requestPointerLock = () => Promise.reject(new Error('disabled for QA'));
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
});
const checks = [];
try {
  await page.goto('http://localhost:4501', { waitUntil: 'networkidle' });
  for (const selector of ['.proof-index button', '.member-path button', '.academic-index button', '.admission-tabs button']) {
    const first = page.locator(selector).nth(1);
    await first.focus(); await page.keyboard.press('Enter');
    assert.equal(await first.getAttribute('aria-pressed'), 'true');
    assert.notEqual(await first.evaluate(e => getComputedStyle(e).outlineStyle), 'none');
    const next = page.locator(selector).nth(2);
    await next.focus(); await page.keyboard.press('Space');
    assert.equal(await next.getAttribute('aria-pressed'), 'true');
    checks.push(`${selector}: Enter, Space, visible focus`);
  }
  const opener = page.locator('.academic-plate').getByRole('button', { name: /^Perbesar/ });
  await opener.focus(); await page.keyboard.press('Enter');
  await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(300);
  assert(await page.locator('html').evaluate(e => e.classList.contains('lenis-stopped')));
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    // Chrome may move focus to its own browser chrome; page controls must stay inert.
    assert(await page.evaluate(() => document.activeElement === document.body || !!document.activeElement.closest('dialog')));
  }
  await page.locator('.brand').focus();
  assert(!(await page.locator('.brand').evaluate(e => e === document.activeElement)));
  await page.keyboard.press('Escape'); await page.waitForTimeout(100);
  assert(await opener.evaluate(e => e === document.activeElement));
  assert(!(await page.locator('html').evaluate(e => e.classList.contains('lenis-stopped'))));
  checks.push('Native modal blocks focus on background controls; Escape restores opener; motion preference change preserves scroll lock');
  for (const url of ['https://closepay.id/privacy-policy', 'https://closepay.id/term-condition']) {
    const response = await page.request.get(url); assert(response.ok()); checks.push(`${url}: HTTP ${response.status()}`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.academic-index button').nth(2).click();
  await page.evaluate(() => window.scrollTo(0, document.querySelector('.academic-surface').getBoundingClientRect().top + scrollY - 100));
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'scrollcraft/builds/closepay-everyday/lab/product-frames/mobile-siakad-2.png' });
  assert(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)));
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  assert.equal(axe.violations.length, 0);
  checks.push('Final mobile billing crop: screenshot, no overflow, zero Axe violations');
  await fs.writeFile('scrollcraft/builds/closepay-everyday/lab/product-final/keyboard.json', JSON.stringify({ checks }, null, 2));
  console.log(checks);
} finally { await browser.close(); }
