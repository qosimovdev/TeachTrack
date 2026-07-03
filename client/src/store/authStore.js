import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isInitializing: true,

    setInitializing: (value) =>
        set({ isInitializing: value }),

    login: (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.teacher));

        set({
            user: data.teacher,
            token: data.token,
        });
    },

    setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        set({
            user: null,
            token: null,
        });
    },
}));

export default useAuthStore;