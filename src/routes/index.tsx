import { createResource, For } from "solid-js";
import { Title, useRouteData } from "solid-start";
import server from "solid-start/server";
import LinkItem from "~/components/LinkItem";
import Nav from "~/components/Nav";
import { getItems } from "~/lib/crud/items";

export function routeData() {
  const [items] = createResource(server(getItems));
  return { items };
}

export default function Home() {
  const { items } = useRouteData<typeof routeData>();

  return (
    <main>
      <Title>home - liteforum</Title>
      <Nav />

      <hr class="border-t border-neutral-200" />

      <section class="max-w-6xl py-2 w-full mx-auto px-4 py-3">
        <ul class="space-y-2">
          <For each={items()}>
            {(item) => (
              <li>
                <LinkItem item={item} />
              </li>
            )}
          </For>
        </ul>
      </section>
    </main>
  );
}
