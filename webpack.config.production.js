var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var webpackConfig = {
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
    entry: [
        './client.js'
    ],
    output: {
        path: path.join(__dirname, './build'),
        publicPath: '/public',
        filename: 'main.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    require.resolve('babel-loader')
                ]
            },
            { test: /\.json$/, loader: 'json-loader'},
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?includePaths[]=' + path.resolve(__dirname, './styles'))
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    node: {
        setImmediate: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('app.css', {
            allChunks: true
        })
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    devtool: 'source-map'
};

module.exports = webpackConfig;
