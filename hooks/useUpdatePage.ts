import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { updatePage } from "@/lib/apiManager";
import { PageType } from "@/database/schema";

type UpdatePayload = Partial<
  Pick<PageType, "title" | "icon" | "is_trash" | "cover_img" | "cover_alt">
>;

export function useUpdatePage(pageId: string) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const PAGES_KEY = ["pages"];
  const SINGLE_PAGE_KEY = ["page", pageId, userId];

  return useMutation({
    mutationFn: (payload: UpdatePayload) => updatePage(pageId, payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: PAGES_KEY });
      await queryClient.cancelQueries({ queryKey: SINGLE_PAGE_KEY });

      const prevPages = queryClient.getQueryData<PageType[]>(PAGES_KEY);
      const prevPage = queryClient.getQueryData<PageType>(SINGLE_PAGE_KEY);

      queryClient.setQueryData<PageType[]>(PAGES_KEY, (old) =>
        old?.map((p) => (p.id === pageId ? { ...p, ...payload } : p)),
      );
      queryClient.setQueryData<PageType>(SINGLE_PAGE_KEY, (old) =>
        old ? { ...old, ...payload } : old,
      );

      return { prevPages, prevPage };
    },
    onError: (_err, _variables, context) => {
      if (context?.prevPages)
        queryClient.setQueryData(PAGES_KEY, context.prevPages);
      if (context?.prevPage)
        queryClient.setQueryData(SINGLE_PAGE_KEY, context.prevPage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PAGES_KEY });
      queryClient.invalidateQueries({ queryKey: SINGLE_PAGE_KEY });
    },
  });
}
