import { useMemo, useState } from "react";
import { getHomeMealSections, getMealPlan, getDayType, getWorkoutSchedule } from "./mealPlanner";
import { calcDayCalories, getUserWeight } from "./calorieCalc";

const HOME_FILTERS = ["ekonomik", "yüksek protein", "çok pratik"];

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
            {meal.homeTags?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {meal.homeTags.map((tag) => (
                  <span
                    key={`${meal.name}-${tag}`}
                    style={{
                      fontSize: 10,
                      padding: "4px 8px",
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,.12)",
                      color: "#C4C4CC",
                      background: "rgba(255,255,255,.04)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
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
  const [activeFilters, setActiveFilters] = useState([]);
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
  const filteredSections = useMemo(() => {
    const filterMeals = (meals) => {
      if (activeFilters.length === 0) return meals;
      return meals.filter((meal) => activeFilters.every((filter) => meal.homeTags?.includes(filter)));
    };

    return {
      ...homeSections,
      breakfast: filterMeals(homeSections.breakfast),
      snack: filterMeals(homeSections.snack),
      dinner: filterMeals(homeSections.dinner),
    };
  }, [activeFilters, homeSections]);

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]
    );
  };

  if (!plan) return null;
  const { summary } = plan;

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
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "10px 0 14px" }}>
          {HOME_FILTERS.map((filter) => {
            const active = activeFilters.includes(filter);
            return (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                style={{
                  borderRadius: 999,
                  border: `1px solid ${active ? "#2A9D8F" : "#2A2A30"}`,
                  background: active ? "rgba(42,157,143,.12)" : "#17171B",
                  color: active ? "#E6FFFA" : "#C4C4CC",
                  padding: "6px 10px",
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>
        <SectionMealCard title={filteredSections.breakfastLabel} icon="🍳" meals={filteredSections.breakfast} />
        <SectionMealCard title={filteredSections.snackLabel} icon="🥛" meals={filteredSections.snack} />
        <SectionMealCard title={filteredSections.dinnerLabel} icon="🍽️" meals={filteredSections.dinner} />
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
      </div>

      <div className="meal-rec-title" style={{ marginTop: 18 }}>
        {filteredSections.mode === 'rest' ? 'Off day ev tipi öneriler' : 'Spor günü ev tipi öneriler'}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "10px 0 14px" }}>
        {HOME_FILTERS.map((filter) => {
          const active = activeFilters.includes(filter);
          return (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              style={{
                borderRadius: 999,
                border: `1px solid ${active ? "#2A9D8F" : "#2A2A30"}`,
                background: active ? "rgba(42,157,143,.12)" : "#17171B",
                color: active ? "#E6FFFA" : "#C4C4CC",
                padding: "6px 10px",
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              {filter}
            </button>
          );
        })}
      </div>
      <SectionMealCard title={filteredSections.breakfastLabel} icon="🍳" meals={filteredSections.breakfast} />
      <SectionMealCard title={filteredSections.snackLabel} icon="🥛" meals={filteredSections.snack} />
      <SectionMealCard title={filteredSections.dinnerLabel} icon="🍽️" meals={filteredSections.dinner} />
    </div>
  );
}
