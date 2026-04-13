import { formatLocalDate, shiftLocalDate } from "../dateUtils";

export const DAY_ORDER = { PAZARTESİ: 1, SALI: 2, ÇARŞAMBA: 3, PERŞEMBE: 4, CUMA: 5, CUMARTESİ: 6, PAZAR: 7 };
export const TODAY_SUB_BY_INDEX = ["PAZAR", "PAZARTESİ", "SALI", "ÇARŞAMBA", "PERŞEMBE", "CUMA", "CUMARTESİ"];
export const MODE_KEY = "yb_hybrid_mode";
export const SWAPS_KEY = "yb_hybrid_swaps_v1";
export const ENTRIES_KEY = "yb_hybrid_entries_v1";
export const SKILL_KEY = "yb_hybrid_skill_v1";
export const WEEK_KEY = "yb_hybrid_week_v1";
export const START_KEY = "yb_hybrid_start";
export const WEEK_LOG_KEY = "yb_hybrid_week_log";
export const SNOOZE_KEY = "yb_hybrid_snooze";

export const buttonBase = {
  border: "1px solid #2A2A30",
  borderRadius: 10,
  background: "#17171B",
  color: "#C4C4CC",
  padding: "8px 10px",
  fontSize: 11,
  fontWeight: 700,
  cursor: "pointer",
};

export function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return false;
  }
  return true;
}

export function getStepMetric(step) {
  return step?.metric || "seconds";
}

export function getStepGoal(step) {
  if (!step) return 0;
  if (typeof step.goalValue === "number") return step.goalValue;
  if (getStepMetric(step) === "reps") {
    const rangeMatch = String(step.target || "").match(/(\d+)\s*-\s*(\d+)\s*tekrar/i);
    if (rangeMatch) return Number(rangeMatch[1]);
    const repMatch = String(step.target || "").match(/(\d+)\s*tekrar/i);
    return repMatch ? Number(repMatch[1]) : 0;
  }
  const secondsMatch = String(step.target || "").match(/(\d+)\s*sn/i);
  return secondsMatch ? Number(secondsMatch[1]) : 0;
}

export function getSkillValue(entryData = {}) {
  return Number(entryData.value ?? entryData.seconds ?? entryData.reps ?? 0);
}

export function getSkillUnit(metric) {
  return metric === "reps" ? "tekrar" : "sn";
}

export function parseSetRange(sets) {
  const match = String(sets || "").match(/^\s*(\d+)(?:\s*-\s*(\d+))?\s*[×x]\s*(.+)$/i);
  if (!match) return null;
  return {
    min: Number(match[1]),
    max: match[2] ? Number(match[2]) : Number(match[1]),
    suffix: match[3],
  };
}

export function formatSetRange(min, max, suffix) {
  const prefix = min === max ? `${min}` : `${min}-${max}`;
  return `${prefix} × ${suffix}`;
}

export function adjustSetCount(count, weekProfile) {
  if (!weekProfile) return count;
  if (weekProfile.week === 1) return count >= 4 ? count - 1 : count;
  if (weekProfile.week === 5) return Math.max(1, count - 1);
  if (weekProfile.week === 8) return count >= 3 ? count - 1 : count;
  return count;
}

export function getWeekExecutionNote(weekProfile) {
  if (!weekProfile) return "Baz program aktif.";
  switch (weekProfile.week) {
    case 1:
      return "Kurulum haftası: 4 setli ana hareketlerde 1 set düşer; amaç teknik ve tolerans.";
    case 3:
      return "Taban+ haftası: setler aynı, iyi tolere edilen ana hareketlerde her sette +1 tekrar deneyebilirsin.";
    case 4:
      return "Kontrol haftası: hacmi sabit tut, kalite ve semptom takibini öne al.";
    case 5:
      return "Deload aktif: çoğu hareketin seti otomatik düşer, kondisyon ve teknik korunur.";
    case 6:
      return "Yoğunluk haftası: setler baz seviyede, ana hareketlerde küçük yük veya tempo artışı uygula.";
    case 7:
      return "Yoğunluk+ haftası: yalnızca iyi tolere edilen ana hareketlerde son sete +1 tekrar ekle.";
    case 8:
      return "Değerlendirme haftası: destek hareketlerinde hacim hafif düşer; kaliteyi ve semptomu kıyasla.";
    default:
      return "Baz program aktif; yazılı hacmi ve RPE 6-7 bandını koru.";
  }
}

