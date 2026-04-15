import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  findFoodsByQuery,
  formatDate,
  getHybridNutritionContext,
  getMealLabel,
  getSessionNutritionSuggestions,
  getSmartSuggestions,
} from '../../src/nutrition/nutritionUtils.js';
import { shiftLocalDate, todayLocalDate } from '../../src/dateUtils.js';

// ─── findFoodsByQuery ──────────────────────────────────────────────
describe('findFoodsByQuery', () => {
  it('returns matching foods in query order', () => {
    const result = findFoodsByQuery(['Muz', 'Somon']);
    expect(result).toHaveLength(2);
    expect(result[0].name).toMatch(/muz/i);
    expect(result[1].name).toMatch(/somon/i);
  });

  it('deduplicates when two queries match the same food', () => {
    const result = findFoodsByQuery(['Muz', 'muz (1 adet)']);
    expect(result).toHaveLength(1);
  });

  it('silently skips unknown queries', () => {
    const result = findFoodsByQuery(['thisfooddoesnotexist', 'Muz']);
    expect(result).toHaveLength(1);
    expect(result[0].name).toMatch(/muz/i);
  });

  it('returns an empty array for empty input', () => {
    expect(findFoodsByQuery([])).toEqual([]);
  });

  it('is case-insensitive', () => {
    expect(findFoodsByQuery(['MUZ'])[0].name).toMatch(/muz/i);
    expect(findFoodsByQuery(['muz'])[0].name).toMatch(/muz/i);
  });
});

// ─── getMealLabel ──────────────────────────────────────────────────
describe('getMealLabel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    ['08:00', 'Kahvaltı'],
    ['11:30', 'Öğle Öncesi'],
    ['13:30', 'Öğle'],
    ['16:00', 'İkindi'],
    ['20:00', 'Akşam'],
    ['23:00', 'Gece'],
  ])('returns correct label for %s', (time, expected) => {
    const [hour, minute] = time.split(':').map(Number);
    vi.setSystemTime(new Date(2026, 3, 15, hour, minute));
    expect(getMealLabel()).toBe(expected);
  });
});

// ─── formatDate ────────────────────────────────────────────────────
describe('formatDate', () => {
  it('returns "Bugün" for today', () => {
    expect(formatDate(todayLocalDate())).toBe('Bugün');
  });

  it('returns "Dün" for yesterday', () => {
    expect(formatDate(shiftLocalDate(todayLocalDate(), -1))).toBe('Dün');
  });

  it('returns localized date for older dates', () => {
    const twoWeeksAgo = shiftLocalDate(todayLocalDate(), -14);
    const result = formatDate(twoWeeksAgo);
    expect(result).not.toBe('Bugün');
    expect(result).not.toBe('Dün');
    // Turkish localeDateString with day+month format
    expect(result).toMatch(/\d/);
  });
});

