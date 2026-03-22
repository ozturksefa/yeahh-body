import { useState, useEffect } from "react";
import "./Nutrition.css";

function loadTargets() {
  try { return JSON.parse(localStorage.getItem("yb_targets") || "null") || { calories: 2200, protein: 150, carbs: 250, fat: 70 }; } catch { return { calories: 2200, protein: 150, carbs: 250, fat: 70 }; }
}

const QUICK_FOODS = [
  // Kahvaltılık
  { name: "Yumurta (1 adet)", cal: 78, pro: 6, carb: 1, fat: 5, cat: "Kahvaltı" },
  { name: "Haşlanmış yumurta (2)", cal: 156, pro: 12, carb: 2, fat: 10, cat: "Kahvaltı" },
  { name: "Omlet (2 yumurta)", cal: 180, pro: 13, carb: 2, fat: 13, cat: "Kahvaltı" },
  { name: "Yulaf ezmesi (40g)", cal: 150, pro: 5, carb: 27, fat: 3, cat: "Kahvaltı" },
  { name: "Yulaf + süt (300ml)", cal: 270, pro: 12, carb: 37, fat: 8, cat: "Kahvaltı" },
  { name: "Tam buğday ekmek (1 dilim)", cal: 80, pro: 3, carb: 15, fat: 1, cat: "Kahvaltı" },
  { name: "Beyaz ekmek (1 dilim)", cal: 75, pro: 2, carb: 15, fat: 0, cat: "Kahvaltı" },
  { name: "Beyaz peynir (30g)", cal: 75, pro: 5, carb: 1, fat: 6, cat: "Kahvaltı" },
  { name: "Kaşar peyniri (30g)", cal: 110, pro: 7, carb: 0, fat: 9, cat: "Kahvaltı" },
  { name: "Lor peyniri (100g)", cal: 98, pro: 11, carb: 3, fat: 5, cat: "Kahvaltı" },
  { name: "Süzme yoğurt (150g)", cal: 130, pro: 15, carb: 6, fat: 5, cat: "Kahvaltı" },
  { name: "Süt (200ml)", cal: 120, pro: 7, carb: 10, fat: 5, cat: "Kahvaltı" },
  { name: "Ayran (200ml)", cal: 60, pro: 3, carb: 4, fat: 3, cat: "Kahvaltı" },
  { name: "Zeytin (10 adet)", cal: 70, pro: 0, carb: 1, fat: 7, cat: "Kahvaltı" },
  { name: "Domates (1 adet)", cal: 22, pro: 1, carb: 5, fat: 0, cat: "Kahvaltı" },
  { name: "Salatalık (1 adet)", cal: 16, pro: 1, carb: 3, fat: 0, cat: "Kahvaltı" },
  { name: "Bal (1 tatlı kaşığı)", cal: 64, pro: 0, carb: 17, fat: 0, cat: "Kahvaltı" },
  { name: "Tereyağ (10g)", cal: 72, pro: 0, carb: 0, fat: 8, cat: "Kahvaltı" },
  // Protein
  { name: "Tavuk göğsü (150g)", cal: 230, pro: 43, carb: 0, fat: 5, cat: "Protein" },
  { name: "Tavuk göğsü (200g)", cal: 307, pro: 57, carb: 0, fat: 7, cat: "Protein" },
  { name: "Tavuk but (150g)", cal: 280, pro: 35, carb: 0, fat: 15, cat: "Protein" },
  { name: "Kıyma köfte (100g)", cal: 250, pro: 26, carb: 0, fat: 15, cat: "Protein" },
  { name: "Dana bonfile (150g)", cal: 260, pro: 40, carb: 0, fat: 10, cat: "Protein" },
  { name: "Somon (150g)", cal: 280, pro: 38, carb: 0, fat: 14, cat: "Protein" },
  { name: "Ton balığı konserve (100g)", cal: 130, pro: 26, carb: 0, fat: 3, cat: "Protein" },
  { name: "Ton balığı konserve (150g)", cal: 195, pro: 39, carb: 0, fat: 5, cat: "Protein" },
  { name: "Sardalya konserve (100g)", cal: 200, pro: 25, carb: 0, fat: 11, cat: "Protein" },
  { name: "Yoğurt (200g)", cal: 120, pro: 8, carb: 8, fat: 6, cat: "Protein" },
  { name: "Whey protein (1 scoop)", cal: 120, pro: 24, carb: 3, fat: 2, cat: "Protein" },
  { name: "Whey protein + süt", cal: 240, pro: 31, carb: 13, fat: 7, cat: "Protein" },
  { name: "Yumurta akı (3 adet)", cal: 50, pro: 11, carb: 1, fat: 0, cat: "Protein" },
  { name: "Kuru fasulye (200g pişmiş)", cal: 240, pro: 16, carb: 40, fat: 1, cat: "Protein" },
  { name: "Nohut (200g pişmiş)", cal: 280, pro: 14, carb: 46, fat: 4, cat: "Protein" },
  { name: "Mercimek (200g pişmiş)", cal: 200, pro: 18, carb: 32, fat: 1, cat: "Protein" },
  // Karb
  { name: "Pirinç pilavı (150g)", cal: 195, pro: 4, carb: 42, fat: 1, cat: "Karb" },
  { name: "Pirinç pilavı (200g)", cal: 260, pro: 5, carb: 56, fat: 1, cat: "Karb" },
  { name: "Bulgur pilavı (150g)", cal: 165, pro: 5, carb: 34, fat: 1, cat: "Karb" },
  { name: "Makarna (200g pişmiş)", cal: 280, pro: 10, carb: 56, fat: 1, cat: "Karb" },
  { name: "Kepekli makarna (200g)", cal: 265, pro: 11, carb: 52, fat: 2, cat: "Karb" },
  { name: "Patates haşlama (200g)", cal: 160, pro: 4, carb: 36, fat: 0, cat: "Karb" },
  { name: "Tatlı patates (200g)", cal: 180, pro: 3, carb: 42, fat: 0, cat: "Karb" },
  { name: "Muz (1 adet)", cal: 105, pro: 1, carb: 27, fat: 0, cat: "Meyve" },
  { name: "Elma (1 adet)", cal: 80, pro: 0, carb: 21, fat: 0, cat: "Meyve" },
  { name: "Portakal (1 adet)", cal: 70, pro: 1, carb: 18, fat: 0, cat: "Meyve" },
  { name: "Üzüm (100g)", cal: 70, pro: 1, carb: 18, fat: 0, cat: "Meyve" },
  // Yağ
  { name: "Badem (30g)", cal: 170, pro: 6, carb: 6, fat: 15, cat: "Yağ" },
  { name: "Ceviz (30g)", cal: 195, pro: 5, carb: 4, fat: 19, cat: "Yağ" },
  { name: "Avokado (yarım)", cal: 120, pro: 1, carb: 6, fat: 11, cat: "Yağ" },
  { name: "Zeytinyağı (1 yemek kaşığı)", cal: 120, pro: 0, carb: 0, fat: 14, cat: "Yağ" },
  { name: "Fıstık ezmesi (1 yk)", cal: 95, pro: 4, carb: 3, fat: 8, cat: "Yağ" },
  // Türk mutfağı
  { name: "Mercimek çorbası (1 kase)", cal: 180, pro: 10, carb: 28, fat: 3, cat: "Türk" },
  { name: "Yayla çorbası (1 kase)", cal: 140, pro: 6, carb: 18, fat: 5, cat: "Türk" },
  { name: "Domates çorbası (1 kase)", cal: 120, pro: 3, carb: 15, fat: 5, cat: "Türk" },
  { name: "İzgara köfte (150g)", cal: 320, pro: 28, carb: 4, fat: 21, cat: "Türk" },
  { name: "Döner (1 porsiyon)", cal: 450, pro: 30, carb: 35, fat: 20, cat: "Türk" },
  { name: "Tavuk döner (1 porsiyon)", cal: 380, pro: 32, carb: 30, fat: 14, cat: "Türk" },
  { name: "Lahmacun (1 adet)", cal: 200, pro: 8, carb: 25, fat: 8, cat: "Türk" },
  { name: "Pide (1 dilim)", cal: 300, pro: 12, carb: 35, fat: 12, cat: "Türk" },
  { name: "Börek (1 dilim)", cal: 280, pro: 8, carb: 28, fat: 15, cat: "Türk" },
  { name: "Menemen (2 yumurta)", cal: 250, pro: 13, carb: 10, fat: 18, cat: "Türk" },
  { name: "Karnıyarık (1 porsiyon)", cal: 320, pro: 15, carb: 20, fat: 20, cat: "Türk" },
  { name: "Cacık (200g)", cal: 80, pro: 4, carb: 6, fat: 5, cat: "Türk" },
  { name: "Çoban salata", cal: 90, pro: 2, carb: 12, fat: 4, cat: "Türk" },
  // İçecek
  { name: "Türk kahvesi (sade)", cal: 5, pro: 0, carb: 1, fat: 0, cat: "İçecek" },
  { name: "Çay (1 bardak)", cal: 3, pro: 0, carb: 1, fat: 0, cat: "İçecek" },
  { name: "Portakal suyu (200ml)", cal: 90, pro: 1, carb: 21, fat: 0, cat: "İçecek" },
  { name: "Protein shake (hazır)", cal: 160, pro: 30, carb: 8, fat: 3, cat: "İçecek" },
];

