# Design System & Issues Tracker

This repository demonstrates a **design system + product app integration** using a monorepo architecture.  
It contains:  
- A **design system** (tokens, themes, components, icons, docs).  
- An **issues tracker app** (Kanban board) built with **Next.js 15 + React 19**, consuming the design system directly.  

The goal is to show a **token-first workflow** from **Figma → code**, with automated documentation, theming, and testing for production-grade scalability.  

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start all apps in development
pnpm dev

# Open Storybook
pnpm --filter docs dev

# Run the Issues App (Next.js Kanban board)
pnpm --filter issues-app dev

# Run E2E tests
cd apps/e2e && pnpm test
```

---

## 📂 Project Structure

```
design-system/
├── apps/
│   ├── docs/              # Storybook documentation site
│   ├── e2e/               # Playwright end-to-end tests
│   └── issues-app/        # Next.js kanban board application
├── packages/
│   ├── design-tokens/     # Style Dictionary design tokens
│   ├── eslint-config/     # Shared ESLint configurations
│   ├── icons/             # Automated SVG → React icon generation
│   ├── typescript-config/ # Shared TypeScript configurations
│   └── ui/                # React component library
└── turbo.json             # Turborepo build orchestration
```

Naming convention:  
- `@pd/ui` → UI components  
- `@pd/icons` → icons  
- `@pd/design-tokens` → design tokens  

---

## 📸 Screenshots

> Replace these placeholders with real screenshots/GIFs.

- **Kanban Board UI**  
  ![Kanban Board Screenshot](./kanban-board.png)

- **Storybook Docs**  
  ![Storybook Screenshot](./StoryBook.png)

---

## ❓ Why Monorepo?

A monorepo approach was chosen for several key benefits:  
- **Single Source of Truth** → shared tokens, UI components, and configs.  
- **Atomic Changes** → update a token or component and all apps reflect it instantly.  
- **Consistent Tooling** → unified linting, testing, build pipelines.  
- **Simplified Releases** → coordinated versioning across apps/packages.  
- **Better DX** → one clone, one install, everything works together.  

---

## ❓ Why Style Dictionary?

Style Dictionary was selected as the **token compiler** because it:  
- **Supports Multi-Platform Outputs** → CSS vars, Tailwind config, TS types, JSON.  
- **Keeps Tokens Source-Agnostic** → design tokens exported from Figma once, reused everywhere.  
- **Automates Theming** → light/dark variations with zero manual duplication.  
- **Future Proof** → if we add React Native or another platform, we just add a new output format.  

Without Style Dictionary, we’d be **copy-pasting values** into multiple formats, increasing drift and errors.  

---

## 🎨 Design Token Strategy

The system is built on a **token-first approach** using **Style Dictionary**.  

### Flow: From Figma → Code

```mermaid
graph TD
    A[Figma + Token Studio] --> B[design-tokens (JSON)]
    B --> C[Style Dictionary Build]
    C --> D[CSS Variables]
    C --> E[Tailwind Config]
    C --> F[TypeScript Types]
    D & E & F --> G[@pd/ui + issues-app]
```

### Token Layers
- **Core Tokens** → raw values (colors, spacing, typography, shadows).  
- **Semantic Tokens** → context-aware (primary-bg, text-heading, border-muted).  
- **Themes** → light/dark overrides via CSS variables.  

### Distribution
- CSS Custom Properties → runtime theming.  
- Tailwind Config → utility-first styling.  
- TypeScript Definitions → type-safe usage in components.  

---

## 🧩 UI Components (`@pd/ui`)

Production-ready React components:  
- **Badge** – status indicators  
- **Button** – multiple variants & states  
- **Card** – container component  
- **Input** – form fields with validation  
- **Modal** – dialogs with focus trapping  
- **Text** – semantic typography  

All built with:  
- TypeScript for type safety  
- Tailwind CSS for styling  
- WCAG 2.1 AA accessibility baked in  
- Storybook for documentation  

---

## 📖 Storybook

Interactive documentation with:  
- Live playgrounds  
- Auto-generated prop tables  
- A11y addon for compliance  
- Responsive viewport testing  
- Theme toggle (light/dark)  

Run at `localhost:6006` during development.  

---

## 🎨 Theming System

- **CSS Custom Properties** for instant runtime theme switching.  
- **React Context** for theme state.  
- **Tailwind Integration** so all utilities are token-driven.  

---

## ♿ Accessibility Features

- **Focus management** (custom focus rings, modal focus trapping).  
- **ARIA roles + states** for screen readers.  
- **Keyboard navigation** (arrow keys, Enter/Space, Escape dismissal).  
- **Testing** via Storybook a11y addon + Playwright axe checks.  

---

## 🧪 End-to-End Testing

Playwright ensures Kanban functionality works across browsers.  

✔ Create, update, and move cards.  
✔ Modal open/close (click, cancel, escape).  
✔ Cross-column drag-and-drop.  
✔ Card count consistency.  

**Example Test**  
```ts
test("creates a new card", async ({ page }) => {
  await page.getByRole("button", { name: "New Issue" }).click();
  await page.fill("input[name=title]", "Fix login bug");
  await page.click("button[type=submit]");
  await expect(page.getByText("Fix login bug")).toBeVisible();
});
```

---

## 🔒 Branch Protection & CI/CD

- **Branch Protection** → no direct pushes to `main`.  
- **Status Checks** → build, lint, test, type-check required.  
- **CI/CD** → GitHub Actions (build + test + deploy).  

---

## 🗂 Issues App (Next.js 15 + React 19)

A Kanban board app demonstrating design system integration.  

### Features
- Create New Issue modal  
- Update Issue modal  
- Smooth drag-and-drop  
- Modal focus + escape handling  
- Suspense for skeleton loading  

### Server Actions
- Direct form → server function (no API routes).  
- Fully type-safe, smaller client bundles, better perf.  

---

## ⚙️ Tech Stack

- **Monorepo**: Turborepo + pnpm  
- **Frontend**: Next.js 15 + React 19 + TypeScript  
- **Styling**: Tailwind CSS + CSS Vars  
- **Design Tokens**: Style Dictionary  
- **Docs**: Storybook  
- **Testing**: Playwright + Jest  
- **Build**: tsup + Turbopack  
- **CI/CD**: GitHub Actions  

---


