/**
 * ============================================================================
 *  Explore Bangladesh — Core Data Types
 * ============================================================================
 *  Every destination guide is a single JSON file in `src/data/destinations/`
 *  that must match the `Destination` interface below.
 *
 *  To add a new spot (you'll have 50+ eventually):
 *    1. Copy `src/data/destinations/coxs-bazar.json` → `<your-slug>.json`
 *    2. Fill in every field (TypeScript will flag anything missing/wrong)
 *    3. Register it in `src/data/destinations/index.ts`
 *  The detail page, search, carousel and cost calculator pick it up for free.
 * ============================================================================
 */

/** The 8 administrative divisions of Bangladesh — used by the search filter. */
export type Division =
  | "Dhaka"
  | "Chattogram"
  | "Sylhet"
  | "Khulna"
  | "Rajshahi"
  | "Barishal"
  | "Rangpur"
  | "Mymensingh";

/** Trip type tags shown as filter chips in the hero search. */
export type TripType = "Beach" | "Hills" | "Forest" | "Heritage" | "Island" | "Tea Gardens" | "River" | "City";

/** Physical difficulty — rendered as a coloured badge. */
export type Difficulty = "Easy" | "Moderate" | "Trekking";

/** Rough budget class — used by the hero "Budget" filter. */
export type BudgetLevel = "Shoestring" | "Moderate" | "Comfortable";

/**
 * Keys into the Transport Explainer glossary (`src/data/transport-glossary.ts`).
 * Any step that uses one of these modes automatically gets a
 * "What is this?" link so first-timers are never left guessing.
 */
export type TransportMode =
  | "flight"
  | "train"
  | "ac-bus"
  | "non-ac-bus"
  | "cng"
  | "rickshaw"
  | "easy-bike"
  | "leguna"
  | "chander-gari"
  | "launch"
  | "rocket-steamer"
  | "ship"
  | "speedboat"
  | "ride-share"
  | "walk";

/**
 * A photo with attribution. Most Wikimedia Commons photos are CC BY / CC BY-SA,
 * which REQUIRE crediting the author + licence — the UI shows `credit`
 * in the gallery lightbox (/gallery), where every site photo appears.
 */
export interface Photo {
  /** Path under /public, e.g. "/images/destinations/coxs-bazar.jpg" */
  src: string;
  /** Describe the scene for screen readers. */
  alt: string;
  /** Short caption, e.g. "Sunset at Laboni Beach" */
  caption?: string;
  /** CSS object-position for cropping, e.g. "center 20%" to keep mountain peaks in frame. */
  position?: string;
  credit: {
    author: string;
    license: string;
    /** Page of the photo (Commons file page / Unsplash photo page). */
    source: string;
    /** Photographer's profile page (required for Unsplash attribution). */
    authorUrl?: string;
  };
}

/** A price range in Bangladeshi Taka. USD is derived at render time. */
export interface PriceRangeBDT {
  min: number;
  max: number;
}

/* ------------------------------ Overview ---------------------------------- */

export interface Season {
  name: string; // e.g. "Winter (Peak)"
  months: string; // e.g. "Nov – Feb"
  weather: string; // human description
  tempC: string; // e.g. "15–26°C"
  verdict: "Best" | "Good" | "Avoid";
}

export interface Overview {
  intro: string;
  highlights: string[];
  bestTimeSummary: string; // one-liner shown in the quick facts bar
  seasons: Season[];
}

/* ------------------------------ How to reach ------------------------------ */

/** One concrete transport option (e.g. "Cox's Bazar Express — Snigdha class"). */
export interface TransportOption {
  mode: TransportMode;
  name: string; // operator / train name / airline
  departFrom: string; // exact station / counter / terminal in Dhaka
  duration: string;
  classes: { name: string; price: PriceRangeBDT; note?: string }[];
  bookingTip: string;
}

/** A single numbered step in a journey. */
export interface JourneyStep {
  title: string;
  description: string;
  mode?: TransportMode; // links to glossary when present
  duration?: string;
  cost?: PriceRangeBDT;
  tip?: string;
}

