const defaultAlt = (alts, alt_reasons) => ({ alts, alt_reasons });

const DEFAULT_EXERCISE_ALTERNATIVES = {
  "90/90 Hip Stretch": defaultAlt(["Pigeon Pose", "Supine Hip Rotation"], ["Aynı kalça kapsülü hedefi, daha pasif ve rahat", "Sırtüstü daha düşük eşik mobilite seçeneği"]),
  "90/90 Hip Switch": defaultAlt(["90/90 Hip Stretch", "Supine Hip Rotation"], ["Dinamik geçiş yorarsa statik kalça açılımı", "Bel-kalça kontrolünü daha kolay tutar"]),
  "Above Head Chest Stretch": defaultAlt(["Doorway Chest Stretch", "Wall Chest Stretch"], ["Göğüs önünü daha kontrollü açar", "Omuz açısı daha kolay ayarlanır"]),
  "Ankle Circles": defaultAlt(["Ankle Rocker", "Wall Tibialis Raise"], ["Daha fonksiyonel dorsifleksiyon hazırlığı", "Ayak bileği ön hattını aktif ısıtır"]),
  "Ankle Rocker": defaultAlt(["Ankle Mobility (duvara karşı)", "Ankle Circles"], ["Aynı dorsifleksiyon hedefini daha ölçülebilir yapar", "Daha hafif eklem dolaşımı seçeneği"]),
  "Band External Rotation": defaultAlt(["External Rotation (Towel/Yerçekimi)", "Cable External Rotation"], ["Band yoksa düşük yük cuff aktivasyonu", "Salonda daha ölçülebilir dış rotasyon"]),
  "Band Hip Abduction": defaultAlt(["Side-lying Hip Abduction", "Clamshell"], ["Bandsiz glute med alternatifi", "Kalça dış rotasyonunu daha düşük eşikte çalıştırır"]),
  "Band Pull Apart": defaultAlt(["Face Pull (hafif)", "Cable Reverse Fly"], ["Skapula ve arka omuz hedefini korur", "Salonda kontrollü arka omuz seçeneği"]),
  "Bear Crawl Hold": defaultAlt(["Dead Bug", "Tall Plank Shoulder Tap"], ["Bel-boyun yorulursa zeminde core kontrolü", "Omuz-core entegrasyonunu daha basit tutar"]),
  "Bird Dog": defaultAlt(["Dead Bug", "Pallof Press"], ["Anti-extension hattını daha stabil zeminde korur", "Anti-rotasyon hedefini ayakta/kabloda sürdürür"]),
  "Cat-Cow Mobilite": defaultAlt(["Child's Pose to Cobra Pose", "Supine Spinal Twist"], ["Omurga akışını daha geniş ama kontrollü taşır", "Bel hassassa daha pasif rahatlatma"]),
  "Child's Pose": defaultAlt(["Latissimus Stretch Assisted", "Supine Spinal Twist"], ["Lat ve torasik hattı daha hedefli açar", "Bel rahatlatmayı sırtüstü yapar"]),
  "Chin Tuck": defaultAlt(["SCM Stretch", "Neck Side Stretch"], ["Boyun ön-yan hattını gevşetir", "Servikal gerilimi düşük dozda azaltır"]),
  "Couch Stretch": defaultAlt(["Half Kneeling Hip Flexor Stretch", "Standing Quad Stretch"], ["Kalça fleksörü hedefini dizde daha az basınçla verir", "Diz rahatsızsa ayakta daha güvenli"]),
  "Crocodile Breathing": defaultAlt(["Diaphragmatic Breathing", "90/90 Breathing"], ["Aynı diyafram hedefi, pozisyon daha kolay", "Bel rahatken kaburga-pelvis kontrolü daha net"]),
  "Dead Bug": defaultAlt(["Bird Dog", "Pallof Press"], ["Sırtüstü zor gelirse dört ayak stabilite", "Core hedefini anti-rotasyon yönüne taşır"]),
  "Doorway Chest Stretch": defaultAlt(["Wall Chest Stretch", "Above Head Chest Stretch"], ["Omuz açısını daha kolay ayarlatır", "Göğüs-lat hattını birlikte rahatlatır"]),
  "External Rotation (Towel/Yerçekimi)": defaultAlt(["Band External Rotation", "Cable External Rotation"], ["Band varsa cuff aktivasyonu daha net", "Salonda yükü daha ölçülebilir yapar"]),
  "Foam Roller Upper Back Roll": defaultAlt(["Bench Thoracic Extension", "Open Book Stretch"], ["Torasik ekstansiyonu daha kontrollü verir", "Rotasyonla torasik hareketi korur"]),
  "Glute Bridge": defaultAlt(["Banded Glute Bridge", "Floor Bridge"], ["Band varsa glute med katkısı ekler", "Aynı paternin en sade regresyonu"]),
  "Hip Circle": defaultAlt(["90/90 Hip Switch", "World Greatest Stretch"], ["Kalça rotasyonunu daha kontrollü yapar", "Kalça-torasik hazırlığı tek akışta toplar"]),
  "Hip Hinge Drill": defaultAlt(["Good Morning (vücut ağırlığı)", "Romanian Deadlift (çok hafif)"], ["Yüksüz hinge pratiği", "Form oturduysa hafif yükle aynı patern"]),
  "Incline Walk": defaultAlt(["Hızlı Yürüyüş", "Stationary Bike"], ["Dışarıda aynı düşük darbeli aerobik hedef", "Ayak bileği/diz yorulursa bike daha stabil"]),
  "Latissimus Stretch Assisted": defaultAlt(["Prayer Pose on Bench", "Chair Lat Stretch"], ["Aynı lat açısını bench üstünde verir", "Daha basit destekli lat açılımı"]),
  "Leg Press Groove Set": defaultAlt(["Wall Sit", "Goblet Squat (ağırlıksız)"], ["Diz hassassa izometrik çizgi kontrolü", "Makine yoksa kısa ROM hareket provası"]),
  "Neck Side Stretch": defaultAlt(["Upper Trap Stretch", "SCM Stretch"], ["Boyun-üst trapez hattı için yakın alternatif", "Ön-yan boyun gerginliğini azaltır"]),
  "Open Book Stretch": defaultAlt(["Supine Spinal Twist", "Thoracic Extension"], ["Rotasyonu daha pasif ve rahatlatıcı yapar", "Torasik ekstansiyon hedefi öne çıkarsa"]),
  "Pallof Alternatifi: Side Plank": defaultAlt(["Pallof Press", "Dead Bug"], ["Ekipman varsa asıl anti-rotasyon seçeneği", "Yorgun günde daha düşük eşik core"]),
  "Pallof Press": defaultAlt(["Side Plank", "Dead Bug"], ["Kablo/band yoksa lateral core hedefi", "Bel-boyun hassassa zeminde stabilite"]),
  "Prone Cobra": defaultAlt(["Band Pull Apart", "Face Pull (hafif)"], ["Skapula retraksiyonunu daha dinamik çalıştırır", "Salonda arka omuz ve alt trapez desteği"]),
  "Rahat Yürüyüş": defaultAlt(["Hızlı Yürüyüş", "Stationary Bike"], ["Gün iyi hissediliyorsa aynı hedefin canlı versiyonu", "Düşük darbeli salon alternatifi"]),
  "Scapular Pulldown": defaultAlt(["Straight Arm Pulldown", "Band Straight Arm Pulldown"], ["Lat-skapula depresyonunu daha belirgin yapar", "Kablo yoksa bandla aynı patern"]),
  "Scapular Push-up": defaultAlt(["Scapular Wall Slide", "Band Pull Apart"], ["Omuz yükünü azaltarak skapula kontrolü", "Arka omuz ve retraksiyon desteği"]),
  "Scapular Wall Slide": defaultAlt(["Band Pull Apart", "Scapular Push-up"], ["Skapula kontrolünü arka omuzla destekler", "Serratus hedefini yerde korur"]),
  "Shoulder CARs": defaultAlt(["Scapular Wall Slide", "Band Pull Apart"], ["Omuz dairesi sıkıştırıyorsa daha doğrusal kontrol", "Arka omuz-skapula hazırlığı"]),
  "Side Plank": defaultAlt(["Dead Bug", "Pallof Press"], ["Lateral hat yorarsa daha düşük eşik core", "Ekipman varsa anti-rotasyon alternatifi"]),
  "Side-lying Hip Abduction": defaultAlt(["Band Hip Abduction", "Clamshell"], ["Salonda/bandla glute med yükü", "Daha küçük ROM kalça stabilite seçeneği"]),
  "Soleus Stretch (diz bükülü)": defaultAlt(["Standing Calf Stretch", "Ankle Mobility (duvara karşı)"], ["Baldır hattını daha genel rahatlatır", "Ayak bileği açısını daha aktif taşır"]),
  "Standing Calf Raise": defaultAlt(["Single Leg Calf Raise", "Straight Leg Calf Raise"], ["Ekipman yoksa tek taraflı progresyon", "Torso Limbs calf hattını korur"]),
  "Standing Calf Stretch": defaultAlt(["Soleus Stretch (diz bükülü)", "Kettlebell Ankle Static Stretch"], ["Diz bükülü soleus odağı", "Ayak bileği dorsifleksiyonunu daha hedefli açar"]),
  "Stationary Bike": defaultAlt(["Incline Walk", "Hızlı Yürüyüş"], ["Bike doluysa düşük darbeli salon alternatifi", "Dışarıda aynı Zone 2 hedefi"]),
  "Supine Hamstring Stretch": defaultAlt(["Lying Hamstring Stretch w/ Band", "Hamstring Stretch"], ["Bandla arka bacağı daha kontrollü açar", "Aynı hedefin daha sade versiyonu"]),
  "Supine Spinal Twist": defaultAlt(["Open Book Stretch", "90/90 Hip Stretch"], ["Torasik rotasyonu daha aktif kontrol eder", "Bel rahatlatmayı kalça kapsülüne taşır"]),
  "Upper Trap Stretch": defaultAlt(["Neck Side Stretch", "SCM Stretch"], ["Aynı boyun yan hat rahatlatma", "Ön-yan boyun gerginliği baskınsa"]),
  "Wall Tibialis Raise": defaultAlt(["Ankle Rocker", "Standing Calf Raise"], ["Ayak bileği hazırlığını hareket açıklığına taşır", "Alt bacak aktivasyonunu posterior hatta dengeler"]),
  "World Greatest Stretch": defaultAlt(["90/90 Hip Switch", "Open Book Stretch"], ["Kalça rotasyonu hedefini daha kontrollü yapar", "Torasik rotasyonu diz yükü olmadan korur"]),
  "Wrist Circles": defaultAlt(["Wrist Rotation", "Wrist Flexion & Extension"], ["Aynı bilek ısısını farklı isimle korur", "Bilek fleksiyon-ekstansiyon hazırlığını netleştirir"]),
};

const ex = (name, sets, muscle, how, options = {}) => {
  const defaults = DEFAULT_EXERCISE_ALTERNATIVES[name] || {};
  const alts = options.alts?.length ? options.alts : (defaults.alts || []);
  const alt_reasons = options.alt_reasons?.length ? options.alt_reasons : (defaults.alt_reasons || []);

  return ({
  name,
  sets,
  muscle,
  how,
  avoid: options.avoid || null,
  warn: options.warn || null,
  alts,
  alt_reasons,
  // `unilateral: true` tells the UI to surface the right-side asymmetry
  // protocol inline on this exercise (badge + inline hint). Only set
  // for strength unilateral work where left/right performance gap
  // matters — not for side-plank / dead-bug / bird-dog style "each
  // side" core work where stability is the point, not asymmetric load.
  unilateral: options.unilateral || false,
  trackable: options.trackable,
});
};

const passiveEx = (name, sets, muscle, how, options = {}) => ex(name, sets, muscle, how, {
  ...options,
  trackable: false,
});

const block = (name, color, exercises) => ({ name, color, exercises });

const offdayCooldownBlock = () => block("🧊 SOĞUMA — Sinir Sistemi Kapat", "#264653", [
  passiveEx("Supine Spinal Twist", "2 × 5 nefes (her taraf)", "Bel + torasik rahatlama", ["Dizleri yumuşak bırak", "Nefesi uzat", "Zorlama yok"], { warn: "Amaç gevşemek; mobilite kazanmak için bastırma" }),
  passiveEx("Neck Side Stretch", "2 × 20sn (her taraf)", "Boyun yan hat", ["Omzu aşağıda tut", "Çekişi hafif bırak"]),
]);

const upperCooldownBlock = () => block("🧊 SOĞUMA — Üst Gövde Boşalt", "#264653", [
  passiveEx("Latissimus Stretch Assisted", "2 × 25sn", "Lat + torasik yan hat", ["Kalçayı geriye al", "Boynu serbest bırak"]),
  passiveEx("Doorway Chest Stretch", "2 × 25sn", "Göğüs önü", ["Kaburgayı dışarı itme", "Omuzu sıkıştırma"]),
  passiveEx("Neck Side Stretch", "2 × 20sn (her taraf)", "Boyun + üst trapez", ["Omuzu kulağa çekme", "Nefesi uzat"]),
]);

const lowerCooldownBlock = () => block("🧊 SOĞUMA — Alt Gövde Boşalt", "#264653", [
  passiveEx("Couch Stretch", "2 × 25sn (her taraf)", "Kalça fleksör + quad", ["Pelvisi hafif içeri al", "Dizi rahatsız etme"]),
  passiveEx("Supine Hamstring Stretch", "2 × 25sn (her taraf)", "Arka bacak", ["Dizi hafif yumuşak tut", "Çekişi agresif yapma"]),
  passiveEx("Soleus Stretch (diz bükülü)", "2 × 20sn (her taraf)", "Soleus + ayak bileği", ["Diz hafif bükülü", "Topuk yerde"]),
]);

