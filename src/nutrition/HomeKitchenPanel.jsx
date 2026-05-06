import { useMemo, useState } from "react";
import {
  HOME_PANTRY_ITEMS,
  getHomeKitchenSuggestions,
  loadHomePantry,
  saveHomePantry,
} from "./homeKitchen";

function MacroLine({ total }) {
  return (
    <div className="home-meal-macros">
      <span>{total.cal} kcal</span>
      <span>{total.pro}g P</span>
      <span>{total.carb}g K</span>
    </div>
  );
}

export default function HomeKitchenPanel({ nutritionContext, totals, targets, onAddMeal }) {
  const [selectedIds, setSelectedIds] = useState(loadHomePantry);

  const suggestions = useMemo(
    () => getHomeKitchenSuggestions({ selectedIds, nutritionContext, totals, targets }),
    [nutritionContext, selectedIds, targets, totals]
  );

  const toggleItem = (id) => {
    setSelectedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveHomePantry(next);
      return next;
    });
  };

  return (
    <div className="home-kitchen" data-testid="home-kitchen-panel">
      <div className="home-kitchen-head">
        <div>
          <div className="home-kitchen-title">Evde Ne Var?</div>
          <div className="home-kitchen-sub">Seçtiklerinden pratik öğün çıkarır.</div>
        </div>
        <div className="home-kitchen-count">{selectedIds.length}/{HOME_PANTRY_ITEMS.length}</div>
      </div>

      <div className="home-pantry-grid">
        {HOME_PANTRY_ITEMS.map((item) => {
          const active = selectedIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              className={`home-pantry-chip ${active ? "home-pantry-chip-active" : ""}`}
              onClick={() => toggleItem(item.id)}
              data-testid={`home-pantry-${item.id}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="home-meal-list">
        {suggestions.length === 0 && (
          <div className="home-meal-empty">
            Yumurta, yoğurt, pirinç/bulgur, tavuk, bakliyat veya yulaf gibi birkaç temel seç.
          </div>
        )}
        {suggestions.map((meal, index) => (
          <div key={meal.name} className="home-meal-card" data-testid={`home-meal-${index}`}>
            <div className="home-meal-top">
              <div>
                <div className="home-meal-name">{meal.name}</div>
                <div className="home-meal-desc">{meal.desc}</div>
              </div>
              <MacroLine total={meal.total} />
            </div>
            <div className="home-meal-foods">
              {meal.foods.map((food) => (
                <span key={`${meal.name}-${food.name}`}>{food.name}</span>
              ))}
            </div>
            <div className="home-meal-reason">{meal.reason}</div>
            <button
              type="button"
              className="home-meal-add"
              onClick={() => onAddMeal(meal)}
              data-testid={`home-meal-add-${index}`}
            >
              Öğünü Ekle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
