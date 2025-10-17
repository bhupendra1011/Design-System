# @repo/icons

React icon components automatically generated from SVG files with optimal tree-shaking support.

## 🚀 Features

- ✅ **Tree-shakable** - Only imported icons are bundled
- ✅ **TypeScript support** - Full type safety with IntelliSense
- ✅ **Consistent API** - All icons have `size` and `color` props
- ✅ **Automatic generation** - Add SVG → build → get React component
- ✅ **Small bundle size** - ~600 bytes per icon

## 📦 Available Icons

- `AssigneeIcon` - User assignment icon
- `BacklogIcon` - Backlog status icon
- `CanceledIcon` - Canceled status icon
- `CloseIcon` - Close/X icon
- `DoneIcon` - Completed status icon
- `ExpandIcon` - Expand/chevron icon
- `InprogressIcon` - In progress status icon
- `LabelIcon` - Label/tag icon
- `PriorityIcon` - Priority indicator icon
- `TodoIcon` - Todo status icon

## 🔧 Usage

### Basic Import
```tsx
import { CloseIcon, DoneIcon, PriorityIcon } from '@repo/icons';

function MyComponent() {
  return (
    <div>
      {/* Default size=14, color='currentColor' */}
      <CloseIcon />
      
      {/* Custom size and color */}
      <DoneIcon size={24} color="#575BC7" />
      
      {/* With design tokens */}
      <PriorityIcon 
        size={16} 
        color="var(--colors-text-primary)" 
        className="cursor-pointer"
      />
    </div>
  );
}
```

### Props Interface
```tsx
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;    // Default: 14
  color?: string;   // Default: 'currentColor'
}
```

### With Tailwind CSS

Icons use `currentColor` by default, making them perfect for Tailwind text color classes:

```tsx
import { AssigneeIcon, PriorityIcon, CloseIcon } from '@repo/icons';

// Simple Tailwind colors (Recommended)
<AssigneeIcon className="text-blue-500" />
<PriorityIcon className="text-red-600" />

// With hover effects
<CloseIcon className="text-gray-500 hover:text-red-500 transition-colors" />

// With animations  
<PriorityIcon className="text-orange-500 animate-pulse" />

// Responsive colors
<AssigneeIcon className="text-blue-500 lg:text-green-500" />

// Dark mode support
<PriorityIcon className="text-gray-700 dark:text-gray-300" />

// Combined with size
<CloseIcon 
  size={24} 
  className="text-red-500 hover:text-red-700 cursor-pointer" 
/>
```

### With Design Tokens

Perfect integration with your design system tokens:

```tsx
// CSS Custom Properties (Design Tokens)
<PriorityIcon style={{color: 'var(--colors-text-primary)'}} />
<AssigneeIcon style={{color: 'var(--colors-status-danger)'}} />

// Tailwind + Design Tokens
<CloseIcon 
  className="hover:text-red-500" 
  style={{color: 'var(--colors-text-muted)'}} 
/>

// Component-level token usage
<div className="text-[var(--colors-text-primary)]">
  <PriorityIcon /> {/* Inherits token color automatically */}
</div>
```

## 🏗 Development

### Adding New Icons

1. **Export SVG from Figma** → Save to `src/` directory
2. **Build package** → `pnpm build`
3. **Use immediately** → New icon component available

```bash
# Add new icon
cp new-icon.svg packages/icons/src/

# Build package
cd packages/icons && pnpm build

# Import and use
import { NewIcon } from '@repo/icons';
```

### Build Commands

```bash
pnpm build    # Generate all components
pnpm clean    # Remove generated files
pnpm test     # Test imports work
```

## 📊 Bundle Size

Each icon adds approximately 600 bytes to your bundle when imported:

```tsx
// Only ~600 bytes added to bundle
import { CloseIcon } from '@repo/icons';

// Only ~1.2KB total added to bundle
import { CloseIcon, DoneIcon } from '@repo/icons';
```

Tree-shaking ensures unused icons are never included in your final bundle.

## 🎨 Icon Customization

Icons use `currentColor` by default and inherit parent text color automatically:

```tsx
// Inherits text color (Default behavior)
<CloseIcon className="text-red-500" />

// Explicit color override
<DoneIcon color="#22c55e" />

// With CSS variables (design tokens)
<PriorityIcon color="var(--colors-button-primary)" />

// Parent container sets color for all icons
<div className="text-blue-500">
  <CloseIcon />   {/* Blue */}
  <DoneIcon />    {/* Blue */}
  <PriorityIcon /> {/* Blue */}
</div>
```

## 🔄 Automatic Generation

The build process:

1. **Scans** `src/` for all SVG files
2. **Converts** SVGs to React components with SVGR
3. **Post-processes** to fix styling conflicts
4. **Generates** TypeScript declarations
5. **Creates** barrel exports for tree-shaking

All icons get consistent props and optimal bundle splitting automatically.