import { formatLocalDate } from "./dateUtils";

export const PROGRESSION_MEMORY_KEY = "yb_progression_memory_v1";

function safeLoad() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESSION_MEMORY_KEY) || "{}");
  } catch {
    return {};
  }
}

function safeSave(value) {
  try {
    localStorage.setItem(PROGRESSION_MEMORY_KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function normalizeExerciseName(name = "") {
  return String(name).trim().toLowerCase().replace(/\s+/g, " ");
}

function includesAny(text, tokens) {
  return tokens.some((token) => text.includes(token));
}

export function classifyProgression(exerciseName = "", blockName = "") {
  const text = `${exerciseName} ${blockName}`.toLowerCase();

  if (includesAny(text, ["kondisyon", "zone 2", "interval", "tempo run", "bike", "rower", "jump rope"])) {
    return "conditioning";
  }

  if (includesAny(text, ["power", "teknik", "jump", "hop", "sprint", "throw", "medicine", "med ball", "clean", "snatch", "swing"])) {
    return "power";
  }

  if (includesAny(text, ["core", "plank", "dead bug", "bird dog", "pallof", "carry", "hollow", "tuck", "rollout", "woodchop", "anti-"])) {
    return "core";
  }

  if (includesAny(text, [
    "raise",
    "curl",
    "extension",
    "pushdown",
    "face pull",
    "fly",
    "pull apart",
    "rotation",
    "calf",
    "leg curl",
    "leg extension",
    "abduction",
    "adduction",
    "shrug",
  ])) {
    return "accessory";
  }

  return "strength";
}

export function getLoadStep(exerciseName = "", isUpperBody = true, profile = classifyProgression(exerciseName)) {
  if (profile === "accessory") return isUpperBody ? 2.5 : 5;
  if (profile === "core" || profile === "power") return isUpperBody ? 2.5 : 5;
  return isUpperBody ? 2.5 : 5;
}

function formatNumber(value) {
  const n = Number(value || 0);
  if (!n) return "0";
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function roundToStep(value, step) {
  if (!step) return Number(value || 0);
  const rounded = Math.round(Number(value || 0) / step) * step;
  return Number(formatNumber(rounded));
}

export function summarizeSets(sets = [], targetReps = 0) {
  const completedSets = sets.filter((set) => set?.done);
  const weights = completedSets.map((set) => Number(set.weight || 0));
  const reps = completedSets.map((set) => Number(set.reps || 0));
  const bestWeight = weights.length ? Math.max(...weights) : 0;
  const minReps = reps.length ? Math.min(...reps) : 0;
  const maxReps = reps.length ? Math.max(...reps) : 0;
  const allSetsDone = sets.length > 0 && completedSets.length === sets.length;
  const allTargetMet = allSetsDone && completedSets.every((set) => Number(set.reps || 0) >= Number(targetReps || 0));
  const volume = completedSets.reduce((sum, set) => sum + (Number(set.weight || 0) * Number(set.reps || 0)), 0);

  return {
    setCount: sets.length,
    doneCount: completedSets.length,
    allSetsDone,
    allTargetMet,
    bestWeight,
    minReps,
    maxReps,
    volume: Math.round(volume),
  };
}

function buildDecision({
  exerciseName,
  blockName,
  sets,
  targetReps,
  isUpperBody,
  rpe,
  previous,
}) {
  const profile = classifyProgression(exerciseName, blockName);
  const stats = summarizeSets(sets, targetReps);
  const step = getLoadStep(exerciseName, isUpperBody, profile);
  const rpeScore = Number(rpe || 0);
  const currentWeight = stats.bestWeight || 0;
  const targetRepValue = Number(targetReps || 0);

  if (!stats.allSetsDone) {
    return {
      status: "repeat",
      label: "Sonraki: aynı hedef",
      reason: "Bu hareket tamamlanmadı; sistem yük artırmaz.",
      targetWeight: currentWeight,
      targetReps: targetRepValue,
    };
  }

  if (rpeScore >= 10 && currentWeight > 0) {
    const nextWeight = roundToStep(Math.max(currentWeight - step, 0), step);
    return {
      status: "reduce",
      label: `Sonraki: ${formatNumber(nextWeight)} kg`,
      reason: `RPE ${rpeScore}; yükü biraz geri çek.`,
      targetWeight: nextWeight,
      targetReps: targetRepValue,
    };
  }

  if (rpeScore >= 9) {
    return {
      status: "hold",
      label: currentWeight > 0 ? `Sonraki: ${formatNumber(currentWeight)} kg` : "Sonraki: aynı seviye",
      reason: `RPE ${rpeScore}; önce aynı yükte daha temiz tekrar.`,
      targetWeight: currentWeight,
      targetReps: targetRepValue,
    };
  }

  if (profile === "power") {
    return {
      status: "quality",
      label: currentWeight > 0 ? `Sonraki: ${formatNumber(currentWeight)} kg` : "Sonraki: aynı varyasyon",
      reason: "Power/teknik hareketlerde hedef yorgunluk değil hız ve kalite.",
      targetWeight: currentWeight,
      targetReps: targetRepValue,
    };
  }

  if (currentWeight <= 0) {
    const nextReps = stats.allTargetMet && targetRepValue > 0 ? targetRepValue + 1 : targetRepValue;
    return {
      status: stats.allTargetMet ? "reps" : "repeat",
      label: nextReps > targetRepValue ? `Sonraki: +1 temiz tekrar` : "Sonraki: aynı hedef",
      reason: stats.allTargetMet
        ? "Vücut ağırlığı/core hareketinde önce temiz tekrar veya süre artır."
        : "Önce hedef tekrarları tamamla.",
      targetWeight: 0,
      targetReps: nextReps,
    };
  }

  if (!stats.allTargetMet) {
    return {
      status: "repeat",
      label: `Sonraki: ${formatNumber(currentWeight)} kg`,
      reason: "Hedef tekrarlar tamamlanmadı; aynı yükle tekrar et.",
      targetWeight: currentWeight,
      targetReps: targetRepValue,
    };
  }

  if (profile === "accessory") {
    if (stats.minReps >= targetRepValue + 2) {
      const nextWeight = roundToStep(currentWeight + step, step);
      return {
        status: "increase",
        label: `Sonraki: ${formatNumber(nextWeight)} kg`,
        reason: "Aksesuar hareketinde tekrar tavanı görüldü; küçük yük artışı.",
        targetWeight: nextWeight,
        targetReps: targetRepValue,
      };
    }

    return {
      status: "reps",
      label: `Sonraki: ${formatNumber(currentWeight)} kg × ${targetRepValue + 1}`,
      reason: "Aksesuar hareketinde önce tekrar artır, sonra yük ekle.",
      targetWeight: currentWeight,
      targetReps: targetRepValue + 1,
    };
  }

  const previousCleanSameLoad = previous?.allTargetMet
    && Number(previous.bestWeight || 0) === currentWeight
    && Number(previous.rpe || 0) <= 8;

  if ((rpeScore > 0 && rpeScore <= 7) || previousCleanSameLoad) {
    const nextWeight = roundToStep(currentWeight + step, step);
    return {
      status: "increase",
      label: `Sonraki: ${formatNumber(nextWeight)} kg`,
      reason: previousCleanSameLoad
        ? "Aynı yük iki temiz seans tamamlandı; küçük artış uygun."
        : `RPE ${rpeScore}; hedef tekrarlar temiz tamamlandı.`,
      targetWeight: nextWeight,
      targetReps: targetRepValue,
    };
  }

  return {
    status: "hold",
    label: `Sonraki: ${formatNumber(currentWeight)} kg`,
    reason: rpeScore === 8
      ? "RPE 8 ideal; aynı yükte bir temiz onay daha al."
      : "RPE girilmedi; sistem güvenli tarafta aynı yükü korur.",
    targetWeight: currentWeight,
    targetReps: targetRepValue,
  };
}

export function recordProgressionMemory({
  exerciseName,
  blockName = "",
  sets = [],
  targetReps = 0,
  isUpperBody = true,
  rpe = 0,
  date = formatLocalDate(new Date()),
}) {
  const key = normalizeExerciseName(exerciseName);
  const memory = safeLoad();
  const previous = memory[key] || null;
  const stats = summarizeSets(sets, targetReps);
  const decision = buildDecision({
    exerciseName,
    blockName,
    sets,
    targetReps,
    isUpperBody,
    rpe,
    previous,
  });

  const entry = {
    exerciseName,
    blockName,
    date,
    rpe: Number(rpe || 0),
    profile: classifyProgression(exerciseName, blockName),
    targetReps: Number(targetReps || 0),
    allTargetMet: stats.allTargetMet,
    bestWeight: stats.bestWeight,
    minReps: stats.minReps,
    volume: stats.volume,
    decision,
    updatedAt: Date.now(),
  };

  memory[key] = entry;
  safeSave(memory);
  return entry;
}

export function loadProgressionMemoryEntry(exerciseName) {
  return safeLoad()[normalizeExerciseName(exerciseName)] || null;
}

function mapStatusToSuggestionType(status) {
  if (status === "increase" || status === "reps") return "up";
  if (status === "reduce") return "down";
  if (status === "hold" || status === "quality") return "confirm";
  return "same";
}

export function getStoredProgressionSuggestion(exerciseName, today = formatLocalDate(new Date())) {
  const entry = loadProgressionMemoryEntry(exerciseName);
  if (!entry?.decision) return null;
  if (entry.date >= today) return null;

  return {
    weight: Number(entry.decision.targetWeight || entry.bestWeight || 0),
    reps: Number(entry.decision.targetReps || entry.targetReps || 0),
    reason: `Hafıza: ${entry.decision.label} — ${entry.decision.reason}`,
    type: mapStatusToSuggestionType(entry.decision.status),
    memory: true,
    rpe: entry.rpe,
    progressionStatus: entry.decision.status,
  };
}
