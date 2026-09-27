import {afterEach,describe,expect,it,vi} from 'vitest';
import {sendInquiry,validateInquiry,type Inquiry} from './inquiry';
const sample:Inquiry={name:'Test Person',email:'test@example.invalid',organization:'Example',phone:'',message:'A useful product for an existing workflow.',services:['platform'],budget:'',timeline:''};
function form(changes:Record<string,string>={}){const data=new FormData();for(const [k,v]of Object.entries({...sample,...changes}))if(Array.isArray(v))v.forEach(x=>data.append(k,x));else data.set(k,v);return data;}
afterEach(()=>vi.unstubAllGlobals());
describe('inquiry validation',()=>{
 it('accepts a valid enquiry without optional contact details',()=>expect(validateInquiry(form())).toEqual({ok:true,inquiry:sample}));
 it('normalises email and trims text',()=>{const result=validateInquiry(form({name:' Test Person ',email:' TEST@EXAMPLE.INVALID '}));expect(result.ok&&result.inquiry.email).toBe('test@example.invalid');});
 for(const [field,value]of [['name',''],['email','not-an-email'],['message','tiny'],['message','a'.repeat(5001)],['name','a'.repeat(121)],['organization','a'.repeat(181)],['phone','1'.repeat(51)]])it(`rejects invalid ${field} (${value.length} characters)`,()=>{const result=validateInquiry(form({[field]:value}));expect(result.ok).toBe(false);if(!result.ok)expect(result.errors[field as keyof typeof result.errors]).toBeTruthy();});
 it('rejects honeypot submissions',()=>expect(validateInquiry(form({company:'spam'})).ok).toBe(false));
 it('rejects unknown service options',()=>expect(validateInquiry(form({services:'fake-service'})).ok).toBe(false));
 it('deduplicates legitimate services',()=>{const data=form();data.append('services','platform');const result=validateInquiry(data);expect(result.ok&&result.inquiry.services).toEqual(['platform']);});
});
describe('contact delivery — provider responses are mocked',()=>{
 it('confirms only an explicit provider success',async()=>{const fetcher=vi.fn().mockResolvedValue({ok:true,status:200,json:async()=>({success:true})});vi.stubGlobal('fetch',fetcher);expect(await sendInquiry('test-public-key',sample)).toEqual({ok:true});const args=fetcher.mock.calls[0];expect(args[0]).toBe('https://api.web3forms.com/submit');const body=JSON.parse(args[1].body);expect(body.services).toBe('App or platform');expect(body.message).toBe(sample.message);});
 it('never claims delivery on a provider rejection',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,status:200,json:async()=>({success:false})}));expect((await sendInquiry('test',sample)).ok).toBe(false);});
 it('handles rate limits explicitly',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:false,status:429}));const result=await sendInquiry('test',sample);expect(!result.ok&&result.message).toMatch(/too many attempts/i);});
 it('keeps a network failure distinct from confirmed delivery',async()=>{vi.stubGlobal('fetch',vi.fn().mockRejectedValue(new TypeError('Network error')));const result=await sendInquiry('test',sample);expect(!result.ok&&result.message).toMatch(/could not confirm delivery/i);});
 it('rejects invalid JSON and propagates cancellation to fetch',async()=>{const signal=new AbortController().signal;const fetcher=vi.fn().mockResolvedValue({ok:true,status:200,json:async()=>{throw Error('invalid json');}});vi.stubGlobal('fetch',fetcher);expect((await sendInquiry('test',sample,signal)).ok).toBe(false);expect(fetcher.mock.calls[0][1].signal).toBe(signal);});
});
