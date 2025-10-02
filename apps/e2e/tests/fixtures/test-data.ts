/**
 * Test data fixtures for E2E tests
 */

// Generate unique titles to avoid conflicts between tests
const timestamp = Date.now();

export const testCards = {
  newCard: {
    title: `E2E Test Card ${timestamp}`,
    description: 'This card was created by automated E2E test',
  },
  
  updatedCard: {
    title: `Updated E2E Test Card ${timestamp}`,
    description: 'This card was updated by automated E2E test',
  },
  
  longCard: {
    title: `Long Test Card Title ${timestamp}`,
    description: 'This is a very long description that tests how the card handles longer content and ensures the UI doesn\'t break with extended text content.',
  },
};

export const testColumns = {
  todo: 'todo',
  backlog: 'backlog',
  inProgress: 'in-progress',
  done: 'done',
  canceled: 'canceled',
} as const;

export const selectors = {
  // Column selectors
  addButton: '[aria-label="Add new issue to this column"]',
  todoColumn: '[data-testid="column-todo"]',
  
  // Modal selectors
  newIssueModal: '[aria-modal="true"]',
  updateIssueModal: '[aria-modal="true"]',
  titleInput: 'input[placeholder="Issue title"]',
  descriptionInput: 'textarea[placeholder="Description..."]',
  createButton: 'button:has-text("Create issue")',
  updateButton: 'button:has-text("Update issue")',
  cancelButton: 'button:has-text("Cancel")',
  
  // Card selectors
  card: '[data-testid="kanban-card"]',
  cardContent: '[data-testid="card-content"]',
  cardText: '[data-testid="card-text"]',
  priorityIcon: '[data-testid="priority-icon"]',
  
  // General
  modalBackdrop: '.fixed.inset-0',
} as const;