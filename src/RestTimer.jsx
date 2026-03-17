import { useState, useEffect } from "react";

// Dinlenme süresi belirleme (saniye)
export function getRestDuration(blockName, exerciseName) {
  const bn = blockName?.toUpperCase() || "";
  const en = exerciseName?.toLowerCase() || "";

  if (bn.includes("FİNİSHER")) return 45;
  if (bn.includes("CORE")) return 60;
  if (bn.includes("CALİSTHENİCS")) return 75;

  // Kuvvet — compound vs isolation
  if (bn.includes("KUVVET")) {
    const compound = ["squat","deadlift","press","pull up","chin up","row","hip thrust","lunge","step up","leg press"];
    if (compound.some(c => en.includes(c))) return 120;
    return 90; // isolation: curl, raise, extension
  }
  return 90;
}

function RestTimer({ seconds, exerciseName, isTransition, onDismiss, onAdjust }) {
  const [remaining, setRemaining] = useState(seconds);
  const [done, setDone] = useState(false);
  const [mini, setMini] = useState(false);

  useEffect(() => {
    setRemaining(seconds);
    setDone(false);
    setMini(false);
  }, [seconds, exerciseName]);

  useEffect(() => {
    if (remaining <= 0) {
      setDone(true);
      setMini(false); // Expand when done
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.value = 0.3;
        osc.start(); osc.stop(ctx.currentTime + 0.3);
      } catch {}
      return;
    }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const pct = seconds > 0 ? ((seconds - remaining) / seconds) * 100 : 100;
  const timeStr = `${mins}:${String(secs).padStart(2, "0")}`;

  if (mini && !done) {
    return (
      <div className="rest-mini" onClick={() => setMini(false)}>
        <div className="rest-mini-ring">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="21" fill="none" stroke="#333" strokeWidth="3" />
            <circle cx="24" cy="24" r="21" fill="none" stroke="var(--red)" strokeWidth="3"
              strokeDasharray={`${(pct / 100) * 132} 132`}
              strokeLinecap="round" transform="rotate(-90 24 24)" />
          </svg>
          <span className="rest-mini-time">{timeStr}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`rest-timer ${done ? "rest-timer-done" : ""}`}>
      <div className="rest-progress" style={{ width: `${pct}%` }} />
      <div className="rest-content">
        <div className="rest-left">
          <div className="rest-label">{done ? "✅ DİNLENME BİTTİ" : isTransition ? "🔄 HAREKET ARASI" : "⏱ SET ARASI"}</div>
          <div className="rest-ex-name">{isTransition ? `${exerciseName} bitti → Sonraki harekete geç` : exerciseName}</div>
        </div>
        <div className="rest-right">
          {!done && (
            <div className="rest-countdown" onClick={() => setMini(true)} style={{cursor:"pointer"}}>{timeStr}</div>
          )}
          <div className="rest-actions">
            {!done && (
              <>
                <button className="rest-adj" onClick={() => onAdjust(-15)}>-15</button>
                <button className="rest-adj" onClick={() => onAdjust(15)}>+15</button>
              </>
            )}
            <button className="rest-dismiss" onClick={onDismiss}>{done ? (isTransition ? "Sonraki Hareket →" : "Sonraki Set →") : "Atla"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestTimer;
