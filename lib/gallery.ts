// ============================================================================
//  PORTFOLIO GALLERY CONFIG
//  ---------------------------------------------------------------------------
//  To feature a new photo: drop the file into the matching folder under
//  /public/images/portfolio/<category>/ and add ONE line to the array below.
//  That's it — the gallery, filters and lightbox pick it up automatically.
//
//  Tip: write descriptive, human alt text for accessibility + SEO.
// ============================================================================

export type Category = "bridal" | "fashion" | "photography" | "events";

export type Credit = {
  role: string;
  /** Each line renders whole on its own row — names never break mid-word. */
  lines: string[];
};

export type Collection = {
  /** Optional editorial title. Untitled shoots still display their credits. */
  title?: string;
  credits: Credit[];
};

export type GalleryImage = {
  src: string;
  category: Category;
  alt: string;
  collection?: Collection;
};

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bridal", label: "Bridal" },
  { id: "fashion", label: "Fashion" },
  { id: "photography", label: "Photography" },
  { id: "events", label: "Events" },
];

// ---- Collections ----------------------------------------------------------
// A collection groups editorial images under one title and shared credits.
export const forbiddenDesire: Collection = {
  title: "Forbidden Desire",
  credits: [
    { role: "Makeup", lines: ["Sia", "@Siasmakeup"] },
    { role: "Photography", lines: ["Larissa Scisci", "@s.cisci"] },
    { role: "Models", lines: ["@nadianotnice", "@destineecray"] },
    { role: "Designer", lines: ["Jair Castillo", "@j.castillo_____"] },
  ],
};

// Untitled roller-rink editorial — credits only, no collection name.
export const rollerSkating: Collection = {
  credits: [
    { role: "Makeup", lines: ["Sia", "@Siasmakeup"] },
    { role: "Photography", lines: ["@serrano_photography_studio"] },
    { role: "Model", lines: ["@itsrachelpagett"] },
  ],
};

const fd = (n: number, alt: string): GalleryImage => ({
  src: `/images/portfolio/fashion/Forbidden Desire ${n}.jpeg`,
  category: "fashion",
  alt,
  collection: forbiddenDesire,
});

const rs = (n: number, alt: string): GalleryImage => ({
  src: `/images/portfolio/fashion/Roller Skating ${n}.jpeg`,
  category: "fashion",
  alt,
  collection: rollerSkating,
});

// Portrait session with Danimac — Sia behind both the brush and the lens.
export const danimac: Collection = {
  credits: [
    { role: "Makeup & Photography", lines: ["Sia", "@Siasmakeup"] },
    { role: "Model", lines: ["@danimac_"] },
  ],
};

const dm = (n: number, alt: string): GalleryImage => ({
  src: `/images/portfolio/photography/Danimac_${n}.jpeg`,
  category: "photography",
  alt,
  collection: danimac,
});

// Portrait session with Sara Ann — Sia behind both the brush and the lens.
export const saraAnn: Collection = {
  credits: [
    { role: "Makeup & Photography", lines: ["Sia", "@Siasmakeup"] },
    { role: "Actress & Director", lines: ["@thesara_ann"] },
  ],
};

const sa = (n: number, alt: string): GalleryImage => ({
  src: `/images/portfolio/photography/Sara_ann_${n}.jpeg`,
  category: "photography",
  alt,
  collection: saraAnn,
});

// Portrait session with Laila Biafore — Sia behind both the brush and the lens.
export const lailaBiafore: Collection = {
  credits: [
    { role: "Makeup & Photography", lines: ["Sia", "@Siasmakeup"] },
    { role: "Model", lines: ["Laila Biafore", "@z.ninis.mama"] },
  ],
};

const lb = (n: number, alt: string): GalleryImage => ({
  src: `/images/portfolio/photography/Laila_Biafore_${n}.jpeg`,
  category: "photography",
  alt,
  collection: lailaBiafore,
});

export const gallery: GalleryImage[] = [
  // ---- Bridal ----
  { src: "/images/portfolio/bridal/bridal-3.jpeg", category: "bridal", alt: "Timeless bridal eye with feathered lashes" },

  // ---- Fashion · Forbidden Desire ----
  fd(1, "Model in a sculptural black dress emerging from shadow, editorial makeup by Sia"),
  fd(2, "Dramatic chiaroscuro portrait with a padded wrap collar and soft-focus glam"),
  fd(3, "Full-length look in a voluminous quilted coat, lit by a single beam of light"),
  fd(4, "Profile study in draped black with a slicked-back ponytail and graphic liner"),
  fd(5, "Draped satin silhouette with luminous skin and a sharp winged eye"),
  fd(6, "Off-the-shoulder leather bodice with a smoked-out graphic cat eye"),
  fd(7, "Mini dress and boots, strong brow and bold lash in low dramatic light"),
  fd(8, "Wide-leg tailoring and sculpted matte complexion against the dark"),

  // ---- Fashion · Roller-rink editorial ----
  rs(1, "Retro roller-rink editorial with soft glam, posed on skates at the snack bar"),
  rs(2, "Playful pink satin and denim look with sun-kissed glam at the arcade"),
  rs(3, "Neon-lit rink portrait with a bold berry lip and softly blended eye"),

  // ---- Photography · Danimac portrait session ----
  dm(1, "Warm close-up portrait with a precise wing and glossy nude lip on copper-red hair"),
  dm(2, "Smiling portrait with soft glam and a sculpted eye against a neutral wall"),
  dm(3, "Over-the-shoulder beauty portrait with luminous skin and a sharp cat eye"),
  dm(4, "Profile portrait showing a clean winged liner and softly blushed cheek"),
  dm(5, "Soft-focus portrait in powder blue with a warm, diffused complexion"),
  dm(6, "Sunlit outdoor portrait in denim with camera-ready natural glam"),

  // ---- Photography · Sara Ann portrait session ----
  sa(1, "Sunlit close-up with a graphic editorial brow, feathered lash and glossy lip"),
  sa(2, "Studio portrait with soft bronzed glam and sculpted brows under curly blonde hair"),
  sa(3, "Candid laughing portrait in white linen with a fresh, luminous complexion"),
  sa(4, "Stairwell portrait in white linen with a clean, camera-ready natural glam"),
  sa(5, "Direct-gaze portrait with defined brows and a soft matte finish"),

  // ---- Photography · Laila Biafore portrait session ----
  lb(1, "Classic red-lip beauty portrait with winged lash and a flawless satin complexion"),
  lb(2, "Polished portrait in a cobalt blazer with soft rose glam and a sleek bun"),

  // ---- Events (placeholders — no images uploaded yet) ----
  { src: "/images/portfolio/events/events-01.jpg", category: "events", alt: "Polished evening glam for a special event" },
  { src: "/images/portfolio/events/events-02.jpg", category: "events", alt: "Soft smoky eye for a black-tie occasion" },
  { src: "/images/portfolio/events/events-03.jpg", category: "events", alt: "Radiant party makeup with a warm bronze eye" },
  { src: "/images/portfolio/events/events-04.jpg", category: "events", alt: "Elegant evening look with a classic red lip" },
  { src: "/images/portfolio/events/events-05.jpg", category: "events", alt: "Glowing festive glam for a celebration" },
  { src: "/images/portfolio/events/events-06.jpg", category: "events", alt: "Statement evening eye with luminous skin" },
];
