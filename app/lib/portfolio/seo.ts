import type { MetaDescriptor } from 'react-router';
import { company } from '~/data/portfolio/catalog';
export function pageMeta(title: string,description: string,path='/',image='/media/portfolio/social-cover.jpg'): MetaDescriptor[] {
 const name=title==='KashCrop Innovations'?title:`${title} | KashCrop Innovations`;
 return [{title:name},{name:'description',content:description},{tagName:'link',rel:'canonical',href:company.url+path},{property:'og:type',content:'website'},{property:'og:site_name',content:company.name},{property:'og:title',content:name},{property:'og:description',content:description},{property:'og:url',content:company.url+path},{property:'og:image',content:company.url+image},{property:'og:image:alt',content:'KashCrop Innovations — product design, engineering and applied AI'},{name:'twitter:card',content:'summary_large_image'},{name:'twitter:title',content:name},{name:'twitter:description',content:description},{name:'twitter:image',content:company.url+image}];
}
export const organizationSchema = {'@context':'https://schema.org','@type':'Organization','@id':company.url+'/#organization',name:company.name,legalName:company.legalName,url:company.url,logo:company.url+'/kashcrop-logo.png',email:company.email,telephone:company.phoneLink,sameAs:[company.linkedin],founder:{'@type':'Person',name:company.founder}};
export function breadcrumbSchema(items:{name:string;path:string}[]) {return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,item:company.url+item.path}))};}
