const webpackConfig = require('./webpack.config.js');
const path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'spec/index.js'
            // 'spec/index.js',
            // // 'spec/**/*Spec.js',
            // 'src/flattenizer.js'
        ],
        preprocessors: {
            'spec/index.js': 'webpack'
            // 'src/flattenizer.js': ['webpack'],
            // 'spec/index.js': ['webpack']
            // // 'spec/**/*Spec.js': ['webpack'],
        },
        webpack: webpackConfig,
        // webpack: {
        //     module: {
        //         rules: [
        //             // instrument only testing sources with Istanbul
        //             {
        //                 test: /\.js$/,
        //                 include: path.resolve(__dirname, 'src/'),
        //                 loader: 'istanbul-instrumenter-loader'
        //             }
        //         ]
        //     }
        // },
        webpackMiddleware: {
            noInfo: true
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity,


        // start
        reporters: ['progress', 'coverage-istanbul'],
        coverageIstanbulReporter: {
            reports: [ 'text-summary' ],
            fixWebpackSourcePaths: true
        }
    })
};