CREATE TYPE "message_status" AS ENUM('COMPLETE', 'INTERRUPTED');--> statement-breakpoint
CREATE TYPE "mode" AS ENUM('BUILD', 'PLAN');--> statement-breakpoint
CREATE TYPE "role" AS ENUM('USER', 'ASSISTANT', 'ERROR');--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"session_id" uuid NOT NULL,
	"role" "role" NOT NULL,
	"status" "message_status" NOT NULL,
	"model" text NOT NULL,
	"content" text NOT NULL,
	"parts" jsonb,
	"mode" "mode" NOT NULL,
	"duration" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"cwd" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "messages_session_id_idx" ON "messages" ("session_id");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_session_id_sessions_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE CASCADE;