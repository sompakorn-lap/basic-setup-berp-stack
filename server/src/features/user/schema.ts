import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-typebox";

export const users = pgTable("users", {
  userId: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const UserSchema = createSelectSchema(users);
export type UserType = typeof UserSchema.static;