// store/useSidebarStore.ts
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface SidebarState {
  width: number;
  setWidth: (width: number) => void;
}

export const createSidebarStore = (initialWidth: number) =>
  createStore<SidebarState>()(
    persist(
      (set) => ({
        width: initialWidth,
        setWidth: (width) => set({ width }),
      }),
      {
        name: "sidebar-storage",
        storage: {
          getItem: (name) => {
            const value = Cookies.get(name);
            return value ? JSON.parse(value) : null;
          },
          setItem: (name, value) => {
            Cookies.set(name, JSON.stringify(value), { expires: 7 });
          },
          removeItem: (name) => Cookies.remove(name),
        },
      },
    ),
  );

export type SidebarStore = ReturnType<typeof createSidebarStore>;
