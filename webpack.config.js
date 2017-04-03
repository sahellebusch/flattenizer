const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const env  = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'flattenizer';
let plugins = [];
let outputFile;

plugins.push(new webpack.NoEmitOnErrorsPlugin());

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
}
else {
    outputFile = libraryName + '.js';
}

module.exports = {
    entry: path.resolve(__dirname, 'src/flattenizer.js'),
    devtool: "source-map",
    output: {
        library: libraryName,
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'lib'),
        filename: outputFile,
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
    plugins: plugins,
    stats: {
        colors: true
    }
};