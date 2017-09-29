module.exports = {
  entry: {
    'catta-min': './index',
    'catta-min-comp': [
      'es6-promise/auto',
      './polyfill/object-assign',
      './index'
    ]
  },
  compress: true,
  export: 'catta'
}