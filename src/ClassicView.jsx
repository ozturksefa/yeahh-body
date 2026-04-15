import { useState, useEffect, useRef } from "react";
import { PROGRAM } from "./data";
import { calcDayCalories, getUserWeight } from "./calorieCalc";
import { getDashboardStats } from "./tracker";
import { saveFlow, loadFlow, clearFlow } from "./flowStore";
import Dashboard, { WeeklyStats } from "./Dashboard";
import NutritionTracker from "./Nutrition";
import RestTimer from "./RestTimer";
import WorkoutTimer from "./WorkoutTimer";
import BlockCard from "./BlockCard";
import { parseSets } from "./setTrackerUtils";

export default function ClassicView({ user, logout, ProgramSelector, onSwitchToHybrid }) {
  const [page, setPage] = useState("program");
  const [day, setDay] = useState(0);
  const [expandedEx, setExpandedEx] = useState(null);
  const [guideOpen, setGuideOpen] = useState(null);
  const [restTimer, setRestTimer] = useState(null);
  const [swaps, setSwaps] = useState(() => {
    try { return JSON.parse(localStorage.getItem("yb_swaps") || "{}"); } catch { return {}; }
  });
  const [workoutActive, setWorkoutActive] = useState(false);
  const [openBlocks, setOpenBlocks] = useState({});
  const [globalAllDone, setGlobalAllDone] = useState(false);
  const [workoutElapsed, setWorkoutElapsed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const d = PROGRAM.days[day];
  const g = PROGRAM.guide;
  const total = d.blocks.reduce((a, b) => a + b.exercises.length, 0);

  const handleSwap = (originalName, altName) => {
    setSwaps(prev => {
      const next = { ...prev };
      if (altName === null) delete next[originalName];
      else next[originalName] = altName;
      try { localStorage.setItem("yb_swaps", JSON.stringify(next)); } catch {
        // localStorage may be unavailable in private mode
      }
      return next;
    });
  };

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (user) getDashboardStats().then(s => setStreak(s.streak || 0)).catch(() => undefined);
  }, [user]);

  const flowRestoredRef = useRef(false);
  useEffect(() => {
    if (!user || flowRestoredRef.current) return;
    flowRestoredRef.current = true;
    loadFlow().then(saved => {
      if (!saved) return;
      setDay(saved.day);
      setWorkoutActive(true);
      setExpandedEx(saved.expandedEx);
      const bi = parseInt(saved.expandedEx.split("-")[0]);
      setOpenBlocks({ [bi]: true });
      setTimeout(() => {
        const tryScroll = (attempts) => {
          if (attempts <= 0) return;
          const openBody = document.querySelector(".ex-body");
          if (!openBody) { setTimeout(() => tryScroll(attempts - 1), 200); return; }
          const card = openBody.closest(".ex-wrap");
          if (!card) return;
          const hdrH = document.querySelector(".hdr")?.offsetHeight || 0;
          window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - hdrH - 8, behavior: "smooth" });
        };
        tryScroll(8);
      }, 300);
    });
  }, [user]);

  useEffect(() => {
    if (!flowRestoredRef.current) return;
    if (workoutActive && expandedEx) saveFlow({ day, expandedEx, workoutActive: true });
    else if (!workoutActive) clearFlow();
  }, [workoutActive, expandedEx, day]);

  const selectDay = (nextDay) => {
    if (nextDay === day) return;
    setExpandedEx(null);
    setWorkoutActive(false);
    setOpenBlocks({});
    setGlobalAllDone(false);
    clearFlow();
    setDay(nextDay);
  };

  // Flat exercise list
  const flatExercises = [];
  d.blocks.forEach((block, bi) => {
    block.exercises.forEach((ex, ei) => {
      flatExercises.push({ key: `${bi}-${ei}`, blockIdx: bi, exIdx: ei });
    });
  });

  const currentFlat = flatExercises.find(f => f.key === expandedEx);
  const currentBlock = currentFlat ? d.blocks[currentFlat.blockIdx] : null;
  const currentEx = currentBlock ? currentBlock.exercises[currentFlat.exIdx] : null;
  const currentBlockName = currentBlock?.name || "";
  const trackBlockNames = ["KUVVET", "CALİSTHENİCS", "CORE", "FİNİSHER"];
  const currentHasTracker = currentEx &&
    trackBlockNames.some(b => currentBlockName.toUpperCase().includes(b)) &&
    parseSets(currentEx.sets) && !parseSets(currentEx.sets)?.timed;
  const isLastExGlobal = currentFlat && flatExercises.indexOf(currentFlat) === flatExercises.length - 1;
  const canAdvance = workoutActive && expandedEx && (!currentHasTracker || globalAllDone);
  const currentExIndex = flatExercises.findIndex(f => f.key === expandedEx);

  const openExercise = (key) => {
    const bi = parseInt(key.split("-")[0]);
    setOpenBlocks(prev => ({ ...prev, [bi]: true }));
    setExpandedEx(key);
    setGlobalAllDone(false);
    setTimeout(() => {
      const cards = document.querySelectorAll(".ex-wrap");
      for (const card of cards) {
        if (card.querySelector(".ex-body")) {
          const hdrH = document.querySelector(".hdr")?.offsetHeight || 0;
          window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - hdrH - 8, behavior: "smooth" });
          break;
        }
      }
    }, 120);
  };

  const handleWorkoutStart = () => {
    if (flatExercises.length > 0) {
      setWorkoutActive(true);
      const firstKey = flatExercises[0].key;
      const bi = parseInt(firstKey.split("-")[0]);
      setOpenBlocks({ [bi]: true });
      setExpandedEx(firstKey);
      setTimeout(() => {
        const cards = document.querySelectorAll(".ex-wrap");
        for (const card of cards) {
          if (card.querySelector(".ex-body")) {
            const hdrH = document.querySelector(".hdr")?.offsetHeight || 0;
            window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - hdrH - 8, behavior: "smooth" });
            break;
          }
        }
      }, 150);
    }
  };

  const timerRef = useRef(null);
  const wakeLockRef = useRef(null);

  const handleAdvance = () => {
    if (currentExIndex < 0) return;
    const nextIdx = currentExIndex + 1;
    if (nextIdx >= flatExercises.length) {
      setExpandedEx(null); setWorkoutActive(false); setOpenBlocks({});
      if (timerRef.current) timerRef.current();
      wakeLockRef.current?.release(); wakeLockRef.current = null;
      clearFlow();
      return;
    }
    openExercise(flatExercises[nextIdx].key);
  };

  const handleGoBack = () => {
    if (currentExIndex <= 0) return;
    openExercise(flatExercises[currentExIndex - 1].key);
  };

  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) wakeLockRef.current = await navigator.wakeLock.request("screen");
    } catch {
      // wake lock is best-effort only
    }
  };
  const releaseWakeLock = () => { wakeLockRef.current?.release(); wakeLockRef.current = null; };

  useEffect(() => {
    if (workoutActive) {
      requestWakeLock();
      const onVis = () => { if (document.visibilityState === "visible" && workoutActive) requestWakeLock(); };
      document.addEventListener("visibilitychange", onVis);
      return () => { document.removeEventListener("visibilitychange", onVis); releaseWakeLock(); };
    } else { releaseWakeLock(); }
  }, [workoutActive]);

  const startRest = (seconds, exerciseName, isTransition) => {
    setRestTimer({ seconds, exerciseName, isTransition: !!isTransition, key: Date.now() });
  };
  const adjustRest = (delta) => {
    setRestTimer(prev => prev ? { ...prev, seconds: Math.max(5, prev.seconds + delta), key: Date.now() } : null);
  };

  const guideCards = [
    { id: "rest", icon: "⏱", title: "Setler Arası Ne Kadar Dinleneyim?", content: (
      <div>{g.restRules.map((r, i) => (
        <div key={i} className="guide-row">
          <span className="guide-label">{r.block}</span>
          <span className="guide-value">{r.rest}</span>
          <span className="guide-note">{r.note}</span>
        </div>
      ))}</div>
    )},
    { id: "rpe", icon: "💪", title: "Ne Kadar Zorlanmalıyım?", content: (
      <div>{g.rpeGuide.map((r, i) => (
        <div key={i} className="guide-row">
          <span className="guide-label">{r.category}</span>
          <span className="guide-value">{r.rpe}</span>
          <span className="guide-note">{r.desc}</span>
        </div>
      ))}</div>
    )},
    { id: "tempo", icon: "🐢", title: "Ne Kadar Yavaş/Hızlı Yapayım?", content: (
      <div className="guide-text">{g.tempo}</div>
    )},
    { id: "prog", icon: "📈", title: "Her Hafta Ne Değişecek?", content: (
      <div>{g.progression.map((p, i) => (
        <div key={i} className="guide-step"><span className="guide-step-n">{i+1}.</span> {p}</div>
      ))}</div>
    )},
  ];

  return (
    <div className="app">
      <header className="hdr">
        <div className="hdr-top">
          <span className="brand"><span className="brand-bar">|</span> YEAHH BODY</span>
          <button className="logout-btn" onClick={logout}>Çıkış</button>
        </div>
        {ProgramSelector && <ProgramSelector />}
        <div className="page-nav">
          <button className={`page-tab ${page === "program" ? "page-tab-active" : ""}`}
            onClick={() => setPage("program")}>🏋️ Program</button>
          <button className={`page-tab ${page === "dashboard" ? "page-tab-active" : ""}`}
            onClick={() => setPage("dashboard")}>📊 İlerleme</button>
          <button className={`page-tab ${page === "nutrition" ? "page-tab-active" : ""}`}
            onClick={() => setPage("nutrition")}>🍽 Beslenme</button>
        </div>
        {page === "program" && (
          <div className="tabs">
            {PROGRAM.days.map((dd, i) => (
              <button key={i} className={`tab ${day === i ? "tab-active" : ""}`}
                style={day === i ? { background: dd.color, borderColor: dd.color } : {}}
                onClick={() => selectDay(i)}>
                <div className="tab-t">{dd.title}</div>
                <div className="tab-s">{dd.sub}</div>
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="legacy-shell-note">
        <div>
          <div className="legacy-shell-kicker">Arşiv Program</div>
          <div className="legacy-shell-title">Klasik Split aktif, ama önerilen ana akış artık `🎯 Hibrit`.</div>
          <div className="legacy-shell-text">Bu ekran korunuyor; yeni geliştirmeler öncelikle hibrit sistemde devam ediyor.</div>
        </div>
        {onSwitchToHybrid && (
          <button className="legacy-shell-btn" onClick={onSwitchToHybrid}>🎯 Hibrit'e Dön</button>
        )}
      </div>

      {page === "dashboard" ? (
        <main className="main"><Dashboard /></main>
      ) : page === "nutrition" ? (
        <main className="main"><NutritionTracker /></main>
      ) : (
        <>
          <div className="day-hdr" style={{ borderColor: d.color + "44", background: d.color + "0D" }}>
            <div className="day-top">
              <div>
                <div className="day-focus" style={{ color: d.color }}>{d.focus}</div>
                <div className="day-meta">
                  {d.duration} · {total} egzersiz
                  {(() => { const { total: kcal } = calcDayCalories(d, getUserWeight()); return kcal > 0 ? <span className="day-kcal"> · ~{kcal} kcal</span> : null; })()}
                </div>
              </div>
              <div className="day-badge" style={{ background: d.color }}>{d.sub}</div>
            </div>
            <div className="injury">{d.injury}</div>
            {streak > 0 && <div className="streak-bar">🔥 {streak} günlük seri</div>}
          </div>

          <main className="main">
            <WorkoutTimer dayIndex={day} onWorkoutStart={handleWorkoutStart}
              onWorkoutFinish={() => { setWorkoutActive(false); setExpandedEx(null); setOpenBlocks({}); releaseWakeLock(); clearFlow(); }}
              finishRef={timerRef} onElapsed={setWorkoutElapsed} />
            <WeeklyStats />

            {guideCards.map(card => (
              <div key={card.id} className="guide-card">
                <button className="guide-head" onClick={() => setGuideOpen(g => g === card.id ? null : card.id)}>
                  <span className="guide-icon">{card.icon}</span>
                  <span className="guide-title">{card.title}</span>
                  <span className="guide-arr">{guideOpen === card.id ? "▲" : "▼"}</span>
                </button>
                {guideOpen === card.id && <div className="guide-body">{card.content}</div>}
              </div>
            ))}

            {d.blocks.map((block, bi) => (
              <BlockCard key={bi} block={block} blockIdx={bi}
                expandedEx={expandedEx}
                onExToggle={key => {
                  setExpandedEx(prev => prev === key ? null : key);
                  setGlobalAllDone(false);
                }}
                dayIndex={day}
                onStartRest={startRest}
                swaps={swaps}
                onSwap={handleSwap}
                forceOpen={!!openBlocks[bi]}
                workoutActive={workoutActive}
                isLastEx={bi === d.blocks.length - 1}
                onAllSetsDone={expandedEx?.startsWith(`${bi}-`) ? setGlobalAllDone : null} />
            ))}

            <div className="footer">Antrenmanın için buradayım. Konsantre kal 💪</div>
          </main>

          {restTimer && (
            <RestTimer key={restTimer.key} seconds={restTimer.seconds}
              exerciseName={restTimer.exerciseName}
              isTransition={restTimer.isTransition}
              onAdjust={adjustRest}
              onClose={() => setRestTimer(null)} />
          )}

          {workoutActive && (
            <div className="advance-bar">
              <div className="advance-progress">
                <div className="advance-progress-fill"
                  style={{ width: `${((currentExIndex + 1) / flatExercises.length) * 100}%` }} />
              </div>
              <div className="advance-status">
                <span className="advance-timer">
                  {String(Math.floor(workoutElapsed / 60)).padStart(2, "0")}:{String(workoutElapsed % 60).padStart(2, "0")}
                </span>
                <span className="advance-counter">{currentExIndex + 1} / {flatExercises.length}</span>
                <span className="advance-ex-name">{currentEx?.name || ""}</span>
              </div>
              <div className="advance-buttons">
                {currentExIndex > 0 && (
                  <button className="advance-back-btn" onClick={handleGoBack}>← Önceki</button>
                )}
                {canAdvance ? (
                  <button className={`advance-bar-btn ${isLastExGlobal ? "advance-bar-finish" : ""}`}
                    onClick={handleAdvance}>
                    {isLastExGlobal ? "✅ Bitir" : "Sonraki →"}
                  </button>
                ) : (
                  <div className="advance-bar-hint">Setleri tamamla ✓</div>
                )}
                {currentFlat && (() => {
                  const nextBlockIdx = currentFlat.blockIdx + 1;
                  const nextBlockFirst = flatExercises.find(f => f.blockIdx === nextBlockIdx);
                  if (!nextBlockFirst) return null;
                  const remaining = flatExercises.filter(f => f.blockIdx === currentFlat.blockIdx && flatExercises.indexOf(f) > currentExIndex).length;
                  if (remaining <= 0) return null;
                  return <button className="advance-skip-btn" onClick={() => openExercise(nextBlockFirst.key)}>Bloğu Atla ⏭</button>;
                })()}
              </div>
            </div>
          )}
        </>
      )}

      {showScrollTop && (
        <button className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Yukarı çık">↑</button>
      )}
    </div>
  );
}
