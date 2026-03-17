import { useState, useEffect } from "react";
import "./Nutrition.css";

const TARGETS = { calories: 2200, protein: 150, carbs: 250, fat: 70 };

// Yaygın Türk yemekleri + temel besinler
const QUICK_FOODS = [
  { name: "Yumurta (1)", cal: 78, pro: 6, carb: 1, fat: 5 },
  { name: "Yulaf (40g)", cal: 150, pro: 5, carb: 27, fat: 3 },
  { name: "Muz (1)", cal: 105, pro: 1, carb: 27, fat: 0 },
  { name: "Tavuk göğsü (150g)", cal: 230, pro: 43, carb: 0, fat: 5 },
  { name: "Pirinç pilav (200g)", cal: 260, pro: 5, carb: 56, fat: 1 },
  { name: "Makarna (200g)", cal: 280, pro: 10, carb: 56, fat: 1 },
  { name: "Ekmek (1 dilim)", cal: 80, pro: 3, carb: 15, fat: 1 },
  { name: "Peynir (30g)", cal: 110, pro: 7, carb: 0, fat: 9 },
  { name: "Süt (200ml)", cal: 120, pro: 7, carb: 10, fat: 5 },
  { name: "Yoğurt (200g)", cal: 120, pro: 8, carb: 8, fat: 6 },
  { name: "Ayran (200ml)", cal: 60, pro: 3, carb: 4, fat: 3 },
  { name: "Ton balığı konserve (100g)", cal: 130, pro: 26, carb: 0, fat: 3 },
  { name: "Whey protein (1 scoop)", cal: 120, pro: 24, carb: 3, fat: 2 },
  { name: "Badem (30g)", cal: 170, pro: 6, carb: 6, fat: 15 },
  { name: "Avokado (yarım)", cal: 120, pro: 1, carb: 6, fat: 11 },
  { name: "Zeytinyağı (1 yk)", cal: 120, pro: 0, carb: 0, fat: 14 },
  { name: "Çorba (1 kase)", cal: 150, pro: 5, carb: 20, fat: 5 },
  { name: "Salata (1 porsiyon)", cal: 80, pro: 2, carb: 10, fat: 4 },
  { name: "Kıyma (100g)", cal: 250, pro: 26, carb: 0, fat: 15 },
  { name: "Kuru fasulye (200g)", cal: 240, pro: 16, carb: 40, fat: 1 },
  { name: "Mercimek çorbası", cal: 180, pro: 10, carb: 28, fat: 3 },
  { name: "Döner (1 porsiyon)", cal: 450, pro: 30, carb: 35, fat: 20 },
  { name: "Lahmacun (1)", cal: 200, pro: 8, carb: 25, fat: 8 },
  { name: "Pide (1 dilim)", cal: 300, pro: 12, carb: 35, fat: 12 },
];

function todayKey() {
  return `yb_nutrition_${new Date().toISOString().slice(0, 10)}`;
}

function loadToday() {
  try {
    return JSON.parse(localStorage.getItem(todayKey()) || "[]");
  } catch { return []; }
}

function saveToday(entries) {
  try { localStorage.setItem(todayKey(), JSON.stringify(entries)); } catch {}
}

