export const RPE_LEVELS = [
  { val: 6, emoji: "😴", label: "RPE 6", desc: "Çok kolay — konuşabilirsin" },
  { val: 7, emoji: "😊", label: "RPE 7", desc: "Kolay — 5+ tekrar kaldı" },
  { val: 8, emoji: "💪", label: "RPE 8", desc: "Zor — 2-3 tekrar kaldı" },
  { val: 9, emoji: "🔥", label: "RPE 9", desc: "Çok zor — 1 tekrar kaldı" },
  { val: 10, emoji: "🤯", label: "RPE 10", desc: "Maksimum efor — tükendin" },
];

export function saveRPE(exerciseName, dayIndex, rpe) {
  const key = `yb_rpe_${dayIndex}_${exerciseName}`;
  try {
    localStorage.setItem(key, rpe);
  } catch {
    return;
  }
}

export function loadRPE(exerciseName, dayIndex) {
  const key = `yb_rpe_${dayIndex}_${exerciseName}`;
  try {
    return parseInt(localStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
}

export function getDayRPEMap(dayIndex, exerciseNames) {
  const map = {};
  exerciseNames.forEach((name) => {
    const rpe = loadRPE(name, dayIndex);
    if (rpe > 0) map[name] = rpe;
  });
  return map;
}
