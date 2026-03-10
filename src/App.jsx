import { useState, useEffect, useCallback } from "react";

const FAMILY = {
  yash: {
    name: "Yash", age: 29, emoji: "💪", height: "5'10.5\"", weight: 80, bmi: 25.3,
    diet: "Vegetarian", wakeTime: "8:00 AM", exerciseTime: "5–7 PM", color: "#D97706",
    goals: ["Build muscle", "Lose fat", "Fix triglycerides", "Prevent kidney stones"],
    healthIssues: [
      { l: "Triglycerides", v: "198 mg/dL", s: "high" },
      { l: "Vitamin D", v: "11.3 ng/mL", s: "critical" },
      { l: "Vitamin B12", v: "229 pg/mL", s: "low" },
      { l: "Hemoglobin", v: "12.9 gm/dL", s: "low" },
      { l: "Fasting Glucose", v: "82.3 mg/dL", s: "ok" },
    ],
    supplements: [
      { name: "Calcirol 60,000 IU", freq: "Weekly × 8 weeks, then monthly", when: "Any fixed day", status: "start", icon: "☀️" },
      { name: "Methylcobalamin 1000–1500mcg", freq: "Daily", when: "Morning with breakfast", status: "start", icon: "💊" },
      { name: "Calcium Citrate 500mg", freq: "Daily", when: "With a meal (not same time as iron)", status: "start", icon: "🦴" },
      { name: "Whey Protein 2 scoops (~50–60g)", freq: "Daily", when: "1 scoop post-workout + 1 scoop with breakfast/milk", status: "buy", icon: "🥛" },
    ],
    hydrationTarget: 4,
    hydrationTip: "Add nimbu (lemon) to 2 bottles — citrate prevents oxalate stones",
    medicalActions: [
      "Serum ferritin test — confirm iron deficiency",
      "Aggressive hydration + dietary oxalate management",
    ],
    donts: [
      { text: "NO ab roller in Month 1 — core needs baseline plank strength first. Start Week 5+", icon: "🚫" },
      { text: "NEVER hold breath during exercises (Valsalva) — exhale on push/pull, inhale on release", icon: "🫁" },
      { text: "NO skipping warm-up or cool-down — 5 min each, every session", icon: "⏱️" },
      { text: "NO excess ghee — driving your triglycerides up (198 mg/dL)", icon: "🧈" },
      { text: "NO sugary chai — switch to no-sugar or jaggery (max 1 cup/day)", icon: "🍵" },
      { text: "NO white rice — switch to brown rice or reduce portion", icon: "🍚" },
      { text: "NO skipping protein — you need 120–130g/day, currently getting ~40–50g", icon: "🥩" },
      { text: "NO high-oxalate foods without water: spinach, peanuts, chocolate, beets, cashews", icon: "⚠️" },
      { text: "NO exercising without pre-workout snack (60–90 min before)", icon: "🍌" },
      { text: "NO delaying post-workout protein — within 30–45 min after training", icon: "⏰" },
      { text: "NO training through sharp joint pain — muscle soreness is OK, joint pain means STOP", icon: "🛑" },
    ],
    dailySchedule: [
      { time: "8:00 AM", task: "Wake up + drink 1 full glass of water immediately", icon: "💧" },
      { time: "8:00–9:00", task: "Finish Bottle 1 (1L) before breakfast", icon: "🫗" },
      { time: "8:30 AM", task: "Take Methylcobalamin + Calcium Citrate with breakfast", icon: "💊" },
      { time: "9:00 AM", task: "Protein-rich breakfast (paneer/eggs/sprouts/moong chilla + curd)", icon: "🍳" },
      { time: "9:00–1:00", task: "Finish Bottle 2 (1L) before lunch", icon: "🫗" },
      { time: "11:00 AM", task: "Mid-morning snack: handful of almonds + fruit", icon: "🥜" },
      { time: "1:00 PM", task: "Lunch: dal/sabzi + 2 roti + small rice. Add curd/raita", icon: "🍽️" },
      { time: "1:00–5:00", task: "Finish Bottle 3 (1L) before evening chai", icon: "🫗" },
      { time: "3:30 PM", task: "Pre-workout snack: banana + almonds OR roti + peanut butter", icon: "🍌" },
      { time: "4:00 PM", task: "After chai → drink 1 glass water (chai dehydrates)", icon: "🍵" },
      { time: "5:00–7:00", task: "EXERCISE SESSION (strength/yoga per schedule)", icon: "🏋️" },
      { time: "5:00–7:00", task: "Finish Bottle 4 (1L). Reduce after 8:30 PM", icon: "🫗" },
      { time: "7:00–7:30", task: "Post-workout: Whey shake + banana within 30–45 min", icon: "🥛" },
      { time: "8:00–8:30", task: "Family post-dinner walk (10–15 min)", icon: "🚶" },
      { time: "8:30 PM", task: "Dinner: roti + sabzi/dal. Eat 1–1.5 hrs after protein shake", icon: "🍽️" },
      { time: "Sunday", task: "WEIGH-IN: Same time, before eating. Log weight.", icon: "⚖️" },
    ],
  },
  anil: {
    name: "Anil Ji", age: 56, emoji: "🧘", height: "5'9\"", weight: 83, bmi: 27,
    diet: "Veg + Non-veg 2×/week", wakeTime: "6:00 AM", exerciseTime: "6–7:30 AM", color: "#2563EB",
    goals: ["Heart health", "Weight loss", "Manage BP", "Kidney stone management"],
    healthIssues: [
      { l: "Vitamin B12", v: "107 pg/mL", s: "critical" },
      { l: "Vitamin D", v: "12.3 ng/mL", s: "critical" },
      { l: "Triglycerides", v: "178 mg/dL", s: "high" },
      { l: "Fasting Glucose", v: "99.8 mg/dL", s: "warning" },
      { l: "Kidney Stone", v: "18mm active", s: "critical" },
      { l: "BP", v: "On Cilacar 10", s: "managed" },
      { l: "LDL", v: "51.1 mg/dL", s: "ok" },
    ],
    supplements: [
      { name: "Cilacar 10 (Cilnidipine 10mg)", freq: "Daily", when: "After breakfast — BEFORE exercise", status: "taking", icon: "💗" },
      { name: "Calcirol 60,000 IU", freq: "Weekly", when: "Fixed day (e.g., Sunday)", status: "taking", icon: "☀️" },
      { name: "Methylcobalamin 1500mcg", freq: "Daily", when: "Replace Neurobion — only 15mcg B12, INSUFFICIENT", status: "switch", icon: "💊" },
      { name: "Calcium Citrate 500mg + Mag 250mg", freq: "Daily", when: "With a meal", status: "start", icon: "🦴" },
    ],
    hydrationTarget: 4,
    hydrationTip: "Add nimbu (lemon) to 1–2 bottles — citrate prevents calcium oxalate stones. CRITICAL with 18mm stone",
    medicalActions: [
      "Discuss B12 injections vs high-dose oral methylcobalamin with doctor",
      "Urologist follow-up for 18mm kidney stone monitoring",
      "Urine culture to rule out low-grade infection (borderline pus cells)",
      "Discuss Potassium Citrate for stone prevention with urologist",
    ],
    donts: [
      { text: "NO heavy overhead lifting — dangerous with hypertension", icon: "🚫" },
      { text: "NO head-below-heart positions for extended time (e.g., prolonged forward folds)", icon: "🙃" },
      { text: "NEVER hold breath during exercise (Valsalva maneuver) — can spike BP dangerously", icon: "🫁" },
      { text: "NO exercising without taking Cilacar first — take after breakfast, before workout", icon: "💊" },
      { text: "NO pushing through lightheadedness — sit down immediately", icon: "💫" },
      { text: "NO exercising without water nearby — sip between every set", icon: "💧" },
      { text: "NO excess ghee — driving triglycerides (178) and dangerous with kidney stone", icon: "🧈" },
      { text: "NO sugary chai — borderline pre-diabetic (glucose 99.8). Switch to no sugar", icon: "🍵" },
      { text: "NO dehydration — with 18mm kidney stone, low water is extremely dangerous", icon: "⚠️" },
      { text: "NO high-sodium/processed foods — worsens BP and kidney stones", icon: "🧂" },
      { text: "NO skipping lemon water — citrate is your kidney stone prevention", icon: "🍋" },
      { text: "NO ignoring sharp pain in joints — muscle soreness OK, joint pain means STOP", icon: "🛑" },
    ],
    dailySchedule: [
      { time: "6:00 AM", task: "Wake up + drink 1 full glass of water immediately", icon: "💧" },
      { time: "6:00–6:10", task: "Glass of water + 2–3 soaked almonds before walk", icon: "🥜" },
      { time: "6:10–6:40", task: "Morning walk (30 min) — with Savita Ji", icon: "🚶" },
      { time: "6:40–7:15", task: "Exercises OR Yoga (per day schedule) — with Savita Ji", icon: "🏋️" },
      { time: "7:15–7:20", task: "Pranayama — Anulom Vilom (5 min) — DAILY", icon: "🧘" },
      { time: "7:15–8:00", task: "Finish Bottle 1 (1L) before breakfast", icon: "🫗" },
      { time: "7:30 AM", task: "Breakfast within 30–45 min of exercise. ADD PROTEIN", icon: "🍳" },
      { time: "After breakfast", task: "Take Cilacar 10 + Methylcobalamin + Calcium-Mag", icon: "💊" },
      { time: "8:00–12:00", task: "Finish Bottle 2 (1L) — add nimbu to this one", icon: "🍋" },
      { time: "11:00 AM", task: "Mid-morning: fruit + handful of nuts", icon: "🍎" },
      { time: "1:00 PM", task: "Lunch: dal + sabzi + 2 roti. Reduce rice. Add raita", icon: "🍽️" },
      { time: "1:00–5:00", task: "Finish Bottle 3 (1L) — add nimbu", icon: "🍋" },
      { time: "4:00 PM", task: "Chai (no sugar!) → follow with 1 glass water", icon: "🍵" },
      { time: "5:00–8:00", task: "Finish Bottle 4 (1L). Reduce after 8:30 PM", icon: "🫗" },
      { time: "7:30 PM", task: "Dinner", icon: "🍽️" },
      { time: "8:00–8:30", task: "Family post-dinner walk (10–15 min)", icon: "🚶" },
      { time: "~10:00 PM", task: "Sleep", icon: "😴" },
      { time: "Sunday", task: "WEIGH-IN: Same time, before eating. Log weight.", icon: "⚖️" },
    ],
  },
  savita: {
    name: "Savita Ji", age: "~55", emoji: "🌸", height: "5'3\"", weight: 80, bmi: 31.2,
    diet: "Vegetarian", wakeTime: "6:00 AM", exerciseTime: "6–7:30 AM", color: "#7C3AED",
    goals: ["Blood sugar control", "Bone health", "Gentle conditioning", "Weight loss"],
    healthIssues: [
      { l: "HbA1c", v: "6.90%", s: "critical" },
      { l: "Fasting Glucose", v: "121.7 mg/dL", s: "high" },
      { l: "Hemoglobin", v: "11.10 gm/dL", s: "low" },
      { l: "Calcium", v: "8.40 mg/dL", s: "low" },
      { l: "LDL", v: "127.54 mg/dL", s: "high" },
      { l: "Osteoporosis Risk", v: "HIGH — 5yr low estrogen", s: "critical" },
    ],
    supplements: [
      { name: "Newcal-Forte Softgel (Calcitriol+Ca+Mg+Zn)", freq: "Daily", when: "With lunch (good combo for bones)", status: "taking", icon: "🦴" },
      { name: "Calcirol 60,000 IU", freq: "Weekly", when: "Fixed day (e.g., Sunday)", status: "taking", icon: "☀️" },
      { name: "Protein Powder (4 spoons = 30g protein)", freq: "Daily — 2 doses", when: "2 spoons morning milk + 2 spoons evening milk", status: "start", icon: "🥛" },
      { name: "Methylcobalamin 500–1000mcg", freq: "Daily", when: "With breakfast (maintenance)", status: "start", icon: "💊" },
    ],
    hydrationTarget: 3,
    hydrationTip: "Can add jeera (cumin) to 1 bottle. Front-load: 2 bottles by 2 PM, last bottle 2–7 PM, minimal after 8 PM for sleep",
    medicalActions: [
      "Doctor evaluation for diabetes medication (metformin?) — HbA1c 6.9%",
      "Serum ferritin + iron studies — confirm iron deficiency anemia",
      "DEXA scan for bone density — URGENT (5yr low estrogen, cancer surgery)",
      "Urine microalbumin/creatinine ratio — early diabetic kidney check",
    ],
    donts: [
      { text: "NO high-impact — NO jumping, running, burpees. Bones are at risk", icon: "🚫" },
      { text: "NO fast or jerky movements — everything slow and controlled", icon: "🐢" },
      { text: "NO balance exercises without chair support — fall risk", icon: "🪑" },
      { text: "NO skipping post-dinner walk — most important habit for blood sugar (reduces spike 30–40%)", icon: "⭐" },
      { text: "NO skipping calf cramp routine before bed — 3 min daily without exception", icon: "🦵" },
      { text: "NO ghee cooking — gallbladder removed, cannot process fat properly", icon: "🧈" },
      { text: "NO white rice — HIGH glycemic index, spikes blood sugar directly", icon: "🍚" },
      { text: "NO sugary chai — diabetic (HbA1c 6.9%). Zero sugar or stevia only", icon: "🍵" },
      { text: "NO large meals — eat smaller, more frequent meals for blood sugar", icon: "🍽️" },
      { text: "NO skipping protein — bones and muscles need it. 30g/day from powder", icon: "🥛" },
      { text: "NO water after 8 PM — affects your sleep", icon: "🌙" },
      { text: "If knee pain (winter) — seated-only exercises, NO standing", icon: "🦿" },
      { text: "NO ignoring leg cramps — may indicate worsening calcium deficiency", icon: "⚠️" },
    ],
    dailySchedule: [
      { time: "6:00 AM", task: "Wake up + drink 1 full glass of water immediately", icon: "💧" },
      { time: "6:00–6:10", task: "Glass of water + 2–3 soaked almonds before walk", icon: "🥜" },
      { time: "6:10–6:40", task: "Morning walk (30 min) — with Anil Ji", icon: "🚶" },
      { time: "6:40–7:15", task: "Exercises OR Yoga (per day schedule) — with Anil Ji", icon: "🏋️" },
      { time: "6:00–8:00", task: "Finish Bottle 1 (1L). Front-load water!", icon: "🫗" },
      { time: "7:30 AM", task: "Breakfast within 30–45 min of exercise. ADD PROTEIN", icon: "🍳" },
      { time: "7:30 AM", task: "Morning milk with 2 spoons protein powder", icon: "🥛" },
      { time: "After breakfast", task: "Take Methylcobalamin + Newcal-Forte with meal", icon: "💊" },
      { time: "8:00–1:00", task: "Finish Bottle 2 (1L) — both bottles by 2 PM!", icon: "🫗" },
      { time: "11:00 AM", task: "Mid-morning: fruit + soaked almonds/walnuts", icon: "🍎" },
      { time: "1:00 PM", task: "Lunch: dal + sabzi + 1–2 roti. NO white rice. Add curd", icon: "🍽️" },
      { time: "2:00–7:00", task: "Finish Bottle 3 (1L). Minimal water after 8 PM!", icon: "🫗" },
      { time: "4:00 PM", task: "Chai (NO SUGAR) → follow with 1 glass water", icon: "🍵" },
      { time: "5:00 PM", task: "Snack: chana chaat / roasted makhana / sprouts", icon: "🥗" },
      { time: "7:00 PM", task: "Light dinner: 1 roti + 1 katori sabzi/dal", icon: "🍽️" },
      { time: "7:10 PM", task: "Wait 10 min after dinner...", icon: "⏳" },
      { time: "7:20 PM", task: "⭐ POST-DINNER WALK — 10 min — NON-NEGOTIABLE ⭐", icon: "🚶‍♀️" },
      { time: "8:00–8:30", task: "Family post-dinner walk (10–15 min)", icon: "👨‍👩‍👦" },
      { time: "9:00 PM", task: "Milk with 2 spoons protein powder", icon: "🥛" },
      { time: "Before bed", task: "🦵 Calf cramp routine (3 min): ankle circles → point/flex → calf stretch", icon: "🌙" },
      { time: "~10:00 PM", task: "Sleep (try Shavasana relaxation if difficulty sleeping)", icon: "😴" },
      { time: "Sunday", task: "WEIGH-IN: Same time, before eating. Log weight.", icon: "⚖️" },
    ],
  },
};

