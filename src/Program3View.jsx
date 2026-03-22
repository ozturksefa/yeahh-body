import React, { useState, useEffect, useRef } from "react";
import { PROGRAM3 } from "./data3";
import BlockCard from "./BlockCard";
import WorkoutTimer from "./WorkoutTimer";
import RestTimer from "./RestTimer";
import { WeeklyStats } from "./Dashboard";
import NutritionTracker from "./Nutrition";
import { saveFlow, loadFlow, clearFlow } from "./flowStore";
import { getDashboardStats } from "./tracker";
import { parseSets } from "./SetTracker";


const FLOW_KEY = "session3";
const SWAPS_KEY = "yb_swaps3";
const TRACK_BLOCKS = ["KUVVET", "CALİSTHENİCS", "CORE", "FİNİSHER", "PRIMARY", "SECONDARY", "KALİSTENİK", "SKILL", "KOMPLİMENTER", "FULL BODY"];

// ─── Off Day View ────────────────────────────────────────────────
function OffDayView({ day }) {
  const [expandedEx, setExpandedEx] = useState(null);
  return (
    <>
      <div className="day-hdr" style={{ borderColor: "#6C757D44", background: "#6C757D0D" }}>
        <div className="day-top">
          <div>
            <div className="day-focus" style={{ color: "#6C757D" }}>{day.focus}</div>
            <div className="day-meta">{day.duration} · 🏠 Ekipman gerektirmez</div>
          </div>
          <div className="day-badge" style={{ background: "#6C757D" }}>{day.sub}</div>
        </div>
      </div>
      <main className="main">
        {day.blocks.map((block, bi) => (
          <BlockCard key={bi} block={block} blockIdx={bi}
            expandedEx={expandedEx}
            onExToggle={k => setExpandedEx(p => p === k ? null : k)}
            dayIndex={-1}
            onStartRest={() => {}}
            swaps={{}}
            onSwap={() => {}}
            forceOpen={false}
            workoutActive={false}
            isLastEx={false}
            onAllSetsDone={() => {}} />
        ))}
        <div className="footer">Off day — hafif tut, dinlenmeye izin ver 🌿</div>
      </main>
    </>
  );
}



