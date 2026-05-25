import { create } from "zustand";
import toast from "react-hot-toast";

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

const savedTheme = localStorage.getItem("talknest-theme") || "coffee";
applyTheme(savedTheme);

export const useThemeStore = create((set) => ({
  theme: savedTheme,
  setTheme: (theme) => {
    localStorage.setItem("talknest-theme", theme);
    applyTheme(theme);
    toast.success(`Theme set to ${theme.charAt(0).toUpperCase() + theme.slice(1)}`);
    set({ theme });
  },
}));