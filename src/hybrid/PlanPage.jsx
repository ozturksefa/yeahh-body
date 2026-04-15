import { PROGRAM_HYBRID } from "../dataHybrid";
import { SectionCard } from "./panels";
import {
  buttonBase,
  formatShortDateLabel,
  getWeekExecutionNote,
  getWeekStartDate,
} from "./shared";

/**
 * 8-week plan page: periodization grid, active-week detail, movement map.
 * Extracted verbatim from HybridView.jsx; no behavior changes.
 */
export default function PlanPage({
  weekLog,
  activeWeek,
  setActiveWeek,
  startDate,
  weekProfile,
  weekProgress,
}) {
  return (
    <div style={{ padding: "12px", display: "grid", gap: 10 }}>
      <SectionCard title="Program Çizelgesi" accent="#4FC3F7">
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8 }}>
            {PROGRAM_HYBRID.periodization.map((week) => {
              const isDone = weekLog.some((item) => item.week === week.week);
              const active = week.week === activeWeek;
              const isFuture = startDate ? week.week > activeWeek && !isDone : week.week > 1;
              const weekStart = startDate ? getWeekStartDate(startDate, week.week) : null;
              const symbol = isDone ? "✓" : active ? "●" : "○";
              return (
                <button
                  key={week.week}
                  onClick={() => !isFuture && setActiveWeek(week.week)}
                  disabled={isFuture}
                  style={{
                    ...buttonBase,
                    minWidth: 0,
                    opacity: isFuture ? 0.6 : 1,
                    background: isDone ? "rgba(0,200,83,.1)" : active ? "rgba(79,195,247,.14)" : "#17171B",
                    borderColor: isDone ? "rgba(0,200,83,.35)" : active ? "#4FC3F7" : "#2A2A30",
                    color: active || isDone ? "#fff" : "#C4C4CC",
                    padding: "10px 8px",
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 900 }}>H{week.week} {symbol}</div>
                  <div style={{ fontSize: 10, color: isDone ? "#8FF0A4" : active ? "#4FC3F7" : "#7A7A84", marginTop: 4 }}>{weekStart ? formatShortDateLabel(weekStart) : "bekliyor"}</div>
                </button>
              );
            })}
          </div>
          {!startDate ? (
            <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5 }}>Program henüz başlatılmadı. Başlangıç tarihi atanınca haftalar otomatik takvime oturur.</div>
          ) : (
            <>
              <div style={{ fontSize: 12, color: "#fff", fontWeight: 800 }}>Başlangıç: {formatShortDateLabel(startDate)} · Şu an: Hafta {weekProfile.week} · {weekProfile.label}</div>
              <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5 }}>{getWeekExecutionNote(weekProfile)}</div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Hafta Detayı" accent="#4FC3F7">
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ background: "rgba(79,195,247,.08)", border: "1px solid rgba(79,195,247,.24)", borderRadius: 10, padding: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>Hafta {weekProfile.week} · {weekProfile.label}</div>
            <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 6, lineHeight: 1.5 }}>{weekProfile.note}</div>
            <div style={{ fontSize: 10, color: "#7A7A84", marginTop: 6 }}>Uygulama: {getWeekExecutionNote(weekProfile)}</div>
          </div>

          {(() => {
            const loggedWeek = weekLog.find((item) => item.week === activeWeek);
            if (loggedWeek) {
              return (
                <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 10, padding: 10 }}>
                  <div style={{ fontSize: 11, color: "#00C853", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em" }}>Read-only kayıt</div>
                  <div style={{ fontSize: 12, color: "#fff", fontWeight: 800, marginTop: 6 }}>{loggedWeek.sessionCount} seans · Rep hedefi: {loggedWeek.repGoalMet ? "✓" : "△"}</div>
                  <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 6, lineHeight: 1.5 }}>Başlangıç: {formatShortDateLabel(loggedWeek.startDate)} · Tamamlandı: {formatShortDateLabel(loggedWeek.completedDate)}</div>
                </div>
              );
            }

            if (!startDate) {
              return <div style={{ fontSize: 11, color: "#7A7A84" }}>Hafta detayları için önce programı başlat.</div>;
            }

            return (
              <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 10, padding: 10 }}>
                <div style={{ fontSize: 11, color: "#4FC3F7", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em" }}>Aktif hedef</div>
                <div style={{ fontSize: 12, color: "#fff", fontWeight: 800, marginTop: 6 }}>{weekProgress.sessionCount}/4 tamamlanan ana seans</div>
                <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 6, lineHeight: 1.5 }}>Hafta penceresi: {formatShortDateLabel(weekProgress.weekStartDate)} · {formatShortDateLabel(weekProgress.weekEndDate)}</div>
                <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 6, lineHeight: 1.5 }}>{weekProgress.repGoalMet ? "Rep hedefi genel olarak tutuluyor." : "Rep hedefi için kalite ve toparlanma biraz daha oturmalı."}</div>
              </div>
            );
          })()}
        </div>
      </SectionCard>

      <SectionCard title="Ev ↔ Macfit Eşleşme Tablosu" accent="#FFA726">
        <div style={{ display: "grid", gap: 8 }}>
          {PROGRAM_HYBRID.movementMap.map((row) => (
            <div key={row.pattern} style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{row.pattern}</div>
              <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 6, lineHeight: 1.5 }}>Macfit: {row.gym}</div>
              <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 4, lineHeight: 1.5 }}>Ev: {row.home}</div>
              <div style={{ fontSize: 11, color: "#7A7A84", marginTop: 6, lineHeight: 1.5 }}>{row.note}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
