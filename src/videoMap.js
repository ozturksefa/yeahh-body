// Egzersiz GIF Haritası — %100 ExerciseDB GIF
// Tüm URL'ler: https://static.exercisedb.dev/media/{ID}.gif
// API bağımlılığı YOK, YouTube bağımlılığı YOK — anında yüklenir

const GIF_MAP = {
  // ══════════════════════════════════════════════════════
  // POSTÜR RUTİNİ (her gün)
  // ══════════════════════════════════════════════════════
  "Chin Tuck":                          "oQRJYkC",  // ≈ side push neck stretch (DB'de chin tuck yok, en yakın boyun hareketi)
  "Band Pull Apart":                    "sTfvVsG",  // band reverse fly
  "Foam Roller Upper Back Roll":        "isofgzg",  // roller back stretch
  "Half Kneeling Hip Flexor Stretch":   "2LQkNPW",  // exercise ball hip flexor stretch
  "Deep Sumo Squat":                    "dzz6BiV",  // ≈ smith sumo squat (DB'de BW sumo hold yok, aynı pozisyon)

  // ══════════════════════════════════════════════════════
  // GÜN 1 — UPPER BACK DOMINANT
  // ══════════════════════════════════════════════════════
  // Isınma B
  "Dumbbell Seated Neutral Wrist":      "uJmK7Z1",  // dumbbell seated neutral wrist curl
  "Shoulder Dislocates":                "TFA88iB",  // band front raise (≈ band üzerinden ark hareketin ilk yarısı)

  // Mobilite
  "Cat and Cow":                        "qBcKorM",  // ≈ all fours stretch (DB'de cat-cow yok, aynı başlangıç pozisyonu)
  "Prayer Pose on Bench with Roller":   "f38OEuO",  // kneeling lat stretch

  // Aktivasyon
  "Arms External Rotation Left":       "FWdVhcW",  // cable standing shoulder external rotation
  "Arms External Rotation Right":      "FWdVhcW",
  "Arms Internal Rotation Left":       "YPoVrBi",  // cable seated shoulder internal rotation
  "Arms Internal Rotation Right":      "YPoVrBi",
  "Straight Arm Pulldown":             ["x69MAlq","DT14T9T"],  // bar + rope attachment
  "Scapula Push Up":                   "jV65tKx",  // scapula push-up

  // Kuvvet
  "Assisted Pull Up":                  ["kiJ4Z2K","r1XNRYB"],  // makine + band destekli
  "45 Degree Incline Row (Single Arm)":"7vG5o25",  // dumbbell incline row
  "Incline Dumbbell Press":            ["ns0SIbU","3TZduzM"],  // dumbbell + barbell
  "Face Pull":                         "ZfyAGhK",  // cable standing rear delt row (with rope) — ayakta + rope + rear delt
  "Incline Dumbbell Curl":             ["ae9UoXQ","RaflbWD"],  // iki farklı açı

  // Calisthenics
  "Push Up":                           "I4hDWkc",  // push-up
  "Captains Chair Bent Knee Raise":    "weoDEpH",  // captains chair straight leg raise

  // Finisher
  "Rowing Machine":                    "vpQaQkH",  // ski ergometer (≈ en yakın kardiyovasküler makine)

  // Soğuma Gün 1
  "Above Head Chest Stretch":          "QoHIhPl",  // behind head chest stretch
  "Chair Lat Stretch":                 "f38OEuO",  // kneeling lat stretch
  "Shoulder Stretch Behind Back":      "Uto7l43",  // chest and front of shoulder stretch
  "Childs Pose to Cobra Pose":         "XPUDTt7",  // pike-to-cobra push-up
  "Neck Side Stretch":                "x2chWLO",  // neck side stretch
  "Dynamic Chest Stretch":            "3uj0Ozg",  // dynamic chest stretch
  "Wrist Pull Stretch":               "UtmIqcI",  // side wrist pull stretch

  // ══════════════════════════════════════════════════════
  // GÜN 2 — LOWER STRENGTH
  // ══════════════════════════════════════════════════════
  // Isınma B
  "One Leg Straight Stretch":          "sU5BrfP",  // leg up hamstring stretch
  "One Leg Hip Abduction Right":       "7WaDzyL",  // side hip abduction
  "One Leg Hip Abduction Left":        "7WaDzyL",
  "Hip Stretch Left":                  "yn0LjwL",  // assisted lying glutes stretch (sırt üstü diz göğse)
  "Kettlebell Ankle Static Stretch":   "m0tCHqc",  // calf stretch wall (ankle dorsiflexion, dizi öne it)

  // Aktivasyon
  "Floor Bridge":                      "u0cNiij",  // low glute bridge on floor
  "Cable Hip Abduction":              "0xDpB4L",  // resistance band seated hip abduction
  "Seated Leg Extension with Band":   "Y1MsI1l",  // resistance band leg extension

  // Kuvvet
  "Dumbbell Goblet Squat":            ["yn8yg1r","ZA8b5hc"],  // dumbbell + kettlebell
  "Dumbbell Romanian Deadlift":       ["rR0LJzx","wQ2c4XD"],  // dumbbell + barbell
  "Leg Press":                         ["10Z2DXU","2Qh2J1e"],  // önden + yandan görünüm
  "Dumbbell Step Up":                  "aXtJhlg",  // dumbbell step-up
  "Hip Thrust":                        "qg2PGl6",  // barbell glute bridge two legs on bench (sırt bench'te)
  "Machine Seated Leg Curl":           ["Zg3XY7P","17lJ1kr"],  // oturarak + yatarak

  // Core
  "Dead Bug":                          "iny3m5y",  // dead bug
  "Side Plank Leg Raise Left":         "5VXmnV5",  // bodyweight incline side plank (doğru pozisyon)
  "Side Plank Leg Raise Right":        "5VXmnV5",

  // Finisher
  "Kettlebell Swing":                  "UHJlbu3",  // kettlebell swing

  // Soğuma Gün 2
  "Standing Quad Stretch Left":        "tFGKm99",  // intermediate hip flexor and quad stretch
  "Standing Quad Stretch Right":       "tFGKm99",
  "Hamstring, Obliques and Lat Stretch":"99rWm7w",  // hamstring stretch
  "Hug Knees to Chest":               "znP9SIh",  // hug keens to chest
  "Standing Calf Stretch":            "qOKcgVP",  // standing calves calf stretch

  // ══════════════════════════════════════════════════════
  // GÜN 3 — UPPER HYPERTROPHY
  // ══════════════════════════════════════════════════════
  "Seated Spinal Twist Glute Stretch": "DeDThfG",  // seated glute stretch

  // Kuvvet
  "Machine Lat Pulldown":             ["7F1DVzn","qdRxqCj"],  // lever front pulldown + cable pulldown pro lat bar
  "Seated Cable Row (Single Arm)":    "Tq6gbK6",  // cable straight back seated row
  "Dumbbell 4 Ways Lateral Raise":    ["3eGE2JC","DsgkuIt","v1qBec9","xMjBKwn"],  // öne, yana, arkaya, çapraz
  "Standing Dumbbell Hammer Curl":    ["slDvUAU","Qyk5J3p"],  // standart + cross body
  "Standing Dumbbell Reverse Curl":   ["0IgNjSM","xNrS20v"],  // dumbbell + barbell
  "Cable Overhead Triceps Extension": "2IxROQ1",  // cable overhead triceps extension (rope)
  "Assisted Chin Up":                 "MaMuGH6",  // lever assisted chin-up

  // Calisthenics
  "Diamond Push Up":                  "soIB2rj",  // diamond push-up
  "Pike Push Up":                     "epOSYUZ",  // modified hindu push-up (V pozisyonu, akan hareket)
  "Jump Rope":                        "e1e76I2",  // jump rope

  // Soğuma Gün 3
  "Standing Triceps and Lat Stretch": "Z5YStHW",  // overhead triceps stretch
  "Rotator Cuff Stretch Left":       "xifhB5W",  // rear deltoid stretch (cross-body kol çekme)
  "Rotator Cuff Stretch Right":      "xifhB5W",

  // ══════════════════════════════════════════════════════
  // GÜN 4 — LOWER ATHLETIC
  // ══════════════════════════════════════════════════════
  // Isınma B
  "Hip Hinge":                        "lHeUULr",  // band straight back stiff leg deadlift (hip hinge pattern)
  "Jefferson Squats":                 "pkSoCW9",  // barbell jefferson squat
  "Cossack Squat":                    "GWoKnIm",  // weighted cossack squats (male)

  // Aktivasyon
  "Glute Bridge Hamstring Walk":      "GibBPPg",  // glute bridge march
  "Monster Walk":                     "O95afRA",  // monster walk

  // Kuvvet
  "Dumbbell Deadlift":                ["nUwVh7b","ila4NZS"],  // dumbbell + barbell
  "Dumbbell Reverse Lunge":           "SSsBDwB",  // dumbbell rear lunge
  "One Leg Hip Thrust Right":         "rmEukuS",  // single leg bridge with outstretched leg
  "One Leg Hip Thrust Left":          "rmEukuS",
  "Double Kettlebell Farmer's Carry": "qPEzJjA",  // farmers walk

  // Core
  "Side Plank One Leg Slide Left":    "RKjH6Lt",  // side bridge v. 2
  "Side Plank One Leg Slide Right":   "RKjH6Lt",

  // Finisher
  "Sled Push / Rowing Machine":       "vpQaQkH",  // ski ergometer

  // Soğuma Gün 4
  "Standing Half Forward Bend":       "BbfB8Gb",  // basic toe touch (male)
  "Lizard Pose Left":                 "2Dk4xQV",  // rocking frog stretch (derin kalça/kasık açılımı)
  "Lizard Pose Right":                "2Dk4xQV",
  "Supine Spinal Twist Right":        "6sYyrRX",  // bent knee lying twist (male)
  "Supine Spinal Twist Left":         "6sYyrRX",

  // ══════════════════════════════════════════════════════
  // ALTERNATİF HAREKETLER (swap için)
  // ══════════════════════════════════════════════════════
  "90/90 External Rotation":          "FWdVhcW",  // cable standing shoulder external rotation
  "90/90 Hip Stretch":                "oMypNrz",  // roller hip stretch
  "Ab Wheel Rollout":                 "xnInPfE",  // barbell standing ab rollerout
  "Ankle Circles":                    "uL9CsKm",  // ankle circles
  "Ankle Mobility (duvara karşı)":    "m0tCHqc",  // calf stretch with hands against wall
  "Archer Push Up":                   "A9qxk2F",  // archer push up
  "Assault Bike":                     "H1PESYI",  // stationary bike run
  "Assault Bike 30sn":                "H1PESYI",  // stationary bike run
  "Assisted Pull Up (Gün 1'de var)":  "r1XNRYB",  // band assisted pull-up
  "Assisted Squat (MAC+)":            "ZA8b5hc",  // kettlebell goblet squat
  "Band Hip Abduction":               "0xDpB4L",  // resistance band seated hip abduction
  "Band Hip Circle":                  "E4R8Hz1",  // band hip lift
  "Band Row":                         "tc5dYrf",  // band standing rear delt row
  "Band Shoulder Opener":             "peAeMR3",  // band shoulder press
  "Band Squat (MAC+)":               "TUZLh71",  // band squat
  "Band Straight Arm Pulldown":       "x69MAlq",  // cable straight arm pulldown
  "Banded Glute Bridge":             "aWedzZX",  // glute bridge two legs on bench
  "Banded Hip Thrust":               "Pjbc0Kt",  // resistance band hip thrusts on knees
  "Barbell Deadlift":                "ila4NZS",  // barbell deadlift
  "Battle Rope 30sn":                "RJa4tCo",  // battling ropes
  "Bear Crawl Hold":                 "0Yz8WdV",  // bear crawl
  "Bench Thoracic Extension":        "zkgRrbK",  // hyperextension (on bench)
  "Box Squat":                       "W9pFVv1",  // barbell bench squat
  "Box Step Down (eccentric)":       "aXtJhlg",  // dumbbell step-up
  "Bulgarian Split Squat (güçlendikçe)": "QpXqiq8",  // suspended split squat
  "Cable Chest Press":               "nIR4Rwl",  // cable seated chest press
  "Cable Curl":                      "G08RZcQ",  // cable curl
  "Cable External Rotation":         "FWdVhcW",  // cable standing shoulder external rotation
  "Cable Hammer Curl":               "HPlPoQA",  // cable hammer curl (with rope)
  "Cable Internal Rotation":         "YPoVrBi",  // cable seated shoulder internal rotation
  "Cable Lateral Raise":             "goJ6ezq",  // cable lateral raise
  "Cable Pull Through":              "OM46QHm",  // cable pull through (with rope)
  "Cable Reverse Curl":              "eOG0r6v",  // cable reverse curl
  "Cable Reverse Fly":               "PQcUlDi",  // cable supine reverse fly
  "Chest Supported Row":             "dmgMp3n",  // barbell incline row
  "Child's Pose to Cobra Pose (MAC+)": "XPUDTt7",  // pike-to-cobra push-up
  "Chin Up":                         "MaMuGH6",  // lever assisted chin-up
  "Close Grip Pulldown":             "4LoWllp",  // band fixed back close grip pulldown
  "Close Grip Push Up":              "8K7m2SS",  // medicine ball close grip push up
  "Couch Stretch":                   "tFGKm99",  // intermediate hip flexor and quad stretch
  "Cross-body Hammer Curl":          "Qyk5J3p",  // dumbbell cross body hammer curl
  "Cross-body Shoulder Stretch":     "xifhB5W",  // rear deltoid stretch
  "Deep Sumo Squat (MAC+)":          "dzz6BiV",  // smith sumo squat
  "Deficit Reverse Lunge":           "SSsBDwB",  // dumbbell rear lunge
  "Doorway Stretch":                 "ykA5tU7",  // chest stretch with exercise ball
  "Dumbbell Overhead Triceps Extension": "zZlORz6",  // dumbbell lying one arm supinated triceps extension
  "Dumbbell Row (MAC+)":             "C0MA9bC",  // dumbbell one arm bent-over row
  "Dumbbell Swing":                  "UHJlbu3",  // kettlebell swing
  "Dumbbell Wrist Curl":             "IvV6C9M",  // dumbbell over bench one arm neutral wrist curl
  "Dumbbell Wrist Curl Left/Right":  "IvV6C9M",  // dumbbell over bench one arm neutral wrist curl
  "EZ Bar Reverse Curl":             "Y5X65IB",  // ez barbell reverse grip curl
  "Elevated Pike Push Up":           "sVvXT5J",  // exercise ball pike push up
  "Elevated Push Up":                "i5cEhka",  // decline push-up
  "Face Pull (hafif)":               "G61cXLk",  // cable kneeling rear delt row (with rope)
  "Farmer Carry (ağır)":             "qPEzJjA",  // farmers walk
  "Farmer Carry (dumbbell)":         "qPEzJjA",  // farmers walk
  "Foam Roller Chest Opener":        "isofgzg",  // roller back stretch
  "Frog Pose":                       "2Dk4xQV",  // rocking frog stretch
  "Frog Pose Deep Squat (MAC+)":     "2Dk4xQV",  // rocking frog stretch
  "Glute Bridge Hamstring Walk (MAC+)": "GibBPPg",  // glute bridge march
  "Good Morning (hafif)":            "JrOHAZc",  // barbell stiff leg good morning
  "Good Morning (vücut ağırlığı)":   "JrOHAZc",  // barbell stiff leg good morning
  "Hack Squat":                      "Qa55kX1",  // sled hack squat
  "Half Kneeling Hip Flexor Stretch with Rotation (MAC+)": "2LQkNPW",  // exercise ball hip flexor stretch
  "Handstand Hold (duvara karşı — Hafta 9-12)": "XooAdhl",  // handstand
  "Hanging Knee Raise":              "03lzqwk",  // assisted hanging knee raise
  "Hanging Knee Raise (omuz iyileşince)": "03lzqwk",  // assisted hanging knee raise
  "Hex Bar Deadlift":                "jQGwmxN",  // trap bar deadlift
  "High Cable Rear Delt Row":        "yUdIGNs",  // cable rear delt row (stirrups)
  "High Knees (ip yoksa)":           "J9zIWig",  // walking high knees lunge
  "Hip Hinge Drill":                 "lHeUULr",  // band straight back stiff leg deadlift
  "Hip Stretch Right":               "yn0LjwL",  // assisted lying glutes stretch
  "Hip Thrust (bilateral)":          "Pjbc0Kt",  // resistance band hip thrusts on knees
  "Hip Thrust (hafif)":              "Pjbc0Kt",  // resistance band hip thrusts on knees
  "Incline Dumbbell Hammer Curl (MAC+)": "cWemPG8",  // dumbbell prone incline hammer curl
  "Incline Push Up":                 "CB8WET1",  // incline push up depth jump
  "Jump Squat (diz uygunsa)":        "UgDm3oy",  // kneeling jump squat
  "Kettlebell Swing (ağır)":         "UHJlbu3",  // kettlebell swing
  "Kettlebell Swing (hafif)":        "UHJlbu3",  // kettlebell swing
  "Landmine Press":                  "eXMFHww",  // landmine lateral raise
  "Lat Foam Roll":                   "c3Pfhti",  // roller side lat stretch
  "Lat Pulldown":                    "ecpY0rH",  // reverse grip machine lat pulldown
  "Lat Pulldown (close grip)":       "ecpY0rH",  // reverse grip machine lat pulldown
  "Lateral Lunge":                   "py1HSzx",  // barbell lateral lunge
  "Lateral Raise":                   "AQ0mC4Y",  // dumbbell full can lateral raise
  "Latissimus Stretch Assisted":     "f38OEuO",  // kneeling lat stretch
  "Leaning Lateral Raise":           "AQ0mC4Y",  // dumbbell full can lateral raise
  "Leg Extension Machine (hafif)":   "my33uHU",  // lever leg extension
  "Lying Hamstring Stretch w/ Band": "99rWm7w",  // hamstring stretch
  "Lying Leg Raise":                 "UGhRD1A",  // assisted lying leg raise
  "Machine Lying Leg Curl":          "17lJ1kr",  // lever lying leg curl
  "Negative Chin Up":                "MaMuGH6",  // lever assisted chin-up
  "Negative Pull Up":                "72BC5Za",  // archer pull up
  "One Leg Hip Abduction (MAC+)":    "7WaDzyL",  // side hip abduction
  "One Leg Hip Thrust Right/Left (MAC+)": "rmEukuS",  // single leg bridge
  "Open Book Stretch":               "bmBf7LN",  // dumbbell lying external shoulder rotation
  "Pallof Press":                    "9pa4H5m",  // band horizontal pallof press
  "Pigeon Pose":                     "yn0LjwL",  // assisted lying glutes stretch
  "Prayer Pose on Bench":            "f38OEuO",  // kneeling lat stretch
  "Prayer Stretch":                  "UtmIqcI",  // side wrist pull stretch
  "Prone Internal Rotation":         "vIICElP",  // band lying hip internal rotation
  "Reverse Fly (DB)":                "PQcUlDi",  // cable supine reverse fly
  "Reverse Wrist Curl":              "Ezpnw9d",  // band reverse wrist curl
  "Ring Row":                        "VPPtusI",  // inverted row bent knees
  "Romanian Deadlift":               "wQ2c4XD",  // barbell romanian deadlift
  "Romanian Deadlift (çok hafif)":   "wQ2c4XD",  // barbell romanian deadlift
  "Romanian Deadlift (hızlı tempo)": "wQ2c4XD",  // barbell romanian deadlift
  "Rowing Machine (omuz yorgunsa)":  "vpQaQkH",  // ski ergometer
  "SCM Stretch":                     "oQRJYkC",  // side push neck stretch
  "Scapula Pull Up":                 "uTBt1HV",  // scapular pull-up
  "Side Plank Hip Dip":              "VO2qeJg",  // side plank hip adduction
  "Side Plank Leg Raise Left (MAC+)":  "5VXmnV5",  // bodyweight incline side plank
  "Side Plank Leg Raise Right (MAC+)": "5VXmnV5",  // bodyweight incline side plank
  "Side Plank One Leg Slide Left (MAC+)":  "RKjH6Lt",  // side bridge v. 2
  "Side Plank One Leg Slide Right (MAC+)": "RKjH6Lt",  // side bridge v. 2
  "Side-lying External Rotation":    "bmBf7LN",  // dumbbell lying external shoulder rotation
  "Side-lying Hip Abduction":        "WL4EmxJ",  // side bridge hip abduction
  "Single Arm Pulldown":             "U5INZY6",  // cable one arm pulldown
  "Single Leg Calf Raise":           "1kB3Wmk",  // dumbbell single leg calf raise
  "Single Leg Glute Bridge":         "rmEukuS",  // single leg bridge
  "Single Leg RDL":                  "gKozT8X",  // dumbbell single leg deadlift
  "Ski Erg":                         "vpQaQkH",  // ski ergometer
  "Skull Crusher":                   "h8LFzo9",  // barbell lying triceps extension skull crusher
  "Smith Machine Squat":             "jFtipLl",  // smith squat
  "Soleus Stretch (diz bükülü)":     "17bqEXD",  // seated calf stretch
  "Standing Hip Flexor Stretch":     "tFGKm99",  // intermediate hip flexor and quad stretch
  "Stationary Bike":                 "H1PESYI",  // stationary bike run
  "Suitcase Carry":                  "qPEzJjA",  // farmers walk
  "Suitcase Carry (tek el)":         "qPEzJjA",  // farmers walk
  "Supine Hamstring Stretch":        "99rWm7w",  // hamstring stretch
  "Swiss Ball Hamstring Curl":       "GOJKFfO",  // exercise ball hamstring curl
  "Thoracic Extension":              "zkgRrbK",  // hyperextension (on bench)
  "Trap Bar Carry":                  "jQGwmxN",  // trap bar deadlift
  "Triceps Dip (bench)":             "J60bN17",  // assisted triceps dip
  "Triceps Pushdown":                "gAwDzB3",  // cable triceps pushdown (v-bar)
  "Triceps Pushdown (Hafta 4-8'de eklenecek)": "gAwDzB3",  // cable triceps pushdown (v-bar)
  "Upper Trap Stretch":              "GSDioYu",  // upper back stretch
  "VMO Squat":                       "Y1MsI1l",  // resistance band leg extension
  "Walking Lunge":                   "IZVHb27",  // walking lunge
  "Wall Chest Stretch":              "ykA5tU7",  // chest stretch with exercise ball
  "Wall Pike Push Up":               "sVvXT5J",  // exercise ball pike push up
  "Wide Push Up":                    "JmMVpR3",  // wide hand push up
  "Wrist Circles":                   "2zNKRUB",  // wrist circles
  "Wrist Flexion & Extension":       "82LxxkW",  // barbell wrist curl
  "Bird Dog":                        "qBcKorM",  // all fours squad stretch
  "Clamshell":                       "c8f5cSY",  // side lying hip adduction
  "Hollow Body Hold":                "iny3m5y",  // dead bug (aynı pozisyon)
  "Nordic Hamstring Curl":           "ZSY3MsL",  // self assisted inverse leg curl (on floor)
  "Doorway Chest Stretch":           "3uj0Ozg",  // dynamic chest stretch
  "Lateral Step Up":                 "76vfTdU",  // dumbbell step up single leg balance
  "Side Step with Band":             "O95afRA",  // monster walk
  "Prone Y-T-W":                     "4GqRrAk",  // superman push-up


  // ══ PROGRAM 3 ATLETİK + GENEL EKSİKLER ══
  "Hip Flexor Stretch": "2LQkNPW",
  "Diaphragmatic Breathing": "qBcKorM",
  "Ankle Circle": "uJmK7Z1",
  "Weighted Pull Up / Assisted": "kiJ4Z2K",
  "Barbell / DB Bent Over Row": "DbtZJMM",
  "Bulgarian Split Squat": "8FpGit5",
  "Push Up Variations": "I4hDWkc",
  "Double Farmer Carry": "ZqnHiEb",
  "Sprint Interval": "0LO2VL2",
  "Pull Up Ladder": "kiJ4Z2K",
  "Dip": "eGBfCB5",
  "Push Up to Row (DB)": "DbtZJMM",
  "Inverted Row": "gZfkTLq",
  "Single Arm DB Press (Alternating)": "wbNPCJ1",
  "Bear Crawl": "jV65tKx",
  "Suitcase Carry (Tek El)": "ZqnHiEb",
  "AMRAP 8 Dakika": "I4hDWkc",
  "Prone Cobra Stretch": "f38OEuO",
  "Seated Forward Fold": "kF3FBSD",
  "World Greatest Stretch": "2LQkNPW",
  "Single Arm DB Row (Ağır)": "ynVKlM2",
  "Floor Press": "ns0SIbU",
  "L-sit Tuck Hold": "eGBfCB5",
  "Sandbag / DB Complex": "DbtZJMM",
  "Yük Taşıma Devresi": "ZqnHiEb",
  "Standing Quad Stretch": "SHZTxN7",
  "KB Swing (Heavy)": "UHJlbu3",
  "Push Press": "wbNPCJ1",
  "Trap Bar / DB Shrug Carry Combo": "ZqnHiEb",
  "Pull Up Max Test": "kiJ4Z2K",
  "Push Up Max Test": "I4hDWkc",
  "Dip Max Test": "eGBfCB5",
  "20 Dakika Sürekli Devre": "I4hDWkc",
  "Glute Bridge": "u0cNiij",

  // ══ KLASİK PROGRAM EK GIF'LER ══
  "Wall Sit":                            "dzz6BiV",  // ≈ squat hold (wall sit DB'de yok, statik squat pozisyonu)
  "Dumbbell Romanian Deadlift (Yavaş Tempo)": "rR0LJzx",  // RDL — aynı Dumbbell RDL GIF

  // ══ PROGRAM 2 EK GIF'LER ══
  "Shoulder CARs": "TFA88iB",
  "Band External Rotation": "FWdVhcW",
  "Supine Hip Rotation": "2LQkNPW",
  "Wrist Circle": "uJmK7Z1",
  "Thread the Needle": "qBcKorM",
  "Lat Stretch Chair": "FJKGaKW",
  "Chest Doorway Stretch": "FCu6nCj",
  "Child's Pose": "f38OEuO",
  "Triceps Stretch": "YRVPJcA",
  "Dead Hang": "pBMDnBu",
  "Chin-up Negative": "zMSmrRF",
  "Scapula Pull Up": "sTfvVsG",
  "Dip Negative": "eGBfCB5",
  "Parallel Bar Support Hold": "eGBfCB5",
  "Hollow Body Hold": "3B6MqAb",
  "DB Overhead Press": "wbNPCJ1",
  "Cable Fly": "0p9Bm5V",
  "DB Lateral Raise": "OlHKYFi",
  "DB Row Single Arm": "ynVKlM2",
  "Single Leg Glute Bridge (Sağ)": "4iVp5YU",
  "Side Plank Left": "5VXmnV5",
  "Side Plank Right": "5VXmnV5",
  "Copenhagen Plank Left": "5VXmnV5",
  "Copenhagen Plank Right": "5VXmnV5",
  "Knee Tuck Hold": "eGBfCB5",
};

const GIF_BASE = "https://static.exercisedb.dev/media/";

export function getGifUrl(name) {
  const val = resolveId(name);
  if (!val) return null;
  if (Array.isArray(val)) return val.map(id => `${GIF_BASE}${id}.gif`);
  return `${GIF_BASE}${val}.gif`;
}

function resolveId(name) {
  if (GIF_MAP[name]) return GIF_MAP[name];

  // Left/Right suffix
  const base = name.replace(/ (Left|Right)$/i, "").trim();
  if (GIF_MAP[base]) return GIF_MAP[base];

  // (G3) tag
  const noTag = name.replace(/\s*\(G3\)\s*$/, "").trim();
  if (GIF_MAP[noTag]) return GIF_MAP[noTag];

  // (G3) + Left/Right
  const noTagBase = noTag.replace(/ (Left|Right)$/i, "").trim();
  if (GIF_MAP[noTagBase]) return GIF_MAP[noTagBase];

  return null;
}

export function getYouTubeSearchUrl(name) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " exercise form tutorial")}`;
}
