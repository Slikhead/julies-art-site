import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  // ✅ Automatically import all banner images
  const bannerImports = import.meta.glob("/src/assets/banners/*.{jpg,png,jpeg,webp}", {
    eager: true,
  });
  const banners = Object.values(bannerImports).map((mod) => mod.default);

  const collections = [
    { title: "Paintings", link: "/paintings" },
    { title: "Quirky Earrings", link: "/earrings" },
    { title: "Pet Portraits", link: "/pet-portraits" },
    { title: "Quirky Cards", link: "/cards" },
  ];

  return (
    <main className="flex flex-col items-center mt-20 bg-stone-50">
      {/* 🖼️ Fade-in banner image band */}
      {/* 🖼️ Responsive banner grid that adapts to square, portrait, or landscape images */}
<motion.section
  className="dark-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 max-w-7xl"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.0, ease: "easeOut" }}
>
  {banners.map((image, idx) => (
    <div
      key={idx}
      className="relative overflow-hidden rounded-lg cursor-pointer group bg-stone-100 aspect-[4/5] sm:aspect-[3/4] lg:aspect-[1/1]"
      onClick={() => navigate(collections[idx]?.link || "/")}
    >
      <img
        src={image}
        alt={collections[idx]?.title || 'Artwork'}
        className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <span className="text-white text-xl font-semibold">
          {collections[idx]?.title}
        </span>
      </div>
    </div>
  ))}
</motion.section>


      {/* ✍️ Artist Signature */}
      <section className="text-center mt-12 mb-8">
        <h1 className="text-5xl font-light italic text-pink-700 font-handwritten">
          Julie McGowan
        </h1>
      </section>

      {/* 🖋️ About Section */}
<section className="text-center py-10 px-6 bg-stone-50 w-full">
  <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
    Julie’s Art showcases original oil and acrylic paintings, quirky handmade earrings,
    and one-of-a-kind cards — each piece celebrating colour, texture, and playful imagination.
  </p>

  <hr className="border-t border-gray-300 w-3/4 mx-auto my-10 opacity-50" />
</section>

{/* 🔘 Call-to-action Buttons */}
<section className="flex flex-wrap justify-center gap-4 mt-8 mb-0 bg-stone-50 py-10 w-full border-t border-gray-200">
  {collections.map((col) => (
    <button
      key={col.title}
      onClick={() => navigate(col.link)}
      className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
    >
      View {col.title}
    </button>
  ))}
</section>

{/* ⬇️ Light Footer */}
{/* ⬇️ Light Footer */}
<div className="w-full bg-stone-50">
  <footer className="text-gray-700 text-center py-6 border-t border-gray-200">
    <p className="text-sm opacity-70">
      © {new Date().getFullYear()} Julie’s Art. All rights reserved.
    </p>
  </footer>
</div>

    </main>
  );
}
