// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatLocalDate } from '../../src/dateUtils.js';

// Mock supabase so suggestWeight falls through to localStorage backend.
// The mock has to be declared before importing the module under test.
vi.mock('../../src/supabaseClient.js', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(async () => ({ data: { user: null } })),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn(async () => ({ data: null })),
    })),
  },
}));

const { suggestWeight } = await import('../../src/tracker.js');

const DAY_INDEX = 5;
const EXERCISE = 'Back Squat';
const LS_KEY = 'nisus_tracker';
const RPE_KEY = `yb_rpe_${DAY_INDEX}_${EXERCISE}`;

function writeHistory(days) {
  // days: [{ daysAgo: 0, sets: [...] }, ...] — most recent first
  const tracker = {};
  days.forEach(({ daysAgo, sets }) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const key = `${formatLocalDate(date)}_day${DAY_INDEX}`;
    tracker[key] = { exercises: { [EXERCISE]: sets } };
  });
  localStorage.setItem(LS_KEY, JSON.stringify(tracker));
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe('suggestWeight — no history', () => {
  it('returns null when no prior session exists', async () => {
    const result = await suggestWeight(EXERCISE, 3, 5, false, DAY_INDEX);
    expect(result).toBeNull();
  });

  it('returns null when last session has empty sets', async () => {
    writeHistory([{ daysAgo: 0, sets: [] }]);
    const result = await suggestWeight(EXERCISE, 3, 5, false, DAY_INDEX);
    expect(result).toBeNull();
  });

  it('returns "first" hint when last session has zero weights', async () => {
    writeHistory([{ daysAgo: 0, sets: [{ weight: 0, reps: 5, done: true }] }]);
    const result = await suggestWeight(EXERCISE, 3, 5, false, DAY_INDEX);
    expect(result).toEqual({ weight: 0, reason: expect.stringContaining('İlk seans'), type: 'first' });
  });
});

describe('suggestWeight — RPE-based decisions', () => {
  it('RPE 10 → decreases weight by increment', async () => {
    writeHistory([
      { daysAgo: 0, sets: [
        { weight: 80, reps: 5, done: true },
        { weight: 80, reps: 5, done: true },
        { weight: 80, reps: 5, done: true },
      ]},
    ]);
    localStorage.setItem(RPE_KEY, '10');

    const result = await suggestWeight(EXERCISE, 3, 5, false, DAY_INDEX);
    expect(result.type).toBe('down');
    expect(result.weight).toBe(75); // 80 - 5kg (lower body increment)
    expect(result.rpe).toBe(10);
  });

  it('RPE 9 → keeps weight the same', async () => {
    writeHistory([
      { daysAgo: 0, sets: [
        { weight: 80, reps: 5, done: true },
        { weight: 80, reps: 5, done: true },
        { weight: 80, reps: 5, done: true },
      ]},
    ]);
    localStorage.setItem(RPE_KEY, '9');

    const result = await suggestWeight(EXERCISE, 3, 5, false, DAY_INDEX);
    expect(result.type).toBe('down');
    expect(result.weight).toBe(80);
    expect(result.rpe).toBe(9);
  });

  it('RPE 7 + all sets done → increases by upper-body increment (2.5kg)', async () => {
    writeHistory([
      { daysAgo: 0, sets: [
        { weight: 40, reps: 8, done: true },
        { weight: 40, reps: 8, done: true },
        { weight: 40, reps: 8, done: true },
      ]},
    ]);
    localStorage.setItem(RPE_KEY, '7');

    const result = await suggestWeight(EXERCISE, 3, 8, true, DAY_INDEX); // isUpperBody = true
    expect(result.type).toBe('up');
    expect(result.weight).toBe(42.5);
    expect(result.confident).toBe(true);
  });

  it('RPE 6 + all sets done → increases by lower-body increment (5kg)', async () => {
    writeHistory([
      { daysAgo: 0, sets: [
        { weight: 80, reps: 5, done: true },
        { weight: 80, reps: 5, done: true },
        { weight: 80, reps: 5, done: true },
      ]},
    ]);
    localStorage.setItem(RPE_KEY, '6');

    const result = await suggestWeight(EXERCISE, 3, 5, false, DAY_INDEX);
    expect(result.type).toBe('up');
    expect(result.weight).toBe(85);
    expect(result.confident).toBe(true);
  });
});

describe('suggestWeight — 2 consecutive sessions', () => {
  it('two sessions fully completed at same weight → increase (even without RPE)', async () => {
    writeHistory([
      { daysAgo: 0, sets: [
        { weight: 70, reps: 5, done: true },
        { weight: 70, reps: 5, done: true },
        { weight: 70, reps: 5, done: true },
      ]},
      { daysAgo: 7, sets: [
        { weight: 70, reps: 5, done: true },
        { weight: 70, reps: 5, done: true },
        { weight: 70, reps: 5, done: true },
      ]},
    ]);

    const result = await suggestWeight(EXERCISE, 3, 5, false, DAY_INDEX);
    expect(result.type).toBe('up');
    expect(result.weight).toBe(75);
    expect(result.confident).toBe(true);
  });
});

describe('suggestWeight — single completion without RPE', () => {
  it('returns "confirm" hint asking for one more session', async () => {
    writeHistory([
      { daysAgo: 0, sets: [
        { weight: 70, reps: 5, done: true },
        { weight: 70, reps: 5, done: true },
        { weight: 70, reps: 5, done: true },
      ]},
    ]);

    const result = await suggestWeight(EXERCISE, 3, 5, false, DAY_INDEX);
    expect(result.type).toBe('confirm');
    expect(result.weight).toBe(70);
    expect(result.reason).toContain('bir seans daha');
  });
});

describe('suggestWeight — incomplete last session', () => {
  it('returns "same" hint when at least one set is missed', async () => {
    writeHistory([
      { daysAgo: 0, sets: [
        { weight: 80, reps: 5, done: true },
        { weight: 80, reps: 4, done: true },  // reps < target (5)
        { weight: 80, reps: 3, done: false },
      ]},
    ]);

    const result = await suggestWeight(EXERCISE, 3, 5, false, DAY_INDEX);
    expect(result.type).toBe('same');
    expect(result.weight).toBe(80);
    expect(result.reason).toContain('eksik');
  });
});
