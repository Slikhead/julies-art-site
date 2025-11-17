// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavBar from "./components/NavBar";
import HeroCarousel from "./components/HeroCarousel";
import Paintings from "./components/Paintings";
import Earrings from "./components/Earrings.jsx";
import PetPortraits from "./components/PetPortraits";
import QuirkyCards from "./components/QuirkyCards";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import PageWrapper from "./components/PageWrapper";
import Footer from "./components/Footer";
import ArtworksForSale from "./components/ArtworksForSale";
import CartDrawer from "./components/CartDrawer";
import { useState } from "react";

export default function App() {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <NavBar onCartClick={() => setIsCartOpen(true)} />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <PageWrapper key={location.pathname}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HeroCarousel />} />
            <Route path="/paintings" element={<Paintings />} />
            <Route path="/earrings" element={<Earrings />} />
            <Route path="/pet-portraits" element={<PetPortraits />} />
            <Route path="/cards" element={<QuirkyCards />} />
            <Route path="/artworks-for-sale" element={<ArtworksForSale />} />
            <Route path="/contact" element={<Contact />} />
            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageWrapper>
      </AnimatePresence>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <Footer />
    </>
  );
}
