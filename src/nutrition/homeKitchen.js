import { QUICK_FOODS } from "./foodDatabase";

export const HOME_PANTRY_KEY = "yb_home_pantry_v1";

export const HOME_PANTRY_ITEMS = [
  { id: "egg", label: "Yumurta" },
  { id: "yogurt", label: "Yoğurt" },
  { id: "cheese", label: "Peynir/Lor" },
  { id: "chicken", label: "Tavuk" },
  { id: "tuna", label: "Ton balığı" },
  { id: "legumes", label: "Bakliyat" },
  { id: "rice", label: "Pirinç/Bulgur" },
  { id: "oats", label: "Yulaf" },
  { id: "bread", label: "Ekmek" },
  { id: "fruit", label: "Meyve" },
  { id: "milk", label: "Süt/Ayran" },
  { id: "vegetable", label: "Sebze" },
  { id: "nuts", label: "Kuruyemiş" },
  { id: "potato", label: "Patates" },
];

export const DEFAULT_HOME_PANTRY = ["egg", "yogurt", "bread", "rice", "fruit", "vegetable"];

const HOME_MEAL_COMBOS = [
  {
    name: "Yumurta + yoğurt tabağı",
    desc: "Evde en kolay protein tabanı",
    dayTypes: ["strength", "functional", "cardio", "rest"],
    ingredients: ["egg", "yogurt", "bread"],
    foods: ["Haşlanmış yumurta (2)", "Yoğurt (200g)", "Tam buğday ekmek (1 dilim)"],
    reason: "Az hazırlıkla protein tamamlar, mideyi çok yormaz.",
  },
  {
    name: "Yoğurtlu yulaf",
    desc: "Kahvaltı veya antrenman sonrası pratik kase",
    dayTypes: ["strength", "functional", "cardio"],
    ingredients: ["yogurt", "oats", "fruit"],
    foods: ["Süzme yoğurt (150g)", "Yulaf ezmesi (40g)", "Muz (1 adet)"],
    reason: "Protein ve karbonhidratı aynı anda verir.",
  },
  {
    name: "Tavuk + pilav/bulgur",
    desc: "Kuvvet gününün sade ana öğünü",
    dayTypes: ["strength", "functional", "cardio"],
    ingredients: ["chicken", "rice", "vegetable"],
    foods: ["Tavuk göğsü (200g)", "Pirinç pilavı (200g)", "Çoban salata"],
    reason: "Ağır günlerde toparlanma için güvenli ana öğün.",
  },
  {
    name: "Bakliyat + yoğurt",
    desc: "Ekonomik ev yemeği",
    dayTypes: ["functional", "cardio", "rest"],
    ingredients: ["legumes", "yogurt", "rice"],
    foods: ["Nohut (200g pişmiş)", "Yoğurt (200g)", "Bulgur pilavı (150g)"],
    reason: "Ekonomik, tok tutar, protein açığını destekler.",
  },
  {
    name: "Ton balıklı ekmek",
    desc: "Pişirme gerektirmeyen hızlı öğün",
    dayTypes: ["strength", "functional", "cardio"],
    ingredients: ["tuna", "bread", "yogurt"],
    foods: ["Ton balığı konserve (150g)", "Tam buğday ekmek (1 dilim)", "Ayran (200ml)"],
    reason: "Vaktin yoksa protein için iyi kısa yol.",
  },
  {
    name: "Patates + yumurta + yoğurt",
    desc: "Basit toparlanma tabağı",
    dayTypes: ["strength", "functional", "cardio", "rest"],
    ingredients: ["potato", "egg", "yogurt"],
    foods: ["Patates haşlama (200g)", "Haşlanmış yumurta (2)", "Yoğurt (200g)"],
    reason: "Kolay sindirilir, özellikle kondisyon sonrası rahat gider.",
  },
  {
    name: "Lor/peynir + yumurta kahvaltısı",
    desc: "Klasik ve ulaşılabilir",
    dayTypes: ["strength", "rest"],
    ingredients: ["cheese", "egg", "bread", "vegetable"],
    foods: ["Yumurta (1 adet)", "Lor peyniri (100g)", "Tam buğday ekmek (1 dilim)", "Domates (1 adet)"],
    reason: "Protein yüksek, hazırlaması kısa.",
  },
  {
    name: "Ayran + leblebi + meyve",
    desc: "Ara öğün gibi hafif seçenek",
    dayTypes: ["cardio", "rest"],
    ingredients: ["milk", "legumes", "fruit"],
    foods: ["Ayran (200ml)", "Leblebi (40g)", "Elma (1 adet)"],
    reason: "Tam öğün istemediğin günlerde hafif destek olur.",
  },
];

function byName(name) {
  return QUICK_FOODS.find((food) => food.name === name)
    || QUICK_FOODS.find((food) => food.name.toLowerCase().includes(name.toLowerCase()));
}

function materializeFoods(foodNames) {
  return foodNames
    .map((name) => byName(name))
    .filter(Boolean);
}

function totalFoods(foods) {
  return foods.reduce((total, food) => ({
    cal: total.cal + Number(food.cal || 0),
    pro: total.pro + Number(food.pro || 0),
    carb: total.carb + Number(food.carb || 0),
    fat: total.fat + Number(food.fat || 0),
  }), { cal: 0, pro: 0, carb: 0, fat: 0 });
}

export function loadHomePantry() {
  try {
    const saved = JSON.parse(localStorage.getItem(HOME_PANTRY_KEY) || "null");
    return Array.isArray(saved) && saved.length ? saved : DEFAULT_HOME_PANTRY;
  } catch {
    return DEFAULT_HOME_PANTRY;
  }
}

export function saveHomePantry(items) {
  try {
    localStorage.setItem(HOME_PANTRY_KEY, JSON.stringify(items));
  } catch {
    return false;
  }
  return true;
}

export function getHomeKitchenSuggestions({ selectedIds, nutritionContext, totals, targets, limit = 3 } = {}) {
  const selected = new Set(selectedIds?.length ? selectedIds : DEFAULT_HOME_PANTRY);
  const dayType = nutritionContext?.dayType || "strength";
  const remProtein = Number(targets?.protein || 0) - Number(totals?.protein || 0);
  const remCarbs = Number(targets?.carbs || 0) - Number(totals?.carbs || 0);

  return HOME_MEAL_COMBOS
    .filter((combo) => combo.ingredients.every((id) => selected.has(id)))
    .map((combo) => {
      const foods = materializeFoods(combo.foods);
      const total = totalFoods(foods);
      let score = combo.dayTypes.includes(dayType) ? 4 : 0;
      if (remProtein > 25 && total.pro >= 25) score += 3;
      if (dayType !== "rest" && remCarbs > 40 && total.carb >= 35) score += 2;
      if (dayType === "rest" && total.carb <= 45) score += 1;
      if (combo.ingredients.length <= 3) score += 1;
      return { ...combo, foods, total, score };
    })
    .sort((a, b) => b.score - a.score || b.total.pro - a.total.pro)
    .slice(0, limit)
    .map((combo) => {
      const next = { ...combo };
      delete next.score;
      return next;
    });
}
