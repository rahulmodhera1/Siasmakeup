import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { brand } from "@/lib/content";
import "./globals.css";

// Editorial high-contrast serif for display/headings.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

// Clean, neutral sans for body & UI.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://siasmakeup.vercel.app";
const description =
  "Sia is a Toronto-based freelance professional makeup artist specializing in bridal, fashion, photography and event makeup. Available across the GTA.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sia's Makeup — Toronto Bridal, Fashion & Editorial Makeup Artist",
  description,
  keywords: [
    "Toronto makeup artist",
    "bridal makeup Toronto",
    "freelance makeup artist GTA",
    "editorial makeup artist",
    "fashion makeup",
    "wedding makeup Toronto",
  ],
  authors: [{ name: brand.artist }],
  openGraph: {
    title: "Sia's Makeup — Toronto Bridal, Fashion & Editorial Makeup Artist",
    description,
    url: siteUrl,
    siteName: brand.name,
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/hero/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Sia's Makeup — editorial beauty by a Toronto makeup artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sia's Makeup — Toronto Bridal, Fashion & Editorial Makeup Artist",
    description,
    images: ["/images/hero/hero.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/brand/favicon.svg", type: "image/svg+xml" },
    ],
  },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: "#F4F1EC",
};

// JSON-LD structured data — helps search engines understand the business.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.name,
  image: `${siteUrl}/images/hero/hero.jpg`,
  url: siteUrl,
  email: `mailto:${brand.email}`,
  telephone: brand.phoneHref.replace("tel:", ""),
  description,
  sameAs: [brand.instagram, brand.tiktok, brand.facebook],
  areaServed: {
    "@type": "City",
    name: "Toronto",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  makesOffer: [
    "Bridal Makeup",
    "Event & Glam Makeup",
    "Photography & Editorial Makeup",
    "Men's Grooming",
    "SFX & Theatre Makeup",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
