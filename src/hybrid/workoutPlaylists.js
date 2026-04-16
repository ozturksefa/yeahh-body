// ═══ Workout playlists ═══
// Curated per-day YouTube playlists matched to the Hibrit program's
// intent. Tone: Rocky montage + CBum hardstyle + disciplined grind —
// not generic "workout mix" filler. Each entry has:
//   - mood:      one-line descriptor shown on the card
//   - bpm:       tempo window so the user knows what to expect
//   - vibe:      genre shorthand
//   - playlistId: YouTube playlist ID (used for inline iframe embed)
//   - searchQuery: fallback search that opens YouTube with the same
//                  mood if the playlist has been removed
//
// If the user swaps in their own playlist via the UI, the override
// is stored in localStorage under yb_playlist_override_<DAY>.

const PL = (mood, bpm, vibe, playlistId, searchQuery) => ({
  mood, bpm, vibe, playlistId, searchQuery,
});

export const WORKOUT_PLAYLISTS = {
  PAZARTESİ: PL(
    "Aktif recovery · yürüyüş temposu",
    "100-120 BPM",
    "Chill hip-hop / Lo-fi beats",
    "PLww21QUFc5UE5JefupiTZXsNAbp8e5PT3",
    "chill hip hop lofi walk workout",
  ),

  SALI: PL(
    "Pull + Press · anaerobik interval",
    "130-150 BPM",
    "Hardstyle + Phonk motivation",
    "PLx0sYbCqOb8R1MvvN9YHB-l4Sg-L4zQqa",
    "cbum hardstyle phonk workout gym motivation",
  ),

  ÇARŞAMBA: PL(
    "Support skill · yumuşak odak",
    "80-100 BPM",
    "Instrumental focus / Deep ambient",
    "PLrAl6rYAS4QY-nCZeBdidETeMSvDnF9yl",
    "deep focus instrumental workout ambient",
  ),

  PERŞEMBE: PL(
    "Lower control · steady grind",
    "120-135 BPM",
    "Aggressive hip-hop + rap",
    "PLwg2F-OaqHHlEhzHEHdNqGvSrYpYjZ08Y",
    "aggressive hip hop rap gym workout hardcore",
  ),

  CUMA: PL(
    "Mobilite · hazırlık modu",
    "95-115 BPM",
    "Uplifting electronic",
    "PLbjlkRRl3RMGRtqpDUyiv9qjnTq1OvwL2",
    "uplifting electronic warm up running",
  ),

  CUMARTESİ: PL(
    "Ana hacim günü · Rocky montage vibe",
    "125-145 BPM",
    "Rocky IV + 80s training + rock",
    "PLx0sYbCqOb8STVxh0JUq8VRQSoqXDcodE",
    "rocky training montage workout motivation eye of the tiger",
  ),

  PAZAR: PL(
    "Zone 2 · uzun süre odak",
    "115-130 BPM",
    "Deep house / progressive",
    "PLm_FycPW9MZIM4KUhXzc4EN-cdb5bZHYs",
    "deep house progressive running zone 2 long session",
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
