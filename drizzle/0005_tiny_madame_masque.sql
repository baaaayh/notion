ALTER TABLE "pages" ADD COLUMN "is_trash" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "is_deleted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "deleted_at" timestamp DEFAULT now() NOT NULL;