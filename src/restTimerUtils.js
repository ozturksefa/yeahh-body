export function getRestDuration(blockName, exerciseName) {
  const bn = blockName?.toUpperCase() || "";
  const en = exerciseName?.toLowerCase() || "";

  if (bn.includes("FİNİSHER")) return 45;
  if (bn.includes("CORE")) return 60;
  if (bn.includes("CALİSTHENİCS")) return 75;

  if (bn.includes("KUVVET")) {
    const compound = ["squat", "deadlift", "press", "pull up", "chin up", "row", "hip thrust", "lunge", "step up", "leg press"];
    if (compound.some((c) => en.includes(c))) return 120;
    return 90;
  }

  return 90;
}
