/**
 * Removes JPEG outer background without AI:
 * 1) Flood-fill from image edges through very dark pixels (edge-connected "outside").
 * 2) Dilate transparency into neighboring dark pixels — kills JPEG halos / gray
 *    fringe that AI removers and simple chroma-key miss. The screen stays opaque
 *    because it is not 4-connected to the outside through only dark pixels.
 *
 * Tune constants below if your source JPG changes.
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const INPUT = join(root, "public/assets/mockups/macbook-mockup.jpg");
const OUTPUT = join(root, "public/assets/mockups/macbook-mockup.png");

/** Max R+G+B to walk the flood from edges (outer bg is ~0). */
const FLOOD_RGB_SUM_MAX = 40;

/**
 * After flood, peel JPEG halos: any opaque pixel with R+G+B under this that touches
 * transparency becomes transparent. Repeat a few passes. Raise if a gray rim remains;
 * lower if laptop body gets nibbled (unlikely — silver is ~450+).
 */
const HALO_RGB_SUM_MAX = 92;

/** How many times to expand transparency into dark neighbors. */
const HALO_PASSES = 4;

function rgbSum(src, getI, x, y) {
  const i = getI(x, y);
  return src[i] + src[i + 1] + src[i + 2];
}

async function main() {
  const { data, info } = await sharp(INPUT)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const src = new Uint8Array(data);
  const getI = (x, y) => (y * w + x) * 3;

  const isDarkForFlood = (x, y) =>
    rgbSum(src, getI, x, y) < FLOOD_RGB_SUM_MAX;

  /** Transparent = 1 */
  const trans = new Uint8Array(w * h);
  const qx = new Int32Array(w * h);
  const qy = new Int32Array(w * h);
  let qt = 0;
  let qh = 0;

  const push = (x, y) => {
    const p = y * w + x;
    if (trans[p]) return;
    if (!isDarkForFlood(x, y)) return;
    trans[p] = 1;
    qx[qh] = x;
    qy[qh] = y;
    qh++;
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  while (qt < qh) {
    const x = qx[qt];
    const y = qy[qt];
    qt++;
    if (x > 0) push(x - 1, y);
    if (x + 1 < w) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y + 1 < h) push(x, y + 1);
  }

  const touchesMask = (mask, x, y) => {
    for (const [dx, dy] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      if (mask[ny * w + nx]) return true;
    }
    return false;
  };

  for (let pass = 0; pass < HALO_PASSES; pass++) {
    const next = new Uint8Array(trans);
    let changed = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const p = y * w + x;
        if (trans[p]) continue;
        if (rgbSum(src, getI, x, y) > HALO_RGB_SUM_MAX) continue;
        if (!touchesMask(trans, x, y)) continue;
        next[p] = 1;
        changed++;
      }
    }
    trans.set(next);
    if (changed === 0) break;
  }

  const out = Buffer.alloc(w * h * 4);
  let transparent = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      const si = getI(x, y);
      const oi = p * 4;
      out[oi] = src[si];
      out[oi + 1] = src[si + 1];
      out[oi + 2] = src[si + 2];
      const a = trans[p] ? 0 : 255;
      out[oi + 3] = a;
      if (a === 0) transparent++;
    }
  }

  await sharp(out, {
    raw: { width: w, height: h, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(OUTPUT);

  console.log("Wrote", OUTPUT);
  console.log("Transparent pixels:", transparent, "/", w * h);
  console.log(
    "Tweak: FLOOD_RGB_SUM_MAX, HALO_RGB_SUM_MAX, HALO_PASSES in",
    fileURLToPath(import.meta.url),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
