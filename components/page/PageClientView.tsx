"use client";
import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import data from "@emoji-mart/data";
import { Emoji, EmojiMartData } from "@/types/emoji";
import { useUpdatePageIcon } from "@/hooks/useUpdatePageIcon";
import Header from "@/components/layout/Header";
import PageHead from "@/components/page/PageHead";
import PageHeadButtons from "@/components/page/PageHeadButtons";
import { PageType } from "@/database/schema";

const EmojiModal = dynamic(() => import("@/components/modal/EmojiModal"), {
  ssr: false,
});

const getRandomEmoji = (emojiData: EmojiMartData) => {
  const allEmojis = Object.values(emojiData.emojis);
  return (allEmojis[Math.floor(Math.random() * allEmojis.length)] as Emoji)
    .skins[0].native;
};

export default function PageClientView({
  pageData,
  pageId,
  children,
}: {
  pageData: PageType;
  pageId: string;
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: page } = useQuery<PageType>({
    queryKey: ["page", pageId, userId],
    queryFn: async () => {
      const res = await fetch(`/api/page/${pageId}?userId=${userId}`);
      return res.json();
    },
    enabled: !!userId,
    initialData: pageData,
    staleTime: 60 * 1000,
  });

  const { refs, floatingStyles, context } = useFloating({
    open: isModalOpen,
    onOpenChange: setIsModalOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    middleware: [offset(8), flip(), shift({ padding: 10 })],
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const { mutate: updateIcon } = useUpdatePageIcon(pageId);

  const handleSelectEmoji = (emoji: string) => {
    updateIcon(emoji);
    setIsModalOpen(false);
  };

  const handleRemoveEmoji = () => {
    updateIcon(null);
    setIsModalOpen(false);
  };

  const handleEmojiButtonClick = () => {
    if (!page?.icon) {
      const randomEmoji = getRandomEmoji(data as unknown as EmojiMartData);
      updateIcon(randomEmoji);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="page-view h-full">
      {isModalOpen && (
        <EmojiModal
          modalRef={(node: HTMLElement | null) => refs.setFloating(node)}
          onEmojiSelect={handleSelectEmoji}
          onRemove={handleRemoveEmoji}
          style={floatingStyles}
          {...getFloatingProps()}
        />
      )}
      <Header pageId={pageId} initialTitle={pageData.title} />
      <div className={`page-layout pb-[30vh]`}>
        <div className="page-layout__top col-[content-start/content-end]">
          <div className="w-full pt-20 pb-2">
            {page?.icon && (
              <button
                type="button"
                ref={(node) => refs.setReference(node)}
                className="inline-flex justify-center items-center cursor-pointer"
                onClick={() => setIsModalOpen((prev) => !prev)}
              >
                <span className="text-7xl">{page.icon}</span>
              </button>
            )}
            <PageHeadButtons
              referenceProps={getReferenceProps({
                onClick: () => {
                  setIsModalOpen((prev) => !prev);
                  handleEmojiButtonClick();
                },
              })}
              isModalOpen={isModalOpen}
              iconData={page?.icon ?? null}
            />
          </div>
          <PageHead pageId={pageId} title={pageData.title} />
        </div>
        <div className="page-layout__bottom col-[content-start/content-end]">
          {children}
        </div>
      </div>
    </div>
  );
}
