import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { Input, type InputProps } from '@pd/ui/input';

const meta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input as React.ComponentType<InputProps>,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The Input component provides text input functionality for forms.

## Usage
\`\`\`tsx
import { Input } from "@pd/ui/input";

// Basic input
<Input label="Name" placeholder="Enter your name" />

// Disabled input
<Input 
  label="Issue Title"
  placeholder="Enter issue title"
  value="Cannot edit this field"
  disabled 
/>
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "textarea"],
      description: "The type of input field",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text" },
      },
    },
    label: {
      control: { type: "text" },
      description: "Label text for the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text shown when input is empty",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    value: {
      control: { type: "text" },
      description: "Current value of the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the input is required",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    rows: {
      control: { type: "number" },
      description: "Number of rows for textarea (only applies to textarea type)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "4" },
      },
    },
    className: {
      table: { disable: true },
      control: false,
    },
    leftIcon: {
      table: { disable: true },
      control: false,
    },
    rightIcon: {
      table: { disable: true },
      control: false,
    },
  },
  args: {
    type: 'text',
    label: 'Label',
    placeholder: 'Enter text...',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Issue Title',
    placeholder: 'Enter issue title',
    value: 'Sample issue title',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Issue Title',
    placeholder: 'Enter issue title',
    value: 'Cannot edit this field',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    type: 'text',
    required: true,
  },
};



export const Textarea: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description',
    type: 'textarea',
    rows: 4,
  },
};








