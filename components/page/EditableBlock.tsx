"use client";
import { useState, useRef, ElementType } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import dynamic from "next/dynamic";

type BlockConfig = {
  tag: ElementType;
  baseClass: string;
};

const BLOCK_TAG_CONFIG: Record<string, BlockConfig> = {
  text: {
    tag: "div",
    baseClass: "text-base py-1 min-h-[1.5rem] leading-relaxed",
  },
  h1: {
    tag: "h1",
    baseClass: "text-3xl font-bold py-4 mt-2 outline-none tracking-tight",
  },
  h2: {
    tag: "h2",
    baseClass: "text-2xl font-bold py-3 mt-1.5 outline-none tracking-tight",
  },
  h3: {
    tag: "h3",
    baseClass: "text-xl font-bold py-2 mt-1 outline-none tracking-tight",
  },
  h4: {
    tag: "h4",
    baseClass: "text-lg font-bold py-1.5 outline-none",
  },
  listBullet: {
    tag: "li",
    baseClass: "list-item list-disc ml-6 py-1 pl-1 marker:text-gray-400",
  },
  listNumber: {
    tag: "li",
    baseClass:
      "list-item list-decimal ml-6 py-1 pl-1 marker:text-gray-400 marker:font-medium",
  },
  checkList: {
    tag: "div",
    baseClass: "flex items-start gap-2 py-1 group/todo",
  },
};

const ElementList = dynamic(() => import("@/components/page/ElementList"), {
  ssr: false,
});

export default function EditableBlock({
  onAddBlock,
}: {
  onAddBlock: (id: string, el: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const [showElLIst, setShowElList] = useState(false);
  const [isElement, setIsElement] =
    useState<keyof typeof BLOCK_TAG_CONFIG>("text");
  const [id] = useState(() => crypto.randomUUID());

  const { refs, floatingStyles, context } = useFloating({
    open: showElLIst,
    onOpenChange: setShowElList,
    whileElementsMounted: autoUpdate,
    placement: "top-start",
    middleware: [offset(10), flip(), shift()],
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const isList = ["listBullet", "listNumber", "checkList"].includes(
        isElement,
      );

      if (isList) {
        e.preventDefault();
        onAddBlock(id, isElement);
      } else {
        e.preventDefault();
        onAddBlock(id, "text");
      }
    }
  };

  const handleSelect = (el: string) => {
    if (el in BLOCK_TAG_CONFIG) {
      setIsElement(el as keyof typeof BLOCK_TAG_CONFIG);
    }
    setShowElList(false);
    setTimeout(() => contentRef.current?.focus(), 0);
  };

  const config = BLOCK_TAG_CONFIG[isElement] || BLOCK_TAG_CONFIG["text"];
  const DynamicTag = config.tag;

  return (
    <div className="relative">
      {showElLIst && (
        <ElementList
          ref={(node: HTMLElement | null) => refs.setFloating(node)}
          style={floatingStyles}
          onSelectElement={(el) => handleSelect(el)}
          {...getFloatingProps()}
        />
      )}
      <div
        className="group relative flex items-center gap-1 w-full min-h-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex items-center gap-0.5 mt-1 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            ref={(node) => refs.setReference(node)}
            {...getReferenceProps({
              onClick: (event) => {
                event.stopPropagation();
              },
            })}
            onClick={() => setShowElList(true)}
            className="p-1 hover:bg-gray-200 rounded text-gray-400 font-bold text-lg leading-none"
          >
            +
          </button>
          <div
            className="p-1 hover:bg-gray-200 rounded cursor-grab active:cursor-grabbing text-gray-400"
            title="드래그하여 이동"
          >
            <svg width="12" height="18" viewBox="0 0 12 18">
              <path
                d="M4 2a2 2 0 11-4 0 2 2 0 014 0zm0 7a2 2 0 11-4 0 2 2 0 014 0zm0 7a2 2 0 11-4 0 2 2 0 014 0zm8-14a2 2 0 11-4 0 2 2 0 014 0zm0 7a2 2 0 11-4 0 2 2 0 014 0zm0 7a2 2 0 11-4 0 2 2 0 014 0z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="group relative flex items-start gap-1 w-full min-h-6">
          <DynamicTag
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            className={`
              flex-1 p-1 outline-none
              ${config.baseClass}
              /* 텍스트가 비었을 때 placeholder를 보여주는 핵심 로직 */
              empty:before:content-[attr(data-placeholder)] 
              empty:before:text-gray-300 
              empty:before:pointer-events-none
              block
            `}
            data-placeholder={
              isElement === "text"
                ? "내용을 입력하세요..."
                : isElement.toUpperCase()
            }
            onKeyDown={onKeyDownHandler}
          ></DynamicTag>
        </div>
      </div>
    </div>
  );
}
