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

export type GalleryImage = {
  src: string;
  category: Category;
  alt: string;
};

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bridal", label: "Bridal" },
  { id: "fashion", label: "Fashion" },
  { id: "photography", label: "Photography" },
  { id: "events", label: "Events" },
];

export const gallery: GalleryImage[] = [
  // ---- Bridal ----
  { src: "/images/portfolio/bridal/bridal-01.jpg", category: "bridal", alt: "Soft glowing bridal makeup with a luminous skin finish" },
  { src: "/images/portfolio/bridal/bridal-02.jpg", category: "bridal", alt: "Romantic bridal look with a neutral rose lip" },
  { src: "/images/portfolio/bridal/bridal-03.jpg", category: "bridal", alt: "Timeless bridal eye with feathered lashes" },
  { src: "/images/portfolio/bridal/bridal-04.jpg", category: "bridal", alt: "Bride in natural light with dewy, radiant complexion" },
  { src: "/images/portfolio/bridal/bridal-05.jpg", category: "bridal", alt: "Warm-toned bridal glam with a soft smoky eye" },
  { src: "/images/portfolio/bridal/bridal-06.jpg", category: "bridal", alt: "Close-up of polished bridal skin and defined brows" },

  // ---- Fashion ----
  { src: "/images/portfolio/fashion/fashion-01.jpg", category: "fashion", alt: "Editorial fashion beauty with a bold graphic eye" },
  { src: "/images/portfolio/fashion/fashion-02.jpg", category: "fashion", alt: "High-fashion runway makeup with sculpted cheekbones" },
  { src: "/images/portfolio/fashion/fashion-03.jpg", category: "fashion", alt: "Avant-garde beauty look with a metallic lid" },
  { src: "/images/portfolio/fashion/fashion-04.jpg", category: "fashion", alt: "Minimalist fashion face with a clean, matte complexion" },
  { src: "/images/portfolio/fashion/fashion-05.jpg", category: "fashion", alt: "Color-blocked editorial eye makeup in earthy tones" },
  { src: "/images/portfolio/fashion/fashion-06.jpg", category: "fashion", alt: "Sculptural fashion beauty with a glossy lip" },

  // ---- Photography ----
  { src: "/images/portfolio/photography/photography-01.jpg", category: "photography", alt: "Beauty close-up styled for studio photography" },
  { src: "/images/portfolio/photography/photography-02.jpg", category: "photography", alt: "Camera-ready complexion for a portrait shoot" },
  { src: "/images/portfolio/photography/photography-03.jpg", category: "photography", alt: "Soft editorial portrait makeup in warm light" },
  { src: "/images/portfolio/photography/photography-04.jpg", category: "photography", alt: "Glowing skin styled for a magazine cover shoot" },
  { src: "/images/portfolio/photography/photography-05.jpg", category: "photography", alt: "Defined beauty look built to hold up under studio lighting" },
  { src: "/images/portfolio/photography/photography-06.jpg", category: "photography", alt: "Natural-light beauty portrait with a bronzed glow" },

  // ---- Events ----
  { src: "/images/portfolio/events/events-01.jpg", category: "events", alt: "Polished evening glam for a special event" },
  { src: "/images/portfolio/events/events-02.jpg", category: "events", alt: "Soft smoky eye for a black-tie occasion" },
  { src: "/images/portfolio/events/events-03.jpg", category: "events", alt: "Radiant party makeup with a warm bronze eye" },
  { src: "/images/portfolio/events/events-04.jpg", category: "events", alt: "Elegant evening look with a classic red lip" },
  { src: "/images/portfolio/events/events-05.jpg", category: "events", alt: "Glowing festive glam for a celebration" },
  { src: "/images/portfolio/events/events-06.jpg", category: "events", alt: "Statement evening eye with luminous skin" },
];
