"use client";
import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createSidebarStore, SidebarStore } from "@/store/useSidebarStore";

const SidebarStoreContext = createContext<SidebarStore | null>(null);

export function SidebarStoreProvider({
  children,
  initialWidth,
}: {
  children: React.ReactNode;
  initialWidth: number;
}) {
  const [store] = useState(() => createSidebarStore(initialWidth));

  return (
    <SidebarStoreContext.Provider value={store}>
      {children}
    </SidebarStoreContext.Provider>
  );
}

export function useSidebarStore<T>(
  selector: (state: ReturnType<SidebarStore["getState"]>) => T,
) {
  const store = useContext(SidebarStoreContext);
  if (!store) throw new Error("SidebarStoreProvider가 없습니다");
  return useStore(store, selector);
}
