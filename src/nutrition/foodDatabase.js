// Static catalog + theme tokens for the nutrition tab. Pure data; no
// imports from the rest of the app. Extracted verbatim from Nutrition.jsx.

export const NUTRI_MACRO_THEMES = {
  calories: { fg: "var(--accent)", bg: "rgba(217,106,29,.14)" },
  protein: { fg: "var(--info)", bg: "rgba(79,163,255,.14)" },
  carbs: { fg: "var(--success)", bg: "rgba(56,193,114,.14)" },
  fat: { fg: "var(--warn)", bg: "rgba(230,162,60,.14)" },
  danger: "var(--danger)",
  ringTrack: "var(--card4)",
};

export const QUICK_FOODS = [
  // Kahvaltılık
  { name: "Yumurta (1 adet)", cal: 78, pro: 6, carb: 1, fat: 5, cat: "Kahvaltı" },
  { name: "Haşlanmış yumurta (2)", cal: 156, pro: 12, carb: 2, fat: 10, cat: "Kahvaltı" },
  { name: "Omlet (2 yumurta)", cal: 180, pro: 13, carb: 2, fat: 13, cat: "Kahvaltı" },
  { name: "Yulaf ezmesi (40g)", cal: 150, pro: 5, carb: 27, fat: 3, cat: "Kahvaltı" },
  { name: "Yulaf + süt (300ml)", cal: 270, pro: 12, carb: 37, fat: 8, cat: "Kahvaltı" },
  { name: "Tam buğday ekmek (1 dilim)", cal: 80, pro: 3, carb: 15, fat: 1, cat: "Kahvaltı" },
  { name: "Beyaz ekmek (1 dilim)", cal: 75, pro: 2, carb: 15, fat: 0, cat: "Kahvaltı" },
  { name: "Beyaz peynir (30g)", cal: 75, pro: 5, carb: 1, fat: 6, cat: "Kahvaltı" },
  { name: "Kaşar peyniri (30g)", cal: 110, pro: 7, carb: 0, fat: 9, cat: "Kahvaltı" },
  { name: "Lor peyniri (100g)", cal: 98, pro: 11, carb: 3, fat: 5, cat: "Kahvaltı" },
  { name: "Süzme yoğurt (150g)", cal: 130, pro: 15, carb: 6, fat: 5, cat: "Kahvaltı" },
  { name: "Süt (200ml)", cal: 120, pro: 7, carb: 10, fat: 5, cat: "Kahvaltı" },
  { name: "Ayran (200ml)", cal: 60, pro: 3, carb: 4, fat: 3, cat: "Kahvaltı" },
  { name: "Zeytin (10 adet)", cal: 70, pro: 0, carb: 1, fat: 7, cat: "Kahvaltı" },
  { name: "Domates (1 adet)", cal: 22, pro: 1, carb: 5, fat: 0, cat: "Kahvaltı" },
  { name: "Salatalık (1 adet)", cal: 16, pro: 1, carb: 3, fat: 0, cat: "Kahvaltı" },
  { name: "Bal (1 tatlı kaşığı)", cal: 64, pro: 0, carb: 17, fat: 0, cat: "Kahvaltı" },
  { name: "Tereyağ (10g)", cal: 72, pro: 0, carb: 0, fat: 8, cat: "Kahvaltı" },
  // Protein
  { name: "Tavuk göğsü (150g)", cal: 230, pro: 43, carb: 0, fat: 5, cat: "Protein" },
  { name: "Tavuk göğsü (200g)", cal: 307, pro: 57, carb: 0, fat: 7, cat: "Protein" },
  { name: "Tavuk but (150g)", cal: 280, pro: 35, carb: 0, fat: 15, cat: "Protein" },
  { name: "Kıyma köfte (100g)", cal: 250, pro: 26, carb: 0, fat: 15, cat: "Protein" },
  { name: "Dana bonfile (150g)", cal: 260, pro: 40, carb: 0, fat: 10, cat: "Protein" },
  { name: "Somon (150g)", cal: 280, pro: 38, carb: 0, fat: 14, cat: "Protein" },
  { name: "Ton balığı konserve (100g)", cal: 130, pro: 26, carb: 0, fat: 3, cat: "Protein" },
  { name: "Ton balığı konserve (150g)", cal: 195, pro: 39, carb: 0, fat: 5, cat: "Protein" },
  { name: "Sardalya konserve (100g)", cal: 200, pro: 25, carb: 0, fat: 11, cat: "Protein" },
  { name: "Yoğurt (200g)", cal: 120, pro: 8, carb: 8, fat: 6, cat: "Protein" },
  { name: "Whey protein (1 scoop)", cal: 120, pro: 24, carb: 3, fat: 2, cat: "Protein" },
  { name: "Whey protein + süt", cal: 240, pro: 31, carb: 13, fat: 7, cat: "Protein" },
  { name: "Yumurta akı (3 adet)", cal: 50, pro: 11, carb: 1, fat: 0, cat: "Protein" },
  { name: "Kuru fasulye (200g pişmiş)", cal: 240, pro: 16, carb: 40, fat: 1, cat: "Protein" },
  { name: "Nohut (200g pişmiş)", cal: 280, pro: 14, carb: 46, fat: 4, cat: "Protein" },
  { name: "Mercimek (200g pişmiş)", cal: 200, pro: 18, carb: 32, fat: 1, cat: "Protein" },
  // Karb
  { name: "Pirinç pilavı (150g)", cal: 195, pro: 4, carb: 42, fat: 1, cat: "Karb" },
  { name: "Pirinç pilavı (200g)", cal: 260, pro: 5, carb: 56, fat: 1, cat: "Karb" },
  { name: "Bulgur pilavı (150g)", cal: 165, pro: 5, carb: 34, fat: 1, cat: "Karb" },
  { name: "Makarna (200g pişmiş)", cal: 280, pro: 10, carb: 56, fat: 1, cat: "Karb" },
  { name: "Kepekli makarna (200g)", cal: 265, pro: 11, carb: 52, fat: 2, cat: "Karb" },
  { name: "Patates haşlama (200g)", cal: 160, pro: 4, carb: 36, fat: 0, cat: "Karb" },
  { name: "Tatlı patates (200g)", cal: 180, pro: 3, carb: 42, fat: 0, cat: "Karb" },
  { name: "Muz (1 adet)", cal: 105, pro: 1, carb: 27, fat: 0, cat: "Meyve" },
  { name: "Elma (1 adet)", cal: 80, pro: 0, carb: 21, fat: 0, cat: "Meyve" },
  { name: "Portakal (1 adet)", cal: 70, pro: 1, carb: 18, fat: 0, cat: "Meyve" },
  { name: "Üzüm (100g)", cal: 70, pro: 1, carb: 18, fat: 0, cat: "Meyve" },
  // Yağ
  { name: "Badem (30g)", cal: 170, pro: 6, carb: 6, fat: 15, cat: "Yağ" },
  { name: "Ceviz (30g)", cal: 195, pro: 5, carb: 4, fat: 19, cat: "Yağ" },
  { name: "Avokado (yarım)", cal: 120, pro: 1, carb: 6, fat: 11, cat: "Yağ" },
  { name: "Zeytinyağı (1 yemek kaşığı)", cal: 120, pro: 0, carb: 0, fat: 14, cat: "Yağ" },
  { name: "Fıstık ezmesi (1 yk)", cal: 95, pro: 4, carb: 3, fat: 8, cat: "Yağ" },
  // Türk mutfağı
  { name: "Mercimek çorbası (1 kase)", cal: 180, pro: 10, carb: 28, fat: 3, cat: "Türk" },
  { name: "Yayla çorbası (1 kase)", cal: 140, pro: 6, carb: 18, fat: 5, cat: "Türk" },
  { name: "Domates çorbası (1 kase)", cal: 120, pro: 3, carb: 15, fat: 5, cat: "Türk" },
  { name: "İzgara köfte (150g)", cal: 320, pro: 28, carb: 4, fat: 21, cat: "Türk" },
  { name: "Döner (1 porsiyon)", cal: 450, pro: 30, carb: 35, fat: 20, cat: "Türk" },
  { name: "Tavuk döner (1 porsiyon)", cal: 380, pro: 32, carb: 30, fat: 14, cat: "Türk" },
  { name: "Lahmacun (1 adet)", cal: 200, pro: 8, carb: 25, fat: 8, cat: "Türk" },
  { name: "Pide (1 dilim)", cal: 300, pro: 12, carb: 35, fat: 12, cat: "Türk" },
  { name: "Börek (1 dilim)", cal: 280, pro: 8, carb: 28, fat: 15, cat: "Türk" },
  { name: "Menemen (2 yumurta)", cal: 250, pro: 13, carb: 10, fat: 18, cat: "Türk" },
  { name: "Karnıyarık (1 porsiyon)", cal: 320, pro: 15, carb: 20, fat: 20, cat: "Türk" },
  { name: "Cacık (200g)", cal: 80, pro: 4, carb: 6, fat: 5, cat: "Türk" },
  { name: "Çoban salata", cal: 90, pro: 2, carb: 12, fat: 4, cat: "Türk" },
  // İçecek
  { name: "Türk kahvesi (sade)", cal: 5, pro: 0, carb: 1, fat: 0, cat: "İçecek" },
  { name: "Çay (1 bardak)", cal: 3, pro: 0, carb: 1, fat: 0, cat: "İçecek" },
  { name: "Portakal suyu (200ml)", cal: 90, pro: 1, carb: 21, fat: 0, cat: "İçecek" },
  { name: "Protein shake (hazır)", cal: 160, pro: 30, carb: 8, fat: 3, cat: "İçecek" },
];

export const CATEGORIES = ["Tümü", "Son Yenenler", "Kahvaltı", "Protein", "Karb", "Türk", "Meyve", "Yağ", "İçecek"];

export const MULTIPLIERS = [
  { label: "½", val: 0.5 },
  { label: "1×", val: 1 },
  { label: "1½", val: 1.5 },
  { label: "2×", val: 2 },
];
