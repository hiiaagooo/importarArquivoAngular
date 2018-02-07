var webpack = require('webpack');
var path = require('path');
var config = {};
var pkg = require('../package.json');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

config.entry = {
    main: './src/main.js',
    vendor: [
        'lodash',
        'moment',
        'jquery',
        'angular',
        'sweetalert',
        'datatables.net',
        'ng-idle',
        'angular-sweetalert',
        'angular-ui-router',
        'ui-router.grant',
        'angular-moment-picker',
        'angular-breadcrumb',
        'angular-translate',
        'angular-animate',
        'angular-touch',
        'angular-ui-bootstrap',
        'angular-datatables',
        'angular-messages',
        'angular-sanitize',
        'oclazyload',
        'restangular',
        'angular-block-ui',
        'angular-input-masks',
        'angular-file-saver',
        'angular-ui-mask',
        'ngstorage',
        'ng-table',
        'ng-file-upload'
    ]
};
config.module = {
    rules: []
};
config.module.rules.push({
    test: /\.js?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
        presets: ['env']
    }
});

config.module.rules.push({
    test: /\.s?css/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
              loader: 'css-loader',
              options: {
                  sourceMap: true
              }
          }, 
          {
              loader: 'sass-loader',
              options: {
                  sourceMap: true
              }
          }
        ]
      })
});

config.module.rules.push({
    test: /\.(jpg|jpeg|gif)$/,
    loaders: ['file-loader?name=assets/images/[hash].[ext]']
});

config.module.rules.push({
    test: /\.png$/,
    loaders: ['url-loader?limit=1000000&name=assets/images/[hash].[ext]']
});

config.module.rules.push({
    test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [{
        loader: 'url-loader',
        options: {
            name: 'assets/fonts/[name]_[hash].[ext]'
        }
    }]
});

/*
 Verificação necessaria em ambientes Windows
 para utilizar / ao inves de \.
 */
if (/^win/.test(process.platform)) {
    config.module.rules.push({
        test: /(views|templates|directives)\\([\s\S]+)\.html$/,
        use: [{
                loader: 'ngtemplate-loader',
                query: {
                    relativeTo: (path.resolve(__dirname, '../src/app/')),
                    pathSep: '/',
                }
            },
            {
                loader: 'html-loader'
            }
        ]
    });

    config.module.rules.push({
        test: /(ng-table)\\([\s\S]+)\.html$/,
        use: [{
                loader: 'ngtemplate-loader',
                query: {
                    relativeTo: (path.resolve(__dirname, '../node_modules/ng-table/src/browser')),
                    prefix: 'ng-table'
                }
            },
            {
                loader: 'html-loader'
            }
        ]
    });
} else {
    config.module.rules.push({
        test: /(views|templates|directives)\/([\s\S]+)\.html$/,
        exclude: /node_modules/,
        use: [{
                loader: 'ngtemplate-loader?relativeTo=' + (path.resolve(__dirname, '../src/app'))
            },
            {
                loader: 'html-loader'
            }
        ]
    });

    config.module.rules.push({
        test: /(ng-table)\/([\s\S]+)\.html$/,
        use: [{
                loader: 'ngtemplate-loader',
                query: {
                    relativeTo: (path.resolve(__dirname, '../node_modules/ng-table/src/browser')),
                    prefix: 'ng-table'
                }
            },
            {
                loader: 'html-loader'
            }
        ]
    });
}

config.module.rules.push({
    test: /index.template\.html$/,
    loaders: [{
        loader: 'html-loader'
    }]
});

config.plugins = [];

module.exports = config;