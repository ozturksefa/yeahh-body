export const PROGRAM3 = {
  meta: {
    name: "Atletik Macfit",
    phase: "Faz 1 — Dayanıklılık + Kontrollü Güç",
    weeks: "Hafta 1–8",
    description: "Macfit ekipmanına göre düzenlenmiş, sakatlık uyumlu atletik plan. Öncelik dayanıklılık ve kuvvet tabanı; kalistenik skill ise kontrollü, submaksimal ve omuz dostu ilerler.",
  },

  periodization: [
    { week: 1, label: "Adaptasyon", sets_modifier: 0.85, note: "RPE 6-7. Teknik ve tolerans haftası." },
    { week: 2, label: "Taban Hacim", sets_modifier: 1.0, note: "Normal hacim. Temiz tekrarlar." },
    { week: 3, label: "Taban +", sets_modifier: 1.05, note: "Sadece ağrısız hareketlerde küçük artış." },
    { week: 4, label: "Deload", sets_modifier: 0.75, note: "Hacmi düşür, semptom kontrolü yap." },
    { week: 5, label: "Yoğunluk", sets_modifier: 1.0, note: "Ağırlık hafif artar, failure yine yok." },
    { week: 6, label: "Yoğunluk +", sets_modifier: 1.05, note: "Ana kuvvet bloklarında RPE 7-8." },
    { week: 7, label: "Konsolidasyon", sets_modifier: 0.9, note: "En iyi tolere edilen varyasyonları sabitle." },
    { week: 8, label: "Retest + Deload", sets_modifier: 0.7, note: "Sadece seçili submax testler ve rahatlama." },
  ],

  principles: [
    "Koşu ve zıplama yok; kondisyon rower, bike ve incline walk ile gelir.",
    "Ağrı 2/10 üstüne çıkarsa o hareket regress edilir veya değiştirilir.",
    "Ana kuvvet setleri RPE 6-8 bandında kalır; failure kovalanmaz.",
    "Dip, agresif overhead ve yüksek spinal stres oluşturan hareketler ana taşıyıcı olmaz.",
    "Pazar günü test değil, toparlanma ve aerobik baz günüdür.",
  ],

  skillPaths: {
    pullup: {
      name: "Pull-up Yolu",
      icon: "🔝",
      description: "Macfit ekipmanıyla güvenli çekiş progresyonu",
      steps: [
        { level: 1, name: "Dead Hang", target: "3 × 20sn", detail: "Aktif omuz, pasif sarkma yok" },
        { level: 2, name: "Scapula Pull Up", target: "3 × 10", detail: "Sadece skapula hareket eder" },
        { level: 3, name: "Assisted Pull-up", target: "4 × 6", detail: "Tam ROM, yavaş iniş" },
        { level: 4, name: "Lat Pulldown", target: "4 × 8-10", detail: "Çekiş hacmi ve lat gücü" },
        { level: 5, name: "Chin-up Negative", target: "4 × 4", detail: "5 sn eksantrik" },
        { level: 6, name: "Full Chin-up", target: "4 × 4-6", detail: "Temiz form" },
        { level: 7, name: "Full Pull-up", target: "4 × 4-6", detail: "Pronasyon ve kontrol" },
      ],
    },
    handstand: {
      name: "Handstand Yolu",
      icon: "🙃",
      description: "Omuz toleransı bozulmadan teknik temas",
      steps: [
        { level: 1, name: "Pike Hold", target: "3 × 15sn", detail: "Omuz aktivasyonu" },
        { level: 2, name: "Wall Handstand Hold", target: "2 × 10sn", detail: "Submax ve kısa" },
        { level: 3, name: "Wall Handstand Hold", target: "3 × 15sn", detail: "Ağrısızsa süre artar" },
        { level: 4, name: "Wall Toe Pull", target: "3 × 3", detail: "Kısa denge ayrılmaları" },
        { level: 5, name: "Serbest Deneme", target: "5-6 deneme", detail: "Yorgunken değil" },
      ],
    },
    lsit: {
      name: "L-sit Yolu",
      icon: "🪑",
      description: "Support ve core basıncı",
      steps: [
        { level: 1, name: "Support Hold", target: "3 × 15sn", detail: "Omuz depresyonu öğrenilir" },
        { level: 2, name: "Knee Tuck Hold", target: "4 × 10-15sn", detail: "Tuck pozisyonda süre" },
        { level: 3, name: "Floor L-sit Tuck Hold", target: "3 × 8-10sn", detail: "Posterior tilt korunur" },
        { level: 4, name: "Chair L-sit Tuck Hold", target: "3 × 8-12sn", detail: "Support basıncı artar" },
        { level: 5, name: "L-sit Leg Extension", target: "2 × 3-5", detail: "Tek bacak uzatma" },
      ],
    },
  },

  days: [
    {
      id: 1,
      title: "GÜN 1",
      sub: "SALI",
      focus: "Pull + Press Foundation",
      duration: "~78 dk",
      color: "#C1121F",
      type: "training",
      injury: "⚠️ Omuz: press ve hang setlerinde boyun-serratus kontrolü şart. Diz: leg press kısa ROM. Bel: row ve hip thrust'ta kaburga-kalça hizası korunur.",
      blocks: [
        { name: "🔥 ISINMA — Postür & Hazırlık", color: "#CC5500", exercises: [
          { name: "Foam Roller Upper Back Roll", sets: "2 × 30sn", muscle: "Torasik rahatlama", how: ["Foam roller'ı sırt ortasına koy", "Kısa ileri-geri geçiş yap", "Boynu sıkmadan nefes ver"], avoid: "Belin alt kısmında agresif yuvarlanma", warn: "KİFOZ: T-spine açmak için iyi başlangıç", alts: [] },
          { name: "Cat and Cow", sets: "2 × 10", muscle: "Omurga mobilite", how: ["Dört ayak pozisyonda nefesle ak", "Her iki uçta kısa bekle"], avoid: "Hızlı geçiş", warn: "Bel ve boyun hazırlanır", alts: [] },
          { name: "Ankle Circle", sets: "2 × 10 (her yön)", muscle: "Ayak bileği mobilite", how: ["Otur ve ayak bileğini her iki yönde döndür", "Hareketi dizden değil ayaktan yap"], avoid: "Büyük ağrılı aralık", warn: "Menisküs için alt zinciri hazırlamaya yardım eder", alts: [] },
        ]},
        { name: "🛡 SAKATLIK PROTOKOLÜ", color: "#7B241C", exercises: [
          { name: "Band External Rotation", sets: "3 × 15 (her taraf)", muscle: "Rotator cuff", how: ["Dirsek gövdeye yapışık", "Bandı dışa döndür", "1 sn tut ve kontrollü dön"], avoid: "Dirseği açma", warn: "ROTATOR CUFF: Günün zorunlu filtresi", alts: ["Cable External Rotation"] },
          { name: "Scapular Wall Slide", sets: "2 × 10", muscle: "Serratus + alt trapez", how: ["Sırtı duvara yakın tut", "W'den U'ya kontrollü kaydır"], avoid: "Kaburgayı dışarı itme", warn: "Kifoz ve omuz için şart", alts: [] },
          { name: "Chin Tuck", sets: "3 × 12", muscle: "Derin boyun fleksörleri", how: ["Çeneyi geriye al", "2 sn bekle ve bırak"], avoid: "Başı aşağı eğme", warn: "Boyun fıtığında günlük bakım", alts: [] },
        ]},
        { name: "🤸 SKİLL — Pull-up Temel", color: "#8338EC", exercises: [
          { name: "Dead Hang", sets: "2 × 20sn", muscle: "Grip + aktif omuz", how: ["Bardan asıl", "Omuzları hafif aktif tut", "Nefesi sakin sürdür"], avoid: "Pasif sarkma", warn: "Omuzda çekme artarsa active hang süresini azalt", alts: ["Active Hang"] },
          { name: "Assisted Pull-up", sets: "4 × 6", muscle: "Lat, biceps", how: ["Tam ROM kullan", "3 sn kontrollü in", "Göğsü bara yönlendir"], avoid: "Yarım tekrar", warn: "Pull-up yolunun ana hareketi", alts: ["Lat Pulldown"] },
        ]},
        { name: "💪 KUVVET — Çekiş + İtiş + Alt Vücut", color: "#C1121F", exercises: [
          { name: "Chest Supported Row", sets: "4 × 8", muscle: "Mid sırt, rhomboid, lat", how: ["Göğsü desteğe koy", "Dirsekleri geriye sür", "Üstte 1 sn sık"], avoid: "Boynu öne uzatma", warn: "Bel yükünü azaltan ana row seçimi", alts: ["Single Arm DB Row"] },
          { name: "Floor Press", sets: "4 × 8", muscle: "Göğüs, triceps, ön delt", how: ["Dirsekler 45°", "Alt noktada zemine kontrollü dokun", "Yukarı itişte omzu sıkıştırma"], avoid: "Dirsekleri çok yana açma", warn: "Omuz için bench'ten daha güvenli press", alts: ["Push Up Variations", "Landmine Press"] },
          { name: "Leg Press", sets: "3 × 10", muscle: "Quad, glute", how: ["Ayaklar omuz genişliğinde", "Sadece ağrısız ROM kullan", "Topukla it"], avoid: "Derin diz fleksiyonu", warn: "MENİSKÜS: Kısa ROM ve kontrollü tempo", alts: ["Box Squat", "Dumbbell Reverse Lunge"] },
          { name: "Hip Thrust (bilateral)", sets: "3 × 12", muscle: "Glute max", how: ["Kaburgayı kapat", "Kalçayı glute ile it", "Üstte 1 sn sık"], avoid: "Bel hiperextansiyonu", warn: "Posterior zincirin güvenli ana hareketi", alts: ["Glute Bridge / Hip Thrust"] },
        ]},
        { name: "🎯 CORE — Anti-Rotasyon", color: "#6C3483", exercises: [
          { name: "Pallof Press", sets: "3 × 10 (her taraf)", muscle: "Core anti-rotasyon", how: ["Kablo veya bandı göğüs önünde tut", "Öne uzat ve 2 sn bekle", "Gövde dönmesin"], avoid: "Belden dönme", warn: "Skolyoz için değerli stabilite işi", alts: [] },
          { name: "Side Plank Left", sets: "2 × 30sn", muscle: "Lateral core", how: ["Kalça çizgisini sabit tut", "Nefesi ritmik sürdür"], avoid: "Omzu kulağa çekme", warn: "Sağ-sol eşit süre", alts: [] },
          { name: "Side Plank Right", sets: "2 × 30sn", muscle: "Lateral core", how: ["Kalça çizgisini sabit tut", "Nefesi ritmik sürdür"], avoid: "Omzu kulağa çekme", warn: "Sağ-sol eşit süre", alts: [] },
        ]},
        { name: "⚡ KONDİSYON — Darbesiz Interval", color: "#990000", exercises: [
          { name: "Rowing Interval", sets: "8 × 30sn sert / 60sn kolay", muscle: "Kardiyovasküler kapasite", how: ["Rower veya air bike kullan", "Sert bölümlerde teknik bozulmasın", "Kol değil kalça-bacak ritmini koru"], avoid: "Belin yuvarlanması", warn: "Koşu yerine en güvenli yüksek yoğunluk seçeneği", alts: ["Assault Bike Interval"] },
        ]},
      ],
    },
    {
      id: 2,
      title: "GÜN 2",
      sub: "PERŞEMBE",
      focus: "Upper Back + Lower Control",
      duration: "~76 dk",
      color: "#2A9D8F",
      type: "training",
      injury: "⚠️ Omuz: dip yok, press açısı landmine ile kalır. Diz: reverse lunge kısa adımlı. Bel: kondisyonda koşu değil incline walk/bike.",
      blocks: [
        { name: "🔥 ISINMA — Mobilite & Aktivasyon", color: "#CC5500", exercises: [
          { name: "World Greatest Stretch", sets: "2 × 4 (her taraf)", muscle: "Tüm vücut mobilite", how: ["Lunge pozisyonuna gir", "Göğsü döndür ve kalçayı aç", "Her tekrar yavaş olsun"], avoid: "Dizin içine çökmesi", warn: "Alt-üst zinciri birlikte hazırlar", alts: [] },
          { name: "Band Pull Apart", sets: "2 × 15", muscle: "Arka omuz + skapula", how: ["Kollar göğüs hizasında", "Bandı iki yana aç", "Üstte kısa sıkıştır"], avoid: "Omuzları yükseltme", warn: "Postür hazırlığı", alts: [] },
          { name: "Ankle Circle", sets: "2 × 10 (her yön)", muscle: "Ayak bileği mobilite", how: ["Ayak bileğini kontrollü çevir"], avoid: "Ağrılı aralıkta zorlama", warn: "Lunge ve yürüyüş öncesi iyi hazırlık", alts: [] },
        ]},
        { name: "🛡 SAKATLIK PROTOKOLÜ", color: "#7B241C", exercises: [
          { name: "Band External Rotation", sets: "3 × 15 (her taraf)", muscle: "Rotator cuff", how: ["Dirsek sabit", "Yavaş dış rotasyon"], avoid: "Momentum", warn: "Omuz öncesi zorunlu", alts: [] },
          { name: "Scapular Wall Slide", sets: "2 × 10", muscle: "Skapula kontrolü", how: ["Duvarda kontrollü kaydır"], avoid: "Kaburgayı açma", warn: "Kifoz + omuz için destek", alts: [] },
          { name: "Chin Tuck", sets: "3 × 12", muscle: "Boyun stabilite", how: ["2 sn tut"], avoid: "Başı öne eğme", warn: "Boyun için günlük filtre", alts: [] },
        ]},
        { name: "🤸 SKİLL — L-sit & Teknik", color: "#8338EC", exercises: [
          { name: "Support Hold", sets: "3 × 20sn", muscle: "Support basıncı + omuz depresyonu", how: ["Paralel bar veya dip station üst pozisyonu", "Omuzları aşağı bas", "Dirsekleri düz tut"], avoid: "Alt pozisyona inmeye çalışma", warn: "Dip yapmıyorsun; sadece support tutuşu", alts: ["Parallel Bar Support Hold"] },
          { name: "Knee Tuck Hold", sets: "4 × 12sn", muscle: "Core + hip flexor", how: ["Support pozisyonda dizleri çek", "Omuzları aşağı basılı tut"], avoid: "Omuzların sarkması", warn: "L-sit yolu için yeterli", alts: ["Floor L-sit Tuck Hold"] },
          { name: "Pike Hold", sets: "2 × 15sn", muscle: "Omuz aktivasyon", how: ["Kalçayı yukarı kaldır", "Omuzları aktif it"], avoid: "Bel çökmesi", warn: "Overhead temas hafif kalır", alts: [] },
        ]},
        { name: "💪 KUVVET — Push + Pull + Lower", color: "#2A9D8F", exercises: [
          { name: "Lat Pulldown", sets: "4 × 10", muscle: "Lat, teres major, biceps", how: ["Göğsü dik tut", "Barı göğüs üstüne çek", "Yavaş geri bırak"], avoid: "Boynu öne itme", warn: "Çekiş hacmini destekler", alts: ["Assisted Pull-up"] },
          { name: "Landmine Press", sets: "3 × 8 (her taraf)", muscle: "Ön delt, serratus, triceps", how: ["Core sıkı", "Barı çapraz yukarı it", "Belden kaçmadan dön"], avoid: "Bel hiperextansiyonu", warn: "Omuz için en güvenli overhead alternatifi", alts: ["Floor Press"] },
          { name: "Dumbbell Reverse Lunge", sets: "3 × 8 (her bacak)", muscle: "Glute, quad", how: ["Kısa geri adım al", "Ön topuk baskın olsun", "Gövde dik kalsın"], avoid: "Dizi içe düşürme", warn: "MENİSKÜS: Ağrısız ROM dışında zorlama yok", alts: ["Leg Press", "Step Down"] },
          { name: "Push Up Variations", sets: "3 × 10", muscle: "Göğüs, triceps, serratus", how: ["Dirsekler 30-45°", "Gövde çizgisi sabit", "Ağrısız ROM'da çalış"], avoid: "Omuzu alt pozisyonda sıkıştırma", warn: "Makine yerine eklem dostu itiş", alts: ["Incline Push Up"] },
        ]},
        { name: "🎯 CORE — Kontrol", color: "#6C3483", exercises: [
          { name: "Dead Bug", sets: "3 × 10 (her taraf)", muscle: "Anterior core", how: ["Bel sabit", "Karşı kol-bacak yavaş uzat"], avoid: "Bel boşluğunun artması", warn: "Ab wheel yerine güvenli seçim", alts: [] },
          { name: "Pallof Press", sets: "2 × 12 (her taraf)", muscle: "Anti-rotasyon", how: ["Öne uzat ve bekle"], avoid: "Gövde dönmesi", warn: "Skolyoz dengesini destekler", alts: [] },
        ]},
        { name: "⚡ KONDİSYON — Zone 2", color: "#990000", exercises: [
          { name: "20 Dakika Sürekli Aerobik Devre", sets: "20 dakika sürekli", muscle: "Aerobik baz", how: ["Seçenek: incline walk, bike veya row", "Konuşabilecek tempo — RPE 5-6", "Tempo düşmez, sprint yapılmaz"], avoid: "Koşu ve zıplama", warn: "Birincil hedef dayanıklılık olduğu için bu blok önemli", alts: [] },
        ]},
      ],
    },
    {
      id: 3,
      title: "GÜN 3",
      sub: "CUMARTESİ",
      focus: "Posterior Chain + Athletic Volume",
      duration: "~88 dk",
      color: "#F4A261",
      type: "training",
      injury: "⚠️ Bel: hex bar'da nötral omurga ve brace şart. Diz: step-up alçak kutu ile. Omuz: handstand kısa, press yine landmine hattında.",
      blocks: [
        { name: "🔥 ISINMA — Fonksiyonel Hazırlık", color: "#CC5500", exercises: [
          { name: "Foam Roller Upper Back Roll", sets: "2 × 30sn", muscle: "Torasik rahatlama", how: ["Kısa geçişler uygula"], avoid: "Belde agresif yuvarlanma", warn: null, alts: [] },
          { name: "Hip Circle", sets: "2 × 10 (her yön)", muscle: "Kalça mobilite", how: ["Ayakta büyük daireler çiz"], avoid: "Belden kompansasyon", warn: "Step-up ve deadlift öncesi hazırlık", alts: [] },
          { name: "Band Face Pull", sets: "2 × 15", muscle: "Posterior delt + cuff", how: ["Göz hizasında çek", "Dış rotasyonla bitir"], avoid: "Dirsekleri düşürme", warn: "Omuz başını hazırlamak için iyi", alts: [] },
          { name: "Ankle Circle", sets: "2 × 10 (her yön)", muscle: "Ayak bileği mobilite", how: ["Yavaş yön değiştir"], avoid: null, warn: null, alts: [] },
        ]},
        { name: "🛡 SAKATLIK PROTOKOLÜ", color: "#7B241C", exercises: [
          { name: "Band External Rotation", sets: "3 × 15 (her taraf)", muscle: "Rotator cuff", how: ["Dirsek sabit, yavaş dış rotasyon"], avoid: "Momentum", warn: null, alts: [] },
          { name: "Scapular Wall Slide", sets: "2 × 10", muscle: "Skapula kontrolü", how: ["Duvarda kaydır"], avoid: "Kaburgayı açma", warn: null, alts: [] },
          { name: "Chin Tuck", sets: "3 × 12", muscle: "Boyun stabilite", how: ["2 sn tut"], avoid: null, warn: null, alts: [] },
        ]},
        { name: "🤸 SKİLL — Destek + Handstand", color: "#8338EC", exercises: [
          { name: "Support Hold", sets: "3 × 20sn", muscle: "Support basıncı", how: ["Kollar düz", "Omuzları aşağı bas"], avoid: "Dip'e inmeye çalışma", warn: "Dip yerine güvenli support", alts: [] },
          { name: "Knee Tuck Hold", sets: "3 × 15sn", muscle: "Core + hip flexor", how: ["Tuck pozisyonu koru"], avoid: "Omuzların sarkması", warn: null, alts: [] },
          { name: "Wall Handstand Hold", sets: "2 × 10sn", muscle: "Overhead stabilite", how: ["Submax ve kısa setler", "Boyun nötral"], avoid: "Muz pozisyonu", warn: "Omuz ağrısı varsa sadece pike hold", alts: ["Pike Hold"] },
        ]},
        { name: "💪 KUVVET — Posterior Chain + Pull", color: "#F4A261", exercises: [
          { name: "Hex Bar Deadlift", sets: "4 × 5", muscle: "Posterior chain", how: ["Brace al", "Kalçayı ve göğsü birlikte kaldır", "Barı vücuda yakın tut"], avoid: "Bel yuvarlama", warn: "BEL: Bugünün en teknik hareketi", alts: ["Romanian Deadlift", "Hip Thrust (bilateral)"] },
          { name: "Single Arm DB Row", sets: "4 × 8 (her taraf)", muscle: "Lat, mid sırt", how: ["Bench desteği al", "Dirseği kalçaya sür", "Üstte kısa sık"], avoid: "Gövdeyi döndürme", warn: "Bel desteği sayesinde güvenli row", alts: ["Chest Supported Row"] },
          { name: "Landmine Press", sets: "3 × 8 (her taraf)", muscle: "Omuz dostu press", how: ["Kalçayı sık, core'u kilitle", "Barı çapraz yukarı it"], avoid: "Belden kaçırma", warn: "Push press yerine seçildi", alts: [] },
          { name: "Step-Up (Weighted)", sets: "3 × 8 (her bacak)", muscle: "Quad, glute", how: ["Alçak kutu seç", "Ön ayağa tam yük ver", "Kontrollü in"], avoid: "Yüksek kutu ve derin açı", warn: "MENİSKÜS: Diz toleransı belirler", alts: ["Dumbbell Reverse Lunge", "Leg Press"] },
          { name: "Hip Thrust (bilateral)", sets: "3 × 12", muscle: "Glute max", how: ["Üstte 1 sn sıkıştır", "Bel değil kalça çalışsın"], avoid: "Bel hiperextansiyonu", warn: "Deadlift sonrası glute destek hacmi", alts: [] },
        ]},
        { name: "🎯 CORE — Lateral & Anti-Rotasyon", color: "#6C3483", exercises: [
          { name: "Pallof Press", sets: "3 × 10 (her taraf)", muscle: "Anti-rotasyon", how: ["Öne uzat ve 2 sn bekle"], avoid: "Gövdeyi döndürme", warn: null, alts: [] },
          { name: "Side Plank Left", sets: "2 × 30sn", muscle: "Lateral core", how: ["Kalça çizgisini koru"], avoid: null, warn: null, alts: [] },
          { name: "Side Plank Right", sets: "2 × 30sn", muscle: "Lateral core", how: ["Kalça çizgisini koru"], avoid: null, warn: null, alts: [] },
        ]},
        { name: "⚡ KONDİSYON — Carry + Zone 2", color: "#990000", exercises: [
          { name: "Double Farmer Carry", sets: "4 × 20m", muscle: "Grip, core, postür", how: ["Dumbbell veya farmer handle ile dik yürü", "Omuzlar aşağı ve geride", "Kısa ama kontrollü adımlar"], avoid: "Omuzları kulağa kaldırma", warn: "Postür ve fonksiyon için atletik blok", alts: [] },
          { name: "20 Dakika Sürekli Aerobik Devre", sets: "15 dakika sürekli", muscle: "Aerobik baz", how: ["Carry sonrası bike/row/incline walk", "RPE 5-6'da kal"], avoid: "Sprint yapma", warn: "Dayanıklılık önceliğini korur", alts: [] },
        ]},
      ],
    },
    {
      id: 4,
      title: "GÜN 4",
      sub: "PAZAR",
      focus: "Recovery Strength + Zone 2",
      duration: "~70 dk",
      color: "#8338EC",
      type: "training",
      injury: "⚠️ Bugün test yok. Amaç toparlanmak, hareket kalitesini korumak ve aerobik tabanı büyütmek.",
      blocks: [
        { name: "🔥 ISINMA — Genel Hazırlık", color: "#CC5500", exercises: [
          { name: "Foam Roller Upper Back Roll", sets: "2 × 30sn", muscle: "Torasik rahatlama", how: ["Kısa geçişler"], avoid: null, warn: null, alts: [] },
          { name: "Band Pull Apart", sets: "2 × 15", muscle: "Arka omuz aktivasyon", how: ["Göğüs hizasında aç"], avoid: null, warn: null, alts: [] },
          { name: "Goblet Squat (ağırlıksız)", sets: "2 × 8", muscle: "Hareket hazırlığı", how: ["Sadece ağrısız derinlik", "Topuk yerde"], avoid: "Diz ağrılı açı", warn: "Mobilite amaçlı kısa hazırlık", alts: [] },
          { name: "Hip Hinge", sets: "2 × 10", muscle: "Kalça paterni", how: ["Kalçayı geriye gönder", "Omurga uzun"], avoid: "Bel yuvarlama", warn: null, alts: [] },
        ]},
        { name: "🛡 SAKATLIK PROTOKOLÜ", color: "#7B241C", exercises: [
          { name: "Band External Rotation", sets: "2 × 15 (her taraf)", muscle: "Rotator cuff", how: ["Bugün kolay tempo"], avoid: null, warn: "Aktif toparlanma dozu", alts: [] },
          { name: "Scapular Wall Slide", sets: "2 × 10", muscle: "Skapula kontrolü", how: ["Yavaş kaydır"], avoid: null, warn: null, alts: [] },
          { name: "Chin Tuck", sets: "2 × 12", muscle: "Boyun stabilite", how: ["2 sn tut"], avoid: null, warn: null, alts: [] },
        ]},
        { name: "🤸 SKİLL — Submax Teknik", color: "#8338EC", exercises: [
          { name: "Dead Hang", sets: "2 × 20sn", muscle: "Grip + omuz", how: ["Aktif omuzla kısa asıl"], avoid: "Pasif sarkma", warn: null, alts: [] },
          { name: "Knee Tuck Hold", sets: "2 × 12sn", muscle: "Core + support", how: ["Temiz kısa set"], avoid: "Failure", warn: null, alts: [] },
          { name: "Pike Hold", sets: "2 × 15sn", muscle: "Omuz aktivasyon", how: ["Hafif teknik temas"], avoid: "Omuz ağrısında zorlama", warn: null, alts: [] },
        ]},
        { name: "💪 KUVVET — Hafif Destek", color: "#8338EC", exercises: [
          { name: "Lat Pulldown", sets: "3 × 10", muscle: "Lat, biceps", how: ["Kontrollü çek, kontrollü bırak"], avoid: "Boynu öne çıkarma", warn: "Pazar günü submax kalır", alts: [] },
          { name: "Glute Bridge / Hip Thrust", sets: "3 × 12", muscle: "Glute max", how: ["Kalçayı yukarı it, üstte sık"], avoid: "Bel aşırı kalkışı", warn: "Toparlanma dostu posterior zincir", alts: [] },
          { name: "Band Face Pull", sets: "3 × 15", muscle: "Posterior delt + cuff", how: ["Çek ve dışa döndür"], avoid: "Dirsekleri düşürme", warn: "Haftayı omuz bakımı ile kapat", alts: [] },
        ]},
        { name: "🎯 CORE — Güvenli Kapanış", color: "#6C3483", exercises: [
          { name: "Dead Bug", sets: "2 × 10 (her taraf)", muscle: "Anterior core", how: ["Bel sabit kalsın"], avoid: "Bel boşluğu artışı", warn: null, alts: [] },
          { name: "Side Plank Left", sets: "2 × 30sn", muscle: "Lateral core", how: ["Kalça çizgisini koru"], avoid: null, warn: null, alts: [] },
          { name: "Side Plank Right", sets: "2 × 30sn", muscle: "Lateral core", how: ["Kalça çizgisini koru"], avoid: null, warn: null, alts: [] },
        ]},
        { name: "⚡ KONDİSYON — Uzun Zone 2", color: "#990000", exercises: [
          { name: "20 Dakika Sürekli Aerobik Devre", sets: "30 dakika sürekli", muscle: "Aerobik baz", how: ["Bike, rower veya incline walk seç", "Konuşabilecek tempo", "RPE 5-6"], avoid: "Koşu ve HIIT", warn: "Pazar artık toparlanma + dayanıklılık günü", alts: [] },
        ]},
      ],
    },
    {
      id: 5,
      title: "OFF 1",
      sub: "PAZARTESİ",
      focus: "Aktif Recovery",
      duration: "~18 dk",
      color: "#6C757D",
      type: "offday",
      blocks: [
        { name: "🌿 RECOVERY — Sabah Rutini", color: "#6C757D", exercises: [
          { name: "Diaphragmatic Breathing", sets: "3 × 5 nefes", muscle: "Nefes + parasempatik aktivasyon", how: ["Sırt üstü veya oturarak", "Burnundan nefes al, kaburgayı genişlet", "Uzun veriş yap"], avoid: "Göğüs üstüne yüzeysel nefes", warn: "Yeni baba temposunda toparlanmaya destek olur", alts: [] },
          { name: "Cat and Cow", sets: "2 × 10", muscle: "Omurga mobilite", how: ["Nefesle birlikte yavaş uygula"], avoid: null, warn: null, alts: [] },
          { name: "Hip Flexor Stretch", sets: "2 × 45sn (her taraf)", muscle: "Kalça ön hat", how: ["Pelvisi hafif posterior tilt'e getir"], avoid: "Belden kompansasyon", warn: null, alts: [] },
          { name: "Prone Cobra", sets: "2 × 20sn", muscle: "Postür zinciri", how: ["Göğsü hafif kaldır, kürekleri sık"], avoid: "Belden aşırı kalkma", warn: "Kifoz için hafif aktivasyon", alts: [] },
          { name: "Chin Tuck", sets: "2 × 12", muscle: "Boyun stabilite", how: ["2 sn tut"], avoid: null, warn: null, alts: [] },
        ]},
      ],
    },
    {
      id: 6,
      title: "OFF 2",
      sub: "ÇARŞAMBA",
      focus: "Mobilite + Hafif Aktivasyon",
      duration: "~25 dk",
      color: "#6C757D",
      type: "offday",
      blocks: [
        { name: "⚡ AKTİF RECOVERY — Ekipmansız", color: "#6C757D", exercises: [
          { name: "Scapula Squeeze", sets: "2 × 15", muscle: "Skapula retraksiyon", how: ["Ayakta dik dur", "Kürek kemiklerini birbirine yaklaştır"], avoid: "Belden yaylanma", warn: null, alts: [] },
          { name: "Incline Push Up", sets: "2 × 10", muscle: "Hafif itiş aktivasyon", how: ["Yüksek eğimde, rahat tempo"], avoid: "Ağrılı ROM", warn: null, alts: [] },
          { name: "Glute Bridge", sets: "2 × 15", muscle: "Glute aktivasyon", how: ["Üstte kısa sıkıştır"], avoid: "Belden itme", warn: null, alts: [] },
          { name: "Side Plank Left", sets: "2 × 20sn", muscle: "Lateral core", how: ["Kısa, temiz set"], avoid: null, warn: null, alts: [] },
          { name: "Side Plank Right", sets: "2 × 20sn", muscle: "Lateral core", how: ["Kısa, temiz set"], avoid: null, warn: null, alts: [] },
          { name: "World Greatest Stretch", sets: "2 × 4 (her taraf)", muscle: "Mobilite", how: ["Yavaş uygulama"], avoid: null, warn: null, alts: [] },
          { name: "Chin Tuck", sets: "2 × 12", muscle: "Boyun stabilite", how: ["2 sn tut"], avoid: null, warn: null, alts: [] },
        ]},
      ],
    },
    {
      id: 7,
      title: "OFF 3",
      sub: "CUMA",
      focus: "Cumartesi Hazırlığı",
      duration: "~18 dk",
      color: "#6C757D",
      type: "offday",
      blocks: [
        { name: "🔋 HAZIRLIK — Cumartesi Öncesi", color: "#6C757D", exercises: [
          { name: "Hip Flexor Stretch", sets: "2 × 45sn (her taraf)", muscle: "Kalça ön hat", how: ["Pelvisi nötrle ve öne it"], avoid: "Belden kaçma", warn: null, alts: [] },
          { name: "Floor Bridge", sets: "3 × 15", muscle: "Glute aktivasyon", how: ["Kalçayı sık, kontrollü indir"], avoid: "Belden itme", warn: null, alts: [] },
          { name: "Prone External Rotation", sets: "2 × 15 (her taraf)", muscle: "Rotator cuff", how: ["Dirsek sabit, ön kol döner"], avoid: "Omuzla savurma", warn: "Band yoksa iyi prehab seçimi", alts: [] },
          { name: "Supine Hip Rotation", sets: "2 × 10 (her taraf)", muscle: "Kalça rotatorları", how: ["Dizleri kontrollü sağa-sola bırak"], avoid: "Kalçayı yerden kaldırma", warn: null, alts: [] },
          { name: "Cat and Cow", sets: "2 × 10", muscle: "Omurga hazırlığı", how: ["Nefesle uygula"], avoid: null, warn: null, alts: [] },
          { name: "Ankle Circle", sets: "2 × 10 (her yön)", muscle: "Ayak bileği mobilite", how: ["Yavaş ve tam daireler"], avoid: null, warn: null, alts: [] },
        ]},
      ],
    },
  ],
};
