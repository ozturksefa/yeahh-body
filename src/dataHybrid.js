const ex = (name, sets, muscle, how, options = {}) => ({
  name,
  sets,
  muscle,
  how,
  avoid: options.avoid || null,
  warn: options.warn || null,
  alts: options.alts || [],
  alt_reasons: options.alt_reasons || [],
});

const block = (name, color, exercises) => ({ name, color, exercises });

const offdayCooldownBlock = () => block("🧊 SOĞUMA — Hafif Kapat", "#264653", [
  ex("Child's Pose", "2 × 20sn", "Nefes + torasik rahatlama", ["Burundan nefes al", "Omuzları gevşet", "Karnı yumuşat"], { warn: "Amaç nabzı düşürüp sistemi sakin kapatmak" }),
  ex("Doorway Chest Stretch", "2 × 20sn", "Göğüs önü", ["Kaburgayı dışarı itme", "Nefesi uzat", "Omuzu sıkıştırma"]),
]);

const upperCooldownBlock = () => block("🧊 SOĞUMA — Üst Gövde Boşalt", "#264653", [
  ex("Child's Pose", "2 × 20sn", "Nefes + sırt rahatlama", ["Burundan nefes al", "Kolları uzatırken boynu gevşet"]),
  ex("Doorway Chest Stretch", "2 × 20sn", "Göğüs önü", ["Göğüs önünü nazikçe aç", "Kaburgayı dışarı itme"]),
  ex("Shoulder Cross Stretch", "2 × 20sn", "Arka omuz", ["Omuzu kulağa çekme", "Gerilimi boyna taşıma"]),
]);

const lowerCooldownBlock = () => block("🧊 SOĞUMA — Alt Gövde Boşalt", "#264653", [
  ex("90/90 Hip Stretch", "2 × 20sn (her taraf)", "Kalça kapsülü", ["Gövdeden yüklenme", "Ağrısız aralıkta kal", "Nefesi uzat"]),
  ex("Supine Hamstring Stretch", "2 × 20sn (her taraf)", "Arka bacak", ["Dizi hafif yumuşak tut", "Çekişi agresif yapma"]),
  ex("Child's Pose", "2 × 20sn", "Bel + nefes", ["Belini bırak", "Omuzları yumuşat"]),
]);

const volumeCooldownBlock = () => block("🧊 SOĞUMA — Hacim Günü Kapat", "#264653", [
  ex("Child's Pose", "2 × 20sn", "Nefes + torasik rahatlama", ["Nefesi uzat", "Omuz ve bel hattını gevşet"]),
  ex("Doorway Chest Stretch", "2 × 20sn", "Göğüs önü", ["Press sonrası göğüs önünü aç", "Omuzu sıkıştırma"]),
  ex("Supine Hamstring Stretch", "2 × 20sn (her taraf)", "Arka bacak", ["Posterior chain'i rahatlat", "Nefesi uzat"]),
]);

const recoveryCooldownBlock = () => block("🧊 SOĞUMA — Recovery Kapat", "#264653", [
  ex("Child's Pose", "2 × 20sn", "Nefes + sistem sakinleşmesi", ["Burundan nefes al", "Seansı sakin bitir"]),
  ex("90/90 Hip Stretch", "2 × 20sn (her taraf)", "Kalça rahatlatma", ["Nazik açıl", "Ağrısız aralıkta kal"]),
  ex("Doorway Chest Stretch", "2 × 20sn", "Göğüs önü", ["Uzun nefesle gevşe"]),
]);

const recoveryWarmupBlock = () => block("🔥 ISINMA — Hafif Hazırlık", "#CC5500", [
  ex("Cat-Cow Mobilite", "2 × 6-8", "Omurga hazırlık", ["Acele etme", "Nefesle ak"]),
  ex("Hip Circle", "2 × 8-10", "Kalça hazırlık", ["Belden değil kalçadan dön"]),
  ex("Shoulder Cross Stretch", "2 × 15-20sn", "Omuz hazırlık", ["Omuzu kulağa çekme"]),
]);

const careBlockHome = () => block("🛡 BAKIM — Omuz & Boyun", "#7B241C", [
  ex("External Rotation (Towel/Yerçekimi)", "2 × 15", "Rotator cuff", ["Tempo yavaş", "Omuz başını öne kaçırma"]),
  ex("Scapular Wall Slide", "2 × 10", "Skapula kontrolü", ["Kaburgayı içerde tut"]),
  ex("Chin Tuck", "2 × 12", "Boyun stabilite", ["Boynu nötrle", "2 sn tut"]),
]);

const careBlockGym = () => block("🛡 BAKIM — Omuz & Boyun", "#7B241C", [
  ex("Band External Rotation", "2 × 15", "Rotator cuff", ["Dirseği sabit tut", "Yavaş aç-kapat"]),
  ex("Scapular Wall Slide", "2 × 10", "Skapula kontrolü", ["Kaburgayı dışarı kaçırma", "Yavaş tempo"]),
  ex("Chin Tuck", "2 × 12", "Boyun stabilite", ["2 sn tut", "Boynu nötral hisset"]),
]);

