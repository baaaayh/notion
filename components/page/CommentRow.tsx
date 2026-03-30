import { CommentType } from "@/database/schema";

interface CommentRowProps {
  comment: CommentType;
}

function CommentRow({ comment }: CommentRowProps) {
  return (
    <div className="comment-row">
      <div className="flex justify-start items-center gap-x-1">
        <span className="inline-flex justify-center items-center p-0.5 rounded-md bg-[#689f38] text-xs text-white">
          {comment.owner_name}
        </span>
        <p className="flex justify-start items-center p-1.5 text-sm font-semibold">
          {comment.owner_name}
        </p>
        <span className="text-xs text-[#91918e]">
          {new Date(comment.created_at).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="pl-12 text-sm">{comment.text}</div>
    </div>
  );
}

export default CommentRow;
