import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import BlockCard from "./BlockCard";
import RestTimer from "./RestTimer";
import WorkoutTimer from "./WorkoutTimer";
import { PROGRAM_HYBRID, getHybridDayVariant } from "./dataHybrid";
import { getCompletedWorkoutsInRange, loadWorkout, markWorkoutDone, saveWorkout } from "./tracker";
import ActiveSessionBar from "./hybrid/ActiveSessionBar";
import DayHeader from "./hybrid/DayHeader";
import HybridHeader from "./hybrid/HybridHeader";
import PlanPage from "./hybrid/PlanPage";
import ScrollToTopButton from "./hybrid/ScrollToTopButton";
import SafetyNotice from "./hybrid/SafetyNotice";
import StartProgramCard from "./hybrid/StartProgramCard";
import SupportDrawer from "./hybrid/SupportDrawer";
import WeekTransitionPanel from "./hybrid/WeekTransitionPanel";
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
  DAY_ORDER,
  ENTRIES_KEY,
  getTodayContext,
  getTodayIndex,
  getWorkoutRepGoalMet,
  getWeekProgress,
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

  // Flat ordered list of all exercises across blocks — used to walk forward
  // relative to a current position rather than always scanning from the top.
  const flatExercises = useMemo(
    () => activeVariant.blocks.flatMap((block, blockIdx) =>
      block.exercises.map((exercise, exIdx) => ({
        blockIdx,
        exIdx,
        blockName: block.name,
        exerciseName: exercise.name,
      }))
    ),
    [activeVariant.blocks]
  );

  const isExerciseUnfinished = (target, exerciseMap) => {
    const sets = exerciseMap?.[target.exerciseName];
    if (!Array.isArray(sets) || sets.length === 0) return true;
    return !sets.every((set) => set.done);
  };

  // Find the next unfinished exercise AFTER a given position. Warmup entries
  // never get tracked sets, so treating them as "unfinished" is fine — walking
  // from a specific position ensures we never loop back to earlier items.
  // When currentKey is null, falls back to first-in-list behavior.
  const findNextExerciseFrom = (currentKey, exerciseMap = {}) => {
    if (flatExercises.length === 0) return null;

    let startIndex = 0;
    if (currentKey) {
      const [bi, ei] = String(currentKey).split("-").map(Number);
      const idx = flatExercises.findIndex((t) => t.blockIdx === bi && t.exIdx === ei);
      if (idx !== -1) startIndex = idx + 1;
    }

    // Walk forward from startIndex, pick the first unfinished.
    for (let i = startIndex; i < flatExercises.length; i += 1) {
      if (isExerciseUnfinished(flatExercises[i], exerciseMap)) return flatExercises[i];
    }
    // Nothing left after the current position — return next in order regardless
    // of done state, so the user can step past finished items manually. If we
    // are at the very end, return null to disable the button.
    return flatExercises[startIndex] || null;
  };

  const findNextExerciseTarget = (exerciseMap = {}) =>
    findNextExerciseFrom(null, exerciseMap) || flatExercises[0] || null;

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
      <HybridHeader
        programName={PROGRAM_HYBRID.meta.name}
        ProgramSelector={ProgramSelector}
        logout={logout}
        page={page}
        setPage={setPage}
        showDayTabs={showDayTabs}
        allDays={allDays}
        selectedDay={selectedDay}
        todaySub={todaySub}
        todayIndex={todayIndex}
        handleDayChange={handleDayChange}
        day={day}
        mode={mode}
      />

      {page === "program" && (
        <>
          <DayHeader day={day} activeVariant={activeVariant} mode={mode} weekProfile={weekProfile} />

          {!startDate && <StartProgramCard onStart={handleStartProgram} />}

          <WeekTransitionPanel
            transitionPrompt={transitionPrompt}
            activeWeek={activeWeek}
            weekProgress={weekProgress}
            nextWeekProfile={nextWeekProfile}
            nextWeekPreview={nextWeekPreview}
            onAdvance={handleAdvanceWeek}
            onSnooze={handleSnoozeWeekPrompt}
            onReset={handleResetProgram}
            onAcknowledgeCompletion={handleAcknowledgeCompletion}
          />

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
            <SafetyNotice />

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

          <SupportDrawer day={day} program={PROGRAM_HYBRID} />

          {restTimer && (
            <RestTimer
              key={restTimer.key}
              seconds={restTimer.seconds}
              exerciseName={restTimer.exerciseName}
              isTransition={restTimer.isTransition}
              onDismiss={() => {
                const wasTransition = restTimer.isTransition;
                const finishedExerciseName = restTimer.exerciseName;
                setRestTimer(null);
                // On exercise transitions, auto-advance focus to the exercise
                // immediately after the one that just wrapped up.
                if (wasTransition) {
                  const finishedAt = flatExercises.find((t) => t.exerciseName === finishedExerciseName);
                  const fromKey = finishedAt ? `${finishedAt.blockIdx}-${finishedAt.exIdx}` : null;
                  jumpToTarget(findNextExerciseFrom(fromKey, workoutSnapshot?.exercises || {}));
                }
              }}
              onAdjust={adjustRest}
            />
          )}

          <ActiveSessionBar
            visible={!currentEntry.post.completed && (workoutState.started || hasWorkoutInput)}
            currentBlock={currentBlock}
            currentBlockProgress={currentBlock ? blockProgress[activeVariant.blocks.indexOf(currentBlock)] : null}
            elapsedSeconds={elapsedSeconds}
            workoutStarted={workoutState.started}
            nextStepHint={nextStepHint}
            onNextStep={() => {
              // Always advance RELATIVE to the exercise the user is currently
              // viewing, never from the top of the list. For warmup (which has
              // no tracked sets), this is the only way to progress.
              const currentKey = expandedEx || nextStepHint?.key || null;
              const target = findNextExerciseFrom(currentKey, workoutSnapshot?.exercises || {});
              if (target) jumpToTarget(target);
            }}
            onJumpToCheckout={() => checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          />
        </>
      )}

      {page === "plan" && (
        <PlanPage
          weekLog={weekLog}
          activeWeek={activeWeek}
          setActiveWeek={setActiveWeek}
          startDate={startDate}
          weekProfile={weekProfile}
          weekProgress={weekProgress}
        />
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

      <ScrollToTopButton
        liftAboveBar={page === "program" && !currentEntry.post.completed && (workoutState.started || hasWorkoutInput)}
      />
    </div>
  );
}