export const PROGRAM_HYBRID = {
  meta: {
    name: "Hibrit Performans Sistemi",
    phase: "Faz 1 — Dayanıklılık Tabanı + Güvenli Relatif Kuvvet",
    weeks: "Hafta 1–8",
    description: "Tek haftalık omurga, iki uygulama yolu. Aynı günün amacı korunur; o gün Ev veya Macfit seçilerek aynı sistemi farklı ekipmanla uygularsın.",
  },

  coachProfile: {
    title: "Hibrit Denetim Profili",
    athlete: "Erkek · yeni baba · kontrollü alt-orta seviye sporcu",
    schedule: "4 ana gün + 3 aktif off gün · Ev ve Macfit paralel kullanılabilir",
    priorities: [
      "1. Dayanıklılık / iş kapasitesi",
      "2. Relatif kuvvet",
      "3. Kontrol + denge",
      "4. Postür + core stabilite",
      "İkincil skill: Handstand + L-sit",
    ],
    constraints: [
      "Menisküs: koşu, zıplama ve derin diz fleksiyon yükü kısıtlı",
      "Rotator cuff: dip ve agresif overhead yüklenme kısıtlı",
      "Bel-boyun fıtığı: nötral omurga ve servikal nötral şart",
      "Skolyoz + kifoz: çekiş, skapula kontrolü ve lateral core öncelikli",
    ],
  },

  controlCenter: {
    badges: [
      { label: "Aerobik Hedef", value: "150–210 dk/hafta", tone: "good" },
      { label: "Kuvvet Günleri", value: "4 ana gün", tone: "good" },
      { label: "Skill Dozu", value: "2–3 hafif temas", tone: "warn" },
      { label: "Diz Politikası", value: "Derin fleksiyon yok", tone: "good" },
      { label: "Omuz Politikası", value: "Dip yok, overhead şartlı", tone: "warn" },
      { label: "Pazar Rolü", value: "Recovery + Zone 2", tone: "good" },
    ],
    rules: [
      "Ana kuvvet setleri RPE 6-8 aralığında kalır; failure yok.",
      "Ağrı 2/10'u geçerse aynı paterni daha kolay varyasyona çevir.",
      "Uyku kötü ve enerji düşükse her ana bloktan 1 set çıkar.",
      "Skill setleri submax yapılır; maksimum süre kovalanmaz.",
      "Koşu, zıplama, dip, ağır swing ve agresif rollout bu fazda yok.",
    ],
    swaps: [
      { trigger: "Omuz 3/10 üstü", action: "Overhead ve handstand'ı çıkar; row + floor press / incline push-up ile kal." },
      { trigger: "Diz 3/10 üstü", action: "Lunge/step-up yerine wall sit veya kısa ROM leg press + glute dominanta dön." },
      { trigger: "Bel-boyun 3/10 üstü", action: "Hinge ve overhead dozunu düşür; dead bug, side plank ve yürüyüşü koru." },
      { trigger: "Enerji düşük + uyku kötü", action: "O gün home versiyonu seçmek gym versiyonundan daha mantıklı olabilir." },
    ],
  },

  movementMap: [
    { pattern: "Ana çekiş", gym: "Chest Supported Row / Lat Pulldown", home: "Inverted Row / Tempo Inverted Row / Towel Row", note: "Postür ve omuz sağlığının ana taşıyıcısı; masa güvenli değilse towel row veya prone upper-back fallback kullan" },
    { pattern: "Ana itiş", gym: "Floor Press / Neutral Machine Press", home: "Incline Push-up", note: "Omuz dostu press hattı" },
    { pattern: "Posterior chain", gym: "Hip Thrust", home: "Hip Thrust (Sandalye) / Single Leg Glute Bridge", note: "Bel ve diz için güvenli kuvvet tabanı" },
    { pattern: "Diz dostu quad", gym: "Leg Press kısa ROM / Low Step-up", home: "Wall Sit / Reverse Lunge kısa ROM", note: "Menisküs toleransı belirler" },
    { pattern: "Alt bacak desteği", gym: "Standing Calf Raise / Wall Tibialis Raise", home: "Standing Calf Raise / Wall Tibialis Raise", note: "Yürüyüş, incline walk ve diz-ayak bileği dayanıklılığını destekler" },
    { pattern: "Core stabilite", gym: "Pallof Press / Side Plank", home: "Dead Bug / Side Plank / Bird Dog", note: "Bel-boyun güvenliği için ana blok" },
    { pattern: "Kondisyon", gym: "Bike / Rower / Incline Walk", home: "Hızlı Yürüyüş", note: "Koşu ve zıplama yerine düşük darbeli kapasite işi" },
  ],

  periodization: [
    { week: 1, label: "Kurulum", sets_mod: 0.9, note: "Form, ağrısız ROM ve tempo kontrolü. Baseline ölçüm al (evaluationBenchmarks)." },
    { week: 2, label: "Taban", sets_mod: 1.0, note: "Yazılı hacim. Ana setler RPE 6-7." },
    { week: 3, label: "Taban +", sets_mod: 1.05, note: "Sadece iyi tolere edilen ana hareketlere 1-2 tekrar ekle." },
    { week: 4, label: "Teknik Kontrol", sets_mod: 1.0, note: "Yük sabit. Tempo ve ROM kalitesine odaklan — 3-sn negatif, 1-sn pause gibi tempo notlarını gerçekten uygula." },
    { week: 5, label: "Deload", sets_mod: 0.75, note: "Setleri %25 düşür; aerobik süreyi de %20 kısalt (sistem sakinleşsin). Tam dinlenme değil — küçük doz." },
    { week: 6, label: "Yük Girişi", sets_mod: 1.025, note: "Ana hareketlerde küçük yük artışı (2.5-5 kg) veya +1 rep. Tempo sabit kalır." },
    { week: 7, label: "Yoğunluk +", sets_mod: 1.05, note: "RPE 7-8 bandı; hâlâ failure yok. Yük ve hacim birlikte küçük artar." },
    { week: 8, label: "Değerlendirme", sets_mod: 0.9, note: "Max test değil; evaluationBenchmarks metriklerini baseline ile kıyasla. Aynı formda daha iyi tekrar/süre arıyoruz." },
  ],

  evaluationBenchmarks: {
    title: "8 Hafta Değerlendirme Protokolü",
    whenToMeasure: "Hafta 1 Pazartesi (baseline) ve Hafta 8 Pazartesi (final). Aynı günün aynı saatinde, aynı koşullarda.",
    instructions: [
      "Amaç max test değil — 'aynı koşulda daha iyi performans var mı?' sorusu.",
      "Isınma + bakım bloğu normal yapılır, sonra her metriğe tek seferlik ölçüm.",
      "Ağrı 2/10 üstüyse metriği atla; o gün ölçemediğini not düş.",
      "Sonuçları haftada 1x (her pazar) yaz; Hafta 8'de baseline ile kıyasla.",
    ],
    metrics: [
      { id: "pike_hold", name: "Pike Hold Max", unit: "saniye", target: "Baseline + %25", how: "Omuz üzerinde max temiz hold süresi. Form bozulduğu anda bitir." },
      { id: "wall_handstand", name: "Wall Handstand Hold", unit: "saniye", target: "10-15 sn temiz", how: "Duvarda nötral omurga, bakış eller arasında; kaburga açılırsa bitir." },
      { id: "lsit_tuck", name: "L-sit Tuck Hold", unit: "saniye", target: "12-15 sn temiz", how: "Omuzlar aşağıda, tuck pozisyonunda support; kalça düşerse bitir." },
      { id: "row_reps", name: "Inverted Row (ev) / Assisted Pull-up (gym)", unit: "tekrar", target: "4×10 temiz (tempo 2-1-2)", how: "Üstte 1-sn sık, 2-sn indir. Form bozulursa set biter." },
      { id: "hip_thrust_load", name: "Hip Thrust 10-rep çalışma yükü", unit: "kg", target: "Baseline + %15-20", how: "Son 2 tekrar RPE 7-8 olmalı; 10 temiz reps için bulduğun yük." },
      { id: "zone2_hr", name: "30 dk Zone 2 sonrası nabız", unit: "bpm", target: "Baseline - 5-8 bpm", how: "Standart Zone 2 tempoda 30 dk yürü/bisiklet/rower; sonunda 1 dk içinde nabzı ölç." },
      { id: "resting_hr", name: "Sabah istirahat nabzı", unit: "bpm", target: "Baseline - 5-8 bpm", how: "Uyanır uyanmaz, yataktan kalkmadan 60-sn sayım." },
      { id: "pain_max", name: "Haftalık max ağrı skoru", unit: "0-10", target: "Baseline - 2 puan", how: "O haftanın en yüksek omuz/diz/bel/boyun ağrısı. Haftalık özet." },
    ],
  },

  skillPaths: {
    handstand: {
      name: "Handstand Hattı",
      frequency: "Haftada 2 ana + 1 hafif temas",
      caution: "Omuz veya boyun 3/5 üstüyse bir alt seviyede kal veya skill'i atla.",
      steps: [
        { level: 1, name: "Pike Hold", target: "3 × 15sn", metric: "seconds", goalValue: 15, detail: "Omuz aktivasyonu ve kaburga kontrolü" },
        { level: 2, name: "Pike Hold + Shoulder Shift", target: "3 × 20sn", metric: "seconds", goalValue: 20, detail: "Tek tarafa yük transferine hazırlık" },
        { level: 3, name: "Wall Handstand Hold", target: "2 × 8-10sn", metric: "seconds", goalValue: 8, detail: "Submax ve boyun nötral" },
        { level: 4, name: "Wall Handstand Hold", target: "3 × 12-15sn", metric: "seconds", goalValue: 12, detail: "Ağrısızsa süreyi uzat" },
      ],
      successRule: "3 başarılı temas + semptom 2/5 altında + hedef süreye yakın performans",
      weeklyGoal: "2 kaliteli temas günü",
      trackedDays: ["SALI", "CUMARTESİ", "PAZARTESİ"],
    },
    lsit: {
      name: "L-sit / Support Hattı",
      frequency: "Haftada 2 ana + 1 hafif temas",
      caution: "Omuz veya bilek support basıncını tolere etmiyorsa zemin tuck'a dön.",
      steps: [
        { level: 1, name: "Tuck Support", target: "3 × 8sn", metric: "seconds", goalValue: 8, detail: "Omuz depresyonu ve support kontrolü" },
        { level: 2, name: "L-sit Tuck Hold", target: "3 × 10sn", metric: "seconds", goalValue: 10, detail: "Posterior tilt ve diz yakınlığı" },
        { level: 3, name: "L-sit Tuck Hold", target: "3 × 12-15sn", metric: "seconds", goalValue: 12, detail: "Süreyi kalite bozulmadan uzat" },
        { level: 4, name: "L-sit Tek Bacak Açılım", target: "3 × 3-5 tekrar", metric: "reps", goalValue: 3, detail: "Ağrısızsa kademeli açılım" },
      ],
      successRule: "3 başarılı temas + support pozisyonunda ağrı olmaması + hedef sürede temiz kontrol",
      weeklyGoal: "2 kaliteli temas günü",
      trackedDays: ["PERŞEMBE", "CUMARTESİ", "ÇARŞAMBA"],
    },
  },

  days: [
    {
      id: 1,
      sub: "PAZARTESİ",
      focus: "Aktif Recovery + Hazırlık",
      type: "offday",
      color: "#2A9D8F",
      intent: "Haftaya yüklenerek değil, eklemleri hazırlayarak girersin.",
      variants: {
        home: {
          duration: "~25 dk",
          aerobicMinutes: 20,
          modeNote: "Ev modu bugün yeterli; amaç hazırlık ve rahatlama.",
          injury: "⚠️ Bugün antrenman yok; omuz-boyun hazırlığı ve hafif yürüyüş var.",
          blocks: [
            recoveryWarmupBlock(),
            block("🛡 BAKIM — Boyun & Skapula", "#2A9D8F", [
              ex("Chin Tuck", "2 × 12", "Boyun stabilite", ["Çeneyi hafif geri al", "Boynu aşağı bükme", "2 sn tut"], { warn: "Servikal nötral hissi ara" }),
              ex("Scapular Wall Slide", "2 × 10", "Skapula kontrolü", ["Kaburgayı kapalı tut", "Yavaş yukarı kay", "Omuzu kulağa sıkıştırma"]),
              ex("Wrist Rotation", "2 × 30sn", "Bilek hazırlığı", ["Küçük dairelerle başla", "Ağrılı yönü zorlamadan aç"]),
              ex("Standing Calf Raise", "2 × 15-20", "Alt bacak", ["Üstte kısa dur", "Topukları kontrollü indir"], { warn: "Yürüyüş ve genel alt bacak dayanıklılığına destek" }),
              ex("Wall Tibialis Raise", "2 × 12-15", "Tibialis anterior", ["Duvara yaslan", "Parmak uçlarını yukarı çek", "Hareketi sekmeden bitir"], { warn: "Diz ve ayak bileği hattını destekler" }),
            ]),
            block("🤸 HAFİF SKILL + GRIP", "#5B2C6F", [
              ex("Pike Hold", "2 × 15sn", "Omuz aktivasyon", ["Omuzları aktif it", "Beli çökertme", "Sadece hafif temas ver"], { alts: ["Downward Dog Hold"] }),
              ex("Dead Hang (Şartlı)", "2 × 10-15sn", "Grip + omuz dekompresyon", ["Barı nötral tut", "Omuzları aktif çek", "Sadece ağrısızsa"], { avoid: "Sarkma veya kipping", warn: "Şartlı hareket: omuz 3/10 üstüyse atla", alts: ["Scapular Pull (Duvar Barda)"], alt_reasons: ["Bar yoksa scapular pull ile skapula kontrolünü koru"] }),
            ]),
            block("🚶 KONDİSYON", "#990000", [
              ex("Hızlı Yürüyüş", "20 dakika sürekli", "Aktif toparlanma", ["RPE 4-5 bandında kal", "Nefesi toparlayıcı tempoda tut"], { warn: "Amaç yormak değil açılmak" }),
            ]),
            offdayCooldownBlock(),
          ],
        },
        gym: {
          duration: "~30 dk",
          aerobicMinutes: 20,
          modeNote: "Macfit'teysen yürüyüş yerine bike veya incline walk kullanabilirsin.",
          injury: "⚠️ Bugün salonda da yüklenme yok; toparlanma odaklı kal.",
          blocks: [
            recoveryWarmupBlock(),
            block("🛡 BAKIM — Boyun & Skapula", "#2A9D8F", [
              ex("Band External Rotation", "2 × 15", "Rotator cuff", ["Dirseği sabit tut", "Yavaş aç-kapat"], { warn: "Isıtma değil bakım dozu" }),
              ex("Scapular Wall Slide", "2 × 10", "Skapula kontrolü", ["Kaburga dışarı kaçmasın", "Yavaş tempo"]),
              ex("Chin Tuck", "2 × 12", "Boyun stabilite", ["2 sn tut", "Boynu nötral hisset"]),
              ex("Standing Calf Raise", "2 × 15-20", "Alt bacak", ["Üstte kısa dur", "Topukları kontrollü indir"], { warn: "Yürüyüş ve incline work kapasitesine destek" }),
              ex("Wall Tibialis Raise", "2 × 12-15", "Tibialis anterior", ["Duvara yaslan", "Parmak uçlarını yukarı çek"], { warn: "Alt bacak dengesini destekler" }),
            ]),
            block("🤸 HAFİF SKILL + GRIP", "#5B2C6F", [
              ex("Pike Hold", "2 × 15sn", "Omuz aktivasyon", ["Omuzları aktif it", "Beli çökertme", "Kısa temiz temas"], { alts: ["Downward Dog Hold"] }),
              ex("Dead Hang", "2 × 10-15sn", "Grip + omuz dekompresyon", ["Barı nötral tut", "Omuzları aktif çek", "Pasif sallanma yok"], { avoid: "Kipping", warn: "Şartlı: omuz 3/10 üstüyse atla", alts: ["Assisted Dead Hang (ayakla destek)"], alt_reasons: ["Full hang omuzda baskı yapıyorsa ayakla yükü hafiflet"] }),
            ]),
            block("🚴 KONDİSYON", "#990000", [
              ex("Stationary Bike", "20 dakika sürekli", "Aktif toparlanma", ["RPE 4-5", "Kalça-diz hattını rahat tut"], { alts: ["Incline Walk"], alt_reasons: ["Diz bike üzerinde hoşlanmıyorsa yürüyüşe dön"] }),
            ]),
            offdayCooldownBlock(),
          ],
        },
      },
    },
    {
      id: 2,
      sub: "SALI",
      focus: "Pull + Press Foundation",
      type: "training",
      color: "#D41920",
      intent: "Haftanın en taze gününde çekiş-itiş dengesi kurulur; kısa interval kondisyonla bitirilir.",
      variants: {
        home: {
          duration: "~72 dk",
          aerobicMinutes: 28,
          modeNote: "Vakit kısıtlıysa veya semptom yüksekse home yolu daha güvenli seçenek.",
          injury: "⚠️ Omuz ağrılıysa handstand'ı çıkar, sadece pike + row + incline push-up ile kal.",
          blocks: [
            block("🔥 ISINMA — Hazırlık", "#CC5500", [
              ex("Cat-Cow Mobilite", "2 × 8", "Omurga mobilite", ["Ritmik ilerle", "Bel-boynu zorlamadan akıt"]),
              ex("Hip Circle", "2 × 10", "Kalça mobilite", ["Belden değil kalçadan dön"]),
              ex("Shoulder Cross Stretch", "2 × 20sn", "Omuz hazırlığı", ["Omuzu kulağa çekme"]),
            ]),
            block("🛡 SAKATLIK PROTOKOLÜ", "#7B241C", [
              ex("External Rotation (Towel/Yerçekimi)", "2 × 15", "Rotator cuff", ["Tempo yavaş", "Omuz başını öne kaçırma"]),
              ex("Scapular Wall Slide", "2 × 10", "Skapula kontrolü", ["Kaburgayı içerde tut"]),
              ex("Chin Tuck", "2 × 12", "Boyun stabilite", ["Boynu nötrle", "2 sn tut"]),
            ]),
            block("🤸 SKILL — Hafif Overhead", "#8338EC", [
              ex("Pike Hold", "3 × 15-20sn", "Omuz + core", ["Omuzları yukarı it", "Kalçayı yüksekte tut"], { warn: "Omuz iyi değilse burada kal" }),
              ex("Wall Handstand Hold", "2 × 8-10sn", "Overhead stabilite", ["Duvara kontrollü çık", "Kaburgayı içeri al", "Bakış eller arasında"], { avoid: "Boynu yukarı kırma", warn: "Şartlı hareket: ağrısızsa" , alts: ["Pike Hold"], alt_reasons: ["Omuz veya boyun rahatsızsa direkt pike'a dön"] }),
            ]),
            block("💪 KUVVET — Temel Denge", "#F4A261", [
              ex("Inverted Row (Masa Altı)", "4 × 6-10", "Sırt + biceps", ["Göğsü masaya çek", "Boynu öne uzatma", "Üstte 1 sn sık"], { warn: "Bugünün ana çekişi", alts: ["Towel Row (Ayak Dirençli)", "Prone Cobra"], alt_reasons: ["Masa veya tezgâh güvenli değilse ayak dirençli towel row kullan", "Hiçbir çekiş kurulamıyorsa prone cobra ile üst sırt aktivasyonunu koru"] }),
              ex("Incline Push-up", "4 × 8-12", "Göğüs + triceps", ["Yüksekliği omuza göre ayarla", "Dirsekleri 30-45° tut"], { warn: "Bugünün güvenli itişi", alts: ["Wall Push-up"], alt_reasons: ["Omuz hassassa açıyı daha da yükselt"] }),
              ex("Close Grip Push Up", "2 × 8-10", "Triceps + iç göğüs", ["Elleri biraz daha dar al", "Gerekirse incline yap", "Omuz öne düşmesin"], { warn: "Triceps ve göğüs için düşük riskli ek hacim", alts: ["Wall Push-up"], alt_reasons: ["Dar tutuş omuz veya bileği rahatsız ederse açıyı yükselt"] }),
              ex("Towel Curl (Bacak Dirençli)", "2 × 12-15", "Biceps", ["Oturarak, havlunun uçlarını elinde tut", "Alt ucu tek ayakla bas, ayakla direnç ver", "Dirseği gövdeye yakın, omuzu öne alma"], { warn: "Evde direkt biceps hacmi — izometriğin aksine tam ROM verir", alts: ["Towel Curl Isometric"], alt_reasons: ["Ayakla direnç ayarı zor geliyorsa izometrik tut ile devam"] }),
              ex("Single Leg Glute Bridge", "3 × 10-12 (her bacak)", "Glute + hamstring", ["Bel değil kalça itişi", "Üstte 1 sn sık"], { warn: "Posterior chain'i güvenli besler" }),
              ex("Wall Sit", "2 × 20-30sn", "Quad izometrik", ["Ağrısız açı bul", "Topuğu yükle"], { avoid: "Derin açı", warn: "Diz baskısı artarsa çıkar", alts: ["Single Leg Glute Bridge"], alt_reasons: ["Diz bugün hoşlanmıyorsa glute dominanta dön"] }),
            ]),
            block("🧠 CORE + KONDİSYON", "#1F618D", [
              ex("Dead Bug", "3 × 8-10 (her taraf)", "Anti-extension core", ["Bel boşluğunu sabit tut", "Yavaş uzat"], { warn: "Bel için ana core" }),
              ex("Hızlı Yürüyüş", "24-30 dakika", "Interval aerobik", ["2 dk hızlı + 2 dk rahat", "Konuşabilecek tempo"], { warn: "Dayanıklılık hedefinin ana parçası" }),
            ]),
            upperCooldownBlock(),
          ],
        },
        gym: {
          duration: "~78 dk",
          aerobicMinutes: 15,
          modeNote: "Enerji iyiyse ve semptom düşükse gym yolu daha iyi yüklenir; bu gün rower interval atletik dayanıklılık için en iyi seçeneklerden biri.",
          injury: "⚠️ Omuz iyi değilse pull-up hattını lat pulldown'a, press'i machine press kısa ROM'a çek.",
          blocks: [
            block("🔥 ISINMA — Hazırlık", "#CC5500", [
              ex("Foam Roller Upper Back Roll", "2 × 30sn", "Torasik hazırlık", ["Kısa geçişler yap", "Bel boşluğunu büyütme"]),
              ex("Hip Circle", "2 × 10", "Kalça mobilite", ["Belden değil kalçadan dön", "Kalçayı rahat aç"]),
              ex("Shoulder Cross Stretch", "2 × 20sn", "Omuz hazırlığı", ["Omuzu kulağa çekme"]),
            ]),
            careBlockGym(),
            block("🤸 TEKNİK ÇEKİŞ", "#8338EC", [
              ex("Assisted Pull Up", "4 × 6-8", "Dikey çekiş", ["Omuzları aşağı çek", "Ayak desteğini sakince kullan"], { warn: "Tam barfiks yerine kontrollü relatif kuvvet çalışması", alts: ["Lat Pulldown"], alt_reasons: ["Omuz veya dirsek rahatsızsa makineye dön"] }),
            ]),
            block("💪 KUVVET — Temel Denge", "#F4A261", [
              ex("Chest Supported Row", "3 × 8-10", "Mid sırt + lat", ["Bench desteğini kullan", "Boynu uzun tut", "Üstte kısa sık"], { warn: "Bugünün ana çekişi" }),
              ex("Floor Press", "4 × 8-10", "Göğüs + triceps", ["Omuzları geriye yerleştir", "Dirsekleri kontrollü indir"], { warn: "Omuz dostu press" }),
              ex("Hip Thrust", "3 × 10-12", "Glute max", ["Üstte 1 sn sık", "Bel hiperextansiyonu yapma"], { warn: "Posterior chain tabanı" }),
              ex("Cable Curl", "2 × 10-12", "Biceps", ["Dirseği sabit tut", "Omuzu öne alma"], { warn: "Direkt kol hacmi için düşük riskli ek" }),
              ex("Triceps Pushdown", "2 × 10-12", "Triceps", ["Dirseği gövdeye yakın tut", "Omuzu yükseltme"], { warn: "Omuz dostu triceps hacmi" }),
            ]),
            block("🧠 CORE + KONDİSYON", "#1F618D", [
              ex("Pallof Press", "3 × 10 (her taraf)", "Anti-rotasyon", ["Göğüs hizasında it", "2 sn bekle"], { warn: "Skolyoz/kifoz için değerli" }),
              ex("Rower", "12-15 dk interval", "Kısa interval", ["30 sn sert + 60 sn kolay", "Çekişi belden değil kalça-itme + kol senkronundan üret", "Servikal nötral kal"], { alts: ["Stationary Bike", "Incline Walk"], alt_reasons: ["Bel veya boyun rower'da hoşlanmıyorsa bike'a dön", "Diz veya teknik yorgunlukta incline walk ile ritmi koru"] }),
            ]),
            upperCooldownBlock(),
          ],
        },
      },
    },
    {
      id: 3,
      sub: "ÇARŞAMBA",
      focus: "Aktif Recovery + Support Skill",
      type: "offday",
      color: "#3C91E6",
      intent: "Salı yükünü emdirirken L-sit altyapısını hafif dozda canlı tutarsın.",
      variants: {
        home: {
          duration: "~25 dk",
          aerobicMinutes: 25,
          modeNote: "Bugün ev yolu yeterli; aktif toparlanma günü.",
          injury: "⚠️ Skill bugün teknik temas seviyesinde kalır.",
          blocks: [
            recoveryWarmupBlock(),
            block("🛡 BAKIM", "#2A9D8F", [
              ex("Chin Tuck", "2 × 12", "Boyun stabilite", ["2 sn tut"]),
              ex("Scapular Wall Slide", "2 × 10", "Skapula", ["Yavaş kaydır"]),
            ]),
            block("🤸 SUPPORT SKILL", "#5B2C6F", [
              ex("L-sit Tuck Hold", "3 × 8-12sn", "Core + support", ["Omuzları aşağı bas", "Posterior tilt bul"], { warn: "Tamamen yeni skill; kısa temiz setler" }),
              ex("Dead Bug", "2 × 8 (her taraf)", "Core kontrol", ["Bel boşluğunu kaçırma"]),
            ]),
            block("🚶 KONDİSYON", "#990000", [
              ex("Hızlı Yürüyüş", "20-25 dakika", "Aktif toparlanma", ["Rahat tempo", "Adım ritmini akıcı tut"]),
            ]),
            offdayCooldownBlock(),
          ],
        },
        gym: {
          duration: "~25 dk",
          aerobicMinutes: 20,
          modeNote: "Salondaysan gün yine hafif; bike veya incline walk kullan.",
          injury: "⚠️ Yüklenme günü değil; sadece akışı koru.",
          blocks: [
            recoveryWarmupBlock(),
            block("🛡 BAKIM", "#2A9D8F", [
              ex("Band External Rotation", "2 × 15", "Rotator cuff", ["Yavaş tempo"]),
              ex("Scapular Wall Slide", "2 × 10", "Skapula", ["Kaburga kontrolü"]),
            ]),
            block("🤸 SUPPORT SKILL", "#5B2C6F", [
              ex("L-sit Tuck Hold", "3 × 8-12sn", "Core + support", ["Kısa ve temiz set"], { warn: "Support basıncında omuz rahatsızsa direkt çıkar" }),
            ]),
            block("🚴 KONDİSYON", "#990000", [
              ex("Incline Walk", "20 dakika sürekli", "Aktif toparlanma", ["RPE 4-5", "Koşuya dönme"]),
            ]),
            offdayCooldownBlock(),
          ],
        },
      },
    },
    {
      id: 4,
      sub: "PERŞEMBE",
      focus: "Lower Control + Upper Back",
      type: "training",
      color: "#118AB2",
      intent: "Diz dostu alt vücut ve upper-back hacmiyle postür, kontrol ve L-sit altyapısı beslenir.",
      variants: {
        home: {
          duration: "~65 dk",
          aerobicMinutes: 18,
          modeNote: "Diz hassas veya enerji düşük günlerde ev versiyonu daha yönetilebilir.",
          injury: "⚠️ Diz baskısı varsa reverse lunge yerine wall sit; bel yorgunsa tempo row'u normal row'a çevir.",
          blocks: [
            block("🔥 ISINMA — Hazırlık", "#CC5500", [
              ex("Cat-Cow Mobilite", "2 × 8", "Omurga hazırlık", ["Acele etme"]),
              ex("Wrist Rotation", "2 × 30sn", "Bilek hazırlık", ["Küçük daireler çiz"]),
              ex("Hip Circle", "2 × 10", "Kalça mobilite", ["Kalçayı akıt"]),
            ]),
            block("🛡 SAKATLIK PROTOKOLÜ", "#7B241C", [
              ex("External Rotation (Towel/Yerçekimi)", "2 × 15", "Rotator cuff", ["Yavaş tempo"]),
              ex("Scapular Wall Slide", "2 × 10", "Skapula", ["Yavaş kaydır"]),
              ex("Chin Tuck", "2 × 12", "Boyun", ["2 sn tut"]),
            ]),
            block("🤸 SKILL — Support", "#8338EC", [
              ex("L-sit Tuck Hold", "3 × 8-12sn", "Core + support", ["Dizleri yakın tut", "Omuzları aşağı bas"], { warn: "Yeni skill; kalite bozulmadan bitir" }),
            ]),
            block("💪 KUVVET — Kontrol Hattı", "#F4A261", [
              ex("Tempo Inverted Row", "3 × 6-8", "Sırt + skapula", ["3 sn iniş", "Üstte 1 sn dur", "Boynu uzun tut"], { warn: "Bugünün upper-back omurgası", alts: ["Towel Row (Ayak Dirençli)", "Prone Cobra"], alt_reasons: ["Masa güvenli değilse towel row ile çekiş paterni korunur", "Belirgin ekipman kısıtında prone cobra ile skapula ve torasik kontrolü koru"] }),
              ex("Reverse Lunge (ağırlıksız)", "3 × 6-8 (her bacak)", "Quad + glute", ["Kısa kontrollü adım", "Diz çizgisini koru"], { avoid: "Büyük adım ve derin açı", warn: "Diz baskısı varsa wall sit'e dön", alts: ["Wall Sit"], alt_reasons: ["Menisküs hassassa izometrik seçenek daha güvenli olabilir"] }),
              ex("Wall Sit", "1-2 × 20-30sn", "Quad izometrik", ["Ağrısız diz açısında kal", "Topuğu yükle"], { warn: "Reverse lunge iyi gidiyorsa düşük doz quad finisher olarak kullan", alts: ["Single Leg Glute Bridge"], alt_reasons: ["Diz o gün wall sit'i de sevmiyorsa glute dominanta dön"] }),
              ex("Hip Thrust (Sandalye)", "3 × 12-15", "Glute max", ["Üstte kısa sık", "Bel yerine kalçadan it"]),
              ex("Single Leg RDL (Bodyweight)", "2 × 6-8 (her bacak)", "Posterior chain + denge", ["Kalçadan menteşelen, dizi hafif yumuşak tut", "Gövde ve arkadaki bacak paralel inecek", "Denge için duvar veya sandalye desteği kullan"], { warn: "Tek taraflı hinge + asimetri tespiti; skolyoz için değerli", alts: ["Single Leg Glute Bridge"], alt_reasons: ["Denge tutmuyorsa glute dominanta dön"] }),
              ex("Bridge Walkout", "2 × 6-8", "Hamstring curl hattı", ["Köprüde kal", "Topukları yavaş uzağa yürüt", "Belini düşürme"], { warn: "Hamstring knee-flexion için evde güvenli başlangıç", alts: ["Single Leg Glute Bridge"], alt_reasons: ["Bel veya arka bacak krampı olursa glute dominanta geri dön"] }),
            ]),
            block("🧠 CORE + KONDİSYON", "#1F618D", [
              ex("Bird Dog", "2 × 8 (her taraf)", "Anti-rotasyon", ["Kol-bacağı yavaş uzat", "Belini oynatma"], { warn: "Bel yorgun günlerde çok değerli" }),
              ex("Side Plank", "2 × 30sn (her taraf)", "Lateral core", ["Kalça çizgisini koru"], { warn: "Skolyoz/kifoz için ana blok" }),
              ex("Hızlı Yürüyüş", "15-20 dakika tempo", "Tempo aerobik", ["RPE 5-6", "Koşuya kaçma"]),
            ]),
            lowerCooldownBlock(),
          ],
        },
        gym: {
          duration: "~70 dk",
          aerobicMinutes: 15,
          modeNote: "Gym yolu quad ve upper-back için daha ölçülebilir yük sağlar.",
          injury: "⚠️ Leg press sadece kısa ağrısız ROM. Landmine press opsiyonel; omuz sakinse girer.",
          blocks: [
            block("🔥 ISINMA — Hazırlık", "#CC5500", [
              ex("Foam Roller Upper Back Roll", "2 × 30sn", "Torasik hazırlık", ["Kısa geçişler"]),
              ex("Cat-Cow Mobilite", "2 × 8", "Omurga hazırlık", ["Ritmik ilerle", "Bel-boynu zorlamadan akıt"]),
              ex("Hip Circle", "2 × 10", "Kalça mobilite", ["Kalçayı aç", "Belden değil kalçadan dön"]),
            ]),
            careBlockGym(),
            block("🤸 SKILL — Support", "#8338EC", [
              ex("L-sit Tuck Hold", "3 × 8-12sn", "Core + support", ["Support pozisyonunda omuzları aşağı it"], { warn: "Omuz baskısı artarsa çıkar" }),
            ]),
            block("💪 KUVVET — Kontrol Hattı", "#F4A261", [
              ex("Leg Press", "3 × 10-12", "Quad", ["Kısa ROM kullan", "Dizini ağrısız açıda tut"], { warn: "Menisküs için ROM belirleyici", alts: ["Hip Thrust"], alt_reasons: ["Diz iyi hissetmiyorsa glute dominanta dön"] }),
              ex("Box Step Down (eccentric)", "2 × 5-6 (her bacak)", "Quad kontrol", ["Alçak kutu kullan", "3 sn yavaş iniş", "Destek alarak kalça-diz hattını koru"], { warn: "Quad toleransını güvenli progresyonla artırır", alts: ["Wall Sit"], alt_reasons: ["Step-down dizde hoş değilse izometrik seçeneğe dön"] }),
              ex("Machine Seated Leg Curl", "2 × 10-12", "Hamstring curl hattı", ["Kalçayı minderden kaldırma", "Topuğu kontrollü çek", "Belini sabit tut"], { warn: "Hamstring knee-flexion için güvenli makine seçeneği", alts: ["Machine Lying Leg Curl"], alt_reasons: ["Oturarak versiyon hoş değilse lying curl kullan"] }),
              ex("Single Leg RDL (Dumbbell Hafif)", "2 × 8 (her bacak)", "Posterior chain + denge", ["Hafif dumbbell ile kalçadan menteşelen", "Dizi yumuşak tut, arkadaki bacak paralele inecek", "Boynu omurga ile aynı hizada tut"], { warn: "Tek taraflı hinge + asimetri tespiti", alts: ["Bodyweight Single Leg RDL"], alt_reasons: ["Denge yoksa ağırlıksız + duvar desteği ile başla"] }),
              ex("Chest Supported Row", "3 × 10", "Upper back", ["Bench desteğinde boynu uzun tut"], { warn: "Bugünün upper-back omurgası" }),
              ex("Band Face Pull", "2 × 12-15", "Arka omuz + alt trapez", ["Dirsekleri çok yükseltmeden çek"], { warn: "Kifoz eğilimine karşı iyi kapanış" }),
              ex("Cable Lateral Raise", "2 × 12-15", "Yan omuz", ["Skapular planda kaldır", "Hafif kilo kullan", "Ağrısız aralıkta kal"], { warn: "Omuz hacmi için şartlı ve hafif ek set" }),
              ex("Landmine Press", "2 × 8-10", "Omuz dostu press", ["Kaburgayı kapat", "Barı çapraz yukarı it"], { warn: "Şartlı hareket: omuz ağrısızsa", alts: ["Floor Press"], alt_reasons: ["Landmine bile rahatsızsa floor press'e dön"] }),
            ]),
            block("🧠 CORE + KONDİSYON", "#1F618D", [
              ex("Side Plank", "2 × 30-40sn (her taraf)", "Lateral core", ["Kalça çizgini koru"]),
              ex("Incline Walk", "12-15 dakika tempo", "Tempo aerobik", ["RPE 5-6", "Koşu yok"]),
            ]),
            lowerCooldownBlock(),
          ],
        },
      },
    },
    {
      id: 5,
      sub: "CUMA",
      focus: "Mobilite + Cumartesi Hazırlığı",
      type: "offday",
      color: "#06D6A0",
      intent: "Cumartesi hacim günü öncesi sistemi açar ama yormazsın.",
      variants: {
        home: {
          duration: "~20 dk",
          aerobicMinutes: 15,
          modeNote: "Ev modu bugün yeterli; çok hafif kal.",
          injury: "⚠️ Yarın için taze kalmak ana hedef.",
          blocks: [
            block("🧩 HAZIRLIK", "#2A9D8F", [
              ex("Cat-Cow Mobilite", "2 × 8", "Omurga", ["Akıcı ilerle"]),
              ex("Hip Circle", "2 × 10", "Kalça", ["Rahat tempo"]),
              ex("Glute Bridge / Hip Thrust", "2 × 12", "Glute aktivasyon", ["Üstte hafif sık"]),
              ex("Wrist Rotation", "2 × 30sn", "Bilek", ["Küçük daireler"]),
            ]),
            careBlockHome(),
            block("🚶 KONDİSYON", "#990000", [
              ex("Hızlı Yürüyüş", "15 dakika kolay", "Aktif toparlanma", ["RPE 4-5"]),
            ]),
            offdayCooldownBlock(),
          ],
        },
        gym: {
          duration: "~20 dk",
          aerobicMinutes: 15,
          modeNote: "Salona gidersen de gün aynı hafiflikte kalır.",
          injury: "⚠️ Bugün yük ekleme günü değil.",
          blocks: [
            block("🧩 HAZIRLIK", "#2A9D8F", [
              ex("Cat-Cow Mobilite", "2 × 8", "Omurga", ["Akıcı ilerle"]),
              ex("Hip Circle", "2 × 10", "Kalça", ["Rahat tempo"]),
              ex("Glute Bridge / Hip Thrust", "2 × 12", "Glute aktivasyon", ["Hafif sıkışma"]),
            ]),
            careBlockGym(),
            block("🚴 KONDİSYON", "#990000", [
              ex("Stationary Bike", "15 dakika kolay", "Aktif toparlanma", ["RPE 4-5"]),
            ]),
            offdayCooldownBlock(),
          ],
        },
      },
    },
    {
      id: 6,
      sub: "CUMARTESİ",
      focus: "Athletic Volume + Posterior Chain",
      type: "training",
      color: "#F77F00",
      intent: "Haftanın ana hacim günü; ama kontrol ve toparlanabilirlik çizgisi korunur.",
      variants: {
        home: {
          duration: "~85 dk",
          aerobicMinutes: 35,
          modeNote: "Gym yoksa bile haftanın ana işi evde çıkabilir; yürüyüş bloğunu atlama.",
          injury: "⚠️ Bugün hacim var ama skill sadece hafif temas. Diz veya omuz iyi değilse doz düşer.",
          blocks: [
            block("🔥 ISINMA — Hazırlık", "#CC5500", [
              ex("Cat-Cow Mobilite", "2 × 8", "Omurga", ["Ritmik ilerle"]),
              ex("Hip Circle", "2 × 10", "Kalça", ["Kalçayı aç"]),
              ex("Shoulder Cross Stretch", "2 × 20sn", "Omuz", ["Aşırı çekme yok"]),
              ex("Wrist Rotation", "2 × 30sn", "Bilek", ["Kontrollü daireler"]),
            ]),
            block("🛡 SAKATLIK PROTOKOLÜ", "#7B241C", [
              ex("External Rotation (Towel/Yerçekimi)", "2 × 15", "Rotator cuff", ["Tempo yavaş"]),
              ex("Scapular Wall Slide", "2 × 10", "Skapula", ["Kaburga kontrolü"]),
              ex("Chin Tuck", "2 × 12", "Boyun", ["2 sn tut"]),
            ]),
            block("🤸 SKILL — Hafif Teknik", "#8338EC", [
              ex("Pike Hold", "2 × 15sn", "Omuz + core", ["Kalite odaklı kısa set"], { warn: "Bugün skill ana blok değil" }),
              ex("L-sit Tuck Hold", "2 × 8-10sn", "Core + support", ["Kısa ve temiz set"]),
            ]),
            block("💪 KUVVET — Hacim", "#F4A261", [
              ex("Hip Thrust (Sandalye)", "4 × 10-12", "Glute", ["Üstte 1 sn sık", "Belden itme"], { warn: "Bugünün posterior chain omurgası" }),
              ex("Inverted Row (Masa Altı)", "4 × 8-10", "Sırt", ["Göğsü çek", "Boynu nötr tut"], { warn: "Bugünün ana pull hacmi", alts: ["Towel Row (Ayak Dirençli)", "Prone Cobra"], alt_reasons: ["Masa veya tezgâh stabil değilse towel row ile devam et", "Kurulum yoksa prone cobra ile üst sırt hacmini en azından koru"] }),
              ex("Incline Push-up", "3 × 10-12", "Göğüs", ["Ağrısız ROM'da kal"], { warn: "Push destek hacmi; ana iş değil" }),
              ex("Towel Curl (Bacak Dirençli)", "2 × 12-15", "Biceps", ["Oturarak havlunun uçlarını elinde tut", "Alt ucu tek ayakla bas, ayakla direnç ver", "Dirseği sabit, tempo kontrollü"], { warn: "Evde direkt biceps hacmi; tam ROM verir", alts: ["Towel Curl Isometric"], alt_reasons: ["Direnç ayarı zor geliyorsa izometrik tut ile devam"] }),
              ex("Single Leg Glute Bridge", "2 × 10 (her bacak)", "Glute + hamstring", ["Kontrollü kaldır"], { alts: ["Wall Sit"], alt_reasons: ["Diz iyi, quad dokunuş istiyorsan wall sit kullan"] }),
            ]),
            block("🧠 CORE + KONDİSYON", "#1F618D", [
              ex("Dead Bug", "2 × 8-10 (her taraf)", "Core", ["Bel sabit"]),
              ex("Side Plank", "2 × 30sn (her taraf)", "Lateral core", ["Kalça çizgini koru"]),
              ex("Hızlı Yürüyüş", "30-40 dakika Zone 2", "Aerobik baz", ["RPE 5-6", "Ritim temiz ve rahat"], { warn: "Haftanın ana dayanıklılık bloğu" }),
            ]),
            volumeCooldownBlock(),
          ],
        },
        gym: {
          duration: "~82 dk",
          aerobicMinutes: 25,
          modeNote: "Enerji yüksekse gym versiyonu posterior chain ve row hacmini daha iyi yükler. Quad PER'de alındığı için bugün saf posterior + pull hacmi.",
          injury: "⚠️ Hacim günü diye ego yok. Pull ve glute omurgası korunur; press destek rolde kalır.",
          blocks: [
            block("🔥 ISINMA — Hazırlık", "#CC5500", [
              ex("Foam Roller Upper Back Roll", "2 × 30sn", "Torasik hazırlık", ["Kısa geçişler"]),
              ex("Hip Circle", "2 × 10", "Kalça", ["Kalçayı aç"]),
              ex("Shoulder Cross Stretch", "2 × 20sn", "Omuz", ["Aşırı çekme yok"]),
            ]),
            careBlockGym(),
            block("🤸 SKILL — Hafif Teknik", "#8338EC", [
              ex("Pike Hold", "2 × 15sn", "Omuz aktivasyon", ["Kısa ve temiz set"]),
              ex("L-sit Tuck Hold", "2 × 8-10sn", "Core + support", ["Submax kal"]),
            ]),
            block("💪 KUVVET — Hacim", "#F4A261", [
              ex("Hip Thrust", "4 × 8-10", "Glute", ["Üstte 1 sn sık"], { warn: "Bugünün ana hinge/glute hattı" }),
              ex("Chest Supported Row", "4 × 8-10", "Mid sırt", ["Bench desteğini kullan", "Boyun nötr"]),
              ex("Lat Pulldown", "3 × 8-10", "Lat", ["Dirseği aşağı çek", "Kendini geriye savurma"], { warn: "Dikey çekiş desteği" }),
              ex("Floor Press", "3 × 8-10", "Göğüs + triceps", ["Kontrollü tempo"], { warn: "Press destek rolde" }),
              ex("Cable Curl", "2 × 10-12", "Biceps", ["Dirseği sabit tut", "Tempo kontrollü"], { warn: "Haftalık kol hacmini dengeler" }),
              ex("Triceps Pushdown", "2 × 10-12", "Triceps", ["Dirseği gövdeye yakın tut"], { warn: "Omuz dostu triceps hacmi" }),
            ]),
            block("🧠 CORE + KONDİSYON", "#1F618D", [
              ex("Pallof Press", "2 × 10 (her taraf)", "Anti-rotasyon", ["2 sn bekle"]),
              ex("Side Plank", "2 × 30sn (her taraf)", "Lateral core", ["Kalça çizgisi"]),
              ex("Rower", "20-25 dakika Zone 2", "Aerobik baz", ["RPE 5-6", "Sakin ritim"], { alts: ["Stationary Bike"], alt_reasons: ["Bel rower'da hoşlanmıyorsa bike'a dön"] }),
            ]),
            volumeCooldownBlock(),
          ],
        },
      },
    },
    {
      id: 7,
      sub: "PAZAR",
      focus: "Recovery Strength + Zone 2",
      type: "training",
      color: "#8338EC",
      intent: "Test günü değil; Cumartesi yükünü absorbe ederken hafif kuvvet ve uzun aerobik baz kurulur.",
      variants: {
        home: {
          duration: "~55 dk",
          aerobicMinutes: 35,
          modeNote: "Yorgun günlerde pazarı özellikle home ve hafif tutmak mantıklı.",
          injury: "⚠️ Bugünü asla max test gibi yapma. Amaç toparlanmak.",
          blocks: [
            recoveryWarmupBlock(),
            block("🛡 BAKIM", "#7B241C", [
              ex("Scapular Wall Slide", "2 × 10", "Skapula", ["Yavaş kaydır"]),
              ex("Chin Tuck", "2 × 12", "Boyun", ["2 sn tut"]),
            ]),
            block("💪 HAFİF KUVVET", "#F4A261", [
              ex("Glute Bridge / Hip Thrust", "2 × 15", "Glute", ["Hafif sıkışma"]),
              ex("Dead Bug", "2 × 8 (her taraf)", "Core", ["Bel sabit"]),
              ex("Side Plank", "2 × 20-30sn (her taraf)", "Lateral core", ["Kısa ama temiz tut"]),
              ex("Standing Calf Raise", "2 × 15-20", "Alt bacak", ["Üstte 1 sn sık", "Topukları kontrollü indir"], { warn: "Zone 2 öncesi calf aktivasyonu; haftalık alt bacak tek direkt çalışmalarından biri" }),
            ]),
            block("🚶 KONDİSYON", "#990000", [
              ex("Hızlı Yürüyüş", "30-40 dakika Zone 2", "Aerobik baz", ["RPE 5-6", "Konuşabilir tempo"], { warn: "Haftayı toparlayarak kapat" }),
            ]),
            recoveryCooldownBlock(),
          ],
        },
        gym: {
          duration: "~60 dk",
          aerobicMinutes: 35,
          modeNote: "Macfit'te de pazar recovery mantığı değişmez.",
          injury: "⚠️ Pazar artık test günü değil. Hafif row + core + Zone 2 yeterli.",
          blocks: [
            recoveryWarmupBlock(),
            block("🛡 BAKIM", "#7B241C", [
              ex("Band External Rotation", "2 × 15", "Rotator cuff", ["Yavaş tempo"]),
              ex("Scapular Wall Slide", "2 × 10", "Skapula", ["Yavaş kaydır"]),
              ex("Chin Tuck", "2 × 12", "Boyun", ["2 sn tut"]),
            ]),
            block("💪 HAFİF KUVVET", "#F4A261", [
              ex("Chest Supported Row", "2 × 12", "Sırt", ["Hafif yük", "Temiz hareket"], { warn: "Destek işi; zorlamaz" }),
              ex("Hip Thrust", "2 × 12", "Glute", ["Hafif yük"]),
              ex("Pallof Press", "2 × 12 (her taraf)", "Core", ["2 sn bekle"]),
              ex("Side Plank", "2 × 20-30sn (her taraf)", "Lateral core", ["Kısa ama temiz" ]),
              ex("Standing Calf Raise", "2 × 15-20", "Alt bacak", ["Üstte 1 sn sık", "Topukları kontrollü indir"], { warn: "Zone 2 öncesi calf aktivasyonu" }),
            ]),
            block("🚴 KONDİSYON", "#990000", [
              ex("Incline Walk", "30-40 dakika Zone 2", "Aerobik baz", ["RPE 5-6", "Rahat tempo"], { alts: ["Stationary Bike"], alt_reasons: ["Diz veya ayak için bike daha rahat olabilir"] }),
            ]),
            recoveryCooldownBlock(),
          ],
        },
      },
    },
  ],
};

export function getHybridDayVariant(day, mode) {
  if (!day?.variants) return day;
  return {
    ...day,
    ...(day.variants[mode] || day.variants.home),
  };
}
