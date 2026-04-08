import { useMemo, useState } from "react";
import { getHomeMealSections, getMealPlan, getDayType, getWorkoutSchedule } from "./mealPlanner";
import { calcDayCalories, getUserWeight } from "./calorieCalc";

function MacroPill({ label, value, unit, color }) {
  return (
    <span className="meal-macro-pill" style={{ background: color + "22", color }}>
      {label} <strong>{value}{unit}</strong>
    </span>
  );
}

function FoodRow({ food }) {
  return (
    <div className="meal-food-row">
      <span className="meal-food-name">{food.name}</span>
      <span className="meal-food-macros">
        <span className="meal-food-cal">{food.cal}kcal</span>
        <span className="meal-food-pro">{food.pro}g P</span>
      </span>
    </div>
  );
}

function MealCard({ meal, rank }) {
  const [open, setOpen] = useState(rank === 0);
  return (
    <div className={`meal-card ${rank === 0 ? "meal-card-top" : ""}`}>
      <button className="meal-card-head" onClick={() => setOpen(o => !o)}>
        <div className="meal-card-left">
          <span className="meal-rank">{rank === 0 ? "🥇" : "🥈"}</span>
          <div>
            <div className="meal-name">{meal.name}</div>
            <div className="meal-desc">{meal.desc}</div>
          </div>
        </div>
        <div className="meal-card-right">
          <span className="meal-total-cal">{meal.total.cal} kcal</span>
          <span className="meal-toggle">{open ? "✕" : "+"}</span>
        </div>
      </button>
      {open && (
        <div className="meal-card-body">
          <div className="meal-macros">
            <MacroPill label="Kalori" value={meal.total.cal} unit="kcal" color="#FF6B35" />
            <MacroPill label="Protein" value={meal.total.pro} unit="g" color="#4FC3F7" />
            <MacroPill label="Karb" value={meal.total.carb} unit="g" color="#66BB6A" />
            <MacroPill label="Yağ" value={meal.total.fat} unit="g" color="#FFA726" />
          </div>
          <div className="meal-foods">
            {meal.foods.map((f, i) => <FoodRow key={i} food={f} />)}
          </div>
          {meal.tip && (
            <div className="meal-tip">💡 {meal.tip}</div>
          )}
        </div>
      )}
    </div>
  );
}

