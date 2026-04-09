import { useEffect, useMemo, useRef, useState } from "react";
import { saveExerciseSets, loadExerciseSets, suggestWeight, getHistory } from "./tracker";
import { getRestDuration } from "./restTimerUtils";
import ExertionRating from "./ExertionRating";
import { isUpper, parseSets } from "./setTrackerUtils";

function emitWorkoutUpdate() {
  window.dispatchEvent(new CustomEvent("yb-workout-updated"));
}

function makeEmptySets(setCount) {
  return Array.from({ length: setCount || 1 }, () => ({ weight: 0, reps: 0, done: false }));
}

function formatSetValue(set) {
  if (!set) return "—";
  const weight = Number(set.weight || 0);
  const reps = Number(set.reps || 0);
  if (!weight && !reps) return "—";
  if (!weight) return `${reps} tekrar`;
  if (!reps) return `${weight} kg`;
  return `${weight} kg × ${reps}`;
}

function isBodyweightStyleExercise(name = "") {
  const lower = name.toLowerCase();
  return [
    "push up",
    "inverted row",
    "pull up",
    "chin up",
    "dead bug",
    "plank",
    "hollow",
    "hold",
    "l-sit",
    "bridge",
    "wall sit",
    "bird dog",
    "balance",
    "handstand",
  ].some((item) => lower.includes(item));
}

