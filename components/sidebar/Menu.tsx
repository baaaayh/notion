"use client";
import { useState, useMemo } from "react";
import { signOut } from "next-auth/react";
import { MenuProps } from "@/types/menu";
import MenuButton from "@/components/sidebar/MenuButton";
import PageButton from "./PageButton";

export default function Menu({ pages, createPageAction }: MenuProps) {
  const [isOpen, setIsOpen] = useState(true);

  const sortedPages = useMemo(() => {
    return [...pages].sort(
      (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0),
    );
  }, [pages]);

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
          {sortedPages.map((page) => (
            <li key={page.id}>
              <PageButton page={page} />
            </li>
          ))}

          <li key="sign-out">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              Log-out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
