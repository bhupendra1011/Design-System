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
