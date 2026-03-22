import { useState, useEffect, useRef } from "react";
import { PROGRAM } from "./data";

import { getDashboardStats } from "./tracker";
import { supabase } from "./supabaseClient";
import { saveFlow, loadFlow, clearFlow } from "./flowStore";
import NutritionTracker from "./Nutrition";
import AuthScreen from "./Auth";
import Dashboard, { WeeklyStats } from "./Dashboard";
import RestTimer from "./RestTimer";
import WorkoutTimer from "./WorkoutTimer";
import BlockCard from "./BlockCard";
import { parseSets } from "./SetTracker";
import Program2View from "./Program2View";
import Program3View from "./Program3View";
import "./App.css";














export default function App() {
  const [user, setUser] = useState(undefined);
  const [page, setPage] = useState("program");
  const [programMode, setProgramMode] = useState(() => {
    try { return localStorage.getItem("yb_program_mode") || "classic"; } catch { return "classic"; }
  });
  const [day, setDay] = useState(0);
  const [expandedEx, setExpandedEx] = useState(null);
  const [guideOpen, setGuideOpen] = useState(null);
  const [restTimer, setRestTimer] = useState(null);
  const [swaps, setSwaps] = useState(() => {
    try { return JSON.parse(localStorage.getItem("yb_swaps") || "{}"); } catch { return {}; }
  });

  const handleSwap = (originalName, altName) => {
    setSwaps(prev => {
      const next = { ...prev };
      if (altName === null) {
        delete next[originalName];
      } else {
        next[originalName] = altName;
      }
      localStorage.setItem("yb_swaps", JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const d = PROGRAM.days[day];
  const g = PROGRAM.guide;
  const total = d.blocks.reduce((a, b) => a + b.exercises.length, 0);

  // Workout flow state
  const [workoutActive, setWorkoutActive] = useState(false);
  const [openBlocks, setOpenBlocks] = useState({});
  const [globalAllDone, setGlobalAllDone] = useState(false);
  const [workoutElapsed, setWorkoutElapsed] = useState(0);
  const [streak, setStreak] = useState(0);

  // Load streak
  useEffect(() => {
    if (user) getDashboardStats().then(s => setStreak(s.streak || 0)).catch(() => {});
  }, [user]);

  // Session restore from IndexedDB — runs ONCE after auth resolves
  const flowRestoredRef = useRef(false);
  useEffect(() => {
    if (user === undefined || user === null || flowRestoredRef.current) return;
    flowRestoredRef.current = true;
    loadFlow().then(saved => {
      if (!saved) return;
      // CRITICAL: Update prevDayRef BEFORE setDay — otherwise day change effect
      // sees prevDayRef(0) !== saved.day and wipes all restored state
      prevDayRef.current = saved.day;
      // Apply restored state
      setDay(saved.day);
      setWorkoutActive(true);
      setExpandedEx(saved.expandedEx);
      const bi = parseInt(saved.expandedEx.split("-")[0]);
      setOpenBlocks({ [bi]: true });
      // Scroll to restored exercise after DOM renders
      setTimeout(() => {
        const tryScroll = (attempts) => {
          if (attempts <= 0) return;
          const openBody = document.querySelector('.ex-body');
          if (!openBody) { setTimeout(() => tryScroll(attempts - 1), 200); return; }
          const card = openBody.closest('.ex-wrap');
          if (!card) return;
          const hdrH = document.querySelector('.hdr')?.offsetHeight || 0;
          const top = card.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: top - hdrH - 8, behavior: "smooth" });
        };
        tryScroll(8);
      }, 300);
    });
  }, [user]);

  // Persist flow state to IndexedDB on changes
  useEffect(() => {
    if (!flowRestoredRef.current) return; // Don't save before restore completes
    if (workoutActive && expandedEx) {
      saveFlow({ day, expandedEx, workoutActive: true });
    } else if (!workoutActive) {
      clearFlow();
    }
  }, [workoutActive, expandedEx, day]);

  // Day change — reset flow
  const prevDayRef = useRef(day);
  useEffect(() => {
    if (prevDayRef.current !== day) {
      prevDayRef.current = day;
      setExpandedEx(null); setWorkoutActive(false); setOpenBlocks({}); setGlobalAllDone(false);
      clearFlow();
    }
  }, [day]);

  // Flat exercise list: [{key: "0-0", blockIdx: 0, exIdx: 0}, ...]
  const flatExercises = [];
  d.blocks.forEach((block, bi) => {
    block.exercises.forEach((ex, ei) => {
      flatExercises.push({ key: `${bi}-${ei}`, blockIdx: bi, exIdx: ei });
    });
  });

  // Current exercise tracker check
  const currentFlat = flatExercises.find(f => f.key === expandedEx);
  const currentBlock = currentFlat ? d.blocks[currentFlat.blockIdx] : null;
  const currentEx = currentBlock ? currentBlock.exercises[currentFlat.exIdx] : null;
  const currentBlockName = currentBlock?.name || "";
  const trackBlockNames = ["KUVVET", "CALİSTHENİCS", "CORE", "FİNİSHER"];
  const currentHasTracker = currentEx && trackBlockNames.some(b => currentBlockName.toUpperCase().includes(b)) && parseSets(currentEx.sets) && !parseSets(currentEx.sets)?.timed;
  const isLastExGlobal = currentFlat && flatExercises.indexOf(currentFlat) === flatExercises.length - 1;
  const canAdvance = workoutActive && expandedEx && (!currentHasTracker || globalAllDone);

  const openExercise = (key) => {
    const bi = parseInt(key.split("-")[0]);
    setOpenBlocks(prev => ({ ...prev, [bi]: true }));
    setExpandedEx(key);
    setGlobalAllDone(false); // Reset when switching exercises
    // Scroll to newly opened exercise after DOM settles
    setTimeout(() => {
      const el = document.querySelector('.ex-wrap [class*="ex-header"]:not([style])');
      // Find the open card
      const cards = document.querySelectorAll('.ex-wrap');
      for (const card of cards) {
        if (card.querySelector('.ex-body')) {
          const headerHeight = document.querySelector('.hdr')?.offsetHeight || 0;
          const cardTop = card.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: cardTop - headerHeight - 8, behavior: "smooth" });
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
      // Scroll after render
      setTimeout(() => {
        const cards = document.querySelectorAll('.ex-wrap');
        for (const card of cards) {
          if (card.querySelector('.ex-body')) {
            const headerHeight = document.querySelector('.hdr')?.offsetHeight || 0;
            const cardTop = card.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: cardTop - headerHeight - 8, behavior: "smooth" });
            break;
          }
        }
      }, 150);
    }
  };

  const timerRef = useRef(null);
  const wakeLockRef = useRef(null);

  // Current exercise index for progress
  const currentExIndex = flatExercises.findIndex(f => f.key === expandedEx);

  const handleAdvance = () => {
    if (currentExIndex < 0) return;
    const nextIdx = currentExIndex + 1;
    if (nextIdx >= flatExercises.length) {
      setExpandedEx(null);
      setWorkoutActive(false);
      setOpenBlocks({});
      if (timerRef.current) timerRef.current();
      releaseWakeLock();
      clearFlow();
      return;
    }
    openExercise(flatExercises[nextIdx].key);
  };

  const handleGoBack = () => {
    if (currentExIndex <= 0) return;
    openExercise(flatExercises[currentExIndex - 1].key);
  };

  // Wake Lock — ekran kararmasını engelle
  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      }
    } catch {}
  };
  const releaseWakeLock = () => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release();
      wakeLockRef.current = null;
    }
  };

  // Activate/deactivate wake lock with workout
  useEffect(() => {
    if (workoutActive) {
      requestWakeLock();
      // Re-acquire on visibility change (e.g. switch back to tab)
      const onVis = () => { if (document.visibilityState === 'visible' && workoutActive) requestWakeLock(); };
      document.addEventListener('visibilitychange', onVis);
      return () => { document.removeEventListener('visibilitychange', onVis); releaseWakeLock(); };
    } else {
      releaseWakeLock();
    }
  }, [workoutActive]);

  const handleWorkoutFinish = () => {
    setWorkoutActive(false);
    setExpandedEx(null);
    setOpenBlocks({});
    releaseWakeLock();
    clearFlow();
  };

  // Auth loading
  if (user === undefined) {
    return <div className="auth-screen"><div className="auth-box"><div className="auth-brand">YEAHH BODY</div><div style={{color:"#666",marginTop:16}}>Yükleniyor...</div></div></div>;
  }

  // Not logged in
  if (!user) {
    return <AuthScreen />;
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

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
    { id: "super", icon: "⚡", title: "Zaman Kazandıran İkili Hareketler", content: (
      <div>
        <div className="guide-text" style={{marginBottom:8}}>A hareketini yap → dinlenmek yerine B hareketini yap → sonra dinlen. Böylece aynı sürede daha fazla iş yaparsın.</div>
        {g.supersets.map((s, i) => (
        <div key={i} className="guide-row">
          <span className="guide-label">{s.a}</span>
          <span className="guide-value">→</span>
          <span className="guide-note">{s.b} ({s.note})</span>
        </div>
      ))}</div>
    )},
    { id: "off", icon: "🛌", title: "Antrenman Olmayan Günlerde Ne Yapayım?", content: (
      <div>
        {g.offDays.activities.map((a, i) => (
          <div key={i} className="guide-step"><span className="guide-step-n">•</span> {a}</div>
        ))}
        <div className="avoid-box" style={{marginTop:8}}><strong>✕ YAPMA: </strong>{g.offDays.avoid}</div>
      </div>
    )},
    { id: "deload", icon: "🔋", title: "Dinlenme Haftası (Her 4 haftada bir)", content: (
      <div>{g.deload.rules.map((r, i) => (
        <div key={i} className="guide-step"><span className="guide-step-n">{i+1}.</span> {r}</div>
      ))}</div>
    )},
    { id: "phase", icon: "🎯", title: "2. Döneme Ne Zaman Geçerim?", content: (
      <div>
        <div className="guide-text" style={{marginBottom:8}}>Hafta 8 sonunda bu testleri yap. Hepsini geçersen 2. döneme hazırsın:</div>
        {g.phaseTransition.tests.map((t, i) => (
          <div key={i} className="guide-row">
            <span className="guide-label">{t.name}</span>
            <span className="guide-value">{t.pass}</span>
            <span className="guide-note">{t.current}</span>
          </div>
        ))}
        <div className="guide-text" style={{marginTop:8, color:"#8B83FF"}}>→ {g.phaseTransition.nextPhase}</div>
      </div>
    )},
    { id: "cardio", icon: "🚶", title: "Haftalık Yürüyüş/Kardio Hedefi", content: (
      <div className="guide-text">{g.weeklyCardio}</div>
    )},
  ];

  return (
    <div className="app">
      <header className="hdr">
        <div className="hdr-top">
          <div className="brand">YEAHH BODY</div>
          <button className="logout-btn" onClick={logout}>Çıkış</button>
        </div>
        <div className="prog-title">Kişisel Antrenman Programı</div>
        {streak > 0 && <div className="streak-badge">🔥 {streak} antrenman üst üste</div>}

        {/* Program seçici */}
        {page === "program" && (
          <div className="prog-mode-toggle">
            <button
              className={`prog-mode-btn ${programMode === "classic" ? "prog-mode-active" : ""}`}
              onClick={() => { setProgramMode("classic"); try { localStorage.setItem("yb_program_mode", "classic"); } catch {} }}>
              Klasik Split
            </button>
            <button
              className={`prog-mode-btn ${programMode === "full" ? "prog-mode-active" : ""}`}
              onClick={() => { setProgramMode("full"); try { localStorage.setItem("yb_program_mode", "full"); } catch {} }}>
              Full Activation
            </button>
            <button
              className={`prog-mode-btn ${programMode === "athletic" ? "prog-mode-active" : ""}`}
              onClick={() => { setProgramMode("athletic"); try { localStorage.setItem("yb_program_mode", "athletic"); } catch {} }}>
              Atletik ⚡
            </button>
          </div>
        )}

        <div className="page-nav">
          <button className={`page-tab ${page === "program" ? "page-tab-active" : ""}`}
            onClick={() => setPage("program")}>🏋️ Program</button>
          <button className={`page-tab ${page === "dashboard" ? "page-tab-active" : ""}`}
            onClick={() => setPage("dashboard")}>📊 İlerleme</button>
          <button className={`page-tab ${page === "nutrition" ? "page-tab-active" : ""}`}
            onClick={() => setPage("nutrition")}>🍽 Beslenme</button>
        </div>
        {page === "program" && programMode === "classic" && (
        <div className="tabs">
          {PROGRAM.days.map((dd, i) => (
            <button key={i}
              className={`tab ${day === i ? "tab-active" : ""}`}
              style={day === i ? { background: dd.color, borderColor: dd.color } : {}}
              onClick={() => setDay(i)}>
              <div className="tab-t">{dd.title}</div>
              <div className="tab-s">{dd.sub}</div>
            </button>
          ))}
        </div>
        )}
      </header>

      {page === "dashboard" ? (
        <main className="main">
          <Dashboard />
        </main>
      ) : page === "nutrition" ? (
        <main className="main">
          <NutritionTracker />
        </main>
      ) : programMode === "full" ? (
        <Program2View user={user} />
      ) : programMode === "athletic" ? (
        <Program3View user={user} />
      ) : (
      <>
      <div className="day-hdr" style={{ borderColor: d.color + "44", background: d.color + "0D" }}>
        <div className="day-top">
          <div>
            <div className="day-focus" style={{ color: d.color }}>{d.focus}</div>
            <div className="day-meta">{d.duration} · {total} egzersiz</div>
          </div>
          <div className="day-badge" style={{ background: d.color }}>{d.sub}</div>
        </div>
        <div className="injury">{d.injury}</div>
      </div>

      <main className="main">
        <WorkoutTimer dayIndex={day} onWorkoutStart={handleWorkoutStart} onWorkoutFinish={handleWorkoutFinish} finishRef={timerRef} onElapsed={setWorkoutElapsed} />
        <WeeklyStats />

        {d.blocks.map((block, bi) => {
          const isLastBlock = bi === d.blocks.length - 1;
          return (
            <BlockCard key={bi} block={block} blockIdx={bi}
              expandedEx={expandedEx}
              onExToggle={k => setExpandedEx(p => p === k ? null : k)}
              dayIndex={day}
              onStartRest={startRest}
              swaps={swaps}
              onSwap={handleSwap}
              forceOpen={!!openBlocks[bi]}
              onAdvance={workoutActive ? handleAdvance : null}
              workoutActive={workoutActive}
              isLastEx={isLastBlock}
              onAllSetsDone={setGlobalAllDone} />
          );
        })}

        <div className="pain-card">
          <div className="pain-title">⚠️ AĞRI PROTOKOLÜ</div>
          {[
            { e: "🟢", t: "Yanma / Kasılma → Normal. Devam et." },
            { e: "🟡", t: "Sızı / Gerginlik → Dur, formu kontrol et." },
            { e: "🔴", t: "Keskin / Bıçak gibi ağrı → Anında bırak. Koçuna bildir." },
          ].map((x, i) => (
            <div key={i} className="pain-row"><span>{x.e}</span><span>{x.t}</span></div>
          ))}
        </div>
        <div className="footer">Hafta 4 sonu: Push-up & pull-up testi · Hafta 8: Faz 2 değerlendirmesi</div>

        <div className="guide-section">
          <div className="guide-header">📋 ANTRENMAN REHBERİ — Sıkça Sorulan Sorular</div>
          <div className="guide-sub">{g.phase} · {g.weeks}</div>
          {guideCards.map(card => (
            <div key={card.id} className="guide-card">
              <button className="guide-card-head" onClick={() => setGuideOpen(p => p === card.id ? null : card.id)}>
                <span>{card.icon} {card.title}</span>
                <span style={{ transition: "transform 0.2s", transform: guideOpen === card.id ? "rotate(180deg)" : "none" }}>▾</span>
              </button>
              {guideOpen === card.id && (
                <div className="guide-card-body">{card.content}</div>
              )}
            </div>
          ))}
        </div>
      </main>
      </>
      )}
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
      {workoutActive && expandedEx && !restTimer && (
        <div className="advance-bar">
          <div className="advance-progress">
            <div className="advance-progress-fill" style={{ width: `${((currentExIndex + 1) / flatExercises.length) * 100}%` }} />
          </div>
          <div className="advance-status">
            <span className="advance-timer">{String(Math.floor(workoutElapsed / 60)).padStart(2, "0")}:{String(workoutElapsed % 60).padStart(2, "0")}</span>
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
    </div>
  );
}
