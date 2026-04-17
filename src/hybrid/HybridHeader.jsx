import { buttonBase } from "./shared";

const PAGE_TABS = [
  ["program", "Program"],
  ["history", "Geçmiş"],
  ["skill", "Skill"],
  ["plan", "Plan"],
  ["status", "Durum"],
  ["nutrition", "Beslenme"],
];

const DAY_SHORT = {
  "Pazartesi": "Pzt",
  "Salı": "Sal",
  "Çarşamba": "Çar",
  "Perşembe": "Per",
  "Cuma": "Cum",
  "Cumartesi": "Cmt",
  "Pazar": "Paz",
  "PZT": "Pzt",
  "SALI": "Sal",
  "ÇARŞAMBA": "Çar",
  "PERŞEMBE": "Per",
  "CUMA": "Cum",
  "CUMARTESİ": "Cmt",
  "PAZAR": "Paz",
};

const DAY_LABEL = {
  "Pazartesi": "Pazartesi",
  "Salı": "Salı",
  "Çarşamba": "Çarşamba",
  "Perşembe": "Perşembe",
  "Cuma": "Cuma",
  "Cumartesi": "Cumartesi",
  "Pazar": "Pazar",
  "PZT": "Pazartesi",
  "SALI": "Salı",
  "ÇARŞAMBA": "Çarşamba",
  "PERŞEMBE": "Perşembe",
  "CUMA": "Cuma",
  "CUMARTESİ": "Cumartesi",
  "PAZAR": "Pazar",
};

/**
 * Pure-presentational top section of HybridView:
 *   brand bar + ProgramSelector + page tabs + day tabs (or compact chips).
 *
 * Extracted from HybridView.jsx lines 455–535 without behavior changes.
 */
export default function HybridHeader({
  programName,
  ProgramSelector,
  logout,
  page,
  setPage,
  showDayTabs,
  allDays,
  selectedDay,
  todaySub,
  todayIndex,
  handleDayChange,
  day,
  mode,
}) {
  const pageIndex = Math.max(0, PAGE_TABS.findIndex(([id]) => id === page));
  const currentPageLabel = PAGE_TABS[pageIndex]?.[1] || "Program";
  const prevPage = () => setPage(PAGE_TABS[(pageIndex - 1 + PAGE_TABS.length) % PAGE_TABS.length][0]);
  const nextPage = () => setPage(PAGE_TABS[(pageIndex + 1) % PAGE_TABS.length][0]);

  const prevDayIndex = (selectedDay - 1 + allDays.length) % allDays.length;
  const nextDayIndex = (selectedDay + 1) % allDays.length;
  const dayLabel = DAY_LABEL[day.sub] || day.sub;
  const dayType = day.type === "training" ? "Ana Gün" : "Off Day";
  const dayFocus = day.focus || "Bugünün akışı";

  return (
    <header className="hdr">
      <div className="hdr-top">
        <div className="brand">YEAHH BODY</div>
        <button className="logout-btn" onClick={logout}>Çıkış</button>
      </div>
      <div className="prog-title">{programName}</div>
      {ProgramSelector && <ProgramSelector />}

      <nav className="switcher-bar" aria-label="Ana sayfa bölümleri">
        <button type="button" className="switcher-nav-btn" data-testid="page-nav-prev" onClick={prevPage}>‹</button>
        <div className="switcher-main-btn" data-testid="page-nav-current">
          <span className="switcher-main-label">{currentPageLabel}</span>
        </div>
        <button type="button" className="switcher-nav-btn" data-testid="page-nav-next" onClick={nextPage}>›</button>
      </nav>

      {showDayTabs ? (
        <>
          <div className="switcher-bar switcher-bar-day" aria-label="Hafta günleri">
            <button
              type="button"
              className="switcher-nav-btn"
              data-testid="day-nav-prev"
              onClick={() => handleDayChange(prevDayIndex)}
            >
              ‹
            </button>

            <div
              className={`switcher-main-btn switcher-main-btn-day ${day.type === "training" ? "switcher-main-btn-training" : "switcher-main-btn-off"}`}
              data-testid="day-nav-current"
              data-day-key={day.sub}
            >
              <span className="switcher-main-label">{dayLabel}</span>
              <span className="switcher-meta-line">
                <span className="switcher-type">{dayType}</span>
                <span className="switcher-sep">·</span>
                <span className="switcher-focus">{dayFocus}</span>
                {day.sub === todaySub && <span className="switcher-today-dot" aria-hidden />}
              </span>
            </div>

            <button
              type="button"
              className="switcher-nav-btn"
              data-testid="day-nav-next"
              onClick={() => handleDayChange(nextDayIndex)}
            >
              ›
            </button>
          </div>

          {selectedDay !== todayIndex && (
            <div className="today-return-wrap">
              <button
                onClick={() => handleDayChange(todayIndex)}
                style={{ ...buttonBase }}
                className="today-return-btn"
              >
                📍 Bugünün programına dön · {todaySub}
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingTop: 8 }}>
          <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 999, padding: "6px 10px", fontSize: 11, color: "#fff", fontWeight: 700 }}>
            {day.sub}
          </div>
          <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 999, padding: "6px 10px", fontSize: 11, color: "#C4C4CC", fontWeight: 700 }}>
            {mode === "home" ? "Ev" : "Macfit"}
          </div>
          <div style={{ background: "#17171B", border: "1px solid #2A2A30", borderRadius: 999, padding: "6px 10px", fontSize: 11, color: "#C4C4CC", fontWeight: 700 }}>
            {page === "skill" ? "Skill" : page === "plan" ? "8 Hafta" : "Durum"}
          </div>
        </div>
      )}
    </header>
  );
}
