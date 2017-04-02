const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        library: 'Flattenator',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        filename: 'flattenator.js',
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
    stats: {
        colors: true
    }
};