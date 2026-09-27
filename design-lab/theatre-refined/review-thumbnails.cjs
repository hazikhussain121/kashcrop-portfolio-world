const fs=require('node:fs'),path=require('node:path'),sharp=require('../../node_modules/sharp');const out=path.join(__dirname,'evidence','pass-two');
(async()=>{const name=process.argv[2];if(!/^[a-z0-9-]+$/.test(name))throw Error('Expected review capture name');let width=420,b;
for(;width>=140;width-=40){b=await sharp(path.join(out,name+'.png')).resize({width}).webp({quality:7}).toBuffer();if(b.length<5100)break;}
fs.writeFileSync(path.join(out,name+'-thumb.webp'),b);console.log(b.toString('base64'));})();
