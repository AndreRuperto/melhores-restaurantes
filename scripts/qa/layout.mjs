import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
const out='docs/qa-frontend/evidencias';fs.mkdirSync(out,{recursive:true});
const base=process.env.QA_URL||'http://127.0.0.1:4174';
const routes=['/','/restaurantes','/como-funciona','/nao-existe','/restaurante/asador-etxebarri','/restaurante/arca','/restaurante/lamdre','/restaurante/le-louis-xv-alain-ducasse-a-lhotel-de-paris','/restaurante/sorn'];
const sizes=[[320,568],[360,640],[390,844],[430,932],[768,1024],[1024,768],[1440,900],[640,400]];
const browser=await chromium.launch({headless:true});const rows=[];const errors=[];const violations=[];
for (const theme of ['light','dark']) {
 const context=await browser.newContext({colorScheme:theme});await context.addInitScript(t=>{localStorage.setItem('theme',t);sessionStorage.setItem('a-carta-abertura-2026-v1','seen')},theme);
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 for (const [width,height] of sizes) {
 await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:width<700?'reduce':'no-preference'});
 for (const route of routes) {
 await page.goto(base+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(850);await page.locator('h1').waitFor({timeout:10000});
 if(route.includes('/restaurante/')) await page.getByText('Antes de ir',{exact:true}).waitFor();
 const layout=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,wide:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&& (r.right>innerWidth+1||r.left < -1)}).filter(e=>!e.closest('svg')).slice(0,5).map(e=>({tag:e.tagName,cls:String(e.className).slice(0,70),x:e.getBoundingClientRect().x,right:e.getBoundingClientRect().right}))}));
 const id=`${route.replaceAll('/','_')||'home'}-${width}-${theme}`;
 rows.push({route,width,height,theme,...layout,pass:layout.scroll<=width+1 && layout.wide.length===0});fs.writeFileSync(`${out}/layout.json`,JSON.stringify(rows,null,2));
 if(width===320||width===1440) await page.screenshot({path:`${out}/${id}.png`});
 if(width===1440){const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();violations.push({route,theme,violations:a.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({html:n.html,target:n.target,summary:n.failureSummary}))}))});}
 }
 console.log(theme,width,rows.filter(r=>!r.pass).length,'falhas');
 }
 await context.close();
}
fs.writeFileSync(`${out}/layout.json`,JSON.stringify(rows,null,2));fs.writeFileSync(`${out}/axe.json`,JSON.stringify(violations,null,2));fs.writeFileSync(`${out}/console.json`,JSON.stringify(errors,null,2));
console.log(JSON.stringify({cases:rows.length,fail:rows.filter(r=>!r.pass),axe:violations.filter(v=>v.violations.length),errors},null,2));await browser.close();if(rows.some(r=>!r.pass)||violations.some(v=>v.violations.length)||errors.length)process.exitCode=1;
