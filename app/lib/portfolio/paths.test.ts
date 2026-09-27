import { describe, expect, it } from 'vitest';
import { normalizePathname } from './paths';
describe('static host route parity', () => {
 it.each([['/','/'],['/contact','/contact'],['/contact/','/contact'],['/projects/baghban/','/projects/baghban'],['/contact//','/contact']])('normalizes %s without changing the route identity', (input, expected) => {
  expect(normalizePathname(input)).toBe(expected);
 });
 it('does not mistake a longer route for the contact page', () => {
  expect(normalizePathname('/contact-history/')).not.toBe('/contact');
 });
});
