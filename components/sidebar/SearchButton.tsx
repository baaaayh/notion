"use client";

import { useSearchStore } from "@/store/useSearchStore";
import SearchIcon from "@/components/icons/sidebar/SearchIcon";

export default function SearchButton() {
  const openSearch = useSearchStore((state) => state.openSearch);

  return (
    <div className="menu-item__warpper">
      <button
        type="button"
        onClick={openSearch}
        className="flex w-full gap-x-2 p-2 rounded-md hover:bg-[#00000008] active:bg-[#00000015] cursor-pointer"
      >
        <span className="inline-flex justify-center items-center w-5 h-5">
          <SearchIcon />
        </span>
        <span className="inline-flex items-center text-sm text-[#5f5259]">
          검색
        </span>
      </button>
    </div>
  );
}
