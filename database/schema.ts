import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  jsonb,
  doublePrecision,
  pgEnum,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pageTable = pgTable("pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  owner_id: uuid("owner_id").notNull(),
  icon: text("icon"),
  cover_img: text("cover_img"),
  cover_alt: text("cover_alt"),
  is_archived: boolean("is_archived").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  order_index: doublePrecision("order_index").notNull(),
  is_trash: boolean("is_trash").default(false).notNull(),
  is_deleted: boolean("is_deleted").default(false).notNull(),
  deleted_at: timestamp("deleted_at"),
});

export const coverCategoryTable = pgTable("cover_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  display_order: doublePrecision("display_order").notNull(),
});

export const coverTable = pgTable("cover_img", {
  id: uuid("id").primaryKey().defaultRandom(),
  category_id: uuid("category_id")
    .references(() => coverCategoryTable.id, { onDelete: "cascade" })
    .notNull(),
  filename: text("filename").notNull(),
  alt_text: text("alt_text"),
  average_color: text("average_color"),
  display_order: doublePrecision("display_order").default(0).notNull(),
});

export const blockTypeEnum = pgEnum("block_type", [
  "text",
  "heading",
  "image",
  "todo",
  "code",
  "bulleted_list",
]);

export const blockTable = pgTable("blocks", {
  id: uuid("id").primaryKey().defaultRandom(),
  page_id: uuid("page_id")
    .references(() => pageTable.id, { onDelete: "cascade" })
    .notNull(),
  type: blockTypeEnum("type").default("text").notNull(),
  content: jsonb("content")
    .$type<{ text?: string; url?: string; checked?: boolean }>()
    .default({}),
  order_index: doublePrecision("order_index").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type PageType = InferSelectModel<typeof pageTable>;
export type NewPageType = InferInsertModel<typeof pageTable>;

export type CoverCategoryType = InferSelectModel<typeof coverCategoryTable>;
export type CoverType = InferSelectModel<typeof coverTable>;

export type blockType = InferSelectModel<typeof blockTable>;
export type NewBlockType = InferInsertModel<typeof blockTable>;

export interface CategoryWithCovers extends CoverCategoryType {
  covers: CoverType[];
}
