export const PROGRAM3 = {
  meta: {
    name: "Kalistenik Kuvvet",
    phase: "Faz 2 — Hacim & Yoğunlaşma",
    weeks: "Hafta 1–8",
    description: "Kalistenik skill önce, kuvvet tabanı sonra. İzolasyon yok. Skill taze sinir sistemiyle yapılır. Pull-up + Dip ana yollar.",
  },

  periodization: [
    { week: 1, label: "Hacim Başlangıç", sets_modifier: 1.0, note: "Form otur, ağırlığı tanı" },
    { week: 2, label: "Hacim", sets_modifier: 1.0, note: "Aynı ağırlık — daha temiz form" },
    { week: 3, label: "Hacim Artışı", sets_modifier: 1.2, note: "Ağırlığı %5-10 artır" },
    { week: 4, label: "Yoğunluk", sets_modifier: 0.9, note: "Rep azalt, ağırlık artır" },
    { week: 5, label: "Yoğunluk Artışı", sets_modifier: 0.9, note: "En ağır haftalar başlıyor" },
    { week: 6, label: "Zirve", sets_modifier: 0.8, note: "Maksimum ağırlık — düşük rep" },
    { week: 7, label: "Max Test", sets_modifier: 1.0, note: "Kalistenik max test — PR hafta" },
    { week: 8, label: "Deload", sets_modifier: 0.5, note: "Hacim yarıya in, ağırlık %60" },
  ],

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
      id: 1, title: "GÜN 1", sub: "SALI", focus: "Push + Pull + Hinge + Squat", duration: "~80 dk", color: "#C1121F",
      type: "training",
      injury: "⚠️ BEL: Deadlift'te nötral omurga. DİZ: Goblet Squat'ta knee tracking. OMUZ: Floor Press'te 45° dirsek. ROTATOR CUFF: Face Pull her günün önceliği.",
      conditioning: "Sprint Interval — en yüksek kardiyovasküler stres",
      blocks: [
        { name: "🔥 ISINMA — Postür & Aktivasyon", color: "#CC5500", exercises: [
          { name:"Cat-Cow Mobilite", sets:"2 × 10", muscle:"Torasik + lumbar mobilite, erektör spinae", how:["Dört ayak pozisyon — el omuz altında, diz kalça altında","Nefes al: beli sarkıt, başı kaldır (cow)","Nefes ver: beli yay gibi yukarı, başı aşağı (cat)","Akıcı yavaş geçiş — 10 tekrar"], avoid:"Beli aşırı sarkıtma", warn:"BEL FITIĞI + BOYUN FITIĞI: Omurga hareketliliğini artırır, disk basıncını azaltır", alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid, postür", how:["Bandı iki elle önde tut","Kolları yanlara aç — kürek kemiklerini birleştir","1 sn tut"], avoid:"Omuzları kulağa kaldırma", warn:"ROTATOR CUFF: Her gün yap", alts:[] },
          { name:"Hip Hinge", sets:"2 × 10", muscle:"Posterior chain aktivasyon", how:["Kalçayı geriye it","Sırt düz, dizler hafif bükülü","Geri gel"], avoid:"Sırtı büküp öne eğme", warn:"Deadlift öncesi şart", alts:[] },
        ]},
        { name: "🛡 SAKATILIK PROTOKOLÜ — Zorunlu (5 dk)", color: "#7B241C", exercises: [
          { name:"Band External Rotation", sets:"3 × 15 (her taraf)", muscle:"İnfraspinatus, teres minor — rotator cuff aktif stabilizasyon", how:["Dirsek 90° — vücuda yapışık","Bandı dışa döndür — omuz hizasına","1 sn tut — kontrollü geri","Asla momentum kullanma"], avoid:"Dirsekleri vücuttan ayırma", warn:"ROTATOR CUFF: Tedavindir. Atlama. Her antrenman öncesi zorunlu", alts:["Cable External Rotation"] },
          { name:"Scapular Wall Slide", sets:"2 × 10", muscle:"Serratus anterior, trapez orta/alt — scapula kontrolü", how:["Sırtını duvara daya — kollar W pozisyonu","Yavaşça kolları yukarı kaydır — U yap","Kürek kemikleri duvarda kalacak — asla ayrılmayacak"], avoid:"Kürek kemiklerinin duvardan ayrılması", warn:"KİFOZ + ROTATOR CUFF: Scapula stabilizasyonu rotator cuff'ı besler", alts:[] },
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Derin boyun fleksörleri — servikal stabilizasyon", how:["Dik otur","Çeneni geriye it — çift çene","2 sn tut — bırak"], avoid:"Başı aşağı eğme", warn:"BOYUN FITIĞI: Servikal disk basıncını azaltır. Her gün zorunlu", alts:[] },
        ]},

        { name: "🤸 KALİSTENİK — Pull-up Skill (Önce Yap)", color: "#2A9D8F", exercises: [
          { name:"Dead Hang", sets:"3 × 30sn", muscle:"Lat, ön kol, grip, omurga dekompresyon", how:["Bardan asıl — overhand tutuş","Omuzları aktif tut — aşağı çek, kulağa değil","Vücut sakin — sallanma yok","Nefes al — omurgayı uzat"], avoid:"Tamamen pasif sarkma — omuzlar aktif olmalı", warn:"Pull-up yolunun temeli — her Salı buradan başla", alts:["Flexed Arm Hang","Active Hang"] },
          { name:"Chin-up Negative", sets:"5 × 5 (5sn indir)", muscle:"Biceps, lat — eccentric güç", how:["Zıplamayla üst pozisyona gel","5 saniyede yavaşça in","Tam alta in — bırak","Her tekrar temiz başla"], avoid:"Hızlı düşme — 5sn şart", warn:"Konsantrik yapamazsan negatifle güç kazan", alts:["Assisted Chin Up","Band Pull Up"] },
          { name:"Assisted Pull-up", sets:"4 × 6", muscle:"Lat, teres major, biceps — tam hareket", how:["Bant veya makine yardımıyla","Tam aşağı — tam yukarı — tam range","Göğsü bara doğru çek","3sn indir"], avoid:"Kısmi range — yarım tekrar saymaz", warn:"Haftadan haftaya yardımı azalt", alts:["Lat Pulldown","Band Pull Up"] },
        ]},

        { name: "🏋️ KUVVET — Push + Pull + Hinge + Squat", color: "#C1121F", exercises: [
          { name:"Dumbbell Deadlift", sets:"4 × 5", muscle:"Posterior chain — hamstring, glute, erektör, trapez", how:["Sırt düz — göğsü aç","Kürek kemiklerini aşağı çek","Kalçayı öne iterek kalk"], avoid:"Sırtı yuvarlama — nötral şart", warn:"🟡 BEL FITIĞI: Omurga nötral. Trap Bar tercih et. SKOLYOZ: simetri kontrol", alts:["Trap Bar Deadlift","Romanian Deadlift","Hex Bar Deadlift"], alt_reasons:["BEL: Omurgayı dik tutar","BEL: Az spinal yük","BEL: En güvenli varyant"] },
          { name:"Goblet Squat", sets:"4 × 8", muscle:"Quad, glute, core stabilite — squat pattern", how:["DB veya KB göğüste tut — iki elle","Topuklar omuz genişliğinde — dizler dışa","Derin otur — kalça topuğun dibine","Topuklarla it — tam uzat"], avoid:"Topukların kalkması veya dizlerin içe çökmesi", warn:"DİZ: En güvenli squat varyantı. Ağırlık gövdeyi dik tutar. Menisküs için knee tracking önemli", alts:["Box Squat","Bulgarian Split Squat","Reverse Lunge"], alt_reasons:["DİZ: Oturup kalkma — kısa ROM","DİZ: Unilateral — daha az yük","DİZ: Hamle geriye — daha az knee stress"] },
          { name:"Floor Press", sets:"4 × 8", muscle:"Göğüs, triceps, ön delt — zeminde güvenli press", how:["Sırt üstü yat — DB'ler göğüs hizasında","Dirsekler 45° — kulaktan uzak","Tam uzat — kürek kemikleri yerde sabit","Yavaşça in — dirsekler yere değince dur"], avoid:"Dirsekleri tam açma — omuz riski", warn:"ROTATOR CUFF: Bench'ten güvenli — ROM limitleniyor. Omuz ağrısında range'i azalt", alts:["Push-up","Landmine Press","DB Shoulder Press"], alt_reasons:["OMUZ: Vücut ağırlığı","OMUZ: Açılı press — scapula sabit","OMUZ: Oturarak destekli"] },
        ]},


        { name: "⚡ KONDİSYON — Rowing Interval", color: "#990000", exercises: [
          { name:"Rowing Interval", sets:"6 × 30sn max / 30sn dinlenme", muscle:"Full body — kardiyovasküler kapasite, sırt, kol, core", how:["Kürek makinesi veya air bike","30 sn maksimum efor","30 sn yavaş çekiş","6 tur — form bozulmasın"], avoid:"Beli yuvarlama — core sıkı tut", warn:"MENİSKÜS: Darbe yok — rowing sprint kadar etkili kondisyon sağlar", alts:["Assault Bike Interval","Jump Rope HIIT","Battle Rope"] },
        ]},

      ],

    },

    // ─────────────────────────────────────────────────
    {
      id: 2, title: "GÜN 2", sub: "PERŞEMBE", focus: "Push + Pull + Squat + Kalistenik", duration: "~80 dk", color: "#2A9D8F",
      type: "training",
      injury: "⚠️ BEL: KB Swing'de hip hinge — squat değil. DİZ: Split Squat'ta ön dizi izle. OMUZ: Dip'te 90° altına inme. ROTATOR CUFF: Rear Delt Fly kontrollü.",
      conditioning: "Amrap / Timed Circuit — anaerobik eşik",
      blocks: [
        { name: "🔥 ISINMA — Mobilite & Aktivasyon", color: "#CC5500", exercises: [
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Torasik mobilite", how:["Foam roller'ı üst sırta koy (T4-T8)","Yavaşça yuvarlan","Ağrılı noktada 20-30 sn kal"], avoid:"Bel üzerinde yapma", warn:"KİFOZ + SKOLYOZ: Torasik mobilite şart", alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid — günlük rutin", how:["Bandı iki elle önde tut","Kolları yanlara aç — kürek kemiklerini birleştir","1 sn tut"], avoid:"Omuzları kulağa kaldırma", warn:"ROTATOR CUFF: Her gün bu hareket", alts:[] },
          { name:"Reverse Lunge (ağırlıksız)", sets:"2 × 8 (her bacak)", muscle:"Quad, glute, kalça aktivasyon", how:["Ayaklar bitişik — dik dur","Sağ ayağı geriye adım at","Diz yere yakın — neredeyse değiyor","Ön ayakla it — dön"], avoid:"Ön dizi çok öne götürme", warn:"DİZ: Geriye hamle — daha az knee dominant", alts:[] },
        ]},
        { name: "🛡 SAKATILIK PROTOKOLÜ — Zorunlu (5 dk)", color: "#7B241C", exercises: [
          { name:"Band External Rotation", sets:"3 × 15 (her taraf)", muscle:"İnfraspinatus, teres minor — rotator cuff aktif stabilizasyon", how:["Dirsek 90° — vücuda yapışık","Bandı dışa döndür — omuz hizasına","1 sn tut — kontrollü geri","Asla momentum kullanma"], avoid:"Dirsekleri vücuttan ayırma", warn:"ROTATOR CUFF: Tedavindir. Atlama. Her antrenman öncesi zorunlu", alts:["Cable External Rotation"] },
          { name:"Scapular Wall Slide", sets:"2 × 10", muscle:"Serratus anterior, trapez orta/alt — scapula kontrolü", how:["Sırtını duvara daya — kollar W pozisyonu","Yavaşça kolları yukarı kaydır — U yap","Kürek kemikleri duvarda kalacak — asla ayrılmayacak"], avoid:"Kürek kemiklerinin duvardan ayrılması", warn:"KİFOZ + ROTATOR CUFF: Scapula stabilizasyonu rotator cuff'ı besler", alts:[] },
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Derin boyun fleksörleri — servikal stabilizasyon", how:["Dik otur","Çeneni geriye it — çift çene","2 sn tut — bırak"], avoid:"Başı aşağı eğme", warn:"BOYUN FITIĞI: Servikal disk basıncını azaltır. Her gün zorunlu", alts:[] },
        ]},

        { name: "🤸 KALİSTENİK — Push + Pull Antagonist", color: "#F4A261", exercises: [
          { name:"Push Up Variations", sets:"4 × max", muscle:"Göğüs, triceps, ön delt, serratus, core", how:["Mümkünse normal, zor ise dizde","Vücut düz — kalça ne yukarı ne aşağı","Dirsekler 45° — kulaktan uzak","Göğüs yere değince kalk"], avoid:"Dirsekleri tam açma — omuz riski", warn:"ROTATOR CUFF: Dirsek açısına dikkat — 45° kural", alts:["Knee Push Up","Incline Push Up","Diamond Push Up"] },
          { name:"Scapula Pull Up", sets:"3 × 12", muscle:"Lat aktivasyon, scapula kontrol — pull-up temeli", how:["Bardan asıl — kollar düz","Sadece kürek kemiklerini aşağı çek","Vücut hafifçe yukarı kalkar","Kontrollü geri sal"], avoid:"Dirsekleri bükme — sadece scapula hareketi", warn:"Salı pull-up serisinin devamı — momentum koru", alts:[] },
          { name:"Dip Negative", sets:"5 × 5 (5sn indir)", muscle:"Triceps, alt göğüs, ön delt — eccentric", how:["Paralel barlarda üst pozisyon","5 saniyede yavaşça in","Tam aşağı — dirsekler 90°'nin biraz altına","Zıplayarak veya adımla tekrar üste gel"], avoid:"Hızlı düşme — 5sn şart", warn:"OMUZ: Çok aşağı inme — 90° yeter", alts:["Bench Dip Negative","Ring Dip Negative"] },
          { name:"Full Dip", sets:"3 × max", muscle:"Triceps, göğüs, ön delt — full pressing", how:["Paralel bar — bilek altında","Hafif öne eğil — göğüs dip'i","Tam alta — topukları sıkıştır","Güçlü it — tam uzat"], avoid:"Aşırı aşağı inme — omuz ligamanı riski", warn:"OMUZ: Ağrıda ring dip'e geç — daha doğal pozisyon", alts:["Ring Dip","Bench Dip","Assisted Dip"] },
        ]},

        { name: "🏋️ KUVVET — Push + Pull + Squat + Hinge", color: "#2A9D8F", exercises: [
          { name:"Bulgarian Split Squat", sets:"3 × 8 (her bacak)", muscle:"Quad, glute, hip flexor — unilateral squat", how:["Arka ayak bench'te","Ön diz topuğun üzerinde","Dikey olarak in — 90°","Ön topukla it — kalk"], avoid:"Ön dizi ayak ucunu geçirme", warn:"DİZ: Menisküs için ön dizi izle — ağrıda Reverse Lunge'a geç", alts:["Reverse Lunge","Step Down","Single Leg Press"], alt_reasons:["DİZ: Geriye hamle","DİZ: Eksantrik iniş","DİZ: Makine destekli"] },
          { name:"Kettlebell Swing", sets:"4 × 12", muscle:"Glute, hamstring, core — patlayıcı hinge", how:["Hip hinge — squat değil","KB bacaklar arasından geri götür","Kalçayı patlayıcı öne it","KB omuz hizasına — kollar değil kalça iter"], avoid:"Squat gibi diz bükme — kalça hareketi", warn:"🟡 BEL FITIĞI: Hip hinge tekniği mükemmel olmalı. Ağrıda Glute Bridge ile değiştir", alts:["Dumbbell Swing","Hip Hinge hızlı","Glute Bridge"], alt_reasons:["BEL: DB ile daha kontrollü","BEL: Sadece kalça","BEL: Güvenli glute aktivasyonu"] },
          { name:"Landmine Press", sets:"3 × 8 (her taraf)", muscle:"Ön delt, triceps, serratus, core anti-rotation", how:["Barlın serbest ucunu göğüs hizasında tut","Çapraz yukarı it — tam uzat","Yavaşça geri al","SKOLYOZ: Core sıkı, bel nötral"], avoid:"Beli hiperextend etme", warn:"ROTATOR CUFF: En güvenli overhead alternatif", alts:["DB Overhead Press","Arnold Press","Push Press"], alt_reasons:["OMUZ: Oturarak destekli","OMUZ: Dönüşlü — tüm ROM","OMUZ: Bacak yardımıyla"] },
        ]},

        { name: "⚡ KONDİSYON — AMRAP Circuit", color: "#990000", exercises: [
          { name:"AMRAP 8 Dakika", sets:"8 dakika × maksimum tur", muscle:"Full body — aerobik + anaerobik kondisyon", how:["5 Push-up + 5 Inverted Row + 10 Goblet Squat + 10 KB Swing","Mümkün olduğunca çok tur — 8 dk boyunca","Her turu say — ilerlemeyi takip et","Formu düşürme — kaliteyi koru"], avoid:"Sadece kolay hareketleri seçme", warn:"Aerobik eşikte çalış — konuşabilirsin ama zor", alts:["20dk Zone 2 Koşu","Rowing AMRAP"] },
        ]},

      ],

    },

    // ─────────────────────────────────────────────────
    {
      id: 3, title: "GÜN 3", sub: "CUMARTESİ", focus: "Posterior Chain + Fonksiyonel", duration: "~80 dk", color: "#F4A261",
      type: "training",
      injury: "⚠️ BEL: RDL'de nötral omurga. DİZ: Step-Up'ta knee tracking. OMUZ: Pike Push-Up'ta range azalt. ROTATOR CUFF: Face Pull önce.",
      conditioning: "Yük Taşıma Devresi — dayanıklılık gücü",
      blocks: [
        { name: "🔥 ISINMA — Fonksiyonel Hazırlık", color: "#CC5500", exercises: [
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Torasik mobilite", how:["Foam roller'ı üst sırta koy","Yavaşça yuvarlan — ağrılı noktada kal"], avoid:"Bel üzerinde yapma", warn:"KİFOZ + SKOLYOZ: Torasik mobilite şart", alts:[] },
          { name:"Hip Circle", sets:"2 × 10 (her yön)", muscle:"Kalça mobilite, rotatorlar", how:["Ayakta — eller belde","Kalçayla büyük daire çiz","10 saat yönü, 10 saat karşıtı"], avoid:"Dizleri bükme", warn:"Her antrenmandan önce kalça mobilite", alts:[] },
          { name:"Band Face Pull", sets:"3 × 15", muscle:"Arka delt, rotator cuff — günlük rutin", how:["Bant göz hizasında","İki elle — başparmaklar arkaya","Çek ve dışa döndür — dirsekler kulak hizasına","1 sn tut"], avoid:"Dirsekleri aşağı çekme", warn:"ROTATOR CUFF: Her gün bu hareket — tedavindir", alts:["Band External Rotation","Rear Delt Fly"] },
          { name:"Reverse Lunge (ağırlıksız)", sets:"2 × 8 (her bacak)", muscle:"Kalça ve bacak aktivasyon", how:["Sağ ayağı geriye adım at","Diz yere yakın","Ön ayakla it — dön"], avoid:"Ön dizi çok öne götürme", warn:"DİZ + MENİSKÜS: Geriye hamle — öne göre daha az knee stress. Ön dizi topuğun üzerinde tut", alts:[] },
        ]},
        { name: "🛡 SAKATILIK PROTOKOLÜ — Zorunlu (5 dk)", color: "#7B241C", exercises: [
          { name:"Band External Rotation", sets:"3 × 15 (her taraf)", muscle:"İnfraspinatus, teres minor — rotator cuff aktif stabilizasyon", how:["Dirsek 90° — vücuda yapışık","Bandı dışa döndür — omuz hizasına","1 sn tut — kontrollü geri","Asla momentum kullanma"], avoid:"Dirsekleri vücuttan ayırma", warn:"ROTATOR CUFF: Tedavindir. Atlama. Her antrenman öncesi zorunlu", alts:["Cable External Rotation"] },
          { name:"Scapular Wall Slide", sets:"2 × 10", muscle:"Serratus anterior, trapez orta/alt — scapula kontrolü", how:["Sırtını duvara daya — kollar W pozisyonu","Yavaşça kolları yukarı kaydır — U yap","Kürek kemikleri duvarda kalacak — asla ayrılmayacak"], avoid:"Kürek kemiklerinin duvardan ayrılması", warn:"KİFOZ + ROTATOR CUFF: Scapula stabilizasyonu rotator cuff'ı besler", alts:[] },
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Derin boyun fleksörleri — servikal stabilizasyon", how:["Dik otur","Çeneni geriye it — çift çene","2 sn tut — bırak"], avoid:"Başı aşağı eğme", warn:"BOYUN FITIĞI: Servikal disk basıncını azaltır. Her gün zorunlu", alts:[] },
        ]},

        { name: "🤸 KALİSTENİK — L-sit & Handstand Skill", color: "#8338EC", exercises: [
          { name:"Support Hold", sets:"3 × 20sn", muscle:"Triceps, ön delt, core basınç", how:["Paralel barlarda kolları tam uzat","Omuzları bastır — kulağa değil","Vücut hafif salınabilir — sabit tut","20 sn"], avoid:"Dirsekleri bükme", warn:"L-sit'in temeli — önce süre, sonra bacak kaldır", alts:["Chair Support Hold","Ring Support"] },
          { name:"Knee Tuck Hold", sets:"4 × 15sn", muscle:"Hip flexor, core basınç, triceps", how:["Support pozisyonda — dizleri çek","Kalçayı kaldır — L-sit'e geçiş","15 sn tut — nefesi kesme","Her sette süreyi uzatmaya çalış"], avoid:"Omuzların sarkması", warn:"L-sit'e giden yol — daha iyi skip", alts:["Tuck L-sit","Floor L-sit"] },
          { name:"Wall Handstand Hold", sets:"3 × 20sn", muscle:"Omuz stabilite, core, bilek — handstand temeli", how:["Duvara yakın — eller omuz genişliğinde","Bacakları duvara koy — kontrollü","Omuzları kulak hizasına it — aktif omuz","Gövde düz — kalça sıkı"], avoid:"Beli aşırı bükme", warn:"ROTATOR CUFF: Scapular depression aktif — omuz stabilite", alts:["Pike Hold","Headstand"] },
          { name:"Hollow Body Hold", sets:"4 × 20sn", muscle:"Anterior core zinciri — kalisteniğin motoru", how:["Sırt üstü — kollar kulaklara yapışık","Bacaklar düz 20-30° yukarıda","Bel yerde","20 sn — nefes almayı kesme"], avoid:"Belin yükselmesi", warn:"Planche, muscle-up, L-sit'in çekirdeği", alts:["Bent Knee Hollow"] },
        ]},

        { name: "🏋️ KUVVET — Posterior Chain + Push + Pull", color: "#F4A261", exercises: [
          { name:"Romanian Deadlift", sets:"4 × 8", muscle:"Hamstring, glute, erektör — posterior chain temeli", how:["Ayaklar kalça genişliğinde","Barı/DB'yi bacak boyunca indir — doğrusal","Hamstring'de gerilme hissedince dur","Kalçayı öne it — kalk"], avoid:"Dizleri tam düzeltme — hafif bükülü kalacak", warn:"🟡 BEL FITIĞI: Nötral omurga şart. Aralıkları kıs — yarı ROM. SKOLYOZ: Simetri kontrol", alts:["Single Leg RDL (destekli)","Good Morning","Hip Hinge"] },
          { name:"Glute Bridge / Hip Thrust", sets:"4 × 12", muscle:"Glute max, hamstring alt — kalça ekstansiyon gücü", how:["Sırt üstü — dizler 90°, ayaklar yerde","Kalçayı yukarı it — omuzdan dize düz çizgi","Zirvede 2 sn sıkıştır — glute çalışıyor mu hisset","Kontrollü in — yere değmeden tekrar"], avoid:"Beli aşırı hiperextend etme", warn:"DİZ: Diz fleksiyonu yok — menisküs için tamamen güvenli. BEL FITIĞI: Kalça hareketi, omurga sabit", alts:["Single Leg Glute Bridge","Barbell Hip Thrust","Banded Hip Thrust"] },
          { name:"Step-Up (Weighted)", sets:"4 × 10 (her bacak)", muscle:"Quad, glute — fonksiyonel squat pattern", how:["DB veya ağırlıksız — adım yüksekliği diz hizası","Tam ağırlığı ön ayağa ver — topuklardan it","Tam dik kalk — üst bacak uzatılmış","Kontrollü in — arka ayak yere"], avoid:"Arka ayaktan itme — ön bacak çalışmalı", warn:"DİZ: En fonksiyonel squat varyantı. İtfaiyeci merdiveni simülasyonu. Menisküs için ideal", alts:["Reverse Lunge","Box Squat","Assisted Squat"], alt_reasons:["DİZ: Geriye hamle","DİZ: Kontrollü iniş","DİZ: Destekli"] },
          { name:"Single Arm DB Row", sets:"4 × 8 (her taraf)", muscle:"Lat, mid sırt, rhomboid — unilateral yatay çekiş", how:["Bench'e tek el-diz dayan","DB'yi kalça/alt göğüs hizasına çek","Kürek kemiğini sıkıştır — 1 sn tut","Kontrollü in — omuz öne düşmez"], avoid:"Gövdeyi döndürme — sadece kürek çalışır", warn:"BEL FITIĞI: Destekli — spinal yük minimal. Bu versiyonu tercih et", alts:["Cable Row","Chest Supported Row"] },
          { name:"Pike Push Up", sets:"4 × 8", muscle:"Ön delt, triceps — handstand push-up temeli", how:["Kalçayı havaya kaldır — V şekli","Başı ellerin arasına indir","Dirsekler biraz dışa — temiz form","İt — tam kalk"], avoid:"Kalçayı düşürme — plank değil pike", warn:"ROTATOR CUFF: Vertical push — handstand hazırlığı. Ağrıda range'i azalt", alts:["Incline Push Up","Decline Push Up","Wall Shoulder Press"] },
        ]},

        { name: "⚡ KONDİSYON — Yük Taşıma Devresi", color: "#990000", exercises: [
          { name:"Yük Taşıma Devresi", sets:"4 tur × 3 dk / 1 dk dinlenme", muscle:"Full body dayanıklılık — itfaiye/askeri simülasyon", how:["Tur: Farmer Carry 30m + Suitcase Carry 30m (tek el) + Bear Crawl 10m","Her turu mümkün olduğunca hızlı tamamla","1 dk dinlenme — sonra tekrar","4 tur — toplam ~16 dk çalışma"], avoid:"Formun bozulması — önce form, sonra hız", warn:"İtfaiyeci fonksiyonel fitness 4 pillarından biri: Carry ve locomotion", alts:["Sandbag Devresi","20dk Zone 2 Koşu"] },
        ]},

        { name: "🔄 CORE — Rotasyon & Lateral", color: "#6C3483", exercises: [
          { name:"Copenhagen Plank Left", sets:"2 × 20sn", muscle:"Sol adduktör, lateral core, QL", how:["Yan yat — üst ayak bench üstünde","Kalçayı kaldır — dirsek altında","Vücut düz — 20 sn"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Lateral core dengesizliği için kritik", alts:[] },
          { name:"Copenhagen Plank Right", sets:"2 × 20sn", muscle:"Sağ adduktör, lateral core", how:["Diğer taraf — eşit süre"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Her iki taraf eşit olacak", alts:[] },
          { name:"Pallof Press", sets:"3 × 10 (her taraf)", muscle:"Core anti-rotasyon — rotasyon direnci", how:["Bant veya kablo yan tarafa bağlı","Her iki elle göğüs önünde tut","Öne uzat — vücut dönmez — 2sn tut","Geri çek"], avoid:"Vücudun dönmesine izin verme", warn:"SKOLYOZ: Anti-rotasyon egzersizi. Lateral core dengesizliği düzeltir", alts:["Landmine Rotation","Cable Anti-Rotation"] },
        ]},

        { name: "❄️ SOĞUMA", color: "#F4A261", exercises: [
          { name:"Child's Pose", sets:"1 × 60sn", muscle:"Sırt, omuz, kalça", how:["Kolları öne uzat","60 sn"], avoid:null, warn:null, alts:[] },
          { name:"Hamstring Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hamstring, posterior chain", how:["Otur — tek bacağı uzat","Öne eğil — gerini hisset","45 sn"], avoid:"Sırtı yuvarlama", warn:"BEL: Hafif eğil — zorla değil", alts:[] },
          { name:"Supine Spinal Twist", sets:"1 × 45sn (her taraf)", muscle:"Torasik rotasyon", how:["Dizi karşı tarafa yatır","Omuz yerde","45 sn"], avoid:"Omuzların kalkması", warn:"SKOLYOZ: Her iki tarafa eşit", alts:[] },
        ]},
      ],

    },

    // ─────────────────────────────────────────────────
    {
      id: 4, title: "GÜN 4", sub: "PAZAR", focus: "Güç + Max Test + Zone 2 Aerobik", duration: "~80 dk", color: "#8338EC",
      type: "training",
      injury: "⚠️ BEL: KB Swing mükemmel hinge. DİZ: Goblet Squat knee tracking. OMUZ: Push Press'te Landmine'a geç ağrıda. AB WHEEL: BEL FITIĞI riski — Knee Rollout kullan.",
      conditioning: "Uzun Devre — aerobik kapasite ve akıl gücü",
      blocks: [
        { name: "🔥 ISINMA — Genel Hazırlık", color: "#CC5500", exercises: [
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Torasik mobilite", how:["Foam roller'ı üst sırta koy","Yavaşça yuvarlan"], avoid:"Bel üzerinde yapma", warn:"Haftalık kapanış — mobilite şart", alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz — günlük rutin", how:["Bandı iki elle önde tut","Kolları yanlara aç — kürek kemiklerini birleştir","1 sn tut"], avoid:"Omuzları kulağa kaldırma", warn:"ROTATOR CUFF: Her gün", alts:[] },
          { name:"Goblet Squat (ağırlıksız)", sets:"2 × 10", muscle:"Quad, glute, mobilite", how:["DB veya kettlebell göğüste","Derin otur — kalça topuğun dibine","Topuklarla it — kalk"], avoid:"Topukların kalkması", warn:"DİZ + MENİSKÜS: Ağırlık gövdeyi dik tutar — knee tracking daha kolay. Ağrıda sadece yarı derinlikte in", alts:[] },
          { name:"Hip Hinge", sets:"2 × 10", muscle:"Posterior chain aktivasyon", how:["Kalçayı geriye it","Sırt düz","Geri gel"], avoid:"Sırtı büküp öne eğme", warn:"Swing ve deadlift öncesi", alts:[] },
        ]},
        { name: "🛡 SAKATILIK PROTOKOLÜ — Zorunlu (5 dk)", color: "#7B241C", exercises: [
          { name:"Band External Rotation", sets:"3 × 15 (her taraf)", muscle:"İnfraspinatus, teres minor — rotator cuff aktif stabilizasyon", how:["Dirsek 90° — vücuda yapışık","Bandı dışa döndür — omuz hizasına","1 sn tut — kontrollü geri","Asla momentum kullanma"], avoid:"Dirsekleri vücuttan ayırma", warn:"ROTATOR CUFF: Tedavindir. Atlama. Her antrenman öncesi zorunlu", alts:["Cable External Rotation"] },
          { name:"Scapular Wall Slide", sets:"2 × 10", muscle:"Serratus anterior, trapez orta/alt — scapula kontrolü", how:["Sırtını duvara daya — kollar W pozisyonu","Yavaşça kolları yukarı kaydır — U yap","Kürek kemikleri duvarda kalacak — asla ayrılmayacak"], avoid:"Kürek kemiklerinin duvardan ayrılması", warn:"KİFOZ + ROTATOR CUFF: Scapula stabilizasyonu rotator cuff'ı besler", alts:[] },
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Derin boyun fleksörleri — servikal stabilizasyon", how:["Dik otur","Çeneni geriye it — çift çene","2 sn tut — bırak"], avoid:"Başı aşağı eğme", warn:"BOYUN FITIĞI: Servikal disk basıncını azaltır. Her gün zorunlu", alts:[] },
        ]},

        { name: "🤸 KALİSTENİK — Max Test & Skill Progression", color: "#2A9D8F", exercises: [
          { name:"Dead Hang Max", sets:"4 × max süre", muscle:"Grip, lat, omurga dekompresyon", how:["Bardan asıl","Ne kadar tutabilirsen tut","Her seferde süreyi kaydet — ilerleme takibi"], avoid:"Pasif sarkma — omuzlar aktif", warn:"Pull-up'ın temeli — haftalık test", alts:[] },
          { name:"Pull Up Max Test", sets:"3 set × maksimum", muscle:"Tüm çekme zinciri — haftalık ölçüm", how:["Temiz form — göğüs bara","Momentum yok","Her tekrarı say — kaydet","Setler arası tam dinlenme"], avoid:"Kipping — sadece temiz tekrar", warn:"Setin sonunu kaydet — haftalık ilerleme buradan görünür", alts:["Chin Up Max","Assisted Pull Up"] },
          { name:"Push Up Max Test", sets:"3 set × maksimum", muscle:"Göğüs, triceps, core — haftalık ölçüm", how:["Temiz form — göğüs yere değiyor","Core sıkı — vücut düz","Her tekrarı say","Setler arası tam dinlenme"], avoid:"Kalçayı havaya kaldırma", warn:"Taktik atlet standardı: 40+ tekrar hedef", alts:[] },
          { name:"Dip Max Test", sets:"2 set × maksimum", muscle:"Triceps, alt göğüs — haftalık ölçüm", how:["Paralel barda — temiz form","Tam alta — 90°","Tam kalk","Kaydet"], avoid:"Aşırı aşağı inme", warn:"Push zincirinin haftalık kapanışı", alts:["Bench Dip Max","Ring Dip"] },
          { name:"Muscle-up Prep", sets:"3 × 5", muscle:"Pull + push geçişi — üst kalisteniğin zirvesi", how:["Explosive pull-up — mümkünse geçiş","Geçiş yapamıyorsan explosive chin-up","Geçiş anında aktif dip pozisyonu","En az 15 pull-up olmadan muscle-up zorla yapılmaz"], avoid:"Kipping — kontrol şart", warn:"OMUZ: Geçiş anında rotasyon — ağrıda dur. Kas-up seviyesi gelmeden zorla yapma", alts:["Explosive Pull Up","Transition Drill","Bar Muscle Up Negative"] },
        ]},

        { name: "🏋️ KUVVET — Güç & Hız", color: "#8338EC", exercises: [
          { name:"KB Swing (Heavy)", sets:"5 × 10", muscle:"Posterior chain patlayıcı güç — hip extension", how:["Ağır KB — formun bozulmayacağı kadar","Hip hinge — patlayıcı kalça","KB omuz hizasına","Nefes: it → dışarı, geri → içeri"], avoid:"Squat gibi diz bükme — kalça hareketi", warn:"🟡 BEL FITIĞI: Mükemmel hip hinge tekniği. Ağrıda Glute Bridge ile değiştir", alts:["Dumbbell Swing","Glute Bridge Heavy","Hip Thrust"] },
          { name:"Goblet Squat (Heavy)", sets:"4 × 5", muscle:"Quad, glute — squat pattern güç", how:["Ağır KB/DB göğüste — yavaş ve kontrollü","Derin otur — hamstringlerde gerilme","Patlayıcı kalk — topuklardan it","Nefes: in → aşağı, dışarı → yukarı"], avoid:"Topukların kalkması — dizlerin içe çökmesi", warn:"DİZ: Ağır goblet squat — knee tracking izle. Ağrıda ağırlığı indir", alts:["Box Squat","Safety Bar Squat","Assisted Squat"] },
          { name:"Push Press", sets:"3 × 5", muscle:"Tüm vücut — bacak + omuz + core koordinasyonu", how:["DB'ler omuza — ayaklar omuz genişliğinde","Hafifçe diz bük — patlayıcı it","Overhead tam uzat — core sıkı","Kontrollü in — bir sonraki tekrar"], avoid:"Beli hiperextend etme", warn:"ROTATOR CUFF: Ağrıda bacak yardımını artır veya Landmine Press'e geç", alts:["Landmine Press","DB Overhead Press","Arnold Press"] },
          { name:"Band Face Pull", sets:"3 × 15", muscle:"Posterior delt, rotator cuff — haftalık kapanış", how:["Bant göz hizasında","Çek ve dışa döndür","1 sn tut"], avoid:"Dirsekleri aşağı çekme", warn:"ROTATOR CUFF: Haftanın son posterior delt çalışması", alts:["Rear Delt Fly","Cable Face Pull"] },
          { name:"Trap Bar Carry / DB Shrug Carry", sets:"3 × 20m", muscle:"Trapez üst, rhomboid, core — yük altında postür", how:["Ağır trap bar veya DB — yürü","Omuzlar aktif — aşağı ve geri","Dik postür — yük testlemesi","20m gidip gel"], avoid:"Omuzları kulağa kaldırma", warn:"Taktik atlet postür testi — ağır yük altında dik kalabilmek", alts:["Heavy Farmer Carry","Overhead Carry"] },
        ]},

        { name: "🎯 CORE — Haftalık Kapanış", color: "#6C3483", exercises: [
          { name:"Ab Wheel Rollout", sets:"3 × 8", muscle:"Core anterior zinciri — tam uzanma", how:["Dizler yerde — wheel önde","Öne uzan — omurga nötral","Core kası — sırt düşmez","Geri çek — core ile döner"], avoid:"Beli bırakma — core çalışmayı keser", warn:"🔴 BEL FITIĞI: Bu egzersiz disk için yüksek risk. Knee rollout veya Dragon Flag'a geç. SKOLYOZ: Kısa range ile başla", alts:["Knee Ab Wheel Rollout","Dead Bug","Plank ile yavaşla"], alt_reasons:["BEL: Kısa ROM","BEL: Anti-extension güvenli","BEL: Statik stabilite"] },
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique, QL — lateral stabilite", how:["Sol yanına yat — dirsek omuz altında","Kalçayı kaldır — düz çizgi","45 sn tut"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Her iki taraf eşit — atlama", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique — lateral stabilite", how:["Diğer taraf — eşit süre","Kalçayı kaldır — düz çizgi","45 sn"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Her iki tarafa mutlaka eşit süre", alts:[] },
        ]},

        { name: "⚡ KONDİSYON — Uzun Aerobik Devre (Zone 2)", color: "#990000", exercises: [
          { name:"20 Dakika Sürekli Aerobik Devre", sets:"20 dakika sürekli", muscle:"Kardiyovasküler kapasite — aerobik baz", how:["Seçenekler: Koşu / Kürek / Bisiklet / Devre (Goblet Squat + Push-up + Row tekrar)","Tempo: Konuşabilecek kadar yavaş — Zone 2 aerobik","Kalp atışı: 130-150 bpm hedef","20 dk boyunca tempo düşmez"], avoid:"Sprint yapmak — bu Zone 2, HIIT değil", warn:"İtfaiyeci araştırması: Her antrenman 30-40 dk aerobik içermeli. Aerobik baz olmadan kondisyon gelişmez. Bu en çok atlanan parça", alts:["20dk Koşu","20dk Rowing","20dk Jump Rope Zone 2"] },
        ]},

        { name: "❄️ SOĞUMA — Derin Esneme", color: "#8338EC", exercises: [
          { name:"Child's Pose", sets:"1 × 60sn", muscle:"Sırt, omuz, kalça", how:["Kolları öne uzat","60 sn"], avoid:null, warn:null, alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hip flexor, kasık", how:["Yarım diz — sağ diz yerde","Kalçayı öne it","Gövde dik — 45 sn"], avoid:"Gövdeyi öne eğme", warn:"Oturan biri için her gün şart", alts:[] },
          { name:"Supine Spinal Twist", sets:"1 × 45sn (her taraf)", muscle:"Torasik rotasyon", how:["Dizi karşı tarafa yatır","Omuz yerde","45 sn"], avoid:"Omuzların kalkması", warn:"SKOLYOZ: Her iki tarafa eşit", alts:[] },
          { name:"Pigeon Pose", sets:"1 × 60sn (her taraf)", muscle:"Piriformis, kalça", how:["Ön bacak yatay","Kalçayı yere bırak","60 sn her taraf"], avoid:"Ağrıda zorla yapma", warn:"DİZ: Ön bacağı ayarla", alts:[] },
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