const YASH_WARMUP = [
  "Jumping jacks 1 min", "Arm circles 30s each", "Squats ×10", "Hip circles ×10 each", "High knees 30s",
];
const YASH_COOLDOWN = [
  "Chest stretch 20s", "Hamstring stretch 20s each", "Quad stretch 20s each", "Shoulder stretch 20s each", "Child's pose 30s",
];

const EX = {
  yash: {
    str: {
      "week1-2": {
        mon: [
          { n: "Push-ups", s: 2, r: "max", e: "Bodyweight" },
          { n: "DB Rows 5kg (each arm)", s: 2, r: 10, e: "5kg DB + Chair" },
          { n: "Bodyweight Squats", s: 2, r: 12, e: "Bodyweight" },
          { n: "Tube Bicep Curls", s: 2, r: 10, e: "Medium Tube" },
          { n: "Plank", s: 2, r: "20 sec", e: "Mat" },
        ],
        wed: "mon",
        fri: [
          { n: "Push-ups", s: 2, r: "max", e: "Bodyweight" },
          { n: "DB Shoulder Press 5kg", s: 2, r: 10, e: "5kg Dumbbells" },
          { n: "Lunges (bodyweight)", s: 2, r: "8 each", e: "Bodyweight" },
          { n: "Tube Face Pulls", s: 2, r: 12, e: "Tube + Anchor" },
          { n: "Lying Leg Raises", s: 2, r: 10, e: "Mat" },
        ],
      },
      "week3": {
        mon: [
          { n: "Push-ups", s: 2, r: "max", e: "Bodyweight" },
          { n: "DB Floor Press 5kg", s: 2, r: 12, e: "5kg DB + Mat" },
          { n: "DB Shoulder Press 5kg", s: 2, r: 10, e: "5kg Dumbbells" },
          { n: "Tube Tricep Pushdowns", s: 2, r: 12, e: "Tube + Anchor" },
          { n: "Plank", s: 2, r: "25 sec", e: "Mat" },
        ],
        wed: [
          { n: "Dead Hangs", s: 2, r: "max hold (15–20s)", e: "Pull-up Bar" },
          { n: "DB Rows 5kg (each arm)", s: 2, r: 10, e: "5kg DB + Chair" },
          { n: "Tube Rows (door chest)", s: 2, r: 12, e: "Tube + Anchor" },
          { n: "Tube Face Pulls", s: 2, r: 12, e: "Tube + Anchor" },
          { n: "Tube Bicep Curls", s: 2, r: 10, e: "Medium Tube" },
        ],
        fri: [
          { n: "Bodyweight Squats", s: 2, r: 15, e: "Bodyweight" },
          { n: "DB Goblet Squats 5kg", s: 2, r: 12, e: "5kg Dumbbell" },
          { n: "DB Lunges 5kg", s: 2, r: "8 each", e: "5kg Dumbbells" },
          { n: "Mini Loop Glute Bridges", s: 2, r: 15, e: "Band + Mat" },
          { n: "Calf Raises", s: 2, r: 20, e: "Bodyweight" },
          { n: "Bicycle Crunches", s: 2, r: 15, e: "Mat" },
        ],
      },
      "week4": {
        mon: [
          { n: "Push-ups", s: 3, r: "max", e: "Bodyweight" },
          { n: "DB Floor Press 5kg", s: 3, r: 12, e: "5kg DB + Mat" },
          { n: "DB Shoulder Press 5kg", s: 3, r: 10, e: "5kg Dumbbells" },
          { n: "Tube Tricep Pushdowns", s: 3, r: 12, e: "Tube + Anchor" },
          { n: "Plank", s: 3, r: "25 sec", e: "Mat" },
        ],
        wed: [
          { n: "Dead Hangs", s: 3, r: "max hold", e: "Pull-up Bar" },
          { n: "DB Rows 5kg (each arm)", s: 3, r: 10, e: "5kg DB + Chair" },
          { n: "Tube Rows", s: 3, r: 12, e: "Tube + Anchor" },
          { n: "Tube Face Pulls", s: 3, r: 12, e: "Tube + Anchor" },
          { n: "Tube Bicep Curls", s: 3, r: 10, e: "Medium Tube" },
        ],
        fri: [
          { n: "Bodyweight Squats", s: 3, r: 15, e: "Bodyweight" },
          { n: "DB Goblet Squats 5kg", s: 3, r: 12, e: "5kg Dumbbell" },
          { n: "DB Lunges 5kg", s: 3, r: "8 each", e: "5kg Dumbbells" },
          { n: "Mini Loop Glute Bridges", s: 3, r: 15, e: "Band + Mat" },
          { n: "Calf Raises", s: 3, r: 20, e: "Bodyweight" },
          { n: "Bicycle Crunches", s: 3, r: 15, e: "Mat" },
        ],
        sat: [
          { n: "HIIT — Jumping Jacks (20s/40s rest)", s: 3, r: "20 sec", e: "Bodyweight" },
          { n: "HIIT — High Knees (20s/40s rest)", s: 3, r: "20 sec", e: "Bodyweight" },
        ],
      },
    },
    yoga: {
      "week1-2": [
        { n: "Surya Namaskar — 3 slow rounds", d: "5–6 min", desc: "Full body flow" },
        { n: "Downward Dog", d: "30 sec", desc: "Hamstrings, calves, shoulders" },
        { n: "Plank Pose", d: "20–30 sec", desc: "Core — straight line head to heels" },
        { n: "Boat Pose (Navasana)", d: "15–20 sec × 2", desc: "Core. Bend knees if needed" },
        { n: "Cobra (Bhujangasana)", d: "20 sec × 2", desc: "Chest opener" },
        { n: "Seated Forward Fold", d: "30 sec", desc: "Back + hamstring stretch" },
        { n: "Bridge Pose", d: "20 sec × 2", desc: "Glutes, core" },
        { n: "Shavasana", d: "3–5 min", desc: "Full relaxation" },
      ],
      "week3-4": [
        { n: "Surya Namaskar × 3", d: "5–6 min", desc: "Sun salutations" },
        { n: "Warrior I & II", d: "20–30 sec each side", desc: "Leg strength, hip opener" },
        { n: "Chair Pose", d: "20–30 sec", desc: "Quad and glute burn" },
        { n: "Downward Dog → Plank flow", d: "30 sec each", desc: "Core + upper body" },
        { n: "Side Plank", d: "15–20 sec each", desc: "Obliques. Drop knee if needed" },
        { n: "Cobra × 2", d: "20 sec", desc: "Chest opener" },
        { n: "Boat Pose × 2", d: "15–20 sec", desc: "Core" },
        { n: "Seated Forward Fold", d: "30 sec", desc: "Stretch" },
        { n: "Bridge × 2 (or Wheel)", d: "20–30 sec", desc: "Backbend" },
        { n: "Shavasana", d: "3–5 min", desc: "Relaxation" },
      ],
    },
  },
  parents: {
    str: {
      "week1-2": {
        f: [
          { n: "Chair Sit-to-Stand", s: 1, r: 8 },
          { n: "Wall Push-ups", s: 1, r: 8 },
          { n: "Standing Calf Raises (chair)", s: 1, r: 10 },
          { n: "Tube Rows (door anchor)", s: 1, r: 8 },
        ],
        m: [
          { n: "Chair Sit-to-Stand", s: 1, r: 8 },
          { n: "Wall Push-ups", s: 1, r: "6–8" },
          { n: "Standing Calf Raises (chair)", s: 1, r: 10 },
          { n: "Seated Arm Raises (1kg)", s: 1, r: 8 },
        ],
      },
      "week3": {
        f: [
          { n: "Chair Sit-to-Stand", s: 2, r: 8 }, { n: "Wall Push-ups", s: 2, r: 8 },
          { n: "Standing Calf Raises", s: 2, r: 10 }, { n: "Tube Rows", s: 2, r: 8 },
        ],
        m: [
          { n: "Chair Sit-to-Stand", s: 2, r: 8 }, { n: "Wall Push-ups", s: 2, r: "6–8" },
          { n: "Standing Calf Raises", s: 2, r: 10 }, { n: "Seated Arm Raises (1kg)", s: 2, r: 8 },
        ],
      },
      "week4": {
        f: [
          { n: "Chair Sit-to-Stand", s: 2, r: 8 }, { n: "Wall Push-ups", s: 2, r: 8 },
          { n: "Standing Calf Raises", s: 2, r: 10 }, { n: "Tube Rows", s: 2, r: 8 },
          { n: "DB Bicep Curls 5kg", s: 2, r: 8 }, { n: "Standing Leg Raises (chair)", s: 2, r: "8 each" },
        ],
        m: [
          { n: "Chair Sit-to-Stand", s: 2, r: 8 }, { n: "Wall Push-ups", s: 2, r: "6–8" },
          { n: "Standing Calf Raises", s: 2, r: 10 }, { n: "Seated Arm Raises (1kg)", s: 2, r: 8 },
          { n: "Tube Pulls (light)", s: 2, r: 8 }, { n: "Standing Leg Raises (chair)", s: 2, r: "8 each" },
        ],
      },
    },
    yoga: {
      "week1-2": [
        { n: "Tadasana (Mountain)", d: "30 sec", desc: "Stand tall, align body" },
        { n: "Vrikshasana (Tree) + chair", d: "15 sec each", desc: "Balance, NOT on knee" },
        { n: "Cat-Cow", d: "8–10 rounds", desc: "Spinal mobility" },
        { n: "Legs Up Wall", d: "2–3 min", desc: "Reduces swelling/cramps" },
        { n: "Shavasana", d: "2–3 min", desc: "Deep relaxation" },
      ],
      "week3-4": [
        { n: "Tadasana", d: "30 sec", desc: "Alignment" },
        { n: "Vrikshasana (Tree) + chair", d: "15 sec each", desc: "Balance" },
        { n: "Trikonasana (Triangle)", d: "15–20 sec each", desc: "Hip opener, weight-bearing" },
        { n: "Cat-Cow", d: "8 rounds", desc: "Spinal mobility" },
        { n: "Bridge Pose", d: "15–20 sec × 2", desc: "Glutes, core" },
        { n: "Child's Pose", d: "30–60 sec", desc: "Back stretch, calming" },
        { n: "Legs Up Wall", d: "2–3 min", desc: "Relaxation" },
        { n: "Shavasana", d: "2–3 min", desc: "Full relaxation" },
      ],
    },
  },
};

