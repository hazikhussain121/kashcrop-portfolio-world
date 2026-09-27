const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const name=process.argv[2]||'anatomy-1440';if(!/^[a-z0-9-]+$/.test(name))throw Error('Invalid screenshot name');
const width=Number(process.argv[3]||440),part=process.argv[4];const folder='artifacts/signature-experience/screens';
(async()=>{const file=path.join(folder,name+'.webp');if(part===undefined){const b=await sharp(path.join(folder,name+'.png')).resize({width}).webp({quality:24}).toBuffer();fs.writeFileSync(file,b);console.log(JSON.stringify({bytes:b.length,parts:Math.ceil(b.toString('base64').length/6500)}));}else{const text=fs.readFileSync(file).toString('base64');console.log(text.slice(Number(part)*6500,(Number(part)+1)*6500));}})();
