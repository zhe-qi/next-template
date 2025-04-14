ALTER TABLE "user" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isActive" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isAdmin" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "emailVerified";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");