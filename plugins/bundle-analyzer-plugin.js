const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerHost: '0.0.0.0',
    analyzerPort: '10001',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json'
})