const todayKey = () => new Date().toISOString().slice(0, 10);
const dayN = () => ["sun","mon","tue","wed","thu","fri","sat"][new Date().getDay()];
const dayL = () => ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
const sCol = (s) => ({critical:"#DC2626",high:"#EA580C",low:"#D97706",warning:"#CA8A04",ok:"#16A34A",managed:"#2563EB",taking:"#16A34A",start:"#EA580C",buy:"#7C3AED",insufficient:"#DC2626",switch:"#D97706"}[s]||"#6B7280");
const sBg = (s) => ({critical:"#FEF2F2",high:"#FFF7ED",low:"#FFFBEB",warning:"#FEFCE8",ok:"#F0FDF4",managed:"#EFF6FF",taking:"#F0FDF4",start:"#FFF7ED",buy:"#F5F3FF",insufficient:"#FEF2F2",switch:"#FFFBEB"}[s]||"#F9FAFB");

function load(p, t, fb) {
  try { const v = localStorage.getItem(`cf:${p}:${t}`); return v ? JSON.parse(v) : fb; } catch { return fb; }
}

function save(p, t, d) {
  try { localStorage.setItem(`cf:${p}:${t}`, JSON.stringify(d)); } catch {}
}

export default function App() {
  const [scr, setScr] = useState("dash");
  const [per, setPer] = useState(null);
  const [ld, setLd] = useState(true);
  const [prog, setProg] = useState({ yash:{}, anil:{}, savita:{} });

  useEffect(() => {
    const pp=["yash","anil","savita"], tt=["exercises","hydration","supplements","habits","metrics"];
    const d={yash:{},anil:{},savita:{}};
    for(const p of pp) for(const t of tt) d[p][t]=load(p,t,{});
    setProg(d); setLd(false);
  }, []);

  const upd = useCallback((p,t,date,val) => {
    setProg(prev => {
      const n={...prev,[p]:{...prev[p],[t]:{...prev[p][t],[date]:val}}};
      save(p,t,n[p][t]); return n;
    });
  }, []);

  const go = (s,p) => { if(p!==undefined) setPer(p); setScr(s); };

  if(ld) return(
    <div style={{...$.app,...$.cen}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet"/>
      <div style={{fontSize:52,marginBottom:12}}>🏠</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:800,color:"#1a1a2e"}}>Chaudhary Family</div>
      <div style={{fontSize:13,color:"#999",marginTop:4}}>Loading...</div>
    </div>
  );

  const views = {
    dash: <Dash prog={prog} go={go}/>,
    profile: <Prof p={per} prog={prog[per]} upd={upd} go={go}/>,
    schedule: <Sched p={per} go={go}/>,
    donts: <DontsView p={per} go={go}/>,
    exercises: <Exer p={per} prog={prog[per]} upd={upd} go={go}/>,
    hydration: <Hydra p={per} prog={prog[per]} upd={upd} go={go}/>,
    supplements: <Supps p={per} prog={prog[per]} upd={upd} go={go}/>,
    tracking: <Track p={per} prog={prog[per]} upd={upd} go={go}/>,
    medical: <Med p={per} prog={prog[per]} upd={upd} go={go}/>,
  };

  return(
    <div style={$.app}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}button:active{opacity:.85}@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi .25s ease}`}</style>
      {views[scr]}
    </div>
  );
}

function Dash({prog, go}) {
  const td=todayKey();
  const st=(k)=>{const p=prog[k];const ex=p.exercises?.[td]?.completed?.length||0;const hy=p.hydration?.[td]?.bottles||0;
    const ht=FAMILY[k].hydrationTarget;const sd=p.supplements?.[td]?.taken?.length||0;const st=FAMILY[k].supplements.length;
    let dn=0;if(ex>0)dn++;if(hy>=ht)dn++;if(sd>=st)dn++;return{ex,hy,ht,sd,st,pct:Math.round(dn/3*100)};};

  return(
    <div style={$.scr} className="fi">
      <div style={{textAlign:"center",padding:"20px 0 16px"}}>
        <div style={{fontSize:11,color:"#999",letterSpacing:1.5,textTransform:"uppercase"}}>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
        <h1 style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:900,color:"#1a1a2e",margin:"4px 0 0"}}>Chaudhary Family</h1>
        <p style={{fontSize:13,color:"#888",margin:"2px 0 0"}}>Health & Fitness Tracker</p>
      </div>
      {Object.entries(FAMILY).map(([k,m])=>{const s=st(k);return(
        <button key={k} onClick={()=>go("profile",k)} style={{...$.card,borderLeft:`4px solid ${m.color}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <span style={{fontSize:34}}>{m.emoji}</span>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:"#1a1a2e",marginTop:4}}>{m.name}</div>
              <div style={{fontSize:11,color:"#999",marginTop:1}}>Age {m.age} · BMI {m.bmi}</div>
            </div>
            <Circ pct={s.pct} col={m.color}/>
          </div>
          <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
            <Ch l="Exercise" v={s.ex>0?"Done ✓":"—"} c={s.ex>0?"#16A34A":"#999"}/>
            <Ch l="Water" v={`${s.hy}/${s.ht}L`} c={s.hy>=s.ht?"#16A34A":"#3B82F6"}/>
            <Ch l="Supps" v={`${s.sd}/${s.st}`} c={s.sd>=s.st?"#16A34A":"#F59E0B"}/>
          </div>
        </button>
      );})}
      <div style={{marginTop:16,background:"#fff",borderRadius:14,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:700,color:"#1a1a2e",marginBottom:8}}>⚠️ Shared Family Patterns</div>
        {["Vitamin D deficiency — all 3","Elevated triglycerides — all 3 (198, 178, 145.8)","Anemia markers — Yash + Mother (iron), Father (B12)","Urine albumin traces — all 3","Key fix: Less ghee · More protein · No sugar chai · More water"].map((t,i)=>
          <div key={i} style={{fontSize:12,color:"#555",padding:"3px 0",borderBottom:"1px solid #f5f5f5",lineHeight:1.5}}>{t}</div>
        )}
      </div>
    </div>
  );
}
function Circ({pct,col}){const r=20,c=2*Math.PI*r;return(<div style={{position:"relative",width:50,height:50}}><svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r={r} fill="none" stroke="#f0f0f0" strokeWidth="4"/><circle cx="25" cy="25" r={r} fill="none" stroke={col} strokeWidth="4" strokeDasharray={`${pct/100*c} ${c}`} strokeLinecap="round" transform="rotate(-90 25 25)" style={{transition:"stroke-dasharray .6s"}}/></svg><div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:11,fontWeight:700,color:"#333"}}>{pct}%</div></div>);}
function Ch({l,v,c}){return<div style={{background:"#f8f9fa",borderRadius:8,padding:"3px 10px",fontSize:10}}><span style={{color:"#aaa"}}>{l}</span> <span style={{color:c,fontWeight:600}}>{v}</span></div>;}

