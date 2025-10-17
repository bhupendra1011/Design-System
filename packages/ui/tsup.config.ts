import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: ["src/button.tsx", "src/text.tsx", "src/card.tsx", "src/input.tsx", "src/badge.tsx", "src/modal.tsx"],
  format: ["cjs", "esm"],
  dts: false,
  external: ["react", "@repo/icons"],
  treeshake: true,
  ...options,
}));
