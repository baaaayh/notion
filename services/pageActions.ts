"use server";
import { db } from "@/database/db";
import { pageTable } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createNewPage(ownerId: string) {
  try {
    // 1. 현재 사용자의 페이지 중 가장 높은 order_index를 조회합니다.
    const lastPage = await db
      .select({ maxIndex: pageTable.order_index })
      .from(pageTable)
      .where(eq(pageTable.owner_id, ownerId))
      .orderBy(desc(pageTable.order_index))
      .limit(1);

    // 2. 가장 큰 index가 있으면 +1, 없으면(첫 페이지라면) 0을 부여합니다.
    const nextIndex = lastPage.length > 0 ? lastPage[0].maxIndex + 1 : 0;

    // 3. 계산된 index와 함께 페이지를 생성합니다.
    const [newPage] = await db
      .insert(pageTable)
      .values({
        title: "제목 없음",
        owner_id: ownerId,
        icon: "📄",
        is_archived: false,
        order_index: nextIndex,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning();

    revalidatePath("/");
    return { success: true, data: newPage };
  } catch (error) {
    console.error("페이지 생성 실패:", error);
    return {
      success: false,
      error: "서버 오류로 페이지를 생성하지 못했습니다.",
    };
  }
}
