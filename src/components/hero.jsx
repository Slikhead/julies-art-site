import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero/hero.jpg"; // 🖼️ Import your hero image

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-start pt-24 pb-16 min-h-screen text-center bg-stone-50 px-6">
      {/* 🎨 Hero Image */}
      <motion.img
  src={heroImage}
  alt="Feature artwork by Julie McGowan"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="max-w-[600px] w-[80%] h-auto rounded-lg shadow-lg mb-10 object-contain mx-auto"
/>


      {/* ✍️ Artist Signature */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="font-normal text-gray-900 mb-6 leading-none tracking-tight"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
        }}
      >
        Julie McGowan
      </motion.h1>

      {/* 🖌️ Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-base md:text-lg text-gray-700 mb-10 max-w-xl leading-relaxed"
      >
        Original paintings, quirky earrings, and handmade cards — celebrating
        colour, character, and imagination.
      </motion.p>

      {/* 🎨 Navigation Buttons */}
      

    </section>
  );
}
