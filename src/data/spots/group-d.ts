/**
 * ============================================================================
 *  Spots — Group D: port city, palaces, shrines & the far north
 * ============================================================================
 *  Districts covered:
 *    Chattogram, Cumilla, Chandpur (Chattogram division)
 *    Rajshahi, Natore (Rajshahi division) · Rangpur, Panchagarh (Rangpur division)
 *    Kushtia (Khulna division) · Barishal, Jhalokathi (Barishal division)
 *    Netrokona, Mymensingh (Mymensingh division) · Gazipur (Dhaka division)
 *    Habiganj (Sylhet division)
 *
 *  Prices are in BDT and approximate — fees and fares change often.
 *  Photos are NOT stored here; they are looked up by slug in photos.ts.
 * ============================================================================
 */
import type { Spot } from "@/types/spot";

export const SPOTS_D: Spot[] = [
  /* ----------------------------- Chattogram ----------------------------- */
  {
    slug: "patenga-beach",
    name: "Patenga Beach",
    localName: "পতেঙ্গা সমুদ্র সৈকত",
    district: "Chattogram",
    upazila: "Patenga",
    division: "Chattogram",
    categories: ["Beach", "City"],
    difficulty: "Easy",
    summary: "Chattogram's city beach at the mouth of the Karnaphuli, with ships offshore and lively evening food stalls.",
    description: [
      "Patenga is a long sea beach on the southern edge of Chattogram city, where the Karnaphuli River meets the Bay of Bengal. It is not a white-sand holiday beach like Cox's Bazar. Much of the shore is protected by concrete blocks and a sea wall, and big cargo ships wait offshore for the port.",
      "Locals come here in the late afternoon to walk the promenade, eat fried crab and fish snacks, ride horses and watch the sunset. Weekends and holidays are very busy and festive.",
      "It is close to Shah Amanat International Airport, so it is an easy stop if you have a few hours in Chattogram.",
    ],
    highlights: [
      "Sunset over the Bay of Bengal with ships on the horizon",
      "Evening food stalls selling fried crab, fish and jhal muri",
      "Promenade walk along the sea wall",
      "Views of planes landing at the nearby airport",
    ],
    howToReach: [
      {
        title: "From Dhaka to Chattogram",
        detail: "Intercity train to Chattogram station (about 5–6 hours, approx. ৳400–1,200) or AC bus (about 5–7 hours, approx. ৳700–1,500). Flights take about 50 minutes.",
        mode: "train",
      },
      {
        title: "From Chattogram city (GEC / station)",
        detail: "CNG auto-rickshaw to Patenga Beach. About 40–60 minutes depending on traffic, approx. ৳300–450.",
        mode: "cng",
      },
      {
        title: "By ride-share app",
        detail: "Uber or Pathao car to \"Patenga Sea Beach\". About 40–60 minutes from the city centre, approx. ৳350–600.",
        mode: "ride-share",
      },
    ],
    bestTime: "October – March. Late afternoon for sunset; avoid stormy monsoon days.",
    timeNeeded: "2–3 hours",
    entryFee: "Free",
    openingHours: "Open all day; most visitors come from late afternoon until about 21:00.",
    tips: [
      "Do not swim where flags, signs or police say no — currents are strong and the water near the river mouth is busy with ships.",
      "Concrete blocks along the shore are slippery; wear shoes with grip.",
      "Agree on prices before eating at stalls or taking a horse ride.",
      "Weekday evenings are much calmer than Fridays and holidays.",
    ],
    map: { lat: 22.2357, lng: 91.7915 },
  },
  {
    slug: "foys-lake",
    name: "Foy's Lake",
    localName: "ফয়েজ লেক",
    district: "Chattogram",
    upazila: "Khulshi",
    division: "Chattogram",
    categories: ["Lake", "Hills", "City"],
    difficulty: "Easy",
    summary: "A hill-ringed man-made lake in Chattogram, now an amusement and boating park with a small resort.",
    description: [
      "Foy's Lake is a man-made lake built in 1924 by the Assam Bengal Railway. It is tucked between low green hills in the north of Chattogram city and is named after a railway engineer.",
      "Today the area is run by a private company as a leisure park. There is an amusement park, a water park, boat rides on the lake and a resort with cottages. Families and school groups make it busy on weekends.",
      "If rides are not your thing, the boat trip across the lake and the views of the hills are the main reason to come.",
    ],
    highlights: [
      "Boat ride between green hills on the lake",
      "Amusement park and separate water park (Sea World)",
      "Lakeside resort cottages for an overnight stay",
      "Chattogram Zoo is right next door",
    ],
    howToReach: [
      {
        title: "From Dhaka to Chattogram",
        detail: "Intercity train (about 5–6 hours, approx. ৳400–1,200) or AC bus (about 5–7 hours, approx. ৳700–1,500) to Chattogram.",
        mode: "train",
      },
      {
        title: "From Chattogram city (GEC Circle)",
        detail: "CNG auto-rickshaw to Foy's Lake, about 15–25 minutes, approx. ৳120–200.",
        mode: "cng",
      },
      {
        title: "By ride-share app",
        detail: "Uber or Pathao car to \"Foy's Lake\". About 15–30 minutes, approx. ৳150–300.",
        mode: "ride-share",
      },
    ],
    bestTime: "October – March. Weekday mornings are quietest.",
    timeNeeded: "2–4 hours",
    entryFee: "≈ ৳300+ entry; rides, boats and water park cost extra (approx. — packages change often)",
    openingHours: "Roughly 10:00–18:00 daily (water park hours differ) — check before you go.",
    tips: [
      "Combo tickets including rides are usually better value than paying per ride.",
      "Visit the Chattogram Zoo next door in the same trip.",
      "Bring sun protection — there is little shade on the boats.",
    ],
    map: { lat: 22.3712, lng: 91.7918 },
  },

  /* ------------------------------- Cumilla ------------------------------- */
  {
    slug: "mainamati",
    name: "Mainamati Ruins & Shalban Vihara",
    localName: "ময়নামতি ও শালবন বিহার",
    district: "Cumilla",
    upazila: "Cumilla Sadar Dakshin (Kotbari)",
    division: "Chattogram",
    categories: ["Heritage"],
    difficulty: "Easy",
    summary: "Brick ruins of 7th–12th-century Buddhist monasteries on the Lalmai hills, with a site museum at Kotbari.",
    description: [
      "The Mainamati–Lalmai ridge near Cumilla holds more than 50 Buddhist sites from about the 7th to 12th centuries. The best known is Shalban Vihara, a square monastery with around 115 monks' cells built around a central temple.",
      "Next to it, the Mainamati Museum displays bronze Buddha statues, terracotta plaques, coins and other finds from the excavations. Together they make a good half-day trip.",
      "Some other mounds, such as Kotila Mura and Charpatra Mura, are inside a military area and may not be open to visitors.",
    ],
    highlights: [
      "Shalban Vihara's square monastery and central shrine",
      "Mainamati Museum's bronzes and terracotta plaques",
      "Green Lalmai hills and the Kotbari area (BARD campus)",
      "Nearby Cumilla War Cemetery from World War II",
    ],
    howToReach: [
      {
        title: "From Dhaka to Cumilla",
        detail: "AC or non-AC bus from Sayedabad or Kamalapur to Cumilla, about 2–3 hours, approx. ৳250–600.",
        mode: "ac-bus",
      },
      {
        title: "From Cumilla town (Kandirpar) or the highway",
        detail: "CNG auto-rickshaw to Shalban Vihara at Kotbari, about 20–30 minutes, approx. ৳150–300.",
        mode: "cng",
      },
      {
        title: "Between sites",
        detail: "Easy-bikes run around Kotbari; the museum and Shalban Vihara are a short walk apart. Approx. ৳20–50 per hop.",
        mode: "easy-bike",
      },
    ],
    bestTime: "October – March.",
    timeNeeded: "2–4 hours",
    entryFee: "≈ ৳20–30 locals · ৳200–500 foreigners per site (approx.)",
    openingHours: "Roughly 10:00–17:00 (shorter in winter, Friday prayer break). Usually closed one weekday (often Sunday) — check before you go.",
    tips: [
      "Do not climb on the ancient brick walls.",
      "Combine with the Commonwealth War Cemetery on the way back to Cumilla town.",
      "Try Cumilla's famous rasmalai before you leave.",
    ],
    map: { lat: 23.4269, lng: 91.1377 },
  },

  /* ------------------------------- Rajshahi ------------------------------ */
  {
    slug: "puthia-temples",
    name: "Puthia Temple Complex",
    localName: "পুঠিয়া মন্দির কমপ্লেক্স",
    district: "Rajshahi",
    upazila: "Puthia",
    division: "Rajshahi",
    categories: ["Heritage", "Religious"],
    difficulty: "Easy",
    summary: "A village packed with terracotta Hindu temples and a zamindar palace, around quiet ponds near Rajshahi.",
    description: [
      "Puthia has one of the largest groups of old Hindu temples in Bangladesh. They were built mostly in the 18th and 19th centuries by the Puthia zamindars (landlord family), whose large palace still stands beside a pond.",
      "The highlights are the tall Shiva Temple (1823), the Govinda Temple covered in fine terracotta panels, and the curved-roof Jagannath Temple. Everything is within walking distance.",
      "It is a calm, village-like place and an easy half-day trip from Rajshahi city.",
    ],
    highlights: [
      "Pancharatna Shiva Temple beside Shiv Sagar pond",
      "Terracotta panels on the Govinda Temple",
      "Puthia Rajbari (zamindar palace) facade",
      "Small Jagannath and Dol Mancha temples",
    ],
    howToReach: [
      {
        title: "From Dhaka to Rajshahi",
        detail: "Intercity train (Silk City / Padma, about 5–6 hours, approx. ৳400–1,200), AC bus (about 5–6 hours, approx. ৳700–1,400) or a short flight.",
        mode: "train",
      },
      {
        title: "From Rajshahi city",
        detail: "Bus or CNG along the Natore road to Puthia (about 30 km), about 45–60 minutes, approx. ৳50–80 by bus or ৳400–600 for a reserved CNG.",
        mode: "non-ac-bus",
      },
      {
        title: "From Puthia bus stand",
        detail: "Easy-bike or rickshaw to the temple area, about 5–10 minutes, approx. ৳20–50.",
        mode: "easy-bike",
      },
    ],
    bestTime: "October – March.",
    timeNeeded: "2–3 hours",
    entryFee: "Mostly free to walk around; some buildings may charge a small fee (approx.)",
    openingHours: "Grounds open in daylight hours; individual temples may be locked at times.",
    tips: [
      "Remove shoes before entering active temples and ask before photographing worshippers.",
      "Combine with Natore Rajbari, about 30 minutes further east.",
      "Morning light is best for photos of the terracotta work.",
    ],
    map: { lat: 24.3627, lng: 88.8347 },
  },
  {
    slug: "varendra-museum",
    name: "Varendra Research Museum",
    localName: "বরেন্দ্র গবেষণা জাদুঘর",
    district: "Rajshahi",
    upazila: "Boalia",
    division: "Rajshahi",
    categories: ["Heritage", "City"],
    difficulty: "Easy",
    summary: "Bangladesh's oldest museum (1910), with fine stone sculptures and Pala-era finds from North Bengal.",
    description: [
      "Founded in 1910, the Varendra Research Museum is the oldest museum in Bangladesh. It is now run by the University of Rajshahi and sits in the centre of Rajshahi city.",
      "Its galleries hold Hindu and Buddhist stone and bronze sculptures, terracotta, coins, inscriptions and old manuscripts, many from the Pala and Sena periods. Finds from Paharpur and Mahasthangarh are also shown.",
      "The building itself mixes local and European styles. It is small enough to see in an hour or two.",
    ],
    highlights: [
      "Black-stone Hindu and Buddhist sculptures",
      "Objects from Paharpur and Mahasthangarh",
      "Old coins, inscriptions and Sanskrit manuscripts",
      "The 1910s museum building",
    ],
    howToReach: [
      {
        title: "From Dhaka to Rajshahi",
        detail: "Intercity train (about 5–6 hours, approx. ৳400–1,200), AC bus (about 5–6 hours, approx. ৳700–1,400) or a flight.",
        mode: "train",
      },
      {
        title: "Within Rajshahi city",
        detail: "Rickshaw or easy-bike to the museum near Hetem Khan / Sapura area, about 10–20 minutes from the station, approx. ৳30–80.",
        mode: "rickshaw",
      },
    ],
    bestTime: "Year-round (indoors); October – March is most comfortable.",
    timeNeeded: "1–2 hours",
    entryFee: "≈ ৳20–30 locals · higher for foreigners (approx.)",
    openingHours: "Roughly 10:00–16:30. Usually closed one or two weekdays (often Thursday) — check before you go.",
    tips: [
      "Photography may be restricted inside; ask at the ticket counter.",
      "Bags may need to be left at the entrance.",
      "Walk to the Padma riverbank afterwards for sunset.",
    ],
    map: { lat: 24.3643, lng: 88.5965 },
  },

  /* -------------------------------- Natore ------------------------------- */
  {
    slug: "natore-rajbari",
    name: "Natore Rajbari",
    localName: "নাটোর রাজবাড়ী",
    district: "Natore",
    upazila: "Natore Sadar",
    division: "Rajshahi",
    categories: ["Heritage"],
    difficulty: "Easy",
    summary: "The palace grounds of Rani Bhabani, the 18th-century queen of Natore, with ponds, temples and old mansions.",
    description: [
      "Natore Rajbari was the seat of the Natore Raj family, one of the richest zamindar estates in Bengal. It is most linked with Rani Bhabani, an 18th-century woman ruler known for her charity and good governance.",
      "The large walled estate has several palace buildings, temples and big ponds among old trees. Many buildings are faded, but the setting is peaceful and good for a slow walk.",
      "Nearby, Uttara Gonobhaban (Dighapatia Palace) is another grand palace used by the government and worth combining.",
    ],
    highlights: [
      "Rani Bhabani's palace buildings and gateways",
      "Large ponds and shady gardens inside the estate",
      "Old temples within the grounds",
      "Uttara Gonobhaban (Dighapatia Palace) nearby",
    ],
    howToReach: [
      {
        title: "From Dhaka to Natore",
        detail: "Intercity train towards Rajshahi or the north, stopping at Natore (about 4–5 hours, approx. ৳350–1,000), or bus (about 4–5 hours, approx. ৳500–1,000).",
        mode: "train",
      },
      {
        title: "From Natore town",
        detail: "Rickshaw or easy-bike to the Rajbari, about 10–15 minutes, approx. ৳30–60.",
        mode: "rickshaw",
      },
    ],
    bestTime: "October – March.",
    timeNeeded: "1–2 hours",
    entryFee: "≈ ৳20–30 (approx.)",
    openingHours: "Roughly 09:00–17:00 — check before you go.",
    tips: [
      "Try Natore's famous kancha golla sweet in town.",
      "Uttara Gonobhaban may need permission or have limited opening times — ask locally.",
      "Easy to combine with Puthia temples on a Rajshahi trip.",
    ],
    map: { lat: 24.4205, lng: 88.9935 },
  },

  /* -------------------------------- Rangpur ------------------------------ */
  {
    slug: "tajhat-palace",
    name: "Tajhat Palace (Rangpur Museum)",
    localName: "তাজহাট জমিদার বাড়ি",
    district: "Rangpur",
    upazila: "Rangpur Sadar",
    division: "Rangpur",
    categories: ["Heritage"],
    difficulty: "Easy",
    summary: "A white early-1900s zamindar palace with a grand marble staircase, now the Rangpur Museum.",
    description: [
      "Tajhat Palace was built in the early 20th century by Maharaja Kumar Gopal Lal Roy, a zamindar (landlord) said to have made his fortune from jewellery. Its white facade, central dome and wide marble staircase make it one of the most photographed palaces in Bangladesh.",
      "The palace now houses the Rangpur Museum, with terracotta, old manuscripts, Sanskrit and Arabic texts, and other local finds.",
      "Lawns and ponds surround the building, and it is a short ride from Rangpur city centre.",
    ],
    highlights: [
      "Grand marble staircase and white palace facade",
      "Rangpur Museum collection inside",
      "Gardens and ponds in front of the palace",
    ],
    howToReach: [
      {
        title: "From Dhaka to Rangpur",
        detail: "AC bus (about 7–9 hours, approx. ৳900–1,600), intercity train Rangpur Express (about 8–10 hours, approx. ৳500–1,500), or fly to Saidpur and drive about 1 hour.",
        mode: "ac-bus",
      },
      {
        title: "From Rangpur city",
        detail: "Easy-bike or rickshaw to Tajhat, about 15–20 minutes, approx. ৳40–80.",
        mode: "easy-bike",
      },
    ],
    bestTime: "October – March.",
    timeNeeded: "1–2 hours",
    entryFee: "≈ ৳20–30 locals · ৳200–500 foreigners (approx.)",
    openingHours: "Roughly 10:00–17:00 (shorter in winter). Usually closed one weekday (often Sunday) — check before you go.",
    tips: [
      "Photography inside the museum may be restricted.",
      "Visit in the afternoon for warm light on the white facade.",
      "Combine with Carmichael College, another grand old building in Rangpur.",
    ],
    map: { lat: 25.7248, lng: 89.2716 },
  },

  /* ------------------------------ Panchagarh ----------------------------- */
  {
    slug: "tetulia-kanchenjunga",
    name: "Tetulia & Kanchenjunga View",
    localName: "তেঁতুলিয়া ও কাঞ্চনজঙ্ঘা",
    district: "Panchagarh",
    upazila: "Tetulia",
    division: "Rangpur",
    categories: ["River", "Tea Garden", "Hills"],
    difficulty: "Easy",
    summary: "Bangladesh's northern tip: on clear autumn mornings, snowy Kanchenjunga rises over the Mahananda river.",
    description: [
      "Tetulia is a small town at the very top of Bangladesh, next to the Mahananda River and the Indian border. On clear mornings, mostly from mid-October to early December (sometimes into February), you can see the snow peaks of Kanchenjunga, the world's third-highest mountain, far to the north.",
      "The view is best from the old Tetulia Dak Bungalow and the riverbank picnic area. Flat tea gardens surround the area, and people collect stones from the Mahananda riverbed.",
      "About 17 km further north is Banglabandha, the northernmost point of Bangladesh and an official land-port and border crossing with India (the \"zero point\").",
    ],
    highlights: [
      "Kanchenjunga at sunrise on clear days",
      "Tetulia Dak Bungalow viewpoint by the Mahananda",
      "Flat-land tea gardens of Panchagarh",
      "Banglabandha zero point, the northernmost tip of Bangladesh",
    ],
    howToReach: [
      {
        title: "From Dhaka to Panchagarh",
        detail: "Night AC bus (about 10–12 hours, approx. ৳1,000–1,800) or intercity train Panchagarh Express / Dolonchapa (about 9–12 hours, approx. ৳600–1,700).",
        mode: "ac-bus",
      },
      {
        title: "From Panchagarh town to Tetulia",
        detail: "Local bus or reserved CNG, about 1–1.5 hours (about 40 km), approx. ৳60–100 by bus or ৳800–1,200 by CNG.",
        mode: "non-ac-bus",
      },
      {
        title: "From Tetulia to Banglabandha",
        detail: "Easy-bike or CNG, about 30–40 minutes, approx. ৳300–600 reserved.",
        mode: "easy-bike",
      },
    ],
    bestTime: "Mid-October – early December for the best chance of a clear mountain view; go at sunrise.",
    timeNeeded: "1–2 days (stay overnight in Tetulia for the morning view)",
    entryFee: "Free (Dak Bungalow grounds may charge a small fee, approx.)",
    openingHours: "Open all day. The mountain is usually visible only in the early morning before haze builds.",
    tips: [
      "Kanchenjunga is visible only on clear days — it is never guaranteed. Plan two mornings if you can.",
      "Banglabandha is an active border crossing: do not step past the zero-point markers or the BGB guard lines, and ask before photographing officials.",
      "Bring warm layers — winter mornings in the far north are cold and foggy.",
      "Book a room in Tetulia or Panchagarh early during peak season.",
    ],
    map: { lat: 26.4878, lng: 88.354 },
  },

  /* ------------------------------- Kushtia ------------------------------- */
  {
    slug: "lalon-mazar",
    name: "Lalon Shah's Shrine (Lalon Akhra)",
    localName: "লালন শাহের মাজার, ছেঁউড়িয়া",
    district: "Kushtia",
    upazila: "Kumarkhali (Cheuria)",
    division: "Khulna",
    categories: ["Religious", "Heritage"],
    difficulty: "Easy",
    summary: "The shrine of mystic poet Lalon Shah at Cheuria, where Baul singers gather to play his songs.",
    description: [
      "Lalon Shah (died 1890) was a Baul saint, poet and songwriter whose songs question caste and religious divisions. His shrine (mazar) at Cheuria, on the edge of Kushtia town, is a place of pilgrimage for Bauls and music lovers.",
      "On most evenings Baul musicians sit around the shrine and sing with the ektara (one-string instrument). The complex also has an auditorium and a small museum.",
      "Twice a year, around Lalon's death anniversary in October and at Dol Purnima in March, huge festivals draw tens of thousands of people for days of music.",
    ],
    highlights: [
      "Baul singers performing Lalon's songs at the shrine",
      "Lalon's tomb and the akhra (gathering place)",
      "Small Lalon museum on site",
      "October and March festivals (very crowded)",
    ],
    howToReach: [
      {
        title: "From Dhaka to Kushtia",
        detail: "AC or non-AC bus via the Padma Bridge, about 4–6 hours, approx. ৳600–1,200. Some trains reach nearby Poradaha / Kushtia Court station.",
        mode: "ac-bus",
      },
      {
        title: "From Kushtia town (Majampur / NS Road)",
        detail: "Rickshaw or easy-bike to Cheuria, about 15–20 minutes, approx. ৳30–60.",
        mode: "easy-bike",
      },
    ],
    bestTime: "October – March. Evenings for music; festival dates for atmosphere (if you are fine with huge crowds).",
    timeNeeded: "1–3 hours",
    entryFee: "Free (donations welcome)",
    openingHours: "Open daily; music usually in the evening.",
    tips: [
      "Remove shoes near the shrine and dress modestly.",
      "Ask before photographing singers; a small tip for musicians is appreciated.",
      "During the October/March festivals crowds are enormous — guard valuables and book rooms well ahead.",
      "Combine with Shilaidaha Kuthibari, Tagore's house across the river.",
    ],
    map: { lat: 23.8927, lng: 89.1478 },
  },
  {
    slug: "shilaidaha-kuthibari",
    name: "Shilaidaha Kuthibari (Tagore's House)",
    localName: "শিলাইদহ কুঠিবাড়ী",
    district: "Kushtia",
    upazila: "Kumarkhali",
    division: "Khulna",
    categories: ["Heritage"],
    difficulty: "Easy",
    summary: "Rabindranath Tagore's riverside estate house, where he wrote many poems of Gitanjali, now a museum.",
    description: [
      "Shilaidaha Kuthibari was the estate office and house of the Tagore family, who were zamindars in this area. Rabindranath Tagore stayed here often in the 1890s and later, writing many of his best-known poems and songs, including parts of Gitanjali.",
      "The three-storey house with its distinctive pyramid-tiered roof is now a museum with photos, furniture and items used by Tagore, including his boat-house items and a bed.",
      "The house is surrounded by gardens, ponds and mango trees, and is close to the Padma River.",
    ],
    highlights: [
      "Tagore's three-storey house with its stepped roof",
      "Museum of photos and personal items",
      "Gardens, ponds and the walk towards the Padma",
      "Tagore festival in May (Boishakh) with music and fairs",
    ],
    howToReach: [
      {
        title: "From Dhaka to Kushtia",
        detail: "AC or non-AC bus via the Padma Bridge, about 4–6 hours, approx. ৳600–1,200.",
        mode: "ac-bus",
      },
      {
        title: "From Kushtia town",
        detail: "Reserved CNG or easy-bike to Shilaidaha (about 15–20 km), about 40–60 minutes, approx. ৳400–700 return with waiting.",
        mode: "cng",
      },
    ],
    bestTime: "October – March; early May for the Tagore birth-anniversary fair.",
    timeNeeded: "1–2 hours (plus travel)",
    entryFee: "≈ ৳20–30 locals · ৳200–500 foreigners (approx.)",
    openingHours: "Roughly 10:00–17:00. Usually closed one weekday (often Sunday) — check before you go.",
    tips: [
      "Hire a CNG for a half day to see both Shilaidaha and Lalon's shrine.",
      "Photography rules inside the museum can change — ask first.",
      "Carry water; there are few shops near the site.",
    ],
    map: { lat: 23.9233, lng: 89.2228 },
  },

  /* ------------------------------- Barishal ------------------------------ */
  {
    slug: "durga-sagar",
    name: "Durga Sagar",
    localName: "দুর্গাসাগর দিঘি",
    district: "Barishal",
    upazila: "Babuganj (Madhabpasha)",
    division: "Barishal",
    categories: ["Lake"],
    difficulty: "Easy",
    summary: "A huge 18th-century tank lake near Barishal with a wooded island, walking paths and winter birds.",
    description: [
      "Durga Sagar is one of the largest man-made ponds (dighi) in southern Bangladesh. It was dug in the late 1700s by order of a local raja and named after his mother, Rani Durgavati.",
      "A tree-lined path runs right around the lake, and a small island sits in the middle. In winter, migratory birds visit the water.",
      "It is a quiet, green spot popular with local families and an easy short trip from Barishal city.",
    ],
    highlights: [
      "Walk around the tree-lined lake banks",
      "Small wooded island in the middle",
      "Migratory birds in winter",
      "Paddle boats (seasonal)",
    ],
    howToReach: [
      {
        title: "From Dhaka to Barishal",
        detail: "Overnight launch from Sadarghat (about 8–10 hours, approx. ৳400 deck to ৳2,500+ cabin) or AC bus via the Padma Bridge (about 4–5 hours, approx. ৳600–1,000).",
        mode: "launch",
      },
      {
        title: "From Barishal city (Nathullabad)",
        detail: "Bus, easy-bike or reserved CNG towards Banaripara road to Madhabpasha, about 30–45 minutes (about 11 km), approx. ৳40–60 shared or ৳300–500 reserved.",
        mode: "cng",
      },
    ],
    bestTime: "November – February for birds and pleasant weather.",
    timeNeeded: "1–2 hours",
    entryFee: "≈ ৳20–30 (approx.)",
    openingHours: "Roughly daylight hours (about 09:00–17:30) — check before you go.",
    tips: [
      "Combine with the floating guava market in Jhalokathi / Swarupkathi in season.",
      "Weekdays are quieter than Fridays.",
      "Bring mosquito repellent if staying towards dusk.",
    ],
    map: { lat: 22.7618, lng: 90.2584 },
  },

  /* ------------------------------ Jhalokathi ----------------------------- */
  {
    slug: "floating-guava-market",
    name: "Bhimruli Floating Guava Market",
    localName: "ভীমরুলী ভাসমান পেয়ারা বাজার",
    district: "Jhalokathi",
    upazila: "Jhalokathi Sadar",
    division: "Barishal",
    categories: ["River", "Wetland"],
    difficulty: "Easy",
    summary: "Farmers sell guavas from wooden boats on a backwater canal — Bangladesh's floating market in July–August.",
    description: [
      "In the backwaters where Jhalokathi, Pirojpur (Swarupkathi) and Barishal meet, guava orchards line narrow canals. In season, farmers pile their harvest into small wooden boats and trade directly on the water. Bhimruli is the best-known of these floating markets.",
      "The busiest time is roughly mid-July to August, the peak of guava season. Mornings are the liveliest, when dozens of boats crowd the canal junction.",
      "Hire a small boat to drift through the canals and orchards, or nearby Atghar-Kuriana. Many visitors buy guavas straight from the boats.",
    ],
    highlights: [
      "Boats loaded with green guavas trading on the canal",
      "Boat ride through guava orchards and village canals",
      "Atghar-Kuriana floating market nearby (Pirojpur side)",
      "Fresh guava straight from the farmers",
    ],
    howToReach: [
      {
        title: "From Dhaka to Barishal",
        detail: "Overnight launch from Sadarghat (about 8–10 hours, approx. ৳400–2,500+) or AC bus via the Padma Bridge (about 4–5 hours, approx. ৳600–1,000).",
        mode: "launch",
      },
      {
        title: "From Barishal to Jhalokathi / Bhimruli",
        detail: "Bus or CNG to Jhalokathi town (about 45 minutes, approx. ৳50–80), then reserved CNG or easy-bike to Bhimruli, about 30–45 minutes, approx. ৳300–500.",
        mode: "cng",
      },
      {
        title: "On the water",
        detail: "Hire a small country boat or trawler at Bhimruli for 1–2 hours, approx. ৳500–1,500 depending on boat size.",
      },
    ],
    bestTime: "Roughly mid-July – August (guava season), early morning.",
    timeNeeded: "Half day",
    entryFee: "Free (boat hire extra)",
    openingHours: "Market is most active from early morning to about noon in season.",
    tips: [
      "Outside July–August there is little or no market — check local reports before travelling.",
      "It is monsoon season: carry rain gear and a waterproof bag for your phone.",
      "Agree on the boat price and route before boarding.",
    ],
    map: { lat: 22.695, lng: 90.155 },
  },

  /* ------------------------------ Netrokona ------------------------------ */
  {
    slug: "birishiri",
    name: "Birishiri & Bijoypur China-Clay Hills",
    localName: "বিরিশিরি ও বিজয়পুর চীনামাটির পাহাড়",
    district: "Netrokona",
    upazila: "Durgapur",
    division: "Mymensingh",
    categories: ["Hills", "Lake", "River"],
    difficulty: "Moderate",
    summary: "White china-clay hills with blue-green pit lakes, the Someshwari river and Garo villages by the Indian border.",
    description: [
      "Near Durgapur in Netrokona, close to the Meghalaya (India) border, white china-clay (kaolin) has been dug from low hills at Bijoypur. The old mining pits have filled with striking blue-green water, set against white and pink clay slopes.",
      "On the way you cross the wide, sandy Someshwari River, where sand and coal are collected by hand. Birishiri itself has a Garo and Hajong cultural academy and is home to indigenous communities.",
      "Roads are rough in parts and the area is rural, so it suits travellers who are happy with basic facilities.",
    ],
    highlights: [
      "Blue-green lakes in the china-clay pits at Bijoypur",
      "Crossing the Someshwari River by boat",
      "Birishiri Tribal Cultural Academy (Garo and Hajong culture)",
      "Views of the Meghalaya hills across the border",
    ],
    howToReach: [
      {
        title: "From Dhaka to Birishiri / Durgapur",
        detail: "Direct bus from Mohakhali to Birishiri/Durgapur, about 5–7 hours, approx. ৳400–600. Or travel via Mymensingh.",
        mode: "non-ac-bus",
      },
      {
        title: "Crossing the Someshwari",
        detail: "Ferry boat across the river near Durgapur, about 5–10 minutes, approx. ৳10–20 per person (a bridge may replace it).",
      },
      {
        title: "To the china-clay hills",
        detail: "Hire a motorbike or easy-bike to Bijoypur, about 30–45 minutes, approx. ৳300–600 return with waiting.",
        mode: "easy-bike",
      },
    ],
    bestTime: "October – March (dry roads). Monsoon makes the clay slippery.",
    timeNeeded: "1–2 days",
    entryFee: "Free",
    openingHours: "Daylight hours.",
    tips: [
      "Garo and Hajong people live here — ask before taking photos of people or homes.",
      "The area is near the India border: stay on main paths and follow BGB instructions.",
      "Clay slopes are slippery when wet; wear shoes with grip and do not swim in the pits.",
      "Accommodation is basic (YMCA / small guesthouses) — book ahead in winter.",
    ],
    map: { lat: 25.1735, lng: 90.6995 },
  },

  /* ------------------------------ Mymensingh ----------------------------- */
  {
    slug: "shashi-lodge",
    name: "Shashi Lodge & Brahmaputra Riverside",
    localName: "শশী লজ ও ব্রহ্মপুত্র নদের পাড়",
    district: "Mymensingh",
    upazila: "Mymensingh Sadar",
    division: "Mymensingh",
    categories: ["Heritage", "River", "City"],
    difficulty: "Easy",
    summary: "Mymensingh's elegant zamindar palace with a Venus statue, plus a stroll along the Old Brahmaputra.",
    description: [
      "Shashi Lodge, also called the Mymensingh Rajbari, was built by the Muktagachha zamindar Maharaja Surya Kanta Acharya and rebuilt in the early 1900s after an earthquake. It is named after his adopted son, Shashi Kanta.",
      "The red-and-white palace stands in a garden with a famous marble statue of Venus by a fountain. For many years it was used as a teachers' training college; it has been turned into a museum project, so access to the inside can vary.",
      "A short walk away, the Old Brahmaputra riverside park (Joynul Abedin Park area) is a pleasant place for an evening walk or a boat ride.",
    ],
    highlights: [
      "Shashi Lodge palace facade and Venus fountain",
      "Garden with old trees in front of the palace",
      "Old Brahmaputra riverside walk and boat rides",
      "Shilpacharya Zainul Abedin Museum nearby",
    ],
    howToReach: [
      {
        title: "From Dhaka to Mymensingh",
        detail: "Intercity train from Kamalapur/Airport (about 2.5–3.5 hours, approx. ৳150–600) or bus from Mohakhali (about 3–4 hours, approx. ৳250–400).",
        mode: "train",
      },
      {
        title: "Within Mymensingh",
        detail: "Rickshaw or easy-bike to Shashi Lodge and the riverside, about 10–15 minutes from the station, approx. ৳30–60.",
        mode: "rickshaw",
      },
    ],
    bestTime: "October – March. Riverside is best at sunset.",
    timeNeeded: "2–3 hours",
    entryFee: "Grounds usually free; museum fee may apply (approx.)",
    openingHours: "Roughly 10:00–17:00; inside access varies — check before you go.",
    tips: [
      "Combine with the Zainul Abedin Museum by the river (closed one weekday).",
      "Muktagachha Rajbari and its famous monda sweet are about 30 minutes away.",
      "The riverside can be crowded on Friday afternoons.",
    ],
    map: { lat: 24.7553, lng: 90.4063 },
  },

  /* ------------------------------- Gazipur ------------------------------- */
  {
    slug: "bhawal-national-park",
    name: "Bhawal National Park",
    localName: "ভাওয়াল জাতীয় উদ্যান",
    district: "Gazipur",
    upazila: "Gazipur Sadar",
    division: "Dhaka",
    categories: ["Forest"],
    difficulty: "Easy",
    summary: "A sal-forest park about an hour north of Dhaka with picnic spots, lakes and quiet walking trails.",
    description: [
      "Bhawal National Park protects a patch of sal (shorea) forest just north of Dhaka. It was declared a national park in 1982 and is one of the easiest green escapes from the capital.",
      "Trails lead under tall sal trees past small lakes and picnic areas with simple rest houses. Birds, butterflies and the odd monkey are the main wildlife.",
      "On weekends it is a popular picnic spot and can get noisy. Weekday mornings are much calmer.",
    ],
    highlights: [
      "Walking trails through sal forest",
      "Small lakes and picnic spots",
      "Birdwatching in the early morning",
      "Observation tower (if open)",
    ],
    howToReach: [
      {
        title: "From Dhaka (Mohakhali / Airport)",
        detail: "Bus towards Mymensingh and get off at the National Park gate (Rajendrapur area), about 1.5–2.5 hours depending on traffic, approx. ৳80–150.",
        mode: "non-ac-bus",
      },
      {
        title: "By ride-share or private car",
        detail: "Uber or a hired car to \"Bhawal National Park\", about 1.5–2.5 hours, approx. ৳1,200–2,000 one way.",
        mode: "ride-share",
      },
      {
        title: "From the main gate",
        detail: "Walk the internal trails, or take a rickshaw / easy-bike inside, approx. ৳30–80.",
        mode: "walk",
      },
    ],
    bestTime: "November – February; weekday mornings.",
    timeNeeded: "Half day",
    entryFee: "≈ ৳20–50 per person; vehicle and picnic-spot fees extra (approx.)",
    openingHours: "Roughly daylight hours (about 08:00–17:00).",
    tips: [
      "Traffic on the Dhaka–Mymensingh highway can be heavy — leave early.",
      "Stay on main trails and leave before dark.",
      "Do not leave litter; carry your rubbish out.",
    ],
    map: { lat: 24.1, lng: 90.41 },
  },

  /* ------------------------------- Habiganj ------------------------------ */
  {
    slug: "satchari-national-park",
    name: "Satchari National Park",
    localName: "সাতছড়ি জাতীয় উদ্যান",
    district: "Habiganj",
    upazila: "Chunarughat",
    division: "Sylhet",
    categories: ["Forest", "Wildlife"],
    difficulty: "Moderate",
    summary: "A hilly evergreen forest with gibbons, langurs and colourful birds, plus marked trails and a Tripura village.",
    description: [
      "Satchari National Park is a protected hill forest in Habiganj, near the Indian border. Its name means \"seven streams\". The forest is one of the best remaining patches of mixed evergreen forest in the country.",
      "Marked trails (about 30 minutes to 3 hours) pass streams and tall trees. With luck and a quiet approach you may hear or see hoolock gibbons, Phayre's langurs, macaques and many birds. A canopy watch tower helps with birdwatching.",
      "A small Tripura indigenous village sits inside the park. Tea gardens line the road on the way in.",
    ],
    highlights: [
      "Hoolock gibbons and Phayre's langurs (sightings not guaranteed)",
      "Short and long forest trails with streams",
      "Canopy watch tower for birdwatching",
      "Tripura village and surrounding tea gardens",
    ],
    howToReach: [
      {
        title: "From Dhaka",
        detail: "Bus towards Sylhet and get off at Satchari on the Dhaka–Sylhet highway, about 3.5–5 hours, approx. ৳400–700. Ask the conductor to stop at Satchari.",
        mode: "ac-bus",
      },
      {
        title: "From Sreemangal (Moulvibazar)",
        detail: "Reserved CNG to Satchari, about 1–1.5 hours, approx. ৳800–1,200 return with waiting.",
        mode: "cng",
      },
      {
        title: "Inside the park",
        detail: "Walk the marked trails from the entrance. Hiring a local guide is recommended, approx. ৳300–800.",
        mode: "walk",
      },
    ],
    bestTime: "November – March. Early morning for wildlife.",
    timeNeeded: "Half day",
    entryFee: "≈ ৳50 locals · higher for foreigners; guide fee extra (approx.)",
    openingHours: "Roughly 08:00–17:00 — check before you go.",
    tips: [
      "Go early and stay quiet for the best chance of seeing gibbons.",
      "Leeches are common in the wet season — wear long socks and carry salt.",
      "Wear good walking shoes; trails can be muddy and steep in places.",
      "Ask before photographing people in the Tripura village.",
    ],
    map: { lat: 24.1239, lng: 91.4518 },
  },

  /* ------------------------------- Chandpur ------------------------------ */
  {
    slug: "chandpur-molehead",
    name: "Chandpur Molehead (Boro Station)",
    localName: "চাঁদপুর মোলহেড (বড় স্টেশন)",
    district: "Chandpur",
    upazila: "Chandpur Sadar",
    division: "Chattogram",
    categories: ["River", "City"],
    difficulty: "Easy",
    summary: "A riverside point where the Padma and Meghna meet — huge water, fishing boats and Chandpur's famous hilsa.",
    description: [
      "The Molehead at Boro Station in Chandpur is a jutting embankment where the Padma and Meghna rivers join, with the Dakatia river nearby. The water stretches so wide it looks like a sea, and the currents swirl where the rivers meet.",
      "In the evening locals gather to watch the sunset, launches and fishing boats. Chandpur is known as the \"City of Hilsa\" (ilish), and the fish market nearby is famous for fresh hilsa.",
      "The trip itself is part of the fun: many travellers come from Dhaka by launch along the Meghna.",
    ],
    highlights: [
      "Confluence of the Padma and Meghna rivers",
      "Sunset over the wide river",
      "Fresh hilsa at the Boro Station fish market",
      "Launch journey from Dhaka",
    ],
    howToReach: [
      {
        title: "From Dhaka by launch",
        detail: "Daytime launch from Sadarghat to Chandpur, about 3.5–4.5 hours, approx. ৳150–250 deck to ৳800–1,500 cabin.",
        mode: "launch",
      },
      {
        title: "From Dhaka by bus",
        detail: "Bus from Sayedabad to Chandpur, about 3–4 hours, approx. ৳300–450.",
        mode: "non-ac-bus",
      },
      {
        title: "Within Chandpur town",
        detail: "Rickshaw or easy-bike to Boro Station / Molehead, about 10–15 minutes, approx. ৳30–60.",
        mode: "rickshaw",
      },
    ],
    bestTime: "October – March. Hilsa season peaks around August – October.",
    timeNeeded: "2–3 hours (day trip from Dhaka)",
    entryFee: "Free",
    openingHours: "Open all day; best at sunset.",
    tips: [
      "Stay back from the edge — currents at the confluence are dangerous; do not swim.",
      "Avoid launch travel in stormy weather or when storm signals are raised.",
      "Try hilsa at a local restaurant, but check the price per kg before ordering.",
    ],
    map: { lat: 23.2335, lng: 90.6365 },
  },
];