function Prof({p, prog, upd, go}) {
  const m=FAMILY[p];
  const menu=[
    {id:"schedule",icon:"🕐",l:"Daily Schedule",d:"When to do what — full day timeline"},
    {id:"donts",icon:"🚫",l:`DON'Ts & Safety Rules (${m.donts.length})`,d:"Critical rules — read these!"},
    {id:"exercises",icon:"🏋️",l:"Today's Exercises",d:"Workout & yoga checklist"},
    {id:"hydration",icon:"💧",l:"Hydration Tracker",d:"Bottle-by-bottle tracking"},
    {id:"supplements",icon:"💊",l:"Supplements & Meds",d:"Daily supplement checklist"},
    {id:"tracking",icon:"📊",l:"Progress Tracking",d:"Weight, strength, habit streaks"},
    {id:"medical",icon:"🏥",l:"Medical Actions",d:"Doctor visits & retests"},
  ];
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("dash")} style={$.back}>← Family Dashboard</button>
      <div style={{textAlign:"center",paddingBottom:14,marginBottom:12,borderBottom:`3px solid ${m.color}`}}>
        <span style={{fontSize:46}}>{m.emoji}</span>
        <h2 style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:800,margin:"6px 0 2px",color:"#1a1a2e"}}>{m.name}</h2>
        <div style={{fontSize:12,color:"#888"}}>{m.height} · {m.weight}kg · BMI {m.bmi} · {m.diet}</div>
        <div style={{fontSize:11,color:"#aaa",marginTop:2}}>Wake: {m.wakeTime} · Exercise: {m.exerciseTime}</div>
      </div>
      <div style={{margin:"12px 0"}}><div style={$.lbl}>Goals</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{m.goals.map((g,i)=><span key={i} style={{fontSize:10,fontWeight:600,border:`1.5px solid ${m.color}`,color:m.color,borderRadius:20,padding:"3px 11px"}}>{g}</span>)}</div>
      </div>
      <div style={{margin:"12px 0"}}><div style={$.lbl}>Health Snapshot</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{m.healthIssues.map((h,i)=><div key={i} style={{background:sBg(h.s),border:`1px solid ${sCol(h.s)}22`,borderRadius:8,padding:"4px 9px",fontSize:11}}><span style={{color:"#666"}}>{h.l}:</span> <span style={{color:sCol(h.s),fontWeight:700}}>{h.v}</span></div>)}</div>
      </div>
      <div style={{marginTop:16}}>
        {menu.map(item=>(
          <button key={item.id} onClick={()=>go(item.id)} style={$.menuBtn}>
            <span style={{fontSize:22}}>{item.icon}</span>
            <div style={{flex:1,textAlign:"left"}}><div style={{fontWeight:600,color:"#1a1a2e",fontSize:14}}>{item.l}</div><div style={{fontSize:11,color:"#999"}}>{item.d}</div></div>
            <span style={{color:"#ccc",fontSize:18}}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Sched({p, go}) {
  const m=FAMILY[p], dn=dayN();
  let exT="";
  if(p==="yash"){if(["mon","wed","fri"].includes(dn))exT="💪 Strength";else if(["tue","thu"].includes(dn))exT="🧘 Yoga";else if(dn==="sat")exT="⚡ HIIT (Wk4)";else exT="🌿 Rest";}
  else{if(["mon","wed","fri"].includes(dn))exT="💪 Walk+Strength";else if(["tue","thu","sat"].includes(dn))exT="🧘 Walk+Yoga";else exT="🌿 Rest (walk only)";}
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>🕐 Daily Schedule</h2>
      <div style={{fontSize:13,color:m.color,fontWeight:600,marginBottom:2}}>{dayL()} — {exT}</div>
      <div style={{fontSize:11,color:"#999",marginBottom:14}}>Your complete day, timed out</div>
      <div style={{position:"relative",paddingLeft:26}}>
        <div style={{position:"absolute",left:9,top:8,bottom:8,width:2,background:"#e8e8e8",borderRadius:1}}/>
        {m.dailySchedule.map((item,i)=>(
          <div key={i} style={{position:"relative",marginBottom:1,padding:"7px 10px",background:item.task.includes("⭐")?"#FEF3C7":item.task.includes("NON-NEGOTIABLE")?"#FEF3C7":"transparent",borderRadius:10}}>
            <div style={{position:"absolute",left:-20,top:11,width:8,height:8,borderRadius:"50%",background:item.task.includes("⭐")?m.color:item.task.includes("EXERCISE")?"#16A34A":"#ddd",border:"2px solid #fff"}}/>
            <div style={{display:"flex",gap:7,alignItems:"flex-start"}}>
              <span style={{fontSize:14}}>{item.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:m.color,fontWeight:600}}>{item.time}</div>
                <div style={{fontSize:12,color:"#333",lineHeight:1.4,marginTop:1}}>{item.task}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {p==="yash"&&<div style={{...$.tip,marginTop:14}}>🍌 <strong>Nutrition:</strong> Pre-workout snack 60–90 min before · Post-workout whey within 30–45 min · Dinner 1–1.5 hrs after shake</div>}
      {p!=="yash"&&<div style={{...$.tip,marginTop:14}}>🥜 <strong>Morning:</strong> Water + soaked almonds before walk · Breakfast within 30–45 min after exercise</div>}
    </div>
  );
}

function DontsView({p, go}) {
  const m=FAMILY[p];
  const univ=[
    {text:"NEVER hold breath during exercise — exhale on push/pull, inhale on release",icon:"🫁"},
    {text:"NO training through sharp joint pain — muscle soreness OK, joint pain = STOP",icon:"🛑"},
    {text:"NO skipping warm-up (5 min) or cool-down (5 min)",icon:"⏱️"},
    {text:"NO excess ghee cooking — triglycerides high for all 3",icon:"🧈"},
    {text:"NO sugary chai — switch to no sugar / stevia / jaggery",icon:"🍵"},
    {text:"NO skipping water — dehydration worsens kidney stones & all markers",icon:"💧"},
    {text:"NO carb-only breakfasts — MUST add protein every meal",icon:"🍳"},
  ];
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>🚫 DON'Ts & Safety Rules</h2>
      <div style={{fontSize:12,color:"#DC2626",fontWeight:600,marginBottom:14}}>Read carefully. These protect your health.</div>
      <div style={{marginBottom:18}}><div style={{...$.lbl,color:m.color}}>{m.name}'s Rules ({m.donts.length})</div>
        {m.donts.map((d,i)=><div key={i} style={$.dont}><span style={{fontSize:16,flexShrink:0}}>{d.icon}</span><div style={{fontSize:12,color:"#333",lineHeight:1.5}}>{d.text}</div></div>)}
      </div>
      <div style={{marginBottom:18}}><div style={{...$.lbl,color:"#DC2626"}}>Universal Family Rules</div>
        {univ.map((d,i)=><div key={i} style={{...$.dont,background:"#FEF2F2"}}><span style={{fontSize:16,flexShrink:0}}>{d.icon}</span><div style={{fontSize:12,color:"#7F1D1D",lineHeight:1.5}}>{d.text}</div></div>)}
      </div>
      <div style={{marginBottom:18}}><div style={$.lbl}>Soreness vs Injury</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[{l:"NORMAL (DOMS)",items:["Dull ache across muscle","Peaks 24–48 hrs after","Gets better with movement","Safe to continue"],c:"#16A34A"},
            {l:"INJURY — STOP",items:["Sharp pain, specific spot","Especially joints","Gets WORSE with movement","Stop, rest, see doctor"],c:"#DC2626"}
          ].map((g,i)=><div key={i} style={{flex:"1 1 140px",background:g.c+"0D",border:`1.5px solid ${g.c}33`,borderRadius:12,padding:10}}>
            <div style={{fontWeight:700,fontSize:12,color:g.c,marginBottom:5}}>{g.l}</div>
            {g.items.map((x,j)=><div key={j} style={{fontSize:11,color:"#444",lineHeight:1.5}}>· {x}</div>)}
          </div>)}
        </div>
      </div>
      <div style={{marginBottom:18}}><div style={$.lbl}>🍽️ Diet Fixes</div>
        <div style={{background:"#FFFBEB",borderRadius:12,padding:12}}>
          {[{b:"Excess ghee",f:"1 tsp mustard/olive oil. Ghee max 1 tsp/day",w:"Everyone, esp. Savita Ji (no gallbladder)"},
            {b:"Carb-heavy breakfast",f:"Add paneer bhurji, moong chilla, sprouts, curd",w:"Everyone"},
            {b:"Sugary chai 2–3 cups",f:"No sugar/stevia. Max 1 cup",w:"Everyone, critical for Savita Ji"},
            {b:"White rice",f:"Brown rice or halve portion",w:"Everyone, critical for Savita Ji (glucose)"},
            {b:"Low protein",f:"Yash: 120–130g/day (whey). Parents: 60–70g",w:"Everyone"},
            {b:"Low water",f:"Yash/Anil: 4L. Savita: 3L. Bottle method",w:"Everyone — kidneys"}
          ].map((x,i)=><div key={i} style={{padding:"6px 0",borderBottom:i<5?"1px solid #FDE68A":"none"}}>
            <div style={{fontSize:11}}><span style={{color:"#DC2626",fontWeight:700}}>✗ {x.b}</span></div>
            <div style={{fontSize:11,color:"#166534",marginTop:1}}>✓ {x.f}</div>
            <div style={{fontSize:9,color:"#999"}}>→ {x.w}</div>
          </div>)}
        </div>
      </div>
      <div><div style={$.lbl}>📅 Timeline — What to Expect</div>
        <div style={{background:"#F0FDF4",borderRadius:12,padding:12}}>
          {[{w:"Week 1–2",n:"Sore, possibly tired. NORMAL. Don't quit.",c:"#F59E0B"},
            {w:"Week 3–4",n:"Energy up, soreness down, feeling stronger.",c:"#22C55E"},
            {w:"Week 5–8",n:"Clothes fit different, face leaner, strength up.",c:"#3B82F6"},
            {w:"Week 9–12",n:"Visible changes. Triglycerides should drop at retest.",c:"#8B5CF6"}
          ].map((x,i)=><div key={i} style={{display:"flex",gap:8,padding:"4px 0",alignItems:"flex-start"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:x.c,marginTop:4,flexShrink:0}}/>
            <div><span style={{fontWeight:700,fontSize:11,color:x.c}}>{x.w}:</span> <span style={{fontSize:11,color:"#333"}}>{x.n}</span></div>
          </div>)}
        </div>
      </div>
    </div>
  );
}

function Exer({p, prog, upd, go}) {
  const td=todayKey(), dn=dayN(), m=FAMILY[p];
  const [wk, setWk]=useState("week1-2");
  const comp=prog.exercises?.[td]?.completed||[];
  const tog=(i)=>{const n=comp.includes(i)?comp.filter(x=>x!==i):[...comp,i];upd(p,"exercises",td,{completed:n,wk});};

  let exs=[],exT="",wu=null,cd=null;
  if(p==="yash"){
    if(["mon","wed","fri"].includes(dn)){
      exT="Strength Training"; wu=YASH_WARMUP; cd=YASH_COOLDOWN;
      const wd=EX.yash.str[wk]||EX.yash.str["week1-2"];let d=wd[dn];if(d==="mon")d=wd["mon"];exs=d||[];
    }else if(["tue","thu"].includes(dn)){
      exT="Yoga";const yw=wk==="week1-2"?"week1-2":"week3-4";
      exs=(EX.yash.yoga[yw]||[]).map(y=>({n:y.n,s:1,r:y.d,e:y.desc}));
    }else if(dn==="sat"&&wk==="week4"){
      exT="HIIT (15 min)";wu=YASH_WARMUP;cd=YASH_COOLDOWN;exs=EX.yash.str["week4"]?.sat||[];
    }else exT="Rest Day 🌿";
  }else{
    const pk=p==="anil"?"f":"m";
    if(["mon","wed","fri"].includes(dn)){
      exT="Walk + Strength";const wd=EX.parents.str[wk]||EX.parents.str["week1-2"];
      exs=[{n:"Morning Walk (30 min)",s:1,r:"30 min",e:"Outdoor"},...(wd[pk]||[])];
    }else if(["tue","thu","sat"].includes(dn)){
      exT="Walk + Yoga";const yw=wk==="week1-2"?"week1-2":"week3-4";
      exs=[{n:"Morning Walk (30 min)",s:1,r:"30 min",e:"Outdoor"},...(EX.parents.yoga[yw]||[]).map(y=>({n:y.n,s:1,r:y.d,e:y.desc}))];
    }else{exT="Rest Day (walk only)";exs=[{n:"Morning Walk (30 min)",s:1,r:"30 min",e:"Outdoor"}];}
  }

  const hab=prog.habits?.[td]||{};
  const togH=(id)=>upd(p,"habits",td,{...hab,[id]:!hab[id]});
  const sp=p==="yash"?[{id:"family_walk",l:"Family post-dinner walk (10–15 min)"}]:
    p==="anil"?[{id:"pranayama",l:"🧘 Pranayama — Anulom Vilom (5 min)"},{id:"family_walk",l:"Family walk (10–15 min)"}]:
    [{id:"post_dinner_walk",l:"⭐ Post-dinner walk 10 min — NON-NEGOTIABLE"},{id:"calf_routine",l:"🦵 Calf cramp routine (3 min)"},{id:"family_walk",l:"Family walk (10–15 min)"}];

  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>🏋️ Today's Exercises</h2>
      <div style={{fontSize:13,color:m.color,fontWeight:600,marginBottom:2}}>{dayL()} — {exT}</div>
      <div style={{fontSize:10,color:"#999",marginBottom:10}}>Rest 60–90 sec between sets</div>
      <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"}}>
        {["week1-2","week3","week4"].map(w=><button key={w} onClick={()=>setWk(w)} style={{...$.wkBtn,background:wk===w?m.color:"#f0f0f0",color:wk===w?"#fff":"#666"}}>{w==="week1-2"?"Wk 1–2":w==="week3"?"Wk 3":"Wk 4"}</button>)}
      </div>
      {p==="anil"&&<div style={$.warn}>⚠️ <strong>BP:</strong> No heavy overhead · Breathe always · Water nearby · Sit if dizzy · Cilacar taken?</div>}
      {p==="savita"&&<div style={$.warn}>⚠️ No jumping · Slow & controlled · Chair for balance · Seated-only if knee pain</div>}
      {p==="yash"&&wu&&<div style={{...$.tip,marginBottom:10}}>🔥 <strong>Warm-up (5 min):</strong> {wu.join(" → ")}</div>}

      {exs.length===0&&exT.includes("Rest")?<div style={{padding:20,textAlign:"center",color:"#999"}}>Rest day! Stretch if you feel like it 🌿</div>:
        exs.map((ex,i)=><button key={i} onClick={()=>tog(i)} style={{...$.exI,background:comp.includes(i)?"#F0FDF4":"#fff",borderColor:comp.includes(i)?"#86EFAC":"#eee"}}>
          <div style={{...$.chk,background:comp.includes(i)?"#16A34A":"#fff",borderColor:comp.includes(i)?"#16A34A":"#ddd",color:"#fff"}}>{comp.includes(i)&&"✓"}</div>
          <div style={{flex:1}}><div style={{fontWeight:600,fontSize:12,color:comp.includes(i)?"#16A34A":"#1a1a2e",textDecoration:comp.includes(i)?"line-through":"none"}}>{ex.n}</div>
            <div style={{fontSize:10,color:"#999",marginTop:1}}>{ex.s&&ex.r?`${ex.s}×${ex.r}`:""}{ex.e?` · ${ex.e}`:""}</div></div>
        </button>)}

      {p==="yash"&&cd&&!exT.includes("Rest")&&!exT.includes("Yoga")&&<div style={{...$.tip,marginTop:10}}>🧊 <strong>Cool-down (5 min):</strong> {cd.join(" → ")}</div>}

      <div style={{marginTop:16}}><div style={$.lbl}>Daily Habits</div>
        {sp.map(h=><button key={h.id} onClick={()=>togH(h.id)} style={{...$.exI,background:hab[h.id]?"#F0FDF4":"#fff",borderColor:hab[h.id]?"#86EFAC":"#eee"}}>
          <div style={{...$.chk,background:hab[h.id]?"#16A34A":"#fff",borderColor:hab[h.id]?"#16A34A":"#ddd",color:"#fff"}}>{hab[h.id]&&"✓"}</div>
          <div style={{fontSize:12,fontWeight:500,color:hab[h.id]?"#16A34A":"#333"}}>{h.l}</div>
        </button>)}
      </div>

      {p==="savita"&&<div style={{...$.tip,marginTop:10}}><strong>Calf Routine:</strong> Ankle circles 10 each → Point/flex 15 → Calf stretch 20s each leg</div>}
      {p==="anil"&&<div style={{...$.tip,marginTop:10}}><strong>Anulom Vilom:</strong> Close right (thumb) → inhale left → Close left (ring) → exhale right → Inhale right → close → exhale left = 1 cycle. 5 min, slow & steady.</div>}
    </div>
  );
}

function Hydra({p, prog, upd, go}) {
  const td=todayKey(), m=FAMILY[p], hyd=prog.hydration?.[td]||{bottles:0}, tgt=m.hydrationTarget;
  const setB=(n)=>upd(p,"hydration",td,{bottles:n});
  const tl=["Morning","Before lunch","Before chai","Before dinner"];
  const hist=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const k=d.toISOString().slice(0,10);return{l:d.toLocaleDateString("en-IN",{weekday:"short"}),b:prog.hydration?.[k]?.bottles||0,t:i===6};});
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>💧 Hydration Tracker</h2>
      <div style={{fontSize:13,color:"#555"}}>Target: <strong>{tgt}L</strong></div>
      <div style={{fontSize:11,color:m.color,fontWeight:500,marginBottom:14}}>{m.hydrationTip}</div>
      <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:18,flexWrap:"wrap"}}>
        {Array.from({length:tgt},(_,i)=><button key={i} onClick={()=>setB(i+1===hyd.bottles?i:i+1)} style={{...$.bot,background:i<hyd.bottles?"#DBEAFE":"#f8f8f8",borderColor:i<hyd.bottles?"#3B82F6":"#e0e0e0"}}>
          <div style={{fontSize:32,opacity:i<hyd.bottles?1:.3}}>{i<hyd.bottles?"💧":"🫗"}</div>
          <div style={{fontSize:11,fontWeight:600,color:i<hyd.bottles?"#2563EB":"#bbb",marginTop:2}}>{i+1}L</div>
          <div style={{fontSize:8,color:"#bbb"}}>{tl[i]}</div>
        </button>)}
      </div>
      <div style={{textAlign:"center",marginBottom:14}}>
        <span style={{fontSize:42,fontWeight:800,fontFamily:"'Fraunces',serif",color:hyd.bottles>=tgt?"#16A34A":"#3B82F6"}}>{hyd.bottles||0}</span>
        <span style={{fontSize:18,color:"#999"}}> / {tgt}L</span>
        {hyd.bottles>=tgt&&<div style={{color:"#16A34A",fontSize:12,marginTop:2}}>🎉 Target reached!</div>}
      </div>
      <div style={{background:"#F0F9FF",borderRadius:12,padding:12,marginBottom:10,fontSize:11,color:"#555",lineHeight:1.7}}>
        <div style={{fontWeight:700,color:"#1E40AF",marginBottom:4}}>Schedule</div>
        <div>🫗 <strong>1:</strong> 1 glass on waking → finish before breakfast</div>
        <div>🫗 <strong>2:</strong> Finish before lunch</div>
        <div>🫗 <strong>3:</strong> Finish before evening chai</div>
        {tgt>=4&&<div>🫗 <strong>4:</strong> Before dinner. Reduce after 8:30 PM</div>}
        <div style={{marginTop:4,color:"#CA8A04"}}>☕ After every chai → 1 glass water</div>
      </div>
      <div style={{...$.tip,marginBottom:14}}>Ramp-up: Wk1 → 2L · Wk2 → 3L · Wk3+ → Full {tgt}L</div>
      <div style={$.lbl}>This Week</div>
      <div style={{display:"flex",gap:3}}>
        {hist.map((d,i)=><div key={i} style={{flex:1,textAlign:"center"}}><div style={{height:45,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{width:"65%",borderRadius:"3px 3px 0 0",height:`${Math.max(d.b/tgt*100,4)}%`,background:d.b>=tgt?"#3B82F6":d.b>0?"#93C5FD":"#eee",transition:"height .3s"}}/></div>
          <div style={{fontSize:8,color:d.t?"#3B82F6":"#999",fontWeight:d.t?700:400,marginTop:2}}>{d.l}</div></div>)}
      </div>
    </div>
  );
}

