create table comment (
  id integer primary key,
  itemId integer not null,
  parentCommentId integer,
  path text not null,
  insertedAt timestamp CURRENT_TIMESTAMP not null,
  content text not null
);