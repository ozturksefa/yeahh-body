import { useState, useRef } from "react";
import { calcExerciseCalories, calcBlockCalories, getUserWeight } from "./calorieCalc";
import ExerciseGif from "./Gif";
import SetTracker from "./SetTracker";
import ExerciseNote from "./ExerciseNote";
import SkillTimer from "./SkillTimer";
import ErrorBoundary from "./ErrorBoundary";

function ExerciseCard({ ex, blockColor, isOpen, onToggle, dayIndex, blockName, onStartRest, swaps, onSwap, onAdvance, workoutActive, isLastEx, onAllSetsDone }) {
  const cardRef = useRef(null);
  const originalName = ex.name;
  const swappedName = swaps?.[originalName] || null;
  const displayName = swappedName || originalName;

  const handleToggle = () => {
    const wasOpen = isOpen;
    onToggle();
    if (!wasOpen) {
      // Wait for DOM to settle (old exercise closes + new one opens)
      setTimeout(() => {
        if (cardRef.current) {
          const headerHeight = document.querySelector('.hdr')?.offsetHeight || 0;
          const cardTop = cardRef.current.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: cardTop - headerHeight - 8, behavior: "smooth" });
        }
      }, 80);
    }
  };

  const handleSwap = (altName) => {
    onSwap(originalName, altName);
  };

  const handleRevert = () => {
    onSwap(originalName, null);
  };

  return (
    <div className="ex-wrap" ref={cardRef}>
      <button className="ex-header" onClick={handleToggle}
        style={{ borderLeft: `3px solid ${blockColor}` }}>
        <div className="ex-left">
          <div className="ex-name">
            {displayName}
            {swappedName && <span className="swap-badge">🔄</span>}
            {ex.warn && /ROTATOR CUFF|DİZ:|BEL FITIĞI|BOYUN FITIĞI|🔴|🟡/i.test(ex.warn) && !swappedName && (
              <span className="injury-badge">⚠️</span>
            )}
          </div>
          <div className="ex-meta">
            <span className="ex-sets" style={{ background: blockColor + "33", color: blockColor }}>{ex.sets}</span>
            <span className="ex-muscle">{ex.muscle}</span>
            {(() => {
              const w = getUserWeight();
              const { kcal } = calcExerciseCalories(ex, w);
              return kcal > 0 ? <span className="ex-kcal">~{kcal} kcal</span> : null;
            })()}
          </div>
        </div>
        <span className="ex-toggle">{isOpen ? "✕" : "+"}</span>
      </button>

      {isOpen && (
        <div className="ex-body">

          {swappedName && (
            <div className="swap-info">
              <span className="swap-info-text">🔄 <strong>{originalName}</strong> yerine kullanılıyor</span>
              <button className="swap-revert" onClick={handleRevert}>Orijinaline Dön</button>
            </div>
          )}

          <ExerciseGif name={displayName} />

          <SetTracker ex={ex} dayIndex={dayIndex} blockName={blockName} onStartRest={onStartRest} onAllDone={onAllSetsDone} />
          {/* Timed skill hareketler için timer */}
          {(() => {
            const timedMatch = ex.sets.match(/\d+\s*[×x]\s*(\d+)\s*sn/i);
            if (!timedMatch) return null;
            const isSkill = /dead hang|chin.up|pull.up|dip|plank|tuck|hollow|l.sit|parallel bar|support hold|ab wheel/i.test(ex.name);
            if (!isSkill) return null;
            return <SkillTimer exerciseName={ex.name} targetSeconds={parseInt(timedMatch[1])} />;
          })()}
          <ExerciseNote exerciseName={displayName} />

          <div className="section">
            <div className="section-label" style={{ color: blockColor }}>YAPILIŞ</div>
            {ex.how.map((s, i) => (
              <div key={i} className="step">
                <span className="step-n" style={{ color: blockColor }}>{i + 1}.</span>
                <span className="step-t">{s}</span>
              </div>
            ))}
          </div>

          {ex.avoid && (
            <div className="avoid-box">
              <strong>✕ YAPMA: </strong>{ex.avoid}
            </div>
          )}
          {ex.warn && (
            <div className={/ROTATOR CUFF|DİZ:|SKOLYOZ|BEL FITIĞI|BOYUN FITIĞI|🔴|🟡/i.test(ex.warn) ? "warn-box warn-box-injury" : "warn-box"}>
              ⚠ {ex.warn}
            </div>
          )}
          {ex.alts?.length > 0 && (
            <div className="section">
              <div className="section-label" style={{ color: "var(--purple)" }}>ALTERNATİF — seç ve değiştir</div>
              {ex.alts.map((a, i) => {
                const isActive = swappedName === a;
                const reason = ex.alt_reasons?.[i];
                return (
                  <button key={i} className={`alt-btn ${isActive ? "alt-btn-active" : ""}`}
                    onClick={() => isActive ? handleRevert() : handleSwap(a)}>
                    <div className="alt-btn-inner">
                      <div className="alt-btn-top">
                        <span className="alt-n">{isActive ? "✓" : `${i + 1}.`}</span>
                        <span className="alt-name">{a}</span>
                        <span className="alt-action">{isActive ? "Geri Al" : "Seç"}</span>
                      </div>
                      {reason && <div className="alt-reason">{reason}</div>}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BlockCard({ block, blockIdx, expandedEx, onExToggle, dayIndex, onStartRest, swaps, onSwap, forceOpen, onAdvance, isLastEx, workoutActive, onAllSetsDone }) {
  const [manualOpen, setManualOpen] = useState(false);
  const open = forceOpen || manualOpen;
  return (
    <div className="block">
      <button className="block-head" onClick={() => setManualOpen(o => !o)} style={{ background: block.color }}>
        <div>
          <div className="block-name">{block.name}</div>
          <div className="block-count">
            {block.exercises.length} hareket
            {(() => {
              const w = getUserWeight();
              const { kcal, durationMin } = calcBlockCalories(block, w);
              return kcal > 0 ? <span className="block-kcal"> · ~{kcal} kcal · ~{durationMin}dk</span> : null;
            })()}
          </div>
        </div>
        <span style={{ color: "#fff", fontSize: 20, transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      {open && (
        <div className="block-body" style={{ borderColor: block.color + "44" }}>
          {block.exercises.map((ex, ei) => {
            const key = `${blockIdx}-${ei}`;
            return (
              <ErrorBoundary key={key}>
                <ExerciseCard ex={ex} blockColor={block.color}
                  isOpen={expandedEx === key}
                  onToggle={() => onExToggle(key)}
                  dayIndex={dayIndex}
                  blockName={block.name}
                  onStartRest={onStartRest}
                  swaps={swaps}
                  onSwap={onSwap}
                  onAdvance={onAdvance}
                  workoutActive={workoutActive}
                  isLastEx={isLastEx && ei === block.exercises.length - 1}
                  onAllSetsDone={expandedEx === key ? onAllSetsDone : null} />
              </ErrorBoundary>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BlockCard;
