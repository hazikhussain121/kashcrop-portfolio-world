/* Build-time resources are generated from the same typed catalog the application uses. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');const esbuild=require('esbuild');const sharp=require('sharp');
const root=path.resolve(__dirname,'..');
(async()=>{
 const temp=path.join(os.tmpdir(),'kashcrop-content-'+process.pid+'.cjs');
 esbuild.buildSync({stdin:{contents:"export {projects,company} from './app/data/portfolio/catalog';export {serviceCatalog} from './app/data/portfolio/services';",resolveDir:root,loader:'ts'},bundle:true,platform:'node',format:'cjs',outfile:temp,logLevel:'silent'});
 const {projects,company,serviceCatalog}=require(temp);fs.unlinkSync(temp);
 const routes=['/','/projects','/services','/about','/contact','/privacy',...projects.map(p=>'/projects/'+p.slug),...serviceCatalog.map(s=>'/services/'+s.slug)];
 const escape=x=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 fs.writeFileSync(path.join(root,'public/sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+routes.map(r=>`  <url><loc>${escape(company.url+r)}</loc></url>`).join('\n')+'\n</urlset>\n');
 fs.writeFileSync(path.join(root,'public/robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${company.url}/sitemap.xml\n`);
 fs.writeFileSync(path.join(root,'public/llms.txt'),`# ${company.name}\n\nProduct design, engineering and applied AI. Based in Kashmir, India; incubated at SKIIE, SKUAST-Kashmir.\n\n## Work\n${projects.map(p=>`- [${p.name}](${company.url}/projects/${p.slug}): ${p.summary}`).join('\n')}\n\n## Services\n${serviceCatalog.map(s=>`- [${s.name}](${company.url}/services/${s.slug}): ${s.description}`).join('\n')}\n\n## Contact\n${company.url}/contact\n${company.email}\n\nProject screenshots are visual records, not embedded applications. Capture details appear with each project.\n`);
 const assets=[];
 for(const p of projects)for(const s of p.screens){const file=path.join(root,'public/media/portfolio',s.file);if(!fs.existsSync(file))throw Error('Missing project screenshot: '+s.file);const m=await sharp(file).metadata();if(m.width!==s.width||m.height!==s.height)throw Error(`Incorrect dimensions for ${s.file}: ${m.width}x${m.height}`);assets.push({file:s.file,width:s.width,height:s.height,bytes:fs.statSync(file).size,project:p.slug,source:p.source});}
 fs.writeFileSync(path.join(root,'public/media/portfolio/manifest.json'),JSON.stringify({captures:assets,artwork:'Additional artwork is drawn from existing company projects.',photograph:{file:'apple-orchard.webp',author:'Marek Studzinski',source:'https://unsplash.com/photos/red-apple-fruits-during-daytime-wvUYBXCgVzQ',license:'https://unsplash.com/license',use:'Stock context image, not a client field photograph.'}},null,2));
 const cover=path.join(root,'public/media/portfolio/social-cover.jpg');
 if(!fs.existsSync(cover)){const approved=path.join(root,'design-lab/theatre-refined/evidence/pass-two/hero-1440.png');if(fs.existsSync(approved))await sharp(approved).resize(1200,630,{fit:'cover',position:'top'}).jpeg({quality:88,mozjpeg:true}).toFile(cover);else {const screen=await sharp(path.join(root,'public/media/portfolio/garden-home.webp')).resize({height:520}).toBuffer();await sharp({create:{width:1200,height:630,channels:3,background:'#98172d'}}).composite([{input:screen,left:760,top:55}]).jpeg({quality:86}).toFile(cover);}}
 console.log(`Prepared ${routes.length} canonical routes, ${assets.length} verified screen assets and social metadata.`);
})().catch(e=>{console.error(e);process.exitCode=1});
