import { createServerAction, redirect } from "solid-start/server";
import invariant from "tiny-invariant";
import { createItem } from "~/lib/crud/items";

export default function BulkImport() {
  const bulk = createServerAction(async (form: FormData) => {
    const rawurls = form.get("urls");
    invariant(typeof rawurls === "string");
    const urls = rawurls.split("\n");
    await Promise.all(
      urls.map(async (url) => {
        console.log(url);
        const formData = new FormData();
        formData.set("url", url);
        return createItem(formData);
      })
    );
    return redirect("/");
  });
  return (
    <bulk.Form>
      <textarea
        name="urls"
        placeholder="urls"
        class="border"
        rows={10}
        cols={80}
      ></textarea>
      <button>import</button>
    </bulk.Form>
  );
}
