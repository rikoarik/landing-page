import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844],['compact',360,640]]) {
 const page=await browser.newPage({viewport:{width,height}});
 await page.addInitScript(()=>{Element.prototype.requestPointerLock=()=>Promise.reject();Element.prototype.setPointerCapture=()=>{};Element.prototype.releasePointerCapture=()=>{};});
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto('http://localhost:4500',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(500);
 await page.screenshot({path:`scrollcraft/builds/closepay-everyday/lab/${name}-hero.png`});
 await page.screenshot({path:`scrollcraft/builds/closepay-everyday/lab/${name}-full.png`,fullPage:true});
 const result=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,sections:[...document.querySelectorAll('section,footer')].map(e=>({id:e.id,height:e.getBoundingClientRect().height,top:e.getBoundingClientRect().top+scrollY})),broken:[...document.images].filter(e=>!e.complete||!e.naturalWidth).map(e=>e.src)}));
 await fs.writeFile(`scrollcraft/builds/closepay-everyday/lab/${name}-initial.json`,JSON.stringify({result,errors},null,2));
 console.log(name,JSON.stringify({overflow:result.scrollWidth>width,errors,broken:result.broken}));await page.close();
}
await browser.close();
