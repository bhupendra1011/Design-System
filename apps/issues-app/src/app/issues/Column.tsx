"use client";

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './Card';
import { Text } from '@pd/ui/text';
import type { Column as ColumnData } from './data';
import { AddIcon, MoreIcon } from '@pd/icons';

interface KanbanColumnProps {
  column: ColumnData;
  activeId?: string | null;
}

export function KanbanColumn({ column, activeId }: KanbanColumnProps) {
  const {
    setNodeRef,
  } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });

  const cardIds = column.cards.map(card => card.id);

  return (
    <div 
      ref={setNodeRef}
      className="w-75  p-4 rounded-lg border border-card min-h-[500px]"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[var(--colors-text-primary)]">{column.icon}</span>
        <Text as="span" variant="body" className="text-[var(--colors-text-primary)]">{column.title}</Text>
        <Text 
          as="span" 
          variant="body" 
          
        >
          {column.cards.length}/10
        </Text>
        <div className="ml-auto flex items-center gap-2 text-[var(--colors-text-secondary)]">
          <AddIcon />
          <MoreIcon />
        </div>
      </div>
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-medium">
          {column.cards.map((card) => (
            <KanbanCard 
              key={card.id} 
              card={card} 
              isBeingDragged={activeId === card.id}
            />
          ))}
        </div>
      </SortableContext>

      {/* Empty State */}
      {column.cards.length === 0 && (
        <div className="flex items-center justify-center h-32 text-[var(--colors-text-muted)] text-sm">
          Drop cards here
        </div>
      )}
    </div>
  );
}