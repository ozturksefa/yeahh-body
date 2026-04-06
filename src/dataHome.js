// ─────────────────────────────────────────────────────────────
// EV PROGRAMI — Ekipmansız 1 Ay
// Araçlar: Masa/tezgah (inverted row) + Sandalye (dip, Bulgarian)
// Zemin + Duvar her zaman mevcut
// Kondisyon: Hızlı yürüyüş (menisküs uyumlu)
// ─────────────────────────────────────────────────────────────

export const PROGRAM_HOME = {
  meta: {
    name: "Ev Programı",
    phase: "Faz 1 — Temel Kuvvet & Skill",
    weeks: "Hafta 1–8 (sonrasında Faz 2)",
    description: "Dayanıklılık önce — denge, kontrol, hız takip eder. Ekipmansız uzun vadeli program. Sakatlık dostu: menisküs, rotator cuff, bel ve boyun fıtığı için optimize edildi. Handstand ve L-sit ikincil skill olarak paralel ilerler. Max test 2 haftada bir opsiyonel.",
  },

  equipment: {
    mevcut: ["Masa/tezgah (inverted row)", "Sandalye (dip, bulgarian, L-sit)", "Zemin", "Duvar"],
    önerilen: ["Kapı pull-up barı (150-300₺) — pull gelişimini sonsuza uzatır"],
  },

  periodization: [
    { week: 1, label: "Adaptasyon",    sets_mod: 0.8,  note: "Form ve pozisyonlar oturur" },
    { week: 2, label: "Hacim",         sets_mod: 1.0,  note: "Normal hacim" },
    { week: 3, label: "Hacim +",       sets_mod: 1.1,  note: "Set veya rep artır" },
    { week: 4, label: "Yoğunluk",      sets_mod: 0.9,  note: "Daha zor varyasyon dene" },
    { week: 5, label: "Hacim ++",      sets_mod: 1.2,  note: "En yüksek hacim" },
    { week: 6, label: "Yoğunluk +",    sets_mod: 0.85, note: "Tempo yavaşlat (3-1-3)" },
    { week: 7, label: "Max Test",      sets_mod: 1.0,  note: "Tüm max testleri kaydet — PR haftası" },
    { week: 8, label: "Deload",        sets_mod: 0.5,  note: "Hacim yarıya — aktif dinlenme" },
  ],

  phase2: {
    trigger: "Hafta 7 max testleri geçilince:",
    milestones: {
      handstand: "Wall handstand 30+ sn → Serbest handstand denemesine geç",
      lsit: "Full L-sit 10+ sn → L-sit push-up ve V-sit'e geç",
      push: "Archer push-up 8+ → Tek kol push-up negatiflerine geç",
      squat: "Full pistol 8+ → Deficit pistol (step üzerinde)",
      pull: "Inverted row 20+ → Kapı barı şart — pull-up negatiflerine geç",
    },
  },

  skillPaths: {
    handstand: {
      name: "Handstand Yolu", icon: "🙃",
      description: "Denge ve omuz stabilite — salona ihtiyaç yok",
      steps: [
        { level:1, name:"Pike Hold", target:"4 × 20sn", detail:"Kalçayı havaya kaldır — omuzlar aktif" },
        { level:2, name:"Wall Walk", target:"4 × 4 adım", detail:"Adım sayısını her hafta artır" },
        { level:3, name:"Wall Handstand (göğüs duvarda)", target:"4 × 15sn", detail:"Göğüs duvara bakıyor — daha kolay" },
        { level:4, name:"Wall Handstand (sırt duvarda)", target:"4 × 30sn", detail:"Topuklar duvarda — daha güç" },
        { level:5, name:"Wall Handstand Hold", target:"3 × max süre", detail:"Hedef: 60sn" },
        { level:6, name:"Serbest Handstand Deneme", target:"10 deneme/gün", detail:"Duvarsız — denge noktasını bul" },
        { level:7, name:"Handstand Push-up (duvarda)", target:"3 × 3-5", detail:"En büyük milestone" },
      ],
    },
    lsit: {
      name: "L-sit Yolu", icon: "🪑",
      description: "Core + hip flexor — sadece sandalye",
      steps: [
        { level:1, name:"Floor Tuck Hold", target:"5 × max", detail:"Zemin — dizler çekilmiş" },
        { level:2, name:"Chair Tuck Hold", target:"5 × max", detail:"Sandalye — daha kolay" },
        { level:3, name:"Tek Bacak Uzatma", target:"3 × 5 (her bacak)", detail:"Sandalye tuck'tan bir bacağı uzat" },
        { level:4, name:"Full L-sit", target:"4 × max süre", detail:"Her iki bacak uzatılmış — hedef 10sn" },
        { level:5, name:"L-sit 15 sn", target:"3 × 15sn", detail:"Süreyi uzat" },
        { level:6, name:"L-sit Push-up", target:"3 × 5", detail:"L-sit pozisyonunda push-up" },
        { level:7, name:"V-sit Deneme", target:"3 × max", detail:"Bacaklar 45° yukarıda" },
      ],
    },
    push: {
      name: "Push Yolu", icon: "💪",
      description: "Göğüs + triceps + delt — zemin",
      steps: [
        { level:1, name:"Normal Push-up", target:"4 × max", detail:"Temel" },
        { level:2, name:"Diamond + Pike", target:"4 × max", detail:"Diamond + Pike push-up" },
        { level:3, name:"Chair Dip + Archer", target:"4 × max", detail:"Triceps ve unilateral" },
        { level:4, name:"Pseudo-Planche Push-up", target:"4 × 8", detail:"Öne doğru eğ" },
        { level:5, name:"One-arm Push-up Negative", target:"3 × 3 (her kol)", detail:"Yavaş in — 5sn" },
        { level:6, name:"One-arm Push-up", target:"3 × 5 (her kol)", detail:"Büyük milestone" },
        { level:7, name:"Handstand Push-up (duvarda)", target:"3 × 3-5", detail:"Dikey pressing zirvesi" },
      ],
    },
    squat: {
      name: "Pistol Yolu", icon: "🦵",
      description: "Tek bacak güç — sandalye",
      steps: [
        { level:1, name:"Assisted Pistol (2 el)", target:"4 × 5 (her bacak)", detail:"Sandalye veya kapı çerçevesi" },
        { level:2, name:"Assisted Pistol (1 el)", target:"4 × 6", detail:"Sadece 1 parmak desteği" },
        { level:3, name:"Box Pistol", target:"4 × 6", detail:"Alçak yüzeye otur — kalk" },
        { level:4, name:"Full Pistol", target:"4 × 8 (her bacak)", detail:"Duvarsız — tam range" },
        { level:5, name:"Deficit Pistol", target:"4 × 6", detail:"Step üzerinde — daha derin" },
        { level:6, name:"Weighted Pistol", target:"3 × 5", detail:"Sırt çantasıyla" },
      ],
    },
    pull: {
      name: "Pull Yolu", icon: "🔝",
      description: "Çekiş — masa → kapı barı",
      steps: [
        { level:1, name:"Inverted Row (masa, dizler bükülü)", target:"4 × max", detail:"Başlangıç" },
        { level:2, name:"Inverted Row (bacaklar düz)", target:"4 × max", detail:"Daha zor" },
        { level:3, name:"Elevated Inverted Row (ayaklar yüksekte)", target:"4 × max", detail:"Ayakları sandalyeye koy" },
        { level:4, name:"→ Kapı Barı Gerekli ←", target:"Yatırım: 150-300₺", detail:"Bu noktadan sonra pull gelişimi için bar şart" },
        { level:5, name:"Dead Hang", target:"3 × max süre", detail:"Kapı barıyla — omurga dekompresyon" },
        { level:6, name:"Chin-up Negative", target:"5 × 5 (5sn indir)", detail:"Eccentric güç" },
        { level:7, name:"Full Pull-up", target:"4 × max", detail:"Kalisteniğin temeli" },
      ],
    },
  },

  principles: [
    "Handstand ve L-sit için taze sinir sistemi — her günün başında",
    "Inverted row çekiş zincirini canlı tutar",
    "Pistol squat → güç kayıpsız alt vücut",
    "Her gün sakatlık protokolü — atlanamaz",
    "Kondisyon: hızlı yürüyüş, jump squat değil (menisküs)",
  ],

  days: [
    // ── GÜN 1 — SALI ────────────────────────────────────────────
    {
      id: 1, title: "GÜN 1", sub: "SALI",
      focus: "Handstand + Push Dominant",
      duration: "~72 dk", color: "#C1121F", type: "training",
      injury: "⚠️ OMUZ: Handstand'da scapula aktif — asla pasif yüklenme. BOYUN: Chin tuck her günün başında zorunlu. DİZ: Chair dip sırasında diz açısına dikkat.",
      blocks: [
        { name: "🔥 ISINMA — Mobilite", color: "#CC5500", exercises: [
          { name:"Cat-Cow Mobilite", sets:"2 × 10", muscle:"Torasik + lumbar mobilite", how:["Dört ayak — el omuz altında, diz kalça altında","Nefes al: beli sarkıt, başı kaldır (cow)","Nefes ver: beli yay gibi yukarı, başı aşağı (cat)","Akıcı yavaş — 10 tekrar"], avoid:"Beli aşırı sarkıtma", warn:"BEL + BOYUN FITIĞI: Omurga hareketliliği, disk basıncını azaltır", alts:[] },
          { name:"Hip Circle", sets:"2 × 10 (her yön)", muscle:"Kalça mobilite, rotatorlar", how:["Ayakta — eller belde","Kalçayla büyük daire çiz","10 saat yönü, 10 saat karşıtı"], avoid:"Dizleri bükme", warn:"DİZ: Kalça açıklığını artırır", alts:[] },
          { name:"Shoulder Cross Stretch", sets:"2 × 30sn (her taraf)", muscle:"Posterior kapsül, teres minor", how:["Sağ kolu göğüs önünde yatay tut","Sol elle dirsekten hafifçe çek","30 sn tut — zorlama"], avoid:"Omzun yukarı kalkması", warn:"ROTATOR CUFF: Posterior kapsül gerginliğini azaltır", alts:[] },
        ]},

        { name: "🛡 SAKATILIK PROTOKOLÜ — Zorunlu", color: "#7B241C", exercises: [
          { name:"External Rotation (Towel/Yerçekimi)", sets:"3 × 15 (her taraf)", muscle:"İnfraspinatus, teres minor — rotator cuff", how:["Sağ yanına yat — sağ dirsek 90°","Önkolun yerçekimiyle aşağıya sarksın","Yavaşça yukarı kaldır — omuz hizasına","1 sn tut — kontrollü bırak"], avoid:"Omzun kulağa kalkması", warn:"ROTATOR CUFF: Bant olmadan da yapılır — yerçekimi direnç sağlar. Her gün zorunlu", alts:[] },
          { name:"Scapular Wall Slide", sets:"2 × 10", muscle:"Serratus anterior, trapez orta/alt", how:["Sırtını duvara daya — kollar W","Yavaşça U yaparak yukarı kaydır","Kürek kemikleri duvarda kalacak"], avoid:"Kürek kemiklerinin duvardan ayrılması", warn:"KİFOZ + ROTATOR CUFF: Her gün şart", alts:[] },
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Derin boyun fleksörleri", how:["Dik otur veya ayakta dur","Çeneni geriye it — çift çene","2 sn tut — bırak"], avoid:"Başı aşağı eğme", warn:"BOYUN FITIĞI: Servikal stabilizasyon — her gün zorunlu", alts:[] },
        ]},

        { name: "🙃 SKİLL — Handstand Progression (Duvar)", color: "#8338EC", exercises: [
          { name:"Pike Hold", sets:"4 × 20sn", muscle:"Omuz stabilite, core anterior — handstand tabanı", how:["Eller yerde — kalçayı havaya kaldır","Kulakların arasında kollar","Başın hafifçe önde — duvara bakmıyor","Sert core — 20 sn tut"], avoid:"Dirsekleri bükme", warn:"ROTATOR CUFF: Omuz ısındıktan sonra yap. Ağrıda dur", alts:["Downward Dog Hold"] },
          { name:"Wall Handstand Hold", sets:"2 × max süre", muscle:"Omuz + core stabilite — full handstand pozisyonu", how:["Duvara karşı dön — elleri 10-15cm duvara yakın","Bir bacağı at — diğerini takip et","Vücut duvara yapışık — topuklar duvarda","Gözler ellerin arasında — 0 aşağı bakma"], avoid:"Beli aşırı bükme — muz pozu", warn:"BOYUN FITIĞI: Boyunu hiperekstansiyona getirme — nötral pozisyon. ROTATOR CUFF: Ağrıda hemen in", alts:["Wall Walk"] },
        ]},

        { name: "⚖️ DENGE & HIZ", color: "#E76F51", exercises: [
          { name:"Tek Ayak Denge Hold", sets:"3 × 30sn (her bacak)", muscle:"Ayak bileği stabilite, propriyosepsiyon, tibialis anterior", how:["Tek ayakta dur — duvara dokunmadan","30 sn tut — gözler açık","İlerledikçe: gözler kapalı dene","Sallantı normaldir — kontrol etmeye çalış"], avoid:"Duvara ya da bir şeye tutunma", warn:"DİZ + MENİSKÜS: Statik denge — eklem basıncı yok. Propriyosepsiyon menisküs rehabilitasyonunun temelidir", alts:[] },
        ]},

        { name: "💪 KUVVET — Push + Hip Extension", color: "#C1121F", exercises: [
          { name:"Diamond Push-up", sets:"3 × max", muscle:"Triceps dominant, göğüs iç kısmı, ön delt", how:["Eller birbirine yakın — elmas şekli","Dirsekler vücuda paralel","Göğüs yere değince kalk","Yavaş in, hızlı çık"], avoid:"Dirseklerin dışa açılması", warn:"ROTATOR CUFF: Elmas tutuş dirsek merkezli — omuz baskısı az. Ağrıda geniş tutuşa geç", alts:["Close-grip Push-up"] },
          { name:"Pike Push-up", sets:"3 × 8", muscle:"Ön delt dominant — handstand push-up temeli", how:["Kalçayı havaya kaldır — V şekli","Başı ellerin arasına indir","Dirsekler biraz dışa","İt — tam kalk"], avoid:"Kalçayı düşürme — plank değil pike", warn:"ROTATOR CUFF: Vertical push — en doğal overhead. Ağrıda range azalt", alts:["Decline Push-up"] },
          { name:"Incline Push-up", sets:"3 × 10", muscle:"Göğüs, triceps, ön delt — azaltılmış omuz yükü", how:["Sırtın sandalyeye — eller omuz genişliğinde","Dizler 90° veya uzatılmış","Kalçayı aşağı indir — dirsekler 90°","It — tam kalk"], avoid:"Sandalye kaymasın — sabitle. Çok öne eğilme", warn:"DİZ: Uzatılmış bacak versiyonu daha zor ama diz stres az. OMUZ: 90° altına inme", alts:["Floor Dip"] },
          { name:"Pistol Squat Progression", sets:"2 × 5 (her bacak)", muscle:"Quad, glute, denge — tek bacak squat dayanıklılığı", how:["Sandalye desteğiyle başla","Tek ayakla aşağı otur — kontrollü 3sn","Topukla patlayıcı kalk","Her haftada destek azalt"], avoid:"Topuğun kalkması", warn:"DİZ + MENİSKÜS: Sandalye destekli — yük kontrollü. Sağ bacak için özellikle dikkat. Dayanıklılık odaklı: 8 tekrar", alts:["Reverse Lunge","Box Squat"] },
          { name:"Single Leg Glute Bridge", sets:"3 × 20 (her bacak)", muscle:"Glute max, hamstring — tek bacak güç", how:["Sırt üstü — sol diz bükülü, sağ bacak uzatılmış","Sol topukla it — kalçayı kaldır","Zirve: 2 sn sıkıştır","Kontrollü in — yere değmeden"], avoid:"Beli hiperextend etme", warn:"DİZ: Sol bacakla çalışırken sağ diz stres yok. Sağ bacakla dikkat — tam uzatma", alts:["Hip Thrust (sandalyede)"] },
        ]},

        { name: "🎯 CORE — Anterior Zincir", color: "#6C3483", exercises: [
          { name:"Hollow Body Hold", sets:"4 × 20sn", muscle:"Anterior core — handstand, L-sit, planche'ın motoru", how:["Sırt üstü — kollar kulaklara yapışık uzatılmış","Bacaklar düz 20-30° yukarıda","Bel yerde — yere basıyor gibi hisset","20 sn tut"], avoid:"Belin yükselmesi", warn:"Tüm kalistenik hareketlerin çekirdeği", alts:["Bent Knee Hollow"] },
          { name:"Dead Bug", sets:"3 × 12 (her taraf)", muscle:"Core anti-extension stabilite", how:["Sırt üstü — kollar yukarı, dizler 90°","Karşı kol-bacak uzat — 3 sn tut","Alt sırt yerde kalacak","Geri — diğer taraf"], avoid:"Beli yerden kaldırma", warn:"BEL FITIĞI: En güvenli core egzersizi", alts:[] },
          { name:"Bird Dog", sets:"3 × 8 (her taraf)", muscle:"Core anti-extension stabilite, erektör spinae, glute — bel fıtığı için güvenli", how:["Dört ayak — el omuz altında, diz kalça altında","Sağ kolu öne, sol bacağı geriye uzat","3 sn tut — bel nötral, kalça simetrik","Yavaşça geri — diğer taraf"], avoid:"Kalçanın dönmesi veya belin çökmesi", warn:"BEL FITIĞI: Bird Dog klinik kanıtlı lumbar stabilizasyon egzersizi. Dead Bug'dan sonra yapılır", alts:[] },
        ]},

        { name: "⚡ KONDİSYON — Hızlı Yürüyüş", color: "#990000", exercises: [
          { name:"Hızlı Yürüyüş", sets:"30 dakika sürekli", muscle:"Aerobik kapasite, bacak dayanıklılığı", how:["Normal yürüyüş temponun %80'i — hafif terleme","Dik postür — omuzlar geri","10 dk hızlı + 2 dk normal tempo × 2 tur + 6 dk soğuma","Toplamda 30 dk — Zone 2 aerobik baz"], avoid:"Koşmaya geçme — menisküs riski", warn:"MENİSKÜS: Koşu yerine hızlı yürüyüş — aerobik kazanım %70 korunur", alts:["Merdiven çıkma (yavaş)","Statik bisiklet"] },
        ]},
      ],
    },

    // ── GÜN 2 — PERŞEMBE ────────────────────────────────────────
    {
      id: 2, title: "GÜN 2", sub: "PERŞEMBE",
      focus: "L-sit + Pull Dominant",
      duration: "~74 dk", color: "#2A9D8F", type: "training",
      injury: "⚠️ BEL FITIĞI: Inverted row'da omurga nötral. DİZ: Bulgarian split squat'ta ön dizi takip et. OMUZ: L-sit sırasında omuz depresyonu — kulağa kaldırma.",
      blocks: [
        { name: "🔥 ISINMA — Mobilite", color: "#CC5500", exercises: [
          { name:"Cat-Cow Mobilite", sets:"2 × 10", muscle:"Torasik + lumbar mobilite", how:["Dört ayak — nefes ritmiyle","Cow: nefes al, beli sarkıt","Cat: nefes ver, beli yukarı"], avoid:"Beli aşırı sarkıtma", warn:"BEL + BOYUN FITIĞI: Her gün başlangıç", alts:[] },
          { name:"Reverse Lunge (ağırlıksız)", sets:"2 × 8 (her bacak)", muscle:"Kalça ve bacak aktivasyon", how:["Sağ ayağı geriye adım at","Diz yere yakın","Ön ayakla it — dön"], avoid:"Ön dizi çok öne götürme", warn:"DİZ + MENİSKÜS: Geriye hamle — öne göre daha az knee stress", alts:[] },
          { name:"Wrist Rotation", sets:"2 × 30sn (her yön)", muscle:"Bilek mobilite — handstand ve L-sit için", how:["Eller önde — bilekleri daire çiz","30 sn saat yönü, 30 sn karşıtı","Hafif baskı yaparak geniş daire"], avoid:"Zorla itme — bilek kırılgandır", warn:"Handstand ve L-sit için bilek sağlığı kritik", alts:[] },
        ]},

        { name: "🛡 SAKATILIK PROTOKOLÜ — Zorunlu", color: "#7B241C", exercises: [
          { name:"External Rotation (Towel/Yerçekimi)", sets:"3 × 15 (her taraf)", muscle:"Rotator cuff aktif stabilizasyon", how:["Yanına yat — dirsek 90°","Yerçekimiyle yavaş aşağı sal","Yavaşça yukarı kaldır","1 sn tut"], avoid:"Omzun kulağa kalkması", warn:"ROTATOR CUFF: Her gün zorunlu", alts:[] },
          { name:"Scapular Wall Slide", sets:"2 × 10", muscle:"Serratus anterior, trapez", how:["Sırtını duvara daya","W'den U'ya kaydır","Kürek kemikleri duvarda"], avoid:"Kürek kemiklerinin ayrılması", warn:"ROTATOR CUFF + KİFOZ: Her gün", alts:[] },
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Derin boyun fleksörleri", how:["Dik otur","Çeneni geriye it","2 sn tut"], avoid:"Başı eğme", warn:"BOYUN FITIĞI: Zorunlu", alts:[] },
        ]},

        { name: "🪑 SKİLL — L-sit Progression", color: "#2A9D8F", exercises: [
          { name:"Floor L-sit Tuck Hold", sets:"5 × max süre", muscle:"Hip flexor, core basınç, triceps stabilite", how:["Yere otur — eller kalçanın yanında yerde","Kolları düzelt — kalçayı kaldır","Dizleri göğse çek — tuck pozisyon","Süreyi kaydet — her set artır"], avoid:"Omuzların kulağa kalkması — aşağı bas", warn:"L-sit'in 1. adımı — önce süreyi uzat. 10sn tuck = bir sonraki seviye", alts:[] },
          { name:"Chair L-sit Tuck Hold", sets:"4 × max süre", muscle:"Hip flexor, core, omuz stabilitesi", how:["İki sandalye yan yana — aralarında dur","Her iki elle sandalye oturağına bas","Kolları düzelt — kalçayı kaldır","Dizleri çek — tuck"], avoid:"Sandalyelerin kayması", warn:"Zemin versiyonundan daha uzun süre tutulur — daha kolay", alts:["Floor L-sit Tuck"] },
          { name:"L-sit Leg Extension", sets:"3 × 3-5 tekrar (her bacak)", muscle:"Hip flexor güç — tam L-sit'e geçiş", how:["Chair tuck pozisyonunda","Tek bacağı yavaşça uzat","2 sn tam uzatılmış tut","Geri çek — diğer bacak"], avoid:"Vücudun aşağı düşmesi", warn:"Tuck'tan full L-sit'e köprü — sabır gerekir", alts:[] },
        ]},

        { name: "⚖️ DENGE & HIZ", color: "#E76F51", exercises: [
          { name:"Tek Ayak Denge (Göz Kapalı)", sets:"3 × 20sn (her bacak)", muscle:"Propriyosepsiyon, vestibüler sistem, ayak bileği stabilite", how:["Tek ayakta dur","10 sn gözler açık — alış","Gözleri kapat — 20 sn tut","Zorlanırsan öne bak, tekrar kapat"], avoid:"Tutunma — düşme hissi normaldir başta", warn:"DİZ + MENİSKÜS: Göz kapalı denge eklem stabilitesini hızla artırır. Menisküs rehabilitasyonunda kanıt var", alts:[] },
          { name:"Tempo Inverted Row", sets:"3 × 8 (3sn in, 1sn tut, patlayıcı çık)", muscle:"Mid sırt, rhomboid, biceps — hız + kontrol entegrasyonu", how:["Masa altı pozisyon","3 saniyede yavaşça in — kontrol","Zirvede 1 sn tut — kürek kemikleri sıkı","Patlayıcı çek — hızlı üste gel"], avoid:"Sallanma — her tekrar kontrollü başla", warn:"Tempo çalışması: kas-nöromüsküler koordinasyon geliştirir. Normal row'dan 2 kat etkili", alts:[] },
        ]},

        { name: "💪 KUVVET — Pull + Squat + Hinge", color: "#2A9D8F", exercises: [
          { name:"Inverted Row (Masa Altı)", sets:"4 × max", muscle:"Mid sırt, rhomboid, biceps — çekiş zinciri", how:["Masanın altına uzan — göğüs masa altında","Topuklardan asıl — vücut düz tahta gibi","Göğsü masaya çek — kürek kemiklerini sıkıştır","Yavaş in — tam uzat"], avoid:"Kalçanın yere değmesi — vücut düz", warn:"BEL FITIĞI: Omurga nötral. Salonda pull-up olan kişi için en iyi ev alternatifi", alts:["Towel Row (kapıdan)"] },
          { name:"Inverted Row Üst Tutma", sets:"3 × 5sn (her tekrar sonrası)", muscle:"Mid sırt, rhomboid, biseps — isometrik zirve kontraksiyon", how:["Inverted Row'un üst pozisyonunda dur","Göğüs masaya değiyor — kürek kemikleri tam sıkışmış","5 sn tut — nefes al","Yavaşça in — tekrar"], avoid:"Momentum kullanma", warn:"Pull çekiş gücünü yavaş kontrollü pekiştirir. Push:Pull dengesizliğini giderir", alts:[] },
          { name:"Bulgarian Split Squat (Sandalye)", sets:"2 × 10 (her bacak)", muscle:"Quad, glute — unilateral güç", how:["Arka ayak sandalyede","Ön diz topuğun üzerinde","Dikey olarak in — 90°","Ön ayakla it — kalk"], avoid:"Ön dizi ayak ucunu geçirme", warn:"DİZ + MENİSKÜS: Ön dizi izle. Ağrıda reverse lunge'a geç", alts:["Reverse Lunge"] },
          { name:"Archer Push-up", sets:"2 × 8 (her taraf)", muscle:"Göğüs unilateral güç — tek kol push-up temeli", how:["Normal push-up pozisyonu","Sol kolu yana uzat — düz ama serbest","Sağ kolun üzerine in","It — dön — diğer taraf"], avoid:"Serbest kolun kenetlenmesi — rahat sallanmalı", warn:"ROTATOR CUFF: Tek taraflı yükleme — ağrıda normal push-up'a dön", alts:["Wide Push-up"] },
          { name:"Duvar Hip Hinge", sets:"3 × 12", muscle:"Hamstring, glute, erektör spinae — bel dostu posterior chain", how:["Duvara ~30cm mesafede dur — sırtın duvara dönük","Kalçayı duvara doğru geri it — duvar sınırı koyuyor","Sırt düz — hamstringte gerilme hissedince dur","Kalçayı öne it — kalk"], avoid:"Sırtı yuvarlama — disk riski", warn:"BEL FITIĞI: Duvar hip hinge spinal yükü sıfırlar — duvar hareket sınırını güvenle belirler. Good Morning'den çok daha güvenli", alts:["Romanian Deadlift (ağırlıksız)"] },
        ]},

        { name: "⚡ KONDİSYON — AMRAP Bodyweight", color: "#990000", exercises: [
          { name:"AMRAP Bodyweight 12 Dakika", sets:"12 dakika × maksimum tur", muscle:"Full body dayanıklılık", how:["1 tur: 5 Push-up + 5 Inverted Row + 10 Reverse Lunge (her bacak)","Mümkün olduğunca çok tur — 8 dk","Her turu say — ilerlemeyi takip et","Form bozulmadan devam"], avoid:"Sadece kolay hareketleri seçme", warn:"Aerobik eşikte çalış — koşu yok", alts:["5 tur × 3 dk çalışma / 1 dk dinlenme"] },
        ]},
      ],
    },

    // ── GÜN 3 — CUMARTESİ ───────────────────────────────────────
    {
      id: 3, title: "GÜN 3", sub: "CUMARTESİ",
      focus: "Full Skill + Ağırlıklı Hacim",
      duration: "~105 dk", color: "#F4A261", type: "training",
      injury: "⚠️ BEL FITIĞI: Tüm hinge hareketlerde nötral omurga. DİZ: Pistol squat derinliği — ağrıda yarı ROM. OMUZ: Planche lean'de bilek ve omuz dikkat.",
      blocks: [
        { name: "🔥 ISINMA — Kapsamlı", color: "#CC5500", exercises: [
          { name:"Cat-Cow Mobilite", sets:"2 × 10", muscle:"Torasik + lumbar mobilite", how:["Nefes ritmiyle 10 tekrar"], avoid:"Beli aşırı sarkıtma", warn:"BEL + BOYUN FITIĞI", alts:[] },
          { name:"Hip Circle", sets:"2 × 10 (her yön)", muscle:"Kalça mobilite", how:["Büyük daire — 10 saat yönü, 10 karşıtı"], avoid:null, warn:"DİZ: Kalça açıklığı", alts:[] },
          { name:"Shoulder Cross Stretch", sets:"2 × 30sn", muscle:"Posterior kapsül", how:["Kolunu göğüs önünde çek — 30 sn"], avoid:null, warn:"ROTATOR CUFF", alts:[] },
          { name:"Wrist Rotation", sets:"2 × 30sn", muscle:"Bilek mobilite", how:["Her iki yön — 30 sn"], avoid:null, warn:"Handstand ve planche için", alts:[] },
        ]},

        { name: "🛡 SAKATILIK PROTOKOLÜ — Zorunlu", color: "#7B241C", exercises: [
          { name:"External Rotation (Towel/Yerçekimi)", sets:"3 × 15 (her taraf)", muscle:"Rotator cuff", how:["Yanına yat — yerçekimi direnci","Yavaş kaldır — 1 sn tut"], avoid:"Omzun kalkması", warn:"ROTATOR CUFF: Her gün zorunlu", alts:[] },
          { name:"Scapular Wall Slide", sets:"2 × 10", muscle:"Serratus, trapez", how:["W'den U'ya — kürek kemikleri duvarda"], avoid:"Ayrılma", warn:"KİFOZ + ROTATOR CUFF", alts:[] },
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Derin boyun fleksörleri", how:["Çeneni geriye it — 2 sn"], avoid:"Başı eğme", warn:"BOYUN FITIĞI: Zorunlu", alts:[] },
        ]},

        { name: "🙃 SKİLL — Handstand + L-sit Kombine", color: "#8338EC", exercises: [
          { name:"Wall Handstand Hold", sets:"5 × max süre", muscle:"Omuz + core stabilite — haftalık en uzun süre", how:["Duvara karşı — elle 10-15cm","Bir bacağı at — diğerini takip et","Topuklar duvarda — core sıkı","Süreyi kaydet — her haftada artması lazım"], avoid:"Beli büküp muz pozu yapma", warn:"OMUZ: Ağrıda hemen in. BOYUN: Nötral pozisyon", alts:["Wall Walk"] },
          { name:"Chair L-sit Tuck Hold", sets:"5 × max süre", muscle:"L-sit progressionu — haftalık en uzun süre", how:["İki sandalye — eller oturağa","Kollar düz — kalça kalkık","Dizler göğse — tuck","Süreyi kaydet"], avoid:"Omuzların kulağa kalkması", warn:"Salı'dan daha uzun süre hedefle", alts:["Floor L-sit Tuck"] },
          { name:"Planche Lean", sets:"4 × 20sn", muscle:"Anterior core, omuz anterior, bilek — planche temeli", how:["Push-up pozisyonunda","Vücudu öne doğru eğ — omuzlar elin önüne geç","Topuklar yerden kalkabilir","Kollar düz — 20 sn tut"], avoid:"Beli büküp öne eğme — vücut düz çizgi", warn:"ROTATOR CUFF: Hafif hissedilir — ağrıda dur. BEL: Korunma için core sıkı", alts:["Frog Stand"] },
        ]},

        { name: "⚖️ DENGE & HIZ", color: "#E76F51", exercises: [
          { name:"Tek Ayak RDL (Denge Odaklı)", sets:"3 × 8 (her bacak)", muscle:"Hamstring, glute, propriyosepsiyon — dinamik denge", how:["Sağ ayakta dur — sol ayak havada","Öne eğil kalçadan — sağ bacak diz hafif bükülü","Sol bacak arkaya uzar — denge noktasını bul","Kalçayı öne it — kalk — her seferinde yavaş"], avoid:"Beli yuvarlama — nötral omurga", warn:"DİZ + MENİSKÜS: Dinamik tek ayak denge — menisküs için en iyi rehabilitasyon hareketi. Sağ bacak için yavaş başla", alts:["Destekli Tek Ayak RDL (duvara 1 parmak)"] },
        ]},

        { name: "💪 KUVVET — Full Body Hacim", color: "#F4A261", exercises: [
          { name:"Inverted Row (Masa Altı)", sets:"3 × max", muscle:"Mid sırt, rhomboid, biceps", how:["Masanın altında — göğsü masaya çek","Kürek kemiklerini sıkıştır — 1 sn tut","Kontrollü in"], avoid:"Kalçanın sarkması", warn:"BEL FITIĞI: Nötral omurga", alts:[] },
          { name:"Pseudo-Planche Push-up", sets:"2 × 10", muscle:"Ön delt dominant, triceps, serratus — planche prep", how:["Push-up pozisyonunda","Elleri kalçaya doğru döndür — parmaklar arkaya","Vücudu öne eğ — planche lean pozisyonu","Bu pozisyondan push-up yap"], avoid:"Dirseklerin aşırı bükülmesi", warn:"ROTATOR CUFF: Bilek ve omuz üzerinde — ağrıda normal push-up'a geç", alts:["Pike Push-up"] },
          { name:"Pistol Squat Progression", sets:"2 × 8 (her bacak)", muscle:"Quad, glute — maksimum BW güç", how:["Sandalye desteği azalt her hafta","Derin otur — tek ayakta","Topukla it — kalk","Haftalık ilerlemeyi not et"], avoid:"Topuğun kalkması", warn:"DİZ + MENİSKÜS: Ağrıda derinliği azalt. Sağ bacak için özellikle dikkat", alts:["Bulgarian Split Squat (sandalye)"] },
          { name:"Hip Thrust (Sandalye)", sets:"3 × 20", muscle:"Glute max, hamstring — posterior chain en güçlü ev hareketi", how:["Sırtın sandalyeye — omuz bıçakları sandalye kenarında","Her iki ayak yerde — diz 90°","Kalçayı it — tam uzat — 2 sn sıkıştır","Kontrollü in"], avoid:"Beli hiperextend etme", warn:"BEL FITIĞI: Kalça hareketi — omurga sabit. DİZ: Topukta baskı — diz ağrısı azalır", alts:["Single Leg Glute Bridge"] },
        ]},

        { name: "🎯 CORE — Haftalık Hacim", color: "#6C3483", exercises: [
          { name:"Hollow Body Hold", sets:"5 × 25sn", muscle:"Anterior core zinciri", how:["Kollar kulaklara — bacaklar 20-30°","Bel yerde — 25 sn"], avoid:"Belin yükselmesi", warn:"Tüm kalistenik hareketlerin temeli", alts:[] },
          { name:"Side Plank", sets:"3 × 40sn (her taraf)", muscle:"Oblique, QL — lateral stabilite", how:["Dirsek omuz altında — kalça kaldır — 40 sn"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Her iki taraf eşit", alts:[] },
        ]},

        { name: "⚡ KONDİSYON — Yürüyüş", color: "#990000", exercises: [
          { name:"Hızlı Yürüyüş", sets:"30 dakika sürekli", muscle:"Aerobik kapasite — haftalık en uzun Zone 2", how:["4 dk hızlı + 1 dk normal ritim","Dik postür — omuzlar geri","Mümkünse yokuşlu güzergah","30 dk"], avoid:"Koşmaya geçme", warn:"MENİSKÜS: Hızlı yürüyüş → haftalık aerobik baz", alts:["Statik bisiklet 30dk"] },
        ]},

        { name: "❄️ SOĞUMA", color: "#F4A261", exercises: [
          { name:"Child's Pose", sets:"1 × 60sn", muscle:"Sırt, omuz, kalça", how:["Kolları öne uzat — 60 sn"], avoid:null, warn:null, alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hip flexor, kasık", how:["Yarım diz — kalçayı öne it — 45 sn"], avoid:"Gövdeyi öne eğme", warn:"Günlük şart", alts:[] },
          { name:"Supine Spinal Twist", sets:"1 × 45sn (her taraf)", muscle:"Torasik rotasyon", how:["Dizi karşı tarafa yatır — omuz yerde — 45 sn"], avoid:"Omuzların kalkması", warn:"SKOLYOZ: Her iki tarafa eşit", alts:[] },
        ]},
      ],
    },

    // ── GÜN 4 — PAZAR ───────────────────────────────────────────
    {
      id: 4, title: "GÜN 4", sub: "PAZAR",
      focus: "Denge + Kondisyon",
      duration: "~110 dk", color: "#8338EC", type: "training",
      injury: "⚠️ Max test: yorgun değil, taze. Sakatlık protokolünden hemen sonra. BOYUN: Handstand'da boyun nötral.",
      blocks: [
        { name: "🔥 ISINMA — Kapsamlı", color: "#CC5500", exercises: [
          { name:"Cat-Cow Mobilite", sets:"2 × 10", muscle:"Torasik + lumbar", how:["Nefes ritmiyle"], avoid:null, warn:"BEL + BOYUN FITIĞI", alts:[] },
          { name:"Hip Circle", sets:"2 × 10 (her yön)", muscle:"Kalça mobilite", how:["Her iki yön"], avoid:null, warn:null, alts:[] },
          { name:"Wrist Rotation", sets:"2 × 30sn", muscle:"Bilek mobilite", how:["Her iki yön"], avoid:null, warn:"Handstand için", alts:[] },
          { name:"Shoulder Cross Stretch", sets:"2 × 30sn (her taraf)", muscle:"Posterior kapsül", how:["30 sn her taraf"], avoid:null, warn:"ROTATOR CUFF", alts:[] },
        ]},

        { name: "🛡 SAKATILIK PROTOKOLÜ — Zorunlu", color: "#7B241C", exercises: [
          { name:"External Rotation (Towel/Yerçekimi)", sets:"3 × 15 (her taraf)", muscle:"Rotator cuff", how:["Yanına yat — yerçekimi direnci"], avoid:"Omzun kalkması", warn:"Her gün zorunlu", alts:[] },
          { name:"Scapular Wall Slide", sets:"2 × 10", muscle:"Serratus, trapez", how:["W'den U'ya"], avoid:null, warn:"KİFOZ + ROTATOR CUFF", alts:[] },
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Çeneni geriye it"], avoid:null, warn:"BOYUN FITIĞI: Zorunlu", alts:[] },
        ]},

        { name: "📊 İLERLEME KONTROLÜ — 2 Haftada Bir (Opsiyonel)", color: "#8338EC", exercises: [
          { name:"Wall Handstand Hold Max", sets:"2 set × max süre", muscle:"Omuz + core — haftalık süre rekoru", how:["Duvara karşı kick-up","Her seti kaydet","Setler arası tam dinlenme"], avoid:"Beli büküp muz pozu", warn:"ROTATOR CUFF: Ağrıda hemen in. BOYUN: Nötral", alts:[] },
          { name:"L-sit Max Süre", sets:"2 set × max süre", muscle:"Hip flexor + core — haftalık süre rekoru", how:["Sandalye veya zemin","En uzun süreyi kaydet","Her hafta artması hedef"], avoid:"Omuzların kulağa kalkması", warn:"İlerlemeyi bu test gösterir", alts:[] },
          { name:"Push-up Max Test", sets:"1 set × maksimum (2 haftada bir)", muscle:"Göğüs, triceps, core — üst push gücü", how:["Temiz form — göğüs yere değiyor","Core sıkı — vücut düz","Her tekrarı say — kaydet"], avoid:"Kalçayı havaya kaldırma", warn:"Taktik atlet standardı: 40+ tekrar hedef", alts:[] },
          { name:"Inverted Row Max Test", sets:"1 set × maksimum (2 haftada bir)", muscle:"Sırt, biceps — çekiş gücü", how:["Masa altında — vücut düz","Göğsü masaya çek — sayımı kaydet"], avoid:"Kalçanın yere değmesi", warn:"Pull-up karşılığı ev testi", alts:[] },
        ]},

        { name: "⚖️ DENGE & HIZ", color: "#E76F51", exercises: [
          { name:"Single Leg Balance Reach (Y-Balance)", sets:"3 × 5 yön (her bacak)", muscle:"Tüm denge sistemi — ayak bileği, diz, kalça koordinasyonu", how:["Sağ ayakta dur","Sol ayakla 3 yöne uzaklık say: öne, yana, geriye çapraz","Her uzanmada denge bozulmayacak","5 yön her bacak — simetri önemli"], avoid:"Destek ayağın topuğunun kalkması", warn:"MENİSKÜS + DİZ: Y-Balance testi klinik standart. Hem rehabilitasyon hem test. Sağ-sol farkı kapandıkça sağlamlık geldi demek", alts:["Tek Ayak Denge Hold (basit)"] },
        ]},

        { name: "💪 KUVVET — Tamamlayıcı", color: "#8338EC", exercises: [
          { name:"Pistol Squat Progression", sets:"2 × 6 (her bacak)", muscle:"Tek bacak güç — haftalık en ağır", how:["Bu hafta sandalye desteği önceki haftadan az","Derinliği artır — kontrollü","6 tekrar her bacak"], avoid:"Topuğun kalkması", warn:"DİZ + MENİSKÜS: Sağ bacak dikkat", alts:["Bulgarian Split Squat"] },
          { name:"Hip Thrust (Sandalye)", sets:"3 × 15", muscle:"Glute max — posterior güç", how:["Sırtın sandalyeye","Kalçayı it — 2 sn sıkıştır","Kontrollü in"], avoid:"Beli hiperextend etme", warn:"BEL FITIĞI: Kalça hareketi — omurga sabit", alts:[] },
        ]},

        { name: "🎯 CORE — Haftalık Kapanış", color: "#6C3483", exercises: [
          { name:"Hollow Body Hold", sets:"3 × 25sn", muscle:"Anterior core — haftalık en uzun", how:["30 sn — nefesi kesme","Her hafta artır"], avoid:"Belin yükselmesi", warn:"Kalisteniğin temeli", alts:[] },
          { name:"Side Plank", sets:"2 × 45sn (her taraf)", muscle:"Oblique, QL", how:["45 sn — her taraf"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Eşit süre", alts:[] },
        ]},

        { name: "⚡ KONDİSYON — Uzun Zone 2", color: "#990000", exercises: [
          { name:"Hızlı Yürüyüş", sets:"30 dakika sürekli", muscle:"Aerobik baz — haftalık en uzun", how:["Hafif terleme — konuşabilirsin","Dik postür","Mümkünse yokuşlu","30 dk kesintisiz"], avoid:"Koşmaya geçme", warn:"MENİSKÜS: Hızlı yürüyüş yeterli aerobik uyaran", alts:["Statik bisiklet 30dk"] },
        ]},

        { name: "❄️ SOĞUMA — Derin Esneme", color: "#8338EC", exercises: [
          { name:"Child's Pose", sets:"1 × 60sn", muscle:"Sırt, omuz, kalça", how:["60 sn"], avoid:null, warn:null, alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hip flexor, kasık", how:["Yarım diz — 45 sn"], avoid:"Öne eğilme", warn:"Oturan biri için şart", alts:[] },
          { name:"Supine Spinal Twist", sets:"1 × 45sn (her taraf)", muscle:"Torasik rotasyon", how:["Dizi karşıya — 45 sn"], avoid:"Omuzların kalkması", warn:"SKOLYOZ: Eşit", alts:[] },
          { name:"Pigeon Pose", sets:"1 × 60sn (her taraf)", muscle:"Piriformis, kalça", how:["Ön bacak yatay — 60 sn"], avoid:"Zorla yapma", warn:"DİZ: Ön bacağı ayarla", alts:[] },
        ]},
      ],
    },

    // ── OFF GÜNLER ───────────────────────────────────────────────
    {
      id: 5, title: "OFF 1", sub: "PAZARTESİ",
      focus: "Mobilite + Hafif Aktivasyon", duration: "~20 dk", color: "#6C757D", type: "offday",
      blocks: [
        { name: "🧘 MOBİLİTE (5 dk)", color: "#6C757D", exercises: [
          { name:"Cat-Cow Mobilite", sets:"2 × 10", muscle:"Torasik + lumbar mobilite", how:["Sabah kalktığında — 10 tekrar nefes ritmiyle"], avoid:null, warn:"BEL + BOYUN FITIĞI", alts:[] },
          { name:"Wrist Rotation", sets:"2 × 30sn (her yön)", muscle:"Bilek mobilite", how:["Her iki yön — handstand öncesi zorunlu"], avoid:null, warn:"Handstand için bilek ısınması", alts:[] },
          { name:"Chin Tuck", sets:"2 × 12", muscle:"Boyun fleksörleri", how:["Çeneni geriye it — 2 sn"], avoid:null, warn:"BOYUN FITIĞI: Off günde bile atlanmaz", alts:[] },
        ]},
        { name: "🙃 HANDSTAND PRATİK (10 dk)", color: "#8338EC", exercises: [
          { name:"Pike Hold", sets:"3 × 20sn", muscle:"Omuz stabilite, core anterior", how:["Kalçayı havaya kaldır — kollar kulakların arasında","V pozisyonu — omuzlar aktif","20 sn tut — nefes alma"], avoid:"Dirsekleri bükme", warn:"ROTATOR CUFF: Ağrı yoksa devam. Sabah soğukta küçük başla", alts:[] },
        ]},
      ],
    },
    {
      id: 6, title: "OFF 2", sub: "ÇARŞAMBA",
      focus: "L-sit Pratik + Yürüyüş", duration: "~25 dk", color: "#6C757D", type: "offday",
      blocks: [
        { name: "🛡 SAKATILIK PROTOKOLÜ (3 dk)", color: "#7B241C", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Derin boyun fleksörleri", how:["Dik otur","Çeneni geriye it — 2 sn","Bırak — tekrar"], avoid:"Başı eğme", warn:"BOYUN FITIĞI: Off günde bile atlanmaz — her gün 3dk yeterli", alts:[] },
          { name:"Scapular Wall Slide", sets:"2 × 10", muscle:"Serratus anterior, trapez — postür", how:["Sırtını duvara daya","W'den U'ya kaydır","Kürek kemikleri duvarda"], avoid:"Ayrılma", warn:"ROTATOR CUFF + KİFOZ: Her gün şart", alts:[] },
        ]},
        { name: "🪑 L-SİT PRATİK (10 dk)", color: "#2A9D8F", exercises: [
          { name:"Floor L-sit Tuck Hold", sets:"5 × max süre", muscle:"Hip flexor, core basınç, triceps", how:["Zemin — dizleri çek","Her seti kaydet — kaç saniye?","Setler arası 45 sn","Yorgunluk hissettirmemeli — pratik, antrenman değil"], avoid:"Omuzların kulağa kalkması — aşağı bas", warn:"L-sit günde 2 kez kısa pratik yapan kişi, haftada 1 kez uzun yapandan çok daha hızlı ilerler", alts:[] },
          { name:"Chair L-sit Tuck Hold", sets:"4 × max süre", muscle:"L-sit progressionu", how:["İki sandalye — tuck pozisyon","Zemin versiyonundan daha uzun süre tutulur","Her setте bir öncekinden daha uzun dene"], avoid:"Sandalyelerin kayması — sabitle", warn:"Motor öğrenme: sık kısa pratik > seyrek uzun pratik", alts:["Floor L-sit Tuck"] },
        ]},
        { name: "🚶 YÜRÜYÜŞ + MOBİLİTE (15 dk)", color: "#6C757D", exercises: [
          { name:"Hızlı Yürüyüş", sets:"20 dakika sürekli", muscle:"Aktif recovery, aerobik", how:["Hafif terleme seviyesinde","Dik postür — omuzlar geri","Tempo stabil — 20 dk kesintisiz"], avoid:"Koşma", warn:"MENİSKÜS: Günlük yürüyüş eklem sağlığını korur", alts:[] },
        ]},
      ],
    },
    {
      id: 7, title: "OFF 3", sub: "CUMA",
      focus: "Mobilite + Cumartesi Hazırlığı", duration: "~20 dk", color: "#6C757D", type: "offday",
      blocks: [
        { name: "🙃 HANDSTAND PRATİK (10 dk)", color: "#8338EC", exercises: [
          { name:"Wrist Rotation", sets:"2 × 30sn (her yön)", muscle:"Bilek ısınma", how:["Her iki yön — 30 sn"], avoid:null, warn:"Handstand öncesi zorunlu bilek ısınması", alts:[] },
          { name:"Pike Hold", sets:"3 × 20sn", muscle:"Omuz aktivasyon", how:["V pozisyon — 20 sn","Cumartesiye hazırlık"], avoid:"Dirsekleri bükme", warn:"ROTATOR CUFF: Hafif hissedilir — normal", alts:[] },
        ]},
        { name: "🔋 CUMARTESİ HAZIRLIK MOBİLİTE (10 dk)", color: "#6C757D", exercises: [
          { name:"Shoulder Cross Stretch", sets:"2 × 30sn (her taraf)", muscle:"Posterior kapsül", how:["Kolunu göğüs önünde — diğer elle çek — 30 sn"], avoid:null, warn:"ROTATOR CUFF: Ertesi gün full skill var", alts:[] },
          { name:"Hip Circle", sets:"2 × 10 (her yön)", muscle:"Kalça mobilite", how:["Her iki yön — büyük daire"], avoid:null, warn:null, alts:[] },
          { name:"Cat-Cow Mobilite", sets:"2 × 10", muscle:"Torasik + lumbar", how:["Nefes ritmiyle 10 tekrar"], avoid:null, warn:"BEL + BOYUN FITIĞI", alts:[] },
        ]},
        { name: "🚶 DAYANIKLILIK — Aerobik Baz", color: "#2A9D8F", exercises: [
          { name:"Hızlı Yürüyüş", sets:"15 dakika sürekli", muscle:"Aerobik kapasite — haftalık kondisyon birikimi", how:["Hafif tempo — Zone 2","Dik postür","Yarın Cumartesi full antrenman var — hafif tut","15 dk kesintisiz"], avoid:"Koşma — menisküs", warn:"MENİSKÜS: Yürüyüş her off günde aerobik bazı korur. Cumartesi yoğun geçecek — bu hazırlık", alts:["Statik bisiklet 15dk"] },
        ]},
      ],
    },
  ],
};
