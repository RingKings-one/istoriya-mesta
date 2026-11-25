import { chromium, webkit } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const routes=['/','/cities/','/cities/ruza/','/stories/','/routes/','/cafe/','/archive/','/credits/','/404.html'];
const failures=[];
const cases=[];
const baseUrl=process.env.BROWSER_QA_URL || 'http://127.0.0.1:4173';
await fs.mkdir('browser-evidence',{recursive:true});
for(const [name,engine] of Object.entries({chromium,webkit})){
 const executablePath=name === 'chromium' ? process.env.BROWSER_QA_CHROMIUM : undefined;
 const browser=await engine.launch({executablePath});
 try {
 for(const width of [320,390,768,1440]) for(const route of routes){
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try {
 const response=await page.goto(new URL(route,baseUrl).href,{waitUntil:'domcontentloaded'});
 assert(response && response.status()<400,'HTTP failure');
 await page.evaluate(()=>document.fonts.ready);
 const result=await page.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,headings:document.querySelectorAll('h1').length,missingAlt:[...document.images].filter(i=>!i.hasAttribute('alt')).length}));
 cases.push({name,width,route,...result,errors});
 console.log(JSON.stringify(cases.at(-1)));
 await page.screenshot({path:'browser-evidence/'+name+'-'+width+'-'+route.replace(/[^a-z0-9]/g,'-')+'.png',animations:'disabled',timeout:15000});
 assert(result.scrollWidth<=result.width+1 && result.bodyWidth<=result.width+1,'Horizontal overflow');
 assert.equal(result.headings,1,'Expected one h1');
 assert.equal(result.missingAlt,0,'Missing alt');
 assert.equal(errors.length,0,'Page errors');
 }catch(e){failures.push({name,width,route,error:e.message});}finally{await page.close();}
 }
 }finally{await browser.close();}
}
await fs.writeFile('browser-evidence/results.json',JSON.stringify({cases,failures},null,2));
assert.equal(failures.length,0,JSON.stringify(failures));
