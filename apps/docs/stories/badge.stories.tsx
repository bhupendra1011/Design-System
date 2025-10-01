import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge, type BadgeProps } from '@pd/ui/badge';
import { 
  PriorityIcon, 
  AssigneeIcon, 
  CloseIcon, 
  DoneIcon,
  BacklogIcon,
  CanceledIcon,
  ExpandIcon,
  InprogressIcon,
  LabelIcon,
  TodoIcon
} from '@pd/icons';

// Icon selection options for Storybook controls
const iconOptions = {
  none: null,
  assignee: <AssigneeIcon size={12} />,
  backlog: <BacklogIcon size={12} />,
  canceled: <CanceledIcon size={12} />,
  close: <CloseIcon size={12} />,
  done: <DoneIcon size={12} />,
  expand: <ExpandIcon size={12} />,
  inprogress: <InprogressIcon size={12} />,
  label: <LabelIcon size={12} />,
  priority: <PriorityIcon size={12} />,
  todo: <TodoIcon size={12} />,
};

const iconNames = Object.keys(iconOptions);

const meta: Meta<BadgeProps> = {
  title: 'Components/Badge',
  component: Badge as React.ComponentType<BadgeProps>,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The Badge component displays small pieces of information with optional icons.

## Usage
\`\`\`tsx
import { Badge } from "@pd/ui/badge";
import { BacklogIcon } from "@pd/icons";

// Simple badge
<Badge>Status</Badge>

// Badge with icon
<Badge leftIcon={<BacklogIcon size={12} />}>
  Backlog
</Badge>
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "The text content to display in the badge",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    leftIcon: {
      control: { type: "select" },
      options: iconNames,
      mapping: iconOptions,
      description: "Icon to display at the start of the badge",
      table: {
        type: { summary: "React.ReactElement" },
        defaultValue: { summary: "null" },
      },
    },
    className: {
      table: { disable: true },
      control: false,
    },
  },
  args: {
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Backlog',
    leftIcon: <BacklogIcon size={12} />,
  },
};

export const UserTag: Story = {
  args: {
    children: 'John Doe',
    leftIcon: <AssigneeIcon size={12} />,
  },
};

export const StatusActive: Story = {
  args: {
    children: 'In Progress',
    leftIcon: <InprogressIcon size={12} />,
  },
};

export const Priority: Story = {
  args: {
    children: 'High Priority',
    leftIcon: <PriorityIcon size={12} />,
  },
};






