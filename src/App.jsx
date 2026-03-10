import { useState, useCallback } from "react";

/* ─── Utilities ─── */
function ytUrl(name) { return "https://www.youtube.com/results?search_query=" + encodeURIComponent(name.replace(/\(.*?\)/g,"").replace(/[0-9]+kg/g,"").trim() + " exercise form tutorial"); }
var TK = function() { return new Date().toISOString().slice(0,10); };
var DN = function() { return ["sun","mon","tue","wed","thu","fri","sat"][new Date().getDay()]; };
var DL = function() { return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()]; };
var sC = function(s) { return ({critical:"#DC2626",high:"#EA580C",low:"#D97706",warning:"#CA8A04",ok:"#16A34A",managed:"#2563EB",taking:"#16A34A",start:"#EA580C",buy:"#7C3AED","switch":"#D97706"})[s]||"#6B7280"; };
var sB = function(s) { return ({critical:"#FEF2F2",high:"#FFF7ED",low:"#FFFBEB",warning:"#FEFCE8",ok:"#F0FDF4",managed:"#EFF6FF",taking:"#F0FDF4",start:"#FFF7ED",buy:"#F5F3FF","switch":"#FFFBEB"})[s]||"#F9FAFB"; };

function ld(p,t,fb){var k="cf:"+p+":"+t;var v=localStorage.getItem(k);return v?JSON.parse(v):fb;}
function sv(p,t,d){localStorage.setItem("cf:"+p+":"+t,JSON.stringify(d));}
function dKey(offset){var d=new Date();d.setDate(d.getDate()-(offset||0));return d.toISOString().slice(0,10);}

/* ─── Hindi Translations ─── */
var HI = {
  dashboard:"परिवार डैशबोर्ड",tracker:"स्वास्थ्य ट्रैकर",schedule:"दैनिक कार्यक्रम",donts:"क्या नहीं करना",exercises:"आज के व्यायाम",hydration:"पानी ट्रैकर",supplements:"दवाइयाँ",progress:"प्रगति",medical:"चिकित्सा",goals:"लक्ष्य",health:"स्वास्थ्य",back:"वापस",today:"आज",rest:"आराम का दिन",done:"हो गया",target:"लक्ष्य",watch:"YouTube पर देखें",markAll:"सब पूरा करें",unmark:"अनमार्क",water:"पानी",exercise:"व्यायाम",weight:"वजन",log:"लॉग",dark:"डार्क मोड",hindi:"हिंदी",safety:"सुरक्षा नियम",warmup:"वार्म-अप",cooldown:"कूल-डाउन",dietFixes:"आहार सुधार",timeline:"समय-सारणी",sorenessVsInjury:"दर्द vs चोट",habits:"दैनिक आदतें",streaks:"स्ट्रीक्स",weekHistory:"इस सप्ताह",notify:"सूचनाएँ",preview:"पूर्वावलोकन",equipment:"उपकरण",sets:"सेट",protein:"प्रोटीन",meals:"भोजन",addMeal:"भोजन जोड़ें",gita:"श्रीमद्भगवद्गीता"
};

/* ─── Bhagavad Gita Shlokas (31 - one per day of month) ─── */
var GITA = [
  {ch:"2.47",sh:"कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",hi:"कर्म करने में ही तुम्हारा अधिकार है, फल में कभी नहीं।"},
  {ch:"2.14",sh:"मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।",hi:"सुख-दुख, सर्दी-गर्मी आते-जाते रहते हैं। इन्हें सहन करो।"},
  {ch:"6.5",sh:"उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।",hi:"अपने मन की शक्ति से स्वयं को ऊपर उठाओ, स्वयं को गिराओ मत।"},
  {ch:"3.35",sh:"श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।",hi:"अपना धर्म अधूरा भी हो, तो दूसरे के धर्म से अच्छा है।"},
  {ch:"9.22",sh:"अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।",hi:"जो भक्त मुझे अनन्य भाव से भजते हैं, मैं उनकी रक्षा करता हूँ।"},
  {ch:"4.7",sh:"यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",hi:"जब-जब धर्म की हानि होती है, तब-तब मैं प्रकट होता हूँ।"},
  {ch:"2.20",sh:"न जायते म्रियते वा कदाचिन्नायं भूत्वा।",hi:"आत्मा न कभी जन्मती है, न कभी मरती है।"},
  {ch:"6.35",sh:"असंशयं महाबाहो मनो दुर्निग्रहं चलम्।",hi:"मन चंचल और कठिन है, पर अभ्यास और वैराग्य से वश में होता है।"},
  {ch:"18.66",sh:"सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।",hi:"सब धर्मों को छोड़कर केवल मेरी शरण में आ जाओ। मैं तुम्हें मुक्त करूँगा।"},
  {ch:"2.3",sh:"क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते।",hi:"कायरता मत करो। हृदय की दुर्बलता त्यागो और उठो!"},
  {ch:"5.10",sh:"ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा।",hi:"जो आसक्ति छोड़कर कर्म करता है, वह पाप से अछूता रहता है।"},
  {ch:"12.13",sh:"अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।",hi:"जो सबसे द्वेष नहीं करता, सबका मित्र और दयालु है — वह मुझे प्रिय है।"},
  {ch:"3.19",sh:"तस्मादसक्तः सततं कार्यं कर्म समाचर।",hi:"आसक्ति रहित होकर कर्तव्य कर्म करो, इससे परमात्मा की प्राप्ति होती है।"},
  {ch:"2.48",sh:"योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा।",hi:"समभाव से कर्म करो। यही योग कहलाता है।"},
  {ch:"4.38",sh:"न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।",hi:"इस संसार में ज्ञान के समान पवित्र कुछ भी नहीं है।"},
  {ch:"6.17",sh:"युक्ताहारविहारस्य युक्तचेष्टस्य कर्मसु।",hi:"जो खाने, सोने, काम और आराम में संयमी है, उसके सब दुख दूर हो जाते हैं।"},
  {ch:"17.8",sh:"आयुःसत्त्वबलारोग्यसुखप्रीतिविवर्धनाः।",hi:"जो भोजन आयु, बुद्धि, बल, स्वास्थ्य और सुख बढ़ाते हैं, वे सात्विक हैं।"},
  {ch:"3.21",sh:"यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।",hi:"श्रेष्ठ व्यक्ति जो करता है, साधारण लोग उसी का अनुसरण करते हैं।"},
  {ch:"2.56",sh:"दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।",hi:"जो दुख में विचलित नहीं होता और सुख की लालसा नहीं रखता, वह स्थितप्रज्ञ है।"},
  {ch:"9.26",sh:"पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।",hi:"जो मुझे प्रेम से पत्ता, फूल, फल या जल अर्पित करता है, मैं उसे स्वीकार करता हूँ।"},
  {ch:"4.18",sh:"कर्मण्यकर्म यः पश्येदकर्मणि च कर्म यः।",hi:"जो कर्म में अकर्म और अकर्म में कर्म देखता है, वह बुद्धिमान है।"},
  {ch:"18.37",sh:"यत्तदग्रे विषमिव परिणामेऽमृतोपमम्।",hi:"जो शुरू में विष जैसा लगे पर अंत में अमृत हो — वही सात्विक सुख है।"},
  {ch:"2.38",sh:"सुखदुःखे समे कृत्वा लाभालाभौ जयाजयौ।",hi:"सुख-दुख, लाभ-हानि, जय-पराजय को समान समझकर कर्म करो।"},
  {ch:"11.33",sh:"तस्मात्त्वमुत्तिष्ठ यशो लभस्व।",hi:"इसलिए उठो और यश प्राप्त करो!"},
  {ch:"6.26",sh:"यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्।",hi:"मन जहाँ-जहाँ भटके, वहाँ से रोककर आत्मा में लगाओ।"},
  {ch:"3.27",sh:"प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः।",hi:"सब कर्म प्रकृति के गुणों द्वारा होते हैं। अहंकारी सोचता है कि मैं कर्ता हूँ।"},
  {ch:"5.22",sh:"ये हि संस्पर्शजा भोगा दुःखयोनय एव ते।",hi:"इन्द्रियों के विषयों से मिलने वाले सुख दुख के कारण हैं। उनका आदि और अंत है।"},
  {ch:"7.8",sh:"रसोऽहमप्सु कौन्तेय प्रभास्मि शशिसूर्ययोः।",hi:"मैं जल का रस हूँ, सूर्य और चन्द्रमा का प्रकाश हूँ।"},
  {ch:"18.78",sh:"यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः।",hi:"जहाँ कृष्ण हैं और जहाँ अर्जुन हैं, वहाँ विजय, समृद्धि और धर्म होता है।"},
  {ch:"4.34",sh:"तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया।",hi:"गुरु के पास जाकर, प्रणाम करके, सेवा और प्रश्न द्वारा ज्ञान प्राप्त करो।"},
  {ch:"15.15",sh:"सर्वस्य चाहं हृदि सन्निविष्टो।",hi:"मैं सबके हृदय में स्थित हूँ। मुझसे ही स्मृति, ज्ञान और विस्मृति होती है।"}
];

/* ─── Indian Food Database (protein per serving) ─── */
var FOODS = [
  {name:"Paneer (100g)",p:18,emoji:"\uD83E\uDDC0"},{name:"Curd/Dahi (1 cup)",p:8,emoji:"\uD83E\uDD5B"},{name:"Milk (1 glass)",p:8,emoji:"\uD83E\uDD5B"},
  {name:"Whey Protein (1 scoop)",p:25,emoji:"\uD83D\uDCAA"},{name:"Protein Powder (2 spoons)",p:15,emoji:"\uD83D\uDCAA"},
  {name:"Egg (1 whole)",p:6,emoji:"\uD83E\uDD5A"},{name:"Egg Whites (2)",p:7,emoji:"\uD83E\uDD5A"},{name:"Chicken (100g)",p:25,emoji:"\uD83C\uDF57"},
  {name:"Dal (1 katori)",p:7,emoji:"\uD83C\uDF5B"},{name:"Moong Sprouts (1 cup)",p:14,emoji:"\uD83C\uDF31"},{name:"Chana/Chole (1 katori)",p:10,emoji:"\uD83C\uDF5B"},
  {name:"Rajma (1 katori)",p:9,emoji:"\uD83C\uDF5B"},{name:"Moong Chilla (2 pcs)",p:10,emoji:"\uD83E\uDD5E"},{name:"Soybean Chunks (50g)",p:26,emoji:"\uD83C\uDF31"},
  {name:"Tofu (100g)",p:10,emoji:"\uD83E\uDDC0"},{name:"Roti (1)",p:3,emoji:"\uD83C\uDF5E"},{name:"Rice (1 katori)",p:3,emoji:"\uD83C\uDF5A"},
  {name:"Peanuts (handful ~30g)",p:8,emoji:"\uD83E\uDD5C"},{name:"Almonds (10 pcs)",p:4,emoji:"\uD83E\uDD5C"},{name:"Peanut Butter (2 tbsp)",p:7,emoji:"\uD83E\uDD5C"},
  {name:"Greek Yogurt (1 cup)",p:15,emoji:"\uD83E\uDD5B"},{name:"Lassi (1 glass)",p:6,emoji:"\uD83E\uDD5B"},
  {name:"Sattu (2 tbsp)",p:10,emoji:"\uD83C\uDF31"},{name:"Makhana (1 cup)",p:5,emoji:"\u2B50"}
];
var PTARGETS = {yash:130,anil:70,savita:60};

/* ─── Smart Reminders Config ─── */
var REMINDERS = {
  yash:[{h:8,m:0,msg:"Good morning Yash! Drink water + supplements"},{h:11,m:0,msg:"Mid-morning snack: almonds + fruit"},{h:13,m:0,msg:"Water check - Bottle 2 done?"},{h:15,m:30,msg:"Pre-workout snack time!"},{h:17,m:0,msg:"Exercise time! Warm-up first!"},{h:19,m:15,msg:"Post-workout protein NOW!"},{h:20,m:0,msg:"Family walk time!"}],
  anil:[{h:6,m:0,msg:"Good morning Anil Ji! Water + almonds"},{h:7,m:30,msg:"Breakfast + Cilacar 10 BEFORE exercise"},{h:11,m:0,msg:"Mid-morning fruit + nuts"},{h:13,m:0,msg:"Water + nimbu - Bottle 3"},{h:16,m:0,msg:"Chai - NO sugar! + water"},{h:20,m:0,msg:"Family walk time!"}],
  savita:[{h:6,m:0,msg:"Good morning Savita Ji! Water + almonds"},{h:7,m:30,msg:"Breakfast + protein milk"},{h:11,m:0,msg:"Mid-morning fruit + walnuts"},{h:13,m:0,msg:"Lunch - NO white rice!"},{h:16,m:0,msg:"Chai - NO sugar! Stevia only"},{h:19,m:10,msg:"\u2B50 POST-DINNER WALK in 10 min!"},{h:21,m:0,msg:"Protein milk + calf routine"}]
};

