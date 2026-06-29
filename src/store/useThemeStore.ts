import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggle: () => void;
}

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: systemTheme(),
      toggle: () => set({ theme: get().theme === "light" ? "dark" : "light" }),
    }),
    { name: "wobb-theme" }
  )
);
