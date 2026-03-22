ALTER TABLE "pages" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "pages" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "owner_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;