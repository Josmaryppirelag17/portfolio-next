import { serial, varchar, text, timestamp, pgSchema, integer } from "drizzle-orm/pg-core";

const portfolio = pgSchema("portfolio");

export const messages = portfolio.table("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  fax: varchar("fax", { length: 50 }),
  website: varchar("website", { length: 200 }),
  formTimestamp: integer("form_timestamp"),
});

export const rateLimits = portfolio.table("rate_limits", {
  id: serial("id").primaryKey(),
  ip: varchar("ip", { length: 45 }).notNull(),
  attemptedAt: timestamp("attempted_at", { withTimezone: true }).defaultNow(),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type RateLimit = typeof rateLimits.$inferSelect;
export type NewRateLimit = typeof rateLimits.$inferInsert;
