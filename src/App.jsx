import { useState, useEffect, useCallback, useRef } from "react";
import { PROGRAM } from "./data";
import { getGifUrl } from "./videoMap";
import { saveExerciseSets, loadExerciseSets, saveWorkout, loadWorkout, markWorkoutDone, resetWorkout, suggestWeight, getHistory, getDashboardStats } from "./tracker";
import { supabase } from "./supabaseClient";
import { saveFlow, loadFlow, clearFlow } from "./flowStore";
import NutritionTracker from "./Nutrition";
import AuthScreen from "./Auth";
import Dashboard, { WeeklyStats } from "./Dashboard";
import "./App.css";

const MULTI_LABELS = {
  "Dumbbell 4 Ways Lateral Raise": ["Öne Kaldırma", "Yana Kaldırma", "Arkaya Kaldırma", "Çapraz Kaldırma"],
  "Machine Lat Pulldown": ["Makine", "Kablo"],
  "Assisted Pull Up": ["Makine Destekli", "Band Destekli"],
  "Incline Dumbbell Press": ["Dumbbell", "Barbell"],
  "Straight Arm Pulldown": ["Bar Attachment", "Rope Attachment"],
  "Incline Dumbbell Curl": ["Versiyon 1", "Versiyon 2"],
  "Leg Press": ["Önden Görünüm", "Yandan Görünüm"],
  "Machine Seated Leg Curl": ["Oturarak", "Yatarak"],
  "Standing Dumbbell Hammer Curl": ["Standart", "Cross Body"],
  "Dumbbell Goblet Squat": ["Dumbbell", "Kettlebell"],
  "Dumbbell Romanian Deadlift": ["Dumbbell", "Barbell"],
  "Standing Dumbbell Reverse Curl": ["Dumbbell", "Barbell"],
  "Dumbbell Deadlift": ["Dumbbell", "Barbell"],
};

function SingleGif({ url, label }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [src, setSrc] = useState(url);

  // URL prop değişince (swap) state'i güncelle
  useEffect(() => {
    setSrc(url);
    setLoading(true);
    setError(false);
  }, [url]);

  // Retry once on error with cache-bust
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
        setLoading(true);
        setSrc(url + "?r=" + Date.now());
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [error, url]);

  return (
    <div className="gif-box">
      {loading && !error && (
        <div className="gif-loading-spinner">
          <div className="spinner"></div>
          <span>Yükleniyor…</span>
        </div>
      )}
      {!error && (
        <img
          key={src}
          src={src}
          alt={label || ""}
          className="gif-img"
          loading="eager"
          style={{ opacity: loading ? 0 : 1 }}
          onLoad={() => setLoading(false)}
          onError={() => { setLoading(false); setError(true); }}
        />
      )}
      {label && !loading && !error && <div className="gif-label">{label}</div>}
    </div>
  );
}

