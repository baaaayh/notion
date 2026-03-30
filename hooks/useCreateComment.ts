import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/lib/apiManager";

export const useCreateComment = (pageId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      pageId,
      userName,
      comment,
      parentId,
    }: {
      userId: string | null | undefined;
      pageId: string;
      userName: string | null | undefined;
      comment: string;
      parentId: string | null;
    }) => {
      if (!userId) {
        throw new Error("로그인이 필요합니다.");
      }
      return createComment(userId, pageId, parentId, comment, userName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page", pageId] });
      console.log("댓글이 성공적으로 등록되었습니다.");
    },
    onError: (error) => {
      console.error("댓글 등록 실패:", error.message);
    },
  });
};
