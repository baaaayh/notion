import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { PageType } from "@/database/schema";
import { getTrashedPages, updatePage } from "@/lib/apiManager";

export function useTrashedPages() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: trashedPages, isLoading } = useQuery<PageType[]>({
    queryKey: ["pages", "trash", userId],
    queryFn: () => getTrashedPages(userId),
    enabled: !!userId,
  });

  const restoreMutation = useMutation({
    mutationFn: (pageId: string) => updatePage(pageId, { is_trash: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      queryClient.invalidateQueries({ queryKey: ["pages", "trash", userId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (pageId: string) =>
      updatePage(pageId, { is_deleted: true, deleted_at: new Date() }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      queryClient.invalidateQueries({ queryKey: ["pages", "trash", userId] });
    },
  });

  return {
    trashedPages: trashedPages ?? [],
    isLoading,
    restorePage: restoreMutation.mutate,
    deletePage: deleteMutation.mutate,
    isRestoring: restoreMutation.isPending,
  };
}
