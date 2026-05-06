import { useState } from "react";
import { RPE_LEVELS, loadRPE, saveRPE } from "./exertionRatingStore";

function ExertionRating({ exerciseName, dayIndex, onChange }) {
  const [rating, setRating] = useState(() => loadRPE(exerciseName, dayIndex));

  const select = (val) => {
    setRating(val);
    saveRPE(exerciseName, dayIndex, val);
    if (onChange) onChange(val);
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
