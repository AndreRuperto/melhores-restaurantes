import {chromium,firefox} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile,readFile,copyFile} from 'node:fs/promises';
const root='docs/qa-frontend/evidencias/independente',dir=root+'/reteste-fontes-contraste';await mkdir(dir,{recursive:true});
const engine=process.env.QA_FIREFOX==='1'?'firefox':'chromium',type=engine==='firefox'?firefox:chromium;
const r={engine,started:new Date().toISOString(),base:'http://127.0.0.1:4174',cases:[],errors:[]};const save=()=>writeFile(`${dir}/${engine}.json`,JSON.stringify(r,null,2));
const b=await type.launch();
for(const theme of ['light','dark'])for(const [width,height]of[[320,568],[1024,768],[1440,900],[640,400]])for(const route of ['/','/restaurantes']){
 const ctx=await b.newContext({viewport:{width,height},colorScheme:theme,hasTouch:width===320,reducedMotion:'reduce'});await ctx.addInitScript(t=>localStorage.setItem('theme',t),theme);const p=await ctx.newPage();
 p.on('pageerror',e=>r.errors.push({theme,width,route,error:String(e)}));
 const failed=[];p.on('requestfailed',req=>{if(/font|woff|ttf|otf/i.test(req.url()))failed.push({url:req.url(),error:req.failure()});});
 try{
  await p.goto(r.base+route);await p.locator('button[aria-haspopup="dialog"]').first().waitFor();await p.locator('.menu-opening').waitFor({state:'detached',timeout:20000});await p.evaluate(()=>document.fonts.ready);
  const asset=await p.evaluate(()=>[...document.scripts].map(s=>s.src).filter(s=>s.includes('/assets/index-')));
  const count=await p.locator('button[aria-haspopup="dialog"]').count();
  for(let index=0;index<count;index++){
   const t=p.locator('button[aria-haspopup="dialog"]').nth(index);await t.scrollIntoViewIfNeeded();await t.focus();await p.keyboard.press('Enter');const menu=p.getByRole('dialog',{name:/^Filtrar por/});await menu.waitFor();await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(120);
   const measured=await menu.evaluate(e=>{
    const rect=e.getBoundingClientRect(),header=document.querySelector('header')?.getBoundingClientRect();
    const counter=e.querySelector('button[aria-pressed="true"] .tabular-nums');const cs=counter?getComputedStyle(counter):null;
    let bg=null;for(let n=counter;n;n=n.parentElement){const c=getComputedStyle(n).backgroundColor;if(c!=='rgba(0, 0, 0, 0)'&&c!=='transparent'){bg=c;break;}}
    const rgb=s=>(s?.match(/[\d.]+/g)||[]).slice(0,3).map(Number),lum=s=>{const c=rgb(s).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return c[0]*.2126+c[1]*.7152+c[2]*.0722;};const l1=cs?lum(cs.color):0,l2=bg?lum(bg):0;
    const fonts=Array.from(document.fonts).map(f=>({family:f.family,status:f.status,weight:f.weight,style:f.style}));
    const fontUsage=[['counter',counter],['search',e.querySelector('input')],['heading',document.querySelector('h1')]].filter(([,n])=>n).map(([part,n])=>{const s=getComputedStyle(n);return {part,family:s.fontFamily,size:s.fontSize,weight:s.fontWeight,style:s.fontStyle,available:document.fonts.check(`${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`)};});
    return {box:{x:rect.x,y:rect.y,width:rect.width,height:rect.height},headerBottom:header?.bottom,contained:rect.x>=0&&rect.y>=0&&rect.right<=innerWidth+1&&rect.bottom<=innerHeight+1,overflow:{scrollWidth:document.documentElement.scrollWidth,innerWidth},points:[e.querySelector('input'),...Array.from(e.querySelectorAll('button')).slice(0,2)].filter(Boolean).map(n=>{const z=n.getBoundingClientRect(),x=z.x+z.width/2,y=z.y+z.height/2,at=document.elementFromPoint(x,y);return{text:n.textContent||n.getAttribute('aria-label'),x,y,visible:y>=0&&y<innerHeight&&e.contains(at),hit:at?.outerHTML.slice(0,160)};}),counter:counter?{text:counter.textContent,color:cs.color,background:bg,fontSize:cs.fontSize,fontFamily:cs.fontFamily,fontWeight:cs.fontWeight,ratio:(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05)}:null,fontStatus:document.fonts.status,fonts,fontUsage,fontResources:performance.getEntriesByType('resource').filter(x=>/\.(woff2?|ttf|otf)(\?|$)/.test(x.name)).map(x=>({url:x.name,duration:x.duration,transferSize:x.transferSize})),preloads:[...document.querySelectorAll('link[rel="preload"][as="font"]')].map(x=>({href:x.href,type:x.type,crossOrigin:x.crossOrigin})),selector:'#'+CSS.escape(e.id)};
   });
   const axe=await new AxeBuilder({page:p}).include(measured.selector).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
   const screenshot=`${engine}-${theme}-${width}x${height}-${route==='/'?'home':'lista'}-${index}.png`;await p.screenshot({path:dir+'/'+screenshot});await p.keyboard.press('Escape');const escapeFocus=await t.evaluate(e=>document.activeElement===e);
   r.cases.push({route,theme,width,height,index,label:await t.getAttribute('aria-label'),asset,actualTheme:await p.locator('html').getAttribute('data-theme'),...measured,escapeFocus,axe:{violations:axe.violations,incomplete:axe.incomplete,passes:axe.passes.map(v=>v.id)},failedFontRequests:failed,screenshot});await save();
  }
 }catch(e){r.errors.push({route,theme,width,height,error:String(e)});await save();}
 await ctx.close();console.log(engine,theme,width,route,r.cases.length);
}
if(engine==='chromium'){
 const ctx=await b.newContext();r.seo404=[];for(const path of ['/slug-inexistente-qa','/restaurante/slug-inexistente-qa']){const res=await ctx.request.get('http://127.0.0.1:4177'+path);const html=await res.text();await writeFile(dir+'/4177'+path.replaceAll('/','_')+'.html',html);r.seo404.push({url:res.url(),status:res.status(),headers:res.headers(),robots:html.match(/<meta[^>]+name=["']robots["'][^>]*>/i)?.[0],title:html.match(/<title>(.*?)<\/title>/i)?.[1],canonical:html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0],bodyLength:html.length});await save();}await ctx.close();
}
await b.close();r.finished=new Date().toISOString();await save();
