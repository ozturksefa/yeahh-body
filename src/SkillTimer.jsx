import { useState, useEffect, useRef } from "react";

const LS_KEY = "yb_skill_prs";

function loadPRs() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch { return {}; }
}
function savePR(name, seconds) {
  try {
    const prs = loadPRs();
    const key = name.toLowerCase().replace(/\s+/g, "-");
    const prev = prs[key] || 0;
    if (seconds > prev) { prs[key] = seconds; try { localStorage.setItem(LS_KEY, JSON.stringify(prs)); } catch {} return true; }
    return false;
  } catch { return false; }
}
function getPR(name) {
  try { const prs = loadPRs(); return prs[name.toLowerCase().replace(/\s+/g,"-")] || 0; } catch { return 0; }
}

export default function SkillTimer({ exerciseName, targetSeconds }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isNewPR, setIsNewPR] = useState(false);
  const [pr, setPR] = useState(() => getPR(exerciseName));
  const intervalRef = useRef(null);

  useEffect(() => {
    setElapsed(0); setRunning(false); setFinished(false); setIsNewPR(false);
    setPR(getPR(exerciseName));
  }, [exerciseName]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed(e => {
          const next = e + 1;
          if (targetSeconds && next === targetSeconds) {
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            try {
              const ctx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain); gain.connect(ctx.destination);
              osc.frequency.value = 880; gain.gain.value = 0.3;
              osc.start(); osc.stop(ctx.currentTime + 0.3);
            } catch {}
          }
          return next;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, targetSeconds]);

  const start = () => {
    setElapsed(0); setFinished(false); setIsNewPR(false); setRunning(true);
    if (navigator.vibrate) navigator.vibrate(30);
  };
  const stop = () => {
    setRunning(false); setFinished(true);
    if (elapsed > 0) {
      const newPR = savePR(exerciseName, elapsed);
      if (newPR) { setIsNewPR(true); setPR(elapsed); if (navigator.vibrate) navigator.vibrate([50,50,100,50,200]); }
    }
  };
  const reset = () => { setElapsed(0); setRunning(false); setFinished(false); setIsNewPR(false); };

  const pct = targetSeconds ? Math.min((elapsed / targetSeconds) * 100, 100) : null;
  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return (
    <div className="skill-timer-widget">
      <div className="skill-timer-ring-wrap">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#1a1a1e" strokeWidth="6" />
          {pct !== null && (
            <circle cx="50" cy="50" r="44" fill="none"
              stroke={pct >= 100 ? "#00C853" : elapsed > 0 ? "#8338EC" : "#2a2a30"}
              strokeWidth="6"
              strokeDasharray={`${(pct/100)*276.5} 276.5`}
              strokeLinecap="round" transform="rotate(-90 50 50)"
              style={{ transition: "stroke-dasharray 0.3s" }} />
          )}
        </svg>
        <div className="skill-timer-time">{fmt(elapsed)}</div>
        {targetSeconds && <div className="skill-timer-target">/ {fmt(targetSeconds)}</div>}
      </div>

      {pr > 0 && (
        <div className={`skill-timer-pr ${isNewPR ? "skill-timer-pr-new" : ""}`}>
          {isNewPR ? "🏆 YENİ REKOR!" : `🏆 En iyi: ${fmt(pr)}`}
        </div>
      )}

      <div className="skill-timer-controls">
        {!running && !finished && <button className="skill-timer-btn skill-timer-start" onClick={start}>▶ Başla</button>}
        {running && <button className="skill-timer-btn skill-timer-stop" onClick={stop}>⏹ Durdur</button>}
        {finished && (
          <>
            <div className="skill-timer-result">
              {isNewPR ? "🏆 Yeni rekor!" : elapsed >= (targetSeconds||0) ? "✅ Hedef tamam!" : `${fmt(elapsed)} tutuldu`}
            </div>
            <button className="skill-timer-btn skill-timer-reset" onClick={reset}>↺ Tekrar</button>
          </>
        )}
      </div>
    </div>
  );
}
