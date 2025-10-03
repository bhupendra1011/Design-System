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
  onCardClick?: (card: Card, columnId: string) => void;
}

export function KanbanColumn({ column, activeId, onIssueCreated, onCardClick }: KanbanColumnProps) {
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
      className="flex-1 w-full md:min-w-0 md:max-w-none p-3 md:p-2 rounded-lg border border-card min-h-[400px] md:min-h-[500px]"
      data-testid={`column-${column.id}`}
      data-column-id={column.id}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[var(--colors-text-primary)]">{column.icon}</span>
        <Text as="span" variant="body" className="text-[var(--colors-text-primary)] font-secondary">{column.title}</Text>
        <Text 
          as="span" 
          variant="body" 
          className='font-secondary'
          
        >
          {column.cards.length}/10
        </Text>
        <div className="ml-auto flex items-center gap-2">
          <Button 
            onClick={handleAddClick} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAddClick();
              }
            }}
            aria-label="Add new issue to this column" 
            className='!bg-transparent hover:!bg-card !p-1 !rounded-md transition-all !cursor-pointer !border-0 group focus:!ring-2 focus:!ring-button-primary'
            tabIndex={0}
          >
            <AddIcon size={16} className='text-secondary group-hover:text-primary transition-colors' />
          </Button>
          <Button 
            onClick={()=>{}} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Handle more options
              }
            }}
            aria-label="More options for this column" 
            className='!bg-transparent hover:!bg-card !p-1 !rounded-md transition-all !cursor-pointer !border-0 group focus:!ring-2 focus:!ring-button-primary'
            tabIndex={0}
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
              columnId={column.id}
              isBeingDragged={activeId === card.id}
              onCardClick={onCardClick}
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