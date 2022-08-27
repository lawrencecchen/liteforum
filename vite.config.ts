import solid from "solid-start/vite";
import { defineConfig } from "vite";
import Unocss from "unocss/vite";

export default defineConfig({
  plugins: [
    solid({
      ssr: true,
    }),
    Unocss({}),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
      supported: {
        bigint: true,
      },
    },
    // for kysely
    exclude: ["pg", "mysql2"],
  },
});