const volumeCooldownBlock = () => block("🧊 SOĞUMA — Full Body Kapat", "#264653", [
  passiveEx("90/90 Hip Stretch", "2 × 25sn (her taraf)", "Kalça kapsülü", ["Nazik açıl", "Ağrısız aralıkta kal"]),
  passiveEx("Above Head Chest Stretch", "2 × 25sn", "Göğüs + lat", ["Kaburga kapalı", "Omuzu sıkıştırma"]),
  passiveEx("Supine Spinal Twist", "2 × 5 nefes (her taraf)", "Bel + nefes", ["Nefesi uzat", "Sistemi sakin kapat"]),
]);

const recoveryCooldownBlock = () => block("🧊 SOĞUMA — Zone 2 Kapat", "#264653", [
  passiveEx("Standing Calf Stretch", "2 × 25sn (her taraf)", "Calf", ["Topuk yerde", "Nefesi uzat"]),
  passiveEx("Child's Pose", "2 × 5 nefes", "Bel + nefes", ["Nefesi uzat", "Omuzları yumuşat"]),
  passiveEx("Doorway Chest Stretch", "2 × 20sn", "Göğüs önü", ["Kaburga kapalı", "Omzu sıkıştırma"]),
]);

const recoveryWarmupBlock = () => block("🔥 ISINMA — Zone 2 Hazırlık", "#CC5500", [
  passiveEx("Rahat Yürüyüş", "4-5 dakika", "Nabız yükseltme", ["RPE 3-4", "Adımı rahat tut"]),
  passiveEx("Ankle Circles", "2 × 8 (her taraf)", "Ayak bileği", ["Yavaş daire", "Ağrı yok"]),
  passiveEx("Standing Calf Raise", "2 × 10", "Alt bacak aktivasyon", ["Üstte kısa dur", "Kontrollü indir"]),
]);

const zone2GymWarmupBlock = () => block("🔥 ISINMA — Zone 2 Hazırlık", "#CC5500", [
  passiveEx("Stationary Bike", "4-5 dakika kolay", "Nabız yükseltme", ["RPE 3-4", "Diz rahat dönsün"]),
  passiveEx("Ankle Circles", "2 × 8 (her taraf)", "Ayak bileği", ["Yavaş daire", "Ağrı yok"]),
  passiveEx("Standing Calf Raise", "2 × 10", "Alt bacak aktivasyon", ["Üstte kısa dur", "Kontrollü indir"]),
]);

const longZone2HomeWarmupBlock = () => block("🔥 ISINMA — Uzun Zone 2 Hazırlık", "#CC5500", [
  passiveEx("Rahat Yürüyüş", "5 dakika", "Nabız yükseltme", ["RPE 3-4", "Adımı yumuşat"]),
  passiveEx("Hip Circle", "2 × 8 (her taraf)", "Kalça hazırlık", ["Belden değil kalçadan dön"]),
  passiveEx("Standing Calf Raise", "2 × 10", "Alt bacak aktivasyon", ["Üstte kısa dur", "Kontrollü indir"]),
]);

const longZone2GymWarmupBlock = () => block("🔥 ISINMA — Uzun Zone 2 Hazırlık", "#CC5500", [
  passiveEx("Incline Walk", "5 dakika kolay", "Genel ısı", ["RPE 3-4", "Darbe yok"]),
  passiveEx("Hip Circle", "2 × 8 (her taraf)", "Kalça hazırlık", ["Belden değil kalçadan dön"]),
  passiveEx("Standing Calf Raise", "2 × 10", "Alt bacak aktivasyon", ["Üstte kısa dur", "Kontrollü indir"]),
]);

const longZone2CooldownBlock = () => block("🧘 ESNEME — Uzun Kapat", "#264653", [
  passiveEx("Couch Stretch", "2 × 30sn (her taraf)", "Kalça fleksör + quad", ["Pelvisi hafif içeri al", "Dizi rahatsız etme"]),
  passiveEx("Supine Hamstring Stretch", "2 × 30sn (her taraf)", "Arka bacak", ["Dizi hafif yumuşak tut", "Agresif çekme yok"]),
  passiveEx("Standing Calf Stretch", "2 × 30sn (her taraf)", "Calf", ["Topuk yerde", "Nefesi uzat"]),
  passiveEx("Latissimus Stretch Assisted", "2 × 25sn", "Lat + torasik yan hat", ["Omuzları gevşet", "Boynu serbest bırak"]),
  passiveEx("Child's Pose", "2 × 5 nefes", "Toparlanma nefesi", ["Nefesi uzat", "Sistemi sakin kapat"]),
]);

const sundayActiveRecoveryBlock = () => block("🛡 BAKIM + AKTİF MOBİLİTE — Core + Eklem", "#2A9D8F", [
  passiveEx("Open Book Stretch", "2 × 6 (her taraf)", "Torasik rotasyon", ["Kalçayı sabit tut", "Nefesle dön", "Boynu zorlamadan izle"]),
  passiveEx("Bird Dog", "2 × 6 (her taraf)", "Anti-rotasyon + bel kontrolü", ["Yavaş uzat", "Bel sabit", "Boyun nötr"]),
  passiveEx("Prone Cobra", "2 × 8-10", "Alt trapez + postür", ["Göğsü hafif kaldır", "Kürekleri geriye-aşağı topla", "Belden aşırı kalkma"], { warn: "Kifoz/postür desteği; boyun geriye kırılmaz" }),
  passiveEx("Ankle Circles", "2 × 8 (her taraf)", "Ayak bileği dolaşımı", ["Yavaş daire", "Ağrı yok", "Baldırı sıkma"]),
]);

const torsoWarmupHomeBlock = () => block("🔥 ISINMA — Torso Hazırlık", "#CC5500", [
  passiveEx("Cat-Cow Mobilite", "2 × 6", "Omurga ritmi", ["Nefesle ak", "Boynu nötr tut"]),
  passiveEx("Open Book Stretch", "2 × 6 (her taraf)", "Torasik rotasyon", ["Kalçayı sabit tut", "Ağrısız dön"]),
  passiveEx("Shoulder CARs", "2 × 4 (her taraf)", "Omuz kapsülü", ["Küçük ve kontrollü daire", "Sıkışma yok"]),
  passiveEx("Wrist Circles", "2 × 20sn", "Bilek hazırlığı", ["Kontrollü daireler"]),
]);

const torsoWarmupGymBlock = () => block("🔥 ISINMA — Torso Hazırlık", "#CC5500", [
  passiveEx("Foam Roller Upper Back Roll", "2 × 25sn", "Torasik ekstansiyon", ["Kısa geçişler", "Belden yuvarlanma"]),
  passiveEx("Open Book Stretch", "2 × 6 (her taraf)", "Torasik rotasyon", ["Kalçayı sabit tut", "Ağrısız dön"]),
  passiveEx("Band Pull Apart", "2 × 12", "Skapula + arka omuz", ["Kaburga kapalı", "Omzu kulağa çekme"]),
]);

const lowerWarmupHomeBlock = () => block("🔥 ISINMA — Alt Gövde Hazırlık", "#CC5500", [
  passiveEx("World Greatest Stretch", "2 × 4 (her taraf)", "Kalça + torasik açılım", ["Kısa ROM", "Dizi zorlamadan dön"]),
  passiveEx("90/90 Hip Switch", "2 × 6 (her taraf)", "Kalça rotasyonu", ["Gövdeden kopma", "Ağrı yok"]),
  passiveEx("Ankle Rocker", "2 × 8 (her taraf)", "Ayak bileği", ["Dizi ağrısız öne taşı"]),
]);

const lowerWarmupGymBlock = () => block("🔥 ISINMA — Alt Gövde Hazırlık", "#CC5500", [
  passiveEx("Stationary Bike", "5 dakika kolay", "Diz kanlanma + genel ısı", ["RPE 3-4", "Kadans rahat"]),
  passiveEx("90/90 Hip Switch", "2 × 6 (her taraf)", "Kalça rotasyonu", ["Nazik dön", "Ağrı yok"]),
  passiveEx("Ankle Rocker", "2 × 8 (her taraf)", "Ayak bileği", ["Topuk yerde", "Diz çizgisini koru"]),
]);

const athleticWarmupHomeBlock = () => block("🔥 ISINMA — Athletic Hazırlık", "#CC5500", [
  passiveEx("World Greatest Stretch", "2 × 4 (her taraf)", "Full body mobilite", ["Akıcı ilerle", "Ağrısız aralık"]),
  passiveEx("Bear Crawl Hold", "2 × 15sn", "Omuz + core entegrasyon", ["Yeri aktif it", "Bel çukurunu büyütme"]),
  passiveEx("Wrist Circles", "2 × 20sn", "Bilek + support hazırlık", ["Kontrollü daireler", "Ağrı yok"]),
]);

const athleticWarmupGymBlock = () => block("🔥 ISINMA — Athletic Hazırlık", "#CC5500", [
  passiveEx("Incline Walk", "4 dakika kolay", "Genel ısı", ["RPE 3-4", "Kademeli aç"]),
  passiveEx("World Greatest Stretch", "2 × 4 (her taraf)", "Full body mobilite", ["Akıcı ilerle", "Dizi zorlamadan dön"]),
  passiveEx("Band Pull Apart", "2 × 12", "Skapula hazırlık", ["Kaburga kapalı", "Omuzlar aşağıda"]),
]);

const careBlockHome = () => block("🛡 BAKIM — Omuz & Boyun", "#7B241C", [
  passiveEx("External Rotation (Towel/Yerçekimi)", "2 × 15", "Rotator cuff", ["Tempo yavaş", "Omuz başını öne kaçırma"]),
  passiveEx("Scapular Wall Slide", "2 × 10", "Skapula kontrolü", ["Kaburgayı içerde tut"]),
  passiveEx("Chin Tuck", "2 × 12", "Boyun stabilite", ["Boynu nötrle", "2 sn tut"]),
]);

const careBlockGym = () => block("🛡 BAKIM — Omuz & Boyun", "#7B241C", [
  passiveEx("Band External Rotation", "2 × 15", "Rotator cuff", ["Dirseği sabit tut", "Yavaş aç-kapat"]),
  passiveEx("Scapular Wall Slide", "2 × 10", "Skapula kontrolü", ["Kaburgayı dışarı kaçırma", "Yavaş tempo"]),
  passiveEx("Chin Tuck", "2 × 12", "Boyun stabilite", ["2 sn tut", "Boynu nötral hisset"]),
]);

const lowerCareBlockHome = () => block("🛡 BAKIM — Diz + Kalça", "#7B241C", [
  passiveEx("Wall Tibialis Raise", "2 × 12-15", "Tibialis anterior", ["Topuklar yerde", "Parmak uçlarını yukarı çek"]),
  passiveEx("Side-lying Hip Abduction", "2 × 10-12 (her taraf)", "Glute med + pelvis kontrolü", ["Kalçayı geriye devirmeden kaldır", "Tempo sakin"]),
  passiveEx("Glute Bridge", "2 × 10", "Glute aktivasyon", ["Belden değil kalçadan it", "Üstte 1 sn sık"]),
]);

const lowerCareBlockGym = () => block("🛡 BAKIM — Diz + Kalça", "#7B241C", [
  passiveEx("Wall Tibialis Raise", "2 × 12-15", "Tibialis anterior", ["Parmak uçlarını yukarı çek", "Sekme yok"]),
  passiveEx("Band Hip Abduction", "2 × 12-15", "Glute med + diz hattı", ["Dizleri dışa aç", "Belden sallanma"]),
  passiveEx("Glute Bridge", "2 × 10", "Glute aktivasyon", ["Kaburga kapalı", "Belden itme"]),
]);

const fullBodyCareHomeBlock = () => block("🛡 BAKIM — Omuz + Kalça Bağlantı", "#7B241C", [
  passiveEx("External Rotation (Towel/Yerçekimi)", "2 × 12", "Rotator cuff", ["Dirsek sabit", "Tempo yavaş"]),
  passiveEx("Side-lying Hip Abduction", "2 × 10 (her taraf)", "Glute med", ["Kalçayı sabit tut", "Kısa temiz ROM"]),
  passiveEx("Scapular Push-up", "2 × 8", "Serratus + skapula", ["Dirsekleri bükme", "Yeri aktif it"]),
]);

const fullBodyCareGymBlock = () => block("🛡 BAKIM — Omuz + Kalça Bağlantı", "#7B241C", [
  passiveEx("Band External Rotation", "2 × 12", "Rotator cuff", ["Dirsek sabit", "Yavaş aç-kapat"]),
  passiveEx("Band Hip Abduction", "2 × 12", "Glute med", ["Diz çizgisini koru", "Belden sallanma"]),
  passiveEx("Scapular Push-up", "2 × 8", "Serratus + skapula", ["Dirsekleri bükme", "Yeri aktif it"]),
]);