/* ─── Family Data (Full) ─── */
var F = {
  yash:{name:"Yash",age:29,emoji:"\u{1F4AA}",height:"5'10.5\"",weight:80,bmi:25.3,diet:"Vegetarian",wakeTime:"8:00 AM",exerciseTime:"5-7 PM",color:"#D97706",
    goals:["Build muscle","Lose fat","Fix triglycerides","Prevent kidney stones"],
    healthIssues:[{l:"Triglycerides",v:"198 mg/dL",s:"high"},{l:"Vitamin D",v:"11.3 ng/mL",s:"critical"},{l:"Vitamin B12",v:"229 pg/mL",s:"low"},{l:"Hemoglobin",v:"12.9 gm/dL",s:"low"},{l:"Fasting Glucose",v:"82.3 mg/dL",s:"ok"}],
    supplements:[{name:"Calcirol 60,000 IU",freq:"Weekly x 8wk then monthly",when:"Any fixed day",status:"start",icon:"\u2600\uFE0F"},{name:"Methylcobalamin 1000-1500mcg",freq:"Daily",when:"Morning with breakfast",status:"start",icon:"\u{1F48A}"},{name:"Calcium Citrate 500mg",freq:"Daily",when:"With meal (not same time as iron)",status:"start",icon:"\u{1F9B4}"},{name:"Whey Protein 2 scoops (~50-60g)",freq:"Daily",when:"1 scoop post-workout + 1 with breakfast",status:"buy",icon:"\u{1F95B}"}],
    hydrationTarget:4,hydrationTip:"Add nimbu (lemon) to 2 bottles - citrate prevents oxalate stones",
    medicalActions:["Serum ferritin test - confirm iron deficiency","Aggressive hydration + dietary oxalate management"],
    donts:[{t:"NO ab roller Month 1 - core needs plank strength first. Start Week 5+",i:"\u{1F6AB}"},{t:"NEVER hold breath during exercises (Valsalva) - exhale on push/pull, inhale on release",i:"\u{1FAC1}"},{t:"NO skipping warm-up or cool-down - 5 min each, every session",i:"\u23F1\uFE0F"},{t:"NO excess ghee - driving your triglycerides up (198 mg/dL)",i:"\u{1F9C8}"},{t:"NO sugary chai - switch to no-sugar or jaggery (max 1 cup/day)",i:"\u{1F375}"},{t:"NO white rice - switch to brown rice or reduce portion",i:"\u{1F35A}"},{t:"NO skipping protein - you need 120-130g/day, currently getting ~40-50g",i:"\u{1F969}"},{t:"NO high-oxalate foods without water: spinach, peanuts, chocolate, beets",i:"\u26A0\uFE0F"},{t:"NO exercising without pre-workout snack (60-90 min before)",i:"\u{1F34C}"},{t:"NO delaying post-workout protein - within 30-45 min after training",i:"\u23F0"},{t:"NO training through sharp joint pain - muscle soreness OK, joint pain STOP",i:"\u{1F6D1}"}],
    safetyWarn:"",
    dailySchedule:[{time:"8:00 AM",task:"Wake up + drink 1 full glass of water immediately",icon:"\u{1F4A7}"},{time:"8:00-9:00",task:"Finish Bottle 1 (1L) before breakfast",icon:"\u{1FAD7}"},{time:"8:30 AM",task:"Take Methylcobalamin + Calcium Citrate with breakfast",icon:"\u{1F48A}"},{time:"9:00 AM",task:"Protein-rich breakfast (paneer/eggs/sprouts/moong chilla + curd)",icon:"\u{1F373}"},{time:"9:00-1:00",task:"Finish Bottle 2 (1L) before lunch",icon:"\u{1FAD7}"},{time:"11:00 AM",task:"Mid-morning snack: handful of almonds + fruit",icon:"\u{1F95C}"},{time:"1:00 PM",task:"Lunch: dal/sabzi + 2 roti + small rice. Add curd/raita",icon:"\u{1F37D}\uFE0F"},{time:"1:00-5:00",task:"Finish Bottle 3 (1L) before evening chai",icon:"\u{1FAD7}"},{time:"3:30 PM",task:"Pre-workout snack: banana + almonds OR roti + peanut butter",icon:"\u{1F34C}"},{time:"4:00 PM",task:"After chai - drink 1 glass water (chai dehydrates)",icon:"\u{1F375}"},{time:"5:00-7:00",task:"EXERCISE SESSION (strength/yoga per schedule)",icon:"\u{1F3CB}\uFE0F"},{time:"5:00-7:00",task:"Finish Bottle 4 (1L). Reduce after 8:30 PM",icon:"\u{1FAD7}"},{time:"7:00-7:30",task:"Post-workout: Whey shake + banana within 30-45 min",icon:"\u{1F95B}"},{time:"8:00-8:30",task:"Family post-dinner walk (10-15 min)",icon:"\u{1F6B6}"},{time:"8:30 PM",task:"Dinner: roti + sabzi/dal. Eat 1-1.5 hrs after protein shake",icon:"\u{1F37D}\uFE0F"},{time:"Sunday",task:"WEIGH-IN: Same time, before eating. Log weight.",icon:"\u2696\uFE0F"}],
    habits:[{id:"family_walk",l:"Family post-dinner walk (10-15 min)"}],
    milestones:[{k:"pushups",l:"Push-ups (max)",i:"\u{1F4AA}"},{k:"plank",l:"Plank (sec)",i:"\u{1F9D8}"},{k:"deadhang",l:"Dead hang (sec)",i:"\u{1F3CB}\uFE0F"}],
    weightTarget:"73-75 kg"
  },
  anil:{name:"Anil Ji",age:56,emoji:"\u{1F9D8}",height:"5'9\"",weight:83,bmi:27,diet:"Veg + Non-veg 2x/week",wakeTime:"6:00 AM",exerciseTime:"6-7:30 AM",color:"#2563EB",
    goals:["Heart health","Weight loss","Manage BP","Kidney stone management"],
    healthIssues:[{l:"Vitamin B12",v:"107 pg/mL",s:"critical"},{l:"Vitamin D",v:"12.3 ng/mL",s:"critical"},{l:"Triglycerides",v:"178 mg/dL",s:"high"},{l:"Fasting Glucose",v:"99.8 mg/dL",s:"warning"},{l:"Kidney Stone",v:"18mm active",s:"critical"},{l:"BP",v:"On Cilacar 10",s:"managed"},{l:"LDL",v:"51.1 mg/dL",s:"ok"}],
    supplements:[{name:"Cilacar 10 (Cilnidipine 10mg)",freq:"Daily",when:"After breakfast - BEFORE exercise",status:"taking",icon:"\u{1F497}"},{name:"Calcirol 60,000 IU",freq:"Weekly",when:"Fixed day (e.g., Sunday)",status:"taking",icon:"\u2600\uFE0F"},{name:"Methylcobalamin 1500mcg",freq:"Daily",when:"Replace Neurobion - only 15mcg B12, INSUFFICIENT",status:"switch",icon:"\u{1F48A}"},{name:"Calcium Citrate 500mg + Mag 250mg",freq:"Daily",when:"With a meal",status:"start",icon:"\u{1F9B4}"}],
    hydrationTarget:4,hydrationTip:"Add nimbu to 1-2 bottles - citrate prevents calcium oxalate stones. CRITICAL with 18mm stone",
    medicalActions:["Discuss B12 injections vs high-dose oral methylcobalamin with doctor","Urologist follow-up for 18mm kidney stone monitoring","Urine culture to rule out low-grade infection (borderline pus cells)","Discuss Potassium Citrate for stone prevention with urologist"],
    donts:[{t:"NO heavy overhead lifting - dangerous with hypertension",i:"\u{1F6AB}"},{t:"NO head-below-heart positions for extended time",i:"\u{1F643}"},{t:"NEVER hold breath during exercise (Valsalva) - can spike BP dangerously",i:"\u{1FAC1}"},{t:"NO exercising without taking Cilacar first - take after breakfast, before workout",i:"\u{1F48A}"},{t:"NO pushing through lightheadedness - sit down immediately",i:"\u{1F4AB}"},{t:"NO exercising without water nearby - sip between every set",i:"\u{1F4A7}"},{t:"NO excess ghee - driving triglycerides (178) and dangerous with kidney stone",i:"\u{1F9C8}"},{t:"NO sugary chai - borderline pre-diabetic (glucose 99.8). Switch to no sugar",i:"\u{1F375}"},{t:"NO dehydration - with 18mm kidney stone, low water is extremely dangerous",i:"\u26A0\uFE0F"},{t:"NO high-sodium/processed foods - worsens BP and kidney stones",i:"\u{1F9C2}"},{t:"NO skipping lemon water - citrate is your kidney stone prevention",i:"\u{1F34B}"},{t:"NO ignoring sharp pain in joints - muscle soreness OK, joint pain STOP",i:"\u{1F6D1}"}],
    safetyWarn:"\u26A0\uFE0F BP Safety: No heavy overhead \u00B7 Breathe always \u00B7 Water nearby \u00B7 Sit if dizzy \u00B7 Cilacar taken?",
    dailySchedule:[{time:"6:00 AM",task:"Wake up + drink 1 full glass of water immediately",icon:"\u{1F4A7}"},{time:"6:00-6:10",task:"Glass of water + 2-3 soaked almonds before walk",icon:"\u{1F95C}"},{time:"6:10-6:40",task:"Morning walk (30 min) - with Savita Ji",icon:"\u{1F6B6}"},{time:"6:40-7:15",task:"Exercises OR Yoga (per day schedule) - with Savita Ji",icon:"\u{1F3CB}\uFE0F"},{time:"7:15-7:20",task:"Pranayama - Anulom Vilom (5 min) - DAILY",icon:"\u{1F9D8}"},{time:"7:15-8:00",task:"Finish Bottle 1 (1L) before breakfast",icon:"\u{1FAD7}"},{time:"7:30 AM",task:"Breakfast within 30-45 min of exercise. ADD PROTEIN",icon:"\u{1F373}"},{time:"After breakfast",task:"Take Cilacar 10 + Methylcobalamin + Calcium-Mag",icon:"\u{1F48A}"},{time:"8:00-12:00",task:"Finish Bottle 2 (1L) - add nimbu to this one",icon:"\u{1F34B}"},{time:"11:00 AM",task:"Mid-morning: fruit + handful of nuts",icon:"\u{1F34E}"},{time:"1:00 PM",task:"Lunch: dal + sabzi + 2 roti. Reduce rice. Add raita",icon:"\u{1F37D}\uFE0F"},{time:"1:00-5:00",task:"Finish Bottle 3 (1L) - add nimbu",icon:"\u{1F34B}"},{time:"4:00 PM",task:"Chai (no sugar!) - follow with 1 glass water",icon:"\u{1F375}"},{time:"5:00-8:00",task:"Finish Bottle 4 (1L). Reduce after 8:30 PM",icon:"\u{1FAD7}"},{time:"7:30 PM",task:"Dinner",icon:"\u{1F37D}\uFE0F"},{time:"8:00-8:30",task:"Family post-dinner walk (10-15 min)",icon:"\u{1F6B6}"},{time:"~10:00 PM",task:"Sleep",icon:"\u{1F634}"},{time:"Sunday",task:"WEIGH-IN: Same time, before eating. Log weight.",icon:"\u2696\uFE0F"}],
    habits:[{id:"pranayama",l:"\u{1F9D8} Pranayama - Anulom Vilom (5 min)"},{id:"family_walk",l:"Family walk (10-15 min)"}],
    milestones:[{k:"wallpushups",l:"Wall push-ups",i:"\u{1F4AA}"},{k:"sittostand",l:"Sit-to-stand",i:"\u{1FA91}"}],
    weightTarget:"78 kg"
  },
  savita:{name:"Savita Ji",age:"~55",emoji:"\u{1F338}",height:"5'3\"",weight:80,bmi:31.2,diet:"Vegetarian",wakeTime:"6:00 AM",exerciseTime:"6-7:30 AM",color:"#7C3AED",
    goals:["Blood sugar control","Bone health","Gentle conditioning","Weight loss"],
    healthIssues:[{l:"HbA1c",v:"6.90%",s:"critical"},{l:"Fasting Glucose",v:"121.7 mg/dL",s:"high"},{l:"Hemoglobin",v:"11.10 gm/dL",s:"low"},{l:"Calcium",v:"8.40 mg/dL",s:"low"},{l:"LDL",v:"127.54 mg/dL",s:"high"},{l:"Osteoporosis Risk",v:"HIGH - 5yr low estrogen",s:"critical"}],
    supplements:[{name:"Newcal-Forte Softgel (Calcitriol+Ca+Mg+Zn)",freq:"Daily",when:"With lunch (good combo for bones)",status:"taking",icon:"\u{1F9B4}"},{name:"Calcirol 60,000 IU",freq:"Weekly",when:"Fixed day (e.g., Sunday)",status:"taking",icon:"\u2600\uFE0F"},{name:"Protein Powder (4 spoons = 30g protein)",freq:"Daily - 2 doses",when:"2 spoons morning milk + 2 spoons evening milk",status:"start",icon:"\u{1F95B}"},{name:"Methylcobalamin 500-1000mcg",freq:"Daily",when:"With breakfast (maintenance)",status:"start",icon:"\u{1F48A}"}],
    hydrationTarget:3,hydrationTip:"Can add jeera (cumin) to 1 bottle. Front-load: 2 bottles by 2 PM, last bottle 2-7 PM, minimal after 8 PM",
    medicalActions:["Doctor evaluation for diabetes medication (metformin?) - HbA1c 6.9%","Serum ferritin + iron studies - confirm iron deficiency anemia","DEXA scan for bone density - URGENT (5yr low estrogen, cancer surgery)","Urine microalbumin/creatinine ratio - early diabetic kidney check"],
    donts:[{t:"NO high-impact - NO jumping, running, burpees. Bones are at risk",i:"\u{1F6AB}"},{t:"NO fast or jerky movements - everything slow and controlled",i:"\u{1F422}"},{t:"NO balance exercises without chair support - fall risk",i:"\u{1FA91}"},{t:"NO skipping post-dinner walk - most important for blood sugar (reduces spike 30-40%)",i:"\u2B50"},{t:"NO skipping calf cramp routine before bed - 3 min daily",i:"\u{1F9B5}"},{t:"NO ghee cooking - gallbladder removed, cannot process fat properly",i:"\u{1F9C8}"},{t:"NO white rice - HIGH glycemic index, spikes blood sugar directly",i:"\u{1F35A}"},{t:"NO sugary chai - diabetic (HbA1c 6.9%). Zero sugar or stevia only",i:"\u{1F375}"},{t:"NO large meals - eat smaller, more frequent meals for blood sugar",i:"\u{1F37D}\uFE0F"},{t:"NO skipping protein - bones and muscles need it. 30g/day from powder",i:"\u{1F95B}"},{t:"NO water after 8 PM - affects your sleep",i:"\u{1F319}"},{t:"If knee pain (winter) - seated-only exercises, NO standing",i:"\u{1F9BF}"},{t:"NO ignoring leg cramps - may indicate worsening calcium deficiency",i:"\u26A0\uFE0F"}],
    safetyWarn:"\u26A0\uFE0F No jumping \u00B7 Slow & controlled \u00B7 Chair for balance \u00B7 Seated-only if knee pain",
    dailySchedule:[{time:"6:00 AM",task:"Wake up + drink 1 full glass of water immediately",icon:"\u{1F4A7}"},{time:"6:00-6:10",task:"Glass of water + 2-3 soaked almonds before walk",icon:"\u{1F95C}"},{time:"6:10-6:40",task:"Morning walk (30 min) - with Anil Ji",icon:"\u{1F6B6}"},{time:"6:40-7:15",task:"Exercises OR Yoga (per day schedule) - with Anil Ji",icon:"\u{1F3CB}\uFE0F"},{time:"6:00-8:00",task:"Finish Bottle 1 (1L). Front-load water!",icon:"\u{1FAD7}"},{time:"7:30 AM",task:"Breakfast within 30-45 min of exercise. ADD PROTEIN",icon:"\u{1F373}"},{time:"7:30 AM",task:"Morning milk with 2 spoons protein powder",icon:"\u{1F95B}"},{time:"After breakfast",task:"Take Methylcobalamin + Newcal-Forte with meal",icon:"\u{1F48A}"},{time:"8:00-1:00",task:"Finish Bottle 2 (1L) - both bottles by 2 PM!",icon:"\u{1FAD7}"},{time:"11:00 AM",task:"Mid-morning: fruit + soaked almonds/walnuts",icon:"\u{1F34E}"},{time:"1:00 PM",task:"Lunch: dal + sabzi + 1-2 roti. NO white rice. Add curd",icon:"\u{1F37D}\uFE0F"},{time:"2:00-7:00",task:"Finish Bottle 3 (1L). Minimal water after 8 PM!",icon:"\u{1FAD7}"},{time:"4:00 PM",task:"Chai (NO SUGAR) - follow with 1 glass water",icon:"\u{1F375}"},{time:"5:00 PM",task:"Snack: chana chaat / roasted makhana / sprouts",icon:"\u{1F957}"},{time:"7:00 PM",task:"Light dinner: 1 roti + 1 katori sabzi/dal",icon:"\u{1F37D}\uFE0F"},{time:"7:20 PM",task:"\u2B50 POST-DINNER WALK - 10 min - NON-NEGOTIABLE \u2B50",icon:"\u{1F6B6}\u200D\u2640\uFE0F"},{time:"8:00-8:30",task:"Family post-dinner walk (10-15 min)",icon:"\u{1F46A}"},{time:"9:00 PM",task:"Milk with 2 spoons protein powder",icon:"\u{1F95B}"},{time:"Before bed",task:"\u{1F9B5} Calf cramp routine (3 min): ankle circles > point/flex > calf stretch",icon:"\u{1F319}"},{time:"~10:00 PM",task:"Sleep (try Shavasana relaxation if difficulty sleeping)",icon:"\u{1F634}"},{time:"Sunday",task:"WEIGH-IN: Same time, before eating. Log weight.",icon:"\u2696\uFE0F"}],
    habits:[{id:"post_dinner_walk",l:"\u2B50 Post-dinner walk 10 min - NON-NEGOTIABLE"},{id:"calf_routine",l:"\u{1F9B5} Calf cramp routine (3 min)"},{id:"family_walk",l:"Family walk (10-15 min)"}],
    milestones:[{k:"wallpushups",l:"Wall push-ups",i:"\u{1F4AA}"},{k:"sittostand",l:"Sit-to-stand",i:"\u{1FA91}"}],
    weightTarget:"74-75 kg"
  }
};

