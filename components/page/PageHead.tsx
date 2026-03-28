"use client";
import { useRef, useEffect, memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useUpdatePage } from "@/hooks/useUpdatePage";
import { PageType } from "@/database/schema";

function PageHead({
  pageId,
  title: initialTitle,
}: {
  pageId: string;
  title: string;
}) {
  const { mutate } = useUpdatePage(pageId);
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const isComposing = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headRef.current) headRef.current.textContent = initialTitle;
  }, []); // eslint-disable-line

  const updateCache = (newTitle: string) => {
    queryClient.setQueryData(["pages"], (old: PageType[]) =>
      old?.map((p) => (p.id === pageId ? { ...p, title: newTitle } : p)),
    );
    queryClient.setQueryData(
      ["page", pageId, userId],
      (old: PageType) => old && { ...old, title: newTitle },
    );
  };

  return (
    <div className="page-head w-full">
      <h3
        ref={headRef}
        className="p-1 font-bold text-4xl col-[content-start/content-end] outline-none cursor-text"
        contentEditable
        suppressContentEditableWarning
        onCompositionStart={() => {
          isComposing.current = true;
        }}
        onCompositionEnd={(e) => {
          isComposing.current = false;
          const newTitle = e.currentTarget.textContent || "";
          updateCache(newTitle);
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => mutate({ title: newTitle }), 500);
        }}
        onInput={(e) => {
          console.log(e.currentTarget.textContent);
          const newTitle = e.currentTarget.textContent || "";
          updateCache(newTitle);
          if (isComposing.current) return;
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => mutate({ title: newTitle }), 500);
        }}
        spellCheck={false}
      />
    </div>
  );
}

export default memo(PageHead);
