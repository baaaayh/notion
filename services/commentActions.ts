"use server";
import { db } from "@/database/db";
import { commentTable } from "@/database/schema";

export async function createNewComment(
  owner_id: string,
  owner_name: string,
  page_id: string,
  parent_id: string,
  text: string,
) {
  try {
    const [newComments] = await db
      .insert(commentTable)
      .values({
        owner_id,
        owner_name,
        page_id,
        parent_id,
        text,
      })
      .returning();
    return { success: true, data: newComments };
  } catch (error) {
    console.error("댓글 등록 실패:", error);
    return {
      success: false,
      error: "서버 오류로 페이지를 생성하지 못했습니다.",
    };
  }
}