/* ─── Exercises (Full) ─── */
var WU=["Jumping jacks 1 min","Arm circles 30s each","Squats x10","Hip circles x10 each","High knees 30s"];
var CD=["Chest stretch 20s","Hamstring stretch 20s each","Quad stretch 20s each","Shoulder stretch 20s each","Child's pose 30s"];
var EX={yash:{str:{"week1-2":{mon:[{n:"Push-ups",s:2,r:"max",e:"Bodyweight"},{n:"DB Rows 5kg (each arm)",s:2,r:10,e:"5kg DB + Chair"},{n:"Bodyweight Squats",s:2,r:12,e:"Bodyweight"},{n:"Tube Bicep Curls",s:2,r:10,e:"Medium Tube"},{n:"Plank",s:2,r:"20 sec",e:"Mat"}],wed:"mon",fri:[{n:"Push-ups",s:2,r:"max",e:"Bodyweight"},{n:"DB Shoulder Press 5kg",s:2,r:10,e:"5kg Dumbbells"},{n:"Lunges (bodyweight)",s:2,r:"8 each",e:"Bodyweight"},{n:"Tube Face Pulls",s:2,r:12,e:"Tube + Anchor"},{n:"Lying Leg Raises",s:2,r:10,e:"Mat"}]},"week3":{mon:[{n:"Push-ups",s:2,r:"max",e:"Bodyweight"},{n:"DB Floor Press 5kg",s:2,r:12,e:"5kg DB + Mat"},{n:"DB Shoulder Press 5kg",s:2,r:10,e:"5kg Dumbbells"},{n:"Tube Tricep Pushdowns",s:2,r:12,e:"Tube + Anchor"},{n:"Plank",s:2,r:"25 sec",e:"Mat"}],wed:[{n:"Dead Hangs",s:2,r:"max hold (15-20s)",e:"Pull-up Bar"},{n:"DB Rows 5kg (each arm)",s:2,r:10,e:"5kg DB + Chair"},{n:"Tube Rows (door chest)",s:2,r:12,e:"Tube + Anchor"},{n:"Tube Face Pulls",s:2,r:12,e:"Tube + Anchor"},{n:"Tube Bicep Curls",s:2,r:10,e:"Medium Tube"}],fri:[{n:"Bodyweight Squats",s:2,r:15,e:"Bodyweight"},{n:"DB Goblet Squats 5kg",s:2,r:12,e:"5kg Dumbbell"},{n:"DB Lunges 5kg",s:2,r:"8 each",e:"5kg Dumbbells"},{n:"Mini Loop Glute Bridges",s:2,r:15,e:"Band + Mat"},{n:"Calf Raises",s:2,r:20,e:"Bodyweight"},{n:"Bicycle Crunches",s:2,r:15,e:"Mat"}]},"week4":{mon:[{n:"Push-ups",s:3,r:"max",e:"Bodyweight"},{n:"DB Floor Press 5kg",s:3,r:12,e:"5kg DB + Mat"},{n:"DB Shoulder Press 5kg",s:3,r:10,e:"5kg Dumbbells"},{n:"Tube Tricep Pushdowns",s:3,r:12,e:"Tube + Anchor"},{n:"Plank",s:3,r:"25 sec",e:"Mat"}],wed:[{n:"Dead Hangs",s:3,r:"max hold",e:"Pull-up Bar"},{n:"DB Rows 5kg (each arm)",s:3,r:10,e:"5kg DB + Chair"},{n:"Tube Rows",s:3,r:12,e:"Tube + Anchor"},{n:"Tube Face Pulls",s:3,r:12,e:"Tube + Anchor"},{n:"Tube Bicep Curls",s:3,r:10,e:"Medium Tube"}],fri:[{n:"Bodyweight Squats",s:3,r:15,e:"Bodyweight"},{n:"DB Goblet Squats 5kg",s:3,r:12,e:"5kg Dumbbell"},{n:"DB Lunges 5kg",s:3,r:"8 each",e:"5kg Dumbbells"},{n:"Mini Loop Glute Bridges",s:3,r:15,e:"Band + Mat"},{n:"Calf Raises",s:3,r:20,e:"Bodyweight"},{n:"Bicycle Crunches",s:3,r:15,e:"Mat"}],sat:[{n:"HIIT - Jumping Jacks (20s/40s rest)",s:3,r:"20 sec",e:"Bodyweight"},{n:"HIIT - High Knees (20s/40s rest)",s:3,r:"20 sec",e:"Bodyweight"}]}},yoga:{"week1-2":[{n:"Surya Namaskar - 3 slow rounds",d:"5-6 min",desc:"Full body flow"},{n:"Downward Dog",d:"30 sec",desc:"Hamstrings, calves, shoulders"},{n:"Plank Pose",d:"20-30 sec",desc:"Core"},{n:"Boat Pose (Navasana)",d:"15-20 sec x 2",desc:"Core"},{n:"Cobra (Bhujangasana)",d:"20 sec x 2",desc:"Chest opener"},{n:"Seated Forward Fold",d:"30 sec",desc:"Back + hamstring stretch"},{n:"Bridge Pose",d:"20 sec x 2",desc:"Glutes, core"},{n:"Shavasana",d:"3-5 min",desc:"Full relaxation"}],"week3-4":[{n:"Surya Namaskar x 3",d:"5-6 min",desc:"Sun salutations"},{n:"Warrior I & II",d:"20-30 sec each side",desc:"Leg strength"},{n:"Chair Pose",d:"20-30 sec",desc:"Quad burn"},{n:"Downward Dog > Plank flow",d:"30 sec each",desc:"Core + upper"},{n:"Side Plank",d:"15-20 sec each",desc:"Obliques"},{n:"Cobra x 2",d:"20 sec",desc:"Chest"},{n:"Boat Pose x 2",d:"15-20 sec",desc:"Core"},{n:"Seated Forward Fold",d:"30 sec",desc:"Stretch"},{n:"Bridge x 2",d:"20-30 sec",desc:"Backbend"},{n:"Shavasana",d:"3-5 min",desc:"Relaxation"}]}},parents:{str:{"week1-2":{f:[{n:"Chair Sit-to-Stand",s:1,r:8},{n:"Wall Push-ups",s:1,r:8},{n:"Standing Calf Raises (chair)",s:1,r:10},{n:"Tube Rows (door anchor)",s:1,r:8}],m:[{n:"Chair Sit-to-Stand",s:1,r:8},{n:"Wall Push-ups",s:1,r:"6-8"},{n:"Standing Calf Raises (chair)",s:1,r:10},{n:"Seated Arm Raises (1kg)",s:1,r:8}]},"week3":{f:[{n:"Chair Sit-to-Stand",s:2,r:8},{n:"Wall Push-ups",s:2,r:8},{n:"Standing Calf Raises",s:2,r:10},{n:"Tube Rows",s:2,r:8}],m:[{n:"Chair Sit-to-Stand",s:2,r:8},{n:"Wall Push-ups",s:2,r:"6-8"},{n:"Standing Calf Raises",s:2,r:10},{n:"Seated Arm Raises (1kg)",s:2,r:8}]},"week4":{f:[{n:"Chair Sit-to-Stand",s:2,r:8},{n:"Wall Push-ups",s:2,r:8},{n:"Standing Calf Raises",s:2,r:10},{n:"Tube Rows",s:2,r:8},{n:"DB Bicep Curls 5kg",s:2,r:8},{n:"Standing Leg Raises (chair)",s:2,r:"8 each"}],m:[{n:"Chair Sit-to-Stand",s:2,r:8},{n:"Wall Push-ups",s:2,r:"6-8"},{n:"Standing Calf Raises",s:2,r:10},{n:"Seated Arm Raises (1kg)",s:2,r:8},{n:"Tube Pulls (light)",s:2,r:8},{n:"Standing Leg Raises (chair)",s:2,r:"8 each"}]}},yoga:{"week1-2":[{n:"Tadasana (Mountain)",d:"30 sec",desc:"Stand tall"},{n:"Vrikshasana (Tree) + chair",d:"15 sec each",desc:"Balance"},{n:"Cat-Cow",d:"8-10 rounds",desc:"Spinal mobility"},{n:"Legs Up Wall",d:"2-3 min",desc:"Reduces cramps"},{n:"Shavasana",d:"2-3 min",desc:"Deep relaxation"}],"week3-4":[{n:"Tadasana",d:"30 sec",desc:"Alignment"},{n:"Vrikshasana + chair",d:"15 sec each",desc:"Balance"},{n:"Trikonasana (Triangle)",d:"15-20 sec each",desc:"Hip opener"},{n:"Cat-Cow",d:"8 rounds",desc:"Spine"},{n:"Bridge Pose",d:"15-20 sec x 2",desc:"Glutes"},{n:"Child's Pose",d:"30-60 sec",desc:"Calming"},{n:"Legs Up Wall",d:"2-3 min",desc:"Relaxation"},{n:"Shavasana",d:"2-3 min",desc:"Full relaxation"}]}}};