/** A complete route the traveller can follow from start to finish. */
export interface Route {
  id: string;
  label: string; // e.g. "By Train (Recommended)"
  recommended?: boolean;
  totalTime: string;
  totalCost: PriceRangeBDT; // one-way, per person
  steps: JourneyStep[];
}

export interface LastMileOption {
  from: string; // e.g. "Cox's Bazar Railway Station"
  to: string;
  mode: TransportMode;
  duration: string;
  cost: PriceRangeBDT;
  note: string;
}

export interface HowToReach {
  summary: string;
  distanceFromDhaka: string;
  routes: Route[];
  transportOptions: TransportOption[];
  lastMile: LastMileOption[];
}

/* -------------------------------- Budget ---------------------------------- */

/** Daily cost per person (BDT). `stay` assumes 2 people sharing a room. */
export interface DailyCostBreakdown {
  localTransport: number;
  food: number;
  stay: number;
  entryFees: number;
}

export interface BudgetTier {
  id: "budget" | "midRange" | "luxury";
  label: string;
  perPersonPerDay: DailyCostBreakdown;
  /** Return trip Dhaka ⇄ destination, per person. */
  roundTripFromDhaka: number;
  roundTripMode: string;
  notes: string;
}

export interface Budget {
  disclaimer: string;
  tiers: BudgetTier[];
  entryFees: { place: string; local: number; foreigner: number; note?: string }[];
}

/* ---------------------------------- Stay ---------------------------------- */

export interface Accommodation {
  name: string;
  tier: "Budget" | "Mid-range" | "Luxury";
  area: string;
  pricePerNight: PriceRangeBDT;
  why: string;
  bookingTip?: string;
}

/* ---------------------------------- Food ---------------------------------- */

export interface Dish {
  name: string;
  localName?: string;
  description: string;
  priceRange: PriceRangeBDT;
  spicy?: boolean;
}

export interface EatingSpot {
  name: string;
  area: string;
  knownFor: string;
  hygiene: "Excellent" | "Good" | "Street";
}

/* ------------------------------ Rules & Safety ---------------------------- */

export interface RuleGroup {
  category: "Customs" | "Dress Code" | "Permits" | "Safety" | "Health" | "Connectivity";
  severity: "info" | "warning" | "critical";
  items: string[];
}

/* ------------------------------ Map & Itinerary --------------------------- */

export interface MapInfo {
  /** Free Google Maps embed (no API key) — search query or coordinates. */
  embedQuery: string;
  lat: number;
  lng: number;
  zoom: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: { time: string; activity: string; tip?: string }[];
  overnight: string;
}

/* ------------------------------ The full guide ---------------------------- */

export interface Destination {
  slug: string;
  name: string;
  localName: string; // Bangla name — useful to show drivers
  tagline: string;
  division: Division;
  district: string;
  tripTypes: TripType[];
  difficulty: Difficulty;
  budgetLevel: BudgetLevel;
  idealDuration: string;
  /** Main photo used on cards and the guide hero. */
  cover: Photo;
  /** Optional extra photos shown in the overview section. */
  gallery?: Photo[];
  /** Tailwind gradient — shown while the photo loads & as a tint fallback. */
  coverGradient: string;
  coverEmoji: string;
  overview: Overview;
  howToReach: HowToReach;
  budget: Budget;
  stay: Accommodation[];
  food: { dishes: Dish[]; spots: EatingSpot[]; safetyTips: string[] };
  rules: RuleGroup[];
  map: MapInfo;
  itinerary: ItineraryDay[];
  lastVerified: string; // ISO date — prices change, show travellers how fresh it is
}

/**
 * Lightweight card data for spots whose full guide isn't written yet.
 * Lets the carousel & search show all 50+ spots while guides are in progress.
 */
export type DestinationSummary = Pick<
  Destination,
  | "slug"
  | "name"
  | "localName"
  | "tagline"
  | "division"
  | "tripTypes"
  | "difficulty"
  | "budgetLevel"
  | "idealDuration"
  | "cover"
  | "coverGradient"
  | "coverEmoji"
> & { hasFullGuide: boolean };
