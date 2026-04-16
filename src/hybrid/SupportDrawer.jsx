import { useState } from "react";
import CoachControlPanel from "../CoachControlPanel";
import DayCoachGuide from "../DayCoachGuide";
import { HYBRID_COACH_GUIDES } from "../hybridCoachGuides";
import PushSettingsCard from "./PushSettingsCard";

/**
 * Collapsible "Yardımcı Alan" drawer showing coach guide + control panel.
 * Owns its own open/closed state — parent does not need to track it.
 * Extracted verbatim from HybridView.jsx; no behavior changes.
 */
export default function SupportDrawer({ day, program }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: "0 12px 12px" }}>
      <div style={{ background: "#131316", border: "1px solid #2A2A30", borderRadius: 12, overflow: "hidden" }}>
        <button
          onClick={() => setOpen((value) => !value)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            textAlign: "left",
            border: "none",
            background: "transparent",
            color: "inherit",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: "#7A7A84", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>
              Yardımcı Alan
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginTop: 4 }}>
              Rehber, denetim profili ve ek notlar
            </div>
            <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5, marginTop: 4 }}>
              Programı bitirdikten sonra veya ihtiyaç olduğunda aç.
            </div>
          </div>
          <div style={{ color: "#7A7A84", fontSize: 18 }}>{open ? "−" : "+"}</div>
        </button>

        {open && (
          <div style={{ padding: "0 0 12px" }}>
            <div style={{ padding: "0 12px 8px" }}>
              <PushSettingsCard />
            </div>
            <DayCoachGuide day={day} guides={HYBRID_COACH_GUIDES} title="Hibrit Gün Rehberi" embedded />
            <CoachControlPanel program={program} embedded />
          </div>
        )}
      </div>
    </div>
  );
}
