import { useEffect, useMemo, useState } from "react";
import { getAllCompletedWorkouts } from "../tracker";
import { formatLocalDate } from "../dateUtils";
import { pickBanner } from "./motivationalBeats";

/**
 * Top-of-program contextual banner. Reads the user's current state and
 * the day they're viewing to surface a single, program-aware line.
 *
 * Rules (see motivationalBeats.pickBanner):
 *   - No program started → "8 haftalık program hazır. Başla."
 *   - Today is a training day, not done → today's focus + duration
 *   - Today is training and done → done-state line from the pool
 *   - Off day + long gap → gentle "get ready" nudge
 *   - Off day, fresh → rest-day reminder
 *
 * No generic motivation clichés. Quotes come from the disciplined-tone
 * pool and are seeded so they don't change on every render.
 */
export default function ContextualBanner({ day, activeVariant, startDate }) {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getAllCompletedWorkouts(20).then((rows) => {
      if (!cancelled) setWorkouts(rows);
    });
    return () => { cancelled = true; };
  }, []);

  const banner = useMemo(() => {
    if (workouts === null) return null;
    const today = formatLocalDate(new Date());
    const todayDow = new Date().getDay();
    const dowToSub = { 1: "PAZARTESİ", 2: "SALI", 3: "ÇARŞAMBA", 4: "PERŞEMBE", 5: "CUMA", 6: "CUMARTESİ", 0: "PAZAR" };
    const todaySub = dowToSub[todayDow];
    const isTrainingDayToday = day && day.sub === todaySub && day.type === "training";
    const workoutCompletedToday = workouts.some((w) => w.date === today);
    const lastWorkoutDate = workouts[0]?.date || null;

    // Simple streak count for banner hint.
    let streak = 0;
    const doneDates = new Set(workouts.map((w) => w.date));
    const trainingDowSet = new Set([2, 4, 6, 0]);
    for (let i = 0; i < 60; i += 1) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const dow = d.getDay();
      if (!trainingDowSet.has(dow)) continue;
      const dateStr = formatLocalDate(d);
      if (doneDates.has(dateStr)) streak += 1;
      else if (dateStr !== today) break;
    }

    return pickBanner({
      today,
      isTrainingDayToday,
      dayName: day?.sub || todaySub,
      dayDuration: activeVariant?.duration || "",
      streak,
      lastWorkoutDate,
      workoutCompletedToday,
      programStarted: !!startDate,
    });
  }, [workouts, day, activeVariant, startDate]);

  if (!banner) return null;

  return (
    <div className={`ctx-banner ctx-banner-${banner.tone}`} role="note">
      <div className="ctx-banner-icon" aria-hidden>{iconForTone(banner.tone)}</div>
      <div className="ctx-banner-body">
        <div className="ctx-banner-head">{banner.headline}</div>
        <div className="ctx-banner-sub">{banner.sub}</div>
      </div>
    </div>
  );
}

function iconForTone(tone) {
  switch (tone) {
    case "kick": return "🏁";
    case "today": return "⚡";
    case "done": return "✅";
    case "recover": return "🛠";
    case "rest": return "🧘";
    default: return "·";
  }
}
