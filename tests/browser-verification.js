/** Real Chromium verification for CALION Academy home, isolated roadmaps, and room entry. */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { execFileSync } = require('child_process');
const PORT = 8089, DEBUG_PORT = 9224, ROOT = path.join(__dirname, '..', 'dist');
execFileSync(process.execPath,[path.join(__dirname,'../scripts/build-pages.js')],{stdio:'ignore'});
for(const route of ['pre-security','cyber-security','defensive-security','offensive-security'])assert(fs.existsSync(path.join(ROOT,'roadmap',route,'index.html')),`built roadmap route ${route}`);
for(const page of ['learning.html','roadmap.html','room.html','lesson.html'])for(const script of ['learning-data.js','academy-state.js']){
  const version=require('crypto').createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../',script))).digest('hex').slice(0,12);
  assert(fs.readFileSync(path.join(ROOT,page),'utf8').includes(`${script}?v=${version}`),`${page} references versioned ${script}`);
}
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://127.0.0.1:${PORT}`).pathname;
  if (['/modules','/modules/','/modules.html','/module.html','/roadmap.html'].includes(pathname)) { res.writeHead(301,{Location:'/'}); return res.end(); }
  const actual = pathname === '/' ? '/learning.html' : pathname;
  let file = path.join(ROOT, actual);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); return res.end('Not found'); }
  const ext = path.extname(file), types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json'};
  res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'}); fs.createReadStream(file).pipe(res);
});
class CDP {
  constructor(url){this.ws=new WebSocket(url);this.next=0;this.waiters=new Map();this.errors=[];}
  async ready(){await new Promise((resolve,reject)=>{this.ws.onopen=resolve;this.ws.onerror=reject;this.ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.method==='Runtime.exceptionThrown')this.errors.push(m.params.exceptionDetails?.text||'JavaScript exception');if(m.id&&this.waiters.has(m.id)){const w=this.waiters.get(m.id);this.waiters.delete(m.id);m.error?w.reject(m.error):w.resolve(m.result)}}});}
  send(method,params={}){const id=++this.next;return new Promise((resolve,reject)=>{this.waiters.set(id,{resolve,reject});this.ws.send(JSON.stringify({id,method,params}))})}
  async eval(expression){const r=await this.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text);return r.result?.value}
}
server.listen(PORT, async()=>{
  let chrome;
  try {
    chrome=spawn('/usr/bin/chromium',['--headless=new','--no-sandbox','--disable-gpu',`--remote-debugging-port=${DEBUG_PORT}`,`--user-data-dir=/tmp/calion-academy-${Date.now()}`,'--window-size=1280,960']);
    let target;for(let i=0;i<50&&!target;i++){await new Promise(r=>setTimeout(r,150));try{target=(await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json`)).json()).find(x=>x.type==='page')}catch{}}
    assert(target,'Chromium DevTools target available');const c=new CDP(target.webSocketDebuggerUrl);await c.ready();await c.send('Page.enable');await c.send('Runtime.enable');
    const navigate=async url=>{await c.send('Page.navigate',{url});for(let i=0;i<60;i++){await new Promise(r=>setTimeout(r,100));if(await c.eval('document.readyState === "complete"').catch(()=>false))break}await new Promise(r=>setTimeout(r,180));};
    await navigate(`http://127.0.0.1:${PORT}/`);
    assert((await c.eval('document.title')).includes('CALION Academy'));
    assert.equal(await c.eval('document.querySelectorAll("#path-grid .path-card").length'),4);
    assert.equal(await c.eval('[...document.querySelectorAll("#path-grid a.path-action")].map(a=>a.getAttribute("href")).join(",")'),'/roadmap/pre-security,/roadmap/cyber-security,/roadmap/defensive-security,/roadmap/offensive-security');
    console.log('✓ Academy home renders four path selectors and correct dedicated route destinations');
    const expected={'pre-security':10,'cyber-security':10,'defensive-security':12,'offensive-security':15};
    for(const [slug,count] of Object.entries(expected)){
      await navigate(`http://127.0.0.1:${PORT}/roadmap/${slug}`);
      assert.equal(await c.eval('document.querySelectorAll("#roadmap-nodes .rm-node").length'),count,`${slug} room count`);
      assert.equal(await c.eval('new Set([...document.querySelectorAll("#roadmap-nodes .rm-node")].map(n=>n.querySelector(".rm-number").textContent)).size'),count);
      assert.equal(await c.eval('document.querySelector("#page-canonical").href'),`https://learning.endlessus.in/roadmap/${slug}/`);
      assert((await c.eval('document.querySelector("#page-description").content')).includes(`${count} connected cybersecurity rooms`));
      const wrong=await c.eval(`[...document.querySelectorAll("#roadmap-nodes .rm-node a.rm-enter")].some(a=>!a.getAttribute("href").startsWith("/room.html?id=room-"))`);
      assert.equal(wrong,false);
      const desktop=await c.eval('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})');
      assert(desktop.width>=1024&&desktop.scrollWidth<=desktop.width,`${slug} desktop overflow: ${JSON.stringify(desktop)}`);
      await c.send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
      const mobile=await c.eval('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,nodes:document.querySelectorAll("#roadmap-nodes .rm-node").length})');
      const shot=await c.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(`/tmp/calion-${slug}-mobile.png`,Buffer.from(shot.data,'base64'));
      assert(mobile.scrollWidth<=mobile.width,`${slug} horizontal overflow at 390px: ${JSON.stringify(mobile)}`);
      await c.send('Emulation.clearDeviceMetricsOverride');
      if(slug==='pre-security'){const desktopShot=await c.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('/tmp/calion-pre-security-desktop.png',Buffer.from(desktopShot.data,'base64'));}
      assert.equal(await c.eval('[...document.querySelectorAll(".rm-nav a")].filter(a=>! ["/","profile.html"].includes(a.getAttribute("href"))).length'),0,'roadmap exposes no cross-path navigation');
      console.log(`✓ ${slug}: ${count} isolated rooms; no desktop or 390px mobile overflow`);
    }
    await navigate(`http://127.0.0.1:${PORT}/room.html?id=room-02`);
    assert.equal(await c.eval('document.title'),'Room Locked · CALION Academy','direct URL cannot bypass previous-room prerequisite');
    await navigate(`http://127.0.0.1:${PORT}/lesson.html?room=room-02&task=0`);
    assert.equal(await c.eval('document.title'),'Room Locked · CALION Academy','lesson URL cannot bypass previous-room prerequisite');
    await c.eval(`localStorage.setItem(AcademyState.KEYS.ROOMS,JSON.stringify(['room-01','room-02','room-03','room-04','room-05','room-06','room-07','room-08']))`);
    await navigate(`http://127.0.0.1:${PORT}/room.html?id=ps-room-03`);
    assert((await c.eval('document.title')).includes('Introduction to Virtualization'));
    const hintResult=await c.eval(`(()=>{const before=AcademyState.calculateTotalXP();const trigger=document.querySelector('.hint-step-trigger');if(!trigger)return {missing:true};trigger.click();const drawer=document.querySelector('[id^="hint-drawer-"]');const next=document.querySelector('.next-hint-btn');if(!next)return {missingNext:true};next.click();return {before,after:AcademyState.calculateTotalXP(),step:next.dataset.nextStep,visible:!drawer.classList.contains('hidden'),inputValues:[...document.querySelectorAll('input[id^="q-input-"]')].map(i=>i.value)}})()`);
    assert.equal(hintResult.missing,undefined,'room renders learner-requested progressive hints');assert.equal(hintResult.missingNext,undefined);assert.equal(hintResult.visible,true);assert.equal(hintResult.step,'2');assert.equal(hintResult.after,hintResult.before,'hints do not deduct or award XP');assert(hintResult.inputValues.every(v=>v===''),'correct answers are not prefilled into question fields');
    await navigate(`http://127.0.0.1:${PORT}/lesson.html?room=room-09&task=0`);
    const lessonHint=await c.eval(`(()=>{const before=AcademyState.calculateTotalXP();const details=document.querySelector('details');const next=document.querySelector('.lesson-hint-next');if(!details||!next)return {missing:true};details.open=true;next.click();return {before,after:AcademyState.calculateTotalXP(),step:next.dataset.nextStep,text:document.querySelector('[id^="lesson-hint-text-"]').textContent}})()`);
    assert.equal(lessonHint.missing,undefined,'lesson reader renders progressive hint control');assert.equal(lessonHint.after,lessonHint.before);assert.equal(lessonHint.step,'2');assert(lessonHint.text.includes('Hint 2:'));
    console.log('✓ Room and lesson hints reveal one tier at a time on request without XP changes or answer prefill; legacy IDs normalize');
    await c.eval(`localStorage.setItem(AcademyState.KEYS.ROOMS,JSON.stringify(['room-01','room-02','room-03']))`);
    await navigate(`http://127.0.0.1:${PORT}/roadmap/cyber-security`);
    assert.equal(await c.eval('document.querySelector("#roadmap-header [role=status]")===null'),true,'three Pre-Security rooms unlock Foundations');
    assert.equal(await c.eval('document.querySelector("#roadmap-nodes .rm-node").classList.contains("current")'),true);
    await c.eval(`localStorage.setItem(AcademyState.KEYS.ROOMS,JSON.stringify(['room-01','room-02','room-03','room-11','room-12','room-13']))`);
    for(const slug of ['defensive-security','offensive-security']){
      await navigate(`http://127.0.0.1:${PORT}/roadmap/${slug}`);
      assert.equal(await c.eval('document.querySelector("#roadmap-header [role=status]")===null'),true,`${slug} independently unlocks after Foundations threshold`);
      assert.equal(await c.eval('document.querySelector("#roadmap-nodes .rm-node").classList.contains("current")'),true);
    }
    console.log('✓ Existing unlock thresholds preserved: three Pre-Security unlock Foundations; three Foundations unlock both specialist paths in parallel');
    for(const url of ['/modules','/modules.html','/module.html','/roadmap.html']){const r=await fetch(`http://127.0.0.1:${PORT}${url}`,{redirect:'manual'});assert.equal(r.status,301);assert.equal(r.headers.get('location'),'/')}
    console.log('✓ Legacy Modules and unified roadmap URLs redirect to Academy home');
    await c.send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    await navigate(`http://127.0.0.1:${PORT}/`);assert((await c.eval('document.documentElement.scrollWidth'))<=390);console.log('✓ Academy home fits 390px viewport');
    assert.deepEqual(c.errors,[],`browser runtime exceptions: ${c.errors.join('; ')}`);
    console.log('✓ No uncaught JavaScript exceptions during browser navigation');
    c.ws.close();
  } catch(e){console.error(e);process.exitCode=1;} finally{if(chrome)chrome.kill();server.close();}
});
