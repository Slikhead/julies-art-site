// src/components/CartDrawer.jsx
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart = [], removeFromCart } = useCart(); // ✅ FIXED

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:text-black"
      >
        <X size={20} />
      </button>

      <div className="p-5 overflow-y-auto h-full">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.series}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
