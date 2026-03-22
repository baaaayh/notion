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

export default function PageHeadButtons() {
  return (
    <div className="head-buttons w-full pt-20 pb-2 group/list">
      <ul className="inline-flex items-cetner gap-x-2 opacity-0 group-hover/list:opacity-100">
        {BUTTONS.map((button) => (
          <li
            key={button.id}
            className="inline-flex justify-center items-center"
          >
            <PageHeadButton button={button} />
          </li>
        ))}
      </ul>
    </div>
  );
}
