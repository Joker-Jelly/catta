const path = require('path');

module.exports = {
  entry: [],
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: '/dist/',
    library: 'request',
    libraryTarget: 'umd'
  },
  resolveLoader: {
    modules: [path.join(processorRoot, 'node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              'presets': [
                [path.join(processorRoot, 'node_modules', 'babel-preset-es2015'), { 'loose': true, 'modules': false }]
              ]
            }
          },
          'regenerator-loader'
        ]
      }
    ]
  }
};