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
  is_archived: boolean("is_archived").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  order_index: doublePrecision("order_index").notNull(),
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

export type blockType = InferSelectModel<typeof blockTable>;
export type NewBlockType = InferInsertModel<typeof blockTable>;
