import { Link } from 'react-router';
import {
  featuredPressIds,
  getProjectPress,
  pressMentions,
  recognitionItems,
  type PressMention,
  type RecognitionItem,
} from '~/data/portfolio/press';
import { Icon } from '../Icon';
import '~/styles/portfolio/overdrive-press.css';

function ReportLink({ mention }: { mention: PressMention }) {
  return <a className="od-press-link" href={mention.href} target="_blank" rel="noopener noreferrer">
    <span>{mention.action}<span className="sr-only"> from {mention.outlet}</span></span><Icon />
  </a>;
}

function FeaturedReport({ mention, lead = false }: { mention: PressMention; lead?: boolean }) {
  return <figure className={`od-press-featured-report${lead ? ' od-press-lead' : ''}`} data-press-id={mention.id}>
    <blockquote cite={mention.href}><p>“{mention.quote}”</p></blockquote>
    <figcaption>
      <div className="od-press-byline"><h3>{mention.outlet}</h3><time dateTime={mention.published}>{mention.dateLabel}</time></div>
      <p className="od-press-context">{mention.context}</p>
      {mention.attribution && <p className="od-press-attribution">{mention.attribution}</p>}
      <ReportLink mention={mention} />
    </figcaption>
  </figure>;
}

function PressRecord({ mention }: { mention: PressMention }) {
  return <figure className="od-press-record" data-press-id={mention.id}>
    <figcaption className="od-press-record-source"><h3>{mention.outlet}</h3><time dateTime={mention.published}>{mention.dateLabel}</time></figcaption>
    <div className="od-press-record-copy">
      <blockquote cite={mention.href}><p>“{mention.quote}”</p></blockquote>
      <p className="od-press-context">{mention.context}</p>
      {mention.attribution && <p className="od-press-attribution">{mention.attribution}</p>}
      <ReportLink mention={mention} />
    </div>
  </figure>;
}

function RecognitionEntry({ item, compact = false }: { item: RecognitionItem; compact?: boolean }) {
  const Heading = compact ? 'h4' : 'h3';
  return <li className="od-recognition-entry" data-recognition-id={item.id} data-source-type={item.sourceType}>
    <Heading>{item.title}</Heading>
    <p className="od-recognition-date">{item.dateTime ? <time dateTime={item.dateTime}>{item.dateLabel}</time> : item.dateLabel}</p>
    <p className="od-recognition-description">{item.description}</p>
    <a className="od-press-link" href={item.href} target="_blank" rel="noopener noreferrer"><span>{item.source}</span><Icon /></a>
  </li>;
}

export function PressFeature() {
  const featured = featuredPressIds.map(id => pressMentions.find(mention => mention.id === id)).filter((mention): mention is PressMention => Boolean(mention));
  const [lead, ...supporting] = featured;
  const institutionalRecognition = recognitionItems.filter(item => item.sourceType === 'institution');
  if (!lead) return null;

  return <section className="od-press-feature od-press-surface" id="in-the-news" aria-labelledby="od-press-feature-title">
    <div className="od-wrap">
      <header className="od-press-heading"><h2 id="od-press-feature-title">In the news.</h2></header>
      <div className="od-press-feature-grid">
        <FeaturedReport mention={lead} lead />
        <div className="od-press-supporting">{supporting.map(mention => <FeaturedReport key={mention.id} mention={mention} />)}</div>
      </div>
      <section className="od-recognition-compact" aria-labelledby="od-recognition-compact-title">
        <h3 id="od-recognition-compact-title">Recognition.</h3>
        <ul>{institutionalRecognition.map(item => <RecognitionEntry key={item.id} item={item} compact />)}</ul>
      </section>
      <div className="od-press-feature-footer"><Link to="/about#press" className="od-press-link">All coverage & recognition <Icon /></Link></div>
    </div>
  </section>;
}

export function PressArchive() {
  return <section className="od-press-archive od-press-surface" id="press" aria-labelledby="od-press-archive-title">
    <header className="od-press-heading"><h2 id="od-press-archive-title">In the news.</h2><a href="#recognition" className="od-press-link">Recognition <Icon name="down" /></a></header>
    <div className="od-press-records">{pressMentions.map(mention => <PressRecord key={mention.id} mention={mention} />)}</div>
  </section>;
}

export function RecognitionRecord() {
  return <section className="od-recognition-record" id="recognition" aria-labelledby="od-recognition-record-title">
    <h2 id="od-recognition-record-title">Recognition.</h2>
    <ul>{recognitionItems.map(item => <RecognitionEntry key={item.id} item={item} />)}</ul>
  </section>;
}

export function ProjectPress({ projectSlug }: { projectSlug: string }) {
  const mentions = getProjectPress(projectSlug).slice(0, 3);
  if (!mentions.length) return null;

  return <section className="od-press-case od-press-surface" id="project-press" aria-labelledby="od-press-case-title">
    <div className="od-wrap">
      <header className="od-press-heading"><h2 id="od-press-case-title">In the news.</h2><Link to="/about#press" className="od-press-link">All coverage <Icon /></Link></header>
      <div className="od-press-records">{mentions.map(mention => <PressRecord key={mention.id} mention={mention} />)}</div>
    </div>
  </section>;
}