function Supps({p, prog, upd, go}) {
  const td=todayKey(), m=FAMILY[p], sup=prog.supplements?.[td]||{taken:[]};
  const tog=(i)=>{const n=sup.taken.includes(i)?sup.taken.filter(x=>x!==i):[...sup.taken,i];upd(p,"supplements",td,{taken:n});};
  const sL={taking:"Taking ✓",start:"Start!",buy:"Buy!",insufficient:"INSUFFICIENT",switch:"Switch!"};
  const hist=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const k=d.toISOString().slice(0,10);return{l:d.toLocaleDateString("en-IN",{weekday:"short"}),n:prog.supplements?.[k]?.taken?.length||0,t:i===6};});
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>💊 Supplements & Meds</h2>
      {m.supplements.map((s,i)=><button key={i} onClick={()=>tog(i)} style={{...$.exI,background:sup.taken.includes(i)?"#F0FDF4":"#fff",borderColor:sup.taken.includes(i)?"#86EFAC":"#eee"}}>
        <div style={{...$.chk,background:sup.taken.includes(i)?"#16A34A":"#fff",borderColor:sup.taken.includes(i)?"#16A34A":"#ddd",color:"#fff"}}>{sup.taken.includes(i)&&"✓"}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:600,fontSize:12,color:"#1a1a2e"}}>{s.icon} {s.name}</div>
          <div style={{fontSize:10,color:"#999",marginTop:1}}>{s.freq}</div>
          <div style={{fontSize:10,color:m.color,marginTop:1}}>⏰ {s.when}</div>
        </div>
        <span style={{fontSize:8,fontWeight:700,color:sCol(s.status),background:sBg(s.status),padding:"2px 7px",borderRadius:5,textTransform:"uppercase",whiteSpace:"nowrap"}}>{sL[s.status]||s.status}</span>
      </button>)}
      {p==="anil"&&<div style={{...$.warn,marginTop:10}}>⚠️ <strong>Neurobion Forte only has 15mcg B12.</strong> Your B12 is 107 (CRITICAL). Need 1500mcg methylcobalamin or injections. Ask doctor.</div>}
      <div style={{marginTop:14}}><div style={$.lbl}>This Week</div>
        <div style={{display:"flex",gap:4}}>{hist.map((d,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"4px 0",borderRadius:6,background:d.n>=m.supplements.length?"#F0FDF4":d.n>0?"#FFFBEB":"#f8f8f8"}}>
          <div style={{fontSize:13}}>{d.n>=m.supplements.length?"✅":d.n>0?"🟡":"⬜"}</div>
          <div style={{fontSize:7,color:d.t?"#16A34A":"#999"}}>{d.l}</div>
        </div>)}</div>
      </div>
    </div>
  );
}

