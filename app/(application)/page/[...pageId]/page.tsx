import { notFound } from "next/navigation";
import { getPageDetail } from "@/services/contentService";

export default async function Page({
  params,
}: {
  params: { pageId: string[] };
}) {
  const { pageId } = await params;
  const pageData = await getPageDetail(pageId[0]);

  if (!pageData) notFound();

  console.log("PAGE DATA ::: ", pageData);
  return (
    <>
      <div>page</div>
    </>
  );
}
