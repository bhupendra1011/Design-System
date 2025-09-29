module.exports = {
  typescript: true,
  jsxRuntime: 'automatic',
  replaceAttrValues: {
    '#000': 'currentColor',
    '#000000': 'currentColor', 
    'black': 'currentColor',
    '#fff': 'currentColor',
    '#ffffff': 'currentColor',
    'white': 'currentColor',
    '#D2D3E0': 'currentColor',
    '#d2d3e0': 'currentColor'
  },
  dimensions: false,
  filenameCase: 'pascal',
  index: false,
  template: require('./svgr-template.cjs')
};