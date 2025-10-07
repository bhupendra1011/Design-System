export default function DesignVerifyPage() {
  return (
    <div className="min-h-screen bg-app p-5">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-5">
          <h1 className="text-title font-medium text-primary mb-2">
            Design Token Verification
          </h1>
          <p className="text-body text-secondary">
            This page demonstrates all design token utilities working together.
            Toggle between light and dark mode to see theme switching.
          </p>
        </header>

        {/* Main Card - Complete Example */}
        <div className="bg-card rounded-card p-4 shadow-modal border border-card mb-4">
          {/* Card Header */}
          <div className="flex gap-2 items-center mb-3">
            <h2 className="text-title font-medium text-primary">
              Design Token Example Card
            </h2>
            <span className="bg-badge text-badge-active px-2 py-1 rounded-card text-small font-medium">
              New
            </span>
          </div>

          {/* Card Body */}
          <p className="text-body font-regular text-secondary mb-4">
            This card demonstrates all design token utilities working together.
            Notice how colors, spacing, typography, and shadows all come from
            our token system. Everything adapts automatically in dark mode.
          </p>

          {/* Tags Section */}
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="bg-badge text-badge-active px-2 py-1 rounded-card text-small font-medium">
              React
            </span>
            <span className="bg-badge text-badge-active px-2 py-1 rounded-card text-small font-medium">
              TypeScript
            </span>
            <span className="bg-badge text-badge-active px-2 py-1 rounded-card text-small font-medium">
              Tailwind CSS
            </span>
            <span className="bg-badge text-badge-active px-2 py-1 rounded-card text-small font-medium">
              Design Tokens
            </span>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-card">
            <p className="text-small font-regular text-tertiary">
              Created with design tokens 
            </p>
          </div>
        </div>

        {/* Color Palette Demo */}
        <div className="bg-card rounded-card p-4 shadow-modal border border-card mb-4">
          <h3 className="text-title font-medium text-primary mb-3">
            Color Utilities
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-app p-3 rounded-card border border-card">
              <p className="text-body font-medium text-primary">bg-app</p>
              <p className="text-small text-secondary">Background color</p>
            </div>

         

            <div className="bg-badge p-3 rounded-card">
              <p className="text-body font-medium text-primary">bg-badge</p>
              <p className="text-small text-secondary">Badge background</p>
            </div>

        
          </div>
        </div>

        {/* Spacing Demo */}
        <div className="bg-card rounded-card p-4 shadow-modal border border-card mb-4">
          <h3 className="text-title font-medium text-primary mb-3">
            Spacing Utilities
          </h3>

          <div className="flex flex-col gap-2">
            <div className="bg-badge p-1 rounded-card">
              <p className="text-small text-badge-active">p-1 (2px padding)</p>
            </div>
            <div className="bg-badge p-2 rounded-card">
              <p className="text-small text-badge-active">p-2 (6px padding)</p>
            </div>
            <div className="bg-badge p-3 rounded-card">
              <p className="text-small text-badge-active">p-3 (8px padding)</p>
            </div>
            <div className="bg-badge p-4 rounded-card">
              <p className="text-small text-badge-active">p-4 (12px padding)</p>
            </div>
            <div className="bg-badge p-5 rounded-card">
              <p className="text-small text-badge-active">p-5 (16px padding)</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-body text-secondary mb-2">Gap utilities:</p>
            <div className="flex gap-1">
              <div className="bg-badge px-3 py-2 rounded-card text-small text-badge-active font-medium">gap-1</div>
              <div className="bg-badge px-3 py-2 rounded-card text-small text-badge-active font-medium">2px</div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="bg-badge px-3 py-2 rounded-card text-small text-badge-active font-medium">gap-2</div>
              <div className="bg-badge px-3 py-2 rounded-card text-small text-badge-active font-medium">6px</div>
            </div>
            <div className="flex gap-3 mt-2">
              <div className="bg-badge px-3 py-2 rounded-card text-small text-badge-active font-medium">gap-3</div>
              <div className="bg-badge px-3 py-2 rounded-card text-small text-badge-active font-medium">8px</div>
            </div>
          </div>
        </div>

        {/* Typography Demo */}
        <div className="bg-card rounded-card p-4 shadow-modal border border-card mb-4">
          <h3 className="text-title font-medium text-primary mb-3">
            Typography Utilities
          </h3>

          <div className="space-y-3">
            <div>
              <p className="text-title text-primary">
                text-title (18px) - Large headings
              </p>
            </div>

            <div>
              <p className="text-body text-primary">
                text-body (13px) - Regular body text
              </p>
            </div>

            <div>
              <p className="text-small text-primary">
                text-small (12px) - Small captions and labels
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-card">
              <p className="text-body font-regular text-secondary mb-2">
                font-regular (400) - Normal weight
              </p>
              <p className="text-body font-medium text-secondary">
                font-medium (500) - Medium weight
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-card">
              <p className="text-body font-primary text-secondary mb-2">
                font-primary - Inter font family
              </p>
              <p className="text-body font-secondary text-secondary">
                font-secondary - Geist font family
              </p>
            </div>
          </div>
        </div>

        {/* Border Radius Demo */}
        <div className="bg-card rounded-card p-4 shadow-modal border border-card mb-4">
          <h3 className="text-title font-medium text-primary mb-3">
            Border Radius Utilities
          </h3>

          <div className="flex gap-4">
            <div className="bg-badge p-4 rounded-card">
              <p className="text-small text-badge-active font-medium">rounded-card</p>
              <p className="text-small text-badge-inactive">4px radius</p>
            </div>

            <div className="bg-badge p-4 rounded-modal">
              <p className="text-small text-badge-active font-medium">rounded-modal</p>
              <p className="text-small text-badge-inactive">8px radius</p>
            </div>
          </div>
        </div>

        {/* Shadow Demo */}
        <div className="bg-card rounded-card p-4 border border-card mb-4">
          <h3 className="text-title font-medium text-primary mb-3">
            Shadow Utilities
          </h3>

          <div className="bg-app p-5 rounded-modal shadow-modal">
            <p className="text-body font-medium text-primary mb-1">
              shadow-modal
            </p>
            <p className="text-small text-secondary">
              Large shadow for modal dialogs
            </p>
          </div>
        </div>

        {/* Combined Example */}
        <div className="bg-modal rounded-modal p-5 shadow-modal border border-card">
          <h3 className="text-title font-medium text-primary mb-3">
            All Utilities Combined
          </h3>

          <div className="bg-card rounded-card p-4 mb-3">
            <h4 className="text-body font-medium text-primary mb-2">
              Feature Card
            </h4>
            <p className="text-small text-secondary mb-3">
              This demonstrates multiple utilities working together seamlessly.
            </p>

            <div className="flex gap-2 flex-wrap">
              <span className="bg-primary text-app px-3 py-1 rounded-card text-small font-medium">
                Primary
              </span>
              <span className="bg-badge text-badge-active px-3 py-1 rounded-card text-small">
                Badge
              </span>
              <span className="bg-badge text-badge-inactive px-3 py-1 rounded-card text-small">
                Inactive
              </span>
            </div>
          </div>

          <p className="text-small text-muted font-regular">
            All colors, spacing, typography, borders, and shadows use design tokens
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-5 pt-4 border-t border-card text-center">
          <p className="text-small text-tertiary">
            Design Token System • Powered by Style Dictionary & Tailwind CSS v4
          </p>
        </footer>
      </div>
    </div>
  );
}
