import { sql } from "kysely";
import { redirect } from "solid-start/server";
import invariant from "tiny-invariant";
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

export async function createItem(form: FormData) {
  const url = form.get("url");
  invariant(typeof url === "string");
  const html = await fetch(url).then((r) => r.text());
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? url;
  const { insertId } = await db
    .insertInto("item")
    .values({
      url,
      html,
      insertedAt: new Date().toString(),
      title,
    })
    .executeTakeFirstOrThrow();
  return redirect(`/item/${insertId}`);
}
