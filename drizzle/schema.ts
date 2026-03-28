import { pgTable, unique, uuid, text, timestamp, jsonb, doublePrecision, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const blockType = pgEnum("block_type", ['text', 'heading', 'image', 'todo', 'code', 'bulleted_list'])


export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: text().notNull(),
	name: text().notNull(),
	password: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const blocks = pgTable("blocks", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	pageId: uuid("page_id").notNull(),
	type: blockType().default('text').notNull(),
	content: jsonb().default({}),
	orderIndex: doublePrecision("order_index").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	ownerId: text("owner_id"),
});

export const pages = pgTable("pages", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	icon: text(),
	coverImg: text("cover_img"),
	isArchived: boolean("is_archived").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	orderIndex: doublePrecision("order_index").notNull(),
	ownerId: text("owner_id"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
});

export const coverImg = pgTable("cover_img", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	categoryId: uuid("category_id").notNull(),
	filename: text().notNull(),
	altText: text("alt_text"),
	averageColor: text("average_color"),
});

export const coverCategory = pgTable("cover_category", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	displayOrder: doublePrecision("display_order").notNull(),
});
