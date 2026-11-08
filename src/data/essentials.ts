/**
 * ============================================================================
 *  Quick Travel Essentials — Visa, Safety, Currency, SIM cards.
 * ============================================================================
 *  Shown as cards on the homepage and expanded on /essentials.
 *  Keep `lastVerified` honest — immigration & fees change frequently.
 * ============================================================================
 */

export interface Essential {
  id: "visa" | "safety" | "currency" | "sim";
  title: string;
  emoji: string;
  summary: string;
  steps: { title: string; detail: string }[];
  keyFacts: { label: string; value: string }[];
  warning?: string;
}

export const ESSENTIALS_LAST_VERIFIED = "2026-10-01";

/** Rate used for all BDT → USD conversions on the site. Update periodically. */
export const BDT_PER_USD = 122;

export const ESSENTIALS: Essential[] = [
  {
    id: "visa",
    title: "Visa Information",
    emoji: "🛂",
    summary: "Many nationalities can get a Visa on Arrival at Dhaka airport; others should apply for an e-Visa or at an embassy.",
    keyFacts: [
      { label: "Visa on Arrival fee", value: "≈ USD 51 (payable in USD cash)" },
      { label: "Max stay (VOA)", value: "Up to 30 days" },
      { label: "Passport validity", value: "6+ months" },
      { label: "Official portal", value: "visa.gov.bd" },
    ],
    steps: [
      { title: "Check eligibility", detail: "Visit visa.gov.bd or your nearest Bangladesh embassy website to see whether your nationality qualifies for Visa on Arrival (VOA)." },
      { title: "Prepare documents", detail: "Return ticket, hotel booking, passport photo, and USD cash for the fee. Print everything; officers prefer paper." },
      { title: "At the airport", detail: "Before immigration, go to the 'Visa on Arrival' desk, pay the fee at the bank booth, then join the VOA immigration line." },
      { title: "Hill Tracts permit (if visiting)", detail: "Planning Sajek, Bandarban or Rangamati? Foreigners need a separate CHT permit, arranged 7–15 days ahead through a licensed tour operator." },
    ],
    warning: "Visa rules change often. Always confirm on visa.gov.bd before booking flights.",
  },
  {
    id: "safety",
    title: "Safety Tips",
    emoji: "🛡️",
    summary: "Bangladesh is generally safe and extremely hospitable. Traffic is the biggest risk, so follow these basics.",
    keyFacts: [
      { label: "Emergency", value: "999 (Police / Fire / Ambulance)" },
      { label: "Tourist Police", value: "Present at major tourist spots" },
      { label: "Biggest risk", value: "Road traffic" },
      { label: "Tap water", value: "Not safe — drink bottled" },
    ],
    steps: [
      { title: "Dress modestly", detail: "Cover your shoulders and knees, especially in rural areas and at religious sites. Women may want a light scarf (orna)." },
      { title: "Cross roads carefully", detail: "Use foot-over bridges where available. Traffic does not stop for pedestrians." },
      { title: "Fix prices first", detail: "For CNGs, rickshaws, boats and guides, agree on the full price before the service starts." },
      { title: "Keep copies", detail: "Carry photocopies of your passport and visa. Leave the original in the hotel safe unless you are travelling to the Hill Tracts." },
      { title: "Avoid hartals & rallies", detail: "Political strikes (hartal) or blockades can stop transport. Check local news and avoid gatherings." },
    ],
  },
  {
    id: "currency",
    title: "Currency (BDT) Guide",
    emoji: "💵",
    summary: "The currency is the Bangladeshi Taka (BDT, ৳). Cash is king outside big hotels; ATMs are common in towns.",
    keyFacts: [
      { label: "Approx. rate", value: `1 USD ≈ ${BDT_PER_USD} BDT` },
      { label: "Notes", value: "৳10, 20, 50, 100, 200, 500, 1000" },
      { label: "Cards accepted", value: "Hotels, malls, airlines" },
      { label: "Mobile money", value: "bKash, Nagad (locals)" },
    ],
    steps: [
      { title: "At the airport", detail: "Change a small amount (~USD 50) at the arrivals hall bank booths. Rates are fair, and you will need cash for SIMs and taxis." },
      { title: "Use bank ATMs", detail: "DBBL, City Bank, BRAC Bank and EBL ATMs accept Visa/Mastercard. Withdraw larger amounts to save fees." },
      { title: "Carry small notes", detail: "Rickshaws and stalls rarely have change for ৳500 or ৳1000. Break big notes at shops and hotels." },
      { title: "Refuse torn notes", detail: "Damaged or taped notes are often rejected. Politely ask for another note." },
    ],
    warning: "There are no ATMs in remote spots like Sajek, Saint Martin's or the Sundarbans. Withdraw in the nearest town.",
  },
  {
    id: "sim",
    title: "Buying a SIM at the Airport",
    emoji: "📶",
    summary: "Buy a local SIM right in the arrivals hall at Dhaka airport. You need your passport, and it takes about 10 minutes.",
    keyFacts: [
      { label: "Best coverage", value: "Grameenphone (GP)" },
      { label: "Hill Tracts", value: "Robi / Teletalk often better" },
      { label: "SIM cost", value: "≈ BDT 300–500 incl. starter" },
      { label: "Data", value: "~30 GB for ≈ BDT 500–800" },
    ],
    steps: [
      { title: "Find the operator booths", detail: "After customs, in the arrivals hall you will see Grameenphone, Robi and Banglalink counters." },
      { title: "Show your passport", detail: "Registration is biometric: they scan your passport and take your fingerprint. This is required by law." },
      { title: "Pick a data pack", detail: "Ask for a 30-day internet pack. The staff will activate it and test it for you." },
      { title: "Install key apps", detail: "Uber, Pathao, Google Maps (download Bangladesh offline), Google Translate (Bengali offline pack)." },
    ],
  },
];
