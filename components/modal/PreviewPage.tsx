import Image from "next/image";
import { PageType } from "@/database/schema";

interface PreviewPageProps {
  page: PageType | undefined; // 또는 | null
}

function PreviewPage({ page }: PreviewPageProps) {
  if (!page) return null;
  return (
    <div className="preview-page pt-20 pr-10 pb-0 pl-6">
      <div className="rounded-md shadow-[0px_20px_24px_0px_#1919190d,0px_5px_8px_0px_#19191907,0px_0px_0px_1px_#2a1c0012] overflow-hidden">
        <div className="preview-page__head">
          <div className="preview-page__cover relative h-20">
            <Image
              src={`/assets/images/cover/${page.cover_img}`}
              fill
              sizes={"100vw"}
              className="object-cover max-h-60"
              alt={page.cover_alt ?? "Page cover"}
              loading="eager"
            />
          </div>
          <div className="preview-page__icon px-5">
            <span className="relative flex justify-start items-center text-4xl -mt-6 z-1">
              {page.icon}
            </span>
          </div>
        </div>
        <div className="preview-page__body p-6">
          <div className="preview-page__title text-bold text-lg">
            {page.title}
          </div>
          <div className="preview-page__content h-65 text-xs text-[#a19e99]">
            {}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
