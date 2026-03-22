"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePage } from "@/lib/apiManager";

export default function PageHead({
  pageId,
  title,
}: {
  pageId: string;
  title: string;
}) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const userId = session?.user?.id;

  const [pageTitle, setPageTitle] = useState(title);
  const prevPageTitleRef = useRef(title);

  const { mutate } = useMutation({
    mutationFn: (newTitle: string) => updatePage(pageId, { title: newTitle }),
    onSuccess: (result) => {
      if (result.ok) {
        queryClient.invalidateQueries({ queryKey: ["pages"] });
        queryClient.invalidateQueries({ queryKey: ["page", pageId, userId] });
        prevPageTitleRef.current = pageTitle;
      }
    },
  });

  useEffect(() => {
    if (pageTitle === prevPageTitleRef.current) return;

    const timer = setTimeout(() => {
      mutate(pageTitle);
    }, 500);

    return () => clearTimeout(timer);
  }, [pageTitle, mutate]);

  return (
    <div className="page-head">
      <h3
        className="p-1 font-bold text-4xl col-[content-start/content-end] outline-none cursor-text"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          setPageTitle(e.currentTarget.textContent || "");
        }}
        spellCheck={false}
      >
        {title}
      </h3>
    </div>
  );
}
