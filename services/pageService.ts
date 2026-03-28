import { db } from "@/database/db";
import { eq, and, desc } from "drizzle-orm";
import { pageTable, PageType } from "@/database/schema";

// 페이지 전체 데이터 조회
export async function getSidebarPages(userId: string): Promise<PageType[]> {
  return await db
    .select()
    .from(pageTable)
    .where(
      and(
        eq(pageTable.owner_id, userId),
        eq(pageTable.is_trash, false),
        eq(pageTable.is_deleted, false),
      ),
    )
    .orderBy(desc(pageTable.order_index));
}

// 단일 페이지 데이터 조회
export async function getPageData(
  userId: string,
  pageId: string,
): Promise<PageType | undefined> {
  const result = await db
    .select()
    .from(pageTable)
    .where(and(eq(pageTable.owner_id, userId), eq(pageTable.id, pageId)))
    .limit(1);

  return result[0];
}

// 휴지통 모달 데이터 조회
export async function getTrashedPagesData(userId: string) {
  return await db
    .select()
    .from(pageTable)
    .where(
      and(
        eq(pageTable.owner_id, userId),
        eq(pageTable.is_trash, true),
        eq(pageTable.is_deleted, false),
      ),
    )
    .orderBy(desc(pageTable.trashed_at));
}
