import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const booksTable = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  author: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull()
});
