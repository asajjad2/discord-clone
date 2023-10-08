import { create } from "zustand";

export const useModalStore = create((set) => ({
    type : null,
    isOpen : false, 
    data : {},
    openModal: (type, data={}) => {
        set({ isOpen: true, type, data });
        // console.log(data)
    },
    closeModal: () => set({ isOpen: false, type : null }),
}));