import { create } from "zustand";

export const useModalStore = create((set) => ({
    type : null,
    isOpen : false, 
    openModal: (type) => set({ isOpen: true, type }),
    closeModal: () => set({ isOpen: false, type : null }),
}));