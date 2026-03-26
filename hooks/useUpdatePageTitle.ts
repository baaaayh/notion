import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { updatePage } from "@/lib/apiManager";
import { PageType } from "@/database/schema";

export function useUpdatePageTitle(pageId: string) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: (newTitle: string) => updatePage(pageId, { title: newTitle }),
    onMutate: async (newTitle) => {
      await queryClient.cancelQueries({ queryKey: ["pages"] });
      await queryClient.cancelQueries({ queryKey: ["page", pageId, userId] });

      const prevPages = queryClient.getQueryData(["pages"]);
      const prevPage = queryClient.getQueryData(["page", pageId, userId]);

      queryClient.setQueryData(["pages"], (old: PageType[]) =>
        old?.map((p) => (p.id === pageId ? { ...p, title: newTitle } : p)),
      );
      queryClient.setQueryData(
        ["page", pageId, userId],
        (old: PageType) => old && { ...old, title: newTitle },
      );

      return { prevPages, prevPage };
    },
    onError: (_err, _newTitle, context) => {
      queryClient.setQueryData(["pages"], context?.prevPages);
      queryClient.setQueryData(["page", pageId, userId], context?.prevPage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      queryClient.invalidateQueries({ queryKey: ["page", pageId, userId] });
    },
  });
}
