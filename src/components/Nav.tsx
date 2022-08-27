import { Link } from "@solidjs/router";
import { createServerAction } from "solid-start/server";
import { createItem } from "~/lib/crud/items";

export default function Nav() {
  const createItemAction = createServerAction(createItem);
  return (
    <nav class="max-w-6xl py-2 w-full mx-auto px-4">
      <createItemAction.Form>
        <div class="flex gap-2 items-center">
          <div class="mr-4 pr-4 border-r border-neutral-300">
            <Link href="/">
              <h1 class="font-bold text-sm">liteforum</h1>
            </Link>
          </div>
          <input
            type="url"
            name="url"
            class="border border-neutral-300 text-sm px-2 py-1 min-w-sm"
            placeholder="submit url"
          />
          <button class="block text-sm font-semibold hover:underline border border-neutral-300 px-2 py-1">
            submit
          </button>
        </div>
      </createItemAction.Form>
    </nav>
  );
}
