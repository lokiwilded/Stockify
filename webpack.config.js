const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "url": require.resolve("url/"),
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http"),
      "stream": require.resolve("stream-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "assert": require.resolve("assert/"),
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "util": require.resolve("util/"),
      "process": require.resolve("process/browser"),
      "fs": false,  // fs is not available in the browser environment
      "child_process": false,  // Not available in browser environment
      "net": false,  // Not available in browser environment
      "tls": false,  // Not available in browser environment
      "http2": false,  // Not available in browser environment
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
};
