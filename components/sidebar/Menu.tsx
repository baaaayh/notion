"use client";
import { useState, useMemo, useCallback } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { MenuProps } from "@/types/menu";
import MenuButton from "@/components/sidebar/MenuButton";
import PageButton from "@/components/sidebar/PageButton";
import TrashCanIcon from "@/components/icons/sidebar/TrashCanIcon";
import TrashCanModal from "@/components/modal/TrashCanModal";

export default function Menu({ pages, createPageAction }: MenuProps) {
  const [isIdvPageOpen, setIsIdvPageOpen] = useState(true);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);

  const sortedPages = useMemo(() => {
    return [...pages].sort(
      (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0),
    );
  }, [pages]);

  const { refs, floatingStyles, context } = useFloating({
    open: isTrashModalOpen,
    onOpenChange: setIsTrashModalOpen,
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

  return (
    <>
      <div className="menu__head">
        <MenuButton
          setIsOpen={setIsIdvPageOpen}
          isOpen={isIdvPageOpen}
          text="개인 페이지"
          createPageAction={createPageAction}
        />
      </div>
      <div
        style={{
          height: `${isIdvPageOpen ? "" : 0}`,
          overflow: `${isIdvPageOpen ? "visible" : "hidden"}`,
        }}
        className="menu__body"
      >
        <div className="menu__row">
          <ul>
            {sortedPages.map((page) => (
              <li key={page.id}>
                <PageButton page={page} />
              </li>
            ))}
          </ul>
        </div>
        <div className="menu__row">
          <ul>
            <li>
              <button
                ref={setReference}
                {...getReferenceProps()}
                type="button"
                className="block w-full cursor-pointer hover:bg-[#00000008]"
                onClick={() => setIsTrashModalOpen(true)}
              >
                <div className="flex justify-start items-center gap-x-1.5 px-1.5 py-2 rounded-md">
                  <span className="inline-flex justify-center items-center w-5 h-5">
                    <TrashCanIcon />
                  </span>
                  <span className="inline-flex items-center gap-x-1.5 text-[#91918E] text-sm font-semibold">
                    휴지통
                  </span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
      {isTrashModalOpen && (
        <TrashCanModal
          ref={setFloating}
          {...getFloatingProps()}
          style={floatingStyles}
        />
      )}
    </>
  );
}