export default function NutritionTracker() {
  const [entries, setEntries] = useState(loadToday);
  const [search, setSearch] = useState("");
  const [showQuick, setShowQuick] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [manual, setManual] = useState({ name: "", cal: "", pro: "", carb: "", fat: "" });

  // Reload on day change
  useEffect(() => {
    const interval = setInterval(() => {
      const current = loadToday();
      if (JSON.stringify(current) !== JSON.stringify(entries)) {
        setEntries(current);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [entries]);

  const totals = entries.reduce((acc, e) => ({
    calories: acc.calories + (e.cal || 0),
    protein: acc.protein + (e.pro || 0),
    carbs: acc.carbs + (e.carb || 0),
    fat: acc.fat + (e.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const addFood = (food) => {
    const next = [...entries, { ...food, id: Date.now(), time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) }];
    setEntries(next);
    saveToday(next);
    setSearch("");
    setShowQuick(false);
    if (navigator.vibrate) navigator.vibrate(15);
  };

  const addManual = () => {
    if (!manual.name.trim() || !manual.cal) return;
    addFood({
      name: manual.name.trim(),
      cal: parseInt(manual.cal) || 0,
      pro: parseInt(manual.pro) || 0,
      carb: parseInt(manual.carb) || 0,
      fat: parseInt(manual.fat) || 0,
    });
    setManual({ name: "", cal: "", pro: "", carb: "", fat: "" });
    setManualOpen(false);
  };

  const removeEntry = (id) => {
    const next = entries.filter(e => e.id !== id);
    setEntries(next);
    saveToday(next);
  };

  const pct = (val, target) => Math.min((val / target) * 100, 100);
  const filtered = search ? QUICK_FOODS.filter(f => f.name.toLowerCase().includes(search.toLowerCase())) : QUICK_FOODS;

  return (
    <div className="nutrition">
      {/* Macro rings */}
      <div className="nutri-rings">
        <MacroRing label="Kalori" val={totals.calories} target={TARGETS.calories} unit="kcal" color="#FF6B35" />
        <MacroRing label="Protein" val={totals.protein} target={TARGETS.protein} unit="g" color="#4FC3F7" />
        <MacroRing label="Karb" val={totals.carbs} target={TARGETS.carbs} unit="g" color="#66BB6A" />
        <MacroRing label="Yağ" val={totals.fat} target={TARGETS.fat} unit="g" color="#FFA726" />
      </div>

      {/* Progress bars */}
      <div className="nutri-bars">
        {[
          { label: "Kalori", val: totals.calories, target: TARGETS.calories, color: "#FF6B35", unit: "kcal" },
          { label: "Protein", val: totals.protein, target: TARGETS.protein, color: "#4FC3F7", unit: "g" },
        ].map(b => (
          <div key={b.label} className="nutri-bar-row">
            <span className="nutri-bar-label">{b.label}</span>
            <div className="nutri-bar-track">
              <div className="nutri-bar-fill" style={{ width: `${pct(b.val, b.target)}%`, background: b.color }} />
            </div>
            <span className="nutri-bar-val" style={{ color: b.color }}>{b.val}/{b.target}{b.unit}</span>
          </div>
        ))}
      </div>

      {/* Quick add */}
      <button className="nutri-quick-toggle" onClick={() => { setShowQuick(!showQuick); setManualOpen(false); }}>
        {showQuick ? "✕ Kapat" : "🍽 Hızlı Ekle"}
      </button>

      {showQuick && (
        <div className="nutri-quick">
          <input className="nutri-search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Yemek ara... (ör: tavuk, yulaf, pilav)" />
          <div className="nutri-food-list">
            {filtered.map((f, i) => (
              <button key={i} className="nutri-food-btn" onClick={() => addFood(f)}>
                <span className="nutri-food-name">{f.name}</span>
                <span className="nutri-food-macros">{f.cal}kcal · {f.pro}p</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Manual add */}
      <button className="nutri-manual-toggle" onClick={() => { setManualOpen(!manualOpen); setShowQuick(false); }}>
        {manualOpen ? "✕ Kapat" : "✏️ Manuel Ekle"}
      </button>

      {manualOpen && (
        <div className="nutri-manual">
          <input className="nutri-m-input" value={manual.name} onChange={e => setManual(p => ({ ...p, name: e.target.value }))} placeholder="Yemek adı" />
          <div className="nutri-m-row">
            <input className="nutri-m-num" type="number" inputMode="numeric" value={manual.cal} onChange={e => setManual(p => ({ ...p, cal: e.target.value }))} placeholder="kcal" />
            <input className="nutri-m-num" type="number" inputMode="numeric" value={manual.pro} onChange={e => setManual(p => ({ ...p, pro: e.target.value }))} placeholder="protein" />
            <input className="nutri-m-num" type="number" inputMode="numeric" value={manual.carb} onChange={e => setManual(p => ({ ...p, carb: e.target.value }))} placeholder="karb" />
            <input className="nutri-m-num" type="number" inputMode="numeric" value={manual.fat} onChange={e => setManual(p => ({ ...p, fat: e.target.value }))} placeholder="yağ" />
          </div>
          <button className="nutri-m-save" onClick={addManual}>Ekle</button>
        </div>
      )}

      {/* Today's entries */}
      {entries.length > 0 && (
        <div className="nutri-log">
          <div className="nutri-log-title">Bugün ({entries.length} öğün)</div>
          {entries.map(e => (
            <div key={e.id} className="nutri-entry">
              <div className="nutri-entry-left">
                <span className="nutri-entry-time">{e.time}</span>
                <span className="nutri-entry-name">{e.name}</span>
              </div>
              <div className="nutri-entry-right">
                <span className="nutri-entry-cal">{e.cal}kcal</span>
                <button className="nutri-entry-del" onClick={() => removeEntry(e.id)}>✕</button>
              </div>
            </div>
          ))}
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
  return (
    <div className="macro-ring">
      <svg width="68" height="68" viewBox="0 0 68 68">
        <circle cx="34" cy="34" r={r} fill="none" stroke="#222" strokeWidth="5" />
        <circle cx="34" cy="34" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 34 34)"
          style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      </svg>
      <div className="macro-ring-inner">
        <span className="macro-ring-val">{val}</span>
        <span className="macro-ring-unit">{unit}</span>
      </div>
      <div className="macro-ring-label">{label}</div>
    </div>
  );
}
