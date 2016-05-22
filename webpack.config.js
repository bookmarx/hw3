module.exports = {
  entry: "./client-webpack/app.js",
  cache: false,
  output: {
    path: './client/app/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {test: /\.ejs$/, loader: 'ejs-compiled'}
    ]
  },
  'ejs-compiled-loader': {

  }
}
