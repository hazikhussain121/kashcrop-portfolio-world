const fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..');const mode=process.argv[2]==='dev'?'dev':'preview';const port=Number(process.argv[3]||(mode==='dev'?5199:5198));const logDir=path.join(root,'artifacts/production-migration');fs.mkdirSync(logDir,{recursive:true});
(async()=>{
 const url=`http://127.0.0.1:${port}`;
 try{const response=await fetch(url,{signal:AbortSignal.timeout(1500)});const text=await response.text();if(text.includes('KashCrop')){console.log(`KashCrop is already available at ${url}`);return;}throw Error(`Port ${port} is occupied by another application.`);}catch(e){if(!String(e).includes('fetch failed')&&!String(e).includes('aborted')&&!String(e).includes('timed out'))throw e;}
 const bin=mode==='dev'?'node_modules/@react-router/dev/bin.js':'node_modules/@react-router/serve/bin.js';const args=mode==='dev'?['dev','--host','127.0.0.1','--port',String(port)]:['./build/server/index.js'];
 const output=fs.openSync(path.join(logDir,`${mode}-${port}.log`),'a'),error=fs.openSync(path.join(logDir,`${mode}-${port}-error.log`),'a');
 const child=spawn(process.execPath,[path.join(root,bin),...args],{cwd:root,env:{...process.env,HOST:'127.0.0.1',PORT:String(port)},detached:true,stdio:['ignore',output,error],windowsHide:true});
 child.unref();fs.writeFileSync(path.join(logDir,`${mode}-${port}.pid`),String(child.pid));
 console.log(`Started ${mode} process ${child.pid}; ${url}`);
})().catch(e=>{console.error(e.message);process.exitCode=1});
