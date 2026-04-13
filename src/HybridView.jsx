import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import BlockCard from "./BlockCard";
import RestTimer from "./RestTimer";
import WorkoutTimer from "./WorkoutTimer";
import CoachControlPanel from "./CoachControlPanel";
import DayCoachGuide from "./DayCoachGuide";
import { PROGRAM_HYBRID, getHybridDayVariant } from "./dataHybrid";
import { HYBRID_COACH_GUIDES } from "./hybridCoachGuides";
import { getCompletedWorkoutsInRange, loadWorkout, markWorkoutDone, saveWorkout } from "./tracker";
import {
  DailyCheckinPanel,
  DailyCheckoutPanel,
  SectionCard,
  SkillTracker,
  WeeklyReview,
} from "./hybrid/panels";
import {
  applyWeekToVariant,
  buildDefaultSkillState,
  buttonBase,
  DAY_ORDER,
  ENTRIES_KEY,
  formatShortDateLabel,
  getTodayContext,
  getTodayIndex,
  getWorkoutRepGoalMet,
  getWeekProgress,
  getWeekExecutionNote,
  getWeekShiftPreview,
  getWeekStartDate,
  loadJson,
  MODE_KEY,
  saveJson,
  SKILL_KEY,
  SNOOZE_KEY,
  START_KEY,
  SWAPS_KEY,
  WEEK_LOG_KEY,
  WEEK_KEY,
} from "./hybrid/shared";

const Dashboard = lazy(() => import("./Dashboard"));
const NutritionTracker = lazy(() => import("./Nutrition"));

