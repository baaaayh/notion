"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSidebarStore } from "@/store/SidebarStoreProvider";

export default function VerticalLine() {
  const isDragging = useRef(false);
  const latestX = useRef(0);

  const setWidth = useSidebarStore((state) => state.setWidth);

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    isDragging.current = true;
    latestX.current = e.clientX;
  }

  const updateWidth = useCallback(() => {
    if (!isDragging.current) return;
    let newWidth = latestX.current;
    const min = 240;
    const max = 480;

    if (newWidth < min) newWidth = min;
    if (newWidth > max) newWidth = max;

    console.log(newWidth);

    setWidth(newWidth);
  }, [setWidth]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      latestX.current = e.clientX;
      updateWidth();
    };

    const handleMouseUp = () => {
      if (isDragging.current) updateWidth();
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [updateWidth]);

  return (
    <span
      className="vertical w-2 h-full cursor-col-resize"
      onMouseDown={handleMouseDown}
    ></span>
  );
}
