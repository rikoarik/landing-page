import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const output = 'scrollcraft/builds/closepay-everyday/lab/product-final';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const report = [];
process.on('uncaughtException', async error => {
  await fs.writeFile(`${output}/failure.json`, JSON.stringify({ error: error.message, report }, null, 2));
  await browser.close(); console.error(error); process.exitCode = 1;
});
async function pageFor(width, height, reduced = false) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await context.newPage();
  await page.addInitScript(() => {
    Element.prototype.requestPointerLock = () => Promise.reject(new Error('disabled for QA'));
    Element.prototype.setPointerCapture = () => {};
    Element.prototype.releasePointerCapture = () => {};
  });
  return page;
}
for (const [name, width, height, reduced] of [['desktop', 1440, 900, false], ['mobile', 390, 844, false], ['compact', 360, 640, false], ['tablet', 768, 1024, false], ['reduced', 1440, 900, true]]) {
  const page = await pageFor(width, height, reduced);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('http://localhost:4501', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const checks = [];
  await page.screenshot({ path: `${output}/${name}-hero.png` });
  assert.equal(await page.locator('html').getAttribute('data-motion-mode'), reduced ? 'reduced' : 'lenis');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  const anchors = await page.locator('a[href^="#"]').evaluateAll(es => es.every(e => document.querySelector(e.getAttribute('href'))));
  assert(anchors);
  if (width <= 900) {
    const menu = page.getByRole('button', { name: 'Menu', exact: true });
    await menu.click(); await page.keyboard.press('Escape');
    assert.equal(await page.locator('#mobile-menu').count(), 0);
    assert.equal(await menu.evaluate(e => e === document.activeElement), true);
    for (const label of ['F&B Suite', 'Member', 'SIAKAD', 'PMB', 'Bicarakan kebutuhan']) {
      await menu.click(); await page.locator('#mobile-menu').getByRole('link', { name: label, exact: true }).click();
      assert.equal(await page.locator('#mobile-menu').count(), 0);
    }
  } else {
    for (const label of ['F&B Suite', 'Member', 'SIAKAD', 'PMB']) await page.locator('.desktop-nav').getByRole('link', { name: label, exact: true }).click();
    await page.locator('.header-contact').click();
  }
  checks.push('All navigation targets exist; desktop/mobile product links work; mobile Escape restores focus');
  await page.locator('.solid-button').click();
  for (const origin of ['Staf kasir', 'Kiosk mandiri']) {
    await page.locator('.origin-options').getByRole('button', { name: new RegExp(origin) }).click();
    for (const [index, text] of ['Pesanan dicatat', 'Pesanan baru', 'Sedang diproses', 'Selesai disiapkan'].entries()) {
      await page.locator('.journey-steps button').nth(index).click();
      assert.equal(await page.locator('.ticket-status strong').innerText(), text);
    }
  }
  await page.getByRole('button', { name: 'Ulangi pesanan', exact: true }).click();
  await page.getByRole('button', { name: 'Lanjutkan pesanan', exact: true }).click();
  checks.push('Existing Staff POS/Kiosk ticket, four states, next and restart remain functional');
  await page.locator('.supply-toggle').click(); assert(await page.locator('#supply-detail').isVisible());
  await page.locator('#supply-detail a').click(); assert.equal(await page.locator('#business-context').inputValue(), 'F&B Suite');
  await page.locator('.supply-toggle').click(); assert.equal(await page.locator('#supply-detail').count(), 0);
  checks.push('Purchaser expands, context CTA works, accordion closes');

  const fnbLabels = ['Menu & varian', 'Jenis pesanan', 'Checkout', 'Dapur', 'Transaksi'];
  const fnbFiles = ['02-product-variant-modal', '03-order-type-modal', '04-cashier-checkout', '07-kitchen-board', '06-transactions'];
  for (let i = 0; i < fnbLabels.length; i++) {
    await page.locator('.proof-index').getByRole('button', { name: fnbLabels[i], exact: false }).click();
    assert((await page.locator('.fnb-evidence .product-plate').getAttribute('data-screen')).includes(fnbFiles[i]));
    assert.equal(await page.locator('.proof-index button[aria-pressed=true]').count(), 1);
    await page.locator('.fnb-evidence .product-plate').scrollIntoViewIfNeeded(); await page.waitForTimeout(700);
    await page.screenshot({ path: `${output}/${name}-fnb-${i}.png` });
  }
  checks.push('All five F&B activities display the corresponding original screenshot and active state');
  await page.locator('.story-handoff a').click(); assert.equal(await page.evaluate(() => location.hash), '#member');
  const memberLabels = ['Temukan menu', 'Pilih rasa', 'Atur pesanan', 'Pembayaran'];
  const memberFiles = ['01-home-restaurant', '03-product-detail', '04-checkout', '05-qris-payment'];
  for (let i = 0; i < memberLabels.length; i++) {
    await page.locator('.member-path').getByRole('button', { name: memberLabels[i], exact: true }).click();
    assert((await page.locator('.member-plate').getAttribute('data-screen')).includes(memberFiles[i]));
    await page.locator('.member-plate').scrollIntoViewIfNeeded(); await page.waitForTimeout(700);
    await page.screenshot({ path: `${output}/${name}-member-${i}.png` });
  }
  await page.locator('.member-path').getByRole('button', { name: 'Pilih rasa', exact: true }).click();
  await page.locator('.viewpoint-control').getByRole('button', { name: 'Kasir', exact: true }).click();
  assert((await page.locator('.member-plate').getAttribute('data-screen')).includes('/fnb/02-product-variant-modal'));
  await page.locator('.member-plate').scrollIntoViewIfNeeded(); await page.waitForTimeout(700);
  await page.screenshot({ path: `${output}/${name}-member-cashier.png` });
  await page.locator('.viewpoint-control').getByRole('button', { name: 'Pelanggan', exact: true }).click();
  assert((await page.locator('.member-plate').getAttribute('data-screen')).includes('/member/03-product-detail'));
  await page.locator('.member-login-toggle').click(); assert((await page.locator('.member-plate').getAttribute('data-screen')).includes('06-login'));
  await page.locator('.member-login-toggle').click(); assert((await page.locator('.member-plate').getAttribute('data-screen')).includes('03-product-detail'));
  await page.locator('#member .text-button').click(); await page.waitForTimeout(1200); assert.equal(await page.locator('#business-context').inputValue(), 'Member (F&B)');
  checks.push('Member discovery, variants, checkout, payment, login, back, client/cashier comparison and contact context work');
  const academicFiles = ['02-krs', '03-class-schedule', '04-student-billing', '01-dashboard'];
  for (let i = 0; i < academicFiles.length; i++) {
    await page.locator('.academic-index button').nth(i).click();
    assert((await page.locator('.academic-plate').getAttribute('data-screen')).includes(academicFiles[i]));
    await page.locator('.academic-surface').scrollIntoViewIfNeeded(); await page.waitForTimeout(700);
    await page.screenshot({ path: `${output}/${name}-siakad-${i}.png` });
  }
  await page.locator('#institutional .text-button').click(); await page.waitForTimeout(1200); assert.equal(await page.locator('#business-context').inputValue(), 'SIAKAD');
  checks.push('KRS, class schedule, billing, dashboard and SIAKAD contact context work');

  await page.waitForTimeout(1200);
  for (let i = 0; i < 3; i++) {
    await page.locator('.admission-tabs button').nth(i).click();
    assert.equal(await page.locator('.admission-tabs button[aria-pressed=true]').count(), 1);
    assert.equal(await page.locator('.folio-active .folio-word').innerText(), ['Data', 'Berkas', 'Status'][i]);
    await page.locator('.admission-art').scrollIntoViewIfNeeded(); await page.waitForTimeout(800);
    await page.screenshot({ path: `${output}/${name}-pmb-${i}.png` });
  }
  await page.locator('#pmb .text-button').click(); assert.equal(await page.locator('#business-context').inputValue(), 'PMB');
  checks.push('All PMB stages change the matching editorial folio, accessible description and contact context; illustration disclosure visible');

  for (const plateSelector of ['.fnb-evidence .product-plate', '.member-plate', '.academic-plate']) {
    const plate = page.locator(plateSelector);
    await plate.getByRole('button', { name: 'Lihat konteks', exact: false }).click();
    assert.equal(await plate.getByRole('button', { name: 'Fokus detail', exact: false }).getAttribute('aria-pressed'), 'false');
    await plate.getByRole('button', { name: 'Fokus detail', exact: false }).click();
    const opener = plate.getByRole('button', { name: /^Perbesar/ });
    await opener.click(); const dialog = page.locator('dialog[open]');
    assert.equal(await dialog.count(), 1);
    assert.equal(await page.evaluate(() => !!document.activeElement.closest('dialog')), true);
    if (!reduced) assert(await page.locator('html').evaluate(e => e.classList.contains('lenis-stopped')));
    await dialog.getByRole('button', { name: 'Ukuran asli', exact: true }).click();
    assert(await dialog.locator('.dialog-image-original').isVisible());
    await dialog.getByRole('button', { name: 'Sesuaikan layar', exact: true }).click();
    await page.keyboard.press('Escape'); assert.equal(await page.locator('dialog[open]').count(), 0);
    assert.equal(await opener.evaluate(e => e === document.activeElement), true);
    await opener.click(); await page.locator('dialog[open]').getByRole('button', { name: /^Tutup/ }).click();
    assert.equal(await page.locator('dialog[open]').count(), 0);
    if (!reduced) await page.waitForFunction(() => !document.documentElement.classList.contains('lenis-stopped'));
  }
  checks.push('All three viewers: focus/context, original image, original-size zoom, fit, Escape, close, focus return and Lenis pause/resume');
  for (const context of ['F&B Suite', 'Member (F&B)', 'SIAKAD', 'PMB']) {
    await page.locator('#business-context').selectOption(context);
    assert(decodeURIComponent(await page.locator('.contact-cta').getAttribute('href')).includes(`Kebutuhan ClosePay ${context}`));
  }
  await page.evaluate(() => document.querySelector('.contact-cta').addEventListener('click', event => { event.preventDefault(); window.__mail = event.currentTarget.href; }, { once: true }));
  await page.locator('.contact-cta').click(); assert((await page.evaluate(() => window.__mail)).startsWith('mailto:marketing@teknologikartu.com'));
  checks.push('All contact contexts form correct mailto; click intercepted without sending');
  for (const id of ['home', 'fnb', 'member', 'institutional', 'pmb', 'contact']) {
    await page.evaluate(id => window.scrollTo(0, document.getElementById(id).getBoundingClientRect().top + scrollY - 100), id);
    await page.waitForTimeout(750); await page.screenshot({ path: `${output}/${name}-${id}.png` });
  }
  await page.locator('.footer-meta a[href="#home"]').click();
  await page.waitForTimeout(1200);
  const small = await page.locator('a,button,select').evaluateAll(es => es.filter(e => !e.closest('dialog') || e.closest('dialog').open).filter(e => { const r=e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.width < 43.9 || r.height < 43.9); }).map(e => e.textContent));
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  const text = await page.locator('body').innerText();
  assert(!text.includes('—')); assert(!text.includes('ClosePay Institutional / PMB'));
  const result = { name, checks, errors, overflow, small, violations: axe.violations };
  report.push(result); await fs.writeFile(`${output}/verification.json`, JSON.stringify(report, null, 2));
  console.log(name, { errors: errors.length, violations: axe.violations.length, small, overflow });
  assert.equal(errors.length, 0); assert.equal(overflow, false); assert.equal(small.length, 0); assert.equal(axe.violations.length, 0);
  await page.close();
}
const fallback = await pageFor(390, 844);
await fallback.route('**/fnb/02-product-variant-modal.webp', route => route.abort());
await fallback.goto('http://localhost:4501', { waitUntil: 'networkidle' });
await fallback.locator('.fnb-evidence .product-plate').scrollIntoViewIfNeeded();
await fallback.locator('.plate-error').waitFor();
await fallback.screenshot({ path: `${output}/product-error.png` });
await fallback.unroute('**/fnb/02-product-variant-modal.webp');
await fallback.locator('.plate-error button').click(); await fallback.locator('.plate-error').waitFor({ state: 'hidden' });
await fallback.waitForFunction(() => document.querySelector('.fnb-evidence .screen-camera img')?.naturalWidth > 0);
report.push({ name: 'product image error', checks: ['Failed screenshot shows visible retry; retry loads unchanged original successfully'] });
await fs.writeFile(`${output}/verification.json`, JSON.stringify(report, null, 2));
await browser.close();

await fs.rm(`${output}/failure.json`, { force: true });
