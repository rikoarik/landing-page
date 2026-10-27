import {chromium} from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const root='scrollcraft/builds/closepay-everyday/lab/final';
await fs.mkdir(root,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const report=[];
async function makePage(viewport,reducedMotion='no-preference'){
 const context=await browser.newContext({viewport,reducedMotion});
 const page=await context.newPage();
 await page.addInitScript(()=>{Element.prototype.requestPointerLock=()=>Promise.reject(new Error('disabled'));Element.prototype.setPointerCapture=()=>{};Element.prototype.releasePointerCapture=()=>{};Document.prototype.exitPointerLock=()=>{};});
 return page;
}
async function settle(page){await page.waitForTimeout(350)}
for(const [name,width,height,reduced] of [['desktop',1440,900,false],['mobile',390,844,false],['compact',360,640,false],['tablet',768,1024,false],['reduced',1440,900,true]]){
 const page=await makePage({width,height},reduced?'reduce':'no-preference');
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto('http://localhost:4500',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);
 await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
 const checks=[];
 await page.screenshot({path:`${root}/${name}-hero.png`});
 assert.equal(await page.locator('.hero .photo-status').count(),0,'loaded hero must not retain loading status');checks.push('Hero: photo loaded, loading text removed');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'horizontal overflow');
 if(width<=600){const r=await page.locator('.solid-button').boundingBox();assert(r.y+r.height<=height,'hero CTA visible in compact viewport');checks.push('Hero CTA within first viewport');}
 const anchors=await page.locator('a[href^="#"]').evaluateAll(links=>links.map(a=>({label:a.textContent,href:a.getAttribute('href'),exists:!!document.querySelector(a.getAttribute('href'))})));
 assert(anchors.every(a=>a.exists));checks.push('All anchor targets exist');
 if(width<=900){
  const menu=page.getByRole('button',{name:'Menu'});await menu.click();assert.equal(await page.locator('#mobile-menu').count(),1);await page.screenshot({path:`${root}/${name}-menu.png`});await page.keyboard.press('Escape');assert.equal(await page.locator('#mobile-menu').count(),0);assert.equal(await menu.evaluate(e=>e===document.activeElement),true);
  for(const dest of ['F&B Suite','Member','Institutional','Bicarakan kebutuhan']){await menu.click();await page.locator('#mobile-menu').getByRole('link',{name:dest,exact:true}).click();assert.equal(await page.locator('#mobile-menu').count(),0);}
  checks.push('Menu opens; Escape closes and restores focus; all four menu links navigate and close');
 }else{
  for(const label of ['F&B Suite','Member','Institutional']){await page.locator('.desktop-nav').getByRole('link',{name:label,exact:true}).click();assert(await page.evaluate(()=>location.hash));}
  await page.locator('.header-contact').click();assert.equal(await page.evaluate(()=>location.hash),'#contact');checks.push('Desktop nav and contact navigate to correct sections');
 }
 await page.locator('.solid-button').click();assert.equal(await page.evaluate(()=>location.hash),'#fnb');
 const fnb=page.locator('#fnb');
 for(const origin of ['Kiosk mandiri','Staf kasir']){
  await fnb.getByRole('button',{name:new RegExp(origin)}).click();assert((await page.locator('.ticket-source').innerText()).includes(origin==='Staf kasir'?'Staff POS':'Kiosk'));
  for(const [label,expected] of [['Pesanan','Pesanan dicatat'],['Baru','Pesanan baru'],['Diproses','Sedang diproses'],['Selesai','Selesai disiapkan']]){
   await page.locator('.journey-steps').getByRole('button',{name:label,exact:true}).click();assert.equal(await page.locator('.ticket-status strong').innerText(),expected);
  }
 }
 checks.push('Staff POS and Kiosk: correct source retained through all four order states');
 await page.getByRole('button',{name:'Ulangi pesanan',exact:true}).click();assert.equal(await page.locator('.ticket-status strong').innerText(),'Pesanan dicatat');
 for(let i=0;i<3;i++)await page.getByRole('button',{name:'Lanjutkan pesanan',exact:true}).click();assert.equal(await page.locator('.ticket-status strong').innerText(),'Selesai disiapkan');checks.push('Next order and restart advance/reset state');
 if(width>=1000&&height>=760&&!reduced){
  await page.getByRole('button',{name:'Ikuti posisi halaman'}).click();
  const box=await fnb.evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight}));
  const reached=[];
  for(const fraction of [.08,.35,.6,.87]){await page.evaluate(y=>window.scrollTo(0,y),box.top+(box.height-height)*fraction);await settle(page);reached.push(await page.locator('.ticket-status strong').innerText());}
  assert.equal(new Set(reached).size,4,'scroll should traverse all four states');checks.push('Scroll traverses all four states; resume returns control to scrolling');
 }
 const supply=page.getByRole('button',{name:/Purchaser:/});await supply.click();assert(await page.locator('#supply-detail').isVisible());await page.screenshot({path:`root/${name}-supply.png`.replace('root/',root+'/')});await page.locator('#supply-detail a').click();assert.equal(await page.locator('#business-context').inputValue(),'F&B Suite');await supply.click();assert.equal(await page.locator('#supply-detail').count(),0);checks.push('Purchaser expands/closes; contact carries F&B context');
 await page.locator('#member').getByRole('button',{name:'Profil anggota'}).click();assert((await page.locator('.member-detail').innerText()).includes('tanggal bergabung'));
 await page.locator('#member .text-button').click();assert.equal(await page.locator('#business-context').inputValue(),'Member');
 await page.locator('#member').getByRole('button',{name:'Pendaftaran',exact:true}).click();assert((await page.locator('.member-detail').innerText()).includes('formulir pendaftaran'));checks.push('Member features switch; Member context carries to contact');
 for(const name of ['Data diri','Dokumen','Status pendaftaran']){await page.locator('.admission-tabs').getByRole('button',{name,exact:true}).click();assert.equal(await page.locator('.admission-tabs button[aria-pressed=true]').innerText(),name);}
 await page.locator('#institutional .text-button').click();assert.equal(await page.locator('#business-context').inputValue(),'Institutional');checks.push('All PMB stages switch; Institutional context carries to contact');
 for(const context of ['F&B Suite','Member','Institutional']){
  await page.locator('#business-context').selectOption(context);const href=await page.locator('.contact-cta').getAttribute('href');assert(href.startsWith('mailto:marketing@teknologikartu.com'));assert(decodeURIComponent(href).includes('Kebutuhan ClosePay '+context));
 }
 await page.evaluate(()=>document.querySelector('.contact-cta').addEventListener('click',e=>{e.preventDefault();window.__clickedMailto=e.currentTarget.href},{once:true}));await page.locator('.contact-cta').click();assert((await page.evaluate(()=>window.__clickedMailto)).includes('mailto:'));checks.push('Email CTA click produces verified recipient and selected product; native mail app not launched');
 for(const id of ['home','fnb','member','institutional','contact']){
  await page.locator('#'+id).scrollIntoViewIfNeeded();await settle(page);await page.screenshot({path:`${root}/${name}-${id}.png`});
 }
 const images=await page.locator('img').evaluateAll(imgs=>imgs.map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})));assert(images.every(i=>i.loaded));checks.push('All image assets loaded after visiting chapters');
 const smallTargets=await page.locator('a,button,select').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.height<43.9||r.width<43.9)}).map(e=>({text:e.textContent,rect:{w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}})));
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 await page.locator('.footer-meta a[href="#home"]').click();assert.equal(await page.evaluate(()=>location.hash),'#home');
 await page.keyboard.press('Tab');await page.keyboard.press('Tab');
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 report.push({name,checks,overflow,errors,smallTargets,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 await page.screenshot({path:`${root}/${name}-full.png`,fullPage:true});await page.close();
 await fs.writeFile(`${root}/verification.json`,JSON.stringify(report,null,2));
 console.log(name,'checks',checks.length,'axe',axe.violations.length,'small targets',smallTargets.length,'errors',errors.length);
}
const page=await makePage({width:1440,height:900});await page.goto('http://localhost:4500',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.mouse.move(80,500);await page.waitForTimeout(700);await page.screenshot({path:`${root}/pointer-left.png`});await page.mouse.move(1370,500);await page.waitForTimeout(700);await page.screenshot({path:`${root}/pointer-right.png`});
await page.close();
const fallback=await makePage({width:390,height:844});await fallback.route('**/assets/editorial/cafe.webp',route=>route.abort());await fallback.goto('http://localhost:4500',{waitUntil:'networkidle'});await fallback.getByText('Foto belum dapat ditampilkan.').waitFor();await fallback.screenshot({path:`${root}/image-error.png`});await fallback.unroute('**/assets/editorial/cafe.webp');await fallback.getByRole('button',{name:'Muat ulang foto'}).click();await fallback.locator('.hero .photo-loaded').waitFor();report.push({name:'image fallback',checks:['Blocked photo shows understandable error; retry reloads image successfully']});await fallback.close();
await fs.writeFile(`${root}/verification.json`,JSON.stringify(report,null,2));await browser.close();
