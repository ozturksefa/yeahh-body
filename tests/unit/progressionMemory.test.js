// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  classifyProgression,
  getStoredProgressionSuggestion,
  loadProgressionMemoryEntry,
  PROGRESSION_MEMORY_KEY,
  recordProgressionMemory,
} from '../../src/progressionMemory.js';

function doneSets(weight, reps, count = 3) {
  return Array.from({ length: count }, () => ({ weight, reps, done: true }));
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 4, 6, 12, 0, 0));
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
  vi.useRealTimers();
});

describe('progression memory', () => {
  it('stores a low-friction next target for clean strength work', () => {
    const entry = recordProgressionMemory({
      exerciseName: 'Back Squat',
      blockName: 'KUVVET',
      sets: doneSets(80, 5),
      targetReps: 5,
      isUpperBody: false,
      rpe: 7,
    });

    expect(entry.profile).toBe('strength');
    expect(entry.decision.status).toBe('increase');
    expect(entry.decision.targetWeight).toBe(85);

    const saved = loadProgressionMemoryEntry('Back Squat');
    expect(saved.decision.label).toContain('85 kg');
    expect(JSON.parse(localStorage.getItem(PROGRESSION_MEMORY_KEY))).toBeTruthy();
  });

  it('does not apply the future target again on the same training date', () => {
    recordProgressionMemory({
      exerciseName: 'Bench Press',
      blockName: 'KUVVET',
      sets: doneSets(60, 6),
      targetReps: 6,
      isUpperBody: true,
      rpe: 7,
    });

    expect(getStoredProgressionSuggestion('Bench Press')).toBeNull();

    vi.setSystemTime(new Date(2026, 4, 13, 12, 0, 0));
    expect(getStoredProgressionSuggestion('Bench Press')).toMatchObject({
      weight: 62.5,
      reps: 6,
      type: 'up',
      memory: true,
    });
  });

  it('progresses accessories through reps before adding load', () => {
    const entry = recordProgressionMemory({
      exerciseName: 'Lateral Raise Machine',
      blockName: 'KUVVET — Aksesuar',
      sets: doneSets(10, 12),
      targetReps: 12,
      isUpperBody: true,
      rpe: 8,
    });

    expect(classifyProgression('Lateral Raise Machine')).toBe('accessory');
    expect(entry.decision.status).toBe('reps');
    expect(entry.decision.targetWeight).toBe(10);
    expect(entry.decision.targetReps).toBe(13);
  });

  it('pulls load down after a max-effort RPE 10 set cluster', () => {
    const entry = recordProgressionMemory({
      exerciseName: 'Bench Press',
      blockName: 'KUVVET',
      sets: doneSets(60, 6),
      targetReps: 6,
      isUpperBody: true,
      rpe: 10,
    });

    expect(entry.decision.status).toBe('reduce');
    expect(entry.decision.targetWeight).toBe(57.5);
  });
});
