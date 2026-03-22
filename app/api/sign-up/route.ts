import { db } from "@/database/db";
import { userTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, name, password } = await req.json();
  try {
    const existing = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (existing.length > 0) throw new Error("이미 존재하는 이메일입니다.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(userTable)
      .values({ email, password: hashedPassword, name })
      .returning();
    return Response.json(newUser);
  } catch (error) {
    if (error instanceof Error)
      return Response.json("계정 생성에 실패했습니다.", { status: 400 });
  }
}
