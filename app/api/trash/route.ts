import { NextResponse } from "next/server";
import { getTrashedPagesData } from "@/services/pageService"; // 위에서 만든 함수

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 400 },
      );
    }

    const trashedPages = await getTrashedPagesData(userId);
    return NextResponse.json(trashedPages);
  } catch (error) {
    console.error("TRASH_GET_ERROR", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
