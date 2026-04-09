import { useState } from "react";
import { HOME_COACH_GUIDES } from "./homeCoachGuides";

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

function MiniCard({ title, items, accent, bg = "#1A1A1E", border = "#2A2A30", color = "#C4C4CC" }) {
  if (!items?.length) return null;

  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: 10 }}>
      <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
        {title}
      </div>
      <BulletList items={items} color={color} />
    </div>
  );
}

function DayCoachGuideCard({ day, guides = HOME_COACH_GUIDES, title = "Günlük Koç Rehberi", embedded = false }) {
  const guide = guides[day?.sub];
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (!guide) return null;

  const quickChecks = (guide.before || []).slice(0, 2);
  const quickApply = (guide.how || []).slice(0, 2);
  const quickSwap = (guide.scale || []).slice(0, 2);
  const quickFlags = (guide.redFlags || []).slice(0, 2);

  return (
    <div style={{ padding: embedded ? "8px 12px 0" : "10px 12px 0" }}>
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
              {day.sub} · Mini Rehber
            </div>
            <div style={{ fontSize: 11, color: "#C4C4CC", lineHeight: 1.5, marginTop: 4 }}>
              {guide.goal}
            </div>
          </div>
          <div style={{ color: "#7A7A84", fontSize: 18 }}>{open ? "−" : "+"}</div>
        </button>

        {open && (
          <div style={{ padding: "0 12px 12px", display: "grid", gap: 10 }}>
            <MiniCard title="Başlamadan" items={quickChecks} accent="#2A9D8F" />
            <MiniCard title="Nasıl Uygula" items={quickApply} accent="#4FC3F7" />
            <MiniCard title="Gerekirse Değiştir" items={quickSwap} accent="#FFA726" />
            <MiniCard
              title="Kırmızı Bayrak"
              items={quickFlags}
              accent="#FF7A7A"
              bg="rgba(255,82,82,.08)"
              border="rgba(255,82,82,.20)"
              color="#F3B0B0"
            />

            <button
              onClick={() => setShowDetails((value) => !value)}
              style={{
                border: "1px solid #2A2A30",
                borderRadius: 10,
                background: "#17171B",
                color: "#C4C4CC",
                padding: "10px 12px",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {showDetails ? "Detaylı Notları Gizle" : "Detaylı Notları Göster"}
            </button>

            {showDetails && (
              <div style={{ display: "grid", gap: 8 }}>
                <MiniCard title="Tüm Uygulama Notları" items={guide.how || []} accent="#7A7A84" />
                <MiniCard title="Tüm Swap Notları" items={guide.scale || []} accent="#7A7A84" />
                <MiniCard title="Seans Sonu Soruları" items={guide.finish || []} accent="#7A7A84" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DayCoachGuide(props) {
  return <DayCoachGuideCard key={props.day?.id || props.day?.sub || "guide"} {...props} />;
}