/* ─── Diet Fixes & Shared Patterns ─── */
var DIET_FIXES=[{b:"Excess ghee",f:"1 tsp mustard/olive oil. Ghee max 1 tsp/day",w:"Everyone, esp. Savita Ji (no gallbladder)"},{b:"Carb-heavy breakfast",f:"Add paneer bhurji, moong chilla, sprouts, curd",w:"Everyone"},{b:"Sugary chai 2-3 cups",f:"No sugar/stevia. Max 1 cup",w:"Everyone, critical for Savita Ji"},{b:"White rice",f:"Brown rice or halve portion",w:"Critical for Savita Ji (glucose)"},{b:"Low protein",f:"Yash: 120-130g/day. Parents: 60-70g",w:"Everyone"},{b:"Low water",f:"Yash/Anil: 4L. Savita: 3L. Bottle method",w:"Everyone - kidneys"}];
var SHARED_PATTERNS=["Vitamin D deficiency - all 3","Elevated triglycerides - all 3 (198, 178, 145.8)","Anemia markers - Yash + Mother (iron), Father (B12)","Urine albumin traces - all 3","Key fix: Less ghee + More protein + No sugar chai + More water"];
var TIMELINE=[{w:"Week 1-2",n:"Sore, possibly tired. NORMAL. Don't quit.",c:"#F59E0B"},{w:"Week 3-4",n:"Energy up, soreness down, feeling stronger.",c:"#22C55E"},{w:"Week 5-8",n:"Clothes fit different, face leaner, strength up.",c:"#3B82F6"},{w:"Week 9-12",n:"Visible changes. Triglycerides should drop at retest.",c:"#8B5CF6"}];

