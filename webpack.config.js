const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const reactConfig = {
  mode: 'development',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: [path.resolve(process.cwd(), 'src')]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(process.cwd(), './index.html')
    })
  ]
}

module.exports = reactConfig;
