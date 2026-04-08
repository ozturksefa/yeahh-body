import { useState, useEffect } from "react";

function RestTimerCard({ seconds, exerciseName, isTransition, onDismiss, onAdjust }) {
  const [remaining, setRemaining] = useState(seconds);
  const [mini, setMini] = useState(false);
  const done = remaining <= 0;

  useEffect(() => {
    if (!done) {
      const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
      return () => clearTimeout(t);
    }
    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.value = 0.3;
      osc.start(); osc.stop(ctx.currentTime + 0.3);
    } catch {
      // audio cue is optional
    }
    return undefined;
  }, [done]);

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

export default function RestTimer(props) {
  return <RestTimerCard key={`${props.exerciseName}-${props.seconds}`} {...props} />;
}
