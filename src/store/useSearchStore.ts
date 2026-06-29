import { create } from "zustand";
import type { Platform, SortDir, SortKey } from "@/types";

interface SearchStore {
  platform: Platform;
  searchQuery: string;
  sortBy: SortKey;
  sortDir: SortDir;
  setPlatform: (p: Platform) => void;
  setSearchQuery: (q: string) => void;
  setSortBy: (key: SortKey) => void;
  setSortDir: (dir: SortDir) => void;
}

export const useSearchStore = create<SearchStore>()((set) => ({
  platform: "instagram",
  searchQuery: "",
  sortBy: "followers",
  sortDir: "desc",
  setPlatform: (platform) => set({ platform, searchQuery: "" }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortDir: (sortDir) => set({ sortDir }),
}));