// ─── getSmartSuggestions ───────────────────────────────────────────
describe('getSmartSuggestions', () => {
  const targets = { calories: 2200, protein: 150, carbs: 250, fat: 70 };

  beforeEach(() => {
    vi.useFakeTimers();
    // Use a mid-afternoon time so meal-based suggestions don't fire
    vi.setSystemTime(new Date(2026, 3, 15, 14, 0));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('celebrates when calorie goal is reached', () => {
    const s = getSmartSuggestions(
      { calories: 2300, protein: 160, carbs: 260, fat: 80 },
      targets
    );
    expect(s.some((x) => x.type === 'good' && x.text.includes('Kalori'))).toBe(true);
  });

  it('warns when protein deficit is large and includes food suggestions', () => {
    const s = getSmartSuggestions(
      { calories: 1200, protein: 50, carbs: 120, fat: 30 },
      targets
    );
    const proteinWarn = s.find((x) => x.type === 'warn' && x.text.includes('protein'));
    expect(proteinWarn).toBeDefined();
    expect(Array.isArray(proteinWarn.foods)).toBe(true);
    expect(proteinWarn.foods.length).toBeGreaterThan(0);
    expect(proteinWarn.foods.every((f) => f.cat === 'Protein')).toBe(true);
  });

  it('says protein is complete when target is met', () => {
    const s = getSmartSuggestions(
      { calories: 1500, protein: 160, carbs: 180, fat: 50 },
      targets
    );
    expect(s.some((x) => x.type === 'good' && x.text.includes('Protein'))).toBe(true);
  });

  it('shows close-to-calorie-goal hint when < 300 kcal remains', () => {
    const s = getSmartSuggestions(
      { calories: 2000, protein: 100, carbs: 200, fat: 60 },
      targets
    );
    expect(s.some((x) => x.type === 'info' && x.text.includes('kcal kaldı'))).toBe(true);
  });

  it('fires a morning-breakfast hint when applicable', () => {
    vi.setSystemTime(new Date(2026, 3, 15, 8, 0));
    const s = getSmartSuggestions(
      { calories: 50, protein: 5, carbs: 10, fat: 2 },
      targets
    );
    expect(s.some((x) => x.type === 'meal' && x.icon === '🌅')).toBe(true);
  });
});

// ─── getSessionNutritionSuggestions ────────────────────────────────
describe('getSessionNutritionSuggestions', () => {
  it('returns empty array when session is not completed', () => {
    expect(getSessionNutritionSuggestions(null, null)).toEqual([]);
    expect(
      getSessionNutritionSuggestions({ post: { completed: false } }, null)
    ).toEqual([]);
  });

  it('adds high-RPE recovery suggestion when RPE >= 8', () => {
    const session = {
      pre: { shoulder: 0, knee: 0, spine: 0 },
      post: { completed: true, rpe: 8, shoulderAfter: 0, kneeAfter: 0, spineAfter: 0 },
    };
    const s = getSessionNutritionSuggestions(session, null);
    expect(s.some((x) => x.icon === '🍚')).toBe(true);
  });

  it('adds hydration suggestion when cardio is high', () => {
    const session = {
      pre: { shoulder: 0, knee: 0, spine: 0 },
      post: { completed: true, rpe: 5, cardio: 'fazla', shoulderAfter: 0, kneeAfter: 0, spineAfter: 0 },
    };
    const s = getSessionNutritionSuggestions(session, null);
    expect(s.some((x) => x.icon === '💧')).toBe(true);
  });

  it('flags symptom escalation after session', () => {
    const session = {
      pre: { shoulder: 0, knee: 0, spine: 0 },
      post: { completed: true, rpe: 5, shoulderAfter: 4, kneeAfter: 0, spineAfter: 0 },
    };
    const s = getSessionNutritionSuggestions(session, null);
    expect(s.some((x) => x.icon === '🛠')).toBe(true);
  });

  it('suggests recovery food when nextAction is azalt', () => {
    const session = {
      pre: { shoulder: 0, knee: 0, spine: 0 },
      post: { completed: true, rpe: 5, nextAction: 'azalt', shoulderAfter: 0, kneeAfter: 0, spineAfter: 0 },
    };
    const s = getSessionNutritionSuggestions(session, null);
    expect(s.some((x) => x.icon === '🔁')).toBe(true);
  });
});

// ─── getHybridNutritionContext ─────────────────────────────────────
describe('getHybridNutritionContext', () => {
  it('returns null when day is falsy', () => {
    expect(getHybridNutritionContext(null, 'home')).toBeNull();
    expect(getHybridNutritionContext(undefined, 'home')).toBeNull();
  });

  it('detects rest days', () => {
    const result = getHybridNutritionContext({ type: 'offday', sub: 'PAZ' }, 'home');
    expect(result.dayType).toBe('rest');
    expect(result.label).toContain('PAZ');
  });

  it('picks cardio context from recovery/zone 2 focus', () => {
    const result = getHybridNutritionContext(
      { type: 'training', sub: 'ÇAR', focus: 'Recovery + Zone 2 cardio' },
      'gym'
    );
    expect(result.dayType).toBe('cardio');
  });

  it('picks functional context from athletic volume focus', () => {
    const result = getHybridNutritionContext(
      { type: 'training', sub: 'SAL', focus: 'Athletic Volume — posterior chain' },
      'gym'
    );
    expect(result.dayType).toBe('functional');
  });

  it('falls back to strength for unknown focus', () => {
    const result = getHybridNutritionContext(
      { type: 'training', sub: 'PER', focus: 'Base pull' },
      'home'
    );
    expect(result.dayType).toBe('strength');
  });
});
