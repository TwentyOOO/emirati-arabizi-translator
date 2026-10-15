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
    room: "3'urfa 3'uraf f|غرفة غرف", school: "madrasa madaaris f|مدرسة مدارس", university: "jaam3a jaam3aat f|جامعة جامعات",
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
    word: "kilma kilmaat f|كلمة كلمات", translation: "tarjama tarjamaat f|ترجمة ترجمات", skill: "mahaara mahaaraat f|مهارة مهارات",
    project: "mashroo3 mashaaree3 m|مشروع مشاريع", program: "barnaamij baraamij m|برنامج برامج", app: "ta6beeg ta6beegaat m|تطبيق تطبيقات",
    file: "malaff malaffaat m|ملف ملفات", picture: "9oora 9iwar f|صورة صور", message: "risaala rasaayil f|رسالة رسايل",
    email: "email emailaat m|إيميل إيميلات", website: "mawgi3 mawaagi3 m|موقع مواقع", internet: "internet internet m|إنترنت إنترنت",
    character: "sha59iyya sha59iyyaat f|شخصية شخصيات", level: "level levelaat m|لفل لفلات", weapon: "sila7 asli7a m|سلاح أسلحة",
    sword: "saif syoof m|سيف سيوف", monster: "wa7sh w7oosh m|وحش وحوش", enemy: "3adu a3daa2 mh|عدو أعداء",
    team: "fareeg firag m|فريق فرق", player: "laa3ib laa3ibeen mh|لاعب لاعبين", server: "server serveraat m|سيرفر سيرفرات",
    account: "7saab 7saabaat m|حساب حسابات", password: "password passwordaat m|باسورد باسوردات", key: "miftaa7 mafaatee7 m|مفتاح مفاتيح",
    door: "baab abwaab m|باب أبواب", window: "dareesha dareesh f|دريشة دريش", book: "kitaab kutub m|كتاب كتب",
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
    error: "5a6a2 a56aa2 m|خطأ أخطاء", bug: "5alal a5laal m|خلل أخلال", result: "nateeja nataayij f|نتيجة نتايج",
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
    reward: "reward rewardaat m|ريوارد ريواردات", event: "event eventaat m|ايفنت ايفنتات", merge: "merge merge m|ميرج ميرج", sound: "9oot a9waat m|صوت أصوات", art: "fann funoon m|فن فنون", script: "script scriptaat m|سكربت سكربتات",
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
    wifi: "wifi wifi m|واي_فاي واي_فاي", queue: "6aaboor 6awaabeer m|طابور طوابير", battle: "ma3raka ma3aarik f|معركة معارك",
    member: "3u9'u a39'aa2 mh|عضو أعضاء", rule: "gaanoon gawaaneen m|قانون قوانين", axe: "faas fu2oos m|فاس فؤوس",
    dagger: "5anjar 5anaajir m|خنجر خناجر", staff: "3a9a 3i9i f|عصا عصي", bow: "gaws agwaas m|قوس أقواس", gun: "musaddas musaddasaat m|مسدس مسدسات",
    wand: "wand wands m|وند وندز", mace: "mace maces m|ميس ميسات", scythe: "minjal manaajil m|منجل مناجل", shield: "dir3 duroo3 m|درع دروع", notification: "tanbeeh tanbeehaat m|تنبيه تنبيهات", description: "wa9f wa9f m|وصف وصف",
    requirement: "muta6allab muta6allabaat m|متطلب متطلبات", option: "5iyaar 5iyaaraat m|خيار خيارات", admin: "admin admins mh|أدمن أدمنز", button: "zirr azraar m|زر أزرار", math: "riyaa9'iyyaat riyaa9'iyyaat f|رياضيات رياضيات",
    maths: "riyaa9'iyyaat riyaa9'iyyaat f|رياضيات رياضيات", science: "3uloom 3uloom f|علوم علوم", history: "taaree5 taaree5 m|تاريخ تاريخ",
    physics: "feezyaa2 feezyaa2 f|فيزياء فيزياء", chemistry: "keemyaa2 keemyaa2 f|كيمياء كيمياء",
    'drop rate': "drop_rate drop_rates m|دروب_ريت دروب_ريتات", 'friend request': "6alab_9adaaga 6alabaat_9adaaga m|طلب_صداقة طلبات_صداقة"
  };
  const NOUN_ALIAS = {
    dad: 'father', mom: 'mother', mum: 'mother', kid: 'child', photo: 'picture', image: 'picture', film: 'movie',
    television: 'tv', store: 'shop', application: 'app', site: 'website', exam: 'test', mobile: 'phone', cellphone: 'phone',
    pc: 'computer', buddy: 'friend', pal: 'friend', mate: 'friend', lady: 'woman', job_: 'job', dude_: 'guy',
    phones: 'phone', apps: 'app', guys: 'guy', mins: 'minute', grandma: 'grandmother', granny: 'grandmother', grandpa: 'grandfather',
    dmg: 'damage', guide: 'tutorial', beach: 'sea', medicines: 'medicine', fault: 'mistake'
  };
  const NOUN_PL_IRR = { people: 'person', men: 'man', women: 'woman', children: 'child', kids: 'child', guys: 'guy' };

  /* Adjectives: "masculine feminine plural|masculine feminine plural", or "one form|one form" when it never changes.
     A leading ^ means it goes before the noun (first, best...). */
  const ADJ_RAW = {
    good: "zain zaina zaineen|زين زينة زينين", fine: "zain zaina zaineen|زين زينة زينين", bad: "shain shaina shaineen|شين شينة شينين",
    ugly: "shain shaina shaineen|شين شينة شينين", nice: "7ilu 7ilwa 7ilween|حلو حلوة حلوين", beautiful: "7ilu 7ilwa 7ilween|حلو حلوة حلوين",
    pretty: "7ilu 7ilwa 7ilween|حلو حلوة حلوين", sweet: "7ilu 7ilwa 7ilween|حلو حلوة حلوين", cute: "7ilu 7ilwa 7ilween|حلو حلوة حلوين",
    cool: "5a6eer 5a6eera 5a6eereen|خطير خطيرة خطيرين", great: "5a6eer 5a6eera 5a6eereen|خطير خطيرة خطيرين",
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
    free: "faa9'i faa9'ya faa9'yeen|فاضي فاضية فاضيين", ready: "zaahib zaahba zaahbeen|زاهب زاهبة زاهبين",
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
    low: "wa6i wa6ya wa6yeen|واطي واطية واطيين", high: "3aali 3aalya 3aalyeen|عالي عالية عاليين",
    delicious: "ladheedh ladheedha ladheedheen|لذيذ لذيذة لذيذين", tasty: "ladheedh ladheedha ladheedheen|لذيذ لذيذة لذيذين",
    laggy: "ylaggig tlaggig ylaggigoon|يلقق تلقق يلققون", afk: "afk|afk", op: "op|op",
    down: "6aayi7 6aay7a 6aay7een|طايح طايحة طايحين", daily: "yoomi yoomiyya yoomiyya|يومي يومية يومية",
    weekly: "isboo3i isboo3iyya isboo3iyya|أسبوعي أسبوعية أسبوعية", monthly: "shahri shahriyya shahriyya|شهري شهرية شهرية",
    messy: "m5arba6 m5arb6a m5arb6een|مخربط مخربطة مخربطين", strict: "9aarim 9aarma 9aarmeen|صارم صارمة صارمين", rare: "naadir naadra naadreen|نادر نادرة نادرين",
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
    sell: ["bi3t baa3 bee3 bee3|بعت باع بيع بيع", { past: 'sold', ms: 'bee3|بيع' }],
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
    happen: ["- 9aar 9eer -|- صار صير -", { to: 'fi' }],
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
    'calm down': ["rawwagt rawwag rawwig rawwig|روقت روق روق روق", {}],
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
    save_t: ["waffart waffar waffir waffir|وفرت وفر وفر وفر", {}],
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
    totally: "~wayed|وايد", quickly: "bsir3a|بسرعة", slowly: "shway shway|شوي شوي", well: "zain|زين", together: "sawa|سوا",
    almost: "*tagreeban|تقريباً", everywhere: "fi kil makaan|في كل مكان", actually: "bil-7ageega|بالحقيقة",
    honestly: "bi9raa7a|بصراحة", anyway: "ma 3alaina|ما علينا", outside: "barra|برا", inside: "daa5il|داخل",
    away: "ba3eed|بعيد", even: "*7atta|حتى", maybe: "yimkin|يمكن", perhaps: "yimkin|يمكن", first: "awwal|أول",
    instead: "badalha|بدالها", once: "marra|مرة", twice: "marratain|مرتين", fast: "bsir3a|بسرعة", hard: "wayed|وايد",
    please: "@law sama7t law sama7ti law sama7tu|لو سمحت لو سمحتي لو سمحتوا", ago: "gabil|قبل", online: "online|أونلاين",
    most: "akthar|أكثر", more: "akthar|أكثر", finally: "*a5eeran|أخيراً", ever: "*|", long: "wayed|وايد", below: "ta7t|تحت", louder: "b9oot a3la|بصوت أعلى", forever: "lil-abad|للأبد"
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
    'nothing': "wala shay|ولا شي", 'everything': "kil shay|كل شي", 'everyone': "il-kil|الكل", 'everybody': "il-kil|الكل",
    'someone': "a7ad|أحد", 'somebody': "a7ad|أحد", 'something': "shay|شي", 'anything': "ay shay|أي شي", 'nobody': "ma7ad|محد",
    'no one': "ma7ad|محد", 'anyone': "a7ad|أحد", 'anybody': "a7ad|أحد",
    'here you go': A3("tfa9'9'al|تفضل", "tfa9'9'ali|تفضلي", "tfa9'9'alu|تفضلوا"), 'go ahead': A3("tfa9'9'al|تفضل", "tfa9'9'ali|تفضلي", "tfa9'9'alu|تفضلوا"),
    'be right back': "dageega wraaj3|دقيقة وراجع", 'brb': "dageega wraaj3|دقيقة وراجع", 'i will be right back': "dageega wraaj3|دقيقة وراجع",
    'let me know': A3("3allimni|علمني", "3allmeeni|علميني", "3allmooni|علموني"),
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
    'peace': "salaam|سلام", 'peace out': "salaam|سلام", 'stop it': "5alaa9|خلاص",
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
    'so that': { t: 'conj', az: '3ashaan', ar: 'عشان' }, 'how long': { t: 'wh', w: 'how long' }
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
    who: ['minu', 'منو'], whom: ['minu', 'منو'], which: ['ay', 'أي'], whose: ['maal minu', 'مال منو'], 'how long': ['cham', 'چم'] };
  const CONJ = { and: ['w', 'و'], but: ['bas', 'بس'], or: ['walla', 'ولا'], because: ['3ashaan', 'عشان'], if: ['law', 'لو'],
    then: ['ba3dain', 'بعدين'], while: ['w', 'و'], until: ['lain', 'لين'], although: ['ma3a inn', 'مع إن'], though: ['ma3a inn', 'مع إن'],
    unless: ['illa idha', 'إلا إذا'], so: ['3ashaan chidhi', 'عشان چذي'], that: ['', ''] };
  const PREP = { in: 'fi', at: 'fi', into: 'fi', on: '3ala', onto: '3ala', to: '7ag', for: '7ag', from: 'min', with: 'wiyya',
    about: '3an', by: 'b', without: 'bdoon', like: 'mithil', after: 'ba3d', before: 'gabil', during: 'wagt', under: 'ta7t',
    over: 'foog', above: 'foog', between: 'bain', near: 'greeb_min', behind: 'wara', around: '7awaali', through: 'min',
    till: 'lain', since: 'min', than: 'min', of: 'of', against: "9'idd", toward: '9oob', towards: '9oob', among: 'bain', per: 'kil', via: '3an_6areeg' };
  const PREP_AR = { fi: 'في', '3ala': 'على', '7ag': 'حق', min: 'من', wiyya: 'ويا', '3an': 'عن', b: 'ب', bdoon: 'بدون', mithil: 'مثل',
    ba3d: 'بعد', gabil: 'قبل', wagt: 'وقت', ta7t: 'تحت', foog: 'فوق', bain: 'بين', greeb_min: 'قريب من', wara: 'ورا', '7awaali': 'حوالي',
    lain: 'لين', "9'idd": 'ضد', '9oob': 'صوب', kil: 'كل', '3an_6areeg': 'عن طريق', li: 'ل', '3ind': 'عند', giddaam: 'قدام',
    yamm: 'يم', '3ashaan': 'عشان', badal: 'بدل', ba3eed_3an: 'بعيد عن' };
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
  const THAT_VERBS = new Set(['think', 'know', 'say', 'tell', 'hope', 'believe', 'feel', 'mean', 'see', 'hear', 'understand', 'remember', 'forget']);
  const TIME_NOUNS = new Set(['minute', 'hour', 'day', 'week', 'month', 'year', 'second', 'time', 'night', 'morning']);
  const EXPAND = {
    "i'm": 'i am', im: 'i am', "you're": 'you are', youre: 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is',
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
    gonna: 'going to', wanna: 'want to', gotta: 'have to', lemme: 'let me', gimme: 'give me', kinda: 'kind of',
    u: 'you', ur: 'your', pls: 'please', plz: 'please', thx: 'thanks', ty: 'thank you', tnx: 'thanks', np: 'no problem',
    idk: 'i do not know', imo: 'in my opinion', btw: 'by the way', tbh: 'to be honest', rn: 'right now', tmrw: 'tomorrow',
    tmr: 'tomorrow', '2day': 'today', '2morrow': 'tomorrow', tonite: 'tonight', b4: 'before', l8r: 'later', gr8: 'great',
    cuz: 'because', coz: 'because', cus: 'because', bc: 'because', msg: 'message', pic: 'picture', pics: 'pictures',
    vid: 'video', vids: 'videos', sec: 'second', secs: 'seconds', mins: 'minutes', hrs: 'hours', hr: 'hour',
    okey: 'okay', k: 'ok', kk: 'ok', bruh: 'bro', wassup: 'what is up', sup: 'what is up', whatsup: 'what is up', dunno: 'do not know', ya: 'you'
  };

  /* ====================================================================== */
  /*  Indexes                                                                */
  /* ====================================================================== */
  const NOUNS = {}, NOUN_FORM = new Map(), NOUN_PHRASE = new Map();
  for (const key of Object.keys(NOUN_RAW)) {
    const [a, b] = pair(NOUN_RAW[key]);
    const az = a.split(' '), ar = b.split(' ');
    const g = az[2] || 'm';
    const k = key.replace(/_$/, '');
    // loan: an English word used as it is (bot, video, server) → "il-bot maali", not "boti"
    NOUNS[k] = { key: k, az: sp(az[0]), azPl: sp(az[1] || az[0]), ar: sp(ar[0]), arPl: sp(ar[1] || ar[0]), g: g[0], human: g.includes('h'), loan: sp(az[0]) === k || k === 'armour' };
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
  for (const [a, k] of Object.entries(NOUN_PL_IRR)) NOUN_FORM.set(a, { key: k, pl: true });

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
    if (o.past) out.past.push(...[].concat(o.past)); else { out.past.push(reg); if (dbl) out.past.push(dbl + 'ed'); }
    if (o.pp) out.pp.push(...[].concat(o.pp)); else if (o.past) out.pp.push(...[].concat(o.past)); else { out.pp.push(reg); if (dbl) out.pp.push(dbl + 'ed'); }
    out.ing.push(/ie$/.test(base) ? base.slice(0, -2) + 'ying' : /[^e]e$/.test(base) ? base.slice(0, -1) + 'ing' : base + 'ing');
    if (dbl) out.ing.push(dbl + 'ing');
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
    'take care of yourself', 'take care of yourselves', 'wish me luck', 'make sure to', 'peace', 'peace out', 'stop it', 'have fun', 'see you all', 'see you all tomorrow', 'see you all later', 'get well soon', 'good luck everyone', 'good luck guys',
    'thanks everyone', 'thank you everyone', 'thanks guys', 'thank you guys', 'thanks everyone for', 'thank you everyone for', 'thanks guys for', 'thank you guys for', 'good morning everyone', 'good morning guys', 'good evening everyone', 'good evening guys', 'good night everyone', 'good night guys']);
  const FIX_END = new Set(['where are you', 'how are you', 'what are you doing', 'what is your name', 'where are you from', 'i see', 'i understand', 'got it', 'i agree', 'i think so', 'i do not think so', 'i am fine', 'i am good',
    'i am ok', 'i am okay', 'i am coming', 'whatever', 'and you', 'what about you', 'me too', 'me neither', 'how much', 'exactly',
    'seriously', 'for real', 'no way', 'let us go', 'it is ok', 'it is okay', 'it is fine', 'like this', 'like that', 'this way', 'what happened',
    'i would love to', 'sounds good to me', 'why not', 'whatever you want', 'it is up to you', 'up to you', 'worth it', 'it is worth it', 'it was worth it']);
  const FIX_KNOW = new Set(['i do not know', 'do not know', 'i have no idea', 'no idea', 'i know']);
  const STARTERS = new Set(['and', 'but', 'so', 'then', 'ok', 'okay', 'yes', 'yeah', 'no', 'oh', 'wow', 'haha', 'lol', 'hi', 'hello', 'hey',
    'well', 'bro', 'dude', 'guys', 'now', 'alright', 'also', 'man', 'please', 'everyone']);
  const ENDERS = new Set(['and', 'but', 'so', 'bro', 'dude', 'guys', 'man', 'everyone', 'please', 'too', 'again', 'now', 'then', 'lol',
    'haha', 'thanks', 'ok', 'okay', 'anyway', 'today', 'tonight', 'here', 'there', 'my', 'doing']);
  function startish(toks, i) {
    let j = i - 1;
    while (j >= 0 && toks[j].w === 'please') j--;
    if (j < 0) return true;
    const t = toks[j];
    return !!(t.punct || STARTERS.has(t.w));
  }
  function endish(toks, k) { const t = toks[k]; return !t || !!t.punct || ENDERS.has(t.w); }
  function fixedFits(key, toks, i, n) {
    const prev = toks[i - 1], next = toks[i + n];
    if (FIX_START.has(key) && !startish(toks, i)) return false;
    if (FIX_END.has(key) && !endish(toks, i + n)) return false;
    if (FIX_KNOW.has(key) && !(endish(toks, i + n) || (next && (WH[next.w] || ['if', 'that', 'about', 'anything', 'whether'].includes(next.w))))) return false;
    if (FIX_KNOW.has(key) && next && WH[next.w] && toks[i + n + 1] && toks[i + n + 1].w === 'to') return false;
    const lastW = key.split(' ').pop();
    if (DEM[lastW] && next && !next.punct && (NOUN_FORM.has(next.w) || ADJS[next.w])) return false;
    if ((key === 'like this' || key === 'like that') && prev && (PRON_SUBJ[prev.w] || AUX.has(prev.w) || MODAL[prev.w] || prev.w === 'to' || prev.w === 'not')) return false;
    if (key === 'got it' && prev && !prev.punct && (PRON_SUBJ[prev.w] || prev.w === 'you')) return false;
    if (key === 'to work' && !(prev && (verbInfo(prev.w) || []).some((r) => ['go', 'come', 'drive', 'walk', 'run', 'return', 'go back', 'get back'].includes(r.key)))) return false;
    if (key === 'at work' && next && !next.punct && (verbInfo(next.w) || []).length && !NOUN_FORM.has(next.w)) return false;
    return true;
  }

  /* ====================================================================== */
  /*  Spelling fixes for the English input                                   */
  /* ====================================================================== */
  const COMMON_TYPOS = {
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
  const EN_REAL = /*EN_REAL*/'abler abound accounted acre acres acts actuality administration administrators admits adventured adventurer adventurers adventurous afternoons aged aground aiding akin alight allays ally alter amazingly amble amps androids anythings apples applicator applicators arbors arbour arbours archiving arcing ardent ardors ardour ardours area ares armory armouries armoury arse ashing attach attached attaching attacker attaining attesting attracted attracting auction auctions avoidable axed axle axles backs bade bait bald bale band bans barb bard baring basses bats batter battering batters battled baud baying beached bead beading beads beak beaks beaming bean beaning bearing beast beasts beater beautifully beckoning beeches beginning beginnings beguiling behinds beings belches believer believers bellow belting benches bend bends bereaving beset besieging besting bests beta bets betters betting bettor bite bits bitter blacked blacking blacks blank blanks bleach bleaches bleat bleating bleats bled bloc blockaded blockading blockhead blocs blot blotching blots blow blows blued bluer blues boasts boat boating boats boding body bolt bolts boning bony booing boos boot booth boots bore bossed bossy botch bother bothers bottle bottles bough boughs bout bouts bowing bowl bowls boxing braking breach breaches breaching breading breakfasted breasting breathers breathing bred breeds bridging brinks broads broker brook brooks broth brotherly brow browns brows brush bugger buggers buildings bung buoy buoying buoys burner burners burrow burrowed burrowing burrows bury burying bushy busing busses bust busying buts butt butter buttery byes byte cabled cabling caging caking calked calking caller callings callus callusing calmer cameo cameos cane caning cannon cans caped caper capers caps card carded carding cards carefully caress carolling carp carped carping carps carriages carrier carriers cart carted carting carts carve carved carves carving cash cashed cashes cashing casing cast casting casts caving cawing ceding cellophane cementing chafed chafing chains chanced chancing channeled chant chanted chanting chants chap char characterise charmed charming charred charring chars chart charted charter charters charting charts chased chasing chatter chattered chattering cheapen cheapness cheat cheated cheating cheats checker cheeked cheeking cheeks chickened chicks chills choirs choked choking choosiest choosy chorusing chucked chucking chuckling chucks chute cites clacked clacking clacks clam clams clang clanged clanging clangs clank clanks clashed clashes clashing clasps classed classy clauses cleaner cleanse cleansed cleansing cleared clearing clearings clears cleats cleaved cleaver cleaving clinching clinked clinking clinks clocked clocking clocks clod clones closet closeting closets clothe clothed cloths clover cloves clucked clucking clucks coarse coast coasting coasts coat coated coating coats cocked cocking codded codding cods coffer coffers coked coking colds collating collection collections collective collector collectors colons coloureds combing comet comets comings commanded commanding commenced commences commencing commend commended commending commends committed committing communing commuter commuters commuting compacted compacter compacting companion companions compasses compelled compelling compete competed competes competing compilers completely completer completest completion complexes complying composers composted composting compute computed computerise computes computing conceited concerted concerting concocted concocting conducted conducting confining congested congesting congratulating connection connections connective connector connectors connoting cons consented consenting consoled contacted contacting contained containing contended contending contented contenting contested contesting continual continuity continuous continuum contracts contrasts contrives controlled converted converting convicted convicting convinced convinces convincing cooed cooing cooker cooled coolers cooling cools cooped cooper cooping coos coping corded cording coring corked corking corrected correcter correcting correctly corrector corrects corseting costings costuming cots counties county coursed courser cowing cozy crate crated crates crating creaked creaking creamed creaming crease creased creases creasing creations creatives creatures crediting cremate cremated cremates cremating crested cresting crimes crises crook crooked crooking crooks crushed crushes crushing cubs cues culled culling cums cups curing curried curries currying curse curses cuter cuts czar czars dabbed dabbing damaged dancer dancers danger dangers dank daring daub daubed daubing daubs dawn deals dealt decade decades deceiving decidedly declining decode decoded decodes decoding defeating defecting deflating deflected deflecting deign deigned deigning deigns dejecting delays delegated delegates delegating deletions deliciously delirious demon demons deplete depleted depletes depleting depriving deride derided derides deriding derive derives deriving descriptive descriptor descriptors deserting designated designating designer designers desisting destining detecting detesting dice diced dices diet diets difference differently differing difficulty dike diked dikes dime dimes dine dined diner diners dines dinned dips dire dirt dive dived dives diving doers doles doling domes doming donor donors doped dopes doping dose doses dosing dotes doting dove doves downgraded downgrading downs downy dozes dozing draped draping draughtier drawl drawling drawls dread dreads dreamt dreamy dried dries dripped dripping drivel driveling drivels driver drivers drone droned droning droop drooped drooping droops droppings droves drown drunks drying duded dudes duding dunces dunk duping dyeing earl easing east edict edicts eighteens eighteenth eighth eights elevens emigrated emigrates endearing endings engineers envoys evens exampled exceed exceeding excelled excellence excellently excelling excepting excess excessive excise excised excite excites exclaimed exclaiming excreting excused excuses exited exiting expansive expediencies expediency expelling expels experienced exploited exploiting explosive expressive extensive extremest extremity eyed faced facet facets faeces failings fair falling falter famed familiars farce farces fare fared faring farmer fasted fasten fasts fats fatter fattest faulty favorites favouring favourites fear feast feather feathers featured feeding feelings fees felling fellow fellows felts fending ferreting fester fidgeting fiend fiends fifteens fifteenth filed filet filing filmy findings fined finer fines finessing fining fins firing firmed firming firs firsts fished fisher fishy fist fiver fives flail flailed flailing flails fliers fliest flight flights fling flood floods flour flow foiled foiling follower followers followings fond font foothills ford fore foregoing foresting forfeiting forge forged forger forgers forges forgetting forgiving forgo fork form formed forming fort foster founds fours fourteens fourteenth foxing fractures frail framed framing freed freeing freer frees freezer freezers freighting fried friending frieze friezes fright frighting frights fronts frying fueling fulls fully fund funding furnished furnishes furnishing furthered furthers gamed gamest gating gavel gazetting geeing gent gents gibing gild gilds givens glade glads gland glides glowing gnus goad goat gods goner gong goods goody gores goring gout gown grandfathered grands graphic graphical grave gravy grays greasiest greatness greats greens greys grid grids grin grinning grins groping grounding grounds growl growling growls guests guided guises gutting hacker hags hairy haler haling halted halting halve halving hampering hams handy happenings harden hardening hardier hardiest hardy hared haring harked harking hart harts harvest hash haste hasted hastening hastes hasting hatefully hatred hats hatted hatting haven havens haves hawked hawking haying hays hazing header headers headier heading heady healed healing healthy heaped heaping hearings hearse heartache heartaches hearth hearths hearty heat heated heater heaters heath heating heats heave heavies heaving heir heirs hell hellos helper helpings hems herb herbs herd herds hero herring hickories hided highs hijacking hiking hilt hilts hims hind hint hinting hints hips hiring hiss historian historians hither hiving hoard hoarder hoarse hobbles hocked hocking hoed hoeing hoes holds holed holing homed homey homeys homing hones honesty honing hooped hooping hoot hooter hopped hopping hops hordes horsed hose hoses hosing hospitable hospitalise host hostel hostels housed housework hovels howl hows huger hundreds hundredth hyphening ideal ideals ills imaged impassable imploring importance importantly importing impossibles impossibly improvise improvised improvises improvising incest incite incited incites inciting indicting initialled initialling insider insides insisting instanced instancing instill instilled instilling instills interacted interacts intercept intercepted intercepts interests interject interjected interjects interment interments internals interned interpret interprets intersect intersected intersects inventing inventor inventoried inventors inverting investing investors invoicing joint jointed jointing joints joker jokers joying juiced jumper jumpy juts keeling keening keyboarded killer killings kilned kilning kiting knowingly knowings lacing lades lading ladles lamest laming landing larger larges lashed lashing lass latent latex lathe lather latter launch launchers launches launching laxest laying lazies leading leafing leaking lean leaned leaning leans leaping leases leasing least leaved lefts legged legging lens lesion lesions lessen lessening lessens lest lettering levees levelling levered levering levers licked licking lied lies lighted lighten lightened lightening lighters liken likens liker likest liming linger lining linked linking listed listener listeners listing littering littler liven livens liver livers livest livings loader loaves locked locking lodged lodger lodging loft lofts logger logo loll longed longing longs loomed looming looped looping loose loosed looses loosing loot looted looting loots loping loser losers loss losses lotus louse louses lover lovers lowers lowing lows lugged lugging lunched luncheons lurches lusted lusting lynches maced macing mads maid main mains maker makers manage managed manages mane manes manger mangers mangy manly marches marked marker markers marking marred marries masking massage massaged massages massaging massed masses massing master matched matchless mated mating mats matte matted matters mattes maybes meanings medicates medicinal melt melting mend menu mere meres merged merger mergers mess messed messes messing mete metes meting mien miens mighty miking millions millionth mince minces mined miner mines ministers minks mints minuet minuets minus minuses minuted minuter minutest misled mistaken misted misting mists misused misuses misusing moan moaning moans mobilises mobilizes model models modest moist moister moments monastery monies monkey monkeys mooing mooning moping mosses moth moths mourning mouths mover movers mowing mulch mumps munch mussed musses mussing musts musty mutter named nears needled needling needy nervously nether newsy newt newts nicety niche niece nigh nines nineteens nineteenth notching note nothings noting nuder numbed occasional occasioned oddest odes odor odors officer officers okays ones opener openings oranges originally originals originate others ounce oust outs outsider outsiders outsides overbearing overbears overcoats overeat overeaten overeating overeats overhead overheads overhear overheard overhearing overhears overrated overrating overreact overreacted overreacting overreacts overs overstated overstating overt owns pace paces pacing packed packing paging pail pails paints palace palaces pale pales paling pall palls palm palms pander pandered pandering panders pane panes panicking pans panties paring parity pars parsed parses parsing parson parsons particles partied partly passer passports pasted pastes pasties pasting pasts patent patienter patientest patiently patients pats patties patting paused pauses pausing paving pawing payed payer payers peaces peal peals pear peat pecked pecking peer pelt pelts pends penis peon peons peopled peoples perfected perfecter perfectly perfects perk persona personals pert pest pests pettier pettiest petting petty phoned phoney phoneys phonies photon photons physic physicals physicist physicists physiques pickaxing picket picketing pickled pickling picky pictured pier piked piking pilfering pinked pinking pinks pint pints pioneered pioneering pitting placed placing plaice plaid plain plains planed planet planets planing plank planks plant plants plated plates plating plaything pleas pleased pleases plundered plundering plus plying poet poets pokers policed policies policy polishing polite ponderous ported porting posed posing possibles possibly poster posturing potion potions pots potted pottering potting pout pouted pouting pouts powder powdered powdering powders powerfully practical practicals practise practised practises practising pray prayed prayer prayers praying prays preceding prefacing prefect preferred preferring prefixing premiered premiering premising preparing preserved preserving presiding pressings pressured pressures pressuring presuming prettied pretties priced prick pricked pricking prickling pricks prides pries primes prince princes prints prises prized probable probables processed processes processing processional processionals prod professed professes professing profession professionally professionals professions proffered proffering programme programmed programmer programmes projected projector projectors prospects protect protects provably prying publisher publishers puking punctures punishing punt punting punts purpler purples pusses putt puttering putts puttying puzzled questioned queued quiets quit racking raging rags raided raiding railed railing rainy raised raising raking rally rams rang rant raping raps rared rarer rares raring rash rasp rated rating ratings rationing rats raving ravings rays razing reacted reacting readings readying realm reals realty reaming reaping rearing rebind rebinding rebinds receipted receipting receiver receivers receptive recessing reclining recoiling recorder recorders recordings recouping recurring redo redressed redresses redressing reds reed reelected reelecting reflected reflecting reforming refunding regaining regal regard regarding regards registrar registrars regressed regresses regressing rehashing reined reining rejecting relapsing related relates relating relayed relaying releasing relenting relied relies relieving reloading rely relying remainder remaining reminder reminders remitting rend rending rented renting repaying repeating repelling repenting replacing replay repleting reportedly reporter reporters repressed represses repressing reproving repulsing requested rereading rerouting rescinded rescinding resent resenting resents reserving resetting resisting resistors resort resorted resorting resorts respective restoring resulting retaining retard retarding retards retched retches retching retirement retirements retort retorted retorting retorts reverting revolting rewarding rewind riced riches ricing rights roaches rods roomy rued rues ruin ruined ruing ruining ruins ruled ruler rulers ruling rune runes rung rungs runt runts rusted rusting sacred sailed sailing salt salve salved salves salving sames sample sand sanding sands sangs saver savings sawing saws sayings scaled scare scares scarfed scaring scarred scent schooling scold scooting scoots scoped scoping scorching scored scores scramming scream screamed screaming screams scuffs scythed seal sealing seals seam seamed seaming seams sear seared searing sears seat seats seconding secrete secretes sect sects seed seeding seeds seek seeking seeks seem seeming seems seep seeping seeps seer semen sensing serve served serves setting sevens seventeens seventeenth seventh seventies sever severs sewing sexes sexing shaded shades shading shadowing shafts shakes shaking shame shamed shames shaming shammed shamming shaped shapes shaping sharked sharking sharks sharped sharping sharps shave shaved shaves shaving sheared shearing shed sheen shell shelling shells shes shied shifty shingling shirts shoeing shone shoo shooed shooing shoos shopped shopping shore shored shores shoring shorted shorten shorting shorts shots shout shouting shouts shove shoved shoves shoving shower showering showings showy shred shun shuns shunt shuts shying sicks sided siding sidle sidles sift sifting sifts sighed sighing signaling signer sill sills silt silting silts simile similes simpler simplex simply sine singe singed singeing singes singling sinking sinned sinning sins siring sited sitter sitters situating sixteens sixteenth sizing skimming skit skits skulls skying slammed slamming slang slat slave slaved slaves slaving slay slaying slays sleeking sleeks sleeting sleets slick slide slides slimming sling slinging slings slit slits slitting sloped sloping slopped slopping slowed slowing slows slung smalls smarted smarting smarts smell smelliest smelling smells smite smites smiting smoothing snag snared snares snaring snatching sneaking sneaks snide snores snowed snowing snuffs snug soared soaring soiled soiling solder solders soldiered soled solid solider someones somethings sometime soot sopped sopping sops sore sores sort soup sourced sources sowed sowing sown sows spaced spacing spaded spading spared spares sparing spas spasm spasms spat spay spayed spaying spays spearing spears specking specks sped speeding speeds spell spelling spellings spells spills spinsters spit spite spites spiting spits spitting splitting spokes spoon spores spreading springing spun spying squeaking staged staging staid staked staking staled staling stanching standings star starch starched starches starching stared stares staring starred starring stars starter startled startling starved starving stated stating stave staved staves staving steadying steaks steam steamed steaming steams steeping steeps stepped stepping stick stiffs stills sting stinging stings stoked stokes stoking stoles stomp stomped stomping stomps stoned stones stoning stoop stooped stooping stoops stopper stoppered stoppering stored storey storeys storing storks stormiest storms stormy stoves stowed stowing strand stranding strands stranger strangers strangest strapping stray strayed straying strays streak streaked streaking streaks streamer streamers streamline stressing string stringent stringier stringiest stringing stripping strumming strung stud studded studding studios stuffy stun stung stuns stupids sturdiest sturdy suave subscript subscripts sued sues suing suit suite suites suiting suits sundae sundry sunk superb supers supper supporter supporters supportive supposing surer surge suspending swamp swarm swat sway swayed swaying sways swears sweeping sweepings sweeps sweets swell swelling swellings swells swifts swills swing swinging swings swiping swoon swung syringing tabled tablet tablets tacked tacking taker takers tale tales talker tally taming tanked tanking tans taping tasked tasking tasted tasting taxing teachings teak teaks tear tears tease teat teats teen televising tend tens tent tented tenting tester testes testis texturing thatching thee theme themes theses thin thinning thins thirst thirsts thirteens thirteenth thongs thorough thoughts thousands thousandth threes thrust thrusting thrusts tied ties tilling tills timed timer timers ting tings tips tire tires tolling tomorrows toot tough towelling toying trailed trainer trainers trampling transacted transacting transaction transactions transited transiting transition transitions translator translators transplanted transplanting traveler travelers travelings travelled traveller travelling travellings traversed traversing trawler trawlers tray treachery tree trenching tribes trill tripe tripos trough troweling truanting truce trued truer trues truest truing trustee trusty tuned tuning turfed turfing turner twelves twinkling twos tying typed understandings understate understated understates understating undertook unload unloaded unloading unloads unlock unlocked unlocking unlocks unusually upgrading upholding upsets urns uselessly user users vacationed variation variations vary veer vexations vial vice vices vied vies visa visioning vocation vocations voiced void voids wading wads wafers wafted wafting wagers waging wags wailed wailing waist waists waiter waiters waived waiving waked waken wakens walker walled walling waned waning wantoning wars wary washer washers washings wasp wasted wastes wasting watery wavers waving wavy waxing waxy weaken weakly wealthier weaning weary wearying weathered weaver weaving weekended weer wees welcomed welcomes welling wells whatsoever wheat whens whereas whiled whiles whining whinnying whiten whiter whites whoa wholes whore whores whys widow widows width willingly wills wilting wincing wind winding winds wine wines wing winging wings wink winking winks winnings wiping wiring wished wishes wishing witch witched witches witching wits woks wonderfully worded wording wordy worker workings wormed worming worsen worsts worthy woulds wows wreak writ writer writers writhe writhes writhing writings writs wrongs yearn yearns yellows yelp yens yesterdays yeti yews youngster yous'/*END*/;
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

  /* Common grammar slips: "to by a phone", "better then", "its fun", "your welcome", "could of". */
  function contextFix(toks, fixes) {
    for (let i = 0; i < toks.length; i++) {
      const t = toks[i], prev = toks[i - 1], next = toks[i + 1], next2 = toks[i + 2];
      if (!t || t.punct || t.arabic || t.keep) continue;
      const nw = next && !next.punct ? next.w : null;
      const set = (to) => { fixes.push({ from: t.o, to }); toks.splice(i, 1, ...expandTokens(tokenize(to))); };
      if (t.w === 'by' && prev && prev.w === 'to' && nw && (DET[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw) || ADJS[nw] || nw === 'it' || nw === 'them')) set('buy');
      else if (t.w === 'then' && prev && (/^(more|less|better|worse)$/.test(prev.w) || (ADJS[prev.w] && /er$/.test(prev.w)))) set('than');
      else if (t.w === 'its' && nw && ((ADJS[nw] && !(next2 && NOUN_FORM.has(next2.w))) || ['a', 'an', 'the', 'not', 'very', 'so', 'too', 'really', 'ok', 'okay', 'my', 'your', 'time'].includes(nw) || (verbInfo(nw) || []).some((r) => r.form === 'ing'))) set('it is');
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
    if (p === '1s') f = /^a/.test(st) ? st : 'a' + st;
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
    else a = joinH(stem, SUF_AZ[p]);
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
    const re = /\[[^\]\n]*\]|[؀-ۿ]+|[A-Za-z0-9À-ɏ]+(?:['’][A-Za-z]+)*|[.!?]+|[,;:…]|[^\sA-Za-z0-9؀-ۿ]/g;
    let m;
    while ((m = re.exec(s))) out.push(m[0]);
    return out;
  }
  function expandTokens(raw) {
    const out = [];
    for (const o of raw) {
      if (/^\[[^\]]*\]$/.test(o)) { const inner = o.slice(1, -1).trim(); if (inner) out.push({ w: inner.toLowerCase(), o: inner, keep: true }); continue; }
      if (/^[؀-ۿ]+$/.test(o)) { out.push({ w: o, o, arabic: true }); continue; }
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
      if (t.arabic) { items.push({ t: 'arabic', s: t.o }); i++; continue; }
      if (t.posss) { items.push({ t: 'posss' }); i++; continue; }
      const t1 = toks[i + 1], t2 = toks[i + 2];
      const plain = (x) => !!x && !x.punct && !x.keep && !x.arabic;
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
        if (fx && (n >= 2 || !['please', 'sure', 'no', 'brother', 'like'].includes(key) || isFixedAlone(key, toks, i)) && fixedFits(key, toks, i, n)) {
          const v = fx[ctx.addr] || fx.m;
          items.push({ t: 'fixed', az: v[0], ar: v[1], key, forEnd: / for$/.test(key) }); i += n; matched = true; break;
        }
      }
      if (matched) continue;
      // phrasal verbs: wake up, turn off...
      const ph = PHRASAL.get(t.w);
      if (ph && toks[i + 1]) {
        const hit = ph.find((r) => r.particle === toks[i + 1].w || (r.particle.includes(' ') && toks.slice(i + 1, i + 1 + r.particle.split(' ').length).map((x) => x.w).join(' ') === r.particle));
        if (hit) { items.push({ t: 'verb', key: hit.key, form: hit.form, o: t.o }); i += 1 + hit.particle.split(' ').length; continue; }
      }
      items.push({ t: 'word', w: t.w, o: t.o });
      i++;
    }
    return tag(items);
  }
  const DO_FORMS = { do: 'base', does: 's', did: 'past', doing: 'ing', done: 'pp' };
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
    if (key === 'no') return !next || next.punct || !(NOUN_FORM.has(next.w) || ADJS[next.w]);
    if (key === 'sure') return (!next || !!next.punct) && startish(toks, i);
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
  const QUANT_W = { many: 'wayed', much: 'wayed', several: 'kam', few: 'kam' };
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
      (PRON_SUBJ[nw] || nw === 'you' || nw === 'it' || DET[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw))) return { t: 'conj', w: 'that', az: '', ar: '' };
    // it keeps crashing → ya6'all y6ee7
    if (KEEP_FORMS[w] && nextRaw && nextRaw.t === 'word' && (verbInfo(nextRaw.w) || []).some((r) => r.form === 'ing')) return { t: 'modal', m: 'keep', w, past: w === 'kept' };
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
    if (NUMS[w] && !(w === 'one' && prevIs(prev, 'det'))) return Object.assign({ t: 'num' }, NUMS[w]);
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
      if (prev && prev.t === 'verb' && nw && (MODAL[nw] || (AUX.has(nw) && !['be', 'been', 'being'].includes(nw)))) return { t: 'pron', w, role: 'subj' };
      return { t: 'pron', w, role: prevIs(prev, 'verb', 'prep', 'pron') && !(prev.t === 'pron') ? 'obj' : 'any' };
    }
    if (PRON_OWN[w]) return { t: 'own', w };
    if (w === 'that' && prev && prev.t === 'verb' && THAT_VERBS.has(prev.key) && nw && (PRON_SUBJ[nw] || DET[nw] || NOUN_FORM.has(nw))) return { t: 'conj', w: 'that', az: '', ar: '' };
    if (DEM[w]) return nw && (isNounish(nw) || (nextIsNounish && nextRaw && nextRaw.t === 'word' && !(nn && (verbInfo(nn) || AUX.has(nn))))) && !(prevIs(prev, 'aux') && !NOUN_FORM.has(nw) && ADJS[nw]) ? { t: 'det', w: DET[w] } : { t: 'dem', w };
    if (w === 'there' && nw && ['is', 'are', 'was', 'were', 'will', 'has', 'have'].includes(nw)) return { t: 'there' };
    if (w === 'have' || w === 'has' || w === 'had') {
      if (perfectAhead(ahead, clauseStart(prev) || (prev && prev.t === 'wh'))) return { t: 'aux', w };
      return { t: 'verb', key: 'have', form: w === 'had' ? 'past' : w === 'has' ? 's' : 'base', o };
    }
    if (w === 'do' || w === 'does' || w === 'did') {
      const qStart = clauseStart(prev) || (prev && prev.t === 'wh');
      let npThenVerb = false;
      if (qStart && nw && (DET[nw] || DEM[nw] || PRON_POSS[nw] || NOUN_FORM.has(nw))) {
        const k = ahead.findIndex((x, j) => j >= 1 && isVerbBase(x));
        if (k >= 1) { const b = ahead[k - 1]; npThenVerb = !(DET[b] && !DEM[b]) && !PRON_POSS[b]; }
        if (k === 1 && DEM[ahead[0]] && !NOUN_FORM.has(ahead[1])) npThenVerb = true;
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
      const ingOrPp = vf.find((r) => r.form === 'ing') || (af ? null : vf.find((r) => r.form === 'pp'));
      if (ingOrPp) return { t: 'verb', key: ingOrPp.key, form: ingOrPp.form, o };
    }
    if (af && (afterBe || (forcesNoun && nw && NOUN_FORM.has(nw)) || (!vf && !nf) || (nf && nw && NOUN_FORM.has(nw) && !forcesVerb && af))) {
      if (!(nf && forcesNoun && !(nw && NOUN_FORM.has(nw)))) return { t: 'adj', key: w };
    }
    if (vf && forcesVerb) return pickVerb(vf, prev, o);
    if (nf && forcesNoun) return { t: 'noun', key: nf.key, pl: nf.pl, o };
    if (vf && clauseStart(prev) && (vf.some((r) => r.form === 'base') && (!nw || PRON_OBJ[nw] || DET[nw] || PRON_POSS[nw] || nw === 'it' || NOUN_FORM.has(nw) || ADV[nw] || PREP[nw] || (nextRaw && nextRaw.t === 'punct')))) return pickVerb(vf, prev, o, true);
    if (vf && prev && (prev.t === 'noun' || prev.t === 'dem') && vf.some((r) => r.form === 'past' || r.form === 's')) return pickVerb(vf, prev, o);
    if (vf && prev && prev.t === 'verb' && (vf.some((r) => r.form === 'ing') || (!nf && vf.some((r) => r.form === 'base') && ['go', 'come', 'help', 'let', 'make'].includes(prev.key)))) return pickVerb(vf, prev, o);
    if (vf && prev && (prev.t === 'adv' || prev.t === 'fixed') && vf.some((r) => r.form === 'ing')) return pickVerb(vf, prev, o);
    if (nf) return { t: 'noun', key: nf.key, pl: nf.pl, o };
    if (af) return { t: 'adj', key: w };
    if (adv) return Object.assign({ t: 'adv' }, adv);
    if (vf) return pickVerb(vf, prev, o);
    if (FIXED.has(w)) { const v = FIXED.get(w); return { t: 'fixed', az: v.m[0], ar: v.m[1] }; }
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
      if (it.t === 'adv' && it.int && empty) { np.ints++; continue; }
      if (it.t === 'adj' && empty) { np.adjs.push(it); continue; }
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
      if (isNPStart(items, i)) { const r = readNP(items, i); C.push(r.chunk); i = r.end; continue; }
      if (it.t === 'verb' && it.form === 'ing' && (i === 0 || ['punct', 'conj'].includes(items[i - 1].t)) && VERBS[it.key] && VERBS[it.key].ms) {
        const pp = { k: 'PP', key: null, eng: null, obj: null };
        const j = readIng(items, i, pp);
        const nx = items[j];
        if (nx && (nx.t === 'aux' || nx.t === 'modal' || (nx.t === 'verb' && nx.form !== 'ing'))) { C.push({ k: 'GER', ing: pp.ing }); i = j; continue; }
      }
      if (it.t === 'rel') { C.push({ k: 'REL', w: it.w }); i++; continue; }
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
        if (nx && (nx.t === 'pron' || nx.t === 'dem')) { pp.obj = nx.t === 'pron' ? { k: 'PRON', w: nx.w, role: 'obj' } : { k: 'DEM', w: nx.w }; C.push(pp); i += 2; continue; }
        if (nx && nx.t === 'unk') { pp.obj = { k: 'UNK', it: nx }; C.push(pp); i += 2; continue; }
        if (nx && nx.t === 'verb' && nx.form === 'ing') { i = readIng(items, i + 1, pp); C.push(pp); continue; }
        if (nx && nx.t === 'fixed') { pp.obj = { k: 'FIXED', it: nx }; C.push(pp); i += 2; continue; }
        C.push(pp); i++; continue;
      }
      if (it.t === 'adj' || (it.t === 'adv' && it.int && items[i + 1] && items[i + 1].t === 'adj')) {
        const adjp = { k: 'ADJP', ints: 0, adjs: [] };
        while (items[i] && (items[i].t === 'adj' || (items[i].t === 'adv' && items[i].int))) { if (items[i].t === 'adj') adjp.adjs.push(items[i]); else adjp.ints++; i++; }
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
    const def = ['def', 'this', 'that', 'all'].includes(np.det) || !!np.poss || !!np.owner || !!opts.generic;
    const q = np.quant || (np.det === 'some' ? (info.pl ? 'kam' : 'shwayya') : np.det === 'more' ? (np.num ? 'ba3ad' : 'akthar') : np.det === 'enough' ? 'kifaaya' : null);
    const n = np.num ? np.num.n : 0;
    const forceSg = q === 'kam' || q === 'cham' || np.det === 'every' || n === 1 || n >= 11;
    const pre = np.adjs.filter((a) => ADJS[a.key].pre);
    const post = np.adjs.filter((a) => !ADJS[a.key].pre);
    if (q === 'wayed') out.push(piece('wayed', 'وايد'));
    else if (q === 'shwayya') out.push(piece('shwayya', 'شوية'));
    else if (q === 'kam') out.push(piece('kam', 'كم'));
    else if (q === 'cham') out.push(piece('cham', 'چم'));
    if (np.det === 'every' || np.det === 'all') out.push(piece('kil', 'كل'));
    else if (np.det === 'any') out.push(piece('ay', 'أي'));
    else if (np.det === 'which') out.push(piece('ay', 'أي'));
    else if (np.det === 'no') out.push(piece('wala', 'ولا'));
    else if (np.det === 'another') out.push(piece('thaani', 'ثاني'));
    const known = !head.unk && !head.user;
    const useDual = known && n === 2 && !np.poss;
    if (np.num && !useDual && n !== 1) {
      const cons = np.num.cons && known;
      out.push(piece(cons ? np.num.cons[0] : np.num.az, cons ? np.num.cons[1] : np.num.ar, { num: true }));
    }
    for (const a of pre) { const f = adjForm(a.key, 'm'); out.push(piece(f[0], f[1])); }
    if (!known) {
      if (np.det === 'this' && !head.user) out.push(piece('hal', 'هال'));
      else if (np.det === 'that' && !head.user) out.push(piece('hadhaak', 'هذاك'));
      out.push(head.user ? piece(head.user.az, head.user.ar, { user: true }) : piece(head.unk, head.unk, { known: false, unk: true }));
      if (np.poss) { const p = resolveP(PRON_POSS[np.poss], ctx.addr); out.push(piece('maal' + SUF_AZ[p], 'مال' + SUF_AR[p])); }
      for (const a of post) { const f = adjForm(a.key, 'm'); out.push(piece(f[0], f[1])); }
      return { pieces: out, info };
    }
    const N = NOUNS[head.key];
    const usePl = info.pl && !forceSg;
    let az = usePl ? N.azPl : N.az, ar = usePl ? N.arPl : N.ar;
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
    if (mods.length || np.owner) { [az, ar] = construct(az, ar); }
    else if (np.poss && pre.length && !defNoun) {
      const p = resolveP(PRON_POSS[np.poss], ctx.addr);
      tail = N.human ? prepPron('3ind', p) : possess('7ag', 'حق', p);
      possDone = true;
    } else if (np.poss && (N.loan || (/i$/.test(N.az) && /ي$/.test(N.ar) && !usePl)) && !POSS_OV[head.key + ':' + resolveP(PRON_POSS[np.poss], ctx.addr)]) {
      const p = resolveP(PRON_POSS[np.poss], ctx.addr);
      az = 'il-' + az; ar = 'ال' + ar;
      tail = ['maal' + SUF_AZ[p], 'مال' + SUF_AR[p]];
      possDone = true;
    } else if (np.poss) {
      const p = resolveP(PRON_POSS[np.poss], ctx.addr);
      const ov = POSS_OV[head.key + ':' + p];
      if (ov && !usePl) [az, ar] = ov; else [az, ar] = possess(az, ar, p);
      possDone = true;
    } else if (np.det === 'this') { az = 'hal ' + az; ar = 'هال' + ar; }
    else if (np.det === 'that') { out.push(info.feat === 'f' ? piece('hadhich', 'هذيج') : info.feat === 'pl' ? piece('hadhelaak', 'هذيلاك') : piece('hadhaak', 'هذاك')); az = 'il-' + az; ar = 'ال' + ar; }
    else if ((def && !pre.length) || defNoun) { az = 'il-' + az; ar = 'ال' + ar; }
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
      if (a.key === 'free' && !info.human && !TIME_NOUNS.has(head.key) && head.key !== 'weekend') { out.push(piece('balaash', 'بلاش')); continue; }
      out.push(piece((adjDef ? 'il-' : '') + f[0], (adjDef ? 'ال' : '') + f[1]));
    }
    if (np.ints && post.length) out.push(piece('wayed', 'وايد'));
    if (n === 1 && np.num.az === 'wa7id') out.push(N.g === 'f' ? piece('wa7da', 'وحدة') : piece('wa7id', 'واحد'));
    if (tail) out.push(piece(tail[0], tail[1]));
    if (q === 'akthar') out.push(piece('akthar', 'أكثر'));
    if (q === 'ba3ad') out.push(piece('ba3ad', 'بعد'));
    if (q === 'kifaaya') out.push(piece('kifaaya', 'كفاية'));
    return { pieces: out, info };
  }
  function renderADJP(c, feat, opts) {
    const out = [];
    for (const a of c.adjs) {
      const f = adjForm(a.key, feat || 'm');
      if (a.key === 'free' && opts && opts.thing) out.push(piece('balaash', 'بلاش'));
      else if (a.key === 'dead' && opts && opts.thing) out.push(piece(...[['6aafi', 'طافي'], ['6aafya', 'طافية'], ['6aafyeen', 'طافيين']][feat === 'f' ? 1 : feat === 'pl' ? 2 : 0]));
      else if (a.key === 'sad' && opts && opts.thing) out.push(piece(...(feat === 'f' ? ['t7azzin', 'تحزن'] : ['y7azzin', 'يحزن'])));
      else if (a.key === 'full' && opts && opts.thing === false) out.push(piece(...[['shab3aan', 'شبعان'], ['shab3aana', 'شبعانة'], ['shab3aaneen', 'شبعانين']][feat === 'f' ? 1 : feat === 'pl' ? 2 : 0]));
      else out.push(piece(f[0], f[1]));
    }
    if (c.det === 'def' && out[0] && !/^il-/.test(out[0].az)) out[0] = piece('il-' + out[0].az, 'ال' + out[0].ar);
    if (c.ints) out.push(piece('wayed', 'وايد'));
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
    return key;
  }
  function renderPP(c, ctx, verbKey, p, gapP) {
    const V = verbKey ? VERBS[verbKey] : null;
    let key = prepKeyFor(c, V);
    const eng = c.eng;
    const timeObj = c.obj && c.obj.k === 'NP' && TIME_NOUNS.has(headKey(c.obj)) && !c.obj.poss && (!c.obj.det || c.obj.det === 'indef' || c.obj.det === 'few');
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
      pushVerb(mainForm(verbP));
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
    const subjLike = (c) => c && (c.k === 'NP' || c.k === 'DEM' || c.k === 'THERE' || c.k === 'CSUBJ' || c.k === 'GER' || c.k === 'IND' || (c.k === 'PRON' && c.role !== 'obj' && c.role !== 'poss'));
    const objPron = (c) => c && c.k === 'PRON' && c.role !== 'subj' && c.role !== 'poss';
    for (let i = 0; i < chunks.length; i++) {
      const c = chunks[i], next = chunks[i + 1], prevC = chunks[i - 1];
      if (c.k === 'VG') {
        const a = analyze(c.parts);
        if (!cur.vg && !cur.aux && !a.main && !c.toInf && subjLike(next) && !cur.subj) { cur.aux = c; continue; }
        if (!cur.vg) {
          if (cur.aux) c.parts = cur.aux.parts.concat(c.parts);
          cur.vg = c;
          continue;
        }
        const finite = c.parts[0] && (c.parts[0].t === 'aux' || c.parts[0].t === 'modal');   // "the bot i made | is fast"
        const adjacent = !finite && (prevC === cur.vg || (prevC && prevC.k === 'TO') ||
          (objPron(prevC) && chunks[i - 2] === cur.vg && !a.hasAux && a.main && a.main.form === 'base'));
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
      if (subjLike(c) && next && next.k === 'VG' && !next.toInf && !(c.k === 'PRON' && c.role === 'obj')) {
        // everyone who plays this game | knows that: the noun belongs to "plays"
        if (opts.relSubjGap && !segs.length && cur.vg && !cur.subj && (c.k === 'NP' || c.k === 'IND' || c.k === 'DEM')) {
          const m = cur.vg.parts.find((x) => x.t === 'verb');
          if (m && !THAT_VERBS.has(m.key)) { cur.rest.push(c); continue; }
        }
        if (cur.vg || cur.subj) { segs.push(cur); cur = { pre: [], subj: c, aux: null, vg: null, rest: [], split: true }; continue; }
        cur.subj = c; continue;
      }
      if (subjLike(c) && cur.aux && !cur.subj && !cur.vg) { cur.subj = c; cur.inverted = true; continue; }
      if (!cur.vg && !cur.aux) cur.pre.push(c); else cur.rest.push(c);
    }
    if (cur.aux && !cur.vg) { cur.vg = cur.aux; }
    segs.push(cur);
    return segs;
  }

  function simplePieces(c, ctx) {
    switch (c.k) {
      case 'FIXED': return [piece(c.it.az, c.it.ar, c.it.user ? { user: true } : {})];
      case 'ADV': return c.it.please ? [piece(...A3resolve(FIXED.get('please'), ctx))] : c.it.az ? [piece(c.it.az, c.it.ar)] : [];
      case 'WH': return [piece(WH[c.it.w][0], WH[c.it.w][1])];
      case 'UNK': return [unkPiece(c.it)];
      case 'NUM': return [piece(c.it.az, c.it.ar, { num: true })];
      case 'ARABIC': return [piece(c.it.s, c.it.s, { known: true, raw: true })];
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
      if (seg.subj) out.push(...renderAny(seg.subj, ctx, { generic: isBare(seg.subj) }).pieces);
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
    const leadVerb = !p && !seg.subj && onlyLeadIns && !seg.vg.toInf;
    const imperative = leadVerb && a.main && ((a.main.form === 'base' && !a.hasAux) || (a.hasAux && !a.modal && a.neg && a.doAux && !a.be) || (a.modal === 'keep' && !a.will));
    const imperativeBe = leadVerb && !a.main && a.bePlain && !a.modal && (!a.hasAux || a.doAux || a.bePlain);
    if (!p) { p = st.p || (a.main && !a.beOnly ? '1s' : '3m'); feat = st.feat || FEAT[p]; }

    // "no" in front of the first noun: there is no problem → ma fi mushkila
    const firstRest = seg.rest[0];
    if (firstRest && firstRest.k === 'NP' && firstRest.det === 'no' && !a.neg) {
      a.neg = true;
      seg.rest[0] = Object.assign({}, firstRest, { det: subjKind === 'there' || (a.main && a.main.key === 'have') ? null : 'any' });
    }
    // i don't know anyone → ma a3arf a7ad; i asked him to help me → 6alabt minnah ysaa3idni
    if (a.main && a.main.key === 'know') {
      const o1 = seg.rest[0];
      const person = o1 && ((o1.k === 'IND' && /one|body/.test(o1.it.key)) || (o1.k === 'NP' && npInfo(o1).human) || (o1.k === 'PRON' && o1.w !== 'it' && o1.role !== 'subj'));
      if (person) a.main = Object.assign({}, a.main, { key: 'know_p' });
    }
    if (a.main && a.main.key === 'ask' && seg.rest.some((c) => c.k === 'VG2' && c.c.toInf) && seg.rest[0] && (seg.rest[0].k === 'PRON' || seg.rest[0].k === 'NP')) a.main = Object.assign({}, a.main, { key: 'ask_to' });
    const obj0 = seg.rest.find((c) => ['NP', 'PRON', 'DEM', 'IND', 'UNK', 'FIXED', 'OWN'].includes(c.k));
    if (obj0 && obj0.k === 'IND' && ['nothing', 'nobody', 'no one'].includes(obj0.it.key) && !a.neg && (a.main || subjKind === 'there')) {
      a.neg = true;
      const k = seg.rest.indexOf(obj0);
      seg.rest[k] = { k: 'IND', it: obj0.it.key === 'nothing' ? { az: 'shay', ar: 'شي', key: 'anything' } : { az: 'a7ad', ar: 'أحد', key: 'anyone' } };
    }
    if (a.main && a.main.key === 'save' && obj0 && obj0.k === 'NP' && ['money', 'gold', 'coin', 'time'].includes(headKey(obj0))) a.main = Object.assign({}, a.main, { key: 'save_t' });
    if (a.main && a.main.key === 'run' && obj0 && obj0.k === 'NP' && ['program', 'app', 'game', 'bot', 'script', 'code', 'file', 'computer', 'server', 'plugin', 'engine'].includes(headKey(obj0))) a.main = Object.assign({}, a.main, { key: 'turn on' });
    if (a.main && a.main.key === 'fail' && obj0 && obj0.k === 'NP' && ['test', 'lesson', 'class'].includes(headKey(obj0))) a.main = Object.assign({}, a.main, { key: 'fail_exam' });
    if (a.main && a.main.key === 'meet' && !obj0) a.main = Object.assign({}, a.main, { key: 'meet_r' });
    // i'm streaming tonight → basawi stream il-laila
    if (a.main && a.prog && a.tense === 'present' && !VERBS[a.main.key].ap && seg.rest.some(isFutureTime)) Object.assign(a, { prog: false, tense: 'future' });
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
      for (const c of seg.rest) {
        if (c.k === 'VG2') { out.push(...renderVG(Object.assign({}, analyze(c.c.parts), { tense: 'present' }), '1p', ctx, {}).pieces); continue; }
        out.push(...renderRest(c, ctx, st, null, '3m').pieces);
      }
      st.tense = t; st.imp = false;
      return out;
    }
    // subject noun phrase comes first (questions with was/will: verb first)
    const npLate = seg.inverted && a.beOnly && !a.main && a.tense !== 'present' && subjKind === 'np';
    if (subjKind === 'np' && !npLate) out.push(...renderNP(seg.subj, ctx, { generic: isBare(seg.subj) }).pieces);
    if (subjKind === 'ind') out.push(piece(seg.subj.it.az, seg.subj.it.ar));
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
      const yearsComp = subjKind === 'pron' && firstNP && headKey(firstNP) === 'year';
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
        if (helper || a.modal === 'must' || a.modal === 'maybe') {
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
          else if (subjKind === 'pron' && !hasStill) out.push(...(yearsComp ? [piece(...umr(p))] : renderAny(seg.subj, ctx).pieces));
          presentNeg = a.neg;
        }
        out.push(...midPieces(a.mids, p));
        if (presentNeg) out.push(piece('mob', 'مب'));
        if (npLate) out.push(...renderNP(seg.subj, ctx, { generic: isBare(seg.subj) }).pieces);
      }
      let lastAdj = null;
      for (const c of comp) {
        if (c.k === 'ADJP') { out.push(...renderADJP(c, feat, { thing })); lastAdj = c.adjs[c.adjs.length - 1].key; continue; }
        if (c.k === 'VG2') {
          const a2 = analyze(c.c.parts);
          const owner = seg.subj && seg.subj.k === 'NP' && seg.subj.poss ? resolveP(PRON_POSS[seg.subj.poss], ctx.addr) : subjKind === 'it' ? resolveP('2', ctx.addr) : p;
          out.push(...renderVG(Object.assign({}, a2, { tense: 'present' }), owner, ctx, {}).pieces);
          continue;
        }
        if (c.k === 'PP' && lastAdj && ADJ_PREP[lastAdj] && ADJ_PREP[lastAdj][c.eng] !== undefined) {
          const k2 = ADJ_PREP[lastAdj][c.eng];
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
    if (a.main && !imperative && (a.main.key === 'look' || a.main.key === 'feel') && r0 && (r0.k === 'ADJP' || (r0.k === 'PP' && r0.eng === 'like'))) {
      out.push(...midPieces(a.mids, p));
      if (a.main.key === 'look') {
        if (a.tense === 'past') out.push(piece(a.neg ? 'ma kaan' : 'kaan', a.neg ? 'ما كان' : 'كان'));
        const sh = possess('shakl', 'شكل', p);
        out.push(piece(sh[0], sh[1]));
        if (a.neg && a.tense !== 'past') out.push(piece('mob', 'مب'));
      } else {
        const rv = renderVG(Object.assign({}, a, { mids: [] }, a.tense === 'present' ? { prog: false } : {}), p, ctx, {});
        out.push(...rv.pieces);
        const h = possess('7aal', 'حال', p);
        out.push(piece(h[0], h[1]));
      }
      for (const c of seg.rest) out.push(...(c.k === 'ADJP' ? renderADJP(c, feat, { thing }) : renderRest(c, ctx, st, null, p).pieces));
      st.p = p; st.feat = feat; st.tense = a.tense; st.imp = false;
      return out;
    }

    // it took me two months → 5ath minni shahrain
    if (a.main && a.main.key === 'take' && subjKind === 'it' && seg.rest[0] && seg.rest[0].k === 'PRON' && seg.rest[1] && seg.rest[1].k === 'NP' && TIME_NOUNS.has(headKey(seg.rest[1]))) {
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
      r = renderVG(a, verbP, ctx, { imperative, pronSubj: subjKind === 'pron', thing: thing && subjKind !== 'dem' });
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
          if (V.obj) { const q = prepPron(V.obj, op); out.push(piece(q[0], q[1])); }
          else if (V.io && nextC && (nextC.k === 'NP' || nextC.k === 'DEM')) { const q = prepPron(V.io, op); out.push(piece(q[0], q[1])); }
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
        if (a2.main && a2.main.key === 'like' && V && ['forget', 'remember'].includes(V.key) && nx && nx.k === 'NP' && ['video', 'picture', 'comment', 'stream', 'channel'].includes(headKey(nx))) a2.main = Object.assign({}, a2.main, { key: 'like_yt' });
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
    st.tense = a.tense === 'future' ? 'future' : a.tense;
    return out;
  }
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
    markReducedRelatives(chunks);
    frontStrandedPreps(chunks);
    for (let i = 0; i + 1 < chunks.length; i++) {
      if ((chunks[i].k === 'NP' || chunks[i].k === 'NUM') && chunks[i + 1].k === 'ADV' && chunks[i + 1].it.k === 'ago') { const x = chunks[i]; chunks[i] = chunks[i + 1]; chunks[i + 1] = x; i++; }
    }
    // "yes, ...", "hey bro, ...", "thanks, ...": a comma after the opening word
    let lead = 0;
    while (lead < chunks.length && isLeadWord(chunks[lead])) lead++;
    if (lead > 0) {
      while (lead < chunks.length && isVocative(chunks[lead])) lead++;
      if (chunks[lead] && chunks[lead].k !== 'PUNCT') chunks.splice(lead, 0, { k: 'PUNCT', it: { s: ',' }, auto: true });
    }
    const out = [];
    const st = { p: null, feat: null, tense: 'present', sep: null, subord: false };
    let clause = [];
    let first = true, pendingRel = null;
    const lastIsPunct = () => !out.length || out[out.length - 1].punct;
    const flush = () => {
      const rel = pendingRel;
      pendingRel = null;
      if (!clause.length) return;
      const segs = segment(clause, { relSubjGap: !!rel && clause[0].k === 'VG' });
      segs.forEach((s, i) => {
        if (rel) { if (i === 0) s.rel = rel; else if (rel.subjMain && !s.subj) s.relMain = rel; }
        if (i > 0 && s.split && !s.relMain && !s.embedded && needComma(segs[i - 1]) && !lastIsPunct()) out.push(comma());
        out.push(...renderSegment(s, ctx, st, first && i === 0));
      });
      first = false;
      clause = [];
    };
    for (const c of chunks) {
      if (c.k === 'PUNCT') { flush(); st.sep = /[,;:]/.test(c.it.s) ? 'comma' : null; st.subord = false; out.push({ az: c.it.s, ar: c.it.s, punct: true, known: true }); if (/[.!?]/.test(c.it.s)) { st.p = null; st.feat = null; first = true; } continue; }
      if (c.k === 'CONJ') {
        flush();
        st.sep = 'conj';
        st.subord = SUBORD.has(c.it.az);
        if ((c.it.w === 'but' || c.it.w === 'so') && !lastIsPunct()) out.push(comma());
        out.push(...simplePieces(c, ctx));
        continue;
      }
      if (c.k === 'REL') {
        // the bot that farms gold → il-bot illi yfarrim gold; a bot that farms gold → bot yfarrim gold
        const ante = clause[clause.length - 1];
        const subjMain = !clause.some((x) => x.k === 'VG');
        flush();
        const info = relInfo(ante);
        if (info.def) out.push(piece('illi', 'اللي'));
        pendingRel = { p: info.p, feat: info.feat, human: info.human, subjMain };
        st.sep = 'rel';
        continue;
      }
      clause.push(c);
    }
    flush();
    return out;
  }
  const SUBORD = new Set(['lamma', 'lain', 'awwal ma']);
  function relInfo(c) {
    if (!c) return { p: '3m', feat: 'm', human: false, def: false };
    if (c.k === 'NP') {
      const inf = npInfo(c);
      const sup = c.adjs.some((x) => ADJS[x.key].pre && !ADJS[x.key].defNoun);
      const def = !sup && (['def', 'this', 'that', 'all', 'which'].includes(c.det) || !!c.poss || !!c.owner || c.nouns.some((n) => n.user));
      return { p: inf.p, feat: inf.feat, human: !!inf.human, def };
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
      if (!(B.k === 'PRON' && ['i', 'you', 'he', 'she', 'we', 'they'].includes(B.w) && B.role !== 'obj' && B.role !== 'poss')) continue;
      if (C.k !== 'VG' || C.toInf) continue;
      const a = analyze(C.parts);
      const strandedEnd = D && D.k === 'PP' && !D.obj && !D.ing && (!chunks[i + 4] || chunks[i + 4].k === 'PUNCT' || chunks[i + 4].k === 'CONJ');
      if (!a.main || a.beOnly || (INTRANS.has(a.main.key) && !strandedEnd) || VERBS[a.main.key].special) continue;
      const prevC = chunks[i - 1];
      const afterVerb = !!prevC && (prevC.k === 'VG' || (prevC.k === 'PRON' && prevC.role !== 'subj' && chunks[i - 2] && chunks[i - 2].k === 'VG'));
      const atStart = !prevC || prevC.k === 'PUNCT' || (prevC.k === 'FIXED' && !prevC.it.user);
      if (!afterVerb && !atStart) continue;
      // "when i finish the quest i will ..." is two clauses
      let j = i - 1;
      while (j >= 0 && chunks[j].k !== 'PUNCT' && chunks[j].k !== 'CONJ') j--;
      if (j >= 0 && chunks[j].k === 'CONJ' && chunks[j].it.w !== 'and' && chunks[j].it.w !== 'but' && chunks[j].it.w !== 'or') continue;
      const objAfter = D && (D.k === 'NP' || D.k === 'IND' || D.k === 'DEM' || D.k === 'OWN' || (D.k === 'PRON' && D.role !== 'subj' && D.role !== 'poss'));
      if (objAfter && !TIME_NOUNS.has(headKey(A))) continue;
      if (atStart && !(D && (D.k === 'VG' || D.k === 'PP' || D.k === 'ADV'))) continue;
      chunks.splice(i + 1, 0, { k: 'REL', w: '', reduced: true });
      i += 2;
    }
  }
  /* "what server are you on?" → "3ala ay server inta?" */
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
  function needComma(prev) {
    if (!prev || !prev.vg) return false;
    const a = analyze(prev.vg.parts);
    if (a.main && THAT_VERBS.has(a.main.key)) return false;
    const v2 = prev.rest.filter((c) => c.k === 'VG2').pop();
    if (v2) { const a2 = analyze(v2.c.parts); if (a2.main && THAT_VERBS.has(a2.main.key)) return false; }
    return true;
  }
  const LEAD_FIXED = new Set(['yes', 'yeah', 'yep', 'yup', 'no', 'nope', 'nah', 'ok', 'okay', 'alright', 'all right', 'sure', 'of course',
    'hello', 'hi', 'hey', 'yo', 'hello everyone', 'hi everyone', 'hi all', 'hello guys', 'hi guys', 'hey guys', 'welcome', 'welcome back',
    'wow', 'oh', 'oops', 'ugh', 'lol', 'haha', 'hahaha', 'omg', 'oh my god', 'sorry', 'i am sorry', 'i am so sorry', 'so sorry', 'thank you',
    'thanks', 'thank you very much', 'thank you so much', 'thanks a lot', 'excuse me', 'congratulations', 'congrats', 'good morning',
    'good afternoon', 'good evening', 'good luck', 'seriously', 'exactly', 'i see', 'got it', 'no problem', 'no worries', 'never mind',
    'wallah', 'i swear', 'inshallah', 'god willing', 'alhamdulillah', 'thank god', 'by the way', 'to be honest', 'in my opinion', 'well done',
    'good job', 'nice one', 'great job', 'gg', 'good game', 'for real', 'no way', 'i agree', 'you are right', 'me too', 'yo guys', 'hey everyone',
    'good morning everyone', 'good morning guys', 'good evening everyone', 'good evening guys', 'thanks everyone', 'thank you everyone',
    'thanks guys', 'thank you guys', 'good luck everyone', 'good luck guys']);
  const LEAD_ADV = new Set(['honestly', 'actually', 'anyway', 'well']);
  function isLeadWord(c) {
    if (!c) return false;
    if (c.k === 'FIXED') return LEAD_FIXED.has(c.it.key);
    if (c.k === 'ADV') return !!(c.it.k && LEAD_ADV.has(c.it.k));
    return false;
  }
  function isVocative(c) {
    if (!c) return false;
    if (c.k === 'FIXED') return ['bro', 'brother', 'dude', 'buddy', 'everyone', 'everybody'].includes(c.it.key);
    if (c.k === 'UNK') return !!c.it.name;
    if (c.k === 'IND') return ['everyone', 'everybody'].includes(c.it.key);
    if (c.k === 'NP') return (c.poss === 'my' && ['friend', 'brother', 'sister', 'guy'].includes(headKey(c)) && c.nouns.length === 1) ||
      (isBare(c) && headKey(c) === 'guy' && c.nouns[0].pl && !c.adjs.length);
    return false;
  }

  /* Questions typed without "?": "where are you", "can you help me", "do you like it". */
  const Q_AUX = new Set(['do', 'does', 'did', 'are', 'is', 'am', 'was', 'were', 'can', 'could', 'will', 'would', 'should', 'have', 'has', 'shall', 'may']);
  function looksLikeQuestion(toks) {
    const w = toks.filter((t) => !t.punct).map((t) => t.w);
    let i = 0;
    while (i < w.length && ['hey', 'hi', 'hello', 'bro', 'so', 'and', 'but', 'ok', 'okay', 'yo', 'guys', 'dude'].includes(w[i])) i++;
    const a = w[i], b = w[i + 1];
    if (!a) return false;
    if (WH[a]) {
      if (!b) return true;
      if (a === 'how' && (ADJS[b] || b === 'much' || b === 'many' || b === 'long' || b === 'old')) return true;
      return Q_AUX.has(b) || !!MODAL[b] || (verbInfo(b) || []).some((r) => r.form === 's' || r.form === 'past') || NOUN_FORM.has(b) || b === 'one' || b === 'ones';
    }
    if (Q_AUX.has(a) && b) return !!(PRON_SUBJ[b] || b === 'you' || b === 'it' || b === 'there' || b === 'this' || b === 'that' || DET[b] || PRON_POSS[b] || NOUN_FORM.has(b));
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
      if (pc.punct) {
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
      for (const t of expandTokens(tokenize(line))) {
        if (t.punct || t.arabic || t.posss || t.exp || t.keep || /^[A-Z]/.test(t.o.slice(1)) || (/^[A-Z]/.test(t.o) && toks.length && !toks[toks.length - 1].punct)) { toks.push(t); continue; }
        const fix = correctWord(t.w, userWords);
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
        try { pieces = renderSentence(lex(s, ctx), ctx); }
        catch (e) { FALLBACK.n++; FALLBACK.last = e; pieces = wordByWord(s, ctx); }
        const lastTok = s[s.length - 1];
        if (lastTok && !lastTok.punct && pieces.length) {
          const words = s.filter((t) => !t.punct).length;
          if (looksLikeQuestion(s)) pieces.push({ az: '?', ar: '?', punct: true, known: true });
          else if (words >= 3) pieces.push({ az: '.', ar: '.', punct: true, known: true });
        }
        all = all.concat(pieces);
      }
      for (const pc of all) {
        if (pc.known === false && pc.unk && /[a-z]/i.test(pc.az) && !unknown.includes(pc.az.toLowerCase())) unknown.push(pc.az.toLowerCase());
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
      if (t.arabic) { out.push(piece(t.o, t.o, { raw: true })); continue; }
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
