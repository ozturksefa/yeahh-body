import { useState, useEffect } from "react";
import { getWeeklyStats, getDashboardStats } from "./tracker";

function WeeklyStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => { getWeeklyStats().then(setStats); }, []);
  if (!stats || stats.workouts === 0) return null;
  return (
    <div className="weekly-stats">
      <span className="ws-title">📊 Bu Hafta</span>
      <div className="ws-items">
        <div className="ws-item">
          <span className="ws-val">{stats.workouts}</span>
          <span className="ws-label">antrenman</span>
        </div>
        <div className="ws-item">
          <span className="ws-val">{stats.totalSets}</span>
          <span className="ws-label">set</span>
        </div>
        {stats.totalDuration > 0 && (
          <div className="ws-item">
            <span className="ws-val">{stats.totalDuration}</span>
            <span className="ws-label">dakika</span>
          </div>
        )}
      </div>
    </div>
  );
}

function VolumeChart({ data }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.volume), 1);
  return (
    <div className="vol-chart">
      {data.map((d, i) => (
        <div key={i} className="vol-col">
          <div className="vol-val">{d.volume > 0 ? (d.volume > 999 ? `${(d.volume/1000).toFixed(1)}k` : d.volume) : ""}</div>
          <div className="vol-bar-wrap">
            <div className="vol-bar" style={{ height: `${Math.max((d.volume / max) * 100, 2)}%`, background: d.volume > 0 ? "#FF6B35" : "#222" }} />
          </div>
          <div className="vol-label">{d.week}</div>
          <div className="vol-count">{d.workouts > 0 ? `${d.workouts}x` : ""}</div>
        </div>
      ))}
    </div>
  );
}

function MuscleChart({ data }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = entries.length > 0 ? entries[0][1] : 1;
  const colors = { 'Sırt': '#4FC3F7', 'Göğüs': '#FF7043', 'Bacak': '#66BB6A', 'Kalça': '#AB47BC', 'Biceps': '#FFA726', 'Triceps': '#EF5350', 'Omuz': '#26C6DA', 'Core': '#FFEE58', 'Diğer': '#78909C' };
  return (
    <div className="muscle-chart">
      {entries.map(([name, vol]) => (
        <div key={name} className="muscle-row">
          <span className="muscle-name">{name}</span>
          <div className="muscle-bar-wrap">
            <div className="muscle-bar" style={{ width: `${(vol / max) * 100}%`, background: colors[name] || '#666' }} />
          </div>
          <span className="muscle-vol">{vol > 999 ? `${(vol/1000).toFixed(1)}k` : vol}</span>
        </div>
      ))}
    </div>
  );
}

function ExerciseProgressList({ data }) {
  // Top 8 exercises by number of data points
  const sorted = Object.entries(data)
    .filter(([_, pts]) => pts.length >= 2)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 8);
  if (sorted.length === 0) return <div style={{fontSize:12,color:'#666',padding:8}}>En az 2 antrenman sonrası ilerleme görünecek</div>;
  return (
    <div className="ex-progress-list">
      {sorted.map(([name, pts]) => {
        const rev = [...pts].reverse();
        const first = rev[0]?.weight || 0;
        const last = rev[rev.length - 1]?.weight || 0;
        const diff = last - first;
        const diffStr = diff > 0 ? `+${diff}kg` : diff < 0 ? `${diff}kg` : "=";
        const diffColor = diff > 0 ? "#4CAF50" : diff < 0 ? "#FF5252" : "#666";
        return (
          <div key={name} className="ex-progress-row">
            <span className="ex-prog-name">{name}</span>
            <span className="ex-prog-pts">{rev.map(p => p.weight).join(" → ")}</span>
            <span className="ex-prog-diff" style={{color: diffColor}}>{diffStr}</span>
          </div>
        );
      })}
    </div>
  );
}

function WeeklySummaryCard({ stats }) {
  const thisWeek = stats.weeklyVolumes?.[stats.weeklyVolumes.length - 1];
  const lastWeek = stats.weeklyVolumes?.[stats.weeklyVolumes.length - 2];
  if (!thisWeek || thisWeek.volume === 0) return <div style={{fontSize:12,color:'#666',padding:8}}>Bu hafta henüz antrenman yok</div>;

  const volDiff = lastWeek && lastWeek.volume > 0 ? thisWeek.volume - lastWeek.volume : null;
  const volPct = lastWeek && lastWeek.volume > 0 ? Math.round(((thisWeek.volume - lastWeek.volume) / lastWeek.volume) * 100) : null;
  const topPr = stats.prs?.[0];

  return (
    <div className="summary-card">
      <div className="summary-row">
        <span className="summary-label">Bu hafta antrenman</span>
        <span className="summary-val">{thisWeek.workouts}x</span>
      </div>
      <div className="summary-row">
        <span className="summary-label">Toplam hacim</span>
        <span className="summary-val">{thisWeek.volume > 999 ? `${(thisWeek.volume/1000).toFixed(1)}k` : thisWeek.volume} kg</span>
      </div>
      {volDiff !== null && (
        <div className="summary-row">
          <span className="summary-label">Geçen haftaya göre</span>
          <span className="summary-val" style={{color: volDiff >= 0 ? '#4CAF50' : '#FF5252'}}>
            {volDiff >= 0 ? '↑' : '↓'} {Math.abs(volPct)}%
          </span>
        </div>
      )}
      {topPr && (
        <div className="summary-row">
          <span className="summary-label">En ağır lift</span>
          <span className="summary-val" style={{color:'#FFD700'}}>{topPr.weight}kg {topPr.name.split(' ').slice(0,2).join(' ')}</span>
        </div>
      )}
      <div className="summary-row">
        <span className="summary-label">Seri</span>
        <span className="summary-val">🔥 {stats.streak}</span>
      </div>
    </div>
  );
}

