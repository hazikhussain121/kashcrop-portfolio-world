const fs=require('node:fs');const file='package.json';const p=JSON.parse(fs.readFileSync(file,'utf8'));fs.writeFileSync('artifacts/production-migration/package-before-toolchain.json',JSON.stringify(p,null,2));
for(const name of ['@react-router/cloudflare']){delete p.dependencies[name];delete p.devDependencies[name];}
for(const name of ['@cloudflare/vite-plugin','@tailwindcss/vite','tailwindcss'])delete p.devDependencies[name];
p.dependencies['react-router']='^7.18.4';p.dependencies['@react-router/serve']='^7.18.4';
p.devDependencies['@react-router/dev']='^7.18.4';p.devDependencies['@cloudflare/workers-types']='^5.20260920.1';p.devDependencies.wrangler='^4.135.0';p.devDependencies.vite='^7.3.6';p.devDependencies.vitest='^4.1.11';p.devDependencies.sharp='^0.35.4';p.devDependencies.esbuild='^0.28.1';
p.engines={node:'>=22.12.0'};fs.writeFileSync(file,JSON.stringify(p,null,2)+'\n');console.log('Updated compatible router-v7 tooling; removed unused Cloudflare/Tailwind plugins. No forced peer resolution.');
