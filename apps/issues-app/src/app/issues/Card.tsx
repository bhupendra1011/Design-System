"use client";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card as UICard } from '@pd/ui/card';
import type { Card as CardData } from './data';
import { 
  AssigneeIcon, 
  PriorityIcon
} from '@pd/icons';

interface KanbanCardProps {
  card: CardData;
  isDragging?: boolean;
  isBeingDragged?: boolean;
}

export function KanbanCard({ card, isDragging, isBeingDragged }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: sortableIsDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: 'card',
      card,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || sortableIsDragging ? 0.5 : 1,
  };

  // Use selected variant when this card is being dragged (active)
  // Use dragging variant only for the overlay
  const getVariant = (): 'default' | 'selected' | 'dragging' => {
    if (isBeingDragged) return 'selected';
    if (isDragging || sortableIsDragging) return 'dragging';
    return 'default';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <UICard
        title={card.title}
        bottomIcon={<span className="text-[var(--colors-text-secondary)]"><PriorityIcon size={16} /></span>}
        rightIcon={<span className="text-[var(--colors-text-tertiary)]"><AssigneeIcon size={16} /></span>}
        variant={getVariant()}
      >
        {card.content}
      </UICard>
    </div>
  );
}