/* ─── Main App ─── */
export default function App() {
  var [scr,setScr]=useState("dash");
  var [per,setPer]=useState(null);
  var [prog,setProg]=useState(function(){var d={yash:{},anil:{},savita:{}};["yash","anil","savita"].forEach(function(p){["exercises","hydration","supplements","habits","metrics","meals"].forEach(function(t){d[p][t]=ld(p,t,{});});});return d;});
  var [wk,setWk]=useState("week1-2");
  var [dark,setDark]=useState(false);
  var [lang,setLang]=useState("en");
  var [notif,setNotif]=useState(false);
  var upd=useCallback(function(p,t,date,val){setProg(function(prev){var n=JSON.parse(JSON.stringify(prev));if(!n[p])n[p]={};if(!n[p][t])n[p][t]={};n[p][t][date]=val;sv(p,t,n[p][t]);return n;});},[]);
  var go=function(s,p){if(p!==undefined)setPer(p);setScr(s);};
  var cp=per?prog[per]||{}:{};
  var t=function(key){return lang==="hi"&&HI[key]?HI[key]:key;};
  var bg=dark?"#1a1a2e":"linear-gradient(170deg,#FAFAF9 0%,#F5F0E8 50%,#EDE8DD 100%)";
  var fg=dark?"#e0e0e0":"#1a1a2e";
  var cbg=dark?"#2a2a3e":"#fff";
  var bdr=dark?"#3a3a4e":"#eee";
  var sub=dark?"#aaa":"#888";
  var scS={maxWidth:480,margin:"0 auto",padding:"14px 14px 36px",fontFamily:"system-ui,-apple-system,sans-serif",minHeight:"100vh",background:bg,color:fg,fontSize:14};
  var backS={background:cbg,border:"1.5px solid "+bdr,fontSize:16,fontWeight:600,color:fg,cursor:"pointer",padding:"12px 20px",borderRadius:12,marginBottom:10,display:"block"};
  var secS={fontSize:23,fontWeight:700,color:fg,margin:"4px 0 10px"};
  var cardS=function(c){return{width:"100%",background:cbg,borderRadius:14,padding:"14px 16px",border:"none",borderLeft:"4px solid "+c,cursor:"pointer",textAlign:"left",marginBottom:10,boxShadow:dark?"none":"0 1px 3px rgba(0,0,0,.06)",display:"block",color:fg};};

  /* ─── Settings Bar ─── */
  var SettingsBar = function(){return(
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:12,flexWrap:"wrap"}}>
      <button onClick={function(){setDark(!dark)}} style={{background:dark?"#444":"#f0f0f0",color:dark?"#fff":"#333",border:"none",borderRadius:8,padding:"5px 12px",fontSize:10,fontWeight:600,cursor:"pointer"}}>{dark?"\u2600\uFE0F Light":"\u{1F319} Dark"}</button>
      <button onClick={function(){setLang(lang==="en"?"hi":"en")}} style={{background:lang==="hi"?"#7C3AED":"#f0f0f0",color:lang==="hi"?"#fff":"#333",border:"none",borderRadius:8,padding:"5px 12px",fontSize:10,fontWeight:600,cursor:"pointer"}}>{lang==="hi"?"EN":"HI \u{1F1EE}\u{1F1F3}"}</button>
      <button onClick={function(){
        if(!notif&&"Notification" in window){
          Notification.requestPermission().then(function(perm){
            if(perm==="granted"){
              setNotif(true);
              new Notification("Chaudhary Family",{body:"Smart reminders enabled! Water, meds & exercise alerts active."});
              /* Schedule check every minute */
              if(!window._cfReminder){
                window._cfReminder=setInterval(function(){
                  var now=new Date();var h=now.getHours();var m=now.getMinutes();
                  Object.keys(REMINDERS).forEach(function(p){
                    REMINDERS[p].forEach(function(r){
                      if(r.h===h&&r.m===m&&!window["_cf_sent_"+p+h+m]){
                        window["_cf_sent_"+p+h+m]=true;
                        new Notification(F[p].emoji+" "+F[p].name,{body:r.msg,icon:F[p].emoji});
                      }
                    });
                  });
                },60000);
              }
            }
          });
        }else if(notif){setNotif(false);if(window._cfReminder){clearInterval(window._cfReminder);window._cfReminder=null;}}
      }} style={{background:notif?"#16A34A":"#f0f0f0",color:notif?"#fff":"#333",border:"none",borderRadius:8,padding:"5px 12px",fontSize:10,fontWeight:600,cursor:"pointer"}}>{notif?"\u{1F514} On":"\u{1F515} Notify"}</button>
    </div>
  );};

  /* ─── 7-day history helper ─── */
  var hist7=function(progData,type,field){
    return Array.from({length:7},function(_,i){
      var dk=dKey(6-i);
      var dayData=(progData[type]||{})[dk]||{};
      var val=field?dayData[field]:dayData;
      var dayName=new Date(dk).toLocaleDateString("en-IN",{weekday:"narrow"});
      return{dk:dk,val:val,dayName:dayName,isToday:i===6};
    });
  };

  /* ─── Bottom Nav ─── */
  var BottomNav = function(){
    if(!per) return null;
    var m = F[per]; if(!m) return null;
    var tabs=[{id:"dash",icon:"\u{1F3E0}",l:"Home"},{id:"exercises",icon:"\u{1F3CB}\uFE0F",l:t("exercise")},{id:"hydration",icon:"\u{1F4A7}",l:t("water")},{id:"supplements",icon:"\u{1F48A}",l:"Supps"},{id:"protein",icon:"\u{1F356}",l:t("protein")}];
    return(<div style={{position:"fixed",bottom:0,left:0,right:0,background:dark?"#1a1a2e":"#fff",borderTop:"1px solid "+(dark?"#333":"#e5e5e5"),display:"flex",justifyContent:"center",maxWidth:480,margin:"0 auto",zIndex:99,paddingBottom:4}}>
      {tabs.map(function(tab){var active=scr===tab.id||(tab.id==="dash"&&(scr==="profile"||scr==="dash"));return(
        <button key={tab.id} onClick={function(){if(tab.id==="dash"){go("dash");}else{go(tab.id);}}} style={{flex:1,background:"none",border:"none",padding:"8px 0 4px",cursor:"pointer",textAlign:"center",opacity:active?1:0.5}}>
          <div style={{fontSize:20}}>{tab.icon}</div>
          <div style={{fontSize:9,fontWeight:600,color:active?m.color:sub,marginTop:1}}>{tab.l}</div>
        </button>
      );})}
    </div>);
  };

  /* ─── CSS ─── */
  var cssBlock = "<style>@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}*{box-sizing:border-box}</style>";

  /* ─── Routing with wrapper ─── */
  var screen = null;
  if(scr==="dash") screen = <Dash />;
  else if(scr==="profile"&&per) screen = <Prof />;
  else if(scr==="schedule"&&per) screen = <SchedV />;
  else if(scr==="donts"&&per) screen = <DontsV />;
  else if(scr==="exercises"&&per) screen = <ExerV />;
  else if(scr==="hydration"&&per) screen = <HydraV />;
  else if(scr==="supplements"&&per) screen = <SuppsV />;
  else if(scr==="tracking"&&per) screen = <TrackV />;
  else if(scr==="medical"&&per) screen = <MedV />;
  else if(scr==="protein"&&per) screen = <ProteinV />;
  else if(scr==="family") screen = <FamilyV />;
  else screen = <Dash />;

  return(<div>
    <div dangerouslySetInnerHTML={{__html:cssBlock}}/>
    <div style={{paddingBottom:per?56:0}}>{screen}</div>
    <BottomNav />
  </div>);

  /* ─── Dashboard ─── */
  function Dash(){var td=TK();var gita=GITA[new Date().getDate()-1]||GITA[0];
    /* Motivation message */
    var motiv="";var totalDone=0;Object.keys(F).forEach(function(k){var p=prog[k]||{};if((((p.exercises||{})[td]||{}).completed||[]).length>0)totalDone++;});
    if(totalDone===3)motiv="\u{1F525} All 3 family members exercised today! Amazing!";
    else if(totalDone>0)motiv=totalDone+"/3 family members done today. Let's get everyone moving!";
    else{var hr=new Date().getHours();if(hr<10)motiv="\u{1F31E} New day, new opportunity. Let's make it count!";else if(hr<15)motiv="Still time to get today's workout done!";else motiv="Evening is here - perfect time for exercise!";}
    return(<div style={scS}><SettingsBar/>
    {/* Gita Shloka */}
    <div style={{background:dark?"#2e2a1a":"#FFFBEB",borderRadius:14,padding:"14px 16px",marginBottom:12,borderLeft:"4px solid #D97706"}}>
      <div style={{fontSize:10,color:"#D97706",fontWeight:700,letterSpacing:1,marginBottom:6}}>{"\u{1F4D6} \u0936\u094D\u0930\u0940\u092E\u0926\u094D\u092D\u0917\u0935\u0926\u094D\u0917\u0940\u0924\u093E"} ({gita.ch})</div>
      <div style={{fontSize:15,fontWeight:600,lineHeight:1.7,color:dark?"#fbbf24":"#92400E",fontStyle:"italic"}}>{gita.sh}</div>
      <div style={{fontSize:13,color:dark?"#d4a574":"#78350f",marginTop:8,lineHeight:1.5,fontWeight:500}}>{gita.hi}</div>
    </div>
    {/* Motivation */}
    <div style={{background:dark?"#1a2e1a":"#F0FDF4",borderRadius:10,padding:"8px 14px",marginBottom:12,fontSize:12,color:dark?"#86efac":"#166534",fontWeight:500,textAlign:"center"}}>{motiv}</div>
    <div style={{textAlign:"center",padding:"4px 0 12px"}}><div style={{fontSize:11,color:sub,letterSpacing:1.5,textTransform:"uppercase"}}>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div><h1 style={{fontSize:28,fontWeight:900,color:fg,margin:"4px 0 0"}}>{lang==="hi"?"\u091A\u094C\u0927\u0930\u0940 \u092A\u0930\u093F\u0935\u093E\u0930":"Chaudhary Family"}</h1><p style={{fontSize:13,color:sub,margin:"2px 0 0"}}>{t("tracker")}</p></div>
    {Object.keys(F).map(function(k){var m=F[k],p=prog[k]||{},exN=(((p.exercises||{})[td]||{}).completed||[]).length,hy=((p.hydration||{})[td]||{}).bottles||0,sdN=(((p.supplements||{})[td]||{}).taken||[]).length;return(
      <div key={k} style={{background:cbg,borderRadius:14,borderLeft:"4px solid "+m.color,marginBottom:10,boxShadow:dark?"none":"0 1px 3px rgba(0,0,0,.06)",overflow:"hidden"}}>
        <button onClick={function(){go("profile",k)}} style={{width:"100%",background:"transparent",border:"none",padding:"14px 16px 6px",cursor:"pointer",textAlign:"left",color:fg,display:"block"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><span style={{fontSize:34}}>{m.emoji}</span><div style={{fontSize:20,fontWeight:700,marginTop:4}}>{m.name}</div><div style={{fontSize:12,color:sub}}>Age {m.age}</div></div></div>
        </button>
        {/* Quick Actions */}
        <div style={{display:"flex",gap:4,padding:"6px 12px 12px"}}>
          <button onClick={function(){var cur=((p.hydration||{})[td]||{}).bottles||0;if(cur<m.hydrationTarget)upd(k,"hydration",td,{bottles:cur+1});}} style={{flex:1,background:hy>=m.hydrationTarget?(dark?"#1a2e1a":"#F0FDF4"):(dark?"#1a2a3e":"#EFF6FF"),border:"1.5px solid "+(hy>=m.hydrationTarget?"#86EFAC":"#93C5FD"),borderRadius:10,padding:"8px 4px",cursor:"pointer",textAlign:"center",color:fg}}>
            <div style={{fontSize:16}}>{"\u{1F4A7}"}</div>
            <div style={{fontSize:13,fontWeight:700,color:hy>=m.hydrationTarget?"#16A34A":"#3B82F6"}}>{hy}/{m.hydrationTarget}L</div>
            <div style={{fontSize:9,color:sub}}>{hy>=m.hydrationTarget?"\u2713 Done":"Tap +1"}</div>
          </button>
          <button onClick={function(){go("exercises",k)}} style={{flex:1,background:exN>0?(dark?"#1a2e1a":"#F0FDF4"):(dark?"#333":"#f8f8f8"),border:"1.5px solid "+(exN>0?"#86EFAC":bdr),borderRadius:10,padding:"8px 4px",cursor:"pointer",textAlign:"center",color:fg}}>
            <div style={{fontSize:16}}>{"\u{1F3CB}\uFE0F"}</div>
            <div style={{fontSize:13,fontWeight:700,color:exN>0?"#16A34A":sub}}>{exN>0?"\u2713 Done":"Start"}</div>
            <div style={{fontSize:9,color:sub}}>{t("exercise")}</div>
          </button>
          <button onClick={function(){go("supplements",k)}} style={{flex:1,background:sdN>=m.supplements.length?(dark?"#1a2e1a":"#F0FDF4"):(dark?"#333":"#f8f8f8"),border:"1.5px solid "+(sdN>=m.supplements.length?"#86EFAC":bdr),borderRadius:10,padding:"8px 4px",cursor:"pointer",textAlign:"center",color:fg}}>
            <div style={{fontSize:16}}>{"\u{1F48A}"}</div>
            <div style={{fontSize:13,fontWeight:700,color:sdN>=m.supplements.length?"#16A34A":"#F59E0B"}}>{sdN}/{m.supplements.length}</div>
            <div style={{fontSize:9,color:sub}}>Supps</div>
          </button>
        </div>
      </div>);})}
    {/* Confetti celebration */}
    {(function(){var allDone2=true;Object.keys(F).forEach(function(k){var p=prog[k]||{};if((((p.exercises||{})[td]||{}).completed||[]).length===0)allDone2=false;if(((p.hydration||{})[td]||{}).bottles||0<F[k].hydrationTarget)allDone2=false;});return allDone2?<div style={{textAlign:"center",padding:16,fontSize:28,animation:"pulse 1s infinite"}}>{"\u{1F389}\u{1F38A}\u{1F525}"}<div style={{fontSize:14,fontWeight:700,color:"#16A34A",marginTop:4}}>{lang==="hi"?"\u0938\u092C\u0928\u0947 \u0906\u091C \u0915\u093E \u0932\u0915\u094D\u0937\u094D\u092F \u092A\u0942\u0930\u093E \u0915\u093F\u092F\u093E!":"Family goal complete today!"}</div></div>:null;})()}    {/* Family Accountability Button */}
    <button onClick={function(){go("family")}} style={{width:"100%",background:dark?"#1a2e3e":"#EFF6FF",border:"2px solid #3B82F6",borderRadius:14,padding:"14px 16px",cursor:"pointer",textAlign:"center",marginBottom:10,color:fg,display:"block"}}>
      <div style={{fontSize:22}}>{"\u{1F46A}"}</div>
      <div style={{fontSize:14,fontWeight:700,color:"#3B82F6",marginTop:4}}>{lang==="hi"?"\u092A\u0930\u093F\u0935\u093E\u0930 \u0938\u094D\u0915\u094B\u0930\u092C\u094B\u0930\u094D\u0921":"Family Scoreboard"}</div>
      <div style={{fontSize:11,color:sub}}>Who did what today? Side-by-side view</div>
    </button>
    <div style={{background:cbg,borderRadius:14,padding:16,marginTop:6,boxShadow:dark?"none":"0 1px 3px rgba(0,0,0,.06)"}}><div style={{fontSize:15,fontWeight:700,marginBottom:8}}>{"\u26A0\uFE0F"} Shared Family Patterns</div>{SHARED_PATTERNS.map(function(t2,i){return <div key={i} style={{fontSize:12,color:sub,padding:"3px 0",borderBottom:"1px solid "+(dark?"#333":"#f5f5f5"),lineHeight:1.5}}>{t2}</div>;})}</div>
  </div>);}

  /* ─── Profile ─── */
  function Prof(){var m=F[per],td=TK(),p=prog[per]||{};
    var exN=(((p.exercises||{})[td]||{}).completed||[]).length;
    var hy=((p.hydration||{})[td]||{}).bottles||0;
    var sdN=(((p.supplements||{})[td]||{}).taken||[]).length;
    var [showMore,setShowMore]=useState(false);
    var moreItems=[{id:"schedule",icon:"\u{1F550}",l:t("schedule")},{id:"donts",icon:"\u{1F6AB}",l:t("safety")},{id:"protein",icon:"\u{1F356}",l:t("protein")},{id:"tracking",icon:"\u{1F4CA}",l:t("progress")},{id:"medical",icon:"\u{1F3E5}",l:t("medical")}];
    return(<div style={scS}><button onClick={function(){go("dash")}} style={backS}>{"\u2190"} {t("dashboard")}</button>
      <div style={{textAlign:"center",paddingBottom:14,marginBottom:14,borderBottom:"3px solid "+m.color}}><span style={{fontSize:46}}>{m.emoji}</span><h2 style={{fontSize:26,fontWeight:800,margin:"6px 0 2px"}}>{m.name}</h2><div style={{fontSize:13,color:sub}}>{m.height} - {m.weight}kg - BMI {m.bmi}</div></div>
      {/* 3 Big Daily Action Cards */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
        <button onClick={function(){go("exercises")}} style={{background:exN>0?(dark?"#1a2e1a":"#F0FDF4"):cbg,border:"2px solid "+(exN>0?"#16A34A":bdr),borderRadius:14,padding:"16px 8px",cursor:"pointer",textAlign:"center",color:fg}}>
          <div style={{fontSize:28}}>{"\u{1F3CB}\uFE0F"}</div>
          <div style={{fontSize:14,fontWeight:700,color:exN>0?"#16A34A":fg,marginTop:4}}>{exN>0?"\u2713 Done":"Start"}</div>
          <div style={{fontSize:11,color:sub}}>{t("exercise")}</div>
        </button>
        <button onClick={function(){go("hydration")}} style={{background:hy>=m.hydrationTarget?(dark?"#1a2e1a":"#F0FDF4"):(dark?"#1a2a3e":"#EFF6FF"),border:"2px solid "+(hy>=m.hydrationTarget?"#16A34A":"#3B82F6"),borderRadius:14,padding:"16px 8px",cursor:"pointer",textAlign:"center",color:fg}}>
          <div style={{fontSize:28}}>{"\u{1F4A7}"}</div>
          <div style={{fontSize:14,fontWeight:700,color:hy>=m.hydrationTarget?"#16A34A":"#3B82F6",marginTop:4}}>{hy}/{m.hydrationTarget}L</div>
          <div style={{fontSize:11,color:sub}}>{t("water")}</div>
        </button>
        <button onClick={function(){go("supplements")}} style={{background:sdN>=m.supplements.length?(dark?"#1a2e1a":"#F0FDF4"):cbg,border:"2px solid "+(sdN>=m.supplements.length?"#16A34A":"#F59E0B"),borderRadius:14,padding:"16px 8px",cursor:"pointer",textAlign:"center",color:fg}}>
          <div style={{fontSize:28}}>{"\u{1F48A}"}</div>
          <div style={{fontSize:14,fontWeight:700,color:sdN>=m.supplements.length?"#16A34A":"#F59E0B",marginTop:4}}>{sdN}/{m.supplements.length}</div>
          <div style={{fontSize:11,color:sub}}>Supps</div>
        </button>
      </div>
      {/* Health snapshot */}
      <div style={{margin:"0 0 12px"}}><div style={{fontSize:10,fontWeight:600,color:sub,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t("health")}</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{m.healthIssues.map(function(h,i){return <div key={i} style={{background:sB(h.s),borderRadius:8,padding:"5px 10px",fontSize:12}}><span style={{color:"#666"}}>{h.l}:</span> <span style={{color:sC(h.s),fontWeight:700}}>{h.v}</span></div>;})}</div></div>
      {/* More section */}
      <button onClick={function(){setShowMore(!showMore)}} style={{width:"100%",padding:"14px",background:cbg,border:"1.5px solid "+bdr,borderRadius:12,cursor:"pointer",textAlign:"center",color:fg,fontSize:15,fontWeight:600,marginBottom:6}}>
        {showMore?"\u25B2 Less":"\u25BC More"} ({moreItems.length})
      </button>
      {showMore&&<div>{moreItems.map(function(item){return <button key={item.id} onClick={function(){go(item.id)}} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"14px 16px",background:cbg,border:"1px solid "+bdr,borderRadius:12,cursor:"pointer",marginBottom:6,textAlign:"left",color:fg}}><span style={{fontSize:22}}>{item.icon}</span><div style={{fontWeight:600,fontSize:15}}>{item.l}</div><span style={{marginLeft:"auto",color:sub,fontSize:18}}>{"\u203A"}</span></button>;})}</div>}
    </div>);}

  /* ─── Schedule ─── */
  function SchedV(){var m=F[per];return(<div style={scS}><button onClick={function(){go("profile")}} style={backS}>{"\u2190"} {m.name}</button><h2 style={secS}>{t("schedule")}</h2>{m.dailySchedule.map(function(item,i){var highlight=item.task.indexOf("\u2B50")>=0||item.task.indexOf("NON-NEGOTIABLE")>=0;return <div key={i} style={{display:"flex",gap:8,padding:"7px 4px",borderBottom:"1px solid "+(dark?"#333":"#f0f0f0"),background:highlight?(dark?"#3a3020":"#FEF3C7"):"transparent",borderRadius:highlight?8:0}}><span style={{fontSize:14}}>{item.icon}</span><div><div style={{fontSize:10,color:m.color,fontWeight:600}}>{item.time}</div><div style={{fontSize:12,lineHeight:1.4}}>{item.task}</div></div></div>;})}</div>);}

  /* ─── DON'Ts (Full with diet fixes, soreness guide, timeline) ─── */
  function DontsV(){var m=F[per];var univ=[{t:"NEVER hold breath during exercise - exhale on push/pull, inhale on release",i:"\u{1FAC1}"},{t:"NO training through sharp joint pain - muscle soreness OK, joint pain = STOP",i:"\u{1F6D1}"},{t:"NO skipping warm-up (5 min) or cool-down (5 min)",i:"\u23F1\uFE0F"},{t:"NO excess ghee cooking - triglycerides high for all 3",i:"\u{1F9C8}"},{t:"NO sugary chai - switch to no sugar / stevia / jaggery",i:"\u{1F375}"},{t:"NO skipping water - dehydration worsens kidney stones & all markers",i:"\u{1F4A7}"},{t:"NO carb-only breakfasts - MUST add protein every meal",i:"\u{1F373}"}];
    return(<div style={scS}><button onClick={function(){go("profile")}} style={backS}>{"\u2190"} {m.name}</button><h2 style={secS}>{t("safety")} ({m.donts.length})</h2><div style={{fontSize:12,color:"#DC2626",fontWeight:600,marginBottom:14}}>Read carefully. These protect your health.</div>
      {m.donts.map(function(d,i){return <div key={i} style={{display:"flex",gap:8,padding:"8px 10px",background:cbg,border:"1.5px solid #FCA5A5",borderRadius:10,marginBottom:4}}><span style={{fontSize:16}}>{d.i}</span><div style={{fontSize:12,lineHeight:1.5}}>{d.t}</div></div>;})}
      <div style={{marginTop:16,fontSize:10,fontWeight:600,color:"#DC2626",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Universal Family Rules</div>
      {univ.map(function(d,i){return <div key={i} style={{display:"flex",gap:8,padding:"8px 10px",background:dark?"#3a2020":"#FEF2F2",border:"1.5px solid #FCA5A5",borderRadius:10,marginBottom:4}}><span style={{fontSize:16}}>{d.i}</span><div style={{fontSize:12,color:dark?"#fca5a5":"#7F1D1D",lineHeight:1.5}}>{d.t}</div></div>;})}
      {/* Soreness vs Injury */}
      <div style={{marginTop:16,fontSize:10,fontWeight:600,color:sub,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t("sorenessVsInjury")}</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 140px",background:dark?"#1a2e1a":"#F0FDF4",border:"1.5px solid #16A34A33",borderRadius:12,padding:10}}><div style={{fontWeight:700,fontSize:12,color:"#16A34A",marginBottom:5}}>NORMAL (DOMS)</div>{["Dull ache across muscle","Peaks 24-48 hrs after","Gets better with movement","Safe to continue"].map(function(x,j){return <div key={j} style={{fontSize:11,lineHeight:1.5}}>{"\u00B7"} {x}</div>;})}</div>
        <div style={{flex:"1 1 140px",background:dark?"#2e1a1a":"#FEF2F2",border:"1.5px solid #DC262633",borderRadius:12,padding:10}}><div style={{fontWeight:700,fontSize:12,color:"#DC2626",marginBottom:5}}>INJURY - STOP</div>{["Sharp pain, specific spot","Especially joints","Gets WORSE with movement","Stop, rest, see doctor"].map(function(x,j){return <div key={j} style={{fontSize:11,lineHeight:1.5}}>{"\u00B7"} {x}</div>;})}</div>
      </div>
      {/* Diet Fixes */}
      <div style={{marginTop:16,fontSize:10,fontWeight:600,color:sub,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t("dietFixes")}</div>
      <div style={{background:dark?"#2e2a1a":"#FFFBEB",borderRadius:12,padding:12}}>{DIET_FIXES.map(function(x,i){return <div key={i} style={{padding:"6px 0",borderBottom:i<5?"1px solid "+(dark?"#555":"#FDE68A"):"none"}}><div style={{fontSize:11}}><span style={{color:"#DC2626",fontWeight:700}}>{"\u2717"} {x.b}</span></div><div style={{fontSize:11,color:"#166534",marginTop:1}}>{"\u2713"} {x.f}</div><div style={{fontSize:9,color:sub}}>{"\u2192"} {x.w}</div></div>;})}</div>
      {/* Timeline */}
      <div style={{marginTop:16,fontSize:10,fontWeight:600,color:sub,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t("timeline")}</div>
      <div style={{background:dark?"#1a2e1a":"#F0FDF4",borderRadius:12,padding:12}}>{TIMELINE.map(function(x,i){return <div key={i} style={{display:"flex",gap:8,padding:"4px 0"}}><div style={{width:7,height:7,borderRadius:"50%",background:x.c,marginTop:4,flexShrink:0}}/><div><span style={{fontWeight:700,fontSize:11,color:x.c}}>{x.w}:</span> <span style={{fontSize:11}}>{x.n}</span></div></div>;})}</div>
    </div>);}

  /* ─── Exercises (with warmup/cooldown, safety, day preview, progress bar, YouTube) ─── */
  function ExerV(){var m=F[per],td=TK();
    var [expanded,setExpanded]=useState(null);
    var [previewDay,setPreviewDay]=useState(null);
    var dn=previewDay||DN();
    var dayLabel=previewDay?["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][["sun","mon","tue","wed","thu","fri","sat"].indexOf(previewDay)]:DL();
    var isP=previewDay!==null;
    var comp=isP?[]:(((cp.exercises||{})[td]||{}).completed||[]);
    var tog=function(i){if(isP)return;var n=comp.indexOf(i)>=0?comp.filter(function(x){return x!==i;}):comp.concat([i]);upd(per,"exercises",td,{completed:n});};
    var exs=[],exT="",showWU=false;
    if(per==="yash"){if(["mon","wed","fri"].indexOf(dn)>=0){exT="Strength";showWU=true;var wd=EX.yash.str[wk]||EX.yash.str["week1-2"];var d=wd[dn];if(d==="mon")d=wd["mon"];exs=d||[];}else if(["tue","thu"].indexOf(dn)>=0){exT="Yoga";var yw=wk==="week1-2"?"week1-2":"week3-4";exs=(EX.yash.yoga[yw]||[]).map(function(y){return{n:y.n,s:1,r:y.d,e:y.desc};});}else if(dn==="sat"&&wk==="week4"){exT="HIIT";showWU=true;exs=(EX.yash.str["week4"]||{}).sat||[];}else{exT="Rest Day";}}
    else{var pk=per==="anil"?"f":"m";if(["mon","wed","fri"].indexOf(dn)>=0){exT="Walk+Strength";var wd2=EX.parents.str[wk]||EX.parents.str["week1-2"];exs=[{n:"Morning Walk (30 min)",s:1,r:"30 min",e:"Outdoor"}].concat(wd2[pk]||[]);}else if(["tue","thu","sat"].indexOf(dn)>=0){exT="Walk+Yoga";var yw2=wk==="week1-2"?"week1-2":"week3-4";exs=[{n:"Morning Walk (30 min)",s:1,r:"30 min",e:"Outdoor"}].concat((EX.parents.yoga[yw2]||[]).map(function(y){return{n:y.n,s:1,r:y.d,e:y.desc};}));}else{exT="Rest";exs=[{n:"Morning Walk (30 min)",s:1,r:"30 min",e:"Outdoor"}];}}
    var total=exs.length,done=comp.length,allDone=total>0&&done>=total;
    var markAll=function(){if(isP)return;if(allDone){upd(per,"exercises",td,{completed:[]});}else{upd(per,"exercises",td,{completed:Array.from({length:total},function(_,i){return i;})});}};
    var DAYS=[{k:"mon",l:"M"},{k:"tue",l:"T"},{k:"wed",l:"W"},{k:"thu",l:"Th"},{k:"fri",l:"F"},{k:"sat",l:"Sa"},{k:"sun",l:"Su"}];

    /* Habit toggles */
    var hab=((cp.habits||{})[td])||{};
    var togH=function(id){var o=Object.assign({},hab);o[id]=!hab[id];upd(per,"habits",td,o);};

    return(<div style={scS}><button onClick={function(){go("dash")}} style={backS}>{"\u2190"} {m.name}</button><h2 style={secS}>{isP?dayLabel+" "+t("preview"):t("exercises")}</h2>
      <div style={{fontSize:13,color:m.color,fontWeight:600,marginBottom:6}}>{dayLabel} - {exT}</div>
      {/* Day preview */}
      <div style={{display:"flex",gap:3,marginBottom:10}}><button onClick={function(){setPreviewDay(null)}} style={{border:"none",borderRadius:8,padding:"5px 8px",fontSize:10,cursor:"pointer",background:!previewDay?m.color:dark?"#333":"#f0f0f0",color:!previewDay?"#fff":fg}}>{t("today")}</button>{DAYS.map(function(d){var a=previewDay===d.k;return <button key={d.k} onClick={function(){setPreviewDay(d.k===DN()?null:d.k)}} style={{border:"none",borderRadius:8,padding:"5px 8px",fontSize:10,cursor:"pointer",minWidth:28,background:a?m.color:dark?"#333":"#f0f0f0",color:a?"#fff":fg}}>{d.l}</button>;})}</div>
      {/* Week selector */}
      <div style={{display:"flex",gap:5,marginBottom:12}}>{["week1-2","week3","week4"].map(function(w){return <button key={w} onClick={function(){setWk(w)}} style={{border:"none",borderRadius:8,padding:"5px 13px",fontSize:11,fontWeight:600,cursor:"pointer",background:wk===w?m.color:dark?"#333":"#f0f0f0",color:wk===w?"#fff":fg}}>{w==="week1-2"?"Wk 1-2":w==="week3"?"Wk 3":"Wk 4"}</button>;})}</div>
      {/* Progress bar */}
      {!isP&&total>0&&exT.indexOf("Rest")<0&&(<div style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontSize:11,fontWeight:600,color:allDone?"#16A34A":fg}}>{allDone?"\u{1F389} "+t("done")+"!":done+"/"+total}</span><button onClick={markAll} style={{background:"none",border:"1.5px solid "+(allDone?"#DC2626":m.color),borderRadius:8,padding:"3px 10px",fontSize:10,fontWeight:600,color:allDone?"#DC2626":m.color,cursor:"pointer"}}>{allDone?t("unmark"):t("markAll")}</button></div><div style={{height:6,background:dark?"#333":"#f0f0f0",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:(total>0?Math.round(done/total*100):0)+"%",background:allDone?"#16A34A":m.color,borderRadius:3,transition:"width .4s"}}/></div></div>)}
      {isP&&<div style={{background:dark?"#1a2a3e":"#EFF6FF",borderRadius:10,padding:"7px 12px",fontSize:11,color:"#1e40af",marginBottom:10}}>{t("preview")}: {dayLabel}</div>}
      {/* Safety warning */}
      {m.safetyWarn&&<div style={{background:dark?"#3a2020":"#FEF2F2",borderRadius:10,padding:"9px 12px",fontSize:11,color:dark?"#fca5a5":"#991B1B",marginBottom:10,lineHeight:1.5}}>{m.safetyWarn}</div>}
      {/* Warm-up */}
      {showWU&&per==="yash"&&<div style={{background:dark?"#2e2a1a":"#FFFBEB",borderRadius:10,padding:"9px 12px",fontSize:11,color:dark?"#fbbf24":"#92400E",marginBottom:10,lineHeight:1.6}}>{"\u{1F525}"} <strong>{t("warmup")} (5 min):</strong> {WU.join(" > ")}</div>}
      {/* Exercise list */}
      {exs.length===0?<div style={{padding:20,textAlign:"center",color:sub}}>{t("rest")}!</div>:exs.map(function(ex,i){var dn2=comp.indexOf(i)>=0;return(<div key={i} style={{marginBottom:4}}><div style={{display:"flex",alignItems:"center"}}><button onClick={function(){tog(i)}} style={{width:20,height:20,borderRadius:5,border:"2px solid "+(dn2?"#16A34A":"#ddd"),background:dn2?"#16A34A":"transparent",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0,cursor:"pointer",marginRight:10,opacity:isP?0.4:1}}>{dn2?"\u2713":""}</button><button onClick={function(){setExpanded(expanded===i?null:i)}} style={{display:"flex",alignItems:"center",gap:10,flex:1,padding:"9px 11px",border:"1.5px solid "+(dn2?"#86EFAC":bdr),borderRadius:10,cursor:"pointer",background:dn2?(dark?"#1a2e1a":"#F0FDF4"):cbg,textAlign:"left",color:fg}}><div style={{flex:1}}><div style={{fontWeight:600,fontSize:12,color:dn2?"#16A34A":fg,textDecoration:dn2?"line-through":"none"}}>{ex.n}</div><div style={{fontSize:10,color:sub,marginTop:1}}>{ex.s&&ex.r?ex.s+"x"+ex.r:""}{ex.e?" - "+ex.e:""}</div></div><span style={{fontSize:10,color:m.color}}>{expanded===i?"\u25B2":"\u25BC"}</span></button></div>
        {expanded===i&&(<div style={{background:dark?"#2a2a3e":"#f8fafc",border:"1.5px solid "+m.color+"22",borderRadius:"0 0 12px 12px",marginTop:-2,padding:"14px 12px"}}>{ex.e&&<div style={{fontSize:11,marginBottom:6}}>{t("equipment")}: {ex.e}</div>}{ex.s&&ex.r&&<div style={{fontSize:11,marginBottom:10}}>{ex.s} {t("sets")} x {ex.r}</div>}<a href={ytUrl(ex.n)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"10px 16px",background:"#FF0000",color:"#fff",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none"}}>{"\u25B6"} {t("watch")}</a></div>)}</div>);})}
      {/* Cool-down */}
      {showWU&&per==="yash"&&exs.length>0&&exT!=="Yoga"&&<div style={{background:dark?"#1a2a2e":"#F0F9FF",borderRadius:10,padding:"9px 12px",fontSize:11,color:dark?"#93c5fd":"#1e40af",marginTop:10,lineHeight:1.6}}>{"\u{1F9CA}"} <strong>{t("cooldown")} (5 min):</strong> {CD.join(" > ")}</div>}
      {/* Daily Habits */}
      {!isP&&<div style={{marginTop:16}}><div style={{fontSize:10,fontWeight:600,color:sub,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t("habits")}</div>
        {(F[per].habits||[]).map(function(h){var done2=hab[h.id];return <button key={h.id} onClick={function(){togH(h.id)}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 11px",border:"1.5px solid "+(done2?"#86EFAC":bdr),borderRadius:10,cursor:"pointer",marginBottom:4,background:done2?(dark?"#1a2e1a":"#F0FDF4"):cbg,textAlign:"left",color:fg}}><div style={{width:20,height:20,borderRadius:5,border:"2px solid "+(done2?"#16A34A":"#ddd"),background:done2?"#16A34A":"transparent",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>{done2?"\u2713":""}</div><div style={{fontSize:12,fontWeight:500,color:done2?"#16A34A":fg}}>{h.l}</div></button>;})}
        {/* Habit Streaks */}
        <div style={{marginTop:10,fontSize:10,fontWeight:600,color:sub,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t("streaks")}</div>
        {(F[per].habits||[]).map(function(h){var days=hist7(cp,"habits");var streak=0;for(var si=6;si>=0;si--){if((days[si].val||{})[h.id])streak++;else break;}return <div key={h.id} style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:11}}>{h.l.substring(0,25)}{h.l.length>25?"...":""}</span>{streak>0&&<span style={{fontSize:9,color:"#EA580C",fontWeight:700}}>{"\u{1F525}"}{streak}d</span>}</div><div style={{display:"flex",gap:2}}>{days.map(function(d,di){var done3=(d.val||{})[h.id];return <div key={di} style={{flex:1,textAlign:"center",padding:"3px 0",borderRadius:4,background:done3?(dark?"#1a2e1a":"#F0FDF4"):(dark?"#2a2a3e":"#f8f8f8"),border:d.isToday?"1.5px solid #16A34A":"1px solid transparent"}}><div style={{fontSize:11}}>{done3?"\u2705":"\u2B1C"}</div><div style={{fontSize:7,color:sub}}>{d.dayName}</div></div>;})}</div></div>;})}
      </div>}
    </div>);}

  /* ─── Hydration (with weekly chart) ─── */
  function HydraV(){var m=F[per],td=TK(),hyd=((cp.hydration||{})[td])||{bottles:0},tgt=m.hydrationTarget;var setB=function(n){upd(per,"hydration",td,{bottles:n});};var week=hist7(cp,"hydration");
    return(<div style={scS}><button onClick={function(){go("dash")}} style={backS}>{"\u2190"} {m.name}</button><h2 style={secS}>{t("hydration")}</h2>
      <div style={{fontSize:13}}>{t("target")}: <strong>{tgt}L</strong></div><div style={{fontSize:11,color:m.color,marginBottom:14}}>{m.hydrationTip}</div>
      <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:18}}>{Array.from({length:tgt},function(_,i){return <button key={i} onClick={function(){setB(i+1===hyd.bottles?i:i+1)}} style={{border:"2px solid "+(i<hyd.bottles?"#3B82F6":dark?"#444":"#e0e0e0"),borderRadius:14,padding:"10px 6px",cursor:"pointer",background:i<hyd.bottles?(dark?"#1e3a5f":"#DBEAFE"):(dark?"#2a2a3e":"#f8f8f8"),width:75,textAlign:"center"}}><div style={{fontSize:32,opacity:i<hyd.bottles?1:0.3}}>{i<hyd.bottles?"\u{1F4A7}":"\u{1FAD7}"}</div><div style={{fontSize:11,fontWeight:600,color:i<hyd.bottles?"#2563EB":"#bbb"}}>{i+1}L</div></button>;})}</div>
      <div style={{textAlign:"center",marginBottom:14}}><span style={{fontSize:42,fontWeight:800,color:hyd.bottles>=tgt?"#16A34A":"#3B82F6"}}>{hyd.bottles||0}</span><span style={{fontSize:18,color:sub}}> / {tgt}L</span>{hyd.bottles>=tgt&&<div style={{color:"#16A34A",fontSize:12}}>{t("target")} reached!</div>}</div>
      {/* Weekly chart */}
      <div style={{fontSize:10,fontWeight:600,color:sub,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t("weekHistory")}</div>
      <div style={{display:"flex",gap:3}}>{week.map(function(d,i){var b=(d.val||{}).bottles||0;return <div key={i} style={{flex:1,textAlign:"center"}}><div style={{height:45,display:"flex",alignItems:"flex-end",justifyContent:"center"}}><div style={{width:"65%",borderRadius:"3px 3px 0 0",height:Math.max(b/tgt*100,4)+"%",background:b>=tgt?"#3B82F6":b>0?"#93C5FD":(dark?"#333":"#eee"),transition:"height .3s"}}/></div><div style={{fontSize:8,color:d.isToday?"#3B82F6":sub,fontWeight:d.isToday?700:400,marginTop:2}}>{d.dayName}</div></div>;})}</div>
    </div>);}

  /* ─── Supplements (with weekly chart) ─── */
  function SuppsV(){var m=F[per],td=TK(),sup=((cp.supplements||{})[td])||{taken:[]};var tog=function(i){var n=sup.taken.indexOf(i)>=0?sup.taken.filter(function(x){return x!==i;}):sup.taken.concat([i]);upd(per,"supplements",td,{taken:n});};var sL={taking:"Taking",start:"Start!",buy:"Buy!","switch":"Switch!"};var week=hist7(cp,"supplements");
    return(<div style={scS}><button onClick={function(){go("dash")}} style={backS}>{"\u2190"} {m.name}</button><h2 style={secS}>{t("supplements")}</h2>
      {m.supplements.map(function(s,i){var dn=sup.taken.indexOf(i)>=0;return <button key={i} onClick={function(){tog(i)}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 11px",border:"1.5px solid "+(dn?"#86EFAC":bdr),borderRadius:10,cursor:"pointer",marginBottom:4,background:dn?(dark?"#1a2e1a":"#F0FDF4"):cbg,textAlign:"left",color:fg}}><div style={{width:20,height:20,borderRadius:5,border:"2px solid "+(dn?"#16A34A":"#ddd"),background:dn?"#16A34A":"transparent",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>{dn?"\u2713":""}</div><div style={{flex:1}}><div style={{fontWeight:600,fontSize:12}}>{s.icon} {s.name}</div><div style={{fontSize:10,color:sub}}>{s.freq}</div><div style={{fontSize:10,color:m.color}}>{s.when}</div></div><span style={{fontSize:8,fontWeight:700,color:sC(s.status),background:sB(s.status),padding:"2px 7px",borderRadius:5,textTransform:"uppercase"}}>{sL[s.status]||s.status}</span></button>;})}
      {per==="anil"&&<div style={{background:dark?"#3a2020":"#FEF2F2",borderRadius:10,padding:"9px 12px",fontSize:11,color:dark?"#fca5a5":"#991B1B",marginTop:10}}>{"\u26A0\uFE0F"} <strong>Neurobion Forte only has 15mcg B12.</strong> Your B12 is 107 (CRITICAL). Need 1500mcg methylcobalamin or injections.</div>}
      {/* Weekly chart */}
      <div style={{marginTop:14,fontSize:10,fontWeight:600,color:sub,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{t("weekHistory")}</div>
      <div style={{display:"flex",gap:4}}>{week.map(function(d,i){var n=(d.val||{}).taken?d.val.taken.length:0;return <div key={i} style={{flex:1,textAlign:"center",padding:"4px 0",borderRadius:6,background:n>=m.supplements.length?(dark?"#1a2e1a":"#F0FDF4"):n>0?(dark?"#2e2a1a":"#FFFBEB"):(dark?"#2a2a3e":"#f8f8f8")}}><div style={{fontSize:13}}>{n>=m.supplements.length?"\u2705":n>0?"\u{1F7E1}":"\u2B1C"}</div><div style={{fontSize:7,color:d.isToday?"#16A34A":sub}}>{d.dayName}</div></div>;})}</div>
    </div>);}

  /* ─── Progress Tracking (weight + milestones + habit streaks) ─── */
  function TrackV(){var m=F[per],td=TK(),met=cp.metrics||{};var [wi,setWi]=useState("");var [mi,setMi]=useState({});
    var logW=function(){var w=parseFloat(wi);if(!isNaN(w)&&w>20&&w<200){upd(per,"metrics",td,Object.assign({},met[td]||{},{weight:w}));setWi("");}};
    var logM=function(k){var v=parseFloat(mi[k]);if(!isNaN(v)){upd(per,"metrics",td,Object.assign({},met[td]||{},function(){var o={};o[k]=v;return o;}()));setMi(function(p){var o=Object.assign({},p);o[k]="";return o;});}};
    return(<div style={scS}><button onClick={function(){go("profile")}} style={backS}>{"\u2190"} {m.name}</button><h2 style={secS}>{t("progress")}</h2>
      {/* Weight */}
      <div style={{background:cbg,borderRadius:14,padding:14,marginBottom:10,boxShadow:dark?"none":"0 1px 3px rgba(0,0,0,.06)"}}><div style={{fontSize:13,fontWeight:700,marginBottom:6}}>{"\u2696\uFE0F"} {t("weight")}</div><div style={{fontSize:10,color:sub,marginBottom:6}}>{t("target")}: <strong style={{color:m.color}}>{m.weightTarget}</strong></div><div style={{display:"flex",gap:6}}><input type="number" placeholder="kg" value={wi} onChange={function(e){setWi(e.target.value)}} style={{flex:1,padding:"6px 10px",border:"1.5px solid "+(dark?"#444":"#ddd"),borderRadius:8,fontSize:13,outline:"none",background:dark?"#2a2a3e":"#fff",color:fg}}/><button onClick={logW} style={{border:"none",color:"#fff",background:m.color,borderRadius:8,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t("log")}</button></div>{met[td]&&met[td].weight&&<div style={{fontSize:11,color:"#16A34A",marginTop:4}}>Today: {met[td].weight}kg</div>}</div>
      {/* Milestones */}
      <div style={{background:cbg,borderRadius:14,padding:14,marginBottom:10,boxShadow:dark?"none":"0 1px 3px rgba(0,0,0,.06)"}}><div style={{fontSize:13,fontWeight:700,marginBottom:6}}>{"\u{1F3CB}\uFE0F"} Exercise Milestones</div>
        {(F[per].milestones||[]).map(function(f){return <div key={f.k} style={{marginBottom:10}}><div style={{fontSize:11,marginBottom:3}}>{f.i} {f.l}</div><div style={{display:"flex",gap:6}}><input type="number" placeholder="#" value={mi[f.k]||""} onChange={function(e){setMi(function(p){var o=Object.assign({},p);o[f.k]=e.target.value;return o;})}} style={{flex:1,padding:"6px 10px",border:"1.5px solid "+(dark?"#444":"#ddd"),borderRadius:8,fontSize:13,outline:"none",background:dark?"#2a2a3e":"#fff",color:fg}}/><button onClick={function(){logM(f.k)}} style={{border:"none",color:"#fff",background:m.color,borderRadius:8,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t("log")}</button></div>{met[td]&&met[td][f.k]&&<div style={{fontSize:10,color:"#16A34A",marginTop:3}}>Today: {met[td][f.k]}</div>}
          <div style={{display:"flex",gap:3,marginTop:4}}>{Array.from({length:7}).map(function(_,i){var dk=dKey(6-i);var v=met[dk]?met[dk][f.k]:null;return <div key={i} style={{flex:1,textAlign:"center",fontSize:9,padding:"2px 0",background:v?(dark?"#1a2e1a":"#F0FDF4"):(dark?"#2a2a3e":"#f8f8f8"),borderRadius:3}}>{v||"-"}</div>;})}</div></div>;})}
      </div>
    </div>);}

  /* ─── Medical ─── */
  function MedV(){var m=F[per],md=((cp.habits||{}).medical)||{};var togM=function(i){var o=Object.assign({},md);o["m"+i]=!md["m"+i];upd(per,"habits","medical",o);};
    var rt={yash:["Lipid profile (triglycerides)","Urine routine (oxalate crystals)","Serum ferritin","Vitamin D, B12, CBC"],anil:["Vitamin B12 (improve from 107)","Lipid profile","Urine routine","Kidney stone ultrasound","Vitamin D, CBC"],savita:["HbA1c (improve from 6.90%)","Fasting glucose","Urine microalbumin","Lipid profile","Serum ferritin","Vitamin D, B12, CBC"]};
    return(<div style={scS}><button onClick={function(){go("profile")}} style={backS}>{"\u2190"} {m.name}</button><h2 style={secS}>{t("medical")}</h2>
      <div style={{fontSize:10,fontWeight:600,color:"#DC2626",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Pending Doctor Visits</div>
      {m.medicalActions.map(function(a,i){var dn=md["m"+i];return <button key={i} onClick={function(){togM(i)}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 11px",border:"1.5px solid "+(dn?"#86EFAC":"#FECACA"),borderRadius:10,cursor:"pointer",marginBottom:4,background:dn?(dark?"#1a2e1a":"#F0FDF4"):(dark?"#3a2020":"#FEF2F2"),textAlign:"left",color:fg}}><div style={{width:20,height:20,borderRadius:5,border:"2px solid "+(dn?"#16A34A":"#ddd"),background:dn?"#16A34A":"transparent",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>{dn?"\u2713":""}</div><div style={{fontSize:11,textDecoration:dn?"line-through":"none"}}>{a}</div></button>;})}
      <div style={{marginTop:16,fontSize:10,fontWeight:600,color:"#2563EB",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>3-Month Retests</div>
      <div style={{background:dark?"#1a2a3e":"#EFF6FF",borderRadius:12,padding:12,fontSize:11,lineHeight:1.7}}>{(rt[per]||[]).map(function(t2,i){return <div key={i}>{"\u2022"} {t2}</div>;})}</div>
      <div style={{marginTop:16,fontSize:10,fontWeight:600,color:"#7C3AED",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>6-Month Weight Target</div>
      <div style={{background:dark?"#2a1a3e":"#F5F3FF",borderRadius:12,padding:12,fontSize:13}}>Current {"\u2192"} Target: <strong style={{color:m.color}}>{m.weight} {"\u2192"} {m.weightTarget}</strong></div>
    </div>);}

  /* ─── Family Accountability View ─── */
  function FamilyV(){var td=TK();
    var stats=Object.keys(F).map(function(k){
      var m=F[k],p=prog[k]||{};
      var exN=(((p.exercises||{})[td]||{}).completed||[]).length;
      var hy=((p.hydration||{})[td]||{}).bottles||0;
      var sdN=(((p.supplements||{})[td]||{}).taken||[]).length;
      var stot=m.supplements.length;
      var habDone=0,habTotal=(m.habits||[]).length;
      var habData=((p.habits||{})[td])||{};
      (m.habits||[]).forEach(function(h){if(habData[h.id])habDone++;});
      var proteinMeals=((p.meals||{})[td])||[];
      var proteinTotal=0;proteinMeals.forEach(function(ml){proteinTotal+=ml.p;});
      var pTarget=PTARGETS[k]||60;
      /* 7-day exercise streak */
      var exStreak=0;for(var si=0;si<7;si++){var dk=dKey(si);if((((p.exercises||{})[dk]||{}).completed||[]).length>0)exStreak++;else break;}
      var score=0,total=4;
      if(exN>0)score++;if(hy>=m.hydrationTarget)score++;if(sdN>=stot)score++;if(habDone>=habTotal&&habTotal>0)score++;
      return{k:k,m:m,exN:exN,hy:hy,ht:m.hydrationTarget,sdN:sdN,stot:stot,habDone:habDone,habTotal:habTotal,proteinTotal:proteinTotal,pTarget:pTarget,exStreak:exStreak,score:score,total:total};
    });
    /* Family streak: days where ALL 3 did exercise */
    var famStreak=0;for(var fi=0;fi<30;fi++){var dk2=dKey(fi);var allDid=true;Object.keys(F).forEach(function(k){var ec=(((prog[k]||{}).exercises||{})[dk2]||{}).completed;if(!ec||ec.length===0)allDid=false;});if(allDid)famStreak++;else break;}

    return(<div style={scS}>
      <button onClick={function(){go("dash")}} style={backS}>{"\u2190"} {t("dashboard")}</button>
      <h2 style={secS}>{"\u{1F46A}"} {lang==="hi"?"\u092A\u0930\u093F\u0935\u093E\u0930 \u0938\u094D\u0915\u094B\u0930\u092C\u094B\u0930\u094D\u0921":"Family Scoreboard"}</h2>
      <div style={{fontSize:11,color:sub,marginBottom:14}}>{lang==="hi"?"\u0906\u091C \u0915\u093F\u0938\u0928\u0947 \u0915\u094D\u092F\u093E \u0915\u093F\u092F\u093E?":"Who did what today?"}</div>

      {famStreak>0&&<div style={{background:dark?"#2e1a1a":"#FEF2F2",borderRadius:10,padding:"8px 14px",marginBottom:12,fontSize:12,fontWeight:600,textAlign:"center",color:"#EA580C"}}>{"\u{1F525}"} Family streak: All 3 exercised {famStreak} day{famStreak>1?"s":""}!</div>}

      {/* Side by side cards */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:16}}>
        {stats.map(function(s){var pct=Math.round(s.score/s.total*100);return(
          <div key={s.k} style={{background:cbg,borderRadius:12,padding:"10px 8px",borderTop:"3px solid "+s.m.color,textAlign:"center"}}>
            <div style={{fontSize:28}}>{s.m.emoji}</div>
            <div style={{fontSize:12,fontWeight:700,marginTop:2}}>{s.m.name}</div>
            <div style={{fontSize:24,fontWeight:800,color:pct===100?"#16A34A":s.m.color,marginTop:4}}>{pct}%</div>
            <div style={{fontSize:8,color:sub}}>{s.score}/{s.total} done</div>
          </div>
        );})}
      </div>

      {/* Detailed comparison */}
      {[{label:"\u{1F3CB}\uFE0F "+t("exercise"),fn:function(s){return s.exN>0;}},
        {label:"\u{1F4A7} "+t("water"),fn:function(s){return s.hy>=s.ht;}},
        {label:"\u{1F48A} Supplements",fn:function(s){return s.sdN>=s.stot;}},
        {label:"\u{1F6B6} "+t("habits"),fn:function(s){return s.habDone>=s.habTotal&&s.habTotal>0;}}
      ].map(function(cat,ci){return(
        <div key={ci} style={{marginBottom:10}}>
          <div style={{fontSize:11,fontWeight:600,color:sub,marginBottom:4}}>{cat.label}</div>
          <div style={{display:"flex",gap:6}}>
            {stats.map(function(s){var ok=cat.fn(s);return(
              <div key={s.k} style={{flex:1,background:ok?(dark?"#1a2e1a":"#F0FDF4"):(dark?"#2e1a1a":"#FEF2F2"),borderRadius:8,padding:"6px 4px",textAlign:"center",border:"1px solid "+(ok?"#86EFAC":"#FECACA")}}>
                <div style={{fontSize:16}}>{ok?"\u2705":"\u274C"}</div>
                <div style={{fontSize:9,color:sub,marginTop:2}}>{s.m.name.split(" ")[0]}</div>
              </div>
            );})}
          </div>
        </div>
      );})}

      {/* Protein comparison */}
      <div style={{marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:600,color:sub,marginBottom:4}}>{"\u{1F356}"} {t("protein")}</div>
        <div style={{display:"flex",gap:6}}>
          {stats.map(function(s){var pct2=Math.min(Math.round(s.proteinTotal/s.pTarget*100),100);return(
            <div key={s.k} style={{flex:1,background:cbg,borderRadius:8,padding:"6px 4px",textAlign:"center",border:"1px solid "+bdr}}>
              <div style={{fontSize:14,fontWeight:700,color:pct2>=100?"#16A34A":s.m.color}}>{s.proteinTotal}g</div>
              <div style={{height:4,background:dark?"#333":"#eee",borderRadius:2,overflow:"hidden",margin:"4px 2px"}}><div style={{height:"100%",width:pct2+"%",background:pct2>=100?"#16A34A":s.m.color,borderRadius:2}}/></div>
              <div style={{fontSize:8,color:sub}}>/{s.pTarget}g</div>
            </div>
          );})}
        </div>
      </div>

      {/* Exercise streaks */}
      <div style={{marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:600,color:sub,marginBottom:4}}>{"\u{1F525}"} Exercise Streak (days)</div>
        <div style={{display:"flex",gap:6}}>
          {stats.map(function(s){return(
            <div key={s.k} style={{flex:1,background:cbg,borderRadius:8,padding:"8px 4px",textAlign:"center",border:"1px solid "+bdr}}>
              <div style={{fontSize:20,fontWeight:800,color:s.exStreak>0?"#EA580C":sub}}>{s.exStreak}</div>
              <div style={{fontSize:9,color:sub}}>{s.m.name.split(" ")[0]}</div>
            </div>
          );})}
        </div>
      </div>

      {/* Motivational nudge */}
      <div style={{background:dark?"#2e2a1a":"#FFFBEB",borderRadius:12,padding:12,marginTop:8,fontSize:12,color:dark?"#fbbf24":"#92400E",textAlign:"center",lineHeight:1.5}}>
        {stats.filter(function(s){return s.score<s.total;}).length===0?"\u{1F389} Perfect day! All 3 members completed everything!":
         stats.filter(function(s){return s.exN===0;}).map(function(s){return s.m.name;}).length>0?
         stats.filter(function(s){return s.exN===0;}).map(function(s){return s.m.name;}).join(" & ")+" - exercise abhi bhi baaki hai! Let's go! \u{1F4AA}":
         "Almost there! Keep pushing, family! \u{1F525}"}
      </div>
    </div>);}

  /* ─── Protein / Meal Tracker ─── */
  function ProteinV(){var m=F[per],td=TK(),tgt=PTARGETS[per]||60;
    var meals=((cp.meals||{})[td])||[];
    var totalP=0;meals.forEach(function(ml){totalP+=ml.p;});
    var pct=Math.min(Math.round(totalP/tgt*100),100);
    var [showFoods,setShowFoods]=useState(false);
    var addFood=function(food){
      var newMeals=meals.concat([{name:food.name,p:food.p,time:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}]);
      upd(per,"meals",td,newMeals);
      setShowFoods(false);
    };
    var removeFood=function(idx){
      var newMeals=meals.filter(function(_,i){return i!==idx;});
      upd(per,"meals",td,newMeals);
    };
    return(<div style={scS}>
      <button onClick={function(){go("profile")}} style={backS}>{"\u2190"} {m.name}</button>
      <h2 style={secS}>{"\u{1F356}"} {t("protein")} Tracker</h2>
      {/* Progress circle */}
      <div style={{textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:48,fontWeight:800,color:totalP>=tgt?"#16A34A":m.color}}>{totalP}g</div>
        <div style={{fontSize:13,color:sub}}>/ {tgt}g {t("target")}</div>
        <div style={{height:8,background:dark?"#333":"#f0f0f0",borderRadius:4,overflow:"hidden",marginTop:8,maxWidth:300,margin:"8px auto 0"}}>
          <div style={{height:"100%",width:pct+"%",background:totalP>=tgt?"#16A34A":m.color,borderRadius:4,transition:"width .4s"}}/>
        </div>
        {totalP>=tgt&&<div style={{color:"#16A34A",fontSize:12,marginTop:6,fontWeight:600}}>{"\u{1F389}"} {t("target")} reached!</div>}
        {totalP<tgt&&<div style={{fontSize:11,color:sub,marginTop:6}}>{tgt-totalP}g more needed today</div>}
      </div>
      {/* Today's meals */}
      <div style={{fontSize:10,fontWeight:600,color:sub,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{lang==="hi"?"\u0906\u091C \u0915\u093E \u092D\u094B\u091C\u0928":"Today's Meals"}</div>
      {meals.length===0&&<div style={{padding:16,textAlign:"center",color:sub,fontSize:12}}>No meals logged yet. Tap + to add food.</div>}
      {meals.map(function(ml,i){return(
        <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:cbg,border:"1px solid "+bdr,borderRadius:10,marginBottom:4}}>
          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:500}}>{ml.name}</div><div style={{fontSize:10,color:sub}}>{ml.time}</div></div>
          <div style={{fontSize:13,fontWeight:700,color:m.color}}>+{ml.p}g</div>
          <button onClick={function(){removeFood(i)}} style={{background:"none",border:"none",color:"#DC2626",fontSize:16,cursor:"pointer",padding:"0 4px"}}>{"\u2715"}</button>
        </div>
      );})}
      {/* Add button */}
      <button onClick={function(){setShowFoods(!showFoods)}} style={{width:"100%",padding:"12px",background:m.color,color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",marginTop:8}}>{showFoods?"\u2715 Close":"+ "+t("addMeal")}</button>
      {/* Food grid */}
      {showFoods&&<div style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
        {FOODS.map(function(food,i){
          var isNV=food.name.indexOf("Egg")>=0||food.name.indexOf("Chicken")>=0;
          if(per!=="anil"&&isNV&&food.name.indexOf("Chicken")>=0)return null;
          if(per==="savita"&&isNV)return null;
          return <button key={i} onClick={function(){addFood(food)}} style={{padding:"10px 8px",background:cbg,border:"1.5px solid "+bdr,borderRadius:10,cursor:"pointer",textAlign:"left",color:fg}}>
            <div style={{fontSize:14}}>{food.emoji}</div>
            <div style={{fontSize:11,fontWeight:600,marginTop:2}}>{food.name}</div>
            <div style={{fontSize:10,color:m.color,fontWeight:700}}>+{food.p}g protein</div>
          </button>;
        })}
      </div>}
      {/* Quick tips */}
      <div style={{marginTop:16,background:dark?"#2e2a1a":"#FFFBEB",borderRadius:12,padding:12,fontSize:11,color:dark?"#fbbf24":"#92400E",lineHeight:1.6}}>
        <strong>{"\u{1F4A1}"} Tips:</strong> {per==="yash"?"You need ~130g/day. Whey shake (50g) + paneer lunch (18g) + dal dinner (7g) + milk (8g) + curd (8g) = ~91g. Add sprouts or eggs to close the gap!":per==="anil"?"Target 70g/day. Dal (7g) + 2 eggs (12g) + curd (8g) + milk (8g) + chicken 2x/week (25g) gets you close. Add paneer on veg days.":"Target 60g/day. Protein powder 2x (30g) + dal (7g) + curd (8g) + milk (8g) + paneer (18g) = ~71g. You can do it!"}
      </div>
    </div>);}
}
