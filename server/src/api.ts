import Elysia, { t } from "elysia";
import db from "./libs/drizzle/db";
import { users, UserSchema } from "./features/user/schema";
import { eq } from "drizzle-orm";

const api = new Elysia({ prefix: "/api" })
  .get("/", async () => await db.select().from(users))

  .get("/:userId", async ({ params: { userId } }) => {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.userId, userId))
    ;
    return user[0];
  })

  .post("/", async ({ body }) => {
    const user = await db
      .insert(users)
      .values(body)
      .returning()
    ;
    return user[0].userId;
  }, {
    body: t.Omit(UserSchema, ["userId"])
  })

  .delete("/:userId", async ({ params: { userId } }) => {
    await db
      .delete(users)
      .where(eq(users.userId, userId))
    ;
    return "delete user successfully.";
  })

  .put("/:userId", async ({ body, params: { userId } }) => {
    await db
      .update(users)
      .set(body)
      .where(eq(users.userId, userId))
    ;
    return "update user successfully.";
  }, {
    body: t.Partial(t.Omit(UserSchema, ["userId"]))
  })
;

export default api;