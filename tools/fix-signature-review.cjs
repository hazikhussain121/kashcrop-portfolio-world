const fs=require('node:fs');
function patch(file,before,after){const s=fs.readFileSync(file,'utf8');if(!s.includes(before))throw Error('Expected source missing: '+file);fs.writeFileSync(file,s.replace(before,()=>after));}
patch('app/components/portfolio/signature/ProductAnatomy.tsx','className="anatomy-visual" data-renderer','className="anatomy-visual" role="img" data-renderer');
// The actual screenshot-based responsive showcase now belongs to its dedicated project.
patch('tests/portfolio/interactions.spec.ts',"test('responsive showcase and motion preference survive navigation',async({page})=>{await page.goto('/');","test('responsive showcase and motion preference survive navigation',async({page})=>{await page.goto('/projects/baghban');");
console.log('Corrected anatomy semantics and the test route for the retained responsive showcase.');
