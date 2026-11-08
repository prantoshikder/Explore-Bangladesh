/**
 * ============================================================================
 *  Bangla phrasebook — the words a first-time visitor actually needs.
 * ============================================================================
 *  `say` is a simple English-letter pronunciation guide (stress is usually on
 *  the first syllable). Add phrases freely; the page groups them by `group`.
 * ============================================================================
 */
export interface Phrase {
  en: string;
  bn: string;
  say: string;
  note?: string;
}

export interface PhraseGroup {
  id: string;
  title: string;
  icon: string;
  phrases: Phrase[];
}

export const PHRASE_GROUPS: PhraseGroup[] = [
  {
    id: "basics",
    title: "Basics",
    icon: "👋",
    phrases: [
      { en: "Hello (common greeting)", bn: "আসসালামু আলাইকুম", say: "as-sa-LA-mu a-LAI-kum", note: "The usual greeting. The reply is \"Wa-alaikum assalam\"." },
      { en: "Hello (to Hindus)", bn: "নমস্কার", say: "no-mosh-KAR" },
      { en: "Thank you", bn: "ধন্যবাদ", say: "DHON-no-bad", note: "Used less often than in English; a smile works too." },
      { en: "Yes / No", bn: "হ্যাঁ / না", say: "hyan / na" },
      { en: "Excuse me (to get attention)", bn: "শুনুন", say: "SHU-nun" },
      { en: "Sorry", bn: "দুঃখিত", say: "DUKH-khi-to" },
      { en: "I don't understand", bn: "আমি বুঝতে পারছি না", say: "a-mi BUJH-te par-chhi na" },
      { en: "Do you speak English?", bn: "আপনি কি ইংরেজি বলতে পারেন?", say: "AP-ni ki ING-re-ji bol-te pa-ren?" },
      { en: "My name is …", bn: "আমার নাম …", say: "A-mar nam …" },
      { en: "Okay / fine", bn: "ঠিক আছে", say: "thik A-chhe" },
    ],
  },
  {
    id: "transport",
    title: "Getting around",
    icon: "🛺",
    phrases: [
      { en: "Will you go to …? (to a CNG/rickshaw)", bn: "… যাবেন?", say: "… JA-ben?", note: "The standard way to hire a CNG or rickshaw. Say the place first." },
      { en: "How much is the fare?", bn: "ভাড়া কত?", say: "BHA-ra KO-to?" },
      { en: "Where is …?", bn: "… কোথায়?", say: "… KO-thay?" },
      { en: "Stop here, please", bn: "এখানে থামুন", say: "e-KHA-ne THA-mun" },
      { en: "Go slowly, please", bn: "আস্তে চালান", say: "AS-te CHA-lan" },
      { en: "Left / Right / Straight", bn: "বামে / ডানে / সোজা", say: "BA-me / DA-ne / SHO-ja" },
      { en: "How far is it?", bn: "কত দূর?", say: "KO-to dur?" },
      { en: "Bus counter / Railway station", bn: "বাস কাউন্টার / রেলস্টেশন", say: "bas KAUN-tar / rel-STE-shon" },
      { en: "I'll get off here", bn: "আমি এখানে নামব", say: "a-mi e-KHA-ne NAM-bo" },
    ],
  },
  {
    id: "money",
    title: "Money & shopping",
    icon: "💵",
    phrases: [
      { en: "How much is this?", bn: "এটার দাম কত?", say: "E-tar dam KO-to?" },
      { en: "That's too expensive", bn: "অনেক বেশি দাম", say: "O-nek BE-shi dam" },
      { en: "A little less, please", bn: "একটু কম দেন", say: "EK-tu kom den", note: "Friendly bargaining at markets. Not used in fixed-price shops." },
      { en: "I'll pay … taka", bn: "… টাকা দেব", say: "… TA-ka DE-bo" },
      { en: "Do you have change?", bn: "ভাংতি আছে?", say: "BHANG-ti A-chhe?" },
      { en: "No thank you (I don't need it)", bn: "লাগবে না", say: "LAG-be na" },
    ],
  },
  {
    id: "food",
    title: "Food & drink",
    icon: "🍛",
    phrases: [
      { en: "Less spicy, please", bn: "ঝাল কম দেবেন", say: "jhal kom DE-ben" },
      { en: "Bottled water", bn: "বোতলের পানি", say: "BO-to-ler PA-ni" },
      { en: "One cup of tea, please", bn: "এক কাপ চা দিন", say: "ek kap cha din" },
      { en: "I don't eat meat", bn: "আমি মাংস খাই না", say: "a-mi MANG-sho khai na" },
      { en: "Delicious!", bn: "খুব মজা!", say: "khub MO-ja!" },
      { en: "The bill, please", bn: "বিল দিন", say: "bil din" },
    ],
  },
  {
    id: "emergency",
    title: "Help & emergency",
    icon: "🚨",
    phrases: [
      { en: "Help!", bn: "বাঁচাও!", say: "BAN-chao!" },
      { en: "Please call the police", bn: "পুলিশ ডাকুন", say: "PU-lish DA-kun", note: "Emergency number: 999 (police, fire, ambulance)." },
      { en: "I need a doctor", bn: "আমার ডাক্তার লাগবে", say: "A-mar DAK-tar LAG-be" },
      { en: "Where is the hospital?", bn: "হাসপাতাল কোথায়?", say: "HASH-pa-tal KO-thay?" },
      { en: "Where is the toilet?", bn: "টয়লেট কোথায়?", say: "TOY-let KO-thay?" },
      { en: "I am lost", bn: "আমি পথ হারিয়ে ফেলেছি", say: "a-mi poth HA-ri-ye fe-le-chhi" },
    ],
  },
  {
    id: "numbers",
    title: "Numbers (for prices)",
    icon: "🔢",
    phrases: [
      { en: "1 · 2 · 3 · 4 · 5", bn: "এক · দুই · তিন · চার · পাঁচ", say: "ek · dui · tin · char · panch" },
      { en: "10 · 20 · 50", bn: "দশ · বিশ · পঞ্চাশ", say: "dosh · bish · PON-chash" },
      { en: "100 · 200 · 500", bn: "একশ · দুইশ · পাঁচশ", say: "EK-sho · DUI-sho · PANCH-sho" },
      { en: "1,000", bn: "এক হাজার", say: "ek HA-jar" },
      { en: "Bangla digits ০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯", bn: "০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯", say: "0 1 2 3 4 5 6 7 8 9", note: "Prices and bus numbers are often written with these digits." },
    ],
  },
];
