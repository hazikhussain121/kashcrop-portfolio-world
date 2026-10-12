import { Link } from 'react-router';
import { buildOnlyScope, offerScope, packageFundamentals, packageHighlights, packagePrice } from '~/data/portfolio/offer';
import { Icon } from '~/components/portfolio/Icon';
import '~/styles/portfolio/overdrive-package-comparison.css';

export type PackageComparisonProps = { id?: string };

/** Home and Services share the same scope facts and mobile reading order. */
export function PackageComparison({ id = 'compare' }: PackageComparisonProps) {
  const headingId = id + '-title';
  const baselineId = id + '-baseline';
  const buildColumnId = id + '-build-only';
  const managedColumnId = id + '-managed';

  return <section className="od-compare" id={id} aria-labelledby={headingId}>
    <div className="od-wrap">
      <div className="od-compare-heading">
        <h2 className="od-compare-title" id={headingId}>BEYOND<br />THE BUILD.</h2>
        <p className="od-compare-intro">Hosting, publishing and maintenance, planned with your software.</p>
      </div>

      <p className="od-compare-price" data-package-id={packagePrice.id}>
        <strong>{packagePrice.answer}</strong>
        <span>{packagePrice.detail}</span>
      </p>

      <div className="od-compare-sheet">
        <table className="od-compare-table" role="table" aria-describedby={baselineId}>
          <caption className="od-compare-sr-only">Launch and ongoing services: with KashCrop compared with a development-only scope.</caption>
          <colgroup><col className="od-compare-feature-col" /><col className="od-compare-managed-col" /><col className="od-compare-build-col" /></colgroup>
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col" role="columnheader">Service</th>
              <th scope="col" role="columnheader" id={managedColumnId} className="od-compare-managed">With KashCrop</th>
              <th scope="col" role="columnheader" id={buildColumnId}>Development only</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {packageHighlights.map(row => {
              const rowId = id + '-row-' + row.id;
              return <tr key={row.id} role="row" data-package-id={row.id}>
                <th scope="row" role="rowheader" id={rowId}>{row.feature}</th>
                <td role="cell" headers={rowId + ' ' + managedColumnId} className="od-compare-managed">
                  <span className="od-compare-mobile-label" aria-hidden="true">KashCrop</span>
                  <div className="od-compare-value">
                    <strong>{row.answer}</strong>
                    <span className="od-compare-detail">{row.detail}</span>
                  </div>
                </td>
                <td role="cell" headers={rowId + ' ' + buildColumnId} className="od-compare-build">
                  <span className="od-compare-mobile-label" aria-hidden="true">Development only</span>
                  <span className="od-compare-build-copy">{row.buildOnly}</span>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
        <p className="od-compare-baseline" id={baselineId}>{buildOnlyScope}</p>
      </div>

      <details className="od-compare-included">
        <summary>What else is included?<Icon name="down" /></summary>
        <dl className="od-compare-fundamentals">
          {packageFundamentals.map(row => <div key={row.id} data-package-id={row.id}>
            <dt>{row.answer}</dt>
            <dd>{row.detail}</dd>
          </div>)}
        </dl>
      </details>

      <div className="od-compare-bottom">
        <p className="od-compare-terms">{offerScope}</p>
        <Link className="od-compare-action" to="/contact">Let’s talk<Icon name="arrow" /></Link>
      </div>
    </div>
  </section>;
}
