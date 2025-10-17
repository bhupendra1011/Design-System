# E2E Testing for Todo Example

This package houses Playwright-based end-to-end coverage for the minimal Next.js Todo app that ships with the design system starter.

## Quick Start

```bash
# Install dependencies
pnpm install

# Install Playwright browsers
pnpm install-browsers

# Run tests (with local dev server)
pnpm test

# Run tests in headed mode (see browser)
pnpm test:headed

# Run tests with UI mode
pnpm test:ui

# Debug tests
pnpm test:debug
```

## Test Scenario

### Todo completion flow
- ✅ Visits the root route
- ✅ Confirms the todo list renders
- ✅ Toggles the first item and waits for optimistic "Saving…" state
- ✅ Verifies the button text flips between `Mark Complete` and `Mark Pending`

## Configuration

- **Base URL**: `http://localhost:3000` (configurable via `BASE_URL` env var)
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Retries**: 2 on CI, 0 locally
- **Parallel**: Full parallel execution
- **Reports**: HTML, JSON, GitHub Actions

## CI/CD Integration

Tests run automatically on:
- ✅ Pull requests to `main`
- ✅ Pushes to `main` branch
- ✅ `develop → main` merges

Results are uploaded as artifacts for debugging.

## File Structure

```
apps/e2e/
├── tests/
│   └── todo-app.spec.ts      # Main test scenario
├── playwright.config.ts      # Playwright configuration
├── package.json
└── README.md
```

## Adding New Tests

1. Create new specs inside `tests/`
2. Start from the shared helper patterns in `todo-app.spec.ts`
3. Follow naming convention: `*.spec.ts`

## Debugging

- Use `pnpm test:debug` for step-by-step debugging
- Use `pnpm test:ui` for visual test runner
- Check `playwright-report/` for detailed results
- Screenshots and videos saved on failures
