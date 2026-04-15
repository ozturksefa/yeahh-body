import { daysAgoLocal, todayLocalDate, yesterdayLocalDate } from "../dateUtils";
import { QUICK_FOODS } from "./foodDatabase";

const DEFAULT_TARGETS = { calories: 2200, protein: 150, carbs: 250, fat: 70, bodyWeight: 75 };

export function loadTargets() {
  try {
    return JSON.parse(localStorage.getItem("yb_targets") || "null") || DEFAULT_TARGETS;
  } catch {
    return DEFAULT_TARGETS;
  }
}

export function todayStr() {
  return todayLocalDate();
}

export function getMealLabel() {
  const h = new Date().getHours();
  if (h < 10) return "Kahvaltı";
  if (h < 13) return "Öğle Öncesi";
  if (h < 15) return "Öğle";
  if (h < 18) return "İkindi";
  if (h < 21) return "Akşam";
  return "Gece";
}

export function formatDate(dateStr) {
  const today = todayStr();
  const yesterday = yesterdayLocalDate();
  if (dateStr === today) return "Bugün";
  if (dateStr === yesterday) return "Dün";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
}

export function loadEntries(dateStr) {
  try {
    return JSON.parse(localStorage.getItem("yb_nutrition_" + dateStr) || "[]");
  } catch {
    return [];
  }
}

export function saveEntries(dateStr, entries) {
  try {
    localStorage.setItem("yb_nutrition_" + dateStr, JSON.stringify(entries));
  } catch {
    /* storage unavailable — silently drop */
  }
}

// Son 7 günden en sık eklenen yemekler
export function getRecentFoods() {
  const counts = {};
  for (let i = 0; i < 7; i++) {
    const d = daysAgoLocal(i);
    const entries = loadEntries(d);
    entries.forEach((e) => {
      const key = e.name;
      if (!counts[key]) counts[key] = { food: e, count: 0 };
      counts[key].count++;
    });
  }
  return Object.values(counts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map((x) => ({ ...x.food, count: x.count }));
}

// Makroya göre akıllı öneriler üret
export function getSmartSuggestions(totals, targets) {
  const remProtein = targets.protein - totals.protein;
  const remCalories = targets.calories - totals.calories;
  const remCarbs = targets.carbs - totals.carbs;
  const suggestions = [];

  if (remCalories <= 0) {
    suggestions.push({ icon: "✅", text: "Kalori hedefine ulaştın!", type: "good" });
  } else if (remCalories < 300) {
    suggestions.push({ icon: "🎯", text: `${remCalories}kcal kaldı — hafif bir şey ekle`, type: "info" });
  }

  if (remProtein > 50) {
    const best = QUICK_FOODS.filter((f) => f.cat === "Protein")
      .sort((a, b) => (b.pro / b.cal) - (a.pro / a.cal))
      .slice(0, 3);
    suggestions.push({
      icon: "💪",
      text: `${remProtein}g protein eksik`,
      type: "warn",
      foods: best,
    });
  } else if (remProtein > 0) {
    suggestions.push({ icon: "💪", text: `Proteine yaklaştın, ${remProtein}g kaldı`, type: "info" });
  } else {
    suggestions.push({ icon: "💪", text: "Protein hedefini tamamladın!", type: "good" });
  }

  if (remCarbs > 100 && remCalories > 200) {
    const best = QUICK_FOODS.filter((f) => f.cat === "Karb" || f.cat === "Meyve")
      .sort((a, b) => b.carb - a.carb)
      .slice(0, 3);
    suggestions.push({ icon: "⚡", text: `${remCarbs}g karbonhidrat kaldı — enerji için ekle`, type: "info", foods: best });
  }

  // Öğün bazlı
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 10 && totals.calories < 200) {
    suggestions.push({ icon: "🌅", text: "Sabah — güçlü bir kahvaltı başlangıç için önemli", type: "meal" });
  }
  if (hour >= 17 && hour < 20) {
    suggestions.push({ icon: "🏋️", text: "Antrenman sonrası protein + karb kombinasyonu ideal", type: "meal" });
  }

  return suggestions;
}

