import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@pd/ui/card';
import { 
  PriorityIcon, 
  AssigneeIcon,
  InprogressIcon,
  TodoIcon,
  DoneIcon,
  BacklogIcon
} from '@pd/icons';
import { 
  DndContext, 
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
  closestCorners
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

// Icon options for controls
const iconOptions = {
  none: null,
  priority: <PriorityIcon size={16} />,
  assignee: <AssigneeIcon size={16} />,
  inprogress: <InprogressIcon size={16} />,
  todo: <TodoIcon size={16} />,
  done: <DoneIcon size={16} />,
  backlog: <BacklogIcon size={16} />,
};

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Flexible card component for content display with optional slots for icons and avatars. Designed to work with drag & drop libraries like dnd-kit.

## Usage

\`\`\`tsx
import { Card } from '@pd/ui/card';
import { PriorityIcon } from '@pd/icons';

// Basic card
<Card title="Card Title" />

// Card with content and slots
<Card 
  title="Task Title"
  subtitle="FIG-4"
  bottomIcon={<PriorityIcon size={16} />}
  rightIcon={<AssigneeIcon size={16} />}
>
  Task description goes here
</Card>

// Interactive card
<Card 
  title="Clickable Card"
  onClick={() => console.log('Card clicked')}
  variant="selected"
/>
\`\`\`

## Variants

- **\`default\`**: Standard card appearance
- **\`selected\`**: Highlighted state with primary border
- **\`dragging\`**: Visual feedback during drag operations

## Drag & Drop Ready

The Card component is optimized for use with dnd-kit:

\`\`\`tsx
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function DraggableCard({ id, title }) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({id});
  
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  
  return (
    <Card 
      ref={setNodeRef}
      style={style}
      title={title}
      {...attributes}
      {...listeners}
    />
  );
}
\`\`\`

## Layout Slots

- **\`title\`**: Main card title (required)
- **\`subtitle\`**: Optional subtitle with muted color (e.g., "FIG-4")
- **\`children\`**: Optional content area for descriptions
- **\`bottomIcon\`**: Icon displayed at bottom-left for status/priority
- **\`rightIcon\`**: Icon displayed at top-right for assignment

        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title text',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle with muted color (e.g., "FIG-4")',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Optional content/description',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'selected', 'dragging'],
      description: 'Visual variant of the card',
      table: {
        type: { summary: 'CardVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    bottomIcon: {
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon displayed at bottom of card',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    rightIcon: {
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon displayed at top-right for assignment',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    title: 'Sample Card Title',
    variant: 'default',
    bottomIcon: 'priority',
    rightIcon: 'assignee',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;



export const Default: Story = {
  args: {
    title: 'Basic Card',
  },
};

export const IssueCard: Story = {
  args: {
    title: 'Fix login validation bug',
    subtitle: 'FIG-123',
    children: 'Users are unable to log in with special characters in their password.',
    bottomIcon: 'priority',
    rightIcon: 'assignee',
  },
};

export const Interactive: Story = {
  args: {
    title: 'Clickable Card',
    children: 'This card responds to clicks and keyboard navigation.',
    bottomIcon: 'todo',
    rightIcon: 'assignee',
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Overview of all available card variants.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Default</h3>
        <Card 
          bottomIcon={<PriorityIcon size={16} />}
          rightIcon={<AssigneeIcon size={16} />}
          subtitle="FIG-1"
          title="Default Card"
        >
          Standard card appearance
        </Card>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Selected</h3>
        <Card 
          bottomIcon={<InprogressIcon size={16} />}
          rightIcon={<AssigneeIcon size={16} />}
          subtitle="FIG-2"
          title="Selected Card"
          variant="selected"
        >
          Highlighted with primary border
        </Card>
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Dragging</h3>
        <Card 
          bottomIcon={<DoneIcon size={16} />}
          rightIcon={<AssigneeIcon size={16} />}
          subtitle="FIG-3"
          title="Dragging Card"
          variant="dragging"
        >
          Visual feedback during drag
        </Card>
      </div>
    </div>
  ),
};

export const IssueCards: Story = {
  name: 'Issue Card Examples',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Real-world examples of cards representing different types of issues and tasks.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <Card 
        bottomIcon={<PriorityIcon size={16} />}
        rightIcon={<AssigneeIcon size={16} />}
        subtitle="FIG-123"
        title="Implement user authentication"
      >
        Add JWT-based authentication system with login and registration forms.
      </Card>
      <Card 
        bottomIcon={<InprogressIcon size={16} />}
        rightIcon={<AssigneeIcon size={16} />}
        subtitle="FIG-124"
        title="Fix responsive layout issues"
        variant="selected"
      >
        Mobile layout breaks on screens smaller than 375px width.
      </Card>
      <Card 
        bottomIcon={<TodoIcon size={16} />}
        subtitle="FIG-125"
        title="Update documentation"
      >
        Add API documentation for new endpoints and update getting started guide.
      </Card>
      <Card 
        bottomIcon={<DoneIcon size={16} />}
        rightIcon={<AssigneeIcon size={16} />}
        subtitle="FIG-126"
        title="Performance optimization"
      >
        Optimize bundle size and implement code splitting for better load times.
      </Card>
    </div>
  ),
};


interface CardItem {
  id: string;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  bottomIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// SortableCard component for drag and drop functionality
function SortableCard({ 
  id, 
  title, 
  subtitle, 
  children, 
  bottomIcon, 
  rightIcon,
  isBeingDragged 
}: {
  id: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  bottomIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isBeingDragged?: boolean;
}): JSX.Element {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Use selected variant when this card is being dragged (active)
  // Use dragging variant only for the overlay
  const getVariant = (): 'default' | 'selected' | 'dragging' => {
    if (isBeingDragged) return 'selected';
    if (isDragging) return 'dragging';
    return 'default';
  };

  return (
    <Card
      {...attributes}
      {...listeners}
      bottomIcon={bottomIcon}
      ref={setNodeRef}
      rightIcon={rightIcon}
      style={style}
      subtitle={subtitle}
      title={title}
      variant={getVariant()}
    >
      {children}
    </Card>
  );
}

// DroppableColumn component
function DroppableColumn({ 
  id,
  title, 
  items, 
  icon,
  activeId 
}: {
  id: string;
  title: string;
  items: CardItem[];
  icon: React.ReactNode;
  activeId?: string | null;
}): JSX.Element {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div 
      ref={setNodeRef}
      style={{
        width: '320px',
        backgroundColor: 'var(--colors-bg-modal)',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid var(--colors-border-card)',
        minHeight: '500px'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--colors-text-primary)'
      }}>
        {icon}
        <span>{title}</span>
      </div>
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item) => (
            <SortableCard
              bottomIcon={item.bottomIcon}
              id={item.id}
              isBeingDragged={activeId === item.id}
              key={item.id}
              rightIcon={item.rightIcon}
              subtitle={item.subtitle}
              title={item.title}
            >
              {item.content}
            </SortableCard>
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

// DraggableKanbanBoard component
function DraggableKanbanBoard(): JSX.Element {
    const [items, setItems] = useState({
      backlog: [
        {
          id: 'card-1',
          title: 'User authentication system',
          subtitle: 'FIG-201',
          content: 'Implement JWT-based authentication with login and registration',
          bottomIcon: <BacklogIcon size={16} />,
          rightIcon: <AssigneeIcon size={16} />
        },
        {
          id: 'card-2',
          title: 'Database migration',
          subtitle: 'FIG-202',
          content: 'Migrate legacy database to new schema',
          bottomIcon: <BacklogIcon size={16} />,
          rightIcon: <AssigneeIcon size={16} />
        },
        {
          id: 'card-3',
          title: 'Design system updates',
          subtitle: 'FIG-205',
          content: 'Update component library with new design tokens',
          bottomIcon: <BacklogIcon size={16} />,
          rightIcon: <AssigneeIcon size={16} />
        }
      ],
      todo: [
        {
          id: 'card-4',
          title: 'API documentation',
          subtitle: 'FIG-203',
          content: 'Write comprehensive API documentation for new endpoints',
          bottomIcon: <TodoIcon size={16} />,
          rightIcon: <AssigneeIcon size={16} />
        },
        {
          id: 'card-5',
          title: 'Unit test coverage',
          subtitle: 'FIG-204',
          content: 'Increase test coverage to 90%',
          bottomIcon: <TodoIcon size={16} />,
          rightIcon: <AssigneeIcon size={16} />
        }
      ]
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
        items[key as keyof typeof items].some((item) => item.id === id)
      );
    }

    function handleDragStart(event: DragStartEvent): void {
      setActiveId(event.active.id as string);
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
      
      setItems((prev) => {
        const activeItems = prev[activeContainer as keyof typeof prev];
        const overItems = prev[overContainer as keyof typeof prev];
        
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
          const containerItems = prev[activeContainer as keyof typeof prev];
          const activeIndex = containerItems.findIndex((item) => item.id === draggedId);
          const overIndex = containerItems.findIndex((item) => item.id === overId);
          
          const newItems = [...containerItems];
          const [removed] = newItems.splice(activeIndex, 1);
          newItems.splice(overIndex, 0, removed);
          
          return {
            ...prev,
            [activeContainer]: newItems,
          };
        });
      }
      
      setActiveId(null);
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
        <div style={{
          display: 'flex',
          gap: '20px',
          padding: '20px',
          backgroundColor: 'var(--colors-bg-app)',
          borderRadius: '8px',
          overflowX: 'auto',
          minHeight: '500px'
        }}>
          <DroppableColumn
            activeId={activeId}
            icon={<BacklogIcon size={16} />}
            id="backlog"
            items={items.backlog}
            title="Backlog"
          />
          <DroppableColumn
            activeId={activeId}
            icon={<TodoIcon size={16} />}
            id="todo"
            items={items.todo}
            title="To Do"
          />
        </div>

        <DragOverlay>
          {activeItem ? (
            <Card
              bottomIcon={activeItem.bottomIcon}
              rightIcon={activeItem.rightIcon}
              subtitle={activeItem.subtitle}
              title={activeItem.title}
              variant="dragging"
            >
              {activeItem.content}
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
}

export const DraggableCards: Story = {
  name: 'Draggable Cards (Kanban Board)',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Interactive Kanban board with draggable cards. Cards can be dragged within columns and between different columns.',
      },
    },
  },
  render: () => <DraggableKanbanBoard />,
};