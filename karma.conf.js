const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'spec/**/*Spec.js',
            'src/flattenizer.js'
        ],
        preprocessors: {
            'src/flattenizer.js': ['webpack'],
            'spec/**/*Spec.js': ['webpack'],
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless, ChromeTravis'],
        singleRun: true,
        concurrency: Infinity,
        //props to JohnFoley3! - https://gist.github.com/johnfoley3/4ecbb7f4044746f1b71d0afbb59adf3a
        customLaunchers: {
            'ChromeHeadless': {
                base: 'Chromium', // Can be Chrome, ChromeCanary, or Chromium
                flags: [
                    // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
                    '--headless',
                    '--disable-gpu',
                    '--remote-debugging-port=9222'
                ]
            },
            'ChromeTravis': {
                base: 'Chrome', // Can be Chrome, ChromeCanary, or Chromium
                flags: ['--no-sandbox']
            },
        }
    })
};