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
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Sandalyede dik otur veya ayakta dur", "Çeneni geriye it — çift çene yap", "Boyun uzuyor gibi hisset — 2 sn tut", "Bırak, tekrarla — 12-15 tekrar"], avoid:"Başı aşağı eğme — sadece geriye it", warn:"Bilgisayar başında çalışanlar için boyun ağrısının ana önlemi", alts:["Wall Chin Tuck","Supine Chin Tuck"] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid", how:["Bandı iki elle önde omuz hizasında tut — omuz genişliğinde", "Kolları düz tutarak yanlara aç — kürek kemiklerini birleştir", "1 sn tam açık pozisyonda tut", "Kontrollü geri gel — 2-3 sn"], avoid:"Omuzları kulağa kaldırma — trapez değil rhomboid çalışmalı", warn:"Bilgisayar başında postür kasları zayıflar — günlük yapılmalı", alts:["Cable Reverse Fly","Face Pull (hafif)"] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt, torasik mobilite", how:["Foam roller'ı üst sırt (T4-T8) hizasına yerleştir", "Kolları göğsün üzerinde çaprazla veya elleri ensede", "Yavaşça yuvarlan — ağrılı noktada 20-30 sn kal", "Nefes ver ve kası bırak — zorla bastırma"], avoid:"Bel omurları üzerinde yuvarlanma — sadece üst sırt", warn:"KİFOZ + SKOLYOZ: Torasik mobilite her gün şart — asla atlama", alts:["Bench Thoracic Extension","Prayer Pose on Bench"] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor, kasık", how:["Diz yerde, kalçayı öne it","Pelvis aşağı — posterior tilt","Gövde dik tut"], avoid:"Gövdeyi öne eğme", warn:null, alts:["Couch Stretch","Standing Hip Flexor Stretch"] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça rotatorları, groin", how:["Sırt üstü yat — dizler bükülü, ayaklar yerde", "Sağ dizi yavaşça sağa yatır — 10 sn tut", "Geri gel, sol dizi sola yatır — 10 sn tut", "Ağrı varsa range'i azalt — zorla yapma"], avoid:"Kalçanın yerden kalkmasına izin verme", warn:"DİZ: Kalça rotatorlarını açar — menisküs stresi azalır", alts:["90/90 Hip Stretch","Frog Pose (yatarak)"] },
        ]},
        { name: "🔥 ISINMA B — Güne Özel (Sırt & Omuz Prehab)", color: "#CC5500", exercises: [
          { name:"Cat and Cow", sets:"2 × 10", muscle:"Omurga mobilite, torasik", how:["Dört ayak — bilekler omuz altında, dizler kalça altında", "Cat: nefes ver → sırtı yuvarlat, çeneyi göğse çek, pelvis içe döner", "Cow: nefes al → sırtı çukurlaştır, göğsü öne çık, kuyruğu kaldır", "Yavaş ve nefesle birlikte — 3-4 sn her pozisyon"], avoid:"Sadece boyun veya belden yapma — tüm omurga dalgalanmalı", warn:"SKOLYOZ: Her tekrarda sol-sağ simetriyi hisset", alts:["Thread the Needle","Thoracic Rotation"] },
          { name:"Shoulder CARs", sets:"2 × 5 (her taraf)", muscle:"Glenohumeral mobilite, tüm omuz", how:["Kolu yavaşça tam daire çiz","İleri — yukarı — geri — aşağı","Çok yavaş — 5 sn bir tur"], avoid:"Gövdeyi hareket ettirme", warn:"ROTATOR CUFF: Ağrısız range'de kal", alts:["Arm Circles","Shoulder Pendulum"] },
          { name:"Band External Rotation", sets:"2 × 15 (her taraf)", muscle:"Infraspinatus, teres minor — rotator cuff", how:["Dirsek 90° bükülü — vücuda yapışık", "Bant dirseğin ön kısmından geçiyor", "Kolu dışa doğru döndür — dirsek sabit", "Kontrollü geri gel — kasılmayı hisset"], avoid:"Dirseği vücuttan ayırma — sabit tutmalı", warn:"ROTATOR CUFF REHABİLİTASYON: Omuz cerrahisi riskini azaltan en önemli hareket", alts:["Side-lying External Rotation","Cable ER"] },
          { name:"Prone Y-T-W", sets:"2 × 10", muscle:"Alt trapez, rhomboid, rotator cuff", how:["Yüzüstü yat veya incline bench","Y: kollar 135° yukarı — kaldır","T: kollar yana — kaldır","W: dirsekler bükülü, dışa dön"], avoid:"Boyunu sıkıştırma", warn:"Omuz cerrahisi riski olan için en iyi prehab", alts:["Band Y-T-W","Cable Y-T-W"] },
        ]},
        { name: "🏋️ PRIMARY — Pull", color: "#1A3A5C", exercises: [
          { name:"Machine Lat Pulldown", sets:"4 × 8", muscle:"Latissimus dorsi, teres major", how:["Geniş tutuş — omuz genişliğinden fazla","Göğsü aç, hafif geriye yaslan","Dirseği aşağı ve arkaya çek","3 sn geri ver — lat'ı hisset"], avoid:"Vücudu öne arkaya sallama", warn:"Pull-up için temel güç hareketi", alts:["Cable Pulldown","Assisted Pull Up","Straight Arm Pulldown"] },
          { name:"Seated Cable Row (Single Arm)", sets:"3 × 10 (her taraf)", muscle:"Mid trapez, rhomboid, biceps", how:["Tek elle çek — karşı elle destekle","Kürek kemiğini geri ve aşağı çek","1 sn sıkıştır","SKOLYOZ: Her iki taraf eşit"], avoid:"Gövdeyi döndürme", warn:"Unilateral — asimetriyi düzeltir", alts:["Dumbbell Row","Machine Row"] },
          { name:"45 Degree Incline Row (Single Arm)", sets:"3 × 10 (her taraf)", muscle:"Sırt orta, rhomboid", how:["45° incline bench'e yüzüstü yat","Dumbbell ile tek elle çek","Kürek kemiğini geri çek — dirsek göğüs hizasında","Kontrollü indir"], avoid:"Omzunu kulağa çekme", warn:"KİFOZ için ideal açı", alts:["Bent Over Row","Cable Row"] },
          { name:"Straight Arm Pulldown", sets:"3 × 12", muscle:"Lat izolasyon, serratus", how:["Kablo yukarıda, kollar uzun","Kolları düz tut — dirsek hafif bükük","Aşağı çek — kalçaya doğru","Lat'ı sıkıştır"], avoid:"Dirsekleri bükme", warn:null, alts:["Pullover Machine","DB Pullover"] },
          { name:"Face Pull", sets:"3 × 15", muscle:"Arka delt, rotator cuff", how:["Kablo göz hizasında","İki elle rope attachment","Yüze doğru çek — dirsekler yüksek","1 sn tut — dışa dön"], avoid:"Dirseği düşürme", warn:"Her Pull günü zorunlu — posterior delt zayıflığı skolyozu artırır", alts:["Band Face Pull","Reverse Fly"] },
        ]},
        { name: "💪 SECONDARY — Biceps (Hafif)", color: "#6C63FF", exercises: [
          { name:"Incline Dumbbell Curl", sets:"3 × 12 (her taraf)", muscle:"Biceps uzun baş izolasyon", how:["45° incline bench — kollar serbest sarkar","Avuç yukarı — supinasyon","Kontrollü kıvır — tepe noktada sıkıştır","3 sn yavaşça indir — tam germe"], avoid:"Dirsekleri öne atmayı — sabit kalacak", warn:"Pull günü biceps hacmini dengeler — triceps dengesizliğini giderir", alts:["Standing DB Curl","Cable Curl","Hammer Curl"] },
        ]},
        { name: "🤸 CALİSTHENİCS SKILL — Pull", color: "#E76F51", exercises: [
          { name:"Dead Hang", sets:"3 × 30sn", muscle:"Lat, ön kol, grip, omuz dekompresyon", how:["Bardan iki elle asıl — overhand tutuş", "Omuzları aktif tut — kulağa doğru değil, aşağı çek", "Vücut sallanmasın — sakin kal", "Nefes al — omurgayı uzat — 20-30 sn tut"], avoid:"Tamamen pasif sarkmak — omuzlar aktif olmalı", warn:"Omurga dekompresyonu — disk arası mesafeyi açar, sırt ağrısına iyi gelir", alts:["Scapula Pull","Flexed Arm Hang"] },
          { name:"Chin-up Negative", sets:"3 × 5", muscle:"Biceps, lat — eccentric", how:["Kasa zıpla veya step kullan — üst pozisyondan başla","5 saniyede yavaşça in","Tam alta inince bırak","Her tekrar ayrı"], avoid:"Hızlı düşme — 5 sn şart", warn:"Konsantrik yapamazsan negatifle güç kazan", alts:["Assisted Chin Up","Band Chin Up"] },
          { name:"Scapula Pull Up", sets:"3 × 10", muscle:"Lat aktivasyonu, omuz stabilite", how:["Bardan iki elle asıl — overhand tutuş", "Omuzları aktif tut — kulağa doğru değil, aşağı çek", "Vücut sallanmasın — sakin kal", "Nefes al — omurgayı uzat — 20-30 sn tut"], avoid:"Tamamen pasif sarkmak — omuzlar aktif olmalı", warn:"Omurga dekompresyonu — disk arası mesafeyi açar, sırt ağrısına iyi gelir", alts:["Dead Hang","Band Assisted Scapula Pull"] },
        ]},
        { name: "🎯 CORE", color: "#6C63FF", exercises: [
          { name:"Bird Dog", sets:"3 × 10 (her taraf)", muscle:"Erector spinae, glute, core stabilite", how:["Sırt üstü yat — kollar tavana dik, dizler 90° havada", "BEL YERDE — tüm hareket boyunca değişmemeli", "Sağ kolu geri, sol bacağı öne uzat — aynı anda", "Geri gel, sol kol — sağ bacak uzat", "Nefes verirken uzat, alırken geri gel"], avoid:"Beli yerden kaldırma — bu hareketin tek amacı beli yerde tutmak", warn:"SKOLYOZ: En etkili lumbar stabilizasyon egzersizi", alts:["Dead Bug","Superman Hold"] },
          { name:"Side Plank Left", sets:"2 × 40sn", muscle:"Sol oblique, quadratus lumborum", how:["Sol yanına yat — sol dirsek omuz altında tam dik", "Ayakları üst üste veya öne-arkaya aç", "Kalçayı yerden kaldır — omuzdan topuğa düz çizgi", "Üst kolu tavana uzan veya kalçaya koy — 30-45 sn tut"], avoid:"Kalçanın öne veya geriye sarkması", warn:"SKOLYOZ: Her iki tarafı eşit süre yap — lateral core dengesi kritik", alts:["Side Plank Hip Dip","Modified Side Plank"] },
          { name:"Side Plank Right", sets:"2 × 40sn", muscle:"Sağ oblique, quadratus lumborum", how:["Sağ yanına yat — sağ dirsek omuz altında", "Kalçayı yerden kaldır — düz çizgi", "Her iki taraf eşit süre — 30-45 sn", "Nefes almayı kesme"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Asla bir tarafı atlama", alts:["Side Plank Hip Dip","Modified Side Plank"] },
        ]},
        { name: "🔥 FİNİSHER", color: "#990000", exercises: [
          { name:"Rowing Machine", sets:"3 × 45sn", muscle:"Full body — sırt, bacak, core", how:["Bacaklar önce iter","Gövde geriye yaslanır","Kollar çeker — göğse","Geri ver — aynı sırayla"], avoid:"Kollarla başlama — güç bacaktan gelir", warn:null, alts:["Jump Rope","Battle Ropes"] },
        ]},
        { name: "❄️ SOĞUMA", color: "#2A9D8F", exercises: [
          { name:"Lat Stretch Chair", sets:"1 × 45sn (her taraf)", muscle:"Latissimus dorsi", how:["Sandalyeye tutun","Kalçayı dışa it"], avoid:null, warn:null, alts:[] },
          { name:"Chest Doorway Stretch", sets:"1 × 45sn", muscle:"Göğüs, ön delt", how:["Kapı kasasına kolları daya","Öne çık — göğüs açılır"], avoid:null, warn:null, alts:[] },
          { name:"Hamstring, Obliques and Lat Stretch", sets:"2 × 45sn", muscle:"3 bölge", how:["Otur, bir bacağı uzat","Kolları yana aç ve öne eğil"], avoid:null, warn:null, alts:[] },
          { name:"Child's Pose", sets:"1 × 45sn", muscle:"Sırt, omuz, kalça", how:["Diz üstü otur, topuklarına otur", "Kolları öne uzat — yere koy", "Alnı yere koy veya mindere", "Tamamen bırak — pasif esneme — 45-60 sn"], avoid:"Zorla uzanma — yer çekimi işini yapsın", warn:"Diz ağrısı varsa topuklara oturmak yerine daha dik dur", alts:[] },
        ]},
      ],
    },

    {
      id: 2, title: "GÜN 2", sub: "PERŞEMBE", focus: "Push Focus", duration: "~75 dk", color: "#E76F51",
      type: "training",
      injury: "⚠️ ROTATOR CUFF: Isınma B'deki ER hareketleri asla atlama — Push öncesi zorunlu. Overhead press'te ağrıda ROM azalt.",
      blocks: [
        { name: "🔥 ISINMA A — Postür Rutini", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Sandalyede dik otur veya ayakta dur", "Çeneni geriye it — çift çene yap", "Boyun uzuyor gibi hisset — 2 sn tut", "Bırak, tekrarla — 12-15 tekrar"], avoid:"Başı aşağı eğme — sadece geriye it", warn:"Bilgisayar başında çalışanlar için boyun ağrısının ana önlemi", alts:["Wall Chin Tuck"] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid", how:["Bandı iki elle önde omuz hizasında tut — omuz genişliğinde", "Kolları düz tutarak yanlara aç — kürek kemiklerini birleştir", "1 sn tam açık pozisyonda tut", "Kontrollü geri gel — 2-3 sn"], avoid:"Omuzları kulağa kaldırma — trapez değil rhomboid çalışmalı", warn:"Bilgisayar başında postür kasları zayıflar — günlük yapılmalı", alts:["Cable Reverse Fly"] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt", how:["Foam roller'ı üst sırt (T4-T8) hizasına yerleştir", "Kolları göğsün üzerinde çaprazla veya elleri ensede", "Yavaşça yuvarlan — ağrılı noktada 20-30 sn kal", "Nefes ver ve kası bırak — zorla bastırma"], avoid:"Bel omurları üzerinde yuvarlanma — sadece üst sırt", warn:"KİFOZ + SKOLYOZ: Torasik mobilite her gün şart — asla atlama", alts:["Bench Thoracic Extension"] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor", how:["Diz yerde, kalçayı öne it","Gövde dik"], avoid:"Gövdeyi öne eğme", warn:null, alts:["Couch Stretch"] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça rotatorları", how:["Sırt üstü yat — dizler bükülü, ayaklar yerde", "Sağ dizi yavaşça sağa yatır — 10 sn tut", "Geri gel, sol dizi sola yatır — 10 sn tut", "Ağrı varsa range'i azalt — zorla yapma"], avoid:"Kalçanın yerden kalkmasına izin verme", warn:"DİZ: Kalça rotatorlarını açar — menisküs stresi azalır", alts:["90/90 Hip Stretch"] },
        ]},
        { name: "🔥 ISINMA B — Güne Özel (Göğüs & Omuz Prehab)", color: "#CC5500", exercises: [
          { name:"Shoulder CARs", sets:"2 × 5 (her taraf)", muscle:"Glenohumeral tam mobilite", how:["Kolu yavaşça tam daire çiz","İleri — yukarı — geri — aşağı","5 sn bir tur — çok yavaş"], avoid:"Gövdeyi hareket ettirme", warn:"ROTATOR CUFF: Ağrısız range'de kal", alts:["Arm Circles"] },
          { name:"Band External Rotation", sets:"2 × 15 (her taraf)", muscle:"Infraspinatus, teres minor — rotator cuff", how:["Dirsek 90° bükülü — vücuda yapışık", "Bant dirseğin ön kısmından geçiyor", "Kolu dışa doğru döndür — dirsek sabit", "Kontrollü geri gel — kasılmayı hisset"], avoid:"Dirseği vücuttan ayırma — sabit tutmalı", warn:"ROTATOR CUFF REHABİLİTASYON: Omuz cerrahisi riskini azaltan en önemli hareket", alts:["Side-lying External Rotation","Cable ER"] },
          { name:"Side-lying External Rotation", sets:"2 × 12 (her taraf)", muscle:"Infraspinatus izolasyon", how:["Yana yat — alttaki taraf çalışır","Dirsek 90° — yanında","Küçük dumbbell ile yavaşça dışa döndür","Kontrollü geri"], avoid:"Momentum kullanma", warn:"ROTATOR CUFF YIRTIGI: En önemli rehab hareketi", alts:["Band ER","Cable ER"] },
          { name:"Dynamic Chest Stretch", sets:"2 × 10", muscle:"Pektoralis, ön delt", how:["Kolları yanlara aç — göğüs gerilir","Öne getir — çarpraz","Ritimli — dinamik"], avoid:"Ani sert hareket", warn:null, alts:["Doorway Stretch"] },
          { name:"Wrist Circle", sets:"2 × 10 (her yön)", muscle:"Bilek eklem mobilitesi", how:["Her iki bileği tam daire çiz","Push Up öncesi kritik"], avoid:null, warn:null, alts:["Wrist Flexion/Extension"] },
        ]},
        { name: "🏋️ PRIMARY — Push", color: "#8B0000", exercises: [
          { name:"Incline Dumbbell Press", sets:"4 × 8", muscle:"Üst göğüs, ön delt, triceps", how:["30-45° incline","Dumbbell omuz hizasında — dirsekler 45°","Kontrollü in — göğsü hisset","It — tam uzama yok"], avoid:"Dirseği tam kilitleyerek uzatma", warn:"ROTATOR CUFF: Ağrıda ROM azalt, ağırlığı düşür", alts:["Flat DB Press","Machine Chest Press"] },
          { name:"DB Overhead Press", sets:"3 × 10", muscle:"Ön/orta delt, triceps, üst trapez", how:["Oturarak — sırt destekli","Dumbbell kulak hizasından başla","Yukarı it — tam uzatma","3 sn indir"], avoid:"Beli aşırı hiperextend etme", warn:"ROTATOR CUFF: Ağrıda landmine press'e geç", alts:["Landmine Press","Arnold Press","Machine Shoulder Press"] },
          { name:"Cable Fly", sets:"3 × 12", muscle:"Göğüs adduction, pektoral germe", how:["Kablo orta yükseklikte","Kollar hafif bükülü","Göğüs ortasında birleştir","3 sn geri aç — tam germe"], avoid:"Kolu düz tutma", warn:null, alts:["DB Fly","Pec Deck"] },
          { name:"DB Lateral Raise", sets:"3 × 15", muscle:"Orta delt", how:["Hafif öne eğik 10°","Yanlara kaldır — omuz hizası","Başparmak hafif aşağı","Kontrollü indir"], avoid:"Trapezi kullanma — sallama yok", warn:null, alts:["Cable Lateral Raise","Machine Lateral Raise"] },
          { name:"Cable Overhead Triceps Extension", sets:"3 × 12", muscle:"Triceps uzun baş", how:["Kablo başın üstünde","Dirsekler kulaklara yakın — sabit","Kolları yukarı uzat","Kontrollü bükerek in"], avoid:"Dirsekleri açma", warn:null, alts:["Skull Crusher","DB Overhead Ext"] },
        ]},
        { name: "💪 SECONDARY — Posterior Delt (Hafif)", color: "#2A9D8F", exercises: [
          { name:"Face Pull", sets:"3 × 15", muscle:"Arka delt, rotator cuff", how:["Kablo göz hizası","Yüze doğru çek — dirsekler yüksek","Dışa döndür — 1 sn tut"], avoid:"Dirseği düşürme", warn:"Push günü posterior dengelemesi — şart", alts:["Band Face Pull","Reverse Fly"] },
        ]},
        { name: "🤸 CALİSTHENİCS SKILL — Push & Dip", color: "#E76F51", exercises: [
          { name:"Pike Push Up", sets:"3 × 8", muscle:"Ön delt, triceps — overhead push", how:["Ters V pozisyonu — kalça yukarıda","Başı yere doğru indir","Patlayıcı yukarı it","Omuz hareketi — göğüs değil"], avoid:"Kalçayı düşürme", warn:"Handstand push up'a giden yol", alts:["Wall Pike Push Up","Elevated Pike"] },
          { name:"Diamond Push Up", sets:"3 × 8", muscle:"Triceps, iç göğüs", how:["Eller elmas şeklinde — işaret parmakları birbirine","Göğüsü ellerin üzerine indir","Dirsekler vücuda yakın — içe kapanır"], avoid:"Eller çok öne koyma", warn:null, alts:["Close Grip Push Up","Bench Triceps Dip"] },
          { name:"Dip Negative", sets:"3 × 5", muscle:"Triceps, alt göğüs, ön delt — eccentric", how:["Paralel bar veya bench — üst pozisyondan başla","5 saniyede yavaşça in","Tam alta inince zıpla veya ayağa kalk — başa dön","Her tekrar temiz"], avoid:"Hızlı düşme — 5 sn şart", warn:"Dip için eccentric güç önce gelir", alts:["Bench Dip Negative","Ring Dip Negative"] },
        ]},
        { name: "🎯 CORE", color: "#6C63FF", exercises: [
          { name:"Dead Bug", sets:"3 × 12", muscle:"Transversus abdominis, core stabilite", how:["Sırt üstü yat — kollar tavana dik, dizler 90° havada", "BEL YERDE — tüm hareket boyunca değişmemeli", "Sağ kolu geri, sol bacağı öne uzat — aynı anda", "Geri gel, sol kol — sağ bacak uzat", "Nefes verirken uzat, alırken geri gel"], avoid:"Beli yerden kaldırma — bu hareketin tek amacı beli yerde tutmak", warn:"SKOLYOZ: En etkili lumbar stabilizasyon egzersizi", alts:["Bird Dog","Hollow Body Hold"] },
          { name:"Side Plank Left", sets:"2 × 40sn", muscle:"Sol oblique", how:["Sol yanına yat — sol dirsek omuz altında tam dik", "Ayakları üst üste veya öne-arkaya aç", "Kalçayı yerden kaldır — omuzdan topuğa düz çizgi", "Üst kolu tavana uzan veya kalçaya koy — 30-45 sn tut"], avoid:"Kalçanın öne veya geriye sarkması", warn:"SKOLYOZ: Her iki tarafı eşit süre yap — lateral core dengesi kritik", alts:["Modified Side Plank"] },
          { name:"Side Plank Right", sets:"2 × 40sn", muscle:"Sağ oblique", how:["Sağ yanına yat — sağ dirsek omuz altında", "Kalçayı yerden kaldır — düz çizgi", "Her iki taraf eşit süre — 30-45 sn", "Nefes almayı kesme"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Asla bir tarafı atlama", alts:["Modified Side Plank"] },
        ]},
        { name: "🔥 FİNİSHER", color: "#990000", exercises: [
          { name:"Jump Rope", sets:"3 × 45sn", muscle:"Koordinasyon, calf, kondisyon", how:["Hafif zıpla — ayak parmaklarına in","Bilek hareketi — kol değil","45 sn maksimum tempo — 30 sn dinlen"], avoid:"Topukla inme", warn:null, alts:["Jumping Jacks","High Knees"] },
        ]},
        { name: "❄️ SOĞUMA", color: "#E76F51", exercises: [
          { name:"Above Head Chest Stretch", sets:"1 × 45sn", muscle:"Pektoral, ön delt", how:["Kolları başın üstünde birleştir","Geriye doğru uzan"], avoid:null, warn:null, alts:[] },
          { name:"Shoulder Stretch Behind Back", sets:"1 × 45sn (her taraf)", muscle:"Arka delt, rotator cuff", how:["Bir eli sırtın arkasından yukarı","Diğer elle dirseği it"], avoid:null, warn:null, alts:[] },
          { name:"Triceps Stretch", sets:"1 × 30sn (her taraf)", muscle:"Triceps uzun baş", how:["Kolu başın arkasında büküp tut","Diğer elle dirseği aşağı it"], avoid:null, warn:null, alts:[] },
          { name:"Child's Pose", sets:"1 × 45sn", muscle:"Omuz, sırt, kalça", how:["Diz üstü otur, topuklarına otur", "Kolları öne uzat — yere koy", "Alnı yere koy veya mindere", "Tamamen bırak — pasif esneme — 45-60 sn"], avoid:"Zorla uzanma — yer çekimi işini yapsın", warn:"Diz ağrısı varsa topuklara oturmak yerine daha dik dur", alts:[] },
        ]},
      ],
    },

    {
      id: 3, title: "GÜN 3", sub: "CUMARTESİ", focus: "Lower + Skill", duration: "~80 dk", color: "#F4A261",
      type: "training",
      injury: "⚠️ DİZ: Leg press sığ range (0-60°), derin squat/lunge yok, Step Up yok. Omuz: Secondary'de hafif yükle.",
      blocks: [
        { name: "🔥 ISINMA A — Postür Rutini", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Sandalyede dik otur veya ayakta dur", "Çeneni geriye it — çift çene yap", "Boyun uzuyor gibi hisset — 2 sn tut", "Bırak, tekrarla — 12-15 tekrar"], avoid:"Başı aşağı eğme — sadece geriye it", warn:"Bilgisayar başında çalışanlar için boyun ağrısının ana önlemi", alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid", how:["Bandı iki elle önde omuz hizasında tut — omuz genişliğinde", "Kolları düz tutarak yanlara aç — kürek kemiklerini birleştir", "1 sn tam açık pozisyonda tut", "Kontrollü geri gel — 2-3 sn"], avoid:"Omuzları kulağa kaldırma — trapez değil rhomboid çalışmalı", warn:"Bilgisayar başında postür kasları zayıflar — günlük yapılmalı", alts:[] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt", how:["Foam roller'ı üst sırt (T4-T8) hizasına yerleştir", "Kolları göğsün üzerinde çaprazla veya elleri ensede", "Yavaşça yuvarlan — ağrılı noktada 20-30 sn kal", "Nefes ver ve kası bırak — zorla bastırma"], avoid:"Bel omurları üzerinde yuvarlanma — sadece üst sırt", warn:"KİFOZ + SKOLYOZ: Torasik mobilite her gün şart — asla atlama", alts:[] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor", how:["Diz yerde, kalçayı öne it","Gövde dik"], avoid:"Gövdeyi öne eğme", warn:null, alts:[] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça rotatorları", how:["Sırt üstü yat — dizler bükülü, ayaklar yerde", "Sağ dizi yavaşça sağa yatır — 10 sn tut", "Geri gel, sol dizi sola yatır — 10 sn tut", "Ağrı varsa range'i azalt — zorla yapma"], avoid:"Kalçanın yerden kalkmasına izin verme", warn:"DİZ: Kalça rotatorlarını açar — menisküs stresi azalır", alts:[] },
        ]},
        { name: "🔥 ISINMA B — Güne Özel (Kalça & Glute)", color: "#CC5500", exercises: [
          { name:"One Leg Hip Abduction Right", sets:"2 × 10", muscle:"Sağ kalça abduktör", how:["Ayakta, sol elle tut","Sağ bacağı yana kaldır","Kontrollü geri indir"], avoid:"Belini yana eğme", warn:null, alts:["Side-lying Hip Abduction"] },
          { name:"One Leg Hip Abduction Left", sets:"2 × 10", muscle:"Sol kalça abduktör", how:["Ayakta, sağ elle tut","Sol bacağı yana kaldır","Kontrollü geri indir"], avoid:"Belini yana eğme", warn:null, alts:["Side-lying Hip Abduction"] },
          { name:"Floor Bridge", sets:"3 × 15", muscle:"Glute, hamstring aktivasyon", how:["Sırt üstü yat — dizler bükülü, ayaklar yerde kalça genişliğinde", "Topuklarla yere bas, kalçayı yukarı kaldır", "Üstte 1 sn glute'u sıkıştır — kalça kasını hisset", "Yavaşça indir — 2-3 sn"], avoid:"Beli aşırı kaldırma — glute sıkışmalı, bel değil", warn:"Glute aktivasyonu — hareketsiz oturmanın zayıflattığı kasları uyandırır", alts:["Banded Glute Bridge"] },
          { name:"Kettlebell Ankle Static Stretch", sets:"2 × 10 (her taraf)", muscle:"Ayak bileği mobilitesi", how:["Dizi öne it — topuk yerde","Geri gel"], avoid:"Topuğu kaldırma", warn:"Menisküs için ayak bileği mobilitesi kritik", alts:["Ankle Wall Stretch"] },
        ]},
        { name: "⚡ AKTİVASYON", color: "#FF6B35", exercises: [
          { name:"Cable Hip Abduction", sets:"3 × 12 (her taraf)", muscle:"Gluteus medius, TFL", how:["Makineye yan dur — kayış ayak bileğinde","Bacağı yana kaldır","Kontrollü indir"], avoid:"Gövdeyi yana eğme", warn:"Diz stabilitesi için kritik", alts:["Band Hip Abduction","Side-lying Abduction"] },
          { name:"Seated Leg Extension with Band", sets:"2 × 12", muscle:"Vastus medialis — diz önü", how:["Sandalye, band ayak bileğinde","Dizi uzat — 1 sn tut","Yavaşça bük — 3 sn"], avoid:"Hızlı yapma", warn:"DİZ REHAB — asla atlama", alts:["Quad Set","TKE"] },
        ]},
        { name: "🏋️ PRIMARY — Lower", color: "#2D6A4F", exercises: [
          { name:"Leg Press", sets:"4 × 10", muscle:"Quad, glute", how:["Sırta tam duvara daya — boşluk olmasın", "Dizler 60-70° açıda — derin squat değil", "Ayaklar kalça genişliğinde — topuklar yerde", "Eller uyluğun üzerinde — duvara yaslanma"], avoid:"Diz 90°'yi geçme — menisküs yükü artar", warn:"DİZ SAKATLIGI: İzometrik yüklenme — ekleme stres bindirmeden quad çalıştırır", alts:["Wall Sit","Hack Squat"] },
          { name:"Hip Thrust", sets:"4 × 10", muscle:"Glute maksimum izolasyon", how:["Sırt bench'e — dumbbell kalçada","Patlayıcı yukarı it","1 sn sıkıştır — tam üstte","Kontrollü indir"], avoid:"Beli hiperextend etme", warn:null, alts:["Banded Hip Thrust","Glute Bridge"] },
          { name:"Dumbbell Romanian Deadlift", sets:"3 × 10", muscle:"Hamstring, glute", how:["Dizler hafif bükülü — sabit","Kalçayı geriye it","Dumbbellları bacak boyunca indir","Hamstrings'de gerilme hissedince dur"], avoid:"Sırtı büküp öne eğilme", warn:"SKOLYOZ: Omurga nötrali kontrol et", alts:["Single Leg RDL","Cable Pull Through"] },
          { name:"Single Leg Glute Bridge (Sağ)", sets:"3 × 12", muscle:"Sağ glute, hamstring izolasyon", how:["Sırt üstü yat — dizler bükülü, ayaklar yerde kalça genişliğinde", "Topuklarla yere bas, kalçayı yukarı kaldır", "Üstte 1 sn glute'u sıkıştır — kalça kasını hisset", "Yavaşça indir — 2-3 sn"], avoid:"Beli aşırı kaldırma — glute sıkışmalı, bel değil", warn:"Glute aktivasyonu — hareketsiz oturmanın zayıflattığı kasları uyandırır", alts:["Floor Bridge","Hip Thrust"] },
          { name:"Machine Seated Leg Curl", sets:"3 × 12", muscle:"Hamstring izolasyon", how:["Oturarak — pivot diz hizasında","Kontrollü kıvır","3 sn yavaşça indir"], avoid:"Kalçayı kaldırma", warn:null, alts:["Machine Lying Leg Curl","Swiss Ball Curl"] },
          { name:"Swiss Ball Hamstring Curl", sets:"3 × 12", muscle:"Hamstring — hip extension + knee flexion", how:["Sırt üstü yat — topuklar ball üzerinde","Kalçayı kaldır ve sabit tut","Topukları çekerek ball'ı bedenine doğru getir","Yavaşça geri uzat — kalça hep yukarıda"], avoid:"Kalçayı düşürme — hep yukarıda kalacak", warn:"Makine yoksa en iyi hamstring alternatifi — dize yük yok", alts:["Glute Bridge Hamstring Walk","Nordic Hamstring Curl","Lying Leg Curl"] },
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
          { name:"Dead Bug", sets:"3 × 12", muscle:"Core stabilite", how:["Sırt üstü yat — kollar tavana dik, dizler 90° havada", "BEL YERDE — tüm hareket boyunca değişmemeli", "Sağ kolu geri, sol bacağı öne uzat — aynı anda", "Geri gel, sol kol — sağ bacak uzat", "Nefes verirken uzat, alırken geri gel"], avoid:"Beli yerden kaldırma — bu hareketin tek amacı beli yerde tutmak", warn:"SKOLYOZ: En etkili lumbar stabilizasyon egzersizi", alts:["Bird Dog"] },
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique", how:["Sol yanına yat — sol dirsek omuz altında tam dik", "Ayakları üst üste veya öne-arkaya aç", "Kalçayı yerden kaldır — omuzdan topuğa düz çizgi", "Üst kolu tavana uzan veya kalçaya koy — 30-45 sn tut"], avoid:"Kalçanın öne veya geriye sarkması", warn:"SKOLYOZ: Her iki tarafı eşit süre yap — lateral core dengesi kritik", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Sağ yanına yat — sağ dirsek omuz altında", "Kalçayı yerden kaldır — düz çizgi", "Her iki taraf eşit süre — 30-45 sn", "Nefes almayı kesme"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Asla bir tarafı atlama", alts:[] },
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
      id: 4, title: "GÜN 4", sub: "PAZAR", focus: "Full Body Skill", duration: "~70 dk", color: "#8338EC",
      type: "training",
      injury: "⚠️ Skill günü — ağırlık yok, vücut ağırlığı ve kontrol. Diz ve omuz kısıtları geçerli.",
      blocks: [
        { name: "🔥 ISINMA A — Postür Rutini", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Sandalyede dik otur veya ayakta dur", "Çeneni geriye it — çift çene yap", "Boyun uzuyor gibi hisset — 2 sn tut", "Bırak, tekrarla — 12-15 tekrar"], avoid:"Başı aşağı eğme — sadece geriye it", warn:"Bilgisayar başında çalışanlar için boyun ağrısının ana önlemi", alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz", how:["Bandı iki elle önde omuz hizasında tut — omuz genişliğinde", "Kolları düz tutarak yanlara aç — kürek kemiklerini birleştir", "1 sn tam açık pozisyonda tut", "Kontrollü geri gel — 2-3 sn"], avoid:"Omuzları kulağa kaldırma — trapez değil rhomboid çalışmalı", warn:"Bilgisayar başında postür kasları zayıflar — günlük yapılmalı", alts:[] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt", how:["Foam roller'ı üst sırt (T4-T8) hizasına yerleştir", "Kolları göğsün üzerinde çaprazla veya elleri ensede", "Yavaşça yuvarlan — ağrılı noktada 20-30 sn kal", "Nefes ver ve kası bırak — zorla bastırma"], avoid:"Bel omurları üzerinde yuvarlanma — sadece üst sırt", warn:"KİFOZ + SKOLYOZ: Torasik mobilite her gün şart — asla atlama", alts:[] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor", how:["Diz yerde, kalçayı öne it"], avoid:"Gövdeyi öne eğme", warn:null, alts:[] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça rotatorları", how:["Sırt üstü yat — dizler bükülü, ayaklar yerde", "Sağ dizi yavaşça sağa yatır — 10 sn tut", "Geri gel, sol dizi sola yatır — 10 sn tut", "Ağrı varsa range'i azalt — zorla yapma"], avoid:"Kalçanın yerden kalkmasına izin verme", warn:"DİZ: Kalça rotatorlarını açar — menisküs stresi azalır", alts:[] },
        ]},
        { name: "🔥 ISINMA B — Full Body Mobilite", color: "#CC5500", exercises: [
          { name:"Cat and Cow", sets:"2 × 10", muscle:"Tüm omurga", how:["Dört ayak — bilekler omuz altında, dizler kalça altında", "Cat: nefes ver → sırtı yuvarlat, çeneyi göğse çek, pelvis içe döner", "Cow: nefes al → sırtı çukurlaştır, göğsü öne çık, kuyruğu kaldır", "Yavaş ve nefesle birlikte — 3-4 sn her pozisyon"], avoid:"Sadece boyun veya belden yapma — tüm omurga dalgalanmalı", warn:"SKOLYOZ: Her tekrarda sol-sağ simetriyi hisset", alts:[] },
          { name:"Shoulder CARs", sets:"2 × 5 (her taraf)", muscle:"Glenohumeral mobilite", how:["Tam daire — çok yavaş","Her yönde kontrol"], avoid:"Gövdeyi hareket ettirme", warn:null, alts:[] },
          { name:"Hip Hinge", sets:"2 × 10", muscle:"Hamstring, omurga farkındalığı", how:["Kalçayı geriye it","Sırt düz","Dizler hafif bükülü","Geri gel"], avoid:"Öne değil — geriye", warn:null, alts:[] },
          { name:"Cossack Squat", sets:"2 × 6 (her taraf)", muscle:"Kasık, adduktör, ayak bileği", how:["Geniş duruş","Bir tarafa otur — karşı bacak uzatılmış","Topuk yerde","Ağır ağır"], avoid:"Diz içe kapanmasın", warn:"DİZ: Ağrıda daha az range — zorlama", alts:["Side Lunge"] },
        ]},
        { name: "🤸 SKILL — Pull-up Geliştirme", color: "#2A9D8F", exercises: [
          { name:"Dead Hang", sets:"4 × 30sn", muscle:"Lat, grip, omurga dekompresyon", how:["Bardan iki elle asıl — overhand tutuş", "Omuzları aktif tut — kulağa doğru değil, aşağı çek", "Vücut sallanmasın — sakin kal", "Nefes al — omurgayı uzat — 20-30 sn tut"], avoid:"Tamamen pasif sarkmak — omuzlar aktif olmalı", warn:"Omurga dekompresyonu — disk arası mesafeyi açar, sırt ağrısına iyi gelir", alts:["Assisted Hang","Flexed Arm Hang"] },
          { name:"Scapula Pull Up", sets:"4 × 10", muscle:"Lat aktivasyon, scapula kontrol", how:["Bardan asıl","Sadece kürek kemikleri aşağı çek","Dirsek bükülmez"], avoid:"Dirsekleri bükme", warn:null, alts:[] },
          { name:"Chin-up Negative", sets:"4 × 5", muscle:"Biceps, lat — eccentric", how:["Üst pozisyondan başla","5 saniyede yavaşça in","Tam alta inince bırak"], avoid:"Hızlı düşme", warn:null, alts:["Assisted Chin Up","Band Pull Up"] },
          { name:"Assisted Pull Up", sets:"3 × 8", muscle:"Pull-up pattern — tam hareket", how:["Makine veya band yardımıyla","Tam aşağı — tam yukarı","Temiz form önce — ağırlık sonra"], avoid:"Kısmi range", warn:null, alts:["Band Pull Up","Lat Pulldown"] },
        ]},
        { name: "🤸 SKILL — Push-up & Dip Geliştirme", color: "#E76F51", exercises: [
          { name:"Pike Push Up", sets:"3 × 8", muscle:"Ön delt — overhead push skill", how:["Ters V pozisyonu — kalça yukarı","Başı yere doğru indir","Patlayıcı yukarı it — omuz hareketi"], avoid:"Kalçayı düşürme", warn:"Handstand push-up'a giden yol", alts:["Wall Pike Push Up"] },
          { name:"Dip Negative", sets:"3 × 5", muscle:"Triceps, alt göğüs — eccentric", how:["Üst pozisyondan başla","5 saniyede yavaşça in","Zıpla veya ayağa kalk — başa dön"], avoid:"Hızlı düşme — 5 sn şart", warn:null, alts:["Bench Dip Negative"] },
        ]},
        { name: "🤸 SKILL — L-sit & Core", color: "#8338EC", exercises: [
          { name:"Hollow Body Hold", sets:"4 × 20sn", muscle:"Anterior core zinciri", how:["Sırt üstü — kollar kulakların yanında","Bacaklar 45°","Bel yerde"], avoid:"Beli kaldırma", warn:null, alts:["Tuck Hold"] },
          { name:"Knee Tuck Hold", sets:"4 × 15sn", muscle:"Hip flexor, core, triceps basınç", how:["Parallel bar / sandalye","Dizleri göğse çek","Tutabildiğin kadar tut"], avoid:"Öne eğilme", warn:null, alts:["Hanging Knee Raise"] },
          { name:"Ab Wheel Rollout", sets:"3 × 8", muscle:"Core — full anterior zincir", how:["Diz üstünde başla","Tekerleği öne yuvarla — kontrollü","Geri çek — core sıkıştır"], avoid:"Beli sarkıtma", warn:null, alts:["Plank to Pike","TRX Pike"] },
        ]},
        { name: "🎯 CORE", color: "#6C63FF", exercises: [
          { name:"Side Plank Left", sets:"2 × 45sn", muscle:"Sol oblique", how:["Sol yanına yat — sol dirsek omuz altında tam dik", "Ayakları üst üste veya öne-arkaya aç", "Kalçayı yerden kaldır — omuzdan topuğa düz çizgi", "Üst kolu tavana uzan veya kalçaya koy — 30-45 sn tut"], avoid:"Kalçanın öne veya geriye sarkması", warn:"SKOLYOZ: Her iki tarafı eşit süre yap — lateral core dengesi kritik", alts:[] },
          { name:"Side Plank Right", sets:"2 × 45sn", muscle:"Sağ oblique", how:["Sağ yanına yat — sağ dirsek omuz altında", "Kalçayı yerden kaldır — düz çizgi", "Her iki taraf eşit süre — 30-45 sn", "Nefes almayı kesme"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Asla bir tarafı atlama", alts:[] },
          { name:"Copenhagen Plank Left", sets:"2 × 20sn", muscle:"Adduktör, core — lateral zincir", how:["Yana yat — üst ayak bench'te","Alt bacak havada — kaldır","20 sn tut"], avoid:"Kalçayı düşürme", warn:null, alts:["Side Plank"] },
          { name:"Copenhagen Plank Right", sets:"2 × 20sn", muscle:"Adduktör, core", how:["Her iki taraf eşit"], avoid:"Kalçayı düşürme", warn:null, alts:["Side Plank"] },
        ]},
        { name: "🔥 FİNİSHER", color: "#990000", exercises: [
          { name:"Jump Rope", sets:"3 × 60sn", muscle:"Koordinasyon, calf, kondisyon", how:["Hafif zıpla — ayak parmaklarına in","Bilek hareketi","60 sn tempo — 30 sn dinlen"], avoid:"Topukla inme", warn:null, alts:["Jumping Jacks","High Knees"] },
        ]},
        { name: "❄️ SOĞUMA — Full Body", color: "#8338EC", exercises: [
          { name:"Child's Pose", sets:"1 × 60sn", muscle:"Sırt, omuz, kalça", how:["Diz üstü otur, topuklarına otur", "Kolları öne uzat — yere koy", "Alnı yere koy veya mindere", "Tamamen bırak — pasif esneme — 45-60 sn"], avoid:"Zorla uzanma — yer çekimi işini yapsın", warn:"Diz ağrısı varsa topuklara oturmak yerine daha dik dur", alts:[] },
          { name:"Thread the Needle", sets:"1 × 30sn (her taraf)", muscle:"Torasik rotasyon", how:["Dört ayak — kolu alttan geçir"], avoid:null, warn:null, alts:[] },
          { name:"Hamstring, Obliques and Lat Stretch", sets:"2 × 45sn", muscle:"3 bölge", how:["Otur, bacağı uzat, öne eğil"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Right", sets:"1 × 45sn", muscle:"Torasik rotasyon, glute", how:["Sırt üstü yat — kollar yana T şeklinde açık", "Sağ dizi 90° büküp sol tarafa yatır", "Sağ omuz yerde kalsın — ters yöne bak", "45-60 sn tut — nefes alarak derinleştir"], avoid:"Omuzların yerden kalkmasına izin verme", warn:"SKOLYOZ: Her iki tarafa mutlaka eşit süre uygula", alts:[] },
          { name:"Supine Spinal Twist Left", sets:"1 × 45sn", muscle:"Her taraf eşit", how:["Sırt üstü yat — kollar yana T şeklinde açık", "Sol dizi 90° büküp sağ tarafa yatır", "Sol omuz yerde kalsın — ters yöne bak", "Her iki taraf eşit süre — 45-60 sn"], avoid:"Omuzların yerden kalkmasına izin verme", warn:"SKOLYOZ: Her iki tarafa mutlaka eşit süre uygula", alts:[] },
          { name:"Standing Half Forward Bend", sets:"1 × 45sn", muscle:"Hamstring, sırt alt", how:["Ayakta, öne eğil — dizler hafif bükülü","Elleri yere veya bacaklara"], avoid:null, warn:null, alts:[] },
        ]},
      ],
    },

    {
      id: 5, title: "OFF 1", sub: "PAZARTESİ", focus: "Recovery", duration: "~20 dk", color: "#6C757D",
      type: "offday",
      injury: null,
      blocks: [
        {
                "name": "🌿 RECOVERY MOBİLİTE — Ekipmansız",
                "color": "#6C757D",
                "exercises": [
                        {
                                "name": "Foam Roller Upper Back Roll",
                                "sets": "2 × 60sn",
                                "muscle": "Üst sırt, torasik mobilite",
                                "how": [
                                        "Foam roller'ı üst sırt T4-T8 hizasına yerleştir",
                                        "Kolları göğsün üzerinde çaprazla",
                                        "Yavaşça yuvarlan — ağrılı noktada 20-30 sn kal",
                                        "Nefes ver ve kası bırak"
                                ],
                                "avoid": "Bel omurları üzerinde yuvarlanma",
                                "warn": "KİFOZ: Torasik mobilite her sabah şart",
                                "alts": [
                                        "Sert kitap veya havlu rulosu ile"
                                ]
                        },
                        {
                                "name": "Cat and Cow",
                                "sets": "2 × 15",
                                "muscle": "Tüm omurga, torasik mobilite",
                                "how": [
                                        "Dört ayak — bilekler omuz altında",
                                        "Cat: nefes ver → sırtı yuvarlat, çeneyi göğse",
                                        "Cow: nefes al → sırtı çukurlaştır, göğsü öne",
                                        "3-4 sn her pozisyon — nefesle birlikte"
                                ],
                                "avoid": "Sadece boyun veya belden yapma",
                                "warn": "SKOLYOZ: Her tekrarda simetriyi hisset",
                                "alts": []
                        },
                        {
                                "name": "Child's Pose",
                                "sets": "2 × 60sn",
                                "muscle": "Sırt, omuz, kalça",
                                "how": [
                                        "Diz üstü otur, topuklarına otur",
                                        "Kolları öne uzat — yere koy",
                                        "Alnı yere koy",
                                        "Tamamen bırak — 60 sn"
                                ],
                                "avoid": "Zorla uzanma — yer çekimi işini yapsın",
                                "warn": "Diz ağrısı varsa daha dik dur",
                                "alts": []
                        },
                        {
                                "name": "Supine Spinal Twist Right",
                                "sets": "1 × 60sn",
                                "muscle": "Torasik rotasyon, glute, sırt",
                                "how": [
                                        "Sırt üstü — kollar yana T şeklinde",
                                        "Sağ dizi 90° büküp sol tarafa yatır",
                                        "Sağ omuz yerde — sola bak",
                                        "60 sn — nefesle derinleştir"
                                ],
                                "avoid": "Omuzların yerden kalkması",
                                "warn": "SKOLYOZ: Her iki tarafa eşit süre",
                                "alts": []
                        },
                        {
                                "name": "Supine Spinal Twist Left",
                                "sets": "1 × 60sn",
                                "muscle": "Her taraf eşit",
                                "how": [
                                        "Sol dizi 90° büküp sağ tarafa yatır",
                                        "Sol omuz yerde — sağa bak",
                                        "60 sn tut",
                                        "Her iki taraf eşit"
                                ],
                                "avoid": "Omuzların yerden kalkması",
                                "warn": "SKOLYOZ: Asla bir tarafı atlama",
                                "alts": []
                        },
                        {
                                "name": "Hug Knees to Chest",
                                "sets": "1 × 60sn",
                                "muscle": "Alt sırt, glute, arka zincir",
                                "how": [
                                        "Sırt üstü — iki dizi göğse çek",
                                        "Ellerle dizlerin arkasından sarıl",
                                        "Hafifçe sağa sola salla",
                                        "60 sn — sırtı masaj et"
                                ],
                                "avoid": "Boynu kaldırma",
                                "warn": "Pazar sonrası kas ağrısı için en iyi hareket",
                                "alts": []
                        },
                        {
                                "name": "Hip Flexor Stretch",
                                "sets": "2 × 45sn (her taraf)",
                                "muscle": "Hip flexor, kasık",
                                "how": [
                                        "Yarım diz — sağ diz yerde, sol ayak önde",
                                        "Kalçayı öne it — posterior tilt",
                                        "Gövde dik — 45 sn",
                                        "Her iki taraf"
                                ],
                                "avoid": "Gövdeyi öne eğme",
                                "warn": "Masa başı çalışıyorsan her gün şart",
                                "alts": [
                                        "Couch Stretch",
                                        "Lunge stretch"
                                ]
                        },
                        {
                                "name": "Diaphragmatic Breathing",
                                "sets": "2 × 10 nefes",
                                "muscle": "Diyafram, parasempatik sistem",
                                "how": [
                                        "Sırt üstü — bir el göğse, bir el karna",
                                        "Burndan 4 sn al — KARIN şişmeli",
                                        "2 sn tut",
                                        "Ağızdan 6 sn ver",
                                        "10 tekrar"
                                ],
                                "avoid": "Göğüs yükseltme",
                                "warn": "Kortizol düşürür, kas onarımını hızlandırır",
                                "alts": []
                        }
                ]
        }
],
    },

    {
      id: 6, title: "OFF 2", sub: "ÇARŞAMBA", focus: "Active Recovery", duration: "~25 dk", color: "#6C757D",
      type: "offday",
      injury: null,
      blocks: [
        {
                "name": "⚡ AKTİF RECOVERY — Ekipmansız",
                "color": "#6C757D",
                "exercises": [
                        {
                                "name": "Scapula Squeeze",
                                "sets": "3 × 15",
                                "muscle": "Rhomboid, orta trapez, postür kasları",
                                "how": [
                                        "Ayakta veya oturarak — dik duruş",
                                        "Kolları yana aç 90° veya yanında serbest",
                                        "Kürek kemiklerini birbirine sıkıştır",
                                        "2 sn sıkılı tut, bırak"
                                ],
                                "avoid": "Omuzları kulağa kaldırma",
                                "warn": "Band Pull Apart yerine — ekipmansız postür kası",
                                "alts": [
                                        "Prone Y squeeze",
                                        "Doorway Row"
                                ]
                        },
                        {
                                "name": "Incline Push Up",
                                "sets": "3 × 10",
                                "muscle": "Göğüs, triceps, serratus — hafif aktivasyon",
                                "how": [
                                        "Masa, tezgah veya duvara elleri koy",
                                        "Vücut düz çizgi — core sıkı",
                                        "3 sn yavaşça in",
                                        "Kontrollü it — patlayıcı değil"
                                ],
                                "avoid": "Beli sarkıtma",
                                "warn": "Off day push-up — kas yıkmaz, kan dolaşımını artırır",
                                "alts": [
                                        "Wall Push Up",
                                        "Knee Push Up"
                                ]
                        },
                        {
                                "name": "Wall Sit",
                                "sets": "3 × 30sn",
                                "muscle": "Quad, glute — izometrik",
                                "how": [
                                        "Sırt duvara tam daya",
                                        "Dizler 60-70° — derin squat değil",
                                        "Topuklar yerde — 30 sn",
                                        "Nefes almayı kesme"
                                ],
                                "avoid": "Diz 90° geçmesin",
                                "warn": "DİZ: İzometrik quad — ekleme stres yok",
                                "alts": []
                        },
                        {
                                "name": "Side-lying Hip Abduction Left",
                                "sets": "2 × 15",
                                "muscle": "Sol gluteus medius",
                                "how": [
                                        "Sol yan yat — vücut düz",
                                        "Üst bacağı 30-40° kaldır",
                                        "1 sn üstte, 3 sn indir",
                                        "Pelvis sabit"
                                ],
                                "avoid": "Pelvisin dönmesi",
                                "warn": "Gluteus medius zayıflığı diz ve bel ağrısının ana sebebi",
                                "alts": []
                        },
                        {
                                "name": "Side-lying Hip Abduction Right",
                                "sets": "2 × 15",
                                "muscle": "Sağ gluteus medius",
                                "how": [
                                        "Sağ yan yat",
                                        "Her iki taraf eşit tekrar",
                                        "Kontrollü hareket"
                                ],
                                "avoid": "Pelvisin dönmesi",
                                "warn": "Her iki taraf eşit çalıştır",
                                "alts": []
                        },
                        {
                                "name": "Dead Bug",
                                "sets": "3 × 10 (her taraf)",
                                "muscle": "Core stabilizasyon",
                                "how": [
                                        "Sırt üstü — kollar tavana, dizler 90°",
                                        "BEL YERDE — değişmemeli",
                                        "Sağ kol geri + sol bacak öne — yavaş",
                                        "Geri gel, diğer taraf"
                                ],
                                "avoid": "Beli yerden kaldırma",
                                "warn": "SKOLYOZ: En etkili lumbar stabilizasyon",
                                "alts": [
                                        "Bird Dog"
                                ]
                        },
                        {
                                "name": "Side Plank Left",
                                "sets": "2 × 30sn",
                                "muscle": "Sol oblique",
                                "how": [
                                        "Sol dirsek omuz altında",
                                        "Kalça yukarı — düz çizgi",
                                        "30 sn tut"
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
                                        "Her iki taraf eşit süre"
                                ],
                                "avoid": "Kalça sarkmasın",
                                "warn": "SKOLYOZ: Asla bir tarafı atlama",
                                "alts": []
                        },
                        {
                                "name": "Chin Tuck",
                                "sets": "3 × 15",
                                "muscle": "Derin boyun fleksörleri",
                                "how": [
                                        "Sandalyede dik otur",
                                        "Çeneni geriye it — çift çene",
                                        "2 sn tut, bırak"
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
      id: 7, title: "OFF 3", sub: "CUMA", focus: "Activation Prep", duration: "~15 dk", color: "#6C757D",
      type: "offday",
      injury: null,
      blocks: [
        {
                "name": "🔋 CUMARTESİ HAZİRLIĞI — Ekipmansız",
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
                                "warn": "Cumartesi Lower günü öncesi akşam yap — performansı artırır",
                                "alts": []
                        },
                        {
                                "name": "Floor Bridge",
                                "sets": "3 × 20",
                                "muscle": "Glute aktivasyon, hamstring",
                                "how": [
                                        "Sırt üstü — dizler bükülü, topuklar yerde",
                                        "Topuklarla bas, kalçayı kaldır",
                                        "1 sn üstte sıkıştır",
                                        "2 sn indir"
                                ],
                                "avoid": "Beli aşırı kaldırma",
                                "warn": "Cumartesi glute hareketleri için pre-aktivasyon",
                                "alts": [
                                        "Single Leg Glute Bridge"
                                ]
                        },
                        {
                                "name": "Prone Cobra",
                                "sets": "3 × 20sn",
                                "muscle": "Sırt ekstansörleri, arka omuz, postür",
                                "how": [
                                        "Yüzüstü yat — kollar yanında",
                                        "Göğsü yerden kaldır — sadece sırt kaslarıyla",
                                        "Kürek kemiklerini birleştir, omuzları aşağı çek",
                                        "20 sn tut — nefes al"
                                ],
                                "avoid": "Kollarla itmek — sırt kasları kaldırmalı",
                                "warn": "KİFOZ: Öne kapanmaya karşı en etkili postür hareketi",
                                "alts": [
                                        "Superman Hold"
                                ]
                        },
                        {
                                "name": "Side-lying Hip Abduction Left",
                                "sets": "2 × 15",
                                "muscle": "Sol gluteus medius",
                                "how": [
                                        "Sol yan yat",
                                        "Sol bacağı yavaşça 30-40° kaldır",
                                        "1 sn üstte, 3 sn indir",
                                        "Pelvis sabit"
                                ],
                                "avoid": "Pelvisin dönmesi",
                                "warn": "Cumartesi Lower günü için glute med aktivasyonu",
                                "alts": []
                        },
                        {
                                "name": "Side-lying Hip Abduction Right",
                                "sets": "2 × 15",
                                "muscle": "Sağ gluteus medius",
                                "how": [
                                        "Sağ yan yat",
                                        "Her iki taraf eşit"
                                ],
                                "avoid": "Pelvisin dönmesi",
                                "warn": "Her iki taraf eşit",
                                "alts": []
                        },
                        {
                                "name": "Ankle Circle",
                                "sets": "2 × 10 (her yön)",
                                "muscle": "Ayak bileği mobilite",
                                "how": [
                                        "Otur — bir ayağı kaldır",
                                        "10 saat yönünde, 10 ters daire",
                                        "Her iki ayak — yavaş ve kontrollü"
                                ],
                                "avoid": "Dizden yapmaya çalışma",
                                "warn": "Menisküs için ayak bileği mobilitesi kritik",
                                "alts": []
                        },
                        {
                                "name": "Cat and Cow",
                                "sets": "2 × 10",
                                "muscle": "Omurga mobilite, Lower gün hazırlık",
                                "how": [
                                        "Dört ayak — nefesle birlikte",
                                        "Cat-Cow — 3-4 sn her pozisyon",
                                        "Yavaş — sırtı ısıt"
                                ],
                                "avoid": "Aceleyle yapma",
                                "warn": "Cumartesi Lower günü öncesi omurga hazırlığı",
                                "alts": []
                        }
                ]
        }
],
    },
  ],
};
