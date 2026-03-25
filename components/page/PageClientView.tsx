"use client";
import { useState, useEffect } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePage } from "@/lib/apiManager";
import data from "@emoji-mart/data";
import { Emoji, EmojiMartData } from "@/types/emoji";
import Header from "@/components/layout/Header";
import PageHead from "@/components/page/PageHead";
import PageHeadButtons from "@/components/page/PageHeadButtons";
import { PageType } from "@/database/schema";

const EmojiModal = dynamic(() => import("@/components/modal/EmojiModal"), {
  ssr: false,
});

const getInitialRandomEmoji = (emojiData: EmojiMartData) => {
  const allEmojis = Object.values(emojiData.emojis);
  const randomIndex = Math.floor(Math.random() * allEmojis.length);
  console.log(allEmojis[randomIndex]);
  return (allEmojis[randomIndex] as Emoji).skins[0]["native"];
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
  const queryClient = useQueryClient();

  const [iconData, setIconData] = useState<string | null>(pageData.icon);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleEmojiButtonClick = () => {
    if (!iconData) {
      const randomEmoji = getInitialRandomEmoji(
        data as unknown as EmojiMartData,
      );
      setIconData(randomEmoji);
    }
    setIsModalOpen(true);
  };

  const { mutate } = useMutation({
    mutationFn: (icon: string | null) => updatePage(pageId, { icon }),
    onSuccess: (result) => {
      if (result.ok) {
        queryClient.invalidateQueries({ queryKey: ["pages"] });
        queryClient.invalidateQueries({ queryKey: ["page", pageId, userId] });
      }
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      mutate(iconData);
    }, 500);
    return () => clearTimeout(timer);
  }, [mutate, iconData]);

  return (
    <div className="page-view h-full">
      {isModalOpen && (
        <EmojiModal
          modalRef={(node: HTMLElement | null) => refs.setFloating(node)}
          setIconData={setIconData}
          style={floatingStyles}
          {...getFloatingProps()}
        />
      )}
      <Header
        pageId={pageId}
        initialTitle={pageData.title}
        iconData={iconData}
      />
      <div className={`page-layout pb-[30vh]`}>
        <div className="page-layout__top col-[content-start/content-end]">
          <div className="w-full pt-20 pb-2">
            {iconData && (
              <button
                type="button"
                ref={(node) => refs.setReference(node)}
                className="inline-flex justify-center items-center cursor-pointer"
                onClick={() => setIsModalOpen((prev) => !prev)}
              >
                <span className="inline-flex justify-center items-center text-7xl">
                  {iconData}
                </span>
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
              iconData={iconData}
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
