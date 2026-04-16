import { useState } from "react";

const STORAGE_KEY = "yb_asymmetry_dismissed_at";
const SNOOZE_DAYS = 14; // user can hide the card for two weeks at a time

/**
 * Pre-session reminder for the athlete's known weak-side protocol.
 *
 * Shows a single compact card on training days with three rules:
 *  1. Unilateral lifts: start with the weak side, match reps on strong
 *  2. +1 bonus set per training day for the right arm / right leg
 *  3. Wrist prep (rotation + grip squeeze) before pressing work
 *
 * Context: right side (arm, wrist, leg) is ~weaker than left. Not a
 * neurological/structural issue, just dominance + scoliosis + daily
 * habit. The reminder keeps the protocol top-of-mind without adding
 * a whole new tracking UI — that's a later upgrade (seçenek C).
 *
 * Dismiss: "Gizle" tucks the card for 14 days (stored in localStorage).
 * Users can always re-surface it by clearing the key.
 */
export default function AsymmetryProtocolCard() {
  const [hidden, setHidden] = useState(() => {
    try {
      const last = Number(localStorage.getItem(STORAGE_KEY) || 0);
      if (!last) return false;
      const ageDays = (Date.now() - last) / (1000 * 60 * 60 * 24);
      return ageDays < SNOOZE_DAYS;
    } catch { return false; }
  });

  if (hidden) return null;

  const dismiss = () => {
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch { /* ignore */ }
    setHidden(true);
  };

  return (
    <div className="asym-card" role="note" aria-label="Asimetri protokolü">
      <div className="asym-head">
        <span className="asym-icon" aria-hidden>⚖️</span>
        <div>
          <div className="asym-title">Sağ taraf hatırlatıcı</div>
          <div className="asym-sub">Tek taraflı setlerde bu üç kuralı uygula.</div>
        </div>
        <button
          type="button"
          className="asym-dismiss"
          onClick={dismiss}
          aria-label="14 gün gizle"
          title="14 gün gizle"
        >
          ✕
        </button>
      </div>

      <ol className="asym-rules">
        <li>
          <span className="asym-rule-tag">1</span>
          <div>
            <strong>Sağ önce.</strong> Tek taraflı setlerde (row, lunge, RDL, curl, press)
            sağ ile başla. Kaç <em>temiz</em> rep yapıyorsan sol de aynısı.
          </div>
        </li>
        <li>
          <span className="asym-rule-tag">2</span>
          <div>
            <strong>+1 bonus set sağa.</strong> Haftada iki ana günde (SAL + CMT)
            sağ kol / sağ bacak için aynı ağırlıkta 1 ekstra set.
          </div>
        </li>
        <li>
          <span className="asym-rule-tag">3</span>
          <div>
            <strong>Bilek önce.</strong> Press bloklarından önce wrist rotation 1 dk
            + grip squeeze (havlu burarak) 2×15sn. Ağrı sinyali olursa o set biter.
          </div>
        </li>
      </ol>
    </div>
  );
}
