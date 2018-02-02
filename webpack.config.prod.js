const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/client/app',
  ],
  output: {
    path: path.join(__dirname, 'lib/server/public'),
    filename: 'bundle.js',
  },
  externals: {
    charts: 'google',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'",
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Artin DNA',
      template: 'src/client/index.html',
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      // js | jsx
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src', 'client'),
      },
    ],
  },
};
