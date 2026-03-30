import { NextResponse } from "next/server";
import { createNewComment } from "@/services/commentActions";

export async function POST(req: Request) {
  const { owner_id, owner_name, page_id, parent_id, text } = await req.json();
  try {
    const comments = await createNewComment(
      owner_id,
      owner_name,
      page_id,
      parent_id,
      text,
    );
    return NextResponse.json(comments);
  } catch (error) {
    if (error instanceof Error)
      return Response.json("댓글 등록에 실패했습니다.", { status: 400 });
  }
}
