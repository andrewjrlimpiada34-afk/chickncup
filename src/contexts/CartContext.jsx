import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage("chickncup_cart", []);
  const { addToast } = useToast();

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      subtotal,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      addToCart: (item) => {
        setItems((current) => {
          const existingItem = current.find((cartItem) => cartItem.id === item.id);
          if (existingItem) {
            return current.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          }

          return [...current, { ...item, quantity: 1 }];
        });
        addToast(`${item.name} added to cart.`, "success");
      },
      updateQuantity: (itemId, direction) => {
        setItems((current) =>
          current
            .map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    quantity:
                      direction === "increase"
                        ? item.quantity + 1
                        : Math.max(0, item.quantity - 1),
                  }
                : item
            )
            .filter((item) => item.quantity > 0)
        );
      },
      removeFromCart: (itemId) => {
        setItems((current) => current.filter((item) => item.id !== itemId));
        addToast("Item removed from cart.", "info");
      },
      clearCart: () => {
        setItems([]);
      },
    }),
    [addToast, items, setItems, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }

  return context;
}
