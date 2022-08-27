import { createResource, For, Show } from "solid-js";
import { RouteDataArgs, useRouteData } from "solid-start";
import server from "solid-start/server";
import Comment from "~/components/Comments/Comment";
import CommentForm from "~/components/Comments/CommentForm";
import LinkItem from "~/components/LinkItem";
import Nav from "~/components/Nav";
import { getItem } from "~/lib/crud/items";
import { getComments } from "../../lib/crud/comments";

export function routeData(args: RouteDataArgs) {
  const [item] = createResource(
    () => args.params.itemId,
    server((itemId) => getItem(itemId))
  );
  const [comments] = createResource(
    () => args.params.itemId,
    server((itemId) => getComments(itemId))
  );
  return { item, comments };
}

export default function Item() {
  const { item, comments } = useRouteData<typeof routeData>();

  return (
    <>
      <div class="flex">
        <main class="w-screen">
          <Nav />

          <hr class="border-t border-neutral-200" />

          <section class="max-w-6xl py-2 w-full mx-auto px-4 py-3">
            <Show when={item()}>
              {/* solidjs rip typescript */}
              <LinkItem item={item()!} />
            </Show>
            <div class="mt-4 ml-9">
              <Show when={item()?.id}>
                {/* solidjs rip typescript */}
                <CommentForm itemId={item()!.id!} parentPath="" />
              </Show>

              <Show when={comments() && item()}>
                <ul class="mt-4 space-y-4">
                  <For each={comments()}>
                    {(comment) => (
                      <li>
                        <Comment comment={comment} />
                      </li>
                    )}
                  </For>
                </ul>
              </Show>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
