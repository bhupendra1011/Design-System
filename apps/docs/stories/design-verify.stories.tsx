import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@repo/ui/text";

const colorSwatches = [
  { label: "App Background", className: "bg-app text-primary border border-app" },
  { label: "Card Background", className: "bg-card text-primary border border-card" },
  { label: "Badge", className: "bg-badge text-badge-active border border-badge" },
  { label: "Primary Button", className: "bg-primary text-card border border-primary" },
  { label: "Placeholder", className: "bg-placeholder text-primary border border-placeholder" },
];

const spacingSamples = [
  { label: "spacing-1", className: "p-1" },
  { label: "spacing-2", className: "p-2" },
  { label: "spacing-3", className: "p-3" },
  { label: "spacing-4", className: "p-4" },
  { label: "spacing-5", className: "p-5" },
];

const typographySamples = [
  { label: "Title", className: "text-title font-medium" },
  { label: "Body", className: "text-body" },
  { label: "Small", className: "text-small" },
];

const meta: Meta = {
  title: "Foundations/Design Verify",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Quick visual sweep of generated utilities from Style Dictionary. Useful when validating light/dark tokens or testing custom themes.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TokenShowcase: Story = {
  render: () => (
    <div className="min-h-[70vh] bg-app px-8 py-10 text-primary">
      <section className="mb-10 space-y-3">
        <Text as="h2" variant="title" className="text-primary">
          Color tokens
        </Text>
        <div className="grid gap-4 md:grid-cols-3">
          {colorSwatches.map((swatch) => (
            <div
              key={swatch.label}
              className={`${swatch.className} rounded-card p-4 shadow-modal`}
            >
              <Text variant="label">{swatch.label}</Text>
              <Text variant="small" className="text-secondary">
                {swatch.className}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 space-y-3">
        <Text as="h2" variant="title" className="text-primary">
          Spacing scale
        </Text>
        <div className="flex flex-col gap-3">
          {spacingSamples.map((sample) => (
            <div key={sample.label} className="flex items-center gap-4">
              <Text variant="body" className="w-32">
                {sample.label}
              </Text>
              <div className={`flex-1 rounded-card border border-card bg-card shadow-modal ${sample.className}`}>
                <div
                  className="h-3 rounded-card"
                  style={{ backgroundColor: "var(--colors-button-primary)", opacity: 0.25 }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <Text as="h2" variant="title" className="text-primary">
          Typography presets
        </Text>
        <div className="space-y-2 rounded-card bg-card p-6 shadow-modal">
          {typographySamples.map((sample) => (
            <div key={sample.label} className="space-y-1">
              <Text variant="small" className="uppercase tracking-wide text-secondary">
                {sample.label}
              </Text>
              <p className={sample.className}>
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
