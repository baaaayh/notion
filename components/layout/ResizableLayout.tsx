"use client";
import { useSidebarStore } from "@/store/SidebarStoreProvider";
import VerticalLine from "@/components/layout/VerticalLine";

export default function ResizableLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const width = useSidebarStore((state) => state.width);

  return (
    <div className="app-container flex h-full">
      <div className="sidebar-container h-full" style={{ width }}>
        {sidebar}
      </div>
      <VerticalLine />
      <div className="view-container flex-1">{children}</div>
    </div>
  );
}
