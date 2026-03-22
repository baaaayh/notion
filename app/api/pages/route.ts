import { db } from "@/database/db";
import { pageTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getSidebarPages } from "@/services/pageService";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json([], { status: 400 });

  try {
    const pages = await getSidebarPages(userId);
    return NextResponse.json(pages);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, title, icon, cover_img } = body;

    if (!id) {
      return NextResponse.json(
        { message: "페이지 ID가 필요합니다." },
        { status: 400 },
      );
    }

    const updateValues: Partial<typeof pageTable.$inferInsert> = {};

    if (title !== undefined) updateValues.title = title;
    if (icon !== undefined) updateValues.icon = icon;
    if (cover_img !== undefined) updateValues.cover_img = cover_img;

    if (Object.keys(updateValues).length === 0) {
      return NextResponse.json(
        { message: "수정할 데이터가 없습니다." },
        { status: 400 },
      );
    }

    const updatedPage = await db
      .update(pageTable)
      .set(updateValues)
      .where(eq(pageTable.id, id))
      .returning();

    return NextResponse.json({
      ok: true,
      message: "수정 완료",
      data: updatedPage[0],
    });
  } catch (error) {
    console.error("PAGE_UPDATE_ERROR:", error);
    return NextResponse.json(
      { message: "업데이트 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
