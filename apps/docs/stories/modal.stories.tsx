import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Modal, type ModalProps } from "@repo/ui/modal";
import { Button } from "@repo/ui/button";

const meta: Meta<ModalProps> = {
  title: "Components/Modal",
  component: Modal as React.ComponentType<ModalProps>,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `The Modal component provides an overlay dialog for displaying content above the main page.

## Usage
\`\`\`tsx
import { Modal } from "@repo/ui/modal";
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
  tags: ["autodocs"],
  args: {
    className: "",
    overlayClassName: "",
    closeOnBackdropClick: true,
    title: "Default Modal",
    children: "This is a simple modal with some content.",
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

function ModalDemo({
  title,
  children,
  ...args
}: ModalDemoProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </Button>
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
      <p>This is a simple modal with default styling from design tokens.</p>
      <p
        style={{
          marginTop: "12px",
          fontSize: "13px",
          color: "var(--colors-text-secondary)",
        }}
      >
        Uses standard background, border, shadow, and spacing from the design
        system.
      </p>
    </ModalDemo>
  ),
};

export const CustomCSS: Story = {
  args: {
    className: "gradient-modal shadow-2xl border-2 border-purple-500",
    overlayClassName:
      "backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-pink-500/20",
  },
  render: (args) => (
    <>
      <style>{`
        .gradient-modal {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 20px;
          max-width: 500px;
        }
        .gradient-modal h2 {
          color: white !important;
        }
      `}</style>
      <ModalDemo {...args} title="Custom Styled Modal">
        <p>This modal demonstrates custom styling with:</p>

        <p style={{ fontSize: "13px", opacity: 0.9 }}>
          Edit these values in Storybook controls to see changes in real-time!
        </p>
      </ModalDemo>
    </>
  ),
};
