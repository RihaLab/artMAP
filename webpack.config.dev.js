const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    'webpack-hot-middleware/client',
    './src/client/app',
  ],
  output: {
    path: path.join(__dirname, 'lib/server/public'),
    filename: 'dev_bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    charts: 'google',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Artin DNA (dev)',
      template: 'src/client/index.html',
    }),
  ],
  module: {
    rules: [
      // js | jsx
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src', 'client'),
      },
      // css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