function SetTracker({ ex, dayIndex, blockName, onStartRest, onAllDone }) {
  const trackBlocks = ["KUVVET", "CALİSTHENİCS", "CORE", "FİNİSHER", "PRIMARY", "SECONDARY", "KALİSTENİK", "SKILL", "KOMPLİMENTER", "FULL BODY"];
  const showTracker = trackBlocks.some((block) => blockName?.toUpperCase().includes(block));
  const parsed = parseSets(ex.sets);
  const shouldRender = showTracker && parsed && !parsed.timed;

  const setCount = shouldRender ? parsed.setCount : 0;
  const targetReps = shouldRender ? parsed.reps : 0;

  const [sets, setSets] = useState(() => makeEmptySets(setCount));
  const [suggestion, setSuggestion] = useState(null);
  const [history, setHistoryData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [prFlash, setPrFlash] = useState(null);
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [transitionNote, setTransitionNote] = useState("");
  const weightInputRef = useRef(null);
  const repsInputRef = useRef(null);

  useEffect(() => {
    if (!shouldRender) return;
    let cancelled = false;

    (async () => {
      setLoaded(false);
      const [saved, sug, hist] = await Promise.all([
        loadExerciseSets(dayIndex, ex.name),
        suggestWeight(ex.name, setCount, targetReps, isUpper(ex.name), dayIndex),
        getHistory(ex.name, 3),
      ]);
      if (cancelled) return;

      const nextSets = saved && saved.length === setCount ? saved : makeEmptySets(setCount);
      setSets(nextSets);
      setSuggestion(sug);
      setHistoryData(hist);

      const firstUndone = nextSets.findIndex((set) => !set.done);
      setActiveSetIndex(firstUndone === -1 ? Math.max(nextSets.length - 1, 0) : firstUndone);
      setLoaded(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [dayIndex, ex.name, setCount, shouldRender, targetReps]);

  const allDone = sets.length > 0 && sets.every((set) => set.done);

  useEffect(() => {
    if (!shouldRender) return;
    if (onAllDone) onAllDone(allDone);
  }, [allDone, onAllDone, shouldRender]);

  const previousSessionSets = history[0]?.sets || [];
  const activeSet = sets[activeSetIndex] || { weight: 0, reps: 0, done: false };
  const activePreviousSet = previousSessionSets[activeSetIndex] || null;
  const activeLocalPreviousSet = activeSetIndex > 0 ? sets[activeSetIndex - 1] : null;
  const bodyweightStyle = isBodyweightStyleExercise(ex.name);
  const bestPreviousWeight = useMemo(() => {
    const values = history.flatMap((item) => item.sets.map((set) => Number(set.weight || 0))).filter((value) => value > 0);
    return values.length > 0 ? Math.max(...values) : 0;
  }, [history]);
  const completedCount = sets.filter((set) => set.done).length;
  const quickWeightDeltas = useMemo(() => (isUpper(ex.name) ? [-2.5, 2.5] : [-5, 5]), [ex.name]);
  const recommendedWorkingWeight = useMemo(() => {
    if (suggestion?.weight > 0) return Number(suggestion.weight);
    if (activePreviousSet?.weight > 0) return Number(activePreviousSet.weight);
    if (bestPreviousWeight > 0) return Number(bestPreviousWeight);
    return 0;
  }, [activePreviousSet, bestPreviousWeight, suggestion]);
  const warmupWeight = useMemo(() => {
    if (!recommendedWorkingWeight || bodyweightStyle) return 0;
    const multiplier = isUpper(ex.name) ? 0.85 : 0.8;
    const step = isUpper(ex.name) ? 2.5 : 5;
    return Math.max(step, Math.round((recommendedWorkingWeight * multiplier) / step) * step);
  }, [bodyweightStyle, ex.name, recommendedWorkingWeight]);

  useEffect(() => {
    if (!loaded || allDone) return;
    if (document.activeElement === weightInputRef.current || document.activeElement === repsInputRef.current) return;
    weightInputRef.current?.focus();
  }, [activeSetIndex, allDone, loaded]);

  if (!shouldRender) return null;

  const persistSets = (nextSets) => {
    setSets(nextSets);
    saveExerciseSets(dayIndex, ex.name, nextSets);
    emitWorkoutUpdate();
  };

  const updateSet = (index, field, value) => {
    const nextSets = [...sets];
    nextSets[index] = { ...nextSets[index], [field]: value };
    persistSets(nextSets);
  };

  const updateActiveSet = (field, value) => {
    updateSet(activeSetIndex, field, value);
  };

  const markSetDone = (index) => {
    const nextSets = [...sets];
    const wasDone = nextSets[index].done;
    nextSets[index] = { ...nextSets[index], done: !wasDone };
    persistSets(nextSets);

    if (!wasDone && navigator.vibrate) navigator.vibrate(30);

    if (!wasDone && nextSets[index].weight > 0 && history.length > 0) {
      const histWeights = history.flatMap((item) => item.sets.map((set) => set.weight || 0)).filter((weight) => weight > 0);
      if (histWeights.length > 0 && nextSets[index].weight > Math.max(...histWeights)) {
        setPrFlash(index);
        if (navigator.vibrate) navigator.vibrate([50, 50, 100]);
        setTimeout(() => setPrFlash(null), 3000);
      }
    }

    if (!wasDone && onStartRest) {
      const doneCount = nextSets.filter((set) => set.done).length;
      const isLastSet = doneCount >= setCount;
      const baseRest = getRestDuration(blockName, ex.name);
      onStartRest(isLastSet ? baseRest + 60 : baseRest, ex.name, isLastSet);
    }

    const firstUndone = nextSets.findIndex((set) => !set.done);
    const nextIndex = firstUndone === -1 ? Math.max(nextSets.length - 1, 0) : firstUndone;
    setActiveSetIndex(nextIndex);

    if (!wasDone) {
      const nextLabel = firstUndone === -1 ? "Tüm setler tamam" : `Sıradaki set: ${nextIndex + 1}`;
      setTransitionNote(`Set ${index + 1} kaydedildi · ${nextLabel}`);
      window.setTimeout(() => setTransitionNote(""), 1800);
    }
  };

  const applyWeightToAll = (weight, fromActive = false) => {
    const nextSets = sets.map((set, index) => {
      if (fromActive && index < activeSetIndex) return set;
      return { ...set, weight };
    });
    persistSets(nextSets);
  };

  const copyPreviousToActive = () => {
    const source = activePreviousSet || activeLocalPreviousSet;
    if (!source) return;
    const nextSets = [...sets];
    nextSets[activeSetIndex] = {
      ...nextSets[activeSetIndex],
      weight: Number(source.weight || 0),
      reps: Number(source.reps || targetReps || 0),
    };
    persistSets(nextSets);
  };

  const applySuggestionToActive = () => {
    if (!suggestion?.weight) return;
    updateActiveSet("weight", suggestion.weight);
  };

  const applyWarmupWeight = () => {
    if (!warmupWeight) return;
    updateActiveSet("weight", warmupWeight);
  };

  const applyWorkingWeight = () => {
    if (!recommendedWorkingWeight) return;
    updateActiveSet("weight", recommendedWorkingWeight);
  };

  const adjustActiveWeight = (delta) => {
    const nextWeight = Math.max(0, Number(activeSet.weight || 0) + delta);
    updateActiveSet("weight", nextWeight);
  };

  const handleWeightKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      repsInputRef.current?.focus();
    }
  };

  const handleRepsKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      markSetDone(activeSetIndex);
    }
  };

  if (!loaded) return <div className="tracker" style={{ textAlign: "center", padding: 12, color: "#555", fontSize: 11 }}>Yükleniyor...</div>;

  return (
    <div className="tracker">
      <div className="tracker-head">
        <span className="tracker-title">📝 SET TAKİBİ</span>
        {allDone ? <span className="tracker-done-badge">✓ Tamamlandı</span> : <span className="tracker-progress-badge">Set {Math.min(activeSetIndex + 1, setCount)}/{setCount}</span>}
      </div>

      {prFlash !== null && <div className="pr-flash">🏆 YENİ REKOR!</div>}

      <div className="tracker-summary-card">
        <div className="tracker-summary-top">
          <div>
            <div className="tracker-summary-label">Hedef</div>
            <div className="tracker-summary-value">{setCount} × {targetReps}</div>
          </div>
          <div>
            <div className="tracker-summary-label">Önceki</div>
            <div className="tracker-summary-value">{formatSetValue(activePreviousSet)}</div>
          </div>
          <div>
            <div className="tracker-summary-label">En İyi</div>
            <div className="tracker-summary-value">{bestPreviousWeight > 0 ? `${bestPreviousWeight} kg` : "—"}</div>
          </div>
        </div>

        {suggestion && (
          <div className={`tracker-suggest suggest-${suggestion.type}`}>
            <div className="suggest-row">
              <span className="suggest-icon">
                {suggestion.type === "up" ? "⬆" : suggestion.type === "down" ? "⬇" : suggestion.type === "confirm" ? "🔁" : suggestion.type === "first" ? "🆕" : "➡"}
              </span>
              <span className="suggest-reason">{suggestion.reason}</span>
            </div>
            <div className="tracker-quick-actions">
              {(suggestion.type === "up" || suggestion.type === "down") && suggestion.weight > 0 && (
                <button className="tracker-chip tracker-chip-primary" onClick={() => applyWeightToAll(suggestion.weight)}>
                  {suggestion.weight} kg tüm setlere uygula
                </button>
              )}
              {suggestion.weight > 0 && (
                <button className="tracker-chip" onClick={applySuggestionToActive}>
                  Sadece aktif sete uygula
                </button>
              )}
            </div>
          </div>
        )}

        {(warmupWeight > 0 || recommendedWorkingWeight > 0 || bodyweightStyle) && (
          <div className="tracker-quick-actions">
            {bodyweightStyle ? (
              <>
                <button className="tracker-chip tracker-chip-primary" onClick={() => updateActiveSet("weight", 0)}>
                  BW / ek yük yok
                </button>
                <div className="tracker-inline-note">Bodyweight hareketlerde `0` değeri ek yük kullanmadığını gösterir.</div>
              </>
            ) : (
              <>
                {activeSetIndex === 0 && warmupWeight > 0 && (
                  <button className="tracker-chip" onClick={applyWarmupWeight}>
                    Isınma: {warmupWeight} kg
                  </button>
                )}
                {recommendedWorkingWeight > 0 && (
                  <button className="tracker-chip tracker-chip-primary" onClick={applyWorkingWeight}>
                    Çalışma: {recommendedWorkingWeight} kg
                  </button>
                )}
                <div className="tracker-inline-note">
                  {activeSetIndex === 0 && warmupWeight > 0
                    ? "İlk seti biraz hafif başlat, çalışma ağırlığına sonra çık."
                    : "Çalışma setlerinde temiz tekrar ve form kalitesini koru."}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="tracker-active-card">
        <div className="tracker-active-head">
          <div>
            <div className="tracker-active-label">Aktif Set</div>
            <div className="tracker-active-value">Set {Math.min(activeSetIndex + 1, setCount)} / {setCount}</div>
          </div>
          <div className="tracker-active-status">{completedCount}/{setCount} tamam</div>
        </div>

        {transitionNote && (
          <div className="tracker-transition-note">{transitionNote}</div>
        )}

        <div className="tracker-active-grid">
          <div>
            <div className="tracker-field-label">{bodyweightStyle ? "Ek yük / destek" : "Ağırlık"}</div>
            <input
              ref={weightInputRef}
              type="number"
              inputMode="decimal"
              className="tracker-input tracker-input-large"
              value={activeSet.weight || ""}
              placeholder={activePreviousSet?.weight ? String(activePreviousSet.weight) : bodyweightStyle ? "0" : "kg"}
              onChange={(event) => updateActiveSet("weight", parseFloat(event.target.value) || 0)}
              onKeyDown={handleWeightKeyDown}
            />
            <div className="tracker-inline-note">
              {bodyweightStyle
                ? "0 = sadece kendi vücut ağırlığın. Pozitif değer = ek yük / makine desteği notun."
                : "İstersen önceki seti kopyala veya hızlı artış çiplerini kullan."}
            </div>
          </div>

          <div>
            <div className="tracker-field-label">Tekrar</div>
            <input
              ref={repsInputRef}
              type="number"
              inputMode="numeric"
              className="tracker-input tracker-input-large"
              value={activeSet.reps || ""}
              placeholder={String(targetReps)}
              onChange={(event) => updateActiveSet("reps", parseInt(event.target.value, 10) || 0)}
              onKeyDown={handleRepsKeyDown}
            />
          </div>
        </div>

        <div className="tracker-quick-actions">
          {quickWeightDeltas.map((delta) => (
            <button key={delta} className="tracker-chip" onClick={() => adjustActiveWeight(delta)}>
              {delta > 0 ? `+${delta}` : delta} kg
            </button>
          ))}
          <button className="tracker-chip" onClick={copyPreviousToActive} disabled={!activePreviousSet && !activeLocalPreviousSet}>
            Öncekini kopyala
          </button>
          <button className="tracker-chip" onClick={() => applyWeightToAll(Number(activeSet.weight || 0), true)} disabled={!activeSet.weight}>
            Kalan setlere yay
          </button>
        </div>

        <button className={`tracker-complete-btn ${activeSet.done ? "tracker-complete-btn-done" : ""}`} onClick={() => markSetDone(activeSetIndex)}>
          {activeSet.done ? "✓ Bu set tamam" : "Bu seti tamamla"}
        </button>
      </div>

      <div className="tracker-set-pills">
        {sets.map((set, index) => (
          <button
            key={index}
            className={`tracker-set-pill ${index === activeSetIndex ? "tracker-set-pill-active" : ""} ${set.done ? "tracker-set-pill-done" : ""}`}
            onClick={() => setActiveSetIndex(index)}
          >
            <span className="tracker-set-pill-index">Set {index + 1}</span>
            <span className="tracker-set-pill-value">{formatSetValue(set)}</span>
          </button>
        ))}
      </div>

      {allDone && <ExertionRating exerciseName={ex.name} dayIndex={dayIndex} />}

      {history.length > 0 && (
        <div className="tracker-history">
          <span className="tracker-hist-label">Geçmiş:</span>
          {history.map((item, index) => {
            const best = Math.max(...item.sets.map((set) => set.weight || 0));
            const reps = item.sets.map((set) => set.reps).join("/");
            return <span key={index} className="tracker-hist-item">{item.date.slice(5)}: {best}kg ({reps})</span>;
          })}
        </div>
      )}
    </div>
  );
}

export default SetTracker;