const ATHLETIC_HYBRID_DAYS = [
  {
    id: 1,
    sub: "PAZARTESİ",
    focus: "Reset + Mobilite",
    type: "offday",
    color: "#2A9D8F",
    intent: "Haftaya yükle değil; eklem, nefes ve sinir sistemini düzenleyerek gir.",
    variants: {
      home: {
        duration: "~18 dk",
        aerobicMinutes: 0,
        modeNote: "Ev versiyonu: tam dinlenme ana seçenek; sadece kısa reset yeterli.",
        injury: "⚠️ Bugün kuvvet yok. Ağrı varsa hareket aralığını küçült ve yürüyüşü opsiyonel bırak.",
        blocks: [
          block("🧩 RESET — Nefes + Mobilite", "#2A9D8F", [
            passiveEx("Crocodile Breathing", "2 × 5 nefes", "Diyafram + kaburga kontrolü", ["Yüzüstü yat", "Nefesi bele ve yan kaburgaya gönder", "Boynu gevşek tut"]),
            passiveEx("Cat-Cow Mobilite", "2 × 6-8", "Omurga hazırlık", ["Acele etme", "Bel-boynu zorlamadan ak"]),
            passiveEx("90/90 Hip Switch", "2 × 6 (her taraf)", "Kalça rotasyonu", ["Gövdeden kopma", "Ağrısız aralıkta kal"]),
            passiveEx("Shoulder CARs", "2 × 5 (her taraf)", "Omuz kapsülü", ["Küçük ve kontrollü daire", "Omzu kulağa sıkıştırma"]),
          ]),
          block("🛡 BAKIM — Eklem Hijyeni", "#7B241C", [
            passiveEx("Chin Tuck", "2 × 10", "Boyun stabilite", ["Çeneyi hafif geri al", "2 sn tut", "Boynu aşağı kırma"]),
            passiveEx("Scapular Wall Slide", "2 × 8-10", "Skapula kontrolü", ["Kaburgayı kapalı tut", "Yavaş kay"]),
            passiveEx("Wall Tibialis Raise", "2 × 12-15", "Tibialis anterior", ["Topuklar yerde", "Parmak uçlarını yukarı çek"]),
          ]),
          block("🚶 OPSİYONEL AKIŞ", "#990000", [
            passiveEx("Rahat Yürüyüş", "10-15 dakika", "Kan akışı", ["RPE 3-4", "Ter kovalamadan açıl"], { warn: "Yorgunsan tamamen atla" }),
          ]),
          offdayCooldownBlock(),
        ],
      },
      gym: {
        duration: "~20 dk",
        aerobicMinutes: 0,
        modeNote: "Macfit versiyonu: salona gitsen de bugün yüklenme yok; reset günü.",
        injury: "⚠️ Makine veya ağırlık ekleme. Amaç yarına hazır kalmak.",
        blocks: [
          block("🧩 RESET — Nefes + Mobilite", "#2A9D8F", [
            passiveEx("Crocodile Breathing", "2 × 5 nefes", "Diyafram + kaburga kontrolü", ["Nefesi uzat", "Omuzları gevşet"]),
            passiveEx("Foam Roller Upper Back Roll", "2 × 30sn", "Torasik hazırlık", ["Kısa geçişler", "Belden yuvarlanma"]),
            passiveEx("90/90 Hip Switch", "2 × 6 (her taraf)", "Kalça rotasyonu", ["Nazik dön", "Ağrı yok"]),
          ]),
          block("🛡 BAKIM — Eklem Hijyeni", "#7B241C", [
            passiveEx("Shoulder CARs", "2 × 4 (her taraf)", "Omuz kapsülü", ["Küçük ve kontrollü daire", "Sıkışma yok"]),
            passiveEx("Scapular Wall Slide", "2 × 8-10", "Skapula kontrolü", ["Kaburga kapalı", "Boyun uzun"]),
            passiveEx("Wall Tibialis Raise", "2 × 12-15", "Tibialis anterior", ["Hareketi sekmeden bitir"]),
          ]),
          block("🚴 OPSİYONEL AKIŞ", "#990000", [
            passiveEx("Stationary Bike", "10-15 dakika", "Kan akışı", ["RPE 3-4", "Diz rahat dönsün"], { warn: "Yorgunsan tamamen atla" }),
          ]),
          offdayCooldownBlock(),
        ],
      },
    },
  },
  {
    id: 2,
    sub: "SALI",
    focus: "Torso Kuvvet + Kontrollü Power",
    type: "training",
    color: "#D41920",
    intent: "Haftanın taze gününde göğüs-sırt kuvveti, postür ve omuz dostu power çalışılır.",
    variants: {
      home: {
        duration: "~65 dk",
        aerobicMinutes: 15,
        modeNote: "Ev versiyonu: tek DB ve vücut ağırlığıyla ölçülebilir torso kuvvet günü.",
        injury: "⚠️ Omuz ağrısı 3/10 üstüyse power ve pike'ı çıkar; row + incline press + core ile kal.",
        blocks: [
          torsoWarmupHomeBlock(),
          careBlockHome(),
          block("🤸 TEKNİK — Skapula + Overhead Temas", "#8338EC", [
            passiveEx("Scapular Push-up", "2 × 8-10", "Serratus + skapula", ["Dirsekleri bükme", "Yeri aktif it"]),
            ex("Pike Hold", "2 × 10-15sn", "Omuz + core", ["Kaburgayı kapat", "Boynu nötr tut"], { warn: "Skill değil teknik temas; ağrı varsa downward dog'a dön", alts: ["Downward Dog Hold"], alt_reasons: ["Omuz açısını yumuşatıp aynı teknik teması korur"] }),
          ]),
          block("⚡ POWER — Üst Gövde Hız", "#FFD166", [
            ex("Speed Incline Push-up", "3 × 5", "Patlayıcı itiş", ["İniş kontrollü", "İtiş hızlı", "Failure yok"], { warn: "Hafta 1'de 2 set veya atla. Omuz iyi değilse çıkar.", alts: ["Wall Push-up Explosive"], alt_reasons: ["Açıyı yükseltmek omuz stresini düşürür"] }),
          ]),
          block("💪 KUVVET — Torso Ana İş", "#F4A261", [
            ex("Inverted Row (Masa Altı)", "4 × 6-10", "Sırt + biceps", ["Göğsü masaya çek", "Boynu öne uzatma", "Üstte 1 sn sık"], { warn: "Ana çekiş; RIR 2 bırak", alts: ["Tek Kol DB Row (5-8kg)", "Towel Row (Ayak Dirençli)"], alt_reasons: ["Dumbbell varsa yük ölçümü daha net", "Masa güvenli değilse towel row kullan"] }),
            ex("Incline Push-up", "4 × 8-12", "Göğüs + triceps", ["Dirsek 30-45°", "Omuz öne düşmesin", "Temiz ROM"], { warn: "Ana press; RIR 2 bırak", alts: ["DB Floor Press (tek kol)", "Wall Push-up"], alt_reasons: ["Tek DB ile omuz dostu press", "Omuz hassassa açıyı yükselt"] }),
            ex("Tek Kol DB Row", "3 × 10-12 (her taraf)", "Lat + upper back", ["Bench/masa desteği al", "Dirseği kalçaya çek", "3 sn kontrollü indir"], { warn: "Torso hacmi ve postür desteği", unilateral: true, alts: ["Inverted Row (Masa Altı)", "Towel Row (Ayak Dirençli)", "Chest Supported Row"], alt_reasons: ["Vücut ağırlığıyla aynı yatay çekiş hattı", "Masa güvenli değilse ekipmansız çekiş", "Salondaysan Torso Limbs row slotu"] }),
            ex("DB Floor Press (tek kol)", "3 × 8-10 (her taraf)", "Göğüs + triceps", ["Omuzu yere yerleştir", "Dirseği kontrollü indir", "Kaburga kapalı"], { warn: "Push hacmi; omuzda sıkışma varsa incline push-up'a dön", unilateral: true, alts: ["Incline Push-up", "Plate Loaded Flat Chest Press"], alt_reasons: ["Evde omuz açısını kolaylaştırır", "Salondaysan stabil makine press alternatifi"] }),
            ex("DB Lateral Raise", "2 × 12-15", "Yan omuz", ["Hafif yük", "Skapular planda kaldır", "Ağrısız aralık"], { warn: "Atletik görüntü için küçük hacim; failure yok", alts: ["Seated Lateral Raise Machine", "Standing Single Arm Lateral Raise"], alt_reasons: ["Torso Limbs'teki stabil yan omuz seçeneği", "Kabloyla tek taraflı omuz hattı"] }),
          ]),
          block("🧠 CORE + KONDİSYON", "#1F618D", [
            passiveEx("Dead Bug", "2 × 8-10 (her taraf)", "Anti-extension core", ["Bel boşluğunu sabit tut", "Yavaş uzat"]),
            ex("Hızlı Yürüyüş", "15 dakika Zone 2", "Aerobik baz", ["RPE 5", "Konuşabilir tempo"], { warn: "Kuvvet sonrası kısa dayanıklılık dokunuşu", alts: ["Incline Walk", "Stationary Bike"], alt_reasons: ["Düşük darbeli salon yürüyüşü", "Diz/ayak bileği yorgunsa bike daha stabil"] }),
          ]),
          upperCooldownBlock(),
        ],
      },
      gym: {
        duration: "~70 dk",
        aerobicMinutes: 15,
        modeNote: "Macfit versiyonu: makine ve kabloyla ölçülebilir torso kuvvet günü.",
        injury: "⚠️ Omuz hassassa overhead yok; neutral press, row ve pulldown hattında kal.",
        blocks: [
          torsoWarmupGymBlock(),
          careBlockGym(),
          block("🤸 TEKNİK — Çekiş + Skapula", "#8338EC", [
            passiveEx("Scapular Pulldown", "2 × 10", "Alt trapez + lat aktivasyon", ["Dirsek bükmeden omuzu aşağı çek", "Boyun uzun"]),
            ex("Pike Hold", "2 × 10-15sn", "Omuz + core", ["Kaburga kapalı", "Submax tut"], { warn: "Omuz iyi değilse atla", alts: ["Tall Plank Shoulder Tap"], alt_reasons: ["Overhead açısını azaltıp omuz-core kontrolünü korur"] }),
          ]),
          block("⚡ POWER — Göğüs Hızı", "#FFD166", [
            ex("Medicine Ball Chest Pass", "3 × 5", "Patlayıcı itiş", ["Göğüs hizasında tut", "Duvara hızlı it", "Topu yumuşak karşıla"], { warn: "Hafta 1'de 2 set veya atla. Overhead yok.", alts: ["Speed Machine Chest Press"], alt_reasons: ["Med ball yoksa hafif makinede hızlı concentric"] }),
          ]),
          block("💪 KUVVET — Torso Ana İş", "#F4A261", [
            ex("Chest Supported Row", "4 × 6-10", "Upper back + lat", ["Bench desteğini kullan", "Üstte 1 sn sık", "Boyun nötr"], { warn: "Ana çekiş; RIR 2", alts: ["T Bar Row Machine", "High Row Machine", "Kelso Shrug Machine", "Seated Cable Row (Single Arm)"], alt_reasons: ["Torso Limbs'in ağır row slotu", "Upper back'i daha stabil yükler", "Torso B'deki Kelso shrug / skapula retraksiyon slotu", "Tek taraflı asimetri takibi sağlar"] }),
            ex("Neutral Machine Press veya Floor Press", "4 × 6-10", "Göğüs + triceps", ["Omuzları geriye yerleştir", "Dirsekleri kontrollü indir"], { warn: "Ana press; dip yok, failure yok", alts: ["Plate Loaded Flat Chest Press", "High Incline Smith Machine Press", "Cable Chest Press"], alt_reasons: ["Torso Limbs flat press hattı", "Omuz iyi günlerde üst göğüs açısı", "Daha serbest, omuz dostu kablo alternatifi"] }),
            ex("Neutral Grip Lat Pulldown", "3 × 8-12", "Lat", ["Dirseği aşağı çek", "Gövdeyi savurma", "Omzu kulağa kaçırma"], { warn: "Wide grip yerine omuz dostu neutral hat", alts: ["Single Arm Lat Pulldown", "Wide Grip Lat Pulldown"], alt_reasons: ["Lat'i tek taraflı ve kontrollü hissettirir", "Sadece omuz rahatken Torso Limbs geniş tutuş varyasyonu"] }),
            ex("Cable Lateral Raise", "2 × 12-15", "Yan omuz", ["Hafif kilo", "Skapular planda kaldır", "Ağrısız aralık"], { alts: ["Seated Lateral Raise Machine", "Standing Single Arm Lateral Raise"], alt_reasons: ["Makine stabilitesiyle yan omuz hacmi", "Tek taraflı kablo/dumbbell varyasyonu"] }),
            ex("Cable Fly", "2 × 10-12", "Pec", ["Kolları kilitleme", "Göğüste sık", "Omuz öne düşmesin"], { warn: "Press sonrası hipertrofi desteği; RIR 2-3", alts: ["Cable Clavicular Fly", "Pec Deck Fly"], alt_reasons: ["Torso Limbs üst göğüs fly açısı", "Kablo doluysa stabil makine seçeneği"] }),
          ]),
          block("🧠 CORE + KONDİSYON", "#1F618D", [
            passiveEx("Pallof Press", "2 × 10 (her taraf)", "Anti-rotasyon core", ["Göğüs hizasında it", "2 sn bekle"]),
            ex("Stationary Bike", "15 dakika Zone 2", "Aerobik baz", ["RPE 5", "Diz rahat dönsün"], { alts: ["Incline Walk"], alt_reasons: ["Bike dizde hoş değilse yürüyüşe dön"] }),
          ]),
          upperCooldownBlock(),
        ],
      },
    },
  },
  {
    id: 3,
    sub: "ÇARŞAMBA",
    focus: "Zone 2 + Mobilite",
    type: "offday",
    color: "#3C91E6",
    intent: "Salı kuvvetini emdirirken aerobik tabanı büyüt.",
    variants: {
      home: {
        duration: "~45 dk",
        aerobicMinutes: 45,
        modeNote: "Ev versiyonu: uzun kolay yürüyüş ve kısa mobilite.",
        injury: "⚠️ Bugün tempo değil; nefes rahat kalmalı. Diz rahatsızsa süreyi böl.",
        blocks: [
          recoveryWarmupBlock(),
          block("🚶 KONDİSYON — Zone 2", "#990000", [
            ex("Hızlı Yürüyüş", "40-45 dakika Zone 2", "Aerobik baz", ["RPE 5-6", "Konuşabilir tempo", "Koşuya dönme"], { warn: "Dayanıklılığın ana hacmi burada", alts: ["Incline Walk", "Stationary Bike"], alt_reasons: ["Düşük darbeli salon yürüyüşü", "Diz/ayak bileği yorgunsa bike"] }),
          ]),
          block("🧠 CORE — Düşük Doz Stabilite", "#1F618D", [
            passiveEx("Dead Bug", "2 × 8 (her taraf)", "Anti-extension core", ["Bel sabit", "Yavaş uzat"]),
            passiveEx("Side Plank", "2 × 20-30sn (her taraf)", "Lateral core", ["Kalça çizgini koru"]),
          ]),
          recoveryCooldownBlock(),
        ],
      },
      gym: {
        duration: "~45 dk",
        aerobicMinutes: 45,
        modeNote: "Macfit versiyonu: bike veya incline walk ile düşük darbeli Zone 2.",
        injury: "⚠️ Rower bugün varsayılan değil; bel-boyun çok iyi değilse bike/incline seç.",
        blocks: [
          zone2GymWarmupBlock(),
          block("🚴 KONDİSYON — Zone 2", "#990000", [
            ex("Stationary Bike veya Incline Walk", "40-45 dakika Zone 2", "Aerobik baz", ["RPE 5-6", "Nefes kontrollü", "Darbe yok"], { alts: ["Hızlı Yürüyüş", "Rower"], alt_reasons: ["Dışarıda aynı Zone 2 hedefi", "Bel-boyun tamamen sakinse rower kullanılabilir"] }),
          ]),
          block("🧠 CORE — Düşük Doz Stabilite", "#1F618D", [
            passiveEx("Pallof Press", "2 × 10 (her taraf)", "Anti-rotasyon core", ["2 sn bekle", "Kaburga kapalı"]),
            passiveEx("Side Plank", "2 × 20-30sn (her taraf)", "Lateral core", ["Kısa ve temiz"]),
          ]),
          recoveryCooldownBlock(),
        ],
      },
    },
  },
  {
    id: 4,
    sub: "PERŞEMBE",
    focus: "Limbs Kuvvet + Alt Gövde Kontrol",
    type: "training",
    color: "#118AB2",
    intent: "Quad, glute, hamstring, alt bacak ve kolları sakatlık toleransına göre güçlendir.",
    variants: {
      home: {
        duration: "~70 dk",
        aerobicMinutes: 0,
        modeNote: "Ev versiyonu: tek DB, tempo ve unilateral kontrolle limbs kuvvet günü.",
        injury: "⚠️ Diz 3/10 üstüyse step-up/lunge yerine wall sit + hip thrust hattına dön.",
        blocks: [
          lowerWarmupHomeBlock(),
          lowerCareBlockHome(),
          block("🤸 TEKNİK — Hinge + Diz Hattı", "#8338EC", [
            passiveEx("Hip Hinge Drill", "2 × 8", "Hinge tekniği", ["Kalçayı geriye gönder", "Bel nötr"]),
            ex("Supported Low Step-up", "2 × 6 (her bacak)", "Diz kontrolü", ["Alçak basamak", "Destek al", "Diz çizgisini koru"], { warn: "Teknik set; ağrı varsa wall sit'e dön", alts: ["Wall Sit"], alt_reasons: ["Diz fleksiyonunu sabit ve ağrısız açıya indirir"] }),
          ]),
          block("⚡ POWER — Kalça Hızı", "#FFD166", [
            ex("Explosive Hip Thrust", "3 × 6", "Hip power + glute", ["Yukarı hızlı it", "İniş 2 sn kontrollü", "Bel hiperextansiyonu yok"], { warn: "Hafta 1'de 2 set veya atla. Form bozulursa set biter.", alts: ["Glute Bridge", "Hip Thrust (hafif)"], alt_reasons: ["Power günü kötü hissedilirse düşük riskli regresyon", "Salonda hafif teknik set"] }),
          ]),
          block("💪 KUVVET — Limbs Ana İş", "#F4A261", [
            ex("DB Hip Thrust", "4 × 8-12", "Glute max", ["DB pelvis üstünde", "Üstte 1 sn sık", "Kaburga kapalı"], { warn: "Ana alt gövde lift'i", alts: ["Glute Bridge", "Hip Thrust"], alt_reasons: ["Bel/diz hassas günlerde zeminde daha güvenli", "Salondaysan aynı paterni daha ölçülebilir yükle"] }),
            ex("Supported Low Step-up veya Kısa ROM Split Squat", "3 × 6-8 (her bacak)", "Quad + glute", ["Kısa ROM", "Ağrısız açı", "Yavaş iniş"], { warn: "Diz toleransı belirler", alts: ["DB Goblet Wall Sit"], alt_reasons: ["Diz bükme irritasyon yaparsa izometriye dön"], unilateral: true }),
            ex("Single Leg RDL", "3 × 8 (her bacak)", "Hamstring + glute + denge", ["Duvardan destek al", "Kalçadan menteşelen", "Boynu nötr tut"], { warn: "Bel hissedersen ROM'u kısalt", unilateral: true, alts: ["Romanian Deadlift (çok hafif)", "Good Morning (vücut ağırlığı)"], alt_reasons: ["Denge limitliyse bilateral hinge", "Sadece paterni öğretmek için yükü çıkar"] }),
            ex("Bridge Walkout", "2 × 6-8", "Hamstring curl hattı", ["Köprüde kal", "Topukları yavaş uzağa yürüt", "Bel düşmesin"], { alts: ["Swiss Ball Hamstring Curl", "Seated Leg Curl"], alt_reasons: ["Evde top varsa daha net hamstring curl", "Salondaysan Torso Limbs leg curl slotu"] }),
            ex("DB Curl", "2 × 10-12 (her kol)", "Biceps", ["Dirsek sabit", "3 sn kontrollü indir"], { alts: ["Scott Curl Machine", "Lengthened DB Curl", "Towel Curl Isometric"], alt_reasons: ["Torso Limbs stabil curl seçeneği", "Uzun pozisyonda biceps uyaranı", "Ekipmansız izometrik seçenek"] }),
            ex("Close Grip Incline Push-up", "2 × 8-12", "Triceps", ["Eller omuz genişliğine yakın", "Omuz öne düşmesin"], { alts: ["DB Floor Triceps Extension", "Straight Bar Pushdown"], alt_reasons: ["Omuz rahatsa yerde hafif extension yapılabilir", "Salondaysan omuz dostu kablo pushdown"] }),
          ]),
          block("🧠 CORE — Lateral Hat", "#1F618D", [
            passiveEx("Side Plank", "2 × 30sn (her taraf)", "Lateral core", ["Kalça çizgini koru"]),
            passiveEx("Bird Dog", "2 × 8 (her taraf)", "Anti-rotasyon", ["Yavaş uzat", "Bel sabit"]),
          ]),
          lowerCooldownBlock(),
        ],
      },
      gym: {
        duration: "~72 dk",
        aerobicMinutes: 0,
        modeNote: "Macfit versiyonu: makinelerle ölçülebilir alt gövde ve kol kuvvet günü.",
        injury: "⚠️ Hack squat ve derin squat yok. Leg press kısa, ağrısız ROM'da kalır.",
        blocks: [
          lowerWarmupGymBlock(),
          lowerCareBlockGym(),
          block("🤸 TEKNİK — Diz + Hinge", "#8338EC", [
            passiveEx("Leg Press Groove Set", "2 × 10 hafif", "Diz hattı", ["Kısa ROM", "Diz çizgisini koru", "Ağırlık değil teknik"]),
            passiveEx("Hip Hinge Drill", "2 × 8", "Hinge tekniği", ["Bel nötr", "Kalça geriye"]),
          ]),
          block("⚡ POWER — Kalça Hızı", "#FFD166", [
            ex("Explosive Hip Thrust", "3 × 5-6", "Hip power + glute", ["Yukarı hızlı", "İniş kontrollü", "Form bozulunca dur"], { warn: "Hafta 1'de 2 set veya atla", alts: ["Light Kettlebell Swing"], alt_reasons: ["Sadece bel tamamen sakinse ve form oturduysa"] }),
          ]),
          block("💪 KUVVET — Limbs Ana İş", "#F4A261", [
            ex("Hip Thrust", "4 × 6-10", "Glute max", ["Üstte 1 sn sık", "Bel hiperextansiyonu yok"], { warn: "Ana alt gövde lift'i; RIR 2", alts: ["DB Hip Thrust", "45 Degree Hip Extension"], alt_reasons: ["Yoğun salon gününde daha hafif aynı patern", "Bel nötr kalabiliyorsa posterior zincir tamamlayıcı"] }),
            ex("Leg Press Kısa ROM", "3 × 8-10", "Quad", ["Ayak basışı stabil", "Derine inme", "Ağrısız açı"], { warn: "Menisküs toleransı belirler", alts: ["Wall Sit", "Leg Extension Machine (hafif)", "Hip Thrust"], alt_reasons: ["Diz sinyal verirse izometriye dön", "Ağrısız kısa ROM'da quad uyaranı", "Quad günü tolere edilmiyorsa glute dominant hatta dön"] }),
            ex("Seated Leg Curl", "3 × 8-12", "Hamstring", ["Kalçayı minderden kaldırma", "Topuğu kontrollü çek"], { alts: ["Machine Lying Leg Curl", "Swiss Ball Hamstring Curl"], alt_reasons: ["Torso Limbs'teki ikinci leg curl varyasyonu", "Makine doluysa düşük riskli curl hattı"] }),
            ex("Single Leg RDL Hafif DB", "2 × 8 (her bacak)", "Hamstring + glute + denge", ["Hafif yük", "Denge için destek al", "Boyun nötr"], { unilateral: true, alts: ["45 Degree Hip Extension", "Romanian Deadlift (çok hafif)"], alt_reasons: ["Dengeyi çıkartıp posterior zinciri korur", "Daha basit bilateral hinge"] }),
            ex("Standing Calf Raise", "3 × 10-15", "Calf", ["Alt pozisyonda 2 sn bekle", "Yarım tekrar yapma"], { alts: ["Straight Leg Calf Raise", "Single Leg Calf Raise"], alt_reasons: ["Torso Limbs calf slotu", "Makine yoksa tek taraflı yükleme"] }),
            ex("Cable Curl", "2 × 10-12", "Biceps", ["Dirsek sabit", "Tempo kontrollü"], { alts: ["Scott Curl Machine", "Lengthened DB Curl"], alt_reasons: ["Torso Limbs stabil curl seçeneği", "Uzun pozisyonda biceps uyaranı"] }),
            ex("Rope Pushdown", "2 × 10-12", "Triceps", ["Dirsek gövdeye yakın", "Omuz yükselmesin"], { warn: "Overhead extension yerine omuz dostu seçenek", alts: ["Straight Bar Pushdown", "Single Arm Cable Pushdown"], alt_reasons: ["Torso Limbs pushdown varyasyonu", "Tek taraflı dirsek hattı kontrolü"] }),
          ]),
          block("🧠 CORE — Lateral Hat", "#1F618D", [
            passiveEx("Side Plank", "2 × 30-40sn (her taraf)", "Lateral core", ["Kalça çizgini koru"]),
            passiveEx("Pallof Press", "2 × 10 (her taraf)", "Anti-rotasyon", ["2 sn bekle"]),
          ]),
          lowerCooldownBlock(),
        ],
      },
    },
  },
  {
    id: 5,
    sub: "CUMA",
    focus: "Tam Dinlenme + Kısa Bakım",
    type: "offday",
    color: "#06D6A0",
    intent: "Cumartesi atletik güne taze girmek için yorgunluk biriktirme.",
    variants: {
      home: {
        duration: "~12 dk",
        aerobicMinutes: 0,
        modeNote: "Ev versiyonu: tam dinlenme önerilir; sadece kısa bakım opsiyonel.",
        injury: "⚠️ Bugün eksik antrenmanı telafi etme günü değil.",
        blocks: [
          block("🧩 OPSİYONEL BAKIM", "#2A9D8F", [
            passiveEx("Crocodile Breathing", "2 × 5 nefes", "Nefes + gevşeme", ["Nefesi uzat", "Omuzları bırak"]),
            passiveEx("90/90 Hip Stretch", "2 × 20sn (her taraf)", "Kalça kapsülü", ["Nazik açıl", "Ağrısız aralık"]),
            passiveEx("Upper Trap Stretch", "2 × 20sn (her taraf)", "Üst trapez", ["Omzu aşağıda tut", "Hafif çekiş"]),
          ]),
        ],
      },
      gym: {
        duration: "~12 dk",
        aerobicMinutes: 0,
        modeNote: "Macfit versiyonu: salona gidersen bile sadece bakım; yük yok.",
        injury: "⚠️ Antrenman yapma isteğini Cumartesiye sakla.",
        blocks: [
          block("🧩 OPSİYONEL BAKIM", "#2A9D8F", [
            passiveEx("Crocodile Breathing", "2 × 5 nefes", "Nefes + gevşeme", ["Nefesi uzat"]),
            passiveEx("90/90 Hip Stretch", "2 × 20sn (her taraf)", "Kalça kapsülü", ["Nazik açıl", "Ağrısız aralık"]),
            passiveEx("Upper Trap Stretch", "2 × 20sn (her taraf)", "Üst trapez", ["Omzu aşağıda tut", "Hafif çekiş"]),
          ]),
        ],
      },
    },
  },
  {
    id: 6,
    sub: "CUMARTESİ",
    focus: "Athletic Full Body + Threshold",
    type: "training",
    color: "#F77F00",
    intent: "Power, full body kuvvet, carry ve kontrollü kondisyon aynı güne toplanır.",
    variants: {
      home: {
        duration: "~78 dk",
        aerobicMinutes: 30,
        modeNote: "Ev versiyonu: atletik full body, carry ve düşük darbeli kondisyon günü.",
        injury: "⚠️ Bugün ego yok. Diz/omuz/bel sinyal verirse power ve threshold'u Zone 2'ye çevir.",
        blocks: [
          athleticWarmupHomeBlock(),
          fullBodyCareHomeBlock(),
          block("🤸 TEKNİK — Skill Teması", "#8338EC", [
            ex("Pike Hold", "2 × 12-15sn", "Omuz + core", ["Submax tut", "Kaburga kapalı"], { warn: "Handstand kovalamıyoruz; teknik temas", alts: ["Downward Dog Hold", "Tall Plank Shoulder Tap"], alt_reasons: ["Omuz açısı daha yumuşak teknik temas", "Overhead baskısını azaltır"] }),
            ex("L-sit Tuck Hold", "2 × 8-10sn", "Core + support", ["Omuzları aşağı bas", "Kalça düşmesin"], { warn: "Support ağrılıysa dead bug'a dön", alts: ["Dead Bug"], alt_reasons: ["Support baskısını kaldırıp anterior core hedefini korur"] }),
          ]),
          block("⚡ POWER — Atletik Hız", "#FFD166", [
            ex("Explosive Hip Thrust", "3 × 5-6", "Hip power + posterior", ["Yukarı hızlı", "İniş kontrollü", "Form bozulunca dur"], { warn: "Hafta 1'de 2 set veya atla", alts: ["Glute Bridge", "Hip Thrust (hafif)"], alt_reasons: ["Power yerine düşük riskli glute aktivasyonu", "Salonda hafif teknik set"] }),
            ex("Speed Incline Push-up", "3 × 5", "Üst gövde power", ["İtiş hızlı", "İniş kontrollü", "Failure yok"], { alts: ["Wall Push-up Explosive", "Speed Machine Chest Press"], alt_reasons: ["Omuz stresini azaltır", "Salonda hafif hızlı press alternatifi"] }),
          ]),
          block("💪 KUVVET — Athletic Full Body", "#F4A261", [
            ex("DB Hip Thrust", "3 × 8-12", "Glute max", ["Üstte 1 sn sık", "Belden itme"], { alts: ["Glute Bridge", "Hip Thrust"], alt_reasons: ["Yorgun gün regresyonu", "Salonda ölçülebilir aynı patern"] }),
            ex("Tek Kol DB Row veya Inverted Row", "3 × 8-12", "Sırt + lat", ["Boyun nötr", "Üstte sık", "Kontrollü indir"], { unilateral: true, alts: ["Towel Row (Ayak Dirençli)", "Chest Supported Row", "T Bar Row Machine"], alt_reasons: ["Evde güvenli çekiş alternatifi", "Salonda stabil upper back seçeneği", "Torso Limbs row slotu"] }),
            ex("DB Floor Press veya Incline Push-up", "3 × 8-12", "Göğüs + triceps", ["Omuz dostu açı", "RIR 2 bırak"], { alts: ["Plate Loaded Flat Chest Press", "Cable Chest Press"], alt_reasons: ["Salonda stabil flat press", "Omuz açısını daha rahat ayarlama"] }),
            ex("Suitcase Carry", "3 × 30sn (her taraf)", "Grip + anti-lateral core", ["Gövde yana eğilmesin", "Adım kısa", "Omuzlar aşağıda"], { warn: "Atletik gövde ve postür için ana taşıma", unilateral: true, alts: ["Farmer Carry", "Farmer Carry (Ağır Çanta / Su Bidonu)"], alt_reasons: ["Çift taraflı daha ağır taşıma", "Ev ekipmanıyla aynı carry amacı"] }),
            ex("DB Lateral Raise", "2 × 12-15", "Yan omuz", ["Hafif yük", "Ağrısız aralık"], { alts: ["Seated Lateral Raise Machine", "Standing Single Arm Lateral Raise"], alt_reasons: ["Torso Limbs yan omuz makine seçeneği", "Tek taraflı kontrollü varyasyon"] }),
            ex("DB Curl veya Towel Curl", "2 × 10-12", "Biceps", ["Dirsek sabit", "Kontrollü tempo"], { alts: ["Scott Curl Machine", "Lengthened DB Curl", "Cable Curl"], alt_reasons: ["Torso Limbs stabil curl seçeneği", "Uzun pozisyon biceps uyaranı", "Salonda ölçülebilir kablo alternatifi"] }),
          ]),
          block("🧠 CORE + KONDİSYON", "#1F618D", [
            passiveEx("Pallof Alternatifi: Side Plank", "2 × 30sn (her taraf)", "Anti-rotasyon/lateral core", ["Kalça çizgini koru"]),
            ex("Zone 2 / Threshold Yürüyüş Protokolü", "Haftaya göre değişir", "Dayanıklılık + threshold", ["Hafta 1-3: 25-30 dk Zone 2", "Hafta 4-6: 2 × 4 dk RPE 7 + 15 dk Zone 2", "Hafta 7-8: 4 × 4 dk RPE 7-8 + 8-10 dk Zone 2", "Koşu yok; hızlı yürüyüş veya bike seç"], { warn: "O gün yorgunsan her haftada pure Zone 2'ye dön", alts: ["Stationary Bike", "Incline Walk"], alt_reasons: ["Threshold için düşük darbeli stabil seçenek", "Koşusuz yürüyüş protokolünü salona taşır"] }),
          ]),
          volumeCooldownBlock(),
        ],
      },
      gym: {
        duration: "~82 dk",
        aerobicMinutes: 30,
        modeNote: "Macfit versiyonu: power, full body kuvvet, carry ve threshold tek atletik güne toplanır.",
        injury: "⚠️ Rower şartlı. Bel-boyun iyi değilse threshold bike'da yapılır.",
        blocks: [
          athleticWarmupGymBlock(),
          fullBodyCareGymBlock(),
          block("🤸 TEKNİK — Skill Teması", "#8338EC", [
            ex("Pike Hold", "2 × 12-15sn", "Omuz + core", ["Submax tut", "Kaburga kapalı"], { alts: ["Downward Dog Hold", "Tall Plank Shoulder Tap"], alt_reasons: ["Omuz açısı daha yumuşak teknik temas", "Overhead baskısını azaltır"] }),
            ex("L-sit Tuck Hold", "2 × 8-10sn", "Core + support", ["Omuzları aşağı bas"], { alts: ["Dead Bug"], alt_reasons: ["Support omuzda baskı yaparsa zemine dön"] }),
          ]),
          block("⚡ POWER — Atletik Hız", "#FFD166", [
            ex("Medicine Ball Chest Pass", "3 × 5", "Üst gövde power", ["Göğüs hizası", "Duvara hızlı it", "Topu yumuşak karşıla"], { alts: ["Speed Machine Chest Press"], alt_reasons: ["Med ball yoksa hafif makinede hızlı concentric"] }),
            ex("Explosive Hip Thrust", "3 × 5-6", "Hip power", ["Yukarı hızlı", "İniş kontrollü", "Bel nötr"], { warn: "Hafta 1'de 2 set veya atla", alts: ["Light Kettlebell Swing", "Glute Bridge"], alt_reasons: ["Sadece bel tamamen sakinse ve form oturduysa", "Power yerine düşük riskli regresyon"] }),
          ]),
          block("💪 KUVVET — Athletic Full Body", "#F4A261", [
            ex("Chest Supported Row", "3 × 8-10", "Upper back + lat", ["Bench desteği", "Üstte sık", "Boyun nötr"], { alts: ["T Bar Row Machine", "High Row Machine", "Kelso Shrug Machine", "Seated Cable Row (Single Arm)"], alt_reasons: ["Torso Limbs ağır row slotu", "Upper back'i stabil yükler", "Torso B'deki Kelso shrug / skapula retraksiyon slotu", "Tek taraflı asimetri takibi"] }),
            ex("Neutral Machine Press veya Floor Press", "3 × 8-10", "Göğüs + triceps", ["Omuzları yerleştir", "Kontrollü indir"], { alts: ["Plate Loaded Flat Chest Press", "High Incline Smith Machine Press", "Cable Chest Press"], alt_reasons: ["Torso Limbs flat press hattı", "Omuz iyi günlerde üst göğüs açısı", "Kabloyla daha serbest omuz açısı"] }),
            ex("Romanian Deadlift Hafif veya Hip Thrust", "3 × 8-10", "Posterior chain", ["Kalçadan menteşelen", "Bel nötr", "RIR 2"], { warn: "Bel hassassa hip thrust seç", alts: ["Hip Thrust", "45 Degree Hip Extension"], alt_reasons: ["Bel hassas günlerde aynı glute amacı", "Hinge iyi hissediliyorsa daha kontrollü posterior seçenek"] }),
            ex("Neutral Grip Lat Pulldown", "3 × 8-12", "Lat", ["Dirsekleri aşağı çek", "Gövdeyi savurma"], { alts: ["Single Arm Lat Pulldown", "Wide Grip Lat Pulldown"], alt_reasons: ["Tek taraflı lat hissi ve asimetri kontrolü", "Sadece omuz rahatken Torso Limbs geniş tutuş varyasyonu"] }),
            ex("Farmer Carry", "3 × 30-40sn", "Grip + core + locomotion", ["Omuzlar aşağıda", "Kaburga kapalı", "Adım kısa"], { alts: ["Suitcase Carry", "Trap Bar Carry"], alt_reasons: ["Tek taraflı anti-lateral core odağı", "Salonda ağır ama stabil carry"] }),
            ex("Cable Lateral Raise", "2 × 12-15", "Yan omuz", ["Hafif yük", "Ağrısız aralık"], { alts: ["Seated Lateral Raise Machine", "Standing Single Arm Lateral Raise"], alt_reasons: ["Torso Limbs yan omuz makine seçeneği", "Tek taraflı kontrollü varyasyon"] }),
          ]),
          block("🧠 CORE + KONDİSYON", "#1F618D", [
            passiveEx("Pallof Press", "2 × 10 (her taraf)", "Anti-rotasyon core", ["2 sn bekle", "Kaburga kapalı"]),
            ex("Bike / Rower Threshold Protokolü", "Haftaya göre değişir", "Dayanıklılık + threshold", ["Hafta 1-3: 25-30 dk Zone 2", "Hafta 4-6: 2 × 4 dk RPE 7 + 15 dk Zone 2", "Hafta 7-8: 4 × 4 dk RPE 7-8 + 8-10 dk Zone 2", "Bike varsayılan; rower sadece bel-boyun sakinse"], { warn: "Kuvvet sonrası tek yüksek yoğunluk bloğu budur", alts: ["Incline Walk", "Stationary Bike"], alt_reasons: ["Koşusuz yürüyüş threshold alternatifi", "Bike varsayılan güvenli seçenek"] }),
          ]),
          volumeCooldownBlock(),
        ],
      },
    },
  },
  {
    id: 7,
    sub: "PAZAR",
    focus: "Toparlanma Kuvveti + Zone 2",
    type: "training",
    color: "#8338EC",
    intent: "Haftayı gerçek ama düşük yoğunluklu antrenmanla kapat: hafif kuvvet, core/carry ve Zone 2.",
    variants: {
      home: {
        duration: "~75-85 dk",
        aerobicMinutes: 40,
        modeNote: "Ev versiyonu: pazar artık sadece kondisyon değil; hafif posterior chain, row, calf, core/carry ve Zone 2 var.",
        injury: "⚠️ Pazar antrenman günüdür ama ağır gün değildir. Cumartesi yorgunluğu yüksekse kuvvet setlerinden 1 set çıkar, Zone 2'yi 25-30 dakikaya indir.",
        blocks: [
          longZone2HomeWarmupBlock(),
          sundayActiveRecoveryBlock(),
          block("💪 KUVVET — Toparlanma Kuvveti", "#F4A261", [
            ex("Glute Bridge / Hip Thrust", "3 × 12-15", "Glute + posterior chain", ["Üstte 1 sn sık", "Belden değil kalçadan it", "RIR 3-4 bırak"], { warn: "Amaç kası uyarmak; Cumartesi yükünü tekrar etmek değil", alts: ["DB Hip Thrust", "Glute Bridge"], alt_reasons: ["Evde yük eklemek istersen aynı patern", "Bel yorgunsa en sade regresyon"] }),
            ex("Tek Kol DB Row", "2 × 10-12 (her taraf)", "Upper back + lat", ["Destek al", "Boyun nötr", "Üstte kısa sık"], { warn: "Postür ve sırt hacmi için hafif çekiş", unilateral: true, alts: ["Inverted Row (Masa Altı)", "Towel Row (Ayak Dirençli)", "Chest Supported Row"], alt_reasons: ["Vücut ağırlığıyla aynı yatay çekiş", "Masa güvenli değilse ekipmansız seçenek", "Salondaysan daha stabil row"] }),
            ex("Standing Calf Raise", "2 × 12-15", "Calf + ayak bileği", ["Alt pozisyonda 1-2 sn bekle", "Yarım tekrar yapma", "Kontrollü çık"], { warn: "Yürüyüş kapasitesi ve alt bacak dayanıklılığı için destek" }),
          ]),
          block("🧠 CORE + TAŞIMA", "#1F618D", [
            passiveEx("Side Plank", "2 × 25-35sn (her taraf)", "Lateral core", ["Kalça çizgisini koru", "Nefesi tutma"]),
            ex("Suitcase Carry", "2 × 30sn (her taraf)", "Grip + anti-lateral core", ["Gövde yana eğilmesin", "Omuzlar aşağıda", "Adım kısa"], { warn: "Atletik gövde ve postür için düşük hacimli taşıma", unilateral: true, alts: ["Farmer Carry", "Farmer Carry (Ağır Çanta / Su Bidonu)"], alt_reasons: ["Çift taraflı daha stabil carry", "Ev ekipmanıyla aynı hedef"] }),
          ]),
          block("🚶 KONDİSYON — Uzun Zone 2", "#990000", [
            ex("Hızlı Yürüyüş", "35-45 dakika Zone 2", "Aerobik baz + toparlanma", ["RPE 5-6", "Konuşabilir tempo", "Koşu yok"], { warn: "Kuvvet sonrası düşük yoğunluklu dayanıklılık; threshold değil", alts: ["Incline Walk", "Stationary Bike"], alt_reasons: ["Düşük darbeli salon yürüyüşü", "Uzun günlerde diz/ayak bileği daha rahat olabilir"] }),
          ]),
          longZone2CooldownBlock(),
        ],
      },
      gym: {
        duration: "~80-90 dk",
        aerobicMinutes: 40,
        modeNote: "Macfit versiyonu: pazar gerçek antrenman günüdür; hafif makine kuvveti, core/carry ve Zone 2 ile biter.",
        injury: "⚠️ Bugün ağır leg day veya torso day değil. RPE 5-6, RIR 3-4; Cumartesi sert geçtiyse kuvvet bloklarından 1 set çıkar.",
        blocks: [
          longZone2GymWarmupBlock(),
          sundayActiveRecoveryBlock(),
          block("💪 KUVVET — Toparlanma Kuvveti", "#F4A261", [
            ex("Chest Supported Row", "2 × 10-12", "Upper back + lat", ["Bench desteği", "Üstte sık", "Boyun nötr"], { warn: "Postür ve sırt hacmi için hafif çekiş", alts: ["T Bar Row Machine", "High Row Machine", "Kelso Shrug Machine", "Seated Cable Row (Single Arm)"], alt_reasons: ["Torso Limbs ağır row slotunun hafif versiyonu", "Upper back'i stabil yükler", "Skapula retraksiyon odağı", "Tek taraflı asimetri takibi"] }),
            ex("Hip Thrust", "3 × 10-12", "Glute max", ["Üstte 1 sn sık", "Bel hiperextansiyonu yok", "RIR 3-4 bırak"], { warn: "Hafif posterior chain; Cumartesi yükünü tekrar etme", alts: ["DB Hip Thrust", "45 Degree Hip Extension"], alt_reasons: ["Yükü düşürmek istersen aynı patern", "Bel nötr kalıyorsa kontrollü posterior seçenek"] }),
            ex("Leg Extension Machine (hafif)", "2 × 12-15", "Quad", ["Tepe noktada 1 sn dur", "Kısa-ağrısız ROM", "Dizi kilitleme"], { warn: "Torso Limbs quad dokunuşu; menisküs sinyal verirse çıkar", alts: ["Wall Sit", "Leg Press Kısa ROM"], alt_reasons: ["Diz sinyal verirse izometrik seç", "İyi günlerde kısa ROM quad paternine dön"] }),
            ex("Standing Calf Raise", "2 × 12-15", "Calf + ayak bileği", ["Alt pozisyonda 1-2 sn bekle", "Kontrollü çık", "Yarım tekrar yapma"], { warn: "Yürüyüş ve alt bacak dayanıklılığı için destek" }),
          ]),
          block("🧠 CORE + TAŞIMA", "#1F618D", [
            passiveEx("Pallof Press", "2 × 10 (her taraf)", "Anti-rotasyon core", ["2 sn bekle", "Kaburga kapalı"]),
            ex("Farmer Carry", "2 × 30-40sn", "Grip + core + postür", ["Omuzlar aşağıda", "Kaburga kapalı", "Adım kısa"], { warn: "Atletik gövde ve postür için düşük hacimli taşıma", alts: ["Suitcase Carry", "Trap Bar Carry"], alt_reasons: ["Tek taraflı anti-lateral core odağı", "Salonda ağır ama stabil carry"] }),
          ]),
          block("🚴 KONDİSYON — Uzun Zone 2", "#990000", [
            ex("Incline Walk veya Stationary Bike", "35-45 dakika Zone 2", "Aerobik baz + toparlanma", ["RPE 5-6", "Konuşabilir tempo", "Darbe yok"], { alts: ["Hızlı Yürüyüş", "Rower"], alt_reasons: ["Dışarıda aynı Zone 2 hedefi", "Bel-boyun tamamen sakinse ve teknik bozulmuyorsa"] }),
          ]),
          longZone2CooldownBlock(),
        ],
      },
    },
  },
];

