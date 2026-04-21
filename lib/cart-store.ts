"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  sizeId: string;
  sizeLabel: string;
  flavor: string;
  unitPrice: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  lastAddedId: string | null;
  addItem: (item: Omit<CartItem, "id" | "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

function buildId(slug: string, sizeId: string, flavor: string) {
  return `${slug}::${sizeId}::${flavor}`;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      lastAddedId: null,
      addItem: (item, quantity = 1) =>
        set((state) => {
          const id = buildId(item.slug, item.sizeId, item.flavor);
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + quantity } : i
              ),
              isOpen: true,
              lastAddedId: id,
            };
          }
          return {
            items: [...state.items, { ...item, id, quantity }],
            isOpen: true,
            lastAddedId: id,
          };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQty: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [], lastAddedId: null }),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "maison-dulce-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export function selectCartCount(state: { items: CartItem[] }) {
  return state.items.reduce((sum, i) => sum + i.quantity, 0);
}

export function selectCartTotal(state: { items: CartItem[] }) {
  return state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
}
