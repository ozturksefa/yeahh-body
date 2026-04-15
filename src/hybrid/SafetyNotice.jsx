const NOTES = [
  "Ağrı 2/10'u geçerse aynı paterni regress et veya swap kullan.",
  "Keskin ağrı, boşalma hissi, uyuşma veya yayılım varsa hareket biter.",
];

/**
 * Static orange safety summary shown above workout blocks.
 * Extracted verbatim from HybridView.jsx; no behavior changes.
 */
export default function SafetyNotice() {
  return (
    <div style={{
      background: "rgba(255,167,38,.08)",
      border: "1px solid rgba(255,167,38,.20)",
      borderRadius: 12,
      padding: 10,
      marginBottom: 10,
    }}>
      <div style={{ fontSize: 10, color: "#FFA726", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>
        Kısa Güvenlik Özeti
      </div>
      <div style={{ display: "grid", gap: 4 }}>
        {NOTES.map((item) => (
          <div key={item} style={{ fontSize: 11, color: "#F7D7A0", lineHeight: 1.45 }}>• {item}</div>
        ))}
      </div>
    </div>
  );
}