export function findFoodsByQuery(queries) {
  const picked = [];
  const seen = new Set();

  queries.forEach((query) => {
    const found = QUICK_FOODS.find((food) => food.name.toLowerCase().includes(query.toLowerCase()));
    if (found && !seen.has(found.name)) {
      seen.add(found.name);
      picked.push(found);
    }
  });

  return picked;
}

export function getSessionNutritionSuggestions(session, nutritionContext) {
  if (!session?.post?.completed) return [];

  const pre = session.pre || {};
  const post = session.post || {};
  const suggestions = [];
  const rpe = Number(post.rpe || 0);
  const shoulderDelta = Number(post.shoulderAfter ?? 0) - Number(pre.shoulder ?? 0);
  const kneeDelta = Number(post.kneeAfter ?? 0) - Number(pre.knee ?? 0);
  const spineDelta = Number(post.spineAfter ?? 0) - Number(pre.spine ?? 0);
  const symptomAfterMax = Math.max(Number(post.shoulderAfter ?? 0), Number(post.kneeAfter ?? 0), Number(post.spineAfter ?? 0));
  const symptomDeltaMax = Math.max(shoulderDelta, kneeDelta, spineDelta);

  if (rpe >= 8) {
    suggestions.push({
      icon: "🍚",
      text: "Seans yüksek eforlu geçti; bugün protein + karbonhidratı geciktirme.",
      type: "meal",
      foods: findFoodsByQuery(["tavuk göğsü (200g)", "pirinç pilavı (200g)", "muz"]),
    });
  }

  if (post.cardio === "fazla" || nutritionContext?.dayType === "cardio") {
    suggestions.push({
      icon: "💧",
      text: "Kondisyon yükü yüksek; sıvı, elektrolit ve kolay sindirilen karbonhidrat eklemek iyi olur.",
      type: "info",
      foods: findFoodsByQuery(["ayran", "muz", "patates haşlama"]),
    });
  }

  if (symptomAfterMax >= 3 || symptomDeltaMax >= 1) {
    suggestions.push({
      icon: "🛠",
      text: "Semptom artışı var; bugün kalori kısmayı değil toparlanmayı ve protein tabanını öncele.",
      type: "warn",
      foods: findFoodsByQuery(["somon", "yoğurt (200g)", "ceviz"]),
    });
  }

  if (post.nextAction === "azalt" || post.nextAction === "swap") {
    suggestions.push({
      icon: "🔁",
      text: "Bir sonraki seans azalt/swap notu aldı; toparlanma için günü düşük proteinle kapatma.",
      type: "meal",
      foods: findFoodsByQuery(["whey protein", "süzme yoğurt", "lor peyniri"]),
    });
  }

  return suggestions;
}

export function getHybridNutritionContext(day, mode) {
  if (!day) return null;
  if (day.type === "offday") {
    return {
      dayType: "rest",
      label: `${day.sub} · Aktif Recovery`,
      note: mode === "gym"
        ? "Bugün salonda olsan da beslenme önceliği toparlanma ve protein tabanı."
        : "Bugün yüklenme yok; protein ve genel toparlanma öncelikli.",
    };
  }

  const focus = String(day.focus || "").toLowerCase();
  if (focus.includes("recovery") || focus.includes("zone 2")) {
    return {
      dayType: "cardio",
      label: `${day.sub} · Recovery + Zone 2`,
      note: "Uzun aerobik blok için sıvı, elektrolit ve orta düzey karbonhidrat desteği mantıklı.",
    };
  }
  if (focus.includes("athletic volume") || focus.includes("posterior chain")) {
    return {
      dayType: "functional",
      label: `${day.sub} · Hacim Günü`,
      note: "Bugün protein + karbonhidrat kombinasyonunu eksik bırakma; ana yük hacim ve iş kapasitesi.",
    };
  }
  return {
    dayType: "strength",
    label: `${day.sub} · Kuvvet Temelli Gün`,
    note: "Bugün protein tabanı sabit, antrenman sonrası karbonhidratı geciktirme.",
  };
}
