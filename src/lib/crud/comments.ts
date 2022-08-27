import { db } from "../db";

export async function getComments(itemId: number) {
  return db
    .selectFrom("comment")
    .where("itemId", "=", itemId)
    .selectAll()
    .execute();
}
