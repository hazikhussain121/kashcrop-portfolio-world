const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const dir='artifacts/signature-experience';
const read=name=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
const browser=JSON.parse(fs.readFileSync('artifacts/production-migration/playwright-results.json','utf8'));
fs.copyFileSync('artifacts/production-migration/playwright-results.json',path.join(dir,'browser-results.json'));
const axe=[...read('accessibility.json'),...read('accessibility-supporting.json')];
const lifecycle=read('render-lifecycle.json');
const source=[];
for(const folder of ['app/components/portfolio/signature','app/styles/portfolio'])for(const file of fs.readdirSync(folder)){const full=path.join(folder,file);if(fs.statSync(full).isFile())source.push({file:full,sha256:crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex')});}
const unitLog=fs.readFileSync(path.join(dir,'unit-tests.log'),'utf8').replace(/\x1b\[[0-9;]*m/g,'');
const buildLog=fs.readFileSync(path.join(dir,'build.log'),'utf8');
const summary={
 recordedAt:new Date().toISOString(),project:process.cwd(),application:'React Router / React / TypeScript',
 preview:{development:'http://127.0.0.1:5208',productionBuild:'http://127.0.0.1:5218',launcher:'START-PORTFOLIO.cmd'},
 typecheck:{passed:!fs.readFileSync(path.join(dir,'typecheck.log'),'utf8').includes('error TS')},
 unitTests:{passed:Number(unitLog.match(/Tests\s+(\d+) passed/)?.[1]||0)},
 productionBuild:{prerenderedHTMLPages:(buildLog.match(/Prerender \(html\):/g)||[]).length,lazyWebGLBundle:true},
 browser:{passed:browser.stats.expected,failed:browser.stats.unexpected,skipped:browser.stats.skipped,flaky:browser.stats.flaky,durationMs:browser.stats.duration},
 accessibility:{scans:axe.length,detectedViolations:axe.reduce((sum,x)=>sum+x.violations.length,0),manualReviewRequired:'Image/gradient contrast and real assistive-technology use are not certified by automated scans.'},
 webglLifecycle:{passed:lifecycle.filter(x=>x.ok).length,failed:lifecycle.filter(x=>!x.ok).length},
 dependencyAudit:read('dependency-audit.json').metadata.vulnerabilities,
 screenshots:read('screens/inspection.json'),
 productionDeployment:'Not deployed. No commit or push performed.',
 limitations:['Physical iPhone/Safari was not tested.','Contact-provider calls were mocked in tests; no real message was sent.','Three.js is an explicitly lazy-loaded chunk above the generic 500 kB minified warning threshold.','Interface captures are actual renders; internal layer diagrams and the interaction specimen are illustrative, not live client applications.'],
 source,
};
fs.writeFileSync(path.join(dir,'verification-summary.json'),JSON.stringify(summary,null,2));
console.log(JSON.stringify({unit:summary.unitTests,browser:summary.browser,accessibility:summary.accessibility,webglLifecycle:summary.webglLifecycle,prerendered:summary.productionBuild.prerenderedHTMLPages,audit:summary.dependencyAudit.total},null,2));
if(summary.browser.failed||summary.accessibility.detectedViolations||summary.webglLifecycle.failed)process.exitCode=1;
