// src/components/ArtworksForSale.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";
import { useCart } from "../context/CartContext";
import { seriesOrder } from "../data/seriesInfo";

// ✅ Load all “for sale” images
const imageModules = import.meta.glob(
  "/src/assets/artworks/for-sale/**/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

// ✅ Load captions for individual artworks
const captionModules = import.meta.glob(
  "/src/data/for-sale-captions/*.txt",
  { eager: true, import: "default", query: "?raw" }
);

// ✅ Load descriptions for series (one per series)
const descriptionModules = import.meta.glob(
  "/src/data/for-sale-descriptions/*.txt",
  { eager: true, import: "default", query: "?raw" }
);

// 🧾 Build captions map: basename → text
const saleCaptions = Object.fromEntries(
  Object.entries(captionModules).map(([path, text]) => {
    const key = path.split("/").pop().replace(".txt", "").toLowerCase();
    return [key, text];
  })
);

// 🧾 Build series description map: series → text
const saleSeriesDescriptions = Object.fromEntries(
  Object.entries(descriptionModules).map(([path, text]) => {
    const key = path.split("/").pop().replace(".txt", "").toLowerCase();
    const cleaned = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .join(" ");
    return [key, cleaned];
  })
);

// 🧩 Build artworks array from imageModules
const baseArtworks = Object.keys(imageModules).map((path) => {
  const fileName = path.split("/").pop().replace(/\.[^/.]+$/, "");
  const series = path
    .split("/for-sale/")[1]
    .split("/")[0]
    .trim()
    .toLowerCase();

  const cleanTitle = fileName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const captionKey = fileName.toLowerCase();
  const caption = saleCaptions[captionKey] || "";

  return {
    id: path, // unique id
    image: imageModules[path].default,
    title: cleanTitle,
    series,
    caption,
  };
});

export default function ArtworksForSale() {
  const { addItem } = useCart();
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  // 🧭 Determine which series exist in for-sale
  const availableSeries = Array.from(
    new Set(baseArtworks.map((a) => a.series))
  );

  // 🏅 Order series using seriesOrder.txt where possible
  const normalizedOrder = (seriesOrder || []).map((s) =>
    s.trim().toLowerCase()
  );
  const orderedSeries = [
    ...normalizedOrder.filter((s) => availableSeries.includes(s)),
    ...availableSeries.filter((s) => !normalizedOrder.includes(s)),
  ];

  const filters = [
    "All",
    ...orderedSeries.map(
      (s) => s.charAt(0).toUpperCase() + s.slice(1)
    ),
  ];

  // 🧩 Filter artworks globally (used for non-All view)
  const filteredArtworks =
    filter === "All"
      ? baseArtworks
      : baseArtworks.filter(
          (a) => a.series.toLowerCase() === filter.toLowerCase()
        );

  // 🖼️ Handle thumbnail click
  const handleSelect = (art, index, imagesForLightbox) => {
    setCurrentImages(imagesForLightbox);
    setCurrentIndex(index);
    setSelected(true);
  };

  const handleAddToCart = (art) => {
    if (!art) return;
    addItem({
      id: art.id,
      title: art.title,
      image: art.image,
      series: art.series,
    });
  };

  return (
    <motion.section
      className="py-16 px-4 max-w-7xl mx-auto text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* 🟣 Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border transition 
              ${
                filter === f
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 🏷️ Page Title */}
      <h1 className="text-3xl font-serif text-gray-900 mb-4 underline underline-offset-8">
        Artworks for Sale
      </h1>

      {/* 🖼️ “All” view: grouped by series */}
      {filter === "All" ? (
        <div className="mt-10 space-y-12">
          {orderedSeries.map((seriesKey) => {
            const seriesArtworks = baseArtworks.filter(
              (a) => a.series === seriesKey
            );
            if (seriesArtworks.length === 0) return null;

            const label =
              seriesKey.charAt(0).toUpperCase() + seriesKey.slice(1);
            const description =
              saleSeriesDescriptions[seriesKey.toLowerCase()] || "";

            return (
              <div key={seriesKey}>
                {/* Series header + divider */}
                <div className="mb-6">
                  <h2
                    className="text-2xl font-semibold text-gray-900 capitalize mb-2 underline underline-offset-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {label}
                  </h2>
                  <div className="w-24 h-[1px] bg-gray-300 mx-auto mb-4" />
                  {description && (
                    <p className="text-gray-600 text-sm max-w-3xl mx-auto leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>

                {/* Series thumbnails grid */}
                <div className="flex justify-center flex-wrap gap-8 sm:gap-10 md:gap-12">
                  {seriesArtworks.map((art, index) => (
                    <div
                      key={art.id}
                      className="relative group cursor-pointer"
                      onClick={() =>
                        handleSelect(art, index, seriesArtworks)
                      }
                    >
                      <div
                        className="overflow-hidden rounded-lg transition-transform duration-500 ease-out group-hover:-translate-y-1"
                        style={{ backgroundColor: "#f5f5f5" }}
                      >
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-[280px] h-[280px] object-contain rounded-lg transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-3 text-gray-800 font-medium">
                        {art.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {/* 📜 Single series description in filtered mode */}
          {filter !== "All" && (
            <p className="text-gray-600 text-base mb-8 max-w-3xl mx-auto leading-relaxed">
              {saleSeriesDescriptions[filter.toLowerCase()] || ""}
            </p>
          )}

          {/* Filtered thumbnails */}
          <div className="flex justify-center flex-wrap gap-8 sm:gap-10 md:gap-12">
            {filteredArtworks.map((art, idx, arr) => (
              <div
                key={art.id}
                className="relative group cursor-pointer"
                onClick={() =>
  handleSelect(
    art,
    baseArtworks.findIndex(a => a.id === art.id),
    baseArtworks
  )
}
              >
                <div
                  className="overflow-hidden rounded-lg transition-transform duration-500 ease-out group-hover:-translate-y-1"
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-[280px] h-[280px] object-contain rounded-lg transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-gray-800 font-medium">
                  {art.title}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 💡 Lightbox with captions & Add to Cart */}
      {selected && (
       <Lightbox
  images={currentImages}
  currentIndex={currentIndex}
  setCurrentIndex={setCurrentIndex}
  onClose={() => setSelected(false)}
  showCaptions={true}
  onAddToCart={handleAddToCart}
/>
      )}
    </motion.section>
  );
}
