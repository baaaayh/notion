import { NextResponse } from "next/server";
import { getPageData } from "@/services/pageService";
import { PgUpdateBuilder } from "drizzle-orm/pg-core";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ pageId: string[] }> },
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const resolvedParams = await params;
  const pageId = Array.isArray(resolvedParams.pageId)
    ? resolvedParams.pageId[0]
    : resolvedParams.pageId;

  if (!userId) return NextResponse.json([], { status: 400 });

  try {
    const page = await getPageData(userId, pageId);
    return NextResponse.json(page);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
