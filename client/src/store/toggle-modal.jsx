import { create } from "zustand";

export const useAddItemModal = create((set) => ({
  isAddItemOpen: false,
  toggleIsAddItemOpen: () =>
    set((state) => ({ isAddItemOpen: !state.isAddItemOpen })),
}));

export const useDeleteAccountModal = create((set) => ({
  isDeleteAccountOpen: false,
  toggleIsDeleteOpen: () =>
    set((state) => ({ isDeleteAccountOpen: !state.isDeleteAccountOpen })),
}));
