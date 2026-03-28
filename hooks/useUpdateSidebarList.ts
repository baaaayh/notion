import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createNewPage } from "@/services/pageActions";
import { PageType } from "@/database/schema";

export function useUpdateSidebarList() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("로그인이 필요합니다.");
      return await createNewPage(userId);
    },
    onMutate: async () => {
      if (!userId) return;

      await queryClient.cancelQueries({ queryKey: ["pages"] });

      const prevPages = queryClient.getQueryData<PageType[]>(["pages"]);

      const tempId = `temp-${crypto.randomUUID()}`;
      const nextIndex = prevPages ? prevPages.length : 0;

      if (prevPages) {
        queryClient.setQueryData<PageType[]>(
          ["pages"],
          [
            ...prevPages,
            {
              id: tempId,
              title: "제목 없음",
              owner_id: userId,
              cover_img: null,
              cover_alt: null,
              icon: "📄",
              is_archived: false,
              order_index: nextIndex,
              created_at: new Date(),
              updated_at: new Date(),
              is_trash: false,
              is_deleted: false,
              trashed_at: null,
              deleted_at: null,
            },
          ],
        );
      }
      return { prevPages };
    },
    onError: (_err, _newIcon, context) => {
      if (context?.prevPages) {
        queryClient.setQueryData(["pages"], context.prevPages);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}
