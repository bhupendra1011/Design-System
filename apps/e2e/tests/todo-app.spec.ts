import { test, expect } from "@playwright/test";

test.describe("Todo example", () => {
  test("loads todos and toggles completion state", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: "My Todos" })).toBeVisible();

    const firstItem = page.getByRole("listitem").first();
    await expect(firstItem).toBeVisible();

    const toggleButton = firstItem.getByRole("button");
    const initialText = (await toggleButton.textContent())?.trim() ?? "";
    const expectedFinalText = initialText === "Mark Complete" ? "Mark Pending" : "Mark Complete";

    await toggleButton.click();
    await expect(toggleButton).toHaveText("Saving…");
    await expect(toggleButton).toHaveText(expectedFinalText, { timeout: 10_000 });
  });
});