export default function HybridView({ logout, ProgramSelector, lockedMode = null }) {
  const allDays = useMemo(
    () => [...PROGRAM_HYBRID.days].sort((a, b) => (DAY_ORDER[a.sub] || 9) - (DAY_ORDER[b.sub] || 9)),
    []
  );
  const [todayContext, setTodayContext] = useState(() => getTodayContext());
  const [page, setPage] = useState("program");
  const [selectedDay, setSelectedDay] = useState(() => getTodayIndex(allDays, getTodayContext().sub));
  const [mode, setMode] = useState(() => {
    if (lockedMode) return lockedMode;
    try { return localStorage.getItem(MODE_KEY) || "home"; } catch { return "home"; }
  });
  const [expandedEx, setExpandedEx] = useState(null);
  const [openBlocks, setOpenBlocks] = useState({});
  const [restTimer, setRestTimer] = useState(null);
  const [swaps, setSwaps] = useState(() => loadJson(SWAPS_KEY, {}));
  const [entries, setEntries] = useState(() => loadJson(ENTRIES_KEY, {}));
  const [startDate, setStartDate] = useState(() => loadJson(START_KEY, null));
  const [weekLog, setWeekLog] = useState(() => loadJson(WEEK_LOG_KEY, []));
  const [snoozeDate, setSnoozeDate] = useState(() => loadJson(SNOOZE_KEY, null));
  const [activeWeek, setActiveWeek] = useState(() => {
    const saved = Number(loadJson(WEEK_KEY, 1));
    return Number.isFinite(saved) && saved >= 1 && saved <= PROGRAM_HYBRID.periodization.length ? saved : 1;
  });
  const [skillState, setSkillState] = useState(() => {
    const defaults = buildDefaultSkillState(PROGRAM_HYBRID.skillPaths);
    return { ...defaults, ...loadJson(SKILL_KEY, {}) };
  });
  const [workoutState, setWorkoutState] = useState({ loaded: false, started: false, completed: false });
  const [workoutSnapshot, setWorkoutSnapshot] = useState(null);
  const [weekCompletedWorkouts, setWeekCompletedWorkouts] = useState([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [supportOpen, setSupportOpen] = useState(false);
  const [focusedBlockIndex, setFocusedBlockIndex] = useState(null);
  const [nextStepHint, setNextStepHint] = useState(null);
  const finishWorkoutRef = useRef(null);
  const checkoutRef = useRef(null);

  const day = allDays[selectedDay];
  const todaySub = todayContext.sub;
  const todayIndex = getTodayIndex(allDays, todaySub);
  const allEntries = useMemo(() => Object.values(entries), [entries]);
  const showDayTabs = page === "program" || page === "nutrition";
  const workoutDayIndex = selectedDay + (mode === "gym" ? 400 : 300);
  const weekProfile = PROGRAM_HYBRID.periodization.find((item) => item.week === activeWeek) || PROGRAM_HYBRID.periodization[0];
  const baseVariant = getHybridDayVariant(day, mode);
  const activeVariant = useMemo(() => applyWeekToVariant(baseVariant, weekProfile), [baseVariant, weekProfile]);
  const entryDate = todayContext.key;
  const entryKey = `${entryDate}|${day.sub}|${mode}`;
  const hasWorkoutInput = useMemo(() => Object.keys(workoutSnapshot?.exercises || {}).length > 0, [workoutSnapshot]);
  const blockProgress = useMemo(() => {
    const exercises = workoutSnapshot?.exercises || {};
    return Object.fromEntries(
      activeVariant.blocks.map((block, index) => {
        const total = block.exercises.length;
        let completed = 0;
        let touched = 0;
        block.exercises.forEach((exercise) => {
          const sets = exercises[exercise.name];
          if (!Array.isArray(sets) || sets.length === 0) return;
          const hasInput = sets.some((set) => Number(set.weight || 0) > 0 || Number(set.reps || 0) > 0 || !!set.done);
          if (hasInput) touched += 1;
          if (sets.every((set) => set.done)) completed += 1;
        });
        return [index, { total, completed, touched }];
      })
    );
  }, [activeVariant.blocks, workoutSnapshot]);
  const currentBlock = useMemo(() => {
    if (focusedBlockIndex !== null && activeVariant.blocks[focusedBlockIndex]) {
      return activeVariant.blocks[focusedBlockIndex];
    }

    const firstInProgress = activeVariant.blocks.find((_, index) => {
      const progress = blockProgress[index];
      return progress && progress.completed < progress.total && progress.touched > 0;
    });

    if (firstInProgress) return firstInProgress;

    return activeVariant.blocks.find((_, index) => {
      const progress = blockProgress[index];
      return progress && progress.completed < progress.total;
    }) || null;
  }, [activeVariant.blocks, blockProgress, focusedBlockIndex]);
  const weekProgressBase = useMemo(() => getWeekProgress({
    entries: allEntries,
    startDate,
    activeWeek,
    today: todayContext.key,
    weekLog,
    trainingDays: allDays,
  }), [activeWeek, allDays, allEntries, startDate, todayContext.key, weekLog]);
  const weekProgress = useMemo(() => ({
    ...weekProgressBase,
    repGoalMet: getWorkoutRepGoalMet({
      completedEntries: weekProgressBase.completedEntries,
      completedWorkouts: weekCompletedWorkouts,
      allDays,
      resolveVariant: (daySub, entryMode) => {
        const targetDay = allDays.find((item) => item.sub === daySub);
        if (!targetDay) return null;
        return applyWeekToVariant(getHybridDayVariant(targetDay, entryMode), weekProfile);
      },
    }),
  }), [allDays, weekCompletedWorkouts, weekProfile, weekProgressBase]);
  const nextWeekProfile = PROGRAM_HYBRID.periodization.find((item) => item.week === activeWeek + 1) || null;
  const nextWeekPreview = useMemo(
    () => (nextWeekProfile ? getWeekShiftPreview(baseVariant, weekProfile, nextWeekProfile) : null),
    [baseVariant, nextWeekProfile, weekProfile]
  );
  const transitionPrompt = useMemo(() => {
    if (!startDate || !weekProgress.ready) return null;
    if (snoozeDate === todayContext.key) return null;
    if (activeWeek >= PROGRAM_HYBRID.periodization.length) {
      return { kind: "complete" };
    }
    return { kind: "advance" };
  }, [activeWeek, snoozeDate, startDate, todayContext.key, weekProgress.ready]);

  const findNextExerciseTarget = (exerciseMap = {}) => {
    for (let blockIdx = 0; blockIdx < activeVariant.blocks.length; blockIdx += 1) {
      const block = activeVariant.blocks[blockIdx];
      for (let exIdx = 0; exIdx < block.exercises.length; exIdx += 1) {
        const exercise = block.exercises[exIdx];
        const sets = exerciseMap?.[exercise.name];
        if (!Array.isArray(sets) || sets.length === 0) {
          return { blockIdx, exIdx, blockName: block.name, exerciseName: exercise.name };
        }

        const isDone = sets.every((set) => set.done);
        if (!isDone) {
          return { blockIdx, exIdx, blockName: block.name, exerciseName: exercise.name };
        }
      }
    }

    const fallbackBlock = activeVariant.blocks[0];
    const fallbackExercise = fallbackBlock?.exercises?.[0];
    return fallbackBlock && fallbackExercise
      ? { blockIdx: 0, exIdx: 0, blockName: fallbackBlock.name, exerciseName: fallbackExercise.name }
      : null;
  };

  const jumpToTarget = (target) => {
    if (!target) return;
    const key = `${target.blockIdx}-${target.exIdx}`;
    setOpenBlocks((prev) => ({ ...prev, [target.blockIdx]: true }));
    setFocusedBlockIndex(target.blockIdx);
    setExpandedEx(key);
    setNextStepHint({ ...target, key });

    window.setTimeout(() => {
      const node = document.querySelector(`[data-ex-key="${key}"]`);
      if (!node) return;
      const headerHeight = document.querySelector(".hdr")?.offsetHeight || 0;
      const top = node.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(top - headerHeight - 8, 0), behavior: "smooth" });
    }, 140);
  };

  useEffect(() => {
    if (!lockedMode) {
      try { localStorage.setItem(MODE_KEY, mode); } catch { return }
    }
  }, [mode, lockedMode]);

  useEffect(() => {
    saveJson(ENTRIES_KEY, entries);
  }, [entries]);

  useEffect(() => {
    saveJson(START_KEY, startDate);
  }, [startDate]);

  useEffect(() => {
    saveJson(WEEK_LOG_KEY, weekLog);
  }, [weekLog]);

  useEffect(() => {
    saveJson(SNOOZE_KEY, snoozeDate);
  }, [snoozeDate]);

  useEffect(() => {
    saveJson(WEEK_KEY, activeWeek);
  }, [activeWeek]);

  useEffect(() => {
    saveJson(SKILL_KEY, skillState);
  }, [skillState]);

  useEffect(() => {
    let active = true;

    const syncWorkoutSnapshot = async () => {
      const next = await loadWorkout(workoutDayIndex);
      if (active) setWorkoutSnapshot(next);
    };

    syncWorkoutSnapshot();
    window.addEventListener("yb-workout-updated", syncWorkoutSnapshot);

    return () => {
      active = false;
      window.removeEventListener("yb-workout-updated", syncWorkoutSnapshot);
    };
  }, [workoutDayIndex]);

  useEffect(() => {
    let active = true;

    const loadWeekCompletedWorkouts = async () => {
      if (!weekProgressBase.weekStartDate || !weekProgressBase.weekEndDate) {
        if (active) setWeekCompletedWorkouts([]);
        return;
      }

      const next = await getCompletedWorkoutsInRange(weekProgressBase.weekStartDate, weekProgressBase.weekEndDate);
      if (active) setWeekCompletedWorkouts(next);
    };

    loadWeekCompletedWorkouts();
    return () => {
      active = false;
    };
  }, [weekProgressBase.weekEndDate, weekProgressBase.weekStartDate]);

  useEffect(() => {
    const syncToday = () => {
      const next = getTodayContext();
      setTodayContext((prev) => {
        if (prev.key === next.key && prev.sub === next.sub) return prev;
        setSelectedDay(getTodayIndex(allDays, next.sub));
        return next;
      });
    };

    const intervalId = window.setInterval(syncToday, 30000);
    window.addEventListener("focus", syncToday);
    document.addEventListener("visibilitychange", syncToday);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", syncToday);
      document.removeEventListener("visibilitychange", syncToday);
    };
  }, [allDays]);

  const currentEntry = entries[entryKey] || {
    date: entryDate,
    day: day.sub,
    mode,
    aerobicMinutes: activeVariant.aerobicMinutes || 0,
    pre: { energy: "orta", sleep: "orta", shoulder: 0, knee: 0, spine: 0 },
    post: { rpe: "7", cardio: "uygun", shoulderAfter: 0, kneeAfter: 0, spineAfter: 0, nextAction: "aynı", completed: false, skillWork: {} },
  };

  const updateEntry = (section, updater) => {
    setEntries((prev) => {
      const base = prev[entryKey] || currentEntry;
      const nextSection = typeof updater === "function" ? updater(base[section]) : updater;
      return {
        ...prev,
        [entryKey]: {
          ...base,
          date: entryDate,
          day: day.sub,
          mode,
          aerobicMinutes: activeVariant.aerobicMinutes || 0,
          [section]: nextSection,
        },
      };
    });
  };

  const setSkillLevel = (skill, level) => {
    setSkillState((prev) => ({
      ...prev,
      [skill]: { ...prev[skill], level },
    }));
  };

  const handleSwap = (orig, alt) => {
    setSwaps((prev) => {
      const next = { ...prev };
      if (alt === null) delete next[orig];
      else next[orig] = alt;
      saveJson(SWAPS_KEY, next);
      return next;
    });
  };

  const startRest = (seconds, exerciseName, isTransition = false) => {
    setRestTimer({ key: Date.now(), seconds, exerciseName, isTransition });
  };

  const resetDayUiState = () => {
    setExpandedEx(null);
    setOpenBlocks({});
    setFocusedBlockIndex(null);
    setNextStepHint(null);
  };

  const handleDayChange = (index) => {
    setSelectedDay(index);
    resetDayUiState();
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    resetDayUiState();
  };

  const adjustRest = (delta) => {
    setRestTimer((prev) => prev ? { ...prev, seconds: Math.max(15, prev.seconds + delta), key: Date.now() } : prev);
  };

  const handleWorkoutStart = ({ workout } = {}) => {
    setWorkoutState({ loaded: true, started: true, completed: false });
    updateEntry("post", (prev) => ({ ...prev, completed: false }));
    const snapshot = workout || { exercises: {} };
    setWorkoutSnapshot(snapshot);
    jumpToTarget(findNextExerciseTarget(snapshot.exercises || {}));
  };

  const handleWorkoutFinish = () => {
    setWorkoutState({ loaded: true, started: false, completed: true });
    updateEntry("post", (prev) => ({ ...prev, completed: true }));
    loadWorkout(workoutDayIndex).then(setWorkoutSnapshot);
    setNextStepHint(null);
  };

  const appendWeekLog = () => {
    if (!startDate || weekLog.some((item) => item.week === activeWeek)) return;
    const currentWeekStart = getWeekStartDate(startDate, activeWeek);
    setWeekLog((prev) => ([
      ...prev,
      {
        week: activeWeek,
        startDate: currentWeekStart,
        completedDate: todayContext.key,
        sessionCount: weekProgress.sessionCount,
        repGoalMet: weekProgress.repGoalMet,
      },
    ]));
  };

  const handleStartProgram = () => {
    setStartDate(todayContext.key);
    setWeekLog([]);
    setSnoozeDate(null);
    setActiveWeek(1);
  };

  const handleAdvanceWeek = () => {
    appendWeekLog();
    setSnoozeDate(null);
    if (activeWeek < PROGRAM_HYBRID.periodization.length) {
      setActiveWeek(activeWeek + 1);
    }
  };

  const handleSnoozeWeekPrompt = () => {
    setSnoozeDate(todayContext.key);
  };

  const handleAcknowledgeCompletion = () => {
    appendWeekLog();
  };

  const handleResetProgram = () => {
    setStartDate(null);
    setWeekLog([]);
    setSnoozeDate(null);
    setActiveWeek(1);
  };

  const handleCompleteSession = async () => {
    if (currentEntry.post.completed) return;

    if (workoutState.started && !workoutState.completed && finishWorkoutRef.current) {
      await finishWorkoutRef.current();
      return;
    }

    if (!workoutState.completed) {
      const existing = await loadWorkout(workoutDayIndex);
      const startTime = existing?.startTime || Date.now();
      await saveWorkout(workoutDayIndex, {
        exercises: existing?.exercises || {},
        start_time: startTime,
        completed: false,
      });
      await markWorkoutDone(workoutDayIndex);
      setWorkoutState({ loaded: true, started: false, completed: true });
      const next = await loadWorkout(workoutDayIndex);
      setWorkoutSnapshot(next);
    }

    updateEntry("post", (prev) => ({ ...prev, completed: true }));
  };

  const lazyFallback = (
    <main className="main" style={{ paddingTop: 0 }}>
      <div style={{ padding: 12, color: "#7A7A84", fontSize: 12 }}>Yükleniyor...</div>
    </main>
  );

  return (
    <div className="app">
      <header className="hdr">
        <div className="hdr-top">
          <div className="brand">YEAHH BODY</div>
          <button className="logout-btn" onClick={logout}>Çıkış</button>
        </div>
        <div className="prog-title">{PROGRAM_HYBRID.meta.name}</div>
        {ProgramSelector && <ProgramSelector />}

        <div className="page-nav">
          {[
            ["program", "Program"],
            ["skill", "🎯 Skill"],
            ["plan", "8 Hafta"],
            ["status", "📊 Durum"],
            ["nutrition", "🍽 Beslenme"],
          ].map(([id, label]) => (
            <button key={id} className={`page-tab ${page === id ? "page-tab-active" : ""}`} onClick={() => setPage(id)}>{label}</button>
          ))}
        </div>

        {showDayTabs ? (
          <>
            <div className="tabs">
              {allDays.map((item, index) => (
                <button
                  key={item.sub}
                  className={`tab ${selectedDay === index ? "tab-active" : ""}`}
                  style={selectedDay === index ? { background: item.color } : item.sub === todaySub ? { boxShadow: "inset 0 0 0 1px rgba(79,195,247,.55)" } : {}}
                  onClick={() => handleDayChange(index)}
                >
                  <div className="tab-t">{item.sub.slice(0, 3)}</div>
                  <div className="tab-s">{item.sub === todaySub ? "Bugün" : item.type === "training" ? "Ana Gün" : "Off"}</div>
                </button>
              ))}
            </div>

            {selectedDay !== todayIndex && (
              <div style={{ paddingTop: 8 }}>
                <button
                  onClick={() => handleDayChange(todayIndex)}
                  style={{
                    ...buttonBase,
                    width: "100%",
                    background: "rgba(79,195,247,.1)",
                    borderColor: "rgba(79,195,247,.32)",
                    color: "#fff",
                    padding: "10px 12px",
                    fontSize: 12,
                  }}
                >
                  📍 Bugünün programına dön · {todaySub}
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingTop: 8 }}>
            <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 999, padding: "6px 10px", fontSize: 11, color: "#fff", fontWeight: 700 }}>
              {day.sub}
            </div>
            <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 999, padding: "6px 10px", fontSize: 11, color: "#C4C4CC", fontWeight: 700 }}>
              {mode === "home" ? "Ev" : "Macfit"}
            </div>
            <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 999, padding: "6px 10px", fontSize: 11, color: "#C4C4CC", fontWeight: 700 }}>
              {page === "skill" ? "Skill" : page === "plan" ? "8 Hafta" : "Durum"}
            </div>
          </div>
        )}
      </header>

      {page === "program" && (
        <>
          <div className="day-hdr">
            <div className="day-top">
              <div>
                <div className="day-focus">{day.focus}</div>
                <div className="day-meta">{activeVariant.duration} · {mode === "home" ? "Ev versiyonu" : "Macfit versiyonu"}</div>
              </div>
              <div className="day-badge" style={{ background: day.color }}>{day.sub}</div>
            </div>
            {activeVariant.injury && <div className="injury">{activeVariant.injury}</div>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
              <div style={{ background: "rgba(79,195,247,.08)", border: "1px solid rgba(79,195,247,.22)", borderRadius: 999, padding: "6px 10px", fontSize: 11, color: "#4FC3F7", fontWeight: 800 }}>
                Hafta {weekProfile.week} · {weekProfile.label}
              </div>
              <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 999, padding: "6px 10px", fontSize: 11, color: "#C4C4CC", fontWeight: 700 }}>
                {day.type === "training" ? "Ana gün" : "Aktif off"}
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: "#C4C4CC", lineHeight: 1.5 }}>
              {activeVariant.weekExecutionNote || weekProfile.note}
            </div>
          </div>

          {!startDate && (
            <div style={{ padding: "0 12px 12px" }}>
              <SectionCard title="🏁 8 Haftalık Programa Başla" accent="#00C853">
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ fontSize: 12, color: "#C4C4CC", lineHeight: 1.5 }}>
                    Bugünü başlangıç tarihi olarak kaydeder ve haftayı `Hafta 1 — Kurulum` olarak başlatır.
                  </div>
                  <button
                    onClick={handleStartProgram}
                    style={{
                      ...buttonBase,
                      width: "100%",
                      background: "#00C853",
                      borderColor: "#00C853",
                      color: "#07140B",
                      padding: "12px 14px",
                      fontSize: 13,
                      fontWeight: 900,
                    }}
                  >
                    Programa Başla
                  </button>
                </div>
              </SectionCard>
            </div>
          )}

          {transitionPrompt?.kind === "advance" && (
            <div style={{ padding: "0 12px 12px" }}>
              <SectionCard title={`🎉 Hafta ${activeWeek} tamamlandı!`} accent="#00C853">
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ fontSize: 12, color: "#C4C4CC", lineHeight: 1.5 }}>
                    {weekProgress.sessionCount} seans · Rep hedefi: <span style={{ color: weekProgress.repGoalMet ? "#00C853" : "#FFA726", fontWeight: 800 }}>{weekProgress.repGoalMet ? "✓ tutuldu" : "△ kısmen"}</span>
                  </div>
                  {nextWeekProfile && (
                    <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 10, padding: 10 }}>
                      <div style={{ fontSize: 12, color: "#fff", fontWeight: 800 }}>
                        Sonraki: Hafta {nextWeekProfile.week} — {nextWeekProfile.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5, marginTop: 6 }}>
                        {nextWeekPreview}
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={handleAdvanceWeek}
                      style={{
                        ...buttonBase,
                        flex: 1,
                        background: "#4FC3F7",
                        borderColor: "#4FC3F7",
                        color: "#071119",
                        padding: "12px 14px",
                        fontSize: 13,
                        fontWeight: 900,
                      }}
                    >
                      Hafta {nextWeekProfile?.week}'ye Geç
                    </button>
                    <button onClick={handleSnoozeWeekPrompt} style={{ ...buttonBase, flex: 1, padding: "12px 14px", fontSize: 13 }}>
                      Bekle
                    </button>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {transitionPrompt?.kind === "complete" && (
            <div style={{ padding: "0 12px 12px" }}>
              <SectionCard title="🏆 8 Hafta tamamlandı!" accent="#FFD166">
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ fontSize: 12, color: "#C4C4CC", lineHeight: 1.5 }}>
                    H1'den H8'e ilerleme kaydın hazır. Dilersen bu bloğu kapat, dilersen yeni bir döngü başlat.
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleResetProgram} style={{ ...buttonBase, flex: 1, padding: "12px 14px", fontSize: 13 }}>
                      Programı Sıfırla
                    </button>
                    <button
                      onClick={handleAcknowledgeCompletion}
                      style={{
                        ...buttonBase,
                        flex: 1,
                        background: "#FFD166",
                        borderColor: "#FFD166",
                        color: "#171105",
                        padding: "12px 14px",
                        fontSize: 13,
                        fontWeight: 900,
                      }}
                    >
                      Devam Et
                    </button>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          <DailyCheckinPanel
            day={day}
            mode={mode}
            setMode={handleModeChange}
            activeVariant={activeVariant}
            pre={currentEntry.pre}
            setPre={(updater) => updateEntry("pre", updater)}
            lockedMode={lockedMode}
          />

          <div style={{ padding: "0 12px 12px" }}>
            <WorkoutTimer
              dayIndex={workoutDayIndex}
              onWorkoutStart={handleWorkoutStart}
              onWorkoutFinish={handleWorkoutFinish}
              finishRef={finishWorkoutRef}
              onStateChange={setWorkoutState}
              onElapsed={setElapsedSeconds}
            />
          </div>

          <main className="main">
            <div style={{
              background: "rgba(255,167,38,.08)",
              border: "1px solid rgba(255,167,38,.20)",
              borderRadius: 12,
              padding: 10,
              marginBottom: 10,
            }}>
              <div style={{ fontSize: 10, color: "#FFA726", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>
                Kısa Güvenlik Özeti
              </div>
              <div style={{ display: "grid", gap: 4 }}>
                {[
                  "Ağrı 2/10'u geçerse aynı paterni regress et veya swap kullan.",
                  "Keskin ağrı, boşalma hissi, uyuşma veya yayılım varsa hareket biter.",
                ].map((item) => (
                  <div key={item} style={{ fontSize: 11, color: "#F7D7A0", lineHeight: 1.45 }}>• {item}</div>
                ))}
              </div>
            </div>

            {activeVariant.blocks.map((block, bi) => (
              <BlockCard
                key={`${mode}-${selectedDay}-${bi}`}
                block={block}
                blockIdx={bi}
                expandedEx={expandedEx}
                onExToggle={(key) => {
                  const blockIdx = parseInt(String(key).split("-")[0], 10);
                  setOpenBlocks((prev) => ({ ...prev, [blockIdx]: true }));
                  setFocusedBlockIndex(blockIdx);
                  setNextStepHint(null);
                  setExpandedEx((prev) => prev === key ? null : key);
                }}
                dayIndex={workoutDayIndex}
                onStartRest={startRest}
                swaps={swaps}
                onSwap={handleSwap}
                forceOpen={!!openBlocks[bi]}
                progress={blockProgress[bi]}
                onFocus={setFocusedBlockIndex}
              />
            ))}
          </main>

          {nextStepHint && !currentEntry.post.completed && (
            <div style={{ padding: "0 12px 12px" }}>
              <button
                onClick={() => jumpToTarget(nextStepHint)}
                style={{
                  width: "100%",
                  background: "rgba(79,195,247,.08)",
                  border: "1px solid rgba(79,195,247,.24)",
                  borderRadius: 12,
                  padding: "12px 14px",
                  color: "#fff",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 10, color: "#4FC3F7", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>
                  Sonraki Adım
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginTop: 4 }}>
                  {nextStepHint.blockName} · {nextStepHint.exerciseName}
                </div>
                <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 4, lineHeight: 1.45 }}>
                  Kaldığın veya başlaman gereken harekete dön.
                </div>
              </button>
            </div>
          )}

          <div ref={checkoutRef}>
            <DailyCheckoutPanel
              post={currentEntry.post}
              setPost={(updater) => updateEntry("post", updater)}
              daySub={day.sub}
              skillPaths={PROGRAM_HYBRID.skillPaths}
              skillState={skillState}
              onComplete={handleCompleteSession}
            />
          </div>

          <div style={{ padding: "0 12px 12px" }}>
            <div style={{ background: "#131316", border: "1px solid #2A2A30", borderRadius: 12, overflow: "hidden" }}>
              <button
                onClick={() => setSupportOpen((value) => !value)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  color: "inherit",
                  padding: "12px",
                  cursor: "pointer",
                }}
              >
                <div>
                  <div style={{ fontSize: 11, color: "#7A7A84", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>
                    Yardımcı Alan
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginTop: 4 }}>
                    Rehber, denetim profili ve ek notlar
                  </div>
                  <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5, marginTop: 4 }}>
                    Programı bitirdikten sonra veya ihtiyaç olduğunda aç.
                  </div>
                </div>
                <div style={{ color: "#7A7A84", fontSize: 18 }}>{supportOpen ? "−" : "+"}</div>
              </button>

              {supportOpen && (
                <div style={{ padding: "0 0 12px" }}>
                  <DayCoachGuide day={day} guides={HYBRID_COACH_GUIDES} title="Hibrit Gün Rehberi" embedded />
                  <CoachControlPanel program={PROGRAM_HYBRID} embedded />
                </div>
              )}
            </div>
          </div>

          {restTimer && (
            <RestTimer
              key={restTimer.key}
              seconds={restTimer.seconds}
              exerciseName={restTimer.exerciseName}
              isTransition={restTimer.isTransition}
              onDismiss={() => setRestTimer(null)}
              onAdjust={adjustRest}
            />
          )}

          {!currentEntry.post.completed && (workoutState.started || hasWorkoutInput) && (
            <div
              style={{
                position: "fixed",
                left: "50%",
                bottom: 14,
                transform: "translateX(-50%)",
                width: "min(456px, calc(100vw - 24px))",
                background: "#131316",
                color: "#fff",
                border: "1px solid #2A2A30",
                borderRadius: 14,
                boxShadow: "0 10px 30px rgba(0,0,0,.35)",
                zIndex: 90,
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 12px 8px" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: "#7A7A84", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>
                    Aktif Seans
                  </div>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 800, marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {currentBlock ? currentBlock.name : "Program akışı"}
                  </div>
                  <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 4, lineHeight: 1.4 }}>
                    {workoutState.started
                      ? `${String(Math.floor(elapsedSeconds / 60)).padStart(2, "0")}:${String(elapsedSeconds % 60).padStart(2, "0")} · ${currentBlock ? `${blockProgress[activeVariant.blocks.indexOf(currentBlock)]?.completed || 0}/${blockProgress[activeVariant.blocks.indexOf(currentBlock)]?.total || 0} hareket` : "devam ediyor"}`
                      : "Set girdin, seansı kapatmayı unutma"}
                  </div>
                </div>
                <button
                  onClick={() => checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  style={{
                    border: "1px solid #D41920",
                    background: "#D41920",
                    color: "#fff",
                    borderRadius: 10,
                    padding: "10px 12px",
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Bitir
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {page === "plan" && (
        <div style={{ padding: "12px", display: "grid", gap: 10 }}>
          <SectionCard title="Program Çizelgesi" accent="#4FC3F7">
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8 }}>
                {PROGRAM_HYBRID.periodization.map((week) => {
                  const isDone = weekLog.some((item) => item.week === week.week);
                  const active = week.week === activeWeek;
                  const isFuture = startDate ? week.week > activeWeek && !isDone : week.week > 1;
                  const weekStart = startDate ? getWeekStartDate(startDate, week.week) : null;
                  const symbol = isDone ? "✓" : active ? "●" : "○";
                  return (
                    <button
                      key={week.week}
                      onClick={() => !isFuture && setActiveWeek(week.week)}
                      disabled={isFuture}
                      style={{
                        ...buttonBase,
                        minWidth: 0,
                        opacity: isFuture ? 0.6 : 1,
                        background: isDone ? "rgba(0,200,83,.1)" : active ? "rgba(79,195,247,.14)" : "#17171B",
                        borderColor: isDone ? "rgba(0,200,83,.35)" : active ? "#4FC3F7" : "#2A2A30",
                        color: active || isDone ? "#fff" : "#C4C4CC",
                        padding: "10px 8px",
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 900 }}>H{week.week} {symbol}</div>
                      <div style={{ fontSize: 10, color: isDone ? "#8FF0A4" : active ? "#4FC3F7" : "#7A7A84", marginTop: 4 }}>{weekStart ? formatShortDateLabel(weekStart) : "bekliyor"}</div>
                    </button>
                  );
                })}
              </div>
              {!startDate ? (
                <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5 }}>Program henüz başlatılmadı. Başlangıç tarihi atanınca haftalar otomatik takvime oturur.</div>
              ) : (
                <>
                  <div style={{ fontSize: 12, color: "#fff", fontWeight: 800 }}>Başlangıç: {formatShortDateLabel(startDate)} · Şu an: Hafta {weekProfile.week} · {weekProfile.label}</div>
                  <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5 }}>{getWeekExecutionNote(weekProfile)}</div>
                </>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Hafta Detayı" accent="#4FC3F7">
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ background: "rgba(79,195,247,.08)", border: "1px solid rgba(79,195,247,.24)", borderRadius: 10, padding: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>Hafta {weekProfile.week} · {weekProfile.label}</div>
                <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 6, lineHeight: 1.5 }}>{weekProfile.note}</div>
                <div style={{ fontSize: 10, color: "#7A7A84", marginTop: 6 }}>Uygulama: {getWeekExecutionNote(weekProfile)}</div>
              </div>

              {(() => {
                const loggedWeek = weekLog.find((item) => item.week === activeWeek);
                if (loggedWeek) {
                  return (
                    <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 10, padding: 10 }}>
                      <div style={{ fontSize: 11, color: "#00C853", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em" }}>Read-only kayıt</div>
                      <div style={{ fontSize: 12, color: "#fff", fontWeight: 800, marginTop: 6 }}>{loggedWeek.sessionCount} seans · Rep hedefi: {loggedWeek.repGoalMet ? "✓" : "△"}</div>
                      <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 6, lineHeight: 1.5 }}>Başlangıç: {formatShortDateLabel(loggedWeek.startDate)} · Tamamlandı: {formatShortDateLabel(loggedWeek.completedDate)}</div>
                    </div>
                  );
                }

                if (!startDate) {
                  return <div style={{ fontSize: 11, color: "#7A7A84" }}>Hafta detayları için önce programı başlat.</div>;
                }

                return (
                  <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 10, padding: 10 }}>
                    <div style={{ fontSize: 11, color: "#4FC3F7", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em" }}>Aktif hedef</div>
                    <div style={{ fontSize: 12, color: "#fff", fontWeight: 800, marginTop: 6 }}>{weekProgress.sessionCount}/4 tamamlanan ana seans</div>
                    <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 6, lineHeight: 1.5 }}>Hafta penceresi: {formatShortDateLabel(weekProgress.weekStartDate)} · {formatShortDateLabel(weekProgress.weekEndDate)}</div>
                    <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 6, lineHeight: 1.5 }}>{weekProgress.repGoalMet ? "Rep hedefi genel olarak tutuluyor." : "Rep hedefi için kalite ve toparlanma biraz daha oturmalı."}</div>
                  </div>
                );
              })()}
            </div>
          </SectionCard>

          <SectionCard title="Ev ↔ Macfit Eşleşme Tablosu" accent="#FFA726">
            <div style={{ display: "grid", gap: 8 }}>
              {PROGRAM_HYBRID.movementMap.map((row) => (
                <div key={row.pattern} style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 10, padding: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{row.pattern}</div>
                  <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 6, lineHeight: 1.5 }}>Macfit: {row.gym}</div>
                  <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 4, lineHeight: 1.5 }}>Ev: {row.home}</div>
                  <div style={{ fontSize: 11, color: "#7A7A84", marginTop: 6, lineHeight: 1.5 }}>{row.note}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {page === "skill" && (
        <SkillTracker
          skillPaths={PROGRAM_HYBRID.skillPaths}
          entries={entries}
          skillState={skillState}
          onSetSkillLevel={setSkillLevel}
        />
      )}

      {page === "status" && (
        <>
          <WeeklyReview entries={Object.values(entries)} activeWeek={weekProfile} />
          <Suspense fallback={lazyFallback}>
            <main className="main" style={{ paddingTop: 0 }}>
              <Dashboard />
            </main>
          </Suspense>
        </>
      )}

      {page === "nutrition" && (
        <Suspense fallback={lazyFallback}>
          <main className="main">
            <NutritionTracker currentDay={activeVariant} currentMode={mode} currentSession={currentEntry} />
          </main>
        </Suspense>
      )}
    </div>
  );
}
