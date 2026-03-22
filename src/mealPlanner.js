// ─────────────────────────────────────────────────────────────────
// Akıllı Öğün Planlayıcı
// Antrenman tipine + kalori hedefine + mevcut makrolara göre
// gerçekçi Türk mutfağı önerileri üretir
// ─────────────────────────────────────────────────────────────────

// Antrenman tipi belirleme
export function getDayType(day) {
  if (!day) return 'rest';
  if (day.type === 'offday') return 'rest';
  const focus = (day.focus || '').toLowerCase();
  const title = (day.title || '').toLowerCase();
  const combined = focus + ' ' + title;
  if (/sprint|kondisyon|dayanıkl|hiit|circuit|amrap|devre/.test(combined)) return 'cardio';
  if (/kuvvet|strength|güç|bazı/.test(combined)) return 'strength';
  if (/kalistenik|skill|dayanıkl/.test(combined)) return 'calisthenics';
  if (/fonksiyonel|carry|taşıma/.test(combined)) return 'functional';
  return 'strength';
}

// Öğün zamanına göre label
function getMealTime() {
  const h = new Date().getHours();
  if (h < 10) return 'morning';
  if (h < 13) return 'pre_workout';
  if (h < 16) return 'post_workout';
  if (h < 20) return 'dinner';
  return 'evening';
}

