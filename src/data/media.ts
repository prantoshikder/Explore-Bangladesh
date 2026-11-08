/**
 * ============================================================================
 *  Extra photo library: local transport, food and travel essentials.
 * ============================================================================
 *  Photos live in /public/images/{transport,food,essentials}/ (Wikimedia
 *  Commons, CC licences). All of them also appear in /gallery, where their
 *  credits are shown.
 * ============================================================================
 */
import type { Photo, TransportMode } from "@/types/destination";
import { withUnsplash } from "@/data/unsplash";

function ph(dir: string, file: string, alt: string, caption: string, author: string, license: string, source: string): Photo {
  return { src: `/images/${dir}/${file}`, alt, caption, credit: { author, license, source } };
}

/** Photo for each transport type (some, like easy-bike and walk, have none). */
const BASE_TRANSPORT_PHOTOS: Partial<Record<TransportMode, Photo>> = {
  "cng": ph("transport", "cng.jpg", "A green CNG auto-rickshaw speeding along a Dhaka road", "CNG auto-rickshaw", "Md.Mijanur rahman Mijan", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:CNG_car.jpg"),
  "rickshaw": ph("transport", "rickshaw.jpg", "A crowd of colourful cycle-rickshaws riding down a Dhaka street", "Cycle-rickshaws in Dhaka", "Biswarup Ganguly", "CC BY 3.0", "https://commons.wikimedia.org/wiki/File:Cycle_Rickshaws_-_High_Court_Street_-_Dhaka_2015-05-31_2094.JPG"),
  "leguna": ph("transport", "leguna.jpg", "A small yellow leguna (human hauler) van driving in city traffic", "A leguna in traffic", "Shadman Samee from Dhaka, Bangladesh", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Car_trouble_Toyota_Sprinter_Trueno,_Bangladesh._(34107362454).jpg"),
  "chander-gari": ph("transport", "chander-gari.jpg", "A green open-top Chander Gari jeep with bench seats parked by the road", "Chander Gari hill jeep", "Shadman Samee from Dhaka, Bangladesh", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Chander_Gari_Willys_M38A1._(26575334057).jpg"),
  "launch": ph("transport", "launch.jpg", "Aerial view of dozens of colourful multi-deck launches moored at Sadarghat", "Launches at Sadarghat", "Shafiul Islam Shaikot", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Sadarghat_river_port_Bangladesh.jpg"),
  "rocket-steamer": ph("transport", "rocket-steamer.jpg", "A historic paddle steamer on the Buriganga river in Dhaka", "Paddle steamer on the Buriganga", "Tanima Nasrin", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:%E0%A6%AC%E0%A7%81%E0%A6%A1%E0%A6%BC%E0%A6%BF%E0%A6%97%E0%A6%99%E0%A7%8D%E0%A6%97%E0%A6%BE_%E0%A7%A9.jpg"),
  "ship": ph("transport", "ship.jpg", "A passenger ship crossing the open sea towards Saint Martin's Island", "Ship to Saint Martin's", "Ifsanjry", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Birds-Boats-Mountains_-_On_the_way_to_Saint_Martin%27s_Island_in_KEARI_Sindbad_24.jpg"),
  "speedboat": ph("transport", "speedboat.jpg", "A small speedboat crossing a wide river under a pink evening sky", "Speedboat on the river", "Shahjalal2005", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:%E0%A6%86%E0%A6%AE%E0%A6%BF_%E0%A6%9B%E0%A7%8B%E0%A6%9F,_%E0%A6%86%E0%A6%AE%E0%A6%BE%E0%A6%95%E0%A7%87_%E0%A6%AE%E0%A6%BE%E0%A6%B0%E0%A6%AC%E0%A7%87%E0%A6%A8_%E0%A6%A8%E0%A6%BE!.jpg"),
  "train": ph("transport", "train.jpg", "A Bangladesh Railway intercity train standing at a station platform", "Intercity train", "Nasif05", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Domar_railway_1.jpg"),
  "ac-bus": ph("transport", "ac-bus.jpg", "A Green Line air-conditioned coach bus on a city road", "AC coach bus", "Shadman Samee from Dhaka, Bangladesh", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:GL_4104_Greenline_Scania_Irizar_coach,_Bangladesh._(33349995704).jpg"),
  "non-ac-bus": ph("transport", "non-ac-bus.jpg", "A green and red non-AC bus waiting at a roadside bus stand", "Non-AC bus", "Justin Brockie from Wolcott, Connecticut, USA", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Bus_along_Tongi-Kaliganj_Highway.jpg"),
  "flight": ph("transport", "flight.jpg", "A US-Bangla Airlines passenger jet flying against a blue sky", "Domestic flight", "Md Shaifuzzaman Ayan", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:US-Bangla_Airlines,_S2-AJA,_Boeing_737-8Q8_Aircraft.jpg"),
};

export interface FoodItem {
  id: string;
  name: string;
  bn: string;
  blurb: string;
  /** Bangla one-liner (the Bangla name is `bn`). */
  blurbBn: string;
  /** Lowercase words used to match dish names in destination guides. */
  match: string[];
  photo: Photo;
}

const BASE_FOODS: FoodItem[] = [
  { id: "hilsa", name: "Ilish (Hilsa) curry", bn: "\u0987\u09b2\u09bf\u09b6 \u09ae\u09be\u099b", blurb: "The national fish, cooked in mustard sauce. Rich, smoky and soft.", blurbBn: "জাতীয় মাছ, সর্ষে বাটায় রান্না। ঘ্রাণ আর স্বাদে অনন্য।", match: ["ilish", "hilsa"], photo: ph("food", "hilsa.jpg", "A piece of hilsa fish in yellow mustard curry", "Ilish (Hilsa) curry", "Rajeeb Dutta", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Sorse_posto_ilish_mach-MB05.jpg") },
  { id: "biryani", name: "Kacchi Biryani", bn: "\u0995\u09be\u099a\u09cd\u099a\u09bf \u09ac\u09bf\u09b0\u09bf\u09af\u09bc\u09be\u09a8\u09bf", blurb: "Old Dhaka's slow-cooked mutton biryani with fragrant rice and potato.", blurbBn: "পুরান ঢাকার ধীরে রান্না খাসির বিরিয়ানি, সুগন্ধি চাল আর আলুসহ।", match: ["biryani", "kacchi"], photo: ph("food", "biryani.jpg", "A plate of kacchi biryani with mutton and potato", "Kacchi Biryani", "ANKAN", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Kacchi_Biryani.jpg") },
  { id: "fuchka", name: "Fuchka", bn: "\u09ab\u09c1\u099a\u0995\u09be", blurb: "Crisp hollow shells filled with spicy potato and tangy tamarind water.", blurbBn: "মচমচে ফাঁপা পুরিতে ঝাল আলু আর টক তেঁতুলের পানি।", match: ["fuchka", "phuchka"], photo: ph("food", "fuchka.jpg", "Fuchka shells served with tamarind water", "Fuchka", "Shaifali Sood", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Panipuri_and_Chutney.jpg") },
  { id: "bamboo-chicken", name: "Bamboo Chicken", bn: "\u09ac\u09cd\u09af\u09be\u09ae\u09cd\u09ac\u09c1 \u099a\u09bf\u0995\u09c7\u09a8", blurb: "Hill-style chicken slow-roasted inside a green bamboo tube.", blurbBn: "পাহাড়ি স্টাইলে সবুজ বাঁশের চোঙে আগুনে রান্না মুরগি।", match: ["bamboo chicken"], photo: ph("food", "bamboo-chicken.jpg", "Chicken curry served in a bamboo tube", "Bamboo Chicken", "Sm faysal", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Tribal_bamboo_chicken_dish_from_Bandarban_Bangladesh.jpg") },
  { id: "pitha", name: "Pitha", bn: "\u09aa\u09bf\u09a0\u09be", blurb: "Winter rice cakes, fried or steamed, often filled with coconut and date jaggery.", blurbBn: "শীতের চালের পিঠা, ভাজা বা ভাপা, নারকেল আর খেজুর গুড়ের পুরসহ।", match: ["pitha"], photo: ph("food", "pitha.jpg", "A pile of golden fried pitha rice cakes", "Pitha", "Mmrsafy", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Puli_pitha_07.jpg") },
  { id: "pomfret", name: "Rupchanda Fry", bn: "\u09b0\u09c2\u09aa\u099a\u09be\u0981\u09a6\u09be \u09ad\u09be\u099c\u09be", blurb: "Whole silver pomfret, spiced and fried. A Cox's Bazar favourite.", blurbBn: "মসলা মাখিয়ে ভাজা আস্ত রূপচাঁদা। কক্সবাজারের প্রিয় খাবার।", match: ["rupchanda", "pomfret"], photo: ph("food", "pomfret.jpg", "A whole fried pomfret fish on a steel plate", "Rupchanda Fry", "SerChevalerie", "CC0", "https://commons.wikimedia.org/wiki/File:Pomfret_Rawa_Fry.jpg") },
  { id: "tea", name: "Seven-Layer Tea", bn: "\u09b8\u09be\u09a4 \u09b0\u0999\u09c7\u09b0 \u099a\u09be", blurb: "Sreemangal's famous striped tea, poured layer by layer.", blurbBn: "শ্রীমঙ্গলের বিখ্যাত স্তরে স্তরে ঢালা সাত রঙের চা।", match: ["seven-layer", "seven layer", "tea"], photo: ph("food", "tea.jpg", "A glass of striped seven-layer tea", "Seven-Layer Tea", "Moheen Reeyad", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Seven_Layers_Tea_(02).jpg") },
  { id: "thali", name: "Bangla Thali", bn: "\u09ac\u09be\u0999\u09be\u09b2\u09bf \u09a5\u09be\u09b2\u09bf", blurb: "Rice with lentils, fish, vegetables and pickles on one big plate.", blurbBn: "এক থালায় ভাত, ডাল, মাছ, সবজি আর আচার।", match: ["thali", "rice thali", "pahari"], photo: ph("food", "thali.jpg", "A brass thali with rice, lentils and curries", "Bangla Thali", "Marajozkee", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Bengali_Non-vegetarian_thali.jpg") },
  { id: "shutki", name: "Shutki (Dried Fish)", bn: "\u09b6\u09c1\u0981\u099f\u0995\u09bf", blurb: "Sun-dried fish from the coast, cooked into a pungent, spicy curry.", blurbBn: "উপকূলের রোদে শুকানো মাছ, ঝাঁঝালো ঝাল তরকারিতে রান্না।", match: ["shutki", "dried fish"], photo: ph("food", "shutki.jpg", "Dried fish laid out on newspaper", "Shutki (Dried Fish)", "Souradeep Roy 1998", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Shutki_mach(dried_fish)-_Dried_Hilsa_fishes_and_dried_shrimps(left_to_right),_Siliguri,_West_Bengal_DSC_1013.jpg") },
  { id: "jilapi", name: "Jilapi", bn: "\u099c\u09bf\u09b2\u09be\u09aa\u09bf", blurb: "Crunchy spirals of fried batter soaked in sugar syrup.", blurbBn: "ভাজা ময়দার মচমচে প্যাঁচ, চিনির রসে ডোবানো।", match: ["jilapi", "jalebi"], photo: ph("food", "jilapi.jpg", "A tray of orange jilapi sweets", "Jilapi", "Kryesmin", "CC0", "https://commons.wikimedia.org/wiki/File:Jalebi_in_Tangail_02.jpg") },
];

/** Transport photos, preferring a selected Unsplash photo for slot `transport:<id>`. */
export const TRANSPORT_PHOTOS: Partial<Record<TransportMode, Photo>> = Object.fromEntries(
  Object.entries(BASE_TRANSPORT_PHOTOS).map(([id, photo]) => [id, withUnsplash(`transport:${id}`, photo!)]),
);

/** Foods, preferring a selected Unsplash photo for slot `food:<id>`. */
export const FOODS: FoodItem[] = BASE_FOODS.map((f) => ({ ...f, photo: withUnsplash(`food:${f.id}`, f.photo) }));

/** Find a food photo for a dish name like "Rupchanda Fry" or "Pahari Rice Thali". */
export function foodPhotoFor(dishName: string): Photo | undefined {
  const n = dishName.toLowerCase();
  return FOODS.find((f) => f.match.some((m) => n.includes(m)))?.photo;
}

export const ESSENTIAL_PHOTOS = {
  airport: ph("essentials", "airport.jpg", "The curved white arches of the departure hall at Hazrat Shahjalal International Airport, Dhaka", "Hazrat Shahjalal International Airport", "MdsShakil", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Hazrat_Shahjalal_International_Airport_Area_in_2024_08.jpg"),
};
