"use client";
import { useState } from "react";
import { MenuProps } from "@/types/menu";
import ArrowIcon from "@/components/icons/sidebar/ArrowIcon";
import MoreIcon from "@/components/icons/sidebar/MoreIcon";
import PlusIcon from "@/components/icons/sidebar/PlusIcon";
import IconButton from "@/components/sidebar/IconButton";

export default function MenuButton({
  setIsOpen,
  isOpen,
  text,
  createPageAction,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  text: string;
  createPageAction: MenuProps["createPageAction"];
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      role="button"
      className="block w-full cursor-pointer"
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div
        className={`flex justify-between items-center p-2 rounded-md group/row transition-colors
          ${isPressed ? "bg-[#00000015]" : "hover:bg-[#00000008]"}
        `}
      >
        <span className="inline-flex items-center gap-x-1.5 text-[#91918E] text-xs font-semibold">
          {text}
          <span
            style={{
              transform: ` ${isOpen ? "rotate(0deg)" : "rotate(-90deg)"}`,
            }}
            className={`inline-flex justify-center items-center w-3 h-3 transition-transform duration-100 opacity-0 group-hover/row:opacity-100`}
          >
            <ArrowIcon />
          </span>
        </span>

        <div
          className="inline-flex justify-center items-center gap-x-1.5 opacity-0 group-hover/row:opacity-100"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              createPageAction();
            }}
          >
            <PlusIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
