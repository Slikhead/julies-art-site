// src/components/ShopGallery.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";
import { shopDescriptions, seriesOrder } from "../data/seriesInfo";

// 🧩 Load artwork images
const allModules = import.meta.glob("/src/assets/artworks/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

// 🧩 Load captions as raw text
const captionModules = import.meta.glob("/src/data/shop-captions/*.txt", {
  eager: true,
  import: "default",
  query: "?raw",
});

export default function ShopGallery({ basePath, title }) {
  // --- React states ---
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  // ✅ Filter images for this gallery path
  const modules = Object.fromEntries(
    Object.entries(allModules).filter(([path]) => path.includes(`artworks/${basePath}`))
  );

  // ✅ Build artwork objects with captions
  const artworksWithCaptions = Object.keys(modules).map((path) => {
    const fileName = path.split("/").pop().replace(/\.[^/.]+$/, "");
    const series = path.split("/").slice(-2, -1)[0];
    const cleanTitle = fileName
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const captionKey = Object.keys(captionModules).find((key) =>
      key.toLowerCase().includes(`${fileName.toLowerCase()}.txt`)
    );
    const caption = captionKey ? captionModules[captionKey] : "";

    return {
      image: modules[path].default,
      title: cleanTitle,
      series,
      caption,
    };
  });

  // ✅ Sort artworks per seriesOrder.txt
  artworksWithCaptions.sort((a, b) => {
    const orderA = seriesOrder.indexOf(a.series.toLowerCase());
    const orderB = seriesOrder.indexOf(b.series.toLowerCase());
    if (orderA === -1 && orderB === -1) return a.series.localeCompare(b.series);
    if (orderA === -1) return 1;
    if (orderB === -1) return -1;
    return orderA - orderB;
  });

  // ✅ Get all filters
  const filters = [
    "All",
    ...Array.from(
      new Set(
        artworksWithCaptions.map(
          (a) => a.series.charAt(0).toUpperCase() + a.series.slice(1)
        )
      )
    ),
  ];

  // ✅ Apply filter logic
  const filteredArtworks =
    filter === "All"
      ? artworksWithCaptions
      : artworksWithCaptions.filter(
          (a) => a.series.toLowerCase() === filter.toLowerCase()
        );

  // 🖼️ Thumbnail click handler
  const handleSelect = (art, index) => {
    const selectedSet =
      filter === "All"
        ? artworksWithCaptions // ✅ FIXED: full gallery for All filter
        : artworksWithCaptions.filter(
            (a) => a.series.toLowerCase() === filter.toLowerCase()
          );

    const realIndex = selectedSet.findIndex((a) => a.image === art.image);
    setCurrentImages(selectedSet);
    setSelectedIndex(realIndex !== -1 ? realIndex : 0);
    setSelected(true);
  };

  return (
    <motion.section
      className="py-16 px-4 max-w-7xl mx-auto text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* 🟣 Filter Buttons */}
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

      {/* 🏷️ Title + Description */}
      <h1 className="text-3xl font-serif text-gray-900 mb-4 underline underline-offset-8">
        {title}
      </h1>
      {shopDescriptions[title.toLowerCase()] && (
        <p className="text-gray-600 text-base mb-10 max-w-3xl mx-auto leading-relaxed">
          {shopDescriptions[title.toLowerCase()]}
        </p>
      )}

      {/* 🎨 Thumbnail Grid */}
  {/* 🎨 Thumbnails — match Gallery layout exactly */}
<div className="flex justify-center flex-wrap gap-8 sm:gap-10 md:gap-12">
  {filteredArtworks.map((art, index, arr) => (
    <div
      key={index}
      className="relative group cursor-pointer"
      onClick={() => handleSelect(art, index, filteredArtworks)}
    >
      <div className="overflow-hidden rounded-lg bg-stone-100 w-72 h-72 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
        <img
          src={art.image}
          alt={art.title}
          className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <p className="mt-3 text-gray-800 font-medium">{art.title}</p>

      {art.caption && (
        <p className="text-gray-600 text-xs mt-1 max-w-xs mx-auto leading-snug">
          {art.caption}
        </p>
      )}

      <p className="text-gray-500 text-xs italic mt-1">
        NZD — coming soon
      </p>
    </div>
  ))}
</div>


      {/* 💡 Shared Lightbox */}
      {selected && (
        <Lightbox
          images={currentImages}
          currentIndex={selectedIndex}
          setCurrentIndex={setSelectedIndex}
          onClose={() => setSelected(false)}
          showCaptions={true}
        />
      )}
    </motion.section>
  );
}