const CATEGORIES = ["Tümü", "Son Yenenler", "Kahvaltı", "Protein", "Karb", "Türk", "Meyve", "Yağ", "İçecek"];

const MULTIPLIERS = [
  { label: "½", val: 0.5 },
  { label: "1×", val: 1 },
  { label: "1½", val: 1.5 },
  { label: "2×", val: 2 },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getMealLabel() {
  const h = new Date().getHours();
  if (h < 10) return "Kahvaltı";
  if (h < 13) return "Öğle Öncesi";
  if (h < 15) return "Öğle";
  if (h < 18) return "İkindi";
  if (h < 21) return "Akşam";
  return "Gece";
}

function formatDate(dateStr) {
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (dateStr === today) return "Bugün";
  if (dateStr === yesterday) return "Dün";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
}

function loadEntries(dateStr) {
  try { return JSON.parse(localStorage.getItem("yb_nutrition_" + dateStr) || "[]"); } catch { return []; }
}

function saveEntries(dateStr, entries) {
  try { localStorage.setItem("yb_nutrition_" + dateStr, JSON.stringify(entries)); } catch {}
}

// Son 7 günden en sık eklenen yemekler
function getRecentFoods() {
  const counts = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    const entries = loadEntries(d);
    entries.forEach(e => {
      const key = e.name;
      if (!counts[key]) counts[key] = { food: e, count: 0 };
      counts[key].count++;
    });
  }
  return Object.values(counts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map(x => ({ ...x.food, count: x.count }));
}

// Makroya göre akıllı öneriler üret
function getSmartSuggestions(totals, targets) {
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
    const best = QUICK_FOODS.filter(f => f.cat === "Protein")
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
    const best = QUICK_FOODS.filter(f => f.cat === "Karb" || f.cat === "Meyve")
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

export default function NutritionTracker() {
  const [targets, setTargets] = useState(loadTargets);
  const [showTargets, setShowTargets] = useState(false);
  const [activeDate, setActiveDate] = useState(todayStr());
  const [entries, setEntries] = useState(() => loadEntries(todayStr()));
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Tümü");
  const [showQuick, setShowQuick] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [manual, setManual] = useState({ name: "", cal: "", pro: "", carb: "", fat: "" });
  const [pendingFood, setPendingFood] = useState(null); // { food, multiplier }
  const [recentFoods, setRecentFoods] = useState([]);

  useEffect(() => {
    setEntries(loadEntries(activeDate));
  }, [activeDate]);

  useEffect(() => {
    setRecentFoods(getRecentFoods());
  }, [entries]);

  const totals = entries.reduce((acc, e) => ({
    calories: acc.calories + (e.cal || 0),
    protein: acc.protein + (e.pro || 0),
    carbs: acc.carbs + (e.carb || 0),
    fat: acc.fat + (e.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const suggestions = getSmartSuggestions(totals, targets);

  const saveTargets = (newTargets) => {
    setTargets(newTargets);
    try { localStorage.setItem("yb_targets", JSON.stringify(newTargets)); } catch {}
  };

  const addFood = (food, multiplier = 1) => {
    const scaled = {
      name: multiplier !== 1 ? `${food.name} ×${multiplier}` : food.name,
      cal: Math.round((food.cal || 0) * multiplier),
      pro: Math.round((food.pro || 0) * multiplier),
      carb: Math.round((food.carb || 0) * multiplier),
      fat: Math.round((food.fat || 0) * multiplier),
      cat: food.cat,
    };
    const next = [...entries, {
      ...scaled,
      id: Date.now(),
      time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      meal: getMealLabel(),
    }];
    setEntries(next);
    saveEntries(activeDate, next);
    setPendingFood(null);
    setSearch("");
    setShowQuick(false);
    if (navigator.vibrate) navigator.vibrate(15);
  };

  const handleFoodTap = (food) => {
    setPendingFood({ food, multiplier: 1 });
  };

  const addManual = () => {
    if (!manual.name.trim() || !manual.cal) return;
    addFood({ name: manual.name.trim(), cal: parseInt(manual.cal) || 0, pro: parseInt(manual.pro) || 0, carb: parseInt(manual.carb) || 0, fat: parseInt(manual.fat) || 0 });
    setManual({ name: "", cal: "", pro: "", carb: "", fat: "" });
    setManualOpen(false);
  };

  const removeEntry = (id) => {
    const next = entries.filter(e => e.id !== id);
    setEntries(next);
    saveEntries(activeDate, next);
  };

  const navigateDay = (dir) => {
    const d = new Date(activeDate + "T12:00:00");
    d.setDate(d.getDate() + dir);
    const next = d.toISOString().slice(0, 10);
    if (next <= todayStr()) setActiveDate(next);
  };

  const pct = (val, target) => Math.min((val / target) * 100, 100);
  const isToday = activeDate === todayStr();

  const listFoods = activeCat === "Son Yenenler"
    ? recentFoods
    : QUICK_FOODS.filter(f => {
        const matchCat = activeCat === "Tümü" || f.cat === activeCat;
        const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
      });

  // Öğüne göre grupla
  const grouped = entries.reduce((acc, e) => {
    const key = e.meal || "Diğer";
    if (!acc[key]) acc[key] = [];
    acc[key].push(e);
    return acc;
  }, {});

  return (
    <div className="nutrition">

      {/* Hedef düzenleme */}
      <button className="nutri-target-toggle" onClick={() => setShowTargets(s => !s)}>
        {showTargets ? "✕ Hedefleri Kapat" : "🎯 Günlük Hedefleri Düzenle"}
      </button>
      {showTargets && (
        <div className="nutri-target-editor">
          {[
            { key: "calories", label: "Kalori", unit: "kcal", min: 1200, max: 5000 },
            { key: "protein",  label: "Protein",  unit: "g", min: 50, max: 300 },
            { key: "carbs",    label: "Karb",  unit: "g", min: 50, max: 600 },
            { key: "fat",      label: "Yağ",    unit: "g", min: 20, max: 200 },
          ].map(f => (
            <div key={f.key} className="nutri-target-row">
              <span className="nutri-target-label">{f.label}</span>
              <input
                className="nutri-target-input"
                type="number" inputMode="numeric"
                value={targets[f.key]}
                onChange={e => {
                  const v = Math.max(f.min, Math.min(f.max, parseInt(e.target.value) || f.min));
                  saveTargets({ ...targets, [f.key]: v });
                }}
              />
              <span className="nutri-target-unit">{f.unit}</span>
            </div>
          ))}
          <button className="nutri-target-reset" onClick={() => saveTargets({ calories: 2200, protein: 150, carbs: 250, fat: 70 })}>
            Varsayılana Döndür
          </button>
        </div>
      )}

      {/* Tarih nav */}
      <div className="nutri-date-nav">
        <button className="nutri-date-btn" onClick={() => navigateDay(-1)}>‹</button>
        <span className="nutri-date-label">{formatDate(activeDate)}</span>
        <button className="nutri-date-btn" onClick={() => navigateDay(1)}
          disabled={isToday} style={{ opacity: isToday ? 0.3 : 1 }}>›</button>
      </div>

      {/* Macro rings */}
      <div className="nutri-rings">
        <MacroRing label="Kalori" val={totals.calories} target={targets.calories} unit="kcal" color="#FF6B35" />
        <MacroRing label="Protein" val={totals.protein} target={targets.protein} unit="g" color="#4FC3F7" />
        <MacroRing label="Karb" val={totals.carbs} target={targets.carbs} unit="g" color="#66BB6A" />
        <MacroRing label="Yağ" val={totals.fat} target={targets.fat} unit="g" color="#FFA726" />
      </div>

      {/* Progress bars */}
      <div className="nutri-bars">
        {[
          { label: "Kalori", val: totals.calories, target: targets.calories, color: "#FF6B35", unit: "kcal" },
          { label: "Protein", val: totals.protein, target: targets.protein, color: "#4FC3F7", unit: "g" },
          { label: "Karb", val: totals.carbs, target: targets.carbs, color: "#66BB6A", unit: "g" },
          { label: "Yağ", val: totals.fat, target: targets.fat, color: "#FFA726", unit: "g" },
        ].map(b => (
          <div key={b.label} className="nutri-bar-row">
            <span className="nutri-bar-label">{b.label}</span>
            <div className="nutri-bar-track">
              <div className="nutri-bar-fill"
                style={{ width: `${pct(b.val, b.target)}%`, background: b.val > b.target ? "#FF5252" : b.color }} />
            </div>
            <span className="nutri-bar-val" style={{ color: b.val > b.target ? "#FF5252" : b.color }}>
              {b.val}/{b.target}{b.unit}
            </span>
          </div>
        ))}
      </div>

      {/* Akıllı öneri paneli — sadece bugün */}
      {isToday && suggestions.length > 0 && (
        <div className="nutri-smart">
          <div className="nutri-smart-title">📊 Durum & Öneriler</div>
          {suggestions.map((s, i) => (
            <div key={i} className={`nutri-smart-item nutri-smart-${s.type}`}>
              <div className="nutri-smart-row">
                <span className="nutri-smart-icon">{s.icon}</span>
                <span className="nutri-smart-text">{s.text}</span>
              </div>
              {s.foods && (
                <div className="nutri-smart-foods">
                  {s.foods.map((f, j) => (
                    <button key={j} className="nutri-smart-food" onClick={() => handleFoodTap(f)}>
                      <span>{f.name}</span>
                      <span className="nutri-smart-food-meta">{f.cal}kcal · {f.pro}g P</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Miktar seçici popup */}
      {pendingFood && (
        <div className="nutri-mult-overlay" onClick={() => setPendingFood(null)}>
          <div className="nutri-mult-box" onClick={e => e.stopPropagation()}>
            <div className="nutri-mult-name">{pendingFood.food.name}</div>
            <div className="nutri-mult-macros">
              {Math.round(pendingFood.food.cal * pendingFood.multiplier)}kcal ·{" "}
              {Math.round(pendingFood.food.pro * pendingFood.multiplier)}g P ·{" "}
              {Math.round(pendingFood.food.carb * pendingFood.multiplier)}g K
            </div>
            <div className="nutri-mult-btns">
              {MULTIPLIERS.map(m => (
                <button key={m.val}
                  className={`nutri-mult-btn ${pendingFood.multiplier === m.val ? "nutri-mult-active" : ""}`}
                  onClick={() => setPendingFood(p => ({ ...p, multiplier: m.val }))}>
                  {m.label}
                </button>
              ))}
            </div>
            <button className="nutri-mult-add" onClick={() => addFood(pendingFood.food, pendingFood.multiplier)}>
              ✓ Ekle
            </button>
          </div>
        </div>
      )}

      {/* Hızlı ekle — sadece bugün */}
      {isToday && (
        <>
          <button className="nutri-quick-toggle"
            onClick={() => { setShowQuick(!showQuick); setManualOpen(false); }}>
            {showQuick ? "✕ Kapat" : "🍽 Hızlı Ekle"}
          </button>

          {showQuick && (
            <div className="nutri-quick">
              <input className="nutri-search" value={search}
                onChange={e => { setSearch(e.target.value); setActiveCat("Tümü"); }}
                placeholder="🔍 Yemek ara... (ör: tavuk, yulaf, pilav)" />
              <div className="nutri-cat-tabs">
                {CATEGORIES.map(c => (
                  <button key={c}
                    className={`nutri-cat-tab ${activeCat === c ? "nutri-cat-active" : ""}`}
                    onClick={() => { setActiveCat(c); setSearch(""); }}>
                    {c === "Son Yenenler" ? `⭐ Son` : c}
                  </button>
                ))}
              </div>
              <div className="nutri-food-list">
                {listFoods.length === 0 && (
                  <div className="nutri-empty">
                    {activeCat === "Son Yenenler" ? "Henüz geçmiş yok." : `"${search}" bulunamadı.`}
                  </div>
                )}
                {listFoods.map((f, i) => (
                  <button key={i} className="nutri-food-btn" onClick={() => handleFoodTap(f)}>
                    <div className="nutri-food-left">
                      <span className="nutri-food-name">{f.name}</span>
                      {f.count && <span className="nutri-food-freq">{f.count}x</span>}
                    </div>
                    <span className="nutri-food-macros">{f.cal}kcal · {f.pro}g P · {f.carb}g K</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="nutri-manual-toggle"
            onClick={() => { setManualOpen(!manualOpen); setShowQuick(false); }}>
            {manualOpen ? "✕ Kapat" : "✏️ Manuel Ekle"}
          </button>

          {manualOpen && (
            <div className="nutri-manual">
              <input className="nutri-m-input" value={manual.name}
                onChange={e => setManual(p => ({ ...p, name: e.target.value }))}
                placeholder="Yemek adı" />
              <div className="nutri-m-row">
                <input className="nutri-m-num" type="number" inputMode="numeric" value={manual.cal}
                  onChange={e => setManual(p => ({ ...p, cal: e.target.value }))} placeholder="kcal" />
                <input className="nutri-m-num" type="number" inputMode="numeric" value={manual.pro}
                  onChange={e => setManual(p => ({ ...p, pro: e.target.value }))} placeholder="protein g" />
                <input className="nutri-m-num" type="number" inputMode="numeric" value={manual.carb}
                  onChange={e => setManual(p => ({ ...p, carb: e.target.value }))} placeholder="karb g" />
                <input className="nutri-m-num" type="number" inputMode="numeric" value={manual.fat}
                  onChange={e => setManual(p => ({ ...p, fat: e.target.value }))} placeholder="yağ g" />
              </div>
              <button className="nutri-m-save" onClick={addManual}>Ekle</button>
            </div>
          )}
        </>
      )}

      {/* Günlük log — öğüne göre gruplu */}
      {entries.length > 0 ? (
        <div className="nutri-log">
          <div className="nutri-log-title">{formatDate(activeDate)} — {entries.length} öğün · {totals.calories}kcal</div>
          {Object.entries(grouped).map(([meal, items]) => (
            <div key={meal} className="nutri-meal-group">
              <div className="nutri-meal-label">{meal}</div>
              {items.map(e => (
                <div key={e.id} className="nutri-entry">
                  <div className="nutri-entry-left">
                    <span className="nutri-entry-time">{e.time}</span>
                    <span className="nutri-entry-name">{e.name}</span>
                  </div>
                  <div className="nutri-entry-right">
                    <span className="nutri-entry-macro">{e.pro}g P</span>
                    <span className="nutri-entry-cal">{e.cal}kcal</span>
                    {isToday && (
                      <button className="nutri-entry-del" onClick={() => removeEntry(e.id)}>✕</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="nutri-empty-day">
          {isToday ? "Bugün henüz bir şey eklenmedi." : "Bu gün için kayıt yok."}
        </div>
      )}
    </div>
  );
}

function MacroRing({ label, val, target, unit, color }) {
  const pct = Math.min((val / target) * 100, 100);
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const over = val > target;
  return (
    <div className="macro-ring">
      <svg width="68" height="68" viewBox="0 0 68 68">
        <circle cx="34" cy="34" r={r} fill="none" stroke="#222" strokeWidth="5" />
        <circle cx="34" cy="34" r={r} fill="none" stroke={over ? "#FF5252" : color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 34 34)"
          style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      </svg>
      <div className="macro-ring-inner">
        <span className="macro-ring-val" style={{ color: over ? "#FF5252" : "#fff" }}>{val}</span>
        <span className="macro-ring-unit">{unit}</span>
      </div>
      <div className="macro-ring-label">{label}</div>
    </div>
  );
}
