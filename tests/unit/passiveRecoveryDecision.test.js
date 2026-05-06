import { describe, expect, it } from 'vitest';
import {
  applyPassiveDoseToVariant,
  getPassiveRecoveryDecision,
} from '../../src/hybrid/shared.js';

const TODAY = '2026-05-06';

function entry(date, patch = {}) {
  return {
    date,
    day: 'SALI',
    mode: 'gym',
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

function sampleVariant() {
  return {
    modeNote: 'Test',
    weekExecutionNote: 'Baz hafta',
    blocks: [
      {
        name: '🔥 ISINMA — Hazırlık',
        color: '#CC5500',
        exercises: [{ name: 'Bike', sets: '5 dakika kolay', muscle: 'Isınma', how: ['RPE 3'] }],
      },
      {
        name: '⚡ POWER — Hız',
        color: '#FFD166',
        exercises: [{ name: 'Med Ball Throw', sets: '3 × 3', muscle: 'Power', how: ['Hızlı'] }],
      },
      {
        name: '💪 KUVVET — Ana İş',
        color: '#F4A261',
        exercises: [
          { name: 'Leg Press', sets: '2 × 8-10', muscle: 'Quad', how: ['Kontrollü'] },
          { name: 'Chest Supported Row', sets: '4 × 6-10', muscle: 'Sırt', how: ['Temiz'] },
        ],
      },
      {
        name: '🧠 CORE + KONDİSYON',
        color: '#1F618D',
        exercises: [
          { name: 'Pallof Press', sets: '2 × 10-12', muscle: 'Core', how: ['Sabit'] },
          { name: 'Zone 2 / Threshold Yürüyüş Protokolü', sets: 'Haftaya göre değişir', muscle: 'Dayanıklılık', how: ['2 × 4 dk RPE 7'] },
        ],
      },
      {
        name: '🧊 SOĞUMA — Kapat',
        color: '#264653',
        exercises: [{ name: 'Child Pose', sets: '2 dakika', muscle: 'Soğuma', how: ['Rahat'] }],
      },
    ],
  };
}

describe('passive recovery decision', () => {
  it('returns normal for a clean week with low RPE', () => {
    const decision = getPassiveRecoveryDecision({
      today: TODAY,
      entries: [
        entry('2026-05-02'),
        entry('2026-05-04', { rpe: '6' }),
        entry('2026-05-05', { rpe: '7' }),
      ],
    });

    expect(decision.status).toBe('normal');
    expect(decision.label).toBe('Normal Doz');
  });

  it('returns controlled when the latest session has high RPE, too much cardio, or symptom rise', () => {
    expect(getPassiveRecoveryDecision({
      today: TODAY,
      entries: [entry('2026-05-05', { rpe: '8' })],
    }).status).toBe('kontrollü');

    expect(getPassiveRecoveryDecision({
      today: TODAY,
      entries: [entry('2026-05-05', { cardio: 'fazla' })],
    }).status).toBe('kontrollü');

    expect(getPassiveRecoveryDecision({
      today: TODAY,
      entries: [entry('2026-05-05', { kneeAfter: 1 })],
    }).status).toBe('kontrollü');
  });

  it('returns recovery for red symptoms, big symptom jumps, or repeated reduce/swap signals', () => {
    expect(getPassiveRecoveryDecision({
      today: TODAY,
      entries: [entry('2026-05-05', { shoulderAfter: 4 })],
    }).status).toBe('recovery');

    expect(getPassiveRecoveryDecision({
      today: TODAY,
      entries: [entry('2026-05-05', { spineAfter: 2 })],
    }).status).toBe('recovery');

    expect(getPassiveRecoveryDecision({
      today: TODAY,
      entries: [
        entry('2026-05-04', { nextAction: 'azalt' }),
        entry('2026-05-05', { nextAction: 'swap' }),
      ],
    }).status).toBe('recovery');
  });

  it('drops controlled strength sets by one without going below two or removing warmup/cooldown', () => {
    const adjusted = applyPassiveDoseToVariant(sampleVariant(), { status: 'kontrollü', label: 'Kontrollü Doz', tone: '#FFA726' });
    const strength = adjusted.blocks.find((block) => block.name.includes('KUVVET'));
    const warmup = adjusted.blocks.find((block) => block.name.includes('ISINMA'));
    const cooldown = adjusted.blocks.find((block) => block.name.includes('SOĞUMA'));

    expect(strength.exercises[0].sets).toBe('2 × 8-10');
    expect(strength.exercises[1].sets).toBe('3 × 6-10');
    expect(warmup.exercises[0].sets).toBe('5 dakika kolay');
    expect(cooldown.exercises[0].sets).toBe('2 dakika');
  });

  it('removes power pressure and changes threshold work to Zone 2 in recovery mode', () => {
    const adjusted = applyPassiveDoseToVariant(sampleVariant(), { status: 'recovery', label: 'Recovery Modu', tone: '#FF6B6B' });
    const blockNames = adjusted.blocks.map((block) => block.name);
    const conditioning = adjusted.blocks.find((block) => block.name.includes('KONDİSYON'));

    expect(blockNames.some((name) => name.includes('POWER'))).toBe(false);
    expect(blockNames.some((name) => name.includes('ISINMA'))).toBe(true);
    expect(blockNames.some((name) => name.includes('SOĞUMA'))).toBe(true);
    expect(conditioning.exercises.some((exercise) => exercise.name === 'Pallof Press')).toBe(true);
    expect(conditioning.exercises.find((exercise) => exercise.name.includes('Zone 2')).sets).toBe('20-30 dakika Zone 2');
  });
});
