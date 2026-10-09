import { redirect, useLoaderData, type LoaderFunctionArgs, type MetaFunction } from 'react-router';
import { getProject, projectAliases } from '~/data/portfolio/catalog';
import FieldworkBaghBani from '~/components/portfolio/FieldworkBaghBani';
import FieldworkClinic from '~/components/portfolio/FieldworkClinic';
import FieldworkCaseFile from '~/components/portfolio/FieldworkCaseFile';
import { breadcrumbSchema, pageMeta } from '~/lib/portfolio/seo';

export function loader({params,request}:Pick<LoaderFunctionArgs,'params'|'request'>) {
  const slug=params.slug??'';
  if(projectAliases[slug])throw redirect('/projects/'+projectAliases[slug]+new URL(request.url).search,301);
  const project=getProject(slug);
  if(!project)throw new Response('Project not found',{status:404});
  return {project};
}
export const meta:MetaFunction<typeof loader>=({data})=>data?.project?[
  ...pageMeta(data.project.name,data.project.summary,'/projects/'+data.project.slug),
  {'script:ld+json':breadcrumbSchema([{name:'Home',path:'/'},{name:'Selected work',path:'/projects'},{name:data.project.name,path:'/projects/'+data.project.slug}])},
]:pageMeta('Project not found','Return to the KashCrop portfolio.','/projects');

export default function ProjectPage(){
  const {project}=useLoaderData<typeof loader>();
  if(project.slug==='baghban')return <FieldworkBaghBani project={project}/>;
  if(project.slug==='plant-health-clinic')return <FieldworkClinic project={project}/>;
  return <FieldworkCaseFile project={project}/>;
}
