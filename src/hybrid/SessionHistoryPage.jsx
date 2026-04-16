import { useEffect, useMemo, useState } from "react";
import { getAllCompletedWorkouts } from "../tracker";
import { formatShortDateLabel } from "./shared";
import { SectionCard } from "./panels";

/**
 * History view for completed workouts:
 *   - Top line: total completed + total volume across all history.
 *   - Cards (newest first): each shows date, duration, movement count,
 *     optional top set. Tap to expand → per-exercise sets.
 *   - Exercise progress: separate card where you pick an exercise and
 *     see its max weight over time as a mini sparkline (SVG only, no
 *     chart lib dependency since recharts is already paid-for elsewhere).
 */
export default function SessionHistoryPage() {
  const [workouts, setWorkouts] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getAllCompletedWorkouts(60).then((rows) => {
      if (!cancelled) setWorkouts(rows);
    });
    return () => { cancelled = true; };
  }, []);

  const exerciseList = useMemo(() => {
    if (!workouts) return [];
    const names = new Set();
    for (const w of workouts) {
      for (const name of Object.keys(w.exercises || {})) names.add(name);
    }
    return [...names].sort((a, b) => a.localeCompare(b, "tr"));
  }, [workouts]);

  const totals = useMemo(() => {
    if (!workouts) return null;
    let volume = 0;
    let sets = 0;
    for (const w of workouts) {
      for (const setList of Object.values(w.exercises || {})) {
        if (!Array.isArray(setList)) continue;
        for (const s of setList) {
          if (s.done && s.weight && s.reps) {
            volume += s.weight * s.reps;
            sets += 1;
          }
        }
      }
    }
    return { volume: Math.round(volume), sets, count: workouts.length };
  }, [workouts]);

  if (workouts === null) {
    return (
      <main className="main" style={{ paddingTop: 0 }}>
        <div style={{ color: "#7A7A84", padding: 16, fontSize: 12 }}>Geçmiş yükleniyor…</div>
      </main>
    );
  }

  if (workouts.length === 0) {
    return (
      <main className="main" style={{ paddingTop: 0 }}>
        <SectionCard title="📋 Seans Geçmişi" accent="#4FC3F7">
          <div style={{ fontSize: 12, color: "#C4C4CC", lineHeight: 1.6 }}>
            Henüz tamamlanmış seans yok. İlk seansını bitirdiğinde burada görürsün.
          </div>
        </SectionCard>
      </main>
    );
  }

  return (
    <main className="main" style={{ paddingTop: 0 }}>
      <SectionCard title="📋 Geçmiş Özeti" accent="#4FC3F7">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          <StatTile label="Seans" value={totals.count} />
          <StatTile label="Tamamlanan Set" value={totals.sets} />
          <StatTile label="Toplam Hacim" value={`${totals.volume.toLocaleString("tr-TR")} kg`} />
        </div>
      </SectionCard>

      <SectionCard title="📈 Hareket İlerlemesi" accent="#F4A261">
        <select
          value={selectedExercise || ""}
          onChange={(e) => setSelectedExercise(e.target.value || null)}
          className="history-select"
        >
          <option value="">Hareket seç…</option>
          {exerciseList.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        {selectedExercise && (
          <ExerciseProgress workouts={workouts} exerciseName={selectedExercise} />
        )}
      </SectionCard>

      <SectionCard title="🗓 Tüm Seanslar" accent="#00C853">
        <div style={{ display: "grid", gap: 8 }}>
          {workouts.map((w) => {
            const key = `${w.date}-${w.dayIndex}`;
            const isOpen = expanded === key;
            const duration = (w.startTime && w.endTime)
              ? Math.max(1, Math.round((w.endTime - w.startTime) / 60000))
              : null;
            const exerciseCount = Object.keys(w.exercises || {}).length;
            const { doneSets, totalVolume, topSet } = summarizeWorkout(w);

            return (
              <div key={key} className="history-card">
                <button
                  type="button"
                  className="history-card-head"
                  onClick={() => setExpanded(isOpen ? null : key)}
                >
                  <div className="history-card-date">{formatShortDateLabel(w.date)}</div>
                  <div className="history-card-stats">
                    <span>{doneSets} set</span>
                    <span>·</span>
                    <span>{exerciseCount} hareket</span>
                    {duration && <><span>·</span><span>{duration} dk</span></>}
                    {totalVolume > 0 && <><span>·</span><span>{totalVolume.toLocaleString("tr-TR")} kg</span></>}
                  </div>
                  {topSet && (
                    <div className="history-card-top">
                      🏋 {topSet.name} · {topSet.weight}kg × {topSet.reps}
                    </div>
                  )}
                  <div className="history-card-caret">{isOpen ? "−" : "+"}</div>
                </button>
                {isOpen && (
                  <div className="history-card-body">
                    {Object.entries(w.exercises || {}).map(([name, sets]) => (
                      <ExerciseBreakdown key={name} name={name} sets={sets} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>
    </main>
  );
}

function StatTile({ label, value }) {
  return (
    <div className="history-stat-tile">
      <div className="history-stat-value">{value}</div>
      <div className="history-stat-label">{label}</div>
    </div>
  );
}

function ExerciseBreakdown({ name, sets }) {
  if (!Array.isArray(sets) || sets.length === 0) return null;
  return (
    <div className="history-exercise">
      <div className="history-exercise-name">{name}</div>
      <div className="history-set-grid">
        {sets.map((s, i) => (
          <div key={i} className={`history-set-chip ${s.done ? "history-set-done" : ""}`}>
            <span className="history-set-num">#{i + 1}</span>
            <span className="history-set-val">
              {s.weight ? `${s.weight}kg` : "—"} {s.reps ? `× ${s.reps}` : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExerciseProgress({ workouts, exerciseName }) {
  // Build a series of {date, maxWeight, bestReps} newest-first → reverse
  // chronological rendering for the sparkline.
  const series = useMemo(() => {
    const rows = [];
    for (const w of workouts) {
      const sets = w.exercises?.[exerciseName];
      if (!Array.isArray(sets) || sets.length === 0) continue;
      const maxWeight = Math.max(0, ...sets.map((s) => Number(s.weight || 0)));
      const bestReps = Math.max(0, ...sets.map((s) => Number(s.reps || 0)));
      if (maxWeight > 0 || bestReps > 0) {
        rows.push({ date: w.date, maxWeight, bestReps });
      }
    }
    rows.reverse();
    return rows;
  }, [workouts, exerciseName]);

  if (series.length === 0) {
    return (
      <div className="history-progress-empty">
        Bu hareket için kayıtlı set yok.
      </div>
    );
  }

  const maxY = Math.max(...series.map((p) => p.maxWeight), 1);
  const W = 320;
  const H = 120;
  const padX = 12;
  const padY = 16;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;
  const stepX = series.length > 1 ? innerW / (series.length - 1) : 0;
  const pts = series.map((p, i) => {
    const x = padX + i * stepX;
    const y = padY + innerH - (p.maxWeight / maxY) * innerH;
    return { x, y, data: p };
  });
  const path = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");

  const first = series[0];
  const last = series[series.length - 1];
  const deltaKg = last.maxWeight - first.maxWeight;

  return (
    <div className="history-progress">
      <div className="history-progress-head">
        <div>
          <div className="history-progress-label">Son {series.length} seans</div>
          <div className="history-progress-value">{last.maxWeight} kg</div>
        </div>
        <div className={`history-progress-delta ${deltaKg >= 0 ? "pos" : "neg"}`}>
          {deltaKg >= 0 ? "+" : ""}{deltaKg} kg
        </div>
      </div>
      <svg className="history-sparkline" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <path d={path} stroke="#F4A261" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#F4A261" />
        ))}
      </svg>
      <div className="history-progress-foot">
        <span>{first.date.slice(5)}</span>
        <span>{last.date.slice(5)}</span>
      </div>
    </div>
  );
}

function summarizeWorkout(w) {
  let doneSets = 0;
  let totalVolume = 0;
  let topSet = null;
  for (const [name, sets] of Object.entries(w.exercises || {})) {
    if (!Array.isArray(sets)) continue;
    for (const s of sets) {
      if (!s.done) continue;
      doneSets += 1;
      const w1 = Number(s.weight || 0);
      const r1 = Number(s.reps || 0);
      if (w1 && r1) totalVolume += w1 * r1;
      if (w1 > 0 && (!topSet || w1 > topSet.weight)) {
        topSet = { name, weight: w1, reps: r1 };
      }
    }
  }
  return { doneSets, totalVolume: Math.round(totalVolume), topSet };
}
