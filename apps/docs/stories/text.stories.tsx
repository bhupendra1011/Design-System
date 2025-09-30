import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@pd/ui/text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Typography component with semantic flexibility and predefined variants using design tokens.

## Usage

\`\`\`tsx
import { Text } from '@pd/ui/text';

// Basic text with default body variant
<Text>Default body text</Text>

// Heading with title variant
<Text as="h1" variant="title">Page Title</Text>

// Form label with proper semantics
<Text as="label" variant="label" htmlFor="username">Username</Text>

// Custom styling with Tailwind classes
<Text variant="body" className="text-red-500 font-bold">Error message</Text>

// Small helper text
<Text variant="small">Additional information</Text>
\`\`\`

## Props

### \`variant\` - Typography Styles
Controls the visual appearance using design tokens:

- **\`title\`**: 18px, medium weight (500), primary color - Use for modal header ex: Issue title
- **\`body\`**: 13px, regular weight (400), secondary color - Use for issue card title 
- **\`small\`**: 12px, regular weight (400), muted color - Use for fig in cards : FIG-2,FIG-3
- **\`label\`**: 13px, medium weight (500), primary color - Use for issue column like  Backlog,In Progress ToDO etc...
- **\`placeholder\`**: 13px, regular weight (400), placeholder color - Use for placeholder for new issue input box

### \`as\` - Semantic HTML Element
Renders the text as the specified HTML element for proper semantics:

- **\`p\`** (default): Paragraph text
- **\`span\`**: Inline text
- **\`h1\`, \`h2\`, \`h3\`, \`h4\`, \`h5\`, \`h6\`**: Heading elements
- **\`label\`**: Form labels (use with \`htmlFor\` prop)

### \`className\` - Custom Styling
Add Tailwind CSS classes for custom styling. Text color classes will override variant colors:

- **Color override**: \`text-red-500\`, \`text-blue-600\` - Overrides variant color
- **Additional styles**: \`uppercase\`, \`animate-pulse\` - Supplements variant styles
- **Layout**: \`block\`, \`inline-block\`, \`truncate\` - Controls text layout

## Examples

### Form Labels
\`\`\`tsx
<div>
  <Text as="label" variant="label" htmlFor="issueText">Enter Your Issue</Text>
  <input id="issueText" type="text" />
  <Text variant="small">Issue Description ...</Text>
</div>
\`\`\`

### Heading Hierarchy
\`\`\`tsx
<article>
  <Text as="h1" variant="title">Article Title</Text>
  <Text as="h2" variant="title" className="text-base">Section Heading</Text>
  <Text variant="body">Article content goes here...</Text>
</article>
\`\`\`

### Status Messages
\`\`\`tsx
<Text variant="body" className="text-green-600">✓ Success message</Text>
<Text variant="body" className="text-red-600">✗ Error message</Text>
<Text variant="small" className="text-yellow-600">⚠ Warning message</Text>
\`\`\`


        `,
      },
    },
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'],
      description: 'HTML element to render for semantic meaning',
      table: {
        type: { summary: 'TextElement' },
        defaultValue: { summary: 'p' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['title', 'body', 'small', 'label', 'placeholder'],
      description: 'Typography style using design tokens (size, weight, color)',
      table: {
        type: { summary: 'TextVariant' },
        defaultValue: { summary: 'body' },
      },
    },
    children: {
      control: 'text',
      description: 'Text content to display',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Tailwind CSS classes. Text colors override variant colors.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    children: 'Sample text content',
    variant: 'body',
    as: 'p',
    className: 'text-primary',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is default body text',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: {
    docs: {
      description: {
        story: 'Overview of all available typography variants with their design token styles.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <Text variant="title">Title variant</Text>
        <Text variant="small" className="text-gray-500">18px, medium weight, primary color</Text>
      </div>
      <div>
        <Text variant="body">Body variant</Text>
        <Text variant="small" className="text-gray-500">13px, regular weight, secondary color</Text>
      </div>
      <div>
        <Text variant="small">Small variant</Text>
        <Text variant="small" className="text-gray-500">12px, regular weight, muted color</Text>
      </div>
      <div>
        <Text variant="label">Label variant</Text>
        <Text variant="small" className="text-gray-500">13px, medium weight, primary color</Text>
      </div>
      <div>
        <Text variant="placeholder">Placeholder variant</Text>
        <Text variant="small" className="text-gray-500">13px, regular weight, placeholder color</Text>
      </div>
    </div>
  ),
};