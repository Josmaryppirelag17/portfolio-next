CREATE TABLE "portfolio"."messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(150) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"fax" varchar(50),
	"website" varchar(200),
	"form_timestamp" integer
);
--> statement-breakpoint
CREATE TABLE "portfolio"."rate_limits" (
	"id" serial PRIMARY KEY NOT NULL,
	"ip" varchar(45) NOT NULL,
	"attempted_at" timestamp with time zone DEFAULT now()
);
