"use client";
import { useTrashedPages } from "@/hooks/useTrashedPages";
import RestoreIcon from "@/components/icons/modal/RestoreIcon";
import RemoveIcon from "@/components/icons/modal/RemoveIcon";

function TrashedPageHeader({
  userName,
  pageId,
}: {
  userName?: string | undefined | null;
  pageId: string;
}) {
  const { restorePage, deletePage } = useTrashedPages();

  return (
    <div className="trashed-header bg-[rgb(235,87,87)]">
      <div className="trashed-header__warpper">
        <div className="flex justify-center items-center gap-x-4 py-2">
          <p className="text-sm text-white">
            {userName} 님이 페이지를 휴지통으로 옮겼습니다.
          </p>
          <div onClick={(e) => e.stopPropagation()}>
            <ul className="inline-flex justify-center items-cetner gap-x-2">
              <li>
                <button
                  type="button"
                  className="inline-flex justify-center items-center border border-white rounded-md overflow-hidden cursor-pointer hover:bg-[rgba(0,0,0,0.1)]"
                  onClick={() => restorePage(pageId)}
                >
                  <div className="flex justify-center items-center gap-x-2 px-1.5 py-1">
                    <span className="inline-flex justify-center items-center w-4 h-4">
                      <RestoreIcon color="white" />
                    </span>
                    <span className="text-sm text-white">페이지 복원</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex justify-center items-center border border-white rounded-md overflow-hidden cursor-pointer hover:bg-[rgba(0,0,0,0.1)]"
                  onClick={() => deletePage(pageId)}
                >
                  <div className="flex justify-center items-center gap-x-2 px-1.5 py-1">
                    <span className="inline-flex justify-center items-center w-4 h-4">
                      <RemoveIcon color="white" />
                    </span>
                    <span className="text-sm text-white">휴지통에서 삭제</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrashedPageHeader;
