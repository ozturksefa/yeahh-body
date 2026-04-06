// ─────────────────────────────────────────────────────────────
// EV PROGRAMI — Ekipmansız 1 Ay
// Araçlar: Masa/tezgah (inverted row) + Sandalye (dip, Bulgarian)
// Zemin + Duvar her zaman mevcut
// Kondisyon: Hızlı yürüyüş (menisküs uyumlu)
// ─────────────────────────────────────────────────────────────

export const PROGRAM_HOME = {
  meta: {
    name: "Ev Programı",
    phase: "1 Ay — Salondan Uzak",
    weeks: "Hafta 1–4",
    description: "Ekipmansız. Masa + sandalye + zemin + duvar. Handstand ve L-sit gelişimi için altın ay. Sprint yok — hızlı yürüyüş kondisyon.",
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
          { name:"Wall Walk", sets:"4 × 3 tekrar", muscle:"Omuz, core, bilek stabilite", how:["Push-up pozisyonunda başla — ayaklar duvarda","Yavaşça elleri duvara yaklaştır — ayaklar yukarı","Duvara 30-40cm yaklaşınca dur","Geri in — kontrollü"], avoid:"Beli aşırı bükme — duvarda kavis yapma", warn:"OMUZ: İlk haftada 3-4 adımda dur. Sinir sistemi adapte olunca artır", alts:["Pike Hold"] },
          { name:"Wall Handstand Hold", sets:"4 × max süre", muscle:"Omuz + core stabilite — full handstand pozisyonu", how:["Duvara karşı dön — elleri 10-15cm duvara yakın","Bir bacağı at — diğerini takip et","Vücut duvara yapışık — topuklar duvarda","Gözler ellerin arasında — 0 aşağı bakma"], avoid:"Beli aşırı bükme — muz pozu", warn:"BOYUN FITIĞI: Boyunu hiperekstansiyona getirme — nötral pozisyon. ROTATOR CUFF: Ağrıda hemen in", alts:["Wall Walk"] },
        ]},

        { name: "💪 KUVVET — Push + Hip Extension", color: "#C1121F", exercises: [
          { name:"Diamond Push-up", sets:"4 × max", muscle:"Triceps dominant, göğüs iç kısmı, ön delt", how:["Eller birbirine yakın — elmas şekli","Dirsekler vücuda paralel","Göğüs yere değince kalk","Yavaş in, hızlı çık"], avoid:"Dirseklerin dışa açılması", warn:"ROTATOR CUFF: Elmas tutuş dirsek merkezli — omuz baskısı az. Ağrıda geniş tutuşa geç", alts:["Close-grip Push-up"] },
          { name:"Pike Push-up", sets:"4 × 8", muscle:"Ön delt dominant — handstand push-up temeli", how:["Kalçayı havaya kaldır — V şekli","Başı ellerin arasına indir","Dirsekler biraz dışa","İt — tam kalk"], avoid:"Kalçayı düşürme — plank değil pike", warn:"ROTATOR CUFF: Vertical push — en doğal overhead. Ağrıda range azalt", alts:["Decline Push-up"] },
          { name:"Chair Dip", sets:"4 × max", muscle:"Triceps, alt göğüs, ön delt", how:["Sırtın sandalyeye — eller omuz genişliğinde","Dizler 90° veya uzatılmış","Kalçayı aşağı indir — dirsekler 90°","It — tam kalk"], avoid:"Sandalye kaymasın — sabitle. Çok öne eğilme", warn:"DİZ: Uzatılmış bacak versiyonu daha zor ama diz stres az. OMUZ: 90° altına inme", alts:["Floor Dip"] },
          { name:"Decline Push-up (Ayaklar Sandalyede)", sets:"3 × max", muscle:"Üst göğüs, ön delt, triceps", how:["Ayakları sandalyeye koy","Vücut düz — kalça ne yukarı ne aşağı","Normal push-up hareketi","Dirsekler 45°"], avoid:"Sandalye kaymasın", warn:"ROTATOR CUFF: Yüksek ön delt aktivasyonu — ağrıda normal push-up'a geç", alts:["Incline Push-up"] },
          { name:"Single Leg Glute Bridge", sets:"4 × 12 (her bacak)", muscle:"Glute max, hamstring — tek bacak güç", how:["Sırt üstü — sol diz bükülü, sağ bacak uzatılmış","Sol topukla it — kalçayı kaldır","Zirve: 2 sn sıkıştır","Kontrollü in — yere değmeden"], avoid:"Beli hiperextend etme", warn:"DİZ: Sol bacakla çalışırken sağ diz stres yok. Sağ bacakla dikkat — tam uzatma", alts:["Hip Thrust (sandalyede)"] },
        ]},

        { name: "🎯 CORE — Anterior Zincir", color: "#6C3483", exercises: [
          { name:"Hollow Body Hold", sets:"4 × 20sn", muscle:"Anterior core — handstand, L-sit, planche'ın motoru", how:["Sırt üstü — kollar kulaklara yapışık uzatılmış","Bacaklar düz 20-30° yukarıda","Bel yerde — yere basıyor gibi hisset","20 sn tut"], avoid:"Belin yükselmesi", warn:"Tüm kalistenik hareketlerin çekirdeği", alts:["Bent Knee Hollow"] },
          { name:"Dead Bug", sets:"3 × 8 (her taraf)", muscle:"Core anti-extension stabilite", how:["Sırt üstü — kollar yukarı, dizler 90°","Karşı kol-bacak uzat — 3 sn tut","Alt sırt yerde kalacak","Geri — diğer taraf"], avoid:"Beli yerden kaldırma", warn:"BEL FITIĞI: En güvenli core egzersizi", alts:[] },
          { name:"Side Plank", sets:"2 × 40sn (her taraf)", muscle:"Oblique, QL — lateral stabilite", how:["Dirsek omuz altında","Kalçayı kaldır — düz çizgi","40 sn tut"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Her iki taraf eşit — atlama", alts:[] },
        ]},

        { name: "⚡ KONDİSYON — Hızlı Yürüyüş", color: "#990000", exercises: [
          { name:"Hızlı Yürüyüş", sets:"20 dakika sürekli", muscle:"Aerobik kapasite, bacak dayanıklılığı", how:["Normal yürüyüş temponun %80'i — hafif terleme","Dik postür — omuzlar geri","4 dk hızlı + 1 dk normal tempo","Toplamda 20 dk"], avoid:"Koşmaya geçme — menisküs riski", warn:"MENİSKÜS: Koşu yerine hızlı yürüyüş — aerobik kazanım %70 korunur", alts:["Merdiven çıkma (yavaş)","Statik bisiklet"] },
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

        { name: "💪 KUVVET — Pull + Squat + Hinge", color: "#2A9D8F", exercises: [
          { name:"Inverted Row (Masa Altı)", sets:"4 × max", muscle:"Mid sırt, rhomboid, biceps — çekiş zinciri", how:["Masanın altına uzan — göğüs masa altında","Topuklardan asıl — vücut düz tahta gibi","Göğsü masaya çek — kürek kemiklerini sıkıştır","Yavaş in — tam uzat"], avoid:"Kalçanın yere değmesi — vücut düz", warn:"BEL FITIĞI: Omurga nötral. Salonda pull-up olan kişi için en iyi ev alternatifi", alts:["Towel Row (kapıdan)"] },
          { name:"Bulgarian Split Squat (Sandalye)", sets:"4 × 8 (her bacak)", muscle:"Quad, glute — unilateral güç", how:["Arka ayak sandalyede","Ön diz topuğun üzerinde","Dikey olarak in — 90°","Ön ayakla it — kalk"], avoid:"Ön dizi ayak ucunu geçirme", warn:"DİZ + MENİSKÜS: Ön dizi izle. Ağrıda reverse lunge'a geç", alts:["Reverse Lunge"] },
          { name:"Archer Push-up", sets:"3 × 5 (her taraf)", muscle:"Göğüs unilateral güç — tek kol push-up temeli", how:["Normal push-up pozisyonu","Sol kolu yana uzat — düz ama serbest","Sağ kolun üzerine in","It — dön — diğer taraf"], avoid:"Serbest kolun kenetlenmesi — rahat sallanmalı", warn:"ROTATOR CUFF: Tek taraflı yükleme — ağrıda normal push-up'a dön", alts:["Wide Push-up"] },
          { name:"Good Morning (Ağırlıksız)", sets:"3 × 12", muscle:"Hamstring, erektör spinae — posterior chain", how:["Ayakta — eller ensede veya önde","Kalçayı geriye it — öne değil","Sırt düz — hamstringte gerilme hissedince dur","Kalçayı öne it — kalk"], avoid:"Sırtı yuvarlama — disk riski", warn:"BEL FITIĞI: Ağırlıksız iyi morning — posterior chain'i çalıştırır. Hafif ROM ile başla", alts:["Romanian Deadlift (ağırlıksız)"] },
          { name:"Pistol Squat Progression", sets:"4 × 5 (her bacak)", muscle:"Quad, glute, denge — en etkili BW squat", how:["Sandalyeye tek ayakla otur pozisyonunda başla","Sol ayakla it — kalk (sandalye destekli)","İlerledikçe sandayleyi uzaklaştır","Tam pistol: bir ayakta tam aşağı — tam yukarı"], avoid:"Topuğun kalkması — denge bozulur", warn:"DİZ + MENİSKÜS: Sandalye destekli başla — yük kontrolü. Ağrıda derinliği azalt", alts:["Assisted Pistol (sandalye)"] },
        ]},

        { name: "⚡ KONDİSYON — AMRAP Bodyweight", color: "#990000", exercises: [
          { name:"AMRAP Bodyweight 8 Dakika", sets:"8 dakika × maksimum tur", muscle:"Full body dayanıklılık", how:["1 tur: 5 Push-up + 5 Inverted Row + 10 Reverse Lunge (her bacak)","Mümkün olduğunca çok tur — 8 dk","Her turu say — ilerlemeyi takip et","Form bozulmadan devam"], avoid:"Sadece kolay hareketleri seçme", warn:"Aerobik eşikte çalış — koşu yok", alts:["5 tur × 3 dk çalışma / 1 dk dinlenme"] },
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

        { name: "💪 KUVVET — Full Body Hacim", color: "#F4A261", exercises: [
          { name:"Inverted Row (Masa Altı)", sets:"5 × max", muscle:"Mid sırt, rhomboid, biceps", how:["Masanın altında — göğsü masaya çek","Kürek kemiklerini sıkıştır — 1 sn tut","Kontrollü in"], avoid:"Kalçanın sarkması", warn:"BEL FITIĞI: Nötral omurga", alts:[] },
          { name:"Pseudo-Planche Push-up", sets:"4 × 8", muscle:"Ön delt dominant, triceps, serratus — planche prep", how:["Push-up pozisyonunda","Elleri kalçaya doğru döndür — parmaklar arkaya","Vücudu öne eğ — planche lean pozisyonu","Bu pozisyondan push-up yap"], avoid:"Dirseklerin aşırı bükülmesi", warn:"ROTATOR CUFF: Bilek ve omuz üzerinde — ağrıda normal push-up'a geç", alts:["Pike Push-up"] },
          { name:"Pistol Squat Progression", sets:"5 × 5 (her bacak)", muscle:"Quad, glute — maksimum BW güç", how:["Sandalye desteği azalt her hafta","Derin otur — tek ayakta","Topukla it — kalk","Haftalık ilerlemeyi not et"], avoid:"Topuğun kalkması", warn:"DİZ + MENİSKÜS: Ağrıda derinliği azalt. Sağ bacak için özellikle dikkat", alts:["Bulgarian Split Squat (sandalye)"] },
          { name:"Hip Thrust (Sandalye)", sets:"4 × 15", muscle:"Glute max, hamstring — posterior chain en güçlü ev hareketi", how:["Sırtın sandalyeye — omuz bıçakları sandalye kenarında","Her iki ayak yerde — diz 90°","Kalçayı it — tam uzat — 2 sn sıkıştır","Kontrollü in"], avoid:"Beli hiperextend etme", warn:"BEL FITIĞI: Kalça hareketi — omurga sabit. DİZ: Topukta baskı — diz ağrısı azalır", alts:["Single Leg Glute Bridge"] },
          { name:"Archer Push-up", sets:"4 × 6 (her taraf)", muscle:"Unilateral göğüs ve omuz — tek kol push-up temeli", how:["Sol kolu yana uzat — serbest","Sağ kolun üzerine in","It — dön — diğer taraf"], avoid:"Serbest kolun zeminde baskı yapması", warn:"ROTATOR CUFF: Ağrıda normal push-up'a geç", alts:["Wide Push-up"] },
        ]},

        { name: "🎯 CORE — Haftalık Hacim", color: "#6C3483", exercises: [
          { name:"Hollow Body Hold", sets:"5 × 25sn", muscle:"Anterior core zinciri", how:["Kollar kulaklara — bacaklar 20-30°","Bel yerde — 25 sn"], avoid:"Belin yükselmesi", warn:"Tüm kalistenik hareketlerin temeli", alts:[] },
          { name:"Side Plank", sets:"3 × 40sn (her taraf)", muscle:"Oblique, QL — lateral stabilite", how:["Dirsek omuz altında — kalça kaldır — 40 sn"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Her iki taraf eşit", alts:[] },
          { name:"Copenhagen Plank (Sandalye)", sets:"2 × 20sn (her taraf)", muscle:"Adduktör, lateral core", how:["Yan yat — üst ayak sandalye kenarında","Kalçayı kaldır — düz çizgi","20 sn"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Lateral core dengesizliği için kritik", alts:[] },
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
      focus: "Max Test + Zone 2",
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

        { name: "🏆 MAX TEST — Haftalık Ölçüm", color: "#8338EC", exercises: [
          { name:"Wall Handstand Hold Max", sets:"3 set × max süre", muscle:"Omuz + core — haftalık süre rekoru", how:["Duvara karşı kick-up","Her seti kaydet","Setler arası tam dinlenme"], avoid:"Beli büküp muz pozu", warn:"ROTATOR CUFF: Ağrıda hemen in. BOYUN: Nötral", alts:[] },
          { name:"L-sit Max Süre", sets:"3 set × max süre", muscle:"Hip flexor + core — haftalık süre rekoru", how:["Sandalye veya zemin","En uzun süreyi kaydet","Her hafta artması hedef"], avoid:"Omuzların kulağa kalkması", warn:"İlerlemeyi bu test gösterir", alts:[] },
          { name:"Push-up Max Test", sets:"3 set × maksimum", muscle:"Göğüs, triceps, core — üst push gücü", how:["Temiz form — göğüs yere değiyor","Core sıkı — vücut düz","Her tekrarı say — kaydet"], avoid:"Kalçayı havaya kaldırma", warn:"Taktik atlet standardı: 40+ tekrar hedef", alts:[] },
          { name:"Inverted Row Max Test", sets:"3 set × maksimum", muscle:"Sırt, biceps — çekiş gücü", how:["Masa altında — vücut düz","Göğsü masaya çek — sayımı kaydet"], avoid:"Kalçanın yere değmesi", warn:"Pull-up karşılığı ev testi", alts:[] },
        ]},

        { name: "💪 KUVVET — Güç Odaklı", color: "#8338EC", exercises: [
          { name:"Planche Lean", sets:"5 × 25sn", muscle:"Anterior chain — planche temeli", how:["Omuzlar elin önüne geçecek kadar eğil","Kollar düz — vücut düz çizgi","25 sn tut"], avoid:"Beli büküp öne eğme", warn:"ROTATOR CUFF: Hafif hissedilir — ağrıda dur", alts:[] },
          { name:"Diamond Push-up", sets:"5 × max", muscle:"Triceps + göğüs — güç setleri", how:["Eller elmas — yavaş in, hızlı çık","Her seti kaydet"], avoid:"Dirseklerin dışa açılması", warn:"ROTATOR CUFF: Ağrıda geniş tutuşa geç", alts:[] },
          { name:"Pistol Squat Progression", sets:"4 × 6 (her bacak)", muscle:"Tek bacak güç — haftalık en ağır", how:["Bu hafta sandalye desteği önceki haftadan az","Derinliği artır — kontrollü","6 tekrar her bacak"], avoid:"Topuğun kalkması", warn:"DİZ + MENİSKÜS: Sağ bacak dikkat", alts:["Bulgarian Split Squat"] },
          { name:"Hip Thrust (Sandalye)", sets:"5 × 12", muscle:"Glute max — posterior güç", how:["Sırtın sandalyeye","Kalçayı it — 2 sn sıkıştır","Kontrollü in"], avoid:"Beli hiperextend etme", warn:"BEL FITIĞI: Kalça hareketi — omurga sabit", alts:[] },
        ]},

        { name: "🎯 CORE — Haftalık Kapanış", color: "#6C3483", exercises: [
          { name:"Hollow Body Hold", sets:"5 × 30sn", muscle:"Anterior core — haftalık en uzun", how:["30 sn — nefesi kesme","Her hafta artır"], avoid:"Belin yükselmesi", warn:"Kalisteniğin temeli", alts:[] },
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
      focus: "Aktif Recovery", duration: "~10 dk", color: "#6C757D", type: "offday",
      blocks: [
        { name: "🧘 AKTİF RECOVERY", color: "#6C757D", exercises: [
          { name:"Cat-Cow Mobilite", sets:"2 × 10", muscle:"Torasik mobilite", how:["Sabah kalktığında"], avoid:null, warn:"BEL + BOYUN", alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor", how:["Yarım diz"], avoid:null, warn:null, alts:[] },
          { name:"Chin Tuck", sets:"2 × 12", muscle:"Boyun", how:["Çeneni geriye it"], avoid:null, warn:"BOYUN FITIĞI: Off günde bile", alts:[] },
        ]},
      ],
    },
    {
      id: 6, title: "OFF 2", sub: "ÇARŞAMBA",
      focus: "Mobilite + Yürüyüş", duration: "~20 dk", color: "#6C757D", type: "offday",
      blocks: [
        { name: "🚶 ÇARŞAMBA RECOVERY", color: "#6C757D", exercises: [
          { name:"Cat-Cow Mobilite", sets:"2 × 10", muscle:"Torasik mobilite", how:["10 tekrar"], avoid:null, warn:null, alts:[] },
          { name:"Hızlı Yürüyüş", sets:"15 dakika sürekli", muscle:"Aktif recovery", how:["Hafif tempo — nefes normal"], avoid:"Koşma", warn:"MENİSKÜS: Yürüyüş her gün yapılabilir", alts:[] },
          { name:"Scapular Wall Slide", sets:"2 × 10", muscle:"Postür kasları", how:["W'den U'ya"], avoid:null, warn:"ROTATOR CUFF", alts:[] },
        ]},
      ],
    },
    {
      id: 7, title: "OFF 3", sub: "CUMA",
      focus: "Cumartesi Hazırlığı", duration: "~10 dk", color: "#6C757D", type: "offday",
      blocks: [
        { name: "🔋 CUMARTESİ HAZIRLIĞI", color: "#6C757D", exercises: [
          { name:"Wrist Rotation", sets:"2 × 30sn", muscle:"Bilek mobilite", how:["Her iki yön"], avoid:null, warn:"Yarın handstand var", alts:[] },
          { name:"Shoulder Cross Stretch", sets:"2 × 30sn (her taraf)", muscle:"Posterior kapsül", how:["30 sn her taraf"], avoid:null, warn:"ROTATOR CUFF", alts:[] },
          { name:"Hip Circle", sets:"2 × 10 (her yön)", muscle:"Kalça mobilite", how:["Her iki yön"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },
  ],
};