function SectionMealCard({ title, icon, meals }) {
  return (
    <div className="meal-card">
      <div className="meal-card-head" style={{ cursor: "default" }}>
        <div className="meal-card-left">
          <span className="meal-rank">{icon}</span>
          <div>
            <div className="meal-name">{title}</div>
            <div className="meal-desc">Evde yapılabilir, sade ve ulaşılabilir öneriler</div>
          </div>
        </div>
      </div>
      <div className="meal-card-body">
        {meals.map((meal) => (
          <div key={meal.name} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div className="meal-name" style={{ fontSize: 14 }}>{meal.name}</div>
            <div className="meal-desc" style={{ marginTop: 4 }}>{meal.desc}</div>
            <div className="meal-macros" style={{ marginTop: 8 }}>
              <MacroPill label="Kalori" value={meal.total.cal} unit="kcal" color="#FF6B35" />
              <MacroPill label="Protein" value={meal.total.pro} unit="g" color="#4FC3F7" />
              <MacroPill label="Karb" value={meal.total.carb} unit="g" color="#66BB6A" />
            </div>
            <div className="meal-foods" style={{ marginTop: 10 }}>
              {meal.foods.map((food, index) => <FoodRow key={`${meal.name}-${index}`} food={food} />)}
            </div>
            {meal.tip && <div className="meal-tip">💡 {meal.tip}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MealRecommendation({ day, targets, totals, dayTypeOverride = null, contextLabel = null, contextNote = null }) {
  const plan = useMemo(() => {
    if (!targets) return null;
    const dayType = dayTypeOverride || getDayType(day);
    const w = getUserWeight();
    const workoutKcal = day && day.type !== 'offday'
      ? calcDayCalories(day, w).total
      : 0;
    return getMealPlan({ dayType, targets, totals, workoutKcal });
  }, [day, dayTypeOverride, targets, totals]);
  const dayType = dayTypeOverride || getDayType(day);
  const homeSections = useMemo(() => getHomeMealSections(dayType), [dayType]);

  if (!plan) return null;
  const { meals, summary } = plan;

  // Fasted — antrenman öncesi/sırası
  if (plan.mealTime === 'fasted') {
    const { hour } = getWorkoutSchedule();
    return (
      <div className="meal-rec">
        <div className="meal-fasted">
          <div className="meal-fasted-icon">🚫🍽</div>
          <div className="meal-fasted-title">Antrenman öncesi yeme</div>
          <div className="meal-fasted-desc">
            Antrenman bittikten sonra <strong>~{hour + 1}:00</strong>'de ilk öğünü ye.
          </div>
          <div className="meal-fasted-tips">
            <div>✅ Su içebilirsin — bol su</div>
            <div>✅ Siyah kahve veya yeşil çay — performans artırır</div>
            <div>✅ Elektrolit tuz — terliyorsan ekle</div>
            <div>✅ Antrenman biter bitmez protein + karb hazır olsun</div>
          </div>
          <div className="meal-fasted-note">
            Fasted antrenman → insulin düşük → yağ yakımı yüksek. Antrenman sonrası ilk öğün kritik.
          </div>
        </div>
        <div className="meal-rec-title" style={{ marginTop: 14 }}>Bugünün ev tipi beslenme akışı</div>
        <SectionMealCard title={homeSections.breakfastLabel} icon="🍳" meals={homeSections.breakfast} />
        <SectionMealCard title={homeSections.snackLabel} icon="🥛" meals={homeSections.snack} />
        <SectionMealCard title={homeSections.dinnerLabel} icon="🍽️" meals={homeSections.dinner} />
      </div>
    );
  }

  return (
    <div className="meal-rec">
      {/* Günlük özet */}
      <div className="meal-summary">
        <div className="meal-summary-header">
          <span className="meal-summary-label">{summary.label}</span>
          {summary.workoutKcal > 0 && (
            <span className="meal-summary-kcal">
              🔥 {summary.workoutKcal} kcal yakıldı → ~{summary.adjustedCal} kcal
            </span>
          )}
        </div>
        {(() => {
          const { isWeekend, minsToWorkout } = getWorkoutSchedule();
          if (minsToWorkout > 0 && minsToWorkout < 180) {
            return (
              <div className="meal-workout-timer">
                ⏰ Antrenmana <strong>{minsToWorkout < 60
                  ? `${minsToWorkout} dk`
                  : `${Math.floor(minsToWorkout/60)}s ${minsToWorkout%60}dk`} kaldı</strong>
                {" — "}Yeme, sadece su 💧
              </div>
            );
          }
          if (minsToWorkout <= 0 && minsToWorkout > -60) {
            return <div className="meal-workout-timer">🏋️ Antrenman sürüyor — biter bitmez ye</div>;
          }
          if (minsToWorkout <= -60 && minsToWorkout > -180) {
            return <div className="meal-workout-timer">✅ Antrenman bitti — protein + karb penceresi açık, hemen ye!</div>;
          }
          return (
            <div className="meal-workout-timer">
              🏋️ Antrenman: {isWeekend ? "09:00" : "07:00"} — antrenman öncesi yemek yok
            </div>
          );
        })()}
        <div className="meal-summary-protein">
          Protein hedefi: <strong>{summary.proteinTarget}g</strong>
        </div>
        {(contextLabel || contextNote) && (
          <div className="meal-summary-tips" style={{ marginTop: 8 }}>
            {contextLabel && <div className="meal-summary-tip">• Gün tipi: {contextLabel}</div>}
            {contextNote && <div className="meal-summary-tip">• {contextNote}</div>}
          </div>
        )}
        <div className="meal-summary-tips">
          {summary.tips.map((t, i) => (
            <div key={i} className="meal-summary-tip">• {t}</div>
          ))}
        </div>
      </div>

      {/* Öğün önerileri */}
      <div className="meal-rec-title">Şu an için öneriler</div>
      {meals.map((m, i) => <MealCard key={i} meal={m} rank={i} />)}

      <div className="meal-rec-note">
        Öğünleri Beslenme takibine manuel ekleyebilirsin ↑
      </div>

      <div className="meal-rec-title" style={{ marginTop: 18 }}>
        {homeSections.mode === 'rest' ? 'Off day ev tipi öneriler' : 'Spor günü ev tipi öneriler'}
      </div>
      <SectionMealCard title={homeSections.breakfastLabel} icon="🍳" meals={homeSections.breakfast} />
      <SectionMealCard title={homeSections.snackLabel} icon="🥛" meals={homeSections.snack} />
      <SectionMealCard title={homeSections.dinnerLabel} icon="🍽️" meals={homeSections.dinner} />
    </div>
  );
}
