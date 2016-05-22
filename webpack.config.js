var webpack = require("webpack");
var path = require("path");


module.exports = {
  entry: __dirname + "/client-webpack/app.js",
  cache: false,
  output: {
    path: __dirname + '/client/app/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {test: /\.ejs$/, loader: 'ejs-compiled?htmlmin'}
    ]
  },
  'ejs-compiled-loader': {
      'beautify': false,
      'htmlmin': true, // or enable here
      'htmlminOptions': {
        removeComments: true
      }
  },
  plugins: [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: true
          }
      })
  ]
}
