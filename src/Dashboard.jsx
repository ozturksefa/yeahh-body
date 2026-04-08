import { useEffect, useMemo, useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine
} from "recharts";
import {
  getDashboardStats, getWeeklyStats
} from "./tracker";
import { todayLocalDate } from "./dateUtils";

// ─── Renk paleti ───────────────────────────────────────────────
const C = {
  red: "#D41920", green: "#00C853", warn: "#FFA726",
  blue: "#4FC3F7", teal: "#2A9D8F", purple: "#8338EC",
  card: "#131316", card2: "#1A1A1E", card3: "#222226",
  border: "#2A2A30", text: "#FFFFFF", text2: "#C4C4CC", text3: "#7A7A84",
};

// ─── Vücut Ölçüm Takibi ────────────────────────────────────────
const BODY_KEY = "yb_body_measurements";

function loadMeasurements() {
  try { return JSON.parse(localStorage.getItem(BODY_KEY) || "[]"); } catch { return []; }
}
function saveMeasurements(data) {
  try { localStorage.setItem(BODY_KEY, JSON.stringify(data)); } catch { return }
}

const MEASURE_FIELDS = [
  { key: "weight",  label: "Vücut Ağırlığı", unit: "kg",   icon: "⚖️" },
  { key: "chest",   label: "Göğüs",          unit: "cm",   icon: "💪" },
  { key: "waist",   label: "Bel",            unit: "cm",   icon: "📏" },
  { key: "arm",     label: "Kol",            unit: "cm",   icon: "💪" },
  { key: "hip",     label: "Kalça",          unit: "cm",   icon: "📐" },
  { key: "thigh",   label: "Bacak",          unit: "cm",   icon: "🦵" },
];