function Track({p, prog, upd, go}) {
  const m=FAMILY[p], td=todayKey(), met=prog.metrics||{};
  const [wi,setWi]=useState(""), [mi,setMi]=useState({});
  const logW=()=>{const w=parseFloat(wi);if(!isNaN(w)&&w>20&&w<200){upd(p,"metrics",td,{...met[td],weight:w});setWi("");}};
  const logM=(k)=>{const v=parseFloat(mi[k]);if(!isNaN(v)){upd(p,"metrics",td,{...met[td],[k]:v});setMi(pr=>({...pr,[k]:""}));}};
  const mF=p==="yash"?[{k:"pushups",l:"Push-ups (max)",i:"💪"},{k:"plank",l:"Plank (sec)",i:"🧘"},{k:"deadhang",l:"Dead hang (sec)",i:"🏋️"}]
    :[{k:"wallpushups",l:"Wall push-ups",i:"💪"},{k:"sittostand",l:"Sit-to-stand",i:"🪑"}];
  const wh=[];for(let i=29;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=d.toISOString().slice(0,10);if(met[k]?.weight)wh.push({dt:d.toLocaleDateString("en-IN",{day:"numeric",month:"short"}),w:met[k].weight});}
  const wT=p==="yash"?"73–75 kg":p==="anil"?"78 kg":"74–75 kg";
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>📊 Progress Tracking</h2>
      <div style={$.tCard}><div style={{fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:6}}>⚖️ Weight Log</div>
        <div style={{fontSize:10,color:"#999",marginBottom:6}}>Every Sunday morning, before eating. Target: <strong style={{color:m.color}}>{wT}</strong></div>
        <div style={{display:"flex",gap:6}}><input type="number" placeholder="kg" value={wi} onChange={e=>setWi(e.target.value)} style={$.inp}/>
          <button onClick={logW} style={{...$.logB,background:m.color}}>Log</button></div>
        {met[td]?.weight&&<div style={{fontSize:11,color:"#16A34A",marginTop:4}}>Today: {met[td].weight}kg ✓</div>}
        {wh.length>1&&<div style={{marginTop:12}}>
          <div style={{fontSize:9,color:"#888",marginBottom:3}}>Trend (30d)</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:1,height:50}}>
            {wh.map((w,i)=>{const mn=Math.min(...wh.map(x=>x.w)),mx=Math.max(...wh.map(x=>x.w)),rg=mx-mn||1;
              return<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{fontSize:6,color:"#999"}}>{w.w}</div>
                <div style={{width:"80%",height:((w.w-mn)/rg)*35+8,background:m.color,borderRadius:"2px 2px 0 0",opacity:.7}}/>
              </div>;})}
          </div>
        </div>}
      </div>
      <div style={$.tCard}><div style={{fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:6}}>🏋️ Exercise Milestones</div>
        {mF.map(f=><div key={f.k} style={{marginBottom:10}}>
          <div style={{fontSize:11,color:"#555",marginBottom:3}}>{f.i} {f.l}</div>
          <div style={{display:"flex",gap:6}}><input type="number" placeholder="#" value={mi[f.k]||""} onChange={e=>setMi(pr=>({...pr,[f.k]:e.target.value}))} style={$.inp}/>
            <button onClick={()=>logM(f.k)} style={{...$.logB,background:m.color}}>Log</button></div>
          {met[td]?.[f.k]&&<div style={{fontSize:10,color:"#16A34A",marginTop:3}}>Today: {met[td][f.k]} ✓</div>}
          <div style={{display:"flex",gap:3,marginTop:4}}>{Array.from({length:7}).map((_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const k=d.toISOString().slice(0,10);const v=met[k]?.[f.k];
            return<div key={i} style={{flex:1,textAlign:"center",fontSize:9,padding:"2px 0",background:v?"#F0FDF4":"#f8f8f8",borderRadius:3}}>{v||"—"}</div>;})}</div>
        </div>)}
      </div>
      <div style={$.tCard}><div style={{fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:6}}>🔥 Habit Streaks</div>
        {p==="savita"&&<HR l="⭐ Post-dinner walk" hk="post_dinner_walk" prog={prog}/>}
        {p==="savita"&&<HR l="🦵 Calf routine" hk="calf_routine" prog={prog}/>}
        {p==="anil"&&<HR l="🧘 Pranayama" hk="pranayama" prog={prog}/>}
        <HR l="🚶 Family walk" hk="family_walk" prog={prog}/>
      </div>
    </div>
  );
}
function HR({l,hk,prog}){
  const ds=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const k=d.toISOString().slice(0,10);return{l:d.toLocaleDateString("en-IN",{weekday:"narrow"}),dn:prog.habits?.[k]?.[hk],t:i===6};});
  let sk=0;for(let i=ds.length-1;i>=0;i--){if(ds[i].dn)sk++;else break;}
  return<div style={{marginBottom:8}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
      <span style={{fontSize:11,color:"#555"}}>{l}</span>
      {sk>0&&<span style={{fontSize:9,color:"#EA580C",fontWeight:700}}>🔥{sk}d</span>}
    </div>
    <div style={{display:"flex",gap:2}}>{ds.map((d,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"3px 0",borderRadius:4,background:d.dn?"#F0FDF4":"#f8f8f8",border:d.t?"1.5px solid #16A34A":"1px solid transparent"}}>
      <div style={{fontSize:11}}>{d.dn?"✅":"⬜"}</div><div style={{fontSize:7,color:"#999"}}>{d.l}</div></div>)}</div>
  </div>;
}

