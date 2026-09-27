import { projectTypes } from '~/data/portfolio/services';
export type Inquiry = {name:string;email:string;organization:string;phone:string;message:string;services:string[];budget:string;timeline:string};
export type InquiryErrors = Partial<Record<keyof Inquiry|'form',string>>;
const text=(data:FormData,name:string)=>{const value=data.get(name);return typeof value==='string'?value.trim():'';};
export function validateInquiry(data:FormData):{ok:true;inquiry:Inquiry}|{ok:false;errors:InquiryErrors}{
 const inquiry:Inquiry={name:text(data,'name'),email:text(data,'email').toLowerCase(),organization:text(data,'organization'),phone:text(data,'phone'),message:text(data,'message'),services:data.getAll('services').filter((v):v is string=>typeof v==='string'),budget:text(data,'budget'),timeline:text(data,'timeline')};
 const errors:InquiryErrors={};
 if(text(data,'company')||data.get('botcheck'))errors.form='Unable to submit this request.';
 if(!inquiry.name||inquiry.name.length>120)errors.name='Enter your name, up to 120 characters.';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)||inquiry.email.length>254)errors.email='Enter a valid email address.';
 if(inquiry.message.length<10||inquiry.message.length>5000)errors.message='Tell us a little about the project, between 10 and 5,000 characters.';
 if(inquiry.phone.length>50)errors.phone='Keep the phone number under 50 characters.';
 if(inquiry.organization.length>180)errors.organization='Keep the organisation name under 180 characters.';
 if(inquiry.budget.length>80||inquiry.timeline.length>80)errors.form='Please choose the budget and timeline from the available options.';
 if(inquiry.services.some(value=>!projectTypes.some(type=>type.value===value)))errors.form='Please choose a project type from the available options.';
 return Object.keys(errors).length?{ok:false,errors}:{ok:true,inquiry:{...inquiry,services:[...new Set(inquiry.services)]}};
}
export async function sendInquiry(accessKey:string,inquiry:Inquiry,signal?:AbortSignal):Promise<{ok:true}|{ok:false;message:string}>{
 const payload={access_key:accessKey,subject:`KashCrop project enquiry — ${inquiry.name}`,from_name:'KashCrop portfolio',...inquiry,services:inquiry.services.map(v=>projectTypes.find(t=>t.value===v)?.label??v).join(', ')};
 try{
  const response=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal});
  if(response.status===429)return {ok:false,message:'There have been too many attempts. Please wait a little, or email us directly.'};
  const result:unknown=await response.json();
  if(response.ok&&typeof result==='object'&&result!==null&&'success' in result&&result.success===true)return {ok:true};
  return {ok:false,message:'Your enquiry could not be delivered. Your message is still here; please try again or email us directly.'};
 }catch{return {ok:false,message:'We could not confirm delivery. Your message is still here; check your connection or email us directly.'};}
}
