const fs=require('node:fs'),path=require('node:path');
const file=path.join(__dirname,'index.html');
let html=fs.readFileSync(file,'utf8');
html=html.replace('kashcrop<span>®</span>','kashcrop');
html=html.replace(/<svg class="(icon[^"]*)">/g,'<svg class="$1" aria-hidden="true" focusable="false">');
fs.writeFileSync(file,html);
console.log('Prepared semantic icons and removed unverified registration symbol.');
