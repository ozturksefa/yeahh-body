import { describe, it, expect } from 'vitest';
import {
  formatLocalDate,
  shiftLocalDate,
  todayLocalDate,
  yesterdayLocalDate,
  daysAgoLocal,
} from '../../src/dateUtils.js';

describe('formatLocalDate', () => {
  it('formats date as YYYY-MM-DD with zero padding', () => {
    expect(formatLocalDate(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(formatLocalDate(new Date(2026, 11, 31))).toBe('2026-12-31');
  });

  it('uses current date when no arg passed', () => {
    const result = formatLocalDate();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('shiftLocalDate', () => {
  it('adds positive days', () => {
    expect(shiftLocalDate('2026-01-01', 1)).toBe('2026-01-02');
    expect(shiftLocalDate('2026-01-31', 1)).toBe('2026-02-01');
    expect(shiftLocalDate('2026-12-31', 1)).toBe('2027-01-01');
  });

  it('subtracts when days is negative', () => {
    expect(shiftLocalDate('2026-01-01', -1)).toBe('2025-12-31');
    expect(shiftLocalDate('2026-03-01', -1)).toBe('2026-02-28');
  });

  it('handles leap years', () => {
    expect(shiftLocalDate('2024-02-28', 1)).toBe('2024-02-29');
    expect(shiftLocalDate('2024-03-01', -1)).toBe('2024-02-29');
  });

  it('returns same date when days is 0', () => {
    expect(shiftLocalDate('2026-04-15', 0)).toBe('2026-04-15');
  });
});

describe('todayLocalDate / yesterdayLocalDate / daysAgoLocal', () => {
  it('todayLocalDate returns valid YYYY-MM-DD', () => {
    expect(todayLocalDate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('yesterdayLocalDate is 1 day before today', () => {
    expect(yesterdayLocalDate()).toBe(shiftLocalDate(todayLocalDate(), -1));
  });

  it('daysAgoLocal(7) is one week before today', () => {
    expect(daysAgoLocal(7)).toBe(shiftLocalDate(todayLocalDate(), -7));
  });
});
