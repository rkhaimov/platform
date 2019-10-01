const path = require('path');

const pageRoot = process.cwd();
const platformDist = path.resolve(__dirname, '..', 'dist');

module.exports = {
    common: {
        metaFileName: 'meta.json',
        dist: platformDist,
    },
    page: {
        root: pageRoot,
        entry: path.resolve(pageRoot, 'export'),
        meta: path.resolve(pageRoot, 'export', 'page-meta.json'),
        tsconfig: path.resolve(pageRoot, 'tsconfig.json'),
        bundle: {
            jsName: 'index',
            cssName: 'index',
            jsFullName: 'index.js',
            cssFullName: 'index.css'
        },
        production: {
            getPublicPath: (meta) => `./pages/${meta.id}/`,
            getOutputPath: (meta) => path.resolve(pageRoot, 'dist', meta.id),
        },
    },
    dll: {
        vendors: {
            context: pageRoot,
            manifest: require(path.resolve(platformDist, 'vendors', 'manifest.json')),
        }
    }
};
