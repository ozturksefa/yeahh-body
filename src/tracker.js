// Takip Sistemi — Supabase + localStorage fallback
import { supabase } from './supabaseClient';
import { formatLocalDate } from './dateUtils';
import { getStoredProgressionSuggestion } from './progressionMemory';

function todayStr() {
  return formatLocalDate(new Date());
}

async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

// Kas grubu eşleşme (egzersiz adından)
function getMuscleGroup(name) {
  const n = name.toLowerCase();
  if (n.includes('pull up') || n.includes('pulldown') || n.includes('row') || n.includes('lat')) return 'Sırt';
  if (n.includes('press') || n.includes('push up') || n.includes('chest') || n.includes('fly')) return 'Göğüs';
  if (n.includes('squat') || n.includes('leg') || n.includes('lunge') || n.includes('goblet')) return 'Bacak';
  if (n.includes('deadlift') || n.includes('rdl') || n.includes('romanian') || n.includes('hip')) return 'Kalça';
  if (n.includes('curl') || n.includes('bicep')) return 'Biceps';
  if (n.includes('tricep') || n.includes('extension') || n.includes('dip')) return 'Triceps';
  if (n.includes('shoulder') || n.includes('face pull') || n.includes('raise') || n.includes('rotation')) return 'Omuz';
  if (n.includes('core') || n.includes('plank') || n.includes('dead bug') || n.includes('knee raise') || n.includes('crunch')) return 'Core';
  if (n.includes('calf') || n.includes('ankle')) return 'Bacak';
  if (n.includes('row')) return 'Sırt';
  return 'Diğer';
}

// ─── PUBLIC API ────────────────────────────────────

export async function saveExerciseSets(dayIndex, exerciseName, sets) {
  const user = await getUser();
  if (!user) { fallbackSaveEx(dayIndex, exerciseName, sets); return; }

  const today = todayStr();
  const { data: existing } = await supabase
    .from('workouts')
    .select('id, exercises')
    .eq('user_id', user.id)
    .eq('day_index', dayIndex)
    .eq('workout_date', today)
    .maybeSingle();

  if (existing) {
    const exercises = { ...existing.exercises, [exerciseName]: sets };
    await supabase.from('workouts').update({ exercises, updated_at: new Date().toISOString() }).eq('id', existing.id);
  } else {
    await supabase.from('workouts').insert({
      user_id: user.id,
      day_index: dayIndex,
      workout_date: today,
      exercises: { [exerciseName]: sets },
      start_time: Date.now(),
    });
  }
}

export async function loadExerciseSets(dayIndex, exerciseName) {
  const user = await getUser();
  if (!user) return fallbackLoadEx(dayIndex, exerciseName);

  const { data } = await supabase
    .from('workouts')
    .select('exercises')
    .eq('user_id', user.id)
    .eq('day_index', dayIndex)
    .eq('workout_date', todayStr())
    .maybeSingle();

  return data?.exercises?.[exerciseName] || null;
}

export async function saveWorkout(dayIndex, workout) {
  const user = await getUser();
  if (!user) { fallbackSave(dayIndex, workout); return; }

  const today = todayStr();
  const { data: existing } = await supabase
    .from('workouts')
    .select('id')
    .eq('user_id', user.id)
    .eq('day_index', dayIndex)
    .eq('workout_date', today)
    .maybeSingle();

  if (existing) {
    await supabase.from('workouts').update({ ...workout, updated_at: new Date().toISOString() }).eq('id', existing.id);
  } else {
    await supabase.from('workouts').insert({ user_id: user.id, day_index: dayIndex, workout_date: today, ...workout });
  }
}

export async function loadWorkout(dayIndex) {
  const user = await getUser();
  if (!user) return fallbackLoadWorkout(dayIndex);

  const { data } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', user.id)
    .eq('day_index', dayIndex)
    .eq('workout_date', todayStr())
    .maybeSingle();

  if (!data) return null;
  return {
    exercises: data.exercises || {},
    startTime: data.start_time,
    endTime: data.end_time,
    completed: data.completed,
    day_index: data.day_index,
    workout_date: data.workout_date,
  };
}

