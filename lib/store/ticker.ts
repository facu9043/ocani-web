"use client";

import { create } from "zustand";

export type TickerItem = {
  id: string;
  name: string;
  price: number;
};

type TickerState = {
  items: TickerItem[];
  setItems: (items: TickerItem[]) => void;
};

export const useTickerStore = create<TickerState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
