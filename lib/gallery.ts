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
    { role: "Photography", lines: ["@seranno_photography_studio"] },
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

  // ---- Photography ----
  { src: "/images/portfolio/photography/photo-2.jpeg", category: "photography", alt: "Camera-ready complexion for a portrait shoot" },

  // ---- Events (placeholders — no images uploaded yet) ----
  { src: "/images/portfolio/events/events-01.jpg", category: "events", alt: "Polished evening glam for a special event" },
  { src: "/images/portfolio/events/events-02.jpg", category: "events", alt: "Soft smoky eye for a black-tie occasion" },
  { src: "/images/portfolio/events/events-03.jpg", category: "events", alt: "Radiant party makeup with a warm bronze eye" },
  { src: "/images/portfolio/events/events-04.jpg", category: "events", alt: "Elegant evening look with a classic red lip" },
  { src: "/images/portfolio/events/events-05.jpg", category: "events", alt: "Glowing festive glam for a celebration" },
  { src: "/images/portfolio/events/events-06.jpg", category: "events", alt: "Statement evening eye with luminous skin" },
];