function SkillTracker3() {
  const LS_KEY = 'yb_skill_levels_3';
  const [levels, setLevels] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch { return {}; }
  });
  const setLevel = (skill, level) => {
    const next = { ...levels, [skill]: level };
    setLevels(next);
    try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
  };
  const paths = PROGRAM3.skillPaths || {};
  return (
    <div className="skill-tracker">
      <div className="skill-tracker-title">🎯 Kalistenik Skill İlerleme</div>
      {Object.entries(paths).map(([key, path]) => {
        const current = levels[key] || 1;
        const step = path.steps?.find(s => s.level === current);
        const nextStep = path.steps?.find(s => s.level === current + 1);
        return (
          <div key={key} className="skill-card">
            <div className="skill-card-header">
              <span className="skill-name">{path.icon || '🤸'} {path.name}</span>
              <span className="skill-level">Seviye {current}/{path.steps?.length}</span>
            </div>
            <div className="skill-progress-bar">
              {path.steps?.map(s => (
                <div key={s.level}
                  className={'skill-step' + (s.level <= current ? ' skill-step-done' : '') + (s.level === current ? ' skill-step-current' : '')}
                  onClick={() => setLevel(key, s.level)} />
              ))}
            </div>
            <div className="skill-current">
              <span className="skill-current-label">Şu an:</span>
              <span className="skill-current-name">{step?.name}</span>
              <span className="skill-current-target">{step?.target}</span>
            </div>
            {step?.detail && <div className="skill-detail" style={{fontSize:11,color:'#888',marginTop:4}}>{step.detail}</div>}
            {nextStep && (
              <div className="skill-next">
                <span className="skill-next-label">Sonraki:</span>
                <span className="skill-next-name">{nextStep.name} — {nextStep.target}</span>
              </div>
            )}
            <div className="skill-level-btns">
              <button onClick={() => setLevel(key, Math.max(1, current - 1))} disabled={current <= 1}>‹</button>
              <span>Seviye güncelle</span>
              <button onClick={() => setLevel(key, Math.min(path.steps?.length || 1, current + 1))} disabled={current >= (path.steps?.length || 1)}>›</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Prog3Stats() {
  const prs = (() => { try { return JSON.parse(localStorage.getItem('yb_skill_prs') || '{}'); } catch { return {}; } })();
  const fmt = (s) => String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0');
  const [stats, setStats] = React.useState(null);
  React.useEffect(() => {
    import('./tracker').then(m => m.getDashboardStats()).then(s => setStats(s)).catch(()=>{});
  }, []);
  const prEntries = Object.entries(prs).sort((a,b)=>b[1]-a[1]);
  return (
    <div className="p2-stats">
      <div className="p2-stats-title">📊 Atletik Dayanıklılık — İlerleme</div>
      {stats && (
        <div className="dash-cards" style={{marginBottom:16}}>
          <div className="dash-card"><div className="dash-card-val">{stats.workoutCount}</div><div className="dash-card-label">Antrenman</div></div>
          <div className="dash-card"><div className="dash-card-val">{stats.streak}</div><div className="dash-card-label">Seri 🔥</div></div>
          <div className="dash-card"><div className="dash-card-val">{stats.totalVolume > 999 ? (stats.totalVolume/1000).toFixed(1)+"k" : stats.totalVolume}</div><div className="dash-card-label">Hacim</div></div>
        </div>
      )}
      {prEntries.length > 0 && (
        <div className="p2-skill-prs">
          <div className="p2-section-title">🏆 Dayanıklılık Rekorları</div>
          {prEntries.map(([key,sec]) => (
            <div key={key} className="p2-pr-row">
              <span className="p2-pr-name">{key.replace(/-/g,' ').replace(/\w/g,l=>l.toUpperCase())}</span>
              <span className="p2-pr-time">{fmt(sec)}</span>
            </div>
          ))}
        </div>
      )}
      <div className="p2-motivation">
        <div className="p2-section-title">🎯 Faz 1 Hedefleri</div>
        <div className="p2-targets">
          <div className="p2-target-item"><span>Pull-up</span><span>10 temiz tekrar</span></div>
          <div className="p2-target-item"><span>Push-up</span><span>30 temiz tekrar</span></div>
          <div className="p2-target-item"><span>Dip</span><span>10 tekrar</span></div>
          <div className="p2-target-item"><span>Handstand Hold</span><span>30sn</span></div>
          <div className="p2-target-item"><span>L-sit</span><span>10sn full</span></div>
          <div className="p2-target-item"><span>Muscle-up</span><span>3 temiz tekrar</span></div>
        </div>
      </div>
    </div>
  );
}

export default function Program3View({ user }) {
  const trainingDays = PROGRAM3.days.filter(d => d.type === "training");
  const offDays = PROGRAM3.days.filter(d => d.type === "offday");
  const allDays = [...trainingDays, ...offDays];

  const [page2, setPage2] = useState("program");
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
  const [showSkill, setShowSkill] = useState(false);

  const timerRef = useRef(null);
  const wakeLockRef = useRef(null);
  const flowRestoredRef = useRef(false);
  const prevDayRef = useRef(selectedDay);

  const day = allDays[selectedDay];
  const isOff = day.type === "offday";
  const trainingDayIndex = isOff ? -1 : trainingDays.indexOf(day);

  // Streak yükle
  useEffect(() => {
    if (user) getDashboardStats().then(s => setStreak(s.streak || 0)).catch(() => {});
  }, [user]);

  // Session restore
  useEffect(() => {
    if (!user || flowRestoredRef.current) return;
    flowRestoredRef.current = true;
    loadFlow(FLOW_KEY).then(saved => {
      if (!saved) return;
      prevDayRef.current = saved.day;
      setSelectedDay(saved.day);
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
          const top = card.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: top - hdrH - 8, behavior: "smooth" });
        };
        tryScroll(8);
      }, 300);
    });
  }, [user]);

  // Persist flow
  useEffect(() => {
    if (!flowRestoredRef.current) return;
    if (workoutActive && expandedEx) {
      saveFlow({ day: selectedDay, expandedEx, workoutActive: true }, FLOW_KEY);
    } else if (!workoutActive) {
      clearFlow(FLOW_KEY);
    }
  }, [workoutActive, expandedEx, selectedDay]);

  // Day change — reset
  useEffect(() => {
    if (prevDayRef.current !== selectedDay) {
      prevDayRef.current = selectedDay;
      setExpandedEx(null);
      setWorkoutActive(false);
      setOpenBlocks({});
      setGlobalAllDone(false);
      clearFlow(FLOW_KEY);
    }
  }, [selectedDay]);

  // Wake lock
  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) wakeLockRef.current = await navigator.wakeLock.request("screen");
    } catch {}
  };
  const releaseWakeLock = () => {
    if (wakeLockRef.current) { wakeLockRef.current.release(); wakeLockRef.current = null; }
  };
  useEffect(() => {
    if (workoutActive) {
      requestWakeLock();
      const onVis = () => { if (document.visibilityState === "visible" && workoutActive) requestWakeLock(); };
      document.addEventListener("visibilitychange", onVis);
      return () => { document.removeEventListener("visibilitychange", onVis); releaseWakeLock(); };
    } else {
      releaseWakeLock();
    }
  }, [workoutActive]);

  // Swap
  const handleSwap = (originalName, altName) => {
    setSwaps(prev => {
      const next = { ...prev };
      if (altName === null) delete next[originalName];
      else next[originalName] = altName;
      try { localStorage.setItem(SWAPS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  // Flat egzersiz listesi (sadece training günleri için)
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
  const currentExIndex = flatExercises.findIndex(f => f.key === expandedEx);
  const isLastExGlobal = currentFlat && currentExIndex === flatExercises.length - 1;
  const canAdvance = workoutActive && expandedEx && (!currentHasTracker || globalAllDone);

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
    if (flatExercises.length === 0) return;
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
  };

  const handleWorkoutFinish = () => {
    setWorkoutActive(false);
    setExpandedEx(null);
    setOpenBlocks({});
    releaseWakeLock();
    clearFlow(FLOW_KEY);
  };

  const handleAdvance = () => {
    if (currentExIndex < 0) return;
    const nextIdx = currentExIndex + 1;
    if (nextIdx >= flatExercises.length) {
      setExpandedEx(null);
      setWorkoutActive(false);
      setOpenBlocks({});
      if (timerRef.current) timerRef.current();
      releaseWakeLock();
      clearFlow(FLOW_KEY);
      return;
    }
    openExercise(flatExercises[nextIdx].key);
  };

  const handleGoBack = () => {
    if (currentExIndex <= 0) return;
    openExercise(flatExercises[currentExIndex - 1].key);
  };

  const startRest = (seconds, exerciseName, isTransition) => {
    setRestTimer({ seconds, exerciseName, isTransition: !!isTransition, key: Date.now() });
  };
  const adjustRest = (delta) => {
    setRestTimer(prev => prev ? { ...prev, seconds: Math.max(5, prev.seconds + delta), key: Date.now() } : null);
  };

  // dayIndex: offset +10 — klasik programla çakışmasın
  const workoutDayIndex = isOff ? -1 : day.id + 19;

  return (
    <div>
      {/* Sayfa nav */}
      <div style={{ padding: "0 12px" }}>
        <div className="page-nav" style={{ marginBottom: 4 }}>
          <button className={`page-tab ${page2 === "program" ? "page-tab-active" : ""}`} onClick={() => setPage2("program")}>🏋️ Program</button>
          <button className={`page-tab ${page2 === "stats" ? "page-tab-active" : ""}`} onClick={() => setPage2("stats")}>📊 İlerleme</button>
          <button className={`page-tab ${page2 === "nutrition" ? "page-tab-active" : ""}`} onClick={() => setPage2("nutrition")}>🍽 Beslenme</button>
        </div>
      </div>

      {page2 === "stats" ? (
        <main className="main"><Prog3Stats /></main>
      ) : page2 === "nutrition" ? (
        <main className="main"><NutritionTracker /></main>
      ) : (
        <>
          {/* Gün sekmeleri */}
          <div className="tabs" style={{ flexWrap: "wrap", gap: 4 }}>
            {trainingDays.map((d, i) => (
              <button key={i}
                className={`tab ${selectedDay === i ? "tab-active" : ""}`}
                style={selectedDay === i ? { background: d.color, borderColor: d.color } : {}}
                onClick={() => { setSelectedDay(i); setExpandedEx(null); }}>
                <div className="tab-t">{d.title}</div>
                <div className="tab-s">{d.sub}</div>
              </button>
            ))}
            {offDays.map((d, i) => (
              <button key={"off" + i}
                className={`tab ${selectedDay === trainingDays.length + i ? "tab-active" : ""}`}
                style={selectedDay === trainingDays.length + i ? { background: "#6C757D", borderColor: "#6C757D" } : {}}
                onClick={() => { setSelectedDay(trainingDays.length + i); setExpandedEx(null); }}>
                <div className="tab-t">{d.title}</div>
                <div className="tab-s">{d.sub}</div>
              </button>
            ))}
          </div>

          {/* Off day */}
          {isOff ? (
            <OffDayView day={day} />
          ) : (
            <>
              <div className="day-hdr" style={{ borderColor: day.color + "44", background: day.color + "0D" }}>
                <div className="day-top">
                  <div>
                    <div className="day-focus" style={{ color: day.color }}>{day.focus}</div>
                    <div className="day-meta">
                      {day.duration} · {day.blocks.reduce((a, b) => a + b.exercises.length, 0)} egzersiz
                      {streak > 0 && <span style={{ marginLeft: 8 }}>🔥 {streak} seri</span>}
                    </div>
                  </div>
                  <div className="day-badge" style={{ background: day.color }}>{day.sub}</div>
                </div>
                {day.injury && <div className="injury">{day.injury}</div>}
              </div>

              <main className="main">
                <WorkoutTimer
                  dayIndex={workoutDayIndex}
                  onWorkoutStart={handleWorkoutStart}
                  onWorkoutFinish={handleWorkoutFinish}
                  finishRef={timerRef}
                  onElapsed={setWorkoutElapsed}
                />
                <WeeklyStats />

                {day.blocks.map((block, bi) => (
                  <BlockCard key={bi} block={block} blockIdx={bi}
                    expandedEx={expandedEx}
                    onExToggle={k => setExpandedEx(p => p === k ? null : k)}
                    dayIndex={workoutDayIndex}
                    onStartRest={startRest}
                    swaps={swaps}
                    onSwap={handleSwap}
                    forceOpen={!!openBlocks[bi]}
                    onAdvance={workoutActive ? handleAdvance : null}
                    workoutActive={workoutActive}
                    isLastEx={bi === day.blocks.length - 1}
                    onAllSetsDone={setGlobalAllDone} />
                ))}

                <div className="pain-card">
                  <div className="pain-title">⚠️ AĞRI PROTOKOLÜ</div>
                  {[
                    { e: "🟢", t: "Yanma / Kasılma → Normal. Devam et." },
                    { e: "🟡", t: "Sızı / Gerginlik → Dur, formu kontrol et." },
                    { e: "🔴", t: "Keskin / Bıçak gibi ağrı → Anında bırak." },
                  ].map((x, i) => (
                    <div key={i} className="pain-row"><span>{x.e}</span><span>{x.t}</span></div>
                  ))}
                </div>
                <div className="footer">Full Activation Faz 1 · Hafta 1-8 · Her günde tüm vücut aktif</div>
              </main>

              {/* Rest Timer */}
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

              {/* Progress Bar + Advance */}
              {workoutActive && expandedEx && !restTimer && (
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
                      <button className={`advance-bar-btn ${isLastExGlobal ? "advance-bar-finish" : ""}`} onClick={handleAdvance}>
                        {isLastExGlobal ? "✅ Bitir" : "Sonraki →"}
                      </button>
                    ) : (
                      <div className="advance-bar-hint">Setleri tamamla ✓</div>
                    )}
                    {currentFlat && (() => {
                      const nextBlockIdx = currentFlat.blockIdx + 1;
                      const nextBlockFirst = flatExercises.find(f => f.blockIdx === nextBlockIdx);
                      if (!nextBlockFirst) return null;
                      const remaining = flatExercises.filter(f =>
                        f.blockIdx === currentFlat.blockIdx &&
                        flatExercises.indexOf(f) > currentExIndex
                      ).length;
                      if (remaining <= 0) return null;
                      return (
                        <button className="advance-skip-btn" onClick={() => openExercise(nextBlockFirst.key)}>
                          Bloğu Atla ⏭
                        </button>
                      );
                    })()}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