function NotesLog() {
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("yb_notes") || "[]"); } catch { return []; }
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");

  const addNote = () => {
    const text = input.trim();
    if (!text) return;
    const entry = { id: Date.now(), text, date: new Date().toISOString().slice(0, 10), time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) };
    const next = [entry, ...notes].slice(0, 100);
    setNotes(next);
    try { localStorage.setItem("yb_notes", JSON.stringify(next)); } catch {}
    setInput("");
  };

  const deleteNote = (id) => {
    const next = notes.filter(n => n.id !== id);
    setNotes(next);
    try { localStorage.setItem("yb_notes", JSON.stringify(next)); } catch {}
  };

  const filtered = filter
    ? notes.filter(n => n.text.toLowerCase().includes(filter.toLowerCase()))
    : notes;

  return (
    <div className="notes-log">
      <div className="notes-input-row">
        <input className="notes-input" value={input} onChange={e => setInput(e.target.value)}
          placeholder="Not ekle... (ör: sol omuz ağrıdı, squat formu düzeldi)"
          onKeyDown={e => e.key === 'Enter' && addNote()} />
        <button className="notes-add-btn" onClick={addNote}>+</button>
      </div>
      {notes.length > 3 && (
        <input className="notes-search" value={filter} onChange={e => setFilter(e.target.value)}
          placeholder="🔍 Ara... (ör: omuz, diz, ağrı)" />
      )}
      {filtered.length === 0 && notes.length === 0 && (
        <div style={{fontSize:12,color:'#666',padding:8}}>Henüz not yok. Antrenman sırasında veya sonrasında not ekle.</div>
      )}
      {filtered.length === 0 && notes.length > 0 && filter && (
        <div style={{fontSize:12,color:'#666',padding:8}}>"{filter}" ile eşleşen not bulunamadı</div>
      )}
      <div className="notes-list">
        {filtered.slice(0, 20).map(n => (
          <div key={n.id} className="note-item">
            <div className="note-meta">{n.date} · {n.time}</div>
            <div className="note-text">{n.text}</div>
            <button className="note-del" onClick={() => deleteNote(n.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(s => { setStats(s); setLoading(false); });
  }, []);

  if (loading) return <div className="dash-loading">Yükleniyor...</div>;
  if (!stats) return null;

  return (
    <div className="dashboard">
      <div className="dash-header">📊 İLERLEME</div>

      <div className="dash-cards">
        <div className="dash-card">
          <div className="dash-card-val">{stats.totalVolume > 999 ? `${(stats.totalVolume/1000).toFixed(1)}k` : stats.totalVolume}</div>
          <div className="dash-card-label">Toplam Hacim (kg)</div>
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

      <div className="dash-section">
        <div className="dash-section-title">📈 Haftalık Hacim</div>
        <VolumeChart data={stats.weeklyVolumes} />
      </div>

      {stats.prs.length > 0 && (
        <div className="dash-section">
          <div className="dash-section-title">🏆 Kişisel Rekorlar (En Ağır)</div>
          {stats.prs.map((pr, i) => (
            <div key={i} className="pr-row">
              <span className="pr-rank">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i+1}.`}</span>
              <span className="pr-name">{pr.name}</span>
              <span className="pr-weight">{pr.weight}kg × {pr.reps}</span>
              <span className="pr-date">{pr.date?.slice(5)}</span>
            </div>
          ))}
        </div>
      )}

      {Object.keys(stats.muscleVolumes || {}).length > 0 && (
        <div className="dash-section">
          <div className="dash-section-title">💪 Kas Grubu Dağılımı</div>
          <MuscleChart data={stats.muscleVolumes} />
        </div>
      )}

      {Object.keys(stats.exerciseProgress || {}).length > 0 && (
        <div className="dash-section">
          <div className="dash-section-title">📈 Egzersiz İlerleme (En Ağır Set)</div>
          <ExerciseProgressList data={stats.exerciseProgress} />
        </div>
      )}

      {stats.workoutCount > 0 && (
        <div className="dash-section">
          <div className="dash-section-title">📋 Haftalık Özet</div>
          <WeeklySummaryCard stats={stats} />
        </div>
      )}

      <div className="dash-section">
        <div className="dash-section-title">📝 Notlar & Sakatlık Günlüğü</div>
        <NotesLog />
      </div>

      {stats.workoutCount === 0 && (
        <div className="dash-empty">
          Henüz antrenman verisi yok. İlk antrenmanını tamamla — burada istatistiklerin görünecek!
        </div>
      )}
    </div>
  );
}

export { WeeklyStats };
export default Dashboard;
