import { useState } from "react";

/**
 * Post-session AI coach card. Renders only when the user has completed the
 * daily checkout and a workout actually has tracked data. Tapping "Koç
 * Yorumu Al" sends a structured session summary to the /api/ai Netlify
 * function (Anthropic proxy) and streams back a 2-3 sentence Turkish
 * recap with one progression suggestion for the next same-pattern day.
 *
 * Storage: caches the latest response under yb_ai_coach_{entryKey} so
 * reopening the day doesn't re-consume tokens. Clearing cache requires
 * a manual "Yeniden al" tap.
 */
export default function AiCoachCard({ entryKey, entry, workoutSnapshot, dayName }) {
  const cacheKey = `yb_ai_coach_${entryKey}`;
  const [response, setResponse] = useState(() => {
    try { return localStorage.getItem(cacheKey) || ""; } catch { return ""; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!entry?.post?.completed) return null;

  const exerciseLines = Object.entries(workoutSnapshot?.exercises || {})
    .map(([name, sets]) => {
      if (!Array.isArray(sets) || sets.length === 0) return null;
      const done = sets.filter((s) => s.done);
      if (done.length === 0) return null;
      const topWeight = Math.max(...done.map((s) => Number(s.weight || 0)));
      const reps = done.map((s) => s.reps || 0).join("/");
      return `- ${name}: ${done.length} set · ${topWeight > 0 ? `${topWeight}kg max` : "BW"} · reps ${reps}`;
    })
    .filter(Boolean);

  const fetchCoachNote = async () => {
    setLoading(true);
    setError("");
    try {
      const summary = [
        `GÜN: ${dayName || "—"}`,
        `ENERJİ: ${entry.pre?.energy || "—"} · UYKU: ${entry.pre?.sleep || "—"}`,
        `PRE semptom (0-5): omuz ${entry.pre?.shoulder || 0} · diz ${entry.pre?.knee || 0} · bel ${entry.pre?.spine || 0}`,
        `POST RPE: ${entry.post?.rpe || "—"} · KARDİYO: ${entry.post?.cardio || "—"} · SONRAKİ: ${entry.post?.nextAction || "—"}`,
        `POST semptom: omuz ${entry.post?.shoulderAfter || 0} · diz ${entry.post?.kneeAfter || 0} · bel ${entry.post?.spineAfter || 0}`,
        "",
        "TAMAMLANAN HAREKETLER:",
        ...exerciseLines,
      ].join("\n");

      const body = {
        model: "claude-sonnet-4-5",
        max_tokens: 400,
        messages: [
          {
            role: "user",
            content: `Aşağıda bir antrenman seansının özeti var. Programın kısıtları: menisküs (koşu/zıplama yok), rotator cuff (dip/overhead kısıtlı), bel-boyun fıtığı (nötral omurga şart), skolyoz+kifoz (pull 2:1 öncelik). RPE 6-8 bandında kalır, failure yok. Türkçe, 3-4 cümlelik somut koç yorumu yaz. Sırayla: (1) bugün ne iyi gitti, (2) bir risk/dikkat noktası, (3) bir sonraki aynı paternli günde tek somut progresyon önerisi (ağırlık, tempo veya rep). Aşırı yorumlama yapma; veri az ise "emin değilim ama" diye başla.\n\n${summary}`,
          },
        ],
      };

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const text = data?.content?.[0]?.text?.trim();
      if (!text) throw new Error("AI'dan boş yanıt geldi");

      setResponse(text);
      try { localStorage.setItem(cacheKey, text); } catch { /* ignore */ }
    } catch (e) {
      setError(e.message || "Koç yorumu alınamadı");
    } finally {
      setLoading(false);
    }
  };

  const clearCache = () => {
    setResponse("");
    setError("");
    try { localStorage.removeItem(cacheKey); } catch { /* ignore */ }
  };

  return (
    <div className="ai-coach-card">
      <div className="ai-coach-head">
        <span className="ai-coach-icon">🧠</span>
        <div>
          <div className="ai-coach-title">Koç Yorumu</div>
          <div className="ai-coach-sub">Seans verisinden kısa geri bildirim.</div>
        </div>
      </div>

      {response && (
        <div className="ai-coach-body">
          {response.split(/\n\n+/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {error && <div className="ai-coach-error">{error}</div>}

      <div className="ai-coach-actions">
        {!response && !loading && (
          <button type="button" className="ai-coach-primary" onClick={fetchCoachNote}>
            Koç Yorumu Al
          </button>
        )}
        {loading && (
          <button type="button" className="ai-coach-primary" disabled>
            Hazırlanıyor…
          </button>
        )}
        {response && !loading && (
          <button type="button" className="ai-coach-secondary" onClick={clearCache}>
            Yeniden al
          </button>
        )}
      </div>
    </div>
  );
}
