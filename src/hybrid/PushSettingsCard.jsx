import { useEffect, useState } from "react";
import {
  getExistingSubscription,
  isPushSupported,
  notificationPermission,
  subscribeToPush,
  unsubscribeFromPush,
} from "../pushSubscription";

/**
 * Opt-in push notification control. Deliberately minimal — the whole
 * UX goal is "tap once, get a sensible reminder on training mornings,
 * forget about it".
 *
 * Rendered inside SupportDrawer so it doesn't clutter the main flow.
 * Hidden entirely on unsupported browsers (iOS Safari in regular
 * browsing mode, etc.) so the user isn't promised something that
 * won't work.
 */
export default function PushSettingsCard() {
  const [state, setState] = useState("loading"); // loading | off | on | unsupported | denied
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isPushSupported()) {
        if (!cancelled) setState("unsupported");
        return;
      }
      const perm = notificationPermission();
      if (perm === "denied") {
        if (!cancelled) setState("denied");
        return;
      }
      const existing = await getExistingSubscription();
      if (!cancelled) setState(existing ? "on" : "off");
    })();
    return () => { cancelled = true; };
  }, []);

  if (state === "unsupported") return null;

  const toggle = async () => {
    setError("");
    setBusy(true);
    try {
      if (state === "on") {
        await unsubscribeFromPush();
        setState("off");
      } else {
        await subscribeToPush();
        setState("on");
      }
    } catch (e) {
      setError(e.message || "Bildirim ayarlanamadı");
      // Re-read permission in case the user denied in the browser prompt.
      if (notificationPermission() === "denied") setState("denied");
    } finally {
      setBusy(false);
    }
  };

  const label =
    state === "on" ? "Bildirimler açık" :
    state === "denied" ? "Tarayıcıdan bildirim kapalı" :
    "Bildirimler kapalı";
  const buttonLabel =
    busy ? "İşleniyor…" :
    state === "on" ? "Kapat" :
    state === "denied" ? "Tarayıcı ayarları" :
    "Aç";
  const buttonVariant = state === "on" ? "secondary" : "primary";

  return (
    <div className="push-card">
      <div className="push-card-head">
        <span className="push-card-icon" aria-hidden>🔔</span>
        <div>
          <div className="push-card-title">Günlük antrenman hatırlatması</div>
          <div className="push-card-sub">
            Antrenman günü sabahı kısa bildirim. Off günler sessiz.
          </div>
        </div>
      </div>

      <div className="push-card-row">
        <div className="push-card-status">
          <span className={`push-dot push-dot-${state}`} aria-hidden />
          <span>{label}</span>
        </div>
        <button
          type="button"
          className={`push-btn push-btn-${buttonVariant}`}
          onClick={state === "denied"
            ? () => alert("Tarayıcının site ayarlarından bildirimlere izin ver, sonra yeniden dene.")
            : toggle}
          disabled={busy}
        >
          {buttonLabel}
        </button>
      </div>

      {error && <div className="push-card-error">{error}</div>}
    </div>
  );
}
