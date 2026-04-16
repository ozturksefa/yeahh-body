import { useEffect } from "react";
import { acknowledgeMilestone } from "./motivationalBeats";

/**
 * Full-screen cinematic takeover for major milestones. Kicks in after a
 * workout finishes and detectMilestone() returns a hit. Visual language
 * is typography + beat-based reveals — no video asset, no music
 * (autoplay is blocked anyway and pushing sound on someone mid-session
 * would be obnoxious).
 *
 * Beats (all via CSS keyframes):
 *   0.00s — black fade in
 *   0.15s — kicker text fades up from the bottom
 *   0.35s — big number/word burst (scale 0 → 1.15 → 1)
 *   0.75s — meta line slides up
 *   1.05s — disciplined-tone line types/fades in
 *   1.40s — "Devam et →" button appears
 *
 * Dismiss: tap the button, tap backdrop, or Escape. On dismiss the
 * milestone id is marked seen so the same screen won't reopen.
 */
export default function CinematicMoment({ milestone, onDismiss }) {
  useEffect(() => {
    if (!milestone) return undefined;

    // Light haptic on devices that support it.
    if (navigator.vibrate) {
      try { navigator.vibrate([40, 60, 80]); } catch { /* ignore */ }
    }

    const onKey = (event) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [milestone]);

  if (!milestone) return null;

  const close = () => {
    acknowledgeMilestone(milestone.id);
    onDismiss();
  };

  return (
    <div className="cine-backdrop" role="dialog" aria-modal="true" aria-label={milestone.big} onClick={close}>
      <div className="cine-inner" onClick={(e) => e.stopPropagation()}>
        <div className="cine-kicker">{milestone.kicker}</div>
        <div className="cine-big">{milestone.big}</div>
        {milestone.meta && <div className="cine-meta">{milestone.meta}</div>}
        <div className="cine-rule" aria-hidden />
        {milestone.line && <div className="cine-line">{milestone.line}</div>}
        <button type="button" className="cine-dismiss" onClick={close}>
          Devam et →
        </button>
      </div>
    </div>
  );
}
