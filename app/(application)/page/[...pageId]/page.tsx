"use client";
import { useState } from "react";
import EditableBlock from "@/components/page/EditableBlock";

export default function Page({ params }: { params: { pageId: string[] } }) {
  const onAddBlock = (id: string, el: string) => {};
  return (
    <div className="max-w-3xl mx-auto py-20 px-10">
      <div className="page-contents flex flex-col gap-2">
        <EditableBlock onAddBlock={onAddBlock} />
      </div>
    </div>
  );
}
