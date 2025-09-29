# Implementation Steps

This document provides detailed, step-by-step instructions for implementing the design system and issues tracker. Follow each step sequentially.

## Project Structure Overview

```
design-system/
├── apps/
│   ├── docs/                       # 📖 Storybook documentation site
│   │   ├── .storybook/             # Storybook configuration
│   │   ├── stories/                # Component stories
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── issues-app/                 # 🎯 Main Next.js issues tracker
│       ├── src/
│       │   ├── app/                # Next.js App Router
│       │   ├── components/         # App-specific components
│       │   └── lib/                # Utilities and types
│       ├── package.json
│       └── next.config.ts
├── packages/
│   ├── design-tokens/              # 🎨 Design tokens (NEW)
│   │   ├── tokens/
│   │   │   ├── core/              # Primitive tokens (colors, typography, spacing)
│   │   │   └── semantic/          # Theme tokens (light.json, dark.json)
│   │   ├── style-dictionary.config.js
│   │   └── package.json
│   ├── ui/                         # 🧩 React component library
│   │   ├── src/                   # Component source files
│   │   ├── dist/                  # Built components
│   │   ├── package.json
│   │   └── tsup.config.ts
│   ├── eslint-config/              # 📋 Shared ESLint rules
│   └── typescript-config/          # ⚙️ Shared TypeScript configs
├── turbo.json                      # Turborepo configuration
├── pnpm-workspace.yaml             # Workspace configuration
├── package.json                    # Root package file
├── project_architecture.md         # Architecture documentation
└── steps.md                        # This file
```

## Complete Package List

### Phase 1: Design Tokens Package
```json
{
  "devDependencies": {
    "style-dictionary": "^4.0.1",
    "typescript": "5.5.4"
  }
}
```

### Phase 2: UI Package Enhancement
```json
{
  "dependencies": {
    "clsx": "^2.1.0"
  }
}
```

### Phase 3: Core Components (YOU WILL ADD)
```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-avatar": "^1.0.4",
    "react-hook-form": "^7.48.2",
    "@hookform/resolvers": "^3.3.2",
    "zod": "^3.22.4"
  }
}
```

### Phase 4: Issues Application
```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "nuqs": "^1.15.0",
    "lucide-react": "^0.294.0"
  }
}
```

### Phase 5: Testing & Quality
```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@storybook/addon-a11y": "^7.6.3",
    "@axe-core/playwright": "^4.8.2",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.1.2"
  }
}
```

## Prerequisites

**⚠️ IMPORTANT: You already have a working Turborepo setup. DO NOT run `npm init` or recreate the project.**

Ensure you have:
- Node.js 18+ installed
- pnpm 8+ installed (`npm install -g pnpm`)
- Git configured
- **Existing project structure** (apps/docs, apps/issues-app, packages/ui, etc.)

## Phase 1: Design Tokens Package Setup

### Step 1.1: Create Design Tokens Package Structure

```bash
# From project root
mkdir -p packages/design-tokens/src packages/design-tokens/tokens/core packages/design-tokens/tokens/semantic
cd packages/design-tokens
```

### Step 1.2: Initialize Package

Create `packages/design-tokens/package.json`:
```json
{
  "name": "@pd/design-tokens",
  "version": "0.0.0",
  "private": true,
  "sideEffects": false,
  "type": "module",
  "exports": {
    "./tokens.css": "./dist/css/tokens.css",
    "./tailwind.config": "./dist/js/tailwind.config.js",
    "./types": "./dist/types/index.ts"
  },
  "scripts": {
    "build": "style-dictionary build && tsc",
    "dev": "style-dictionary build --watch",
    "clean": "rm -rf dist .turbo"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "style-dictionary": "^4.0.1",
    "typescript": "5.5.4"
  }
}
```

### Step 1.3: Install Style Dictionary and Dependencies

Style Dictionary transforms design tokens into CSS variables, JavaScript objects, and TypeScript types.

```bash
# From packages/design-tokens directory
cd packages/design-tokens
pnpm install
```

