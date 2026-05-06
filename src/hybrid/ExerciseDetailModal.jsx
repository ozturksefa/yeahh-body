import { useEffect, useState } from "react";
import { getHistory } from "../tracker";
import ExerciseGif from "../Gif";
import { hasExerciseGif } from "../videoMap";

/**
 * Full-screen "zoom-in" for a single exercise. Opened by long-pressing
 * an exercise row in a BlockCard. Gives the reader:
 *   - The large GIF/Short at the top, no inline clutter.
 *   - The program's "how" + warn/avoid notes spelled out.
 *   - Last session + 3 past sessions for that specific exercise.
 *   - Alternative movements declared in the program data (ex.alts).
 *
 * Everything is read-only — the set tracker stays on the main page.
 * This modal is pure reference, no accidental edits mid-workout.
 */
export default function ExerciseDetailModal({ exercise, onClose }) {
  const [history, setHistory] = useState(null);

  // Keep history keyed to whichever exercise is currently showing. All
  // state writes are pushed to a microtask so the React 19 lint rule
  // against synchronous setState-in-effect is satisfied.
  useEffect(() => {
    if (!exercise) return undefined;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setHistory(null);
    });
    getHistory(exercise.name, 4).then((rows) => {
      if (cancelled) return;
      queueMicrotask(() => setHistory(rows));
    });
    return () => { cancelled = true; };
  }, [exercise]);

  useEffect(() => {
    if (!exercise) return undefined;
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    // Lock body scroll while open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [exercise, onClose]);

  if (!exercise) return null;

  return (
    <div className="exd-backdrop" role="dialog" aria-modal="true" aria-label={exercise.name} onClick={onClose}>
      <div className="exd-sheet" onClick={(event) => event.stopPropagation()}>
        <header className="exd-head">
          <div className="exd-title">{exercise.name}</div>
          <button type="button" className="exd-close" onClick={onClose} aria-label="Kapat">✕</button>
        </header>

        <div className="exd-body">
          <div className="exd-media">
            <ExerciseGif name={exercise.name} />
          </div>

          <div className="exd-meta-row">
            {exercise.sets && <span className="exd-chip">🎯 {exercise.sets}</span>}
            {exercise.muscle && <span className="exd-chip exd-chip-muted">{exercise.muscle}</span>}
          </div>

          {exercise.how && exercise.how.length > 0 && (
            <section className="exd-section">
              <div className="exd-section-label">YAPILIŞ</div>
              <ol className="exd-steps">
                {exercise.how.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </section>
          )}

          {exercise.avoid && (
            <section className="exd-section exd-warn-neg">
              <div className="exd-section-label">✕ YAPMA</div>
              <div>{exercise.avoid}</div>
            </section>
          )}

          {exercise.warn && (
            <section className="exd-section exd-warn-caution">
              <div className="exd-section-label">⚠ DİKKAT</div>
              <div>{exercise.warn}</div>
            </section>
          )}

          {Array.isArray(exercise.alts) && exercise.alts.length > 0 && (
            <section className="exd-section">
              <div className="exd-section-label">ALTERNATİFLER</div>
              <div className="exd-alts">
                {exercise.alts.map((alt, i) => (
                  <div key={`${alt}-${i}`} className="exd-alt">
                    <div className="exd-alt-name">{alt}</div>
                    {exercise.alt_reasons?.[i] && (
                      <div className="exd-alt-why">{exercise.alt_reasons[i]}</div>
                    )}
                    {hasExerciseGif(alt) && (
                      <div className="exd-alt-media">
                        <ExerciseGif name={alt} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="exd-section">
            <div className="exd-section-label">SON SEANSLARIN</div>
            {history === null && <div className="exd-history-empty">Yükleniyor…</div>}
            {history !== null && history.length === 0 && (
              <div className="exd-history-empty">Bu hareket henüz kaydedilmedi.</div>
            )}
            {history !== null && history.length > 0 && (
              <div className="exd-history">
                {history.map((row) => (
                  <HistoryRow key={row.date} row={row} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function HistoryRow({ row }) {
  const done = (row.sets || []).filter((s) => s.done);
  const maxWeight = done.reduce((max, s) => Math.max(max, Number(s.weight || 0)), 0);
  const reps = done.map((s) => s.reps || 0).join("/");
  return (
    <div className="exd-history-row">
      <span className="exd-history-date">{row.date.slice(5)}</span>
      <span className="exd-history-stats">
        {maxWeight > 0 ? `${maxWeight}kg` : "BW"} · {reps || "—"}
      </span>
    </div>
  );
}
