// Read-only baseline outside the refinement. Writes restricted to this design lab.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=__dirname,repo=path.resolve(root,'../..');
const out=path.join(root,'evidence','pass-two'),backup=path.join(root,'checkpoints','before-pass-two');
fs.mkdirSync(out,{recursive:true});fs.mkdirSync(backup,{recursive:true});
for(const name of ['index.html','foundation.css','stage.css','portfolio.css','viewer.css','projects.js','experience.js','viewer.js']){
 const src=path.join(root,name),dest=path.join(backup,name);if(!fs.existsSync(dest))fs.copyFileSync(src,dest);
}
const paths=['app','package.json','package-lock.json','DESIGN.md','PRODUCT.md','AGENTS.md','react-router.config.ts'];
const manifest={};function scan(p){if(!fs.existsSync(p))return;const st=fs.statSync(p);if(st.isDirectory()){for(const n of fs.readdirSync(p))scan(path.join(p,n));}else manifest[path.relative(repo,p)]=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');}
for(const p of paths)scan(path.join(repo,p));fs.writeFileSync(path.join(out,'production-baseline.json'),JSON.stringify(manifest,null,2));
console.log('Checkpoint preserved; '+Object.keys(manifest).length+' existing app/config files fingerprinted.');