export function applyWeekToExercise(exercise, weekProfile) {
  const parsed = parseSetRange(exercise.sets);
  if (!parsed) return exercise;

  const nextMin = adjustSetCount(parsed.min, weekProfile);
  const nextMax = adjustSetCount(parsed.max, weekProfile);
  if (nextMin === parsed.min && nextMax === parsed.max) return exercise;

  return {
    ...exercise,
    sets: formatSetRange(nextMin, nextMax, parsed.suffix),
  };
}

export function applyWeekToVariant(variant, weekProfile) {
  if (!variant || !weekProfile) return variant;
  return {
    ...variant,
    weekExecutionNote: getWeekExecutionNote(weekProfile),
    blocks: (variant.blocks || []).map((block) => ({
      ...block,
      exercises: (block.exercises || []).map((exercise) => applyWeekToExercise(exercise, weekProfile)),
    })),
  };
}

export function buildDefaultSkillState(skillPaths) {
  return Object.fromEntries(Object.keys(skillPaths).map((key) => [key, { level: 1 }]));
}

export function average(values) {
  if (!values.length) return 0;
  return +(values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);
}

export function getTodayContext() {
  const now = new Date();
  return {
    key: formatLocalDate(now),
    sub: TODAY_SUB_BY_INDEX[now.getDay()] || "PAZARTESİ",
  };
}

export function getTodaySub() {
  return TODAY_SUB_BY_INDEX[new Date().getDay()] || "PAZARTESİ";
}

export function getTodayIndex(days, todaySub = getTodaySub()) {
  const foundIndex = days.findIndex((day) => day.sub === todaySub);
  return foundIndex >= 0 ? foundIndex : 0;
}

