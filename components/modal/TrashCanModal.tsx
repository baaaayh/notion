"use client";
import { useState, forwardRef } from "react";
import Link from "next/link";
import { useTrashedPages } from "@/hooks/useTrashedPages";
import DocIcon from "@/components/icons/modal/DocIcon";
import RestoreIcon from "@/components/icons/modal/RestoreIcon";
import RemoveIcon from "@/components/icons/modal/RemoveIcon";

interface TrashCanModalProps extends React.HTMLAttributes<HTMLDivElement> {
  style: React.CSSProperties;
}

const TrashCanModal = forwardRef<HTMLDivElement, TrashCanModalProps>(
  ({ style, ...props }, ref) => {
    const [searchValue, setSearchValue] = useState("");

    const { trashedPages, isLoading, restorePage, deletePage } =
      useTrashedPages();

    return (
      <div
        ref={ref}
        style={style}
        {...props}
        className="trash-modal flex w-100 bg-white shadow-[0px_8px_24px_rgba(149,157,165,0.2)] border rounded-lg p-1.5 antialiased border-[rgb(44,44,43,0.3)] overflow-hidden z-1"
      >
        <div className="trash-modal__wrapper w-full p-1.5">
          <div className="trash-modal__search w-full">
            <input
              type="text"
              placeholder="휴지통에서 페이지 검색"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              className="block w-full px-1.5 py-1 rounded-md border border-[#1c13011c] bg-[#42230308] text-sm"
            />
          </div>
          <div className="trash-modal__list py-1">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <ul className="flex flex-col gap-y-1">
                {trashedPages.map((page) => (
                  <li key={page.id}>
                    <Link
                      href={`/page/${page.id}`}
                      role="button"
                      className="flex w-full justify-between items-center px-1 rounded-md hover:bg-[#f0efed] cursor-pointer"
                    >
                      <div className="flex justify-start items-center w-full gap-x-1.5 p-1.5">
                        <span className="inline-flex justify-center items-center w-3.5 h-3.5">
                          <DocIcon />
                        </span>
                        <span className="text-sm text-[#91918e]">
                          {page.title}
                        </span>
                      </div>
                      <div
                        className="inline-flex justify-center items-center gap-x-2"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="inline-flex justify-center items-center w-5.5 h-5.5 p-0.5 rounded-md hover:bg-[#e2e0dc] cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            restorePage(page.id);
                          }}
                        >
                          <RestoreIcon />
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center items-center w-5.5 h-5.5 p-0.5 rounded-md hover:bg-[#e2e0dc] cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePage(page.id);
                          }}
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  },
);

TrashCanModal.displayName = "TrashCanModal";

export default TrashCanModal;
