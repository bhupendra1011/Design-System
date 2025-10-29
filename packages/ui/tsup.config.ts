import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/button.tsx", "src/text.tsx", "src/card.tsx", "src/input.tsx", "src/modal.tsx"],
  format: ["cjs", "esm"],
  dts: false,
  external: ["react", "@repo/icons"],
  treeshake: true,
  splitting: false,
  clean: true,
});
