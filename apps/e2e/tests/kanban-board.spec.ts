import { test, expect } from '@playwright/test';
import { testCards, testColumns, selectors } from './fixtures/test-data';

test.describe('Kanban Board E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the issues page
    await page.goto('/issues');
    
    // Wait for the board to load
    await page.waitForSelector(selectors.addButton);
  });

  test('should create a new card and verify count increase', async ({ page }) => {
    // Get initial card count in Todo column
    const todoColumn = page.locator(`[data-column-id="${testColumns.todo}"]`);
    const todoCards = todoColumn.locator(selectors.card);
    const initialCount = await todoCards.count();
    
    // Click add button in Todo column
    await todoColumn.locator(selectors.addButton).click();
    
    // Wait for modal to appear
    await expect(page.locator(selectors.newIssueModal)).toBeVisible();
    
    // Fill out the form
    await page.fill(selectors.titleInput, testCards.newCard.title);
    await page.fill(selectors.descriptionInput, testCards.newCard.description);
    
    // Wait for button to be enabled
    await expect(page.locator(selectors.createButton)).toBeEnabled();
    
    // Submit the form
    await page.click(selectors.createButton);
    
    // Wait for submission to complete with more time
    await expect(page.locator(selectors.newIssueModal)).not.toBeVisible({ timeout: 10000 });
    
    // Verify new card appears (using more specific selector)
    await expect(todoColumn.locator(`text="${testCards.newCard.title}"`).first()).toBeVisible();
    
    // Verify card count increased
    const newCount = await todoCards.count();
    expect(newCount).toBe(initialCount + 1);
  });

  test('should update a card via priority icon click', async ({ page }) => {
    // First create a card to update
    const todoColumn = page.locator(`[data-column-id="${testColumns.todo}"]`);
    await todoColumn.locator(selectors.addButton).click();
    
    await page.fill(selectors.titleInput, testCards.newCard.title);
    await page.fill(selectors.descriptionInput, testCards.newCard.description);
    
    // Wait for button to be enabled
    await expect(page.locator(selectors.createButton)).toBeEnabled();
    await page.click(selectors.createButton);
    
    // Wait for modal to close and card to appear
    await expect(page.locator(selectors.newIssueModal)).not.toBeVisible({ timeout: 10000 });
    await expect(todoColumn.locator(`text="${testCards.newCard.title}"`).first()).toBeVisible();
    
    // Click on the priority icon of the newly created card
    await todoColumn.locator(`[data-testid="kanban-card"]:has-text("${testCards.newCard.title}") [data-testid="priority-icon"]`).first().click();
    
    // Wait for update modal to appear (should open in-place, not navigate)
    await expect(page.locator(selectors.updateIssueModal)).toBeVisible();
    
    // Verify form is pre-filled with existing data
    await expect(page.locator(selectors.titleInput)).toHaveValue(testCards.newCard.title);
    await expect(page.locator(selectors.descriptionInput)).toHaveValue(testCards.newCard.description);
    
    // Update the card
    await page.fill(selectors.titleInput, testCards.updatedCard.title);
    await page.fill(selectors.descriptionInput, testCards.updatedCard.description);
    
    // Save changes
    await expect(page.locator(selectors.updateButton)).toBeEnabled();
    await page.click(selectors.updateButton);
    
    // Wait for modal to close
    await expect(page.locator(selectors.updateIssueModal)).not.toBeVisible({ timeout: 10000 });
    
    // Verify updated content appears on the board
    await expect(todoColumn.locator(`text="${testCards.updatedCard.title}"`).first()).toBeVisible();
    await expect(todoColumn.locator(`text="${testCards.newCard.title}"`)).not.toBeVisible();
  });

  test('should handle modal state correctly', async ({ page }) => {
    // First create a card to test modal interactions
    const todoColumn = page.locator(`[data-column-id="${testColumns.todo}"]`);
    await todoColumn.locator(selectors.addButton).click();
    
    await page.fill(selectors.titleInput, testCards.newCard.title);
    await page.fill(selectors.descriptionInput, testCards.newCard.description);
    
    // Wait for button to be enabled
    await expect(page.locator(selectors.createButton)).toBeEnabled();
    await page.click(selectors.createButton);
    
    // Wait for card to appear
    await expect(page.locator(selectors.newIssueModal)).not.toBeVisible({ timeout: 10000 });
    await expect(todoColumn.locator(`text="${testCards.newCard.title}"`).first()).toBeVisible();
    
    // Test opening update modal
    await todoColumn.locator(`[data-testid="kanban-card"]:has-text("${testCards.newCard.title}") [data-testid="priority-icon"]`).first().click();
    await expect(page.locator(selectors.updateIssueModal)).toBeVisible();
    
    // Test cancel button
    await page.click(selectors.cancelButton);
    await expect(page.locator(selectors.updateIssueModal)).not.toBeVisible();
    
    // Test escape key
    await todoColumn.locator(`[data-testid="kanban-card"]:has-text("${testCards.newCard.title}") [data-testid="priority-icon"]`).first().click();
    await expect(page.locator(selectors.updateIssueModal)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator(selectors.updateIssueModal)).not.toBeVisible();
  });

  test('should maintain card count consistency across operations', async ({ page }) => {
    const todoColumn = page.locator(`[data-column-id="${testColumns.todo}"]`);
    const todoCards = todoColumn.locator(selectors.card);
    
    // Get initial count
    const initialCount = await todoCards.count();
    
    // Create a card
    await todoColumn.locator(selectors.addButton).click();
    await page.fill(selectors.titleInput, testCards.newCard.title);
    await page.fill(selectors.descriptionInput, testCards.newCard.description);
    
    // Wait for button to be enabled
    await expect(page.locator(selectors.createButton)).toBeEnabled();
    await page.click(selectors.createButton);
    
    // Wait for modal to close
    await expect(page.locator(selectors.newIssueModal)).not.toBeVisible({ timeout: 10000 });
    
    // Verify count increased by 1
    await expect(todoCards).toHaveCount(initialCount + 1);
    
    // Update the card (should not change count)
    await todoColumn.locator(`[data-testid="kanban-card"]:has-text("${testCards.newCard.title}") [data-testid="priority-icon"]`).first().click();
    
    await page.fill(selectors.titleInput, testCards.updatedCard.title);
    
    // Wait for button to be enabled
    await expect(page.locator(selectors.updateButton)).toBeEnabled();
    await page.click(selectors.updateButton);
    
    // Wait for modal to close
    await expect(page.locator(selectors.updateIssueModal)).not.toBeVisible({ timeout: 10000 });
    
    // Verify count remains the same
    await expect(todoCards).toHaveCount(initialCount + 1);
    
    // Verify updated content
    await expect(todoColumn.locator(`text="${testCards.updatedCard.title}"`).first()).toBeVisible();
  });

  test('should handle modal interactions correctly', async ({ page }) => {
    const todoColumn = page.locator(`[data-column-id="${testColumns.todo}"]`);
    
    // Test opening and closing new issue modal
    await todoColumn.locator(selectors.addButton).click();
    await expect(page.locator(selectors.newIssueModal)).toBeVisible();
    
    // Test cancel button
    await page.click(selectors.cancelButton);
    await expect(page.locator(selectors.newIssueModal)).not.toBeVisible();
    
    // Test escape key (create card first for update modal)
    await todoColumn.locator(selectors.addButton).click();
    await page.fill(selectors.titleInput, testCards.newCard.title);
    await page.fill(selectors.descriptionInput, testCards.newCard.description);
    
    // Wait for button to be enabled
    await expect(page.locator(selectors.createButton)).toBeEnabled();
    await page.click(selectors.createButton);
    
    // Wait for modal to close and card to appear
    await expect(page.locator(selectors.newIssueModal)).not.toBeVisible({ timeout: 10000 });
    await expect(todoColumn.locator(`text="${testCards.newCard.title}"`).first()).toBeVisible();
    
    // Test update modal escape
    await todoColumn.locator(`[data-testid="kanban-card"]:has-text("${testCards.newCard.title}") [data-testid="priority-icon"]`).first().click();
    
    await expect(page.locator(selectors.updateIssueModal)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator(selectors.updateIssueModal)).not.toBeVisible();
  });
});