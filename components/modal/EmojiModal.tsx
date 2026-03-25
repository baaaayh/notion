"use client";
import { useRef, useMemo } from "react";
import data from "@emoji-mart/data";
import EmojiButton from "@/components/modal/EmojiButton";
import { Emoji, EmojiMartData } from "@/types/emoji";
import { useVirtualizer } from "@tanstack/react-virtual";

const COL_COUNT = 12;

export default function EmojiModal({
  modalRef,
  style,
  setIconData,
  ...props
}: {
  modalRef: (node: HTMLElement | null) => void;
  setIconData: React.Dispatch<React.SetStateAction<string | null>>;
  style: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const allEmojis = useMemo(() => {
    const typedData = data as unknown as EmojiMartData;
    return Object.values(typedData.emojis) as Emoji[];
  }, []);

  const rows = useMemo(() => {
    const result: Emoji[][] = [];
    for (let i = 0; i < allEmojis.length; i += COL_COUNT) {
      result.push(allEmojis.slice(i, i + COL_COUNT));
    }
    return result;
  }, [allEmojis]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div
      ref={modalRef}
      style={style}
      className="emoji-modal inline-flex flex-col rounded-md border bg-white border-[rgb(44,44,43,0.3)] shadow-[0_4px_12px_0_rgba(25,25,25,0.05)] overflow-hidden"
      {...props}
    >
      <div className="emoji-model__head flex justify-between p-2">
        <div>
          <ul>
            <li>
              <button type="button" className="cursor-pointer">
                이모지
              </button>
            </li>
          </ul>
        </div>
        <div>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setIconData(null)}
          >
            제거
          </button>
        </div>
      </div>
      <div
        ref={parentRef}
        className="emoji-modal__list w-100 h-60 py-3 overflow-auto"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {virtualRows.map((row) => (
            <ul
              key={row.key}
              className={`grid grid-cols-${COL_COUNT} gap-1 px-3 w-full`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: `${row.size}px`,
                transform: `translateY(${row.start}px)`,
              }}
            >
              {rows[row.index].map((emoji) => (
                <li
                  key={emoji.id}
                  className="flex justify-center items-center w-6 h-6"
                >
                  <EmojiButton data={emoji} setIconData={setIconData} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
