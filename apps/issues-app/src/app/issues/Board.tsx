"use client";

import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { KanbanColumn } from './Column';
import { KanbanCard } from './Card';
import type { BoardData, Card } from './data';
import {
  BacklogIcon,
  TodoIcon,
  InprogressIcon,
  DoneIcon,
  CanceledIcon
} from '@pd/icons';

interface BoardProps {
  initialData: BoardData;
}

export function Board({ initialData }: BoardProps) {
  // Convert column structure to object format like in card stories
  const [items, setItems] = useState(() => {
    const itemsObject: Record<string, Card[]> = {};
    initialData.columns.forEach(column => {
      itemsObject[column.id] = column.cards;
    });
    return itemsObject;
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function findContainer(id: string): string | undefined {
    if (id in items) {
      return id;
    }
    
    return Object.keys(items).find((key) =>
      items[key].some((item) => item.id === id)
    );
  }

  function handleDragStart(event: DragStartEvent): void {
    setActiveId(event.active.id as string);
    console.log('Drag started:', event.active.id);
  }

  function handleDragOver(event: DragOverEvent): void {
    const { active, over } = event;
    
    if (!over) return;
    
    const draggedId = active.id as string;
    const overId = over.id as string;
    
    const activeContainer = findContainer(draggedId);
    const overContainer = findContainer(overId);
    
    if (!activeContainer || !overContainer) return;
    
    // Don't do anything if we're over the same container
    if (activeContainer === overContainer) return;
    
    console.log('Moving card between columns:', { from: activeContainer, to: overContainer });
    
    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      
      const activeIndex = activeItems.findIndex((item) => item.id === draggedId);
      const activeItem = activeItems[activeIndex];
      
      return {
        ...prev,
        [activeContainer]: activeItems.filter((_, index) => index !== activeIndex),
        [overContainer]: [...overItems, activeItem],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }
    
    const draggedId = active.id as string;
    const overId = over.id as string;
    
    if (draggedId === overId) {
      setActiveId(null);
      return;
    }
    
    const activeContainer = findContainer(draggedId);
    const overContainer = findContainer(overId);
    
    if (!activeContainer || !overContainer) {
      setActiveId(null);
      return;
    }
    
    // If we're in the same container, reorder
    if (activeContainer === overContainer) {
      setItems((prev) => {
        const containerItems = prev[activeContainer];
        const activeIndex = containerItems.findIndex((item) => item.id === draggedId);
        const overIndex = containerItems.findIndex((item) => item.id === overId);
        
        const newItems = [...containerItems];
        const [removed] = newItems.splice(activeIndex, 1);
        newItems.splice(overIndex, 0, removed);
        
        console.log('Reordered within column:', activeContainer);
        
        return {
          ...prev,
          [activeContainer]: newItems,
        };
      });
    }
    
    console.log('Drag ended');
    setActiveId(null);
  }

  function handleIssueCreated(columnId: string, newCard: Card): void {
    setItems((prev) => ({
      ...prev,
      [columnId]: [...(prev[columnId] || []), newCard],
    }));
  }

  const activeItem = activeId ? 
    Object.values(items).flat().find(item => item.id === activeId) : null;

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <div className="flex flex-wrap gap-5 p-5 mx-auto  mb-5 bg-[var(--colors-bg-app)] mt-10 rounded-lg overflow-x-auto min-h-[500px]">
        {initialData.columns.map((column) => {
          // Map column icons based on column id
          const getColumnIcon = (columnId: string) => {
            switch (columnId) {
              case 'backlog': return <BacklogIcon size={16} />;
              case 'todo': return <TodoIcon size={16} />;
              case 'in-progress': return <InprogressIcon size={16} />;
              case 'done': return <DoneIcon size={16} />;
              case 'canceled': return <CanceledIcon size={16} />;
              default: return null;
            }
          };

          return (
            <KanbanColumn 
              key={column.id} 
              column={{
                ...column,
                icon: getColumnIcon(column.id),
                cards: items[column.id] || []
              }}
              activeId={activeId}
              onIssueCreated={(newCard) => handleIssueCreated(column.id, newCard)}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeItem ? (
          <KanbanCard card={activeItem} isDragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}