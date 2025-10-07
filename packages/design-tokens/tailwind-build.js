import StyleDictionary from 'style-dictionary';
import fs from 'fs';

// Generate Tailwind config and theme.css from semantic tokens
function generateTailwindConfig() {
  const lightTokens = JSON.parse(fs.readFileSync('tokens/semantic/light.json', 'utf8'));
  
  const colors = {};
  const spacing = {};
  const borderRadius = {};
  const fontFamily = {};
  const fontSize = {};
  const fontWeight = {};
  const shadows = {};
  const borders = {};
  
  // Process colors - map semantic color tokens to Tailwind classes
  if (lightTokens.colors) {
    Object.entries(lightTokens.colors).forEach(([name, tokenData]) => {
      // Extract color category and name from semantic token
      if (name.startsWith('bg-')) {
        const colorName = name.replace('bg-', '');
        colors[colorName] = `var(--colors-${name})`;
      } else if (name.startsWith('text-')) {
        const colorName = name.replace('text-', '');
        colors[colorName] = `var(--colors-${name})`;
      } else if (name.startsWith('border-')) {
        const colorName = name.replace('border-', '');
        colors[colorName] = `var(--colors-${name})`;
      } else if (name.startsWith('button-')) {
        const colorName = name.replace('button-', '');
        colors[colorName] = `var(--colors-${name})`;
      } else {
        colors[name] = `var(--colors-${name})`;
      }
    });
  }
  
  // Process typography
  if (lightTokens.typography) {
    Object.entries(lightTokens.typography).forEach(([key, tokenData]) => {
      if (key.startsWith('font-family-')) {
        const name = key.replace('font-family-', '');
        fontFamily[name] = `var(--typography-${key})`;
      } else if (key.startsWith('font-size-')) {
        const name = key.replace('font-size-', '');
        fontSize[name] = `var(--typography-${key})`;
      } else if (key.startsWith('font-weight-')) {
        const name = key.replace('font-weight-', '');
        fontWeight[name] = `var(--typography-${key})`;
      }
    });
  }
  
  // Process spacing - numeric keys work with Tailwind utilities
  if (lightTokens.spacing) {
    Object.entries(lightTokens.spacing).forEach(([key, tokenData]) => {
      spacing[key] = `var(--spacing-${key})`;
    });
  }
  
  // Process radius
  if (lightTokens.radius) {
    Object.entries(lightTokens.radius).forEach(([name, tokenData]) => {
      borderRadius[name] = `var(--radius-${name})`;
    });
  }
  
  // Process shadows
  if (lightTokens.shadows) {
    Object.entries(lightTokens.shadows).forEach(([name, tokenData]) => {
      shadows[name] = `var(--shadows-${name})`;
    });
  }
  
  // Process borders
  if (lightTokens.borders) {
    Object.entries(lightTokens.borders).forEach(([name, tokenData]) => {
      borders[name] = `var(--borders-${name})`;
    });
  }
  
  const config = `export default {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 6)},
      spacing: ${JSON.stringify(spacing, null, 6)},
      borderRadius: ${JSON.stringify(borderRadius, null, 6)},
      fontFamily: ${JSON.stringify(fontFamily, null, 6)},
      fontSize: ${JSON.stringify(fontSize, null, 6)},
      fontWeight: ${JSON.stringify(fontWeight, null, 6)},
      boxShadow: ${JSON.stringify(shadows, null, 6)},
      borderWidth: ${JSON.stringify(borders, null, 6)}
    }
  }
};`;
  
  // Ensure directory exists
  if (!fs.existsSync('dist/js')) {
    fs.mkdirSync('dist/js', { recursive: true });
  }
  
  fs.writeFileSync('dist/js/tailwind.config.js', config);
  console.log('✅ Generated tailwind.config.js');
  
  // Generate Tailwind v4 theme.css - map semantic tokens to Tailwind variable names
  const themeVars = [];
  
  // Map colors to standard Tailwind color names
  if (lightTokens.colors) {
    Object.entries(lightTokens.colors).forEach(([name, tokenData]) => {
      if (name.startsWith('bg-')) {
        const colorName = name.replace('bg-', '');
        themeVars.push(`  --color-${colorName}: var(--colors-${name});`);
      } else if (name.startsWith('text-')) {
        const colorName = name.replace('text-', '');
        themeVars.push(`  --color-${colorName}: var(--colors-${name});`);
      } else if (name.startsWith('border-')) {
        // Skip border-* tokens to avoid duplicates, use bg-* versions instead
        return;
      } else if (name.startsWith('button-')) {
        // Skip button-* tokens to avoid duplicates, use text-* versions instead
        return;
      } else {
        themeVars.push(`  --color-${name}: var(--colors-${name});`);
      }
    });
  }
  
  // Map typography - use Tailwind v4 naming conventions
  if (lightTokens.typography) {
    Object.entries(lightTokens.typography).forEach(([key, tokenData]) => {
      if (key.startsWith('font-family-')) {
        const name = key.replace('font-family-', '');
        // Tailwind expects --font-* (not --font-family-*)
        themeVars.push(`  --font-${name}: var(--typography-${key});`);
      } else if (key.startsWith('font-size-')) {
        const name = key.replace('font-size-', '');
        // Tailwind expects --text-* for font-size (not --font-size-*)
        themeVars.push(`  --text-${name}: var(--typography-${key});`);
      } else if (key.startsWith('font-weight-')) {
        const name = key.replace('font-weight-', '');
        // Tailwind expects --font-* (not --font-weight-*)
        themeVars.push(`  --font-${name}: var(--typography-${key});`);
      }
    });
  }
  
  // Map spacing - numeric keys work with Tailwind utilities (p-1, m-2, etc.)
  if (lightTokens.spacing) {
    Object.entries(lightTokens.spacing).forEach(([key, tokenData]) => {
      // Use numeric keys directly (1, 2, 3, etc.)
      themeVars.push(`  --spacing-${key}: var(--spacing-${key});`);
    });
  }
  
  // Map radius
  if (lightTokens.radius) {
    Object.entries(lightTokens.radius).forEach(([name, tokenData]) => {
      themeVars.push(`  --radius-${name}: var(--radius-${name});`);
    });
  }
  
  // Map shadows
  if (lightTokens.shadows) {
    Object.entries(lightTokens.shadows).forEach(([name, tokenData]) => {
      themeVars.push(`  --shadow-${name}: var(--shadows-${name});`);
    });
  }
  
  const themeCss = `@theme {
${themeVars.join('\n')}
}`;
  
  // Ensure css directory exists
  if (!fs.existsSync('dist/css')) {
    fs.mkdirSync('dist/css', { recursive: true });
  }
  
  fs.writeFileSync('dist/css/theme.css', themeCss);
  console.log('✅ Generated theme.css for Tailwind v4');
}

generateTailwindConfig();