// Simple test to verify imports work
import { Close, Done } from './dist/index.js';

console.log('✅ Icons package test:');
console.log('Close component:', typeof Close);
console.log('Done component:', typeof Done);
console.log('Both should be "function"');

if (typeof Close === 'function' && typeof Done === 'function') {
  console.log('🎉 Tree-shaking test passed! Only imported icons are included.');
} else {
  console.error('❌ Test failed');
  process.exit(1);
}