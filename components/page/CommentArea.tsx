"use client";
import { useState } from "react";
import { CommentType } from "@/database/schema";
import { useCreateComment } from "@/hooks/useCreateComment";
import CommentRow from "@/components/page/CommentRow";
import SubmitIcon from "@/components/icons/page/SubmitIcon";

interface CommentAreaProps {
  userId: string | undefined;
  pageId: string;
  comments: CommentType[];
  isCommentInputShow: boolean;
  userName: string | null | undefined;
}

function CommentArea({
  userId,
  pageId,
  comments,
  isCommentInputShow,
  userName,
}: CommentAreaProps) {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { mutate: addComment } = useCreateComment(pageId);

  const handleSubmit = () => {
    addComment(
      { userId, pageId, comment: inputValue, parentId: null, userName },
      {
        onSuccess: () => {
          setInputValue("");
        },
      },
    );
  };

  const hasComments = comments && comments.length > 0;
  const shouldShowArea = hasComments || isCommentInputShow;

  return (
    <div className="comment-area w-full py-2 mb-4">
      {hasComments && (
        <div className="comment-area__list">
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <CommentRow comment={comment} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {shouldShowArea && (
        <div className="comment-area__input mt-5">
          <div className=" border-b border-[#37352f17]">
            <div className="flex w-full justify-between items-center pt-1 pb-2 gap-x-2">
              <div className="inline-flex flex-1 items-center gap-x-2">
                <span className="inline-flex justify-center items-center text-xs p-0.5 rounded-md bg-[#689f38] text-white whitespace-nowrap">
                  {userName}
                </span>
                <input
                  type="text"
                  placeholder="댓글 추가"
                  className="flex w-full text-[#2c2c2b] text-sm"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setIsButtonVisible(true)}
                />
              </div>
              {isButtonVisible && (
                <div className="inline-flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex justify-center items-center cursor-pointer"
                  >
                    <span className="inline-flex justify-center items-center w-7 h-7">
                      <SubmitIcon color={inputValue ? "#2783de" : ""} />
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentArea;
