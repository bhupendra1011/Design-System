# Web (Todo Example)

This is the minimal example application that ships with the Design System Starter. It demonstrates how to consume the shared UI components, design tokens, and icons in a real Next.js 15 + React 19 app.

## Running locally

```bash
pnpm --filter web dev
```

The app will be available at `http://localhost:3000`. It streams the first five todos from [JSONPlaceholder](https://jsonplaceholder.typicode.com/) and simulates optimistic updates with server actions.

## What to explore

- Shared design tokens via the generated CSS pipeline (`packages/design-tokens`).
- UI primitives from `@repo/ui` such as `Button`, `Card`, `Badge`, and `Text`.
- Server Actions + `useOptimistic` for optimistic UI toggles.
- Streaming data with React Suspense and skeleton states.

Use this project as a starting point for building your own consumer applications.
