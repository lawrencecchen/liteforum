import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import { env } from "./env";
import { DB } from "kysely-codegen";

// hack to make better-sqlite3 work
globalThis.__filename = import.meta.url;

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database(env.DATABASE_URL),
  }),
});
