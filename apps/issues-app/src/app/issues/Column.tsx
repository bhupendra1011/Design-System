"use client";

import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './Card';
import { Text } from '@pd/ui/text';
import type { Column as ColumnData, Card } from './data';
import { AddIcon, MoreIcon } from '@pd/icons';
import { NewIssueModal } from './NewIssueModal';
import { Button } from '@pd/ui/button';

interface KanbanColumnProps {
  column: ColumnData;
  activeId?: string | null;
  onIssueCreated?: (card: Card) => void;
}

export function KanbanColumn({ column, activeId, onIssueCreated }: KanbanColumnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
        <div className="ml-auto flex items-center gap-2">
          <Button 
            onClick={handleAddClick} 
            aria-label="Add issue" 
            className='!bg-transparent hover:!bg-card !p-1 !rounded-md transition-all !cursor-pointer !border-0 group'
          >
            <AddIcon size={16} className='text-secondary group-hover:text-primary transition-colors' />
          </Button>
          <Button 
            onClick={()=>{}} 
            aria-label="More options" 
            className='!bg-transparent hover:!bg-card !p-1 !rounded-md transition-all !cursor-pointer !border-0 group'
          >
            <MoreIcon size={16} className='text-secondary group-hover:text-primary transition-colors' />
          </Button>
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

      {/* New Issue Modal */}
      <NewIssueModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        columnId={column.id}
        columnTitle={column.title}
        onIssueCreated={onIssueCreated}
      />
    </div>
  );
}