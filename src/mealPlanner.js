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

const HOME_MEAL_SECTIONS = {
  training: {
    breakfastLabel: "Spor Sonrası Kahvaltı",
    snackLabel: "Gün İçinde Ara Öğün",
    dinnerLabel: "Akşam Öğünü",
    breakfast: [
    {
      name: "Yumurta + peynir tabağı",
      desc: "Antrenman sonrası toparlanma için en pratik yüksek protein kahvaltı",
      foods: [
        { name: "Yumurta (3 adet)", cal: 234, pro: 18, carb: 3, fat: 15 },
        { name: "Beyaz peynir / lor (60g)", cal: 120, pro: 12, carb: 3, fat: 7 },
        { name: "Tam buğday ekmek (2 dilim)", cal: 160, pro: 6, carb: 30, fat: 2 },
        { name: "Domates + salatalık", cal: 40, pro: 2, carb: 8, fat: 0 },
      ],
      total: { cal: 554, pro: 38, carb: 44, fat: 24 },
      tags: ['strength', 'calisthenics', 'functional', 'rest'],
      tip: "Antrenmandan sonraki ilk ana öğün için çok güvenli seçim."
    },
    {
      name: "Yoğurtlu yulaf kasesi",
      desc: "Spor sonrası hafif ama toparlayıcı kahvaltı",
      foods: [
        { name: "Süzme yoğurt (200g)", cal: 173, pro: 20, carb: 8, fat: 7 },
        { name: "Yulaf (50g)", cal: 190, pro: 7, carb: 31, fat: 4 },
        { name: "Muz (1 adet)", cal: 105, pro: 1, carb: 27, fat: 0 },
        { name: "Ceviz (15g)", cal: 98, pro: 2, carb: 2, fat: 10 },
      ],
      total: { cal: 566, pro: 30, carb: 68, fat: 21 },
      tags: ['cardio', 'calisthenics', 'functional'],
      tip: "Kondisyon veya skill gününden sonra rahat gider."
    },
    {
      name: "Menemen + yoğurt",
      desc: "Ekonomik, ulaşılabilir ve spor sonrası tok tutan seçenek",
      foods: [
        { name: "Menemen (3 yumurta)", cal: 260, pro: 19, carb: 8, fat: 16 },
        { name: "Yoğurt (150g)", cal: 90, pro: 7, carb: 7, fat: 4 },
        { name: "Tam buğday ekmek (2 dilim)", cal: 160, pro: 6, carb: 30, fat: 2 },
      ],
      total: { cal: 510, pro: 32, carb: 45, fat: 22 },
      tags: ['strength', 'rest', 'functional'],
      tip: "Evde her gün yapılabilecek kadar sade."
    },
  ],
    snack: [
    {
      name: "Kefir + muz",
      desc: "Spor gününde enerji ve toparlanma için en kolay ara öğün",
      foods: [
        { name: "Kefir (250ml)", cal: 155, pro: 9, carb: 12, fat: 8 },
        { name: "Muz (1 adet)", cal: 105, pro: 1, carb: 27, fat: 0 },
      ],
      total: { cal: 260, pro: 10, carb: 39, fat: 8 },
      tags: ['cardio', 'strength', 'calisthenics', 'functional'],
      tip: "Antrenman sonrası da rahat kullanılır."
    },
    {
      name: "Yoğurt + meyve + ceviz",
      desc: "Basit, dengeli ve evde her zaman kurulabilir",
      foods: [
        { name: "Yoğurt (200g)", cal: 120, pro: 10, carb: 10, fat: 5 },
        { name: "Elma veya muz", cal: 90, pro: 1, carb: 22, fat: 0 },
        { name: "Ceviz (15g)", cal: 98, pro: 2, carb: 2, fat: 10 },
      ],
      total: { cal: 308, pro: 13, carb: 34, fat: 15 },
      tags: ['rest', 'cardio', 'calisthenics'],
      tip: "Ofiste ya da evde kolay uygulanır."
    },
    {
      name: "Haşlanmış yumurta + ayran",
      desc: "Protein açığını kapatmak için sade ara öğün",
      foods: [
        { name: "Haşlanmış yumurta (2 adet)", cal: 156, pro: 12, carb: 2, fat: 10 },
        { name: "Ayran (300ml)", cal: 105, pro: 6, carb: 8, fat: 5 },
      ],
      total: { cal: 261, pro: 18, carb: 10, fat: 15 },
      tags: ['strength', 'functional', 'rest'],
      tip: "Protein açığını kapatmak için iyi kısa yol."
    },
  ],
    dinner: [
    {
      name: "Tavuk + pilav/bulgur + salata",
      desc: "Spor günü için en güvenli ana akşam öğünü",
      foods: [
        { name: "Tavuk göğsü (180-200g)", cal: 330, pro: 55, carb: 0, fat: 7 },
        { name: "Pirinç pilavı / bulgur (180g pişmiş)", cal: 220, pro: 5, carb: 46, fat: 2 },
        { name: "Salata + 1 tk zeytinyağı", cal: 70, pro: 2, carb: 6, fat: 5 },
      ],
      total: { cal: 620, pro: 62, carb: 52, fat: 14 },
      tags: ['strength', 'functional', 'cardio', 'calisthenics'],
      tip: "Antrenman gününde karbonhidratı biraz artır."
    },
    {
      name: "Kuru bakliyat + yoğurt",
      desc: "Ev yemeği mantığında, ekonomik seçenek",
      foods: [
        { name: "Kuru fasulye / nohut (1 büyük kase)", cal: 320, pro: 18, carb: 45, fat: 8 },
        { name: "Pirinç veya bulgur (120g pişmiş)", cal: 150, pro: 3, carb: 31, fat: 1 },
        { name: "Yoğurt (200g)", cal: 120, pro: 10, carb: 10, fat: 5 },
      ],
      total: { cal: 590, pro: 31, carb: 86, fat: 14 },
      tags: ['rest', 'cardio', 'functional'],
      tip: "Recovery günlerinde de çok iş görür."
    },
    {
      name: "Köfte + patates/pirinç",
      desc: "Klasik akşam yemeği, ulaşılabilir",
      foods: [
        { name: "Köfte (180g)", cal: 360, pro: 32, carb: 4, fat: 24 },
        { name: "Patates veya pirinç", cal: 190, pro: 4, carb: 38, fat: 2 },
        { name: "Salata", cal: 40, pro: 2, carb: 6, fat: 1 },
      ],
      total: { cal: 590, pro: 38, carb: 48, fat: 27 },
      tags: ['strength', 'calisthenics', 'rest'],
      tip: "Evde herkesle yenebilecek tipte bir öğün."
    },
  ],
  },
  rest: {
    breakfastLabel: "Off Day Kahvaltı",
    snackLabel: "Off Day Ara Öğün",
    dinnerLabel: "Off Day Akşam",
    breakfast: [
      {
        name: "Omlet + avokatsız sade kahvaltı",
        desc: "Off day için protein yüksek, karbonhidrat kontrollü başlangıç",
        foods: [
          { name: "Omlet (3 yumurta)", cal: 234, pro: 18, carb: 3, fat: 15 },
          { name: "Lor peyniri (80g)", cal: 95, pro: 14, carb: 3, fat: 2 },
          { name: "Domates + salatalık", cal: 40, pro: 2, carb: 8, fat: 0 },
          { name: "Tam buğday ekmek (1 dilim)", cal: 80, pro: 3, carb: 15, fat: 1 },
        ],
        total: { cal: 449, pro: 37, carb: 29, fat: 18 },
        tags: ['rest'],
        tip: "Off day’de proteini koru, karbonhidratı biraz daha kontrollü tut."
      },
      {
        name: "Yoğurt + yulaf + tarçın",
        desc: "Hafif ama tok tutan dinlenme günü kahvaltısı",
        foods: [
          { name: "Yoğurt (250g)", cal: 150, pro: 12, carb: 12, fat: 6 },
          { name: "Yulaf (40g)", cal: 150, pro: 5, carb: 27, fat: 3 },
          { name: "Elma (1 adet)", cal: 80, pro: 0, carb: 21, fat: 0 },
        ],
        total: { cal: 380, pro: 17, carb: 60, fat: 9 },
        tags: ['rest'],
        tip: "Sindirim rahat olsun istiyorsan iyi seçim."
      },
      {
        name: "Peynir tabağı + haşlanmış yumurta",
        desc: "Evde çok uğraştırmayan klasik off day kahvaltısı",
        foods: [
          { name: "Haşlanmış yumurta (2 adet)", cal: 156, pro: 12, carb: 2, fat: 10 },
          { name: "Beyaz peynir (70g)", cal: 175, pro: 12, carb: 2, fat: 14 },
          { name: "Zeytin + domates", cal: 70, pro: 1, carb: 5, fat: 5 },
          { name: "Tam buğday ekmek (1 dilim)", cal: 80, pro: 3, carb: 15, fat: 1 },
        ],
        total: { cal: 481, pro: 28, carb: 24, fat: 30 },
        tags: ['rest'],
        tip: "Ailece yenebilecek, çok normal bir kahvaltı."
      },
    ],
    snack: [
      {
        name: "Ayran + leblebi",
        desc: "Basit, ekonomik ve ulaşılabilir",
        foods: [
          { name: "Ayran (300ml)", cal: 105, pro: 6, carb: 8, fat: 5 },
          { name: "Leblebi (40g)", cal: 150, pro: 8, carb: 24, fat: 2 },
        ],
        total: { cal: 255, pro: 14, carb: 32, fat: 7 },
        tags: ['rest'],
        tip: "Evde her zaman bulunabilen malzemelerle olur."
      },
      {
        name: "Süzme yoğurt + ceviz",
        desc: "Daha tok tutan dinlenme günü ara öğünü",
        foods: [
          { name: "Süzme yoğurt (200g)", cal: 173, pro: 20, carb: 8, fat: 7 },
          { name: "Ceviz (15g)", cal: 98, pro: 2, carb: 2, fat: 10 },
        ],
        total: { cal: 271, pro: 22, carb: 10, fat: 17 },
        tags: ['rest'],
        tip: "Akşam açlığını da dengeler."
      },
      {
        name: "Meyve + kefir",
        desc: "Daha hafif bir off day ara öğünü",
        foods: [
          { name: "Kefir (250ml)", cal: 155, pro: 9, carb: 12, fat: 8 },
          { name: "Elma veya armut", cal: 80, pro: 0, carb: 21, fat: 0 },
        ],
        total: { cal: 235, pro: 9, carb: 33, fat: 8 },
        tags: ['rest'],
        tip: "Off day’de hafif kalmak istediğinde iyi gider."
      },
    ],
    dinner: [
      {
        name: "Sebzeli tavuk + yoğurt",
        desc: "Off day için dengeli ve toparlayıcı akşam öğünü",
        foods: [
          { name: "Tavuk (180g)", cal: 300, pro: 50, carb: 0, fat: 7 },
          { name: "Sebze sote / haşlama", cal: 120, pro: 4, carb: 16, fat: 4 },
          { name: "Yoğurt (150g)", cal: 90, pro: 7, carb: 7, fat: 4 },
        ],
        total: { cal: 510, pro: 61, carb: 23, fat: 15 },
        tags: ['rest'],
        tip: "Karbonhidratı düşük tutup toparlanmayı korur."
      },
      {
        name: "Etli sebze yemeği + yoğurt",
        desc: "Normal ev yemeği gibi hissettiren off day akşamı",
        foods: [
          { name: "Etli sebze yemeği (1 porsiyon)", cal: 320, pro: 24, carb: 18, fat: 16 },
          { name: "Yoğurt (200g)", cal: 120, pro: 10, carb: 10, fat: 5 },
          { name: "Küçük salata", cal: 40, pro: 2, carb: 6, fat: 1 },
        ],
        total: { cal: 480, pro: 36, carb: 34, fat: 22 },
        tags: ['rest'],
        tip: "Ailece yenen normal akşam yemeğine daha yakın."
      },
      {
        name: "Mercimek / nohut + salata",
        desc: "Ekonomik ve hafif toparlanma akşamı",
        foods: [
          { name: "Mercimek veya nohut (1 kase)", cal: 260, pro: 15, carb: 38, fat: 6 },
          { name: "Yoğurt (150g)", cal: 90, pro: 7, carb: 7, fat: 4 },
          { name: "Salata", cal: 40, pro: 2, carb: 6, fat: 1 },
        ],
        total: { cal: 390, pro: 24, carb: 51, fat: 11 },
        tags: ['rest'],
        tip: "Daha ekonomik ve sindirimi rahat bir alternatif."
      },
    ],
  },
};

