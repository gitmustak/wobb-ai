import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface ListStore {
  list: UserProfileSummary[];
  add: (profile: UserProfileSummary) => void;
  remove: (userId: string) => void;
  contains: (userId: string) => boolean;
  clear: () => void;
}

export const useListStore = create<ListStore>()(
  persist(
    (set, get) => ({
      list: [],
      add: (profile) => {
        if (!get().contains(profile.user_id)) {
          set((state) => ({ list: [...state.list, profile] }));
        }
      },
      remove: (userId) =>
        set((state) => ({ list: state.list.filter((p) => p.user_id !== userId) })),
      contains: (userId) => get().list.some((p) => p.user_id === userId),
      clear: () => set({ list: [] }),
    }),
    { name: "wobb-influencer-list" }
  )
);
