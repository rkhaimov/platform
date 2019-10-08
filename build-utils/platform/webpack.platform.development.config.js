const { platform } = require('../constants');
const createConfigFrom = require('./webpack.platform.common.config');

const config = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: platform.dist
    },
    output: {
        filename: 'platform.js',
    },
    styleLoader: require.resolve('style-loader'),
};

module.exports = createConfigFrom(config);
