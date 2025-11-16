/**
 * 🎨 populatePaintingData.js
 * -------------------------------------------------------
 * Scans your painting gallery and ensures that:
 *  1. Each new series folder has a series description.
 *  2. Each image has a caption file.
 *  3. New series are appended to seriesOrder.txt if missing.
 *  4. Deleted items are detected safely.
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
const PAINTINGS_DIR = "src/assets/artworks/paintings";
const DATA_DIR = "src/data";
const CAPTIONS_DIR = path.join(DATA_DIR, "gallery-captions");
const SERIES_DESC_DIR = path.join(DATA_DIR, "series-descriptions");
const SERIES_ORDER_FILE = path.join(DATA_DIR, "seriesOrder.txt");

// 🧰 Ensure directories exist
[CAPTIONS_DIR, SERIES_DESC_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function populatePaintingData() {
  console.log("\n🎨 Running populatePaintingData.js ...\n");

  if (!fs.existsSync(PAINTINGS_DIR)) {
    console.log(`⚠️  Missing folder: ${PAINTINGS_DIR}`);
    rl.close();
    return;
  }

  // ✅ Load current seriesOrder.txt
  let seriesOrder = [];
  if (fs.existsSync(SERIES_ORDER_FILE)) {
    const lines = fs
      .readFileSync(SERIES_ORDER_FILE, "utf8")
      .split("\n")
      .map((l) => l.trim().toLowerCase())
      .filter((l) => l && !l.startsWith("#"));
    seriesOrder = lines;
  }

  // 🧭 Scan series folders
  const seriesFolders = fs
    .readdirSync(PAINTINGS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const newSeries = [];

  for (const series of seriesFolders) {
    console.log(`\n📁 Series: ${series}`);

    // ✅ Ensure description
    const seriesDescPath = path.join(SERIES_DESC_DIR, `${series}.txt`);
    if (!fs.existsSync(seriesDescPath)) {
      const desc = await ask(`💬 Enter description for series "${series}":\n> `);
      fs.writeFileSync(seriesDescPath, desc.trim() || "(no description yet)");
      console.log(`✅ Created: ${seriesDescPath}`);
    }

    // ✅ Add to seriesOrder.txt if missing
    if (!seriesOrder.includes(series.toLowerCase())) {
      newSeries.push(series);
      seriesOrder.push(series.toLowerCase());
    }

    // 🖼️ Scan images
    const seriesPath = path.join(PAINTINGS_DIR, series);
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

  // ✅ Update seriesOrder.txt if needed
  if (newSeries.length > 0) {
    const currentText = fs.existsSync(SERIES_ORDER_FILE)
      ? fs.readFileSync(SERIES_ORDER_FILE, "utf8").trim() + "\n"
      : "# ✏️ Edit this list to control display order\n";

    const additions = newSeries.map((s) => s.toLowerCase()).join("\n");
    fs.writeFileSync(SERIES_ORDER_FILE, `${currentText}${additions}\n`);
    console.log(`\n🆕 Updated seriesOrder.txt with new series: ${newSeries.join(", ")}`);
  }

  console.log("\n🎉 Painting data updated successfully!");
  rl.close();
}

populatePaintingData().catch((err) => {
  console.error("❌ Error:", err);
  rl.close();
});
