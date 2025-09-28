import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@pd/ui/button";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    children: {
      control: { type: "text" },
      description: "Button text content",
      name: "Text",
    },
  },
  args: {
    children: "Button",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: "Button",
  args: {
    children: "Click me",
  },
};

