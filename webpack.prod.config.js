var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: [path.resolve(__dirname, "app/src/index.js")]
  },

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build/dist/app")
  },
  module: {
      rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader']
          },
          { 
              test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|svg)(\?.*$|$)/, 
              use: 'url-loader' 
          },
          { 
              test: /\.html$/, 
              use: "raw-loader" 
          },
          { 
              test: /\.json$/, 
              use: "json-loader"
          },
          {
            test: /\.styl$/,
            use: [
                'style-loader',
                'css-loader',
                'stylus-loader'
            ]
          },
          {
            test: /\.css$/,
            use: 'css-loader'
          }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'app/index.html'
      }),
      new CopyWebpackPlugin([
        {
          from: 'server',
          to: path.resolve(__dirname, 'build/server')
        },
        {
          from: 'package.json',
          to: path.resolve(__dirname, 'build/package.json')
        }
      ])
  ]
}