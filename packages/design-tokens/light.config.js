export default {
  source: ["tokens/semantic/light.json", "tokens/core/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/css/",
      files: [{
        destination: "light.css",
        format: "css/variables",
        options: { selector: ":root" },
        filter: function(token) {
          return !token.path.includes('primitives');
        }
      }]
    }
  }
};