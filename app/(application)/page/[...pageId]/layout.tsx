import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { notFound, redirect } from "next/navigation";
import { getPageData } from "@/services/pageService";
import PageClientView from "@/components/page/PageClientView";

interface PageLayoutProps {
  children: React.ReactNode;
  params: { pageId: string[] };
}

export default async function PageLayout({
  children,
  params,
}: PageLayoutProps) {
  const session = await getServerSession(authOptions);
  const { pageId } = await params;
  const userId = session?.user?.id;
  const userName = session?.user?.name;
  const pageData = await getPageData(userId, pageId[0]);

  if (!userId || !userName) {
    redirect("/login");
  }
  if (!pageData) notFound();

  return (
    <PageClientView
      pageData={pageData}
      pageId={pageId[0]}
      userId={userId}
      userName={userName}
    >
      {children}
    </PageClientView>
  );
}
