export default {
  source: ["tokens/semantic/dark.json", "tokens/core/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/css/",
      files: [{
        destination: "dark.css",
        format: "css/variables",
        options: { selector: ".dark" },
        filter: function(token) {
          return !token.path.includes('primitives');
        }
      }]
    }
  }
};