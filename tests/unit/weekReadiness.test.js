import { describe, expect, it } from 'vitest';
import { getWeekReadiness } from '../../src/hybrid/shared.js';

const trainingDays = [
  { sub: 'SALI', type: 'training', focus: 'Torso Kuvvet + Kontrollü Power' },
  { sub: 'PERŞEMBE', type: 'training', focus: 'Limbs Kuvvet + Alt Gövde Kontrol' },
  { sub: 'CUMARTESİ', type: 'training', focus: 'Athletic Full Body + Threshold' },
  { sub: 'PAZAR', type: 'training', focus: 'Toparlanma Kuvveti + Zone 2' },
];

function entry(day, patch = {}) {
  return {
    date: '2026-05-05',
    day,
    mode: 'home',
    pre: { shoulder: 0, knee: 0, spine: 0 },
    post: {
      completed: true,
      rpe: '7',
      cardio: 'uygun',
      shoulderAfter: 0,
      kneeAfter: 0,
      spineAfter: 0,
      nextAction: 'aynı',
      ...patch,
    },
  };
}

describe('getWeekReadiness', () => {
  it('allows progression when main sessions, reps, and recovery signals are clean', () => {
    const result = getWeekReadiness({
      completedEntries: [
        entry('SALI'),
        entry('PERŞEMBE'),
        entry('CUMARTESİ'),
        entry('PAZAR'),
      ],
      trainingDays,
      repGoalMet: true,
      daysElapsed: 6,
    });

    expect(result.status).toBe('advance');
    expect(result.canAdvance).toBe(true);
  });

  it('holds the week when too few main sessions were completed', () => {
    const result = getWeekReadiness({
      completedEntries: [entry('SALI'), entry('PAZAR')],
      trainingDays,
      repGoalMet: true,
      daysElapsed: 7,
    });

    expect(result.status).toBe('repeat');
    expect(result.canAdvance).toBe(false);
  });

  it('recommends deload/repeat when symptom signals are high', () => {
    const result = getWeekReadiness({
      completedEntries: [
        entry('SALI'),
        entry('PERŞEMBE', { kneeAfter: 4, nextAction: 'azalt' }),
        entry('CUMARTESİ', { spineAfter: 2, nextAction: 'swap' }),
        entry('PAZAR'),
      ],
      trainingDays,
      repGoalMet: true,
      daysElapsed: 6,
    });

    expect(result.status).toBe('deload');
    expect(result.canAdvance).toBe(false);
  });
});
