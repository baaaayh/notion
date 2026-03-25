"use client";
import { useState } from "react";
import Link from "next/link";
import ArrowIcon from "@/components/icons/sidebar/ArrowIcon";
import MoreIcon from "@/components/icons/sidebar/MoreIcon";
import PlusIcon from "@/components/icons/sidebar/PlusIcon";
import IconButton from "@/components/sidebar/IconButton";
import { PageType } from "@/database/schema";

const DEFAULT_ICON = "📄";

export default function PageButton({ page }: { page: PageType }) {
  const { id, icon, title } = page;
  const [isOpen, setIsOpen] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      role="button"
      className="block w-full cursor-pointer"
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <Link
        href={`/page/${id}`}
        className={`flex justify-between items-center p-2 rounded-md group/row transition-colors
            ${isPressed ? "bg-[#00000015]" : "hover:bg-[#00000008]"}
          `}
      >
        <div className="inline-flex items-center gap-x-2">
          <span className="relative inline-flex justify-center items-center w-6 h-6">
            <span
              className={`inline-flex transition-opacity duration-100 ${
                isPressed ? "opacity-0" : "group-hover/row:opacity-0"
              }`}
            >
              {icon ? icon : DEFAULT_ICON}
            </span>
            <span
              role="button"
              onClick={() => setIsOpen((prev) => !prev)}
              style={{
                transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
              }}
              className="absolute inset-0 flex items-center justify-center transition-all duration-100 opacity-0 group-hover/row:opacity-100"
            >
              <div className="w-3 h-3 flex items-center justify-center">
                <ArrowIcon />
              </div>
            </span>
          </span>
          <span className="inline-flex items-center gap-x-1.5 text-[#91918E] text-sm font-semibold">
            {title}
          </span>
        </div>

        <div
          className="inline-flex justify-center items-center gap-x-1.5 opacity-0 group-hover/row:opacity-100"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <MoreIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <PlusIcon />
          </IconButton>
        </div>
      </Link>
    </div>
  );
}
