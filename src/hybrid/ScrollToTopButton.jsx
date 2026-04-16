import { useEffect, useState } from "react";

/**
 * Small floating "back to top" button. Appears after the user has scrolled
 * past a threshold, smooth-scrolls the window to the top on tap, and sits
 * in the bottom-right so it never obscures the centered ActiveSessionBar.
 *
 * `liftAboveBar` adds enough offset to clear the ~80px bottom bar, so the
 * caller can signal "there is a bar here right now" without us having to
 * measure layout.
 */
export default function ScrollToTopButton({ liftAboveBar = false, threshold = 400 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  if (!visible) return null;

  const bottom = liftAboveBar ? 104 : 20;

  return (
    <button
      type="button"
      className="scroll-top-btn"
      aria-label="Sayfanın en üstüne dön"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ bottom: `calc(${bottom}px + env(safe-area-inset-bottom, 0px))` }}
    >
      <span aria-hidden>↑</span>
    </button>
  );
}
