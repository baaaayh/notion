"use client";
import { useState, useCallback } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useUpdatePage } from "@/hooks/useUpdatePage";
import ArrowIcon from "@/components/icons/sidebar/ArrowIcon";
import MoreIcon from "@/components/icons/sidebar/MoreIcon";
import PlusIcon from "@/components/icons/sidebar/PlusIcon";
import IconButton from "@/components/sidebar/IconButton";
import { PageType } from "@/database/schema";

const DEFAULT_ICON = "📄";

const ContextMenu = dynamic(() => import("@/components/modal/ContextMenu"), {
  ssr: false,
});

export default function PageButton({ page }: { page: PageType }) {
  const { id: pageId, icon: initialIcon, title: initialTitle } = page;
  const [isPressed, setIsPressed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const icon = initialIcon ?? DEFAULT_ICON;

  const { refs, floatingStyles, context } = useFloating({
    open: isContextMenuOpen,
    onOpenChange: setIsContextMenuOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    middleware: [offset(5), flip(), shift()],
  });

  const setReference = useCallback(
    (node: HTMLElement | null) => {
      refs.setReference(node);
    },
    [refs],
  );

  const setFloating = useCallback(
    (node: HTMLElement | null) => {
      refs.setFloating(node);
    },
    [refs],
  );

  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const handleMoreIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContextMenuOpen(true);
  };

  const { mutate: updatePage } = useUpdatePage(pageId);

  const onRemove = () => {
    updatePage({ is_trash: true });
  };

  const onRename = () => {};

  return (
    <>
      {isContextMenuOpen && (
        <ContextMenu
          pageId={pageId}
          ref={setFloating}
          onRemove={onRemove}
          onRename={onRename}
          onClose={() => setIsContextMenuOpen(false)}
          style={floatingStyles}
          {...getFloatingProps()}
        />
      )}
      <div
        role="button"
        className="block w-full cursor-pointer"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        <Link
          href={`/page/${pageId}`}
          className={`flex justify-between items-center p-2 rounded-md group/row transition-colors
          ${isPressed ? "bg-[#00000015]" : "hover:bg-[#00000008]"}
        `}
        >
          <div className="inline-flex items-center gap-x-2">
            <span className="relative inline-flex justify-center items-center w-6 h-6">
              <span
                className={`inline-flex transition-opacity duration-100 ${isPressed ? "opacity-0" : "group-hover/row:opacity-0"}`}
              >
                {icon}
              </span>
              <span
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen((prev) => !prev);
                }}
                style={{
                  transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                }}
                className="absolute inset-0 flex items-center justify-center transition-all duration-100 opacity-0 group-hover/row:opacity-100"
              >
                <div className="w-3 h-3 flex items-center justify-center">
                  <ArrowIcon />
                </div>
              </span>
            </span>
            <span className="inline-flex items-center gap-x-1.5 text-[#91918E] text-sm font-semibold">
              {initialTitle ?? "제목 없음"}
            </span>
          </div>
          <div
            className="inline-flex justify-center items-center gap-x-1.5 opacity-0 group-hover/row:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              ref={setReference}
              {...getReferenceProps()}
              onClick={handleMoreIconClick}
            >
              <MoreIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("플러스 클릭");
              }}
            >
              <PlusIcon />
            </IconButton>
          </div>
        </Link>
      </div>
    </>
  );
}
