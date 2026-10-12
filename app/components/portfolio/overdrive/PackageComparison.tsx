import { Link } from 'react-router';
import { buildOnlyScope, offerScope, packageComparison } from '~/data/portfolio/offer';
import { Icon } from '~/components/portfolio/Icon';
import '~/styles/portfolio/overdrive-package-comparison.css';

export type PackageComparisonProps = { id?: string };

/** One source of package facts, shared by Home and Services. */
export function PackageComparison({ id = 'compare' }: PackageComparisonProps) {
  const headingId = id + '-title';
  const baselineId = id + '-baseline';
  const buildColumnId = id + '-build-only';
  const managedColumnId = id + '-managed';

  return <section className="od-compare" id={id} aria-labelledby={headingId}>
    <div className="od-wrap">
      <div className="od-compare-heading">
        <h2 className="od-compare-title" id={headingId}>THE WHOLE<br /><span>PACKAGE.</span></h2>
        <p className="od-compare-intro">The software, its launch and what comes next. Compare the responsibilities you want covered in one agreed package.</p>
      </div>

      <p className="od-compare-baseline" id={baselineId}>{buildOnlyScope}</p>

      <table className="od-compare-table" role="table" aria-describedby={baselineId}>
        <caption className="od-compare-sr-only">Build-only scope and the KashCrop managed package, compared across development, launch and ongoing care.</caption>
        <colgroup><col className="od-compare-feature-col" /><col className="od-compare-build-col" /><col className="od-compare-managed-col" /></colgroup>
        <thead role="rowgroup">
          <tr role="row">
            <th scope="col" role="columnheader">Feature</th>
            <th scope="col" role="columnheader" id={buildColumnId}>Build-only scope</th>
            <th scope="col" role="columnheader" id={managedColumnId} className="od-compare-managed">KashCrop package<span>Build, launch &amp; care</span></th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {packageComparison.map(row => {
            const rowId = id + '-row-' + row.id;
            return <tr key={row.id} role="row">
              <th scope="row" role="rowheader" id={rowId}>{row.feature}</th>
              <td role="cell" headers={rowId + ' ' + buildColumnId} className="od-compare-build">
                <span className="od-compare-mobile-label" aria-hidden="true">Build-only scope</span>
                <span className="od-compare-build-copy">{row.buildOnly}</span>
              </td>
              <td role="cell" headers={rowId + ' ' + managedColumnId} className="od-compare-managed">
                <span className="od-compare-mobile-label" aria-hidden="true">KashCrop package</span>
                <strong>{row.answer}</strong>
                <span className="od-compare-detail">{row.detail}</span>
              </td>
            </tr>;
          })}
        </tbody>
      </table>

      <div className="od-compare-bottom">
        <p className="od-compare-terms">{offerScope}</p>
        <Link className="od-compare-action" to="/contact">Get a scoped quote<Icon name="arrow" /></Link>
      </div>
    </div>
  </section>;
}
