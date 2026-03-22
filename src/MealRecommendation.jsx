import { useState, useEffect } from "react";
import { getMealPlan, getDayType } from "./mealPlanner";
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

export default function MealRecommendation({ day, targets, totals }) {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    if (!targets) return;
    const dayType = getDayType(day);
    const w = getUserWeight();
    const workoutKcal = day && day.type !== 'offday'
      ? calcDayCalories(day, w).total
      : 0;
    const result = getMealPlan({ dayType, targets, totals, workoutKcal });
    setPlan(result);
  }, [day, targets, totals]);

  if (!plan) return null;
  const { meals, summary } = plan;

  return (
    <div className="meal-rec">
      {/* Günlük özet */}
      <div className="meal-summary">
        <div className="meal-summary-header">
          <span className="meal-summary-label">{summary.label}</span>
          {summary.workoutKcal > 0 && (
            <span className="meal-summary-kcal">
              🔥 {summary.workoutKcal} kcal yakıldı → hedef ~{summary.adjustedCal} kcal
            </span>
          )}
        </div>
        <div className="meal-summary-protein">
          Protein hedefi: <strong>{summary.proteinTarget}g</strong>
        </div>
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
    </div>
  );
}
