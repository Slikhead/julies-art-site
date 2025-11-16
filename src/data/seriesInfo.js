// src/data/seriesInfo.js
import seriesText from "./seriesOrder.txt?raw";

// 1️⃣ Load order from seriesOrder.txt
export const seriesOrder = seriesText
  .split("\n")
  .map(line => line.trim().toLowerCase())
  .filter(line => line && !line.startsWith("#"));

// 2️⃣ Auto-import all series descriptions (modern syntax)
const descriptionFiles = import.meta.glob("./series-descriptions/*.txt", {
  eager: true,
  import: "default",
  query: "?raw",
});


// 3️⃣ Convert filenames → cleaned text object
export const seriesDescriptions = Object.fromEntries(
  Object.entries(descriptionFiles).map(([path, text]) => {
    const key = path.split("/").pop().replace(".txt", "").toLowerCase();
    const cleaned = text
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#")) // ignore comment lines
      .join(" ");
    return [key, cleaned];
  })
);
// 🛍️ Import shop page descriptions
const shopFiles = import.meta.glob("./shop-descriptions/*.txt", {
  eager: true,
  import: "default",
  query: "?raw",
});


export const shopDescriptions = Object.fromEntries(
  Object.entries(shopFiles).map(([path, text]) => {
    const key = path.replaceAll("\\", "/").split("/").pop().replace(".txt", "").toLowerCase();
    const cleaned = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .join(" ");
    return [key, cleaned];
  })
);