function Med({p, prog, upd, go}) {
  const m=FAMILY[p], md=prog.habits?.medical||{};
  const togM=(i)=>upd(p,"habits","medical",{...md,[`m${i}`]:!md[`m${i}`]});
  const rt={yash:["Lipid profile (triglycerides)","Urine routine (oxalate crystals)","Serum ferritin","Vitamin D, B12, CBC"],
    anil:["Vitamin B12 (improve from 107)","Lipid profile","Urine routine","Kidney stone ultrasound","Vitamin D, CBC"],
    savita:["HbA1c (improve from 6.90%)","Fasting glucose","Urine microalbumin","Lipid profile","Serum ferritin","Vitamin D, B12, CBC"]};
  const wt={yash:"80 → 73–75 kg",anil:"83 → 78 kg",savita:"80 → 74–75 kg"};
  return(
    <div style={$.scr} className="fi">
      <button onClick={()=>go("profile")} style={$.back}>← {m.name}</button>
      <h2 style={$.sec}>🏥 Medical Actions</h2>
      <div style={{marginBottom:16}}><div style={{...$.lbl,color:"#DC2626"}}>Pending Doctor Visits</div>
        {m.medicalActions.map((a,i)=><button key={i} onClick={()=>togM(i)} style={{...$.exI,background:md[`m${i}`]?"#F0FDF4":"#FEF2F2",borderColor:md[`m${i}`]?"#86EFAC":"#FECACA"}}>
          <div style={{...$.chk,background:md[`m${i}`]?"#16A34A":"#fff",borderColor:md[`m${i}`]?"#16A34A":"#ddd",color:"#fff"}}>{md[`m${i}`]&&"✓"}</div>
          <div style={{fontSize:11,color:md[`m${i}`]?"#16A34A":"#555",fontWeight:500,textDecoration:md[`m${i}`]?"line-through":"none"}}>{a}</div>
        </button>)}
      </div>
      <div style={{marginBottom:16}}><div style={{...$.lbl,color:"#2563EB"}}>3-Month Retests</div>
        <div style={{background:"#EFF6FF",borderRadius:12,padding:12,fontSize:11,color:"#555",lineHeight:1.7}}>{rt[p].map((t,i)=><div key={i}>• {t}</div>)}</div>
      </div>
      <div style={{marginBottom:16}}><div style={{...$.lbl,color:"#7C3AED"}}>6-Month Weight Target</div>
        <div style={{background:"#F5F3FF",borderRadius:12,padding:12,fontSize:13,color:"#555"}}>Current → Target: <strong style={{color:m.color}}>{wt[p]}</strong></div>
      </div>
      <div><div style={{...$.lbl,color:"#16A34A"}}>6-Month Full Panel</div>
        <div style={{background:"#F0FDF4",borderRadius:12,padding:12,fontSize:11,color:"#555",lineHeight:1.7}}>
          <div>• Full blood panel all 3 members</div>{p==="savita"&&<div>• DEXA scan if not done</div>}<div>• Compare all markers to baseline</div></div>
      </div>
    </div>
  );
}

