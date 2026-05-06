// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  DEFAULT_HOME_PANTRY,
  HOME_PANTRY_KEY,
  getHomeKitchenSuggestions,
  loadHomePantry,
  saveHomePantry,
} from '../../src/nutrition/homeKitchen.js';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe('home kitchen suggestions', () => {
  it('starts from simple default home foods', () => {
    expect(loadHomePantry()).toEqual(DEFAULT_HOME_PANTRY);
  });

  it('persists selected home ingredients', () => {
    saveHomePantry(['egg', 'yogurt']);
    expect(JSON.parse(localStorage.getItem(HOME_PANTRY_KEY))).toEqual(['egg', 'yogurt']);
    expect(loadHomePantry()).toEqual(['egg', 'yogurt']);
  });

  it('only suggests meals that can be made with selected ingredients', () => {
    const suggestions = getHomeKitchenSuggestions({
      selectedIds: ['chicken', 'rice', 'vegetable'],
      nutritionContext: { dayType: 'strength' },
      totals: { protein: 20, carbs: 70 },
      targets: { protein: 150, carbs: 250 },
    });

    expect(suggestions[0].name).toBe('Tavuk + pilav/bulgur');
    expect(suggestions[0].foods.some((food) => food.name.includes('Tavuk'))).toBe(true);
  });

  it('can produce a low-friction default suggestion without specialty foods', () => {
    const suggestions = getHomeKitchenSuggestions({
      selectedIds: DEFAULT_HOME_PANTRY,
      nutritionContext: { dayType: 'rest' },
      totals: { protein: 90, carbs: 140 },
      targets: { protein: 150, carbs: 220 },
    });

    expect(suggestions.map((item) => item.name)).toContain('Yumurta + yoğurt tabağı');
  });
});
