import { useMemo, useState } from "react";
import { PROGRAM_HYBRID } from "../dataHybrid";
import {
  average,
  buttonBase,
  getRelevantSkillsForDay,
  getSkillUnit,
  getSkillValue,
  getStepGoal,
  getStepMetric,
  getWeeklyDecision,
} from "./shared";

export function FieldButtons({ value, options, onChange }) {
  return (
    <div className="panel-choice-row">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            style={{ ...buttonBase, minWidth: 60 }}
            className={`panel-choice-btn ${active ? "panel-choice-btn-active" : ""}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function FieldSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="panel-select"
    >
      {[0, 1, 2, 3, 4, 5].map((score) => (
        <option key={score} value={score}>{score}/5</option>
      ))}
    </select>
  );
}

export function SectionCard({ title, children, accent = "#7A7A84", ...props }) {
  return (
    <div className="panel-card" style={{ "--panel-accent": accent }} {...props}>
      <div className="panel-card-title">
        {title}
      </div>
      {children}
    </div>
  );
}

export function SkillTracker({ skillPaths, entries, skillState, onSetSkillLevel }) {
  const last7 = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 6);
    return Object.values(entries)
      .filter((entry) => entry.post?.completed)
      .filter((entry) => new Date(entry.date) >= cutoff);
  }, [entries]);

  const completedEntries = useMemo(
    () => Object.values(entries).filter((entry) => entry.post?.completed),
    [entries]
  );

  return (
    <div className="panel-stack" data-testid="skill-page">
      <SectionCard title="Skill İlerleme" accent="#8338EC">
        <div className="skill-tracker" style={{ paddingBottom: 0 }}>
          {Object.entries(skillPaths).map(([key, path]) => {
            const current = skillState[key]?.level || 1;
            const step = path.steps.find((item) => item.level === current);
            const nextStep = path.steps.find((item) => item.level === current + 1);
            const currentMetric = getStepMetric(step);
            const allSkillEntries = completedEntries.filter((entry) => entry.post?.skillWork?.[key]?.done);
            const bestValue = allSkillEntries.reduce((best, entry) => Math.max(best, getSkillValue(entry.post?.skillWork?.[key])), 0);
            const weeklyEntries = last7.filter((entry) => entry.post?.skillWork?.[key]?.done);
            const weeklyContacts = weeklyEntries.length;
            const symptomValues = weeklyEntries.map((entry) => {
              const shoulder = Number(entry.post?.shoulderAfter ?? entry.pre?.shoulder ?? 0);
              const spine = Number(entry.post?.spineAfter ?? entry.pre?.spine ?? 0);
              return key === "handstand" ? Math.max(shoulder, spine) : shoulder;
            });
            const symptomAvg = average(symptomValues);
            const targetValue = getStepGoal(step);
            const readyToProgress = !!nextStep && weeklyContacts >= 2 && (targetValue === 0 || bestValue >= targetValue) && symptomAvg <= 2;

            return (
              <div key={key} className="skill-card" data-testid={`skill-card-${key}`}>
                <div className="skill-card-header">
                  <span className="skill-name">{path.name}</span>
                  <span className="skill-level">Seviye {current}/{path.steps.length}</span>
                </div>

                <div className="skill-progress-bar">
                  {path.steps.map((item) => (
                    <div
                      key={item.level}
                      className={`skill-step ${item.level <= current ? "skill-step-done" : ""} ${item.level === current ? "skill-step-current" : ""}`}
                      onClick={() => onSetSkillLevel(key, item.level)}
                    />
                  ))}
                </div>

                <div className="skill-current">
                  <span className="skill-current-label">Şu an:</span>
                  <span className="skill-current-name">{step?.name}</span>
                  <span className="skill-current-target">{step?.target}</span>
                </div>

                <div className="panel-detail-text" style={{ marginBottom: 8 }}>
                  {step?.detail}
                </div>

                <div className="panel-mini-grid" style={{ marginBottom: 8 }}>
                  <div className="panel-mini-card" data-testid={`skill-contacts-${key}`}>
                    <div className="panel-mini-label">Haftalık Temas</div>
                    <div className="panel-mini-value">{weeklyContacts}</div>
                  </div>
                  <div className="panel-mini-card">
                    <div className="panel-mini-label">
                      En İyi {currentMetric === "reps" ? "Tekrar" : "Süre"}
                    </div>
                    <div className="panel-mini-value">{bestValue} {getSkillUnit(currentMetric)}</div>
                  </div>
                  <div className="panel-mini-card">
                    <div className="panel-mini-label">Semptom Ort.</div>
                    <div className="panel-mini-value" style={{ color: symptomAvg <= 2 ? "var(--success)" : "var(--warn)" }}>{symptomAvg || 0}/5</div>
                  </div>
                </div>

                {nextStep && (
                  <div className="skill-next">
                    <span className="skill-next-label">Sonraki:</span>
                    <span className="skill-next-name">{nextStep.name} — {nextStep.target}</span>
                  </div>
                )}

                <div className={`panel-status-box ${readyToProgress ? "panel-status-success" : "panel-status-warn"}`} style={{ marginBottom: 8 }}>
                  {readyToProgress
                    ? `İlerlemeye yakınsın: ${path.successRule}.`
                    : `Henüz erken: ${path.weeklyGoal} ve ${step?.target || "hedef kalite"} civarı temiz kalite arıyoruz.`}
                </div>

                <div className="panel-detail-text" style={{ marginBottom: 8 }}>• {path.successRule}</div>
                <div className="panel-detail-text" style={{ marginBottom: 8 }}>• {path.caution}</div>

                <div className="skill-level-btns">
                  <button onClick={() => onSetSkillLevel(key, Math.max(1, current - 1))} disabled={current <= 1}>‹</button>
                  <span>Seviye güncelle</span>
                  <button onClick={() => onSetSkillLevel(key, Math.min(path.steps.length, current + 1))} disabled={current >= path.steps.length}>›</button>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}

export function DailyCheckinPanel({ day, mode, setMode, activeVariant, pre, setPre, lockedMode = null }) {
  const [open, setOpen] = useState(false);
  const update = (field, value) => setPre((prev) => ({ ...prev, [field]: value }));
  const modeSwitchEnabled = !lockedMode;
  const symptomMax = Math.max(Number(pre.shoulder || 0), Number(pre.knee || 0), Number(pre.spine || 0));
  const summaryTone = symptomMax >= 3 ? "#FF5252" : pre.energy === "düşük" || pre.sleep === "kötü" ? "#FFA726" : "#2A9D8F";

  return (
    <div className="panel-stack" style={{ padding: "10px 12px 0" }}>
      <button
        onClick={() => setOpen((value) => !value)}
        className="checkin-summary"
        style={{ borderColor: `${summaryTone}44` }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: summaryTone, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>
              Antrenman Öncesi Hazırlık
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginTop: 4 }}>
              {mode === "home" ? "🏠 Ev" : "🏋️ Macfit"} · {pre.energy || "orta"} enerji · {pre.sleep || "orta"} uyku
            </div>
            <div style={{ fontSize: 11, color: "#C4C4CC", marginTop: 6, lineHeight: 1.5 }}>
              Omuz {pre.shoulder || 0}/5 · Diz {pre.knee || 0}/5 · Bel/Boyun {pre.spine || 0}/5
            </div>
            <div style={{ fontSize: 11, color: "#7A7A84", marginTop: 6, lineHeight: 1.45 }}>
              {day.intent}
            </div>
          </div>
          <div style={{ fontSize: 18, color: "#7A7A84" }}>{open ? "−" : "+"}</div>
        </div>
      </button>

        <div style={{ display: "grid", gap: 8 }}>
        <div className="panel-mode-row">
          {[
            { id: "home", label: "🏠 Ev" },
            { id: "gym", label: "🏋️ Macfit" },
          ].map((item) => {
            const active = mode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => modeSwitchEnabled && setMode(item.id)}
                disabled={!modeSwitchEnabled}
                style={{ ...buttonBase, flex: 1, opacity: modeSwitchEnabled ? 1 : 0.72, cursor: modeSwitchEnabled ? "pointer" : "default" }}
                className={`panel-choice-btn panel-mode-btn ${active ? "panel-choice-btn-active panel-mode-btn-active" : ""}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="panel-note-box">
          {modeSwitchEnabled
            ? activeVariant.modeNote
            : `Bu ekran sabit olarak ${mode === "home" ? "Ev" : "Macfit"} yolunu gösterir.`}
        </div>
      </div>

      {open && (
        <>
          <SectionCard title="Antrenman Öncesi Check-in" accent="#2A9D8F">
            <div style={{ display: "grid", gap: 10 }}>
              <div>
                  <div className="panel-field-label">Enerji</div>
                <FieldButtons value={pre.energy} onChange={(v) => update("energy", v)} options={[{ value: "iyi", label: "İyi" }, { value: "orta", label: "Orta" }, { value: "düşük", label: "Düşük" }]} />
              </div>
              <div>
                  <div className="panel-field-label">Uyku</div>
                <FieldButtons value={pre.sleep} onChange={(v) => update("sleep", v)} options={[{ value: "iyi", label: "İyi" }, { value: "orta", label: "Orta" }, { value: "kötü", label: "Kötü" }]} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
                <div>
                  <div className="panel-field-label">Omuz</div>
                  <FieldSelect value={pre.shoulder} onChange={(v) => update("shoulder", v)} />
                </div>
                <div>
                  <div className="panel-field-label">Diz</div>
                  <FieldSelect value={pre.knee} onChange={(v) => update("knee", v)} />
                </div>
                <div>
                  <div className="panel-field-label">Bel/Boyun</div>
                  <FieldSelect value={pre.spine} onChange={(v) => update("spine", v)} />
                </div>
              </div>
            </div>
          </SectionCard>
        </>
      )}

    </div>
  );
}

export function DailyCheckoutPanel({ post, setPost, daySub, skillPaths, skillState, onComplete }) {
  const update = (field, value) => setPost((prev) => ({ ...prev, [field]: value }));
  const relevantSkills = getRelevantSkillsForDay(daySub, skillPaths);

  const updateSkill = (skillKey, patch) => {
    const level = skillState?.[skillKey]?.level || 1;
    const step = skillPaths[skillKey]?.steps.find((item) => item.level === level) || skillPaths[skillKey]?.steps?.[0];
    const metric = getStepMetric(step);
    setPost((prev) => ({
      ...prev,
      skillWork: {
        ...(prev.skillWork || {}),
        [skillKey]: {
          done: false,
          metric,
          value: 0,
          seconds: 0,
          reps: 0,
          ...(prev.skillWork?.[skillKey] || {}),
          ...patch,
        },
      },
    }));
  };

  return (
    <div style={{ padding: "0 12px 12px" }} data-testid="checkout-panel">
      <SectionCard title="Seans Sonu Check-out" accent="#FFA726">
        <div style={{ display: "grid", gap: 10 }}>
          <div className={`panel-status-box ${post.completed ? "panel-status-success" : "panel-status-neutral"}`}>
            <div style={{ fontSize: 11, color: post.completed ? "#9EF0BA" : "#FFA726", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>
              Son Adım
            </div>
            <div style={{ fontSize: 12, color: "#C4C4CC", lineHeight: 1.5, marginTop: 6 }}>
              RPE, semptom ve kısa skill kaydını doldur; ardından seansı tamamlandı olarak işaretle.
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, color: "#7A7A84", marginBottom: 6 }}>Genel RPE</div>
            <FieldButtons value={post.rpe} onChange={(v) => update("rpe", v)} options={[6, 7, 8].map((v) => ({ value: String(v), label: String(v) }))} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#7A7A84", marginBottom: 6 }}>Kondisyon hissi</div>
            <FieldButtons value={post.cardio} onChange={(v) => update("cardio", v)} options={[{ value: "rahat", label: "Rahat" }, { value: "uygun", label: "Uygun" }, { value: "fazla", label: "Fazla" }]} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: "#7A7A84", marginBottom: 6 }}>Omuz sonrası</div>
              <FieldSelect value={post.shoulderAfter} onChange={(v) => update("shoulderAfter", v)} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#7A7A84", marginBottom: 6 }}>Diz sonrası</div>
              <FieldSelect value={post.kneeAfter} onChange={(v) => update("kneeAfter", v)} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#7A7A84", marginBottom: 6 }}>Bel/Boyun sonrası</div>
              <FieldSelect value={post.spineAfter} onChange={(v) => update("spineAfter", v)} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#7A7A84", marginBottom: 6 }}>Bir sonraki seans notu</div>
            <FieldButtons value={post.nextAction} onChange={(v) => update("nextAction", v)} options={[{ value: "aynı", label: "Aynı" }, { value: "azalt", label: "Azalt" }, { value: "swap", label: "Swap" }]} />
          </div>

          {relevantSkills.length > 0 && (
            <div style={{ display: "grid", gap: 8 }}>
              <div className="panel-meta-text" style={{ marginBottom: 2 }}>Skill Kaydı</div>
              {relevantSkills.map(([skillKey, path]) => {
                const level = skillState?.[skillKey]?.level || 1;
                const step = path.steps.find((item) => item.level === level) || path.steps[0];
                const metric = getStepMetric(step);
                const data = post.skillWork?.[skillKey] || { done: false, metric, value: 0, seconds: 0, reps: 0 };
                const value = getSkillValue(data);
                return (
                  <div key={skillKey} className="panel-mini-card skill-log-card" data-testid={`skill-log-${skillKey}`}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", marginBottom: 8 }}>
                      <div>
                        <div className="skill-log-title">{path.name}</div>
                        <div className="skill-log-meta">Aktif seviye: {step?.name}</div>
                        <div className="panel-meta-text" style={{ marginTop: 4 }}>{path.weeklyGoal}</div>
                      </div>
                      <button
                        onClick={() => updateSkill(skillKey, { done: !data.done })}
                        data-testid={`skill-log-toggle-${skillKey}`}
                        style={{
                          ...buttonBase,
                          minWidth: 96,
                          background: data.done ? "rgba(138,99,246,.16)" : "var(--card)",
                          borderColor: data.done ? "var(--purple)" : "var(--border)",
                          color: data.done ? "#F6F0FF" : "var(--text2)",
                        }}
                      >
                        {data.done ? "✓ Yapıldı" : "Yapılmadı"}
                      </button>
                    </div>

                    {data.done && (
                      <div>
                        <div className="panel-meta-text" style={{ marginBottom: 6 }}>
                          En iyi temiz {metric === "reps" ? "tekrar" : "süre"}
                        </div>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={value}
                          data-testid={`skill-log-input-${skillKey}`}
                          onChange={(e) => {
                            const nextValue = Math.max(0, Number(e.target.value) || 0);
                            updateSkill(skillKey, {
                              metric,
                              value: nextValue,
                              seconds: metric === "seconds" ? nextValue : 0,
                              reps: metric === "reps" ? nextValue : 0,
                            });
                          }}
                          className="panel-input"
                        />
                        <div style={{ fontSize: 10, color: "#7A7A84", marginTop: 6 }}>Hedef: {step?.target || path.steps[0]?.target}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <button
            onClick={onComplete}
            style={{ ...buttonBase, width: "100%" }}
            className={`panel-complete-btn ${post.completed ? "panel-complete-btn-done" : ""}`}
            data-testid="checkout-complete-button"
          >
            {post.completed ? "✅ Seans kaydedildi" : "Seansı tamamlandı olarak işaretle"}
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

export function WeeklyReview({ entries, activeWeek }) {
  const last7 = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 6);
    return entries
      .filter((entry) => entry.post?.completed)
      .filter((entry) => new Date(entry.date) >= cutoff)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [entries]);

  const totals = useMemo(() => {
    const values = { home: 0, gym: 0, aerobic: 0, avgShoulder: 0, avgKnee: 0, avgSpine: 0, avgRpe: 0 };
    if (!last7.length) return values;
    last7.forEach((entry) => {
      values[entry.mode] += 1;
      values.aerobic += Number(entry.aerobicMinutes || 0);
      values.avgShoulder += Number(entry.post?.shoulderAfter ?? entry.pre?.shoulder ?? 0);
      values.avgKnee += Number(entry.post?.kneeAfter ?? entry.pre?.knee ?? 0);
      values.avgSpine += Number(entry.post?.spineAfter ?? entry.pre?.spine ?? 0);
      values.avgRpe += Number(entry.post?.rpe || 0);
    });
    values.avgShoulder = +(values.avgShoulder / last7.length).toFixed(1);
    values.avgKnee = +(values.avgKnee / last7.length).toFixed(1);
    values.avgSpine = +(values.avgSpine / last7.length).toFixed(1);
    values.avgRpe = +(values.avgRpe / last7.length).toFixed(1);
    return values;
  }, [last7]);

  const skillContacts = Object.fromEntries(
    Object.entries(PROGRAM_HYBRID.skillPaths).map(([key]) => [
      key,
      last7.filter((entry) => entry.post?.skillWork?.[key]?.done).length,
    ])
  );

  const decision = getWeeklyDecision({ last7, totals, skillContacts, activeWeek, skillPaths: PROGRAM_HYBRID.skillPaths });

  return (
    <div className="panel-stack" style={{ padding: "10px 12px 12px" }}>
      <SectionCard title="Haftalık Özet" accent="#4FC3F7">
        <div className="panel-mini-grid">
          {[
            ["Tamamlanan Seans", String(last7.length)],
            ["Aerobik Dakika", `${totals.aerobic} dk`],
            ["Ev / Gym", `${totals.home} / ${totals.gym}`],
            ["Ortalama RPE", totals.avgRpe ? String(totals.avgRpe) : "—"],
            ["Omuz / Diz", `${totals.avgShoulder || 0} / ${totals.avgKnee || 0}`],
            ["Bel-Boyun", totals.avgSpine ? String(totals.avgSpine) : "0"],
          ].map(([label, value]) => (
            <div key={label} className="panel-mini-card">
              <div className="panel-mini-label">{label}</div>
              <div className="panel-mini-value">{value}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Sistem Kararı" accent={decision.tone}>
        <div style={{ display: "grid", gap: 8 }}>
          <div className="panel-status-box" style={{ borderColor: `${decision.tone}44` }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: decision.tone }}>{decision.label}</div>
            <div className="panel-detail-text" style={{ marginTop: 6 }}>{decision.summary}</div>
            <div className="panel-meta-text" style={{ marginTop: 8 }}>Aktif hafta: {activeWeek.week} · {activeWeek.label}</div>
          </div>
          {decision.actions.map((item) => (
            <div key={item} className="panel-detail-text">• {item}</div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Skill Teması" accent="#8338EC">
        <div className="panel-mini-grid">
          {Object.entries(PROGRAM_HYBRID.skillPaths).map(([key, path]) => (
            <div key={key} className="panel-mini-card">
              <div className="skill-log-title">{path.name}</div>
              <div style={{ fontSize: 13, color: "var(--purple)", fontWeight: 800, marginTop: 6 }}>{skillContacts[key]} temas</div>
              <div className="panel-meta-text" style={{ marginTop: 4 }}>{path.weeklyGoal}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Son Seanslar" accent="#7A7A84">
        <div style={{ display: "grid", gap: 8 }}>
          {last7.length === 0 && <div className="panel-meta-text" style={{ fontSize: 12 }}>Henüz tamamlanmış seans yok.</div>}
          {last7.map((entry) => (
            <div key={`${entry.date}-${entry.day}-${entry.mode}`} className="panel-mini-card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{entry.day} · {entry.mode === "home" ? "Ev" : "Macfit"}</div>
                  <div className="panel-meta-text" style={{ marginTop: 4 }}>{entry.date}</div>
                </div>
                <div className="panel-detail-text" style={{ fontSize: 11 }}>RPE {entry.post?.rpe || "—"}</div>
              </div>
              <div className="panel-detail-text" style={{ marginTop: 8 }}>
                Omuz {entry.post?.shoulderAfter ?? entry.pre?.shoulder ?? 0}/5 · Diz {entry.post?.kneeAfter ?? entry.pre?.knee ?? 0}/5 · Bel-Boyun {entry.post?.spineAfter ?? entry.pre?.spine ?? 0}/5
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
