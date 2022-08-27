import { createServerAction, redirect } from "solid-start/server";
import { z } from "zod";
import { db } from "~/lib/db";

const createCommentParser = z.object({
  content: z.string(),
  itemId: z.preprocess(Number, z.number()),
  parentCommentId: z.preprocess(Number, z.number()).nullish(),
  path: z.string(),
});

function getCommentPath(opts: {
  itemId: number;
  parentCommentId?: number;
  parentPath: string;
}) {
  const { itemId, parentCommentId, parentPath } = opts;
  if (parentPath.includes(".")) {
    return `${parentPath}.${parentCommentId}`;
  }
  return String(itemId);
}

export default function CommentForm(props: {
  itemId: number;
  parentPath: string;
  parentCommentId?: number;
}) {
  const createCommentAction = createServerAction(async (form: FormData) => {
    const input = createCommentParser.parse(Object.fromEntries(form));
    const comment = await db
      .insertInto("comment")
      .values({
        insertedAt: new Date().toString(),
        content: input.content,
        itemId: input.itemId,
        parentCommentId: input.parentCommentId,
        path: input.path,
      })
      .executeTakeFirstOrThrow();
    return redirect(`/item/${input.itemId}`);
    // return redirect(`/item/${input.itemId}?comment=${comment.insertId}`);
  });
  const path = getCommentPath({
    itemId: props.itemId,
    parentCommentId: props.parentCommentId,
    parentPath: props.parentPath,
  });
  return (
    <createCommentAction.Form>
      <input type="hidden" name="itemId" value={props.itemId} />
      <input type="hidden" name="parentCommentId" value="" />
      <input type="hidden" name="path" value={path} />
      <textarea
        class="block border border-neutral-300 px-2 py-1 w-full max-w-3xl text-sm"
        name="content"
        value=""
        aria-label="Comment"
        rows="5"
      ></textarea>
      <div class="mt-2">
        <button
          type="submit"
          class="font-bold border border-neutral-300 rounded-sm text-sm px-2 py-1 hover:underline"
        >
          comment
        </button>
      </div>
    </createCommentAction.Form>
  );
}
