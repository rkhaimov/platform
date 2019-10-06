const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const path = require('path');
const { platform, dll } = require('../constants');

const createConfigFrom = (config) => {
    return {
        entry: platform.entry,
        mode: config.mode,
        devtool: config.devtool,
        devServer: config.devServer,
        output: {
            path: platform.dist,
            ...config.output
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                    query: {
                        configFileName: platform.tsconfig
                    }
                },
                {
                    test: /\.scss?$/,
                    use: [
                        config.styleLoader,
                        require.resolve('css-loader'),
                        require.resolve('sass-loader')
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: require.resolve('file-loader'),
                    options: {
                        name: 'assets/[name].[hash:8].[ext]',
                    },
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        plugins: [
            new webpack.DllReferencePlugin(dll.vendors),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    'assets/**/*',
                    'platform.*.css',
                    'platform.*.js',
                    'platform.*.js.map',
                    'index.html',
                ]
            }),
            new HtmlWebpackPlugin(),
            new AddAssetHtmlPlugin(
                {
                    filepath: path.resolve(platform.dist, 'vendors', 'vendors.*.js'),
                    includeSourcemap: false,
                    publicPath: './vendors',
                    outputPath: 'vendors'
                }
            ),
            ...(config.plugins || [])
        ]
    };
}

module.exports = createConfigFrom;
