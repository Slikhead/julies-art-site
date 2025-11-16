// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

// 💳 Create the context
const CartContext = createContext();

// 🎁 Context provider wrapper
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 🪝 Nice shortcut hook
export function useCart() {
  return useContext(CartContext);
}
