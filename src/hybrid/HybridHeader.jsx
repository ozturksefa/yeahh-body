import { buttonBase } from "./shared";

const PAGE_TABS = [
  ["program", "Program"],
  ["history", "📋 Geçmiş"],
  ["skill", "🎯 Skill"],
  ["plan", "8 Hafta"],
  ["status", "📊 Durum"],
  ["nutrition", "🍽 Beslenme"],
];

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
  return (
    <header className="hdr">
      <div className="hdr-top">
        <div className="brand">YEAHH BODY</div>
        <button className="logout-btn" onClick={logout}>Çıkış</button>
      </div>
      <div className="prog-title">{programName}</div>
      {ProgramSelector && <ProgramSelector />}

      <nav className="page-nav" role="tablist" aria-label="Ana sayfa bölümleri">
        {PAGE_TABS.map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={page === id}
            aria-label={label.replace(/[^\p{L}\p{N}\s]/gu, "").trim()}
            data-testid={`page-tab-${id}`}
            className={`page-tab ${page === id ? "page-tab-active" : ""}`}
            onClick={() => setPage(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {showDayTabs ? (
        <>
          <div className="tabs" aria-label="Hafta günleri">
            {allDays.map((item, index) => (
              <button
                key={item.sub}
                aria-pressed={selectedDay === index}
                className={`tab ${selectedDay === index ? "tab-active" : ""}`}
                style={selectedDay === index ? { background: item.color } : item.sub === todaySub ? { boxShadow: "inset 0 0 0 1px rgba(79,195,247,.55)" } : {}}
                onClick={() => handleDayChange(index)}
              >
                <div className="tab-t">{item.sub.slice(0, 3)}</div>
                <div className="tab-s">{item.sub === todaySub ? "Bugün" : item.type === "training" ? "Ana Gün" : "Off"}</div>
              </button>
            ))}
          </div>

          {selectedDay !== todayIndex && (
            <div style={{ paddingTop: 8 }}>
              <button
                onClick={() => handleDayChange(todayIndex)}
                style={{
                  ...buttonBase,
                  width: "100%",
                  background: "rgba(79,195,247,.1)",
                  borderColor: "rgba(79,195,247,.32)",
                  color: "#fff",
                  padding: "10px 12px",
                  fontSize: 12,
                }}
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
