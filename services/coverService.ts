import { db } from "@/database/db";
import { eq, asc } from "drizzle-orm";
import {
  coverCategoryTable,
  coverTable,
  CoverCategoryType,
  CoverType,
} from "@/database/schema";

export interface CategoryWithCovers extends CoverCategoryType {
  covers: CoverType[];
}

export async function getCovers(): Promise<CategoryWithCovers[]> {
  const rows = await db
    .select()
    .from(coverCategoryTable)
    .leftJoin(coverTable, eq(coverCategoryTable.id, coverTable.category_id))
    .orderBy(
      asc(coverCategoryTable.display_order),
      asc(coverTable.display_order),
    );

  const result = rows.reduce<CategoryWithCovers[]>((acc, row) => {
    const category = row.cover_category;
    const cover = row.cover_img;

    let existingCategory = acc.find((c) => c.id === category.id);

    if (!existingCategory) {
      existingCategory = { ...category, covers: [] };
      acc.push(existingCategory);
    }

    if (cover) {
      existingCategory.covers.push(cover);
    }

    return acc;
  }, []);

  return result;
}
