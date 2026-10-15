/* EnEmirati: English → Emirati Arabic, written in Arabizi and in Arabic script.
   A word list plus grammar rules. No AI and no network. */
(function (root) {
  'use strict';

  const sp = (s) => (s === '-' || s == null ? '' : String(s).replace(/_/g, ' '));
  const P8 = ['1s', '2m', '2f', '2p', '3m', '3f', '1p', '3p'];
  function pair(spec) { const k = spec.indexOf('|'); return k < 0 ? [spec, ''] : [spec.slice(0, k), spec.slice(k + 1)]; }

  /* ====================================================================== */
  /*  Word lists                                                             */
  /* ====================================================================== */

  /* Nouns: "singular plural gender|singular plural". gender m, f, mh (male person), fh (female person). "_" is a space. */
  const NOUN_RAW = {
    game: "lu3ba al3aab f|لعبة ألعاب", experience: "5ibra 5ibraat f|خبرة خبرات", person: "sha59 naas mh|شخص ناس",
    man: "rayyal rayaayeel mh|ريال رياييل", woman: "7urma 7areem fh|حرمة حريم", boy: "walad 3iyaal mh|ولد عيال",
    girl: "bnayya banaat fh|بنية بنات", child: "yaahil yahhaal mh|ياهل ياهال", friend: "rabee3 rab3 mh|ربيع ربع",
    brother: "a5 5waan mh|أخ خوان", sister: "u5t 5awaat fh|أخت خوات", father: "ubu aabaa2 mh|أبو آباء",
    mother: "umm ummahaat fh|أم أمهات", family: "ahal ahal m|أهل أهل", son: "walad 3iyaal mh|ولد عيال",
    daughter: "bint banaat fh|بنت بنات", home: "bait byoot m|بيت بيوت", house: "bait byoot m|بيت بيوت",
    room: "room roomaat m|روم رومات", bedroom: "3'urfa 3'uraf f|غرفة غرف", school: "madrasa madaaris f|مدرسة مدارس", university: "jaam3a jaam3aat f|جامعة جامعات",
    work: "shu3'ul ash3'aal m|شغل أشغال", job: "wa6'eefa wa6'aayif f|وظيفة وظايف", office: "maktab makaatib m|مكتب مكاتب",
    car: "sayyara sayyaraat f|سيارة سيارات", phone: "tilifoon tilifoonaat m|تيلفون تيلفونات",
    computer: "computer computeraat m|كمبيوتر كمبيوترات", laptop: "laptop laptopaat m|لابتوب لابتوبات",
    video: "video videohaat m|فيديو فيديوهات", money: "floos floos f|فلوس فلوس", time: "wagt awgaat m|وقت أوقات",
    day: "yoom ayyaam m|يوم أيام", night: "lail layaali m|ليل ليالي", morning: "9ub7 9ub7 m|صبح صبح",
    evening: "masa masa m|مسا مسا", week: "isboo3 asaabee3 m|أسبوع أسابيع", month: "shahar shuhoor m|شهر شهور",
    year: "sana sneen f|سنة سنين", hour: "saa3a saa3aat f|ساعة ساعات", minute: "dageega dagaayig f|دقيقة دقايق",
    second: "thaanya thawaani f|ثانية ثواني", food: "akil akil m|أكل أكل", water: "maay maay m|ماي ماي",
    coffee: "gahwa gahwa f|قهوة قهوة", tea: "chaay chaay m|چاي چاي", name: "isim asaami m|اسم أسامي",
    thing: "shay ashyaa2 m|شي أشياء", problem: "mushkila mashaakil f|مشكلة مشاكل", question: "su2aal as2ila m|سؤال أسئلة",
    answer: "jawaab ajwiba m|جواب أجوبة", idea: "fikra afkaar f|فكرة أفكار", way: "6areega 6urug f|طريقة طرق",
    road: "6areeg 6urug m|طريق طرق", street: "shaari3 shawaari3 m|شارع شوارع", place: "makaan amaakin m|مكان أماكن",
    city: "madeena mudun f|مدينة مدن", country: "balad buldaan m|بلد بلدان", world: "dinya dinya f|دنيا دنيا",
    life: "7ayaa 7ayaa f|حياة حياة", love: "7ubb 7ubb m|حب حب", language: "lu3'a lu3'aat f|لغة لغات",
    word: "kilma kilmaat f|كلمة كلمات", translation: "tarjama tarjamaat f|ترجمة ترجمات", synonym: "muraadif muraadifaat m|مرادف مرادفات",
    translator: "mutarjim mutarjimeen m|مترجم مترجمين", abbreviation: "i5ti9aar i5ti9aaraat m|اختصار اختصارات", meaning: "ma3na ma3aani m|معنى معاني",
    sentence: "jumla jumal f|جملة جمل", grammar: "grammar grammar m|قرامر قرامر", spelling: "spelling spelling m|سبيلنق سبيلنق", dialect: "lahja lahjaat f|لهجة لهجات", skill: "mahaara mahaaraat f|مهارة مهارات",
    project: "mashroo3 mashaaree3 m|مشروع مشاريع", program: "barnaamij baraamij m|برنامج برامج", app: "ta6beeg ta6beegaat m|تطبيق تطبيقات",
    file: "malaff malaffaat m|ملف ملفات", picture: "9oora 9iwar f|صورة صور", message: "risaala rasaayil f|رسالة رسايل",
    email: "email emailaat m|إيميل إيميلات", website: "mawgi3 mawaagi3 m|موقع مواقع", internet: "internet internet m|إنترنت إنترنت",
    character: "sha59iyya sha59iyyaat f|شخصية شخصيات", level: "level levelaat m|لفل لفلات", weapon: "sila7 asli7a m|سلاح أسلحة",
    sword: "saif syoof m|سيف سيوف", monster: "wa7sh w7oosh m|وحش وحوش", enemy: "3adu a3daa2 mh|عدو أعداء",
    team: "fareeg firag m|فريق فرق", player: "laa3ib laa3ibeen mh|لاعب لاعبين", server: "server serveraat m|سيرفر سيرفرات",
    account: "7saab 7saabaat m|حساب حسابات", password: "password passwordaat m|باسورد باسوردات", key: "miftaa7 mafaatee7 m|مفتاح مفاتيح",
    door: "baab abwaab m|باب أبواب", window: "window windows m|ويندو ويندوز", book: "kitaab kutub m|كتاب كتب",
    pen: "galam aglaam m|قلم أقلام", table: "6aawla 6aawlaat f|طاولة طاولات", chair: "kirsi karaasi m|كرسي كراسي",
    bed: "sireer saraayir m|سرير سراير", tv: "tilifizyoon tilifizyoonaat m|تلفزيون تلفزيونات", movie: "film aflaam m|فيلم أفلام",
    music: "museega museega f|موسيقى موسيقى", song: "a3'niya a3'aani f|أغنية أغاني", voice: "9oot a9waat m|صوت أصوات",
    story: "gi99a gi9a9 f|قصة قصص", news: "a5baar a5baar f|أخبار أخبار", weather: "jaw jaw m|جو جو",
    sea: "ba7ar b7aar m|بحر بحار", sun: "shams shams f|شمس شمس", rain: "ma6ar am6aar m|مطر أمطار",
    dog: "chalb chlaab m|چلب چلاب", cat: "gu66wa gu66 f|قطوة قطط", horse: "7i9aan 7i9in m|حصان حصن",
    camel: "ba3eer bi3raan m|بعير بعران", animal: "7aiwaan 7aiwaanaat m|حيوان حيوانات", hand: "eed eedain f|إيد إيدين",
    eye: "3ain 3yoon f|عين عيون", head: "raas roos m|راس روس", heart: "galb gloob m|قلب قلوب",
    doctor: "da5tar da5aatir mh|دختر دخاتير", teacher: "mudarris mudarriseen mh|مدرس مدرسين", student: "6aalib 6ullaab mh|طالب طلاب",
    manager: "mudeer mudaraa2 mh|مدير مدراء", boss: "boss bossaat m|بوس بوسات", company: "sharika sharikaat f|شركة شركات",
    shop: "ma7all ma7allaat m|محل محلات", market: "soog aswaag m|سوق أسواق", mall: "mall mallaat m|مول مولات",
    mosque: "masjid masaajid m|مسجد مساجد", plane: "6ayyaara 6ayyaaraat f|طيارة طيارات", trip: "safra safraat f|سفرة سفرات",
    vacation: "ijaaza ijaazaat f|إجازة إجازات", birthday: "3eed_meelaad a3yaad_meelaad m|عيد_ميلاد أعياد_ميلاد",
    party: "party partyaat m|بارتي بارتيات", gift: "hadiyya hadaaya f|هدية هدايا", help: "musaa3ada musaa3adaat f|مساعدة مساعدات",
    luck: "7a6'6' 7a6'6' m|حظ حظ", salary: "maa3aash maa3aashaat m|معاش معاشات", breakfast: "rayoog rayoog m|ريوق ريوق",
    lunch: "3'ada 3'ada m|غدا غدا", dinner: "3asha 3asha m|عشا عشا", rice: "3aish 3aish m|عيش عيش",
    meat: "la7am la7am m|لحم لحم", chicken: "diyaay diyaay m|دياي دياي", fish: "samach samach m|سمچ سمچ",
    bread: "5ubz 5ubz m|خبز خبز", juice: "3a9eer 3a9eer m|عصير عصير", hotel: "fundig fanaadig m|فندق فنادق",
    hospital: "mustashfa mustashfayaat m|مستشفى مستشفيات", police: "shur6a shur6a f|شرطة شرطة", army: "jaish jyoosh m|جيش جيوش",
    soldier: "3askari 3askar mh|عسكري عسكر", dubbing: "dablaja dablajaat f|دبلجة دبلجات", keyboard: "keyboard keyboardaat m|كيبورد كيبوردات",
    screen: "shaasha shaashaat f|شاشة شاشات", battery: "baytri baytriyyaat m|بيتري بيتريات", charger: "shaa7in shawaa7in m|شاحن شواحن",
    update: "ta7deeth ta7deethaat m|تحديث تحديثات", version: "nus5a nusa5 f|نسخة نسخ", mistake: "3'al6a 3'ala6aat f|غلطة غلطات",
    error: "error erroraat m|ايرور ايرورات", bug: "bug bugaat m|بق بقات", result: "nateeja nataayij f|نتيجة نتايج",
    test: "imti7aan imti7aanaat m|امتحان امتحانات", lesson: "dars duroos m|درس دروس", class: "class classaat m|كلاس كلاسات",
    homework: "waajib waajibaat m|واجب واجبات", channel: "ganaa ganawaat f|قناة قنوات", group: "group groupaat m|قروب قروبات",
    clan: "clan clanaat m|كلان كلانات", item: "item itemaat m|آيتم آيتمات", quest: "quest questaat m|كويست كويستات",
    map: "map mapaat m|ماب مابات", clothes: "hdoom hdoom f|هدوم هدوم", gold: "gold gold m|قولد قولد",
    coin: "coin coins m|كوين كوينز", english: "ingleezi ingleezi m|انجليزي انجليزي", arabic: "3arabi 3arabi m|عربي عربي",
    truth: "9idj 9idj m|صدج صدج", mind: "3agil 3gool m|عقل عقول", face: "wayh wyooh m|ويه ويوه", hair: "sha3ar sha3ar m|شعر شعر",
    stuff: "ashyaa2 ashyaa2 f|أشياء أشياء", guy: "rayyal shabaab mh|ريال شباب", chat: "chat chataat m|شات شاتات",
    opinion: "ra2y aaraa2 m|رأي آراء", fight: "hoosha hooshaat f|هوشة هوشات", win: "fooz fooz m|فوز فوز",
    sleep: "noom noom m|نوم نوم", design: "ta9meem ta9aameem m|تصميم تصاميم", code: "code codes m|كود أكواد",
    language_: "lu3'a lu3'aat f|لغة لغات", shoe: "ni3aal ni3aal f|نعال نعال", shoes: "ni3aal ni3aal f|نعال نعال",
    weekend: "wiikend wiikendaat m|ويكند ويكندات", break: "breek breekaat m|بريك بريكات", meeting: "ijtimaa3 ijtimaa3aat m|اجتماع اجتماعات",
    reason: "sabab asbaab m|سبب أسباب", minute_: "dageega dagaayig f|دقيقة دقايق", number: "ragam argaam m|رقم أرقام",
    price: "si3r as3aar m|سعر أسعار", end: "nihaaya nihaayaat f|نهاية نهايات", start: "bidaaya bidaayaat f|بداية بدايات",
    part: "juz2 ajzaa2 m|جزء أجزاء", side: "9oob 9oob m|صوب صوب", course: "kors korsaat m|كورس كورسات", plan: "5i66a 5i6a6 f|خطة خطط",
    point: "nug6a nuga6 f|نقطة نقط", chance: "fur9a fura9 f|فرصة فرص", power: "guwwa guwwa f|قوة قوة", health: "9i77a 9i77a f|صحة صحة",
    football: "koora koora f|كورة كورة", ball: "koora koraat f|كورة كورات", match: "mubaaraa mubaarayaat f|مباراة مباريات",
    programming: "barmaja barmaja f|برمجة برمجة", drawing: "rasma rasmaat f|رسمة رسمات", youtube: "youtube youtube m|يوتيوب يوتيوب",
    graphics: "graphics graphics f|قرافكس قرافكس", engine: "engine enginaat m|إنجن إنجنات", developer: "mu6awwir mu6awwireen mh|مطور مطورين",
    gamer: "gamer gamaraat mh|قيمر قيمرز", stream: "stream streamaat m|ستريم ستريمات", subscriber: "mushtarik mushtarikeen mh|مشترك مشتركين",
    comment: "ta3leeg ta3leegaat m|تعليق تعليقات", like: "like likaat m|لايك لايكات", view: "mushaahada mushaahadaat f|مشاهدة مشاهدات",
    tutorial: "shar7 shuroo7 m|شرح شروح", drop: "drop dropaat m|دروب دروبات", rank: "rank rankaat m|رانك رانكات",
    inventory: "inventory inventory m|انفنتوري انفنتوري", bank: "bank bankaat m|بنك بنوك", guild: "guild guildaat m|قلد قلدات",
    pet: "pet petaat m|بت بتات", armor: "armor armoraat m|آرمر آرمرات", armour: "armor armoraat m|آرمر آرمرات",
    helm: "helm helmaat m|هلم هلمات", cape: "cape capeaat m|كيب كيبات", boost: "boost boostaat m|بوست بوستات",
    farm: "farm farm m|فارم فارم", bot: "bot botaat m|بوت بوتات", plugin: "plugin pluginaat m|بلقن بلقنات",
    reward: "jaa2iza jawaa2iz f|جائزة جوائز", event: "event eventaat m|ايفنت ايفنتات", merge: "merge merge m|ميرج ميرج", sound: "9oot a9waat m|صوت أصوات", art: "fann funoon m|فن فنون", script: "script scriptaat m|سكربت سكربتات",
    feature: "maizza maizzaat f|ميزة ميزات", control: "ta7akkum ta7akkum m|تحكم تحكم", mode: "mode modaat m|مود مودات",
    trailer: "trailer trailaraat m|تريلر تريلرات", demo: "demo demoyaat m|ديمو ديموهات", prize: "jaayza jawaayiz f|جايزة جوايز",
    hobby: "haawya hawaayaat f|هواية هوايات", future: "mustagbal mustagbal m|مستقبل مستقبل", dream: "7ilm a7laam m|حلم أحلام",
    age: "3umr a3maar m|عمر أعمار", practice: "tamreen tamaareen m|تمرين تمارين", action: "action action m|أكشن أكشن",
    puzzle: "lu3'z al3'aaz m|لغز ألغاز", link: "link linkaat m|لينك لينكات", tool: "adaa adawaat f|أداة أدوات", hour_: "saa3a saa3aat f|ساعة ساعات",
    adventure: "mu3'aamara mu3'aamaraat f|مغامرة مغامرات", horror: "ru3b ru3b m|رعب رعب", racing: "sibaag sibaag m|سباق سباق",
    mobile: "mobile mobile m|موبايل موبايل", console: "console consolaat m|كونسول كونسولات", controller: "yadd yaddaat f|يد يدات",
    friendship: "9adaaga 9adaaga f|صداقة صداقة", patience: "9abur 9abur m|صبر صبر", time_: "wagt awgaat m|وقت أوقات", color: "loon alwaan m|لون ألوان", colour: "loon alwaan m|لون ألوان", kind: "noo3 anwaa3 m|نوع أنواع", type: "noo3 anwaa3 m|نوع أنواع", example: "mithaal amthila m|مثال أمثلة",
    rate: "rate rates m|ريت ريتات", request: "6alab 6alabaat m|طلب طلبات", secret: "sirr asraar m|سر أسرار",
    pizza: "pizza pizza f|بيتزا بيتزا", joke: "nukta nukat f|نكتة نكت", shift: "dawaam dawaamaat m|دوام دوامات",
    lag: "lag lag m|لاق لاق", noob: "noob noobs mh|نوب نوبز", burger: "burger burgeraat m|برقر برقرات",
    kill: "kill kills m|كيل كيلز", healer: "healer healers mh|هيلر هيلرز", tank: "tank tanks m|تانك تانكات", damage: "damage damage m|دامج دامج",
    dps: "dps dps m|دي_بي_إس دي_بي_إس", support: "da3m da3m m|دعم دعم", fever: "7araara 7araara f|حرارة حرارة", headache: "9udaa3 9udaa3 m|صداع صداع",
    medicine: "dawa adwiya m|دوا أدوية", grandmother: "yadda yaddaat fh|يدة يدات", grandfather: "yadd yidood mh|يد يدود",
    occasion: "marra marraat f|مرة مرات", dirham: "dirham daraahim m|درهم دراهم", light: "lait laitaat m|ليت ليتات",
    conversation: "saalfa sawaalif f|سالفة سوالف", model: "model modelaat m|موديل موديلات", ai: "AI AI m|AI AI",
    letter: "7arf 7uroof m|حرف حروف", arabizi: "arabizi arabizi m|عربيزي عربيزي", dev: "mu6awwir mu6awwireen mh|مطور مطورين",
    legend: "us6oora asaa6eer f|أسطورة أساطير", ac: "AC AC m|AC AC", zip: "zip zip m|زب زب", exe: "exe exe m|exe exe", dll: "dll dll m|dll dll",
    progress: "progress progress m|بروقرس بروقرس", setting: "settings settings m|سيتنقز سيتنقز", list: "list lists m|لست لستات",
    one: "wa7id wa7deen m|واحد واحدين", net: "net net m|نت نت", rep: "rep rep m|ريب ريب", faction: "faction factions m|فاكشن فاكشنز",
    ping: "ping ping m|بنق بنق", fps: "fps fps m|fps fps", loot: "loot loot m|لوت لوت", potion: "potion potions m|بوشن بوشنز",
    enhancement: "enhancement enhancements m|انهانسمنت انهانسمنتات", gear: "gear gear m|قير قير", xp: "xp xp m|xp xp", hp: "hp hp m|hp hp",
    mana: "mana mana m|مانا مانا", crit: "crit crit m|كرت كرت", npc: "npc npcs m|npc npcs", member: "member members mh|ممبر ممبرز",
    membership: "membership membership m|ممبرشب ممبرشب", spawn: "spawn spawns m|سبون سبونات",
    trade: "trade trades m|تريد تريدات", ban: "ban ban m|بان بان", mod: "mod mods mh|مود مودز",
    sense: "ma3na ma3aani m|معنى معاني", mac: "mac mac m|ماك ماك", android: "android android m|أندرويد أندرويد",
    iphone: "iphone iphone m|آيفون آيفون", discord: "discord discord m|ديسكورد ديسكورد", telegram: "telegram telegram m|تيليقرام تيليقرام",
    whatsapp: "whatsapp whatsapp m|واتساب واتساب", instagram: "instagram instagram m|انستقرام انستقرام", tiktok: "tiktok tiktok m|تيك_توك تيك_توك",
    twitter: "twitter twitter m|تويتر تويتر", google: "google google m|قوقل قوقل", github: "github github m|قيت_هب قيت_هب", python: "python python m|بايثون بايثون",
    javascript: "javascript javascript m|جافاسكربت جافاسكربت", java: "java java m|جافا جافا", minecraft: "minecraft minecraft m|ماينكرافت ماينكرافت",
    roblox: "roblox roblox m|روبلوكس روبلوكس", fortnite: "fortnite fortnite m|فورتنايت فورتنايت", steam: "steam steam m|ستيم ستيم",
    playstation: "playstation playstation m|بلايستيشن بلايستيشن", xbox: "xbox xbox m|اكس_بوكس اكس_بوكس", nintendo: "nintendo nintendo m|ننتندو ننتندو",
    cause: "sabab asbaab m|سبب أسباب", rating: "tagyeem tagyeemaat m|تقييم تقييمات", accent: "lahja lahjaat f|لهجة لهجات",
    dialect: "lahja lahjaat f|لهجة لهجات", sentence: "jumla jumal f|جملة جمل", text: "na99 nu9oo9 m|نص نصوص",
    wifi: "wifi wifi m|واي_فاي واي_فاي", queue: "6aaboor 6awaabeer m|طابور طوابير", battle: "ma3raka ma3aarik f|معركة معارك",
    member: "3u9'u a39'aa2 mh|عضو أعضاء", rule: "gaanoon gawaaneen m|قانون قوانين", axe: "faas fu2oos m|فاس فؤوس",
    dagger: "5anjar 5anaajir m|خنجر خناجر", staff: "3a9a 3i9i f|عصا عصي", bow: "gaws agwaas m|قوس أقواس", gun: "musaddas musaddasaat m|مسدس مسدسات",
    wand: "wand wands m|وند وندز", mace: "mace maces m|ميس ميسات", scythe: "minjal manaajil m|منجل مناجل", shield: "dir3 duroo3 m|درع دروع", notification: "tanbeeh tanbeehaat m|تنبيه تنبيهات", description: "wa9f wa9f m|وصف وصف",
    requirement: "muta6allab muta6allabaat m|متطلب متطلبات", option: "5iyaar 5iyaaraat m|خيار خيارات", admin: "admin admins mh|أدمن أدمنز", button: "zirr azraar m|زر أزرار", math: "riyaa9'iyyaat riyaa9'iyyaat f|رياضيات رياضيات",
    maths: "riyaa9'iyyaat riyaa9'iyyaat f|رياضيات رياضيات", science: "3uloom 3uloom f|علوم علوم", history: "taaree5 taaree5 m|تاريخ تاريخ",
    physics: "feezyaa2 feezyaa2 f|فيزياء فيزياء", chemistry: "keemyaa2 keemyaa2 f|كيمياء كيمياء",
    'drop rate': "drop_rate drop_rates m|دروب_ريت دروب_ريتات", 'friend request': "6alab_9adaaga 6alabaat_9adaaga m|طلب_صداقة طلبات_صداقة",
    'free time': "wagt_faraa3' wagt_faraa3' m|وقت_فراغ وقت_فراغ", train: "gi6aar gi6aaraat m|قطار قطارات", station: "ma7a66a ma7a66aat f|محطة محطات",
    'train station': "ma7a66at_il-gi6aar ma7a66aat_il-gi6aar f|محطة_القطار محطات_القطار", 'bus station': "ma7a66at_il-baa9 ma7a66aat_il-baa9 f|محطة_الباص محطات_الباص",
    'bus stop': "mawgaf_il-baa9 mawaagif_il-baa9 m|موقف_الباص مواقف_الباص", 'metro station': "ma7a66at_il-metro ma7a66aat_il-metro f|محطة_المترو محطات_المترو",
    supermarket: "soobarmaarkit soobarmaarkitaat m|سوبرماركت سوبرماركتات", direction: "ittijaah ittijaahaat m|اتجاه اتجاهات", darb: "darb duroob m|درب دروب",
    country_: "balad bildaan m|بلد بلدان", nationality: "jinsiyya jinsiyyaat f|جنسية جنسيات", cousin: "wild_3amm 3yaal_3amm mh|ولد_عم عيال_عم",
    traffic: "za7ma za7ma f|زحمة زحمة", airport: "ma6aar ma6aaraat m|مطار مطارات", wallet: "book bookaat m|بوك بوكات", cutscene: "cutscene cutscenes m|كت_سين كت_سينات",
    loader: "loader loaders m|لودر لودرز", ign: "ign ign m|ign ign", shawarma: "shawarma shawarma f|شاورما شاورما", trash_n: "zibaala zibaala f|زبالة زبالة",
    point_: "nug6a nuga6 f|نقطة نقط", pvp: "pvp pvp m|pvp pvp", username: "username usernames m|يوزرنيم يوزرنيمات", folder: "folder folderaat m|فولدر فولدرات", desktop: "desktop desktops m|ديسكتوب ديسكتوبات", page: "9af7a 9af7aat f|صفحة صفحات",
    cache: "cache cache m|كاش كاش", driver: "driver driveraat m|درايفر درايفرات", router: "router routers m|راوتر راوترات", antivirus: "antivirus antivirus m|أنتي_فايروس أنتي_فايروس",
    installer: "installer installers m|انستولر انستولرز", maintenance: "9iyaana 9iyaana f|صيانة صيانة", restaurant: "ma63am ma6aa3im m|مطعم مطاعم", scam: "na9b na9b m|نصب نصب",
    healer: "healer healers mh|هيلر هيلرز", party_: "party partyaat m|بارتي بارتيات", monitor: "shaasha shaashaat f|شاشة شاشات", weapon_: "silaa7 asli7a m|سلاح أسلحة",
    command: "command commands m|كوماند كوماندز", popup: "popup popups m|بوب_أب بوب_أبات", warning: "ta7dheer ta7dheeraat m|تحذير تحذيرات", notification: "ish3aar ish3aaraat m|إشعار إشعارات"
  };
  const NOUN_ALIAS = {
    dad: 'father', mom: 'mother', mum: 'mother', kid: 'child', photo: 'picture', image: 'picture', film: 'movie',
    television: 'tv', store: 'shop', application: 'app', site: 'website', exam: 'test', mobile: 'phone', cellphone: 'phone',
    pc: 'computer', buddy: 'friend', pal: 'friend', mate: 'friend', lady: 'woman', job_: 'job', dude_: 'guy',
    phones: 'phone', apps: 'app', guys: 'guy', mins: 'minute', grandma: 'grandmother', granny: 'grandmother', grandpa: 'grandfather',
    dmg: 'damage', guide: 'tutorial', beach: 'sea', medicines: 'medicine', fault: 'mistake', lvl: 'level', lvls: 'level', min: 'minute', acs: 'ac',
    mem: 'member', mems: 'member', mob: 'monster', mobs: 'monster', exp: 'xp', pots: 'potion', pot: 'potion', enh: 'enhancement', enhs: 'enhancement',
    hrs: 'hour', secs: 'second', msgs: 'message', pics: 'picture', vids: 'video', sec_: 'second'
  };
  const NOUN_PL_IRR = { people: 'person', men: 'man', women: 'woman', children: 'child', kids: 'child', guys: 'guy' };

  /* Adjectives: "masculine feminine plural|masculine feminine plural", or "one form|one form" when it never changes.
     A leading ^ means it goes before the noun (first, best...). */
  const ADJ_RAW = {
    good: "zain zaina zaineen|زين زينة زينين", fine: "zain zaina zaineen|زين زينة زينين", bad: "shain shaina shaineen|شين شينة شينين",
    ugly: "shain shaina shaineen|شين شينة شينين", nice: "7ilu 7ilwa 7ilween|حلو حلوة حلوين", beautiful: "7ilu 7ilwa 7ilween|حلو حلوة حلوين",
    pretty: "7ilu 7ilwa 7ilween|حلو حلوة حلوين", sweet: "7ilu 7ilwa 7ilween|حلو حلوة حلوين", cute: "7ilu 7ilwa 7ilween|حلو حلوة حلوين",
    cool: "5a6eer 5a6eera 5a6eereen|خطير خطيرة خطيرين", great: "mumtaaz mumtaaza mumtaazeen|ممتاز ممتازة ممتازين",
    awesome: "raw3a|روعة", amazing: "raw3a|روعة", wonderful: "raw3a|روعة", perfect: "mumtaaz mumtaaza mumtaazeen|ممتاز ممتازة ممتازين",
    excellent: "mumtaaz mumtaaza mumtaazeen|ممتاز ممتازة ممتازين", big: "chibeer chibeera chbaar|چبير چبيرة چبار",
    huge: "chibeer chibeera chbaar|چبير چبيرة چبار", small: "9i3'eer 9i3'eera 9i3'aar|صغير صغيرة صغار",
    young: "9i3'eer 9i3'eera 9i3'aar|صغير صغيرة صغار", new: "yideed yideeda yidaad|يديد يديدة يداد",
    old: "gadeem gadeema gdaam|قديم قديمة قدام", simple: "basee6 basee6a basee6een|بسيط بسيطة بسيطين",
    easy: "sahl sahla sahleen|سهل سهلة سهلين", hard: "9a3b 9a3ba 9a3been|صعب صعبة صعبين", difficult: "9a3b 9a3ba 9a3been|صعب صعبة صعبين",
    fun: "wanasa|وناسة", funny: "y9'a77ik t9'a77ik y9'a77koon|يضحك تضحك يضحكون", boring: "mumill mumilla mumilleen|ممل مملة مملين",
    happy: "mistaanis mistaansa mistaanseen|مستانس مستانسة مستانسين", glad: "mistaanis mistaansa mistaanseen|مستانس مستانسة مستانسين",
    sad: "za3laan za3laana za3laaneen|زعلان زعلانة زعلانين", upset: "za3laan za3laana za3laaneen|زعلان زعلانة زعلانين",
    angry: "m3a99ib m3a99ba m3a99been|معصب معصبة معصبين", mad: "m3a99ib m3a99ba m3a99been|معصب معصبة معصبين",
    tired: "ta3baan ta3baana ta3baaneen|تعبان تعبانة تعبانين", sick: "maree9' maree9'a mar9'a|مريض مريضة مرضى",
    ill: "maree9' maree9'a mar9'a|مريض مريضة مرضى", hungry: "yoo3aan yoo3aana yoo3aaneen|يوعان يوعانة يوعانين",
    thirsty: "3a6shaan 3a6shaana 3a6shaaneen|عطشان عطشانة عطشانين", sleepy: "na3saan na3saana na3saaneen|نعسان نعسانة نعسانين",
    bored: "mallaan mallaana mallaaneen|ملان ملانة ملانين", busy: "mash3'ool mash3'oola mash3'ooleen|مشغول مشغولة مشغولين",
    free: "faa9'i faa9'ya faa9'yeen|فاضي فاضية فاضيين", ready: "zaahib zaahba zaahbeen|زاهب زاهبة زاهبين", majjaani: "majjaani majjaaniyya majjaaniyyeen|مجاني مجانية مجانيين",
    terrible: "5aayis 5aaysa 5aayseen|خايس خايسة خايسين", trash: "5aayis 5aaysa 5aayseen|خايس خايسة خايسين", horrible: "5aayis 5aaysa 5aayseen|خايس خايسة خايسين", awful: "5aayis 5aaysa 5aayseen|خايس خايسة خايسين",
    active: "sha3'3'aal sha3'3'aala sha3'3'aaleen|شغال شغالة شغالين", clear: "waa9'i7 waa9'7a waa9'7een|واضح واضحة واضحين", corrupted: "5arbaan 5arbaana 5arbaaneen|خربان خربانة خربانين", corrupt: "5arbaan 5arbaana 5arbaaneen|خربان خربانة خربانين",
    spicy: "7aarr 7aarra 7aarreen|حار حارة حارين", cracked: "fannaan fannaana fannaaneen|فنان فنانة فنانين", goated: "us6oora us6oora asaa6eer|أسطورة أسطورة أساطير",
    broke: "mfallis mfallisa mfalliseen|مفلس مفلسة مفلسين", mid_: "3aadi 3aadiyya 3aadiyyeen|عادي عادية عاديين", public: "3aamm 3aamma 3aammeen|عام عامة عامين",
    impossible_: "musta7eel musta7eela musta7eeleen|مستحيل مستحيلة مستحيلين",
    sure: "mit2akkid mit2akkida mit2akkideen|متأكد متأكدة متأكدين", important: "muhimm muhimma muhimmeen|مهم مهمة مهمين",
    fast: "saree3 saree3a saree3een|سريع سريعة سريعين", quick: "saree3 saree3a saree3een|سريع سريعة سريعين",
    slow: "ba6ee2 ba6ee2a ba6ee2een|بطيء بطيئة بطيئين", strong: "gawi gawiyya gawiyyeen|قوي قوية قويين",
    powerful: "gawi gawiyya gawiyyeen|قوي قوية قويين", weak: "9'a3eef 9'a3eefa 9'i3aaf|ضعيف ضعيفة ضعاف",
    rich: "3'ani 3'aniyya 3'aniyyeen|غني غنية غنيين", poor: "fageer fageera fugaraa2|فقير فقيرة فقراء",
    hot: "7aarr 7aarra 7aarreen|حار حارة حارين", cold: "baarid baarda baardeen|بارد باردة باردين",
    right: "9a7ee7 9a7ee7a 9a7ee7een|صحيح صحيحة صحيحين", correct: "9a7ee7 9a7ee7a 9a7ee7een|صحيح صحيحة صحيحين",
    wrong: "3'ala6|غلط", true: "9idj|صدج", early: "badri|بدري", late: "mit2a55ir mit2a55ra mit2a55reen|متأخر متأخرة متأخرين",
    long: "6aweel 6aweela 6iwaal|طويل طويلة طوال", tall: "6aweel 6aweela 6iwaal|طويل طويلة طوال",
    short: "gi9eer gi9eera gi9aar|قصير قصيرة قصار", far: "ba3eed ba3eeda ba3eedeen|بعيد بعيدة بعيدين",
    close: "greeb greeba greebeen|قريب قريبة قريبين", near: "greeb greeba greebeen|قريب قريبة قريبين",
    expensive: "3'aali 3'aalya 3'aalyeen|غالي غالية غاليين", cheap: "r5ee9 r5ee9a r5ee9een|رخيص رخيصة رخيصين",
    clean: "na6'eef na6'eefa na6'eefeen|نظيف نظيفة نظيفين", dirty: "wasi5 wasi5a wasi5een|وسخ وسخة وسخين",
    full: "malyaan malyaana malyaaneen|مليان مليانة مليانين", empty: "faa9'i faa9'ya faa9'yeen|فاضي فاضية فاضيين",
    crazy: "5ibal 5ibla 5iblaan|خبل خبلة خبلان", smart: "shaa6ir shaa6ra shaa6reen|شاطر شاطرة شاطرين",
    clever: "shaa6ir shaa6ra shaa6reen|شاطر شاطرة شاطرين", stupid: "3'abi 3'abiyya 3'abiyyeen|غبي غبية غبيين",
    dumb: "3'abi 3'abiyya 3'abiyyeen|غبي غبية غبيين", favorite: "mufa9'9'al mufa9'9'ala mufa9'9'aleen|مفضل مفضلة مفضلين",
    favourite: "mufa9'9'al mufa9'9'ala mufa9'9'aleen|مفضل مفضلة مفضلين", different: "mu5talif mu5talfa mu5talfeen|مختلف مختلفة مختلفين",
    real: "7ageegi 7ageegiyya 7ageegiyyeen|حقيقي حقيقية حقيقيين", professional: "i7tiraafi i7tiraafiyya i7tiraafiyyeen|احترافي احترافية احترافيين",
    famous: "mash-hoor mash-hoora mash-hooreen|مشهور مشهورة مشهورين", other: "thaani thaanya thaanyeen|ثاني ثانية ثانيين",
    arabic: "3arabi 3arabiyya 3arab|عربي عربية عرب", english: "ingleezi ingleeziyya ingleez|انجليزي انجليزية انجليز",
    emirati: "imaaraati imaaraatiyya imaaraatiyyeen|إماراتي إماراتية إماراتيين", online: "online|أونلاين", offline: "offline|أوفلاين",
    possible: "mumkin|ممكن", impossible: "musta7eel|مستحيل", afraid: "5aayif 5aayfa 5aayfeen|خايف خايفة خايفين",
    scared: "5aayif 5aayfa 5aayfeen|خايف خايفة خايفين", married: "mitzawwij mitzawwja mitzawjeen|متزوج متزوجة متزوجين",
    serious: "jaad jaadda jaaddeen|جاد جادة جادين", quiet: "haadi haadya haadyeen|هادي هادية هاديين",
    heavy: "thageel thageela thgaal|ثقيل ثقيلة ثقال", light: "5afeef 5afeefa 5faaf|خفيف خفيفة خفاف",
    open: "maftoo7 maftoo7a maftoo7een|مفتوح مفتوحة مفتوحين", closed: "msakkar msakkra msakkreen|مسكر مسكرة مسكرين",
    broken: "5arbaan 5arbaana 5arbaaneen|خربان خربانة خربانين", done: "5alaa9|خلاص", finished: "5alaa9|خلاص",
    dead: "mayyit mayyta mawta|ميت ميتة موتى", lucky: "ma76'oo6' ma76'oo6'a ma76'oo6'een|محظوظ محظوظة محظوظين",
    useful: "mufeed mufeeda mufeedeen|مفيد مفيدة مفيدين", useless: "maaleh daa3i|ماله داعي",
    red: "a7mar 7amra 7umur|أحمر حمرا حمر", blue: "azrag zarga zurg|أزرق زرقا زرق", green: "a59'ar 59'ra 59'ur|أخضر خضرا خضر",
    black: "aswad sooda sood|أسود سودا سود", white: "abya9' bai9'a bee9'|أبيض بيضا بيض", yellow: "a9far 9afra 9ufur|أصفر صفرا صفر",
    brown: "bunni bunniyya bunniyya|بني بنية بنية", pink: "wardi wardiyya wardiyya|وردي وردية وردية", gray: "ramaadi ramaadiyya ramaadiyya|رمادي رمادية رمادية",
    grey: "ramaadi ramaadiyya ramaadiyya|رمادي رمادية رمادية", purple: "banafsaji banafsajiyya banafsajiyya|بنفسجي بنفسجية بنفسجية",
    orange: "burtugaali burtugaaliyya burtugaaliyya|برتقالي برتقالية برتقالية", careful: "7aree9 7aree9a 7aree9een|حريص حريصة حريصين",
    interested: "muhtamm muhtamma muhtammeen|مهتم مهتمة مهتمين", excited: "mitwannis mitwanisa mitwanseen|متونس متونسة متونسين",
    nervous: "mitwattir mitwattra mitwattreen|متوتر متوترة متوترين", available: "mitwaffir mitwaffra mitwaffreen|متوفر متوفرة متوفرين",
    original: "a9li a9liyya a9liyyeen|أصلي أصلية أصليين", patient: "9aboor 9aboora 9abooreen|صبور صبورة صبورين",
    own: "^-|-", proud: "fa5oor fa5oora fa5ooreen|فخور فخورة فخورين", hardworking: "mujtahid mujtahda mujtahdeen|مجتهد مجتهدة مجتهدين", complete: "kaamil kaamla kaamleen|كامل كاملة كاملين",
    first: "^awwal|أول", last: "^aa5ir|آخر", same: "^+nafs|نفس", best: "^a7san|أحسن", worst: "^ashyan|أشين",
    biggest: "^achbar|أچبر", whole: "^+kil|كل", better: "a7san|أحسن", worse: "ashyan|أشين", bigger: "achbar|أچبر",
    smaller: "a93'ar|أصغر", easier: "as-hal|أسهل", harder: "a93ab|أصعب", faster: "asra3|أسرع", longer: "a6wal|أطول",
    cheaper: "ar5a9|أرخص", nicer: "a7la|أحلى", stronger: "agwa|أقوى", next: "!il-yay il-yaaya il-yaayeen|الياي الياية اليايين",
    previous: "!illi gabil|اللي قبل", former: "!illi gabil|اللي قبل",
    low: "wa6i wa6ya wa6yeen|واطي واطية واطيين", high: "3aali 3aalya 3aalyeen|عالي عالية عاليين",
    delicious: "ladheedh ladheedha ladheedheen|لذيذ لذيذة لذيذين", tasty: "ladheedh ladheedha ladheedheen|لذيذ لذيذة لذيذين",
    laggy: "ylaggig tlaggig ylaggigoon|يلقق تلقق يلققون", afk: "afk|afk", op: "op|op",
    down: "6aayi7 6aay7a 6aay7een|طايح طايحة طايحين", daily: "yoomi yoomiyya yoomiyya|يومي يومية يومية",
    weekly: "isboo3i isboo3iyya isboo3iyya|أسبوعي أسبوعية أسبوعية", monthly: "shahri shahriyya shahriyya|شهري شهرية شهرية",
    messy: "m5arba6 m5arb6a m5arb6een|مخربط مخربطة مخربطين", strict: "9aarim 9aarma 9aarmeen|صارم صارمة صارمين",
    regular: "3aadi 3aadiyya 3aadiyyeen|عادي عادية عاديين", normal: "3aadi 3aadiyya 3aadiyyeen|عادي عادية عاديين", local: "ma7alli ma7alliyya ma7alliyyeen|محلي محلية محليين",
    natural: "6abee3i 6abee3iyya 6abee3iyyeen|طبيعي طبيعية طبيعيين", robotic: "mithil ir-robot|مثل الروبوت", fake: "muzayyaf muzayyafa muzayyafeen|مزيف مزيفة مزيفين",
    weird: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين", strange: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين", fluent: "6aleeg 6aleega 6aleegeen|طليق طليقة طليقين",
    accurate: "dageeg dageega dageegeen|دقيق دقيقة دقيقين", decent: "ma3gool ma3goola ma3gooleen|معقول معقولة معقولين",
    lit: "5a6eer 5a6eera 5a6eereen|خطير خطيرة خطيرين", dope: "5a6eer 5a6eera 5a6eereen|خطير خطيرة خطيرين", sus: "mashbooh mashbooha mashbooheen|مشبوه مشبوهة مشبوهين",
    ez: "sahl sahla sahleen|سهل سهلة سهلين", pro: "pro|برو", understandable: "mafhoom mafhooma mafhoomeen|مفهوم مفهومة مفهومين",
    insane: "yjannin tjannin yjannoon|يجنن تجنن يجننون", missing: "naagi9 naag9a naag9een|ناقص ناقصة ناقصين", annoying: "yi3a99ib ti3a99ib yi3a99boon|يعصب تعصب يعصبون",
 awake: "9aa7i 9aa7ya 9aa7een|صاحي صاحية صاحين", alive: "7ayy 7ayya 7ayyeen|حي حية حيين",
    stuck: "3aalig 3aalga 3aalgeen|عالق عالقة عالقين", gone: "raa7 raa7at raa7aw|راح راحت راحوا", rare: "naadir naadra naadreen|نادر نادرة نادرين",
    older: "achbar|أچبر", younger: "a93'ar|أصغر", weaker: "a9'3af|أضعف", smarter: "ash6ar|أشطر", slower: "ab6a2|أبطأ",
    shorter: "ag9ar|أقصر", richer: "a3'na|أغنى", hotter: "a7arr|أحر", colder: "abrad|أبرد", higher: "a3la|أعلى", lower: "awa6a|أوطى",
    cooler: "a7la|أحلى", prettier: "a7la|أحلى", heavier: "athgal|أثقل", lighter: "a5aff|أخف", closer: "agrab|أقرب", farther: "ab3ad|أبعد",
    further: "ab3ad|أبعد", less: "agal|أقل", fewer: "agal|أقل",
    oldest: "^achbar|أچبر", youngest: "^a93'ar|أصغر", smallest: "^a93'ar|أصغر", easiest: "^as-hal|أسهل", hardest: "^a93ab|أصعب",
    fastest: "^asra3|أسرع", strongest: "^agwa|أقوى", weakest: "^a9'3af|أضعف", longest: "^a6wal|أطول", cheapest: "^ar5a9|أرخص",
    nicest: "^a7la|أحلى", coolest: "^a7la|أحلى", prettiest: "^a7la|أحلى", newest: "^a7dath|أحدث", latest: "^a7dath|أحدث",
    highest: "^a3la|أعلى", lowest: "^awa6a|أوطى", closest: "^agrab|أقرب", greatest: "^a36'am|أعظم", richest: "^a3'na|أغنى", smartest: "^ash6ar|أشطر"
  };
  const ADJ_ALIAS = { large: 'big', little: 'small', upset_: 'sad', ok_: 'fine' };

  /* Verbs: "I-past he-past present-stem command|same in Arabic script" + options.
     present-stem goes after the prefix (a-sawi, t-sawi). "-" means none.
     lv = vowel between prefix and stem (t-i-l3ab). past/pp/s = irregular English forms.
     to/for/at/with/about = what those words become after this verb ("drop" = nothing). obj = object goes through a preposition. */
  const VERB_RAW = {
    do: ["sawweet sawwa sawi sawwi|سويت سوى سوي سوّ", { past: 'did', pp: 'done', s: 'does', io: 'li' }],
    make: ["sawweet sawwa sawi sawwi|سويت سوى سوي سوّ", { past: 'made', io: 'li', ms: '9inaa3a|صناعة' }],
    create: ["sawweet sawwa sawi sawwi|سويت سوى سوي سوّ", { ms: '9inaa3a|صناعة' }],
    go: ["ri7t raa7 roo7 roo7|رحت راح روح روح", { past: 'went', pp: 'gone', s: 'goes', to: 'drop', ap: 'raayi7 raay7a raay7een|رايح رايحة رايحين' }],
    come: ["yeet ya yi ta3aal|ييت يا يي تعال", { past: 'came', pp: 'come', to: 'drop', ap: 'yaay yaaya yaayeen|ياي ياية يايين',
      pr: 'ayi tiyi tiyeen tiyoon yiyi tiyi niyi yiyoon', arpr: 'آيي تيي تيين تيون ييي تيي نيي ييون' }],
    see: ["shift shaaf shoof shoof|شفت شاف شوف شوف", { past: 'saw', pp: 'seen' }],
    meet: ["shift shaaf shoof shoof|شفت شاف شوف شوف", { past: 'met' }],
    look: ["6aala3t 6aala3 6aali3 6aali3|طالعت طالع طالع طالع", { at: 'drop' }],
    watch: ["6aala3t 6aala3 6aali3 6aali3|طالعت طالع طالع طالع", { ms: 'mushaahada|مشاهدة' }],
    know: ["dareet dara dri -|دريت درى دري -", { past: 'knew', pp: 'known', lv: 'a', via: 'kaan' }],
    think: ["7asabt 7asab 7sib -|حسبت حسب حسب -", { past: 'thought', about: 'fi' }],
    want: ["- - bi -|- - بي -", { lv: 'a', via: 'kaan' }],
    need: ["i7tajt i7taaj 7taaj -|احتجت احتاج حتاج -", { lv: 'i' }],
    like: ["7abbeet 7abb 7ibb -|حبيت حب حب -", {}],
    love: ["7abbeet 7abb 7ibb -|حبيت حب حب -", {}],
    hate: ["kiraht kirah krah -|كرهت كره كره -", { lv: 'i' }],
    play: ["li3abt li3ab l3ab il3ab|لعبت لعب لعب العب", { lv: 'i', ms: 'li3b|لعب' }],
    win: ["fizt faaz fooz -|فزت فاز فوز -", { past: 'won', obj: 'b', ms: 'fooz|فوز' }],
    lose: ["5sirt 5isar 5sar -|خسرت خسر خسر -", { past: 'lost', lv: 'i', ms: '5saara|خسارة' }],
    beat: ["3'alabt 3'alab 3'lib -|غلبت غلب غلب -", { past: 'beat', pp: 'beaten', lv: 'i' }],
    eat: ["kalt kal aakil kil|كلت كل اكل كل", { past: 'ate', pp: 'eaten', ms: 'akil|أكل' }],
    drink: ["shirabt shirab shrab ishrab|شربت شرب شرب اشرب", { past: 'drank', pp: 'drunk', lv: 'i', ms: 'shurb|شرب' }],
    sleep: ["rgadt rigad rgid irgid|رقدت رقد رقد ارقد", { past: 'slept', lv: 'i', ms: 'noom|نوم' }],
    'wake up': ["ga3adt ga3ad g3id ig3id|قعدت قعد قعد اقعد", { past: 'woke', pp: 'woken', lv: 'i' }],
    'get up': ["ga3adt ga3ad g3id ig3id|قعدت قعد قعد اقعد", { past: 'got', lv: 'i' }],
    sit: ["yalast yalas ylis yilis|يلست يلس يلس يلس", { past: 'sat', lv: 'i' }],
    'sit down': ["yalast yalas ylis yilis|يلست يلس يلس يلس", { past: 'sat', lv: 'i' }],
    stay: ["ga3adt ga3ad g3id ig3id|قعدت قعد قعد اقعد", { lv: 'i' }],
    work: ["shti3'alt shti3'al shti3'il ishti3'il|اشتغلت اشتغل شتغل اشتغل", { lv: 'i', ms: "shu3'ul|شغل" }],
    study: ["darast daras dris idris|درست درس درس ادرس", { lv: 'i', ms: 'diraasa|دراسة' }],
    learn: ["t3allamt t3allam t3allam t3allam|تعلمت تعلم تعلم تعلم", { lv: 'i', past: ['learned', 'learnt'], ms: 'ta3allum|تعلم' }],
    teach: ["3allamt 3allam 3allim 3allim|علمت علم علم علم", { past: 'taught', ms: 'ta3leem|تعليم' }],
    read: ["gareet gara gra igra|قريت قرا قرا اقرا", { past: 'read', lv: 'i', ms: 'giraaya|قراية' }],
    write: ["kitabt kitab ktib iktib|كتبت كتب كتب اكتب", { past: 'wrote', pp: 'written', lv: 'i', io: 'li', ms: 'kitaaba|كتابة' }],
    draw: ["rasamt rasam rsim irsim|رسمت رسم رسم ارسم", { past: 'drew', pp: 'drawn', lv: 'i', ms: 'rasm|رسم' }],
    say: ["gilt gaal gool gool|قلت قال قول قول", { past: 'said', to: 'li' }],
    tell: ["gilt gaal gool gool|قلت قال قول قول", { past: 'told', to: 'li', obj: 'li', objNP: '7ag' }],
    talk: ["sawlaft sawlaf sawlif sawlif|سولفت سولف سولف سولف", { to: 'wiyya', about: '3an', ms: 'kalaam|كلام' }],
    chat: ["sawlaft sawlaf sawlif sawlif|سولفت سولف سولف سولف", { to: 'wiyya' }],
    speak: ["tkallamt tkallam tkallam tkallam|تكلمت تكلم تكلم تكلم", { past: 'spoke', pp: 'spoken', lv: 'i', to: 'wiyya', ms: 'kalaam|كلام' }],
    ask: ["sa2alt sa2al s2al is2al|سألت سأل سأل اسأل", { lv: 'i' }],
    answer: ["raddeet radd ridd ridd|رديت رد رد رد", { obj: '3ala' }],
    reply: ["raddeet radd ridd ridd|رديت رد رد رد", { obj: '3ala', to: '3ala' }],
    call: ["daggeet dagg digg digg|دقيت دق دق دق", { obj: '3ala' }],
    thank: ["shakart shakar shkur ushkur|شكرت شكر شكر اشكر", { lv: 'i', for: '3ala' }],
    give: ["3a6eet 3a6a 36i 3a6|عطيت عطى عطي عط", { past: 'gave', pp: 'given', lv: 'a', to: 'li' }],
    take: ["5adht 5adh aa5idh 5idh|خذت خذ اخذ خذ", { past: 'took', pp: 'taken' }],
    bring: ["yibt yaab yeeb yeeb|يبت ياب ييب ييب", { past: 'brought', to: 'li', io: 'li' }],
    buy: ["shareet shara shtiri shtiri|شريت شرى شتري شتري", { past: 'bought', lv: 'i', io: 'li', ms: 'shira|شرا' }],
    sell: ["bi3t baa3 bee3 bee3|بعت باع بيع بيع", { past: 'sold', ms: 'bee3|بيع', io: 'li' }],
    pay: ["dafa3t dafa3 dfa3 idfa3|دفعت دفع دفع ادفع", { past: 'paid', lv: 'i' }],
    get: ["7a99alt 7a99al 7a99il 7a99il|حصلت حصل حصل حصل", { past: 'got', pp: ['gotten', 'got'], io: 'li' }],
    receive: ["stilamt stilam stilim istilim|استلمت استلم ستلم استلم", { lv: 'i' }],
    find: ["ligeet liga lgi -|لقيت لقى لقي -", { past: 'found', lv: 'i' }],
    open: ["fakkeet fakk fikk fikk|فكيت فك فك فك", { ms: 'fat7|فتح' }],
    close: ["sakkart sakkar sakkir sakkir|سكرت سكر سكر سكر", {}],
    start: ["bideet bida bda ibda|بديت بدا بدا ابدا", { lv: 'i', ms: 'bidaaya|بداية', with: 'b' }],
    begin: ["bideet bida bda ibda|بديت بدا بدا ابدا", { past: 'began', pp: 'begun', lv: 'i', with: 'b' }],
    finish: ["5alla9t 5alla9 5alli9 5alli9|خلصت خلص خلص خلص", {}],
    complete: ["5alla9t 5alla9 5alli9 5alli9|خلصت خلص خلص خلص", {}],
    end: ["5alla9t 5alla9 5alli9 5alli9|خلصت خلص خلص خلص", {}],
    stop: ["waggaft waggaf waggif waggif|وقفت وقف وقف وقف", {}],
    wait: ["ni6art ni6ar n6ir in6ir|نطرت نطر نطر انطر", { lv: 'i', for: 'drop', ms: 'inti6aar|انتظار' }],
    help: ["saa3adt saa3ad saa3id saa3id|ساعدت ساعد ساعد ساعد", { ms: 'musaa3ada|مساعدة', with: 'fi' }],
    try: ["jarrabt jarrab jarrib jarrib|جربت جرب جرب جرب", { ms: 'tajruba|تجربة' }],
    test: ["jarrabt jarrab jarrib jarrib|جربت جرب جرب جرب", { ms: 'tajruba|تجربة' }],
    use: ["sta5damt sta5dam sta5dim ista5dim|استخدمت استخدم ستخدم استخدم", { lv: 'i', ms: 'isti5daam|استخدام' }],
    wear: ["libast libas lbis ilbis|لبست لبس لبس البس", { past: 'wore', pp: 'worn', lv: 'i' }],
    walk: ["tmashsheet tmashsha tmashsha tmashsha|تمشيت تمشى تمشى تمشى", { lv: 'i', to: 'drop', ms: 'mashi|مشي' }],
    run: ["rika9't rika9' rki9' irki9'|ركضت ركض ركض اركض", { past: 'ran', pp: 'run', lv: 'i', to: 'drop', ms: "rakh9'|ركض" }],
    drive: ["sigt saag soog soog|سقت ساق سوق سوق", { past: 'drove', pp: 'driven', to: 'drop', ms: 'siwaaga|سواقة' }],
    travel: ["saafart saafar saafir saafir|سافرت سافر سافر سافر", { to: 'drop', ms: 'safar|سفر' }],
    live: ["sikant sikan skin iskin|سكنت سكن سكن اسكن", { lv: 'i' }],
    leave: ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { past: 'left', lv: 'i', obj: 'min', objAlt: 'keep' }],
    'go out': ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { past: 'went', pp: 'gone', s: 'goes', lv: 'i' }],
    'get out': ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { past: 'got', lv: 'i' }],
    return: ["rija3t rija3 rja3 irja3|رجعت رجع رجع ارجع", { lv: 'i', to: 'drop' }],
    'come back': ["rija3t rija3 rja3 irja3|رجعت رجع رجع ارجع", { past: 'came', pp: 'come', lv: 'i', to: 'drop' }],
    'go back': ["rija3t rija3 rja3 irja3|رجعت رجع رجع ارجع", { past: 'went', pp: 'gone', s: 'goes', lv: 'i', to: 'drop' }],
    understand: ["fihamt fiham fham ifham|فهمت فهم فهم افهم", { past: 'understood', lv: 'i', ms: 'fahm|فهم' }],
    remember: ["tdhakkart tdhakkar tdhakkar tdhakkar|تذكرت تذكر تذكر تذكر", { lv: 'i' }],
    forget: ["niseet nisa nsa insa|نسيت نسى نسى انسى", { past: 'forgot', pp: 'forgotten', lv: 'i' }],
    hear: ["sima3t sima3 sma3 isma3|سمعت سمع سمع اسمع", { past: 'heard', lv: 'i' }],
    listen: ["sima3t sima3 sma3 isma3|سمعت سمع سمع اسمع", { lv: 'i', to: 'drop', ms: 'simaa3|سماع' }],
    feel: ["7asseet 7ass 7iss -|حسيت حس حس -", { past: 'felt', lv: 'i' }],
    believe: ["9addagt 9addag 9addig 9addig|صدقت صدق صدق صدق", {}],
    hope: ["tmanneet tmanna tmanna -|تمنيت تمنى تمنى -", { lv: 'i' }],
    laugh: ["9'i7akt 9'i7ak 9'7ak i9'7ak|ضحكت ضحك ضحك اضحك", { lv: 'i', at: '3ala' }],
    cry: ["9i7t 9aa7 9ee7 9ee7|صحت صاح صيح صيح", {}],
    kill: ["gitalt gital gtil igtil|قتلت قتل قتل اقتل", { lv: 'i', ms: 'gatil|قتل' }],
    die: ["mitt maat moot -|مت مات موت -", {}],
    fight: ["t9'aarabt t9'aarab t9'aarab -|تضاربت تضارب تضارب -", { past: 'fought', lv: 'i', with: 'wiyya' }],
    attack: ["haajamt haajam haajim haajim|هاجمت هاجم هاجم هاجم", { ms: 'hujoom|هجوم' }],
    shoot: ["ramait rama rmi irmi|رميت رمى رمي ارم", { past: 'shot', lv: 'i' }],
    jump: ["na66eet na66 n6i66 n6i66|نطيت نط نط نط", { ms: 'na66|نط' }],
    build: ["baneet bana bni ibni|بنيت بنى بني ابن", { past: 'built', lv: 'i', ms: 'binaa2|بناء' }],
    design: ["9ammamt 9ammam 9ammim 9ammim|صممت صمم صمم صمم", { ms: 'ta9meem|تصميم' }],
    translate: ["tarjamt tarjam tarjim tarjim|ترجمت ترجم ترجم ترجم", { ms: 'tarjama|ترجمة' }],
    send: ["6arrasht 6arrash 6arrish 6arrish|طرشت طرش طرش طرش", { past: 'sent', to: 'li', io: 'li', ms: 'irsaal|إرسال' }],
    download: ["nazzalt nazzal nazzil nazzil|نزلت نزل نزل نزل", { ms: 'tanzeel|تنزيل' }],
    install: ["nazzalt nazzal nazzil nazzil|نزلت نزل نزل نزل", { ms: 'tanzeel|تنزيل' }],
    upload: ["rafa3t rafa3 rfa3 irfa3|رفعت رفع رفع ارفع", { lv: 'i', ms: 'raf3|رفع', to: '3ala' }],
    post: ["nazzalt nazzal nazzil nazzil|نزلت نزل نزل نزل", { to: '3ala' }],
    update: ["7addatht 7addath 7addith 7addith|حدثت حدث حدث حدث", { ms: 'ta7deeth|تحديث' }],
    change: ["3'ayyart 3'ayyar 3'ayyir 3'ayyir|غيرت غير غير غير", {}],
    fix: ["9alla7t 9alla7 9alli7 9alli7|صلحت صلح صلح صلح", { ms: 'ta9lee7|تصليح' }],
    break: ["5arrabt 5arrab 5arrib 5arrib|خربت خرب خرب خرب", { past: 'broke', pp: 'broken' }],
    check: ["shayyakt shayyak shayyik shayyik|شيكت شيك شيك شيك", { for: '3ala' }],
    join: ["dasheet dash dish dish|دشيت دش دش دش", {}],
    enter: ["dasheet dash dish dish|دشيت دش دش دش", {}],
    invite: ["3azamt 3azam 3zim i3zim|عزمت عزم عزم اعزم", { lv: 'i' }],
    add: ["9'ift 9'aaf 9'eef 9'eef|ضفت ضاف ضيف ضيف", {}],
    follow: ["taaba3t taaba3 taabi3 taabi3|تابعت تابع تابع تابع", {}],
    subscribe: ["shtarakt shtarak shtirik ishtirik|اشتركت اشترك شترك اشترك", { lv: 'i', to: 'fi' }],
    share: ["shaarakt shaarak shaarik shaarik|شاركت شارك شارك شارك", { ms: 'mushaaraka|مشاركة' }],
    save: ["7ifa6't 7ifa6' 7fa6' i7fa6'|حفظت حفظ حفظ احفظ", { lv: 'i', ms: "7if6'|حفظ" }],
    delete: ["masa7t masa7 msa7 imsa7|مسحت مسح مسح امسح", { lv: 'i' }],
    search: ["dawwart dawwar dawwir dawwir|دورت دور دور دور", { for: '3ala', ms: 'ba7th|بحث' }],
    'look for': ["dawwart dawwar dawwir dawwir|دورت دور دور دور", { obj: '3ala' }],
    choose: ["5tirt 5taar 5taar 5taar|اخترت اختار ختار اختار", { past: 'chose', pp: 'chosen', lv: 'i', ms: '5tiyaar|اختيار' }],
    pick: ["5tirt 5taar 5taar 5taar|اخترت اختار ختار اختار", { lv: 'i' }],
    decide: ["garrart garrar garrir garrir|قررت قرر قرر قرر", {}],
    agree: ["waafagt waafag waafig waafig|وافقت وافق وافق وافق", { with: '3ala' }],
    worry: ["7aateet 7aata 7aati 7aati|حاتيت حاتى حاتي حات", {}],
    miss: ["shtigt shtaag shtaag -|اشتقت اشتاق شتاق -", { lv: 'i', obj: 'li' }],
    visit: ["zirt zaar zoor zoor|زرت زار زور زور", { ms: 'ziyaara|زيارة' }],
    enjoy: ["stamta3t stamta3 stamti3 istamti3|استمتعت استمتع ستمتع استمتع", { lv: 'i', obj: 'b' }],
    prefer: ["fa9'9'alt fa9'9'al fa9'9'il fa9'9'il|فضلت فضل فضل فضل", {}],
    clean: ["na6'6'aft na6'6'af na6'6'if na6'6'if|نظفت نظف نظف نظف", { ms: "tan6'eef|تنظيف" }],
    cook: ["6aba5t 6aba5 6ba5 i6ba5|طبخت طبخ طبخ اطبخ", { lv: 'i', ms: '6ab5|طبخ' }],
    wash: ["3'asalt 3'asal 3'sil i3'sil|غسلت غسل غسل اغسل", { lv: 'i' }],
    sing: ["3'anneet 3'anna 3'anni 3'anni|غنيت غنى غني غن", { past: 'sang', pp: 'sung', ms: "3'ina|غنا" }],
    dance: ["raga9t raga9 rgi9 irgi9|رقصت رقص رقص ارقص", { lv: 'i', ms: 'rag9|رقص' }],
    swim: ["sibi7t sibi7 sba7 isba7|سبحت سبح سبح اسبح", { past: 'swam', pp: 'swum', lv: 'i', ms: 'sibaa7a|سباحة' }],
    fly: ["6irt 6aar 6eer 6eer|طرت طار طير طير", { past: 'flew', pp: 'flown', to: 'drop' }],
    carry: ["shalleet shall shill shill|شليت شل شل شل", {}],
    move: ["7arrakt 7arrak 7arrik 7arrik|حركت حرك حرك حرك", {}],
    put: ["7a66eet 7a66 7i66 7i66|حطيت حط حط حط", { past: 'put' }],
    keep: ["5alleet 5alla 5alli 5alli|خليت خلى خلي خل", { past: 'kept' }],
    let: ["5alleet 5alla 5alli 5alli|خليت خلى خلي خل", { past: 'let' }],
    show: ["warreet warra warri warri|وريت ورى وري ور", { pp: 'shown', to: 'drop' }],
    explain: ["shara7t shara7 shra7 ishra7|شرحت شرح شرح اشرح", { lv: 'i', to: 'li', ms: 'shar7|شرح' }],
    mean: ["ga9adt ga9ad g9id ig9id|قصدت قصد قصد اقصد", { past: 'meant', lv: 'i' }],
    happen: ["- 9aar 9eer -|- صار صير -", { to: 'li' }],
    become: ["9irt 9aar 9eer 9eer|صرت صار صير صير", { past: 'became', pp: 'become' }],
    rest: ["rtaa7eet rtaa7 rtaa7 irtaa7|ارتحت ارتاح رتاح ارتاح", { lv: 'i' }],
    hit: ["6aggeet 6agg 6igg 6igg|طقيت طق طق طق", { past: 'hit' }],
    arrive: ["wa9alt wa9al w9al -|وصلت وصل وصل -", { lv: 'i', to: 'drop' }],
    reach: ["wa9alt wa9al w9al -|وصلت وصل وصل -", { lv: 'i', to: 'drop' }],
    'turn on': ["sha3'3'alt sha3'3'al sha3'3'il sha3'3'il|شغلت شغل شغل شغل", {}],
    'turn off': ["6ifeet 6ifa 6fi i6fi|طفيت طفى طفي اطف", { lv: 'i' }],
    stand: ["wigaft wigaf wgaf owgaf|وقفت وقف وقف اوقف", { past: 'stood', lv: 'i' }],
    message: ["raasalt raasal raasil raasil|راسلت راسل راسل راسل", {}],
    text: ["raasalt raasal raasil raasil|راسلت راسل راسل راسل", {}],
    care: ["htammeet htamm htamm htamm|اهتميت اهتم هتم اهتم", { lv: 'i', about: 'b' }],
    cost: ["- kallaf kallif -|- كلف كلف -", { past: 'cost' }],
    continue: ["kammalt kammal kammil kammil|كملت كمل كمل كمل", {}],
    spend: ["9araft 9araf 9rif i9rif|صرفت صرف صرف اصرف", { past: 'spent', lv: 'i' }],
    order: ["6alabt 6alab 6lub i6lub|طلبت طلب طلب اطلب", { lv: 'i' }],
    smile: ["tbassamt tbassam tbassam tbassam|تبسمت تبسم تبسم تبسم", { lv: 'i' }],
    hide: ["5abbeet 5abba 5abbi 5abbi|خبيت خبى خبي خب", { past: 'hid', pp: 'hidden' }],
    record: ["sajjalt sajjal sajjil sajjil|سجلت سجل سجل سجل", { ms: 'tasjeel|تسجيل' }],
    register: ["sajjalt sajjal sajjil sajjil|سجلت سجل سجل سجل", {}],
    dub: ["dablajt dablaj dablij dablij|دبلجت دبلج دبلج دبلج", { ms: 'dablaja|دبلجة' }],
    edit: ["3addalt 3addal 3addil 3addil|عدلت عدل عدل عدل", { ms: 'ta3deel|تعديل' }],
    program: ["barmajt barmaj barmij barmij|برمجت برمج برمج برمج", { ms: 'barmaja|برمجة' }],
    code: ["barmajt barmaj barmij barmij|برمجت برمج برمج برمج", { ms: 'barmaja|برمجة' }],
    develop: ["6awwart 6awwar 6awwir 6awwir|طورت طور طور طور", { ms: 'ta6weer|تطوير' }],
    trust: ["withigt withig thig -|وثقت وثق ثق -", { lv: 'i', obj: 'fi' }],
    'give up': ["staslamt staslam staslim istaslim|استسلمت استسلم ستسلم استسلم", { past: 'gave', pp: 'given', lv: 'i' }],
    farm: ["farramt farram farrim farrim|فرمت فرم فرم فرم", { ms: 'farm|فارم' }],
    practice: ["tmarrant tmarran tmarran tmarran|تمرنت تمرن تمرن تمرن", { lv: 'i', ms: 'tamreen|تمرين' }],
    practise: ["tmarrant tmarran tmarran tmarran|تمرنت تمرن تمرن تمرن", { lv: 'i', ms: 'tamreen|تمرين' }],
    improve: ["6awwart 6awwar 6awwir 6awwir|طورت طور طور طور", { ms: 'ta6weer|تطوير' }],
    publish: ["nashart nashar nshir inshir|نشرت نشر نشر انشر", { lv: 'i', ms: 'nashr|نشر' }],
    grind: ["farramt farram farrim farrim|فرمت فرم فرم فرم", { past: 'ground' }],
    rain: ["- ma6arat m6ir -|- مطرت مطر -", { lv: 'i' }],
    crash: ["6i7t 6aa7 6ee7 6ee7|طحت طاح طيح طيح", {}],
    connect: ["itti9alt itti9al tti9il itti9il|اتصلت اتصل تصل اتصل", { lv: 'i', to: 'b', with: 'b' }],
    grow: ["kibart kibar kbar ikbar|كبرت كبر كبر اكبر", { past: 'grew', pp: 'grown', lv: 'i' }],
    joke: ["miza7t miza7 mza7 imza7|مزحت مزح مزح امزح", { lv: 'i' }],
    kid: ["miza7t miza7 mza7 imza7|مزحت مزح مزح امزح", { lv: 'i' }],
    'log in': ["dasheet dash dish dish|دشيت دش دش دش", { past: 'logged' }],
    'log into': ["dasheet dash dish dish|دشيت دش دش دش", { past: 'logged' }],
    'sign in': ["dasheet dash dish dish|دشيت دش دش دش", {}],
    'log out': ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { past: 'logged', lv: 'i', of: 'min' }],
    'log off': ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { past: 'logged', lv: 'i' }],
    'sign out': ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { lv: 'i' }],
    'sign up': ["sajjalt sajjal sajjil sajjil|سجلت سجل سجل سجل", {}],
    'get back': ["rija3t rija3 rja3 irja3|رجعت رجع رجع ارجع", { past: 'got', pp: ['gotten', 'got'], lv: 'i', to: 'drop' }],
    excel: ["abda3t abda3 bdi3 -|أبدعت أبدع بدع -", { lv: 'i' }],
    attempt: ["7aawalt 7aawal 7aawil 7aawil|حاولت حاول حاول حاول", {}],
    ponder: ["fakkart fakkar fakkir fakkir|فكرت فكر فكر فكر", { about: 'fi', of: 'fi' }],
    know_p: ["3araft 3araf 3arf -|عرفت عرف عرف -", { lv: 'a' }],
    ask_to: ["6alabt 6alab 6lub i6lub|طلبت طلب طلب اطلب", { lv: 'i', obj: 'min' }],
    borrow: ["5adht 5adh aa5idh 5idh|خذت خذ اخذ خذ", {}],
    lend: ["sallaft sallaf sallif sallif|سلفت سلف سلف سلف", { past: 'lent', io: 'li' }],
    remind: ["dhakkart dhakkar dhakkir dhakkir|ذكرت ذكر ذكر ذكر", { of: 'b' }],
    drop: ["6ayya7t 6ayya7 6ayyi7 6ayyi7|طيحت طيح طيح طيح", {}],
    hack: ["hakkart hakkar hakkir hakkir|هكرت هكر هكر هكر", {}],
    'calm down': ["haddait hadda haddi haddi|هديت هدى هدي هدي", {}],
    relax: ["rawwagt rawwag rawwig rawwig|روقت روق روق روق", {}],
    stream: ["=do", { tail: 'stream|ستريم' }],
    click: ["9'3'a6t 9'3'a6 9'3'a6 i9'3'a6|ضغطت ضغط ضغط اضغط", { lv: 'i', on: '3ala' }],
    press: ["9'3'a6t 9'3'a6 9'3'a6 i9'3'a6|ضغطت ضغط ضغط اضغط", { lv: 'i', on: '3ala' }],
    freeze: ["3allagt 3allag 3allig 3allig|علقت علق علق علق", { past: 'froze', pp: 'frozen' }],
    lag: ["3allagt 3allag 3allig 3allig|علقت علق علق علق", {}],
    overheat: ["s5ant s5an s5an is5an|سخنت سخن سخن اسخن", { lv: 'i' }],
    pass: ["3addeet 3adda 3addi 3addi|عديت عدى عدي عد", {}],
    fail: ["fishalt fishal fshal ifshal|فشلت فشل فشل افشل", { lv: 'i' }],
    fail_exam: ["rasabt rasab rsib irsib|رسبت رسب رسب ارسب", { lv: 'i', obj: 'fi' }],
    meet_r: ["tlaageet tlaaga tlaaga -|تلاقيت تلاقى تلاقى -", { lv: 'i' }],
    collect: ["jamma3t jamma3 jamma3 jamma3|جمعت جمع جمع جمع", {}],
    rate: ["gayyamt gayyam gayyim gayyim|قيمت قيم قيم قيم", {}],
    sound: ["- - - -|- - - -", { special: 'seem', to: 'li' }],
    seem: ["- - - -|- - - -", { special: 'seem', to: 'li' }],
    'ask for': ["6alabt 6alab 6lub i6lub|طلبت طلب طلب اطلب", { lv: 'i' }],
    chill: ["haddait hadda haddi haddi|هديت هدى هدي هدي", {}],
    'get stuck': ["3allagt 3allag 3allig 3allig|علقت علق علق علق", { past: 'got', pp: 'gotten' }],
    'get banned': ["inbannadt inbannad inbannid -|انبندت انبند انبند -", { past: 'got', pp: 'gotten' }],
    'head to': ["ri7t raa7 roo7 roo7|رحت راح روح روح", { to: 'drop', ap: 'raayi7 raay7a raay7een|رايح رايحة رايحين' }],
    'head home': ["ri7t_il-bait raa7_il-bait roo7_il-bait roo7_il-bait|رحت_البيت راح_البيت روح_البيت روح_البيت", { ap: 'raayi7_il-bait raay7a_il-bait raay7een_il-bait|رايح_البيت رايحة_البيت رايحين_البيت' }],
    'head back': ["rija3t rija3 rja3 irja3|رجعت رجع رجع ارجع", { lv: 'i' }],
    drop_g: ["nazzalt nazzal nazzil nazzil|نزلت نزل نزل نزل", {}],
    freeze: ["3allagt 3allag 3allig 3allig|علقت علق علق علق", { past: 'froze', pp: 'frozen' }],
    'get hacked': ["ithakkart ithakkar ithakkar -|اتهكرت اتهكر اتهكر -", { past: 'got', pp: 'gotten' }],
    'get kicked': ["in6aradt in6arad in6irid -|انطردت انطرد انطرد -", { past: 'got', pp: 'gotten' }],
    'get lost': ["9'i3t 9'aa3 9'ee3 -|ضعت ضاع ضيع -", { past: 'got', pp: 'gotten' }],
    'get tired': ["ti3abt ti3ab t3ab -|تعبت تعب تعب -", { past: 'got', pp: 'gotten' }],
    'get bored': ["mallait mall mall -|مليت مل مل -", { past: 'got', pp: 'gotten' }],
    'get angry': ["3a9abt 3a9ab 3a9ib -|عصبت عصب عصب -", { past: 'got', pp: 'gotten' }],
    'get mad': ["3a9abt 3a9ab 3a9ib -|عصبت عصب عصب -", { past: 'got', pp: 'gotten' }],
    'get sick': ["mari9't mira9' mra9' -|مرضت مرض مرض -", { past: 'got', pp: 'gotten' }],
    'get scared': ["5ift 5aaf 5aaf -|خفت خاف خاف -", { past: 'got', pp: 'gotten' }],
    'get married': ["tzawwajt tzawwaj tzawwaj -|تزوجت تزوج تزوج -", { past: 'got', pp: 'gotten' }],
    'get late': ["t2a55art t2a55ar t2a55ar -|تأخرت تأخر تأخر -", { past: 'got', pp: 'gotten' }],
    'get better': ["9irt_a7san 9aar_a7san 9eer_a7san -|صرت_أحسن صار_أحسن صير_أحسن -", { past: 'got', pp: 'gotten' }],
    'get worse': ["9irt_aswa 9aar_aswa 9eer_aswa -|صرت_أسوأ صار_أسوأ صير_أسوأ -", { past: 'got', pp: 'gotten' }],
    'get ready': ["jahhazt jahhaz jahhiz jahhiz|جهزت جهز جهز جهز", { past: 'got', pp: 'gotten' }],
    'set up': ["9'abba6t 9'abba6 9'abbi6 9'abbi6|ضبطت ضبط ضبط ضبط", { past: 'set', pp: 'set' }],
    'pick up': ["liga6t liga6 lgi6 ilgi6|لقطت لقط لقط القط", {}],
    'pick up_p': ["marrait marr murr murr|مريت مر مر مر", { obj: '3ala' }],
    'plug in': ["rakkabt rakkab rakkib rakkib|ركبت ركب ركب ركب", {}],
    unplug: ["fa9alt fa9al f9il if9il|فصلت فصل فصل افصل", { lv: 'i' }],
    disconnect: ["fa9alt fa9al f9il if9il|فصلت فصل فصل افصل", { lv: 'i' }],
    'stay up': ["sihart sihar shar ishar|سهرت سهر سهر اسهر", { lv: 'i' }],
    verify: ["akkadt akkad 2akkid akkid|أكدت أكد أكد أكد", {}],
    confirm: ["akkadt akkad 2akkid akkid|أكدت أكد أكد أكد", {}],
    copy: ["nasa5t nasa5 nsa5 insa5|نسخت نسخ نسخ انسخ", { past: 'copied', lv: 'i' }],
    clear: ["masa7t masa7 msa7 imsa7|مسحت مسح مسح امسح", { lv: 'i' }],
    expect: ["twagga3t twagga3 twagga3 twagga3|توقعت توقع توقع توقع", {}],
    disappear: ["i5tafait i5tafa 5tafi i5tafi|اختفيت اختفى يختفي اختف", {}],
    skip: ["=do", { tail: 'skip|سكب', obj: 'li', objNP: 'li' }],
    'rank up': ["=do", { tail: 'rank_up|رانك_أب', objNP: 'li' }],
    unlock: ["fita7t fita7 fta7 ifta7|فتحت فتح فتح افتح", { lv: 'i' }],
    steal: ["boogt baag boog boog|بوقت باق بوق بوق", { past: 'stole', pp: 'stolen' }],
    'hop on': ["dishait dash dish dish|دشيت دش دش دش", { lv: 'i' }],
    extract: ["fakkeet fakk fikk fikk|فكيت فك فك فك", {}],
    unzip: ["fakkeet fakk fikk fikk|فكيت فك فك فك", {}],
    'go down': ["6i7t 6aa7 6ee7 6ee7|طحت طاح طيح طيح", { past: 'went', pp: 'gone', s: 'goes' }],
    release_i: ["nizalt nizal nzil inzil|نزلت نزل نزل انزل", { lv: 'i' }],
    appreciate: ["shakart shakar shkur ushkur|شكرت شكر شكر اشكر", { lv: 'i' }],
    hurry: ["3ajjalt 3ajjal 3ajjil 3ajjil|عجلت عجل عجل عجل", {}],
    kick: ["6iradt 6irad 6rid i6rid|طردت طرد طرد اطرد", { lv: 'i' }],
    quit: ["battalt battal battil battil|بطلت بطل بطل بطل", { past: 'quit' }],
    separate: ["fa9alt fa9al f9il if9il|فصلت فصل فصل افصل", { lv: 'i' }],
    spawn: ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { lv: 'i' }],
    respawn: ["rija3t rija3 rja3 irja3|رجعت رجع رجع ارجع", { lv: 'i' }],
    heal: ["=do", { tail: 'heal|هيل', obj: 'li' }],
    nerf: ["=do", { tail: 'nerf|نيرف', obj: 'li' }],
    buff: ["=do", { tail: 'buff|بف', obj: 'li' }],
    ban: ["=do", { tail: 'ban|بان', obj: 'li' }],
    carry_g: ["=do", { tail: 'carry|كاري', obj: 'li' }],
    trade: ["baadalt baadal baadil baadil|بادلت بادل بادل بادل", {}],
    troll: ["=do", { tail: 'troll|ترول', obj: '3ala' }],
    'rank up': ["=do", { tail: 'rank_up|رانك_أب', past: 'ranked' }],
    dm: ["raasalt raasal raasil raasil|راسلت راسل راسل راسل", { past: ['dmed', 'dmd'] }],
    pm: ["raasalt raasal raasil raasil|راسلت راسل راسل راسل", { past: ['pmed', 'pmd'] }],
    save_t: ["waffart waffar waffir waffir|وفرت وفر وفر وفر", { io: '3ala' }],
    comment: ["3allagt 3allag 3allig 3allig|علقت علق علق علق", { on: '3ala' }],
    support: ["da3amt da3am d3am id3am|دعمت دعم دعم ادعم", { lv: 'i' }],
    charge: ["shi7ant shi7an sh7an ish7an|شحنت شحن شحن اشحن", { lv: 'i' }],
    respect: ["i7taramt i7taram 7tirim i7tirim|احترمت احترم حترم احترم", { lv: 'i' }],
    report: ["balla3't balla3' balli3' balli3'|بلغت بلغ بلغ بلغ", { obj: '3an' }],
    like_yt: ["=do", { tail: 'like|لايك', obj: 'li' }],
    turn_on: ["sha3'3'alt sha3'3'al sha3'3'il sha3'3'il|شغلت شغل شغل شغل", {}],
    last: ["6awwalt 6awwal 6awwil 6awwil|طولت طول طول طول", {}],
    restart: ["=do", { tail: 'restart|ريستارت', obj: 'li' }],
    reset: ["=do", { tail: 'reset|ريسيت', obj: 'li', past: 'reset' }],
    refresh: ["=do", { tail: 'refresh|ريفرش', obj: 'li' }],
    block: ["=do", { tail: 'block|بلوك', obj: 'li' }],
    unblock: ["=do", { tail: 'unblock|أنبلوك', obj: 'li' }],
    spam: ["=do", { tail: 'spam|سبام', obj: 'li' }],
    screenshot: ["=do", { tail: 'screenshot|سكرين_شوت', obj: 'li', past: ['screenshotted', 'screenshoted'] }],
    'level up': ["=do", { tail: 'level_up|لفل_أب', past: ['leveled', 'levelled'] }],
    have: ["- - - -|- - - -", { past: 'had', pp: 'had', s: 'has', special: 'have' }]
  };

  /* Words that only shape grammar. */
  const BE = { az: ['kint', 'kaan', 'koon', 'koon'], ar: ['كنت', 'كان', 'كون', 'كون'] };
  const GDAR = { az: ['gdart', 'gidar', 'gdar', ''], ar: ['قدرت', 'قدر', 'قدر', ''], lv: 'i' };
  const TRYV = { az: ['7aawalt', '7aawal', '7aawil', '7aawil'], ar: ['حاولت', 'حاول', 'حاول', 'حاول'] };
  const STARTV = { az: ['bideet', 'bida', 'bda', 'ibda'], ar: ['بديت', 'بدا', 'بدا', 'ابدا'], lv: 'i' };
  const KEEPV = { az: ["6'allait", "6'all", "6'all", "6'all"], ar: ['ظليت', 'ظل', 'ظل', 'ظل'], lv: 'a' };
  const KEEP_IMP = { m: ['5allik', 'خلك'], f: ['5alleech', 'خليج'], pl: ['5allookum', 'خلوكم'] };
  const HELPERS = { can: GDAR, try: TRYV, start: STARTV, keep: KEEPV };
  const STILL = { az: 'ba3adni ba3dak ba3dich ba3dkum ba3da ba3ad-ha ba3adna ba3ad-hum', ar: 'بعدني بعدك بعدج بعدكم بعده بعدها بعدنا بعدهم' };
  const TAWW = { az: 'tawni tawwak tawwich tawwkum tawwa tawwha tawwna tawwhum', ar: 'توني توك توج توكم توه توها تونا توهم' };
  const ADJ_PREP = {
    proud: { of: 'b' }, afraid: { of: 'min' }, scared: { of: 'min' }, tired: { of: 'min' }, bored: { of: 'min' }, sure: { about: 'min', of: 'min' },
    good: { at: 'fi' }, bad: { at: 'fi' }, interested: { in: 'b' }, happy: { with: 'b', for: '7ag' }, angry: { at: '3ala', with: '3ala' },
    mad: { at: '3ala' }, ready: { for: '7ag' }, late: { for: '3ala' }, busy: { with: 'b' }, famous: { for: 'b' }, different: { from: '3an' },
    full: { of: '' }, sorry: { for: '3ala', about: '3ala' }, excited: { about: '3ala', for: '3ala' }, sad: { about: '3ala' },
    new: { to: 'fi' }, nice: { to: 'wiyya' }, kind: { to: 'wiyya' }, mean: { to: 'wiyya' }, expensive: { for: '3ala' }, cheap: { for: '3ala' }, hard: { for: '3ala' }, easy: { for: '3ala' }
  };
  const PLACES = new Set(['home', 'house', 'room', 'school', 'office', 'city', 'country', 'place', 'mall', 'shop', 'work', 'hospital',
    'hotel', 'mosque', 'university', 'class', 'party', 'game', 'server', 'group', 'team', 'market', 'meeting']);

  const ADV_RAW = {
    now: "il7een|الحين", today: "il-yoom|اليوم", tomorrow: "bacher|باجر", yesterday: "ams|أمس", tonight: "il-laila|الليلة",
    later: "ba3dain|بعدين", soon: "3ugub shway|عقب شوي", always: "*dayman|دايماً", sometimes: "a7yaanan|أحياناً",
    usually: "*3aadatan|عادةً", often: "*wayed marraat|وايد مرات", again: "marra thaanya|مرة ثانية", also: "*ba3ad|بعد",
    too: "ba3ad|بعد", only: "*bas|بس", just: "*taww|تو", here: "hni|هني", there: "hnaak|هناك", already: "*5alaa9|خلاص",
    still: "*lain il7een|لين الحين", yet: "lain il7een|لين الحين", probably: "*yimkin|يمكن", really: "*9idj|صدج",
    very: "~wayed|وايد", so: "~wayed|وايد", quite: "~wayed|وايد", extremely: "~wayed|وايد", super: "~wayed|وايد",
    totally: "~wayed|وايد", quickly: "bsir3a|بسرعة", slowly: "shway shway|شوي شوي", well: "zain|زين", together: "sawa|سوا", nearby: "greeb|قريب",
    automatically: "b-roo7a|بروحه", accidentally: "bil-3'ala6|بالغلط",
    almost: "*tagreeban|تقريباً", everywhere: "fi kil makaan|في كل مكان", actually: "bil-7ageega|بالحقيقة",
    honestly: "bi9raa7a|بصراحة", anyway: "ma 3alaina|ما علينا", outside: "barra|برا", inside: "daa5il|داخل",
    away: "ba3eed|بعيد", even: "*7atta|حتى", maybe: "yimkin|يمكن", perhaps: "yimkin|يمكن", first: "awwal|أول",
    instead: "badalha|بدالها", once: "marra|مرة", twice: "marratain|مرتين", fast: "bsir3a|بسرعة", hard: "wayed|وايد",
    please: "@law sama7t law sama7ti law sama7tu|لو سمحت لو سمحتي لو سمحتوا", ago: "gabil|قبل", online: "online|أونلاين",
    most: "a3'lab|أغلب", more: "akthar|أكثر", finally: "*a5eeran|أخيراً", ever: "*|", long: "wayed|وايد", below: "ta7t|تحت",
    anymore: "5alaa9|خلاص", kinda: "~shway|شوي", slightly: "~shway|شوي", somewhat: "~shway|شوي", approximately: "tagreeban|تقريباً",
    earlier: "min gabil|من قبل", lately: "hal ayyaam|هالأيام", recently: "min fatra greeba|من فترة قريبة", nowadays: "hal ayyaam|هالأيام", louder: "b9oot a3la|بصوت أعلى", forever: "lil-abad|للأبد"
  };

  const NUM_RAW = {
    one: "wa7id|واحد", two: "ithnain|اثنين", three: "thalaatha|ثلاثة", four: "arba3a|أربعة", five: "5amsa|خمسة",
    six: "sitta|ستة", seven: "sab3a|سبعة", eight: "thamaanya|ثمانية", nine: "tis3a|تسعة", ten: "3ashara|عشرة",
    eleven: "i7da3ash|إحدعش", twelve: "ithna3ash|اثنعش", twenty: "3ishreen|عشرين", hundred: "imya|مية",
    thousand: "alf|ألف", million: "malyoon|مليون",
    thirteen: "13|13", fourteen: "14|14", fifteen: "15|15", sixteen: "16|16", seventeen: "17|17", eighteen: "18|18", nineteen: "19|19",
    thirty: "30|30", forty: "40|40", fifty: "50|50", sixty: "60|60", seventy: "70|70", eighty: "80|80", ninety: "90|90"
  };
  const NUM_VAL = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, twenty: 20, hundred: 100, thousand: 1000, million: 1e6,
    thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };

  /* Fixed expressions. A3(...) = one form each for talking to a man, a woman, a group. Keys are lower case, contractions already opened. */
  const A3 = (m, f, pl) => ({ m, f, pl });
  const FIXED_RAW = {
    'hello': "hala|هلا", 'hi': "hala|هلا", 'hey': "hala|هلا", 'yo': "hala|هلا",
    'hello everyone': "hala bil-jamee3|هلا بالجميع", 'hi everyone': "hala bil-jamee3|هلا بالجميع", 'hi all': "hala bil-jamee3|هلا بالجميع",
    'hello guys': "hala shabaab|هلا شباب", 'hi guys': "hala shabaab|هلا شباب", 'hey guys': "hala shabaab|هلا شباب",
    'welcome': A3("7ayyaak|حياك", "7ayyaach|حياج", "7ayyaakum|حياكم"), 'welcome back': A3("7ayyaak|حياك", "7ayyaach|حياج", "7ayyaakum|حياكم"),
    'welcome to': A3("7ayyaak fi|حياك في", "7ayyaach fi|حياج في", "7ayyaakum fi|حياكم في"),
    'welcome back to': A3("7ayyaak fi|حياك في", "7ayyaach fi|حياج في", "7ayyaakum fi|حياكم في"),
    'what do you think about': A3("shu ra2yak fi|شو رأيك في", "shu ra2yich fi|شو رأيج في", "shu ra2ykum fi|شو رأيكم في"),
    'what do you think of': A3("shu ra2yak fi|شو رأيك في", "shu ra2yich fi|شو رأيج في", "shu ra2ykum fi|شو رأيكم في"),
    'what do you think': A3("shu ra2yak|شو رأيك", "shu ra2yich|شو رأيج", "shu ra2ykum|شو رأيكم"),
    'what does this mean': "shu ya3ni hadha|شو يعني هذا", 'what does that mean': "shu ya3ni hadhaak|شو يعني هذاك",
    'what does it mean': "shu ya3ni|شو يعني", 'sounds good': "zain|زين", 'sounds great': "7ilu|حلو", 'sounds fun': "wanasa|وناسة",
    'dubai': "dbay|دبي", 'abu dhabi': "abu 6'abi|أبوظبي", 'sharjah': "ish-shaarja|الشارقة", 'ajman': "3ajmaan|عجمان",
    'al ain': "il-3ain|العين", 'fujairah': "il-fujaira|الفجيرة", 'ras al khaimah': "ra2s il-5aima|رأس الخيمة",
    'uae': "il-imaaraat|الإمارات", 'the uae': "il-imaaraat|الإمارات", 'emirates': "il-imaaraat|الإمارات",
    'saudi arabia': "is-sa3oodiyya|السعودية", 'saudi': "is-sa3oodiyya|السعودية", 'oman': "3umaan|عمان", 'qatar': "gi6ar|قطر",
    'kuwait': "il-kuwait|الكويت", 'bahrain': "il-ba7rain|البحرين", 'egypt': "ma9ir|مصر", 'america': "amreeka|أمريكا",
    'usa': "amreeka|أمريكا", 'london': "landan|لندن", 'india': "il-hind|الهند", 'japan': "il-yabaan|اليابان",
    'one day': "yoom min il-ayyaam|يوم من الأيام", 'good luck with': "bit-tawfeeg fi|بالتوفيق في",
    'you are right': A3("ma3aak 7agg|معاك حق", "ma3aach 7agg|معاج حق", "ma3aakum 7agg|معاكم حق"),
    'a little': "shway|شوي", 'a bit': "shway|شوي", 'a little bit': "shway|شوي",
    'the most': "akthar shay|أكثر شي", 'most of the time': "a3'lab il-wagt|أغلب الوقت",
    'good morning': "9aba7 il-5air|صباح الخير", 'good afternoon': "masaa2 il-5air|مساء الخير", 'good evening': "masaa2 il-5air|مساء الخير",
    'good night': A3("ti9ba7 3ala 5air|تصبح على خير", "ti9ba7een 3ala 5air|تصبحين على خير", "ti9ba7oon 3ala 5air|تصبحون على خير"),
    'how are you': A3("shlonak|شلونك", "shlonich|شلونج", "shlonkum|شلونكم"),
    'how are you doing': A3("shlonak|شلونك", "shlonich|شلونج", "shlonkum|شلونكم"),
    'how is it going': "shlon il-a5baar|شلون الأخبار", 'what is up': "shu il-a5baar|شو الأخبار", 'what is new': "shu il-yideed|شو اليديد",
    'i am fine': "ana zain|أنا زين", 'i am good': "ana zain|أنا زين", 'i am ok': "ana zain|أنا زين", 'i am okay': "ana zain|أنا زين",
    'thank you': A3("mashkoor|مشكور", "mashkoora|مشكورة", "mashkooreen|مشكورين"), 'thanks': A3("mashkoor|مشكور", "mashkoora|مشكورة", "mashkooreen|مشكورين"),
    'thank you very much': A3("mashkoor wayed|مشكور وايد", "mashkoora wayed|مشكورة وايد", "mashkooreen wayed|مشكورين وايد"),
    'thank you so much': A3("mashkoor wayed|مشكور وايد", "mashkoora wayed|مشكورة وايد", "mashkooreen wayed|مشكورين وايد"),
    'thanks a lot': A3("mashkoor wayed|مشكور وايد", "mashkoora wayed|مشكورة وايد", "mashkooreen wayed|مشكورين وايد"),
    'thank you for': A3("mashkoor 3ala|مشكور على", "mashkoora 3ala|مشكورة على", "mashkooreen 3ala|مشكورين على"),
    'thanks for': A3("mashkoor 3ala|مشكور على", "mashkoora 3ala|مشكورة على", "mashkooreen 3ala|مشكورين على"),
    'you are welcome': "il-3afu|العفو", 'no problem': "ma fi mushkila|ما في مشكلة", 'no worries': "ma fi mushkila|ما في مشكلة",
    'sorry': "aasif|آسف", 'i am sorry': "aasif|آسف", 'i am so sorry': "aasif wayed|آسف وايد", 'so sorry': "aasif wayed|آسف وايد",
    'excuse me': A3("3an idhnak|عن إذنك", "3an idhnich|عن إذنج", "3an idhnkum|عن إذنكم"),
    'yes': "ee|إي", 'yeah': "ee|إي", 'yep': "ee|إي", 'yup': "ee|إي", 'sure': "akeed|أكيد", 'of course': "akeed|أكيد",
    'definitely': "akeed|أكيد", 'no': "la|لا", 'nope': "la|لا", 'nah': "la|لا", 'ok': "tamaam|تمام", 'okay': "tamaam|تمام",
    'alright': "tamaam|تمام", 'all right': "tamaam|تمام", 'i do not know': "ma adri|ما أدري", 'do not know': "ma adri|ما أدري",
    'i have no idea': "ma adri|ما أدري", 'no idea': "ma adri|ما أدري", 'i know': "adri|أدري", 'i see': "fihamt|فهمت",
    'i understand': "fihamt|فهمت", 'got it': "fihamt|فهمت",
    'do not worry': A3("la t7aati|لا تحاتي", "la t7aateen|لا تحاتين", "la t7aatoon|لا تحاتون"),
    'never mind': "3aadi|عادي", 'it is ok': "3aadi|عادي", 'it is okay': "3aadi|عادي", 'it is fine': "3aadi|عادي", 'no big deal': "3aadi|عادي",
    'whatever': "3aadi|عادي", 'it does not matter': "mob muhimm|مب مهم", 'good luck': "bil-tawfeeg|بالتوفيق",
    'congratulations': "mabrook|مبروك", 'congrats': "mabrook|مبروك", 'happy birthday': "3eed meelaad sa3eed|عيد ميلاد سعيد",
    'see you': A3("nshoofak|نشوفك", "nshoofich|نشوفج", "nshoofkum|نشوفكم"),
    'see you later': A3("nshoofak 3ugub|نشوفك عقب", "nshoofich 3ugub|نشوفج عقب", "nshoofkum 3ugub|نشوفكم عقب"),
    'see you soon': A3("nshoofak 3ugub|نشوفك عقب", "nshoofich 3ugub|نشوفج عقب", "nshoofkum 3ugub|نشوفكم عقب"),
    'see you tomorrow': A3("nshoofak bacher|نشوفك باجر", "nshoofich bacher|نشوفج باجر", "nshoofkum bacher|نشوفكم باجر"),
    'bye': "ma3 is-salaama|مع السلامة", 'goodbye': "ma3 is-salaama|مع السلامة", 'bye bye': "ma3 is-salaama|مع السلامة",
    'take care': A3("diir baalak 3ala 7aalak|دير بالك على حالك", "diiri baalich 3ala 7aalich|ديري بالج على حالج", "diiru baalkum 3ala 7aalkum|ديروا بالكم على حالكم"),
    'be careful': A3("diir baalak|دير بالك", "diiri baalich|ديري بالج", "diiru baalkum|ديروا بالكم"),
    'let us go': "yalla nroo7|يلا نروح", 'come on': "yalla|يلا", 'hurry up': A3("3ajjil|عجل", "3ajjili|عجلي", "3ajjilu|عجلوا"),
    'come here': A3("ta3aal hni|تعال هني", "ta3aali hni|تعالي هني", "ta3aalu hni|تعالوا هني"),
    'wait a minute': A3("in6ir shway|انطر شوي", "in6iri shway|انطري شوي", "in6iru shway|انطروا شوي"),
    'wait a second': A3("in6ir shway|انطر شوي", "in6iri shway|انطري شوي", "in6iru shway|انطروا شوي"),
    'one moment': A3("in6ir shway|انطر شوي", "in6iri shway|انطري شوي", "in6iru shway|انطروا شوي"),
    'hold on': A3("in6ir shway|انطر شوي", "in6iri shway|انطري شوي", "in6iru shway|انطروا شوي"),
    'just a moment': A3("in6ir shway|انطر شوي", "in6iri shway|انطري شوي", "in6iru shway|انطروا شوي"),
    'i am coming': "yaay|ياي", 'coming': "yaay|ياي", 'on my way': "fil-6areeg|في الطريق", 'i am on my way': "ana fil-6areeg|أنا في الطريق",
    'i miss you': A3("wa7ashtni|وحشتني", "wa7ashtini|وحشتيني", "wa7ashtooni|وحشتوني"),
    'i love you': A3("a7ibbak|أحبك", "a7ibbich|أحبج", "a7ibbkum|أحبكم"),
    'what is your name': A3("shu ismak|شو اسمك", "shu ismich|شو اسمج", "shu isimkum|شو اسمكم"), 'my name is': "ismi|اسمي",
    'how old are you': A3("cham 3umrak|چم عمرك", "cham 3umrich|چم عمرج", "cham 3umrkum|چم عمركم"),
    'where are you': A3("wainak|وينك", "wainich|وينج", "wainkum|وينكم"),
    'where are you from': A3("min wain inta|من وين إنت", "min wain inti|من وين إنتي", "min wain intu|من وين إنتو"),
    'what are you doing': A3("shu tsawi|شو تسوي", "shu tsaween|شو تسوين", "shu tsawoon|شو تسوون"),
    'what happened': "shu 9aar|شو صار", 'what is wrong': A3("shu feek|شو فيك", "shu feech|شو فيج", "shu feekum|شو فيكم"),
    'what do you mean': A3("shu tag9id|شو تقصد", "shu tag9deen|شو تقصدين", "shu tag9doon|شو تقصدون"),
    'what time is it': "cham is-saa3a|چم الساعة", 'how much': "bcham|بچم", 'how much is it': "bcham|بچم",
    'how much is this': "bcham hadha|بچم هذا", 'how much does it cost': "bcham|بچم", 'i agree': "mitfig|متفق",
    'me too': "wana ba3ad|وأنا بعد", 'me neither': "wana ba3ad|وأنا بعد",
    'what about you': A3("winta|وإنت", "winti|وإنتي", "wintu|وإنتو"), 'and you': A3("winta|وإنت", "winti|وإنتي", "wintu|وإنتو"),
    'how about you': A3("winta|وإنت", "winti|وإنتي", "wintu|وإنتو"), 'what is yours': A3("winta|وإنت", "winti|وإنتي", "wintu|وإنتو"),
    'what about yours': A3("winta|وإنت", "winti|وإنتي", "wintu|وإنتو"), 'how about yours': A3("winta|وإنت", "winti|وإنتي", "wintu|وإنتو"),
    'and yours': A3("winta|وإنت", "winti|وإنتي", "wintu|وإنتو"), 'you too': A3("winta ba3ad|وإنت بعد", "winti ba3ad|وإنتي بعد", "wintu ba3ad|وإنتو بعد"),
    'peace be upon you': "is-salaam 3alaikum|السلام عليكم", 'peace be upon you all': "is-salaam 3alaikum|السلام عليكم", 'salam': "is-salaam 3alaikum|السلام عليكم",
    'salaam': "is-salaam 3alaikum|السلام عليكم", 'salam alaikum': "is-salaam 3alaikum|السلام عليكم", 'salaam alaikum': "is-salaam 3alaikum|السلام عليكم",
    'salam alaykum': "is-salaam 3alaikum|السلام عليكم", 'salam aleikum': "is-salaam 3alaikum|السلام عليكم", 'assalamu alaikum': "is-salaam 3alaikum|السلام عليكم",
    'assalam alaikum': "is-salaam 3alaikum|السلام عليكم", 'assalamu alaykum': "is-salaam 3alaikum|السلام عليكم", 'as salamu alaykum': "is-salaam 3alaikum|السلام عليكم",
    'salamu alaikum': "is-salaam 3alaikum|السلام عليكم", 'salam 3alaikum': "is-salaam 3alaikum|السلام عليكم", 'salam 3alaykum': "is-salaam 3alaikum|السلام عليكم",
    'and peace be upon you': "w3alaikum is-salaam|وعليكم السلام", 'and peace be upon you too': "w3alaikum is-salaam|وعليكم السلام", 'peace be upon you too': "w3alaikum is-salaam|وعليكم السلام",
    'walaikum salam': "w3alaikum is-salaam|وعليكم السلام", 'walaikum assalam': "w3alaikum is-salaam|وعليكم السلام", 'wa alaikum salam': "w3alaikum is-salaam|وعليكم السلام",
    'wa alaikum assalam': "w3alaikum is-salaam|وعليكم السلام", 'walaykum salam': "w3alaikum is-salaam|وعليكم السلام", 'wa alaykum salam': "w3alaikum is-salaam|وعليكم السلام",
    'i am doing well': "ana zain|أنا زين", 'i am doing good': "ana zain|أنا زين", 'i am doing fine': "ana zain|أنا زين", 'i am doing ok': "ana zain|أنا زين",
    'i am doing okay': "ana zain|أنا زين", 'i am doing great': "ana zain wayed|أنا زين وايد", 'doing well': "ana zain|أنا زين", 'doing good': "ana zain|أنا زين",
    'doing fine': "ana zain|أنا زين", 'doing great': "ana zain wayed|أنا زين وايد", 'i am well': "ana zain|أنا زين", 'i am great': "ana zain wayed|أنا زين وايد",
    'i am alright': "ana zain|أنا زين", 'i am all right': "ana zain|أنا زين", 'all good': "kil shay tamaam|كل شي تمام", 'all good here': "kil shay tamaam hni|كل شي تمام هني",
    'nice to meet you too': "ish-sharaf li|الشرف لي", 'nice meeting you too': "ish-sharaf li|الشرف لي", 'glad to meet you too': "ish-sharaf li|الشرف لي",
    'nice meeting you': "tsharrafna|تشرفنا", 'it was nice meeting you': "tsharrafna|تشرفنا", 'glad to meet you': "tsharrafna|تشرفنا", 'pleased to meet you': "tsharrafna|تشرفنا",
    'good to meet you': "tsharrafna|تشرفنا", 'it was nice to meet you': "tsharrafna|تشرفنا",
    'that would be great': "bykoon 7ilu wayed|بيكون حلو وايد", 'that would be nice': "bykoon 7ilu|بيكون حلو", 'that would be awesome': "bykoon 7ilu wayed|بيكون حلو وايد",
    'that would be perfect': "bykoon mumtaaz|بيكون ممتاز", 'that would be amazing': "bykoon 7ilu wayed|بيكون حلو وايد", 'that would be cool': "bykoon 7ilu|بيكون حلو",
    'that will be great': "bykoon 7ilu wayed|بيكون حلو وايد", 'it would be great': "bykoon 7ilu wayed|بيكون حلو وايد", 'would be great': "bykoon 7ilu wayed|بيكون حلو وايد",
    'would be nice': "bykoon 7ilu|بيكون حلو", 'that would be good': "bykoon zain|بيكون زين", 'that would be fine': "bykoon zain|بيكون زين",
    'that is very kind of you': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"), 'that is so kind of you': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"),
    'that is kind of you': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"), 'very kind of you': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"),
    'so kind of you': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"), 'you are too kind': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"),
    'you are so kind': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"), 'you are very kind': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"),
    'that is very nice of you': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"), 'that is nice of you': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"),
    'so nice of you': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"), 'very nice of you': A3("ma tga99ir|ما تقصر", "ma tga99reen|ما تقصرين", "ma tga99roon|ما تقصرون"),
    'i am glad i met you': A3("mistaanis inni t3arraft 3alaik|مستانس إني تعرفت عليك", "mistaanis inni t3arraft 3alaich|مستانس إني تعرفت عليج", "mistaanis inni t3arraft 3alaikum|مستانس إني تعرفت عليكم"),
    'glad i met you': A3("mistaanis inni t3arraft 3alaik|مستانس إني تعرفت عليك", "mistaanis inni t3arraft 3alaich|مستانس إني تعرفت عليج", "mistaanis inni t3arraft 3alaikum|مستانس إني تعرفت عليكم"),
    'i am happy i met you': A3("mistaanis inni t3arraft 3alaik|مستانس إني تعرفت عليك", "mistaanis inni t3arraft 3alaich|مستانس إني تعرفت عليج", "mistaanis inni t3arraft 3alaikum|مستانس إني تعرفت عليكم"),
    'happy i met you': A3("mistaanis inni t3arraft 3alaik|مستانس إني تعرفت عليك", "mistaanis inni t3arraft 3alaich|مستانس إني تعرفت عليج", "mistaanis inni t3arraft 3alaikum|مستانس إني تعرفت عليكم"),
    'i am glad i met you too': A3("wana ba3ad mistaanis inni t3arraft 3alaik|وأنا بعد مستانس إني تعرفت عليك", "wana ba3ad mistaanis inni t3arraft 3alaich|وأنا بعد مستانس إني تعرفت عليج", "wana ba3ad mistaanis inni t3arraft 3alaikum|وأنا بعد مستانس إني تعرفت عليكم"),
    'glad i met you too': A3("wana ba3ad mistaanis inni t3arraft 3alaik|وأنا بعد مستانس إني تعرفت عليك", "wana ba3ad mistaanis inni t3arraft 3alaich|وأنا بعد مستانس إني تعرفت عليج", "wana ba3ad mistaanis inni t3arraft 3alaikum|وأنا بعد مستانس إني تعرفت عليكم"),
    'thanks again': A3("mashkoor marra thaanya|مشكور مرة ثانية", "mashkoora marra thaanya|مشكورة مرة ثانية", "mashkooreen marra thaanya|مشكورين مرة ثانية"),
    'thank you again': A3("mashkoor marra thaanya|مشكور مرة ثانية", "mashkoora marra thaanya|مشكورة مرة ثانية", "mashkooreen marra thaanya|مشكورين مرة ثانية"),
    'in that direction': "dhaak i9-9oob|ذاك الصوب", 'in this direction': "ha9-9oob|هالصوب", 'which direction': "ay 9oob|أي صوب", 'in the other direction': "i9-9oob ith-thaani|الصوب الثاني",
    'the other direction': "i9-9oob ith-thaani|الصوب الثاني",
    'nothing': "wala shay|ولا شي", 'everything': "kil shay|كل شي", 'everyone': "il-kil|الكل", 'everybody': "il-kil|الكل", 'guys': "shabaab|شباب",
    'someone': "a7ad|أحد", 'somebody': "a7ad|أحد", 'something': "shay|شي", 'anything': "ay shay|أي شي", 'nobody': "ma7ad|محد",
    'no one': "ma7ad|محد", 'anyone': "a7ad|أحد", 'anybody': "a7ad|أحد",
    'here you go': A3("tfa9'9'al|تفضل", "tfa9'9'ali|تفضلي", "tfa9'9'alu|تفضلوا"), 'go ahead': A3("tfa9'9'al|تفضل", "tfa9'9'ali|تفضلي", "tfa9'9'alu|تفضلوا"),
    'be right back': "dageega wraaj3|دقيقة وراجع", 'brb': "dageega wraaj3|دقيقة وراجع", 'i will be right back': "dageega wraaj3|دقيقة وراجع",
    'let me know': A3("5abbirni|خبرني", "5abbreeni|خبريني", "5abbrooni|خبروني"),
    'by mistake': "bil-3'ala6|بالغلط", 'by accident': "bil-3'ala6|بالغلط", 'for a bit': "shway|شوي", 'for a little bit': "shway|شوي", 'for a little while': "shway|شوي",
    'i do not care': "ma yhimni|ما يهمني", 'i do not care anymore': "ma yhimni 5alaa9|ما يهمني خلاص", 'i could not care less': "ma yhimni abadan|ما يهمني أبداً",
    'who cares': "min yhimma|من يهمه", 'i do not mind': "ma 3indi maani3|ما عندي مانع", 'do not mind': "ma 3indi maani3|ما عندي مانع",
    'i hope you feel better soon': A3("ma tshoof sharr|ما تشوف شر", "ma tshoofeen sharr|ما تشوفين شر", "ma tshoofoon sharr|ما تشوفون شر"),
    'hope you feel better soon': A3("ma tshoof sharr|ما تشوف شر", "ma tshoofeen sharr|ما تشوفين شر", "ma tshoofoon sharr|ما تشوفون شر"),
    'i hope you feel better': A3("ma tshoof sharr|ما تشوف شر", "ma tshoofeen sharr|ما تشوفين شر", "ma tshoofoon sharr|ما تشوفون شر"),
    'hope you feel better': A3("ma tshoof sharr|ما تشوف شر", "ma tshoofeen sharr|ما تشوفين شر", "ma tshoofoon sharr|ما تشوفون شر"),
    'feel better soon': A3("ma tshoof sharr|ما تشوف شر", "ma tshoofeen sharr|ما تشوفين شر", "ma tshoofoon sharr|ما تشوفون شر"),
    'feel better': A3("ma tshoof sharr|ما تشوف شر", "ma tshoofeen sharr|ما تشوفين شر", "ma tshoofoon sharr|ما تشوفون شر"),
    'since school': "min ayyaam il-madrasa|من أيام المدرسة", 'since high school': "min ayyaam il-madrasa|من أيام المدرسة", 'since college': "min ayyaam il-jaam3a|من أيام الجامعة",
    'since university': "min ayyaam il-jaam3a|من أيام الجامعة", 'tomorrow morning': "bacher i9-9ub7|باجر الصبح", 'yesterday morning': "ams i9-9ub7|أمس الصبح", 'in the morning': "i9-9ub7|الصبح",
    'bet': "tamm|تم", 'say less': "abshir|أبشر", 'skill issue': "skill issue|سكل إشو", 'touch grass': "i6la3 shoof id-dinya|اطلع شوف الدنيا", 'no shot': "musta7eel|مستحيل",
    'my guy': "5ooy|خوي", 'my man': "5ooy|خوي", 'my boy': "5ooy|خوي", 'it is giving': "shakla|شكله", 'cope': "it7ammal|اتحمل", 'cope harder': "it7ammal akthar|اتحمل أكثر",
    'i am cooked': "ri7t feeha|رحت فيها", 'we are cooked': "ri7na feeha|رحنا فيها", 'you are cooked': A3("ri7t feeha|رحت فيها", "ri7ti feeha|رحتي فيها", "ri7tu feeha|رحتوا فيها"),
    'he is cooked': "raa7 feeha|راح فيها", 'she is cooked': "raa7at feeha|راحت فيها", 'they are cooked': "raa7aw feeha|راحوا فيها", 'cooked': "ri7t feeha|رحت فيها",
    'do not be late': A3("la tit2a55ar|لا تتأخر", "la tit2a55areen|لا تتأخرين", "la tit2a55aroon|لا تتأخرون"), 'do not be sad': A3("la tiz3al|لا تزعل", "la tiz3aleen|لا تزعلين", "la tiz3aloon|لا تزعلون"),
    'do not be scared': A3("la t5aaf|لا تخاف", "la t5aafeen|لا تخافين", "la t5aafoon|لا تخافون"), 'do not be afraid': A3("la t5aaf|لا تخاف", "la t5aafeen|لا تخافين", "la t5aafoon|لا تخافون"),
    'do not be shy': A3("la tisti7i|لا تستحي", "la tisti7een|لا تستحين", "la tisti7oon|لا تستحون"), 'do not be stupid': A3("la tkoon 3'abi|لا تكون غبي", "la tkooneen 3'abiyya|لا تكونين غبية", "la tkoonoon a3'biya|لا تكونون أغبية"),
    'do not be mad': A3("la ti3a99ib|لا تعصب", "la ti3a99been|لا تعصبين", "la ti3a99boon|لا تعصبون"), 'do not be angry': A3("la ti3a99ib|لا تعصب", "la ti3a99been|لا تعصبين", "la ti3a99boon|لا تعصبون"),
    'do not be lazy': A3("la tkoon kaslaan|لا تكون كسلان", "la tkooneen kaslaana|لا تكونين كسلانة", "la tkoonoon kaslaaneen|لا تكونون كسلانين"),
    'wait': A3("in6ir|انطر", "in6iri|انطري", "in6iroo|انطروا"), 'hope so': "atmanna|أتمنى", 'i hope so': "atmanna|أتمنى", 'i hope not': "atmanna la|أتمنى لا", 'hope not': "atmanna la|أتمنى لا",
    'i hope': "atmanna|أتمنى", 'find out': "a3arf|أعرف", 'whoever': "illi|اللي", 'whatever you want': "illi tabeeh|اللي تبيه",
    'tell me': A3("gool li|قول لي", "goolee li|قولي لي", "goolu li|قولوا لي"),
    'help me': A3("saa3idni|ساعدني", "saa3deeni|ساعديني", "saa3dooni|ساعدوني"),
    'good game': "gg|gg", 'gg': "gg|gg", 'well done': "3aash|عاش", 'good job': "3aash|عاش", 'nice one': "3aash|عاش", 'great job': "3aash|عاش",
    'oh my god': "ya allah|يا الله", 'omg': "ya allah|يا الله", 'god willing': "insha2allah|إن شاء الله", 'hopefully': "insha2allah|إن شاء الله",
    'inshallah': "insha2allah|إن شاء الله", 'thank god': "il7amdillah|الحمدلله", 'alhamdulillah': "il7amdillah|الحمدلله",
    'i swear': "wallah|والله", 'wallah': "wallah|والله", 'seriously': "9idj|صدج", 'for real': "9idj|صدج", 'no way': "musta7eel|مستحيل",
    'exactly': "bil-9'ab6|بالضبط", 'i think so': "a7sib chidhi|أحسب چذي", 'i do not think so': "ma a7sib|ما أحسب",
    'like this': "chidhi|چذي", 'like that': "chidhi|چذي", 'this way': "chidhi|چذي", 'right now': "il7een|الحين",
    'a lot': "wayed|وايد", 'so much': "wayed|وايد", 'very much': "wayed|وايد", 'too much': "wayed|وايد",
    'all the time': "dayman|دايماً", 'every day': "kil yoom|كل يوم", 'every time': "kil marra|كل مرة", 'at all': "abadan|أبداً",
    'at home': "fil-bait|في البيت", 'at night': "fil-lail|في الليل", 'in the morning': "fil-9ub7|في الصبح",
    'this morning': "il-yoom il-9ub7|اليوم الصبح", 'tonight': "il-laila|الليلة", 'last night': "il-baar7a|البارحة",
    'next week': "il-isboo3 il-yay|الأسبوع الياي", 'last week': "il-isboo3 illi faat|الأسبوع اللي فات", 'next time': "il-marra il-yaaya|المرة الياية",
    'last time': "aa5ir marra|آخر مرة", 'first time': "awwal marra|أول مرة", 'one more time': "marra thaanya|مرة ثانية",
    'once again': "marra thaanya|مرة ثانية", 'for now': "7aaliyyan|حالياً", 'later on': "ba3dain|بعدين", 'as soon as possible': "bsir3a|بسرعة",
    'asap': "bsir3a|بسرعة", 'right away': "il7een|الحين", 'before that': "gabil chidhi|قبل چذي", 'after that': "ba3dain|بعدين",
    'because of that': "3ashaan chidhi|عشان چذي", 'that is why': "3ashaan chidhi|عشان چذي", 'of course not': "akeed la|أكيد لا",
    'not really': "mob wayed|مب وايد", 'not yet': "ba3ad la|بعد لا", 'not now': "mob il7een|مب الحين",
    'be quiet': A3("iskit|اسكت", "iskiti|اسكتي", "iskitu|اسكتوا"), 'shut up': A3("iskit|اسكت", "iskiti|اسكتي", "iskitu|اسكتوا"),
    'nice to meet you': "tsharrafna|تشرفنا", 'how was your day': A3("shlon kaan yoomak|شلون كان يومك", "shlon kaan yoomich|شلون كان يومج", "shlon kaan yoomkum|شلون كان يومكم"),
    'bro': "5ooy|خوي", 'brother': "5ooy|خوي", 'dude': "5ooy|خوي", 'buddy': "5ooy|خوي", 'by the way': "3ala fikra|على فكرة",
    'in my opinion': "bi ra2yi|برأيي", 'to be honest': "bi9raa7a|بصراحة", 'lol': "hhhh|هههه", 'haha': "hhhh|هههه", 'hahaha': "hhhh|هههه",
    'wow': "wow|واو", 'oh': "aah|آه", 'oops': "uffff|أفف", 'ugh': "uffff|أفف", 'please': A3("law sama7t|لو سمحت", "law sama7ti|لو سمحتي", "law sama7tu|لو سمحتوا"),
    'guess what': A3("tadri shu|تدري شو", "tadreen shu|تدرين شو", "tadroon shu|تدرون شو"),
    'make sure to': A3("la tinsa|لا تنسى", "la tinseen|لا تنسين", "la tinsoon|لا تنسون"),
    'like and subscribe': A3("sawwi like wishtirik|سوي لايك واشترك", "sawwi like wishtirki|سوي لايك واشتركي", "sawwu like wishtirku|سووا لايك واشتركوا"),
    'just kidding': "bas amza7|بس أمزح", 'just joking': "bas amza7|بس أمزح", 'jk': "bas amza7|بس أمزح",
    'take care of yourself': A3("diir baalak 3ala 7aalak|دير بالك على حالك", "diiri baalich 3ala 7aalich|ديري بالج على حالج", "diiru baalkum 3ala 7aalkum|ديروا بالكم على حالكم"),
    'take care of yourselves': "diiru baalkum 3ala 7aalkum|ديروا بالكم على حالكم",
    'good morning everyone': "9aba7 il-5air lil-kil|صباح الخير للكل", 'good morning guys': "9aba7 il-5air shabaab|صباح الخير شباب",
    'good evening everyone': "masaa2 il-5air lil-kil|مساء الخير للكل", 'good evening guys': "masaa2 il-5air shabaab|مساء الخير شباب",
    'good night everyone': "ti9ba7oon 3ala 5air|تصبحون على خير", 'good night guys': "ti9ba7oon 3ala 5air|تصبحون على خير",
    'i agree with you': A3("mitfig wiyyaak|متفق وياك", "mitfig wiyyaach|متفق وياج", "mitfig wiyyaakum|متفق وياكم"),
    'sorry for being late': "aasif 3ala it-ta25eer|آسف على التأخير", 'i am sorry for being late': "aasif 3ala it-ta25eer|آسف على التأخير",
    'sorry i am late': "aasif 3ala it-ta25eer|آسف على التأخير", 'sorry for the delay': "aasif 3ala it-ta25eer|آسف على التأخير",
    'sorry for the late reply': "aasif 3ala it-ta25eer bir-radd|آسف على التأخير بالرد", 'i am sorry i am late': "aasif 3ala it-ta25eer|آسف على التأخير",
    'at work': "fil-dawaam|في الدوام", 'from work': "min il-dawaam|من الدوام", 'after work': "ba3d il-dawaam|بعد الدوام",
    'before work': "gabil il-dawaam|قبل الدوام", 'to work': "lil-dawaam|للدوام",
    'on my way home': "fil-6areeg lil-bait|في الطريق للبيت", 'i am on my way home': "ana fil-6areeg lil-bait|أنا في الطريق للبيت",
    'on the way': "fil-6areeg|في الطريق", 'it is late': "il-wagt mit2a55ir|الوقت متأخر", 'it is early': "il-wagt badri|الوقت بدري",
    'birthday party': "7aflat meelaad|حفلة ميلاد", 'open source': "maftoo7 il-ma9dar|مفتوح المصدر",
    'on windows': "3ala windows|على ويندوز", 'for windows': "7ag windows|حق ويندوز", 'on mac': "3ala mac|على ماك", 'on android': "3ala android|على أندرويد",
    'as admin': "ka-admin|كأدمن", 'as an admin': "ka-admin|كأدمن", 'as administrator': "ka-admin|كأدمن",
    'peace': "salaam|سلام", 'peace out': "salaam|سلام", 'stop it': "5alaa9|خلاص", 'smh': "uffff|أفف", 'i know right': "9idj|صدج",
    'ah': "aah|آه", 'ahh': "aah|آه", 'ohh': "aah|آه", 'hmm': "hmm|همم", 'umm': "umm|أمم", 'uh': "umm|أمم", 'damn': "wallah|والله", 'dang': "wallah|والله",
    'sheesh': "wallah|والله", 'deadass': "9idj|صدج", 'lowkey': "bi9raa7a|بصراحة", 'highkey': "9idj|صدج", 'facts': "9idj|صدج", 'true that': "9idj|صدج",
    'same': "wana ba3ad|وأنا بعد", 'same here': "wana ba3ad|وأنا بعد", 'my bad': "3'al6ati|غلطتي", 'probably not': "yimkin la|يمكن لا",
    'you up': A3("inta 9aa7i|إنت صاحي", "inti 9aa7ya|إنتي صاحية", "intu 9aa7een|إنتو صاحين"), 'you there': A3("inta mawjood|إنت موجود", "inti mawjooda|إنتي موجودة", "intu mawjoodeen|إنتو موجودين"),
    'are you there': A3("inta mawjood|إنت موجود", "inti mawjooda|إنتي موجودة", "intu mawjoodeen|إنتو موجودين"), 'back': "rja3t|رجعت", 'i am back': "rja3t|رجعت",
    'help': "saa3dooni|ساعدوني", 'rip': "ya 5asaara|يا خسارة", 'for no reason': "bdoon sabab|بدون سبب", 'non mem': "mob member|مب ممبر", 'non member': "mob member|مب ممبر",
    'nonmem': "mob member|مب ممبر", 'is it worth it': "yistaahil|يستاهل", 'was it worth it': "kaan yistaahil|كان يستاهل",
    'i got banned': "sawwaw li ban|سووا لي بان", 'got banned': "sawwaw li ban|سووا لي بان", 'he got banned': "sawwaw lah ban|سووا له بان",
    'she got banned': "sawwaw lha ban|سووا لها بان", 'they got banned': "sawwaw lhum ban|سووا لهم بان",
    'you got banned': A3("sawwaw lak ban|سووا لك بان", "sawwaw lich ban|سووا لج بان", "sawwaw lkum ban|سووا لكم بان"),
    'let us go': "yalla|يلا", 'lets go': "yalla|يلا", 'here we go': "yalla|يلا", 'that is sick': "hadha 5a6eer|هذا خطير", 'this is sick': "hadha 5a6eer|هذا خطير",
    'can not wait': "ma agdar an6ir|ما أقدر أنطر", 'i can not wait': "ma agdar an6ir|ما أقدر أنطر", 'appreciate it': A3("mashkoor|مشكور", "mashkoora|مشكورة", "mashkooreen|مشكورين"),
    'i appreciate it': A3("mashkoor|مشكور", "mashkoora|مشكورة", "mashkooreen|مشكورين"), 'much appreciated': "mashkoor wayed|مشكور وايد", 'appreciated': "mashkoor|مشكور",
    'talk tomorrow': "nsawlif bacher|نسولف باجر", 'talk later': "nsawlif ba3dain|نسولف بعدين", 'talk soon': "nsawlif 3ugub|نسولف عقب", 'one more thing': "shay thaani|شي ثاني",
    'join my room': "dish ir-room maali|دش الروم مالي", 'room number': "ragam ir-room|رقم الروم", 'the room number': "ragam ir-room|رقم الروم", 'my room number': "ragam ir-room maali|رقم الروم مالي",
    'what is the room number': "shu ragam ir-room|شو رقم الروم", 'what room': "ay room|أي روم", 'which room': "ay room|أي روم", 'one sec': "dageega|دقيقة", 'one second': "dageega|دقيقة",
    'gimme a sec': "dageega|دقيقة", 'give me a sec': "dageega|دقيقة", 'give me a second': "dageega|دقيقة", 'give me a minute': "dageega|دقيقة",
    'one min': "dageega|دقيقة", 'one minute': "dageega|دقيقة", 'brb food': "dageega wraaj3, baakil|دقيقة وراجع، باكل",
    'you got this': A3("tigdar 3alaiha|تقدر عليها", "tigdareen 3alaiha|تقدرين عليها", "tigdaroon 3alaiha|تقدرون عليها"),
    'will do': "basaweeh|بسويه", 'on and off': "mob kil yoom|مب كل يوم", 'a while': "fatra|فترة", 'a long time': "fatra 6aweela|فترة طويلة",
    'i am done with': "malleet min|مليت من", 'i am so done with': "malleet min|مليت من", 'i am done': "5alla9t|خلصت", 'done with': "malleet min|مليت من",
    'glad you like it': A3("mistaanis innah 3ajabak|مستانس إنه عجبك", "mistaanis innah 3ajabich|مستانس إنه عجبج", "mistaanis innah 3ajabkum|مستانس إنه عجبكم"),
    'glad you liked it': A3("mistaanis innah 3ajabak|مستانس إنه عجبك", "mistaanis innah 3ajabich|مستانس إنه عجبج", "mistaanis innah 3ajabkum|مستانس إنه عجبكم"),
    'glad to hear that': "7ilu asma3 chidhi|حلو أسمع چذي", 'happy to help': A3("7ayyaak|حياك", "7ayyaach|حياج", "7ayyaakum|حياكم"), 'glad to help': A3("7ayyaak|حياك", "7ayyaach|حياج", "7ayyaakum|حياكم"),
    'which ones': "ay minhum|أي منهم", 'the ones with': "illi feeha|اللي فيها", 'the one with': "illi feeh|اللي فيه", 'the ones': "illi|اللي",
    'that is how': "chidhi|چذي", 'this is how': "chidhi|چذي", 'windows only': "windows bas|ويندوز بس",
    'windows and mac': "windows wmac|ويندوز وماك", 'makes sense': "mafhoom|مفهوم", 'it makes sense': "mafhoom|مفهوم",
    'what the hell': "shu hal 5arabee6|شو هالخرابيط", 'in real life': "3ala il-7ageega|على الحقيقة", 'as far as i know': "3ala 7asab ma adri|على حسب ما أدري",
    'talk to you later': A3("nsawlif ba3dain|نسولف بعدين", "nsawlif ba3dain|نسولف بعدين", "nsawlif ba3dain|نسولف بعدين"), 'you too': A3("winta ba3ad|وإنت بعد", "winti ba3ad|وإنتي بعد", "wintu ba3ad|وإنتو بعد"),
    'i have to go': "laazim aroo7|لازم أروح", 'af': "wayed|وايد", 'no cap': "9idj|صدج", 'for sure': "akeed|أكيد",
    'it was worth it': "kaan yistaahil|كان يستاهل", 'it is worth it': "yistaahil|يستاهل", 'worth it': "yistaahil|يستاهل",
    'is taking forever': "yaa5idh wagt wayed|ياخذ وقت وايد", 'taking forever': "yaa5idh wagt wayed|ياخذ وقت وايد",
    'have fun': A3("istimti3|استمتع", "istimti3i|استمتعي", "istimti3u|استمتعوا"),
    'see you all': "nshoofkum|نشوفكم", 'see you all tomorrow': "nshoofkum bacher|نشوفكم باجر", 'see you all later': "nshoofkum 3ugub|نشوفكم عقب",
    'thank you all': "mashkooreen kilkum|مشكورين كلكم", 'i love you all': "a7ibbkum kilkum|أحبكم كلكم", 'love you all': "a7ibbkum kilkum|أحبكم كلكم",
    'i miss you all': "wa7ashtooni|وحشتوني", 'what is for dinner': "shu il-3asha|شو العشا", 'what is for lunch': "shu il-3'ada|شو الغدا",
    'what is for breakfast': "shu ir-rayoog|شو الريوق", 'i would love to': "ya rait|يا ريت", 'sounds good to me': "tamaam|تمام",
    'why not': "laish la|ليش لا", 'whatever you want': A3("illi tabeeh|اللي تبيه", "illi tabeena|اللي تبينه", "illi taboona|اللي تبونه"),
    'it is up to you': A3("ir-ra2y ra2yak|الرأي رأيك", "ir-ra2y ra2yich|الرأي رأيج", "ir-ra2y ra2ykum|الرأي رأيكم"),
    'up to you': A3("ir-ra2y ra2yak|الرأي رأيك", "ir-ra2y ra2yich|الرأي رأيج", "ir-ra2y ra2ykum|الرأي رأيكم"),
    'sorry to hear that': "ya 7araam|يا حرام", 'i am sorry to hear that': "ya 7araam|يا حرام", 'that is sad': "hadha y7azzin|هذا يحزن", 'for free': "b-balaash|ببلاش", 'gg wp': "gg wp|gg wp", 'wp': "wp|wp",
    'uae university': "jaam3at il-imaaraat|جامعة الإمارات",
    'thanks to everyone': "shukran lil-kil|شكراً للكل", 'thank you to everyone': "shukran lil-kil|شكراً للكل", 'thanks to all': "shukran lil-kil|شكراً للكل", 'my first time': "awwal marra li|أول مرة لي",
    'it is my first time': "hadhi awwal marra li|هذي أول مرة لي", 'this is my first time': "hadhi awwal marra li|هذي أول مرة لي",
    'wish me luck': A3("id3ili|ادعيلي", "id3eeli|ادعيلي", "id3ooli|ادعولي"),
    'get well soon': A3("salaamtak|سلامتك", "salaamtich|سلامتج", "salaamatkum|سلامتكم"),
    'good luck everyone': "bit-tawfeeg lil-kil|بالتوفيق للكل", 'good luck guys': "bit-tawfeeg shabaab|بالتوفيق شباب",
    'thanks everyone': "mashkooreen kilkum|مشكورين كلكم", 'thank you everyone': "mashkooreen kilkum|مشكورين كلكم",
    'thanks guys': "mashkooreen shabaab|مشكورين شباب", 'thank you guys': "mashkooreen shabaab|مشكورين شباب",
    'thanks everyone for': "mashkooreen kilkum 3ala|مشكورين كلكم على", 'thank you everyone for': "mashkooreen kilkum 3ala|مشكورين كلكم على",
    'thanks guys for': "mashkooreen shabaab 3ala|مشكورين شباب على", 'thank you guys for': "mashkooreen shabaab 3ala|مشكورين شباب على",
    'next month': "ish-shahar il-yay|الشهر الياي", 'next year': "is-sana il-yaaya|السنة الياية", 'last month': "ish-shahar illi faat|الشهر اللي فات",
    'last year': "is-sana illi faatat|السنة اللي فاتت", 'yo guys': "hala shabaab|هلا شباب", 'hey everyone': "hala bil-jamee3|هلا بالجميع",
    'by myself': "broo7i|بروحي", 'by yourself': A3("broo7ak|بروحك", "broo7ich|بروحج", "broo7kum|بروحكم"), 'by himself': "broo7a|بروحه",
    'by herself': "broo7ha|بروحها", 'by ourselves': "broo7na|بروحنا", 'by themselves': "broo7hum|بروحهم", 'by yourselves': "broo7kum|بروحكم",
    'on my own': "broo7i|بروحي", 'on your own': A3("broo7ak|بروحك", "broo7ich|بروحج", "broo7kum|بروحكم"),
    'myself': "nafsi|نفسي", 'yourself': A3("nafsak|نفسك", "nafsich|نفسج", "nafskum|نفسكم"), 'himself': "nafsa|نفسه",
    'herself': "nafs-ha|نفسها", 'itself': "nafsa|نفسه", 'ourselves': "nafsna|نفسنا", 'themselves': "nafs-hum|نفسهم", 'yourselves': "nafskum|نفسكم"
  };

  /* Multi-word grammar pieces (not fixed text). */
  const MULTI = {
    'a lot of': { t: 'quant', q: 'wayed' }, 'lots of': { t: 'quant', q: 'wayed' }, 'plenty of': { t: 'quant', q: 'wayed' },
    'a bit of': { t: 'quant', q: 'shwayya' }, 'a little bit of': { t: 'quant', q: 'shwayya' }, 'a few': { t: 'quant', q: 'kam' },
    'how many': { t: 'quant', q: 'cham' },
    'in front of': { t: 'prep', key: 'giddaam', eng: 'in front of' }, 'next to': { t: 'prep', key: 'yamm', eng: 'next to' },
    'because of': { t: 'prep', key: '3ashaan', eng: 'because of' }, 'instead of': { t: 'prep', key: 'badal', eng: 'instead of' },
    'close to': { t: 'prep', key: 'greeb_min', eng: 'close to' }, 'far from': { t: 'prep', key: 'ba3eed_3an', eng: 'far from' },
    'out of': { t: 'prep', key: 'min', eng: 'out of' }, 'as well': { t: 'adv', az: 'ba3ad', ar: 'بعد' },
    'even though': { t: 'conj', az: "ma3a inn", ar: 'مع إن' }, 'as soon as': { t: 'conj', az: "awwal ma", ar: 'أول ما' },
    'so that': { t: 'conj', az: '3ashaan', ar: 'عشان' }, 'how long': { t: 'wh', w: 'how long' }, 'how well': { t: 'wh', w: 'how' }, 'how good': { t: 'wh', w: 'how' },
    'the one who': { t: 'rel', w: 'who' }, 'the one that': { t: 'rel', w: 'who' }, 'the ones who': { t: 'rel', w: 'who' }, 'the ones that': { t: 'rel', w: 'who' }
  };
  /* Multi-word verb helpers, only when a verb follows. */
  const MODAL_MULTI = {
    'going to': { m: 'will' }, 'have to': { m: 'must' }, 'has to': { m: 'must' }, 'had to': { m: 'must', past: true },
    'need to': { m: 'must' }, 'needs to': { m: 'must' }, 'needed to': { m: 'must', past: true }, 'got to': { m: 'must' },
    'have got to': { m: 'must' }, 'want to': { m: 'want' }, 'wants to': { m: 'want' }, 'wanted to': { m: 'want', past: true },
    'would like to': { m: 'want' }, 'like to': { m: 'like' }, 'likes to': { m: 'like' }, 'love to': { m: 'like' },
    'loves to': { m: 'like' }, 'liked to': { m: 'like', past: true }, 'try to': { m: 'try' }, 'tries to': { m: 'try' },
    'tried to': { m: 'try', past: true }, 'trying to': { m: 'try' }, 'used to': { m: 'used' }, 'able to': { m: 'can' },
    'let us': { m: 'lets' }, 'start to': { m: 'start' }, 'started to': { m: 'start', past: true }, 'begin to': { m: 'start' }
  };

  const AUX = new Set(['am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'do', 'does', 'did', 'have', 'has', 'had']);
  const MODAL = { will: 'will', would: 'will', shall: 'will', can: 'can', could: 'can', should: 'must', must: 'must', may: 'maybe', might: 'maybe' };
  const PRON_SUBJ = { i: '1s', you: '2', he: '3m', she: '3f', it: '3m', we: '1p', they: '3p' };
  const PRON_OBJ = { me: '1s', you: '2', him: '3m', her: '3f', it: '3m', us: '1p', them: '3p' };
  const PRON_POSS = { my: '1s', your: '2', his: '3m', her: '3f', its: '3m', our: '1p', their: '3p' };
  const PRON_OWN = { mine: '1s', yours: '2', hers: '3f', ours: '1p', theirs: '3p', his: '3m', its: '3m' };
  const POSS_TO_OWN = { my: 'mine', your: 'yours', his: 'his', her: 'hers', its: 'its', our: 'ours', their: 'theirs' };
  const DEM = { this: ['hadha', 'هذا'], that: ['hadhaak', 'هذاك'], these: ['hadhola', 'هذولا'], those: ['hadhelaak', 'هذيلاك'] };
  const DET = { the: 'def', a: 'indef', an: 'indef', this: 'this', these: 'this', that: 'that', those: 'that', some: 'some', any: 'any',
    every: 'every', each: 'every', all: 'all', no: 'no', another: 'another', both: 'both', which: 'which', what: 'which', more: 'more', enough: 'enough' };
  const WH = { what: ['shu', 'شو'], where: ['wain', 'وين'], when: ['mita', 'متى'], why: ['laish', 'ليش'], how: ['shlon', 'شلون'],
    who: ['minu', 'منو'], whom: ['minu', 'منو'], which: ['ay', 'أي'], whose: ['maal minu', 'مال منو'], 'how long': ['cham', 'چم'], 'how much': ['cham', 'چم'] };
  const CONJ = { and: ['w', 'و'], but: ['bas', 'بس'], or: ['walla', 'ولا'], because: ['3ashaan', 'عشان'], if: ['law', 'لو'],
    then: ['ba3dain', 'بعدين'], while: ['w', 'و'], until: ['lain', 'لين'], although: ['ma3a inn', 'مع إن'], though: ['ma3a inn', 'مع إن'],
    unless: ['illa idha', 'إلا إذا'], so: ['3ashaan chidhi', 'عشان چذي'], that: ['', ''], whenever: ['kil ma', 'كل ما'], wherever: ['wain ma', 'وين ما'],
    whether: ['idha', 'إذا'], despite: ["ra3'm", 'رغم'], once: ['awwal ma', 'أول ما'], whereas: ['bainama', 'بينما'] };
  const PREP = { in: 'fi', at: 'fi', into: 'fi', on: '3ala', onto: '3ala', to: '7ag', for: '7ag', from: 'min', with: 'wiyya',
    about: '3an', by: 'b', without: 'bdoon', like: 'mithil', after: 'ba3d', before: 'gabil', during: 'wagt', under: 'ta7t',
    over: 'foog', above: 'foog', between: 'bain', near: 'greeb_min', behind: 'wara', around: '7awaali', through: 'min',
    till: 'lain', since: 'min', than: 'min', of: 'of', against: "9'idd", toward: '9oob', towards: '9oob', among: 'bain', per: 'kil', via: '3an_6areeg', mid: 'fi_nu9' };
  const PREP_AR = { fi: 'في', '3ala': 'على', '7ag': 'حق', min: 'من', wiyya: 'ويا', '3an': 'عن', b: 'ب', bdoon: 'بدون', mithil: 'مثل',
    ba3d: 'بعد', gabil: 'قبل', wagt: 'وقت', ta7t: 'تحت', foog: 'فوق', bain: 'بين', greeb_min: 'قريب من', wara: 'ورا', '7awaali': 'حوالي',
    lain: 'لين', "9'idd": 'ضد', '9oob': 'صوب', kil: 'كل', '3an_6areeg': 'عن طريق', li: 'ل', '3ind': 'عند', giddaam: 'قدام',
    yamm: 'يم', '3ashaan': 'عشان', badal: 'بدل', ba3eed_3an: 'بعيد عن', fi_nu9: 'في نص' };
  const PREP_PRON = {
    fi: ['feeni feek feech feekum feeh feeha feena feehum', 'فيني فيك فيج فيكم فيه فيها فينا فيهم'],
    '3ala': ['3alay 3alaik 3alaich 3alaikum 3alaih 3alaiha 3alaina 3alaihum', 'علي عليك عليج عليكم عليه عليها علينا عليهم'],
    wiyya: ['wiyyaai wiyyaak wiyyaach wiyyaakum wiyyaah wiyyaaha wiyyaana wiyyaahum', 'وياي وياك وياج وياكم وياه وياها ويانا وياهم'],
    li: ['li lak lich lkum lah lha lna lhum', 'لي لك لج لكم له لها لنا لهم'],
    b: ['bi bik bich bikum bih biha bina bihum', 'بي بك بج بكم به بها بنا بهم'],
    min: ['minni minnak minnich minkum minnah minha minna minhum', 'مني منك منج منكم منه منها منا منهم'],
    '3an': ['3anni 3annak 3annich 3ankum 3annah 3anha 3anna 3anhum', 'عني عنك عنج عنكم عنه عنها عنا عنهم'],
    wara: ['waraai waraak waraach waraakum waraah waraaha waraana waraahum', 'وراي وراك وراج وراكم وراه وراها ورانا وراهم']
  };
  const SUBJ_FORM = { '1s': ['ana', 'أنا'], '2m': ['inta', 'إنت'], '2f': ['inti', 'إنتي'], '2p': ['intu', 'إنتو'], '3m': ['huwa', 'هو'], '3f': ['hiya', 'هي'], '1p': ['i7na', 'إحنا'], '3p': ['hum', 'هم'] };
  const FEAT = { '1s': 'm', '2m': 'm', '2f': 'f', '2p': 'pl', '3m': 'm', '3f': 'f', '1p': 'pl', '3p': 'pl' };
  const SUF_AZ = { '1s': 'i', '2m': 'ak', '2f': 'ich', '2p': 'kum', '3m': 'a', '3f': 'ha', '1p': 'na', '3p': 'hum' };
  const SUF_AR = { '1s': 'ي', '2m': 'ك', '2f': 'ج', '2p': 'كم', '3m': 'ه', '3f': 'ها', '1p': 'نا', '3p': 'هم' };
  const OBJ_AZ = { '1s': 'ni', '2m': 'ak', '2f': 'ich', '2p': 'kum', '3m': 'a', '3f': 'ha', '1p': 'na', '3p': 'hum' };
  const OBJ_AR = { '1s': 'ني', '2m': 'ك', '2f': 'ج', '2p': 'كم', '3m': 'ه', '3f': 'ها', '1p': 'نا', '3p': 'هم' };
  const POSS_OV = { 'brother:1s': ['5ooy', 'خوي'], 'father:1s': ['abooy', 'أبوي'], 'mother:1s': ['ummi', 'أمي'], 'sister:1s': ['u5ti', 'أختي'],
    'brother:2m': ['a5ook', 'أخوك'], 'father:2m': ['ubook', 'أبوك'], 'brother:3m': ['a5ooh', 'أخوه'], 'father:3m': ['ubooh', 'أبوه'] };
  const THAT_VERBS = new Set(['think', 'know', 'say', 'tell', 'hope', 'believe', 'feel', 'mean', 'see', 'hear', 'understand', 'remember', 'forget',
    'realize', 'realise', 'notice', 'guess', 'bet', 'admit', 'promise', 'swear', 'doubt', 'assume', 'suppose', 'expect', 'pretend', 'prove', 'imagine', 'wish', 'decide', 'agree', 'confirm', 'mention', 'learn', 'discover', 'claim', 'conclude', 'ensure', 'insist', 'deny', 'announce', 'argue', 'complain', 'reply', 'warn', 'predict', 'suspect', 'reckon', 'figure', 'sense', 'acknowledge', 'declare', 'reveal', 'indicate', 'suggest', 'recommend', 'request', 'demand']);
  const TIME_NOUNS = new Set(['minute', 'hour', 'day', 'week', 'month', 'year', 'second', 'time', 'night', 'morning']);
  const EXPAND = {
    "i'm": 'i am', im: 'i am', "you're": 'you are', youre: 'you are', "he's": 'he is', hes: 'he is', "she's": 'she is', shes: 'she is', "it's": 'it is',
    youll: 'you will', theyll: 'they will', itll: 'it will', hows: 'how is', whos: 'who is', whens: 'when is', aint: 'is not', hadnt: 'had not',
    "we're": 'we are', "they're": 'they are', theyre: 'they are', "that's": 'that is', thats: 'that is', "what's": 'what is',
    whats: 'what is', "where's": 'where is', wheres: 'where is', "who's": 'who is', "how's": 'how is', "there's": 'there is',
    theres: 'there is', "here's": 'here is', "let's": 'let us', lets: 'let us', "i've": 'i have', ive: 'i have', "you've": 'you have',
    "we've": 'we have', "they've": 'they have', "i'll": 'i will', "you'll": 'you will', "he'll": 'he will', "she'll": 'she will',
    "it'll": 'it will', "we'll": 'we will', "they'll": 'they will', "that'll": 'that will', "i'd": 'i would', "you'd": 'you would',
    "he'd": 'he would', "she'd": 'she would', "we'd": 'we would', "they'd": 'they would', "don't": 'do not', dont: 'do not',
    "doesn't": 'does not', doesnt: 'does not', "didn't": 'did not', didnt: 'did not', "can't": 'can not', cant: 'can not',
    cannot: 'can not', "won't": 'will not', wont: 'will not', "isn't": 'is not', isnt: 'is not', "aren't": 'are not', arent: 'are not',
    "wasn't": 'was not', wasnt: 'was not', "weren't": 'were not', werent: 'were not', "haven't": 'have not', havent: 'have not',
    "hasn't": 'has not', hasnt: 'has not', "hadn't": 'had not', "couldn't": 'could not', couldnt: 'could not', "wouldn't": 'would not',
    wouldnt: 'would not', "shouldn't": 'should not', shouldnt: 'should not', "mustn't": 'must not', "ain't": 'is not',
    gonna: 'going to', wanna: 'want to', gotta: 'have to', lemme: 'let me', gimme: 'give me', kinda: 'kinda', sorta: 'kinda',
    u: 'you', ur: 'your', pls: 'please', plz: 'please', thx: 'thanks', ty: 'thank you', tnx: 'thanks', np: 'no problem',
    idk: 'i do not know', imo: 'in my opinion', btw: 'by the way', tbh: 'to be honest', rn: 'right now', tmrw: 'tomorrow',
    tmr: 'tomorrow', '2day': 'today', '2morrow': 'tomorrow', tonite: 'tonight', b4: 'before', l8r: 'later', gr8: 'great',
    cuz: 'because', coz: 'because', cus: 'because', bc: 'because', msg: 'message', pic: 'picture', pics: 'pictures',
    vid: 'video', vids: 'videos', sec: 'second', secs: 'seconds', mins: 'minutes', hrs: 'hours', hr: 'hour',
    okey: 'okay', k: 'ok', kk: 'ok', bruh: 'bro', wassup: 'what is up', sup: 'what is up', whatsup: 'what is up', dunno: 'do not know', ya: 'you',
    rly: 'really', srsly: 'seriously', prolly: 'probably', prob: 'probably', ye: 'yeah', yh: 'yeah', naw: 'no', soz: 'sorry', wb: 'welcome back',
    ggs: 'gg', ggwp: 'gg wp', lool: 'lol', bby: 'baby', ily2: 'i love you too', thnx: 'thanks', thanx: 'thanks', ppl2: 'people', ik: 'i know', lmk: 'let me know', gtg: 'i have to go', g2g: 'i have to go',
    ttyl: 'talk to you later', cya: 'see you', tysm: 'thank you so much', tyvm: 'thank you very much', yw: 'you are welcome',
    'w/': 'with', 'w/o': 'without', 'b/c': 'because', omw: 'on my way', wyd: 'what are you doing', wya: 'where are you', hru: 'how are you',
    hbu: 'what about you', wbu: 'what about you', ily: 'i love you', gn: 'good night', gm: 'good morning', gl: 'good luck', hf: 'have fun',
    glhf: 'good luck', gj: 'good job', nvm: 'never mind', fr: 'for real', ngl: 'to be honest', idc: 'i do not care', ikr: 'i know right',
    irl: 'in real life', afaik: 'as far as i know', lmao: 'lol', rofl: 'lol', xd: 'lol', lmfao: 'lol', smh: 'smh', wtf: 'what the hell',
    wth: 'what the hell', af: 'af', ppl: 'people', u2: 'you too', thks: 'thanks', ty2: 'thank you too', pls2: 'please'
  };

  /* ====================================================================== */
  /*  Indexes                                                                */
  /* ====================================================================== */
  const PROPER = new Set(['minecraft', 'roblox', 'fortnite', 'steam', 'github', 'google', 'discord', 'telegram', 'whatsapp', 'instagram', 'tiktok', 'twitter',
    'python', 'javascript', 'java', 'playstation', 'xbox', 'nintendo', 'mac', 'android', 'iphone', 'youtube', 'ai']);
  /* ===================================================================== */
  /*  General vocabulary (everyday English, by frequency)                   */
  /* ===================================================================== */
  const X_NOUNS = {
    god: "allah allah m|الله الله", baby: "bebi bebiyaat mh|بيبي بيبيات", wife: "zooja zoojaat fh|زوجة زوجات", husband: "zooj azwaaj mh|زوج أزواج",
    excuse: "3udhur a3dhaar m|عذر أعذار", turn_n: "door adwaar m|دور أدوار", business: "shu3'ul ash3'aal m|شغل أشغال", case: "7aala 7aalaat f|حالة حالات",
    death: "moot moot m|موت موت", deal: "9afga 9afgaat f|صفقة صفقات", body: "jisim ajsaam m|جسم أجسام", moment: "la76'a la7a6'aat f|لحظة لحظات",
    fire: "naar neeraan f|نار نيران", blood: "damm damm m|دم دم", trouble: "mushkila mashaakil f|مشكلة مشاكل", war: "7arb 7uroob f|حرب حروب",
    town: "madeena mudun f|مدينة مدن", half: "nu9 an9aa9 m|نص أنصاص", line: "5a66 5u6oo6 m|خط خطوط", fact: "7ageega 7agaayig f|حقيقة حقايق",
    lord: "rabb rabb m|رب رب", captain: "kaabtin kaabtins mh|كابتن كابتنز", king: "malik mulook mh|ملك ملوك", queen: "malika malikaat fh|ملكة ملكات",
    prince: "ameer umara mh|أمير أمرا", princess: "ameera ameeraat fh|أميرة أميرات", sort: "noo3 anwaa3 m|نوع أنواع", promise: "wa3d w3ood m|وعد وعود",
    parent: "waalid ahal mh|والد أهل", uncle: "3amm a3maam mh|عم أعمام", aunt: "3amma 3ammaat fh|عمة عمات", past: "maa9'i maa9'i m|ماضي ماضي",
    earth: "ar9' ar9' f|أرض أرض", human: "insaan bashar mh|إنسان بشر", murder: "gatl gatl m|قتل قتل", air: "hawa hawa m|هوا هوا",
    lie: "kidhba kidhbaat f|كذبة كذبات", liar: "kadhdhaab kadhdhaabeen mh|كذاب كذابين", sign: "3alaama 3alaamaat f|علامة علامات",
    date: "taari5 tawaaree5 m|تاريخ تواريخ", step: "5u6wa 5u6waat f|خطوة خطوات", piece: "gi63a gi6a3 f|قطعة قطع", land: "ar9' araa9'i f|أرض أراضي",
    foot: "riyil riyool f|ريل ريول", leg: "riyil riyool f|ريل ريول", president: "ra2ees ru2asa mh|رئيس رؤسا", state: "7aala 7aalaat f|حالة حالات",
    law: "gaanoon gawaaneen m|قانون قوانين", choice: "5iyaar 5iyaaraat m|خيار خيارات", wedding: "3irs a3raas m|عرس أعراس", pain: "waja3 awjaa3 m|وجع أوجاع",
    officer: "6'aabi6 6'ubbaa6 mh|ضابط ضباط", kiss: "boosa boosaat f|بوسة بوسات", court: "ma7kama ma7aakim f|محكمة محاكم", ship: "safeena sufun f|سفينة سفن",
    system: "ni6'aam an6'ima m|نظام أنظمة", evidence: "daleel adilla m|دليل أدلة", ride: "mishwaar mashaaweer m|مشوار مشاوير", mouth: "7alg 7loog m|حلق حلوق",
    throat: "7alg 7loog m|حلق حلوق", information: "ma3loomaat ma3loomaat f|معلومات معلومات", info: "ma3loomaat ma3loomaat f|معلومات معلومات",
    security: "amn amn m|أمن أمن", round: "round roundaat m|راوند راوندات", rock: "9a5ra 9u5oor f|صخرة صخور", middle: "nu9 nu9 m|نص نص",
    floor: "ar9' ar9' f|أرض أرض", ring: "5aatim 5awaatim m|خاتم خواتم", bill: "faatoora fawaateer f|فاتورة فواتير", attention: "intibaah intibaah m|انتباه انتباه",
    club: "naadi nawaadi m|نادي نوادي", space: "makaan amaakin m|مكان أماكن", box: "9andoog 9anaadeeg m|صندوق صناديق", marriage: "zawaaj zawaaj m|زواج زواج",
    fear: "5oof 5oof m|خوف خوف", force: "guwwa guwwaat f|قوة قوات", present: "hadiyya hadaaya f|هدية هدايا", crime: "jareema jaraayim f|جريمة جرايم",
    area: "man6iga manaa6ig f|منطقة مناطق", honor: "sharaf sharaf m|شرف شرف", honour: "sharaf sharaf m|شرف شرف", mile: "meel amyaal m|ميل أميال",
    radio: "raadyo raadyohaat m|راديو راديوهات", idiot: "3'abi a3'biya mh|غبي أغبية", surprise: "mufaaja2a mufaaja2aat f|مفاجأة مفاجآت",
    paper: "waraga awraag f|ورقة أوراق", boat: "gaarib gawaarib m|قارب قوارب", bar: "bar baraat m|بار بارات", accident: "7aadith 7awaadith m|حادث حوادث",
    government: "7ukooma 7ukoomaat f|حكومة حكومات", star: "nijma nujoom f|نجمة نجوم", detective: "mu7aggig mu7aggigeen mh|محقق محققين",
    prison: "sijin sjoon m|سجن سجون", jail: "sijin sjoon m|سجن سجون", stick: "3a9a 3u9i f|عصا عصي", afternoon: "3a9ir 3a9ir m|عصر عصر",
    brain: "mu55 am5aa5 m|مخ أمخاخ", service: "5idma 5adamaat f|خدمة خدمات", park: "7adeega 7adaayig f|حديقة حدايق", soul: "roo7 arwaa7 f|روح أرواح",
    agent: "agent agents mh|ايجنت ايجنتس", dress: "fustaan fasaateen m|فستان فساتين", scene: "mashhad mashaahid m|مشهد مشاهد", killer: "gaatil gatala mh|قاتل قتلة",
    ice: "thalj thulooj m|ثلج ثلوج", mess: "fow9'a fow9'a f|فوضى فوضى", church: "kaneesa kanaayis f|كنيسة كنايس", camera: "kaamira kaamiraat f|كاميرا كاميرات",
    card: "kart kuroot m|كرت كروت", girlfriend: "9adeega 9adeegaat fh|صديقة صديقات", boyfriend: "9adeeg a9diga mh|صديق أصدقا",
    smell: "ree7a rawaayi7 f|ريحة روايح", judge: "gaa9'i gu9'aa mh|قاضي قضاة", relationship: "3alaaga 3alaagaat f|علاقة علاقات",
    wall: "6oofa 6eefaan f|طوفة طيفان", seat: "kursi karaasi m|كرسي كراسي", position: "makaan amaakin m|مكان أماكن",
    lieutenant: "mulaazim mulaazimeen mh|ملازم ملازمين", sergeant: "rageeb rugaba mh|رقيب رقبا", colonel: "3ageed 3ugada mh|عقيد عقدا",
    machine: "makeena makaayin f|مكينة مكاين", college: "kulliyya kulliyyaat f|كلية كليات", apartment: "shagga shigag f|شقة شقق", flat: "shagga shigag f|شقة شقق",
    evil: "sharr sharr m|شر شر", professor: "duktoor dakaatra mh|دكتور دكاترة", cop: "shur6i shur6a mh|شرطي شرطة", lawyer: "mu7aami mu7aameen mh|محامي محامين",
    doubt: "shakk shkook m|شك شكوك", village: "garya gura f|قرية قرى", field: "majaal majaalaat m|مجال مجالات", wine: "nabeedh nabeedh m|نبيذ نبيذ",
    beer: "beera beera f|بيرة بيرة", decision: "garaar garaaraat m|قرار قرارات", south: "janoob janoob m|جنوب جنوب", north: "shamaal shamaal m|شمال شمال",
    east: "sharg sharg m|شرق شرق", west: "3'arb 3'arb m|غرب غرب", island: "jazeera juzur f|جزيرة جزر", glass: "kaas kaasaat m|كاس كاسات",
    beginning: "bidaaya bidaayaat f|بداية بدايات", cash: "kaash kaash m|كاش كاش", difference: "farg furoog m|فرق فروق", tree: "shayara shayar f|شيرة شير",
    truck: "shaa7ina shaa7inaat f|شاحنة شاحنات", bear: "dibb dibaba m|دب دببة", board: "looh alwaa7 m|لوح ألواح", magic: "si7r si7r m|سحر سحر",
    partner: "shareek shuraka mh|شريك شركا", wind: "hawa hawa m|هوا هوا", victim: "9'a7iyya 9'a7aaya f|ضحية ضحايا", planet: "kawkab kawaakib m|كوكب كواكب",
    bus: "baa9 baa9aat m|باص باصات", river: "nahar anhaar m|نهر أنهار", kitchen: "ma6ba5 ma6aabi5 m|مطبخ مطابخ", summer: "9aif 9aif m|صيف صيف",
    winter: "shita shita m|شتا شتا", spring: "rabee3 rabee3 m|ربيع ربيع", autumn: "5areef 5areef m|خريف خريف", moon: "gumar gumar m|قمر قمر",
    arm: "dhraa3 dhir3aan m|ذراع ذرعان", address: "3inwaan 3anaaween m|عنوان عناوين", drugs: "mu5addaraat mu5addaraat f|مخدرات مخدرات",
    mission: "muhimma muhimmaat f|مهمة مهمات", heaven: "janna janna f|جنة جنة", race: "sibaag sibaagaat m|سباق سباقات", risk: "5a6ar a56aar m|خطر أخطار",
    smoke: "du55aan du55aan m|دخان دخان", favor: "5idma 5adamaat f|خدمة خدمات", favour: "5idma 5adamaat f|خدمة خدمات", director: "mudeer mudara mh|مدير مدرا",
    guard: "7aaris 7urraas mh|حارس حراس", spot: "makaan amaakin m|مكان أماكن", feeling: "shu3oor mashaa3ir m|شعور مشاعر", dollar: "doolaar doolaaraat m|دولار دولارات",
    dirham: "dirham daraahim m|درهم دراهم", department: "gisim agsaam m|قسم أقسام", duty: "waajib waajibaat m|واجب واجبات", suit: "badla bidal f|بدلة بدل",
    bell: "jaras ajraas m|جرس أجراس", hero: "ba6al ab6aal mh|بطل أبطال", stage: "mar7ala maraa7il f|مرحلة مراحل", witness: "shaahid shuhood mh|شاهد شهود",
    gas: "banzeen banzeen m|بنزين بنزين", petrol: "banzeen banzeen m|بنزين بنزين", fuel: "banzeen banzeen m|بنزين بنزين", energy: "6aaga 6aaga f|طاقة طاقة",
    taste: "6a3am 6a3am m|طعم طعم", form: "istimaara istimaaraat f|استمارة استمارات", hole: "7ufra 7ufar f|حفرة حفر", pressure: "9'a3'6 9'a3'6 m|ضغط ضغط",
    sky: "sama sama f|سما سما", crowd: "za7ma za7ma f|زحمة زحمة", danger: "5a6ar a56aar m|خطر أخطار", memory: "dhaakira dhaakiraat f|ذاكرة ذاكرات",
    memories: "dhikrayaat dhikrayaat f|ذكريات ذكريات", cell: "zinzaana zanaazeen f|زنزانة زنازين", feet: "riyool riyool f|ريول ريول",
    major: "raa2id ruwwaad mh|رائد رواد", general_n: "fareeg furaga mh|فريق فرقا", soldier: "jundi jnood mh|جندي جنود", army: "jaish juyoosh m|جيش جيوش",
    military: "3askariyya 3askariyya f|عسكرية عسكرية", weapon: "silaa7 asli7a m|سلاح أسلحة", enemy: "3adu a3daa mh|عدو أعدا", battle: "ma3raka ma3aarik f|معركة معارك",
    attack: "hujoom hajamaat m|هجوم هجمات", defense: "difaa3 difaa3 m|دفاع دفاع", defence: "difaa3 difaa3 m|دفاع دفاع", peace: "salaam salaam m|سلام سلام",
    orders: "awaamir awaamir f|أوامر أوامر", order_n: "amr awaamir m|أمر أوامر", training: "tadreeb tadreebaat m|تدريب تدريبات", base: "gaa3ida gawaa3id f|قاعدة قواعد",
    camp: "mu3askar mu3askaraat m|معسكر معسكرات", unit: "wi7da wi7daat f|وحدة وحدات", rank_m: "rutba rutab f|رتبة رتب", uniform: "ziyy azyaa m|زي أزياء",
    sister: "u5t a5awaat fh|أخت أخوات", daughter: "bint banaat fh|بنت بنات", son: "wild 3yaal mh|ولد عيال", grandfather: "yadd ydood mh|يد يدود",
    grandmother: "yadda yaddaat fh|يدة يدات", grandpa: "yadd ydood mh|يد يدود", grandma: "yadda yaddaat fh|يدة يدات", nephew: "wild_a5 3yaal_a5 mh|ولد_أخ عيال_أخ",
    niece: "bint_a5 banaat_a5 fh|بنت_أخ بنات_أخ", neighbor: "jaar jeeraan mh|جار جيران", neighbour: "jaar jeeraan mh|جار جيران", stranger: "3'areeb 3'uraba mh|غريب غربا",
    guest: "9'aif 9'yoof mh|ضيف ضيوف", owner: "9aa7ib a97aab mh|صاحب أصحاب", boss_p: "mudeer mudara mh|مدير مدرا", employee: "muwa6'6'af muwa6'6'afeen mh|موظف موظفين",
    customer: "zuboon zabaayin mh|زبون زباين", driver_p: "saayig suwwaag mh|سايق سواق", doctor: "duktoor dakaatra mh|دكتور دكاترة", nurse: "mumarri9'a mumarri9'aat fh|ممرضة ممرضات",
    engineer: "muhandis muhandiseen mh|مهندس مهندسين", teacher: "mudarris mudarriseen mh|مدرس مدرسين", student: "6aalib 6ullaab mh|طالب طلاب", police: "shur6a shur6a f|شرطة شرطة",
    thief: "7araami 7araamiyya mh|حرامي حرامية", criminal: "mujrim mujrimeen mh|مجرم مجرمين", prisoner: "sajeen sujana mh|سجين سجنا", pilot: "6ayyaar 6ayyaareen mh|طيار طيارين",
    chef: "6abbaa5 6abbaa5een mh|طباخ طباخين", waiter: "garsoon garaasna mh|قرصون قراصنة", manager: "mudeer mudara mh|مدير مدرا", artist: "fannaan fannaaneen mh|فنان فنانين",
    singer: "mu3'anni mu3'anniyeen mh|مغني مغنيين", actor: "mumaththil mumaththileen mh|ممثل ممثلين", writer: "kaatib kuttaab mh|كاتب كتاب", author: "kaatib kuttaab mh|كاتب كتاب",
    leader: "leader leaders mh|ليدر ليدرز", member: "3u9'u a39'aa mh|عضو أعضا", expert: "5abeer 5ubara mh|خبير خبرا", genius: "3abgari 3abgariyyeen mh|عبقري عبقريين",
    coward: "jabaan jubana mh|جبان جبنا", loser_: "faashil faashleen mh|فاشل فاشلين", winner: "faayiz faayzeen mh|فايز فايزين", champion: "ba6al ab6aal mh|بطل أبطال",
    hand: "eed eedain f|إيد إيدين", head: "raas roos m|راس روس", face: "wayh wyooh m|ويه ويوه", eye: "3ain 3yoon f|عين عيون", ear: "idhin idhoon f|إذن إذون",
    nose: "5ashim 5shoom m|خشم خشوم", hair: "sha3ar sha3ar m|شعر شعر", tooth: "sinn snoon m|سن سنون", teeth: "snoon snoon m|سنون سنون", heart: "galb gloob m|قلب قلوب",
    stomach: "ba6in b6oon m|بطن بطون", back_n: "6'ahar 6'hoor m|ظهر ظهور", finger: "i9ba3 a9aabi3 m|إصبع أصابع", neck: "ragba rgaab f|رقبة رقاب", skin: "jild jild m|جلد جلد",
    bone: "3a6'am 3i6'aam m|عظم عظام", shoulder: "chatf chtoof m|چتف چتوف", knee: "rukba rukab f|ركبة ركب", chest: "9adr 9udoor m|صدر صدور", voice: "9oot a9waat m|صوت أصوات",
    cold_n: "bard bard m|برد برد", heat: "7arr 7arr m|حر حر", weather: "jaw jaw m|جو جو", rain: "ma6ar am6aar m|مطر أمطار", storm: "3aa9ifa 3awaa9if f|عاصفة عواصف",
    cloud: "sa7aaba s7aab f|سحابة سحاب", snow: "thalj thulooj m|ثلج ثلوج", fog: "9'abaab 9'abaab m|ضباب ضباب", dust: "3'ubaar 3'ubaar m|غبار غبار", sand: "ramil ramil m|رمل رمل",
    desert: "9a7ra 9a7aari f|صحرا صحاري", mountain: "jabal jbaal m|جبل جبال", hill: "tall tlaal m|تل تلال", forest: "3'aaba 3'aabaat f|غابة غابات", lake: "bu7aira bu7airaat f|بحيرة بحيرات",
    ocean: "mu7ee6 mu7ee6aat m|محيط محيطات", wave: "mooja mooj f|موجة موج", fish: "simcha simach f|سمچة سمچ", bird: "6air 6yoor m|طير طيور", horse: "7i9aan 7u9un m|حصان حصن",
    camel: "ba3eer bi3raan m|بعير بعران", goat: "3anz 3nooz f|عنز عنوز", sheep: "5aroof 5irfaan m|خروف خرفان", cow: "bagara bagar f|بقرة بقر", chicken: "dayaaya dayaay f|دياية دياي",
    lion: "asad usood m|أسد أسود", tiger: "nimir nmoor m|نمر نمور", snake: "7anash 7naash m|حنش حناش", spider: "3ankaboot 3anaakib m|عنكبوت عناكب", mouse: "faar feeraan m|فار فيران",
    rat: "jirdi jirdiyya m|جردي جردية", monkey: "gird grood m|قرد قرود", elephant: "feel fyaal m|فيل فيال", wolf: "dheeb dhyaab m|ذيب ذياب", bee: "na7la na7al f|نحلة نحل",
    fly_n: "dhibbaana dhibbaan f|ذبانة ذبان", insect: "7ashara 7asharaat f|حشرة حشرات", animal: "7aywaan 7aywaanaat m|حيوان حيوانات", pet_a: "7aywaan_aleef 7aywaanaat_aleefa m|حيوان_أليف حيوانات_أليفة",
    bread: "5ubz 5ubz m|خبز خبز", rice: "3aish 3aish m|عيش عيش", meat: "la7am la7am m|لحم لحم", egg: "bai9'a bai9' f|بيضة بيض", cheese: "jibin jibin m|جبن جبن",
    milk: "7aleeb 7aleeb m|حليب حليب", sugar: "shakar shakar m|شكر شكر", salt: "mili7 mili7 m|ملح ملح", oil: "zait zyoot m|زيت زيوت", butter: "zibda zibda f|زبدة زبدة",
    fruit: "faakiha fawaakih f|فاكهة فواكه", vegetable: "5u9'aar 5u9'aar m|خضار خضار", apple: "tuffaa7a tuffaa7 f|تفاحة تفاح", banana: "mooza mooz f|موزة موز",
    orange: "burtugaala burtugaal f|برتقالة برتقال", tomato: "6amaa6a 6amaa6 f|طماطة طماط", potato: "bu6aa6a bu6aa6 f|بطاطا بطاط", onion: "ba9al ba9al m|بصل بصل",
    juice: "3a9eer 3a9aayir m|عصير عصاير", cake: "kaik kaikaat m|كيك كيكات", chocolate: "shokolaata shokolaata f|شوكولاتة شوكولاتة", candy: "7alaawa 7alaawiyyaat f|حلاوة حلاويات",
    sweets: "7alawiyyaat 7alawiyyaat f|حلويات حلويات", soup: "shoorba shoorbaat f|شوربة شوربات", salad: "sala6a sala6aat f|سلطة سلطات", sandwich: "sandaweech sandaweechaat m|سندويچ سندويچات",
    burger: "burgar burgaraat m|برقر برقرات", pizza: "beetza beetzaat f|بيتزا بيتزات", lunch: "3'ada 3'ada m|غدا غدا", dinner: "3asha 3asha m|عشا عشا",
    breakfast: "ryoog ryoog m|ريوق ريوق", meal: "wajba wajbaat f|وجبة وجبات", snack: "snaak snaakaat m|سناك سناكات", dessert: "7alaa 7alaa m|حلا حلا",
    plate: "9a7an 9u7oon m|صحن صحون", cup: "koob akwaab m|كوب أكواب", bottle: "gaaroora gawaareer f|قارورة قوارير", spoon: "mil3aga malaa3ig f|ملعقة ملاعق",
    knife: "sicheen sachaacheen f|سچين سچاچين", fork: "shooka shuwak f|شوكة شوك", table: "6aawla 6aawlaat f|طاولة طاولات", chair: "kursi karaasi m|كرسي كراسي",
    bed: "fraash firshaat m|فراش فرشات", sofa: "kanaba kanabaat f|كنبة كنبات", couch: "kanaba kanabaat f|كنبة كنبات", lamp: "lamba lambaat f|لمبة لمبات",
    carpet: "zooliyya zawaali f|زولية زوالي", curtain: "sitaara sataayir f|ستارة ستاير", mirror: "mraaya mraayaat f|مراية مرايات", shelf: "raff rfoof m|رف رفوف",
    drawer: "jaarour jawaareer m|جارور جوارير", closet: "kabat kabataat m|كبت كبتات", wardrobe: "kabat kabataat m|كبت كبتات", bathroom: "7ammaam 7ammaamaat m|حمام حمامات",
    toilet: "7ammaam 7ammaamaat m|حمام حمامات", shower: "dush dushaat m|دش دشات", garage: "garaaj garaajaat m|قراج قراجات", roof: "sa6i7 s6oo7 m|سطح سطوح",
    stairs: "daray daray m|درج درج", elevator: "ma93ad ma9aa3id m|مصعد مصاعد", lift: "ma93ad ma9aa3id m|مصعد مصاعد", gate: "bawwaaba bawwaabaat f|بوابة بوابات",
    key_: "muftaa7 mafaatee7 m|مفتاح مفاتيح", building: "mabna mabaani m|مبنى مباني", tower: "burj abraaj m|برج أبراج", bridge: "jisir jsoor m|جسر جسور",
    road: "6areeg 6urug m|طريق طرق", street: "shaari3 shawaari3 m|شارع شوارع", corner: "zaawya zawaaya f|زاوية زوايا", square: "saa7a saa7aat f|ساحة ساحات",
    market: "soog aswaag m|سوق أسواق", shop: "ma7all ma7allaat m|محل محلات", store: "ma7all ma7allaat m|محل محلات", mall: "mall mallaat m|مول مولات",
    bank: "bank bunook m|بنك بنوك", hospital: "mustashfa mustashfayaat m|مستشفى مستشفيات", pharmacy: "9aidaliyya 9aidaliyyaat f|صيدلية صيدليات", clinic: "3iyaada 3iyaadaat f|عيادة عيادات",
    office: "maktab makaatib m|مكتب مكاتب", company: "sharika sharikaat f|شركة شركات", factory: "ma9na3 ma9aani3 m|مصنع مصانع", farm_n: "mazra3a mazaari3 f|مزرعة مزارع",
    hotel: "fundug fanaadig m|فندق فنادق", cinema: "seenama seenamaat f|سينما سينمات", theater: "masra7 masaari7 m|مسرح مسارح", museum: "mat7af mataa7if m|متحف متاحف",
    library: "maktaba maktabaat f|مكتبة مكتبات", mosque: "masyid masaayid m|مسيد مسايد", stadium: "istaad istaadaat m|استاد استادات", gym: "jim jimaat m|جم جمات",
    pool: "masba7 masaabi7 m|مسبح مسابح", garden: "7adeega 7adaayig f|حديقة حدايق", yard: "7oosh 7eeshaan m|حوش حيشان", parking: "mawgaf mawaagif m|موقف مواقف",
    ticket: "tadhkara tadhaakir f|تذكرة تذاكر", passport: "jawaaz jawaazaat m|جواز جوازات", visa: "veeza veezaat f|فيزا فيزات", license: "ru59a ru5a9 f|رخصة رخص",
    licence: "ru59a ru5a9 f|رخصة رخص", flight: "ri7la ri7laat f|رحلة رحلات", trip: "ri7la ri7laat f|رحلة رحلات", journey: "ri7la ri7laat f|رحلة رحلات",
    vacation: "ijaaza ijaazaat f|إجازة إجازات", holiday: "ijaaza ijaazaat f|إجازة إجازات", luggage: "shuna6 shuna6 f|شنط شنط", suitcase: "shan6a shuna6 f|شنطة شنط",
    plane: "6ayyaara 6ayyaaraat f|طيارة طيارات", airplane: "6ayyaara 6ayyaaraat f|طيارة طيارات", taxi: "taksi taksiyaat m|تاكسي تاكسيات", bike: "daraaja daraajaat f|دراجة دراجات",
    bicycle: "daraaja daraajaat f|دراجة دراجات", motorcycle: "daraaja_naariyya daraajaat_naariyya f|دراجة_نارية دراجات_نارية", train_: "gi6aar gi6aaraat m|قطار قطارات",
    engine_c: "makeena makaayin f|مكينة مكاين", tire: "taayir taayiraat m|تاير تايرات", tyre: "taayir taayiraat m|تاير تايرات", wheel: "3ajala 3ajalaat f|عجلة عجلات",
    seatbelt: "7izaam 7izaamaat m|حزام حزامات", traffic_light: "ishaara ishaaraat f|إشارة إشارات", signal: "ishaara ishaaraat f|إشارة إشارات", speed: "sur3a sur3aat f|سرعة سرعات",
    distance: "masaafa masaafaat f|مسافة مسافات", direction_: "ittijaah ittijaahaat m|اتجاه اتجاهات", map_r: "5aree6a 5araayi6 f|خريطة خرايط", location: "mawgi3 mawaagi3 m|موقع مواقع",
    clothes: "malaabis malaabis f|ملابس ملابس", shirt: "gamee9 gum9aan m|قميص قمصان", pants: "ban6aloon ban6aloonaat m|بنطلون بنطلونات", jeans: "jeenz jeenz m|جينز جينز",
    jacket: "jaakeet jaakeetaat m|جاكيت جاكيتات", coat: "mi36af ma3aa6if m|معطف معاطف", shoe: "joota jawaati f|جوتي جواتي", shoes: "jawaati jawaati f|جواتي جواتي",
    sock: "jooraab jawaareeb m|جوراب جواريب", hat: "gub3a gubba3aat f|قبعة قبعات", cap: "kaab kaabaat m|كاب كابات", glasses: "na6'6'aara na6'6'aaraat f|نظارة نظارات",
    watch_n: "saa3a saa3aat f|ساعة ساعات", belt: "7izaam 7izaamaat m|حزام حزامات", pocket: "jaib jyoob m|جيب جيوب", kandura: "kandoora kanaadeer f|كندورة كنادير",
    abaya: "3abaaya 3abaayaat f|عباية عبايات", scarf: "shaila shailaat f|شيلة شيلات", perfume: "3i6ir 3u6oor m|عطر عطور", soap: "9aaboon 9aaboon m|صابون صابون",
    towel: "foo6a fuwa6 f|فوطة فوط", toothbrush: "furshat_asnaan furash_asnaan f|فرشة_أسنان فرش_أسنان", brush: "fursha furash f|فرشة فرش", comb: "mish6 amshaa6 m|مشط أمشاط",
    medicine: "dawa adwiya m|دوا أدوية", pill: "7abba 7uboob f|حبة حبوب", injection: "ibra ibar f|إبرة إبر", bandage: "9'imaada 9'imaadaat f|ضمادة ضمادات",
    fever: "7araara 7araara f|حرارة حرارة", cough: "ka77a ka77a f|كحة كحة", flu: "influwanza influwanza f|إنفلونزا إنفلونزا", headache: "9udaa3 9udaa3 m|صداع صداع",
    virus: "fayroos fayroosaat m|فايروس فايروسات", disease: "mara9' amraa9' m|مرض أمراض", illness: "mara9' amraa9' m|مرض أمراض", wound: "jur7 jroo7 m|جرح جروح",
    cut_n: "jur7 jroo7 m|جرح جروح", scar: "athar aathaar m|أثر آثار", surgery: "3amaliyya 3amaliyyaat f|عملية عمليات", operation: "3amaliyya 3amaliyyaat f|عملية عمليات",
    appointment: "maw3id mawaa3eed m|موعد مواعيد", meeting: "ijtimaa3 ijtimaa3aat m|اجتماع اجتماعات", interview: "mugaabala mugaabalaat f|مقابلة مقابلات", exam_: "imti7aan imti7aanaat m|امتحان امتحانات",
    homework: "waajib waajibaat m|واجب واجبات", lesson: "dars duroos m|درس دروس", subject: "maadda mawaad f|مادة مواد", grade: "daraja darajaat f|درجة درجات",
    mark_n: "daraja darajaat f|درجة درجات", degree: "shahaada shahaadaat f|شهادة شهادات", certificate: "shahaada shahaadaat f|شهادة شهادات", semester: "fa9l fu9ool m|فصل فصول",
    class_s: "7i99a 7i9a9 f|حصة حصص", schedule: "jadwal jadaawil m|جدول جداول", deadline: "mo3id_nihaa2i mawaa3eed_nihaa2iyya m|موعد_نهائي مواعيد_نهائية",
    salary: "raatib rawaatib m|راتب رواتب", bonus: "boonas boonasaat m|بونص بونصات", tax: "9'areeba 9'araayib f|ضريبة ضرايب", loan: "garo9' guroo9' m|قرض قروض",
    debt: "dain dyoon m|دين ديون", rent: "eejaar eejaaraat m|إيجار إيجارات", insurance: "ta2meen ta2meenaat m|تأمين تأمينات", contract: "3agd 3ugood m|عقد عقود",
    budget: "meezaaniyya meezaaniyyaat f|ميزانية ميزانيات", cost: "takleefa takaaleef f|تكلفة تكاليف", discount: "5a9m 5u9oomaat m|خصم خصومات", sale: "tanzeelaat tanzeelaat f|تنزيلات تنزيلات",
    offer: "3ar9' 3uroo9' m|عرض عروض", receipt: "faatoora fawaateer f|فاتورة فواتير", wallet_: "book bookaat m|بوك بوكات", coin: "3umla 3umlaat f|عملة عملات",
    gold_r: "dhahab dhahab m|ذهب ذهب", silver: "fi9'9'a fi9'9'a f|فضة فضة", diamond: "almaas almaas m|ألماس ألماس", treasure: "kanz kunooz m|كنز كنوز",
    newspaper: "jareeda jaraayid f|جريدة جرايد", magazine: "majalla majallaat f|مجلة مجلات", news: "a5baar a5baar f|أخبار أخبار", article: "magaal magaalaat m|مقال مقالات",
    story: "gi99a gi9a9 f|قصة قصص", novel: "riwaaya riwaayaat f|رواية روايات", poem: "ga9eeda ga9aayid f|قصيدة قصايد", song: "u3'niya a3'aani f|أغنية أغاني",
    movie: "film aflaam m|فلم أفلام", film: "film aflaam m|فلم أفلام", show: "barnaamij baraamij m|برنامج برامج", series: "musalsal musalsalaat m|مسلسل مسلسلات",
    episode: "7alga 7algaat f|حلقة حلقات", season: "mawsim mawaasim m|موسم مواسم", cartoon: "kartoon kartoonaat m|كرتون كرتونات", anime: "anime anime m|أنمي أنمي",
    actor_f: "mumaththila mumaththilaat fh|ممثلة ممثلات", concert: "7afla 7aflaat f|حفلة حفلات", party_e: "7afla 7aflaat f|حفلة حفلات", festival: "mahrajaan mahrajaanaat m|مهرجان مهرجانات",
    culture: "thagaafa thagaafaat f|ثقافة ثقافات", tradition: "taqleed taqaaleed m|تقليد تقاليد", religion: "deen adyaan m|دين أديان", prayer: "9alaa 9alawaat f|صلاة صلوات",
    ramadan: "rama9'aan rama9'aan m|رمضان رمضان", eid: "3eed a3yaad m|عيد أعياد", iftar: "fu6oor fu6oor m|فطور فطور", suhoor: "s7oor s7oor m|سحور سحور",
    nation: "umma umam f|أمة أمم", country_s: "balad bildaan m|بلد بلدان", city: "madeena mudun f|مدينة مدن", capital: "3aa9ima 3awaa9im f|عاصمة عواصم",
    border: "7udood 7udood f|حدود حدود", flag: "3alam a3laam m|علم أعلام", population: "sukkaan sukkaan m|سكان سكان", citizen: "muwaa6in muwaa6ineen mh|مواطن مواطنين",
    language: "lu3'a lu3'aat f|لغة لغات", french_l: "faransi faransi m|فرنسي فرنسي", spanish_l: "isbaani isbaani m|إسباني إسباني", german_l: "almaani almaani m|ألماني ألماني",
    italian_l: "i6aali i6aali m|إيطالي إيطالي", chinese_l: "9eeni 9eeni m|صيني صيني", japanese_l: "yaabaani yaabaani m|ياباني ياباني", korean_l: "koori koori m|كوري كوري",
    russian_l: "roosi roosi m|روسي روسي", turkish_l: "turki turki m|تركي تركي", hindi: "hindi hindi m|هندي هندي", urdu: "urdu urdu m|أردو أردو", arabic_l: "3arabi 3arabi m|عربي عربي", accent: "lahja lahjaat f|لهجة لهجات", letter_: "7arf 7uroof m|حرف حروف", alphabet: "7uroof 7uroof f|حروف حروف",
    number: "ragam argaam m|رقم أرقام", phone_number: "ragam_tilifoon argaam_tilifoonaat m|رقم_تلفون أرقام_تلفونات", email_: "eemail eemailaat m|إيميل إيميلات",
    reply_n: "radd rudood m|رد ردود", answer_n: "jawaab ajwiba m|جواب أجوبة", question_n: "su2aal as2ila m|سؤال أسئلة", opinion_: "ra2y aaraa m|رأي آرا",
    idea_: "fikra afkaar f|فكرة أفكار", plan_n: "5u66a 5u6a6 f|خطة خطط", goal: "hadaf ahdaaf m|هدف أهداف", dream: "7ilm a7laam m|حلم أحلام",
    hope_n: "amal amal m|أمل أمل", luck: "7a6'6' 7a6'6' m|حظ حظ", chance_: "fur9a fura9 f|فرصة فرص", opportunity: "fur9a fura9 f|فرصة فرص",
    secret: "sirr asraar m|سر أسرار", truth: "9idj 9idj m|صدج صدج", excuse_n: "3udhur a3dhaar m|عذر أعذار", reason_: "sabab asbaab m|سبب أسباب",
    purpose: "hadaf ahdaaf m|هدف أهداف", result_: "nateeja nataayij f|نتيجة نتايج", effect: "ta2theer ta2theeraat m|تأثير تأثيرات", situation: "wa9'3 aw9'aa3 m|وضع أوضاع",
    condition: "7aala 7aalaat f|حالة حالات", experience: "5ibra 5ibraat f|خبرة خبرات", skill_: "mahaara mahaaraat f|مهارة مهارات", talent: "mawhiba mawaahib f|موهبة مواهب",
    knowledge: "ma3rifa ma3rifa f|معرفة معرفة", education: "ta3leem ta3leem m|تعليم تعليم", science: "3ilm 3uloom m|علم علوم", history: "taaree5 taaree5 m|تاريخ تاريخ",
    math: "riyaa9'iyyaat riyaa9'iyyaat f|رياضيات رياضيات", maths: "riyaa9'iyyaat riyaa9'iyyaat f|رياضيات رياضيات", physics: "feezya feezya f|فيزيا فيزيا", chemistry: "keemya keemya f|كيميا كيميا",
    biology: "a7yaa a7yaa f|أحيا أحيا", geography: "ju3'raafya ju3'raafya f|جغرافيا جغرافيا", art_: "fann funoon m|فن فنون", music: "mooseega mooseega f|موسيقى موسيقى",
    sport: "riyaa9'a riyaa9'aat f|رياضة رياضات", sports: "riyaa9'a riyaa9'aat f|رياضة رياضات", football: "kora kora f|كورة كورة", soccer: "kora kora f|كورة كورة",
    basketball: "kurat_salla kurat_salla f|كرة_سلة كرة_سلة", tennis: "tinis tinis m|تنس تنس", swimming: "sibaa7a sibaa7a f|سباحة سباحة", running: "jari jari m|جري جري",
    match: "mubaaraa mubaarayaat f|مباراة مباريات", goal_s: "goal goalaat m|قول قولات", team_: "fareeg furag m|فريق فرق", coach: "mudarrib mudarribeen mh|مدرب مدربين",
    referee: "7akam 7ukkaam mh|حكم حكام", fan_s: "mushajji3 mushajji3een mh|مشجع مشجعين", medal: "meedaalya meedaalyaat f|ميدالية ميداليات", trophy: "ka2s ku2oos m|كأس كؤوس",
    tournament: "bu6oola bu6oolaat f|بطولة بطولات", league: "doori dooriyyaat m|دوري دوريات", cup_s: "ka2s ku2oos m|كأس كؤوس", score: "nateeja nataayij f|نتيجة نتايج",
    point_s: "nug6a nuga6 f|نقطة نقط", second_half: "ish-shoo6_ith-thaani ish-shoo6_ith-thaani m|الشوط_الثاني الشوط_الثاني", half_time: "istiraa7a istiraa7aat f|استراحة استراحات",
    computer_: "computer computeraat m|كمبيوتر كمبيوترات", laptop_: "laptop laptopaat m|لابتوب لابتوبات", tablet: "tablet tabletaat m|تابلت تابلتات", mouse_c: "maaws maawsaat m|ماوس ماوسات",
    printer: "6aabi3a 6aabi3aat f|طابعة طابعات", speaker: "sammaa3a sammaa3aat f|سماعة سماعات", headphones: "sammaa3aat sammaa3aat f|سماعات سماعات", headset: "sammaa3a sammaa3aat f|سماعة سماعات",
    microphone: "maik maikaat m|مايك مايكات", mic: "maik maikaat m|مايك مايكات", cable: "wayar wayaraat m|واير وايرات", wire: "wayar wayaraat m|واير وايرات",
    plug: "fisha fishaat f|فيشة فيشات", socket: "fisha fishaat f|فيشة فيشات", switch: "zirr azraar m|زر أزرار", remote: "reemoot reemootaat m|ريموت ريموتات",
    electricity: "kahraba kahraba f|كهربا كهربا", power: "6aaga 6aaga f|طاقة طاقة", signal_w: "shabaka shabakaat f|شبكة شبكات", network: "shabaka shabakaat f|شبكة شبكات",
    website: "mawgi3 mawaagi3 m|موقع مواقع", site: "mawgi3 mawaagi3 m|موقع مواقع", browser: "mutasaffi7 mutasaffi7aat m|متصفح متصفحات", search_n: "ba7th ba7th m|بحث بحث",
    download_n: "ta7meel ta7meelaat m|تحميل تحميلات", upload_n: "raf3 raf3 m|رفع رفع", storage: "misaa7a misaa7aat f|مساحة مساحات", backup: "nus5a_i7tiyaa6iyya nusa5_i7tiyaa6iyya f|نسخة_احتياطية نسخ_احتياطية",
    software: "barnaamij baraamij m|برنامج برامج", hardware: "haardwair haardwair m|هاردوير هاردوير", device: "jihaaz ajhiza m|جهاز أجهزة", gadget: "jihaaz ajhiza m|جهاز أجهزة",
    robot: "roboot robootaat m|روبوت روبوتات", teenager: "muraahig muraahigeen mh|مراهق مراهقين", adult: "baali3' baal3'een mh|بالغ بالغين", elder: "chibeer chbaar mh|چبير چبار",
    dentist: "duktoor_asnaan dakaatrat_asnaan mh|دكتور_أسنان دكاترة_أسنان", surgeon: "jarraa7 jarraa7een mh|جراح جراحين", principal: "mudeer mudara mh|مدير مدرا", dean: "3ameed 3umada mh|عميد عمدا",
    salesman: "baayi3 baa3a mh|بايع باعة", businessman: "rayyal_a3maal rayaayeel_a3maal mh|ريال_أعمال ريايل_أعمال", fiance: "5a6eeb 5u66aab mh|خطيب خطاب", fiancee: "5a6eeba 5a6eebaat fh|خطيبة خطيبات",
    bride: "3aroos 3araayis fh|عروس عرايس", groom: "mi3ris mi3irseen mh|معرس معرسين", widow: "armala araamil fh|أرملة أرامل", grandson: "7afeed a7faad mh|حفيد أحفاد",
    granddaughter: "7afeeda 7afeedaat fh|حفيدة حفيدات", sibling: "a5 i5waan mh|أخ إخوان", relative: "gareeb garaayib mh|قريب قرايب", inlaws: "ahal_iz-zooja ahal_iz-zooja mh|أهل_الزوجة أهل_الزوجة",
    highway: "shaari3_3aamm shawaari3_3aamma m|شارع_عام شوارع_عامة", lane: "masaar masaaraat m|مسار مسارات", alley: "sikka sikak f|سكة سكك", sidewalk: "ra9eef ar9ifa m|رصيف أرصفة",
    roundabout: "dawwaar dawwaaraat m|دوار دوارات", diesel: "deezil deezil m|ديزل ديزل", hood: "bonet bonetaat m|بونيت بونيتات", trunk: "9andoog_is-sayyara 9anaadeeg_is-sayyara m|صندوق_السيارة صناديق_السيارة",
    windshield: "zujaaj_amaami zujaaj_amaami m|زجاج_أمامي زجاج_أمامي", landline: "tilifoon_ar9'i tilifoonaat_ar9'iyya m|تلفون_أرضي تلفونات_أرضية", fax: "faaks faaksaat m|فاكس فاكسات",
    mail: "bareed bareed m|بريد بريد", package: "6ard 6urood m|طرد طرود", envelope: "6'arf 6'uroof m|ظرف ظروف", stamp: "6aabi3 6awaabi3 m|طابع طوابع", riyal: "riyaal riyaalaat m|ريال ريالات", technology: "tiknolojya tiknolojya f|تكنولوجيا تكنولوجيا", internet_: "intarnit intarnit m|إنترنت إنترنت", data: "bayaanaat bayaanaat f|بيانات بيانات",
  };
  const X_ADJS = {
    dear: "3azeez 3azeeza 3azeezeen|عزيز عزيزة عزيزين", safe: "aamin aamna aamneen|آمن آمنة آمنين", special: "mumayyaz mumayyaza mumayyazeen|مميز مميزة مميزين",
    calm: "haadi haadya haadyeen|هادي هادية هاديين", dark: "3'aamig 3'aamga 3'aamgeen|غامق غامقة غامقين", general: "3aamm 3aamma 3aammeen|عام عامة عامين",
    certain: "mu3ayyan mu3ayyana mu3ayyaneen|معين معينة معينين", deep: "3ameeg 3ameega 3ameegeen|عميق عميقة عميقين", personal: "sha59i sha59iyya sha59iyyeen|شخصي شخصية شخصيين",
    private: "5aa9 5aa99a 5aa99een|خاص خاصة خاصين", honest: "9aadig 9aadga 9aadgeen|صادق صادقة صادقين", evil: "shirreer shirreera shirreereen|شرير شريرة شريرين",
    innocent: "baree2 baree2a abriya|بريء بريئة أبريا", guilty: "mudhnib mudhniba mudhnibeen|مذنب مذنبة مذنبين", fat: "simeen simeena simaan|سمين سمينة سمان",
    silly: "sa5eef sa5eefa su5afa|سخيف سخيفة سخفا", fresh: "6aazij 6aazja 6aazjeen|طازج طازجة طازجين", single: "wa7id wa7da wa7deen|واحد واحدة واحدين",
    dangerous: "5a6eer 5a6eera 5a6eereen|خطير خطيرة خطيرين", fair: "3aadil 3aadla 3aadleen|عادل عادلة عادلين", interesting: "mumti3 mumti3a mumti3een|ممتع ممتعة ممتعين",
    lovely: "7ilu 7ilwa 7ilween|حلو حلوة حلوين", surprised: "mitfaaji2 mitfaaj2a mitfaaj2een|متفاجئ متفاجئة متفاجئين", married: "mitzawwij mitzawwija mitzawwijeen|متزوج متزوجة متزوجين",
    allowed: "masmoo7 masmoo7a masmoo7een|مسموح مسموحة مسموحين", locked: "magfool magfoola magfooleen|مقفول مقفولة مقفولين", pregnant: "7aamil 7aamil 7awaamil|حامل حامل حوامل",
    double: "double|دبل", third: "^thaalith|ثالث", fourth: "^raabi3|رابع", fifth: "^5aamis|خامس", sixth: "^saadis|سادس", seventh: "^saabi3|سابع",
    eighth: "^thaamin|ثامن", ninth: "^taasi3|تاسع", tenth: "^3aashir|عاشر", top: "^a7san|أحسن", major_: "chibeer chibeera chbaar|چبير چبيرة چبار", entire: "^kil|كل",
    french: "faransi faransiyya faransiyyeen|فرنسي فرنسية فرنسيين", spanish: "isbaani isbaaniyya isbaaniyyeen|إسباني إسبانية إسبانيين", german: "almaani almaaniyya almaaniyyeen|ألماني ألمانية ألمانيين",
    italian: "i6aali i6aaliyya i6aaliyyeen|إيطالي إيطالية إيطاليين", chinese: "9eeni 9eeniyya 9eeniyyeen|صيني صينية صينيين", japanese: "yaabaani yaabaaniyya yaabaaniyyeen|ياباني يابانية يابانيين",
    korean: "koori kooriyya kooriyyeen|كوري كورية كوريين", russian: "roosi roosiyya roosiyyeen|روسي روسية روسيين", turkish: "turki turkiyya turkiyyeen|تركي تركية تركيين",
    indian: "hindi hindiyya hnood|هندي هندية هنود", pakistani: "baakistaani baakistaaniyya baakistaaniyyeen|باكستاني باكستانية باكستانيين", egyptian: "ma9ri ma9riyya ma9riyyeen|مصري مصرية مصريين",
    emirati: "imaaraati imaaraatiyya imaaraatiyyeen|إماراتي إماراتية إماراتيين", saudi: "si3oodi si3oodiyya si3oodiyyeen|سعودي سعودية سعوديين", american: "amreeki amreekiyya amreekaan|أمريكي أمريكية أمريكان",
    british: "bri6aani bri6aaniyya bri6aaniyyeen|بريطاني بريطانية بريطانيين", arab: "3arabi 3arabiyya 3arab|عربي عربية عرب", foreign: "ajnabi ajnabiyya ajaanib|أجنبي أجنبية أجانب",
    local: "ma7alli ma7alliyya ma7alliyyeen|محلي محلية محليين", national: "wa6ani wa6aniyya wa6aniyyeen|وطني وطنية وطنيين", international: "duwali duwaliyya duwaliyyeen|دولي دولية دوليين",
    tough: "9a3b 9a3ba 9a3been|صعب صعبة صعبين", obvious: "waa9'i7 waa9'7a waa9'7een|واضح واضحة واضحين", clear_: "waa9'i7 waa9'7a waa9'7een|واضح واضحة واضحين",
    wet: "mablool mabloola mablooleen|مبلول مبلولة مبلولين", dry: "naashif naashfa naashfeen|ناشف ناشفة ناشفين", warm: "daafi daafya daafyeen|دافي دافية دافيين",
    cool_t: "baarid baarda baardeen|بارد باردة باردين", loud: "3aali 3aalya 3aalyeen|عالي عالية عاليين", quiet: "haadi haadya haadyeen|هادي هادية هاديين",
    soft: "naa3im naa3ma naa3meen|ناعم ناعمة ناعمين", hard_s: "gaasi gaasya gaasyeen|قاسي قاسية قاسيين", sharp: "7aadd 7aadda 7aaddeen|حاد حادة حادين",
    heavy: "thigeel thigeela thigaal|ثقيل ثقيلة ثقال", light_w: "5afeef 5afeefa 5ifaaf|خفيف خفيفة خفاف", thick: "sameek sameeka sumaak|سميك سميكة سماك",
    thin: "rafee3 rafee3a rfaa3|رفيع رفيعة رفاع", wide: "waasi3 waas3a waas3een|واسع واسعة واسعين", narrow: "9'ayyig 9'ayyga 9'ayygeen|ضيق ضيقة ضيقين",
    tall: "6aweel 6aweela 6waal|طويل طويلة طوال", short_: "ga9eer ga9eera g9aar|قصير قصيرة قصار", round_: "mdawwar mdawwara mdawwareen|مدور مدورة مدورين",
    flat_: "musa66a7 musa66a7a musa66a7een|مسطح مسطحة مسطحين", smooth: "naa3im naa3ma naa3meen|ناعم ناعمة ناعمين", rough: "5ishin 5ishna 5ishneen|خشن خشنة خشنين",
    clean: "na6'eef na6'eefa n6'aaf|نظيف نظيفة نظاف", dirty: "wasi5 was5a was5een|وسخ وسخة وسخين", empty: "faa9'i faa9'ya faa9'yeen|فاضي فاضية فاضيين",
    fake: "mzayyaf mzayyafa mzayyafeen|مزيف مزيفة مزيفين", real_: "7ageegi 7ageegiyya 7ageegiyyeen|حقيقي حقيقية حقيقيين", original: "a9li a9liyya a9liyyeen|أصلي أصلية أصليين",
    modern: "7adeeth 7adeetha 7adeetheen|حديث حديثة حديثين", ancient: "gadeem gadeema gudaam|قديم قديمة قدام", traditional: "taqleedi taqleediyya taqleediyyeen|تقليدي تقليدية تقليديين",
    normal: "3aadi 3aadiyya 3aadiyyeen|عادي عادية عاديين", strange: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين", weird: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين",
    common: "shaayi3 shaay3a shaay3een|شايع شايعة شايعين", rare: "naadir naadra naadreen|نادر نادرة نادرين", popular: "mashhoor mashhoora mashhooreen|مشهور مشهورة مشهورين",
    famous: "mashhoor mashhoora mashhooreen|مشهور مشهورة مشهورين", rich: "3'ani 3'aniyya a3'niya|غني غنية أغنيا", poor: "fageer fageera fugara|فقير فقيرة فقرا",
    cheap: "ra5ee9 ra5ee9a ru5aa9|رخيص رخيصة رخاص", expensive_: "3'aali 3'aalya 3'aalyeen|غالي غالية غاليين", healthy: "9i77i 9i77iyya 9i77iyyeen|صحي صحية صحيين",
    sick_: "maree9' maree9'a mar9'a|مريض مريضة مرضى", alive: "7ayy 7ayya a7yaa|حي حية أحيا", dead_: "mayyit mayyta mayyteen|ميت ميتة ميتين",
    hungry: "yoo3aan yoo3aana yoo3aaneen|يوعان يوعانة يوعانين", thirsty: "3a6shaan 3a6shaana 3a6shaaneen|عطشان عطشانة عطشانين", sleepy: "na3saan na3saana na3saaneen|نعسان نعسانة نعسانين",
    tired_: "ta3baan ta3baana ta3baaneen|تعبان تعبانة تعبانين", lazy: "kaslaan kaslaana kaslaaneen|كسلان كسلانة كسلانين", active_p: "nasheet nashee6a nashee6een|نشيط نشيطة نشيطين",
    strong_: "gawi gawiyya agwiya|قوي قوية أقويا", weak: "9'a3eef 9'a3eefa 9'u3afa|ضعيف ضعيفة ضعفا", brave: "shujaa3 shujaa3a shuj3aan|شجاع شجاعة شجعان",
    shy: "5ajool 5ajoola 5ajooleen|خجول خجولة خجولين", polite: "mu2addab mu2addaba mu2addabeen|مؤدب مؤدبة مؤدبين", rude: "galeel_adab galeelat_adab galeeleen_adab|قليل_أدب قليلة_أدب قليلين_أدب",
    kind_a: "6ayyib 6ayyba 6ayybeen|طيب طيبة طيبين", generous: "kareem kareema kuramaa|كريم كريمة كرما", selfish: "anaani anaaniyya anaaniyyeen|أناني أنانية أنانيين",
    jealous: "3'ayraan 3'ayraana 3'ayraaneen|غيران غيرانة غيرانين", proud_: "fa5oor fa5oora fa5ooreen|فخور فخورة فخورين", confident: "waathig waathga waathgeen|واثق واثقة واثقين",
    nervous: "mutawattir mutawattira mutawattireen|متوتر متوترة متوترين", worried: "galgaan galgaana galgaaneen|قلقان قلقانة قلقانين", excited_: "mit7ammis mit7ammisa mit7ammiseen|متحمس متحمسة متحمسين",
    disappointed: "mu7ba6 mu7ba6a mu7ba6een|محبط محبطة محبطين", embarrassed: "ma7raj ma7raja ma7rajeen|محرج محرجة محرجين", confused: "mi7taar mi7taara mi7taareen|محتار محتارة محتارين",
    comfortable: "murta7 murta7a murta7een|مرتاح مرتاحة مرتاحين", relaxed: "murta7 murta7a murta7een|مرتاح مرتاحة مرتاحين", stressed: "ma9'3'oo6 ma9'3'oo6a ma9'3'oo6een|مضغوط مضغوطة مضغوطين",
    serious: "jaad jaadda jaaddeen|جاد جادة جادين", funny_: "mu9'7ik mu9'7ika mu9'7ikeen|مضحك مضحكة مضحكين", boring_: "mumill mumilla mumilleen|ممل مملة مملين",
    smart_: "dhaki dhakiyya adhkiya|ذكي ذكية أذكيا", stupid_: "3'abi 3'abiyya a3'biya|غبي غبية أغبية", crazy_: "5ibal 5abla 5iblaan|خبل خبلة خبلان",
    wise: "7akeem 7akeema 7ukama|حكيم حكيمة حكما", young: "9i3'eer 9i3'eera 9i3'aar|صغير صغيرة صغار", old_: "chibeer chibeera chbaar|چبير چبيرة چبار",
    handsome: "wiseem wiseema wiseemeen|وسيم وسيمة وسيمين", beautiful: "jameel jameela jameeleen|جميل جميلة جميلين", pretty_: "7ilu 7ilwa 7ilween|حلو حلوة حلوين",
    ugly: "sha3n sha3na sha3neen|شعن شعنة شعنين", cute: "kyoot kyoot kyoot|كيوت كيوت كيوت", perfect_: "mumtaaz mumtaaza mumtaazeen|ممتاز ممتازة ممتازين",
    excellent: "mumtaaz mumtaaza mumtaazeen|ممتاز ممتازة ممتازين", wonderful: "raa2i3 raa2i3a raa2i3een|رائع رائعة رائعين", fantastic: "raa2i3 raa2i3a raa2i3een|رائع رائعة رائعين",
    amazing_: "raa2i3 raa2i3a raa2i3een|رائع رائعة رائعين", incredible: "ma yit9addag ma tit9addag ma yit9addagoon|ما يتصدق ما تتصدق ما يتصدقون", horrible_: "fa6'ee3 fa6'ee3a fa6'ee3een|فظيع فظيعة فظيعين",
    disgusting: "mgazzir mgazzira mgazzireen|مقزز مقززة مقززين", scary: "m5awwif m5awwifa m5awwifeen|مخوف مخوفة مخوفين", creepy: "m5awwif m5awwifa m5awwifeen|مخوف مخوفة مخوفين",
    painful: "y3awwir t3awwir y3awwiroon|يعور تعور يعورون", helpful: "mufeed mufeeda mufeedeen|مفيد مفيدة مفيدين", useful: "mufeed mufeeda mufeedeen|مفيد مفيدة مفيدين",
    useless: "ma yifeed ma tifeed ma yifeedoon|ما يفيد ما تفيد ما يفيدون", important_: "muhimm muhimma muhimmeen|مهم مهمة مهمين", necessary: "9'aroori 9'arooriyya 9'arooriyyeen|ضروري ضرورية ضروريين",
    possible: "mumkin mumkina mumkineen|ممكن ممكنة ممكنين", available: "mawjood mawjooda mawjoodeen|موجود موجودة موجودين", busy_: "mash3'ool mash3'oola mash3'ooleen|مشغول مشغولة مشغولين",
    simple: "basee6 basee6a busa6a|بسيط بسيطة بسطا", complicated: "mu3aggad mu3aggada mu3aggadeen|معقد معقدة معقدين", difficult: "9a3b 9a3ba 9a3been|صعب صعبة صعبين",
    easy_: "sahl sahla sahleen|سهل سهلة سهلين", correct: "9a7 9a7 9a7|صح صح صح", wrong_: "3'ala6 3'ala6 3'ala6|غلط غلط غلط", true_: "9idj 9idj 9idj|صدج صدج صدج",
    false: "3'ala6 3'ala6 3'ala6|غلط غلط غلط", legal: "gaanooni gaanooniyya gaanooniyyeen|قانوني قانونية قانونيين", illegal: "mamnoo3 mamnoo3a mamnoo3een|ممنوع ممنوعة ممنوعين",
    forbidden: "mamnoo3 mamnoo3a mamnoo3een|ممنوع ممنوعة ممنوعين", official: "rasmi rasmiyya rasmiyyeen|رسمي رسمية رسميين", public_: "3aamm 3aamma 3aammeen|عام عامة عامين",
    whole: "^kil|كل", total: "ijmaali ijmaaliyya ijmaaliyyeen|إجمالي إجمالية إجماليين", extra: "ziyaada ziyaada ziyaada|زيادة زيادة زيادة",
    main: "ra2eesi ra2eesiyya ra2eesiyyeen|رئيسي رئيسية رئيسيين", basic: "asaasi asaasiyya asaasiyyeen|أساسي أساسية أساسيين", advanced: "mutagaddim mutagaddima mutagaddimeen|متقدم متقدمة متقدمين",
    professional: "mu7tarif mu7tarifa mu7tarifeen|محترف محترفة محترفين", amateur: "haawi haawya haawyeen|هاوي هاوية هاويين", recent: "a5eer a5eera a5eereen|أخير أخيرة أخيرين",
    current: "7aali 7aaliyya 7aaliyyeen|حالي حالية حاليين", future_: "mustagbali mustagbaliyya mustagbaliyyeen|مستقبلي مستقبلية مستقبليين", daily_: "yoomi yoomiyya yoomiyyeen|يومي يومية يوميين",
    weekly: "usboo3i usboo3iyya usboo3iyyeen|أسبوعي أسبوعية أسبوعيين", monthly: "shahri shahriyya shahriyyeen|شهري شهرية شهريين", yearly: "sanawi sanawiyya sanawiyyeen|سنوي سنوية سنويين",
    annual: "sanawi sanawiyya sanawiyyeen|سنوي سنوية سنويين", early_: "badri badri badri|بدري بدري بدري", late_: "mit2a55ir mit2a55ira mit2a55ireen|متأخر متأخرة متأخرين",
    fast_: "saree3 saree3a saree3een|سريع سريعة سريعين", slow_: "ba6ee2 ba6ee2a ba6ee2een|بطيء بطيئة بطيئين", quick: "saree3 saree3a saree3een|سريع سريعة سريعين",
    sudden: "mufaaji2 mufaaji2a mufaaji2een|مفاجئ مفاجئة مفاجئين", lucky: "ma76'oo6' ma76'oo6'a ma76'oo6'een|محظوظ محظوظة محظوظين", unlucky: "manhoos manhoosa manhooseen|منحوس منحوسة منحوسين",
    hot_: "7aarr 7aarra 7aarreen|حار حارة حارين", cold_: "baarid baarda baardeen|بارد باردة باردين", sweet: "7ilu 7ilwa 7ilween|حلو حلوة حلوين",
    sour: "7aami9' 7aam9'a 7aam9'een|حامض حامضة حامضين", bitter: "murr murra murreen|مر مرة مرين", salty: "maali7 maal7a maal7een|مالح مالحة مالحين",
    delicious: "ladheedh ladheedha ladheedheen|لذيذ لذيذة لذيذين", tasty: "ladheedh ladheedha ladheedheen|لذيذ لذيذة لذيذين", raw: "nayy nayya nayyeen|ني نية نيين",
    cooked_: "mis6uwi mis6uwya mis6uwyeen|مستوي مستوية مستويين", full_: "malyaan malyaana malyaaneen|مليان مليانة مليانين", open_: "maftoo7 maftoo7a maftoo7een|مفتوح مفتوحة مفتوحين",
    closed: "msakkar msakkara msakkareen|مسكر مسكرة مسكرين", broken_: "5arbaan 5arbaana 5arbaaneen|خربان خربانة خربانين", fixed: "m9alla7 m9alla7a m9alla7een|مصلح مصلحة مصلحين",
    lost_: "9'aayi3 9'aay3a 9'aay3een|ضايع ضايعة ضايعين", found: "malgi malgiyya malgiyyeen|ملقي ملقية ملقيين", hidden: "m5abba m5abbaa m5abbeen|مخبى مخباة مخبين",
    visible: "baayin baayna baayneen|باين باينة باينين", loud_: "3aali 3aalya 3aalyeen|عالي عالية عاليين", silent: "saakit saakta saakteen|ساكت ساكتة ساكتين",
    bright: "faati7 faat7a faat7een|فاتح فاتحة فاتحين", black: "aswad sooda sood|أسود سودا سود", white: "abya9' bai9'a bee9'|أبيض بيضا بيض",
    yellow: "a9far 9afra 9ufur|أصفر صفرا صفر", brown: "bunni bunniyya bunniyyeen|بني بنية بنيين", pink: "wardi wardiyya wardiyyeen|وردي وردية ورديين",
    purple: "banafsaji banafsajiyya banafsajiyyeen|بنفسجي بنفسجية بنفسجيين", grey: "rimaadi rimaadiyya rimaadiyyeen|رمادي رمادية رماديين", gray: "rimaadi rimaadiyya rimaadiyyeen|رمادي رمادية رماديين",
    golden: "dhahabi dhahabiyya dhahabiyyeen|ذهبي ذهبية ذهبيين", colorful: "mlawwan mlawwana mlawwaneen|ملون ملونة ملونين", colourful: "mlawwan mlawwana mlawwaneen|ملون ملونة ملونين",
  };
  const X_VERBS = {
    hold: ["misakt misak msik imsik|مسكت مسك مسك امسك", { past: 'held', pp: 'held', lv: 'i' }],
    catch: ["misakt misak msik imsik|مسكت مسك مسك امسك", { past: 'caught', pp: 'caught', lv: 'i' }],
    grab: ["misakt misak msik imsik|مسكت مسك مسك امسك", { lv: 'i' }],
    guess: ["5ammant 5amman 5ammin 5ammin|خمنت خمن خمن خمن", {}],
    turn: ["liffait laff liff liff|لفيت لف لف لف", {}],
    shut: ["sakkart sakkar sakkir sakkir|سكرت سكر سكر سكر", { past: 'shut', pp: 'shut' }],
    set: ["7a66ait 7a66 7u66 7u66|حطيت حط حط حط", { past: 'set', pp: 'set' }],
    hurt: ["3awwart 3awwar 3awwir 3awwir|عورت عور عور عور", { past: 'hurt', pp: 'hurt' }],
    wish: ["tmannait tmanna tmanna tmanna|تمنيت تمنى تمنى تمنى", { lv: 'i' }],
    cut: ["ga99ait ga99 gu99 gu99|قصيت قص قص قص", { past: 'cut', pp: 'cut' }],
    touch: ["limast limas lmis ilmis|لمست لمس لمس المس", { lv: 'i' }],
    promise: ["wa3adt wa3ad w3id iw3id|وعدت وعد وعد اوعد", { lv: 'i' }],
    pull: ["si7abt si7ab s7ab is7ab|سحبت سحب سحب اسحب", { lv: 'i' }],
    fall: ["6i7t 6aa7 6ee7 6ee7|طحت طاح طيح طيح", { past: 'fell', pp: 'fallen' }],
    throw: ["ramait rama rmi irmi|رميت رمى رمي ارم", { past: 'threw', pp: 'thrown', lv: 'i' }],
    'throw away': ["ramait rama rmi irmi|رميت رمى رمي ارم", { past: 'threw', pp: 'thrown', lv: 'i' }],
    'throw out': ["ramait rama rmi irmi|رميت رمى رمي ارم", { past: 'threw', pp: 'thrown', lv: 'i' }],
    act: ["t9arraft t9arraf t9arraf t9arraf|تصرفت تصرف تصرف تصرف", { lv: 'i' }],
    marry: ["tzawwajt tzawwaj tzawwaj tzawwaj|تزوجت تزوج تزوج تزوج", { lv: 'i' }],
    ride: ["rikabt rikab rkab irkab|ركبت ركب ركب اركب", { past: 'rode', pp: 'ridden', lv: 'i' }],
    forgive: ["saama7t saama7 saami7 saami7|سامحت سامح سامح سامح", { past: 'forgave', pp: 'forgiven' }],
    imagine: ["t5ayyalt t5ayyal t5ayyal t5ayyal|تخيلت تخيل تخيل تخيل", { lv: 'i' }],
    handle: ["t3aamalt t3aamal t3aamal t3aamal|تعاملت تعامل تعامل تعامل", { lv: 'i', obj: 'wiyya', objNP: 'wiyya' }],
    'deal with': ["t3aamalt t3aamal t3aamal t3aamal|تعاملت تعامل تعامل تعامل", { past: 'dealt', pp: 'dealt', lv: 'i', obj: 'wiyya', objNP: 'wiyya' }],
    protect: ["7amait 7ama 7mi i7mi|حميت حمى حمي احم", { lv: 'i' }],
    lead: ["gidt gaad good good|قدت قاد قود قود", { past: 'led', pp: 'led' }],
    count: ["7asabt 7asab 7sib i7sib|حسبت حسب حسب احسب", { lv: 'i', on: '3ala' }],
    'count on': ["i3tamadt i3tamad 3timid i3timid|اعتمدت اعتمد اعتمد اعتمد", { lv: 'i', obj: '3ala', objNP: '3ala' }],
    cover: ["3'a66ait 3'a66a 3'a66i 3'a66i|غطيت غطى غطي غطي", {}],
    surprise: ["faaja2t faaja2 faaji2 faaji2|فاجأت فاجأ فاجئ فاجئ", {}],
    smell: ["shammait shamm shimm shimm|شميت شم شم شم", { past: 'smelled', pp: 'smelled' }],
    judge: ["7akamt 7akam 7kum i7kum|حكمت حكم حكم احكم", { lv: 'i', obj: '3ala', objNP: '3ala' }],
    prove: ["athbatt athbat thbit ithbit|أثبت أثبت ثبت اثبت", { lv: 'i' }],
    realize: ["intabaht intabah ntibih intibih|انتبهت انتبه انتبه انتبه", { lv: 'i' }],
    realise: ["intabaht intabah ntibih intibih|انتبهت انتبه انتبه انتبه", { lv: 'i' }],
    notice: ["intabaht intabah ntibih intibih|انتبهت انتبه انتبه انتبه", { lv: 'i', obj: 'li', objNP: 'li' }],
    accept: ["gibalt gibal gbal igbal|قبلت قبل قبل اقبل", { lv: 'i' }],
    contact: ["tawaa9alt tawaa9al tawaa9al tawaa9al|تواصلت تواصل تواصل تواصل", { lv: 'i', obj: 'wiyya', objNP: 'wiyya' }],
    doubt: ["shakkait shakk shikk shikk|شكيت شك شك شك", { obj: 'fi', objNP: 'fi' }],
    push: ["daffait daff diff diff|دفيت دف دف دف", {}],
    arrest: ["gaba9't gaba9' gbi9' igbi9'|قبضت قبض قبض اقبض", { lv: 'i', obj: '3ala', objNP: '3ala' }],
    'get rid of': ["t5alla9t t5alla9 t5alla9 t5alla9|تخلصت تخلص تخلص تخلص", { past: 'got', pp: 'gotten', lv: 'i', obj: 'min', objNP: 'min' }],
    knock: ["daggait dagg digg digg|دقيت دق دق دق", { on: '3ala' }],
    ring: ["daggait dagg digg digg|دقيت دق دق دق", { past: 'rang', pp: 'rung', obj: '3ala', objNP: '3ala' }],
    escape: ["hirabt hirab hrab ihrab|هربت هرب هرب اهرب", { lv: 'i', obj: 'min', objNP: 'min' }],
    bother: ["az3ajt az3aj z3ij iz3ij|أزعجت أزعج زعج ازعج", { lv: 'i' }],
    annoy: ["az3ajt az3aj z3ij iz3ij|أزعجت أزعج زعج ازعج", { lv: 'i' }],
    blame: ["lumt laam loom loom|لمت لام لوم لوم", {}],
    allow: ["sama7t sama7 sma7 isma7|سمحت سمح سمح اسمح", { lv: 'i', obj: 'li', objNP: 'li' }],
    fit: ["naasabt naasab naasib naasib|ناسبت ناسب ناسب ناسب", { past: 'fit', pp: 'fit' }],
    suit: ["naasabt naasab naasib naasib|ناسبت ناسب ناسب ناسب", {}],
    smoke: ["da55ant da55an da55in da55in|دخنت دخن دخن دخن", {}],
    admit: ["i3taraft i3taraf 3tirif i3tirif|اعترفت اعترف اعترف اعترف", { lv: 'i', obj: 'b', objNP: 'b' }],
    cross: ["3abart 3abar 3bur u3bur|عبرت عبر عبر اعبر", { lv: 'u' }],
    waste_: ["9'ayya3t 9'ayya3 9'ayyi3 9'ayyi3|ضيعت ضيع ضيع ضيع", {}],
    taste: ["dhigt dhaag dhoog dhoog|ذقت ذاق ذوق ذوق", {}],
    lock: ["gafalt gafal gfil igfil|قفلت قفل قفل اقفل", { lv: 'i' }],
    mention: ["dhakart dhakar dhkur udhkur|ذكرت ذكر ذكر اذكر", { lv: 'u' }],
    burn: ["7aragt 7arag 7rig i7rig|حرقت حرق حرق احرق", { past: 'burned', pp: 'burned', lv: 'i' }],
    treat: ["3aamalt 3aamal 3aamil 3aamil|عاملت عامل عامل عامل", {}],
    destroy: ["dammart dammar dammir dammir|دمرت دمر دمر دمر", {}],
    'blow up': ["infajart infajar nfijir infijir|انفجرت انفجر انفجر انفجر", { past: 'blew', pp: 'blown', lv: 'i' }],
    'figure out': ["3araft 3araf 3arf i3rif|عرفت عرف عرف اعرف", { lv: 'a' }],
    'find out': ["3araft 3araf 3arf i3rif|عرفت عرف عرف اعرف", { past: 'found', pp: 'found', lv: 'a' }],
    'catch up': ["li7igt li7ag l7ag il7ag|لحقت لحق لحق الحق", { past: 'caught', pp: 'caught', lv: 'i' }],
    'hang out': ["g3adt ga3ad g3id ig3id|قعدت قعد قعد اقعد", { past: 'hung', pp: 'hung', lv: 'i' }],
    'fall asleep': ["3'affait 3'affa 3'affi 3'affi|غفيت غفى غفي غفي", { past: 'fell', pp: 'fallen' }],
    'mess up': ["5arrabt 5arrab 5arrib 5arrib|خربت خرب خرب خرب", {}],
    'mess with': ["li3abt li3ab l3ab il3ab|لعبت لعب لعب العب", { lv: 'a', obj: 'wiyya', objNP: 'wiyya' }],
    'pay attention': ["intabaht intabah ntibih intibih|انتبهت انتبه انتبه انتبه", { past: 'paid', pp: 'paid', lv: 'i' }],
    'sign': ["wagga3t wagga3 waggi3 waggi3|وقعت وقع وقع وقع", {}],
    forward: ["=do", { tail: 'forward|فورورد' }],
    'park': ["9affait 9aff 9uff 9uff|صفيت صف صف صف", {}],
    'dress up': ["tzayyant tzayyan tzayyan tzayyan|تزينت تزين تزين تزين", { lv: 'i' }],
    fire_v: ["fannasht fannash fannish fannish|فنشت فنش فنش فنش", {}],
    scream: ["9ara5t 9ara5 9ri5 i9ri5|صرخت صرخ صرخ اصرخ", { lv: 'i' }],
    shout: ["9ara5t 9ara5 9ri5 i9ri5|صرخت صرخ صرخ اصرخ", { lv: 'i' }],
    yell: ["9ara5t 9ara5 9ri5 i9ri5|صرخت صرخ صرخ اصرخ", { lv: 'i' }],
    whisper: ["hamast hamas hmis ihmis|همست همس همس اهمس", { lv: 'i' }],
    laugh: ["9'i7akt 9'i7ak 9'7ak i9'7ak|ضحكت ضحك ضحك اضحك", { lv: 'i', obj: '3ala', objNP: '3ala', at: '3ala' }],
    smile: ["ibtasamt ibtasam btisim ibtisim|ابتسمت ابتسم ابتسم ابتسم", { lv: 'i' }],
    cry: ["bachait bacha bchi ibchi|بچيت بچى بچي ابچ", { past: 'cried', pp: 'cried', lv: 'i' }],
    hug: ["7a9'ant 7a9'an 7u9'un u7u9'n|حضنت حضن حضن احضن", { lv: 'u' }],
    kiss: ["baast baas boos boos|بست باس بوس بوس", {}],
    hate_: ["kirahat kirah krah ikrah|كرهت كره كره اكره", { lv: 'a' }],
    miss_: ["shtagt shtaag shtaag shtaag|اشتقت اشتاق اشتاق اشتاق", { lv: 'i', obj: 'li', objNP: 'li' }],
    trust: ["withigt withag thig ithig|وثقت وثق ثق اثق", { lv: 'i', obj: 'b', objNP: 'b' }],
    respect: ["i7taramt i7taram 7tirim i7tirim|احترمت احترم احترم احترم", { lv: 'i' }],
    apologize: ["i3tadhart i3tadhar 3tidhir i3tidhir|اعتذرت اعتذر اعتذر اعتذر", { lv: 'i', obj: 'min', objNP: 'min', to: 'min' }],
    apologise: ["i3tadhart i3tadhar 3tidhir i3tidhir|اعتذرت اعتذر اعتذر اعتذر", { lv: 'i', obj: 'min', objNP: 'min', to: 'min' }],
    complain: ["ishtakait ishtaka shtiki ishtiki|اشتكيت اشتكى اشتكي اشتك", { lv: 'i', about: 'min' }],
    argue: ["t5aanagt t5aanag t5aanag t5aanag|تخانقت تخانق تخانق تخانق", { lv: 'i', with: 'wiyya' }],
    fight_: ["t5aanagt t5aanag t5aanag t5aanag|تخانقت تخانق تخانق تخانق", { past: 'fought', pp: 'fought', lv: 'i', with: 'wiyya' }],
    hit: ["6aggait 6agg 6igg 6igg|طقيت طق طق طق", { past: 'hit', pp: 'hit' }],
    punch: ["lakamt lakam lkum ilkum|لكمت لكم لكم الكم", { lv: 'u' }],
    kick_: ["rafast rafas rfis irfis|رفست رفس رفس ارفس", { lv: 'i' }],
    shoot: ["6aggait 6agg 6igg 6igg|طقيت طق طق طق", { past: 'shot', pp: 'shot', obj: '3ala', objNP: '3ala', at: '3ala' }],
    steal_: ["boogt baag boog boog|بوقت باق بوق بوق", { past: 'stole', pp: 'stolen' }],
    rob: ["boogt baag boog boog|بوقت باق بوق بوق", {}],
    cheat: ["3'ashshait 3'ashsh 3'ishsh 3'ishsh|غشيت غش غش غش", { obj: '3ala', objNP: '3ala', on: '3ala' }],
    lie_v: ["kadhabt kidhab kdhib ikdhib|كذبت كذب كذب اكذب", { lv: 'i', obj: '3ala', objNP: '3ala', to: '3ala' }],
    hide: ["5abbait 5abba 5abbi 5abbi|خبيت خبى خبي خبي", { past: 'hid', pp: 'hidden' }],
    chase: ["laa7agt laa7ag laa7ig laa7ig|لاحقت لاحق لاحق لاحق", {}],
    follow: ["taaba3t taaba3 taabi3 taabi3|تابعت تابع تابع تابع", {}],
    search: ["dawwart dawwar dawwir dawwir|دورت دور دور دور", { obj: '3ala', objNP: '3ala', for: '3ala' }],
    discover: ["iktashaft iktashaf ktishif iktishif|اكتشفت اكتشف اكتشف اكتشف", { lv: 'i' }],
    explore: ["istakshaft istakshaf stakshif istakshif|استكشفت استكشف استكشف استكشف", { lv: 'i' }],
    collect: ["jama3t jama3 jma3 ijma3|جمعت جمع جمع اجمع", { lv: 'i' }],
    gather: ["jama3t jama3 jma3 ijma3|جمعت جمع جمع اجمع", { lv: 'i' }],
    organize: ["ra66abt ra66ab ra66ib ra66ib|رتبت رتب رتب رتب", {}],
    organise: ["ra66abt ra66ab ra66ib ra66ib|رتبت رتب رتب رتب", {}],
    arrange: ["ra66abt ra66ab ra66ib ra66ib|رتبت رتب رتب رتب", {}],
    prepare: ["jahhazt jahhaz jahhiz jahhiz|جهزت جهز جهز جهز", {}],
    plan_v: ["5a66a6t 5a66a6 5a66i6 5a66i6|خططت خطط خطط خطط", {}],
    decide: ["garrart garrar garrir garrir|قررت قرر قرر قرر", {}],
    choose_: ["5taart 5taar 5taar 5taar|اخترت اختار اختار اختار", { past: 'chose', pp: 'chosen', lv: 'i' }],
    select: ["5taart 5taar 5taar 5taar|اخترت اختار اختار اختار", { lv: 'i' }],
    prefer: ["fa9'9'alt fa9'9'al fa9'9'il fa9'9'il|فضلت فضل فضل فضل", {}],
    compare: ["gaarant gaaran gaarin gaarin|قارنت قارن قارن قارن", { with: 'wiyya' }],
    measure: ["gist gaas gees gees|قست قاس قيس قيس", {}],
    weigh: ["wazant wazan wzin izin|وزنت وزن وزن ازن", { lv: 'i' }],
    describe: ["wa9aft wa9af w9if iw9if|وصفت وصف وصف اوصف", { lv: 'i' }],
    explain: ["shara7t shara7 shra7 ishra7|شرحت شرح شرح اشرح", { lv: 'i', obj: 'li', objNP: 'li' }],
    translate: ["tarjamt tarjam tarjim tarjim|ترجمت ترجم ترجم ترجم", {}],
    repeat: ["3idt 3aad 3eed 3eed|عدت عاد عيد عيد", {}],
    practice_: ["tmarrant tmarran tmarran tmarran|تمرنت تمرن تمرن تمرن", { lv: 'i' }],
    improve: ["7assant 7assan 7assin 7assin|حسنت حسن حسن حسن", {}],
    develop: ["6awwart 6awwar 6awwir 6awwir|طورت طور طور طور", {}],
    create: ["sawweet sawwa sawi sawwi|سويت سوى سوي سوّ", {}],
    design: ["9ammamt 9ammam 9ammim 9ammim|صممت صمم صمم صمم", {}],
    draw: ["rasamt risam rsim irsim|رسمت رسم رسم ارسم", { past: 'drew', pp: 'drawn', lv: 'i' }],
    paint: ["9aba3't 9aba3' 9bu3' u9bu3'|صبغت صبغ صبغ اصبغ", { lv: 'u' }],
    print: ["6aba3t 6aba3 6ba3 i6ba3|طبعت طبع طبع اطبع", { lv: 'i' }],
    record: ["sajjalt sajjal sajjil sajjil|سجلت سجل سجل سجل", {}],
    publish: ["nashart nashar nshur unshur|نشرت نشر نشر انشر", { lv: 'u' }],
    share_: ["shaarakt shaarak shaarik shaarik|شاركت شارك شارك شارك", {}],
    deliver: ["wa99alt wa99al wa99il wa99il|وصلت وصل وصل وصل", {}],
    carry_: ["shilt shaal sheel sheel|شلت شال شيل شيل", {}],
    lift_v: ["shilt shaal sheel sheel|شلت شال شيل شيل", {}],
    drop_: ["6ayya7t 6ayya7 6ayyi7 6ayyi7|طيحت طيح طيح طيح", {}],
    fill: ["3abbait 3abba 3abbi 3abbi|عبيت عبى عبي عبي", {}],
    pour: ["9abbait 9abb 9ubb 9ubb|صبيت صب صب صب", {}],
    mix: ["5ala6t 5ala6 5li6 i5li6|خلطت خلط خلط اخلط", { lv: 'i' }],
    cook: ["6iba5t 6ibax 6bu5 u6bu5|طبخت طبخ طبخ اطبخ", { lv: 'u' }],
    bake: ["5abazt 5abaz 5biz i5biz|خبزت خبز خبز اخبز", { lv: 'i' }],
    fry: ["gilait gila gli igli|قليت قلى قلي اقل", { past: 'fried', pp: 'fried', lv: 'i' }],
    boil: ["3'alait 3'ala 3'li i3'li|غليت غلى غلي اغل", { lv: 'i' }],
    wash: ["3'asalt 3'asal 3'sil i3'sil|غسلت غسل غسل اغسل", { lv: 'i' }],
    clean_v: ["na6'6'aft na6'6'af na6'6'if na6'6'if|نظفت نظف نظف نظف", {}],
    sweep: ["kannast kannas kannis kannis|كنست كنس كنس كنس", { past: 'swept', pp: 'swept' }],
    iron: ["kawait kawa kwi ikwi|كويت كوى كوي اكو", { lv: 'i' }],
    fold: ["6await 6awa 6wi i6wi|طويت طوى طوي اطو", { lv: 'i' }],
    hang: ["3allagt 3allag 3allig 3allig|علقت علق علق علق", { past: 'hung', pp: 'hung' }],
    tie: ["raba6t raba6 rbu6 urbu6|ربطت ربط ربط اربط", { lv: 'u' }],
    wear_: ["libast libas lbas ilbas|لبست لبس لبس البس", { past: 'wore', pp: 'worn', lv: 'i' }],
    'take off': ["gala3t gala3 gla3 igla3|قلعت قلع قلع اقلع", { past: 'took', pp: 'taken', lv: 'i' }],
    shave: ["7alagt 7alag 7lig i7lig|حلقت حلق حلق احلق", { lv: 'i' }],
    brush_v: ["farrasht farrash farrish farrish|فرشت فرش فرش فرش", {}],
    bathe: ["tsabba7t tsabba7 tsabba7 tsabba7|تسبحت تسبح تسبح تسبح", { lv: 'i' }],
    swim: ["siba7t siba7 sba7 isba7|سبحت سبح سبح اسبح", { past: 'swam', pp: 'swum', lv: 'i' }],
    dive: ["3'i9t 3'aa9 3'oo9 3'oo9|غصت غاص غوص غوص", { past: 'dove', pp: 'dived' }],
    climb: ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { lv: 'i' }],
    jump_: ["ni6t na66 nu66 nu66|نطيت نط نط نط", {}],
    kneel: ["rika3t rika3 rka3 irka3|ركعت ركع ركع اركع", { past: 'knelt', pp: 'knelt', lv: 'i' }],
    lean: ["tikait tika tiki tiki|تكيت تكى تكي تكي", { past: 'leaned', pp: 'leaned', on: '3ala' }],
    bend: ["thanait thana thni ithni|ثنيت ثنى ثني اثن", { past: 'bent', pp: 'bent', lv: 'i' }],
    stretch: ["tmaddadt tmaddad tmaddad tmaddad|تمددت تمدد تمدد تمدد", { lv: 'i' }],
    exercise: ["tmarrant tmarran tmarran tmarran|تمرنت تمرن تمرن تمرن", { lv: 'i' }],
    breathe: ["tnaffast tnaffas tnaffas tnaffas|تنفست تنفس تنفس تنفس", { lv: 'i' }],
    cough_v: ["ka77ait ka77 ki77 ki77|كحيت كح كح كح", {}],
    sneeze: ["3a6ast 3a6as 36is i36is|عطست عطس عطس اعطس", { lv: 'i' }],
    bleed: ["nazaft nazaf nzif inzif|نزفت نزف نزف انزف", { past: 'bled', pp: 'bled', lv: 'i' }],
    heal_: ["shifait shifa shfi ishfi|شفيت شفى شفي اشف", { lv: 'i' }],
    recover: ["t3aafait t3aafa t3aafa t3aafa|تعافيت تعافى تعافى تعافى", { lv: 'i' }],
    suffer: ["t3adhdhabt t3adhdhab t3adhdhab t3adhdhab|تعذبت تعذب تعذب تعذب", { lv: 'i', from: 'min' }],
    survive: ["nijait nija nja inja|نجيت نجا نجى انج", { lv: 'i', from: 'min' }],
    rescue: ["angadht angadh ngidh angidh|أنقذت أنقذ نقذ أنقذ", { lv: 'i' }],
    save_: ["angadht angadh ngidh angidh|أنقذت أنقذ نقذ أنقذ", { lv: 'i' }],
    attack_: ["haajamt haajam haajim haajim|هاجمت هاجم هاجم هاجم", {}],
    defend: ["daafa3t daafa3 daafi3 daafi3|دافعت دافع دافع دافع", { obj: '3an', objNP: '3an' }],
    guard_v: ["7arast 7aras 7ris i7ris|حرست حرس حرس احرس", { lv: 'i' }],
    train_: ["tdarrabt tdarrab tdarrab tdarrab|تدربت تدرب تدرب تدرب", { lv: 'i' }],
    march: ["mishait misha mshi imshi|مشيت مشى مشي امش", { lv: 'i' }],
    salute: ["sallamt sallam sallim sallim|سلمت سلم سلم سلم", { obj: '3ala', objNP: '3ala' }],
    obey: ["6aa3at 6aa3 6ee3 6ee3|طاعت طاع طيع طيع", {}],
    command: ["amart amar mur umur|أمرت أمر مر أمر", { lv: 'u' }],
    order_v: ["6alabt 6alab 6lub i6lub|طلبت طلب طلب اطلب", { lv: 'u' }],
    serve: ["5adamt 5adam 5dim i5dim|خدمت خدم خدم اخدم", { lv: 'i' }],
    retire: ["tgaa3adt tgaa3ad tgaa3ad tgaa3ad|تقاعدت تقاعد تقاعد تقاعد", { lv: 'i' }],
    hire: ["wa6'6'aft wa6'6'af wa6'6'if wa6'6'if|وظفت وظف وظف وظف", {}],
    employ: ["wa6'6'aft wa6'6'af wa6'6'if wa6'6'if|وظفت وظف وظف وظف", {}],
    quit_: ["istagaalt istagaal stageel istageel|استقلت استقال استقيل استقيل", { past: 'quit', pp: 'quit', lv: 'i' }],
    resign: ["istagaalt istagaal stageel istageel|استقلت استقال استقيل استقيل", { lv: 'i' }],
    manage: ["adart adaar deer adeer|أدرت أدار دير أدر", { lv: 'i' }],
    control: ["t7akkamt t7akkam t7akkam t7akkam|تحكمت تحكم تحكم تحكم", { lv: 'i', obj: 'fi', objNP: 'fi' }],
    own: ["milakt milak mlik imlik|ملكت ملك ملك املك", { lv: 'i' }],
    rent_v: ["ista2jart ista2jar sta2jir ista2jir|استأجرت استأجر استأجر استأجر", { lv: 'i' }],
    borrow_: ["ista3art ista3aar sta3eer ista3eer|استعرت استعار استعير استعير", { lv: 'i', from: 'min' }],
    earn: ["kisabt kisab ksab iksab|كسبت كسب كسب اكسب", { lv: 'i' }],
    spend_: ["9araft 9araf 9rif i9rif|صرفت صرف صرف اصرف", { past: 'spent', pp: 'spent', lv: 'i' }],
    cost_: ["kallaft kallaf kallif kallif|كلفت كلف كلف كلف", { past: 'cost', pp: 'cost' }],
    afford: ["gidart gidar gdar igdar|قدرت قدر قدر اقدر", { lv: 'i' }],
    donate: ["tbarra3t tbarra3 tbarra3 tbarra3|تبرعت تبرع تبرع تبرع", { lv: 'i', obj: 'b', objNP: 'b' }],
    invest: ["istathmart istathmar stathmir istathmir|استثمرت استثمر استثمر استثمر", { lv: 'i', in: 'fi' }],
    grow: ["kibart kibar kbar ikbar|كبرت كبر كبر اكبر", { past: 'grew', pp: 'grown', lv: 'i' }],
    raise: ["rafa3t rafa3 rfa3 irfa3|رفعت رفع رفع ارفع", { lv: 'i' }],
    reduce: ["gallalt gallal gallil gallil|قللت قلل قلل قلل", {}],
    increase: ["zawwadt zawwad zawwid zawwid|زودت زود زود زود", {}],
    decrease: ["gallalt gallal gallil gallil|قللت قلل قلل قلل", {}],
    add_: ["9'ayyaft 9'ayyaf 9'ayyif 9'ayyif|ضيفت ضيف ضيف ضيف", {}],
    remove_: ["shilt shaal sheel sheel|شلت شال شيل شيل", {}],
    replace: ["baddalt baddal baddil baddil|بدلت بدل بدل بدل", {}],
    exchange: ["baddalt baddal baddil baddil|بدلت بدل بدل بدل", {}],
    swap: ["baddalt baddal baddil baddil|بدلت بدل بدل بدل", {}],
    divide: ["gassamt gassam gassim gassim|قسمت قسم قسم قسم", {}],
    split: ["gassamt gassam gassim gassim|قسمت قسم قسم قسم", { past: 'split', pp: 'split' }],
    separate_: ["fa9alt fa9al f9il if9il|فصلت فصل فصل افصل", { lv: 'i' }],
    join_: ["dishait dash dish dish|دشيت دش دش دش", { lv: 'i' }],
    attend: ["7a9'art 7a9'ar 79'ar i79'ar|حضرت حضر حضر احضر", { lv: 'i' }],
    participate: ["shaarakt shaarak shaarik shaarik|شاركت شارك شارك شارك", { in: 'fi' }],
    compete: ["tnaafast tnaafas tnaafas tnaafas|تنافست تنافس تنافس تنافس", { lv: 'i', with: 'wiyya' }],
    beat_: ["3'alabt 3'alab 3'lib i3'lib|غلبت غلب غلب اغلب", { past: 'beat', pp: 'beaten', lv: 'i' }],
    defeat: ["3'alabt 3'alab 3'lib i3'lib|غلبت غلب غلب اغلب", { lv: 'i' }],
    score_v: ["sajjalt sajjal sajjil sajjil|سجلت سجل سجل سجل", {}],
    cheer: ["shajja3t shajja3 shajji3 shajji3|شجعت شجع شجع شجع", {}],
    support_: ["da3amt da3am d3am id3am|دعمت دعم دعم ادعم", { lv: 'a' }],
    encourage: ["shajja3t shajja3 shajji3 shajji3|شجعت شجع شجع شجع", {}],
    celebrate: ["i7tafalt i7tafal 7tifil i7tifil|احتفلت احتفل احتفل احتفل", { lv: 'i', obj: 'b', objNP: 'b' }],
    invite: ["3azamt 3azam 3zim i3zim|عزمت عزم عزم اعزم", { lv: 'i' }],
    visit_: ["zirt zaar zoor zoor|زرت زار زور زور", {}],
    welcome_v: ["ra77abt ra77ab ra77ib ra77ib|رحبت رحب رحب رحب", { obj: 'b', objNP: 'b' }],
    greet: ["sallamt sallam sallim sallim|سلمت سلم سلم سلم", { obj: '3ala', objNP: '3ala' }],
    introduce: ["3arraft 3arraf 3arrif 3arrif|عرفت عرف عرف عرف", { obj: 'b', objNP: 'b' }],
    recognize: ["3araft 3araf 3arf i3rif|عرفت عرف عرف اعرف", { lv: 'a' }],
    recognise: ["3araft 3araf 3arf i3rif|عرفت عرف عرف اعرف", { lv: 'a' }],
    ignore: ["6annasht 6annash 6annish 6annish|طنشت طنش طنش طنش", {}],
    avoid: ["tjannabt tjannab tjannab tjannab|تجنبت تجنب تجنب تجنب", { lv: 'i' }],
    refuse: ["rafa9't rafa9' rfu9' urfu9'|رفضت رفض رفض ارفض", { lv: 'u' }],
    reject: ["rafa9't rafa9' rfu9' urfu9'|رفضت رفض رفض ارفض", { lv: 'u' }],
    deny: ["ankart ankar nkir ankir|أنكرت أنكر نكر أنكر", { past: 'denied', pp: 'denied', lv: 'i' }],
    confess: ["i3taraft i3taraf 3tirif i3tirif|اعترفت اعترف اعترف اعترف", { lv: 'i' }],
    threaten: ["haddadt haddad haddid haddid|هددت هدد هدد هدد", {}],
    warn: ["7adhdhart 7adhdhar 7adhdhir 7adhdhir|حذرت حذر حذر حذر", {}],
    scare: ["5awwaft 5awwaf 5awwif 5awwif|خوفت خوف خوف خوف", {}],
    frighten: ["5awwaft 5awwaf 5awwif 5awwif|خوفت خوف خوف خوف", {}],
    bore: ["mallalt mallal mallil mallil|مللت ملل ملل ملل", {}],
    entertain: ["sallait salla salli salli|سليت سلى سلي سلي", {}],
    relax: ["irta7t irtaa7 rtaa7 irtaa7|ارتحت ارتاح ارتاح ارتاح", { lv: 'i' }],
    rest_: ["irta7t irtaa7 rtaa7 irtaa7|ارتحت ارتاح ارتاح ارتاح", { lv: 'i' }],
    nap: ["3'affait 3'affa 3'affi 3'affi|غفيت غفى غفي غفي", {}],
    dream_v: ["7ilamt 7ilam 7lam i7lam|حلمت حلم حلم احلم", { lv: 'a', obj: 'b', objNP: 'b' }],
    snore: ["sha5art sha5ar sh5ur ush5ur|شخرت شخر شخر اشخر", { lv: 'u' }],
    yawn: ["ttaawabt ttaawab ttaawab ttaawab|تثاوبت تثاوب تثاوب تثاوب", { lv: 'i' }],
    sweat: ["3irigt 3irig 3rag i3rag|عرقت عرق عرق اعرق", { lv: 'a' }],
    shake: ["hazzait hazz hizz hizz|هزيت هز هز هز", { past: 'shook', pp: 'shaken' }],
    shiver: ["rijaft rijaf rjif irjif|رجفت رجف رجف ارجف", { lv: 'i' }],
    freeze_p: ["tjammadt tjammad tjammad tjammad|تجمدت تجمد تجمد تجمد", { lv: 'i' }],
    melt: ["dhaab dhaab dhoob dhoob|ذاب ذاب ذوب ذوب", {}],
    float: ["6ifait 6ifa 6fi i6fi|طفيت طفى طفي اطف", { lv: 'i' }],
    sink: ["3'irigt 3'irig 3'rag i3'rag|غرقت غرق غرق اغرق", { past: 'sank', pp: 'sunk', lv: 'a' }],
    drown: ["3'irigt 3'irig 3'rag i3'rag|غرقت غرق غرق اغرق", { lv: 'a' }],
    shine: ["lima3t lima3 lma3 ilma3|لمعت لمع لمع المع", { past: 'shone', pp: 'shone', lv: 'a' }],
    glow: ["lima3t lima3 lma3 ilma3|لمعت لمع لمع المع", { lv: 'a' }],
    explode: ["infajart infajar nfijir infijir|انفجرت انفجر انفجر انفجر", { lv: 'i' }],
    collapse: ["inhaart inhaar nhaar inhaar|انهرت انهار انهار انهار", { lv: 'i' }],
    disappear_: ["i5tafait i5tafa 5tafi i5tafi|اختفيت اختفى يختفي اختف", { lv: 'i' }],
    appear: ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { lv: 'i' }],
    depend: ["i3tamadt i3tamad 3timid i3timid|اعتمدت اعتمد اعتمد اعتمد", { lv: 'i', on: '3ala' }],
    rely: ["i3tamadt i3tamad 3timid i3timid|اعتمدت اعتمد اعتمد اعتمد", { past: 'relied', pp: 'relied', lv: 'i', on: '3ala' }],
    deserve: ["ista7aggait ista7agg sta7igg ista7igg|استحقيت استحق استحق استحق", { lv: 'i' }],
    suffer_: ["3aanait 3aana 3aani 3aani|عانيت عانى عاني عان", { from: 'min' }],
    bet_v: ["raahant raahan raahin raahin|راهنت راهن راهن راهن", {}],
    gamble: ["gaamart gaamar gaamir gaamir|قامرت قامر قامر قامر", {}],
    risk_v: ["5aa6art 5aa6ar 5aa6ir 5aa6ir|خاطرت خاطر خاطر خاطر", { obj: 'b', objNP: 'b' }],
    dare_v: ["t7addait t7adda t7adda t7adda|تحديت تحدى تحدى تحدى", { lv: 'i' }],
    challenge: ["t7addait t7adda t7adda t7adda|تحديت تحدى تحدى تحدى", { lv: 'i' }],
    face_v: ["waajaht waajah waajih waajih|واجهت واجه واجه واجه", {}],
    overcome: ["t3'allabt t3'allab t3'allab t3'allab|تغلبت تغلب تغلب تغلب", { past: 'overcame', pp: 'overcome', lv: 'i', obj: '3ala', objNP: '3ala' }],
    achieve: ["7aggagt 7aggag 7aggig 7aggig|حققت حقق حقق حقق", {}],
    succeed: ["nija7t nija7 nja7 inja7|نجحت نجح نجح انجح", { lv: 'i' }],
    fail_: ["fishalt fishal fshal ifshal|فشلت فشل فشل افشل", { lv: 'a' }],
    pass_: ["nija7t nija7 nja7 inja7|نجحت نجح نجح انجح", { lv: 'i' }],
    graduate: ["t5arrajt t5arraj t5arraj t5arraj|تخرجت تخرج تخرج تخرج", { lv: 'i' }],
    enroll: ["sajjalt sajjal sajjil sajjil|سجلت سجل سجل سجل", {}],
    register: ["sajjalt sajjal sajjil sajjil|سجلت سجل سجل سجل", {}],
    apply: ["gaddamt gaddam gaddim gaddim|قدمت قدم قدم قدم", { past: 'applied', pp: 'applied', for: '3ala' }],
    submit: ["sallamt sallam sallim sallim|سلمت سلم سلم سلم", {}],
    attach: ["rafagt rafag rfig irfig|رفقت رفق رفق ارفق", { lv: 'i' }],
    sign_up_: ["sajjalt sajjal sajjil sajjil|سجلت سجل سجل سجل", {}],
    cancel: ["la3'ait la3'a la3'i la3'i|لغيت لغى لغي لغي", {}],
    postpone: ["ajjalt ajjal ajjil ajjil|أجلت أجل أجل أجل", {}],
    delay: ["a55art a55ar a55ir a55ir|أخرت أخر أخر أخر", {}],
    extend: ["maddadt maddad maddid maddid|مددت مدد مدد مدد", {}],
    renew: ["jaddadt jaddad jaddid jaddid|جددت جدد جدد جدد", {}],
    expire: ["intahat intaha ntihi intihi|انتهت انتهى انتهي انته", { lv: 'i' }],
    last_v: ["6awwalt 6awwal 6awwil 6awwil|طولت طول طول طول", {}],
    continue_: ["kammalt kammal kammil kammil|كملت كمل كمل كمل", {}],
    pause: ["waggaft waggaf waggif waggif|وقفت وقف وقف وقف", {}],
    resume: ["kammalt kammal kammil kammil|كملت كمل كمل كمل", {}],
    retry: ["7aawalt 7aawal 7aawil 7aawil|حاولت حاول حاول حاول", { past: 'retried', pp: 'retried' }],
    repair: ["9alla7t 9alla7 9alli7 9alli7|صلحت صلح صلح صلح", {}],
    damage_v: ["5arrabt 5arrab 5arrib 5arrib|خربت خرب خرب خرب", {}],
    ruin: ["5arrabt 5arrab 5arrib 5arrib|خربت خرب خرب خرب", {}],
    improve_: ["7assant 7assan 7assin 7assin|حسنت حسن حسن حسن", {}],
    adjust: ["3addalt 3addal 3addil 3addil|عدلت عدل عدل عدل", {}],
    modify: ["3addalt 3addal 3addil 3addil|عدلت عدل عدل عدل", { past: 'modified', pp: 'modified' }],
    edit_: ["3addalt 3addal 3addil 3addil|عدلت عدل عدل عدل", {}],
    convert: ["7awwalt 7awwal 7awwil 7awwil|حولت حول حول حول", {}],
    transfer: ["7awwalt 7awwal 7awwil 7awwil|حولت حول حول حول", {}],
    move_: ["7arrakt 7arrak 7arrik 7arrik|حركت حرك حرك حرك", {}],
    shift: ["7arrakt 7arrak 7arrik 7arrik|حركت حرك حرك حرك", {}],
    rotate: ["dawwart dawwar dawwir dawwir|دورت دور دور دور", {}],
    spin: ["dawwart dawwar dawwir dawwir|دورت دور دور دور", { past: 'spun', pp: 'spun' }],
    flip: ["galabt galab glib iglib|قلبت قلب قلب اقلب", { lv: 'i' }],
    press_: ["9'a3'a6t 9'a3'a6 9'3'a6 i9'3'a6|ضغطت ضغط ضغط اضغط", { lv: 'i', obj: '3ala', objNP: '3ala' }],
    squeeze: ["3a9art 3a9ar 39ir i39ir|عصرت عصر عصر اعصر", { lv: 'i' }],
    scratch: ["7akkait 7akk 7ikk 7ikk|حكيت حك حك حك", {}],
    rub: ["farakt farak frik ifrik|فركت فرك فرك افرك", { lv: 'i' }],
    wipe: ["masa7t masa7 msa7 imsa7|مسحت مسح مسح امسح", { lv: 'i' }],
    spray: ["rashshait rashsh rishsh rishsh|رشيت رش رش رش", {}],
    dig: ["7afart 7afar 7fur u7fur|حفرت حفر حفر احفر", { past: 'dug', pp: 'dug', lv: 'u' }],
    plant_v: ["zara3t zara3 zra3 izra3|زرعت زرع زرع ازرع", { lv: 'a' }],
    water_v: ["sigait siga sgi isgi|سقيت سقى سقي اسق", { lv: 'i' }],
    feed: ["6a33amt 6a33am 6a33im 6a33im|طعمت طعم طعم طعم", { past: 'fed', pp: 'fed' }],
    hunt: ["9idt 9aad 9eed 9eed|صدت صاد صيد صيد", {}],
    shoot_g: ["6aggait 6agg 6igg 6igg|طقيت طق طق طق", {}],
    aim: ["9awwabt 9awwab 9awwib 9awwib|صوبت صوب صوب صوب", { obj: '3ala', objNP: '3ala' }],
    reload: ["3abbait 3abba 3abbi 3abbi|عبيت عبى عبي عبي", {}],
    dodge: ["tfaadait tfaada tfaada tfaada|تفاديت تفادى تفادى تفادى", { lv: 'i' }],
    block: ["9addait 9add 9idd 9idd|صديت صد صد صد", {}],
    stun: ["dawwa5t dawwa5 dawwi5 dawwi5|دوخت دوخ دوخ دوخ", {}],
    revive: ["3ayyasht 3ayyash 3ayyish 3ayyish|عيشت عيش عيش عيش", {}],
    respawn_: ["rija3t rija3 rja3 irja3|رجعت رجع رجع ارجع", { lv: 'i' }],
    craft: ["sawweet sawwa sawi sawwi|سويت سوى سوي سوّ", {}],
    upgrade_: ["6awwart 6awwar 6awwir 6awwir|طورت طور طور طور", {}],
    equip: ["labbast labbas labbis labbis|لبست لبس لبس لبس", {}],
    unequip: ["gala3t gala3 gla3 igla3|قلعت قلع قلع اقلع", { lv: 'i' }],
    summon: ["isteda3ait isteda3a sted3i isted3i|استدعيت استدعى استدعي استدع", { lv: 'i' }],
    cast: ["ramait rama rmi irmi|رميت رمى رمي ارم", { past: 'cast', pp: 'cast', lv: 'i' }],
    teleport: ["=do", { tail: 'teleport|تيليبورت' }],
    spawn_v: ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { lv: 'i' }],
    glitch: ["=do", { tail: 'glitch|قلتش' }],
    lag_: ["=do", { tail: 'lag|لاق' }],
    rage: ["3a9abt 3a9ab 3a9ib 3a9ib|عصبت عصب عصب عصب", {}],
    troll_: ["=do", { tail: 'troll|ترول', obj: '3ala', objNP: '3ala' }],
    spam_: ["=do", { tail: 'spam|سبام' }],
    mute: ["=do", { tail: 'mute|ميوت', obj: 'li', objNP: 'li' }],
    unmute: ["=do", { tail: 'unmute|أنميوت', obj: 'li', objNP: 'li' }],
    report_: ["ballaght ballagh ballegh ballegh|بلغت بلغ بلغ بلغ", { obj: '3an', objNP: '3an' }],
    stream_: ["=do", { tail: 'stream|ستريم' }],
    subscribe_: ["ishtarakt ishtarak shtirik ishtirik|اشتركت اشترك اشترك اشترك", { lv: 'i', to: 'fi' }],
    unsubscribe: ["la3'ait_il-ishtiraak la3'a_il-ishtiraak la3'i_il-ishtiraak la3'i_il-ishtiraak|لغيت_الاشتراك لغى_الاشتراك لغي_الاشتراك لغي_الاشتراك", {}],
    comment_v: ["3allagt 3allag 3allig 3allig|علقت علق علق علق", { on: '3ala' }],
    post_v: ["nazzalt nazzal nazzil nazzil|نزلت نزل نزل نزل", {}],
    tag: ["=do", { tail: 'tag|تاق', obj: 'li', objNP: 'li' }],
    scroll: ["=do", { tail: 'scroll|سكرول' }],
    swipe: ["sa7abt sa7ab s7ab is7ab|سحبت سحب سحب اسحب", { lv: 'i' }],
    zoom: ["=do", { tail: 'zoom|زوم' }],
    screenshot: ["=do", { tail: 'screenshot|سكرين_شوت' }],
    charge: ["sha7ant sha7an sh7an ish7an|شحنت شحن شحن اشحن", { lv: 'a' }],
    plug_v: ["rakkabt rakkab rakkib rakkib|ركبت ركب ركب ركب", {}],
    type_v: ["kitabt kitab ktib iktib|كتبت كتب كتب اكتب", { lv: 'i' }],
    google: ["=do", { tail: 'google|قوقل' }],
    browse: ["ta9affa7t ta9affa7 ta9affa7 ta9affa7|تصفحت تصفح تصفح تصفح", { lv: 'i' }],
    hack: ["hakkart hakkar hakkir hakkir|هكرت هكر هكر هكر", {}],
    code_v: ["barmajt barmaj barmij barmij|برمجت برمج برمج برمج", {}],
    program_v: ["barmajt barmaj barmij barmij|برمجت برمج برمج برمج", {}],
    compile: ["=do", { tail: 'compile|كومبايل', obj: 'li', objNP: 'li' }],
    debug: ["=do", { tail: 'debug|ديبق', obj: 'li', objNP: 'li' }],
    deploy: ["nazzalt nazzal nazzil nazzil|نزلت نزل نزل نزل", {}],
    encrypt: ["shaffart shaffar shaffir shaffir|شفرت شفر شفر شفر", {}],
    backup_v: ["=do", { tail: 'backup|باك_أب', obj: 'li', objNP: 'li' }],
    sync: ["=do", { tail: 'sync|سنك', obj: 'li', objNP: 'li' }],
    pray: ["9allait 9alla 9alli 9alli|صليت صلى صلي صلي", {}],
    fast_v: ["9imt 9aam 9oom 9oom|صمت صام صوم صوم", {}],
    bless: ["baarakt baarak baarik baarik|باركت بارك بارك بارك", {}],
    worship: ["3abadt 3abad 3bud u3bud|عبدت عبد عبد اعبد", { lv: 'u' }],
    forgive_: ["saama7t saama7 saami7 saami7|سامحت سامح سامح سامح", {}],
    thank: ["shakart shakar shkur ushkur|شكرت شكر شكر اشكر", { lv: 'u' }],
    congratulate: ["baarakt baarak baarik baarik|باركت بارك بارك بارك", { obj: 'li', objNP: 'li' }],
    apologize_: ["i3tadhart i3tadhar 3tidhir i3tidhir|اعتذرت اعتذر اعتذر اعتذر", { lv: 'i' }],
    swear_: ["7alaft 7alaf 7lif i7lif|حلفت حلف حلف احلف", { past: 'swore', pp: 'sworn', lv: 'i' }],
    curse: ["sabbait sabb sibb sibb|سبيت سب سب سب", {}],
    insult: ["ahant ahaan heen aheen|أهنت أهان هين أهن", { lv: 'i' }],
    mock: ["sti5fait sti5fa sti5fi sti5fi|استخفيت استخفى استخفي استخف", { lv: 'i', obj: 'b', objNP: 'b' }],
    tease: ["3allagt 3allag 3allig 3allig|علقت علق علق علق", { obj: '3ala', objNP: '3ala' }],
    flirt: ["3aakast 3aakas 3aakis 3aakis|عاكست عاكس عاكس عاكس", {}],
    date_v: ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { lv: 'i', obj: 'wiyya', objNP: 'wiyya' }],
    propose: ["5a6abt 5a6ab 5u6ub u56ub|خطبت خطب خطب اخطب", { lv: 'u' }],
    divorce: ["6allagt 6allag 6allig 6allig|طلقت طلق طلق طلق", {}],
    raise_k: ["rabbait rabba rabbi rabbi|ربيت ربى ربي ربي", {}],
    adopt: ["tbannait tbanna tbanna tbanna|تبنيت تبنى تبنى تبنى", { lv: 'i' }],
    babysit: ["jalast_wiyya jalas_wiyya jlis_wiyya ijlis_wiyya|جلست_ويا جلس_ويا جلس_ويا اجلس_ويا", { past: 'babysat', pp: 'babysat', lv: 'i' }],
  };
  const X_ADVS = {
    nearby_: "greeb|قريب", absolutely: "akeed|أكيد", completely: "tamaaman|تماماً", certainly: "akeed|أكيد", especially: "5a99atan|خاصةً",
    obviously: "6ab3an|طبعاً", immediately: "3ala 6ool|على طول", suddenly: "fajja2a|فجأة", indeed: "fi3lan|فعلاً", however: "bas|بس",
    straight: "seeda|سيدة", ahead: "giddaam|قدام", forward: "giddaam|قدام", upstairs: "foog|فوق", downstairs: "ta7t|تحت", somewhere: "fi makaan|في مكان",
    anywhere: "ay makaan|أي مكان", besides: "wba3dain|وبعدين", either: "ba3ad|بعد", else: "thaani|ثاني", apparently: "3ala ma yabdu|على ما يبدو",
    definitely: "akeed|أكيد", probably_: "yimkin|يمكن", possibly: "yimkin|يمكن", perhaps: "yimkin|يمكن", surely: "akeed|أكيد",
    exactly_: "bi6'-6'ab6|بالضبط", precisely: "bi6'-6'ab6|بالضبط", roughly: "tagreeban|تقريباً", nearly: "tagreeban|تقريباً", barely: "bil-kaad|بالكاد",
    hardly: "bil-kaad|بالكاد", mostly: "a3'lab il-wagt|أغلب الوقت", mainly: "bshakil asaasi|بشكل أساسي", partly: "shway|شوي", fully: "tamaaman|تماماً",
    quite: "~shway|شوي", rather_: "~shway|شوي", somehow: "bshakil ma|بشكل ما", anyhow: "3ala kil 7aal|على كل حال", nonetheless: "ma3a chidhi|مع چذي",
    nevertheless: "ma3a chidhi|مع چذي", otherwise: "walla|ولا", instead: "badal|بدل", meanwhile: "fi nafs il-wagt|في نفس الوقت", afterwards: "ba3dain|بعدين",
    afterward: "ba3dain|بعدين", beforehand: "min gabil|من قبل", previously: "min gabil|من قبل", formerly: "min gabil|من قبل", originally: "fil-a9l|في الأصل",
    initially: "fil-bidaaya|في البداية", eventually: "fil-a5eer|في الأخير", ultimately: "fil-a5eer|في الأخير", lastly: "a5eeran|أخيراً", firstly: "awwalan|أولاً",
    secondly: "thaaniyan|ثانياً", thirdly: "thaalithan|ثالثاً", anytime: "ay wagt|أي وقت", sometime: "fi wagt ma|في وقت ما", overnight: "bil-lail|بالليل",
    nowhere: "wala makaan|ولا مكان", everywhere_: "fi kil makaan|في كل مكان", elsewhere: "fi makaan thaani|في مكان ثاني", abroad: "barra|برا", outside_: "barra|برا",
    inside_: "daa5il|داخل", indoors: "daa5il|داخل", outdoors: "barra|برا", nearby: "greeb|قريب", far_: "ba3eed|بعيد",
    loudly: "b9oot 3aali|بصوت عالي", quietly: "bhudoo|بهدو", softly: "bhudoo|بهدو", gently: "bshwaish|بشويش", carefully: "bi-7adhar|بحذر",
    safely: "bi-amaan|بأمان", easily: "bsuhoola|بسهولة", badly: "bshakil sayyi2|بشكل سيء", perfectly: "bshakil mumtaaz|بشكل ممتاز", properly: "9a7|صح",
    correctly: "9a7|صح", wrongly: "3'ala6|غلط", clearly: "bwu9'oo7|بوضوح", directly: "mubaasharatan|مباشرةً", personally: "sha59iyyan|شخصياً",
    seriously_: "bjadd|بجد", literally: "7arfiyyan|حرفياً", basically: "ya3ni|يعني", generally: "bshakil 3aamm|بشكل عام", normally: "3aadatan|عادةً",
    usually_: "3aadatan|عادةً", typically: "3aadatan|عادةً", regularly: "bintithaam|بانتظام", constantly: "3ala 6ool|على طول", frequently: "wayed|وايد",
    occasionally: "a7yaanan|أحياناً", rarely: "naadiran|نادراً", seldom: "naadiran|نادراً", twice: "marratain|مرتين", thrice: "thalaath marraat|ثلاث مرات",
    once_: "marra|مرة", again_: "marra thaanya|مرة ثانية", anymore_: "5alaa9|خلاص", alike: "nafs ish-shay|نفس الشي", together_: "sawa|سوا",
    apart: "mitfarrigeen|متفرقين", alone_: "broo7i|بروحي", away_: "ba3eed|بعيد", back_: "warra|ورا", ago_: "gabil|قبل",
    yet_: "lil7een|للحين", till_: "lain|لين", already_: "5alaa9|خلاص", lately_: "hal ayyaam|هالأيام", recently_: "min fatra greeba|من فترة قريبة",
    nowadays_: "hal ayyaam|هالأيام", tonight_: "il-laila|الليلة", today_: "il-yoom|اليوم", tomorrow_: "bacher|باجر", yesterday_: "ams|أمس",
    daily_a: "kil yoom|كل يوم", weekly_a: "kil usboo3|كل أسبوع", monthly_a: "kil shahar|كل شهر", yearly_a: "kil sana|كل سنة", hourly: "kil saa3a|كل ساعة",
    forever: "lil-abad|للأبد", temporarily: "mu2aggatan|مؤقتاً", permanently: "lil-abad|للأبد", briefly: "bi5ti9aar|باختصار", shortly: "3ugub shway|عقب شوي",
    soon_: "3ugub shway|عقب شوي", later_: "ba3dain|بعدين", earlier_: "min gabil|من قبل", lately: "hal ayyaam|هالأيام", late_a: "mit2a55ir|متأخر",
    early_a: "badri|بدري", fast_a: "bsir3a|بسرعة", slowly_: "shway shway|شوي شوي", quickly_: "bsir3a|بسرعة", rapidly: "bsir3a|بسرعة",
    well_: "zain|زين", hard_a: "bguwwa|بقوة", deeply: "min galb|من قلب", highly: "wayed|وايد", extremely: "~wayed|وايد",
    incredibly: "~wayed|وايد", terribly: "~wayed|وايد", awfully: "~wayed|وايد", pretty_a: "~shway|شوي", fairly: "~shway|شوي",
    hella: "~wayed|وايد",
  };
  const X_FIXED = {
    'the first one': "il-awwal|الأول", 'the second one': "ith-thaani|الثاني", 'the third one': "ith-thaalith|الثالث", 'the last one': "il-a5eer|الأخير", 'the next one': "il-yay|الياي",
    'the other one': "ith-thaani|الثاني", 'the same one': "nafs il-wa7id|نفس الواحد", 'the wrong one': "il-3'ala6|الغلط", 'the right one': "i9-9a7|الصح",
    'turn left': A3("liff yisaar|لف يسار", "liffi yisaar|لفي يسار", "liffoo yisaar|لفوا يسار"), 'turn right': A3("liff yimeen|لف يمين", "liffi yimeen|لفي يمين", "liffoo yimeen|لفوا يمين"),
    'turn around': A3("liff|لف", "liffi|لفي", "liffoo|لفوا"), 'turn back': A3("irja3|ارجع", "irja3i|ارجعي", "irja3oo|ارجعوا"), 'go straight': A3("roo7 seeda|روح سيدة", "roo7i seeda|روحي سيدة", "roo7oo seeda|روحوا سيدة"),
    'i wish i could': "ya raitni agdar|يا ريتني أقدر", 'i wish i had': "ya rait 3indi|يا ريت عندي", 'i wish': "ya rait|يا ريت", 'if only': "ya rait|يا ريت",
    'something else': "shay thaani|شي ثاني", 'anything else': "ay shay thaani|أي شي ثاني", 'anyone else': "a7ad thaani|أحد ثاني", 'someone else': "a7ad thaani|أحد ثاني",
    'nothing else': "ma fi shay thaani|ما في شي ثاني", 'what else': "shu ba3ad|شو بعد", 'who else': "minu ba3ad|منو بعد", 'where else': "wain ba3ad|وين بعد",
    'or else': "walla|ولا", 'everything else': "kil shay thaani|كل شي ثاني", 'everyone else': "il-baagi|الباقي", 'somewhere else': "makaan thaani|مكان ثاني",
    'sir': A3("6aweel il-3umur|طويل العمر", "6aweelat il-3umur|طويلة العمر", "6aweeleen il-3umur|طويلين العمر"), 'yes sir': "7aa9'ir|حاضر", 'no sir': "la 6aweel il-3umur|لا طويل العمر",
    'a bit': "shway|شوي", 'a little bit': "shway|شوي", 'a little': "shway|شوي", 'a lot': "wayed|وايد", 'lots': "wayed|وايد", 'lots of': "wayed|وايد",
    'what is the matter': A3("shu feek|شو فيك", "shu feech|شو فيج", "shu feekum|شو فيكم"), 'no matter what': "mahma 9aar|مهما صار", 'it does not matter': "ma yhimm|ما يهم",
    'does not matter': "ma yhimm|ما يهم", 'no big deal': "mob shay chibeer|مب شي چبير", 'big deal': "shay chibeer|شي چبير", 'deal': "tamm|تم", 'it is a deal': "ittafagna|اتفقنا",
    'at least': "3ala il-agal|على الأقل", 'at most': "3ala il-akthar|على الأكثر", 'one moment': "la76'a|لحظة", 'at the moment': "il7een|الحين",
    'cut it out': "bass 5alaa9|بس خلاص", 'supposed to': "il-mafroo9'|المفروض", 'in trouble': "fi mushkila|في مشكلة", 'a couple of': "kam|كم",
    'honey': A3("7abeebi|حبيبي", "7abeebti|حبيبتي", "7abaaybi|حبايبي"), 'darling': A3("7abeebi|حبيبي", "7abeebti|حبيبتي", "7abaaybi|حبايبي"), 'sweetheart': A3("7abeebi|حبيبي", "7abeebti|حبيبتي", "7abaaybi|حبايبي"),
    'babe': A3("7abeebi|حبيبي", "7abeebti|حبيبتي", "7abaaybi|حبايبي"), 'dear': A3("7abeebi|حبيبي", "7abeebti|حبيبتي", "7abaaybi|حبايبي"), 'in front of': "giddaam|قدام", 'in fact': "bil-7ageega|بالحقيقة",
    'the fact that': "inn|إن", 'oh lord': "ya rabb|يا رب", 'oh god': "ya rabb|يا رب", 'my god': "ya rabb|يا رب", 'thank god': "il-7amdulillah|الحمدلله", 'god bless you': "allah ybaarik feek|الله يبارك فيك",
    'god willing': "insha2allah|إن شاء الله", 'god knows': "allah a3lam|الله أعلم", 'for god sake': "ya 3ammi|يا عمي", "for god's sake": "ya 3ammi|يا عمي", 'for gods sake': "ya 3ammi|يا عمي",
    'i promise': "wa3d|وعد", 'on earth': "3ala wayh il-ar9'|على ويه الأرض",
    'keep in touch': A3("5alleek 3ala tawaa9ul|خليك على تواصل", "5alleech 3ala tawaa9ul|خليج على تواصل", "5allookum 3ala tawaa9ul|خلوكم على تواصل"), 'on top': "foog|فوق", 'on top of': "foog|فوق", 'at the top': "foog|فوق",
    'hang on': A3("in6ir shway|انطر شوي", "in6iri shway|انطري شوي", "in6iroo shway|انطروا شوي"),
    'others': "il-baagi|الباقي", 'the others': "il-baagi|الباقي", 'other people': "in-naas ith-thaanyeen|الناس الثانيين", 'i would rather': "afa9'9'il|أفضل", 'i had rather': "afa9'9'il|أفضل",
    'what is the date': "shu it-taari5 il-yoom|شو التاريخ اليوم", 'i wonder': "ya tara|يا ترى", 'no wonder': "mob 3'areeba|مب غريبة", 'i was wondering': "kint atsaa2al|كنت أتساءل",
    'none of': "wala wa7id min|ولا واحد من", 'none': "wala wa7id|ولا واحد", 'none of them': "wala wa7id minhum|ولا واحد منهم", 'none of us': "wala wa7id minna|ولا واحد منا",
    'no choice': "ma fi 5iyaar|ما في خيار", 'i have no choice': "ma 3indi 5iyaar|ما عندي خيار", 'in general': "bshakil 3aamm|بشكل عام", 'i suppose': "a7sib|أحسب", 'i suppose so': "a7sib chidhi|أحسب چذي",
    'give me a ride': A3("wa99ilni|وصلني", "wa99leeni|وصليني", "wa99looni|وصلوني"), 'can you give me a ride': A3("tigdar twa99ilni|تقدر توصلني", "tigdareen twa99leeni|تقدرين توصليني", "tigdaroon twa99looni|تقدرون توصلوني"),
    'born in': "mawlood fi|مولود في", 'i was born': "inwaladt|انولدت", 'he was born': "inwalad|انولد", 'she was born': "inwaldat|انولدت", 'you were born': A3("inwaladt|انولدت", "inwaladti|انولدتي", "inwaladtu|انولدتوا"),
    'shut your mouth': A3("sidd 7algak|سد حلقك", "siddi 7algich|سدي حلقج", "siddoo 7algkum|سدوا حلقكم"), 'you rock': A3("inta wa7sh|إنت وحش", "inti wa7sh|إنتي وحش", "intu wu7oosh|إنتو وحوش"),
    'i can handle it': "agdar at7ammal|أقدر أتحمل", 'i will handle it': "5all 3alay|خل علي", 'leave it to me': "5all 3alay|خل علي", 'in the middle of': "fi nu9|في نص",
    'not fair': "mob 3adil|مب عدل", 'that is not fair': "hadha mob 3adil|هذا مب عدل", 'it is not fair': "mob 3adil|مب عدل", 'fair enough': "tamaam, ma3ak 7ag|تمام، معاك حق",
    'pay attention': A3("intabih|انتبه", "intabhi|انتبهي", "intabhoo|انتبهوا"), 'every single': "kil|كل", 'every single day': "kil yoom|كل يوم", 'every single time': "kil marra|كل مرة",
    'count me in': "ana wiyyaakum|أنا وياكم", 'count on me': "i3timid 3alay|اعتمد علي", 'you can count on me': "tigdar ti3timid 3alay|تقدر تعتمد علي", 'it is an honor': "sharaf li|شرف لي",
    'what a mess': "shu hal fow9'a|شو هالفوضى", 'i messed up': "ana 3'ala6t|أنا غلطت", 'do not mess with me': "la til3ab wiyyaai|لا تلعب وياي", 'my treat': "3alay|علي", 'it is on me': "3alay|علي",
    'cell phone': "tilifoon|تلفون", 'my pleasure': "il-3afu|العفو", 'with pleasure': "b-kil siroor|بكل سرور", 'i am not involved': "ma li da5al|ما لي دخل", 'none of my business': "mob shu3'li|مب شغلي",
    'none of your business': A3("mob shu3'lak|مب شغلك", "mob shu3'lich|مب شغلج", "mob shu3'lkum|مب شغلكم"), 'mind your own business': A3("5alleek fi shu3'lak|خليك في شغلك", "5alleech fi shu3'lich|خليج في شغلج", "5allookum fi shu3'lkum|خلوكم في شغلكم"),
    'neither': "wala wa7id minhum|ولا واحد منهم", 'holy': "ya salaam|يا سلام", 'holy crap': "ya salaam|يا سلام", 'holy moly': "ya salaam|يا سلام", 'no doubt': "bdoon shakk|بدون شك",
    'i doubt it': "ashikk|أشك", 'in the beginning': "fil-bidaaya|في البداية", 'at the beginning': "fil-bidaaya|في البداية", 'in the end': "fil-a5eer|في الأخير", 'at the end': "fil-a5eer|في الأخير",
    'what is the difference': "shu il-farg|شو الفرق", 'no difference': "ma fi farg|ما في فرق", 'cheers': A3("mashkoor|مشكور", "mashkoora|مشكورة", "mashkooreen|مشكورين"), 'once upon a time': "kaan ya ma kaan|كان يا ما كان",
    'i owe you': "ana madyoon lak|أنا مديون لك", 'you owe me': "inta madyoon li|إنت مديون لي", 'i owe you one': "9aarat 3alay|صارت علي", 'do not bother': "la tkallif 3ala nafsak|لا تكلف على نفسك",
    'at risk': "fi 5a6ar|في خطر", 'in danger': "fi 5a6ar|في خطر", 'do me a favor': A3("sawwi li 5idma|سوي لي خدمة", "sawwi li 5idma|سوي لي خدمة", "sawwoo li 5idma|سووا لي خدمة"),
    'can you do me a favor': A3("tigdar tsawi li 5idma|تقدر تسوي لي خدمة", "tigdareen tsawwin li 5idma|تقدرين تسوين لي خدمة", "tigdaroon tsawoon li 5idma|تقدرون تسوون لي خدمة"),
    'do me a favour': A3("sawwi li 5idma|سوي لي خدمة", "sawwi li 5idma|سوي لي خدمة", "sawwoo li 5idma|سووا لي خدمة"), 'on the spot': "3ala 6ool|على طول", 'i have a feeling': "3indi i7saas|عندي إحساس",
    'i feel guilty': "a7iss b-dhanb|أحس بذنب", 'on duty': "3ala id-dawaam|على الدوام", 'off duty': "mob 3ala id-dawaam|مب على الدوام", 'suit yourself': A3("braa7tak|براحتك", "braa7tich|براحتج", "braa7atkum|براحتكم"),
    'according to': "7asab|حسب", 'how dare you': A3("kaif tijarru2|كيف تتجرأ", "kaif tijarru2een|كيف تتجرأين", "kaif tijarru2oon|كيف تتجرأون"), 'i dare you': A3("at7addaak|أتحداك", "at7addaach|أتحداج", "at7addaakum|أتحداكم"),
    'waste of time': "9'ayaa3 wagt|ضياع وقت", 'what a waste': "ya 5asaara|يا خسارة", 'do not mention it': "il-3afu|العفو", 'under pressure': "ta7t 9'a3'6|تحت ضغط", 'no pressure': "bdoon 9'a3'6|بدون ضغط",
    'ice cream': "ays kreem|آيس كريم", 'step by step': "5u6wa 5u6wa|خطوة خطوة", 'with pleasure ': "b-kil siroor|بكل سرور", 'looking forward to it': "mitshawwig|متشوق", 'i look forward to it': "mitshawwig|متشوق",
    'i can not wait for it': "ma agdar an6ir|ما أقدر أنطر", 'half an hour': "nu9 saa3a|نص ساعة", 'half hour': "nu9 saa3a|نص ساعة", 'an hour and a half': "saa3a wnu9|ساعة ونص", 'a day and a half': "yoom wnu9|يوم ونص",
    'this afternoon': "il-yoom il-3a9ir|اليوم العصر", 'in the afternoon': "il-3a9ir|العصر", 'good afternoon': "masa il-5air|مسا الخير", 'in the evening': "il-masa|المسا", 'this evening': "il-laila|الليلة",
    'at night': "bil-lail|بالليل", 'in the night': "bil-lail|بالليل", 'all day': "6ool il-yoom|طول اليوم", 'all night': "6ool il-lail|طول الليل", 'all week': "6ool il-usboo3|طول الأسبوع",
    'all the time ': "dayman|دايماً", 'for a long time': "min zamaan|من زمان", 'long time no see': "min zamaan ma shiftak|من زمان ما شفتك", 'it has been a while': "min zamaan|من زمان",
    'in a while': "ba3d shway|بعد شوي", 'for now': "il7een|الحين", 'right away': "3ala 6ool|على طول", 'at once': "3ala 6ool|على طول", 'in time': "fil-wagt|في الوقت",
    'on time': "fil-wagt|في الوقت", 'just in time': "fil-wagt bi6'-6'ab6|في الوقت بالضبط", 'ahead of time': "gabil il-wagt|قبل الوقت", 'behind schedule': "mit2a55ir|متأخر",
    'as soon as possible': "b-asra3 wagt|بأسرع وقت", 'asap': "b-asra3 wagt|بأسرع وقت", 'in the meantime': "fi nafs il-wagt|في نفس الوقت", 'from now on': "min il7een wraayi7|من الحين ورايح",
    'so far': "lil7een|للحين", 'so far so good': "lil7een tamaam|للحين تمام", 'by the way ': "3ala fikra|على فكرة", 'in other words': "ya3ni|يعني", 'that is to say': "ya3ni|يعني",
    'for example': "mathalan|مثلاً", 'for instance': "mathalan|مثلاً", 'such as': "mithil|مثل", 'and so on': "wchidhi|وچذي", 'etc': "wchidhi|وچذي", 'et cetera': "wchidhi|وچذي",
    'in my opinion ': "fi ra2yi|في رأيي", 'i believe': "a7sib|أحسب", 'i assume': "a7sib|أحسب", 'i bet': "akeed|أكيد", 'i figured': "3araft|عرفت", 'i figure': "a7sib|أحسب",
    'as far as i know': "3ala 7asab ma a3arf|على حسب ما أعرف", 'as you know': A3("mithil ma ta3arf|مثل ما تعرف", "mithil ma ta3arfeen|مثل ما تعرفين", "mithil ma ta3arfoon|مثل ما تعرفون"),
    'you know what': A3("ta3arf shu|تعرف شو", "ta3arfeen shu|تعرفين شو", "ta3arfoon shu|تعرفون شو"), 'you know what i mean': A3("fahim 3alay|فاهم علي", "fahma 3alay|فاهمة علي", "fahmeen 3alay|فاهمين علي"),
    'if you know what i mean': "law fahim 3alay|لو فاهم علي", 'i mean': "ya3ni|يعني", 'the thing is': "il-mushkila inn|المشكلة إن", 'the point is': "il-muhimm inn|المهم إن",
    'the problem is': "il-mushkila inn|المشكلة إن", 'the truth is': "il-9idj inn|الصدج إن", 'to tell you the truth': "bi9raa7a|بصراحة", 'frankly': "bi9raa7a|بصراحة", 'to be fair': "bi-in9aaf|بإنصاف",
    'let us say': "5alna ngool|خلنا نقول", 'lets say': "5alna ngool|خلنا نقول", 'i guess so': "a7sib chidhi|أحسب چذي", 'i guess not': "a7sib la|أحسب لا",
    'guess what': A3("5ammin shu|خمن شو", "5ammni shu|خمني شو", "5ammnoo shu|خمنوا شو"), 'you guessed it': A3("9a7, 5ammantha|صح، خمنتها", "9a7, 5ammanteeha|صح، خمنتيها", "9a7, 5ammantooha|صح، خمنتوها"),
    'no way out': "ma fi ma5raj|ما في مخرج", 'way too': "~wayed|وايد", 'way more': "akthar b-wayed|أكثر بوايد", 'way better': "a7san b-wayed|أحسن بوايد", 'way worse': "aswa b-wayed|أسوأ بوايد",
    'by far': "b-faarig|بفارق", 'no way': "musta7eel|مستحيل", 'either way': "fi kil il-7aalaat|في كل الحالات", 'both ways': "fi kil il-7aalaat|في كل الحالات", 'any way': "ay 6areega|أي طريقة",
    'this way': "chidhi|چذي", 'that way': "chidhi|چذي", 'the same way': "nafs i6-6areega|نفس الطريقة", 'in a way': "bshakil ma|بشكل ما", 'in some way': "bshakil ma|بشكل ما",
    'one way or another': "b-ay 6areega|بأي طريقة", 'all the way': "lil-aa5ir|للآخر", 'on the way': "fi6-6areeg|في الطريق", 'on my way': "fi 6areegi|في طريقي", 'on the way home': "fi 6areegi lil-bait|في طريقي للبيت",
    'by the way': "3ala fikra|على فكرة", 'out of the way': "min 6areegi|من طريقي", 'get out of the way': A3("6la3 min 6areegi|طلع من طريقي", "6la3i min 6areegi|طلعي من طريقي", "6la3oo min 6areegi|طلعوا من طريقي"),
    'no way jose': "musta7eel|مستحيل", 'way to go': A3("3afya 3alaik|عفية عليك", "3afya 3alaich|عفية عليج", "3afya 3alaikum|عفية عليكم"), 'go all the way': "lil-aa5ir|للآخر",
  };
  const X_NOUN_ALIAS = { info: 'information', daddy: 'father', papa: 'father', mama: 'mother', mommy: 'mother', mummy: 'mother', pa: 'father', fella: 'guy', fellow: 'guy', chap: 'guy', lad: 'guy', mate_: 'friend', pal: 'friend', buddy_: 'friend',
    automobile: 'car', vehicle: 'car', cab: 'taxi', lorry: 'truck', bathroom_: 'bathroom', restroom: 'bathroom', loo: 'bathroom', washroom: 'bathroom', flat_: 'apartment',
    telly: 'tv', television: 'tv', cellphone: 'phone', smartphone: 'phone', mobile: 'phone', pc: 'computer', notebook: 'laptop', bike_: 'bike', motorbike: 'motorcycle',
    cash_: 'cash', bucks: 'dollar', buck: 'dollar', aed: 'dirham', dhs: 'dirham', dh: 'dirham', dirhams: 'dirham', riyal: 'riyal', riyals: 'riyal',
    kid_: 'kid', kiddo: 'kid', youngster: 'kid', teenager: 'teenager', teen: 'teenager', adult: 'adult', grownup: 'adult', elder: 'elder',
    cop_: 'cop', policeman: 'cop', policewoman: 'cop', officer_: 'officer', sarge: 'sergeant', doc: 'doctor', physician: 'doctor', dentist: 'dentist', surgeon: 'surgeon',
    prof: 'professor', tutor: 'teacher', instructor: 'teacher', lecturer: 'teacher', principal: 'principal', dean: 'dean', pupil: 'student', scholar: 'student',
    shopkeeper: 'owner', salesman: 'salesman', vendor: 'salesman', merchant: 'salesman', trader: 'salesman', businessman: 'businessman', boss: 'boss',
    hubby: 'husband', missus: 'wife', spouse: 'husband', fiance: 'fiance', fiancee: 'fiancee', bride: 'bride', groom: 'groom', widow: 'widow',
    grandad: 'grandfather', granddad: 'grandfather', granny: 'grandmother', gran: 'grandmother', nana: 'grandmother', grandson: 'grandson', granddaughter: 'granddaughter',
    sibling: 'sibling', siblings: 'sibling', bro_: 'brother', sis: 'sister', relatives: 'relative', relative: 'relative', cousin_: 'cousin', inlaws: 'inlaws',
    motorway: 'highway', highway: 'highway', freeway: 'highway', lane: 'lane', alley: 'alley', pavement: 'sidewalk', sidewalk: 'sidewalk', roundabout: 'roundabout',
    petrol_: 'petrol', gasoline: 'petrol', diesel: 'diesel', tyre_: 'tire', bonnet: 'hood', hood: 'hood', boot_: 'trunk', trunk: 'trunk', windscreen: 'windshield', windshield: 'windshield',
    telephone: 'phone', cellular: 'phone', landline: 'landline', fax: 'fax', mail: 'mail', post: 'mail', parcel: 'package', package: 'package', envelope: 'envelope', stamp: 'stamp' };
  const X_PL_IRR = { feet: 'foot', teeth: 'tooth', mice: 'mouse', geese: 'goose', wolves: 'wolf', knives: 'knife', wives: 'wife', lives: 'life', leaves: 'leaf', halves: 'half', shelves: 'shelf', thieves: 'thief', loaves: 'loaf', fish: 'fish', sheep: 'sheep' };
  for (const [k, v] of Object.entries(X_NOUNS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_RAW) && !(kk + '_' in NOUN_RAW)) NOUN_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X_ADJS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADJ_RAW) && !(kk + '_' in ADJ_RAW)) ADJ_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X_VERBS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in VERB_RAW) && !(kk + '_' in VERB_RAW)) VERB_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X_ADVS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADV_RAW) && !(kk + '_' in ADV_RAW)) ADV_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X_FIXED)) { const kk = k.trim(); if (!(kk in FIXED_RAW)) FIXED_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X_NOUN_ALIAS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_ALIAS)) NOUN_ALIAS[kk] = v; }
  for (const [k, v] of Object.entries(X_PL_IRR)) if (!(k in NOUN_PL_IRR)) NOUN_PL_IRR[k] = v;
  const X2_NOUNS = {
    matter: "mas2ala masaa2il f|مسألة مسائل", front: "giddaam giddaam m|قدام قدام", master: "mu3allim mu3allimeen mh|معلم معلمين", interest: "ihtimaam ihtimaamaat m|اهتمام اهتمامات",
    band: "firga firag f|فرقة فرق", nature: "6abee3a 6abee3a f|طبيعة طبيعة", client: "zuboon zabaayin mh|زبون زباين", bomb: "gumbula ganaabil f|قنبلة قنابل",
    suspect: "mashtabah mashtabaheen mh|مشتبه مشتبهين", van: "vaan vaanaat m|فان فانات", shame: "3aib 3uyoob m|عيب عيوب", flower: "warda wrood f|وردة ورود",
    beauty: "jamaal jamaal m|جمال جمال", stone: "7a9aa 7a9a f|حصاة حصى", faith: "eemaan eemaan m|إيمان إيمان", bottom: "ga3 ga3 m|قع قع",
    justice: "3adaala 3adaala f|عدالة عدالة", hall: "9aala 9aalaat f|صالة صالات", devil: "shai6aan shayaa6een mh|شيطان شياطين", rose: "warda wrood f|وردة ورود",
    note: "mulaa7a6'a mulaa7a6'aat f|ملاحظة ملاحظات", ghost: "shaba7 ashbaa7 m|شبح أشباح", advice: "na9ee7a na9aayi7 f|نصيحة نصايح", inspector: "mufattish mufattisheen mh|مفتش مفتشين",
    trial: "tajriba tajaarib f|تجربة تجارب", emergency: "6awaari2 6awaari2 f|طوارئ طوارئ", angel: "malaak malaayka mh|ملاك ملايكة", tape: "shree6 ashri6a m|شريط أشرطة",
    vote: "9oot a9waat m|صوت أصوات", career: "mihna mihan f|مهنة مهن", minister: "wazeer wuzara mh|وزير وزرا", freedom: "7urriyya 7urriyya f|حرية حرية",
    crew: "6aagim 6awaagim m|طاقم طواقم", strength: "guwwa guwwa f|قوة قوة", size: "7ajm a7jaam m|حجم أحجام", sight: "na6'ar na6'ar m|نظر نظر",
    investigation: "ta7geeg ta7geegaat m|تحقيق تحقيقات", center: "markaz maraakiz m|مركز مراكز", centre: "markaz maraakiz m|مركز مراكز", trick: "7eela 7iyal f|حيلة حيل",
    target: "hadaf ahdaaf m|هدف أهداف", research: "ba7th ab7aath m|بحث أبحاث", audience: "jumhoor jumhoor m|جمهور جمهور", society: "mujtama3 mujtama3aat m|مجتمع مجتمعات",
    female: "untha inaath fh|أنثى إناث", male: "dhakar dhukoor mh|ذكر ذكور", universe: "kawn kawn m|كون كون", lab: "mu5tabar mu5tabaraat m|مختبر مختبرات",
    cream: "kreem kreemaat m|كريم كريمات", birth: "wilaada wilaadaat f|ولادة ولادات", focus: "tarkeez tarkeez m|تركيز تركيز", bullet: "ra9aa9a ra9aa9 f|رصاصة رصاص",
    joy: "fara7 fara7 m|فرح فرح", responsibility: "mas2ooliyya mas2ooliyyaat f|مسؤولية مسؤوليات", process: "3amaliyya 3amaliyyaat f|عملية عمليات", happiness: "sa3aada sa3aada f|سعادة سعادة",
    desk: "maktab makaatib m|مكتب مكاتب", gang: "shilla shilal f|شلة شلل", alarm: "munabbih munabbihaat m|منبه منبهات", pig: "5anzeer 5anaazeer m|خنزير خنازير",
    path: "6areeg 6urug m|طريق طرق", harm: "9'arar a9'raar m|ضرر أضرار", style: "stayl staylaat m|ستايل ستايلات", community: "mujtama3 mujtama3aat m|مجتمع مجتمعات",
    speech: "kalima kalimaat f|كلمة كلمات", silence: "sukoot sukoot m|سكوت سكوت", success: "najaa7 najaa7 m|نجاح نجاح", amount: "kammiyya kammiyyaat f|كمية كميات",
    detail: "taf9eel tafaa9eel m|تفصيل تفاصيل", thought: "fikra afkaar f|فكرة أفكار", funeral: "3aza 3azaawi m|عزا عزاوي", reality: "waagi3 waagi3 m|واقع واقع",
    theory: "na6'ariyya na6'ariyyaat f|نظرية نظريات", castle: "gal3a gilaa3 f|قلعة قلاع", permission: "idhin idhin m|إذن إذن", regret: "nadam nadam m|ندم ندم",
    lover: "7abeeb 7abaayib mh|حبيب حبايب", mood: "mazaaj amzija m|مزاج أمزجة", loss: "5asaara 5asaayir f|خسارة خساير", secretary: "sikirteera sikirteeraat fh|سكرتيرة سكرتيرات",
    revenge: "intigaam intigaam m|انتقام انتقام", connection: "itti9aal itti9aalaat m|اتصال اتصالات", assistant: "musaa3id musaa3ideen mh|مساعد مساعدين", murderer: "gaatil gatala mh|قاتل قتلة",
    century: "garn guroon m|قرن قرون", pair: "zooj azwaaj m|زوج أزواج", tongue: "lsaan alsina m|لسان ألسنة", clock: "saa3a saa3aat f|ساعة ساعات",
    tour: "jawla jawlaat f|جولة جولات", right_n: "7agg 7ugoog m|حق حقوق", competition: "musaabaga musaabagaat f|مسابقة مسابقات", shape: "shakil ashkaal m|شكل أشكال",
    fortune: "tharwa tharwaat f|ثروة ثروات", tear: "dam3a dmoo3 f|دمعة دموع", giant: "3imlaag 3amaalga mh|عملاق عمالقة", period: "fatra fataraat f|فترة فترات",
    politics: "siyaasa siyaasa f|سياسة سياسة", statement: "ta9ree7 ta9ree7aat m|تصريح تصريحات", temple: "ma3bad ma3aabid m|معبد معابد", grave: "gabr gboor m|قبر قبور",
    role: "door adwaar m|دور أدوار", patient: "maree9' mar9'a mh|مريض مرضى", mercy: "ra7ma ra7ma f|رحمة رحمة", shot: "6alga 6algaat f|طلقة طلقات",
    trap: "fa55 f5oo5 m|فخ فخوخ", mystery: "lu3'z al3'aaz m|لغز ألغاز", courage: "shajaa3a shajaa3a f|شجاعة شجاعة", council: "majlis majaalis m|مجلس مجالس",
    source: "ma9dar ma9aadir m|مصدر مصادر", victory: "fooz fooz m|فوز فوز", palace: "ga9r gu9oor m|قصر قصور", shopping: "tasawwug tasawwug m|تسوق تسوق",
    neighborhood: "fareej firjaan m|فريج فرجان", neighbourhood: "fareej firjaan m|فريج فرجان", lip: "shiffa shafaayif f|شفة شفايف", advantage: "meeza meezaat f|ميزة ميزات",
    spell: "spell spellaat m|سبل سبلات", wood: "5ashab 5ashab m|خشب خشب", violence: "3unf 3unf m|عنف عنف", piano: "byaano byaanohaat m|بيانو بيانوهات",
    value: "geema giyam f|قيمة قيم", union: "itti7aad itti7aadaat m|اتحاد اتحادات", studio: "stoodyo stoodyohaat m|ستوديو ستوديوهات", media: "i3laam i3laam m|إعلام إعلام",
    desire: "ra3'ba ra3'abaat f|رغبة رغبات", pride: "fa5r fa5r m|فخر فخر", miracle: "mu3jiza mu3jizaat f|معجزة معجزات", treatment: "3ilaaj 3ilaajaat m|علاج علاجات",
    governor: "7aakim 7ukkaam mh|حاكم حكام", performance: "adaa2 adaa2 m|أداء أداء", zero: "9ifr a9faar m|صفر أصفار", edge: "6araf a6raaf m|طرف أطراف",
    tip: "na9ee7a na9aayi7 f|نصيحة نصايح", claim: "mu6aalaba mu6aalabaat f|مطالبة مطالبات", solution: "7all 7ulool m|حل حلول", theme: "theme themeaat m|ثيم ثيمات",
    dragon: "tinneen tanaaneen m|تنين تنانين", surface: "sa6i7 as6u7 m|سطح أسطح", intelligence: "dhakaa dhakaa m|ذكا ذكا", witch: "saa7ira saa7iraat fh|ساحرة ساحرات",
    presence: "wujood wujood m|وجود وجود", toast: "toost toost m|توست توست", coast: "saa7il sawaa7il m|ساحل سواحل", material: "maadda mawaad f|مادة مواد",
    beast: "wa7sh wu7oosh m|وحش وحوش", creature: "ma5loog ma5loogaat m|مخلوق مخلوقات", row: "9aff 9ufoof m|صف صفوف", section: "gisim agsaam m|قسم أقسام",
    darkness: "6'alaam 6'alaam m|ظلام ظلام", destiny: "na9eeb na9eeb m|نصيب نصيب", explosion: "infijaar infijaaraat m|انفجار انفجارات", cigarette: "jigaara jigaayir f|جقارة جقاير",
    sacrifice: "ta9'7iya ta9'7iyaat f|تضحية تضحيات", pie: "fa6eera fa6aayir f|فطيرة فطاير", effort: "majhood majhoodaat m|مجهود مجهودات", youth: "shabaab shabaab m|شباب شباب",
    ambulance: "is3aaf is3aaf m|إسعاف إسعاف", circumstance: "6'arf 6'uroof m|ظرف ظروف", sin: "dhanb dhunoob m|ذنب ذنوب", campaign: "7amla 7amalaat f|حملة حملات",
    vision: "ru2ya ru2a f|رؤية رؤى", reporter: "9a7afi 9a7afiyyeen mh|صحفي صحفيين", equipment: "mu3iddaat mu3iddaat f|معدات معدات", alien: "faa9'aa2i faa9'aa2iyyeen mh|فضائي فضائيين",
    clue: "daleel adilla m|دليل أدلة", emperor: "imbraa6oor abaa6ira mh|إمبراطور أباطرة", spy: "jaasoos jawaasees mh|جاسوس جواسيس", shadow: "6'ill 6'laal m|ظل ظلال",
    kingdom: "mamlaka mamaalik f|مملكة ممالك", squad: "fareeg furag m|فريق فرق", worker: "3aamil 3ummaal mh|عامل عمال", chain: "silsila salaasil f|سلسلة سلاسل",
    bull: "thoor theeraan m|ثور ثيران", passion: "sha3'af sha3'af m|شغف شغف", movement: "7araka 7arakaat f|حركة حركات", thunder: "ra3d ra3d m|رعد رعد",
    lightning: "barg barg m|برق برق", alcohol: "ku7ool ku7ool m|كحول كحول", conference: "mu2tamar mu2tamaraat m|مؤتمر مؤتمرات", valley: "waadi widyaan m|وادي وديان",
    fashion: "moo9'a moo9'a f|موضة موضة", circle: "daayra dawaayir f|دايرة دواير", percent: "bil-miya bil-miya m|بالمية بالمية", tail: "dhail dhyool m|ذيل ذيول",
    wing: "jinaa7 ajni7a m|جناح أجنحة", china: "i9-9een i9-9een f|الصين الصين", india: "il-hind il-hind f|الهند الهند", pakistan: "baakistaan baakistaan f|باكستان باكستان",
    saudi_c: "is-si3oodiyya is-si3oodiyya f|السعودية السعودية", america: "amreeka amreeka f|أمريكا أمريكا", usa: "amreeka amreeka f|أمريكا أمريكا", britain: "bri6aanya bri6aanya f|بريطانيا بريطانيا",
    uk: "bri6aanya bri6aanya f|بريطانيا بريطانيا", england: "ingiltara ingiltara f|إنجلترا إنجلترا", japan: "il-yaabaan il-yaabaan f|اليابان اليابان", korea: "koorya koorya f|كوريا كوريا",
    russia: "roosya roosya f|روسيا روسيا", turkey: "turkya turkya f|تركيا تركيا", germany: "almaanya almaanya f|ألمانيا ألمانيا", france: "faransa faransa f|فرنسا فرنسا",
    spain: "isbaanya isbaanya f|إسبانيا إسبانيا", italy: "i6aalya i6aalya f|إيطاليا إيطاليا", canada: "kanada kanada f|كندا كندا", australia: "ustraalya ustraalya f|أستراليا أستراليا",
    brazil: "il-braazeel il-braazeel f|البرازيل البرازيل", iran: "eeraan eeraan f|إيران إيران", iraq: "il-3iraag il-3iraag m|العراق العراق", syria: "sooriya sooriya f|سوريا سوريا",
    lebanon: "libnaan libnaan m|لبنان لبنان", jordan: "il-urdun il-urdun m|الأردن الأردن", kuwait: "il-kwait il-kwait f|الكويت الكويت", qatar: "ga6ar ga6ar f|قطر قطر",
    bahrain: "il-ba7rain il-ba7rain f|البحرين البحرين", oman: "3umaan 3umaan f|عمان عمان", yemen: "il-yaman il-yaman m|اليمن اليمن", morocco: "il-ma3'rib il-ma3'rib m|المغرب المغرب",
    algeria: "il-jazaayir il-jazaayir f|الجزاير الجزاير", tunisia: "toonis toonis f|تونس تونس", libya: "leebya leebya f|ليبيا ليبيا", sudan: "is-soodaan is-soodaan m|السودان السودان",
    philippines: "il-filibbeen il-filibbeen f|الفلبين الفلبين", indonesia: "indooneesya indooneesya f|إندونيسيا إندونيسيا", malaysia: "maaleezya maaleezya f|ماليزيا ماليزيا", thailand: "taayland taayland f|تايلند تايلند",
    europe: "oroobba oroobba f|أوروبا أوروبا", africa: "afreegya afreegya f|أفريقيا أفريقيا", asia: "aasya aasya f|آسيا آسيا", mexico: "il-miksook il-miksook f|المكسيك المكسيك",
    gulf: "il-5aleej il-5aleej m|الخليج الخليج", capital_: "3aa9ima 3awaa9im f|عاصمة عواصم", dubai_c: "dbay dbay f|دبي دبي", abudhabi: "abu6'abi abu6'abi f|أبوظبي أبوظبي",
    sharjah: "ish-shaarja ish-shaarja f|الشارجة الشارجة", ajman: "3ajmaan 3ajmaan f|عجمان عجمان", fujairah: "il-fujaira il-fujaira f|الفجيرة الفجيرة", alain: "il-3ain il-3ain f|العين العين",
    trace: "athar aathaar m|أثر آثار", selfie: "selfie selfiyaat m|سيلفي سيلفيات", meme: "meem meemaat m|ميم ميمات",
    gif: "gif gifaat m|قف قفات", sticker: "stikar stikaraat m|ستيكر ستيكرات", emoji: "emoji emojiyaat m|إيموجي إيموجيات", subscriber: "mushtarik mushtarikeen mh|مشترك مشتركين",
    podcast: "podcast podcastaat m|بودكاست بودكاستات", playlist: "playlist playlistaat m|بلايلست بلايلستات", album: "alboom alboomaat m|ألبوم ألبومات", beat: "beat beataat m|بيت بيتات",
    lyrics: "kalimaat kalimaat f|كلمات كلمات", remix: "remix remixaat m|ريمكس ريمكسات", karak: "karak karak m|كرك كرك", machboos: "machboos machboos m|مچبوس مچبوس",
    biryani: "biryaani biryaani m|برياني برياني", mandi: "mandi mandi m|مندي مندي", luqaimat: "lgaimaat lgaimaat f|لقيمات لقيمات", harees: "harees harees m|هريس هريس",
    balaleet: "balaleet balaleet m|بلاليط بلاليط", laban: "laban laban m|لبن لبن", ox: "thoor theeraan m|ثور ثيران", cactus: "9abbaar 9abbaar m|صبار صبار", tourist: "saayi7 suwwaa7 mh|سايح سواح", tourism: "siyaa7a siyaa7a f|سياحة سياحة", embassy: "sifaara sifaaraat f|سفارة سفارات",
    customs: "jamaarik jamaarik f|جمارك جمارك", immigration: "jawaazaat jawaazaat f|جوازات جوازات", residency: "igaama igaamaat f|إقامة إقامات", nationality_: "jinsiyya jinsiyyaat f|جنسية جنسيات",
  };
  const X2_ADJS = {
    medical: "6ibbi 6ibbiyya 6ibbiyyeen|طبي طبية طبيين", willing: "musta3idd musta3idda musta3iddeen|مستعد مستعدة مستعدين", responsible: "mas2ool mas2oola mas2ooleen|مسؤول مسؤولة مسؤولين",
    blind: "a3ma 3amya 3imyaan|أعمى عميا عميان", deaf: "a6rash 6arsha 6ursh|أطرش طرشا طرش", tight: "9'ayyig 9'ayyga 9'ayygeen|ضيق ضيقة ضيقين",
    usual: "mu3taad mu3taada mu3taadeen|معتاد معتادة معتادين", aware: "3aarif 3aarfa 3aarfeen|عارف عارفة عارفين", social: "ijtimaa3i ijtimaa3iyya ijtimaa3iyyeen|اجتماعي اجتماعية اجتماعيين",
    brilliant: "raa2i3 raa2i3a raa2i3een|رائع رائعة رائعين", tiny: "9i3'eer 9i3'eera 9i3'aar|صغير صغيرة صغار", naked: "3aryaan 3aryaana 3araaya|عريان عريانة عرايا",
    fancy: "faa5ir faa5ra faa5reen|فاخر فاخرة فاخرين", exciting: "mumti3 mumti3a mumti3een|ممتع ممتعة ممتعين", likely: "mu7tamal mu7tamala mu7tamaleen|محتمل محتملة محتملين",
    romantic: "roomaansi roomaansiyya roomaansiyyeen|رومانسي رومانسية رومانسيين", familiar: "ma3roof ma3roofa ma3roofeen|معروف معروفة معروفين", political: "siyaasi siyaasiyya siyaasiyyeen|سياسي سياسية سياسيين",
    proper: "munaasib munaasiba munaasibeen|مناسب مناسبة مناسبين", ashamed: "mista7i mista7ya mista7yeen|مستحي مستحية مستحيين", positive: "eejaabi eejaabiyya eejaabiyyeen|إيجابي إيجابية إيجابيين",
    negative: "salbi salbiyya salbiyyeen|سلبي سلبية سلبيين", odd: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين", royal: "malaki malakiyya malakiyyeen|ملكي ملكية ملكيين",
    pure: "9aafi 9aafya 9aafyeen|صافي صافية صافيين", pissed: "m3a99ib m3a99ba m3a99been|معصب معصبة معصبين", central: "markazi markaziyya markaziyyeen|مركزي مركزية مركزيين",
    grateful: "mamnoon mamnoona mamnooneen|ممنون ممنونة ممنونين", capable: "gaadir gaadra gaadreen|قادر قادرة قادرين", unbelievable: "ma yit9addag ma tit9addag ma yit9addagoon|ما يتصدق ما تتصدق ما يتصدقون",
    curious: "fu9'ooli fu9'ooliyya fu9'ooliyyeen|فضولي فضولية فضوليين", desperate: "yaa2is yaa2sa yaa2seen|يائس يائسة يائسين", dramatic: "draami draamiyya draamiyyeen|درامي درامية دراميين",
    convinced: "mugtani3 mugtan3a mugtan3een|مقتنع مقتنعة مقتنعين", successful: "naaji7 naaj7a naaj7een|ناجح ناجحة ناجحين", ordinary: "3aadi 3aadiyya 3aadiyyeen|عادي عادية عاديين",
    direct: "mubaashir mubaashira mubaashireen|مباشر مباشرة مباشرين", armed: "musalla7 musalla7a musalla7een|مسلح مسلحة مسلحين", unusual: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين",
    trapped: "ma79oor ma79oora ma79ooreen|محصور محصورة محصورين", nasty: "5aayis 5aaysa 5aayseen|خايس خايسة خايسين", friendly: "la6eef la6eefa lu6afa|لطيف لطيفة لطفا",
    engaged: "ma56oob ma56ooba ma56oobeen|مخطوب مخطوبة مخطوبين", charming: "jadhdhaab jadhdhaaba jadhdhaabeen|جذاب جذابة جذابين", similar: "mutashaabih mutashaabiha mutashaabiheen|متشابه متشابهة متشابهين",
    gorgeous: "jameel jameela jameeleen|جميل جميلة جميلين", sexy: "jadhdhaab jadhdhaaba jadhdhaabeen|جذاب جذابة جذابين", giant_: "3imlaag 3imlaaga 3amaalga|عملاق عملاقة عمالقة",
    exact: "bi6'-6'ab6|بالضبط", several: "kam|كم", plenty: "wayed|وايد", screwed: "raa7 feeha raa7at feeha raa7aw feeha|راح فيها راحت فيها راحوا فيها",
    spare: "i7tiyaa6i i7tiyaa6iyya i7tiyaa6iyyeen|احتياطي احتياطية احتياطيين", loose: "waasi3 waas3a waas3een|واسع واسعة واسعين", firm: "thaabit thaabta thaabteen|ثابت ثابتة ثابتين",
    physical: "jasadi jasadiyya jasadiyyeen|جسدي جسدية جسديين", mental: "nafsi nafsiyya nafsiyyeen|نفسي نفسية نفسيين", emotional: "3aa6ifi 3aa6ifiyya 3aa6ifiyyeen|عاطفي عاطفية عاطفيين",
    senior: "akbar|أكبر", junior: "a93'ar|أصغر", prime: "ra2eesi ra2eesiyya ra2eesiyyeen|رئيسي رئيسية رئيسيين", united: "mutta7id mutta7ida mutta7ideen|متحد متحدة متحدين",
    ridiculous: "mu9'7ik mu9'7ika mu9'7ikeen|مضحك مضحكة مضحكين", wild: "barri barriyya barriyyeen|بري برية بريين", asleep: "raagid raagda raagdeen|راقد راقدة راقدين", awake_: "9aa7i 9aa7ya 9aa7een|صاحي صاحية صاحين",
    mad_: "m3a99ib m3a99ba m3a99been|معصب معصبة معصبين", furious: "m3a99ib wayed m3a99ba wayed m3a99been wayed|معصب وايد معصبة وايد معصبين وايد", upset: "za3laan za3laana za3laaneen|زعلان زعلانة زعلانين",
    sad_: "za3laan za3laana za3laaneen|زعلان زعلانة زعلانين", glad: "mabsoo6 mabsoo6a mabsoo6een|مبسوط مبسوطة مبسوطين", pleased: "mabsoo6 mabsoo6a mabsoo6een|مبسوط مبسوطة مبسوطين",
    satisfied: "raa9'i raa9'ya raa9'yeen|راضي راضية راضيين", thankful: "shaakir shaakra shaakreen|شاكر شاكرة شاكرين", hopeful: "mitfaa2il mitfaa2la mitfaa2leen|متفائل متفائلة متفائلين",
    hopeless: "mayyoos minna mayyoos minha mayyoos minhum|ميؤوس منه ميؤوس منها ميؤوس منهم", helpless: "3aajiz 3aajza 3aajzeen|عاجز عاجزة عاجزين", lonely: "wa7eed wa7eeda wa7eedeen|وحيد وحيدة وحيدين",
    homesick: "mishtaag lil-bait mishtaaga lil-bait mishtaageen lil-bait|مشتاق للبيت مشتاقة للبيت مشتاقين للبيت", bored_: "mallaan mallaana mallaaneen|ملان ملانة ملانين", exhausted: "mayyit ta3ab mayyta ta3ab mayyteen ta3ab|ميت تعب ميتة تعب ميتين تعب",
    dizzy: "daay5 daay5a daay5een|دايخ دايخة دايخين", nauseous: "3indi 3'athayaan 3indi 3'athayaan 3indi 3'athayaan|عندي غثيان عندي غثيان عندي غثيان", injured: "mi9aab mi9aaba mi9aabeen|مصاب مصابة مصابين",
    wounded: "majroo7 majroo7a majroo7een|مجروح مجروحة مجروحين", disabled: "min a97aab il-himam min a97aab il-himam min a97aab il-himam|من أصحاب الهمم من أصحاب الهمم من أصحاب الهمم", fine_: "zain zaina zaineen|زين زينة زينين",
  };
  const X2_VERBS = {
    consider: ["i3tabart i3tabar 3tibir i3tibir|اعتبرت اعتبر اعتبر اعتبر", { lv: 'i' }],
    wonder: ["tsaa2alt tsaa2al tsaa2al tsaa2al|تساءلت تساءل تساءل تساءل", { lv: 'i' }],
    beg: ["trajjait trajja trajja trajja|ترجيت ترجى ترجى ترجى", { lv: 'i' }],
    remain: ["6'allait 6'all 6'all 6'all|ظليت ظل ظل ظل", {}],
    discuss: ["naagasht naagash naagish naagish|ناقشت ناقش ناقش ناقش", {}],
    pretend: ["maththalt maththal maththil maththil|مثلت مثل مثل مثل", {}],
    release: ["nazzalt nazzal nazzil nazzil|نزلت نزل نزل نزل", {}],
    focus: ["rakkazt rakkaz rakkiz rakkiz|ركزت ركز ركز ركز", { on: '3ala' }],
    concentrate: ["rakkazt rakkaz rakkiz rakkiz|ركزت ركز ركز ركز", { on: '3ala' }],
    suggest: ["igtara7t igtara7 gtiri7 igtiri7|اقترحت اقترح اقترح اقترح", { lv: 'i' }],
    bite: ["3a9'9'ait 3a9'9' 3u9'9' 3u9'9'|عضيت عض عض عض", { past: 'bit', pp: 'bitten' }],
    access: ["dishait dash dish dish|دشيت دش دش دش", { lv: 'i' }],
    spread: ["nashart nashar nshur unshur|نشرت نشر نشر انشر", { past: 'spread', pp: 'spread', lv: 'u' }],
    regret: ["nidamt nidam ndam indam|ندمت ندم ندم اندم", { lv: 'a', on: '3ala', obj: '3ala', objNP: '3ala' }],
    cause: ["sabbabt sabbab sabbib sabbib|سببت سبب سبب سبب", {}],
    rush: ["ista3jalt ista3jal sta3jil ista3jil|استعجلت استعجل استعجل استعجل", { lv: 'i' }],
    hurry_: ["ista3jalt ista3jal sta3jil ista3jil|استعجلت استعجل استعجل استعجل", { lv: 'i' }],
    vote: ["9awwatt 9awwat 9awwit 9awwit|صوتت صوت صوت صوت", { for: 'li' }],
    pack: ["7a9'9'art 7a9'9'ar 7a9'9'ir 7a9'9'ir|حضرت حضر حضر حضر", {}],
    offer: ["3ara9't 3ara9' 3ri9' i3ri9'|عرضت عرض عرض اعرض", { lv: 'i', obj: '3ala', objNP: '3ala' }],
    convince: ["agna3t agna3 gni3 igni3|أقنعت أقنع قنع أقنع", { lv: 'i' }],
    tear: ["sharra6t sharra6 sharri6 sharri6|شرطت شرط شرط شرط", { past: 'tore', pp: 'torn' }],
    rip: ["sharra6t sharra6 sharri6 sharri6|شرطت شرط شرط شرط", {}],
    stare: ["7addagt 7addag 7addig 7addig|حدقت حدق حدق حدق", { at: 'fi', obj: 'fi', objNP: 'fi' }],
    provide: ["waffart waffar waffir waffir|وفرت وفر وفر وفر", {}],
    seek: ["dawwart dawwar dawwir dawwir|دورت دور دور دور", { past: 'sought', pp: 'sought', obj: '3ala', objNP: '3ala' }],
    approach: ["garrabt garrab garrib garrib|قربت قرب قرب قرب", { obj: 'min', objNP: 'min' }],
    sacrifice: ["9'a77ait 9'a77a 9'a77i 9'a77i|ضحيت ضحى ضحي ضحي", { obj: 'b', objNP: 'b' }],
    shop: ["tsawwagt tsawwag tsawwag tsawwag|تسوقت تسوق تسوق تسوق", { lv: 'i' }],
    'freak out': ["injannait injann injann injann|انجنيت انجن انجن انجن", { lv: 'i' }],
    drag: ["si7abt si7ab s7ab is7ab|سحبت سحب سحب اسحب", { lv: 'i' }],
    dump: ["ramait rama rmi irmi|رميت رمى رمي ارم", { lv: 'i' }],
    lay: ["7a66ait 7a66 7u66 7u66|حطيت حط حط حط", { past: 'laid', pp: 'laid' }],
    'lie down': ["insida7t insida7 nsidi7 insidi7|انسدحت انسدح انسدح انسدح", { past: 'lay', pp: 'lain', lv: 'i' }],
    settle: ["istagarrait istagarr stagirr istagirr|استقريت استقر استقر استقر", { lv: 'i' }],
    'settle down': ["istagarrait istagarr stagirr istagirr|استقريت استقر استقر استقر", { lv: 'i' }],
    belong: ["=do", { tail: '7agg|حق' }],
    exist: ["=do", { tail: 'mawjood|موجود' }],
    strike: ["6aggait 6agg 6igg 6igg|طقيت طق طق طق", { past: 'struck', pp: 'struck' }],
    note: ["laa7a6't laa7a6' laa7i6' laa7i6'|لاحظت لاحظ لاحظ لاحظ", {}],
    observe: ["laa7a6't laa7a6' laa7i6' laa7i6'|لاحظت لاحظ لاحظ لاحظ", {}],
    'take advantage of': ["ista3'allait ista3'all sta3'ill ista3'ill|استغليت استغل استغل استغل", { past: 'took', pp: 'taken', lv: 'i' }],
    exploit: ["ista3'allait ista3'all sta3'ill ista3'ill|استغليت استغل استغل استغل", { lv: 'i' }],
    'take revenge': ["intagamt intagam ntigim intigim|انتقمت انتقم انتقم انتقم", { past: 'took', pp: 'taken', lv: 'i', on: 'min' }],
    revenge_v: ["intagamt intagam ntigim intigim|انتقمت انتقم انتقم انتقم", { lv: 'i', on: 'min' }],
    suck: ["=do", { tail: '5aayis|خايس' }],
    bang: ["6aggait 6agg 6igg 6igg|طقيت طق طق طق", {}],
    crack: ["kassart kassar kassir kassir|كسرت كسر كسر كسر", {}],
    crush: ["ha9'amt ha9'am h9'im ih9'im|هضمت هضم هضم اهضم", { lv: 'i' }],
    smash: ["kassart kassar kassir kassir|كسرت كسر كسر كسر", {}],
    hook: ["3allagt 3allag 3allig 3allig|علقت علق علق علق", {}],
    dig_: ["7afart 7afar 7fur u7fur|حفرت حفر حفر احفر", { past: 'dug', pp: 'dug', lv: 'u' }],
    bury: ["dafant dafan dfin idfin|دفنت دفن دفن ادفن", { past: 'buried', pp: 'buried', lv: 'i' }],
    hunt_: ["9idt 9aad 9eed 9eed|صدت صاد صيد صيد", {}],
    fish_v: ["9idt 9aad 9eed 9eed|صدت صاد صيد صيد", {}],
    sail: ["ab7art ab7ar b7ir ab7ir|أبحرت أبحر بحر أبحر", { lv: 'i' }],
    fly_: ["6irt 6aar 6eer 6eer|طرت طار طير طير", { past: 'flew', pp: 'flown' }],
    land_v: ["nizalt nizal nzil inzil|نزلت نزل نزل انزل", { lv: 'i' }],
    crash_: ["6i7t 6aa7 6ee7 6ee7|طحت طاح طيح طيح", {}],
    sink_: ["3'irigt 3'irig 3'rag i3'rag|غرقت غرق غرق اغرق", { past: 'sank', pp: 'sunk', lv: 'a' }],
    wander: ["tmashshait tmashsha tmashsha tmashsha|تمشيت تمشى تمشى تمشى", { lv: 'i' }],
    roam: ["tmashshait tmashsha tmashsha tmashsha|تمشيت تمشى تمشى تمشى", { lv: 'i' }],
    stroll: ["tmashshait tmashsha tmashsha tmashsha|تمشيت تمشى تمشى تمشى", { lv: 'i' }],
    hike: ["tmashshait tmashsha tmashsha tmashsha|تمشيت تمشى تمشى تمشى", { lv: 'i' }],
    camp_v: ["5ayyamt 5ayyam 5ayyim 5ayyim|خيمت خيم خيم خيم", {}],
    hunt_g: ["9idt 9aad 9eed 9eed|صدت صاد صيد صيد", {}],
    obtain: ["7a99alt 7a99al 7a99il 7a99il|حصلت حصل حصل حصل", {}],
    acquire: ["7a99alt 7a99al 7a99il 7a99il|حصلت حصل حصل حصل", {}],
    gain: ["kisabt kisab ksab iksab|كسبت كسب كسب اكسب", { lv: 'i' }],
    lose_: ["5sirt 5isar 5sar i5sar|خسرت خسر خسر اخسر", { past: 'lost', pp: 'lost', lv: 'a' }],
    keep_: ["5allait 5alla 5alli 5alli|خليت خلى خلي خلي", { past: 'kept', pp: 'kept' }],
    maintain: ["7aafa6't 7aafa6' 7aafi6' 7aafi6'|حافظت حافظ حافظ حافظ", { on: '3ala', obj: '3ala', objNP: '3ala' }],
    preserve: ["7aafa6't 7aafa6' 7aafi6' 7aafi6'|حافظت حافظ حافظ حافظ", { on: '3ala', obj: '3ala', objNP: '3ala' }],
    store_v: ["5azzant 5azzan 5azzin 5azzin|خزنت خزن خزن خزن", {}],
    hoard: ["5azzant 5azzan 5azzin 5azzin|خزنت خزن خزن خزن", {}],
    stock: ["5azzant 5azzan 5azzin 5azzin|خزنت خزن خزن خزن", {}],
    supply: ["waffart waffar waffir waffir|وفرت وفر وفر وفر", { past: 'supplied', pp: 'supplied' }],
    demand: ["6alabt 6alab 6lub i6lub|طلبت طلب طلب اطلب", { lv: 'u' }],
    request: ["6alabt 6alab 6lub i6lub|طلبت طلب طلب اطلب", { lv: 'u' }],
    require: ["i7taajt i7taaj 7taaj i7taaj|احتجت احتاج احتاج احتاج", { lv: 'i' }],
    lack: ["=do", { tail: 'naagi9|ناقص' }],
    include: ["shimalt shimal shmal ishmal|شملت شمل شمل اشمل", { lv: 'a' }],
    contain: ["=do", { tail: 'fee|فيه' }],
    involve: ["shimalt shimal shmal ishmal|شملت شمل شمل اشمل", { lv: 'a' }],
    affect: ["aththart aththar aththir aththir|أثرت أثر أثر أثر", { on: '3ala', obj: '3ala', objNP: '3ala' }],
    influence: ["aththart aththar aththir aththir|أثرت أثر أثر أثر", { on: '3ala', obj: '3ala', objNP: '3ala' }],
    impress: ["abhart abhar bhir abhir|أبهرت أبهر بهر أبهر", { lv: 'i' }],
    inspire: ["alhamt alham lhim alhim|ألهمت ألهم لهم ألهم", { lv: 'i' }],
    motivate: ["7affazt 7affaz 7affiz 7affiz|حفزت حفز حفز حفز", {}],
    satisfy: ["ra9'9'ait ra9'9'a ra9'9'i ra9'9'i|رضيت رضى رضي رضي", { past: 'satisfied', pp: 'satisfied' }],
    disappoint: ["5ayyabt 5ayyab 5ayyib 5ayyib|خيبت خيب خيب خيب", {}],
    embarrass: ["a7rajt a7raj 7rij a7rij|أحرجت أحرج حرج أحرج", { lv: 'i' }],
    confuse: ["la5ba6t la5ba6 la5bi6 la5bi6|لخبطت لخبط لخبط لخبط", {}],
    shock: ["9adamt 9adam 9dim i9dim|صدمت صدم صدم اصدم", { lv: 'i' }],
    amaze: ["abhart abhar bhir abhir|أبهرت أبهر بهر أبهر", { lv: 'i' }],
    attract: ["jadhabt jadhab jdhib ijdhib|جذبت جذب جذب اجذب", { lv: 'i' }],
    tempt: ["3'arrait 3'arra 3'arri 3'arri|غريت غرى غري غري", {}],
    seduce: ["3'arrait 3'arra 3'arri 3'arri|غريت غرى غري غري", {}],
    trick_v: ["9'i7akt_3ala 9'i7ak_3ala 9'7ak_3ala i9'7ak_3ala|ضحكت_على ضحك_على ضحك_على اضحك_على", { lv: 'i' }],
    fool_v: ["9'i7akt_3ala 9'i7ak_3ala 9'7ak_3ala i9'7ak_3ala|ضحكت_على ضحك_على ضحك_على اضحك_على", { lv: 'i' }],
    deceive: ["5ada3t 5ada3 5da3 i5da3|خدعت خدع خدع اخدع", { lv: 'a' }],
    betray: ["5unt 5aan 5oon 5oon|خنت خان خون خون", {}],
    abandon: ["hajart hajar hjur uhjur|هجرت هجر هجر اهجر", { lv: 'u' }],
    neglect: ["ahmalt ahmal hmil ahmil|أهملت أهمل همل أهمل", { lv: 'i' }],
    forgive_me: ["saama7t saama7 saami7 saami7|سامحت سامح سامح سامح", {}],
    punish: ["3aagabt 3aagab 3aagib 3aagib|عاقبت عاقب عاقب عاقب", {}],
    reward_v: ["kaafa2t kaafa2 kaafi2 kaafi2|كافأت كافأ كافئ كافئ", {}],
    praise: ["mada7t mada7 mda7 imda7|مدحت مدح مدح امدح", { lv: 'a' }],
    compliment: ["mada7t mada7 mda7 imda7|مدحت مدح مدح امدح", { lv: 'a' }],
    criticize: ["intagadt intagad ntigid intigid|انتقدت انتقد انتقد انتقد", { lv: 'i' }],
    criticise: ["intagadt intagad ntigid intigid|انتقدت انتقد انتقد انتقد", { lv: 'i' }],
    accuse: ["ittahamt ittaham ttihim ittihim|اتهمت اتهم اتهم اتهم", { lv: 'i', obj: 'b', objNP: 'b' }],
    suspect_v: ["shakkait shakk shikk shikk|شكيت شك شك شك", { obj: 'fi', objNP: 'fi' }],
    investigate: ["7aggagt 7aggag 7aggig 7aggig|حققت حقق حقق حقق", { in: 'fi' }],
    interrogate: ["istajwabt istajwab stajwib istajwib|استجوبت استجوب استجوب استجوب", { lv: 'i' }],
    question_v: ["sa2alt sa2al s2al is2al|سألت سأل سأل اسأل", { lv: 'i' }],
    interview: ["gaabalt gaabal gaabil gaabil|قابلت قابل قابل قابل", {}],
    hire_: ["wa6'6'aft wa6'6'af wa6'6'if wa6'6'if|وظفت وظف وظف وظف", {}],
    promote: ["raggait ragga raggi raggi|رقيت رقى رقي رقي", {}],
    demote: ["nazzalt nazzal nazzil nazzil|نزلت نزل نزل نزل", {}],
    transfer_p: ["nagalt nagal ngil ingil|نقلت نقل نقل انقل", { lv: 'i' }],
    assign: ["kallaft kallaf kallif kallif|كلفت كلف كلف كلف", {}],
    appoint: ["3ayyant 3ayyan 3ayyin 3ayyin|عينت عين عين عين", {}],
    elect: ["inta5abt inta5ab nti5ib inti5ib|انتخبت انتخب انتخب انتخب", { lv: 'i' }],
    govern: ["7akamt 7akam 7kum i7kum|حكمت حكم حكم احكم", { lv: 'i' }],
    rule: ["7akamt 7akam 7kum i7kum|حكمت حكم حكم احكم", { lv: 'i' }],
    conquer: ["i7tallait i7tall 7till i7till|احتليت احتل احتل احتل", { lv: 'i' }],
    invade: ["3'azait 3'aza 3'zi i3'zi|غزيت غزا غزي اغز", { lv: 'i' }],
    occupy: ["i7tallait i7tall 7till i7till|احتليت احتل احتل احتل", { past: 'occupied', pp: 'occupied', lv: 'i' }],
    surrender: ["istaslamt istaslam staslim istaslim|استسلمت استسلم استسلم استسلم", { lv: 'i' }],
    retreat: ["insa7abt insa7ab nsi7ib insi7ib|انسحبت انسحب انسحب انسحب", { lv: 'i' }],
    advance: ["tgaddamt tgaddam tgaddam tgaddam|تقدمت تقدم تقدم تقدم", { lv: 'i' }],
    patrol: ["=do", { tail: 'dawriyya|دورية' }],
    deploy_m: ["nazzalt nazzal nazzil nazzil|نزلت نزل نزل نزل", {}],
    arm: ["salla7t salla7 salli7 salli7|سلحت سلح سلح سلح", {}],
    load: ["3abbait 3abba 3abbi 3abbi|عبيت عبى عبي عبي", {}],
    fire_w: ["6aggait 6agg 6igg 6igg|طقيت طق طق طق", {}],
    bomb_v: ["gu9aft gu9af g9if ig9if|قصفت قصف قصف اقصف", { lv: 'i' }],
    explode_: ["infajart infajar nfijir infijir|انفجرت انفجر انفجر انفجر", { lv: 'i' }],
    wound: ["jara7t jara7 jra7 ijra7|جرحت جرح جرح اجرح", { lv: 'a' }],
    injure: ["jara7t jara7 jra7 ijra7|جرحت جرح جرح اجرح", { lv: 'a' }],
    capture: ["asart asar sir asir|أسرت أسر سر أسر", { lv: 'i' }],
    imprison: ["sijant sijan sjin isjin|سجنت سجن سجن اسجن", { lv: 'i' }],
    execute: ["a3damt a3dam 3dim a3dim|أعدمت أعدم عدم أعدم", { lv: 'i' }],
    spy_v: ["tjassast tjassas tjassas tjassas|تجسست تجسس تجسس تجسس", { lv: 'i', on: '3ala' }],
    sneak: ["tsallalt tsallal tsallal tsallal|تسللت تسلل تسلل تسلل", { past: 'snuck', pp: 'snuck', lv: 'i' }],
    disguise: ["tnakkart tnakkar tnakkar tnakkar|تنكرت تنكر تنكر تنكر", { lv: 'i' }],
    reveal: ["kashaft kashaf kshif ikshif|كشفت كشف كشف اكشف", { lv: 'i' }],
    expose: ["kashaft kashaf kshif ikshif|كشفت كشف كشف اكشف", { lv: 'i' }],
    leak: ["sarrabt sarrab sarrib sarrib|سربت سرب سرب سرب", {}],
    announce: ["a3lant a3lan 3lin a3lin|أعلنت أعلن علن أعلن", { lv: 'i' }],
    declare: ["a3lant a3lan 3lin a3lin|أعلنت أعلن علن أعلن", { lv: 'i' }],
    inform: ["5abbart 5abbar 5abbir 5abbir|خبرت خبر خبر خبر", {}],
    notify: ["5abbart 5abbar 5abbir 5abbir|خبرت خبر خبر خبر", { past: 'notified', pp: 'notified' }],
    remind: ["dhakkart dhakkar dhakkir dhakkir|ذكرت ذكر ذكر ذكر", { obj: 'b', objNP: 'b' }],
    recall: ["tdhakkart tdhakkar tdhakkar tdhakkar|تذكرت تذكر تذكر تذكر", { lv: 'i' }],
    memorize: ["7afa6't 7afa6' 7fa6' i7fa6'|حفظت حفظ حفظ احفظ", { lv: 'a' }],
    memorise: ["7afa6't 7afa6' 7fa6' i7fa6'|حفظت حفظ حفظ احفظ", { lv: 'a' }],
    revise: ["raaja3t raaja3 raaji3 raaji3|راجعت راجع راجع راجع", {}],
    review: ["raaja3t raaja3 raaji3 raaji3|راجعت راجع راجع راجع", {}],
    solve_: ["7allait 7all 7ill 7ill|حليت حل حل حل", {}],
    calculate: ["7asabt 7asab 7sib i7sib|حسبت حسب حسب احسب", { lv: 'i' }],
    estimate: ["gaddart gaddar gaddir gaddir|قدرت قدر قدر قدر", {}],
    predict: ["twagga3t twagga3 twagga3 twagga3|توقعت توقع توقع توقع", { lv: 'i' }],
    analyze: ["7allalt 7allal 7allil 7allil|حللت حلل حلل حلل", {}],
    analyse: ["7allalt 7allal 7allil 7allil|حللت حلل حلل حلل", {}],
    examine: ["fa7a9t fa7a9 f7a9 if7a9|فحصت فحص فحص افحص", { lv: 'a' }],
    inspect: ["fa7a9t fa7a9 f7a9 if7a9|فحصت فحص فحص افحص", { lv: 'a' }],
    experiment: ["jarrabt jarrab jarrib jarrib|جربت جرب جرب جرب", {}],
    invent: ["i5tara3t i5tara3 5tiri3 i5tiri3|اخترعت اخترع اخترع اخترع", { lv: 'i' }],
    produce: ["antajt antaj ntij antij|أنتجت أنتج نتج أنتج", { lv: 'i' }],
    manufacture: ["9anna3t 9anna3 9anni3 9anni3|صنعت صنع صنع صنع", {}],
    assemble: ["rakkabt rakkab rakkib rakkib|ركبت ركب ركب ركب", {}],
    construct: ["banait bana bni ibni|بنيت بنى بني ابن", { lv: 'i' }],
    demolish: ["haddait hadd hidd hidd|هديت هد هد هد", {}],
    paint_: ["9aba3't 9aba3' 9bu3' u9bu3'|صبغت صبغ صبغ اصبغ", { lv: 'u' }],
    decorate: ["zayyant zayyan zayyin zayyin|زينت زين زين زين", {}],
    furnish: ["aththatht aththath aththith aththith|أثثت أثث أثث أثث", {}],
    renovate: ["jaddadt jaddad jaddid jaddid|جددت جدد جدد جدد", {}],
    rent_: ["ista2jart ista2jar sta2jir ista2jir|استأجرت استأجر استأجر استأجر", { lv: 'i' }],
    lease: ["ajjart ajjar ajjir ajjir|أجرت أجر أجر أجر", {}],
    mortgage: ["rahant rahan rhin irhin|رهنت رهن رهن ارهن", { lv: 'i' }],
    insure: ["ammant amman ammin ammin|أمنت أمن أمن أمن", { on: '3ala' }],
    sue: ["gaa9'ait gaa9'a gaa9'i gaa9'i|قاضيت قاضى قاضي قاض", {}],
    appeal: ["ista2naft ista2naf sta2nif ista2nif|استأنفت استأنف استأنف استأنف", { lv: 'i' }],
    testify: ["shahadt shihad shhad ishhad|شهدت شهد شهد اشهد", { past: 'testified', pp: 'testified', lv: 'a' }],
    swear_in: ["7alaft 7alaf 7lif i7lif|حلفت حلف حلف احلف", { lv: 'i' }],
    sentence_v: ["7akamt 7akam 7kum i7kum|حكمت حكم حكم احكم", { lv: 'i', on: '3ala' }],
    fine_v: ["3'arramt 3'arram 3'arrim 3'arrim|غرمت غرم غرم غرم", {}],
    ticket_v: ["3'arramt 3'arram 3'arrim 3'arrim|غرمت غرم غرم غرم", {}],
    tow: ["si7abt si7ab s7ab is7ab|سحبت سحب سحب اسحب", { lv: 'i' }],
    speed: ["ista3jalt ista3jal sta3jil ista3jil|استعجلت استعجل استعجل استعجل", { lv: 'i' }],
    overtake: ["tjaawazt tjaawaz tjaawaz tjaawaz|تجاوزت تجاوز تجاوز تجاوز", { past: 'overtook', pp: 'overtaken', lv: 'i' }],
    brake: ["farmalt farmal farmil farmil|فرملت فرمل فرمل فرمل", {}],
    honk: ["dagait dagg digg digg|دقيت دق دق دق", { obj: '3ala', objNP: '3ala' }],
    reverse: ["raja3t_warra raja3_warra rja3_warra irja3_warra|رجعت_ورا رجع_ورا رجع_ورا ارجع_ورا", { lv: 'i' }],
    steer: ["sugt saag soog soog|سقت ساق سوق سوق", {}],
    refuel: ["3abbait_banzeen 3abba_banzeen 3abbi_banzeen 3abbi_banzeen|عبيت_بنزين عبى_بنزين عبي_بنزين عبي_بنزين", {}],
    commute: ["ri7t_lish-shu3'ul raa7_lish-shu3'ul roo7_lish-shu3'ul roo7_lish-shu3'ul|رحت_للشغل راح_للشغل روح_للشغل روح_للشغل", {}],
  };
  const X2_ADVS = {
    unfortunately: "lil-asaf|للأسف", fortunately: "lil-7a6'6'|للحظ", luckily: "lil-7a6'6'|للحظ", hopefully_: "insha2allah|إن شاء الله", truly: "9idj|صدج",
    therefore: "3ashaan chidhi|عشان چذي", someday: "yoom min il-ayyaam|يوم من الأيام", plus: "wba3ad|وبعد", likely_: "3ala il-a3'lab|على الأغلب", unlikely: "mob mu7tamal|مب محتمل",
    gosh: "ya salaam|يا سلام", amen: "aameen|آمين", bravo: "bravo|برافو", wherever_: "wain ma|وين ما", whenever_: "kil ma|كل ما",
    supposedly: "il-mafroo9'|المفروض", allegedly: "3ala ma ygooloon|على ما يقولون", presumably: "3ala il-a3'lab|على الأغلب", undoubtedly: "bdoon shakk|بدون شك", surely_: "akeed|أكيد",
    honestly_: "bi9raa7a|بصراحة", sadly: "lil-asaf|للأسف", thankfully: "il-7amdulillah|الحمدلله", seriously: "bjadd|بجد", ironically: "lil-mufaaraga|للمفارقة",
    sincerely: "b9idj|بصدج", respectfully: "b-kil i7tiraam|بكل احترام", kindly: "law sama7t|لو سمحت", gladly: "b-kil siroor|بكل سرور", willingly: "b-kil siroor|بكل سرور",
    accidentally_: "bil-3'ala6|بالغلط", purposely: "3an ga9d|عن قصد", intentionally: "3an ga9d|عن قصد", deliberately: "3an ga9d|عن قصد", randomly: "random|راندوم",
    silently: "bhudoo|بهدو", secretly: "b-sirr|بسر", openly: "3ala il-makshoof|على المكشوف", publicly: "3ala il-malaa|على الملا", privately: "3ala infiraad|على انفراد",
    online_a: "online|أونلاين", offline: "offline|أوفلاين", manually: "yadawi|يدوي", automatically_: "b-roo7a|بروحه", digitally: "digital|ديجيتال",
    partially: "juz2iyyan|جزئياً", entirely: "tamaaman|تماماً", totally_: "tamaaman|تماماً", wholly: "tamaaman|تماماً", altogether: "kil shay|كل شي",
    approximately_: "tagreeban|تقريباً", exactly: "bi6'-6'ab6|بالضبط", precisely_: "bi6'-6'ab6|بالضبط", merely: "bas|بس", solely: "bas|بس",
    namely: "ya3ni|يعني", thus: "3ashaan chidhi|عشان چذي", hence: "3ashaan chidhi|عشان چذي", whereas: "bainama|بينما", meanwhile_: "fi nafs il-wagt|في نفس الوقت",
  };
  const X2_FIXED = {
    'what a shame': "ya 5asaara|يا خسارة", 'shame on you': A3("3aib 3alaik|عيب عليك", "3aib 3alaich|عيب عليج", "3aib 3alaikum|عيب عليكم"), 'what a pity': "ya 5asaara|يا خسارة",
    'plenty of': "wayed|وايد", 'at the bottom': "ta7t|تحت", 'at the bottom of': "ta7t|تحت", 'due to': "bsabab|بسبب", 'because of': "bsabab|بسبب", 'thanks to': "bfa9'l|بفضل",
    'pardon': "na3am?|نعم؟", 'pardon me': "il-3afu|العفو", 'i beg your pardon': "na3am?|نعم؟", 'nonsense': "habal|هبل", 'what nonsense': "shu hal habal|شو هالهبل",
    'as usual': "mithil il-3aada|مثل العادة", 'the usual': "il-mu3taad|المعتاد", 'be aware': A3("intabih|انتبه", "intabhi|انتبهي", "intabhoo|انتبهوا"), 'social media': "soshal meedya|سوشال ميديا",
    'mister': "ustaadh|أستاذ", 'mr': "ustaadh|أستاذ", 'mrs': "madaam|مدام", 'madam': "madaam|مدام", 'ma am': "madaam|مدام",
    'thousands of': "aalaaf|آلاف", 'hundreds of': "miyaat|ميات", 'millions of': "malaayeen|ملايين", 'dozens of': "3ashraat|عشرات", 'tons of': "wayed|وايد", 'loads of': "wayed|وايد", 'a ton of': "wayed|وايد",
    'screw it': "5alaa9 6annish|خلاص طنش", 'screw this': "5alaa9 6annish|خلاص طنش", 'i am screwed': "ri7t feeha|رحت فيها", 'we are screwed': "ri7na feeha|رحنا فيها",
    'you are screwed': A3("ri7t feeha|رحت فيها", "ri7ti feeha|رحتي فيها", "ri7tu feeha|رحتوا فيها"), 'no harm': "ma fi 9'arar|ما في ضرر", 'no harm done': "ma 9aar shay|ما صار شي",
    'sooner or later': "3aajilan am aajilan|عاجلاً أم آجلاً", 'the sooner the better': "kil ma kaan asra3 a7san|كل ما كان أسرع أحسن", 'with your permission': A3("3an idhnak|عن إذنك", "3an idhnich|عن إذنج", "3an idhinkum|عن إذنكم"),
    'i am in a bad mood': "mazaaji mob zain|مزاجي مب زين", 'in a bad mood': "mazaaja mob zain|مزاجه مب زين", 'in a good mood': "mazaaja zain|مزاجه زين", 'i am in a good mood': "mazaaji zain|مزاجي زين",
    'not in the mood': "ma li 5ulg|ما لي خلق", 'i am not in the mood': "ma li 5ulg|ما لي خلق", 'in a rush': "mista3yil|مستعيل", 'i am in a rush': "ana mista3yil|أنا مستعيل", 'in a hurry': "mista3yil|مستعيل",
    'i am in a hurry': "ana mista3yil|أنا مستعيل", 'no rush': "ma fi 3ajala|ما في عجلة", 'no hurry': "ma fi 3ajala|ما في عجلة", 'take your time': A3("5idh raa7tak|خذ راحتك", "5idhi raa7tich|خذي راحتج", "5idhoo raa7atkum|خذوا راحتكم"),
    'my goodness': "ya salaam|يا سلام", 'oh my goodness': "ya salaam|يا سلام", 'goodness': "ya salaam|يا سلام", 'in shape': "fit|فت", 'out of shape': "mob fit|مب فت",
    'it sucks': "5aayis|خايس", 'this sucks': "hadha 5aayis|هذا خايس", 'that sucks': "hadha 5aayis|هذا خايس", 'you suck': A3("inta 5aayis|إنت خايس", "inti 5aaysa|إنتي خايسة", "intu 5aayseen|إنتو خايسين"),
    'sucks': "5aayis|خايس", 'in particular': "bil-dhaat|بالذات", 'belongs to me': "7aggi|حقي", 'it belongs to me': "hadha 7aggi|هذا حقي", 'belongs to you': A3("7aggak|حقك", "7aggich|حقج", "7aggkum|حقكم"),
    'belongs to him': "7agga|حقه", 'belongs to her': "7aggha|حقها", 'belongs to us': "7aggna|حقنا", 'belongs to them': "7agghum|حقهم", 'belong to': "7agg|حق", 'belongs to': "7agg|حق",
    'i am positive': "ana mit2akkid|أنا متأكد", 'i am certain': "ana mit2akkid|أنا متأكد", 'have mercy': "ir7am|ارحم", 'in terms of': "min naa7iyat|من ناحية", 'terms and conditions': "ish-shuroo6 wil-a7kaam|الشروط والأحكام",
    'cracked version': "nus5a cracked|نسخة كراكد", 'cracked apk': "apk cracked|apk كراكد", 'cracked game': "lu3ba cracked|لعبة كراكد", 'cracked app': "barnaamij cracked|برنامج كراكد",
    'at midnight': "nu9 il-lail|نص الليل", 'midnight': "nu9 il-lail|نص الليل", 'at dawn': "il-fayir|الفير", 'dawn': "il-fayir|الفير", 'at noon': "i6'-6'uhur|الظهر", 'noon': "i6'-6'uhur|الظهر",
    'i am curious': "abi a3arf|أبي أعرف", 'just curious': "bas abi a3arf|بس أبي أعرف", 'in a row': "3ala i6-6ool|على الطول", 'no clue': "ma adri abadan|ما أدري أبداً", 'i have no clue': "ma 3indi ay fikra|ما عندي أي فكرة",
    'not a clue': "ma adri abadan|ما أدري أبداً", 'it is destiny': "na9eeb|نصيب", 'destiny': "na9eeb|نصيب", 'go fishing': "aroo7 a9eed|أروح أصيد", 'similar to': "mithil|مثل",
    'real estate': "3agaaraat|عقارات", 'i am grateful': "ana mamnoon|أنا ممنون", 'i am thankful': "ana shaakir|أنا شاكر", 'much obliged': "mamnoon|ممنون",
    'such a': "wayed|وايد", 'such an': "wayed|وايد", 'what a': "shu hal|شو هال", 'what an': "shu hal|شو هال", 'how come': "laish|ليش", 'how so': "kaif|كيف", 'how about': "shu ra2yak fi|شو رأيك في",
    'what about': "shu 3an|شو عن", 'what if': "shu law|شو لو", 'as if': "ka2inn|كأن", 'as though': "ka2inn|كأن", 'even if': "7atta law|حتى لو", 'even though': "ma3a inn|مع إن", 'as long as': "6ool ma|طول ما",
    'in case': "a7san law|أحسن لو", 'just in case': "a7san law|أحسن لو", 'in that case': "3ayal|عيل", 'in any case': "3ala kil 7aal|على كل حال", 'in this case': "fi hal 7aala|في هالحالة",
    'on the other hand': "min naa7iya thaanya|من ناحية ثانية", 'on one hand': "min naa7iya|من ناحية", 'at the same time': "fi nafs il-wagt|في نفس الوقت", 'in the same time': "fi nafs il-wagt|في نفس الوقت",
    'first of all': "awwal shay|أول شي", 'last but not least': "wa5eeran|وأخيراً", 'all in all': "bil-majmal|بالمجمل", 'after all': "fil-aa5ir|في الآخر", 'above all': "gabil kil shay|قبل كل شي",
    'more or less': "tagreeban|تقريباً", 'sort of ': "shway|شوي", 'to some extent': "ila 7add ma|إلى حد ما", 'as a matter of fact': "bil-7ageega|بالحقيقة", 'in reality': "bil-waagi3|بالواقع",
    'needless to say': "mob laazim agool|مب لازم أقول", 'it goes without saying': "ma3roof|معروف", 'to make a long story short': "bi5ti9aar|باختصار", 'long story short': "bi5ti9aar|باختصار", 'in short': "bi5ti9aar|باختصار",
    'at the end of the day': "fil-aa5ir|في الآخر", 'when it comes to': "lamma yiyi il-kalaam 3an|لما ييي الكلام عن", 'as for': "amma|أما", 'regarding': "b5u9oo9|بخصوص", 'concerning': "b5u9oo9|بخصوص",
  };
  const X2_NOUN_ALIAS = { thoughts: 'thought', details: 'detail', woods: 'forest', attorney: 'lawyer', issue_: 'problem', folks: 'people', clinic_: 'clinic', zone: 'area', incident: 'accident', 
    gent: 'guy', gentleman: 'guy', madame: 'madam', champ: 'champion', buddy: 'friend', homie: 'friend', bestie: 'friend', bff: 'friend', fam: 'family', squad_: 'squad',
    cellphone_: 'phone', iphone: 'phone', android: 'phone', samsung: 'phone', pc_: 'computer', mac: 'laptop', macbook: 'laptop', ipad: 'tablet', airpods: 'headphones', earbuds: 'headphones', earphones: 'headphones',
    pics: 'picture', pic: 'picture', photos: 'picture', selfie: 'selfie', vids: 'video', vid: 'video', clip: 'video', memes: 'meme', meme: 'meme', gif: 'gif', sticker: 'sticker', emoji: 'emoji',
    dm: 'message', dms: 'message', pm: 'message', pms: 'message', msg: 'message', msgs: 'message', txt: 'message', notif: 'notification', notifs: 'notification', sub: 'subscriber', subs: 'subscriber',
    vlog: 'video', livestream: 'stream', podcast: 'podcast', playlist: 'playlist', album: 'album', track: 'song', tune: 'song', beat: 'beat', lyrics: 'lyrics', remix: 'remix',
    shawerma: 'shawarma', shawarmas: 'shawarma', karak: 'karak', chai: 'tea', coffee_: 'coffee', gahwa: 'coffee', qahwa: 'coffee', machboos: 'machboos', majboos: 'machboos', biryani: 'biryani', mandi: 'mandi',
    luqaimat: 'luqaimat', harees: 'harees', balaleet: 'balaleet', laban: 'laban', dukkan: 'shop', baqala: 'shop', bakala: 'shop', souq: 'market', souk: 'market' };
  const X2_PL_IRR = { people_: 'person', oxen: 'ox', cacti: 'cactus', fungi: 'fungus', criteria: 'criterion', phenomena: 'phenomenon', data: 'data', media: 'media' };
  for (const [k, v] of Object.entries(X2_NOUNS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_RAW) && !(kk + '_' in NOUN_RAW)) NOUN_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X2_ADJS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADJ_RAW) && !(kk + '_' in ADJ_RAW)) ADJ_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X2_VERBS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in VERB_RAW) && !(kk + '_' in VERB_RAW)) VERB_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X2_ADVS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADV_RAW) && !(kk + '_' in ADV_RAW)) ADV_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X2_FIXED)) { const kk = k.trim(); if (!(kk in FIXED_RAW)) FIXED_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X2_NOUN_ALIAS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_ALIAS)) NOUN_ALIAS[kk] = v; }
  for (const [k, v] of Object.entries(X2_PL_IRR)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_PL_IRR)) NOUN_PL_IRR[kk] = v; }
  for (const c of ['china', 'india', 'pakistan', 'saudi', 'america', 'usa', 'britain', 'uk', 'england', 'japan', 'korea', 'russia', 'turkey', 'germany', 'france', 'spain', 'italy', 'canada', 'australia',
    'brazil', 'iran', 'iraq', 'syria', 'lebanon', 'jordan', 'kuwait', 'qatar', 'bahrain', 'oman', 'yemen', 'morocco', 'algeria', 'tunisia', 'libya', 'sudan', 'philippines', 'indonesia', 'malaysia',
    'thailand', 'europe', 'africa', 'asia', 'mexico', 'gulf', 'abudhabi', 'sharjah', 'ajman', 'fujairah', 'alain']) PROPER.add(c);
  const X3_NOUNS = {
    spirit: "roo7 arwaa7 f|روح أرواح", credit: "ra9eed ra9eed m|رصيد رصيد", anger: "3a9abiyya 3a9abiyya f|عصبية عصبية", attitude: "stayl staylaat m|ستايل ستايلات",
    authority: "sul6a sul6aat f|سلطة سلطات", failure: "fashal fashal m|فشل فشل", nightmare: "kaaboos kawaabees m|كابوس كوابيس", glory: "majd majd m|مجد مجد",
    agency: "wakaala wakaalaat f|وكالة وكالات", rope: "7abil 7baal m|حبل حبال", duck: "ba66a ba66 f|بطة بط", reputation: "sum3a sum3a f|سمعة سمعة",
    flesh: "la7am la7am m|لحم لحم", senator: "naayib nuwwaab mh|نايب نواب", robbery: "sirga sirgaat f|سرقة سرقات", bay: "5aleej 5uljaan m|خليج خلجان",
    background: "5alfiyya 5alfiyyaat f|خلفية خلفيات", panic: "hala3 hala3 m|هلع هلع", agreement: "ittifaag ittifaagaat m|اتفاق اتفاقات", ability: "gudra gudraat f|قدرة قدرات",
    task: "muhimma muhimmaat f|مهمة مهمات", doll: "la3ba la3ab f|لعبة لعب", district: "man6iga manaa6ig f|منطقة مناطق", custody: "7a9'aana 7a9'aana f|حضانة حضانة",
    guarantee: "9'amaan 9'amaanaat m|ضمان ضمانات", warranty: "9'amaan 9'amaanaat m|ضمان ضمانات", policy: "siyaasa siyaasaat f|سياسة سياسات", maid: "5addaama 5addaamaat fh|خدامة خدامات",
    childhood: "6ufoola 6ufoola f|طفولة طفولة", chick: "bint banaat fh|بنت بنات", disaster: "kaaritha kawaarith f|كارثة كوارث", revolution: "thawra thawraat f|ثورة ثورات",
    demon: "shai6aan shayaa6een mh|شيطان شياطين", coincidence: "9udfa 9udaf f|صدفة صدف", crown: "taaj teejaan m|تاج تيجان", identity: "hawiyya hawiyyaat f|هوية هويات",
    potential: "imkaaniyya imkaaniyyaat f|إمكانية إمكانيات", guitar: "geetaar geetaaraat m|قيتار قيتارات", committee: "lajna lijaan f|لجنة لجان", dozen: "dazzeena dazzeenaat f|دزينة دزينات",
    swing: "maryoo7a maraajee7 f|مريوحة مراجيح", dirt: "wasa5 wasa5 m|وسخ وسخ", whistle: "9affaara 9affaaraat f|صفارة صفارات", behavior: "ta9arruf ta9arrufaat m|تصرف تصرفات",
    behaviour: "ta9arruf ta9arrufaat m|تصرف تصرفات", subtitle: "tarjama tarjamaat f|ترجمة ترجمات", explanation: "shar7 shuroo7 m|شرح شروح", billion: "milyaar milyaaraat m|مليار مليارات",
    duke: "doog doogaat mh|دوق دوقات", production: "intaaj intaaj m|إنتاج إنتاج", slave: "3abd 3abeed mh|عبد عبيد", mask: "ginaa3 agni3a m|قناع أقنعة",
    species: "faa9eela fa9aayil f|فصيلة فصايل", struggle: "mu3aanaa mu3aanaat f|معاناة معانات", dish: "6abag a6baag m|طبق أطباق", basement: "gabu gabawaat m|قبو قبوات",
    quarter: "rub3 arbaa3 m|ربع أرباع", navy: "ba7riyya ba7riyya f|بحرية بحرية", guts: "jur2a jur2a f|جرأة جرأة", quality: "jawda jawda f|جودة جودة",
    title: "3inwaan 3anaaween m|عنوان عناوين", punishment: "3igaab 3igaabaat m|عقاب عقابات", flash: "flaash flaashaat m|فلاش فلاشات", siren: "9affaara 9affaaraat f|صفارة صفارات",
    bowl: "zibdiyya zabaadi f|زبدية زبادي", tone: "nabra nabraat f|نبرة نبرات", drama: "draama draama f|دراما دراما", possibility: "i7timaal i7timaalaat m|احتمال احتمالات",
    baseball: "baysbool baysbool m|بيسبول بيسبول", assault: "i3tidaa i3tidaa2aat m|اعتداء اعتداءات", collection: "majmoo3a majmoo3aat f|مجموعة مجموعات", charity: "9adaga 9adagaat f|صدقة صدقات",
    balance: "ra9eed ra9eed m|رصيد رصيد", reaction: "radd_fi3l rudood_fi3l m|رد_فعل ردود_فعل", blast: "infijaar infijaaraat m|انفجار انفجارات", ceremony: "7afl 7aflaat m|حفل حفلات",
    plastic: "blaastik blaastik m|بلاستك بلاستك", crisis: "azma azamaat f|أزمة أزمات", term: "mu9talaa7 mu9tala7aat m|مصطلح مصطلحات", commissioner: "mufawwa9' mufawwa9'een mh|مفوض مفوضين",
    entrance: "mad5al madaa5il m|مدخل مداخل", exit: "ma5raj ma5aarij m|مخرج مخارج", tunnel: "nafag anfaag m|نفق أنفاق", comfort: "raa7a raa7a f|راحة راحة",
    kitty: "gi66a gi6a6 f|قطة قطط", stress: "9'a3'6 9'a3'6 m|ضغط ضغط", cave: "kahf khoof m|كهف كهوف", launch: "i6laag i6laagaat m|إطلاق إطلاقات",
    golf: "golf golf m|قولف قولف", imagination: "5ayaal 5ayaal m|خيال خيال", fox: "tha3lab tha3aalib m|ثعلب ثعالب", skull: "jumjuma jamaajim f|جمجمة جماجم",
    bat: "5uffaash 5afaafeesh m|خفاش خفافيش", therapy: "3ilaaj 3ilaajaat m|علاج علاجات", lifetime: "3umr a3maar m|عمر أعمار", sauce: "9oo9 9oo9aat m|صوص صوصات",
    grass: "7asheesh 7asheesh m|حشيش حشيش", servant: "5aadim 5uddaam mh|خادم خدام", bible: "il-injeel il-injeel m|الإنجيل الإنجيل", quran: "il-qur2aan il-qur2aan m|القرآن القرآن",
    steel: "7adeed 7adeed m|حديد حديد", iron_n: "7adeed 7adeed m|حديد حديد", generation: "jeel ajyaal m|جيل أجيال", cabin: "kaabeena kaabeenaat f|كابينة كابينات",
    industry: "9inaa3a 9inaa3aat f|صناعة صناعات", bond: "raab6a rawaabi6 f|رابطة روابط", scientist: "3aalim 3ulama mh|عالم علما", deck: "deck deckaat m|دك دكات",
    rabbit: "arnab araanib m|أرنب أرانب", torture: "ta3dheeb ta3dheeb m|تعذيب تعذيب", footstep: "5u6wa 5u6waat f|خطوة خطوات", crystal: "kristaal kristaal m|كريستال كريستال",
    division: "gisim agsaam m|قسم أقسام", contest: "musaabaga musaabagaat f|مسابقة مسابقات", motion: "7araka 7arakaat f|حركة حركات", seal: "5atm a5taam m|ختم أختام",
    standard: "mi3yaar ma3aayeer m|معيار معايير", trigger: "zinaad zinaadaat m|زناد زنادات", response: "radd rudood m|رد ردود", argument: "jidaal jidaalaat m|جدال جدالات",
    vice: "naayib nuwwaab mh|نايب نواب", toy: "la3ba la3ab f|لعبة لعب", jungle: "3'aaba 3'aabaat f|غابة غابات", mistress: "3asheega 3asheegaat fh|عشيقة عشيقات",
    chip: "sheeb sheebaat m|شيب شيبات", surveillance: "muraagaba muraagaba f|مراقبة مراقبة", vampire: "ma99aa9_dimaa ma99aa9een_dimaa mh|مصاص_دما مصاصين_دما", routine: "rooteen rooteenaat m|روتين روتينات",
    temperature: "7araara 7araara f|حرارة حرارة", tribe: "gabeela gabaayil f|قبيلة قبايل", deputy: "naayib nuwwaab mh|نايب نواب", headquarters: "il-maqarr il-maqarr m|المقر المقر",
    nerve: "3a9ab a39aab m|عصب أعصاب", stake: "rihaan rihaanaat m|رهان رهانات", port: "meena mawaani m|مينا مواني", doorbell: "jaras ajraas m|جرس أجراس",
    traitor: "5aayin 5uwwaan mh|خاين خوان", outfit: "6agm a6gum m|طقم أطقم", bail: "kafaala kafaalaat f|كفالة كفالات", costume: "ziyy azyaa m|زي أزياء",
    cage: "gafa9 agfaa9 m|قفص أقفاص", pattern: "nama6 anmaa6 m|نمط أنماط", cliff: "jurf jroof m|جرف جروف", nail: "mismaar masaameer m|مسمار مسامير",
    environment: "bee2a bee2aat f|بيئة بيئات", average: "mu3addal mu3addalaat m|معدل معدلات", interruption: "muqaa6a3a muqaa6a3aat f|مقاطعة مقاطعات", document: "mustanad mustanadaat m|مستند مستندات",
    anniversary: "dhikra_sanawiyya dhikrayaat_sanawiyya f|ذكرى_سنوية ذكريات_سنوية", election: "inti5aabaat inti5aabaat f|انتخابات انتخابات", warrior: "mu7aarib mu7aaribeen mh|محارب محاربين", timing: "tawgeet tawgeetaat m|توقيت توقيتات",
    conscience: "9'ameer 9'amaayir m|ضمير ضماير", hail: "barad barad m|برد برد", booth: "kushk akshaak m|كشك أكشاك", motive: "daafi3 dawaafi3 m|دافع دوافع",
    being: "kaa2in kaa2inaat m|كائن كائنات", bishop: "usguf asaagifa mh|أسقف أساقفة", dealer: "taajir tujjaar mh|تاجر تجار", benefit: "faayda fawaayid f|فايدة فوايد",
    territory: "man6iga manaa6ig f|منطقة مناطق", apology: "i3tidhaar i3tidhaaraat m|اعتذار اعتذارات", clay: "6een 6een m|طين طين", goods: "ba9'aayi3 ba9'aayi3 f|بضايع بضايع",
    atmosphere: "jaw jaw m|جو جو", downtown: "wasa6_il-madeena wasa6_il-madeena m|وسط_المدينة وسط_المدينة", pit: "7ufra 7ufar f|حفرة حفر", paradise: "janna janna f|جنة جنة",
    organization: "muna6'6'ama muna6'6'amaat f|منظمة منظمات", organisation: "muna6'6'ama muna6'6'amaat f|منظمة منظمات", earl: "ameer umara mh|أمير أمرا", activity: "nashaa6 anshi6a m|نشاط أنشطة",
    frame: "i6aar i6aaraat m|إطار إطارات", knight: "faaris fursaan mh|فارس فرسان", habit: "3aada 3aadaat f|عادة عادات", shelter: "mal5a malaaji2 m|ملجأ ملاجئ",
    flow: "tadaffug tadaffug m|تدفق تدفق", sample: "3ayyina 3ayyinaat f|عينة عينات", strip: "shree6 ashri6a m|شريط أشرطة", monk: "raahib ruhbaan mh|راهب رهبان",
    judgment: "7ukum a7kaam m|حكم أحكام", judgement: "7ukum a7kaam m|حكم أحكام", laundry: "3'aseel 3'aseel m|غسيل غسيل", existence: "wujood wujood m|وجود وجود",
    actress: "mumaththila mumaththilaat fh|ممثلة ممثلات", chairman: "ra2ees ru2asa mh|رئيس رؤسا", individual: "fard afraad mh|فرد أفراد", tattoo: "washm wushoom m|وشم وشوم",
    fence: "siyaaj siyaajaat m|سياج سياجات", punk: "9ayya3 9ayya3een mh|صيع صيعين", limit: "7add 7udood m|حد حدود", underwear: "malaabis_daa5iliyya malaabis_daa5iliyya f|ملابس_داخلية ملابس_داخلية",
    pope: "il-baaba il-baaba mh|البابا البابا", impact: "ta2theer ta2theeraat m|تأثير تأثيرات", host: "mu9'eef mu9'eefeen mh|مضيف مضيفين", footage: "lagi6aat lagi6aat f|لقطات لقطات",
    circus: "sirk sirkaat m|سيرك سيركات", mud: "6een 6een m|طين طين", pulse: "nab9' nab9' m|نبض نبض", ad: "i3laan i3laanaat m|إعلان إعلانات",
    advertisement: "i3laan i3laanaat m|إعلان إعلانات", advert: "i3laan i3laanaat m|إعلان إعلانات", signature: "tawgee3 tawgee3aat m|توقيع توقيعات", fantasy: "5ayaal 5ayaal m|خيال خيال",
    pitch: "mal3ab malaa3ib m|ملعب ملاعب", hammer: "ma6raga ma6aarig f|مطرقة مطارق", homicide: "jareemat_gatl jaraayim_gatl f|جريمة_قتل جرايم_قتل", helicopter: "helikoptar helikoptaraat m|هليكوبتر هليكوبترات",
    charm: "jaadhibiyya jaadhibiyya f|جاذبية جاذبية", slap: "kaff kfoof m|كف كفوف", kit: "6agm a6gum m|طقم أطقم", photograph: "9oora 9uwar f|صورة صور",
    farewell: "widaa3 widaa3 m|وداع وداع", offense: "ihaana ihaanaat f|إهانة إهانات", offence: "ihaana ihaanaat f|إهانة إهانات", clown: "muharrij muharrijeen mh|مهرج مهرجين",
    humanity: "insaaniyya insaaniyya f|إنسانية إنسانية", profile: "profile profilaat m|بروفايل بروفايلات", oxygen: "oksijeen oksijeen m|أوكسجين أوكسجين", gene: "jeen jeenaat m|جين جينات",
    shed: "maljaa malaaji2 m|ملجأ ملاجئ", ex: "ex exaat mh|إكس إكسات", chaos: "fow9'a fow9'a f|فوضى فوضى", rocket: "9aaroo5 9awaaree5 m|صاروخ صواريخ",
    terrorist: "irhaabi irhaabiyyeen mh|إرهابي إرهابيين", invitation: "da3wa da3waat f|دعوة دعوات", procedure: "ijraa2 ijraa2aat m|إجراء إجراءات", tragedy: "ma2saa ma2aasi f|مأساة مآسي",
    session: "jalsa jalsaat f|جلسة جلسات", reverend: "gassees gusus mh|قسيس قسس", escort: "muraafig muraafigeen mh|مرافق مرافقين", engagement: "5u6ooba 5u6oobaat f|خطوبة خطوبات",
    corpse: "juththa juthath f|جثة جثث", academy: "akaadeemiyya akaadeemiyyaat f|أكاديمية أكاديميات", furniture: "athaath athaath m|أثاث أثاث", consequence: "nateeja nataayij f|نتيجة نتايج",
    shark: "girsh gruush m|قرش قروش", transport: "muwaa9alaat muwaa9alaat f|مواصلات مواصلات", destruction: "damaar damaar m|دمار دمار", shell: "9adafa 9adaf f|صدفة صدف",
    chamber: "3'urfa 3'uraf f|غرفة غرف", romance: "roomaansiyya roomaansiyya f|رومانسية رومانسية", instance: "mithaal amthila m|مثال أمثلة", pin: "dabboos dabaabees m|دبوس دبابيس",
    drill: "mathgab mathaagib m|مثقب مثاقب", necklace: "silsaal salaaseel m|سلسال سلاسيل", loyalty: "walaa walaa m|ولا ولا", junk: "5arda 5arda f|خردة خردة",
    emotion: "shu3oor mashaa3ir m|شعور مشاعر", liver: "kibd akbaad m|كبد أكباد", jazz: "jaaz jaaz m|جاز جاز", dancer: "raaggi9 raaggi9een mh|راقص راقصين",
    strategy: "istraateejiyya istraateejiyyaat f|استراتيجية استراتيجيات", rubbish: "zibaala zibaala f|زبالة زبالة", powder: "boodra boodra f|بودرة بودرة", bum: "9ayya3 9ayya3een mh|صيع صيعين",
    fort: "7i9n 7u9oon m|حصن حصون", fortress: "gal3a gilaa3 f|قلعة قلاع", supper: "3asha 3asha m|عشا عشا", alibi: "7ujja 7ujaj f|حجة حجج",
    pole: "3amood a3mida m|عمود أعمدة", coke: "kook kook m|كوك كوك", cola: "kook kook m|كوك كوك", fighter: "mugaatil mugaatileen mh|مقاتل مقاتلين",
    blade: "sheefra sheefraat f|شيفرة شيفرات", alpha: "alpha alpha m|ألفا ألفا", diet: "rijeem rijeemaat m|ريجيم ريجيمات", liquor: "5amr 5umoor m|خمر خمور",
    jet: "6ayyaara_naffaatha 6ayyaaraat_naffaatha f|طيارة_نفاثة طيارات_نفاثة", liberty: "7urriyya 7urriyya f|حرية حرية", moral: "a5laag a5laag f|أخلاق أخلاق", award: "jaa2iza jawaa2iz f|جائزة جوائز",
    grief: "7uzn 7uzn m|حزن حزن", trauma: "9adma 9adamaat f|صدمة صدمات", aid: "musaa3ada musaa3adaat f|مساعدة مساعدات", core: "a9l a9l m|أصل أصل",
    serial: "musalsal musalsalaat m|مسلسل مسلسلات", jam: "murabba murabbayaat m|مربى مربيات", opera: "obra obraat f|أوبرا أوبرات", objection: "i3tiraa9' i3tiraa9'aat m|اعتراض اعتراضات",
    whiskey: "wiski wiski m|ويسكي ويسكي", resistance: "mugaawama mugaawama f|مقاومة مقاومة", twin: "taw2am tawaa2im mh|توأم توائم", development: "ta6weer ta6weer m|تطوير تطوير",
    string: "5ai6 5yoo6 m|خيط خيوط", corn: "dhura dhura f|ذرة ذرة", tent: "5aima 5iyaam f|خيمة خيام", abuse: "isaa2a isaa2aat f|إساءة إساءات",
    survival: "najaa najaa f|نجاة نجاة", glove: "gaffaaz gaffaazaat m|قفاز قفازات", admiral: "ameeraal ameeraalaat mh|أميرال أميرالات", wealth: "tharwa tharwaat f|ثروة ثروات",
    possession: "mulk amlaak m|ملك أملاك", warehouse: "mustawda3 mustawda3aat m|مستودع مستودعات", hostage: "raheena rahaayin mh|رهينة رهاين", shore: "shaa6i shawaa6i m|شاطي شواطي",
    visitor: "zaayir zuwwaar mh|زاير زوار", lemon: "laimoona laimoon f|ليمونة ليمون", honeymoon: "shahar_il-3asal shahar_il-3asal m|شهر_العسل شهر_العسل", crane: "raaf3a raaf3aat f|رافعة رافعات",
    testimony: "shahaada shahaadaat f|شهادة شهادات", commission: "3umoola 3umoolaat f|عمولة عمولات", fraud: "na9b na9b m|نصب نصب", branch: "far3 furoo3 m|فرع فروع",
    bean: "7abba 7uboob f|حبة حبوب", muscle: "3a9'ala 3a9'alaat f|عضلة عضلات", management: "idaara idaara f|إدارة إدارة", assignment: "waajib waajibaat m|واجب واجبات",
    comedy: "koomeedya koomeedya f|كوميديا كوميديا", facility: "marfag maraafig m|مرفق مرافق", symbol: "ramz rumooz m|رمز رموز", motor: "makeena makaayin f|مكينة مكاين",
    ambassador: "safeer sufara mh|سفير سفرا", soda: "3a9eer_3'aazi 3a9aayir_3'aaziyya m|عصير_غازي عصاير_غازية", cookie: "biskoota biskoot f|بسكوتة بسكوت", steak: "steak steakaat m|ستيك ستيكات",
    tube: "anbooba anaabeeb f|أنبوبة أنابيب", pan: "migla magaali f|مقلى مقالي", expression: "ta3beer ta3beeraat m|تعبير تعبيرات", throne: "3arsh 3uroosh m|عرش عروش",
    resource: "mawrid mawaarid m|مورد موارد", native: "mu3aa6in muwaa6ineen mh|مواطن مواطنين", poetry: "shi3r shi3r m|شعر شعر", fingerprint: "ba9ma ba9maat f|بصمة بصمات",
    goddess: "ilaaha ilaahaat fh|إلهة إلهات", appearance: "shakil ashkaal m|شكل أشكال", slide: "shree7a sharaayi7 f|شريحة شرايح", pork: "la7am_5anzeer la7am_5anzeer m|لحم_خنزير لحم_خنزير",
    communication: "tawaa9ul tawaa9ul m|تواصل تواصل", payment: "daf3a daf3aat f|دفعة دفعات", structure: "haikal hayaakil m|هيكل هياكل", paperwork: "awraag awraag f|أوراق أوراق",
    madness: "janoon janoon m|جنون جنون", entry: "du5ool du5ool m|دخول دخول", wake: "9a7wa 9a7waat f|صحوة صحوات", beloved: "7abeeb 7abaayib mh|حبيب حبايب",
    gross_n: "ijmaali ijmaali m|إجمالي إجمالي", nap_n: "3'afwa 3'afwaat f|غفوة غفوات", shortcut: "i5ti9aar i5ti9aaraat m|اختصار اختصارات", setting_: "i3daad i3daadaat m|إعداد إعدادات",
  };
  const X3_ADJS = {
    actual: "7ageegi 7ageegiyya 7ageegiyyeen|حقيقي حقيقية حقيقيين", secure: "aamin aamna aamneen|آمن آمنة آمنين", federal: "fidiraali fidiraaliyya fidiraaliyyeen|فيدرالي فيدرالية فيدراليين",
    extraordinary: "5aarig 5aarga 5aargeen|خارق خارقة خارقين", opposite: "3aks 3aks 3aks|عكس عكس عكس", alert: "muntabih muntabiha muntabiheen|منتبه منتبهة منتبهين",
    solid: "9alb 9alba 9albeen|صلب صلبة صلبين", violent: "3aneef 3aneefa 3aneefeen|عنيف عنيفة عنيفين", terrific: "raa2i3 raa2i3a raa2i3een|رائع رائعة رائعين",
    urgent: "9'aroori 9'arooriyya 9'arooriyyeen|ضروري ضرورية ضروريين", unique: "fareed fareeda fareedeen|فريد فريدة فريدين", cruel: "gaasi gaasya gaasyeen|قاسي قاسية قاسيين",
    massive: "9'a5m 9'a5ma 9'u5aam|ضخم ضخمة ضخام", pathetic: "muthheer lish-shafaga muthheera lish-shafaga muthheereen lish-shafaga|مثير للشفقة مثيرة للشفقة مثيرين للشفقة",
    bound: "mitwajjih mitwajjiha mitwajjiheen|متوجه متوجهة متوجهين", roman: "roomaani roomaaniyya roomaaniyyeen|روماني رومانية رومانيين", greater: "akbar|أكبر",
    damned: "mal3oon mal3oona mal3ooneen|ملعون ملعونة ملعونين", sensitive: "7assaas 7assaasa 7assaaseen|حساس حساسة حساسين", unknown: "majhool majhoola majhooleen|مجهول مجهولة مجهولين",
    suspicious: "mashbooh mashbooha mashbooheen|مشبوه مشبوهة مشبوهين", steady: "thaabit thaabta thaabteen|ثابت ثابتة ثابتين", civil: "madani madaniyya madaniyyeen|مدني مدنية مدنيين",
    miserable: "ta3ees ta3eesa ta3eeseen|تعيس تعيسة تعيسين", mighty: "jabbaar jabbaara jabaabira|جبار جبارة جبابرة", kidnapped: "ma56oof ma56oofa ma56oofeen|مخطوف مخطوفة مخطوفين",
    nuclear: "nawawi nawawiyya nawawiyyeen|نووي نووية نوويين", specific: "mu7addad mu7addada mu7addadeen|محدد محددة محددين", plastic_: "blaastik|بلاستك",
    aboard: "3ala matn|على متن", noble: "nabeel nabeela nubala|نبيل نبيلة نبلا", classic: "klaasiki klaasikiyya klaasikiyyeen|كلاسيكي كلاسيكية كلاسيكيين",
    gross: "mgazzir mgazzira mgazzireen|مقزز مقززة مقززين", sacred: "mugaddas mugaddasa mugaddaseen|مقدس مقدسة مقدسين", plain: "basee6 basee6a busa6a|بسيط بسيطة بسطا",
    valuable: "thameen thameena thameeneen|ثمين ثمينة ثمينين", distant: "ba3eed ba3eeda ba3eedeen|بعيد بعيدة بعيدين", surrounded: "m7aa9ar m7aa9ara m7aa9areen|محاصر محاصرة محاصرين",
    everyday: "yoomi yoomiyya yoomiyyeen|يومي يومية يوميين", underground: "ta7t il-ar9'|تحت الأرض", equal: "mutasaawi mutasaawya mutasaawyeen|متساوي متساوية متساويين",
    related: "mitwaa9il mitwaa9la mitwaa9leen|متواصل متواصلة متواصلين", foolish: "3'abi 3'abiyya a3'biya|غبي غبية أغبية", awkward: "mu7rij mu7rija mu7rijeen|محرج محرجة محرجين",
    filthy: "wasi5 was5a was5een|وسخ وسخة وسخين", electric: "kahrabaa2i kahrabaa2iyya kahrabaa2iyyeen|كهربائي كهربائية كهربائيين", pleasant: "la6eef la6eefa lu6afa|لطيف لطيفة لطفا",
    western: "3'arbi 3'arbiyya 3'arbiyyeen|غربي غربية غربيين", eastern: "sharbi sharbiyya sharbiyyeen|شرقي شرقية شرقيين", southern: "janoobi janoobiyya janoobiyyeen|جنوبي جنوبية جنوبيين",
    northern: "shamaali shamaaliyya shamaaliyyeen|شمالي شمالية شماليين", starving: "mayyit yoo3 mayyta yoo3 mayyteen yoo3|ميت يوع ميتة يوع ميتين يوع", complex: "mu3aggad mu3aggada mu3aggadeen|معقد معقدة معقدين",
    determined: "mu9irr mu9irra mu9irreen|مصر مصرة مصرين", unhappy: "mob mabsoo6 mob mabsoo6a mob mabsoo6een|مب مبسوط مب مبسوطة مب مبسوطين", reasonable: "ma3gool ma3goola ma3gooleen|معقول معقولة معقولين",
    unlike: "3aks|عكس", busted: "ingim9't ingim9'at ingim9'aw|انقمضت انقمضت انقمضوا", loyal: "wafi wafiyya awfiya|وفي وفية أوفيا",
    rotten: "5aayis 5aaysa 5aayseen|خايس خايسة خايسين", lousy: "5aayis 5aaysa 5aayseen|خايس خايسة خايسين", mistaken: "3'al6aan 3'al6aana 3'al6aaneen|غلطان غلطانة غلطانين",
    uncomfortable: "mob murta7 mob murta7a mob murta7een|مب مرتاح مب مرتاحة مب مرتاحين", extreme: "shadeed shadeeda shadeedeen|شديد شديدة شديدين", minor: "basee6 basee6a busa6a|بسيط بسيطة بسطا",
    scientific: "3ilmi 3ilmiyya 3ilmiyyeen|علمي علمية علميين", stubborn: "3aneed 3aneeda 3aneedeen|عنيد عنيدة عنيدين", intense: "shadeed shadeeda shadeedeen|شديد شديدة شديدين",
    absolute: "mu6lag mu6laga mu6lageen|مطلق مطلقة مطلقين", stable: "mustagirr mustagirra mustagirreen|مستقر مستقرة مستقرين", unable: "mob gaadir mob gaadra mob gaadreen|مب قادر مب قادرة مب قادرين",
    commercial: "tijaari tijaariyya tijaariyyeen|تجاري تجارية تجاريين", worthy: "yistaahil tistaahil yistaahloon|يستاهل تستاهل يستاهلون", fascinating: "mudhhil mudhhila mudhhileen|مذهل مذهلة مذهلين",
    experienced: "5abeer 5abeera 5ubara|خبير خبيرة خبرا", typical: "3aadi 3aadiyya 3aadiyyeen|عادي عادية عاديين", deeper: "a3mag|أعمق",
    random: "random|راندوم", invisible: "mob baayin mob baayna mob baayneen|مب باين مب باينة مب باينين", internal: "daa5ili daa5iliyya daa5iliyyeen|داخلي داخلية داخليين",
    external: "5aariji 5aarijiyya 5aarijiyyeen|خارجي خارجية خارجيين", peaceful: "haadi haadya haadyeen|هادي هادية هاديين", talented: "mawhoob mawhooba mawhoobeen|موهوب موهوبة موهوبين",
    brief: "mu5ta9ar mu5ta9ara mu5ta9areen|مختصر مختصرة مختصرين", eternal: "abadi abadiyya abadiyyeen|أبدي أبدية أبديين", fabulous: "raa2i3 raa2i3a raa2i3een|رائع رائعة رائعين",
    naughty: "shagi shagiyya ashgiya|شقي شقية أشقيا", stabbed: "ma63oon ma63oona ma63ooneen|مطعون مطعونة مطعونين", global: "3aalami 3aalamiyya 3aalamiyyeen|عالمي عالمية عالميين",
    upper: "3ilwi 3ilwiyya 3ilwiyyeen|علوي علوية علويين", lower: "sufli sufliyya sufliyyeen|سفلي سفلية سفليين", critical: "7arij 7arija 7arijeen|حرج حرجة حرجين",
    enormous: "9'a5m 9'a5ma 9'u5aam|ضخم ضخمة ضخام", tense: "mutawattir mutawattira mutawattireen|متوتر متوترة متوترين", blonde: "ashgar shagra shugur|أشقر شقرا شقر",
    appropriate: "munaasib munaasiba munaasibeen|مناسب مناسبة مناسبين", remarkable: "mumayyaz mumayyaza mumayyazeen|مميز مميزة مميزين", superior: "a7san|أحسن",
    deadly: "gaatil gaatla gaatleen|قاتل قاتلة قاتلين", wicked: "shirreer shirreera shirreereen|شرير شريرة شريرين", multiple: "wayed|وايد",
    anxious: "galgaan galgaana galgaaneen|قلقان قلقانة قلقانين", musical: "mooseegi mooseegiyya mooseegiyyeen|موسيقي موسيقية موسيقيين", ultimate: "^a5eer|أخير",
    obsessed: "mahwoos mahwoosa mahwooseen|مهووس مهووسة مهووسين", magical: "si7ri si7riyya si7riyyeen|سحري سحرية سحريين", bloody: "mdammi mdammya mdammyeen|مدمي مدمية مدميين",
    guilty_: "mudhnib mudhniba mudhnibeen|مذنب مذنبة مذنبين", heavily: "bguwwa|بقوة", naturally: "6abee3i|طبيعي",
  };
  const X3_VERBS = {
    commit: ["irtakabt irtakab rtikib irtikib|ارتكبت ارتكب ارتكب ارتكب", { lv: 'i' }],
    slip: ["zilagt zilag zlig izlig|زلقت زلق زلق ازلق", { lv: 'i' }],
    intend: ["nawait nawa nwi inwi|نويت نوى نوي انو", { lv: 'i' }],
    perform: ["addait adda addi addi|أديت أدى أدي أد", {}],
    assure: ["akkadt akkad 2akkid akkid|أكدت أكد أكد أكد", { obj: 'li', objNP: 'li' }],
    behave: ["t2addabt t2addab t2addab t2addab|تأدبت تأدب تأدب تأدب", { lv: 'i' }],
    struggle: ["3aanait 3aana 3aani 3aani|عانيت عانى عاني عان", {}],
    insist: ["a9arrait a9arr 9irr a9irr|أصريت أصر صر أصر", { lv: 'i', on: '3ala' }],
    launch: ["a6lagt a6lag 6lig a6lig|أطلقت أطلق طلق أطلق", { lv: 'i' }],
    identify: ["7addadt 7addad 7addid 7addid|حددت حدد حدد حدد", { past: 'identified', pp: 'identified' }],
    proceed: ["kammalt kammal kammil kammil|كملت كمل كمل كمل", {}],
    resist: ["gaawamt gaawam gaawim gaawim|قاومت قاوم قاوم قاوم", {}],
    represent: ["maththalt maththal maththil maththil|مثلت مثل مثل مثل", {}],
    snap: ["kassart kassar kassir kassir|كسرت كسر كسر كسر", {}],
    respond: ["raddait radd ridd ridd|رديت رد رد رد", { to: '3ala' }],
    hop: ["ni6t na66 nu66 nu66|نطيت نط نط نط", {}],
    tend: ["3aadatan|عادةً", { special: 'adv' }],
    grant: ["man7t mana7 mna7 imna7|منحت منح منح امنح", { lv: 'a' }],
    disturb: ["az3ajt az3aj z3ij iz3ij|أزعجت أزعج زعج ازعج", { lv: 'i' }],
    interrupt: ["gaa6a3t gaa6a3 gaa6i3 gaa6i3|قاطعت قاطع قاطع قاطع", {}],
    fetch: ["yibt yaab yeeb yeeb|يبت ياب ييب ييب", {}],
    place_v: ["7a66ait 7a66 7u66 7u66|حطيت حط حط حط", {}],
    wrap: ["laffait laff liff liff|لفيت لف لف لف", {}],
    bust: ["gima9't gima9' gmi9' igmi9'|قمضت قمض قمض اقمض", { lv: 'i' }],
    photograph: ["9awwart 9awwar 9awwir 9awwir|صورت صور صور صور", {}],
    slap: ["kaffait kaff kiff kiff|كفيت كف كف كف", {}],
    tap: ["6aggait 6agg 6igg 6igg|طقيت طق طق طق", {}],
    pitch: ["ramait rama rmi irmi|رميت رمى رمي ارم", { lv: 'i' }],
    glance: ["6aala3t 6aala3 6aali3 6aali3|طالعت طالع طالع طالع", { at: 'fi' }],
    peek: ["6aala3t 6aala3 6aali3 6aali3|طالعت طالع طالع طالع", { at: 'fi' }],
    sigh: ["tnahhadt tnahhad tnahhad tnahhad|تنهدت تنهد تنهد تنهد", { lv: 'i' }],
    groan: ["ta2awwaht ta2awwah ta2awwah ta2awwah|تأوهت تأوه تأوه تأوه", { lv: 'i' }],
    chuckle: ["9'i7akt 9'i7ak 9'7ak i9'7ak|ضحكت ضحك ضحك اضحك", { lv: 'i' }],
    giggle: ["9'i7akt 9'i7ak 9'7ak i9'7ak|ضحكت ضحك ضحك اضحك", { lv: 'i' }],
    sob: ["bachait bacha bchi ibchi|بچيت بچى بچي ابچ", { lv: 'i' }],
    weep: ["bachait bacha bchi ibchi|بچيت بچى بچي ابچ", { past: 'wept', pp: 'wept', lv: 'i' }],
    growl: ["zamjart zamjar zamjir zamjir|زمجرت زمجر زمجر زمجر", {}],
    gasp: ["shahagt shahag shhag ishhag|شهقت شهق شهق اشهق", { lv: 'a' }],
    exhale: ["zafart zafar zfir izfir|زفرت زفر زفر ازفر", { lv: 'i' }],
    inhale: ["tnaffast tnaffas tnaffas tnaffas|تنفست تنفس تنفس تنفس", { lv: 'i' }],
    moan: ["ta2awwaht ta2awwah ta2awwah ta2awwah|تأوهت تأوه تأوه تأوه", { lv: 'i' }],
    whistle: ["9affart 9affar 9affir 9affir|صفرت صفر صفر صفر", {}],
    hum: ["dandant dandan dandin dandin|دندنت دندن دندن دندن", {}],
    buzz: ["6ann 6ann 6inn 6inn|طن طن طن طن", {}],
    beep: ["6ann 6ann 6inn 6inn|طن طن طن طن", {}],
    bark: ["naba7 naba7 nba7 inba7|نبح نبح نبح انبح", { lv: 'a' }],
    howl: ["3awwa 3awwa 3awwi 3awwi|عوى عوى عوي عوي", {}],
    purr: ["5ar5ar 5ar5ar 5ar5ir 5ar5ir|خرخر خرخر خرخر خرخر", {}],
    tease_: ["3allagt 3allag 3allig 3allig|علقت علق علق علق", { obj: '3ala', objNP: '3ala' }],
    stab: ["6a3ant 6a3an 63an i63an|طعنت طعن طعن اطعن", { lv: 'a' }],
    kidnap: ["5a6aft 5a6af 56if i56if|خطفت خطف خطف اخطف", { lv: 'i' }],
    hijack: ["5a6aft 5a6af 56if i56if|خطفت خطف خطف اخطف", { lv: 'i' }],
    rape: ["i3tadait i3tada 3tidi i3tidi|اعتديت اعتدى اعتدي اعتد", { lv: 'i', obj: '3ala', objNP: '3ala' }],
    murder_v: ["gitalt gital gtil igtil|قتلت قتل قتل اقتل", { lv: 'i' }],
    poison: ["sammamt sammam sammim sammim|سممت سمم سمم سمم", {}],
    strangle: ["5anagt 5anag 5nig i5nig|خنقت خنق خنق اخنق", { lv: 'i' }],
    choke: ["5anagt 5anag 5nig i5nig|خنقت خنق خنق اخنق", { lv: 'i' }],
    drown_: ["3'irigt 3'irig 3'rag i3'rag|غرقت غرق غرق اغرق", { lv: 'a' }],
    rescue_: ["angadht angadh ngidh angidh|أنقذت أنقذ نقذ أنقذ", { lv: 'i' }],
    launch_g: ["a6lagt a6lag 6lig a6lig|أطلقت أطلق طلق أطلق", { lv: 'i' }],
    haunt: ["6aaradt 6aarad 6aarid 6aarid|طاردت طارد طارد طارد", {}],
    curse_: ["la3ant la3an l3an il3an|لعنت لعن لعن العن", { lv: 'a' }],
    bless_: ["baarakt baarak baarik baarik|باركت بارك بارك بارك", {}],
    vanish: ["i5tafait i5tafa 5tafi i5tafi|اختفيت اختفى يختفي اختف", { lv: 'i' }],
    emerge: ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { lv: 'i' }],
    arise: ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { past: 'arose', pp: 'arisen', lv: 'i' }],
    occur: ["9aar 9aar 9eer 9eer|صار صار صير صير", { past: 'occurred', pp: 'occurred' }],
    exist_: ["=do", { tail: 'mawjood|موجود' }],
    seem: ["=do", { tail: 'shakla|شكله' }],
    remain_: ["6'allait 6'all 6'all 6'all|ظليت ظل ظل ظل", {}],
    operate: ["sha3'3'alt sha3'3'al sha3'3'il sha3'3'il|شغلت شغل شغل شغل", {}],
    function: ["ishta3'alt ishta3'al shti3'il ishti3'il|اشتغلت اشتغل اشتغل اشتغل", { lv: 'i' }],
    perform_: ["addait adda addi addi|أديت أدى أدي أد", {}],
    trigger_v: ["sabbabt sabbab sabbib sabbib|سببت سبب سبب سبب", {}],
    activate: ["fa33alt fa33al fa33il fa33il|فعلت فعل فعل فعل", {}],
    deactivate: ["3a66alt 3a66al 3a66il 3a66il|عطلت عطل عطل عطل", {}],
    enable: ["fa33alt fa33al fa33il fa33il|فعلت فعل فعل فعل", {}],
    disable: ["3a66alt 3a66al 3a66il 3a66il|عطلت عطل عطل عطل", {}],
    detect: ["iktashaft iktashaf ktishif iktishif|اكتشفت اكتشف اكتشف اكتشف", { lv: 'i' }],
    scan: ["=do", { tail: 'scan|سكان', obj: 'li', objNP: 'li' }],
    filter: ["=do", { tail: 'filter|فلتر', obj: 'li', objNP: 'li' }],
    sort_v: ["ra66abt ra66ab ra66ib ra66ib|رتبت رتب رتب رتب", {}],
    rename: ["3'ayyart_isim 3'ayyar_isim 3'ayyir_isim 3'ayyir_isim|غيرت_اسم غير_اسم غير_اسم غير_اسم", {}],
    format: ["=do", { tail: 'format|فورمات', obj: 'li', objNP: 'li' }],
    reboot: ["=do", { tail: 'restart|ريستارت', obj: 'li', objNP: 'li' }],
    shutdown: ["6ifait 6ifa 6fi i6fi|طفيت طفى طفي اطف", { lv: 'i' }],
    overheat: ["si5ant si5an s5an is5an|سخنت سخن سخن اسخن", { lv: 'a' }],
    hover: ["7awwamt 7awwam 7awwim 7awwim|حومت حوم حوم حوم", {}],
    drift: ["insa7abt insa7ab nsi7ib insi7ib|انسحبت انسحب انسحب انسحب", { lv: 'i' }],
    bounce: ["na66ait na66 nu66 nu66|نطيت نط نط نط", {}],
    roll: ["dahrajt dahraj dahrij dahrij|دحرجت دحرج دحرج دحرج", {}],
    slide: ["zilagt zilag zlig izlig|زلقت زلق زلق ازلق", { past: 'slid', pp: 'slid', lv: 'i' }],
    crawl: ["zi7aft zi7af z7af iz7af|زحفت زحف زحف ازحف", { lv: 'a' }],
    chase_: ["laa7agt laa7ag laa7ig laa7ig|لاحقت لاحق لاحق لاحق", {}],
    flee: ["hirabt hirab hrab ihrab|هربت هرب هرب اهرب", { past: 'fled', pp: 'fled', lv: 'i' }],
    wave: ["lawwa7t lawwa7 lawwi7 lawwi7|لوحت لوح لوح لوح", { to: 'li' }],
    nod: ["hazzait_raasi hazz_raasa hizz_raasak hizz_raasak|هزيت_راسي هز_راسه هز_راسك هز_راسك", {}],
    point_v: ["ashshart ashshar ashshir ashshir|أشرت أشر أشر أشر", { to: '3ala', at: '3ala' }],
    stare_: ["7addagt 7addag 7addig 7addig|حدقت حدق حدق حدق", { at: 'fi' }],
    blink: ["ramasht ramash rmish irmish|رمشت رمش رمش ارمش", { lv: 'i' }],
    wink: ["3'amazt 3'amaz 3'miz i3'miz|غمزت غمز غمز اغمز", { lv: 'i', at: 'li' }],
    frown: ["3abbast 3abbas 3abbis 3abbis|عبست عبس عبس عبس", {}],
    grin: ["ibtasamt ibtasam btisim ibtisim|ابتسمت ابتسم ابتسم ابتسم", { lv: 'i' }],
    lick: ["li7ast li7as l7as il7as|لحست لحس لحس الحس", { lv: 'a' }],
    chew: ["ma9'a3't ma9'a3' m9'a3' im9'a3'|مضغت مضغ مضغ امضغ", { lv: 'a' }],
    swallow: ["bila3t bila3 bla3 ibla3|بلعت بلع بلع ابلع", { lv: 'a' }],
    spit: ["tafalt tafal tfil itfil|تفلت تفل تفل اتفل", { past: 'spat', pp: 'spat', lv: 'i' }],
    vomit: ["tgayya2t tgayya2 tgayya2 tgayya2|تقيأت تقيأ تقيأ تقيأ", { lv: 'i' }],
    puke: ["tgayya2t tgayya2 tgayya2 tgayya2|تقيأت تقيأ تقيأ تقيأ", { lv: 'i' }],
    pee: ["=do", { tail: 'pee|بي' }],
    poop: ["=do", { tail: 'poop|بوب' }],
    fart: ["=do", { tail: 'fart|فارت' }],
    starve: ["yu3t yaa3 yoo3 yoo3|يعت ياع يوع يوع", {}],
    digest: ["ha9'amt ha9'am h9'im ih9'im|هضمت هضم هضم اهضم", { lv: 'i' }],
    collapse_: ["inhaart inhaar nhaar inhaar|انهرت انهار انهار انهار", { lv: 'i' }],
    rot: ["5aas 5aas 5ees 5ees|خاس خاس خيس خيس", {}],
    expire_: ["intahat intaha ntihi intihi|انتهت انتهى انتهي انته", { lv: 'i' }],
    spoil: ["5arrabt 5arrab 5arrib 5arrib|خربت خرب خرب خرب", {}],
    pamper: ["dalla3t dalla3 dalli3 dalli3|دلعت دلع دلع دلع", {}],
    spoil_k: ["dalla3t dalla3 dalli3 dalli3|دلعت دلع دلع دلع", {}],
    nag: ["nagg nagg nigg nigg|نق نق نق نق", { on: '3ala' }],
    scold: ["wabba5t wabba5 wabbi5 wabbi5|وبخت وبخ وبخ وبخ", {}],
    yell_at: ["9ara5t 9ara5 9ri5 i9ri5|صرخت صرخ صرخ اصرخ", { lv: 'i', at: '3ala' }],
    grab_: ["misakt misak msik imsik|مسكت مسك مسك امسك", { lv: 'i' }],
    snatch: ["5a6aft 5a6af 56if i56if|خطفت خطف خطف اخطف", { lv: 'i' }],
    seize: ["9aadart 9aadar 9aadir 9aadir|صادرت صادر صادر صادر", {}],
    confiscate: ["9aadart 9aadar 9aadir 9aadir|صادرت صادر صادر صادر", {}],
    smuggle: ["harrabt harrab harrib harrib|هربت هرب هرب هرب", {}],
    bribe: ["rashait rasha rshi irshi|رشيت رشى رشي ارش", { lv: 'i' }],
    blackmail: ["ibtazzait ibtazz btizz ibtizz|ابتزيت ابتز ابتز ابتز", { lv: 'i' }],
    scam: ["na9abt_3ala na9ab_3ala n9ub_3ala in9ub_3ala|نصبت_على نصب_على نصب_على انصب_على", { lv: 'u' }],
    gaslight: ["=do", { tail: 'gaslight|قاسلايت', obj: 'li', objNP: 'li' }],
    manipulate: ["t7akkamt t7akkam t7akkam t7akkam|تحكمت تحكم تحكم تحكم", { lv: 'i', obj: 'fi', objNP: 'fi' }],
    brag: ["tfaa5art tfaa5ar tfaa5ar tfaa5ar|تفاخرت تفاخر تفاخر تفاخر", { lv: 'i', about: 'b' }],
    boast: ["tfaa5art tfaa5ar tfaa5ar tfaa5ar|تفاخرت تفاخر تفاخر تفاخر", { lv: 'i', about: 'b' }],
    show_off: ["tfashshart tfashshar tfashshar tfashshar|تفششرت تفشخر تفشخر تفشخر", { lv: 'i' }],
    flex: ["=do", { tail: 'flex|فلكس' }],
    gossip: ["tkallamt_3ala tkallam_3ala tkallam_3ala tkallam_3ala|تكلمت_على تكلم_على تكلم_على تكلم_على", { lv: 'i' }],
    chat_: ["sawlaft sawlaf sawlif sawlif|سولفت سولف سولف سولف", { with: 'wiyya' }],
    chitchat: ["sawlaft sawlaf sawlif sawlif|سولفت سولف سولف سولف", { with: 'wiyya' }],
    joke_: ["tmaza7t tmaza7 tmaza7 tmaza7|تمزحت تمزح تمزح تمزح", { lv: 'i' }],
    kid_: ["tmaza7t tmaza7 tmaza7 tmaza7|تمزحت تمزح تمزح تمزح", { lv: 'i' }],
    prank: ["=do", { tail: 'prank|برانك', obj: '3ala', objNP: '3ala' }],
    dare_: ["t7addait t7adda t7adda t7adda|تحديت تحدى تحدى تحدى", { lv: 'i' }],
    bluff: ["=do", { tail: 'bluff|بلف' }],
    guess_: ["5ammant 5amman 5ammin 5ammin|خمنت خمن خمن خمن", {}],
    assume_: ["iftara9't iftara9' ftiri9' iftiri9'|افترضت افترض افترض افترض", { lv: 'i' }],
    suppose_: ["iftara9't iftara9' ftiri9' iftiri9'|افترضت افترض افترض افترض", { lv: 'i' }],
    presume: ["iftara9't iftara9' ftiri9' iftiri9'|افترضت افترض افترض افترض", { lv: 'i' }],
    reckon: ["7asabt 7asab 7sib i7sib|حسبت حسب حسب احسب", { lv: 'i' }],
    bet_: ["raahant raahan raahin raahin|راهنت راهن راهن راهن", {}],
  };
  const X3_ADVS = {
    heavily_: "bguwwa|بقوة", particularly: "bil-dhaat|بالذات", practically: "tagreeban|تقريباً", technically: "tiqniyyan|تقنياً", throughout: "6ool|طول",
    beneath: "ta7t|تحت", underneath: "ta7t|تحت", someplace: "fi makaan|في مكان", nicely: "zain|زين", differently: "bshakil thaani|بشكل ثاني",
    happily: "b-sa3aada|بسعادة", naturally_: "6abee3i|طبيعي", heavily: "bguwwa|بقوة", instead_: "badal|بدل", aboard_: "3ala matn|على متن",
    downtown_: "wasa6 il-madeena|وسط المدينة", overseas: "barra|برا", nationwide: "fi kil id-dawla|في كل الدولة", worldwide: "fi kil il-3aalam|في كل العالم", online_: "online|أونلاين",
    whatsoever: "abadan|أبداً", regardless: "3ala kil 7aal|على كل حال", anyways: "ma 3alaina|ما علينا", alright_: "tamaam|تمام", okay_: "tamaam|تمام",
  };
  const X3_FIXED = {
    'in the meantime': "fi nafs il-wagt|في نفس الوقت", 'on behalf of': "niyaabatan 3an|نيابةً عن", 'on my behalf': "niyaabatan 3anni|نيابةً عني", 'on your behalf': "niyaabatan 3annak|نيابةً عنك",
    'ouch': "aakh|آخ", 'ow': "aakh|آخ", 'jeez': "ya salaam|يا سلام", 'gee': "ya salaam|يا سلام", 'heck': "5ara|خرا", 'what the heck': "shu hal habal|شو هالهبل", 'what the hell': "shu hal habal|شو هالهبل",
    'hell no': "la wallah|لا والله", 'hell yeah': "ee wallah|إي والله", 'hell yes': "ee wallah|إي والله", 'the hell': "bil-habal|بالهبل", 'bloody hell': "ya salaam|يا سلام",
    'goodnight': "ti9ba7 3ala 5air|تصبح على خير", 'good evening': "masa il-5air|مسا الخير", 'good morning ': "9abaa7 il-5air|صباح الخير",
    'blah': "blah|بلاه", 'blah blah': "kalaam faa9'i|كلام فاضي", 'blah blah blah': "kalaam faa9'i|كلام فاضي", 'so so': "nu9 nu9|نص نص", 'so-so': "nu9 nu9|نص نص",
    'woo': "yaay|ياي", 'woohoo': "yaay|ياي", 'yay': "yaay|ياي", 'hooray': "yaay|ياي", 'yikes': "ya salaam|يا سلام", 'phew': "il-7amdulillah|الحمدلله", 'meh': "3aadi|عادي",
    'pfft': "uff|أف", 'tsk': "tch|تش", 'psst': "hss|هس", 'shh': "hss|هس", 'shush': "hss|هس", 'ahem': "a7m|أحم", 'oi': "hey|هيه", 'oy': "hey|هيه", 'yo ': "hala|هلا",
    'technically speaking': "tiqniyyan|تقنياً", 'generally speaking': "bshakil 3aamm|بشكل عام", 'strictly speaking': "bi6'-6'ab6|بالضبط", 'so to speak': "ya3ni|يعني",
    'in the long run': "3ala il-madaa il-ba3eed|على المدى البعيد", 'in the short run': "3ala il-madaa il-gareeb|على المدى القريب", 'at the moment ': "il7een|الحين",
    'random': "random|راندوم", 'at random': "random|راندوم", 'randomly ': "random|راندوم", 'the bottom line': "il-5ulaa9a|الخلاصة", 'bottom line': "il-5ulaa9a|الخلاصة",
    'worst case': "aswa 7aala|أسوأ حالة", 'worst case scenario': "aswa 7aala|أسوأ حالة", 'best case': "a7san 7aala|أحسن حالة", 'in the worst case': "fi aswa 7aala|في أسوأ حالة",
    'to be honest ': "bi9raa7a|بصراحة", 'to be fair ': "bi-in9aaf|بإنصاف", 'to be safe': "lil-amaan|للأمان", 'to be sure': "lil-ta2keed|للتأكيد", 'to be clear': "3ashaan akoon waa9'i7|عشان أكون واضح",
    'make sense': "mafhoom|مفهوم", 'it makes sense': "mafhoom|مفهوم", 'that makes sense': "mafhoom|مفهوم", 'does not make sense': "mob mafhoom|مب مفهوم",
    'no sense': "ma la ma3na|ما له معنى", 'common sense': "il-badeehi|البديهي", 'sense of humor': "5iffat damm|خفة دم", 'sense of humour': "5iffat damm|خفة دم",
    'in person': "shakh9iyyan|شخصياً", 'face to face': "wayh l-wayh|ويه لويه", 'one on one': "wa7id l-wa7id|واحد لواحد", 'behind my back': "min warra 6'ahri|من ورا ظهري", 'behind your back': "min warra 6'ahrak|من ورا ظهرك",
    'behind his back': "min warra 6'ahra|من ورا ظهره", 'on purpose': "3an ga9d|عن قصد", 'by heart': "3an 6'ahar galb|عن ظهر قلب", 'by hand': "bil-eed|بالإيد", 'by chance': "bi9-9udfa|بالصدفة",
    'by accident ': "bil-3'ala6|بالغلط", 'by force': "bil-guwwa|بالقوة", 'by law': "bil-gaanoon|بالقانون", 'by myself': "broo7i|بروحي", 'by yourself': A3("broo7ak|بروحك", "broo7ich|بروحج", "broo7kum|بروحكم"),
    'by himself': "broo7a|بروحه", 'by herself': "broo7ha|بروحها", 'by ourselves': "broo7na|بروحنا", 'by themselves': "broo7hum|بروحهم", 'on my own': "broo7i|بروحي", 'on your own': A3("broo7ak|بروحك", "broo7ich|بروحج", "broo7kum|بروحكم"),
    'on his own': "broo7a|بروحه", 'on her own': "broo7ha|بروحها", 'on our own': "broo7na|بروحنا", 'on their own': "broo7hum|بروحهم", 'all by myself': "broo7i|بروحي",
    'leave me alone': A3("5allni broo7i|خلني بروحي", "5alleeni broo7i|خليني بروحي", "5allooni broo7i|خلوني بروحي"), 'leave him alone': "5alla broo7a|خله بروحه", 'leave her alone': "5allha broo7ha|خلها بروحها",
    'leave them alone': "5allhum broo7hum|خلهم بروحهم", 'leave us alone': "5allna broo7na|خلنا بروحنا", 'let me be': "5allni broo7i|خلني بروحي",
  };
  const X3_NOUN_ALIAS = { comrade: 'friend', mate: 'friend', folk: 'people', beings: 'being', emotions: 'emotion', feelings: 'feeling', visitors: 'visitor', twins: 'twin',
    photos: 'picture', pics_: 'picture', documents: 'document', docs: 'document', ads: 'ad', adverts: 'advert', outfits: 'outfit', fingerprints: 'fingerprint', footsteps: 'footstep', glasses_: 'glasses',
    gloves: 'glove', cookies: 'cookie', beans: 'bean', chips: 'chip', dishes: 'dish', toys: 'toy', resources: 'resource', consequences: 'consequence', emotions_: 'emotion', nerves: 'nerve',
    quarters: 'quarter', headquarters_: 'headquarters', muscles: 'muscle', goods_: 'goods', species_: 'species', series_: 'series', means: 'means', customs_: 'customs', scissors: 'scissors', pants_: 'pants',
    tv: 'tv', telly_: 'tv', fridge: 'fridge', refrigerator: 'fridge', freezer: 'freezer', oven: 'oven', microwave: 'microwave', stove: 'stove', cooker: 'stove', kettle: 'kettle', blender: 'blender',
    washer: 'washing_machine', dishwasher: 'dishwasher', vacuum: 'vacuum', hoover: 'vacuum', ac: 'ac', conditioner: 'ac', heater: 'heater', fan: 'fan', bulb: 'bulb', wiring: 'wire' };
  const X3_MORE_NOUNS = {
    fridge: "thallaaja thallaajaat f|ثلاجة ثلاجات", freezer: "freezar freezaraat m|فريزر فريزرات", oven: "furn afraan m|فرن أفران", microwave: "maikroweev maikroweevaat m|مايكرويف مايكرويفات",
    stove: "6abbaa5 6abbaa5aat m|طباخ طباخات", kettle: "3'allaaya 3'allaayaat f|غلاية غلايات", blender: "5allaa6 5allaa6aat m|خلاط خلاطات", washing_machine: "3'assaala 3'assaalaat f|غسالة غسالات",
    dishwasher: "jallaaya jallaayaat f|جلاية جلايات", vacuum: "miknasa makaanis f|مكنسة مكانس", ac: "mukayyif mukayyifaat m|مكيف مكيفات", heater: "daffaaya daffaayaat f|دفاية دفايات",
    fan: "marwa7a maraawi7 f|مروحة مراوح", bulb: "lamba lambaat f|لمبة لمبات", means: "waseela wasaayil f|وسيلة وسايل", scissors: "mga99 mga99aat m|مقص مقصات",
  };
  for (const [k, v] of Object.entries(Object.assign({}, X3_NOUNS, X3_MORE_NOUNS))) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_RAW) && !(kk + '_' in NOUN_RAW)) NOUN_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X3_ADJS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADJ_RAW) && !(kk + '_' in ADJ_RAW)) ADJ_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X3_VERBS)) { const kk = k.replace(/_[a-z]*$/, ''); if (v[1] && v[1].special === 'adv') continue; if (!(kk in VERB_RAW) && !(kk + '_' in VERB_RAW)) VERB_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X3_ADVS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADV_RAW) && !(kk + '_' in ADV_RAW)) ADV_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X3_FIXED)) { const kk = k.trim(); if (!(kk in FIXED_RAW)) FIXED_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X3_NOUN_ALIAS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_ALIAS)) NOUN_ALIAS[kk] = v; }
  const X4_NOUNS = {
    regard: "ta7iyya ta7iyyaat f|تحية تحيات", lesbian: "mithliyya mithliyyaat fh|مثلية مثليات", complaint: "shakwa shakaawi f|شكوى شكاوي", handle_n: "magba9' magaabi9' m|مقبض مقابض", doorknob: "magba9' magaabi9' m|مقبض مقابض",
    burden: "7iml a7maal m|حمل أحمال", manner: "6areega 6urug f|طريقة طرق", mount: "jabal jbaal m|جبل جبال", pound: "jinaih jinaihaat m|جنيه جنيهات",
    motel: "fundug fanaadig m|فندق فنادق", rifle: "bindigiyya banaadig f|بندقية بنادق", reception: "istigbaal istigbaal m|استقبال استقبال", brick: "6ooba 6oob f|طوبة طوب",
    lap: "7ijr 7ijr m|حجر حجر", bucket: "dalu dlaa m|دلو دلا", badge: "shaara shaaraat f|شارة شارات", hip: "wirk awraak m|ورك أوراك",
    foundation: "asaas asaasaat m|أساس أساسات", labor: "3amal 3amal m|عمل عمل", labour: "3amal 3amal m|عمل عمل", log: "sijill sijillaat m|سجل سجلات",
    combat: "gitaal gitaal m|قتال قتال", polish: "talmee3 talmee3 m|تلميع تلميع", weed: "7asheesh 7asheesh m|حشيش حشيش", ton: "6ann a6naan m|طن أطنان",
    satellite: "gamar_9inaa3i agmaar_9inaa3iyya m|قمر_صناعي أقمار_صناعية", jersey: "jersey jerseyaat m|جيرسي جيرسيات", eagle: "9agr 9goor m|صقر صقور", privacy: "5u9oo9iyya 5u9oo9iyya f|خصوصية خصوصية",
    chapter: "fa9l fu9ool m|فصل فصول", wisdom: "7ikma 7ikam f|حكمة حكم", barn: "7a6'eera 7a6'aayir f|حظيرة حظاير", farmer: "muzaari3 muzaari3een mh|مزارع مزارعين",
    pub: "baar baaraat m|بار بارات", plot: "7abka 7abkaat f|حبكة حبكات", proposal: "igtiraa7 igtiraa7aat m|اقتراح اقتراحات", basis: "asaas asaasaat m|أساس أساسات",
    manners: "adab adab m|أدب أدب", twist: "laffa laffaat f|لفة لفات", cent: "sant santaat m|سنت سنتات", meter: "mitir amtaar m|متر أمتار",
    metre: "mitir amtaar m|متر أمتار", humor: "5iffat_damm 5iffat_damm f|خفة_دم خفة_دم", humour: "5iffat_damm 5iffat_damm f|خفة_دم خفة_دم", cowboy: "kaawboy kaawboyaat mh|كاوبوي كاوبويات",
    radar: "raadaar raadaaraat m|رادار رادارات", prosecutor: "mudda3i mudda3een mh|مدعي مدعين", pump: "ma9'a55a ma9'a55aat f|مضخة مضخات", marine: "ba7riyya ba7riyya f|بحرية بحرية",
    bid: "3ar9' 3uroo9' m|عرض عروض", nest: "3ishsh 3shoosh m|عش عشوش", palm: "na5la na5al f|نخلة نخل", medication: "dawa adwiya m|دوا أدوية",
    gravity: "jaadhibiyya jaadhibiyya f|جاذبية جاذبية", booze: "5amr 5umoor m|خمر خمور", vodka: "vodka vodka f|فودكا فودكا", height: "6ool 6ool m|طول طول",
    chemical: "maadda_keemyaa2iyya mawaad_keemyaa2iyya f|مادة_كيميائية مواد_كيميائية", fund: "9andoog 9anaadeeg m|صندوق صناديق", web: "il-web il-web m|الويب الويب", phase: "mar7ala maraa7il f|مرحلة مراحل",
    prom: "7aflat_ta5arruj 7aflaat_ta5arruj f|حفلة_تخرج حفلات_تخرج", editor: "mu7arrir mu7arrireen mh|محرر محررين", whip: "soo6 aswaa6 m|سوط أسواط", region: "man6iga manaa6ig f|منطقة مناطق",
    temper: "6ab3 6ibaa3 m|طبع طباع", sunshine: "shams shams f|شمس شمس", poker: "bookar bookar m|بوكر بوكر", entertainment: "tasliya tasliya f|تسلية تسلية",
    blanket: "ba66aaniyya ba66aaniyyaat f|بطانية بطانيات", nut: "mukassaraat mukassaraat f|مكسرات مكسرات", needle: "ibra ibar f|إبرة إبر", weakness: "9'a3f 9'a3f m|ضعف ضعف",
    method: "6areega 6urug f|طريقة طرق", permit: "ta9ree7 ta9aaree7 m|تصريح تصاريح", ranger: "7aaris 7urraas mh|حارس حراس", zoo: "7adeegat_7aywaanaat 7adaayig_7aywaanaat f|حديقة_حيوانات حدايق_حيوانات",
    passenger: "raakib rukkaab mh|راكب ركاب", technique: "tiqniyya tiqniyyaat f|تقنية تقنيات", bunny: "arnab araanib m|أرنب أرانب", baron: "baaroon baaroonaat mh|بارون بارونات",
    marshal: "maarshaal maarshaalaat mh|مارشال مارشالات", massage: "masaaj masaajaat m|مساج مساجات", menu: "menu menuhaat m|منيو منيوهات", diary: "mudhakkiraat mudhakkiraat f|مذكرات مذكرات",
    wagon: "3araba 3arabaat f|عربة عربات", audition: "i5tibaar_adaa i5tibaaraat_adaa m|اختبار_أداء اختبارات_أداء", casino: "kazeeno kazeenohaat m|كازينو كازينوهات", bacon: "bacon bacon m|بيكون بيكون",
    forgiveness: "musaama7a musaama7a f|مسامحة مسامحة", ancestor: "jadd ajdaad mh|جد أجداد", conduct: "sulook sulook m|سلوك سلوك", sheet: "waraga awraag f|ورقة أوراق",
    avenue: "shaari3 shawaari3 m|شارع شوارع", investment: "istithmaar istithmaaraat m|استثمار استثمارات", ram: "raam raam m|رام رام", ranch: "mazra3a mazaari3 f|مزرعة مزارع",
    ash: "ramaad ramaad m|رماد رماد", leather: "jild jild m|جلد جلد", conspiracy: "mu2aamara mu2aamaraat f|مؤامرة مؤامرات", guardian: "wali awliya mh|ولي أوليا",
    rumor: "ishaa3a ishaa3aat f|إشاعة إشاعات", rumour: "ishaa3a ishaa3aat f|إشاعة إشاعات", yen: "yen yen m|ين ين", terror: "ru3b ru3b m|رعب رعب",
    misunderstanding: "soo2_fahm soo2_fahm m|سوء_فهم سوء_فهم", parade: "isti3raa9' isti3raa9'aat m|استعراض استعراضات", immunity: "manaa3a manaa3a f|مناعة مناعة", pearl: "loolwa loolu f|لولوة لولو",
    priority: "awlawiyya awlawiyyaat f|أولوية أولويات", conflict: "5ilaaf 5ilaafaat m|خلاف خلافات", cherry: "karaza karaz f|كرزة كرز", fee: "rasm rusoom m|رسم رسوم",
    radiation: "ish3aa3 ish3aa3aat m|إشعاع إشعاعات", lung: "ri2a ri2aat f|رئة رئات", ideal: "mithaal amthila m|مثال أمثلة", turtle: "sil7afa sala7if f|سلحفاة سلاحف",
    candidate: "murashsha7 murashsha7een mh|مرشح مرشحين", hunger: "yoo3 yoo3 m|يوع يوع", combination: "5ali6 5ali6 m|خلط خلط", nanny: "murabbiya murabbiyaat fh|مربية مربيات",
    gut: "ba6in b6oon m|بطن بطون", bureau: "maktab makaatib m|مكتب مكاتب", pillow: "m5adda m5addaat f|مخدة مخدات", ace: "aas aasaat m|آس آسات",
    cart: "3araba 3arabaat f|عربة عربات", ham: "la7am_5anzeer la7am_5anzeer m|لحم_خنزير لحم_خنزير", galaxy: "majarra majarraat f|مجرة مجرات", jewelry: "dhahab dhahab m|ذهب ذهب",
    jewellery: "dhahab dhahab m|ذهب ذهب", alliance: "ta7aaluf ta7aalufaat m|تحالف تحالفات", clothing: "malaabis malaabis f|ملابس ملابس", dough: "3ajeen 3ajeen m|عجين عجين",
    wreck: "7u6aam 7u6aam m|حطام حطام", inch: "inch inchaat m|إنش إنشات", arrival: "wu9ool wu9ool m|وصول وصول", basket: "salla silal f|سلة سلل",
    scandal: "fa9'ee7a fa9'aayi7 f|فضيحة فضايح", instant: "la76'a la7a6'aat f|لحظة لحظات", rehearsal: "broova broovaat f|بروفة بروفات", republic: "jumhooriyya jumhooriyyaat f|جمهورية جمهوريات",
    counsel: "mu7aami mu7aameen mh|محامي محامين", bait: "6u3m 6u3oom m|طعم طعوم", dignity: "karaama karaama f|كرامة كرامة", heroin: "heroyeen heroyeen m|هيروين هيروين",
    economy: "iqti9aad iqti9aad m|اقتصاد اقتصاد", tissue: "mandeel manaadeel m|منديل مناديل", excitement: "7amaas 7amaas m|حماس حماس", mankind: "il-bashar il-bashar m|البشر البشر",
    vessel: "safeena sufun f|سفينة سفن", hut: "kookh akwaa5 m|كوخ أكواخ", element: "3un9ur 3anaa9ir m|عنصر عناصر", coma: "3'aiboba 3'aiboba f|غيبوبة غيبوبة",
    coffin: "taaboot tawaabeet m|تابوت توابيت", cocaine: "kokaayeen kokaayeen m|كوكايين كوكايين", puppy: "jarw jiraa m|جرو جرا", announcement: "i3laan i3laanaat m|إعلان إعلانات",
    oath: "gasam agsaam m|قسم أقسام", cotton: "gu6un gu6un m|قطن قطن", deposit: "3arboon 3araabeen m|عربون عرابين", autopsy: "tashree7 tashree7aat m|تشريح تشريحات",
    gig: "7afla 7aflaat f|حفلة حفلات", suite: "janaa7 ajni7a m|جناح أجنحة", beam: "shu3aa3 ashi33a m|شعاع أشعة", poet: "shaa3ir shu3ara mh|شاعر شعرا",
    arrow: "sahm ashum m|سهم أسهم", counselor: "mustashaar mustashaareen mh|مستشار مستشارين", journalist: "9a7afi 9a7afiyyeen mh|صحفي صحفيين", operator: "mushaghghil mushaghghileen mh|مشغل مشغلين",
    inn: "fundug fanaadig m|فندق فنادق", roommate: "shareek_sakan shuraka_sakan mh|شريك_سكن شركا_سكن", scum: "7uthaala 7uthaala f|حثالة حثالة", commitment: "iltizaam iltizaamaat m|التزام التزامات",
    misery: "ta3aasa ta3aasa f|تعاسة تعاسة", theft: "sirga sirgaat f|سرقة سرقات", embrace: "7u9'n a79'aan m|حضن أحضان", flame: "lahab lahab m|لهب لهب",
    silk: "7areer 7areer m|حرير حرير", cemetery: "magbara magaabir f|مقبرة مقابر", rear: "warra warra m|ورا ورا", bin: "9andoog_zibaala 9anaadeeg_zibaala m|صندوق_زبالة صناديق_زبالة",
    gum: "3ilcha 3ilach f|علچة علچ", corporal: "3areef 3urafa mh|عريف عرفا", rap: "raab raab m|راب راب", debate: "munaa6'ara munaa6'araat f|مناظرة مناظرات",
    era: "3a9r 3u9oor m|عصر عصور", liquid: "saayil sawaayil m|سايل سوايل", feast: "waleema walaayim f|وليمة ولايم", profession: "mihna mihan f|مهنة مهن",
    bench: "mag3ad magaa3id m|مقعد مقاعد", symptom: "3ara9' a3raa9' m|عرض أعراض", scout: "kashshaaf kashshaafa mh|كشاف كشافة", aircraft: "6ayyaara 6ayyaaraat f|طيارة طيارات",
    cabinet: "kabat kabataat m|كبت كبتات", display: "shaasha shaashaat f|شاشة شاشات", sorrow: "7uzn 7uzn m|حزن حزن", vault: "5azna 5azaayin f|خزنة خزاين",
    quote: "igtibaas igtibaasaat m|اقتباس اقتباسات", penalty: "3ugooba 3ugoobaat f|عقوبة عقوبات", bargain: "9afga 9afgaat f|صفقة صفقات", pepper: "filfil filfil m|فلفل فلفل",
    helmet: "5oodha 5oodhaat f|خوذة خوذات", fuss: "9'ajja 9'ajja f|ضجة ضجة", arrangement: "tarteeb tarteebaat m|ترتيب ترتيبات", tin: "3ilba 3ilab f|علبة علب",
    collar: "yaaga yaagaat f|ياقة ياقات", belief: "i3tigaad i3tigaadaat m|اعتقاد اعتقادات", psycho: "majnoon majaaneen mh|مجنون مجانين", sum: "majmoo3 majmoo3 m|مجموع مجموع",
    ladder: "sillam salaalim m|سلم سلالم", alternative: "badeel badaayil m|بديل بدايل", raid: "3'aara 3'aaraat f|غارة غارات", heel: "ka3b ku3oob m|كعب كعوب",
    cruise: "ri7la_ba7riyya ri7laat_ba7riyya f|رحلة_بحرية رحلات_بحرية", rhythm: "eegaa3 eegaa3aat m|إيقاع إيقاعات", drum: "6abl 6ubool m|طبل طبول", barrel: "barmeel baraameel m|برميل براميل",
    cargo: "shu7na shu7naat f|شحنة شحنات", cannon: "midfa3 madaafi3 m|مدفع مدافع", ally: "7aleef 7ulafa mh|حليف حلفا", kindness: "6eeba 6eeba f|طيبة طيبة",
    grip: "gab9'a gab9'aat f|قبضة قبضات", skirt: "tannoora tannooraat f|تنورة تنورات", association: "jam3iyya jam3iyyaat f|جمعية جمعيات", spike: "shooka shuwak f|شوكة شوك",
    gallery: "ma3ra9' ma3aari9' m|معرض معارض", ginger: "zanjabeel zanjabeel m|زنجبيل زنجبيل", fist: "gab9'a gab9'aat f|قبضة قبضات", creation: "5alg 5alg m|خلق خلق",
    tension: "tawattur tawattur m|توتر توتر", envy: "7asad 7asad m|حسد حسد", whale: "7oot 7eetaan m|حوت حيتان", dial: "girs agraa9 m|قرص أقراص",
    congress: "mu2tamar mu2tamaraat m|مؤتمر مؤتمرات", villa: "villa villaat f|فيلا فيلات", comic: "koomik koomiks m|كوميك كوميكس", volunteer: "muta6awwi3 muta6awwi3een mh|متطوع متطوعين",
    perspective: "man6'oor man6'ooraat m|منظور منظورات", cycle: "dawra dawraat f|دورة دورات", psychic: "3arraaf 3arraafeen mh|عراف عرافين", goose: "wazza wazz f|وزة وز",
    conclusion: "5ulaa9a 5ulaa9aat f|خلاصة خلاصات", designer: "mu9ammim mu9ammimeen mh|مصمم مصممين", importance: "ahammiyya ahammiyya f|أهمية أهمية", hatred: "karaahiya karaahiya f|كراهية كراهية",
    cam: "kaamira kaamiraat f|كاميرا كاميرات", scotch: "wiski wiski m|ويسكي ويسكي", tub: "banyo banyohaat m|بانيو بانيوهات", bathtub: "banyo banyohaat m|بانيو بانيوهات",
    addition: "i9'aafa i9'aafaat f|إضافة إضافات", ritual: "6ags 6ugoos m|طقس طقوس", prey: "fareesa faraayis f|فريسة فرايس", warden: "sajjaan sajjaaneen mh|سجان سجانين",
    ceiling: "sagf sugoof m|سقف سقوف", zombie: "zombi zombiyaat mh|زومبي زومبيات", institute: "ma3had ma3aahid m|معهد معاهد", democracy: "deemoqraa6iyya deemoqraa6iyya f|ديمقراطية ديمقراطية",
    myth: "us6oora asaa6eer f|أسطورة أساطير", appetite: "shahiyya shahiyya f|شهية شهية", rod: "3a9a 3u9i f|عصا عصي", shepherd: "raa3i ru3aat mh|راعي رعاة",
    deer: "3'azaal 3'izlaan m|غزال غزلان", inspiration: "ilhaam ilhaam m|إلهام إلهام", dummy: "dumya dumaa f|دمية دمى", sailor: "ba77aar ba77aara mh|بحار بحارة",
    destination: "wijha wijhaat f|وجهة وجهات", picnic: "kashta kashtaat f|كشتة كشتات", idol: "9anam a9naam m|صنم أصنام", formula: "mu3aadala mu3aadalaat f|معادلة معادلات",
    clerk: "muwa6'6'af muwa6'6'afeen mh|موظف موظفين", samurai: "saamooraay saamooraay mh|ساموراي ساموراي", consciousness: "wa3i wa3i m|وعي وعي", butcher: "ga99aab ga99aabeen mh|قصاب قصابين",
    ministry: "wizaara wizaaraat f|وزارة وزارات", brandy: "braandi braandi m|براندي براندي", parole: "ifraaj_mashroo6 ifraaj_mashroo6 m|إفراج_مشروط إفراج_مشروط", candle: "sham3a shumoo3 f|شمعة شموع",
    passage: "mamarr mamarraat m|ممر ممرات", organ: "3u9'u a39'aa m|عضو أعضا", luxury: "fa5aama fa5aama f|فخامة فخامة", pistol: "musaddas musaddasaat m|مسدس مسدسات",
    sunset: "3'uroob 3'uroob m|غروب غروب", sunrise: "shuroog shuroog m|شروق شروق", tomb: "gabr gboor m|قبر قبور", engineering: "handasa handasa f|هندسة هندسة",
    balloon: "baaloona baaloonaat f|بالونة بالونات", broadcast: "bathth bathth m|بث بث", ninja: "ninja ninjaat mh|نينجا نينجات", eternity: "abad abad m|أبد أبد",
    slice: "shree7a sharaayi7 f|شريحة شرايح", pace: "sur3a sur3aat f|سرعة سرعات", concrete: "5arasaana 5arasaana f|خرسانة خرسانة", euro: "yooro yoorohaat m|يورو يوروهات",
    sausage: "nagaanig nagaanig f|نقانق نقانق", constable: "shur6i shur6a mh|شرطي شرطة", subway: "metro metro m|مترو مترو", metro: "metro metro m|مترو مترو",
    scheme: "5u66a 5u6a6 f|خطة خطط", protocol: "brotokol brotokolaat m|بروتوكول بروتوكولات", kidney: "kilya kilaa f|كلية كلى", invasion: "3'azw 3'azawaat m|غزو غزوات",
    discipline: "in9'ibaa6 in9'ibaa6 m|انضباط انضباط", horn: "boori bawaari m|بوري بواري", absence: "3'iyaab 3'iyaab m|غياب غياب", philosophy: "falsafa falsafaat f|فلسفة فلسفات",
    verdict: "7ukum a7kaam m|حكم أحكام", privilege: "imtiyaaz imtiyaazaat m|امتياز امتيازات", scent: "ree7a rawaayi7 f|ريحة روايح", daylight: "9'aw_in-nahaar 9'aw_in-nahaar m|ضو_النهار ضو_النهار",
    consent: "muwaafaga muwaafagaat f|موافقة موافقات", wizard: "saa7ir sa7ara mh|ساحر سحرة", plague: "6aa3oon 6aa3oon m|طاعون طاعون", breeze: "naseem naseem m|نسيم نسيم",
    rascal: "shagi ashgiya mh|شقي أشقيا", instinct: "3'areeza 3'araayiz f|غريزة غرايز", porter: "7ammaal 7ammaala mh|حمال حمالة", wrist: "mi39am ma3aa9im m|معصم معاصم",
    drain: "majra majaari m|مجرى مجاري", sector: "qi6aa3 qi6aa3aat m|قطاع قطاعات", income: "da5l da5l m|دخل دخل", laser: "laizar laizaraat m|ليزر ليزرات",
    boxing: "mulaakama mulaakama f|ملاكمة ملاكمة", thumb: "ibhaam abaahim m|إبهام أباهم", lobby: "lobby lobbyaat m|لوبي لوبيات", recipe: "wa9fa wa9faat f|وصفة وصفات",
    missile: "9aaroo5 9awaaree5 m|صاروخ صواريخ", hockey: "hooki hooki m|هوكي هوكي", bubble: "fugaa3a fagaagee3 f|فقاعة فقاقيع", maximum: "7add_agsa 7add_agsa m|حد_أقصى حد_أقصى",
    minimum: "7add_adna 7add_adna m|حد_أدنى حد_أدنى", carriage: "3araba 3arabaat f|عربة عربات", cellar: "gabu gabawaat m|قبو قبوات", associate: "zameel zumala mh|زميل زملا",
    honesty: "9idj 9idj m|صدج صدج", rainbow: "gaws_guza7 agwaas_guza7 m|قوس_قزح أقواس_قزح", seed: "bidhra bidhoor f|بذرة بذور", deed: "3amal a3maal m|عمل أعمال",
    expense: "ma9roof ma9aareef m|مصروف مصاريف", pirate: "gur9aan garaa9ina mh|قرصان قراصنة", prostitute: "3aahira 3aahiraat fh|عاهرة عاهرات", retirement: "tagaa3ud tagaa3ud m|تقاعد تقاعد",
    platform: "min9a min9aat f|منصة منصات", illusion: "wahm awhaam m|وهم أوهام", mill: "6aa7oona 6awaa7een f|طاحونة طواحين", mole: "5aal 5eelaan m|خال خيلان",
    prosecution: "niyaaba niyaaba f|نيابة نيابة", copper: "nu7aas nu7aas m|نحاس نحاس", heir: "wareeth waratha mh|وريث ورثة", length: "6ool a6waal m|طول أطوال",
    enterprise: "mu2assasa mu2assasaat f|مؤسسة مؤسسات", roast: "mashwi mashwi m|مشوي مشوي", flood: "faya9'aan faya9'aanaat m|فيضان فيضانات", harbor: "meena mawaani m|مينا مواني",
    harbour: "meena mawaani m|مينا مواني", mansion: "ga9r gu9oor m|قصر قصور", auction: "mazaad mazaadaat m|مزاد مزادات", bachelor: "a3zab 3uzzaab mh|أعزب عزاب",
    shotgun: "bindigiyya banaadig f|بندقية بنادق", cocktail: "koktail koktailaat m|كوكتيل كوكتيلات", donkey: "7maar 7ameer m|حمار حمير", civilization: "7a9'aara 7a9'aaraat f|حضارة حضارات",
    civilisation: "7a9'aara 7a9'aaraat f|حضارة حضارات", depression: "ikti2aab ikti2aab m|اكتئاب اكتئاب", bra: "sitiyaan sitiyaanaat m|ستيان ستيانات", spill: "insikaab insikaab m|انسكاب انسكاب",
    phrase: "3ibaara 3ibaaraat f|عبارة عبارات", disgrace: "3aar 3aar m|عار عار", approval: "muwaafaga muwaafagaat f|موافقة موافقات", fur: "farw faraa m|فرو فرا",
    jewel: "jawhara jawaahir f|جوهرة جواهر", cheek: "5add 5udood m|خد خدود", ditch: "7ufra 7ufar f|حفرة حفر", dime: "dime dimeaat m|دايم دايمات",
    waitress: "garsoona garsoonaat fh|قرصونة قرصونات", spite: "7igd 7igd m|حقد حقد", rebel: "mutamarrid mutamarrideen mh|متمرد متمردين", orbit: "madaar madaaraat m|مدار مدارات",
    gin: "jin jin m|جن جن", toe: "i9ba3_riyil a9aabi3_riyil m|إصبع_ريل أصابع_ريل", sympathy: "ta3aa6uf ta3aa6uf m|تعاطف تعاطف", growth: "numuww numuww m|نمو نمو",
    psychiatrist: "6abeeb_nafsi a6ibba_nafsiyyeen mh|طبيب_نفسي أطبا_نفسيين", encounter: "liga liga2aat m|لقا لقاءات", column: "3amood a3mida m|عمود أعمدة", hallway: "mamarr mamarraat m|ممر ممرات",
    decade: "3agd 3ugood m|عقد عقود", brass: "nu7aas nu7aas m|نحاس نحاس", shrink: "6abeeb_nafsi a6ibba_nafsiyyeen mh|طبيب_نفسي أطبا_نفسيين", programme: "barnaamij baraamij m|برنامج برامج",
    lust: "shahwa shahawaat f|شهوة شهوات", label: "laasig lawaasig m|لاصق لواصق", tan: "sumra sumra f|سمرة سمرة", ego: "3'uroor 3'uroor m|غرور غرور",
    companion: "rafeeg rufaga mh|رفيق رفقا", lottery: "yaana9eeb yaana9eeb m|يانصيب يانصيب", worm: "dooda dood f|دودة دود", butterfly: "faraasha faraash f|فراشة فراش",
    dialogue: "7iwaar 7iwaaraat m|حوار حوارات", pervert: "mun7arif mun7arifeen mh|منحرف منحرفين", den: "wakr awkaar m|وكر أوكار", politician: "siyaasi siyaasiyyeen mh|سياسي سياسيين",
    logic: "man6ig man6ig m|منطق منطق", gratitude: "imtinaan imtinaan m|امتنان امتنان", exception: "istithnaa istithnaa2aat m|استثناء استثناءات", compromise: "7all_wasa6 7ulool_wasa6 m|حل_وسط حلول_وسط",
    majority: "a3'labiyya a3'labiyya f|أغلبية أغلبية", journal: "majalla majallaat f|مجلة مجلات", climate: "manaa5 manaa5 m|مناخ مناخ", ink: "7ibr 7ibr m|حبر حبر",
    administration: "idaara idaaraat f|إدارة إدارات", resort: "muntaja3 muntaja3aat m|منتجع منتجعات", capacity: "si3a si3aat f|سعة سعات", opponent: "5a9m 5u9oom mh|خصم خصوم",
    instrument: "aala aalaat f|آلة آلات", messenger: "rasool rusul mh|رسول رسل", survivor: "naaji naajeen mh|ناجي ناجين", archer: "raami rumaat mh|رامي رماة",
    cloth: "gumaash agmisha m|قماش أقمشة", pond: "birka birak f|بركة برك", runway: "madraj madaarij m|مدرج مدارج", sickness: "mara9' amraa9' m|مرض أمراض",
    civilian: "madani madaniyyeen mh|مدني مدنيين", shrimp: "rubyaan rubyaan m|ربيان ربيان", championship: "bu6oola bu6oolaat f|بطولة بطولات", household: "bait byoot m|بيت بيوت",
    curiosity: "fu9'ool fu9'ool m|فضول فضول", forehead: "jabha jabhaat f|جبهة جبهات", hunter: "9ayyaad 9ayyaadeen mh|صياد صيادين", hint: "talmee7 talmee7aat m|تلميح تلميحات",
    peanut: "fustug fustug m|فستق فستق", bracelet: "siwaar asaawir m|سوار أساور", gesture: "eemaa2a eemaa2aat f|إيماءة إيماءات", rib: "9'il3 9'uloo3 m|ضلع ضلوع",
    homeland: "wa6an aw6aan m|وطن أوطان", leap: "gafza gafzaat f|قفزة قفزات", leaf: "waraga awraag f|ورقة أوراق", jar: "martabaan martabaanaat m|مرطبان مرطبانات",
    savage: "mutawa77ish mutawa77isheen mh|متوحش متوحشين", creek: "jadwal jadaawil m|جدول جداول", pony: "mahr amhaar m|مهر أمهار", cleaner: "mna6'6'if mna6'6'ifaat m|منظف منظفات",
    lunatic: "majnoon majaaneen mh|مجنون مجانين", gal: "bint banaat fh|بنت بنات", colony: "musta3mara musta3maraat f|مستعمرة مستعمرات", volume: "9oot 9oot m|صوت صوت",
    saving: "tawfeer tawfeeraat m|توفير توفيرات", harvest: "7a9aad 7a9aad m|حصاد حصاد", buffalo: "jaamoos jawaamees m|جاموس جواميس", firework: "al3aab_naariyya al3aab_naariyya f|ألعاب_نارية ألعاب_نارية",
    poverty: "fagr fagr m|فقر فقر", leadership: "giyaada giyaada f|قيادة قيادة", ambition: "6umoo7 6umoo7aat m|طموح طموحات", trouser: "ban6aloon ban6aloonaat m|بنطلون بنطلونات",
    racist: "3un9uri 3un9uriyyeen mh|عنصري عنصريين", ankle: "kaa7il kawaa7il m|كاحل كواحل", villain: "shirreer ashraar mh|شرير أشرار", draft: "muswadda muswaddaat f|مسودة مسودات",
    countess: "koontessa koontessaat fh|كونتيسة كونتيسات", portrait: "9oora 9uwar f|صورة صور", font: "5a66 5u6oo6 m|خط خطوط", pencil: "galam_ru9aa9 aglaam_ru9aa9 m|قلم_رصاص أقلام_رصاص",
    pen: "galam aglaam m|قلم أقلام", notebook_: "daftar dafaatir m|دفتر دفاتر", eraser: "mimsa7a mimsa7aat f|ممسحة ممساحات", ruler: "mis6ara masaa6ir f|مسطرة مساطر",
    bag_s: "shan6a shuna6 f|شنطة شنط", backpack: "shan6at_6'ahr shuna6_6'ahr f|شنطة_ظهر شنط_ظهر", textbook: "kitaab kutub m|كتاب كتب", dictionary: "gaamoos gawaamees m|قاموس قواميس",
    essay: "magaal magaalaat m|مقال مقالات", thesis: "risaala rasaayil f|رسالة رسايل", lecture: "mu7aa9'ara mu7aa9'araat f|محاضرة محاضرات", tuition: "ru9oom ru9oom f|رسوم رسوم",
    scholarship: "bi3tha bi3thaat f|بعثة بعثات", campus: "7aram_jaami3i 7aram_jaami3i m|حرم_جامعي حرم_جامعي", dorm: "sakan sakan m|سكن سكن", hostel: "sakan sakan m|سكن سكن",
    cafeteria: "kafateerya kafateeryaat f|كافتيريا كافتيريات", canteen: "kafateerya kafateeryaat f|كافتيريا كافتيريات", playground: "mal3ab malaa3ib m|ملعب ملاعب", classroom: "fa9l fu9ool m|فصل فصول",
  };
  const X4_ADJS = {
    fond: "m7ibb m7ibba m7ibbeen|محب محبة محبين", effective: "fa33aal fa33aala fa33aaleen|فعال فعالة فعالين", inner: "daa5ili daa5iliyya daa5iliyyeen|داخلي داخلية داخليين",
    catholic: "kaathooleeki kaathooleekiyya kaathooleekiyyeen|كاثوليكي كاثوليكية كاثوليكيين", creative: "mubdi3 mubdi3a mubdi3een|مبدع مبدعة مبدعين", various: "mu5talif mu5talifa mu5talifeen|مختلف مختلفة مختلفين",
    delighted: "mabsoo6 mabsoo6a mabsoo6een|مبسوط مبسوطة مبسوطين", vast: "waasi3 waas3a waas3een|واسع واسعة واسعين", largest: "^akbar|أكبر", constant: "thaabit thaabta thaabteen|ثابت ثابتة ثابتين",
    solar: "shamsi shamsiyya shamsiyyeen|شمسي شمسية شمسيين", lame: "sa5eef sa5eefa su5afa|سخيف سخيفة سخفا", undercover: "sirri sirriyya sirriyyeen|سري سرية سريين",
    tragic: "ma2saawi ma2saawiyya ma2saawiyyeen|مأساوي مأساوية مأساويين", limited: "ma7dood ma7dooda ma7doodeen|محدود محدودة محدودين",
    sober: "9aa7i 9aa7ya 9aa7een|صاحي صاحية صاحين", delicate: "7assaas 7assaasa 7assaaseen|حساس حساسة حساسين", independent: "mustagill mustagilla mustagilleen|مستقل مستقلة مستقلين",
    petty: "taafih taafha taafheen|تافه تافهة تافهين", sunny: "mushmis mushmisa mushmiseen|مشمس مشمسة مشمسين",
    unfair: "mob_3adil mob_3adil mob_3adil|مب_عدل مب_عدل مب_عدل", absurd: "sa5eef sa5eefa su5afa|سخيف سخيفة سخفا", sore: "y3awwir t3awwir y3awwiroon|يعور تعور يعورون",
    unconscious: "mi3'ma_3alaih mi3'ma_3alaiha mi3'ma_3alaihum|مغمى_عليه مغمى_عليها مغمى_عليهم", severe: "shadeed shadeeda shadeedeen|شديد شديدة شديدين", splendid: "raa2i3 raa2i3a raa2i3een|رائع رائعة رائعين",
    vulnerable: "9'a3eef 9'a3eefa 9'u3afa|ضعيف ضعيفة ضعفا", vital: "9'aroori 9'arooriyya 9'arooriyyeen|ضروري ضرورية ضروريين", unexpected: "3'air_mutawagga3 3'air_mutawagga3a 3'air_mutawagga3een|غير_متوقع غير_متوقعة غير_متوقعين",
    supreme: "a3la|أعلى", broad: "waasi3 waas3a waas3een|واسع واسعة واسعين", foul: "wasi5 was5a was5een|وسخ وسخة وسخين",
    infected: "mu9aab mu9aaba mu9aabeen|مصاب مصابة مصابين", relieved: "murta7 murta7a murta7een|مرتاح مرتاحة مرتاحين", solo: "solo solo solo|سولو سولو سولو", practical: "3amali 3amaliyya 3amaliyyeen|عملي عملية عمليين",
    adorable: "kyoot kyoot kyoot|كيوت كيوت كيوت", anonymous: "majhool majhoola majhooleen|مجهول مجهولة مجهولين", harsh: "gaasi gaasya gaasyeen|قاسي قاسية قاسيين", faithful: "wafi wafiyya awfiya|وفي وفية أوفيا",
    shitty: "5aayis 5aaysa 5aayseen|خايس خايسة خايسين", keen: "mit7ammis mit7ammisa mit7ammiseen|متحمس متحمسة متحمسين", aggressive: "3udwaani 3udwaaniyya 3udwaaniyyeen|عدواني عدوانية عدوانيين",
    pale: "shaa7ib shaa7ba shaa7been|شاحب شاحبة شاحبين", significant: "muhimm muhimma muhimmeen|مهم مهمة مهمين", visual: "ba9ari ba9ariyya ba9ariyyeen|بصري بصرية بصريين", honored: "mitsharrif mitsharrifa mitsharrifeen|متشرف متشرفة متشرفين",
    honoured: "mitsharrif mitsharrifa mitsharrifeen|متشرف متشرفة متشرفين", sonic: "9awti 9awtiyya 9awtiyyeen|صوتي صوتية صوتيين", rusty: "m9addi m9addya m9addyeen|مصدي مصدية مصديين",
    dedicated: "mukarras mukarrasa mukarraseen|مكرس مكرسة مكرسين", primary: "asaasi asaasiyya asaasiyyeen|أساسي أساسية أساسيين", wee: "9i3'eer 9i3'eera 9i3'aar|صغير صغيرة صغار",
    dull: "mumill mumilla mumilleen|ممل مملة مملين", worthless: "ma_yiswa ma_tiswa ma_yiswoon|ما_يسوى ما_تسوى ما_يسوون", instrumental: "asaasi asaasiyya asaasiyyeen|أساسي أساسية أساسيين",
    bold: "jaree2 jaree2a jaree2een|جريء جريئة جريئين", twisted: "malwi malwiyya malwiyyeen|ملوي ملوية ملويين", martial: "gitaali gitaaliyya gitaaliyyeen|قتالي قتالية قتاليين", imperial: "imbraa6oori imbraa6ooriyya imbraa6ooriyyeen|إمبراطوري إمبراطورية إمبراطوريين", paranoid: "mitwahhim mitwahhima mitwahhimeen|متوهم متوهمة متوهمين", neat: "murattab murattaba murattabeen|مرتب مرتبة مرتبين", glorious: "majeed majeeda majeedeen|مجيد مجيدة مجيدين", pacific: "haadi haadya haadyeen|هادي هادية هاديين",
    blank: "faa9'i faa9'ya faa9'yeen|فاضي فاضية فاضيين", tender: "6ari 6ariyya 6ariyyeen|طري طرية طريين", genuine: "a9li a9liyya a9liyyeen|أصلي أصلية أصليين",
    strict: "9aarim 9aarma 9aarmeen|صارم صارمة صارمين", brutal: "wa7shi wa7shiyya wa7shiyyeen|وحشي وحشية وحشيين", thrilled: "mit7ammis mit7ammisa mit7ammiseen|متحمس متحمسة متحمسين",
    prior: "saabig saabga saabgeen|سابق سابقة سابقين", outer: "5aariji 5aarijiyya 5aarijiyyeen|خارجي خارجية خارجيين", handy: "mufeed mufeeda mufeedeen|مفيد مفيدة مفيدين", stiff: "yaabis yaabsa yaabseen|يابس يابسة يابسين",
    genetic: "wiraathi wiraathiyya wiraathiyyeen|وراثي وراثية وراثيين", marvelous: "raa2i3 raa2i3a raa2i3een|رائع رائعة رائعين", marvellous: "raa2i3 raa2i3a raa2i3een|رائع رائعة رائعين", endless: "ma_yi5la9 ma_ti5la9 ma_yi5la9oon|ما_يخلص ما_تخلص ما_يخلصون",
    jolly: "mari7 mari7a mari7een|مرح مرحة مرحين", convenient: "munaasib munaasiba munaasibeen|مناسب مناسبة مناسبين", offended: "mit9'aayig mit9'aayga mit9'aaygeen|متضايق متضايقة متضايقين",
    bald: "a9la3 9al3a 9ul3|أصلع صلعا صلع", convicted: "mudaan mudaana mudaaneen|مدان مدانة مدانين", mature: "naa9'ij naa9'ja naa9'jeen|ناضج ناضجة ناضجين",
    fatal: "mumeet mumeeta mumeeteen|مميت مميتة مميتين", distracted: "mshattat mshattata mshattateen|مشتت مشتتة مشتتين", fortunate: "ma76'oo6' ma76'oo6'a ma76'oo6'een|محظوظ محظوظة محظوظين",
    hilarious: "mu9'7ik_wayed mu9'7ika_wayed mu9'7ikeen_wayed|مضحك_وايد مضحكة_وايد مضحكين_وايد", exclusive: "7a9ri 7a9riyya 7a9riyyeen|حصري حصرية حصريين", dreadful: "fa6'ee3 fa6'ee3a fa6'ee3een|فظيع فظيعة فظيعين",
    intimate: "7ameem 7ameema 7ameemeen|حميم حميمة حميمين", eager: "mit7ammis mit7ammisa mit7ammiseen|متحمس متحمسة متحمسين", allergic: "7assaas 7assaasa 7assaaseen|حساس حساسة حساسين",
    accomplished: "naaji7 naaj7a naaj7een|ناجح ناجحة ناجحين", essential: "9'aroori 9'arooriyya 9'arooriyyeen|ضروري ضرورية ضروريين", passionate: "sha3'oof sha3'oofa sha3'oofeen|شغوف شغوفة شغوفين",
    precise: "dageeg dageega dageegeen|دقيق دقيقة دقيقين", accurate: "dageeg dageega dageegeen|دقيق دقيقة دقيقين", wooden: "5ashabi 5ashabiyya 5ashabiyyeen|خشبي خشبية خشبيين", harmless: "mob_mu2dhi mob_mu2dhiya mob_mu2dhiyeen|مب_مؤذي مب_مؤذية مب_مؤذيين",
    vicious: "shirs shirsa shirseen|شرس شرسة شرسين", nearest: "^agrab|أقرب", greedy: "6ammaa3 6ammaa3a 6ammaa3een|طماع طماعة طماعين", arrogant: "ma3'roor ma3'roora ma3'rooreen|مغرور مغرورة مغرورين",
    mutual: "mutabaadal mutabaadala mutabaadaleen|متبادل متبادلة متبادلين", educated: "mit3allim mit3allima mit3allimeen|متعلم متعلمة متعلمين", doomed: "mantahi mantahya mantahyeen|منتهي منتهية منتهيين", alcoholic: "sakraan sakraana sakraaneen|سكران سكرانة سكرانين", drunk: "sakraan sakraana sakraaneen|سكران سكرانة سكرانين", };
  const X4_VERBS = {
    admire: ["gaddart gaddar gaddir gaddir|قدرت قدر قدر قدر", {}],
    recommend: ["na9a7t na9a7 n9a7 in9a7|نصحت نصح نصح انصح", { lv: 'a', obj: 'li', objNP: 'li' }],
    polish_v: ["lamma3t lamma3 lammi3 lammi3|لمعت لمع لمع لمع", {}],
    twist: ["liffait laff liff liff|لفيت لف لف لف", {}],
    book_v: ["7ajazt 7ajaz 7jiz i7jiz|حجزت حجز حجز احجز", { lv: 'i' }],
    reserve: ["7ajazt 7ajaz 7jiz i7jiz|حجزت حجز حجز احجز", { lv: 'i' }],
    pump_v: ["9'a55ait 9'a55 9'u55 9'u55|ضخيت ضخ ضخ ضخ", {}],
    whip_v: ["jaladt jalad jlid ijlid|جلدت جلد جلد اجلد", { lv: 'i' }],
    interfere: ["tdha55alt tdha55al tdha55al tdha55al|تدخلت تدخل تدخل تدخل", { lv: 'i', in: 'fi', with: 'fi' }],
    permit_v: ["sama7t sama7 sma7 isma7|سمحت سمح سمح اسمح", { lv: 'i', obj: 'li', objNP: 'li' }],
    con: ["na9abt na9ab n9ub in9ub|نصبت نصب نصب انصب", { lv: 'u', obj: '3ala', objNP: '3ala' }],
    chant: ["raddadt raddad raddid raddid|رددت ردد ردد ردد", {}],
    conduct_v: ["ajrait ajra ajri ajri|أجريت أجرى أجري أجر", {}],
    approve: ["waafagt waafag waafig waafig|وافقت وافق وافق وافق", { on: '3ala', obj: '3ala', objNP: '3ala' }],
    direct_v: ["wajjaht wajjah wajjih wajjih|وجهت وجه وجه وجه", {}],
    toss: ["ramait rama rmi irmi|رميت رمى رمي ارم", { lv: 'i' }],
    react: ["raddait radd ridd ridd|رديت رد رد رد", { to: '3ala' }],
    embrace: ["7a9'ant 7a9'an 7u9'un u7u9'n|حضنت حضن حضن احضن", { lv: 'u' }],
    communicate: ["tawaa9alt tawaa9al tawaa9al tawaa9al|تواصلت تواصل تواصل تواصل", { lv: 'i', with: 'wiyya' }],
    swell: ["intafa5t intafa5 ntifi5 intifi5|انتفخت انتفخ انتفخ انتفخ", { past: 'swelled', pp: 'swollen', lv: 'i' }],
    form_v: ["kawwant kawwan kawwin kawwin|كونت كون كون كون", {}],
    display_v: ["3ara9't 3ara9' 3ri9' i3ri9'|عرضت عرض عرض اعرض", { lv: 'i' }],
    quote_v: ["igtabast igtabas gtibis igtibis|اقتبست اقتبس اقتبس اقتبس", { lv: 'i' }],
    shove: ["daffait daff diff diff|دفيت دف دف دف", {}],
    cooperate: ["t3aawant t3aawan t3aawan t3aawan|تعاونت تعاون تعاون تعاون", { lv: 'i', with: 'wiyya' }],
    claim_v: ["idda3ait idda3a dda3i idda3i|ادعيت ادعى ادعي ادع", { lv: 'i' }],
    forbid: ["mana3t mana3 mna3 imna3|منعت منع منع امنع", { past: 'forbade', pp: 'forbidden', lv: 'a' }],
    prohibit: ["mana3t mana3 mna3 imna3|منعت منع منع امنع", { lv: 'a' }],
    cycle_v: ["rikabt rikab rkab irkab|ركبت ركب ركب اركب", { lv: 'i' }],
    conclude: ["istantajt istantaj stantij istantij|استنتجت استنتج استنتج استنتج", { lv: 'i' }],
    file_v: ["gaddamt gaddam gaddim gaddim|قدمت قدم قدم قدم", {}],
    establish: ["assast assas assis assis|أسست أسس أسس أسس", {}],
    broadcast_v: ["baththait bathth bithth bithth|بثيت بث بث بث", { past: 'broadcast', pp: 'broadcast' }],
    ensure: ["t2akkadt t2akkad t2akkad t2akkad|تأكدت تأكد تأكد تأكد", { lv: 'i', obj: 'min', objNP: 'min' }],
    accompany: ["raafagt raafag raafig raafig|رافقت رافق رافق رافق", {}],
    assist: ["saa3adt saa3ad saa3id saa3id|ساعدت ساعد ساعد ساعد", {}],
    withdraw: ["si7abt si7ab s7ab is7ab|سحبت سحب سحب اسحب", { past: 'withdrew', pp: 'withdrawn', lv: 'i' }],
    negotiate: ["tfaawa9't tfaawa9' tfaawa9' tfaawa9'|تفاوضت تفاوض تفاوض تفاوض", { lv: 'i', with: 'wiyya' }],
    beware: ["intabaht intabah ntibih intibih|انتبهت انتبه انتبه انتبه", { lv: 'i', of: 'min' }],
    repay: ["raddait radd ridd ridd|رديت رد رد رد", { past: 'repaid', pp: 'repaid', obj: 'li', objNP: 'li' }],
    spill: ["dalagt dalag dlig idlig|دلقت دلق دلق ادلق", { lv: 'i' }],
    slam: ["9afagt 9afag 9fig i9fig|صفقت صفق صفق اصفق", { lv: 'i' }],
    thud: ["6i7t 6aa7 6ee7 6ee7|طحت طاح طيح طيح", {}],
    screech: ["9arra5t 9arra5 9arri5 9arri5|صرخت صرخ صرخ صرخ", {}],
    roar: ["za2art za2ar z2ir iz2ir|زأرت زأر زئر ازئر", { lv: 'i' }],
    pound_v: ["daggait dagg digg digg|دقيت دق دق دق", {}],
    creak: ["9arrait 9arr 9irr 9irr|صريت صر صر صر", {}],
    rumble: ["ga3ga3t ga3ga3 ga3gi3 ga3gi3|قعقعت قعقع قعقع قعقع", {}],
    mutter: ["tamtamt tamtam tamtim tamtim|تمتمت تمتم تمتم تمتم", {}],
    stutter: ["tla3thamt tla3tham tla3tham tla3tham|تلعثمت تلعثم تلعثم تلعثم", { lv: 'i' }],
    lecture_v: ["7aa9'art 7aa9'ar 7aa9'ir 7aa9'ir|حاضرت حاضر حاضر حاضر", {}],
    preach: ["wa3a6't wa3a6' w3i6' iw3i6'|وعظت وعظ وعظ اوعظ", { lv: 'i' }],
    cram: ["7afa6't 7afa6' 7fa6' i7fa6'|حفظت حفظ حفظ احفظ", { lv: 'a' }],
    tutor: ["darrast darras darris darris|درست درس درس درس", {}],
    plagiarize: ["nasa5t nasa5 nsa5 insa5|نسخت نسخ نسخ انسخ", { lv: 'i' }],
    flunk: ["rasabt rasab rsib irsib|رسبت رسب رسب ارسب", { lv: 'i' }],
    mop: ["masa7t masa7 msa7 imsa7|مسحت مسح مسح امسح", { lv: 'i' }],
    dust_v: ["na6'6'aft na6'6'af na6'6'if na6'6'if|نظفت نظف نظف نظف", {}],
    scrub: ["farakt farak frik ifrik|فركت فرك فرك افرك", { lv: 'i' }],
    rinse: ["sha66aft sha66af sha66if sha66if|شطفت شطف شطف شطف", {}],
    soak: ["naga3t naga3 nga3 inga3|نقعت نقع نقع انقع", { lv: 'a' }],
    peel: ["gashshart gashshar gashshir gashshir|قشرت قشر قشر قشر", {}],
    chop: ["ga66a3t ga66a3 ga66i3 ga66i3|قطعت قطع قطع قطع", {}],
    slice_v: ["ga66a3t ga66a3 ga66i3 ga66i3|قطعت قطع قطع قطع", {}],
    grill: ["shawait shawa shwi ishwi|شويت شوى شوي اشو", { lv: 'i' }],
    roast_v: ["shawait shawa shwi ishwi|شويت شوى شوي اشو", { lv: 'i' }],
    stir: ["7arrakt 7arrak 7arrik 7arrik|حركت حرك حرك حرك", {}],
    simmer: ["3'alait 3'ala 3'li i3'li|غليت غلى غلي اغل", { lv: 'i' }],
    marinate: ["tabbalt tabbal tabbil tabbil|تبلت تبل تبل تبل", {}],
    season_v: ["tabbalt tabbal tabbil tabbil|تبلت تبل تبل تبل", {}],
    microwave_v: ["sa55ant sa55an sa55in sa55in|سخنت سخن سخن سخن", {}],
    heat: ["sa55ant sa55an sa55in sa55in|سخنت سخن سخن سخن", {}],
    sip: ["rashaft rashaf rshif irshif|رشفت رشف رشف ارشف", { lv: 'i' }],
    gulp: ["bila3t bila3 bla3 ibla3|بلعت بلع بلع ابلع", { lv: 'a' }],
    snack_v: ["akalt_snaak akal_snaak aakil_snaak kil_snaak|أكلت_سناك أكل_سناك آكل_سناك كل_سناك", {}],
    overeat: ["akalt_wayed akal_wayed aakil_wayed kil_wayed|أكلت_وايد أكل_وايد آكل_وايد كل_وايد", { past: 'overate', pp: 'overeaten' }],
    'stand up': ["wigaft wigaf wgaf oogaf|وقفت وقف وقف اوقف", { past: 'stood', lv: 'i' }],
    'come in': ["dashshait dashsh dishsh dishsh|دشيت دش دش دش", { past: 'came', pp: 'come' }],
    'get in': ["dashshait dashsh dishsh dishsh|دشيت دش دش دش", { past: 'got', pp: 'gotten' }],
    'slow down': ["ba66ait ba66a ba66i ba66i|بطيت بطى بطي بطي", {}],
    'speed up': ["sarra3t sarra3 sarri3 sarri3|سرعت سرع سرع سرع", { past: 'sped', pp: 'sped' }],
    'carry on': ["kammalt kammal kammil kammil|كملت كمل كمل كمل", {}],
    'cheer up': ["farra7t farra7 farri7 farri7|فرحت فرح فرح فرح", {}],
    'calm down': ["haddait hadda haddi haddi|هديت هدى هدي هدي", {}],
    'shut down': ["6affait 6affa 6affi 6affi|طفيت طفى طفي طفي", { past: 'shut', pp: 'shut' }],
    'put down': ["7a66ait 7a66 7u66 7u66|حطيت حط حط حط", { past: 'put', pp: 'put' }],
    'let down': ["5ayyabt 5ayyab 5ayyib 5ayyib|خيبت خيب خيب خيب", { past: 'let', pp: 'let' }],
    'cut off': ["ga6a3t ga6a3 g6a3 ig6a3|قطعت قطع قطع اقطع", { past: 'cut', pp: 'cut', lv: 'a' }],
    'swell up': ["intafa5t intafa5 ntifi5 intifi5|انتفخت انتفخ انتفخ انتفخ", { past: 'swelled', pp: 'swollen', lv: 'i' }],
    upset_v: ["za33alt za33al za33il za33il|زعلت زعل زعل زعل", { past: 'upset', pp: 'upset' }],
    bow_v: ["in7anait in7ana n7ini in7ini|انحنيت انحنى انحني انحن", { lv: 'i' }],
    'take out': ["6alla3t 6alla3 6alli3 6alli3|طلعت طلع طلع طلع", { past: 'took', pp: 'taken' }],
    'bring back': ["rajja3t rajja3 rajji3 rajji3|رجعت رجع رجع رجع", { past: 'brought', pp: 'brought' }],
    'hand over': ["sallamt sallam sallim sallim|سلمت سلم سلم سلم", {}],
    'hand in': ["sallamt sallam sallim sallim|سلمت سلم سلم سلم", {}],
    'hand out': ["wazza3t wazza3 wazzi3 wazzi3|وزعت وزع وزع وزع", {}],
    'throw away': ["ramait rama rmi irmi|رميت رمى رمي ارم", { past: 'threw', pp: 'thrown', lv: 'i' }],
    'throw out': ["ramait rama rmi irmi|رميت رمى رمي ارم", { past: 'threw', pp: 'thrown', lv: 'i' }],
  };
  const X4_ADVS = {
    halfway: "fi nu9 i6-6areeg|في نص الطريق", closely: "3an greeb|عن قريب", specifically: "bil-dhaat|بالذات", strictly: "bi-9araama|بصرامة", backwards: "warra|ورا",
    legally: "gaanooniyyan|قانونياً", amongst: "bain|بين", wholeheartedly: "min kil galbi|من كل قلبي",
    };
  const X4_FIXED = {
    'in spite of': "ra3'm|رغم", 'in the rear': "warra|ورا", 'at the rear': "warra|ورا", 'on the contrary': "bil-3aks|بالعكس", 'in addition': "bil-i9'aafa|بالإضافة", 'in addition to': "bil-i9'aafa ila|بالإضافة إلى",
    'with regards to': "b5u9oo9|بخصوص", 'in regards to': "b5u9oo9|بخصوص", 'best regards': "ma3 taqdeeri|مع تقديري", 'kind regards': "ma3 taqdeeri|مع تقديري", 'my regards to': "sallim li 3ala|سلم لي على",
    'send my regards': "sallim li 3alaihum|سلم لي عليهم", 'send my regards to': "sallim li 3ala|سلم لي على", 'give my regards to': "sallim li 3ala|سلم لي على", 'give my regards': "sallim li 3alaihum|سلم لي عليهم", 'darn it': "uff|أف", 'dang it': "uff|أف",
    'take a seat': A3("ig3id|اقعد", "ig3idi|اقعدي", "ig3idoo|اقعدوا"), 'have a seat': A3("ig3id|اقعد", "ig3idi|اقعدي", "ig3idoo|اقعدوا"),
    'go away': A3("roo7 3anni|روح عني", "roo7i 3anni|روحي عني", "roo7oo 3anni|روحوا عني"),
    'back off': A3("ib3id|ابعد", "ib3idi|ابعدي", "ib3idoo|ابعدوا"), 'step back': A3("irja3 warra|ارجع ورا", "irja3i warra|ارجعي ورا", "irja3oo warra|ارجعوا ورا"), 'move over': A3("zi7|زح", "zi7i|زحي", "zi7oo|زحوا"),
    'look out': A3("intabih|انتبه", "intabhi|انتبهي", "intabhoo|انتبهوا"), 'watch out': A3("intabih|انتبه", "intabhi|انتبهي", "intabhoo|انتبهوا"), 'heads up': A3("intabih|انتبه", "intabhi|انتبهي", "intabhoo|انتبهوا"),
    'watch out for': "intabih min|انتبه من", 'look out for': "intabih min|انتبه من",
    'cheer up': A3("ifra7|افرح", "ifra7i|افرحي", "ifra7oo|افرحوا"), 'chill out': A3("rawwig|روق", "rawwigi|روقي", "rawwigoo|روقوا"),
    'never give up': A3("la tistaslim abadan|لا تستسلم أبداً", "la tistaslimeen abadan|لا تستسلمين أبداً", "la tistaslimoon abadan|لا تستسلمون أبداً"),
    'do not give up': A3("la tistaslim|لا تستسلم", "la tistaslimeen|لا تستسلمين", "la tistaslimoon|لا تستسلمون"),
    'hands up': A3("irfa3 eedak|ارفع إيدك", "irfa3i eedich|ارفعي إيدج", "irfa3oo eedkum|ارفعوا إيدكم"),
    'knock it off': "bass|بس", 'that is enough': "bass 5alaa9|بس خلاص", 'enough is enough': "bass 5alaa9|بس خلاص", 'forget about it': "insa|انسى",
    'aha': "aah|آه", 'whew': "il-7amdulillah|الحمدلله", 'darn': "uff|أف", 'bingo': "bingo|بنقو", 'voila': "haak|هاك", 'tada': "haak|هاك",
  };
  const X4_NOUN_ALIAS = { regards: 'regard', lungs: 'lung', ribs: 'rib', heels: 'heel', toes: 'toe', cheeks: 'cheek', ancestors: 'ancestor', rumors: 'rumor', rumours: 'rumour', elements: 'element', symptoms: 'symptom',
    seeds: 'seed', expenses: 'expense', jewels: 'jewel', tales: 'tale', methods: 'method', funds: 'fund', horns: 'horn', drums: 'drum', fireworks: 'firework', trousers: 'trouser', savings: 'saving',
    dudes: 'dude', assholes: 'asshole', politicians: 'politician', pirates: 'pirate', hunters: 'hunter', farmers: 'farmer', passengers: 'passenger', couples: 'couple', turtles: 'turtle', objects: 'object',
    grounds: 'ground', arrangements: 'arrangement', affairs: 'affair', figures: 'figure', bits: 'bit', meters: 'meter', metres: 'metre', inches: 'inch', cents: 'cent', euros: 'euro', pounds: 'pound', yens: 'yen',
    tale: 'story', ground: 'land', bit: 'piece', figure: 'number', affair: 'relationship', object: 'thing', couple: 'pair', dude: 'guy', asshole: 'idiot' };
  Object.assign(ADJ_PREP, { allergic: { to: 'min' }, fond: { of: '' }, keen: { on: '3ala' }, eager: { for: 'li' }, passionate: { about: 'b' }, dedicated: { to: 'li' }, greedy: { for: 'li' }, offended: { by: 'min' }, vulnerable: { to: 'li' } });
  for (const [k, v] of Object.entries(X4_NOUNS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_RAW) && !(kk + '_' in NOUN_RAW)) NOUN_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X4_ADJS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADJ_RAW) && !(kk + '_' in ADJ_RAW)) ADJ_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X4_VERBS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in VERB_RAW) && !(kk + '_' in VERB_RAW)) VERB_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X4_ADVS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADV_RAW) && !(kk + '_' in ADV_RAW)) ADV_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X4_FIXED)) { const kk = k.trim(); if (!(kk in FIXED_RAW)) FIXED_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X4_NOUN_ALIAS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_ALIAS)) NOUN_ALIAS[kk] = v; }
  const X5_NOUNS = {
    pleasure: "siroor siroor m|سرور سرور", sheriff: "ma2moor ma2mooreen mh|مأمور مأمورين", mayor: "3umda 3umad mh|عمدة عمد", priest: "gissees gusus mh|قسيس قسس",
    jury: "hay2at_mu7allafeen hay2aat_mu7allafeen f|هيئة_محلفين هيئات_محلفين", pity: "shafaga shafaga f|شفقة شفقة", jerk: "7ageer 7ugara mh|حقير حقرا", freak: "majnoon majaaneen mh|مجنون مجانين",
    penny: "fils fuloos m|فلس فلوس", estate: "3agaar 3agaaraat m|عقار عقارات", saint: "qiddees qiddeeseen mh|قديس قديسين", makeup: "makyaaj makyaaj m|مكياج مكياج",
    thanksgiving: "3eed_ish-shukr 3eed_ish-shukr m|عيد_الشكر عيد_الشكر", presentation: "3ar9'_tagdeemi 3uroo9'_tagdeemiyya m|عرض_تقديمي عروض_تقديمية", reservation: "7ajz 7ujoozaat m|حجز حجوزات",
    coordinate: "i7daathi i7daathiyyaat m|إحداثي إحداثيات", umbrella: "shamsiyya shamsiyyaat f|شمسية شمسيات", carbon: "karboon karboon m|كربون كربون", memorial: "nu9b_tidhkaari an9aab_tidhkaariyya m|نصب_تذكاري أنصاب_تذكارية",
    earthquake: "zilzaal zalaazil m|زلزال زلازل", echo: "9ada 9ada m|صدى صدى", swamp: "mustanga3 mustanga3aat m|مستنقع مستنقعات", manual: "daleel adilla m|دليل أدلة",
    rig: "rig rigaat m|رق رقات", depth: "3umg a3maag m|عمق أعماق", assassin: "assassin assassins mh|أساسن أساسنز", torch: "mish3al mashaa3il m|مشعل مشاعل",
    reunion: "lammat_shaml lammaat_shaml f|لمة_شمل لمات_شمل", stall: "kushk akshaak m|كشك أكشاك", legacy: "irth irth m|إرث إرث", literature: "adab adab m|أدب أدب",
    panel: "lo7a lo7aat f|لوحة لوحات", sequence: "tasalsul tasalsulaat m|تسلسل تسلسلات", anxiety: "galag galag m|قلق قلق", dice: "zahr zahr m|زهر زهر",
    orphan: "yateem aytaam mh|يتيم أيتام", advertising: "i3laanaat i3laanaat f|إعلانات إعلانات", nickname: "lagab algaab m|لقب ألقاب", dot: "nug6a nuga6 f|نقطة نقط",
    scenario: "seenaaryo seenaaryohaat m|سيناريو سيناريوهات", lipstick: "rooj rooj m|روج روج", fiction: "5ayaal 5ayaal m|خيال خيال", musician: "moosigi moosigiyyeen mh|موسيقي موسيقيين",
    calendar: "tagweem tagaaweem m|تقويم تقاويم", balcony: "balkoona balkoonaat f|بلكونة بلكونات", melody: "la7n al7aan m|لحن ألحان", barbecue: "barbikyoo barbikyoo m|باربكيو باربكيو",
    cricket: "kreekit kreekit m|كريكت كريكت", laboratory: "mu5tabar mu5tabaraat m|مختبر مختبرات", landlord: "9aa7ib_il-milk a97aab_il-milk mh|صاحب_الملك أصحاب_الملك", cottage: "kookh akwaa5 m|كوخ أكواخ",
    backyard: "7oosh 7eeshaan m|حوش حيشان", rash: "6af7 6af7 m|طفح طفح", despair: "ya2s ya2s m|يأس يأس", hawk: "9agr 9goor m|صقر صقور",
    short_n: "short shortaat m|شورت شورتات", distress: "9'eeg 9'eeg m|ضيق ضيق", magician: "saa7ir sa7ara mh|ساحر سحرة", dynamite: "deenaameet deenaameet m|ديناميت ديناميت",
    pudding: "booding booding m|بودنق بودنق", corporation: "sharika sharikaat f|شركة شركات", disorder: "i9'6iraab i9'6iraabaat m|اضطراب اضطرابات", sadness: "7uzn 7uzn m|حزن حزن",
    specialist: "a5i9aa2i a5i9aa2iyyeen mh|أخصائي أخصائيين", prescription: "wa9fa_6ibbiyya wa9faat_6ibbiyya f|وصفة_طبية وصفات_طبية", grid: "shabaka shabakaat f|شبكة شبكات", haircut: "gi99at_sha3ar gi99aat_sha3ar f|قصة_شعر قصات_شعر",
    lodge: "kookh akwaa5 m|كوخ أكواخ", feather: "reesha reesh f|ريشة ريش", oak: "balloo6 balloo6 m|بلوط بلوط", olive: "zaitoona zaitoon f|زيتونة زيتون",
    maniac: "majnoon majaaneen mh|مجنون مجانين", landscape: "man6'ar manaa6'ir m|منظر مناظر", straw: "ma99aa9a ma99aa9aat f|مصاصة مصاصات", dam: "sadd sudood m|سد سدود",
    rehab: "ta2heel ta2heel m|تأهيل تأهيل", agenda: "ajinda ajindaat f|أجندة أجندات", glue: "9am3' 9am3' m|صمغ صمغ", diner: "ma63am ma6aa3im m|مطعم مطاعم",
    sketch: "rasma rasmaat f|رسمة رسمات", parliament: "barlamaan barlamaanaat m|برلمان برلمانات", topic: "maw9'oo3 mawaa9'ee3 m|موضوع مواضيع", salmon: "salmon salmon m|سلمون سلمون",
    wig: "baarooka baarookaat f|باروكة باروكات", wax: "sham3 sham3 m|شمع شمع", herd: "ga6ee3 gu63aan m|قطيع قطعان", integrity: "nazaaha nazaaha f|نزاهة نزاهة",
    gangster: "gangster gangsteriyya mh|قانقستر قانقسترية", briefcase: "shan6a shuna6 f|شنطة شنط", puppet: "dumya dumaa f|دمية دمى", pancake: "bankaik bankaik m|بانكيك بانكيك",
    database: "database database f|داتابيس داتابيس", heartbeat: "9'arbat_galb 9'arbaat_galb f|ضربة_قلب ضربات_قلب", cigar: "seegaar seegaaraat m|سيجار سيجارات", noodle: "noodles noodles m|نودلز نودلز",
    mug: "koob akwaab m|كوب أكواب", fountain: "naafoora nawaafeer f|نافورة نوافير", observation: "mulaa7a6'a mulaa7a6'aat f|ملاحظة ملاحظات", attic: "3illiyya 3illiyyaat f|علية عليات",
    harmony: "insijaam insijaam m|انسجام انسجام", difficulty: "9u3ooba 9u3oobaat f|صعوبة صعوبات", substance: "maadda mawaad f|مادة مواد", thread: "thread threadaat m|ثريد ثريدات",
    gap: "fajwa fajawaat f|فجوة فجوات", chapel: "kaneesa kanaayis f|كنيسة كنايس", railway: "sikkat_7adeed sikak_7adeed f|سكة_حديد سكك_حديد", railroad: "sikkat_7adeed sikak_7adeed f|سكة_حديد سكك_حديد",
    pension: "ma3aash ma3aashaat m|معاش معاشات", poster: "boostar boostaraat m|بوستر بوسترات", addict: "mudmin mudmineen mh|مدمن مدمنين", accountant: "mu7aasib mu7aasibeen mh|محاسب محاسبين",
    tumor: "waram awraam m|ورم أورام", tumour: "waram awraam m|ورم أورام", jeep: "jeep jeepaat m|جيب جيبات", wheelchair: "kursi_mut7arrik karaasi_mut7arrika m|كرسي_متحرك كراسي_متحركة",
    tobacco: "tabi3' tabi3' m|تبغ تبغ", yoga: "yoga yoga f|يوقا يوقا", variety: "tanawwu3 tanawwu3 m|تنوع تنوع", cord: "silk aslaak m|سلك أسلاك",
    explosive: "mutafajjir mutafajjiraat m|متفجر متفجرات", origin: "a9l u9ool m|أصل أصول", rogue: "rogue rogues mh|روق روقز", corruption: "fasaad fasaad m|فساد فساد",
    ski: "tazalluj tazalluj m|تزلج تزلج", vet: "6abeeb_bai6ari a6ibba_bai6ariyyeen mh|طبيب_بيطري أطبا_بيطريين", lobster: "istaakoza istaakoza m|استاكوزا استاكوزا", canal: "ganaa ganawaat f|قناة قنوات",
    shade: "6'ill 6'ilaal m|ظل ظلال", orchestra: "orkestra orkestraat f|أوركسترا أوركسترات", guidance: "irshaad irshaad m|إرشاد إرشاد", rival: "munaafis munaafiseen mh|منافس منافسين",
    elite: "nu5ba nu5ba f|نخبة نخبة", chart: "chart chartaat m|تشارت تشارتات", resident: "saakin sukkaan mh|ساكن سكان", stew: "9aaloona 9aaloonaat f|صالونة صالونات",
    nun: "raahiba raahibaat fh|راهبة راهبات", satisfaction: "ri9'a ri9'a m|رضا رضا", spark: "sharaara sharaaraat f|شرارة شرارات", peak: "gimma gimam f|قمة قمم",
    breed: "fa9eela fa9aayil f|فصيلة فصايل", architect: "muhandis_mi3maari muhandiseen_mi3maariyyeen mh|مهندس_معماري مهندسين_معماريين", dose: "jur3a jur3aat f|جرعة جرعات", bolt: "bargi baraa3'i m|برغي براغي",
    autograph: "tawgee3 tawgee3aat m|توقيع توقيعات", asset: "a9l u9ool m|أصل أصول", essence: "jawhar jawhar m|جوهر جوهر", disco: "disko disko m|ديسكو ديسكو",
    handful: "7afna 7afnaat f|حفنة حفنات", pumpkin: "gar3a gar3 f|قرعة قرع", anchor: "mirsaa maraasi f|مرساة مراسي", urge: "ra3'ba ra3'baat f|رغبة رغبات",
    vein: "3irg 3uroog m|عرق عروق", obsession: "hawas hawas m|هوس هوس", razor: "moos amwaas m|موس أمواس", mutant: "mutant mutants mh|ميوتنت ميوتنتس",
    rack: "raff rfoof m|رف رفوف", expectation: "tawaggu3 tawaggu3aat m|توقع توقعات", pigeon: "7amaama 7amaam f|حمامة حمام", demonstration: "mu6'aahara mu6'aaharaat f|مظاهرة مظاهرات",
    treason: "5iyaana 5iyaana f|خيانة خيانة", violin: "kamanja kamanjaat f|كمنجة كمنجات", lifestyle: "nam6_7ayaat anmaa6_7ayaat m|نمط_حياة أنماط_حياة", realm: "realm realms m|ريلم ريلمز",
    tuna: "toona toona f|تونة تونة", nursing: "tamree9' tamree9' m|تمريض تمريض", altar: "madhba7 madhaabi7 m|مذبح مذابح", jelly: "jeli jeli m|جيلي جيلي",
    thrill: "ithaara ithaara f|إثارة إثارة", lounge: "9aala 9aalaat f|صالة صالات", dimension: "bu3d ab3aad m|بعد أبعاد", bodyguard: "7aaris_sha59i 7urraas_sha59iyyeen mh|حارس_شخصي حراس_شخصيين",
    rug: "sijjaada sajaajeed f|سجادة سجاجيد", jaw: "fakk fkook m|فك فكوك", popcorn: "bobkoorn bobkoorn m|بوبكورن بوبكورن", courtroom: "gaa3at_ma7kama gaa3aat_ma7kama f|قاعة_محكمة قاعات_محكمة",
    documentary: "film_wathaa2iqi aflaam_wathaa2iqiyya m|فيلم_وثائقي أفلام_وثائقية", donor: "mutabarri3 mutabarri3een mh|متبرع متبرعين", shipment: "shu7na shu7naat f|شحنة شحنات", vest: "sidairi sidairiyyaat m|صديري صديريات",
    mechanic: "meekaaneeki meekaaneekiyya mh|ميكانيكي ميكانيكية", relation: "3alaaga 3alaagaat f|علاقة علاقات", fare: "ujra ujoor f|أجرة أجور", karma: "karma karma f|كارما كارما",
    saddle: "sarj srooj m|سرج سروج", burial: "dafn dafn m|دفن دفن", detention: "i7tijaaz i7tijaaz m|احتجاز احتجاز", vow: "nadhr nudhoor m|نذر نذور",
    breakdown: "inhiyaar inhiyaaraat m|انهيار انهيارات", gown: "fustaan fasaateen m|فستان فساتين", countryside: "reef reef m|ريف ريف", swan: "baja3a baja3 f|بجعة بجع",
    moonlight: "9'aw_il-gumar 9'aw_il-gumar m|ضو_القمر ضو_القمر", identification: "hawiyya hawiyyaat f|هوية هويات", consideration: "i3tibaar i3tibaaraat m|اعتبار اعتبارات", bandit: "li9 lu9oo9 mh|لص لصوص",
    transplant: "zar3 zar3 m|زرع زرع", loneliness: "wi7da wi7da f|وحدة وحدة", frost: "9agee3 9agee3 m|صقيع صقيع", registration: "tasjeel tasjeel m|تسجيل تسجيل",
    prophet: "nabi anbiya mh|نبي أنبيا", constitution: "dustoor dasaateer m|دستور دساتير", buyer: "mushtari mushtareen mh|مشتري مشترين", volcano: "burkaan baraakeen m|بركان براكين",
    accomplice: "shareek shuraka mh|شريك شركا", bounty: "mukaafa2a mukaafa2aat f|مكافأة مكافآت", asylum: "lujoo2 lujoo2 m|لجوء لجوء", duel: "duel duels m|ديول ديولز",
    carnival: "karnafaal karnafaalaat m|كرنفال كرنفالات", tray: "9eeniyya 9awaani f|صينية صواني", handcuff: "kalabsh kalabshaat m|كلبش كلبشات", barrier: "7aajiz 7awaajiz m|حاجز حواجز",
    hunch: "i7saas i7saas m|إحساس إحساس", yacht: "ya5t yu5oot m|يخت يخوت", stain: "bug3a buga3 f|بقعة بقع", syndrome: "mutalaazima mutalaazimaat f|متلازمة متلازمات",
    ambush: "kameen kamaayin m|كمين كماين", violation: "mu5aalafa mu5aalafaat f|مخالفة مخالفات", owl: "booma boom f|بومة بوم", cane: "3a9a 3u9i f|عصا عصي",
    folks: "jamaa3a jamaa3a mh|جماعة جماعة", examination: "fa79 fu7oo9aat m|فحص فحوصات", slaughter: "madhba7a madhaabi7 f|مذبحة مذابح", triumph: "inti9aar inti9aaraat m|انتصار انتصارات",
    vengeance: "intiqaam intiqaam m|انتقام انتقام", replacement: "badeel badaayil m|بديل بدايل", institution: "mu2assasa mu2assasaat f|مؤسسة مؤسسات", fabric: "gumaash agmisha m|قماش أقمشة",
    corridor: "mamarr mamarraat m|ممر ممرات", pledge: "wa3d wu3ood m|وعد وعود", housing: "sakan sakan m|سكن سكن", mines: "manaajim manaajim m|مناجم مناجم",
    whereabouts: "makaan makaan m|مكان مكان", welfare: "rafaahiya rafaahiya f|رفاهية رفاهية", profit: "rib7 arbaa7 m|ربح أرباح", humor_n: "5iffat_damm 5iffat_damm f|خفة_دم خفة_دم",
    troops: "junood junood mh|جنود جنود", bud: "5ooy 5waan mh|خوي خوان", cans: "3ilab 3ilab f|علب علب", feathers: "reesh reesh m|ريش ريش",
    shorts: "short shortaat m|شورت شورتات", noodles: "noodles noodles m|نودلز نودلز", pancakes: "bankaik bankaik m|بانكيك بانكيك", handcuffs: "kalabshaat kalabshaat f|كلبشات كلبشات",
    coordinates: "i7daathiyyaat i7daathiyyaat f|إحداثيات إحداثيات", assets: "u9ool u9ool f|أصول أصول", expectations: "tawaggu3aat tawaggu3aat f|توقعات توقعات", veins: "3uroog 3uroog m|عروق عروق",
    profits: "arbaa7 arbaa7 m|أرباح أرباح", bandits: "lu9oo9 lu9oo9 mh|لصوص لصوص", hundred: "miya miyaat f|مية ميات", thousand: "alf aalaaf m|ألف آلاف", million: "milyoon malaayeen m|مليون ملايين",
  };
  const X5_ADJS = {
    final: "a5eer a5eera a5eereen|أخير أخيرة أخيرين", particular: "mu3ayyan mu3ayyana mu3ayyaneen|معين معينة معينين", committed: "multazim multazima multazimeen|ملتزم ملتزمة ملتزمين",
    financial: "maali maaliyya maaliyyeen|مالي مالية ماليين", spiritual: "roo7aani roo7aaniyya roo7aaniyyeen|روحاني روحانية روحانيين", humble: "mutawaa9'i3 mutawaa9'i3a mutawaa9'i3een|متواضع متواضعة متواضعين",
    skinny: "na7eef na7eefa nu7aaf|نحيف نحيفة نحاف", slim: "na7eef na7eefa nu7aaf|نحيف نحيفة نحاف", folk: "sha3bi sha3biyya sha3biyyeen|شعبي شعبية شعبيين", stuffed: "shab3aan shab3aana shab3aaneen|شبعان شبعانة شبعانين",
    domestic: "daa5ili daa5iliyya daa5iliyyeen|داخلي داخلية داخليين", economic: "iqti9aadi iqti9aadiyya iqti9aadiyyeen|اقتصادي اقتصادية اقتصاديين", tremendous: "haa2il haa2ila haa2ileen|هائل هائلة هائلين",
    possessed: "maskoon maskoona maskooneen|مسكون مسكونة مسكونين", logical: "man6igi man6igiyya man6igiyyeen|منطقي منطقية منطقيين", medium: "wasa6 wasa6 wasa6|وسط وسط وسط",
    spectacular: "mudhhil mudhhila mudhhileen|مذهل مذهلة مذهلين", reliable: "mawthoog mawthooga mawthoogeen|موثوق موثوقة موثوقين", elegant: "aneeg aneega aneegeen|أنيق أنيقة أنيقين",
    crucial: "7aasim 7aasma 7aasmeen|حاسم حاسمة حاسمين", crowded: "za7ma za7ma za7ma|زحمة زحمة زحمة", isolated: "ma3zool ma3zoola ma3zooleen|معزول معزولة معزولين",
    fragile: "hashsh hashsha hashsheen|هش هشة هشين", suitable: "munaasib munaasiba munaasibeen|مناسب مناسبة مناسبين", initial: "awwali awwaliyya awwaliyyeen|أولي أولية أوليين",
    hostile: "mu3aadi mu3aadiya mu3aadiyeen|معادي معادية معاديين", classified: "sirri sirriyya sirriyyeen|سري سرية سريين", shiny: "laamma3 laamma3a laamma3een|لماع لماعة لماعين",
    unpleasant: "mob_7ilu mob_7ilwa mob_7ilween|مب_حلو مب_حلوة مب_حلوين", toxic: "toxic toxic toxic|توكسك توكسك توكسك", sensible: "3aagil 3aagla 3uggaal|عاقل عاقلة عقال",
    conscious: "waa3i waa3ya waa3yeen|واعي واعية واعيين", sincere: "9aadig 9aadga 9aadgeen|صادق صادقة صادقين", bizarre: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين",
    confidential: "sirri sirriyya sirriyyeen|سري سرية سريين", relevant: "lah_3alaaga laha_3alaaga lahum_3alaaga|له_علاقة لها_علاقة لهم_علاقة", intact: "saleem saleema saleemeen|سليم سليمة سليمين",
    identical: "mi6aabig mi6aabga mi6aabgeen|مطابق مطابقة مطابقين", consistent: "thaabit thaabta thaabteen|ثابت ثابتة ثابتين", organic: "3u9'wi 3u9'wiyya 3u9'wiyyeen|عضوي عضوية عضويين",
    digital: "ragmi ragmiyya ragmiyyeen|رقمي رقمية رقميين", sentimental: "3aa6ifi 3aa6ifiyya 3aa6ifiyyeen|عاطفي عاطفية عاطفيين", dried: "mjaffaf mjaffafa mjaffafeen|مجفف مجففة مجففين",
    inappropriate: "mob_munaasib mob_munaasiba mob_munaasibeen|مب_مناسب مب_مناسبة مب_مناسبين", immortal: "5aalid 5aalda 5aaldeen|خالد خالدة خالدين", delightful: "raa2i3 raa2i3a raa2i3een|رائع رائعة رائعين",
    automatic: "otomaatik otomaatik otomaatik|أوتوماتيك أوتوماتيك أوتوماتيك", amusing: "mu9'7ik mu9'7ika mu9'7ikeen|مضحك مضحكة مضحكين", unnecessary: "mob_laazim mob_laazma mob_laazmeen|مب_لازم مب_لازمة مب_لازمين",
    ignorant: "jaahil jaahla juhhaal|جاهل جاهلة جهال", modest: "mutawaa9'i3 mutawaa9'i3a mutawaa9'i3een|متواضع متواضعة متواضعين", subtle: "5afeef 5afeefa 5ifaaf|خفيف خفيفة خفاف",
    inevitable: "7atmi 7atmiyya 7atmiyyeen|حتمي حتمية حتميين", humiliated: "mdhallal mdhallala mdhallaleen|مذلل مذللة مذللين", historical: "taaree5i taaree5iyya taaree5iyyeen|تاريخي تاريخية تاريخيين",
    fierce: "shirs shirsa shirseen|شرس شرسة شرسين", hollow: "faa9'i faa9'ya faa9'yeen|فاضي فاضية فاضيين", radical: "jidhri jidhriyya jidhriyyeen|جذري جذرية جذريين",
    frustrated: "mi7ba6 mi7ba6a mi7ba6een|محبط محبطة محبطين", magnetic: "mi3'naa6eesi mi3'naa6eesiyya mi3'naa6eesiyyeen|مغناطيسي مغناطيسية مغناطيسيين", outstanding: "mumtaaz mumtaaza mumtaazeen|ممتاز ممتازة ممتازين",
    interior: "daa5ili daa5iliyya daa5iliyyeen|داخلي داخلية داخليين", surrounding: "mu7ee6 mu7ee6a mu7ee6een|محيط محيطة محيطين", reckless: "mutahawwir mutahawwira mutahawwireen|متهور متهورة متهورين",
    heavenly: "samaawi samaawiyya samaawiyyeen|سماوي سماوية سماويين", casual: "kaajwal kaajwal kaajwal|كاجوال كاجوال كاجوال", respectable: "mu7taram mu7tarama mu7tarameen|محترم محترمة محترمين",
    pointless: "ma_lah_da3i ma_laha_da3i ma_lahum_da3i|ما_له_داعي ما_لها_داعي ما_لهم_داعي", efficient: "fa33aal fa33aala fa33aaleen|فعال فعالة فعالين", outrageous: "fa6'ee3 fa6'ee3a fa6'ee3een|فظيع فظيعة فظيعين",
    gracious: "kareem kareema kuramaa|كريم كريمة كرما", legendary: "us6oori us6ooriyya us6ooriyyeen|أسطوري أسطورية أسطوريين", mechanical: "meekaaneeki meekaaneekiyya meekaaneekiyyeen|ميكانيكي ميكانيكية ميكانيكيين",
    artificial: "9inaa3i 9inaa3iyya 9inaa3iyyeen|صناعي صناعية صناعيين", incoming: "jaay jaaya jaayeen|جاي جاية جايين", lethal: "mumeet mumeeta mumeeteen|مميت مميتة مميتين",
    epic: "epic epic epic|إبك إبك إبك", blunt: "9aree7 9aree7a 9ura7a|صريح صريحة صرحا", thoughtful: "la6eef la6eefa lu6afa|لطيف لطيفة لطفا",
    hairy: "msha33ir msha33ira msha33ireen|مشعر مشعرة مشعرين", childish: "6ufooli 6ufooliyya 6ufooliyyeen|طفولي طفولية طفوليين", unstable: "mob_mustagirr mob_mustagirra mob_mustagirreen|مب_مستقر مب_مستقرة مب_مستقرين",
    grounded: "mamnoo3_min_i6-6al3a mamnoo3a_min_i6-6al3a mamnoo3een_min_i6-6al3a|ممنوع_من_الطلعة ممنوعة_من_الطلعة ممنوعين_من_الطلعة", express: "saree3 saree3a saree3een|سريع سريعة سريعين",
    underwater: "ta7t_il-maay ta7t_il-maay ta7t_il-maay|تحت_الماي تحت_الماي تحت_الماي", eliminated: "mi6la3 mi6la3a mi6la3een|مطلع مطلعة مطلعين", drunken: "sakraan sakraana sakraaneen|سكران سكرانة سكرانين",
    // comparatives
    taller: "a6wal|أطول", larger: "achbar|أچبر", quicker: "asra3|أسرع", happier: "mabsoo6_akthar|مبسوط_أكثر", funnier: "mu9'7ik_akthar|مضحك_أكثر", luckier: "ma76'oo6'_akthar|محظوظ_أكثر",
    busier: "mash3'ool_akthar|مشغول_أكثر", lazier: "aksal|أكسل", crazier: "majnoon_akthar|مجنون_أكثر", wiser: "a7kam|أحكم", deeper: "a3mag|أعمق", wider: "awsa3|أوسع",
    thinner: "an7af|أنحف", fatter: "asman|أسمن", sweeter: "a7la|أحلى", softer: "an3am|أنعم", tougher: "a93ab|أصعب", smoother: "an3am|أنعم", calmer: "ahda|أهدى", quieter: "ahda|أهدى",
    fresher: "6aazaj_akthar|طازج_أكثر", newer: "ajdad|أجدد", simpler: "absa6|أبسط", poorer: "afgar|أفقر", kinder: "a6yab|أطيب", braver: "ashja3|أشجع", dumber: "a3'ba|أغبى",
    louder: "a3la|أعلى", warmer: "adfa|أدفى", safer: "a2man|آمن", cleaner_: "an6'af|أنظف", dirtier: "awsa5|أوسخ", uglier: "absha3|أبشع", fancier: "af5am|أفخم", sadder: "a7zan|أحزن",
    thicker: "ath5an|أثخن", rougher: "a5shan|أخشن", rarer: "andar|أندر", brighter: "anwar|أنور", darker: "a6'lam|أظلم", cuter: "akyoot|أكيوت", angrier: "mi3a99ib_akthar|معصب_أكثر",
    hungrier: "yoo3aan_akthar|يوعان_أكثر", tastier: "aladhdh|ألذ", healthier: "a977|أصح", wealthier: "a3'na|أغنى", friendlier: "al6af|ألطف", scarier: "a5waf|أخوف", nearer: "agrab|أقرب",
    stupider: "a3'ba|أغبى", stranger_: "a3'rab|أغرب", weirder: "a3'rab|أغرب", greater: "a36'am|أعظم", worthier: "ajdar|أجدر", bolder: "ajra2|أجرأ", fuller: "amla|أملى", emptier: "afra3'|أفرغ",
    // superlatives
    tallest: "^a6wal|أطول", largest_: "^achbar|أچبر", quickest: "^asra3|أسرع", happiest: "^as3ad|أسعد", funniest: "^a9'7ak|أضحك", luckiest: "^akthar_wa7id_ma76'oo6'|أكثر_واحد_محظوظ",
    busiest: "^akthar_wa7id_mash3'ool|أكثر_واحد_مشغول", laziest: "^aksal|أكسل", craziest: "^akthar_wa7id_majnoon|أكثر_واحد_مجنون", wisest: "^a7kam|أحكم", deepest: "^a3mag|أعمق", widest: "^awsa3|أوسع",
    thinnest: "^an7af|أنحف", fattest: "^asman|أسمن", sweetest: "^a7la|أحلى", softest: "^an3am|أنعم", toughest: "^a93ab|أصعب", calmest: "^ahda|أهدى", quietest: "^ahda|أهدى",
    simplest: "^absa6|أبسط", poorest: "^afgar|أفقر", kindest: "^a6yab|أطيب", bravest: "^ashja3|أشجع", dumbest: "^a3'ba|أغبى", loudest: "^a3la|أعلى", warmest: "^adfa|أدفى", safest: "^a2man|آمن",
    cleanest: "^an6'af|أنظف", dirtiest: "^awsa5|أوسخ", ugliest: "^absha3|أبشع", fanciest: "^af5am|أفخم", saddest: "^a7zan|أحزن", thickest: "^ath5an|أثخن", rarest: "^andar|أندر",
    brightest: "^anwar|أنور", darkest: "^a6'lam|أظلم", cutest: "^akyoot|أكيوت", tastiest: "^aladhdh|ألذ", healthiest: "^a977|أصح", wealthiest: "^a3'na|أغنى", scariest: "^a5waf|أخوف",
    earliest: "^abkar|أبكر", slowest: "^ab6a2|أبطأ", coldest: "^abrad|أبرد", hottest: "^a7arr|أحر", farthest: "^ab3ad|أبعد", furthest: "^ab3ad|أبعد", fewest: "^agal|أقل", least: "^agal|أقل",
    finest: "^a7san|أحسن", strangest: "^a3'rab|أغرب", weirdest: "^a3'rab|أغرب", stupidest: "^a3'ba|أغبى", shortest: "^ag9ar|أقصر", heaviest: "^athgal|أثقل", lightest: "^a5aff|أخف",
    lowest_: "^awa6a|أوطى", nicest_: "^a7la|أحلى", fastest_: "^asra3|أسرع", biggest_: "^achbar|أچبر", worthiest: "^ajdar|أجدر", boldest: "^ajra2|أجرأ", fullest: "^amla|أملى",
    // more/most + adjective
    'most expensive': "^a3'la|أغلى", 'more expensive': "a3'la|أغلى", 'most important': "^ahamm|أهم", 'more important': "ahamm|أهم", 'most beautiful': "^ajmal|أجمل", 'more beautiful': "ajmal|أجمل",
    'most famous': "^ash-har|أشهر", 'more famous': "ash-har|أشهر", 'most difficult': "^a93ab|أصعب", 'more difficult': "a93ab|أصعب", 'most dangerous': "^a56ar|أخطر", 'more dangerous': "a56ar|أخطر",
    'most powerful': "^agwa|أقوى", 'more powerful': "agwa|أقوى", 'most popular': "^ash-har|أشهر", 'more popular': "ash-har|أشهر", 'most useful': "^anfa3|أنفع", 'more useful': "anfa3|أنفع",
    'most interesting': "^amta3|أمتع", 'more interesting': "amta3|أمتع", 'most fun': "^amta3|أمتع", 'more fun': "amta3|أمتع", 'most boring': "^amall|أمل", 'more boring': "amall|أمل",
    'most comfortable': "^arya7|أريح", 'more comfortable': "arya7|أريح", 'most common': "^ashya3|أشيع", 'more common': "ashya3|أشيع", 'most valuable': "^athman|أثمن", 'more valuable': "athman|أثمن",
    'most intelligent': "^adhka|أذكى", 'more intelligent': "adhka|أذكى", 'most delicious': "^aladhdh|ألذ", 'more delicious': "aladhdh|ألذ", 'most successful': "^anja7|أنجح", 'more successful': "anja7|أنجح",
    'most accurate': "^adagg|أدق", 'more accurate': "adagg|أدق", 'most recent': "^a7dath|أحدث", 'more recent': "a7dath|أحدث", 'most active': "^anshat|أنشط", 'more active': "anshat|أنشط",
    'most efficient': "^akfa2|أكفأ", 'more efficient': "akfa2|أكفأ", 'most honest': "^a9dag|أصدق", 'more honest': "a9dag|أصدق", 'most generous': "^akram|أكرم", 'more generous': "akram|أكرم",
    'most patient': "^a9bar|أصبر", 'more patient': "a9bar|أصبر", 'more careful': "a7ra9|أحرص", 'most careful': "^a7ra9|أحرص", 'most experienced': "^a5bar|أخبر", 'more experienced': "a5bar|أخبر",
    'most reliable': "^awthag|أوثق", 'more reliable': "awthag|أوثق", 'most handsome': "^awsam|أوسم", 'more handsome': "awsam|أوسم", 'most amazing': "^arwa3|أروع", 'more amazing': "arwa3|أروع",
    'most wonderful': "^arwa3|أروع", 'most awesome': "^arwa3|أروع", 'most annoying': "^akthar_shay_mzi3ij|أكثر_شي_مزعج", 'more annoying': "mzi3ij_akthar|مزعج_أكثر", 'most helpful': "^akthar_wa7id_ysaa3id|أكثر_واحد_يساعد",
    'most serious': "^ajadd|أجد", 'more serious': "ajadd|أجد", 'most talented': "^amhar|أمهر", 'more talented': "amhar|أمهر", 'most skilled': "^amhar|أمهر", 'more skilled': "amhar|أمهر",
    'most special': "^amyaz|أميز", 'more special': "amyaz|أميز", 'most effective': "^anja3|أنجع", 'more effective': "anja3|أنجع", 'most polite': "^a2dab|أأدب", 'more polite': "a2dab|أأدب",
    'most romantic': "^akthar_wa7id_romansi|أكثر_واحد_رومانسي", 'more romantic': "romansi_akthar|رومانسي_أكثر", 'most creative': "^abda3|أبدع", 'more creative': "abda3|أبدع", 'most unique': "^amyaz|أميز",
    'most exciting': "^amta3|أمتع", 'more exciting': "amta3|أمتع", 'most peaceful': "^ahda|أهدى", 'more peaceful': "ahda|أهدى", 'most convenient': "^ansab|أنسب", 'more convenient': "ansab|أنسب",
    'most suitable': "^ansab|أنسب", 'more suitable': "ansab|أنسب", 'most appropriate': "^ansab|أنسب", 'more appropriate': "ansab|أنسب", 'most obvious': "^awa9'a7|أوضح", 'more obvious': "awa9'a7|أوضح",
    'most expensive one': "^a3'la_wa7id|أغلى_واحد", 'most precious': "^a3'la|أغلى", 'more precious': "a3'la|أغلى", 'most hated': "^akthar_wa7id_makrooh|أكثر_واحد_مكروه", 'most loved': "^akthar_wa7id_ma7boob|أكثر_واحد_محبوب",
  };
  const X5_VERBS = {
    commit: ["irtakabt irtakab rtikib irtikib|ارتكبت ارتكب ارتكب ارتكب", { lv: 'i' }],
    'freak out': ["injannait injann njann injann|انجنيت انجن انجن انجن", { lv: 'i' }],
    hand_v: ["naawalt naawal naawil naawil|ناولت ناول ناول ناول", { io: true }],
    ease: ["5affaft 5affaf 5affif 5affif|خففت خفف خفف خفف", {}],
    eliminate: ["ga9'ait ga9'a g9'i ig9'i|قضيت قضى قضي اقض", { lv: 'i', obj: '3ala', objNP: '3ala' }],
    pursue: ["6aaradt 6aarad 6aarid 6aarid|طاردت طارد طارد طارد", {}],
    tolerate: ["t7ammalt t7ammal t7ammal t7ammal|تحملت تحمل تحمل تحمل", { lv: 'i' }],
    hesitate: ["tradadt tradad tradad tradad|ترددت تردد تردد تردد", { lv: 'i' }],
    persuade: ["agna3t agna3 gni3 igni3|أقنعت أقنع قنع أقنع", { lv: 'i' }],
    dip: ["3'ammast 3'ammas 3'ammis 3'ammis|غمست غمس غمس غمس", {}],
    restore: ["rajja3t rajja3 rajji3 rajji3|رجعت رجع رجع رجع", {}],
    possess: ["malakt malak mlik imlik|ملكت ملك ملك املك", { lv: 'i' }],
    purchase: ["=buy", {}],
    humiliate: ["dhallalt dhallal dhallil dhallil|ذللت ذلل ذلل ذلل", {}],
    adore: ["3ashagt 3ashag 3shag i3shag|عشقت عشق عشق اعشق", { lv: 'a' }],
    urge_v: ["7aththait 7athth 7ithth 7ithth|حثيت حث حث حث", {}],
    slaughter_v: ["dhiba7t dhiba7 dhba7 idhba7|ذبحت ذبح ذبح اذبح", { lv: 'a' }],
    resolve: ["=solve", {}],
    consult: ["istashart istashaar stasheer istasheer|استشرت استشار استشير استشر", { lv: 'i' }],
    vow_v: ["nadhart nadhar ndhir indhir|نذرت نذر نذر انذر", { lv: 'i' }],
    refer: ["7awwalt 7awwal 7awwil 7awwil|حولت حول حول حول", { to: 'li' }],
    dispatch: ["arsalt arsal arsil arsil|أرسلت أرسل أرسل أرسل", {}],
    lure: ["3'arrait 3'arra 3'arri 3'arri|غريت غرى غري غري", {}],
    haul: ["jarrait jarr jurr jurr|جريت جر جر جر", {}],
    strain_v: ["ajhadt ajhad ajhid ajhid|أجهدت أجهد أجهد أجهد", {}],
    rally_v: ["tjamma3t tjamma3 tjamma3 tjamma3|تجمعت تجمع تجمع تجمع", { lv: 'i' }],
    pose_v: ["wagaft wagaf wgaf oogaf|وقفت وقف وقف اوقف", { lv: 'i' }],
    breed_v: ["rabbait rabba rabbi rabbi|ربيت ربى ربي ربي", { past: 'bred', pp: 'bred' }],
    disagree: ["i5talaft i5talaf 5tilif i5tilif|اختلفت اختلف اختلف اختلف", { lv: 'i', with: 'wiyya' }],
    hush_v: ["sakatt sakat skit iskit|سكت سكت سكت اسكت", { lv: 'i' }],
    howl: ["3await 3awa 3awi i3wi|عويت عوى عوي اعو", { lv: 'i' }],
    growl: ["za2art za2ar z2ir iz2ir|زأرت زأر زئر ازئر", { lv: 'i' }],
    purr: ["5ar5art 5ar5ar 5ar5ir 5ar5ir|خرخرت خرخر خرخر خرخر", {}],
    meow: ["mawmawt mawmaw mawmiw mawmiw|موموت مومو مومو مومو", {}],
    hiss: ["fa77ait fa77 fi77 fi77|فحيت فح فح فح", {}],
    buzz: ["6ann 6ann 6inn 6inn|طن طن طن طن", {}],
    glow: ["twahhajt twahhaj twahhaj twahhaj|توهجت توهج توهج توهج", { lv: 'i' }],
    sparkle: ["lama3t lama3 lma3 ilma3|لمعت لمع لمع المع", { lv: 'a' }],
    fade: ["bihatt bihat bhat ibhat|بهتت بهت بهت ابهت", { lv: 'a' }],
    emerge: ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { lv: 'a' }],
    arise: ["6ila3t 6ila3 6la3 i6la3|طلعت طلع طلع اطلع", { past: 'arose', pp: 'arisen', lv: 'a' }],
  };
  const X5_ADVS = {
    awhile: "shway|شوي", equally: "bil-mithl|بالمثل", strongly: "*bshidda|بشدة", lightly: "bshway|بشوي", sharply: "bi-7idda|بحدة", beautifully: "bshakil 7ilu|بشكل حلو",
    mentally: "nafsiyyan|نفسياً", physically: "jasadiyyan|جسدياً", emotionally: "3aa6ifiyyan|عاطفياً", financially: "maaliyyan|مالياً", importantly: "il-ahamm|الأهم", versus: "9'idd|ضد",
    minus: "naagi9|ناقص", plus_: "zaayid|زايد", aside: "3ala janb|على جنب", nowadays: "hal ayyaam|هالأيام", formerly: "gabil|قبل", lately_: "hal ayyaam|هالأيام",
    hereby: "bhadha|بهذا", thereby: "wbchidhi|وبچذي", likewise: "bil-mithl|بالمثل", otherwise_: "wila|وإلا", meanwhile_: "fi nafs il-wagt|في نفس الوقت",
  };
  const X5_FIXED = {
    'for your sake': A3("3ashaanak|عشانك", "3ashaanich|عشانج", "3ashaankum|عشانكم"), 'for my sake': "3ashaani|عشاني", 'for his sake': "3ashaana|عشانه", 'for her sake': "3ashaanha|عشانها",
    'for our sake': "3ashaanna|عشاننا", 'for their sake': "3ashaanhum|عشانهم", 'for the sake of': "3ashaan|عشان", "for god's sake": "bil-laah 3alaik|بالله عليك", 'for gods sake': "bil-laah 3alaik|بالله عليك",
    'for god sake': "bil-laah 3alaik|بالله عليك", "for heaven's sake": "bil-laah 3alaik|بالله عليك", 'for heavens sake': "bil-laah 3alaik|بالله عليك", 'god almighty': "ya allah|يا الله",
    'feel free to': A3("la titraddad|لا تتردد", "la titraddadeen|لا تترددين", "la titraddadoon|لا تترددون"), 'more importantly': "wil-ahamm|والأهم", 'most importantly': "wil-ahamm|والأهم",
    'nailed it': "9'abba6t-ha|ضبطتها", 'you nailed it': A3("9'abba6t-ha|ضبطتها", "9'abba6tee-ha|ضبطتيها", "9'abba6too-ha|ضبطتوها"), 'i nailed it': "9'abba6t-ha|ضبطتها",
    'hush': A3("iskit|اسكت", "iskiti|اسكتي", "iskitoo|اسكتوا"), 'howdy': "hala|هلا", 'kiddo': "ya walad|يا ولد", 'sweetie': A3("7abeebi|حبيبي", "7abeebti|حبيبتي", "7abaaybi|حبايبي"),
    'merry christmas': "3eed meelaad majeed|عيد ميلاد مجيد", 'your highness': "9aa7ib is-sumuww|صاحب السمو", 'your majesty': "jalaalatak|جلالتك", 'your honor': "7a9'rat il-gaa9'i|حضرة القاضي",
    'your honour': "7a9'rat il-gaa9'i|حضرة القاضي", 'your excellency': "ma3aaleek|معاليك", 'real estate': "3agaaraat|عقارات", 'boarding pass': "boarding pass|بوردنق باس",
    'take into consideration': "5idh bi3tibaarak|خذ باعتبارك", 'take into account': "5idh bi3tibaarak|خذ باعتبارك", 'i have a hunch': "3indi i7saas|عندي إحساس", 'far better': "a7san b-wayed|أحسن بوايد",
    'far more': "akthar b-wayed|أكثر بوايد", 'far worse': "ashyan b-wayed|أشين بوايد", 'even better': "a7san ba3ad|أحسن بعد", 'even more': "akthar ba3ad|أكثر بعد", 'even worse': "ashyan ba3ad|أشين بعد",
    'even less': "agal ba3ad|أقل بعد", 'aside from': "3'air|غير", 'beyond that': "akthar min chidhi|أكثر من چذي", 'come along': A3("ta3aal wiyyaay|تعال وياي", "ta3aali wiyyaay|تعالي وياي", "ta3aaloo wiyyaay|تعالوا وياي"),
    'the slightest': "adna|أدنى", 'not the slightest idea': "wala adna fikra|ولا أدنى فكرة", 'my dearest': "3azeezi|عزيزي", 'in the meanwhile': "fi nafs il-wagt|في نفس الوقت",
    'the least you can do': "agal shay tigdar tsaweeh|أقل شي تقدر تسويه", 'at the very least': "3ala il-agal|على الأقل", 'to say the least': "3ala il-agal|على الأقل", 'last but not least': "wa5eeran wmob aa5iran|وأخيراً ومب آخراً",
    'in the long run': "3ala il-madaa il-ba3eed|على المدى البعيد", 'in the short term': "3ala il-madaa il-greeb|على المدى القريب", 'on the other hand': "min naa7ya thaanya|من ناحية ثانية", 'on one hand': "min naa7ya|من ناحية",
    'in other words': "ya3ni|يعني", 'that is to say': "ya3ni|يعني", 'as a matter of fact': "bil-7ageega|بالحقيقة", 'as far as i know': "3ala 7asab 3ilmi|على حسب علمي", 'as far as i can tell': "3ala 7asab ma ashoof|على حسب ما أشوف",
    'as far as i am concerned': "bin-nisba li|بالنسبة لي", 'for what it is worth': "3ala kil 7aal|على كل حال", 'at the end of the day': "fil-a5eer|في الأخير", 'when it comes to': "lamma yiyi il-kalaam 3an|لما ييي الكلام عن",
    'in terms of': "min naa7yat|من ناحية", 'with respect to': "b5u9oo9|بخصوص", 'in light of': "3ala 9'aw|على ضو", 'in the event of': "fi 7aalat|في حالة", 'in case of': "fi 7aalat|في حالة",
    'by the time': "lain|لين", 'in no time': "b-sur3a|بسرعة", 'from time to time': "min wagt lil-thaani|من وقت للثاني", 'all of a sudden': "fajaa2tan|فجأة", 'out of the blue': "fajaa2tan|فجأة",
    'out of nowhere': "min wain ma adri|من وين ما أدري", 'in the middle of nowhere': "fi makaan ma feeh a7ad|في مكان ما فيه أحد", 'once and for all': "marra wa7da wlil-abad|مرة وحدة وللأبد", 'sooner than expected': "asra3 min il-mutawagga3|أسرع من المتوقع",
    'better late than never': "an tiyi mit2a55ir a7san min inn ma tiyi|أن تيي متأخر أحسن من إن ما تيي", 'easier said than done': "il-kalaam as-hal min il-fi3l|الكلام أسهل من الفعل", 'it is what it is': "hadha illi feeh|هذا اللي فيه",
    'whatever it takes': "mahma kallaf il-amr|مهما كلف الأمر", 'no matter what': "mahma 9aar|مهما صار", 'no matter how': "mahma|مهما", 'no matter where': "wain ma|وين ما", 'no matter when': "mita ma|متى ما", 'no matter who': "min ma|من ما",
    'against all odds': "ra3'm kil shay|رغم كل شي", 'at any cost': "mahma kallaf|مهما كلف", 'at all costs': "mahma kallaf|مهما كلف", 'under no circumstances': "wala b-ay 7aal|ولا بأي حال", 'by all means': "akeed|أكيد",
    'by no means': "abadan|أبداً", 'in no way': "abadan|أبداً", 'needless to say': "ma yi7taaj agool|ما يحتاج أقول", 'it goes without saying': "ma yi7taaj kalaam|ما يحتاج كلام", 'to be honest with you': "ba9aara7a|بصراحة",
    'if i were you': "law ana mkaanak|لو أنا مكانك", 'if i was you': "law ana mkaanak|لو أنا مكانك", 'in my shoes': "fi makaani|في مكاني", 'in your shoes': "fi makaanak|في مكانك", 'put yourself in my shoes': A3("7u66 nafsak mkaani|حط نفسك مكاني", "7u66i nafsich mkaani|حطي نفسج مكاني", "7u66oo nafskum mkaani|حطوا نفسكم مكاني"),
  };
  Object.assign(X5_FIXED, { 'each of them': "kil wa7id minhum|كل واحد منهم", 'each of us': "kil wa7id minna|كل واحد منا", 'each of you': "kil wa7id minkum|كل واحد منكم", 'both of them': "ithnainhum|اثنينهم", 'both of us': "ithnainna|اثنيننا", 'both of you': "ithnainkum|اثنينكم",
    'one of them': "wa7id minhum|واحد منهم", 'one of us': "wa7id minna|واحد منا", 'one of you': "wa7id minkum|واحد منكم", 'some of them': "ba39'hum|بعضهم", 'some of us': "ba39'na|بعضنا", 'some of you': "ba39'kum|بعضكم",
    'all of them': "kilhum|كلهم", 'all of us': "kilna|كلنا", 'all of you': "kilkum|كلكم", 'none of us': "wala wa7id minna|ولا واحد منا", 'none of you': "wala wa7id minkum|ولا واحد منكم", 'most of them': "a3'labhum|أغلبهم",
    'most of us': "a3'labna|أغلبنا", 'most of you': "a3'labkum|أغلبكم", 'the two of us': "i7na il-ithnain|إحنا الاثنين", 'the three of us': "i7na ith-thalaatha|إحنا الثلاثة", 'the two of them': "hum il-ithnain|هم الاثنين", 'the two of you': "intum il-ithnain|انتم الاثنين",
    'a lot of them': "wayed minhum|وايد منهم", 'a lot of us': "wayed minna|وايد منا", 'a lot of you': "wayed minkum|وايد منكم", 'many of them': "wayed minhum|وايد منهم", 'many of us': "wayed minna|وايد منا", 'few of them': "shway minhum|شوي منهم",
    'half of them': "nu9hum|نصهم", 'half of us': "nu9na|نصنا", 'half of it': "nu9ah|نصه", 'all of it': "killah|كله", 'some of it': "shway minnah|شوي منه", 'most of it': "a3'labah|أغلبه", 'none of it': "wala shay minnah|ولا شي منه", 'part of it': "juz2 minnah|جزء منه",
    'the rest of it': "baageeh|باقيه", 'the rest of them': "baageehum|باقيهم", 'the rest of us': "baageena|باقينا", 'the rest of you': "baageekum|باقيكم", 'the rest': "il-baagi|الباقي", 'i said so': "gilt chidhi|قلت چذي", 'because i said so': "3ashaan gilt chidhi|عشان قلت چذي",
    'i told you so': "gilt lak|قلت لك", 'the king of kings': "malik il-mulook|ملك الملوك" });
  Object.assign(X5_NOUNS, { screenshot: "screenshot screenshotaat m|سكرين_شوت سكرين_شوتات", heal: "heal healaat m|هيل هيلات", nerf: "nerf nerfaat m|نيرف نيرفات", buff: "buff buffaat m|بف بفات", troll: "troll trolls mh|ترول ترولز",
    restart: "restart restart m|ريستارت ريستارت", reset: "reset reset m|ريست ريست", refresh: "refresh refresh m|ريفرش ريفرش", block: "block blockaat m|بلوك بلوكات", spam: "spam spam m|سبام سبام", teleport: "teleport teleport m|تيليبورت تيليبورت",
    glitch: "glitch glitchaat m|قلتش قلتشات", mute: "mute mute m|ميوت ميوت", tag: "tag tagaat m|تاق تاقات", scroll: "scroll scrollaat m|سكرول سكرولات", zoom: "zoom zoom m|زوم زوم", scan: "scan scanaat m|سكان سكانات",
    filter: "filter filteraat m|فلتر فلترات", format: "format format m|فورمات فورمات", prank: "mgalb mgaalib m|مقلب مقالب", bluff: "bluff bluff m|بلف بلف", flex: "flex flex m|فلكس فلكس", patrol: "dawriyya dawriyyaat f|دورية دوريات", skip: "skip skip m|سكب سكب" });
  Object.assign(X5_VERBS, { tend: ["i3tanait i3tana 3tini i3tini|اعتنيت اعتنى اعتني اعتن", { lv: 'i', obj: 'b', objNP: 'b' }] });
  Object.assign(X5_ADJS, { dearest: "^a3azz|أعز", operating: "shaghghaal shaghghaala shaghghaaleen|شغال شغالة شغالين", 'turned off': "6aafi 6aafya 6aafyeen|طافي طافية طافيين", existing: "mawjood mawjooda mawjoodeen|موجود موجودة موجودين" });
  Object.assign(MULTI, { 'the rest of': { t: 'fixed', az: 'baagi', ar: 'باقي', key: 'the rest of' }, 'the number of': { t: 'fixed', az: '3adad', ar: 'عدد', key: 'the number of' }, 'the top of': { t: 'prep', key: 'a3la', eng: 'x' }, 'the amount of': { t: 'fixed', az: 'kammiyyat', ar: 'كمية', key: 'the amount of' } });
  Object.assign(PREP_AR, { a3la: 'أعلى' });
  const X5_NOUN_ALIAS = { folk: 'folks', buddy_: 'bud', relations: 'relation', vows: 'vow', jaws: 'jaw', owls: 'owl', rugs: 'rug', barriers: 'barrier', trays: 'tray', stains: 'stain', violations: 'violation',
    shades: 'shade', rivals: 'rival', residents: 'resident', donors: 'donor', buyers: 'buyer', prophets: 'prophet', orphans: 'orphan', addicts: 'addict', musicians: 'musician', specialists: 'specialist',
    feathers_: 'feather', olives: 'olive', dots: 'dot', gaps: 'gap', topics: 'topic', sketches: 'sketch', posters: 'poster', cigars: 'cigar', mugs: 'mug', fountains: 'fountain', jeeps: 'jeep',
    volcanoes: 'volcano', volcanos: 'volcano', yachts: 'yacht', ambushes: 'ambush', examinations: 'examination', nicknames: 'nickname', scenarios: 'scenario', calendars: 'calendar', balconies: 'balcony',
    melodies: 'melody', swamps: 'swamp', torches: 'torch', stalls: 'stall', panels: 'panel', sequences: 'sequence', umbrellas: 'umbrella', earthquakes: 'earthquake', echoes: 'echo', manuals: 'manual',
    pennies: 'penny', pence: 'penny', saints: 'saint', priests: 'priest', mayors: 'mayor', sheriffs: 'sheriff', jerks: 'jerk', freaks: 'freak', estates: 'estate', reservations: 'reservation',
    hundreds: 'hundred', thousands: 'thousand', millions: 'million', billion: 'million_', hunches: 'hunch', herds: 'herd', wigs: 'wig', gowns: 'gown', swans: 'swan', bolts: 'bolt', doses: 'dose',
    autographs: 'autograph', pumpkins: 'pumpkin', anchors: 'anchor', urges: 'urge', razors: 'razor', mutants: 'mutant', racks: 'rack', pigeons: 'pigeon', violins: 'violin', lifestyles: 'lifestyle',
    realms: 'realm', dimensions: 'dimension', bodyguards: 'bodyguard', documentaries: 'documentary', shipments: 'shipment', vests: 'vest', mechanics: 'mechanic', fares: 'fare', saddles: 'saddle',
    breakdowns: 'breakdown', ambitions: 'ambition', duels: 'duel', carnivals: 'carnival', syndromes: 'syndrome', canes: 'cane', orchestras: 'orchestra', cottages: 'cottage', backyards: 'backyard',
    landlords: 'landlord', laboratories: 'laboratory', labs: 'laboratory', lab: 'laboratory', rogues: 'rogue', assassins: 'assassin', rigs: 'rig', depths: 'depth', legacies: 'legacy', tumors: 'tumor', tumours: 'tumour' };
  Object.assign(ADJ_PREP, { committed: { to: 'li' }, suitable: { for: 'li' }, relevant: { to: 'b' }, identical: { to: 'li' }, hostile: { to: 'li' }, frustrated: { with: 'min' }, humiliated: { by: 'min' }, final: {} });
  Object.assign(ADJ_ALIAS, { drunken_: 'drunk', bizarre_: 'strange', fierce_: 'vicious', hollow_: 'empty', lethal_: 'fatal', efficient_: 'effective', modest_: 'humble', amusing_: 'funny', marvelous_: 'amazing', marvellous_: 'amazing' });
  Object.assign(PREP, { along: '3ala_6ool', except: 'illa', across: '3abr', within: '5ilaal', beyond: 'wara', versus: "9'idd", minus: 'naagi9', plus: 'zaayid', besides: "3'air", excluding: "3'air", including: 'bma_feeh', regarding: 'b5u9oo9', concerning: 'b5u9oo9', unlike: '3aks', amid: 'wasa6', amongst: 'bain', throughout: '6ool', underneath: 'ta7t', beneath: 'ta7t', alongside: 'yamm', opposite: 'mgaabil', inside_: 'daa5il', outside_: 'barra' });
  Object.assign(PREP_AR, { '3ala_6ool': 'على طول', illa: 'إلا', '3abr': 'عبر', '5ilaal': 'خلال', naagi9: 'ناقص', zaayid: 'زايد', "3'air": 'غير', bma_feeh: 'بما فيه', b5u9oo9: 'بخصوص', '3aks': 'عكس', wasa6: 'وسط', '6ool': 'طول', daa5il: 'داخل', barra: 'برا', mgaabil: 'مقابل' });
  Object.assign(CONJ, { nor: ['wala', 'ولا'], lest: ['la', 'لا'], provided: ['bshar6', 'بشرط'], supposing: ['law', 'لو'], till_: ['lain', 'لين'] });
  Object.assign(MULTI, { 'a bunch of': { t: 'quant', q: 'wayed' }, 'bunch of': { t: 'quant', q: 'wayed' }, 'a handful of': { t: 'quant', q: 'kam' }, 'a couple of': { t: 'quant', q: 'kam' }, 'couple of': { t: 'quant', q: 'kam' },
    'a number of': { t: 'quant', q: 'kam' }, 'a ton of': { t: 'quant', q: 'wayed' }, 'tons of': { t: 'quant', q: 'wayed' }, 'loads of': { t: 'quant', q: 'wayed' }, 'a load of': { t: 'quant', q: 'wayed' }, 'a great deal of': { t: 'quant', q: 'wayed' },
    'in spite of': { t: 'prep', key: "ra3'm", eng: 'in spite of' }, 'regardless of': { t: 'prep', key: "ra3'm", eng: 'regardless of' }, 'on behalf of': { t: 'prep', key: 'niyaabatan_3an', eng: 'on behalf of' },
    'according to': { t: 'prep', key: '7asab', eng: 'according to' }, 'on top of': { t: 'prep', key: 'foog', eng: 'on top of' }, 'in the middle of': { t: 'prep', key: 'fi_nu9', eng: 'in the middle of' },
    'ahead of': { t: 'prep', key: 'gabil', eng: 'ahead of' }, 'along with': { t: 'prep', key: 'wiyya', eng: 'along with' }, 'as for': { t: 'prep', key: 'bin-nisba_li', eng: 'as for' }, 'thanks to': { t: 'prep', key: "bfa9'l", eng: 'thanks to' },
    'in favor of': { t: 'prep', key: 'ma3', eng: 'in favor of' }, 'in favour of': { t: 'prep', key: 'ma3', eng: 'in favour of' }, 'in charge of': { t: 'prep', key: 'mas2ool_3an', eng: 'in charge of' }, 'in search of': { t: 'prep', key: 'ydawwir_3ala', eng: 'in search of' },
    'on account of': { t: 'prep', key: '3ashaan', eng: 'on account of' }, 'by means of': { t: 'prep', key: '3an_6areeg', eng: 'by means of' }, 'prior to': { t: 'prep', key: 'gabil', eng: 'prior to' }, 'due to': { t: 'prep', key: 'bsabab', eng: 'due to' },
    'owing to': { t: 'prep', key: 'bsabab', eng: 'owing to' }, 'apart from': { t: 'prep', key: "3'air", eng: 'apart from' }, 'other than': { t: 'prep', key: "3'air", eng: 'other than' }, 'except for': { t: 'prep', key: 'illa', eng: 'except for' },
    'as well as': { t: 'conj', az: 'wba3ad', ar: 'وبعد' }, 'as long as': { t: 'conj', az: '6ool ma', ar: 'طول ما' }, 'as soon as': { t: 'conj', az: 'awwal ma', ar: 'أول ما' }, 'even if': { t: 'conj', az: '7atta law', ar: 'حتى لو' },
    'even though': { t: 'conj', az: 'ma3a inn', ar: 'مع إن' }, 'in case': { t: 'conj', az: 'fi 7aal', ar: 'في حال' }, 'so that': { t: 'conj', az: '3ashaan', ar: 'عشان' }, 'in order to': { t: 'conj', az: '3ashaan', ar: 'عشان' },
    'as if': { t: 'conj', az: 'ka2inn', ar: 'كأن' }, 'as though': { t: 'conj', az: 'ka2inn', ar: 'كأن' }, 'now that': { t: 'conj', az: 'il7een w', ar: 'الحين و' }, 'the moment': { t: 'conj', az: 'awwal ma', ar: 'أول ما' } });
  Object.assign(PREP_AR, { niyaabatan_3an: 'نيابةً عن', '7asab': 'حسب', 'bin-nisba_li': 'بالنسبة ل', "bfa9'l": 'بفضل', ma3: 'مع', mas2ool_3an: 'مسؤول عن', ydawwir_3ala: 'يدور على', bsabab: 'بسبب', "ra3'm": 'رغم' });
  for (const [k, v] of Object.entries(X5_NOUNS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_RAW) && !(kk + '_' in NOUN_RAW)) NOUN_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X5_ADJS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADJ_RAW) && !(kk + '_' in ADJ_RAW)) ADJ_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X5_VERBS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in VERB_RAW) && !(kk + '_' in VERB_RAW)) VERB_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X5_ADVS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADV_RAW) && !(kk + '_' in ADV_RAW)) ADV_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X5_FIXED)) { const kk = k.trim(); if (!(kk in FIXED_RAW)) FIXED_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X5_NOUN_ALIAS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_ALIAS)) NOUN_ALIAS[kk] = v; }
  for (const k of Object.keys(X5_ADJS)) if (k.includes(' ') && !(k in MULTI)) MULTI[k] = { t: 'adj', key: k };
  const X6_NOUNS = {
    odds: "i7timaalaat i7timaalaat f|احتمالات احتمالات", breach: "5arg 5uroogaat m|خرق خروقات", compound: "mujamma3 mujamma3aat m|مجمع مجمعات", morgue: "mashra7a mashaari7 f|مشرحة مشارح",
    transmission: "irsaal irsaal m|إرسال إرسال", smack: "kaff kfoof m|كف كفوف", settlement: "taswiya taswiyaat f|تسوية تسويات", circuit: "daa2ira dawaa2ir f|دائرة دوائر",
    choir: "kooraal kooraalaat m|كورال كورالات", courtesy: "lu6f lu6f m|لطف لطف", hatch: "fat7a fat7aat f|فتحة فتحات", quid: "jinaih jinaihaat m|جنيه جنيهات",
    pastor: "gissees gusus mh|قسيس قسس", rupee: "roobiyya roobiyyaat f|روبية روبيات", evolution: "ta6awwur ta6awwur m|تطور تطور", bartender: "baarman baarmanaat mh|بارمان بارمانات",
    shuttle: "baa9 baa9aat m|باص باصات", perimeter: "mu7ee6 mu7ee6aat m|محيط محيطات", representative: "mumaththil mumaththileen mh|ممثل ممثلين", scoundrel: "nadhl andhaal mh|نذل أنذال",
    pad: "daftar dafaatir m|دفتر دفاتر", cue: "ishaara ishaaraat f|إشارة إشارات", pursuit: "mu6aarada mu6aaradaat f|مطاردة مطاردات", dash: "sharr6a sharr6aat f|شرطة شرطات",
    senate: "majlis_ish-shuyoo5 majlis_ish-shuyoo5 m|مجلس_الشيوخ مجلس_الشيوخ", abortion: "ijhaa9' ijhaa9' m|إجهاض إجهاض", sting: "las3a las3aat f|لسعة لسعات", expedition: "ri7la_istikshaafiyya ri7laat_istikshaafiyya f|رحلة_استكشافية رحلات_استكشافية",
    plea: "tawassul tawassulaat m|توسل توسلات", maker: "9aani3 9unnaa3 mh|صانع صناع", marsh: "mustanga3 mustanga3aat m|مستنقع مستنقعات", peg: "watad awtaad m|وتد أوتاد",
    rum: "ram ram m|رم رم", salvation: "5alaa9 5alaa9 m|خلاص خلاص", globe: "kura_ar9'iyya kuraat_ar9'iyya f|كرة_أرضية كرات_أرضية", precinct: "mar-kaz_shur6a maraakiz_shur6a m|مركز_شرطة مراكز_شرطة",
    orphanage: "daar_aytaam door_aytaam f|دار_أيتام دور_أيتام", gypsy: "3'ajari 3'ajar mh|غجري غجر", maiden: "3adhra 3adhaara fh|عذرا عذارى", congressman: "naa2ib nuwwaab mh|نائب نواب",
    cardinal: "kaardinaal kaardinaalaat mh|كاردينال كاردينالات", enforcement: "tanfeedh tanfeedh m|تنفيذ تنفيذ", marijuana: "7asheesh 7asheesh m|حشيش حشيش", chorus: "koorus koorus m|كورس كورس",
    disposal: "ta9arruf ta9arruf m|تصرف تصرف", particle: "juzay2 juzay2aat m|جزيء جزيئات", pod: "kabsoola kabsoolaat f|كبسولة كبسولات", phantom: "shaba7 ashbaa7 m|شبح أشباح",
    outcome: "nateeja nataayij f|نتيجة نتايج", extent: "7add 7udood m|حد حدود", stack: "koom akwaam m|كوم أكوام", wheat: "gam7 gam7 m|قمح قمح",
    departure: "mu3'aadara mu3'aadaraat f|مغادرة مغادرات", kin: "ahal ahal mh|أهل أهل", surf: "rukoob_amwaaj rukoob_amwaaj m|ركوب_أمواج ركوب_أمواج", kilometer: "keelo keelowaat m|كيلو كيلوات",
    kilometre: "keelo keelowaat m|كيلو كيلوات", spaghetti: "spageeti spageeti m|سباقيتي سباقيتي", chili: "filfil_7aarr filfil_7aarr m|فلفل_حار فلفل_حار", hay: "gashsh gashsh m|قش قش",
    sniper: "gannaa9 gannaa9a mh|قناص قناصة", horizon: "ufug aafaag m|أفق آفاق", twilight: "3'asag 3'asag m|غسق غسق", reflection: "in3ikaas in3ikaasaat m|انعكاس انعكاسات",
    wage: "ajr ujoor m|أجر أجور", waist: "5a9r 5u9oor m|خصر خصور", disappointment: "5aibat_amal 5aibaat_amal f|خيبة_أمل خيبات_أمل", voyage: "ri7la ri7laat f|رحلة رحلات",
    sunlight: "9'aw_ish-shams 9'aw_ish-shams m|ضو_الشمس ضو_الشمس", casualty: "i9aaba i9aabaat f|إصابة إصابات", mattress: "farsha farshaat f|فرشة فرشات", marketing: "tasweeg tasweeg m|تسويق تسويق",
    occupation: "i7tilaal i7tilaal m|احتلال احتلال", exhibit: "ma3roo9' ma3roo9'aat m|معروض معروضات", urine: "bool bool m|بول بول", ingredient: "mukawwin mukawwinaat m|مكون مكونات",
    hurricane: "i39aar a3aa9eer m|إعصار أعاصير", limo: "leemoozeen leemoozeenaat f|ليموزين ليموزينات", spa: "spa spa m|سبا سبا", grocery: "bagaala bagaalaat f|بقالة بقالات",
    terminal: "9aala 9aalaat f|صالة صالات", exhibition: "ma3ra9' ma3aari9' m|معرض معارض", disappearance: "i5tifaa i5tifaa m|اختفا اختفا", pier: "ra9eef ar9ifa m|رصيف أرصفة",
    betrayal: "5iyaana 5iyaanaat f|خيانة خيانات", psychology: "3ilm_in-nafs 3ilm_in-nafs m|علم_النفس علم_النفس", keeper: "7aaris 7urraas mh|حارس حراس", collector: "jaami3 jaami3een mh|جامع جامعين",
    grudge: "7igd a7gaad m|حقد أحقاد", lid: "3'a6a 3'a6ayaat m|غطا غطايات", follower: "mutaabi3 mutaabi3een mh|متابع متابعين", submarine: "3'awwaa9a 3'awwaa9aat f|غواصة غواصات",
    joker: "jokar jokaraat m|جوكر جوكرات", opposition: "mu3aara9'a mu3aara9'a f|معارضة معارضة", hose: "lay layaat m|لي ليات", partnership: "sharaaka sharaakaat f|شراكة شراكات",
    astronaut: "raa2id_fa9'aa ruwwaad_fa9'aa mh|رائد_فضا رواد_فضا", porch: "balkoona balkoonaat f|بلكونة بلكونات", garlic: "thoom thoom m|ثوم ثوم", ammunition: "dha5eera dha5aayir f|ذخيرة ذخاير",
    ammo: "dha5eera dha5aayir f|ذخيرة ذخاير", sushi: "sooshi sooshi m|سوشي سوشي", setup: "setup setup m|ستب ستب", handwriting: "5a66 5u6oo6 m|خط خطوط",
    virtue: "fa9'eela fa9'aayil f|فضيلة فضايل", lawsuit: "da3wa da3aawi f|دعوى دعاوي", mustache: "shaarib shawaarib m|شارب شوارب", moustache: "shaarib shawaarib m|شارب شوارب",
    sultan: "sul6aan salaa6een mh|سلطان سلاطين", workshop: "warsha warash f|ورشة ورش", nerd: "nerd nerds mh|نيرد نيردز", crook: "na99aab na99aabeen mh|نصاب نصابين",
    battlefield: "saa7at_ma3raka saa7aat_ma3raka f|ساحة_معركة ساحات_معركة", stash: "ma5zoon ma5zoonaat m|مخزون مخزونات", foreigner: "ajnabi ajaanib mh|أجنبي أجانب", mint: "ni3naa3 ni3naa3 m|نعناع نعناع",
    inheritance: "wiraatha wiraatha f|وراثة وراثة", recognition: "i3tiraaf i3tiraaf m|اعتراف اعتراف", ferry: "3abbaara 3abbaaraat f|عبارة عبارات", portal: "portal portalaat m|بورتال بورتالات",
    sensation: "i7saas a7aasees m|إحساس أحاسيس", delight: "bahja bahja f|بهجة بهجة", boundary: "7add 7udood m|حد حدود", caution: "7adhar 7adhar m|حذر حذر",
    obligation: "iltizaam iltizaamaat m|التزام التزامات", sleeve: "kumm akmaam m|كم أكمام", confirmation: "ta2keed ta2keedaat m|تأكيد تأكيدات", mushroom: "fu6r fu6r m|فطر فطر",
    millionaire: "milyooneer milyooneeriyya mh|مليونير مليونيرية", adoption: "tabanni tabanni m|تبني تبني", comet: "mudhannab mudhannabaat m|مذنب مذنبات", warmth: "difa difa m|دفا دفا",
    doom: "halaak halaak m|هلاك هلاك", aisle: "mamarr mamarraat m|ممر ممرات", edition: "i9daar i9daaraat m|إصدار إصدارات", beggar: "shi77aat shi77aata mh|شحات شحاتة",
    raven: "3'uraab 3'irbaan m|غراب غربان", spaceship: "safeenat_fa9'aa sufun_fa9'aa f|سفينة_فضا سفن_فضا", ant: "namla namil f|نملة نمل", tequila: "tekeela tekeela f|تكيلا تكيلا",
    inquiry: "istifsaar istifsaaraat m|استفسار استفسارات", antique: "ti7fa tu7af f|تحفة تحف", employment: "taw6'eef taw6'eef m|توظيف توظيف", mule: "ba3'al bi3'aal m|بغل بغال",
    local: "ma7alli ma7alliyyeen mh|محلي محليين", bunker: "mal-ja malaaji m|ملجأ ملاجئ", phenomenon: "6'aahira 6'awaahir f|ظاهرة ظواهر", ape: "gird grooda m|قرد قرود",
    bruise: "kadma kadmaat f|كدمة كدمات", hometown: "balad balad m|بلد بلد", earring: "7alag 7ilgaan m|حلق حلقان", rookie: "mubtadi mubtadi2een mh|مبتدئ مبتدئين",
    runner: "3addaa 3addaa2een mh|عداء عدائين", sponsor: "raa3i ru3aat mh|راعي رعاة", karate: "karaateh karaateh m|كاراتيه كاراتيه", grease: "sha7m shu7oom m|شحم شحوم",
    dinosaur: "daynaa9oor daynaa9ooraat m|دايناصور دايناصورات", rebellion: "tamarrud tamarrudaat m|تمرد تمردات", barber: "7allaag 7allaageen mh|حلاق حلاقين",
    sabotage: "ta5reeb ta5reeb m|تخريب تخريب", squirrel: "sinjaab sanaajeeb m|سنجاب سناجيب", werewolf: "mustadh2ib mustadh2ibeen mh|مستذئب مستذئبين", savior: "mu5alli9 mu5alli9een mh|مخلص مخلصين",
    saviour: "mu5alli9 mu5alli9een mh|مخلص مخلصين", perfection: "kamaal kamaal m|كمال كمال", mentor: "murshid murshideen mh|مرشد مرشدين", enthusiasm: "7amaas 7amaas m|حماس حماس",
    audio: "9oot 9oot m|صوت صوت", initiative: "mubaadara mubaadaraat f|مبادرة مبادرات", parrot: "babba3'aa babba3'aawaat m|ببغا ببغاوات", piggy: "5anzoor 5anaazeer m|خنزور خنازير",
    funding: "tamweel tamweel m|تمويل تمويل", acquaintance: "ma3rifa ma3aarif mh|معرفة معارف", bedtime: "wagt_in-noom wagt_in-noom m|وقت_النوم وقت_النوم", rail: "sikka sikak f|سكة سكك",
    rooster: "deech dyooch m|ديچ ديوچ", banker: "ma9rafi ma9rafiyyeen mh|مصرفي مصرفيين", bacteria: "bakteerya bakteerya f|بكتيريا بكتيريا", cupboard: "kabat kabataat m|كبت كبتات",
    sanctuary: "malaadh malaadhaat m|ملاذ ملاذات", temptation: "i3'raa i3'raa2aat m|إغرا إغراءات", vibe: "vibe vibes m|فايب فايبز", scrap: "5urda 5urda f|خردة خردة",
    lizard: "sa7liyya sa7aali f|سحلية سحالي", separation: "infi9aal infi9aal m|انفصال انفصال", intern: "mutadarrib mutadarribeen mh|متدرب متدربين", tab: "tab tabaat m|تاب تابات",
    junkie: "mudmin mudmineen mh|مدمن مدمنين", carrier: "naagil naagileen mh|ناقل ناقلين", thirst: "3a6ash 3a6ash m|عطش عطش", pickup: "pickup pickupaat m|بيك_أب بيك_أبات",
    spice: "bhaar bhaaraat m|بهار بهارات", caller: "muttasil muttasileen mh|متصل متصلين", knot: "3ugda 3ugad f|عقدة عقد", massacre: "majzara majaazir f|مجزرة مجازر",
    herb: "3ushba a3shaab f|عشبة أعشاب", grenade: "gumbula_yadawiyya ganaabil_yadawiyya f|قنبلة_يدوية قنابل_يدوية", kilo: "keelo keelowaat m|كيلو كيلوات", nursery: "7a9'aana 7a9'aanaat f|حضانة حضانات",
    protein: "brooteen brooteenaat m|بروتين بروتينات", elbow: "koo3 kee3aan m|كوع كيعان", mustard: "mastarda mastarda f|مسطردة مسطردة", terrace: "6arrma 6arrmaat f|طرمة طرمات",
    transportation: "muwaa9alaat muwaa9alaat f|مواصلات مواصلات", lens: "3adasa 3adasaat f|عدسة عدسات", interference: "tadha55ul tadha55ulaat m|تدخل تدخلات", mourning: "7idaad 7idaad m|حداد حداد",
    trainer: "mudarrib mudarribeen mh|مدرب مدربين", janitor: "farraash farraasheen mh|فراش فراشين", jackass: "7maar 7ameer mh|حمار حمير", reminder: "tadhkeer tadhkeeraat m|تذكير تذكيرات",
    culprit: "il-faa3il il-faa3ileen mh|الفاعل الفاعلين", jasmine: "yaasmeen yaasmeen m|ياسمين ياسمين", womb: "ra7im ar7aam m|رحم أرحام", injustice: "6'ulm 6'ulm m|ظلم ظلم",
    fracture: "kasr kusoor m|كسر كسور", insanity: "jinoon jinoon m|جنون جنون", peasant: "fallaa7 fallaa7een mh|فلاح فلاحين", blossom: "zahra zuhoor f|زهرة زهور",
    agony: "3adhaab 3adhaab m|عذاب عذاب", shack: "kookh akwaa5 m|كوخ أكواخ", mold: "3afan 3afan m|عفن عفن", antidote: "tiryaag tiryaagaat m|ترياق ترياقات",
    bunk: "sareer saraayir m|سرير سراير", graveyard: "magbara magaabir f|مقبرة مقابر", aspect: "jaanib jawaanib m|جانب جوانب", lemonade: "laimoon laimoon m|ليمون ليمون",
    flour: "6i7een 6i7een m|طحين طحين", felony: "jinaaya jinaayaat f|جناية جنايات", substitute: "badeel badaayil m|بديل بدايل", splash: "rashsha rashshaat f|رشة رشات",
    exile: "manfa manaafi m|منفى منافي", aspirin: "asbireen asbireen m|أسبرين أسبرين", drone: "drone drones m|درون درونز", province: "muqaa6a3a muqaa6a3aat f|مقاطعة مقاطعات",
    triangle: "muthallath muthallathaat m|مثلث مثلثات", strawberry: "farawla farawla f|فراولة فراولة", token: "token tokens m|توكن توكنز", diagnosis: "tash5ee9 tash5ee9aat m|تشخيص تشخيصات",
    extension: "tamdeed tamdeedaat m|تمديد تمديدات", scoop: "5abar_7a9ri a5baar_7a9riyya m|خبر_حصري أخبار_حصرية", hospitality: "9'iyaafa 9'iyaafa f|ضيافة ضيافة", survey: "istibyaan istibyaanaat m|استبيان استبيانات",
    recommendation: "taw9iya taw9iyaat f|توصية توصيات", skeleton: "haikal_3a6'mi hayaakil_3a6'miyya m|هيكل_عظمي هياكل_عظمية", toll: "rasm rusoom m|رسم رسوم", spear: "rum7 rimaa7 m|رمح رماح",
    petition: "3aree9'a 3araayi9' f|عريضة عرايض", baggage: "shuna6 shuna6 f|شنط شنط", scumbag: "7ageer 7ugara mh|حقير حقرا", tribute: "takreem takreemaat m|تكريم تكريمات",
    claw: "mi5lab ma5aalib m|مخلب مخالب", donation: "tabarru3 tabarru3aat m|تبرع تبرعات", boxer: "mulaakim mulaakimeen mh|ملاكم ملاكمين", misfortune: "soo2_7a6' soo2_7a6' m|سوء_حظ سوء_حظ",
    involvement: "tawarru6 tawarru6 m|تورط تورط", wilderness: "barriyya barriyya f|برية برية", dome: "gubba gibaab f|قبة قباب", tactic: "taktik taktikaat m|تكتيك تكتيكات",
    grandparent: "jadd ajdaad mh|جد أجداد", biscuit: "baskoot baskoot m|بسكوت بسكوت", gorilla: "3'oreella 3'oreellaat f|غوريلا غوريلات", dynasty: "salaala salaalaat f|سلالة سلالات",
    gardener: "bustaani bustaaniyya mh|بستاني بستانية", barracks: "thakana thakanaat f|ثكنة ثكنات", establishment: "mu2assasa mu2assasaat f|مؤسسة مؤسسات", lump: "kutla kutal f|كتلة كتل",
    dwarf: "gazam agzaam mh|قزم أقزام", pint: "kaas kaasaat m|كاس كاسات", gaze: "na6'ra na6'raat f|نظرة نظرات", nuisance: "iz3aaj iz3aaj m|إزعاج إزعاج",
    grandchild: "7afeed a7faad mh|حفيد أحفاد", rental: "eejaar eejaaraat m|إيجار إيجارات", vegetarian: "nabaati nabaatiyyeen mh|نباتي نباتيين", timer: "mu2aggit mu2aggitaat m|مؤقت مؤقتات",
    athlete: "riyaa9'i riyaa9'iyyeen mh|رياضي رياضيين", slavery: "3uboodiyya 3uboodiyya f|عبودية عبودية", grove: "bustaan basaateen m|بستان بساتين", coverage: "ta3'6iya ta3'6iya f|تغطية تغطية",
    hen: "dijaaja dijaaj f|دجاجة دجاج", pyramid: "haram ahraam m|هرم أهرام", trumpet: "boog abwaag m|بوق أبواق", debris: "7u6aam 7u6aam m|حطام حطام",
    cement: "ismant ismant m|إسمنت إسمنت", comedian: "koomeedyaan koomeedyaanaat mh|كوميديان كوميديانات", harassment: "ta7arrush ta7arrush m|تحرش تحرش", monitoring: "muraaqaba muraaqaba f|مراقبة مراقبة",
    housekeeper: "5addaama 5addaamaat fh|خدامة خدامات", artillery: "madfa3iyya madfa3iyya f|مدفعية مدفعية", cereal: "kornfleks kornfleks m|كورنفلكس كورنفلكس", portion: "7i99a 7i9a9 f|حصة حصص",
    slit: "shagg shugoog m|شق شقوق", waltz: "faals faals m|فالس فالس", gag: "nukta nukat f|نكتة نكت", telescope: "tiliskoob tiliskoobaat m|تلسكوب تلسكوبات",
    verse: "aaya aayaat f|آية آيات", babysitter: "jaleesat_a6faal jaleesaat_a6faal fh|جليسة_أطفال جليسات_أطفال", wit: "dhakaa dhakaa m|ذكا ذكا", bliss: "sa3aada sa3aada f|سعادة سعادة",
    recorder: "musajjil musajjilaat m|مسجل مسجلات", turf: "man6iga manaa6ig f|منطقة مناطق", psychologist: "a5i9aa2i_nafsi a5i9aa2iyyeen_nafsiyyeen mh|أخصائي_نفسي أخصائيين_نفسيين", jock: "riyaa9'i riyaa9'iyyeen mh|رياضي رياضيين",
    wrath: "3'a9'ab 3'a9'ab m|غضب غضب", jurisdiction: "i5ti9aa9 i5ti9aa9aat m|اختصاص اختصاصات", impulse: "indifaa3 indifaa3aat m|اندفاع اندفاعات", penguin: "ba6reeg ba6aareeg m|بطريق بطاريق",
    nickel: "nikil nikil m|نيكل نيكل", rag: "5irga 5irag f|خرقة خرق", condolence: "ta3ziya ta3aazi f|تعزية تعازي", disrespect: "gillat_i7tiraam gillat_i7tiraam f|قلة_احترام قلة_احترام",
    underworld: "3aalam_il-jareema 3aalam_il-jareema m|عالم_الجريمة عالم_الجريمة", marble: "ru5aam ru5aam m|رخام رخام", masterpiece: "tu7fa tu7af f|تحفة تحف", regime: "ni6'aam an6'ima m|نظام أنظمة",
    contempt: "i7tigaar i7tigaar m|احتقار احتقار", batch: "duf3a duf3aat f|دفعة دفعات", compartment: "magsoora magaa9eer f|مقصورة مقاصير", hustle: "shaghal shaghal m|شغل شغل",
    inmate: "sajeen sujana mh|سجين سجنا", scooter: "skootar skootaraat m|سكوتر سكوترات", viewer: "mushaahid mushaahideen mh|مشاهد مشاهدين", taco: "taako taako m|تاكو تاكو",
    brigade: "liwa alwiya m|لوا ألوية", lookout: "muraaqib muraaqibeen mh|مراقب مراقبين", merchandise: "bi9'aa3a ba9'aayi3 f|بضاعة بضايع", duchess: "dooqa dooqaat fh|دوقة دوقات",
    flock: "ga6ee3 gu63aan m|قطيع قطعان", glimpse: "lam7a lam7aat f|لمحة لمحات", compensation: "ta3wee9' ta3wee9'aat m|تعويض تعويضات", currency: "3umla 3umlaat f|عملة عملات",
    medic: "mus3if mus3ifeen mh|مسعف مسعفين", sewer: "majaari majaari f|مجاري مجاري", hull: "haikal hayaakil m|هيكل هياكل", toad: "9'ifda3 9'afaadi3 m|ضفدع ضفادع",
    moose: "moos moos m|موس موس", souvenir: "tidhkaar tidhkaaraat m|تذكار تذكارات", compass: "boo9la boo9laat f|بوصلة بوصلات", mercury: "zi2bag zi2bag m|زئبق زئبق",
    brace: "daa3im dawaa3im m|داعم دواعم", thrust: "daf3a daf3aat f|دفعة دفعات", achievement: "injaaz injaazaat m|إنجاز إنجازات", monastery: "dair adyira m|دير أديرة",
    recruit: "mujannad mujannadeen mh|مجند مجندين", creator: "mubdi3 mubdi3een mh|مبدع مبدعين", artery: "shiryaan sharaayeen m|شريان شرايين", distribution: "tawzee3 tawzee3 m|توزيع توزيع",
    stereo: "stiryo stiryohaat m|ستريو ستريوهات", ark: "safeena sufun f|سفينة سفن", carpenter: "najjaar najjaareen mh|نجار نجارين", narcotic: "mu5addir mu5addiraat m|مخدر مخدرات",
    slipper: "shib-shib shabaashib m|شبشب شباشب", footprint: "athar aathaar m|أثر آثار", pact: "3ahd 3uhood m|عهد عهود", preparation: "ta79'eer ta79'eeraat m|تحضير تحضيرات",
    denial: "inkaar inkaar m|إنكار إنكار", flute: "naay naayaat m|ناي نايات", juvenile: "7adath a7daath mh|حدث أحداث", memo: "mudhakkira mudhakkiraat f|مذكرة مذكرات",
    canvas: "gumaash agmisha m|قماش أقمشة", driveway: "madkhal madaakhil m|مدخل مداخل", kitten: "gi6wa gi6aawa f|قطوة قطاوة", shaft: "3amood a3mida m|عمود أعمدة",
    sherry: "sheeri sheeri m|شيري شيري", overtime: "wagt_i9'aafi wagt_i9'aafi m|وقت_إضافي وقت_إضافي", resignation: "istigaala istigaalaat f|استقالة استقالات", madman: "majnoon majaaneen mh|مجنون مجانين",
    reform: "i9laa7 i9laa7aat m|إصلاح إصلاحات", runway_: "madraj madaarij m|مدرج مدارج", mumbling: "tamtama tamtama f|تمتمة تمتمة", probe: "ta7geeg ta7geegaat m|تحقيق تحقيقات",
    lone: "wa7eed wa7eedeen mh|وحيد وحيدين", acre: "fadaan fadaadeen m|فدان فدادين", cavalry: "fursaan fursaan mh|فرسان فرسان", battalion: "kateeba kataayib f|كتيبة كتايب",
    stripper: "raagi9a raagi9aat fh|راقصة راقصات", assassination: "i3'tiyaal i3'tiyaalaat m|اغتيال اغتيالات", gong: "jars ajraas m|جرس أجراس", parish: "abrashiyya abrashiyyaat f|أبرشية أبرشيات",
    squeal: "9arr5a 9arr5aat f|صرخة صرخات", bash: "7afla 7aflaat f|حفلة حفلات", platoon: "fa9eela fa9aayil f|فصيلة فصايل", rendezvous: "maw3id mawaa3eed m|موعد مواعيد",
    grunt: "jundi junood mh|جندي جنود", guinea: "3'eenya 3'eenya f|غينيا غينيا", magistrate: "gaa9'i gu9'aa mh|قاضي قضاة", quantum: "kam kam m|كم كم",
    discharge: "ta9ree7 ta9aaree7 m|تصريح تصاريح", lining: "bi6aana bi6aanaat f|بطانة بطانات", chancellor: "mustashaar mustashaareen mh|مستشار مستشارين", barb: "shooka shuwak f|شوكة شوك",
    poppy: "5ash5aash 5ash5aash m|خشخاش خشخاش", hamlet: "garya guraa f|قرية قرى", pentagon: "il-bentaagon il-bentaagon m|البنتاغون البنتاغون", bidding: "muzaayada muzaayadaat f|مزايدة مزايدات",
    tackle: "3arrgala 3arrgalaat f|عرقلة عرقلات", kilos: "keelowaat keelowaat m|كيلوات كيلوات", flowing: "tadaffug tadaffug m|تدفق تدفق", gunshot: "6alga 6algaat f|طلقة طلقات",
    gunfire: "i6laag_naar i6laag_naar m|إطلاق_نار إطلاق_نار", champagne: "shambaanya shambaanya f|شمبانيا شمبانيا", county: "muqaa6a3a muqaa6a3aat f|مقاطعة مقاطعات", suicide: "inti7aar inti7aar m|انتحار انتحار",
    superman: "superman superman mh|سوبرمان سوبرمان", static: "tashweesh tashweesh m|تشويش تشويش", sperm: "7ayawaanaat_manawiyya 7ayawaanaat_manawiyya f|حيوانات_منوية حيوانات_منوية", blues: "blues blues m|بلوز بلوز",
    contrary: "3aks 3aks m|عكس عكس", whore: "3aahira 3aahiraat fh|عاهرة عاهرات", bastard: "nadhl andhaal mh|نذل أنذال", crap: "5araabee6 5araabee6 m|خرابيط خرابيط",
    bullshit: "kalaam_faa9'i kalaam_faa9'i m|كلام_فاضي كلام_فاضي", goddamn: "il-mal3oon il-mal3ooneen m|الملعون الملعونين", butt: "mu2a55ira mu2a55iraat f|مؤخرة مؤخرات", ass: "7maar 7ameer mh|حمار حمير",
    prick: "7ageer 7ugara mh|حقير حقرا", dick: "7ageer 7ugara mh|حقير حقرا", slut: "3aahira 3aahiraat fh|عاهرة عاهرات", bitch: "kalba kalbaat fh|كلبة كلبات",
    hell: "jahannam jahannam f|جهنم جهنم", nigga: "5ooy 5waan mh|خوي خوان", sex: "jins jins m|جنس جنس", porn: "ibaa7i ibaa7i m|إباحي إباحي", penis: "ga9'eeb gu9'baan m|قضيب قضبان",
  };
  const X6_ADJS = {
    dressed: "laabis laabsa laabseen|لابس لابسة لابسين", concerned: "galgaan galgaana galgaaneen|قلقان قلقانة قلقانين", intelligent: "dhaki dhakiyya adhkiya|ذكي ذكية أذكيا",
    magnificent: "raa2i3 raa2i3a raa2i3een|رائع رائعة رائعين", sealed: "msakkar msakkara msakkareen|مسكر مسكرة مسكرين", located: "mawjood mawjooda mawjoodeen|موجود موجودة موجودين",
    sophisticated: "mu3aggad mu3aggada mu3aggadeen|معقد معقدة معقدين", revolutionary: "thawri thawriyya thawriyyeen|ثوري ثورية ثوريين",
    linked: "marboo6 marboo6a marboo6een|مربوط مربوطة مربوطين", cultural: "thagaafi thagaafiyya thagaafiyyeen|ثقافي ثقافية ثقافيين", honorable: "mu7taram mu7tarama mu7tarameen|محترم محترمة محترمين",
    honourable: "mu7taram mu7tarama mu7tarameen|محترم محترمة محترمين", psychological: "nafsi nafsiyya nafsiyyeen|نفسي نفسية نفسيين", biological: "bayoloji bayolojiyya bayolojiyyeen|بيولوجي بيولوجية بيولوجيين",
    legitimate: "shar3i shar3iyya shar3iyyeen|شرعي شرعية شرعيين", feared: "ma5oof ma5oofa ma5oofeen|مخوف مخوفة مخوفين", obliged: "mu9'6arr mu9'6arra mu9'6arreen|مضطر مضطرة مضطرين",
    forensic: "jinaa2i jinaa2iyya jinaa2iyyeen|جنائي جنائية جنائيين", exotic: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين", noisy: "9'ajja 9'ajja 9'ajja|ضجة ضجة ضجة",
    meaningless: "ma_lah_ma3na ma_laha_ma3na ma_lahum_ma3na|ما_له_معنى ما_لها_معنى ما_لهم_معنى", restless: "mob_mirtaa7 mob_mirtaa7a mob_mirtaa7een|مب_مرتاح مب_مرتاحة مب_مرتاحين", clumsy: "a5rag 5arga 5urg|أخرق خرقا خرق",
    primitive: "bidaa2i bidaa2iyya bidaa2iyyeen|بدائي بدائية بدائيين", peculiar: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين", artistic: "fanni fanniyya fanniyyeen|فني فنية فنيين",
    atomic: "dharri dharriyya dharriyyeen|ذري ذرية ذريين", urban: "7a9'ari 7a9'ariyya 7a9'ariyyeen|حضري حضرية حضريين", nude: "3aari 3aarya 3aaryeen|عاري عارية عاريين",
    tidy: "murattab murattaba murattabeen|مرتب مرتبة مرتبين", classy: "raagi raagya raagyeen|راقي راقية راقيين", cheerful: "mari7 mari7a mari7een|مرح مرحة مرحين",
    acceptable: "magbool magboola magbooleen|مقبول مقبولة مقبولين", realistic: "waaqi3i waaqi3iyya waaqi3iyyeen|واقعي واقعية واقعيين", sufficient: "kaafi kaafya kaafyeen|كافي كافية كافيين",
    intellectual: "muthaggaf muthaggafa muthaggafeen|مثقف مثقفة مثقفين", ruthless: "gaasi gaasya gaasyeen|قاسي قاسية قاسيين", crappy: "5aayis 5aaysa 5aayseen|خايس خايسة خايسين",
    unemployed: "3aa6il 3aa6la 3aa6leen|عاطل عاطلة عاطلين", antique_: "ateeg ateega ateegeen|عتيق عتيقة عتيقين", stray: "9'aal 9'aala 9'aaleen|ضال ضالة ضالين",
    dental: "sinni sinniyya sinniyyeen|سني سنية سنيين", infinite: "la_nihaa2i la_nihaa2iyya la_nihaa2iyyeen|لا_نهائي لا_نهائية لا_نهائيين", irrelevant: "ma_lah_3alaaga ma_laha_3alaaga ma_lahum_3alaaga|ما_له_علاقة ما_لها_علاقة ما_لهم_علاقة",
    irresponsible: "mob_mas2ool mob_mas2oola mob_mas2ooleen|مب_مسؤول مب_مسؤولة مب_مسؤولين", surgical: "jiraa7i jiraa7iyya jiraa7iyyeen|جراحي جراحية جراحيين", elderly: "kabeer_fis-sinn kabeera_fis-sinn kbaar_fis-sinn|كبير_في_السن كبيرة_في_السن كبار_في_السن",
    profound: "3ameeg 3ameega 3ameegeen|عميق عميقة عميقين", detailed: "mufa99al mufa99ala mufa99aleen|مفصل مفصلة مفصلين", careless: "muhmil muhmila muhmileen|مهمل مهملة مهملين",
    sloppy: "muhmil muhmila muhmileen|مهمل مهملة مهملين", hideous: "bashi3 bash3a bash3een|بشع بشعة بشعين", fatty: "dihni dihniyya dihniyyeen|دهني دهنية دهنيين",
    superb: "mumtaaz mumtaaza mumtaazeen|ممتاز ممتازة ممتازين", righteous: "9aali7 9aal7a 9aal7een|صالح صالحة صالحين", rational: "3agli 3agliyya 3agliyyeen|عقلي عقلية عقليين",
    immune: "ma7mi ma7miyya ma7miyyeen|محمي محمية محميين", crooked: "ma3wooj ma3wooja ma3woojeen|معووج معووجة معووجين", definite: "akeed akeeda akeedeen|أكيد أكيدة أكيدين",
    elementary: "ibtidaa2i ibtidaa2iyya ibtidaa2iyyeen|ابتدائي ابتدائية ابتدائيين", fundamental: "asaasi asaasiyya asaasiyyeen|أساسي أساسية أساسيين", utter: "^kaamil|كامل",
    devastated: "mdammar mdammara mdammareen|مدمر مدمرة مدمرين", authentic: "a9li a9liyya a9liyyeen|أصلي أصلية أصليين", overwhelmed: "ma3'loob_3ala_amra ma3'looba_3ala_amrha ma3'loobeen_3ala_amrhum|مغلوب_على_أمره مغلوبة_على_أمرها مغلوبين_على_أمرهم",
    swift: "saree3 saree3a saree3een|سريع سريعة سريعين", cozy: "daafi daafya daafyeen|دافي دافية دافيين", elaborate: "mufa99al mufa99ala mufa99aleen|مفصل مفصلة مفصلين",
    gifted: "mawhoob mawhooba mawhoobeen|موهوب موهوبة موهوبين", solitary: "wa7eed wa7eeda wa7eedeen|وحيد وحيدة وحيدين", yummy: "ladheedh ladheedha ladheedheen|لذيذ لذيذة لذيذين",
    slack: "mitraa5i mitraa5ya mitraa5yeen|متراخي متراخية متراخيين", mild: "5afeef 5afeefa 5ifaaf|خفيف خفيفة خفاف", carved: "man7oot man7oota man7ooteen|منحوت منحوتة منحوتين",
    diplomatic: "diblomaasi diblomaasiyya diblomaasiyyeen|دبلوماسي دبلوماسية دبلوماسيين", partial: "juz2i juz2iyya juz2iyyeen|جزئي جزئية جزئيين", ungrateful: "naakir_il-jameel naakra_il-jameel naakreen_il-jameel|ناكر_الجميل ناكرة_الجميل ناكرين_الجميل",
    neutral: "mu7aayid mu7aayda mu7aaydeen|محايد محايدة محايدين", presidential: "ri2aasi ri2aasiyya ri2aasiyyeen|رئاسي رئاسية رئاسيين", colored: "mlawwan mlawwana mlawwaneen|ملون ملونة ملونين",
    coloured: "mlawwan mlawwana mlawwaneen|ملون ملونة ملونين", conservative: "mu7aafi6' mu7aafi6'a mu7aafi6'een|محافظ محافظة محافظين", forged: "muzawwar muzawwara muzawwareen|مزور مزورة مزورين",
    authorized: "mu5awwal mu5awwala mu5awwaleen|مخول مخولة مخولين", parallel: "muwaazi muwaazya muwaazyeen|موازي موازية موازيين", overall: "^ijmaali|إجمالي",
    shaped: "mshakkal mshakkala mshakkaleen|مشكل مشكلة مشكلين", matched: "mi6aabig mi6aabga mi6aabgeen|مطابق مطابقة مطابقين", vile: "7ageer 7ageera 7ugara|حقير حقيرة حقرا",
    imaginary: "5ayaali 5ayaaliyya 5ayaaliyyeen|خيالي خيالية خياليين", distinguished: "mumayyaz mumayyaza mumayyazeen|مميز مميزة مميزين", addicted: "mudmin mudmina mudmineen|مدمن مدمنة مدمنين",
    shameless: "ma_yisti7i ma_tisti7i ma_yisti7oon|ما_يستحي ما_تستحي ما_يستحون", stern: "9aarim 9aarma 9aarmeen|صارم صارمة صارمين", curly: "mkashkash mkashkasha mkashkasheen|مكشكش مكشكشة مكشكشين",
    stoned: "mas6ool mas6oola mas6ooleen|مسطول مسطولة مسطولين", supernatural: "5aarig 5aarga 5aargeen|خارق خارقة خارقين", bankrupt: "muflis muflisa mufliseen|مفلس مفلسة مفلسين",
    slippery: "yzallig tzallig yzalligoon|يزلق تزلق يزلقون", numerous: "wayed wayed wayed|وايد وايد وايد", sane: "3aagil 3aagla 3uggaal|عاقل عاقلة عقال",
    founded: "mu2assas mu2assasa mu2assaseen|مؤسس مؤسسة مؤسسين", impatient: "ma_3inda_9abur ma_3indha_9abur ma_3indhum_9abur|ما_عنده_صبر ما_عندها_صبر ما_عندهم_صبر",
    civilized: "muta7a9'9'ir muta7a9'9'ira muta7a9'9'ireen|متحضر متحضرة متحضرين", dynamic: "deenaameeki deenaameekiyya deenaameekiyyeen|ديناميكي ديناميكية ديناميكيين", unbearable: "ma_yin6aag ma_tin6aag ma_yin6aagoon|ما_ينطاق ما_تنطاق ما_ينطاقون",
    juicy: "mlayyan mlayyana mlayyaneen|ملين ملينة ملينين", eerie: "mur3ib mur3iba mur3ibeen|مرعب مرعبة مرعبين", apparent: "waa9'i7 waa9'7a waa9'7een|واضح واضحة واضحين",
    grim: "ka2eeb ka2eeba ka2eebeen|كئيب كئيبة كئيبين", medieval: "min_il-3u9oor_il-wus6a min_il-3u9oor_il-wus6a min_il-3u9oor_il-wus6a|من_العصور_الوسطى من_العصور_الوسطى من_العصور_الوسطى", frustrating: "mu7bi6 mu7bi6a mu7bi6een|محبط محبطة محبطين",
    funky: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين", precious: "3'aali 3'aalya 3'aalyeen|غالي غالية غاليين", upbeat: "mutafaa2il mutafaa2ila mutafaa2ileen|متفائل متفائلة متفائلين",
    ominous: "mash2oom mash2ooma mash2oomeen|مشؤوم مشؤومة مشؤومين", flattered: "mitsharrif mitsharrifa mitsharrifeen|متشرف متشرفة متشرفين", wretched: "ta3ees ta3eesa tu3asa|تعيس تعيسة تعسا",
    condemned: "mudaan mudaana mudaaneen|مدان مدانة مدانين", naval: "ba7ri ba7riyya ba7riyyeen|بحري بحرية بحريين", democratic: "deemoqraa6i deemoqraa6iyya deemoqraa6iyyeen|ديمقراطي ديمقراطية ديمقراطيين",
    misunderstood: "ma7ad_faahma ma7ad_faahimha ma7ad_faahimhum|محد_فاهمه محد_فاهمها محد_فاهمهم", thorough: "dageeg dageega dageegeen|دقيق دقيقة دقيقين", jammed: "3aalig 3aalga 3aalgeen|عالق عالقة عالقين",
    inherited: "mawrooth mawrootha mawrootheen|موروث موروثة موروثين", sheer: "^kaamil|كامل", queer: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين",
    expelled: "ma6rood ma6rooda ma6roodeen|مطرود مطرودة مطرودين", discreet: "katoom katooma katoomeen|كتوم كتومة كتومين",
    spared: "naaji naajya naajyeen|ناجي ناجية ناجيين", preferred: "mufa9'9'al mufa9'9'ala mufa9'9'aleen|مفضل مفضلة مفضلين", aged: "kabeer_fis-sinn kabeera_fis-sinn kbaar_fis-sinn|كبير_في_السن كبيرة_في_السن كبار_في_السن",
    sustained: "mustamirr mustamirra mustamirreen|مستمر مستمرة مستمرين", abducted: "ma56oof ma56oofa ma56oofeen|مخطوف مخطوفة مخطوفين", panicked: "mar3oob mar3ooba mar3oobeen|مرعوب مرعوبة مرعوبين",
    framed: "mlaffag_lah mlaffag_laha mlaffag_lahum|ملفق_له ملفق_لها ملفق_لهم", freed: "mu7arrar mu7arrara mu7arrareen|محرر محررة محررين", combined: "mujtami3 mujtami3a mujtami3een|مجتمع مجتمعة مجتمعين",
    listed: "madraj madraja madrajeen|مدرج مدرجة مدرجين", destined: "mu5a99a9 mu5a99a9a mu5a99a9een|مخصص مخصصة مخصصين", ironic: "saa5ir saa5ra saa5reen|ساخر ساخرة ساخرين",
    advised: "man9oo7 man9oo7a man9oo7een|منصوح منصوحة منصوحين", programmed: "mubarmaj mubarmaja mubarmajeen|مبرمج مبرمجة مبرمجين", discharged: "ma9roof ma9roofa ma9roofeen|مصروف مصروفة مصروفين",
    exotic_: "3'areeb 3'areeba 3'areebeen|غريب غريبة غريبين", triple: "thulaathi thulaathiyya thulaathiyyeen|ثلاثي ثلاثية ثلاثيين", auto: "otomaatik otomaatik otomaatik|أوتوماتيك أوتوماتيك أوتوماتيك",
    sexual: "jinsi jinsiyya jinsiyyeen|جنسي جنسية جنسيين", gay: "mithli mithliyya mithliyyeen|مثلي مثلية مثليين", motherfucker: "7ageer 7ageera 7ugara|حقير حقيرة حقرا",
    fucked: "5arbaan 5arbaana 5arbaaneen|خربان خربانة خربانين", honored_: "mitsharrif mitsharrifa mitsharrifeen|متشرف متشرفة متشرفين",
  };
  const X6_VERBS = {
    'figure out': ["fahamt fiham fham ifham|فهمت فهم فهم افهم", { past: 'figured', lv: 'a' }],
    screw: ["5arrabt 5arrab 5arrib 5arrib|خربت خرب خرب خرب", {}],
    'screw up': ["5arrabt 5arrab 5arrib 5arrib|خربت خرب خرب خرب", {}],
    'mess up': ["5arrabt 5arrab 5arrib 5arrib|خربت خرب خرب خرب", {}],
    blow: ["nafa5t nafa5 nfi5 infi5|نفخت نفخ نفخ انفخ", { past: 'blew', pp: 'blown', lv: 'i' }],
    'blow up': ["fajjart fajjar fajjir fajjir|فجرت فجر فجر فجر", { past: 'blew', pp: 'blown' }],
    step: ["da3ast da3as d3as id3as|دعست دعس دعس ادعس", { lv: 'a', on: '3ala', obj: '3ala' }],
    phone: ["itta9alt itta9al tta9il itta9il|اتصلت اتصل اتصل اتصل", { lv: 'i', obj: 'b', objNP: 'b' }],
    indicate: ["ashart ashaar asheer asheer|أشرت أشار أشير أشر", { to: 'li' }],
    fulfill: ["7aggagt 7aggag 7aggig 7aggig|حققت حقق حقق حقق", {}],
    fulfil: ["7aggagt 7aggag 7aggig 7aggig|حققت حقق حقق حقق", {}],
    plead: ["tawassalt tawassal tawassal tawassal|توسلت توسل توسل توسل", { lv: 'i', past: ['pleaded', 'pled'] }],
    oppose: ["3aara9't 3aara9' 3aari9' 3aari9'|عارضت عارض عارض عارض", {}],
    bloom: ["zahhart zahhar zahhir zahhir|زهرت زهر زهر زهر", {}],
    whine: ["tdhammart tdhammar tdhammar tdhammar|تذمرت تذمر تذمر تذمر", { lv: 'i' }],
    await: ["intidhart intidhar ntidhir intidhir|انتظرت انتظر انتظر انتظر", { lv: 'i' }],
    confront: ["waajaht waajah waajih waajih|واجهت واجه واجه واجه", {}],
    evacuate: ["a5lait a5la a5li a5li|أخليت أخلى أخلي أخل", {}],
    define: ["3arraft 3arraf 3arrif 3arrif|عرفت عرف عرف عرف", {}],
    acknowledge: ["i3taraft i3taraf 3tirif i3tirif|اعترفت اعترف اعترف اعترف", { lv: 'i', obj: 'b', objNP: 'b' }],
    justify: ["barrart barrar barrir barrir|بررت برر برر برر", {}],
    expand: ["wassa3t wassa3 wassi3 wassi3|وسعت وسع وسع وسع", {}],
    quarrel: ["t5aa9amt t5aa9am t5aa9am t5aa9am|تخاصمت تخاصم تخاصم تخاصم", { lv: 'i', with: 'wiyya' }],
    reflect: ["3akast 3akas 3kis i3kis|عكست عكس عكس اعكس", { lv: 'i' }],
    offend: ["9'aayagt 9'aayag 9'aayig 9'aayig|ضايقت ضايق ضايق ضايق", {}],
    demonstrate: ["warrait warra warri warri|وريت ورى وري ور", {}],
    trace: ["tatabba3t tatabba3 tatabba3 tatabba3|تتبعت تتبع تتبع تتبع", { lv: 'i' }],
    pronounce: ["nu6agt nu6ag n6ig in6ig|نطقت نطق نطق انطق", { lv: 'i' }],
    underestimate: ["istahant istahaan stiheen istiheen|استهنت استهان استهين استهن", { lv: 'i', obj: 'b', objNP: 'b' }],
    sponsor_v: ["mawwalt mawwal mawwil mawwil|مولت مول مول مول", {}],
    alter: ["3'ayyart 3'ayyar 3'ayyir 3'ayyir|غيرت غير غير غير", {}],
    discharge_v: ["sarra7t sarra7 sarri7 sarri7|سرحت سرح سرح سرح", {}],
    retrieve: ["istarja3t istarja3 starji3 istarji3|استرجعت استرجع استرجع استرجع", { lv: 'i' }],
    reconsider: ["a3adt_in-na6'ar a3aad_in-na6'ar a3eed_in-na6'ar a3id_in-na6'ar|أعدت_النظر أعاد_النظر أعيد_النظر أعد_النظر", { in: 'fi', obj: 'fi', objNP: 'fi' }],
    undo: ["raja3t raja3 rja3 irja3|رجعت رجع رجع ارجع", { past: 'undid', pp: 'undone', lv: 'a' }],
    rebuild: ["3ammart 3ammar 3ammir 3ammir|عمرت عمر عمر عمر", { past: 'rebuilt', pp: 'rebuilt' }],
    sew: ["5ayya6t 5ayya6 5ayyi6 5ayyi6|خيطت خيط خيط خيط", { past: 'sewed', pp: 'sewn' }],
    dismiss: ["9araft 9araf 9rif i9rif|صرفت صرف صرف اصرف", { lv: 'i' }],
    forge: ["zawwart zawwar zawwir zawwir|زورت زور زور زور", {}],
    gag: ["kammamt kammam kammim kammim|كممت كمم كمم كمم", {}],
    tackle: ["3argalt 3argal 3argil 3argil|عرقلت عرقل عرقل عرقل", {}],
    hustle: ["ishtaghalt ishtaghal shtaghil ishtaghil|اشتغلت اشتغل اشتغل اشتغل", { lv: 'i' }],
    brace: ["ista3addait ista3add sta3idd ista3idd|استعديت استعد استعد استعد", { lv: 'i' }],
    thrust: ["dafa3t dafa3 dfa3 idfa3|دفعت دفع دفع ادفع", { past: 'thrust', pp: 'thrust', lv: 'a' }],
    recruit_v: ["jannadt jannad jannid jannid|جندت جند جند جند", {}],
    rehearse: ["tmarrant tmarran tmarran tmarran|تمرنت تمرن تمرن تمرن", { lv: 'i' }],
    pinch: ["gara9t gara9 gri9 igri9|قرصت قرص قرص اقرص", { lv: 'i' }],
    untie: ["fakkait fakk fikk fikk|فكيت فك فك فك", {}],
    stalk: ["tlaa7agt tlaa7ag tlaa7ag tlaa7ag|تلاحقت تلاحق تلاحق تلاحق", { lv: 'i' }],
    whack: ["9'arabt 9'arab 9'rib i9'rib|ضربت ضرب ضرب اضرب", { lv: 'i' }],
    panic: ["5aft 5aaf 5aaf 5aaf|خفت خاف خاف خاف", { past: 'panicked', pp: 'panicked' }],
    abduct: ["5a6aft 5a6af 5a6if i5a6if|خطفت خطف خطف اخطف", { lv: 'i' }],
    bump: ["9adamt 9adam 9dim i9dim|صدمت صدم صدم اصدم", { lv: 'i', into: 'fi' }],
    sustain: ["t7ammalt t7ammal t7ammal t7ammal|تحملت تحمل تحمل تحمل", { lv: 'i' }],
    surf_v: ["tsaffa7t tsaffa7 tsaffa7 tsaffa7|تصفحت تصفح تصفح تصفح", { lv: 'i' }],
    exhibit_v: ["3ara9't 3ara9' 3ri9' i3ri9'|عرضت عرض عرض اعرض", { lv: 'i' }],
    echo_v: ["raddadt raddad raddid raddid|رددت ردد ردد ردد", {}],
    evolve: ["ta6awwart ta6awwar ta6awwar ta6awwar|تطورت تطور تطور تطور", { lv: 'i' }],
    carve: ["na7att na7at n7it in7it|نحت نحت نحت انحت", { lv: 'i' }],
    clap: ["9affagt 9affag 9affig 9affig|صفقت صفق صفق صفق", {}],
    probe_v: ["7aggagt 7aggag 7aggig 7aggig|حققت حقق حقق حقق", { in: 'fi', obj: 'fi' }],
    narrate: ["sarradt sarrad sarrid sarrid|سردت سرد سرد سرد", {}],
    stab: ["6a3ant 6a3an 63an i63an|طعنت طعن طعن اطعن", { lv: 'a' }],
    mumble: ["tamtamt tamtam tamtim tamtim|تمتمت تمتم تمتم تمتم", {}],
    tango: ["=do", { tail: 'tango|تانقو' }],
    fail_: ["fashalt fishal fshal ifshal|فشلت فشل فشل افشل", { lv: 'a' }],
    reform_v: ["a9la7t a9la7 a9li7 a9li7|أصلحت أصلح أصلح أصلح", {}],
    resign: ["istagalt istagaal stageel istageel|استقلت استقال استقيل استقل", { lv: 'i', from: 'min' }],
    bid_v: ["zaayadt zaayad zaayid zaayid|زايدت زايد زايد زايد", { past: 'bid', pp: 'bid', on: '3ala' }],
    expel: ["6aradt 6arad 6rid i6rid|طردت طرد طرد اطرد", { lv: 'i' }],
    spare: ["3afait 3afa 3fi i3fi|عفيت عفى عفي اعف", { lv: 'i', about: '3an', obj: '3an', objNP: '3an' }],
    frame: ["laffagt laffag laffig laffig|لفقت لفق لفق لفق", { obj: 'li', objNP: 'li' }],
    free_v: ["7arrart 7arrar 7arrir 7arrir|حررت حرر حرر حرر", {}],
    destine: ["gaddart gaddar gaddir gaddir|قدرت قدر قدر قدر", {}],
    combine: ["dammajt dammaj dammij dammij|دمجت دمج دمج دمج", {}],
    list_v: ["sajjalt sajjal sajjil sajjil|سجلت سجل سجل سجل", {}],
    hang_: ["3allagt 3allag 3allig 3allig|علقت علق علق علق", { past: ['hung', 'hanged'], pp: ['hung', 'hanged'] }],
    program_: ["barmajt barmaj barmij barmij|برمجت برمج برمج برمج", {}],
    sting_v: ["lasa3t lasa3 lsa3 ilsa3|لسعت لسع لسع السع", { past: 'stung', pp: 'stung', lv: 'a' }],
    prep: ["7a9'9'art 7a9'9'ar 7a9'9'ir 7a9'9'ir|حضرت حضر حضر حضر", {}],
    dress_: ["libast libas lbas ilbas|لبست لبس لبس البس", { lv: 'a' }],
  };
  const X6_ADVS = {
    utterly: "tamaaman|تماماً", freaking: "~wayed|وايد", fucking: "~wayed|وايد", thoroughly: "b-digga|بدقة", purely: "bas|بس", greatly: "wayed|وايد", gradually: "shway shway|شوي شوي", strangely: "3'areeb|غريب",
    whilst: "bainama|بينما", newly_: "min jadeed|من جديد", overall_: "bshakil 3aam|بشكل عام", virtually_: "tagreeban|تقريباً", sexually: "jinsiyyan|جنسياً",
    indistinctly: "b-3'umoo9'|بغموض", unto: "li|ل", duh: "akeed|أكيد", whoops: "oops|أوبس", lo: "shoof|شوف", alas: "lil-asaf|للأسف", aye: "ee|إي", ho: "hooy|هوي", ha: "ha|ها",
    huh: "ha|ها", eh: "ha|ها", um: "umm|أمم", em: "umm|أمم", whoa: "waw|واو", boo: "boo|بو", hallelujah: "il-7amdulillah|الحمدلله", behold: "shoof|شوف", goddamn: "la3na|لعنة",
  };
  const X6_FIXED = {
    'get dressed': A3("ilbas|البس", "ilbisi|البسي", "ilbisoo|البسوا"), 'i am getting dressed': "gaa3id albas|قاعد ألبس", 'what are the odds': "shu il-i7timaal|شو الاحتمال", 'the odds are': "il-i7timaal|الاحتمال",
    'upside down': "magloob|مقلوب", 'bearing in mind': "ma3 il-a5dh bil-i3tibaar|مع الأخذ بالاعتبار", 'bear in mind': "5idh bi3tibaarak|خذ باعتبارك", 'keep in mind': "5idh bi3tibaarak|خذ باعتبارك",
    'courtesy of': "bfa9'l|بفضل", 'on cue': "fi wagta|في وقته", 'opposed to': "9'idd|ضد", 'as opposed to': "3aks|عكس", 'plead guilty': "a3tarif bidh-dhanb|أعترف بالذنب", 'not guilty': "mob mudhnib|مب مذنب",
    'prep time': "wagt it-ta79'eer|وقت التحضير", 'stop whining': A3("bass tdhammur|بس تذمر", "bassi tdhammur|بسي تذمر", "bassoo tdhammur|بسوا تذمر"), 'bugger off': A3("inga6i3|انقطع", "inga6i3i|انقطعي", "inga6i3oo|انقطعوا"),
    'non stop': "bdoon tawagguf|بدون توقف", 'nonstop': "bdoon tawagguf|بدون توقف", 'to some extent': "ila 7add ma|إلى حد ما", 'to a certain extent': "ila 7add ma|إلى حد ما", 'to what extent': "ila ay 7add|إلى أي حد",
    'the rent is due': "il-eejaar waajib|الإيجار واجب", 'is due': "musta7agg|مستحق", 'is due tomorrow': "musta7agg bacher|مستحق باچر", 'due tomorrow': "musta7agg bacher|مستحق باچر", 'due today': "musta7agg il-yoom|مستحق اليوم",
    'as far as i am concerned': "bin-nisba li|بالنسبة لي", 'the parties concerned': "il-a6raaf il-ma3niyya|الأطراف المعنية",
    'triple kill': "triple kill|تربل كل", 'auto attack': "auto attack|أوتو أتاك", 'stepping stone': "5u6wa|خطوة", 'a dash of': "shwayyat|شوية", 'quitting time': "wagt il-in9iraaf|وقت الانصراف",
    'god almighty': "ya allah|يا الله", 'oh my god': "ya allah|يا الله", 'oh my gosh': "ya allah|يا الله", 'oh god': "ya rabbi|يا ربي", 'dear god': "ya rabbi|يا ربي", 'good god': "ya allah|يا الله", 'god damn it': "la3na|لعنة",
    'holy shit': "ya allah|يا الله", 'holy crap': "ya allah|يا الله", 'holy cow': "ya allah|يا الله", 'holy moly': "ya allah|يا الله", 'what the hell': "shu hal 5araabee6|شو هالخرابيط", 'what the heck': "shu hal 5araabee6|شو هالخرابيط",
    'what the fuck': "shu hal 5araabee6|شو هالخرابيط", 'the hell': "bil-laah|بالله", 'go to hell': A3("roo7 jahannam|روح جهنم", "roo7i jahannam|روحي جهنم", "roo7oo jahannam|روحوا جهنم"), 'hell no': "la wal-laah|لا والله", 'hell yeah': "ee wal-laah|إي والله",
    'hell yes': "ee wal-laah|إي والله", 'like hell': "wal-laah|والله", 'oh hell': "ya saatir|يا ساتر", 'bloody hell': "ya saatir|يا ساتر", 'what on earth': "shu bil-9'ab6|شو بالضبط", 'how on earth': "shlon bil-9'ab6|شلون بالضبط",
    'why on earth': "laish bil-9'ab6|ليش بالضبط", 'where on earth': "wain bil-9'ab6|وين بالضبط", 'who on earth': "min bil-9'ab6|من بالضبط", 'fuck off': A3("inga6i3|انقطع", "inga6i3i|انقطعي", "inga6i3oo|انقطعوا"),
    'fuck you': A3("til3an abook|تلعن أبوك", "til3an abooch|تلعن أبوج", "til3an abookum|تلعن أبوكم"), 'fuck it': "5alaa9 ma 3alaih|خلاص ما عليه", 'fuck this': "5alaa9 ma abi|خلاص ما أبي", 'fuck that': "la ma abi|لا ما أبي", 'fuck': "la3na|لعنة", 'fuck me': "ya saatir|يا ساتر",
    'fucked up': "5arbaan|خربان", 'screwed up': "5arbaan|خربان", 'i am screwed': "ana 5alla9t|أنا خلصت", 'we are screwed': "i7na 5alla9na|إحنا خلصنا", 'you are screwed': A3("inta 5alla9t|انت خلصت", "inti 5alla9ti|انتي خلصتي", "intum 5alla9tu|انتم خلصتوا"),
    'shut the fuck up': A3("sidd 7algak|سد حلقك", "siddi 7algich|سدي حلقج", "siddoo 7algkum|سدوا حلقكم"), 'what the hell is this': "shu hadha|شو هذا", 'what the hell is going on': "shu gaa3id y9eer|شو قاعد يصير", 'what the hell happened': "shu illi 9aar|شو اللي صار",
    'damn it': "la3na|لعنة", 'dammit': "la3na|لعنة", 'damn': "la3na|لعنة", 'goddammit': "la3na|لعنة", 'crap': "5araabee6|خرابيط", 'oh crap': "ya saatir|يا ساتر", 'bullshit': "kalaam faa9'i|كلام فاضي",
    'that is bullshit': "hadha kalaam faa9'i|هذا كلام فاضي", 'no bullshit': "bdoon kalaam faa9'i|بدون كلام فاضي", 'son of a bitch': "ibn il-kalb|ابن الكلب", 'you bastard': "ya nadhl|يا نذل", 'bastard': "nadhl|نذل", 'you bitch': "ya kalba|يا كلبة",
    'piss off': A3("inga6i3|انقطع", "inga6i3i|انقطعي", "inga6i3oo|انقطعوا"), 'pissed off': "mi3a99ib|معصب", 'i am pissed': "ana mi3a99ib|أنا معصب", 'i am pissed off': "ana mi3a99ib|أنا معصب", 'pissed': "mi3a99ib|معصب", 'kiss my ass': "bal3a|بلعه",
    'my ass': "ya salaam|يا سلام", 'kick ass': "5a6eer|خطير", 'badass': "5a6eer|خطير", 'dumbass': "3'abi|غبي", 'smartass': "mitfalsif|متفلسف", 'jackass': "7maar|حمار", 'asshole': "7ageer|حقير", 'you asshole': "ya 7ageer|يا حقير",
    'oh boy': "ya saatir|يا ساتر", 'oh man': "ya 5ooy|يا خوي", 'oh dear': "ya saatir|يا ساتر", 'oh no': "ya saatir|يا ساتر", 'oh well': "5alaa9|خلاص", 'oh yeah': "ee 9a7|إي صح", 'oh really': "wal-laah|والله", 'oh ok': "aah tamaam|آه تمام",
    'oh okay': "aah tamaam|آه تمام", 'oh i see': "aah fihamt|آه فهمت", 'oh wow': "waw|واو", 'oh come on': "yalla bass|يلا بس", 'oh please': "law sama7t|لو سمحت", 'oh right': "aah 9a7|آه صح", 'oh yes': "ee|إي", 'oh thanks': "mashkoor|مشكور",
    'uh huh': "ee|إي", 'uh oh': "ya saatir|يا ساتر", 'mm hmm': "ee|إي", 'mhm': "ee|إي", 'hmm': "hmm|همم", 'umm': "umm|أمم", 'uh': "aa|آ", 'er': "aa|آ", 'ah': "aah|آه", 'ahh': "aah|آه", 'aw': "aww|أوو", 'aww': "aww|أوو", 'ugh': "uff|أف", 'ew': "ya3|يع", 'eww': "ya3|يع",
    'yikes': "ya saatir|يا ساتر", 'yay': "yaay|ياي", 'woohoo': "yaay|ياي", 'hooray': "yaay|ياي", 'phew': "il-7amdulillah|الحمدلله", 'ouch': "aa5|آخ", 'ow': "aa5|آخ", 'oops': "oops|أوبس", 'psst': "hiss|هس", 'shh': "hiss|هس", 'shhh': "hiss|هس", 'sh': "hiss|هس",
    'yo': "yo|يو", 'sup': "shu il-a5baar|شو الأخبار", 'wassup': "shu il-a5baar|شو الأخبار", 'whats up': "shu il-a5baar|شو الأخبار", 'what is up': "shu il-a5baar|شو الأخبار", 'howdy partner': "hala 5ooy|هلا خوي", 'yo bro': "yo 5ooy|يو خوي",
    'meh': "3aadi|عادي", 'nah': "la|لا", 'nope': "la|لا", 'yep': "ee|إي", 'yup': "ee|إي", 'yeah': "ee|إي", 'yea': "ee|إي", 'aye': "ee|إي", 'nay': "la|لا", 'nope nope': "la la|لا لا",
    'thou': "inta|انت", 'thee': "inta|انت", 'thy': "maalak|مالك", 'thine': "maalak|مالك", 'ye': "intum|انتم", 'monsieur': "sayyid|سيد", 'mademoiselle': "aanisa|آنسة", 'madame': "sayyida|سيدة", 'senor': "sayyid|سيد", 'senorita': "aanisa|آنسة", 'amigo': "9adeegi|صديقي",
    };
  Object.assign(X6_FIXED, { 'owes me': "madyoon li|مديون لي", 'owe me': "madyoon li|مديون لي", 'owes you': A3("madyoon lak|مديون لك", "madyoon lich|مديون لج", "madyoon lkum|مديون لكم"), 'owe you': A3("madyoon lak|مديون لك", "madyoon lich|مديون لج", "madyoon lkum|مديون لكم"),
    'owes him': "madyoon lah|مديون له", 'owe him': "madyoon lah|مديون له", 'owes her': "madyoon laha|مديون لها", 'owe her': "madyoon laha|مديون لها", 'owes us': "madyoon lna|مديون لنا", 'owe us': "madyoon lna|مديون لنا",
    'owes them': "madyoon lhum|مديون لهم", 'owe them': "madyoon lhum|مديون لهم", 'owed me': "kaan madyoon li|كان مديون لي", 'owed you': A3("kaan madyoon lak|كان مديون لك", "kaan madyoon lich|كان مديون لج", "kaan madyoon lkum|كان مديون لكم"),
    'owed him': "kaan madyoon lah|كان مديون له", 'owed her': "kaan madyoon laha|كان مديون لها", 'owe': "madyoon|مديون", 'owes': "madyoon|مديون",
    'i fainted': "a3'ma 3alay|أغمى علي", 'he fainted': "a3'ma 3alaih|أغمى عليه", 'she fainted': "a3'ma 3alaiha|أغمى عليها", 'they fainted': "a3'ma 3alaihum|أغمى عليهم", 'you fainted': A3("a3'ma 3alaik|أغمى عليك", "a3'ma 3alaich|أغمى عليج", "a3'ma 3alaikum|أغمى عليكم"),
    'fainted': "a3'ma 3alaih|أغمى عليه", 'faint': "y3'ma 3alaih|يغمى عليه", 'i blew it': "5arrabt-ha|خربتها", 'you blew it': A3("5arrabt-ha|خربتها", "5arrabtee-ha|خربتيها", "5arrabtoo-ha|خربتوها"), 'he blew it': "5arrab-ha|خربها", 'we blew it': "5arrabna-ha|خربناها" });
  const X6_NOUN_ALIAS = { odds_: 'odds', kilometers: 'kilometer', kilometres: 'kilometre', casualties: 'casualty', ingredients: 'ingredient', followers: 'follower', mushrooms: 'mushroom', foreigners: 'foreigner',
    boundaries: 'boundary', bruises: 'bruise', earrings: 'earring', peasants: 'peasant', tactics: 'tactic', grandparents: 'grandparent', grandchildren: 'grandchild', biscuits: 'biscuit', inmates: 'inmate', viewers: 'viewer',
    narcotics: 'narcotic', slippers: 'slipper', footprints: 'footprint', particles: 'particle', rupees: 'rupee', wages: 'wage', locals: 'local', dinosaurs: 'dinosaur', condolences: 'condolence', claws: 'claw', acres: 'acre',
    moustache: 'mustache', whores: 'whore', bastards: 'bastard', bitches: 'bitch', motherfuckers: 'motherfucker', asses: 'ass', tits: 'boobs', boobs: 'chest', fanny: 'butt', arse: 'butt', pussy: 'cat', vagina: 'vagina_', fucker: 'bastard',
    scoffs: 'laughter', sniffles: 'laughter', sniffs: 'laughter', chatter: 'chatter_', clattering: 'noise', rattling: 'noise', whirring: 'noise', wailing: 'crying', chirping: 'noise', muffled: 'noise', chattering: 'noise', snarling: 'noise', squeaking: 'noise',
    clamoring: 'noise', echoing: 'echo', exclaims: 'noise', exclaiming: 'noise', clapping: 'noise', whooping: 'noise', narrating: 'noise', narrator: 'narrator_', applause: 'applause_', laughter: 'laughter_' };
  Object.assign(ADJ_PREP, { concerned: { about: '3ala' }, dressed: { in: 'b' }, addicted: { to: '3ala' }, immune: { to: 'min' }, linked: { to: 'b' }, entitled: { to: '' }, obliged: { to: '' }, located: { in: 'fi' } });
  for (const [k, v] of Object.entries(X6_NOUNS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_RAW) && !(kk + '_' in NOUN_RAW)) NOUN_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X6_ADJS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADJ_RAW) && !(kk + '_' in ADJ_RAW)) ADJ_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X6_VERBS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in VERB_RAW) && !(kk + '_' in VERB_RAW)) VERB_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X6_ADVS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADV_RAW) && !(kk + '_' in ADV_RAW)) ADV_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X6_FIXED)) { const kk = k.trim(); if (!(kk in FIXED_RAW)) FIXED_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X6_NOUN_ALIAS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_ALIAS)) NOUN_ALIAS[kk] = v; }
  /* Chat abbreviations and internet / gaming slang */
  const X7_NOUNS = {
    meta: "meta meta m|ميتا ميتا", simp: "simp simps mh|سمب سمبز", drip: "drip drip m|درب درب", rizz: "rizz rizz m|رز رز", gyat: "gyat gyat m|قيات قيات", sigma: "sigma sigmas mh|سيقما سيقماز",
    skibidi: "skibidi skibidi m|سكيبيدي سكيبيدي", ohio: "ohio ohio m|أوهايو أوهايو", brainrot: "brainrot brainrot m|برين_روت برين_روت", clout: "shuhra shuhra f|شهرة شهرة", finesse: "finesse finesse m|فينيس فينيس",
    copium: "copium copium m|كوبيوم كوبيوم", hopium: "hopium hopium m|هوبيوم هوبيوم", gigachad: "gigachad gigachads mh|قيقا_تشاد قيقا_تشادز", chad: "chad chads mh|تشاد تشادز", karen: "karen karens fh|كارن كارنز",
    boomer: "boomer boomers mh|بومر بومرز", zoomer: "zoomer zoomers mh|زومر زومرز", millennial: "millennial millennials mh|ميلينيال ميلينيالز", bozo: "3'abi a3'biya mh|غبي أغبيا", smurf: "smurf smurfs mh|سمرف سمرفز",
    tryhard: "tryhard tryhards mh|تراي_هارد تراي_هاردز", griefing: "griefing griefing m|قريفنق قريفنق", teabagging: "teabagging teabagging m|تي_باقنق تي_باقنق", sandbagging: "sandbagging sandbagging m|ساندباقنق ساندباقنق",
    diff: "farg furoog m|فرق فروق", scrub: "noob noobs mh|نوب نوبز", ratio: "ratio ratio m|ريشيو ريشيو", pog: "pog pog m|بوق بوق", poggers: "poggers poggers m|بوقرز بوقرز", pogchamp: "pogchamp pogchamp m|بوقتشامب بوقتشامب",
    kappa: "kappa kappa m|كابا كابا", pepega: "3'abi a3'biya mh|غبي أغبيا", normie: "normie normies mh|نورمي نورميز", weeb: "weeb weebs mh|ويب ويبز", otaku: "otaku otaku mh|أوتاكو أوتاكو", gamer: "gamer gamers mh|قيمر قيمرز",
    streamer: "streamer streamers mh|ستريمر ستريمرز", youtuber: "youtuber youtubers mh|يوتيوبر يوتيوبرز", influencer: "influencer influencers mh|إنفلونسر إنفلونسرز", tiktoker: "tiktoker tiktokers mh|تيكتوكر تيكتوكرز",
    vlog: "vlog vlogs m|فلوق فلوقز", vlogger: "vlogger vloggers mh|فلوقر فلوقرز", meme: "meme memes m|ميم ميمز", gif: "gif gifs m|قف قفز", emoji: "emoji emojis m|إيموجي إيموجيز", sticker: "sticker stickers m|ستيكر ستيكرز",
    hashtag: "hashtag hashtags m|هاشتاق هاشتاقات", selfie: "selfie selfies f|سيلفي سيلفيز", story: "story stories f|ستوري ستوريز", reel: "reel reels m|ريل ريلز", podcast: "podcast podcasts m|بودكاست بودكاستس",
    playlist: "playlist playlists f|بلاي_لست بلاي_لستات", dm: "dm dms m|دي_إم دي_إمز", pm: "pm pms m|بي_إم بي_إمز", noti: "notification notifications f|نوتيفيكيشن نوتيفيكيشنز", notif: "notification notifications f|نوتيفيكيشن نوتيفيكيشنز",
    wifi: "wifi wifi m|واي_فاي واي_فاي", hotspot: "hotspot hotspot m|هوت_سبوت هوت_سبوت", charger: "shaa7in shawaa7in m|شاحن شواحن", powerbank: "powerbank powerbanks m|باور_بانك باور_بانكس", airpods: "airpods airpods m|إيربودز إيربودز",
    headset: "headset headsets m|هيدست هيدستات", mic: "maik maikaat m|مايك مايكات", webcam: "webcam webcams m|ويب_كام ويب_كامز", keyboard: "keyboard keyboards m|كيبورد كيبوردات", mouse_: "mouse mouses m|ماوس ماوسات",
    monitor: "shaasha shaashaat f|شاشة شاشات", gpu: "gpu gpus m|جي_بي_يو جي_بي_يوز", cpu: "cpu cpus m|سي_بي_يو سي_بي_يوز", ram_: "raam raam m|رام رام", ssd: "ssd ssds m|إس_إس_دي إس_إس_ديز", usb: "usb usbs m|يو_إس_بي يو_إس_بيز",
    app: "app apps m|آب آبس", browser: "browser browsers m|براوزر براوزرات", tab_: "tab tabs m|تاب تابات", link: "link links m|لنك لنكات", url: "link links m|لنك لنكات", site: "mawgi3 mawaagi3 m|موقع مواقع",
    website: "mawgi3 mawaagi3 m|موقع مواقع", homepage: "9af7a_ra2eesiyya 9afa7aat_ra2eesiyya f|صفحة_رئيسية صفحات_رئيسية", username: "username usernames m|يوزرنيم يوزرنيمز", nickname_: "lagab algaab m|لقب ألقاب", handle_: "yoozar yoozaraat m|يوزر يوزرات",
    avatar: "avatar avatars m|أفاتار أفاتارات", pfp: "9oorat_il-brofaayil 9uwar_il-brofaayil f|صورة_البروفايل صور_البروفايل", profile: "brofaayil brofaaylaat m|بروفايل بروفايلات", bio: "bio bios m|بايو بايوز", feed: "feed feed m|فيد فيد",
    follower_: "mutaabi3 mutaabi3een mh|متابع متابعين", sub: "sub subs mh|سب سبز", subscriber: "mushtarik mushtarikeen mh|مشترك مشتركين", viewer_: "mushaahid mushaahideen mh|مشاهد مشاهدين", view: "mushaahada mushaahadaat f|مشاهدة مشاهدات",
    like_n: "laayk laaykaat m|لايك لايكات", comment_n: "comment comments m|كومنت كومنتات", share_n: "mushaaraka mushaarakaat f|مشاركة مشاركات", repost: "repost reposts m|ريبوست ريبوستات", retweet: "retweet retweets m|ريتويت ريتويتات",
    tweet: "tweet tweets m|تويتة تويتات", thread_: "thread threads m|ثريد ثريدات", spoiler: "spoiler spoilers m|سبويلر سبويلرز", trailer: "trailer trailers m|تريلر تريلرات", episode: "7alga 7algaat f|حلقة حلقات",
    season_: "mawsim mawaasim m|موسم مواسم", series: "musalsal musalsalaat m|مسلسل مسلسلات", anime: "anime anime m|أنمي أنمي", manga: "manga manga f|مانقا مانقا", cosplay: "cosplay cosplay m|كوسبلاي كوسبلاي",
    esports: "esports esports m|إي_سبورتس إي_سبورتس", tournament: "bu6oola bu6oolaat f|بطولة بطولات", leaderboard: "leaderboard leaderboards m|ليدربورد ليدربوردات", ranked: "ranked ranked m|رانكد رانكد", matchmaking: "matchmaking matchmaking m|ماتش_ميكنق ماتش_ميكنق",
    lobby_: "lobby lobbies m|لوبي لوبيز", squad: "squad squads m|سكواد سكوادز", duo: "duo duos m|ديو ديوز", solo_: "solo solo m|سولو سولو", trio: "trio trios m|تريو تريوز", teammate: "zameel zumala mh|زميل زملا",
    mvp: "mvp mvp m|إم_في_بي إم_في_بي", killstreak: "killstreak killstreaks m|كل_ستريك كل_ستريكس", headshot: "headshot headshots m|هيدشوت هيدشوتس", clutch: "clutch clutches m|كلتش كلتشز", ace_: "aas aasaat m|آس آسات",
    noobs: "noobs noobs mh|نوبز نوبز", pros: "pros pros mh|بروز بروز", hacker: "hacker hackers mh|هاكر هاكرز", cheater: "3'ashshaash 3'ashshaasheen mh|غشاش غشاشين", scammer: "na99aab na99aabeen mh|نصاب نصابين",
    spammer: "spammer spammers mh|سبامر سبامرز", stalker: "mutarabbi9 mutarabbi9een mh|متربص متربصين", creep: "zi7leef zi7aaleef mh|زحليف زحاليف", weirdo: "3'areeb_a6waar 3'areebeen_a6waar mh|غريب_أطوار غريبين_أطوار", loser: "faashil faashleen mh|فاشل فاشلين",
    legend: "us6oora asaa6eer mh|أسطورة أساطير", goat: "il-goat il-goat mh|القوت القوت", king: "malik mulook mh|ملك ملوك", queen: "malika malikaat fh|ملكة ملكات", boss_: "boss bosses mh|بوس بوسز",
    bestie: "bestie besties mh|بستي بستيز", bff: "bff bffs mh|بي_إف_إف بي_إف_إفز", crush: "crush crushes mh|كرش كرشز", ex: "ex exes mh|إكس إكسز", bae: "7abeebi 7abaaybi mh|حبيبي حبايبي", boo: "7abeebi 7abaaybi mh|حبيبي حبايبي",
    homie: "5ooy 5waan mh|خوي خوان", fam: "rab3 rab3 mh|ربع ربع", squad_: "rab3 rab3 mh|ربع ربع", crew: "rab3 rab3 mh|ربع ربع", gang: "rab3 rab3 mh|ربع ربع", peeps: "naas naas mh|ناس ناس",
    bruh: "5ooy 5waan mh|خوي خوان", bruv: "5ooy 5waan mh|خوي خوان", lad: "walad awlaad mh|ولد أولاد", lads: "shabaab shabaab mh|شباب شباب", bloke: "rayyal ryaayeel mh|ريال ريايل", chick: "bnayya banaat fh|بنية بنات",
    hun: "7abeebi 7abaaybi mh|حبيبي حبايبي", hon: "7abeebi 7abaaybi mh|حبيبي حبايبي", sis: "u5ti u5waat fh|أختي أخوات", cuz: "wild_3ammi wild_3ammi mh|ولد_عمي ولد_عمي",
  };
  const X7_ADJS = {
    bussin: "5a6eer 5a6eera 5a6eereen|خطير خطيرة خطيرين", cringe: "mu7rij mu7rija mu7rijeen|محرج محرجة محرجين", cringey: "mu7rij mu7rija mu7rijeen|محرج محرجة محرجين", cringy: "mu7rij mu7rija mu7rijeen|محرج محرجة محرجين",
    hardstuck: "3aalig 3aalga 3aalgeen|عالق عالقة عالقين", tilted: "mi3a99ib mi3a99iba mi3a99ibeen|معصب معصبة معصبين", janky: "m5arba6 m5arb6a m5arb6een|مخربط مخربطة مخربطين",
    buggy: "feeh_bugs feeha_bugs feehum_bugs|فيه_بقز فيها_بقز فيهم_بقز", choppy: "mga66a3 mga66a3a mga66a3een|مقطع مقطعة مقطعين", perma: "daa2im daa2ima daa2imeen|دائم دائمة دائمين", permanent: "daa2im daa2ima daa2imeen|دائم دائمة دائمين",
    legit: "a9li a9liyya a9liyyeen|أصلي أصلية أصليين", sweaty: "sweaty sweaty sweaty|سويتي سويتي سويتي", inting: "yfeed tfeed yfeedoon|يفيد تفيد يفيدون", laggy_: "ylaggig tlaggig ylaggigoon|يلقق تلقق يلققون",
    salty: "mi3a99ib mi3a99iba mi3a99ibeen|معصب معصبة معصبين", savage: "wa7shi wa7shiyya wa7shiyyeen|وحشي وحشية وحشيين", iconic: "us6oori us6ooriyya us6ooriyyeen|أسطوري أسطورية أسطوريين",
    basic: "3aadi 3aadiyya 3aadiyyeen|عادي عادية عاديين", woke: "woke woke woke|ووك ووك ووك", thirsty_: "3a6shaan 3a6shaana 3a6shaaneen|عطشان عطشانة عطشانين",
    shook: "min9idim min9idma min9idmeen|منصدم منصدمة منصدمين", unbothered: "mob mihtamm mob mihtamma mob mihtammeen|مب_مهتم مب_مهتمة مب_مهتمين", delulu: "mitwahhim mitwahhima mitwahhimeen|متوهم متوهمة متوهمين",
    clapped: "5arbaan 5arbaana 5arbaaneen|خربان خربانة خربانين", washed: "5alla9 5alla9at 5alla9aw|خلص خلصت خلصوا", cracked: "5a6eer 5a6eera 5a6eereen|خطير خطيرة خطيرين", goated: "us6oori us6ooriyya us6ooriyyeen|أسطوري أسطورية أسطوريين",
    busted: "5arbaan 5arbaana 5arbaaneen|خربان خربانة خربانين", broke_: "muflis muflisa mufliseen|مفلس مفلسة مفلسين", loaded: "3inda floos 3indha floos 3indhum floos|عنده_فلوس عندها_فلوس عندهم_فلوس",
    online_: "online online online|أونلاين أونلاين أونلاين", offline: "offline offline offline|أوفلاين أوفلاين أوفلاين", muted: "muted muted muted|ميوتد ميوتد ميوتد", banned: "mabnood mabnooda mabnoodeen|مبنود مبنودة مبنودين",
    verified: "muwaththag muwaththaga muwaththageen|موثق موثقة موثقين", viral: "viral viral viral|فايرل فايرل فايرل", trending: "trending trending trending|تريندنق تريندنق تريندنق", unseen: "ma shaafa ma shaafha ma shaafhum|ما_شافه ما_شافها ما_شافهم",
  };
  const X7_VERBS = {
    yeet: ["ramait rama rmi irmi|رميت رمى رمي ارم", { lv: 'i' }],
    ghost: ["6annasht 6annash 6annish 6annish|طنشت طنش طنش طنش", {}],
    ragequit: ["6ila3t_min_il-3a9abiyya 6ila3_min_il-3a9abiyya 6la3_min_il-3a9abiyya i6la3_min_il-3a9abiyya|طلعت_من_العصبية طلع_من_العصبية طلع_من_العصبية اطلع_من_العصبية", { lv: 'a', past: 'ragequit', pp: 'ragequit' }],
    'rage quit': ["6ila3t_min_il-3a9abiyya 6ila3_min_il-3a9abiyya 6la3_min_il-3a9abiyya i6la3_min_il-3a9abiyya|طلعت_من_العصبية طلع_من_العصبية طلع_من_العصبية اطلع_من_العصبية", { lv: 'a', past: 'rage', pp: 'rage' }],
    stan: ["=do", { tail: 'stan|ستان', obj: 'li' }],
    flex_v: ["=do", { tail: 'flex|فلكس' }],
    simp_v: ["=do", { tail: 'simp|سمب', for: '3ala' }],
    vibe: ["=do", { tail: 'vibe|فايب' }],
    sub_v: ["=do", { tail: 'sub|سب' }],
    subscribe: ["ishtarakt ishtarak shtirik ishtirik|اشتركت اشترك اشترك اشترك", { lv: 'i', to: 'fi' }],
    unsubscribe: ["al3'ait_il-ishtiraak al3'a_il-ishtiraak al3'i_il-ishtiraak al3'i_il-ishtiraak|ألغيت_الاشتراك ألغى_الاشتراك ألغي_الاشتراك ألغ_الاشتراك", { from: 'min' }],
    unfollow: ["=do", { tail: 'unfollow|أنفولو', obj: 'li' }],
    follow_: ["taaba3t taaba3 taabi3 taabi3|تابعت تابع تابع تابع", {}],
    tweet_v: ["3'arradt 3'arrad 3'arrid 3'arrid|غردت غرد غرد غرد", {}],
    retweet_v: ["=do", { tail: 'retweet|ريتويت', obj: 'li' }],
    repost_v: ["=do", { tail: 'repost|ريبوست', obj: 'li' }],
    livestream: ["=do", { tail: 'live|لايف' }],
    stream_: ["=do", { tail: 'stream|ستريم' }],
    binge: ["=do", { tail: 'binge|بنج', obj: 'li' }],
    'binge watch': ["=do", { tail: 'binge|بنج', obj: 'li' }],
    doomscroll: ["=do", { tail: 'scroll|سكرول' }],
    rizz_v: ["=do", { tail: 'rizz|رز', obj: 'li' }],
    gaslight_: ["=do", { tail: 'gaslight|قاسلايت', obj: 'li' }],
    clown: ["=do", { tail: 'clown|كلاون', obj: '3ala' }],
    roast_s: ["=do", { tail: 'roast|روست', obj: 'li' }],
    rek: ["dammart dammar dammir dammir|دمرت دمر دمر دمر", {}],
    pwn: ["hazamt hazam hzim ihzim|هزمت هزم هزم اهزم", { lv: 'i' }],
    own_: ["hazamt hazam hzim ihzim|هزمت هزم هزم اهزم", { lv: 'i' }],
    clutch_v: ["=do", { tail: 'clutch|كلتش', obj: 'li' }],
    carry_: ["=do", { tail: 'carry|كاري', obj: 'li' }],
    boost: ["=do", { tail: 'boost|بوست', obj: 'li' }],
    grind_: ["=do", { tail: 'grind|قرايند' }],
    smurf_v: ["=do", { tail: 'smurf|سمرف' }],
    grief: ["=do", { tail: 'grief|قريف', obj: '3ala' }],
    camp_: ["=do", { tail: 'camp|كامب' }],
    gank: ["=do", { tail: 'gank|قانك', obj: 'li' }],
    respawn_: ["=do", { tail: 'respawn|ريسبون' }],
    despawn: ["i5tafait i5tafa 5tifi i5tifi|اختفيت اختفى اختفي اختف", { lv: 'i' }],
    oneshot: ["=do", { tail: 'oneshot|ون_شوت', obj: 'li' }],
    'one shot': ["=do", { tail: 'oneshot|ون_شوت', obj: 'li' }],
    unlock: ["fakkait fakk fikk fikk|فكيت فك فك فك", {}],
    equip: ["labbast labbas labbis labbis|لبست لبس لبس لبس", {}],
    unequip: ["galla3t galla3 galli3 galli3|قلعت قلع قلع قلع", {}],
    craft: ["=do", { tail: 'craft|كرافت', obj: 'li' }],
    enchant: ["=do", { tail: 'enchant|إنشانت', obj: 'li' }],
    forge_: ["=do", { tail: 'forge|فورج', obj: 'li' }],
    merge_: ["dammajt dammaj dammij dammij|دمجت دمج دمج دمج", {}],
    salvage: ["=do", { tail: 'salvage|سالفج', obj: 'li' }],
    loot_: ["=do", { tail: 'loot|لوت', obj: 'li' }],
    autoattack: ["=do", { tail: 'auto attack|أوتو أتاك' }],
  };
  const X7_ADVS = {
    atm: "il7een|الحين", rn: "il7een|الحين", irl: "fil-7ageega|في الحقيقة", obv: "waa9'i7|واضح", obvi: "waa9'i7|واضح", defo: "akeed|أكيد", deffo: "akeed|أكيد", lowkey_: "bi9raa7a|بصراحة",
    highkey_: "9idj|صدج", frfr: "wallah|والله", fr_: "wallah|والله", ong: "wallah|والله", istg: "wallah|والله", legit_: "9idj|صدج", srsly: "bjadd|بجد", obviously_: "waa9'i7|واضح",
    tbf: "bil-in9aaf|بالإنصاف", nocap: "9idj|صدج", lol_: "haha|ههه", periodt: "w5alaa9|وخلاص", asf: "~wayed|وايد", af: "~wayed|وايد", hella: "~wayed|وايد", lowkey: "bi9raa7a|بصراحة",
  };
  const X7_FIXED = {
    'fyi': "lil-3ilm|للعلم", 'bbl': "barja3 ba3dain|برجع بعدين", 'bbs': "barja3 bsur3a|برجع بسرعة", 'iirc': "idha adhkur 9a7|إذا أذكر صح", 'okie': "tamaam|تمام", 'oki': "tamaam|تمام", 'okie dokie': "tamaam|تمام", 'okey': "tamaam|تمام",
    'hyd': A3("shlonak|شلونك", "shlonich|شلونج", "shlonkum|شلونكم"), 'stfu': A3("sidd 7algak|سد حلقك", "siddi 7algich|سدي حلقج", "siddoo 7algkum|سدوا حلقكم"), 'gtfo': A3("inga6i3|انقطع", "inga6i3i|انقطعي", "inga6i3oo|انقطعوا"),
    'got rekt': "indammar|اندمر", 'u got rekt': A3("indammart|اندمرت", "indammarti|اندمرتي", "indammartu|اندمرتوا"), 'you got rekt': A3("indammart|اندمرت", "indammarti|اندمرتي", "indammartu|اندمرتوا"), 'i got rekt': "indammart|اندمرت",
    'rekt': "mdammar|مدمر", 'get rekt': A3("ru7t feeha|رحت فيها", "ri7ti feeha|رحتي فيها", "ri7tu feeha|رحتوا فيها"), 'got pwned': "inhazam|انهزم", 'pwned': "inhazam|انهزم", 'u got pwned': A3("inhazamt|انهزمت", "inhazamti|انهزمتي", "inhazamtu|انهزمتوا"),
    'ilysm': A3("a7ibbak wayed|أحبك وايد", "a7ibbich wayed|أحبج وايد", "a7ibbkum wayed|أحبكم وايد"), 'ily': A3("a7ibbak|أحبك", "a7ibbich|أحبج", "a7ibbkum|أحبكم"), 'ily2': A3("wana ba3ad a7ibbak|وأنا بعد أحبك", "wana ba3ad a7ibbich|وأنا بعد أحبج", "wana ba3ad a7ibbkum|وأنا بعد أحبكم"),
    'hmu': A3("kallimni|كلمني", "kallimeeni|كلميني", "kallimooni|كلموني"), 'hit me up': A3("kallimni|كلمني", "kallimeeni|كلميني", "kallimooni|كلموني"), 'gmorning': "9abaa7 il-5air|صباح الخير", 'gnight': A3("ti9ba7 3ala 5air|تصبح على خير", "ti9ba7een 3ala 5air|تصبحين على خير", "ti9ba7oon 3ala 5air|تصبحون على خير"),
    'xoxo': "bosaat|بوسات", 'gz': "mabrook|مبروك", 'gratz': "mabrook|مبروك", 'grats': "mabrook|مبروك", 'hbd': A3("kil sana winta 6ayyib|كل سنة وانت طيب", "kil sana winti 6ayyiba|كل سنة وانتي طيبة", "kil sana wintum 6ayyibeen|كل سنة وانتم طيبين"),
    'hny': "kil 3aam wintum b5air|كل عام وانتم بخير", 'happy new year': "kil 3aam wintum b5air|كل عام وانتم بخير", 'happy eid': "3eedkum mubaarak|عيدكم مبارك", 'eid mubarak': "3eedkum mubaarak|عيدكم مبارك", 'ramadan kareem': "ramadan kareem|رمضان كريم", 'ramadan mubarak': "ramadan mubaarak|رمضان مبارك",
    'that is a w': "hadhi fawz|هذي فوز", 'thats a w': "hadhi fawz|هذي فوز", 'big w': "fawz chibeer|فوز چبير", 'take the l': A3("tagabbal il-5asaara|تقبل الخسارة", "tagabbali il-5asaara|تقبلي الخسارة", "tagabbaloo il-5asaara|تقبلوا الخسارة"), 'that is an l': "hadhi 5asaara|هذي خسارة", 'thats an l': "hadhi 5asaara|هذي خسارة", 'big l': "5asaara chibeera|خسارة چبيرة",
    'l bozo': "5asaara ya 3'abi|خسارة يا غبي", 'rip bozo': "rip ya 3'abi|رب يا غبي", 'rq': "6ila3 min il-3a9abiyya|طلع من العصبية", 'perma banned': "mabnood lil-abad|مبنود للأبد", 'perma ban': "ban daa2im|بان دائم", 'permaban': "ban daa2im|بان دائم",
    'slay': A3("abda3t|أبدعت", "abda3ti|أبدعتي", "abda3tu|أبدعتوا"), 'you slayed': A3("abda3t|أبدعت", "abda3ti|أبدعتي", "abda3tu|أبدعتوا"), 'she slayed': "abda3at|أبدعت", 'he slayed': "abda3|أبدع", 'periodt': "w5alaa9|وخلاص", 'rent free': "bbalaash|ببلاش", 'living rent free in my head': "saakin fi raasi bbalaash|ساكن في راسي ببلاش", 'lives rent free in my head': "saakin fi raasi bbalaash|ساكن في راسي ببلاش", 'rent free in my head': "fi raasi bbalaash|في راسي ببلاش",
    'caught in 4k': "inmasak bil-jurm il-mashhood|انمسك بالجرم المشهود", 'uno reverse': "3akast-ha 3alaik|عكستها عليك", 'uno reverse card': "3akast-ha 3alaik|عكستها عليك", 'big brain': "3abgari|عبقري", 'smooth brain': "3'abi|غبي", 'galaxy brain': "3abgari|عبقري",
    '200 iq': "3abgari|عبقري", 'big oof': "ya 7asra|يا حسرة", 'oof': "aa5|آخ", 'ez clap': "sahl wayed|سهل وايد", 'get good': A3("t3allam il3ab|تعلم العب", "t3allami il3abi|تعلمي العبي", "t3allamoo il3aboo|تعلموا العبوا"), 'git gud': A3("t3allam il3ab|تعلم العب", "t3allami il3abi|تعلمي العبي", "t3allamoo il3aboo|تعلموا العبوا"),
    'skill diff': "farg mahaara|فرق مهارة", 'sksksk': "hahaha|ههههه", 'kekw': "hahaha|ههههه", 'omegalul': "hahahaha|هههههه", 'lul': "haha|ههه", 'lulw': "haha|ههه", 'monkas': "ya saatir|يا ساتر", 'pepehands': "ya 7asra|يا حسرة", 'sadge': "ya 7asra|يا حسرة",
    'copege': "it7ammal|اتحمل", 'pepelaugh': "hahaha|ههههه", '5head': "3abgari|عبقري", 'weirdchamp': "3'areeb|غريب", 'residentsleeper': "mumill|ممل", 'jebaited': "in5ada3t|انخدعت", 'kappa': "amza7|أمزح", 'pepega': "3'abi|غبي", 'pog': "waaw|واو", 'poggers': "waaw|واو", 'pogchamp': "waaw|واو",
    'ez': "sahl|سهل", 'gg ez': "gg sahl|قق سهل", 'ggez': "gg sahl|قق سهل", 'ggwp': "gg wp|قق وب", 'gg wp': "gg wp|قق وب", 'glhf': "gl hf|قل هف", 'gl hf': "gl hf|قل هف", 'wp': "wp|وب", 'gl': "gl|قل", 'hf': "hf|هف",
    'no u': A3("la inta|لا انت", "la inti|لا انتي", "la intum|لا انتم"), 'its giving': "shakla|شكله", "it's giving": "shakla|شكله", 'main character energy': "6aagat il-ba6al|طاقة البطل", 'npc behavior': "ta9arruf npc|تصرف npc", 'npc behaviour': "ta9arruf npc|تصرف npc",
    'ok boomer': "tamaam ya 3ammi|تمام يا عمي", 'and i oop': "wana oop|وأنا أوب", 'f in the chat': "f fil-chat|f في الشات", 'press f': "i9'3'a6 f|اضغط f", 'press f to pay respects': "i9'3'a6 f lil-i7tiraam|اضغط f للاحترام",
    'w/': "ma3|مع", 'w/o': "bdoon|بدون", 'b/c': "3ashaan|عشان", 'tl;dr': "il-5ulaa9a|الخلاصة", 'tldr': "il-5ulaa9a|الخلاصة", 'imo': "bra2yi|برأيي", 'imho': "bra2yi|برأيي", 'afaik': "3ala 7asab 3ilmi|على حسب علمي", 'iykyk': "illi yadri yadri|اللي يدري يدري",
    'tfw': "il-i7saas lamma|الإحساس لما", 'mfw': "wayhi lamma|ويهي لما", 'smh': "ya 5asaara|يا خسارة", 'smdh': "ya 5asaara|يا خسارة", 'fml': "ya 7a6'6'i|يا حظي", 'yolo': "ma n3eesh illa marra|ما نعيش إلا مرة", 'fomo': "5oof inni afawwit|خوف إني أفوت",
    'dm me': A3("6arrish li dm|طرش لي dm", "6arrishi li dm|طرشي لي dm", "6arrishoo li dm|طرشوا لي dm"), 'pm me': A3("6arrish li pm|طرش لي pm", "6arrishi li pm|طرشي لي pm", "6arrishoo li pm|طرشوا لي pm"), 'follow me': A3("taabi3ni|تابعني", "taabi3eeni|تابعيني", "taabi3ooni|تابعوني"), 'sub to me': A3("sawwi li sub|سو لي سب", "sawwi li sub|سوي لي سب", "sawwoo li sub|سووا لي سب"), 'like and subscribe': "laayk wishtirik|لايك واشترك", 'smash that like button': "i9'3'a6 laayk|اضغط لايك",
    'link in bio': "il-link fil-bio|اللنك في البايو", 'check my bio': "shoof il-bio maali|شوف البايو مالي", 'drop a like': "7u66 laayk|حط لايك", 'drop a follow': "sawwi follow|سو فولو", 'going live': "basawi live|بسوي لايف", 'i am live': "ana live|أنا لايف",
    'on stream': "3ala is-stream|على الستريم", 'in game': "fil-lu3ba|في اللعبة", 'ingame': "fil-lu3ba|في اللعبة", 'in the game': "fil-lu3ba|في اللعبة", 'out of game': "barra il-lu3ba|برا اللعبة", 'screen share': "share screen|شير سكرين", 'share screen': "share screen|شير سكرين", 'turn on your mic': A3("shaghghil maikak|شغل مايكك", "shaghghili maikich|شغلي مايكج", "shaghghiloo maikkum|شغلوا مايككم"), 'mic check': "mic check|مايك تشك", 'can you hear me': A3("tisma3ni|تسمعني", "tisma3eeni|تسمعيني", "tisma3ooni|تسمعوني"),
    'you are muted': A3("inta muted|انت ميوتد", "inti muted|انتي ميوتد", "intum muted|انتم ميوتد"), 'you are on mute': A3("inta muted|انت ميوتد", "inti muted|انتي ميوتد", "intum muted|انتم ميوتد"), 'unmute yourself': A3("sawwi unmute|سو أنميوت", "sawwi unmute|سوي أنميوت", "sawwoo unmute|سووا أنميوت"),
    'my internet is bad': "il-net maali shain|النت مالي شين", 'my wifi is bad': "il-wifi maali shain|الواي فاي مالي شين", 'the net is slow': "in-net ba6ee2|النت بطيء", 'the internet is slow': "in-net ba6ee2|النت بطيء", 'no signal': "ma fi shabaka|ما في شبكة", 'no internet': "ma fi net|ما في نت",
    'low battery': "il-ba66aariyya 9'a3eefa|البطارية ضعيفة", 'my phone died': "tilifooni 6afa|تلفوني طفى", 'my phone is dead': "tilifooni 6aafi|تلفوني طافي", 'my battery died': "il-ba66aariyya 5il9at|البطارية خلصت", 'out of battery': "il-ba66aariyya 5il9at|البطارية خلصت",
    'charge your phone': A3("shi7in tilifoonak|شحن تلفونك", "shi7ni tilifoonich|شحني تلفونج", "shi7noo tilifoonkum|شحنوا تلفونكم"), 'my phone is charging': "tilifooni yshi7in|تلفوني يشحن", 'the link is broken': "il-link ma yishti3'il|اللنك ما يشتغل", 'the link does not work': "il-link ma yishti3'il|اللنك ما يشتغل", 'page not found': "i9-9af7a mob mawjooda|الصفحة مب موجودة", 'error 404': "error 404|إيرور 404", 'it says error': "y6ala3 li error|يطلع لي إيرور",
  };
  Object.assign(X7_FIXED, { 'straight up': "bi9raa7a|بصراحة", 'gotcha': "fihamt 3alaik|فهمت عليك", 'binge watched': "6aala3t kil il-7algaat|طالعت كل الحلقات", 'binge watched it': "6aala3t-ha killaha|طالعتها كلها", 'binge watch it': "a6aali3-ha killaha|أطالعها كلها", 'i binge watched': "6aala3t kil il-7algaat|طالعت كل الحلقات", 'i binge watched it': "6aala3t-ha killaha|طالعتها كلها", 'binge watch': "a6aali3 kil il-7algaat|أطالع كل الحلقات", 'binge watching': "gaa3id a6aali3 kil il-7algaat|قاعد أطالع كل الحلقات",
    'bro i am dead': "5ooy ana mayyit min i9'-9'i7k|خوي أنا ميت من الضحك", 'i am dead': "mayyit min i9'-9'i7k|ميت من الضحك", 'im dead': "mayyit min i9'-9'i7k|ميت من الضحك", 'i am crying': "ab-chi min i9'-9'i7k|أبچي من الضحك", 'im crying': "ab-chi min i9'-9'i7k|أبچي من الضحك", 'crying': "ab-chi|أبچي", 'i am screaming': "a9arri5|أصرخ", 'im screaming': "a9arri5|أصرخ", 'i am weak': "ana mayyit min i9'-9'i7k|أنا ميت من الضحك", 'im weak': "ana mayyit min i9'-9'i7k|أنا ميت من الضحك",
    'not me': "mob ana|مب أنا", 'the way i': "shlon ana|شلون أنا", 'this you': A3("hadha inta|هذا انت", "hadhi inti|هذي انتي", "hadhola intum|هذولا انتم"), 'say sike': "gool amza7|قول أمزح", 'say sike rn': "gool amza7 il7een|قول أمزح الحين",
    'sike': "amza7|أمزح", 'psych': "amza7|أمزح", 'jk': "amza7|أمزح", 'jkjk': "amza7|أمزح", 'just kidding': "amza7|أمزح", 'kidding': "amza7|أمزح", 'i am kidding': "amza7|أمزح", 'im kidding': "amza7|أمزح", 'only kidding': "amza7|أمزح", 'lol jk': "haha amza7|ههه أمزح" });
  const X7_NOUN_ALIAS = { char: 'character', chars: 'character', acc: 'account', accs: 'account', pw: 'password', pwd: 'password', req: 'request', reqs: 'request', pt: 'party', pts: 'party', convo: 'conversation', convos: 'conversation',
    pic: 'picture', pics: 'picture', vid: 'video', vids: 'video', msg: 'message', msgs: 'message', txt: 'text', bday: 'birthday', wk: 'week', wks: 'week', mo: 'month', mos: 'month', yr: 'year', yrs: 'year', hr: 'hour', hrs: 'hour',
    min_: 'minute', mins: 'minute', sec: 'second', secs: 'second', noti: 'notification', notis: 'notification', notifs: 'notification', subs: 'sub', pfps: 'pfp', dms: 'dm', pms: 'pm', memes: 'meme', gifs: 'gif', emojis: 'emoji', stickers: 'sticker',
    hashtags: 'hashtag', selfies: 'selfie', stories_: 'story', reels: 'reel', podcasts: 'podcast', playlists: 'playlist', apps: 'app', links: 'link', sites: 'site', websites: 'website', usernames: 'username', avatars: 'avatar', profiles: 'profile',
    followers_: 'follower', subscribers: 'subscriber', views: 'view', likes: 'like', comments: 'comment', shares: 'share', tweets: 'tweet', spoilers: 'spoiler', trailers: 'trailer', episodes: 'episode', seasons: 'season', streamers: 'streamer',
    youtubers: 'youtuber', influencers: 'influencer', gamers: 'gamer', memers: 'meme', simps: 'simp', boomers: 'boomer', zoomers: 'zoomer', smurfs: 'smurf', tryhards: 'tryhard', hackers: 'hacker', cheaters: 'cheater', scammers: 'scammer',
    losers: 'loser', legends: 'legend', kings: 'king', queens: 'queen', besties: 'bestie', crushes: 'crush', exes: 'ex', homies: 'homie', lads_: 'lad', blokes: 'bloke', chicks: 'chick', teammates: 'teammate', squads: 'squad', duos: 'duo', trios: 'trio',
    tournaments: 'tournament', headshots: 'headshot', killstreaks: 'killstreak', clutches: 'clutch', bozos: 'bozo', normies: 'normie', weebs: 'weeb', chads: 'chad', karens: 'karen', monitors: 'monitor', keyboards: 'keyboard', headsets: 'headset', chargers: 'charger', mics: 'mic' };
  for (const [k, v] of Object.entries(X7_NOUNS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_RAW) && !(kk + '_' in NOUN_RAW)) NOUN_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X7_ADJS)) { const kk = k.replace(/_[a-z]*$/, ''); if (kk === 'salty' || (!(kk in ADJ_RAW) && !(kk + '_' in ADJ_RAW))) ADJ_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X7_VERBS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in VERB_RAW) && !(kk + '_' in VERB_RAW)) VERB_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X7_ADVS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in ADV_RAW) && !(kk + '_' in ADV_RAW)) ADV_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X7_FIXED)) { const kk = k.trim(); if (!(kk in FIXED_RAW)) FIXED_RAW[kk] = v; }
  for (const [k, v] of Object.entries(X7_NOUN_ALIAS)) { const kk = k.replace(/_[a-z]*$/, ''); if (!(kk in NOUN_ALIAS)) NOUN_ALIAS[kk] = v; }
  const NOUNS = {}, NOUN_FORM = new Map(), NOUN_PHRASE = new Map();
  for (const key of Object.keys(NOUN_RAW)) {
    const [a, b] = pair(NOUN_RAW[key]);
    const az = a.split(' '), ar = b.split(' ');
    const g = az[2] || 'm';
    const k = key.replace(/_$/, '');
    // loan: an English word used as it is (bot, video, server) → "il-bot maali", not "boti"
    NOUNS[k] = { key: k, az: sp(az[0]), azPl: sp(az[1] || az[0]), ar: sp(ar[0]), arPl: sp(ar[1] || ar[0]), g: g[0], human: g.includes('h'), loan: sp(az[0]).toLowerCase() === k || k === 'armour', proper: PROPER.has(k) };
  }
  function enPlurals(w) {
    if (/(s|x|z|ch|sh)$/.test(w)) return [w + 'es'];
    if (/[^aeiou]y$/.test(w)) return [w.slice(0, -1) + 'ies'];
    if (/[^f]fe?$/.test(w)) return [w.replace(/fe?$/, 'ves'), w + 's'];
    return [w + 's'];
  }
  function addNounForm(form, key, pl) { if (!NOUN_FORM.has(form)) NOUN_FORM.set(form, { key, pl }); }
  for (const k of Object.keys(NOUNS)) {
    if (k.includes(' ')) {   // drop rate, friend request
      const ws = k.split(' ');
      NOUN_PHRASE.set(k, { key: k, pl: false });
      for (const p of enPlurals(ws[ws.length - 1])) NOUN_PHRASE.set(ws.slice(0, -1).concat(p).join(' '), { key: k, pl: true });
      continue;
    }
    addNounForm(k, k, false); for (const p of enPlurals(k)) addNounForm(p, k, true);
  }
  for (const [a, k] of Object.entries(NOUN_ALIAS)) { if (!NOUNS[k]) continue; const pl = /s$/.test(a) && a !== k; addNounForm(a, k, pl && !NOUN_FORM.has(a)); for (const p of enPlurals(a)) addNounForm(p, k, true); }
  for (const [a, k] of Object.entries(NOUN_PL_IRR)) if (NOUNS[k]) NOUN_FORM.set(a, { key: k, pl: true });

  const ADJS = {};
  for (const key of Object.keys(ADJ_RAW)) {
    let [a, b] = pair(ADJ_RAW[key]);
    const k = key.replace(/_$/, '');
    const pre = a.startsWith('^'), defd = a.startsWith('!');
    a = a.replace(/^[\^!]/, '');
    const defNoun = a.startsWith('+');
    a = a.replace(/^\+/, '');
    const az = a.split(' '), ar = b.split(' ');
    ADJS[k] = az.length >= 3
      ? { m: sp(az[0]), f: sp(az[1]), pl: sp(az[2]), arM: sp(ar[0]), arF: sp(ar[1]), arPl: sp(ar[2]), pre, defd, defNoun }
      : { fixed: true, m: sp(a), f: sp(a), pl: sp(a), arM: sp(b), arF: sp(b), arPl: sp(b), pre, defd, defNoun };
  }
  for (const [a, k] of Object.entries(ADJ_ALIAS)) if (ADJS[k]) ADJS[a.replace(/_$/, '')] = ADJS[k];

  const VERBS = {}, VERB_FORM = new Map(), PHRASAL = new Map();
  function enVerbForms(base, o) {
    const out = { base: [base], s: [], past: [], pp: [], ing: [] };
    out.s.push(o.s || (/(s|x|z|ch|sh|o)$/.test(base) ? base + 'es' : /[^aeiou]y$/.test(base) ? base.slice(0, -1) + 'ies' : base + 's'));
    const reg = /e$/.test(base) ? base + 'd' : /[^aeiou]y$/.test(base) ? base.slice(0, -1) + 'ied' : base + 'ed';
    const dbl = /^[^aeiou]*[aeiou][bdgklmnprt]$/.test(base) ? base + base.slice(-1) : null;
    const dbl2 = !dbl && /[^aeiouwy][aeiou][bdgklmnprt]$/.test(base) && !/[aeiou][aeiou][^aeiou]$/.test(base) ? base + base.slice(-1) : null;   // forget → forgetting, admit → admitting
    if (o.past) out.past.push(...[].concat(o.past)); else { out.past.push(reg); if (dbl) out.past.push(dbl + 'ed'); }
    if (o.pp) out.pp.push(...[].concat(o.pp)); else if (o.past) out.pp.push(...[].concat(o.past)); else { out.pp.push(reg); if (dbl) out.pp.push(dbl + 'ed'); }
    out.ing.push(/ie$/.test(base) ? base.slice(0, -2) + 'ying' : /[^e]e$/.test(base) ? base.slice(0, -1) + 'ing' : base + 'ing');
    if (dbl) out.ing.push(dbl + 'ing');
    if (dbl2) { out.ing.push(dbl2 + 'ing'); if (!o.past) out.past.push(dbl2 + 'ed'); if (!o.pp && !o.past) out.pp.push(dbl2 + 'ed'); }
    return out;
  }
  function addForm(map, form, rec) { if (!map.has(form)) map.set(form, []); const list = map.get(form); if (!list.some((r) => r.key === rec.key && r.form === rec.form)) list.push(rec); }
  for (const key of Object.keys(VERB_RAW)) {
    const [spec0, o] = VERB_RAW[key];
    const spec = spec0[0] === '=' ? VERB_RAW[spec0.slice(1)][0] : spec0;   // "=do": conjugated like do, then the English word
    const [a, b] = pair(spec);
    const az = a.split(' ').map(sp), ar = b.split(' ').map(sp);
    const k = key.replace(/_$/, '');
    const v = { key: k, az, ar, lv: o.lv || '', via: o.via, to: o.to, for: o.for, at: o.at, with: o.with, about: o.about, of: o.of, obj: o.obj, objNP: o.objNP, special: o.special, io: o.io, objAlt: o.objAlt };
    if (o.ms) v.ms = pair(o.ms);
    if (o.tail) { const [x, y] = pair(o.tail); v.tail = [sp(x), sp(y)]; }
    if (o.ap) { const [x, y] = pair(o.ap); const xs = x.split(' '), ys = y.split(' '); v.ap = { m: [xs[0], ys[0]], f: [xs[1], ys[1]], pl: [xs[2], ys[2]] }; }
    if (o.pr) v.pr = Object.fromEntries(o.pr.split(' ').map((x, i) => [P8[i], x]));
    if (o.arpr) v.arpr = Object.fromEntries(o.arpr.split(' ').map((x, i) => [P8[i], x]));
    VERBS[k] = v;
    const words = k.split(' ');
    const forms = enVerbForms(words[0], o);
    for (const f of Object.keys(forms)) {
      for (const form of forms[f]) {
        if (words.length > 1) {
          if (!PHRASAL.has(form)) PHRASAL.set(form, []);
          PHRASAL.get(form).push({ key: k, form: f, particle: words.slice(1).join(' ') });
        } else {
          addForm(VERB_FORM, form, { key: k, form: f });
        }
      }
    }
  }

  const ADV = {};
  for (const [k, spec] of Object.entries(ADV_RAW)) {
    let [a, b] = pair(spec);
    const mid = a.startsWith('*'), int = a.startsWith('~'), addr = a.startsWith('@');
    a = a.replace(/^[*~@]/, '');
    if (addr) { const az = a.split(' ').reduce((acc, w, i, arr) => acc, null); }
    ADV[k] = { az: sp(a), ar: sp(b), mid, int, k };
  }
  const NUM_CONS = { three: 'thalath|ثلاث', four: 'arba3|أربع', five: '5ams|خمس', six: 'sitt|ست', seven: 'sab3|سبع',
    eight: 'thamaan|ثمان', nine: 'tis3|تسع', ten: '3ashar|عشر' };
  const NUMS = {};
  for (const [k, spec] of Object.entries(NUM_RAW)) {
    const [a, b] = pair(spec);
    NUMS[k] = { az: a, ar: b, n: NUM_VAL[k] };
    if (NUM_CONS[k]) NUMS[k].cons = pair(NUM_CONS[k]);
  }

  function parseFixed(v) {
    if (typeof v === 'string') { const [a, b] = pair(v); return { m: [a, b], f: [a, b], pl: [a, b] }; }
    const out = {};
    for (const g of ['m', 'f', 'pl']) { const [a, b] = pair(v[g]); out[g] = [a, b]; }
    return out;
  }
  const DAYS = { monday: "il-ithnain|الاثنين", tuesday: "il-thalaatha|الثلاثا", wednesday: "il-arba3a|الأربعا",
    thursday: "il-5amees|الخميس", friday: "il-yim3a|الجمعة", saturday: "is-sabt|السبت", sunday: "il-a7ad|الأحد" };
  for (const [d, v] of Object.entries(DAYS)) {
    const [a, b] = pair(v);
    FIXED_RAW[d] = v;
    FIXED_RAW['on ' + d] = 'yoom ' + a + '|يوم ' + b;
    FIXED_RAW['next ' + d] = a + ' il-yay|' + b + ' الياي';
    FIXED_RAW['last ' + d] = a + ' illi faat|' + b + ' اللي فات';
  }
  const FIXED = new Map(Object.entries(FIXED_RAW).map(([k, v]) => [k, parseFixed(v)]));
  let MAXPHRASE = 1;
  for (const k of [...FIXED.keys(), ...Object.keys(MULTI), ...Object.keys(MODAL_MULTI)]) MAXPHRASE = Math.max(MAXPHRASE, k.split(' ').length);

  /* When a fixed expression may be used.
     START: only at the start of a sentence (commands, greetings).
     END: only when nothing important follows ("i see" but not "i see him"). */
  const FIX_START = new Set(['help me', 'tell me', 'let me know', 'come here', 'wait a minute', 'wait a second', 'hold on', 'hurry up',
    'be careful', 'take care', 'be quiet', 'shut up', 'go ahead', 'do not worry', 'come on', 'see you', 'see you later', 'see you soon',
    'see you tomorrow', 'excuse me', 'never mind', 'good luck', 'good game', 'good job', 'great job', 'nice one', 'well done', 'good night',
    'good morning', 'good evening', 'good afternoon', 'welcome', 'welcome back', 'congratulations', 'congrats', 'happy birthday', 'bye',
    'goodbye', 'bye bye', 'no problem', 'no worries', 'here you go', 'one moment', 'just a moment', 'be right back', 'i will be right back',
    'gg', 'coming', 'do not know', 'good luck with', 'welcome to', 'welcome back to', 'thank you', 'thanks', 'thank you very much', 'thank you so much', 'thanks a lot', 'thank you for', 'thanks for',
    'take care of yourself', 'take care of yourselves', 'wish me luck', 'make sure to', 'peace', 'peace out', 'stop it', 'have fun', 'will do', 'you got this',
    'same', 'same here', 'my bad', 'back', 'i am back', 'help', 'rip', 'lets go', 'let us go', 'here we go', 'one sec', 'one second', 'one min', 'one minute', 'brb food',
    'appreciate it', 'i appreciate it', 'much appreciated', 'appreciated', 'talk tomorrow', 'talk later', 'talk soon', 'one more thing', 'join my room', 'see you all',
    'wait',
    'i hope you feel better soon', 'hope you feel better soon', 'i hope you feel better', 'hope you feel better', 'touch grass', 'say less',
    'peace be upon you', 'peace be upon you all', 'salam', 'salaam', 'salam alaikum', 'salaam alaikum', 'salam alaykum', 'salam aleikum', 'assalamu alaikum', 'assalam alaikum',
    'assalamu alaykum', 'as salamu alaykum', 'salamu alaikum', 'salam 3alaikum', 'salam 3alaykum', 'and peace be upon you', 'and peace be upon you too', 'peace be upon you too',
    'walaikum salam', 'walaikum assalam', 'wa alaikum salam', 'wa alaikum assalam', 'walaykum salam', 'wa alaykum salam',
    'nice to meet you too', 'nice meeting you too', 'glad to meet you too', 'nice meeting you', 'it was nice meeting you', 'glad to meet you', 'pleased to meet you', 'good to meet you',
    'it was nice to meet you', 'that would be great', 'that would be nice', 'that would be awesome', 'that would be perfect', 'that would be amazing', 'that would be cool',
    'that will be great', 'it would be great', 'that would be good', 'that would be fine', 'that is very kind of you', 'that is so kind of you', 'that is kind of you', 'very kind of you',
    'so kind of you', 'you are too kind', 'you are so kind', 'you are very kind', 'that is very nice of you', 'that is nice of you', 'so nice of you', 'very nice of you',
    'i am glad i met you', 'glad i met you', 'i am happy i met you', 'happy i met you', 'i am glad i met you too', 'glad i met you too', 'thanks again', 'thank you again', 'see you all tomorrow', 'see you all later', 'get well soon', 'good luck everyone', 'good luck guys',
    'thanks everyone', 'thank you everyone', 'thanks guys', 'thank you guys', 'thanks everyone for', 'thank you everyone for', 'thanks guys for', 'thank you guys for', 'good morning everyone', 'good morning guys', 'good evening everyone', 'good evening guys', 'good night everyone', 'good night guys',
    'take a seat', 'have a seat', 'go away', 'back off', 'step back', 'move over', 'look out', 'watch out', 'heads up', 'cheer up', 'chill out', 'hands up', 'knock it off', 'never give up', 'do not give up', 'aha', 'whew', 'darn', 'bingo', 'voila', 'tada']);
  const FIX_END = new Set(['where are you', 'how are you', 'what are you doing', 'what is your name', 'where are you from', 'i see', 'i understand', 'got it', 'i agree', 'i think so', 'i do not think so', 'i am fine', 'i am good',
    'i am ok', 'i am okay', 'i am coming', 'whatever', 'and you', 'what about you', 'me too', 'me neither', 'how much', 'exactly',
    'how about you', 'what is yours', 'what about yours', 'how about yours', 'and yours', 'you too', 'i am doing well', 'i am doing good', 'i am doing fine', 'i am doing ok',
    'i am doing okay', 'i am doing great', 'doing well', 'doing good', 'doing fine', 'doing great', 'i am well', 'i am great', 'i am alright', 'i am all right', 'all good',
    'would be great', 'would be nice',
    'seriously', 'for real', 'no way', 'let us go', 'it is ok', 'it is okay', 'it is fine', 'like this', 'like that', 'this way', 'what happened',
    'i would love to', 'sounds good to me', 'why not', 'whatever you want', 'it is up to you', 'up to you', 'worth it', 'it is worth it', 'it was worth it',
    'is it worth it', 'was it worth it', 'you up', 'you there', 'are you there', 'probably not', 'same', 'same here', 'my bad', 'facts', 'can not wait', 'i can not wait',
    'by mistake', 'by accident', 'for a bit', 'for a little bit', 'for a little while', 'i do not care', 'i do not care anymore', 'bet', 'say less', 'skill issue', 'touch grass',
    'no shot', 'my guy', 'my man', 'my boy', 'cope', 'cope harder', 'i am cooked', 'we are cooked', 'you are cooked', 'he is cooked', 'she is cooked', 'they are cooked', 'cooked',
    'hope so', 'i hope so', 'i hope not', 'hope not', 'my dearest', 'since school', 'since high school', 'since college', 'since university', 'feel better', 'feel better soon', 'whatever you want']);
  const FIX_KNOW = new Set(['i do not know', 'do not know', 'i have no idea', 'no idea', 'i know']);
  const STARTERS = new Set(['and', 'but', 'so', 'then', 'ok', 'okay', 'yes', 'yeah', 'no', 'oh', 'wow', 'haha', 'lol', 'hi', 'hello', 'hey',
    'well', 'bro', 'dude', 'guys', 'now', 'alright', 'also', 'man', 'please', 'everyone',
    'okie', 'oki', 'okey', 'kk', 'k', 'cool', 'nice', 'great', 'perfect', 'awesome', 'yep', 'yup', 'nah', 'nope', 'sure', 'right', 'true', 'omg', 'lmao', 'lmfao', 'rofl', 'xd', 'yo', 'sup', 'hala', 'anyway', 'anyways', 'btw', 'ah', 'aah', 'ohh', 'ooh', 'hmm', 'huh', 'uh', 'um', 'aight', 'ty', 'thx', 'thanks', 'bruh', 'sis', 'fam', 'homie', 'mate', 'bud', 'buddy', 'sir', 'miss', 'boss', 'chief', 'brother', 'sister', 'habibi', 'ya']);
  const ENDERS = new Set(['and', 'but', 'so', 'bro', 'dude', 'guys', 'man', 'everyone', 'please', 'too', 'again', 'now', 'then', 'lol',
    'haha', 'thanks', 'ok', 'okay', 'anyway', 'today', 'tonight', 'here', 'there', 'my', 'doing', 'i', 'we', 'tho', 'though', 'btw', 'rn', 'bruh', 'smh', 'lmao', 'xd']);
  function startish(toks, i) {
    let j = i - 1;
    while (j >= 0 && toks[j].w === 'please') j--;
    if (j < 0) return true;
    const t = toks[j];
    return !!(t.punct || STARTERS.has(t.w));
  }
  function samePhraseBefore(toks, i, n) {
    if (i - n < 0) return false;
    for (let k = 0; k < n; k++) if (!toks[i - n + k] || toks[i - n + k].w !== toks[i + k].w) return false;
    return true;
  }
  function endish(toks, k) { const t = toks[k]; return !t || !!t.punct || ENDERS.has(t.w); }
  function fixedFits(key, toks, i, n) {
    const prev = toks[i - 1], next = toks[i + n];
    if (FIX_START.has(key) && !startish(toks, i) && !samePhraseBefore(toks, i, n)) return false;
    if (FIX_END.has(key) && !endish(toks, i + n)) return false;
    if (FIX_KNOW.has(key) && !(endish(toks, i + n) || (next && (WH[next.w] || ['if', 'that', 'about', 'anything', 'whether'].includes(next.w))))) return false;
    if (FIX_KNOW.has(key) && next && next.w === 'that' && toks[i + n + 1] && !toks[i + n + 1].punct && (NOUN_FORM.has(toks[i + n + 1].w) || ADJS[toks[i + n + 1].w] || toks[i + n + 1].w === 'one')) return false;   // i know that guy
    if (FIX_KNOW.has(key) && next && WH[next.w] && toks[i + n + 1] && toks[i + n + 1].w === 'to') return false;
    const lastW = key.split(' ').pop();
    if (DEM[lastW] && next && !next.punct && (NOUN_FORM.has(next.w) || ADJS[next.w])) return false;
    if ((key === 'like this' || key === 'like that') && prev && (PRON_SUBJ[prev.w] || AUX.has(prev.w) || MODAL[prev.w] || prev.w === 'to' || prev.w === 'not')) return false;
    if ((key === 'i figured' || key === 'i figure') && next && !next.punct && ['it', 'out', 'this', 'that', 'the', 'him', 'her', 'them', 'my', 'your', 'a', 'an'].includes(next.w)) return false;
    if (key === 'got it' && prev && !prev.punct && (PRON_SUBJ[prev.w] || prev.w === 'you' || ['finally', 'just', 'already', 'never'].includes(prev.w))) return false;
    if (key === 'so sorry' && prev && !prev.punct && !STARTERS.has(prev.w)) return false;
    if ((key === 'a while' || key === 'a long time') && next && !next.punct && (NOUN_FORM.has(next.w) || ADJS[next.w])) return false;
    if (key === 'to work' && !(prev && (verbInfo(prev.w) || []).some((r) => ['go', 'come', 'drive', 'walk', 'run', 'return', 'go back', 'get back'].includes(r.key)))) return false;
    if (key === 'at work' && next && !next.punct && (verbInfo(next.w) || []).length && !NOUN_FORM.has(next.w)) return false;
    return true;
  }

  /* ====================================================================== */
  /*  Spelling fixes for the English input                                   */
  /* ====================================================================== */
  const COMMON_TYPOS = {
    teh: 'the', hte: 'the', adn: 'and', taht: 'that', jsut: 'just', dont: 'do not', seperate: 'separate', seperated: 'separated',
    becuase: 'because', beacuse: 'because', becasue: 'because', bcz: 'because', bcuz: 'because', realy: 'really', reallly: 'really',
    thier: 'their', freind: 'friend', freinds: 'friends', frend: 'friend', frends: 'friends', alot: 'a lot', wich: 'which',
    definately: 'definitely', untill: 'until', tommorow: 'tomorrow', tomorow: 'tomorrow', tommorrow: 'tomorrow', recieve: 'receive',
    beleive: 'believe', expirience: 'experience', experiance: 'experience', expierence: 'experience', expirence: 'experience',
    experince: 'experience', befor: 'before', gona: 'going to', wana: 'want to', r: 'are', ppl: 'people', gud: 'good',
    nite: 'night', luv: 'love', wat: 'what', wut: 'what', da: 'the', dat: 'that', dis: 'this', yea: 'yeah', ofc: 'of course',
    tho: 'though', thru: 'through', abt: 'about', wht: 'what', hw: 'how', wen: 'when', wer: 'where', hav: 'have', hve: 'have',
    kno: 'know', knw: 'know', thnk: 'think', thanx: 'thanks', thnx: 'thanks', pleas: 'please', plase: 'please', sory: 'sorry',
    sorri: 'sorry', srry: 'sorry', sry: 'sorry', becoz: 'because', bcoz: 'because', wanna: 'want to', gonna: 'going to',
    somthing: 'something', someting: 'something', evry: 'every', everyting: 'everything', anyting: 'anything', nothin: 'nothing',
    probaly: 'probably', probly: 'probably', diffrent: 'different', intresting: 'interesting', togather: 'together', togeather: 'together',
    simpel: 'simple', simle: 'simple', verry: 'very', vary: 'very', mak: 'make', makeing: 'making', playng: 'playing', plaing: 'playing',
    gaem: 'game', gmae: 'game', gams: 'games', gmes: 'games', vidoe: 'video', vedio: 'video', vidio: 'video', progam: 'program',
    programing: 'programming', langauge: 'language', languge: 'language', arabice: 'arabic', englsh: 'english', engilsh: 'english'
  };
  const NO_FIX = new Set(['ok', 'okay', 'lol', 'gg', 'bro', 'omg', 'idk', 'brb', 'haha', 'hahaha', 'hmm', 'umm', 'uh', 'ah', 'oh', 'wow', 'yo']);
  const X_TYPOS = { travelling: 'traveling', travelled: 'traveled', traveller: 'traveler', travellers: 'travelers', cancelling: 'canceling', cancelled: 'canceled', labelled: 'labeled', labelling: 'labeling',
    modelling: 'modeling', modelled: 'modeled', levelled: 'leveled', levelling: 'leveling', signalling: 'signaling', signalled: 'signaled', totalled: 'totaled', marvelled: 'marveled', quarrelled: 'quarreled',
    fuelled: 'fueled', dialled: 'dialed', dialling: 'dialing', centre: 'center', centres: 'centers', theatre: 'theater', theatres: 'theaters', litre: 'liter', litres: 'liters', fibre: 'fiber',
    organise: 'organize', organised: 'organized', organising: 'organizing', recognise: 'recognize', recognised: 'recognized', apologise: 'apologize', apologised: 'apologized', apologising: 'apologizing',
    criticise: 'criticize', criticised: 'criticized', realised: 'realized', realising: 'realizing', memorise: 'memorize', memorised: 'memorized', defence: 'defense', offence: 'offense', licence: 'license',
    grey: 'gray', pyjamas: 'pajamas', tyre: 'tire', tyres: 'tires', cheque: 'check', analyse: 'analyze', analysed: 'analyzed', paralysed: 'paralyzed', catalogue: 'catalog', aeroplane: 'airplane', cosy: 'cozy',
    whisky: 'whiskey', doughnut: 'donut', doughnuts: 'donuts', mould: 'mold', plough: 'plow', sceptical: 'skeptical', storey: 'floor', kerb: 'curb', draught: 'draft', ageing: 'aging', judgement: 'judgment',
    fulfil: 'fulfill', instalment: 'installment', skilful: 'skillful', wilful: 'willful', enrolment: 'enrollment', aluminium: 'aluminum', maths: 'math', learnt: 'learned', dreamt: 'dreamed', burnt: 'burned',
    spelt: 'spelled', smelt: 'smelled', spoilt: 'spoiled', leapt: 'leaped', knelt: 'kneeled', favourite: 'favorite', favourites: 'favorites', behaviour: 'behavior', neighbour: 'neighbor', neighbours: 'neighbors',
    flavour: 'flavor', flavours: 'flavors', honour: 'honor', honours: 'honors', labour: 'labor', harbour: 'harbor', humour: 'humor', rumour: 'rumor', rumours: 'rumors', armour: 'armor', savour: 'savor',
    programme: 'program', programmes: 'programs', aint: 'is not', "ain't": 'is not', gimme: 'give me', lemme: 'let me', gotta: 'have to', kinda: 'kind of', sorta: 'sort of', outta: 'out of', dunno: 'do not know', tryna: 'trying to',
    finna: 'going to', whatcha: 'what are you', cuz: 'because', coz: 'because', cos: 'because', nvm: 'never mind', prolly: 'probably', fav: 'favorite', fave: 'favorite', dislike: 'do not like', dislikes: 'does not like', disliked: 'did not like', disliking: 'not liking',
    y: 'why', c: 'see', n: 'and', k: 'ok', b: 'be', m8: 'mate', l8: 'late', l8r: 'later', l8er: 'later', w8: 'wait', h8: 'hate', gr8: 'great', sk8: 'skate', str8: 'straight', '2moro': 'tomorrow', '2morrow': 'tomorrow', '2mrw': 'tomorrow',
    '2day': 'today', '2nite': 'tonight', '2night': 'tonight', b4: 'before', tmw: 'tomorrow', tmrw: 'tomorrow', tmr: 'tomorrow', tmrrw: 'tomorrow', tonite: 'tonight', 'w/': 'with', 'w/o': 'without', hyd_: 'how are you doing', hru: 'how are you', wyd: 'what are you doing',
    wbu: 'what about you', hbu: 'what about you', ikr: 'i know right', frfr_: 'for real', ilysm_: 'i love you so much', gmorning_: 'good morning', gnight_: 'good night', nite_: 'night', thanq: 'thank you', thankyou: 'thank you', tq: 'thank you', tyty: 'thank you',
    congratz: 'congrats', congratulation: 'congratulations', wlcm: 'welcome', wlc: 'welcome', welcum: 'welcome', wat: 'what', wot: 'what', wen: 'when', wer: 'where', wea: 'where', wher: 'where', ther: 'there', thr: 'there', wid: 'with', wit: 'with', wiv: 'with',
    ova: 'over', eva: 'ever', neva: 'never', betta: 'better', betcha: 'bet you', dontcha: 'do not you', wontcha: 'will not you', aight: 'alright', ight: 'alright', ard: 'alright', aite: 'alright', fone: 'phone', foto: 'photo', fotos: 'photos',
    kewl: 'cool', kool: 'cool', coo: 'cool', sik: 'sick', dope_: 'dope', lame_: 'lame', wack: 'bad', whack_: 'bad', cray: 'crazy', craycray: 'crazy', obvs: 'obviously', tho_: 'though', altho: 'although', thru_: 'through', enuf: 'enough', enuff: 'enough', nuff: 'enough',
    lotta: 'a lot of', lotsa: 'lots of', kinda_: 'kind of', hafta: 'have to', hasta: 'has to', oughta: 'ought to', shoulda: 'should have', coulda: 'could have', woulda: 'would have', musta: 'must have', mighta: 'might have', gimme_: 'give me', lemme_: 'let me',
    ima: 'i am going to', imma: 'i am going to', iam: 'i am', youre: 'you are', theyre: 'they are', weve: 'we have', youve: 'you have', theyve: 'they have', ive: 'i have', hes: 'he is', shes: 'she is', thats: 'that is', whats: 'what is', wheres: 'where is', hows: 'how is', whos: 'who is', isnt: 'is not', arent: 'are not', wasnt: 'was not', werent: 'were not', doesnt: 'does not', didnt: 'did not', cant: 'can not', couldnt: 'could not', wouldnt: 'would not', shouldnt: 'should not', wont: 'will not', havent: 'have not', hasnt: 'has not', hadnt: 'had not', aint_: 'is not' };
  let VOCAB = null;
  function vocab() {
    if (VOCAB) return VOCAB;
    const v = new Map();
    let r = 0;
    const add = (w) => { if (w && /^[a-z]+$/.test(w) && !v.has(w)) v.set(w, r++); };
    [PRON_SUBJ, PRON_OBJ, PRON_POSS, PRON_OWN, DET, WH, CONJ, PREP, MODAL, DEM].forEach((o) => Object.keys(o).forEach(add));
    AUX.forEach(add);
    ['not', 'never', 'to', 'there', 'here', 'yes', 'no', 'very', 'so', 'too', 'really', 'please', 'like', 'many', 'much', 'few', 'several', 'just', 'old'].forEach(add);
    for (const k of FIXED.keys()) k.split(' ').forEach(add);
    for (const k of Object.keys(MULTI)) k.split(' ').forEach(add);
    for (const k of Object.keys(MODAL_MULTI)) k.split(' ').forEach(add);
    Object.keys(ADV).forEach(add);
    Object.keys(NUMS).forEach(add);
    for (const k of VERB_FORM.keys()) add(k);
    for (const k of PHRASAL.keys()) add(k);
    for (const k of NOUN_FORM.keys()) add(k);
    Object.keys(ADJS).forEach(add);
    for (const k of Object.keys(EXPAND)) { add(k); EXPAND[k].split(' ').forEach(add); }
    VOCAB = v;
    return v;
  }
  for (const k of Object.keys(X_TYPOS)) if (!Object.prototype.hasOwnProperty.call(COMMON_TYPOS, k) && !vocab().has(k)) COMMON_TYPOS[k] = X_TYPOS[k];   // UK spellings and chat contractions the tables do not know
  function osa(a, b, max) {
    const la = a.length, lb = b.length;
    if (Math.abs(la - lb) > max) return max + 1;
    let prev2 = null, prev = Array.from({ length: lb + 1 }, (_, j) => j);
    for (let i = 1; i <= la; i++) {
      const cur = [i];
      let rowMin = i;
      for (let j = 1; j <= lb; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let d = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d = Math.min(d, prev2[j - 2] + 1);
        cur.push(d);
        if (d < rowMin) rowMin = d;
      }
      if (rowMin > max) return max + 1;
      prev2 = prev; prev = cur;
    }
    return prev[lb];
  }
  const sortedLetters = (w) => w.split('').sort().join('');
  /* Returns the corrected spelling, or null when the word looks fine or no safe fix exists. */
  /* Real English words that are close to a word the translator knows (fever ~ never). They are never "fixed".
     Made from the SCOWL word lists (Kevin Atkinson, free to use) by gen_real_words.js. */
  const EN_REAL = /*EN_REAL*/'abler abound accept accepts accidents accounted accurately aces acre acres acts actuality administration administrators admits adventured adventurer adventurers adventurous afternoons aged aground aiding aids ails aims airs akin alight allays ally alter amazingly amble amps annoyingly anythings apples applicator applicators appreciable appreciation appreciations appreciative approximate approximated approximates arbors arbour arbours archiving arcing arcs ardent ardors ardour ardours area ares armory armouries armoury arse ascent ascents ashing attach attached attaching attacker attaining attesting attracted attracting auction auctions avoidable awaken awakes axed axis axle axles backs bade bait baking bald bale baling band banded banding bands bang banged banging bangs bani banked banking banner barb bard baring barn barns basing basses bats batter battering batters battled baud baying beached bead beading beads beak beaks beaming bean beaned beaning beans bearing beast beasts beater beautifully beckoning beeches beginning beginnings beguiling behinds beings belches believer believers bellow belting benches bend bends bereaving beset besieging besting bests beta bets betters betting bettor binned binning bite bits bitter blacked blacking blacks blank blanks bleach bleaches bleat bleating bleats bled bloc blockaded blockading blockhead blocs blot blotching blots blow blows blued bluer blues bluff bluffed bluffing bluffs boasts boat boating boats boding body bolt bolts boning bony booing boos boot booth boots bore bossed bossy botch bother bothers bottle bottles bough boughs bout bouts bowing bowl bowls boxing braking bran breach breaches breaching breading breakfasted breasting breathers breathing bred breeds bridging brinks broads broker brook brooks broth brotherly brow browns brows brush buffer buffering buffet buffeting bugger buggers buildings bung buoy buoying buoys burner burners burrow burrowed burrowing burrows bury burying bushy busing busses bust busying buts butt butter buttery byes byte cabled cabling caging caking calked calking caller callings callus callusing calmer cameo cameos camp cane caning cannon cans caped caper capers caps card carded carding cards carefully caress carolling carp carped carping carps carriages carrier carriers cart carted carting carts carve carved carves carving case cases cash cashed cashes cashing casing cast casting casts caused caving cawing ceding cellophane cementing chafed chafing chains chanced chancing channeled chant chanted chanting chants chap char characterise charmed charming charred charring chars chart charted charter charters charting charts chased chasing chatter chattered chattering cheapen cheapness cheat cheated cheating cheats checker cheeked cheeking cheeks chickened chicks chiller chilli chilly chiseling chiselled chiselling choirs choked choking choosiest choosy chorusing chucked chucking chuckling chucks chute cites clacked clacking clacks clam clams clang clanged clanging clangs clank clanks clap clashed clashes clashing clasps classed classy clause clauses cleaner cleanse cleansed cleansing cleared clearing clearings clears cleats cleaved cleaver cleaving clinching clinked clinking clinks clocked clocking clocks clod clones closet closeting closets clothe clothed cloths clover cloves clucked clucking clucks coarse coast coasting coasts coat coated coating coats cocked cocking codded codding cods coffer coffers coked coking colds collating collection collections collective collector collectors colons coloureds combing comet comets comings commanded commanding commenced commences commencing commend commended commending commends committed committing communing commuter commuters commuting compacted compacter compacting companion companions compasses compelled compelling compete competed competes competing compilers completely completer completest completion complexes complying composers composted composting compute computed computerise computes computing conceited concerted concerting concocted concocting condensation condensations conducted conducting confining congested congesting congratulating connection connections connective connector connectors connoting cons consented consenting conservation consoled contacted contacting contained containing contended contending contented contenting contested contesting continual continuity continuous continuum contracts contrasts contrives controlled conversational conversion conversions converted converting convicted convicting convinced convinces convincing cooed cooing cooker cooled coolers cooling cools cooped cooper cooping coos coping corded cording coring corked corking corrected correcter correcting correctly corrector corrects corseting costings costuming cots counties county coursed courser cowing cozy crap crate crated crates crating creaked creaking creamed creaming crease creased creases creasing creations creatives creatures crediting cremate cremated cremates cremating crested cresting crimes crises crook crooked crooking crooks crushed crushes crushing cubs cues culled culling cums cups curing curried curries currying curse curses cuter cuts czar czars dabbed dabbing damaged damns dams dancer dancers danger dangers dank daring daub daubed daubing daubs dawn deals dealt decade decades deceit deceiving decidedly declining decode decoded decodes decoding defeating defecting deflating deflected deflecting deign deigned deigning deigns dejecting delays delegated delegates delegating deletions deliciously delirious demon demons deplete depleted depletes depleting depriving deride derided derides deriding derive derives deriving descent descriptive descriptor descriptors deserting designated designating designer designers desisting destining detecting detesting dice diced dices diet diets difference differently differing difficulty dike diked dikes dill dills dime dimes dims dine dined diner diners dines dinned dips dire dirt discard discards discorded dive dived dives diving doers doles doling doll dolls domed domes doming donor donors doped dopes dopey doping dose doses dosing dotes doting dove doves downgraded downgrading downs downy dozes dozing draped draping draughtier drawl drawling drawls dread dreads dreamt dreamy dried dries dripped dripping drivel driveling drivels driver drivers drone droned droning droop drooped drooping droops droppings droves drown drunks drying duded dudes duding dull dulls dunces dunk duping dyeing earl earthlier easing east edict edicts eighteens eighteenth eighth eights elevens emigrated emigrates endearing endings engineers envoys evens exampled exceed exceeding excelled excellence excellently excelling excepting excess excessive excise excised excite excites exclaimed exclaiming excreting excused excuses exited exiting expansive expediencies expediency expelling expels experienced exploited exploiting explosive expressive extensive extincted extincting extraction extractions extradited extraditing extremest extremity extricated extricating eyed faced facet facetious facets fact faeces failings fair faked fakes falling falter famed familiars farce farces fare fared faring farmer fasted fasten fasts fats fatter fattest faulty favorites favouring favourites fear feast feather feathers featured feeding feelings fees felling fellow fellows felts fending ferreting fester fiction fictions fidgeting fiend fiends fifteens fifteenth filed filet filing filmy findings fined finer fines finessing fining fins firing firmed firming firs firsts fished fisher fishy fist fiver fives flail flailed flailing flails flake fliers fliest flight flights fling flood floods flour flow foiled foiling follower followers followings fond font foothills footnotes ford fore foregoing foresting forfeiting forge forged forger forgers forges forgetting forgiving forgo fork form formed forming fort fortunate foster founds fours fourteens fourteenth foxing fraction fractions fractures frail framed framing freed freeing freer frees freezer freezers freighting fried friending frieze friezes fright frighting frights fronts frying fueling fulls fully functions fund funding furnished furnishes furnishing furthered furthers gags gamed gamest gating gavel gazetting geeing gent gents gibing gigs gild gilds givens glade glads gland glides glowing gnus goad goat gods goggle goggles goner gong goods goody gores goring gout gown grandfathered grands graphic graphical grave gravy grays greasiest greatness greats greens greys grid grids grin grinning grins groping grounding grounds growl growling growls guests guided guises gutting hacker hags hairy haled haler haling halted halting halve halving hampering hams handy happenings harden hardening hardier hardiest hardy hared haring harked harking harried harries harrying hart harts harvest hash haste hasted hastening hastes hasting hatefully hatred hats hatted hatting haven havens haves hawked hawking haying hays hazing headed header headers headier heading heady healthy heaped heaping hearings hearse heartache heartaches hearth hearths hearty heat heated heater heaters heath heating heats heave heaved heavies heaving heeled heeling heir heirs hellos helper helpings hems hens heralding herb herbs herd herds hero herring hews hickories hided highs hijacking hiking hilt hilts hims hind hint hinting hints hips hiring hiss historian historians hither hiving hoard hoarder hoarse hobbles hocked hocking hoed hoeing hoes holds holed holing homed homey homeys homing hones honesty honing hooped hooping hoot hooter hopped hopping hops hordes horsed hose hoses hosing hospitable hospitalise host hostel hostels housed housework hovels howl howls hues huger hundreds hundredth hurrahing hurriedly hyphening ideal ideals idly ills imaged impassable imploring importance importantly importing impossibles impossibly improvise improvised improvises improvising inane incest incite incited incites inciting indicting initialled initialling insaner insider insides insisting instanced instancing instill instilled instilling instills interacted interacts intercept intercepted intercepts interests interject interjected interjects interment interments internals interned interpret interprets intersect intersected intersects inventing inventor inventoried inventors inverting investing investors invoicing joint jointed jointing joints joker jokers joying juiced jumper jumpy juts keeling keening keyboarded killer killings kilned kilning kinked kinking kiting knowingly knowings lacing lades lading ladles lamest laming landing larger larges lashed lashing lass latent latex lathe lather latter launch launchers launches launching laxest laying lazies leading leafing leaking lean leaned leaning leans leaping leases leasing least leaved lefter lefts legged legging lens lesion lesions lessen lessening lessens lest lettering levees levelling levered levering levers licked licking lied lies lift lighted lighten lightened lightening lighters liken likens liker likest lilt liming linger lining linked linking lint listed listener listeners listing litter littering litters littler liven livens liver livers livest livings loader loaves locale locals locked locking lodged lodger lodging loft lofts logger logo loll longed longing longs loomed looming looped looping loose loosed looses loosing looted looting loping loser losers loss losses lotus louse louses lover lovers lowers lowing lows lugged lugging lunched luncheons lurches lusted lusting lynches maced macing mads maid main mains maker makers manage managed manages mane manes manger mangers mangy mania manias manly marches marked marker markers marking marred marries masking massage massaged massages massaging massed masses massing master matched matchless mated mating mats matte matted matters mattes maybes meanings medicates medicinal melt melting memo memos mend menu mere meres merged merger mergers mess messed messes messing mete metes meting mien miens mighty miking mild millions millionth mince minces mined miner mines ministers mink minks mint mints minuet minuets minus minuses minuted minuter minutest misled mistaken misted misting mists misused misuses misusing moan moaning moans mobilises mobilizes modest moist moister mold molds moments monastery monies monkey monkeys mood moods mooing mooning moping mosses motels moth moths mourning mouses mouths mover movers mowing mulch mumps munch mussed musses mussing musts musty mutter named naturally naturals nears neat needled needling needy neon nerved nerving nervously nest nests nether newsy newt newts nicety niche niece nigh nines nineteens nineteenth noes none noon notching note nothings noting noun nuder numbed occasional occasioned oddest odes odor odors officer officers offs okays opener openings opts oranges originally originals originate others ounce oust outs outsider outsiders outsides overbearing overbears overcoats overeat overeaten overeating overeats overhead overheads overhear overheard overhearing overhears overrated overrating overreact overreacted overreacting overreacts overs overstated overstating overt owns pace paces pacing packed packing paging pail pails paints palace palaces pale pales paling pall palls palm palms pander pandered pandering panders pane panes panicking pans panties paring parity pars parsed parses parsing parson parsons particles partied partly passer passports pasted pastes pasties pasting pasts patent patienter patientest patiently patients pats patties patting paused pauses pausing paving pawing payed payer payers peaces peal peals pear peat pecked pecking peer pelt pelts pends penis peon peons peopled peoples perfected perfecter perfectly perfects perk persona personals pert pest pests pettier pettiest petting petty phoned phoney phoneys phonies photon photons physic physicals physicist physicists physiques pickaxing picket picketing pickled pickling picky pictured pier pigs piked piking pilfering pinked pinking pinks pins pint pints pioneered pioneering pitting placed placing plaice plaid plain plains planed planet planets planing plank planks plant plantation plantations plants plated plates plating plaything pleas pleased pleases plot plots plundered plundering plus plying poet poets poises pokers policed policies policy polishing polite ponderous port ported porting portion portions ports posed poses posing positions possibles possibly poster posturing potted pottering potting pout pouted pouting pouts powder powdered powdering powders powerfully practical practicals practise practised practises practising pray prayed prayer prayers praying prays preceding prefacing prefect preferred preferring prefixing premiered premiering premising preparing preserved preserving presiding pressings pressured pressures pressuring presuming prettied pretties priced prick pricked pricking prickling pricks prides pries primes prince princes prints prises prized probable probables probe processed processes processing processional processionals prod professed professes professing profession professionally professionals professions proffered proffering programme programmed programmer programmes progressed progressives projected projector projectors prom prop pros prospects protect protects provably prow prying publisher publishers puking punctures punishing punt punting punts purpler purples pusses putt puttering putts puttying puzzled questioned queued quieting quiets quilt quilting quilts quitting quoting racked racking rafted rafting raging rags raided raiding railed railing rainy raised raising raked raking rally rams rang ranged ranging ranker rankled rankling rant ranted ranting raping raps rared rarer rares raring rash rasp rationing rats ratted ratting raving ravings rays razing reacted reacting readings readying realm reals realty reaming reap reaping reaps rearing rebind rebinding rebinds receipted receipting receiver receivers receptive recessing reclining recoiling recorder recorders recordings recouping recurring redo redressed redresses redressing reds reed reelected reelecting reflected reflecting reforming refunding regaining regal regard regarding regards registrar registrars regressed regresses regressing regularly regulars rehashing reined reining rejecting relapsing related relates relating relayed relaying releasing relenting relied relies relieving reloading rely relying remainder remaining reminder reminders remitting rend rending rented renting repaying repeating repelling repenting replacing replay repleting reportedly reporter reporters repressed represses repressing reproving repulsing requested rereading rerouting rescinded rescinding resent resenting resents reserving resetting resisting resistors resort resorted resorting resorts respective restoring resulting retaining retard retarding retards retched retches retching retirement retirements retort retorted retorting retorts reverting revolting rewarding rewind riced riches ricing rights ripe rips roaches rods roomy rued rues ruin ruined ruing ruining ruins ruled ruler rulers ruling rune runes rung rungs runt runts rusted rusting sacred sailed sailing salt salve salved salves salving sames sample sand sanding sands sangs saver savings sawing saws sayings scaled scare scares scarfed scaring scarred scent schooling scold scooting scoots scoped scoping scorching scored scores scramming scream screamed screaming screams scuffs scythed seal sealing seals seam seamed seaming seams sear seared searing sears seat seating seats seconding secrete secretes sect sects seed seeded seeding seeds seek seeking seeks seemingly seep seeped seeping seeps seer semen sensed sensing sentenced sentience separately separation separations separator separators sequences serve served serves settling sevens seventeens seventeenth seventh seventies sever severs sewing sexes sexing shaded shades shading shadowing shafts shakes shaking shame shamed shames shaming shammed shamming shaped shapes shaping sharked sharking sharks sharped sharping sharps shave shaved shaves shaving sheared shearing shed sheds sheen shell shelling shells shied shies shifty shingling shirts shoeing shone shoo shooed shooing shoos shopped shopping shore shored shores shoring shorted shorten shorting shorts shots shout shouting shouts shove shoved shoves shoving shower showering showings showy shred shun shuns shunt shuts shying sicks sided siding sidle sidles sift sifting sifts sighed sighing signaling signer sill sills silt silting silts simile similes simpler simplex simply sine singe singed singeing singes singling sinking sinned sinning sins siring sited sitter sitters situating sixteens sixteenth sizing skimming skit skits skulls skying slammed slamming slang slat slave slaved slaves slaving slay slaying slays sleeking sleeks sleeting sleets slick slide slides slimming sling slinging slings slit slits slitting sloped sloping slopped slopping slowed slowing slows slung smalls smarted smarting smarts smell smelliest smelling smells smite smites smiting smoothing snag snared snares snaring snatching sneaking sneaks snide snores snowed snowing snuffs snug soared soaring soiled soiling solder solders soldiered soled solid solider someones somethings sometime somewhats soot sopped sopping sops sore sores sort sounder soup sourced sources sowed sowing sown sows spaced spacing spaded spading span spanned spanning spans spared spares sparing spas spasm spasms spat spay spayed spaying spays spearing spears specking specks sped speeding speeds spell spelling spellings spells spills spinsters spit spite spites spiting spits spitting splitting spokes spoon spores spraining sprawling spreading springing spun spying squeaking staged staging staid staked staking staled staling stanching standings star starch starched starches starching stared stares staring starred starring stars starter startled startling starved starving stated stating stave staved staves staving steadying steaks steals steamed steaming steamy steeping steeps stem stems stepped stepping stick stiffs stills sting stinging stings stoked stokes stoking stoles stomp stomped stomping stomps stoned stones stoning stoop stooped stooping stoops stopper stoppered stoppering stored storey storeys storing storks stormiest storms stormy stoves stowed stowing strand stranding strands strangely stranger strangers strangest strangle strangled strangles strapping stray strayed straying strays streak streaked streaking streaks streamer streamers streamline stressing string stringent stringier stringiest stringing stripping struck strumming strung stud studded studding studios stuffy stun stung stuns stupids sturdiest sturdy suave subs subscript subscripts suck suds sued sues suing suit suite suites suiting suits sums sundae sundry sunk superb supers supper supporter supporters supportive supposing surer surge suspending swamp swarm swat sway swayed swaying sways swears sweeping sweepings sweeps sweets swell swelling swellings swells swifts swills swing swinging swings swiping swoon swung syringing tabled tablet tablets tacked tacking taker takers tale tales talker tally taming tanked tanking tans taping tasked tasking tasted tasting taxing teachings teak teaks tear tears tease teat teats teen telegraph telegraphs televising tend tens tent tented tenting tester testes testis texturing thatching thee theme themes theses thin thinning thins thirst thirsts thirteens thirteenth thongs thorough thoughts thousands thousandth threading threes thrilling thrust thrusting thrusts tied ties tilling tills timed timer timers ting tings tips tirade tirades tire tires titter titters toll tolled tolling tolls tomorrows toot tough towelling toying traced traces tracing trader traders trailed trainer trainers trampling transacted transacting transaction transactions transited transiting transition transitions translator translators transplanted transplanting traveler travelers travelings travelled traveller travelling travellings traversed traversing trawler trawlers tray treachery treading tree trenching trialling tribes trill trilled trilling trills tripe tripos trolley troubling trough troweling trowelled trowelling truanting truce trued truer trues truest truing trustee trusty tuned tuning turfed turfing turner twelves twinkling twister twisters twittered twos tying typed understandably understandings understate understated understates understating undertook unload unloaded unloading unloads unlock unlocked unlocking unlocks unusually upgrading upholding upsets urns uselessly user users vacationed variation variations vary veer vexations vial vice vices vied vies visa vises visioning vocation vocations voiced void voids wading wads wafers wafted wafting wagers waging wags wailed wailing waist waists waiter waiters waived waiving waked waken wakens walker walled walling waned waning wantoning wars wary washer washers washings wasp wasted wastes wasting watery wavers waving wavy waxing waxy weaken weakly wealthier weaning weary wearying weathered weaver weaving weekended weer wees weirdo welcomed welcomes welling wells whatsoever wheat whereas whiled whiles whining whinnying whiten whiter whites whoa wholes whore whores whys widow widows width willingly wills wilting wincing wind winding winds wine wines wing winging wings wink winking winks winnings wiping wiring wished wishes wishing witch witched witches witching wits woks wonderfully worded wording wordy worker workings wormed worming worsen worsts worthy woulds wows wreak writ writer writers writhe writhes writhing writings writs wrongs yearn yearns yellows yelp yens yesterdays yeti yews youngster yous'/*END*/;
  let REAL = null;
  const realWord = (w) => { if (!REAL) REAL = new Set(EN_REAL.split(' ')); return REAL.has(w); };
  function correctWord(w, extra, noReal) {
    if (Object.prototype.hasOwnProperty.call(COMMON_TYPOS, w)) return COMMON_TYPOS[w];
    if (w.length < 4 || /[^a-z]/.test(w) || NO_FIX.has(w)) return null;
    const v = vocab();
    if (v.has(w) || (extra && extra.has(w))) return null;
    if (!noReal && realWord(w)) return null;
    const max = w.length >= 9 ? 2 : 1;
    let best = null, bscore = Infinity;
    for (const [cand, rank] of v) {
      if (cand.length < 3 || Math.abs(cand.length - w.length) > max) continue;
      const d = osa(w, cand, max);
      if (d > max) continue;
      // short words: only missing/extra letters or swapped letters, never a changed letter
      if (w.length <= 5 && cand.length === w.length && sortedLetters(cand) !== sortedLetters(w)) continue;
      // the first letter stays, unless two letters were swapped (tihs → this)
      if (cand[0] !== w[0] && sortedLetters(cand) !== sortedLetters(w)) continue;
      const score = d * 100000 + (cand[0] === w[0] ? 0 : 50000) + Math.abs(cand.length - w.length) * 1000 + rank;
      if (score < bscore) { bscore = score; best = cand; }
    }
    return best;
  }

  /* soooo → so, helloooo → hello, hahahaha → haha, loool → lol */
  function unstretch(w) {
    if (/^(ha)+h?$/.test(w) || /^(ah)+a?$/.test(w)) return 'haha';
    if (/^lo+l$/.test(w) || /^lmao+$/.test(w)) return 'lol';
    const v = vocab();
    const two = w.replace(/([a-z])\1{2,}/g, '$1$1'), one = w.replace(/([a-z])\1+/g, '$1');
    for (const c of [two, one, one + 'e']) if (v.has(c) || EXPAND[c]) return c;
    if (/^(ye+s+|yee+)$/.test(w)) return 'yes';
    if (/^no+$/.test(w)) return 'no';
    return null;
  }
  /* Common grammar slips: "to by a phone", "better then", "its fun", "your welcome", "could of". */
  function contextFix(toks, fixes) {
    for (let i = 0; i < toks.length; i++) {
      const t = toks[i], prev = toks[i - 1], next = toks[i + 1], next2 = toks[i + 2];
      if (!t || t.punct || t.arabic || t.keep) continue;
      const nw = next && !next.punct ? next.w : null;
      const set = (to) => { fixes.push({ from: t.o, to }); toks.splice(i, 1, ...expandTokens(tokenize(to))); };
      if (t.w === 'hope' && (!prev || prev.punct || STARTERS.has(prev.w)) && nw && ['you', 'it', 'he', 'she', 'they', 'we', 'everything', 'everyone', 'this', 'that', 'all', 'your', 'the', 'ur', 'u', 'to', 'so', 'not'].includes(nw)) set('i hope');
      else if (t.w === 'you' && /^ya$/i.test(t.o) && (!prev || prev.punct) && nw && (PRON_SUBJ[nw] || nw === 'you' || AUX.has(nw) || ['bro', 'lol', 'ok', 'okay', 'true', 'right', 'sure', 'man', 'but', 'and', 'same'].includes(nw))) set('yeah');
      else if (t.w === 'no' && prev && (prev.w === 'not' || PRON_SUBJ[prev.w] || prev.w === 'you') && nw && (WH[nw] || ['that', 'it', 'him', 'her', 'them', 'this', 'about', 'if', 'a', 'the', 'one', 'everything', 'nothing', 'anything', 'something'].includes(nw))) set('know');
      else if (t.w === 'their' && nw && ['going', 'gonna', 'not', 'all', 'here', 'there', 'so', 'very', 'just', 'still', 'the', 'a', 'coming', 'doing', 'playing', 'online', 'back'].includes(nw)) set('they are');
      else if (t.w === 'its' && nw && (/^\d/.test(nw) || ['about', 'around', 'almost', 'nearly', 'only', 'basically', 'literally', 'getting', 'raining', 'hot', 'cold', 'late', 'early', 'here', 'there', 'mine', 'yours'].includes(nw))) set('it is');
      else if (t.w === 'ill' && nw && (isVerbBase(nw) || nw === 'be' || nw === 'not' || PHRASAL.get(nw))) set('i will');
      else if (t.w === 'id' && nw && (isVerbBase(nw) || nw === 'be' || nw === 'love' || nw === 'like')) set('i would');
      else if (t.w === 'by' && prev && prev.w === 'to' && nw && (DET[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw) || ADJS[nw] || nw === 'it' || nw === 'them')) set('buy');
      else if (t.w === 'then' && prev && (/^(more|less|better|worse)$/.test(prev.w) || (ADJS[prev.w] && /er$/.test(prev.w)))) set('than');
      else if (t.w === 'its' && nw && ((ADJS[nw] && !(next2 && NOUN_FORM.has(next2.w))) || ['a', 'an', 'the', 'not', 'very', 'so', 'too', 'really', 'ok', 'okay', 'my', 'your', 'time', 'kinda', 'pretty', 'quite', 'still', 'just', 'already', 'also', 'now', 'all', 'probably', 'maybe', 'like', 'because', 'cause', 'over', 'done', 'fine', 'good', 'bad'].includes(nw) || (verbInfo(nw) || []).some((r) => r.form === 'ing'))) set('it is');
      else if (t.w === 'your' && nw && (['welcome', 'right', 'not', 'very', 'so', 'too', 'going', 'coming', 'doing', 'the', 'a', 'an', 'my'].includes(nw) || (ADJS[nw] && !NOUN_FORM.has(nw) && !(next2 && !next2.punct && NOUN_FORM.has(next2.w))))) set('you are');
      else if (t.w === 'of' && prev && ['could', 'should', 'would', 'must', 'might'].includes(prev.w)) set('have');
    }
  }

  /* ====================================================================== */
  /*  Conjugation                                                            */
  /* ====================================================================== */
  /* Drop a short vowel between two consonants when an ending starting with a vowel is added: li3ab+at → li3bat. */
  function elide(s, v) {
    const u = s.match(/[369]'|sh|ch|th|gh|kh|dh|./g) || [];
    const n = u.length;
    const isV = (x) => /^[aeiou]$/.test(x);
    if (n >= 4 && u[n - 2] === v && !isV(u[n - 1]) && !isV(u[n - 3]) && isV(u[n - 4])) { u.splice(n - 2, 1); return u.join(''); }
    return s;
  }
  const PFX = { '1s': 'a', '2m': 't', '2f': 't', '2p': 't', '3m': 'y', '3f': 't', '1p': 'n', '3p': 'y' };
  const APFX = { '1s': 'أ', '2m': 'ت', '2f': 'ت', '2p': 'ت', '3m': 'ي', '3f': 'ت', '1p': 'ن', '3p': 'ي' };
  const withTail = (v, s, ar) => (v.tail ? s + ' ' + v.tail[ar ? 1 : 0] : s);
  function pastAz(v, p) { return withTail(v, pastAz0(v, p)); }
  function pastAr(v, p) { return withTail(v, pastAr0(v, p), true); }
  function presentAz(v, p) { return withTail(v, presentAz0(v, p)); }
  function presentAr(v, p) { return withTail(v, presentAr0(v, p), true); }
  function pastAz0(v, p) {
    const p1 = v.az[0], p3 = v.az[1];
    const s3 = /[aeiou]$/.test(p3) ? p3.slice(0, -1) : elide(p3, 'a');
    switch (p) {
      case '1s': case '2m': return p1;
      case '2f': return p1 + 'i';
      case '2p': return p1 + 'u';
      case '1p': return p1.replace(/t$/, '') + 'na';
      case '3m': return p3;
      case '3f': return s3 + 'at';
      default: return s3 + 'aw';
    }
  }
  function pastAr0(v, p) {
    const p1 = v.ar[0], p3 = v.ar[1];
    const s3 = p3.replace(/[ىا]$/, '');
    switch (p) {
      case '1s': case '2m': return p1;
      case '2f': return p1 + 'ي';
      case '2p': return p1 + 'وا';
      case '1p': { const s = p1.replace(/ت$/, ''); return /ن$/.test(s) ? s + 'ا' : s + 'نا'; }
      case '3m': return p3;
      case '3f': return s3 + 'ت';
      default: return s3 + 'وا';
    }
  }
  function presentAz0(v, p) {
    if (v.pr && v.pr[p]) return v.pr[p];
    const st = v.az[2];
    let f;
    if (p === '1s') f = /^a/.test(st) ? st : /^i[^aeiou]/.test(st) && st.length > 3 ? 'a' + st.slice(1) : 'a' + st;
    else f = PFX[p] + (/^[aeiou]/.test(st) ? '' : v.lv || '') + st;
    if (p === '2f' || p === '2p' || p === '3p') {
      f = /[aiu]$/.test(f) ? f.slice(0, -1) : elide(f, 'i');
      f += p === '2f' ? 'een' : 'oon';
    }
    return f;
  }
  function presentAr0(v, p) {
    if (v.arpr && v.arpr[p]) return v.arpr[p];
    const st = v.ar[2];
    let f = p === '1s' && st.startsWith('ا') ? 'آ' + st.slice(1) : APFX[p] + st;
    if (p === '2f') f = f.replace(/[يىا]$/, '') + 'ين';
    else if (p === '2p' || p === '3p') f = f.replace(/[يىا]$/, '') + 'ون';
    return f;
  }
  function future(v, p) {
    const az = presentAz(v, p), ar = presentAr(v, p);
    return ['b' + az, (ar.startsWith('أ') ? 'ب' + ar.slice(1) : ar.startsWith('آ') ? 'با' + ar.slice(1) : 'ب' + ar)];
  }
  function conj(v, tense, p) {
    if (tense === 'past') {
      const third = p === '3m' || p === '3f' || p === '3p';
      if (v.via === 'kaan' || (!v.az[0] && !(third && v.az[1]))) { const k = [pastAz(BE, p), pastAr(BE, p)]; return [k[0] + ' ' + presentAz(v, p), k[1] + ' ' + presentAr(v, p)]; }
      return [pastAz(v, p), pastAr(v, p)];
    }
    if (tense === 'future') return future(v, p);
    return [presentAz(v, p), presentAr(v, p)];
  }
  function imperativeForm(v, addr) {
    const r = imperativeForm0(v, addr);
    return r && v.tail ? [r[0] + ' ' + v.tail[0], r[1] + ' ' + v.tail[1]] : r;
  }
  function imperativeForm0(v, addr) {
    const m = v.az[3], am = v.ar[3];
    if (!m) return null;
    if (addr === 'm') return [m, am];
    if (addr === 'f') return [/i$/.test(m) ? m : elide(m.replace(/[aeu]$/, ''), 'i') + 'i', /ي$/.test(am) ? am : am.replace(/[ىا]$/, '') + 'ي'];
    return [elide(m.replace(/[aeiu]$/, ''), 'i') + 'u', am.replace(/[يىا]$/, '') + 'وا'];
  }
  /* A suffix starting with h after t/d/s/k/c/g would read as th, dh, sh, kh, ch, gh: keep them apart. */
  function joinH(stem, suf) { return /^h/.test(suf) && /[tdskcg]$/.test(stem) ? stem + '-' + suf : stem + suf; }
  function attachObj(az, ar, p) {
    let a;
    const V_SUF = { '1s': 'ni', '2m': 'k', '2f': 'ch', '2p': 'kum', '3m': 'h', '3f': 'ha', '1p': 'na', '3p': 'hum' };
    if (/a$/.test(az)) a = az + 'a' + V_SUF[p];                       // nisa → nisaah
    else if (/[^aeiou]i$/.test(az)) a = az.slice(0, -1) + 'ee' + V_SUF[p];   // abi → abeeh, warri → warreeni
    else if (/[^aeiou]u$/.test(az)) a = az.slice(0, -1) + 'oo' + V_SUF[p];   // sawwu → sawwooh
    else if (/[iu]$/.test(az)) a = az + V_SUF[p];
    else a = joinH(az, OBJ_AZ[p]);
    const r = ar.replace(/ى$/, 'ا').replace(/ّ$/, 'ّ') + OBJ_AR[p];
    return [a, r];
  }
  function prepPron(key, p) {
    const words = key.split('_');
    const last = words.pop();
    const pre = words.length ? words.join(' ') + ' ' : '';
    const preAr = words.length ? (PREP_AR[key] || '').split(' ').slice(0, -1).join(' ') + ' ' : '';
    const t = PREP_PRON[last];
    const i = P8.indexOf(p);
    if (t) return [pre + t[0].split(' ')[i], preAr + t[1].split(' ')[i]];
    const lastAr = (PREP_AR[key] || last).split(' ').pop();
    return [pre + joinH(last, SUF_AZ[p]), preAr + lastAr + SUF_AR[p]];
  }
  function possess(az, ar, p) {
    const tm = /ة$/.test(ar);
    let stem = az;
    if (tm && /a$/.test(az)) {
      const base = az.slice(0, -1);
      const u = base.match(/[369]'|sh|ch|th|gh|kh|dh|./g) || [];
      const n = u.length;
      const vSuf = ['1s', '2m', '2f', '3m'].includes(p);
      stem = vSuf && n >= 3 && !/^[aeiou]$/.test(u[n - 1]) && /^[aeiou]$/.test(u[n - 2]) ? base + 't' : base + 'at';
    }
    let a;
    if (!tm && /a$/.test(stem) && /[اى]$/.test(ar)) a = stem + 'a' + { '1s': 'y', '2m': 'k', '2f': 'ch', '2p': 'kum', '3m': 'h', '3f': 'ha', '1p': 'na', '3p': 'hum' }[p];
    else if (!tm && /[aeiou]$/.test(stem)) a = stem + { '1s': 'yi', '2m': 'k', '2f': 'ch', '2p': 'kum', '3m': 'h', '3f': 'ha', '1p': 'na', '3p': 'hum' }[p];
    else {
      if (['3f', '3p', '2p', '1p'].includes(p) && !tm) {
        const u = stem.match(/[369]'|sh|ch|th|gh|kh|dh|./g) || [];
        const n = u.length, isV = (x) => /^[aeiou]$/.test(x);
        if (n >= 3 && !isV(u[n - 1]) && !isV(u[n - 2]) && u[n - 1] !== u[n - 2] && isV(u[n - 3])) stem = u.slice(0, n - 1).join('') + 'i' + u[n - 1];
      }
      a = joinH(stem, SUF_AZ[p]);
    }
    return [a, ar.replace(/ة$/, 'ت').replace(/ى$/, 'ا') + SUF_AR[p]];
  }
  function construct(az, ar) { return /ة$/.test(ar) ? [az.replace(/a$/, 'at'), ar] : [az, ar]; }
  function adjForm(key, feat) { const A = ADJS[key]; return feat === 'f' ? [A.f, A.arF] : feat === 'pl' ? [A.pl, A.arPl] : [A.m, A.arM]; }
  function gaa3id(feat) { return feat === 'f' ? ['gaa3da', 'قاعدة'] : feat === 'pl' ? ['gaa3deen', 'قاعدين'] : ['gaa3id', 'قاعد']; }

  /* ====================================================================== */
  /*  Tokens and tagging                                                     */
  /* ====================================================================== */
  function piece(az, ar, extra) { return Object.assign({ az, ar, known: true }, extra || {}); }

  function tokenize(s) {
    const out = [];
    const re = /\[[^\]\n]*\]|[\u0600-\u06FF]+|(?:[A-Za-z0-9_-]+)?\.(?:net|js|exe|zip|dll|py|html|json|txt|png|jpg|jpeg|gif|mp4|mp3|wav|swf|com|io|org|gg|tv|rar|7z|bat|sh|css|ts|md|pdf|apk)\b|[A-Za-z0-9\u00C0-\u024F]+(?:['’][A-Za-z]+)*|\p{Extended_Pictographic}(?:[\uFE0F\u200D]|\p{Extended_Pictographic})*|[.!?]+|[,;:…]|[^\sA-Za-z0-9\u0600-\u06FF]/gu;
    let m;
    while ((m = re.exec(s))) out.push(m[0]);
    return out;
  }
  function expandTokens(raw) {
    const out = [];
    for (const o of raw) {
      if (/^\[[^\]]*\]$/.test(o)) { const inner = o.slice(1, -1).trim(); if (inner) out.push({ w: inner.toLowerCase(), o: inner, keep: true }); continue; }
      if (/^[\u0600-\u06FF]+$/.test(o)) { out.push({ w: o, o, arabic: true }); continue; }
      if (/^\p{Extended_Pictographic}/u.test(o)) { out.push({ w: o, o, arabic: true, emoji: true }); continue; }
      if (/^[.!?]+$|^[,;:…]$|^[^A-Za-z0-9]$/.test(o)) { out.push({ w: o, o, punct: true }); continue; }
      const low = o.toLowerCase().replace(/’/g, "'");
      let exp = EXPAND[low];
      if (!exp) {
        let m;
        if ((m = low.match(/^(.+)n't$/))) exp = m[1] + ' not';
        else if ((m = low.match(/^(.+)'ll$/))) exp = m[1] + ' will';
        else if ((m = low.match(/^(.+)'re$/))) exp = m[1] + ' are';
        else if ((m = low.match(/^(.+)'ve$/))) exp = m[1] + ' have';
        else if ((m = low.match(/^(.+)'d$/))) exp = m[1] + ' would';
        else if ((m = low.match(/^(.+)'m$/))) exp = m[1] + ' am';
        else if ((m = low.match(/^(.+)'s$/))) { out.push({ w: m[1], o: o.slice(0, m[1].length) }); out.push({ w: "'s", o: "'s", posss: true }); continue; }
      }
      if (exp) { exp.split(' ').forEach((w, i) => out.push({ w, o: i === 0 ? o : w, exp: true })); continue; }
      out.push({ w: low, o });
    }
    return out;
  }
  const verbInfo = (w) => VERB_FORM.get(w) || null;
  const isVerbBase = (w) => !!(w && (VERB_FORM.get(w) || []).some((r) => r.form === 'base'));
  const isNounish = (w) => !!(w && (NOUN_FORM.has(w) || ADJS[w]));

  /* he set up the server / the server shut down: a base-looking phrasal verb after a 3rd-person-singular subject is the past */
  function phrasalForm(hit, ph, items) {
    if (hit.form !== 'base' || !ph.some((r) => r.key === hit.key && r.form === 'past')) return hit.form;
    const last = items[items.length - 1];
    if (!last || last.t !== 'word') return hit.form;
    const lnf = NOUN_FORM.get(last.w);
    if (!(['he', 'she', 'it'].includes(last.w) || (lnf && !lnf.pl && !verbInfo(last.w)) || (!lnf && !verbInfo(last.w) && /^[A-Z][a-z]/.test(last.o || '')))) return hit.form;
    for (let j = items.length - 2; j >= 0; j--) {
      const h = items[j];
      if (h.t === 'punct' || h.t === 'conj' || h.t === 'rel' || h.t === 'wh') break;
      if (h.t === 'aux' || h.t === 'modal' || h.t === 'verb' || h.t === 'to' || h.t === 'neg' || (h.t === 'word' && (AUX.has(h.w) || MODAL[h.w] || h.w === 'to' || h.w === 'not' || verbInfo(h.w)))) return hit.form;
    }
    return 'past';
  }
  function lex(toks, ctx) {
    const items = [];
    let i = 0;
    while (i < toks.length) {
      const t = toks[i];
      if (t.punct) { items.push({ t: 'punct', s: t.o }); i++; continue; }
      if (t.keep) { items.push({ t: 'fixed', az: t.o, ar: t.o, user: true, single: true, keep: true }); i++; continue; }
      if (ctx.keep && !t.arabic) {
        const hit = matchKeep(ctx.keep, toks, i);
        if (hit) {
          let text = '';
          for (let k = 0; k < hit; k++) { const tk = toks[i + k]; text += (k && !tk.posss ? ' ' : '') + tk.o; }
          items.push({ t: 'fixed', az: text, ar: text, user: true, single: true, keep: true });
          i += hit;
          continue;
        }
      }
      if (t.arabic) { items.push({ t: 'arabic', s: t.o, emoji: !!t.emoji }); i++; continue; }
      if (t.posss) { items.push({ t: 'posss' }); i++; continue; }
      const t1 = toks[i + 1], t2 = toks[i + 2];
      const plain = (x) => !!x && !x.punct && !x.keep && !x.arabic;
      // neither he nor i → la huwa wala ana
      if (t.w === 'neither' && toks.slice(i + 1, i + 7).some((x) => plain(x) && x.w === 'nor')) { items.push({ t: 'fixed', az: 'la', ar: 'لا', key: 'neither' }); i++; continue; }
      // a ten minute walk / a 2 hour drive → 10 dagaayig mashi / saa3tain bis-sayyara
      {
        const numTok = (x) => x && !x.punct && (/^\d+$/.test(x.w) || NUMS[x.w]);
        const t2 = toks[i + 2], t3 = toks[i + 3];
        const unit = (x) => x && !x.punct && /^(minute|minutes|hour|hours|day|days|week|weeks|month|months)$/.test(x.w);
        const trav = { walk: ['mashi', 'مشي'], drive: ['bis-sayyara', 'بالسيارة'], ride: ['bis-sayyara', 'بالسيارة'], flight: ['bi6-6ayyaara', 'بالطيارة'], trip: ['safar', 'سفر'], journey: ['safar', 'سفر'] };
        const mk = (a, b, c) => {
          const n = /^\d+$/.test(a.w) ? +a.w : NUM_VAL[a.w];
          const head = { minute: 'minute', hour: 'hour', day: 'day', week: 'week', month: 'month' }[b.w.replace(/s$/, '')];
          const noun = { t: 'noun', key: head, pl: n !== 1, o: b.o, dual: n === 2 };
          items.push({ t: 'num', az: String(n), ar: String(n), n }, noun, { t: 'fixed', az: trav[c.w][0], ar: trav[c.w][1], key: c.w });
        };
        if (t.w === 'a' && numTok(t1) && unit(t2) && t3 && !t3.punct && trav[t3.w]) { mk(t1, t2, t3); i += 4; continue; }
        if (numTok(t) && unit(t1) && t2 && !t2.punct && trav[t2.w]) { mk(t, t1, t2); i += 3; continue; }
      }
      // twenty five → 25; at seven thirty → is-saa3a sab3 w nu9
      if (NUMS[t.w] && plain(t1) && NUMS[t1.w]) {
        const x = NUM_VAL[t.w], y = NUM_VAL[t1.w];
        if (x >= 20 && x < 100 && x % 10 === 0 && y >= 1 && y <= 9) { items.push({ t: 'num', az: String(x + y), ar: String(x + y), n: x + y }); i += 2; continue; }
        if (x >= 1 && x <= 12 && (t1.w === 'thirty' || t1.w === 'fifteen') && i > 0 && /^(at|is|it|around|by|till|until|from)$/.test(toks[i - 1].w)) {
          const b = NUMS[t.w].cons || [NUMS[t.w].az, NUMS[t.w].ar];
          const add = t1.w === 'thirty' ? [' w nu9', ' ونص'] : [' w rub3', ' وربع'];
          items.push({ t: 'num', az: b[0] + add[0], ar: b[1] + add[1], n: x }); i += 2; continue;
        }
      }
      // i'm trying to find the station → gaa3id adawwir 3ala il-ma7a66a
      if (t.w === 'trying' && plain(t1) && t1.w === 'to' && plain(t2) && t2.w === 'find' && toks[i + 3] && !toks[i + 3].punct && toks[i + 3].w !== 'out') {
        items.push({ t: 'verb', key: 'look for', form: 'ing', o: t.o }); i += 3; continue;
      }
      // got stuck / got hacked / getting kicked → 3allagt / ithakkar / gaa3id an6irid
      if (GET_FORMS[t.w] && plain(t1) && VERBS['get ' + t1.w] && !(plain(t2) && t2.w === 'of')) {
        items.push({ t: 'verb', key: 'get ' + t1.w, form: GET_FORMS[t.w], o: t.o }); i += 2; continue;
      }
      // W update / L take → ta7deeth W; a big L → L chibeer
      if (/^[WL]$/.test(t.o) && plain(t1) && NOUN_FORM.has(t1.w) && (i === 0 || toks[i - 1].punct || ['a', 'an', 'the', 'big', 'huge', 'massive', 'another', 'such', 'what', 'that', 'this'].includes(toks[i - 1].w))) {
        const nf = NOUN_FORM.get(t1.w);
        items.push({ t: 'noun', key: nf.key, pl: nf.pl, o: t1.o }, { t: 'fixed', az: t.o, ar: t.o, user: true, single: true, keep: true }); i += 2; continue;
      }
      if (/^[WL]$/.test(t.o) && (!t1 || t1.punct || !plain(t1) || ADJS[t1.w] || ['for', 'bro', 'lol', 'fr', 'tbh', 'ngl'].includes(t1.w))) { items.push({ t: 'fixed', az: t.o, ar: t.o, user: true, single: true, keep: true }); i += 1; continue; }
      // plug it in / pick him up / set it up → the phrasal verb, then the pronoun
      if (plain(t1) && PRON_OBJ[t1.w] && plain(t2) && PHRASAL.get(t.w) && PHRASAL.get(t.w).some((r) => r.particle === t2.w) &&
          !(['on', 'in', 'off', 'over', 'through', 'around', 'by', 'about', 'under', 'into'].includes(t2.w) && toks[i + 3] && plain(toks[i + 3]) && (DET[toks[i + 3].w] || PRON_POSS[toks[i + 3].w] || NOUN_FORM.has(toks[i + 3].w)))) {   // put it on the table: a preposition, not a particle
        const hit = PHRASAL.get(t.w).find((r) => r.particle === t2.w);
        const key = hit.key === 'pick up' && t1.w !== 'it' && t1.w !== 'them' ? 'pick up_p' : hit.key;
        items.push({ t: 'verb', key, form: phrasalForm(hit, PHRASAL.get(t.w), items), o: t.o }, { t: 'pron', w: t1.w, role: 'obj' }); i += 3; continue;
      }
      // harder than i expected → a93ab min ma twagga3t
      if (t.w === 'than' && plain(t1) && (PRON_SUBJ[t1.w] || t1.w === 'you') && plain(t2) && (verbInfo(t2.w) || AUX.has(t2.w) || MODAL[t2.w])) {
        items.push({ t: 'conj', w: 'than', az: 'min ma', ar: 'من ما' }); i += 1; continue;
      }
      // hope you have a great day → atmanna lak yoom 7ilu
      {
        const off = t.w === 'i' && plain(t1) && t1.w === 'hope' ? 1 : 0;
        const h = toks[i + off], h1 = toks[i + off + 1], h2 = toks[i + off + 2], h3 = toks[i + off + 3];
        if (h && h.w === 'hope' && plain(h1) && (h1.w === 'you' || h1.w === 'u') && plain(h2) && h2.w === 'have' && h3 && /^(a|an)$/.test(h3.w)) {
          const q = prepPron('li', resolveP('2', ctx.addr));
          items.push({ t: 'fixed', az: 'atmanna ' + q[0], ar: 'أتمنى ' + q[1], key: 'i hope' }); i += off + 4; continue;
        }
      }
      // i get an error / he got a message → yi6la3 li error / 6ila3 lah message
      if (ERR_GET[t.w] && plain(t1) && (/^(a|an|the|this|that|some|another)$/.test(t1.w) ? plain(t2) && ERR_NOUNS.has(t2.w) : ERR_NOUNS.has(t1.w))) {
        const sp = i > 0 && !toks[i - 1].punct ? (PRON_SUBJ[toks[i - 1].w] || (toks[i - 1].w === 'you' ? '2' : null)) : null;
        const subjI = sp ? i - 1 : -1;
        const form = ERR_GET[t.w];
        const nounAt = /^(a|an|the|this|that|some|another)$/.test(t1.w) ? i + 2 : i + 1;
        const nounW = toks[nounAt].w;
        const pr = sp ? resolveP(sp, ctx.addr) : '1s';
        const li = prepPron('li', pr);
        if (subjI >= 0) items.pop();   // drop the subject pronoun already pushed
        const vb = form === 'past' ? ['6ila3', 'طلع'] : form === 'ing' ? ['gaa3id yi6la3', 'قاعد يطلع'] : ['yi6la3', 'يطلع'];
        items.push({ t: 'fixed', az: vb[0] + ' ' + li[0], ar: vb[1] + ' ' + li[1], key: 'get error' }, { t: 'word', w: nounW, o: toks[nounAt].o });
        i = nounAt + 1; continue;
      }
      // do what you want / say what you want → sawwi illi tabeeh
      if (t.w === 'what' && i > 0 && plain(toks[i - 1]) && WHAT_REL_VERBS.has(toks[i - 1].w) && plain(t1) && (PRON_SUBJ[t1.w] || t1.w === 'you') && plain(t2) && (verbInfo(t2.w) || MODAL[t2.w] || AUX.has(t2.w))) {
        items.push({ t: 'rel', w: 'what', illi: true }); i += 1; continue;
      }
      // i am able to / was able to → agdar / gidart ; ought to → laazim ; supposed to → il-mafroo9'
      if (/^(am|is|are|was|were|be|been)$/.test(t.w) && plain(t1) && t1.w === 'able' && plain(t2) && t2.w === 'to') {
        items.push({ t: 'modal', m: 'can', w: 'can', past: /^(was|were)$/.test(t.w) }); i += 3; continue;
      }
      if (t.w === 'able' && plain(t1) && t1.w === 'to' && i > 0 && /^(not|never)$/.test(toks[i - 1].w)) { items.push({ t: 'modal', m: 'can', w: 'can' }); i += 2; continue; }
      if (t.w === 'ought' && plain(t1) && t1.w === 'to') { items.push({ t: 'modal', m: 'must', w: 'should' }); i += 2; continue; }
      if (/^(am|is|are|was|were)$/.test(t.w) && plain(t1) && t1.w === 'supposed' && plain(t2) && t2.w === 'to') {
        const sp = i > 0 && !toks[i - 1].punct ? (PRON_SUBJ[toks[i - 1].w] || (toks[i - 1].w === 'you' ? '2' : null)) : null;
        const pr = sp ? resolveP(sp, ctx.addr) : (toks[i - 1] && toks[i - 1].w === 'it' ? '3m' : null);
        const q = pr ? INN[pr] || INN['3m'] : null;
        if (sp && items.length && items[items.length - 1].t === 'word') items.pop();
        items.push({ t: 'fixed', az: "il-mafroo9'" + (q && sp ? ' ' + q[0] : ''), ar: 'المفروض' + (q && sp ? ' ' + q[1] : ''), key: 'supposed to' });
        if (sp) items.push({ t: 'pron', w: toks[i - 1].w, role: 'subj' });
        i += 3; continue;
      }
      if (t.w === 'supposed' && plain(t1) && t1.w === 'to') { items.push({ t: 'fixed', az: "il-mafroo9'", ar: 'المفروض', key: 'supposed to' }); i += 2; continue; }
      // every time you log in → kil ma tdish
      if (t.w === 'every' && plain(t1) && t1.w === 'time' && plain(t2) && (PRON_SUBJ[t2.w] || t2.w === 'you' || t2.w === 'it' || DET[t2.w] || PRON_POSS[t2.w] || NOUN_FORM.has(t2.w))) {
        items.push({ t: 'conj', w: 'when', az: 'kil ma', ar: 'كل ما' }); i += 2; continue;
      }
      // about to + verb → going to
      if (t.w === 'about' && plain(t1) && t1.w === 'to' && plain(t2) && (isVerbBase(t2.w) || PHRASAL.get(t2.w))) { items.push({ t: 'modal', m: 'will', w: 'will', about: true }); i += 2; continue; }
      // does this work? / did that help? → the word after this/that is the verb
      if (/^(do|does|did)$/.test(t.w) && plain(t1) && DEM[t1.w] && plain(t2) && isVerbBase(t2.w) && (i === 0 || toks[i - 1].punct || WH[toks[i - 1].w]) &&
          (!toks[i + 3] || toks[i + 3].punct || ['now', 'today', 'again', 'still', 'too', 'also', 'here', 'there', 'tho', 'though', 'bro', 'lol', 'at', 'on', 'in', 'for', 'with', 'well', 'properly', 'fine', 'anymore', 'it', 'me', 'you', 'him', 'her', 'us', 'them', 'anything', 'something'].includes(toks[i + 3].w))) {
        const vb = (verbInfo(t2.w) || []).find((r) => r.form === 'base');
        if (vb) { items.push({ t: 'aux', w: t.w }, { t: 'dem', w: t1.w }, { t: 'verb', key: vb.key, form: 'base', o: t2.o }); i += 3; continue; }
      }
      // kind of tired / sort of → shway
      if ((t.w === 'kind' || t.w === 'sort') && plain(t1) && t1.w === 'of' && (i === 0 || !['what', 'which', 'this', 'that', 'the', 'a', 'an', 'any', 'some', 'every', 'each', 'one', 'no', 'my', 'your', 'his', 'her', 'their', 'our'].includes(toks[i - 1].w)) && (!t2 || t2.punct || ADJS[t2.w] || (verbInfo(t2.w) || []).length || ['like', 'a', 'an', 'the', 'my', 'busy', 'weird', 'funny', 'mid', 'cool'].includes(t2.w))) {
        items.push({ t: 'adv', az: 'shway', ar: 'شوي', int: true }); i += 2; continue;
      }
      // i guess he is right → a7sib inna 9a7; guess the number → 5ammin
      if (/^(guess|guessed|guessing)$/.test(t.w) && plain(t1) && (PRON_SUBJ[t1.w] || t1.w === 'you' || t1.w === 'it' || t1.w === 'that' || t1.w === 'there') && !(t1.w === 'that' && t2 && plain(t2) && (NOUN_FORM.has(t2.w) || ADJS[t2.w]))) {
        items.push({ t: 'verb', key: 'think', form: t.w === 'guess' ? 'base' : t.w === 'guessed' ? 'past' : 'ing', o: t.o }); i += 1; continue;
      }
      // show me the way / i know the way → id-darb
      if (t.w === 'the' && plain(t1) && t1.w === 'way' && (!t2 || t2.punct || ['to', 'home', 'back', 'there', 'here'].includes(t2.w)) && !(t2 && t2.w === 'to' && toks[i + 3] && isVerbBase(toks[i + 3].w))) {
        const vb = toks.slice(Math.max(0, i - 3), i).map((x) => x.w);
        if (vb.some((x) => ['show', 'shows', 'showed', 'know', 'knows', 'knew', 'find', 'found', 'lost', 'lose', 'forgot', 'forget', 'remember', 'tell', 'ask', 'on', 'all'].includes(x))) {
          items.push({ t: 'det', w: 'def' }, { t: 'noun', key: 'darb', o: 'way' }); i += 2; continue;
        }
      }
      // stop afk farming → waggif tfarrim afk
      if (/^(stop|stops|stopped|quit|start|started|keep|keeps|kept)$/.test(t.w) && plain(t1) && t1.w === 'afk' && plain(t2) && (verbInfo(t2.w) || []).some((r) => r.form === 'ing')) {
        toks.splice(i + 1, 2, t2, t1); 
      }
      // how much did you pay → cham dafa3t
      if (t.w === 'how' && plain(t1) && t1.w === 'much' && plain(t2) && (AUX.has(t2.w) || MODAL[t2.w]) && !(toks[i + 3] && ['it', 'this', 'that'].includes(toks[i + 3].w) && toks[i + 4] && toks[i + 4].punct)) {
        items.push({ t: 'wh', w: 'how much' }); i += 2; continue;
      }
      // how long does it take to X → cham yaa5idh wagt 3ashaan t-X
      if (t.w === 'how' && plain(t1) && t1.w === 'long' && plain(t2) && /^(does|will|would|did|is|can)$/.test(t2.w) && toks[i + 3] && toks[i + 3].w === 'it' && toks[i + 4] && /^(take|takes|took|taking|gonna)$/.test(toks[i + 4].w)) {
        const past = t2.w === 'did';
        let k = i + 5;
        if (toks[k] && toks[k].w === 'take') k++;
        let who = '';
        if (toks[k] && plain(toks[k]) && (PRON_OBJ[toks[k].w] || toks[k].w === 'you')) { const q = prepPron('min', resolveP(PRON_OBJ[toks[k].w] || '2', ctx.addr)); who = ' ' + q[0]; k++; }
        const toX = toks[k] && toks[k].w === 'to' && toks[k + 1] && !toks[k + 1].punct;
        items.push({ t: 'fixed', az: (past ? 'cham a5adh wagt' : 'cham yaa5idh wagt') + who + (toX ? ' 3ashaan' : ''), ar: (past ? 'چم أخذ وقت' : 'چم ياخذ وقت') + (toX ? ' عشان' : ''), key: 'how long' });
        if (toX) { items.push({ t: 'pron', w: 'you', role: 'subj' }); i = k + 1; } else i = k;
        continue;
      }
      // ur + adjective / -ing verb → you are
      if (t.o.toLowerCase() === 'ur' && plain(t1) && (ADJS[t1.w] || ['so', 'the', 'a', 'an', 'not', 'gonna', 'going', 'in', 'on', 'at', 'here', 'there', 'right', 'wrong', 'very', 'too', 'really', 'still', 'just', 'always', 'never', 'also', 'welcome', 'done', 'online', 'offline', 'afk', 'back', 'late', 'early', 'all', 'kinda', 'pretty', 'dead', 'lucky', 'trash', 'cracked', 'cooked', 'mid', 'goated', 'good', 'bad', 'fine', 'ok', 'okay', 'sure', 'free', 'busy', 'crazy', 'insane', 'wrong', 'such'].includes(t1.w) || (verbInfo(t1.w) || []).some((r) => r.form === 'ing')) && !(t2 && plain(t2) && NOUN_FORM.has(t2.w) && ADJS[t1.w])) {
        items.push({ t: 'word', w: 'you', o: 'you' }, { t: 'aux', w: 'are' }); i += 1; continue;
      }
      // simply put, ... → bi5ti9aar
      if (t.w === 'simply' && plain(t1) && t1.w === 'put') { items.push({ t: 'adv', az: 'bi5ti9aar', ar: 'باختصار' }); i += 2; continue; }
      // click save / press start → i9'3'a6 3ala save
      if (CLICK_FORMS[t.w] && plain(t1) && (isVerbBase(t1.w) || NOUN_FORM.has(t1.w) || t1.w === 'ok') && (!t2 || t2.punct || ['then', 'and', 'to', 'after', 'before'].includes(t2.w))) {
        items.push({ t: 'verb', key: 'click', form: CLICK_FORMS[t.w], o: t.o }, { t: 'fixed', az: t1.o, ar: t1.o, user: true, single: true, keep: true }); i += 2; continue;
      }
      // auto quest, auto sell: one game word
      if (t.w === 'auto' && plain(t1)) { items.push({ t: 'fixed', az: 'auto ' + t1.o, ar: 'auto ' + t1.o, user: true, single: true, keep: true }); i += 2; continue; }
      // the update is out / should be out next week → nizal / yinzil
      if (/^(is|are|be|was|were)$/.test(t.w) && plain(t1) && t1.w === 'out' && !(plain(t2) && t2.w === 'of')) {
        items.push({ t: 'verb', key: 'release_i', form: t.w === 'be' ? 'base' : 'past', o: t.o }); i += 2; continue;
      }
      // it makes sense / doesn't make sense → mafhoom / mob mafhoom
      if (DO_LIKE_MAKE[t.w] && plain(t1) && t1.w === 'sense') {
        items.push({ t: 'aux', w: DO_LIKE_MAKE[t.w] }, { t: 'adj', key: 'understandable' }); i += 2; continue;
      }
      // i have been to london → ri7t landan
      if (t.w === 'been' && plain(t1) && ((t1.w === 'to' && plain(t2) && !isVerbBase(t2.w) && t2.w !== 'be') || ((t1.w === 'there' || t1.w === 'here') && i > 0 && /^(have|has|had|never|ever|not|already)$/.test(toks[i - 1].w)))) {
        items.push({ t: 'verb', key: 'go', form: 'pp', o: t.o }); i += 1; continue;
      }
      // i will be back / i am back → rja3
      if (/^(be|am|is|are|was|were)$/.test(t.w) && plain(t1) && t1.w === 'back') {
        items.push({ t: 'verb', key: 'come back', form: t.w === 'be' ? 'base' : 'past', o: t.o }); i += 2; continue;
      }
      // thanks to everyone who supported me → shukran lil-kil illi da3amni
      if ((t.w === 'thanks' || (t.w === 'thank' && plain(t1) && t1.w === 'you')) ) {
        const j = t.w === 'thanks' ? i + 1 : i + 2;
        const a1 = toks[j], a2 = toks[j + 1], a3 = toks[j + 2];
        if (plain(a1) && a1.w === 'to' && plain(a2) && ['everyone', 'everybody', 'all'].includes(a2.w) && plain(a3) && ['who', 'that'].includes(a3.w)) {
          items.push({ t: 'fixed', az: 'shukran', ar: 'شكراً', key: 'thanks to' });
          items.push({ t: 'fixed', az: 'lil-kil', ar: 'للكل', key: 'everyone' });
          i = j + 2; continue;
        }
      }
      // how old is your brother → cham 3umr a5ook; how old is he → cham 3umra
      if (t.w === 'how' && plain(t1) && t1.w === 'old' && plain(t2) && /^(is|are|was|were)$/.test(t2.w) && toks[i + 3] && !toks[i + 3].punct && toks[i + 3].w !== 'you') {
        const t3 = toks[i + 3];
        const pp = { he: '3m', she: '3f', they: '3p', it: '3m' }[t3.w];
        if (pp) { const u = possess('3umr', 'عمر', pp); items.push({ t: 'fixed', az: 'cham ' + u[0], ar: 'چم ' + u[1], key: 'how old' }); i += 4; continue; }
        items.push({ t: 'fixed', az: 'cham 3umr', ar: 'چم عمر', key: 'how old' }); i += 3; continue;
      }
      if (t.w === 'would' && plain(t1) && (PRON_SUBJ[t1.w] || t1.w === 'you') && plain(t2) && t2.w === 'like' && toks[i + 3] && toks[i + 3].w === 'to') {
        items.push({ t: 'word', w: t1.w, o: t1.o }, { t: 'modal', m: 'want' }); i += 4; continue;
      }
      // you did a great job → abda3t
      if (DO_FORMS[t.w]) {
        let j = i + 1;
        if (plain(toks[j]) && (toks[j].w === 'a' || toks[j].w === 'an')) j++;
        if (plain(toks[j]) && GOOD_JOB.has(toks[j].w) && plain(toks[j + 1]) && (toks[j + 1].w === 'job' || toks[j + 1].w === 'work')) {
          items.push({ t: 'verb', key: 'excel', form: DO_FORMS[t.w], o: t.o }); i = j + 2; continue;
        }
      }
      // try my best → a7aawil gad ma agdar
      if ((DO_FORMS[t.w] || TRY_FORMS[t.w]) && plain(t1) && PRON_POSS[t1.w] && plain(t2) && t2.w === 'best') {
        const pp = resolveP(PRON_POSS[t1.w], ctx.addr);
        items.push({ t: 'verb', key: 'attempt', form: DO_FORMS[t.w] || TRY_FORMS[t.w], o: t.o });
        items.push({ t: 'fixed', az: 'gad ma ' + presentAz(GDAR, pp), ar: 'قد ما ' + presentAr(GDAR, pp), key: 'my best' });
        i += 3; continue;
      }
      // keep going / keep it up → kammil
      if (KEEP_FORMS[t.w] && plain(t1) && (t1.w === 'going' || (t1.w === 'it' && plain(t2) && t2.w === 'up'))) {
        items.push({ t: 'verb', key: 'continue', form: KEEP_FORMS[t.w], o: t.o }); i += t1.w === 'going' ? 2 : 3; continue;
      }
      let matched = false;
      for (let n = Math.min(MAXPHRASE + 2, toks.length - i); n >= 1 && !matched; n--) {
        const span = toks.slice(i, i + n);
        if (span.some((x) => x.punct || x.arabic || x.posss || x.keep)) continue;
        const key = span.map((x) => x.w).join(' ');
        const user = ctx.user && ctx.user.get(key);
        if (user) { items.push({ t: 'fixed', az: user.az, ar: user.ar, user: true, single: n === 1 && !VERB_FORM.has(key) }); i += n; matched = true; break; }
        const after = toks[i + n] && toks[i + n].w;
        if (n >= 2 && MODAL_MULTI[key] && (isVerbBase(after) || after === 'be' || (PHRASAL.get(after) && toks[i + n + 1]))) {
          items.push(Object.assign({ t: 'modal' }, MODAL_MULTI[key])); i += n; matched = true; break;
        }
        if (key === 'how much' && NOUN_FORM.has(after)) { items.push({ t: 'quant', q: 'cham' }); i += n; matched = true; break; }
        if (n >= 2 && NOUN_PHRASE.has(key)) { const np = NOUN_PHRASE.get(key); items.push({ t: 'noun', key: np.key, pl: np.pl, o: span.map((x) => x.o).join(' ') }); i += n; matched = true; break; }
        if (n >= 2 && MULTI[key]) { items.push(Object.assign({}, MULTI[key])); i += n; matched = true; break; }
        if ((key === 'a little' || key === 'a bit' || key === 'a little bit') && (NOUN_FORM.has(after) || ADJS[after])) {
          items.push({ t: 'quant', q: 'shwayya' }); i += n; matched = true; break;
        }
        const fx = FIXED.get(key);
        if (fx && (n >= 2 || !['please', 'sure', 'no', 'brother', 'like', 'same', 'back', 'help', 'rip', 'facts', 'true', 'wait', 'bet', 'cope', 'cooked', 'whoever'].includes(key) || isFixedAlone(key, toks, i)) && fixedFits(key, toks, i, n)) {
          const v = fx[ctx.addr] || fx.m;
          const prevIt = items[items.length - 1];
          if (n >= 2 && prevIt && prevIt.t === 'fixed' && prevIt.key === key) { i += n; matched = true; break; }   // "np np" → once
          const nounLike = key === 'a while' || key === 'a long time';
          items.push({ t: 'fixed', az: v[0], ar: v[1], key, forEnd: / for$/.test(key), user: nounLike, single: nounLike }); i += n; matched = true; break;
        }
      }
      if (matched) continue;
      // phrasal verbs: wake up, turn off...
      // a guy named Ahmed / a game called AQW → rayyal isma Ahmed
      if ((t.w === 'named' || (t.w === 'called' && t1 && /^[A-Z]/.test(t1.o || ''))) && t1 && !t1.punct && items.length) {
        const lw = items[items.length - 1];
        const nf = lw && lw.t === 'word' ? NOUN_FORM.get(lw.w) : null;
        if (nf && NOUNS[nf.key] && !PRON_SUBJ[lw.w] && !(plain(t1) && (PRON_OBJ[t1.w] || PRON_SUBJ[t1.w]))) {
          const g = NOUNS[nf.key].g === 'f' && !nf.pl;
          items.push({ t: 'fixed', az: nf.pl ? 'asaameehum' : g ? 'isimha' : 'isma', ar: nf.pl ? 'أساميهم' : g ? 'اسمها' : 'اسمه', key: 'named' }); i++; continue;
        }
      }
      // the filter is on / the light is off → shaghghaal / 6aafi
      if (/^(is|are|was|were|am)$/.test(t.w) && plain(t1) && (t1.w === 'on' || t1.w === 'off') && (!t2 || t2.punct || (plain(t2) && ['now', 'again', 'already', 'still', 'too', 'also', 'right', 'rn', 'atm', 'today', 'tonight', 'bro', 'dude', 'guys'].includes(t2.w)))) {
        items.push({ t: 'word', w: t.w, o: t.o }, { t: 'adj', key: t1.w === 'on' ? 'operating' : 'turned off' }); i += 2; continue;
      }
      // i tend to forget → 3aadatan ansa
      if (/^(tend|tends|tended)$/.test(t.w) && plain(t1) && t1.w === 'to' && plain(t2) && !t2.punct) {
        items.push({ t: 'adv', az: '3aadatan', ar: 'عادةً', mid: true, k: 'tend' }); i += 2;
        const vb = (verbInfo(t2.w) || []).find((r) => r.form === 'base');
        const t3 = toks[i + 1];
        if (vb && !AUX.has(t2.w) && !(PHRASAL.get(t2.w) && plain(t3) && PHRASAL.get(t2.w).some((r) => r.particle === t3.w))) { items.push({ t: 'verb', key: vb.key, form: 'base', o: t2.o }); i++; }
        continue;
      }
      // it exists / does not exist / existed → mawjood (an adjective, not a verb)
      if (t.w === 'exist' || t.w === 'exists' || t.w === 'existed') {
        const n = items.length;
        const isDo = (x) => x && x.t === 'word' && ['do', 'does', 'did'].includes(x.w);
        if (n >= 2 && items[n - 1].t === 'word' && items[n - 1].w === 'not' && isDo(items[n - 2])) items.splice(n - 2, 1);
        else if (n >= 2 && isDo(items[n - 2]) && !(items[n - 1].t === 'word' && items[n - 1].w === 'not')) items.splice(n - 2, 1);
        else if (n >= 3 && isDo(items[n - 3]) && items[n - 1].t === 'word' && items[n - 1].w !== 'not') items.splice(n - 3, 1);
        if (t.w === 'existed') items.push({ t: 'word', w: 'was', o: 'was' });
        items.push({ t: 'adj', key: 'existing' }); i++; continue;
      }
      const ph = PHRASAL.get(t.w);
      if (ph && toks[i + 1]) {
        const hit = ph.find((r) => r.particle === toks[i + 1].w || (r.particle.includes(' ') && toks.slice(i + 1, i + 1 + r.particle.split(' ').length).map((x) => x.w).join(' ') === r.particle));
        if (hit) {
          const form = phrasalForm(hit, ph, items);
          items.push({ t: 'verb', key: hit.key, form, o: t.o }); i += 1 + hit.particle.split(' ').length; continue;
        }
      }
      items.push({ t: 'word', w: t.w, o: t.o });
      i++;
    }
    return tag(items);
  }
  const DO_FORMS = { do: 'base', does: 's', did: 'past', doing: 'ing', done: 'pp' };
  const DO_LIKE_MAKE = { make: 'is', makes: 'is', made: 'was', making: 'is' };
  const CLICK_FORMS = { click: 'base', clicks: 's', clicked: 'past', press: 'base', pressed: 'past', tap: 'base', tapped: 'past', hit: 'base' };
  const GET_FORMS = { get: 'base', gets: 's', got: 'past', getting: 'ing', gotten: 'pp' };
  const ERR_GET = { get: 'base', gets: 's', got: 'past', getting: 'ing', keep_getting: 'ing' };
  const ERR_NOUNS = new Set(['error', 'errors', 'message', 'popup', 'warning', 'notification', 'bug', 'glitch', 'crash']);
  const WHAT_REL_VERBS = new Set(['do', 'say', 'take', 'get', 'eat', 'buy', 'use', 'choose', 'pick', 'bring', 'send', 'give', 'play', 'wear', 'write', 'order', 'sell', 'build', 'make', 'watch', 'read']);
  const TRY_FORMS = { try: 'base', tries: 's', tried: 'past', trying: 'ing' };
  const KEEP_FORMS = { keep: 'base', keeps: 's', kept: 'past', keeping: 'ing' };
  const GOOD_JOB = new Set(['great', 'good', 'nice', 'amazing', 'awesome', 'fantastic', 'excellent', 'wonderful', 'perfect']);
  /* Names that must stay as they are (game items, maps...). Returns how many tokens matched, or 0. */
  function matchKeep(keep, toks, i) {
    const cands = keep.get(toks[i].w);
    if (!cands) return 0;
    for (const c of cands) {
      if (i + c.length > toks.length) continue;
      let ok = true;
      for (let k = 0; k < c.length; k++) {
        const tk = toks[i + k];
        if (!tk || tk.punct || tk.arabic || tk.keep || tk.w !== c[k]) { ok = false; break; }
      }
      if (ok) return c.length;
    }
    return 0;
  }
  let KEEP_SRC = null, KEEP_MAP = null, KEEP_WORDS = null;
  function compileKeep(list) {
    if (!list || !list.length) return null;
    if (list === KEEP_SRC) return KEEP_MAP;
    const map = new Map(), words = new Set();
    for (const phrase of list) {
      const w = expandTokens(tokenize(String(phrase))).filter((t) => !t.punct).map((t) => t.w);
      while (w.length && (w[0] === 'the' || w[0] === 'a' || w[0] === 'an')) w.shift();
      if (w.length < 2) continue;
      w.forEach((x) => words.add(x));
      if (!map.has(w[0])) map.set(w[0], []);
      map.get(w[0]).push(w);
    }
    for (const arr of map.values()) arr.sort((a, b) => b.length - a.length);
    KEEP_SRC = list; KEEP_MAP = map; KEEP_WORDS = words;
    return map;
  }
  function isFixedAlone(key, toks, i) {
    const next = toks[i + 1];
    if (key === 'please') return true;
    if (key === 'no') {
      const pv = toks[i - 1];
      if (next && !next.punct && pv && !pv.punct && ['is', 'are', 'was', 'were', 'have', 'has', 'had', 'with', 'got', 'want', 'need', 'see', 'find', 'found', 'there'].includes(pv.w)) return false;
      return !next || next.punct || !(NOUN_FORM.has(next.w) || ADJS[next.w]);
    }
    if (key === 'sure') return (!next || !!next.punct) && startish(toks, i);
    const prevT = toks[i - 1], alone = (!prevT || prevT.punct || STARTERS.has(prevT.w)) && (!next || next.punct || ENDERS.has(next.w));
    if (key === 'same' || key === 'back' || key === 'facts' || key === 'true' || key === 'bet' || key === 'cope' || key === 'cooked') return alone;
    if (key === 'wait') return (!prevT || prevT.punct || STARTERS.has(prevT.w)) && (!next || next.punct);
    if (key === 'whoever') return (!prevT || prevT.punct) && !!next && !next.punct;
    if (key === 'help') return (!prevT || prevT.punct) && (!next || next.punct);
    if (key === 'rip') return !next || next.punct;
    if (key === 'brother') {
      const pw = toks[i - 1] && !toks[i - 1].punct ? toks[i - 1].w : null;
      if (pw && (PRON_POSS[pw] || DET[pw] || ADJS[pw] || NUMS[pw] || pw === "'s")) return false;
      return !toks[i - 1] || toks[i - 1].punct || !next || next.punct;
    }
    return false;
  }

  function tag(items) {
    const out = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (it.t !== 'word') { out.push(it); continue; }
      const w = it.w;
      const prev = out[out.length - 1];
      const nextRaw = items[i + 1];
      const nw = nextRaw && nextRaw.t === 'word' ? nextRaw.w : null;
      const nn = items[i + 2] && items[i + 2].t === 'word' ? items[i + 2].w : null;
      const ahead = [];
      for (let j = i + 1; j < items.length && ahead.length < 5; j++) {
        const x = items[j];
        if (x.t === 'word') ahead.push(x.w); else if (x.t === 'verb') ahead.push('@' + x.form); else break;
      }
      let prevNA = null;
      for (let j = out.length - 1; j >= 0; j--) { if (out[j].t !== 'adv') { prevNA = out[j]; break; } }
      out.push(tagWord(w, it.o, prev && prev.t === 'adv' && prevNA ? prevNA : prev, nw, nextRaw, nn, ahead, i, prev, out));
    }
    return out;
  }
  const HAVE_SKIP = new Set(['not', 'never', 'ever', 'already', 'just', 'always', 'still', 'also', 'really', 'finally', 'recently']);
  function perfectAhead(ahead, atStart) {
    let k = 0;
    if (atStart && (PRON_SUBJ[ahead[0]] || ahead[0] === 'you')) k++;   // have you seen...?
    while (k < ahead.length && HAVE_SKIP.has(ahead[k])) k++;
    const x = ahead[k];
    if (!x) return false;
    if (x === 'been') return true;
    if (x[0] === '@') return x === '@pp' || x === '@past';
    const v = verbInfo(x);
    return !!(v && v.some((r) => r.form === 'pp' || r.form === 'past') && !NOUN_FORM.has(x));
  }
  const QUANT_W = { many: 'wayed', much: 'wayed', several: 'kam', few: 'kam', plenty: 'wayed', numerous: 'wayed', countless: 'wayed' };
  const prevIs = (prev, ...types) => !!prev && types.includes(prev.t);
  function clauseStart(prev) { return !prev || prev.t === 'punct' || prev.t === 'conj' || (prev.t === 'fixed' && !prev.user); }

  const INDEF = new Set(['someone', 'somebody', 'anyone', 'anybody', 'everyone', 'everybody', 'nobody', 'no one', 'something', 'anything', 'everything', 'nothing']);
  /* "the bot that farms gold", "the guy who helped me", "the item that i wanted" */
  function isRel(w, prev, nw, nextRaw, hist) {
    if (!prev || !nextRaw || nextRaw.t === 'punct') return false;
    const ante = prev.t === 'noun' || (prev.t === 'fixed' && (prev.user || INDEF.has(prev.key)));
    if (!ante) return false;
    if (w === 'who') return true;
    // "i told my friend that ..." → "that" starts what was said
    for (let j = hist.length - 2; j >= 0; j--) {
      const h = hist[j];
      if (['det', 'adj', 'noun', 'num', 'quant'].includes(h.t) || (h.t === 'pron' && h.role === 'poss') || (h.t === 'adv' && h.int)) continue;
      if (h.t === 'verb' && THAT_VERBS.has(h.key)) return false;
      if (h.t === 'pron' && (h.role === 'obj' || h.role === 'any') && hist[j - 1] && hist[j - 1].t === 'verb' && THAT_VERBS.has(hist[j - 1].key)) return false;
      break;
    }
    if (nextRaw.t === 'verb') return true;
    if (!nw) return false;
    if (PRON_SUBJ[nw] || nw === 'you' || AUX.has(nw) || MODAL[nw] || nw === 'not' || nw === 'never') return true;
    const v = verbInfo(nw);
    return !!(v && v.some((r) => r.form === 's' || r.form === 'past' || (r.form === 'base' && !NOUN_FORM.has(nw))));
  }
  function tagWord(w, o, prev, nw, nextRaw, nn, ahead, idx, rawPrev, hist) {
    hist = hist || [];
    if ((w === 'that' || w === 'who' || w === 'which') && isRel(w, rawPrev, nw, nextRaw, hist)) return { t: 'rel', w };
    const h2 = hist[hist.length - 2];
    if (w === 'that' && rawPrev && rawPrev.t === 'pron' && rawPrev.role !== 'poss' && h2 && h2.t === 'verb' && THAT_VERBS.has(h2.key) && nw &&
      (PRON_SUBJ[nw] || nw === 'you' || nw === 'it' || DET[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw))) return { t: 'conj', w: 'that', az: '', ar: '', inn: true };
    if (w === 'that' && rawPrev && rawPrev.t === 'fixed' && THAT_FIXED.has(rawPrev.key) && nw && (PRON_SUBJ[nw] || nw === 'you' || nw === 'it' || DET[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw)) &&
      !(nn && (NOUN_FORM.has(nn) || ADJS[nn]) && (DET[nw] || NOUN_FORM.has(nw)) === false)) return { t: 'conj', w: 'that', az: '', ar: '', inn: !/hope|wish/.test(rawPrev.key) };
    if (w === 'cause' && nw && (PRON_SUBJ[nw] || nw === 'you' || nw === 'it' || DET[nw] || DEM[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw) || INDEF.has(nw)) &&
        !(rawPrev && (rawPrev.t === 'det' || rawPrev.t === 'adj' || rawPrev.t === 'prep' || rawPrev.t === 'num' || (rawPrev.t === 'pron' && rawPrev.role === 'poss')))) return { t: 'conj', w: 'because', az: '3ashaan', ar: 'عشان' };
    // "ill be back" = i'll; "id like" = i'd; "then" at the end = in that case; "like 3 months" = about
    if (w === 'then' && (!nextRaw || nextRaw.t === 'punct') && hist.length && hist[hist.length - 1].t !== 'punct') return { t: 'adv', az: '3ayal', ar: 'عيل' };
    if ((w === 'though' || w === 'tho') && (!nextRaw || nextRaw.t === 'punct') && hist.length) return { t: 'adv', az: '', ar: '' };
    if (w === 'rip' && nw && (DET[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw))) return { t: 'fixed', az: 'raa7', ar: 'راح', key: 'rip' };
    if (w === 'like' && nw && (NUMS[nw] || /^\d/.test(nw)) && !(rawPrev && rawPrev.t === 'pron' && rawPrev.role === 'subj')) return { t: 'adv', az: 'tagreeban', ar: 'تقريباً' };
    if (w === 'windows' && !(rawPrev && (rawPrev.t === 'det' || rawPrev.t === 'adj' || rawPrev.t === 'num' || rawPrev.t === 'quant' || (rawPrev.t === 'pron' && rawPrev.role === 'poss')))) return { t: 'fixed', az: 'windows', ar: 'ويندوز', key: 'windows', user: true, single: true };
    // sounds easy / looks fine at the start of a clause: a verb, not a noun
    if (['sounds', 'seems', 'looks', 'feels'].includes(w) && clauseStart(rawPrev) && nw && (ADJS[nw] || nw === 'like' || FIXED.has(nw))) { const v = (verbInfo(w) || []).find((x) => x.form === 's'); if (v) return { t: 'verb', key: v.key, form: 's', o }; }
    if ((w === 'that' || w === 'this') && nw && ADJS[nw] && !NOUN_FORM.has(nw) && !(nn && (NOUN_FORM.has(nn) || ADJS[nn]))) {
      const h1 = hist[hist.length - 1], h0 = hist[hist.length - 2];
      if (h1 && (h1.t === 'neg' || (h1.t === 'aux' && h0 && !['punct', 'conj', 'wh'].includes(h0.t)))) return { t: 'adv', az: 'wayed', ar: 'وايد', int: true };
    }
    // it keeps crashing → ya6'all y6ee7
    if (KEEP_FORMS[w] && nextRaw && (nextRaw.t === 'word' ? (verbInfo(nextRaw.w) || []).some((r) => r.form === 'ing') : nextRaw.t === 'verb' && nextRaw.form === 'ing')) return { t: 'modal', m: 'keep', w, past: w === 'kept' };
    let r = null;
    const vb = verbInfo(w);
    if (vb && vb.some((x) => x.form === 'base') && rawPrev && (['noun', 'unk'].includes(rawPrev.t) || (rawPrev.t === 'pron' && rawPrev.role !== 'poss') || (rawPrev.t === 'fixed' && (rawPrev.user || INDEF.has(rawPrev.key))))) {
      for (let j = hist.length - 1; j >= 0; j--) {   // does the event last? → a verb after "does + subject"
        const h = hist[j];
        if (h.t === 'verb' || h.t === 'punct' || h.t === 'conj' || h.t === 'modal' || h.t === 'rel') break;
        if (h.t === 'aux' && (h.w === 'do' || h.w === 'does' || h.w === 'did')) { const b = vb.find((x) => x.form === 'base'); r = { t: 'verb', key: b.key, form: 'base', o }; break; }
      }
    }
    if (!r && vb && vb.some((x) => x.form === 'base') && rawPrev && rawPrev.t === 'pron' && (rawPrev.role === 'obj' || rawPrev.role === 'any') && h2 && h2.t === 'verb' &&
        ['help', 'let', 'make', 'watch', 'see', 'hear'].includes(h2.key) && (!NOUN_FORM.has(w) || !nw || DET[nw] || PRON_POSS[nw] || PRON_OBJ[nw] || nw === 'it' || (nextRaw && nextRaw.t === 'punct'))) {
      const b = vb.find((x) => x.form === 'base'); r = { t: 'verb', key: b.key, form: 'base', o };
    }
    // he hit me / the arrow hit him / it cost 5 dollars: a base-looking form after a 3rd-person-singular subject can only be the past
    if (!r && vb && rawPrev && !(nw && NOUN_FORM.has(nw) && NOUN_FORM.has(w) && !PRON_SUBJ[rawPrev.w]) &&
        ((rawPrev.t === 'pron' && rawPrev.role === 'subj' && ['he', 'she'].includes(rawPrev.w)) || (rawPrev.t === 'pron' && rawPrev.w === 'it') || (rawPrev.t === 'noun' && !rawPrev.pl) || (rawPrev.t === 'unk' && (rawPrev.name || /^[A-Z]/.test(rawPrev.o || ''))))) {
      const same = vb.find((x) => x.form === 'past' && vb.some((y) => y.key === x.key && y.form === 'base'));
      if (same) {
        let ok = true;
        for (let j = hist.length - 2; j >= 0; j--) { const h = hist[j]; if (h.t === 'punct' || h.t === 'conj' || h.t === 'rel' || h.t === 'wh') break; if (h.t === 'aux' || h.t === 'modal' || h.t === 'verb' || h.t === 'to' || h.t === 'neg') { ok = false; break; } }
        if (ok) r = { t: 'verb', key: same.key, form: 'past', o };
      }
    }
    if (!r) r = tagWord0(w, o, prev, nw, nextRaw, nn, ahead, idx, rawPrev);
    if (r && r.t === 'verb') {
      if (r.key === 'get' && nw && (['home', 'there', 'here'].includes(nw) || (nw === 'to' && nn && !isVerbBase(nn) && nn !== 'be' && nn !== 'know'))) r.key = 'arrive';
      else if (r.key === 'think' && (r.form === 'ing' || !nextRaw || nextRaw.t === 'punct' || ['about', 'of', 'again', 'over'].includes(nw))) r.key = 'ponder';
    } else if (r && r.t === 'noun' && r.key === 'time' && rawPrev && (rawPrev.t === 'num' || (rawPrev.t === 'det' && ['this', 'that', 'every', 'another'].includes(rawPrev.w)) ||
        (rawPrev.t === 'adj' && ['first', 'last', 'next', 'other'].includes(rawPrev.key)) || (r.pl && (rawPrev.t === 'quant' || (rawPrev.t === 'adv' && rawPrev.az === 'wayed'))))) {
      r.key = 'occasion';   // three times → thalath marraat, this time → hal marra
    } else if (r && r.t === 'noun' && r.key === 'work' && !r.pl) {
      // finish work, my work starts at seven → dawaam
      const startNext = !!nw && (verbInfo(nw) || []).some((x) => ['start', 'begin', 'end', 'finish'].includes(x.key) && x.form !== 'ing');
      if ((rawPrev && rawPrev.t === 'verb' && ['finish', 'start', 'begin', 'end', 'leave', 'complete'].includes(rawPrev.key)) || (startNext && rawPrev && (rawPrev.t === 'pron' || rawPrev.t === 'det'))) r.key = 'shift';
    }
    return r;
  }
  function tagWord0(w, o, prev, nw, nextRaw, nn, ahead, idx, rawPrev) {
    ahead = ahead || [];
    // Void Paladin Slayer Blade: a capitalised word right after a name stays part of the name
    if (idx > 0 && /^[A-Z][a-z]/.test(o) && rawPrev && ((rawPrev.t === 'unk' && rawPrev.name) || (rawPrev.t === 'fixed' && rawPrev.keep && /^[A-Z]/.test(rawPrev.az || ''))) && !PRON_SUBJ[w] && !AUX.has(w)) return { t: 'unk', o, w, name: true };
    if (idx > 0 && /^[A-Z][a-z]/.test(o) && nextRaw && nextRaw.t === 'word' && /^[A-Z][a-z]/.test(nextRaw.o) && !PRON_SUBJ[w] && !AUX.has(w) && !DET[w] && !CONJ[w] && !PREP[w] && !WH[w] && !MODAL[w] && !(rawPrev && rawPrev.t === 'punct') && !STARTERS.has(w) && !FIXED.has(w + ' ' + nextRaw.w)) return { t: 'unk', o, w, name: true };   // the Dark Fortress
    if ((w === 'about' || w === 'around' || w === 'roughly' || w === 'approximately') && ((nw && (/^\d/.test(nw) || NUMS[nw] || (nw === 'a' && nn && (/^(minute|hour|day|week|month|year|hundred|thousand|million)/.test(nn) || NUMS[nn] || /^\d/.test(nn))))) || (nextRaw && nextRaw.t === 'num'))) return { t: 'adv', az: 'tagreeban', ar: 'تقريباً' };
    if (w === 'mid' && (!nw || (nextRaw && nextRaw.t === 'punct') || prevIs(prev, 'aux', 'adv') || ['so', 'kinda', 'pretty', 'very', 'really', 'bit', 'little'].includes(prev && prev.w))) return { t: 'adj', key: 'mid' };
    if (w === 'simply' && nw !== 'put') { const v = verbInfo(nw); return { t: 'adv', az: 'bas', ar: 'بس', mid: !!(v || AUX.has(nw) || MODAL[nw]) }; }
    if (w === 'just') {
      const v = verbInfo(nw);
      if (v && v.some((r) => r.form === 'past' || r.form === 'pp') && !v.some((r) => r.form === 'base')) return { t: 'adv', az: 'taww', ar: 'تو', mid: true, k: 'just' };
      return { t: 'adv', az: 'bas', ar: 'بس', mid: !!(v || AUX.has(nw) || MODAL[nw]) };
    }
    if (w === 'old' && prev && prev.t === 'noun' && prev.key === 'year') return { t: 'adv', az: '', ar: '' };
    if (w === 'enough' && prev && (prev.t === 'adj' || prev.t === 'adv')) return { t: 'adv', az: 'kifaaya', ar: 'كفاية' };
    if (w === 'next' && (!nextRaw || nextRaw.t === 'punct') && prev && prev.t !== 'det') return { t: 'adv', az: 'ba3dain', ar: 'بعدين', k: 'next' };
    if (QUANT_W[w] && nw && NOUN_FORM.has(nw)) return { t: 'quant', q: QUANT_W[w] };
    if ((w === 'much' || w === 'many') && !(nw && NOUN_FORM.has(nw))) return { t: 'adv', az: 'wayed', ar: 'وايد' };
    const nextIsNounish = !!nw && (NOUN_FORM.has(nw) || !!ADJS[nw] || (!verbInfo(nw) && !PREP[nw] && !AUX.has(nw) && !MODAL[nw] && !PRON_SUBJ[nw] && !PRON_OBJ[nw] && !CONJ[nw] && !ADV[nw] && /^[a-z]/.test(nw) && !FIXED.has(nw)));
    if (/^\d+([.,]\d+)?$/.test(w)) return { t: 'num', az: o, ar: o, n: parseFloat(w.replace(',', '.')) };
    if (/^\d+(\.\d+)?[km]$/.test(w)) return { t: 'num', az: o, ar: o, n: parseFloat(w) * (/k$/.test(w) ? 1000 : 1e6) };
    const tm = w.match(/^(\d{1,2})(am|pm)$/);
    if (tm) {
      const h = +tm[1], pm = tm[2] === 'pm';
      const part = pm ? (h === 12 ? ["i6'-6'uhur", 'الظهر'] : h <= 5 ? ['il-3a9ir', 'العصر'] : ['il-lail', 'الليل']) : (h <= 4 || h === 12 ? ['il-fayir', 'الفير'] : ['i9-9ub7', 'الصبح']);
      return { t: 'num', az: 'is-saa3a ' + h + ' ' + part[0], ar: 'الساعة ' + h + ' ' + part[1], n: h, time: true };
    }
    if (NUMS[w] && !(w === 'one' && (prevIs(prev, 'det') || prevIs(prev, 'adj')))) return Object.assign({ t: 'num' }, NUMS[w]);
    if (w === 'to' && (!nextRaw || nextRaw.t === 'punct') && prev && ((prev.t === 'verb' && ['want', 'need', 'have', 'like', 'love', 'try', 'go', 'hate', 'forget', 'remember', 'attempt', 'start', 'begin'].includes(prev.key)) || prev.t === 'modal')) return { t: 'adv', az: '', ar: '' };
    if (w === 'to') return isVerbBase(nw) || (nextRaw && nextRaw.t === 'verb') || nw === 'be' ? { t: 'to' } : { t: 'prep', key: '7ag', eng: 'to' };
    if (w === 'i' || w === 'he' || w === 'she' || w === 'we' || w === 'they') return { t: 'pron', w, role: 'subj' };
    if (w === 'me' || w === 'him' || w === 'us' || w === 'them') return { t: 'pron', w, role: 'obj' };
    if (w === 'my' || w === 'his' || w === 'our' || w === 'their' || w === 'its' || w === 'your') return { t: 'pron', w, role: 'poss' };
    if (w === 'her') return nw && isNounish(nw) ? { t: 'pron', w, role: 'poss' } : { t: 'pron', w, role: 'obj' };
    if (w === 'you' || w === 'it') {
      const objNext = !!nn && (!!PRON_OBJ[nn] || nn === 'it' || nn === 'you' || !!DET[nn] || !!PRON_POSS[nn] || !!DEM[nn]);
      const nextVerbish = !!nw && !!(verbInfo(nw) || AUX.has(nw) || MODAL[nw] || nw === 'not') && (!NOUN_FORM.has(nw) || (objNext && !!verbInfo(nw)));
      if (prev && prev.t === 'verb' && THAT_VERBS.has(prev.key) && nextVerbish) return { t: 'pron', w, role: 'subj' };
      if (prev && prev.t === 'verb' && INTRANS.has(prev.key) && nextVerbish) return { t: 'pron', w, role: 'subj' };   // every time i log in it crashes
      if (prev && prev.t === 'verb' && nw && (MODAL[nw] || (AUX.has(nw) && !['be', 'been', 'being'].includes(nw)))) return { t: 'pron', w, role: 'subj' };
      return { t: 'pron', w, role: prevIs(prev, 'verb', 'prep', 'pron') && !(prev.t === 'pron') ? 'obj' : 'any' };
    }
    if (PRON_OWN[w]) return { t: 'own', w };
    if (w === 'that' && ((prev && prev.t === 'verb' && THAT_VERBS.has(prev.key)) || (rawPrev && rawPrev.t === 'fixed' && FIX_KNOW.has(rawPrev.key))) && nw && (PRON_SUBJ[nw] || nw === 'you' || nw === 'it' || DET[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw))) return { t: 'conj', w: 'that', az: '', ar: '', inn: true };
    if (w === 'that' && prev && prev.t === 'aux' && ['is', 'was'].includes(prev.w) && rawPrev && nw && (PRON_SUBJ[nw] || nw === 'you' || nw === 'it' || DET[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw)) && nn && (verbInfo(nn) || AUX.has(nn) || MODAL[nn] || NOUN_FORM.has(nn) || nn === 'not')) return { t: 'conj', w: 'that', az: 'inn', ar: 'إن', inn: true };
    if (w === 'that' && prev && prev.t === 'adj' && ['sure', 'glad', 'happy', 'sorry', 'afraid', 'surprised', 'sad'].includes(prev.key) && nw && (PRON_SUBJ[nw] || nw === 'you' || nw === 'it' || DET[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw))) return { t: 'conj', w: 'that', az: '', ar: '', inn: true };
    if (DEM[w]) return nw && (isNounish(nw) || (nextIsNounish && nextRaw && nextRaw.t === 'word' && !(nn && (verbInfo(nn) || AUX.has(nn))))) && !(prevIs(prev, 'aux') && !NOUN_FORM.has(nw) && ADJS[nw]) ? { t: 'det', w: DET[w] } : { t: 'dem', w };
    if (w === 'there' && nw && ['is', 'are', 'was', 'were', 'will', 'has', 'have'].includes(nw)) return { t: 'there' };
    if (w === 'there' && prev && prev.t === 'aux' && ['is', 'are', 'was', 'were'].includes(prev.w) && ((nw && (DET[nw] || ['a', 'an', 'any', 'no', 'some', 'anyone', 'anybody', 'someone', 'something', 'anything', 'nothing', 'nobody'].includes(nw) || NOUN_FORM.has(nw) || QUANT_W[nw] || /^\d/.test(nw) || NUMS[nw])) ||
      (nextRaw && nextRaw.t === 'fixed' && /^(anyone|anybody|someone|somebody|something|anything|nothing|nobody|no one)$/.test(nextRaw.key)))) return { t: 'there', q: true };
    if (w === 'have' || w === 'has' || w === 'had') {
      if (perfectAhead(ahead, clauseStart(prev) || (prev && prev.t === 'wh'))) return { t: 'aux', w };
      return { t: 'verb', key: 'have', form: w === 'had' ? 'past' : w === 'has' ? 's' : 'base', o };
    }
    if (w === 'do' || w === 'does' || w === 'did') {
      const qStart = clauseStart(prev) || (prev && prev.t === 'wh');
      let npThenVerb = false;
      if (qStart && nw && (DET[nw] || DEM[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw))) {
        for (let k = 1; k < ahead.length; k++) {
          if (!isVerbBase(ahead[k])) continue;
          const b = ahead[k - 1];
          if (!(DET[b] && !DEM[b]) && !PRON_POSS[b] && !ADJS[b]) { npThenVerb = true; break; }   // does your train leave: "train" after "your" is the noun
        }
        if (DEM[ahead[0]] && isVerbBase(ahead[1]) && (ahead.length === 2 || !NOUN_FORM.has(ahead[1]))) npThenVerb = true;
      }
      const indNext = nextRaw && nextRaw.t === 'fixed' && INDEF.has(nextRaw.key) && qStart;
      if (indNext) return { t: 'aux', w };
      if (npThenVerb || !nw || nw === 'not' || (PRON_SUBJ[nw] && (qStart || nw !== 'it')) || isVerbBase(nw) || (nextRaw && nextRaw.t === 'verb')) {
        if (!nw || (nextRaw && nextRaw.t === 'punct')) return { t: 'verb', key: 'do', form: w === 'did' ? 'past' : w === 'does' ? 's' : 'base', o };
        return { t: 'aux', w };
      }
      return { t: 'verb', key: 'do', form: w === 'did' ? 'past' : w === 'does' ? 's' : 'base', o };
    }
    if (AUX.has(w)) return { t: 'aux', w };
    if (MODAL[w]) return { t: 'modal', m: MODAL[w], past: w === 'could' ? 'maybe' : false, w };
    if (w === 'not' || w === 'never') return { t: 'neg', w };
    if (w === 'so' || w === 'too' || w === 'very' || w === 'really' || w === 'pretty' || w === 'quite') {
      if (nw && (ADJS[nw] || (ADV[nw] && !ADV[nw].mid && w !== 'really'))) return { t: 'adv', az: 'wayed', ar: 'وايد', int: true };
      if (w === 'so') return { t: 'conj', w, az: '3ashaan chidhi', ar: 'عشان چذي' };
      if (w === 'too' && (nw === 'many' || nw === 'much')) return { t: 'adv', az: '', ar: '' };
      if (w === 'too') return { t: 'adv', az: 'ba3ad', ar: 'بعد' };
      if (w === 'really') return { t: 'adv', az: '9idj', ar: 'صدج', mid: true };
    }
    if (WH[w] && !(w === 'what' && prev && prev.t === 'verb')) {
      if ((w === 'what' || w === 'which') && nw && NOUN_FORM.has(nw)) return { t: 'det', w: 'which' };
      if (w === 'when' && !clauseStart(prev)) return { t: 'conj', w, az: 'lamma', ar: 'لما' };
      if (w === 'when' && nw && (PRON_SUBJ[nw] || nw === 'you' || nw === 'it' || DET[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw)) && !AUX.has(nw) && !MODAL[nw]) return { t: 'conj', w, az: 'lamma', ar: 'لما' };
      return { t: 'wh', w };
    }
    if (w === 'what' && prev && prev.t === 'verb') return { t: 'wh', w };
    if (CONJ[w] && !(w === 'that')) {
      if ((w === 'before' || w === 'after') && false) return null;
      return { t: 'conj', w, az: CONJ[w][0], ar: CONJ[w][1] };
    }
    if ((w === 'before' || w === 'after') && nw && PRON_SUBJ[nw]) return { t: 'conj', w, az: w === 'before' ? 'gabil la' : 'ba3d ma', ar: w === 'before' ? 'قبل لا' : 'بعد ما' };
    if (w === 'like') {
      if (prevIs(prev, 'pron', 'aux', 'neg', 'modal', 'to') && !(prev.t === 'pron' && prev.role === 'obj')) return { t: 'verb', key: 'like', form: 'base', o };
      if (prev && prev.t === 'pron' && prev.role === 'subj') return { t: 'verb', key: 'like', form: 'base', o };
      return { t: 'prep', key: 'mithil', eng: 'like' };
    }
    if (PREP[w] && !(w === 'over' && !nw)) return { t: 'prep', key: PREP[w], eng: w };
    if (DET[w]) return { t: 'det', w: DET[w] };
    if (w === 'home' && prev && prev.t === 'verb' && VERBS[prev.key] && VERBS[prev.key].to === 'drop') return { t: 'adv', az: 'il-bait', ar: 'البيت' };
    if (w === 'home' && prev && ((prev.t === 'verb' && ['stay', 'sit', 'sleep', 'work', 'study', 'play', 'rest', 'eat', 'wait'].includes(prev.key)) || (prev.t === 'aux' && ['am', 'is', 'are', 'was', 'were', 'be', 'been'].includes(prev.w)))) return { t: 'adv', az: 'fil-bait', ar: 'في البيت' };
    if (w === 'please') return { t: 'adv', az: '', ar: '', please: true };

    const vf = verbInfo(w), nf = NOUN_FORM.get(w), af = ADJS[w], adv = ADV[w];
    if (af && adv && !adv.mid && prev && prev.t === 'verb' && !(nw && NOUN_FORM.has(nw))) return Object.assign({ t: 'adv' }, adv);
    if (vf && prev && prev.t === 'prep') {
      const ing = vf.find((r) => r.form === 'ing');
      if (ing && VERBS[ing.key] && VERBS[ing.key].ms) return { t: 'verb', key: ing.key, form: 'ing', o };
    }
    if (vf && prev && prev.t === 'rel') return pickVerb(vf, prev, o);
    const forcesVerb = prevIs(prev, 'aux', 'modal', 'neg', 'to') || (prev && prev.t === 'pron' && prev.role !== 'poss' && prev.role !== 'obj' && prev.w !== 'it' ? true : false) || (prev && prev.t === 'pron' && prev.w === 'it' && !!vf);
    const forcesNoun = prevIs(prev, 'det', 'quant', 'num', 'prep') || (prev && prev.t === 'pron' && prev.role === 'poss') || (prev && prev.t === 'adj');
    const afterBe = prev && prev.t === 'aux' && ['am', 'is', 'are', 'was', 'were', 'be', 'been'].includes(prev.w);
    if (vf && afterBe) {
      const objNext = !!nw && (!!DET[nw] || !!PRON_OBJ[nw] || !!PRON_POSS[nw] || NOUN_FORM.has(nw) || nw === 'it' || nw === 'you');
      const ingOrPp = (af && /ing$/.test(w) && !objNext) ? null : vf.find((r) => r.form === 'ing') || (af ? null : vf.find((r) => r.form === 'pp'));
      if (ingOrPp) return { t: 'verb', key: ingOrPp.key, form: ingOrPp.form, o };
    }
    if (af && (afterBe || (forcesNoun && nw && NOUN_FORM.has(nw)) || (!vf && !nf) || (nf && nw && NOUN_FORM.has(nw) && !forcesVerb && af))) {
      if (!(nf && forcesNoun && !(nw && NOUN_FORM.has(nw)))) return { t: 'adj', key: w };
    }
    if (vf && forcesVerb) return pickVerb(vf, prev, o);
    if (nf && forcesNoun) return { t: 'noun', key: nf.key, pl: nf.pl, o };
    if (vf && clauseStart(prev) && (vf.some((r) => r.form === 'base') && (!nw || PRON_OBJ[nw] || DET[nw] || PRON_POSS[nw] || nw === 'it' || NOUN_FORM.has(nw) || ADV[nw] || PREP[nw] || (nextRaw && nextRaw.t === 'punct')))) return pickVerb(vf, prev, o, true);
    if (vf && prev && (prev.t === 'noun' || prev.t === 'dem') && vf.some((r) => r.form === 'past' || r.form === 's')) return pickVerb(vf, prev, o);
    if (af && vf && prev && prev.t === 'verb' && ['say', 'tell', 'show'].includes(prev.key) && nw && !NOUN_FORM.has(w)) return { t: 'adj', key: w };
    if (vf && prev && prev.t === 'verb' && (vf.some((r) => r.form === 'ing') || (!nf && vf.some((r) => r.form === 'base') && ['go', 'come', 'help', 'let', 'make'].includes(prev.key)))) return pickVerb(vf, prev, o);
    if (vf && prev && (prev.t === 'adv' || prev.t === 'fixed') && vf.some((r) => r.form === 'ing')) return pickVerb(vf, prev, o);
    if (nf) return { t: 'noun', key: nf.key, pl: nf.pl, o };
    if (af) return { t: 'adj', key: w };
    if (adv) return Object.assign({ t: 'adv' }, adv);
    if (vf) return pickVerb(vf, prev, o);
    if (FIXED.has(w)) { const v = FIXED.get(w); return { t: 'fixed', az: v.m[0], ar: v.m[1], key: w }; }
    return { t: 'unk', o, w, name: (idx > 0 || (nextRaw && nextRaw.t === 'posss')) && /^[A-Z][a-z]/.test(o) };
  }
  function pickVerb(list, prev, o, start) {
    const want = prev && prev.t === 'aux' && ['am', 'is', 'are', 'was', 'were', 'be', 'been'].includes(prev.w) ? ['ing', 'pp', 'past'] :
      prev && prev.t === 'aux' && ['have', 'has', 'had'].includes(prev.w) ? ['pp', 'past'] : start ? ['base'] : ['base', 's', 'past', 'ing', 'pp'];
    for (const f of want) { const r = list.find((x) => x.form === f); if (r) return { t: 'verb', key: r.key, form: r.form, o }; }
    return { t: 'verb', key: list[0].key, form: list[0].form, o };
  }

  /* ====================================================================== */
  /*  Chunks                                                                 */
  /* ====================================================================== */
  function isNPStart(items, i) {
    const it = items[i];
    if (!it) return false;
    if (it.t === 'fixed' && it.user && it.single) return true;
    if (it.t === 'det' || it.t === 'quant' || it.t === 'num' || it.t === 'noun') return true;
    if (it.t === 'pron' && it.role === 'poss') return true;
    if (it.t === 'adj' || (it.t === 'adv' && it.int)) {
      let j = i;
      while (items[j] && (items[j].t === 'adj' || (items[j].t === 'adv' && items[j].int))) j++;
      return !!items[j] && (items[j].t === 'noun' || items[j].t === 'unk');
    }
    return false;
  }
  function readNP(items, i) {
    const np = { k: 'NP', det: null, poss: null, quant: null, num: null, ints: 0, adjs: [], nouns: [] };
    let j = i;
    for (; j < items.length; j++) {
      const it = items[j];
      const empty = !np.nouns.length;
      if (it.t === 'det' && np.det === 'all' && it.w === 'def' && empty) continue;
      if (it.t === 'det' && empty && !np.det && !np.adjs.length) { np.det = it.w; continue; }
      if (it.t === 'pron' && it.role === 'poss' && empty && !np.poss) { np.poss = it.w; continue; }
      if (it.t === 'quant' && empty && !np.quant) { np.quant = it.q; continue; }
      if (it.t === 'num' && empty && !np.num) { np.num = it; continue; }
      if (it.t === 'adv' && it.int && empty) { np.ints++; if (it.az !== 'wayed') np.intWord = [it.az, it.ar]; continue; }
      if (it.t === 'adj' && empty) { np.adjs.push(it); continue; }
      if (it.t === 'noun' && ['rank', 'level', 'tier', 'lvl', 'grade', 'stage', 'phase', 'season', 'chapter', 'episode', 'part', 'page', 'room', 'floor', 'number'].includes(it.key) && items[j + 1] && items[j + 1].t === 'num' && items[j + 2] && items[j + 2].t === 'noun' && !np.nouns.length) {
        np.tag = [it, items[j + 1]]; j += 1; continue;   // rank 10 class → il-class rank 10
      }
      if (it.t === 'noun') { np.nouns.push(it); continue; }
      if (it.t === 'fixed' && it.user && it.single && empty) { np.nouns.push({ user: it }); j++; break; }
      if (it.t === 'unk' && empty && (np.det || np.poss || np.adjs.length || np.quant || np.num)) {
        np.nouns.push({ unk: it.o });
        if (items[j + 1] && items[j + 1].t === 'noun') continue;   // my discord server: discord describes server
        j++;
        break;
      }
      break;
    }
    if (!np.nouns.length) {
      if (np.adjs.length) return { chunk: { k: 'ADJP', ints: np.ints, adjs: np.adjs, det: np.det }, end: j };
      if (np.quant) return { chunk: { k: 'QUANTALONE', q: np.quant }, end: j };
      if (np.num) return { chunk: { k: 'NUM', it: np.num }, end: j };
      if (np.det) return { chunk: { k: 'DETALONE', det: np.det }, end: j };
      if (np.poss) return { chunk: { k: 'OWN', w: POSS_TO_OWN[np.poss] || 'mine' }, end: j };
      return { chunk: { k: 'DETALONE', det: null }, end: Math.max(j, i + 1) };
    }
    if (items[j] && items[j].t === 'posss' && items[j + 1]) {
      const owner = np;
      const r = readNP(items, j + 1);
      if (r.chunk.k === 'NP') { r.chunk.owner = owner; return r; }
    }
    return { chunk: np, end: j };
  }
  function readVG(items, i) {
    const vg = { k: 'VG', parts: [] };
    let j = i;
    if (items[j] && items[j].t === 'to') { vg.toInf = true; j++; }
    while (j < items.length) {
      const it = items[j];
      if (it.t === 'aux' || it.t === 'modal' || it.t === 'neg') { vg.parts.push(it); j++; continue; }
      if (it.t === 'adv' && it.mid && vg.parts.length && j + 1 < items.length && ['verb', 'aux', 'neg', 'modal'].includes(items[j + 1].t)) { vg.parts.push(it); j++; continue; }
      if (it.t === 'adv' && it.mid && vg.parts.some((x) => x.t === 'aux' && ['am', 'is', 'are', 'was', 'were', 'be'].includes(x.w)) && !vg.parts.some((x) => x.t === 'verb')) { vg.parts.push(it); j++; continue; }
      if (it.t === 'to' && vg.parts.length && !vg.parts.some((x) => x.t === 'aux' && ['am', 'is', 'are', 'was', 'were'].includes(x.w)) && items[j + 1] && (items[j + 1].t === 'verb' || items[j + 1].t === 'aux')) { j++; continue; }
      if (it.t === 'verb') { vg.parts.push(it); j++; break; }
      break;
    }
    return { chunk: vg, end: j };
  }
  function readIng(items, j, pp) {
    pp.ing = { key: items[j].key };
    j++;
    const x = items[j];
    if (x && isNPStart(items, j)) { const r = readNP(items, j); pp.ing.obj = r.chunk; j = r.end; }
    else if (x && x.t === 'pron' && x.role !== 'subj' && x.role !== 'poss') { pp.ing.objPron = x.w; j++; }
    else if (x && x.t === 'dem') { pp.ing.obj = { k: 'DEM', w: x.w }; j++; }
    else if (x && x.t === 'unk') { pp.ing.obj = { k: 'UNK', it: x }; j++; }
    return j;
  }
  function chunk(items) {
    const C = [];
    let i = 0;
    while (i < items.length) {
      const it = items[i];
      if (it.t === 'fixed' && it.forEnd && items[i + 1] && items[i + 1].t === 'verb' && items[i + 1].form === 'ing') {
        C.push({ k: 'FIXED', it });
        const pp = { k: 'PP', key: null, eng: null, obj: null, afterFixed: true };
        i = readIng(items, i + 1, pp);
        C.push(pp); continue;
      }
      if (it.t === 'unk' && items[i + 1] && items[i + 1].t === 'posss' && isNPStart(items, i + 2)) {
        const r = readNP(items, i + 2);
        if (r.chunk.k === 'NP') { r.chunk.owner = { k: 'UNK', it }; C.push(r.chunk); i = r.end; continue; }
      }
      // a stranded "not" in front of a noun, adjective, pronoun or time: "a word, not a name" → mob isim
      if (it.t === 'neg' && it.w === 'not' && items[i + 1] && !['verb', 'aux', 'modal', 'neg', 'to', 'punct', 'conj'].includes(items[i + 1].t) &&
          (i === 0 || ['punct', 'conj', 'noun', 'unk', 'adj', 'num', 'dem', 'fixed'].includes(items[i - 1].t) || (items[i - 1].t === 'pron' && items[i - 1].role !== 'subj'))) {
        C.push({ k: 'ADV', it: { t: 'adv', az: 'mob', ar: 'مب', bareNeg: true } }); i++; continue;
      }
      if (isNPStart(items, i)) { const r = readNP(items, i); C.push(r.chunk); i = r.end; continue; }
      if (it.t === 'verb' && it.form === 'ing' && (i === 0 || ['punct', 'conj'].includes(items[i - 1].t)) && VERBS[it.key] && VERBS[it.key].ms) {
        const pp = { k: 'PP', key: null, eng: null, obj: null };
        const j = readIng(items, i, pp);
        const nx = items[j];
        if (nx && (nx.t === 'aux' || nx.t === 'modal' || (nx.t === 'verb' && nx.form !== 'ing'))) { C.push({ k: 'GER', ing: pp.ing }); i = j; continue; }
      }
      if (it.t === 'rel') { C.push({ k: 'REL', w: it.w, illi: !!it.illi }); i++; continue; }
      if (it.t === 'fixed' && !it.user && INDEF.has(it.key)) { C.push({ k: 'IND', it }); i++; continue; }
      if (it.t === 'pron') { C.push({ k: 'PRON', w: it.w, role: it.role }); i++; continue; }
      if (it.t === 'dem') { C.push({ k: 'DEM', w: it.w }); i++; continue; }
      if (it.t === 'own') { C.push({ k: 'OWN', w: it.w }); i++; continue; }
      if (it.t === 'aux' || it.t === 'modal' || it.t === 'neg' || it.t === 'verb' || (it.t === 'to' && items[i + 1] && (items[i + 1].t === 'verb' || items[i + 1].t === 'aux'))) {
        const r = readVG(items, i); if (r.end > i) { C.push(r.chunk); i = r.end; continue; }
      }
      if (it.t === 'adv' && it.mid && items[i + 1] && ['verb', 'aux', 'modal', 'neg'].includes(items[i + 1].t)) {
        const r = readVG(items, i + 1); r.chunk.parts.unshift(it); C.push(r.chunk); i = r.end; continue;
      }
      if (it.t === 'prep') {
        const pp = { k: 'PP', key: it.key, eng: it.eng, obj: null };
        const nx = items[i + 1];
        if (nx && isNPStart(items, i + 1)) { const r = readNP(items, i + 1); pp.obj = r.chunk; C.push(pp); i = r.end; continue; }
        if (nx && ((nx.t === 'pron' && nx.role !== 'subj' && nx.role !== 'poss') || nx.t === 'dem')) { pp.obj = nx.t === 'pron' ? { k: 'PRON', w: nx.w, role: 'obj' } : { k: 'DEM', w: nx.w }; C.push(pp); i += 2; continue; }
        if (nx && nx.t === 'unk') { pp.obj = { k: 'UNK', it: nx }; C.push(pp); i += 2; continue; }
        if (nx && nx.t === 'verb' && nx.form === 'ing') { i = readIng(items, i + 1, pp); C.push(pp); continue; }
        if (nx && nx.t === 'fixed') { pp.obj = { k: 'FIXED', it: nx }; C.push(pp); i += 2; continue; }
        C.push(pp); i++; continue;
      }
      if (it.t === 'adj' || (it.t === 'adv' && it.int && items[i + 1] && items[i + 1].t === 'adj')) {
        const adjp = { k: 'ADJP', ints: 0, adjs: [] };
        while (items[i] && (items[i].t === 'adj' || (items[i].t === 'adv' && items[i].int))) { if (items[i].t === 'adj') adjp.adjs.push(items[i]); else { adjp.ints++; if (items[i].az !== 'wayed') adjp.intWord = [items[i].az, items[i].ar]; } i++; }
        C.push(adjp); continue;
      }
      if (it.t === 'to') { C.push({ k: 'TO' }); i++; continue; }
      C.push({ k: it.t.toUpperCase(), it }); i++;
    }
    return C;
  }

  /* ====================================================================== */
  /*  Rendering                                                              */
  /* ====================================================================== */
  function resolveP(p, addr) { return p === '2' ? (addr === 'f' ? '2f' : addr === 'pl' ? '2p' : '2m') : p; }
  function pronP(c, ctx) {
    if (c.k === 'DEM') return c.w === 'these' || c.w === 'those' ? '3p' : '3m';
    if ((c.w === 'it' || c.w === 'its') && ctx.ante && ctx.ante.p === '3f') return '3f';   // the room ... it → hiya
    const p = PRON_SUBJ[c.w] || PRON_OBJ[c.w] || PRON_POSS[c.w];
    return resolveP(p, ctx.addr);
  }
  function npInfo(np) {
    if (np.k !== 'NP') return { p: '3m', feat: 'm', human: false };
    const head = np.nouns[np.nouns.length - 1];
    if (head.unk || head.user) return { p: '3m', feat: 'm', human: false };
    const N = NOUNS[head.key];
    const pl = head.pl || (np.num && np.num.n > 1 && np.quant !== 'kam');
    return pl ? { p: N.human ? '3p' : '3f', feat: N.human ? 'pl' : 'f', human: N.human, pl } : { p: N.g === 'f' ? '3f' : '3m', feat: N.g, human: N.human, pl };
  }
  function dual(az, ar) {
    if (/ة$/.test(ar)) return [az.replace(/a$/, '') + 'tain', ar.replace(/ة$/, 'تين')];
    return [elide(az, 'a') + 'ain', ar + 'ين'];
  }
  function isBare(np) { return !!np && np.k === 'NP' && !np.det && !np.poss && !np.quant && !np.num && !np.owner; }
  function renderNP(np, ctx, opts) {
    opts = opts || {};
    const out = [];
    const head = np.nouns[np.nouns.length - 1];
    const info = npInfo(np);
    const somePl = np.det === 'some' && info.pl && !!opts.subject;   // some languages (subject) → ba3'9' il-lu3'aat; made some games → kam lu3ba
    const def = ['def', 'this', 'that', 'all'].includes(np.det) || !!np.poss || !!np.owner || !!opts.generic || somePl;
    const q = np.quant || (np.det === 'some' ? (somePl ? "ba3'9'" : info.pl ? 'kam' : 'shwayya') : np.det === 'more' ? (np.num ? 'ba3ad' : 'akthar') : np.det === 'enough' ? 'kifaaya' : null);
    const n = np.num ? np.num.n : 0;
    const forceSg = q === 'kam' || q === 'cham' || (np.det === 'every' && !(n >= 3 && n <= 10)) || n === 1 || n >= 11;
    const pre = np.adjs.filter((a) => ADJS[a.key].pre);
    const post = np.adjs.filter((a) => !ADJS[a.key].pre);
    if (q === 'wayed') out.push(piece('wayed', 'وايد'));
    else if (q === "ba3'9'") out.push(piece("ba3'9'", 'بعض'));
    else if (q === 'shwayya') out.push(piece('shwayya', 'شوية'));
    else if (q === 'kam') out.push(piece('kam', 'كم'));
    else if (q === 'cham') out.push(piece('cham', 'چم'));
    if (np.det === 'every' || np.det === 'all') out.push(piece('kil', 'كل'));
    else if (np.det === 'any') out.push(piece('ay', 'أي'));
    else if (np.det === 'which') out.push(piece('ay', 'أي'));
    else if (np.det === 'no') out.push(piece('wala', 'ولا'));
    const known = !head.unk && !head.user;
    const useDual = known && n === 2 && !np.poss;
    if (np.num && !useDual && n !== 1) {
      const cons = np.num.cons && known;
      let nz = cons ? np.num.cons[0] : np.num.az, nr = cons ? np.num.cons[1] : np.num.ar;
      if (nz === 'imya' && known) nz = 'imyat';   // 100 views → imyat mushaahada
      out.push(piece(nz, nr, { num: true }));
    }
    for (const a of pre) { const f = adjForm(a.key, 'm'); out.push(piece(f[0], f[1])); }
    if (!known) {
      const lower = !head.user && head.unk && /^[a-z]/.test(head.unk) && !head.name;
      const art = lower && (np.det === 'def' || np.det === 'that' || np.poss) && !np.owner ? ['il-', 'ال'] : ['', ''];
      if (np.det === 'this' && !head.user) out.push(piece('hal', 'هال'));
      else if (np.det === 'that' && !head.user) out.push(piece('hadhaak', 'هذاك'));
      out.push(head.user ? piece(head.user.az, head.user.ar, { user: true }) : piece(art[0] + head.unk, art[1] + head.unk, { known: false, unk: true, bare: head.unk }));
      if (np.poss) { const p = resolveP(PRON_POSS[np.poss], ctx.addr); out.push(piece('maal' + SUF_AZ[p], 'مال' + SUF_AR[p])); }
      for (const a of post) { const f = adjForm(a.key, 'm'); out.push(piece((art[0] ? 'il-' : '') + f[0], (art[1] ? 'ال' : '') + f[1])); }
      if (np.det === 'another') out.push(piece('thaani', 'ثاني'));
      return { pieces: out, info };
    }
    const N = NOUNS[head.key];
    const usePl = info.pl && !forceSg;
    let az = usePl ? N.azPl : N.az, ar = usePl ? N.arPl : N.ar;
    if (N.proper && head.o && /^[A-Z]/.test(head.o)) az = head.o;   // Minecraft stays as typed
    if (useDual) [az, ar] = head.key === 'brother' ? ['a5wain', 'أخوين'] : dual(N.az, N.ar);
    // an English word in front of the noun stays in front: ultra bosses → il-ultra bossaat, my discord server → id-discord server maali
    const unkMods = np.nouns.slice(0, -1).filter((m) => m.unk);
    const mods = np.nouns.slice(0, -1).filter((m) => !m.unk);
    let possDone = false, tail = null;
    const defNoun = pre.some((a) => ADJS[a.key].defNoun);
    if (unkMods.length && !mods.length && !np.owner) {
      const lead = np.det === 'this' ? ['hal ', 'هال'] : np.det === 'that' ? ['hadhaak il-', 'هذاك ال'] : def ? ['il-', 'ال'] : ['', ''];
      const words = unkMods.map((m) => m.unk).join(' ');
      out.push(piece(lead[0] + words + ' ' + az, lead[1] + ar + ' ' + words));   // Arabic keeps its own order: سيرفر discord
      if (np.poss) { const p = resolveP(PRON_POSS[np.poss], ctx.addr); out.push(piece('maal' + SUF_AZ[p], 'مال' + SUF_AR[p])); }
      for (const a of post) { const f = adjForm(a.key, info.feat); out.push(piece((def ? 'il-' : '') + f[0], (def ? 'ال' : '') + f[1])); }
      if (q === 'akthar') out.push(piece('akthar', 'أكثر'));
      if (q === 'ba3ad') out.push(piece('ba3ad', 'بعد'));
      if (q === 'kifaaya') out.push(piece('kifaaya', 'كفاية'));
      return { pieces: out, info };
    }
    if (mods.length && !np.owner && mods.every((m) => NOUNS[m.key].loan) && N.loan) {   // quest loader → il-quest loader
      const words = mods.map((m) => NOUNS[m.key].az).join(' ');
      const lead = np.det === 'this' ? ['hal ', 'هال'] : np.det === 'that' ? ['hadhaak il-', 'هذاك ال'] : def ? ['il-', 'ال'] : ['', ''];
      out.push(piece(lead[0] + words + ' ' + az, lead[1] + words + ' ' + ar));
      if (np.poss) { const p = resolveP(PRON_POSS[np.poss], ctx.addr); out.push(piece('maal' + SUF_AZ[p], 'مال' + SUF_AR[p])); }
      for (const a of post) { const f = adjForm(a.key, info.feat); out.push(piece((def ? 'il-' : '') + f[0], (def ? 'ال' : '') + f[1])); }
      if (q === 'akthar') out.push(piece('akthar', 'أكثر'));
      if (q === 'ba3ad') out.push(piece('ba3ad', 'بعد'));
      return { pieces: out, info };
    }
    if (mods.length || np.owner) { [az, ar] = construct(az, ar); }
    else if (np.poss && pre.length && !defNoun) {
      const p = resolveP(PRON_POSS[np.poss], ctx.addr);
      tail = N.human ? prepPron('3ind', p) : possess('7ag', 'حق', p);
      possDone = true;
    } else if (np.poss && (N.loan || (/i$/.test(N.az) && /ي$/.test(N.ar) && !usePl)) && !POSS_OV[head.key + ':' + resolveP(PRON_POSS[np.poss], ctx.addr)]) {
      const p = resolveP(PRON_POSS[np.poss], ctx.addr);
      if (!N.proper) { az = 'il-' + az; ar = 'ال' + ar; }
      tail = ['maal' + SUF_AZ[p], 'مال' + SUF_AR[p]];
      possDone = true;
    } else if (np.poss) {
      const p = resolveP(PRON_POSS[np.poss], ctx.addr);
      const ov = POSS_OV[head.key + ':' + p];
      if (ov && !usePl) [az, ar] = ov; else [az, ar] = possess(az, ar, p);
      possDone = true;
    } else if (np.det === 'this') { az = 'hal ' + az; ar = 'هال' + ar; }
    else if (np.det === 'that') { out.push(info.feat === 'f' ? piece('hadhich', 'هذيج') : info.feat === 'pl' ? piece('hadhelaak', 'هذيلاك') : piece('hadhaak', 'هذاك')); if (!N.proper && !/\bil-/.test(az)) { az = 'il-' + az; ar = 'ال' + ar; } }
    else if (((def && !pre.length) || defNoun) && !N.proper && !/\bil-/.test(az)) { az = 'il-' + az; ar = 'ال' + ar; }
    out.push(piece(az, ar));
    for (const m of mods) {
      const M = NOUNS[m.key];
      const mp = N.human || m.pl;
      const a = (def ? 'il-' : '') + (mp ? M.azPl : M.az), r = (def ? 'ال' : '') + (mp ? M.arPl : M.ar);
      out.push(piece(a, r));
    }
    if (mods.length && np.poss && !possDone) { const p = resolveP(PRON_POSS[np.poss], ctx.addr); out.push(piece('maal' + SUF_AZ[p], 'مال' + SUF_AR[p])); }
    if (np.owner) out.push(...renderAny(np.owner, ctx).pieces);
    const adjDef = (def && !pre.length) || !!np.owner;
    for (const a of post) {
      const A = ADJS[a.key];
      const f = adjForm(a.key, info.feat);
      if (A.defd) { out.push(piece(f[0], f[1])); continue; }
      if (a.key === 'free' && !info.human && !TIME_NOUNS.has(head.key) && head.key !== 'weekend') {
        if (adjDef) { const g = adjForm('majjaani', info.feat); out.push(piece('il-' + g[0], 'ال' + g[1])); } else out.push(piece('balaash', 'بلاش'));
        continue;
      }
      out.push(piece((adjDef ? 'il-' : '') + f[0], (adjDef ? 'ال' : '') + f[1]));
    }
    if (np.ints && post.length) out.push(np.intWord ? piece(np.intWord[0], np.intWord[1]) : piece('wayed', 'وايد'));
    if (np.tag) { const T = NOUNS[np.tag[0].key]; out.push(piece(T.az + ' ' + np.tag[1].az, T.ar + ' ' + np.tag[1].ar)); }
    if (np.det === 'another') out.push(info.feat === 'f' ? piece('thaanya', 'ثانية') : piece('thaani', 'ثاني'));
    if (n === 1 && np.num.az === 'wa7id') out.push(N.g === 'f' ? piece('wa7da', 'وحدة') : piece('wa7id', 'واحد'));
    if (tail) out.push(piece(tail[0], tail[1]));
    if (q === 'akthar') out.push(piece('akthar', 'أكثر'));
    if (q === 'ba3ad') out.push(piece('ba3ad', 'بعد'));
    if (q === 'kifaaya') out.push(piece('kifaaya', 'كفاية'));
    return { pieces: out, info };
  }
  const DEVICES = new Set(['phone', 'laptop', 'computer', 'battery', 'tv', 'screen', 'charger', 'keyboard', 'console', 'controller', 'car', 'light', 'internet', 'wifi']);
  function renderADJP(c, feat, opts) {
    const out = [];
    for (const a of c.adjs) {
      const f = adjForm(a.key, feat || 'm');
      if (a.key === 'free' && opts && opts.thing) out.push(piece('balaash', 'بلاش'));
      else if (a.key === 'dead' && opts && opts.thing && DEVICES.has(opts.head)) out.push(piece(...[['6aafi', 'طافي'], ['6aafya', 'طافية'], ['6aafyeen', 'طافيين']][feat === 'f' ? 1 : feat === 'pl' ? 2 : 0]));
      else if (a.key === 'sad' && opts && opts.thing) out.push(piece(...(feat === 'f' ? ['t7azzin', 'تحزن'] : ['y7azzin', 'يحزن'])));
      else if (a.key === 'full' && opts && opts.thing === false) out.push(piece(...[['shab3aan', 'شبعان'], ['shab3aana', 'شبعانة'], ['shab3aaneen', 'شبعانين']][feat === 'f' ? 1 : feat === 'pl' ? 2 : 0]));
      else out.push(piece(f[0], f[1]));
    }
    if (c.det === 'def' && out[0] && !/^il-/.test(out[0].az)) out[0] = piece('il-' + out[0].az, 'ال' + out[0].ar);
    if (c.ints) out.push(c.intWord ? piece(c.intWord[0], c.intWord[1]) : piece('wayed', 'وايد'));
    return out;
  }
  function renderAny(c, ctx, opts) {
    switch (c.k) {
      case 'NP': return renderNP(c, ctx, opts);
      case 'PRON': { const p = pronP(c, ctx); const f = SUBJ_FORM[p]; return { pieces: [piece(f[0], f[1])], info: { p, feat: FEAT[p] } }; }
      case 'DEM': { const d = DEM[c.w]; return { pieces: [piece(d[0], d[1])], info: { p: '3m', feat: 'm' } }; }
      case 'OWN': { const p = resolveP(PRON_OWN[c.w], ctx.addr); return { pieces: [piece('maal' + SUF_AZ[p], 'مال' + SUF_AR[p])], info: {} }; }
      case 'UNK': return { pieces: [unkPiece(c.it)], info: {} };
      case 'FIXED': return { pieces: [piece(c.it.az, c.it.ar)], info: {} };
      case 'IND': return { pieces: [piece(c.it.az, c.it.ar)], info: { p: '3m', feat: 'm' } };
      case 'NUM': return { pieces: [piece(c.it.az, c.it.ar, { num: true })], info: {} };
      case 'ADJP': return { pieces: renderADJP(c, 'm'), info: {} };
      default: return { pieces: simplePieces(c, ctx), info: {} };
    }
  }
  function unkPiece(it) {
    const name = it.name;
    return piece(it.o, it.o, name ? { name: true } : { known: false, unk: true });
  }
  function demForm(w, feat) {
    const far = w === 'that' || w === 'those';
    const pl = w === 'these' || w === 'those' || feat === 'pl';
    if (pl) return far ? ['hadhelaak', 'هذيلاك'] : ['hadhola', 'هذولا'];
    if (feat === 'f') return far ? ['hadhich', 'هذيج'] : ['hadhi', 'هذي'];
    return far ? ['hadhaak', 'هذاك'] : ['hadha', 'هذا'];
  }
  function mergePrep(key, first) {
    if (!first || first.known === false || first.num || first.name) return null;
    const az = first.az, ar = first.ar;
    if (key === 'fi' && /^il-/.test(az)) return piece('fil-' + az.slice(3), 'في ' + ar);
    if (key === 'b' && /^il-/.test(az)) return piece('bil-' + az.slice(3), 'ب' + ar);
    if (key === 'b') return piece('b-' + az, 'ب' + ar);
    if (key === 'li' && /^il-/.test(az)) return piece('lil-' + az.slice(3), (/^ل/.test(ar.slice(2)) ? 'ل' : 'لل') + ar.slice(2));
    if (key === 'li') return piece('li ' + az, 'ل' + ar);
    return null;
  }
  function personWord(t, p) { const i = P8.indexOf(p); return [t.az.split(' ')[i], t.ar.split(' ')[i]]; }
  function midPieces(mids, p) {
    return mids.filter((m) => m.az).map((m) => (m.k === 'still' && p ? piece(...personWord(STILL, p)) : m.k === 'just' && p ? piece(...personWord(TAWW, p)) : piece(m.az, m.ar)));
  }
  function headKey(np) { const h = np && np.k === 'NP' && np.nouns[np.nouns.length - 1]; return h && !h.unk ? h.key : null; }
  function umr(p) { return possess('3umr', 'عمر', p); }
  const GENERIC_VERBS = new Set(['like', 'love', 'hate', 'prefer', 'enjoy']);
  const GENERIC_NOUNS = new Set(['math', 'maths', 'science', 'history', 'physics', 'chemistry', 'programming', 'music', 'art', 'football',
    'design', 'drawing', 'english', 'arabic', 'health', 'life', 'love', 'friendship', 'patience', 'sleep', 'work']);

  function renderIng(c, key, ctx, p) {
    const V = VERBS[c.ing.key];
    const out = [];
    const objPieces = () => (c.ing.obj ? renderAny(c.ing.obj, ctx, { generic: isBare(c.ing.obj) }).pieces : []);
    const conjW = { gabil: ['gabil la', 'قبل لا'], ba3d: ['ba3d ma', 'بعد ما'], bdoon: ['bdoon ma', 'بدون ما'] }[key];
    if (V && V.ms && !conjW) {
      let [maz, mar] = V.ms;
      if (key) out.push(piece(key.replace(/_/g, ' '), PREP_AR[key] || key));
      if (c.ing.obj) { [maz, mar] = construct(maz, mar); out.push(piece(maz, mar), ...objPieces()); }
      else if (c.ing.objPron) { const q = possess(maz, mar, pronP({ k: 'PRON', w: c.ing.objPron }, ctx)); out.push(piece(q[0], q[1])); }
      else out.push(piece('il-' + maz, 'ال' + mar));
      if (key && out[1] && /^il-/.test(out[1].az)) { const m = mergePrep(key, out[1]); if (m) out.splice(0, 2, m); }
      return { pieces: out };
    }
    if (!V) return { pieces: [] };
    const person = p || '1s';
    if (conjW) out.push(piece(conjW[0], conjW[1]));
    const form = key === 'ba3d' ? conj(V, 'past', person) : [presentAz(V, person), presentAr(V, person)];
    out.push(piece(form[0], form[1]));
    if (c.ing.objPron) { const pc = out[out.length - 1]; const q = attachObj(pc.az, pc.ar, pronP({ k: 'PRON', w: c.ing.objPron }, ctx)); pc.az = q[0]; pc.ar = q[1]; }
    out.push(...objPieces());
    return { pieces: out };
  }

  /* What an English preposition becomes after this verb: talk to → wiyya, wait for → (nothing). */
  function prepKeyFor(c, V) {
    let key = c.key;
    const eng = c.eng;
    if (eng === 'to' && V && V.to) key = V.to === 'drop' ? null : V.to;
    if (eng === 'for' && V && V.for) key = V.for === 'drop' ? null : V.for;
    if (eng === 'at' && V && V.at) key = V.at === 'drop' ? null : V.at;
    if (eng === 'with' && V && V.with) key = V.with;
    if (eng === 'about' && V && V.about) key = V.about;
    if (eng === 'of') key = V && V.of ? V.of : null;
    if (V && V.key === 'happen' && eng === 'to' && c.obj && c.obj.k === 'NP' && !npInfo(c.obj).human) key = 'fi';
    return key;
  }
  function renderPP(c, ctx, verbKey, p, gapP) {
    const V = verbKey ? VERBS[verbKey] : null;
    let key = prepKeyFor(c, V);
    const eng = c.eng;
    const timeObj = c.obj && c.obj.k === 'NP' && isTimeNP(c.obj) && !c.obj.poss && (!c.obj.det || c.obj.det === 'indef' || c.obj.det === 'few');
    if (eng === 'for' && timeObj) key = ctx.perfProg ? 'min' : null;
    if (eng === 'in' && timeObj && (c.obj.num || c.obj.det === 'indef' || c.obj.quant)) key = ctx.tense === 'past' ? 'fi' : 'ba3d';
    const langObj = c.obj && c.obj.k === 'NP' && ['arabic', 'english'].includes(headKey(c.obj)) && !c.obj.poss;
    if (eng === 'in' && langObj) key = 'b';
    if (eng === 'for' && key === '7ag' && V && c.obj && c.obj.k === 'PRON') key = 'li';   // test it for me → jarriba li
    if (c.ing) return renderIng(c, c.afterFixed ? null : key, ctx, p);
    if (!c.obj && gapP && key) { const q = prepPron(key, gapP); return { pieces: [piece(q[0], q[1])], gap: true }; }
    if (!c.obj) return { pieces: key ? [piece(key.replace(/_/g, ' '), PREP_AR[key] || key)] : [] };
    if (eng === 'at' && (c.obj.k === 'NUM' || (c.obj.k === 'NP' && c.obj.num && !c.obj.nouns.length))) {
      return { pieces: [piece('is-saa3a', 'الساعة'), ...renderAny(c.obj, ctx).pieces] };
    }
    if (c.obj.k === 'PRON') {
      const op = pronP(c.obj, ctx);
      if (!key) return { pieces: [], attach: op };
      const r = prepPron(key, op);
      return { pieces: [piece(r[0], r[1])] };
    }
    const bare = isBare(c.obj);
    if (V && (V.key === 'click' || V.key === 'press') && bare && c.obj.k === 'NP' && !c.obj.adjs.length) {
      const label = c.obj.nouns.map((n) => n.o || n.unk || (n.user && n.user.az) || '').join(' ');
      return { pieces: [piece('3ala', 'على'), piece(label, label, { user: true })] };
    }
    const place = bare && PLACES.has(headKey(c.obj)) && !c.obj.nouns[c.obj.nouns.length - 1].pl && ['at', 'in', 'to', 'from', 'into', 'after', 'before', 'x'].includes(eng);
    const plural = bare && c.obj.k === 'NP' && npInfo(c.obj).pl && (key === 'fi' || (key === 'wiyya' && npInfo(c.obj).human));
    const field = bare && GENERIC_NOUNS.has(headKey(c.obj));   // good at math → zain fir-riyaa9'iyyaat
    const np = renderAny(c.obj, ctx, { generic: ((key === '3an' || (key === 'b' && langObj)) && bare) || place || plural || field });
    if (!key) return { pieces: np.pieces };
    const merged = mergePrep(key, np.pieces[0]);
    if (merged) return { pieces: [merged, ...np.pieces.slice(1)] };
    return { pieces: [piece(key.replace(/_/g, ' '), PREP_AR[key] || key), ...np.pieces] };
  }

  /* Verb group meaning. */
  function analyze(parts) {
    const a = { tense: 'present', neg: false, never: false, modal: null, modalPast: false, prog: false, beOnly: false, main: null, mids: [], hasAux: false, perfect: false, be: null, did: false };
    for (const it of parts) {
      if (it.t === 'neg') { a.neg = true; if (it.w === 'never') a.never = true; continue; }
      if (it.t === 'adv') { a.mids.push(it); continue; }
      if (it.t === 'modal') {
        a.hasAux = true;
        if (it.m === 'will') { a.tense = 'future'; a.will = true; }
        else { a.modal = it.m; if (it.past === true) a.modalPast = true; if (it.w === 'could') a.could = true; }
        continue;
      }
      if (it.t === 'aux') {
        a.hasAux = true;
        const w = it.w;
        if (w === 'did') { a.tense = 'past'; a.did = true; }
        else if (w === 'am' || w === 'is' || w === 'are') a.be = 'present';
        else if (w === 'was' || w === 'were') a.be = 'past';
        else if (w === 'be') { a.be = a.be || 'plain'; a.bePlain = true; }
        else if (w === 'been') a.be = 'past';
        else if (w === 'have' || w === 'has' || w === 'had') { a.perfect = true; if (w === 'had') a.had = true; }
        else if (w === 'do' || w === 'does') a.doAux = true;
        continue;
      }
      if (it.t === 'verb') a.main = it;
    }
    if (a.could && a.neg) a.modalPast = true;
    if (a.main) {
      const f = a.main.form;
      if (a.be && f === 'ing') { a.prog = true; if (a.be === 'past') a.tense = 'past'; }
      else if (a.perfect && (f === 'pp' || f === 'past')) a.tense = 'past';
      else if (!a.hasAux && f === 'past') a.tense = 'past';
      else if (a.be && (f === 'pp' || f === 'past')) { if (a.be === 'past') a.tense = 'past'; }
      if (a.perfect && a.be === 'past' && f === 'ing') {
        if (a.had) { a.prog = false; a.tense = 'past'; a.habit = true; }
        else { a.prog = true; a.tense = 'present'; a.perfProg = true; }
      }
      if (a.modal === 'used') { a.tense = 'past'; a.habit = true; a.modal = null; }
      if (a.perfect && !a.had && (a.modal || a.will) && (f === 'pp' || f === 'past')) { a.cf = true; a.tense = 'past'; }
      if (a.modalPast) a.tense = 'past';
    } else if (a.be) {
      a.beOnly = true;
      if (a.modal === 'used') { a.modal = null; a.tense = 'past'; a.be = 'past'; a.bePlain = false; }
      else if (a.tense !== 'future') a.tense = a.be === 'past' ? 'past' : 'present';
      if (a.perfect) a.tense = 'past';
    }
    return a;
  }

  /* Turn a verb group into pieces. Returns { pieces, objIdx } where objIdx is the piece that takes an object ending. */
  function renderVG(a, p, ctx, opts) {
    const out = [];
    const addr = ctx.addr;
    out.push(...midPieces(a.mids, p));
    const still = a.mids.some((m) => m.k === 'still');
    const neg = a.neg;
    const V = a.main ? VERBS[a.main.key] : null;
    const ma = (s, r) => (neg ? ['ma ' + s, 'ما ' + r] : [s, r]);
    const neverPast = a.never && a.tense === 'past' && p;
    const everQ = !a.neg && ctx.question && a.tense === 'past' && p && a.mids.some((m) => m.k === 'ever');
    if (neverPast || everQ) { const u = umr(p); out.push(piece(u[0], u[1])); }
    if (V && V.special === 'have' && !a.modal) {
      if (a.tense === 'past') { const k = ma('kaan', 'كان'); out.push(piece(k[0], k[1])); }
      else if (a.tense === 'future') { const k = ma('bykoon', 'بيكون'); out.push(piece(k[0], k[1])); }
      else if (neg) out.push(piece('ma', 'ما'));
      const r = prepPron(opts && opts.thing ? 'fi' : '3ind', p);
      out.push(piece(r[0], r[1]));
      if (a.never && !neverPast) out.push(piece('abadan', 'أبداً'));
      return { pieces: out, objIdx: -1, verbKey: 'have' };
    }
    if (V && V.special === 'seem') {
      const hp = p || '3m';
      if (a.tense === 'past') out.push(piece(pastAz(BE, hp), pastAr(BE, hp)));
      const sh = possess('shakl', 'شكل', hp);
      out.push(piece((neg ? 'mob ' : '') + sh[0], (neg ? 'مب ' : '') + sh[1]));
      return { pieces: out, objIdx: -1, verbKey: V.key };
    }
    if (!V) {
      const hp = p || '1s';
      const helper = HELPERS[a.modal] || { want: VERBS.want, like: VERBS.like }[a.modal];
      if (helper) { const h = conj(helper, a.modalPast ? 'past' : a.tense === 'past' ? 'past' : 'present', hp); out.push(piece((neg ? 'ma ' : '') + h[0], (neg ? 'ما ' : '') + h[1])); }
      else if (a.modal === 'must') out.push(piece(neg ? 'mob laazim' : 'laazim', neg ? 'مب لازم' : 'لازم'));
      else if (a.modal === 'maybe') out.push(piece(neg ? 'yimkin ma' : 'yimkin', neg ? 'يمكن ما' : 'يمكن'));
      else if (neg) out.push(piece('ma', 'ما'));
      return { pieces: out, objIdx: -1 };
    }
    const verbP = opts && opts.imperative ? null : p;
    let objIdx = -1;
    const pushVerb = (pair) => { out.push(piece(pair[0], pair[1])); objIdx = out.length - 1; };
    if (opts && opts.imperative) {
      if (a.modal === 'keep') { const k = KEEP_IMP[addr] || KEEP_IMP.m; out.push(piece(k[0], k[1])); pushVerb([presentAz(V, resolveP('2', addr)), presentAr(V, resolveP('2', addr))]); }
      else if (neg) { pushVerb(['la ' + presentAz(V, resolveP('2', addr)), 'لا ' + presentAr(V, resolveP('2', addr))]); }
      else { const imp = imperativeForm(V, addr) || [presentAz(V, resolveP('2', addr)), presentAr(V, resolveP('2', addr))]; pushVerb(imp); }
      return { pieces: out, objIdx, verbKey: V.key };
    }
    const modal = a.modal;
    const special = V.special === 'have';
    // could have / would have / might have + done
    if (a.cf && !special) {
      if (modal === 'can') {
        const k = ma(pastAz(BE, verbP), pastAr(BE, verbP));
        out.push(piece(k[0], k[1]), piece(presentAz(GDAR, verbP), presentAr(GDAR, verbP)));
        pushVerb([presentAz(V, verbP), presentAr(V, verbP)]);
        return { pieces: out, objIdx, verbKey: V.key };
      }
      if (modal === 'maybe') {
        out.push(piece(neg ? 'yimkin ma' : 'yimkin', neg ? 'يمكن ما' : 'يمكن'));
        pushVerb(conj(V, 'past', verbP));
        return { pieces: out, objIdx, verbKey: V.key };
      }
      if (!modal) {
        const k = ma(pastAz(BE, verbP), pastAr(BE, verbP));
        out.push(piece(k[0], k[1]));
        pushVerb(future(V, verbP));
        return { pieces: out, objIdx, verbKey: V.key };
      }
    }
    const mainForm = (pp) => (special ? prepPron('3ind', pp) : [presentAz(V, pp), presentAr(V, pp)]);
    if (modal === 'lets') { out.push(piece('yalla', 'يلا')); pushVerb(mainForm('1p')); return { pieces: out, objIdx, verbKey: V.key }; }
    if (modal === 'must') {
      const m = a.tense === 'past' ? ma('kaan laazim', 'كان لازم') : neg ? ['mob laazim', 'مب لازم'] : ['laazim', 'لازم'];
      out.push(piece(m[0], m[1]));
      if (special) { const k = [presentAz(BE, verbP), presentAr(BE, verbP)]; out.push(piece(k[0], k[1])); }
      pushVerb(mainForm(verbP));
      return { pieces: out, objIdx, verbKey: V.key };
    }
    if (modal === 'maybe') {
      out.push(piece(neg ? 'yimkin ma' : 'yimkin', neg ? 'يمكن ما' : 'يمكن'));
      pushVerb(a.tense === 'future' && !special ? future(V, verbP) : mainForm(verbP));
      return { pieces: out, objIdx, verbKey: V.key };
    }
    const helper = HELPERS[modal] || { want: VERBS.want, like: VERBS.like }[modal];
    if (helper) {
      const h = conj(helper, a.tense, verbP);
      const hp = neg ? ['ma ' + h[0], 'ما ' + h[1]] : h;
      out.push(piece(hp[0], hp[1]));
      if (special) { const k = [presentAz(BE, verbP), presentAr(BE, verbP)]; out.push(piece(k[0], k[1])); }
      pushVerb(mainForm(opts && opts.compP ? opts.compP : verbP));
      if (a.never && !neverPast) out.push(piece('abadan', 'أبداً'));
      return { pieces: out, objIdx, verbKey: V.key };
    }
    const ap = V.ap ? V.ap[FEAT[verbP] || 'm'] : null;
    if (a.habit || (a.prog && a.tense === 'past')) {
      const k = ma(pastAz(BE, verbP), pastAr(BE, verbP));
      out.push(piece(k[0], k[1]));
      pushVerb(a.prog && ap ? ap : [presentAz(V, verbP), presentAr(V, verbP)]);
      return { pieces: out, objIdx, verbKey: V.key };
    }
    if (a.prog && a.tense === 'present') {
      if (ap) {
        if (opts && opts.pronSubj) { const f = SUBJ_FORM[verbP]; out.push(piece(f[0], f[1])); }
        pushVerb(neg ? ['mob ' + ap[0], 'مب ' + ap[1]] : ap);
        return { pieces: out, objIdx, verbKey: V.key };
      }
      const g = gaa3id(FEAT[verbP]);
      if (!still || neg) out.push(piece(neg ? 'mob ' + g[0] : g[0], neg ? 'مب ' + g[1] : g[1]));
      pushVerb([presentAz(V, verbP), presentAr(V, verbP)]);
      return { pieces: out, objIdx, verbKey: V.key };
    }
    if (a.be === 'past' && a.tense === 'future') {
      const k = ma(pastAz(BE, verbP), pastAr(BE, verbP));
      out.push(piece(k[0], k[1]));
      pushVerb(future(V, verbP));
      return { pieces: out, objIdx, verbKey: V.key };
    }
    const c = conj(V, a.tense, verbP);
    pushVerb(neg ? ['ma ' + c[0], 'ما ' + c[1]] : c);
    if (a.never && !neverPast) out.push(piece('abadan', 'أبداً'));
    return { pieces: out, objIdx, verbKey: V.key };
  }

  /* Split a clause into segments: [pre] [subject] verb-group [rest]. */
  function segment(chunks, opts) {
    opts = opts || {};
    const segs = [];
    let cur = { pre: [], subj: null, aux: null, vg: null, rest: [] };
    const subjLike = (c) => c && (c.k === 'NP' || c.k === 'DEM' || c.k === 'THERE' || c.k === 'CSUBJ' || c.k === 'GER' || c.k === 'IND' || c.k === 'UNK' || (c.k === 'PRON' && c.role !== 'obj' && c.role !== 'poss'));
    const objPron = (c) => c && c.k === 'PRON' && c.role !== 'subj' && c.role !== 'poss';
    for (let i = 0; i < chunks.length; i++) {
      const c = chunks[i], next = chunks[i + 1], prevC = chunks[i - 1];
      if (c.k === 'VG') {
        const a = analyze(c.parts);
        if (!cur.vg && !cur.aux && !a.main && !c.toInf && subjLike(next) && !cur.subj) { cur.aux = c; continue; }
        if (!cur.vg) {
          if (c.toInf && cur.aux && cur.subj) { cur.vg = cur.aux; cur.aux = null; cur.rest.push({ k: 'VG2', c }); continue; }   // is there a way to skip → fi 6areega asawi skip
          if (cur.aux) c.parts = cur.aux.parts.concat(c.parts);
          cur.vg = c;
          continue;
        }
        const finite = c.parts[0] && (c.parts[0].t === 'aux' || c.parts[0].t === 'modal');   // "the bot i made | is fast"
        if (cur.vg && !a.main && (a.modal || a.doAux || a.did || a.will) && next && next.k === 'PRON' && next.role !== 'obj' && next.role !== 'poss' && chunks[i + 2] && chunks[i + 2].k === 'VG') {
          segs.push(cur); cur = { pre: [], subj: null, aux: c, vg: null, rest: [], split: true, question: true }; continue;   // ... can i get it back
        }
        const causMain = cur.vg && (() => { const m = cur.vg.parts.find((x) => x.t === 'verb'); return m && CAUSATIVES.has(m.key); })();
        const adjacent = !finite && (prevC === cur.vg || (prevC && prevC.k === 'TO') ||
          (objPron(prevC) && chunks[i - 2] === cur.vg && !a.hasAux && a.main && a.main.form === 'base') ||
          (causMain && prevC && (prevC.k === 'NP' || prevC.k === 'IND') && chunks[i - 2] === cur.vg && !a.hasAux && a.main && a.main.form === 'base'));
        if (adjacent || c.toInf) { cur.rest.push({ k: 'VG2', c }); continue; }
        segs.push(cur);
        cur = { pre: [], subj: null, aux: null, vg: c, rest: [], inherit: true, split: true };
        continue;
      }
      // tell me what you want / comment below what you want to see: an embedded question
      if (c.k === 'WH' && cur.vg && next && subjLike(next) && chunks[i + 2] && chunks[i + 2].k === 'VG' && c.it.w !== 'how long') {
        segs.push(cur);
        cur = { pre: [c], subj: null, aux: null, vg: null, rest: [], split: true, embedded: true };
        continue;
      }
      // which game do you like? → the noun is the object, not the subject
      if (c.k === 'PP' && c.fronted) { cur.pre.push(c); if (next && (next.k === 'NP' || next.k === 'WH')) { cur.pre.push(next); i++; } continue; }
      if (c.k === 'NP' && (c.det === 'which' || c.quant === 'cham') && next && next.k === 'VG' && !cur.vg && !cur.subj) {
        const na = analyze(next.parts);
        if ((na.doAux || na.did || na.modal || na.tense === 'future') && !na.main && subjLike(chunks[i + 2])) { cur.pre.push(c); continue; }
      }
      if (c.k === 'NP' && cur.vg && next && next.k === 'VG' && !next.toInf && next.parts.length === 1 && next.parts[0].form === 'ing' && TIME_NOUNS.has(headKey(c))) {
        const m = cur.vg.parts.find((x) => x.t === 'verb');
        if (m && ['spend', 'waste', 'take'].includes(m.key)) { cur.rest.push(c, { k: 'VG2', c: next }); i++; continue; }
      }
      if (c.k === 'ADV' && cur.subj && !cur.vg && !cur.aux && next && next.k === 'VG' && !next.toInf) { cur.subjAdv = c; continue; }
      if (c.k === 'FIXED' && c.it.key === 'supposed to' && cur.subj && !cur.vg) { cur.pre.unshift(c); continue; }   // the bot is supposed to farm → il-mafroo9' il-bot yfarrim
      if (c.k === 'NP' && cur.vg && prevC === cur.vg && !cur.rest.length && next && next.k === 'VG' && !next.toInf && next.parts[0] && (next.parts[0].t === 'verb' ? next.parts[0].form === 'base' : next.parts[0].t === 'adv')) {
        const m = cur.vg.parts.find((x) => x.t === 'verb');
        const a0 = analyze(cur.vg.parts);
        if (m && !a0.beOnly && !INTRANS.has(m.key) && !THAT_VERBS.has(m.key)) { cur.rest.push(c); continue; }
      }
      if (subjLike(c) && next && ((next.k === 'VG' && !next.toInf) || (!cur.vg && next.k === 'ADV' && !next.it.please && chunks[i + 2] && chunks[i + 2].k === 'VG' && !chunks[i + 2].toInf)) && !(c.k === 'PRON' && c.role === 'obj')) {
        // everyone who plays this game | knows that: the noun belongs to "plays"
        if (opts.relSubjGap && !segs.length && cur.vg && !cur.subj && (c.k === 'NP' || c.k === 'IND' || c.k === 'DEM')) {
          const m = cur.vg.parts.find((x) => x.t === 'verb');
          if (m && !THAT_VERBS.has(m.key)) { cur.rest.push(c); continue; }
        }
        if (cur.vg || cur.subj) { segs.push(cur); cur = { pre: [], subj: c, aux: null, vg: null, rest: [], split: true }; continue; }
        cur.subj = c; continue;
      }
      if (c.k === 'THERE' && cur.vg && !cur.subj && !cur.rest.length && !cur.aux) { cur.subj = c; cur.inverted = true; continue; }
      if (subjLike(c) && cur.aux && !cur.subj && !cur.vg) { cur.subj = c; cur.inverted = true; continue; }
      if (!cur.vg && !cur.aux) cur.pre.push(c); else cur.rest.push(c);
    }
    if (cur.aux && !cur.vg) { cur.vg = cur.aux; }
    segs.push(cur);
    return segs;
  }

  function simplePieces(c, ctx) {
    switch (c.k) {
      case 'FIXED': return [piece(c.it.az, c.it.ar, c.it.user ? { user: true } : LEAD_FIXED.has(c.it.key) ? { lead: true } : {})];
      case 'ADV': return c.it.please ? [piece(...A3resolve(FIXED.get('please'), ctx))] : c.it.az ? [piece(c.it.az, c.it.ar)] : [];
      case 'WH': return [piece(WH[c.it.w][0], WH[c.it.w][1])];
      case 'UNK': return [unkPiece(c.it)];
      case 'NUM': return [piece(c.it.az, c.it.ar, { num: true })];
      case 'ARABIC': return [piece(c.it.s, c.it.s, { known: true, raw: true, emoji: !!c.it.emoji })];
      case 'QUANT': case 'QUANTALONE': return [piece(c.q === 'wayed' ? 'wayed' : c.q === 'kam' ? 'kam' : c.q === 'cham' ? 'cham' : 'shway', c.q === 'wayed' ? 'وايد' : c.q === 'kam' ? 'كم' : c.q === 'cham' ? 'چم' : 'شوي')];
      case 'DETALONE': return c.det === 'all' ? [piece('kil shay', 'كل شي')] : c.det === 'some' ? [piece('shway', 'شوي')] : c.det === 'more' ? [piece('akthar', 'أكثر')] : [];
      case 'CONJ': return c.it.az ? [piece(c.it.az, c.it.ar, c.it.az === 'w' ? { andAr: true } : {})] : [];
      case 'TO': case 'POSSS': return [];
      default: return c.it && c.it.az ? [piece(c.it.az, c.it.ar)] : [];
    }
  }
  function A3resolve(fx, ctx) { const v = fx[ctx.addr] || fx.m; return [v[0], v[1]]; }

  function renderSegment(seg, ctx, st, isFirst) {
    const out = [];
    const carryGeneric = !seg.vg && st.sep === 'conj' && st.objGeneric;
    for (const c of seg.pre) {
      if (c.k === 'NP' || c.k === 'PRON' || c.k === 'DEM' || c.k === 'OWN') out.push(...renderAny(c, ctx, { generic: carryGeneric && isBare(c) }).pieces);
      else if (c.k === 'PP') out.push(...renderPP(c, ctx, null, st.p).pieces);
      else if (c.k === 'ADJP') out.push(...renderADJP(c, 'm'));
      else out.push(...simplePieces(c, ctx));
    }
    if (!seg.vg) {
      if (seg.subj) out.push(...renderAny(seg.subj, ctx, { generic: isBare(seg.subj), subject: true }).pieces);
      for (const c of seg.rest) out.push(...renderRest(c, ctx, st, null, st.p).pieces);
      return out;
    }
    const a = analyze(seg.vg.parts);
    ctx.tense = a.tense; ctx.perfProg = !!a.perfProg;
    let p = null, feat = 'm', subjKind = null, thing = false;
    const pleaseLead = seg.pre.some((c) => (c.k === 'FIXED' && c.it.key === 'please') || (c.k === 'ADV' && c.it.please));
    const commaLead = st.sep === 'comma' && !seg.inherit && !seg.subj && a.main && a.main.form === 'base' && !a.hasAux;
    if (seg.subj) {
      if (seg.subj.k === 'PRON') { p = pronP(seg.subj, ctx); feat = FEAT[p]; subjKind = seg.subj.w === 'it' ? 'it' : 'pron'; thing = seg.subj.w === 'it'; }
      else if (seg.subj.k === 'DEM') { p = pronP(seg.subj, ctx); feat = 'm'; subjKind = 'dem'; thing = true; }
      else if (seg.subj.k === 'THERE') { subjKind = 'there'; p = '3m'; }
      else if (seg.subj.k === 'IND') { p = '3m'; feat = 'm'; subjKind = 'ind'; thing = /thing$/.test(seg.subj.it.key); }
      else if (seg.subj.k === 'UNK') { p = '3m'; feat = 'm'; subjKind = 'unk'; thing = !seg.subj.it.name; }
      else if (seg.subj.k === 'GER') {
        const V = VERBS[seg.subj.ing.key];
        const fem = V && V.ms && /ة$/.test(V.ms[1]);
        p = fem ? '3f' : '3m'; feat = fem ? 'f' : 'm'; subjKind = 'ger'; thing = true;
      }
      else if (seg.subj.k === 'CSUBJ') {
        const ps = seg.subj.parts.map((x) => (x.k === 'PRON' ? pronP(x, ctx) : '3'));
        p = ps.includes('1s') || ps.includes('1p') ? '1p' : ps.some((q) => q[0] === '2') ? '2p' : '3p';
        feat = 'pl'; subjKind = 'csubj';
      }
      else { const inf = npInfo(seg.subj); p = inf.p; feat = inf.feat; subjKind = 'np'; thing = !inf.human; }
    } else if (seg.rel || seg.relMain) {
      const R = seg.rel || seg.relMain;
      p = R.p; feat = R.feat; subjKind = 'rel'; thing = !R.human;
    } else if (seg.pre.some((c) => c.k === 'FIXED' && c.it.key === 'make sure to')) {
      p = resolveP('2', ctx.addr); feat = FEAT[p]; subjKind = 'lead2';
    } else if (isFirst && !seg.pre.length && a.main && !a.hasAux && a.main.form === 'base' && ['hope', 'wish', 'guess', 'think'].includes(a.main.key)) {
      p = '1s'; feat = 'm'; subjKind = 'pron';
    } else if (seg.pre.length && seg.pre[seg.pre.length - 1].k === 'WH' && ['who', 'what'].includes(seg.pre[seg.pre.length - 1].it.w) && !a.doAux && !a.did && !seg.vg.toInf) {
      p = '3m'; feat = 'm'; subjKind = 'wh'; thing = seg.pre[seg.pre.length - 1].it.w === 'what';
    } else if (!st.imp && !pleaseLead && !commaLead && (seg.inherit || (st.p && !isFirst) || (st.p && seg.vg && !a.hasAux && a.main && a.main.form !== 'base'))) {
      p = st.p; feat = st.feat || FEAT[p] || 'm';
    }
    const gapP = seg.rel && seg.subj ? seg.rel.p : null;   // the item (that) i wanted → kint abeeh
    const onlyLeadIns = seg.pre.every((c) => ['FIXED', 'ADV', 'PUNCT'].includes(c.k));
    if (!p && !seg.subj && isFirst && ctx.question && onlyLeadIns && !st.p && a.main && a.main.form === 'base' && (a.modal === 'want' || !a.hasAux) && !seg.vg.toInf) { p = resolveP('2', ctx.addr); feat = FEAT[p]; subjKind = 'pron'; }
    if (!p && !seg.subj && isFirst && onlyLeadIns && !st.p && a.main && a.modal && seg.rest.some((c) => c.k === 'PRON' && c.w === 'me')) { p = resolveP('2', ctx.addr); feat = FEAT[p]; subjKind = 'pron'; }   // should have told me → kaan laazim tgool li
    if (seg.subj && seg.subj.k === 'PRON' && seg.rest[0] && seg.rest[0].k === 'DETALONE' && seg.rest[0].det === 'all') {   // we all know → kilna nadri
      seg.rest.shift();
      const q = possess('kil', 'كل', p);
      out.push(piece(q[0], q[1]));
      if (a.beOnly) seg.subj = Object.assign({}, seg.subj, { silent: true });
    }
    const leadVerb = !p && !seg.subj && onlyLeadIns && !seg.vg.toInf;
    const imperative = leadVerb && a.main && ((a.main.form === 'base' && !a.hasAux) || (a.hasAux && !a.modal && a.neg && a.doAux && !a.be) || (a.modal === 'keep' && !a.will));
    const imperativeBe = leadVerb && !a.main && a.bePlain && !a.modal && (!a.hasAux || a.doAux || a.bePlain);
    const seemV0 = a.main && VERBS[a.main.key] && VERBS[a.main.key].special === 'seem';
    const thingV = a.main && (THING_VERBS.has(a.main.key) || a.main.form === 's');
    if (!p) { p = st.p || ((a.main || a.modal) && !a.beOnly && !seemV0 && !thingV ? '1s' : '3m'); feat = st.feat || FEAT[p]; }

    // "no" in front of the first noun: there is no problem → ma fi mushkila
    const firstRest = seg.rest[0];
    if (firstRest && firstRest.k === 'NP' && firstRest.det === 'no' && !a.neg) {
      a.neg = true;
      seg.rest[0] = Object.assign({}, firstRest, { det: subjKind === 'there' || (a.main && a.main.key === 'have') ? null : 'any' });
    }
    // i don't know anyone → ma a3arf a7ad; i asked him to help me → 6alabt minnah ysaa3idni
    if (a.main && a.main.key === 'know') {
      const o1 = seg.rest[0];
      const person = o1 && ((o1.k === 'IND' && /one|body/.test(o1.it.key)) || o1.k === 'NP' || o1.k === 'DEM' || o1.k === 'OWN' || (o1.k === 'PRON' && o1.w !== 'it' && o1.role !== 'subj'));
      if (person) a.main = Object.assign({}, a.main, { key: 'know_p' });
    }
    if (a.main && a.main.key === 'ask' && seg.rest.some((c) => c.k === 'VG2' && c.c.toInf) && seg.rest[0] && (seg.rest[0].k === 'PRON' || seg.rest[0].k === 'NP')) a.main = Object.assign({}, a.main, { key: 'ask_to' });
    const obj0 = seg.rest.find((c) => ['NP', 'PRON', 'DEM', 'IND', 'UNK', 'FIXED', 'OWN'].includes(c.k));
    if (obj0 && obj0.k === 'IND' && ['nothing', 'nobody', 'no one'].includes(obj0.it.key) && !a.neg && (a.main || subjKind === 'there')) {
      a.neg = true;
      const k = seg.rest.indexOf(obj0);
      seg.rest[k] = { k: 'IND', it: obj0.it.key === 'nothing' ? { az: 'shay', ar: 'شي', key: 'anything' } : { az: 'a7ad', ar: 'أحد', key: 'anyone' } };
    }
    const objNP = seg.rest.find((c) => c.k === 'NP');
    if (a.main && a.main.key === 'save' && objNP && ['money', 'gold', 'coin', 'time', 'hour', 'minute', 'day', 'week', 'month', 'year'].includes(headKey(objNP))) a.main = Object.assign({}, a.main, { key: 'save_t' });
    if (a.main && a.main.key === 'run' && ((obj0 && obj0.k === 'NP' && RUN_OBJ.has(headKey(obj0))) || (obj0 && obj0.k === 'PRON' && ['it', 'them'].includes(obj0.w)) || (!obj0 && seg.rel && RUN_OBJ.has(seg.rel.head)))) a.main = Object.assign({}, a.main, { key: 'turn on' });
    if (a.main && a.main.key === 'fail' && obj0 && obj0.k === 'NP' && ['test', 'lesson', 'class'].includes(headKey(obj0))) a.main = Object.assign({}, a.main, { key: 'fail_exam' });
    if (a.main && a.main.key === 'meet' && !obj0) a.main = Object.assign({}, a.main, { key: 'meet_r' });
    // i'm streaming tonight → basawi stream il-laila
    if (a.main && a.prog && a.tense === 'present' && !VERBS[a.main.key].ap && seg.rest.some(isFutureTime)) Object.assign(a, { prog: false, tense: 'future' });
    if (a.main && a.main.key === 'carry' && obj0 && obj0.k === 'PRON' && !['it', 'them'].includes(obj0.w)) a.main = Object.assign({}, a.main, { key: 'carry_g' });
    if (a.main && a.main.key === 'drop' && ((seg.subj && seg.subj.k === 'NP' && ['boss', 'monster', 'mob', 'chest', 'enemy', 'quest', 'map', 'dungeon', 'event'].includes(headKey(seg.subj))) || (seg.subj && seg.subj.k === 'PRON' && seg.subj.w === 'it' && ctx.ante && ctx.ante.drop))) a.main = Object.assign({}, a.main, { key: 'drop_g' });
    if (a.main && a.main.key === 'make' && obj0 && (obj0.k === 'NP' || obj0.k === 'PRON' || obj0.k === 'IND') && seg.rest[seg.rest.indexOf(obj0) + 1] && seg.rest[seg.rest.indexOf(obj0) + 1].k === 'VG2' && !seg.rest[seg.rest.indexOf(obj0) + 1].c.toInf) a.main = Object.assign({}, a.main, { key: 'let' });   // make the bot pick up → 5alli il-bot yilga6
    for (let i = 1; i < seg.rest.length; i++) {   // help with the bot → musaa3ada fil-bot
      const c = seg.rest[i], prevC = seg.rest[i - 1];
      if (c.k === 'PP' && prevC.k === 'NP' && NOUN_PREP[headKey(prevC)] && NOUN_PREP[headKey(prevC)][c.eng]) seg.rest[i] = Object.assign({}, c, { key: NOUN_PREP[headKey(prevC)][c.eng], eng: 'x' });
    }
    const LIKE_OBJ = ['video', 'picture', 'comment', 'stream', 'channel'];
    if (a.main && a.main.key === 'like' && imperative && obj0 && obj0.k === 'NP' && LIKE_OBJ.includes(headKey(obj0))) a.main = Object.assign({}, a.main, { key: 'like_yt' });
    // i will try → ba7aawil; try it → jarriba
    if (a.main && a.main.key === 'try' && !seg.rest.some((c) => ['NP', 'PRON', 'DEM', 'IND', 'UNK', 'FIXED', 'OWN'].includes(c.k))) a.main = Object.assign({}, a.main, { key: 'attempt' });
    // leave a comment → 5alli ta3leeg; leave the house → i6la3 min il-bait
    if (a.main && VERBS[a.main.key] && VERBS[a.main.key].objAlt) {
      const r0 = seg.rest[0];
      const isPlace = r0 && r0.k === 'NP' && PLACES.has(headKey(r0));
      if (r0 && (r0.k === 'NP' || r0.k === 'PRON' || r0.k === 'DEM') && !isPlace) a.main = Object.assign({}, a.main, { key: VERBS[a.main.key].objAlt });
    }

    // existential: there is / there are
    if (subjKind === 'there') {
      const t = a.tense, neg = a.neg;
      const w = t === 'past' ? (neg ? ['ma kaan fi', 'ما كان في'] : ['kaan fi', 'كان في']) : t === 'future' ? (neg ? ['ma bykoon fi', 'ما بيكون في'] : ['bykoon fi', 'بيكون في']) : neg ? ['ma fi', 'ما في'] : ['fi', 'في'];
      out.push(piece(w[0], w[1]));
      let agentP = null, vk = null, vp = '3m';
      for (const c of seg.rest) {
        if (c.k === 'VG2') {
          const headN = seg.rest.find((x) => x.k === 'NP');
          const genericYou = headN && ['way', 'method', 'option', 'chance', 'trick', 'command', 'button', 'place', 'map', 'quest', 'shortcut'].includes(headKey(headN));
          const cp = agentP || (ctx.question ? '1s' : genericYou ? resolveP('2', ctx.addr) : '1p');
          const r2 = renderVG(Object.assign({}, analyze(c.c.parts), { tense: 'present' }), cp, ctx, {});
          out.push(...r2.pieces); vk = r2.verbKey; vp = cp; continue;
        }
        if (c.k === 'PRON' && c.role !== 'poss' && vk) {   // anyone to help me → a7ad ysaa3idni
          const V = VERBS[vk], op = pronP(c, ctx), oi = out.length - 1;
          if (V && V.obj) { const q = prepPron(V.obj, op); out.push(piece(q[0], q[1])); }
          else { const pc = out[oi]; const q = attachObj(pc.az, pc.ar, op); pc.az = q[0]; pc.ar = q[1]; }
          continue;
        }
        if (c.k === 'NP' && !vk) { const inf = npInfo(c); agentP = (inf.human || THING_AGENTS.has(headKey(c))) ? inf.p || (inf.feat === 'f' ? '3f' : inf.feat === 'pl' ? '3p' : '3m') : null; }
        else if (c.k === 'IND' && !vk) agentP = /one|body/.test(c.it.key) ? '3m' : null;
        if (c.k === 'NP' && vk && VERBS[vk] && (VERBS[vk].objNP || VERBS[vk].obj)) {   // a way to skip the cutscene → asawi skip lil-cutscene
          const ob = VERBS[vk].objNP || VERBS[vk].obj, np = renderNP(c, ctx, {});
          const m = mergePrep(ob, np.pieces[0]);
          out.push(...(m ? [m, ...np.pieces.slice(1)] : [piece(ob.replace(/_/g, ' '), PREP_AR[ob] || ob), ...np.pieces]));
          continue;
        }
        out.push(...renderRest(c, ctx, st, vk, vp).pieces);
      }
      st.tense = t; st.imp = false;
      return out;
    }
    // subject noun phrase comes first (questions with was/will: verb first)
    const npLate = seg.inverted && a.beOnly && !a.main && a.tense !== 'present' && subjKind === 'np';
    if (subjKind === 'np' && !npLate) out.push(...renderNP(seg.subj, ctx, { generic: isBare(seg.subj), subject: true }).pieces);
    if (subjKind === 'ind') out.push(piece(seg.subj.it.az, seg.subj.it.ar));
    if (subjKind === 'unk') out.push(unkPiece(seg.subj.it));
    if (seg.subjAdv && subjKind !== 'pron' && subjKind !== 'it') out.push(...simplePieces(seg.subjAdv, ctx));
    else if (seg.subjAdv) seg.rest.unshift(seg.subjAdv);
    if (subjKind === 'ger') out.push(...renderIng({ ing: seg.subj.ing }, null, ctx, p).pieces);
    if (subjKind === 'csubj') {
      seg.subj.parts.forEach((x, i) => {
        if (i) out.push(piece('w', 'و', { andAr: true }));
        out.push(...renderAny(x, ctx, { generic: isBare(x) }).pieces);
      });
    }

    // copula: be + complement
    if (a.beOnly && !a.main) {
      if (a.perfect && seg.rest.some((c) => c.k === 'PP' && (c.eng === 'for' || c.eng === 'since') && c.obj && (c.obj.k === 'NUM' || (c.obj.k === 'NP' && (TIME_NOUNS.has(headKey(c.obj)) || c.obj.num))))) {
        a.tense = 'present'; ctx.perfProg = true;
      }
      const t = a.tense;
      const comp = seg.rest;
      const hasComp = comp.length > 0;
      const firstNP = comp[0] && comp[0].k === 'NP' ? comp[0] : null;
      if ((subjKind === 'it' || subjKind === 'dem') && firstNP) {
        const cf = npInfo(firstNP).feat;
        if (subjKind === 'it' || !['these', 'those'].includes(seg.subj.w)) { p = cf === 'f' ? '3f' : cf === 'pl' ? '3p' : '3m'; feat = cf; }
      }
      const showDem = subjKind === 'dem' || (subjKind === 'it' && t === 'present' && !st.subord && (!hasComp || firstNP));
      const ageNum = subjKind === 'pron' && comp.length === 1 && comp[0].k === 'NUM' && !comp[0].it.time && comp[0].it.n >= 10 && comp[0].it.n < 120 && ['1s', '2', '2m', '2f', '3m', '3f'].includes(p) && !a.neg && t === 'present';
      const yearsComp = (subjKind === 'pron' && firstNP && headKey(firstNP) === 'year') || ageNum;
      const hasStill = a.mids.some((m) => m.k === 'still');
      if (imperativeBe) {
        const kf = a.neg ? ['la ' + presentAz(BE, resolveP('2', ctx.addr)), 'لا ' + presentAr(BE, resolveP('2', ctx.addr))] : imperativeForm(BE, ctx.addr);
        out.push(piece(kf[0], kf[1]));
        feat = ctx.addr;
      } else {
        if (showDem) out.push(piece(...demForm(subjKind === 'it' ? 'this' : ({ that: 'this', those: 'these' }[seg.subj.w] || seg.subj.w), firstNP ? npInfo(firstNP).feat : 'm')));
        const helper = HELPERS[a.modal] || { want: VERBS.want, like: VERBS.like }[a.modal];
        if (a.never && t === 'past') { const u = umr(p); out.push(piece(u[0], u[1])); }
        let presentNeg = false;
        if (a.perfect && !a.had && (a.modal === 'can' || a.modal === 'maybe' || a.will)) {   // could have been worse → kaan mumkin ykoon ashyan
          out.push(piece(a.will ? 'chaan' : a.neg ? 'ma kaan mumkin' : 'kaan mumkin', a.will ? 'چان' : a.neg ? 'ما كان ممكن' : 'كان ممكن'));
          out.push(piece(presentAz(BE, p), presentAr(BE, p)));
        } else if (helper || a.modal === 'must' || a.modal === 'maybe') {
          const lead = a.modal === 'must' ? (a.neg ? ['mob laazim', 'مب لازم'] : ['laazim', 'لازم']) : a.modal === 'maybe' ? ['yimkin', 'يمكن'] : conj(helper, a.modalPast ? 'past' : 'present', p);
          const neg2 = a.neg && a.modal !== 'must';
          out.push(piece((neg2 ? 'ma ' : '') + lead[0], (neg2 ? 'ما ' : '') + lead[1]));
          const k = [presentAz(BE, p), presentAr(BE, p)];
          out.push(piece(k[0], k[1]));
        } else if (t === 'past') {
          const k = [pastAz(BE, p), pastAr(BE, p)];
          out.push(piece((a.neg ? 'ma ' : '') + k[0], (a.neg ? 'ما ' : '') + k[1]));
        } else if (t === 'future') {
          const f = future(BE, p);
          out.push(piece((a.neg ? 'ma ' : '') + f[0], (a.neg ? 'ما ' : '') + f[1]));
        } else {
          if (st.subord && !a.neg && !hasStill && !yearsComp && subjKind !== 'dem') out.push(piece(presentAz(BE, p), presentAr(BE, p)));
          else if (subjKind === 'pron' && !hasStill && !seg.subj.silent) out.push(...(yearsComp ? [piece(...umr(p))] : renderAny(seg.subj, ctx).pieces));
          else if (subjKind === 'pron' && seg.subj.silent && yearsComp) out.push(piece(...umr(p)));
          presentNeg = a.neg;
        }
        out.push(...midPieces(a.mids, p));
        if (presentNeg) out.push(piece('mob', 'مب'));
        if (npLate) out.push(...renderNP(seg.subj, ctx, { generic: isBare(seg.subj), subject: true }).pieces);
      }
      let lastAdj = null;
      for (const c of comp) {
        if (c.k === 'ADJP') { out.push(...renderADJP(c, feat, { thing, head: seg.subj ? headKey(seg.subj) : null })); lastAdj = c.adjs[c.adjs.length - 1].key; continue; }
        if (c.k === 'VG2') {
          const a2 = analyze(c.c.parts);
          const owner = seg.subj && seg.subj.k === 'NP' && seg.subj.poss ? resolveP(PRON_POSS[seg.subj.poss], ctx.addr) : subjKind === 'it' ? resolveP('2', ctx.addr) : p;
          out.push(...renderVG(Object.assign({}, a2, { tense: 'present' }), owner, ctx, {}).pieces);
          continue;
        }
        if (c.k === 'PP' && lastAdj && ADJ_PREP[lastAdj] && ADJ_PREP[lastAdj][c.eng] !== undefined) {
          let k2 = ADJ_PREP[lastAdj][c.eng];
          if (c.eng === 'with' && lastAdj === 'busy' && c.obj && ((c.obj.k === 'NP' && (npInfo(c.obj).human || WITH_PEOPLE.has(headKey(c.obj)))) || (c.obj.k === 'PRON' && !['it', 'them'].includes(c.obj.w)))) k2 = 'wiyya';   // busy with my family → mash3'ool wiyya ahali
          out.push(...renderPP(Object.assign({}, c, { key: k2 || null, eng: k2 ? 'x' : 'of' }), ctx, null, p).pieces);
          continue;
        }
        out.push(...renderRest(c, ctx, st, null, p, gapP).pieces);
      }
      st.p = imperativeBe ? null : p; st.feat = feat; st.tense = t; st.imp = !!imperativeBe;
      return out;
    }

    // you look tired → shaklak ta3baan; i feel tired → a7iss 7aali ta3baan
    ctx.feat = feat;
    const r0 = seg.rest[0];
    const seemV = a.main && VERBS[a.main.key] && VERBS[a.main.key].special === 'seem';
    const seemComp = r0 && (r0.k === 'ADJP' || (r0.k === 'PP' && r0.eng === 'like') || (seemV && ['NP', 'UNK', 'FIXED', 'IND', 'OWN', 'NUM'].includes(r0.k)));
    const feelThing = a.main && a.main.key === 'feel' && thing && subjKind !== 'it';
    if (a.main && !imperative && (a.main.key === 'look' || a.main.key === 'feel' || seemV) && (seemComp || (seemV && !r0))) {
      out.push(...midPieces(a.mids, p));
      if (a.main.key === 'look' || seemV || feelThing) {
        const hasStill = a.mids.some((m) => m.k === 'still');
        if (a.tense === 'past' && !hasStill) { const k = [pastAz(BE, p), pastAr(BE, p)]; out.push(piece((a.neg ? 'ma ' : '') + k[0], (a.neg ? 'ما ' : '') + k[1])); }
        const sh = possess('shakl', 'شكل', p);
        out.push(piece(sh[0], sh[1]));
        if (a.neg && (a.tense !== 'past' || hasStill)) out.push(piece('mob', 'مب'));
      } else {
        const rv = renderVG(Object.assign({}, a, { mids: [] }, a.tense === 'present' ? { prog: false } : {}), p, ctx, {});
        out.push(...rv.pieces);
        const h = possess('7aal', 'حال', p);
        out.push(piece(h[0], h[1]));
      }
      for (const c of seg.rest) out.push(...(c.k === 'ADJP' ? renderADJP(c, feat, { thing, head: seg.subj ? headKey(seg.subj) : null }) : renderRest(c, ctx, st, a.main.key, p).pieces));
      st.p = p; st.feat = feat; st.tense = a.tense; st.imp = false;
      return out;
    }

    // it took me two months → 5ath minni shahrain
    if (a.main && a.main.key === 'take' && (subjKind === 'it' || (!seg.subj && a.tense === 'past' && !seg.inherit)) && seg.rest[0] && seg.rest[0].k === 'PRON' && seg.rest[1] && isTimeNP(seg.rest[1])) {
      if (!seg.subj) p = '3m';
      const rv = renderVG(a, p, ctx, {});
      out.push(...rv.pieces);
      const ep = pronP(seg.rest[0], ctx);
      const q = prepPron('min', ep);
      out.push(piece(q[0], q[1]));
      let vIdx = -1, vKey = null;
      for (const c of seg.rest.slice(1)) {
        if (c.k === 'VG2') {
          out.push(piece('3ashaan', 'عشان'));
          const r2 = renderVG(Object.assign({}, analyze(c.c.parts), { tense: 'present' }), ep, ctx, {});
          const b2 = out.length;
          out.push(...r2.pieces);
          vIdx = r2.objIdx >= 0 ? b2 + r2.objIdx : -1; vKey = r2.verbKey;
          continue;
        }
        if (c.k === 'PRON' && vIdx >= 0) { const pc = out[vIdx]; const q2 = attachObj(pc.az, pc.ar, pronP(c, ctx)); pc.az = q2[0]; pc.ar = q2[1]; vIdx = -1; continue; }
        out.push(...renderRest(c, ctx, st, vKey, ep).pieces);
      }
      st.p = p; st.feat = feat; st.tense = a.tense; st.imp = false;
      return out;
    }

    // ordinary verbs
    const verbP = p;
    let r;
    if (a.perfProg && seg.pre.some((c) => c.k === 'WH' && c.it.w === 'how long')) {
      const q = prepPron('li', p);
      out.push(piece(q[0], q[1]));
      r = renderVG(Object.assign({}, a, { prog: false, perfProg: false, tense: 'present' }), verbP, ctx, {});
    } else if (!seg.subj && !seg.inherit && st.sep === 'conj' && a.main && !a.hasAux && a.main.form === 'ing') {
      r = renderVG(Object.assign({}, a, { prog: true, tense: st.tense === 'past' ? 'past' : 'present' }), verbP, ctx, {});
    } else if (seg.inherit && a.main && !a.hasAux && a.main.form === 'ing') {
      const aa = Object.assign({}, a, st.tense === 'past' ? { habit: true, tense: 'past' } : {});
      r = renderVG(aa, verbP, ctx, {});
    } else if (seg.vg.toInf) {
      r = renderVG(Object.assign({}, a, { tense: 'present' }), verbP, ctx, {});
    } else {
      const together = (a.modal === 'want' || a.modal === 'like') && /^2/.test(verbP || '') && seg.rest.some((c) => c.k === 'ADV' && c.it.az === 'sawa');   // do you want to play together → tabi nil3ab sawa
      r = renderVG(a, verbP, ctx, { imperative, pronSubj: subjKind === 'pron' && !(seg.subj && seg.subj.silent), thing: thing && subjKind !== 'dem', compP: together ? '1p' : null });
    }
    const base = out.length;
    out.push(...r.pieces);
    let objIdx = r.objIdx >= 0 ? base + r.objIdx : -1;
    let lastVerbKey = r.verbKey;
    let attached = false, objP = null, npSeen = false, objFilled = false, gapUsed = false;
    for (let i = 0; i < seg.rest.length; i++) {
      const c = seg.rest[i];
      const V = lastVerbKey ? VERBS[lastVerbKey] : null;
      if (c.k === 'PRON' && c.role !== 'poss') {
        const op = pronP(c, ctx);
        const nextC = seg.rest[i + 1];
        if (objIdx >= 0 && !attached && V && !V.special && !V.obj && nextC && nextC.k === 'PP' && (nextC.eng === 'to' || nextC.eng === 'for') && nextC.obj && nextC.obj.k === 'PRON' &&
            ['it', 'them', 'him', 'her'].includes(c.w) && (V.io || V.to === 'li')) {
          const pc = out[objIdx]; const q = attachObj(pc.az, pc.ar, pronP(nextC.obj, ctx)); pc.az = q[0]; pc.ar = q[1];
          const iy = { '3m': ['iyyaah', 'إياه'], '3f': ['iyyaaha', 'إياها'], '3p': ['iyyaahum', 'إياهم'] }[op] || ['iyyaah', 'إياه'];
          out.push(piece(iy[0], iy[1]));
          attached = true; objFilled = true; i++;
          continue;
        }
        if (objIdx >= 0 && !attached && V && !V.special) {
          if (V.key === 'take' && (subjKind === 'it' || subjKind === 'dem') && (!nextC || nextC.k !== 'VG2')) { const q = prepPron('min', op); out.push(piece(q[0], q[1])); }
          else if (['pay', 'sell', 'send', 'give', 'show', 'tell'].includes(V.key) && !['it', 'them'].includes(c.w) && (!nextC || nextC.k === 'PP' || nextC.k === 'ADV' || nextC.k === 'CONJ')) { const q = prepPron('li', op); out.push(piece(q[0], q[1])); objP = op; objFilled = true; continue; }   // paid him → dafa3t lah
          else if (V.obj && V.tail) { const q = prepPron(V.obj, op); const pc = out[objIdx]; pc.az = pc.az.replace(' ' + V.tail[0], ' ' + q[0] + ' ' + V.tail[0]); pc.ar = pc.ar.replace(' ' + V.tail[1], ' ' + q[1] + ' ' + V.tail[1]); }
          else if (V.obj) { const q = prepPron(V.obj, op); out.push(piece(q[0], q[1])); }
          else if (V.io && nextC && (nextC.k === 'NP' || nextC.k === 'DEM')) { const q = prepPron(V.io, op); out.push(piece(q[0], q[1])); }
          else if ((V.io || V.to === 'li') && gapP && !gapUsed && !['it', 'them'].includes(c.w) && (!nextC || nextC.k === 'PP' || nextC.k === 'ADV')) { const q = prepPron(V.io || 'li', op); out.push(piece(q[0], q[1])); objP = op; continue; }   // the link you sent me → 6arrashta li
          else { const pc = out[objIdx]; const q = attachObj(pc.az, pc.ar, op); pc.az = q[0]; pc.ar = q[1]; attached = true; }
          objP = op; objFilled = true;
          continue;
        }
        const f = SUBJ_FORM[op];
        out.push(piece(f[0], f[1]));
        continue;
      }
      if (c.k === 'VG2') {
        const a2 = analyze(c.c.parts);
        const nx = seg.rest[i + 1];
        const pv = seg.rest[i - 1];
        if (!objP && c.c.toInf && pv && V && ['need', 'want', 'find', 'get', 'ask', 'look for', 'wait for', 'have', 'know'].includes(V.key)) {
          if (pv.k === 'IND' && /one|body/.test(pv.it.key)) objP = '3m';
          else if (pv.k === 'NP' && npInfo(pv).human) objP = npInfo(pv).p;
        }
        if (a2.main && a2.main.key === 'like' && V && ['forget', 'remember'].includes(V.key) && nx && nx.k === 'NP' && ['video', 'picture', 'comment', 'stream', 'channel'].includes(headKey(nx))) a2.main = Object.assign({}, a2.main, { key: 'like_yt' });
        if (a2.main && a2.main.key === 'run' && nx && ((nx.k === 'NP' && RUN_OBJ.has(headKey(nx))) || (nx.k === 'PRON' && ['it', 'them'].includes(nx.w)))) a2.main = Object.assign({}, a2.main, { key: 'turn on' });
        // does anyone know how to get it → a7ad yadri shlon a7a99ila (the one asking wants it)
        const howTo = subjKind === 'ind' && seg.rest[i - 1] && seg.rest[i - 1].k === 'WH';
        const r2 = renderVG(Object.assign({}, a2, { tense: 'present', neg: a2.neg }), objP || (imperative ? resolveP('2', ctx.addr) : howTo ? '1s' : verbP), ctx, {});
        const b2 = out.length;
        out.push(...r2.pieces);
        if (r2.objIdx >= 0) { objIdx = b2 + r2.objIdx; attached = false; lastVerbKey = r2.verbKey; }
        objP = null; npSeen = false; objFilled = false;
        continue;
      }
      if (c.k === 'NP' && V && (V.key === 'click' || V.key === 'press') && isBare(c) && !c.adjs.length && !npSeen) {
        npSeen = true;
        const label = c.nouns.map((n) => n.o || n.unk || (n.user && n.user.az) || '').join(' ');
        out.push(piece('3ala', 'على'), piece(label, label, { user: true }));
        continue;
      }
      if ((c.k === 'NP' || c.k === 'IND') && V && !V.special && !npSeen && objIdx >= 0) {
        npSeen = true;
        const gen = c.k === 'NP' && GENERIC_VERBS.has(V.key) && isBare(c);
        st.objGeneric = gen;
        const np = c.k === 'IND' ? { pieces: [piece(c.it.az, c.it.ar)] } : renderNP(c, ctx, { generic: gen });
        const ob = V.objNP || V.obj;
        if (ob && !objFilled) {
          const m = mergePrep(ob, np.pieces[0]);
          out.push(...(m ? [m, ...np.pieces.slice(1)] : [piece(ob.replace(/_/g, ' '), PREP_AR[ob] || ob), ...np.pieces]));
        } else out.push(...np.pieces);
        continue;
      }
      const rr = renderRest(c, ctx, st, lastVerbKey, verbP, gapP && !gapUsed ? gapP : null);
      if (rr.gap) gapUsed = true;
      if (rr.attach && objIdx >= 0 && !attached) { const pc = out[objIdx]; const q = attachObj(pc.az, pc.ar, rr.attach); pc.az = q[0]; pc.ar = q[1]; attached = true; continue; }
      out.push(...rr.pieces);
    }
    // the item i wanted → il-item illi kint abeeh; the guy i called → illi daggeet 3alaih
    if (gapP && !gapUsed && !objFilled && !npSeen && objIdx >= 0) {
      const VV = VERBS[lastVerbKey];
      if (VV && !VV.special && !INTRANS.has(VV.key)) {
        if (VV.obj) { const q = prepPron(VV.obj, gapP); out.splice(objIdx + 1, 0, piece(q[0], q[1])); }
        else { const pc = out[objIdx]; const q = attachObj(pc.az, pc.ar, gapP); pc.az = q[0]; pc.ar = q[1]; }
      }
    }
    st.p = imperative ? null : p; st.feat = feat; st.imp = !!imperative;
    {   // remember the last thing mentioned, so a later "it" agrees with it: "i can't join the room, it's full" → malyaana
      const nps = [seg.subj && seg.subj.k === 'NP' ? seg.subj : null].concat(seg.rest.filter((c) => c.k === 'NP' || (c.k === 'PP' && c.obj && c.obj.k === 'NP'))).filter(Boolean).map((c) => (c.k === 'PP' ? c.obj : c));
      const last = nps[nps.length - 1];
      if (last) { const inf = npInfo(last); if (!inf.human && !inf.pl) ctx.ante = { p: inf.p, feat: inf.feat }; else ctx.ante = null; }
    }
    st.tense = a.tense === 'future' ? 'future' : a.tense;
    return out;
  }
  function isTimeNP(c) {
    if (!c || c.k !== 'NP') return false;
    if (TIME_NOUNS.has(headKey(c))) return true;
    const h = c.nouns[c.nouns.length - 1];
    return !!(h && h.user && h.user.key && /^(a while|a long time|a bit|a moment|a second|a minute)$/.test(h.user.key));
  }
  const WITH_PEOPLE = new Set(['family', 'team', 'guild', 'clan', 'crew', 'squad', 'group', 'kids', 'parents', 'people', 'class', 'party']);
  const CAUSATIVES = new Set(['make', 'let', 'help', 'watch', 'see', 'hear', 'have']);
  const THING_AGENTS = new Set(['bot', 'script', 'program', 'app', 'tool', 'plugin', 'command', 'feature', 'option', 'button', 'class', 'skill', 'item', 'pet', 'weapon', 'spell', 'potion']);
  const THING_VERBS = new Set(['release_i', 'happen', 'rain', 'cost', 'crash', 'freeze', 'lag', 'overheat', 'go down', 'spawn', 'respawn', 'last']);
  const NOUN_PREP = { help: { with: 'fi', on: 'fi' }, problem: { with: 'fi', in: 'fi' }, question: { about: '3an', on: '3an' }, idea: { about: '3an', for: '7ag' },
    opinion: { about: 'fi', on: 'fi' }, issue: { with: 'fi' }, bug: { in: 'fi', with: 'fi' }, video: { about: '3an' }, tutorial: { about: '3an' } };
  const RUN_OBJ = new Set(['program', 'app', 'game', 'bot', 'script', 'code', 'file', 'computer', 'server', 'plugin', 'engine', 'model', 'ai', 'tool', 'version', 'test', 'exe', 'command', 'setup']);
  function isFutureTime(c) {
    if (c.k === 'ADV') return ['tomorrow', 'tonight', 'later', 'soon'].includes(c.it.k);
    if (c.k === 'FIXED') return /^(next |tomorrow|tonight|later)/.test(c.it.key || '');
    if (c.k === 'PP') return c.eng === 'in' && !!c.obj && c.obj.k === 'NP' && TIME_NOUNS.has(headKey(c.obj)) && !!(c.obj.num || c.obj.det === 'indef' || c.obj.quant);
    return false;
  }
  const INTRANS = new Set(['go', 'come', 'sleep', 'wake up', 'get up', 'sit', 'sit down', 'stay', 'live', 'arrive', 'reach', 'die', 'happen',
    'laugh', 'cry', 'run', 'walk', 'fly', 'travel', 'swim', 'dance', 'rest', 'smile', 'return', 'come back', 'go back', 'go out', 'get out',
    'get back', 'stand', 'rain', 'grow', 'crash', 'joke', 'kid', 'log in', 'log into', 'log out', 'log off', 'sign in', 'sign out', 'sign up',
    'become', 'work', 'talk', 'chat', 'speak', 'listen', 'agree', 'worry', 'excel', 'connect', 'look', 'attempt', 'ponder', 'continue', 'jump']);
  function renderRest(c, ctx, st, verbKey, p, gapP) {
    // i never said that → 3umri ma gilt hadha (as an object, "that" is not far away)
    if (c.k === 'DEM' && verbKey && (c.w === 'that' || c.w === 'those')) c = { k: 'DEM', w: c.w === 'that' ? 'this' : 'these' };
    switch (c.k) {
      case 'NP': case 'DEM': case 'OWN': case 'UNK': case 'PRON': case 'NUM': case 'IND': return { pieces: renderAny(c, ctx).pieces };
      case 'PP': return renderPP(c, ctx, verbKey, p, gapP);
      case 'ADJP': return { pieces: renderADJP(c, ctx.feat || 'm') };
      case 'VG2': return { pieces: [] };
      default: return { pieces: simplePieces(c, ctx) };
    }
  }

  function renderSentence(items, ctx) {
    const raw = chunk(items);
    const chunks = [];
    const sl = (x) => x && (x.k === 'NP' || (x.k === 'UNK' && /^[A-Z]/.test(x.it.o)) || (x.k === 'PRON' && x.role !== 'poss' && x.role !== 'obj') || (x.k === 'PRON' && x.w === 'me'));
    for (let i = 0; i < raw.length; i++) {
      const A = raw[i], B = raw[i + 1], Cc = raw[i + 2], D = raw[i + 3];
      const atStart = i === 0 || raw[i - 1].k === 'PUNCT' || raw[i - 1].k === 'CONJ' || raw[i - 1].k === 'FIXED';
      if (atStart && sl(A) && B && B.k === 'CONJ' && B.it.w === 'and' && sl(Cc) && D && D.k === 'VG' && !D.toInf) {
        const fix = (x) => (x.k === 'PRON' && x.w === 'me' ? { k: 'PRON', w: 'i', role: 'subj' } : x);
        chunks.push({ k: 'CSUBJ', parts: [fix(A), fix(Cc)] }); i += 2; continue;
      }
      chunks.push(A);
    }
    splitRunOns(chunks);
    mergeOfConstruct(chunks);
    markReducedRelatives(chunks);
    frontStrandedPreps(chunks);
    for (let i = 0; i + 1 < chunks.length; i++) {
      if ((chunks[i].k === 'NP' || chunks[i].k === 'NUM') && chunks[i + 1].k === 'ADV' && chunks[i + 1].it.k === 'ago') { const x = chunks[i]; chunks[i] = chunks[i + 1]; chunks[i + 1] = x; i++; }
    }
    // "yes, ...", "hey bro, ...", "thanks, ...": a comma after the opening word
    for (let i = chunks.length - 1; i > 0; i--) {
      const c = chunks[i], nx = chunks[i + 1];
      if (c.k === 'FIXED' && TAIL_FIXED.has(c.it.key) && (!nx || nx.k === 'PUNCT') && chunks[i - 1].k !== 'PUNCT' && chunks[i - 1].k !== 'CONJ') chunks.splice(i, 0, { k: 'PUNCT', it: { s: ',' }, auto: true });
    }
    for (let i = 0; i + 1 < chunks.length; i++) {   // "how are you i need help" → shlonak, a7taaj musaa3ada
      const c = chunks[i], nx = chunks[i + 1];
      const newClause = nx.k === 'FIXED' || nx.k === 'VG' || (nx.k === 'PRON' && nx.role !== 'obj' && nx.role !== 'poss') || (nx.k === 'NP' && chunks[i + 2] && chunks[i + 2].k === 'VG');
      if (c.k === 'FIXED' && LEAD_Q.has(c.it.key) && newClause && !isVocative(nx)) chunks.splice(i + 1, 0, { k: 'PUNCT', it: { s: ',' }, auto: true });
    }
    let last = chunks.length - 1;
    while (last > 0 && chunks[last].k === 'PUNCT') last--;
    const asBro = (c) => (c.k === 'NP' && headKey(c) === 'man' ? { k: 'FIXED', it: { t: 'fixed', az: '5ooy', ar: 'خوي', key: 'bro' } } : c);
    if (last > 0 && isVocative(chunks[last]) && chunks[last].k === 'NP') chunks[last] = asBro(chunks[last]);
    let lead = 0;
    while (lead < chunks.length && isLeadWord(chunks[lead])) lead++;
    const addressWord = (c) => (c.k === 'FIXED' && ['bro', 'brother', 'dude', 'buddy', 'guys'].includes(c.it.key)) || (c.k === 'NP' && isBare(c) && headKey(c) === 'man' && !c.nouns[0].pl && c.nouns.length === 1 && !c.adjs.length);
    while (lead < chunks.length && (lead > 0 ? isVocative(chunks[lead]) : addressWord(chunks[lead]) && chunks.length > lead + 1)) { chunks[lead] = asBro(chunks[lead]); lead++; }
    const afterLead = chunks[lead];
    const knowLead = lead > 0 && chunks[lead - 1].k === 'FIXED' && FIX_KNOW.has(chunks[lead - 1].it.key) && afterLead &&
      (afterLead.k === 'WH' || (afterLead.k === 'CONJ' && ['when', 'if', 'whether', 'why', 'where', 'how', 'that'].includes(afterLead.it.w)) || (afterLead.k === 'NP' && afterLead.det === 'which'));   // i know what you mean → adri shu tig9id
    if (lead > 0 && afterLead && afterLead.k !== 'PUNCT' && !knowLead) chunks.splice(lead, 0, { k: 'PUNCT', it: { s: ',' }, auto: true });
    const plural = chunks.some((c) => (c.k === 'FIXED' && ['guys', 'everyone', 'everybody', 'hello everyone', 'hi everyone', 'hi all', 'hello guys', 'hi guys', 'hey guys', 'yo guys', 'hey everyone'].includes(c.it.key)) || (c.k === 'NP' && isBare(c) && headKey(c) === 'guy' && c.nouns[0].pl));
    const savedAddr = ctx.addr;
    if (plural && ctx.addr !== 'pl') ctx.addr = 'pl';
    const out = [];
    const st = { p: null, feat: null, tense: 'present', sep: null, subord: false };
    let clause = [];
    let first = true, pendingRel = null, allLead = true;
    const lastIsPunct = () => !out.length || out[out.length - 1].punct;
    const flush = () => {
      const rel = pendingRel;
      pendingRel = null;
      if (!clause.length) return;
      const segs = segment(clause, { relSubjGap: !!rel && clause[0].k === 'VG' });
      segs.forEach((s, i) => {
        if (rel) { if (i === 0) s.rel = rel; else if (rel.subjMain && !s.subj) s.relMain = rel; }
        if (i > 0 && s.split && !s.relMain && !s.embedded && needComma(segs[i - 1]) && !lastIsPunct()) out.push(comma());
        // i think he is right → a7sib inna 9a7; i know you are tired → adri innak ta3baan
        const modalComp = s.vg && (() => { const a2 = analyze(s.vg.parts); return a2.modal === 'must' || a2.modal === 'maybe'; })();
        const wantInn = s.subj && !s.rel && !s.relMain && !modalComp && ((i === 0 && st.pendingInn) || (i > 0 && s.split && !s.embedded && thatVerbBefore(segs[i - 1]) && !s.inverted));
        if (wantInn) {
          if (s.subj.k === 'PRON' && s.subj.role !== 'obj' && s.subj.role !== 'poss') {
            const q = INN[pronP(s.subj, ctx)] || INN['3m'];
            out.push(piece(q[0], q[1]));
            s = Object.assign({}, s, { subj: Object.assign({}, s.subj, { silent: true, innP: pronP(s.subj, ctx) }) });
          } else if (s.subj.k === 'NP' || s.subj.k === 'DEM' || s.subj.k === 'IND' || s.subj.k === 'THERE') out.push(piece('inn', 'إن'));
        }
        st.pendingInn = false;
        out.push(...renderSegment(s, ctx, st, first && i === 0));
      });
      first = false;
      clause = [];
    };
    for (const c of chunks) {
      if (c.k === 'PUNCT') { flush(); st.sep = /[,;:]/.test(c.it.s) ? 'comma' : null; st.subord = false; out.push({ az: c.it.s, ar: c.it.s, punct: true, known: true }); if (/[.!?]/.test(c.it.s)) { st.p = null; st.feat = null; first = true; } if (c.splitQ) { ctx.question = false; ctx.splitQ = true; } continue; }
      if (c.k === 'CONJ') {
        flush();
        st.sep = 'conj';
        if (c.it.w === 'that' && c.it.inn) { st.pendingInn = true; if (c.it.az === 'inn') continue; }
        st.subord = SUBORD.has(c.it.az);
        if ((c.it.w === 'but' || c.it.w === 'so') && !lastIsPunct()) out.push(comma());
        if (c.it.w === 'so' && allLead) { out.push(piece('ya3ni', 'يعني')); continue; }   // "nice, so i don't have to do anything?" → ya3ni
        out.push(...simplePieces(c, ctx));
        continue;
      }
      if (c.k === 'FIXED' && CLAUSE_FIXED.has(c.it.key) && clause.length && (clause.some((x) => x.k === 'VG') || (clause[clause.length - 1].k === 'FIXED' && CLAUSE_FIXED.has(clause[clause.length - 1].it.key)))) {
        const lastVG = clause.filter((x) => x.k === 'VG').pop();
        const m = lastVG && lastVG.parts.find((x) => x.t === 'verb');
        const thatV = m && THAT_VERBS.has(m.key) && clause[clause.length - 1] === lastVG;
        flush(); if (!lastIsPunct() && !thatV) out.push(comma());
      }
      if (c.k === 'REL') {
        // the bot that farms gold → il-bot illi yfarrim gold; a bot that farms gold → bot yfarrim gold
        const ante = clause[clause.length - 1];
        const subjMain = !clause.some((x) => x.k === 'VG');
        flush();
        const info = relInfo(ante);
        if (info.def) out.push(piece('illi', 'اللي'));
        pendingRel = { p: info.p, feat: info.feat, human: info.human, head: info.head, subjMain };
        st.sep = 'rel';
        continue;
      }
      if (allLead && !(isLeadWord(c) || isVocative(c) || (c.k === 'ADJP' && c.adjs.length === 1 && !c.ints))) allLead = false;
      clause.push(c);
    }
    flush();
    ctx.addr = savedAddr;
    return out;
  }
  const SUBORD = new Set(['lamma', 'lain', 'awwal ma']);
  const CLAUSE_FIXED = new Set(['it is late', 'it is early', 'i am back', 'i do not know', 'i know', 'no problem', 'never mind', 'you are right', 'i agree', 'i am fine', 'i am good',
    'it is ok', 'it is okay', 'it is fine', 'no worries', 'i am coming', 'i am on my way', 'i miss you', 'i love you', 'i am sorry', 'what happened', 'i see', 'got it', 'i understand',
    'thank you', 'thanks', 'thank you very much', 'thank you so much', 'thanks a lot', 'good luck', 'see you', 'see you later', 'bye', 'good night', 'take care', 'will do', 'you got this',
    'can not wait', 'i can not wait', 'that is sick', 'this is sick', 'appreciate it', 'i appreciate it', 'talk tomorrow', 'talk later', 'talk soon', 'same', 'same here', 'my bad']);
  function relInfo(c) {
    if (!c) return { p: '3m', feat: 'm', human: false, def: false };
    if (c.k === 'NP') {
      const inf = npInfo(c);
      const sup = c.adjs.some((x) => ADJS[x.key].pre && !ADJS[x.key].defNoun);
      const def = !sup && (['def', 'this', 'that', 'all', 'which'].includes(c.det) || !!c.poss || !!c.owner || c.nouns.some((n) => n.user));
      return { p: inf.p, feat: inf.feat, human: !!inf.human, def, head: headKey(c) };
    }
    if (c.k === 'IND') return { p: '3m', feat: 'm', human: !/thing$/.test(c.it.key), def: ['everyone', 'everybody', 'everything'].includes(c.it.key) };
    if (c.k === 'FIXED' && c.it.user) return { p: '3m', feat: 'm', human: false, def: true };
    return { p: '3m', feat: 'm', human: false, def: true };
  }
  /* "the item i wanted": a noun, then I/you/he... and a verb with nothing after it → a relative clause. */
  function markReducedRelatives(chunks) {
    for (let i = 0; i + 2 < chunks.length; i++) {
      const A = chunks[i], B = chunks[i + 1], C = chunks[i + 2], D = chunks[i + 3];
      if (A.k !== 'NP' || !A.nouns.length) continue;
      if (!((B.k === 'PRON' && ['i', 'you', 'he', 'she', 'we', 'they'].includes(B.w) && B.role !== 'obj' && B.role !== 'poss') || B.k === 'IND')) continue;
      if (C.k !== 'VG' || C.toInf) continue;
      const a = analyze(C.parts);
      const strandedEnd = D && D.k === 'PP' && !D.obj && !D.ing && (!chunks[i + 4] || chunks[i + 4].k === 'PUNCT' || chunks[i + 4].k === 'CONJ');
      const runProg = a.main && a.main.key === 'run' && RUN_OBJ.has(headKey(A));
      if (!a.main || a.beOnly || (INTRANS.has(a.main.key) && !strandedEnd && !runProg) || VERBS[a.main.key].special) continue;
      const prevC = chunks[i - 1];
      const afterVerb = !!prevC && (prevC.k === 'VG' || ((prevC.k === 'ADV' || (prevC.k === 'PRON' && prevC.role !== 'subj')) && chunks[i - 2] && chunks[i - 2].k === 'VG'));
      const atStart = !prevC || prevC.k === 'PUNCT' || prevC.k === 'CONJ' || (prevC.k === 'FIXED' && !prevC.it.user);
      if (!afterVerb && !atStart) continue;
      if (!atStart) {
        // "when i finish the quest i will ..." is two clauses
        let j = i - 1;
        while (j >= 0 && chunks[j].k !== 'PUNCT' && chunks[j].k !== 'CONJ') j--;
        if (j >= 0 && chunks[j].k === 'CONJ' && chunks[j].it.w !== 'and' && chunks[j].it.w !== 'but' && chunks[j].it.w !== 'or') continue;
      }
      let objAfter = D && (D.k === 'NP' || D.k === 'IND' || D.k === 'DEM' || D.k === 'OWN' || (D.k === 'PRON' && D.role !== 'subj' && D.role !== 'poss'));
      const E = chunks[i + 4];
      const recipient = D && D.k === 'PRON' && D.role !== 'subj' && D.role !== 'poss' && !['it', 'them'].includes(D.w) && (VERBS[a.main.key].io || VERBS[a.main.key].to === 'li') &&
        !(E && (E.k === 'NP' || E.k === 'IND' || E.k === 'DEM' || E.k === 'OWN' || (E.k === 'PRON' && E.role !== 'subj' && E.role !== 'poss')));
      if (recipient) objAfter = false;   // the link you sent me → il-link illi 6arrashta li
      if (objAfter && !TIME_NOUNS.has(headKey(A))) continue;
      if (atStart) {
        // "the model i could run from my pc | weren't strong": the clause's own verb must follow
        let k = recipient ? i + 4 : i + 3;
        while (chunks[k] && (chunks[k].k === 'PP' || chunks[k].k === 'ADV')) k++;
        if (!(chunks[k] && chunks[k].k === 'VG' && !chunks[k].toInf)) continue;
      }
      chunks.splice(i + 1, 0, { k: 'REL', w: '', reduced: true });
      i += 2;
    }
  }
  /* "what server are you on?" → "3ala ay server inta?" */
  /* Messages typed without punctuation: "i sold my weapon can i get it back", "which server are you in i cant find you". */
  function splitRunOns(chunks) {
    const subjP = (c) => c && c.k === 'PRON' && c.role !== 'obj' && c.role !== 'poss';
    for (let i = 1; i + 1 < chunks.length; i++) {
      const c = chunks[i], prev = chunks[i - 1], n1 = chunks[i + 1], n2 = chunks[i + 2];
      if (prev.k === 'PUNCT' || prev.k === 'CONJ') continue;
      const before = chunks.slice(0, i);
      let j = i - 1; while (j >= 0 && chunks[j].k !== 'PUNCT' && chunks[j].k !== 'CONJ') j--;
      const clause = chunks.slice(j + 1, i);
      const hasVerb = clause.some((x) => x.k === 'VG' && !x.toInf);
      if (!hasVerb) continue;
      // a stranded preposition, then a new subject: "are you in | i cant find"
      if (prev.k === 'PP' && !prev.obj && !prev.ing && subjP(c) && n1 && n1.k === 'VG') { chunks.splice(i, 0, { k: 'PUNCT', it: { s: ',' }, auto: true }); i++; continue; }
      // a question, then a command: "whats your ign | add me in game"
      if (c.k === 'VG' && !c.toInf && (prev.k === 'NP' || prev.k === 'OWN') && clause.some((x) => x.k === 'WH') && n1 && (n1.k === 'PRON' && n1.role !== 'subj' || n1.k === 'NP')) {
        const a = analyze(c.parts);
        const lastVG = clause.filter((x) => x.k === 'VG').pop();
        const aux = lastVG && analyze(lastVG.parts);
        if (a.main && a.main.form === 'base' && !a.hasAux && !a.neg && aux && aux.beOnly) { chunks.splice(i, 0, { k: 'PUNCT', it: { s: '?' }, auto: true, splitQ: true }); i++; continue; }
      }
      // "where are you | come here": inverted wh-question, then a command
      if (c.k === 'VG' && !c.toInf && prev.k === 'PRON' && prev.role !== 'obj' && prev.role !== 'poss' && chunks[i - 2] && chunks[i - 2].k === 'VG' && chunks[i - 3] && chunks[i - 3].k === 'WH') {
        const a = analyze(c.parts), aux = analyze(chunks[i - 2].parts);
        if (a.main && a.main.form === 'base' && !a.hasAux && !a.neg && aux.beOnly && !aux.main && (!n1 || n1.k === 'ADV' || n1.k === 'PP' || n1.k === 'NP' || (n1.k === 'PRON' && n1.role !== 'subj'))) { chunks.splice(i, 0, { k: 'PUNCT', it: { s: '?' }, auto: true, splitQ: true }); i++; continue; }
      }
      // a bare modal/aux + subject pronoun + verb after a complete clause: "... | can i get it back"
      if (c.k === 'VG' && !c.toInf && subjP(n1) && n2 && n2.k === 'VG' && !n2.toInf) {
        const a = analyze(c.parts);
        if (!a.main && (a.modal || a.doAux || a.did || a.will) && (prev.k === 'NP' || prev.k === 'PRON' || prev.k === 'ADV' || prev.k === 'PP' || prev.k === 'IND' || prev.k === 'DEM')) { chunks.splice(i, 0, { k: 'PUNCT', it: { s: ',' }, auto: true }); i++; continue; }
      }
    }
  }
  /* the door of the house → baab il-bait: "X of Y" becomes a construct (Y owns X).
     Containers and parts keep "min" when Y is definite: a piece of the cake → gi63a min il-kaik. */
  const PARTITIVE = new Set(['piece', 'slice', 'cup', 'glass', 'bottle', 'bowl', 'plate', 'box', 'bag', 'can', 'pack', 'part', 'member', 'bit', 'kind', 'sort', 'type', 'lot', 'bunch', 'couple', 'pair', 'ton', 'load', 'group', 'set', 'drop', 'handful', 'one', 'plenty', 'majority', 'percent']);
  function mergeOfConstruct(chunks) {
    for (let i = 0; i + 1 < chunks.length; i++) {
      const a = chunks[i], b = chunks[i + 1];
      if (a.k !== 'NP' || b.k !== 'PP' || b.eng !== 'of' || !b.obj || b.ing || b.fronted) continue;
      if (a.owner || a.poss || a.quant || a.num || !a.nouns.length || a.nouns.some((n) => n.user) || a.det === 'which' || a.det === 'what') continue;
      const head = headKey(a);
      if (!head || !NOUNS[head]) continue;
      const o = b.obj;
      const defY = (o.k === 'NP' && (['def', 'this', 'that'].includes(o.det) || o.poss || o.owner || o.nouns.some((n) => n.user))) || o.k === 'UNK';
      const bareY = o.k === 'NP' && isBare(o) && !o.nouns.some((n) => n.user);
      if (!defY && !bareY) continue;
      if (PARTITIVE.has(head) || headKey(a) === 'rest') { if (defY) { b.key = 'min'; b.eng = 'x'; } continue; }
      if (bareY && npInfo(o).pl && npInfo(a).pl) continue;   // the kings of kings
      a.owner = o;
      chunks.splice(i + 1, 1);
    }
  }
  function frontStrandedPreps(chunks) {
    let start = 0;
    for (let i = 0; i <= chunks.length; i++) {
      if (i < chunks.length && chunks[i].k !== 'PUNCT' && chunks[i].k !== 'CONJ') continue;
      const first = chunks[start], li = i - 1, last = chunks[li];
      const whStart = first && (first.k === 'WH' || (first.k === 'NP' && (first.det === 'which' || first.quant === 'cham')));
      if (whStart && last && li > start && last.k === 'PP' && !last.obj && !last.ing && !last.fronted) {
        let V = null;
        for (let j = start; j < li; j++) {
          if (chunks[j].k !== 'VG') continue;
          const m = chunks[j].parts.find((x) => x.t === 'verb');
          if (m) V = VERBS[m.key];
        }
        const key = prepKeyFor(last, V);
        chunks.splice(li, 1);
        if (key) chunks.splice(start, 0, Object.assign({}, last, { key, eng: 'x', fronted: true }));
        else i--;
      }
      start = i + 1;
    }
  }
  function comma() { return { az: ',', ar: ',', punct: true, known: true }; }
  /* No comma after "i think / i know / i hope ...": what follows belongs to them. */
  const THAT_FIXED = new Set(['i know', 'i do not know', 'do not know', 'i have no idea', 'no idea', 'i hope', 'i think', 'i guess', 'i bet', 'i am sure', 'i am not sure', 'not sure', 'i believe', 'i feel like', 'i wish', 'i heard', 'i swear', 'i promise', 'i agree', 'i understand', 'i see', 'i mean']);
  const INN = { '1s': ['inni', 'إني'], '2': ['innak', 'إنك'], '2m': ['innak', 'إنك'], '2f': ['innich', 'إنج'], '2p': ['inkum', 'إنكم'], '3m': ['inna', 'إنه'], '3f': ['inha', 'إنها'], '1p': ['innana', 'إننا'], '3p': ['inhum', 'إنهم'] };
  const SURE_ADJ = new Set(['sure', 'certain', 'afraid', 'glad', 'happy', 'sorry', 'surprised', 'worried', 'scared', 'positive']);
  function sureBefore(prev) {
    if (!prev || !prev.vg) return false;
    const a = analyze(prev.vg.parts);
    const last = prev.rest[prev.rest.length - 1];
    return !!(a.beOnly && last && last.k === 'ADJP' && last.adjs.some((x) => SURE_ADJ.has(x.key)));
  }
  function thatVerbBefore(prev) {
    if (!prev || !prev.vg) return false;
    if (sureBefore(prev)) return true;
    const a = analyze(prev.vg.parts);
    const m = a.main;
    if (!m || !THAT_VERBS.has(m.key) || m.key === 'hope' || m.key === 'see' || m.key === 'feel') return false;
    const last = prev.rest[prev.rest.length - 1];
    if (last && last.k === 'VG2') return false;
    if (last && last.k === 'WH') return false;
    return true;
  }
  function needComma(prev) {
    if (!prev || !prev.vg) return false;
    if (sureBefore(prev)) return false;
    const a = analyze(prev.vg.parts);
    if (a.main && THAT_VERBS.has(a.main.key)) return false;
    const v2 = prev.rest.filter((c) => c.k === 'VG2').pop();
    if (v2) { const a2 = analyze(v2.c.parts); if (a2.main && THAT_VERBS.has(a2.main.key)) return false; }
    return true;
  }
  const LEAD_FIXED = new Set(['yes', 'yeah', 'yep', 'yup', 'no', 'nope', 'nah', 'ok', 'okay', 'alright', 'all right', 'sure', 'of course',
    'hello', 'hi', 'hey', 'yo', 'hello everyone', 'hi everyone', 'hi all', 'hello guys', 'hi guys', 'hey guys', 'welcome', 'welcome back',
    'ah', 'ahh', 'ohh', 'hmm', 'umm', 'uh', 'damn', 'dang', 'i do not know', 'do not know', 'i have no idea', 'no idea', 'i know', 'i know right',
    'sheesh', 'deadass', 'lowkey', 'highkey', 'facts', 'same', 'same here', 'my bad', 'probably not', 'not really', 'of course not',
    'wow', 'oh', 'oops', 'ugh', 'lol', 'haha', 'hahaha', 'omg', 'oh my god', 'sorry', 'i am sorry', 'i am so sorry', 'so sorry', 'thank you', 'thanks again', 'thank you again', 'wait', 'bet', 'say less',
    'peace be upon you', 'salam', 'salaam', 'salam alaikum', 'salaam alaikum', 'assalamu alaikum', 'assalam alaikum', 'and peace be upon you', 'walaikum salam', 'wa alaikum salam',
    'thanks', 'thank you very much', 'thank you so much', 'thanks a lot', 'excuse me', 'congratulations', 'congrats', 'good morning',
    'good afternoon', 'good evening', 'good luck', 'seriously', 'exactly', 'i see', 'got it', 'no problem', 'no worries', 'never mind',
    'wallah', 'i swear', 'inshallah', 'god willing', 'alhamdulillah', 'thank god', 'by the way', 'to be honest', 'in my opinion', 'well done',
    'good job', 'nice one', 'great job', 'gg', 'good game', 'for real', 'no way', 'i agree', 'you are right', 'me too', 'yo guys', 'hey everyone',
    'good morning everyone', 'good morning guys', 'good evening everyone', 'good evening guys', 'thanks everyone', 'thank you everyone',
    'thanks guys', 'thank you guys', 'good luck everyone', 'good luck guys']);
  const LEAD_ADV = new Set(['honestly', 'actually', 'anyway', 'well']);
  const LEAD_Q = new Set(['how are you', 'how are you doing', 'what is up', 'how is it going', 'where are you', 'what are you doing', 'what is new', 'you there', 'are you there', 'you up']);
  const TAIL_FIXED = new Set(['lol', 'haha', 'hahaha', 'smh', 'omg', 'oh my god', 'wow', 'ugh', 'oops', 'i swear', 'wallah', 'seriously', 'for real', 'no way', 'i think so',
    'bye', 'goodbye', 'bye bye', 'see you', 'see you later', 'see you soon', 'see you tomorrow', 'good night', 'take care', 'peace', 'peace out', 'talk to you later',
    'to be honest', 'by the way', 'in my opinion', 'i know right', 'damn', 'dang', 'inshallah', 'god willing', 'hopefully', 'thank god', 'alhamdulillah']);
  function isLeadWord(c) {
    if (!c) return false;
    if (c.k === 'FIXED') return LEAD_FIXED.has(c.it.key);
    if (c.k === 'ADV') return !!(c.it.k && LEAD_ADV.has(c.it.k));
    return false;
  }
  function isVocative(c) {
    if (!c) return false;
    if (c.k === 'FIXED') return ['bro', 'brother', 'dude', 'buddy', 'everyone', 'everybody', 'guys'].includes(c.it.key);
    if (c.k === 'UNK') return !!c.it.name;
    if (c.k === 'IND') return ['everyone', 'everybody'].includes(c.it.key);
    if (c.k === 'NP' && isBare(c) && headKey(c) === 'man' && !c.nouns[0].pl && !c.adjs.length && c.nouns.length === 1) return true;
    if (c.k === 'NP') return (c.poss === 'my' && ['friend', 'brother', 'sister', 'guy'].includes(headKey(c)) && c.nouns.length === 1) ||
      (isBare(c) && headKey(c) === 'guy' && c.nouns[0].pl && !c.adjs.length);
    return false;
  }

  /* Questions typed without "?": "where are you", "can you help me", "do you like it". */
  const Q_AUX = new Set(['do', 'does', 'did', 'are', 'is', 'am', 'was', 'were', 'can', 'could', 'will', 'would', 'should', 'have', 'has', 'shall', 'may']);
  function looksLikeQuestion(toks) {
    // the last clause decides: "my account got hacked, what do i do" / "i sold it can i get it back"
    const parts = []; let cur = [];
    for (const t of toks) { if (t.punct && /[,;:]/.test(t.o)) { parts.push(cur); cur = []; } else if (!t.punct && !t.emoji) cur.push(t.w); }
    parts.push(cur);
    const last = parts[parts.length - 1];
    if (parts.length > 1 && last.length) return questionWords(last) || runOnQuestion(last);
    return questionWords(parts[0] || []) || runOnQuestion(parts[0] || []);
  }
  function runOnQuestion(w) {
    const subj = (x) => !!x && (!!PRON_SUBJ[x] || x === 'you' || x === 'u' || x === 'it' || x === 'there' || x === 'this' || x === 'that' || x === 'anyone' || x === 'someone' || x === 'everyone');
    const EMB = ['if', 'know', 'tell', 'ask', 'wonder', 'sure', 'idea', 'matter', 'see', 'remember', 'forget', 'understand', 'guess', 'decide', 'what', 'how', 'why', 'where', 'who', 'which', 'when', 'that', 'whether', 'and', 'or', 'but', 'so', 'then', 'cause', 'because', 'to', 'not'];
    let q = -1;
    for (let k = 1; k + 1 < w.length; k++) {
      if (EMB.includes(w[k - 1]) || PRON_SUBJ[w[k - 1]] || w[k - 1] === 'you') continue;
      if (WH[w[k]] && Q_AUX.has(w[k + 1]) && subj(w[k + 2])) { q = k; continue; }
      if ((Q_AUX.has(w[k]) || MODAL[w[k]]) && subj(w[k + 1]) && w[k + 2] && (['is', 'are', 'was', 'were', 'am'].includes(w[k]) || (verbInfo(w[k + 2]) || []).some((r) => r.form === 'base' || r.form === 'pp' || r.form === 'ing') || w[k + 2] === 'be' || w[k + 2] === 'not' || w[k + 2] === 'have')) q = k;
    }
    if (q < 0) return false;
    // the question must be the last clause: "how r u i need help" is not one
    for (let k = q + 3; k + 1 < w.length; k++) if ((w[k] === 'i' || w[k] === 'we' || w[k] === 'he' || w[k] === 'she' || w[k] === 'they') && w[k + 1] && (verbInfo(w[k + 1]) || AUX.has(w[k + 1]) || MODAL[w[k + 1]])) return false;
    return true;
  }
  function questionWords(w) {
    if (w.length >= 8 && w.slice(4).some((x) => x === 'i' || x === 'we')) return false;   // "how r u i need help..." runs on
    let i = 0;
    while (i < w.length && ['hey', 'hi', 'hello', 'bro', 'so', 'and', 'but', 'ok', 'okay', 'yo', 'guys', 'dude', 'by', 'the', 'way', 'to', 'be', 'honest', 'honestly', 'anyway', 'also',
      'well', 'btw', 'tbh', 'ngl', 'yeah', 'yes', 'no', 'oh', 'wait', 'um', 'umm', 'hmm', 'actually', 'basically', 'listen', 'look', 'man', 'lol', 'also', 'in', 'my', 'opinion'].includes(w[i])) i++;
    const a = w[i], b = w[i + 1];
    if (!a) return false;
    if (WH[a]) {
      if (!b) return true;
      if (a === 'how' && (ADJS[b] || b === 'much' || b === 'many' || b === 'long' || b === 'old' || b === 'well' || b === 'good')) return true;
      return Q_AUX.has(b) || !!MODAL[b] || (verbInfo(b) || []).some((r) => r.form === 's' || r.form === 'past') || NOUN_FORM.has(b) || b === 'one' || b === 'ones';
    }
    if (Q_AUX.has(a) && b) {
      if (/^(do|does|did)$/.test(a) && (DET[b] || PRON_POSS[b] || NOUN_FORM.has(b)) && !PRON_SUBJ[b]) return w.slice(i + 2).some((x) => isVerbBase(x) && !DET[x]);   // "do your homework" is a command
      return !!(PRON_SUBJ[b] || b === 'you' || b === 'it' || b === 'there' || b === 'this' || b === 'that' || DET[b] || PRON_POSS[b] || NOUN_FORM.has(b));
    }
    return false;
  }

  /* ====================================================================== */
  /*  Public API                                                             */
  /* ====================================================================== */
  const AR_PUNCT = { ',': '،', '?': '؟', ';': '؛' };
  function joinPieces(pieces, which) {
    let s = '';
    let attachNext = false;
    for (const pc of pieces) {
      let t = pc[which];
      if (!t) continue;
      if (pc.punct && !pc.emoji) {
        if (which === 'ar') t = t.replace(/[,?;]/g, (m) => AR_PUNCT[m]);
        s = s.replace(/\s+$/, '') + t + ' ';
        attachNext = false;
        continue;
      }
      s += t;
      if (which === 'az' && pc.andAr) { if (keepApart(nextPiece(pieces, pc, which), which)) s += '-'; continue; }   // wba3dain, w-Ahmed, w-3
      s += ' ';
      attachNext = false;
    }
    return s.replace(/\s+/g, ' ').trim();
  }
  function nextPiece(pieces, pc, which) {
    const i = pieces.indexOf(pc);
    for (let j = i + 1; j < pieces.length; j++) if (pieces[j][which]) return pieces[j];
    return null;
  }
  function keepApart(nx, which) { return !!nx && (nx.num || /^\d+([.,:]\d+)*$/.test(nx[which].split(' ')[0]) || /^[A-Z]/.test(nx[which]) || nx.punct); }
  function fixArabicAnd(s) { return s.replace(/(^|\s)و\s+(?=[\u0600-\u06FF])/g, '$1و'); }
  /* il-shams → ish-shams, fil-sayyara → fis-sayyara */
  function sunLetters(s) { return s.replace(/\b(i|fi|bi|li)l-(sh|[tdrzsn])(?!['h])/gi, (m, pre, c) => pre + c + '-' + c); }
  function capitalize(s) { return s.replace(/(^|[.!?]\s+)([a-z])/g, (m, a, b) => a + b.toUpperCase()); }
  function toLetters(s) {
    return s.replace(/3'/g, 'gh').replace(/9'/g, 'd').replace(/6'/g, 'dh').replace(/7/g, 'h').replace(/5/g, 'kh')
      .replace(/[23]/g, "'").replace(/6/g, 't').replace(/9/g, 's').replace(/8/g, 'q');
  }

  /* translate(text, { addr: 'm'|'f'|'pl', style: 'digits'|'letters', user: [{from, to, toAr}] })
     → { az, ar, unknown: [words] } */
  function translate(text, opts) {
    opts = opts || {};
    const ctx = { addr: opts.addr === 'f' || opts.addr === 'pl' ? opts.addr : 'm', user: new Map() };
    for (const e of opts.user || []) {
      const k = String(e.from || '').toLowerCase().replace(/[’]/g, "'").trim().split(/\s+/).map((w) => w).join(' ');
      if (!k || /[؀-ۿ]/.test(k)) continue;
      const toks = expandTokens(tokenize(k)).map((t) => t.w).join(' ');
      ctx.user.set(toks, { az: String(e.to || ''), ar: String(e.toAr || taughtArabic(String(e.to || ''))) });
    }
    const unknown = [], fixes = [];
    const userWords = new Set();
    for (const k of ctx.user.keys()) k.split(' ').forEach((w) => userWords.add(w));
    ctx.keep = compileKeep(opts.keep);
    if (ctx.keep) for (const w of KEEP_WORDS) userWords.add(w);
    const lines = String(text || '').replace(/\r\n?/g, '\n').split('\n');
    const azLines = [], arLines = [];
    for (const line of lines) {
      if (!line.trim()) { azLines.push(''); arLines.push(''); continue; }
      const toks = [];
      const line2 = line.replace(/\bw\/o\b/gi, 'without').replace(/\bw\/(?=\s|$)/gi, 'with').replace(/\bb\/c\b/gi, 'because').replace(/\btl;dr\b/gi, 'tldr').replace(/\b(\d{1,2}) ?(am|pm)\b/gi, '$1$2').replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)-(one|two|three|four|five|six|seven|eight|nine)\b/gi, '$1 $2')
        .replace(/\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty)-(minute|hour|day|week|month|year|second|minutes|hours|days|weeks|months|years|seconds)\b/gi, '$1 $2');
      for (const t of expandTokens(tokenize(line2))) {
        if (t.punct || t.arabic || t.posss || t.exp || t.keep || /^[A-Z]/.test(t.o.slice(1)) || (/^[A-Z]/.test(t.o) && toks.length && !toks[toks.length - 1].punct)) { toks.push(t); continue; }
        let fix = correctWord(t.w, userWords);
        if (!fix && (/([a-z])\1\1/.test(t.w) || /^(ha){3,}h?$/.test(t.w) || /^(ah){2,}a?$/.test(t.w)) && !vocab().has(t.w) && !userWords.has(t.w)) fix = unstretch(t.w);   // soooo → so, pleaseee → please
        if (!fix) { toks.push(t); continue; }
        fixes.push({ from: t.o, to: fix });
        expandTokens(tokenize(fix)).forEach((x, i) => toks.push(Object.assign(x, { o: i === 0 && /^[A-Z]/.test(t.o) ? x.o[0].toUpperCase() + x.o.slice(1) : x.o })));
      }
      contextFix(toks, fixes);
      const sentences = [];
      let cur = [];
      for (const t of toks) { cur.push(t); if (t.punct && /[.!?]/.test(t.o)) { sentences.push(cur); cur = []; } }
      if (cur.length) sentences.push(cur);
      let all = [];
      for (const s of sentences) {
        let pieces;
        ctx.question = looksLikeQuestion(s) || s.some((t) => t.punct && t.o.includes('?'));
        ctx.splitQ = false;
        try { pieces = renderSentence(lex(s, ctx), ctx); }
        catch (e) { FALLBACK.n++; FALLBACK.last = e; pieces = wordByWord(s, ctx); }
        let lastTok = s[s.length - 1], tailEmoji = 0;
        while (lastTok && lastTok.emoji) { tailEmoji++; lastTok = s[s.length - 1 - tailEmoji]; }
        if (lastTok && !lastTok.punct && pieces.length) {
          const words = s.filter((t) => !t.punct && !t.emoji).length;
          const at = Math.max(0, pieces.length - tailEmoji);
          if (ctx.splitQ ? runOnQuestion(s.filter((t) => !t.punct && !t.emoji).map((t) => t.w)) : looksLikeQuestion(s)) pieces.splice(at, 0, { az: '?', ar: '?', punct: true, known: true });
          else if (words >= 3) pieces.splice(at, 0, { az: '.', ar: '.', punct: true, known: true });
        }
        all = all.concat(pieces);
      }
      for (const pc of all) {
        if (pc.known === false && pc.unk && /[a-z]/i.test(pc.az) && !unknown.includes((pc.bare || pc.az).toLowerCase())) unknown.push((pc.bare || pc.az).toLowerCase());
        const own = pc.known !== false && !pc.num && !pc.punct && !pc.user && !pc.raw && !pc.name;
        if (own) pc.az = sunLetters(pc.az).replace(/([369]')\1/g, '$1');
        if (opts.style === 'letters' && own) pc.az = toLetters(pc.az);
      }
      azLines.push(joinPieces(all, 'az').replace(/(^|\s)fi i(l|sh|[tdrzsn])-/g, '$1fi$2-'));   // fi il-video → fil-video
      arLines.push(fixArabicAnd(joinPieces(all, 'ar')));
    }
    return { az: azLines.join('\n'), ar: arLines.join('\n'), unknown, fixes };
  }

  /* Rough Arabizi → Arabic script, used for words people teach the translator. */
  const AZ2 = { "3'": 'غ', "9'": 'ض', "6'": 'ظ', sh: 'ش', ch: 'چ', th: 'ث', kh: 'خ', gh: 'غ', dh: 'ذ', aa: 'ا', ee: 'ي', ii: 'ي', oo: 'و', uu: 'و', ou: 'و', ai: 'اي', ay: 'اي', ei: 'ي', ie: 'ي' };
  const AZ1 = { 2: 'ء', 3: 'ع', 5: 'خ', 6: 'ط', 7: 'ح', 8: 'غ', 9: 'ص', b: 'ب', t: 'ت', j: 'ج', d: 'د', r: 'ر', z: 'ز', s: 'س', f: 'ف', g: 'ق',
    k: 'ك', l: 'ل', m: 'م', n: 'ن', h: 'ه', w: 'و', y: 'ي', v: 'ف', p: 'ب', c: 'ك', q: 'ق', x: 'كس', o: 'و' };
  function azWord(w) {
    let art = '';
    const m = w.match(/^(il|al|el)-/);
    if (m) { art = 'ال'; w = w.slice(m[0].length); }
    let out = '', last = '';
    for (let i = 0; i < w.length;) {
      const two = w.slice(i, i + 2), ch = w[i], end = i === w.length - 1;
      let add = '', step = 1;
      if (i === 0 && two === 'aa') { add = 'آ'; step = 2; }
      else if (i === 0 && /[aiueo]/.test(ch) && !(two === 'ai' || two === 'ay' || two === 'ou' || two === 'oo' || two === 'ee')) add = ch === 'i' || ch === 'e' ? 'إ' : 'أ';
      else if (AZ2[two] && !((two === 'ay' || two === 'ai') && w[i + 2] === 'y')) { add = AZ2[two]; step = 2; }
      else if (ch === 'a') add = end ? (i > 1 && !/[aeiou]/.test(w[i - 1]) ? 'ة' : 'ا') : '';
      else if (ch === 'i') add = end ? 'ي' : '';
      else if (ch === 'u') add = end ? 'و' : '';
      else if (ch === 'e') add = '';
      else if (AZ1[ch]) add = AZ1[ch];
      else if (/[\u0600-\u06FF]/.test(ch)) add = ch;
      if (add && step === 1 && i > 0 && ch === w[i - 1] && !/[aeiou]/.test(ch)) add = '';
      out += add;
      if (add) last = add;
      i += step;
    }
    return art + out;
  }
  function toArabicScript(s) {
    return String(s || '').split(/(\s+)/).map((w) => (/^\s*$/.test(w) || !/[a-z0-9]/i.test(w) ? w : azWord(w.toLowerCase()))).join('');
  }
  /* Only words that are clearly Arabic (they use the digit letters) get converted; brand names stay as typed. */
  function taughtArabic(az) { return /[23579]|6'?|9'/.test(az) && /[a-z]/i.test(az) ? toArabicScript(az) : az; }
  const FALLBACK = { n: 0, last: null };
  /* Last resort when the grammar gives up: one word at a time. */
  function wordByWord(toks, ctx) {
    const out = [];
    for (const t of toks) {
      if (t.punct) { out.push({ az: t.o, ar: t.o, punct: true, known: true }); continue; }
      if (t.arabic) { out.push(piece(t.o, t.o, { raw: true, emoji: !!t.emoji })); continue; }
      const w = t.w;
      const nf = NOUN_FORM.get(w), vf = verbInfo(w), A = ADJS[w], D = ADV[w];
      if (FIXED.has(w)) { const v = FIXED.get(w)[ctx.addr] || FIXED.get(w).m; out.push(piece(v[0], v[1])); }
      else if (nf) { const N = NOUNS[nf.key]; out.push(piece(nf.pl ? N.azPl : N.az, nf.pl ? N.arPl : N.ar)); }
      else if (A) out.push(piece(A.m, A.arM));
      else if (vf) { const V = VERBS[vf[0].key]; out.push(piece(presentAz(V, '1s'), presentAr(V, '1s'))); }
      else if (D && D.az) out.push(piece(D.az, D.ar));
      else if (PRON_SUBJ[w]) { const f = SUBJ_FORM[resolveP(PRON_SUBJ[w], ctx.addr)]; out.push(piece(f[0], f[1])); }
      else if (PREP[w] && PREP_AR[PREP[w]]) out.push(piece(PREP[w].replace(/_/g, ' '), PREP_AR[PREP[w]]));
      else if (CONJ[w] && CONJ[w][0]) out.push(piece(CONJ[w][0], CONJ[w][1]));
      else if (WH[w]) out.push(piece(WH[w][0], WH[w][1]));
      else if (/^\d/.test(w)) out.push(piece(t.o, t.o, { num: true }));
      else if (!DET[w] && !AUX.has(w) && !MODAL[w] && w !== 'to' && w !== "'s") out.push(piece(t.o, t.o, { known: false, unk: true }));
    }
    return out;
  }
  function stats() {
    return { words: Object.keys(NOUNS).length + Object.keys(ADJS).length + Object.keys(VERBS).length + Object.keys(ADV).length, phrases: FIXED.size };
  }

  const api = { translate, toLetters, toArabicScript, stats, _debug: { vocab: () => vocab(), raw: () => ({ NOUN_RAW, ADJ_RAW, VERB_RAW, ADV_RAW, NUM_RAW, NUM_CONS, FIXED_RAW, WH, CONJ, PREP_AR, PREP_PRON, DEM, SUBJ_FORM, STILL, TAWW, MULTI }), fallback: FALLBACK, correctWord, lex: (t, addr, keep) => lex(expandTokens(tokenize(t)), { addr: addr || 'm', user: new Map(), keep: compileKeep(keep) }), chunk } };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.EnEmirati = api;
})(typeof window !== 'undefined' ? window : globalThis);
