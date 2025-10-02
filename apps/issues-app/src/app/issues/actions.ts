"use server";

import { boardData, type BoardData, type Card } from './data';

let currentBoardData = structuredClone(boardData);

export async function getKanban(): Promise<BoardData> {
  // simulate database delay with 2s delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return structuredClone(currentBoardData);
}

export async function createIssue(issueData: {
  title: string;
  content: string;
  columnId: string;
  priority?: string;
  labels?: string[];
  assignee?: string;
}): Promise<Card> {
  // simulate database delay with 1s delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate a unique ID for the new card
  const newId = `card-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  
  const newCard: Card = {
    id: newId,
    title: issueData.title,
    content: issueData.content,
    bottomIcon: issueData.assignee ? 'user' : undefined,
    rightIcon: issueData.priority ? 'priority' : undefined,
  };

  // Find the column and add the new card
  const targetColumn = currentBoardData.columns.find(col => col.id === issueData.columnId);
  if (targetColumn) {
    targetColumn.cards.push(newCard);
  }

  return newCard;
}

export async function updateIssue(
  cardId: string,
  updatedData: {
    title: string;
    content: string;
    priority?: string;
    labels?: string[];
    assignee?: string;
  }
): Promise<Card | null> {
  // simulate database delay with 1s delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Find the card across all columns
  let foundCard: Card | null = null;
  for (const column of currentBoardData.columns) {
    const cardIndex = column.cards.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
      // Update the card data
      foundCard = {
        ...column.cards[cardIndex],
        title: updatedData.title,
        content: updatedData.content,
        bottomIcon: updatedData.assignee ? 'user' : undefined,
        rightIcon: updatedData.priority ? 'priority' : undefined,
      };
      column.cards[cardIndex] = foundCard;
      break;
    }
  }

  return foundCard;
}

export async function getCardData(cardId: string): Promise<{ card: Card; columnId: string } | null> {
  // Find the card and its column
  for (const column of currentBoardData.columns) {
    const card = column.cards.find(c => c.id === cardId);
    if (card) {
      return { card, columnId: column.id };
    }
  }
  return null;
}
