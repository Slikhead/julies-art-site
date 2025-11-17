// src/components/NavBar.jsx
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

// 🔽 Auto-import nav order text file
const navOrderModule = import.meta.glob("../data/navOrder.txt", {
  eager: true,
  import: "default",
  query: "?raw",
});

const navOrder = navOrderModule[
  Object.keys(navOrderModule)[0]
]
  .split("\n")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export default function NavBar({ onCartClick }) {
  const { cart = [] } = useCart();

  // Your menu items (as objects for clarity)
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Gallery", path: "/paintings" },
    { label: "Quirky Earrings", path: "/earrings" },
    { label: "Pet Portraits", path: "/pet-portraits" },
    { label: "Quirky Cards", path: "/cards" },
    { label: "Artworks for Sale", path: "/artworks-for-sale" },
    { label: "Info", path: "/info" },            // ✅ Added new Info section
    { label: "Contact", path: "/contact" },
  ];

  // 🔽 Sort menu items by the text file order
  const sortedMenu = [...menuItems].sort((a, b) => {
    const aIndex = navOrder.indexOf(a.label.toLowerCase());
    const bIndex = navOrder.indexOf(b.label.toLowerCase());

    if (aIndex === -1 && bIndex === -1) return a.label.localeCompare(b.label);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  const linkClasses = ({ isActive }) =>
    `px-2.5 py-1.5 text-sm font-normal tracking-wide transition-colors duration-200
     focus:outline-none focus:text-black active:text-black
     ${
       isActive
         ? "text-black border-b-2 border-black"
         : "text-gray-700 hover:text-black hover:border-b hover:border-gray-400"
     }`;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/70 shadow-sm z-50 border-b border-white/30"
    >
      <div className="max-w-7xl mx-auto flex justify-center items-center h-14 px-4">
        <div className="flex items-center space-x-5 md:space-x-8">
          {sortedMenu.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={linkClasses}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Cart button */}
        <button
          onClick={onCartClick}
          className="ml-auto flex items-center gap-1 text-gray-700 hover:text-black relative"
          aria-label="Open cart"
        >
          <ShoppingBag size={18} />
          {cart.length > 0 && (
            <span className="text-xs bg-black text-white rounded-full px-1.5 py-[1px]">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </motion.nav>
  );
}
