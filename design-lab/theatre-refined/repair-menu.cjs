const fs=require('node:fs'),path=require('node:path');
const p=path.join(__dirname,'experience.js');let s=fs.readFileSync(p,'utf8');
const bad=" $('nav a',menu).forEach(a=>a.addEventListener('click',()=>";
if(!s.includes(bad))throw Error('Expected faulty generated selector missing');
s=s.replace(bad,()=>" $$('nav a',menu).forEach(a=>a.addEventListener('click',()=>");fs.writeFileSync(p,s);
const script=path.join(__dirname,'apply-pass-two.cjs');fs.writeFileSync(script,fs.readFileSync(script,'utf8').replace('return text.replace(before,after);','return text.replace(before,()=>after);'));
console.log('Corrected the menu collection selector and literal replacement handling.');
