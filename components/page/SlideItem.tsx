import Image from "next/image";
import Link from "next/link";
import { PageType } from "@/database/schema";

export default function SlideItem({
  userName,
  page,
}: {
  userName: string | null | undefined;
  page: PageType;
}) {
  return (
    <div className="slide-item border border-[#2a1c0012] rounded-xl overflow-hidden shadow-[0_4px_12px_0_rgba(25,25,25,0.05)]">
      <Link href={`/page/${page.id}`} className="slide-item__wrapper">
        <div className="slide-item__cover relative h-11">
          {page.cover_img && (
            <Image
              src={`/assets/images/cover/${page.cover_img}`}
              fill
              sizes="146px"
              className="object-cover max-h-60"
              alt={page.cover_alt ?? "Page cover"}
              loading="eager"
            />
          )}
        </div>
        <div className="slide-item__info p-3">
          <div className="slide-item__top relative -mt-7 z-1">
            <span className="inline-flex justify-center items-center text-2xl">
              {page.icon}
            </span>
          </div>
          <div className="flex flex-col gap-y-6">
            <div className="slide-item__title text-sm">{page.title}</div>
            <div className="slide-item__data flex w-full gap-x-2">
              <span className="inline-flex text-[8px] p-0.5 text-white rounded-md bg-[#689f38] overflow-hidden">
                {userName}
              </span>
              <span className="text-[10px] text-[#a19e99]">
                {new Date(page.updated_at).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
