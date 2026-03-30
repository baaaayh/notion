"use client";
import Image from "next/image";
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
      className="cover-modal inline-flex w-130 flex-col rounded-md border bg-white border-[rgb(44,44,43,0.3)] shadow-[0_4px_12px_0_rgba(25,25,25,0.05)] overflow-hidden z-1"
      {...props}
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
        <div className="cover-moal__body py-2 max-h-110 overflow-auto">
          <ul>
            {coverData.map((category) => {
              return (
                <div key={category.id} className="px-1">
                  <div className="py-2 text-sm">{category.name}</div>
                  <div className="px-3">
                    <ul className="grid grid-cols-4 gap-x-1">
                      {category.covers.map((cover) => {
                        return (
                          <li key={cover.id}>
                            <button
                              type="button"
                              className="relative flex justify-center items-center w-full h-16 rounded-md overflow-hidden cursor-pointer"
                              onClick={() => onCoverSelect(cover.filename)}
                            >
                              <Image
                                src={`/assets/images/cover/${cover.filename}`}
                                fill
                                sizes={"115px"}
                                className="object-cover max-h-60"
                                alt={cover.alt_text ?? "Page cover"}
                                loading="eager"
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CoverModal;
