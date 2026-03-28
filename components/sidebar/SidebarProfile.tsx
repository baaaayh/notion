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
import ProfileModal from "@/components/sidebar/ProfileModal";
import ArrowIcon from "@/components/icons/sidebar/ArrowIcon";

function SidebarProfile({ name }: { name: string | null | undefined }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isModalOpen,
    onOpenChange: setIsModalOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    middleware: [offset(5), flip(), shift()],
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const setFloating = useCallback(
    (node: HTMLElement | null) => {
      refs.setFloating(node);
    },
    [refs],
  );

  const setReference = useCallback(
    (node: HTMLElement | null) => {
      refs.setReference(node);
    },
    [refs],
  );

  return (
    <>
      {isModalOpen && (
        <ProfileModal
          name={name}
          ref={setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        />
      )}
      <button
        type="button"
        className="flex w-full rounded hover:bg-[#f1f0ef] cursor-pointer group/button"
        ref={setReference}
        {...getReferenceProps()}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex justify-start items-center px-2 py-2 text-sm gap-x-2 font-regular">
          <span className="inline-flex rounded-sm p-1 text-xs text-white bg-[#689f38]">
            {name}
          </span>
          {name}의 Notion
          <span className="inline-flex items-center justify-center transition-all duration-100 opacity-0 group-hover/button:opacity-100">
            <div className="w-3 h-3 flex items-center justify-center">
              <ArrowIcon />
            </div>
          </span>
        </div>
      </button>
    </>
  );
}

export default SidebarProfile;
