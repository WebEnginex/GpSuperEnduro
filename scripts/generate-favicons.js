const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const logoPath = "public/images/logo/logo_SuperEnduro.png";
const outDir = "public/icons";

async function makeSquareIcon(size, outPath) {
  const trimmed = await sharp(logoPath)
    .trim({ threshold: 5 })
    .png()
    .toBuffer({ resolveWithObject: true });

  const pad = Math.round(size * 0.12);
  const maxW = size - pad * 2;
  const maxH = size - pad * 2;

  const fitted = await sharp(trimmed.data)
    .resize({
      width: maxW,
      height: maxH,
      fit: "inside",
      withoutEnlargement: false,
    })
    .png()
    .toBuffer({ resolveWithObject: true });

  const left = Math.floor((size - fitted.info.width) / 2);
  const top = Math.floor((size - fitted.info.height) / 2);

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 10, g: 10, b: 10, alpha: 1 },
    },
  })
    .composite([{ input: fitted.data, left, top }])
    .png()
    .toFile(outPath);

  console.log("wrote", outPath);
}

async function buildIco(pngPaths, outPath) {
  const pngs = [];
  for (const file of pngPaths) {
    const buf = await sharp(file).png().toBuffer();
    const meta = await sharp(buf).metadata();
    pngs.push({ size: meta.width || 32, buf });
  }

  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * pngs.length;
  const parts = [];

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  parts.push(header);

  for (const img of pngs) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 0);
    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    parts.push(entry);
    offset += img.buf.length;
  }

  for (const img of pngs) parts.push(img.buf);
  fs.writeFileSync(outPath, Buffer.concat(parts));
  console.log("wrote", outPath);
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });

  const sizes = [
    [16, "favicon-16x16.png"],
    [32, "favicon-32x32.png"],
    [48, "favicon-48x48.png"],
    [180, "apple-touch-icon.png"],
    [192, "android-chrome-192x192.png"],
    [512, "android-chrome-512x512.png"],
  ];

  for (const [size, name] of sizes) {
    await makeSquareIcon(size, path.join(outDir, name));
  }

  await buildIco(
    [
      path.join(outDir, "favicon-16x16.png"),
      path.join(outDir, "favicon-32x32.png"),
      path.join(outDir, "favicon-48x48.png"),
    ],
    "public/favicon.ico"
  );
  fs.copyFileSync("public/favicon.ico", path.join(outDir, "favicon.ico"));
  fs.unlinkSync(path.join(outDir, "favicon-48x48.png"));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
