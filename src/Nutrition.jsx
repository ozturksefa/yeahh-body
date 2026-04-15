import { useState, useEffect } from "react";
import "./Nutrition.css";
import { shiftLocalDate } from "./dateUtils";
import MealRecommendation from "./MealRecommendation";
import { PROGRAM3 } from "./data3";
import MacroRing from "./nutrition/MacroRing";
import {
  CATEGORIES,
  MULTIPLIERS,
  NUTRI_MACRO_THEMES,
  QUICK_FOODS,
} from "./nutrition/foodDatabase";
import {
  formatDate,
  getHybridNutritionContext,
  getMealLabel,
  getRecentFoods,
  getSessionNutritionSuggestions,
  getSmartSuggestions,
  loadEntries,
  loadTargets,
  saveEntries,
  todayStr,
} from "./nutrition/nutritionUtils";

export default function NutritionTracker({ currentDay = null, currentMode = null, currentSession = null }) {
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
  const [showMealRec, setShowMealRec] = useState(false);

  // Aktif programdan bugünün günü
  const fallbackDay = (() => {
    const days = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
    const todayName = days[new Date().getDay()];
    const dayMap = { 'Salı': 1, 'Perşembe': 2, 'Cumartesi': 3, 'Pazar': 4 };
    const dayId = dayMap[todayName];
    return dayId ? PROGRAM3.days.find(d => d.id === dayId) : PROGRAM3.days.find(d => d.type === 'offday');
  })();

  const activeDay = currentDay || fallbackDay;
  const nutritionContext = getHybridNutritionContext(activeDay, currentMode);

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

  const suggestions = [
    ...getSmartSuggestions(totals, targets),
    ...getSessionNutritionSuggestions(currentSession, nutritionContext),
  ];

  const saveTargets = (newTargets) => {
    setTargets(newTargets);
    try { localStorage.setItem("yb_targets", JSON.stringify(newTargets)); } catch { return }
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
    const next = shiftLocalDate(activeDate, dir);
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
    <div className="nutrition" data-testid="nutrition-page">

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
          <button className="nutri-target-reset" onClick={() => saveTargets({ calories: 2200, protein: 150, carbs: 250, fat: 70, bodyWeight: 75 })}>
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
        <MacroRing label="Kalori" val={totals.calories} target={targets.calories} unit="kcal" color={NUTRI_MACRO_THEMES.calories.fg} />
        <MacroRing label="Protein" val={totals.protein} target={targets.protein} unit="g" color={NUTRI_MACRO_THEMES.protein.fg} />
        <MacroRing label="Karb" val={totals.carbs} target={targets.carbs} unit="g" color={NUTRI_MACRO_THEMES.carbs.fg} />
        <MacroRing label="Yağ" val={totals.fat} target={targets.fat} unit="g" color={NUTRI_MACRO_THEMES.fat.fg} />
      </div>

      {/* Progress bars */}
      <div className="nutri-bars">
        {[
          { label: "Kalori", val: totals.calories, target: targets.calories, color: NUTRI_MACRO_THEMES.calories.fg, unit: "kcal" },
          { label: "Protein", val: totals.protein, target: targets.protein, color: NUTRI_MACRO_THEMES.protein.fg, unit: "g" },
          { label: "Karb", val: totals.carbs, target: targets.carbs, color: NUTRI_MACRO_THEMES.carbs.fg, unit: "g" },
          { label: "Yağ", val: totals.fat, target: targets.fat, color: NUTRI_MACRO_THEMES.fat.fg, unit: "g" },
        ].map(b => (
          <div key={b.label} className="nutri-bar-row">
            <span className="nutri-bar-label">{b.label}</span>
            <div className="nutri-bar-track">
              <div className="nutri-bar-fill"
                style={{ width: `${pct(b.val, b.target)}%`, background: b.val > b.target ? NUTRI_MACRO_THEMES.danger : b.color }} />
            </div>
            <span className="nutri-bar-val" style={{ color: b.val > b.target ? NUTRI_MACRO_THEMES.danger : b.color }}>
              {b.val}/{b.target}{b.unit}
            </span>
          </div>
        ))}
      </div>

      {/* Kısa kritik notlar — sadece bugün */}
      {isToday && suggestions.filter((item) => item.type === "warn").length > 0 && (
        <div className="nutri-smart">
          <div className="nutri-smart-title">Kısa Not</div>
          {suggestions.filter((item) => item.type === "warn").slice(0, 2).map((s, i) => (
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

      {isToday && nutritionContext && (
        <>
          <button data-testid="nutrition-meal-toggle" className="nutri-quick-toggle"
            onClick={() => setShowMealRec(s => !s)}>
            {showMealRec ? "✕ Öğün Önerisini Kapat" : "🍽 Hibrit Gününe Göre Öğün Önerisi"}
          </button>

          {showMealRec && (
            <MealRecommendation
              day={activeDay}
              targets={targets}
              totals={totals}
              dayTypeOverride={nutritionContext.dayType}
              contextLabel={nutritionContext.label}
              contextNote={nutritionContext.note}
            />
          )}
        </>
      )}

      {/* Miktar seçici popup */}
      {pendingFood && (
        <div className="nutri-mult-overlay" data-testid="nutrition-multiplier-overlay" onClick={() => setPendingFood(null)}>
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
            <button data-testid="nutrition-multiplier-add" className="nutri-mult-add" onClick={() => addFood(pendingFood.food, pendingFood.multiplier)}>
              ✓ Ekle
            </button>
          </div>
        </div>
      )}

      {/* Hızlı ekle — sadece bugün */}
      {isToday && (
        <>
          <button data-testid="nutrition-quick-toggle" className="nutri-quick-toggle"
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
                  <button key={i} data-testid={`nutrition-food-${i}`} className="nutri-food-btn" onClick={() => handleFoodTap(f)}>
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

          <button data-testid="nutrition-manual-toggle" className="nutri-manual-toggle"
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
              <button data-testid="nutrition-manual-save" className="nutri-m-save" onClick={addManual}>Ekle</button>
            </div>
          )}
        </>
      )}

      {/* Günlük log — öğüne göre gruplu */}
      {entries.length > 0 ? (
        <div className="nutri-log" data-testid="nutrition-log">
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
