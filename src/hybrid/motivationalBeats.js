// ═══ Motivational copy — program tone ═══
// Not Rocky quotes, not generic gym clichés. These read like the same
// voice that writes the program itself: disciplined, realistic, aware
// of the "new dad" reality.

export const DISCIPLINE_LINES = [
  "Mükemmel değil. Tutarlı.",
  "Kaçırdığın seans yok. Kaçtığın ağırlık yok.",
  "Bir hafta daha. Bir gün daha. Devam.",
  "Ağrıya rağmen değil — ağrının sınırında.",
  "Ego için değil, uzun yol için.",
  "Baba. Atlet. Her ikisi.",
  "Bugün kısa da olsa — bugün sayılır.",
  "Form önce, yük sonra. Her zaman.",
  "RPE 7. Failure yok. Yeterli.",
  "Küçük ilerleme > büyük söz.",
  "Yavaş ol. Tutarlı ol. Dayan.",
  "Bu bir sprint değil. 8 hafta.",
];

// Pick a line deterministically from a seed so the same milestone doesn't
// show a different quote every render, but different milestones rotate.
export function pickLine(seed) {
  const hash = String(seed).split("").reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0);
  const idx = Math.abs(hash) % DISCIPLINE_LINES.length;
  return DISCIPLINE_LINES[idx];
}

// ═══ Milestone detection ═══
// Given the current workout counts + streak, figure out which milestone
// (if any) deserves a cinematic takeover. Milestones fire once per
// attainment — storage makes sure the user doesn't see the same screen
// twice. Returns null when nothing new is worth celebrating.

const SEEN_KEY = "yb_cinematic_seen_v1";
const COUNT_MILESTONES = [1, 4, 8, 12, 20, 32, 50, 75, 100];
const STREAK_MILESTONES = [3, 5, 8, 13, 21];

function loadSeen() {
  try { return JSON.parse(localStorage.getItem(SEEN_KEY) || "{}"); }
  catch { return {}; }
}
function markSeen(key) {
  const seen = loadSeen();
  seen[key] = Date.now();
  try { localStorage.setItem(SEEN_KEY, JSON.stringify(seen)); } catch { /* ignore */ }
}

export function detectMilestone({ workoutCount, streak, prHit, programComplete, programStarted }) {
  const seen = loadSeen();

  if (programComplete && !seen.program_complete) {
    return {
      id: "program_complete",
      kicker: "FAZ 1",
      big: "TAMAMLANDI",
      meta: "8 hafta · sakatlık yönetimi · relatif kuvvet",
      line: "Temeli kurdun. Faz 2 hazır olduğunda başla.",
    };
  }

  if (prHit && !seen[`pr_${prHit.name}_${prHit.weight}`]) {
    return {
      id: `pr_${prHit.name}_${prHit.weight}`,
      kicker: "YENİ REKOR",
      big: `${prHit.weight} KG`,
      meta: prHit.name,
      line: pickLine(`pr_${prHit.name}`),
    };
  }

  // Newest-first: announce the highest unlocked milestone.
  for (const n of [...COUNT_MILESTONES].reverse()) {
    if (workoutCount >= n && !seen[`count_${n}`]) {
      return {
        id: `count_${n}`,
        kicker: n === 1 ? "İLK" : "TOPLAM",
        big: String(n),
        meta: n === 1 ? "SEANS" : "SEANS TAMAM",
        line: pickLine(`count_${n}`),
      };
    }
  }

  for (const n of [...STREAK_MILESTONES].reverse()) {
    if (streak >= n && !seen[`streak_${n}`]) {
      return {
        id: `streak_${n}`,
        kicker: "STREAK",
        big: `${n}x`,
        meta: "SEANS ÜST ÜSTE",
        line: pickLine(`streak_${n}`),
      };
    }
  }

  if (programStarted && !seen.program_started) {
    return {
      id: "program_started",
      kicker: "FAZ 1",
      big: "BAŞLADI",
      meta: "8 hafta · dayanıklılık + kuvvet + patlayıcılık",
      line: "İlk set hazır olduğunda başla.",
    };
  }

  return null;
}

export function acknowledgeMilestone(id) {
  markSeen(id);
}

// ═══ Contextual banner — "what should I read first today?" ═══
// Picks a single line + tone for the in-app banner based on the user's
// current state (today's day, streak, completion, etc.). Avoids walls
// of text — just one headline + one sub + one action hint.

export function pickBanner({ today, isTrainingDayToday, dayName, dayDuration, streak, lastWorkoutDate, workoutCompletedToday, programStarted }) {
  if (!programStarted) {
    return {
      tone: "kick",
      headline: "8 haftalık program hazır.",
      sub: "Bugün baseline al, ilk seansı başlat.",
    };
  }

  if (workoutCompletedToday) {
    return {
      tone: "done",
      headline: "Bugünün seansı tamam.",
      sub: pickLine(`done_${today}`),
    };
  }

  if (isTrainingDayToday) {
    const streakHint = streak >= 3 ? `🔥 ${streak} seans streak — bugün kırma.` : null;
    return {
      tone: "today",
      headline: `Bugün ${dayName}.`,
      sub: streakHint || `${dayDuration} · antrenman günü. Başlamadan ön-set.`,
    };
  }

  // Off day
  const yesterdayMissed = lastWorkoutDate && daysBetween(lastWorkoutDate, today) > 2;
  if (yesterdayMissed) {
    return {
      tone: "recover",
      headline: "Son seansın 3+ gün önce.",
      sub: "Yarın antrenman günü — bugün hazırlanmak yeter.",
    };
  }

  return {
    tone: "rest",
    headline: `Bugün off · ${dayName}.`,
    sub: "Yürüyüş, bakım, nefes. Fazla zorlama yok.",
  };
}

function daysBetween(aStr, bStr) {
  if (!aStr || !bStr) return 0;
  const a = new Date(aStr + "T12:00:00");
  const b = new Date(bStr + "T12:00:00");
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}
