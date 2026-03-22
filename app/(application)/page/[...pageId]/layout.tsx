import { notFound } from "next/navigation";
import { getPageDetail } from "@/services/contentService";
import Header from "@/components/layout/Header";
import PageHead from "@/components/page/PageHead";
import PageHeadButtons from "@/components/page/PageHeadButtons";
interface PageLayoutProps {
  children: React.ReactNode;
  params: { pageId: string[] };
}

export default async function PageLayout({
  children,
  params,
}: PageLayoutProps) {
  const { pageId } = await params;
  const pageData = await getPageDetail(pageId[0]);

  if (!pageData) notFound();

  return (
    <div className="page-view h-full">
      <Header pageId={pageId[0]} initialTitle={pageData.title} />
      <div className="page-layout pb-[30vh]">
        <div className="page-layout__top col-[content-start/content-end]">
          <PageHeadButtons />
          <PageHead pageId={pageId[0]} title={pageData.title} />
        </div>
        <div className="page-layout__bottom col-[content-start/content-end]">
          {children}
        </div>
      </div>
    </div>
  );
}
