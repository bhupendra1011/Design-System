import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Text } from "@repo/ui/text";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Present content inside an elevated container with optional metadata slots.

This component powers the Todo example in \`apps/web\`, but remains generic enough for dashboards, settings panels, or any list-based UI.

## Usage
\`\`\`tsx
import { Card } from "@repo/ui/card";

<Card title="Sketch high-fidelity mockups">
  Iterate on the onboarding flow and collect feedback from the team.
</Card>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Heading text rendered at the top of the card",
    },
    children: {
      control: "text",
      description: "Optional supporting content",
    },
    bottomIcon: {
      table: { disable: true },
    },
    rightIcon: {
      table: { disable: true },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "selected", "dragging"],
      description: "Visual variant",
    },
  },
  args: {
    title: "Design handoff prep",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "Use cards to present atomic pieces of information like todo items, notifications, or quick stats.",
  },
};

export const WithControls: Story = {
  name: "With status and action",
  render: (args) => (
    <Card {...args}>
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center px-2 py-1 text-sm font-normal rounded-md border border-transparent bg-[color-mix(in_srgb,var(--colors-button-primary)_15%,transparent)] text-[var(--colors-text-secondary)]">
          Pending
        </span>
        <Button className="!px-3 !py-1.5 text-sm">Mark Complete</Button>
      </div>
    </Card>
  ),
  args: {
    title: "Sync account preferences",
  },
};

const todoSamples = [
  {
    id: 1,
    title: "Write contributor guide",
    description: "Outline repo structure and first contribution steps.",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Review token pipeline",
    description: "Verify Style Dictionary runs for all themes.",
    status: "Pending",
  },
  {
    id: 3,
    title: "Record Storybook walkthrough",
    description: "Capture short loom showing docs setup.",
    status: "Done",
  },
];

export const TodoListMock: Story = {
  name: "Todo list example",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Snapshot of how cards appear inside the minimal Todo application. Combines Card, Button, and Text primitives.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      {todoSamples.map((item) => (
        <Card key={item.id} title={item.title}>
          <div className="flex flex-col gap-3">
            <Text variant="body">{item.description}</Text>
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center px-2 py-1 text-sm font-normal rounded-md border border-transparent bg-[color-mix(in_srgb,var(--colors-button-primary)_15%,transparent)] text-[var(--colors-text-secondary)]">
                {item.status}
              </span>
              <Button className="!px-3 !py-1.5 text-sm">
                {item.status === "Done" ? "View" : "Mark Done"}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  ),
};
