import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const out='scrollcraft/builds/closepay-everyday/lab/product-frames';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const report=[];
for(const [mode,width,height] of [['desktop',1440,900],['mobile',390,844],['compact',360,640]]){
 const page=await browser.newPage({viewport:{width,height}});
 await page.addInitScript(()=>{Element.prototype.requestPointerLock=()=>Promise.reject();Element.prototype.setPointerCapture=()=>{};Element.prototype.releasePointerCapture=()=>{};});
 await page.goto('http://localhost:4501',{waitUntil:'networkidle'});
 for(const [name,control,frame,count] of [['fnb','.proof-index button','.proof-composition',5],['member','.member-path button','.member-screen-composition',4],['siakad','.academic-index button','.academic-surface',4],['pmb','.admission-tabs button','.admission-desk',3]]){
  for(let i=0;i<count;i++){
   await page.locator(control).nth(i).click();
   await page.evaluate(sel=>window.scrollTo(0,document.querySelector(sel).getBoundingClientRect().top+scrollY-100),frame);
   await page.waitForTimeout(1000);
   const box=await page.locator(frame).boundingBox();
   assert(box.y>=80&&box.y<160, `${mode} ${name}: incorrect screenshot position ${box.y}`);
   await page.screenshot({path:`${out}/${mode}-${name}-${i}.png`});
   report.push({mode,name,index:i,top:box.y,active:await page.locator(control).nth(i).getAttribute('aria-pressed')});
  }
 }
 await page.close();
}
await fs.writeFile(`${out}/verification.json`,JSON.stringify(report,null,2));
await browser.close();
console.log(`${report.length} correctly positioned product frames captured`);
