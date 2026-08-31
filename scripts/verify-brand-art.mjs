import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const brandDir = process.env.BRAND_ART_DIR ?? "public/brand";
const expected = new Set([
  "watercolor-pad.png",
  "watercolor-orbit.png",
  "watercolor-room.png",
  "watercolor-deal.png",
  "watercolor-attach.png",
]);
const forbiddenMd5s = new Set([
  "cb3667f0bb96c72d3389404ae28ae22d",
  "4ee496d688a243fe17ceb3c73b95277e",
  "a2671e4fc4e64ad2285159da5968feb4",
  "07a853391b69873037888ca653649d36",
  "73faae52872e95f72c7c728be39fd637",
  "6eebe8dd14371fbdc268ea7d2742069b",
  "5212bfa06f9c82d8949175320054d44e",
]);
const errors = [];
const names = existsSync(brandDir) ? readdirSync(brandDir) : [];
const files = new Set(names);

for (const name of expected) {
  if (!files.has(name)) {
    errors.push(`Missing expected asset: ${name}`);
  }
}

for (const name of names) {
  if (/^watercolor-.*\.png$/i.test(name) && !expected.has(name)) {
    errors.push(`Unexpected watercolor asset: ${name}`);
  }
  if (/^dd_.*\.png$/i.test(name)) {
    errors.push(`Forbidden dd_ asset: ${name}`);
  }

  const path = join(brandDir, name);
  try {
    const md5 = createHash("md5").update(readFileSync(path)).digest("hex");
    if (forbiddenMd5s.has(md5)) {
      errors.push(`Forbidden legacy artwork hash: ${name} (${md5})`);
    }
  } catch {
    errors.push(`Could not hash asset: ${name}`);
  }
}

for (const name of expected) {
  if (!files.has(name)) continue;

  const path = join(brandDir, name);
  try {
    const metadata = await sharp(path).metadata();
    if (
      metadata.width === undefined ||
      metadata.height === undefined ||
      metadata.width * 9 !== metadata.height * 16
    ) {
      errors.push(
        `Asset is not 16:9: ${name} (${metadata.width ?? "?"}x${metadata.height ?? "?"})`,
      );
      continue;
    }

    const { data, info } = await sharp(path)
      .toColourspace("srgb")
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let purplePixels = 0;

    for (let offset = 0; offset < data.length; offset += info.channels) {
      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];
      const brighterPurpleChannel = Math.max(red, blue);

      if (
        red >= 60 &&
        blue >= 60 &&
        red > green * 1.2 &&
        blue > green * 1.2 &&
        Math.abs(red - blue) <= brighterPurpleChannel * 0.5
      ) {
        purplePixels += 1;
      }
    }

    const purplePercent =
      (purplePixels / (info.width * info.height)) * 100;
    if (purplePercent > 0.05) {
      errors.push(
        `Too many distinctly purple pixels: ${name} (${purplePercent.toFixed(4)}%)`,
      );
    }
  } catch {
    errors.push(`Could not inspect image: ${name}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Brand art verification passed for ${expected.size} assets.`);
}
