// Takip Sistemi — Supabase + localStorage fallback
import { supabase } from './supabaseClient';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
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
  return { exercises: data.exercises || {}, startTime: data.start_time, endTime: data.end_time, completed: data.completed };
}

export async function markWorkoutDone(dayIndex) {
  const user = await getUser();
  if (!user) return;

  await supabase
    .from('workouts')
    .update({ completed: true, end_time: Date.now(), updated_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .eq('day_index', dayIndex)
    .eq('workout_date', todayStr());
}

export async function resetWorkout(dayIndex) {
  const user = await getUser();
  if (!user) return;

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

export async function suggestWeight(exerciseName, targetSets, targetReps, isUpperBody) {
  const history = await getHistory(exerciseName, 4);
  if (history.length === 0) return null;

  const lastSession = history[0];
  const sets = lastSession.sets;
  if (!sets || sets.length === 0) return null;

  const allCompleted = sets.every(s => s.reps >= targetReps && s.done);
  const lastWeight = sets[0]?.weight || 0;

  if (allCompleted) {
    const inc = isUpperBody ? 2.5 : 5;
    return { weight: lastWeight + inc, reason: `Gecen sefer ${lastWeight}kg x ${targetReps} tamamladin → +${inc}kg artir`, type: "up" };
  }

  const incomplete = sets.filter(s => !s.done || s.reps < targetReps).length;
  if (incomplete > 0) {
    return { weight: lastWeight, reason: `Gecen sefer ${incomplete} set tamamlanamadi → ayni agirlikta kal (${lastWeight}kg)`, type: "same" };
  }
  return { weight: lastWeight, reason: "Ayni agirlikla devam et", type: "same" };
}

export async function getWeeklyStats() {
  const user = await getUser();
  if (!user) return fallbackWeeklyStats();

  const now = new Date();
  const ws = new Date(now); ws.setDate(now.getDate() - now.getDay() + 1);
  const wsStr = ws.toISOString().slice(0, 10);

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

  for (const w of data) {
    if (w.completed) dateSet.add(w.workout_date);
    for (const [name, sets] of Object.entries(w.exercises || {})) {
      if (!Array.isArray(sets)) continue;
      for (const s of sets) {
        if (s.done && s.weight && s.reps) {
          totalVolume += s.weight * s.reps;
          const vol = s.weight;
          if (!exerciseBests[name] || vol > exerciseBests[name].weight) {
            exerciseBests[name] = { weight: vol, reps: s.reps, date: w.workout_date };
          }
        }
      }
    }
  }

  // Streak hesapla
  const sortedDates = [...dateSet].sort().reverse();
  let streak = 0;
  const today = todayStr();
  // Haftalık antrenman günleri: Sal=2, Per=4, Cum=6, Paz=0
  const trainingDays = [2, 4, 6, 0];
  let checkDate = new Date(today);
  
  // Son 28 günü kontrol et
  for (let i = 0; i < 28; i++) {
    const dow = checkDate.getDay();
    const ds = checkDate.toISOString().slice(0, 10);
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
    .filter(([_, v]) => v.weight > 0)
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
    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);

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
function fallbackLoadWorkout(di) { return lsL()[wK(di)]||null; }
function fallbackGetHistory(n,l) {
  const a=lsL(),r=[];
  for(const[k,w]of Object.entries(a)){if(w.exercises?.[n])r.push({date:k.split("_")[0],sets:w.exercises[n]});}
  r.sort((a,b)=>b.date.localeCompare(a.date)); return r.slice(0,l);
}
function fallbackWeeklyStats() {
  const a=lsL(),now=new Date(),ws=new Date(now);ws.setDate(now.getDate()-now.getDay()+1);const wsS=ws.toISOString().slice(0,10);
  let w=0,s=0,d=0;
  for(const[k,wo]of Object.entries(a)){const dt=k.split("_")[0];if(dt>=wsS){w++;for(const sets of Object.values(wo.exercises||{}))s+=Array.isArray(sets)?sets.filter(x=>x.done).length:0;if(wo.startTime&&wo.endTime)d+=wo.endTime-wo.startTime;}}
  return{workouts:w,totalSets:s,totalDuration:Math.round(d/60000)};
}
