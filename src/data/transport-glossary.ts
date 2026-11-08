/**
 * ============================================================================
 *  Transport Explainer Glossary
 * ============================================================================
 *  Plain-English explanations of every local transport term. Destination
 *  guides reference these by `TransportMode` id, and the UI links each step
 *  to `/transport-guide#<id>` so nobody is left wondering "what's a CNG?".
 * ============================================================================
 */
import type { PriceRangeBDT, TransportMode } from "@/types/destination";

export interface GlossaryEntry {
  id: TransportMode;
  term: string;
  localName?: string;
  emoji: string;
  /** One-sentence answer to "what is it?" */
  short: string;
  description: string;
  typicalFare: string;
  howToUse: string[];
  watchOut?: string;
}

export const TRANSPORT_GLOSSARY: Record<TransportMode, GlossaryEntry> = {
  cng: {
    id: "cng",
    term: "CNG (Auto-rickshaw)",
    localName: "সিএনজি",
    emoji: "🛺",
    short: "A green, 3-wheeled motorised taxi with a metal cage, named after the gas it runs on.",
    description:
      "CNG stands for Compressed Natural Gas. It is a small 3-wheeler that seats up to 3 passengers behind the driver, behind a metal grille door. It is the default 'taxi' for short-to-medium trips in every city and town. Green ones are private hire; grey or other colours are often shared on fixed routes.",
    typicalFare: "BDT 150–400 for a city trip (whole vehicle)",
    howToUse: [
      "Tell the driver your destination and ask 'Koto?' (How much?).",
      "Agree on the full price BEFORE getting in. Meters are almost never used.",
      "Pay at the end with small notes. Drivers rarely have change for BDT 1,000.",
      "In Dhaka, the Pathao and Uber apps can also book CNGs at a fixed price.",
    ],
    watchOut: "Keep bags away from the open sides in traffic, because snatch-thefts happen in big cities.",
  },
  rickshaw: {
    id: "rickshaw",
    term: "Rickshaw (Cycle-rickshaw)",
    localName: "রিকশা",
    emoji: "🚲",
    short: "A colourful pedal-powered tricycle with a bench seat for 2 people.",
    description:
      "Bangladesh is known as the rickshaw capital of the world. They are perfect for short trips (under 3 km) through narrow lanes where cars cannot go, and the painted rickshaw art is a famous folk tradition.",
    typicalFare: "BDT 30–100 for short trips",
    howToUse: [
      "Wave one down anywhere. Agree on the fare first.",
      "Hold the side bar on bumpy roads, because the seat is slippery.",
      "Not allowed on major highways or some main roads (VIP Road in Dhaka).",
    ],
  },
  "easy-bike": {
    id: "easy-bike",
    term: "Easy-bike / Tom-tom",
    localName: "ইজিবাইক / অটো",
    emoji: "🔋",
    short: "A battery-powered 3-wheeler that seats 6–8 people, usually shared on a fixed route.",
    description:
      "Common in small towns and on beach roads. They run fixed routes and pick up and drop off passengers along the way, like a mini-bus. You can also reserve the whole vehicle.",
    typicalFare: "BDT 10–40 per person shared; BDT 100–300 reserved",
    howToUse: ["Ask the driver if it goes to your stop.", "Pay when you get off."],
  },
  leguna: {
    id: "leguna",
    term: "Leguna / Human Hauler",
    localName: "লেগুনা",
    emoji: "🚐",
    short: "A tiny open-back utility van with two benches facing each other, used as a shared route taxi.",
    description:
      "Legunas (also called 'human haulers') run fixed routes in cities and towns. They are crowded and bumpy but very cheap. Passengers often hang off the back step.",
    typicalFare: "BDT 15–40 per person",
    howToUse: [
      "Find the line at a major intersection and ask the helper (conductor) for your stop.",
      "Tap the roof or say 'Namabo' (I'll get off) to stop.",
    ],
    watchOut: "Not ideal for first-timers with luggage. Use a CNG instead.",
  },
  "chander-gari": {
    id: "chander-gari",
    term: "Chander Gari (Hill Jeep)",
    localName: "চাঁদের গাড়ি",
    emoji: "🚙",
    short: "An open-top 4×4 jeep used in the hill districts. The name means 'Moon's Car'.",
    description:
      "These are old Land Cruisers, Land Rovers or Mahindra jeeps converted to carry 10–14 people on benches, with a roof rack for luggage or extra standing passengers. They are the main way to reach hilly places such as Sajek, Nilgiri (Bandarban) and Thanchi. Groups usually reserve the entire jeep.",
    typicalFare: "BDT 4,000–13,000 per jeep depending on route and days",
    howToUse: [
      "Reserve through your hotel, a tour operator or the jeep line at the bus stand.",
      "The price is per vehicle, so split it among your group.",
      "Confirm what's included: return trip? waiting time? overnight stay of the driver?",
      "Sitting on the roof is exciting but risky on mountain bends, so stay seated inside.",
    ],
    watchOut: "Get the driver's phone number and agree on the return pickup time in writing (SMS/WhatsApp).",
  },
  launch: {
    id: "launch",
    term: "Launch (River Ferry)",
    localName: "লঞ্চ",
    emoji: "⛴️",
    short: "A large multi-deck passenger river boat, mainly connecting Dhaka with the southern Barishal region.",
    description:
      "Launches depart from Sadarghat in Old Dhaka. Overnight launches have deck space (cheapest, you sleep on a mat), single and double cabins, and VIP cabins with attached bathrooms. Travelling by launch is one of the classic Bangladeshi experiences.",
    typicalFare: "Deck BDT 300–500; Cabin BDT 1,200–5,000",
    howToUse: [
      "Book cabins a few days ahead, either at Sadarghat counters or by phone through the launch company.",
      "Arrive 1 hour early, because Sadarghat is crowded and chaotic.",
      "Hire a porter only after agreeing on the price.",
    ],
    watchOut: "Avoid launches during storms (signal 3+) and on overcrowded Eid days.",
  },
  "rocket-steamer": {
    id: "rocket-steamer",
    term: "Rocket Steamer (Paddle Steamer)",
    localName: "রকেট স্টিমার",
    emoji: "🚢",
    short: "A historic paddle-wheel steamship from the British era, run by the state-owned BIWTC.",
    description:
      "The 'Rocket' paddle steamers (such as PS Mahsud and PS Ostrich) were built in the early 1900s and once ran from Dhaka to Barishal and Khulna. Services have been very irregular in recent years, and they are sometimes used only for special tourist trips. Check with BIWTC before you plan a trip around one.",
    typicalFare: "Varies — check BIWTC",
    howToUse: ["Contact BIWTC (Bangladesh Inland Water Transport Corporation) at Motijheel, Dhaka, for the current schedule."],
  },
  ship: {
    id: "ship",
    term: "Sea Ship (Saint Martin's)",
    localName: "জাহাজ",
    emoji: "🛳️",
    short: "Seagoing passenger ships that carry tourists to Saint Martin's Island in season.",
    description:
      "Ships run only in the tourist season (about November to February) from Teknaf or Cox's Bazar, and the government sets the number of visitors and the rules each year.",
    typicalFare: "BDT 1,500–4,000 return",
    howToUse: ["Book through the official ship operators or a tour agency well in advance."],
  },
  speedboat: {
    id: "speedboat",
    term: "Speedboat",
    localName: "স্পিডবোট",
    emoji: "🚤",
    short: "A small fast motorboat for short river crossings and day trips.",
    description: "Used for crossings in haor (wetland) areas, the Sundarbans fringes and river tours. Fast but bumpy.",
    typicalFare: "Varies hugely by route",
    howToUse: ["Insist on a life jacket.", "Avoid them in rough weather."],
  },
  train: {
    id: "train",
    term: "Intercity Train & Classes",
    localName: "ট্রেন",
    emoji: "🚆",
    short: "Bangladesh Railway intercity trains are safe, cheap and scenic. Book online 10 days ahead.",
    description:
      "Trains are the most comfortable budget option. Classes from cheapest to best: Shulov (unreserved bench), Shovan (non-AC seat), Shovan Chair (non-AC padded seat), Snigdha (AC chair car), AC Seat (AC compartment), F Berth (non-AC sleeper), AC Berth (AC sleeper). For a first trip, Snigdha is the best value.",
    typicalFare: "Dhaka → Chattogram: BDT 405 (Shovan Chair) – 1,300+ (AC)",
    howToUse: [
      "Register at eticket.railway.gov.bd with your passport (foreigners) or NID (locals) and phone number.",
      "Tickets go on sale exactly 10 days before travel (morning for eastern routes, afternoon for western). Popular trains sell out in minutes.",
      "Pay by card, bKash or Nagad. Show the e-ticket PDF or SMS on board.",
      "You can also buy at station counters, but queues are long.",
    ],
    watchOut: "Check the coach (Bogi, like 'CHA', 'JHA') and seat number on your ticket. Coaches are labelled in Bangla letters, so ask staff.",
  },
  "ac-bus": {
    id: "ac-bus",
    term: "AC Coach Bus",
    localName: "এসি বাস",
    emoji: "🚌",
    short: "Air-conditioned long-distance buses with reclining seats. Comfortable, run by private companies.",
    description:
      "Operators like Green Line, Shyamoli NR, Hanif, Ena and Saint Martin Hyundai run AC coaches. 'Business class' means 2+1 wide seats. Sleeper coaches with flat berths are available on some routes (Dhaka → Cox's Bazar, Sylhet). Each company departs from its own 'counter' (ticket office) rather than one central station.",
    typicalFare: "BDT 1,200–3,000 depending on distance & class",
    howToUse: [
      "Book online at shohoz.com or bdtickets.com, or at the company's counter.",
      "The ticket shows the exact counter address. Arrive 30 minutes early.",
      "Luggage goes in the hold; you get a token for it.",
    ],
  },
  "non-ac-bus": {
    id: "non-ac-bus",
    term: "Non-AC Bus",
    localName: "নন-এসি বাস",
    emoji: "🚍",
    short: "Cheaper long-distance buses without air-conditioning. They make more stops and are more crowded.",
    description:
      "Good for short regional hops (for example Chattogram → Khagrachari). For overnight trips longer than 6 hours, first-timers should prefer AC or train. Avoid 'local' buses, which stop everywhere and pick up standing passengers.",
    typicalFare: "BDT 250–1,200",
    howToUse: ["Buy a 'counter' (reserved seat) ticket rather than a 'local' ticket.", "Choose a seat in the front half."],
  },
  flight: {
    id: "flight",
    term: "Domestic Flights",
    localName: "বিমান",
    emoji: "✈️",
    short: "Biman, US-Bangla, Novoair and Air Astra connect Dhaka to 7 domestic airports in about 1 hour.",
    description:
      "Domestic airports: Chattogram, Cox's Bazar, Sylhet, Jashore, Rajshahi, Saidpur and Barishal. Flights are cheap compared with Western prices and save a lot of time.",
    typicalFare: "BDT 3,500–12,000 one-way",
    howToUse: [
      "Book on the airline's website or aggregators like GoZayaan / ShareTrip.",
      "Use the Domestic Terminal at Dhaka airport. Check-in closes 30–45 minutes before departure.",
      "Carry your passport (foreigners) or NID (locals).",
    ],
  },
  "ride-share": {
    id: "ride-share",
    term: "Uber / Pathao (Ride-share)",
    emoji: "📱",
    short: "App-based cars, CNGs and motorbikes with fixed upfront prices. The easiest option for foreigners in cities.",
    description:
      "Uber (cars) and Pathao (cars and motorbikes) work in Dhaka, Chattogram and Sylhet. The price is shown before you book, so there is no haggling.",
    typicalFare: "Dhaka airport → Gulshan: ~BDT 400–700 (car)",
    howToUse: [
      "Install Uber or Pathao with a local SIM (some features need a BD number).",
      "Pay in cash or by card (Uber).",
      "Expect the driver to call you in Bangla. Sharing your pin via the in-app chat helps.",
    ],
  },
  walk: {
    id: "walk",
    term: "On Foot",
    emoji: "🚶",
    short: "Short walks between stations, counters and nearby spots.",
    description: "Pavements can be uneven or blocked, so watch for open drains, especially at night.",
    typicalFare: "Free",
    howToUse: ["Use a torch or phone light at night."],
  },
};

/** Section ordering for the Transport Guide page. */
export const GLOSSARY_GROUPS: { title: string; subtitle: string; ids: TransportMode[] }[] = [
  {
    title: "Getting around towns",
    subtitle: "Short trips inside a city or from a bus stand to your hotel.",
    ids: ["cng", "rickshaw", "easy-bike", "leguna", "ride-share"],
  },
  {
    title: "Long-distance travel",
    subtitle: "Dhaka to the rest of the country.",
    ids: ["train", "ac-bus", "non-ac-bus", "flight"],
  },
  {
    title: "Hills & off-road",
    subtitle: "Reaching hill-top villages and viewpoints.",
    ids: ["chander-gari"],
  },
  {
    title: "On the water",
    subtitle: "Rivers, mangroves and islands.",
    ids: ["launch", "rocket-steamer", "ship", "speedboat"],
  },
];

/** Re-exported so components can format glossary fares if needed later. */
export type { PriceRangeBDT };
