import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Text } from "@repo/ui/text";

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const sampleTodo: Todo = {
  id: 1,
  title: "Review pull requests",
  description: "Triage open PRs, leave feedback, and merge the approved ones.",
  completed: false,
};

const sampleTodos: Todo[] = [
  sampleTodo,
  {
    id: 2,
    title: "Generate design tokens",
    description: "Run Style Dictionary to publish fresh light/dark variables.",
    completed: true,
  },
  {
    id: 3,
    title: "Document pattern usage",
    description: "Capture screenshots and notes for Storybook examples.",
    completed: false,
  },
];

const meta: Meta<typeof Card> = {
  title: "Examples/Todo App",
  component: Card,
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Reference implementations lifted from the minimal Todo app. Combine primitives from `@repo/ui` to ship production-ready list UIs.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TodoCard: Story = {
  name: "Todo Card",
  render: () => (
    <Card title={sampleTodo.title}>
      <div className="flex flex-col gap-3">
        <Text variant="body">{sampleTodo.description}</Text>
        <div className="flex items-center justify-between gap-3">
          <Badge>{sampleTodo.completed ? "Done" : "Pending"}</Badge>
          <Button className="!px-3 !py-1.5 text-sm">
            {sampleTodo.completed ? "View" : "Mark Complete"}
          </Button>
        </div>
      </div>
    </Card>
  ),
};

export const TodoList: Story = {
  name: "Todo List",
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      {sampleTodos.map((todo) => (
        <Card key={todo.id} title={todo.title}>
          <div className="flex flex-col gap-3">
            <Text variant="body">{todo.description}</Text>
            <div className="flex items-center justify-between gap-3">
              <Badge>{todo.completed ? "Done" : "Pending"}</Badge>
              <Button className="!px-3 !py-1.5 text-sm">
                {todo.completed ? "View" : "Mark Complete"}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  ),
};
