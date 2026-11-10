import { chromium, firefox } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {restaurants} from '../../src/data/restaurants.js';
const dir='docs/qa-frontend/evidencias/independente'+(process.env.QA_FIREFOX==='1'?'/firefox':''); await mkdir(dir,{recursive:true});
const results={started:new Date().toISOString(),base:'http://127.0.0.1:4174',geometry:[],functional:[],seo:[],axe:[],errors:[],limitations:['Sem leitor de tela ou dispositivo físico','640x400 mede reflow; não zoom real 200%','Sem Lighthouse nesta amostra independente']};
if(process.env.QA_EXTRA==='1')Object.assign(results,JSON.parse(await readFile(dir+'/resultados.json','utf8')));
const save=()=>writeFile(`${dir}/resultados.json`,JSON.stringify(results,null,2));
const sizes=[[320,568],[360,640],[390,844],[430,932],[640,400],[768,1024],[1024,768],[1440,900]];
const browsers=process.env.QA_FIREFOX==='1'?[['firefox',firefox]]:[['chromium',chromium]];
for(const [engine,type] of browsers){
 const browser=await type.launch({headless:true});
 for(const theme of (process.env.QA_EXTRA==='1'?[]:['light','dark'])) for(const [width,height] of sizes) for(const route of ['/','/restaurantes']){
  const context=await browser.newContext({viewport:{width,height},hasTouch:width<500,colorScheme:theme,reducedMotion:width%3?'reduce':'no-preference'});
  await context.addInitScript(t=>localStorage.setItem('theme',t),theme);
  const page=await context.newPage(); page.on('pageerror',e=>results.errors.push({engine,route,theme,width,error:String(e)}));
  try{
   await page.goto(results.base+route); await page.locator('button[aria-haspopup="dialog"]').first().waitFor();
   await page.waitForTimeout(1300); const count=await page.locator('button[aria-haspopup="dialog"]').count();
   for(let i=0;i<count;i++){
    const trigger=page.locator('button[aria-haspopup="dialog"]').nth(i); const label=await trigger.getAttribute('aria-label');
    await trigger.scrollIntoViewIfNeeded(); await trigger.focus(); await page.keyboard.press('Enter');
    const menu=page.getByRole('dialog',{name:/^Filtrar por/}); await menu.waitFor(); await page.waitForTimeout(140);
    const hit=await menu.evaluate(e=>{const header=document.querySelector('header')?.getBoundingClientRect();const nodes=[e.querySelector('input'),...Array.from(e.querySelectorAll('button')).slice(0,2)].filter(Boolean);return {headerBottom:header?.bottom,points:nodes.map(n=>{const b=n.getBoundingClientRect(),x=b.left+b.width/2,y=b.top+b.height/2,at=document.elementFromPoint(x,y);return {text:n.textContent||n.getAttribute('aria-label'),x,y,visible:y>=0&&y<innerHeight&&e.contains(at),hit:at?.outerHTML.slice(0,260)};})};});
    const box=await menu.boundingBox(); const computed=await menu.evaluate(e=>({position:getComputedStyle(e).position,maxHeight:getComputedStyle(e).maxHeight,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight}));
    const contained=!!box&&box.x>=0&&box.y>=0&&box.x+box.width<=width+1&&box.y+box.height<=height+1;
    const shot=`${engine}-${route==='/'?'home':'lista'}-${width}x${height}-${theme}-${i}.png`; await page.screenshot({path:`${dir}/${shot}`});
    await page.keyboard.press('Escape'); const escapeFocus=await trigger.evaluate(e=>document.activeElement===e); const closed=await menu.count()===0;
    await page.keyboard.press('ArrowDown'); await menu.waitFor();
    const focusBefore=await page.evaluate(()=>document.activeElement?.textContent||document.activeElement?.getAttribute('aria-label'));
    await page.keyboard.press('ArrowDown'); const focusAfter=await page.evaluate(()=>document.activeElement?.textContent);
    await page.keyboard.press('ArrowDown'); const chosen=await page.evaluate(()=>document.activeElement?.textContent);
    await page.keyboard.press('Enter'); await page.waitForTimeout(80);
    const selectedLabel=await trigger.getAttribute('aria-label'); const selectedFocus=await trigger.evaluate(e=>document.activeElement===e);
    const overflow=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth}));
    results.geometry.push({engine,route,theme,width,height,index:i,label,hit,actualTheme:await page.locator('html').getAttribute('data-theme'),box,computed,contained,escapeFocus,closed,focusBefore,focusAfter,chosen,selectedLabel,selectedFocus,selectedClosed:await menu.count()===0,overflow,screenshot:shot}); await save();
    await trigger.focus(); await page.keyboard.press('Enter'); await menu.waitFor();
    const search=menu.getByRole('searchbox'); if(await search.count()){await search.focus();await page.keyboard.press('ArrowDown');} else {await page.keyboard.press('Home');}
    await page.keyboard.press('Enter');
   }
  }catch(e){results.errors.push({engine,route,theme,width,height,error:String(e)});await save();}
  await context.close();console.log(engine,theme,width,height,route,results.geometry.length);
 }
 if(engine==='chromium'){
 const extraContext=await browser.newContext({viewport:{width:1440,height:900}}); const page=await extraContext.newPage();
 const record=async(name,fn)=>{try{results.functional.push({name,...await fn()});}catch(e){results.functional.push({name,error:String(e)});}await save();};
 await page.goto(results.base+'/restaurantes');
 const countText=()=>page.locator('main .smallcaps').first().innerText();
 await record('busca sem acento e restauração URL',async()=>{await page.getByRole('searchbox').fill('sao paulo');await page.waitForTimeout(150);const before=await countText();const url=page.url();await page.reload(); const after=await countText(); const names=restaurants.filter(r=>r.city==='São Paulo').map(r=>r.name);return {before,after,url,query:await page.getByRole('searchbox').inputValue(),expectedNames:names,visibleNames:await Promise.all(names.map(n=>page.getByRole('link').filter({hasText:n}).count()))};});
 await record('faixas 50/50 e limpar',async()=>{await page.getByRole('button',{name:'Limpar filtros'}).click();let values=[];for(const name of ['1 a 50','51 a 100']){await page.getByRole('button',{name,exact:true}).click();values.push({name,count:await countText(),url:page.url()});await page.getByRole('button',{name:'Limpar filtros'}).click();}return {values,cleared:await countText(),url:page.url()};});
 await record('país continente limpar URL',async()=>{const t=page.getByRole('button',{name:/Filtrar por país/});await t.focus();await page.keyboard.press('Enter');await page.getByRole('searchbox',{name:'Buscar país',exact:true}).fill('Brasil');await page.keyboard.press('Enter');const brazil={count:await countText(),url:page.url()};await page.getByRole('button',{name:'Europa',exact:true}).click();const europe={count:await countText(),url:page.url(),country:await t.getAttribute('aria-label')};await page.reload();const restored=await countText();await page.getByRole('button',{name:'Limpar filtros'}).click();return {brazil,europe,restored,cleared:await countText(),url:page.url()};});
 await record('busca vazia',async()=>{await page.getByRole('searchbox').fill('zzzzindependente');return {count:await countText(),empty:await page.getByText('Nenhum restaurante nessa faixa.',{exact:true}).count()};});
 await page.goto(results.base+'/restaurantes');
 await record('mapa teclado',async()=>{await page.getByRole('button',{name:'Aproximar',exact:true}).focus();const before=await page.locator('svg[role="group"] g').first().getAttribute('transform');await page.keyboard.press('Enter');const after=await page.locator('svg[role="group"] g').first().getAttribute('transform');const markers=await page.locator('svg[role="group"] circle').evaluateAll(es=>es.map(e=>({tabindex:e.getAttribute('tabindex'),role:e.getAttribute('role'),label:e.getAttribute('aria-label')})));return {before,after,markers,focusableMarkers:markers.filter(x=>x.tabindex!==null&&Number(x.tabindex)>=0).length};});
 for(const theme of ['light','dark'])for(const route of ['/','/restaurantes']){await page.goto(results.base+route);await page.evaluate(t=>{document.documentElement.dataset.theme=t},theme);const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();results.axe.push({route,theme,violations:a.violations,incomplete:a.incomplete});await save();}
 // Raw responses inspected in a detached document, with no app JavaScript.
 for(const route of ['/','/restaurantes',...restaurants.map(r=>'/restaurante/'+r.slug),'/restaurante/slug-inexistente-qa']){
 const response=await page.request.get(results.base+route);const html=await response.text();const head=await page.evaluate(html=>{const d=new DOMParser().parseFromString(html,'text/html');return {title:d.title,description:d.querySelector('meta[name="description"]')?.content,canonical:d.querySelector('link[rel="canonical"]')?.href,ogTitle:d.querySelector('meta[property="og:title"]')?.content,ogDescription:d.querySelector('meta[property="og:description"]')?.content,ogUrl:d.querySelector('meta[property="og:url"]')?.content,twitterTitle:d.querySelector('meta[name="twitter:title"]')?.content,robots:d.querySelector('meta[name="robots"]')?.content};},html); results.seo.push({route,status:response.status(),...head});await save();}
 const sitemap=await (await page.request.get(results.base+'/sitemap.xml')).text();await writeFile(`${dir}/sitemap.xml`,sitemap);
 await page.close();
 }
 await browser.close();
}
results.finished=new Date().toISOString();await save();console.log('DONE',results.geometry.length,results.errors);






