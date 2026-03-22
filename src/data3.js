export const PROGRAM3 = {
  meta: {
    name: "Atletik Dayanıklılık",
    phase: "Faz 1 — Temel Atletizm",
    weeks: "Hafta 1–8",
    description: "Askeri/itfaiye dayanıklılık felsefesi. Her günde 6 temel kalıp: Push, Pull, Hinge, Squat, Carry, Locomotion. İzolasyon yok. Kondisyon her gün farklı.",
  },

  principles: [
    "Her sette hareket kalitesi önce — ağırlık sonra",
    "Kondisyon antrenmanı asla atlanmaz",
    "Her gün tüm vücut aktif — split yok",
    "Nefes kontrolü her harekette — asla tutma",
    "Yorgunlukta form bozuluyorsa dur — asla devam etme",
  ],

  days: [
    // ─────────────────────────────────────────────────
    {
      id: 1, title: "GÜN 1", sub: "SALI", focus: "Kuvvet Bazı", duration: "~75 dk", color: "#C1121F",
      type: "training",
      injury: "⚠️ Omuz: Overhead press ağrıda landmine'a geç. Diz: RDL ve hip hinge öncelikli — squat yoksa Bulgarian Split Squat.",
      conditioning: "Sprint Interval — en yüksek kardiyovasküler stres",
      blocks: [
        { name: "🔥 ISINMA — Postür & Aktivasyon", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Derin boyun fleksörleri", how:["Dik dur","Çeneni geri it","2 sn tut"], avoid:"Başı aşağı eğme", warn:null, alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid, postür", how:["Bandı önde omuz hizasında","Yanlara aç — 1 sn tut","Kontrollü geri"], avoid:"Omuzları kulağa kaldırma", warn:null, alts:[] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Torasik mobilite", how:["Kürek kemikleri hizasında","Geriye uzan, göğsü aç"], avoid:"Bel üzerinde yapma", warn:"KİFOZ KRİTİK", alts:[] },
          { name:"Shoulder CARs", sets:"2 × 5 (her taraf)", muscle:"Glenohumeral mobilite", how:["Kolu yavaşça tam daire çiz","5 sn bir tur"], avoid:"Gövdeyi döndürme", warn:"Rotator cuff ısınma", alts:[] },
          { name:"Hip Hinge", sets:"2 × 10", muscle:"Posterior chain aktivasyon", how:["Ayakta dik","Kalçayı geriye it — öne değil","Sırt düz, dizler hafif bükülü","Geri gel"], avoid:"Sırtı büküp öne eğme", warn:"Deadlift öncesi şart", alts:[] },
          { name:"Supine Hip Rotation", sets:"2 × 8 (her taraf)", muscle:"Kalça rotatorları", how:["Sırt üstü, dizi yana yatır","10 sn tut"], avoid:"Ağrıda daha az range", warn:null, alts:[] },
        ]},

        { name: "🏋️ KUVVET — Compound Ağırlık", color: "#C1121F", exercises: [
          { name:"Dumbbell Deadlift", sets:"5 × 5", muscle:"Tüm posterior chain — hamstring, glute, sırt erektör, trapez", how:["Ayaklar kalça genişliğinde","Sırt düz — göğsü aç önce","Kürek kemiklerini aşağı çek","Kalçayı öne iterek kalk — dumbbelllar bacak yanında"], avoid:"Sırtı büküp öne eğme — nötral omurga şart", warn:"SKOLYOZ: Her sette simetriyi hisset. En önemli hareket.", alts:["Trap Bar Deadlift","Barbell Deadlift","Hex Bar Deadlift"] },
          { name:"Landmine Press", sets:"4 × 8 (her taraf)", muscle:"Ön/orta delt, triceps, serratus anterior, core anti-rotation", how:["Barlın serbest ucunu tut — göğüs hizasında","Çapraz yukarı it — tam uzatma","Yavaşça geri al","SKOLYOZ: Core sıkı, bel nötral"], avoid:"Beli hiperextend etme", warn:"ROTATOR CUFF: En güvenli overhead alternatif", alts:["DB Overhead Press","Push Press","Arnold Press"] },
          { name:"Weighted Pull Up / Assisted", sets:"5 × 3–5", muscle:"Lat, teres major, biceps, rear delt — tüm çekme zinciri", how:["Pronasyon tutuş — omuz genişliğinden geniş","Aktif omuz — kulağa çekme","Göğsü bara doğru çek","3 sn aşağı — full range"], avoid:"Momentum kullanma — temiz tekrar", warn:"Konsantrik yapamazsan negatifle yap — 5 sn indir", alts:["Assisted Pull Up","Lat Pulldown","Negative Pull Up"] },
          { name:"Barbell / DB Bent Over Row", sets:"3 × 6", muscle:"Mid trapez, rhomboid, lat, posterior delt, biceps", how:["45° öne eğik — sırt düz","Barlı/DB'yi karın/alt göğse çek","Kürek kemiklerini sıkıştır — 1 sn tut","Kontrollü indir"], avoid:"Gövdeyi kaldırma — sadece kollar çalışır", warn:"SKOLYOZ: Bilateral row — simetri kontrol et", alts:["Single Arm DB Row","Cable Row","Meadows Row"] },
          { name:"Bulgarian Split Squat", sets:"3 × 6 (her bacak)", muscle:"Quad, glute, hip flexor — unilateral bütünsel", how:["Arka ayak bench'te — ön diz hizasında","Dikey olarak in — öne değil","Ön topuk yerde kalacak","Ön ayakla it — kalça öne"], avoid:"Ön dizi ayak ucunu geçirme", warn:"DİZ: Ağrıda reverse lunge'a geç — daha az knee dominant", alts:["Reverse Lunge","Step Down","Single Leg Squat to Box"] },
        ]},

        { name: "🤸 KALİSTENİK — Push Skill", color: "#E76F51", exercises: [
          { name:"Push Up Variations", sets:"4 × max (temiz form)", muscle:"Göğüs, triceps, ön delt, serratus, core", how:["Normal → Diamond → Pike sırasıyla","Her sette ulaşabildiğin en zor versiyona geç","Temiz form bozulunca dur — tekrar sayma","10 sn set arası dinlenme yok — direkt geç"], avoid:"Kalça yukarı ya da aşağı sarkmasın", warn:"Asker/itfaiye testi standardı — temiz tekrar sayılır", alts:["Incline Push Up","Archer Push Up"] },
        ]},

        { name: "🔄 KOMPLİMENTER — Hinge & Carry", color: "#1A3A5C", exercises: [
          { name:"Kettlebell Swing", sets:"4 × 15", muscle:"Glute, hamstring, core — patlayıcı hip extension", how:["Hip hinge — squat değil","KB bacaklar arasından geri götür","Kalçayı patlayıcı öne it — KB omuz hizasına","Nefes: it → dışarı, geri → içeri"], avoid:"Kollarla kaldırmaya çalışma — güç kalçadan gelir", warn:"DİZ: Diz bükme değil kalça hareketi — güvenli", alts:["Dumbbell Swing","Hip Hinge (hızlı)","Romanian DL (hızlı tempo)"] },
          { name:"Double Farmer Carry", sets:"4 × 30m", muscle:"Grip, trapez, core statik, ayak bileği stabilite, full body", how:["Her iki elde ağır DB/KB","Dik dur — omuzlar geri ve aşağı","Küçük hızlı adımlar","Nefes almayı kesme — steady"], avoid:"Öne eğilme veya yana sallanma", warn:"Ağır tut — konuşamayacak kadar zor olmalı", alts:["Suitcase Carry","Overhead Carry","Sandbag Carry"] },
        ]},

        { name: "🎯 CORE — Anti-Rotasyon & Stabilite", color: "#6C63FF", exercises: [
          { name:"Dead Bug", sets:"3 × 10 (her taraf)", muscle:"Transversus abdominis, core anti-extension", how:["Sırt üstü — kollar tavana, dizler 90°","Sağ kol + sol bacağı uzat","BEL YERDE KALACAK","Yavaş — nefesle birlikte"], avoid:"Beli yerden kaldırma", warn:"SKOLYOZ: En önemli core hareketi", alts:["Bird Dog","Hollow Body Hold"] },
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique, quadratus lumborum", how:["Dirsek omuz altında","Kalça yukarı — düz çizgi","Üst kolu tavana"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Her iki taraf eşit süre"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
        ]},

        { name: "⚡ KONDİSYON — Sprint Interval", color: "#990000", exercises: [
          { name:"Sprint Interval", sets:"6 × 30sn sprint / 30sn yürüyüş", muscle:"Full body — kardiyovasküler kapasite, bacak gücü, core", how:["30 sn maksimum efor koşu veya rowing","30 sn aktif yürüyüş / kürek makinesi hafif","6 tur — dinlenmeden","Son 2 turda bile hız düşmemeli — bu kondisyon göstergesi"], avoid:"Orta tempo koşu — ya sprint ya dinlenme", warn:"Diz ağrısı varsa koşu yerine rowing veya bike", alts:["Rowing Machine Interval","Assault Bike","Jump Rope HIIT"] },
        ]},

        { name: "❄️ SOĞUMA", color: "#C1121F", exercises: [
          { name:"Child's Pose", sets:"1 × 60sn", muscle:"Sırt, omuz, kalça", how:["Kolları öne uzat — nefes al"], avoid:null, warn:null, alts:[] },
          { name:"Hamstring, Obliques and Lat Stretch", sets:"2 × 45sn", muscle:"3 bölge", how:["Otur, bacağı uzat, öne eğil"], avoid:null, warn:null, alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hip flexor, kasık", how:["Yarım diz, kalçayı öne it"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Right", sets:"1 × 45sn", muscle:"Torasik rotasyon", how:["Sırt üstü, dizi karşı tarafa"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Left", sets:"1 × 45sn", muscle:"Her taraf eşit", how:["Sol dizi sağ tarafa yatır"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },

    // ─────────────────────────────────────────────────
    {
      id: 2, title: "GÜN 2", sub: "PERŞEMBE", focus: "Kalistenik Dayanıklılık", duration: "~75 dk", color: "#2A9D8F",
      type: "training",
      injury: "⚠️ Omuz: Pull-up'ta kürek kemikleri aktif. Diz: Carry ve locomotion odak — bacak kuvveti dize yük bindirmeden.",
      conditioning: "Amrap / Timed Circuit — anaerobik eşik",
      blocks: [
        { name: "🔥 ISINMA — Mobilite & Aktivasyon", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Dik dur","Çeneni geri it"], avoid:null, warn:null, alts:[] },
          { name:"Cat and Cow", sets:"2 × 10", muscle:"Omurga mobilite", how:["Dört ayak","Nefesle birlikte — yavaş"], avoid:"Sadece belden yapma", warn:"SKOLYOZ simetri", alts:[] },
          { name:"Band External Rotation", sets:"2 × 15 (her taraf)", muscle:"Rotator cuff ısınma", how:["Dirsek 90° yanında","Dışa döndür — kontrollü"], avoid:"Dirseği kaldırma", warn:"Pull-up öncesi zorunlu", alts:[] },
          { name:"Dead Hang", sets:"2 × 30sn", muscle:"Lat aktivasyon, grip, omurga dekompresyon", how:["Bardan asıl — aktif omuz","Nefes al — omurgayı uzat"], avoid:"Pasif asılma", warn:null, alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor açılımı", how:["Yarım diz","Kalçayı öne it"], avoid:null, warn:null, alts:[] },
          { name:"Supine Hip Rotation", sets:"2 × 8 (her taraf)", muscle:"Kalça rotatorları", how:["Sırt üstü, dizi yana yatır"], avoid:null, warn:null, alts:[] },
        ]},

        { name: "🤸 KALİSTENİK — Pull Skill Progressif", color: "#2A9D8F", exercises: [
          { name:"Pull Up Ladder", sets:"5 tur: 1-2-3-2-1", muscle:"Lat, teres major, biceps, core — tüm çekme zinciri", how:["1 tekrar → dinlen 30sn → 2 tekrar → 30sn → 3 tekrar","Sonra 2 → 1 sırasıyla iner","Temiz form: göğsü bara çek, tam aşağı in","Yapamıyorsan mevcut seviyen kadar"], avoid:"Kısmi range — tam in, tam çık", warn:"Haftadan haftaya merdiven artar", alts:["Chin Up","Assisted Pull Up","Lat Pulldown"] },
          { name:"Scapula Pull Up", sets:"3 × 12", muscle:"Lat aktivasyon, scapula kontrol", how:["Bardan asıl","Sadece kürek kemiklerini aşağı çek","Dirsek bükülmez"], avoid:"Dirsek bükme", warn:null, alts:[] },
          { name:"Dip", sets:"3 × max", muscle:"Triceps, alt göğüs, ön delt", how:["Kolları tam uzat","Yavaşça in — 90° dirsek","Patlayıcı yukarı"], avoid:"Omuzları kulağa kaldırma", warn:"Ağrıda Dip Negative", alts:["Bench Dip","Dip Negative"] },
        ]},

        { name: "🏋️ KUVVET — Press & Row Supersets", color: "#1A3A5C", exercises: [
          { name:"Push Up to Row (DB)", sets:"4 × 8 (her taraf)", muscle:"Göğüs + sırt + core — bütünsel stabilite", how:["Push up pozisyonu — her elde DB","1 push up yap","Sağ DB ile row çek","1 push up — sol DB ile row","= 1 tekrar"], avoid:"Kalçayı döndürme row sırasında — core sıkı", warn:"En fonksiyonel superset — fire/military standardı", alts:["Renegade Row","Push Up + Separate Row"] },
          { name:"Inverted Row", sets:"4 × max", muscle:"Mid sırt, rhomboid, biceps, core — bodyweight pull", how:["Barın altına uzan — topuklar yerde","Vücut düz çizgi — core sıkı","Göğsü bara çek","3 sn indir"], avoid:"Kalça düşmesin — vücut düz", warn:"Pull-up'a giden yol — ne kadar eğik o kadar zor", alts:["TRX Row","Smith Machine Row"] },
          { name:"Single Arm DB Press (Alternating)", sets:"4 × 8 (her taraf)", muscle:"Ön/orta delt, triceps, core anti-rotation", how:["Ayakta veya oturarak","Tek elle press — diğer el serbest","Core: döndürme tepkisi ver","Simetrik güç geliştir"], avoid:"Gövdeyi yana eğme", warn:"SKOLYOZ: Unilateral press asimetriyi giderir", alts:["DB Shoulder Press (bilateral)","Landmine Press"] },
        ]},

        { name: "🔄 LOKOMOSYON & CARRY", color: "#8B4513", exercises: [
          { name:"Bear Crawl", sets:"4 × 20m", muscle:"Omuz stabilite, core anti-extension, quad, kondisyon", how:["Dört ayak — dizler yerden 5 cm","Çapraz hareket: sağ el + sol ayak","Bel sabit — kalça yukarı çıkmasın","Nefesi tutma"], avoid:"Kalçayı kaldırma", warn:"Omuz cerrahisi standart hareketi — rotator cuff için ideal", alts:["Crab Walk","Leopard Crawl"] },
          { name:"Suitcase Carry (Tek El)", sets:"3 × 30m (her el)", muscle:"Core lateral stabilite, trapez, grip, quadratus lumborum", how:["Tek elde ağır DB/KB","Dik dur — yana eğilme","Karşı taraf core'u sıkı tut","Her el ayrı"], avoid:"Yana eğilme — bu egzersizin amacını yok eder", warn:"SKOLYOZ: En iyi lateral core egzersizi", alts:["Suitcase Deadlift","Offset Carry"] },
        ]},

        { name: "🎯 CORE — Dinamik", color: "#6C63FF", exercises: [
          { name:"Bird Dog", sets:"3 × 10 (her taraf)", muscle:"Erector spinae, glute, core stabilite", how:["Dört ayak — omurga nötral","Sağ kol + sol bacağı uzat","3 sn tut"], avoid:"Beli sağa sola döndürme", warn:"SKOLYOZ şart", alts:["Dead Bug"] },
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique", how:["Dirsek omuz altında","Kalça yukarı"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Her iki taraf eşit"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
          { name:"Hollow Body Hold", sets:"3 × 20sn", muscle:"Anterior core zinciri", how:["Sırt üstü","Kollar kulakların yanında","Bacaklar 45° — bel yerde"], avoid:"Beli kaldırma", warn:null, alts:["Tuck Hold"] },
        ]},

        { name: "⚡ KONDİSYON — AMRAP Circuit", color: "#990000", exercises: [
          { name:"AMRAP 8 Dakika", sets:"8 dakika × maksimum tur", muscle:"Full body — aerobik + anaerobik kondisyon", how:["5 Push Up","5 Inverted Row / Band Pull","10 Glute Bridge","15 Jump Rope veya Jumping Jack","Dinlenmeden — tur sayısını not al","Her hafta 1 tur daha hedefle"], avoid:"Tempoyu düşürme — sürekli hareket", warn:"İtfaiye/askeri dayanıklılık standardı bu tür circuitlerle ölçülür", alts:["Tabata","5 tur sabit süre"] },
        ]},

        { name: "❄️ SOĞUMA", color: "#2A9D8F", exercises: [
          { name:"Lat Stretch Chair", sets:"1 × 45sn (her taraf)", muscle:"Lat", how:["Sandalyeye tutun, kalçayı dışa it"], avoid:null, warn:null, alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hip flexor", how:["Yarım diz"], avoid:null, warn:null, alts:[] },
          { name:"Prone Cobra Stretch", sets:"2 × 30sn", muscle:"Omurga ekstansörler, göğüs", how:["Yüzüstü yat","Kolları düz it — göğsü kaldır","Beli değil göğsü aç"], avoid:"Boyun germe", warn:"KİFOZ KRİTİK", alts:[] },
          { name:"Seated Forward Fold", sets:"1 × 60sn", muscle:"Hamstring, alt sırt", how:["Bacaklar uzatılmış","Öne doğru uzan — pasif"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },

    // ─────────────────────────────────────────────────
    {
      id: 3, title: "GÜN 3", sub: "CUMARTESİ", focus: "Fonksiyonel Güç", duration: "~80 dk", color: "#F4A261",
      type: "training",
      injury: "⚠️ DİZ: Yük taşıma ve hinge odak — squat varsa sığ range. Omuz: Rotator cuff prehab ısınmada.",
      conditioning: "Yük Taşıma Devresi — dayanıklılık gücü",
      blocks: [
        { name: "🔥 ISINMA — Fonksiyonel Hazırlık", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Dik dur","Çeneni geri it"], avoid:null, warn:null, alts:[] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Torasik mobilite", how:["Kürek kemikleri hizasında","Geriye uzan"], avoid:"Bel üzerinde yapma", warn:"KİFOZ KRİTİK", alts:[] },
          { name:"World Greatest Stretch", sets:"2 × 5 (her taraf)", muscle:"Kalça, torasik, omuz — full body ısınma", how:["Büyük adım at — lunge pozisyonu","Ön ayağın yanına aynı elin elini koy","Kolu tavana doğru aç — gözler elle","Topu üzerinde dur — topuğu it"], avoid:"Aceleyle yapma — kontrollü", warn:"Tüm vücut tek harekette ısınır", alts:["Leg Swing + Thoracic Rotation ayrı"] },
          { name:"Glute Bridge Hamstring Walk", sets:"3 × 12", muscle:"Glute + hamstring aktivasyon", how:["Sırt üstü kalçayı kaldır","Ayakları yavaşça öne yürüt","Kalça hep yukarıda — asla indir","Geri yürüt"], avoid:"Kalçayı düşürme", warn:null, alts:["Floor Bridge"] },
          { name:"Prone Y-T-W", sets:"2 × 10", muscle:"Alt trapez, rhomboid, rotator cuff", how:["Yüzüstü yat","Y-T-W sırasıyla — kaldır, tut, indir"], avoid:"Boyun sıkışması", warn:"Rotator cuff prehab", alts:[] },
        ]},

        { name: "🏋️ KUVVET — Posterior Chain", color: "#F4A261", exercises: [
          { name:"Romanian Deadlift", sets:"4 × 8", muscle:"Hamstring, glute, sırt erektör — arka zincir", how:["Dizler hafif bükülü — sabit kalacak","Kalçayı geriye it","Dumbbellları bacak boyunca indir","Hamstrings'de gerilme hissedince dur — geri"], avoid:"Sırtı büküp öne eğilme", warn:"SKOLYOZ: Her sette omurga nötrali kontrol et", alts:["Single Leg RDL","Cable Pull Through"] },
          { name:"Single Leg RDL", sets:"3 × 8 (her bacak)", muscle:"Hamstring, glute — unilateral hinge", how:["Tek ayak üzerinde dur","Kalçayı geriye iterek öne eğil","Sırt düz — karşı bacak geriye uzanır","Hamstrings gerilince geri gel"], avoid:"Beli büküp öne eğilme", warn:"DİZ: Fonksiyonel — squat yok", alts:["RDL bilateral","KB Single Leg RDL"] },
          { name:"Single Arm DB Row (Ağır)", sets:"4 × 6 (her taraf)", muscle:"Lat, mid sırt — unilateral güç", how:["Bench'e dizi ve eli daya","Ağır dumbbell — güçlü çek","Kürek kemiğini tam geri çek","3 sn indir — tam germe"], avoid:"Gövdeyi döndürme", warn:"SKOLYOZ: Her iki taraf eşit güç kritik", alts:["Cable Row","Chest Supported Row"] },
          { name:"Floor Press", sets:"4 × 8", muscle:"Göğüs, triceps, ön delt — zeminde limitli range", how:["Sırt üstü yat — dizler bükülü","DB'leri yan tarafta — dirsekler yerde","Göğse doğru in — dirsekler yere değince dur","İt — tam uzatma"], avoid:"Bileği büküp bırakma", warn:"ROTATOR CUFF: En güvenli press — sınırlı range", alts:["Incline DB Press","Push Up Ağırlıklı"] },
        ]},

        { name: "🤸 KALİSTENİK — Skill Transfer", color: "#E76F51", exercises: [
          { name:"Chin Up", sets:"4 × max", muscle:"Biceps ağırlıklı pull — supinasyon gücü", how:["Supinasyon tutuş — avuç içe","Göğsü bara çek","3 sn indir — full range"], avoid:"Momentum", warn:null, alts:["Assisted Chin Up","Negative Chin Up"] },
          { name:"Pike Push Up", sets:"3 × 10", muscle:"Ön delt, triceps — overhead push skill", how:["Ters V pozisyonu","Başı yere doğru indir","Patlayıcı yukarı"], avoid:"Kalçayı düşürme", warn:"HSPU'ya giden yol", alts:["Elevated Pike"] },
          { name:"L-sit Tuck Hold", sets:"3 × 15sn", muscle:"Hip flexor, core, triceps — pozisyon gücü", how:["Parallel bar veya iki sandalye","Dizleri göğse çek","15 sn tut — nefes alma"], avoid:"Öne eğilme", warn:null, alts:["Knee Tuck Hold","Floor L-sit"] },
        ]},

        { name: "🔄 FONKSİYONEL KOMPLİMENTER", color: "#8B4513", exercises: [
          { name:"Sandbag / DB Complex", sets:"3 tur × dinlenmeden", muscle:"Tüm vücut — fonksiyonel dayanıklılık", how:["1: RDL × 6","2: Bent Over Row × 6","3: High Pull × 6 — KB'yi çeneye doğru","4: Press × 6","Her hareketi bırakmadan yap","Tur arası 90 sn"], avoid:"Çok ağır — form bozulur", warn:"Hafif ağırlık al — full hareket önemli", alts:["KB Complex","Barbell Complex"] },
        ]},

        { name: "🎯 CORE — Rotasyon & Lateral", color: "#6C63FF", exercises: [
          { name:"Dead Bug", sets:"3 × 10 (her taraf)", muscle:"Core stabilite", how:["Bel yerde kalacak"], avoid:"Beli kaldırma", warn:"SKOLYOZ şart", alts:[] },
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique", how:["Kalça yukarı"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Her iki taraf eşit"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
          { name:"Copenhagen Plank Left", sets:"2 × 20sn", muscle:"Adduktör, lateral core", how:["Yana yat — üst ayak bench'te","Alt bacak havada — kaldır"], avoid:"Kalçayı düşürme", warn:null, alts:[] },
          { name:"Copenhagen Plank Right", sets:"2 × 20sn", muscle:"Her iki taraf eşit", how:["Her iki taraf eşit"], avoid:"Kalçayı düşürme", warn:null, alts:[] },
        ]},

        { name: "⚡ KONDİSYON — Yük Taşıma Devresi", color: "#990000", exercises: [
          { name:"Yük Taşıma Devresi", sets:"4 tur × 3 dk / 1 dk dinlenme", muscle:"Full body dayanıklılık — itfaiye/askeri simülasyon", how:["30m Farmer Carry (ağır)","20m Bear Crawl","30m Suitcase Carry (sağ)","30m Suitcase Carry (sol)","Bir tur = yukarıdaki sıra","4 tur tamamla"], avoid:"Formu bırakma — ağırlığı düşür", warn:"İtfaiye taşıma simülasyonu — gerçek dünya gücü", alts:["Sandbag Carry","Tire Flip","Sled Push"] },
        ]},

        { name: "❄️ SOĞUMA", color: "#F4A261", exercises: [
          { name:"Standing Quad Stretch", sets:"1 × 45sn (her taraf)", muscle:"Quad", how:["Topuğu kalçaya çek"], avoid:null, warn:null, alts:[] },
          { name:"Lizard Pose Left", sets:"1 × 45sn", muscle:"Kalça fleksör, groin", how:["Sol ayak öne — büyük lunge","Sağ diz yerde"], avoid:null, warn:null, alts:[] },
          { name:"Lizard Pose Right", sets:"1 × 45sn", muscle:"Her taraf eşit", how:["Her taraf eşit"], avoid:null, warn:null, alts:[] },
          { name:"Thread the Needle", sets:"1 × 30sn (her taraf)", muscle:"Torasik rotasyon", how:["Dört ayak — kolu alttan geçir"], avoid:null, warn:null, alts:[] },
          { name:"Seated Forward Fold", sets:"1 × 60sn", muscle:"Hamstring", how:["Öne uzan"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },

    // ─────────────────────────────────────────────────
    {
      id: 4, title: "GÜN 4", sub: "PAZAR", focus: "Dayanıklılık Devresi", duration: "~75 dk", color: "#8338EC",
      type: "training",
      injury: "⚠️ En uzun kondisyon günü — tempo düşükse daha iyi form daha uzun süre dayanmak demek.",
      conditioning: "Uzun Devre — aerobik kapasite ve akıl gücü",
      blocks: [
        { name: "🔥 ISINMA — Genel Hazırlık", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun", how:["Dik dur","Çeneni geri it"], avoid:null, warn:null, alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz", how:["Yanlara aç"], avoid:null, warn:null, alts:[] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Torasik", how:["Kürek kemikleri hizasında"], avoid:"Bel üzerinde yapma", warn:"KİFOZ KRİTİK", alts:[] },
          { name:"Hip Hinge", sets:"2 × 10", muscle:"Posterior chain aktivasyon", how:["Kalçayı geriye it"], avoid:null, warn:null, alts:[] },
          { name:"Shoulder CARs", sets:"2 × 5 (her taraf)", muscle:"Omuz mobilite", how:["Tam daire — yavaş"], avoid:null, warn:null, alts:[] },
          { name:"Supine Hip Rotation", sets:"2 × 8 (her taraf)", muscle:"Kalça", how:["Dizi yana yatır"], avoid:null, warn:null, alts:[] },
        ]},

        { name: "🏋️ KUVVET — Hız & Güç", color: "#8338EC", exercises: [
          { name:"KB Swing (Heavy)", sets:"5 × 10", muscle:"Posterior chain patlayıcı güç — hip extension", how:["Ağır KB — hip hinge başlangıç","Kalçayı patlayıcı öne it","KB omuz hizasına — kollar pasif","Kontrollü geri"], avoid:"Squat hareketi yapmaya çalışma", warn:"Power Clean ile aynı enerji — rotator cuff dostu", alts:["DB Swing","Hang Power Clean (ilerleyen haftalarda)"] },
          { name:"Push Press", sets:"3 × 5", muscle:"Tüm vücut — bacak + omuz + core koordinasyon", how:["DB'leri omuz hizasında","Hafif diz bükümü — patlayıcı it","Bacak gücüyle başla — kollar tamamlar","Kontrollü indir"], avoid:"Sadece kollarla itme — bacak kullan", warn:"ROTATOR CUFF: Ağrıda landmine'a geç", alts:["Landmine Push Press","DB Shoulder Press","Thruster"] },
          { name:"Trap Bar / DB Shrug Carry Combo", sets:"3 × 20m", muscle:"Trapez üst, rhomboid, core — yük altında postür", how:["DB'leri omuz hizasında (rack pozisyon)","20 metre yürü","Sonra Farmer Carry pozisyonuna al","20 metre daha yürü"], avoid:"Boynu büküp öne eğilme", warn:null, alts:["Farmer Carry","Yoked Carry"] },
        ]},

        { name: "🤸 KALİSTENİK — Max Effort", color: "#E76F51", exercises: [
          { name:"Pull Up Max Test", sets:"3 set × maksimum", muscle:"Tüm çekme zinciri", how:["Her sette maximum temiz tekrar","Set arası 3 dk tam dinlenme","Tekrar sayını not al — haftadan haftaya takip et","Bu progression göstergesi"], avoid:"Kısmi range tekrar sayma", warn:"Askeri fitness testlerinde standart ölçüm", alts:["Chin Up Max","Assisted Pull Up"] },
          { name:"Push Up Max Test", sets:"3 set × maksimum", muscle:"Tüm itme zinciri", how:["Temiz form — göğüs yere değer","Set arası 3 dk","Sayı takibi"], avoid:"Kalça yukarı — geçersiz sayılır", warn:"Standart fitness testi", alts:["Knee Push Up"] },
          { name:"Dip Max Test", sets:"2 set × maksimum", muscle:"Triceps, alt göğüs, ön delt", how:["Tam aşağı — tam yukarı","Tekrar sayısı takip et"], avoid:"Kısmi tekrar", warn:null, alts:["Bench Dip","Negative Dip"] },
        ]},

        { name: "⚡ KONDİSYON — Uzun Devre", color: "#990000", exercises: [
          { name:"20 Dakika Sürekli Devre", sets:"20 dakika sürekli", muscle:"Full body aerobik kapasite", how:["Her hareket 40 sn, arası 20 sn:","1. Jumping Jack / Jump Rope","2. Push Up","3. Inverted Row / Band Pull","4. Glute Bridge","5. Mountain Climber","6. Bear Crawl 10m ileri geri","Devre tamamlandı — başa dön","Kaç tur tamamladığını not al"], avoid:"Durmak — tempo düşür ama dur", warn:"Aerobik baz olmadan güç dayanıklılığa dönüşmez", alts:["Rowing Machine 20 dk","Run/Walk 20 dk"] },
        ]},

        { name: "🎯 CORE — Haftalık Kapanış", color: "#6C63FF", exercises: [
          { name:"Ab Wheel Rollout", sets:"3 × 8", muscle:"Core anterior zinciri — full", how:["Diz üstünde başla","Öne yuvarla — kontrollü","Geri çek"], avoid:"Beli sarkıtma", warn:null, alts:["Plank to Pike","Hollow Body"] },
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique", how:["Kalça yukarı"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Her iki taraf eşit"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
        ]},

        { name: "❄️ SOĞUMA — Derin Esneme", color: "#8338EC", exercises: [
          { name:"Child's Pose", sets:"1 × 60sn", muscle:"Sırt, omuz", how:["Kolları öne uzat"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Right", sets:"1 × 60sn", muscle:"Torasik", how:["Dizi karşı tarafa yatır"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Left", sets:"1 × 60sn", muscle:"Her taraf eşit", how:["Sol dizi"], avoid:null, warn:null, alts:[] },
          { name:"Hamstring, Obliques and Lat Stretch", sets:"2 × 45sn", muscle:"3 bölge", how:["Otur, bacağı uzat"], avoid:null, warn:null, alts:[] },
          { name:"Diaphragmatic Breathing", sets:"2 × 10 nefes", muscle:"Parasempatik — recovery", how:["4 sn içeri","2 sn tut","6 sn dışarı"], avoid:null, warn:"HRV iyileştirir — recovery hızlanır", alts:[] },
        ]},
      ],
    },

    // ─── OFF DAYS ───────────────────────────────────
    {
      id: 5, title: "OFF 1", sub: "PAZARTESİ", focus: "Aktif Recovery", duration: "~15 dk", color: "#6C757D",
      type: "offday",
      blocks: [
        { name: "🌿 RECOVERY — Sabah Rutini", color: "#6C757D", exercises: [
          { name:"Diaphragmatic Breathing", sets:"2 × 10 nefes", muscle:"Parasempatik aktivasyon", how:["4 sn içeri","2 sn tut","6 sn dışarı"], avoid:null, warn:null, alts:[] },
          { name:"Cat and Cow", sets:"2 × 15", muscle:"Omurga mobilite", how:["Nefesle birlikte"], avoid:null, warn:null, alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hip flexor — oturma kasılması", how:["Yarım diz"], avoid:null, warn:null, alts:[] },
          { name:"Child's Pose", sets:"2 × 60sn", muscle:"Full recovery pozisyonu", how:["Tam bırak"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Right", sets:"1 × 60sn", muscle:"Sırt", how:["Dizi karşı tarafa"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Left", sets:"1 × 60sn", muscle:"Her taraf eşit", how:["Sol dizi"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },
    {
      id: 6, title: "OFF 2", sub: "ÇARŞAMBA", focus: "Mobilite + Hafif Aktivasyon", duration: "~25 dk", color: "#6C757D",
      type: "offday",
      blocks: [
        { name: "⚡ AKTİF RECOVERY — Evde", color: "#6C757D", exercises: [
          { name:"Band Pull Apart", sets:"3 × 20", muscle:"Postür kasları", how:["Yavaş — 1 sn tut"], avoid:"Omuzları kaldırma", warn:null, alts:[] },
          { name:"Dead Hang", sets:"3 × 20sn", muscle:"Omurga dekompresyon, grip", how:["Bardan asıl","Aktif omuz"], avoid:"Pasif asılma", warn:null, alts:[] },
          { name:"Glute Bridge", sets:"3 × 20", muscle:"Glute aktivasyon", how:["Sırt üstü","Kalçayı yukarı — 1 sn"], avoid:null, warn:null, alts:[] },
          { name:"Side Plank Left", sets:"2 × 30sn", muscle:"Sol oblique", how:["Kalça yukarı"], avoid:null, warn:"SKOLYOZ günlük", alts:[] },
          { name:"Side Plank Right", sets:"2 × 30sn", muscle:"Sağ oblique", how:["Her taraf eşit"], avoid:null, warn:null, alts:[] },
          { name:"World Greatest Stretch", sets:"2 × 5 (her taraf)", muscle:"Full body mobilite", how:["Lunge — el yere — kolu aç"], avoid:null, warn:null, alts:[] },
          { name:"Chin Tuck", sets:"3 × 15", muscle:"Boyun", how:["Sandalyede otur — dik"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },
    {
      id: 7, title: "OFF 3", sub: "CUMA", focus: "Cumartesi Hazırlığı", duration: "~15 dk", color: "#6C757D",
      type: "offday",
      blocks: [
        { name: "🔋 HAZİRLIK — Cumartesi Öncesi", color: "#6C757D", exercises: [
          { name:"Hip Flexor Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hip flexor", how:["Yarım diz"], avoid:null, warn:null, alts:[] },
          { name:"Glute Bridge", sets:"3 × 15", muscle:"Glute aktivasyon", how:["1 sn sıkıştır"], avoid:null, warn:null, alts:[] },
          { name:"Band External Rotation", sets:"2 × 15 (her taraf)", muscle:"Rotator cuff hazırlık", how:["Dışa döndür"], avoid:null, warn:null, alts:[] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça", how:["Dizi yana yatır"], avoid:null, warn:null, alts:[] },
          { name:"Cat and Cow", sets:"2 × 10", muscle:"Omurga", how:["Nefesle"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },
  ],
};
