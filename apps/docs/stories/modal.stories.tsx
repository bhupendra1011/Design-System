import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal, type ModalProps } from '@pd/ui/modal';
import { Button } from '@pd/ui/button';

const meta: Meta<ModalProps> = {
  title: 'Components/Modal',
  component: Modal as React.ComponentType<ModalProps>,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The Modal component provides an overlay dialog for displaying content above the main page.

## Usage
\`\`\`tsx
import { Modal } from "@pd/ui/modal";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
      >
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    className: '',
    overlayClassName: '',
    closeOnBackdropClick: true,
    title: 'Default Modal',
    children: 'This is a simple modal with some content.',
  },
  argTypes: {
    children: {
      control: { type: "text" },
      description: "The content to display inside the modal",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    title: {
      control: { type: "text" },
      description: "Optional title for the modal header",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    isOpen: {
      control: { type: "boolean" },
      description: "Controls whether the modal is visible",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    closeOnBackdropClick: {
      control: { type: "boolean" },
      description: "Whether clicking the backdrop closes the modal",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    onClose: {
      action: "onClose",
      description: "Function called when the modal should close",
      table: {
        type: { summary: "() => void" },
      },
    },
    className: {
      control: { type: "text" },
      description: "CSS class name for the modal content container",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    overlayClassName: {
      control: { type: "text" },
      description: "CSS class name for the modal overlay/backdrop",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface ModalDemoProps {
  title?: string;
  children: React.ReactNode;
  closeOnBackdropClick?: boolean;
  overlayClassName?: string;
  className?: string;
}

function ModalDemo({ title, children, ...args }: ModalDemoProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => {
        setIsOpen(true);
      }}>Open Modal</Button>
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title={title}
      >
        {children}
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: (args) => (
    <ModalDemo {...args} title="Default Modal">
      <p>This is a simple modal with some content.</p>
    </ModalDemo>
  ),
};

export const NoBackdropClose: Story = {
  render: (args) => (
    <ModalDemo {...args} closeOnBackdropClick={false} title="Important Notice">
      <p>This modal cannot be closed by clicking the backdrop. You must use the close button or press Escape.</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button>Ok</Button>
      </div>
    </ModalDemo>
  ),
};

export const WithTailwindClasses: Story = {
  render: (args) => (
    <ModalDemo {...args} className="bg-red-500 border-4 border-yellow-400 max-w-lg" overlayClassName="bg-blue-500/30" title="Tailwind Classes">
      <p className="text-white">This modal demonstrates Tailwind class overrides:</p>
      <ul className="text-white space-y-2">
        <li><strong>overlayClassName:</strong> <code>bg-blue-500/30</code> (blue backdrop)</li>
        <li><strong>className:</strong> <code>bg-red-500 border-4 border-yellow-400 max-w-lg</code></li>
      </ul>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button>Close</Button>
      </div>
    </ModalDemo>
  ),
};

export const WithCustomCSS: Story = {
  render: (args) => (
    <>
      <style>{`
        .gradient-overlay {
          background: linear-gradient(45deg, rgba(255,0,150,0.3), rgba(0,255,255,0.3));
        }
        .gradient-modal {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 20px;
          border: 3px solid #fff;
        }
      `}</style>
      <ModalDemo {...args} className="gradient-modal" overlayClassName="gradient-overlay" title="Custom CSS">
        <p>This modal uses custom CSS classes:</p>
        <ul className="space-y-2">
          <li><strong>overlayClassName:</strong> Gradient backdrop</li>
          <li><strong>className:</strong> Gradient background with custom styling</li>
        </ul>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button>Close</Button>
        </div>
      </ModalDemo>
    </>
  ),
};