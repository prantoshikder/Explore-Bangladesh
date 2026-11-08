/**
 * ============================================================================
 *  Spots — Group J: Barishal division
 * ============================================================================
 *  Districts covered: Bhola, Pirojpur, Barguna, Barishal, Patuakhali, Jhalokathi
 *
 *  Prices are in BDT and approximate — fees and fares change often.
 *  Photos live in photos-j.ts (looked up by slug); Bangla text in bn/group-j.ts.
 * ============================================================================
 */
import type { Spot } from "@/types/spot";

export const SPOTS_J: Spot[] = [
  /* ------------------------------- Barishal ------------------------------ */
  {
    slug: "guthia-mosque",
    name: "Guthia Mosque (Baitul Aman Jame Masjid)",
    localName: "গুঠিয়া মসজিদ",
    district: "Barishal",
    upazila: "Wazirpur",
    division: "Barishal",
    categories: ["Religious"],
    difficulty: "Easy",
    summary: "A grand modern mosque complex near Barishal with white domes, a tall minaret, a big pond and gardens.",
    description: [
      "The Guthia Mosque, officially the Baitul Aman Jame Masjid and Eidgah Complex, is one of the largest and most beautiful mosque complexes in southern Bangladesh. It was built in the early 2000s by a local businessman in Guthia village, Wazirpur upazila.",
      "The complex has a white mosque with domes and a tall minaret, an open Eidgah (prayer ground), a large rectangular pond with a bathing ghat, and neatly kept gardens with palm trees and fountains. It is said to hold soil and water brought from holy places around the world.",
      "Visitors of all faiths come to walk the grounds and take photos, especially in the late afternoon when the mosque reflects in the pond and is lit up after dark.",
    ],
    highlights: [
      "White domes and tall minaret reflected in the big pond",
      "Calm landscaped gardens and fountains",
      "Large Eidgah prayer ground",
      "Evening lights after sunset",
    ],
    howToReach: [
      {
        title: "From Dhaka to Barishal",
        detail: "Overnight launch from Sadarghat (about 8–10 hours, approx. ৳400 deck to ৳2,500+ cabin) or AC bus via the Padma Bridge (about 4–5 hours, approx. ৳600–1,000).",
        mode: "launch",
      },
      {
        title: "From Barishal city (Nathullabad)",
        detail: "Take a bus or CNG on the Barishal–Banaripara road to Guthia, about 30–40 minutes (about 20 km). Bus approx. ৳30–50; reserved CNG approx. ৳400–700 return.",
        mode: "cng",
      },
    ],
    bestTime: "October – March for pleasant weather; late afternoon for the best light.",
    timeNeeded: "1–2 hours",
    entryFee: "Free",
    openingHours: "Grounds roughly open in daylight and early evening; non-Muslim visitors should avoid prayer times.",
    tips: [
      "Dress modestly — cover shoulders and knees; women should bring a scarf.",
      "Take off shoes before entering the mosque, and ask before going inside during prayer times.",
      "Combine with Durga Sagar on the same road for an easy half-day trip.",
    ],
    map: { lat: 22.8465, lng: 90.2295 },
  },
  {
    slug: "oxford-mission-church",
    name: "Oxford Mission Church",
    localName: "অক্সফোর্ড মিশন চার্চ",
    district: "Barishal",
    upazila: "Barishal Sadar",
    division: "Barishal",
    categories: ["Heritage", "Religious", "City"],
    difficulty: "Easy",
    summary: "A grand red-brick church from 1903 in Barishal city, with tall arches, quiet lawns and palm trees.",
    description: [
      "The Epiphany Church, better known as the Oxford Mission Church, stands in Barishal city. It was built in the early 1900s by the Oxford Mission, an Anglican group that ran schools and hospitals in Bengal.",
      "The long red-brick building has rows of arches and a high, simple interior. It is often said to be one of the largest churches in Asia when built. Green lawns, ponds and tall palm and mahogany trees surround it.",
      "It is still a working church and mission, so visits are quiet and respectful. It is a pleasant stop while exploring Barishal city.",
    ],
    highlights: [
      "Long red-brick facade with rows of arches",
      "Calm, tree-shaded mission grounds",
      "Bell tower and old mission buildings",
      "Easy combination with Bibir Pukur in the city centre",
    ],
    howToReach: [
      {
        title: "From Dhaka to Barishal",
        detail: "Overnight launch from Sadarghat (about 8–10 hours, approx. ৳400–2,500+) or AC bus via the Padma Bridge (about 4–5 hours, approx. ৳600–1,000).",
        mode: "launch",
      },
      {
        title: "Within Barishal city",
        detail: "The church is on Bagura Road in the city. Rickshaw or easy-bike from the launch ghat or Sadar Road, about 10–15 minutes, approx. ৳30–60.",
        mode: "rickshaw",
      },
    ],
    bestTime: "October – March; mornings are quietest.",
    timeNeeded: "1 hour",
    entryFee: "Free (approx. — entry is at the gatekeeper's discretion)",
    openingHours: "Visiting is usually allowed in the daytime; ask at the gate. Services on Sundays.",
    tips: [
      "Ask permission at the gate before entering, and keep your voice low.",
      "Photography inside may not be allowed — ask first.",
      "Dress modestly.",
    ],
    map: { lat: 22.7066, lng: 90.3623 },
  },
  {
    slug: "bibir-pukur",
    name: "Bibir Pukur",
    localName: "বিবির পুকুর",
    district: "Barishal",
    upazila: "Barishal Sadar",
    division: "Barishal",
    categories: ["City", "Heritage", "Lake"],
    difficulty: "Easy",
    summary: "A historic pond in the heart of Barishal city, ringed by a walkway and lit up in the evening.",
    description: [
      "Bibir Pukur ('the lady's pond') is a large rectangular pond right in the centre of Barishal city, next to Sadar Road. Local history says it was dug in the 18th century by a noblewoman called Jinnat Bibi, which gave it its name.",
      "Today it is the city's favourite meeting place. A paved walkway with railings runs around the water, with shops, the old town hall area and busy streets all around.",
      "Come in the evening, when the lights reflect on the water and families, students and snack sellers fill the banks. It is an easy first stop after arriving by launch.",
    ],
    highlights: [
      "Evening walk around the lit-up pond",
      "Street snacks such as fuchka and chotpoti nearby",
      "Busy Sadar Road shopping area",
      "Short rickshaw ride to the Oxford Mission Church",
    ],
    howToReach: [
      {
        title: "From Dhaka to Barishal",
        detail: "Overnight launch from Sadarghat (about 8–10 hours, approx. ৳400–2,500+) or AC bus via the Padma Bridge (about 4–5 hours, approx. ৳600–1,000).",
        mode: "launch",
      },
      {
        title: "Within Barishal city",
        detail: "Rickshaw or easy-bike from the launch ghat or Nathullabad bus terminal to Sadar Road, about 10–20 minutes, approx. ৳30–80.",
        mode: "rickshaw",
      },
    ],
    bestTime: "Any time of year; evenings are liveliest.",
    timeNeeded: "30–60 minutes",
    entryFee: "Free",
    openingHours: "Open all the time",
    tips: [
      "It gets crowded in the evening — keep an eye on your phone and wallet.",
      "Try local sweets and snacks from the shops on Sadar Road.",
      "Combine with the Oxford Mission Church for a short city walk.",
    ],
    map: { lat: 22.7019, lng: 90.3706 },
  },

  {
    slug: "satla-shapla-bil",
    name: "Satla Water-Lily Fields (Satlar Bil)",
    localName: "সাতলার শাপলা বিল",
    district: "Barishal",
    upazila: "Wazirpur",
    division: "Barishal",
    categories: ["Wetland"],
    difficulty: "Easy",
    summary: "Vast wetlands carpeted with pink-red water lilies in late monsoon and autumn — best seen from a small boat at dawn.",
    description: [
      "Satla is a village in the far west of Wazirpur upazila, surrounded by low-lying wetlands (bil). From roughly August to November, the water fills with millions of red and pink water lilies (shapla, Bangladesh's national flower), turning the fields into a sea of colour.",
      "The flowers open in the early morning and start to close by late morning, so visitors arrive at sunrise and glide between the lilies in small country boats. Local people also harvest the stems to sell as a vegetable.",
      "It is one of the most photogenic seasonal sights in southern Bangladesh, and still feels rural and uncommercial.",
    ],
    highlights: [
      "Boat ride through fields of red and pink water lilies",
      "Sunrise light over the wetlands",
      "Watching villagers collect lily stems",
      "Quiet rural life in the Barishal backwaters",
    ],
    howToReach: [
      {
        title: "From Dhaka to Barishal",
        detail: "Overnight launch from Sadarghat (about 8–10 hours, approx. ৳400–2,500+) or AC bus via the Padma Bridge (about 4–5 hours, approx. ৳600–1,000).",
        mode: "launch",
      },
      {
        title: "From Barishal city to Satla",
        detail: "Reserved CNG or microbus from Barishal via Wazirpur to Satla, about 1.5–2 hours, approx. ৳1,500–2,500 return. Leave before dawn to catch the flowers open.",
        mode: "cng",
      },
      {
        title: "On the water",
        detail: "Hire a small boat at the wetland edge, approx. ৳300–800 for 1–2 hours.",
      },
    ],
    bestTime: "Roughly August – November, at sunrise (flowers close by late morning).",
    timeNeeded: "Half day",
    entryFee: "Free (boat hire extra)",
    openingHours: "Open all the time; go between sunrise and about 10:00.",
    tips: [
      "Don't pick the flowers for fun — they are the villagers' income.",
      "Bring a waterproof bag for your phone and camera.",
      "Roads are narrow; agree the full return fare with your driver before leaving Barishal.",
    ],
    map: { lat: 22.905, lng: 90.075 },
  },
  {
    slug: "barishal-launch-terminal",
    name: "Barishal Launch Terminal & Kirtankhola Riverside",
    localName: "বরিশাল লঞ্চঘাট ও কীর্তনখোলা নদী",
    district: "Barishal",
    upazila: "Barishal Sadar",
    division: "Barishal",
    categories: ["River", "City"],
    difficulty: "Easy",
    summary: "The busy river port of the 'Venice of Bengal', where huge multi-deck launches line up on the Kirtankhola.",
    description: [
      "Barishal is often called the 'Venice of Bengal' because rivers and canals run everywhere. Its heart is the launch terminal on the Kirtankhola river, where giant multi-deck passenger launches from Dhaka tie up side by side.",
      "Arriving here at dawn after the overnight trip from Dhaka is a classic Bangladesh experience. In the evening the launches light up, porters and hawkers fill the jetty, and the ships leave one after another for Dhaka.",
      "Walk along the riverside, or hire a small boat for a short ride on the Kirtankhola to watch river life, cargo boats and the city from the water.",
    ],
    highlights: [
      "Rows of huge, brightly lit passenger launches",
      "Evening departures for Dhaka",
      "Short boat ride on the Kirtankhola river",
      "Riverside snacks and tea stalls",
    ],
    howToReach: [
      {
        title: "From Dhaka by launch",
        detail: "Overnight launch from Sadarghat, leaving roughly 20:00–21:00 and arriving around dawn (about 8–10 hours, approx. ৳400 deck to ৳2,500+ cabin).",
        mode: "launch",
      },
      {
        title: "Within Barishal city",
        detail: "Rickshaw or easy-bike from Sadar Road / Bibir Pukur to the launch ghat, about 5–10 minutes, approx. ৳20–50.",
        mode: "rickshaw",
      },
      {
        title: "On the river",
        detail: "Small boats near the ghat take visitors out on the Kirtankhola, approx. ৳200–500 per hour — agree the price first.",
      },
    ],
    bestTime: "October – March; evenings for the launch departures, dawn for arrivals.",
    timeNeeded: "1–2 hours",
    entryFee: "Free (small ghat toll approx. ৳10 if boarding)",
    openingHours: "Open all the time; busiest at dawn and in the evening.",
    tips: [
      "Watch your bags in the crowds at the ghat.",
      "Avoid small boats in rough weather or after dark.",
      "Book launch cabins a few days ahead, especially before holidays.",
    ],
    map: { lat: 22.7048, lng: 90.3775 },
  },
  /* ------------------------------ Patuakhali ----------------------------- */
  {
    slug: "kuakata-buddhist-temple",
    name: "Kuakata Buddhist Temple (Sima Bihar)",
    localName: "কুয়াকাটা সীমা বৌদ্ধ বিহার",
    district: "Patuakhali",
    upazila: "Kalapara",
    division: "Barishal",
    categories: ["Religious", "Heritage"],
    difficulty: "Easy",
    summary: "A Rakhine Buddhist temple next to Kuakata beach, with a large Buddha statue and the old well that named the town.",
    description: [
      "Kuakata's Rakhine community, Buddhists who settled on this coast generations ago, keep a temple called the Sima Buddhist Vihara (Sima Bihar) close to the beach area. Inside sits a large metal Buddha statue that is one of the main sights in town.",
      "Right beside it is the old 'kua' — a well said to have been dug by the Rakhine settlers. The town's name, Kuakata, comes from this well ('kua' = well, 'kata' = dug).",
      "It is a short walk or rickshaw ride from the beach, and an easy way to learn about Kuakata beyond the sea.",
    ],
    highlights: [
      "Large Buddha statue inside the temple",
      "The historic well that gave Kuakata its name",
      "Rakhine village and handloom shops nearby",
      "Quiet break from the busy beach",
    ],
    howToReach: [
      {
        title: "From Dhaka to Kuakata",
        detail: "Direct AC or non-AC bus via the Padma Bridge, about 6–9 hours, approx. ৳800–1,500. Or overnight launch to Patuakhali (about 10–12 hours, approx. ৳400–3,000) and then bus to Kuakata (about 2 hours).",
        mode: "ac-bus",
      },
      {
        title: "From Kuakata beach",
        detail: "The temple is close to the main beach area. Walk, or take a rickshaw / easy-bike for about 5–10 minutes, approx. ৳20–50.",
        mode: "easy-bike",
      },
    ],
    bestTime: "November – February",
    timeNeeded: "30–60 minutes",
    entryFee: "Free or a small fee (approx. ৳10–20)",
    openingHours: "Roughly daytime, about 08:00–18:00 (approx.)",
    tips: [
      "Remove shoes before entering the shrine.",
      "Do not touch or pose disrespectfully with the Buddha statue.",
      "Buy Rakhine handwoven shawls and bags from local shops to support the community.",
    ],
    map: { lat: 21.8237, lng: 90.1207 },
  },

  /* ------------------------------ Jhalokathi ----------------------------- */
  {
    slug: "kirtipasha-zamindar-bari",
    name: "Kirtipasha Zamindar Bari",
    localName: "কীর্তিপাশা জমিদার বাড়ি",
    district: "Jhalokathi",
    upazila: "Jhalokathi Sadar",
    division: "Barishal",
    categories: ["Heritage"],
    difficulty: "Easy",
    summary: "Crumbling palaces, temples and a big pond of an old landlord family in a green village near Jhalokathi.",
    description: [
      "Kirtipasha is a village a short drive west of Jhalokathi town. In the 19th century it was the seat of a wealthy Hindu zamindar (landlord) family, who built two palace compounds, temples, a school and large ponds here.",
      "Today most of the buildings are in ruins, wrapped in roots and moss, but you can still see grand stairways, arched doorways and a decorated entrance gate. Part of the old estate is used as a school, which keeps the grounds alive.",
      "It is a quiet, atmospheric place for photography and a glimpse of rural Bengal's colonial-era history, easy to pair with the floating guava market in season.",
    ],
    highlights: [
      "Old palace ruins with arches and stairways",
      "Ornate entrance gate",
      "Large pond with a bathing ghat",
      "Small temples and shrines on the estate",
    ],
    howToReach: [
      {
        title: "From Dhaka to Jhalokathi",
        detail: "Overnight launch from Sadarghat to Barishal (about 8–10 hours, approx. ৳400–2,500+) then bus to Jhalokathi (about 45 minutes), or a direct bus from Dhaka via the Padma Bridge (about 5–6 hours, approx. ৳600–900).",
        mode: "launch",
      },
      {
        title: "From Jhalokathi town",
        detail: "Easy-bike or CNG to Kirtipasha, about 20–30 minutes, approx. ৳30–50 shared or ৳200–400 reserved.",
        mode: "easy-bike",
      },
    ],
    bestTime: "October – March",
    timeNeeded: "1–2 hours",
    entryFee: "Free",
    openingHours: "Open in daylight; part of the grounds is a school, so be quiet on school days.",
    tips: [
      "The ruins are fragile — don't climb broken walls or stairs.",
      "Some parts are private homes or a school; ask before entering.",
      "Wear closed shoes; the ground can be overgrown.",
    ],
    map: { lat: 22.633, lng: 90.145 },
  },

  /* ------------------------------- Pirojpur ------------------------------ */
  {
    slug: "atghar-kuriana-floating-market",
    name: "Atghar-Kuriana Floating Market",
    localName: "আটঘর-কুড়িয়ানা ভাসমান বাজার",
    district: "Pirojpur",
    upazila: "Nesarabad (Swarupkathi)",
    division: "Barishal",
    categories: ["River", "Wetland"],
    difficulty: "Easy",
    summary: "Canal-side guava and boat markets among the orchards of Swarupkathi — busiest in July–August.",
    description: [
      "Atghar and Kuriana are villages in Nesarabad (Swarupkathi) upazila, deep in the canal country of Pirojpur. Guava, lemon and hog-plum orchards line the waterways, and farmers bring their harvest to market by boat.",
      "In guava season, roughly July to August, wooden boats loaded with fruit gather on the canal at Kuriana and Atghar to trade. During the monsoon, Kuriana also holds a well-known weekly boat market (noukar haat) where newly built wooden country boats are sold.",
      "The area is just across the canals from Bhimruli in Jhalokathi, so many visitors see both by boat on the same day.",
    ],
    highlights: [
      "Boats piled high with guavas trading on the canal",
      "Weekly monsoon boat market (noukar haat) at Kuriana",
      "Boat ride through guava orchards",
      "Village life along narrow canals",
    ],
    howToReach: [
      {
        title: "From Dhaka to Barishal or Swarupkathi",
        detail: "Overnight launch from Sadarghat to Barishal (about 8–10 hours, approx. ৳400–2,500+), or a direct bus to Swarupkathi via the Padma Bridge (about 5–6 hours, approx. ৳600–900).",
        mode: "launch",
      },
      {
        title: "From Barishal / Swarupkathi to Kuriana",
        detail: "Bus or CNG from Barishal to Swarupkathi (about 1–1.5 hours, approx. ৳80–120), then easy-bike or CNG to Kuriana, about 20–30 minutes, approx. ৳40–200.",
        mode: "cng",
      },
      {
        title: "On the water",
        detail: "Hire a small boat at Kuriana or Atghar for 1–2 hours, approx. ৳500–1,500 — it can also take you across to Bhimruli.",
      },
    ],
    bestTime: "Roughly mid-July – August (guava season), early morning.",
    timeNeeded: "Half day",
    entryFee: "Free (boat hire extra)",
    openingHours: "Most active from early morning to about noon in season.",
    tips: [
      "Outside the guava season the canals are quiet — check local reports before travelling.",
      "Carry rain gear and a waterproof phone bag; it is monsoon time.",
      "Agree on the boat fare and route before boarding.",
    ],
    map: { lat: 22.7065, lng: 90.0905 },
  },
  {
    slug: "kuriana-boat-market",
    name: "Kuriana Boat Market (Noukar Haat)",
    localName: "কুড়িয়ানা নৌকার হাট",
    district: "Pirojpur",
    upazila: "Nesarabad (Swarupkathi)",
    division: "Barishal",
    categories: ["River"],
    difficulty: "Easy",
    summary: "A riverside market where hundreds of brand-new wooden boats are sold each week in the monsoon.",
    description: [
      "Swarupkathi is famous across Bangladesh for its timber trade and boat building. In the monsoon, when villagers in the canal country need boats to get around, carpenters bring hundreds of freshly built wooden boats to the weekly noukar haat (boat market) at Kuriana.",
      "The boats are lined up side by side along the riverbank, fresh wood shining, while buyers from nearby villages bargain with the boat makers. From above, the rows of boats make a striking pattern.",
      "It is a colourful slice of river life that few foreign visitors see, and it sits right next to the Atghar-Kuriana guava market, so you can enjoy both on one trip.",
    ],
    highlights: [
      "Rows of brand-new wooden country boats on the riverbank",
      "Watching boat makers and buyers bargain",
      "Swarupkathi's famous timber and carpentry trade",
      "Easy to combine with the guava floating market in season",
    ],
    howToReach: [
      {
        title: "From Dhaka to Barishal or Swarupkathi",
        detail: "Overnight launch from Sadarghat to Barishal (about 8–10 hours, approx. ৳400–2,500+), or a direct bus to Swarupkathi via the Padma Bridge (about 5–6 hours, approx. ৳600–900).",
        mode: "launch",
      },
      {
        title: "From Swarupkathi to Kuriana",
        detail: "Easy-bike or CNG from Swarupkathi town to Kuriana, about 20–30 minutes, approx. ৳40–200. Local boats also run along the canals.",
        mode: "easy-bike",
      },
    ],
    bestTime: "Monsoon, roughly June – October; the market is weekly (often Friday — confirm locally).",
    timeNeeded: "1–2 hours",
    entryFee: "Free",
    openingHours: "Weekly market day only, busiest in the morning (approx.).",
    tips: [
      "Check the market day with locals or your hotel before going — it is not held every day.",
      "Go early in the morning for the most boats and best light.",
      "Ask before photographing people up close.",
    ],
    map: { lat: 22.709, lng: 90.093 },
  },
  {
    slug: "rayerkathi-zamindar-bari",
    name: "Rayerkathi Zamindar Bari",
    localName: "রায়েরকাঠি জমিদার বাড়ি",
    district: "Pirojpur",
    upazila: "Pirojpur Sadar",
    division: "Barishal",
    categories: ["Heritage", "Religious"],
    difficulty: "Easy",
    summary: "An old landlord estate near Pirojpur town with weathered mansions, temples and a large Shiva lingam.",
    description: [
      "Rayerkathi is a village just outside Pirojpur town. It was the seat of a Hindu zamindar (landlord) family whose estate dates back several centuries, and many of their buildings still stand.",
      "You can walk among old brick mansions, some ruined and some still lived in, along with a group of temples. One temple houses a large black-stone Shiva lingam that draws Hindu pilgrims, especially during festivals.",
      "It is quiet and uncommercial — a good short trip if you are passing through Pirojpur and want a taste of the region's history.",
    ],
    highlights: [
      "Weathered brick mansions of the zamindar family",
      "Group of temples, including a large Shiva lingam",
      "Old ponds and village surroundings",
      "Festival crowds during Shivaratri (approx. February–March)",
    ],
    howToReach: [
      {
        title: "From Dhaka to Pirojpur",
        detail: "Direct bus via the Padma Bridge (about 5–6 hours, approx. ৳600–900), or overnight launch to Barishal (about 8–10 hours) and then bus to Pirojpur (about 1.5 hours, approx. ৳100–150).",
        mode: "non-ac-bus",
      },
      {
        title: "From Pirojpur town",
        detail: "Rickshaw, easy-bike or CNG to Rayerkathi, about 10–20 minutes (a few km), approx. ৳30–150.",
        mode: "easy-bike",
      },
    ],
    bestTime: "October – March",
    timeNeeded: "1–2 hours",
    entryFee: "Free",
    openingHours: "Roughly daylight hours; temples may close at midday.",
    tips: [
      "Remove shoes before entering temples, and ask before photographing worshippers.",
      "Some buildings are family homes — respect privacy.",
      "Don't climb on crumbling walls.",
    ],
    map: { lat: 22.5985, lng: 89.9905 },
  },

  /* -------------------------------- Bhola -------------------------------- */
  {
    slug: "char-kukri-mukri",
    name: "Char Kukri Mukri",
    localName: "চর কুকরি মুকরি",
    district: "Bhola",
    upazila: "Char Fasson",
    division: "Barishal",
    categories: ["Island", "Forest", "Wildlife", "Beach"],
    difficulty: "Moderate",
    summary: "A remote island at the mouth of the Meghna with planted mangrove forest, deer, birds and an empty beach.",
    description: [
      "Char Kukri Mukri is an island in the far south of Bhola, where the Meghna meets the Bay of Bengal. Much of it is covered by a planted mangrove forest, protected as the Char Kukri-Mukri Wildlife Sanctuary.",
      "Spotted deer, monkeys, wild buffalo, fishing cats and many birds live in the forest and mudflats. Narrow creeks wind through the trees, and a quiet sandy beach faces the open water.",
      "Few tourists come here, so facilities are basic. That remoteness is the charm: boat rides through mangrove creeks, a watch tower over the forest, and simple village life.",
    ],
    highlights: [
      "Boat ride through mangrove creeks",
      "Watch tower view over the forest",
      "Spotted deer and winter birds",
      "Quiet beach facing the Bay of Bengal",
    ],
    howToReach: [
      {
        title: "From Dhaka to Bhola / Char Fasson",
        detail: "Overnight launch from Sadarghat to Bhola or direct to Betua / Char Fasson (about 10–12 hours, approx. ৳400 deck to ৳2,500+ cabin).",
        mode: "launch",
      },
      {
        title: "From Char Fasson to Kachhopia ghat",
        detail: "CNG or motorbike from Char Fasson town to Kachhopia ghat, about 1 hour, approx. ৳300–600.",
        mode: "cng",
      },
      {
        title: "Boat to the island",
        detail: "Trawler or speedboat from Kachhopia ghat to Kukri Mukri, about 1–1.5 hours by trawler (approx. ৳50–100 shared) or faster by reserved speedboat (approx. ৳2,000–4,000).",
      },
    ],
    bestTime: "November – February (calm rivers, winter birds). Avoid the monsoon and cyclone season.",
    timeNeeded: "1–2 days",
    entryFee: "Free (boat hire extra)",
    openingHours: "Open all the time; boats run in daylight.",
    tips: [
      "Accommodation is very basic (a few rest houses or homestays) — arrange in advance through locals or a tour group.",
      "Check the weather before boat trips; the estuary can be rough.",
      "Carry cash, mosquito repellent, a power bank and some snacks.",
    ],
    map: { lat: 21.9406, lng: 90.6265 },
  },

  /* ------------------------------- Barguna ------------------------------- */
  {
    slug: "tengragiri-wildlife-sanctuary",
    name: "Tengragiri Wildlife Sanctuary (Sonakata Eco Park)",
    localName: "টেংরাগিরি বন্যপ্রাণী অভয়ারণ্য",
    district: "Barguna",
    upazila: "Taltoli",
    division: "Barishal",
    categories: ["Forest", "Wildlife", "Beach"],
    difficulty: "Easy",
    summary: "A coastal mangrove forest by the Bay of Bengal near Kuakata, with deer enclosures, crocodiles and a quiet beach.",
    description: [
      "Tengragiri is a large protected mangrove forest on the coast of Barguna, across the river from Kuakata. Locals often call it Fatrar Bon, and the visitor area is known as Sonakata Eco Park.",
      "The park has walking paths through the forest, a watch tower, enclosures with spotted deer and crocodiles, and small wooden bridges over creeks. Just beyond the trees is a long, almost empty beach.",
      "It feels much wilder and quieter than Kuakata. Many visitors take a boat from Kuakata to see it in a day.",
    ],
    highlights: [
      "Walk among mangrove trees and creeks",
      "Spotted deer and crocodile enclosures",
      "Watch tower and wooden bridges",
      "Quiet beach where the forest meets the sea",
    ],
    howToReach: [
      {
        title: "From Dhaka to Kuakata or Barguna",
        detail: "Direct bus to Kuakata via the Padma Bridge (about 6–9 hours, approx. ৳800–1,500), or overnight launch to Barguna (about 12–14 hours, approx. ৳400–2,500).",
        mode: "ac-bus",
      },
      {
        title: "From Kuakata",
        detail: "Hire a trawler or speedboat from the Kuakata beach area to the Fatrar Bon / Sonakata side, about 1–1.5 hours (approx. ৳300–500 per person in a shared trawler). By road, motorbike via Taltoli takes about 1.5 hours.",
      },
    ],
    bestTime: "November – February",
    timeNeeded: "Half day",
    entryFee: "≈ ৳20–30 (approx.) for the eco park",
    openingHours: "Daylight hours (approx. 09:00–17:00)",
    tips: [
      "Boats depend on the tide and weather — confirm the return time before leaving.",
      "Stay on marked paths; the forest is home to wild animals and snakes.",
      "Carry water and food; shops are few.",
    ],
    map: { lat: 21.9420, lng: 89.9900 },
  },
];
