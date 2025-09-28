import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/*
 * This is a custom ESLint configuration for use with Next.js
 * applications.
 *
 * This config extends the Vercel Engineering Style Guide and Next.js defaults.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next"
  ),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "next-env.d.ts",
      "**/*.css",
    ],
  },
  {
    rules: {
      "import/no-default-export": "off",
    },
  },
];

export default eslintConfig;