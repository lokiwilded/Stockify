const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    path: require.resolve('path-browserify'),
    stream: require.resolve('stream-browserify'),
    url: require.resolve('url/'),
    util: require.resolve('util/'),
    zlib: require.resolve('browserify-zlib'),
    querystring: require.resolve('querystring-es3'),
    fs: false,
    net: false,
    tls: false,
    child_process: false,
    http2: false,
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};
