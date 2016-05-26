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
            {test: /\.ejs$/, loader: 'ejs-compiled?htmlmin'},
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    'ejs-compiled-loader': {
        'beautify': false,
        'htmlmin': true, // or enable here
        'htmlminOptions': {
            collapseInlineTagWhitespace: true,
            removeComments: true
        }
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: true
        //     }
        // })
    ]
}