// ─── ÖĞÜN ŞABLONLARI ───────────────────────────────────────────
const MEALS = {

  // SABAH ÖĞÜNLERİ
  morning: [
    {
      name: "Yüksek Proteinli Kahvaltı",
      desc: "Antrenman öncesi enerji + protein",
      foods: [
        { name: "Yumurta (3 adet haşlanmış veya omlet)", cal: 234, pro: 18, carb: 3, fat: 15 },
        { name: "Yulaf ezmesi (50g) + süt (200ml)", cal: 270, pro: 12, carb: 40, fat: 7 },
        { name: "Muz (1 adet)", cal: 105, pro: 1, carb: 27, fat: 0 },
      ],
      total: { cal: 609, pro: 31, carb: 70, fat: 22 },
      tags: ['strength', 'calisthenics', 'functional'],
      tip: "Antrenmandan 1.5-2 saat önce ye"
    },
    {
      name: "Hafif & Hızlı Kahvaltı",
      desc: "Erken kalktıysan, mideyi zorlamadan",
      foods: [
        { name: "Süzme yoğurt (200g)", cal: 173, pro: 20, carb: 8, fat: 7 },
        { name: "Bal (1 tatlı kaşığı) + badem (20g)", cal: 177, pro: 5, carb: 21, fat: 10 },
        { name: "Muz (1 adet)", cal: 105, pro: 1, carb: 27, fat: 0 },
      ],
      total: { cal: 455, pro: 26, carb: 56, fat: 17 },
      tags: ['cardio', 'rest'],
      tip: "Kondisyon antrenmanından 1 saat önce ideal"
    },
    {
      name: "Türk Kahvaltısı",
      desc: "Klasik ve tok tutar",
      foods: [
        { name: "Yumurta (2 adet)", cal: 156, pro: 12, carb: 2, fat: 10 },
        { name: "Beyaz peynir (60g)", cal: 150, pro: 10, carb: 2, fat: 12 },
        { name: "Tam buğday ekmek (2 dilim)", cal: 160, pro: 6, carb: 30, fat: 2 },
        { name: "Domates + salatalık + zeytin", cal: 110, pro: 2, carb: 8, fat: 7 },
      ],
      total: { cal: 576, pro: 30, carb: 42, fat: 31 },
      tags: ['strength', 'calisthenics', 'rest'],
      tip: "Sabah ilk öğün — güne güçlü başlangıç"
    },
    {
      name: "Hızlı Protein Shake Kahvaltı",
      desc: "Vaktin yoksa 5 dakikada hazır",
      foods: [
        { name: "Whey protein (1 scoop) + süt (300ml)", cal: 290, pro: 35, carb: 18, fat: 8 },
        { name: "Yulaf ezmesi (40g) shake'e karıştır", cal: 150, pro: 5, carb: 27, fat: 3 },
        { name: "Muz (1 adet)", cal: 105, pro: 1, carb: 27, fat: 0 },
      ],
      total: { cal: 545, pro: 41, carb: 72, fat: 11 },
      tags: ['strength', 'calisthenics', 'functional', 'cardio'],
      tip: "Antrenman 30-60 dk öncesi — hızlı sindirim"
    },
  ],

  // ANTRENMAN ÖNCESİ (öğle üstü)
  pre_workout: [
    {
      name: "Antrenman Öncesi Öğle",
      desc: "Yavaş karb + protein — 2 saat enerji",
      foods: [
        { name: "Bulgur pilavı (150g)", cal: 165, pro: 5, carb: 34, fat: 1 },
        { name: "Tavuk göğsü ızgara (150g)", cal: 230, pro: 43, carb: 0, fat: 5 },
        { name: "Cacık (200g)", cal: 80, pro: 4, carb: 6, fat: 5 },
      ],
      total: { cal: 475, pro: 52, carb: 40, fat: 11 },
      tags: ['strength', 'calisthenics', 'functional'],
      tip: "Antrenmandan 2 saat önce ye — sindirim tamamlanır"
    },
    {
      name: "Hafif Öğle — Kondisyon Öncesi",
      desc: "Ağır yemek kondisyonu mahveder",
      foods: [
        { name: "Yulaf + yoğurt (150g)", cal: 280, pro: 17, carb: 35, fat: 7 },
        { name: "Muz (1 adet)", cal: 105, pro: 1, carb: 27, fat: 0 },
        { name: "Ton balığı konserve (100g)", cal: 130, pro: 26, carb: 0, fat: 3 },
      ],
      total: { cal: 515, pro: 44, carb: 62, fat: 10 },
      tags: ['cardio'],
      tip: "Sprint/AMRAP öncesi — hazım kolay, enerji yüksek"
    },
    {
      name: "Mercimek Çorbası + Protein",
      desc: "Ucuz, evde her zaman var, tok tutar",
      foods: [
        { name: "Mercimek çorbası (2 kase)", cal: 360, pro: 20, carb: 56, fat: 6 },
        { name: "Kuru fasulye (200g pişmiş)", cal: 240, pro: 16, carb: 40, fat: 1 },
        { name: "Tam buğday ekmek (1 dilim)", cal: 80, pro: 3, carb: 15, fat: 1 },
      ],
      total: { cal: 680, pro: 39, carb: 111, fat: 8 },
      tags: ['strength', 'rest'],
      tip: "Hem bitkisel protein hem de yavaş karb — ideal kombinasyon"
    },
  ],

  // ANTRENMAN SONRASI
  post_workout: [
    {
      name: "Anabolik Pencere — 30-45 Dakika",
      desc: "Kas onarımı için hızlı protein + karb",
      foods: [
        { name: "Whey protein shake (1 scoop) + muz", cal: 225, pro: 25, carb: 30, fat: 2 },
        { name: "Ekmek (2 dilim) + lor peyniri (100g)", cal: 258, pro: 17, carb: 32, fat: 7 },
      ],
      total: { cal: 483, pro: 42, carb: 62, fat: 9 },
      tags: ['strength', 'calisthenics', 'functional', 'cardio'],
      tip: "Antrenman sonrası ilk 45dk — protein sentezi dorukta"
    },
    {
      name: "Tavuklu Pirinç — Klasik Kas Öğünü",
      desc: "Yavaş karb + yüksek protein",
      foods: [
        { name: "Pirinç pilavı (200g)", cal: 260, pro: 5, carb: 56, fat: 1 },
        { name: "Tavuk göğsü (200g) haşlama veya ızgara", cal: 307, pro: 57, carb: 0, fat: 7 },
        { name: "Çoban salata", cal: 90, pro: 2, carb: 12, fat: 4 },
      ],
      total: { cal: 657, pro: 64, carb: 68, fat: 12 },
      tags: ['strength', 'calisthenics', 'functional'],
      tip: "Büyük öğün — antrenman sonrası 1-2 saat içinde ye"
    },
    {
      name: "Ton Balıklı Makarna",
      desc: "Hızlı pişer, yüksek protein, uygun fiyat",
      foods: [
        { name: "Kepekli makarna (200g pişmiş)", cal: 265, pro: 11, carb: 52, fat: 2 },
        { name: "Ton balığı konserve (2 kutu × 100g)", cal: 260, pro: 52, carb: 0, fat: 6 },
        { name: "Zeytinyağı (1 yk) + domates sos", cal: 160, pro: 1, carb: 8, fat: 14 },
      ],
      total: { cal: 685, pro: 64, carb: 60, fat: 22 },
      tags: ['strength', 'calisthenics'],
      tip: "15 dakikada hazır — kas protein gereksinimi karşılanır"
    },
    {
      name: "Kondisyon Sonrası Recovery",
      desc: "Elektrolit + protein + hızlı karb",
      foods: [
        { name: "Ayran (400ml) veya süt", cal: 200, pro: 10, carb: 16, fat: 8 },
        { name: "Muz (2 adet)", cal: 210, pro: 2, carb: 54, fat: 0 },
        { name: "Haşlanmış yumurta (3 adet)", cal: 234, pro: 18, carb: 3, fat: 15 },
      ],
      total: { cal: 644, pro: 30, carb: 73, fat: 23 },
      tags: ['cardio'],
      tip: "Sprint/AMRAP sonrası — glikojen yenileme öncelik"
    },
  ],

  // AKŞAM
  dinner: [
    {
      name: "Yüksek Proteinli Akşam",
      desc: "Geceleri protein sentezi devam eder",
      foods: [
        { name: "Dana veya tavuk kıyma köfte (150g)", cal: 375, pro: 39, carb: 6, fat: 23 },
        { name: "Tatlı patates haşlama (200g)", cal: 180, pro: 3, carb: 42, fat: 0 },
        { name: "Mevsim salatası + zeytinyağı", cal: 130, pro: 2, carb: 10, fat: 9 },
      ],
      total: { cal: 685, pro: 44, carb: 58, fat: 32 },
      tags: ['strength', 'calisthenics', 'functional'],
      tip: "Uyku öncesi büyük öğün — en az 2 saat önce ye"
    },
    {
      name: "Nohut + Pirinç — Bitkisel Protein",
      desc: "Tam amino asit profili, ekonomik",
      foods: [
        { name: "Nohut yemeği (250g pişmiş)", cal: 350, pro: 18, carb: 58, fat: 5 },
        { name: "Pirinç pilavı (150g)", cal: 195, pro: 4, carb: 42, fat: 1 },
        { name: "Cacık (200g)", cal: 80, pro: 4, carb: 6, fat: 5 },
      ],
      total: { cal: 625, pro: 26, carb: 106, fat: 11 },
      tags: ['rest', 'cardio'],
      tip: "Nohut + pirinç = tam protein. Ekonomik ve doyurucu"
    },
    {
      name: "Karnıyarık veya Türk Yemeği",
      desc: "Evde pişen klasik — dengeli makro",
      foods: [
        { name: "Karnıyarık (1 porsiyon)", cal: 320, pro: 15, carb: 20, fat: 20 },
        { name: "Bulgur pilavı (150g)", cal: 165, pro: 5, carb: 34, fat: 1 },
        { name: "Yoğurt (200g)", cal: 120, pro: 8, carb: 8, fat: 6 },
      ],
      total: { cal: 605, pro: 28, carb: 62, fat: 27 },
      tags: ['strength', 'rest'],
      tip: "Türk mutfağı klasiği — zeytinyağlı versiyonu tercih et"
    },
    {
      name: "Somon / Balık Akşamı",
      desc: "Omega-3 + yüksek protein — recovery için ideal",
      foods: [
        { name: "Somon ızgara (150g) veya hamsi (200g)", cal: 280, pro: 38, carb: 0, fat: 14 },
        { name: "Patates haşlama (200g)", cal: 160, pro: 4, carb: 36, fat: 0 },
        { name: "Yeşil salata + zeytinyağı", cal: 100, pro: 1, carb: 6, fat: 8 },
      ],
      total: { cal: 540, pro: 43, carb: 42, fat: 22 },
      tags: ['strength', 'calisthenics', 'cardio', 'functional'],
      tip: "Haftada 2-3 kez balık — inflamasyon azalır, recovery hızlanır"
    },
  ],

  // AKŞAM GEÇ / ARA ÖĞÜN
  evening: [
    {
      name: "Uyku Öncesi Protein",
      desc: "Casein etkisi — gece boyunca kas onarımı",
      foods: [
        { name: "Süzme yoğurt (200g)", cal: 173, pro: 20, carb: 8, fat: 7 },
        { name: "Ceviz (30g)", cal: 195, pro: 5, carb: 4, fat: 19 },
      ],
      total: { cal: 368, pro: 25, carb: 12, fat: 26 },
      tags: ['strength', 'calisthenics', 'functional', 'cardio', 'rest'],
      tip: "Yatmadan 30-60 dk önce — gece katabolizmasını önler"
    },
    {
      name: "Hafif Gece Atıştırmalığı",
      desc: "Açlığı keser, kalorisiz değil ama minimal",
      foods: [
        { name: "Lor peyniri (100g) + badem (20g)", cal: 211, pro: 16, carb: 4, fat: 15 },
        { name: "1 bardak süt", cal: 120, pro: 7, carb: 10, fat: 5 },
      ],
      total: { cal: 331, pro: 23, carb: 14, fat: 20 },
      tags: ['rest', 'cardio'],
      tip: "Rest günü gece — hafif tut"
    },
  ],
};

