"use client";
import { useMemo, memo } from "react";
import twemoji from "@twemoji/api";
import type { Emoji } from "@/types/emoji";

interface EmojiButtonProps {
  data: Emoji;
  onClick?: (emoji: string) => void;
  setIconData: React.Dispatch<React.SetStateAction<string | null>>;
}

export default memo(function EmojiButton({
  data,
  setIconData,
}: EmojiButtonProps) {
  const nativeEmoji = data.skins[0].native;

  const twemojiHtml = useMemo(
    () =>
      twemoji.parse(nativeEmoji, {
        folder: "svg",
        ext: ".svg",
      }),
    [nativeEmoji],
  );

  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={() => setIconData(nativeEmoji)}
    >
      <span
        className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform"
        dangerouslySetInnerHTML={{ __html: twemojiHtml }}
      ></span>
    </button>
  );
});
