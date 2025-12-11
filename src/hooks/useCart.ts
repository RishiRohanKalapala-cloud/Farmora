"use client";

import { useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number; // in INR
  unit?: string;
  qty: number;
  img?: string;
  farmer?: string;
};

const CART_KEY = "farmora_cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      let next: CartItem[];
      if (existing) {
        next = prev.map((x) => (x.id === item.id ? { ...x, qty: x.qty + item.qty } : x));
      } else {
        next = [...prev, item];
      }
      writeCart(next);
      return next;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const next = prev.filter((x) => x.id !== id);
      writeCart(next);
      return next;
    });
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) => {
      const next = prev.map((x) => (x.id === id ? { ...x, qty } : x));
      writeCart(next);
      return next;
    });
  };

  const clearCart = () => {
    writeCart([]);
    setItems([]);
  };

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return { items, addItem, removeItem, updateQty, clearCart, count, total };
}