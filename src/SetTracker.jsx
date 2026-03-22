import { useState, useEffect } from "react";
import { saveExerciseSets, loadExerciseSets, suggestWeight, getHistory } from "./tracker";
import { getRestDuration } from "./RestTimer";
import ExertionRating from "./ExertionRating";

export function parseSets(setsStr) {
  const m = setsStr.match(/(\d+)\s*[×x]\s*(\d+)/);
  if (m) return { setCount: parseInt(m[1]), reps: parseInt(m[2]), timed: false };
  const t = setsStr.match(/(\d+)\s*[×x]\s*(\d+)\s*sn/i);
  if (t) return { setCount: parseInt(t[1]), reps: parseInt(t[2]), timed: true };
  return null;
}

// Üst vücut mu?
export function isUpper(exerciseName) {
  const lower = ["squat","deadlift","lunge","press leg","hip thrust","bridge","leg curl","leg ext","step up","calf","cossack","swing","sled","monster","hip hinge","jefferson","farmer"];
  return !lower.some(k => exerciseName.toLowerCase().includes(k));
}

function SetTracker({ ex, dayIndex, blockName, onStartRest, onAllDone }) {
  const trackBlocks = ["KUVVET", "CALİSTHENİCS", "CORE", "FİNİSHER", "PRIMARY", "SECONDARY", "KALİSTENİK", "SKILL", "KOMPLİMENTER", "FULL BODY"];
  const showTracker = trackBlocks.some(b => blockName?.toUpperCase().includes(b));
  const parsed = parseSets(ex.sets);
  const shouldRender = showTracker && parsed && !parsed.timed;

  const setCount = shouldRender ? parsed.setCount : 0;
  const targetReps = shouldRender ? parsed.reps : 0;

  // All hooks must be called unconditionally — no early returns before this point
  const [sets, setSets] = useState(() =>
    Array.from({ length: setCount || 1 }, () => ({ weight: 0, reps: 0, done: false }))
  );
  const [suggestion, setSuggestion] = useState(null);
  const [history, setHistoryData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [prFlash, setPrFlash] = useState(null);

  useEffect(() => {
    if (!shouldRender) return;
    let cancelled = false;
    (async () => {
      const [saved, sug, hist] = await Promise.all([
        loadExerciseSets(dayIndex, ex.name),
        suggestWeight(ex.name, setCount, targetReps, isUpper(ex.name)),
        getHistory(ex.name, 3),
      ]);
      if (cancelled) return;
      if (saved && saved.length === setCount) setSets(saved);
      setSuggestion(sug);
      setHistoryData(hist);
      setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, [dayIndex, ex.name, shouldRender]);

  const allDone = sets.every(s => s.done);

  useEffect(() => {
    if (!shouldRender) return;
    if (onAllDone) onAllDone(allDone);
  }, [allDone, shouldRender]);

  // Early return AFTER all hooks
  if (!shouldRender) return null;

  const updateSet = (i, field, val) => {
    setSets(prev => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: val };
      saveExerciseSets(dayIndex, ex.name, next);
      return next;
    });
  };

  const toggleDone = (i) => {
    setSets(prev => {
      const next = [...prev];
      const wasDone = next[i].done;
      next[i] = { ...next[i], done: !wasDone };
      saveExerciseSets(dayIndex, ex.name, next);

      if (!wasDone && navigator.vibrate) navigator.vibrate(30);

      // PR detection
      if (!wasDone && next[i].weight > 0 && history.length > 0) {
        const histWeights = history.flatMap(h => h.sets.map(s => s.weight || 0)).filter(w => w > 0);
        if (histWeights.length > 0 && next[i].weight > Math.max(...histWeights)) {
          setPrFlash(i);
          if (navigator.vibrate) navigator.vibrate([50, 50, 100]);
          setTimeout(() => setPrFlash(null), 3000);
        }
      }

      if (!wasDone && onStartRest) {
        const doneCount = next.filter(s => s.done).length;
        const isLastSet = doneCount >= setCount;
        const baseRest = getRestDuration(blockName, ex.name);
        if (isLastSet) {
          onStartRest(baseRest + 60, ex.name, true);
        } else {
          onStartRest(baseRest, ex.name, false);
        }
      }
      return next;
    });
  };

  const fillAll = (weight) => {
    setSets(prev => {
      const next = prev.map(s => ({ ...s, weight }));
      saveExerciseSets(dayIndex, ex.name, next);
      return next;
    });
  };

  if (!loaded) return <div className="tracker" style={{textAlign:"center",padding:12,color:"#555",fontSize:11}}>Yükleniyor...</div>;

  return (
    <div className="tracker">
      <div className="tracker-head">
        <span className="tracker-title">📝 SET TAKİBİ</span>
        {allDone && <span className="tracker-done-badge">✓ Tamamlandı</span>}
      </div>

      {prFlash !== null && (
        <div className="pr-flash">🏆 YENİ REKOR!</div>
      )}

      {suggestion && (
        <div className={`tracker-suggest ${suggestion.type === "up" ? "suggest-up" : "suggest-same"}`}>
          <span className="suggest-icon">{suggestion.type === "up" ? "⬆" : "➡"}</span>
          <span>{suggestion.reason}</span>
          {suggestion.type === "up" && (
            <button className="suggest-apply" onClick={() => fillAll(suggestion.weight)}>
              {suggestion.weight}kg Uygula
            </button>
          )}
        </div>
      )}

      <div className="tracker-grid">
        <div className="tracker-grid-head">
          <span>Set</span><span>Önceki</span><span>Ağırlık</span><span>Tekrar</span><span></span>
        </div>
        {sets.map((s, i) => {
          const prev = history.length > 0 && history[0].sets[i] ? history[0].sets[i] : null;
          const prevStr = prev ? `${prev.weight || 0}×${prev.reps || 0}` : "—";
          const prevColor = !prev ? "#555" : (s.done && s.weight > (prev.weight||0)) ? "#4CAF50" : (s.done && s.weight < (prev.weight||0)) ? "#FF5252" : "#555";
          return (
            <div key={i} className={`tracker-row ${s.done ? "tracker-row-done" : ""}`}>
              <span className="tracker-set-n">{i + 1}</span>
              <span className="tracker-prev" style={{color: prevColor}}>{prevStr}</span>
              <input type="number" inputMode="decimal" className="tracker-input"
                value={s.weight || ""} placeholder={prev ? `${prev.weight}` : "kg"}
                onChange={e => updateSet(i, "weight", parseFloat(e.target.value) || 0)} />
              <input type="number" inputMode="numeric" className="tracker-input"
                value={s.reps || ""} placeholder={`${targetReps}`}
                onChange={e => updateSet(i, "reps", parseInt(e.target.value) || 0)} />
              <button className={`tracker-check ${s.done ? "tracker-check-on" : ""}`}
                onClick={() => toggleDone(i)}>
                {s.done ? "✓" : "○"}
              </button>
            </div>
          );
        })}
      </div>

      {allDone && (
        <ExertionRating exerciseName={ex.name} dayIndex={dayIndex} />
      )}

      {history.length > 0 && (
        <div className="tracker-history">
          <span className="tracker-hist-label">Geçmiş:</span>
          {history.map((h, i) => {
            const best = Math.max(...h.sets.map(s => s.weight || 0));
            const reps = h.sets.map(s => s.reps).join("/");
            return <span key={i} className="tracker-hist-item">{h.date.slice(5)}: {best}kg ({reps})</span>;
          })}
        </div>
      )}
    </div>
  );
}

export default SetTracker;
