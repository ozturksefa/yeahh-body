import { useState, useEffect, useRef } from "react";
import { PROGRAM_HOME } from "./dataHome";
import { calcDayCalories, getUserWeight } from "./calorieCalc";
import { getDashboardStats } from "./tracker";
import { saveFlow, loadFlow, clearFlow } from "./flowStore";
import Dashboard from "./Dashboard";
import NutritionTracker from "./Nutrition";
import RestTimer from "./RestTimer";
import WorkoutTimer from "./WorkoutTimer";
import BlockCard from "./BlockCard";
import { parseSets } from "./SetTracker";

const SWAPS_KEY = "yb_swaps_home";
const FLOW_KEY  = "session_home";
const TRACK_BLOCKS = ["KUVVET","SKİLL","MAX TEST","KALİSTENİK","CORE","CARRY","SAKATILIK"];

function OffDayView({ day }) {
  return (
    <div style={{ padding: "12px 12px 0" }}>
      <div className="day-hdr" style={{ borderColor: "#6C757D44", background: "#6C757D0D" }}>
        <div className="day-top">
          <div>
            <div className="day-focus" style={{ color: "#6C757D" }}>{day.focus}</div>
            <div className="day-meta">{day.duration}</div>
          </div>
          <div className="day-badge" style={{ background: "#6C757D" }}>{day.sub}</div>
        </div>
      </div>
      {day.blocks.map((block, bi) => (
        <BlockCard key={bi} block={block} blockIdx={bi} expandedEx={null}
          onExToggle={()=>{}} dayIndex={day.id + 29}
          onStartRest={()=>{}} swaps={{}} onSwap={()=>{}}
          forceOpen={false} workoutActive={false} isLastEx={false}
          onAllSetsDone={()=>{}} />
      ))}
    </div>
  );
}

