import { useCallback, useEffect, useState } from "react";
import { saveWorkout, loadWorkout, markWorkoutDone, resetWorkout } from "./tracker";

function WorkoutTimer({ dayIndex, onWorkoutStart, onWorkoutFinish, finishRef, onElapsed, onStateChange }) {
  const [workout, setWorkout] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const isDisabled = dayIndex < 0;

  useEffect(() => {
    if (isDisabled) return;

    (async () => {
      const w = await loadWorkout(dayIndex);
      setWorkout(w);
      if (w?.startTime && !w?.completed) {
        const ageHours = (Date.now() - w.startTime) / (1000 * 60 * 60);
        if (isFinite(ageHours) && ageHours > 12) {
          await markWorkoutDone(dayIndex);
          setWorkout({ ...w, completed: true, endTime: Date.now() });
        } else if (isFinite(ageHours)) {
          setStarted(true);
        }
      }
      setLoaded(true);
    })();
  }, [dayIndex, isDisabled]);

  useEffect(() => {
    if (!onStateChange) return;
    onStateChange({
      loaded,
      started,
      completed: !!workout?.completed,
    });
  }, [loaded, started, workout?.completed, onStateChange]);

  useEffect(() => {
    if (isDisabled || !started || workout?.completed) return;
    const start = workout?.startTime || Date.now();
    const timer = setInterval(() => {
      const e = Math.floor((Date.now() - start) / 1000);
      setElapsed(e);
      if (onElapsed) onElapsed(e);
    }, 1000);
    return () => clearInterval(timer);
  }, [isDisabled, onElapsed, started, workout?.completed, workout?.startTime]);

  const startWorkout = useCallback(async () => {
    const now = Date.now();
    const w = { exercises: {}, startTime: now, completed: false, start_time: now };
    await saveWorkout(dayIndex, { exercises: {}, start_time: now, completed: false });
    setWorkout(w);
    setStarted(true);
    setElapsed(0);
    if (onWorkoutStart) onWorkoutStart({ resumed: false, workout: w });
  }, [dayIndex, onWorkoutStart]);

  const finishWorkout = useCallback(async () => {
    await markWorkoutDone(dayIndex);
    setWorkout(prev => ({ ...(prev || {}), completed: true, endTime: Date.now() }));
    setStarted(false);
    if (onWorkoutFinish) onWorkoutFinish();
  }, [dayIndex, onWorkoutFinish]);

  // Expose finishWorkout to parent via ref
  useEffect(() => {
    if (finishRef) finishRef.current = finishWorkout;
  }, [finishRef, finishWorkout]);

  if (isDisabled) return null;

  if (!loaded) return null;

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  if (workout?.completed) {
    const dur = workout.endTime && workout.startTime
      ? Math.round((workout.endTime - workout.startTime) / 60000)
      : 0;
    const handleContinue = async () => {
      const now = Date.now();
      await resetWorkout(dayIndex);
      const w = { exercises: workout.exercises || {}, startTime: now, completed: false };
      await saveWorkout(dayIndex, { exercises: workout.exercises || {}, start_time: now, completed: false });
      setWorkout(w);
      setStarted(true);
      setElapsed(0);
      if (onWorkoutStart) onWorkoutStart({ resumed: true, workout: w });
    };
    const handleReset = async () => {
      if (!confirm("Tüm set verileri silinecek. Emin misin?")) return;
      await saveWorkout(dayIndex, { exercises: {}, start_time: null, completed: false });
      setWorkout(null);
      setStarted(false);
      setElapsed(0);
      if (onWorkoutFinish) onWorkoutFinish();
    };
    return (
      <div className="timer-bar timer-completed">
        <div>
          <span>✅ Tamamlandı!</span>
          {dur > 0 && <span className="timer-dur"> · {dur} dk</span>}
        </div>
        <div className="timer-actions">
          <button className="timer-continue" onClick={handleContinue}>▶ Devam Et</button>
          <button className="timer-reset" onClick={handleReset}>↺ Sıfırla</button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <button className="timer-start" onClick={startWorkout}>
        ▶ Antrenmana Başla
      </button>
    );
  }

  return (
    <div className="timer-bar">
      <div className="timer-left">
        <span className="timer-dot">●</span>
        <span className="timer-clock">{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}</span>
      </div>
      <button className="timer-finish" onClick={finishWorkout}>Bitir ✓</button>
    </div>
  );
}

export default WorkoutTimer;
