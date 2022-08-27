import { sql } from "kysely";
import { db } from "../db";

export async function getItems() {
  return db
    .selectFrom("item")
    .orderBy("insertedAt", "desc")
    .select([sql<string>`max(id)`.as("id"), "title", "url", "insertedAt"])
    .groupBy("url")
    .execute();
}

export async function getItem(itemId: number) {
  return db
    .selectFrom("item")
    .where("id", "=", itemId)
    .selectAll()
    .executeTakeFirstOrThrow();
}

// export async function
