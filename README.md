# 🧩 Design System Starter

A production-ready **design system boilerplate** built with Turborepo and pnpm. It demonstrates how to combine design tokens, a React component library, automated icon generation, Storybook docs, a Next.js example app, and Playwright tests into a cohesive starter you can publish and share.

> Coming soon: `npx create-my-design-system my-app` will scaffold this repo into any directory. Until then, clone it directly and start exploring.

---

## 🚀 Quick Start

### Clone the starter locally

```bash
git clone https://github.com/your-org/design-system-starter.git
cd design-system-starter
pnpm install
pnpm dev
```

Once `pnpm dev` is running:
- Storybook → http://localhost:6006
- Example Todo app → http://localhost:3000

### Scaffold via CLI (planned)

```bash
npx create-my-design-system my-app
cd my-app
pnpm install
pnpm dev
```

---

## 🧱 What’s Included

- 🎨 **Design Tokens** — Style Dictionary compiles JSON tokens into CSS variables, Tailwind utilities, and TypeScript helpers.
- 🧱 **UI Library (`@repo/ui`)** — Accessible React components built with tokens + Tailwind v4.
- 🖼️ **Icon Pipeline (`@repo/icons`)** — Converts raw SVGs into typed React components with automation scripts.
- 📘 **Storybook (`apps/docs`)** — Live docs, a11y checks, design verification, and example scenarios.
- ⚡ **Example App (`apps/web`)** — Minimal Next.js 15 / React 19 Todo app consuming the UI library.
- 🧪 **E2E Tests (`apps/e2e`)** — Playwright spec that validates optimistic UI interactions.
- 🚀 **Turborepo + pnpm** — Caching, task scheduling, and workspace tooling wired up for monorepo workflows.

---

## 📂 Project Structure

```
design-system-starter/
├── apps/
│   ├── docs/              # Storybook documentation
│   ├── e2e/               # Playwright end-to-end tests
│   └── web/               # Next.js Todo example app
├── packages/
│   ├── design-tokens/     # Style Dictionary setup
│   ├── icons/             # SVG → React icon generator
│   ├── ui/                # Shared UI component library
│   ├── eslint-config/     # Shared ESLint rules
│   └── typescript-config/ # Shared TS configs
├── scripts/               # (optional) CLI scaffolding utilities
├── turbo.json             # Turborepo pipeline config
└── pnpm-workspace.yaml
```

---

## 🔧 Day-to-Day Commands

| Action | Command |
|--------|---------|
| Start Storybook + web app | `pnpm dev` |
| Run Storybook only | `pnpm --filter docs dev` |
| Run Next.js Todo app | `pnpm --filter web dev` |
| Build tokens | `pnpm --filter design-tokens build` |
| Build UI package | `pnpm --filter ui build` |
| Run lint across monorepo | `pnpm lint` |
| Run Playwright tests | `pnpm --filter e2e test` |

Turborepo caches builds and tests automatically, so repeated commands are fast.

---

## 🧬 Design Tokens Workflow

1. Edit token definitions inside `packages/design-tokens/tokens`.
2. Run `pnpm --filter design-tokens build`.
3. Use the generated outputs:
   - `dist/css/tokens.css` & `dist/css/theme.css` → CSS variables for runtime theming.
   - `dist/tailwind/tokens.cjs` → Tailwind utility generation.
   - `dist/json/*.json` → Raw token exports for other platforms.
4. Preview all token utilities in Storybook under **Foundations / Design Verify**.

---

## 🧱 UI Component Library

The `@repo/ui` package exposes stateless components (`Button`, `Card`, `Badge`, `Input`, `Modal`, `Text`) that pull styling from design tokens. Components are authored in TypeScript, styled with Tailwind v4, and bundled via tsup for fast builds.

Storybook stories live in `apps/docs/stories` and demonstrate real-world todo scenarios alongside interactive controls.

---

## ⚡ Example App (`apps/web`)

A lightweight Next.js 15 application shows how consumers integrate the design system:

- Server Components + Suspense for streaming the first five todos from JSONPlaceholder.
- Optimistic UI toggles backed by a simulated server action (`app/actions.ts`).
- Token-driven skeleton states and typography.
- Tailwind utilities sourced directly from the design tokens pipeline.

This app is intentionally minimal so teams can quickly replace it with their own product surface.

---

## 🧪 End-to-End Tests

`apps/e2e` contains a Playwright spec (`todo-app.spec.ts`) that:

1. Visits the example app.
2. Confirms todos render.
3. Toggles completion on the first todo.
4. Verifies the optimistic “Saving…” state transitions to the completed label.

Run tests locally with `pnpm --filter e2e test`. The Playwright configuration automatically boots the Next.js dev server when tests execute.

---

## 🧭 Customizing the Starter

1. **Rename packages** — update workspace names (`package.json`, `pnpm-workspace.yaml`) to match your organization.
2. **Swap token sources** — plug in your Figma exports or manually authored tokens.
3. **Extend UI primitives** — add new components under `packages/ui/src` and document them in Storybook.
4. **Add icons** — drop SVG files into `packages/icons/svg` and run the build script.
5. **Publish** — wire up Changesets or your preferred release process to version packages.

---

## 🤝 Contributing

Issues and PRs are welcome! If you publish improvements (new tokens, components, tooling), share them back so others can benefit.

---

## 📄 License

MIT © Your Name or Company
