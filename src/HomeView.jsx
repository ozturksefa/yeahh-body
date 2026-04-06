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


// ─── Ev Skill Tracker ─────────────────────────────────────────
const HOME_SKILL_KEY = "yb_skill_home";

function loadHomeSkillLevels() {
  try { return JSON.parse(localStorage.getItem(HOME_SKILL_KEY) || "{}"); } catch { return {}; }
}
function saveHomeSkillLevels(levels) {
  try { localStorage.setItem(HOME_SKILL_KEY, JSON.stringify(levels)); } catch {}
}

function HomeSkillTracker() {
  const [levels, setLevels] = useState(loadHomeSkillLevels);
  const [open, setOpen] = useState(null);
  const paths = PROGRAM_HOME.skillPaths;
  const phase2 = PROGRAM_HOME.phase2;

  const setLevel = (pathKey, level) => {
    setLevels(prev => {
      const next = { ...prev, [pathKey]: level };
      saveHomeSkillLevels(next);
      return next;
    });
  };

  return (
    <div style={{ padding:"0 12px", marginBottom:12 }}>
      <div style={{ fontSize:13, fontWeight:800, marginBottom:8, color:"#fff" }}>
        🎯 Skill Progression
      </div>

      {/* Kapı barı uyarısı */}
      <div style={{
        background:"rgba(255,167,38,.08)", border:"1px solid rgba(255,167,38,.3)",
        borderRadius:8, padding:"10px 12px", marginBottom:10,
      }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#FFA726", marginBottom:4 }}>
          💡 En Değerli Yatırım
        </div>
        <div style={{ fontSize:11, color:"#C4C4CC", lineHeight:1.5 }}>
          {PROGRAM_HOME.equipment.önerilen[0]}
        </div>
      </div>

      {Object.entries(paths).map(([key, path]) => {
        const currentLevel = levels[key] || 1;
        const step = path.steps.find(s => s.level === currentLevel);
        const isBarNeeded = key === "pull" && currentLevel >= 4;

        return (
          <div key={key} style={{
            background:"#131316", border:"1px solid #2A2A30",
            borderRadius:8, marginBottom:8, overflow:"hidden",
          }}>
            <button onClick={() => setOpen(open===key?null:key)} style={{
              width:"100%", background:"transparent", border:"none",
              padding:"10px 12px", display:"flex", alignItems:"center",
              gap:8, cursor:"pointer", textAlign:"left",
            }}>
              <span style={{ fontSize:18 }}>{path.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{path.name}</div>
                <div style={{ fontSize:11, color: isBarNeeded ? "#FFA726" : "#7A7A84", marginTop:2 }}>
                  {isBarNeeded ? "⚠️ Kapı barı gerekli" : `Seviye ${currentLevel}/${path.steps.length} — ${step?.name || ""}`}
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ width:60, height:4, background:"#222226", borderRadius:2, overflow:"hidden" }}>
                <div style={{
                  height:"100%", background:"#2A9D8F",
                  width:`${(currentLevel/path.steps.length)*100}%`,
                  transition:"width .3s",
                }}/>
              </div>
              <span style={{ color:"#7A7A84", fontSize:14 }}>{open===key?"▲":"▼"}</span>
            </button>

            {open === key && (
              <div style={{ padding:"0 12px 12px" }}>
                {/* Steps */}
                <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:10 }}>
                  {path.steps.map(s => (
                    <button key={s.level} onClick={() => setLevel(key, s.level)} style={{
                      display:"flex", alignItems:"center", gap:8, padding:"8px 10px",
                      borderRadius:6, border:"none", cursor:"pointer", textAlign:"left",
                      background: s.level === currentLevel ? "#2A9D8F22"
                        : s.level < currentLevel ? "#00C85311" : "#1A1A1E",
                      borderLeft: `3px solid ${
                        s.level === currentLevel ? "#2A9D8F"
                        : s.level < currentLevel ? "#00C853" : "#2A2A30"}`,
                    }}>
                      <span style={{ fontSize:12, fontWeight:700, minWidth:20,
                        color: s.level < currentLevel ? "#00C853"
                          : s.level === currentLevel ? "#2A9D8F" : "#7A7A84" }}>
                        {s.level < currentLevel ? "✓" : s.level}
                      </span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:600,
                          color: s.level <= currentLevel ? "#fff" : "#7A7A84" }}>
                          {s.name}
                        </div>
                        <div style={{ fontSize:10, color:"#7A7A84" }}>{s.target}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Şu an görev */}
                {step && (
                  <div style={{
                    background:"#2A9D8F11", border:"1px solid #2A9D8F33",
                    borderRadius:6, padding:"8px 10px",
                  }}>
                    <div style={{ fontSize:10, color:"#2A9D8F", fontWeight:700, marginBottom:3 }}>
                      Şu an odak:
                    </div>
                    <div style={{ fontSize:12, color:"#C4C4CC" }}>{step.detail}</div>
                  </div>
                )}

                {/* Faz 2 mesajı */}
                {currentLevel >= path.steps.length && phase2.milestones[key] && (
                  <div style={{
                    background:"rgba(255,167,38,.08)", border:"1px solid rgba(255,167,38,.3)",
                    borderRadius:6, padding:"8px 10px", marginTop:8,
                  }}>
                    <div style={{ fontSize:10, color:"#FFA726", fontWeight:700, marginBottom:3 }}>
                      🏆 Faz 2:
                    </div>
                    <div style={{ fontSize:11, color:"#C4C4CC" }}>{phase2.milestones[key]}</div>
                  </div>
                )}

                <div style={{ display:"flex", gap:6, marginTop:8 }}>
                  <button onClick={() => setLevel(key, Math.max(1, currentLevel-1))}
                    disabled={currentLevel<=1} style={{
                    flex:1, padding:"8px", borderRadius:6,
                    border:"1px solid #2A2A30", background:"#1A1A1E",
                    color:"#C4C4CC", cursor:"pointer", fontSize:16,
                    opacity: currentLevel<=1 ? .3 : 1,
                  }}>‹</button>
                  <button onClick={() => setLevel(key, Math.min(path.steps.length, currentLevel+1))}
                    disabled={currentLevel>=path.steps.length} style={{
                    flex:1, padding:"8px", borderRadius:6,
                    border:"1px solid #2A9D8F", background:"#2A9D8F22",
                    color:"#2A9D8F", cursor:"pointer", fontSize:16,
                    opacity: currentLevel>=path.steps.length ? .3 : 1,
                  }}>›</button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Periodizasyon */}
      <div style={{ marginTop:12, background:"#131316", border:"1px solid #2A2A30", borderRadius:8, padding:"10px 12px" }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#7A7A84", marginBottom:8, letterSpacing:".06em" }}>
          8 HAFTALIK YOL HARİTASI
        </div>
        <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
          {PROGRAM_HOME.periodization.map((w,i) => (
            <div key={i} style={{
              flex:"1 0 calc(25% - 4px)", minWidth:60,
              background:"#1A1A1E", borderRadius:6, padding:"6px 8px",
              border:"1px solid #2A2A30",
            }}>
              <div style={{ fontSize:10, color:"#7A7A84" }}>H{w.week}</div>
              <div style={{ fontSize:11, fontWeight:700, color:"#C4C4CC" }}>{w.label}</div>
              <div style={{ fontSize:9, color:"#7A7A84", marginTop:2, lineHeight:1.3 }}>{w.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SWAPS_KEY = "yb_swaps_home";
const FLOW_KEY  = "session_home";
const TRACK_BLOCKS = ["KUVVET","SKİLL","MAX TEST","KALİSTENİK","CORE","CARRY","SAKATILIK"];

// ─── Off Day View ────────────────────────────────────────────────
function OffDayView({ day }) {
  const [expandedEx, setExpandedEx] = useState(null);
  return (
    <>
      <div className="day-hdr" style={{ borderColor: "#6C757D44", background: "#6C757D0D" }}>
        <div className="day-top">
          <div>
            <div className="day-focus" style={{ color: "#6C757D" }}>{day.focus}</div>
            <div className="day-meta">{day.duration} · Aktif dinlenme</div>
          </div>
          <div className="day-badge" style={{ background: "#6C757D" }}>{day.sub}</div>
        </div>
        {day.injury && <div className="injury">{day.injury}</div>}
      </div>
      <main className="main">
        {day.blocks.map((block, bi) => (
          <BlockCard
            key={bi}
            block={block}
            blockIdx={bi}
            expandedEx={expandedEx}
            onExToggle={k => setExpandedEx(p => p === k ? null : k)}
            dayIndex={-1}
            onStartRest={() => {}}
            swaps={{}}
            onSwap={() => {}}
            forceOpen={true}
            workoutActive={false}
            isLastEx={false}
            onAllSetsDone={() => {}}
          />
        ))}
        <div className="footer">Dinlenme günü — hafif tut 🌿</div>
      </main>
    </>
  );
}

export default function HomeView({ user, logout, ProgramSelector }) {
  const DAY_ORDER = {'PAZARTESİ':1,'SALI':2,'ÇARŞAMBA':3,'PERŞEMBE':4,'CUMA':5,'CUMARTESİ':6,'PAZAR':7};
  const allDays = [...PROGRAM_HOME.days].sort((a,b) => (DAY_ORDER[a.sub]||9) - (DAY_ORDER[b.sub]||9));
  const trainingDays = allDays.filter(d => d.type === "training");
  const offDays = allDays.filter(d => d.type === "offday");

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
          <button className={`page-tab ${pageH === "skills" ? "page-tab-active" : ""}`} onClick={() => setPageH("skills")}>🎯 Skill</button>
        </div>
        {pageH === "program" && (
          <div className="tabs" style={{ flexWrap: "wrap", gap: 4 }}>
            {allDays.map((d, i) => (
              <button key={i} className={`tab ${selectedDay === i ? "tab-active" : ""}`}
                style={selectedDay === i ? { background: d.type==="offday"?"#6C757D":d.color, borderColor: d.type==="offday"?"#6C757D":d.color } : {}}
                onClick={() => { setSelectedDay(i); setExpandedEx(null); }}>
                <div className="tab-t">{d.type==="offday"?"🛌":d.title}</div>
                <div className="tab-s">{d.sub.substring(0,3)}</div>
              </button>
            ))}
          </div>
        )}
      </header>

      {pageH === "dashboard" ? (
        <main className="main"><Dashboard /></main>
      ) : pageH === "nutrition" ? (
        <main className="main"><NutritionTracker /></main>
      ) : pageH === "skills" ? (
        <main className="main"><HomeSkillTracker /></main>
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
