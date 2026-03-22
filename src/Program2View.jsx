import { useState } from "react";
import { PROGRAM2 } from "./data2";
import BlockCard from "./BlockCard";

const DAY_TYPES = {
  training: { label: "Antrenman", icon: "🏋️" },
  offday: { label: "Off Day", icon: "🌿" },
};

function OffDayView({ day }) {
  return (
    <div style={{ padding: "0 0 24px" }}>
      <div className="day-hdr" style={{ borderColor: "#6C757D44", background: "#6C757D0D" }}>
        <div className="day-top">
          <div>
            <div className="day-focus" style={{ color: "#6C757D" }}>{day.focus}</div>
            <div className="day-meta">{day.duration} · Evde yapılabilir</div>
          </div>
          <div className="day-badge" style={{ background: "#6C757D" }}>{day.sub}</div>
        </div>
        <div style={{ fontSize: 12, color: "#aaa", marginTop: 6 }}>
          🏠 Ekipman gerektirmez — bant yeterli
        </div>
      </div>
      <main className="main">
        {day.blocks.map((block, bi) => (
          <OffBlock key={bi} block={block} />
        ))}
      </main>
    </div>
  );
}

function OffBlock({ block }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="block">
      <button className="block-head" onClick={() => setOpen(o => !o)}
        style={{ background: block.color }}>
        <div>
          <div className="block-name">{block.name}</div>
          <div className="block-count">{block.exercises.length} hareket</div>
        </div>
        <span style={{ color: "#fff", fontSize: 20, transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      {open && (
        <div className="block-body" style={{ borderColor: block.color + "44" }}>
          {block.exercises.map((ex, i) => (
            <OffExercise key={i} ex={ex} color={block.color} />
          ))}
        </div>
      )}
    </div>
  );
}

function OffExercise({ ex, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ex-wrap">
      <button className="ex-header" onClick={() => setOpen(o => !o)}
        style={{ borderLeft: `3px solid ${color}` }}>
        <div className="ex-left">
          <div className="ex-name">{ex.name}</div>
          <div className="ex-meta">
            <span className="ex-sets" style={{ background: color + "33", color }}>{ex.sets}</span>
            <span className="ex-muscle">{ex.muscle}</span>
          </div>
        </div>
        <span className="ex-toggle">{open ? "✕" : "+"}</span>
      </button>
      {open && (
        <div className="ex-body">
          <div className="section">
            <div className="section-label" style={{ color }}>YAPILIŞ</div>
            {ex.how.map((s, i) => (
              <div key={i} className="step">
                <span className="step-n" style={{ color }}>{i + 1}.</span>
                <span className="step-t">{s}</span>
              </div>
            ))}
          </div>
          {ex.avoid && <div className="avoid-box"><strong>✕ YAPMA: </strong>{ex.avoid}</div>}
          {ex.warn && <div className="warn-box">⚠ {ex.warn}</div>}
        </div>
      )}
    </div>
  );
}

function SkillTracker() {
  const LS_KEY = "yb_skill_levels";
  const [levels, setLevels] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch { return {}; }
  });

  const setLevel = (skill, level) => {
    const next = { ...levels, [skill]: level };
    setLevels(next);
    try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
  };

  return (
    <div className="skill-tracker">
      <div className="skill-tracker-title">🎯 Skill İlerleme</div>
      {Object.entries(PROGRAM2.skillPaths).map(([key, path]) => {
        const current = levels[key] || 1;
        const step = path.steps.find(s => s.level === current);
        const nextStep = path.steps.find(s => s.level === current + 1);
        return (
          <div key={key} className="skill-card">
            <div className="skill-card-header">
              <span className="skill-name">{path.name}</span>
              <span className="skill-level">Seviye {current}/{path.steps.length}</span>
            </div>
            <div className="skill-progress-bar">
              {path.steps.map(s => (
                <div key={s.level}
                  className={`skill-step ${s.level <= current ? "skill-step-done" : ""} ${s.level === current ? "skill-step-current" : ""}`}
                  onClick={() => setLevel(key, s.level)}
                />
              ))}
            </div>
            <div className="skill-current">
              <span className="skill-current-label">Şu an:</span>
              <span className="skill-current-name">{step?.name}</span>
              <span className="skill-current-target">{step?.target}</span>
            </div>
            {nextStep && (
              <div className="skill-next">
                <span className="skill-next-label">Sonraki:</span>
                <span className="skill-next-name">{nextStep.name} — {nextStep.target}</span>
              </div>
            )}
            <div className="skill-level-btns">
              <button onClick={() => setLevel(key, Math.max(1, current - 1))} disabled={current <= 1}>‹</button>
              <span>Seviye güncelle</span>
              <button onClick={() => setLevel(key, Math.min(path.steps.length, current + 1))} disabled={current >= path.steps.length}>›</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Program2View() {
  const trainingDays = PROGRAM2.days.filter(d => d.type === "training");
  const offDays = PROGRAM2.days.filter(d => d.type === "offday");
  const allDays = [...trainingDays, ...offDays];

  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedEx, setExpandedEx] = useState(null);
  const [showSkill, setShowSkill] = useState(false);

  const day = allDays[selectedDay];
  const isOff = day.type === "offday";

  return (
    <div>
      {/* Gün sekmeleri */}
      <div className="tabs" style={{ flexWrap: "wrap", gap: 4 }}>
        {trainingDays.map((d, i) => (
          <button key={i}
            className={`tab ${selectedDay === i ? "tab-active" : ""}`}
            style={selectedDay === i ? { background: d.color, borderColor: d.color } : {}}
            onClick={() => { setSelectedDay(i); setExpandedEx(null); }}>
            <div className="tab-t">{d.title}</div>
            <div className="tab-s">{d.sub}</div>
          </button>
        ))}
        {offDays.map((d, i) => (
          <button key={"off" + i}
            className={`tab ${selectedDay === trainingDays.length + i ? "tab-active" : ""}`}
            style={selectedDay === trainingDays.length + i ? { background: "#6C757D", borderColor: "#6C757D" } : {}}
            onClick={() => { setSelectedDay(trainingDays.length + i); setExpandedEx(null); }}>
            <div className="tab-t">{d.title}</div>
            <div className="tab-s">{d.sub}</div>
          </button>
        ))}
      </div>

      {/* Skill tracker toggle */}
      <div style={{ padding: "8px 12px 0" }}>
        <button className="skill-toggle-btn" onClick={() => setShowSkill(s => !s)}>
          {showSkill ? "✕ Skill Takibini Kapat" : "🎯 Skill İlerleme Takibi"}
        </button>
      </div>
      {showSkill && <div style={{ padding: "0 12px" }}><SkillTracker /></div>}

      {/* Off day */}
      {isOff ? (
        <OffDayView day={day} />
      ) : (
        <>
          <div className="day-hdr" style={{ borderColor: day.color + "44", background: day.color + "0D" }}>
            <div className="day-top">
              <div>
                <div className="day-focus" style={{ color: day.color }}>{day.focus}</div>
                <div className="day-meta">
                  {day.duration} · {day.blocks.reduce((a, b) => a + b.exercises.length, 0)} egzersiz
                </div>
              </div>
              <div className="day-badge" style={{ background: day.color }}>{day.sub}</div>
            </div>
            {day.injury && <div className="injury">{day.injury}</div>}
          </div>

          <main className="main">
            {day.blocks.map((block, bi) => (
              <BlockCard key={bi} block={block} blockIdx={bi}
                expandedEx={expandedEx}
                onExToggle={k => setExpandedEx(p => p === k ? null : k)}
                dayIndex={day.id - 1}
                onStartRest={() => {}}
                swaps={{}}
                onSwap={() => {}}
                forceOpen={false}
                workoutActive={false}
                isLastEx={false}
                onAllSetsDone={() => {}} />
            ))}
          </main>
        </>
      )}
    </div>
  );
}
