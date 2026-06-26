// Turns Sia's flat-background JPG logo into clean transparent-background PNG
// assets: full lockup + monogram-only, each in charcoal (for light surfaces)
// and bone (for dark surfaces), plus a favicon. Run: node scripts/gen-logo.mjs
import sharp from "sharp";

const SRC = "public/Sia_logo.jpg";
const OUT = "public/images/brand";

const CHARCOAL = { r: 0x1a, g: 0x19, b: 0x17 };
const BONE = { r: 0xf4, g: 0xf1, b: 0xec };

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({
  resolveWithObject: true,
});
const W = info.width;
const H = info.height;
const C = info.channels;
const lum = (i) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

// Background luminance from a corner; key the dark artwork out of it.
const bgL = lum(0);
const DARK = 18; // luminance that maps to fully opaque
const alphaAt = (x, y) => {
  const i = (y * W + x) * C;
  const a = ((bgL - lum(i)) / (bgL - DARK)) * 255;
  return Math.max(0, Math.min(255, a));
};

// Build an alpha matte for the whole image.
const matte = new Uint8ClampedArray(W * H);
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) matte[y * W + x] = alphaAt(x, y);

// Row coverage → find the gap that separates the monogram from the wordmark.
const rowSum = new Array(H).fill(0);
for (let y = 0; y < H; y++) {
  let s = 0;
  for (let x = 0; x < W; x++) s += matte[y * W + x];
  rowSum[y] = s;
}
const threshold = Math.max(...rowSum) * 0.02;
const filled = rowSum.map((s) => s > threshold);
const firstRow = filled.indexOf(true);
const lastRow = filled.lastIndexOf(true);

// The monogram and wordmark are separated by the LARGEST empty band of rows.
// (Small 1px dips inside the wordmark must be ignored — pick the longest run.)
const emptyRuns = [];
let runStart = null;
for (let r = firstRow; r <= lastRow; r++) {
  if (!filled[r] && runStart === null) runStart = r;
  if (filled[r] && runStart !== null) {
    emptyRuns.push([runStart, r - 1]);
    runStart = null;
  }
}
const biggest = emptyRuns.sort((a, b) => b[1] - b[0] - (a[1] - a[0]))[0];
const gap = biggest ? Math.round((biggest[0] + biggest[1]) / 2) : lastRow;

function colBounds(y0, y1) {
  let minX = W,
    maxX = 0;
  for (let yy = y0; yy < y1; yy++)
    for (let x = 0; x < W; x++)
      if (matte[yy * W + x] > threshold / W) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
  return [minX, maxX];
}

// Compose a recoloured silhouette PNG for a given crop + colour.
// padBottom defaults to pad, but can be 0 when y1 is a hard cut (the gap)
// so the monogram crop never bleeds into the wordmark below it.
async function emit(name, y0, y1, color, pad = 24, padBottom = pad) {
  const [minX, maxX] = colBounds(y0, y1);
  const x0 = Math.max(0, minX - pad);
  const x1 = Math.min(W, maxX + pad);
  const yy0 = Math.max(0, y0 - pad);
  const yy1 = Math.min(H, y1 + padBottom);
  const cw = x1 - x0;
  const ch = yy1 - yy0;
  const out = Buffer.alloc(cw * ch * 4);
  for (let yy = 0; yy < ch; yy++) {
    for (let xx = 0; xx < cw; xx++) {
      const a = matte[(yy0 + yy) * W + (x0 + xx)];
      const o = (yy * cw + xx) * 4;
      out[o] = color.r;
      out[o + 1] = color.g;
      out[o + 2] = color.b;
      out[o + 3] = a;
    }
  }
  await sharp(out, { raw: { width: cw, height: ch, channels: 4 } })
    .png()
    .toFile(`${OUT}/${name}.png`);
  console.log("✓", name, `${cw}x${ch}`);
}

// Full lockup (monogram + wordmark) and monogram-only, in both colours.
await emit("logo-charcoal", firstRow, lastRow, CHARCOAL);
await emit("logo-bone", firstRow, lastRow, BONE);
await emit("mark-charcoal", firstRow, gap, CHARCOAL, 24, 6);
await emit("mark-bone", firstRow, gap, BONE, 24, 6);

// Favicon: bone monogram on a charcoal rounded square.
const [mnX0, mnX1] = colBounds(firstRow, gap);
const mw = mnX1 - mnX0;
const mh = gap - firstRow;
const markBuf = Buffer.alloc(mw * mh * 4);
for (let yy = 0; yy < mh; yy++)
  for (let xx = 0; xx < mw; xx++) {
    const a = matte[(firstRow + yy) * W + (mnX0 + xx)];
    const o = (yy * mw + xx) * 4;
    markBuf[o] = BONE.r;
    markBuf[o + 1] = BONE.g;
    markBuf[o + 2] = BONE.b;
    markBuf[o + 3] = a;
  }
const markPng = await sharp(markBuf, { raw: { width: mw, height: mh, channels: 4 } })
  .resize(40, 40, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
const square = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" rx="13" fill="#1A1917"/></svg>`
);
await sharp(square)
  .composite([{ input: markPng, gravity: "center" }])
  .png()
  .toFile("public/favicon.png");
console.log("✓ favicon.png 64x64");