export const PROGRAM_HYBRID = {
  meta: {
    name: "Hibrit Performans Sistemi",
    phase: "Faz 1 — Güç + Dayanıklılık + Atletik Vücut",
    weeks: "Hafta 1–8",
    description: "Net haftalık omurga: Torso kuvvet, Limbs kuvvet, Athletic full body, Pazar toparlanma kuvveti + Zone 2 ve aralarda bilinçli toparlanma.",
  },

  coachProfile: {
    title: "Hibrit Denetim Profili",
    athlete: "Erkek · yeni baba · kontrollü alt-orta seviye sporcu",
    schedule: "4 antrenman günü: 3 ana kuvvet + 1 toparlanma kuvveti/Zone 2; 1 aktif dayanıklılık günü + 2 reset/dinlenme günü",
    priorities: [
      "1. Güçlenme: torso, limbs, full body ve pazar toparlanma kuvveti hareketlerinde ölçülebilir ilerleme",
      "2. Dayanıklılık: Zone 2 hacmi + haftada tek kontrollü threshold teması",
      "3. Atletik vücut: sırt-göğüs-omuz-glute/leg dengesi, carry ve core stabilite",
      "4. Eklem güvenliği: diz, omuz, bel-boyun toleransına göre regresyon",
      "İkincil skill: pike ve L-sit sadece teknik temas",
    ],
    constraints: [
      "Menisküs: koşu, zıplama ve derin diz fleksiyon yükü kısıtlı",
      "Rotator cuff: dip ve agresif overhead yüklenme kısıtlı",
      "Bel-boyun fıtığı: nötral omurga ve servikal nötral şart",
      "Skolyoz + kifoz: çekiş, skapula kontrolü ve lateral core öncelikli",
    ],
  },

  hybridModel: {
    title: "Hibrit Performans Mantığı",
    subtitle: "Her günün tek ana rolü var; bloklar ısınma, bakım, teknik, power, kuvvet, core, kondisyon ve soğuma sırasıyla ilerler.",
    pillars: [
      { id: "strength", label: "Kuvvet", dose: "Salı + Perşembe + Cumartesi ana · Pazar hafif · RIR 2-4", focus: "Row, press, hip thrust, leg press/step-up, carry" },
      { id: "endurance", label: "Dayanıklılık", dose: "Zone 2 toplam 120-160 dk/hafta", focus: "Çarşamba + Cumartesi/Pazar düşük darbeli yürüyüş/bike/incline; rower şartlı" },
      { id: "threshold", label: "Threshold", dose: "Sadece Cumartesi · H4+ progresif", focus: "Bike varsayılan; rower bel-boyun sakinse" },
      { id: "power", label: "Atletik Power", dose: "Salı üst power + Perşembe/Saturday hip power · submax", focus: "Speed push-up, med ball chest pass, explosive hip thrust" },
    ],
    rules: [
      "Ana kuvvet setlerinde failure yok; çoğu sette RIR 2, yalnızca iyi günlerde son set RIR 1 olabilir.",
      "Power blokları kısa ve taze yapılır; form bozulursa set biter.",
      "Threshold haftada tek bloktur ve kuvvetten sonra yapılır; yorgun günlerde pure Zone 2'ye dönülür.",
      "Pazar antrenman günüdür ama ağır gün değildir: recovery strength + core/carry + Zone 2 içerir; failure içermez.",
      "Pazartesi ve Cuma kaçırılan antrenmanı telafi etmek için kullanılmaz.",
    ],
    references: [
      "Alex Viada — Complete Human Performance (The Hybrid Athlete)",
      "Nick Bare — BPN Hybrid Programming",
      "NSCA TSAC — Tactical Strength & Conditioning standartları",
      "Stew Smith — Military.com Tactical Athlete",
      "Fergus Crawley — Strength + Endurance Concurrent Training",
    ],
  },

  homeEquipment: {
    inventory: [
      "1× sabit 5 kg dumbbell (tek)",
      "1× ayarlanabilir dumbbell (2×2kg + 4×1kg plakalar, 4-8 kg aralığı)",
      "Masa/bench/sandalye, havlu, zemin, duvar",
    ],
    constraints: [
      "Tek taraflı (unilateral) hareketler primary yol — çift DB gerektiren bilateral lift yok.",
      "8 kg tavanı olduğu için yük yerine tempo (3-1-1 eccentric), ROM ve rep progresyonu kullan.",
      "Tek dumbbell ile offset/suitcase yükleme → asimetrik core stimulus bonus.",
      "Plak değiştirmek zaman aldığı için bir set içinde yük sabit kalır; set'ler arası değiştir.",
    ],
    progression: [
      "Hafta 1-2: 3×8 @ 5kg",
      "Hafta 3-4: 3×10 @ 5kg",
      "Hafta 5-6: 3×12 @ 5kg",
      "Hafta 7-8: 3×8 @ 6-8kg (ayarlanabilir dumbbell) — tempo eccentric 3sn eklendi",
    ],
  },

  controlCenter: {
    badges: [
      { label: "Aerobik Hedef", value: "140–180 dk/hafta", tone: "good" },
      { label: "Kuvvet Günleri", value: "3 ana gün", tone: "good" },
      { label: "Skill Dozu", value: "2 hafif temas", tone: "warn" },
      { label: "Diz Politikası", value: "Derin fleksiyon yok", tone: "good" },
      { label: "Omuz Politikası", value: "Dip yok, overhead şartlı", tone: "warn" },
      { label: "Pazar Rolü", value: "Toparlanma Kuvveti + Zone 2", tone: "good" },
      { label: "Ev Ekipmanı", value: "1× sabit 5kg + 1× ayarlanabilir 4-8kg DB", tone: "good" },
    ],
    rules: [
      "Ana kuvvet setleri RPE 6-8 aralığında kalır; failure yok, çoğu sette RIR 2 bırak.",
      "Ağrı 2/10'u geçerse aynı paterni daha kolay varyasyona çevir.",
      "Uyku kötü ve enerji düşükse her ana bloktan 1 set çıkar.",
      "Skill setleri teknik temas olarak kalır; maksimum süre kovalanmaz.",
      "Patlayıcı hareketler submax hızda ve form korunduğu sürece yapılır; bir tekrar bozulursa set biter.",
      "HAFTA 1 = adaptasyon. Power blokları 2 set yapılabilir, threshold yoktur.",
      "Primary hip power: Explosive Hip Thrust. KB Swing sadece bel tamamen sakinse ve forma güven tamsa alternatif.",
      "Threshold progresif: Hafta 1-3 pure Zone 2, Hafta 4-6 2×4dk, Hafta 7-8 4×4dk.",
      "Koşu, zıplama, dip, ağır swing ve agresif rollout bu fazda yok.",
      "Ev modunda tek dumbbell var → bilateral yerine unilateral + asymmetric (suitcase/offset) yüklü varyantları tercih et. Yük yerine tempo (3-1-1 eccentric) ve rep range ile progresyon yap.",
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
      frequency: "Haftada 1-2 hafif teknik temas",
      caution: "Omuz veya boyun 3/5 üstüyse bir alt seviyede kal veya skill'i atla.",
      steps: [
        { level: 1, name: "Pike Hold", target: "3 × 15sn", metric: "seconds", goalValue: 15, detail: "Omuz aktivasyonu ve kaburga kontrolü" },
        { level: 2, name: "Pike Hold + Shoulder Shift", target: "3 × 20sn", metric: "seconds", goalValue: 20, detail: "Tek tarafa yük transferine hazırlık" },
        { level: 3, name: "Wall Handstand Hold", target: "2 × 8-10sn", metric: "seconds", goalValue: 8, detail: "Submax ve boyun nötral" },
        { level: 4, name: "Wall Handstand Hold", target: "3 × 12-15sn", metric: "seconds", goalValue: 12, detail: "Ağrısızsa süreyi uzat" },
      ],
      successRule: "3 başarılı temas + semptom 2/5 altında + hedef süreye yakın performans",
      weeklyGoal: "1-2 kaliteli temas günü",
      trackedDays: ["SALI", "CUMARTESİ"],
    },
    lsit: {
      name: "L-sit / Support Hattı",
      frequency: "Haftada 1-2 hafif teknik temas",
      caution: "Omuz veya bilek support basıncını tolere etmiyorsa zemin tuck'a dön.",
      steps: [
        { level: 1, name: "Tuck Support", target: "3 × 8sn", metric: "seconds", goalValue: 8, detail: "Omuz depresyonu ve support kontrolü" },
        { level: 2, name: "L-sit Tuck Hold", target: "3 × 10sn", metric: "seconds", goalValue: 10, detail: "Posterior tilt ve diz yakınlığı" },
        { level: 3, name: "L-sit Tuck Hold", target: "3 × 12-15sn", metric: "seconds", goalValue: 12, detail: "Süreyi kalite bozulmadan uzat" },
        { level: 4, name: "L-sit Tek Bacak Açılım", target: "3 × 3-5 tekrar", metric: "reps", goalValue: 3, detail: "Ağrısızsa kademeli açılım" },
      ],
      successRule: "3 başarılı temas + support pozisyonunda ağrı olmaması + hedef sürede temiz kontrol",
      weeklyGoal: "1-2 kaliteli temas günü",
      trackedDays: ["PERŞEMBE", "CUMARTESİ"],
    },
  },

  days: ATHLETIC_HYBRID_DAYS,

  legacyDays: [
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
              passiveEx("Standing Calf Raise", "2 × 15-20", "Alt bacak", ["Üstte kısa dur", "Topukları kontrollü indir"], { warn: "Yürüyüş ve genel alt bacak dayanıklılığına destek" }),
              passiveEx("Wall Tibialis Raise", "2 × 12-15", "Tibialis anterior", ["Duvara yaslan", "Parmak uçlarını yukarı çek", "Hareketi sekmeden bitir"], { warn: "Diz ve ayak bileği hattını destekler" }),
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
              passiveEx("Standing Calf Raise", "2 × 15-20", "Alt bacak", ["Üstte kısa dur", "Topukları kontrollü indir"], { warn: "Yürüyüş ve incline work kapasitesine destek" }),
              passiveEx("Wall Tibialis Raise", "2 × 12-15", "Tibialis anterior", ["Duvara yaslan", "Parmak uçlarını yukarı çek"], { warn: "Alt bacak dengesini destekler" }),
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
          duration: "~80 dk",
          aerobicMinutes: 28,
          modeNote: "Vakit kısıtlıysa veya semptom yüksekse home yolu daha güvenli seçenek. Yeni: güvenli patlayıcı (KB swing / explosive push-up) bloğu.",
          injury: "⚠️ Omuz ağrılıysa handstand'ı ve explosive push-up'ı çıkar, sadece pike + row + incline push-up ile kal.",
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
            block("⚡ POWER — Güvenli Patlayıcı", "#FFD166", [
              ex("Explosive Hip Thrust", "3 × 8-10", "Hip patlayıcı güç + posterior (bel için güvenli)", ["Yerde yatar pozisyon, omuzlar sandalyede", "Concentric fazı hızlı — kalçayı hızla yukarı it", "Eccentric fazı kontrollü 2 sn iniş"], { warn: "⏱ HAFTA 1'DE YAPMA — vücut yeni hareket paternine hazırlansın. Hafta 2'den itibaren başla. Bel-boyun fıtığı için swing'den çok daha güvenli aynı patern.", alts: ["Kettlebell Swing (Hafif 10-16kg)"], alt_reasons: ["Bel tam sakinse ve KB swing formuna güveniyorsan alternatif olarak geçebilirsin — ama form bozulunca acilen hip thrust'a dön"] }),
              ex("Explosive Push-up (Dizdan veya Incline)", "3 × 6-8", "Üst patlayıcı itiş", ["İniş 2 sn yavaş, itiş hızlı", "Ayak+el yerde kalır (plyo yok)", "Omuzlar nötrde"], { warn: "⏱ HAFTA 1'DE YAPMA. Hafta 2'den itibaren devreye alınır. Overhead yok; göğüs hizasında patlayıcı concentric. Omuz ağrısı varsa duvar versiyonuna dön.", alts: ["Wall Push-up Explosive"], alt_reasons: ["Yerden zor geliyorsa duvarla açı düşür"] }),
            ]),
            block("💪 KUVVET — Temel Denge", "#F4A261", [
              ex("Inverted Row (Masa Altı)", "4 × 6-10", "Sırt + biceps", ["Göğsü masaya çek", "Boynu öne uzatma", "Üstte 1 sn sık"], { warn: "Bugünün ana çekişi", alts: ["Tek Kol DB Row (5kg, masa/bench destekli)", "Towel Row (Ayak Dirençli)", "Prone Cobra"], alt_reasons: ["Dumbbell'in varsa tek el row daha net yük — masa/bench'e diz ve el ile destek al, dirseği gövdene çek, 3×10-12 her taraf", "Masa veya tezgâh güvenli değilse ayak dirençli towel row kullan", "Hiçbir çekiş kurulamıyorsa prone cobra ile üst sırt aktivasyonunu koru"] }),
              ex("Incline Push-up", "4 × 8-12", "Göğüs + triceps", ["Yüksekliği omuza göre ayarla", "Dirsekleri 30-45° tut"], { warn: "Bugünün güvenli itişi", alts: ["DB Floor Press (5kg tek el, tempo 3-1-1)", "Wall Push-up"], alt_reasons: ["Tek dumbbell varsa yere yat, tek kolla floor press 3×8-10 her taraf — omuz dostu press alternatifi", "Omuz hassassa açıyı daha da yükselt"] }),
              ex("Close Grip Push Up", "2 × 8-10", "Triceps + iç göğüs", ["Elleri biraz daha dar al", "Gerekirse incline yap", "Omuz öne düşmesin"], { warn: "Triceps ve göğüs için düşük riskli ek hacim", alts: ["DB Tek Kol Triceps Ext. (5kg, oturarak overhead)", "Wall Push-up"], alt_reasons: ["Omuz sakinse tek kol triceps extension 5kg · 2×10-12 her taraf · dirseği kulağa yakın tut", "Dar tutuş omuz veya bileği rahatsız ederse açıyı yükselt"] }),
              ex("Towel Curl (Bacak Dirençli)", "2 × 12-15", "Biceps", ["Oturarak, havlunun uçlarını elinde tut", "Alt ucu tek ayakla bas, ayakla direnç ver", "Dirseği gövdeye yakın, omuzu öne alma"], { warn: "Evde direkt biceps hacmi — izometriğin aksine tam ROM verir", alts: ["DB Tek Kol Curl (5kg veya ayarlanabilir 6-8kg)", "Towel Curl Isometric"], alt_reasons: ["Dumbbell'in varsa direkt 3×10-12 her kol — eccentric tempo 3sn; ağırlığı ayarlanabilir dumbbell ile 6-8kg'a çek", "Ayakla direnç ayarı zor geliyorsa izometrik tut ile devam"] }),
              ex("Single Leg Glute Bridge", "3 × 10-12 (her bacak)", "Glute + hamstring", ["Bel değil kalça itişi", "Üstte 1 sn sık"], { warn: "Posterior chain'i güvenli besler", alts: ["DB Single Leg Glute Bridge (5kg pelvis üstünde)"], alt_reasons: ["Dumbbell pelvis üstünde — tek bacak için yeterli ek yük, 3×10 her bacak"], unilateral: true }),
              ex("Wall Sit", "2 × 20-30sn", "Quad izometrik", ["Ağrısız açı bul", "Topuğu yükle"], { avoid: "Derin açı", warn: "Diz baskısı artarsa çıkar", alts: ["DB Goblet Squat (5-8kg)", "DB Goblet Wall Sit (5-8kg)", "Single Leg Glute Bridge"], alt_reasons: ["Diz izin veriyorsa goblet squat — dumbbell göğüs önünde, kısa ROM'da 3×10-12 · menisküs için kontrollü ama progresyon verir", "Wall sit'te dumbbell göğüs önünde — quad yükü belirgin artar", "Diz bugün hoşlanmıyorsa glute dominanta dön"] }),
            ]),
            block("🧠 CORE + KONDİSYON", "#1F618D", [
              ex("Dead Bug", "3 × 8-10 (her taraf)", "Anti-extension core", ["Bel boşluğunu sabit tut", "Yavaş uzat"], { warn: "Bel için ana core", trackable: false }),
              ex("Hızlı Yürüyüş", "24-30 dakika", "Interval aerobik", ["2 dk hızlı + 2 dk rahat", "Konuşabilecek tempo"], { warn: "Dayanıklılık hedefinin ana parçası" }),
            ]),
            upperCooldownBlock(),
          ],
        },
        gym: {
          duration: "~88 dk",
          aerobicMinutes: 15,
          modeNote: "Enerji iyiyse ve semptom düşükse gym yolu daha iyi yüklenir. Yeni: KB swing + med ball + opsiyonel bike sprint anaerobik bloğu.",
          injury: "⚠️ Omuz iyi değilse pull-up hattını lat pulldown'a, press'i machine press kısa ROM'a çek. Bike sprint anaerobik — bel ve diz sakinse yap.",
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
            block("⚡ POWER — Güvenli Patlayıcı", "#FFD166", [
              ex("Explosive Hip Thrust (Barbell veya Plate)", "3 × 8-10", "Hip patlayıcı güç + posterior (bel için güvenli)", ["Omuzlar bench'te, ayaklar kalça genişliğinde", "Concentric fazı hızlı — kalçayı patlayıcı yukarı it", "Üstte kısa kilitle, iniş 2 sn kontrollü"], { warn: "⏱ HAFTA 1'DE YAPMA — vücut yeni paterne hazırlansın. Hafta 2+'dan başla. Bel-boyun fıtığı için KB swing'den çok daha güvenli aynı hat.", alts: ["Kettlebell Swing (12-20kg)"], alt_reasons: ["Bel tamamen sakinse ve KB formuna güveniyorsan alternatif; form bozulunca acilen hip thrust'a dön"] }),
              ex("Medicine Ball Chest Pass (Duvara, 3-5kg)", "3 × 8", "Üst patlayıcı itiş", ["Göğüs hizasında tut — overhead yok", "Duvara patlayıcı it", "Top geri geldiğinde omuzu eccentric absorbe et"], { warn: "⏱ HAFTA 1'DE YAPMA. Hafta 2+'dan başla. Ball 3-5 kg yeterli.", alts: ["Explosive Push-up"], alt_reasons: ["Med ball yoksa explosive push-up ile concentric patlayıcılık kurulur"] }),
              ex("Bike Sprint Intervalları (Şartlı)", "6 × 10sn all-out / 90sn easy", "Anaerobik patlayıcı kapasite", ["10 sn %95+ efor", "90 sn rahat pedal", "Bel ve diz sakinse yap"], { warn: "⏱ HAFTA 1'DE YAPMA. Hafta 2+'dan başla. Enerji düşükse atla. Haftanın tek yüksek yoğunluk anaerobik bloğu.", avoid: "Form bozulmadan durmak", alts: ["Rower Sprint (aynı şema)"], alt_reasons: ["Bike hoşlanmazsa rower ile aynı zamanlamayı yap"] }),
            ]),
            block("💪 KUVVET — Temel Denge", "#F4A261", [
              ex("Chest Supported Row", "3 × 8-10", "Mid sırt + lat", ["Bench desteğini kullan", "Boynu uzun tut", "Üstte kısa sık"], { warn: "Bugünün ana çekişi" }),
              ex("Floor Press", "4 × 8-10", "Göğüs + triceps", ["Omuzları geriye yerleştir", "Dirsekleri kontrollü indir"], { warn: "Omuz dostu press" }),
              ex("Hip Thrust", "3 × 10-12", "Glute max", ["Üstte 1 sn sık", "Bel hiperextansiyonu yapma"], { warn: "Posterior chain tabanı" }),
              ex("Cable Curl", "2 × 10-12", "Biceps", ["Dirseği sabit tut", "Omuzu öne alma"], { warn: "Direkt kol hacmi için düşük riskli ek" }),
              ex("Triceps Pushdown", "2 × 10-12", "Triceps", ["Dirseği gövdeye yakın tut", "Omuzu yükseltme"], { warn: "Omuz dostu triceps hacmi" }),
            ]),
            block("🧠 CORE + KONDİSYON", "#1F618D", [
              ex("Pallof Press", "3 × 10 (her taraf)", "Anti-rotasyon", ["Göğüs hizasında it", "2 sn bekle"], { warn: "Skolyoz/kifoz için değerli", trackable: false }),
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
              ex("Dead Bug", "2 × 8 (her taraf)", "Core kontrol", ["Bel boşluğunu kaçırma"], { trackable: false }),
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
          duration: "~72 dk",
          aerobicMinutes: 18,
          modeNote: "Diz hassas veya enerji düşük günlerde ev versiyonu daha yönetilebilir. Yeni: Farmer Carry bloğu (ev için ağır çanta/su bidonu yeterli).",
          injury: "⚠️ Diz baskısı varsa reverse lunge yerine wall sit; bel yorgunsa tempo row'u normal row'a çevir. Farmer carry yükü bel hissetmiyorken.",
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
              ex("Tempo Inverted Row", "3 × 6-8", "Sırt + skapula", ["3 sn iniş", "Üstte 1 sn dur", "Boynu uzun tut"], { warn: "Bugünün upper-back omurgası", alts: ["Tek Kol DB Row Tempo (5kg, 3 sn iniş)", "Towel Row (Ayak Dirençli)", "Prone Cobra"], alt_reasons: ["Dumbbell varsa tek kol row + 3sn eccentric — aynı stimulus, ölçülebilir yük: 3×8-10 her taraf, masa/bench destekli", "Masa güvenli değilse towel row ile çekiş paterni korunur", "Belirgin ekipman kısıtında prone cobra ile skapula ve torasik kontrolü koru"] }),
              ex("Reverse Lunge (ağırlıksız)", "3 × 6-8 (her bacak)", "Quad + glute", ["Kısa kontrollü adım", "Diz çizgisini koru"], { avoid: "Büyük adım ve derin açı", warn: "Diz baskısı varsa wall sit'e dön", alts: ["DB Suitcase Reverse Lunge (5kg tek el)", "Wall Sit"], alt_reasons: ["Tek dumbbell'i yük tarafında tutarak asymmetric yük — core extra stabilizasyon, 3×6 her bacak", "Menisküs hassassa izometrik seçenek daha güvenli olabilir"], unilateral: true }),
              ex("Wall Sit", "1-2 × 20-30sn", "Quad izometrik", ["Ağrısız diz açısında kal", "Topuğu yükle"], { warn: "Reverse lunge iyi gidiyorsa düşük doz quad finisher olarak kullan", alts: ["DB Goblet Wall Sit (5-8kg)", "Single Leg Glute Bridge"], alt_reasons: ["Dumbbell göğüs önünde tut — quad yükü +%40, bel nötr", "Diz o gün wall sit'i de sevmiyorsa glute dominanta dön"] }),
              ex("Hip Thrust (Sandalye)", "3 × 12-15", "Glute max", ["Üstte kısa sık", "Bel yerine kalçadan it"], { alts: ["DB Hip Thrust (8kg pelvis üstünde)", "Single Leg Hip Thrust"], alt_reasons: ["Ayarlanabilir dumbbell'i pelvis üstüne koy — yastık/havlu ile destekle, 3×10-12. Bugün yük almak için en güvenli yer", "Bir tek bacak ile yap — ağırlık yerine tek bacak stimulus"] }),
              ex("Single Leg RDL (Bodyweight)", "2 × 6-8 (her bacak)", "Posterior chain + denge", ["Kalçadan menteşelen, dizi hafif yumuşak tut", "Gövde ve arkadaki bacak paralel inecek", "Denge için duvar veya sandalye desteği kullan"], { warn: "Tek taraflı hinge + asimetri tespiti; skolyoz için değerli", alts: ["DB Single Leg RDL (5kg karşı elde)", "Single Leg Glute Bridge"], alt_reasons: ["Dumbbell'i duran bacağın karşı tarafında tut — asymmetric yük denge ve skolyoz kontrolü için ideal, 3×6 her taraf", "Denge tutmuyorsa glute dominanta dön"], unilateral: true }),
              ex("Bridge Walkout", "2 × 6-8", "Hamstring curl hattı", ["Köprüde kal", "Topukları yavaş uzağa yürüt", "Belini düşürme"], { warn: "Hamstring knee-flexion için evde güvenli başlangıç", alts: ["Single Leg Glute Bridge"], alt_reasons: ["Bel veya arka bacak krampı olursa glute dominanta geri dön"] }),
            ]),
            block("🏋 LOADED CARRY", "#E76F51", [
              ex("Farmer Carry (Ağır Çanta / Su Bidonu)", "2 × 30-40 sn", "Grip + core + locomotion", ["Yük gövde yanında, omuzlar aşağıda", "Göbek içeri, nefes ritmik", "Adım küçük ve stabil"], { warn: "Atletik taşıma kapasitesi (tactical athlete standartı); grip + core + kondisyon tek harekette", alts: ["DB Suitcase Carry (5kg veya 8kg tek el)", "Suitcase Carry (tek tarafta)", "Ağırlıksız Yavaş Yürüyüş (form odaklı)"], alt_reasons: ["Tek dumbbell ile tek el carry — 2×30sn her taraf, gövde yana eğilmemeli. Grip + anti-lateral core", "Asimetri çalışması istiyorsan suitcase", "Uygun yük yoksa formu sabit tutarak yürüyüş ritmine odaklan"] }),
            ]),
            block("🧠 CORE + KONDİSYON", "#1F618D", [
              ex("Bird Dog", "2 × 8 (her taraf)", "Anti-rotasyon", ["Kol-bacağı yavaş uzat", "Belini oynatma"], { warn: "Bel yorgun günlerde çok değerli", trackable: false }),
              passiveEx("Side Plank", "2 × 30sn (her taraf)", "Lateral core", ["Kalça çizgisini koru"], { warn: "Skolyoz/kifoz için ana blok" }),
              ex("Hızlı Yürüyüş", "15-20 dakika tempo", "Tempo aerobik", ["RPE 5-6", "Koşuya kaçma"]),
            ]),
            lowerCooldownBlock(),
          ],
        },
        gym: {
          duration: "~78 dk",
          aerobicMinutes: 15,
          modeNote: "Gym yolu quad ve upper-back için daha ölçülebilir yük sağlar. Yeni: Farmer Carry bloğu (tactical athlete standartı).",
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
              ex("Box Step Down (eccentric)", "2 × 5-6 (her bacak)", "Quad kontrol", ["Alçak kutu kullan", "3 sn yavaş iniş", "Destek alarak kalça-diz hattını koru"], { warn: "Quad toleransını güvenli progresyonla artırır", alts: ["Wall Sit"], alt_reasons: ["Step-down dizde hoş değilse izometrik seçeneğe dön"], unilateral: true }),
              ex("Machine Seated Leg Curl", "2 × 10-12", "Hamstring curl hattı", ["Kalçayı minderden kaldırma", "Topuğu kontrollü çek", "Belini sabit tut"], { warn: "Hamstring knee-flexion için güvenli makine seçeneği", alts: ["Machine Lying Leg Curl"], alt_reasons: ["Oturarak versiyon hoş değilse lying curl kullan"] }),
              ex("Single Leg RDL (Dumbbell Hafif)", "2 × 8 (her bacak)", "Posterior chain + denge", ["Hafif dumbbell ile kalçadan menteşelen", "Dizi yumuşak tut, arkadaki bacak paralele inecek", "Boynu omurga ile aynı hizada tut"], { warn: "Tek taraflı hinge + asimetri tespiti", alts: ["Bodyweight Single Leg RDL"], alt_reasons: ["Denge yoksa ağırlıksız + duvar desteği ile başla"], unilateral: true }),
              ex("Chest Supported Row", "3 × 10", "Upper back", ["Bench desteğinde boynu uzun tut"], { warn: "Bugünün upper-back omurgası" }),
              ex("Band Face Pull", "2 × 12-15", "Arka omuz + alt trapez", ["Dirsekleri çok yükseltmeden çek"], { warn: "Kifoz eğilimine karşı iyi kapanış" }),
              ex("Cable Lateral Raise", "2 × 12-15", "Yan omuz", ["Skapular planda kaldır", "Hafif kilo kullan", "Ağrısız aralıkta kal"], { warn: "Omuz hacmi için şartlı ve hafif ek set" }),
              ex("Landmine Press", "2 × 8-10", "Omuz dostu press", ["Kaburgayı kapat", "Barı çapraz yukarı it"], { warn: "Şartlı hareket: omuz ağrısızsa", alts: ["Floor Press"], alt_reasons: ["Landmine bile rahatsızsa floor press'e dön"] }),
            ]),
            block("🏋 LOADED CARRY", "#E76F51", [
              ex("Farmer Carry (Dumbbell / Trap Bar)", "2 × 30-40 sn", "Grip + core + locomotion", ["Yük gövde yanında", "Omuzlar aşağıda, kaburga kapalı", "Adım kısa, stabil"], { warn: "Tactical athlete standartı. Ağır ama form üzerinde; bel hissetmiyorsa yük +2.5 kg.", alts: ["Suitcase Carry (tek tarafta)", "Overhead Carry (omuz tamamen iyiyse)"], alt_reasons: ["Asimetri için suitcase", "Overhead carry ancak omuz sakinse — şartlı ileri seviye"] }),
            ]),
            block("🧠 CORE + KONDİSYON", "#1F618D", [
              passiveEx("Side Plank", "2 × 30-40sn (her taraf)", "Lateral core", ["Kalça çizgini koru"]),
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
              ex("Hip Thrust (Sandalye)", "4 × 10-12", "Glute", ["Üstte 1 sn sık", "Belden itme"], { warn: "Bugünün posterior chain omurgası", alts: ["DB Hip Thrust (8kg pelvis üstünde)"], alt_reasons: ["Ayarlanabilir dumbbell'i pelvis üstüne havlu/yastık ile koy — 4×10-12. Hacim gününde yüklü versiyon çok daha iyi stimulus"] }),
              ex("Inverted Row (Masa Altı)", "4 × 8-10", "Sırt", ["Göğsü çek", "Boynu nötr tut"], { warn: "Bugünün ana pull hacmi", alts: ["Tek Kol DB Row (5kg) + Inverted Row superset", "Towel Row (Ayak Dirençli)", "Prone Cobra"], alt_reasons: ["Hacim günü için: 2 set Inverted Row + 2 set DB Row her taraf — farklı açıdan sırt stimulus", "Masa veya tezgâh stabil değilse towel row ile devam et", "Kurulum yoksa prone cobra ile üst sırt hacmini en azından koru"] }),
              ex("Incline Push-up", "3 × 10-12", "Göğüs", ["Ağrısız ROM'da kal"], { warn: "Push destek hacmi; ana iş değil", alts: ["DB Floor Press (5kg tek el, her taraf 3×10)"], alt_reasons: ["Omuz sakinse tek el floor press ile hacim — her taraf 3×10, eccentric 3sn tempo"] }),
              ex("Towel Curl (Bacak Dirençli)", "2 × 12-15", "Biceps", ["Oturarak havlunun uçlarını elinde tut", "Alt ucu tek ayakla bas, ayakla direnç ver", "Dirseği sabit, tempo kontrollü"], { warn: "Evde direkt biceps hacmi; tam ROM verir", alts: ["DB Tek Kol Curl (6-8kg ayarlanabilir)", "Towel Curl Isometric"], alt_reasons: ["Ayarlanabilir dumbbell'i 6-8kg'a çek, her kol 3×8-10 — hacim günü direkt yük", "Direnç ayarı zor geliyorsa izometrik tut ile devam"] }),
              ex("Single Leg Glute Bridge", "2 × 10 (her bacak)", "Glute + hamstring", ["Kontrollü kaldır"], { alts: ["DB Single Leg Glute Bridge (5kg pelvis üstünde)", "Wall Sit"], alt_reasons: ["Dumbbell karşı tarafta pelvis üstünde — tek bacak yükü artar", "Diz iyi, quad dokunuş istiyorsan wall sit kullan"], unilateral: true }),
            ]),
            block("🧠 CORE + KONDİSYON", "#1F618D", [
              ex("Dead Bug", "2 × 8-10 (her taraf)", "Core", ["Bel sabit"], { trackable: false }),
              passiveEx("Side Plank", "2 × 30sn (her taraf)", "Lateral core", ["Kalça çizgini koru"]),
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
              ex("Pallof Press", "2 × 10 (her taraf)", "Anti-rotasyon", ["2 sn bekle"], { trackable: false }),
              passiveEx("Side Plank", "2 × 30sn (her taraf)", "Lateral core", ["Kalça çizgisi"]),
              ex("Rower — Progresif Threshold Protokolü", "Haftaya göre değişir (aşağıdaki talimat)", "Progresif threshold + aerobik baz", ["📅 HAFTA 1-3: Pure Zone 2 — 20-25 dk rahat (RPE 5-6). Önce aerobik baz otur.", "📅 HAFTA 4-6: 2×4dk threshold (RPE 7-8) + 15 dk Zone 2. Threshold'a giriş.", "📅 HAFTA 7-8: 4×4dk threshold (RPE 7-8) + 8-10 dk Zone 2. Tam hedef.", "Threshold dakikalarında konuşmak zor olmalı ama form bozulmamalı", "Bel-boyun rower formu kritik — kaburga kapalı, nötral omurga"], { warn: "Progresif: önce baz sonra threshold. Hafta 4 öncesi threshold yapma — form ve kapasite riski yüksek.", alts: ["Bike — aynı progresyon (aynı süre şemasını bike'da uygula)", "Pure Zone 2 (her hafta için yedek)"], alt_reasons: ["Rower bel/boyun için riskli hissederse bike'da aynı progresyonu uygula", "O gün enerji/form iyi değilse her haftada pure Zone 2'ye dön"] }),
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
              ex("Dead Bug", "2 × 8 (her taraf)", "Core", ["Bel sabit"], { trackable: false }),
              passiveEx("Side Plank", "2 × 20-30sn (her taraf)", "Lateral core", ["Kısa ama temiz tut"]),
              passiveEx("Standing Calf Raise", "2 × 15-20", "Alt bacak", ["Üstte 1 sn sık", "Topukları kontrollü indir"], { warn: "Zone 2 öncesi calf aktivasyonu; haftalık alt bacak tek direkt çalışmalarından biri" }),
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
              ex("Pallof Press", "2 × 12 (her taraf)", "Core", ["2 sn bekle"], { trackable: false }),
              passiveEx("Side Plank", "2 × 20-30sn (her taraf)", "Lateral core", ["Kısa ama temiz" ]),
              passiveEx("Standing Calf Raise", "2 × 15-20", "Alt bacak", ["Üstte 1 sn sık", "Topukları kontrollü indir"], { warn: "Zone 2 öncesi calf aktivasyonu" }),
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
