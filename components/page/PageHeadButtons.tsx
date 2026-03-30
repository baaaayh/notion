"use client";
import PageHeadButton from "@/components/page/PageHeadButton";
import EmojiIcon from "@/components/icons/page/EmojiIcon";
import CoverIcon from "@/components/icons/page/CoverIcon";
import CommentIcon from "@/components/icons/page/CommentIcon";

const BUTTONS = [
  {
    id: "emojiIcon",
    icon: <EmojiIcon currentColor="#a19e99" />,
    text: "아이콘 추가",
  },
  {
    id: "coverIcon",
    icon: <CoverIcon currentColor="#a19e99" />,
    text: "커버 추가",
  },
  {
    id: "commentIcon",
    icon: <CommentIcon currentColor="#a19e99" />,
    text: "댓글 추가",
  },
];

interface PageHeadButtonsProps {
  emojiRef?: (node: HTMLElement | null) => void;
  emojiRefProps?: React.HTMLAttributes<HTMLElement>;
  iconData: string | null;
  coverRef?: (node: HTMLElement | null) => void;
  coverRefProps?: React.HTMLAttributes<HTMLElement>;
  coverData: string | null;
  isCommentInputShow: boolean;
  setIsCommentInputShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PageHeadButtons({
  emojiRef,
  emojiRefProps,
  iconData,
  coverRef,
  coverRefProps,
  coverData,
  isCommentInputShow,
  setIsCommentInputShow,
}: PageHeadButtonsProps) {
  return (
    <div className="head-buttons w-full pt-2 group/list">
      <ul className="inline-flex items-center gap-x-2 opacity-0 group-hover/list:opacity-100 transition-opacity">
        {BUTTONS.map((button) => {
          if (button.id === "emojiIcon" && iconData) return null;
          if (button.id === "coverIcon" && coverData) return null;
          if (button.id === "commentIcon" && isCommentInputShow) return null;

          const isEmoji = button.id === "emojiIcon";
          const isCover = button.id === "coverIcon";
          const isComment = button.id === "commentIcon";

          return (
            <li
              key={button.id}
              className="inline-flex justify-center items-center"
            >
              <PageHeadButton
                button={button}
                buttonProps={
                  isEmoji ? emojiRefProps : isCover ? coverRefProps : undefined
                }
                innerRef={isEmoji ? emojiRef : isCover ? coverRef : undefined}
                iconData={iconData}
                coverData={coverData}
                buttonId={button.id}
                onClick={
                  isComment ? () => setIsCommentInputShow(true) : undefined
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
