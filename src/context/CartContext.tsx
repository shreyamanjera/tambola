"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartProduct = { id: string; name: string; price: number; image: string };
export type CartItem = CartProduct & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: CartProduct) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "tambolahub-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
  } catch { window.localStorage.removeItem(STORAGE_KEY); }
    finally { setHasLoaded(true); }
  }, []);

  useEffect(() => {
    if (hasLoaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hasLoaded, items]);

  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
    addItem: (product: CartProduct) => setItems(current => {
      const existing = current.find(item => item.id === product.id);
      return existing
        ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    }),
    incrementItem: (id: string) => setItems(current => current.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    decrementItem: (id: string) => setItems(current => current.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)),
    removeItem: (id: string) => setItems(current => current.filter(item => item.id !== id)),
    clearCart: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
