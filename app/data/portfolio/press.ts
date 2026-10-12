export interface PressMention {
  id: string;
  outlet: string;
  quote: string;
  context: string;
  published: string;
  dateLabel: string;
  href: string;
  action: 'Read story' | 'Watch report';
  kind: string;
  projectSlugs: string[];
  attribution?: string;
}

export const pressMentions: PressMention[] = [
  {
    id: 'etv-kashcrop-2025',
    outlet: 'ETV Bharat',
    quote: 'A one-of-a-kind integrated horticulture solutions app',
    context: 'An interview with Hazik about building the original KashCrop orchard app.',
    published: '2025-12-03',
    dateLabel: '3 Dec 2025',
    href: 'https://www.etvbharat.com/en/state/kashcrop-kashmir-youth-develops-app-to-help-out-apple-farmers-enn25120303879',
    action: 'Read story',
    kind: 'Interview',
    projectSlugs: ['kashcrop'],
  },
  {
    id: 'kno-hazik-2026',
    outlet: 'Kashmir News Observer',
    quote: 'a shining example of youth-led innovation and social responsibility',
    context: 'Jahangeer Ganaie’s feature on Hazik and the orchard app built in Tral.',
    published: '2026-01-01',
    dateLabel: '1 Jan 2026',
    href: 'https://www.kashmirnewsobserver.com/top-stories/tral-boy-creates-smart-mobile-app-to-transform-kashmir-s-horticulture-sector-kno-200361',
    action: 'Read story',
    kind: 'Founder feature',
    projectSlugs: ['kashcrop'],
  },
  {
    id: 'rising-phc-2026',
    outlet: 'Rising Kashmir',
    quote: 'farmers can directly interact with SKUAST-K experts',
    context: 'Coverage of the e-Plant Health Clinic app’s inauguration at SKUAST-Kashmir.',
    published: '2026-05-19',
    dateLabel: '19 May 2026',
    href: 'https://risingkashmir.com/skuast-k-launches-ai-driven-plant-health-clinic/',
    action: 'Read story',
    kind: 'App inauguration',
    projectSlugs: ['plant-health-clinic'],
  },
  {
    id: 'gk-video-kashcrop-2026',
    outlet: 'Greater Kashmir',
    quote: 'Teen from Tral creates app to provide scientific guidance to Apple Growers in Kashmir',
    context: 'GK Video Desk’s interview with Hazik about KashCrop.',
    published: '2026-01-05',
    dateLabel: '5 Jan 2026',
    href: 'https://www.greaterkashmir.com/videos/teen-from-tral-creates-app-to-provide-scientific-guidance-to-apple-growers-in-kashmir/',
    action: 'Watch report',
    kind: 'Video report',
    projectSlugs: ['kashcrop'],
    attribution: 'Publisher headline',
  },
  {
    id: 'kashmir-ahead-kashcrop-2026',
    outlet: 'Kashmir Ahead',
    quote: 'being refined under the mentorship of SKUAST-Kashmir',
    context: 'A report on KashCrop’s development with guidance from university experts.',
    published: '2026-01-06',
    dateLabel: '6 Jan 2026',
    href: 'https://kashmirahead.com/kashcrop-app-by-19-year-old-hazik-hussain-to-transform-kashmir-horticulture/',
    action: 'Read story',
    kind: 'Product feature',
    projectSlugs: ['kashcrop'],
  },
  {
    id: 'freshplaza-kashcrop-2025',
    outlet: 'FreshPlaza',
    quote: 'provide growers with weather data, crop information, and advisory tools',
    context: 'The horticulture trade publication covered the original KashCrop app.',
    published: '2025-12-04',
    dateLabel: '4 Dec 2025',
    href: 'https://www.freshplaza.com/north-america/article/9791367/kashmir-developer-launches-horticulture-support-app/',
    action: 'Read story',
    kind: 'Trade coverage',
    projectSlugs: ['kashcrop'],
    attribution: 'Adapted from ETV Bharat’s report',
  },
];

export const featuredPressIds = ['etv-kashcrop-2025', 'kno-hazik-2026', 'rising-phc-2026'];

export function getProjectPress(slug: string) {
  return pressMentions.filter(mention => mention.projectSlugs.includes(slug));
}

export interface RecognitionItem {
  id: string;
  title: string;
  description: string;
  dateLabel: string;
  dateTime?: string;
  source: string;
  href: string;
  sourceType: 'institution' | 'founder';
  projectSlugs: string[];
}

export const recognitionItems: RecognitionItem[] = [
  {
    id: 'skiie-incubation',
    title: 'Incubated at SKIIE.',
    description: 'KashCrop Innovations is listed in SKUAST-Kashmir’s startup directory, with Hazik Hussain named as founder.',
    dateLabel: 'Current affiliation',
    source: 'SKIIE startup directory',
    href: 'https://skiie.co.in/startups/kashcrop',
    sourceType: 'institution',
    projectSlugs: [],
  },
  {
    id: 'skuast-phc-commendation',
    title: 'Recognised at the app’s inauguration.',
    description: 'SKUAST-K’s Vice Chancellor commended Hazik’s work on the e-Plant Health Clinic app at the Directorate of Extension.',
    dateLabel: '18 May 2026',
    dateTime: '2026-05-18',
    source: 'SKUAST-K announcement',
    href: 'https://www.linkedin.com/posts/skuastkashmir_%F0%9D%90%92%F0%9D%90%8A%F0%9D%90%94%F0%9D%90%80%F0%9D%90%92%F0%9D%90%93-%F0%9D%90%8A%F0%9D%90%9A%F0%9D%90%AC%F0%9D%90%A1%F0%9D%90%A6%F0%9D%90%A2%F0%9D%90%AB-%F0%9D%90%8B%F0%9D%90%9A%F0%9D%90%AE%F0%9D%90%A7%F0%9D%90%9C%F0%9D%90%A1%F0%9D%90%9E%F0%9D%90%AC-activity-7464008117937381376-VmCb',
    sourceType: 'institution',
    projectSlugs: ['plant-health-clinic'],
  },
  {
    id: 'republic-day-2026',
    title: 'Republic Day recognition.',
    description: 'An award for KashCrop at District Police Lines on the 77th Republic Day, shared in Hazik’s public update.',
    dateLabel: '26 Jan 2026',
    dateTime: '2026-01-26',
    source: 'Founder’s post',
    href: 'https://www.linkedin.com/posts/hazik-hussain-49b5663a3_at-the-district-police-lines-today-receiving-activity-7421592627382304768-SIkK',
    sourceType: 'founder',
    projectSlugs: ['kashcrop'],
  },
  {
    id: 'kvk-pulwama-2026',
    title: 'KVK Pulwama felicitation.',
    description: 'Hazik’s January update records a felicitation by Dr Javaid Ahmad Mugloo for work on KashCrop.',
    dateLabel: 'January 2026',
    dateTime: '2026-01',
    source: 'Founder’s post',
    href: 'https://www.linkedin.com/posts/hazik-hussain-49b5663a3_honored-to-be-felicitated-by-dr-javaid-ahmad-activity-7417573083038912512-meDB',
    sourceType: 'founder',
    projectSlugs: ['kashcrop'],
  },
];
