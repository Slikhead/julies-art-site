// src/components/Gallery.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";
import artworks from "../data/artworks";
import { seriesDescriptions, seriesOrder } from "../data/seriesInfo";

// ✅ Auto-import captions from /src/data/gallery-captions
const captionModules = import.meta.glob("../data/gallery-captions/*.txt", {
  eager: true,
  import: "default",
  query: "?raw",
});

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  // 🎨 Only show paintings
  const paintingArtworks = artworks.filter((a) => a.category === "Paintings");

  // 🧭 Available series (normalised)
  const availableSeries = Array.from(
    new Set(
      paintingArtworks
        .map((a) => a.series?.trim().toLowerCase())
        .filter(Boolean)
    )
  );

  // 🏅 Apply custom order from seriesOrder.txt
  const normalizedSeriesOrder = seriesOrder.map((s) => s.trim().toLowerCase());
  const orderedSeries = [
    ...normalizedSeriesOrder.filter((s) => availableSeries.includes(s)),
    ...availableSeries.filter((s) => !normalizedSeriesOrder.includes(s)),
  ];

  // 🧩 Sort artworks by that order
  const sortedArtworks = [...paintingArtworks].sort((a, b) => {
    const aKey = a.series?.trim().toLowerCase() || "";
    const bKey = b.series?.trim().toLowerCase() || "";
    const aIndex = normalizedSeriesOrder.indexOf(aKey);
    const bIndex = normalizedSeriesOrder.indexOf(bKey);

    if (aIndex === -1 && bIndex === -1) return aKey.localeCompare(bKey);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  // 📝 Attach captions from /src/data/gallery-captions/*.txt (optional per image)
  const artworksWithCaptions = sortedArtworks.map((art) => {
    const fileName = art.image.split("/").pop().replace(/\.[^/.]+$/, "");
    const captionKey = Object.keys(captionModules).find((key) =>
      key.toLowerCase().includes(`${fileName.toLowerCase()}.txt`)
    );
    const caption = captionKey ? captionModules[captionKey] : "";
    return { ...art, caption };
  });

  // 🟣 Filter button labels
  const filters = [
    "All",
    ...orderedSeries.map(
      (s) => s.charAt(0).toUpperCase() + s.slice(1)
    ),
  ];

  // 🔎 Filtered artworks for current view
  const filteredArtworks =
    filter === "All"
      ? artworksWithCaptions
      : artworksWithCaptions.filter(
          (a) => a.series?.trim().toLowerCase() === filter.toLowerCase()
        );

  // 👪 Group artworks by series for display
  const grouped =
    filter === "All"
      ? filteredArtworks.reduce((acc, art) => {
          const seriesKey = art.series?.trim().toLowerCase() || "other";
          if (!acc[seriesKey]) acc[seriesKey] = [];
          acc[seriesKey].push(art);
          return acc;
        }, {})
      : {
          [filter.toLowerCase()]: filteredArtworks,
        };

  // 🖱️ When a thumbnail is clicked
  const handleSelect = (art, index, seriesArtworks) => {
  const selectedSet =
    filter === "All"
      ? filteredArtworks              // show ALL images in Lightbox
      : seriesArtworks || filteredArtworks;

  const realIndex = selectedSet.findIndex((a) => a.image === art.image);

  setCurrentImages(selectedSet);
  setSelectedIndex(realIndex !== -1 ? realIndex : index);
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

      {/* 🎨 Series blocks */}
      {Object.entries(grouped).map(([seriesKey, arts]) => {
        const heading =
          seriesKey.charAt(0).toUpperCase() + seriesKey.slice(1);
        const desc = seriesDescriptions[seriesKey];

        return (
          <div key={seriesKey} className="mb-16">
            {/* 🏷️ Series Heading */}
            <h2 className="text-3xl font-serif text-gray-900 mb-3 underline underline-offset-8">
              {heading}
            </h2>

            {/* subtle divider */}
            <div className="w-24 h-[1px] bg-gray-300 mx-auto mb-4" />

            {/* 📝 Series Description (from /series-descriptions/*.txt) */}
            {desc && (
              <p className="text-gray-600 text-base mb-8 max-w-4xl mx-auto leading-relaxed">
                {desc}
              </p>
            )}

            {/* 🖼️ Thumbnails */}
            <div className="flex justify-center flex-wrap gap-8 sm:gap-10 md:gap-12">
              {arts.map((art, idx) => (
                <div
                  key={`${art.title}-${idx}`}
                  className="relative group cursor-pointer"
                  onClick={() =>
  handleSelect(
    art,
    filter === "All"
      ? artworksWithCaptions.findIndex(a => a.image === art.image)
      : idx,
    filter === "All" ? artworksWithCaptions : arts
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
          </div>
        );
      })}

      {/* 💡 Shared Lightbox with captions (from gallery-captions) */}
      {selected && (
        <Lightbox
  images={currentImages}
  currentIndex={selectedIndex}
  setCurrentIndex={setSelectedIndex}
  onClose={() => setSelected(false)}
  showCaptions={true}
  onAddToCart={null}   // 👈 added for clarity
/>

      )}
    </motion.section>
  );
}
