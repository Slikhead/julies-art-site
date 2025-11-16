/**
 * 🛍️ populateShopData.js
 * -------------------------------------------------------
 * Scans your shop artwork folders and ensures that:
 *  1. Each new subfolder has a series description.
 *  2. Each image has a matching caption file.
 *  3. Missing or deleted files are detected safely.
 * -------------------------------------------------------
 */

import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

// 🧭 Base paths
const BASE_ARTWORKS = "src/assets/artworks";
const DATA_DIR = "src/data";
const CAPTIONS_DIR = path.join(DATA_DIR, "shop-captions");
const SERIES_DESC_DIR = path.join(DATA_DIR, "series-descriptions");
const SHOP_DESC_DIR = path.join(DATA_DIR, "shop-descriptions");

// 🧰 Ensure data directories exist
[CAPTIONS_DIR, SERIES_DESC_DIR, SHOP_DESC_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 🧩 Shop categories to scan
const SHOP_FOLDERS = ["earrings", "cards", "pet-portraits"];

async function populateShopData() {
  console.log("\n🛍️ Running populateShopData.js ...\n");

  for (const folder of SHOP_FOLDERS) {
    const galleryPath = path.join(BASE_ARTWORKS, folder);
    if (!fs.existsSync(galleryPath)) {
      console.log(`⚠️  Missing folder: ${galleryPath}, skipping.`);
      continue;
    }

    console.log(`\n📂 Checking gallery: ${folder.toUpperCase()}`);

    // ✅ Ensure a shop description exists
    const shopDescPath = path.join(SHOP_DESC_DIR, `${folder}.txt`);
    if (!fs.existsSync(shopDescPath)) {
      const desc = await ask(`📝 Enter page description for "${folder}":\n> `);
      fs.writeFileSync(shopDescPath, desc.trim() || "(no description yet)");
      console.log(`✅ Created: ${shopDescPath}`);
    }

    // 🧭 Scan subfolders (series)
    const subfolders = fs
      .readdirSync(galleryPath, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const series of subfolders) {
      const seriesPath = path.join(galleryPath, series);
      const seriesFile = path.join(SERIES_DESC_DIR, `${series}.txt`);

      // ✅ Ensure series description
      if (!fs.existsSync(seriesFile)) {
        const desc = await ask(`💬 Enter description for series "${series}":\n> `);
        fs.writeFileSync(seriesFile, desc.trim() || "(no description yet)");
        console.log(`✅ Created: ${seriesFile}`);
      }

      // 🖼️ Scan images
      const images = fs
        .readdirSync(seriesPath)
        .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

      for (const img of images) {
        const baseName = img.replace(/\.[^/.]+$/, "");
        const captionFile = path.join(CAPTIONS_DIR, `${baseName}.txt`);

        if (!fs.existsSync(captionFile)) {
          const caption = await ask(`🖊️ Caption for "${img}" in ${series}: \n> `);
          fs.writeFileSync(captionFile, caption.trim() || "(no caption yet)");
          console.log(`✅ Created: ${captionFile}`);
        }
      }
    }
  }

  console.log("\n🎉 Shop data updated successfully!");
  rl.close();
}

populateShopData().catch((err) => {
  console.error("❌ Error:", err);
  rl.close();
});
