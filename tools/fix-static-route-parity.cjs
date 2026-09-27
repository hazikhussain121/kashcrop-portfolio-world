const fs=require('node:fs');
const file='app/components/portfolio/SiteFooter.tsx';let source=fs.readFileSync(file,'utf8');
source=source.replace("import { company }",()=>"import { normalizePathname } from '~/lib/portfolio/paths';\nimport { company }");
source=source.replace('const location=useLocation();','const location=useLocation();const isContact=normalizePathname(location.pathname)===\'/contact\';');
source=source.replaceAll("location.pathname==='/contact'",'isContact').replaceAll("location.pathname!=='/contact'",'!isContact');fs.writeFileSync(file,source);
for(const name of ['interactions','routes','signature']){
 const p=`tests/portfolio/${name}.spec.ts`;let s=fs.readFileSync(p,'utf8');
 s=s.replaceAll('/\\/projects\\/baghban$/','/\\/projects\\/baghban\\/?$/');
 s=s.replaceAll('/\\/projects\\?category=Platforms$/','/\\/projects\\/?\\?category=Platforms$/');
 s=s.replaceAll('/\\/projects\\/baghban#screen-home$/','/\\/projects\\/baghban\\/?#screen-home$/');
 fs.writeFileSync(p,s);
}
console.log('Fixed the production-only contact hydration mismatch caused by static-host trailing slashes. Native URL tests now accept equivalent directory URLs.');
