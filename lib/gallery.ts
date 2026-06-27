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
  // ---- Bridal (3 images) ----
  { src: "/images/portfolio/bridal/Bridal 1.jpeg", category: "bridal", alt: "Soft glowing bridal makeup with a luminous skin finish" },
  { src: "/images/portfolio/bridal/Bridal 2.jpeg", category: "bridal", alt: "Romantic bridal look with a neutral rose lip" },
  { src: "/images/portfolio/bridal/Bridal 3.jpeg", category: "bridal", alt: "Timeless bridal eye with feathered lashes" },

  // ---- Fashion (4 images) ----
  { src: "/images/portfolio/fashion/Fashion 1.jpeg", category: "fashion", alt: "Editorial fashion beauty with a bold graphic eye" },
  { src: "/images/portfolio/fashion/Fashion 2.jpeg", category: "fashion", alt: "High-fashion runway makeup with sculpted cheekbones" },
  { src: "/images/portfolio/fashion/Fashion 3.jpeg", category: "fashion", alt: "Avant-garde beauty look with a metallic lid" },
  { src: "/images/portfolio/fashion/Fashion 4.jpeg", category: "fashion", alt: "Minimalist fashion face with a clean, matte complexion" },

  // ---- Photography (5 images) ----
  { src: "/images/portfolio/photography/Photo 1.jpeg", category: "photography", alt: "Beauty close-up styled for studio photography" },
  { src: "/images/portfolio/photography/Photo 2.jpeg", category: "photography", alt: "Camera-ready complexion for a portrait shoot" },
  { src: "/images/portfolio/photography/Photo 3.jpeg", category: "photography", alt: "Soft editorial portrait makeup in warm light" },
  { src: "/images/portfolio/photography/Photo 4.jpeg", category: "photography", alt: "Glowing skin styled for a magazine cover shoot" },
  { src: "/images/portfolio/photography/Photo 5.jpeg", category: "photography", alt: "Defined beauty look built to hold up under studio lighting" },

  // ---- Events (placeholders — no images uploaded yet) ----
  { src: "/images/portfolio/events/events-01.jpg", category: "events", alt: "Polished evening glam for a special event" },
  { src: "/images/portfolio/events/events-02.jpg", category: "events", alt: "Soft smoky eye for a black-tie occasion" },
  { src: "/images/portfolio/events/events-03.jpg", category: "events", alt: "Radiant party makeup with a warm bronze eye" },
  { src: "/images/portfolio/events/events-04.jpg", category: "events", alt: "Elegant evening look with a classic red lip" },
  { src: "/images/portfolio/events/events-05.jpg", category: "events", alt: "Glowing festive glam for a celebration" },
  { src: "/images/portfolio/events/events-06.jpg", category: "events", alt: "Statement evening eye with luminous skin" },
];