function pickSectionMeals(sectionGroup, section, dayType) {
  const pool = HOME_MEAL_SECTIONS[sectionGroup]?.[section] || [];
  return pool
    .map((meal) => ({
      ...meal,
      score: meal.tags.includes(dayType) ? 2 : meal.tags.includes('rest') ? 1 : 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((meal) => {
      const { score: _score, ...rest } = meal;
      return rest;
    });
}

export function getHomeMealSections(dayType) {
  const isRestDay = dayType === 'rest';
  const sectionGroup = isRestDay ? 'rest' : 'training';
  return {
    mode: sectionGroup,
    breakfastLabel: HOME_MEAL_SECTIONS[sectionGroup].breakfastLabel,
    snackLabel: HOME_MEAL_SECTIONS[sectionGroup].snackLabel,
    dinnerLabel: HOME_MEAL_SECTIONS[sectionGroup].dinnerLabel,
    breakfast: pickSectionMeals(sectionGroup, 'breakfast', dayType),
    snack: pickSectionMeals(sectionGroup, 'snack', dayType),
    dinner: pickSectionMeals(sectionGroup, 'dinner', dayType),
  };
}

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
        ...buildDaySummary({ dayType, adjustedCal, workoutKcal, bodyWeight }),
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
  const summary = buildDaySummary({ dayType, adjustedCal, workoutKcal, bodyWeight });

  return { meals: topPicks, summary, mealTime, adjustedCal };
}

function buildDaySummary({ dayType, adjustedCal, workoutKcal, bodyWeight }) {
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
