// YENİ ATLETİK PROGRAM — Dan John 5 Kalıp Çerçevesi
// Her günde: PUSH + PULL + HINGE + SQUAT + CARRY (hepsi her seans)
// Araştırma kaynakları: Dan John/StrongFirst, NSCA TSAC, PMC Tactical Athlete Review,
// Firefighter Functional Fitness (Kerrigan & Moss), Military.com (Stew Smith)

export const PROGRAM3_NEW_DAYS = {
  days: [

    // ══════════════════════════════════════════════════════════════
    // GÜN 1 — SALI: Dikey Kuvvet
    // PULL Dikey (pull-up) + PUSH Dikey (landmine) + HINGE + SQUAT + CARRY
    // Araştırma: Vertical pull-up skill her taktik atlet için temel
    // ══════════════════════════════════════════════════════════════
    {
      id: 1, title: "GÜN 1", sub: "SALI", focus: "Dikey Kuvvet + Sprint", duration: "~85 dk", color: "#C1121F",
      type: "training",
      injury: "⚠️ BEL: Deadlift'te omurga nötral — yuvarlama kontrendike. DİZ: Goblet Squat diz ağrıda Step-up'a geç. OMUZ: Landmine Press rotator cuff dostu — overhead ağrıda tercih et. BOYUN: Pull-up'ta kipping yok — kontrollü.",
      blocks: [
        { name: "🔥 ISINMA — Postür & Boyun Aktivasyonu", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"3 × 12", muscle:"Derin boyun fleksörleri", how:["Sandalyede dik otur", "Çeneni geriye it — çift çene yap", "2 sn tut, bırak"], avoid:"Başı aşağı eğme", warn:"Bilgisayar başında boyun kasları zayıflar — günlük yapılmalı", alts:[] },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Rhomboid, arka delt, postür", how:["Bandı iki elle önde tut", "Kolları yanlara aç — kürek kemiklerini birleştir", "1 sn tam açık tut, kontrollü geri gel"], avoid:"Omuzları kulağa kaldırma", warn:"ROTATOR CUFF: Arka delt zayıflığı omuz instabilitesinin ana nedeni — bu hareketi asla atlama", alts:[] },
          { name:"Foam Roller Upper Back Roll", sets:"2 × 60sn", muscle:"Torasik mobilite, kifoz önlemi", how:["Foam roller'ı üst sırta yerleştir", "Ağrılı noktada 20-30sn kal", "Nefes ver ve bırak"], avoid:"Bel üzerinde yapma", warn:"KİFOZ + SKOLYOZ: Torasik mobilite her gün şart — bu atlanamazı", alts:[] },
          { name:"Dead Bug", sets:"2 × 8 (her taraf)", muscle:"Core anti-extension — bel koruması", how:["Sırt üstü — kollar tavana, dizler 90°", "BEL YERDE kalmalı — değişmemeli", "Sağ kol geri + sol bacak uzat — 2 sn tut", "Geri gel, diğer taraf"], avoid:"Beli yerden kaldırma — bu hareketin özü", warn:"BEL FITIĞI: En güvenli core aktivasyonu — her günün başında", alts:[] },
        ]},

        { name: "🤸 KALİSTENİK — Pull-up Skill (Taze Enerjiyle Önce)", color: "#2A9D8F", exercises: [
          { name:"Dead Hang", sets:"3 × 30sn", muscle:"Lat, ön kol, grip, omurga dekompresyonu", how:["Bardan overhand tutuşla asıl", "Omuzları aktif — kulağa değil aşağı çek", "Vücut sakin, nefes al", "Omurgayı uzattığını hisset"], avoid:"Tamamen pasif sarkma — omuz kasları aktif olmalı", warn:"Pull-up yolunun temeli — form mükemmel olmadan ağırlık ekleme", alts:["Band Lat Stretch","Doorway Lat Stretch"], alt_reasons:["Bant ile lat mobilite","Kapıdan gerinerek"] },
          { name:"Scapula Pull Up", sets:"3 × 12", muscle:"Serratus anterior, lat aktivasyon", how:["Bardan asıl — kollar düz", "Sadece kürek kemiklerini aşağı çek — dirsek bükme", "1 sn tut, kontrollü bırak"], avoid:"Dirsekleri bükme — bu bir lat aktivasyon hareketi", warn:"Pull-up'ta ilk ateşleme buradan gelir — asla atla", alts:[] },
          { name:"Chin-up Negative", sets:"5 × 5 (5sn indir)", muscle:"Biceps, lat — eccentric güç inşası", how:["Zıplamayla veya kutuyla üst pozisyona gel", "5 saniye sayarak yavaşça in — kontrol şart", "Tam alta in — ölü asılmaya geç", "Tekrarla"], avoid:"Hızlı düşme — 5sn eccentric'in değeri burada", warn:"Konsantrik pull-up yapamazsan negatifle güç kazan — en etkili yol bu", alts:["Band Assisted Chin-up","Lat Pulldown"], alt_reasons:["Bant yardımlı tam range","Makine ile progressif"] },
          { name:"Assisted Pull-up", sets:"4 × 6", muscle:"Lat, teres major, biceps — tam hareket örüntüsü", how:["Bant veya makine yardımıyla — tam range", "Göğsü bara çek — çene üzerinden", "3sn kontrollü in", "Mükemmel form — ağırlık değil teknik"], avoid:"Kipping veya momentum — boyun fıtığı için tehlikeli", warn:"BOYUN FITIĞI: Kipping asla yapma — sadece strict form", alts:["Lat Pulldown Heavy","Resistance Band Pull-up"], alt_reasons:["Tam lat çalışma","Progressif bant"] },
        ]},

        { name: "🏋️ KUVVET — Hinge + Squat + Dikey Push (Her Günün Üçlüsü)", color: "#C1121F", exercises: [
          { name:"Dumbbell Deadlift", sets:"5 × 5", muscle:"Tüm posterior chain — hamstring, glute, erektör, trapez", how:["Ayaklar kalça genişliğinde, DB'ler bacak yanında", "Kalçayı geri it — sırt düz, omurga nötral", "DB'leri bacak boyunca yavaşça indir", "Topuklarla it, kalça öne — kalk"], avoid:"Sırtı yuvarlama — bel fıtığında disk riski çok yüksek", warn:"🟡 BEL FITIĞI: Omurga nötral mutlak şart. Trap Bar varsa tercih et. Ağırlığı hafif tut — form önce", alts:["Trap Bar Deadlift","Romanian Deadlift","Hex Bar Deadlift"], alt_reasons:["BEL: Daha dik duruş, daha az spinal kompresyon","BEL: Hip hinge — daha az alt bel yükü","BEL: En güvenli deadlift varyantı"], injury:true },
          { name:"Goblet Squat", sets:"4 × 8", muscle:"Quad, glute, core — diz ve bel dostu squat", how:["DB veya KB'ı göğüs önünde iki elle tut", "Ayaklar omuz genişliği, parmaklar hafif dışa", "Kalça geriye ve aşağı — diz parmakların üzerinde", "Topuklarla it, kalk"], avoid:"Dizlerin içe çökmesi — gluteleri sıkı tut", warn:"DİZ: Goblet squat'ın öne eğim azaltır — menisküs için güvenli. Ağrı varsa Step-up'a geç", alts:["Box Squat","Step-up","Wall Sit"], alt_reasons:["DİZ: Kısmi range — kontrollü","DİZ: Unilateral, diz üzerinde daha az yük","DİZ: İzometrik, eklem stresi minimal"] },
          { name:"Landmine Press", sets:"4 × 8 (her taraf)", muscle:"Ön/orta delt, triceps, serratus, core anti-rotation", how:["Barı köşeye dayandır", "Tek elle kalça hizasında tut", "Çapraz olarak yukarı-öne it — tam uzat", "Kontrollü geri getir — omuz aktif tut"], avoid:"Gövdeyi döndürme — core sıkı kalmalı", warn:"ROTATOR CUFF: Overhead'in en güvenli varyantı — supraspinatus üzerindeki yük minimal. Sağ omuz ağrısında bu ideal seçenek", alts:["DB Shoulder Press (Oturarak)","Neutral Grip DB Press","Arnold Press"], alt_reasons:["OMUZ: Oturarak — spine destekli","OMUZ: Nötral tutuş rotator dostu","OMUZ: Sağlıklı overhead alternatifi"] },
          { name:"Bulgarian Split Squat", sets:"3 × 6 (her bacak)", muscle:"Quad, glute, hip flexor — unilateral denge", how:["Arka ayak bench/kutu üzerinde", "Öne adım at — ön diz 90° açıda olacak", "Gövde hafif öne eğ — glute aktivasyonu için", "Yavaşça in, ön topukla it"], avoid:"Ön dizin parmak ucunu geçmesi — menisküs stresi", warn:"DİZ: Ön diz ağrısında Step-up'a geç. Ağırlık eklemeden önce form mükemmel olmalı", alts:["Step-up (Kutu)","Reverse Lunge","Box Squat"], alt_reasons:["DİZ: Daha az diz stresi","DİZ: Kontrollü geri adım — diz dostu","DİZ: Bilateral — sabit destek"] },
        ]},

        { name: "🎯 ARKA DELT + YATAY ÇEKME — Rotator Cuff Koruması", color: "#1A3A5C", exercises: [
          { name:"Barbell / DB Bent Over Row", sets:"4 × 8", muscle:"Mid trapez, rhomboid, lat, posterior delt, biceps", how:["Kalça menteşe pozisyonu — sırt düz", "DB'leri karın altına doğru çek", "Kürek kemiklerini birleştir — 1 sn tut", "Kontrollü indir"], avoid:"Sırtı döndürme veya yuvarlama", warn:"🟡 BEL FITIĞI: Hafif yük tut, mükemmel form. Ağrıda DB Row Single Arm (destekli) tercih et", alts:["Single Arm DB Row (Destekli)","Seated Cable Row","Machine Row"], alt_reasons:["BEL: Bench'e yaslanarak — bel yükü sıfır","BEL: Oturarak, dik gövde","BEL: Yük kontrollü, güvenli"] },
          { name:"Face Pull (Band veya Makine)", sets:"4 × 15", muscle:"Posterior delt, rotator cuff, rhomboid", how:["Bant veya kablo — göz hizasında", "İki elle tutarlar tutup çek — dirsekler kulak hizasına", "Dışa rotasyon — bilekler geriye", "1 sn tut, kontrollü geri git"], avoid:"Boyunu öne uzatma", warn:"ROTATOR CUFF: Bu hareket rotator cuff rehabilitasyonunun çekirdeğidir — her antrenman şart. Sağ omuz için günlük yap", alts:[] },
          { name:"Prone External Rotation (Yerde veya Bench)", sets:"3 × 12 (her taraf)", muscle:"Infraspinatus, teres minor — rotator cuff kasları", how:["Yüz üstü yat, kol yana uzat 90°", "Ağırlıksız veya çok hafif DB (1-2kg)", "Ön kolu yukarı kaldır — dirsek sabit", "Yavaşça indir"], avoid:"Ağır yük — bu izolasyon tedavi hareketidir", warn:"ROTATOR CUFF: Sağ omuz yırtığı için kritik rehabilitasyon hareketi. Ağrısız range'de yap — asla acı verme", alts:["Band External Rotation","Side Lying ER"] },
        ]},

        { name: "⚡ CARRY + CORE", color: "#8B4513", exercises: [
          { name:"Double Farmer Carry", sets:"4 × 30m", muscle:"Grip, trapez, core statik, ayak bileği stabilite", how:["Ağır DB veya KB — omuz genişliğinde tut", "Omuzlar geri ve aşağı — dik postür", "Adımlar kontrollü, hızlı yürüme", "Nefes alma — sıkıştırma"], avoid:"Gövdeyi öne eğme veya yana tilt", warn:"Ağır tut — konuşamayacak kadar zor. Bu tek hareket atletizmi en hızlı geliştirir" },
          { name:"Side Plank (Sol)", sets:"2 × 30sn", muscle:"Sol oblique, quadratus lumborum", how:["Dirsek omuz altında", "Kalça yukarı — düz çizgi", "Üst kol yanda veya kalçada", "30sn tut — nefes al"], avoid:"Kalçanın sarkması", warn:"SKOLYOZ: Lateral core her gün şart" },
          { name:"Side Plank (Sağ)", sets:"2 × 30sn", muscle:"Sağ oblique, quadratus lumborum", how:["Dirsek omuz altında","Kalça yukarı","Düz çizgi","Nefes al"], avoid:"Kalça sarkması" },
        ]},

        { name: "⚡ KONDİSYON — Sprint + Zone 2", color: "#990000", exercises: [
          { name:"Sprint Interval", sets:"6 × 30sn sprint / 30sn yürüyüş", muscle:"Full body kardiyovasküler — bacak gücü, kalp kapasitesi", how:["30sn maksimum efor sprint", "30sn aktif yürüyüş dinlenme", "6 tur = 6 dakika toplam", "Son 2 turda form önce — hız değil"], avoid:"Form bozulursa yavaşla", warn:"Kondisyon asla atlanmaz — taktik atletin kalp kapasitesi hayat kurtarır" },
          { name:"Zone 2 Aerobik Tempo", sets:"15 dakika sürekli", muscle:"Aerobik baz — kalp kapasitesi, yağ yakımı motoru", how:["Hafif koşu veya hızlı yürüyüş", "Konuşabilecek tempo — nefes zorlanmamalı", "Kalp hızı 130-150 bpm hedef", "Steady tempo — hız değişmesin"], avoid:"Çok hızlı gitme — aerobik baz Zone 2'de kurulur", warn:"Araştırma: İtfaiyeci programında her seansta 30-40dk aerobik şart. Zone 2 base olmadan kondisyon tavan yapar" },
        ]},

        { name: "❄️ SOĞUMA", color: "#C1121F", exercises: [
          { name:"Hip 90/90 Stretch", sets:"2 × 60sn (her taraf)", muscle:"Kalça dış rotasyon, piriformis", how:["Yerde otur, her iki bacak 90° açıda", "Öne eğil — ön kalçayı hisset", "Değiş — arka kalçayı hisset"], avoid:"Dizleri zorla bastırma" },
          { name:"Child's Pose + Lat Stretch", sets:"2 × 45sn", muscle:"Lat, QL, omurga dekompresyon", how:["Diz üstü öne eğil","Kolları ileri uzat","Yanlarına sürükle — lat hisset"], avoid:"Beli sıkıştırma" },
        ]},
      ]
    },

    // ══════════════════════════════════════════════════════════════
    // GÜN 2 — PERŞEMBE: Yatay Kuvvet
    // PUSH Yatay (push-up/dip) + PULL Yatay (row) + HINGE + SQUAT + CARRY
    // Her günde push+pull bir arada — split değil
    // ══════════════════════════════════════════════════════════════
    {
      id: 2, title: "GÜN 2", sub: "PERŞEMBE", focus: "Yatay Kuvvet + AMRAP", duration: "~85 dk", color: "#2A9D8F",
      type: "training",
      injury: "⚠️ BEL: Push-up'ta core sıkı, bel sarkmasın. BOYUN: Pike Push Up'ta boyun nötral. DİZ: Step-up'ta diz parmak üzerinde. OMUZ: Band Pull Apart her blok öncesi yap.",
      blocks: [
        { name: "🔥 ISINMA — Mobilite & Aktivasyon", color: "#CC5500", exercises: [
          { name:"Cat-Cow", sets:"2 × 10 nefes", muscle:"Torasik mobilite, lumbar mobilizasyon", how:["Dört ayak pozisyonu","İnhale — bel içe, kafa yukarı (cow)","Exhale — sırt yukarı kemer (cat)","Yavaş — nefesle birlikte"], avoid:"Boynu zorla kaldırma" },
          { name:"Hip Circle", sets:"2 × 10 (her yön)", muscle:"Kalça eklem mobilizasyonu", how:["Ayakta — tek ayak kalça hizasına kaldır","Büyük daire çiz — içten dışa","Sonra dıştan içe","Her iki bacak"], avoid:"Gövdeyi aşırı sallamak" },
          { name:"Wall Slide", sets:"3 × 10", muscle:"Arka delt, serratus, torasik ekstansiyon", how:["Sırta yaslan duvara — bel duvara değsin","Kollar W pozisyonunda — dirsek 90°","Yavaşça kaldır Y pozisyonuna","Bel duvardan ayrılmasın"], avoid:"Belin duvardan kalkması", warn:"ROTATOR CUFF + KİFOZ: Günlük yapılmalı — hem omuz hem postür" },
          { name:"Prone External Rotation", sets:"2 × 12 (her taraf)", muscle:"Rotator cuff ısınma", how:["Yüz üstü yat","Kol yana 90°","Ön kolu yukarı kaldır — yavaş","İndir"], avoid:"Hızlı hareket", warn:"OMUZ: Her antrenman öncesi rotator cuff ısınması şart" },
        ]},

        { name: "🤸 KALİSTENİK — Push/Dip Skill (Önce)", color: "#2A9D8F", exercises: [
          { name:"Push Up Variations", sets:"4 × max (temiz form)", muscle:"Göğüs, triceps, ön delt, serratus, core", how:["Mevcut seviyene göre: diz üstü / normal / dar / elmas","Gövde tahtası gibi — core sıkı","Göğüs yere değsin — tam range","Bak: boyun nötral"], avoid:"Beli sarkıtma veya kalçayı havaya kaldırma" },
          { name:"Dip Negative", sets:"5 × 5 (5sn indir)", muscle:"Triceps, alt göğüs, ön delt — eccentric güç", how:["Paralel barda üst pozisyonda başla","5 saniye sayarak aşağı in — yavaş kontrol","En alta in — dirseğin 90° geçmesine izin ver","Zıplayarak veya ayakla geri çık"], avoid:"Hızlı düşme — 5sn şart", warn:"OMUZ: Dip'te ön omuz yükü var. Ağrıda azalt veya Push Up'a dön" },
          { name:"Full Dip", sets:"3 × max", muscle:"Triceps, alt göğüs, ön delt", how:["Paralel bar — kollar vücudu kaldırıyor","Dirsekler hafif arkaya — göğüs önde","İn — dirseğin 90°","İt — kollar tam uzar"], avoid:"Çok öne eğilme — triceps değil göğüs odağına geçer", warn:"OMUZ: Ağrıda range azalt veya Push Up'a geç" },
          { name:"Pike Push Up", sets:"3 × 8", muscle:"Ön delt dominant — handstand push-up hazırlık", how:["V pozisyonunda başla — kalça havada","Başı yere doğru indir — dirsekler dışa","İt — başlangıca dön","Dar ayak — daha fazla delt"], avoid:"Boyun öne uzatma", warn:"BOYUN FITIĞI: Boyun nötral kalmalı — baş yana kaçmasın" },
        ]},

        { name: "🏋️ KUVVET — Squat + Hinge + Yatay Çekme", color: "#1A3A5C", exercises: [
          { name:"Goblet Squat (Ağır)", sets:"4 × 6", muscle:"Quad, glute, adductor — kuvvet odaklı", how:["Ağır KB veya DB — göğüs önünde","Derin in — uylu yere paralel","Topuklarla güçlü it","Dik gövde — hafif öne eğim tamam"], avoid:"Dizlerin içe çökmesi", warn:"DİZ: Ağır goblet squat diz dostu — bar squat'tan güvenli. Ağrıda ağırlığı azalt" },
          { name:"Kettlebell Swing", sets:"4 × 15", muscle:"Glute, hamstring, core — patlayıcı hip extension", how:["KB ayaklar arasında — kalça menteşe","Güçlü kalça hareketi — KOL DEĞİL","KB göğüs hizasına gelene kadar sallan","Glute sıkış — tam dik dur"], avoid:"Squat'a benzetme veya beli öne eğme", warn:"🟡 BEL FITIĞI: Hip hinge tekniği mükemmel olmalı. Bel değil kalça iter — ağrıda dur" },
          { name:"Push Up to Row", sets:"4 × 8 (her taraf)", muscle:"Göğüs + sırt + core rotasyon — bütünsel stabilite", how:["DB'lerle push-up pozisyonu","Bir push-up yap","Bir kolu çek — row yap","Diğer kol — simetrik"], avoid:"Kalçanın dönmesi — anti-rotation core çalışması bu", warn:"Mükemmel anti-rotation egzersiz — Pallof Press'e eşdeğer" },
          { name:"Step-up (Kutu / Bench)", sets:"3 × 10 (her bacak)", muscle:"Quad, glute — unilateral squat pattern, diz dostu", how:["30-40cm yükseklik","Tüm ayak kutuya bas","Ön bacakla it — arka bacak yardım etmesin","Kontrollü in"], avoid:"Arka bacakla itmek", warn:"DİZ: Squat yerine geçen en güvenli alternatif. Menisküs için ideal unilateral hareket" },
        ]},

        { name: "🎯 YATAY ÇEKME + ARKA DELT", color: "#8338EC", exercises: [
          { name:"Inverted Row", sets:"4 × max", muscle:"Mid sırt, rhomboid, biceps, core — bodyweight pull", how:["Bar veya TRX — gövde düz","Gövdeyi barbell veya TRX'e çek","Göğüs bara değsin","Kontrollü in"], avoid:"Kalçanın sarkması — gövde düz" },
          { name:"Single Arm DB Row (Destekli)", sets:"3 × 8 (her taraf)", muscle:"Lat, mid trapez, rhomboid", how:["Bench veya dize yaslan — sırt düz","DB'yi karın altına doğru çek","Kürek kemiğini birleştir","Kontrollü indir"], avoid:"Rotasyon — sadece kol hareket eder", warn:"BEL FITIĞI: Destekli versiyon bel yükünü sıfıra indirir" },
          { name:"Face Pull (Band)", sets:"4 × 15", muscle:"Posterior delt, rotator cuff — omuz dengesi", how:["Bant göz hizasında","İki elle çek — dirsekler kulak hizasına","Bilekler geriye — dış rotasyon","1 sn tut"], avoid:"Boynu öne uzatma", warn:"ROTATOR CUFF: Her perşembe şart. Sağ omuz stabilitesinin temeli" },
        ]},

        { name: "🔄 LOKOMOSYON + CARRY", color: "#8B4513", exercises: [
          { name:"Bear Crawl", sets:"4 × 20m", muscle:"Omuz stabilite, core, quad, kondisyon", how:["Dört ayak — diz yerde değil (2-3cm yukarı)","Karşı el-ayak birlikte hareket","Kalça omuz hizasında — ne yukarı ne aşağı","Yavaş ve kontrollü — hız değil form"], avoid:"Kalçayı havaya kaldırmak" },
          { name:"Suitcase Carry (Tek El)", sets:"3 × 30m (her el)", muscle:"Core lateral stabilite, trapez, grip, QL", how:["Tek elde ağır DB veya KB","Vücut tam dik — yana eğilme","Omuz seviyesini eşit tut","Adımlar sabit, nefes al"], avoid:"Yana eğilmek — bu anti-lateral flexion egzersizi" },
        ]},

        { name: "🎯 CORE — Anti-Rotasyon + Rotasyon", color: "#6C63FF", exercises: [
          { name:"Pallof Press", sets:"3 × 10 (her taraf)", muscle:"Core anti-rotation — dirençli baskı", how:["Bant veya kablo yana bağlı","İki elle göğüs önünde tut","Düz it — dirençe karşı dur","Geri çek — dön"], avoid:"Gövdenin dönmesi", warn:"ROTASYON hareketi — haftalık 0'dan 6'ya çıktı" },
          { name:"Bird Dog", sets:"3 × 10 (her taraf)", muscle:"Erektör spinae, glute, core stabilite", how:["Dört ayak — nötral omurga","Sağ kol + sol bacak — eş zamanlı uzat","2 sn tut","Kontrollü geri gel"], avoid:"Beli döndürme veya bükme", warn:"BEL FITIĞI: Bel stabilizasyonunun temeli — her gün yapılabilir" },
          { name:"Hollow Body Hold", sets:"3 × 20sn", muscle:"Anterior core — kalisteniğin temeli", how:["Sırt üstü — bel yerde","Kollar kafa üstünde, bacaklar havada", "Sadece omuz kürek yerden kalkar","Vücut muz gibi"], avoid:"Beli yerden kaldırmak" },
        ]},

        { name: "⚡ KONDİSYON — AMRAP + Zone 2", color: "#990000", exercises: [
          { name:"AMRAP 8 Dakika", sets:"8 dakika × maksimum tur", muscle:"Full body — aerobik + anaerobik kondisyon", how:["Devre: 5 Push-up + 5 Squat + 5 Row + 20m Carry","Her hareketi temiz formla","Mümkün olduğu kadar tur","Son 2 dakikada tempoyu koru"], avoid:"Form bozulursa dur, dinlen, devam et" },
          { name:"Zone 2 Yürüyüş / Hafif Koşu", sets:"12 dakika sürekli", muscle:"Aerobik baz — kardiyovasküler kapasite", how:["Konuşabilecek tempo","Kalp hızı 130-145 bpm","Steady — değişmez tempo","Nefes kontrollü"], avoid:"Sprint veya zorlanma", warn:"Araştırma: Taktik atletin aerobik baz olmadan kondisyonu tavan yapar. AMRAP sonrası Zone 2 recovery baz kurar" },
        ]},

        { name: "❄️ SOĞUMA", color: "#2A9D8F", exercises: [
          { name:"Pigeon Pose", sets:"2 × 60sn (her taraf)", muscle:"Kalça dış rotasyon, piriformis", how:["Bir bacak önde 90°","Diğer bacak geriye uzat","Öne eğil — kalçayı hisset"], avoid:"Kalçayı yana kaçırma" },
          { name:"Doorway Chest Stretch", sets:"2 × 30sn", muscle:"Göğüs, ön delt — push sonrası şart", how:["Kapı kenarına kol yasla","Öne adım at — göğsü aç","Omuzların geriye gittiğini hisset"], avoid:"Boynu öne uzatma" },
        ]},
      ]
    },

    // ══════════════════════════════════════════════════════════════
    // GÜN 3 — CUMARTESİ: Fonksiyonel Güç
    // PUSH Dikey + PULL Dikey & Yatay + HINGE Unilateral + SQUAT + CARRY
    // ══════════════════════════════════════════════════════════════
    {
      id: 3, title: "GÜN 3", sub: "CUMARTESİ", focus: "Fonksiyonel Güç + Yük Taşıma", duration: "~90 dk", color: "#F4A261",
      type: "training",
      injury: "⚠️ BEL: RDL'de omurga nötral — ağır yükten kaçın. DİZ: Goblet Squat dizine uygun derinlikte. OMUZ: Wall Handstand ağrıda duvara yak. BOYUN: Handstand'da boyun nötral.",
      blocks: [
        { name: "🔥 ISINMA — Fonksiyonel Hazırlık", color: "#CC5500", exercises: [
          { name:"Chin Tuck", sets:"2 × 12", muscle:"Boyun stabilizasyonu", how:["Çeneni geriye it","2sn tut, bırak"], avoid:"Başı eğme" },
          { name:"Band Pull Apart", sets:"3 × 15", muscle:"Arka delt, rhomboid", how:["Bant öne — iki elle aç","1sn tut"], avoid:"Omuz kaldırma" },
          { name:"Hip Hinge Drill", sets:"2 × 10", muscle:"Posterior chain aktivasyonu — bel koruması", how:["Duvara yakın dur","Kalçanı geriye it — duvara değdir","Sırt düz, hamstring gerilimini hisset","Geri gel"], avoid:"Beli bükmek" },
          { name:"Single Leg Balance", sets:"2 × 30sn (her bacak)", muscle:"Ayak bileği, diz, kalça stabilite", how:["Tek ayak — hafif diz bükük","Gözler bir noktada sabit","Denge bozulursa küçük düzeltme"], avoid:"Tam düz diz" },
        ]},

        { name: "🤸 KALİSTENİK — L-sit + Handstand Skill (Önce)", color: "#F4A261", exercises: [
          { name:"Support Hold", sets:"3 × 20sn", muscle:"Triceps, ön delt, core basınç — L-sit temeli", how:["Paralel bar veya sandalye — kollar düz vücut kaldır","Omuzlar aşağı çek — kulağa değil","Ayaklar yerde başlangıçta","20sn tut — nefes al"], avoid:"Omuzları kulağa kaldırma" },
          { name:"Knee Tuck Hold", sets:"4 × 15sn", muscle:"Hip flexor, core, triceps basınç", how:["Support hold pozisyonundan","Dizleri göğse çek","15sn tut","Yavaşça indir"], avoid:"Öne eğilmek" },
          { name:"Hollow Body Hold", sets:"4 × 20sn", muscle:"Anterior core — kalisteniğin motoru", how:["Sırt üstü — bel yerde","Kollar kafa üstü, bacaklar 45°","Sadece omuz ve kalça yerden kalkar","Muz şekli"], avoid:"Beli kaldırmak" },
          { name:"Pike Push Up", sets:"4 × 8", muscle:"Ön delt dominant — handstand hazırlık", how:["V pozisyonu — kalça havada","Baş yere doğru — dirsekler dışa","İt — başlangıca dön"], avoid:"Boynu öne uzatmak" },
          { name:"Wall Handstand Hold", sets:"3 × 20sn", muscle:"Omuz stabilite, core, bilek — handstand temeli", how:["Yüz duvara — eller yere","Yavaşça yürüyerek ayakları duvara çıkar","Omuzlar aktif yukarı it","Gövde dik — bel bükmeden"], avoid:"Beli bükmek — vücut düz çizgi", warn:"🟡 OMUZ: Ağrıda daha yakından başla. Rotator cuff gücü yeterliyse güzel — değilse Pike Push Up'ta kal" },
        ]},

        { name: "🏋️ KUVVET — Unilateral Hinge + Squat + Overhead", color: "#F4A261", exercises: [
          { name:"Romanian Deadlift", sets:"4 × 8", muscle:"Hamstring, glute, sırt erektörü", how:["DB'ler önde — bacak boyunca indir","Kalça geriye — sırt düz","Hamstring gerilimini hisset","Geri kalk"], avoid:"Dizleri kilitlemek veya sırtı bükmek", warn:"🟡 BEL FITIĞI: Hafif yük, mükemmel form. Alt bel ağrısında dur" },
          { name:"Single Leg RDL", sets:"3 × 8 (her bacak)", muscle:"Hamstring, glute unilateral — denge ve koordinasyon", how:["Tek ayakta dur — hafif diz bükük","DB karşı elde veya iki elde","Öne eğil — arka bacak havaya","Hamstring hisset"], avoid:"Sırtı döndürmek", warn:"DİZ: Destek bacağın dizi sabit — içe çökmesin" },
          { name:"Goblet Squat (Ağır)", sets:"4 × 6", muscle:"Quad, glute — kuvvet odaklı", how:["Ağır KB göğüs önünde","Derin in — form önce","Topukla it"], avoid:"Dizlerin içe çökmesi" },
          { name:"Single Arm DB Press (Alternating)", sets:"4 × 8 (her taraf)", muscle:"Ön/orta delt, triceps, core anti-rotation", how:["Ayakta veya oturarak","Tek kol — alternatif","Gövde dik, core sıkı","Tam uzat, yavaş in"], avoid:"Gövdeyi yana eğmek", warn:"OMUZ: Oturarak yapmak boyun ve omzun daha güvenli pozisyonu" },
        ]},

        { name: "🎯 YATAY ÇEKME + ARKA DELT", color: "#1A3A5C", exercises: [
          { name:"Single Arm DB Row (Ağır)", sets:"4 × 6 (her taraf)", muscle:"Lat, mid sırt — unilateral güç", how:["Bench'e yaslan — sırt düz","Ağır DB — çek ve geri","Kürek kemiği birleştir"], avoid:"Rotation" },
          { name:"Face Pull (Band)", sets:"4 × 15", muscle:"Posterior delt, rotator cuff", how:["Göz hizasında çek","Dirsekler kulak hizası","Dış rotasyon — bilekler geriye"], avoid:"Boynu öne uzatmak", warn:"ROTATOR CUFF: Cumartesi de şart — üç günde üç kez face pull" },
          { name:"Prone External Rotation", sets:"3 × 12 (her taraf)", muscle:"Rotator cuff kasları", how:["Yüz üstü yat","Kol yana 90°","Yukarı kaldır, yavaş indir"], avoid:"Ağır yük" },
        ]},

        { name: "🔄 KOMPLİMENTER + CARRY", color: "#8B4513", exercises: [
          { name:"Sandbag / DB Complex", sets:"3 tur × dinlenmeden", muscle:"Tüm vücut — fonksiyonel dayanıklılık", how:["5 Deadlift + 5 Row + 5 Press + 5 Squat — aynı DB ile","Dinlenmeden geç","3 tur arası 90sn dinlenme","Orta ağırlık — form önce"], avoid:"Ağır yük — bu kondisyon kompleksi" },
          { name:"Double Farmer Carry", sets:"4 × 30m", muscle:"Grip, trapez, core, postür", how:["Ağır DB — dik dur","Adımlar kontrollü"], avoid:"Öne eğilmek" },
          { name:"Overhead Carry (Bir El)", sets:"3 × 20m (her el)", muscle:"Omuz stabilite, lateral core, lat aktif", how:["KB veya DB — kolun tam uzun","Omuz aktif — kulağa doğru it","Dik yürü — gövde stabil","Ağır değil — form önce"], avoid:"Kolun düşmesi", warn:"OMUZ: Ağrıda bu hareketi atla" },
        ]},

        { name: "🎯 CORE — Rotasyon + Lateral", color: "#6C63FF", exercises: [
          { name:"Landmine Rotation", sets:"3 × 8 (her taraf)", muscle:"Oblique, serratus, core rotasyon", how:["Barı köşeye daya","İki elle tut — yay gibi taşı","Kalçadan döndür — omuzlar çöker","Kontrollü geri gel"], avoid:"Belden değil kalçadan dön" },
          { name:"Copenhagen Plank (Sol)", sets:"2 × 20sn", muscle:"Sol adduktör, lateral core", how:["Yanlamasına yat","Üst bacak bench üzerinde","Kalçayı kaldır — düz çizgi"], avoid:"Kalçanın düşmesi" },
          { name:"Copenhagen Plank (Sağ)", sets:"2 × 20sn", muscle:"Sağ adduktör, lateral core", how:["Yanlamasına yat","Üst bacak bench üzerinde","Kalçayı kaldır"], avoid:"Kalçanın düşmesi" },
        ]},

        { name: "⚡ KONDİSYON — Yük Taşıma Devresi", color: "#990000", exercises: [
          { name:"Yük Taşıma Devresi", sets:"4 tur × 3 dk / 1 dk dinlenme", muscle:"Full body dayanıklılık — itfaiye/askeri simülasyon", how:["Farmer Carry 20m + Bear Crawl 10m + Goblet Squat 5 + Push-up 10","Dinlenmeden devre","Tur sonunda 1dk aktif dinlenme","4 tur"], avoid:"Form bozulursa dur" },
        ]},

        { name: "❄️ SOĞUMA", color: "#F4A261", exercises: [
          { name:"Thoracic Rotation Stretch", sets:"2 × 10 (her taraf)", muscle:"Torasik mobilite", how:["Yan yat — diz 90°","Üst kolu açarak döndür","Nefes ver, biraz daha aç"], avoid:"Belden döndürme" },
          { name:"Hip Flexor Stretch", sets:"2 × 60sn (her taraf)", muscle:"Psoas, kuadriseps", how:["Dizüstü pozisyon","Öne adım at — ön bacak 90°","Kalçayı öne it — kasıkta gerilim","Kolları kaldır"], avoid:"Beli bükmek" },
        ]},
      ]
    },

    // ══════════════════════════════════════════════════════════════
    // GÜN 4 — PAZAR: Dayanıklılık + Max Test
    // Tüm skill'lerin haftalık ölçümü + aerobik kondisyon
    // ══════════════════════════════════════════════════════════════
    {
      id: 4, title: "GÜN 4", sub: "PAZAR", focus: "Dayanıklılık Devresi + Max Test", duration: "~80 dk", color: "#8338EC",
      type: "training",
      injury: "⚠️ Max test günü — vücudu zorla ama acı verme. BEL: Ab Wheel yerine Dead Bug. DİZ: Jump Squat yerine Goblet Squat. BOYUN: Pull-up'ta strict form — kipping yok.",
      blocks: [
        { name: "🔥 ISINMA — Full Body Mobilizasyon", color: "#CC5500", exercises: [
          { name:"Easy Jog / Hızlı Yürüyüş", sets:"4 dakika sürekli", muscle:"Full body ısınma — eklemler ısınsın", how:["Hafif tempo","Nefes rahat","Kol salınımı doğal"], avoid:"Sprint" },
          { name:"Dynamic Stretching Flow", sets:"2 × 8 (her hareket)", muscle:"Tüm eklem mobilizasyonu", how:["Arm circles → Hip circles → Leg swings → Torso twist","Hızlı ve kontrollü","Her hareket 8 tekrar"], avoid:"Statik tutma — dinamik olsun" },
          { name:"Band Pull Apart", sets:"2 × 15", muscle:"Arka delt aktivasyonu", how:["Bant — aç ve geri gel"], avoid:"Omuz kaldırma" },
        ]},

        { name: "🏋️ PATLAYICI GÜÇ — Squat + Hinge + Press", color: "#8338EC", exercises: [
          { name:"KB Swing (Heavy)", sets:"5 × 10", muscle:"Posterior chain patlayıcı güç", how:["Ağır KB — maksimum hip extension","Patlayıcı kalça — kol pasif","Tam dik dur — glute sıkış","Kontrollü in"], avoid:"Squat'a benzetme" },
          { name:"Jump Squat", sets:"4 × 8", muscle:"Patlayıcı quad gücü — taktik hız", how:["Hafif ağırlık veya vücut ağırlığı","Hızlı in — patlayıcı yukarı zıpla","Yumuşak ini — topuk-orta-parmak","Hemen sonraki tekrara"], avoid:"Sert ini — diz absorbe etmeli", warn:"DİZ: Diz ağrıda Goblet Squat + Box Jump'a geç — ya da sadece Goblet Squat" },
          { name:"Push Press", sets:"3 × 5", muscle:"Tüm vücut — bacak + omuz + core koordinasyon", how:["DB'ler omuzda","Hafif diz bük — spring yap","Patlayıcı it — tam overhead","Kontrollü indir"], avoid:"Sadece kollarla itmek", warn:"OMUZ: Ağrıda Landmine Press'e geç" },
        ]},

        { name: "🤸 KALİSTENİK — Haftalık Max Test", color: "#8338EC", exercises: [
          { name:"Dead Hang Max Test", sets:"4 × max süre", muscle:"Grip, lat, omurga dekompresyonu", how:["Bardan asıl — overhand","Max süre tut — hile yok","Her seans kaydını al","Form bozulunca dur"], avoid:"Kipping veya kol bükme" },
          { name:"Pull Up Max Test", sets:"3 set × maksimum", muscle:"Lat, biceps, tüm çekme zinciri", how:["Overhand — strict form","Her tekrar tam — ölü asılmaya başla","Kipping yok — boyun fıtığı riski","Setler arası 3dk"], avoid:"Kipping — strict form şart", warn:"BOYUN FITIĞI: Kipping asla yapma — strict pull-up sadece" },
          { name:"Push Up Max Test", sets:"3 set × maksimum", muscle:"Göğüs, triceps, core", how:["Temiz form — göğüs yere","Gövde tahtası gibi","Yorulunca dur — hile yok"], avoid:"Kalçayı kaldırmak" },
          { name:"Dip Max Test", sets:"2 set × maksimum", muscle:"Triceps, alt göğüs", how:["Paralel bar — tam range","Temiz form","Yorulunca dur"], avoid:"Yarı tekrar" },
          { name:"Wall Handstand Hold Max Test", sets:"3 × max süre", muscle:"Omuz stabilite, core, bilek", how:["Yüz duvara — eller yere","Max süre tut","Her hafta kaydet"], avoid:"Beli bükmek" },
          { name:"Muscle-up Prep", sets:"3 × 5", muscle:"Pull + push geçişi — üst kalisteniğin zirvesi", how:["High pull-up + dip geçişi","Yavaş ve kontrollü","Bant yardımıyla başla","Form önce"], avoid:"Kipping veya güç kullanmak" },
        ]},

        { name: "⚡ KONDİSYON — Aerobik Devre", color: "#990000", exercises: [
          { name:"20 Dakika Sürekli Devre", sets:"20 dakika sürekli", muscle:"Full body aerobik kapasite — Zone 2 temposu", how:["Push-up 10 + Goblet Squat 10 + Inverted Row 10 + Carry 20m","Tempo sabit — tempo değiştirilmez","Konuşabilecek yoğunluk — Zone 2","Tüm 20 dakika boyunca"], avoid:"Yoğunluğu arttırma — aerobik baz kurulur Zone 2'de", warn:"Araştırma (FEMA/NSCA): Taktik atletin aerobik baz olmadan kondisyonu tavan yapar. Bu blok en önemli bloklardan biridir" },
        ]},

        { name: "🎯 ARKA DELT + CARRY — Haftalık Kapanış", color: "#1A3A5C", exercises: [
          { name:"Face Pull (Band)", sets:"3 × 15", muscle:"Rotator cuff, posterior delt", how:["Göz hizasında","Dış rotasyon"], avoid:"Boynu uzatmak", warn:"Pazar da face pull — haftada 4 kez. Rotator cuff için minimum" },
          { name:"Dead Bug", sets:"3 × 8 (her taraf)", muscle:"Core anti-extension — bel koruması", how:["Sırt üstü","Karşı kol-bacak","Bel yerde"], avoid:"Beli kaldırmak", warn:"BEL FITIĞI: Ab Wheel yerine Dead Bug. Her zaman" },
          { name:"Trap Bar / DB Shrug Carry", sets:"3 × 20m", muscle:"Trapez üst, rhomboid, postür yükü altında", how:["Ağır yük — yavaş yürü","Omuzlar geriye","Nefes al — sıkıştırma"], avoid:"Omuzları kulağa kaldırmak" },
        ]},

        { name: "❄️ SOĞUMA — Derin Esneme", color: "#8338EC", exercises: [
          { name:"Full Body Stretch", sets:"5-10 dakika", muscle:"Tüm kaslar — haftalık kapanış", how:["Quadriceps stretch 60sn","Hamstring seated reach 60sn","Lat doorway stretch 30sn","Chest opener 30sn","Neck side tilt 30sn her taraf"], avoid:"Gerginliği zorla arttırmak" },
        ]},
      ]
    },

    // ══════════════════════════════════════════════════════════════
    // OFF DAY — ÇARŞAMBA / CUMARTESİ ARALARINDAKİ GÜN
    // ══════════════════════════════════════════════════════════════
    {
      id: 5, title: "OFF DAY", sub: "OFF", focus: "Aktif Recovery", duration: "~30 dk", color: "#6C757D",
      type: "offday",
      injury: "Off day tam dinlenme veya çok hafif hareket. Ağır yük yok.",
      blocks: [
        { name: "🛌 AKTİF RECOVERY", color: "#6C757D", exercises: [
          { name:"Yürüyüş (Hızlı)", sets:"20 dakika sürekli", muscle:"Aerobik sistem — aktif recovery", how:["Rahat tempo","Konuşabilirsin","Park veya açık alan"], avoid:"Sprint veya yoğun tempo" },
          { name:"Foam Roller Full Body", sets:"5-10 dakika", muscle:"Kas doku kalitesi, laktik asit giderme", how:["Her büyük kas grubu 60-90sn","Ağrılı noktada kal","Yavaş hareket"], avoid:"Direkt kemik üzerinde kullanma" },
          { name:"Chin Tuck", sets:"2 × 15", muscle:"Boyun kasları — günlük bakım", how:["Çeneni geriye it","2sn tut"], avoid:"Başı eğme" },
          { name:"Band Pull Apart", sets:"2 × 15", muscle:"Arka delt günlük", how:["Bant — aç ve geri gel"], avoid:"Omuz kaldırma" },
          { name:"Hip 90/90 Stretch", sets:"2 × 60sn (her taraf)", muscle:"Kalça mobilite — antrenmanlar arası", how:["Yerde 90/90","Öne eğil, hisset"], avoid:"Zorlama" },
          { name:"Scapula Squeeze (Duvar Slide)", sets:"3 × 10", muscle:"Arka delt, rhomboid — günlük postür", how:["Sırta yaslan duvara","Kolları W'dan Y'ye sürükle","Bel duvarda"], avoid:"Belin duvardan kalkması" },
        ]},
      ]
    },

  ],
};
