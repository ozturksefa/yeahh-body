export function parseSets(setsStr) {
  const m = setsStr.match(/(\d+)\s*[×x]\s*(\d+)/);
  if (m) return { setCount: parseInt(m[1]), reps: parseInt(m[2]), timed: false };
  const t = setsStr.match(/(\d+)\s*[×x]\s*(\d+)\s*sn/i);
  if (t) return { setCount: parseInt(t[1]), reps: parseInt(t[2]), timed: true };
  return null;
}

export function isUpper(exerciseName) {
  const lower = ["squat", "deadlift", "lunge", "press leg", "hip thrust", "bridge", "leg curl", "leg ext", "step up", "calf", "cossack", "swing", "sled", "monster", "hip hinge", "jefferson", "farmer"];
  return !lower.some((k) => exerciseName.toLowerCase().includes(k));
}
