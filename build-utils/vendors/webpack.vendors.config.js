const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const dist = path.resolve(__dirname, '..', 'dist', 'vendors');

module.exports = {
    entry: {
        vendors: ['react', 'react-dom', 'react-intl', 'lodash']
    },
    mode: 'production',
    output: {
        path: dist,
        filename: 'vendors.[hash].js',
        library: '[name]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(dist, 'manifest.json')
        })
    ]
};
