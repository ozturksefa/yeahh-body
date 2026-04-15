import { describe, it, expect } from 'vitest';
import {
  calcExerciseCalories,
  calcBlockCalories,
  calcDayCalories,
} from '../../src/calorieCalc.js';

describe('calcExerciseCalories', () => {
  it('returns kcal/duration/met for a compound lift', () => {
    const result = calcExerciseCalories({ name: 'Back Squat', sets: '4 × 8' }, 75);
    expect(result.kcal).toBeGreaterThan(0);
    expect(result.durationMin).toBeGreaterThan(0);
    expect(result.met).toBe(6);
  });

  it('uses higher MET for sprint exercises', () => {
    const sprint = calcExerciseCalories({ name: 'Sprint Interval', sets: '6 × 30sn / 30sn' }, 75);
    const stretch = calcExerciseCalories({ name: 'Hamstring Stretch', sets: '3 × 30sn' }, 75);
    expect(sprint.met).toBeGreaterThan(stretch.met);
    expect(sprint.kcal).toBeGreaterThan(stretch.kcal);
  });

  it('scales kcal linearly with body weight', () => {
    const ex = { name: 'Deadlift', sets: '3 × 5' };
    const a = calcExerciseCalories(ex, 50);
    const b = calcExerciseCalories(ex, 100);
    // 100kg = 2x of 50kg → kcal should roughly double (rounding tolerance)
    expect(b.kcal).toBeCloseTo(a.kcal * 2, -1);
  });

  it('parses "20 dakika" duration correctly', () => {
    const result = calcExerciseCalories({ name: 'Circuit', sets: '20 dakika sürekli' }, 75);
    expect(result.durationMin).toBeGreaterThanOrEqual(20);
  });

  it('handles unknown exercises with sensible default', () => {
    const result = calcExerciseCalories({ name: 'Mystery Move', sets: '3 × 10' }, 75);
    expect(result.kcal).toBeGreaterThan(0);
    expect(result.met).toBe(5); // compound_moderate default
  });
});

describe('calcBlockCalories', () => {
  it('sums calories across exercises in a block', () => {
    const block = {
      name: 'Push Day',
      exercises: [
        { name: 'Bench Press', sets: '4 × 8' },
        { name: 'Push Up', sets: '3 × 12' },
      ],
    };
    const result = calcBlockCalories(block, 75);
    expect(result.kcal).toBeGreaterThan(0);
    expect(result.durationMin).toBeGreaterThan(0);
  });

  it('returns 0 for empty block', () => {
    expect(calcBlockCalories({ exercises: [] }, 75)).toEqual({ kcal: 0, durationMin: 0 });
  });
});

describe('calcDayCalories', () => {
  it('separates work / warmup / cooldown blocks', () => {
    // Block name matchers in source check for 'ısınma' / 'isinma' / 'soğuma'.
    // Use forms that lowercase cleanly into those tokens.
    const day = {
      blocks: [
        { name: 'ISINMA', exercises: [{ name: 'Cat Cow', sets: '2 × 10' }] },
        { name: 'Ana Çalışma', exercises: [{ name: 'Squat', sets: '4 × 8' }] },
        { name: 'soğuma bölümü', exercises: [{ name: 'Stretch', sets: '3 × 30sn' }] },
      ],
    };
    const result = calcDayCalories(day, 75);
    expect(result.warmup).toBeGreaterThan(0);
    expect(result.work).toBeGreaterThan(0);
    expect(result.cooldown).toBeGreaterThan(0);
    expect(result.total).toBe(result.work + result.warmup + result.cooldown);
  });

  it('handles day with no blocks', () => {
    expect(calcDayCalories({ blocks: [] }, 75)).toEqual({
      total: 0, work: 0, warmup: 0, cooldown: 0, durationMin: 0,
    });
  });
});
