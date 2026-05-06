import { useEffect, useMemo, useState } from "react";
import { saveExerciseSets, loadExerciseSets, suggestWeight, getHistory } from "./tracker";
import ExertionRating from "./ExertionRating";
import { loadRPE } from "./exertionRatingStore";
import NumericPad from "./NumericPad";
import { loadProgressionMemoryEntry, recordProgressionMemory } from "./progressionMemory";
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

function SetTracker({ ex, dayIndex, blockName, onAllDone }) {
  const trackBlocks = ["KUVVET", "CALİSTHENİCS", "CORE", "FİNİSHER", "PRIMARY", "SECONDARY", "KALİSTENİK", "SKILL", "KOMPLİMENTER", "FULL BODY"];
  const showTracker = trackBlocks.some((block) => blockName?.toUpperCase().includes(block));
  const parsed = parseSets(ex.sets);
  const shouldRender = ex.trackable === false
    ? false
    : ((ex.trackable === true || showTracker) && parsed && !parsed.timed);

  const setCount = shouldRender ? parsed.setCount : 0;
  const targetReps = shouldRender ? parsed.reps : 0;

  const [sets, setSets] = useState(() => makeEmptySets(setCount));
  const [suggestion, setSuggestion] = useState(null);
  const [history, setHistoryData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [prFlash, setPrFlash] = useState(null);
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [transitionNote, setTransitionNote] = useState("");
  const [padField, setPadField] = useState(null); // "weight" | "reps" | null
  const [progressionMemory, setProgressionMemory] = useState(null);

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

      // Pre-fill every set with the suggested weight + target reps when the
      // user has never touched this exercise today. The user can override any
      // set; the happy path becomes "tap Tamamla" with no input work.
      let nextSets = saved && saved.length === setCount ? saved : makeEmptySets(setCount);
      const isFresh = !saved || saved.length !== setCount
        || saved.every((s) => !s.done && !Number(s.weight) && !Number(s.reps));
      if (isFresh) {
        const previousFirstSet = hist?.[0]?.sets?.[0];
        const prefillWeight = sug?.weight > 0
          ? Number(sug.weight)
          : Number(previousFirstSet?.weight || 0);
        const prefillReps = Number(sug?.reps || targetReps) || Number(previousFirstSet?.reps || 0);
        if (prefillWeight > 0 || prefillReps > 0) {
          nextSets = Array.from({ length: setCount }, () => ({
            weight: prefillWeight,
            reps: prefillReps,
            done: false,
          }));
        }
      }

      setSets(nextSets);
      setSuggestion(sug);
      setHistoryData(hist);
      setProgressionMemory(loadProgressionMemoryEntry(ex.name));

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

  const recordMemoryForSets = (nextSets, rpeValue = loadRPE(ex.name, dayIndex)) => {
    if (!shouldRender || !nextSets.length || !nextSets.every((set) => set.done)) return null;
    const entry = recordProgressionMemory({
      exerciseName: ex.name,
      blockName,
      sets: nextSets,
      targetReps,
      isUpperBody: isUpper(ex.name),
      rpe: rpeValue,
    });
    setProgressionMemory(entry);
    return entry;
  };

  // (Removed auto-focus to native keyboard — the numeric pad overlay replaces
  // the standard number input, so there is no ref to focus.)

  if (!shouldRender) return null;

  const persistSets = (nextSets) => {
    setSets(nextSets);
    saveExerciseSets(dayIndex, ex.name, nextSets);
    recordMemoryForSets(nextSets);
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

    // When a set is just marked done, mirror its weight/reps into the next
    // undone set so the user doesn't have to re-enter them. Only overrides
    // pre-fill-era values; any set already marked done keeps its recorded
    // numbers.
    if (!wasDone) {
      const nextIndex = index + 1;
      if (nextIndex < nextSets.length && !nextSets[nextIndex].done) {
        nextSets[nextIndex] = {
          ...nextSets[nextIndex],
          weight: nextSets[index].weight,
          reps: nextSets[index].reps,
        };
      }
    }

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

  const applyWarmupWeight = () => {
    if (!warmupWeight) return;
    updateActiveSet("weight", warmupWeight);
  };

  const applyWorkingWeight = () => {
    if (!recommendedWorkingWeight) return;
    updateActiveSet("weight", recommendedWorkingWeight);
  };

  const weightStep = isUpper(ex.name) ? 2.5 : 5;
  const formatWeight = (value) => {
    const n = Number(value || 0);
    if (!n) return "";
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
  };

  if (!loaded) return <div className="tracker" style={{ textAlign: "center", padding: 12, color: "#555", fontSize: 11 }}>Yükleniyor...</div>;

  const showSuggestionBanner = suggestion
    && (suggestion.type === "up" || suggestion.type === "down" || suggestion.type === "first")
    && suggestion.weight > 0
    && Number(activeSet.weight) !== Number(suggestion.weight);
  const suggestIcon = suggestion?.type === "up" ? "⬆"
    : suggestion?.type === "down" ? "⬇"
    : suggestion?.type === "first" ? "🆕"
    : "➡";

  return (
    <div className="tracker">
      {prFlash !== null && <div className="pr-flash">🏆 YENİ REKOR!</div>}

      <div className="tracker-meta">
        <div className="tracker-meta-line">
          <span className="tracker-meta-badge">
            Set {Math.min(activeSetIndex + 1, setCount)}/{setCount}
          </span>
          <span className="tracker-meta-target">🎯 {setCount}×{targetReps}</span>
          {activePreviousSet?.weight > 0 && (
            <span className="tracker-meta-prev">· Önceki {formatSetValue(activePreviousSet)}</span>
          )}
          {bestPreviousWeight > 0 && (
            <span className="tracker-meta-pr">· PR {bestPreviousWeight}kg</span>
          )}
        </div>
        <div className="tracker-dots" aria-label={`${completedCount} / ${setCount} set tamamlandı`}>
          {sets.map((set, index) => (
            <span
              key={index}
              className={`tracker-dot ${set.done ? "tracker-dot-done" : ""} ${index === activeSetIndex ? "tracker-dot-active" : ""}`}
              aria-hidden
            />
          ))}
        </div>
      </div>

      {showSuggestionBanner && (
        <button
          type="button"
          className="tracker-suggest-banner"
          onClick={() => applyWeightToAll(suggestion.weight)}
          aria-label={`${suggestion.weight} kg öneriyi tüm setlere uygula`}
        >
          <span className="tracker-suggest-icon">{suggestIcon}</span>
          <span className="tracker-suggest-text">{suggestion.reason}</span>
          <span className="tracker-suggest-cta">Uygula</span>
        </button>
      )}

      {transitionNote && (
        <div className="tracker-transition-note">{transitionNote}</div>
      )}

      {progressionMemory?.decision && (
        <div className={`tracker-memory-strip tracker-memory-${progressionMemory.decision.status}`}>
          <div className="tracker-memory-kicker">Hafıza</div>
          <div className="tracker-memory-main">{progressionMemory.decision.label}</div>
          <div className="tracker-memory-sub">{progressionMemory.decision.reason}</div>
        </div>
      )}

      <div className="tracker-hero">
        <button
          type="button"
          className="tracker-hero-tile"
          onClick={() => setPadField("weight")}
          data-testid="set-weight-tile"
        >
          <span className="tracker-hero-label">{bodyweightStyle ? "Ek yük" : "Ağırlık"}</span>
          <span className="tracker-hero-value">
            {activeSet.weight ? formatWeight(activeSet.weight) : (bodyweightStyle ? "0" : "—")}
            <span className="tracker-hero-unit">kg</span>
          </span>
          <span className="tracker-hero-hint">Değiştirmek için dokun</span>
        </button>

        <button
          type="button"
          className="tracker-hero-tile"
          onClick={() => setPadField("reps")}
          data-testid="set-reps-tile"
        >
          <span className="tracker-hero-label">Tekrar</span>
          <span className="tracker-hero-value">
            {activeSet.reps || targetReps || "—"}
            <span className="tracker-hero-unit">rep</span>
          </span>
          <span className="tracker-hero-hint">Değiştirmek için dokun</span>
        </button>
      </div>

      <button
        className={`tracker-complete-btn tracker-complete-btn-hero ${activeSet.done ? "tracker-complete-btn-done" : ""}`}
        onClick={() => markSetDone(activeSetIndex)}
        data-testid="set-complete"
      >
        {activeSet.done ? "✓ Bu set tamam" : "✓ Seti Tamamla"}
      </button>

      {padField && (
        <NumericPad
          field={padField}
          initialValue={padField === "weight" ? activeSet.weight : activeSet.reps}
          step={padField === "weight" ? weightStep : 1}
          label={padField === "weight" ? (bodyweightStyle ? "Ek yük" : "Ağırlık") : "Tekrar"}
          unit={padField === "weight" ? "kg" : "rep"}
          allowDecimal={padField === "weight"}
          onCommit={(value) => {
            updateActiveSet(padField, value);
            setPadField(null);
          }}
          onCancel={() => setPadField(null)}
        />
      )}

      <details className="tracker-more">
        <summary>Daha fazla · önceki · ısınma · setlere git</summary>
        <div className="tracker-more-body">
          <div className="tracker-quick-actions">
            {bodyweightStyle && (
              <button className="tracker-chip tracker-chip-primary" onClick={() => updateActiveSet("weight", 0)}>
                BW / ek yük yok
              </button>
            )}
            {!bodyweightStyle && activeSetIndex === 0 && warmupWeight > 0 && (
              <button className="tracker-chip" onClick={applyWarmupWeight}>
                Isınma: {warmupWeight} kg
              </button>
            )}
            {!bodyweightStyle && recommendedWorkingWeight > 0 && (
              <button className="tracker-chip" onClick={applyWorkingWeight}>
                Çalışma: {recommendedWorkingWeight} kg
              </button>
            )}
            <button
              className="tracker-chip"
              onClick={copyPreviousToActive}
              disabled={!activePreviousSet && !activeLocalPreviousSet}
            >
              Öncekini kopyala
            </button>
            <button
              className="tracker-chip"
              onClick={() => applyWeightToAll(Number(activeSet.weight || 0), true)}
              disabled={!activeSet.weight}
            >
              Kalan setlere yay
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

          {history.length > 0 && (
            <div className="tracker-history">
              <span className="tracker-hist-label">Son seanslar:</span>
              {history.map((item, index) => {
                const best = Math.max(...item.sets.map((set) => set.weight || 0));
                const reps = item.sets.map((set) => set.reps).join("/");
                return <span key={index} className="tracker-hist-item">{item.date.slice(5)}: {best}kg ({reps})</span>;
              })}
            </div>
          )}
        </div>
      </details>

      {allDone && (
        <ExertionRating
          exerciseName={ex.name}
          dayIndex={dayIndex}
          onChange={(rpeValue) => recordMemoryForSets(sets, rpeValue)}
        />
      )}
    </div>
  );
}

export default SetTracker;
