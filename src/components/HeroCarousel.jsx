import { useState } from "react";
import useNavbarHeight from "../hooks/useNavbarHeight";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Auto-import all images from /src/assets/hero
const heroImports = import.meta.glob("/src/assets/hero/*.{jpg,jpeg,png,webp}", {
  eager: true,
});
const heroImages = Object.values(heroImports).map((mod) => mod.default);

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const navbarHeight = useNavbarHeight();

  const nextSlide = () =>
    setCurrent((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));

  return (
    <section
      style={{ marginTop: navbarHeight + 30 }}
      className="relative flex flex-col items-center justify-center bg-stone-100 w-full"
    >
      {/* ✅ Hero image container with fixed height */}
      <div className="relative flex items-center justify-center w-full overflow-hidden h-[75vh]">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Hero ${index + 1}`}
            className={`absolute object-contain transition-all duration-1000 ease-in-out rounded-lg ${
              index === current ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{
              height: "100%",
              width: "auto",
              maxWidth: "80vw",
              zIndex: index === current ? 2 : 1,
            }}
          />
        ))}

              {/* ⬅ Navigation arrows ➡ */}
    
{/* ⬅ Previous Button */}
<button
  onClick={prevSlide}
  aria-label="Previous image"
  style={{
    position: "absolute",
    left: "20%",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255, 255, 255, 0.0)",
    border: "none",
    borderRadius: "10px",
    width: "70px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
    e.currentTarget.style.boxShadow = "0 0 14px rgba(200,170,100,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(-50%) scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
  onMouseDown={(e) => {
    e.currentTarget.style.boxShadow = "0 0 22px rgba(200,170,100,0.7)";
  }}
  onMouseUp={(e) => {
    e.currentTarget.style.boxShadow = "0 0 14px rgba(200,170,100,0.4)";
  }}
>
  <ChevronLeft color="#444" strokeWidth={1.8} size={38} />
</button>

{/* ➡ Next Button */}
<button
  onClick={nextSlide}
  aria-label="Next image"
  style={{
    position: "absolute",
    right: "20%",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255, 255, 255, 0.0)",
    border: "none",
    borderRadius: "10px",
    width: "70px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
    e.currentTarget.style.boxShadow = "0 0 14px rgba(200,170,100,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(-50%) scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
  onMouseDown={(e) => {
    e.currentTarget.style.boxShadow = "0 0 22px rgba(200,170,100,0.7)";
  }}
  onMouseUp={(e) => {
    e.currentTarget.style.boxShadow = "0 0 14px rgba(200,170,100,0.4)";
  }}
>
  <ChevronRight color="#444" strokeWidth={1.8} size={38} />
</button>

    </div> {/* ✅ closes image container div */}

 {/* ⚫ Dot indicators — round and evenly spaced */}
<div className="flex justify-center items-center mt-8 gap-5">
  {heroImages.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrent(index)}
      className={`transition-all duration-300 ${
        index === current
          ? "bg-black scale-125 shadow-md"
          : "bg-gray-400 hover:bg-gray-500"
      }`}
      style={{
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        border: "none",
        appearance: "none",
        padding: 0,
        margin: 0,
        display: "inline-block",
      }}
    />
  ))}
</div>

    {/* ✍ Signature */}
    <div className="mt-8 text-center">
      <h2
        className="text-4xl md:text-6xl text-black"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        Julie McGowan
      </h2>
    {/*<p className="italic text-gray-700 text-md mt-2 tracking-wide">
        Celebrating colour, character, and imagination with 
         <br />
   <span className="italic text-gray-600">
    Original Paintings • Pet Portraits • Quirky Creations • Handmade Cards.
  </span>
          </p> */}
    </div>
  </section> 
);
}
