import { useState, useEffect } from "react";
import { getDashboardStats } from "./tracker";

// Program2'ye özgü haftalık özet
// dayIndex 10-13 arası olan workoutları gösterir
const P2_DAY_OFFSET = 10;

function loadSkillPRs() {
  try { return JSON.parse(localStorage.getItem("yb_skill_prs") || "{}"); } catch { return {}; }
}

function fmt(s) {
  return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
}

export default function Program2Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const prs = loadSkillPRs();

  useEffect(() => {
    getDashboardStats().then(s => { setStats(s); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 16, color: "#555", fontSize: 12 }}>Yükleniyor...</div>;

  const skillPREntries = Object.entries(prs).sort((a,b) => b[1]-a[1]);

  return (
    <div className="p2-stats">
      <div className="p2-stats-title">📊 Full Activation — İlerleme</div>

      {/* Genel özet */}
      {stats && (
        <div className="dash-cards" style={{ marginBottom: 16 }}>
          <div className="dash-card">
            <div className="dash-card-val">{stats.workoutCount}</div>
            <div className="dash-card-label">Toplam Antrenman</div>
          </div>
          <div className="dash-card">
            <div className="dash-card-val">{stats.streak}</div>
            <div className="dash-card-label">Seri 🔥</div>
          </div>
          <div className="dash-card">
            <div className="dash-card-val">{stats.totalVolume > 999 ? `${(stats.totalVolume/1000).toFixed(1)}k` : stats.totalVolume}</div>
            <div className="dash-card-label">Toplam Hacim</div>
          </div>
        </div>
      )}

      {/* Skill PR'ları */}
      {skillPREntries.length > 0 && (
        <div className="p2-skill-prs">
          <div className="p2-section-title">🏆 Skill Kişisel Rekorlar</div>
          {skillPREntries.map(([key, seconds]) => {
            const name = key.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
            return (
              <div key={key} className="p2-pr-row">
                <span className="p2-pr-name">{name}</span>
                <span className="p2-pr-time">{fmt(seconds)}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Skill tracker state */}
      <div className="p2-skill-progress">
        <div className="p2-section-title">📈 Skill Seviyeleri</div>
        {(() => {
          try {
            const levels = JSON.parse(localStorage.getItem("yb_skill_levels") || "{}");
            const paths = {
              pullup: { name: "Pull-up Yolu", max: 6 },
              pushup: { name: "Push-up / Dip Yolu", max: 6 },
              lsit: { name: "L-sit Yolu", max: 5 },
            };
            return Object.entries(paths).map(([key, path]) => {
              const level = levels[key] || 1;
              const pct = Math.round((level / path.max) * 100);
              return (
                <div key={key} className="p2-skill-bar-row">
                  <span className="p2-skill-bar-name">{path.name}</span>
                  <div className="p2-skill-bar-track">
                    <div className="p2-skill-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="p2-skill-bar-val">Seviye {level}/{path.max}</span>
                </div>
              );
            });
          } catch { return null; }
        })()}
      </div>

      {/* Motivasyon */}
      <div className="p2-motivation">
        <div className="p2-section-title">💡 Program Hakkında</div>
        <div className="p2-motivation-text">
          Full Activation — her antrenmanda tüm vücut aktif. Primary odak + secondary aktivasyon + calisthenics skill.
          Faz 1 hedefi: Pull-up, Dip, L-sit temelini kurmak. Hafta 8'de test.
        </div>
        <div className="p2-targets">
          <div className="p2-target-item"><span>🎯 Pull-up</span><span>İlk tam tekrar</span></div>
          <div className="p2-target-item"><span>🎯 Dip</span><span>5 tam tekrar</span></div>
          <div className="p2-target-item"><span>🎯 L-sit</span><span>10 sn full</span></div>
          <div className="p2-target-item"><span>🎯 Dead Hang</span><span>60 sn</span></div>
        </div>
      </div>
    </div>
  );
}
