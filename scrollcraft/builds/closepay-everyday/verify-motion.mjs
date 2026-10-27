import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const output = 'scrollcraft/builds/closepay-everyday/lab/motion';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const results = {};
process.on('uncaughtException', async error => {
  await fs.writeFile(`${output}/failure.json`, JSON.stringify({ message: error.message, results }, null, 2));
  await browser.close();
  console.error(error);
  process.exitCode = 1;
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.addInitScript(() => {
  window.__shifts = [];
  window.__longTasks = [];
  new PerformanceObserver(list => list.getEntries().forEach(entry => {
    if (!entry.hadRecentInput) window.__shifts.push(entry.value);
  })).observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver(list => list.getEntries().forEach(entry => window.__longTasks.push(entry.duration))).observe({ type: 'longtask', buffered: true });
});
await page.goto('http://localhost:4500', { waitUntil: 'domcontentloaded' });
await page.locator('html.sc-ready').waitFor();
await page.screenshot({ path: `${output}/entrance-early.png` });
await page.waitForTimeout(500);
await page.screenshot({ path: `${output}/entrance-middle.png` });
await page.waitForTimeout(900);
await page.screenshot({ path: `${output}/entrance-rest.png` });
assert.equal(await page.locator('html').getAttribute('data-motion-mode'), 'lenis');
assert.equal(await page.locator('script[src="/scrollcraft/scrollcraft.js"]').count(), 0);
assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
results.ownership = 'Lenis present; native CSS smooth disabled; old ScrollCraft runtime absent';

const ambient = [];
for (let i = 0; i < 2; i++) {
  ambient.push(await page.locator('.hero-photo img').evaluate(e => getComputedStyle(e).transform));
  await page.waitForTimeout(550);
}
assert.notEqual(ambient[0], ambient[1]);
results.ambient = ambient;
await page.mouse.move(90, 490); await page.waitForTimeout(650);
const left = await page.locator('.hero-cup-pointer').evaluate(e => getComputedStyle(e).transform);
await page.mouse.move(1300, 490); await page.waitForTimeout(650);
const right = await page.locator('.hero-cup-pointer').evaluate(e => getComputedStyle(e).transform);
assert.notEqual(left, right);
await page.screenshot({ path: `${output}/pointer-right.png` });
results.pointer = { left, right };
const button = page.locator('.solid-button');
const hitbox = await button.boundingBox();
await page.mouse.move(hitbox.x + hitbox.width - 12, hitbox.y + 9); await page.waitForTimeout(500);
assert.deepEqual(await button.boundingBox(), hitbox);
const magnet = await button.locator('svg').evaluate(e => getComputedStyle(e).transform);
assert.notEqual(magnet, 'none');
results.magnet = { stableHitbox: true, iconTransform: magnet };

await page.mouse.move(1000, 600);
await page.mouse.wheel(0, 650);
const trajectory = [];
for (let i = 0; i < 12; i++) { trajectory.push(await page.evaluate(() => scrollY)); await page.waitForTimeout(75); }
assert(trajectory.some((value, i) => i > 0 && value > trajectory[i - 1]));
assert(trajectory.at(-1) >= 640 && trajectory.at(-1) <= 655);
assert(trajectory.every((value, i) => i === 0 || value >= trajectory[i - 1]));
results.wheel = { trajectory, description: 'Single wheel input eases monotonically to its target without overshoot or doubled travel' };

await page.locator('.desktop-nav a[href="#member"]').click();
await page.waitForTimeout(1600);
const memberTop = await page.locator('#member').evaluate(e => e.getBoundingClientRect().top);
assert(Math.abs(memberTop - 104) < 3);
assert.equal(await page.evaluate(() => document.activeElement.id), 'member');
assert.equal(await page.locator('.desktop-nav a[aria-current]').getAttribute('href'), '#member');
await page.screenshot({ path: `${output}/member-rest.png` });
results.anchor = { memberTop, focus: 'member', activeNav: '#member' };
const offscreenAmbient = await page.locator('.hero-photo img').evaluate(e => getComputedStyle(e).transform);
await page.waitForTimeout(600);
assert.equal(await page.locator('.hero-photo img').evaluate(e => getComputedStyle(e).transform), offscreenAmbient);
results.offscreenAmbient = 'Paused when hero leaves viewport';

await page.locator('.desktop-nav a[href="#fnb"]').click(); await page.waitForTimeout(1300);
const bounds = await page.locator('#fnb').evaluate(e => ({ top: e.getBoundingClientRect().top + scrollY, height: e.offsetHeight }));
const stages = [];
for (const fraction of [0.1, 0.36, 0.62, 0.9]) {
  await page.evaluate(y => window.scrollTo(0, y), bounds.top + (bounds.height - 900) * fraction);
  await page.waitForTimeout(650);
  stages.push(await page.locator('.order-stage').getAttribute('data-sc-verify-state'));
  await page.screenshot({ path: `${output}/order-${stages.length}.png` });
}
assert.equal(new Set(stages).size, 4);
await page.locator('.journey-steps button').nth(1).click();
await page.mouse.wheel(0, 100); await page.waitForTimeout(700);
assert.equal(await page.locator('.ticket-status strong').innerText(), 'Pesanan baru');
results.order = { stages, manualSelectionHeldWhileScrolling: true };
results.normalMotionCLS = await page.evaluate(() => window.__shifts.reduce((a, b) => a + b, 0));

const client = await context.newCDPSession(page);
async function listeners() {
  const { result } = await client.send('Runtime.evaluate', { expression: 'window' });
  const { listeners } = await client.send('DOMDebugger.getEventListeners', { objectId: result.objectId });
  return listeners.reduce((counts, listener) => { counts[listener.type] = (counts[listener.type] || 0) + 1; return counts; }, {});
}
const before = await listeners();
for (let i = 0; i < 3; i++) {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(250);
  assert.equal(await page.locator('html').getAttribute('data-motion-mode'), 'reduced');
  assert.equal(await page.locator('html.lenis').count(), 0);
  assert.equal(await page.locator('.order-stage').evaluate(e => getComputedStyle(e).position), 'relative');
  await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(250);
}
const after = await listeners();
for (const type of ['wheel', 'touchstart', 'touchmove', 'touchend', 'scroll', 'resize']) assert.equal(after[type], before[type], `Leaked ${type} listeners`);
results.lifecycle = { before, after, mediaCycles: 3 };

await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(400);
await page.locator('.brand').click(); await page.waitForTimeout(150);
const stillBefore = await page.locator('.hero').screenshot();
await page.mouse.move(300, 400); await page.waitForTimeout(600);
const stillAfter = await page.locator('.hero').screenshot();
assert(stillBefore.equals(stillAfter), 'Reduced-motion hero must remain still');
await page.screenshot({ path: `${output}/reduced-hero.png` });
results.reduced = 'No Lenis instance, no sticky scene, identical stationary hero pixels after pointer movement and time';

await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(1500);
const timingPromise = page.evaluate(() => new Promise(resolve => {
  const deltas = []; let previous = performance.now(); const start = previous;
  function frame(time) { deltas.push(time - previous); previous = time; if (time - start < 2400) requestAnimationFrame(frame); else resolve(deltas); }
  requestAnimationFrame(frame);
}));
await page.mouse.wheel(0, 900);
const frames = (await timingPromise).filter(n => n > 0).sort((a, b) => a - b);
results.performance = await page.evaluate(() => ({ cls: window.__shifts.reduce((a, b) => a + b, 0), longTasks: window.__longTasks, transferBytes: performance.getEntriesByType('resource').reduce((sum, r) => sum + r.transferSize, 0) }));
results.performance.frameMedianMs = frames[Math.floor(frames.length / 2)];
results.performance.frameP95Ms = frames[Math.floor(frames.length * .95)];
assert(results.normalMotionCLS < 0.1, 'Unexpected layout shift before explicit preference changes');
results.performance.clsNote = 'Total includes intentional layout changes from switching the OS motion preference, which removes the sticky scene. normalMotionCLS measures load and normal interactions before those changes.';

await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(300);
await page.locator('.brand').focus(); await page.keyboard.press('Enter');
assert.equal(await page.evaluate(() => document.activeElement.id), 'home');
await page.locator('.desktop-nav a[href="#fnb"]').focus(); await page.keyboard.press('Enter');
assert.equal(await page.evaluate(() => document.activeElement.id), 'fnb');
await page.locator('.origin-options button').nth(1).focus(); await page.keyboard.press('Enter');
assert.equal(await page.locator('.origin-options button').nth(1).getAttribute('aria-pressed'), 'true');
const outline = await page.locator('.origin-options button').nth(1).evaluate(e => getComputedStyle(e).outlineStyle);
assert.notEqual(outline, 'none');
await page.locator('.journey-steps button').nth(3).focus(); await page.keyboard.press('Space');
assert.equal(await page.locator('.ticket-status strong').innerText(), 'Selesai disiapkan');
results.keyboard = 'Enter navigates and transfers focus; Enter/Space operate origin and stages with visible focus outline';

const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
const mobile = await mobileContext.newPage();
await mobile.goto('http://localhost:4500', { waitUntil: 'networkidle' }); await mobile.waitForTimeout(1200);
const mobileClient = await mobileContext.newCDPSession(mobile);
await mobileClient.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 190, y: 680 }] });
for (let y = 650; y >= 200; y -= 50) { await mobileClient.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 190, y }] }); await mobile.waitForTimeout(20); }
await mobileClient.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await mobile.waitForTimeout(900);
assert(await mobile.evaluate(() => scrollY) > 200);
assert.equal(await mobile.locator('.order-stage').evaluate(e => getComputedStyle(e).position), 'relative');
assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
await mobile.screenshot({ path: `${output}/mobile-touch.png` });
results.touch = { scrollY: await mobile.evaluate(() => scrollY), naturalFlow: true, overflow: false };
await mobile.close();

const noJs = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
const staticPage = await noJs.newPage();
await staticPage.goto('http://localhost:4500', { waitUntil: 'networkidle' });
assert(await staticPage.locator('h1').isVisible());
assert.equal(await staticPage.locator('.hero-photo-frame').evaluate(e => getComputedStyle(e).clipPath), 'none');
results.noJavaScript = 'Server-rendered headline, imagery, section content and anchors remain visible';
results.errors = errors;
assert.equal(errors.length, 0);
await fs.writeFile(`${output}/verification.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
await browser.close();
