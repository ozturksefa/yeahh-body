import { useMemo, useState } from "react";
import { getHomeMealSections, getMealPlan, getDayType, getWorkoutSchedule } from "./mealPlanner";
import { calcDayCalories, getUserWeight } from "./calorieCalc";

const HOME_FILTERS = ["ekonomik", "yüksek protein", "çok pratik"];
const MEAL_MACRO_THEMES = {
  calories: { fg: "var(--accent)", bg: "rgba(217,106,29,.14)" },
  protein: { fg: "var(--info)", bg: "rgba(79,163,255,.14)" },
  carbs: { fg: "var(--success)", bg: "rgba(56,193,114,.14)" },
  fat: { fg: "var(--warn)", bg: "rgba(230,162,60,.14)" },
};

function MacroPill({ label, value, unit, theme }) {
  return (
    <span className="meal-macro-pill" style={{ background: theme.bg, color: theme.fg }}>
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
            <MacroPill label="Kalori" value={meal.total.cal} unit="kcal" theme={MEAL_MACRO_THEMES.calories} />
            <MacroPill label="Protein" value={meal.total.pro} unit="g" theme={MEAL_MACRO_THEMES.protein} />
            <MacroPill label="Karb" value={meal.total.carb} unit="g" theme={MEAL_MACRO_THEMES.carbs} />
            <MacroPill label="Yağ" value={meal.total.fat} unit="g" theme={MEAL_MACRO_THEMES.fat} />
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
      <div className="meal-card-head meal-card-head-static">
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
          <div key={meal.name} className="meal-section-item">
            <div className="meal-name">{meal.name}</div>
            <div className="meal-desc">{meal.desc}</div>
            {meal.homeTags?.length > 0 && (
              <div className="meal-tag-row">
                {meal.homeTags.map((tag) => (
                  <span key={`${meal.name}-${tag}`} className="meal-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="meal-macros meal-tag-row">
              <MacroPill label="Kalori" value={meal.total.cal} unit="kcal" theme={MEAL_MACRO_THEMES.calories} />
              <MacroPill label="Protein" value={meal.total.pro} unit="g" theme={MEAL_MACRO_THEMES.protein} />
              <MacroPill label="Karb" value={meal.total.carb} unit="g" theme={MEAL_MACRO_THEMES.carbs} />
            </div>
            <div className="meal-foods">
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
          <div className="meal-fasted-icon">Yakın Öğün</div>
          <div className="meal-fasted-title">Antrenmana yakın hafif tut</div>
          <div className="meal-fasted-desc">
            Büyük öğünü antrenman sonrasına bırak; ilk uygun ana öğün yaklaşık <strong>{hour + 1}:00</strong>.
          </div>
          <div className="meal-fasted-tips">
            <div>Su veya sade kahve yeterli olabilir.</div>
            <div>Açsan küçük seçenek: muz, ayran veya yoğurt.</div>
            <div>Yağlı ve çok büyük öğünü antrenman sonrasına bırak.</div>
            <div>Antrenman sonrası normal protein + karb öğünü kur.</div>
          </div>
          <div className="meal-fasted-note">
            Amaç mideyi yormadan antrenmana girmek; çok aç kalman gerekmiyor.
          </div>
        </div>
        <div className="meal-rec-title">Bugünün ev tipi beslenme akışı</div>
        <div className="meal-filter-row">
          {HOME_FILTERS.map((filter) => {
            const active = activeFilters.includes(filter);
            return (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`meal-filter-chip ${active ? "meal-filter-chip-active" : ""}`}
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
                {" — "}ağır öğün yerine hafif tut.
              </div>
            );
          }
          if (minsToWorkout <= 0 && minsToWorkout > -60) {
            return <div className="meal-workout-timer">Antrenman sürüyor — sonrasında sade bir öğün kur.</div>;
          }
          if (minsToWorkout <= -60 && minsToWorkout > -180) {
            return <div className="meal-workout-timer">Antrenman bitti — ilk uygun öğünde protein + karb ekle.</div>;
          }
          return (
            <div className="meal-workout-timer">
              Antrenman: {isWeekend ? "09:00" : "07:00"} — yaklaştıkça öğünü hafiflet.
            </div>
          );
        })()}
        <div className="meal-summary-protein">
          Protein hedefi: <strong>{summary.proteinTarget}g</strong>
        </div>
        {(contextLabel || contextNote) && (
          <div className="meal-summary-tips">
            {contextLabel && <div className="meal-summary-tip">• Gün tipi: {contextLabel}</div>}
            {contextNote && <div className="meal-summary-tip">• {contextNote}</div>}
          </div>
        )}
      </div>

      <div className="meal-rec-title">
        {filteredSections.mode === 'rest' ? 'Off day ev tipi öneriler' : 'Spor günü ev tipi öneriler'}
      </div>
      <div className="meal-filter-row">
        {HOME_FILTERS.map((filter) => {
          const active = activeFilters.includes(filter);
          return (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`meal-filter-chip ${active ? "meal-filter-chip-active" : ""}`}
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
