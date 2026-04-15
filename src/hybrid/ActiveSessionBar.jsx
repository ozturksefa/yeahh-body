/**
 * Fixed floating bottom bar that shows active workout status and a "Bitir"
 * shortcut. Rendered while the session is open or has input but not yet
 * marked complete. Extracted verbatim from HybridView.jsx; no behavior
 * changes.
 */
export default function ActiveSessionBar({
  visible,
  currentBlock,
  currentBlockProgress,
  elapsedSeconds,
  workoutStarted,
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
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 10, color: "#7A7A84", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>
            Aktif Seans
          </div>
          <div style={{ fontSize: 13, color: "#fff", fontWeight: 800, marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {currentBlock ? currentBlock.name : "Program akışı"}
          </div>
          <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 4, lineHeight: 1.4 }}>
            {subtitle}
          </div>
        </div>
        <button
          data-testid="checkout-jump-button"
          onClick={onJumpToCheckout}
          style={{
            border: "1px solid #D41920",
            background: "#D41920",
            color: "#fff",
            borderRadius: 10,
            padding: "10px 12px",
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Bitir
        </button>
      </div>
    </div>
  );
}
