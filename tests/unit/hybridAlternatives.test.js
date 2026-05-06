import { describe, expect, it } from 'vitest';
import { PROGRAM_HYBRID } from '../../src/dataHybrid.js';
import { getGifUrl, getYouTubeShortId } from '../../src/videoMap.js';

function activeHybridExercises() {
  const rows = [];

  for (const day of PROGRAM_HYBRID.days || []) {
    for (const [mode, variant] of Object.entries(day.variants || {})) {
      for (const block of variant.blocks || []) {
        for (const exercise of block.exercises || []) {
          rows.push({ day: day.sub, mode, block: block.name, exercise });
        }
      }
    }
  }

  return rows;
}

function activeNameCorpus() {
  const names = new Set();

  for (const { exercise } of activeHybridExercises()) {
    names.add(exercise.name);
    for (const alt of exercise.alts || []) names.add(alt);
  }

  return names;
}

describe('hybrid exercise alternatives', () => {
  it('keeps every active hybrid movement swappable with explicit reasons', () => {
    const issues = [];

    for (const { day, mode, block, exercise } of activeHybridExercises()) {
      const location = `${day}/${mode}/${block}/${exercise.name}`;
      const alts = exercise.alts || [];
      const reasons = exercise.alt_reasons || [];

      if (alts.length === 0) issues.push(`${location}: no alternatives`);
      if (reasons.length !== alts.length) issues.push(`${location}: reason count mismatch`);

      const seen = new Set();
      for (const alt of alts) {
        if (!alt || typeof alt !== 'string') issues.push(`${location}: invalid alternative`);
        if (alt === exercise.name) issues.push(`${location}: self alternative`);
        if (seen.has(alt)) issues.push(`${location}: duplicate alternative ${alt}`);
        seen.add(alt);
      }
    }

    expect(issues).toEqual([]);
  });

  it('covers every active hybrid movement and alternative with inline media', () => {
    const missing = [];

    for (const name of activeNameCorpus()) {
      if (!getGifUrl(name) && !getYouTubeShortId(name)) missing.push(name);
    }

    expect(missing.sort()).toEqual([]);
  });

  it('retains the useful Torso Limbs exercise families as safe alternatives', () => {
    const names = activeNameCorpus();
    const expectedTransfers = [
      'Seated Lateral Raise Machine',
      'Standing Single Arm Lateral Raise',
      'Cable Clavicular Fly',
      'Plate Loaded Flat Chest Press',
      'High Incline Smith Machine Press',
      'Single Arm Lat Pulldown',
      'Wide Grip Lat Pulldown',
      'T Bar Row Machine',
      'High Row Machine',
      'Kelso Shrug Machine',
      'Scott Curl Machine',
      'Straight Bar Pushdown',
      'Lengthened DB Curl',
      'Single Arm Cable Pushdown',
      'Seated Leg Curl',
      'Machine Lying Leg Curl',
      'Straight Leg Calf Raise',
      '45 Degree Hip Extension',
      'Leg Extension Machine (hafif)',
      'Leg Press Kısa ROM',
    ];

    const missing = expectedTransfers.filter((name) => !names.has(name));

    expect(missing).toEqual([]);
  });

  it('does not promote high-risk Torso Limbs choices into the active plan', () => {
    const names = activeNameCorpus();

    expect(names.has('Hack Squat')).toBe(false);
    expect(names.has('Sa Overhead Ext')).toBe(false);
  });

  it('keeps Sunday as a real training day, not only a conditioning day', () => {
    const sunday = PROGRAM_HYBRID.days.find((day) => day.sub === 'PAZAR');

    expect(sunday?.type).toBe('training');
    expect(sunday?.focus).toBe('Toparlanma Kuvveti + Zone 2');

    for (const variant of Object.values(sunday?.variants || {})) {
      const blockNames = variant.blocks.map((block) => block.name).join(' ');

      expect(blockNames).toContain('KUVVET');
      expect(blockNames).toContain('CORE + TAŞIMA');
      expect(blockNames).toContain('KONDİSYON');
      expect(blockNames).toContain('BAKIM');
    }
  });
});
