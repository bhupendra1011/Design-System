	import type { Meta, StoryObj } from "@storybook/react";
	import { Button } from "@pd/ui/button";
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
	} from "@pd/icons";

	// Icon selection options for Storybook controls
	const iconOptions = {
	  none: null,
	  assignee: <AssigneeIcon size={16} />,
	  backlog: <BacklogIcon size={16} />,
	  canceled: <CanceledIcon size={16} />,
	  close: <CloseIcon size={16} />,
	  done: <DoneIcon size={16} />,
	  expand: <ExpandIcon size={16} />,
	  inprogress: <InprogressIcon size={16} />,
	  label: <LabelIcon size={16} />,
	  priority: <PriorityIcon size={16} />,
	  todo: <TodoIcon size={16} />,
	};

	const iconNames = Object.keys(iconOptions);

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
import { PriorityIcon } from "@pd/icons";

// Basic button
<Button>Click me</Button>

// Button with icon
<Button leftIcon={<PriorityIcon />}>
  Priority Task
</Button>

// Button with custom icon props
<Button leftIcon={<PriorityIcon size={18} className="text-orange-500" />}>
  High Priority
</Button>
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
	    variant: {
	      control: { type: "select" },
	      options: ["primary", "outline"],
	      description: "Button visual style variant",
	      table: {
	        type: { summary: "'primary' | 'outline'" },
	        defaultValue: { summary: "'primary'" },
	      },
	    },
	    disabled: {
	      control: { type: "boolean" },
	      description: "Whether the button is disabled",
	      table: {
	        type: { summary: "boolean" },
	        defaultValue: { summary: "false" },
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
	    leftIcon: {
	      control: { type: "select" },
	      options: iconNames,
	      mapping: iconOptions,
	      description: "Icon to display at the start of the button",
	      table: {
	        type: { summary: "React.ReactElement" },
	        defaultValue: { summary: "null" },
	      },
	    },
	  },
	  args: {
	    children: "Button",
	    className: "",
	  },
	};
	export default meta;
	type Story = StoryObj<any>;
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
export const WithIcon: Story = {
  name: "With Icon",
  args: {
    children: "Priority Task",
	leftIcon: <PriorityIcon size={18} className="text-gray-300" />,
    className: "",
  },
};

export const Disabled: Story = {
  name: "Disabled",
  args: {
    children: "Disabled Button",
    disabled: true,
    className: "",
  },
};

export const AllVariants: Story = {
  name: "All Variants", 
  render: () => (
    <div className="space-y-4 p-4">
      <div className="flex gap-4 items-center">
        <Button variant="primary">Primary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="primary" leftIcon={<PriorityIcon size={16} />}>
          Primary with Icon
        </Button>
        <Button variant="outline" leftIcon={<CloseIcon size={16} />}>
          Outline with Icon
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="primary" disabled>Primary Disabled</Button>
        <Button variant="outline" disabled>Outline Disabled</Button>
        <Button variant="primary" leftIcon={<PriorityIcon size={16} />} disabled>
          Primary with Icon Disabled
        </Button>
        <Button variant="outline" leftIcon={<CloseIcon size={16} />} disabled>
          Outline with Icon Disabled
        </Button>
      </div>
    </div>
  ),
};


