// src/components/Lightbox.jsx
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
  showCaptions = true,
  onAddToCart,
}) {
  if (!images || images.length === 0) return null;

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const current = images[currentIndex] || images[0];

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(20, 20, 20, 0.92)" }}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🖼️ Lightbox Image */}
        <motion.img
          key={currentIndex}
          src={current?.image}
          alt={current?.title}
          className="object-contain rounded-lg shadow-2xl"
          style={{
            maxHeight: "70vh",        // ⬅️ REDUCED from 80vh → 70vh
            maxWidth: "85vw",
            height: "auto",
            width: "auto",
            display: "block",
            margin: "0 auto",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* 📝 Caption */}
        {showCaptions && current?.caption && (
          <motion.p
            className="text-gray-300 text-sm italic mt-4 px-6 max-w-2xl leading-relaxed text-center whitespace-pre-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {current.caption}
          </motion.p>
        )}

        {/* 🛒 Add to Cart (only shown when provided) */}
        {onAddToCart && (
          <motion.button
            className="mt-4 px-5 py-2 rounded-full border border-gray-300 text-sm tracking-wide bg-white/5 text-gray-100 hover:bg-white/10 transition"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(current);
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart
          </motion.button>
        )}
      </motion.div>

      {/* ⬅ Prev */}
      <motion.button
        onClick={prevImage}
        aria-label="Previous image"
        className="absolute left-[6%] top-1/2 -translate-y-1/2"
        style={{
          background: "rgba(255,255,255,0.0)",
          border: "none",
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        whileHover={{ boxShadow: "0 0 16px rgba(200,170,100,0.35)" }}
        whileTap={{ boxShadow: "0 0 20px rgba(200,170,100,0.55)" }}
      >
        <ChevronLeft color="#e6e6e6" strokeWidth={1.5} size={95} />
      </motion.button>

      {/* ➡ Next */}
      <motion.button
        onClick={nextImage}
        aria-label="Next image"
        className="absolute right-[6%] top-1/2 -translate-y-1/2"
        style={{
          background: "rgba(255,255,255,0.0)",
          border: "none",
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        whileHover={{ boxShadow: "0 0 16px rgba(200,170,100,0.35)" }}
        whileTap={{ boxShadow: "0 0 20px rgba(200,170,100,0.55)" }}
      >
        <ChevronRight color="#e6e6e6" strokeWidth={1.5} size={95} />
      </motion.button>

      {/* 🔘 Dots */}
      <div className="absolute bottom-8 flex justify-center gap-3">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-gray-200 scale-125"
                : "bg-gray-500 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