**What gets installed:**
- `style-dictionary@^4.0.1` - Core token transformation engine
- `typescript@5.5.4` - For TypeScript type generation
- Workspace dependencies for linting and TypeScript config

**Verification:**
```bash
# Check if Style Dictionary CLI is available
npx style-dictionary --version
```

### Step 1.4: TypeScript Configuration

Create `packages/design-tokens/tsconfig.json` for TypeScript type generation:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist/types",
    "rootDir": "./tokens"
  },
  "include": ["tokens/**/*", "src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

**Configuration purpose:**
- `"extends"` - Inherits base TypeScript config from workspace
- `"outDir": "./dist/types"` - Generated types go to dist/types (matches package.json export)
- `"rootDir": "./tokens"` - Primary source is tokens/ directory structure
- `"include"` - Compile tokens/ (JSON files) and src/ (TypeScript files) if any
- `"exclude"` - Skip dist and node_modules during compilation

### Step 1.5: ESLint Configuration

Set up code linting to maintain consistent code quality in any JavaScript/TypeScript files we create for the design tokens package.

Create `packages/design-tokens/.eslintrc.js`:
```js
module.exports = {
  extends: ["@repo/eslint-config/library.js"],
};
```

**Purpose of this step:**
- **Code quality** - Ensures consistent JavaScript/TypeScript code style
- **Library standards** - Uses shared library-specific ESLint rules from workspace
- **Future-proofing** - Ready for any JS/TS utility files you might add later
- **Monorepo consistency** - Follows the same linting standards as other packages

**Note**: While design tokens are primarily JSON files, this configuration will lint any JavaScript files like the upcoming `style-dictionary.config.js` and any TypeScript utility files.

### Step 1.6: Style Dictionary Configuration

Configure Style Dictionary to transform your design tokens into multiple output formats for different use cases.

Create `packages/design-tokens/style-dictionary.config.js`:
```js
import StyleDictionary from 'style-dictionary';

const config = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: ':root'
          }
        }
      ]
    },
    tailwind: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        {
          destination: 'tailwind.config.js',
          format: 'javascript/es6',
          filter: {
            attributes: {
              category: 'color'
            }
          }
        }
      ]
    },
    typescript: {
      transformGroup: 'js',
      buildPath: 'dist/types/',
      files: [
        {
          destination: 'index.ts',
          format: 'typescript/es6-declarations'
        }
      ]
    }
  }
};

export default config;
```

**Why multiple output formats:**

**1. CSS Variables (`dist/css/tokens.css`)**
- **Purpose**: Runtime theme switching and direct CSS usage
- **Usage**: `import '@pd/design-tokens/tokens.css'`
- **Output**: `:root { --dark-text-primary: #EEEFFC; }`
- **Benefits**: Works with any CSS, enables runtime theme switching

**2. Tailwind Config (`dist/js/tailwind.config.js`)**
- **Purpose**: Integrate design tokens into Tailwind CSS utility classes
- **Usage**: `extends: ['@pd/design-tokens/tailwind.config']` in tailwind.config.js
- **Output**: Tailwind theme object with your colors
- **Benefits**: Type-safe utility classes like `bg-text-primary`, `text-gray-500`

**3. TypeScript Types (`dist/types/index.ts`)**
- **Purpose**: Type-safe token access in TypeScript/JavaScript
- **Usage**: `import { colors } from '@pd/design-tokens/types'`
- **Output**: TypeScript interfaces and typed objects
- **Benefits**: Autocomplete, type checking, refactoring safety

**Configuration breakdown:**
- `source: ['tokens/**/*.json']` - Reads all JSON files from tokens/ directory
- `transformGroup` - Applies appropriate transforms for each platform (CSS units, JS objects)
- `buildPath` - Output directory for each format
- `filter` - Tailwind config only includes color tokens (not spacing, typography)

### Step 1.7: Create Core Token Files (Primitives)

> 📋 **Reference**: All primitive values are extracted from Figma designs and documented in `packages/design-tokens/tokens/core/reference.md` with usage context.

**Colors** - Create `packages/design-tokens/tokens/core/colors.json`:
```json
{
  "primitives": {
    "colors": {
      "gray": {
        "50": { "value": "#EEEFFC" },
        "100": { "value": "#DCDBFE" },
        "200": { "value": "#D2D3E0" },
        "250": { "value": "#858699" },
        "300": { "value": "#4C4F6B" },
        "400": { "value": "#8A8F98" }
      },
      "purple": {
        "500": { "value": "#575BC7" }
      },
      "black": {
        "500": { "value": "#000000" }
      },
      "neutral": {
        "900": { "value": "#191A23" },
        "950": { "value": "#1D1E2B" }
      },
      "white": {
        "500": { "value": "#FFFFFF" }
      }
    }
  }
}
```

**Typography** - Create `packages/design-tokens/tokens/core/typogrpahy.json`:
```json
{
  "primitives": {
    "typography": {
      "fontFamily": {
        "inter": { "value": ["Inter", "sans-serif"] },
        "geist": { "value": ["Geist", "sans-serif"] }
      },
      "fontWeight": {
        "regular": { "value": "400" },
        "medium": { "value": "500" }
      },
      "fontSize": {
        "xs": { "value": "12px" },
        "sm": { "value": "13px" },
        "md": { "value": "18px" }
      },
      "lineHeight": {
        "tight": { "value": "100%" },
        "normal": { "value": "16px" },
        "relaxed": { "value": "28.8px" }
      }
    }
  }
}
```

**Spacing** - Create `packages/design-tokens/tokens/core/spacing.json`:
```json
{
  "primitives": {
    "spacing": {
      "xs": { "value": "2px" },
      "sm": { "value": "6px" },
      "md": { "value": "8px" },
      "lg": { "value": "12px" },
      "xl": { "value": "16px" }
    }
  }
}
```

**Border Radius** - Create `packages/design-tokens/tokens/core/radius.json`:
```json
{
  "primitives": {
    "borderRadius": {
      "sm": { "value": "4px" },
      "md": { "value": "8px" }
    }
  }
}
```

**Shadows** - Create `packages/design-tokens/tokens/core/shadows.json`:
```json
{
  "primitives": {
    "shadows": {
      "lg": { "value": "0px 16px 80px rgba(0, 0, 0, 0.5)" }
    }
  }
}
```

**Borders** - Create `packages/design-tokens/tokens/core/borders.json`:
```json
{
  "primitives": {
    "borderWidth": {
      "sm": { "value": "1px" }
    }
  }
}
```

### Step 1.8: Create Semantic Token Files (Theme-Specific)

**Dark Theme** - Create `packages/design-tokens/tokens/semantic/dark.json`:
```json
{
  "dark": {
    "colors": {
      "bg-primary": { "value": "{primitives.colors.gray.950}" },
      "bg-secondary": { "value": "{primitives.colors.gray.900}" },
      "bg-tertiary": { "value": "{primitives.colors.gray.800}" },
      "text-primary": { "value": "{primitives.colors.gray.50}" },
      "text-secondary": { "value": "{primitives.colors.gray.300}" },
      "text-tertiary": { "value": "{primitives.colors.gray.400}" },
      "border-primary": { "value": "{primitives.colors.gray.700}" },
      "border-secondary": { "value": "{primitives.colors.gray.600}" },
      "brand-primary": { "value": "{primitives.colors.blue.500}" },
      "brand-secondary": { "value": "{primitives.colors.blue.600}" },
      "success": { "value": "{primitives.colors.green.500}" },
      "warning": { "value": "{primitives.colors.yellow.500}" },
      "error": { "value": "{primitives.colors.red.500}" },
      "info": { "value": "{primitives.colors.blue.500}" }
    },
    "typography": {
      "font-family-primary": { "value": "{primitives.typography.fontFamily.sans}" },
      "font-size-body": { "value": "{primitives.typography.fontSize.base}" },
      "font-size-heading": { "value": "{primitives.typography.fontSize.2xl}" },
      "font-weight-normal": { "value": "{primitives.typography.fontWeight.normal}" },
      "font-weight-bold": { "value": "{primitives.typography.fontWeight.bold}" }
    },
    "spacing": {
      "xs": { "value": "{primitives.spacing.1}" },
      "sm": { "value": "{primitives.spacing.2}" },
      "md": { "value": "{primitives.spacing.4}" },
      "lg": { "value": "{primitives.spacing.6}" },
      "xl": { "value": "{primitives.spacing.8}" }
    }
  }
}
```

**Light Theme** - Create `packages/design-tokens/tokens/semantic/light.json`:
```json
{
  "light": {
    "colors": {
      "bg-primary": { "value": "{primitives.colors.gray.50}" },
      "bg-secondary": { "value": "{primitives.colors.gray.100}" },
      "bg-tertiary": { "value": "{primitives.colors.gray.200}" },
      "text-primary": { "value": "{primitives.colors.gray.900}" },
      "text-secondary": { "value": "{primitives.colors.gray.700}" },
      "text-tertiary": { "value": "{primitives.colors.gray.600}" },
      "border-primary": { "value": "{primitives.colors.gray.300}" },
      "border-secondary": { "value": "{primitives.colors.gray.400}" },
      "brand-primary": { "value": "{primitives.colors.blue.600}" },
      "brand-secondary": { "value": "{primitives.colors.blue.700}" },
      "success": { "value": "{primitives.colors.green.600}" },
      "warning": { "value": "{primitives.colors.yellow.600}" },
      "error": { "value": "{primitives.colors.red.600}" },
      "info": { "value": "{primitives.colors.blue.600}" }
    },
    "typography": {
      "font-family-primary": { "value": "{primitives.typography.fontFamily.sans}" },
      "font-size-body": { "value": "{primitives.typography.fontSize.base}" },
      "font-size-heading": { "value": "{primitives.typography.fontSize.2xl}" },
      "font-weight-normal": { "value": "{primitives.typography.fontWeight.normal}" },
      "font-weight-bold": { "value": "{primitives.typography.fontWeight.bold}" }
    },
    "spacing": {
      "xs": { "value": "{primitives.spacing.1}" },
      "sm": { "value": "{primitives.spacing.2}" },
      "md": { "value": "{primitives.spacing.4}" },
      "lg": { "value": "{primitives.spacing.6}" },
      "xl": { "value": "{primitives.spacing.8}" }
    }
  }
}
```

### Step 1.9: Build Design Tokens

```bash
# From packages/design-tokens
pnpm build
```

### Step 1.10: Update Workspace Configuration

Add to `pnpm-workspace.yaml` (if not already present):
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

Update root `package.json` to include design-tokens in scripts:
```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "tokens:build": "turbo run build --filter=@pd/design-tokens",
    "lint": "turbo run lint",
    "clean": "turbo run clean && rm -rf node_modules",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "turbo run build --filter=docs^... && changeset publish",
    "preview-storybook": "turbo run preview-storybook"
  }
}
```

Update `turbo.json` to include design-tokens build task:
```json
{
  "$schema": "https://turborepo.com/schema.json",
  "tasks": {
    "build": {
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": ["dist/**", "storybook-static/**"],
      "dependsOn": ["^build"]
    },
    "tokens:build": {
      "inputs": ["tokens/**/*.json", "style-dictionary.config.js"],
      "outputs": ["dist/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    },
    "preview-storybook": {
      "dependsOn": ["^build"],
      "cache": false
    }
  }
}
```

---

## Phase 2: UI Package Enhancement

### Step 2.1: Update UI Package Dependencies

Update `packages/ui/package.json` to include design-tokens:
```json
{
  "name": "@pd/ui",
  "version": "0.0.0",
  "sideEffects": false,
  "license": "MIT",
  "exports": {
    "./button": {
      "types": "./src/button.tsx",
      "import": "./dist/button.mjs",
      "require": "./dist/button.js"
    },
    "./styles": "./dist/styles.css"
  },
  "scripts": {
    "build": "tsup && cp ../design-tokens/dist/css/tokens.css dist/styles.css",
    "dev": "tsup --watch",
    "lint": "eslint . --max-warnings 0",
    "clean": "rm -rf .turbo node_modules dist"
  },
  "dependencies": {
    "@pd/design-tokens": "workspace:*",
    "react": "^18.2.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@types/react": "^18.2.61",
    "@types/react-dom": "^18.2.19",
    "eslint": "^8.57.0",
    "@repo/typescript-config": "workspace:*",
    "tsup": "^8.0.2",
    "typescript": "5.5.4"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### Step 2.2: Install New Dependencies

```bash
# From packages/ui
pnpm install
```

### Step 2.3: Update Button Component

Replace `packages/ui/src/button.tsx` with:
```tsx
import React from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps): React.JSX.Element {
  const baseStyles = [
    'inline-flex items-center justify-center font-medium rounded-md',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'transition-colors duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ];

  const variants = {
    primary: [
      'bg-brand-primary text-white',
      'hover:bg-brand-secondary',
      'focus:ring-brand-primary'
    ],
    secondary: [
      'bg-bg-secondary text-text-primary border border-border-primary',
      'hover:bg-bg-tertiary',
      'focus:ring-brand-primary'
    ],
    ghost: [
      'text-text-secondary',
      'hover:bg-bg-secondary hover:text-text-primary',
      'focus:ring-brand-primary'
    ]
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

Button.displayName = 'Button';
```

---

## Phase 3: Core Component Implementation

**🛑 YOU WILL CONTINUE FROM HERE**

The following steps will be implemented by you following this guide:

### Step 3.1: Input Component
- Create `packages/ui/src/input.tsx`
- Implement text input, textarea, and search variants
- Add validation states and accessibility

### Step 3.2: Select Component
- Create `packages/ui/src/select.tsx`
- Implement single and multi-select
- Add keyboard navigation and ARIA support

### Step 3.3: Modal Component
- Create `packages/ui/src/modal.tsx`
- Implement focus trapping and portal rendering
- Add responsive design

### Step 3.4: Card Component
- Create `packages/ui/src/card.tsx`
- Implement drag handle integration
- Add hover and focus states

### Step 3.5: Badge Component
- Create `packages/ui/src/badge.tsx`
- Implement status and priority variants
- Add color customization

### Step 3.6: Avatar Component
- Create `packages/ui/src/avatar.tsx`
- Implement image with fallback
- Add size variants

### Step 3.7: Tooltip Component
- Create `packages/ui/src/tooltip.tsx`
- Implement keyboard accessible tooltips
- Add positioning logic

### Step 3.8: Dropdown Menu Component
- Create `packages/ui/src/dropdown-menu.tsx`
- Implement keyboard navigation
- Add proper ARIA attributes

---

## Phase 4: Issues Application Setup

### Step 4.1: Update Issues App Dependencies
- Add design tokens dependency
- Install drag & drop library
- Install form handling library

### Step 4.2: Implement Kanban Board
- Create board layout components
- Implement drag & drop functionality
- Add responsive design

### Step 4.3: Issue Management
- Create issue form components
- Implement CRUD operations
- Add filtering and search

### Step 4.4: Theme Integration
- Implement theme provider
- Add theme toggle component
- Integrate with design tokens

---

## Phase 5: Storybook Enhancement

### Step 5.1: Update Storybook Configuration
- Add design tokens integration
- Configure theme switching
- Add accessibility addon

### Step 5.2: Component Stories
- Create comprehensive stories for each component
- Document component APIs
- Add accessibility tests

---

## Phase 6: Testing & Quality

### Step 6.1: E2E Testing Setup
- Configure Playwright
- Write critical user flow tests
- Add accessibility testing

### Step 6.2: Component Testing
- Add unit tests for components
- Test accessibility features
- Performance testing

---

## Next Steps

Follow the remaining phases in sequence. Each component should:
1. Use design tokens for styling
2. Include proper TypeScript types
3. Have accessibility built-in
4. Include Storybook stories
5. Have corresponding tests

Refer to `project_architecture.md` for detailed architectural guidance and patterns to follow.