import Elysia from "elysia";
import db from "./libs/drizzle/db";
import { usersTable } from "./features/user/schema";

const api = new Elysia({ prefix: "/api" })
  .get("/", async () => {

    const user: typeof usersTable.$inferInsert = {
      name: "TEST",
      age: 20,
      email: "te@gmail.com"
    };

    await db.insert(usersTable).values(user);

    return "test";
  })
;

export default api;