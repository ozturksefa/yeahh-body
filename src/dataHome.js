export const PROGRAM_HOME = {
  meta: {
    name: "Ev Programı — Kontrollü Dayanıklılık",
    phase: "Faz 1 — Rehab Uyumlu Taban",
    weeks: "Hafta 1–8",
    description: "Öncelik dayanıklılık ve toparlanabilirlik. Denge, kontrol ve hız ikincil olarak korunur; handstand ve L-sit ise submaksimal skill pratiği olarak ilerler. Program; menisküs, rotator cuff, bel-boyun fıtığı ve postür kısıtlarına göre yeniden dengelendi.",
  },

  equipment: {
    mevcut: ["Masa/tezgah (inverted row)", "Sandalye", "Zemin", "Duvar"],
    önerilen: ["Kapı pull-up barı — uzun vadede pull gelişimini en çok açan ek parça"],
  },

  coachProfile: {
    title: "Denetleyici Profil",
    athlete: "Erkek · yeni baba · aktif yaşam tarzı",
    schedule: "Salı / Perşembe / Cumartesi / Pazar antrenman + 3 aktif off gün",
    priorities: [
      "1. Dayanıklılık",
      "2. Denge",
      "3. Kontrol",
      "4. Hız",
      "Paralel skill: Handstand + L-sit",
    ],
    constraints: [
      "Sağ diz menisküs: koşu, zıplama ve derin fleksiyon yükü kısıtlı",
      "Sağ omuz rotator cuff: overhead ve dip benzeri alt pozisyonlar kontrollü",
      "Bel ve boyun fıtığı: nötral omurga + nötral servikal şart",
      "Skolyoz + kifoz: lateral core ve skapula dengesi zorunlu",
    ],
  },

  controlCenter: {
    badges: [
      { label: "Aerobik", value: "~152 dk/hafta", tone: "good" },
      { label: "Push:Pull", value: "9:13 + skill izometrikleri", tone: "good" },
      { label: "Overhead", value: "2 ana + 2 hafif temas", tone: "warn" },
      { label: "Diz Yükü", value: "Zorunlu pistol yok", tone: "good" },
      { label: "Test", value: "Sadece H4 / H8", tone: "good" },
      { label: "Pazar Rolü", value: "Toparlanma + Zone 2", tone: "good" },
    ],
    rules: [
      "Ağrı antrenman sırasında 2/10'u geçerse ya da ertesi gün artarsa bir seviye regress et.",
      "Ana kuvvet setleri RPE 6-8 aralığında kalsın; failure yok, 2-3 tekrar rezerv bırak.",
      "Skill hold'lar maksimum değil; mevcut maksimum sürenin yaklaşık %60-80'i kadar tutulur.",
      "Gece uyku 6 saatin altındaysa veya bebek nedeniyle bölündüyse o gün toplam hacmi %20-30 azalt.",
      "Bel ya da boyun semptomu artarsa overhead, hinge ve uzun hollow varyasyonlarını o gün iptal et.",
    ],
    swaps: [
      { trigger: "Sağ omuz overhead ağrısı", action: "Wall Handstand Hold yerine sadece Pike Hold + Scapular Wall Slide yap." },
      { trigger: "Dizde sıkışma / şişlik", action: "Reverse Lunge veya Bulgarian yerine Wall Sit + Single Leg Glute Bridge kullan." },
      { trigger: "Bel hassas günü", action: "Tempo row'ları submax yap; hollow yerine Dead Bug ile bitir." },
      { trigger: "Boyunda yayılım / uyuşma", action: "Pike ve handstand'ı çıkar; yürüyüş + Chin Tuck + Wall Slide yap." },
    ],
  },

  periodization: [
    { week: 1, label: "Adaptasyon", sets_mod: 0.8, note: "RPE 6. Ağrısız ROM ve teknik öncelikli." },
    { week: 2, label: "Taban Hacim", sets_mod: 1.0, note: "Yazılan hacim. Skill setleri hâlâ submax." },
    { week: 3, label: "Taban +", sets_mod: 1.05, note: "Sadece iyi tolere edilen hareketlerde 1 set veya 2 tekrar ekle." },
    { week: 4, label: "Deload + Kontrol", sets_mod: 0.7, note: "Hacmi düşür; isterse kısa ara test uygula, max kovalamazsın." },
    { week: 5, label: "Yoğunluk", sets_mod: 1.0, note: "Tempo ve duraklamayla işi zorlaştır; failure yine yok." },
    { week: 6, label: "Yoğunluk +", sets_mod: 1.05, note: "Pull ve aerobic kaliteyi artır; diz ve omuz toleransı belirler." },
    { week: 7, label: "Konsolidasyon", sets_mod: 0.9, note: "En iyi tolere edilen varyasyonları sabitle; semptom takibi kritik." },
    { week: 8, label: "Retest + Deload", sets_mod: 0.65, note: "Sadece seçili ölçümler: yürüyüş, denge, submax skill, kolay max test." },
  ],

  phase2: {
    trigger: "Hafta 8 sonunda ağrısız tolerans korunursa:",
    milestones: {
      handstand: "Wall handstand 20-30 sn ağrısız ise serbest denemeye geç",
      lsit: "Chair tuck 15+ sn ve leg extension temizse full L-sit dene",
      push: "Incline ve diamond rahat ise kontrollü pike hacmini artır",
      squat: "Reverse lunge ve Bulgarian ağrısız ise destekli pistol quarter ROM ekle",
      pull: "Tempo row 12+ tekrar rahat ise daha yatay açıya geç veya kapı barı ekle",
    },
  },

  skillPaths: {
    handstand: {
      name: "Handstand Yolu",
      icon: "🙃",
      description: "Overhead toleransı bozmadan teknik ilerleme",
      steps: [
        { level: 1, name: "Pike Hold", target: "3 × 15-20sn", detail: "Omuz açısı ve skapula aktivasyonu" },
        { level: 2, name: "Wall Handstand Kick-up Prep", target: "3 × 3", detail: "Duvara kontrollü giriş" },
        { level: 3, name: "Wall Handstand Hold", target: "3 × 10sn", detail: "Submax, boyun nötral" },
        { level: 4, name: "Wall Handstand Hold", target: "3 × 20sn", detail: "Omuz ağrısızsa süre uzat" },
        { level: 5, name: "Wall Toe Pull", target: "3 × 5", detail: "Kısa denge ayrılmaları" },
        { level: 6, name: "Serbest Deneme", target: "6-8 kontrollü deneme", detail: "Kısa denemeler, yorgunken değil" },
        { level: 7, name: "Serbest Handstand", target: "10+ sn", detail: "Skill hedefi" },
      ],
    },
    lsit: {
      name: "L-sit Yolu",
      icon: "🪑",
      description: "Core basıncı ve kalça fleksör kontrolü",
      steps: [
        { level: 1, name: "Floor Tuck Hold", target: "4 × 8-10sn", detail: "Posterior tilt korunur" },
        { level: 2, name: "Chair Tuck Hold", target: "3 × 8-12sn", detail: "Omuzlar aşağı basılı" },
        { level: 3, name: "L-sit Leg Extension", target: "2 × 3-5", detail: "Tek bacak uzatma" },
        { level: 4, name: "Full L-sit", target: "3 × 5sn", detail: "Kısa ama temiz tekrar" },
        { level: 5, name: "Full L-sit", target: "3 × 10sn", detail: "Süreyi artır" },
        { level: 6, name: "Compression Lift", target: "3 × 6", detail: "Kalça kompresyonu" },
        { level: 7, name: "V-sit Deneme", target: "3 × kısa deneme", detail: "İleri seviye" },
      ],
    },
    push: {
      name: "Push Yolu",
      icon: "💪",
      description: "Omuz dostu itiş progresyonu",
      steps: [
        { level: 1, name: "Incline Push-up", target: "4 × 10", detail: "Kontrollü ve ağrısız ROM" },
        { level: 2, name: "Floor Push-up", target: "3 × 8-12", detail: "Gövde çizgisi korunur" },
        { level: 3, name: "Diamond Push-up", target: "2-3 × 8", detail: "Omuz rahat ise" },
        { level: 4, name: "Pike Push-up", target: "2 × 6-8", detail: "Kısa ROM, omuz toleransı ile" },
        { level: 5, name: "Tempo Pike Push-up", target: "3 × 5", detail: "3 sn iniş" },
        { level: 6, name: "Pseudo-Planche Prep", target: "2 × 6", detail: "Ağrısızsa" },
        { level: 7, name: "Pseudo-Planche Push-up", target: "3 × 6-8", detail: "İleri düzey" },
      ],
    },
    squat: {
      name: "Alt Vücut Yolu",
      icon: "🦵",
      description: "Menisküs dostu kuvvet ve kontrol",
      steps: [
        { level: 1, name: "Wall Sit", target: "3 × 20sn", detail: "Ağrısız açı bul" },
        { level: 2, name: "Reverse Lunge", target: "2 × 8", detail: "Kısa kontrollü adım" },
        { level: 3, name: "Bulgarian Split Squat", target: "2 × 8", detail: "ROM sınırlı, destekli" },
        { level: 4, name: "Assisted Pistol Quarter", target: "2 × 5", detail: "Sadece ağrısızsa" },
        { level: 5, name: "Assisted Pistol Half", target: "2 × 5", detail: "Destek şart" },
        { level: 6, name: "Supported Full Pistol", target: "2 × 3", detail: "Nadiren ve kontrollü" },
        { level: 7, name: "Full Pistol", target: "Opsiyonel", detail: "Birincil hedef değil" },
      ],
    },
    pull: {
      name: "Pull Yolu",
      icon: "🧲",
      description: "Postür ve omuz sağlığı için çekiş önceliği",
      steps: [
        { level: 1, name: "Scapular Row", target: "3 × 10", detail: "Skapula retraksiyon öğrenimi" },
        { level: 2, name: "Inverted Row Partial", target: "3 × 8", detail: "Açı kolay" },
        { level: 3, name: "Inverted Row", target: "3 × 8-10", detail: "Tam ROM" },
        { level: 4, name: "Tempo Inverted Row", target: "4 × 8", detail: "3 sn iniş + üstte durakla" },
        { level: 5, name: "Feet-Elevated Row", target: "3 × 6-8", detail: "Yataylığı artır" },
        { level: 6, name: "Negative Pull-up", target: "3 × 3", detail: "Kapı barı ile" },
        { level: 7, name: "Pull-up", target: "3 × 5", detail: "Uzun vadeli hedef" },
      ],
    },
  },

  days: [
    {
      id: 1,
      title: "GÜN 1",
      sub: "SALI",
      focus: "Handstand + Push Kontrol",
      duration: "~68 dk",
      color: "#C1121F",
      type: "training",
      injury: "⚠️ Omuzda overhead ağrı varsa handstand setlerini pike hold'a düşür. Dizde bugün derin tek bacak squat yok.",
      blocks: [
        { name: "🔥 ISINMA — Mobilite", color: "#CC5500", exercises: [
          { name: "Cat-Cow Mobilite", sets: "2 × 10", muscle: "Torasik + lumbar mobilite", how: ["Dört ayak pozisyonu al", "Nefesle cat ve cow arasında yavaş geç", "Servikali zorlamadan hareket et"], avoid: "Beli veya boynu uç pozisyona zorlama", warn: "BEL + BOYUN: Hareket açıklığı rahatlama amaçlı", alts: [] },
          { name: "Hip Circle", sets: "2 × 10 (her yön)", muscle: "Kalça mobilite", how: ["Ayakta kalçayla geniş daireler çiz", "Dizleri kilitlemeden yumuşak tut"], avoid: "Belden kompansasyon yapma", warn: "DİZ: Kalça hazırlığı diz stresini azaltır", alts: [] },
          { name: "Shoulder Cross Stretch", sets: "2 × 30sn (her taraf)", muscle: "Posterior omuz kapsülü", how: ["Kolu göğüs önünde sabitle", "Diğer elle hafifçe çek", "Nefesi tutma"], avoid: "Omzu kulağa yükseltme", warn: "ROTATOR CUFF: Anterior omuz yükünü azaltır", alts: [] },
        ]},
        { name: "🛡 SAKATLIK PROTOKOLÜ", color: "#7B241C", exercises: [
          { name: "External Rotation (Towel/Yerçekimi)", sets: "3 × 15 (her taraf)", muscle: "Rotator cuff", how: ["Dirsek gövdeye yakın sabit", "Yavaş kaldır, kısa bekle, yavaş indir"], avoid: "Omuzun öne kaçması", warn: "ROTATOR CUFF: Günün zorunlu aktivasyonu", alts: [] },
          { name: "Scapular Wall Slide", sets: "2 × 10", muscle: "Serratus + alt trapez", how: ["Bel ve sırtı duvara yakın tut", "W'den U'ya kaydır"], avoid: "Kaburgayı dışarı itme", warn: "KİFOZ + OMUZ: Skapula kontrolü için şart", alts: [] },
          { name: "Chin Tuck", sets: "3 × 12", muscle: "Derin boyun fleksörleri", how: ["Çeneyi geriye al", "2 sn tut", "Omuzları gevşek bırak"], avoid: "Başı aşağı eğme", warn: "BOYUN: Her gün zorunlu", alts: [] },
        ]},
        { name: "🙃 SKİLL — Handstand Teknik", color: "#8338EC", exercises: [
          { name: "Pike Hold", sets: "3 × 20sn", muscle: "Omuz stabilite + anterior core", how: ["Kalçayı yukarı kaldır", "Dirsekleri kilitlemeden aktif tut", "Omuzları yukarı it"], avoid: "Beli çökertme", warn: "Omuz iyi hissetmiyorsa bugün burada kal", alts: ["Downward Dog Hold"] },
          { name: "Wall Handstand Hold", sets: "3 × 10sn", muscle: "Overhead stabilite", how: ["Duvara kontrollü çık", "Kaburgayı içeri al", "Bakış eller arasında"], avoid: "Muz pozisyonu ve boyun hiperekstansiyonu", warn: "Submax çalış; failure yok", alts: ["Pike Hold"] },
        ]},
        { name: "⚖️ DENGE — Düşük Darbe", color: "#E76F51", exercises: [
          { name: "Tek Ayak Denge Hold", sets: "3 × 30sn (her bacak)", muscle: "Ayak bileği + diz propriyosepsiyonu", how: ["Ayak tabanını yere yay", "Kalçayı seviyede tut", "Gerekiyorsa duvara yakın başla"], avoid: "Dizin içe çökmesi", warn: "MENİSKÜS: Güvenli denge uyaranı", alts: [] },
        ]},
        { name: "💪 KUVVET — Push + Pull Denge", color: "#C1121F", exercises: [
          { name: "Incline Push-up", sets: "4 × 10", muscle: "Göğüs, triceps", how: ["Yüksekliği ağrısız ROM'a göre ayarla", "Dirsekleri 30-45° tut", "Yukarı çıkarken hız niyeti kullan"], avoid: "Omuzu alt pozisyonda sıkıştırma", warn: "ROTATOR CUFF: Bugünün ana itişi", alts: ["Wall Push-up"] },
          { name: "Diamond Push-up", sets: "2 × 8", muscle: "Triceps baskın itiş", how: ["Sadece ağrısızsa uygula", "Göğüs yere yaklaşırken kontrollü in"], avoid: "Dirsekleri yana kaçırma", warn: "Omuz rahatsızsa close-grip incline'e dön", alts: ["Incline Push-up"] },
          { name: "Inverted Row (Masa Altı)", sets: "3 × 8", muscle: "Sırt, rhomboid, biceps", how: ["Vücudu düz çizgide tut", "Göğsü masaya çek", "Üstte 1 sn sık"], avoid: "Boynu öne uzatma", warn: "Push hacmini dengelemek için zorunlu pull", alts: [] },
          { name: "Wall Sit", sets: "3 × 20sn", muscle: "Quad izometrik", how: ["Ağrısız diz açısı bul", "Ayakları biraz öne al", "Topukta baskı hissi ara"], avoid: "Derin çömelme", warn: "MENİSKÜS: Ağrısız açı kuralı", alts: ["Single Leg Glute Bridge"] },
          { name: "Single Leg Glute Bridge", sets: "3 × 12 (her bacak)", muscle: "Glute + hamstring", how: ["Kaburgayı aşağıda tut", "Kalçayı topukla it", "Üstte 1 sn sık"], avoid: "Belden itiş alma", warn: "BEL: Posterior chain'i güvenli besler", alts: [] },
        ]},
        { name: "🎯 CORE — Nötral Omurga", color: "#6C3483", exercises: [
          { name: "Dead Bug", sets: "3 × 10 (her taraf)", muscle: "Anterior core + anti-extension", how: ["Bel boşluğunu sabitle", "Karşı kol-bacağı yavaş uzat", "Nefesi kontrollü ver"], avoid: "Belin yerden kopması", warn: "BEL FITIĞI: Hollow'a göre daha güvenli ana core", alts: [] },
          { name: "Side Plank", sets: "2 × 30sn (her taraf)", muscle: "Oblique + lateral stabilite", how: ["Omuz dirsek üstünde", "Kalçayı yükselt", "Baş-boyun çizgisi nötral"], avoid: "Kalçanın geriye düşmesi", warn: "SKOLYOZ: Sağ-sol eşit süre", alts: [] },
        ]},
        { name: "⚡ KONDİSYON — Yürüyüş Interval", color: "#990000", exercises: [
          { name: "Hızlı Yürüyüş", sets: "30 dakika sürekli", muscle: "Aerobik kapasite", how: ["6 tur: 2 dk hızlı + 2 dk rahat", "Konuşabilme temposunu koru", "Koşuya dönme"], avoid: "Diz itişini agresif yapma", warn: "Hedef dayanıklılık: bugünün ana enerji sistemi işi", alts: [] },
        ]},
      ],
    },
    {
      id: 2,
      title: "GÜN 2",
      sub: "PERŞEMBE",
      focus: "L-sit + Pull Dominant",
      duration: "~72 dk",
      color: "#264653",
      type: "training",
      injury: "⚠️ Bel günün yorgunsa tempo row'ları submax bırak. Dizde baskı varsa reverse lunge yerine wall sit kullan.",
      blocks: [
        { name: "🔥 ISINMA — Mobilite", color: "#CC5500", exercises: [
          { name: "Cat-Cow Mobilite", sets: "2 × 10", muscle: "Omurga mobilite", how: ["Nefes eşliğinde yavaş hareket et"], avoid: "Hızlı ve uç ROM", warn: "Bel ve boyun rahatlatma", alts: [] },
          { name: "Hip Circle", sets: "2 × 10 (her yön)", muscle: "Kalça açıklığı", how: ["Kalçayı kontrollü döndür"], avoid: "Belden dönme", warn: "Lunge öncesi hazırlık", alts: [] },
          { name: "Wrist Rotation", sets: "2 × 30sn (her yön)", muscle: "Bilek hazırlığı", how: ["Her iki yöne rahat döndür"], avoid: "Ağrılı aralıkta zorlama", warn: "L-sit ve row tutuşu için", alts: [] },
        ]},
        { name: "🛡 SAKATLIK PROTOKOLÜ", color: "#7B241C", exercises: [
          { name: "External Rotation (Towel/Yerçekimi)", sets: "3 × 15 (her taraf)", muscle: "Rotator cuff", how: ["Yavaş eksantrik kullan"], avoid: "Omuz başını öne itme", warn: "Omuz güvenliği için şart", alts: [] },
          { name: "Scapular Wall Slide", sets: "2 × 10", muscle: "Serratus + trapez", how: ["Kaburgayı içeride tut"], avoid: "Belden kaçırma", warn: "Postür düzeltici", alts: [] },
          { name: "Chin Tuck", sets: "3 × 12", muscle: "Servikal stabilite", how: ["2 sn sabit tut"], avoid: "Boynu aşağı eğme", warn: "Boyun için zorunlu", alts: [] },
        ]},
        { name: "🪑 SKİLL — L-sit Teknik", color: "#2A9D8F", exercises: [
          { name: "Floor L-sit Tuck Hold", sets: "4 × 10sn", muscle: "Core + hip flexor", how: ["Posterior tilt koru", "Omuzları aşağı bas"], avoid: "Belin yuvarlanıp çökmesi", warn: "Submax; kalite bozulmadan bitir", alts: [] },
          { name: "Chair L-sit Tuck Hold", sets: "3 × 10sn", muscle: "Triceps + core basınç", how: ["Sandalyeleri sabitle", "Dizleri yakın tut", "Omuzları kulaktan uzaklaştır"], avoid: "Boynu sıkıştırma", warn: "Omuz baskısı artarsa zemin tuck'a dön", alts: ["Floor L-sit Tuck Hold"] },
          { name: "L-sit Leg Extension", sets: "2 × 3 (her bacak)", muscle: "Kompresyon kontrolü", how: ["Bir bacağı kısa süre uzat", "Gövde yüksekliğini koru"], avoid: "Kalçanın düşmesi", warn: "Skill kalitesi için az hacim", alts: [] },
        ]},
        { name: "⚖️ DENGE — Kontrol", color: "#E76F51", exercises: [
          { name: "Tek Ayak Denge Hold", sets: "3 × 20sn (her bacak)", muscle: "Denge sistemi", how: ["İlk 10 sn gözler açık", "Son 10 sn hafifçe zorlaştır"], avoid: "Dizin içe çökmesi", warn: "Bugün dengeyi yorgunluk öncesi çalış", alts: [] },
        ]},
        { name: "💪 KUVVET — Pull Öncelik", color: "#264653", exercises: [
          { name: "Tempo Inverted Row", sets: "4 × 8", muscle: "Sırt + skapula kontrolü", how: ["3 sn in", "Üstte 1 sn dur", "Çıkış kontrollü ama canlı"], avoid: "Kalçayı düşürme", warn: "Pull hacminin ana taşıyıcısı", alts: ["Inverted Row (Masa Altı)"] },
          { name: "Inverted Row (Masa Altı)", sets: "2 × 8", muscle: "Sırt, biceps", how: ["Daha rahat açıyla, temiz tekrar yap"], avoid: "Boynu öne çıkarma", warn: "Ek pull seti — push:pull dengeleme", alts: [] },
          { name: "Reverse Lunge (ağırlıksız)", sets: "2 × 8 (her bacak)", muscle: "Glute + quad", how: ["Kısa geri adım al", "Ön diz ağrısız çizgide kalsın", "İstersen duvardan destek al"], avoid: "Derin diz açısı", warn: "MENİSKÜS: Ağrısız ROM dışında zorlama yok", alts: ["Wall Sit"] },
          { name: "Hip Thrust (Sandalye)", sets: "3 × 15", muscle: "Glute max", how: ["Kaburgaları kapat", "Kalçayı sık, belden değil glute'dan it"], avoid: "Bel hiperextansiyonu", warn: "Bel dostu posterior chain", alts: [] },
        ]},
        { name: "🎯 CORE — Dayanıklılık Tabanı", color: "#6C3483", exercises: [
          { name: "Hollow Body Hold", sets: "2 × 15sn", muscle: "Anterior core", how: ["Sadece bel yerde kalabiliyorsa uygula", "Gerekirse tuck versiyonda kal"], avoid: "Belin yerden kalkması", warn: "Bel hassassa dead bug ile değiştir", alts: ["Dead Bug"] },
          { name: "Side Plank", sets: "2 × 30sn (her taraf)", muscle: "Lateral core", how: ["Baş-boyun nötral", "Kalça öne kaçmadan tut"], avoid: "Kalçanın düşmesi", warn: "Skolyoz dengesine hizmet eder", alts: [] },
        ]},
        { name: "⚡ KONDİSYON — Kısa Tempo", color: "#990000", exercises: [
          { name: "Hızlı Yürüyüş", sets: "12 dakika sürekli", muscle: "Aerobik + toparlanma", how: ["1 dk hızlı + 1 dk rahat × 6", "Nefes ritmini koru"], avoid: "Koşu temposuna geçme", warn: "Salı ve Cumartesiye göre daha kısa ama düzenli aerobik yük", alts: [] },
        ]},
      ],
    },
    {
      id: 3,
      title: "GÜN 3",
      sub: "CUMARTESİ",
      focus: "Full Body Hacim + Skill",
      duration: "~90 dk",
      color: "#9C6644",
      type: "training",
      injury: "⚠️ Bugün hacim günü. Omuz veya diz toleransı düşükse set azalt; Pazar yüklenme değil toparlanma günü olarak kalacak.",
      blocks: [
        { name: "🔥 ISINMA — Mobilite", color: "#CC5500", exercises: [
          { name: "Cat-Cow Mobilite", sets: "2 × 10", muscle: "Omurga mobilite", how: ["Nefesle birlikte uygula"], avoid: "Acele etme", warn: "Bel + boyun hazırlığı", alts: [] },
          { name: "Hip Circle", sets: "2 × 10 (her yön)", muscle: "Kalça mobilite", how: ["Kalçayı geniş dairelerle çevir"], avoid: "Belden dönme", warn: null, alts: [] },
          { name: "Shoulder Cross Stretch", sets: "2 × 30sn (her taraf)", muscle: "Posterior omuz", how: ["Yumuşak çekiş kullan"], avoid: "Omzu sıkıştırma", warn: "Omuz hacmi öncesi hazırlık", alts: [] },
          { name: "Wrist Rotation", sets: "2 × 30sn (her yön)", muscle: "Bilek hazırlığı", how: ["Her iki yöne kontrollü dön"], avoid: "Ağrılı aralık", warn: "Skill bloğu öncesi", alts: [] },
        ]},
        { name: "🛡 SAKATLIK PROTOKOLÜ", color: "#7B241C", exercises: [
          { name: "External Rotation (Towel/Yerçekimi)", sets: "3 × 15 (her taraf)", muscle: "Rotator cuff", how: ["Yavaş ve kontrollü tekrarlar"], avoid: "Omzu öne düşürme", warn: "Omuz toleransını korur", alts: [] },
          { name: "Scapular Wall Slide", sets: "2 × 10", muscle: "Skapula yukarı rotasyon", how: ["Bel boşluğunu büyütmeden kaydır"], avoid: "Kaburgayı açma", warn: "Kifoz için destek", alts: [] },
          { name: "Chin Tuck", sets: "3 × 12", muscle: "Derin boyun fleksörleri", how: ["Çeneyi geriye al, 2 sn tut"], avoid: "Başın aşağı düşmesi", warn: "Boyun için günün filtresi", alts: [] },
        ]},
        { name: "🤸 SKİLL — Handstand + L-sit", color: "#8338EC", exercises: [
          { name: "Wall Handstand Hold", sets: "3 × 10sn", muscle: "Overhead stabilite", how: ["Kısa, kaliteli setler yap", "Kaburga ve kalça çizgisini koru"], avoid: "Ağrılı zorlanma", warn: "Bugün de submax, max değil", alts: ["Pike Hold"] },
          { name: "Chair L-sit Tuck Hold", sets: "4 × 10sn", muscle: "Core + triceps", how: ["Her set temiz form", "Süre uğruna postürü bozma"], avoid: "Omuzların kulaklara yükselmesi", warn: "Skill hacmi ama failure yok", alts: ["Floor L-sit Tuck Hold"] },
          { name: "Pike Hold", sets: "2 × 20sn", muscle: "Omuz aktivasyonu", how: ["Omuzları aktif it"], avoid: "Bel çökmesi", warn: "Wall handstand yerine hafif tamamlayıcı", alts: [] },
        ]},
        { name: "⚖️ DENGE — Dinamik", color: "#E76F51", exercises: [
          { name: "Tek Ayak RDL (Denge Odaklı)", sets: "3 × 8 (her bacak)", muscle: "Glute med + hamstring + denge", how: ["Kalçadan kırıl", "Omurgayı uzun tut", "Destek için duvara yakın başlayabilirsin"], avoid: "Bel yuvarlama", warn: "Skolyoz ve menisküs için kontrollü unilateral kalite", alts: [] },
        ]},
        { name: "💪 KUVVET — Full Body Hacim", color: "#9C6644", exercises: [
          { name: "Inverted Row (Masa Altı)", sets: "4 × 10", muscle: "Sırt + biceps", how: ["Temiz tekrar, boyun nötral", "Üstte kısa dur"], avoid: "Bel sarkması", warn: "Haftanın ana pull hacmi", alts: [] },
          { name: "Incline Push-up", sets: "3 × 12", muscle: "Göğüs + triceps", how: ["Yukarı çıkışta canlı ol", "Aşağı iniş kontrollü"], avoid: "Omuz sıkışması", warn: "Push hacmi ama omuz dostu açı", alts: ["Wall Push-up"] },
          { name: "Bulgarian Split Squat (Sandalye)", sets: "2 × 8 (her bacak)", muscle: "Quad + glute", how: ["ROM'u kısa tut", "Gerekirse parmakla destek al", "Ön topuk baskın olsun"], avoid: "Derin diz fleksiyonu", warn: "MENİSKÜS: Haftanın tek split squat günü", alts: ["Reverse Lunge (ağırlıksız)"] },
          { name: "Hip Thrust (Sandalye)", sets: "3 × 15", muscle: "Glute max", how: ["Üstte 1-2 sn sık", "Kaburga kapalı"], avoid: "Belden itme", warn: "Posterior chain hacmi", alts: [] },
          { name: "Single Leg Glute Bridge", sets: "2 × 12 (her bacak)", muscle: "Glute + hamstring", how: ["Topuğu yere göm", "Pelvisi düz tut"], avoid: "Kalçanın dönmesi", warn: "Diz yükünü artırmadan unilateral destek", alts: [] },
        ]},
        { name: "🎯 CORE — Lateral + Anterior", color: "#6C3483", exercises: [
          { name: "Hollow Body Hold", sets: "2 × 20sn", muscle: "Anterior core", how: ["Gerekirse tuck versiyonda kal"], avoid: "Bel boşluğu büyümesi", warn: "Bel iyi hissetmiyorsa dead bug'a dön", alts: ["Dead Bug"] },
          { name: "Side Plank", sets: "3 × 30sn (her taraf)", muscle: "Oblique + lateral hat", how: ["Kalça ve omuz çizgisi sabit"], avoid: "Rotasyon kaçışı", warn: "Skolyoz dengesi için önemli", alts: [] },
          { name: "Copenhagen Plank (Sandalye)", sets: "2 × 15sn (her taraf)", muscle: "Adduktor + lateral core", how: ["Kısa kaldıraç kullan", "Pelvisi düz tut"], avoid: "Kasık ağrısı varsa zorlama", warn: "Kısa süreli ve kontrollü uygula", alts: ["Side Plank"] },
        ]},
        { name: "⚡ KONDİSYON — Uzun Zone 2", color: "#990000", exercises: [
          { name: "Hızlı Yürüyüş", sets: "35 dakika sürekli", muscle: "Aerobik baz", how: ["Konuşabildiğin tempoda kal", "Mümkünse hafif eğimli rota seç"], avoid: "Koşuya dönme", warn: "Haftanın en uzun dayanıklılık bloğu", alts: [] },
        ]},
        { name: "❄️ SOĞUMA — Rahatlatma", color: "#6C757D", exercises: [
          { name: "Shoulder Cross Stretch", sets: "2 × 30sn (her taraf)", muscle: "Posterior omuz", how: ["Yumuşak çekiş"], avoid: null, warn: "Omuz toparlanması", alts: [] },
          { name: "Hip Flexor Stretch", sets: "2 × 45sn (her taraf)", muscle: "Kalça ön hat", how: ["Pelvisi hafif posterior tilt'e getir"], avoid: "Belden kompansasyon", warn: null, alts: [] },
          { name: "Cat-Cow Mobilite", sets: "1 × 8", muscle: "Omurga rahatlatma", how: ["Akışkan bitiriş"], avoid: null, warn: "Bel ve boyunu rahatlat", alts: [] },
        ]},
      ],
    },
    {
      id: 4,
      title: "GÜN 4",
      sub: "PAZAR",
      focus: "Toparlanma + Zone 2 + Kontrol",
      duration: "~65 dk",
      color: "#2A9D8F",
      type: "training",
      injury: "⚠️ Bugün test değil, toparlanma ve kalite günü. Ağır row, ağır push ve derin diz yükü yok.",
      blocks: [
        { name: "🔥 ISINMA — Hafif Hazırlık", color: "#CC5500", exercises: [
          { name: "Cat-Cow Mobilite", sets: "2 × 8", muscle: "Omurga mobilite", how: ["Yumuşak ritim"], avoid: "Uç ROM", warn: null, alts: [] },
          { name: "Hip Circle", sets: "2 × 8 (her yön)", muscle: "Kalça hazırlığı", how: ["Küçük ve kontrollü daireler"], avoid: null, warn: null, alts: [] },
          { name: "Wrist Rotation", sets: "2 × 20sn (her yön)", muscle: "Bilek mobilite", how: ["Rahat aralıkta döndür"], avoid: null, warn: null, alts: [] },
        ]},
        { name: "🛡 SAKATLIK PROTOKOLÜ", color: "#7B241C", exercises: [
          { name: "External Rotation (Towel/Yerçekimi)", sets: "2 × 15 (her taraf)", muscle: "Rotator cuff", how: ["Bugün kolay tempo"], avoid: null, warn: "Aktif toparlanma tonu", alts: [] },
          { name: "Scapular Wall Slide", sets: "2 × 10", muscle: "Skapula kontrolü", how: ["W'den U'ya yavaş geç"], avoid: null, warn: null, alts: [] },
          { name: "Chin Tuck", sets: "2 × 12", muscle: "Boyun fleksörleri", how: ["2 sn tut"], avoid: null, warn: "Boyun için günlük bakım", alts: [] },
        ]},
        { name: "📊 TEKNİK KONTROL — Submax", color: "#8338EC", exercises: [
          { name: "Chair L-sit Tuck Hold", sets: "2 × 10sn", muscle: "Core + triceps", how: ["Temiz form, kısa süre"], avoid: "Failure'a gitme", warn: "Pazar artık test günü değil", alts: ["Floor L-sit Tuck Hold"] },
          { name: "Single Leg Balance Reach (Y-Balance)", sets: "2 × 5 yön (her bacak)", muscle: "Denge + kalça kontrolü", how: ["Her uzanışta kontrolü koru", "Sağ-sol farkı gözle"], avoid: "Dizin içe çökmesi", warn: "Hazırlık seviyesi kontrol metriği", alts: ["Tek Ayak Denge Hold"] },
        ]},
        { name: "💪 KUVVET — Hafif Destek", color: "#2A9D8F", exercises: [
          { name: "Wall Sit", sets: "2 × 20sn", muscle: "Quad izometrik", how: ["Ağrısız açı seç"], avoid: "Derin çömelme", warn: "Diz durumu kötü ise süreyi azalt", alts: [] },
          { name: "Hip Thrust (Sandalye)", sets: "3 × 15", muscle: "Glute max", how: ["Kalçadan it, belden değil"], avoid: "Bel hiperextansiyonu", warn: "Toparlanma dostu posterior chain", alts: [] },
          { name: "Single Leg Glute Bridge", sets: "2 × 12 (her bacak)", muscle: "Glute + hamstring", how: ["Pelvisi düz tut"], avoid: "Bel rotasyonu", warn: null, alts: [] },
        ]},
        { name: "🎯 CORE — Kapanış", color: "#6C3483", exercises: [
          { name: "Dead Bug", sets: "2 × 10 (her taraf)", muscle: "Anterior core", how: ["Bel sabit"], avoid: "Bel boşluğu artışı", warn: null, alts: [] },
          { name: "Side Plank", sets: "2 × 30sn (her taraf)", muscle: "Lateral core", how: ["Kalça çizgisini koru"], avoid: "Kalça düşüşü", warn: null, alts: [] },
        ]},
        { name: "⚡ KONDİSYON — Zone 2", color: "#990000", exercises: [
          { name: "Hızlı Yürüyüş", sets: "40 dakika sürekli", muscle: "Aerobik toparlanma tabanı", how: ["RPE 5-6 civarı kal", "Konuşma rahatlığı sürsün"], avoid: "Yürüyüşü tempo yarışına çevirme", warn: "Cumartesi hacminden sonraki toparlanma bloğu", alts: [] },
        ]},
        { name: "❄️ SOĞUMA — Hafif", color: "#6C757D", exercises: [
          { name: "Shoulder Cross Stretch", sets: "2 × 30sn (her taraf)", muscle: "Posterior omuz", how: ["Rahatlatıcı tut"], avoid: null, warn: null, alts: [] },
          { name: "Hip Flexor Stretch", sets: "2 × 45sn (her taraf)", muscle: "Kalça önü", how: ["Nefesle gevşe"], avoid: null, warn: null, alts: [] },
          { name: "Cat-Cow Mobilite", sets: "1 × 8", muscle: "Omurga rahatlatma", how: ["Akışkan bitiriş"], avoid: null, warn: null, alts: [] },
        ]},
      ],
    },
    {
      id: 5,
      title: "OFF 1",
      sub: "PAZARTESİ",
      focus: "Mobilite + Hafif Handstand Teması",
      duration: "~18 dk",
      color: "#6C757D",
      type: "offday",
      injury: "⚠️ Off gün hedefi sinir sistemi tazelemek; yüklenmek değil.",
      blocks: [
        { name: "🌿 MOBİLİTE + BOYUN", color: "#6C757D", exercises: [
          { name: "Cat-Cow Mobilite", sets: "2 × 10", muscle: "Omurga mobilite", how: ["Nefesle uygula"], avoid: null, warn: "Bel + boyun rahatlatma", alts: [] },
          { name: "Wrist Rotation", sets: "2 × 30sn (her yön)", muscle: "Bilek hazırlığı", how: ["Yavaş döndür"], avoid: null, warn: "Handstand öncesi kısa hazırlık", alts: [] },
          { name: "Chin Tuck", sets: "2 × 12", muscle: "Boyun fleksörleri", how: ["2 sn tut"], avoid: null, warn: "Her gün kısa doz", alts: [] },
        ]},
        { name: "🙃 HANDSTAND PRATİK — Hafif", color: "#8338EC", exercises: [
          { name: "Pike Hold", sets: "3 × 15sn", muscle: "Omuz aktivasyon + core", how: ["Sadece hafif temas", "Omuzları aktif tut"], avoid: "Omuz ağrısında zorlama", warn: "Bugün wall handstand yok; hafif teknik günü", alts: [] },
        ]},
      ],
    },
    {
      id: 6,
      title: "OFF 2",
      sub: "ÇARŞAMBA",
      focus: "L-sit Pratik + Yürüyüş",
      duration: "~25 dk",
      color: "#6C757D",
      type: "offday",
      blocks: [
        { name: "🛡 SAKATLIK PROTOKOLÜ", color: "#7B241C", exercises: [
          { name: "Chin Tuck", sets: "3 × 12", muscle: "Boyun fleksörleri", how: ["Yavaş ve kısa bekleme"], avoid: null, warn: "Boyun bakım dozu", alts: [] },
          { name: "Scapular Wall Slide", sets: "2 × 10", muscle: "Skapula + postür", how: ["W'den U'ya yavaş geç"], avoid: null, warn: "Kifoz ve omuz için günlük destek", alts: [] },
        ]},
        { name: "🪑 L-SİT PRATİK — Hafif", color: "#2A9D8F", exercises: [
          { name: "Floor L-sit Tuck Hold", sets: "4 × 8sn", muscle: "Core + hip flexor", how: ["Her set temiz kalsın"], avoid: "Failure", warn: "Pratik, antrenman değil", alts: [] },
          { name: "Chair L-sit Tuck Hold", sets: "3 × 8sn", muscle: "Support basıncı", how: ["Sandalyeleri sabitle", "Omuzları aşağı çek"], avoid: "Omuz sıkışması", warn: "Tolerans varsa uygula", alts: ["Floor L-sit Tuck Hold"] },
        ]},
        { name: "🚶 YÜRÜYÜŞ", color: "#6C757D", exercises: [
          { name: "Hızlı Yürüyüş", sets: "20 dakika sürekli", muscle: "Aktif toparlanma", how: ["Hafif terleme temposu", "Nefes rahat olsun"], avoid: "Koşma", warn: "Aerobik bazın küçük katkısı", alts: [] },
        ]},
      ],
    },
    {
      id: 7,
      title: "OFF 3",
      sub: "CUMA",
      focus: "Mobilite + Cumartesi Hazırlığı",
      duration: "~18 dk",
      color: "#6C757D",
      type: "offday",
      blocks: [
        { name: "🙃 HANDSTAND HAZIRLIK — Hafif", color: "#8338EC", exercises: [
          { name: "Wrist Rotation", sets: "2 × 30sn (her yön)", muscle: "Bilek hazırlığı", how: ["Rahat aralıkta uygula"], avoid: null, warn: null, alts: [] },
          { name: "Pike Hold", sets: "3 × 15sn", muscle: "Omuz aktivasyon", how: ["Cumartesi öncesi hafif temas"], avoid: "Ağrıda zorlama", warn: "Overhead yerine düşük stresli hazırlık", alts: [] },
        ]},
        { name: "🔋 MOBİLİTE", color: "#6C757D", exercises: [
          { name: "Shoulder Cross Stretch", sets: "2 × 30sn (her taraf)", muscle: "Posterior omuz", how: ["Hafif çekiş"], avoid: null, warn: null, alts: [] },
          { name: "Hip Circle", sets: "2 × 10 (her yön)", muscle: "Kalça mobilite", how: ["Geniş daireler"], avoid: null, warn: null, alts: [] },
          { name: "Cat-Cow Mobilite", sets: "2 × 10", muscle: "Omurga hazırlığı", how: ["Nefesle ak"], avoid: null, warn: "Bel + boyun rahatlatma", alts: [] },
        ]},
        { name: "🚶 DAYANIKLILIK — Hafif Baz", color: "#2A9D8F", exercises: [
          { name: "Hızlı Yürüyüş", sets: "15 dakika sürekli", muscle: "Aerobik bakım", how: ["Kolay tempo", "Cumartesiye taze kal"], avoid: "Tempolu yarışa çevirme", warn: "Hazırlık yürüyüşü", alts: [] },
        ]},
      ],
    },
  ],
};
