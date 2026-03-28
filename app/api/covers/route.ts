import { NextResponse } from "next/server";
import { getCovers } from "@/services/coverService";

export async function GET() {
  try {
    const covers = await getCovers();
    return NextResponse.json(covers);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
