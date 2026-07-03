import { create } from "zustand";

const useModalStore = create((set) => ({
    isOpen: false,
    modalType: null,
    modalData: null,

    openModal: (type, data = null) =>
        set({
            isOpen: true,
            modalType: type,
            modalData: data,
        }),

    closeModal: () =>
        set({
            isOpen: false,
            modalType: null,
            modalData: null,
        }),
}));

export default useModalStore;