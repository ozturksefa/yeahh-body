import { SectionCard } from "./panels";
import { buttonBase } from "./shared";

/**
 * 8-weeks-program kickoff card. Rendered when no startDate is set.
 * Extracted verbatim from HybridView.jsx; no behavior changes.
 */
export default function StartProgramCard({ onStart }) {
  return (
    <div style={{ padding: "0 12px 12px" }}>
      <SectionCard title="🏁 8 Haftalık Programa Başla" accent="#00C853">
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontSize: 12, color: "#C4C4CC", lineHeight: 1.5 }}>
            Bugünü başlangıç tarihi olarak kaydeder ve haftayı `Hafta 1 — Kurulum` olarak başlatır.
          </div>
          <button
            data-testid="program-start-button"
            onClick={onStart}
            style={{
              ...buttonBase,
              width: "100%",
              background: "#00C853",
              borderColor: "#00C853",
              color: "#07140B",
              padding: "12px 14px",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            Programa Başla
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