function localDateToDate(dateStr) {
  const [year, month, day] = String(dateStr || "").split("-").map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

export function diffLocalDays(startDate, endDate) {
  const start = localDateToDate(startDate);
  const end = localDateToDate(endDate);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor((end - start) / oneDay);
}

export function getWeekStartDate(startDate, week) {
  if (!startDate || !week) return null;
  return shiftLocalDate(startDate, (week - 1) * 7);
}

export function getWeekEndDate(startDate, week) {
  const weekStartDate = getWeekStartDate(startDate, week);
  return weekStartDate ? shiftLocalDate(weekStartDate, 6) : null;
}

export function formatShortDateLabel(dateStr) {
  if (!dateStr) return "—";
  return localDateToDate(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
}

export function getCompletedWeekEntries(entries, weekStartDate, weekEndDate, trainingDays = []) {
  const trainingSet = new Set(trainingDays.filter((day) => day.type === "training").map((day) => day.sub));
  return entries.filter((entry) => (
    !!entry?.post?.completed
    && (!trainingSet.size || trainingSet.has(entry.day))
    && entry.date >= weekStartDate
    && entry.date <= weekEndDate
  ));
}

function getRecoveryBasedGoalMet(completedEntries = []) {
  if (!completedEntries.length) return false;
  const successCount = completedEntries.filter((entry) => {
    const nextAction = entry.post?.nextAction || "aynı";
    const rpe = Number(entry.post?.rpe || 0);
    const cardio = entry.post?.cardio || "uygun";
    return nextAction === "aynı" && (rpe === 0 || rpe <= 8) && cardio !== "fazla";
  }).length;
  return successCount / completedEntries.length >= 0.75;
}

export function getExerciseRepFloor(setsLabel = "") {
  const parsed = parseSetRange(setsLabel);
  if (!parsed) return null;

  const suffix = String(parsed.suffix || "").toLowerCase();
  if (suffix.includes("sn") || suffix.includes("dakika") || suffix.includes("dk")) return null;

  const rangeMatch = suffix.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) return Number(rangeMatch[1]);

  const repMatch = suffix.match(/(\d+)/);
  return repMatch ? Number(repMatch[1]) : null;
}

export function getWorkoutRepGoalMet({ completedEntries = [], completedWorkouts = [], allDays = [], resolveVariant } = {}) {
  if (!completedEntries.length) return false;
  if (!completedWorkouts.length || typeof resolveVariant !== "function") {
    return getRecoveryBasedGoalMet(completedEntries);
  }

  const entryLookup = new Map(
    completedEntries.map((entry) => [`${entry.date}|${entry.day}`, entry])
  );

  let totalTrackedSets = 0;
  let successfulSets = 0;

  completedWorkouts.forEach((workout) => {
    const day = allDays[workout.day_index];
    if (!day?.sub) return;

    const matchingEntry = entryLookup.get(`${workout.workout_date}|${day.sub}`);
    if (!matchingEntry?.mode) return;

    const variant = resolveVariant(day.sub, matchingEntry.mode);
    if (!variant?.blocks?.length) return;

    const repTargets = new Map();
    variant.blocks.forEach((block) => {
      (block.exercises || []).forEach((exercise) => {
        const repFloor = getExerciseRepFloor(exercise.sets);
        if (repFloor) repTargets.set(exercise.name, repFloor);
      });
    });

    Object.entries(workout.exercises || {}).forEach(([exerciseName, sets]) => {
      const repFloor = repTargets.get(exerciseName);
      if (!repFloor || !Array.isArray(sets) || sets.length === 0) return;

      totalTrackedSets += sets.length;
      sets.forEach((set) => {
        if (set.done && Number(set.reps || 0) >= repFloor) {
          successfulSets += 1;
        }
      });
    });
  });

  if (!totalTrackedSets) return getRecoveryBasedGoalMet(completedEntries);
  return successfulSets / totalTrackedSets >= 0.7;
}

export function getWeekProgress({ entries, startDate, activeWeek, today, weekLog = [], trainingDays = [] }) {
  if (!startDate || !activeWeek) {
    return {
      started: false,
      logged: false,
      ready: false,
      sessionCount: 0,
      repGoalMet: false,
      completedEntries: [],
      reason: null,
      weekStartDate: null,
      weekEndDate: null,
      daysElapsed: 0,
      timelineStatus: "idle",
    };
  }

  const weekStartDate = getWeekStartDate(startDate, activeWeek);
  const weekEndDate = getWeekEndDate(startDate, activeWeek);
  const completedEntries = getCompletedWeekEntries(entries, weekStartDate, weekEndDate, trainingDays);
  const sessionCount = completedEntries.length;
  const repGoalMet = getRecoveryBasedGoalMet(completedEntries);
  const daysElapsed = diffLocalDays(weekStartDate, today);
  const logged = weekLog.some((item) => item.week === activeWeek);
  const reason = sessionCount >= 4 ? "sessions" : daysElapsed >= 7 ? "days" : null;

  return {
    started: true,
    logged,
    ready: !!reason && !logged,
    sessionCount,
    repGoalMet,
    completedEntries,
    reason,
    weekStartDate,
    weekEndDate,
    daysElapsed,
    timelineStatus: logged ? "done" : reason ? "ready" : "active",
  };
}

export function getWeekShiftPreview(variant, currentWeekProfile, nextWeekProfile) {
  if (!variant || !currentWeekProfile || !nextWeekProfile) return "Sonraki hafta bekleniyor.";
  const currentVariant = applyWeekToVariant(variant, currentWeekProfile);
  const nextVariant = applyWeekToVariant(variant, nextWeekProfile);

  for (let blockIndex = 0; blockIndex < (currentVariant.blocks || []).length; blockIndex += 1) {
    const currentBlock = currentVariant.blocks[blockIndex];
    const nextBlock = nextVariant.blocks?.[blockIndex];
    for (let exerciseIndex = 0; exerciseIndex < (currentBlock.exercises || []).length; exerciseIndex += 1) {
      const currentExercise = currentBlock.exercises[exerciseIndex];
      const nextExercise = nextBlock?.exercises?.[exerciseIndex];
      if (currentExercise?.sets !== nextExercise?.sets) {
        return `${currentExercise.name}: ${currentExercise.sets} → ${nextExercise.sets}`;
      }
    }
  }

  return "Setler büyük ölçüde aynı; kalite, tempo ve tolerans odağı korunur.";
}

export function getRelevantSkillsForDay(daySub, skillPaths) {
  return Object.entries(skillPaths).filter(([, path]) => path.trackedDays.includes(daySub));
}

export function buildSuggestions(pre, mode) {
  const shoulder = Number(pre.shoulder || 0);
  const knee = Number(pre.knee || 0);
  const spine = Number(pre.spine || 0);
  const suggestions = [];
  let recommendedMode = mode;

  if (mode === "home" && pre.energy === "iyi" && pre.sleep !== "kötü" && shoulder < 3 && knee < 3 && spine < 3) {
    recommendedMode = "gym";
  }

  if (pre.sleep === "kötü" || pre.energy === "düşük") {
    suggestions.push({ tone: "#FFA726", text: "Bugün hacmi %20-30 azalt; her ana bloktan 1 set düş." });
    recommendedMode = "home";
  }
  if (shoulder >= 3) {
    suggestions.push({ tone: "#FF6B6B", text: "Overhead/handstand ve landmine press'i çıkar; row ve güvenli press ile kal." });
    recommendedMode = "home";
  }
  if (knee >= 3) {
    suggestions.push({ tone: "#FF6B6B", text: "Lunge/step-up/derin ROM yerine wall sit, kısa ROM leg press veya glute dominanta dön." });
  }
  if (spine >= 3) {
    suggestions.push({ tone: "#FF6B6B", text: "Hinge ve uzun izometrikleri azalt; dead bug, side plank ve yürüyüşü koru." });
    recommendedMode = "home";
  }
  if (suggestions.length === 0) {
    suggestions.push({ tone: "#00C853", text: "Bugün planı normal dozda uygulayabilirsin. Failure yok, RPE 6-8." });
  }
  if (recommendedMode === "gym" && mode === "home") {
    suggestions.push({ tone: "#4FC3F7", text: "Semptom düşük; bugün istersen gym versiyonu da mantıklı olur." });
  }

  return { suggestions, recommendedMode };
}

export function getWeeklyDecision({ last7, totals, skillContacts, activeWeek, skillPaths }) {
  if (!last7.length) {
    return {
      label: "Veri bekleniyor",
      tone: "#7A7A84",
      summary: "Henüz yeterli seans yok; önce 2-3 tamamlanmış kayıt topla.",
      actions: ["Bu hafta öncelik düzenli giriş yapmak ve check-out kayıtlarını tamamlamak."],
    };
  }

  const actionVotes = last7.filter((entry) => ["azalt", "swap"].includes(entry.post?.nextAction)).length;
  const tooMuchCardio = last7.filter((entry) => entry.post?.cardio === "fazla").length;
  const hardSessions = last7.filter((entry) => Number(entry.post?.rpe || 0) >= 8).length;
  const avgSymptoms = Math.max(totals.avgShoulder || 0, totals.avgKnee || 0, totals.avgSpine || 0);
  const lowSkillContacts = Object.entries(skillContacts)
    .filter(([key, count]) => count < 2 && skillPaths[key]?.weeklyGoal?.includes("2"))
    .map(([key]) => key);

  if (activeWeek?.week === 5) {
    return {
      label: "Deload uygula",
      tone: "#4FC3F7",
      summary: "Takvim deload haftasında; toparlanmayı öne al ve hacim kovalamayı bırak.",
      actions: [
        "Yazılı set düşüşünü koru; ekstra set ekleme.",
        tooMuchCardio >= 2 ? "Kondisyonu rahat tempoda tut; interval sertliğini düşür." : "Kondisyonu Zone 2 / rahat tempo bandında koru.",
        avgSymptoms >= 2.5 ? "Semptomlar yüksek; skill ve diz/omuz dozunu bir kademe geri çek." : "Amaç taze çıkmak; bu haftayı iyi hisle kapat.",
      ],
    };
  }

  if (avgSymptoms >= 3.2 || actionVotes >= 2 || (hardSessions >= 2 && tooMuchCardio >= 2)) {
    return {
      label: "Deload öner",
      tone: "#FF6B6B",
      summary: "Yük birikimi toparlanmanın önüne geçmiş görünüyor; kısa bir geri çekilme mantıklı.",
      actions: [
        "Bir sonraki hafta tüm ana bloklardan 1 set düş.",
        "Overhead/skill ve diz hassas hareketlerinde regress kullan.",
        "Kondisyonu interval yerine çoğunlukla Zone 2 çizgisinde tut.",
      ],
    };
  }

  if (avgSymptoms >= 2.5 || actionVotes >= 1 || tooMuchCardio >= 2 || totals.avgRpe >= 7.8) {
    return {
      label: "1 set azalt",
      tone: "#FFA726",
      summary: "Program çalışıyor ama yük sınırına yaklaşmışsın; küçük hacim düşüşü daha temiz ilerletir.",
      actions: [
        "Sadece ana kuvvet bloklarından 1 set eksilt.",
        "Skill’de max yaklaşımı yerine submax kaliteyi koru.",
        "Kondisyonu aynı tut ama sertlik seviyesini bir tık düşür.",
      ],
    };
  }

  if (last7.length < 3 || totals.aerobic < 120) {
    return {
      label: "Hacmi sabit tut",
      tone: "#4FC3F7",
      summary: "Henüz karar verecek kadar ritim oturmamış; önce sürekliliği tamamla.",
      actions: [
        "Aynı yükte kal ve tamamlanan seans sayısını artır.",
        "Aerobik dakikayı 150 dk/haftaya yaklaştır.",
        "İlerlemeden önce en az 1 hafta daha veri topla.",
      ],
    };
  }

  if (avgSymptoms <= 2 && totals.avgRpe <= 7.2 && totals.aerobic >= 150) {
    const skillAction = lowSkillContacts.length ? "Skill temasını 2 kaliteli güne tamamla; yükü skill’den değil ana hareketlerden artır." : "Ana hareketlerde küçük tekrar artışı düşünebilirsin.";
    return {
      label: "Devam et",
      tone: "#00C853",
      summary: "Toparlanma, aerobik ve semptom dengesi iyi; program şu an sana hizmet ediyor.",
      actions: [
        "Yazılı planı koru; sadece iyi tolere edilen ana hareketlerde +1 tekrar dene.",
        skillAction,
        "RPE 6-8 bandını bozma; failure kovalamadan ilerle.",
      ],
    };
  }

  return {
    label: "Hacmi sabit tut",
    tone: "#4FC3F7",
    summary: "Genel tablo dengeli ama ilerleme için henüz net yeşil ışık yok; mevcut dozu korumak daha akıllı.",
    actions: [
      "Bir hafta daha aynı hacimde kal ve semptom trendini izle.",
      "Aerobik ve skill temasını yazılı hedefe tamamla.",
      "İlerlemeyi ancak ertesi gün toparlanman iyi kaldığında düşün.",
    ],
  };
}
