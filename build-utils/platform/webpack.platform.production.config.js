const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createConfigFrom = require('./webpack.platform.common.config');

const config = {
    mode: 'production',
    output: {
        filename: 'platform.[hash].js'
    },
    styleLoader: MiniCssExtractPlugin.loader,
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'platform.[hash].css'
        })
    ]
};

module.exports = createConfigFrom(config);
