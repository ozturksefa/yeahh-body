export const PROGRAM2 = {
  meta: {
    name: "Full Activation",
    phase: "Faz 1 — Bütünsel Güç & Skill",
    weeks: "Hafta 1–8",
    description: "Her antrenmanda tüm vücut aktif. Primary odak + secondary aktivasyon + calisthenics skill.",
  },

  skillPaths: {
    pullup: {
      name: "Pull-up Yolu",
      steps: [
        { level: 1, name: "Dead Hang", target: "3 × 30sn" },
        { level: 2, name: "Scapula Pull", target: "3 × 10" },
        { level: 3, name: "Chin-up Negative", target: "3 × 5 (5sn indir)" },
        { level: 4, name: "Assisted Pull-up", target: "3 × 8" },
        { level: 5, name: "Full Chin-up", target: "3 × 5" },
        { level: 6, name: "Full Pull-up", target: "3 × 5" },
      ],
    },
    pushup: {
      name: "Push-up / Dip Yolu",
      steps: [
        { level: 1, name: "Push Up", target: "3 × 12" },
        { level: 2, name: "Diamond Push Up", target: "3 × 10" },
        { level: 3, name: "Pike Push Up", target: "3 × 8" },
        { level: 4, name: "Dip Negative", target: "3 × 5 (5sn indir)" },
        { level: 5, name: "Full Dip", target: "3 × 8" },
        { level: 6, name: "Weighted Dip", target: "3 × 6" },
      ],
    },
    lsit: {
      name: "L-sit Yolu",
      steps: [
        { level: 1, name: "Parallel Bar Support Hold", target: "3 × 20sn" },
        { level: 2, name: "Knee Tuck Hold", target: "3 × 15sn" },
        { level: 3, name: "One Leg L-sit", target: "3 × 10sn" },
        { level: 4, name: "Full L-sit", target: "3 × 10sn" },
        { level: 5, name: "L-sit to Tuck Planche", target: "3 × 5" },
      ],
    },
  },

  days: [
    {
      id: 1, title: "GÜN 1", sub: "SALI", focus: "Pull Focus", duration: "~75 dk", color: "#2A9D8F",
      type: "training",
      injury: "⚠️ Diz: Squat/lunge yok. Omuz: Pull hareketlerde kürek kemiklerini geri tut, ağrıda ROM azalt.",
      blocks: [
        { name: "🔥 ISINMA A — Postür Rutini", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Dik dur veya duvara yaslan","Çeneni geri it — çift çene yap","2 sn tut, bırak"], avoid:"Başı aşağı eğme", warn:null, alts:["Wall Chin Tuck","Supine Chin Tuck"] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid", how:["Bandı önde omuz hizasında tut","Yanlara açarak çek — tam gerin","1 sn tut, kontrollü geri"], avoid:"Omuzları kulağa kaldırma", warn:null, alts:["Cable Reverse Fly","Face Pull (hafif)"] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt, torasik mobilite", how:["Kürek kemikleri hizasında","Geriye uzan, göğsü aç","Her noktada 3-5 sn kal"], avoid:"Bel üzerinde yapma", warn:"KİFOZ İÇİN KRİTİK", alts:["Bench Thoracic Extension","Prayer Pose on Bench"] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor, kasık", how:["Diz yerde, kalçayı öne it","Pelvis aşağı — posterior tilt","Gövde dik tut"], avoid:"Gövdeyi öne eğme", warn:null, alts:["Couch Stretch","Standing Hip Flexor Stretch"] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça rotatorları, groin", how:["Sırt üstü yat, dizler bükülü","Dizi yana yatır","10 sn tut, geri gel","Yavaş ve kontrollü"], avoid:"Ağrı hissedersen daha az range", warn:null, alts:["90/90 Hip Stretch","Frog Pose (yatarak)"] },
        ]},
        { name: "🔥 ISINMA B — Güne Özel (Sırt & Omuz)", color: "#CC5500", exercises: [
          { name:"Cat and Cow", sets:"2 × 10", muscle:"Omurga mobilite, torasik", how:["Dört ayak pozisyon","Cat: sırtı yuvarlat, çeneyi göğse","Cow: sırtı çukurlaştır, göğsü öne","Yavaş ve nefesle birlikte"], avoid:"Sadece belden yapma — tüm omurga", warn:"SKOLYOZ: Her tekrarda simetriyi hisset", alts:["Thread the Needle","Thoracic Rotation"] },
          { name:"Thread the Needle", sets:"2 × 8 (her taraf)", muscle:"Torasik rotasyon", how:["Dört ayak","Bir kolu yere kaydır — karşı tarafın altından geç","Gözler kola baksın","Geri gel"], avoid:"Kalçayı kaydırma — sabit tut", warn:null, alts:["Seated Spinal Twist","Prone Thoracic Rotation"] },
          { name:"Shoulder CARs", sets:"2 × 5 (her taraf)", muscle:"Glenohumeral mobilite, tüm omuz", how:["Kolu yavaşça tam daire çiz","İleri — yukarı — geri — aşağı","Mümkün olduğu kadar büyük daire","Çok yavaş — 5 sn bir tur"], avoid:"Gövdeyi hareket ettirme", warn:"ROTATOR CUFF: Ağrısız range'de kal", alts:["Arm Circles","Shoulder Pendulum"] },
          { name:"Lat Stretch Chair", sets:"2 × 30sn (her taraf)", muscle:"Latissimus dorsi, yan germe", how:["Sandalyeye veya makineye yan dur","Koldan tut, kalçayı dışa it","Lat'ta gerilme hisset"], avoid:"Omurga yanal fleksiyonuna zorla", warn:null, alts:["Doorway Lat Stretch","Hanging Lat Stretch"] },
        ]},
        { name: "⚡ AKTİVASYON — Rotator Cuff Prehab", color: "#FF6B35", exercises: [
          { name:"Band External Rotation", sets:"2 × 15 (her taraf)", muscle:"Infraspinatus, teres minor", how:["Dirsek 90° bükülü, yanında","Band dirseğin ön kısmından","Kolu dışa doğru döndür","Kontrollü geri"], avoid:"Dirseği kaldırma — sabit", warn:"ROTATOR CUFF REHABİLİTASYON — pull öncesi zorunlu", alts:["Side-lying External Rotation","Cable External Rotation"] },
          { name:"Prone Y-T-W", sets:"2 × 10", muscle:"Alt trapez, rhomboid, rotator cuff", how:["Yüzüstü yat veya incline bench","Y: kollar 135° yukarı — kaldır","T: kollar yana — kaldır","W: dirsekler bükülü, dışa dön"], avoid:"Boyunu sıkıştırma", warn:"Omuz cerrahisi riski olan için en iyi prehab", alts:["Cable Y-T-W","Band Y-T-W"] },
          { name:"Scapula Push Up", sets:"2 × 12", muscle:"Serratus anterior, scapula kontrolü", how:["Push up pozisyonu — kollar düz","Kürek kemiklerini ayır — sırt yükselir","Kürek kemiklerini birleştir — sırt çöker","Kollar hiç bükülmez"], avoid:"Dirsekleri bükme", warn:null, alts:["Wall Scapula Push Up","Serratus Punch"] },
        ]},
        { name: "🏋️ PRIMARY — Pull", color: "#1A3A5C", exercises: [
          { name:"Machine Lat Pulldown", sets:"4 × 8", muscle:"Latissimus dorsi, teres major", how:["Geniş tutuş — omuz genişliğinden fazla","Göğsü aç, hafif geriye yaslan","Dirseği aşağı ve arkaya çek","3 sn geri ver — lat'ı hisset"], avoid:"Vücudu öne arkaya sallama", warn:"Pull-up için temel güç hareketi", alts:["Cable Pulldown","Assisted Pull Up","Straight Arm Pulldown"] },
          { name:"Seated Cable Row (Single Arm)", sets:"3 × 10 (her taraf)", muscle:"Mid trapez, rhomboid, biceps", how:["Tek elle çek — karşı elle destekle","Kürek kemiğini geri ve aşağı çek","1 sn sıkıştır","SKOLYOZ: Her iki taraf eşit"], avoid:"Gövdeyi döndürme", warn:"Unilateral — asimetriyi düzeltir", alts:["Dumbbell Row","Machine Row"] },
          { name:"45 Degree Incline Row (Single Arm)", sets:"3 × 10 (her taraf)", muscle:"Sırt orta, rhomboid", how:["45° incline bench'e yüzüstü yat","Dumbbell ile tek elle çek","Kürek kemiğini geri çek — dirsek göğüs hizasında","Kontrollü indir"], avoid:"Omzunu kulağa çekme", warn:"KİFOZ için ideal açı", alts:["Bent Over Row","Cable Row"] },
          { name:"Straight Arm Pulldown", sets:"3 × 12", muscle:"Lat izolasyon, serratus", how:["Kablo yukarıda, kollar uzun","Kolları düz tut — dirsek hafif bükük","Aşağı çek — kalçaya doğru","Lat'ı sıkıştır"], avoid:"Dirsekleri bükme", warn:null, alts:["Pullover Machine","DB Pullover"] },
          { name:"Face Pull", sets:"3 × 15", muscle:"Arka delt, rotator cuff", how:["Kablo göz hizasında","İki elle rope attachment","Yüze doğru çek — dirsekler yüksek","1 sn tut — dışa dön"], avoid:"Dirseği düşürme", warn:"Her Pull günü zorunlu — posterior delt zayıflığı skolyozu artırır", alts:["Band Face Pull","Reverse Fly"] },
        ]},
        { name: "💪 SECONDARY — Upper Body Push (Hafif)", color: "#6C63FF", exercises: [
          { name:"Push Up", sets:"3 × 12", muscle:"Göğüs, triceps, ön delt", how:["Eller omuz genişliğinde","Vücut düz çizgi — core sıkı","Göğüs yere değer","Patlayıcı yukarı"], avoid:"Kalça yukarı veya aşağı sarkmasın", warn:null, alts:["Incline Push Up","Knee Push Up"] },
          { name:"DB Lateral Raise", sets:"3 × 15", muscle:"Orta delt izolasyon", how:["Hafif öne eğik — 10°","Kolları yanlara kaldır — omuz hizasına","Başparmak hafif aşağı — internal rotation","Kontrollü indir — 3 sn"], avoid:"Momentum kullanma — sallanma yok", warn:"Omuz için en güvenli izolasyon", alts:["Cable Lateral Raise","Band Lateral Raise"] },
        ]},
        { name: "🤸 CALİSTHENİCS SKILL — Pull", color: "#E76F51", exercises: [
          { name:"Dead Hang", sets:"3 × 30sn", muscle:"Lat, ön kol, grip, omuz dekompresyon", how:["Bardan sarkıl — tam ağırlık","Omuzları kulağa çekme — aktif omuz","Nefes al — omurgayı uzat","30 sn tut"], avoid:"Pasif asılma — omuzlar aktif olacak", warn:"Pull-up yolunun temeli — asla atlama", alts:["Scapula Pull","Flexed Arm Hang"] },
          { name:"Chin-up Negative", sets:"3 × 5", muscle:"Biceps, lat — eccentric", how:["Kasa zıpla veya step kullan — üst pozisyondan başla","5 saniyede yavaşça in","Tam alta inince bırak","Her tekrar ayrı"], avoid:"Hızlı düşme — 5 sn şart", warn:"Konsantrik yapamazsan negatifle güç kazan", alts:["Assisted Chin Up","Band Chin Up"] },
          { name:"Scapula Pull Up", sets:"3 × 10", muscle:"Lat aktivasyonu, omuz stabilite", how:["Bardan asıl — kollar düz","Sadece kürek kemiklerini aşağı çek","Vücut biraz yukarı kalkar","Geri sal"], avoid:"Dirsekleri bükme — sadece scapula", warn:null, alts:["Dead Hang","Band Assisted Scapula Pull"] },
        ]},
        { name: "🎯 CORE", color: "#6C63FF", exercises: [
          { name:"Bird Dog", sets:"3 × 10 (her taraf)", muscle:"Erector spinae, glute, core stabilite", how:["Dört ayak — omurga nötral","Sağ kol + sol bacağı uzat — aynı anda","3 sn tut","Kontrollü geri — tekrar"], avoid:"Beli sağa sola döndürme", warn:"SKOLYOZ için Dead Bug ile birlikte şart", alts:["Dead Bug","Superman Hold"] },
          { name:"Side Plank Left", sets:"2 × 40sn", muscle:"Sol oblique, quadratus lumborum", how:["Sol dirsek omuz altında","Kalçayı yerden kaldır — düz çizgi","Üst kolu tavana uzat","40 sn tut"], avoid:"Kalça öne veya geriye sarkmasın", warn:"SKOLYOZ: Her iki taraf eşit süre şart", alts:["Side Plank Hip Dip","Modified Side Plank"] },
          { name:"Side Plank Right", sets:"2 × 40sn", muscle:"Sağ oblique, quadratus lumborum", how:["Sağ dirsek omuz altında","Kalçayı yerden kaldır","Her iki taraf eşit süre"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ — asla bir tarafı atlama", alts:["Side Plank Hip Dip","Modified Side Plank"] },
        ]},
        { name: "🔥 FİNİSHER", color: "#990000", exercises: [
          { name:"Rowing Machine", sets:"3 × 45sn", muscle:"Full body — sırt, bacak, core", how:["Bacaklar önce iter","Gövde geriye yaslanır","Kollar çeker — göğse","Geri ver — aynı sırayla"], avoid:"Kollarla başlama — güç bacaktan gelir", warn:null, alts:["Jump Rope","Battle Ropes"] },
        ]},
        { name: "❄️ SOĞUMA", color: "#2A9D8F", exercises: [
          { name:"Lat Stretch Chair", sets:"1 × 45sn (her taraf)", muscle:"Latissimus dorsi", how:["Sandalyeye tutun","Kalçayı dışa it"], avoid:null, warn:null, alts:[] },
          { name:"Chest Doorway Stretch", sets:"1 × 45sn", muscle:"Göğüs, ön delt", how:["Kapı kasasına kolları daya","Öne çık — göğüs açılır"], avoid:null, warn:null, alts:[] },
          { name:"Hamstring, Obliques and Lat Stretch", sets:"2 × 45sn", muscle:"3 bölge", how:["Otur, bir bacağı uzat","Kolları yana aç ve öne eğil"], avoid:null, warn:null, alts:[] },
          { name:"Child's Pose", sets:"1 × 45sn", muscle:"Sırt, omuz, kalça", how:["Diz üstü otur","Kolları öne uzat","Alnı yere koy — nefes al"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },

    {
      id: 2, title: "GÜN 2", sub: "PERŞEMBE", focus: "Push Focus", duration: "~75 dk", color: "#E76F51",
      type: "training",
      injury: "⚠️ ROTATOR CUFF: Prehab bloğunu asla atlama. Overhead press'te ağrıda ROM azalt veya geç. Diz: Alt secondary'de squat yok.",
      blocks: [
        { name: "🔥 ISINMA A — Postür Rutini", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Dik dur","Çeneni geri it","2 sn tut"], avoid:"Başı aşağı eğme", warn:null, alts:["Wall Chin Tuck"] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid", how:["Bandı önde tut","Yanlara açarak çek","1 sn tut"], avoid:"Omuzları kulağa kaldırma", warn:null, alts:["Cable Reverse Fly"] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt", how:["Kürek kemikleri hizasında","Geriye uzan, göğsü aç"], avoid:"Bel üzerinde yapma", warn:"KİFOZ İÇİN KRİTİK", alts:["Bench Thoracic Extension"] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor", how:["Diz yerde, kalçayı öne it","Gövde dik"], avoid:"Gövdeyi öne eğme", warn:null, alts:["Couch Stretch"] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça rotatorları", how:["Sırt üstü, dizler bükülü","Dizi yana yatır, 10 sn"], avoid:"Ağrıda daha az range", warn:null, alts:["90/90 Hip Stretch"] },
        ]},
        { name: "🔥 ISINMA B — Güne Özel (Göğüs & Omuz)", color: "#CC5500", exercises: [
          { name:"Shoulder CARs", sets:"2 × 5 (her taraf)", muscle:"Glenohumeral tam mobilite", how:["Kolu yavaşça tam daire çiz","İleri — yukarı — geri — aşağı","5 sn bir tur — çok yavaş"], avoid:"Gövdeyi hareket ettirme", warn:"ROTATOR CUFF: Ağrısız range'de kal", alts:["Arm Circles"] },
          { name:"Dynamic Chest Stretch", sets:"2 × 10", muscle:"Pektoralis, ön delt", how:["Kolları yanlara aç — göğüs gerilir","Öne getir — çarpraz","Ritimli — dinamik"], avoid:"Ani sert hareket", warn:null, alts:["Doorway Stretch","Band Chest Stretch"] },
          { name:"Wrist Circle", sets:"2 × 10 (her yön)", muscle:"Bilek eklem mobilitesi", how:["Her iki bileği tam daire çiz","İleri 10, geri 10","Push Up öncesi kritik"], avoid:null, warn:null, alts:["Wrist Flexion/Extension"] },
        ]},
        { name: "⚡ AKTİVASYON — Rotator Cuff Prehab", color: "#FF6B35", exercises: [
          { name:"Band External Rotation", sets:"2 × 15 (her taraf)", muscle:"Infraspinatus, teres minor", how:["Dirsek 90° yanında","Kolu dışa döndür","Kontrollü geri"], avoid:"Dirseği kaldırma", warn:"PUSH ÖNCESI ZORUNLU — rotator cuff koruma", alts:["Side-lying External Rotation","Cable ER"] },
          { name:"Side-lying External Rotation", sets:"2 × 12 (her taraf)", muscle:"Infraspinatus izolasyon", how:["Yana yat — alttaki taraf çalışır","Dirsek 90° — yanında","Küçük dumbbell ile yavaşça dışa döndür","Kontrollü geri"], avoid:"Momentum kullanma", warn:"ROTATOR CUFF YIRTIGI: En önemli rehab hareketi", alts:["Band ER","Cable ER"] },
          { name:"Prone Y-T-W", sets:"2 × 10", muscle:"Alt trapez, rhomboid, posterior delt", how:["Yüzüstü incline bench","Y pozisyon — kaldır","T pozisyon — kaldır","W pozisyon — kaldır"], avoid:"Boyun sıkışması", warn:"Her Push günü — asla atlama", alts:["Band Y-T-W","Cable Y-T-W"] },
        ]},
        { name: "🏋️ PRIMARY — Push", color: "#8B0000", exercises: [
          { name:"Incline Dumbbell Press", sets:"4 × 8", muscle:"Üst göğüs, ön delt, triceps", how:["30-45° incline","Dumbbell omuz hizasında — dirsekler 45°","Kontrollü in — göğsü hisset","It — tam uzama yok"], avoid:"Dirseği tam kilitleyerek uzatma", warn:"ROTATOR CUFF: Ağrıda ROM azalt, ağırlığı düşür", alts:["Flat DB Press","Machine Chest Press"] },
          { name:"DB Overhead Press", sets:"3 × 10", muscle:"Ön/orta delt, triceps, üst trapez", how:["Oturarak — sırt destekli","Dumbbell kulak hizasından başla","Yukarı it — tam uzatma","3 sn indir"], avoid:"Beli aşırı hiperextend etme", warn:"ROTATOR CUFF: Ağrıda landmine press'e geç", alts:["Landmine Press","Arnold Press","Machine Shoulder Press"] },
          { name:"Cable Fly", sets:"3 × 12", muscle:"Göğüs adduction, pektoral germe", how:["Kablo orta yükseklikte","Kollar hafif bükülü","Göğüs ortasında birleştir","3 sn geri aç — tam germe"], avoid:"Kolu düz tutma", warn:null, alts:["DB Fly","Pec Deck"] },
          { name:"DB Lateral Raise", sets:"3 × 15", muscle:"Orta delt", how:["Hafif öne eğik 10°","Yanlara kaldır — omuz hizası","Başparmak hafif aşağı","Kontrollü indir"], avoid:"Trapezi kullanma — sallama yok", warn:null, alts:["Cable Lateral Raise","Machine Lateral Raise"] },
          { name:"Cable Overhead Triceps Extension", sets:"3 × 12", muscle:"Triceps uzun baş", how:["Kablo başın üstünde","Dirsekler kulaklara yakın — sabit","Kolları yukarı uzat","Kontrollü bükerek in"], avoid:"Dirsekleri açma", warn:null, alts:["Skull Crusher","DB Overhead Ext"] },
        ]},
        { name: "💪 SECONDARY — Pull Activation (Hafif)", color: "#2A9D8F", exercises: [
          { name:"Face Pull", sets:"3 × 15", muscle:"Arka delt, rotator cuff", how:["Kablo göz hizası","Yüze doğru çek — dirsekler yüksek","Dışa döndür — 1 sn tut"], avoid:"Dirseği düşürme", warn:"Push günü posterior dengelemesi — şart", alts:["Band Face Pull","Reverse Fly"] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Rhomboid, arka omuz", how:["Bandı önde tut","Yanlara aç — tam gerin","1 sn tut"], avoid:"Omuzları kaldırma", warn:null, alts:["Cable Reverse Fly"] },
        ]},
        { name: "🤸 CALİSTHENİCS SKILL — Push & Dip", color: "#E76F51", exercises: [
          { name:"Pike Push Up", sets:"3 × 8", muscle:"Ön delt, triceps — overhead push", how:["Ters V pozisyonu — kalça yukarıda","Başı yere doğru indir","Patlayıcı yukarı it","Omuz hareketi — göğüs değil"], avoid:"Kalçayı düşürme", warn:"Handstand push up'a giden yol", alts:["Wall Pike Push Up","Elevated Pike"] },
          { name:"Diamond Push Up", sets:"3 × 8", muscle:"Triceps, iç göğüs", how:["Eller elmas şeklinde — işaret parmakları birbirine","Göğüsü ellerin üzerine indir","Dirsekler vücuda yakın — içe kapanır"], avoid:"Eller çok öne koyma", warn:null, alts:["Close Grip Push Up","Bench Triceps Dip"] },
          { name:"Dip Negative", sets:"3 × 5", muscle:"Triceps, alt göğüs, ön delt — eccentric", how:["Paralel bar veya bench — üst pozisyondan başla","5 saniyede yavaşça in","Tam alta inince zıpla veya ayağa kalk — başa dön","Her tekrar temiz"], avoid:"Hızlı düşme — 5 sn şart", warn:"Dip için eccentric güç önce gelir", alts:["Bench Dip Negative","Ring Dip Negative"] },
        ]},
        { name: "🎯 CORE", color: "#6C63FF", exercises: [
          { name:"Dead Bug", sets:"3 × 12", muscle:"Transversus abdominis, core stabilite", how:["Sırt üstü — kollar tavana, dizler 90°","Sağ kol + sol bacak uzat","BEL YERDE KALACAK","Geri gel, diğer taraf"], avoid:"Beli yerden kaldırma", warn:null, alts:["Bird Dog","Hollow Body Hold"] },
          { name:"Side Plank Left", sets:"2 × 40sn", muscle:"Sol oblique", how:["Sol dirsek omuz altında","Kalça yukarı — düz çizgi"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ — her iki taraf eşit", alts:["Modified Side Plank"] },
          { name:"Side Plank Right", sets:"2 × 40sn", muscle:"Sağ oblique", how:["Sağ dirsek omuz altında","Her iki taraf eşit süre"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ — asla atla", alts:["Modified Side Plank"] },
        ]},
        { name: "🔥 FİNİSHER", color: "#990000", exercises: [
          { name:"Jump Rope", sets:"3 × 45sn", muscle:"Koordinasyon, calf, kondisyon", how:["Hafif zıpla — ayak parmaklarına in","Bilek hareketi — kol değil","45 sn maksimum tempo — 30 sn dinlen"], avoid:"Topukla inme", warn:null, alts:["Jumping Jacks","High Knees"] },
        ]},
        { name: "❄️ SOĞUMA", color: "#E76F51", exercises: [
          { name:"Above Head Chest Stretch", sets:"1 × 45sn", muscle:"Pektoral, ön delt", how:["Kolları başın üstünde birleştir","Geriye doğru uzan"], avoid:null, warn:null, alts:[] },
          { name:"Shoulder Stretch Behind Back", sets:"1 × 45sn (her taraf)", muscle:"Arka delt, rotator cuff", how:["Bir eli sırtın arkasından yukarı","Diğer elle dirseği it"], avoid:null, warn:null, alts:[] },
          { name:"Triceps Stretch", sets:"1 × 30sn (her taraf)", muscle:"Triceps uzun baş", how:["Kolu başın arkasında büküp tut","Diğer elle dirseği aşağı it"], avoid:null, warn:null, alts:[] },
          { name:"Child's Pose", sets:"1 × 45sn", muscle:"Omuz, sırt, kalça", how:["Kolları öne uzat","Alnı yere koy"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },

    {
      id: 3, title: "GÜN 3", sub: "CUMARTESİ", focus: "Lower + Skill", duration: "~80 dk", color: "#F4A261",
      type: "training",
      injury: "⚠️ DİZ: Leg press sığ range (0-60°), derin squat/lunge yok, Step Up yok. Omuz: Secondary'de hafif yükle.",
      blocks: [
        { name: "🔥 ISINMA A — Postür Rutini", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Dik dur","Çeneni geri it","2 sn tut"], avoid:"Başı aşağı eğme", warn:null, alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid", how:["Bandı önde tut","Yanlara açarak çek"], avoid:"Omuzları kaldırma", warn:null, alts:[] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt", how:["Kürek kemikleri hizasında","Geriye uzan"], avoid:"Bel üzerinde yapma", warn:"KİFOZ KRİTİK", alts:[] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor", how:["Diz yerde, kalçayı öne it","Gövde dik"], avoid:"Gövdeyi öne eğme", warn:null, alts:[] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça rotatorları", how:["Sırt üstü, dizler bükülü","Dizi yana yatır, 10 sn"], avoid:"Ağrıda daha az range", warn:null, alts:[] },
        ]},
        { name: "🔥 ISINMA B — Güne Özel (Kalça & Glute)", color: "#CC5500", exercises: [
          { name:"One Leg Hip Abduction Right", sets:"2 × 10", muscle:"Sağ kalça abduktör", how:["Ayakta, sol elle tut","Sağ bacağı yana kaldır","Kontrollü geri indir"], avoid:"Belini yana eğme", warn:null, alts:["Side-lying Hip Abduction"] },
          { name:"One Leg Hip Abduction Left", sets:"2 × 10", muscle:"Sol kalça abduktör", how:["Ayakta, sağ elle tut","Sol bacağı yana kaldır","Kontrollü geri indir"], avoid:"Belini yana eğme", warn:null, alts:["Side-lying Hip Abduction"] },
          { name:"Floor Bridge", sets:"3 × 15", muscle:"Glute, hamstring aktivasyon", how:["Sırt üstü, dizler bükülü","Kalçayı yukarı — 1 sn sıkıştır","Kontrollü indir"], avoid:"Beli zorlaştırma", warn:null, alts:["Banded Glute Bridge"] },
          { name:"Kettlebell Ankle Static Stretch", sets:"2 × 10 (her taraf)", muscle:"Ayak bileği mobilitesi", how:["Dizi öne it — topuk yerde","Geri gel"], avoid:"Topuğu kaldırma", warn:"Menisküs için ayak bileği mobilitesi kritik", alts:["Ankle Wall Stretch"] },
        ]},
        { name: "⚡ AKTİVASYON", color: "#FF6B35", exercises: [
          { name:"Cable Hip Abduction", sets:"3 × 12 (her taraf)", muscle:"Gluteus medius, TFL", how:["Makineye yan dur — kayış ayak bileğinde","Bacağı yana kaldır","Kontrollü indir"], avoid:"Gövdeyi yana eğme", warn:"Diz stabilitesi için kritik", alts:["Band Hip Abduction","Side-lying Abduction"] },
          { name:"Seated Leg Extension with Band", sets:"2 × 12", muscle:"Vastus medialis — diz önü", how:["Sandalye, band ayak bileğinde","Dizi uzat — 1 sn tut","Yavaşça bük — 3 sn"], avoid:"Hızlı yapma", warn:"DİZ REHAB — asla atlama", alts:["Quad Set","TKE"] },
        ]},
        { name: "🏋️ PRIMARY — Lower", color: "#2D6A4F", exercises: [
          { name:"Leg Press", sets:"4 × 10", muscle:"Quad, glute", how:["Sırt tamamen padeye","Ayaklar ortada","DIZ MAXIMUM 60° — daha fazla değil","Topuklarla it"], avoid:"Diz 60° geçmesin", warn:"DİZ SAKATLIGI: Sığ range zorunlu", alts:["Wall Sit","Hack Squat"] },
          { name:"Hip Thrust", sets:"4 × 10", muscle:"Glute maksimum izolasyon", how:["Sırt bench'e — dumbbell kalçada","Patlayıcı yukarı it","1 sn sıkıştır — tam üstte","Kontrollü indir"], avoid:"Beli hiperextend etme", warn:null, alts:["Banded Hip Thrust","Glute Bridge"] },
          { name:"Dumbbell Romanian Deadlift", sets:"3 × 10", muscle:"Hamstring, glute", how:["Dizler hafif bükülü — sabit","Kalçayı geriye it","Dumbbellları bacak boyunca indir","Hamstrings'de gerilme hissedince dur"], avoid:"Sırtı büküp öne eğilme", warn:"SKOLYOZ: Omurga nötrali kontrol et", alts:["Single Leg RDL","Cable Pull Through"] },
          { name:"Single Leg Glute Bridge (Sağ)", sets:"3 × 12", muscle:"Sağ glute, hamstring izolasyon", how:["Sol bacak uzatılmış","Sağ ayakla kalçayı yukarı it","1 sn sıkıştır"], avoid:"Kalçayı gövdeyle indirme", warn:"DİZ SAKATLIGI: Step up yerine", alts:["Floor Bridge","Hip Thrust"] },
          { name:"Machine Seated Leg Curl", sets:"3 × 12", muscle:"Hamstring izolasyon", how:["Oturarak — pivot diz hizasında","Kontrollü kıvır","3 sn yavaşça indir"], avoid:"Kalçayı kaldırma", warn:null, alts:["Machine Lying Leg Curl","Swiss Ball Curl"] },
        ]},
        { name: "💪 SECONDARY — Upper Back (Hafif)", color: "#2A9D8F", exercises: [
          { name:"DB Row Single Arm", sets:"3 × 10 (her taraf)", muscle:"Sırt orta, rhomboid, biceps", how:["Bench'e bir dizi ve eli daya","Dumbbell ile çek — dirsek göğüs hizasında","Kürek kemiğini geri çek — 1 sn","Kontrollü indir"], avoid:"Gövdeyi döndürme", warn:"Alt çalışırken üst uyumasın", alts:["Cable Row","Machine Row"] },
          { name:"Face Pull", sets:"3 × 15", muscle:"Arka delt, rotator cuff", how:["Kablo göz hizasında","Yüze çek — dirsekler yüksek","1 sn tut"], avoid:"Dirseği düşürme", warn:"Her günde posterior delt — omuz sağlığı", alts:["Band Face Pull"] },
        ]},
        { name: "🤸 CALİSTHENİCS SKILL — L-sit & Core", color: "#E76F51", exercises: [
          { name:"Parallel Bar Support Hold", sets:"3 × 20sn", muscle:"Triceps, ön delt, core — basınç", how:["Parallel bara veya iki sandalyeye çık","Kolları düz — vücudu taşı","20 sn tut — core sıkı","Kontrollü in"], avoid:"Dirsekleri bükme", warn:"L-sit'in temeli — bu olmadan L-sit olmaz", alts:["Chair Support Hold","Ring Support Hold"] },
          { name:"Knee Tuck Hold", sets:"3 × 15sn", muscle:"Hip flexor, core, triceps", how:["Support pozisyonunda","Dizleri göğse çek — tutabildiğin kadar yüksek","15 sn tut","Kontrollü indir"], avoid:"Öne eğilme — dik tut", warn:"L-sit yolunun 2. adımı", alts:["Hanging Knee Raise","Floor L-sit Tuck"] },
          { name:"Hollow Body Hold", sets:"3 × 20sn", muscle:"Core — anterior chain", how:["Sırt üstü — kollar kulakların yanında","Bacaklar 45°'de — yerden 20cm","Bel yerde — lower back basısı","20 sn tut — nefes alma"], avoid:"Beli yerden kaldırma", warn:"L-sit için core ön hazırlık", alts:["Tuck Hold","Plank"] },
        ]},
        { name: "🎯 CORE", color: "#6C63FF", exercises: [
          { name:"Dead Bug", sets:"3 × 12", muscle:"Core stabilite", how:["Sırt üstü — kollar tavana","Sağ kol + sol bacak uzat","BEL YERDE"], avoid:"Beli kaldırma", warn:null, alts:["Bird Dog"] },
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique", how:["Sol dirsek omuz altında","Kalça yukarı"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Her iki taraf eşit"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
        ]},
        { name: "🔥 FİNİSHER", color: "#990000", exercises: [
          { name:"Double Kettlebell Farmer's Carry", sets:"3 × 20m", muscle:"Grip, trapez, core, tüm vücut", how:["İki elde kettlebell/dumbbell — ağır","Dik dur — omuzlar geri","20 metre yürü","Set arası 60 sn"], avoid:"Öne eğilme", warn:null, alts:["Single Arm Farmer Carry","Suitcase Carry"] },
        ]},
        { name: "❄️ SOĞUMA", color: "#F4A261", exercises: [
          { name:"Standing Quad Stretch Left", sets:"1 × 45sn", muscle:"Sol quad", how:["Sol topuğu kalçaya çek","Bir yere tutun"], avoid:null, warn:null, alts:[] },
          { name:"Standing Quad Stretch Right", sets:"1 × 45sn", muscle:"Sağ quad", how:["Her taraf eşit"], avoid:null, warn:null, alts:[] },
          { name:"Hamstring, Obliques and Lat Stretch", sets:"2 × 45sn", muscle:"3 bölge", how:["Otur, bir bacağı uzat","Öne eğil"], avoid:null, warn:null, alts:[] },
          { name:"Lizard Pose Left", sets:"1 × 45sn", muscle:"Sol kalça fleksör, groin", how:["Sol ayak öne — büyük lunge","Sağ diz yerde","Kalçayı aşağı it"], avoid:null, warn:null, alts:[] },
          { name:"Lizard Pose Right", sets:"1 × 45sn", muscle:"Sağ kalça fleksör", how:["Her taraf eşit"], avoid:null, warn:null, alts:[] },
          { name:"Standing Calf Stretch", sets:"2 × 30sn (her taraf)", muscle:"Baldır, ayak bileği", how:["Duvara doğru, arka topuk yerde","Öne eğil"], avoid:"Topuğu kaldırma", warn:null, alts:[] },
        ]},
      ],
    },

    {
      id: 4, title: "GÜN 4", sub: "PAZAR", focus: "Full Body Skill", duration: "~75 dk", color: "#8338EC",
      type: "training",
      injury: "⚠️ Skill günü — ağırlık yok, vücut ağırlığı ve kontrol. Diz ve omuz kısıtları geçerli.",
      blocks: [
        { name: "🔥 ISINMA A — Postür Rutini", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Dik dur","Çeneni geri it"], avoid:"Başı aşağı eğme", warn:null, alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz", how:["Bandı önde tut","Yanlara aç"], avoid:"Omuzları kaldırma", warn:null, alts:[] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt", how:["Kürek kemikleri hizasında","Geriye uzan"], avoid:"Bel üzerinde yapma", warn:"KİFOZ KRİTİK", alts:[] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor", how:["Diz yerde, kalçayı öne it"], avoid:"Gövdeyi öne eğme", warn:null, alts:[] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça rotatorları", how:["Sırt üstü, dizi yana yatır"], avoid:"Ağrıda daha az range", warn:null, alts:[] },
        ]},
        { name: "🔥 ISINMA B — Full Body Mobilite", color: "#CC5500", exercises: [
          { name:"Cat and Cow", sets:"2 × 10", muscle:"Tüm omurga", how:["Dört ayak","Cat-Cow nefesle birlikte"], avoid:"Sadece belden yapma", warn:null, alts:[] },
          { name:"Shoulder CARs", sets:"2 × 5 (her taraf)", muscle:"Glenohumeral mobilite", how:["Tam daire — çok yavaş","Her yönde kontrol"], avoid:"Gövdeyi hareket ettirme", warn:null, alts:[] },
          { name:"Hip Hinge", sets:"2 × 10", muscle:"Hamstring, omurga farkındalığı", how:["Kalçayı geriye it","Sırt düz","Dizler hafif bükülü","Geri gel"], avoid:"Öne değil — geriye", warn:null, alts:[] },
          { name:"Cossack Squat", sets:"2 × 6 (her taraf)", muscle:"Kasık, adduktör, ayak bileği", how:["Geniş duruş","Bir tarafa otur — karşı bacak uzatılmış","Topuk yerde","Ağır ağır"], avoid:"Diz içe kapanmasın", warn:"DİZ: Ağrıda daha az range — zorlama", alts:["Side Lunge"] },
        ]},
        { name: "🤸 SKILL — Pull-up Geliştirme", color: "#2A9D8F", exercises: [
          { name:"Dead Hang", sets:"4 × 30sn", muscle:"Lat, grip, omurga dekompresyon", how:["Tam ağırlıkla asıl","Omuzlar aktif — kulağa değil","Nefes al — omurgayı uzat"], avoid:"Pasif asılma", warn:"Her Pazar önce dead hang — omurga için şifa", alts:["Assisted Hang","Flexed Arm Hang"] },
          { name:"Scapula Pull Up", sets:"4 × 10", muscle:"Lat aktivasyon, scapula kontrol", how:["Bardan asıl","Sadece kürek kemikleri aşağı çek","Dirsek bükülmez"], avoid:"Dirsekleri bükme", warn:null, alts:[] },
          { name:"Chin-up Negative", sets:"4 × 5", muscle:"Biceps, lat — eccentric", how:["Üst pozisyondan başla","5 saniyede yavaşça in","Tam alta inince bırak"], avoid:"Hızlı düşme", warn:null, alts:["Assisted Chin Up","Band Pull Up"] },
          { name:"Assisted Pull Up", sets:"3 × 8", muscle:"Pull-up pattern — tam hareket", how:["Makine veya band yardımıyla","Tam aşağı — tam yukarı","Temiz form önce — ağırlık sonra"], avoid:"Kısmi range", warn:null, alts:["Band Pull Up","Lat Pulldown"] },
        ]},
        { name: "🤸 SKILL — Push-up & Dip Geliştirme", color: "#E76F51", exercises: [
          { name:"Push Up", sets:"3 × max", muscle:"Göğüs, triceps, ön delt", how:["Temiz form — vücut düz","Son tekrara kadar git","Formu bozmadan dur"], avoid:"Kalça yukarı sarkmasın", warn:null, alts:[] },
          { name:"Diamond Push Up", sets:"3 × 8", muscle:"Triceps, iç göğüs", how:["Eller elmas şeklinde","Dirsekler vücuda yakın"], avoid:null, warn:null, alts:["Close Grip Push Up"] },
          { name:"Pike Push Up", sets:"3 × 8", muscle:"Ön delt — overhead push skill", how:["Ters V pozisyonu","Başı yere doğru indir","Omuz hareketi"], avoid:"Kalçayı düşürme", warn:null, alts:[] },
          { name:"Dip Negative", sets:"3 × 5", muscle:"Triceps, alt göğüs — eccentric", how:["Üst pozisyondan","5 sn yavaşça in","Her tekrar temiz"], avoid:"Hızlı düşme", warn:null, alts:["Bench Dip Negative"] },
        ]},
        { name: "🤸 SKILL — L-sit & Core", color: "#8338EC", exercises: [
          { name:"Hollow Body Hold", sets:"4 × 20sn", muscle:"Anterior core zinciri", how:["Sırt üstü — kollar kulakların yanında","Bacaklar 45°","Bel yerde"], avoid:"Beli kaldırma", warn:null, alts:["Tuck Hold"] },
          { name:"Knee Tuck Hold", sets:"4 × 15sn", muscle:"Hip flexor, core, triceps basınç", how:["Parallel bar / sandalye","Dizleri göğse çek","Tutabildiğin kadar tut"], avoid:"Öne eğilme", warn:null, alts:["Hanging Knee Raise"] },
          { name:"Ab Wheel Rollout", sets:"3 × 8", muscle:"Core — full anterior zincir", how:["Diz üstünde başla","Tekerleği öne yuvarla — kontrollü","Geri çek — core sıkıştır"], avoid:"Beli sarkıtma", warn:null, alts:["Plank to Pike","TRX Pike"] },
        ]},
        { name: "💪 FULL BODY DUMBBELL COMPLEX", color: "#1A3A5C", exercises: [
          { name:"DB Complex (3 tur)", sets:"3 tur × 8 tekrar dinlenmeden", muscle:"Tüm vücut — fonksiyonel güç", how:["1: RDL × 8 — kalçayı geriye","2: Bent Over Row × 8 — aynı pozisyonda","3: Hang Clean × 8 — patlayıcı yukarı","4: Overhead Press × 8 — yukarı","Tur arasında 90 sn dinlen"], avoid:"Çok ağır yük — form bozulur", warn:"Hafif ağırlık al — full hareket önemli", alts:["KB Complex","Barbell Complex"] },
        ]},
        { name: "🎯 CORE", color: "#6C63FF", exercises: [
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique", how:["Sol dirsek omuz altında","Kalça yukarı"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Her iki taraf eşit"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ şart", alts:[] },
          { name:"Copenhagen Plank Left", sets:"2 × 20sn", muscle:"Adduktör, core — lateral zincir", how:["Yana yat — üst ayak bench'te","Alt bacak havada — kaldır","20 sn tut"], avoid:"Kalçayı düşürme", warn:null, alts:["Side Plank"] },
          { name:"Copenhagen Plank Right", sets:"2 × 20sn", muscle:"Adduktör, core", how:["Her iki taraf eşit"], avoid:"Kalçayı düşürme", warn:null, alts:["Side Plank"] },
        ]},
        { name: "🔥 FİNİSHER — AMRAP 5 Dakika", color: "#990000", exercises: [
          { name:"AMRAP Circuit", sets:"5 dakika × max tur", muscle:"Full body — kondisyon", how:["5 Push Up","5 Inverted Row (veya band pull apart)","10 Glute Bridge","Dinlenmeden — tur sayısını not al"], avoid:"Formu bozma", warn:null, alts:["Tabata","Jump Rope 5 dk"] },
        ]},
        { name: "❄️ SOĞUMA — Full Body", color: "#8338EC", exercises: [
          { name:"Child's Pose", sets:"1 × 60sn", muscle:"Sırt, omuz, kalça", how:["Kolları öne uzat — nefes al"], avoid:null, warn:null, alts:[] },
          { name:"Thread the Needle", sets:"1 × 30sn (her taraf)", muscle:"Torasik rotasyon", how:["Dört ayak — kolu alttan geçir"], avoid:null, warn:null, alts:[] },
          { name:"Hamstring, Obliques and Lat Stretch", sets:"2 × 45sn", muscle:"3 bölge", how:["Otur, bacağı uzat, öne eğil"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Right", sets:"1 × 45sn", muscle:"Torasik rotasyon, glute", how:["Sırt üstü — sağ dizi sol tarafa yatır","Kollar yanda — omuzlar yerde"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Left", sets:"1 × 45sn", muscle:"Her taraf eşit", how:["Sol dizi sağ tarafa yatır"], avoid:null, warn:null, alts:[] },
          { name:"Standing Half Forward Bend", sets:"1 × 45sn", muscle:"Hamstring, sırt alt", how:["Ayakta, öne eğil — dizler hafif bükülü","Elleri yere veya bacaklara"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },

    {
      id: 5, title: "OFF 1", sub: "PAZARTESİ", focus: "Recovery", duration: "~20 dk", color: "#6C757D",
      type: "offday",
      injury: null,
      blocks: [
        { name: "🌿 RECOVERY MOBİLİTE — Evde, Ekipmansız", color: "#6C757D", exercises: [
          { name:"Foam Roller Upper Back Roll", sets:"2 × 60sn", muscle:"Üst sırt, torasik", how:["Yavaşça roll — ağrılı noktalarda dur","Nefes al — kas bırak"], avoid:"Bel üzerinde yapma", warn:"Pazar sonrası recovery için kritik", alts:["Kitap/rulo havlu ile"] },
          { name:"Cat and Cow", sets:"2 × 15", muscle:"Tüm omurga", how:["Yavaş — nefesle birlikte","Sabah kalkar kalkmaz yap"], avoid:null, warn:null, alts:[] },
          { name:"Child's Pose", sets:"2 × 60sn", muscle:"Sırt, omuz, kalça", how:["Kolları öne uzat","Tam bırak — pasif"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Right", sets:"1 × 60sn", muscle:"Torasik rotasyon, sırt", how:["Sırt üstü — dizi karşı tarafa yatır","Omuzlar yerde"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Left", sets:"1 × 60sn", muscle:"Her taraf eşit", how:["Her taraf eşit süre"], avoid:null, warn:null, alts:[] },
          { name:"Hug Knees to Chest", sets:"1 × 60sn", muscle:"Alt sırt, glute", how:["Sırt üstü — iki dizi göğse çek","Hafifçe önce sağa sonra sola sal"], avoid:null, warn:null, alts:[] },
          { name:"Hip Flexor Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hip flexor — oturma kasılmasına karşı", how:["Yarım diz pozisyon","Kalçayı öne it — gövde dik"], avoid:null, warn:"Masa başı çalışıyorsan günlük şart", alts:[] },
          { name:"Diaphragmatic Breathing", sets:"2 × 10 nefes", muscle:"Parasempatik aktivasyon, core", how:["Sırt üstü yat","Burndan 4 sn — karna nefes al","2 sn tut","Ağızdan 6 sn ver"], avoid:null, warn:"HRV'yi iyileştirir — recovery hızlanır", alts:[] },
        ]},
      ],
    },

    {
      id: 6, title: "OFF 2", sub: "ÇARŞAMBA", focus: "Active Recovery", duration: "~25 dk", color: "#6C757D",
      type: "offday",
      injury: null,
      blocks: [
        { name: "⚡ AKTİF RECOVERY — Evde, Band veya Ekipmansız", color: "#6C757D", exercises: [
          { name:"Band Pull Apart", sets:"3 × 20", muscle:"Arka omuz, postür kasları", how:["Direnç bandı ile","Yavaş — her tekrarda 1 sn tut"], avoid:"Omuzları kaldırma", warn:"Ofis çalışanı için postür kasları zayıflar", alts:["Towel Pull Apart"] },
          { name:"Wall Sit", sets:"3 × 30sn", muscle:"Quad izometrik — diz dostu", how:["Sırt duvarda","Dizler 60-70° — ağrısız range","30 sn tut"], avoid:"Diz 90° geçmesin", warn:"DİZ: Aktif tutmak için izometrik", alts:[] },
          { name:"Side-lying Hip Abduction Left", sets:"2 × 15", muscle:"Sol gluteus medius", how:["Sol taraf alta yat","Sol bacağı yukarı kaldır","Kontrollü indir"], avoid:"Pelvisin dönmesi", warn:null, alts:[] },
          { name:"Side-lying Hip Abduction Right", sets:"2 × 15", muscle:"Sağ gluteus medius", how:["Her iki taraf eşit"], avoid:"Pelvisin dönmesi", warn:null, alts:[] },
          { name:"Dead Bug", sets:"3 × 10 (her taraf)", muscle:"Core aktivasyon", how:["Sırt üstü — kollar tavana","Bel yerde — nefes al","Yavaş uzat, geri gel"], avoid:"Beli kaldırma", warn:null, alts:[] },
          { name:"Side Plank Left", sets:"2 × 30sn", muscle:"Sol oblique", how:["Dirsek omuz altında","Kalça yukarı"], avoid:"Kalça sarkmasın", warn:"SKOLYOZ: Günlük yapabilirsin", alts:[] },
          { name:"Side Plank Right", sets:"2 × 30sn", muscle:"Sağ oblique", how:["Her iki taraf eşit"], avoid:"Kalça sarkmasın", warn:null, alts:[] },
          { name:"Chin Tuck", sets:"3 × 15", muscle:"Derin boyun fleksörleri", how:["Sandalyede otur — dik","Çeneni geri it","2 sn tut"], avoid:null, warn:"Bilgisayar başındaysan saatte bir yap", alts:[] },
        ]},
      ],
    },

    {
      id: 7, title: "OFF 3", sub: "CUMA", focus: "Activation Prep", duration: "~15 dk", color: "#6C757D",
      type: "offday",
      injury: null,
      blocks: [
        { name: "🔋 CUMARTESİ HAZİRLIĞI — Ekipmansız", color: "#6C757D", exercises: [
          { name:"Hip Flexor Stretch", sets:"2 × 45sn (her taraf)", muscle:"Hip flexor açma", how:["Yarım diz pozisyon","Kalçayı öne it"], avoid:null, warn:"Sabah Lower günü öncesi akşam yap", alts:[] },
          { name:"Floor Bridge", sets:"3 × 20", muscle:"Glute pre-aktivasyon", how:["Sırt üstü — kalçayı yukarı","1 sn sıkıştır","Hızlı ritim değil — glute'u hisset"], avoid:null, warn:null, alts:[] },
          { name:"Side-lying Hip Abduction Left", sets:"2 × 15", muscle:"Sol gluteus medius", how:["Sol taraf alta","Sol bacağı kaldır"], avoid:null, warn:null, alts:[] },
          { name:"Side-lying Hip Abduction Right", sets:"2 × 15", muscle:"Sağ gluteus medius", how:["Her iki taraf eşit"], avoid:null, warn:null, alts:[] },
          { name:"Ankle Circle", sets:"2 × 10 (her yön)", muscle:"Ayak bileği mobilite", how:["Otur — ayağı kaldır","Her iki yönde tam daire","10 ileri 10 geri"], avoid:null, warn:"Diz sağlığı için ayak bileği mobilitesi kritik", alts:[] },
          { name:"Cat and Cow", sets:"2 × 10", muscle:"Omurga hazırlık", how:["Nefesle birlikte","Yavaş"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },
  ],
};
