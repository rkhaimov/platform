const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { pick } = require(require.resolve('lodash'));
const { page, dll, common } = require('../constants');

const createConfigFrom = (config) => {
    const meta = require(page.meta);

    return {
        entry: {
            [page.bundle.jsName]: page.entry
        },
        mode: config.mode,
        devtool: config.devtool,
        devServer: config.devServer,
        output: {
            path: page.production.getOutputPath(meta),
            library: '__jsonpLoader__',
            libraryTarget: 'jsonp',
            ...config.output,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: require.resolve('awesome-typescript-loader'),
                    query: {
                        configFileName: page.tsconfig
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
                        ...config.fileLoaderOptions,
                    },
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DllReferencePlugin(dll.vendors),
            new ManifestPlugin({
                ...config.manifestOptions,
                fileName: common.metaFileName,
                serialize: (manifest) => {
                    const withJsCssOnly = pick(manifest, [page.bundle.jsFullName, page.bundle.cssFullName]);

                    return JSON.stringify({ ...meta, manifest: withJsCssOnly })
                }
            }),
            ...(config.plugins || []),
        ]
    }
};

module.exports = createConfigFrom;
