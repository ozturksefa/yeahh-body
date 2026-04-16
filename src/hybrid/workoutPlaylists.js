// ═══ Workout playlists ═══
// Per-day mood + BPM + genre guidance matched to the Hibrit program's
// intent. Tone: Rocky montage + CBum hardstyle + disciplined grind.
//
// IMPORTANT: We don't ship hard-coded YouTube playlist IDs — curated
// links go stale (channels delete, playlists go private, IDs invalidate)
// and the "Video unavailable" UX that comes with a dead embed is worse
// than no embed at all. Instead the default card shows a rich search
// query ready to run, and the user pastes their own preferred playlist
// ID via the ⚙ editor. Overrides persist in localStorage per day.
//
// Each entry has:
//   - mood:      one-line descriptor shown on the card
//   - bpm:       tempo window so the user knows what to expect
//   - vibe:      genre shorthand
//   - searchQuery: opens YouTube search for the same mood — primary
//                  "Aç" action when no override is set
//
// When the user saves an override, playlistId becomes the base for
// the inline iframe embed + the YT Music / YouTube links.

const PL = (mood, bpm, vibe, searchQuery) => ({
  mood, bpm, vibe, searchQuery, playlistId: null,
});

export const WORKOUT_PLAYLISTS = {
  PAZARTESİ: PL(
    "Aktif recovery · yürüyüş temposu",
    "100-120 BPM",
    "Chill hip-hop / Lo-fi beats",
    "chill hip hop lofi beats for walking workout playlist",
  ),

  SALI: PL(
    "Pull + Press · anaerobik interval",
    "130-150 BPM",
    "Hardstyle + Phonk (CBum vibe)",
    "cbum hardstyle phonk gym workout playlist 1 hour",
  ),

  ÇARŞAMBA: PL(
    "Support skill · yumuşak odak",
    "80-100 BPM",
    "Instrumental focus / Deep ambient",
    "deep focus instrumental ambient playlist 1 hour",
  ),

  PERŞEMBE: PL(
    "Lower control · steady grind",
    "120-135 BPM",
    "Aggressive hip-hop + rap",
    "aggressive hip hop rap gym workout playlist hardcore",
  ),

  CUMA: PL(
    "Mobilite · hazırlık modu",
    "95-115 BPM",
    "Uplifting electronic",
    "uplifting electronic warm up running playlist",
  ),

  CUMARTESİ: PL(
    "Ana hacim günü · Rocky montage vibe",
    "125-145 BPM",
    "Rocky IV + 80s training + rock",
    "rocky training montage workout playlist eye of the tiger full",
  ),

  PAZAR: PL(
    "Zone 2 · uzun süre odak",
    "115-130 BPM",
    "Deep house / progressive",
    "deep house progressive running zone 2 long workout playlist",
  ),
};

const OVERRIDE_KEY = (dayName) => `yb_playlist_override_${dayName}`;

export function getPlaylistFor(dayName) {
  const base = WORKOUT_PLAYLISTS[dayName] || WORKOUT_PLAYLISTS.SALI;
  // Per-day user override — stored as a YouTube playlist ID the user
  // pasted in. Merges over the curated entry so mood/bpm captions
  // still show even when the URL is customised.
  try {
    const override = localStorage.getItem(OVERRIDE_KEY(dayName));
    if (override) return { ...base, playlistId: override, overridden: true };
  } catch {
    /* localStorage unavailable — ignore */
  }
  return base;
}

export function savePlaylistOverride(dayName, playlistId) {
  if (!playlistId) {
    try { localStorage.removeItem(OVERRIDE_KEY(dayName)); } catch { /* ignore */ }
    return;
  }
  try { localStorage.setItem(OVERRIDE_KEY(dayName), playlistId); } catch { /* ignore */ }
}

// Parse a user-provided YouTube URL (or raw ID) and return a clean
// playlist ID, or null if it doesn't look valid.
export function parsePlaylistId(input) {
  if (!input) return null;
  const trimmed = String(input).trim();
  if (!trimmed) return null;

  // Already a bare ID?
  if (/^PL[A-Za-z0-9_-]{10,}$/.test(trimmed) || /^[A-Za-z0-9_-]{15,}$/.test(trimmed)) {
    // Heuristic — playlists usually start with PL/UU/OL/FL/RD/LL but we
    // don't want to over-reject. Strip any leading "list=" prefix first.
  }

  try {
    const cleaned = trimmed.startsWith("list=") ? trimmed.slice(5) : trimmed;
    // URL extraction
    const asUrl = cleaned.includes("://") ? new URL(cleaned) : null;
    if (asUrl) {
      const fromQuery = asUrl.searchParams.get("list");
      if (fromQuery) return fromQuery;
    }
    // Query-string-only ("list=PLxxx")
    const match = cleaned.match(/list=([A-Za-z0-9_-]+)/);
    if (match) return match[1];
    // Bare token
    if (/^[A-Za-z0-9_-]{15,}$/.test(cleaned)) return cleaned;
  } catch {
    /* fallthrough */
  }
  return null;
}

export function playlistEmbedUrl(playlistId) {
  return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&modestbranding=1&rel=0`;
}

export function playlistWatchUrl(playlistId) {
  return `https://www.youtube.com/playlist?list=${playlistId}`;
}

export function playlistMusicUrl(playlistId) {
  // YouTube Music reuses the same playlist IDs for user-created / public
  // playlists. Open in YT Music app/web if the user is an aboné.
  return `https://music.youtube.com/playlist?list=${playlistId}`;
}

export function playlistSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

// YouTube Music search URL — on mobile with YT Music installed this
// deep-links into the native app; on desktop/web it opens
// music.youtube.com with the query pre-filled. Works for every user,
// subscription or not.
export function musicSearchUrl(query) {
  return `https://music.youtube.com/search?q=${encodeURIComponent(query)}`;
}
