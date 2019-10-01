const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const path = require('path');

const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'platform'),
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: DIST_PATH,
        filename: 'platform.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                query: {
                    configFileName: path.resolve(__dirname, 'tsconfig.json')
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('dist/vendors/manifest')
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['platform.*.js', 'platform.*.js.map', 'index.html']
        }),
        new HtmlWebpackPlugin(),
        new AddAssetHtmlPlugin(
            {
                filepath: path.resolve(__dirname, 'dist', 'vendors', 'vendors.*.js'),
                includeSourcemap: false,
                publicPath: './vendors',
                outputPath: 'vendors'
            }
        )
    ]
};
