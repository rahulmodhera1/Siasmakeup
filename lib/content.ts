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
  artist: "Sia",
  email: "Siasmakeup@hotmail.com",
  // Placeholder — Sia to confirm the real handle.
  instagram: "https://instagram.com/siasmakeup",
  instagramHandle: "@siasmakeup",
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
};

export const services: Service[] = [
  {
    title: "Bridal",
    blurb: "Timeless, photograph-ready beauty for the day you'll remember forever.",
    image: "/images/portfolio/bridal/bridal-01.jpg",
    category: "bridal",
  },
  {
    title: "Fashion",
    blurb: "Editorial and runway looks that translate a creative vision onto skin.",
    image: "/images/portfolio/fashion/fashion-01.jpg",
    category: "fashion",
  },
  {
    title: "Photography",
    blurb: "Camera-tested makeup engineered to hold up under any lighting.",
    image: "/images/portfolio/photography/photography-01.jpg",
    category: "photography",
  },
  {
    title: "Events",
    blurb: "Polished glam for galas, parties and the moments worth dressing up for.",
    image: "/images/portfolio/events/events-01.jpg",
    category: "events",
  },
];

export type PricingTile = {
  name: string;
  // Pre-fills the contact form subject when "Enquire" is clicked.
  subject: string;
  price: string;
  unit?: string;
  inclusions: string[];
};

export type PricingGroup = {
  label: string;
  note?: string;
  tiles: PricingTile[];
};

// NOTE: all figures below are placeholders. // TODO: Sia to confirm
export const pricing: PricingGroup[] = [
  {
    label: "Bridal",
    note: "Custom quotes for full bridal parties & productions.",
    tiles: [
      {
        name: "Bridal Trial",
        subject: "Bridal Trial enquiry",
        price: "from $120", // TODO: Sia to confirm
        inclusions: [
          "Private 90-minute consultation",
          "Skin prep & complexion mapping",
          "One full look, photographed for reference",
        ],
      },
      {
        name: "Bridal Day-Of",
        subject: "Bridal Day-Of enquiry",
        price: "from $250", // TODO: Sia to confirm
        inclusions: [
          "Long-wear, photo-ready application",
          "Lashes included",
          "Touch-up kit for the day",
        ],
      },
      {
        name: "Bridal Party",
        subject: "Bridal Party enquiry",
        price: "from $90", // TODO: Sia to confirm
        unit: "per person",
        inclusions: [
          "Coordinated looks for your party",
          "On-location, day-of application",
          "Group scheduling & timeline planning",
        ],
      },
    ],
  },
  {
    label: "Events",
    tiles: [
      {
        name: "Event / Glam Application",
        subject: "Event glam enquiry",
        price: "from $110", // TODO: Sia to confirm
        inclusions: [
          "Full-face evening glam",
          "Lashes included",
          "Soft or bold — built to your brief",
        ],
      },
    ],
  },
  {
    label: "Photography & Fashion",
    note: "Travel within the GTA available.",
    tiles: [
      {
        name: "Editorial / Shoot Rate",
        subject: "Editorial shoot enquiry",
        price: "from $150", // TODO: Sia to confirm
        unit: "per look",
        inclusions: [
          "Concept-led beauty for stills & motion",
          "Tested for studio & natural light",
          "Collaboration with your creative team",
        ],
      },
      {
        name: "On-Set Day Rate",
        subject: "On-set day rate enquiry",
        price: "from $650", // TODO: Sia to confirm
        unit: "per day",
        inclusions: [
          "Full-day on-set availability",
          "Continuity & touch-ups across looks",
          "Kit for multiple models & changes",
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

// Placeholder quotes. // TODO: Sia to replace with real client testimonials.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Sia made me feel completely like myself on my wedding day — just the most radiant version. It lasted from the first look to the last dance.",
    author: "Amara K.",
    role: "Bride · Toronto",
  },
  {
    quote:
      "An absolute professional on set. Calm, fast, and the skin she creates reads beautifully on camera. Our whole team rebooked her.",
    author: "Devon R.",
    role: "Fashion Photographer",
  },
  {
    quote:
      "She listened, then elevated. Exactly the look I described, but better than I imagined. I won't go to anyone else for events.",
    author: "Priya S.",
    role: "Repeat Client",
  },
];

export const eventTypes = ["Bridal", "Fashion", "Photography", "Event"] as const;