// All completed workouts, newest first. Returns a consistent shape whether
// the user is on Supabase or the localStorage fallback.
export async function getAllCompletedWorkouts(limit = 60) {
  const user = await getUser();
  if (!user) return fallbackGetAllCompletedWorkouts(limit);

  const { data } = await supabase
    .from('workouts')
    .select('workout_date, day_index, exercises, start_time, end_time, completed')
    .eq('user_id', user.id)
    .eq('completed', true)
    .order('workout_date', { ascending: false })
    .limit(limit);

  return (data || []).map((row) => ({
    date: row.workout_date,
    dayIndex: row.day_index,
    exercises: row.exercises || {},
    startTime: row.start_time,
    endTime: row.end_time,
  }));
}

export async function getCompletedWorkoutsInRange(startDate, endDate) {
  if (!startDate || !endDate) return [];

  const user = await getUser();
  if (!user) return fallbackGetCompletedWorkoutsInRange(startDate, endDate);

  const { data } = await supabase
    .from('workouts')
    .select('workout_date, day_index, exercises, completed')
    .eq('user_id', user.id)
    .eq('completed', true)
    .gte('workout_date', startDate)
    .lte('workout_date', endDate)
    .order('workout_date', { ascending: true });

  return data || [];
}

export async function markWorkoutDone(dayIndex) {
  const user = await getUser();
  if (!user) { fallbackMarkDone(dayIndex); return; }

  await supabase
    .from('workouts')
    .update({ completed: true, end_time: Date.now(), updated_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .eq('day_index', dayIndex)
    .eq('workout_date', todayStr());
}

export async function resetWorkout(dayIndex) {
  const user = await getUser();
  if (!user) { fallbackResetWorkout(dayIndex); return; }

  await supabase
    .from('workouts')
    .update({ completed: false, end_time: null, start_time: Date.now(), updated_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .eq('day_index', dayIndex)
    .eq('workout_date', todayStr());
}

export async function getHistory(exerciseName, limit = 8) {
  const user = await getUser();
  if (!user) return fallbackGetHistory(exerciseName, limit);

  const { data } = await supabase
    .from('workouts')
    .select('workout_date, exercises')
    .eq('user_id', user.id)
    .order('workout_date', { ascending: false })
    .limit(50);

  if (!data) return [];
  const results = [];
  for (const row of data) {
    if (row.exercises?.[exerciseName]) {
      results.push({ date: row.workout_date, sets: row.exercises[exerciseName] });
    }
    if (results.length >= limit) break;
  }
  return results;
}

// RPE'yi localStorage'dan oku (ExertionRating'den kaydedilen)
function getRPEForSession(exerciseName, dayIndex) {
  try { return parseInt(localStorage.getItem(`yb_rpe_${dayIndex}_${exerciseName}`)) || 0; } catch { return 0; }
}

export async function suggestWeight(exerciseName, targetSets, targetReps, isUpperBody, dayIndex) {
  const memorySuggestion = getStoredProgressionSuggestion(exerciseName);
  if (memorySuggestion) return memorySuggestion;

  const history = await getHistory(exerciseName, 4);
  if (history.length === 0) return null;

  const last = history[0];
  const prev = history[1] || null;

  const lastSets = last.sets || [];
  if (lastSets.length === 0) return null;

  const lastWeight = Math.max(...lastSets.map(s => s.weight || 0));
  if (lastWeight === 0) return { weight: 0, reason: "İlk seans — kendin belirle", type: "first" };

  const inc = isUpperBody ? 2.5 : 5;

  // ─── RPE bazlı analiz ───────────────────────────────────────
  // Son seansin RPE'sini bul (dayIndex gerekli değil — history date'e göre)
  // localStorage'dan güncel dayIndex ile RPE oku
  const lastRPE = dayIndex ? getRPEForSession(exerciseName, dayIndex) : 0;

  // Son seansın tamamlanma durumu
  const lastAllDone = lastSets.every(s => s.done && (s.reps || 0) >= targetReps);
  // Önceki seansin tamamlanma durumu (2 ardışık kontrol)
  const prevSets = prev?.sets || [];
  const prevAllDone = prevSets.length > 0 && prevSets.every(s => s.done && (s.reps||0) >= targetReps);
  const prevWeight = prevSets.length > 0 ? Math.max(...prevSets.map(s => s.weight||0)) : 0;

  // ─── Karar mantığı ──────────────────────────────────────────

  // 1. RPE 9-10 → ağırlık indir veya aynı kal
  if (lastRPE >= 9) {
    const dec = lastRPE === 10 ? inc : 0;
    const newW = dec > 0 ? Math.max(lastWeight - dec, 0) : lastWeight;
    return {
      weight: newW,
      reason: `RPE ${lastRPE} — çok yoğun. ${dec > 0 ? `${dec}kg indir (${newW}kg)` : "Aynı ağırlıkta kal"}`,
      type: "down",
      rpe: lastRPE,
    };
  }

  // 2. RPE 7 ve altı + tamamlandı → artır (tek seans yeterli)
  if (lastRPE > 0 && lastRPE <= 7 && lastAllDone) {
    const newW = lastWeight + inc;
    return {
      weight: newW,
      reason: `RPE ${lastRPE} + tüm setler tamamlandı → +${inc}kg (${newW}kg)`,
      type: "up",
      rpe: lastRPE,
      confident: true,
    };
  }

  // 3. RPE 8 + 2 ardışık seans tamamlandı → artır
  if (lastAllDone && prevAllDone && lastWeight === prevWeight) {
    const newW = lastWeight + inc;
    return {
      weight: newW,
      reason: `2 ardışık seans ${lastWeight}kg tamamlandı → +${inc}kg (${newW}kg)`,
      type: "up",
      rpe: lastRPE,
      confident: true,
    };
  }

  // 4. Tamamlandı ama tek seans ve RPE belirsiz → aynı ağırlık, bir daha dene
  if (lastAllDone) {
    return {
      weight: lastWeight,
      reason: `${lastWeight}kg tamamlandı${lastRPE ? ` (RPE ${lastRPE})` : ""} — bir seans daha onayla, sonra artır`,
      type: "confirm",
      rpe: lastRPE,
    };
  }

  // 5. Tamamlanamadı → aynı ağırlık
  const incomplete = lastSets.filter(s => !s.done || (s.reps||0) < targetReps).length;
  return {
    weight: lastWeight,
    reason: `${incomplete} set eksik tamamlandı (${lastWeight}kg) — aynı ağırlıkta kal`,
    type: "same",
    rpe: lastRPE,
  };
}

export async function getWeeklyStats() {
  const user = await getUser();
  if (!user) return fallbackWeeklyStats();

  const now = new Date();
  const ws = new Date(now); ws.setDate(now.getDate() - now.getDay() + 1);
  const wsStr = formatLocalDate(ws);

  const { data } = await supabase
    .from('workouts')
    .select('exercises, start_time, end_time')
    .eq('user_id', user.id)
    .gte('workout_date', wsStr);

  if (!data) return { workouts: 0, totalSets: 0, totalDuration: 0 };

  let workouts = 0, totalSets = 0, totalDuration = 0;
  for (const w of data) {
    workouts++;
    for (const sets of Object.values(w.exercises || {})) {
      totalSets += Array.isArray(sets) ? sets.filter(s => s.done).length : 0;
    }
    if (w.start_time && w.end_time) totalDuration += w.end_time - w.start_time;
  }
  return { workouts, totalSets, totalDuration: Math.round(totalDuration / 60000) };
}

// ─── DASHBOARD API ─────────────────────────────────

export async function getDashboardStats() {
  const user = await getUser();
  if (!user) return { totalVolume: 0, workoutCount: 0, streak: 0, prs: [], weeklyVolumes: [] };

  const { data } = await supabase
    .from('workouts')
    .select('workout_date, exercises, start_time, end_time, completed, day_index')
    .eq('user_id', user.id)
    .order('workout_date', { ascending: false })
    .limit(200);

  if (!data || data.length === 0) return { totalVolume: 0, workoutCount: 0, streak: 0, prs: [], weeklyVolumes: [] };

  // Toplam hacim (kg × tekrar)
  let totalVolume = 0;
  const exerciseBests = {}; // PR takibi
  const dateSet = new Set();
  const muscleVolumes = {}; // Kas grubu hacim dağılımı
  const exerciseProgress = {}; // Egzersiz bazlı ilerleme

  for (const w of data) {
    if (w.completed) dateSet.add(w.workout_date);
    for (const [name, sets] of Object.entries(w.exercises || {})) {
      if (!Array.isArray(sets)) continue;
      let exMaxWeight = 0;
      for (const s of sets) {
        if (s.done && s.weight && s.reps) {
          const vol = s.weight * s.reps;
          totalVolume += vol;
          if (s.weight > exMaxWeight) exMaxWeight = s.weight;
          if (!exerciseBests[name] || s.weight > exerciseBests[name].weight) {
            exerciseBests[name] = { weight: s.weight, reps: s.reps, date: w.workout_date };
          }
          // Kas grubu — basit eşleşme
          const muscle = getMuscleGroup(name);
          muscleVolumes[muscle] = (muscleVolumes[muscle] || 0) + vol;
        }
      }
      // Egzersiz ilerleme
      if (exMaxWeight > 0) {
        if (!exerciseProgress[name]) exerciseProgress[name] = [];
        exerciseProgress[name].push({ date: w.workout_date, weight: exMaxWeight });
      }
    }
  }

  // Streak hesapla
  let streak = 0;
  const today = todayStr();
  // Haftalık antrenman günleri: Sal=2, Per=4, Cum=6, Paz=0
  const trainingDays = [2, 4, 6, 0];
  let checkDate = new Date(today);
  
  // Son 28 günü kontrol et
  for (let i = 0; i < 28; i++) {
    const dow = checkDate.getDay();
    const ds = formatLocalDate(checkDate);
    if (trainingDays.includes(dow)) {
      if (ds <= today && dateSet.has(ds)) {
        streak++;
      } else if (ds < today) {
        break; // Kaçırılan antrenman günü = streak biter
      }
    }
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // PR'lar — en yüksek ağırlık ilk 5
  const prs = Object.entries(exerciseBests)
    .filter(([, v]) => v.weight > 0)
    .sort((a, b) => b[1].weight - a[1].weight)
    .slice(0, 8)
    .map(([name, v]) => ({ name, weight: v.weight, reps: v.reps, date: v.date }));

  // Haftalık hacim (son 8 hafta)
  const weeklyVolumes = [];
  for (let w = 0; w < 8; w++) {
    const end = new Date(today);
    end.setDate(end.getDate() - w * 7);
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    const startStr = formatLocalDate(start);
    const endStr = formatLocalDate(end);

    let vol = 0;
    let count = 0;
    for (const d of data) {
      if (d.workout_date >= startStr && d.workout_date <= endStr) {
        count++;
        for (const sets of Object.values(d.exercises || {})) {
          if (!Array.isArray(sets)) continue;
          for (const s of sets) {
            if (s.done && s.weight && s.reps) vol += s.weight * s.reps;
          }
        }
      }
    }
    weeklyVolumes.unshift({ week: `H${8-w}`, volume: Math.round(vol), workouts: count });
  }

  return {
    totalVolume: Math.round(totalVolume),
    workoutCount: data.filter(d => d.completed).length,
    streak,
    prs,
    weeklyVolumes,
    muscleVolumes,
    exerciseProgress,
  };
}

// ─── LOCALSTORAGE FALLBACK ─────────────────────────
const LS = "nisus_tracker";
function lsL() { try { return JSON.parse(localStorage.getItem(LS)||"{}"); } catch { return {}; } }
function lsS(d) { localStorage.setItem(LS, JSON.stringify(d)); }
function wK(di) { return `${todayStr()}_day${di}`; }

function fallbackSave(di,u) { const a=lsL(); a[wK(di)]={...(a[wK(di)]||{}),...u,updatedAt:Date.now()}; lsS(a); }
function fallbackSaveEx(di,n,s) { const a=lsL(),k=wK(di); if(!a[k])a[k]={exercises:{},startTime:Date.now()}; a[k].exercises[n]=s; lsS(a); }
function fallbackLoadEx(di,n) { return lsL()[wK(di)]?.exercises?.[n]||null; }
function fallbackLoadWorkout(di) {
  const workout = lsL()[wK(di)] || null;
  if (!workout) return null;
  return {
    ...workout,
    startTime: workout.startTime ?? workout.start_time ?? null,
    endTime: workout.endTime ?? workout.end_time ?? null,
    completed: !!workout.completed,
    day_index: di,
    workout_date: todayStr(),
  };
}
function fallbackMarkDone(di) {
  const a = lsL();
  const key = wK(di);
  const now = Date.now();
  const existing = a[key] || { exercises: {}, startTime: now };
  a[key] = {
    ...existing,
    startTime: existing.startTime ?? existing.start_time ?? now,
    start_time: existing.startTime ?? existing.start_time ?? now,
    endTime: now,
    end_time: now,
    completed: true,
    updatedAt: now,
  };
  lsS(a);
}
function fallbackResetWorkout(di) {
  const a = lsL();
  const key = wK(di);
  const now = Date.now();
  const existing = a[key] || { exercises: {} };
  a[key] = {
    ...existing,
    startTime: now,
    start_time: now,
    endTime: null,
    end_time: null,
    completed: false,
    updatedAt: now,
  };
  lsS(a);
}
function fallbackGetHistory(n,l) {
  const a=lsL(),r=[];
  for(const[k,w]of Object.entries(a)){if(w.exercises?.[n])r.push({date:k.split("_")[0],sets:w.exercises[n]});}
  r.sort((a,b)=>b.date.localeCompare(a.date)); return r.slice(0,l);
}
function fallbackGetCompletedWorkoutsInRange(startDate, endDate) {
  const all = lsL();
  return Object.entries(all)
    .map(([key, workout]) => {
      const [workoutDate, dayToken] = key.split('_day');
      const dayIndex = Number(dayToken);
      return {
        workout_date: workoutDate,
        day_index: Number.isFinite(dayIndex) ? dayIndex : null,
        exercises: workout.exercises || {},
        completed: !!workout.completed,
      };
    })
    .filter((workout) => workout.completed && workout.workout_date >= startDate && workout.workout_date <= endDate);
}
function fallbackGetAllCompletedWorkouts(limit) {
  const all = lsL();
  const rows = Object.entries(all)
    .map(([key, workout]) => {
      const [workoutDate, dayToken] = key.split('_day');
      const dayIndex = Number(dayToken);
      return {
        date: workoutDate,
        dayIndex: Number.isFinite(dayIndex) ? dayIndex : null,
        exercises: workout.exercises || {},
        startTime: workout.startTime ?? workout.start_time ?? null,
        endTime: workout.endTime ?? workout.end_time ?? null,
        completed: !!workout.completed,
      };
    })
    .filter((w) => w.completed);
  rows.sort((a, b) => b.date.localeCompare(a.date));
  return rows.slice(0, limit);
}
function fallbackWeeklyStats() {
  const a=lsL(),now=new Date(),ws=new Date(now);ws.setDate(now.getDate()-now.getDay()+1);const wsS=formatLocalDate(ws);
  let w=0,s=0,d=0;
  for(const[k,wo]of Object.entries(a)){const dt=k.split("_")[0];if(dt>=wsS){w++;for(const sets of Object.values(wo.exercises||{}))s+=Array.isArray(sets)?sets.filter(x=>x.done).length:0;if(wo.startTime&&wo.endTime)d+=wo.endTime-wo.startTime;}}
  return{workouts:w,totalSets:s,totalDuration:Math.round(d/60000)};
}
