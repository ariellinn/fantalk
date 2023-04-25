const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ["@babel/preset-env"], ["@babel/preset-react"]
          ]
        }
      },
    },
    {
      test: /.(css|scss)$/,
      exclude: /node_modules/,
      use: ["style-loader", "css-loader", "sass-loader"],
    }]
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    static: {
      directory: path.join(__dirname, 'build'),
      publicPath: '/build/bundle.js',
    },
    proxy: {
      '/api/': {
        target: 'http://localhost:3000/',
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
  ],
};