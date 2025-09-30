import "../global.css"; 
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      disable: true,
    },
    a11y: {
      config: {
        rules: [
          // custom accessibility rules
          {
            id: 'color-contrast',
            enabled: true,
          }
        ],
      },
      // Options to pass to axe-core
      options: {},
      // Manual accessibility testing
      manual: false,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      
      // Apply theme globally to both stories and docs
      if (typeof window !== 'undefined') {
        const html = document.documentElement;
        const body = document.body;
        
        // Apply to html element (where CSS variables are defined)
        html.classList.remove('light', 'dark');
        html.classList.add(theme);
        
        // Also apply to body for consistency
        body.classList.remove('light', 'dark');
        body.classList.add(theme);
        
        // Apply theme to Storybook's docs containers using design tokens
        const docsContainer = document.querySelector('.docs-story') as HTMLElement;
        if (docsContainer) {
          docsContainer.classList.remove('light', 'dark');
          docsContainer.classList.add(theme);
        }
        
        // Add global CSS using design token variables only
        let styleEl = document.getElementById('docs-theme-styles');
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'docs-theme-styles';
          document.head.appendChild(styleEl);
        }
        
        const designTokenStyles = `
          /* Apply design token backgrounds to main areas */
          body, 
          .sb-main-padded, 
          #storybook-docs {
            background-color: var(--colors-bg-app) !important; 
            color: var(--colors-text-primary) !important; 
          }
          
          /* Component preview areas use design token background but NOT text color */
          .docs-story {
            background-color: var(--colors-bg-app) !important; 
          }
          
          /* Code blocks use transparent background */
          .docblock-source, 
          .docblock-code-toggle {
            background-color: transparent !important; 
            color: inherit !important;
            border: none !important;
          }
          
          /* Code syntax highlighting */
          .docblock-source pre,
          .docblock-source code {
            background-color: transparent !important;
            color: inherit !important;
          }
        `;
        
        styleEl.textContent = designTokenStyles;
        
        // Add CSS to reduce story height in docs
        let storyHeightEl = document.getElementById('story-height-override');
        if (!storyHeightEl) {
          storyHeightEl = document.createElement('style');
          storyHeightEl.id = 'story-height-override';
          document.head.appendChild(storyHeightEl);
        }
        
        storyHeightEl.textContent = `
          .docs-story {
            min-height: 150px !important;
            height: 150px !important;
          }
          .sb-story {
            min-height: 150px !important;
            height: 150px !important;
          }
          iframe[data-is-storybook="true"] {
            height: 150px !important;
            min-height: 150px !important;
          }
        `;
      }
      
      return (
        <div className={`${theme} min-h-screen p-4`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
