import { useState } from "react";

// RPE 6-10 scale — spor bilimi standardı
const RPE_LEVELS = [
  { val: 6,  emoji: "😴", label: "RPE 6",  desc: "Çok kolay — konuşabilirsin" },
  { val: 7,  emoji: "😊", label: "RPE 7",  desc: "Kolay — 5+ tekrar kaldı" },
  { val: 8,  emoji: "💪", label: "RPE 8",  desc: "Zor — 2-3 tekrar kaldı" },
  { val: 9,  emoji: "🔥", label: "RPE 9",  desc: "Çok zor — 1 tekrar kaldı" },
  { val: 10, emoji: "🤯", label: "RPE 10", desc: "Maksimum efor — tükendin" },
];

export function saveRPE(exerciseName, dayIndex, rpe) {
  const key = `yb_rpe_${dayIndex}_${exerciseName}`;
  try { localStorage.setItem(key, rpe); } catch {}
}

export function loadRPE(exerciseName, dayIndex) {
  const key = `yb_rpe_${dayIndex}_${exerciseName}`;
  try { return parseInt(localStorage.getItem(key)) || 0; } catch { return 0; }
}

// Tüm günün RPE ortalamasını döndür
export function getDayRPEMap(dayIndex, exerciseNames) {
  const map = {};
  exerciseNames.forEach(name => {
    const rpe = loadRPE(name, dayIndex);
    if (rpe > 0) map[name] = rpe;
  });
  return map;
}

function ExertionRating({ exerciseName, dayIndex }) {
  const [rating, setRating] = useState(() => loadRPE(exerciseName, dayIndex));

  const select = (val) => {
    setRating(val);
    saveRPE(exerciseName, dayIndex, val);
    if (navigator.vibrate) navigator.vibrate(15);
  };

  const selectedLevel = RPE_LEVELS.find(l => l.val === rating);

  return (
    <div className="exertion">
      <div className="exertion-header">
        <span className="exertion-label">Ne kadar zorlandın? (RPE)</span>
        {rating > 0 && (
          <span className="exertion-selected-desc">{selectedLevel?.desc}</span>
        )}
      </div>
      <div className="exertion-btns">
        {RPE_LEVELS.map(l => (
          <button key={l.val} className={`exertion-btn ${rating === l.val ? "exertion-on" : ""}`}
            onClick={() => select(l.val)}>
            <span className="exertion-emoji">{l.emoji}</span>
            <span className="exertion-txt">{l.label}</span>
          </button>
        ))}
      </div>
      {rating > 0 && rating <= 7 && (
        <div className="exertion-hint exertion-hint-easy">
          ⬆ RPE 7 veya altı — ağırlık artırma zamanı gelebilir
        </div>
      )}
      {rating === 8 && (
        <div className="exertion-hint exertion-hint-good">
          ✅ RPE 8 — ideal hedef zone'dasın
        </div>
      )}
      {rating >= 9 && (
        <div className="exertion-hint exertion-hint-hard">
          ⚠ RPE {rating} — bir sonraki seansta aynı ağırlıkta kal veya indir
        </div>
      )}
    </div>
  );
}

export default ExertionRating;
