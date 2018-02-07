var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DotenvPlugin = require('webpack-dotenv-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var autoprefixer = require('autoprefixer');
var VersionFile = require('webpack-version-file-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = require('./webpack.config');
var buildPath = path.join(__dirname, '../src/app/');

var pkg = require('../package.json');

config.output = {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path:  path.join(__dirname, '../build/')
};

config.module.rules.push({
    test: /\.json$/,
    loaders: ['json-loader']
});

config.plugins.push(new DotenvPlugin({
    path: './.env',
    sample:'./.env.development'
}));

// config.plugins.push(
//     new BundleAnalyzerPlugin()
// );

config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks(module, count) {
            var context = module.context;
            return Object.keys(pkg.dependencies);
        }
    })
);

config.plugins.push(
    new HtmlWebpackPlugin({
        template: 'src/index.template.html',
        inject: true
    })
);

config.plugins.push(new webpack.HotModuleReplacementPlugin())

config.plugins.push(
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        moment: "moment"
    })
);

config.plugins.push(
    new ExtractTextPlugin({filename: '[name].css'})
)

// config.plugins.push(
//     new VersionFile({
//         packageFile: path.join(__dirname, 'package.json'),
//         template: path.join(__dirname, 'version.ejs'),
//         outputFile: path.join(__dirname, 'version.json')
//     })
// );

config.devtool = 'source-map';

config.devServer = {
    contentBase: buildPath,
    hot: true,
    watchOptions: {
        ignored: /node_modules/
    },
    compress: true,
    inline: true,
    port: 3000,
    disableHostCheck: true,
    proxy: {
        "/realize": "http://localhost:8080"
    }
};

module.exports = config;