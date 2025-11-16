// src/data/artworks.js
// Dynamically load all artworks from subfolders (paintings, earrings, pet-portraits, cards)
const modules = import.meta.glob(
  "/src/assets/artworks/{paintings,earrings,pet-portraits,cards}/**/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

console.log("Loaded artwork paths:", Object.keys(modules));

// Convert to a structured array of artwork objects
let artworks = Object.keys(modules).map((path) => {
  const fileName = path.split("/").pop().replace(/\.[^/.]+$/, ""); // remove extension
  const folderParts = path.split("/");
  const series = folderParts[folderParts.length - 2].toLowerCase(); // subfolder name as series

  // Derive category from path
  let category = "Paintings";
  if (path.includes("/earrings/")) category = "Earrings";
  else if (path.includes("/pet-portraits/")) category = "Pet Portraits";
  else if (path.includes("/cards/")) category = "Quirky Cards";

  // Sold flag detection
  const sold = fileName.toLowerCase().includes("sold");

  // Clean up the title (remove category and “sold” keywords)
  const titleParts = fileName.split("-").filter(
    (p) => !["sold", "paintings", "earrings", "pet", "cards"].includes(p.toLowerCase())
  );
  const title =
    titleParts
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ") || "Untitled";

  return {
    title,
    image: modules[path].default,
    category,
    series,
    sold,
    path, // keep path for sorting or debugging
  };
});

// ✅ Sort newest first based on import order (or filename order)
artworks = artworks.sort((a, b) => (a.path < b.path ? 1 : -1));

export default artworks;
