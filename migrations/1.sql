create table item (
  id integer primary key,
  url text not null,
  title text not null,
  insertedAt timestamp CURRENT_TIMESTAMP not null,
  html text not null
);