const { page, common } = require('../constants');
const createConfigFrom = require('./webpack.page.common.config');

const builder = {
    mode: 'development',
    devtool: 'cheap-source-map',
    output: {
        filename: page.bundle.jsFullName
    },
    styleLoader: require.resolve('style-loader'),
    devServer: {
        contentBase: common.dist
    }
};

module.exports = createConfigFrom(builder);