export default function HomeView({ user, logout, ProgramSelector }) {
  const trainingDays = PROGRAM_HOME.days.filter(d => d.type === "training");
  const offDays = PROGRAM_HOME.days.filter(d => d.type === "offday");
  const allDays = [...trainingDays, ...offDays];

  const [pageH, setPageH] = useState("program");
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedEx, setExpandedEx] = useState(null);
  const [openBlocks, setOpenBlocks] = useState({});
  const [workoutActive, setWorkoutActive] = useState(false);
  const [workoutElapsed, setWorkoutElapsed] = useState(0);
  const [globalAllDone, setGlobalAllDone] = useState(false);
  const [restTimer, setRestTimer] = useState(null);
  const [swaps, setSwaps] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SWAPS_KEY) || "{}"); } catch { return {}; }
  });
  const [streak, setStreak] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const timerRef = useRef(null);
  const wakeLockRef = useRef(null);
  const flowRestoredRef = useRef(false);
  const prevDayRef = useRef(selectedDay);

  const day = allDays[selectedDay];
  const isOff = day.type === "offday";
  const trainingDayIndex = isOff ? -1 : day.id + 29; // offset 30 — çakışma yok

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (user) getDashboardStats().then(s => setStreak(s.streak || 0)).catch(() => {});
  }, [user]);

  useEffect(() => {
    if (!user || flowRestoredRef.current) return;
    flowRestoredRef.current = true;
    loadFlow(FLOW_KEY).then(saved => {
      if (!saved) return;
      prevDayRef.current = saved.day;
      setSelectedDay(saved.day);
      setWorkoutActive(true);
      setExpandedEx(saved.expandedEx);
      const bi = parseInt(saved.expandedEx?.split("-")[0] || "0");
      setOpenBlocks({ [bi]: true });
    });
  }, [user]);

  useEffect(() => {
    if (!flowRestoredRef.current) return;
    if (workoutActive && expandedEx) saveFlow({ day: selectedDay, expandedEx, workoutActive: true }, FLOW_KEY);
    else if (!workoutActive) clearFlow(FLOW_KEY);
  }, [workoutActive, expandedEx, selectedDay]);

  useEffect(() => {
    if (prevDayRef.current !== selectedDay) {
      prevDayRef.current = selectedDay;
      setExpandedEx(null); setWorkoutActive(false); setOpenBlocks({}); setGlobalAllDone(false);
      clearFlow(FLOW_KEY);
    }
  }, [selectedDay]);

  const handleSwap = (orig, alt) => {
    setSwaps(prev => {
      const next = { ...prev };
      if (alt === null) delete next[orig]; else next[orig] = alt;
      try { localStorage.setItem(SWAPS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const flatExercises = [];
  if (!isOff) {
    day.blocks.forEach((block, bi) => {
      block.exercises.forEach((ex, ei) => {
        flatExercises.push({ key: `${bi}-${ei}`, blockIdx: bi, exIdx: ei });
      });
    });
  }

  const currentFlat = flatExercises.find(f => f.key === expandedEx);
  const currentBlock = currentFlat ? day.blocks[currentFlat.blockIdx] : null;
  const currentEx = currentBlock ? currentBlock.exercises[currentFlat.exIdx] : null;
  const currentBlockName = currentBlock?.name || "";
  const currentHasTracker = currentEx &&
    TRACK_BLOCKS.some(b => currentBlockName.toUpperCase().includes(b)) &&
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
    }
  };

  const handleAdvance = () => {
    if (currentExIndex < 0) return;
    const nextIdx = currentExIndex + 1;
    if (nextIdx >= flatExercises.length) {
      setExpandedEx(null); setWorkoutActive(false); setOpenBlocks({});
      if (timerRef.current) timerRef.current();
      wakeLockRef.current?.release(); wakeLockRef.current = null;
      clearFlow(FLOW_KEY); return;
    }
    openExercise(flatExercises[nextIdx].key);
  };

  const startRest = (seconds, exerciseName, isTransition) => {
    setRestTimer({ seconds, exerciseName, isTransition: !!isTransition, key: Date.now() });
  };
  const adjustRest = (delta) => {
    setRestTimer(prev => prev ? { ...prev, seconds: Math.max(5, prev.seconds + delta), key: Date.now() } : null);
  };

  useEffect(() => {
    if (workoutActive) {
      navigator.wakeLock?.request("screen").then(lock => { wakeLockRef.current = lock; }).catch(()=>{});
    } else { wakeLockRef.current?.release(); wakeLockRef.current = null; }
  }, [workoutActive]);

  return (
    <div className="app">
      <header className="hdr">
        <div className="hdr-top">
          <span className="brand"><span className="brand-bar">|</span> YEAHH BODY</span>
          {logout && <button className="logout-btn" onClick={logout}>Çıkış</button>}
        </div>
        {/* Ev programı rozeti */}
        <div style={{ padding:"4px 14px", background:"#131316", borderBottom:"1px solid #2A2A30" }}>
          <span style={{ fontSize:11, color:"#FFA726", fontWeight:700 }}>
            🏠 EV PROGRAMI — Ekipmansız 1 Ay
          </span>
          <span style={{ fontSize:10, color:"#7A7A84", marginLeft:8 }}>
            Masa + Sandalye + Zemin + Duvar
          </span>
        </div>
        {ProgramSelector && <ProgramSelector />}
        <div className="page-nav" style={{ marginBottom: 0 }}>
          <button className={`page-tab ${pageH === "program" ? "page-tab-active" : ""}`} onClick={() => setPageH("program")}>🏠 Program</button>
          <button className={`page-tab ${pageH === "dashboard" ? "page-tab-active" : ""}`} onClick={() => setPageH("dashboard")}>📊 İlerleme</button>
          <button className={`page-tab ${pageH === "nutrition" ? "page-tab-active" : ""}`} onClick={() => setPageH("nutrition")}>🍽 Beslenme</button>
        </div>
        {pageH === "program" && (
          <div className="tabs" style={{ flexWrap: "wrap", gap: 4 }}>
            {trainingDays.map((d, i) => (
              <button key={i} className={`tab ${selectedDay === i ? "tab-active" : ""}`}
                style={selectedDay === i ? { background: d.color, borderColor: d.color } : {}}
                onClick={() => { setSelectedDay(i); setExpandedEx(null); }}>
                <div className="tab-t">{d.title}</div>
                <div className="tab-s">{d.sub}</div>
              </button>
            ))}
            {offDays.map((d, i) => (
              <button key={"off"+i}
                className={`tab ${selectedDay === trainingDays.length + i ? "tab-active" : ""}`}
                style={selectedDay === trainingDays.length + i ? { background: "#6C757D", borderColor: "#6C757D" } : {}}
                onClick={() => { setSelectedDay(trainingDays.length + i); setExpandedEx(null); }}>
                <div className="tab-t">{d.title}</div>
                <div className="tab-s">{d.sub}</div>
              </button>
            ))}
          </div>
        )}
      </header>

      {pageH === "dashboard" ? (
        <main className="main"><Dashboard /></main>
      ) : pageH === "nutrition" ? (
        <main className="main"><NutritionTracker /></main>
      ) : isOff ? (
        <OffDayView day={day} />
      ) : (
        <>
          <div className="day-hdr" style={{ borderColor: day.color + "44", background: day.color + "0D" }}>
            <div className="day-top">
              <div>
                <div className="day-focus" style={{ color: day.color }}>{day.focus}</div>
                <div className="day-meta">
                  {day.duration} · {day.blocks.reduce((a,b)=>a+b.exercises.length,0)} egzersiz
                  {(() => { const {total} = calcDayCalories(day, getUserWeight()); return total>0 ? <span className="day-kcal"> · ~{total} kcal</span> : null; })()}
                  {streak > 0 && <span style={{ marginLeft:8 }}>🔥{streak}</span>}
                </div>
              </div>
              <div className="day-badge" style={{ background: day.color }}>{day.sub}</div>
            </div>
            {day.injury && <div className="injury">{day.injury}</div>}
          </div>

          <main className="main">
            <WorkoutTimer dayIndex={trainingDayIndex} onWorkoutStart={handleWorkoutStart}
              onWorkoutFinish={() => { setWorkoutActive(false); setExpandedEx(null); setOpenBlocks({}); clearFlow(FLOW_KEY); }}
              finishRef={timerRef} onElapsed={setWorkoutElapsed} />

            {day.blocks.map((block, bi) => (
              <BlockCard key={bi} block={block} blockIdx={bi}
                expandedEx={expandedEx}
                onExToggle={key => { setExpandedEx(p=>p===key?null:key); setGlobalAllDone(false); }}
                dayIndex={trainingDayIndex}
                onStartRest={startRest}
                swaps={swaps} onSwap={handleSwap}
                forceOpen={!!openBlocks[bi]}
                workoutActive={workoutActive}
                isLastEx={bi===day.blocks.length-1}
                onAllSetsDone={expandedEx?.startsWith(`${bi}-`) ? setGlobalAllDone : null} />
            ))}

            <div className="footer">Evde de aynı disiplin 💪</div>
          </main>

          {restTimer && (
            <RestTimer key={restTimer.key} seconds={restTimer.seconds}
              exerciseName={restTimer.exerciseName} isTransition={restTimer.isTransition}
              onAdjust={adjustRest} onClose={() => setRestTimer(null)} />
          )}

          {workoutActive && (
            <div className="advance-bar">
              <div className="advance-progress">
                <div className="advance-progress-fill"
                  style={{ width: `${((currentExIndex+1)/flatExercises.length)*100}%` }} />
              </div>
              <div className="advance-status">
                <span className="advance-timer">
                  {String(Math.floor(workoutElapsed/60)).padStart(2,"0")}:{String(workoutElapsed%60).padStart(2,"0")}
                </span>
                <span className="advance-counter">{currentExIndex+1} / {flatExercises.length}</span>
                <span className="advance-ex-name">{currentEx?.name || ""}</span>
              </div>
              <div className="advance-buttons">
                {currentExIndex > 0 && <button className="advance-back-btn" onClick={()=>openExercise(flatExercises[currentExIndex-1].key)}>← Önceki</button>}
                {canAdvance ? (
                  <button className={`advance-bar-btn ${isLastExGlobal?"advance-bar-finish":""}`} onClick={handleAdvance}>
                    {isLastExGlobal ? "✅ Bitir" : "Sonraki →"}
                  </button>
                ) : <div className="advance-bar-hint">Setleri tamamla ✓</div>}
              </div>
            </div>
          )}
        </>
      )}

      {showScrollTop && (
        <button className="scroll-top-btn" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>↑</button>
      )}
    </div>
  );
}
