"use client";
import { useState } from "react";
import { MenuProps } from "@/types/menu";
import MenuButton from "@/components/sidebar/MenuButton";
import PageButton from "./PageButton";

export default function Menu({ pages, createPageAction }: MenuProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="menu__head">
        <MenuButton
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          text="개인 페이지"
          createPageAction={createPageAction}
        />
      </div>
      <div
        style={{
          height: `${isOpen ? "auto" : 0}`,
          overflow: `${isOpen ? "visible" : "hidden"}`,
        }}
        className="menu__body"
      >
        <ul>
          {pages.map((page) => {
            return (
              <li key={page.id}>
                <PageButton page={page} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
