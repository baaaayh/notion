import { db } from "@/database/db";
import { eq, and, desc } from "drizzle-orm";
import { pageTable, commentTable, PageType } from "@/database/schema";

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
export async function getPageData(userId: string | undefined, pageId: string) {
  if (!userId) return undefined;

  const page = await db
    .select()
    .from(pageTable)
    .where(
      and(
        eq(pageTable.owner_id, userId),
        eq(pageTable.id, pageId),
        eq(pageTable.is_deleted, false),
      ),
    )
    .limit(1)
    .then((rows) => rows[0]);

  if (!page) return undefined;

  const comments = await db
    .select()
    .from(commentTable)
    .where(eq(commentTable.page_id, pageId))
    .orderBy(desc(commentTable.created_at));

  return { ...page, comments };
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
