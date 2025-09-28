	import type { Meta, StoryObj } from "@storybook/react";
	import { Button } from "@pd/ui/button";
	const meta: Meta<typeof Button> = {
	  title: "Components/Button",
	  component: Button,
	  tags: ["autodocs"],
	  parameters: {
	    docs: {
	      description: {
	        component: `The Button component is an interactive element used throughout the design system.

## Usage
\`\`\`tsx
import { Button } from "@pd/ui/button";

<Button>Click me</Button>
\`\`\``,
	      },
	      story: {
	        height: '200px',
	      },
	    },
	  },
	  argTypes: {
	    children: {
	      control: { type: "text" },
	      description: "The content to display inside the button (text, icons, etc.)",
	      name: "Text",
	      table: {
	        type: { summary: "React.ReactNode" },
	        defaultValue: { summary: "undefined" },
	      },
	    },
	    className: {
	      table: { disable: true },
	      control: false,
	    },
	    onClick: {
	      action: "clicked",
	      description: "Click handler function",
	      table: {
	        type: { summary: "() => void" },
	      },
	    },
	  },
	  args: {
	    children: "Button",
	    className: "",
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
	    className: "",
	  },
};