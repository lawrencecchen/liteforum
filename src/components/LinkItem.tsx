import { getItem, getItems } from "~/lib/crud/items";
import { getTimeAgo } from "~/lib/getTimeAgo";

type GetItem =
  | Awaited<ReturnType<typeof getItems>>[number]
  | Awaited<ReturnType<typeof getItem>>;

export default function LinkItem(props: { item: GetItem }) {
  const hostname = new URL(props.item.url).hostname;
  return (
    <div class="flex gap-4">
      <form method="post" class="place-self-center col-start-2">
        <button name="upvote" class="text-neutral-500/80 p-1" title="upvote">
          <svg
            viewBox="0 0 14 14"
            width="12"
            height="12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m7 0 7 14H0L7 0Z"></path>
          </svg>
        </button>
      </form>

      <div class="flex flex-col">
        <div class="text-lg font-medium">
          <a href={props.item.url} target="_blank" rel="noopener noreferrer">
            {props.item.title}
          </a>{" "}
          <a
            class="text-xs text-neutral-500 hover:underline"
            href={`/from?site=${hostname}`}
          >
            ({hostname})
          </a>
        </div>
        <div>
          <span class="text-xs text-neutral-500">
            {/* 0 points by{" "}
      <a class="hover:underline" href="/users/lawrence">
        lawrence
      </a>{" "} */}
            {getTimeAgo(new Date(props.item.insertedAt))} |{" "}
            <a class="hover:underline" href={`/item/${props.item.id}`}>
              comments
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
