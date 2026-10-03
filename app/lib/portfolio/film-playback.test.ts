import { describe, expect, it } from 'vitest';
import { canPlayFilm, createFilmCoordinator } from './film-playback';

describe('film playback policy', () => {
 const ready = { visible: true, enabled: true, pageVisible: true, reducedMotion: false, saveData: false, paused: false, failed: false };
 it('only permits visible, opted-in, foreground motion', () => {
  expect(canPlayFilm(ready)).toBe(true);
  for (const key of ['visible', 'enabled', 'pageVisible'] as const) expect(canPlayFilm({ ...ready, [key]: false })).toBe(false);
  for (const key of ['reducedMotion', 'saveData', 'paused', 'failed'] as const) expect(canPlayFilm({ ...ready, [key]: true })).toBe(false);
 });
 it('releases the previous decoder before activating the next', () => {
  const coordinator = createFilmCoordinator();
  const events: string[] = [];
  coordinator.update('hero', { score: 1, start: () => events.push('hero:start'), stop: () => events.push('hero:stop') });
  coordinator.update('reel', { score: 2, start: () => events.push('reel:start'), stop: () => events.push('reel:stop') });
  expect(events).toEqual(['hero:start', 'hero:stop', 'reel:start']);
  coordinator.remove('reel');
  expect(events.slice(-2)).toEqual(['reel:stop', 'hero:start']);
  coordinator.remove('hero');
  expect(events.at(-1)).toBe('hero:stop');
 });
 it('retains the current film on equal scores and ignores ineligible candidates', () => {
  const coordinator = createFilmCoordinator();
  const events: string[] = [];
  const candidate = (name: string, score: number) => ({score, start: () => events.push(name), stop: () => events.push('stop')});
  coordinator.update('one', candidate('one', 1));
  coordinator.update('two', candidate('two', 1));
  coordinator.update('hidden', candidate('hidden', 0));
  expect(events).toEqual(['one']);
  coordinator.update('one', candidate('one', 0));
  expect(events).toEqual(['one', 'stop', 'two']);
 });
});
