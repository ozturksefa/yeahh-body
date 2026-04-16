import { useEffect, useState } from "react";

const DISMISS_KEY = "yb_install_dismissed_at";
const DISMISS_DAYS = 14;

/**
 * Small install-PWA prompt that appears:
 *   - Only once Chrome/Edge fires beforeinstallprompt (the browser's own
 *     signal that the site meets install criteria).
 *   - Not at all if the user already dismissed it within the last 14 days.
 *   - Not at all if already running as an installed PWA.
 *
 * Safari doesn't fire beforeinstallprompt, so iOS users won't see this.
 * For them, a separate "Add to Home Screen" hint could be added later.
 */
export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null);
  const [hidden, setHidden] = useState(() => {
    try {
      const last = Number(localStorage.getItem(DISMISS_KEY) || 0);
      if (!last) return false;
      const ageDays = (Date.now() - last) / (1000 * 60 * 60 * 24);
      return ageDays < DISMISS_DAYS;
    } catch { return false; }
  });

  useEffect(() => {
    // Already installed — standalone matchMedia is the cross-browser check.
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setHidden(true);
      return undefined;
    }
    const onBeforeInstall = (event) => {
      event.preventDefault();
      setDeferred(event);
    };
    const onAppInstalled = () => {
      setDeferred(null);
      setHidden(true);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  if (hidden || !deferred) return null;

  const install = async () => {
    try {
      deferred.prompt();
      await deferred.userChoice;
    } finally {
      setDeferred(null);
    }
  };

  const dismiss = () => {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch { /* ignore */ }
    setHidden(true);
  };

  return (
    <div className="install-prompt" role="dialog" aria-label="Uygulamayı yükle">
      <div className="install-prompt-body">
        <div className="install-prompt-title">📲 Uygulamayı yükle</div>
        <div className="install-prompt-sub">
          Ana ekrana ekle — spor salonunda wifi olmadan da açılır.
        </div>
      </div>
      <div className="install-prompt-actions">
        <button type="button" className="install-prompt-dismiss" onClick={dismiss} aria-label="Sonra hatırlat">
          Sonra
        </button>
        <button type="button" className="install-prompt-install" onClick={install}>
          Yükle
        </button>
      </div>
    </div>
  );
}