// ─── ANA FONKSİYON ─────────────────────────────────────────────
export function getMealPlan({ dayType, targets, totals, workoutKcal }) {
  const mealTime = getMealTime();
  const bodyWeight = targets.bodyWeight || 75;

  // Kalan makrolar
  const remCal = Math.max(0, targets.calories - totals.calories);
  const remPro = Math.max(0, targets.protein - totals.protein);
  const remCarbs = Math.max(0, targets.carbs - totals.carbs);

  // Antrenman sonrası kalori ihtiyacı artışı
  const adjustedCal = workoutKcal > 0
    ? targets.calories + Math.round(workoutKcal * 0.7) // yakılan kalorinin %70'ini geri al
    : targets.calories;

  // Zaman + antrenman tipine uygun öğünleri filtrele
  const pool = MEALS[mealTime] || MEALS.dinner;
  const relevant = pool.filter(m => m.tags.includes(dayType) || m.tags.includes('rest'));

  // Makro eksiklerine göre sırala
  const scored = relevant.map(m => {
    let score = 0;
    if (remPro > 30 && m.total.pro > 30) score += 3;
    if (remPro > 20 && m.total.pro > 20) score += 2;
    if (remCarbs > 50 && m.total.carb > 40) score += 1;
    if (m.total.cal <= remCal + 100) score += 1;
    return { ...m, score };
  }).sort((a, b) => b.score - a.score);

  // En iyi 2 öneri döndür
  const topPicks = scored.slice(0, 2);

  // Günlük özet
  const summary = buildDaySummary({ dayType, targets, adjustedCal, workoutKcal, bodyWeight });

  return { meals: topPicks, summary, mealTime, adjustedCal };
}

