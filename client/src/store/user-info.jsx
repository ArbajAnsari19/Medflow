import { create } from "zustand";

export const useUser = create((set) => ({
  user: {},
  setUser: (userData) => set((state) => ({ user: userData })),
}));
