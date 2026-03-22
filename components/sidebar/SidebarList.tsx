"use client";
import Menu from "@/components/sidebar/Menu";
import { useQuery } from "@tanstack/react-query";
import { PageType } from "@/database/schema";
import { CreatePageResponse } from "@/types/menu";

export default function SidebarList({
  userId,
  initialPages,
  createPageAction,
}: {
  userId: string;
  initialPages: PageType[];
  createPageAction: () => Promise<CreatePageResponse>;
}) {
  const { data: pages } = useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const res = await fetch(`/api/pages?userId=${userId}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    initialData: initialPages,
    staleTime: 0,
  });

  return <Menu pages={pages || []} createPageAction={createPageAction} />;
}
