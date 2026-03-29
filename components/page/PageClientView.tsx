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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import data from "@emoji-mart/data";
import { Emoji, EmojiMartData } from "@/types/emoji";
import { useCovers } from "@/hooks/useCovers";
import { useUpdatePage } from "@/hooks/useUpdatePage";
import TrashedPageHeader from "@/components/page/TrashedPageHeader";
import Header from "@/components/layout/Header";
import PageHead from "@/components/page/PageHead";
import PageHeadButtons from "@/components/page/PageHeadButtons";
import { PageType, CategoryWithCovers } from "@/database/schema";

const CoverModal = dynamic(() => import("@/components/modal/CoverModal"), {
  ssr: false,
});

const EmojiModal = dynamic(() => import("@/components/modal/EmojiModal"), {
  ssr: false,
});

const getRandomEmoji = (emojiData: EmojiMartData) => {
  const allEmojis = Object.values(emojiData.emojis);
  return (allEmojis[Math.floor(Math.random() * allEmojis.length)] as Emoji)
    .skins[0].native;
};

const getRandomCover = (categories: CategoryWithCovers[]) => {
  if (!categories || categories.length === 0) return null;

  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  if (!randomCategory.covers || randomCategory.covers.length === 0) return null;
  const randomImage =
    randomCategory.covers[
      Math.floor(Math.random() * randomCategory.covers.length)
    ];

  return {
    cover_img: randomImage.filename,
    cover_alt: randomImage.alt_text,
  };
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
  const router = useRouter();
  const { data: coversData } = useCovers();
  const { mutate: updatePage } = useUpdatePage(pageId);

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const userName = session?.user?.name;
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  const {
    refs: coverRefs,
    floatingStyles: coverStyles,
    context: coverContext,
  } = useFloating({
    open: isCoverModalOpen,
    onOpenChange: setIsCoverModalOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom-end",
    middleware: [offset(10), flip(), shift()],
  });

  const {
    refs: emojiRefs,
    floatingStyles: emojiStyles,
    context: emojiContext,
  } = useFloating({
    open: isEmojiModalOpen,
    onOpenChange: setIsEmojiModalOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    middleware: [offset(8), flip(), shift({ padding: 10 })],
  });

  const coverDismiss = useDismiss(coverContext, {
    outsidePress: true,
    escapeKey: true,
  });
  const emojiDismiss = useDismiss(emojiContext, {
    outsidePress: true,
    escapeKey: true,
  });
  const {
    getReferenceProps: getCoverRefProps,
    getFloatingProps: getCoverFloatProps,
  } = useInteractions([coverDismiss]);
  const {
    getReferenceProps: getEmojiRefProps,
    getFloatingProps: getEmojiFloatProps,
  } = useInteractions([emojiDismiss]);

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

  const { data: pages } = useQuery<PageType[]>({
    queryKey: ["pages"],
    queryFn: async () => {
      const res = await fetch(`/api/pages?userId=${userId}`);
      if (!res.ok) throw new Error("fetch failed");
      return res.json();
    },
    enabled: !!userId,
  });

  const firstPage = pages
    ?.filter((p) => !p.is_trash && !p.is_deleted)
    .sort((a, b) => a.order_index - b.order_index)[0];

  useEffect(() => {
    if (page?.is_deleted && firstPage?.id) {
      router.push(`/page/${firstPage.id}`);
    } else if (page?.is_deleted && !firstPage) {
      router.push("/");
    }
  }, [page?.is_deleted, firstPage, router]);

  if (page?.is_deleted) {
    return null;
  }

  const handleSelectCover = (cover: string) => {
    setIsCoverModalOpen(false);
  };

  const handleSelectEmoji = (emoji: string) => {
    updatePage({ icon: emoji });
    setIsEmojiModalOpen(false);
  };

  const handleRemoveCover = () => {};

  const handleRemoveEmoji = () => {
    updatePage({ icon: null });
    setIsEmojiModalOpen(false);
  };

  const handleCoverButtonClick = () => {
    if (!page?.cover_img && coversData) {
      const randomCover = getRandomCover(coversData as CategoryWithCovers[]);
      if (randomCover) {
        updatePage({ ...randomCover });
      }
    }
    setIsCoverModalOpen(true);
  };

  const handleEmojiButtonClick = () => {
    if (!page?.icon) {
      const randomEmoji = getRandomEmoji(data as unknown as EmojiMartData);
      updatePage({ icon: randomEmoji });
    }
    setIsEmojiModalOpen(true);
  };

  return (
    <div className="page-view h-full">
      {isCoverModalOpen && (
        <CoverModal
          coverModalRef={(node: HTMLElement | null) =>
            coverRefs.setFloating(node)
          }
          onCoverSelect={handleSelectCover}
          onRemove={handleRemoveCover}
          style={coverStyles}
          coverData={coversData || []}
          {...getCoverFloatProps()}
        />
      )}
      {isEmojiModalOpen && (
        <EmojiModal
          emojiModalRef={(node: HTMLElement | null) =>
            emojiRefs.setFloating(node)
          }
          onEmojiSelect={handleSelectEmoji}
          onRemove={handleRemoveEmoji}
          style={emojiStyles}
          {...getEmojiFloatProps()}
        />
      )}
      <Header pageId={pageId} initialTitle={pageData.title} />
      {page.is_trash && !page.is_deleted && (
        <TrashedPageHeader userName={userName} pageId={pageId} />
      )}
      <div className={`relative page-layout pb-[30vh]`}>
        <div className="col-[full-start/full-end] w-full">
          {typeof page?.cover_img === "string" && page.cover_img ? (
            <div className="page-layout__cover h-60 relative">
              <Image
                src={`/assets/images/cover/${page.cover_img}`}
                fill
                className="object-cover max-h-60"
                alt={page.cover_alt ?? "Page cover"}
                loading="eager"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className={`page-layout__top relative col-[content-start/content-end] ${!!page?.cover_img ? "-mt-10" : ""}`}
        >
          <div className={`w-full ${!!page?.cover_img ? "" : "pt-20"} pb-2`}>
            {page?.icon && (
              <button
                type="button"
                ref={(node) => emojiRefs.setReference(node)}
                className="inline-flex justify-center items-center cursor-pointer"
                onClick={() => setIsEmojiModalOpen((prev) => !prev)}
              >
                <span className="text-7xl">{page.icon}</span>
              </button>
            )}
            <PageHeadButtons
              emojiRef={emojiRefs.setReference}
              emojiRefProps={getEmojiRefProps({
                onClick: () => {
                  setIsEmojiModalOpen((prev) => !prev);
                  handleEmojiButtonClick();
                },
              })}
              iconData={page?.icon ?? null}
              coverRef={coverRefs.setReference}
              coverRefProps={getCoverRefProps({
                onClick: () => {
                  setIsCoverModalOpen((prev) => !prev);
                  handleCoverButtonClick();
                },
              })}
              coverData={page?.cover_img ?? null}
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
