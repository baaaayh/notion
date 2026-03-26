"use client";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { PageType } from "@/database/schema";

const DEFAULT_ICON = "📄";

export default function Header({
  pageId,
  initialTitle,
  initialIcon,
}: {
  pageId: string;
  initialTitle: string;
  initialIcon?: string | null;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: page } = useQuery<PageType>({
    queryKey: ["page", pageId, userId],
    queryFn: async () => {
      const res = await fetch(`/api/page/${pageId}?userId=${userId}`);
      return res.json();
    },
    enabled: !!userId,
    staleTime: 60 * 1000,
  });

  const icon = page?.icon ?? initialIcon;
  const title = page?.title ?? initialTitle;

  return (
    <header className="header px-3">
      <div className="header__wrapper flex justify-between items-center py-2">
        <div className="header__left inline-flex justify-center items-center">
          <span className="inline-flex justify-center items-center w-6 h-6">
            {icon}
          </span>
          <h2 className="text-sm">{title ?? DEFAULT_ICON}</h2>
        </div>
        <div className="header__right inline-flex items-center"></div>
      </div>
    </header>
  );
}
