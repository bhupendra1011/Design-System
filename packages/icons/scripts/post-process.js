#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const componentsDir = path.resolve(__dirname, '../dist/components');

// Fix duplicate style properties in generated components
function fixDuplicateProperties() {
  console.log('🔧 Post-processing components to fix duplicate properties...');
  
  const files = fs.readdirSync(componentsDir)
    .filter(file => file.endsWith('.tsx'));
  
  files.forEach(file => {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const baseName = path.basename(file, '.tsx');
    
    // Fix duplicate fill properties in style objects
    content = content.replace(
      /style=\{\{[^}]*fill:\s*"[^"]*",\s*fill:\s*"[^"]*"[^}]*\}\}/g,
      'style={{fillOpacity: 1}}'
    );
    
    // Fix duplicate stroke properties in style objects  
    content = content.replace(
      /style=\{\{[^}]*stroke:\s*"[^"]*",\s*stroke:\s*"[^"]*"[^}]*\}\}/g,
      'style={{strokeOpacity: 1}}'
    );
    
    // Handle mixed properties with duplicates
    content = content.replace(
      /style=\{\{[^}]*fill:\s*"[^"]*",[^}]*fill:\s*"[^"]*"[^}]*\}\}/g,
      'style={{fillOpacity: 1}}'
    );
    
    content = content.replace(
      /style=\{\{[^}]*stroke:\s*"[^"]*",[^}]*stroke:\s*"[^"]*"[^}]*\}\}/g,
      'style={{strokeOpacity: 1}}'
    );
    
    // Remove standalone fill/stroke attributes that conflict
    content = content.replace(/fill="#[^"]*"/g, '');
    content = content.replace(/stroke="#[^"]*"/g, '');
    
    // Remove hardcoded fill values in style objects within paths and clipPath
    content = content.replace(/fill:\s*"#[^"]*"/g, 'fill: "currentColor"');
    content = content.replace(/fill="currentColor"/g, '');
    
    // Clean up style objects with hardcoded colors - remove fill entirely so it inherits
    content = content.replace(/style=\{\{[^}]*fill:\s*"[^"]*"[^}]*\}\}/g, 'style={{fillOpacity: 1}}');
    content = content.replace(/fill:\s*"currentColor",?\s*/g, '');
    
    // Rename components to add Icon suffix
    content = content.replace(/const Svg(\w+) = \(/g, 'const Svg$1Icon = (');
    content = content.replace(/Svg(\w+)\.displayName = "Svg(\w+)";/g, 'Svg$1Icon.displayName = "Svg$1Icon";');
    content = content.replace(/export default Svg(\w+);/g, 'export default Svg$1Icon;');
    
    // Update SVG props to use the passed props with smart color handling
    content = content.replace(/width=\{[^}]+\}/g, 'width={size}');
    content = content.replace(/height=\{[^}]+\}/g, 'height={size}');
    content = content.replace(/fill=\{[^}]+\}/g, 'fill={color}');
    
    // Add className prop handling and accessibility attributes
    content = content.replace(
      /(<svg[^>]*)\s*{\.\.\.props}/g, 
      '$1 role="img" aria-hidden="true" className={className} {...props}'
    );
    
    // Update interface to be exported from first component only
    if (file === files[0]) {
      content = content.replace(/interface IconProps/g, 'export interface IconProps');
    }
    
    // Add proper formatting back
    content = content.replace(/import type \{ SVGProps \} from "react";/, 'import type { SVGProps } from "react";\n');
    content = content.replace(/export interface IconProps/, '\nexport interface IconProps');
    content = content.replace(/const Svg(\w+)Icon = \(/g, '\nconst Svg$1Icon = (');
    content = content.replace(/\);/, ');\n');
    content = content.replace(/Svg(\w+)Icon\.displayName/, '\nSvg$1Icon.displayName');
    content = content.replace(/export default Svg(\w+)Icon;/, '\nexport default Svg$1Icon;\n');
    
    fs.writeFileSync(filePath, content);
    
    // Rename file to include Icon suffix
    const newFileName = `${baseName}Icon.tsx`;
    const newFilePath = path.join(componentsDir, newFileName);
    
    if (newFileName !== file) {
      fs.renameSync(filePath, newFilePath);
      console.log(`📝 Renamed ${file} → ${newFileName}`);
    }
  });
  
  console.log(`✅ Fixed ${files.length} component files`);
}

fixDuplicateProperties();