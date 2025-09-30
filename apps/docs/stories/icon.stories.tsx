import type { Meta, StoryObj } from "@storybook/react";
import { 
  AssigneeIcon,
  BacklogIcon, 
  CanceledIcon,
  CloseIcon,
  DoneIcon,
  ExpandIcon,
  InprogressIcon,
  LabelIcon,
  PriorityIcon,
  TodoIcon 
} from "@pd/icons";
import React from "react";

const meta: Meta<typeof PriorityIcon> = {
  title: "Components/Icon",
  component: PriorityIcon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `React icon components automatically generated from SVG

## Usage

\`\`\`tsx
import { PriorityIcon, AssigneeIcon } from "@pd/icons";

// Basic usage 
<PriorityIcon />

// With custom size and color
<AssigneeIcon size={24} color="#3b82f6" />

// With Tailwind classes
<CloseIcon className="animate-pulse" />
\`\`\``,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "number", min: 8, max: 64, step: 2 },
      description: "Icon size in pixels",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "14" },
      },
    },
    color: {
      control: { type: "color" },
      description: "Icon color",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "currentColor" },
      },
    },
    className: {
      control: { type: "text" },
      description: "CSS classes",
      table: {
        type: { summary: "string" },
      },
    },
  },
  args: {
    size: 24,
    color: "currentColor",
    className: "text-blue-500",
  },
};

export default meta;
type Story = StoryObj<typeof PriorityIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: "currentColor",
    className: "text-blue-500",
  },
};

export const WithTailwindClasses: Story = {
  name: "With Tailwind Classes",
  render: () => (
    <div className="space-y-4 p-4">
      <div>
        <div className="flex gap-4 items-center">
          <PriorityIcon size={32} color="currentColor" className="text-blue-500 animate-pulse" />
          <span className="text-sm">text-blue-500 animate-pulse</span>
        </div>
        <div className="flex gap-4 items-center mt-2">
          <AssigneeIcon size={32} color="currentColor" className="text-red-500 animate-bounce" />
          <span className="text-sm">text-red-500 animate-bounce</span>
        </div>
      </div>
      
      <div>
      </div>
    </div>
  ),
};

export const AllIcons: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <AssigneeIcon size={args.size} color={args.color} className={args.className} />
        <span style={{ fontSize: '12px', marginTop: '8px' }}>Assignee Icon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <BacklogIcon size={args.size} color={args.color} className={args.className} />
        <span style={{ fontSize: '12px', marginTop: '8px' }}>Backlog Icon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <CanceledIcon size={args.size} color={args.color} className={args.className} />
        <span style={{ fontSize: '12px', marginTop: '8px' }}>Canceled Icon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <CloseIcon size={args.size} color={args.color} className={args.className} />
        <span style={{ fontSize: '12px', marginTop: '8px' }}>Close Icon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <DoneIcon size={args.size} color={args.color} className={args.className} />
        <span style={{ fontSize: '12px', marginTop: '8px' }}>Done Icon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <ExpandIcon size={args.size} color={args.color} className={args.className} />
        <span style={{ fontSize: '12px', marginTop: '8px' }}>Expand Icon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <InprogressIcon size={args.size} color={args.color} className={args.className} />
        <span style={{ fontSize: '12px', marginTop: '8px' }}>In Progress Icon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <LabelIcon size={args.size} color={args.color} className={args.className} />
        <span style={{ fontSize: '12px', marginTop: '8px' }}>Label Icon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <PriorityIcon size={args.size} color={args.color} className={args.className} />
        <span style={{ fontSize: '12px', marginTop: '8px' }}>Priority Icon</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <TodoIcon size={args.size} color={args.color} className={args.className} />
        <span style={{ fontSize: '12px', marginTop: '8px' }}>Todo Icon</span>
      </div>
    </div>
  ),
};

