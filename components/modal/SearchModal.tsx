"use client";
import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { useSearchStore } from "@/store/useSearchStore";
import { useSyncExternalStore } from "react";
import PageButton from "@/components/sidebar/PageButton";
import SearchIcon from "@/components/icons/sidebar/SearchIcon";
import PreviewPage from "@/components/modal/PreviewPage";
import { PageType } from "@/database/schema";
import { groupPagesByDate } from "@/utils/groupPagesByDate";

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function SearchModal() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [activePageId, setActivePageId] = useState<string | null>(null);

  const { isOpen, closeSearch } = useSearchStore();

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const { data: pages } = useQuery<PageType[]>({
    queryKey: ["pages"],
    queryFn: async () => {
      const res = await fetch(`/api/pages?userId=${userId}`);
      if (!res.ok) throw new Error("fetch failed");
      return res.json();
    },
    enabled: !!userId,
  });

  const { data: activePageData } = useQuery<PageType>({
    queryKey: ["page", activePageId, userId],
    queryFn: async () => {
      const res = await fetch(`/api/page/${activePageId}?userId=${userId}`);
      if (!res.ok) throw new Error("fetch failed");
      return res.json();
    },
    enabled: !!activePageId && !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const groupedPages = useMemo(() => {
    if (!pages) return null;
    return groupPagesByDate(pages);
  }, [pages]);

  const renderGroup = (title: string, items: PageType[]) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-4">
        <h3 className="px-2 mb-1 text-xs font-semibold text-gray-500">
          {title}
        </h3>
        <ul>
          {items.map((page) => (
            <li
              key={page.id}
              onClick={closeSearch}
              onMouseEnter={() => setActivePageId(page.id)}
            >
              <PageButton page={page} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-1 shadow-[0px_24px_48px_0px_#1919193d,0px_4px_12px_0px_#19191924,0px_0px_0px_1px_#2a1c0012]"
      onClick={closeSearch}
    >
      <div
        className="search-modal inline-flex w-max bg-white rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-modal__wrapper flex flex-col">
          <div className="search-modal__head flex jusityf-start items-center h-12 p-4 gap-x-1.5">
            <span className="inline-flex justify-center items-center w-6 h-6">
              <SearchIcon />
            </span>
            <div className="inline-flex flex-1 justify-start items-center">
              <input
                type="text"
                placeholder={`${""}님의 Notion에서 검색 또는 질문`}
                className="w-full"
              />
            </div>
          </div>
          <div className="search-modal__body flex flex-1">
            <div className="search-modal__menu w-150 px-2 max-h-150 overflow-auto">
              {groupedPages && (
                <>
                  {renderGroup("오늘", groupedPages.today)}
                  {renderGroup("어제", groupedPages.yesterday)}
                  {renderGroup("지난 30일", groupedPages.last30Days)}
                  {renderGroup("이전", groupedPages.older)}
                </>
              )}
            </div>
            <div className="search-modal__view w-100">
              <PreviewPage page={activePageData} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default SearchModal;
