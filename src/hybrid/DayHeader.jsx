/**
 * Pure-presentational day header card for HybridView.
 * Shows focus/duration/badge, injury notes, week chip, execution note.
 * Extracted from HybridView.jsx lines 474–494 without behavior changes.
 */
export default function DayHeader({ day, activeVariant, mode, weekProfile }) {
  return (
    <div className="day-hdr">
      <div className="day-top">
        <div>
          <div className="day-focus">{day.focus}</div>
          <div className="day-meta">
            {activeVariant.duration} · {mode === "home" ? "Ev versiyonu" : "Macfit versiyonu"}
          </div>
        </div>
        <div className="day-badge" style={{ background: day.color }}>{day.sub}</div>
      </div>
      {activeVariant.injury && <div className="injury">{activeVariant.injury}</div>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
        <div style={{ background: "rgba(79,195,247,.08)", border: "1px solid rgba(79,195,247,.22)", borderRadius: 999, padding: "6px 10px", fontSize: 11, color: "#4FC3F7", fontWeight: 800 }}>
          Hafta {weekProfile.week} · {weekProfile.label}
        </div>
        <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 999, padding: "6px 10px", fontSize: 11, color: "#C4C4CC", fontWeight: 700 }}>
          {day.type === "training" ? "Ana gün" : "Aktif off"}
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: "#C4C4CC", lineHeight: 1.5 }}>
        {activeVariant.weekExecutionNote || weekProfile.note}
      </div>
    </div>
  );
}
