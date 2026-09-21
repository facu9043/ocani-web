import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC_DIR =
  "C:\\Users\\WINDOW~1\\AppData\\Local\\Temp\\claude\\C--Users-Windows10-Desktop-APP-PARA-RESTAURANTE\\3417a174-0d0a-4fb8-b216-c591933b4de1\\images";
const GRID = path.join(SRC_DIR, "6.webp");
const LOGO_SRC = path.join(SRC_DIR, "7.png");
const OUT_DIR = path.join(process.cwd(), "public", "backdrop");
const OUT_SIZE = 240;

async function circleMask(size, solidStopPct = 0.88) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <defs>
      <radialGradient id="g" cx="50%" cy="50%" r="50%">
        <stop offset="${solidStopPct * 100}%" stop-color="white" stop-opacity="1"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#g)"/>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

// Cell layout of the 3x3 grid (1920x1280): each cell 640 wide x 427 tall.
// Crop a 427x427 square centered horizontally in each cell to frame the pile.
// The piles aren't perfectly centered in each grid cell — column 1 sits a
// bit right-of-center and column 3 a bit left-of-center — so nudge toward
// the middle column to keep each pile centered in its crop.
const COL_BIAS = [80, 0, -80];

function cellBox(col, row) {
  const cellW = 640;
  const gridH = 1280;
  const size = 427;
  const left = col * cellW + (cellW - size) / 2 + COL_BIAS[col];
  const top = Math.min(Math.round((row * gridH) / 3), gridH - size);
  return { left: Math.round(left), top, width: size, height: size };
}

const PILES = {
  walnut: cellBox(0, 0),
  peanut: cellBox(1, 0),
  almond: cellBox(2, 0),
  granola: cellBox(1, 1),
  oat: cellBox(2, 1),
  chia: cellBox(1, 2),
  chestnut: cellBox(2, 2),
};

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const mask = await circleMask(OUT_SIZE);

  for (const [name, box] of Object.entries(PILES)) {
    await sharp(GRID)
      .extract(box)
      .resize(OUT_SIZE, OUT_SIZE)
      .ensureAlpha()
      .composite([{ input: mask, blend: "dest-in" }])
      .webp({ quality: 78 })
      .toFile(path.join(OUT_DIR, `${name}.webp`));
    console.log("wrote", name);
  }

  // Logo: crop tightly around the round badge, then clip to a circle to
  // drop the dark mockup background behind it.
  const logoBox = { left: 199, top: 114, width: 743, height: 743 };
  const logoMask = await circleMask(logoBox.width, 0.965);
  await sharp(LOGO_SRC)
    .extract(logoBox)
    .ensureAlpha()
    .composite([{ input: logoMask, blend: "dest-in" }])
    .png()
    .toFile(path.join(process.cwd(), "public", "logo.png"));
  console.log("wrote logo");
}

main();
