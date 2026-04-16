import { useEffect, useMemo, useState } from "react";
import { getAllCompletedWorkouts } from "../tracker";
import { formatLocalDate, shiftLocalDate } from "../dateUtils";

const WEEKS = 12; // last 12 weeks shown
const TRAINING_DAYS = new Set([2, 4, 6, 0]); // Tue/Thu/Sat/Sun (program's main days)

/**
 * Lean streak + calendar card. Two visuals:
 *   1. Streak number on the left ("🔥 5 hafta") with a subline telling you
 *      where the counter stands (trained last expected day / about to lapse).
 *   2. 12-week heatmap grid on the right. Each cell is a day; saturated
 *      when a workout is completed that day, dimmed when it was a planned
 *      training day that got missed.
 *
 * All data derived from getAllCompletedWorkouts — no new backend call, no
 * duplicated state in HybridView.
 */
export default function StreakHeatmap() {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getAllCompletedWorkouts(200).then((rows) => {
      if (!cancelled) setWorkouts(rows);
    });
    return () => { cancelled = true; };
  }, []);

  const stats = useMemo(() => {
    if (!workouts) return null;

    const doneDates = new Set(workouts.map((w) => w.date));

    // Walk backward from today across scheduled training days, stop when
    // the user missed a planned day (but don't penalise today itself — you
    // may just not have trained YET today).
    const today = formatLocalDate(new Date());
    let streak = 0;
    let firstMissedDate = null;
    for (let i = 0; i < 90; i += 1) {
      const dateStr = shiftLocalDate(today, -i);
      const dayOfWeek = new Date(dateStr + "T12:00:00").getDay();
      if (!TRAINING_DAYS.has(dayOfWeek)) continue;
      if (doneDates.has(dateStr)) {
        streak += 1;
        continue;
      }
      // Missed this planned day. If it's today we don't break the streak yet.
      if (dateStr === today) continue;
      firstMissedDate = dateStr;
      break;
    }

    // Build heatmap cells (last WEEKS*7 days including today).
    const cells = [];
    for (let i = WEEKS * 7 - 1; i >= 0; i -= 1) {
      const dateStr = shiftLocalDate(today, -i);
      const dayOfWeek = new Date(dateStr + "T12:00:00").getDay();
      const planned = TRAINING_DAYS.has(dayOfWeek);
      const done = doneDates.has(dateStr);
      cells.push({ dateStr, dayOfWeek, planned, done, isToday: dateStr === today });
    }

    return { streak, cells, firstMissedDate };
  }, [workouts]);

  if (!workouts || !stats) {
    return (
      <div className="streak-card streak-card-loading">
        <div className="streak-card-flame">🔥</div>
        <div>
          <div className="streak-big">—</div>
          <div className="streak-sub">Streak hesaplanıyor…</div>
        </div>
      </div>
    );
  }

  const subline = stats.streak === 0
    ? "Henüz antrenman günü tamamlanmadı — ilk seansla streak başlar."
    : stats.firstMissedDate
      ? `Kaçırma: ${stats.firstMissedDate.slice(5)} · bir sonraki antrenmanı kaçırmadan devam et.`
      : "Planlanan antrenman günlerini kaçırmıyorsun.";

  return (
    <div className="streak-card" role="group" aria-label="Streak ve son haftalar">
      <div className="streak-left">
        <div className="streak-card-flame" aria-hidden>🔥</div>
        <div>
          <div className="streak-big">
            {stats.streak}<span className="streak-unit"> seans</span>
          </div>
          <div className="streak-sub">{subline}</div>
        </div>
      </div>
      <div className="streak-right">
        <StreakGrid cells={stats.cells} />
        <div className="streak-legend">
          <span><i className="streak-dot streak-dot-done" /> Tamam</span>
          <span><i className="streak-dot streak-dot-miss" /> Kaçırıldı</span>
          <span><i className="streak-dot streak-dot-rest" /> Off</span>
        </div>
      </div>
    </div>
  );
}

function StreakGrid({ cells }) {
  // Break cells into columns of 7 (one column per week). cells is oldest
  // to newest, which renders left-to-right.
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return (
    <div className="streak-grid" aria-label={`${WEEKS} haftalık takvim`}>
      {weeks.map((w, wi) => (
        <div key={wi} className="streak-col">
          {w.map((cell) => {
            let cls = "streak-cell streak-cell-rest";
            if (cell.done) cls = "streak-cell streak-cell-done";
            else if (cell.planned && !cell.isToday) cls = "streak-cell streak-cell-miss";
            else if (cell.planned && cell.isToday) cls = "streak-cell streak-cell-today";
            return (
              <div
                key={cell.dateStr}
                className={cls}
                title={`${cell.dateStr} · ${cell.done ? "Tamamlandı" : cell.planned ? "Planlandı" : "Off gün"}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
