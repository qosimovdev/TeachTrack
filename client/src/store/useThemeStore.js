import { create } from "zustand";

const useThemeStore = create((set) => ({
    theme: localStorage.getItem("theme") || "light",
    toggleTheme: () =>
        set((state) => {
            const nextTheme =
                state.theme === "light" ? "dark" : "light";

            localStorage.setItem("theme", nextTheme);

            document.documentElement.classList.toggle(
                "dark",
                nextTheme === "dark"
            );

            return { theme: nextTheme };
        }),
}));

export default useThemeStore;