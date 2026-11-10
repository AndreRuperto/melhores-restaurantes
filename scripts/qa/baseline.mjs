import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
const dir='docs/qa-frontend/evidencias';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:320,height:568}}); const page=await context.newPage();
await page.goto('http://127.0.0.1:4174/restaurantes');
await page.waitForTimeout(900);
await page.getByRole('button',{name:/Filtrar por país/}).click();
await page.addScriptTag({path:'scripts/qa/css-probe.js'});
await page.addScriptTag({path:'scripts/qa/regra-vencedora.js'});
const probe=await page.evaluate(()=>({geometry:cssProbe('[role="dialog"]',['left','right','width','position']),rule:regraVencedora('[role="dialog"]','right')}));
fs.writeFileSync(dir+'/baseline-dropdown.json',JSON.stringify(probe,null,2));
await page.screenshot({path:dir+'/baseline-dropdown.png'});
await page.keyboard.press('Escape');
const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
fs.writeFileSync(dir+'/baseline-axe.json',JSON.stringify(axe.violations,null,2));
console.log(JSON.stringify({probe,axe:axe.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length,example:v.nodes[0]?.html}))},null,2));
await browser.close();



