const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const SOURCE_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
    entry: SOURCE_PATH,
    output: {
        path: DIST_PATH,
        filename: 'index.js',
        library: 'gnFePlatform',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
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
    plugins: [
        new CleanWebpackPlugin()
    ]
};
