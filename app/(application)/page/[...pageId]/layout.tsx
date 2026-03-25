import { notFound } from "next/navigation";
import { getPageDetail } from "@/services/contentService";
import PageClientView from "@/components/page/PageClientView";

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
    <PageClientView pageData={pageData} pageId={pageId[0]}>
      {children}
    </PageClientView>
  );
}
