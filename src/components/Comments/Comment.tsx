import { getComments } from "~/lib/crud/comments";

type IComment = Awaited<ReturnType<typeof getComments>>[number];

export default function Comment(props: { comment: IComment }) {
  return (
    <div class="flex flex-col">
      <div>
        <span class="text-xs text-neutral-500">
          {/* <a class="hover:underline" href="/users/lawrence">
            lawrence
          </a>{" "} */}
          23 hours ago |{" "}
          <a
            class="hover:underline"
            href={`/item/${props.comment.itemId}?comment=${props.comment.id}`}
          >
            link
          </a>
        </span>
      </div>
      <div class="" aria-hidden="false">
        <div class="text-neutral-700 my-1">{props.comment.content}</div>
        {/* <a
          class="text-xs text-neutral-600 underline"
          href="/item/199/reply?to=199.200"
        >
          reply
        </a> */}
      </div>
    </div>
  );
}