function buildDaySummary({ dayType, targets, adjustedCal, workoutKcal, bodyWeight }) {
  const typeLabels = {
    strength: 'Kuvvet antrenmanı',
    calisthenics: 'Kalistenik antrenman',
    cardio: 'Kondisyon antrenmanı',
    functional: 'Fonksiyonel antrenman',
    rest: 'Dinlenme günü',
  };

  const proteinTarget = Math.round(bodyWeight * (dayType === 'rest' ? 1.8 : 2.2));

  const tips = {
    strength: [
      `Protein hedefi: ~${proteinTarget}g (${bodyWeight}kg × 2.2)`,
      'Antrenman öncesi karb yükü — pirinç, bulgur, patates',
      'Antrenman sonrası 45dk içinde protein + hızlı karb',
    ],
    calisthenics: [
      `Protein hedefi: ~${proteinTarget}g — kas onarımı için şart`,
      'L-sit ve muscle-up için vücut yağını düşük tut',
      'Uyku öncesi süzme yoğurt — gece recovery',
    ],
    cardio: [
      'Karbonhidrat öncelikli — glikojen depoları dolu olmalı',
      'Antrenman öncesi muz + yulaf ideal',
      `Kalori: ~${adjustedCal}kcal — ${workoutKcal}kcal yakıldı, yerine koy`,
    ],
    functional: [
      'Taşıma ve dayanıklılık = yüksek enerji ihtiyacı',
      `Protein hedefi: ~${proteinTarget}g — fonksiyonel güç için`,
      'Su + elektrolit — tuz kaybı fazla',
    ],
    rest: [
      'Kaloriyi düşür — yağ fazlası yerine proteini koru',
      `Protein: ~${Math.round(bodyWeight * 1.8)}g yeterli`,
      'Sebze + yoğurt + hafif yağ — inflamasyon düşürücü',
    ],
  };

  return {
    label: typeLabels[dayType] || 'Antrenman',
    adjustedCal,
    workoutKcal,
    proteinTarget,
    tips: tips[dayType] || tips.rest,
  };
}
