// ─────────────────────────────────────────────────────────────────
// Kalori Hesaplama Motoru
// Formula: Kcal = MET × ağırlık(kg) × süre(saat)
// Süre: aktif çalışma + set arası dinlenme
// ─────────────────────────────────────────────────────────────────

// MET değerleri — egzersiz tipine göre
const MET = {
  // Kalistenik
  'pull_up': 8.0, 'chin_up': 8.0, 'dip': 8.0, 'push_up': 8.0,
  'muscle_up': 10.0, 'handstand': 6.0, 'l_sit': 6.0, 'hollow': 4.0,
  // Ağırlık antrenmanı
  'compound_heavy': 6.0,  // deadlift, squat, press
  'compound_moderate': 5.0,  // row, lunge, rdl
  'isolation': 3.5,  // curl, raise, extension
  // Kondisyon
  'sprint': 14.0, 'hiit': 10.0, 'circuit': 8.0,
  'kettlebell': 12.0, 'carry': 6.0, 'crawl': 7.0,
  // Core & Skill
  'core_static': 3.5, 'core_dynamic': 5.0,
  // Mobilite & Isınma
  'mobility': 2.5, 'stretch': 2.0,
};

// Egzersiz adına göre MET tipi belirle
function getMET(name) {
  const n = name.toLowerCase();
  if (/sprint|interval/.test(n)) return MET.sprint;
  if (/amrap|circuit|devre|complex|sürekli/.test(n)) return MET.circuit;
  if (/kettlebell swing|kb swing/.test(n)) return MET.kettlebell;
  if (/farmer|carry|suitcase|trap bar.*carry/.test(n)) return MET.carry;
  if (/bear crawl|crawl/.test(n)) return MET.crawl;
  if (/pull.up|chin.up|muscle.up|pull up|chin up/.test(n)) return MET.pull_up;
  if (/dip(?! negative)/.test(n) || /full dip|chest dip/.test(n)) return MET.dip;
  if (/push.?up|push up/.test(n)) return MET.push_up;
  if (/handstand|wall hand/.test(n)) return MET.handstand;
  if (/l.sit|tuck hold|support hold/.test(n)) return MET.l_sit;
  if (/hollow body|hollow hold/.test(n)) return MET.hollow;
  if (/deadlift|squat|press|clean/.test(n)) return MET.compound_heavy;
  if (/row|lunge|rdl|romanian|hinge|swing/.test(n)) return MET.compound_moderate;
  if (/curl|raise|extension|fly|kickback/.test(n)) return MET.isolation;
  if (/plank|side plank|dead bug|bird dog/.test(n)) return MET.core_static;
  if (/rollout|ab wheel|hollow|crunch/.test(n)) return MET.core_dynamic;
  if (/stretch|pose|fold|twist|rotation|breathing/.test(n)) return MET.stretch;
  if (/cat.*cow|hip circle|warm|foam|roller/.test(n)) return MET.mobility;
  return MET.compound_moderate; // default
}