const $={
  app:{fontFamily:"'Outfit',sans-serif",background:"linear-gradient(170deg,#FAFAF9 0%,#F5F0E8 50%,#EDE8DD 100%)",minHeight:"100vh",color:"#1a1a2e"},
  cen:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh"},
  scr:{maxWidth:480,margin:"0 auto",padding:"14px 14px 36px"},
  back:{background:"none",border:"none",fontSize:13,color:"#888",cursor:"pointer",padding:"8px 0",fontFamily:"'Outfit',sans-serif"},
  sec:{fontFamily:"'Fraunces',serif",fontSize:21,fontWeight:700,margin:"4px 0 8px",color:"#1a1a2e"},
  lbl:{fontSize:10,fontWeight:600,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:6},
  card:{width:"100%",background:"#fff",borderRadius:14,padding:"14px 16px",border:"none",cursor:"pointer",textAlign:"left",marginBottom:10,boxShadow:"0 1px 3px rgba(0,0,0,.06)"},
  menuBtn:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 13px",background:"#fff",border:"1px solid #eee",borderRadius:12,cursor:"pointer",marginBottom:6,fontFamily:"'Outfit',sans-serif",textAlign:"left"},
  wkBtn:{border:"none",borderRadius:8,padding:"5px 13px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit',sans-serif"},
  exI:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 11px",border:"1.5px solid #eee",borderRadius:10,cursor:"pointer",marginBottom:4,background:"#fff",fontFamily:"'Outfit',sans-serif",textAlign:"left"},
  chk:{width:20,height:20,borderRadius:5,border:"2px solid #ddd",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0},
  warn:{background:"#FEF2F2",borderRadius:10,padding:"9px 12px",fontSize:11,color:"#991B1B",marginBottom:10,lineHeight:1.5},
  tip:{background:"#FFFBEB",borderRadius:10,padding:"9px 12px",fontSize:11,color:"#92400E",lineHeight:1.6},
  dont:{display:"flex",gap:8,alignItems:"flex-start",padding:"8px 10px",background:"#fff",border:"1.5px solid #FCA5A5",borderRadius:10,marginBottom:4},
  bot:{border:"2px solid #e0e0e0",borderRadius:14,padding:"10px 6px",cursor:"pointer",background:"#f8f8f8",width:75,textAlign:"center",fontFamily:"'Outfit',sans-serif",transition:"all .2s"},
  tCard:{background:"#fff",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 1px 3px rgba(0,0,0,.06)"},
  inp:{flex:1,padding:"6px 10px",border:"1.5px solid #ddd",borderRadius:8,fontSize:13,fontFamily:"'Outfit',sans-serif",outline:"none"},
  logB:{border:"none",color:"#fff",borderRadius:8,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit',sans-serif"},
};
