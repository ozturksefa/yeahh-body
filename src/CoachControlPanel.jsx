import { useState } from "react";
import { PROGRAM_HOME } from "./dataHome";

const toneStyles = {
  good: {
    color: "#00C853",
    background: "rgba(0,200,131,.10)",
    border: "rgba(0,200,131,.28)",
  },
  warn: {
    color: "#FFA726",
    background: "rgba(255,167,38,.10)",
    border: "rgba(255,167,38,.28)",
  },
  risk: {
    color: "#FF5252",
    background: "rgba(255,82,82,.10)",
    border: "rgba(255,82,82,.28)",
  },
};

export default function CoachControlPanel({ program = PROGRAM_HOME, embedded = false }) {
  const [open, setOpen] = useState(false);
  const { meta, coachProfile, controlCenter } = program;

  return (
    <div style={{ padding: embedded ? "8px 12px 0" : "8px 12px 0" }}>
      <div style={{
        background: "#131316",
        border: "1px solid #2A2A30",
        borderRadius: 12,
        overflow: "hidden",
      }}>
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            color: "inherit",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: "#7A7A84", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>
              {coachProfile.title}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginTop: 4 }}>
              {meta.name}
            </div>
            <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 4, lineHeight: 1.5 }}>
              {meta.description}
            </div>
          </div>
          <div style={{ fontSize: 18, color: "#7A7A84", marginLeft: 12 }}>{open ? "−" : "+"}</div>
        </button>

        {open && (
          <div style={{ padding: "0 12px 12px" }}>
            <div style={{
              background: "#1A1A1E",
              border: "1px solid #2A2A30",
              borderRadius: 10,
              padding: 12,
              marginBottom: 10,
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
                {coachProfile.athlete}
              </div>
              <div style={{ fontSize: 11, color: "#7A7A84", marginBottom: 10 }}>
                {coachProfile.schedule}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                {coachProfile.priorities.map((item) => (
                  <span key={item} style={{
                    padding: "5px 8px",
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#D8D8DD",
                    background: "#222226",
                    border: "1px solid #2A2A30",
                  }}>
                    {item}
                  </span>
                ))}
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {coachProfile.constraints.map((item) => (
                  <div key={item} style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5 }}>
                    • {item}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8, marginBottom: 10 }}>
              {controlCenter.badges.map((badge) => {
                const tone = toneStyles[badge.tone] || toneStyles.warn;
                return (
                  <div key={badge.label} style={{
                    background: tone.background,
                    border: `1px solid ${tone.border}`,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                    <div style={{ fontSize: 10, color: "#7A7A84", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>
                      {badge.label}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: tone.color, marginTop: 4 }}>
                      {badge.value}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <div style={{
                background: "#1A1A1E",
                border: "1px solid #2A2A30",
                borderRadius: 10,
                padding: 12,
              }}>
                <div style={{ fontSize: 11, color: "#7A7A84", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
                  Günlük Kurallar
                </div>
                {controlCenter.rules.map((rule) => (
                  <div key={rule} style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5, marginBottom: 6 }}>
                    • {rule}
                  </div>
                ))}
              </div>

              <div style={{
                background: "#1A1A1E",
                border: "1px solid #2A2A30",
                borderRadius: 10,
                padding: 12,
              }}>
                <div style={{ fontSize: 11, color: "#7A7A84", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
                  Anlık Swap Kuralları
                </div>
                {controlCenter.swaps.map((swap) => (
                  <div key={swap.trigger} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#FFA726" }}>
                      {swap.trigger}
                    </div>
                    <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5, marginTop: 2 }}>
                      {swap.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
