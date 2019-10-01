const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const DIST_PATH = path.resolve(__dirname, 'dist', 'platform');

module.exports = {
    entry: path.resolve(__dirname, 'src'),
    mode: "development",
    devtool: "source-map",
    output: {
        path: DIST_PATH,
        filename: 'platform.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    jsx: 'react',
                    lib: ['esnext', 'dom']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ]
};
