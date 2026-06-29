#!/usr/bin/env node
/**
 * Genera public/og-image.png a partir de public/og-image.svg
 * Uso: node scripts/generate-og-image.mjs
 * Requiere: sharp (incluido en las dependencias del proyecto)
 */

import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const svgBuffer = readFileSync(join(root, "public", "og-image.svg"));

await sharp(svgBuffer)
  .resize(1200, 630)
  .png({ quality: 95 })
  .toFile(join(root, "public", "og-image.png"));

console.log("✅  og-image.png generada en public/og-image.png (1200×630px)");
