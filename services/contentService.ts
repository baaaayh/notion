import { db } from "@/database/db";
import { eq, asc } from "drizzle-orm";
import { pageTable, blockTable } from "@/database/schema";

export async function getPageDetail(pageId: string) {
  try {
    const [pageInfo, blocks] = await Promise.all([
      db
        .select()
        .from(pageTable)
        .where(eq(pageTable.id, pageId))
        .then((res) => res[0]),

      db
        .select()
        .from(blockTable)
        .where(eq(blockTable.page_id, pageId))
        .orderBy(asc(blockTable.order_index)),
    ]);

    if (!pageInfo) {
      return null;
    }

    return {
      ...pageInfo,
      blocks: blocks || [],
    };
  } catch (error) {
    console.error("데이터 로드 중 오류 발생:", error);
    throw new Error("페이지 내용을 불러오지 못했습니다.");
  }
}
