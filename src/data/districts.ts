/**
 * ============================================================================
 *  All 64 districts of Bangladesh — used by /explore search.
 * ============================================================================
 *  `aliases` catch old spellings and common typos (Chittagong → Chattogram,
 *  Bogra → Bogura, Coxs Bazar…). Bangla names let people search in Bangla.
 *  A district with no spots yet still resolves, so the search can say
 *  "no places added in X yet" instead of "not found".
 * ============================================================================
 */
import type { Division } from "@/types/destination";

export interface District {
  name: string;
  bn: string;
  division: Division;
  aliases?: string[];
}

export const DISTRICTS: District[] = [
  // Dhaka Division
  { name: "Dhaka", bn: "ঢাকা", division: "Dhaka", aliases: ["dacca", "old dhaka", "puran dhaka"] },
  { name: "Gazipur", bn: "গাজীপুর", division: "Dhaka" },
  { name: "Narayanganj", bn: "নারায়ণগঞ্জ", division: "Dhaka", aliases: ["sonargaon"] },
  { name: "Narsingdi", bn: "নরসিংদী", division: "Dhaka" },
  { name: "Manikganj", bn: "মানিকগঞ্জ", division: "Dhaka" },
  { name: "Munshiganj", bn: "মুন্সীগঞ্জ", division: "Dhaka", aliases: ["bikrampur"] },
  { name: "Tangail", bn: "টাঙ্গাইল", division: "Dhaka" },
  { name: "Kishoreganj", bn: "কিশোরগঞ্জ", division: "Dhaka" },
  { name: "Faridpur", bn: "ফরিদপুর", division: "Dhaka" },
  { name: "Gopalganj", bn: "গোপালগঞ্জ", division: "Dhaka" },
  { name: "Madaripur", bn: "মাদারীপুর", division: "Dhaka" },
  { name: "Rajbari", bn: "রাজবাড়ী", division: "Dhaka" },
  { name: "Shariatpur", bn: "শরীয়তপুর", division: "Dhaka" },
  // Chattogram Division
  { name: "Chattogram", bn: "চট্টগ্রাম", division: "Chattogram", aliases: ["chittagong", "ctg", "chottogram"] },
  { name: "Cox's Bazar", bn: "কক্সবাজার", division: "Chattogram", aliases: ["coxs bazar", "cox bazar", "coxsbazar", "coxbazar", "cox's bazaar"] },
  { name: "Rangamati", bn: "রাঙ্গামাটি", division: "Chattogram", aliases: ["rangamati hill district"] },
  { name: "Khagrachari", bn: "খাগড়াছড়ি", division: "Chattogram", aliases: ["khagrachhari"] },
  { name: "Bandarban", bn: "বান্দরবান", division: "Chattogram" },
  { name: "Cumilla", bn: "কুমিল্লা", division: "Chattogram", aliases: ["comilla"] },
  { name: "Feni", bn: "ফেনী", division: "Chattogram" },
  { name: "Noakhali", bn: "নোয়াখালী", division: "Chattogram" },
  { name: "Lakshmipur", bn: "লক্ষ্মীপুর", division: "Chattogram" },
  { name: "Chandpur", bn: "চাঁদপুর", division: "Chattogram" },
  { name: "Brahmanbaria", bn: "ব্রাহ্মণবাড়িয়া", division: "Chattogram" },
  // Sylhet Division
  { name: "Sylhet", bn: "সিলেট", division: "Sylhet", aliases: ["silet", "srihatta"] },
  { name: "Moulvibazar", bn: "মৌলভীবাজার", division: "Sylhet", aliases: ["moulvi bazar", "sreemangal", "srimangal"] },
  { name: "Sunamganj", bn: "সুনামগঞ্জ", division: "Sylhet" },
  { name: "Habiganj", bn: "হবিগঞ্জ", division: "Sylhet" },
  // Khulna Division
  { name: "Khulna", bn: "খুলনা", division: "Khulna" },
  { name: "Bagerhat", bn: "বাগেরহাট", division: "Khulna" },
  { name: "Satkhira", bn: "সাতক্ষীরা", division: "Khulna" },
  { name: "Jashore", bn: "যশোর", division: "Khulna", aliases: ["jessore"] },
  { name: "Jhenaidah", bn: "ঝিনাইদহ", division: "Khulna" },
  { name: "Magura", bn: "মাগুরা", division: "Khulna" },
  { name: "Narail", bn: "নড়াইল", division: "Khulna" },
  { name: "Kushtia", bn: "কুষ্টিয়া", division: "Khulna" },
  { name: "Chuadanga", bn: "চুয়াডাঙ্গা", division: "Khulna" },
  { name: "Meherpur", bn: "মেহেরপুর", division: "Khulna" },
  // Rajshahi Division
  { name: "Rajshahi", bn: "রাজশাহী", division: "Rajshahi" },
  { name: "Naogaon", bn: "নওগাঁ", division: "Rajshahi", aliases: ["paharpur"] },
  { name: "Bogura", bn: "বগুড়া", division: "Rajshahi", aliases: ["bogra"] },
  { name: "Natore", bn: "নাটোর", division: "Rajshahi" },
  { name: "Chapai Nawabganj", bn: "চাঁপাইনবাবগঞ্জ", division: "Rajshahi", aliases: ["chapainawabganj", "nawabganj"] },
  { name: "Joypurhat", bn: "জয়পুরহাট", division: "Rajshahi" },
  { name: "Pabna", bn: "পাবনা", division: "Rajshahi" },
  { name: "Sirajganj", bn: "সিরাজগঞ্জ", division: "Rajshahi" },
  // Rangpur Division
  { name: "Rangpur", bn: "রংপুর", division: "Rangpur" },
  { name: "Dinajpur", bn: "দিনাজপুর", division: "Rangpur" },
  { name: "Thakurgaon", bn: "ঠাকুরগাঁও", division: "Rangpur" },
  { name: "Panchagarh", bn: "পঞ্চগড়", division: "Rangpur" },
  { name: "Nilphamari", bn: "নীলফামারী", division: "Rangpur" },
  { name: "Lalmonirhat", bn: "লালমনিরহাট", division: "Rangpur" },
  { name: "Kurigram", bn: "কুড়িগ্রাম", division: "Rangpur" },
  { name: "Gaibandha", bn: "গাইবান্ধা", division: "Rangpur" },
  // Barishal Division
  { name: "Barishal", bn: "বরিশাল", division: "Barishal", aliases: ["barisal"] },
  { name: "Patuakhali", bn: "পটুয়াখালী", division: "Barishal", aliases: ["kuakata"] },
  { name: "Bhola", bn: "ভোলা", division: "Barishal" },
  { name: "Pirojpur", bn: "পিরোজপুর", division: "Barishal" },
  { name: "Barguna", bn: "বরগুনা", division: "Barishal" },
  { name: "Jhalokathi", bn: "ঝালকাঠি", division: "Barishal", aliases: ["jhalokati"] },
  // Mymensingh Division
  { name: "Mymensingh", bn: "ময়মনসিংহ", division: "Mymensingh" },
  { name: "Jamalpur", bn: "জামালপুর", division: "Mymensingh" },
  { name: "Netrokona", bn: "নেত্রকোণা", division: "Mymensingh" },
  { name: "Sherpur", bn: "শেরপুর", division: "Mymensingh" },
];
