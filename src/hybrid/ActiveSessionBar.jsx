/**
 * Fixed floating bottom bar — primary action surface during a workout.
 * Shows the block/exercise the user should be working on, the clock, and
 * two shortcut buttons:
 *   1. "Sonraki →" — jumps focus to the next unfinished exercise
 *      (previously lived in a separate NextStepButton card).
 *   2. "Bitir" — scrolls to the checkout panel.
 */
export default function ActiveSessionBar({
  visible,
  currentExercise,
  currentBlock,
  currentBlockProgress,
  elapsedSeconds,
  workoutStarted,
  nextStepHint,
  onNextStep,
  onJumpToCheckout,
}) {
  if (!visible) return null;

  const clock = `${String(Math.floor(elapsedSeconds / 60)).padStart(2, "0")}:${String(elapsedSeconds % 60).padStart(2, "0")}`;
  const movementText = currentBlockProgress
    ? `${currentBlockProgress.completed || 0}/${currentBlockProgress.total || 0} hareket`
    : "devam ediyor";
  const subtitle = workoutStarted
    ? `${clock} · ${movementText}`
    : "Set girdin, seansı kapatmayı unutma";

  const primaryText = currentExercise?.exerciseName
    || currentBlock?.name
    || "Program akışı";
  const secondaryText = currentExercise?.blockName && currentExercise.blockName !== primaryText
    ? currentExercise.blockName
    : null;
  const upcomingText = nextStepHint?.exerciseName || null;

  const canAdvance = !!nextStepHint;

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        bottom: 14,
        transform: "translateX(-50%)",
        width: "min(456px, calc(100vw - 24px))",
        background: "#131316",
        color: "#fff",
        border: "1px solid #2A2A30",
        borderRadius: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        zIndex: 90,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 12px 8px" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 10, color: "#7A7A84", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>
            Aktif Görev
          </div>
          <div style={{ fontSize: 13, color: "#fff", fontWeight: 800, marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {primaryText}
          </div>
          {secondaryText && (
            <div style={{ fontSize: 11, color: "#9EA2AA", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {secondaryText}
            </div>
          )}
          <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 4, lineHeight: 1.4 }}>
            {subtitle}
          </div>
          {upcomingText && (
            <div style={{ fontSize: 11, color: "#7CC7FF", marginTop: 4, lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Sıradaki: {upcomingText}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
          <button
            data-testid="next-step-button"
            onClick={() => onNextStep?.()}
            disabled={!canAdvance}
            style={{
              border: "1px solid rgba(79,195,247,.55)",
              background: canAdvance ? "rgba(79,195,247,.14)" : "rgba(79,195,247,.06)",
              color: canAdvance ? "#fff" : "#7A7A84",
              borderRadius: 10,
              padding: "8px 12px",
              fontSize: 12,
              fontWeight: 800,
              cursor: canAdvance ? "pointer" : "default",
              minWidth: 108,
            }}
          >
            {canAdvance ? "Sonraki Hareket →" : "Sıradaki Yok"}
          </button>
          <button
            data-testid="checkout-jump-button"
            onClick={onJumpToCheckout}
            style={{
              border: "1px solid #D41920",
              background: "#D41920",
              color: "#fff",
              borderRadius: 10,
              padding: "8px 12px",
              fontSize: 12,
              fontWeight: 800,
              cursor: "pointer",
              minWidth: 108,
            }}
          >
            Bitir
          </button>
        </div>
      </div>
    </div>
  );
}