function BodyTracker() {
  const [entries, setEntries] = useState(loadMeasurements);
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const [activeField, setActiveField] = useState("weight");

  const save = () => {
    if (Object.keys(form).length === 0) return;
    const entry = { date: todayLocalDate(), ...form };
    const next = [entry, ...entries].slice(0, 52); // son 52 hafta
    setEntries(next);
    saveMeasurements(next);
    setForm({});
    setOpen(false);
  };

  // Grafik verisi — seçili alan için son 12 giriş
  const chartData = [...entries].reverse().slice(-12).map(e => ({
    date: e.date?.slice(5),
    value: e[activeField] || null,
  })).filter(d => d.value);

  const latest = entries[0];
  const prev = entries[1];
  const diff = latest && prev && latest[activeField] && prev[activeField]
    ? (parseFloat(latest[activeField]) - parseFloat(prev[activeField])).toFixed(1)
    : null;

  return (
    <div className="dash-section">
      <div className="dash-section-title">📏 Vücut Ölçüm Takibi</div>

      {/* Alan seçici */}
      <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:10 }}>
        {MEASURE_FIELDS.map(f => (
          <button key={f.key} onClick={() => setActiveField(f.key)} style={{
            padding:"5px 10px", borderRadius:20, border:"none", cursor:"pointer",
            background: activeField===f.key ? C.teal : C.card3,
            color: activeField===f.key ? "#fff" : C.text3,
            fontSize:11, fontWeight:700,
          }}>{f.icon} {f.label}</button>
        ))}
      </div>

      {/* Güncel değer */}
      {latest && (
        <div style={{ display:"flex", gap:8, marginBottom:10 }}>
          <div style={{ flex:1, background:C.card2, borderRadius:8, padding:"10px 12px" }}>
            <div style={{ fontSize:11, color:C.text3 }}>{MEASURE_FIELDS.find(f=>f.key===activeField)?.label}</div>
            <div style={{ fontSize:24, fontWeight:800, color:C.teal, fontFamily:"monospace", marginTop:2 }}>
              {latest[activeField] || "—"}
              <span style={{ fontSize:12, color:C.text3, fontWeight:400, marginLeft:4 }}>
                {MEASURE_FIELDS.find(f=>f.key===activeField)?.unit}
              </span>
            </div>
            {diff !== null && (
              <div style={{ fontSize:11, marginTop:4,
                color: parseFloat(diff) < 0 ? C.green : parseFloat(diff) > 0 ? C.warn : C.text3 }}>
                {parseFloat(diff) > 0 ? "▲" : parseFloat(diff) < 0 ? "▼" : "="} {Math.abs(diff)} {MEASURE_FIELDS.find(f=>f.key===activeField)?.unit} önceki girişten
              </div>
            )}
            <div style={{ fontSize:10, color:C.text3, marginTop:2 }}>{latest.date}</div>
          </div>
        </div>
      )}

      {/* Grafik */}
      {chartData.length >= 2 && (
        <div style={{ marginBottom:12 }}>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={chartData} margin={{ top:5, right:10, left:-20, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="date" tick={{ fontSize:10, fill:C.text3 }} />
              <YAxis tick={{ fontSize:10, fill:C.text3 }} domain={["auto","auto"]} />
              <Tooltip
                contentStyle={{ background:C.card2, border:`1px solid ${C.border}`, borderRadius:6, fontSize:11 }}
                labelStyle={{ color:C.text3 }} itemStyle={{ color:C.teal }}
              />
              <Line type="monotone" dataKey="value" stroke={C.teal} strokeWidth={2}
                dot={{ fill:C.teal, r:3 }} activeDot={{ r:5 }}
                connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      {chartData.length < 2 && entries.length > 0 && (
        <div style={{ fontSize:11, color:C.text3, padding:"8px 0", marginBottom:8 }}>
          Grafik için en az 2 giriş gerekli
        </div>
      )}

      {/* Giriş formu */}
      {open ? (
        <div style={{ background:C.card2, borderRadius:8, padding:12, marginBottom:8 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
            {MEASURE_FIELDS.map(f => (
              <div key={f.key}>
                <div style={{ fontSize:10, color:C.text3, marginBottom:3 }}>{f.icon} {f.label} ({f.unit})</div>
                <input
                  type="number" inputMode="decimal" placeholder="—"
                  value={form[f.key] || ""}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{ width:"100%", background:C.card3, border:`1px solid ${C.border}`,
                    color:C.text, borderRadius:6, padding:"6px 8px", fontSize:13, boxSizing:"border-box" }}
                />
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:6 }}>
            <button onClick={save} style={{
              flex:1, padding:"10px", background:C.teal, border:"none",
              borderRadius:6, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer",
            }}>Kaydet</button>
            <button onClick={() => setOpen(false)} style={{
              padding:"10px 14px", background:C.card3, border:`1px solid ${C.border}`,
              borderRadius:6, color:C.text2, fontSize:13, cursor:"pointer",
            }}>İptal</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} style={{
          width:"100%", padding:"10px", background:C.card3, border:`1px solid ${C.border}`,
          borderRadius:6, color:C.text2, fontSize:12, fontWeight:600, cursor:"pointer",
        }}>+ Yeni Ölçüm Ekle</button>
      )}

      {/* Son girişler */}
      {entries.length > 0 && (
        <div style={{ marginTop:8 }}>
          {entries.slice(0,3).map((e,i) => (
            <div key={i} style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"6px 0", borderBottom:`1px solid ${C.border}`, fontSize:11,
            }}>
              <span style={{ color:C.text3 }}>{e.date}</span>
              <div style={{ display:"flex", gap:10 }}>
                {MEASURE_FIELDS.filter(f => e[f.key]).map(f => (
                  <span key={f.key} style={{ color:C.text2 }}>
                    <span style={{ color:C.text3 }}>{f.label}: </span>
                    {e[f.key]}{f.unit}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Egzersiz İlerleme Grafiği ─────────────────────────────────
function ExerciseProgressChart({ exerciseProgress }) {
  const exercises = Object.entries(exerciseProgress || {})
    .filter(([,pts]) => pts.length >= 2)
    .sort((a,b) => b[1].length - a[1].length)
    .slice(0, 12);

  const [selected, setSelected] = useState(exercises[0]?.[0] || null);

  if (exercises.length === 0) {
    return (
      <div style={{ fontSize:12, color:C.text3, padding:"12px 0" }}>
        En az 2 antrenman sonrası egzersiz grafiği görünecek
      </div>
    );
  }

  const pts = (exerciseProgress[selected] || []).map(p => ({
    date: p.date?.slice(5),
    weight: p.weight,
  }));

  const first = pts[0]?.weight || 0;
  const last = pts[pts.length-1]?.weight || 0;
  const gain = last - first;

  return (
    <div>
      {/* Egzersiz seçici */}
      <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:10, overflowX:"auto" }}>
        {exercises.map(([name]) => (
          <button key={name} onClick={() => setSelected(name)} style={{
            padding:"4px 10px", borderRadius:20, border:"none", cursor:"pointer",
            background: selected===name ? C.red : C.card3,
            color: selected===name ? "#fff" : C.text3,
            fontSize:10, fontWeight:700, whiteSpace:"nowrap",
          }}>{name}</button>
        ))}
      </div>

      {/* Kazanım */}
      {gain !== 0 && (
        <div style={{
          display:"flex", gap:12, marginBottom:8,
          padding:"8px 12px", background:C.card2, borderRadius:8,
        }}>
          <div>
            <div style={{ fontSize:10, color:C.text3 }}>Başlangıç</div>
            <div style={{ fontSize:16, fontWeight:800, fontFamily:"monospace" }}>{first}kg</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", color:C.text3, fontSize:16 }}>→</div>
          <div>
            <div style={{ fontSize:10, color:C.text3 }}>Güncel</div>
            <div style={{ fontSize:16, fontWeight:800, fontFamily:"monospace", color:gain>0?C.green:C.red }}>{last}kg</div>
          </div>
          <div style={{ marginLeft:"auto", textAlign:"right" }}>
            <div style={{ fontSize:10, color:C.text3 }}>Toplam Kazanım</div>
            <div style={{ fontSize:16, fontWeight:800, color:gain>0?C.green:C.red }}>
              {gain>0?"+":""}{gain}kg
            </div>
          </div>
        </div>
      )}

      {/* Çizgi grafiği */}
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={pts} margin={{ top:5, right:10, left:-20, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
          <XAxis dataKey="date" tick={{ fontSize:10, fill:C.text3 }} />
          <YAxis tick={{ fontSize:10, fill:C.text3 }} domain={["auto","auto"]} />
          <Tooltip
            contentStyle={{ background:C.card2, border:`1px solid ${C.border}`, borderRadius:6, fontSize:11 }}
            labelStyle={{ color:C.text3 }}
            formatter={(v) => [`${v}kg`, "Ağırlık"]}
          />
          <Line type="monotone" dataKey="weight" stroke={C.red} strokeWidth={2}
            dot={{ fill:C.red, r:3 }} activeDot={{ r:5 }} />
          {first > 0 && (
            <ReferenceLine y={first} stroke={C.text3} strokeDasharray="3 3"
              label={{ value:"Başlangıç", position:"right", fontSize:9, fill:C.text3 }} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Haftalık Hacim Çubuğu ────────────────────────────────────
function VolumeBarChart({ data }) {
  if (!data || data.length === 0) return null;
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data} margin={{ top:5, right:10, left:-20, bottom:0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
        <XAxis dataKey="week" tick={{ fontSize:10, fill:C.text3 }} />
        <YAxis tick={{ fontSize:10, fill:C.text3 }}
          tickFormatter={v => v > 999 ? `${(v/1000).toFixed(0)}k` : v} />
        <Tooltip
          contentStyle={{ background:C.card2, border:`1px solid ${C.border}`, borderRadius:6, fontSize:11 }}
          labelStyle={{ color:C.text3 }}
          formatter={v => [`${v > 999 ? (v/1000).toFixed(1)+"k" : v} kg`, "Hacim"]}
        />
        <Bar dataKey="volume" fill={C.red} radius={[3,3,0,0]}
          label={{ position:"top", fontSize:9, fill:C.text3,
            formatter: v => v > 0 ? (v > 999 ? `${(v/1000).toFixed(1)}k` : v) : "" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Kas Grubu Dağılımı ────────────────────────────────────────
function MuscleChart({ data }) {
  const entries = Object.entries(data).sort((a,b) => b[1]-a[1]);
  const max = entries[0]?.[1] || 1;
  const colors = {
    'Sırt':'#4FC3F7','Göğüs':'#FF7043','Bacak':'#66BB6A',
    'Kalça':'#AB47BC','Biceps':'#FFA726','Triceps':'#EF5350',
    'Omuz':'#26C6DA','Core':'#FFEE58','Diğer':'#78909C',
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      {entries.map(([name, vol]) => (
        <div key={name} style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, color:C.text3, minWidth:56 }}>{name}</span>
          <div style={{ flex:1, height:8, background:C.card3, borderRadius:4, overflow:"hidden" }}>
            <div style={{
              height:"100%", width:`${(vol/max)*100}%`,
              background: colors[name]||"#666", borderRadius:4, transition:"width .6s ease",
            }}/>
          </div>
          <span style={{ fontSize:10, color:C.text3, fontFamily:"monospace", minWidth:36, textAlign:"right" }}>
            {vol > 999 ? `${(vol/1000).toFixed(1)}k` : vol}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Deload Uyarısı ─────────────────────────────────────────────
function DeloadAlert({ stats }) {
  const rpeHistory = useMemo(() => {
    const entries = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("yb_rpe_")) {
        const val = parseInt(localStorage.getItem(key));
        if (val > 0) entries.push(val);
      }
    }
    return entries;
  }, []);

  const recentWorkouts = stats?.workoutCount || 0;
  const avgRpe = rpeHistory.length > 0
    ? rpeHistory.reduce((a,b)=>a+b,0) / rpeHistory.length
    : 0;

  // Deload koşulları
  const highRpe = avgRpe >= 8.5 && rpeHistory.length >= 6;
  const manyWorkouts = recentWorkouts >= 20; // 5 hafta × 4 gün
  const needsDeload = highRpe || manyWorkouts;

  if (!needsDeload) return null;

  return (
    <div style={{
      background:"rgba(255,167,38,.08)", border:"1px solid rgba(255,167,38,.35)",
      borderRadius:8, padding:"12px 14px", marginBottom:12,
    }}>
      <div style={{ fontSize:13, fontWeight:800, color:C.warn, marginBottom:6 }}>
        ⚠️ Deload Haftası Gerekiyor
      </div>
      <div style={{ fontSize:12, color:C.text2, marginBottom:8, lineHeight:1.5 }}>
        {highRpe && `Ortalama RPE ${avgRpe.toFixed(1)} — yüksek yorgunluk birikimi.`}
        {manyWorkouts && ` ${recentWorkouts} antrenman tamamlandı — 4-6 haftada bir deload şart.`}
      </div>
      <div style={{ fontSize:11, color:C.text3 }}>
        Deload haftasında: aynı hareketler, ağırlığı %50-60'a indir, setleri azalt. 1 hafta sonra daha güçlü dönersin.
      </div>
    </div>
  );
}

// ─── Seans Notu ───────────────────────────────────────────────
const SESSION_NOTES_KEY = "yb_session_notes";

function loadSessionNotes() {
  try { return JSON.parse(localStorage.getItem(SESSION_NOTES_KEY) || "[]"); } catch { return []; }
}

function SessionNotes() {
  const [notes, setNotes] = useState(loadSessionNotes);
  const [text, setText] = useState("");
  const [energy, setEnergy] = useState(3);
  const [sleep, setSleep] = useState(7);

  const save = () => {
    if (!text.trim()) return;
    const entry = {
      date: todayLocalDate(),
      time: new Date().toLocaleTimeString("tr-TR", { hour:"2-digit", minute:"2-digit" }),
      text: text.trim(),
      energy,
      sleep,
    };
    const next = [entry, ...notes].slice(0, 50);
    setNotes(next);
    try { localStorage.setItem(SESSION_NOTES_KEY, JSON.stringify(next)); } catch { return }
    setText(""); setEnergy(3); setSleep(7);
  };

  const ENERGY_LABELS = ["","😴 Düşük","😐 Normal","💪 İyi","🔥 Harika","⚡ Zirvede"];

  return (
    <div className="dash-section">
      <div className="dash-section-title">📝 Seans Notu</div>

      {/* Yeni not formu */}
      <div style={{ background:C.card2, borderRadius:8, padding:12, marginBottom:10 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
          <div>
            <div style={{ fontSize:10, color:C.text3, marginBottom:4 }}>⚡ Enerji Seviyesi</div>
            <div style={{ display:"flex", gap:3 }}>
              {[1,2,3,4,5].map(v => (
                <button key={v} onClick={() => setEnergy(v)} style={{
                  flex:1, height:28, borderRadius:4, border:"none", cursor:"pointer",
                  background: v<=energy ? C.warn : C.card3,
                  fontSize:10, fontWeight:700, color: v<=energy ? "#000" : C.text3,
                }}>{v}</button>
              ))}
            </div>
            <div style={{ fontSize:10, color:C.warn, marginTop:3 }}>{ENERGY_LABELS[energy]}</div>
          </div>
          <div>
            <div style={{ fontSize:10, color:C.text3, marginBottom:4 }}>😴 Uyku (saat)</div>
            <input type="number" inputMode="numeric" value={sleep}
              onChange={e => setSleep(Math.min(12, Math.max(3, parseInt(e.target.value)||7)))}
              style={{ width:"100%", background:C.card3, border:`1px solid ${C.border}`,
                color:C.text, borderRadius:6, padding:"6px 8px", fontSize:14, fontWeight:700,
                boxSizing:"border-box", textAlign:"center" }} />
          </div>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)}
          placeholder="Nasıldı? Ağrı var mı? Notlar..."
          rows={3} style={{
            width:"100%", background:C.card3, border:`1px solid ${C.border}`,
            color:C.text, borderRadius:6, padding:"8px 10px", fontSize:13,
            resize:"none", boxSizing:"border-box", fontFamily:"inherit",
            marginBottom:8,
          }} />
        <button onClick={save} disabled={!text.trim()} style={{
          width:"100%", padding:"10px", background:text.trim() ? C.red : C.card3,
          border:"none", borderRadius:6, color:text.trim() ? "#fff" : C.text3,
          fontSize:13, fontWeight:700, cursor:text.trim() ? "pointer" : "default",
        }}>💾 Kaydet</button>
      </div>

      {/* Not geçmişi */}
      {notes.length > 0 && notes.slice(0,5).map((n,i) => (
        <div key={i} style={{
          background:C.card2, borderRadius:8, padding:"10px 12px", marginBottom:6,
          borderLeft:`3px solid ${n.energy >= 4 ? C.green : n.energy <= 2 ? C.red : C.warn}`,
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ fontSize:11, color:C.text3 }}>{n.date} {n.time}</span>
            <div style={{ display:"flex", gap:8, fontSize:11 }}>
              <span style={{ color:C.warn }}>⚡{n.energy}</span>
              <span style={{ color:C.blue }}>😴{n.sleep}s</span>
            </div>
          </div>
          <div style={{ fontSize:12, color:C.text2, lineHeight:1.5 }}>{n.text}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Eski NotesLog (uyumluluk) ─────────────────────────────────
export function WeeklyStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    getWeeklyStats().then(setStats);
  }, []);
  if (!stats) return null;
  return (
    <div style={{ display:"flex", gap:8, padding:"8px 0" }}>
      {[
        { label:"Bu Hafta", val:stats.workouts+"x" },
        { label:"Toplam Set", val:stats.totalSets },
        { label:"Süre", val:stats.totalDuration+"dk" },
      ].map(s => (
        <div key={s.label} style={{ flex:1, background:"#131316", borderRadius:6, padding:"8px 10px" }}>
          <div style={{ fontSize:16, fontWeight:800, color:"#fff" }}>{s.val}</div>
          <div style={{ fontSize:10, color:"#7A7A84" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Ana Dashboard ─────────────────────────────────────────────
function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(s => { setStats(s); setLoading(false); });
  }, []);

  if (loading) return <div className="dash-loading">Yükleniyor...</div>;
  if (!stats) return null;

  const isEmpty = stats.workoutCount === 0;

  return (
    <div className="dashboard">
      <div className="dash-header">📊 İLERLEME</div>

      {/* Deload uyarısı */}
      <DeloadAlert stats={stats} />

      {/* Özet kartlar */}
      <div className="dash-cards">
        <div className="dash-card">
          <div className="dash-card-val">
            {stats.totalVolume > 999 ? `${(stats.totalVolume/1000).toFixed(1)}k` : stats.totalVolume}
          </div>
          <div className="dash-card-label">Toplam Hacim</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-val">{stats.workoutCount}</div>
          <div className="dash-card-label">Antrenman</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-val">{stats.streak}</div>
          <div className="dash-card-label">Seri 🔥</div>
        </div>
      </div>

      {/* Vücut Ölçüm Takibi */}
      <BodyTracker />

      {/* Egzersiz İlerleme Grafiği */}
      {!isEmpty && Object.keys(stats.exerciseProgress || {}).length > 0 && (
        <div className="dash-section">
          <div className="dash-section-title">📈 Egzersiz İlerleme</div>
          <ExerciseProgressChart exerciseProgress={stats.exerciseProgress} />
        </div>
      )}

      {/* Haftalık Hacim */}
      {!isEmpty && (
        <div className="dash-section">
          <div className="dash-section-title">📊 Haftalık Hacim (kg×tekrar)</div>
          <VolumeBarChart data={stats.weeklyVolumes} />
        </div>
      )}

      {/* PR'lar */}
      {stats.prs?.length > 0 && (
        <div className="dash-section">
          <div className="dash-section-title">🏆 Kişisel Rekorlar</div>
          {stats.prs.slice(0,8).map((pr,i) => (
            <div key={i} className="pr-row">
              <span className="pr-rank">{i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}.`}</span>
              <span className="pr-name">{pr.name}</span>
              <span className="pr-weight">{pr.weight}kg × {pr.reps}</span>
              <span className="pr-date">{pr.date?.slice(5)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Kas grubu dağılımı */}
      {Object.keys(stats.muscleVolumes || {}).length > 0 && (
        <div className="dash-section">
          <div className="dash-section-title">💪 Kas Grubu Dağılımı</div>
          <MuscleChart data={stats.muscleVolumes} />
        </div>
      )}

      {/* Seans Notu */}
      <SessionNotes />

      {isEmpty && (
        <div className="dash-empty">
          Henüz antrenman verisi yok. İlk antrenmanını tamamla!
        </div>
      )}
    </div>
  );
}

export default Dashboard;