// Set string'inden aktif süre (dakika) hesapla
function parseDurationMin(setsStr) {
  if (!setsStr) return 3;
  const s = setsStr.toLowerCase();

  // "20 dakika sürekli" → 20 dk
  const dakika = s.match(/(\d+)\s*dakika/);
  if (dakika) return parseInt(dakika[1]);

  // "8 dakika × maksimum" → 8 dk
  const dakikaMax = s.match(/(\d+)\s*dakika\s*[×x]/);
  if (dakikaMax) return parseInt(dakikaMax[1]);

  // "6 × 30sn sprint / 30sn yürüyüş" → 6 × 60sn = 6 dk
  const sprintMatch = s.match(/(\d+)\s*[×x]\s*(\d+)\s*sn.*\/.*(\d+)\s*sn/);
  if (sprintMatch) {
    const sets = parseInt(sprintMatch[1]);
    const work = parseInt(sprintMatch[2]);
    const rest = parseInt(sprintMatch[3]);
    return (sets * (work + rest)) / 60;
  }

  // "4 tur × 3 dk / 1 dk dinlenme"
  const turMatch = s.match(/(\d+)\s*tur\s*[×x]\s*(\d+)\s*dk/);
  if (turMatch) {
    const tur = parseInt(turMatch[1]);
    const work = parseInt(turMatch[2]);
    const rest = 1; // 1 dk dinlenme
    return tur * (work + rest);
  }

  // Sets × rep formatı: "3 × 10", "4 × 8 (her taraf)"
  const repsMatch = s.match(/(\d+)\s*[×x]\s*(\d+)(?:\s*[–-]\s*(\d+))?/);
  if (repsMatch) {
    const sets = parseInt(repsMatch[1]);
    const reps = parseInt(repsMatch[2]);
    const isHeavy = /heavy|ağır|mak|max/.test(s);

    // Rep başına süre — eğer "5sn indir" gibi tempo notu varsa onu kullan
    const tempoMatch = s.match(/(\d+)sn\s*(?:indir|uzan|tut|hold)/);
    const secPerRep = tempoMatch
      ? parseInt(tempoMatch[1]) + 2   // tempo + kaldırış
      : isHeavy ? 5 : 3;              // saniye/rep

    const setDuration = (reps * secPerRep) / 60; // dakika
    const restBetween = sets <= 3 ? 1.5 : 2; // dakika
    return sets * setDuration + (sets - 1) * restBetween;
  }

  // "3 × 30sn" veya "2 × 45sn (her taraf)"
  const timedMatch = s.match(/(\d+)\s*[×x]\s*(\d+)\s*sn/);
  if (timedMatch) {
    const sets = parseInt(timedMatch[1]);
    const secs = parseInt(timedMatch[2]);
    const rest = secs <= 20 ? 0.5 : 1; // dk
    // Max 60sn/set cap — parse hatası önlemi
    const cappedSecs = Math.min(secs, 120);
    return (sets * cappedSecs / 60) + (sets - 1) * rest;
  }

  // "3 × max", "4 × max süre", "3 set × maksimum"
  const maxMatch = s.match(/(\d+)\s*(?:set\s*[×x]|[×x])\s*(?:mak?s?i?m?u?m?|max)/);
  if (maxMatch) {
    const sets = parseInt(maxMatch[1]);
    return sets * 0.5 + (sets - 1) * 2; // ~30sn max + 2dk rest
  }

  // "5 tur: 1-2-3-2-1" (pull up ladder)
  if (s.includes('tur') && s.includes('-')) return 8;

  return 3; // default fallback
}

// Ana hesaplama fonksiyonu
export function calcExerciseCalories(ex, weightKg = 75) {
  const met = getMET(ex.name);
  const durationMin = parseDurationMin(ex.sets, ex.name);
  const kcal = (met * weightKg * durationMin) / 60;
  return {
    kcal: Math.round(kcal),
    durationMin: Math.round(durationMin * 10) / 10,
    met,
  };
}

export function calcBlockCalories(block, weightKg = 75) {
  const exercises = block.exercises || [];
  const total = exercises.reduce((sum, ex) => {
    const { kcal } = calcExerciseCalories(ex, weightKg);
    return sum + kcal;
  }, 0);
  const duration = exercises.reduce((sum, ex) => {
    const { durationMin } = calcExerciseCalories(ex, weightKg);
    return sum + durationMin;
  }, 0);
  return { kcal: total, durationMin: Math.round(duration) };
}

export function calcDayCalories(day, weightKg = 75) {
  const workBlocks = (day.blocks || []).filter(b =>
    !b.name.toLowerCase().includes('ısınma') &&
    !b.name.toLowerCase().includes('soğuma') &&
    !b.name.toLowerCase().includes('isinma')
  );
  const warmupBlocks = (day.blocks || []).filter(b =>
    b.name.toLowerCase().includes('ısınma') ||
    b.name.toLowerCase().includes('isinma')
  );
  const cooldownBlocks = (day.blocks || []).filter(b =>
    b.name.toLowerCase().includes('soğuma')
  );

  const work = workBlocks.reduce((sum, b) => {
    const { kcal, durationMin } = calcBlockCalories(b, weightKg);
    return { kcal: sum.kcal + kcal, durationMin: sum.durationMin + durationMin };
  }, { kcal: 0, durationMin: 0 });

  const warmup = warmupBlocks.reduce((s, b) => s + calcBlockCalories(b, weightKg).kcal, 0);
  const cooldown = cooldownBlocks.reduce((s, b) => s + calcBlockCalories(b, weightKg).kcal, 0);

  return {
    total: work.kcal + warmup + cooldown,
    work: work.kcal,
    warmup,
    cooldown,
    durationMin: work.durationMin,
  };
}

// Kullanıcı ağırlığını localStorage'dan oku
export function getUserWeight() {
  try {
    const t = JSON.parse(localStorage.getItem('yb_targets') || '{}');
    return t.bodyWeight || 75;
  } catch { return 75; }
}
