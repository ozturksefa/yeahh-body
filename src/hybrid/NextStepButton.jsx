/**
 * "Sonraki Adım" deeplink button — scrolls to the next unfinished exercise.
 * Returns null when there is no hint to show.
 * Extracted verbatim from HybridView.jsx; no behavior changes.
 */
export default function NextStepButton({ hint, onJump }) {
  if (!hint) return null;

  return (
    <div style={{ padding: "0 12px 12px" }}>
      <button
        data-testid="next-step-button"
        onClick={() => onJump(hint)}
        style={{
          width: "100%",
          background: "rgba(79,195,247,.08)",
          border: "1px solid rgba(79,195,247,.24)",
          borderRadius: 12,
          padding: "12px 14px",
          color: "#fff",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <div style={{ fontSize: 10, color: "#4FC3F7", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>
          Sonraki Adım
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginTop: 4 }}>
          {hint.blockName} · {hint.exerciseName}
        </div>
        <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 4, lineHeight: 1.45 }}>
          Kaldığın veya başlaman gereken harekete dön.
        </div>
      </button>
    </div>
  );
}
