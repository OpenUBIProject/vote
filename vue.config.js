const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  pwa: {
    name: `Vote UBI`,
    themeColor: `#243665`,
    manifestOptions: {
      background_color: `#243665`
    },
    workboxOptions: {
      exclude: [`_redirects`, `_headers`],
      // https://forum.vuejs.org/t/vue-cli-3-project-with-pwa-not-busting-cache-on-new-builds/50252/7
      skipWaiting: true,
      clientsClaim: true
    }
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: `static`,
        reportFilename: `bundleAnalyzer.html`,
        openAnalyzer: false
      })
    ]
  }
};
