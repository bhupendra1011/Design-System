export default function DesignVerifyPage() {
  return (
    <div className="min-h-screen bg-[var(--colors-bg-app)] p-5">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-5">
          <h1 className="text-[length:var(--typography-font-size-title)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)] mb-2">
            Design Token Verification
          </h1>
          <p className="text-[length:var(--typography-font-size-body)] text-[var(--colors-text-secondary)]">
            This page demonstrates all design token utilities working together.
            Toggle between light and dark mode to see theme switching.
          </p>
        </header>

        {/* Main Card - Complete Example */}
        <div className="bg-[var(--colors-bg-card)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadows-modal)] border border-[var(--colors-border-card)] mb-4">
          {/* Card Header */}
          <div className="flex gap-2 items-center mb-3">
            <h2 className="text-[length:var(--typography-font-size-title)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)]">
              Design Token Example Card
            </h2>
            <span className="bg-[var(--colors-bg-badge)] text-[var(--colors-text-badge-active)] px-2 py-1 rounded-[var(--radius-card)] text-[length:var(--typography-font-size-small)] font-[var(--typography-font-weight-medium)]">
              New
            </span>
          </div>

          {/* Card Body */}
          <p className="text-[length:var(--typography-font-size-body)] font-[var(--typography-font-weight-regular)] text-[var(--colors-text-secondary)] mb-4">
            This card demonstrates all design token utilities working together.
            Notice how colors, spacing, typography, and shadows all come from
            our token system. Everything adapts automatically in dark mode.
          </p>

          {/* Tags Section */}
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="bg-[var(--colors-bg-badge)] text-[var(--colors-text-badge-active)] px-2 py-1 rounded-[var(--radius-card)] text-[length:var(--typography-font-size-small)] font-[var(--typography-font-weight-medium)]">
              React
            </span>
            <span className="bg-[var(--colors-bg-badge)] text-[var(--colors-text-badge-active)] px-2 py-1 rounded-[var(--radius-card)] text-[length:var(--typography-font-size-small)] font-[var(--typography-font-weight-medium)]">
              TypeScript
            </span>
            <span className="bg-[var(--colors-bg-badge)] text-[var(--colors-text-badge-active)] px-2 py-1 rounded-[var(--radius-card)] text-[length:var(--typography-font-size-small)] font-[var(--typography-font-weight-medium)]">
              Tailwind CSS
            </span>
            <span className="bg-[var(--colors-bg-badge)] text-[var(--colors-text-badge-active)] px-2 py-1 rounded-[var(--radius-card)] text-[length:var(--typography-font-size-small)] font-[var(--typography-font-weight-medium)]">
              Design Tokens
            </span>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-[var(--colors-border-card)]">
            <p className="text-[length:var(--typography-font-size-small)] font-[var(--typography-font-weight-regular)] text-[var(--colors-text-tertiary)]">
              Created with design tokens
            </p>
          </div>
        </div>

        {/* Color Palette Demo */}
        <div className="bg-[var(--colors-bg-card)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadows-modal)] border border-[var(--colors-border-card)] mb-4">
          <h3 className="text-[length:var(--typography-font-size-title)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)] mb-3">
            Color Utilities
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--colors-bg-app)] p-3 rounded-[var(--radius-card)] border border-[var(--colors-border-card)]">
              <p className="text-[length:var(--typography-font-size-body)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)]">bg-app</p>
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-secondary)]">Background color</p>
            </div>

            <div className="bg-[var(--colors-bg-card)] p-3 rounded-[var(--radius-card)] border border-[var(--colors-border-card)]">
              <p className="text-[length:var(--typography-font-size-body)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)]">bg-card</p>
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-secondary)]">Card background</p>
            </div>

            <div className="bg-[var(--colors-bg-badge)] p-3 rounded-[var(--radius-card)]">
              <p className="text-[length:var(--typography-font-size-body)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)]">bg-badge</p>
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-secondary)]">Badge background</p>
            </div>

            <div className="bg-[var(--colors-bg-modal)] p-3 rounded-[var(--radius-card)] border border-[var(--colors-border-card)]">
              <p className="text-[length:var(--typography-font-size-body)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)]">bg-modal</p>
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-secondary)]">Modal background</p>
            </div>
          </div>
        </div>

        {/* Spacing Demo */}
        <div className="bg-[var(--colors-bg-card)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadows-modal)] border border-[var(--colors-border-card)] mb-4">
          <h3 className="text-[length:var(--typography-font-size-title)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)] mb-3">
            Spacing Utilities
          </h3>

          <div className="flex flex-col gap-2">
            <div className="bg-[var(--colors-bg-badge)] p-[var(--spacing-gap-tiny)] rounded-[var(--radius-card)]">
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-badge-active)]">gap-tiny (2px)</p>
            </div>
            <div className="bg-[var(--colors-bg-badge)] p-[var(--spacing-gap-small)] rounded-[var(--radius-card)]">
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-badge-active)]">gap-small (6px)</p>
            </div>
            <div className="bg-[var(--colors-bg-badge)] p-[var(--spacing-gap-medium)] rounded-[var(--radius-card)]">
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-badge-active)]">gap-medium (8px)</p>
            </div>
            <div className="bg-[var(--colors-bg-badge)] p-[var(--spacing-gap-large)] rounded-[var(--radius-card)]">
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-badge-active)]">gap-large (12px)</p>
            </div>
            <div className="bg-[var(--colors-bg-badge)] p-[var(--spacing-gap-section)] rounded-[var(--radius-card)]">
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-badge-active)]">gap-section (16px)</p>
            </div>
          </div>
        </div>

        {/* Typography Demo */}
        <div className="bg-[var(--colors-bg-card)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadows-modal)] border border-[var(--colors-border-card)] mb-4">
          <h3 className="text-[length:var(--typography-font-size-title)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)] mb-3">
            Typography Utilities
          </h3>

          <div className="space-y-3">
            <div>
              <p className="text-[length:var(--typography-font-size-title)] text-[var(--colors-text-primary)]">
                font-size-title (18px) - Large headings
              </p>
            </div>

            <div>
              <p className="text-[length:var(--typography-font-size-body)] text-[var(--colors-text-primary)]">
                font-size-body (13px) - Regular body text
              </p>
            </div>

            <div>
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-primary)]">
                font-size-small (12px) - Small captions and labels
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--colors-border-card)]">
              <p className="text-[length:var(--typography-font-size-body)] font-[var(--typography-font-weight-regular)] text-[var(--colors-text-secondary)] mb-2">
                font-weight-regular (400) - Normal weight
              </p>
              <p className="text-[length:var(--typography-font-size-body)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-secondary)]">
                font-weight-medium (500) - Medium weight
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--colors-border-card)]">
              <p className="text-[length:var(--typography-font-size-body)] font-[family-name:var(--typography-font-family-primary)] text-[var(--colors-text-secondary)] mb-2">
                font-family-primary - Inter font
              </p>
              <p className="text-[length:var(--typography-font-size-body)] font-[family-name:var(--typography-font-family-secondary)] text-[var(--colors-text-secondary)]">
                font-family-secondary - Geist font
              </p>
            </div>
          </div>
        </div>

        {/* Border Radius Demo */}
        <div className="bg-[var(--colors-bg-card)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadows-modal)] border border-[var(--colors-border-card)] mb-4">
          <h3 className="text-[length:var(--typography-font-size-title)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)] mb-3">
            Border Radius Utilities
          </h3>

          <div className="flex gap-4">
            <div className="bg-[var(--colors-bg-badge)] p-4 rounded-[var(--radius-card)]">
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-badge-active)] font-[var(--typography-font-weight-medium)]">radius-card</p>
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-badge-inactive)]">4px radius</p>
            </div>

            <div className="bg-[var(--colors-bg-badge)] p-4 rounded-[var(--radius-modal)]">
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-badge-active)] font-[var(--typography-font-weight-medium)]">radius-modal</p>
              <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-badge-inactive)]">8px radius</p>
            </div>
          </div>
        </div>

        {/* Shadow Demo */}
        <div className="bg-[var(--colors-bg-card)] rounded-[var(--radius-card)] p-4 border border-[var(--colors-border-card)] mb-4">
          <h3 className="text-[length:var(--typography-font-size-title)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)] mb-3">
            Shadow Utilities
          </h3>

          <div className="bg-[var(--colors-bg-app)] p-5 rounded-[var(--radius-modal)] shadow-[var(--shadows-modal)]">
            <p className="text-[length:var(--typography-font-size-body)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)] mb-1">
              shadow-modal
            </p>
            <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-secondary)]">
              Large shadow for modal dialogs
            </p>
          </div>
        </div>

        {/* Combined Example */}
        <div className="bg-[var(--colors-bg-modal)] rounded-[var(--radius-modal)] p-5 shadow-[var(--shadows-modal)] border border-[var(--colors-border-card)]">
          <h3 className="text-[length:var(--typography-font-size-title)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)] mb-3">
            All Utilities Combined
          </h3>

          <div className="bg-[var(--colors-bg-card)] rounded-[var(--radius-card)] p-4 mb-3">
            <h4 className="text-[length:var(--typography-font-size-body)] font-[var(--typography-font-weight-medium)] text-[var(--colors-text-primary)] mb-2">
              Feature Card
            </h4>
            <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-secondary)] mb-3">
              This demonstrates multiple utilities working together seamlessly.
            </p>

            <div className="flex gap-2 flex-wrap">
              <span className="bg-[var(--colors-button-primary)] text-[var(--colors-button-text)] px-3 py-1 rounded-[var(--radius-card)] text-[length:var(--typography-font-size-small)] font-[var(--typography-font-weight-medium)]">
                Primary
              </span>
              <span className="bg-[var(--colors-bg-badge)] text-[var(--colors-text-badge-active)] px-3 py-1 rounded-[var(--radius-card)] text-[length:var(--typography-font-size-small)]">
                Active
              </span>
              <span className="bg-[var(--colors-bg-badge)] text-[var(--colors-text-badge-inactive)] px-3 py-1 rounded-[var(--radius-card)] text-[length:var(--typography-font-size-small)]">
                Inactive
              </span>
            </div>
          </div>

          <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-muted)] font-[var(--typography-font-weight-regular)]">
            All colors, spacing, typography, borders, and shadows use design tokens
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-5 pt-4 border-t border-[var(--colors-border-card)] text-center">
          <p className="text-[length:var(--typography-font-size-small)] text-[var(--colors-text-tertiary)]">
            Design Token System • Powered by Style Dictionary & Tailwind CSS v4
          </p>
        </footer>
      </div>
    </div>
  );
}
