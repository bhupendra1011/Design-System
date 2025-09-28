import "../global.css"; 
import type { Preview } from '@storybook/react';
import React from 'react';

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
        
        // Apply background color directly to the body based on theme
        if (theme === 'dark') {
          body.style.backgroundColor = '#1f2937';
          body.style.color = '#f9fafb';
        } else {
          body.style.backgroundColor = '#ffffff';
          body.style.color = '#111827';
        }
        
        // Apply theme to Storybook's docs containers
        const docsContainer = document.querySelector('.docs-story') as HTMLElement;
        if (docsContainer) {
          docsContainer.classList.remove('light', 'dark');
          docsContainer.classList.add(theme);
        }
        
        // Apply to the main docs content area
        const sbMainPadded = document.querySelector('.sb-main-padded') as HTMLElement;
        if (sbMainPadded) {
          if (theme === 'dark') {
            sbMainPadded.style.backgroundColor = '#1f2937';
            sbMainPadded.style.color = '#f9fafb';
          } else {
            sbMainPadded.style.backgroundColor = '#ffffff';
            sbMainPadded.style.color = '#111827';
          }
        }
        
        // Also target the docs content wrapper
        const docsContent = document.querySelector('#storybook-docs') as HTMLElement;
        if (docsContent) {
          if (theme === 'dark') {
            docsContent.style.backgroundColor = '#1f2937';
            docsContent.style.color = '#f9fafb';
          } else {
            docsContent.style.backgroundColor = '#ffffff';
            docsContent.style.color = '#111827';
          }
        }
        
        // Target the main Storybook panel
        const storybookPanel = document.querySelector('#storybook-preview-wrapper') as HTMLElement;
        if (storybookPanel) {
          if (theme === 'dark') {
            storybookPanel.style.backgroundColor = '#1f2937';
          } else {
            storybookPanel.style.backgroundColor = '#ffffff';
          }
        }
        
        // Add global CSS for docs theming
        let styleEl = document.getElementById('docs-theme-styles');
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'docs-theme-styles';
          document.head.appendChild(styleEl);
        }
        
        const darkStyles = `
          .docs-story { background-color: #1f2937 !important; color: #f9fafb !important; }
          .sb-main-padded { background-color: #1f2937 !important; color: #f9fafb !important; }
          .docblock-source { background-color: #374151 !important; }
          .docblock-code-toggle { background-color: #374151 !important; color: #f9fafb !important; }
        `;
        
        const lightStyles = `
          .docs-story { background-color: #ffffff !important; color: #111827 !important; }
          .sb-main-padded { background-color: #ffffff !important; color: #111827 !important; }
          .docblock-source { background-color: #f3f4f6 !important; }
          .docblock-code-toggle { background-color: #f3f4f6 !important; color: #111827 !important; }
        `;
        
        styleEl.textContent = theme === 'dark' ? darkStyles : lightStyles;
        
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
        <div className={`${theme} min-h-screen`}>
          <div className="bg-primary text-body min-h-screen p-4">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
