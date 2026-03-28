"use client";
import { CategoryWithCovers } from "@/database/schema";

function CoverModal({
  coverModalRef,
  style,
  onCoverSelect,
  onRemove,
  coverData,
  ...props
}: {
  coverModalRef: (node: HTMLElement | null) => void;
  onCoverSelect: (emoji: string) => void;
  onRemove: () => void;
  coverData: CategoryWithCovers[];
  style: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      ref={coverModalRef}
      style={style}
      className="cover-modal inline-flex flex-col rounded-md border bg-white border-[rgb(44,44,43,0.3)] shadow-[0_4px_12px_0_rgba(25,25,25,0.05)] overflow-hidden"
    >
      <div className="cover-modal__wrapper">
        <div className="cover-model__head flex justify-between p-2">
          <div>
            <ul>
              <li>
                <button type="button" className="cursor-pointer">
                  갤러리
                </button>
              </li>
            </ul>
          </div>
          <div>
            <button type="button" className="cursor-pointer" onClick={onRemove}>
              제거
            </button>
          </div>
        </div>
        <div className="cover-moal__body">
          <ul>
            <li>
              <button type="button"></button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CoverModal;
