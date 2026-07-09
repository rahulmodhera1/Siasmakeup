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
    { role: "Makeup", lines: ["@Siasmakeup"] },
    { role: "Photography", lines: ["@s.cisci"] },
    { role: "Models", lines: ["@nadianotnice", "@destineecray"] },
    { role: "Designer", lines: ["@j.castillo_____"] },
  ],
};

// Untitled roller-rink editorial — credits only, no collection name.
export const rollerSkating: Collection = {
  credits: [
    { role: "Makeup", lines: ["@Siasmakeup"] },
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

// Studio session with singer Nequita — teal backdrop, berry lip.
export const nequita: Collection = {
  credits: [
    { role: "Makeup", lines: ["@Siasmakeup"] },
    { role: "Photography", lines: ["@ramyaridaphoto"] },
    { role: "Model / Singer", lines: ["@nequitamusic"] },
  ],
};

const nq = (n: number, alt: string): GalleryImage => ({
  src: `/images/portfolio/fashion/Nequita_${n}.jpeg`,
  category: "fashion",
  alt,
  collection: nequita,
});

// On set with Nequita — music-video production stills with the full crew.
export const nequitaOnSet: Collection = {
  credits: [
    { role: "Makeup", lines: ["@Siasmakeup"] },
    { role: "Singer", lines: ["@nequitamusic"] },
    { role: "Music Producer / Director", lines: ["@broxbold"] },
    { role: "Cinematographer", lines: ["@justin_lovell"] },
    { role: "Steadicam Op", lines: ["@chrismorsbydop"] },
    { role: "Studio", lines: ["@astrolabstudio"] },
  ],
};

const ns = (n: number, alt: string): GalleryImage => ({
  src: `/images/portfolio/fashion/Nequita_Set_${n}.jpeg`,
  category: "fashion",
  alt,
  collection: nequitaOnSet,
});

// Portrait session with Danimac — Sia behind both the brush and the lens.
export const danimac: Collection = {
  credits: [
    { role: "Makeup & Photography", lines: ["@Siasmakeup"] },
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
    { role: "Makeup & Photography", lines: ["@Siasmakeup"] },
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
    { role: "Makeup & Photography", lines: ["@Siasmakeup"] },
    { role: "Model", lines: ["@z.ninis.mama"] },
  ],
};

const lb = (n: number, alt: string): GalleryImage => ({
  src: `/images/portfolio/photography/Laila_Biafore_${n}.jpeg`,
  category: "photography",
  alt,
  collection: lailaBiafore,
});

// Winter wedding with House of Emerald.
export const merald: Collection = {
  credits: [
    { role: "Makeup", lines: ["@Siasmakeup"] },
    { role: "Photography", lines: ["@houseofemeraldphoto"] },
  ],
};

const me = (n: number, alt: string): GalleryImage => ({
  src: `/images/portfolio/bridal/Merald${n}.jpeg`,
  category: "bridal",
  alt,
  collection: merald,
});

// Summer garden wedding with Fantauzzi Studios.
export const fanta: Collection = {
  credits: [
    { role: "Makeup", lines: ["@Siasmakeup"] },
    { role: "Assisting MUA", lines: ["@talineted"] },
    { role: "Photography", lines: ["@fantauzzi_studios"] },
  ],
};

const ft = (n: number, alt: string): GalleryImage => ({
  src: `/images/portfolio/bridal/fanta${n}.jpeg`,
  category: "bridal",
  alt,
  collection: fanta,
});

// ---- Featured order --------------------------------------------------------
// Srcs listed here are hoisted to the top of the "All" view, in this order.
// Everything else follows in its natural gallery order.
export const featured: string[] = [
  "/images/portfolio/bridal/Merald1.jpeg",
  "/images/portfolio/bridal/fanta1.jpeg",
  "/images/portfolio/fashion/Forbidden Desire 1.jpeg",
  "/images/portfolio/fashion/Nequita_1.jpeg",
  "/images/portfolio/photography/Danimac_1.jpeg",
  "/images/portfolio/fashion/Nequita_3.jpeg",
  "/images/portfolio/photography/Sara_ann_4.jpeg",
  "/images/portfolio/photography/Laila_Biafore_1.jpeg",
  "/images/portfolio/fashion/Roller Skating 2.jpeg",
  "/images/portfolio/fashion/Forbidden Desire 6.jpeg",
  "/images/portfolio/photography/Danimac_2.jpeg",
  "/images/portfolio/fashion/Nequita_Set_1.jpeg",
  "/images/portfolio/fashion/Forbidden Desire 2.jpeg",
  "/images/portfolio/fashion/Nequita_4.jpeg",
];

export const gallery: GalleryImage[] = [
  // ---- Bridal · House of Emerald winter wedding ----
  me(1, "Bride flanked by her bridesmaids in faux fur wraps, holding winter bouquets before a sparkling arch"),
  me(2, "Bride and groom portrait under a pine garland at a winter wedding venue"),
  me(3, "Sia applying eye makeup to a seated client before the ceremony, candid black and white"),

  // ---- Bridal · Fantauzzi Studios summer garden wedding ----
  ft(1, "Bride in a tiara laughing with her bridesmaids in dusty blue and navy, garden wedding"),

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

  // ---- Fashion · Nequita studio session ----
  nq(1, "Over-the-shoulder studio portrait with a smoked bronze eye and deep berry lip"),
  nq(2, "Smiling studio look in painterly blue mesh with a bold berry lip on teal"),
  nq(3, "Over-the-shoulder gaze on purple with a smoked plum eye and mauve lip"),
  nq(4, "Downcast lilac beauty portrait with a shimmering violet lid and soft plum lip"),
  nq(5, "Full-length pink sparkle look with windswept hair and a soft glam face"),

  // ---- Fashion · Nequita music-video set stills ----
  ns(1, "Music-video set still under pink and blue neon with dramatic smoked-out glam"),
  ns(2, "Close set still in studded mesh with bold lashes under violet light"),

  // ---- Photography · Danimac portrait session ----
  dm(1, "Warm close-up portrait with a precise wing and glossy nude lip on copper-red hair"),
  dm(2, "Smiling portrait with soft glam and a sculpted eye against a neutral wall"),
  dm(3, "Over-the-shoulder beauty portrait with luminous skin and a sharp cat eye"),
  dm(4, "Profile portrait showing a clean winged liner and softly blushed cheek"),
  dm(5, "Soft-focus portrait in powder blue with a warm, diffused complexion"),
  dm(6, "Sunlit outdoor portrait in denim with camera-ready natural glam"),

  // ---- Photography · Sara Ann portrait session ----
  sa(4, "Stairwell portrait in white linen with a clean, camera-ready natural glam"),
  sa(5, "Direct-gaze portrait with defined brows and a soft matte finish"),
  sa(3, "Candid laughing portrait in white linen with a fresh, luminous complexion"),
  sa(1, "Sunlit close-up with a graphic editorial brow, feathered lash and glossy lip"),
  sa(2, "Studio portrait with soft bronzed glam and sculpted brows under curly blonde hair"),

  // ---- Photography · Laila Biafore portrait session ----
  lb(1, "Classic red-lip beauty portrait with winged lash and a flawless satin complexion"),
  lb(2, "Polished portrait in a cobalt blazer with soft rose glam and a sleek bun"),

  // ---- Events ----
  { src: "/images/portfolio/events/events-couple-01.png", category: "events", alt: "Bride and groom sharing a laughing embrace by a rustic barn, then posing together with a bright wildflower bouquet" },
];
