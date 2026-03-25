"use client";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_ICON = "📄";

export default function Header({
  pageId,
  initialTitle,
  iconData,
}: {
  pageId: string;
  initialTitle: string;
  iconData: string | null;
}) {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const { data: page } = useQuery({
    queryKey: ["page", pageId, userId],
    queryFn: async () => {
      const res = await fetch(`/api/page/${pageId}?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch page");
      return res.json();
    },
    enabled: !!pageId && !!userId,
    staleTime: 0,
  });

  return (
    <header className="header px-3">
      <div className="header__wrapper flex justify-between items-center py-2">
        <div className="header__left inline-flex justify-center items-center">
          <span className="inline-flex justify-center items-center w-6 h-6">
            {iconData ? iconData : DEFAULT_ICON}
          </span>
          <h2 className="text-sm">{page?.title || initialTitle}</h2>
        </div>
        <div className="header__right inline-flex items-center"></div>
      </div>
    </header>
  );
}
