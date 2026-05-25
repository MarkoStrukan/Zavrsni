import { create } from "zustand";

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

const savedTheme = localStorage.getItem("streamify-theme") || "coffee";
applyTheme(savedTheme);

export const useThemeStore = create((set) => ({
  theme: savedTheme,
  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme);
    applyTheme(theme);
    set({ theme });
  },
}));