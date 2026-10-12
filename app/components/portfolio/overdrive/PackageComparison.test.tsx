import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it } from 'vitest';
import { packageComparison } from '~/data/portfolio/offer';
import { PackageComparison } from './PackageComparison';

afterEach(cleanup);
function mount() { return render(<MemoryRouter><PackageComparison /></MemoryRouter>); }

describe('package comparison clarity', () => {
  it('compares only hosting, maintenance and Android publishing', () => {
    mount();
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('rowheader').map(h => h.textContent))
      .toEqual(['Server hosting', 'Maintenance', 'Google Play publishing']);
    expect(within(table).queryByText('One-time development fee.')).not.toBeInTheDocument();
    expect(screen.getByText('One-time development fee.')).toBeInTheDocument();
  });

  it('leads with KashCrop without changing mobile reading order', () => {
    mount();
    expect(screen.getAllByRole('columnheader').map(h => h.textContent))
      .toEqual(['Service', 'With KashCrop', 'Development only']);
    const row = screen.getByRole('rowheader', { name: 'Server hosting' }).closest('tr')!;
    expect(row.children[1]).toHaveClass('od-compare-managed');
    expect(row.children[2]).toHaveClass('od-compare-build');
  });

  it('retains all eight package facts exactly once', () => {
    const { container } = mount();
    const ids = [...container.querySelectorAll('[data-package-id]')].map(e => e.getAttribute('data-package-id'));
    expect(ids.sort()).toEqual(packageComparison.map(row => row.id).sort());
    expect(new Set(ids).size).toBe(8);
  });

  it('keeps the remaining details in a native disclosure', () => {
    const { container } = mount();
    const details = container.querySelector('details')!;
    expect(details).not.toHaveAttribute('open');
    expect(details.querySelector('summary')).toHaveTextContent('More package details');
    expect(details.querySelectorAll('dt')).toHaveLength(4);
    expect(details).toHaveTextContent('The account stays in your name');
    expect(details).toHaveTextContent('You give us access to manage it.');
  });

  it('keeps support and third-party conditions explicit', () => {
    const { container } = mount();
    const section = container.querySelector('#compare')!;
    expect(section).toHaveTextContent('Maintenance plans up to 4 years.');
    expect(section).toHaveTextContent('Your quote lists what we maintain and for how long.');
    expect(section).toHaveTextContent('We also manage releases for your Android app.');
    expect(section).toHaveTextContent('third-party fees');
    expect(section).toHaveTextContent('Google requires account verification and app review.');
    expect(section).toHaveTextContent('Other providers’ packages may differ.');
  });

  it('preserves real row and column associations when reflowed', () => {
    const { container } = mount();
    for (const cell of container.querySelectorAll('td[headers]')) {
      const ids = cell.getAttribute('headers')!.split(' ');
      expect(ids).toHaveLength(2);
      expect(container.querySelector(`[id="${ids[0]}"]`)).toHaveAttribute('scope', 'row');
      expect(container.querySelector(`[id="${ids[1]}"]`)).toHaveAttribute('scope', 'col');
    }
    const table = screen.getByRole('table');
    expect(container.querySelector(`[id="${table.getAttribute('aria-describedby')}"]`))
      .toHaveTextContent('A development-only job covers the software and handover');
  });

  it('supports multiple instances without duplicate document IDs', () => {
    const { container } = render(<MemoryRouter><PackageComparison id="home-compare" /><PackageComparison id="services-compare" /></MemoryRouter>);
    const ids = [...container.querySelectorAll('[id]')].map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('links to the existing contact route without submitting anything', () => {
    mount();
    expect(screen.getByRole('link', { name: 'Let’s talk' })).toHaveAttribute('href', '/contact');
  });
});
