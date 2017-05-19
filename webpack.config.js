var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx|js?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-decorators-legacy',
          'eslint-loader'
        ]
      },
      {
        test: /.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: debug ? [
    new webpack.DefinePlugin({
      DOMAIN_NAME: "'http://localhost:3000'"
    })
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    }),
    new webpack.DefinePlugin({
      DOMAIN_NAME: "'https://www.pacdiv.io'"
    })
  ],
};
