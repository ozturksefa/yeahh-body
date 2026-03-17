import { useState } from "react";

const EXERTION_LEVELS = [
  { val: 1, emoji: "😴", label: "Çok Kolay" },
  { val: 2, emoji: "😊", label: "Kolay" },
  { val: 3, emoji: "💪", label: "Normal" },
  { val: 4, emoji: "🔥", label: "Zor" },
  { val: 5, emoji: "🤯", label: "Limit" },
];

function ExertionRating({ exerciseName, dayIndex }) {
  const key = `yb_exertion_${dayIndex}_${exerciseName}`;
  const [rating, setRating] = useState(() => {
    try { return parseInt(localStorage.getItem(key)) || 0; } catch { return 0; }
  });

  const select = (val) => {
    setRating(val);
    try { localStorage.setItem(key, val); } catch {}
    if (navigator.vibrate) navigator.vibrate(15);
  };

  return (
    <div className="exertion">
      <span className="exertion-label">Ne kadar zorlandın?</span>
      <div className="exertion-btns">
        {EXERTION_LEVELS.map(l => (
          <button key={l.val} className={`exertion-btn ${rating === l.val ? "exertion-on" : ""}`}
            onClick={() => select(l.val)}>
            <span className="exertion-emoji">{l.emoji}</span>
            <span className="exertion-txt">{l.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExertionRating;
