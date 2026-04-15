import { NUTRI_MACRO_THEMES } from "./foodDatabase";

/**
 * Circular progress ring for a single macro (calories/protein/carbs/fat).
 * Extracted verbatim from Nutrition.jsx; no behavior changes.
 */
export default function MacroRing({ label, val, target, unit, color }) {
  const pct = Math.min((val / target) * 100, 100);
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const over = val > target;
  return (
    <div className="macro-ring">
      <svg width="68" height="68" viewBox="0 0 68 68">
        <circle cx="34" cy="34" r={r} fill="none" stroke={NUTRI_MACRO_THEMES.ringTrack} strokeWidth="5" />
        <circle
          cx="34"
          cy="34"
          r={r}
          fill="none"
          stroke={over ? NUTRI_MACRO_THEMES.danger : color}
          strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 34 34)"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="macro-ring-inner">
        <span className="macro-ring-val" style={{ color: over ? NUTRI_MACRO_THEMES.danger : "var(--text)" }}>{val}</span>
        <span className="macro-ring-unit">{unit}</span>
      </div>
      <div className="macro-ring-label">{label}</div>
    </div>
  );
}
