const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const SOURCE_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
    entry: SOURCE_PATH,
    output: {
        path: DIST_PATH,
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    outDir: DIST_PATH,
                    declaration: true
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};
