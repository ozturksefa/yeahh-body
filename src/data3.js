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


  skillPaths: {
    "pullup": {
        "name": "Pull-up Yolu",
        "icon": "🔝",
        "description": "Omurga ve kol gücünün temeli",
        "steps": [
            {
                "level": 1,
                "name": "Dead Hang",
                "target": "3 × 30sn",
                "detail": "Aktif omuz — kulağa değil, aşağı çek"
            },
            {
                "level": 2,
                "name": "Scapula Pull",
                "target": "3 × 12",
                "detail": "Sadece kürek kemikleri — dirsek bükülmez"
            },
            {
                "level": 3,
                "name": "Chin-up Negative",
                "target": "5 × 5 (5sn indir)",
                "detail": "Üstten başla, 5 saniyede yavaşça in"
            },
            {
                "level": 4,
                "name": "Assisted Pull-up",
                "target": "4 × 6",
                "detail": "Bant veya makine — tam range"
            },
            {
                "level": 5,
                "name": "Full Chin-up",
                "target": "4 × 5",
                "detail": "Temiz form — göğüs bara"
            },
            {
                "level": 6,
                "name": "Full Pull-up",
                "target": "4 × 5",
                "detail": "Pronasyon tutuş — tam kontrol"
            },
            {
                "level": 7,
                "name": "Weighted Pull-up",
                "target": "3 × 5 (+5kg)",
                "detail": "Ağırlıklı — güç gelişimi"
            },
            {
                "level": 8,
                "name": "Archer Pull-up",
                "target": "3 × 4 (her taraf)",
                "detail": "Muscle-up öncesi hazırlık"
            }
        ]
    },
    "dip": {
        "name": "Dip / Push Yolu",
        "icon": "💪",
        "description": "Triceps, göğüs ve omuz bütünsel gücü",
        "steps": [
            {
                "level": 1,
                "name": "Push Up",
                "target": "3 × 15",
                "detail": "Temiz form — göğüs yere değer"
            },
            {
                "level": 2,
                "name": "Diamond Push Up",
                "target": "3 × 10",
                "detail": "Triceps izolasyon"
            },
            {
                "level": 3,
                "name": "Pike Push Up",
                "target": "3 × 10",
                "detail": "Overhead push temeli"
            },
            {
                "level": 4,
                "name": "Dip Negative",
                "target": "5 × 5 (5sn indir)",
                "detail": "Üstten başla — yavaş in"
            },
            {
                "level": 5,
                "name": "Full Dip",
                "target": "4 × 8",
                "detail": "Tam aşağı — 90° dirsek"
            },
            {
                "level": 6,
                "name": "Weighted Dip",
                "target": "3 × 6 (+5kg)",
                "detail": "Ağırlıklı dip"
            },
            {
                "level": 7,
                "name": "Korean Dip",
                "target": "3 × 5",
                "detail": "Bar üzerinde arka dip — muscle-up geçişi"
            }
        ]
    },
    "handstand": {
        "name": "Handstand Push-up Yolu",
        "icon": "🙃",
        "description": "Dikey itme gücü — omuz dominansı",
        "steps": [
            {
                "level": 1,
                "name": "Pike Push Up",
                "target": "3 × 10",
                "detail": "Temel — ters V pozisyonu"
            },
            {
                "level": 2,
                "name": "Elevated Pike Push Up",
                "target": "3 × 8",
                "detail": "Ayaklar yüksekte — daha dik açı"
            },
            {
                "level": 3,
                "name": "Wall Handstand Hold",
                "target": "3 × 20sn",
                "detail": "Duvara karşı el duruşu"
            },
            {
                "level": 4,
                "name": "Wall HSPU Negative",
                "target": "3 × 5 (3sn indir)",
                "detail": "Duvarda baş yere doğru yavaş in"
            },
            {
                "level": 5,
                "name": "Partial Wall HSPU",
                "target": "3 × 5",
                "detail": "Yarım range — baş yere iner"
            },
            {
                "level": 6,
                "name": "Full Wall HSPU",
                "target": "3 × 5",
                "detail": "Tam range — baştan ite"
            }
        ]
    },
    "lsit": {
        "name": "L-sit Yolu",
        "icon": "🪑",
        "description": "Core + basınç gücü — kalisteniğin temeli",
        "steps": [
            {
                "level": 1,
                "name": "Support Hold",
                "target": "3 × 20sn",
                "detail": "Paralel bar — sadece vücut ağırlığı"
            },
            {
                "level": 2,
                "name": "Knee Tuck Hold",
                "target": "3 × 15sn",
                "detail": "Dizleri göğse çek — tut"
            },
            {
                "level": 3,
                "name": "One Leg L-sit",
                "target": "3 × 10sn",
                "detail": "Bir bacak uzatılmış"
            },
            {
                "level": 4,
                "name": "Full L-sit",
                "target": "3 × 10sn",
                "detail": "Her iki bacak uzatılmış"
            },
            {
                "level": 5,
                "name": "L-sit to Tuck",
                "target": "3 × 6",
                "detail": "Tuck-planche geçişi"
            },
            {
                "level": 6,
                "name": "Straddle L-sit",
                "target": "3 × 10sn",
                "detail": "Bacaklar açık — daha zor"
            }
        ]
    },
    "muscleup": {
        "name": "Muscle-up Hazırlığı",
        "icon": "🏆",
        "description": "Pull + Push birleşimi — üst kalisteniğin zirvesi",
        "steps": [
            {
                "level": 1,
                "name": "Pull-up (chest to bar)",
                "target": "3 × 5",
                "detail": "Göğsü bara doğru çek — yüksek pull-up"
            },
            {
                "level": 2,
                "name": "Bar Dip",
                "target": "3 × 8",
                "detail": "Bar üzerinde dip"
            },
            {
                "level": 3,
                "name": "Kipping Pull-up",
                "target": "3 × 8",
                "detail": "Momentum ile — geçiş öğrenimi"
            },
            {
                "level": 4,
                "name": "Negative Muscle-up",
                "target": "3 × 3",
                "detail": "Üstten başla — yavaş in"
            },
            {
                "level": 5,
                "name": "Assisted Muscle-up",
                "target": "3 × 3",
                "detail": "Bant yardımıyla tam hareket"
            },
            {
                "level": 6,
                "name": "Full Muscle-up",
                "target": "3 × 3",
                "detail": "Temiz konsantrik muscle-up"
            }
        ]
    }
},

  days: [
    // ─────────────────────────────────────────────────
    {
      id: 1, title: "GÜN 1", sub: "SALI", focus: "Kuvvet Bazı", duration: "~75 dk", color: "#C1121F",
      type: "training",
      injury: "⚠️ BEL: Deadlift ve Row'da omurga nötral — yuvarlama yok. DİZ: Squat yoksa Bulgarian Split Squat. OMUZ: Overhead ağrıda landmine'a geç.",
      conditioning: "Sprint Interval — en yüksek kardiyovasküler stres",
      blocks: [
        { name: "🔥 ISINMA — Postür & Aktivasyon", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Derin boyun fleksörleri", how:["Sandalyede dik otur veya ayakta dur", "Çeneni geriye it — çift çene yap", "Boyun uzuyor gibi hisset — 2 sn tut", "Bırak, tekrarla — 12-15 tekrar"], avoid:"Başı aşağı eğme — sadece geriye it", warn:"Bilgisayar başında çalışanlar için boyun ağrısının ana önlemi", alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid, postür", how:["Bandı iki elle önde omuz hizasında tut — omuz genişliğinde", "Kolları düz tutarak yanlara aç — kürek kemiklerini birleştir", "1 sn tam açık pozisyonda tut", "Kontrollü geri gel — 2-3 sn"], avoid:"Omuzları kulağa kaldırma — trapez değil rhomboid çalışmalı", warn:"Bilgisayar başında postür kasları zayıflar — günlük yapılmalı", alts:[] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Torasik mobilite", how:["Foam roller'ı üst sırt (T4-T8) hizasına yerleştir", "Kolları göğsün üzerinde çaprazla veya elleri ensede", "Yavaşça yuvarlan — ağrılı noktada 20-30 sn kal", "Nefes ver ve kası bırak — zorla bastırma"], avoid:"Bel omurları üzerinde yuvarlanma — sadece üst sırt", warn:"KİFOZ + SKOLYOZ: Torasik mobilite her gün şart — asla atlama", alts:[] },
          { name:"Shoulder CARs", sets:"2 × 5 (her taraf)", muscle:"Glenohumeral mobilite", how:["Kolu yavaşça tam daire çiz","5 sn bir tur"], avoid:"Gövdeyi döndürme", warn:"Rotator cuff ısınma", alts:[] },
          { name:"Hip Hinge", sets:"2 × 10", muscle:"Posterior chain aktivasyon", how:["Ayakta dik","Kalçayı geriye it — öne değil","Sırt düz, dizler hafif bükülü","Geri gel"], avoid:"Sırtı büküp öne eğme", warn:"Deadlift öncesi şart", alts:[] },
          { name:"Supine Hip Rotation", sets:"2 × 8 (her taraf)", muscle:"Kalça rotatorları", how:["Sırt üstü yat — dizler bükülü, ayaklar yerde", "Sağ dizi yavaşça sağa yatır — 10 sn tut", "Geri gel, sol dizi sola yatır — 10 sn tut", "Ağrı varsa range'i azalt — zorla yapma"], avoid:"Kalçanın yerden kalkmasına izin verme", warn:"DİZ: Kalça rotatorlarını açar — menisküs stresi azalır", alts:[] },
        ]},

        { name: "🏋️ KUVVET — Compound Ağırlık", color: "#C1121F", exercises: [
          { name:"Dumbbell Deadlift", sets:"5 × 5", muscle:"Tüm posterior chain — hamstring, glute, sırt erektör, trapez", how:["Ayaklar kalça genişliğinde","Sırt düz — göğsü aç önce","Kürek kemiklerini aşağı çek","Kalçayı öne iterek kalk — dumbbelllar bacak yanında"], avoid:"Sırtı büküp öne eğme — nötral omurga şart", warn:"🟡 BEL FITIĞI: Omurga nötral — asla yuvarlama. Ağırlığı düşür, range kıs. Trap Bar tercih et. SKOLYOZ: Her sette simetri kontrol", alts:["Trap Bar Deadlift", "Romanian Deadlift", "Hex Bar Deadlift"] },
          { name:"Landmine Press", sets:"4 × 8 (her taraf)", muscle:"Ön/orta delt, triceps, serratus anterior, core anti-rotation", how:["Barlın serbest ucunu tut — göğüs hizasında","Çapraz yukarı it — tam uzatma","Yavaşça geri al","SKOLYOZ: Core sıkı, bel nötral"], avoid:"Beli hiperextend etme", warn:"ROTATOR CUFF: En güvenli overhead alternatif", alts:["DB Overhead Press","Push Press","Arnold Press"] },
          { name:"Weighted Pull Up / Assisted", sets:"5 × 3–5", muscle:"Lat, teres major, biceps, rear delt — tüm çekme zinciri", how:["Pronasyon tutuş — omuz genişliğinden geniş","Aktif omuz — kulağa çekme","Göğsü bara doğru çek","3 sn aşağı — full range"], avoid:"Momentum kullanma — temiz tekrar", warn:"Konsantrik yapamazsan negatifle yap — 5 sn indir", alts:["Assisted Pull Up","Lat Pulldown","Negative Pull Up"] },
          { name:"Barbell / DB Bent Over Row", sets:"3 × 6", muscle:"Mid trapez, rhomboid, lat, posterior delt, biceps", how:["45° öne eğik — sırt düz","Barlı/DB'yi karın/alt göğse çek","Kürek kemiklerini sıkıştır — 1 sn tut","Kontrollü indir"], avoid:"Gövdeyi kaldırma — sadece kollar çalışır", warn:"🔴 BEL FITIĞI: Fleksiyonlu yükleme — en riskli row. Destekli Single Arm Row veya Cable Row'a geç. Ağrıda kesinlikle yapma", alts:["Single Arm DB Row (destekli)", "Cable Row", "Chest Supported Row"] },
          { name:"Bulgarian Split Squat", sets:"3 × 6 (her bacak)", muscle:"Quad, glute, hip flexor — unilateral bütünsel", how:["Arka ayak bench'te — ön diz hizasında","Dikey olarak in — öne değil","Ön topuk yerde kalacak","Ön ayakla it — kalça öne"], avoid:"Ön dizi ayak ucunu geçirme", warn:"DİZ: Ağrıda reverse lunge'a geç — daha az knee dominant", alts:["Reverse Lunge","Step Down","Single Leg Squat to Box"] },
        ]},

        {
        "name": "🤸 KALİSTENİK — Pull-up Skill (Önce Yap)",
        "color": "#2A9D8F",
        "exercises": [
        {
        "name": "Dead Hang",
        "sets": "3 × 30sn",
        "muscle": "Lat, ön kol, grip, omurga dekompresyon",
        "how": [
        "Bardan asıl — overhand tutuş",
        "Omuzları aktif tut — aşağı çek, kulağa değil",
        "Vücut sakin — sallanma yok",
        "Nefes al — omurgayı uzat"
        ],
        "avoid": "Tamamen pasif sarkma — omuzlar aktif olmalı",
        "warn": "Pull-up yolunun temeli — her Salı buradan başla",
        "alts": [
        "Flexed Arm Hang",
        "Active Hang"
        ]
        },
        {
        "name": "Scapula Pull Up",
        "sets": "3 × 12",
        "muscle": "Lat aktivasyon, scapula kontrol — pull-up motorunun ateşlenmesi",
        "how": [
        "Bardan asıl — kollar düz",
        "Sadece kürek kemiklerini aşağı çek",
        "Vücut hafifçe yukarı kalkar",
        "Kontrollü geri sal"
        ],
        "avoid": "Dirsekleri bükme — sadece scapula hareketi",
        "warn": "Pull-up'ta ilk hatırlatma: önce scapula, sonra dirsekler",
        "alts": []
        },
        {
        "name": "Chin-up Negative",
        "sets": "5 × 5 (5sn indir)",
        "muscle": "Biceps, lat — eccentric güç inşası",
        "how": [
        "Step veya zıplamayla üst pozisyona gel",
        "5 saniyede yavaşça in — tempoyu say",
        "Tam alta inince serbest bırak",
        "Her tekrar temiz başla"
        ],
        "avoid": "Hızlı düşme — 5sn şart",
        "warn": "Konsantrik yapamazsan negatifle güç kazan — en etkili yöntem",
        "alts": [
        "Assisted Chin Up",
        "Band Pull Up"
        ]
        },
        {
        "name": "Assisted Pull-up",
        "sets": "4 × 6",
        "muscle": "Lat, teres major, biceps — tam hareket örüntüsü",
        "how": [
        "Bant veya makine yardımıyla",
        "Tam aşağı — tam yukarı — tam range",
        "Göğsü bara doğru çek",
        "3sn indir — lat'ı hisset"
        ],
        "avoid": "Kısmi range — yarım tekrar saymaz",
        "warn": "Seviyen ne olursa olsun — haftadan haftaya yardımı azalt",
        "alts": [
        "Lat Pulldown",
        "Band Pull Up"
        ]
        }
        ]
        },

        { name: "🔄 KOMPLİMENTER — Hinge & Carry", color: "#1A3A5C", exercises: [
          { name:"Kettlebell Swing", sets:"4 × 15", muscle:"Glute, hamstring, core — patlayıcı hip extension", how:["Hip hinge — squat değil","KB bacaklar arasından geri götür","Kalçayı patlayıcı öne it — KB omuz hizasına","Nefes: it → dışarı, geri → içeri"], avoid:"Kollarla kaldırmaya çalışma — güç kalçadan gelir", warn:"🟡 BEL FITIĞI: Hip hinge tekniği mükemmel olmalı — squat değil. Omurga nötral korunacak. Ağrıda Glute Bridge ile değiştir. DİZ: Diz bükme değil kalça hareketi", alts:["Dumbbell Swing", "Hip Hinge (hızlı tempo)", "Glute Bridge"] },
          { name:"Double Farmer Carry", sets:"4 × 30m", muscle:"Grip, trapez, core statik, ayak bileği stabilite, full body", how:["Her iki elde ağır DB/KB","Dik dur — omuzlar geri ve aşağı","Küçük hızlı adımlar","Nefes almayı kesme — steady"], avoid:"Öne eğilme veya yana sallanma", warn:"Ağır tut — konuşamayacak kadar zor olmalı", alts:["Suitcase Carry","Overhead Carry","Sandbag Carry"] },
        ]},

        { name: "🎯 CORE — Anti-Rotasyon & Stabilite", color: "#6C63FF", exercises: [
          { name:"Dead Bug", sets:"3 × 10 (her taraf)", muscle:"Transversus abdominis, core anti-extension", how:["Sırt üstü yat — kollar kulakların yanında düz uzatılmış", "Bacaklar düz, yerden 20-30cm yukarıda — açı küçük tutulur", "Alt sırt yere basılı — bel yerde kalacak, bu kritik", "20sn tut — nefes almayı kesme, kısa nefesler al", "Titreme normaldir — devam et, sadece bel kalkmayacak"], avoid:"Beli yerden kaldırma — bu hareketin tek kuralı", warn:"Muscle-up, handstand, L-sit — tüm ileri kalisteniğin çekirdek gücü buradan gelir", alts:["Bird Dog","Hollow Body Hold"] },
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique, quadratus lumborum", how:["Sol yanına yat — sol dirsek omuz altında tam dik", "Ayakları üst üste veya öne-arkaya aç", "Kalçayı yerden kaldır — omuzdan topuğa düz çizgi", "Üst kolu tavana uzan veya kalçaya koy — 30-45 sn tut"], avoid:"Kalçanın öne veya geriye sarkması", warn:"SKOLYOZ: Her iki tarafı eşit süre yap — lateral core dengesi kritik", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Sağ yanına yat — sağ dirsek omuz altında", "Kalçayı yerden kaldır — düz çizgi", "Her iki taraf eşit süre — 30-45 sn", "Nefes almayı kesme"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Asla bir tarafı atlama", alts:[] },
        ]},

        { name: "⚡ KONDİSYON — Sprint Interval", color: "#990000", exercises: [
          { name:"Sprint Interval", sets:"6 × 30sn sprint / 30sn yürüyüş", muscle:"Full body — kardiyovasküler kapasite, bacak gücü, core", how:["30 sn maksimum efor koşu veya rowing","30 sn aktif yürüyüş / kürek makinesi hafif","6 tur — dinlenmeden","Son 2 turda bile hız düşmemeli — bu kondisyon göstergesi"], avoid:"Orta tempo koşu — ya sprint ya dinlenme", warn:"Diz ağrısı varsa koşu yerine rowing veya bike", alts:["Rowing Machine Interval","Assault Bike","Jump Rope HIIT"] },
        ]},

        { name: "❄️ SOĞUMA", color: "#C1121F", exercises: [
          { name:"Child's Pose", sets:"1 × 60sn", muscle:"Sırt, omuz, kalça", how:["Diz üstü otur, topuklarına otur", "Kolları öne uzat — yere koy", "Alnı yere koy veya mindere", "Tamamen bırak — pasif esneme — 45-60 sn"], avoid:"Zorla uzanma — yer çekimi işini yapsın", warn:"Diz ağrısı varsa topuklara oturmak yerine daha dik dur", alts:[] },
          { name:"Hamstring, Obliques and Lat Stretch", sets:"2 × 45sn", muscle:"3 bölge", how:["Otur, bacağı uzat, öne eğil"], avoid:null, warn:null, alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hip flexor, kasık", how:["Yarım diz pozisyonu — sağ diz yerde, sol ayak önde", "Kalçayı öne it — arka bacak üzerinde gerilme hisset", "Posterior tilt yap — kalçanı altına tıkıştır", "Gövde dik — öne eğilme — 30-45 sn tut"], avoid:"Gövdeyi öne eğme — dik tut", warn:"Masa başı çalışıyorsan her gün şart — kısalmış hip flexor sırt ağrısına yol açar", alts:[] },
          { name:"Supine Spinal Twist Right", sets:"1 × 45sn", muscle:"Torasik rotasyon", how:["Sırt üstü yat — kollar yana T şeklinde açık", "Sağ dizi 90° büküp sol tarafa yatır", "Sağ omuz yerde kalsın — ters yöne bak", "45-60 sn tut — nefes alarak derinleştir"], avoid:"Omuzların yerden kalkmasına izin verme", warn:"SKOLYOZ: Her iki tarafa mutlaka eşit süre uygula", alts:[] },
          { name:"Supine Spinal Twist Left", sets:"1 × 45sn", muscle:"Her taraf eşit", how:["Sırt üstü yat — kollar yana T şeklinde açık", "Sol dizi 90° büküp sağ tarafa yatır", "Sol omuz yerde kalsın — ters yöne bak", "Her iki taraf eşit süre — 45-60 sn"], avoid:"Omuzların yerden kalkmasına izin verme", warn:"SKOLYOZ: Her iki tarafa mutlaka eşit süre uygula", alts:[] },
        ]},
      ],
    },

    // ─────────────────────────────────────────────────
    {
      id: 2, title: "GÜN 2", sub: "PERŞEMBE", focus: "Kalistenik Dayanıklılık", duration: "~75 dk", color: "#2A9D8F",
      type: "training",
      injury: "⚠️ BEL: Seated Forward Fold'da tam öne eğilme yapma. BOYUN: Pike Push Up'ta boyun nötral. OMUZ: Pull-up'ta kürek kemikleri aktif.",
      conditioning: "Amrap / Timed Circuit — anaerobik eşik",
      blocks: [
        { name: "🔥 ISINMA — Mobilite & Aktivasyon", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Sandalyede dik otur veya ayakta dur", "Çeneni geriye it — çift çene yap", "Boyun uzuyor gibi hisset — 2 sn tut", "Bırak, tekrarla — 12-15 tekrar"], avoid:"Başı aşağı eğme — sadece geriye it", warn:"Bilgisayar başında çalışanlar için boyun ağrısının ana önlemi", alts:[] },
          { name:"Cat and Cow", sets:"2 × 10", muscle:"Omurga mobilite", how:["Dört ayak — bilekler omuz altında, dizler kalça altında", "Cat: nefes ver → sırtı yuvarlat, çeneyi göğse çek, pelvis içe döner", "Cow: nefes al → sırtı çukurlaştır, göğsü öne çık, kuyruğu kaldır", "Yavaş ve nefesle birlikte — 3-4 sn her pozisyon"], avoid:"Sadece boyun veya belden yapma — tüm omurga dalgalanmalı", warn:"SKOLYOZ: Her tekrarda sol-sağ simetriyi hisset", alts:[] },
          { name:"Band External Rotation", sets:"2 × 15 (her taraf)", muscle:"Rotator cuff ısınma", how:["Dirsek 90° bükülü — vücuda yapışık", "Bant dirseğin ön kısmından geçiyor", "Kolu dışa doğru döndür — dirsek sabit", "Kontrollü geri gel — kasılmayı hisset"], avoid:"Dirseği vücuttan ayırma — sabit tutmalı", warn:"ROTATOR CUFF REHABİLİTASYON: Omuz cerrahisi riskini azaltan en önemli hareket", alts:[] },
          { name:"Dead Hang", sets:"2 × 30sn", muscle:"Lat aktivasyon, grip, omurga dekompresyon", how:["Bardan iki elle asıl — overhand tutuş", "Omuzları aktif tut — kulağa doğru değil, aşağı çek", "Vücut sallanmasın — sakin kal", "Nefes al — omurgayı uzat — 20-30 sn tut"], avoid:"Tamamen pasif sarkmak — omuzlar aktif olmalı", warn:"Omurga dekompresyonu — disk arası mesafeyi açar, sırt ağrısına iyi gelir", alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor açılımı", how:["Yarım diz pozisyonu — sağ diz yerde, sol ayak önde", "Kalçayı öne it — arka bacak üzerinde gerilme hisset", "Posterior tilt yap — kalçanı altına tıkıştır", "Gövde dik — öne eğilme — 30-45 sn tut"], avoid:"Gövdeyi öne eğme — dik tut", warn:"Masa başı çalışıyorsan her gün şart — kısalmış hip flexor sırt ağrısına yol açar", alts:[] },
          { name:"Supine Hip Rotation", sets:"2 × 8 (her taraf)", muscle:"Kalça rotatorları", how:["Sırt üstü yat — dizler bükülü, ayaklar yerde", "Sağ dizi yavaşça sağa yatır — 10 sn tut", "Geri gel, sol dizi sola yatır — 10 sn tut", "Ağrı varsa range'i azalt — zorla yapma"], avoid:"Kalçanın yerden kalkmasına izin verme", warn:"DİZ: Kalça rotatorlarını açar — menisküs stresi azalır", alts:[] },
        ]},

        {
        "name": "🤸 KALİSTENİK — Push/Dip Skill (Önce Yap)",
        "color": "#E76F51",
        "exercises": [
        {
        "name": "Push Up Variations",
        "sets": "4 × max (temiz form)",
        "muscle": "Göğüs, triceps, ön delt, serratus, core",
        "how": [
        "Normal → Diamond → Pike sırasıyla ilerle",
        "Ulaşabildiğin en zor versiyondan başla",
        "Form bozulunca dur — sonraki versiyona geç",
        "Set arası 60sn — tam dinlen"
        ],
        "avoid": "Kalça yukarı veya aşağı — vücut düz çizgi",
        "warn": "Askeri ve itfaiye testlerinde standart — temiz tekrar sayılır",
        "alts": [
        "Incline Push Up",
        "Knee Push Up"
        ]
        },
        {
        "name": "Dip Negative",
        "sets": "5 × 5 (5sn indir)",
        "muscle": "Triceps, alt göğüs, ön delt — eccentric güç",
        "how": [
        "Paralel bar veya bench — üst pozisyondan başla",
        "5sn yavaşça in — tempo say",
        "90° dirsek açısına ulaş",
        "Her tekrar için yukarı çık"
        ],
        "avoid": "Hızlı düşme",
        "warn": "Full dip öncesi eccentric güç — omuz güvenleri",
        "alts": [
        "Bench Dip Negative"
        ]
        },
        {
        "name": "Full Dip",
        "sets": "3 × max",
        "muscle": "Triceps, alt göğüs, ön delt — pressing zinciri",
        "how": [
        "Kolları tam uzat — üst pozisyon",
        "Göğüs hafif öne — dip için",
        "Tam aşağı — 90° dirsek",
        "Patlayıcı yukarı"
        ],
        "avoid": "Omuzları kulağa kaldırma",
        "warn": "Ağrıda negatife geç",
        "alts": [
        "Bench Dip",
        "Ring Dip"
        ]
        },
        {
        "name": "Pike Push Up",
        "sets": "3 × 8",
        "muscle": "Ön delt, triceps — overhead push skill",
        "how": [
        "Ters V pozisyonu — kalça yüksekte",
        "Başı yere doğru yavaş indir",
        "Patlayıcı it — omuz hareketi",
        "Kalça düşmesin"
        ],
        "avoid": "Kalçayı düşürme — açı kaybolur",
        "warn": "ROTATOR CUFF: Omuzda keskin ağrıda elevated pike'a geç. Handstand push-up'a giden yol",
        "alts": [
        "Elevated Pike Push Up",
        "Wall Pike"
        ]
        }
        ]
        },

        { name: "🏋️ KUVVET — Press & Row Supersets", color: "#1A3A5C", exercises: [
          { name:"Push Up to Row (DB)", sets:"4 × 8 (her taraf)", muscle:"Göğüs + sırt + core — bütünsel stabilite", how:["Push up pozisyonu — her elde DB","1 push up yap","Sağ DB ile row çek","1 push up — sol DB ile row","= 1 tekrar"], avoid:"Kalçayı döndürme row sırasında — core sıkı", warn:"En fonksiyonel superset — fire/military standardı", alts:["Renegade Row","Push Up + Separate Row"] },
          { name:"Inverted Row", sets:"4 × max", muscle:"Mid sırt, rhomboid, biceps, core — bodyweight pull", how:["Barın altına uzan — topuklar yerde","Vücut düz çizgi — core sıkı","Göğsü bara çek","3 sn indir"], avoid:"Kalça düşmesin — vücut düz", warn:"Pull-up'a giden yol — ne kadar eğik o kadar zor", alts:["TRX Row","Smith Machine Row"] },
          { name:"Single Arm DB Press (Alternating)", sets:"4 × 8 (her taraf)", muscle:"Ön/orta delt, triceps, core anti-rotation", how:["Ayakta veya oturarak","Tek elle press — diğer el serbest","Core: döndürme tepkisi ver","Simetrik güç geliştir"], avoid:"Gövdeyi yana eğme", warn:"ROTATOR CUFF: Ağrıda landmine press'e geç. SKOLYOZ: Unilateral press asimetriyi giderir", alts:["DB Shoulder Press (bilateral)","Landmine Press"] },
        ]},

        { name: "🔄 LOKOMOSYON & CARRY", color: "#8B4513", exercises: [
          { name:"Bear Crawl", sets:"4 × 20m", muscle:"Omuz stabilite, core anti-extension, quad, kondisyon", how:["Dört ayak — dizler yerden 5 cm","Çapraz hareket: sağ el + sol ayak","Bel sabit — kalça yukarı çıkmasın","Nefesi tutma"], avoid:"Kalçayı kaldırma", warn:"Omuz cerrahisi standart hareketi — rotator cuff için ideal", alts:["Crab Walk","Leopard Crawl"] },
          { name:"Suitcase Carry (Tek El)", sets:"3 × 30m (her el)", muscle:"Core lateral stabilite, trapez, grip, quadratus lumborum", how:["Tek elde ağır DB/KB","Dik dur — yana eğilme","Karşı taraf core'u sıkı tut","Her el ayrı"], avoid:"Yana eğilme — bu egzersizin amacını yok eder", warn:"SKOLYOZ: En iyi lateral core egzersizi", alts:["Suitcase Deadlift","Offset Carry"] },
        ]},

        { name: "🎯 CORE — Dinamik", color: "#6C63FF", exercises: [
          { name:"Bird Dog", sets:"3 × 10 (her taraf)", muscle:"Erector spinae, glute, core stabilite", how:["Sırt üstü yat — kollar tavana dik, dizler 90° havada", "BEL YERDE — tüm hareket boyunca değişmemeli", "Sağ kolu geri, sol bacağı öne uzat — aynı anda", "Geri gel, sol kol — sağ bacak uzat", "Nefes verirken uzat, alırken geri gel"], avoid:"Beli yerden kaldırma — bu hareketin tek amacı beli yerde tutmak", warn:"SKOLYOZ: En etkili lumbar stabilizasyon egzersizi", alts:["Dead Bug"] },
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique", how:["Sol yanına yat — sol dirsek omuz altında tam dik", "Ayakları üst üste veya öne-arkaya aç", "Kalçayı yerden kaldır — omuzdan topuğa düz çizgi", "Üst kolu tavana uzan veya kalçaya koy — 30-45 sn tut"], avoid:"Kalçanın öne veya geriye sarkması", warn:"SKOLYOZ: Her iki tarafı eşit süre yap — lateral core dengesi kritik", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Sağ yanına yat — sağ dirsek omuz altında", "Kalçayı yerden kaldır — düz çizgi", "Her iki taraf eşit süre — 30-45 sn", "Nefes almayı kesme"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Asla bir tarafı atlama", alts:[] },
          { name:"Hollow Body Hold", sets:"3 × 20sn", muscle:"Anterior core zinciri", how:["Sırt üstü yat — kollar kulakların yanında düz uzatılmış", "Bacaklar düz, yerden 20-30cm yukarıda — açı küçük tutulur", "Alt sırt yere basılı — bel yerde kalacak, bu kritik", "20sn tut — nefes almayı kesme, kısa nefesler al", "Titreme normaldir — devam et, sadece bel kalkmayacak"], avoid:"Beli yerden kaldırma — bu hareketin tek kuralı", warn:"Muscle-up, handstand, L-sit — tüm ileri kalisteniğin çekirdek gücü buradan gelir", alts:["Tuck Hold"] },
        ]},

        { name: "⚡ KONDİSYON — AMRAP Circuit", color: "#990000", exercises: [
          { name:"AMRAP 8 Dakika", sets:"8 dakika × maksimum tur", muscle:"Full body — aerobik + anaerobik kondisyon", how:["Saat başladığında dur: 5 Push Up", "Sonra: 5 Inverted Row veya Band Pull Apart", "Sonra: 10 Glute Bridge", "Durmadan başa dön — kaç tur tamamladığını say", "Her hafta 1 tur daha hedefle — bu kondisyon gelişiminin göstergesi"], avoid:"Tempo düşürme — yavaşla ama durma", warn:"İtfaiye ve askeri kondisyon testi bu tür circuitlerle yapılır — tur sayısı seni tanımlar", alts:["Tabata","5 tur sabit süre"] },
        ]},

        { name: "❄️ SOĞUMA", color: "#2A9D8F", exercises: [
          { name:"Lat Stretch Chair", sets:"1 × 45sn (her taraf)", muscle:"Lat", how:["Sandalyeye tutun, kalçayı dışa it"], avoid:null, warn:null, alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hip flexor", how:["Yarım diz pozisyonu — sağ diz yerde, sol ayak önde", "Kalçayı öne it — arka bacak üzerinde gerilme hisset", "Posterior tilt yap — kalçanı altına tıkıştır", "Gövde dik — öne eğilme — 30-45 sn tut"], avoid:"Gövdeyi öne eğme — dik tut", warn:"Masa başı çalışıyorsan her gün şart — kısalmış hip flexor sırt ağrısına yol açar", alts:[] },
          { name:"Prone Cobra Stretch", sets:"2 × 30sn", muscle:"Omurga ekstansörler, göğüs", how:["Yüzüstü yat","Kolları düz it — göğsü kaldır","Beli değil göğsü aç"], avoid:"Boyun germe", warn:"KİFOZ KRİTİK", alts:[] },
          { name:"Seated Forward Fold", sets:"1 × 60sn", muscle:"Hamstring, alt sırt", how:["Bacaklar uzatılmış","Öne doğru uzan — pasif"], avoid:null, warn:null, alts:["Standing Half Forward Bend", "Supine Hamstring Stretch", "Knee to Chest"] },
        ]},
      ],
    },

    // ─────────────────────────────────────────────────
    {
      id: 3, title: "GÜN 3", sub: "CUMARTESİ", focus: "Fonksiyonel Güç", duration: "~80 dk", color: "#F4A261",
      type: "training",
      injury: "⚠️ BEL: RDL'de range kıs — hamstring gerilene kadar. Ab Wheel Rollout'u Dead Bug ile değiştir. DİZ: Sığ range. OMUZ: Prehab ısınmada.",
      conditioning: "Yük Taşıma Devresi — dayanıklılık gücü",
      blocks: [
        { name: "🔥 ISINMA — Fonksiyonel Hazırlık", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Sandalyede dik otur veya ayakta dur", "Çeneni geriye it — çift çene yap", "Boyun uzuyor gibi hisset — 2 sn tut", "Bırak, tekrarla — 12-15 tekrar"], avoid:"Başı aşağı eğme — sadece geriye it", warn:"Bilgisayar başında çalışanlar için boyun ağrısının ana önlemi", alts:[] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Torasik mobilite", how:["Foam roller'ı üst sırt (T4-T8) hizasına yerleştir", "Kolları göğsün üzerinde çaprazla veya elleri ensede", "Yavaşça yuvarlan — ağrılı noktada 20-30 sn kal", "Nefes ver ve kası bırak — zorla bastırma"], avoid:"Bel omurları üzerinde yuvarlanma — sadece üst sırt", warn:"KİFOZ + SKOLYOZ: Torasik mobilite her gün şart — asla atlama", alts:[] },
          { name:"World Greatest Stretch", sets:"2 × 5 (her taraf)", muscle:"Kalça, torasik, omuz — full body ısınma", how:["Büyük lunge adımı at — sağ ayak önde", "Sağ elin sağ ayağın iç yanına koy", "Sol kolu tavana doğru aç — gözler elle", "3 sn tut, el yere indir, topuğu it — kalça aç", "Her iki taraf 5'er tekrar"], avoid:"Aceleyle yapma — her pozisyonda 2-3 sn kal", warn:"Tüm vücudu tek harekette ısıtır — kalça, sırt, omuz, göğüs", alts:["Leg Swing + Thoracic Rotation ayrı"] },
          { name:"Glute Bridge Hamstring Walk", sets:"3 × 12", muscle:"Glute + hamstring aktivasyon", how:["Sırt üstü kalçayı kaldır","Ayakları yavaşça öne yürüt","Kalça hep yukarıda — asla indir","Geri yürüt"], avoid:"Kalçayı düşürme", warn:null, alts:["Floor Bridge"] },
          { name:"Prone Y-T-W", sets:"2 × 10", muscle:"Alt trapez, rhomboid, rotator cuff", how:["Yüzüstü yat","Y-T-W sırasıyla — kaldır, tut, indir"], avoid:"Boyun sıkışması", warn:"Rotator cuff prehab", alts:[] },
        ]},

        { name: "🏋️ KUVVET — Posterior Chain", color: "#F4A261", exercises: [
          { name:"Romanian Deadlift", sets:"4 × 8", muscle:"Hamstring, glute, sırt erektör — arka zincir", how:["Dizler hafif bükülü — sabit kalacak","Kalçayı geriye it","Dumbbellları bacak boyunca indir","Hamstrings'de gerilme hissedince dur — geri"], avoid:"Sırtı büküp öne eğilme", warn:"🟡 BEL FITIĞI: Range kıs — hamstring gerilene kadar, daha fazla eğilme. Omurga nötral. SKOLYOZ: Her sette simetri kontrol et", alts:["Single Leg RDL (hafif)", "Hip Hinge", "Cable Pull Through"] },
          { name:"Single Leg RDL", sets:"3 × 8 (her bacak)", muscle:"Hamstring, glute — unilateral hinge", how:["Tek ayak üzerinde dur","Kalçayı geriye iterek öne eğil","Sırt düz — karşı bacak geriye uzanır","Hamstrings gerilince geri gel"], avoid:"Beli büküp öne eğilme", warn:"DİZ: Fonksiyonel — squat yok", alts:["RDL bilateral","KB Single Leg RDL"] },
          { name:"Single Arm DB Row (Ağır)", sets:"4 × 6 (her taraf)", muscle:"Lat, mid sırt — unilateral güç", how:["Bench'e dizi ve eli daya","Ağır dumbbell — güçlü çek","Kürek kemiğini tam geri çek","3 sn indir — tam germe"], avoid:"Gövdeyi döndürme", warn:"SKOLYOZ: Her iki taraf eşit güç kritik", alts:["Cable Row","Chest Supported Row"] },
          { name:"Floor Press", sets:"4 × 8", muscle:"Göğüs, triceps, ön delt — zeminde limitli range", how:["Sırt üstü yat — dizler bükülü","DB'leri yan tarafta — dirsekler yerde","Göğse doğru in — dirsekler yere değince dur","İt — tam uzatma"], avoid:"Bileği büküp bırakma", warn:"ROTATOR CUFF: En güvenli press — sınırlı range", alts:["Incline DB Press","Push Up Ağırlıklı"] },
        ]},

        {
        "name": "🤸 KALİSTENİK — L-sit & Handstand Skill (Önce Yap)",
        "color": "#8338EC",
        "exercises": [
        {
        "name": "Support Hold",
        "sets": "3 × 20sn",
        "muscle": "Triceps, ön delt, core basınç — L-sit'in temeli",
        "how": [
        "Paralel bar veya iki sandalye",
        "Kolları düz it — vücut askıda",
        "Core sıkı — hafifçe öne eğil",
        "20sn tut — nefes al"
        ],
        "avoid": "Dirsekleri bükme",
        "warn": "L-sit olmadan bu olmaz — asla atlama",
        "alts": [
        "Chair Support Hold",
        "Floor Support"
        ]
        },
        {
        "name": "Knee Tuck Hold",
        "sets": "4 × 15sn",
        "muscle": "Hip flexor, core, triceps basınç",
        "how": [
        "Support pozisyonunda",
        "Dizleri göğse çek — mümkün olduğu kadar yüksek",
        "15sn tut — titreme normal",
        "Kontrollü indir"
        ],
        "avoid": "Öne eğilme — gövde dik",
        "warn": "L-sit progressionının 2. adımı",
        "alts": [
        "Hanging Knee Raise",
        "Floor Tuck Hold"
        ]
        },
        {
        "name": "Hollow Body Hold",
        "sets": "4 × 20sn",
        "muscle": "Anterior core zinciri — kalisteniğin ana motoru",
        "how": [
        "Sırt üstü — kollar kulakların yanında uzatılmış",
        "Bacaklar 45° — yerden 20cm",
        "Bel yerde — lower back basısı",
        "20sn tut — nefes almayı kesme"
        ],
        "avoid": "Beli yerden kaldırma",
        "warn": "Muscle-up, handstand, L-sit — hepsinin temeli hollow body",
        "alts": [
        "Tuck Hold",
        "Arch Hold"
        ]
        },
        {
        "name": "Pike Push Up",
        "sets": "4 × 8",
        "muscle": "Ön delt dominant — handstand push-up temeli",
        "how": [
        "Ters V — kalça yüksekte",
        "Başı yere doğru indir — dirsekler dışa açılır",
        "Patlayıcı it",
        "Her sette biraz daha dik açı hedefle"
        ],
        "avoid": "Kalçayı düşürme",
        "warn": "ROTATOR CUFF: Omuz ağrısında açıyı düşür. Ayaklarını giderek yükseltiyorsun — sonunda wall HSPU",
        "alts": [
        "Elevated Pike Push Up"
        ]
        },
        {
        "name": "Wall Handstand Hold",
        "sets": "3 × 20sn",
        "muscle": "Omuz stabilite, core, bilek — handstand temeli",
        "how": [
        "Duvara karşı ellerle yukarı çık",
        "Vücut düz — core sıkı, kalça sıkıştır",
        "Omuzları kulağa it — aktif omuz",
        "20sn tut — nefes al"
        ],
        "avoid": "Beli çukurlaştırma — düz çizgi",
        "warn": "ROTATOR CUFF: Duvardan destek her zaman gerekli. Omuz ağrısında pike hold'a geç. Stabilite haftalar alır",
        "alts": [
        "Box Handstand",
        "Pike Hold on Box"
        ]
        }
        ]
        },

        { name: "🔄 FONKSİYONEL KOMPLİMENTER", color: "#8B4513", exercises: [
          { name:"Sandbag / DB Complex", sets:"3 tur × dinlenmeden", muscle:"Tüm vücut — fonksiyonel dayanıklılık", how:["1: RDL × 6","2: Bent Over Row × 6","3: High Pull × 6 — KB'yi çeneye doğru","4: Press × 6","Her hareketi bırakmadan yap","Tur arası 90 sn"], avoid:"Çok ağır — form bozulur", warn:"Hafif ağırlık al — full hareket önemli", alts:["KB Complex","Barbell Complex"] },
        ]},

        { name: "🎯 CORE — Rotasyon & Lateral", color: "#6C63FF", exercises: [
          { name:"Dead Bug", sets:"3 × 10 (her taraf)", muscle:"Core stabilite", how:["Sırt üstü yat — kollar tavana dik, dizler 90° havada", "BEL YERDE — tüm hareket boyunca değişmemeli", "Sağ kolu geri, sol bacağı öne uzat — aynı anda", "Geri gel, sol kol — sağ bacak uzat", "Nefes verirken uzat, alırken geri gel"], avoid:"Beli yerden kaldırma — bu hareketin tek amacı beli yerde tutmak", warn:"SKOLYOZ: En etkili lumbar stabilizasyon egzersizi", alts:[] },
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique", how:["Sol yanına yat — sol dirsek omuz altında tam dik", "Ayakları üst üste veya öne-arkaya aç", "Kalçayı yerden kaldır — omuzdan topuğa düz çizgi", "Üst kolu tavana uzan veya kalçaya koy — 30-45 sn tut"], avoid:"Kalçanın öne veya geriye sarkması", warn:"SKOLYOZ: Her iki tarafı eşit süre yap — lateral core dengesi kritik", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Sağ yanına yat — sağ dirsek omuz altında", "Kalçayı yerden kaldır — düz çizgi", "Her iki taraf eşit süre — 30-45 sn", "Nefes almayı kesme"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Asla bir tarafı atlama", alts:[] },
          { name:"Copenhagen Plank Left", sets:"2 × 20sn", muscle:"Adduktör, lateral core", how:["Sol yana yat — üst ayağı (sol) bench veya sandalye kenarına koy", "Alt bacağı (sağ) yerden kaldır — iki bacak arasında boşluk", "Dirsek omuz altında — kalça yukarı it", "Vücut düz çizgi — 20sn tut", "Her iki taraf eşit süre"], avoid:"Kalçanın düşmesi — lateral zincir boyunca gerilme hissedeceksin", warn:"Adduktör + lateral core birlikte — diz stabilitesi ve kalça sağlığı için kritik", alts:[] },
          { name:"Copenhagen Plank Right", sets:"2 × 20sn", muscle:"Her iki taraf eşit", how:["Sağ yana yat — üst ayağı (sağ) bench kenarına koy", "Alt bacağı (sol) yerden kaldır", "Dirsek omuz altında — kalça yukarı", "20sn tut — her iki taraf eşit"], avoid:"Kalçanın düşmesi", warn:"SKOLYOZ: Her iki taraf mutlaka eşit süre", alts:[] },
        ]},

        { name: "⚡ KONDİSYON — Yük Taşıma Devresi", color: "#990000", exercises: [
          { name:"Yük Taşıma Devresi", sets:"4 tur × 3 dk / 1 dk dinlenme", muscle:"Full body dayanıklılık — itfaiye/askeri simülasyon", how:["30m Farmer Carry (ağır)","20m Bear Crawl","30m Suitcase Carry (sağ)","30m Suitcase Carry (sol)","Bir tur = yukarıdaki sıra","4 tur tamamla"], avoid:"Formu bırakma — ağırlığı düşür", warn:"İtfaiye taşıma simülasyonu — gerçek dünya gücü", alts:["Sandbag Carry","Tire Flip","Sled Push"] },
        ]},

        { name: "❄️ SOĞUMA", color: "#F4A261", exercises: [
          { name:"Standing Quad Stretch", sets:"1 × 45sn (her taraf)", muscle:"Quad", how:["Topuğu kalçaya çek"], avoid:null, warn:null, alts:[] },
          { name:"Lizard Pose Left", sets:"1 × 45sn", muscle:"Kalça fleksör, groin", how:["Sol ayak öne — büyük lunge","Sağ diz yerde"], avoid:null, warn:null, alts:[] },
          { name:"Lizard Pose Right", sets:"1 × 45sn", muscle:"Her taraf eşit", how:["Her taraf eşit"], avoid:null, warn:null, alts:[] },
          { name:"Thread the Needle", sets:"1 × 30sn (her taraf)", muscle:"Torasik rotasyon", how:["Dört ayak — kolu alttan geçir"], avoid:null, warn:null, alts:[] },
          { name:"Seated Forward Fold", sets:"1 × 60sn", muscle:"Hamstring", how:["Öne uzan"], avoid:null, warn:null, alts:["Standing Half Forward Bend", "Supine Hamstring Stretch", "Knee to Chest"] },
        ]},
      ],
    },

    // ─────────────────────────────────────────────────
    {
      id: 4, title: "GÜN 4", sub: "PAZAR", focus: "Dayanıklılık Devresi", duration: "~75 dk", color: "#8338EC",
      type: "training",
      injury: "⚠️ BEL+BOYUN: Muscle-up kipping hareketi — ağrıda tamamen atla. Wall Handstand'da boyun nötral şart. OMUZ: Ağrıda alternatife geç.",
      conditioning: "Uzun Devre — aerobik kapasite ve akıl gücü",
      blocks: [
        { name: "🔥 ISINMA — Genel Hazırlık", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun", how:["Sandalyede dik otur veya ayakta dur", "Çeneni geriye it — çift çene yap", "Boyun uzuyor gibi hisset — 2 sn tut", "Bırak, tekrarla — 12-15 tekrar"], avoid:"Başı aşağı eğme — sadece geriye it", warn:"Bilgisayar başında çalışanlar için boyun ağrısının ana önlemi", alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz", how:["Bandı iki elle önde omuz hizasında tut — omuz genişliğinde", "Kolları düz tutarak yanlara aç — kürek kemiklerini birleştir", "1 sn tam açık pozisyonda tut", "Kontrollü geri gel — 2-3 sn"], avoid:"Omuzları kulağa kaldırma — trapez değil rhomboid çalışmalı", warn:"Bilgisayar başında postür kasları zayıflar — günlük yapılmalı", alts:[] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Torasik", how:["Foam roller'ı üst sırt (T4-T8) hizasına yerleştir", "Kolları göğsün üzerinde çaprazla veya elleri ensede", "Yavaşça yuvarlan — ağrılı noktada 20-30 sn kal", "Nefes ver ve kası bırak — zorla bastırma"], avoid:"Bel omurları üzerinde yuvarlanma — sadece üst sırt", warn:"KİFOZ + SKOLYOZ: Torasik mobilite her gün şart — asla atlama", alts:[] },
          { name:"Hip Hinge", sets:"2 × 10", muscle:"Posterior chain aktivasyon", how:["Kalçayı geriye it"], avoid:null, warn:null, alts:[] },
          { name:"Shoulder CARs", sets:"2 × 5 (her taraf)", muscle:"Omuz mobilite", how:["Tam daire — yavaş"], avoid:null, warn:null, alts:[] },
          { name:"Supine Hip Rotation", sets:"2 × 8 (her taraf)", muscle:"Kalça", how:["Sırt üstü yat — dizler bükülü, ayaklar yerde", "Sağ dizi yavaşça sağa yatır — 10 sn tut", "Geri gel, sol dizi sola yatır — 10 sn tut", "Ağrı varsa range'i azalt — zorla yapma"], avoid:"Kalçanın yerden kalkmasına izin verme", warn:"DİZ: Kalça rotatorlarını açar — menisküs stresi azalır", alts:[] },
        ]},

        { name: "🏋️ KUVVET — Hız & Güç", color: "#8338EC", exercises: [
          { name:"KB Swing (Heavy)", sets:"5 × 10", muscle:"Posterior chain patlayıcı güç — hip extension", how:["Ağır KB — hip hinge başlangıç","Kalçayı patlayıcı öne it","KB omuz hizasına — kollar pasif","Kontrollü geri"], avoid:"Squat hareketi yapmaya çalışma", warn:"🟡 BEL FITIĞI: Hip hinge — squat değil. Omurga nötral şart. Ağrıda Glute Bridge ile değiştir. ROTATOR CUFF: Ağrıda DB Swing tercih et", alts:["Dumbbell Swing", "Glute Bridge (ağır)", "Hip Hinge"] },
          { name:"Push Press", sets:"3 × 5", muscle:"Tüm vücut — bacak + omuz + core koordinasyon", how:["DB'leri omuz hizasında","Hafif diz bükümü — patlayıcı it","Bacak gücüyle başla — kollar tamamlar","Kontrollü indir"], avoid:"Sadece kollarla itme — bacak kullan", warn:"🟡 BOYUN FITIĞI: Boyun nötral — başı öne eğme. Ağrıda Landmine Press'e geç — en güvenli overhead. ROTATOR CUFF: Ağrıda landmine'a geç", alts:["Landmine Push Press", "DB Shoulder Press (oturarak)", "Arnold Press"] },
          { name:"Trap Bar / DB Shrug Carry Combo", sets:"3 × 20m", muscle:"Trapez üst, rhomboid, core — yük altında postür", how:["DB'leri omuz hizasında (rack pozisyon)","20 metre yürü","Sonra Farmer Carry pozisyonuna al","20 metre daha yürü"], avoid:"Boynu büküp öne eğilme", warn:null, alts:["Farmer Carry","Yoked Carry"] },
        ]},

        {
        "name": "🤸 KALİSTENİK — Pull-up Max & Progression Test",
        "color": "#2A9D8F",
        "exercises": [
        {
        "name": "Dead Hang",
        "sets": "4 × max süre",
        "muscle": "Grip, lat, omurga dekompresyon",
        "how": [
        "Bardan asıl — aktif omuz",
        "Mümkün olduğu kadar uzan",
        "Süreyi not al — her hafta kaydet",
        "PR kır"
        ],
        "avoid": "Pasif sarkma",
        "warn": "Grip gücü kalisteniğin gizli anahtarı — takip et",
        "alts": []
        },
        {
        "name": "Pull Up Max Test",
        "sets": "3 set × maksimum",
        "muscle": "Tüm çekme zinciri — haftalık ilerleme ölçümü",
        "how": [
        "Her sette maksimum temiz tekrar",
        "Set arası 3dk tam dinlenme",
        "Tekrar sayısını not al",
        "Haftalık trend takip et"
        ],
        "avoid": "Kısmi range — geçersiz sayılır",
        "warn": "Askeri fitness testlerinde standart ölçüm — bu sayı hedefini gösterir",
        "alts": [
        "Chin Up Max",
        "Assisted Pull Up"
        ]
        },
        {
        "name": "Muscle-up Prep",
        "sets": "3 × 5",
        "muscle": "Pull + push geçişi — üst kalisteniğin zirvesi",
        "how": [
        "Yüksek pull-up: göğsü bara çek",
        "Geçiş anında dirseği barın üstüne al",
        "Dip pozisyonuna it",
        "Yapamıyorsan band yardımıyla öğren"
        ],
        "avoid": "Sadece kollarla çekme — tüm vücut momentum",
        "warn": "ROTATOR CUFF: Kipping hareketi omuz stresi yaratır — ağrıda bu bloğu atla, sadece high pull-up yap",
        "alts": [
        "Assisted Muscle-up",
        "Bar Transition Drill",
        "Negative Muscle-up"
        ]
        }
        ]
        },

        { name: "⚡ KONDİSYON — Uzun Devre", color: "#990000", exercises: [
          { name:"20 Dakika Sürekli Devre", sets:"20 dakika sürekli", muscle:"Full body aerobik kapasite", how:["Her hareket 40 sn, arası 20 sn:","1. Jumping Jack / Jump Rope","2. Push Up","3. Inverted Row / Band Pull","4. Glute Bridge","5. Mountain Climber","6. Bear Crawl 10m ileri geri","Devre tamamlandı — başa dön","Kaç tur tamamladığını not al"], avoid:"Durmak — tempo düşür ama dur", warn:"Aerobik baz olmadan güç dayanıklılığa dönüşmez", alts:["Rowing Machine 20 dk","Run/Walk 20 dk"] },
        ]},

                {
        "name": "🤸 KALİSTENİK — Push/Dip Max & Handstand",
        "color": "#E76F51",
        "exercises": [
                {
                        "name": "Push Up Max Test",
                        "sets": "3 set × maksimum",
                        "muscle": "Göğüs, triceps, core",
                        "how": [
                                "Maksimum temiz tekrar",
                                "3dk set arası",
                                "Sayı not al — trend takip"
                        ],
                        "avoid": "Kalça yukarı — geçersiz",
                        "warn": "Standart fitness testi",
                        "alts": [
                                "Knee Push Up"
                        ]
                },
                {
                        "name": "Dip Max Test",
                        "sets": "2 set × maksimum",
                        "muscle": "Triceps, alt göğüs",
                        "how": [
                                "Paralel bar — tam üst pozisyondan başla",
                                "Yavaşça in — 90° dirsek açısına kadar",
                                "Patlayıcı it — tam yukarı",
                                "Form bozulunca dur — o son tekrar sayılmaz",
                                "Tekrar sayısını not al — haftalık takip"
                        ],
                        "avoid": "Kısmi range — tam aşağı inmeden sayma",
                        "warn": "Hedef: 15+ dip = güçlü pressing temeli",
                        "alts": []
                },
                {
                        "name": "Wall Handstand Hold",
                        "sets": "3 × max süre",
                        "muscle": "Omuz stabilite, core, bilek",
                        "how": [
                                "Duvara karşı el duruşu",
                                "Vücut düz — core sıkı",
                                "Süreyi not al"
                        ],
                        "avoid": "Beli çukurlaştırma",
                        "warn": "ROTATOR CUFF: Omuz ağrısında pike hold ile değiştir. Her hafta 5sn artır",
                        "alts": [
                                "Box Handstand",
                                "Pike Hold"
                        ]
                }
        ]
},

{ name: "🎯 CORE — Haftalık Kapanış", color: "#6C63FF", exercises: [
          { name:"Ab Wheel Rollout", sets:"3 × 8", muscle:"Core anterior zinciri — full", how:["Diz üstünde başla","Öne yuvarla — kontrollü","Geri çek"], avoid:"Beli sarkıtma", warn:null, alts:["Dead Bug", "Hollow Body Hold", "Plank to Pike"] },
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique", how:["Sol yanına yat — sol dirsek omuz altında tam dik", "Ayakları üst üste veya öne-arkaya aç", "Kalçayı yerden kaldır — omuzdan topuğa düz çizgi", "Üst kolu tavana uzan veya kalçaya koy — 30-45 sn tut"], avoid:"Kalçanın öne veya geriye sarkması", warn:"SKOLYOZ: Her iki tarafı eşit süre yap — lateral core dengesi kritik", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Sağ yanına yat — sağ dirsek omuz altında", "Kalçayı yerden kaldır — düz çizgi", "Her iki taraf eşit süre — 30-45 sn", "Nefes almayı kesme"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Asla bir tarafı atlama", alts:[] },
        ]},

        { name: "❄️ SOĞUMA — Derin Esneme", color: "#8338EC", exercises: [
          { name:"Child's Pose", sets:"1 × 60sn", muscle:"Sırt, omuz", how:["Diz üstü otur, topuklarına otur", "Kolları öne uzat — yere koy", "Alnı yere koy veya mindere", "Tamamen bırak — pasif esneme — 45-60 sn"], avoid:"Zorla uzanma — yer çekimi işini yapsın", warn:"Diz ağrısı varsa topuklara oturmak yerine daha dik dur", alts:[] },
          { name:"Supine Spinal Twist Right", sets:"1 × 60sn", muscle:"Torasik", how:["Sırt üstü yat — kollar yana T şeklinde açık", "Sağ dizi 90° büküp sol tarafa yatır", "Sağ omuz yerde kalsın — ters yöne bak", "45-60 sn tut — nefes alarak derinleştir"], avoid:"Omuzların yerden kalkmasına izin verme", warn:"SKOLYOZ: Her iki tarafa mutlaka eşit süre uygula", alts:[] },
          { name:"Supine Spinal Twist Left", sets:"1 × 60sn", muscle:"Her taraf eşit", how:["Sırt üstü yat — kollar yana T şeklinde açık", "Sol dizi 90° büküp sağ tarafa yatır", "Sol omuz yerde kalsın — ters yöne bak", "Her iki taraf eşit süre — 45-60 sn"], avoid:"Omuzların yerden kalkmasına izin verme", warn:"SKOLYOZ: Her iki tarafa mutlaka eşit süre uygula", alts:[] },
          { name:"Hamstring, Obliques and Lat Stretch", sets:"2 × 45sn", muscle:"3 bölge", how:["Otur, bacağı uzat"], avoid:null, warn:null, alts:[] },
          { name:"Diaphragmatic Breathing", sets:"2 × 10 nefes", muscle:"Parasempatik — recovery", how:["Sırt üstü yat — dizler bükülü, ayaklar yerde", "Bir eli göğse, bir eli karna koy", "Burndan 4 sn nefes al — KARIN şişmeli, göğüs değil", "2 sn tut, ağızdan 6 sn yavaşça ver", "10 tekrar — her nefeste biraz daha derin"], avoid:"Göğüs yükseltme — nefes karna gitmeli", warn:"Parasempatik sistemi aktive eder — uyku kalitesini artırır, kortizolü düşürür", alts:[] },
        ]},
      ],
    },

    // ─── OFF DAYS ───────────────────────────────────
    {
      id: 5, title: "OFF 1", sub: "PAZARTESİ", focus: "Aktif Recovery", duration: "~15 dk", color: "#6C757D",
      type: "offday",
      blocks: [
        {
                "name": "🌿 RECOVERY — Sabah Rutini",
                "color": "#6C757D",
                "exercises": [
                        {
                                "name": "Diaphragmatic Breathing",
                                "sets": "2 × 10 nefes",
                                "muscle": "Diyafram, parasempatik aktivasyon",
                                "how": [
                                        "Sırt üstü yat — bir el göğse, bir el karna",
                                        "Burndan 4 sn al — karin şişmeli",
                                        "2 sn tut",
                                        "Ağızdan 6 sn ver",
                                        "10 tekrar"
                                ],
                                "avoid": "Göğüs yükseltme",
                                "warn": "Kortizol düşürür, kas onarımını hızlandırır — sabah ilk iş yap",
                                "alts": []
                        },
                        {
                                "name": "Cat and Cow",
                                "sets": "2 × 15",
                                "muscle": "Tüm omurga mobilite",
                                "how": [
                                        "Dört ayak — bilekler omuz altında",
                                        "Cat: nefes ver → sırtı yuvarlat",
                                        "Cow: nefes al → sırtı çukurlaştır",
                                        "Yavaş — 3-4 sn her pozisyon"
                                ],
                                "avoid": "Sadece belden yapma",
                                "warn": "Sabah uyanışında ilk 5 dk — omurga açılır",
                                "alts": []
                        },
                        {
                                "name": "Hip Flexor Stretch",
                                "sets": "2 × 45sn (her taraf)",
                                "muscle": "Hip flexor, kasık",
                                "how": [
                                        "Yarım diz — diz yerde, ayak önde",
                                        "Kalçayı öne it, posterior tilt",
                                        "Gövde dik — 45 sn",
                                        "Her iki taraf"
                                ],
                                "avoid": "Gövdeyi öne eğme",
                                "warn": "Pazar antrenman sonrası hip flexor sıkışır — aç",
                                "alts": []
                        },
                        {
                                "name": "Child's Pose",
                                "sets": "2 × 60sn",
                                "muscle": "Sırt, omuz, kalça",
                                "how": [
                                        "Diz üstü otur — topuklara otur",
                                        "Kolları öne uzat, alnı yere",
                                        "Tamamen bırak — 60 sn"
                                ],
                                "avoid": "Zorla uzanma",
                                "warn": null,
                                "alts": []
                        },
                        {
                                "name": "Supine Spinal Twist Right",
                                "sets": "1 × 60sn",
                                "muscle": "Torasik rotasyon, sırt",
                                "how": [
                                        "Sırt üstü — kollar yana",
                                        "Sağ dizi büküp sol tarafa yatır",
                                        "Sağ omuz yerde — sola bak",
                                        "60 sn"
                                ],
                                "avoid": "Omuzların yerden kalkması",
                                "warn": "SKOLYOZ: Her iki taraf eşit süre",
                                "alts": []
                        },
                        {
                                "name": "Supine Spinal Twist Left",
                                "sets": "1 × 60sn",
                                "muscle": "Her taraf eşit",
                                "how": [
                                        "Sol dizi büküp sağ tarafa yatır",
                                        "Sol omuz yerde — sağa bak",
                                        "60 sn"
                                ],
                                "avoid": "Omuzların yerden kalkması",
                                "warn": "SKOLYOZ: Asla bir tarafı atlama",
                                "alts": []
                        },
                        {
                                "name": "Prone Cobra",
                                "sets": "2 × 20sn",
                                "muscle": "Sırt ekstansörleri, postür",
                                "how": [
                                        "Yüzüstü yat",
                                        "Göğsü sırt kaslarıyla kaldır",
                                        "Kürek kemiklerini birleştir",
                                        "20 sn tut"
                                ],
                                "avoid": "Kollarla itmek",
                                "warn": "Pazar sonrası öne kapanan omuzları aç",
                                "alts": [
                                        "Superman Hold"
                                ]
                        },
                        {
                                "name": "Hug Knees to Chest",
                                "sets": "1 × 60sn",
                                "muscle": "Alt sırt, glute recovery",
                                "how": [
                                        "Sırt üstü — iki dizi göğse çek",
                                        "Hafifçe sağa sola salla",
                                        "60 sn"
                                ],
                                "avoid": "Boynu kaldırma",
                                "warn": "Pazar yük taşıma sonrası alt sırt için",
                                "alts": []
                        }
                ]
        }
],
    },
    {
      id: 6, title: "OFF 2", sub: "ÇARŞAMBA", focus: "Mobilite + Hafif Aktivasyon", duration: "~25 dk", color: "#6C757D",
      type: "offday",
      blocks: [
        {
                "name": "⚡ AKTİF RECOVERY — Ekipmansız",
                "color": "#6C757D",
                "exercises": [
                        {
                                "name": "Scapula Squeeze",
                                "sets": "3 × 15",
                                "muscle": "Rhomboid, orta trapez, postür",
                                "how": [
                                        "Ayakta veya sandalyede — dik duruş",
                                        "Kolları yana veya yanında serbest",
                                        "Kürek kemiklerini sıkıştır",
                                        "2 sn tut, bırak"
                                ],
                                "avoid": "Omuzları kulağa kaldırma",
                                "warn": "Band Pull Apart'ın ekipmansız versiyonu",
                                "alts": [
                                        "Prone Y squeeze"
                                ]
                        },
                        {
                                "name": "Incline Push Up",
                                "sets": "3 × 10",
                                "muscle": "Göğüs, triceps, serratus",
                                "how": [
                                        "Masa, tezgah veya duvara elleri koy",
                                        "Vücut düz — core sıkı",
                                        "3 sn yavaşça in, kontrollü it",
                                        "Tempo yavaş"
                                ],
                                "avoid": "Beli sarkıtma",
                                "warn": "Off day push-up — kan dolaşımını artırır, hareket örüntüsünü korur",
                                "alts": [
                                        "Wall Push Up",
                                        "Knee Push Up"
                                ]
                        },
                        {
                                "name": "Glute Bridge",
                                "sets": "3 × 20",
                                "muscle": "Glute, hamstring aktivasyon",
                                "how": [
                                        "Sırt üstü — dizler bükülü",
                                        "Topuklarla bas, kalçayı kaldır",
                                        "1 sn sıkıştır, 2 sn indir"
                                ],
                                "avoid": "Beli aşırı kaldırma",
                                "warn": "Mid-week glute aktivasyonu — Perşembe performansına katkı",
                                "alts": [
                                        "Single Leg Glute Bridge"
                                ]
                        },
                        {
                                "name": "Side Plank Left",
                                "sets": "2 × 30sn",
                                "muscle": "Sol oblique, lateral core",
                                "how": [
                                        "Sol dirsek omuz altında",
                                        "Kalça yukarı — 30 sn"
                                ],
                                "avoid": "Kalça sarkmasın",
                                "warn": "SKOLYOZ günlük yapılabilir",
                                "alts": []
                        },
                        {
                                "name": "Side Plank Right",
                                "sets": "2 × 30sn",
                                "muscle": "Sağ oblique",
                                "how": [
                                        "Her iki taraf eşit"
                                ],
                                "avoid": "Kalça sarkmasın",
                                "warn": "SKOLYOZ: Asla bir tarafı atlama",
                                "alts": []
                        },
                        {
                                "name": "World Greatest Stretch",
                                "sets": "2 × 5 (her taraf)",
                                "muscle": "Kalça, torasik, omuz — full body mobilite",
                                "how": [
                                        "Büyük lunge — sağ ayak önde",
                                        "Sağ eli sağ ayağın yanına koy",
                                        "Sol kolu tavana aç — gözler elle",
                                        "3 sn tut, geri dön",
                                        "Her iki taraf"
                                ],
                                "avoid": "Aceleyle yapma",
                                "warn": "Tüm vücudu tek harekette ısıtır",
                                "alts": []
                        },
                        {
                                "name": "Chin Tuck",
                                "sets": "3 × 15",
                                "muscle": "Derin boyun fleksörleri",
                                "how": [
                                        "Sandalyede dik otur",
                                        "Çeneni geriye it — 2 sn tut",
                                        "Bırak, tekrarla"
                                ],
                                "avoid": "Başı aşağı eğme",
                                "warn": "Bilgisayar başındaysan saatte bir yap",
                                "alts": []
                        }
                ]
        }
],
    },
    {
      id: 7, title: "OFF 3", sub: "CUMA", focus: "Cumartesi Hazırlığı", duration: "~15 dk", color: "#6C757D",
      type: "offday",
      blocks: [
        {
                "name": "🔋 HAZİRLIK — Cumartesi Öncesi",
                "color": "#6C757D",
                "exercises": [
                        {
                                "name": "Hip Flexor Stretch",
                                "sets": "2 × 45sn (her taraf)",
                                "muscle": "Hip flexor — Lower günü öncesi",
                                "how": [
                                        "Yarım diz — diz yerde, ayak önde",
                                        "Kalçayı öne it, posterior tilt",
                                        "Gövde dik — 45 sn her taraf"
                                ],
                                "avoid": "Gövdeyi öne eğme",
                                "warn": "Cumartesi Lower öncesi akşam yap",
                                "alts": []
                        },
                        {
                                "name": "Floor Bridge",
                                "sets": "3 × 15",
                                "muscle": "Glute aktivasyon",
                                "how": [
                                        "Sırt üstü — dizler bükülü",
                                        "Kalçayı kaldır, 1 sn sıkıştır",
                                        "Yavaşça indir"
                                ],
                                "avoid": "Beli aşırı kaldırma",
                                "warn": "Cumartesi için glute pre-aktivasyon",
                                "alts": []
                        },
                        {
                                "name": "Prone External Rotation",
                                "sets": "2 × 15 (her taraf)",
                                "muscle": "Infraspinatus, teres minor — rotator cuff",
                                "how": [
                                        "Yüzüstü yat — bir kolun dirseği 90° büküp yanına koy",
                                        "Ön kolu tavana doğru kaldır — dirsek sabit",
                                        "Sadece önkol döner",
                                        "Yavaşça geri indir"
                                ],
                                "avoid": "Omuz kaslarıyla kaldırma — sadece dış rotasyon",
                                "warn": "Band olmadan rotator cuff prehab — bant yerine geçer",
                                "alts": [
                                        "Side-lying External Rotation"
                                ]
                        },
                        {
                                "name": "Supine Hip Rotation",
                                "sets": "2 × 10 (her taraf)",
                                "muscle": "Kalça iç-dış rotatorlar",
                                "how": [
                                        "Sırt üstü — dizler bükülü",
                                        "Sağ dizi sağa yatır — 10 sn tut",
                                        "Geri gel, sol dizi sola — 10 sn",
                                        "Ağrı varsa range'i azalt"
                                ],
                                "avoid": "Kalçanın yerden kalkması",
                                "warn": "DİZ: Kalça rotatorlarını açar — menisküs stresi azalır",
                                "alts": []
                        },
                        {
                                "name": "Cat and Cow",
                                "sets": "2 × 10",
                                "muscle": "Omurga mobilite",
                                "how": [
                                        "Dört ayak — nefesle birlikte",
                                        "3-4 sn her pozisyon",
                                        "Yavaş — sırtı ısıt"
                                ],
                                "avoid": "Aceleyle yapma",
                                "warn": "Cumartesi Lower öncesi omurga hazırlığı",
                                "alts": []
                        },
                        {
                                "name": "Ankle Circle",
                                "sets": "2 × 10 (her yön)",
                                "muscle": "Ayak bileği mobilite",
                                "how": [
                                        "Otur — bir ayağı kaldır",
                                        "10 saat yönünde, 10 ters",
                                        "Her iki ayak"
                                ],
                                "avoid": "Dizden yapmaya çalışma",
                                "warn": "Menisküs için ihmal edilmez",
                                "alts": []
                        }
                ]
        }
],
    },
  ],
};
