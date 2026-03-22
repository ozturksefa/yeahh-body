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

// Öğün zamanı — antrenman saatine göre
// Haftiçi 07:00, haftasonu 09:00
function getWorkoutHour() {
  const day = new Date().getDay(); // 0=Paz, 6=Cmt
  return (day === 0 || day === 6) ? 9 : 7;
}

function getMealTime() {
  const h = new Date().getHours();
  const wh = getWorkoutHour();

  // Antrenman öncesi + sırası: yemek yok — sadece su
  if (h >= wh - 2 && h < wh + 1) return 'fasted';

  // Antrenman sonrası ilk öğün penceresi (1-3 saat sonra)
  if (h >= wh + 1 && h < wh + 3) return 'post_workout';

  // Sabah erken (antrenman öncesi değil, önceki gece geç yemişse)
  if (h < wh - 2) return 'morning';

  // Öğleden akşama
  if (h < 20) return 'dinner';

  return 'evening';
}

export function getWorkoutSchedule() {
  const day = new Date().getDay();
  const isWeekend = day === 0 || day === 6;
  const wh = isWeekend ? 9 : 7;
  const h = new Date().getHours();
  const minsToWorkout = (wh - h) * 60 - new Date().getMinutes();
  return { hour: wh, isWeekend, minsToWorkout, fastsUntil: wh + 1 };
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
      tip: "Haftiçi 05:00-05:30, haftasonu 07:00-07:30 — antrenman başlamadan 1.5 saat önce"
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
      tip: "Sabah antrenmanı için 06:00'da hazır — mide rahat, enerji tam"
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
      tip: "Haftiçi 05:30, haftasonu 07:30 — antrenman öncesi son 1.5 saat"
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
      tip: "Vakti dar olanlar için: haftiçi 06:00, haftasonu 08:00 — 1 saat yeterli"
    },
  ],

  // ORUÇ (antrenman öncesi + sırası) — öğün önerilmez
  fasted: [],

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
      tip: "Aç karnına antrenman sonrası ilk öğün — protein sentezi en yüksek bu pencerede. Hemen ye."
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
      tip: "Fasted antrenman sonrası en iyi öğün — glikojen + protein aynı anda yenilenir"
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
      tip: "Fasted antrenman sonrası hızlı protein — 15 dakikada hazır"
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
      tip: "Kondisyon sonrası aç karnına ilk öğün — elektrolit + hızlı karb + protein şart"
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

  // Fasted — antrenman öncesi/sırası, yemek yok
  if (mealTime === 'fasted') {
    const { hour } = getWorkoutSchedule();
    return {
      meals: [],
      summary: {
        ...buildDaySummary({ dayType, targets, adjustedCal, workoutKcal, bodyWeight }),
        fasted: true,
        fastsUntil: hour + 1,
      },
      mealTime: 'fasted',
      adjustedCal,
    };
  }

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
      `Antrenman öncesi yeme — sadece su veya siyah kahve`,
      `İlk öğün antrenman sonrası: protein ~${proteinTarget}g hedefi için büyük öğün`,
      'Akşam: pirinç/bulgur + tavuk/et — glikojen yenileme + protein sentezi',
    ],
    calisthenics: [
      `Fasted antrenman → yağ yakımı yüksek — ilk öğünde ${proteinTarget}g protein al`,
      'Vücut ağırlığı düşük = kalistenik kolaylaşır — kalori kontrolü önemli',
      'Uyku öncesi süzme yoğurt — gece protein sentezi',
    ],
    cardio: [
      'Fasted kondisyon — yağ yakımı maksimum ama performans düşebilir',
      `Antrenman sonrası ilk öğünde hızlı karb + protein: muz + whey veya pirinç + tavuk`,
      `Günlük kalori: ~${adjustedCal}kcal — ${workoutKcal}kcal yaktın`,
    ],
    functional: [
      `Fasted fonksiyonel antrenman — sonrasında büyük öğün: ${proteinTarget}g protein`,
      'Carry ve devre = tuz kaybı fazla — su + elektrolit',
      'Öğle ve akşam yüksek kalori — yakılanı geri al',
    ],
    rest: [
      `Kaloriyi düşür — yağ fazlası yerine proteini koru (~${Math.round(bodyWeight * 1.8)}g)`,
      'Sebze + yoğurt + hafif yağ — recovery ve inflamasyon',
      'Off day = az karbonhidrat, yüksek protein, çok sebze',
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
