import { useState, useEffect, useRef } from "react";
import "./Nutrition.css";

const TARGETS = { calories: 2200, protein: 150, carbs: 250, fat: 70 };

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

const CATEGORIES = ["Tümü", "Kahvaltı", "Protein", "Karb", "Türk", "Meyve", "Yağ", "İçecek"];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (dateStr === today) return "Bugün";
  if (dateStr === yesterday) return "Dün";
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
}

function loadEntries(dateStr) {
  try { return JSON.parse(localStorage.getItem("yb_nutrition_" + dateStr) || "[]"); } catch { return []; }
}

function saveEntries(dateStr, entries) {
  try { localStorage.setItem("yb_nutrition_" + dateStr, JSON.stringify(entries)); } catch {}
}

export default function NutritionTracker() {
  const [activeDate, setActiveDate] = useState(todayStr());
  const [entries, setEntries] = useState(() => loadEntries(todayStr()));
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Tümü");
  const [showQuick, setShowQuick] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [manual, setManual] = useState({ name: "", cal: "", pro: "", carb: "", fat: "" });
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [aiError, setAiError] = useState(null);

  useEffect(() => {
    setEntries(loadEntries(activeDate));
  }, [activeDate]);

  const totals = entries.reduce((acc, e) => ({
    calories: acc.calories + (e.cal || 0),
    protein: acc.protein + (e.pro || 0),
    carbs: acc.carbs + (e.carb || 0),
    fat: acc.fat + (e.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const addFood = (food) => {
    const next = [...entries, {
      ...food, id: Date.now(),
      time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
    }];
    setEntries(next);
    saveEntries(activeDate, next);
    setSearch("");
    setShowQuick(false);
    if (navigator.vibrate) navigator.vibrate(15);
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

  const filtered = QUICK_FOODS.filter(f => {
    const matchCat = activeCat === "Tümü" || f.cat === activeCat;
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // AI: doğal dil ile yemek ekle
  const handleAiParse = async () => {
    const text = aiInput.trim();
    if (!text || aiLoading) return;
    setAiLoading(true);
    setAiError(null);
    setAiSuggestion(null);
    const remaining = {
      calories: Math.max(0, TARGETS.calories - totals.calories),
      protein: Math.max(0, TARGETS.protein - totals.protein),
    };
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-opus-4-6",
          max_tokens: 1000,
          system: `Spor beslenmesi uzmanısın. Kullanıcı ne yediğini Türkçe anlatır, sen JSON çıkar.
Hedefler: ${TARGETS.calories}kcal, ${TARGETS.protein}g protein, ${TARGETS.carbs}g karb, ${TARGETS.fat}g yağ.
Tüketilen: ${totals.calories}kcal, ${totals.protein}g protein. Kalan: ${remaining.calories}kcal, ${remaining.protein}g protein.
Kullanıcı: Sefa, 26 yaş, antrenman yapıyor, sağ omuz rotator cuff yırtığı var.
SADECE JSON döndür:
{"foods":[{"name":"yemek","cal":0,"pro":0,"carb":0,"fat":0}],"comment":"kısa türkçe yorum"}
Öneri istiyorsa foods boş dizi, comment'e öneri yaz.`,
          messages: [{ role: "user", content: text }],
        }),
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      if (parsed.foods?.length > 0) {
        setAiSuggestion({ type: "foods", foods: parsed.foods, comment: parsed.comment });
      } else {
        setAiSuggestion({ type: "comment", comment: parsed.comment });
      }
    } catch {
      setAiError("Hata oluştu. Tekrar dene.");
    }
    setAiLoading(false);
  };

  // AI: günlük analiz
  const handleAiAdvice = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiSuggestion(null);
    const todayLog = entries.map(e => `${e.name} (${e.cal}kcal, ${e.pro}g P)`).join(", ") || "Henüz hiçbir şey yenmedi";
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-opus-4-6",
          max_tokens: 1000,
          system: `Spor beslenmesi uzmanısın. Kısa pratik Türkçe öneriler ver.
Kullanıcı: Sefa, 26 yaş, 4 gün/hafta antrenman (rehabilitasyon + kalistenik). Sağ omuz rotator cuff, diz menisküs, skolyoz.
Hedef: ${TARGETS.calories}kcal, ${TARGETS.protein}g protein, ${TARGETS.carbs}g karb, ${TARGETS.fat}g yağ.
Tüketilen: ${totals.calories}kcal, ${totals.protein}g P, ${totals.carbs}g K, ${totals.fat}g Y.
Yenenler: ${todayLog}
SADECE JSON döndür:
{"status":"iyi|dikkat|eksik","summary":"1 cümle","suggestions":["öneri1","öneri2","öneri3"],"warning":null}`,
          messages: [{ role: "user", content: "Analiz et." }],
        }),
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setAiSuggestion({ type: "advice", ...parsed });
    } catch {
      setAiError("Analiz alınamadı.");
    }
    setAiLoading(false);
  };

  const confirmAiFoods = () => {
    if (!aiSuggestion?.foods) return;
    aiSuggestion.foods.forEach(f => addFood(f));
    setAiInput("");
    setAiSuggestion(null);
  };

  return (
    <div className="nutrition">

      {/* Tarih nav */}
      <div className="nutri-date-nav">
        <button className="nutri-date-btn" onClick={() => navigateDay(-1)}>‹</button>
        <span className="nutri-date-label">{formatDate(activeDate)}</span>
        <button className="nutri-date-btn" onClick={() => navigateDay(1)} disabled={isToday} style={{ opacity: isToday ? 0.3 : 1 }}>›</button>
      </div>

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
          { label: "Karb", val: totals.carbs, target: TARGETS.carbs, color: "#66BB6A", unit: "g" },
          { label: "Yağ", val: totals.fat, target: TARGETS.fat, color: "#FFA726", unit: "g" },
        ].map(b => (
          <div key={b.label} className="nutri-bar-row">
            <span className="nutri-bar-label">{b.label}</span>
            <div className="nutri-bar-track">
              <div className="nutri-bar-fill" style={{ width: `${pct(b.val, b.target)}%`, background: b.val > b.target ? "#FF5252" : b.color }} />
            </div>
            <span className="nutri-bar-val" style={{ color: b.val > b.target ? "#FF5252" : b.color }}>{b.val}/{b.target}{b.unit}</span>
          </div>
        ))}
      </div>

      {/* AI panel — sadece bugün */}
      {isToday && (
        <div className="nutri-ai-section">
          <div className="nutri-ai-row">
            <input
              className="nutri-ai-input"
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAiParse()}
              placeholder="Ne yedin? Yaz → AI eklesin... (ör: 2 yumurta ve ayran içtim)"
              disabled={aiLoading}
            />
            <button className="nutri-ai-send" onClick={handleAiParse} disabled={aiLoading || !aiInput.trim()}>
              {aiLoading ? "⏳" : "✦"}
            </button>
          </div>
          <button className="nutri-ai-advice-btn" onClick={handleAiAdvice} disabled={aiLoading}>
            {aiLoading && !aiInput ? "⏳ Analiz ediliyor..." : "✦ Günlük Analiz & Öneri"}
          </button>

          {aiError && <div className="nutri-ai-error">{aiError}</div>}

          {aiSuggestion?.type === "foods" && (
            <div className="nutri-ai-result">
              <div className="nutri-ai-result-title">AI tespit etti:</div>
              {aiSuggestion.foods.map((f, i) => (
                <div key={i} className="nutri-ai-food-row">
                  <span className="nutri-ai-food-name">{f.name}</span>
                  <span className="nutri-ai-food-macro">{f.cal}kcal · {f.pro}g P</span>
                </div>
              ))}
              {aiSuggestion.comment && <div className="nutri-ai-comment">{aiSuggestion.comment}</div>}
              <div className="nutri-ai-actions">
                <button className="nutri-ai-confirm" onClick={confirmAiFoods}>✓ Tümünü Ekle</button>
                <button className="nutri-ai-cancel" onClick={() => { setAiSuggestion(null); setAiInput(""); }}>İptal</button>
              </div>
            </div>
          )}

          {aiSuggestion?.type === "comment" && (
            <div className="nutri-ai-result">
              <div className="nutri-ai-comment">{aiSuggestion.comment}</div>
              <button className="nutri-ai-cancel" onClick={() => setAiSuggestion(null)}>Kapat</button>
            </div>
          )}

          {aiSuggestion?.type === "advice" && (
            <div className="nutri-ai-result">
              <div className={`nutri-ai-status nutri-ai-status-${aiSuggestion.status}`}>
                {aiSuggestion.status === "iyi" ? "✅" : aiSuggestion.status === "dikkat" ? "⚠️" : "❌"} {aiSuggestion.summary}
              </div>
              <div className="nutri-ai-suggestions">
                {aiSuggestion.suggestions?.map((s, i) => (
                  <div key={i} className="nutri-ai-suggestion-item">• {s}</div>
                ))}
              </div>
              {aiSuggestion.warning && <div className="nutri-ai-warning">⚠ {aiSuggestion.warning}</div>}
              <button className="nutri-ai-cancel" onClick={() => setAiSuggestion(null)}>Kapat</button>
            </div>
          )}
        </div>
      )}

      {/* Hızlı ekle — sadece bugün */}
      {isToday && (
        <>
          <button className="nutri-quick-toggle" onClick={() => { setShowQuick(!showQuick); setManualOpen(false); }}>
            {showQuick ? "✕ Kapat" : "🍽 Hızlı Ekle"}
          </button>

          {showQuick && (
            <div className="nutri-quick">
              <input className="nutri-search" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Yemek ara..." />
              <div className="nutri-cat-tabs">
                {CATEGORIES.map(c => (
                  <button key={c} className={`nutri-cat-tab ${activeCat === c ? "nutri-cat-active" : ""}`}
                    onClick={() => setActiveCat(c)}>{c}</button>
                ))}
              </div>
              <div className="nutri-food-list">
                {filtered.map((f, i) => (
                  <button key={i} className="nutri-food-btn" onClick={() => addFood(f)}>
                    <span className="nutri-food-name">{f.name}</span>
                    <span className="nutri-food-macros">{f.cal}kcal · {f.pro}g P · {f.carb}g K</span>
                  </button>
                ))}
                {filtered.length === 0 && <div className="nutri-empty">"{search}" bulunamadı.</div>}
              </div>
            </div>
          )}

          <button className="nutri-manual-toggle" onClick={() => { setManualOpen(!manualOpen); setShowQuick(false); }}>
            {manualOpen ? "✕ Kapat" : "✏️ Manuel Ekle"}
          </button>

          {manualOpen && (
            <div className="nutri-manual">
              <input className="nutri-m-input" value={manual.name}
                onChange={e => setManual(p => ({ ...p, name: e.target.value }))} placeholder="Yemek adı" />
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

      {/* Günlük log */}
      {entries.length > 0 ? (
        <div className="nutri-log">
          <div className="nutri-log-title">{formatDate(activeDate)} — {entries.length} öğün</div>
          {entries.map(e => (
            <div key={e.id} className="nutri-entry">
              <div className="nutri-entry-left">
                <span className="nutri-entry-time">{e.time}</span>
                <span className="nutri-entry-name">{e.name}</span>
              </div>
              <div className="nutri-entry-right">
                <span className="nutri-entry-macro">{e.pro}g P</span>
                <span className="nutri-entry-cal">{e.cal}kcal</span>
                {isToday && <button className="nutri-entry-del" onClick={() => removeEntry(e.id)}>✕</button>}
              </div>
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
