import React, { Suspense } from 'react';
import { Board } from './Board';
import { getKanban } from './actions';
import Loading from './loading';

async function BoardWrapper() {
  const boardData = await getKanban();
  return <Board initialData={boardData} />;
}

export default function IssuesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BoardWrapper />
    </Suspense>
  );
}