"use client";
import Menu from "@/components/sidebar/Menu";
import { useQuery } from "@tanstack/react-query";
import { useUpdateSidebarList } from "@/hooks/useUpdateSidebarList";
import { PageType } from "@/database/schema";

export default function SidebarList({
  userId,
  initialPages,
}: {
  userId: string;
  initialPages: PageType[];
}) {
  const { data: pages } = useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const res = await fetch(`/api/pages?userId=${userId}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!userId,
    initialData: initialPages,
    staleTime: 0,
  });

  const { mutate: handleCreatePage } = useUpdateSidebarList();

  return <Menu pages={pages || []} createPageAction={handleCreatePage} />;
}
