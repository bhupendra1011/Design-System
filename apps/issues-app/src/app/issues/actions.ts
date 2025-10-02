"use server";

import { boardData, type BoardData, type Card } from './data';

let currentBoardData = structuredClone(boardData);

export async function getKanban(): Promise<BoardData> {
  // simulate database delay with 2s delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return structuredClone(currentBoardData);
}
