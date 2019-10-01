const { page } = require('../constants');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createConfigFrom = require('./webpack.page.common.config');

const meta = require(page.meta);
const publicPath = page.production.getPublicPath(meta);

const partialConfig = {
    mode: 'production',
    output: {
        filename: `${page.bundle.jsName}.[hash].js`,
    },
    styleLoader: MiniCssExtractPlugin.loader,
    fileLoaderOptions: { publicPath },
    manifestOptions: { publicPath },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${page.bundle.cssName}.[hash].css`
        }),
    ],
};

module.exports = createConfigFrom(partialConfig);
