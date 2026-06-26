// Generates on-brand placeholder photography so the site looks intentional
// before real images are added. Run: node scripts/gen-placeholders.mjs
// These are meant to be REPLACED — drop real photos at the same paths.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

// Palette pairs (top -> bottom gradient) per category, in the brand tones.
const palettes = {
  hero: ["#2B2926", "#A56A4E"],
  about: ["#C9C0B2", "#A89F90"],
  bridal: ["#E4DFD6", "#CBA67C"],
  fashion: ["#A89F90", "#2B2926"],
  photography: ["#CBA67C", "#9A8467"],
  events: ["#7C8060", "#2B2926"],
};

function svg(w, h, [from, to], label, sub) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stop-color="${from}"/>
        <stop offset="100%" stop-color="${to}"/>
      </linearGradient>
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/>
        <feColorMatrix type="saturate" values="0"/></filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" filter="url(#n)" opacity="0.06"/>
    <text x="50%" y="48%" text-anchor="middle" fill="#F4F1EC"
      font-family="Georgia, serif" font-size="${Math.round(w / 16)}"
      font-style="italic" opacity="0.92">${label}</text>
    <text x="50%" y="58%" text-anchor="middle" fill="#F4F1EC"
      font-family="Arial, sans-serif" font-size="${Math.round(w / 46)}"
      letter-spacing="${w / 120}" opacity="0.7">${sub}</text>
  </svg>`;
}

async function write(path, w, h, palette, label, sub) {
  await mkdir(dirname(path), { recursive: true });
  await sharp(Buffer.from(svg(w, h, palette, label, sub)))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path);
  console.log("✓", path);
}

const jobs = [
  ["public/images/hero/hero.jpg", 1920, 1280, palettes.hero, "Sia's Makeup", "TORONTO · EDITORIAL"],
  ["public/images/about/portrait.jpg", 1000, 1250, palettes.about, "Sia", "THE ARTIST"],
];

for (const cat of ["bridal", "fashion", "photography", "events"]) {
  for (let i = 1; i <= 6; i++) {
    const n = String(i).padStart(2, "0");
    jobs.push([
      `public/images/portfolio/${cat}/${cat}-${n}.jpg`,
      900,
      i % 3 === 0 ? 1200 : 1100, // vary heights for an organic masonry rhythm
      palettes[cat],
      cat.charAt(0).toUpperCase() + cat.slice(1),
      `SIA'S MAKEUP · ${n}`,
    ]);
  }
}

await Promise.all(jobs.map((j) => write(...j)));
console.log("\nDone — generated", jobs.length, "placeholder images.");