function ExerciseGif({ name }) {
  const gifUrl = getGifUrl(name);

  if (!gifUrl) {
    // GIF yoksa YouTube arama linki göster
    const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " exercise form")}`;
    return (
      <div className="gif-wrap gif-fallback">
        <a href={ytUrl} target="_blank" rel="noopener noreferrer" className="gif-yt-link">
          <span className="gif-yt-icon">▶</span>
          <span className="gif-yt-text">{name}<br/><small>YouTube'da izle</small></span>
        </a>
      </div>
    );
  }

  if (Array.isArray(gifUrl)) {
    const labels = MULTI_LABELS[name] || [];
    return (
      <div className="gif-wrap gif-multi">
        {gifUrl.map((url, i) => (
          <SingleGif key={i} url={url} label={labels[i] || null} />
        ))}
      </div>
    );
  }

  return (
    <div className="gif-wrap">
      <SingleGif url={gifUrl} />
    </div>
  );
}

// Dinlenme süresi belirleme (saniye)
function getRestDuration(blockName, exerciseName) {
  const bn = blockName?.toUpperCase() || "";
  const en = exerciseName?.toLowerCase() || "";
  
  if (bn.includes("FİNİSHER")) return 45;
  if (bn.includes("CORE")) return 60;
  if (bn.includes("CALİSTHENİCS")) return 75;
  
  // Kuvvet — compound vs isolation
  if (bn.includes("KUVVET")) {
    const compound = ["squat","deadlift","press","pull up","chin up","row","hip thrust","lunge","step up","leg press"];
    if (compound.some(c => en.includes(c))) return 120;
    return 90; // isolation: curl, raise, extension
  }
  return 90;
}

function RestTimer({ seconds, exerciseName, isTransition, onDismiss, onAdjust }) {
  const [remaining, setRemaining] = useState(seconds);
  const [done, setDone] = useState(false);
  const [mini, setMini] = useState(false);

  useEffect(() => {
    setRemaining(seconds);
    setDone(false);
    setMini(false);
  }, [seconds, exerciseName]);

  useEffect(() => {
    if (remaining <= 0) {
      setDone(true);
      setMini(false); // Expand when done
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.value = 0.3;
        osc.start(); osc.stop(ctx.currentTime + 0.3);
      } catch {}
      return;
    }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const pct = seconds > 0 ? ((seconds - remaining) / seconds) * 100 : 100;
  const timeStr = `${mins}:${String(secs).padStart(2, "0")}`;

  if (mini && !done) {
    return (
      <div className="rest-mini" onClick={() => setMini(false)}>
        <div className="rest-mini-ring">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="21" fill="none" stroke="#333" strokeWidth="3" />
            <circle cx="24" cy="24" r="21" fill="none" stroke="var(--red)" strokeWidth="3"
              strokeDasharray={`${(pct / 100) * 132} 132`}
              strokeLinecap="round" transform="rotate(-90 24 24)" />
          </svg>
          <span className="rest-mini-time">{timeStr}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`rest-timer ${done ? "rest-timer-done" : ""}`}>
      <div className="rest-progress" style={{ width: `${pct}%` }} />
      <div className="rest-content">
        <div className="rest-left">
          <div className="rest-label">{done ? "✅ DİNLENME BİTTİ" : isTransition ? "🔄 HAREKET ARASI" : "⏱ SET ARASI"}</div>
          <div className="rest-ex-name">{isTransition ? `${exerciseName} bitti → Sonraki harekete geç` : exerciseName}</div>
        </div>
        <div className="rest-right">
          {!done && (
            <div className="rest-countdown" onClick={() => setMini(true)} style={{cursor:"pointer"}}>{timeStr}</div>
          )}
          <div className="rest-actions">
            {!done && (
              <>
                <button className="rest-adj" onClick={() => onAdjust(-15)}>-15</button>
                <button className="rest-adj" onClick={() => onAdjust(15)}>+15</button>
              </>
            )}
            <button className="rest-dismiss" onClick={onDismiss}>{done ? (isTransition ? "Sonraki Hareket →" : "Sonraki Set →") : "Atla"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
function parseSets(setsStr) {
  const m = setsStr.match(/(\d+)\s*[×x]\s*(\d+)/);
  if (m) return { setCount: parseInt(m[1]), reps: parseInt(m[2]), timed: false };
  const t = setsStr.match(/(\d+)\s*[×x]\s*(\d+)\s*sn/i);
  if (t) return { setCount: parseInt(t[1]), reps: parseInt(t[2]), timed: true };
  return null;
}

// Üst vücut mu?
function isUpper(exerciseName) {
  const lower = ["squat","deadlift","lunge","press leg","hip thrust","bridge","leg curl","leg ext","step up","calf","cossack","swing","sled","monster","hip hinge","jefferson","farmer"];
  return !lower.some(k => exerciseName.toLowerCase().includes(k));
}

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

function SetTracker({ ex, dayIndex, blockName, onStartRest, onAllDone }) {
  // Sadece kuvvet, calisthenics, core ve finisher bloklarında göster
  const trackBlocks = ["KUVVET", "CALİSTHENİCS", "CORE", "FİNİSHER"];
  const showTracker = trackBlocks.some(b => blockName?.toUpperCase().includes(b));
  if (!showTracker) return null;

  const parsed = parseSets(ex.sets);
  if (!parsed || parsed.timed) return null;

  const { setCount, reps: targetReps } = parsed;
  const [sets, setSets] = useState(Array.from({ length: setCount }, () => ({ weight: 0, reps: 0, done: false })));
  const [suggestion, setSuggestion] = useState(null);
  const [history, setHistoryData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [prFlash, setPrFlash] = useState(null); // set index that just hit PR

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [saved, sug, hist] = await Promise.all([
        loadExerciseSets(dayIndex, ex.name),
        suggestWeight(ex.name, setCount, targetReps, isUpper(ex.name)),
        getHistory(ex.name, 3),
      ]);
      if (cancelled) return;
      if (saved && saved.length === setCount) setSets(saved);
      setSuggestion(sug);
      setHistoryData(hist);
      setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, [dayIndex, ex.name]);

  const updateSet = (i, field, val) => {
    setSets(prev => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: val };
      saveExerciseSets(dayIndex, ex.name, next);
      return next;
    });
  };

  const toggleDone = (i) => {
    setSets(prev => {
      const next = [...prev];
      const wasDone = next[i].done;
      next[i] = { ...next[i], done: !wasDone };
      saveExerciseSets(dayIndex, ex.name, next);
      
      // Haptic feedback on check
      if (!wasDone && navigator.vibrate) navigator.vibrate(30);

      // PR detection — is this weight higher than all history?
      if (!wasDone && next[i].weight > 0 && history.length > 0) {
        const histWeights = history.flatMap(h => h.sets.map(s => s.weight || 0)).filter(w => w > 0);
        if (histWeights.length > 0 && next[i].weight > Math.max(...histWeights)) {
          setPrFlash(i);
          if (navigator.vibrate) navigator.vibrate([50, 50, 100]);
          setTimeout(() => setPrFlash(null), 3000);
        }
      }

      // Set tamamlandıysa dinlenme zamanlayıcısını başlat
      if (!wasDone && onStartRest) {
        const doneCount = next.filter(s => s.done).length;
        const isLastSet = doneCount >= setCount;
        const baseRest = getRestDuration(blockName, ex.name);
        
        if (isLastSet) {
          // Son set → hareket arası (daha uzun + farklı mesaj)
          onStartRest(baseRest + 60, ex.name, true);
        } else {
          // Ortadaki set → set arası
          onStartRest(baseRest, ex.name, false);
        }
      }
      return next;
    });
  };

  const fillAll = (weight) => {
    setSets(prev => {
      const next = prev.map(s => ({ ...s, weight }));
      saveExerciseSets(dayIndex, ex.name, next);
      return next;
    });
  };

  const allDone = sets.every(s => s.done);

  useEffect(() => {
    if (onAllDone) onAllDone(allDone);
  }, [allDone]);

  if (!loaded) return <div className="tracker" style={{textAlign:"center",padding:12,color:"#555",fontSize:11}}>Yükleniyor...</div>;

  return (
    <div className="tracker">
      <div className="tracker-head">
        <span className="tracker-title">📝 SET TAKİBİ</span>
        {allDone && <span className="tracker-done-badge">✓ Tamamlandı</span>}
      </div>

      {prFlash !== null && (
        <div className="pr-flash">🏆 YENİ REKOR!</div>
      )}

      {suggestion && (
        <div className={`tracker-suggest ${suggestion.type === "up" ? "suggest-up" : "suggest-same"}`}>
          <span className="suggest-icon">{suggestion.type === "up" ? "⬆" : "➡"}</span>
          <span>{suggestion.reason}</span>
          {suggestion.type === "up" && (
            <button className="suggest-apply" onClick={() => fillAll(suggestion.weight)}>
              {suggestion.weight}kg Uygula
            </button>
          )}
        </div>
      )}

      <div className="tracker-grid">
        <div className="tracker-grid-head">
          <span>Set</span><span>Önceki</span><span>Ağırlık</span><span>Tekrar</span><span></span>
        </div>
        {sets.map((s, i) => {
          const prev = history.length > 0 && history[0].sets[i] ? history[0].sets[i] : null;
          const prevStr = prev ? `${prev.weight || 0}×${prev.reps || 0}` : "—";
          // Color: green if better, red if worse, gray if same/no data
          const prevColor = !prev ? "#555" : (s.done && s.weight > (prev.weight||0)) ? "#4CAF50" : (s.done && s.weight < (prev.weight||0)) ? "#FF5252" : "#555";
          return (
            <div key={i} className={`tracker-row ${s.done ? "tracker-row-done" : ""}`}>
              <span className="tracker-set-n">{i + 1}</span>
              <span className="tracker-prev" style={{color: prevColor}}>{prevStr}</span>
              <input type="number" inputMode="decimal" className="tracker-input"
                value={s.weight || ""} placeholder={prev ? `${prev.weight}` : "kg"}
                onChange={e => updateSet(i, "weight", parseFloat(e.target.value) || 0)} />
              <input type="number" inputMode="numeric" className="tracker-input"
                value={s.reps || ""} placeholder={`${targetReps}`}
                onChange={e => updateSet(i, "reps", parseInt(e.target.value) || 0)} />
              <button className={`tracker-check ${s.done ? "tracker-check-on" : ""}`}
                onClick={() => toggleDone(i)}>
                {s.done ? "✓" : "○"}
              </button>
            </div>
          );
        })}
      </div>

      {allDone && (
        <ExertionRating exerciseName={ex.name} dayIndex={dayIndex} />
      )}

      {history.length > 0 && (
        <div className="tracker-history">
          <span className="tracker-hist-label">Geçmiş:</span>
          {history.map((h, i) => {
            const best = Math.max(...h.sets.map(s => s.weight || 0));
            const reps = h.sets.map(s => s.reps).join("/");
            return <span key={i} className="tracker-hist-item">{h.date.slice(5)}: {best}kg ({reps})</span>;
          })}
        </div>
      )}
    </div>
  );
}

function WorkoutTimer({ dayIndex, onWorkoutStart, onWorkoutFinish, finishRef, onElapsed }) {
  const [workout, setWorkout] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
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
  }, [dayIndex]);

  useEffect(() => {
    if (!started || workout?.completed) return;
    const start = workout?.startTime || Date.now();
    const timer = setInterval(() => {
      const e = Math.floor((Date.now() - start) / 1000);
      setElapsed(e);
      if (onElapsed) onElapsed(e);
    }, 1000);
    return () => clearInterval(timer);
  }, [started, workout?.completed, workout?.startTime]);

  const startWorkout = async () => {
    const now = Date.now();
    const w = { exercises: {}, startTime: now, completed: false, start_time: now };
    await saveWorkout(dayIndex, { exercises: {}, start_time: now, completed: false });
    setWorkout(w);
    setStarted(true);
    setElapsed(0);
    if (onWorkoutStart) onWorkoutStart();
  };

  const finishWorkout = async () => {
    await markWorkoutDone(dayIndex);
    setWorkout(prev => ({ ...prev, completed: true, endTime: Date.now() }));
    setStarted(false);
    if (onWorkoutFinish) onWorkoutFinish();
  };

  // Expose finishWorkout to parent via ref
  useEffect(() => {
    if (finishRef) finishRef.current = finishWorkout;
  });

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
      if (onWorkoutStart) onWorkoutStart();
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



function ExerciseNote({ exerciseName }) {
  const key = `yb_exnote_${exerciseName}`;
  const [note, setNote] = useState(() => {
    try { return localStorage.getItem(key) || ""; } catch { return ""; }
  });
  const [editing, setEditing] = useState(false);

  const save = (val) => {
    setNote(val);
    try {
      if (val) localStorage.setItem(key, val);
      else localStorage.removeItem(key);
    } catch {}
  };

  if (!editing && !note) {
    return <button className="exnote-add" onClick={() => setEditing(true)}>+ Not ekle</button>;
  }

  return (
    <div className="exnote">
      {editing ? (
        <div className="exnote-edit">
          <textarea className="exnote-textarea" value={note} onChange={e => save(e.target.value)}
            placeholder="Bu harekete not ekle... (ör: sağ omuz ağrıdı, 20kg rahat geldi)" rows={2} autoFocus />
          <button className="exnote-done" onClick={() => setEditing(false)}>✓</button>
        </div>
      ) : (
        <div className="exnote-view" onClick={() => setEditing(true)}>
          <span className="exnote-icon">📝</span>
          <span className="exnote-text">{note}</span>
        </div>
      )}
    </div>
  );
}

function ExerciseCard({ ex, blockColor, isOpen, onToggle, dayIndex, blockName, onStartRest, swaps, onSwap, onAdvance, workoutActive, isLastEx, onAllSetsDone }) {
  const cardRef = useRef(null);
  const originalName = ex.name;
  const swappedName = swaps?.[originalName] || null;
  const displayName = swappedName || originalName;

  const handleToggle = () => {
    const wasOpen = isOpen;
    onToggle();
    if (!wasOpen) {
      // Wait for DOM to settle (old exercise closes + new one opens)
      setTimeout(() => {
        if (cardRef.current) {
          const headerHeight = document.querySelector('.hdr')?.offsetHeight || 0;
          const cardTop = cardRef.current.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: cardTop - headerHeight - 8, behavior: "smooth" });
        }
      }, 80);
    }
  };

  const handleSwap = (altName) => {
    onSwap(originalName, altName);
  };

  const handleRevert = () => {
    onSwap(originalName, null);
  };

  return (
    <div className="ex-wrap" ref={cardRef}>
      <button className="ex-header" onClick={handleToggle}
        style={{ borderLeft: `3px solid ${blockColor}` }}>
        <div className="ex-left">
          <div className="ex-name">
            {displayName}
            {swappedName && <span className="swap-badge">🔄</span>}
          </div>
          <div className="ex-meta">
            <span className="ex-sets" style={{ background: blockColor + "33", color: blockColor }}>{ex.sets}</span>
            <span className="ex-muscle">{ex.muscle}</span>
          </div>
        </div>
        <span className="ex-toggle">{isOpen ? "✕" : "+"}</span>
      </button>

      {isOpen && (
        <div className="ex-body">

          {swappedName && (
            <div className="swap-info">
              <span className="swap-info-text">🔄 <strong>{originalName}</strong> yerine kullanılıyor</span>
              <button className="swap-revert" onClick={handleRevert}>Orijinaline Dön</button>
            </div>
          )}

          <ExerciseGif name={displayName} />

          <SetTracker ex={ex} dayIndex={dayIndex} blockName={blockName} onStartRest={onStartRest} onAllDone={onAllSetsDone} />
          <ExerciseNote exerciseName={displayName} />

          <div className="section">
            <div className="section-label" style={{ color: blockColor }}>YAPILIŞ</div>
            {ex.how.map((s, i) => (
              <div key={i} className="step">
                <span className="step-n" style={{ color: blockColor }}>{i + 1}.</span>
                <span className="step-t">{s}</span>
              </div>
            ))}
          </div>

          {ex.avoid && (
            <div className="avoid-box">
              <strong>✕ YAPMA: </strong>{ex.avoid}
            </div>
          )}
          {ex.warn && <div className="warn-box">⚠ {ex.warn}</div>}
          {ex.alts?.length > 0 && (
            <div className="section">
              <div className="section-label" style={{ color: "var(--purple)" }}>ALTERNATİF — değiştirmek için dokun</div>
              {ex.alts.map((a, i) => {
                const isActive = swappedName === a;
                return (
                  <button key={i} className={`alt-btn ${isActive ? "alt-btn-active" : ""}`}
                    onClick={() => isActive ? handleRevert() : handleSwap(a)}>
                    <span className="alt-n">{isActive ? "✓" : `${i + 1}.`}</span>
                    <span className="alt-name">{a}</span>
                    <span className="alt-action">{isActive ? "Geri Al" : "Değiştir"}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BlockCard({ block, blockIdx, expandedEx, onExToggle, dayIndex, onStartRest, swaps, onSwap, forceOpen, onAdvance, isLastEx, workoutActive, onAllSetsDone }) {
  const [manualOpen, setManualOpen] = useState(false);
  const open = forceOpen || manualOpen;
  return (
    <div className="block">
      <button className="block-head" onClick={() => setManualOpen(o => !o)} style={{ background: block.color }}>
        <div>
          <div className="block-name">{block.name}</div>
          <div className="block-count">{block.exercises.length} hareket</div>
        </div>
        <span style={{ color: "#fff", fontSize: 20, transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      {open && (
        <div className="block-body" style={{ borderColor: block.color + "44" }}>
          {block.exercises.map((ex, ei) => {
            const key = `${blockIdx}-${ei}`;
            return (
              <ExerciseCard key={key} ex={ex} blockColor={block.color}
                isOpen={expandedEx === key}
                onToggle={() => onExToggle(key)}
                dayIndex={dayIndex}
                blockName={block.name}
                onStartRest={onStartRest}
                swaps={swaps}
                onSwap={onSwap}
                onAdvance={onAdvance}
                workoutActive={workoutActive}
                isLastEx={isLastEx && ei === block.exercises.length - 1}
                onAllSetsDone={expandedEx === key ? onAllSetsDone : null} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(undefined);
  const [page, setPage] = useState("program");
  const [day, setDay] = useState(0);
  const [expandedEx, setExpandedEx] = useState(null);
  const [guideOpen, setGuideOpen] = useState(null);
  const [restTimer, setRestTimer] = useState(null);
  const [swaps, setSwaps] = useState(() => {
    try { return JSON.parse(localStorage.getItem("yb_swaps") || "{}"); } catch { return {}; }
  });

  const handleSwap = (originalName, altName) => {
    setSwaps(prev => {
      const next = { ...prev };
      if (altName === null) {
        delete next[originalName];
      } else {
        next[originalName] = altName;
      }
      localStorage.setItem("yb_swaps", JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const d = PROGRAM.days[day];
  const g = PROGRAM.guide;
  const total = d.blocks.reduce((a, b) => a + b.exercises.length, 0);

  // Workout flow state
  const [workoutActive, setWorkoutActive] = useState(false);
  const [openBlocks, setOpenBlocks] = useState({});
  const [globalAllDone, setGlobalAllDone] = useState(false);
  const [workoutElapsed, setWorkoutElapsed] = useState(0);
  const [streak, setStreak] = useState(0);

  // Load streak
  useEffect(() => {
    if (user) getDashboardStats().then(s => setStreak(s.streak || 0)).catch(() => {});
  }, [user]);

  // Session restore from IndexedDB — runs ONCE after auth resolves
  const flowRestoredRef = useRef(false);
  useEffect(() => {
    if (user === undefined || user === null || flowRestoredRef.current) return;
    flowRestoredRef.current = true;
    loadFlow().then(saved => {
      if (!saved) return;
      // CRITICAL: Update prevDayRef BEFORE setDay — otherwise day change effect
      // sees prevDayRef(0) !== saved.day and wipes all restored state
      prevDayRef.current = saved.day;
      // Apply restored state
      setDay(saved.day);
      setWorkoutActive(true);
      setExpandedEx(saved.expandedEx);
      const bi = parseInt(saved.expandedEx.split("-")[0]);
      setOpenBlocks({ [bi]: true });
      // Scroll to restored exercise after DOM renders
      setTimeout(() => {
        const tryScroll = (attempts) => {
          if (attempts <= 0) return;
          const openBody = document.querySelector('.ex-body');
          if (!openBody) { setTimeout(() => tryScroll(attempts - 1), 200); return; }
          const card = openBody.closest('.ex-wrap');
          if (!card) return;
          const hdrH = document.querySelector('.hdr')?.offsetHeight || 0;
          const top = card.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: top - hdrH - 8, behavior: "smooth" });
        };
        tryScroll(8);
      }, 300);
    });
  }, [user]);

  // Persist flow state to IndexedDB on changes
  useEffect(() => {
    if (!flowRestoredRef.current) return; // Don't save before restore completes
    if (workoutActive && expandedEx) {
      saveFlow({ day, expandedEx, workoutActive: true });
    } else if (!workoutActive) {
      clearFlow();
    }
  }, [workoutActive, expandedEx, day]);

  // Day change — reset flow
  const prevDayRef = useRef(day);
  useEffect(() => {
    if (prevDayRef.current !== day) {
      prevDayRef.current = day;
      setExpandedEx(null); setWorkoutActive(false); setOpenBlocks({}); setGlobalAllDone(false);
      clearFlow();
    }
  }, [day]);

  // Flat exercise list: [{key: "0-0", blockIdx: 0, exIdx: 0}, ...]
  const flatExercises = [];
  d.blocks.forEach((block, bi) => {
    block.exercises.forEach((ex, ei) => {
      flatExercises.push({ key: `${bi}-${ei}`, blockIdx: bi, exIdx: ei });
    });
  });

  // Current exercise tracker check
  const currentFlat = flatExercises.find(f => f.key === expandedEx);
  const currentBlock = currentFlat ? d.blocks[currentFlat.blockIdx] : null;
  const currentEx = currentBlock ? currentBlock.exercises[currentFlat.exIdx] : null;
  const currentBlockName = currentBlock?.name || "";
  const trackBlockNames = ["KUVVET", "CALİSTHENİCS", "CORE", "FİNİSHER"];
  const currentHasTracker = currentEx && trackBlockNames.some(b => currentBlockName.toUpperCase().includes(b)) && parseSets(currentEx.sets) && !parseSets(currentEx.sets)?.timed;
  const isLastExGlobal = currentFlat && flatExercises.indexOf(currentFlat) === flatExercises.length - 1;
  const canAdvance = workoutActive && expandedEx && (!currentHasTracker || globalAllDone);

  const openExercise = (key) => {
    const bi = parseInt(key.split("-")[0]);
    setOpenBlocks(prev => ({ ...prev, [bi]: true }));
    setExpandedEx(key);
    setGlobalAllDone(false); // Reset when switching exercises
    // Scroll to newly opened exercise after DOM settles
    setTimeout(() => {
      const el = document.querySelector('.ex-wrap [class*="ex-header"]:not([style])');
      // Find the open card
      const cards = document.querySelectorAll('.ex-wrap');
      for (const card of cards) {
        if (card.querySelector('.ex-body')) {
          const headerHeight = document.querySelector('.hdr')?.offsetHeight || 0;
          const cardTop = card.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: cardTop - headerHeight - 8, behavior: "smooth" });
          break;
        }
      }
    }, 120);
  };

  const handleWorkoutStart = () => {
    if (flatExercises.length > 0) {
      setWorkoutActive(true);
      const firstKey = flatExercises[0].key;
      const bi = parseInt(firstKey.split("-")[0]);
      setOpenBlocks({ [bi]: true });
      setExpandedEx(firstKey);
      // Scroll after render
      setTimeout(() => {
        const cards = document.querySelectorAll('.ex-wrap');
        for (const card of cards) {
          if (card.querySelector('.ex-body')) {
            const headerHeight = document.querySelector('.hdr')?.offsetHeight || 0;
            const cardTop = card.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: cardTop - headerHeight - 8, behavior: "smooth" });
            break;
          }
        }
      }, 150);
    }
  };

  const timerRef = useRef(null);
  const wakeLockRef = useRef(null);

  // Current exercise index for progress
  const currentExIndex = flatExercises.findIndex(f => f.key === expandedEx);

  const handleAdvance = () => {
    if (currentExIndex < 0) return;
    const nextIdx = currentExIndex + 1;
    if (nextIdx >= flatExercises.length) {
      setExpandedEx(null);
      setWorkoutActive(false);
      setOpenBlocks({});
      if (timerRef.current) timerRef.current();
      releaseWakeLock();
      clearFlow();
      return;
    }
    openExercise(flatExercises[nextIdx].key);
  };

  const handleGoBack = () => {
    if (currentExIndex <= 0) return;
    openExercise(flatExercises[currentExIndex - 1].key);
  };

  // Wake Lock — ekran kararmasını engelle
  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      }
    } catch {}
  };
  const releaseWakeLock = () => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release();
      wakeLockRef.current = null;
    }
  };

  // Activate/deactivate wake lock with workout
  useEffect(() => {
    if (workoutActive) {
      requestWakeLock();
      // Re-acquire on visibility change (e.g. switch back to tab)
      const onVis = () => { if (document.visibilityState === 'visible' && workoutActive) requestWakeLock(); };
      document.addEventListener('visibilitychange', onVis);
      return () => { document.removeEventListener('visibilitychange', onVis); releaseWakeLock(); };
    } else {
      releaseWakeLock();
    }
  }, [workoutActive]);

  const handleWorkoutFinish = () => {
    setWorkoutActive(false);
    setExpandedEx(null);
    setOpenBlocks({});
    releaseWakeLock();
    clearFlow();
  };

  // Auth loading
  if (user === undefined) {
    return <div className="auth-screen"><div className="auth-box"><div className="auth-brand">YEAHH BODY</div><div style={{color:"#666",marginTop:16}}>Yükleniyor...</div></div></div>;
  }

  // Not logged in
  if (!user) {
    return <AuthScreen />;
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const startRest = (seconds, exerciseName, isTransition) => {
    setRestTimer({ seconds, exerciseName, isTransition: !!isTransition, key: Date.now() });
  };
  const adjustRest = (delta) => {
    setRestTimer(prev => prev ? { ...prev, seconds: Math.max(5, prev.seconds + delta), key: Date.now() } : null);
  };

  const guideCards = [
    { id: "rest", icon: "⏱", title: "Setler Arası Ne Kadar Dinleneyim?", content: (
      <div>{g.restRules.map((r, i) => (
        <div key={i} className="guide-row">
          <span className="guide-label">{r.block}</span>
          <span className="guide-value">{r.rest}</span>
          <span className="guide-note">{r.note}</span>
        </div>
      ))}</div>
    )},
    { id: "rpe", icon: "💪", title: "Ne Kadar Zorlanmalıyım?", content: (
      <div>{g.rpeGuide.map((r, i) => (
        <div key={i} className="guide-row">
          <span className="guide-label">{r.category}</span>
          <span className="guide-value">{r.rpe}</span>
          <span className="guide-note">{r.desc}</span>
        </div>
      ))}</div>
    )},
    { id: "tempo", icon: "🐢", title: "Ne Kadar Yavaş/Hızlı Yapayım?", content: (
      <div className="guide-text">{g.tempo}</div>
    )},
    { id: "prog", icon: "📈", title: "Her Hafta Ne Değişecek?", content: (
      <div>{g.progression.map((p, i) => (
        <div key={i} className="guide-step"><span className="guide-step-n">{i+1}.</span> {p}</div>
      ))}</div>
    )},
    { id: "super", icon: "⚡", title: "Zaman Kazandıran İkili Hareketler", content: (
      <div>
        <div className="guide-text" style={{marginBottom:8}}>A hareketini yap → dinlenmek yerine B hareketini yap → sonra dinlen. Böylece aynı sürede daha fazla iş yaparsın.</div>
        {g.supersets.map((s, i) => (
        <div key={i} className="guide-row">
          <span className="guide-label">{s.a}</span>
          <span className="guide-value">→</span>
          <span className="guide-note">{s.b} ({s.note})</span>
        </div>
      ))}</div>
    )},
    { id: "off", icon: "🛌", title: "Antrenman Olmayan Günlerde Ne Yapayım?", content: (
      <div>
        {g.offDays.activities.map((a, i) => (
          <div key={i} className="guide-step"><span className="guide-step-n">•</span> {a}</div>
        ))}
        <div className="avoid-box" style={{marginTop:8}}><strong>✕ YAPMA: </strong>{g.offDays.avoid}</div>
      </div>
    )},
    { id: "deload", icon: "🔋", title: "Dinlenme Haftası (Her 4 haftada bir)", content: (
      <div>{g.deload.rules.map((r, i) => (
        <div key={i} className="guide-step"><span className="guide-step-n">{i+1}.</span> {r}</div>
      ))}</div>
    )},
    { id: "phase", icon: "🎯", title: "2. Döneme Ne Zaman Geçerim?", content: (
      <div>
        <div className="guide-text" style={{marginBottom:8}}>Hafta 8 sonunda bu testleri yap. Hepsini geçersen 2. döneme hazırsın:</div>
        {g.phaseTransition.tests.map((t, i) => (
          <div key={i} className="guide-row">
            <span className="guide-label">{t.name}</span>
            <span className="guide-value">{t.pass}</span>
            <span className="guide-note">{t.current}</span>
          </div>
        ))}
        <div className="guide-text" style={{marginTop:8, color:"#8B83FF"}}>→ {g.phaseTransition.nextPhase}</div>
      </div>
    )},
    { id: "cardio", icon: "🚶", title: "Haftalık Yürüyüş/Kardio Hedefi", content: (
      <div className="guide-text">{g.weeklyCardio}</div>
    )},
  ];

  return (
    <div className="app">
      <header className="hdr">
        <div className="hdr-top">
          <div className="brand">YEAHH BODY</div>
          <button className="logout-btn" onClick={logout}>Çıkış</button>
        </div>
        <div className="prog-title">Kişisel Antrenman Programı</div>
        {streak > 0 && <div className="streak-badge">🔥 {streak} antrenman üst üste</div>}
        <div className="page-nav">
          <button className={`page-tab ${page === "program" ? "page-tab-active" : ""}`}
            onClick={() => setPage("program")}>🏋️ Program</button>
          <button className={`page-tab ${page === "dashboard" ? "page-tab-active" : ""}`}
            onClick={() => setPage("dashboard")}>📊 İlerleme</button>
          <button className={`page-tab ${page === "nutrition" ? "page-tab-active" : ""}`}
            onClick={() => setPage("nutrition")}>🍽 Beslenme</button>
        </div>
        {page === "program" && (
        <div className="tabs">
          {PROGRAM.days.map((dd, i) => (
            <button key={i}
              className={`tab ${day === i ? "tab-active" : ""}`}
              style={day === i ? { background: dd.color, borderColor: dd.color } : {}}
              onClick={() => setDay(i)}>
              <div className="tab-t">{dd.title}</div>
              <div className="tab-s">{dd.sub}</div>
            </button>
          ))}
        </div>
        )}
      </header>

      {page === "dashboard" ? (
        <main className="main">
          <Dashboard />
        </main>
      ) : page === "nutrition" ? (
        <main className="main">
          <NutritionTracker />
        </main>
      ) : (
      <>
      <div className="day-hdr" style={{ borderColor: d.color + "44", background: d.color + "0D" }}>
        <div className="day-top">
          <div>
            <div className="day-focus" style={{ color: d.color }}>{d.focus}</div>
            <div className="day-meta">{d.duration} · {total} egzersiz</div>
          </div>
          <div className="day-badge" style={{ background: d.color }}>{d.sub}</div>
        </div>
        <div className="injury">{d.injury}</div>
      </div>

      <main className="main">
        <WorkoutTimer dayIndex={day} onWorkoutStart={handleWorkoutStart} onWorkoutFinish={handleWorkoutFinish} finishRef={timerRef} onElapsed={setWorkoutElapsed} />
        <WeeklyStats />

        {d.blocks.map((block, bi) => {
          const isLastBlock = bi === d.blocks.length - 1;
          return (
            <BlockCard key={bi} block={block} blockIdx={bi}
              expandedEx={expandedEx}
              onExToggle={k => setExpandedEx(p => p === k ? null : k)}
              dayIndex={day}
              onStartRest={startRest}
              swaps={swaps}
              onSwap={handleSwap}
              forceOpen={!!openBlocks[bi]}
              onAdvance={workoutActive ? handleAdvance : null}
              workoutActive={workoutActive}
              isLastEx={isLastBlock}
              onAllSetsDone={setGlobalAllDone} />
          );
        })}

        <div className="pain-card">
          <div className="pain-title">⚠️ AĞRI PROTOKOLÜ</div>
          {[
            { e: "🟢", t: "Yanma / Kasılma → Normal. Devam et." },
            { e: "🟡", t: "Sızı / Gerginlik → Dur, formu kontrol et." },
            { e: "🔴", t: "Keskin / Bıçak gibi ağrı → Anında bırak. Koçuna bildir." },
          ].map((x, i) => (
            <div key={i} className="pain-row"><span>{x.e}</span><span>{x.t}</span></div>
          ))}
        </div>
        <div className="footer">Hafta 4 sonu: Push-up & pull-up testi · Hafta 8: Faz 2 değerlendirmesi</div>

        <div className="guide-section">
          <div className="guide-header">📋 ANTRENMAN REHBERİ — Sıkça Sorulan Sorular</div>
          <div className="guide-sub">{g.phase} · {g.weeks}</div>
          {guideCards.map(card => (
            <div key={card.id} className="guide-card">
              <button className="guide-card-head" onClick={() => setGuideOpen(p => p === card.id ? null : card.id)}>
                <span>{card.icon} {card.title}</span>
                <span style={{ transition: "transform 0.2s", transform: guideOpen === card.id ? "rotate(180deg)" : "none" }}>▾</span>
              </button>
              {guideOpen === card.id && (
                <div className="guide-card-body">{card.content}</div>
              )}
            </div>
          ))}
        </div>
      </main>
      </>
      )}
      {restTimer && (
        <RestTimer
          key={restTimer.key}
          seconds={restTimer.seconds}
          exerciseName={restTimer.exerciseName}
          isTransition={restTimer.isTransition}
          onDismiss={() => setRestTimer(null)}
          onAdjust={adjustRest}
        />
      )}
      {workoutActive && expandedEx && !restTimer && (
        <div className="advance-bar">
          <div className="advance-progress">
            <div className="advance-progress-fill" style={{ width: `${((currentExIndex + 1) / flatExercises.length) * 100}%` }} />
          </div>
          <div className="advance-status">
            <span className="advance-timer">{String(Math.floor(workoutElapsed / 60)).padStart(2, "0")}:{String(workoutElapsed % 60).padStart(2, "0")}</span>
            <span className="advance-counter">{currentExIndex + 1} / {flatExercises.length}</span>
            <span className="advance-ex-name">{currentEx?.name || ""}</span>
          </div>
          <div className="advance-buttons">
            {currentExIndex > 0 && (
              <button className="advance-back-btn" onClick={handleGoBack}>← Önceki</button>
            )}
            {canAdvance ? (
              <button className={`advance-bar-btn ${isLastExGlobal ? "advance-bar-finish" : ""}`}
                onClick={handleAdvance}>
                {isLastExGlobal ? "✅ Bitir" : "Sonraki →"}
              </button>
            ) : (
              <div className="advance-bar-hint">Setleri tamamla ✓</div>
            )}
            {currentFlat && (() => {
              const nextBlockIdx = currentFlat.blockIdx + 1;
              const nextBlockFirst = flatExercises.find(f => f.blockIdx === nextBlockIdx);
              if (!nextBlockFirst) return null;
              const remaining = flatExercises.filter(f => f.blockIdx === currentFlat.blockIdx && flatExercises.indexOf(f) > currentExIndex).length;
              if (remaining <= 0) return null;
              return <button className="advance-skip-btn" onClick={() => openExercise(nextBlockFirst.key)}>Bloğu Atla ⏭</button>;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
