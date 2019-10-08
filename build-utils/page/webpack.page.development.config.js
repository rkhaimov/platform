const { page, platform } = require('../constants');
const createConfigFrom = require('./webpack.page.common.config');

const builder = {
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: page.bundle.jsFullName
    },
    styleLoader: require.resolve('style-loader'),
    devServer: {
        contentBase: platform.dist
    }
};

module.exports = createConfigFrom(builder);
