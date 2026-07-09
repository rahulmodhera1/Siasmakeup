// ============================================================================
//  SITE CONTENT
//  ---------------------------------------------------------------------------
//  Central, typed place for brand details, services, pricing and testimonials.
//  Edit copy and prices here — the components read straight from this file.
// ============================================================================

import type { Category } from "./gallery";

export const brand = {
  name: "Sia's Makeup",
  wordmark: "SIA'S MAKEUP",
  monogram: "SM",
  artist: "Sia",
  email: "Siasmakeup@hotmail.com",
  phone: "(437) 882-5076",
  phoneHref: "tel:+14378825076",
  instagram: "https://instagram.com/siasmakeup",
  instagramHandle: "@Siasmakeup",
  tiktok: "https://www.tiktok.com/@siasmakeupp",
  tiktokHandle: "@Siasmakeupp",
  // Facebook page slug is a best guess — update if the real URL differs.
  facebook: "https://www.facebook.com/siasmakeup",
  facebookHandle: "Sia's Makeup",
  location: "Toronto, ON",
  serviceArea: "Available across the GTA",
  tagline: "Toronto · Freelance Makeup Artist",
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  title: string;
  blurb: string;
  image: string;
  category: Category;
  /** Optional CSS object-position for the card crop (e.g. focus on the face). */
  imagePosition?: string;
};

export const services: Service[] = [
  {
    title: "Bridal",
    blurb: "Timeless, photograph-ready beauty for the day you'll remember forever.",
    image: "/images/portfolio/bridal/Merald2.jpeg",
    category: "bridal",
    imagePosition: "50% 20%",
  },
  {
    title: "Fashion",
    blurb: "Editorial and runway looks that translate a creative vision onto skin.",
    image: "/images/portfolio/fashion/Forbidden Desire 1.jpeg",
    category: "fashion",
    imagePosition: "50% 0%",
  },
  {
    title: "Photography",
    blurb: "Camera-tested makeup engineered to hold up under any lighting.",
    image: "/images/portfolio/photography/Sara_ann_4.jpeg",
    category: "photography",
    imagePosition: "50% 12%",
  },
  {
    title: "Events",
    blurb: "Polished glam for galas, parties and the moments worth dressing up for.",
    image: "/images/portfolio/events/events-couple-01.png",
    category: "events",
  },
];

// ---------------------------------------------------------------------------
//  PRICE LIST  — Sia's real published rates.
//  Grouped into three categories shown as tabs in the Pricing section.
//  To edit: change a price string, add a row to `items`, or add a block.
// ---------------------------------------------------------------------------
export type PriceRow = {
  name: string;
  price: string; // e.g. "$130", "TBD", "40%"
  unit?: string; // e.g. "per head"
  includes?: string; // optional inclusions sentence
};

export type PriceBlock = {
  title?: string; // e.g. "Within GTA"
  items: PriceRow[];
};

export type PriceCategory = {
  id: string;
  label: string;
  subject: string; // pre-fills the contact form when "Enquire" is clicked
  intro?: string;
  footnote?: string;
  blocks: PriceBlock[];
};

