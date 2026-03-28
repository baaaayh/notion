ALTER TABLE "pages" ALTER COLUMN "deleted_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "pages" ALTER COLUMN "deleted_at" DROP NOT NULL;