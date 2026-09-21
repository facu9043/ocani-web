import sharp from "sharp";
import path from "node:path";

const SRC_DIR =
  "C:\\Users\\WINDOW~1\\AppData\\Local\\Temp\\claude\\C--Users-Windows10-Desktop-APP-PARA-RESTAURANTE\\3417a174-0d0a-4fb8-b216-c591933b4de1\\images";
const SRC = path.join(SRC_DIR, "8.png");
const OUT = path.join(process.cwd(), "public", "cart-icon.png");

// Crop to the cart body plus the nearest falling nuts (drop the sparse
// upper trail so the icon reads clearly at small sizes), then key out the
// near-white background to transparency so it drops onto any button color.
async function main() {
  const cropped = sharp(SRC).extract({ left: 0, top: 165, width: 311, height: 340 });
  const { data, info } = await cropped
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const min = Math.min(r, g, b);
    // Distance from white drives alpha: pure white -> 0, saturated color -> 255.
    const whiteness = min;
    const alpha = Math.max(0, Math.min(255, Math.round((255 - whiteness) * 1.6)));
    data[i + 3] = alpha;
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(OUT);
  console.log("wrote cart icon", width, height);
}

main();
