import { useMemo, useState } from "react";
import { HOME_COACH_GUIDES } from "./homeCoachGuides";

function Checklist({ items, state, onToggle, accent = "#2A9D8F" }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {items.map((item, index) => {
        const checked = !!state[index];
        return (
          <button
            key={item}
            onClick={() => onToggle(index)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              width: "100%",
              textAlign: "left",
              background: checked ? `${accent}18` : "#17171B",
              border: `1px solid ${checked ? accent : "#2A2A30"}`,
              borderRadius: 10,
              padding: "10px 12px",
              color: "#C4C4CC",
              cursor: "pointer",
            }}
          >
            <span style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              flex: "0 0 18px",
              border: `1px solid ${checked ? accent : "#555"}`,
              background: checked ? accent : "transparent",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
              marginTop: 1,
            }}>
              {checked ? "✓" : ""}
            </span>
            <span style={{ fontSize: 11, lineHeight: 1.5 }}>{item}</span>
          </button>
        );
      })}
    </div>
  );
}

function BulletList({ items, color = "#C4C4CC" }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {items.map((item) => (
        <div key={item} style={{ fontSize: 11, color, lineHeight: 1.5 }}>
          • {item}
        </div>
      ))}
    </div>
  );
}

function DayCoachGuideCard({ day, guides = HOME_COACH_GUIDES, title = "Günlük Koç Rehberi" }) {
  const guide = guides[day?.sub];
  const [open, setOpen] = useState(true);
  const [beforeChecks, setBeforeChecks] = useState({});
  const [finishChecks, setFinishChecks] = useState({});

  const beforeDone = useMemo(
    () => guide?.before?.filter((_, i) => beforeChecks[i]).length || 0,
    [guide, beforeChecks]
  );
  const finishDone = useMemo(
    () => guide?.finish?.filter((_, i) => finishChecks[i]).length || 0,
    [guide, finishChecks]
  );

  if (!guide) return null;

  const toggleBefore = (index) => {
    setBeforeChecks((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleFinish = (index) => {
    setFinishChecks((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div style={{ padding: "10px 12px 0" }}>
      <div style={{
        background: "#131316",
        border: "1px solid #2A2A30",
        borderRadius: 12,
        overflow: "hidden",
      }}>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            textAlign: "left",
            border: "none",
            background: "transparent",
            color: "inherit",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: "#7A7A84", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>
              {title}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginTop: 4 }}>
              {day.sub} · {day.focus}
            </div>
            <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5, marginTop: 4 }}>
              {guide.goal}
            </div>
          </div>
          <div style={{ color: "#7A7A84", fontSize: 18 }}>{open ? "−" : "+"}</div>
        </button>

        {open && (
          <div style={{ padding: "0 12px 12px", display: "grid", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
              <div style={{
                background: "rgba(42,157,143,.10)",
                border: "1px solid rgba(42,157,143,.28)",
                borderRadius: 10,
                padding: 10,
              }}>
                <div style={{ fontSize: 10, color: "#7A7A84", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>
                  Başlangıç Kontrolü
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#2A9D8F", marginTop: 4 }}>
                  {beforeDone}/{guide.before.length}
                </div>
              </div>
              <div style={{
                background: "rgba(255,167,38,.10)",
                border: "1px solid rgba(255,167,38,.28)",
                borderRadius: 10,
                padding: 10,
              }}>
                <div style={{ fontSize: 10, color: "#7A7A84", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>
                  Seans Sonu Kontrolü
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#FFA726", marginTop: 4 }}>
                  {finishDone}/{guide.finish.length}
                </div>
              </div>
            </div>

            <div style={{
              background: "#1A1A1E",
              border: "1px solid #2A2A30",
              borderRadius: 10,
              padding: 12,
            }}>
              <div style={{ fontSize: 11, color: "#7A7A84", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
                Başlamadan Önce
              </div>
              <Checklist items={guide.before} state={beforeChecks} onToggle={toggleBefore} />
            </div>

            <div style={{
              background: "#1A1A1E",
              border: "1px solid #2A2A30",
              borderRadius: 10,
              padding: 12,
            }}>
              <div style={{ fontSize: 11, color: "#7A7A84", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
                Nasıl Uygulanır
              </div>
              <BulletList items={guide.how} />
            </div>

            <div style={{
              background: "#1A1A1E",
              border: "1px solid #2A2A30",
              borderRadius: 10,
              padding: 12,
            }}>
              <div style={{ fontSize: 11, color: "#7A7A84", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
                Düşür / Değiştir
              </div>
              <BulletList items={guide.scale} color="#D8D8DD" />
            </div>

            <div style={{
              background: "rgba(255,82,82,.08)",
              border: "1px solid rgba(255,82,82,.20)",
              borderRadius: 10,
              padding: 12,
            }}>
              <div style={{ fontSize: 11, color: "#FF7A7A", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
                Kırmızı Bayraklar
              </div>
              <BulletList items={guide.redFlags} color="#F3B0B0" />
            </div>

            <div style={{
              background: "#1A1A1E",
              border: "1px solid #2A2A30",
              borderRadius: 10,
              padding: 12,
            }}>
              <div style={{ fontSize: 11, color: "#7A7A84", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
                Seans Sonu Soruları
              </div>
              <Checklist items={guide.finish} state={finishChecks} onToggle={toggleFinish} accent="#FFA726" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DayCoachGuide(props) {
  return <DayCoachGuideCard key={props.day?.id || props.day?.sub || "guide"} {...props} />;
}
