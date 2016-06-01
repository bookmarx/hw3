var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: __dirname + "/client-webpack/app.js",
    cache: false,
    output: {
        path: __dirname + '/client/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.ejs$/, loader: 'ejs-compiled?htmlmin'},
            //{ test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            //{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            //{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            //{ test: /index\.html/, loader: "file-loader" },
            {
                test: /\.font\.(js|json)$/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader!fontgen-loader')
            }
        ]
    },
    'ejs-compiled-loader': {
        'beautify': false,
        'htmlmin': true, // or enable here
        'htmlminOptions': {
            removeTagWhitespace: true,
            conservativeCollapse: true,
            //collapseWhitespace: true,
            //collapseInlineTagWhitespace: true,
            removeComments: true

        }
    },
    plugins: [
         //new webpack.optimize.UglifyJsPlugin({
         //    compress: {
         //        warnings: true
         //    }
         //}),
        new CleanWebpackPlugin(['client'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin("[name].css"),
        new CopyWebpackPlugin([
            {
                from: __dirname + "/client-webpack/index.html",
                to: __dirname + '/client/app/index.html'
            }
        ])
    ]
}