export const priceList: PriceCategory[] = [
  {
    id: "bridal",
    label: "Bridal",
    subject: "Bridal inquiry",
    intro: "All services include false lashes.",
    blocks: [
      {
        title: "Within the GTA",
        items: [
          { name: "Bridal Consultation", price: "$30" },
          { name: "Bridal Trial", price: "$50" },
          { name: "Bridal Makeup", price: "$130" },
          { name: "Mother of the Bride / Groom", price: "$120" },
          { name: "Bridesmaid's Makeup", price: "$100", unit: "per person" },
          { name: "Travel / Kit Fee", price: "$40" },
        ],
      },
      {
        title: "Out of Town",
        items: [
          { name: "Bridal Consultation", price: "$30" },
          { name: "Bridal Trial", price: "$70" },
          { name: "Bridal Makeup", price: "$150" },
          { name: "Mother of the Bride / Groom", price: "$140" },
          { name: "Bridesmaid's Makeup", price: "$120", unit: "per person" },
          { name: "Travel / Kit Fee", price: "TBD" },
        ],
      },
      {
        title: "Out of Country",
        items: [
          { name: "Bridal Consultation", price: "$30" },
          { name: "Bridal Trial", price: "TBD" },
          { name: "Bridal Makeup", price: "$150" },
          { name: "Mother of the Bride / Groom", price: "$140" },
          { name: "Bridesmaid's Makeup", price: "$120", unit: "per person" },
          { name: "Travel (round trip)", price: "40%" },
        ],
      },
    ],
  },
  {
    id: "makeup",
    label: "Makeup Services",
    subject: "Makeup services inquiry",
    footnote: "Set prices apply with or without lashes · Travel fee TBD.",
    blocks: [
      {
        items: [
          { name: "False Lash Application", price: "$5" },
          {
            name: "False Lash + Liner",
            price: "$10",
            includes: "Mascara, tightrope lining, false lashes.",
          },
          {
            name: "Brows Only",
            price: "$20",
            includes: "Filling, concealing + powder.",
          },
          {
            name: "Eyes Only",
            price: "$30",
            includes: "Light brows, eyeshadow, liner, mascara + lashes.",
          },
          {
            name: "Express Face",
            price: "$45",
            includes:
              "Skin prep, brows, mascara, a wash of colour, light concealing, blush / bronzer + lipgloss.",
          },
          {
            name: "Full Face Makeup",
            price: "$85",
            includes:
              "Skin prep, colour correcting, brows, full eyes, concealer, foundation, bronzer / contour, blush, highlight + false lashes.",
          },
          {
            name: "SFX · Halloween · Theatre",
            price: "$100",
            includes: "Special-effects, costume & stage makeup.",
          },
        ],
      },
    ],
  },
  {
    id: "mens",
    label: "Men's Grooming",
    subject: "Men's grooming inquiry",
    footnote: "Travel + kit fee determined upon booking.",
    blocks: [
      {
        title: "Brows & Beards",
        items: [
          { name: "Eyebrow Clean-Up / Shaping", price: "$10" },
          { name: "Eyebrow Tinting", price: "$15" },
          { name: "Beard Trimming / Light Shaping", price: "$25" },
          { name: "Beard Tinting", price: "$30" },
        ],
      },
      {
        title: "Grooming Packages",
        items: [
          {
            name: "Basic Grooming",
            price: "$50",
            unit: "single look / event",
            includes:
              "Skin prep, light concealer, anti-shine products, beard & eyebrow grooming + basic hair styling.",
          },
          {
            name: "Headshots / Photography",
            price: "$100",
            unit: "1–2 looks",
            includes:
              "Skin prep, concealer, beard & eyebrow grooming, anti-shine products + hair styling.",
          },
          {
            name: "Wedding Day Grooming",
            price: "$120",
            includes:
              "Skin prep, light foundation / concealer, beard & eyebrow grooming, anti-shine products, hair styling + touch-up kit.",
          },
        ],
      },
    ],
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The excitement about the work really showed — and so did the results. The makeup lasted all day from 12:30 to 9 pm in the summer heat, and it was perfectly tailored to my skin. Black girl approved!",
    author: "Verified Client",
    role: "",
  },
  {
    quote:
      "You did an amazing job — all of us looked absolutely gorgeous and stunning. You were so funny and extremely attentive.",
    author: "Verified Client",
    role: "",
  },
  {
    quote:
      "You made me feel more confident in myself today than I ever have in my life. You have such a warm heart — thank you.",
    author: "Verified Client",
    role: "",
  },
  {
    quote:
      "Loved my eye makeup for a wedding event — absolutely beautiful work!",
    author: "Verified Client",
    role: "",
  },
];

export const eventTypes = [
  "Bridal",
  "Makeup",
  "Men's Grooming",
  "Photography",
  "Other",
] as const;
