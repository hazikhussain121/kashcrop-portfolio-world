const fs=require('node:fs');const file='app/routes/contact.tsx';let s=fs.readFileSync(file,'utf8');
const a="const [errors,setErrors]=useState<InquiryErrors>({})";
if(!s.includes(a))throw Error('Contact state not found');
s=s.replace(a,()=>"const [selectedServices,setSelectedServices]=useState<string[]>([]);\n useEffect(()=>{setSelectedServices(initialType?[initialType]:[]);},[initialType]);\n const [errors,setErrors]=useState<InquiryErrors>({})");
s=s.replace('key={`${type.value}-${initialType}`}','key={type.value}');
s=s.replace('defaultChecked={initialType===type.value}',"checked={selectedServices.includes(type.value)} onChange={event=>setSelectedServices(current=>event.target.checked?[...current,type.value]:current.filter(value=>value!==type.value))}");
s=s.replace("setStatus('success');form.current?.reset();","setStatus('success');setSelectedServices(initialType?[initialType]:[]);form.current?.reset();");fs.writeFileSync(file,s);
const test='tests/portfolio/signature-mobile.spec.ts';s=fs.readFileSync(test,'utf8').replace('/Workflow What happens/','/Workflow/');fs.writeFileSync(test,s);
console.log('Made service selection reliable after static-page hydration and kept mobile tab tests independent of hidden caption text.');
