import { SectionCard } from "./panels";
import { buttonBase } from "./shared";

/**
 * Renders the weekly progression prompt after a week's goals are met, or the
 * final "8 weeks done" card after the last week. Returns null when no prompt
 * is active. Extracted verbatim from HybridView.jsx; no behavior changes.
 */
export default function WeekTransitionPanel({
  transitionPrompt,
  activeWeek,
  weekProgress,
  nextWeekProfile,
  nextWeekPreview,
  onAdvance,
  onSnooze,
  onReset,
  onAcknowledgeCompletion,
}) {
  if (!transitionPrompt) return null;

  if (transitionPrompt.kind === "advance") {
    const readiness = weekProgress.readiness || {
      canAdvance: weekProgress.repGoalMet,
      label: weekProgress.repGoalMet ? "Geçmeye hazır" : "Kontrol gerekli",
      tone: weekProgress.repGoalMet ? "#00C853" : "#FFA726",
      summary: weekProgress.repGoalMet ? "Hafta hedefleri genel olarak uygun." : "Rep/kalite hedefi kısmen tutuldu.",
      checks: [],
    };
    const canAdvance = readiness.canAdvance;
    return (
      <div style={{ padding: "0 12px 12px" }}>
        <SectionCard
          title={canAdvance ? `🎉 Hafta ${activeWeek} tamamlandı!` : `⚖️ Hafta ${activeWeek} kontrolü`}
          accent={readiness.tone}
          data-testid="week-advance-prompt"
        >
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 12, color: "#C4C4CC", lineHeight: 1.5 }}>
              {weekProgress.sessionCount} seans · Rep hedefi:{" "}
              <span style={{ color: weekProgress.repGoalMet ? "#00C853" : "#FFA726", fontWeight: 800 }}>
                {weekProgress.repGoalMet ? "✓ tutuldu" : "△ kısmen"}
              </span>
            </div>
            <div style={{ background: "#17171B", border: `1px solid ${readiness.tone}55`, borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 12, color: readiness.tone, fontWeight: 900 }}>{readiness.label}</div>
              <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5, marginTop: 6 }}>{readiness.summary}</div>
              {readiness.checks?.length > 0 && (
                <div style={{ display: "grid", gap: 4, marginTop: 8 }}>
                  {readiness.checks.slice(0, 3).map((item) => (
                    <div key={item} style={{ fontSize: 10, color: "#9A9AA3", lineHeight: 1.4 }}>• {item}</div>
                  ))}
                </div>
              )}
            </div>
            {nextWeekProfile && (
              <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 10, padding: 10 }}>
                <div style={{ fontSize: 12, color: "#fff", fontWeight: 800 }}>
                  Sonraki: Hafta {nextWeekProfile.week} — {nextWeekProfile.label}
                </div>
                <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5, marginTop: 6 }}>
                  {nextWeekPreview}
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                data-testid="week-advance-button"
                onClick={onAdvance}
                style={{
                  ...buttonBase,
                  flex: 1,
                  background: canAdvance ? "#4FC3F7" : "rgba(255,167,38,.14)",
                  borderColor: canAdvance ? "#4FC3F7" : "#FFA726",
                  color: canAdvance ? "#071119" : "#FFD79A",
                  padding: "12px 14px",
                  fontSize: 13,
                  fontWeight: 900,
                }}
              >
                {canAdvance ? `Hafta ${nextWeekProfile?.week}'ye Geç` : "Yine de Geç"}
              </button>
              <button
                data-testid="week-snooze-button"
                onClick={onSnooze}
                style={{ ...buttonBase, flex: 1, padding: "12px 14px", fontSize: 13 }}
              >
                {canAdvance ? "Bekle" : "Bu Haftada Kal"}
              </button>
            </div>
          </div>
        </SectionCard>
      </div>
    );
  }

  if (transitionPrompt.kind === "complete") {
    return (
      <div style={{ padding: "0 12px 12px" }}>
        <SectionCard title="🏆 8 Hafta tamamlandı!" accent="#FFD166">
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 12, color: "#C4C4CC", lineHeight: 1.5 }}>
              H1'den H8'e ilerleme kaydın hazır. Dilersen bu bloğu kapat, dilersen yeni bir döngü başlat.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={onReset} style={{ ...buttonBase, flex: 1, padding: "12px 14px", fontSize: 13 }}>
                Programı Sıfırla
              </button>
              <button
                onClick={onAcknowledgeCompletion}
                style={{
                  ...buttonBase,
                  flex: 1,
                  background: "#FFD166",
                  borderColor: "#FFD166",
                  color: "#171105",
                  padding: "12px 14px",
                  fontSize: 13,
                  fontWeight: 900,
                }}
              >
                Devam Et
              </button>
            </div>
          </div>
        </SectionCard>
      </div>
    );
  }

  return null;
}
