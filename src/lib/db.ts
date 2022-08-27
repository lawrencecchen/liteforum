import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import { env } from "./env";
import { DB } from "kysely-codegen";
// import Database from "tiny-sqlite3";
// import sqlite3 from "sqlite3";

// hack to make better-sqlite3 work
globalThis.__filename = import.meta.url;

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: async () =>
      new Database(env.DATABASE_URL, {
        nativeBinding:
          "./node_modules/better-sqlite3/build/Release/better_sqlite3.node",
      }),
    // database: new Database(env.DATABASE_URL),
  }),
});
