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
