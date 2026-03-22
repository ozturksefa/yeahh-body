export const PROGRAM = {
  guide: {
    phase: "1. Dönem — Vücudu Hazırlama",
    weeks: "Hafta 1–8",
    restRules: [
      { block: "Isınma / Postür", rest: "15–30 sn", note: "Hareketler arası kısa mola yeter" },
      { block: "Esneme / Hazırlık", rest: "30–45 sn", note: "Kasların uyanması için bekle" },
      { block: "Ana hareketler (ağır)", rest: "2–3 dk", note: "Squat, Deadlift, Pull Up gibi çok kas çalıştıranlar" },
      { block: "Yardımcı hareketler (hafif)", rest: "60–90 sn", note: "Curl, Raise gibi tek kas çalıştıranlar" },
      { block: "Vücut ağırlığı", rest: "60–90 sn", note: "Push Up, Diamond, Pike" },
      { block: "Bitirici (kondisyon)", rest: "45–60 sn", note: "Rowing, KB Swing, İp atlama" },
      { block: "Soğuma / Germe", rest: "Yok", note: "Mola vermeden akıcı geç, nefesine odaklan" },
    ],
    rpeGuide: [
      { category: "Hazırlık hareketleri", rpe: "10 üzerinden 5–6", desc: "Rahat yapabilmelisin, zorlanma yok" },
      { category: "Ana hareketler (ağır)", rpe: "10 üzerinden 7–8", desc: "Son 2–3 tekrar zor ama duruşun bozulmasın" },
      { category: "Yardımcı hareketler", rpe: "10 üzerinden 8–9", desc: "Son 1–2 tekrar çok zor, duruş sınırda" },
      { category: "Vücut ağırlığı", rpe: "10 üzerinden 8–9", desc: "Duruşun bozulduğu tekrarda seti bitir" },
      { category: "Bitirici", rpe: "10 üzerinden 7–8", desc: "Nefes nefese ama devam edebiliyorsun" },
    ],
    tempo: "Ağırlığı 2 saniyede indir, 1 saniye tut, 1 saniyede kaldır. Rehab hareketlerinde 3 saniyede indir, 2 saniye tut, 1 saniyede kaldır. YAVAŞ indirmek kasları daha çok geliştirir ve eklemleri korur.",
    progression: [
      "Yazdığı tekrar sayısını tüm setlerde tamamlayabiliyorsan → sonraki hafta üst vücut +2.5kg, alt vücut +5kg ekle",
      "Vücut ağırlığı hareketleri: Tekrar hedefini tamamlayınca zorunu yap (Push Up → Diamond → Pike → Amuda Kalkma)",
      "Tamamlayamıyorsan ağırlığı DEĞİŞTİRME — aynı haftayı tekrarla, sorun yok",
      "Tedavi/hazırlık hareketlerinde ağırlık artırma — hareketi ne kadar düzgün yaptığını geliştir",
    ],
    supersets: [
      { a: "Incline Dumbbell Press", b: "45° Incline Row", note: "Gün 1 — zaman kazanmak için: göğüs yaptıktan sonra dinlenmek yerine sırt yap, sonra dinlen" },
      { a: "Hammer Curl", b: "Triceps Extension", note: "Gün 3 — ön kol bittikten sonra hemen arka kol yap" },
      { a: "Goblet Squat", b: "Leg Curl", note: "Gün 2 — ön bacak bittikten sonra hemen arka bacak yap" },
      { a: "Deadlift", b: "Reverse Lunge", note: "Gün 4 — kalça bittikten sonra hemen bacak yap" },
    ],
    offDays: {
      title: "Antrenman Olmayan Günler (Pazartesi / Çarşamba / Cuma)",
      activities: [
        "20–30 dk yürüyüş (rahat tempo, koşmak değil sadece yürümek)",
        "10 dk foam roller ile tüm vücudu ov (kas gevşetme)",
        "5 dk postür rutini (Chin Tuck + Band Pull Apart + Foam Roller — programın başındaki 3 hareket)",
        "İstersen: 15 dk hafif yüzme veya bisiklet (zorlanmadan)",
      ],
      avoid: "Ağır kaldırma, sprint, halı saha / basketbol (dizine kötü, menisküs riski)",
    },
    deload: {
      frequency: "Her 4 haftada bir (Hafta 4, Hafta 8)",
      rules: [
        "Tüm ağırlıkları YARIYA düşür (12kg → 6kg)",
        "Set sayılarını da yarıya indir (4 set → 2 set)",
        "Isınma + esneme + soğuma AYNI kalır (onları kısma)",
        "Çok rahat hissetmelisin — zorluk 10 üzerinden 4–5",
        "Bu hafta tembellenmek değil — vücudun onarım haftası, kaslar bu haftada büyür",
      ],
    },
    phaseTransition: {
      title: "2. Döneme Geçiş Testi (Hafta 8 Sonu)",
      tests: [
        { name: "Push Up", pass: "3 set × 15 tekrar (kalça düşmeden)", current: "Şu an: 3 × 12" },
        { name: "Assisted Pull Up", pass: "4 set × 8 tekrar (makinede %30 destek)", current: "Şu an: 4 × 6 (%40-50 destek)" },
        { name: "Goblet Squat", pass: "4 set × 12 tekrar (vücut ağırlığının %40'ı)", current: "Şu an: 4 × 8" },
        { name: "Dead Bug", pass: "3 set × 15 tekrar (bel yerde kalacak)", current: "Şu an: 3 × 12" },
        { name: "Plank", pass: "60 saniye düz durabilmek", current: "Test günü ölçülecek" },
      ],
      nextPhase: "2. Dönemde: Ağırlıklar artacak, yardımsız Pull Up çalışması başlayacak, Dip hareketi eklenecek, amuda kalkma hedefi başlayacak",
    },
    weeklyCardio: "Haftada en az 60 dakika yürüyüş/bisiklet yap (antrenman dışı günlerde). Hedef: Hafta 4'te 90 dakikaya çıkarmak. Koşmak ŞART DEĞİL — yürüyüş yeter.",
  },
  days: [
    {
      id: 1, title: "GÜN 1", sub: "SALI", focus: "Upper Back Dominant", duration: "~70 dk", color: "#FF6B35",
      injury: "⚠️ Sağ omuz rotator cuff — external/internal rotation hareketlerinde keskin ağrıda dur",
      blocks: [
        { name: "🔥 ISINMA A — Postür Rutini", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri, ense", how:["Ayakta veya oturarak dik dur","Çeneni geri doğru it — ikinci çene yapıyormuş gibi","2 saniye tut, yavaşça bırak"], avoid:"Başı aşağı eğme — sadece geri it", warn:null, alts:["Wall Chin Tuck","Supine Chin Tuck","Cervical Retraction w/ Band"] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid", how:["Bandı iki elle omuz hizasında önde tut","Bandı göğsüne doğru çek, eller yanlara açılır","1 saniye tut, kontrollü geri gel"], avoid:"Omuzları kulağa kaldırma — sırt kasılmalı", warn:null, alts:["Cable Reverse Fly","Face Pull (hafif)","Prone Y-T-W"] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt, thoracic açılım", how:["Foam roller kürek kemikleri hizasında","Kalçayı hafif kaldır","Geriye yavaşça uzan — göğüs kafesini aç","Her pozisyonda 2-3 sn kal"], avoid:"Bel üzerinde yapma — sadece üst sırt", warn:"KİFOZ İÇİN KRİTİK — ASLA atlama", alts:["Bench Thoracic Extension","Prayer Pose on Bench","Doorway Chest Stretch"] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor, kasık", how:["Sol diz yerde, sağ ayak önde 90°","Kalçayı öne doğru it","Pelvisini aşağı bastır — posterior tilt","30 sn tut, taraf değiştir"], avoid:"Gövdeyi öne eğme — gerilme azalır", warn:null, alts:["Half Kneeling Hip Flexor Stretch with Rotation (MAC+)","Couch Stretch","Standing Hip Flexor Stretch"] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça iç/dış rotatorları, groin", how:["Sırt üstü yat, dizler bükülü","Dizi yana yatır — dize yük yok","10 sn tut, geri gel","Yavaş ve kontrollü"], avoid:"Ağrı hissedersen daha az range", warn:"DİZ SAKATLIGI nedeniyle Deep Sumo Squat kaldırıldı", alts:["Hip Stretch Left/Right","90/90 Hip Stretch","Frog Pose (yatarak)"] },
        ]},
        { name: "🔥 ISINMA B — Güne Özel (Omuz & Bilek)", color: "#CC5500", exercises: [
          { name:"Dumbbell Seated Neutral Wrist", sets:"2 × 10", muscle:"Bilek eklemi ısınması", how:["Bankta otur, hafif dumbbell önkolda","Bileği yavaşça yukarı kıvır","Kontrollü aşağı indir"], avoid:null, warn:null, alts:["Wrist Circles","Dumbbell Wrist Curl Left/Right","Wrist Flexion & Extension"] },
          { name:"Shoulder Dislocates", sets:"2 × 10", muscle:"Rotator cuff, omuz kapsülü", how:["Direniş bandını geniş tut, kollar önde","Kolları başın üzerinden arkaya tam ark çiz","Ağrısız aralıkta çalış — band geniş tutulursa kolay"], avoid:"Sertse zorla geçirme — durduğun noktada kal", warn:"Sağ omuzda keskin ağrı olursa açılımı daralt", alts:["Single Arm Circles Left/Right (MAC+)","Doorway Stretch","Cross-body Shoulder Stretch"] },
        ]},
        { name: "🌀 MOBİLİTE", color: "#2A9D8F", exercises: [
          { name:"Cat and Cow", sets:"2 × 10", muscle:"Tüm omurga fleksiyon/ekstansiyon", how:["Dört ayak pozisyonu","COW: Nefes alırken göbeği yere bırak, baş yukarı","CAT: Nefes verirken sırtı tavana yuvarla, baş aşağı","Her geçiş 2 saniye — acele etme"], avoid:"Hızlı yapma", warn:null, alts:["Child's Pose to Cobra Pose (MAC+)","Quadruped Thoracic Rotation","Seated Thoracic Flex/Ext"] },
          { name:"Prayer Pose on Bench with Roller", sets:"2 × 10", muscle:"Üst sırt, lat, omuz açılımı", how:["Diz üstü, foam roller veya bench önünde","Kalçayı topuklara doğru it","Göğsü yere/banka doğru bırak","Her tekrarda biraz daha uzanmaya çalış"], avoid:"Bel bölgesini zorlaştırma", warn:"Thoracic extension için kritik", alts:["Foam Roller Upper Back Roll","Bench Thoracic Extension","Latissimus Stretch Assisted"] },
        ]},
        { name: "⚡ AKTİVASYON", color: "#FF6B35", exercises: [
          { name:"Arms External Rotation Left", sets:"2 × 15", muscle:"Sol arka omuz, infraspinatus", how:["Bandı dirsek hizasında sabitle","Sol dirsek 90°, vücuda yapışık","Önkolu dışa döndür — kapı açar gibi","Kontrollü geri gel"], avoid:"Gövdeyi döndürme", warn:null, alts:["Cable External Rotation","Side-lying External Rotation","90/90 External Rotation"] },
          { name:"Arms External Rotation Right", sets:"2 × 15", muscle:"Sağ arka omuz, infraspinatus", how:["En hafif bandı seç","Sağ dirsek 90°, vücuda yapışık","Önkolu dışa döndür","Kontrollü geri gel"], avoid:"Gövdeyi döndürme", warn:"ROTATOR CUFF YIRTIK SAĞDA — ağrıda ANINDA dur", alts:["Cable External Rotation","Side-lying External Rotation","90/90 External Rotation"] },
          { name:"Arms Internal Rotation Left", sets:"2 × 15", muscle:"Sol ön omuz, subscapularis", how:["Bandı dirsek hizasında sabitle","Sol dirsek 90°, vücuda yapışık","Önkolu içe döndür — karın tarafına","Kontrollü geri gel"], avoid:"Gövdeyi döndürme", warn:"External rotation ile dengeli çalışılmalı", alts:["Cable Internal Rotation","Prone Internal Rotation","IR with Towel Roll"] },
          { name:"Arms Internal Rotation Right", sets:"2 × 15", muscle:"Sağ ön omuz, subscapularis", how:["Çok hafif band — external ile aynı","Sağ dirsek 90°","Önkolu içe döndür","Kontrollü geri gel"], avoid:"Gövdeyi döndürme", warn:"Sağ omuz yırtık — ağrıda dur", alts:["Cable Internal Rotation","Prone Internal Rotation","IR with Towel Roll"] },
          { name:"Straight Arm Pulldown", sets:"2 × 8", muscle:"Lat kasları (sırt yanı)", how:["Kablo makinesi yüksek pozisyon","Ayakta dik, kollar uzanmış önde","Kolları düz tut — dirsek bükülmeyecek","Kabloyu kalça hizasına aşağı çek"], avoid:"Dirsekleri bükme", warn:"Pull-up mekanizmasını vücuda öğretmek için kritik", alts:["Band Straight Arm Pulldown","Scapula Pull Up","Lat Foam Roll"] },
          { name:"Scapula Push Up", sets:"2 × 10", muscle:"Serratus anterior", how:["Push-up pozisyonu, kollar tam uzanmış","Kürek kemiklerini aç (protract) — sırtını tavana it","Kürek kemiklerini birleştir (retract)","Kollar hep düz — dirsek bükme"], avoid:"Dirsekleri bükme — bu push-up değil", warn:"Scapular winging'i düzeltir — postür için hayati", alts:["Wall Serratus Slide","Bear Crawl Hold","Plank Serratus Reach"] },
        ]},
        { name: "🏋️ KUVVET", color: "#1A1A2E", exercises: [
          { name:"Assisted Pull Up", sets:"4 × 6", muscle:"Lat, üst sırt, biceps", how:["Makineye gir — vücudunun %40-50'si kadar destek","ÖNCE: Kürek kemiklerini aşağı çek","SONRA: Dirsekleri aşağı-arkaya çekerek çeni bara getir","Kontrollü in — 3 saniye say"], avoid:"Omuzları kulağa çekme — aşağıda kalmalı", warn:null, alts:["Lat Pulldown","Negative Pull Up","Ring Row"] },
          { name:"45 Degree Incline Row (Single Arm)", sets:"3 × 10 (her taraf)", muscle:"Mid-back, rhomboid, rear delt", how:["45° incline bench'e bir elle ve diz ile dayan","Kürek kemiğini birleştirerek ağırlığı yukarı çek","Dirsek vücuda yakın, geriye doğru","Her sette önce zayıf taraf"], avoid:"Vücudu kaldırma — destek kolu ve diz bankta sabit", warn:"TEK TARAFLI ZORUNLU — skolyoz asimetrisini giderir", alts:["Seated Cable Row (Single Arm)","Chest Supported Row","Dumbbell Row (MAC+)"] },
          { name:"Incline Dumbbell Press", sets:"3 × 8", muscle:"Göğüs üst kısım, ön omuz, triceps", how:["Bench 30-45°, sırt tamamen pade yaslanmış","Dumbbellları omuz hizasında başlat","Yukarı it — tepe noktada hafif içe döndür","Kontrollü indir — dirsekler 45° açıda"], avoid:"Dirsekleri tam dışa açma — rotator cuff yüklenir", warn:"Sağ omuzda keskin ağrı olursa dur", alts:["Landmine Press","Cable Chest Press","Elevated Push Up"] },
          { name:"Face Pull", sets:"3 × 15", muscle:"Rear delt, rhomboid, üst sırt", how:["Cable makinesi göz hizasında, rope attachment","Rope'u yüzüne doğru çek — eller kulaklara","Dirsekler omuz hizasında veya biraz üstünde","1 sn tut, kontrollü bırak"], avoid:"Dirsekleri aşağı düşürme", warn:"Pressing hareketlerin dengesi — ASLA atlama", alts:["Band Pull Apart","Reverse Fly (DB)","High Cable Rear Delt Row"] },
          { name:"Incline Dumbbell Curl", sets:"3 × 12", muscle:"Biceps uzun baş", how:["İncline bankta otur, sırt tam yaslanmış","Dirsek tam uzanmış — tam ROM için kritik","Dumbbellı yukarı kıvır, 1 sn sıkıştır","Tam aşağı indir"], avoid:"Sallama, momentum kullanma", warn:null, alts:["Incline Dumbbell Hammer Curl (MAC+)","Cable Curl","Chin Up"] },
        ]},
        { name: "🤸 CALİSTHENİCS", color: "#CC8800", exercises: [
          { name:"Push Up", sets:"3 × 12", muscle:"Göğüs, ön omuz, triceps", how:["Eller omuzdan biraz geniş, baştan topuğa düz çizgi","Göğüs yere değene kadar in","Dirsekler 45° — dışa değil","KAÇINCI TEKRARDA FORM BOZULDU? SAY VE BİLDİR"], avoid:"Kalça kalkarsa veya bel çöküyorsa — o set bitti", warn:null, alts:["Diamond Push Up","Wide Push Up","Archer Push Up"] },
          { name:"Captains Chair Bent Knee Raise", sets:"3 × 12", muscle:"Karın alt kısım", how:["Captain's Chair — kollar yanal desteklerde","Omuzlar aşağı ve geriye — stabilize","Dizleri göğse doğru çek","Kontrollü indir — tam aşağı"], avoid:"Sallanarak yapmak", warn:"Omuz üzerinde asılı yük yok — hanging'den daha güvenli", alts:["Lying Leg Raise","Ab Wheel Rollout","Hanging Knee Raise (omuz iyileşince)"] },
        ]},
        { name: "🔥 METABOLİK FİNİSHER", color: "#990000", exercises: [
          { name:"Rowing Machine", sets:"3 × 1 dk", muscle:"Tüm vücut kardiyovasküler", how:["Güçlü itmeden başla — bacaklar önce iter","Gövde hafif geriye yatarken kolları çek","Kontrollü geri gel — kollar uzanır, gövde öne, bacaklar büküler","1 dk tutarlı tempo. Set arası 45 sn dinlen."], avoid:"Sadece kollarla çekme — güç bacaklardan gelir", warn:null, alts:["Ski Erg","Battle Rope 30sn","Assault Bike"] },
        ]},
        { name: "❄️ SOĞUMA", color: "#2A9D8F", exercises: [
          { name:"Above Head Chest Stretch", sets:"2 × 45sn", muscle:"Göğüs, ön omuz", how:["Eller ensende, dirsekler dışa açılmış","Göğsü öne aç — derin nefes al"], avoid:null, warn:null, alts:[] },
          { name:"Chair Lat Stretch", sets:"2 × 45sn", muscle:"Lat, üst sırt", how:["Bench önünde diz üstü","Kollar öne uzatılmış, kalçayı geriye it"], avoid:null, warn:null, alts:[] },
          { name:"Shoulder Stretch Behind Back", sets:"2 × 45sn", muscle:"Arka omuz, iç rotasyon kasları", how:["Eller arkada birbirine kavuşmuş","Dirsekler birbirine yaklaşıyor"], avoid:null, warn:null, alts:[] },
          { name:"Childs Pose to Cobra Pose", sets:"2 × 45sn", muscle:"Lat, üst sırt, ön omuz — kapanış", how:["Child's pose'dan yavaşça cobra'ya geç","Geri dön — akıcı hareket"], avoid:null, warn:null, alts:[] },
          { name:"Neck Side Stretch", sets:"2 × 30sn (her taraf)", muscle:"Boyun yan kasları, levator scapulae", how:["Başını yana eğ — kulak omuza yaklaşır","Karşı elle hafif bastır","Omuzları aşağıda tut","30 sn tut, taraf değiştir"], avoid:"Omzu kulağa kaldırma", warn:"Masa başı çalışanlar için kritik — boyun gerginliğini azaltır", alts:["Chin Tuck","SCM Stretch","Upper Trap Stretch"] },
          { name:"Dynamic Chest Stretch", sets:"2 × 30sn", muscle:"Göğüs, ön omuz — kifoz düzeltme", how:["Ayakta, kolları yana aç","Göğsü öne aç, kürek kemiklerini birleştir","Kolları geriye çek — derin nefes al","Yavaşça bırak, tekrarla"], avoid:"Omuzları öne düşürme", warn:"KİFOZ İÇİN KRİTİK — göğüs açılımı postür düzeltmenin temelidir", alts:["Doorway Stretch","Wall Chest Stretch","Foam Roller Chest Opener"] },
          { name:"Wrist Pull Stretch", sets:"2 × 30sn (her taraf)", muscle:"Bilek fleksörleri, önkol", how:["Bir kolunu öne uzat, avuç yukarı","Diğer elle parmakları geriye çek","Gerginlik hissedene kadar tut","Taraf değiştir"], avoid:"Aşırı zorlamak — hafif gerilme yeterli", warn:"Kod yazan / masa başı çalışanlar için bilek sağlığı kritik", alts:["Wrist Circles","Prayer Stretch","Reverse Prayer Stretch"] },
        ]},
      ]
    },
    {
      id: 2, title: "GÜN 2", sub: "PERŞEMBE", focus: "Lower Strength", duration: "~70 dk", color: "#2A9D8F",
      injury: "⚠️ AKTİF DİZ SAKATLIĞI — Lateral ağrı + merdiven ağrısı. Program revize edildi. Derin fleksiyon, patlayıcı hareket ve tek bacak yük YOK. Şikayet devam ederse doktora git.",
      blocks: [
        { name: "🔥 ISINMA A — Postür Rutini", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Dik dur","Çeneni geri it","2 sn tut"], avoid:"Başı aşağı eğme", warn:null, alts:["Wall Chin Tuck","Supine Chin Tuck","Cervical Retraction w/ Band"] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid", how:["Bandı önde tut","Yanlara açarak çek","1 sn tut"], avoid:"Omuzları kulağa kaldırma", warn:null, alts:["Cable Reverse Fly","Face Pull (hafif)","Prone Y-T-W"] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt", how:["Kürek kemikleri hizasında","Geriye uzan, göğüsü aç"], avoid:"Bel üzerinde yapma", warn:"KİFOZ İÇİN KRİTİK — ASLA atlama", alts:["Bench Thoracic Extension","Prayer Pose on Bench","Doorway Chest Stretch"] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor, kasık", how:["Diz yerde, kalçayı öne it","Pelvis aşağı","Gövde dik"], avoid:"Gövdeyi öne eğme", warn:null, alts:["Half Kneeling Hip Flexor Stretch with Rotation (MAC+)","Couch Stretch","Standing Hip Flexor Stretch"] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça iç/dış rotatorları, groin", how:["Sırt üstü yat, dizler bükülü","Dizi yana yatır — dize yük yok","10 sn tut, geri gel","Yavaş ve kontrollü"], avoid:"Ağrı hissedersen daha az range", warn:"DİZ SAKATLIGI: Deep Sumo Squat kaldırıldı — derin fleksiyon yok", alts:["Hip Stretch Left/Right","90/90 Hip Stretch","Frog Pose (yatarak)"] },
        ]},
        { name: "🔥 ISINMA B — Güne Özel (Kalça & Diz & Ayak Bileği)", color: "#CC5500", exercises: [
          { name:"One Leg Straight Stretch", sets:"2 × 10 (her taraf)", muscle:"Hamstring dinamik açılım", how:["Yana yat veya sırt üstü","Uzatılan bacağı yukarı kaldır","Dizi hafif bükük olabilir","Kontrollü indir"], avoid:"Dizleri kilitleyerek zorlaştırma", warn:null, alts:["Supine Hamstring Stretch","Standing Leg Swing","Lying Hamstring Stretch w/ Band"] },
          { name:"One Leg Hip Abduction Right", sets:"2 × 10", muscle:"Sağ kalça dış rotatorları", how:["Ayakta dik, sol elle tutun","Sağ bacağı yana kaldır","Kontrollü geri indir"], avoid:"Belini yana eğme", warn:null, alts:["Side-lying Hip Abduction","Prone Hip Circles (MAC+)","Monster Walk"] },
          { name:"One Leg Hip Abduction Left", sets:"2 × 10", muscle:"Sol kalça dış rotatorları", how:["Ayakta dik, sağ elle tutun","Sol bacağı yana kaldır","Kontrollü geri indir"], avoid:"Belini yana eğme", warn:null, alts:["Side-lying Hip Abduction","Prone Hip Circles (MAC+)","Monster Walk"] },
          { name:"Hip Stretch Left", sets:"2 × 10", muscle:"Sol kalça iç rotasyon, groin", how:["Sırt üstü yat","Sol dizi büküp göğse çek","Hafifçe yana doğru yatır","10 sn tut"], avoid:null, warn:null, alts:["Hip Stretch Right","90/90 Hip Stretch","Pigeon Pose"] },
          { name:"Kettlebell Ankle Static Stretch", sets:"2 × 10 (her taraf)", muscle:"Ayak bileği mobilitesi", how:["Kettlebell ayak sırtında","Dizi öne it — ayak parmak ucuna doğru","Topuk yerde kalacak","Geri gel"], avoid:"Topuğu yerden kaldırma", warn:"Menisküs için ayak bileği mobilitesi kritik", alts:["Ankle Mobility (duvara karşı)","Banded Ankle Distraction","Single Leg Calf Raise"] },
        ]},
        { name: "⚡ AKTİVASYON", color: "#FF6B35", exercises: [
          { name:"Floor Bridge", sets:"3 × 15", muscle:"Glute, hamstring", how:["Sırt üstü yat, dizler bükülü","Kalçayı yukarı kaldır","1 sn sıkıştır","Kontrollü indir"], avoid:"Beli zorlaştırma — glute çalışmalı", warn:null, alts:["Banded Glute Bridge","Single Leg Glute Bridge","Glute Bridge Hamstring Walk (MAC+)"] },
          { name:"Cable Hip Abduction", sets:"3 × 12 (her taraf)", muscle:"Gluteus medius, TFL", how:["Kablo makinesi en alta — kayış ayak bileğine","Makineye yan dur","Bacağı yana doğru kaldır — omuz hizasını geçme","Kontrollü geri indir"], avoid:"Gövdeyi yana eğme — sadece bacak hareket eder", warn:"MENİSKÜS STABİLİTESİ için izole hip abduction zorunlu — asla atlama", alts:["One Leg Hip Abduction (MAC+)","Side-lying Hip Abduction","Band Hip Abduction"] },
          { name:"Seated Leg Extension with Band", sets:"2 × 12", muscle:"Vastus medialis (diz önü)", how:["Sandalyeye otur, band ayak bileğinde","Dizi tam düzeltmeye doğru it","1 sn tut","Kontrollü geri bük — yavaş"], avoid:"Hızlı yapma — yavaş ve kontrollü", warn:"TKE alternatifi — MENİSKÜS REHAB için birinci öncelik, ASLA atlama", alts:["Leg Extension Machine (hafif)","Quad Set","VMO Squat"] },
        ]},
        { name: "🏋️ KUVVET", color: "#1A1A2E", exercises: [
          { name:"Wall Sit", sets:"4 × 30sn", muscle:"Quad, glute — izometrik", how:["Sırtı duvara daya","Dizler 60-70° — TAM 90° DEĞIL","Ayaklar omuz genişliğinde","30 sn tut — nefes kesme"], avoid:"Diz 90° geçmesin — ağrı çıkarsa daha yüksekte dur", warn:"DİZ SAKATLIGI: Goblet Squat kaldırıldı. Statik yük dize kontrollü uyum sağlatır", alts:["Terminal Knee Extension","Leg Press (sığ range)","Quad Set"] },
          { name:"Dumbbell Romanian Deadlift", sets:"3 × 10", muscle:"Hamstring, glute", how:["Dizler hafif bükülü — sabit kalacak","Kalçayı geriye it","Dumbbellları bacak boyunca indir","Hamstrings'de gerilme hissedince dur"], avoid:"Omurgayı büküp öne eğilme — düz tutacaksın", warn:"SKOLYOZ — her sette omurga nötrali kontrol et", alts:["Single Leg RDL","Cable Pull Through","Good Morning (hafif)"] },
          { name:"Leg Press", sets:"3 × 12", muscle:"Quad, glute", how:["Sırt tamamen padeye yaslanmış","Ayaklar platform ortasında","Kontrollü aşağı in — diz 90°","Topuklarla it, yukarı çık"], avoid:"Dizleri tam kilitleyerek yukarıda bırakma", warn:"Menisküs için en güvenli quad hareketi", alts:["Hack Squat","Dumbbell Goblet Squat","Smith Machine Squat"] },
          { name:"Single Leg Glute Bridge (Sağ)", sets:"3 × 12", muscle:"Sağ glute, hamstring", how:["Sırt üstü yat","Sol bacağı düz uzat, sağ dizi büküp ayağı yere bas","Sağ ayakla kalçayı yukarı it","1 sn sıkıştır — kontrollü indir"], avoid:"Kalçayı gövdeyle aynı anda indirme", warn:"DİZ SAKATLIGI: Step Up kaldırıldı. Sağ dize yük bindirmeden glute izolasyonu", alts:["Floor Bridge (bilateral)","Hip Thrust (hafif)","Glute Bridge Hamstring Walk"] },
          { name:"Hip Thrust", sets:"3 × 10", muscle:"Glute maksimum izolasyon", how:["Sırtını bench'e daya","Dumbbell kalça üzerinde","Patlayıcı yukarı it","Tepe noktada 1 sn sıkıştır"], avoid:"Beli aşırı hiperextend etme", warn:null, alts:["One Leg Hip Thrust Right/Left (MAC+)","Banded Hip Thrust","Glute Bridge Hamstring Walk"] },
          { name:"Machine Seated Leg Curl", sets:"3 × 12", muscle:"Hamstring", how:["Oturarak","Diz hizası pivot noktasıyla aynı","Kontrollü yukarı kıvır","3 saniyede yavaşça indir"], avoid:"Kalçayı kaldırma", warn:null, alts:["Machine Lying Leg Curl","Nordic Hamstring Curl","Swiss Ball Hamstring Curl"] },
        ]},
        { name: "🎯 CORE", color: "#6C63FF", exercises: [
          { name:"Dead Bug", sets:"3 × 12", muscle:"Karın kasları, core stabilizasyon", how:["Sırt üstü — kollar tavana, dizler 90° yukarda","Sağ kolu geri + sol bacağı aynı anda uzat","BEL YERDE KALACAK — en önemli kural","Geri gel, diğer taraf"], avoid:"Beli yerden kaldırma", warn:null, alts:["Bird Dog","Hollow Body Hold","Pallof Press"] },
          { name:"Side Plank Leg Raise Left", sets:"2 × 45sn", muscle:"Sol yan karın, kalça abduktör", how:["Yana yat — sol altta, dirsek omuz altında","Kalçayı yerden kaldır","Vücut düz çizgi","Üst bacağı yukarı kaldır ve tut"], avoid:"Kalça öne veya geriye sarkmasın", warn:"Araştırmalar skolyoz için spinal kurvu azalttığını gösteriyor — ASLA atlama", alts:["Side Plank One Leg Slide Left (MAC+)","Side Plank Hip Dip","Copenhagen Plank"] },
          { name:"Side Plank Leg Raise Right", sets:"2 × 45sn", muscle:"Sağ yan karın, kalça abduktör", how:["Yana yat — sağ altta, dirsek omuz altında","Kalçayı yerden kaldır","Vücut düz çizgi","Her iki taraf eşit süre"], avoid:"Kalça öne veya geriye sarkmasın", warn:"SKOLYOZ — her iki taraf eşit önemde", alts:["Side Plank One Leg Slide Right (MAC+)","Side Plank Hip Dip","Suitcase Carry"] },
        ]},
        { name: "🔥 METABOLİK FİNİSHER", color: "#990000", exercises: [
          { name:"Dumbbell Romanian Deadlift (Yavaş Tempo)", sets:"3 × 10", muscle:"Hamstring, glute — rehabilitatif", how:["Hafif ağırlık — diz nötral","3 sn aşağı in — hamstrings'de gerilme hissedince dur","2 sn tut","1 sn kalk — patlayıcı hareket yok"], avoid:"Dizi büküp squat'a dönüştürme — bu hip hinge", warn:"DİZ SAKATLIGI: Kettlebell Swing kaldırıldı — rotasyonel/patlayıcı yük yok", alts:["Hip Hinge (çubukla)","Cable Pull Through","Good Morning (hafif)"] },
        ]},
        { name: "❄️ SOĞUMA", color: "#2A9D8F", exercises: [
          { name:"Standing Quad Stretch Left", sets:"2 × 45sn", muscle:"Sol quad", how:["Ayakta, sol topuğu kalçaya çek","Diz aşağı baksın — bir yere tutun"], avoid:null, warn:null, alts:[] },
          { name:"Standing Quad Stretch Right", sets:"2 × 45sn", muscle:"Sağ quad — her taraf eşit", how:["Ayakta, sağ topuğu kalçaya çek","Her taraf eşit"], avoid:null, warn:null, alts:[] },
          { name:"Hamstring, Obliques and Lat Stretch", sets:"2 × 45sn", muscle:"3 bölge aynı anda", how:["Otur, bir bacağı uzat","Kolları yana aç ve öne eğil"], avoid:null, warn:null, alts:[] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 45sn", muscle:"Hip flexor, kasık", how:["Diz yerde, kalçayı öne it","Her taraf 45sn"], avoid:null, warn:null, alts:[] },
          { name:"Hug Knees to Chest", sets:"1 × 45sn", muscle:"Alt sırt, glute", how:["Sırt üstü, iki dizi göğse çek","Pasif bırak — nefes al"], avoid:null, warn:null, alts:[] },
          { name:"Standing Calf Stretch", sets:"2 × 30sn (her taraf)", muscle:"Baldır, soleus, ayak bileği", how:["Duvara doğru dur, bir ayak geride","Arka topuğu yere bas, dizi düz tut","Öne doğru eğil — baldırda gerilme hisset","30 sn tut, taraf değiştir"], avoid:"Topuğu yerden kaldırma", warn:"Menisküs rehabilitasyonu için ayak bileği mobilitesi kritik", alts:["Soleus Stretch (diz bükülü)","Foam Roller Calf","Ankle Circles"] },
        ]},
      ]
    },
    {
      id: 3, title: "GÜN 3", sub: "CUMARTESİ", focus: "Upper Hypertrophy", duration: "~70 dk", color: "#6C63FF",
      injury: "⚠️ Sağ omuz — Incline Press 3×10 (Gün 1'den 2 tekrar fazla, aynı ağırlık). Keskin ağrıda dur",
      blocks: [
        { name: "🔥 ISINMA A — Postür Rutini", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Dik dur","Çeneni geri it","2 sn tut"], avoid:"Başı aşağı eğme", warn:null, alts:["Wall Chin Tuck","Supine Chin Tuck","Cervical Retraction"] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid", how:["Bandı önde tut","Yanlara açarak çek","1 sn tut"], avoid:"Omuzları kulağa kaldırma", warn:null, alts:["Cable Reverse Fly","Face Pull (hafif)","Prone Y-T-W"] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt", how:["Kürek kemikleri hizasında","Geriye uzan, göğüsü aç"], avoid:"Bel üzerinde yapma", warn:"KİFOZ İÇİN KRİTİK — ASLA atlama", alts:["Bench Thoracic Extension","Prayer Pose on Bench","Doorway Stretch"] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor", how:["Diz yerde, kalçayı öne it","Gövde dik"], avoid:"Gövdeyi öne eğme", warn:null, alts:["Half Kneeling Hip Flexor Stretch with Rotation (MAC+)","Couch Stretch","Standing Hip Flexor Stretch"] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça iç/dış rotatorları, groin", how:["Sırt üstü yat, dizler bükülü","Dizi yana yatır — dize yük yok","10 sn tut, geri gel","Yavaş ve kontrollü"], avoid:"Ağrı hissedersen daha az range", warn:"DİZ SAKATLIGI nedeniyle Deep Sumo Squat kaldırıldı", alts:["Hip Stretch Left/Right","90/90 Hip Stretch","Frog Pose (yatarak)"] },
        ]},
        { name: "🔥 ISINMA B — Güne Özel (Üst Sırt & Omuz)", color: "#CC5500", exercises: [
          { name:"Dumbbell Seated Neutral Wrist", sets:"2 × 10", muscle:"Bilek eklemi", how:["Bankta otur, önkol uylukta","Bileği yavaşça kıvır","Kontrollü indir"], avoid:null, warn:null, alts:["Wrist Circles","Dumbbell Wrist Curl","Wrist Flexion & Extension"] },
          { name:"Seated Spinal Twist Glute Stretch", sets:"2 × 10 (her taraf)", muscle:"Üst sırt rotasyon + glute", how:["Yerde otur, bir diz bükülü karşı tarafa","Bükülen dizin dışından karşı kolunu koy","Gövdeyi yavaşça döndür","5 sn tut"], avoid:"Ani döndürme", warn:"SKOLYOZ için thoracic rotasyon kritik", alts:["Thoracic Rotation (dört ayakta)","Open Book Stretch","Thread the Needle"] },
          { name:"Shoulder Dislocates", sets:"2 × 5", muscle:"Omuz kapsülü, rotator cuff", how:["Bandı geniş tut","Kolları başın üzerinden arkaya ark çiz","5 tekrar yeterli — ısınma amaçlı"], avoid:"Zorla geçirme", warn:"Sağ omuzda keskin ağrı olursa daralt", alts:["Single Arm Circles (MAC+)","Band Shoulder Opener","Cross-body Shoulder Stretch"] },
        ]},
        { name: "⚡ AKTİVASYON", color: "#FF6B35", exercises: [
          { name:"Face Pull", sets:"3 × 15", muscle:"Rear delt, rhomboid aktive", how:["Cable göz hizasında, rope attachment","Rope'u yüze doğru çek","Dirsekler omuz hizasında","1 sn tut"], avoid:"Dirsekleri aşağı düşürme", warn:null, alts:["Band Pull Apart","Prone Y-T-W","Reverse Fly (DB)"] },
          { name:"Arms Internal Rotation Left", sets:"2 × 15", muscle:"Sol subscapularis", how:["Bandı dirsek hizasında sabitle","Sol dirsek 90°","Önkolu içe döndür","Kontrollü geri gel"], avoid:"Gövdeyi döndürme", warn:"Gün 1'de de var — rotator cuff dengesi her upper günde", alts:["Cable Internal Rotation","Prone Internal Rotation","IR with Towel Roll"] },
          { name:"Arms Internal Rotation Right", sets:"2 × 15", muscle:"Sağ subscapularis", how:["Çok hafif band","Önkolu içe döndür","Kontrollü geri gel"], avoid:"Gövdeyi döndürme", warn:"Sağ omuz yırtık — ağrıda dur", alts:["Cable Internal Rotation","Prone Internal Rotation","IR with Towel Roll"] },
        ]},
        { name: "🏋️ KUVVET", color: "#1A1A2E", exercises: [
          { name:"Machine Lat Pulldown", sets:"3 × 12", muscle:"Lat kasları", how:["Geniş kavrama, gövde hafif geriye eğik","Kürek kemiklerini önce aşağı çek","Barı göğüs üstüne çek — çeneye değil","Kontrollü yukarı — tam uzanma"], avoid:"Gövdeyi çok geriye yatırma", warn:null, alts:["Close Grip Pulldown","Single Arm Pulldown","Straight Arm Pulldown"] },
          { name:"Seated Cable Row (Single Arm)", sets:"3 × 12 (her taraf)", muscle:"Mid-back, rhomboid", how:["Tek elle çekiş — her sette önce zayıf taraf","Kollar tam uzanmış başla","Kürek kemiğini çekerek vücuda çek","1 sn tut, kontrollü uzat"], avoid:"Gövdeyi çok geriye yatırma", warn:"TEK TARAFLI ZORUNLU — skolyoz asimetrisini giderir", alts:["45 Degree Incline Row (Single Arm)","Dumbbell Row (MAC+)","Band Row"] },
          { name:"Incline Dumbbell Press", sets:"3 × 10", muscle:"Göğüs üst kısım", how:["Bench 30-45° — Gün 1'den 2 tekrar fazla, aynı ağırlık","Dumbbellları yukarı it","Tepe noktada hafif içe döndür","Kontrollü indir — dirsekler 45°"], avoid:"Dirsekleri tam dışa açma", warn:"Sağ omuzda keskin ağrı olursa dur", alts:["Landmine Press","Cable Chest Press","Elevated Push Up"] },
          { name:"Dumbbell 4 Ways Lateral Raise", sets:"3 × 12", muscle:"Tüm deltoid — 4 yönde", how:["Her yönde 3 tekrar: öne, yana, arkaya, çapraz","Hafif ağırlık — tam kontrol","Hafif dirsek bükülü","Parmaklar hafif aşağı bakacak"], avoid:"Ağırlığı sallamayla kaldırma", warn:null, alts:["Lateral Raise","Cable Lateral Raise","Leaning Lateral Raise"] },
          { name:"Standing Dumbbell Hammer Curl", sets:"3 × 12", muscle:"Brachialis, brachioradialis", how:["Nötral kavrama — başparmaklar öne","Dirseği sabit tut","Yukarı kıvır, 1 sn sıkıştır","Tam aşağı indir"], avoid:"Sallama", warn:null, alts:["Incline Dumbbell Hammer Curl (MAC+)","Cable Hammer Curl","Cross-body Hammer Curl"] },
          { name:"Standing Dumbbell Reverse Curl", sets:"3 × 12", muscle:"Brachioradialis, önkol", how:["Ters kavrama — avuç içleri aşağı","Dirseği sabit tut","Ters kavramayla yukarı kıvır","Kontrollü indir"], avoid:"Sallama", warn:null, alts:["Cable Reverse Curl","EZ Bar Reverse Curl","Reverse Wrist Curl"] },
          { name:"Cable Overhead Triceps Extension", sets:"3 × 12", muscle:"Triceps uzun baş", how:["Kablo makinesi yüksek pozisyon, rope attachment","Sırtını makineye dön, bir adım öne çık","Dirsekleri başın yanında sabit tut","Rope'u öne doğru uzat — tam kontraksiyon"], avoid:"Dirsekleri açma — başın yanında sabit kalacak", warn:"Sağ omuzda ağrı olursa dirsekleri biraz aşağı al", alts:["Dumbbell Overhead Triceps Extension","Skull Crusher","Triceps Pushdown"] },
          { name:"Assisted Chin Up", sets:"3 × 6", muscle:"Biceps + lat — farklı açı", how:["Supinated kavrama — avuç içleri sana bakıyor","Kürek kemiklerini önce aşağı çek","Çeneyi bara doğru çek","Kontrollü in — 3 saniye"], avoid:"Omuzları kulağa çekme", warn:null, alts:["Assisted Pull Up (Gün 1'de var)","Lat Pulldown (close grip)","Negative Chin Up"] },
        ]},
        { name: "🤸 CALİSTHENİCS", color: "#CC8800", exercises: [
          { name:"Diamond Push Up", sets:"2 × 12", muscle:"Triceps, iç göğüs", how:["Eller içeride — başparmaklar ve işaret parmakları elmas şekli","Göğüs elmaslara değene kadar in","Dirsekler vücuda yakın","12 tekrar — form bozulursa dur"], avoid:"Kalça kalkmasın", warn:null, alts:["Close Grip Push Up","Triceps Dip (bench)","Triceps Pushdown (Hafta 4-8'de eklenecek)"] },
          { name:"Push Up", sets:"2 × 12", muscle:"Göğüs, ön omuz, triceps", how:["Standart form","Göğüs yere değene kadar in","Dirsekler 45°"], avoid:"Kalça kalkmasın", warn:null, alts:["Wide Push Up","Archer Push Up","Incline Push Up"] },
          { name:"Pike Push Up", sets:"2 × 12", muscle:"Ön omuz, triceps — handstand progressionu", how:["Kalça yüksekte V pozisyonu","Başı yere indirerek dirsekleri bük","Patlayıcı geri it","V pozisyonu koru"], avoid:"Kalçayı squat pozisyonuna bırakma", warn:null, alts:["Wall Pike Push Up","Elevated Pike Push Up","Handstand Hold (duvara karşı — Hafta 9-12)"] },
          { name:"Captains Chair Bent Knee Raise", sets:"3 × 12", muscle:"Karın alt kısım", how:["Kollar yanal desteklerde","Omuzlar aşağı ve geriye","Dizleri göğse çek","Kontrollü indir"], avoid:"Sallanarak yapmak", warn:null, alts:["Lying Leg Raise","Ab Wheel Rollout","Hanging Knee Raise"] },
          { name:"Scapula Push Up", sets:"2 × 8", muscle:"Serratus anterior — kapanış aktivasyonu", how:["Push-up pozisyonu, kollar uzanmış","Kürek kemiklerini aç (protract)","Kürek kemiklerini birleştir (retract)","Kollar hep düz"], avoid:"Dirsekleri bükme", warn:null, alts:["Wall Serratus Slide","Plank Serratus Reach","Bear Crawl Hold"] },
        ]},
        { name: "🔥 METABOLİK FİNİSHER", color: "#990000", exercises: [
          { name:"Jump Rope", sets:"3 × 1 dk", muscle:"Kardiyovasküler — baldır, koordinasyon", how:["Hafif topuk kaldırarak atla — parmak uçlarına bas","Bilek hareketiyle ipi döndür — kol hareketi az","1 dk tutarlı tempo","Yorulursan tempo düşür, durma. Set arası 45 sn."], avoid:"Ağır çarpmak — hafif ve ritmik atla", warn:"Omuz yorulmuş — tempo düşük tut", alts:["Rowing Machine (omuz yorgunsa)","Stationary Bike","High Knees (ip yoksa)"] },
        ]},
        { name: "❄️ SOĞUMA", color: "#2A9D8F", exercises: [
          { name:"Standing Triceps and Lat Stretch", sets:"2 × 45sn", muscle:"Triceps + lat aynı anda", how:["Bir kolu baş üstünde bükerek karşı omza it","Diğer elle dirseği bastır"], avoid:null, warn:null, alts:[] },
          { name:"Above Head Chest Stretch", sets:"2 × 45sn", muscle:"Göğüs, ön omuz", how:["Eller ensende, dirsekler dışa","Göğsü öne aç"], avoid:null, warn:null, alts:[] },
          { name:"Rotator Cuff Stretch Left", sets:"2 × 45sn", muscle:"Sol omuz kapsülü", how:["Sol kolu göğüs önünden karşıya uzat","Sağ elle bastır"], avoid:null, warn:null, alts:[] },
          { name:"Rotator Cuff Stretch Right", sets:"2 × 45sn", muscle:"Sağ omuz kapsülü", how:["Sağ kolu göğüs önünden karşıya uzat","Sol elle bastır"], avoid:null, warn:"SAĞ OMUZ YIRTIK TARAF — kritik soğuma", alts:[] },
          { name:"Childs Pose to Cobra Pose", sets:"1 × 45sn", muscle:"Lat, üst sırt, ön omuz", how:["Child's pose'dan yavaşça cobra'ya","Akıcı hareket"], avoid:null, warn:null, alts:[] },
          { name:"Neck Side Stretch", sets:"2 × 30sn (her taraf)", muscle:"Boyun yan kasları, levator scapulae", how:["Başını yana eğ — kulak omuza yaklaşır","Karşı elle hafif bastır","Omuzları aşağıda tut","30 sn tut, taraf değiştir"], avoid:"Omzu kulağa kaldırma", warn:"Masa başı çalışanlar için kritik", alts:["Chin Tuck","SCM Stretch","Upper Trap Stretch"] },
          { name:"Dynamic Chest Stretch", sets:"2 × 30sn", muscle:"Göğüs, ön omuz — kifoz düzeltme", how:["Ayakta, kolları yana aç","Göğsü öne aç, kürek kemiklerini birleştir","Kolları geriye çek — derin nefes al","Yavaşça bırak, tekrarla"], avoid:"Omuzları öne düşürme", warn:"KİFOZ İÇİN KRİTİK — göğüs açılımı", alts:["Doorway Stretch","Wall Chest Stretch","Foam Roller Chest Opener"] },
          { name:"Wrist Pull Stretch", sets:"2 × 30sn (her taraf)", muscle:"Bilek fleksörleri, önkol", how:["Bir kolunu öne uzat, avuç yukarı","Diğer elle parmakları geriye çek","Gerginlik hissedene kadar tut","Taraf değiştir"], avoid:"Aşırı zorlamak", warn:"Kod yazan / masa başı çalışanlar için kritik", alts:["Wrist Circles","Prayer Stretch","Reverse Prayer Stretch"] },
        ]},
      ]
    },
    {
      id: 4, title: "GÜN 4", sub: "PAZAR", focus: "Lower Athletic", duration: "~70 dk", color: "#CC8800",
      injury: "⚠️ Dumbbell Deadlift var — Foam Roller Upper Back Roll ısınmada ZORUNLU. Skolyoz: her sette omurga nötrali kontrol et",
      blocks: [
        { name: "🔥 ISINMA A — Postür Rutini", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Boyun fleksörleri", how:["Dik dur","Çeneni geri it","2 sn tut"], avoid:"Başı aşağı eğme", warn:null, alts:["Wall Chin Tuck","Supine Chin Tuck","Cervical Retraction"] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka omuz, rhomboid", how:["Bandı önde tut","Yanlara açarak çek","1 sn tut"], avoid:"Omuzları kulağa kaldırma", warn:null, alts:["Cable Reverse Fly","Face Pull (hafif)","Prone Y-T-W"] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 10", muscle:"Üst sırt — deadlift öncesi ZORUNLU", how:["Kürek kemikleri hizasında","Geriye uzan, göğüsü aç","Bu gün 2 kez yapabilirsin — deadlift öncesi kritik"], avoid:"Bel üzerinde yapma", warn:"HEX BAR DEADLIFT ÖNCESİ OMURGA HAZIRLIĞI — ASLA atlama", alts:["Bench Thoracic Extension","Prayer Pose on Bench","Doorway Stretch"] },
          { name:"Half Kneeling Hip Flexor Stretch", sets:"2 × 30sn (her taraf)", muscle:"Hip flexor", how:["Diz yerde, kalçayı öne it","Gövde dik"], avoid:"Gövdeyi öne eğme", warn:null, alts:["Half Kneeling Hip Flexor Stretch with Rotation (MAC+)","Couch Stretch","Standing Hip Flexor Stretch"] },
          { name:"Supine Hip Rotation", sets:"2 × 10 (her taraf)", muscle:"Kalça iç/dış rotatorları, groin", how:["Sırt üstü yat, dizler bükülü","Dizi yana yatır — dize yük yok","10 sn tut, geri gel","Yavaş ve kontrollü"], avoid:"Ağrı hissedersen daha az range", warn:"DİZ SAKATLIGI nedeniyle Deep Sumo Squat kaldırıldı", alts:["Hip Stretch Left/Right","90/90 Hip Stretch","Frog Pose (yatarak)"] },
        ]},
        { name: "🔥 ISINMA B — Güne Özel (Deadlift & Omurga)", color: "#CC5500", exercises: [
          { name:"Hip Hinge", sets:"2 × 10", muscle:"Hamstring, omurga nötral farkındalığı", how:["Ayakta dik — isteğe bağlı çubuk omurga boyunca","Kalçayı geriye it — öne değil","Hafif diz bükülü, sırt düz","Geri gel"], avoid:"Çubuk temas noktalarından ayrılıyorsa — daha az öne eğil", warn:"Dumbbell Deadlift mekanizmasını vücuda öğretmek için kritik", alts:["Romanian Deadlift (çok hafif)","Good Morning (vücut ağırlığı)","Kettlebell Swing (hafif)"] },
          { name:"Jefferson Squats", sets:"2 × 5", muscle:"Omurga segmental mobilite", how:["Barbell üzerinde at koşusu gibi dur","ÇOK HAFİF AĞIRLIK — sadece mobilite","Yavaşça aşağı in","Omurgayı döndürme — dik tut"], avoid:"Hızlı yapma ve ağır kullanma — bu ısınma hareketi", warn:"Skolyoz — her iki taraf eşit yapılmalı", alts:["Hip Hinge Drill","Cat and Cow","Thoracic Extension"] },
          { name:"Cossack Squat", sets:"2 × 8 (her taraf)", muscle:"Hamstring, kalça iç rotasyon", how:["Ayaklar çok geniş, parmaklar dışa","Bir tarafa çök","Diğer bacak tam uzatılmış","Yavaş ve kontrollü"], avoid:"Hızlı yapma", warn:"Menisküs hassasiyetin varsa derinliği azalt", alts:["Lateral Lunge","Side Step with Band","Standing IT Band Stretch"] },
        ]},
        { name: "⚡ AKTİVASYON", color: "#FF6B35", exercises: [
          { name:"Glute Bridge Hamstring Walk", sets:"3 × 15", muscle:"Glute + hamstring kombinasyon", how:["Sırt üstü — kalçayı kaldır ve sabit tut","Ayakları yavaşça öne yürüt — bacaklar uzanıyor","Topuklara kadar git","Geri yürüt — kalça hep yukarıda"], avoid:"Kalçayı düşürme — hep yukarıda kalacak", warn:"Floor Bridge'den çok üstün — Dumbbell Deadlift öncesi en iyi aktivasyon", alts:["Floor Bridge","Single Leg Glute Bridge","Hip Thrust (hafif)"] },
          { name:"Monster Walk", sets:"2 × 12 (ileri-geri)", muscle:"Kalça dış rotatorları, abduktörler", how:["Direniş bandı dizlerin üstünde","Hafif çömelmiş pozisyon","Küçük adımlarla ilerle","Dizler band gerilimini koru — içe kapatma"], avoid:"Dizleri içe kapama", warn:null, alts:["Clamshell","Side-lying Hip Abduction","Band Hip Circle"] },
          { name:"Seated Leg Extension with Band", sets:"2 × 12", muscle:"Vastus medialis (VMO) — diz stabilizasyonu", how:["Sandalyeye otur, band ayak bileğinde","Dizi tam düzeltmeye doğru it","1 sn tut","Kontrollü geri bük — yavaş"], avoid:"Hızlı yapma — yavaş ve kontrollü", warn:"MENİSKÜS REHAB — Gün 2'de de var, haftada 2x VMO kritik", alts:["Leg Extension Machine (hafif)","Quad Set","VMO Squat"] },
        ]},
        { name: "🏋️ KUVVET", color: "#1A1A2E", exercises: [
          { name:"Dumbbell Deadlift", sets:"4 × 6", muscle:"Tüm arka zincir — hamstring, glute, sırt", how:["Dumbbell iki elde, ayaklar kalça genişliğinde","ÖNCE: Göğsü aç, omurga nötral yap","Kürek kemiklerini aşağı çek","SONRA: Kalçayı öne iterek kalk — dumbbelllar bacak yanında"], avoid:"Omurgayı öne büküp kaldırma — nötral omurga şart", warn:"SKOLYOZ: Her sette omurgayı kontrol et. Asimetri hissedersen ağırlığı azalt", alts:["Hex Bar Deadlift","Romanian Deadlift","Barbell Deadlift"] },
          { name:"Dumbbell Reverse Lunge", sets:"3 × 12 (her bacak)", muscle:"Quad, glute", how:["Dumbbell iki elde, dik dur","Bir ayağı GERİYE at — arka diz yere yakın","Ön diz 90° — dizi ayak ucunu geçmesin","Ön ayakla iterek geri kalk"], avoid:"Gövdeyi öne eğme — dik tut", warn:"Walking Lunge'dan dizlere daha az yük bindirir", alts:["Walking Lunge","Dumbbell Step Up","Bulgarian Split Squat (güçlendikçe)"] },
          { name:"One Leg Hip Thrust Right", sets:"3 × 12", muscle:"Sağ glute izolasyon", how:["Sırtını bench'e daya","Sol bacağı büküp havada tut","Sağ ayakla kalçayı patlayıcı yukarı it","1 sn sıkıştır"], avoid:"Beli aşırı hiperextend etme", warn:"Asimetriyi giderir — iki taraf ayrı çalışıyor", alts:["Hip Thrust (bilateral)","Banded Hip Thrust","Cable Pull Through"] },
          { name:"One Leg Hip Thrust Left", sets:"3 × 12", muscle:"Sol glute izolasyon", how:["Sırtını bench'e daya","Sağ bacağı büküp havada tut","Sol ayakla kalçayı patlayıcı yukarı it","Her iki taraf eşit"], avoid:"Beli aşırı hiperextend etme", warn:"SKOLYOZ — iki taraf eşit süre", alts:["Hip Thrust (bilateral)","Banded Hip Thrust","Single Leg Glute Bridge"] },
          { name:"Double Kettlebell Farmer's Carry", sets:"3 × 30m", muscle:"Core statik, üst sırt, grip", how:["Ağır kettlebell iki elde","Omurgayı tam dik tut","Omuzlar geriye ve aşağıya","Küçük adımlarla yürü — 30m git, dön"], avoid:"Omuzların düşmesine izin verme", warn:"SKOLYOZ: Bir tarafın daha erken yorulduğunu fark edersen ağırlığı azalt", alts:["Suitcase Carry (tek el)","Farmer Carry (dumbbell)","Trap Bar Carry"] },
        ]},
        { name: "🎯 CORE", color: "#6C63FF", exercises: [
          { name:"Side Plank One Leg Slide Left", sets:"2 × 45sn", muscle:"Sol yan karın, kalça abduktör, hip flexor", how:["Yana yat — sol altta, dirsek omuz altında","Kalçayı yerden kaldır","Vücut düz çizgi","Üst bacağı öne-arkaya kaydır"], avoid:"Kalça öne veya geriye sarkmasın", warn:"Side Plank'ın en gelişmiş versiyonu — Gün 2'dekinden daha zor", alts:["Side Plank Leg Raise Left (MAC+)","Side Plank Hip Dip","Copenhagen Plank"] },
          { name:"Side Plank One Leg Slide Right", sets:"2 × 45sn", muscle:"Sağ yan karın, kalça abduktör", how:["Yana yat — sağ altta","Her iki taraf eşit süre","Üst bacağı öne-arkaya kaydır"], avoid:"Kalça öne veya geriye sarkmasın", warn:"SKOLYOZ — asla bir tarafı atlama", alts:["Side Plank Leg Raise Right (MAC+)","Side Plank Hip Dip","Suitcase Carry"] },
        ]},
        { name: "🔥 METABOLİK FİNİSHER", color: "#990000", exercises: [
          { name:"Sled Push / Rowing Machine", sets:"3 × 20m veya 45sn", muscle:"Tüm arka zincir — patlayıcı metabolik", how:["SLED: Gövde 45° öne eğik, küçük hızlı adımlarla it, 20m","ROWING: 45 sn maksimum tempo — bacaklar önce iter","Set arası 60 sn dinlen — en ağır gün"], avoid:"Sled için: Dimdik durmaya çalışma", warn:"Sled yoksa Rowing Machine birinci alternatif", alts:["Assault Bike 30sn","Farmer Carry (ağır)","Kettlebell Swing (ağır)"] },
        ]},
        { name: "❄️ SOĞUMA", color: "#2A9D8F", exercises: [
          { name:"Standing Half Forward Bend", sets:"2 × 45sn", muscle:"Hamstring, alt sırt, tüm arka zincir", how:["Ayakta, dizler hafif bükük","Öne eğil, eller serbest sarkar","Zorlaştırma"], avoid:null, warn:null, alts:[] },
          { name:"Lizard Pose Left", sets:"2 × 45sn", muscle:"Sol kalça, groin, hip flexor", how:["Sol ayak öne, sağ diz yerde","Gövdeyi öne eğ, dirsekler yere","Derin nefes al"], avoid:null, warn:null, alts:[] },
          { name:"Lizard Pose Right", sets:"2 × 45sn", muscle:"Sağ kalça — her taraf eşit", how:["Sağ ayak öne, sol diz yerde","Gövdeyi öne eğ, dirsekler yere"], avoid:null, warn:"SKOLYOZ — her iki taraf eşit", alts:[] },
          { name:"Supine Spinal Twist Right", sets:"2 × 45sn", muscle:"Sağ omurga rotasyonel rahatlama", how:["Sırt üstü, sağ dizi büküp sola yatır","Omuzlar yerde — derin nefes ver"], avoid:null, warn:null, alts:[] },
          { name:"Supine Spinal Twist Left", sets:"2 × 45sn", muscle:"Sol omurga — skolyoz için her iki taraf kritik", how:["Sırt üstü, sol dizi büküp sağa yatır","Omuzlar yerde"], avoid:null, warn:null, alts:[] },
          { name:"Cat and Cow", sets:"1 × 12", muscle:"Tüm omurga — deadlift kapanışı", how:["Çok yavaş ritim","Her pozisyonda tam nefes al-ver"], avoid:null, warn:null, alts:[] },
          { name:"Standing Calf Stretch", sets:"2 × 30sn (her taraf)", muscle:"Baldır, soleus, ayak bileği", how:["Duvara doğru dur, bir ayak geride","Arka topuğu yere bas, dizi düz tut","Öne doğru eğil — baldırda gerilme hisset","30 sn tut, taraf değiştir"], avoid:"Topuğu yerden kaldırma", warn:"Menisküs rehabilitasyonu için ayak bileği mobilitesi kritik", alts:["Soleus Stretch (diz bükülü)","Foam Roller Calf","Ankle Circles"] },
        ]},
      ]
    },
  ]
};
