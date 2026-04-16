import { useState } from "react";
import {
  getPlaylistFor,
  parsePlaylistId,
  playlistEmbedUrl,
  playlistMusicUrl,
  playlistSearchUrl,
  playlistWatchUrl,
  savePlaylistOverride,
} from "./workoutPlaylists";

/**
 * Per-day workout playlist card. Three modes:
 *   - Collapsed (default): mood + BPM + vibe, plus three action buttons
 *     (Aç inline, YT Music, YouTube).
 *   - Expanded: an embedded youtube-nocookie playlist iframe with a
 *     close handle.
 *   - Editing: a small form where the user pastes their own YouTube
 *     playlist URL; validated with parsePlaylistId and persisted to
 *     localStorage. Reset button clears the override.
 *
 * All state is local — no HybridView wiring needed. Re-reads the
 * override each time it mounts so the paired-day view picks up changes.
 */
export default function PlaylistCard({ dayName }) {
  const [tick, setTick] = useState(0); // bump to force re-fetch of override
  const entry = getPlaylistFor(dayName);
  const [mode, setMode] = useState("collapsed"); // collapsed | open | editing
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  const saveOverride = () => {
    const id = parsePlaylistId(draft);
    if (!id) {
      setError("Geçerli bir YouTube playlist URL'i veya ID bekliyorum.");
      return;
    }
    savePlaylistOverride(dayName, id);
    setDraft("");
    setError("");
    setMode("open");
    setTick((t) => t + 1);
  };

  const clearOverride = () => {
    savePlaylistOverride(dayName, null);
    setDraft("");
    setError("");
    setTick((t) => t + 1);
  };

  // Use `tick` so the effect of override changes is visible without a
  // full page reload.
  void tick;

  return (
    <div className="playlist-card" data-day={dayName}>
      <div className="playlist-card-head">
        <div className="playlist-card-icon" aria-hidden>🎵</div>
        <div className="playlist-card-body">
          <div className="playlist-card-title">
            Bugünün listesi
            {entry.overridden && <span className="playlist-card-badge">özel</span>}
          </div>
          <div className="playlist-card-mood">{entry.mood}</div>
          <div className="playlist-card-meta">
            <span>{entry.bpm}</span>
            <span>·</span>
            <span>{entry.vibe}</span>
          </div>
        </div>
      </div>

      {mode === "open" && (
        <div className="playlist-embed-wrap">
          <iframe
            className="playlist-embed"
            src={playlistEmbedUrl(entry.playlistId)}
            title={`${dayName} playlist`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {mode === "editing" && (
        <div className="playlist-edit">
          <label htmlFor={`pl-${dayName}`} className="playlist-edit-label">
            YouTube playlist URL'i veya ID'si
          </label>
          <input
            id={`pl-${dayName}`}
            type="url"
            placeholder="https://www.youtube.com/playlist?list=PL..."
            value={draft}
            onChange={(event) => { setDraft(event.target.value); setError(""); }}
            className="playlist-edit-input"
            autoComplete="off"
          />
          {error && <div className="playlist-edit-error">{error}</div>}
          <div className="playlist-edit-actions">
            <button type="button" className="playlist-btn playlist-btn-ghost" onClick={() => { setMode("collapsed"); setError(""); setDraft(""); }}>
              Vazgeç
            </button>
            {entry.overridden && (
              <button type="button" className="playlist-btn playlist-btn-ghost" onClick={clearOverride}>
                Sıfırla
              </button>
            )}
            <button type="button" className="playlist-btn playlist-btn-primary" onClick={saveOverride} disabled={!draft.trim()}>
              Kaydet
            </button>
          </div>
        </div>
      )}

      <div className="playlist-card-actions">
        {mode !== "open" ? (
          <button type="button" className="playlist-btn playlist-btn-primary" onClick={() => setMode("open")}>
            ▶ Aç
          </button>
        ) : (
          <button type="button" className="playlist-btn playlist-btn-ghost" onClick={() => setMode("collapsed")}>
            Kapat
          </button>
        )}

        <a
          href={playlistMusicUrl(entry.playlistId)}
          target="_blank"
          rel="noopener noreferrer"
          className="playlist-btn playlist-btn-secondary"
          aria-label="YouTube Music'te aç"
        >
          🎧 YT Music
        </a>

        <a
          href={playlistWatchUrl(entry.playlistId)}
          target="_blank"
          rel="noopener noreferrer"
          className="playlist-btn playlist-btn-secondary"
          aria-label="YouTube'da aç"
        >
          YouTube
        </a>

        {mode !== "editing" && (
          <button
            type="button"
            className="playlist-btn playlist-btn-ghost"
            onClick={() => setMode("editing")}
            aria-label="Kendi playlist'ini ekle"
            title="Kendi playlist'ini ekle"
          >
            ⚙
          </button>
        )}
      </div>

      {!entry.overridden && (
        <a
          href={playlistSearchUrl(entry.searchQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="playlist-card-fallback"
        >
          Beğenmedin mi? YouTube'da benzerini ara →
        </a>
      )}
    </div>
  );
}
