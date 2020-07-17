const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    
   
};

const {
    override,
    addDecoratorsLegacy,
    disableEsLint,
    addBundleVisualizer,
    addLessLoader,
    addWebpackAlias,
    adjustWorkbox
  } = require("customize-cra");
  const path = require("path");
  
  module.exports = override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),
  
    addLessLoader(),
    // disable eslint in webpack
    disableEsLint(),
  
    // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
  
    // add an alias for "ag-grid-react" imports
    addWebpackAlias({
      ["ag-grid-react$"]: path.resolve(__dirname, "src/shared/agGridWrapper.js")
    }),
  
    // adjust the underlying workbox
    adjustWorkbox(wb =>
      Object.assign(wb, {
        skipWaiting: true,
        exclude: (wb.exclude || []).concat("index.html")
      })
    )
  );